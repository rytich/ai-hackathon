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
- 共通ルールは `docs/` と canonical templates に置く。
- 同じ設定ファイルを複数 AI 向けに手作業で編集しない。
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
- Run `./scripts/select-ai-profile.sh <profile>`.
- Commit generated root-level config files only if the project wants that profile to be the shared default.
- Document local-only profile choices in work notes, not in hidden local state.
