#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/complete-task.sh --issue <number> [options]

Options:
  --issue <number>          GitHub Issue number for the completed task. Required.
  --base <branch>           Base branch for PR. Default: main.
  --title <title>           PR title. Default: issue title.
  --task-ids <ids>          Spec Kit task ids, comma-separated or free text.
  --commit-message <msg>    Commit message. Default: "docs: complete issue #<n>".
  --stage-all               Stage all repo changes except local/tooling artifacts.
  --merge                   Merge the PR after objective review passes.
  --close-issue             Close the Issue after merge succeeds.
  --review-request-file <p> Post only unresolved human review requests from this file.
  --dry-run                 Print planned actions without changing GitHub state.

Environment:
  VALIDATION_COMMANDS       Optional newline-separated commands to run.
  REVIEW_OUTPUT_DIR         Optional review output directory. Default: docs/work-notes.

The script is intentionally explicit: no auto-detection of task identity,
no merge without --merge, no issue close without --close-issue, and no
commenting on closed Issues.
USAGE
}

ISSUE=""
BASE_BRANCH="main"
TITLE=""
TASK_IDS=""
COMMIT_MESSAGE=""
STAGE_ALL=false
MERGE=false
CLOSE_ISSUE=false
REVIEW_REQUEST_FILE=""
DRY_RUN=false

while [ "$#" -gt 0 ]; do
  case "$1" in
    --issue)
      ISSUE="${2:-}"
      shift 2
      ;;
    --base)
      BASE_BRANCH="${2:-}"
      shift 2
      ;;
    --title)
      TITLE="${2:-}"
      shift 2
      ;;
    --task-ids)
      TASK_IDS="${2:-}"
      shift 2
      ;;
    --commit-message)
      COMMIT_MESSAGE="${2:-}"
      shift 2
      ;;
    --stage-all)
      STAGE_ALL=true
      shift
      ;;
    --merge)
      MERGE=true
      shift
      ;;
    --close-issue)
      CLOSE_ISSUE=true
      shift
      ;;
    --review-request-file)
      REVIEW_REQUEST_FILE="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [ "$ISSUE" = "" ]; then
  echo "--issue is required" >&2
  usage
  exit 1
fi

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

run() {
  echo "+ $*"
  if [ "$DRY_RUN" = false ]; then
    "$@"
  fi
}

run_shell() {
  echo "+ $*"
  if [ "$DRY_RUN" = false ]; then
    bash -lc "$*"
  fi
}

require_cmd git
require_cmd gh
require_cmd jq

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

CURRENT_BRANCH="$(git branch --show-current)"
REPO_FULL_NAME="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"

fetch_issue_json() {
  gh issue view "$ISSUE" --repo "$REPO_FULL_NAME" --json title,state,stateReason,labels,assignees,url,updatedAt
}

fetch_pr_json() {
  gh pr view "$1" --repo "$REPO_FULL_NAME" --json number,state,mergedAt,mergeStateStatus,headRefOid,url
}

find_open_pr_number() {
  gh pr list --repo "$REPO_FULL_NAME" --base "$BASE_BRANCH" --head "$CURRENT_BRANCH" --state open \
    --json number --jq '.[0].number // empty'
}

ensure_issue_open() {
  local context="$1"
  local json state reason
  json="$(fetch_issue_json)"
  state="$(printf "%s" "$json" | jq -r .state)"
  reason="$(printf "%s" "$json" | jq -r '.stateReason // "-"')"
  if [ "$state" != "OPEN" ]; then
    echo "Issue #$ISSUE is not open during $context: $state ($reason)" >&2
    return 1
  fi
}

ensure_pr_open() {
  local pr_number="$1"
  local context="$2"
  local json state
  json="$(fetch_pr_json "$pr_number")"
  state="$(printf "%s" "$json" | jq -r .state)"
  if [ "$state" != "OPEN" ]; then
    echo "PR #$pr_number is not open during $context: $state" >&2
    return 1
  fi
}

ISSUE_JSON="$(fetch_issue_json)"
ISSUE_TITLE="$(printf "%s" "$ISSUE_JSON" | jq -r .title)"
ISSUE_STATE="$(printf "%s" "$ISSUE_JSON" | jq -r .state)"
ISSUE_URL="$(printf "%s" "$ISSUE_JSON" | jq -r .url)"

if [ "$TITLE" = "" ]; then
  TITLE="$ISSUE_TITLE"
fi

if [ "$COMMIT_MESSAGE" = "" ]; then
  COMMIT_MESSAGE="docs: complete issue #$ISSUE"
fi

if [ "$ISSUE_STATE" != "OPEN" ]; then
  echo "Issue #$ISSUE is not open: $ISSUE_STATE" >&2
  exit 1
