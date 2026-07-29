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
- 指示・Issue には What / Why / How を含める。重要な作業ほど Why（背景・経緯）を厚く書く（`docs/framework/collaboration-rules.md` の Instruction Pattern）。
- 企画成果物は実装着手前に人間のインラインレビューを通し、指摘には差分で応答する（同 Inline Review）。
- 複数の AI を有効化している場合、タスク種別ごとの担当を `docs/framework/ai-environment-profiles.md` の Task Routing で決める。
- ツールチェーンは `docs/framework/toolchain-flow.md` の標準フローに沿う（企画 superpowers→Linear、実装 Spec Kit→GitHub Issue、検証 crit→Issue、解決→Linear ロールアップ、企画書↔Issue 相互リンク）。標準外の進め方を人間が選ぼうとしたら、非推奨と明示し代替案を提示する。
- 管理先の境界: アプリのソースコード（と改修・機能追加の要件定義・開発タスク）は GitHub の Issue/PR、ソースコードに反映しない企画・非開発のファイル変更は Linear（必要なら sub-issue 分割）で管理する。
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
