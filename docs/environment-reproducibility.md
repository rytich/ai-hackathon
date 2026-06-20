# Environment Reproducibility

## Goal

別プロジェクト、別端末、別 AI エージェントでも、repository の内容だけで開発環境を再現できる状態を作る。secret は除外するが、secret 名、取得元、設定方法は docs に残す。

## Repository Requirements

最低限、対象 project に次を置く。

```text
README.md
AGENTS.md
.env.example
docs/runtime.md
docs/secrets.md
docs/codex-dev-stack.md
docs/ai-environment-profiles.md
docs/ai-execution-framework.md
docs/collaboration-rules.md
docs/work-notes/template.md
docs/decision-log/README.md
.github/pull_request_template.md
```

## Runtime Definition

`docs/runtime.md` には次を書く。

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

`docs/secrets.md` には次を書く。

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
8. Codex stack を使う場合は `docs/codex-dev-stack.md` の verification を実行する。
9. 利用する AI profile を `./scripts/select-ai-profile.sh <profile>` で選ぶ。
10. AI tools を接続する。
11. `AGENTS.md` と docs の required reading order を読む。

## AI Tooling

推奨:

- Codex for implementation
- Serena for symbol-aware navigation
- context-mode for large output and session memory
- Spec Kit for product workflow

各 tool は optional にし、使えない端末でも手順が破綻しないように fallback を docs に残す。

AI 環境別の設定差分は `docs/ai-environment-profiles.md` に従って管理する。local auto-detection ではなく、`.ai/active-profile` に記録された profile を source of truth にする。

macOS/Codex 向けの端末セットアップは `docs/codex-dev-stack.md` に分ける。project runtime と terminal-wide AI stack を混ぜない。

## Reproducibility Gate

次を満たすまで環境再現完了としない。

- clean clone から setup できる。
- lockfile が存在する。
- `.env.example` が最新。
- required checks が local で実行できる。
- docs/runtime.md と実コマンドが一致している。
- secret が repository に含まれていない。
