#!/usr/bin/env bash
# 説明サイトを Cloudflare Pages へデプロイする。
#
# 使い方:
#   scripts/deploy-site.sh              # VERSION の tag を使う
#   scripts/deploy-site.sh v0.2.1       # tag を指定
#   scripts/deploy-site.sh v0.2.1 --dry # アップロードせず、site/ を組み立てて中身を確認するだけ
#
# 事前に一度だけ: npx wrangler login
# 詳細は docs/framework/site-hosting.md
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

TAG="${1:-v$(cat VERSION)}"
DRY=""
for a in "$@"; do
  [ "$a" = "--dry" ] && DRY="1"
done

PROJECT="${CF_PAGES_PROJECT:-agentic-framework}"
SITE_DIR="$ROOT_DIR/site"
ZIP_NAME="agentic-framework-public.zip"

if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "site/index.html がありません" >&2
  exit 1
fi

if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "tag が見つかりません: $TAG" >&2
  echo "先に tag を作ってください: git tag -a $TAG -m \"Release ${TAG#v}\" && git push origin $TAG" >&2
  exit 1
fi

echo "tag: $TAG / project: $PROJECT"
echo

# 1. sanitize 済み zip を作って site/ へ置く。
"$ROOT_DIR/scripts/build-public-archive.sh" "$TAG" "$SITE_DIR/$ZIP_NAME"
echo

# 2. ページの版数表記と更新日を tag に合わせる。
TODAY="$(date +%Y-%m-%d)"
TAG="$TAG" TODAY="$TODAY" SITE_DIR="$SITE_DIR" python3 - <<'PY'
import os, re, pathlib
p = pathlib.Path(os.environ["SITE_DIR"]) / "index.html"
s = p.read_text(encoding="utf-8")
tag, today = os.environ["TAG"], os.environ["TODAY"]
before = s
s = re.sub(r'<span>v\d+\.\d+\.\d+</span>', f'<span>{tag}</span>', s)
s = re.sub(r'<span class="dl__tag">v[\d.]+</span>', f'<span class="dl__tag">{tag}</span>', s)
s = re.sub(r'(<span class="dl__note">更新 )\d{4}-\d{2}-\d{2}', rf'\g<1>{today}', s)
p.write_text(s, encoding="utf-8")
print(f"index.html: 版数を {tag}、更新日を {today} に更新" if s != before else "index.html: 変更なし")
PY
echo

# 3. 公開されるものを一覧で示す。site/ の中身はそのまま世界に出る。
echo "--- 公開されるファイル ---"
find "$SITE_DIR" -type f -not -name '.gitignore' | sed "s|$SITE_DIR/|  |" | sort
echo

if [ -n "$DRY" ]; then
  echo "--dry のためアップロードしません。site/ の中身を確認してください。"
  exit 0
fi

# 4. アップロード。
npx wrangler pages deploy "$SITE_DIR" --project-name "$PROJECT"

# 5. Cloudflare API で独自ドメインと DNS を冪等に設定する。
node "$ROOT_DIR/scripts/configure-cloudflare-pages-domain.mjs"
