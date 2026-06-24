# CLAUDE.md

Project: <PROJECT_NAME>
AI profile: codex-claude
Tool entrypoint: Claude Code

## Required Reading Order

1. `README.md`
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/runtime.md`
5. `docs/secrets.md`
6. `docs/ai-environment-profiles.md`
7. `docs/agent-settings-replication.md`
8. `docs/software-engineering-practices.md`
9. `docs/codex-dev-stack.md`
10. `docs/ai-execution-framework.md`
11. `docs/collaboration-rules.md`

## Shared Rules

- Treat `docs/` and `.agents/skills` as the shared source of truth.
- Keep this file as the Claude Code entrypoint; keep Codex-specific notes in `AGENTS.md`.
- Keep changes scoped to the active Issue.
- Define Done as commands or observable states.
- Keep each PR to one reason. Split unrelated cleanup, formatting, rename, and refactor.
- Prefer existing project patterns over new abstractions unless the current requirement needs one.
- Keep Spec Kit task completion synchronized with GitHub Issue state/comment/close.
- Run `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue` when a task is complete, unless human approval is required.
- Re-fetch GitHub state immediately before comment, merge, or close.
- Do not comment on closed Issues.
- Do not treat mock/fixture/stub/fake/demo success as real-use completion.
- Preserve existing user changes.
- Record AI profile in work notes.

## Claude Code Notes

- Prefer repository docs and issue state over chat-only memory.
- Keep generated explanations and code changes tied to the active Issue.
