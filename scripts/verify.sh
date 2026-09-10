#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ -n "${AF_VERIFY_PROFILE:-}" ]; then
  ./scripts/check-agent-tools.sh --profile "$AF_VERIFY_PROFILE"
else
  ./scripts/check-agent-tools.sh
fi

node --test scripts/test-*.mjs

for test_file in scripts/test-*.sh; do
  if [ "$test_file" = "scripts/test-verify.sh" ]; then
    continue
  fi
  bash "$test_file"
done

./scripts/check-doc-links.sh
git diff --check
