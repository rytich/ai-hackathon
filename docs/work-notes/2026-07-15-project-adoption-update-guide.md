# 作業サマリー: AF 新規導入・更新マニュアルの整備

## 日付 / branch
2026-07-15 / `1acx/project-adoption-update-guide`

## やったこと
- `docs/framework/project-update.md` を新規作成。ten_matcha への実際の更新作業（既存の日本語 IA を壊さず差分だけ反映）を一般化した手順書。現状把握→標準/独自IAの分岐→diffでの差分洗い出し→構造変更とルール変更の判断→反映→検証→コミット方法→更新タイミングの順で構成。
- `docs/framework/project-adoption.md` の冒頭に「新規導入用ガイド」であることを明記し、`project-update.md` への導線を追加。
- `docs/index.md`、`README.md`（構成ツリー・クイックスタート）、`docs/framework/knowledge-base.md` から `project-update.md` への参照を追加。
- `scripts/bootstrap-project.sh` のコピー対象リストに `project-update.md` を追加し、bootstrap 配布物に含めた。

## 検証
- `bash -n scripts/bootstrap-project.sh`
- `/tmp` への実 bootstrap で `docs/framework/project-update.md` が配布されることを確認。
- `docs/` 全体の相対リンク切れチェック（0件）。

## 引き継ぎ
- AI profile: Claude Code。
