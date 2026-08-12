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

- [v0.3 要件定義と v0.2 ロードマップ](2026-08-03-v0.3-requirements-and-v0.2-roadmap.md) - v0.2.2-v0.2.9 の段階的リリース案。人間のインラインレビュー待ち。

## Implemented

- [Ponytail の限定統合](2026-08-11-ponytail-limited-integration.md) - Codexを基準に、最小実装判断とprofile機構を限定統合した。
