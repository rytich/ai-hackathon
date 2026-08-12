import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  initMetricsStore,
  recordWorkUnit,
  resolveMetricsDir,
  validateMetricsStore,
} from "./metrics/storage.mjs";

async function temporaryDirectory(prefix = "af-metrics-storage-") {
  return mkdtemp(path.join(tmpdir(), prefix));
}

async function makeGitRepo() {
  const cwd = await temporaryDirectory();
  execFileSync("git", ["init", "--quiet", cwd]);
  return cwd;
}

function validWorkUnit(overrides = {}) {
  return {
    schema_version: 1,
    work_unit_id: "11111111-1111-4111-8111-111111111111",
    project_id: "sample-project",
    kind: "implementation",
    purpose: "feature",
    consumption_reason: "primary",
    profile: "codex",
    model: "unknown",
    tokens: { input: 10, output: 5, total: 15 },
    token_source: "manual",
    elapsed_ms: 120000,
    outcome: "completed",
    retry_count: 0,
    review_findings_count: 1,
    rework_count: 0,
    quality_gate: "pass",
    links: { issue_number: 34, release: "v0.2.4" },
    artifact_refs: [{ type: "issue", number: 34 }],
    collector_id: "workstation-a",
    recorded_at: "2026-08-12T12:00:00+09:00",
    ...overrides,
  };
}

test("resolves the metrics directory in explicit precedence order", () => {
  const cwd = path.join(path.sep, "project");
  assert.equal(resolveMetricsDir({ cwd, argvDir: "cli", env: { AF_METRICS_DIR: "env" }, localConfig: { metrics_dir: "config" } }), path.join(cwd, "cli"));
  assert.equal(resolveMetricsDir({ cwd, env: { AF_METRICS_DIR: "env" }, localConfig: { metrics_dir: "config" } }), path.join(cwd, "env"));
  assert.equal(resolveMetricsDir({ cwd, env: {}, localConfig: { metrics_dir: "config" } }), path.join(cwd, "config"));
  assert.equal(resolveMetricsDir({ cwd, env: {}, localConfig: null }), path.join(cwd, ".af-metrics"));
});

test("project-tracked is the default in an existing repository and requires acknowledgement", async () => {
  const cwd = await makeGitRepo();
  await assert.rejects(
    initMetricsStore({ cwd, projectId: "sample-project", mode: undefined, acknowledgeRisk: false, remoteVisibility: "unknown" }),
    /acknowledge-repository-metrics-risk/,
  );

  const result = await initMetricsStore({ cwd, projectId: "sample-project", mode: undefined, acknowledgeRisk: true, remoteVisibility: "private" });
  assert.equal(result.mode, "project-tracked");
  assert.equal(result.metrics_dir, path.join(cwd, ".af-metrics"));
  const config = JSON.parse(await readFile(path.join(result.metrics_dir, "config.json"), "utf8"));
  assert.deepEqual(config, { schema_version: 1, project_id: "sample-project", mode: "project-tracked", remote_visibility: "private" });
});

test("local-only adds only a local Git exclude", async () => {
  const cwd = await makeGitRepo();
  const result = await initMetricsStore({ cwd, projectId: "sample-project", mode: "local-only", acknowledgeRisk: false, remoteVisibility: "unknown" });
  const exclude = await readFile(path.join(cwd, ".git", "info", "exclude"), "utf8");
  assert.match(exclude, /^\.af-metrics\/$/m);
  assert.equal(result.mode, "local-only");
});

test("initializes a dedicated local Git repository when no repository exists", async () => {
  const cwd = await temporaryDirectory();
  const metricsDir = path.join(cwd, "shared-metrics");
  const result = await initMetricsStore({ cwd, metricsDir, projectId: "sample-project", mode: undefined, acknowledgeRisk: false, remoteVisibility: "private" });
  assert.equal(result.mode, "dedicated");
  assert.equal(execFileSync("git", ["-C", metricsDir, "rev-parse", "--is-inside-work-tree"], { encoding: "utf8" }).trim(), "true");
});

test("does not overwrite an existing config", async () => {
  const cwd = await makeGitRepo();
  await initMetricsStore({ cwd, projectId: "sample-project", mode: "project-tracked", acknowledgeRisk: true, remoteVisibility: "private" });
  await assert.rejects(
    initMetricsStore({ cwd, projectId: "changed-project", mode: "project-tracked", acknowledgeRisk: true, remoteVisibility: "public" }),
    /already exists/,
  );
  const config = JSON.parse(await readFile(path.join(cwd, ".af-metrics", "config.json"), "utf8"));
  assert.equal(config.project_id, "sample-project");
});

test("records one validated work unit without overwriting its ID", async () => {
  const cwd = await makeGitRepo();
  const { metrics_dir: metricsDir } = await initMetricsStore({ cwd, projectId: "sample-project", mode: "project-tracked", acknowledgeRisk: true, remoteVisibility: "private" });
  const destination = await recordWorkUnit({ metricsDir, value: validWorkUnit() });
  assert.equal(path.relative(metricsDir, destination), path.join("projects", "sample-project", "work-units", "2026-08", "11111111-1111-4111-8111-111111111111.json"));
  assert.equal(JSON.parse(await readFile(destination, "utf8")).tokens.total, 15);
  await assert.rejects(recordWorkUnit({ metricsDir, value: validWorkUnit() }), /already exists/);
  const names = await readdir(path.dirname(destination));
  assert.deepEqual(names, ["11111111-1111-4111-8111-111111111111.json"]);
});

test("rejects a project mismatch before writing", async () => {
  const cwd = await makeGitRepo();
  const { metrics_dir: metricsDir } = await initMetricsStore({ cwd, projectId: "sample-project", mode: "project-tracked", acknowledgeRisk: true, remoteVisibility: "private" });
  await assert.rejects(recordWorkUnit({ metricsDir, value: validWorkUnit({ project_id: "other-project" }) }), /project_id/);
});

test("reports every corrupt or invalid record", async () => {
  const cwd = await makeGitRepo();
  const { metrics_dir: metricsDir } = await initMetricsStore({ cwd, projectId: "sample-project", mode: "project-tracked", acknowledgeRisk: true, remoteVisibility: "private" });
  const directory = path.join(metricsDir, "projects", "sample-project", "work-units", "2026-08");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "broken.json"), "{not-json\n");
  const invalid = validWorkUnit({ work_unit_id: "22222222-2222-4222-8222-222222222222", kind: "coding" });
  await writeFile(path.join(directory, `${invalid.work_unit_id}.json`), JSON.stringify(invalid));

  const result = await validateMetricsStore({ metricsDir, projectId: "sample-project" });
  assert.equal(result.records, 0);
  assert.equal(result.errors.length, 2);
  assert.equal(result.errors.some((error) => error.code === "invalid_json"), true);
  assert.equal(result.errors.some((error) => error.code === "invalid_work_unit"), true);
});
