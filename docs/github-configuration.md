# GitHub Configuration

## Purpose

3 つ以上の AI エージェントが同時に作業しても、GitHub 上の状態だけで着手可否、依存関係、merge 可否を判断できるようにする。

GitHub を coordination state として扱う。private chat history や local checkout だけを source of truth にしない。

## Required Repository Features

- Issues: enabled
- Pull requests: enabled
- Branch protection on stable branch
- Required status checks
- PR template
- Issue template
- Labels for status, human approval, and merge decision
- Optional auto merge

## Required Labels

| Label | Meaning |
| --- | --- |
| `ready` | 着手可能 |
| `in-progress` | 誰かが着手中 |
| `blocked` | 外部判断や依存完了待ち |
| `needs-human` | 人間承認待ち |
| `review-ready` | PR review 待ち |
| `auto-merge-ok` | 自動 merge 候補 |
| `manual-merge-required` | 手動 merge 必須 |

Optional dependency labels:

```text
blocked-by-<issue-number>
```

Example:

```text
blocked-by-42
```

## Label Setup

`gh` CLI が使える repository では、bootstrap 後に次を実行する。

```bash
./scripts/setup-github-labels.sh
```

`gh` CLI が使えない場合は、GitHub UI の repository settings から同じ labels を作る。

## Branch Protection

stable branch に推奨する設定:

- Require a pull request before merging.
- Require approvals.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.
- Require conversation resolution before merging.
- Restrict who can push to stable branch.
- Do not allow force pushes.
- Do not allow deletions.

required checks は project ごとに設定する。例:

- lint
- typecheck
- unit test
- integration test
- build
- contract/schema validation
- secret scan

## Issue Template Requirements

Issue template には次を含める。

- Goal
- Acceptance criteria
- Non-goals
- Dependencies
- Shared files/contracts
- Parallel safety
- Human approval required?
- Validation commands

## Start Coordination Checklist

Agent は作業開始前に GitHub で次を確認する。

- Issue assignee
- Issue labels
- Issue comments
- linked PR
- remote branch
- open PR touched files
- work notes
- decision log

GitHub 操作の直前にも再確認する。開始時に見た状態、thread 内の記憶、local checkout の情報だけで Issue comment、PR merge、Issue close を実行しない。

着手可能条件:

- `in-progress` が付いていない。
- assignee が空、または自分である。
- `blocked` / `needs-human` が未解決ではない。
- dependency decision が `Proceed` または `Proceed with guardrails`。
- remote branch / open PR の衝突を確認済み。

## Dependency Decision Vocabulary

- `Proceed`: 並行着手してよい。merge も独立して可能。
- `Proceed with guardrails`: 並行着手してよいが、先行 Issue 完了まで merge しない。
- `Wait`: 先行 Issue の close または人間判断を待つ。
- `Split`: Issue を小さく分け、独立部分だけ先に進める。

## Start Comment Template

```text
着手します。

- Branch:
- Worktree:
- Scope:
- Assignee:
- Labels:
- Depends on:
- Dependency decision: Proceed / Proceed with guardrails / Wait / Split
- Parallel safety:
```

## Merge Label Policy

- 実装中: `in-progress`
- review 依頼時: `review-ready`
- auto merge 条件を満たす: `auto-merge-ok`
- 人間承認が必要: `manual-merge-required` and/or `needs-human`
- 外部依存待ち: `blocked`

`auto-merge-ok` と `manual-merge-required` は同時に付けない。

## Completion Synchronization

Spec Kit を使う project では、GitHub Issues と `tasks.md` の完了状態を同期する。

Required rules:

- 実装開始前に、対象 Spec Kit task と対応 GitHub Issue を特定する。
- `tasks.md` を `[x]` にした同じ作業セッションで、対応 GitHub Issue も更新する。
- scope の validation が通ったら、Issue を completed として close する。
- 部分完了の場合は Issue を open のままにし、完了 task ID と残 task ID をコメントする。
- handoff 前に、`tasks.md` の pending count と open GitHub Issues を突き合わせる。
- mismatch がある場合は、意図的な理由を final report と work note に明記する。

Partial completion comment template:

```text
Spec Kit / GitHub completion sync:

- Completed tasks:
- Remaining tasks:
- Validation:
- Reason this Issue remains open:
```

Final sync checklist:

```text
- [ ] tasks.md pending count checked
- [ ] open GitHub Issues checked
- [ ] completed Issues closed with completed state reason
- [ ] partial Issues have remaining task comments
- [ ] mismatch rationale documented
```

## Automated Task Completion

Task completion automation uses GitHub as the execution ledger.

Default command:

```bash
scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue
```

Expected GitHub operations:

1. Create a PR for the current branch.
2. Post objective review results as a PR comment.
3. Merge the PR when validation and objective review pass.
4. Close the corresponding Issue with completed reason.

Required safeguards:

- The script must not run from the stable base branch.
- The script must re-fetch Issue state before PR creation, merge, and Issue close.
- The script must re-fetch PR state before objective review comment and merge.
- The script must not comment on closed Issues.
- PR body must use `Refs #<issue>` rather than auto-closing keywords unless the close path is intentionally delegated to GitHub.
- The script must not stage `.serena/`, `outputs/`, `.env*`, or `.ai/backups`.
- The script must fail on staged secret-looking files.
- Human-approval-required areas must stop at PR + objective review.
- Issue close requires successful merge.

## Real-use Gate

GitHub completion state must reflect product reality, not only test surrogate success.

Rules:

- mock、fixture、stub、fake、demo は validation/support tool であり、product completion evidence ではない。
- milestone / v1.0 / usable / production-ready を close する前に、real external integration path または明示された user-facing fallback を検証する。
- mock mode の成功を `real import succeeded` のように表現しない。
- mock mode は UI、docs、final report、Issue/PR comment で明示する。
- real path が未実装なら、Issue を close せず、残 task または follow-up Issue を作る。

Issue / PR template must separate:

- Test doubles: mock, fixture, fake, stub, demo.
- Product acceptance: real API, real provider, real data path, real fallback.

## Human Approval Required

次を含む PR は `manual-merge-required` を付ける。

- destructive migration
- auth、token、secret、permission、scope
- billing、payment
- production deployment
- infrastructure
- privacy、consent、legal wording
- irreversible data deletion
