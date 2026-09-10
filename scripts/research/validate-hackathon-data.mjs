import fs from "node:fs";
import { pathToFileURL } from "node:url";

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

function validateRecord(record, index, errors) {
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
  if (!["individual", "team", "unknown"].includes(record?.participant_type)) {
    errors.push(`record ${index}: participant_type is invalid`);
  }
  if (!["official-list-only", "article-checked"].includes(record?.verification_status)) {
    errors.push(`record ${index}: verification_status is invalid`);
  }
  for (const key of ["awards", "github_urls", "demo_urls", "technologies"]) {
    if (!Array.isArray(record?.[key]) || record[key].some((value) => typeof value !== "string")) {
      errors.push(`record ${index}: ${key} must be a string array`);
    }
  }
}

export function validateDataset(dataset, csvText) {
  const errors = [];
  if (dataset?.schema_version !== "1.0.0") errors.push("schema_version must be 1.0.0");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataset?.checked_at ?? "")) {
    errors.push("checked_at must use YYYY-MM-DD");
  }
  if (!Array.isArray(dataset?.projects)) {
    return [...errors, "projects must be an array"];
  }

  const keys = new Set();
  dataset.projects.forEach((record, index) => {
    validateRecord(record, index, errors);
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

  const jsonKeys = new Set(
    dataset.projects.map(
      (record) => `${record.edition}:${record.entry_order}:${record.article_url}`,
    ),
  );
  const articleUrlIndex = csvHeader.indexOf("article_url");
  for (const row of csvRows) {
    const csvKey = `${row[0]}:${row[1]}:${row[articleUrlIndex]}`;
    if (!jsonKeys.has(csvKey)) errors.push(`CSV key missing from JSON: ${csvKey}`);
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
  const errors = validateDataset(dataset, csvText);
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
