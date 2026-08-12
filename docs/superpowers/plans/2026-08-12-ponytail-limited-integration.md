# Ponytail の限定統合 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Codexを既定profileにし、Ponytail由来の最小実装判断をAFの品質規律の下で全対応agentへ共有する。

**Architecture:** Ponytailのplugin、hook、MCPは導入しない。共有の開発規律に安全境界付きの判断ラダーを加え、`.ai/profiles/` はhost固有の薄い入口とツール要件だけを管理する。profile選択スクリプトは共有`AGENTS.md`を管理対象から外し、空のhost固有ファイル集合を持つprofileも選択できるようにする。

**Tech Stack:** Bash、Markdown、既存の`tools.tsv`検証、Git。

## Global Constraints

- `AGENTS.md`、Issue / Spec Kit、docs、テスト、品質gate、承認境界は最小実装判断より常に優先する。
- Ponytailのpackage、Node.js hook、MCP server、外部依存は追加しない。
- profile固有ファイルは共有規律を参照する薄い入口に留め、長い規則の手コピーを作らない。
- rootと`templates/project/`で配布するprofile選択機構と検証スクリプトを同期する。

---

## File Structure

- `.ai/active-profile`: AF自身の既定profileを`codex`として記録する。
- `.ai/profiles/*/{manifest.env,tools.tsv,files/*}`: Codexを基準に、Claude、Codex+Claude、hermes、Copilot、genericのhost固有入口とツール要件を定義する。
- `scripts/select-ai-profile.sh`: 共有`AGENTS.md`を変更せずにprofile固有入口だけを切り替える。
- `scripts/test-select-ai-profile.sh`: 一時コピーで全profile選択と共有`AGENTS.md`保持を回帰検証する。
- `docs/framework/software-engineering-practices.md`: 安全境界付きの実装判断ラダーを定義する。
- `scripts/complete-task.sh`: objective reviewに最小性・範囲逸脱の確認項目を出力する。
- `templates/project/...`: 上記の配布対象を同一内容で提供する。

### Task 1: Codex基準のprofile定義と安全な選択機構

**Files:**

- Create: `.ai/active-profile`
- Create: `.ai/profiles/{codex,claude,codex-claude,hermes,copilot,generic}/manifest.env`
- Create: `.ai/profiles/{codex,claude,codex-claude,hermes,copilot,generic}/tools.tsv`
- Create: 必要な`.ai/profiles/*/files/{CLAUDE.md,.github/copilot-instructions.md}`
- Modify: `scripts/select-ai-profile.sh`
- Modify: `templates/project/.ai/active-profile`
- Modify: `templates/project/.ai/profiles/**`
- Modify: `templates/project/scripts/select-ai-profile.sh`
- Test: `scripts/test-select-ai-profile.sh`

**Interfaces:**

- Consumes: `PROFILE_NAME`, `PROFILE_DESCRIPTION`, `PROFILE_FILES` from each `manifest.env`.
- Produces: `.ai/active-profile` and only the files listed by the selected profile; `AGENTS.md` is never a `PROFILE_FILES` member.

- [ ] **Step 1: Write the failing profile-selection regression script**

Create `scripts/test-select-ai-profile.sh` with a temporary fixture that copies `.ai/` and `scripts/select-ai-profile.sh`, creates a shared root `AGENTS.md`, and exercises every profile:

```bash
assert_eq "codex" "$(tr -d '[:space:]' < "$fixture/.ai/active-profile")"
assert_eq "shared" "$(cat "$fixture/AGENTS.md")"
(cd "$fixture" && ./scripts/select-ai-profile.sh claude)
test -f "$fixture/CLAUDE.md"
assert_eq "shared" "$(cat "$fixture/AGENTS.md")"
(cd "$fixture" && ./scripts/select-ai-profile.sh copilot)
test -f "$fixture/.github/copilot-instructions.md"
```

Also select `codex-claude`, `hermes`, and `generic`; assert that previous host-specific files are deactivated and the shared `AGENTS.md` remains unchanged after each selection.

- [ ] **Step 2: Run the regression script and verify it fails**

Run: `bash scripts/test-select-ai-profile.sh`

Expected: FAIL because `.ai/` does not yet exist and `select-ai-profile.sh` rejects a profile with an empty `PROFILE_FILES` value.

