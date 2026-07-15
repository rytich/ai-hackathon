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
- `description`: natural-language triggers and scope.
- `argument-hint`: expected input shape.
- `allowed-tools`: minimum tool surface needed by this workflow.

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

## Adoption Checklist

- [ ] Create `.agents/skills` as the canonical skill directory.
- [ ] Add thin `AGENTS.md` and tool-specific instruction files that point to shared docs.
- [ ] Convert repeated workflows into separate skills.
- [ ] Add skill frontmatter with `name`, `description`, `argument-hint`, and `allowed-tools`.
- [ ] Move detailed domain material into `references/`.
- [ ] Move repeatable commands into `scripts/`.
- [ ] Add compatibility entrypoints for each AI tool used by the project.
- [ ] Add a project-level permission allowlist.
- [ ] Treat `.vscode/settings.json` as formatter and style hints for agents.
- [ ] Treat `.vscode/launch.json` as reusable dev-server recipes.
- [ ] Prefer local Markdown artifacts and dry runs before external writes.
- [ ] Re-fetch GitHub state immediately before any external write.
