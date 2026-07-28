# AI Agent Settings Replication

## Purpose

AI agent settings must be reproducible across repositories, terminals, and agent tools without relying on hidden local state.

Use this document when copying the framework into another project, adding a new AI tool, or turning repeated agent prompts into reusable project assets.

## Structure

Keep one canonical project layer, then add thin compatibility entrypoints for each AI tool.

```text
.agents/
  skills/
    <skill-name>/
      SKILL.md
      references/
      scripts/
AGENTS.md
CLAUDE.md
.github/
  copilot-instructions.md
.vscode/
  settings.json
  launch.json
.ai/
  active-profile
  profiles/
    <profile>/
      manifest.env
      files/
```

Recommended ownership:

- `AGENTS.md`: project-wide rules, coordination, quality gates, safety rules.
- `.agents/skills/<name>/SKILL.md`: repeatable task-specific workflows.
- `.agents/skills/<name>/references/`: detailed domain material used by a skill.
- `.agents/skills/<name>/scripts/`: repeatable local commands used by a skill.
- `CLAUDE.md`, `.github/copilot-instructions.md`, and similar files: thin tool-specific entrypoints.
- `.ai/profiles/<profile>/files/`: environment-specific files copied into the repository root by `scripts/select-ai-profile.sh`.
- `.vscode/settings.json`: formatter, language, and style hints that agents may inspect.
- `.vscode/launch.json`: reusable local dev-server and debug recipes that agents may inspect.

## Thin Entrypoints

Root and tool-specific instruction files should point to shared project docs instead of duplicating long rules.

```md
# Tool Instructions

Read these first:

1. `AGENTS.md`
2. `docs/framework/ai-execution-framework.md`
3. `docs/framework/agent-settings-replication.md`
4. `docs/framework/quality-gates.md`

Project skills live in `.agents/skills/<name>/SKILL.md`.
```

This keeps tool-specific files small and makes drift easier to review.

## Task-Specific Skills

Move repeated agent workflows into `.agents/skills`.

Good skill candidates:

- `create-issue`: draft a GitHub Issue or local issue proposal.
- `pr-description`: generate a PR body without creating or updating the PR.
- `review-pr`: review a diff or PR with severity filtering.
- `test-confidence`: choose validation commands from the current diff.
- `release`: prepare version, changelog, tag, and release notes.
- `production-inspection`: inspect production or customer data with read-only rules.
- `bulk-message`: prepare high-risk outbound messages with dry runs and explicit approval.

Use intent-based names, not implementation-specific names. A skill should describe what the user is trying to do.

## Skill Lifecycle（work-note から skill へ昇華させる）

skill は「一度書いて放置」ではなく、繰り返しから**昇華させ、要らなくなったら畳む**もの。知識と同じく、育てて発見可能に保つ（`docs/framework/knowledge-base.md` の「リンクと発見性」と同思想）。

### 昇華トリガー

- 同じ手順を `docs/work-notes/` で **3 回以上**繰り返したら、skill の候補にする。手順が安定し、毎回同じ判断をしているものが良い候補。
- 1〜2 回の作業を先回りで skill 化しない（早すぎる抽象化）。まず work-note に残し、型が見えてから昇華する。
- 昇華したら、元になった work-note から新しい skill へリンクし、skill の `## References` から根拠 work-note / decision へ張り返す（双方向リンク）。

### ステータスと畳み方

- skill の frontmatter に `status: active | in-progress | deprecated` を持たせる。
- 使われなくなった、または前提が変わった skill は `deprecated` にし、代替があればそれを指す。放置された skill は誤誘導のもと。
- `.agents/skills/` を定期的に棚卸しし、参照されない skill を検出・統廃合する（`scripts/check-doc-links.sh` の孤立検出と同じ発想）。

## Skill Frontmatter

Each skill should start with explicit metadata.

```md
---
name: review-pr
description: >
  Review pull requests against project guidelines, code quality, security,
  regression risk, and acceptance criteria.
argument-hint: optional PR number or URL
allowed-tools: Bash(git *), Bash(gh *)
---
```

Fields:

- `name`: stable identifier.
- `description`: what it does **and when to use it**. Include trigger phrases users are likely to type. "Helps with X" is too vague to route on; name the concrete situation ("Use when working with PDF files, or when the user asks to extract tables").
- `argument-hint`: expected input shape.
- `allowed-tools`: minimum tool surface needed by this workflow.

### Invocation control (dangerous skills)

For skills that touch dangerous surfaces — production/customer data, bulk outbound messages, migrations, billing — do not rely on prose warnings alone. Disable automatic invocation so the skill only runs when a human explicitly asks for it.

- **Disable model invocation**: the agent must not auto-trigger the skill; only an explicit user request runs it. Use for `production-inspection`, `bulk-message`, migration, and billing skills.
- **Hide from / expose to the user menu**: control whether the skill appears in the slash/command menu.

The exact frontmatter keys depend on the tool (for example Claude Code uses `disable-model-invocation` and `user-invocable`; other tools differ, and some spell it `user_invocable`). Record the capability intent in the skill, and use the key your tool documents. This is the mechanical counterpart to the human-approval rules in `docs/framework/quality-gates.md`.

## Minimal Skill Template

