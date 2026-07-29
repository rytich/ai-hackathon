# 作業サマリー: エージェント別オーケストレーションの明記

## 日付 / branch / AI profile
2026-07-29 / `1acx/agent-orchestration-matrix` / Claude Code

## 対象
判断は [../decisions/2026-07-29-agent-orchestration-matrix.md](../decisions/2026-07-29-agent-orchestration-matrix.md)。対外向け概要図（v0.2.0）に「実行」の図を追加した際、AF 本体に同じ情報がないことが判明したため反映した。

## 内容

- `toolchain-flow.md` に **「実行エージェントとオーケストレーション」節**を新設。Codex → Symphony、Claude Code / hermes → skills マルチエージェント、という対応表と隔離方式（issue ごとのワークスペース / worktree → crabbox）を明記。方式が違っても追跡先と承認境界は共通であることを併記。
- 「並列開発」に **隔離方式をプロジェクトで 1 つに決める**ルールを追加（worktree / crabbox / Symphony ワークスペースを混在させない）。
- `ai-environment-profiles.md` の運用ルールに、オーケストレーションの違いと、**profile を持たないエージェント（hermes 等）にも規約が適用される**旨を追加。
- root/template の `AGENTS.md` と全 profile entrypoint（5 ファイル）に 1 行ずつ反映。

## 検証
- `./scripts/check-doc-links.sh` — broken 0 / orphan 0。
- 新規 bootstrap 先に節と 1 行ルールが配布されることを確認。

## 未完了 / 次の作業
- crit の実プロジェクトでの検証（次のタスク）。
- 導入済みプロジェクトへの反映は必要になった時点で `project-update.md` の手順で行う。
