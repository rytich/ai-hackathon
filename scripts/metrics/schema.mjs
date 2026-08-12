import path from "node:path";

export const WORK_UNIT_SCHEMA_VERSION = 1;
export const KINDS = new Set([
  "research",
  "specification",
  "implementation",
  "test",
  "review",
  "coordination",
]);
export const PURPOSES = new Set([
  "feature",
  "bugfix",
  "maintenance",
  "documentation",
  "release",
  "adoption",
  "other",
]);
export const CONSUMPTION_REASONS = new Set([
  "primary",
  "retry",
  "review_fix",
  "tool_failure",
  "scope_change",
]);
export const OUTCOMES = new Set(["completed", "partial", "failed", "cancelled"]);
export const QUALITY_GATES = new Set(["pass", "fail", "unknown", "not_applicable"]);
export const TOKEN_SOURCES = new Set(["manual", "agent_reported", "unavailable"]);

const ROOT_FIELDS = new Set([
  "schema_version",
  "work_unit_id",
  "project_id",
  "kind",
  "purpose",
  "consumption_reason",
  "profile",
  "model",
  "tokens",
  "token_source",
  "elapsed_ms",
  "outcome",
  "retry_count",
  "review_findings_count",
  "rework_count",
  "quality_gate",
  "links",
  "artifact_refs",
  "collector_id",
  "recorded_at",
]);
const REQUIRED_FIELDS = [...ROOT_FIELDS].filter((field) => field !== "collector_id");
const TOKEN_FIELDS = new Set(["input", "output", "total"]);
const LINK_FIELDS = new Set(["task_id", "issue_number", "pr_number", "release"]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const RELEASE_PATTERN = /^v?\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/;
const ZONED_TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export class MetricsValidationError extends Error {
  constructor(errors) {
    super(`Invalid work unit: ${errors.length} error(s)`);
    this.name = "MetricsValidationError";
    this.errors = errors;
  }
}

function issue(errors, field, code, message) {
  errors.push({ field, code, message });
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function checkUnknownFields(errors, value, allowed, field) {
  if (!isPlainObject(value)) return;
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) issue(errors, field ? `${field}.${key}` : key, "unknown_field", "field is not allowed");
  }
}

function checkEnum(errors, value, allowed, field) {
  if (typeof value !== "string" || !allowed.has(value)) {
    issue(errors, field, "invalid_enum", `expected one of: ${[...allowed].join(", ")}`);
  }
}

function checkSlug(errors, value, field) {
  if (typeof value !== "string" || !SLUG_PATTERN.test(value)) {
    issue(errors, field, "invalid_slug", "expected a lowercase non-personal slug");
  }
}

function checkNonNegativeIntegerOrNull(errors, value, field, allowNull = false) {
  if (allowNull && value === null) return;
  if (!Number.isInteger(value) || value < 0) {
    issue(errors, field, "invalid_count", allowNull ? "expected a non-negative integer or null" : "expected a non-negative integer");
  }
}

export function isSafeArtifactRef(value) {
  if (!isPlainObject(value)) return false;
  if (value.type === "issue" || value.type === "pr") {
    return Object.keys(value).every((key) => key === "type" || key === "number")
      && Number.isInteger(value.number)
      && value.number > 0;
  }
  if (value.type !== "path" || !Object.keys(value).every((key) => key === "type" || key === "value")) return false;
  if (typeof value.value !== "string" || value.value.length === 0) return false;
  if (value.value.includes("\\") || value.value.includes("?") || value.value.includes("#")) return false;
  if (path.posix.isAbsolute(value.value) || /^[A-Za-z]:/.test(value.value)) return false;
  const segments = value.value.split("/");
  return !segments.some((segment) => segment === "" || segment === "." || segment === "..");
}

function validateTokens(errors, tokens, source) {
  if (!isPlainObject(tokens)) {
    issue(errors, "tokens", "invalid_type", "expected an object");
    return;
  }
  checkUnknownFields(errors, tokens, TOKEN_FIELDS, "tokens");
  for (const field of TOKEN_FIELDS) {
    if (!(field in tokens)) issue(errors, `tokens.${field}`, "missing_field", "field is required");
    else checkNonNegativeIntegerOrNull(errors, tokens[field], `tokens.${field}`, true);
  }
  const values = [tokens.input, tokens.output, tokens.total];
  const allMissing = values.every((value) => value === null);
  if (allMissing && source !== "unavailable") {
    issue(errors, "token_source", "token_source_mismatch", "entirely missing tokens require unavailable source");
  }
  if (!allMissing && source === "unavailable") {
    issue(errors, "token_source", "token_source_mismatch", "known tokens require manual or agent_reported source");
  }
  if (Number.isInteger(tokens.input) && Number.isInteger(tokens.output) && Number.isInteger(tokens.total)
      && tokens.input + tokens.output !== tokens.total) {
    issue(errors, "tokens.total", "token_total_mismatch", "total must equal input plus output");
  }
}

