# 作業サマリー: docs 知識ベース化

## 日付 / branch
2026-07-15 / `1acx/docs-knowledge-base`

## やったこと
- 既存 framework docs 11 本を `docs/framework/` へ移動。
- `docs/knowledge/`（product / engineering / business{business-model,marketing,branding,competitive,legal} / support / materials）、`docs/planning/`（research / requirements）、`docs/decisions/` を新設。各フォルダに日本語のスキーマ README を追加。
- 中核規約 `docs/framework/knowledge-base.md`、マップ `docs/index.md`、憲法 `docs/README.md` を新規作成。
- 記入例: `decisions/2026-07-15-docs-knowledge-base.md`（本変更の実 decision）、`planning/research/_example-research.md`、`planning/requirements/_example-requirements.md`、`knowledge/business/competitive/_example-competitor.md`。
- ルール反映: root `AGENTS.md`（Knowledge Base 節・鮮度ゲート・Safe Continuation）、全 profile と template `AGENTS.md`/`CLAUDE.md`/copilot に「日本語保存・企画実作業分離・情報ソース・knowledge 同時更新」ルールと Required Reading への `knowledge-base.md` を追加。
- 配布: `scripts/bootstrap-project.sh` のコピー元/先を `docs/framework/` に変更し `knowledge-base.md` を追加。`templates/project/docs/` を新構造へ再編（runtime/secrets を `knowledge/engineering/` へ、decision-log→decisions、knowledge/planning スキーマをミラー）。
- 品質: `quality-gates.md` に docs 鮮度ゲート、`project-adoption.md` に構造初期化ステップ、PR テンプレート（framework/template 両方）に Docs/Knowledge 欄。

## 検証
- `bash -n scripts/bootstrap-project.sh`、`/tmp` への実 bootstrap で構造生成を確認。
- 旧パス参照（`docs/<framework-doc>.md`、`docs/decision-log`、`docs/runtime.md`、`docs/secrets.md`）の残存 grep。
- `docs/index.md` のリンク先実在チェック。

## 未対応 / 引き継ぎ
- `.serena/`（未追跡の自動生成メモ）と `docs/work-notes/` の過去履歴は当時の事実として据え置き。
- knowledge の各カテゴリ本文（実データ）は導入先プロジェクトが埋める設計。
- AI profile: Claude Code（本セッション）。
