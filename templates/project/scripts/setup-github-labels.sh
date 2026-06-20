#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required. Install gh or create labels manually from .github/labels.yml." >&2
  exit 1
fi

ensure_label() {
  local name="$1"
  local color="$2"
  local description="$3"

  if gh label list --limit 500 --json name --jq '.[].name' | grep -Fxq "$name"; then
    gh label edit "$name" --color "$color" --description "$description"
    echo "updated: $name"
  else
    gh label create "$name" --color "$color" --description "$description"
    echo "created: $name"
  fi
}

ensure_label "ready" "2da44e" "Ready for an agent to start."
ensure_label "in-progress" "fbca04" "Someone is actively working on this."
ensure_label "blocked" "d1242f" "Waiting on dependency, external decision, or blocker."
ensure_label "needs-human" "8250df" "Human approval or judgment is required."
ensure_label "review-ready" "0969da" "Ready for PR review."
ensure_label "auto-merge-ok" "1a7f37" "Candidate for auto merge after checks pass."
ensure_label "manual-merge-required" "bf3989" "Must be merged manually by a human approver."