function validateLinks(errors, links) {
  if (!isPlainObject(links)) {
    issue(errors, "links", "invalid_type", "expected an object");
    return;
  }
  checkUnknownFields(errors, links, LINK_FIELDS, "links");
  if ("task_id" in links) checkSlug(errors, links.task_id, "links.task_id");
  for (const field of ["issue_number", "pr_number"]) {
    if (field in links && (!Number.isInteger(links[field]) || links[field] <= 0)) {
      issue(errors, `links.${field}`, "invalid_reference", "expected a positive integer");
    }
  }
  if ("release" in links && (typeof links.release !== "string" || !RELEASE_PATTERN.test(links.release))) {
    issue(errors, "links.release", "invalid_reference", "expected a semantic release identifier");
  }
}

export function validateWorkUnit(value) {
  const errors = [];
  if (!isPlainObject(value)) return [{ field: "$", code: "invalid_type", message: "expected an object" }];

  checkUnknownFields(errors, value, ROOT_FIELDS, "");
  for (const field of REQUIRED_FIELDS) {
    if (!(field in value)) issue(errors, field, "missing_field", "field is required");
  }

  if (value.schema_version !== WORK_UNIT_SCHEMA_VERSION) issue(errors, "schema_version", "unsupported_schema", "expected schema version 1");
  if (typeof value.work_unit_id !== "string" || !UUID_PATTERN.test(value.work_unit_id)) issue(errors, "work_unit_id", "invalid_uuid", "expected a canonical UUID");
  checkSlug(errors, value.project_id, "project_id");
  checkEnum(errors, value.kind, KINDS, "kind");
  checkEnum(errors, value.purpose, PURPOSES, "purpose");
  checkEnum(errors, value.consumption_reason, CONSUMPTION_REASONS, "consumption_reason");
  checkSlug(errors, value.profile, "profile");
  checkSlug(errors, value.model, "model");
  checkEnum(errors, value.token_source, TOKEN_SOURCES, "token_source");
  validateTokens(errors, value.tokens, value.token_source);
  checkNonNegativeIntegerOrNull(errors, value.elapsed_ms, "elapsed_ms", true);
  checkEnum(errors, value.outcome, OUTCOMES, "outcome");
  checkNonNegativeIntegerOrNull(errors, value.retry_count, "retry_count");
  checkNonNegativeIntegerOrNull(errors, value.review_findings_count, "review_findings_count", true);
  checkNonNegativeIntegerOrNull(errors, value.rework_count, "rework_count");
  checkEnum(errors, value.quality_gate, QUALITY_GATES, "quality_gate");
  validateLinks(errors, value.links);

  if (!Array.isArray(value.artifact_refs)) issue(errors, "artifact_refs", "invalid_type", "expected an array");
  else for (const artifact of value.artifact_refs) {
    const before = errors.length;
    if (isPlainObject(artifact)) {
      const allowed = artifact.type === "path" ? new Set(["type", "value"]) : new Set(["type", "number"]);
      checkUnknownFields(errors, artifact, allowed, "artifact_refs");
    }
    if (errors.length === before && !isSafeArtifactRef(artifact)) {
      issue(errors, "artifact_refs", "unsafe_reference", "expected a safe relative path or GitHub number");
    }
  }
  if ("collector_id" in value) checkSlug(errors, value.collector_id, "collector_id");
  if (typeof value.recorded_at !== "string" || !ZONED_TIMESTAMP_PATTERN.test(value.recorded_at) || Number.isNaN(Date.parse(value.recorded_at))) {
    issue(errors, "recorded_at", "invalid_timestamp", "expected a timezone-aware ISO 8601 timestamp");
  }
  return errors;
}

export function assertValidWorkUnit(value) {
  const errors = validateWorkUnit(value);
  if (errors.length > 0) throw new MetricsValidationError(errors);
  return value;
}
