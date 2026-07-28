---
title: Obsidian の情報構造から AF に取り込めるものの調査
date: 2026-07-15
status: done
sources:
  - https://www.lifehacker.jp/article/2607-obsidian-plugins-visualize-notes/
---

# Obsidian の情報構造から AF に取り込めるものの調査

## 目的

Obsidian の可視化プラグイン記事を起点に、その土台にある情報構造のうち AF（markdown + git、GitHub 表示・レビュー可能が原則）に取り込めるものを選別する。

## 記事の内容

可視化プラグイン（Graph View / Canvas / Excalidraw / Obsidian Mind Map / Juggl）と、その土台の情報構造（双方向リンク＝バックリンク、グラフ、タグ/プロパティ、階層見出し）の紹介。孤立ノートを「未探求領域」と解釈する考え方も含む。

## AF の現状

- リンクは相対 md リンク（`[text](path)`）。wikilink `[[slug]]` は概念言及のみ。
- frontmatter プロパティ（status / sources / updated / links）は軽く利用済み。
- `docs/index.md` は手動のマップ（グラフの代替）。
- 双方向リンクが**非対称**: decisions→knowledge は張るが、knowledge→decisions の張り返しが無い。
- 孤立ノート検出は未実装。

## 選別

| Obsidian 要素 | 適合 | 判断 |
|---|---|---|
| バックリンク（双方向） | ◎ | **P1 採用**。規約で実現（GUI 不要） |
| 孤立ノート検出 | ◎ | **P1 採用**。markdown を機械走査。docs 鮮度／エントロピー管理に直結 |
| グラフの可視化 | ○ | P2。P2-6 の「生成物」方針で mermaid/HTML として出せる |
| タグ／プロパティ | △ | 既に frontmatter で保有 |
| wikilink `[[slug]]` | ✗ | 却下。GitHub・素の md ビューアでリンク解決せず、可搬性が下がる |
| Canvas / Excalidraw / Mind Map / Juggl | ✗ | 却下。GUI・プラグイン依存、JSON blob で diff・レビュー不可 |

## 示唆

P1 の 2 件が「GUI を捨てても残る Obsidian 情報構造の本質」。特に孤立ノート検出は AI Builder Club の "keep docs honest"（docs 鮮度）とも一致する。実装は [../../decisions/2026-07-15-doc-links-and-orphans.md](../../decisions/2026-07-15-doc-links-and-orphans.md)。

## 未確認事項

- 導入時点で AF は孤立 0・broken link 0（除外: README/index、work-notes、templates。Required Reading のコード表記パスも到達扱い）。クリーンな状態でチェックを入れ、将来の孤立を捕捉する設計とした。
