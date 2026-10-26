#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FIXTURE="$(mktemp -d)"
OUTSIDE_DOC="${FIXTURE}.outside.md"
trap 'rm -rf "$FIXTURE"; rm -f "$OUTSIDE_DOC"' EXIT

mkdir -p "$FIXTURE/docs"
cp "$ROOT_DIR/scripts/check-doc-links.sh" "$FIXTURE/check-doc-links.sh"
printf '# Docs\n' > "$FIXTURE/docs/README.md"
printf '# Outside\n' > "$OUTSIDE_DOC"
printf '# Root\n\n[outside](%s)\n' "$OUTSIDE_DOC" > "$FIXTURE/README.md"

if (cd "$FIXTURE" && ./check-doc-links.sh docs >/dev/null 2>&1); then
  echo "FAIL: existing absolute local link was accepted" >&2
  exit 1
fi

printf '# Root\n\n[docs](docs/README.md)\n' > "$FIXTURE/README.md"
(cd "$FIXTURE" && ./check-doc-links.sh docs >/dev/null)

echo "PASS: docs link checker rejects non-portable absolute local links"