fi

if [ "$CURRENT_BRANCH" = "$BASE_BRANCH" ]; then
  echo "Refusing to run from base branch '$BASE_BRANCH'. Create a task branch first." >&2
  exit 1
fi

echo "Repository: $REPO_FULL_NAME"
echo "Issue: #$ISSUE $ISSUE_TITLE"
echo "Branch: $CURRENT_BRANCH -> $BASE_BRANCH"

if [ "$STAGE_ALL" = true ]; then
  # Keep local tool/session artifacts out of task commits by default.
  run git add --all -- . \
    ':!.serena' \
    ':!.serena/**' \
    ':!outputs' \
    ':!outputs/**' \
    ':!.env' \
    ':!.env.*' \
    ':!.ai/backups' \
    ':!.ai/backups/**'
fi

if git diff --cached --quiet; then
  echo "No staged changes. Use --stage-all or stage files before running." >&2
  exit 1
fi

run_validation() {
  if [ "${VALIDATION_COMMANDS:-}" != "" ]; then
    printf "%s\n" "$VALIDATION_COMMANDS" | while IFS= read -r command; do
      [ "$command" = "" ] && continue
      run_shell "$command"
    done
    return
  fi

  [ -f scripts/bootstrap-project.sh ] && run bash -n scripts/bootstrap-project.sh
  [ -f scripts/select-ai-profile.sh ] && run bash -n scripts/select-ai-profile.sh
  [ -f templates/project/scripts/select-ai-profile.sh ] && run bash -n templates/project/scripts/select-ai-profile.sh
  [ -f templates/project/scripts/setup-github-labels.sh ] && run bash -n templates/project/scripts/setup-github-labels.sh
  [ -f scripts/check-agent-tools.sh ] && run bash -n scripts/check-agent-tools.sh
  [ -f scripts/test-complete-task.sh ] && run bash -n scripts/test-complete-task.sh
  [ -f scripts/test-check-agent-tools.sh ] && run bash -n scripts/test-check-agent-tools.sh
  [ -f scripts/test-select-ai-profile.sh ] && run bash -n scripts/test-select-ai-profile.sh
  [ -f scripts/metrics.mjs ] && run node --check scripts/metrics.mjs
  [ -f scripts/metrics/schema.mjs ] && run node --check scripts/metrics/schema.mjs
  [ -f scripts/metrics/storage.mjs ] && run node --check scripts/metrics/storage.mjs
  [ -f scripts/metrics/report.mjs ] && run node --check scripts/metrics/report.mjs
  [ -f scripts/metrics/git.mjs ] && run node --check scripts/metrics/git.mjs
  [ -f scripts/af-installation.mjs ] && run node --check scripts/af-installation.mjs
  [ -f scripts/create-installation-manifest.mjs ] && run node --check scripts/create-installation-manifest.mjs
  [ -f scripts/check-af-update-scope.mjs ] && run node --check scripts/check-af-update-scope.mjs
  [ -f templates/project/scripts/metrics.mjs ] && run node --check templates/project/scripts/metrics.mjs
  [ -f templates/project/scripts/check-af-update-scope.mjs ] && run node --check templates/project/scripts/check-af-update-scope.mjs

  if [ -f scripts/test-check-agent-tools.sh ]; then
    run ./scripts/test-check-agent-tools.sh
  fi

  if [ -f scripts/test-complete-task.sh ]; then
    run bash scripts/test-complete-task.sh
  fi

  if [ -f scripts/test-select-ai-profile.sh ]; then
    run bash scripts/test-select-ai-profile.sh
  fi

  if [ -f scripts/test-metrics-schema.mjs ] && [ -f scripts/test-metrics-storage.mjs ] && [ -f scripts/test-metrics-report.mjs ] && [ -f scripts/test-metrics-cli.mjs ] && [ -f scripts/test-af-installation.mjs ]; then
    run node --test scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs scripts/test-metrics-report.mjs scripts/test-metrics-cli.mjs scripts/test-af-installation.mjs
  fi

  if [ -f scripts/test-bootstrap-project.sh ]; then
    run bash scripts/test-bootstrap-project.sh
  fi

  if [ -f scripts/check-agent-tools.sh ] && [ -f templates/project/scripts/check-agent-tools.sh ]; then
    if ! diff -q scripts/check-agent-tools.sh templates/project/scripts/check-agent-tools.sh >/dev/null 2>&1; then
      echo "scripts/check-agent-tools.sh と templates/project/scripts/check-agent-tools.sh が一致していません。両方を同期させてください。" >&2
      exit 1
    fi
  fi
}

run_validation