- [ ] **Step 3: Define the minimal profile matrix**

Create `.ai/active-profile` containing `codex`. Add the six named profiles. Use these `PROFILE_FILES` values:

```bash
# codex, hermes, generic
PROFILE_FILES=""
# claude and codex-claude
PROFILE_FILES="CLAUDE.md"
# copilot
PROFILE_FILES=".github/copilot-instructions.md"
```

Set every `tools.tsv` to require `git` and `gh`. Keep Codex `context-mode` as `must` (`mcp:codex:context-mode`); all other non-core tools are `recommended` with an explicit fallback. Give `hermes` only stable core requirements plus optional tooling, not an unverified plugin requirement.

Write `CLAUDE.md` and Copilot instructions as short references to `AGENTS.md`, `docs/framework/software-engineering-practices.md`, `docs/framework/toolchain-flow.md`, and `docs/framework/quality-gates.md`.

- [ ] **Step 4: Implement safe profile switching**

In both `scripts/select-ai-profile.sh` copies:

```bash
# Empty is a valid profile with no host-specific instruction file.
# Do not reject PROFILE_FILES="".
# Build MANAGED_FILES only from non-empty profile entries.
# AGENTS.md is shared and must never appear in any PROFILE_FILES manifest.
```

Preserve existing backup behavior for actual host-specific files. Do not delete `AGENTS.md` based on profile changes.

- [ ] **Step 5: Mirror the profile layout into the project template**

Copy exactly the same profile manifests, tool tables, and thin host entrypoints into `templates/project/.ai/`. Keep root and template selector scripts byte-identical.

- [ ] **Step 6: Run focused checks**

Run:

```bash
bash scripts/test-select-ai-profile.sh
bash -n scripts/select-ai-profile.sh
bash -n templates/project/scripts/select-ai-profile.sh
diff -u scripts/select-ai-profile.sh templates/project/scripts/select-ai-profile.sh
./scripts/check-agent-tools.sh --profile codex
```

Expected: all succeed; the active profile is Codex and no shared `AGENTS.md` is overwritten by any profile selection.

- [ ] **Step 7: Commit the profile subsystem**

```bash
git add .ai scripts/select-ai-profile.sh scripts/test-select-ai-profile.sh templates/project/.ai templates/project/scripts/select-ai-profile.sh
git commit -m "feat: add Codex-first AI profiles"
```

### Task 2: 安全境界付きの最小実装判断を共有規律へ追加する

**Files:**

- Modify: `docs/framework/software-engineering-practices.md`
- Test: `scripts/check-doc-links.sh`

**Interfaces:**

- Consumes: AFの既存「YAGNI And Existing Patterns」節。
- Produces: 実装前とレビュー時に参照する、優先順位と例外境界が明示された判断ラダー。

- [ ] **Step 1: Add the canonical ladder to the YAGNI section**

Replace the existing short rules with this ordered decision process:

```md
1. 現在の要件として本当に必要か。
2. 既存コードまたは確立済みのローカルパターンを再利用できるか。
3. 標準ライブラリまたはプラットフォームのネイティブ機能で満たせるか。
4. 既に導入済みの依存で満たせるか。
5. いずれも満たせない場合だけ、検証可能な要件を満たす最小実装を追加する。
```

Immediately below it, state that the ladder cannot omit trust-boundary validation, data-loss prevention, security, accessibility, explicitly requested tests/docs, quality gates, or approval requirements.

- [ ] **Step 2: Verify the bootstrap distribution path**

Verify that `scripts/bootstrap-project.sh` copies `docs/framework/software-engineering-practices.md` from the root canonical document into generated projects. Do not create a duplicate under `templates/project/docs/framework/`.

- [ ] **Step 3: Run documentation validation**

Run:

```bash
bash scripts/check-doc-links.sh
rg -n 'software-engineering-practices.md' scripts/bootstrap-project.sh
```

Expected: no broken links or orphaned files; the bootstrap script distributes the root canonical practice document.

- [ ] **Step 4: Commit the shared rule**

```bash
git add docs/framework/software-engineering-practices.md docs/superpowers/plans/2026-08-12-ponytail-limited-integration.md
git commit -m "docs: add safe minimal implementation ladder"
```

