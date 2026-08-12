import test from "node:test";
import assert from "node:assert/strict";

import { assertValidWorkUnit, validateWorkUnit } from "./metrics/schema.mjs";

function validWorkUnit() {
  return {
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
    recorded_at: "2026-08-12T12:00:00+09:00",
  };
}

test("accepts the strict privacy-safe record", () => {
  const value = validWorkUnit();
  assert.deepEqual(validateWorkUnit(value), []);
  assert.equal(assertValidWorkUnit(value), value);
});

test("rejects unknown and free-text fields", () => {
  const value = { ...validWorkUnit(), prompt: "do not store this" };
  assert.equal(
    validateWorkUnit(value).some((error) => error.code === "unknown_field"),
    true,
  );
});

test("rejects traversal and absolute artifact paths", () => {
  for (const value of ["../secret.txt", "/tmp/secret.txt", "C:\\secret.txt"]) {
    const record = validWorkUnit();
    record.artifact_refs = [{ type: "path", value }];
    assert.equal(
      validateWorkUnit(record).some((error) => error.field === "artifact_refs"),
      true,
      value,
    );
  }
});

test("accepts issue and pull request artifact references", () => {
  const value = validWorkUnit();
  value.artifact_refs = [
    { type: "issue", number: 34 },
    { type: "pr", number: 60 },
  ];
  assert.deepEqual(validateWorkUnit(value), []);
});

test("requires known token totals to add up", () => {
  const value = validWorkUnit();
  value.tokens = { input: 10, output: 5, total: 20 };
  value.token_source = "manual";
  assert.equal(
    validateWorkUnit(value).some((error) => error.code === "token_total_mismatch"),
    true,
  );
});

test("requires unavailable token source for entirely missing token counts", () => {
  const value = validWorkUnit();
  value.token_source = "manual";
  assert.equal(
    validateWorkUnit(value).some((error) => error.code === "token_source_mismatch"),
    true,
  );
});

test("rejects malformed identifiers, enums, timestamps, and negative counts", () => {
  const mutations = [
    ["work_unit_id", "not-a-uuid"],
    ["project_id", "Person Name"],
    ["kind", "coding"],
    ["recorded_at", "2026-08-12T12:00:00"],
    ["retry_count", -1],
  ];
  for (const [field, replacement] of mutations) {
    const value = validWorkUnit();
    value[field] = replacement;
    assert.notDeepEqual(validateWorkUnit(value), [], field);
  }
});

test("rejects unknown nested fields", () => {
  const value = validWorkUnit();
  value.tokens.currency = "JPY";
  value.links.url = "https://example.test/private";
  value.artifact_refs = [{ type: "issue", number: 34, title: "private title" }];
  const errors = validateWorkUnit(value);
  assert.equal(errors.filter((error) => error.code === "unknown_field").length, 3);
});
