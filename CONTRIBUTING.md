# コントリビューションガイド

このrepositoryでは、変更理由と検証証跡を追跡可能に保つため、原則として`1 Issue = 1 branch = 1 PR`で作業します。

## 着手前

1. IssueにWhat / Why / How、Acceptance criteria、依存関係、検証コマンドを記載する。
2. 企画・要件を`docs/planning/`へ、変更理由を`docs/decisions/`へ残す。
3. 企画成果物は実装前に人間のインラインレビューを受ける。
4. Issue専用branchとisolated worktreeを使う。

## 実装と検証

- 挙動変更はテストを先に追加し、期待した理由で失敗することを確認する。
- 依頼外のformat、rename、refactor、cleanupを同じPRへ混ぜない。
- 完了前に`./scripts/verify.sh`を実行する。GitHub Actionsも同じコマンドを使用する。
- mock、fixture、stub、demoだけの成功をreal-use完了として扱わない。
- Secret、token、authorization header、production dataをcommit、Issue、PR、prompt、通常ログへ出さない。

## PR

PR本文にはRelated Issue、What / Why / How、承認済み要件・計画、base/head OID、検証結果、Real-use Gate、security、docs、未完了事項を記載します。PR本文は証拠inventoryであり、reviewerのauthorityではありません。

auth、secret、permission、infrastructure、production deployを変更する場合は、自動Mergeせず人間承認で停止します。

Hermes reviewerの詳細は[開発workflow](docs/development/workflow.md)と[reviewer skill](.agents/skills/ai-hackathon-reviewer/SKILL.md)を参照してください。
