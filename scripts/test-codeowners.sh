#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_CODEOWNERS="$ROOT_DIR/.github/CODEOWNERS"
TEMPLATE_CODEOWNERS="$ROOT_DIR/templates/project/.github/CODEOWNERS"

test -f "$REPO_CODEOWNERS"
test -f "$TEMPLATE_CODEOWNERS"
test "$(wc -c < "$REPO_CODEOWNERS" | tr -d '[:space:]')" -lt 3145728

for pattern in \
  '/.github/' \
  '/AGENTS.md' \
  '/LICENSE' \
  '/docs/framework/quality-gates.md' \
  '/docs/framework/github-configuration.md' \
  '/docs/knowledge/business/legal/' \
  '/scripts/build-public-archive.sh' \
  '/scripts/install.sh' \
  '/templates/project/.github/' \
  '/templates/project/AGENTS.md' \
  '/templates/project/docs/knowledge/business/legal/'
do
  grep -Eq "^${pattern//\//\\/}[[:space:]]+@" "$REPO_CODEOWNERS"
  grep -Eq "^${pattern//\//\\/}[[:space:]]+@YOUR-GITHUB-OWNER$" "$TEMPLATE_CODEOWNERS"
done

grep -Eq '^/\.github/CODEOWNERS[[:space:]]+@' "$REPO_CODEOWNERS"
grep -Eq '^/\.github/CODEOWNERS[[:space:]]+@YOUR-GITHUB-OWNER$' "$TEMPLATE_CODEOWNERS"
grep -Fq 'Require review from Code Owners' "$ROOT_DIR/docs/framework/github-configuration.md"
grep -Fq '明示的なwrite access' "$ROOT_DIR/docs/framework/github-configuration.md"
grep -Fq '最後に一致したpattern' "$ROOT_DIR/docs/framework/github-configuration.md"

echo "PASS: CODEOWNERS protects approval-sensitive paths and distributes a configurable template"
