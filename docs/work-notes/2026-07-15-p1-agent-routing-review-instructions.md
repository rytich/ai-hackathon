# 作業サマリー: P1 3項目（Task Routing / Inline Review / Instruction Pattern）の組み込み

## 日付 / branch / AI profile
2026-07-15 / `1acx/p1-agent-routing-review-instructions` / Claude Code

## 対象
外部記事調査（[../planning/research/2026-07-15-claude-code-guide.md](../planning/research/2026-07-15-claude-code-guide.md)）で特定した P1 の 3 ギャップ。判断は [../decisions/2026-07-15-p1-agent-routing-review-instructions.md](../decisions/2026-07-15-p1-agent-routing-review-instructions.md)。

## 内容

1. **Task Routing** — `docs/framework/ai-environment-profiles.md` にタスク種別 × 推奨エージェントの表と運用ルール（迷ったら深い方に倒す / 実績を work note に残す / 同一 Issue を複数エージェントで並行させない）を追加。
2. **Inline Review** — `docs/framework/collaboration-rules.md` に節を新設。企画成果物を実装着手前にレビューする導線、手段の選択（PR インラインコメント / crit などのローカルツール）、差分で応答するルールを定義。`quality-gates.md` のレビューチェックリストにゲート 2 行を追加。
3. **Instruction Pattern** — 同 `collaboration-rules.md` に What/Why/How の型を定義。`templates/project/.github/ISSUE_TEMPLATE/agent-task.md` の `Goal` を `What` に変え、`Why`（背景・経緯）と `How`（進め方の制約）欄を追加。Start Procedure に「欠けていれば着手前に補完を依頼する」を追記。

3 件とも root `AGENTS.md`、`templates/project/AGENTS.md`、全 profile entrypoint（claude / codex / codex-claude×2 / generic / copilot）へ反映。PR テンプレートに `Review / Routing` セクション、`docs/index.md` に導線を追加。

## 理由
いずれも既存構造に追記で乗り、新規ドキュメントを増やさずに済む（`map, not manual` の原則）。特に 2 は、AF 自身が「企画と実作業を分離する」と宣言しながら企画の承認手段が未定義だった矛盾の解消。

## 検証
- `bash -n scripts/bootstrap-project.sh` — 構文 OK
- `/tmp` への実 bootstrap で、配布先の `AGENTS.md` に 3 ルール、Issue テンプレートに Why 欄、PR テンプレートに Review/Routing、framework docs に 3 節が届くことを確認。
- `docs/` 全体の相対リンク切れ 0 件。

## 未完了 / 次の作業
- **P2**: 非エンジニアの参加経路（AF の Git/PR 前提と、非開発カテゴリの主担当が非エンジニアである点の矛盾）、学習の昇華経路（work-note → `.agents/skills/`）、対外成果物の出力形式。
- Task Routing の表は work note の実績が溜まった時点で見直す。
- 導入済みプロジェクト（ten_matcha / bonsmith_corporate）への反映は [../framework/project-update.md](../framework/project-update.md) の手順で別途実施。
