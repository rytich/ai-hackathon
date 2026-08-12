# framework — エージェント運用ルール

AI エージェント（Codex / Claude Code など）が並行開発するための運用ルール。プロジェクトが変わっても共通のメタ知識。事業やプロダクトの知識は [../knowledge/](../knowledge/) に置く。

## 一覧

| ドキュメント | 内容 |
|---|---|
| [knowledge-base.md](knowledge-base.md) | docs 構造・スキーマ・維持ルールの正本。企画/実作業の分離、情報ソース記録、リンクと発見性 |
| [ai-execution-framework.md](ai-execution-framework.md) | 役割、標準ワークフロー、並列実行ルール |
| [collaboration-rules.md](collaboration-rules.md) | branch/worktree/PR/作業ログ、指示の型、インラインレビュー |
| [toolchain-flow.md](toolchain-flow.md) | superpowers/Spec Kit/crit/skills/GitHub Issues/Linear の標準フローと逸脱時の行動 |
| [ai-environment-profiles.md](ai-environment-profiles.md) | AI 環境別 profile の切り替え、複数 AI の Task Routing |
| [agent-settings-replication.md](agent-settings-replication.md) | AGENTS/CLAUDE/Copilot/skills の再現設計 |
| [software-engineering-practices.md](software-engineering-practices.md) | エージェント時代も捨てない開発規律 |
| [quality-gates.md](quality-gates.md) | 品質ゲートと自動 merge 判定 |
| [effect-metrics.md](effect-metrics.md) | AI 作業の効果測定、保存 mode、privacy、欠測、Git 運用境界 |
| [release-checklist.md](release-checklist.md) | VERSION、tag、CHANGELOG、公開 ZIP の release 整合性確認 |
| [environment-reproducibility.md](environment-reproducibility.md) | 別端末での再現手順 |
| [codex-dev-stack.md](codex-dev-stack.md) | macOS/Codex 用の開発スタック導入・検証 |
| [github-configuration.md](github-configuration.md) | GitHub labels、Issue/PR、branch protection |
| [agent-handoff.md](agent-handoff.md) | AI エージェント間の引き継ぎ手順 |
| [site-hosting.md](site-hosting.md) | 説明サイトのホスティング（Cloudflare Pages）と独自ドメイン設定 |
| [project-adoption.md](project-adoption.md) | 他プロジェクトへの新規導入手順 |
| [project-update.md](project-update.md) | 導入済みプロジェクトの AF 最新化手順 |

読む順序はプロジェクトの `AGENTS.md` / `CLAUDE.md` の Required Reading Order に従う。
