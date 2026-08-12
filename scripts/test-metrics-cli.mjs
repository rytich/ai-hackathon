import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { main } from "./metrics.mjs";

const GENERATED_AT = "2026-08-12T00:00:00Z";

function capture() {
  let value = "";
  return {
    write(chunk) { value += String(chunk); },
    text() { return value; },
  };
}

async function makeDirectory(prefix = "af-metrics-cli-") {
  return mkdtemp(path.join(tmpdir(), prefix));
}

async function cliContext({ git = true, cwd } = {}) {
  const directory = cwd || await makeDirectory();
  if (git) execFileSync("git", ["init", "--quiet", directory]);
  return {
    cwd: directory,
    env: {},
    stdinText: "",
    stdout: capture(),
    stderr: capture(),
    now: () => GENERATED_AT,
  };
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
    links: { issue_number: 34, pr_number: 60, release: "v0.2.4" },
    artifact_refs: [{ type: "issue", number: 34 }],
    collector_id: "workstation-a",
    recorded_at: "2026-08-12T12:00:00+09:00",
    ...overrides,
  };
}

test("init defaults to tracked mode and requires the risk acknowledgement", async () => {
  const context = await cliContext();
  const code = await main(["init", "--project-id", "sample-project"], context);
  assert.equal(code, 1);
  assert.match(context.stderr.text(), /acknowledge-repository-metrics-risk/);
});

test("init accepts the explicit project repository risk", async () => {
  const context = await cliContext();
  const code = await main([
    "init",
    "--project-id", "sample-project",
    "--remote-visibility", "private",
    "--acknowledge-repository-metrics-risk",
  ], context);
  assert.equal(code, 0);
  const config = JSON.parse(await readFile(path.join(context.cwd, ".af-metrics", "config.json"), "utf8"));
  assert.equal(config.mode, "project-tracked");
});

test("doctor warnings are non-blocking", async () => {
  const setup = await cliContext();
  assert.equal(await main([
    "init",
    "--project-id", "sample-project",
    "--remote-visibility", "unknown",
    "--acknowledge-repository-metrics-risk",
  ], setup), 0);
  const context = await cliContext({ cwd: setup.cwd, git: false });
  const code = await main(["doctor"], context);
  assert.equal(code, 0);
  assert.match(context.stdout.text(), /WARNING/);
  assert.match(context.stdout.text(), /activity timing, profile, model, and artifact references/);
});

test("usage errors return 2", async () => {
  const context = await cliContext();
  assert.equal(await main(["unsupported"], context), 2);
  assert.match(context.stderr.text(), /Usage:/);
});

test("record accepts files and stdin, then validate and report succeed", async () => {
  const context = await cliContext();
  assert.equal(await main([
    "init",
    "--project-id", "sample-project",
    "--remote-visibility", "private",
    "--acknowledge-repository-metrics-risk",
  ], context), 0);

  const input = path.join(context.cwd, "work-unit.json");
  await writeFile(input, `${JSON.stringify(validWorkUnit())}\n`);
  assert.equal(await main(["record", "--input", input], context), 0);

  context.stdinText = JSON.stringify(validWorkUnit({
    work_unit_id: "22222222-2222-4222-8222-222222222222",
    recorded_at: "2026-08-12T13:00:00+09:00",
  }));
  assert.equal(await main(["record", "--input", "-"], context), 0);
  assert.equal(await main(["validate"], context), 0);
  assert.match(context.stdout.text(), /"records": 2/);

  assert.equal(await main(["report", "--generated-at", GENERATED_AT], context), 0);
  const report = JSON.parse(await readFile(path.join(
    context.cwd,
    ".af-metrics",
    "reports",
    "sample-project",
    "metrics-report.json",
  ), "utf8"));
  assert.equal(report.generated_at, GENERATED_AT);
  assert.equal(report.totals.work_units, 2);
});

test("dedicated doctor recommends private remote setup without creating one", async () => {
  const context = await cliContext({ git: false });
  const metricsDir = path.join(context.cwd, "metrics-repository");
  assert.equal(await main([
    "init",
    "--project-id", "sample-project",
    "--metrics-dir", metricsDir,
    "--remote-visibility", "private",
  ], context), 0);
  const doctor = await cliContext({ cwd: context.cwd, git: false });
  assert.equal(await main(["doctor", "--metrics-dir", metricsDir], doctor), 0);
  assert.match(doctor.stdout.text(), /gh repo create .* --private/);
  assert.match(doctor.stdout.text(), /git -C .* remote add origin/);
  assert.throws(() => execFileSync("git", ["-C", metricsDir, "remote", "get-url", "origin"], { stdio: "ignore" }));
});
