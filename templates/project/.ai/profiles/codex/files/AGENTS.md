# AGENTS.md

Project: <PROJECT_NAME>
AI profile: codex

## Required Reading Order

1. `README.md`
2. `AGENTS.md`
3. `docs/knowledge/engineering/runtime.md`
4. `docs/knowledge/engineering/secrets.md`
5. `docs/framework/ai-environment-profiles.md`
6. `docs/framework/codex-dev-stack.md`
7. `docs/framework/ai-execution-framework.md`
8. `docs/framework/collaboration-rules.md`
9. `docs/framework/knowledge-base.md`

## Codex Rules

- Use repository docs as source of truth.
- Prefer small diffs mapped to Issues.
- Use context-mode for large output analysis when available.
- Use Serena for symbol-aware code navigation when available.
- Keep Spec Kit task completion synchronized with GitHub Issue state/comment/close.
- Run `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue` when a task is complete, unless human approval is required.
- Re-fetch GitHub state immediately before comment, merge, or close.
- Do not comment on closed Issues.
- Do not treat mock/fixture/stub/fake/demo success as real-use completion.
- Do not revert unrelated changes.
- Record AI profile in work notes.
- ドキュメントは `docs/` 配下に日本語で構造化して保存し、企画（調査・要件定義）と実作業を分離する。意思決定は情報ソース付きで `docs/decisions/` に残し、前提が変わったら該当 `docs/knowledge/` を同時更新する。詳細は `docs/framework/knowledge-base.md`。
