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
- ブランド基準は [../business/branding/](../business/branding/) に従う。

## 資料一覧（map of content）

作成した資料はここに一覧し、発見できる状態を保つ（孤立させない）。

- [agentic-framework 概要](agentic-framework-overview.md) — 対外説明用。docs 4 レイヤー・企画と実作業の分離・品質ゲート・複数 AI の使い分け

## 原稿と配布形態を分ける

**このフォルダの markdown が正本。** 配布形態はここから生成し、`outputs/` に置く。

| | 場所 | 役割 |
|---|---|---|
| 原稿 | `docs/knowledge/materials/<topic>.md` | 正本。レビューと差分追跡はここで行う |
| 配布形態 | `outputs/<topic>.<ext>` | 生成物。直接編集しない |

配布形態の選び方:

- **HTML** — 構造そのものが情報である資料（階層、フロー、対応関係）に向く。markdown の表では落ちる関係性を表現でき、URL 1 本で共有できる。テキストなので git とも相性がよい。
- **pptx / pdf** — 対面説明や配布形式が指定されている場合。バイナリなので更新頻度に注意する（`outputs/README.md` 参照）。

ルール:

- 生成物を直接編集しない。**原稿を先に更新してから再生成する。**
- 配布形態を single source of truth にしない。HTML は差分が読めず、レビューできない。
- 生成物のコミット方針は `outputs/README.md` に従う。
