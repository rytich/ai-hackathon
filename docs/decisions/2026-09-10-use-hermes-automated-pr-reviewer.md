# 判断: Hermes reviewerを段階的ブートストラップで導入する

## 日付

2026-09-10（2026-09-11に実装計画を承認）

## 背景 / 課題

`rytich/ai-hackathon`にはGitHub Actions、Webhook、Ruleset、branch protectionがなく、MacBook i3上のHermes/Wakuは`rytich/play-cms`と`develop`に固定されていた。信頼済みbaseにreviewer契約がない状態でPR head側のskillを実行すると、未信頼差分が自分自身のレビュー条件を変更できる。

Issue #2はrepository側のreviewer skill・CI・文書を担当し、Issue #3はHermes Route・Secret・token・Webhook・Rulesetのlive運用を担当する。

## 選択肢

1. repository contractを先に`main`へ導入し、その後live Routeを有効化する段階的ブートストラップ
2. Hermes先行でPR head側のskillを使う
3. 最初から複数repository共通のRoute管理基盤を作る

## 決定

段階的ブートストラップを採用する。PR #4だけを手動レビュー・Mergeする例外とし、信頼済み`main`へreviewer skillと`verify`を導入した後、Issue #3でlive設定を段階的に有効化する。

通常PRのreviewerはexact base/head、同一HEADの`verify`、effective Ruleset、formal reviewをGitHub write直前に再取得する。Operational stopだけの場合はPRへ書き込まない。

## 理由

- 未信頼PRがreviewer authorityを変更する経路を閉じられる。
- repository実装とSecret・資格情報・外部transportの責任を分離できる。
- GitHub deliveryのHTTP 2xxと、同一HEADのformal review・Approve・Mergeを別々に検証できる。
- PR #1を最初のreal E2E対象として、bootstrap PR自身の自己参照を避けられる。

## 情報ソース

確認日: 2026-09-11

- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Validating webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [Best practices for using webhooks](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)
- [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Pull request review REST API](https://docs.github.com/en/rest/pulls/reviews)
- 要件: `docs/planning/requirements/2026-09-10-hermes-pr-review-automation.md`
- 実装計画: `docs/planning/implementation/2026-09-10-hermes-pr-review-automation.md`
- GitHub Issue #2 / Issue #3 / PR #4

## 影響範囲

- `.agents/skills/ai-hackathon-reviewer/SKILL.md`
- `.github/workflows/verify.yml`
- `scripts/verify.sh`とcontract tests
- `AGENTS.md`、`CONTRIBUTING.md`、PR template、`docs/development/workflow.md`

Secret、token、Webhook payload、Hermes host設定はrepositoryへ保存しない。

## 却下した案・再検討条件

- Hermes先行は、PR head由来のauthorityを実行する危険があるため却下した。
- 汎用マルチrepositoryルーターは今回の範囲を超え、Secret・権限・障害範囲を拡大するため却下した。
- 同じrepository専用Route導入を3回以上繰り返した場合、共通スキーマと管理方法を別Issueで再検討する。
