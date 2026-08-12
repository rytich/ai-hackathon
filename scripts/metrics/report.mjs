import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FORMAT_FILES = {
  json: "metrics-report.json",
  jsonl: "metrics-report.jsonl",
  markdown: "metrics-report.md",
};

function sorted(values) {
  return [...values].sort((a, b) => String(a).localeCompare(String(b), "en"));
}

export function coverageStatus(known, total) {
  if (known === 0) return "unavailable";
  if (known < total) return "partial";
  return "complete";
}

function coverage(known, total) {
  return { known, total, status: coverageStatus(known, total) };
}

function aggregate(records) {
  const workUnits = records.length;
  const completedRecords = records.filter((record) => record.outcome === "completed");
  const completed = completedRecords.length;
  const tokenRecords = records.filter((record) => record.tokens.total !== null);
  const completedTokenRecords = completedRecords.filter((record) => record.tokens.total !== null);
  const elapsedRecords = records.filter((record) => record.elapsed_ms !== null);
  const findingRecords = records.filter((record) => record.review_findings_count !== null);
  const gateRecords = records.filter((record) => record.quality_gate === "pass" || record.quality_gate === "fail");
  const passedGates = gateRecords.filter((record) => record.quality_gate === "pass").length;
  const knownTokenSum = tokenRecords.reduce((sum, record) => sum + record.tokens.total, 0);
  const completedTokenSum = completedTokenRecords.reduce((sum, record) => sum + record.tokens.total, 0);

  return {
    work_units: workUnits,
    completed,
    completion_rate: workUnits === 0 ? null : completed / workUnits,
    known_token_sum: knownTokenSum,
    tokens_per_completed_work_unit: completedTokenRecords.length === 0
      ? null
      : completedTokenSum / completedTokenRecords.length,
    completed_unit_token_ratio: completedTokenRecords.length === 0
      ? null
      : completedTokenSum / completedTokenRecords.length,
    known_elapsed_sum: elapsedRecords.reduce((sum, record) => sum + record.elapsed_ms, 0),
    quality_gate_pass_rate: gateRecords.length === 0 ? null : passedGates / gateRecords.length,
    retries: records.reduce((sum, record) => sum + record.retry_count, 0),
    findings: findingRecords.reduce((sum, record) => sum + record.review_findings_count, 0),
    rework: records.reduce((sum, record) => sum + record.rework_count, 0),
    coverage: {
      tokens: coverage(tokenRecords.length, workUnits),
      completed_tokens: coverage(completedTokenRecords.length, completed),
      elapsed: coverage(elapsedRecords.length, workUnits),
      quality_gate: coverage(gateRecords.length, workUnits),
      review_findings: coverage(findingRecords.length, workUnits),
    },
  };
}

function grouped(records, keyForRecord) {
  const buckets = new Map();
  for (const record of records) {
    const key = keyForRecord(record);
    if (key === null || key === undefined) continue;
    const normalized = String(key);
    const bucket = buckets.get(normalized) || [];
    bucket.push(record);
    buckets.set(normalized, bucket);
  }
  return Object.fromEntries(sorted(buckets.keys()).map((key) => [key, aggregate(buckets.get(key))]));
}

function profileComparison(profileGroups) {
  const keys = Object.keys(profileGroups);
  if (keys.length < 2) {
    return { status: "not_comparable", delta: null, reason: "insufficient_groups" };
  }
  if (keys.some((key) => profileGroups[key].completed === 0)) {
    return { status: "not_comparable", delta: null, reason: "no_completed_work_units" };
  }
  if (keys.some((key) => profileGroups[key].coverage.completed_tokens.status !== "complete")) {
    return { status: "not_comparable", delta: null, reason: "incomplete_coverage" };
  }
  const values = Object.fromEntries(keys.map((key) => [key, profileGroups[key].tokens_per_completed_work_unit]));
  const numeric = Object.values(values);
  return {
    status: "comparable",
    delta: Math.max(...numeric) - Math.min(...numeric),
    reason: null,
    metric: "tokens_per_completed_work_unit",
    values,
  };
}

