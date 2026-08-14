#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
test -x "$ROOT_DIR/scripts/bootstrap-project.sh"
TARGET_DIR="$(mktemp -d "${TMPDIR:-/tmp}/af-bootstrap-metrics.XXXXXX")"
CONFLICT_TARGET="$(mktemp -d "${TMPDIR:-/tmp}/af-bootstrap-conflict.XXXXXX")"
SEEDED_TARGET="$(mktemp -d "${TMPDIR:-/tmp}/af-bootstrap-seeded.XXXXXX")"
trap 'rm -rf "$TARGET_DIR" "$CONFLICT_TARGET" "$SEEDED_TARGET"' EXIT

mkdir -p "$CONFLICT_TARGET/scripts/agentic" "$CONFLICT_TARGET/src"
printf 'custom user runtime\n' > "$CONFLICT_TARGET/scripts/agentic/metrics.mjs"
printf 'existing application\n' > "$CONFLICT_TARGET/src/app.txt"

set +e
CONFLICT_OUTPUT="$(bash "$ROOT_DIR/scripts/bootstrap-project.sh" "$CONFLICT_TARGET" 2>&1)"
CONFLICT_STATUS=$?
set -e

if [ "$CONFLICT_STATUS" -ne 2 ]; then
  echo "FAIL: collision must return exit 2, got $CONFLICT_STATUS" >&2
  exit 1
fi
test ! -e "$CONFLICT_TARGET/.agentic-framework/installation.json"
grep -Fq "custom user runtime" "$CONFLICT_TARGET/scripts/agentic/metrics.mjs"
grep -Fq "existing application" "$CONFLICT_TARGET/src/app.txt"
test ! -e "$CONFLICT_TARGET/AGENTS.md"
test ! -e "$CONFLICT_TARGET/docs/framework/README.md"

INCOMING_DIR="$(find "$CONFLICT_TARGET/.agentic-framework/incoming" -mindepth 1 -maxdepth 1 -type d | head -1)"
test -n "$INCOMING_DIR"
test -f "$INCOMING_DIR/CONFLICTS.md"
test -f "$INCOMING_DIR/overlay/scripts/agentic/metrics.mjs"
grep -Fq 'scripts/agentic/metrics.mjs' "$INCOMING_DIR/CONFLICTS.md"
printf '%s' "$CONFLICT_OUTPUT" | grep -Fq '導入未完了'

set +e
bash "$ROOT_DIR/scripts/bootstrap-project.sh" --accept-existing "$CONFLICT_TARGET" >/dev/null 2>&1
MANAGED_ACCEPT_STATUS=$?
set -e
test "$MANAGED_ACCEPT_STATUS" -eq 2
test ! -e "$CONFLICT_TARGET/AGENTS.md"

printf 'project-specific agent rules\n' > "$SEEDED_TARGET/AGENTS.md"
set +e
bash "$ROOT_DIR/scripts/bootstrap-project.sh" "$SEEDED_TARGET" >/dev/null 2>&1
SEEDED_STATUS=$?
set -e
test "$SEEDED_STATUS" -eq 2
test ! -e "$SEEDED_TARGET/docs/framework/README.md"

bash "$ROOT_DIR/scripts/bootstrap-project.sh" --accept-existing "$SEEDED_TARGET" >/dev/null
grep -Fq 'project-specific agent rules' "$SEEDED_TARGET/AGENTS.md"
test -f "$SEEDED_TARGET/docs/framework/README.md"
test -f "$SEEDED_TARGET/.agentic-framework/installation.json"

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
  .agentic-framework/installation.json \
  docs/framework/context7.md
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
