import assert from "node:assert/strict";
import test from "node:test";

import { validateDataset } from "./validate-hackathon-data.mjs";

const header = [
  "edition",
  "entry_order",
  "project_name",
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
].join(",");

function project(overrides = {}) {
  return {
    edition: 1,
    entry_order: 1,
    project_name: "Sample",
    article_title: "Sample article",
    article_url: "https://zenn.dev/example/articles/sample",
    participant_type: "individual",
    participant_name: null,
    awards: [],
    is_finalist: null,
    github_urls: [],
    demo_urls: [],
    technologies: [],
    source_url:
      "https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects",
    checked_at: "2026-09-10",
    verification_status: "official-list-only",
    notes: null,
    ...overrides,
  };
}

function dataset(projects) {
  return {
    schema_version: "1.0.0",
    checked_at: "2026-09-10",
    projects,
  };
}

function csvRow(record) {
  return [
    record.edition,
    record.entry_order,
    record.project_name,
    record.article_title ?? "",
    record.article_url,
    record.participant_type,
    record.participant_name ?? "",
    record.awards.join(" | "),
    record.is_finalist ?? "",
    record.github_urls.join(" | "),
    record.demo_urls.join(" | "),
    record.technologies.join(" | "),
    record.source_url,
    record.checked_at,
    record.verification_status,
    record.notes ?? "",
  ].join(",");
}

test("edition と entry_order の重複を拒否する", () => {
  const first = project();
  const duplicate = project({ project_name: "Duplicate" });
  const errors = validateDataset(
    dataset([first, duplicate]),
    `${header}\n${csvRow(first)}\n${csvRow(duplicate)}\n`,
  );

  assert.ok(
    errors.some((error) => error.includes("duplicate edition+entry_order")),
  );
});

test("JSON と CSV の件数差を拒否する", () => {
  const errors = validateDataset(dataset([project()]), `${header}\n`);

  assert.ok(
    errors.some((error) => error.includes("JSON/CSV row count mismatch")),
  );
});

test("必須URLと確認日の欠落を拒否する", () => {
  const invalid = project({ article_url: "", checked_at: "" });
  const errors = validateDataset(
    dataset([invalid]),
    `${header}\n${csvRow(invalid)}\n`,
  );

  assert.ok(errors.some((error) => error.includes("required field")));
});
