# v0.2.4 Effect Metrics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** privacy-safe な work unit を記録・検証・集計し、AF 本体と利用者データを分離したまま Git 同期と AF-only update scope check を提供する。

**Architecture:** Node.js 標準 module だけで、strict schema、storage、report、Git diagnosis を小さな module に分ける。公開 CLI はそれらを compose し、bootstrap は同じ canonical runtime を導入先の `scripts/agentic/` へ配布する。実測値は AF 本体に含めず、installation manifest と staged scope check が AF 管理 file 以外の混入を fail-closed で拒否する。

**Tech Stack:** Node.js ESM、`node:test`、Node.js 標準 module（`fs`, `path`, `crypto`, `child_process`）、Git、既存 Bash bootstrap / completion pipeline。

## Global Constraints

- 外部 package を追加しない。`package.json` と lockfile を新設しない。
- 公開 command は `init`, `record`, `validate`, `report`, `doctor` の 5 つだけにする。
- 既存 Git repository では `project-tracked` を既定にするが、`--acknowledge-repository-metrics-risk` がない初期化は exit 1 にする。
- prompt、response、source code、diff、log 本文、secret、credential、個人情報、production data を schema に含めない。
- token 取得不能は `null` であり、0 に変換しない。
- 1 work unit = 1 JSON file とし、既存 ID を上書きしない。
- AF は repository remote の作成、commit、push を実行しない。Git repository がない metrics root での local `git init` だけを許可する。
- AF 開発の実測値は AF 本体とは別の private 計測 repository に置き、一般利用者へ access させない。
- metrics 未記録、remote 未設定、remote visibility 不明は warning に留め、completion pipeline を block しない。
- AF update scope check は local quality gate であり、remote 強制は v0.2.5 の対象とする。
- root canonical runtime と bootstrap で配布する runtime の内容を重複実装しない。

---

## File Structure

### Metrics runtime

- `scripts/metrics.mjs`: CLI parser と command dispatch。導入先へ `scripts/agentic/metrics.mjs` として copy する canonical entrypoint。
- `scripts/metrics/schema.mjs`: enum、strict field validation、privacy-safe reference validation。
- `scripts/metrics/storage.mjs`: 保存先解決、config、`init`, atomic `record`, 全 record load。
- `scripts/metrics/report.mjs`: coverage、集計、比較可能性、Markdown / JSON / JSONL 出力。
- `scripts/metrics/git.mjs`: Git root、tracking、staging、remote、visibility warning の診断。
- `schemas/metrics/work-unit.schema.json`: machine-readable schema contract。
- `schemas/metrics/work-unit.example.json`: secret を含まない入力例。
- `scripts/fixtures/metrics/representative/`: report test 用の合成 work unit。

### AF installation boundary

- `scripts/af-installation.mjs`: ownership classification、SHA-256、installation manifest 生成、staged scope validation。
- `scripts/create-installation-manifest.mjs`: bootstrap から呼ぶ manifest 生成 CLI。
- `scripts/check-af-update-scope.mjs`: root canonical scope-check CLI。導入先へ `scripts/agentic/check-af-update-scope.mjs` として copy する。
- `templates/project/scripts/metrics.mjs`: `scripts/agentic/metrics.mjs` を呼ぶ thin wrapper。
- `templates/project/scripts/check-af-update-scope.mjs`: canonical scope checker を呼ぶ thin wrapper。

### Tests and docs

- `scripts/test-metrics-schema.mjs`: schema と privacy boundary。
- `scripts/test-metrics-storage.mjs`: init / record / validate と保存 mode。
- `scripts/test-metrics-report.mjs`: representative aggregate と欠測判定。
- `scripts/test-metrics-cli.mjs`: CLI command、exit code、warning。
- `scripts/test-af-installation.mjs`: manifest checksum と staged scope check。
- `scripts/test-bootstrap-project.sh`: runtime 配布、manifest 生成、既存 file 保持。
- `docs/framework/effect-metrics.md`: 利用者向け運用、privacy、Git access boundary。
- `docs/work-notes/2026-08-12-v024-effect-metrics.md`: 実装と検証の記録。

---

### Task 1: Strict work unit schema and validator

**Files:**
- Create: `schemas/metrics/work-unit.schema.json`
- Create: `schemas/metrics/work-unit.example.json`
- Create: `scripts/metrics/schema.mjs`
- Create: `scripts/test-metrics-schema.mjs`

**Interfaces:**
- Produces: `WORK_UNIT_SCHEMA_VERSION = 1`
- Produces: `validateWorkUnit(value: unknown): Array<{ field: string, code: string, message: string }>`
- Produces: `assertValidWorkUnit(value: unknown): object`, throwing `MetricsValidationError`
- Produces: `isSafeArtifactRef(value: unknown): boolean`

