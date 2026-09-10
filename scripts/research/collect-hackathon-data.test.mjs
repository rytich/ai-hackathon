import assert from "node:assert/strict";
import test from "node:test";

import {
  extractAwards,
  extractNextData,
  normalizeProjects,
  toCsv,
} from "./collect-hackathon-data.mjs";

const sourceUrl =
  "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects";

const hackathon = {
  title: "第4回 Agentic AI Hackathon with Google Cloud",
  projects: [
    {
      projectName: "Individual Project",
      teamName: "",
      url: "https://zenn.dev/alice/articles/individual",
      description: "個人作品の公式説明",
    },
    {
      projectName: "Team Project",
      teamName: "Team Example",
      url: "https://zenn.dev/bob/articles/team",
      description: "チーム作品の公式説明",
    },
  ],
  resultMarkdown: [
    "### 最優秀賞",
    "",
    "[Individual Project](https://zenn.dev/alice/articles/individual)",
    "",
    "https://zenn.dev/alice/articles/individual",
    "",
    "### 優秀賞",
    "",
    "[Team Project](https://zenn.dev/bob/articles/team)（チーム: Team Example）",
  ].join("\n"),
};

const html = `<html><script id="__NEXT_DATA__" type="application/json" nonce="abc">${JSON.stringify(
  { props: { pageProps: { hackathon } } },
)}</script></html>`;

test("nonce付きNEXT_DATAから公式ハッカソン情報を抽出する", () => {
  assert.deepEqual(extractNextData(html), hackathon);
});

test("結果Markdownのリンクを賞名へ対応付ける", () => {
  const awards = extractAwards(hackathon.resultMarkdown);

  assert.deepEqual(awards.get("https://zenn.dev/alice/articles/individual"), [
    "最優秀賞",
  ]);
  assert.deepEqual(awards.get("https://zenn.dev/bob/articles/team"), ["優秀賞"]);
});

test("個人とチームを区別し公式順序と説明を保存する", () => {
  const records = normalizeProjects(hackathon, 4, sourceUrl, "2026-09-10");

  assert.equal(records[0].participant_type, "individual");
  assert.equal(records[1].participant_type, "team");
  assert.equal(records[1].participant_name, "Team Example");
  assert.equal(records[0].entry_order, 1);
  assert.equal(records[0].project_description, "個人作品の公式説明");
  assert.deepEqual(records[1].awards, ["優秀賞"]);
});

test("CSVは固定ヘッダーを持ちカンマを引用する", () => {
  const records = normalizeProjects(
    {
      ...hackathon,
      projects: [{ ...hackathon.projects[0], projectName: "A, B" }],
    },
    4,
    sourceUrl,
    "2026-09-10",
  );
  const csv = toCsv(records);

  assert.match(csv, /^edition,entry_order,project_name,project_description,/);
  assert.match(csv, /"A, B"/);
});
