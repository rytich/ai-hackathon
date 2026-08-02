#!/usr/bin/env bash
# profile ごとの必須/推奨ツールの導入状況を検査する。
#
#   must 欠落        -> 欠落ツール名と参照先を表示して exit 1（作業を止める）
#   recommended 欠落 -> 縮退先を表示して exit 0（作業は継続できる）
#
# インストールは行わない。環境変更は人間の承認領域（docs/framework/quality-gates.md）。
#
# 使い方:
#   scripts/check-agent-tools.sh                  # .ai/active-profile を読む
#   scripts/check-agent-tools.sh --profile codex  # profile を明示する
#
# 定義ファイルの探索順:
#   1. .ai/profiles/<profile>/tools.tsv                    # 導入先プロジェクト
#   2. <AF root>/templates/project/.ai/profiles/<profile>/tools.tsv  # AF 本体（.ai を持たない）
#
# tools.tsv の列（タブ区切り、# 始まりはコメント）:
#   tool  class(must|recommended)  check  fallback  docs
set -euo pipefail

usage() {
  echo "Usage: $0 [--profile <name>]"
  echo
  echo "  --profile <name>  検査する AI profile。省略時は .ai/active-profile を読む。"
}

PROFILE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --profile)
      PROFILE="${2:-}"
      if [ -z "$PROFILE" ]; then
        echo "--profile requires a value" >&2
        exit 2
      fi
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ -z "$PROFILE" ]; then
  if [ -f ".ai/active-profile" ]; then
    PROFILE="$(tr -d '[:space:]' < .ai/active-profile)"
  else
    echo "No .ai/active-profile found. Specify --profile <name>." >&2
    exit 2
  fi
fi

TOOLS_FILE=""
for candidate in \
  ".ai/profiles/$PROFILE/tools.tsv" \
  "$ROOT_DIR/templates/project/.ai/profiles/$PROFILE/tools.tsv"
do
  if [ -f "$candidate" ]; then
    TOOLS_FILE="$candidate"
    break
  fi
done

if [ -z "$TOOLS_FILE" ]; then
  echo "No tools.tsv found for profile: $PROFILE" >&2
  exit 2
fi

echo "profile: $PROFILE"
echo "tools:   $TOOLS_FILE"
echo

missing_must=0
missing_recommended=0
line_no=0

