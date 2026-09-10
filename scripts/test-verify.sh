#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VERIFY_SCRIPT="$ROOT_DIR/scripts/verify.sh"

if [ ! -x "$VERIFY_SCRIPT" ]; then
  echo "FAIL: scripts/verify.sh is missing or not executable" >&2
  exit 1
fi

FIXTURE="$(mktemp -d)"
trap 'rm -rf "$FIXTURE"' EXIT

mkdir -p "$FIXTURE/bin" "$FIXTURE/scripts"
cp "$VERIFY_SCRIPT" "$FIXTURE/scripts/verify.sh"
touch "$FIXTURE/scripts/test-alpha.mjs"

write_stub() {
  local path="$1"
  local name="$2"
  printf '%s\n' \
    '#!/usr/bin/env bash' \
    'set -eu' \
    "printf '%s\\n' '$name' >> \"\$TRACE_FILE\"" \
    "if [ \"\${FAIL_STEP:-}\" = '$name' ]; then exit 7; fi" \
    > "$path"
  chmod +x "$path"
}

write_stub "$FIXTURE/scripts/check-agent-tools.sh" "check-agent-tools"
write_stub "$FIXTURE/scripts/test-one.sh" "shell-test"
write_stub "$FIXTURE/scripts/check-doc-links.sh" "check-doc-links"

printf '%s\n' \
  '#!/usr/bin/env bash' \
  'set -eu' \
  'printf "node:%s\\n" "$*" >> "$TRACE_FILE"' \
  'if [ "${FAIL_STEP:-}" = node ]; then exit 7; fi' \
  > "$FIXTURE/bin/node"
chmod +x "$FIXTURE/bin/node"

printf '%s\n' \
  '#!/usr/bin/env bash' \
  'set -eu' \
  'printf "git:%s\\n" "$*" >> "$TRACE_FILE"' \
  'if [ "${FAIL_STEP:-}" = git ]; then exit 7; fi' \
  > "$FIXTURE/bin/git"
chmod +x "$FIXTURE/bin/git"

TRACE_FILE="$FIXTURE/trace.log"
export TRACE_FILE

(cd "$FIXTURE" && PATH="$FIXTURE/bin:/usr/bin:/bin" ./scripts/verify.sh)

EXPECTED="$FIXTURE/expected.log"
printf '%s\n' \
  'check-agent-tools' \
  'node:--test scripts/test-alpha.mjs' \
  'shell-test' \
  'check-doc-links' \
  'git:diff --check' \
  > "$EXPECTED"

if ! cmp -s "$EXPECTED" "$TRACE_FILE"; then
  echo "FAIL: verify gate order differs" >&2
  diff -u "$EXPECTED" "$TRACE_FILE" >&2 || true
  exit 1
fi

: > "$TRACE_FILE"
if (cd "$FIXTURE" && FAIL_STEP=check-agent-tools PATH="$FIXTURE/bin:/usr/bin:/bin" ./scripts/verify.sh); then
  echo "FAIL: verify succeeded after a required gate failed" >&2
  exit 1
fi

printf '%s\n' 'check-agent-tools' > "$EXPECTED"
if ! cmp -s "$EXPECTED" "$TRACE_FILE"; then
  echo "FAIL: verify did not stop after the first failed gate" >&2
  diff -u "$EXPECTED" "$TRACE_FILE" >&2 || true
  exit 1
fi

echo "PASS: verify executes required gates in order and fails fast"
