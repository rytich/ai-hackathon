import assert from "node:assert/strict";
import test from "node:test";

import {
  analyzeProjects,
  classifyCapabilities,
  classifyDomain,
  renderHtmlReport,
  renderMarkdownContext,
} from "./generate-strategy-report.mjs";

const projects = [
  {
    edition: 1,
    entry_order: 1,
    project_name: "Study Agent",
    project_description: "学習計画を自律的に作成する教育AIエージェント",
    article_title: null,
    article_url: "https://zenn.dev/example/articles/study-agent",
    participant_type: "individual",
    participant_name: null,
    awards: [],
    is_finalist: null,
    github_urls: [],
    demo_urls: [],
    technologies: [],
    source_url: "https://zenn.dev/hackathons/example?tab=projects",
    checked_at: "2026-09-10",
    verification_status: "official-list-only",
    notes: null,
  },
  {
    edition: 2,
    entry_order: 1,
    project_name: "Clinic Voice",
    project_description: "医療現場の問診を音声で支援するエージェント",
    article_title: "Clinic Voice の実装",
    article_url: "https://zenn.dev/example/articles/clinic-voice",
    participant_type: "team",
    participant_name: "Care Team",
    awards: ["最優秀賞"],
    is_finalist: true,
    github_urls: ["https://github.com/example/clinic-voice"],
    demo_urls: ["https://clinic.example.com"],
    technologies: ["Cloud Run", "Vertex AI"],
    source_url: "https://zenn.dev/hackathons/example-2?tab=projects",
    checked_at: "2026-09-10",
    verification_status: "article-checked",
    notes: null,
  },
];

test("受賞作と全提出の比較に必要な集計を生成する", () => {
  const analysis = analyzeProjects(projects);

  assert.deepEqual(analysis.totals, {
    projects: 2,
    awarded: 1,
    individual: 1,
    team: 1,
  });
  assert.equal(analysis.byEdition[0].projects, 1);
  assert.equal(analysis.byEdition[1].awarded, 1);
  assert.equal(analysis.domains.find((item) => item.name === "教育・学習").projects, 1);
  assert.equal(analysis.domains.find((item) => item.name === "医療・健康").awardRate, 100);
  assert.equal(analysis.champions[0].project_name, "Clinic Voice");
});

test("AI向けMarkdownは第5回の評価軸・根拠境界・全作品の文脈を保持する", () => {
  const markdown = renderMarkdownContext(
    { schema_version: "1.0.0", checked_at: "2026-09-10", projects },
  );

  assert.match(markdown, /第五回で優勝するための製品企画/);
  assert.match(markdown, /課題の新規性と解決策の有効性/);
  assert.match(markdown, /相関であり、受賞理由の因果を証明するものではない/);
  assert.match(markdown, /Study Agent/);
  assert.match(markdown, /学習計画を自律的に作成する教育AIエージェント/);
  assert.match(markdown, /https:\/\/zenn\.dev\/example\/articles\/study-agent/);
  assert.match(markdown, /Clinic Voice/);
  assert.match(markdown, /受賞: 公式結果上は受賞なし/);
  assert.match(markdown, /機能シグナル別比較/);
});

test("短い英字キーワードを単語の一部として誤検出しない", () => {
  const project = {
    ...projects[0],
    project_name: "PittariData",
    project_description: "企業調査を効率化するエージェント",
  };

  assert.ok(!classifyCapabilities(project).includes("物理・空間連携"));
});

test("社会福祉と医療の企画を適切な課題領域へ分類する", () => {
  assert.equal(
    classifyDomain({
      ...projects[0],
      project_name: "フクシア",
      project_description: "社会福祉士が支援制度を検索して利用者を支援する",
    }),
    "福祉・公共",
  );
  assert.equal(
    classifyDomain({
      ...projects[0],
      project_name: "Anatom-AI",
      project_description: "医師や医学部生が解剖学と病気や手術を理解する",
    }),
    "医療・健康",
  );
});

test("人間用HTMLは単体で閲覧でき、図表と作品コンテキストを内包する", () => {
  const html = renderHtmlReport(
    { schema_version: "1.0.0", checked_at: "2026-09-10", projects },
  );

  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<svg\b/);
  assert.match(html, /data-edition="2"/);
  assert.match(html, /Clinic Voice/);
  assert.match(html, /歴代最優秀賞/);
  assert.match(html, /https:\/\/zenn\.dev\/example\/articles\/clinic-voice/);
  assert.doesNotMatch(html, /<script\s+src=/i);
  assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet/i);
  assert.match(html, /svg\{width:100%;height:auto;display:block\}/);
});

test("HTMLとMarkdownへ埋め込む文字列をエスケープする", () => {
  const dangerous = structuredClone(projects[0]);
  dangerous.project_name = '<img src=x onerror="alert(1)">';
  dangerous.project_description = "説明の行末空白を除去する。 \n次の行";

  const html = renderHtmlReport({
    schema_version: "1.0.0",
    checked_at: "2026-09-10",
    projects: [dangerous],
  });
  const markdown = renderMarkdownContext({
    schema_version: "1.0.0",
    checked_at: "2026-09-10",
    projects: [dangerous],
  });

  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.doesNotMatch(markdown, /<img src=x/);
  assert.match(markdown, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.doesNotMatch(html, / +$/m);
  assert.doesNotMatch(markdown, / +$/m);
});

test("レポート境界でHTTP以外のURLを拒否する", () => {
  const dangerous = structuredClone(projects[0]);
  dangerous.article_url = "javascript:alert(1)";

  assert.throws(
    () => renderHtmlReport({ schema_version: "1.0.0", checked_at: "2026-09-10", projects: [dangerous] }),
    /HTTP\(S\) URL/,
  );
});

test("第5回の提出要件をリンク切れに備えて本文へ保存する", () => {
  const dataset = { schema_version: "1.0.0", checked_at: "2026-09-10", projects };
  const markdown = renderMarkdownContext(dataset);
  const html = renderHtmlReport(dataset);

  for (const requirement of ["GitHubリポジトリ連携", "テストアカウント", "サンプルデータ", "YouTube", "12月1日まで"]) {
    assert.match(markdown, new RegExp(requirement));
    assert.match(html, new RegExp(requirement));
  }
});

test("参加形態が不明な提出を個人として扱わない", () => {
  const unknown = { ...projects[0], participant_type: "unknown" };
  const dataset = { schema_version: "1.0.0", checked_at: "2026-09-10", projects: [unknown] };

  assert.match(renderMarkdownContext(dataset), /参加形態: 未確認/);
  assert.match(renderHtmlReport(dataset), /<dt>参加<\/dt><dd>未確認<\/dd>/);
});
