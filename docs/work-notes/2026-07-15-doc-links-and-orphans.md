# 作業サマリー: 双方向リンク規約と孤立ノート検出（Obsidian P1）

## 日付 / branch / AI profile
2026-07-15 / `1acx/doc-links-orphans` / Claude Code

## 対象
Obsidian の情報構造の調査（[../planning/research/2026-07-15-obsidian-structure.md](../planning/research/2026-07-15-obsidian-structure.md)）で選んだ P1 の 2 件。判断は [../decisions/2026-07-15-doc-links-and-orphans.md](../decisions/2026-07-15-doc-links-and-orphans.md)。

## 内容

1. **孤立ノート検出スクリプト** — `scripts/check-doc-links.sh` を追加。broken link（エラー / exit 1）と orphan（警告）を検出。構造非依存で、除外パスは `DOC_LINKS_EXEMPT` で調整（既定: work-notes/, 作業記録/, templates/）。インラインコード内のリンク例は誤検出しない。Required Reading のコード表記パスは到達扱い。従来手動で回していた broken link 検証も代替。
2. **双方向リンク規約** — `knowledge-base.md` に「リンクと発見性」節を追加。decision→knowledge の片方向だった状態に対し、受け手（knowledge / planning）から根拠 decision / research へ張り返す `## 関連` 節の規約を定義。materials 概要に実例として適用。
3. **フォルダ目次（MOC）** — `docs/framework/README.md` を新設し全 framework docs を一覧リンク（従来 framework/ にフォルダ目次が無く、新規 bootstrap 先で orphan が出ていた）。materials/README にも資料一覧を追加。
4. **品質ゲート / 配布** — `quality-gates.md` にチェックを追加。`templates/project/scripts/` へ配布し、bootstrap の framework docs コピーに `README.md` を追加。

## 却下
- wikilink `[[slug]]`（GitHub でリンク解決せず可搬性低下）、Canvas/Excalidraw/Mind Map/Juggl（GUI・diff 不可）。理由は decision に記載。

## 検証
- AF 本体: broken 0 / orphan 0。
- 新規 bootstrap 先: broken 0 / orphan 0（`framework/README.md` と `check-doc-links.sh` の配布も確認）。
- スクリプトを ten_matcha の独自 IA（日本語フォルダ名）でも実行し、動作を確認。

## 未完了 / 次の作業
- ten_matcha 側に既存 orphan が 5 件（Required Reading 未掲載の運用 docs）。本 PR の対象外。反映時にリンク整理を検討。
- P2（リンクグラフの可視化）は保留。
- P2 全体の残り: 非エンジニアの参加経路、学習の昇華経路。
