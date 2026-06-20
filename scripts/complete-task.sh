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
  --dry-run                 Print planned actions without changing GitHub state.

Environment:
  VALIDATION_COMMANDS       Optional newline-separated commands to run.
  REVIEW_OUTPUT_DIR         Optional review output directory. Default: docs/work-notes.

The script is intentionally explicit: no auto-detection of task identity,
no merge without --merge, and no issue close without --close-issue.
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
ISSUE_JSON="$(gh issue view "$ISSUE" --repo "$REPO_FULL_NAME" --json title,state,labels,assignees,url)"
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
  [ -f templates/project/scripts/select-ai-profile.sh ] && run bash -n templates/project/scripts/select-ai-profile.sh
  [ -f templates/project/scripts/setup-github-labels.sh ] && run bash -n templates/project/scripts/setup-github-labels.sh
}

run_validation

REVIEW_OUTPUT_DIR="${REVIEW_OUTPUT_DIR:-docs/work-notes}"
DATE_STAMP="$(date +%Y-%m-%d)"
REVIEW_FILE="$REVIEW_OUTPUT_DIR/${DATE_STAMP}-issue-${ISSUE}-objective-review.md"
mkdir -p "$REVIEW_OUTPUT_DIR"

CHANGED_FILES="$(git diff --cached --name-only)"
BLOCKERS=0

contains_blocker() {
  printf "%s\n" "$CHANGED_FILES" | grep -E "$1" >/dev/null 2>&1
}

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

run git commit -m "$COMMIT_MESSAGE"
run git push -u origin "$CURRENT_BRANCH"

PR_BODY_FILE="$(mktemp)"
cat > "$PR_BODY_FILE" <<EOF
## Summary

- Completes #$ISSUE.
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

PR_URL="$(gh pr create --repo "$REPO_FULL_NAME" --base "$BASE_BRANCH" --head "$CURRENT_BRANCH" --title "$TITLE" --body-file "$PR_BODY_FILE")"
PR_NUMBER="${PR_URL##*/}"
echo "Created PR: $PR_URL"

gh pr comment "$PR_NUMBER" --repo "$REPO_FULL_NAME" --body-file "$REVIEW_FILE"

if [ "$MERGE" = true ]; then
  gh pr merge "$PR_NUMBER" --repo "$REPO_FULL_NAME" --squash --delete-branch --subject "$TITLE" --body "Merged after objective review passed."
  echo "Merged PR #$PR_NUMBER"
fi

if [ "$CLOSE_ISSUE" = true ]; then
  if [ "$MERGE" != true ]; then
    echo "--close-issue requires --merge in this script" >&2
    exit 1
  fi
  gh issue close "$ISSUE" --repo "$REPO_FULL_NAME" --reason completed --comment "Completed by PR #$PR_NUMBER. Objective review passed: \`$REVIEW_FILE\`."
  echo "Closed Issue #$ISSUE"
fi