- [ ] **Step 1: Write failing schema tests**

Create `scripts/test-metrics-schema.mjs` with a complete valid record factory and focused rejection cases:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { validateWorkUnit } from "./metrics/schema.mjs";

const valid = () => ({
  schema_version: 1,
  work_unit_id: "11111111-1111-4111-8111-111111111111",
  project_id: "sample-project",
  kind: "implementation",
  purpose: "feature",
  consumption_reason: "primary",
  profile: "codex",
  model: "unknown",
  tokens: { input: null, output: null, total: null },
  token_source: "unavailable",
  elapsed_ms: 120000,
  outcome: "completed",
  retry_count: 0,
  review_findings_count: 1,
  rework_count: 0,
  quality_gate: "pass",
  links: { issue_number: 34, release: "v0.2.4" },
  artifact_refs: [{ type: "path", value: "docs/framework/effect-metrics.md" }],
  collector_id: "workstation-a",
  recorded_at: "2026-08-12T12:00:00+09:00"
});

test("accepts the strict privacy-safe record", () => {
  assert.deepEqual(validateWorkUnit(valid()), []);
});

test("rejects unknown and free-text fields", () => {
  const value = { ...valid(), prompt: "do not store this" };
  assert.equal(validateWorkUnit(value).some(error => error.code === "unknown_field"), true);
});

test("rejects traversal and absolute artifact paths", () => {
  for (const value of ["../secret.txt", "/tmp/secret.txt", "C:\\secret.txt"]) {
    const record = valid();
    record.artifact_refs = [{ type: "path", value }];
    assert.equal(validateWorkUnit(record).some(error => error.field === "artifact_refs"), true);
  }
});

test("requires known token totals to add up", () => {
  const value = valid();
  value.tokens = { input: 10, output: 5, total: 20 };
  value.token_source = "manual";
  assert.equal(validateWorkUnit(value).some(error => error.code === "token_total_mismatch"), true);
});
```

- [ ] **Step 2: Run the schema test and verify RED**

Run: `node --test scripts/test-metrics-schema.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/metrics/schema.mjs`.

- [ ] **Step 3: Implement schema constants and strict validation**

Create `scripts/metrics/schema.mjs` with fixed enum sets and a non-mutating validator:

```js
export const WORK_UNIT_SCHEMA_VERSION = 1;
export const KINDS = new Set(["research", "specification", "implementation", "test", "review", "coordination"]);
export const PURPOSES = new Set(["feature", "bugfix", "maintenance", "documentation", "release", "adoption", "other"]);
export const CONSUMPTION_REASONS = new Set(["primary", "retry", "review_fix", "tool_failure", "scope_change"]);
export const OUTCOMES = new Set(["completed", "partial", "failed", "cancelled"]);
export const QUALITY_GATES = new Set(["pass", "fail", "unknown", "not_applicable"]);
export const TOKEN_SOURCES = new Set(["manual", "agent_reported", "unavailable"]);

export class MetricsValidationError extends Error {
  constructor(errors) {
    super(`Invalid work unit: ${errors.length} error(s)`);
    this.name = "MetricsValidationError";
    this.errors = errors;
  }
}

