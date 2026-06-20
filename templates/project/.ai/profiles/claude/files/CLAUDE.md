# CLAUDE.md

Project: <PROJECT_NAME>
AI profile: claude

## Required Reading Order

1. `README.md`
2. `CLAUDE.md`
3. `docs/runtime.md`
4. `docs/secrets.md`
5. `docs/ai-environment-profiles.md`
6. `docs/codex-dev-stack.md`
7. `docs/ai-execution-framework.md`
8. `docs/collaboration-rules.md`

## Claude Rules

- Keep changes scoped to the active Issue.
- Check GitHub coordination state before starting.
- Keep Spec Kit task completion synchronized with GitHub Issue state/comment/close.
- Run `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue` when a task is complete, unless human approval is required.
- Re-fetch GitHub state immediately before comment, merge, or close.
- Do not comment on closed Issues.
- Do not treat mock/fixture/stub/fake/demo success as real-use completion.
- Preserve existing user changes.
- Record AI profile in work notes.
