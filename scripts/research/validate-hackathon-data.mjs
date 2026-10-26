import fs from "node:fs";
import { pathToFileURL } from "node:url";

const DATASET_SCHEMA = JSON.parse(
  fs.readFileSync(new URL("../../data/hackathons/schema.json", import.meta.url), "utf8"),
);

export const CSV_COLUMNS = [
  "edition",
  "entry_order",
  "project_name",
  "project_description",
  "article_title",
  "article_url",
  "participant_type",
  "participant_name",
  "awards",
  "is_finalist",
  "github_urls",
  "demo_urls",
  "technologies",
  "source_url",
  "checked_at",
  "verification_status",
  "notes",
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function isUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function resolveSchemaReference(rootSchema, reference) {
  if (!reference.startsWith("#/")) throw new Error(`Unsupported schema reference: ${reference}`);
  return reference
    .slice(2)
    .split("/")
    .reduce((value, key) => value?.[key.replaceAll("~1", "/").replaceAll("~0", "~")], rootSchema);
}

function matchesType(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  return typeof value === type;
}

function validateSchemaValue(value, schema, rootSchema, location, errors) {
  if (schema.$ref) {
    validateSchemaValue(value, resolveSchemaReference(rootSchema, schema.$ref), rootSchema, location, errors);
    return;
  }
  const types = schema.type == null ? [] : Array.isArray(schema.type) ? schema.type : [schema.type];
  if (types.length > 0 && !types.some((type) => matchesType(value, type))) {
    errors.push(`${location}: schema type must be ${types.join(" or ")}`);
    return;
  }
  if (Object.hasOwn(schema, "const") && value !== schema.const) {
    errors.push(`${location}: schema const must be ${JSON.stringify(schema.const)}`);
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${location}: schema enum value is invalid`);
  }
  if (typeof value === "string") {
    if (schema.minLength != null && value.length < schema.minLength) {
      errors.push(`${location}: schema minLength is ${schema.minLength}`);
    }
    if (schema.format === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      errors.push(`${location}: schema date is invalid`);
    }
    if (schema.format === "uri" && !isUrl(value)) {
      errors.push(`${location}: schema URI is invalid`);
    }
  }
  if (typeof value === "number") {
    if (schema.minimum != null && value < schema.minimum) errors.push(`${location}: below schema minimum`);
    if (schema.maximum != null && value > schema.maximum) errors.push(`${location}: above schema maximum`);
  }
  if (Array.isArray(value)) {
    if (schema.uniqueItems) {
      const serialized = value.map((item) => JSON.stringify(item));
      if (new Set(serialized).size !== serialized.length) errors.push(`${location}: schema requires unique items`);
    }
    if (schema.items) {
      value.forEach((item, index) =>
        validateSchemaValue(item, schema.items, rootSchema, `${location}[${index}]`, errors),
      );
    }
  }
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const key of schema.required ?? []) {
      if (!(key in value)) errors.push(`${location}: schema required property ${key} is missing`);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(schema.properties ?? {}, key)) {
          errors.push(`${location}: schema unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
      if (key in value) validateSchemaValue(value[key], childSchema, rootSchema, `${location}.${key}`, errors);
    }
  }
}

function validateNullableString(record, key, index, errors) {
  if (record?.[key] !== null && typeof record?.[key] !== "string") {
    errors.push(`record ${index}: ${key} must be a string or null`);
  }
}

function validateRecord(record, index, datasetCheckedAt, errors) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    errors.push(`record ${index}: must be an object`);
    return;
  }
  for (const key of Object.keys(record)) {
    if (!CSV_COLUMNS.includes(key)) {
      errors.push(`record ${index}: unexpected property ${key}`);
    }
  }
  for (const key of CSV_COLUMNS) {
    if (!(key in record)) {
      errors.push(`record ${index}: required property ${key} is missing`);
    }
  }
  const required = [
    "project_name",
    "article_url",
    "source_url",
    "checked_at",
    "verification_status",
  ];
  for (const key of required) {
    if (typeof record?.[key] !== "string" || record[key].length === 0) {
      errors.push(`record ${index}: required field ${key} is missing`);
    }
  }
  if (!Number.isInteger(record?.edition) || record.edition < 1 || record.edition > 4) {
    errors.push(`record ${index}: edition must be an integer from 1 to 4`);
  }
  if (!Number.isInteger(record?.entry_order) || record.entry_order < 1) {
    errors.push(`record ${index}: entry_order must be a positive integer`);
  }
  if (record?.article_url && !isUrl(record.article_url)) {
    errors.push(`record ${index}: article_url must be HTTP(S)`);
  }
  if (record?.source_url && !isUrl(record.source_url)) {
    errors.push(`record ${index}: source_url must be HTTP(S)`);
  }
  if (record?.checked_at && !/^\d{4}-\d{2}-\d{2}$/.test(record.checked_at)) {
    errors.push(`record ${index}: checked_at must use YYYY-MM-DD`);
  }
  if (record.checked_at !== datasetCheckedAt) {
    errors.push(`record ${index}: checked_at differs from dataset checked_at`);
  }
  if (!["individual", "team", "unknown"].includes(record?.participant_type)) {
    errors.push(`record ${index}: participant_type is invalid`);
  }
  if (!["official-list-only", "article-checked"].includes(record?.verification_status)) {
    errors.push(`record ${index}: verification_status is invalid`);
  }
  for (const key of ["awards", "github_urls", "demo_urls", "technologies"]) {
    if (!Array.isArray(record?.[key]) || record[key].some((value) => typeof value !== "string")) {
      errors.push(`record ${index}: ${key} must be a string array`);
    } else if (new Set(record[key]).size !== record[key].length) {
      errors.push(`record ${index}: ${key} must contain unique values`);
    }
  }
  for (const key of [
    "project_description",
    "article_title",
    "participant_name",
    "notes",
  ]) {
    validateNullableString(record, key, index, errors);
  }
  if (record.is_finalist !== null && typeof record.is_finalist !== "boolean") {
    errors.push(`record ${index}: is_finalist must be a boolean or null`);
  }
}

