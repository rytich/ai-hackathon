# AGENTS.md

Project: <PROJECT_NAME>

## Required Reading Order

1. `README.md`
2. `docs/runtime.md`
3. `docs/secrets.md`
4. `docs/codex-dev-stack.md`
5. `docs/ai-execution-framework.md`
6. `docs/collaboration-rules.md`
7. `docs/agent-settings-replication.md`
8. `docs/software-engineering-practices.md`

Add project-specific specs here.

## Validation Commands

Replace with real commands.

```bash
<lint-command>
<typecheck-command>
<test-command>
<build-command>
```

## Parallel Work Rules

- Use one branch and one PR per Issue.
- Define Done as commands or observable states before implementation.
- Keep each PR to one reason. Split unrelated cleanup, formatting, rename, and refactor.
- Prefer existing project patterns over new abstractions unless the current requirement needs one.
- Use isolated worktrees for parallel AI agents.
- Before implementation, identify the target Spec Kit task and corresponding GitHub Issue.
- When marking `tasks.md` entries as `[x]`, update the corresponding GitHub Issue in the same work session.
- Close the Issue as completed only after scope validation passes.
- For partial completion, keep the Issue open and comment completed task IDs and remaining task IDs.
- Before final handoff, compare `tasks.md` pending count with open GitHub Issues and document any intentional mismatch.
- When a task is complete, run `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue`.
- For human-approval-required changes, omit `--merge --close-issue` and stop at PR plus objective review.
- Re-fetch GitHub Issue/PR state immediately before commenting, merging, or closing. Do not rely only on thread memory or local checkout.
- Do not comment on closed Issues; create a new Issue, reopen, or comment on an open PR instead.
- Mock, fixture, stub, fake, and demo success is not product acceptance evidence. Validate the real user path or an explicit user-facing fallback before closing.
- Keep repeated agent workflows in `.agents/skills` and keep tool-specific instruction files thin.
- Local validation commands must match CI, or the difference must be documented.
- Do not revert unrelated user or agent changes.
- Update docs when runtime, secrets, permissions, or deployment assumptions change.

## Forbidden

- Committing real secrets.
- Committing production data.
- Auto-merging auth, secret, permission, billing, infrastructure, privacy, or destructive migration changes.
- Treating mock-only or fixture-only success as real-use completion.