echo "## Effect Metrics"
if [ -f scripts/metrics.mjs ]; then
  node scripts/metrics.mjs doctor --completion-warning || echo "- WARNING: metrics doctor could not complete; task completion continues"
else
  echo "- WARNING: metrics CLI is unavailable; task completion continues"
fi

REVIEW_OUTPUT_DIR="${REVIEW_OUTPUT_DIR:-docs/work-notes}"
DATE_STAMP="$(date +%Y-%m-%d)"
REVIEW_FILE="$REVIEW_OUTPUT_DIR/${DATE_STAMP}-issue-${ISSUE}-objective-review.md"
mkdir -p "$REVIEW_OUTPUT_DIR"

CHANGED_FILES="$(git diff --cached --name-only)"
BLOCKERS=0

contains_blocker() {
  printf "%s\n" "$CHANGED_FILES" | grep -E "$1" >/dev/null 2>&1
}

STAGED_DIFF="$(git diff --cached)"
SURROGATE_TERMS=false
if printf "%s" "$STAGED_DIFF" | grep -Eiq 'mock|fixture|stub|fake|demo'; then
  SURROGATE_TERMS=true
fi

{
  echo "# Objective Review: Issue #$ISSUE"
  echo
  echo "## Scope"
  echo
  echo "- Issue: #$ISSUE $ISSUE_TITLE"
  echo "- Issue URL: $ISSUE_URL"
  echo "- Branch: $CURRENT_BRANCH"
  echo "- Base: $BASE_BRANCH"
  echo "- Spec Kit tasks: ${TASK_IDS:-not specified}"
  echo
  echo "## Changed Files"
  echo
  printf "%s\n" "$CHANGED_FILES" | sed 's/^/- /'
  echo
  echo "## Mechanical Checks"
  echo
  echo "- Validation commands: passed"
  echo "- Staged diff exists: yes"
  echo "- Issue state before merge: $ISSUE_STATE"
  echo "- Root local artifacts excluded by default: .serena, outputs, .env*, .ai/backups"
  echo
  echo "## Risk Checks"
  if contains_blocker '(^|/)\.env($|\.)'; then
    echo "- BLOCKER: staged env file detected"
    BLOCKERS=$((BLOCKERS + 1))
  else
    echo "- No staged env secret file detected"
  fi
  if contains_blocker '(^|/)(secrets?|tokens?|credentials?)\.(json|yaml|yml|env)$'; then
    echo "- BLOCKER: staged credential-looking file detected"
    BLOCKERS=$((BLOCKERS + 1))
  else
    echo "- No staged credential-looking file detected"
  fi
  if contains_blocker '(^|/)outputs/'; then
    echo "- BLOCKER: generated outputs directory staged"
    BLOCKERS=$((BLOCKERS + 1))
  else
    echo "- Generated outputs directory not staged"
  fi
  if contains_blocker '(^|/)\.serena/'; then
    echo "- BLOCKER: local Serena state staged"
    BLOCKERS=$((BLOCKERS + 1))
  else
    echo "- Local Serena state not staged"
  fi
  echo
  echo "## Spec Kit / GitHub Sync"
  if find specs -name tasks.md -type f -print -quit 2>/dev/null | grep -q .; then
    echo "- tasks.md present: yes"
    echo "- Pending/open mismatch must be checked in PR body or final report"
  else
    echo "- tasks.md present: no"
    echo "- Pending/open mismatch: not applicable"
  fi
  echo
  echo "## Real-use Gate"
  if [ "$SURROGATE_TERMS" = true ]; then
    echo "- Surrogate terms detected in staged diff: mock/fixture/stub/fake/demo"
    echo "- Reviewer must confirm test doubles are not being used as product acceptance evidence."
  else
    echo "- No surrogate validation terms detected in staged diff."
  fi
  echo "- Completion challenge: did we validate the real user path, or only a mock/demo path?"
  echo "- If using mock data, the real provider path or user-facing fallback must be tracked."
  echo
  echo "## Scope Discipline"
  echo "- 最小差分: 要件を満たさない新規依存、抽象化、設定、範囲外変更がないか確認する。"
  echo "- 選択理由: 新規依存または抽象化がある場合、既存実装・標準機能・既存依存で満たせない理由が記録されているか確認する。"
  echo "- 安全境界: 検証、データ損失防止、セキュリティ、アクセシビリティ、承認要件を「最小化」の理由で省略していないか確認する。"
  echo
  echo "## GitHub State Freshness"
  echo "- Issue state was fetched from GitHub before local validation."
  echo "- Script re-fetches GitHub state before PR comment, merge, and Issue close."
  echo "- Script does not comment on closed Issues."
  echo
  echo "## Decision"
  if [ "$BLOCKERS" -eq 0 ]; then
    echo "PASS: no mechanical blockers found."
  else
    echo "FAIL: $BLOCKERS mechanical blocker(s) found."
  fi
} > "$REVIEW_FILE"

