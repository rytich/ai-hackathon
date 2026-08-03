#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT="$ROOT_DIR/scripts/complete-task.sh"
PASS=0
FAIL=0

assert_contains() {
  local description="$1"
  local pattern="$2"
  if grep -Fq "$pattern" "$SCRIPT"; then
    PASS=$((PASS + 1))
  else
    echo "FAIL: $description" >&2
    FAIL=$((FAIL + 1))
  fi
}

assert_contains "reuses an existing open PR" 'gh pr list --repo "$REPO_FULL_NAME" --base "$BASE_BRANCH" --head "$CURRENT_BRANCH" --state open'
assert_contains "creates a PR only when lookup is empty" 'if [ "$PR_NUMBER" = "" ]; then'
assert_contains "does not post the objective review as a PR comment" 'gh pr comment "$PR_NUMBER" --repo "$REPO_FULL_NAME" --body-file "$REVIEW_REQUEST_FILE"'
assert_contains "requires structured human review headings" "grep -q '確認対象' \"\$REVIEW_REQUEST_FILE\""
assert_contains "checks PR state again after merge" 'PR_JSON="$(fetch_pr_json "$PR_NUMBER")"'
assert_contains "keeps Issue open when merge is not confirmed" 'Issue will remain open.'
assert_contains "checks the Issue state immediately before close" 'ISSUE_JSON="$(fetch_issue_json)"'

if [ "$FAIL" -ne 0 ]; then
  echo "FAIL: $PASS passed, $FAIL failed" >&2
  exit 1
fi

echo "PASS: $PASS completion pipeline regression checks"
