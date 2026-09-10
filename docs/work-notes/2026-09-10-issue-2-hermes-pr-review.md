# Issue #2 Hermes PRレビュー自動化 作業記録

## 対象

- GitHub Issue: #2
- Pull Request: #4
- Branch: `1a-m4/issue-2-hermes-pr-review`
- AI profile: codex
- Requirements: `docs/planning/requirements/2026-09-10-hermes-pr-review-automation.md`
- Implementation plan: `docs/planning/implementation/2026-09-10-hermes-pr-review-automation.md`

## 並行作業状態

同一Issueを他エージェントへ割り当てず、このworktree内で順次実装した。Hermes/Waku側はIssue #3として分離した。

## TDD

- Reviewer contract RED: validator moduleが存在せず`ERR_MODULE_NOT_FOUND`。
- Reviewer contract GREEN: 正本とrepository/base/identity、Webhook条件、Operational stop、Approve/Merge条件のmutation 13件が成功。
- Verify runner RED: `scripts/verify.sh`が存在せず失敗。
- Verify runner GREEN: 必須gateの順序とfail-fast fixtureが成功し、実repositoryのNode 58テストも成功。
- Workflow RED: `.github/workflows/verify.yml`が存在せず失敗。
- Workflow GREEN: read-only permission、許可action、credential非永続化、共通verify commandを検証。
- Documentation RED: validator export、ADR、work noteが存在せず失敗。
- Documentation GREEN: reviewer contract、workflow、運用文書の安全境界をmutation testで検証。
- CI portability RED: 初回GitHub ActionsでREADMEの開発者ローカル絶対リンク3件がbrokenとなり失敗。既存checkerはリンク先がローカルに存在すると受理していた。
- CI portability GREEN: repository外の絶対`.md`リンクを常に拒否する回帰テストを追加し、READMEをrepository相対リンクへ修正。

## 実装内容

- 信頼済みbaseから読むrepository専用reviewer skillと機械可読contractを追加。
- 依存なしNode validatorと危険なcontract緩和を拒否するmutation testsを追加。
- ローカルとCIで共通の`./scripts/verify.sh`を追加。
- `pull_request`だけで動くread-only GitHub Actions `verify` workflowを追加。
- AGENTS、CONTRIBUTING、PR template、開発workflowへexact-head reviewと停止条件を反映。

## 検証

- `node --test scripts/test-reviewer-skill-contract.mjs`: 38件成功。
- `./scripts/verify.sh`: 全変更を含むローカルHEADで成功。Node tests 83件成功、shell test suite成功、must tools成功。
- `./scripts/check-doc-links.sh`: broken links 0、orphans 0。
- `git diff --check`: 成功。
- secret-like value scan: 検出0件。

## Real-use Gate

repository contractのローカル検証は完了したが、GitHub Actions `verify`、Webhook delivery、Hermes formal review、Approve、Mergeはまだ観測していない。fixture成功をlive運用完了として扱わない。

## 人間承認とBootstrap

PR #4はreviewer contract導入前の一回限りのbootstrap例外である。`knryt`の手動レビュー、同一HEADのGitHub Actions成功、手動MergeまでIssue #2を完了扱いにしない。

Webhook、Ruleset、repository専用Secret・token、自動Mergeのlive有効化はauth・permission・infrastructureを含む人間承認領域であり、Issue #3で行う。

## 未完了 / 次の作業

- PR #4の最新HEADでGitHub Actions `verify`の実結果を確認する。
- `knryt`がPR #4を手動レビュー・Mergeする。
- Issue #3でHermes Route、Secret、token、Webhook、effective Rulesetを段階的に有効化する。
- PR #1の`synchronize`から同一HEADのformal review、Approve、Mergeまでをreal E2E確認する。

## Scope Discipline

Issue #2のrepository実装だけを変更した。Secret値、token、Webhook payload、Hermes host設定、Ruleset live設定は含めていない。
