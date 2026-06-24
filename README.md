# agentic-framework

Version: 0.1.0

複数の AI エージェントが、自律的かつ並行してソフトウェア開発を進めるための軽量フレームワークです。

ichimesher で試行した Spec Kit、Codex/Serena/context-mode、Issue 駆動、worktree 分離、作業サマリー、判断ログ、品質ゲートの運用を、他プロジェクトや別端末でも再現できるように汎用化しています。

## 目的

- AI エージェント同士の作業衝突を減らす。
- 低コストにするため、大量ログや大きなファイルを会話コンテキストへ流さない。
- 仕様、実装、レビュー、検証、引き継ぎを repository 内の成果物だけで再現する。
- 自動 merge できる変更と、人間承認が必要な変更を明確に分ける。
- プロジェクト固有の技術スタックに依存しない運用ルールを提供する。

## 構成

```text
AGENTS.md                         # AI エージェント共通ルール
docs/ai-execution-framework.md    # 役割、標準ワークフロー、並列実行ルール
docs/collaboration-rules.md       # branch/worktree/PR/作業ログの運用
docs/environment-reproducibility.md # 別端末での再現手順
docs/codex-dev-stack.md           # macOS/Codex 用の開発スタック導入・検証手順
docs/agent-handoff.md             # AI エージェント間の引き継ぎ手順
docs/ai-environment-profiles.md   # Codex/Claude など AI 環境別 profile 切り替え
docs/agent-settings-replication.md # AGENTS/CLAUDE/Copilot/skills の再現設計
docs/github-configuration.md      # GitHub labels、Issue/PR、branch protection 設定
docs/quality-gates.md             # 品質ゲートと自動 merge 判定
docs/project-adoption.md          # 既存プロジェクトへの導入手順
docs/templates/                   # 作業サマリー、判断ログ、PR テンプレート
scripts/bootstrap-project.sh      # 他プロジェクトへのテンプレート導入
templates/project/                # bootstrap で配布される雛形
```

## クイックスタート

既存プロジェクトへ導入する場合:

```bash
./scripts/bootstrap-project.sh /path/to/target-project
```

導入後、対象プロジェクトで次を編集してください。

1. `AGENTS.md` のプロジェクト名、検証コマンド、禁止事項。
2. `docs/ai-execution-framework.md` の stable branch、branch prefix、required checks。
3. `docs/environment-reproducibility.md` の runtime、package manager、secret 名。
4. `docs/codex-dev-stack.md` の端末ごとの導入パスと検証コマンド。
5. `docs/agent-handoff.md` の required reading order。
6. `docs/ai-environment-profiles.md` の利用 AI profile。
7. `docs/agent-settings-replication.md` の tool-specific entrypoint、skills、permission allowlist。
8. `docs/github-configuration.md` の labels、branch protection、required checks。
9. `.github/pull_request_template.md` の project-specific checklist。

AI 環境を明示的に切り替える場合:

```bash
./scripts/select-ai-profile.sh codex
./scripts/select-ai-profile.sh claude
./scripts/select-ai-profile.sh copilot
```

選択された profile は `.ai/active-profile` に記録され、profile ごとの設定ファイルだけが repository root に反映されます。

新規プロジェクトの場合は、Spec Kit が利用可能なら次の順で進めます。

1. specify: プロダクト要求と受け入れ条件を固定する。
2. plan: 技術方針、構成、品質ゲートを決める。
3. tasks: 並列化できる単位へ分解する。
4. implement: Issue ごとに worktree を分け、AI エージェントを割り当てる。

## 推奨ツール

- Spec Kit: 仕様、計画、タスクの phase control。
- Codex: 実装、検証、PR 作成。
- Serena: symbol-aware なコード理解とリファクタリング。
- context-mode: 大量出力、ログ、検索、session memory の token-efficient 処理。
- GitHub Issues/PR: 作業単位、レビュー、merge gate。
- Docker or devcontainer: 端末差分を減らす実行環境。

## 基本ループ

```text
Issue ready
  -> Coordinator が scope と acceptance criteria を確認
  -> Implementer が専用 branch/worktree で実装
  -> Reviewer が差分、テスト、secret、仕様対応を確認
  -> Human Approver が危険領域だけ承認
  -> Work note と Decision log を残す
  -> Required checks 成功後に merge
```

詳細は [docs/ai-execution-framework.md](/Users/ichie/github/agentic-framework/docs/ai-execution-framework.md) を参照してください。
