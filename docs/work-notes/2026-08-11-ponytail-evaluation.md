# Ponytail 検証・導入シミュレーション

## 対象

- https://github.com/DietrichGebert/ponytail
- 評価 commit: `2ed6c52c9d7e5e56942508591085fd45dea277d3`

## 実施内容

- 一時クローンで Codex manifest、hook 設定、hook 実装、Ponytail の canonical skill を確認した。
- `node scripts/check-rule-copies.js` は成功した。
- `npm test` は 14 件中 13 件成功、1 件失敗した。失敗した CSV correctness test は Python 環境に pandas がないことが根本原因であり、CI は `pip install pandas` を実行する。
- `PLUGIN_DATA` を一時ディレクトリに限定して hook を実行した。SessionStart は `PONYTAIL:FULL` と instructions を返し、`@ponytail off` は state を削除して `PONYTAIL:OFF` を返した。
- Codex CLI 0.141.0 の `plugin marketplace` / `plugin add` コマンドを確認した。

## 結論

常時導入は見送る。理由と再検討条件は `docs/decisions/2026-08-11-ponytail-integration.md` を参照。
