# 作業サマリー: 管理先の境界（Linear / GitHub）の明文化

## 日付 / branch / AI profile
2026-07-15 / `1acx/tracker-boundary` / Claude Code

## 対象
ツールチェーン標準（[../decisions/2026-07-15-toolchain-standard.md](../decisions/2026-07-15-toolchain-standard.md)）の二層ハブに、具体的な判定基準を追加した。

## 内容
- `docs/framework/toolchain-flow.md` に「管理先の境界（Linear か GitHub か）」節を追加。判定は 1 つ「アプリのソースコード（と改修・機能追加の要件定義・開発タスク）に関わるか」。表・迷ったときの問い・開発/非開発ドキュメントの扱い・両側の sub-issue 分割を明記。
- root/template `AGENTS.md` と全 profile に境界の 1 行を追記。
- 既存 decision に「追記（境界の明確化）」を追加。

## 背景
既存設計は二層ハブ（PM/企画=Linear、開発=GitHub）まではあったが、「ソースコードに反映しないファイル変更は Linear」「要件定義書・開発タスクは GitHub」「Linear 側の sub-issue 分割」という具体基準が言語化されていなかった。約 8 割は設計済みで、残りの境界を明文化した。

## 検証
- `./scripts/check-doc-links.sh` — broken 0 / orphan 0。
- 新規 bootstrap 先に境界節と AGENTS の 1 行が配布されることを確認。

## 未完了 / 次の作業
- ten_matcha 等への反映は保留（複数 PR 分をまとめて `project-update.md` 手順で）。
