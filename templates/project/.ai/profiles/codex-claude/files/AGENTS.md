# AGENTS.md

Project: <PROJECT_NAME>
AI profile: codex-claude
Tool entrypoint: Codex

## Required Reading Order

1. `README.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `docs/knowledge/engineering/runtime.md`
5. `docs/knowledge/engineering/secrets.md`
6. `docs/framework/ai-environment-profiles.md`
7. `docs/framework/agent-settings-replication.md`
8. `docs/framework/software-engineering-practices.md`
9. `docs/framework/codex-dev-stack.md`
10. `docs/framework/ai-execution-framework.md`
11. `docs/framework/collaboration-rules.md`
12. `docs/framework/knowledge-base.md`

## Shared Rules

- Treat `docs/` and `.agents/skills` as the shared source of truth.
- Keep this file as the Codex entrypoint; keep Claude-specific notes in `CLAUDE.md`.
- ドキュメントは `docs/` 配下に日本語で構造化して保存し、企画（調査・要件定義）と実作業を分離する。意思決定は情報ソース付きで `docs/decisions/` に残し、前提が変わったら該当 `docs/knowledge/` を同時更新する。詳細は `docs/framework/knowledge-base.md`。
- Keep changes scoped to the active Issue.
- Define Done as commands or observable states.
- Keep each PR to one reason. Split unrelated cleanup, formatting, rename, and refactor.
- Prefer existing project patterns over new abstractions unless the current requirement needs one.
- Keep Spec Kit task completion synchronized with GitHub Issue state/comment/close.
- Run `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue` when a task is complete, unless human approval is required.
- Re-fetch GitHub state immediately before comment, merge, or close.
- Do not comment on closed Issues.
- Do not treat mock/fixture/stub/fake/demo success as real-use completion.
- Do not revert unrelated changes.
- Record AI profile in work notes.

## Codex Notes

- Use context-mode for large output analysis when available.
- Use Serena for symbol-aware code navigation when available.
