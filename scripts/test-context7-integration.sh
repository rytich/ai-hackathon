#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

test -f "$ROOT_DIR/docs/planning/research/2026-08-14-context7.md"
test -f "$ROOT_DIR/docs/decisions/2026-08-14-context7-integration.md"
grep -Fq 'github.com/upstash/context7' "$ROOT_DIR/docs/planning/research/2026-08-14-context7.md"
grep -Fq '採用' "$ROOT_DIR/docs/decisions/2026-08-14-context7-integration.md"

for file in "$ROOT_DIR/docs/framework/context7.md"; do
  test -f "$file"
  grep -Fq 'codex plugin add context7@context7-marketplace' "$file"
  grep -Fq 'codex mcp add context7' "$file"
  grep -Fq 'claude mcp add --scope user context7' "$file"
  grep -Fq 'CONTEXT7_API_KEY' "$file"
  grep -Fq 'resolve-library-id' "$file"
  grep -Fq 'query-docs' "$file"
done

for file in "$ROOT_DIR/AGENTS.md" "$ROOT_DIR/templates/project/AGENTS.md"; do
  grep -Fq 'library/framework/SDK/API/CLI/cloud service' "$file"
  grep -Fq 'context7' "$file"
done

for profile in codex claude codex-claude; do
  grep -Eq '^context7[[:space:]]+recommended[[:space:]]+' "$ROOT_DIR/.ai/profiles/$profile/tools.tsv"
  grep -Fq 'docs/framework/context7.md の公式手順でuser scopeへ導入' "$ROOT_DIR/.ai/profiles/$profile/tools.tsv"
  grep -Fq '/upstash/context7' "$ROOT_DIR/.ai/profiles/$profile/tools.tsv"
done

echo "PASS: context7 installation, verification, and usage rules are distributed"