while IFS= read -r raw_line || [ -n "${raw_line:-}" ]; do
  line_no=$((line_no + 1))

  # CRLF (Windows) 終端の tools.tsv 対策。\r は末尾フィールドに紛れ込みやすく、
  # 短い（列数不足の）行では途中のフィールドに付くこともある。フィールド分割の
  # 前に行全体から取り除き、"must\r" のような値が class 比較をすり抜けないようにする。
  line="${raw_line%$'\r'}"

  # 空行・コメント行は分割前に、行そのもの（分割結果ではなく）で判定してスキップする。
  # 分割後の tool 値で判定すると、下のフィールドずれ対策と話が混ざってしまうため。
  case "$line" in
    ''|'#'*) continue ;;
  esac

  # --- タブ区切りを「ハードデリミタ」として厳密に分割する ---
  # なぜ `IFS=$'\t' read -r tool class check fallback docs <<< "$line"` を使わないか:
  # tab は IFS の「空白文字」の1つとして扱われるため、read は連続するタブを
  # 1個の区切りとして畳み込み、さらに先頭・末尾のタブも読み捨てる。そのため
  # 「中間フィールドが空文字列」の行（例: must ツールの check 列を書き忘れて
  # タブが連続した行）では、本来 check に入るはずの空文字列が消え、後続の
  # fallback 列の値が check 側にずれ込む。ずれ込んだ値がそのまま eval され、
  # 本来「check が無い＝不正な行」であるはずが「ツール導入済み」として
  # サイレントに通ってしまう（must ゲートを迂回する重大な不具合）。
  # IFS の値を変えても、`read -ra` にしても、`set -f` にしても、tab が IFS
  # 空白文字である限り同じ畳み込みが起きるため、read 系では回避できない。
  # ここではパラメータ展開でタブ文字の「位置」だけを見て切り出す。畳み込みも
  # 読み捨ても発生しないため、空フィールドも位置がずれずに残る。
  malformed=0

  tool="${line%%$'\t'*}"
  [ "$tool" = "$line" ] && malformed=1
  rest="${line#*$'\t'}"

  class="${rest%%$'\t'*}"
  [ "$class" = "$rest" ] && malformed=1
  rest="${rest#*$'\t'}"

  check="${rest%%$'\t'*}"
  [ "$check" = "$rest" ] && malformed=1
  rest="${rest#*$'\t'}"

  fallback="${rest%%$'\t'*}"
  [ "$fallback" = "$rest" ] && malformed=1
  rest="${rest#*$'\t'}"

  docs="$rest"
  # docs の後ろにまだタブが残っていれば6列以上（フィールド数過多）。
  case "$docs" in
    *$'\t'*) malformed=1 ;;
  esac

  # 行の形（列数）と各列の値を検査する。ここで弾かれる行は「ツールの状態」
  # ではなく「定義ファイルの誤り」であり、recommended 扱いにサイレントに落として
  # 導入チェックを迂回させてはならない（誤字・列ずれで must チェックが素通りする
  # のが本来の不具合だったため、定義ファイル不備として exit 2 で止める）。
  # フィールド数の判定は上の実際の分割結果（malformed）そのものに基づく。
  # タブの個数を別処理で数え直す方式にすると、分割ロジックとその数え直しが
  # 食い違う余地が生まれるため、あえて分割の副産物だけを使う。
  if [ "$malformed" -eq 1 ]; then
    echo "tools.tsv の行が不正です: $TOOLS_FILE:$line_no" >&2
    echo "  フィールド数は5 (tool, class, check, fallback, docs) である必要があります。" >&2
    echo "  行の内容: $line" >&2
    exit 2
  fi

  # tool/class/check/fallback/docs のいずれかが空文字列なら定義ファイルの不備。
  # このプロジェクトの規約では「値なし」は空文字列ではなく '-' で明示するため、
  # コメント行・空行以外での空フィールドは常にエラーとする（check 列を空にした
  # まま must 行が「OK」と誤判定されていたのが今回の重大な不具合だったため）。
  if [ -z "$tool" ] || [ -z "$class" ] || [ -z "$check" ] || [ -z "$fallback" ] || [ -z "$docs" ]; then
    echo "tools.tsv の行が不正です: $TOOLS_FILE:$line_no" >&2
    echo "  空のフィールドがあります。tool, class, check, fallback, docs はいずれも値が必要です（値なしは '-' で明示する）。" >&2
    echo "  行の内容: $line" >&2
    exit 2
  fi

  case "$class" in
    must|recommended) ;;
    *)
      echo "tools.tsv の class 列が不正です: $TOOLS_FILE:$line_no" >&2
      echo "  'must' または 'recommended' である必要があります。実際の値: '$class'" >&2
      exit 2
      ;;
  esac

  # check は eval する。tools.tsv はバージョン管理下の repository 所有ファイルであり、
  # 他のスクリプトと同じ信頼水準として扱う。外部由来の tools.tsv を読ませない。
  # eval が stdin を消費して while ループを壊さないよう /dev/null を渡す。
  #
  # この行だけ pipefail を外す（set +o pipefail のサブシェルで包む）。多くの check は
  # `codex mcp list | grep -q foo` のような形で、grep -q は最初の一致で即座に終了する。
  # これはツールが「見つかった」正常系であって異常ではないが、pipefail が有効なままだと
  # 生産側プロセスが次の書き込みで SIGPIPE を受け、その終了コードがパイプライン全体の
  # 終了コードとして観測される。結果、導入済みのツールが MISSING と誤判定され、
  # must ツールなら exit 1 で作業停止・人間へのエスカレーションまで起きてしまう
  # （実機で確認済み：pipefail 有効時は誤判定、`set +o pipefail` で回避すると正しく OK になる）。
  # スクリプト全体の pipefail は維持したいので、ここだけサブシェルで無効化する。
  # 「tidy」でこのサブシェルを外さないこと。
  if ( set +o pipefail; eval "$check" ) </dev/null >/dev/null 2>&1; then
    printf "  OK        %-14s %s\n" "$tool" "$class"
    continue
  fi

  if [ "$class" = "must" ]; then
    missing_must=$((missing_must + 1))
    printf "  MISSING   %-14s must         docs: %s\n" "$tool" "$docs"
  else
    missing_recommended=$((missing_recommended + 1))
    printf "  optional  %-14s recommended  fallback: %s\n" "$tool" "$fallback"
  fi
done < "$TOOLS_FILE"

echo

if [ "$missing_must" -gt 0 ]; then
  echo "must ツールが ${missing_must} 件不足しています。作業を止めて導入してください。"
  echo "導入手順は docs 列の参照先を確認する。"
  echo "context7 が使えない環境では WebSearch/WebFetch で公式ドキュメントを直接参照する。"
  exit 1
fi

if [ "$missing_recommended" -gt 0 ]; then
  echo "recommended ツールが ${missing_recommended} 件不足しています。"
  echo "上記の縮退先で作業を継続できます。導入を自発的に勧めないこと。"
fi

echo "must: OK"
