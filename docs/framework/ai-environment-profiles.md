# AI Environment Profiles

## Purpose

利用する AI 環境に合わせて、設定ファイルを明示的に切り替える。

自動検出や暗黙の local state には依存しない。現在選択されている profile は `.ai/active-profile` に記録し、切り替えは `scripts/select-ai-profile.sh` だけで行う。

## Design

```text
.ai/
  active-profile
  profiles/
    codex/
      manifest.env
      files/
        AGENTS.md
    claude/
      manifest.env
      files/
        CLAUDE.md
    codex-claude/
      manifest.env
      files/
        AGENTS.md
        CLAUDE.md
    copilot/
      manifest.env
      files/
        .github/
          copilot-instructions.md
    generic/
      manifest.env
      files/
        AGENTS.md
scripts/
  select-ai-profile.sh
```

`manifest.env` は profile の説明と反映対象を定義する。

```bash
PROFILE_NAME=codex
PROFILE_DESCRIPTION="Codex desktop/CLI profile"
PROFILE_FILES="AGENTS.md"
```

`files/` 以下に置いた path が repository root にコピーされる。例えば `.ai/profiles/codex/files/AGENTS.md` は `./AGENTS.md` に反映される。

## Switching

```bash
./scripts/select-ai-profile.sh codex
./scripts/select-ai-profile.sh claude
./scripts/select-ai-profile.sh codex-claude
./scripts/select-ai-profile.sh copilot
./scripts/select-ai-profile.sh generic
```

切り替え時の動作:

- profile の存在を確認する。
- 全 profile の `PROFILE_FILES` を managed files として扱う。
- 現 profile に含まれない managed files は `.ai/backups/<timestamp>/<path>` に退避して root から外す。
- 現 profile の `PROFILE_FILES` だけを root に反映する。
- 反映前の既存ファイルは `.ai/backups/<timestamp>/<path>` に退避する。
- `.ai/active-profile` に profile 名を書く。
- 自動で commit はしない。

## Rules

- profile 固有の設定は `.ai/profiles/<profile>/files/` に置く。
- 共通ルールは `docs/`、`.agents/skills`、canonical templates に置く。
- 同じ設定ファイルを複数 AI 向けに手作業で編集しない。
- `AGENTS.md`、`CLAUDE.md`、`.github/copilot-instructions.md` などの tool-specific files は薄い entrypoint にする。
- Codex と Claude Code を同じ checkout で使う場合は `codex-claude` profile を使い、`AGENTS.md` と `CLAUDE.md` を同時に有効化する。
- 複数エージェントを有効化したら、下記 Task Routing でタスク種別ごとの担当を決める。決めずに「どちらでも同じ」運用にしない。
- profile 切り替え後は diff を確認する。
- PR には利用 profile を work note に書く。
- CI や production deploy は profile に依存させない。

## Recommended Profiles

### codex

Use for Codex desktop/CLI.

Typical files:

```text
AGENTS.md
```

### claude

Use for Claude Code or Claude-centered workflows.

Typical files:

```text
CLAUDE.md
```

### codex-claude

Use when Codex and Claude Code both work from the same checkout.

Typical files:

```text
AGENTS.md
CLAUDE.md
```

This profile keeps both tool entrypoints active while shared rules remain in `docs/` and `.agents/skills`.

## Task Routing（複数エージェントの使い分け）

`codex-claude` のように複数の AI を同時に有効化する場合、**どちらをいつ使うか**を決めておく。決めないと「どちらでも同じ」扱いになり、速度と深さのどちらも取り逃す。

既定の振り分け（プロジェクトごとに調整する）:

| タスク種別 | 推奨 | 理由 |
|---|---|---|
| 定型の実装、既存パターンの適用、機械的な修正 | Codex | 速度優先。判断の余地が小さい |
| 大量ファイルの一括変更、リネーム、定型 refactor | Codex | 反復処理が主で、設計判断を伴わない |
| 仕様・設計の検討、要件定義、trade-off の判断 | Claude Code | 深い思考と文脈統合が要る |
| 不具合の原因調査、再現困難な問題の切り分け | Claude Code | 仮説検証の反復が要る |
| 非開発知識（事業・法務・サポート）の整理 | Claude Code | 文脈依存が強く、誤りのコストが高い |
| 人間承認が必要な領域（auth/secret/billing/production） | Claude Code | 判断根拠の説明責任が要る |
| 大量出力・ログ・広域検索・集計・parse | context-mode | 生データを会話へ流さず要約する。token を浪費しない |
| tracker 上の定型タスクを無人で継続実行 | Symphony（Codex） | issue ごとの隔離ワークスペースで自律実行する。`docs/framework/toolchain-flow.md` を参照 |

運用ルール:

- 迷ったら**深い方（Claude Code）に倒す**。速度で失うものより、浅い判断で失うものの方が大きい。
- 使い分けの実績は work note の `AI profile` 欄に残す。溜まった実績で上の表を更新する。
- 表を更新したら理由を `docs/decisions/` に残す。
- **同一 Issue を複数エージェントで並行させない。** 担当を 1 つに決める。分担する場合は Issue を分割する。

### copilot

Use for GitHub Copilot repository instructions.

Typical files:

```text
.github/copilot-instructions.md
```

### generic

Use for tools that only need repository-level instructions.

Typical files:

```text
AGENTS.md
```

## Work Note Field

Work notes should include:

```text
- AI profile:
```

## Adoption Checklist

- Decide supported profiles.
- Fill `.ai/profiles/<profile>/manifest.env`.
- Keep profile-specific files under `.ai/profiles/<profile>/files/`.
- Keep shared workflows in `.agents/skills` and reference them from tool-specific instructions.
- Add a dual profile such as `codex-claude` when multiple AI tools must read root-level entrypoints at the same time.
- Run `./scripts/select-ai-profile.sh <profile>`.
- Commit generated root-level config files only if the project wants that profile to be the shared default.
- Document local-only profile choices in work notes, not in hidden local state.
- Manage detailed replication rules in `docs/framework/agent-settings-replication.md`.