### Task 3: Objective reviewへの最小性チェック統合

**Files:**

- Modify: `scripts/complete-task.sh`
- Modify: `scripts/test-complete-task.sh`
- Test: `scripts/test-complete-task.sh`

**Interfaces:**

- Consumes: staged changed-file list and staged diff already captured by `complete-task.sh`.
- Produces: generated objective review with a `## Scope Discipline` section that requires reviewer judgment without auto-failing valid changes.

- [ ] **Step 1: Add a failing assertion to the completion-script test**

Extend `scripts/test-complete-task.sh` to require the generated review template to include these exact reviewer prompts:

```text
## Scope Discipline
- 最小差分: 要件を満たさない新規依存、抽象化、設定、範囲外変更がないか確認する。
- 選択理由: 新規依存または抽象化がある場合、既存実装・標準機能・既存依存で満たせない理由が記録されているか確認する。
- 安全境界: 検証、データ損失防止、セキュリティ、アクセシビリティ、承認要件を「最小化」の理由で省略していないか確認する。
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `bash scripts/test-complete-task.sh`

Expected: FAIL because `complete-task.sh` does not yet emit `## Scope Discipline`.

- [ ] **Step 3: Add the non-blocking review section**

Insert the exact three prompts after `## Real-use Gate` in the canonical `scripts/complete-task.sh`. Keep `templates/project/scripts/complete-task.sh` as the thin wrapper that delegates to the canonical script copied by `scripts/bootstrap-project.sh`. Do not infer blockers from file names or keyword matches: this is an objective-review prompt for the reviewer, not an automatic prohibition.

- [ ] **Step 4: Run focused checks and synchronize template**

Run:

```bash
bash scripts/test-complete-task.sh
bash -n scripts/complete-task.sh
bash -n templates/project/scripts/complete-task.sh
rg -n 'scripts/agentic/complete-task.sh' templates/project/scripts/complete-task.sh scripts/bootstrap-project.sh
```

Expected: all succeed; the canonical script emits the scope-discipline prompts and the template wrapper delegates to its bootstrapped copy.

- [ ] **Step 5: Commit the objective review change**

```bash
git add scripts/complete-task.sh scripts/test-complete-task.sh docs/superpowers/plans/2026-08-12-ponytail-limited-integration.md
git commit -m "feat: review minimal implementation scope"
```

### Task 4: End-to-end validation and traceability

**Files:**

- Modify: `docs/planning/requirements/2026-08-11-ponytail-limited-integration.md`
- Create: `docs/work-notes/2026-08-12-ponytail-limited-integration.md`

**Interfaces:**

- Consumes: validated output from Tasks 1–3.
- Produces: `status: implemented` requirement metadata and a work note with the active profile, commands, outcomes, and known limitations.

- [ ] **Step 1: Record completion evidence**

Update the requirement status to `implemented`. In the work note, list the active profile (`codex`), the explicit non-adoption of hooks/MCP, and every command run with its result.

- [ ] **Step 2: Run the repository validation suite**

Run:

```bash
./scripts/test-check-agent-tools.sh
bash scripts/test-select-ai-profile.sh
bash scripts/test-complete-task.sh
bash scripts/check-doc-links.sh
git diff --check
git status --short
```

Expected: all validation commands exit 0; only intended profile, script, documentation, template, and work-note changes remain.

- [ ] **Step 3: Run a final objective scope review**

Confirm the final diff contains no Ponytail package, Node.js hook, MCP configuration, dependency lockfile, or external service change. Confirm the active profile is `codex` and root/template synchronized files are byte-identical where specified.

- [ ] **Step 4: Commit traceability artifacts**

```bash
git add docs/planning/requirements/2026-08-11-ponytail-limited-integration.md docs/work-notes/2026-08-12-ponytail-limited-integration.md
git commit -m "docs: record Ponytail limited integration"
```

## Plan Self-Review

- Spec coverage: Tasks 1–3 cover every How item and all acceptance criteria; Task 4 records verifiable completion evidence.
- Scope: no plugin, hook, MCP, dependency, or external-state work is included.
- Consistency: `AGENTS.md` is shared in every task; only Claude and Copilot use host-specific files, so profiles with no such file intentionally use `PROFILE_FILES=""`.
