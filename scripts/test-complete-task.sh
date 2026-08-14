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
assert_contains "reviews minimal diff scope" 'echo "- 最小差分: 要件を満たさない新規依存、抽象化、設定、範囲外変更がないか確認する。"'
assert_contains "requires dependency and abstraction rationale" 'echo "- 選択理由: 新規依存または抽象化がある場合、既存実装・標準機能・既存依存で満たせない理由が記録されているか確認する。"'
assert_contains "protects safety boundaries from minimization" 'echo "- 安全境界: 検証、データ損失防止、セキュリティ、アクセシビリティ、承認要件を「最小化」の理由で省略していないか確認する。"'
assert_contains "runs profile-selection regression checks" 'run bash scripts/test-select-ai-profile.sh'
assert_contains "runs the effect metrics completion diagnosis" 'node scripts/metrics.mjs doctor --completion-warning'
assert_contains "keeps metrics diagnosis non-blocking" 'node scripts/metrics.mjs doctor --completion-warning || echo "- WARNING: metrics doctor could not complete; task completion continues"'
assert_contains "syntax-checks the metrics CLI" 'run node --check scripts/metrics.mjs'
assert_contains "syntax-checks the update scope CLI" 'run node --check scripts/check-af-update-scope.mjs'
assert_contains "runs the complete effect metrics test set" 'run node --test scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs scripts/test-metrics-report.mjs scripts/test-metrics-cli.mjs scripts/test-af-installation.mjs'
assert_contains "runs bootstrap distribution regression checks" 'run bash scripts/test-bootstrap-project.sh'
assert_contains "runs installer regression checks" 'run bash scripts/test-install.sh'
assert_contains "runs context7 integration checks" 'run bash scripts/test-context7-integration.sh'

if [ "$FAIL" -ne 0 ]; then
  echo "FAIL: $PASS passed, $FAIL failed" >&2
  exit 1
fi

echo "PASS: $PASS completion pipeline regression checks"
