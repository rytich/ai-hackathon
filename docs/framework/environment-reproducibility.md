# Environment Reproducibility

## Goal

別プロジェクト、別端末、別 AI エージェントでも、repository の内容だけで開発環境を再現できる状態を作る。secret は除外するが、secret 名、取得元、設定方法は docs に残す。

## Repository Requirements

最低限、対象 project に次を置く。

```text
README.md
AGENTS.md
.env.example
docs/knowledge/engineering/runtime.md
docs/knowledge/engineering/secrets.md
docs/framework/codex-dev-stack.md
docs/framework/ai-environment-profiles.md
docs/framework/ai-execution-framework.md
docs/framework/collaboration-rules.md
docs/work-notes/template.md
docs/decisions/README.md
.github/pull_request_template.md
```

## Runtime Definition

`docs/knowledge/engineering/runtime.md` には次を書く。

- required runtimes: Node.js、Python、Go、Rust など
- package manager と lockfile
- local services: database、queue、cache、mock server
- local startup command
- test command
- build command
- migration/seed command
- terminal-wide AI development stack setup, if using Codex/Spec Kit/context-mode/Serena
- Docker/Compose/devcontainer の使い方
- health check
- known limitations

## Secret Definition

`docs/knowledge/engineering/secrets.md` には次を書く。

- secret 名
- local env var 名
- development/staging/production の違い
- 取得方法
- rotation 方針
- commit 禁止対象
- local mock がある場合の使い方

secret の値は絶対に commit しない。

## Bootstrap Checklist

新しい端末での再現手順:

1. repository を clone する。
2. runtime version manager を入れる。
3. package manager install を実行する。
4. `.env.example` から `.env.local` などを作る。
5. local services を起動する。
6. migration/seed を実行する。
7. lint/typecheck/test/build を実行する。
8. Codex stack を使う場合は `docs/framework/codex-dev-stack.md` の verification を実行する。
9. 利用する AI profile を `./scripts/select-ai-profile.sh <profile>` で選ぶ。
10. `./scripts/check-agent-tools.sh` で profile ごとの必須ツールを確認する。must が欠落していたら導入する。
11. AI tools を接続する。
12. `AGENTS.md` と docs の required reading order を読む。

## AI Tooling

推奨:

- Codex for implementation
- Serena for symbol-aware navigation
- context-mode for large output and session memory
- Spec Kit for product workflow

tool は **must** と **recommended** に分かれる。区分と未導入時の fallback は `docs/framework/toolchain-flow.md` のツール要件表を正本とし、機械可読な定義を `.ai/profiles/<profile>/tools.tsv` に置く。must が欠落した端末では作業を始めない。

AI 環境別の設定差分は `docs/framework/ai-environment-profiles.md` に従って管理する。local auto-detection ではなく、`.ai/active-profile` に記録された profile を source of truth にする。

macOS/Codex 向けの端末セットアップは `docs/framework/codex-dev-stack.md` に分ける。project runtime と terminal-wide AI stack を混ぜない。

## Reproducibility Gate

次を満たすまで環境再現完了としない。

- clean clone から setup できる。
- lockfile が存在する。
- `.env.example` が最新。
- required checks が local で実行できる。
- docs/knowledge/engineering/runtime.md と実コマンドが一致している。
- secret が repository に含まれていない。