export function assertValidWorkUnit(value) {
  const errors = validateWorkUnit(value);
  if (errors.length > 0) throw new MetricsValidationError(errors);
  return value;
}
```

Use `additionalProperties: false` semantics at the root and nested `tokens`, `links`, and `artifact_refs` levels. Slugs must match `^[a-z0-9][a-z0-9._-]{0,63}$`; UUIDs must be canonical; counts must be non-negative integers; `recorded_at` must include `Z` or an explicit offset. Artifact refs must be one of `{ type: "path", value: <relative-path> }`, `{ type: "issue", number: <positive-integer> }`, or `{ type: "pr", number: <positive-integer> }`.

Create `schemas/metrics/work-unit.schema.json` with the same enums, required fields, patterns, and `additionalProperties: false`. Create `schemas/metrics/work-unit.example.json` using the `valid()` record above.

- [ ] **Step 4: Run schema tests and syntax checks**

Run: `node --test scripts/test-metrics-schema.mjs && node --check scripts/metrics/schema.mjs && node -e "JSON.parse(require('fs').readFileSync('schemas/metrics/work-unit.schema.json'))"`

Expected: all commands exit 0; test summary reports 4 passing tests and 0 failures.

- [ ] **Step 5: Commit the schema unit**

```bash
git add schemas/metrics scripts/metrics/schema.mjs scripts/test-metrics-schema.mjs
git commit -m "feat: define privacy-safe work unit schema"
```

---

### Task 2: Storage modes, initialization, recording, and validation

**Files:**
- Create: `scripts/metrics/storage.mjs`
- Create: `scripts/test-metrics-storage.mjs`
- Modify: `.gitignore`
- Modify: `templates/project/.gitignore`

**Interfaces:**
- Consumes: `assertValidWorkUnit()` from Task 1
- Produces: `resolveMetricsDir({ cwd, argvDir, env, localConfig }): string`
- Produces: `initMetricsStore({ cwd, metricsDir, projectId, mode, acknowledgeRisk, remoteVisibility }): Promise<object>`
- Produces: `recordWorkUnit({ metricsDir, value }): Promise<string>` returning the created path
- Produces: `loadWorkUnits({ metricsDir, projectId }): Promise<{ records: object[], errors: object[] }>`
- Produces: `validateMetricsStore(options): Promise<{ records: number, errors: object[] }>`

- [ ] **Step 1: Write failing storage tests**

Create temporary Git repositories with `mkdtemp()` and test the three modes:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { initMetricsStore, recordWorkUnit, validateMetricsStore } from "./metrics/storage.mjs";

test("project-tracked is the default in an existing repository and requires acknowledgement", async () => {
  const cwd = await makeGitRepo();
  await assert.rejects(
    initMetricsStore({ cwd, projectId: "sample-project", mode: undefined, acknowledgeRisk: false, remoteVisibility: "unknown" }),
    /acknowledge-repository-metrics-risk/
  );
});

test("local-only adds only a local exclude", async () => {
  const cwd = await makeGitRepo();
  const result = await initMetricsStore({ cwd, projectId: "sample-project", mode: "local-only", acknowledgeRisk: false, remoteVisibility: "unknown" });
  const exclude = await readFile(path.join(cwd, ".git", "info", "exclude"), "utf8");
  assert.match(exclude, /^\.af-metrics\/$/m);
  assert.equal(result.mode, "local-only");
});
```

Add cases for a non-Git directory causing `git init` in the selected metrics root, config non-overwrite, duplicate work unit rejection, atomic file cleanup, and `validateMetricsStore()` reporting every corrupt JSON file without generating a partial success.

- [ ] **Step 2: Run storage tests and verify RED**

Run: `node --test scripts/test-metrics-storage.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/metrics/storage.mjs`.

- [ ] **Step 3: Implement storage resolution and initialization**

Implement the resolution order exactly:

```js
export function resolveMetricsDir({ cwd, argvDir, env, localConfig }) {
  if (argvDir) return path.resolve(cwd, argvDir);
  if (env.AF_METRICS_DIR) return path.resolve(cwd, env.AF_METRICS_DIR);
  if (localConfig?.metrics_dir) return path.resolve(cwd, localConfig.metrics_dir);
  return path.join(cwd, ".af-metrics");
}
```

In an existing repository, use `project-tracked` when `mode` is omitted. Reject that mode unless `acknowledgeRisk === true`. For `local-only`, append exactly `.af-metrics/` to `.git/info/exclude` only when it is absent. Outside a Git repository, create the metrics root and run `git init --quiet <metrics-root>`; record mode `dedicated` and never configure a remote.

Write `config.json` with `flag: "wx"` so re-running `init` cannot overwrite it. Store only `schema_version`, `project_id`, `mode`, and `remote_visibility`.

- [ ] **Step 4: Implement exclusive record creation and full validation**

Write validated JSON to a same-directory temporary file, `fsync` it, then use an exclusive hard link to publish it:

```js
const destination = path.join(metricsDir, "projects", value.project_id, "work-units", month, `${value.work_unit_id}.json`);
const temporary = path.join(path.dirname(destination), `.${value.work_unit_id}.${process.pid}.tmp`);
await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx", mode: 0o600 });
try {
  await link(temporary, destination);
} catch (error) {
  if (error.code === "EEXIST") throw new Error(`work unit already exists: ${value.work_unit_id}`);
  throw error;
} finally {
  await rm(temporary, { force: true });
}
```

`loadWorkUnits()` must sort paths before parsing so validation and reports are deterministic. Return every parse/schema error with repository-relative file path and work unit ID when available; never print record content.

- [ ] **Step 5: Add local configuration ignore rules**

Add to root `.gitignore`:

```gitignore
# AF effect metrics are stored in a separate private repository for AF development.
.af-metrics/
.af-metrics.local.json
```

Add only `.af-metrics.local.json` to `templates/project/.gitignore`. Do not ignore `.af-metrics/` in the project template because project-tracked is the approved default.

- [ ] **Step 6: Run storage and schema tests**

Run: `node --test scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs`

Expected: all storage modes, duplicate protection, and corrupt-store cases pass with 0 failures.

- [ ] **Step 7: Commit the storage unit**

```bash
git add .gitignore templates/project/.gitignore scripts/metrics/storage.mjs scripts/test-metrics-storage.mjs
git commit -m "feat: store work units across explicit git modes"
```

---

### Task 3: Deterministic reports and missing-data semantics

