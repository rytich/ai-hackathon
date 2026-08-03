#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAG="archive-test-$$-${RANDOM}"
MISMATCH_TAG="v9.9.9"
TMP_DIR="$(mktemp -d)"
OUT="$TMP_DIR/public.zip"
PREFIX="agentic-framework-${TAG#v}"

cleanup() {
  git -C "$ROOT_DIR" tag -d "$TAG" >/dev/null 2>&1 || true
  git -C "$ROOT_DIR" tag -d "$MISMATCH_TAG" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

git -C "$ROOT_DIR" tag "$TAG" HEAD
"$ROOT_DIR/scripts/build-public-archive.sh" "$TAG" "$OUT" >/dev/null

git -C "$ROOT_DIR" tag "$MISMATCH_TAG" HEAD
if "$ROOT_DIR/scripts/build-public-archive.sh" "$MISMATCH_TAG" "$TMP_DIR/mismatch.zip" >/dev/null 2>&1; then
  echo "FAIL: tag と VERSION が不一致の archive 作成を許可した" >&2
  exit 1
fi

entries="$(zipinfo -1 "$OUT")"
for path in \
  "site/" \
  "scripts/configure-cloudflare-pages-domain.mjs" \
  "scripts/test-configure-cloudflare-pages-domain.mjs" \
  "scripts/deploy-site.sh" \
  "docs/framework/site-hosting.md" \
  "docs/decisions/2026-08-03-cloudflare-dns-cli-publication.md"; do
  if printf '%s\n' "$entries" | grep -Fq "$PREFIX/$path"; then
    echo "FAIL: public archive contains excluded path: $path" >&2
    exit 1
  fi
done

for reference in "site/" "scripts/deploy-site.sh" "docs/framework/site-hosting.md"; do
  if unzip -p "$OUT" "$PREFIX/README.md" "$PREFIX/docs/framework/README.md" | grep -Fq "$reference"; then
    echo "FAIL: public archive README still references excluded path: $reference" >&2
    exit 1
  fi
done

echo "PASS: Cloudflare and site publication assets are excluded from the public archive"
