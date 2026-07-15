# materials — 説明資料

ピッチ、対外説明資料、紹介文など、外部に見せる資料の原稿・元データを置く。

- ファイル名: `<topic>.md`（例: `pitch.md`, `product-intro.md`, `press-kit.md`）
- frontmatter 例:
  ```yaml
  ---
  title: <タイトル>
  status: draft | active
  updated: YYYY-MM-DD
  ---
  ```
- 更新トリガー: 対外資料の作成・更新（主担当: 担当者）
- 生成物（pptx / pdf 等）は成果物置き場（例: リポジトリ root の `outputs/`）に置き、ここには原稿と生成手順・リンクを残す。
- ブランド基準は [../business/branding/](../business/branding/) に従う。