function csvRepresentation(value) {
  if (Array.isArray(value)) return value.join(" | ");
  if (value == null) return "";
  return String(value).replace(/[ \t]+(?=\r?\n|$)/g, "");
}

export const EXPECTED_COUNTS = { 1: 128, 2: 158, 3: 108, 4: 195 };

export function validateDataset(dataset, csvText, options = {}) {
  const errors = [];
  validateSchemaValue(dataset, DATASET_SCHEMA, DATASET_SCHEMA, "$", errors);
  const datasetKeys = new Set(["schema_version", "checked_at", "projects"]);
  if (!dataset || typeof dataset !== "object" || Array.isArray(dataset)) {
    return ["dataset must be an object"];
  }
  for (const key of Object.keys(dataset)) {
    if (!datasetKeys.has(key)) errors.push(`dataset: unexpected property ${key}`);
  }
  if (dataset?.schema_version !== "1.0.0") errors.push("schema_version must be 1.0.0");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataset?.checked_at ?? "")) {
    errors.push("checked_at must use YYYY-MM-DD");
  }
  if (!Array.isArray(dataset?.projects)) {
    return [...errors, "projects must be an array"];
  }

  const keys = new Set();
  dataset.projects.forEach((record, index) => {
    validateRecord(record, index, dataset.checked_at, errors);
    const key = `${record?.edition}:${record?.entry_order}`;
    if (keys.has(key)) errors.push(`duplicate edition+entry_order: ${key}`);
    keys.add(key);
  });

  const csvRows = parseCsv(csvText);
  const csvHeader = csvRows.shift() ?? [];
  if (csvHeader.join(",") !== CSV_COLUMNS.join(",")) {
    errors.push("CSV header does not match schema columns");
  }
  if (dataset.projects.length !== csvRows.length) {
    errors.push(
      `JSON/CSV row count mismatch: ${dataset.projects.length} != ${csvRows.length}`,
    );
  }

  for (let index = 0; index < Math.min(dataset.projects.length, csvRows.length); index += 1) {
    const record = dataset.projects[index];
    const row = csvRows[index];
    if (row.length !== CSV_COLUMNS.length) {
      errors.push(`CSV row ${index + 1} has ${row.length} columns; expected ${CSV_COLUMNS.length}`);
      continue;
    }
    CSV_COLUMNS.forEach((column, columnIndex) => {
      const expected = csvRepresentation(record?.[column]);
      if (row[columnIndex] !== expected) {
        errors.push(
          `JSON/CSV value mismatch at row ${index + 1}, column ${column}: ${JSON.stringify(row[columnIndex])} != ${JSON.stringify(expected)}`,
        );
      }
    });
  }

  if (options.expectedCounts) {
    for (let edition = 1; edition <= 4; edition += 1) {
      const records = dataset.projects
        .filter((record) => record.edition === edition)
        .sort((left, right) => left.entry_order - right.entry_order);
      const expectedCount = options.expectedCounts[edition] ?? 0;
      if (records.length !== expectedCount) {
        errors.push(
          `edition ${edition}: expected ${expectedCount} records, got ${records.length}`,
        );
      }
      const expectedOrders = Array.from({ length: expectedCount }, (_, index) => index + 1);
      const actualOrders = records.map((record) => record.entry_order);
      if (actualOrders.join(",") !== expectedOrders.join(",")) {
        errors.push(`edition ${edition}: entry_order sequence is incomplete`);
      }
    }
  }
  return errors;
}

function main() {
  const [jsonPath, csvPath] = process.argv.slice(2);
  if (!jsonPath || !csvPath) {
    console.error("Usage: validate-hackathon-data.mjs <projects.json> <projects.csv>");
    process.exitCode = 2;
    return;
  }
  const dataset = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const csvText = fs.readFileSync(csvPath, "utf8");
  const errors = validateDataset(dataset, csvText, {
    expectedCounts: EXPECTED_COUNTS,
  });
  for (let edition = 1; edition <= 4; edition += 1) {
    console.log(
      `edition ${edition}: ${dataset.projects.filter((project) => project.edition === edition).length}`,
    );
  }
  console.log(`total: ${dataset.projects.length}`);
  console.log(`errors: ${errors.length}`);
  errors.forEach((error) => console.error(`- ${error}`));
  if (errors.length > 0) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
