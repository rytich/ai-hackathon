# 判断: 双方向リンク規約と孤立ノート検出を AF に組み込む

## 日付
2026-07-15

## 背景 / 課題
Obsidian の情報構造の調査（[../planning/research/2026-07-15-obsidian-structure.md](../planning/research/2026-07-15-obsidian-structure.md)）で、AF の docs に 2 つの穴が判明した。

1. **双方向リンクが非対称**。decisions→knowledge は張るが、knowledge / planning から、それを生んだ decision へ張り返す規約が無い。ある知識の根拠を遡れない。
2. **孤立ノート検出が無い**。51+ の md があるが、どこからもリンクされず発見不能になった content を機械検出する手段が無い。

## 選択肢
- A: 何もしない
- B: Obsidian の情報構造の本質（双方向リンク＋孤立検出）を、GUI を捨てて markdown + git で実現する（採用）
- C: wikilink `[[slug]]` や Canvas/Excalidraw を導入して Obsidian に寄せる

## 決定
B を採用。

- **双方向リンク規約**: `knowledge/` `planning/` の content ノートに「関連」節を設け、それを生んだ decision / research へ張り返す。`knowledge-base.md` に規約として明記し、実在する関係（materials 概要 ← 出力形式の decision）に適用。
- **孤立ノート検出**: `scripts/check-doc-links.sh` を追加。broken link（エラー）と orphan（警告）を検出する構造非依存のスクリプト。`quality-gates.md` に組み込み、`templates/project/scripts/` で配布する。

## 理由
- 双方向リンクと孤立検出は「GUI を捨てても残る Obsidian 情報構造の本質」で、markdown + git のまま実現できる。孤立検出は AF が既に持つ docs 鮮度・エントロピー管理、および AI Builder Club の "keep docs honest" と一致する。
- スクリプトは構造非依存にし、除外パスを `DOC_LINKS_EXEMPT` で調整可能にした。これで AF の標準構造でも、ten_matcha の独自 IA（日本語フォルダ名、`作業記録/`）でも動く。
- broken link 検出を兼ねるため、これまで手動で回していたリンク検証を代替できる。

## 情報ソース
- Obsidian 可視化プラグイン記事: https://www.lifehacker.jp/article/2607-obsidian-plugins-visualize-notes/
- 調査ノート [../planning/research/2026-07-15-obsidian-structure.md](../planning/research/2026-07-15-obsidian-structure.md)

## 影響範囲
- 新規: `scripts/check-doc-links.sh`、`templates/project/scripts/check-doc-links.sh`、本ファイル、研究ノート
- 編集: `docs/framework/knowledge-base.md`（リンク規約）、`docs/framework/quality-gates.md`（チェック追加）、`docs/knowledge/materials/README.md` と overview（関連節の実例）、配布ミラー

## 却下した案・再検討条件
- **wikilink `[[slug]]`**: GitHub・素の md ビューアでリンク解決せず、AF の「repository 内で再現／GitHub で読める」原則に反するため却下。相対リンクを維持。
- **Canvas / Excalidraw / Mind Map / Juggl**: GUI・プラグイン依存、JSON blob で diff・レビュー不可のため却下。
- **P2（グラフの可視化）**: 保留。P2-6 の生成物方針で mermaid/HTML として出せるが、まず P1 の効果を見てから判断する。
- 再検討条件: orphan の除外方針（work-notes / templates）が実運用でノイズ過多・過少になれば見直す。ten_matcha 側に既存の orphan（Required Reading 未掲載の運用 docs）が 5 件あり、これは本 PR の対象外だが別途リンク整理を検討する。
