# AGENTS.md

Project: <PROJECT_NAME>

## Required Reading Order

1. `README.md`
2. `docs/knowledge/engineering/runtime.md`
3. `docs/knowledge/engineering/secrets.md`
4. `docs/framework/codex-dev-stack.md`
5. `docs/framework/ai-execution-framework.md`
6. `docs/framework/collaboration-rules.md`
7. `docs/framework/agent-settings-replication.md`
8. `docs/framework/software-engineering-practices.md`
9. `docs/framework/knowledge-base.md`

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
- Keep repeated agent workflows in `.agents/skills` and keep tool-specific instruction files thin. Sublimate a workflow into a skill after it repeats 3+ times in work-notes; disable model invocation for dangerous skills; keep SKILL.md a short map (see `docs/framework/agent-settings-replication.md`).
- Local validation commands must match CI, or the difference must be documented.
- Do not revert unrelated user or agent changes.
- Update docs when runtime, secrets, permissions, or deployment assumptions change.
- ドキュメントは `docs/` 配下に日本語で構造化して保存する（開発外の知識も `docs/knowledge/` に置く）。企画（調査・要件定義）と実作業を分離し、成果物を `docs/planning/` と `docs/decisions/` に残してから実装に入る。意思決定は情報ソース付きで `docs/decisions/` に残す。詳細は `docs/framework/knowledge-base.md`。
- 指示・Issue には What / Why / How を含める。重要な作業ほど Why（背景・経緯）を厚く書く。欠けたまま着手せず補完を依頼する（`docs/framework/collaboration-rules.md` の Instruction Pattern）。
- 企画成果物は実装着手前に人間のインラインレビューを通す。指摘には差分で応答し、指摘のない箇所を作り直さない（同 Inline Review）。
- 複数の AI を有効化している場合、タスク種別ごとの担当を `docs/framework/ai-environment-profiles.md` の Task Routing で決める。同一 Issue を複数エージェントで並行させない。
- ツールチェーンは `docs/framework/toolchain-flow.md` の標準フローに沿う（企画 superpowers→Linear、実装 Spec Kit→GitHub Issue、検証 crit→Issue、解決→Linear ロールアップ、企画書↔Issue 相互リンク）。標準外の進め方を人間が選ぼうとしたら、非推奨と明示し代替案を提示してから進む。

## Forbidden

- Committing real secrets.
- Committing production data.
- Auto-merging auth, secret, permission, billing, infrastructure, privacy, or destructive migration changes.
- Treating mock-only or fixture-only success as real-use completion.
