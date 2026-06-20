# AGENTS.md

Project: <PROJECT_NAME>

## Required Reading Order

1. `README.md`
2. `docs/runtime.md`
3. `docs/secrets.md`
4. `docs/ai-execution-framework.md`
5. `docs/collaboration-rules.md`

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
- Use isolated worktrees for parallel AI agents.
- Do not revert unrelated user or agent changes.
- Update docs when runtime, secrets, permissions, or deployment assumptions change.

## Forbidden

- Committing real secrets.
- Committing production data.
- Auto-merging auth, secret, permission, billing, infrastructure, privacy, or destructive migration changes.
