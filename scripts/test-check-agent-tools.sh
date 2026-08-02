#!/usr/bin/env bash
# check-agent-tools.sh の振る舞いを検証する。
# 実際のツール導入状況に依存しないよう、tools.tsv の check 欄に true/false を置いて検査する。
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="$SCRIPT_DIR/check-agent-tools.sh"

PASS=0
FAIL=0
WORK=""

setup() {
  WORK="$(mktemp -d)"
  mkdir -p "$WORK/.ai/profiles/testprofile"
  printf "testprofile\n" > "$WORK/.ai/active-profile"
  printf '# tool\tclass\tcheck\tfallback\tdocs\n' > "$WORK/.ai/profiles/testprofile/tools.tsv"
}

teardown() {
  [ -n "$WORK" ] && rm -rf "$WORK"
  WORK=""
}

add_tool() {
  printf '%s\t%s\t%s\t%s\t%s\n' "$1" "$2" "$3" "$4" "$5" \
    >> "$WORK/.ai/profiles/testprofile/tools.tsv"
}

expect_exit() {
  local label="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  PASS  $label"
    PASS=$((PASS + 1))
  else
    echo "  FAIL  $label — expected exit $expected, got $actual"
    FAIL=$((FAIL + 1))
  fi
}

expect_contains() {
  local label="$1" needle="$2" haystack="$3"
  if printf '%s' "$haystack" | grep -q -- "$needle"; then
    echo "  PASS  $label"
    PASS=$((PASS + 1))
  else
    echo "  FAIL  $label — output did not contain: $needle"
    echo "----- actual output -----"
    printf '%s\n' "$haystack"
    echo "-------------------------"
    FAIL=$((FAIL + 1))
  fi
}

echo "case 1: must も recommended も導入済みなら exit 0"
setup
add_tool alpha must true - -
add_tool beta recommended true fallback-beta -
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 0 を返す" 0 "$rc"
teardown

echo "case 2: must が欠落したら exit 1 とツール名の出力"
setup
add_tool alpha must false - context7-id-alpha
add_tool beta recommended true fallback-beta -
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 1 を返す" 1 "$rc"
expect_contains "欠落した must のツール名が出る" "alpha" "$out"
expect_contains "docs 列の参照先が出る" "context7-id-alpha" "$out"
teardown

echo "case 3: recommended だけ欠落なら exit 0 と縮退先の出力"
setup
add_tool alpha must true - -
add_tool beta recommended false fallback-beta -
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 0 を返す" 0 "$rc"
expect_contains "縮退先が出る" "fallback-beta" "$out"
teardown

echo "case 4: 定義ファイルが無い profile は exit 2"
setup
out="$(cd "$WORK" && "$TARGET" --profile nosuchprofile 2>&1)"; rc=$?
expect_exit "exit 2 を返す" 2 "$rc"
teardown

echo "case 5: --profile が .ai/active-profile より優先される"
setup
mkdir -p "$WORK/.ai/profiles/other"
printf '# tool\tclass\tcheck\tfallback\tdocs\n' > "$WORK/.ai/profiles/other/tools.tsv"
printf 'gamma\tmust\tfalse\t-\t-\n' >> "$WORK/.ai/profiles/other/tools.tsv"
add_tool alpha must true - -
out="$(cd "$WORK" && "$TARGET" --profile other 2>&1)"; rc=$?
expect_exit "指定した profile が使われ exit 1 になる" 1 "$rc"
expect_contains "指定した profile のツールが出る" "gamma" "$out"
teardown

echo "case 6: class が不正な値（例: Must）なら exit 2 でその値を示す"
setup
add_tool alpha Must true - -
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 2 を返す" 2 "$rc"
expect_contains "不正な class 値が出る" "Must" "$out"
teardown

echo "case 7: フィールド数が5未満の行は exit 2"
setup
printf 'alpha\tmust\ttrue\n' >> "$WORK/.ai/profiles/testprofile/tools.tsv"
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 2 を返す" 2 "$rc"
expect_contains "フィールド数不正のメッセージが出る（class 分岐との偶然の一致でないことを確認）" "フィールド数は5" "$out"
teardown

echo "case 8: CRLF 終端の tools.tsv でも正しく分類される（exit 2 にならない）"
setup
printf '# tool\tclass\tcheck\tfallback\tdocs\r\n' > "$WORK/.ai/profiles/testprofile/tools.tsv"
printf 'alpha\tmust\ttrue\t-\t-\r\n' >> "$WORK/.ai/profiles/testprofile/tools.tsv"
printf 'beta\trecommended\tfalse\tfallback-beta\t-\r\n' >> "$WORK/.ai/profiles/testprofile/tools.tsv"
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "CRLF でも exit 0 になる" 0 "$rc"
expect_contains "recommended の縮退先が出る" "fallback-beta" "$out"
teardown

echo "case 9: must 行の check 列が空だと exit 2（IFS 空白圧縮によるフィールドずれの回帰）"
setup
printf 'docker\tmust\t\ttrue\tcontext7-docker\n' >> "$WORK/.ai/profiles/testprofile/tools.tsv"
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 2 を返す（修正前は exit 0 で OK と誤判定していた）" 2 "$rc"
expect_contains "空フィールドのエラーメッセージが出る（フィールド数不正の分岐に誤って落ちていないことを確認）" "空のフィールドがあります" "$out"
teardown

echo "case 10: tool 列が空だと exit 2"
setup
printf '\tmust\ttrue\t-\t-\n' >> "$WORK/.ai/profiles/testprofile/tools.tsv"
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 2 を返す" 2 "$rc"
expect_contains "空フィールドのエラーメッセージが出る（フィールド数不正の分岐に誤って落ちていないことを確認）" "空のフィールドがあります" "$out"
teardown

echo "case 11: fallback 列が空だと exit 2（空フィールドは規約違反、'-' を使うこと）"
setup
add_tool alpha must true "" -
out="$(cd "$WORK" && "$TARGET" 2>&1)"; rc=$?
expect_exit "exit 2 を返す" 2 "$rc"
expect_contains "空フィールドのエラーメッセージが出る（フィールド数不正の分岐に誤って落ちていないことを確認）" "空のフィールドがあります" "$out"
teardown

echo
echo "PASS: $PASS  FAIL: $FAIL"
[ "$FAIL" -eq 0 ]