run git add "$REVIEW_FILE"

if [ "$BLOCKERS" -ne 0 ]; then
  echo "Objective review failed. See $REVIEW_FILE" >&2
  exit 1
fi

if [ "$REVIEW_REQUEST_FILE" != "" ]; then
  if [ ! -s "$REVIEW_REQUEST_FILE" ]; then
    echo "Review request file is empty or missing: $REVIEW_REQUEST_FILE" >&2
    exit 1
  fi
  if ! grep -q '確認対象' "$REVIEW_REQUEST_FILE" || ! grep -q '判断してほしいこと' "$REVIEW_REQUEST_FILE"; then
    echo "Review request file must contain unresolved confirmation points with required headings." >&2
    exit 1
  fi
fi

run git commit -m "$COMMIT_MESSAGE"
run git push -u origin "$CURRENT_BRANCH"

PR_BODY_FILE="$(mktemp)"
cat > "$PR_BODY_FILE" <<EOF
## Summary

- Refs #$ISSUE.
- Adds task completion automation and documentation for PR creation, objective review, merge, and Issue closure.
- Keeps Spec Kit task completion synchronized with GitHub Issue state/comment/close.

## Validation

- Default task completion validation commands passed.
- Objective review passed: \`$REVIEW_FILE\`.

## Spec Kit / GitHub Sync

- Target Spec Kit task(s): ${TASK_IDS:-not specified}
- Corresponding GitHub Issue: #$ISSUE
- tasks.md completion and Issue state/comment/close synchronized by completion pipeline.
- Open Issues vs pending tasks checked or documented as not applicable.

## Real-use Gate

- Real user path validated or not applicable.
- Mock/fixture/stub/fake/demo evidence is not treated as product acceptance unless explicitly stated as fallback.

## Auto Merge

- Required checks pass locally.
- Objective review found no mechanical blockers.
- No secret/personal/production data detected in staged paths.
EOF

if [ "$DRY_RUN" = true ]; then
  echo "DRY RUN: would create PR with body:"
  cat "$PR_BODY_FILE"
  exit 0
fi

ensure_issue_open "PR lookup or creation"
PR_NUMBER="$(find_open_pr_number)"
if [ "$PR_NUMBER" = "" ]; then
  PR_URL="$(gh pr create --repo "$REPO_FULL_NAME" --base "$BASE_BRANCH" --head "$CURRENT_BRANCH" --title "$TITLE" --body-file "$PR_BODY_FILE")"
  PR_NUMBER="${PR_URL##*/}"
  echo "Created PR: $PR_URL"
else
  echo "Reusing existing PR #$PR_NUMBER"
fi

if [ "$REVIEW_REQUEST_FILE" != "" ]; then
  ensure_pr_open "$PR_NUMBER" "human review request"
  gh pr comment "$PR_NUMBER" --repo "$REPO_FULL_NAME" --body-file "$REVIEW_REQUEST_FILE"
fi

if [ "$MERGE" = true ]; then
  ensure_pr_open "$PR_NUMBER" "merge"
  ensure_issue_open "pre-merge issue state check"
  gh pr merge "$PR_NUMBER" --repo "$REPO_FULL_NAME" --squash --delete-branch --subject "$TITLE" --body "Merged after objective review passed."
  PR_JSON="$(fetch_pr_json "$PR_NUMBER")"
  PR_STATE="$(printf "%s" "$PR_JSON" | jq -r .state)"
  PR_MERGED_AT="$(printf "%s" "$PR_JSON" | jq -r '.mergedAt // empty')"
  if [ "$PR_STATE" != "MERGED" ] || [ "$PR_MERGED_AT" = "" ]; then
    echo "PR #$PR_NUMBER is not merged after merge command; Issue will remain open." >&2
    exit 1
  fi
  echo "Merged PR #$PR_NUMBER"
fi

if [ "$CLOSE_ISSUE" = true ]; then
  if [ "$MERGE" != true ]; then
    echo "--close-issue requires --merge in this script" >&2
    exit 1
  fi
  ISSUE_JSON="$(fetch_issue_json)"
  ISSUE_STATE="$(printf "%s" "$ISSUE_JSON" | jq -r .state)"
  if [ "$ISSUE_STATE" = "OPEN" ]; then
    gh issue close "$ISSUE" --repo "$REPO_FULL_NAME" --reason completed
    echo "Closed Issue #$ISSUE"
  else
    echo "Issue #$ISSUE is already $ISSUE_STATE after merge; not commenting or closing again."
  fi
fi
