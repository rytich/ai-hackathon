#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAG="archive-test-$$-${RANDOM}"
MISMATCH_TAG="v9.9.9"
TMP_DIR="$(mktemp -d)"
OUT="$TMP_DIR/public.zip"
PREFIX="agentic-framework-${TAG#v}"
FIXTURE_PATH="docs/archive-sanitization-fixture.txt"
FIXTURE_CONTENT="$TMP_DIR/archive-sanitization-fixture.txt"

cleanup() {
  git -C "$ROOT_DIR" tag -d "$TAG" >/dev/null 2>&1 || true
  git -C "$ROOT_DIR" tag -d "$MISMATCH_TAG" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

cat > "$FIXTURE_CONTENT" <<'FIXTURE'
owner=https://github.com/rytich/agentic-framework/issues/34
repo-posix=/Users/example/github/agentic-framework/docs/README.md
home-posix=/Users/example/.codex/example.json
home-windows=C:\Users\example\.codex\example.json
FIXTURE

FIXTURE_BLOB="$(git -C "$ROOT_DIR" hash-object -w "$FIXTURE_CONTENT")"
TEST_INDEX="$TMP_DIR/index"
GIT_INDEX_FILE="$TEST_INDEX" git -C "$ROOT_DIR" read-tree HEAD
GIT_INDEX_FILE="$TEST_INDEX" git -C "$ROOT_DIR" update-index \
  --add --cacheinfo "100644,$FIXTURE_BLOB,$FIXTURE_PATH"
FIXTURE_TREE="$(GIT_INDEX_FILE="$TEST_INDEX" git -C "$ROOT_DIR" write-tree)"
FIXTURE_COMMIT="$(printf '%s\n' 'test: add archive sanitization fixture' | \
  GIT_AUTHOR_NAME='Archive Test' GIT_AUTHOR_EMAIL='archive-test@example.invalid' \
  GIT_COMMITTER_NAME='Archive Test' GIT_COMMITTER_EMAIL='archive-test@example.invalid' \
  git -C "$ROOT_DIR" commit-tree "$FIXTURE_TREE" -p HEAD)"
git -C "$ROOT_DIR" tag "$TAG" "$FIXTURE_COMMIT"
"$ROOT_DIR/scripts/build-public-archive.sh" "$TAG" "$OUT" >/dev/null

EXTRACTED="$TMP_DIR/extracted"
unzip -q "$OUT" -d "$EXTRACTED"

actual_fixture="$(cat "$EXTRACTED/$PREFIX/$FIXTURE_PATH")"
expected_fixture="$(cat <<'EXPECTED'
owner=https://github.com/OWNER/agentic-framework/issues/34
repo-posix=docs/README.md
home-posix=$HOME/.codex/example.json
home-windows=%USERPROFILE%\.codex\example.json
EXPECTED
)"
if [ "$actual_fixture" != "$expected_fixture" ]; then
  echo "FAIL: public archive did not normalize owner and user-home paths" >&2
  diff -u \
    <(printf '%s\n' "$expected_fixture") \
    <(printf '%s\n' "$actual_fixture") >&2 || true
  exit 1
fi

for leaked in "rytich" "/Users/example" 'C:\Users\example'; do
  if grep -rqF -- "$leaked" "$EXTRACTED/$PREFIX"; then
    echo "FAIL: public archive contains unsanitized value: $leaked" >&2
    exit 1
  fi
done

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
  ".github/CODEOWNERS" \
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

for required in LICENSE scripts/install.sh; do
  if ! printf '%s\n' "$entries" | grep -Fq "$PREFIX/$required"; then
    echo "FAIL: public archive is missing required distribution file: $required" >&2
    exit 1
  fi
done

echo "PASS: license and installer are included in the public archive"

if ! printf '%s\n' "$entries" | grep -Fq "$PREFIX/templates/project/.github/CODEOWNERS"; then
  echo "FAIL: public archive is missing the configurable CODEOWNERS template" >&2
  exit 1
fi

echo "PASS: private repository CODEOWNERS is excluded and the configurable template is included"