**Files:**
- Create: `scripts/metrics/report.mjs`
- Create: `scripts/test-metrics-report.mjs`
- Create: `scripts/fixtures/metrics/representative/projects/sample-project/work-units/2026-08/11111111-1111-4111-8111-111111111111.json`
- Create: `scripts/fixtures/metrics/representative/projects/sample-project/work-units/2026-08/22222222-2222-4222-8222-222222222222.json`
- Create: `scripts/fixtures/metrics/representative/projects/sample-project/work-units/2026-08/33333333-3333-4333-8333-333333333333.json`
- Create: `scripts/fixtures/metrics/representative/projects/second-project/work-units/2026-08/44444444-4444-4444-8444-444444444444.json`

**Interfaces:**
- Consumes: validated records from `loadWorkUnits()`
- Produces: `buildMetricsReport(records: object[], options: { generatedAt: string }): object`
- Produces: `renderMetricsMarkdown(report: object): string`
- Produces: `writeMetricsReport({ metricsDir, projectId, report, formats }): Promise<string[]>`
- Produces report keys: `coverage`, `totals`, `groups.work_unit`, `groups.issue`, `groups.pr`, `groups.release`, `groups.profile`

- [ ] **Step 1: Add synthetic representative records and failing aggregate tests**

Use only synthetic project IDs, token values, and GitHub numbers. Cover one complete token record, one `null` token record, one failed quality gate with retry/rework, and one record in a second project.

Create tests with fixed time:

```js
test("reports totals and every required grouping deterministically", async () => {
  const records = await loadFixtureRecords();
  const report = buildMetricsReport(records, { generatedAt: "2026-08-12T00:00:00Z" });
  assert.equal(report.totals.work_units, 4);
  assert.equal(report.groups.issue["34"].work_units, 3);
  assert.equal(report.groups.profile.codex.work_units, 2);
  assert.equal(report.coverage.tokens.status, "partial");
});

test("does not calculate a cohort delta when coverage differs", () => {
  const report = buildMetricsReport(recordsWithUnequalCoverage(), { generatedAt: "2026-08-12T00:00:00Z" });
  assert.equal(report.comparisons.profile.status, "not_comparable");
  assert.equal(report.comparisons.profile.delta, null);
});
```

- [ ] **Step 2: Run report tests and verify RED**

Run: `node --test scripts/test-metrics-report.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/metrics/report.mjs`.

- [ ] **Step 3: Implement aggregate and coverage calculations**

For each group, calculate `work_units`, `completed`, `completion_rate`, known token sum, completed-unit token ratio, known elapsed sum, quality gate pass rate, retries, findings, rework, and coverage counts. Use these statuses:

```js
export function coverageStatus(known, total) {
  if (known === 0) return "unavailable";
  if (known < total) return "partial";
  return "complete";
}
```

Sort group keys and work unit IDs. A profile comparison is `comparable` only when all compared groups have `complete` coverage for the metric and each group has at least one completed work unit; otherwise return `{ status: "not_comparable", delta: null, reason: <fixed-enum> }`.

- [ ] **Step 4: Implement Markdown, JSON, and JSONL output**

Markdown must include `Coverage`, `Totals`, `By Issue`, `By PR`, `By Release`, and `By Profile` headings and print `not_comparable` without inventing a numeric delta. JSON output must use two-space indentation and a trailing newline. JSONL export must contain the sorted validated work units and is not a storage input.

- [ ] **Step 5: Run report tests twice and compare output hashes**

Run:

```bash
node --test scripts/test-metrics-report.mjs
node --test scripts/test-metrics-report.mjs
```

Expected: both runs pass; fixture report snapshots or exact strings remain byte-identical.

- [ ] **Step 6: Commit the report unit**

```bash
git add scripts/metrics/report.mjs scripts/test-metrics-report.mjs scripts/fixtures/metrics
git commit -m "feat: aggregate deterministic effect metrics reports"
```

---

### Task 4: Git diagnosis and the five-command CLI

**Files:**
- Create: `scripts/metrics/git.mjs`
- Create: `scripts/metrics.mjs`
- Create: `scripts/test-metrics-cli.mjs`

**Interfaces:**
- Consumes: storage and report interfaces from Tasks 2 and 3
- Produces: `inspectGitState({ cwd, metricsDir, remoteVisibility }): Promise<{ repository: string|null, tracked: boolean, staged: boolean, remote: string|null, visibility: string, warnings: string[] }>`
- Produces: `main(argv: string[], context?: CliContext): Promise<number>`
- `CliContext`: `{ cwd, env, stdinText, stdout, stderr, now }`

- [ ] **Step 1: Write failing command and exit-code tests**

Call `main()` directly with captured output:

