#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$(mktemp -d "${TMPDIR:-/tmp}/af-bootstrap-metrics.XXXXXX")"
trap 'rm -rf "$TARGET_DIR"' EXIT

bash "$ROOT_DIR/scripts/bootstrap-project.sh" "$TARGET_DIR" >/dev/null

for file in \
  scripts/metrics.mjs \
  scripts/agentic/metrics.mjs \
  scripts/agentic/metrics/schema.mjs \
  scripts/agentic/metrics/storage.mjs \
  scripts/agentic/metrics/report.mjs \
  scripts/agentic/metrics/git.mjs \
  scripts/check-af-update-scope.mjs \
  scripts/agentic/check-af-update-scope.mjs \
  scripts/agentic/af-installation.mjs \
  .agentic-framework/schemas/metrics/work-unit.schema.json \
  .agentic-framework/installation.json
do
  test -f "$TARGET_DIR/$file"
done

node "$TARGET_DIR/scripts/metrics.mjs" --help >/dev/null
node -e 'const m=require(process.argv[1]); if (!m.files.some(f => f.ownership === "managed")) process.exit(1)' \
  "$TARGET_DIR/.agentic-framework/installation.json"
(
  cd "$TARGET_DIR"
  node scripts/metrics.mjs init --project-id sample-project --mode dedicated --remote-visibility private >/dev/null
  node scripts/metrics.mjs record --input - \
    < "$ROOT_DIR/schemas/metrics/work-unit.example.json" >/dev/null
  node scripts/metrics.mjs validate >/dev/null
)

echo "custom user content" >> "$TARGET_DIR/AGENTS.md"
MANIFEST_HASH_BEFORE="$(node -e 'const fs=require("fs"),c=require("crypto"); process.stdout.write(c.createHash("sha256").update(fs.readFileSync(process.argv[1])).digest("hex"))' "$TARGET_DIR/.agentic-framework/installation.json")"
bash "$ROOT_DIR/scripts/bootstrap-project.sh" "$TARGET_DIR" >/dev/null
MANIFEST_HASH_AFTER="$(node -e 'const fs=require("fs"),c=require("crypto"); process.stdout.write(c.createHash("sha256").update(fs.readFileSync(process.argv[1])).digest("hex"))' "$TARGET_DIR/.agentic-framework/installation.json")"

grep -Fq "custom user content" "$TARGET_DIR/AGENTS.md"
test "$MANIFEST_HASH_BEFORE" = "$MANIFEST_HASH_AFTER"

echo "PASS: bootstrap distributes metrics runtime and preserves user-owned files"