```md
---
name: skill-name
description: >
  What this skill does. Include phrases users are likely to type.
argument-hint: optional input shape
allowed-tools: Bash(git *), Bash(gh *)
---

# Skill Name

## Workflow

### 1. Gather Context

Describe exactly what to inspect first.

### 2. Decide Scope

Explain how to choose between small and large changes.

### 3. Act

Define the main task steps.

### 4. Verify

List required validation and objective review checks.

### 5. Report

Name the files, PR, Issue, and remaining risks to report.

## Safety Rules

- Prefer local Markdown artifacts and dry runs before external writes.
- Re-fetch GitHub state immediately before commenting, merging, or closing.
- Ask for human approval before destructive migration, production deploy, billing, auth, secret, legal, privacy, or bulk-message actions.

## References

- `AGENTS.md`
- `docs/framework/ai-execution-framework.md`
- `docs/framework/quality-gates.md`
```

## Progressive Disclosure

A skill competes for the same context budget as the task. Keep `SKILL.md` a small map, not a manual — the same principle as `docs/framework/knowledge-base.md`.

- Keep `SKILL.md` short — a table of contents plus the steps every run needs. Long skills get partially read and half-followed.
- **Inline what every branch needs. Point to what only some branches need.** Move detailed domain material into `references/` and repeatable commands into `scripts/`, and link them.
- **References go one level deep.** A skill points to a reference; a reference should not point to another reference the agent must chase. Deep chains get abandoned mid-read.
- If several skills share the same reference, keep one copy and link it from each — do not duplicate.

## Permission Allowlist

Each repository should document the minimum commands agents may run without human approval.

Start with:

- read-only Git commands: `git status`, `git diff`, `git log`, `git show`
- read-only GitHub commands: `gh issue view`, `gh issue list`, `gh pr view`, `gh pr list`
- project validation commands listed in `docs/framework/quality-gates.md`
- local scripts that do not write external state

Require explicit approval for:

- `gh issue comment`, `gh issue close`, `gh pr merge`, and other external writes unless they are part of the approved completion pipeline
- production deploy, migration, billing, auth, permission, secret, legal, privacy, or bulk-message actions
- deleting data, force-pushing, rewriting history, or changing branch protection

## Profile Integration

Use `.ai/profiles/<profile>/files/` for tool-specific instruction files.

Examples:

```text
.ai/profiles/codex/files/AGENTS.md
.ai/profiles/claude/files/CLAUDE.md
.ai/profiles/codex-claude/files/AGENTS.md
.ai/profiles/codex-claude/files/CLAUDE.md
.ai/profiles/copilot/files/.github/copilot-instructions.md
```

Rules:

- Switch profiles only with `scripts/select-ai-profile.sh`.
- Do not manually mix files from multiple profiles.
- Keep shared behavior in `docs/` and `.agents/skills`.
- Keep tool-specific files as small compatibility entrypoints.
- Use a dual profile when two tools must be active in the same checkout, for example `codex-claude` with both `AGENTS.md` and `CLAUDE.md`.
- Review the diff after switching profiles.

## Framework Coexistence and Third-party Skills

このプロジェクトの `.agents/skills` は、外部の skill フレームワーク（marketplace 由来の plugin など）と**共存する**ことがある。同時に複数入れると事故が起きやすい。

- **命名衝突を避ける。** 複数のフレームワークが同名の skill / コマンドを提供すると、どちらが動くか予測不能になる。プロジェクト固有 skill には固有の接頭辞を付け、外部フレームワークと名前が重ならないようにする。特に「同じ作業に異なる哲学」（例: 2 つの TDD skill）が混ざると挙動が割れる。
- **哲学の衝突を 1 つに寄せる。** 同じ領域（レビュー、TDD、リリース手順）を複数フレームワークがカバーする場合、どれを正とするかをこのプロジェクトで 1 つ決め、残りは無効化するか使わない。
- **第三者 skill は中身を見てから入れる。** skill は手順とスクリプトを含み、実行される。信頼できるソースからのみ導入し、`scripts/` と `allowed-tools` を読んでから有効化する。中身を見ずに入れると、データ持ち出しや環境侵害につながりうる。secret・production data に触れる skill は特に監査する。
- 導入した外部フレームワークと、その採否理由は `docs/decisions/` に残す。

## Adoption Checklist

- [ ] Create `.agents/skills` as the canonical skill directory.
- [ ] Add thin `AGENTS.md` and tool-specific instruction files that point to shared docs.
- [ ] Convert workflows repeated 3+ times in work-notes into separate skills; do not pre-build one-off workflows.
- [ ] Add skill frontmatter with `name`, `description` (what + when), `argument-hint`, `allowed-tools`, and `status`.
- [ ] Disable model invocation for skills touching production data, bulk messages, migrations, or billing.
- [ ] Keep `SKILL.md` a short map; move detail into `references/` (one level deep) and repeatable commands into `scripts/`.
- [ ] Prefix project skills to avoid name collisions with external skill frameworks; vet third-party skills before enabling.
- [ ] Add compatibility entrypoints for each AI tool used by the project.
- [ ] Add a project-level permission allowlist.
- [ ] Treat `.vscode/settings.json` as formatter and style hints for agents.
- [ ] Treat `.vscode/launch.json` as reusable dev-server recipes.
- [ ] Prefer local Markdown artifacts and dry runs before external writes.
- [ ] Re-fetch GitHub state immediately before any external write.