```js
test("init defaults to tracked mode and requires the risk acknowledgement", async () => {
  const context = await cliContextInGitRepo();
  const code = await main(["init", "--project-id", "sample-project"], context);
  assert.equal(code, 1);
  assert.match(context.stderr.text(), /acknowledge-repository-metrics-risk/);
});

test("doctor warnings are non-blocking", async () => {
  const context = await initializedContext({ visibility: "unknown" });
  const code = await main(["doctor"], context);
  assert.equal(code, 0);
  assert.match(context.stdout.text(), /WARNING/);
});

test("usage errors return 2", async () => {
  const context = await cliContextInGitRepo();
  assert.equal(await main(["unsupported"], context), 2);
});
```

Add end-to-end cases for `record --input <file>`, `record --input -`, `validate`, and `report --generated-at 2026-08-12T00:00:00Z`.

- [ ] **Step 2: Run CLI tests and verify RED**

Run: `node --test scripts/test-metrics-cli.mjs`

Expected: FAIL because `scripts/metrics.mjs` does not exist.

- [ ] **Step 3: Implement Git inspection without network calls**

Use `git rev-parse --show-toplevel`, `git ls-files --error-unmatch`, `git diff --cached --name-only`, and `git remote get-url origin`. Do not call GitHub or infer public/private from the URL. Use `config.json` visibility (`private`, `public`, `unknown`) as the source of truth; `public` and `unknown` produce warnings.

Always warn in `project-tracked` mode that activity timing, profile, model, and artifact references may expose development behavior. In dedicated mode, warn when no remote exists and print commands for creating a private GitHub repository or configuring any Git remote, without executing those commands.

- [ ] **Step 4: Implement exact CLI options and dispatch**

Support these forms:

```text
node scripts/metrics.mjs init --project-id <slug> [--mode project-tracked|local-only|dedicated] [--metrics-dir <path>] [--remote-visibility private|public|unknown] [--acknowledge-repository-metrics-risk]
node scripts/metrics.mjs record --input <path|-> [--metrics-dir <path>]
node scripts/metrics.mjs validate [--metrics-dir <path>] [--project-id <slug>]
node scripts/metrics.mjs report [--metrics-dir <path>] [--project-id <slug>] [--generated-at <iso8601>]
node scripts/metrics.mjs doctor [--metrics-dir <path>] [--completion-warning]
```

Export `main()` and guard direct execution with `pathToFileURL(process.argv[1]).href`. Map schema / scope failures to 1 and unknown command / missing option / unsupported schema version to 2. Error output may contain field names and relative paths but not record bodies or environment values.

- [ ] **Step 5: Run the complete metrics test set**

Run: `node --test scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs scripts/test-metrics-report.mjs scripts/test-metrics-cli.mjs`

Expected: all tests pass with exit 0 and no external package installation.

- [ ] **Step 6: Commit the CLI unit**

```bash
git add scripts/metrics.mjs scripts/metrics/git.mjs scripts/test-metrics-cli.mjs
git commit -m "feat: add effect metrics command line workflow"
```

---

### Task 5: Installation manifest and fail-closed AF update scope

**Files:**
- Create: `scripts/af-installation.mjs`
- Create: `scripts/create-installation-manifest.mjs`
- Create: `scripts/check-af-update-scope.mjs`
- Create: `scripts/test-af-installation.mjs`

**Interfaces:**
- Produces: `sha256(content: Buffer|string): string`
- Produces: `classifyInstallationPath(path: string): "managed"|"seeded"|"local-data"|null`
- Produces: `createInstallationManifest({ targetRoot, version }): Promise<object>`
- Produces: `checkStagedUpdateScope({ cwd }): Promise<{ ok: boolean, errors: string[], paths: string[] }>`

- [ ] **Step 1: Write failing ownership and staged-scope tests**

Create a temporary repository with an initial installation manifest and committed managed / seeded files. Test these cases:

```js
test("allows a managed-only staged update with a matching candidate manifest", async () => {
  const repo = await installedRepo();
  await stageManagedUpdateAndCandidateManifest(repo);
  assert.deepEqual((await checkStagedUpdateScope({ cwd: repo })).errors, []);
});

test("rejects application, seeded, and metrics paths", async () => {
  for (const file of ["src/app.js", "AGENTS.md", ".af-metrics/projects/p/work-units/x.json"]) {
    const repo = await installedRepo();
    await writeAndStage(repo, file, "changed\n");
    assert.equal((await checkStagedUpdateScope({ cwd: repo })).ok, false);
  }
});

test("rejects a baseline managed file changed without a matching installed checksum", async () => {
  const repo = await repoWithUnauthorizedManagedCommit();
  await stageManagedUpdateAndCandidateManifest(repo);
  assert.match((await checkStagedUpdateScope({ cwd: repo })).errors.join("\n"), /baseline checksum/);
});
```

