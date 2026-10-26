# requirements — 要件定義

実装前に固める要求と受け入れ条件を置く。

- ファイル名: `YYYY-MM-DD-<topic>.md` または `<feature>.md`
- frontmatter 例:
  ```yaml
  ---
  title: <要件タイトル>
  status: draft | approved | implemented
  updated: YYYY-MM-DD
  links: [../../decisions/YYYY-MM-DD-xxx.md]
  ---
  ```
- 本文: 背景 / スコープ（やる・やらない）/ 受け入れ条件（検証可能な形）/ 制約 / 未決事項。
- 承認後に実装へ進む。確定した仕様サマリは [../../knowledge/product/](../../knowledge/product/) へ反映する。

記入例: [_example-requirements.md](_example-requirements.md)

## Drafts

- [Hermes/WakuによるPR即時レビュー・自動Merge](2026-09-10-hermes-pr-review-automation.md) - `ai-hackathon`専用Webhook Route、exact-headレビュー、条件付きApprove・Merge、CI・Rulesetの導入要件。

## Approved

- [v0.2.5 安全なinstallerと配布ライセンス](2026-08-14-v025-safe-installer-license.md) - 手動展開不要のinstaller、既存projectの競合隔離、MIT License、context7導入・活用。
- [v0.2.4 公開アーカイブ再サニタイズ・Release](2026-08-14-v024-release-sanitization.md) - owner名と個人環境pathを除去し、既存タグを動かさず検証済み成果物をReleaseする。
- [v0.2.4 効果計測の最小基盤](2026-08-12-v024-effect-metrics.md) - privacy-safe な work unit 記録、集計、保存先分離、AF 更新境界。

## Implemented

- [v0.3 要件定義と v0.2 ロードマップ](2026-08-03-v0.3-requirements-and-v0.2-roadmap.md) - PR #48 で承認済みの v0.2.2-v0.2.9 段階的リリース計画。
- [Ponytail の限定統合](2026-08-11-ponytail-limited-integration.md) - Codexを基準に、最小実装判断とprofile機構を限定統合した。
