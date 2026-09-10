import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyLinks,
  extractAwards,
  extractArticleData,
  extractExplicitTechnologies,
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

test("公式説明の欠落と同一記事URLの重複をnotesに残す", () => {
  const duplicateUrl = "https://zenn.dev/alice/articles/duplicate";
  const records = normalizeProjects(
    {
      resultMarkdown: "",
      projects: [
        {
          projectName: "First",
          teamName: "",
          url: duplicateUrl,
          description: "",
        },
        {
          projectName: "Second",
          teamName: "",
          url: duplicateUrl,
          description: "別作品として掲載",
        },
      ],
    },
    3,
    sourceUrl,
    "2026-09-10",
  );

  assert.match(records[0].notes, /公式一覧の説明が空欄/);
  assert.match(records[0].notes, /entry_order 1, 2/);
  assert.match(records[1].notes, /entry_order 1, 2/);
});

test("提出記事からタイトルと本文データを抽出する", () => {
  const article = {
    title: "Sample Award Project",
    bodyHtml:
      '<p>Cloud Run と Gemini API を利用。</p><p>デモ: <a href="https://sample.run.app">アプリを試す</a></p><a href="https://github.com/example/project">GitHub</a>',
  };
  const articleHtml = `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify(
    {
      props: {
        pageProps: {
          article,
          githubUrl: "https://github.com/example/project",
          githubRepository: {
            htmlUrl: "https://github.com/example/project",
          },
        },
      },
    },
  )}</script>`;

  const extracted = extractArticleData(articleHtml);
  assert.equal(extracted.title, "Sample Award Project");
  assert.match(extracted.bodyHtml, /sample\.run\.app/);
  assert.deepEqual(extracted.githubUrls, ["https://github.com/example/project"]);
});

test("記事リンクをGitHubとデモへ分類する", () => {
  const article = {
    githubUrls: ["https://github.com/example/project"],
    bodyHtml:
      '<p>公開URL: <a href="https://sample.run.app">デモアプリ</a></p><p><a href="https://youtube.com/watch?v=abc">デモ動画</a></p>',
  };

  assert.deepEqual(classifyLinks(article), {
    githubUrls: ["https://github.com/example/project"],
    demoUrls: ["https://sample.run.app/"],
  });
});

test("競合アプリへのリンクをデモURLとして扱わない", () => {
  const article = {
    githubUrls: [],
    bodyHtml:
      '<h2>競合アプリとの比較</h2><p>旅行アプリ <a href="https://competitor.example">Plaru</a> との違い</p>',
  };

  assert.deepEqual(classifyLinks(article).demoUrls, []);
});

test("公開アプリ用ホストのURLをデモとして扱う", () => {
  const article = {
    githubUrls: [],
    bodyHtml:
      '<p><a href="https://sample.web.app">https://sample.web.app/</a></p><p><a href="https://service.a.run.app/demo">service</a></p>',
  };

  assert.deepEqual(classifyLinks(article).demoUrls, [
    "https://sample.web.app/",
    "https://service.a.run.app/demo",
  ]);
});

test("GitHub URLをプロジェクトリポジトリrootへ絞る", () => {
  const article = {
    githubUrls: ["https://github.com/author/zenn-content"],
    bodyHtml: [
      '<p><a href="https://github.com/example/project/blob/main/app.js">実装</a></p>',
      '<p><a href="https://github.com/example/project/tree/main/functions">functions</a></p>',
      '<p>レビューには<a href="https://github.com/qodo-ai/pr-agent">PR-Agent</a>を利用</p>',
      '<p><a href="https://github.com/owner/explicit">GitHubリポジトリ</a></p>',
    ].join(""),
  };

  assert.deepEqual(classifyLinks(article).githubUrls, [
    "https://github.com/example/project",
    "https://github.com/owner/explicit",
  ]);
});

test("本文に明示された許可技術だけを抽出する", () => {
  const text = "Cloud Run と Gemini API、Firebase を利用。React も使用。";

  assert.deepEqual(extractExplicitTechnologies(text), [
    "Cloud Run",
    "Gemini API",
    "Firebase",
  ]);
});
