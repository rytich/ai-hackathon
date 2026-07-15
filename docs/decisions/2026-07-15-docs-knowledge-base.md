# 判断: docs/ を維持される知識ベースとして構造化する

## 日付
2026-07-15

## 背景 / 課題
`docs/` は開発運用ドキュメントがフラットに並ぶだけで、(1) 開発外の知識（マーケ・ブランディング・競合・ビジネスモデル・法務・説明資料・FAQ・サポート）の置き場が無く、(2) 企画（調査・要件定義）と実作業の分離が明文化されておらず、(3) 意思決定の情報ソースを残す型が無く、(4) Codex/Claude 双方で維持し続ける機構が無かった。

## 選択肢
- A: 既存フラット構成のまま、非開発ドキュメントを個別追加する
- B: `docs/` を framework / knowledge / planning / decisions の 4 レイヤーに再構造化し、維持機構をルール化する（採用）
- C: 外部の知識ベース製品（Notion 等）に知識を移す

## 決定
B を採用。既存 11 docs を `docs/framework/` へ移動し、`docs/knowledge/`（stock）・`docs/planning/`（flow）・`docs/decisions/`（記録）を新設。企画/実作業の分離、意思決定の情報ソース必須化、カテゴリ別の更新トリガー表を規約化し、AGENTS/profile/quality-gates/bootstrap に組み込んだ。

## 理由
- 開発・非開発を 1 つの system of record に集約でき、1 知識 1 置き場を保てる。
- stock/flow/log を分けることで陳腐化と重複を防げる。
- markdown + git のままなので diff・レビュー・エージェント編集が可能（C の外部製品は code-adjacent 性とレビュー性を失う）。
- A はスキーマと維持機構が無く、非開発知識が散逸する。

## 情報ソース
- AI Builder Club / skills（`new-loop` の knowledge-base ARCHITECTURE: signals/docs/domains、stock vs flow、collectors、Map）: https://github.com/AI-Builder-Club/skills
- codebase-harness の "map, not manual"（root doc を目次化し詳細を docs/ へ逃がす）: 同上 `setup-codebase-harness`
- crit（plan/diff への人間インラインレビュー）: https://github.com/tomasz-tomczyk/crit / https://crit.md
- superpowers（TDD・verification-before-completion 等の実行可能 skill）: `superpowers@claude-plugins-official`
- 既存フレームワークの real-use gate（Issue #4）と decision-log 運用

## 影響範囲
- 移動: `docs/*.md`（11 本）→ `docs/framework/`
- 新規: `docs/index.md`, `docs/README.md`, `docs/framework/knowledge-base.md`, `docs/knowledge/**`, `docs/planning/**`, `docs/decisions/**`
- 編集: `README.md`, `AGENTS.md`, 全 profile, `scripts/bootstrap-project.sh`, `docs/framework/{quality-gates,project-adoption}.md`, `templates/project/docs/**`, PR テンプレート
- 参照更新: `docs/runtime.md`→`docs/knowledge/engineering/runtime.md`、`docs/secrets.md`→同 secrets、`docs/decision-log/`→`docs/decisions/`

## 却下した案・再検討条件
- C（外部知識ベース）は、retrieval 量が ripgrep の限界を超える、または非エンジニアの編集頻度が git 運用を上回った場合に再検討。
- サブカテゴリ（business 配下など）は実利用で不足・過剰が判明したら増減する（早すぎる細分化をしない原則）。
