# Quality Gates

## Purpose

AI エージェントが速く作業しても品質を落とさないため、merge 前に必ず通す gate を定義する。

## Required Checks

プロジェクトごとに具体コマンドへ置き換える。

```text
format or lint
typecheck or static analysis
unit test
integration test if applicable
e2e test if applicable
build or package
contract/schema validation if applicable
secret scan or secret checklist
open GitHub issues vs tasks.md pending check if Spec Kit is used
local validation commands match CI, or differences are documented
objective review report generated and posted to PR
real-use path or explicit user-facing fallback validated for usable/v1/production-ready claims
docs freshness: affected docs/knowledge categories are updated, and planning/decisions artifacts exist for planned work
```

## Verifiable Done

Issue Done must be expressed as commands or observable states.

Good Done examples:

- `<lint-command>` passes
- `<test-command>` passes
- expected user-visible behavior is observed at a named route, screen, CLI command, API response, or artifact path
- CI required checks pass, or any local/CI difference is documented

Avoid:

- "implemented"
- "works locally" without command output or observable behavior
- mock-only or demo-only evidence for product acceptance

## Reviewer Checklist

- Issue と acceptance criteria に対応している。
- scope 外の変更が混ざっていない。
- 変更理由が 1 つで、依頼外の cleanup、rename、format、refactor が混ざっていない。
- public API、schema、migration、config の互換性を確認した。
- tests が失敗時に意味のある coverage を持つ。
- local validation が CI と同じ bar か、差分が説明されている。
- logs に secret、個人情報、token が出ない。
- docs、env example、runtime guide が必要に応じて更新されている。
- 変更が影響する `docs/knowledge/` カテゴリ（product/engineering/business/support/materials）が更新されている。
- 企画を伴う変更は `docs/planning/`（調査・要件）と `docs/decisions/`（情報ソース＋理由）が残っている。
- 企画成果物が実装着手前にレビューされている（`docs/framework/collaboration-rules.md` の Inline Review）。
- レビュー指摘に差分で応答している。指摘のない箇所を作り直していない。
- `scripts/check-doc-links.sh` が broken link 0 で通る。新しい content ノートが孤立していない（index / README / 関連ノートからリンクされている）。
- Spec Kit task と GitHub Issue の完了状態が同期されている。
- open GitHub Issues と `tasks.md` pending count の mismatch が説明されている。
- `scripts/complete-task.sh` の objective review が PASS している。
- mock、fixture、stub、fake、demo が product acceptance evidence として扱われていない。
- real API、real provider、real data path、または明示された user-facing fallback が検証されている。
- 新しい抽象化は現在の要求に必要か、既存 project pattern に沿っている。
- error handling は fail fast で、silent fallback がある場合は理由と検証がある。
- rollback または migration recovery の考慮がある。

## Real-use Gate

milestone、v1.0、usable、production-ready を名乗る場合、mock-only completion を禁止する。

必ず分けて記録する。

- Test doubles: mock、fixture、fake、stub、demo。
- Product acceptance: real API、real provider、real data path、real user-facing fallback。

Issue / PR close 前の challenge:

- Did we validate the real user path, or only a mock/demo path?
- If using mock data, where is the real provider path or user-facing fallback tracked?
- Is mock mode disclosed in UI, docs, and final report?

## Human Approval Required

次の変更は自動 merge しない。

- destructive migration
- auth、token、secret、permission、scope
- billing、payment
- production deployment
- infrastructure
- privacy、consent、legal wording
- irreversible data deletion

## Low Cost Practices

- 大きな test output は失敗 summary だけを出す。
- 広い grep や log parse は script/context-mode で集約する。
- 同じ調査を繰り返さないよう work note と decision log を残す。
- 生成物や lockfile を触る PR は理由を明記する。
