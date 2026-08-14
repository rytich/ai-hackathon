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
#   PUBLIC_ARCHIVE_EXTRA_EXCLUDE="path/to/local-only"   # 配布しない追加パス（カンマ区切り）
#   PUBLIC_ARCHIVE_REDACT="name1,name2"                  # 伏せる固有名（カンマ区切り）
#   PUBLIC_ARCHIVE_REDACT_WITH="導入先プロジェクト"        # 置換後の表記
#   PUBLIC_ARCHIVE_OWNER="source-owner"                  # 公開元 owner 名
#   PUBLIC_ARCHIVE_OWNER_WITH="OWNER"                    # owner の置換後表記
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

TAG="${1:-v$(cat VERSION)}"
OUT="${2:-$ROOT_DIR/outputs/agentic-framework-${TAG}-public.zip}"

# 既定の sanitize ルール。プロジェクトの実情に合わせて上書きする。
DROP="${PUBLIC_ARCHIVE_DROP:-docs/work-notes}"
LOCAL_ONLY_EXCLUDE="site/,.github/CODEOWNERS,scripts/configure-cloudflare-pages-domain.mjs,scripts/test-configure-cloudflare-pages-domain.mjs,scripts/deploy-site.sh,docs/framework/site-hosting.md,docs/decisions/2026-08-03-cloudflare-dns-cli-publication.md"
EXTRA_EXCLUDE="${PUBLIC_ARCHIVE_EXTRA_EXCLUDE:-}"
REDACT="${PUBLIC_ARCHIVE_REDACT:-ten_matcha,bonsmith_corporate,kdic,innovation-team-hy,tenjp}"
REDACT_WITH="${PUBLIC_ARCHIVE_REDACT_WITH:-導入先プロジェクト}"
OWNER="${PUBLIC_ARCHIVE_OWNER:-rytich}"
OWNER_WITH="${PUBLIC_ARCHIVE_OWNER_WITH:-OWNER}"

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
  if ! git show "$TAG:CHANGELOG.md" | grep -Eq "^## ${TAG_VERSION}( | -)"; then
    echo "CHANGELOG.md に release entry がありません: $TAG_VERSION" >&2
    exit 1
  fi
fi

PREFIX="agentic-framework-${TAG#v}"
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

# 2. この repository 固有の Cloudflare / 説明サイト公開資産は AF 本体の配布物に含めない。
#    追加のローカル専用パスも同じ仕組みで除外できる。
EXCLUDE="$LOCAL_ONLY_EXCLUDE"
if [ -n "$EXTRA_EXCLUDE" ]; then
  EXCLUDE="$EXCLUDE,$EXTRA_EXCLUDE"
fi
IFS=',' read -r -a exclude_list <<< "$EXCLUDE"
for path in "${exclude_list[@]}"; do
  [ -n "$path" ] || continue
  rm -rf "$SRC/$path"
  echo "excluded: $path"
done

# 除外したパスへの配布版 README の導線も消し、リンク切れを残さない。
SRC="$SRC" EXCLUDE="$EXCLUDE" python3 - <<'PY'
import os
import pathlib

src = pathlib.Path(os.environ["SRC"])
needles = [path for path in os.environ["EXCLUDE"].split(",") if path]

for f in src.rglob("*.md"):
    text = f.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    kept = [line for line in lines if not any(needle in line for needle in needles)]
    if kept != lines:
        f.write_text("".join(kept), encoding="utf-8")
PY

# 3. 固有名を伏せ、置換で崩れた日本語を整える。
#    日本語を扱うため python3 で処理する（byte 単位の sed/perl では文字クラスが壊れる）。
SRC="$SRC" REDACT="$REDACT" REDACT_WITH="$REDACT_WITH" OWNER="$OWNER" OWNER_WITH="$OWNER_WITH" python3 - <<'PY'
import os, re, pathlib

src = pathlib.Path(os.environ["SRC"])
names = [n for n in os.environ["REDACT"].split(",") if n]
rep = os.environ["REDACT_WITH"]
owner = os.environ["OWNER"]
owner_with = os.environ["OWNER_WITH"]
repo = "agentic-framework"
# 長い名前から先に置換する（部分一致で短い名前が先に食わないように）
names.sort(key=len, reverse=True)

R = re.escape(rep)
CJK = r"[　-〿぀-ヿ一-鿿]"
counts = {n: 0 for n in names}
repo_posix = re.compile(
    rf"/(?:Users|home)/[^/\s\"'<>`]+/(?:[^/\s\"'<>`]+/)*{re.escape(repo)}/"
)
repo_windows = re.compile(
    rf"[A-Za-z]:\\Users\\[^\\\s\"'<>`]+\\(?:[^\\\s\"'<>`]+\\)*{re.escape(repo)}\\",
    re.IGNORECASE,
)
posix_home = re.compile(r"/(?:Users|home)/[^/\s\"'<>`]+")
windows_home = re.compile(r"[A-Za-z]:\\Users\\[^\\\s\"'<>`]+", re.IGNORECASE)

for f in src.rglob("*"):
    if not f.is_file():
        continue
    try:
        s = orig = f.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    if owner:
        s = s.replace(
            f"https://github.com/{owner}/{repo}",
            f"https://github.com/{owner_with}/{repo}",
        )
    s = repo_posix.sub("", s)
    s = repo_windows.sub("", s)
    s = posix_home.sub("$HOME", s)
    s = windows_home.sub("%USERPROFILE%", s)
    if owner:
        s = s.replace(owner, owner_with)
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

# 4. 再 archive。
mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
( cd "$WORK" && zip -q -r "$OUT" "$PREFIX" )

# 5. 検証: 除外漏れ、伏せ漏れと秘密情報の混入を機械的に確認する。
echo
echo "--- 検証 ---"
leak=0
for path in "${exclude_list[@]}"; do
  [ -n "$path" ] || continue
  if [ -e "$SRC/$path" ]; then
    echo "NG: local-only path '$path' が残っている" >&2
    leak=1
  fi
done
IFS=',' read -r -a verify_list <<< "$REDACT"
for name in ${verify_list[@]+"${verify_list[@]}"}; do
  [ -n "$name" ] || continue
  if grep -rq -- "$name" "$SRC" 2>/dev/null; then
    echo "NG: '$name' が残っている" >&2
    leak=1
  fi
done
if ! SRC="$SRC" OWNER="$OWNER" python3 - <<'PY'
import os
import pathlib
import re
import sys

src = pathlib.Path(os.environ["SRC"])
owner = os.environ["OWNER"]
posix_home = re.compile(r"/(?:Users|home)/[^/\s\"'<>`]+")
windows_home = re.compile(r"[A-Za-z]:\\Users\\[^\\\s\"'<>`]+", re.IGNORECASE)
leaks = []

for f in src.rglob("*"):
    if not f.is_file():
        continue
    try:
        text = f.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    relative = f.relative_to(src)
    if owner and owner in text:
        leaks.append(("public owner", relative))
    if posix_home.search(text):
        leaks.append(("POSIX user-home path", relative))
    if windows_home.search(text):
        leaks.append(("Windows user-profile path", relative))

for kind, relative in leaks:
    print(f"NG: {kind} が残っている: {relative}", file=sys.stderr)
sys.exit(1 if leaks else 0)
PY
then
  leak=1
fi
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
