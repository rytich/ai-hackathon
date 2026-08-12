import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadWorkUnits } from "./metrics/storage.mjs";
import {
  buildMetricsReport,
  renderMetricsMarkdown,
  writeMetricsReport,
} from "./metrics/report.mjs";

const FIXTURE_DIR = fileURLToPath(new URL("./fixtures/metrics/representative/", import.meta.url));
const GENERATED_AT = "2026-08-12T00:00:00Z";

async function loadFixtureRecords() {
  const sample = await loadWorkUnits({ metricsDir: FIXTURE_DIR, projectId: "sample-project" });
  const second = await loadWorkUnits({ metricsDir: FIXTURE_DIR, projectId: "second-project" });
  assert.deepEqual([...sample.errors, ...second.errors], []);
  return [...sample.records, ...second.records];
}

test("reports totals and every required grouping deterministically", async () => {
  const records = await loadFixtureRecords();
  const report = buildMetricsReport(records, { generatedAt: GENERATED_AT });

  assert.equal(report.generated_at, GENERATED_AT);
  assert.equal(report.totals.work_units, 4);
  assert.equal(report.totals.completed, 3);
  assert.equal(report.totals.known_token_sum, 65);
  assert.equal(report.totals.known_elapsed_sum, 600000);
  assert.equal(report.totals.retries, 3);
  assert.equal(report.totals.findings, 6);
  assert.equal(report.totals.rework, 3);
  assert.equal(report.groups.issue["34"].work_units, 3);
  assert.equal(report.groups.pr["60"].work_units, 2);
  assert.equal(report.groups.release["v0.2.4"].work_units, 3);
  assert.equal(report.groups.profile.codex.work_units, 2);
  assert.equal(report.coverage.tokens.status, "partial");
  assert.deepEqual(Object.keys(report.groups.work_unit), [
    "11111111-1111-4111-8111-111111111111",
    "22222222-2222-4222-8222-222222222222",
    "33333333-3333-4333-8333-333333333333",
    "44444444-4444-4444-8444-444444444444",
  ]);
  assert.deepEqual(buildMetricsReport([...records].reverse(), { generatedAt: GENERATED_AT }), report);
});

test("does not calculate a cohort delta when coverage differs", async () => {
  const records = await loadFixtureRecords();
  const unequal = records
    .filter((record) => record.profile === "codex" || record.profile === "claude")
    .map((record) => record.profile === "claude" ? { ...record, outcome: "completed" } : record);
  const report = buildMetricsReport(unequal, { generatedAt: GENERATED_AT });

  assert.equal(report.comparisons.profile.status, "not_comparable");
  assert.equal(report.comparisons.profile.delta, null);
  assert.equal(report.comparisons.profile.reason, "incomplete_coverage");
});

test("renders deterministic Markdown and writes JSON and JSONL", async () => {
  const records = await loadFixtureRecords();
  const report = buildMetricsReport(records, { generatedAt: GENERATED_AT });
  const markdown = renderMetricsMarkdown(report);

  for (const heading of ["Coverage", "Totals", "By Issue", "By PR", "By Release", "By Profile"]) {
    assert.match(markdown, new RegExp(`^## ${heading}$`, "m"));
  }
  assert.match(markdown, /not_comparable/);
  assert.equal(renderMetricsMarkdown(report), markdown);

  const metricsDir = await mkdtemp(path.join(tmpdir(), "af-metrics-report-"));
  const paths = await writeMetricsReport({
    metricsDir,
    projectId: "sample-project",
    report,
    formats: ["markdown", "json", "jsonl"],
  });
  assert.deepEqual(paths.map((value) => path.basename(value)), [
    "metrics-report.json",
    "metrics-report.jsonl",
    "metrics-report.md",
  ]);

  const json = await readFile(path.join(metricsDir, "reports", "sample-project", "metrics-report.json"), "utf8");
  assert.equal(json, `${JSON.stringify(report, null, 2)}\n`);
  const jsonl = await readFile(path.join(metricsDir, "reports", "sample-project", "metrics-report.jsonl"), "utf8");
  assert.deepEqual(jsonl.trimEnd().split("\n").map((line) => JSON.parse(line).work_unit_id),
    report.work_units.map((record) => record.work_unit_id));
});