export function buildMetricsReport(records, { generatedAt } = {}) {
  if (typeof generatedAt !== "string" || generatedAt.length === 0) {
    throw new TypeError("generatedAt is required");
  }
  const workUnits = [...records].sort((a, b) => a.work_unit_id.localeCompare(b.work_unit_id, "en"));
  const totals = aggregate(workUnits);
  const profile = grouped(workUnits, (record) => record.profile);
  return {
    schema_version: 1,
    generated_at: generatedAt,
    coverage: totals.coverage,
    totals,
    groups: {
      work_unit: grouped(workUnits, (record) => record.work_unit_id),
      issue: grouped(workUnits, (record) => record.links.issue_number),
      pr: grouped(workUnits, (record) => record.links.pr_number),
      release: grouped(workUnits, (record) => record.links.release),
      profile,
    },
    comparisons: { profile: profileComparison(profile) },
    work_units: workUnits,
  };
}

function display(value) {
  if (value === null) return "unavailable";
  if (typeof value === "number" && !Number.isInteger(value)) return value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return String(value);
}

function groupTable(title, groups) {
  const lines = [
    `## ${title}`,
    "",
    "| Group | Work units | Completed | Completion rate | Known tokens | Coverage |",
    "| --- | ---: | ---: | ---: | ---: | --- |",
  ];
  for (const key of Object.keys(groups)) {
    const value = groups[key];
    lines.push(`| ${key} | ${value.work_units} | ${value.completed} | ${display(value.completion_rate)} | ${value.known_token_sum} | ${value.coverage.tokens.status} |`);
  }
  if (Object.keys(groups).length === 0) lines.push("| unavailable | 0 | 0 | unavailable | 0 | unavailable |");
  return lines;
}

export function renderMetricsMarkdown(report) {
  const coverageLines = Object.entries(report.coverage).map(([key, value]) =>
    `| ${key} | ${value.known} | ${value.total} | ${value.status} |`);
  const comparison = report.comparisons.profile;
  return [
    "# AF Effect Metrics Report",
    "",
    `Generated: ${report.generated_at}`,
    "",
    "## Coverage",
    "",
    "| Field | Known | Total | Status |",
    "| --- | ---: | ---: | --- |",
    ...coverageLines,
    "",
    "## Totals",
    "",
    `- Work units: ${report.totals.work_units}`,
    `- Completed: ${report.totals.completed}`,
    `- Known tokens: ${report.totals.known_token_sum}`,
    `- Tokens per completed work unit: ${display(report.totals.tokens_per_completed_work_unit)}`,
    `- Known elapsed milliseconds: ${report.totals.known_elapsed_sum}`,
    `- Quality gate pass rate: ${display(report.totals.quality_gate_pass_rate)}`,
    `- Retries: ${report.totals.retries}`,
    `- Review findings: ${report.totals.findings}`,
    `- Rework: ${report.totals.rework}`,
    "",
    ...groupTable("By Issue", report.groups.issue),
    "",
    ...groupTable("By PR", report.groups.pr),
    "",
    ...groupTable("By Release", report.groups.release),
    "",
    ...groupTable("By Profile", report.groups.profile),
    "",
    `Profile comparison: ${comparison.status}${comparison.reason ? ` (${comparison.reason})` : ` (delta: ${display(comparison.delta)})`}`,
    "",
  ].join("\n");
}

export async function writeMetricsReport({ metricsDir, projectId, report, formats }) {
  const requested = sorted(new Set(formats || ["markdown", "json"]));
  for (const format of requested) {
    if (!FORMAT_FILES[format]) throw new Error(`unsupported report format: ${format}`);
  }
  const directory = path.join(metricsDir, "reports", projectId);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const paths = [];
  for (const format of requested) {
    const destination = path.join(directory, FORMAT_FILES[format]);
    let content;
    if (format === "markdown") content = renderMetricsMarkdown(report);
    else if (format === "json") content = `${JSON.stringify(report, null, 2)}\n`;
    else content = `${report.work_units.map((record) => JSON.stringify(record)).join("\n")}\n`;
    await writeFile(destination, content, { mode: 0o600 });
    paths.push(destination);
  }
  return paths;
}
