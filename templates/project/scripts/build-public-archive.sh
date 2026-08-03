#!/usr/bin/env bash
# 公開配布用の archive を作る。
#
# この repository は private だが、フレームワーク自体は外部へ配布する。
# 内部の作業記録や、他プロジェクト・顧客の名前をそのまま出さないための sanitize を行う。
#
# 使い方:
#   scripts/build-public-archive.sh                      # VERSION の tag から作る
#   scripts/build-public-archive.sh v0.2.0               # tag を指定
#   scripts/build-public-archive.sh v0.2.0 /tmp/out.zip  # 出力先も指定
#
# 除外・置換のルールは環境変数で調整する:
#   PUBLIC_ARCHIVE_DROP="docs/work-notes"                # 中身を配布しないディレクトリ（カンマ区切り）
#   PUBLIC_ARCHIVE_REDACT="name1,name2"                  # 伏せる固有名（カンマ区切り）
#   PUBLIC_ARCHIVE_REDACT_WITH="導入先プロジェクト"        # 置換後の表記
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

TAG="${1:-v$(cat VERSION)}"
OUT="${2:-$ROOT_DIR/outputs/$(basename "$ROOT_DIR")-${TAG}-public.zip}"

# 既定の sanitize ルール。プロジェクトの実情に合わせて上書きする。
DROP="${PUBLIC_ARCHIVE_DROP:-docs/work-notes}"
REDACT="${PUBLIC_ARCHIVE_REDACT:-}"  # プロジェクトの他案件・顧客名をカンマ区切りで設定する
REDACT_WITH="${PUBLIC_ARCHIVE_REDACT_WITH:-導入先プロジェクト}"

if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "tag が見つかりません: $TAG" >&2
  echo "先に tag を作ってください: git tag -a $TAG -m \"Release ${TAG#v}\" && git push origin $TAG" >&2
  exit 1
fi

if [[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  TAG_VERSION="${TAG#v}"
  ARCHIVE_VERSION="$(git show "$TAG:VERSION" 2>/dev/null | tr -d '[:space:]')"
  if [ "$ARCHIVE_VERSION" != "$TAG_VERSION" ]; then
    echo "tag と VERSION が一致しません: $TAG -> $ARCHIVE_VERSION" >&2
    echo "VERSION を更新した commit に tag を付けてから archive を作成してください。" >&2
    exit 1
  fi
fi

PREFIX="$(basename "$ROOT_DIR")-${TAG#v}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git archive --format=tar --prefix="$PREFIX/" "$TAG" | tar -x -C "$WORK"
SRC="$WORK/$PREFIX"

echo "tag: $TAG"

# 1. 配布しないディレクトリの中身を落とし、理由を置いたプレースホルダを残す。
#    ディレクトリごと消すと index からのリンクが切れるため、README を残す。
IFS=',' read -r -a drop_list <<< "$DROP"
for d in "${drop_list[@]}"; do
  [ -n "$d" ] || continue
  [ -d "$SRC/$d" ] || continue
  find "$SRC/$d" -type f -name '*.md' -delete
  cat > "$SRC/$d/README.md" <<'PLACEHOLDER'
# （公開版では除外）

このディレクトリの内容は内部の作業記録のため、公開配布用の archive からは除外している。
運用の規約そのものは `docs/framework/` に、判断の記録は `docs/decisions/` にある。

書き方は `docs/templates/` を参照。
PLACEHOLDER
  echo "dropped: $d/*.md （README に置換）"
done

# 2. 固有名を伏せ、置換で崩れた日本語を整える。
#    日本語を扱うため python3 で処理する（byte 単位の sed/perl では文字クラスが壊れる）。
SRC="$SRC" REDACT="$REDACT" REDACT_WITH="$REDACT_WITH" python3 - <<'PY'
import os, re, pathlib

src = pathlib.Path(os.environ["SRC"])
names = [n for n in os.environ["REDACT"].split(",") if n]
rep = os.environ["REDACT_WITH"]
# 長い名前から先に置換する（部分一致で短い名前が先に食わないように）
names.sort(key=len, reverse=True)

R = re.escape(rep)
CJK = r"[　-〿぀-ヿ一-鿿]"
counts = {n: 0 for n in names}

for f in src.rglob("*"):
    if not f.is_file():
        continue
    try:
        s = orig = f.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    for n in names:
        if n in s:
            counts[n] += 1
            s = s.replace(n, rep)
    # 同じ置換語が並んだ列挙をひとつに畳む（「A、A」→「A」）
    s = re.sub(rf"{R}(?:\s*[、,／/]\s*{R})+", rep, s)
    # 置換語と後続の日本語の間に残った空白を詰める
    s = re.sub(rf"{R}[ \t]+(?={CJK})", rep, s)
    if s != orig:
        f.write_text(s, encoding="utf-8")

for n, c in counts.items():
    if c:
        print(f"redacted: {n} -> {rep} （{c} files）")
PY

# 3. 再 archive。
mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
( cd "$WORK" && zip -q -r "$OUT" "$PREFIX" )

# 4. 検証: 伏せ漏れと秘密情報の混入を機械的に確認する。
echo
echo "--- 検証 ---"
leak=0
IFS=',' read -r -a verify_list <<< "$REDACT"
for name in ${verify_list[@]+"${verify_list[@]}"}; do
  [ -n "$name" ] || continue
  if grep -rq -- "$name" "$SRC" 2>/dev/null; then
    echo "NG: '$name' が残っている" >&2
    leak=1
  fi
done
if grep -rqE '(sk-[A-Za-z0-9]{16}|ghp_[A-Za-z0-9]{20}|AKIA[0-9A-Z]{12}|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY)' "$SRC" 2>/dev/null; then
  echo "NG: 秘密情報らしき値が含まれている" >&2
  leak=1
fi
if [ "$leak" -ne 0 ]; then
  rm -f "$OUT"
  echo "archive を破棄しました。ルールを見直してください。" >&2
  exit 1
fi
echo "OK: 伏せ漏れなし、秘密情報の検出なし"

echo
echo "作成: $OUT"
ls -lh "$OUT" | awk '{print "サイズ: " $5}'