- [ ] **Step 2: Run installation tests and verify RED**

Run: `node --test scripts/test-af-installation.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/af-installation.mjs`.

- [ ] **Step 3: Implement explicit ownership classification and manifest generation**

Use explicit project-relative prefixes. `managed` includes `scripts/metrics.mjs`, `scripts/check-af-update-scope.mjs`, and `scripts/agentic/`. `seeded` includes `AGENTS.md`, `.ai/`, `.github/`, `docs/`, and project template files. `local-data` includes `.af-metrics/` and `.af-metrics.local.json`. Application source and unknown paths return `null`.

Manifest shape:

```json
{
  "schema_version": 1,
  "af_version": "0.2.4",
  "files": [
    {
      "path": "scripts/agentic/metrics.mjs",
      "ownership": "managed",
      "sha256": "64-lowercase-hex-characters"
    }
  ],
  "local_data": [".af-metrics/", ".af-metrics.local.json"]
}
```

Sort entries by path. Do not include the manifest itself in `files`, avoiding a self-referential checksum. Refuse absolute paths, backslash traversal, duplicate entries, or overwrite of an existing manifest.

- [ ] **Step 4: Implement two-sided staged validation**

For `--staged`, read the baseline manifest and baseline managed bytes from `HEAD`, and the candidate manifest and candidate managed bytes from the Git index:

```js
const baselineManifest = JSON.parse(git(repo, ["show", "HEAD:.agentic-framework/installation.json"]));
const candidateManifest = JSON.parse(git(repo, ["show", ":.agentic-framework/installation.json"]));
const stagedPaths = gitBuffer(repo, ["diff", "--cached", "--name-only", "-z"]).toString("utf8").split("\0").filter(Boolean);
```

Verify baseline checksums against `git show HEAD:<path>`, candidate checksums against `git show :<path>`, and allow only candidate `managed` paths plus `.agentic-framework/installation.json`. Reject missing candidate manifest, untracked categories, seeded / local-data / application paths, deleted managed runtime, and checksum mismatch.

- [ ] **Step 5: Implement the two small CLIs**

`create-installation-manifest.mjs` accepts `--target <path> --version <semver>` and writes only a missing `.agentic-framework/installation.json`. `check-af-update-scope.mjs` accepts only `--staged`, prints all errors, exits 1 on scope failure, and prints the manual-commit reminder on success. Neither CLI stages, commits, or pushes.

- [ ] **Step 6: Run installation tests and syntax checks**

Run: `node --test scripts/test-af-installation.mjs && node --check scripts/af-installation.mjs && node --check scripts/check-af-update-scope.mjs`

Expected: all valid and invalid scope cases pass.

- [ ] **Step 7: Commit the installation boundary**

```bash
git add scripts/af-installation.mjs scripts/create-installation-manifest.mjs scripts/check-af-update-scope.mjs scripts/test-af-installation.mjs
git commit -m "feat: enforce AF-only update scope"
```

---

### Task 6: Bootstrap distribution and project wrappers

**Files:**
- Create: `templates/project/scripts/metrics.mjs`
- Create: `templates/project/scripts/check-af-update-scope.mjs`
- Create: `scripts/test-bootstrap-project.sh`
- Modify: `scripts/bootstrap-project.sh`
- Modify: `scripts/complete-task.sh`
- Modify: `scripts/test-complete-task.sh`

**Interfaces:**
- Consumes: canonical runtime and manifest CLIs from Tasks 4 and 5
- Produces target runtime: `scripts/agentic/metrics.mjs`, `scripts/agentic/metrics/*.mjs`, `scripts/agentic/check-af-update-scope.mjs`, `scripts/agentic/af-installation.mjs`
- Produces target manifest: `.agentic-framework/installation.json`
- Produces non-blocking completion warning through `metrics.mjs doctor --completion-warning`

- [ ] **Step 1: Write the failing bootstrap integration test**

Create `scripts/test-bootstrap-project.sh` that bootstraps a temporary Git project and asserts:

```bash
test -f "$TARGET/scripts/metrics.mjs"
test -f "$TARGET/scripts/agentic/metrics.mjs"
test -f "$TARGET/scripts/agentic/metrics/schema.mjs"
test -f "$TARGET/scripts/check-af-update-scope.mjs"
test -f "$TARGET/.agentic-framework/installation.json"
node "$TARGET/scripts/metrics.mjs" --help >/dev/null
node -e 'const m=require(process.argv[1]); if (!m.files.some(f => f.ownership === "managed")) process.exit(1)' "$TARGET/.agentic-framework/installation.json"
```

Modify `AGENTS.md`, rerun bootstrap, and assert the custom content and original installation manifest hash are unchanged.

- [ ] **Step 2: Run the bootstrap test and verify RED**

Run: `bash scripts/test-bootstrap-project.sh`

