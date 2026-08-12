#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FIXTURE="$(mktemp -d)"
OUTSIDE_FILE="${FIXTURE}.outside"
trap 'rm -rf "$FIXTURE"; rm -f "$OUTSIDE_FILE"' EXIT

if ! cmp -s "$ROOT_DIR/scripts/select-ai-profile.sh" "$ROOT_DIR/templates/project/scripts/select-ai-profile.sh"; then
  echo "FAIL: root and template profile selectors differ" >&2
  exit 1
fi

mkdir -p "$FIXTURE/scripts"
cp -R "$ROOT_DIR/templates/project/.ai" "$FIXTURE/.ai"
cp "$ROOT_DIR/templates/project/scripts/select-ai-profile.sh" "$FIXTURE/scripts/select-ai-profile.sh"
chmod +x "$FIXTURE/scripts/select-ai-profile.sh"
printf 'shared\n' > "$FIXTURE/AGENTS.md"

assert_eq() {
  local expected="$1"
  local actual="$2"
  local label="$3"
  if [ "$expected" != "$actual" ]; then
    echo "FAIL: $label: expected '$expected', got '$actual'" >&2
    exit 1
  fi
}

select_profile() {
  local profile="$1"
  (cd "$FIXTURE" && ./scripts/select-ai-profile.sh "$profile" >/dev/null)
  assert_eq "$profile" "$(tr -d '[:space:]' < "$FIXTURE/.ai/active-profile")" "$profile becomes active"
  assert_eq "shared" "$(cat "$FIXTURE/AGENTS.md")" "$profile preserves shared AGENTS.md"
}

select_profile codex
test ! -e "$FIXTURE/CLAUDE.md"
test ! -e "$FIXTURE/.github/copilot-instructions.md"

select_profile claude
test -f "$FIXTURE/CLAUDE.md"

select_profile codex-claude
test -f "$FIXTURE/CLAUDE.md"

select_profile hermes
test ! -e "$FIXTURE/CLAUDE.md"
test ! -e "$FIXTURE/.github/copilot-instructions.md"

select_profile copilot
test ! -e "$FIXTURE/CLAUDE.md"
test -f "$FIXTURE/.github/copilot-instructions.md"

select_profile generic
test ! -e "$FIXTURE/CLAUDE.md"
test ! -e "$FIXTURE/.github/copilot-instructions.md"

printf 'shared\n' > "$FIXTURE/AGENTS.md"
cp "$FIXTURE/.ai/profiles/claude/manifest.env" "$FIXTURE/claude-manifest.env.bak"
printf 'PROFILE_NAME=claude\nPROFILE_DESCRIPTION="invalid sibling"\nPROFILE_FILES="AGENTS.md"\n' > "$FIXTURE/.ai/profiles/claude/manifest.env"
if (cd "$FIXTURE" && ./scripts/select-ai-profile.sh codex >/dev/null 2>&1); then
  echo "FAIL: malformed sibling profile was accepted" >&2
  exit 1
fi
assert_eq "shared" "$(cat "$FIXTURE/AGENTS.md")" "malformed sibling preserves shared AGENTS.md"
assert_eq "generic" "$(tr -d '[:space:]' < "$FIXTURE/.ai/active-profile")" "malformed sibling preserves active profile"
mv "$FIXTURE/claude-manifest.env.bak" "$FIXTURE/.ai/profiles/claude/manifest.env"

printf 'outside\n' > "$OUTSIDE_FILE"
cp "$FIXTURE/.ai/profiles/claude/manifest.env" "$FIXTURE/claude-manifest.env.bak"
printf 'PROFILE_NAME=claude\nPROFILE_DESCRIPTION="unsafe path"\nPROFILE_FILES="../%s"\n' "$(basename "$OUTSIDE_FILE")" > "$FIXTURE/.ai/profiles/claude/manifest.env"
if (cd "$FIXTURE" && ./scripts/select-ai-profile.sh codex >/dev/null 2>&1); then
  echo "FAIL: unsafe sibling profile path was accepted" >&2
  exit 1
fi
assert_eq "outside" "$(cat "$OUTSIDE_FILE")" "unsafe path preserves outside file"
mv "$FIXTURE/claude-manifest.env.bak" "$FIXTURE/.ai/profiles/claude/manifest.env"

printf 'existing claude\n' > "$FIXTURE/CLAUDE.md"
cp "$FIXTURE/.ai/profiles/codex/manifest.env" "$FIXTURE/codex-manifest.env.bak"
printf 'PROFILE_NAME=codex\nPROFILE_DESCRIPTION="missing source"\nPROFILE_FILES="missing.md"\n' > "$FIXTURE/.ai/profiles/codex/manifest.env"
if (cd "$FIXTURE" && ./scripts/select-ai-profile.sh codex >/dev/null 2>&1); then
  echo "FAIL: profile with missing source was accepted" >&2
  exit 1
fi
assert_eq "existing claude" "$(cat "$FIXTURE/CLAUDE.md")" "missing source preserves existing host file"
assert_eq "generic" "$(tr -d '[:space:]' < "$FIXTURE/.ai/active-profile")" "missing source preserves active profile"
mv "$FIXTURE/codex-manifest.env.bak" "$FIXTURE/.ai/profiles/codex/manifest.env"

echo "PASS: profile selection preserves shared rules and state for 6 profiles"
