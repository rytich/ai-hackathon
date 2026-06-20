# AGENTS.md

Project: <PROJECT_NAME>
AI profile: generic

## Required Reading Order

1. `README.md`
2. `AGENTS.md`
3. `docs/runtime.md`
4. `docs/secrets.md`
5. `docs/ai-environment-profiles.md`
6. `docs/codex-dev-stack.md`
7. `docs/ai-execution-framework.md`
8. `docs/collaboration-rules.md`

## Agent Rules

- Use GitHub Issues, labels, comments, branches, and PRs as coordination state.
- Use one branch and one PR per Issue.
- Keep Spec Kit task completion synchronized with GitHub Issue state/comment/close.
- Run `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue` when a task is complete, unless human approval is required.
- Do not commit secrets or production data.
- Record AI profile in work notes.