Expected: FAIL because metrics wrappers and installation manifest are absent.

- [ ] **Step 3: Add thin Node wrappers**

Each template wrapper imports the installed canonical module and forwards arguments without implementing business logic:

```js
#!/usr/bin/env node
import { main } from "./agentic/metrics.mjs";

process.exitCode = await main(process.argv.slice(2));
```

The scope wrapper uses the exported `main` from `./agentic/check-af-update-scope.mjs` in the same form.

- [ ] **Step 4: Extend bootstrap with copy-if-missing canonical runtime distribution**

After template copying, copy canonical files to their target `scripts/agentic/` paths, preserving existing files. Copy `schemas/metrics/work-unit.schema.json` and example to `.agentic-framework/schemas/metrics/`. If `.agentic-framework/installation.json` is absent, invoke:

```bash
node "$ROOT_DIR/scripts/create-installation-manifest.mjs" \
  --target "$TARGET_DIR" \
  --version "$(tr -d '[:space:]' < "$ROOT_DIR/VERSION")"
```

Do not regenerate an existing manifest during bootstrap. The future updater is outside this release.

- [ ] **Step 5: Add a non-blocking completion warning**

Near the objective-review generation in `scripts/complete-task.sh`, add:

```bash
echo "## Effect Metrics"
if [ -f scripts/metrics.mjs ]; then
  node scripts/metrics.mjs doctor --completion-warning || echo "- WARNING: metrics doctor could not complete; task completion continues"
else
  echo "- WARNING: metrics CLI is unavailable; task completion continues"
fi
```

Add static assertions to `scripts/test-complete-task.sh` that `doctor --completion-warning` is called and guarded by `||`. The warning must never change completion exit status.

- [ ] **Step 6: Run bootstrap and completion tests**

Run: `bash scripts/test-bootstrap-project.sh && bash scripts/test-complete-task.sh`

Expected: bootstrap distribution and preservation cases pass; completion regression count increases and all checks pass.

- [ ] **Step 7: Commit distribution integration**

```bash
git add templates/project/scripts/metrics.mjs templates/project/scripts/check-af-update-scope.mjs scripts/bootstrap-project.sh scripts/test-bootstrap-project.sh scripts/complete-task.sh scripts/test-complete-task.sh
git commit -m "feat: distribute metrics and update boundaries"
```

---

### Task 7: User documentation, privacy boundary, and project workflow

**Files:**
- Create: `docs/framework/effect-metrics.md`
- Modify: `docs/framework/README.md`
- Modify: `docs/index.md`
- Modify: `README.md`
- Modify: `docs/framework/project-adoption.md`
- Modify: `docs/framework/project-update.md`
- Modify: `docs/framework/quality-gates.md`
- Modify: `docs/framework/ai-environment-profiles.md`
- Modify: `scripts/bootstrap-project.sh`

**Interfaces:**
- Documents exact CLI forms from Task 4
- Documents exact ownership and scope semantics from Task 5
- Adds `effect-metrics.md` to bootstrap framework-doc distribution

- [ ] **Step 1: Write the operational guide in Japanese**

In `docs/framework/effect-metrics.md`, include these sections with executable examples:

```bash
# Existing project repository: approved default, explicit risk acknowledgement
node scripts/metrics.mjs init \
  --project-id example-project \
  --acknowledge-repository-metrics-risk \
  --remote-visibility private

# Local-only alternative
node scripts/metrics.mjs init --project-id example-project --mode local-only

# Dedicated repository checkout
AF_METRICS_DIR=../example-project-metrics node scripts/metrics.mjs init \
  --project-id example-project \
  --mode dedicated \
  --remote-visibility private
```

State explicitly that AF development metrics use a separate private repository, general users never receive access to it, and each user or organization owns its own storage. Explain that existing project tracking exposes development behavior and that AF never commits or pushes metrics.

- [ ] **Step 2: Document AF-only update operation and limitation**

Add a `project-update.md` section requiring separate AF update commits and:

```bash
git add .agentic-framework scripts/agentic scripts/metrics.mjs scripts/check-af-update-scope.mjs
node scripts/check-af-update-scope.mjs --staged
git commit -m "chore: update agentic framework"
```

Explain that local checks can be bypassed and v0.2.5 adds remote CODEOWNERS / branch-protection guidance. State that seeded project docs, application source, and `.af-metrics/` must not be included.

- [ ] **Step 3: Link the guide from all discovery points**

Add `effect-metrics.md` to `docs/framework/README.md`, `docs/index.md`, and the root README structure. Replace the generic “効果測定を始める” adoption step with the exact init / doctor commands. Add profile/model recording guidance to `ai-environment-profiles.md` and non-blocking measurement checks to `quality-gates.md`.

Add `effect-metrics.md` to the framework doc list in `scripts/bootstrap-project.sh` so generated projects receive the guide.

