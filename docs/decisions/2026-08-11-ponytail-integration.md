# 判断: Ponytail を AF の常時プラグインとしては導入しない

## 日付

2026-08-11

## 背景 / 課題

Ponytail は YAGNI、標準ライブラリ優先、最小差分を常時注入する Codex プラグインである。AF の開発規律に適合するかを、AF を変更せずに検証した。

## 選択肢

- Codex の全セッションに Ponytail を常時導入する。
- 導入せず、最小実装が必要な個別タスクでのみ同等の観点を明示的に適用する。

## 決定

現時点では常時導入を見送る。AF の Issue / Spec Kit / docs / quality gate を満たしたうえで最小実装を選ぶ、という既存方針を維持する。

## 理由

- Codex CLI 0.141.0 で marketplace と plugin add は利用でき、隔離した `PLUGIN_DATA` で SessionStart とモード変更フックは正常に動いた。
- ただし Ponytail は SessionStart と SubagentStart で「最短の diff」「設計ノートを作らない」「簡単な変更はテスト不要」といった規則を常時注入する。これは AF が必須とする Spec Kit の企画、Issue / PR の追跡、作業ノート、品質ゲート、必要なテストと衝突またはその優先度を曖昧にする。
- upstream の `npm test` はこの評価環境では pandas 未導入のため 1 件失敗した。CI は pandas を導入しているため利用者機能の不具合とは断定しないが、ローカル再現性の追加確認が必要である。

## 情報ソース

- https://github.com/DietrichGebert/ponytail （main, commit `2ed6c52c9d7e5e56942508591085fd45dea277d3`、v4.9.0）
- `https://github.com/DietrichGebert/ponytail/blob/main/.codex-plugin/plugin.json`
- `https://github.com/DietrichGebert/ponytail/blob/main/hooks/claude-codex-hooks.json`
- `AGENTS.md`

## 影響範囲

- AF の Codex 設定、プラグイン、ソースコードは変更しない。
- この decision と作業ノートのみを追加する。

## 却下した案・再検討条件

- 全体導入は却下する。
- AF 規約を明示的に優先し、フックを無効にした skill-only の隔離検証で、Issue / Spec Kit / docs / quality gate を損なわないことを確認できた場合に再検討する。