- [ ] **Step 4: Run documentation and command-reference checks**

Run:

```bash
bash scripts/check-doc-links.sh
rg -n 'effect-metrics|acknowledge-repository-metrics-risk|check-af-update-scope' README.md docs scripts/bootstrap-project.sh
git diff --check
```

Expected: no broken links or orphans; all three concepts appear in user-facing docs; diff hygiene passes.

- [ ] **Step 5: Commit documentation**

```bash
git add README.md docs/framework docs/index.md scripts/bootstrap-project.sh
git commit -m "docs: define effect metrics operating boundaries"
```

---

### Task 8: v0.2.4 release metadata, work note, and full verification

**Files:**
- Modify: `VERSION`
- Modify: `CHANGELOG.md`
- Modify: `docs/planning/requirements/2026-08-12-v024-effect-metrics.md`
- Create: `docs/work-notes/2026-08-12-v024-effect-metrics.md`
- Modify: `scripts/complete-task.sh`

**Interfaces:**
- Completion validation runs every new Node and Bash test
- Release metadata identifies version `0.2.4`

- [ ] **Step 1: Add all new tests to default completion validation**

In `scripts/complete-task.sh`, add `node --check` for every new runtime entrypoint and run:

```bash
node --test \
  scripts/test-metrics-schema.mjs \
  scripts/test-metrics-storage.mjs \
  scripts/test-metrics-report.mjs \
  scripts/test-metrics-cli.mjs \
  scripts/test-af-installation.mjs
bash scripts/test-bootstrap-project.sh
```

Keep existing validations unchanged.

- [ ] **Step 2: Update release metadata**

Set `VERSION` to `0.2.4`. Add a `CHANGELOG.md` heading `## 0.2.4 - 2026-08-12` describing work unit metrics, explicit Git storage warnings, and AF-only update scope. Do not create or move a Git tag in this task.

- [ ] **Step 3: Mark requirements implemented and write the work note**

Change requirement frontmatter to `status: implemented`. In the work note record:

- active AI profile `codex`
- Issue #34
- actual files and commands
- synthetic-only acceptance evidence
- external dependency count `0`
- metrics data not committed to AF
- AF development private metrics repository is not created or pushed automatically
- known limitation that remote enforcement waits for v0.2.5

- [ ] **Step 4: Run the full project verification suite**

Run:

```bash
bash scripts/test-build-public-archive.sh
bash scripts/test-check-agent-tools.sh
bash scripts/test-complete-task.sh
bash scripts/test-select-ai-profile.sh
bash scripts/test-bootstrap-project.sh
node --test scripts/test-configure-cloudflare-pages-domain.mjs
node --test scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs scripts/test-metrics-report.mjs scripts/test-metrics-cli.mjs scripts/test-af-installation.mjs
bash scripts/check-doc-links.sh
bash scripts/check-agent-tools.sh
git diff --check main...HEAD
```

Expected: all test suites exit 0; docs report no broken links or orphans; Codex must tools pass; only documented recommended-tool warnings may remain.

- [ ] **Step 5: Verify no real metrics or dependency surfaces were committed**

Run:

```bash
git ls-files '.af-metrics/**' '.af-metrics.local.json'
git diff --name-only main...HEAD | rg '(^|/)(package-lock.json|npm-shrinkwrap.json|yarn.lock|pnpm-lock.yaml)$' && exit 1 || true
git diff --name-only main...HEAD | rg '^scripts/fixtures/metrics/'
```

Expected: the first command prints nothing; no lockfile is added; only synthetic fixture paths appear under `scripts/fixtures/metrics/`.

- [ ] **Step 6: Commit release completion artifacts**

```bash
git add VERSION CHANGELOG.md docs/planning/requirements/2026-08-12-v024-effect-metrics.md docs/work-notes/2026-08-12-v024-effect-metrics.md scripts/complete-task.sh
git commit -m "release: prepare v0.2.4 effect metrics"
```

---

## Final Acceptance Checklist

- [ ] Issue #34 の全 Done 条件を work note から検証 command へ trace できる。
- [ ] 既存 project tracking が既定だが、risk acknowledgement なしには初期化されない。
- [ ] local-only と dedicated repository が引き続き選べる。
- [ ] AF 開発用 private metrics repository と一般利用者の access boundary が明記される。
- [ ] token 欠測を 0 とせず、coverage と `not_comparable` を表示する。
- [ ] prompt / response / secret / 個人情報を保存する schema field が存在しない。
- [ ] AF update scope が seeded、local-data、application source を fail-closed で拒否する。
- [ ] bootstrap 再実行が既存 project file と installation manifest を上書きしない。
- [ ] commit / push / remote creation は自動実行されない。
- [ ] 外部 dependency が 0 のままである。
