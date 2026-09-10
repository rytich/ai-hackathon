import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { CSV_COLUMNS } from "./validate-hackathon-data.mjs";

export const EDITIONS = [
  {
    edition: 1,
    url: "https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects",
  },
  {
    edition: 2,
    url: "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects",
  },
  {
    edition: 3,
    url: "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects",
  },
  {
    edition: 4,
    url: "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects",
  },
];

export function extractNextData(html) {
  const match = html.match(
    /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
  );
  if (!match) throw new Error("script#__NEXT_DATA__ was not found");
  const data = JSON.parse(match[1]);
  const hackathon = data?.props?.pageProps?.hackathon;
  if (!hackathon || !Array.isArray(hackathon.projects)) {
    throw new Error("props.pageProps.hackathon.projects was not found");
  }
  return hackathon;
}

function extractNextPayload(html) {
  const match = html.match(
    /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
  );
  if (!match) throw new Error("script#__NEXT_DATA__ was not found");
  return JSON.parse(match[1]);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function extractArticleData(html) {
  const pageProps = extractNextPayload(html)?.props?.pageProps;
  const article = pageProps?.article;
  if (!article?.title || typeof article.bodyHtml !== "string") {
    throw new Error("props.pageProps.article was not found");
  }
  return {
    title: article.title,
    bodyHtml: article.bodyHtml,
    githubUrls: unique(
      [pageProps.githubUrl, pageProps.githubRepository?.htmlUrl]
        .filter((value) => typeof value === "string")
        .map(normalizeUrl),
    ),
  };
}

function plainText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function isExcludedDemoHost(hostname) {
  return (
    hostname === "zenn.dev" ||
    hostname === "github.com" ||
    hostname === "www.github.com" ||
    hostname === "youtube.com" ||
    hostname === "www.youtube.com" ||
    hostname === "youtu.be" ||
    hostname === "x.com" ||
    hostname === "twitter.com"
  );
}

function isKnownDeploymentHost(hostname) {
  return [
    ".run.app",
    ".web.app",
    ".firebaseapp.com",
    ".vercel.app",
    ".appspot.com",
    ".streamlit.app",
    ".onrender.com",
  ].some((suffix) => hostname.endsWith(suffix));
}

function githubRepositoryRoot(value) {
  const url = new URL(value);
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;
  const repository = segments[1].replace(/\.git$/, "");
  if (/^zenn-(content|contents)$/i.test(repository)) return null;
  return `https://github.com/${segments[0]}/${repository}`;
}

export function classifyLinks(article) {
  const githubUrls = article.githubUrls
    .map(githubRepositoryRoot)
    .filter(Boolean);
  const bodyGithubCandidates = new Map();
  const demoUrls = [];
  const anchorPattern = /<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of article.bodyHtml.matchAll(anchorPattern)) {
    const rawUrl = match[1].replaceAll("&amp;", "&");
    const url = new URL(rawUrl);
    if (url.hostname === "github.com" || url.hostname === "www.github.com") {
      const repositoryUrl = githubRepositoryRoot(rawUrl);
      if (repositoryUrl) {
        const start = Math.max(0, match.index - 100);
        const context = `${plainText(article.bodyHtml.slice(start, match.index))} ${plainText(match[2])}`;
        const candidate = bodyGithubCandidates.get(repositoryUrl) ?? {
          count: 0,
          explicit: false,
        };
        candidate.count += 1;
        candidate.explicit ||= /(GitHub|Gitリポジトリ|リポジトリ|repository|source code|ソースコード)/i.test(
          context,
        );
        bodyGithubCandidates.set(repositoryUrl, candidate);
      }
      continue;
    }
    const start = Math.max(0, match.index - 120);
    const prefix = plainText(article.bodyHtml.slice(start, match.index));
    const linkText = plainText(match[2]);
    const explicitLinkText =
      /(デモ|アプリを試す|試す|公開URL|サービスURL|動作確認)/i.test(linkText);
    const explicitPrefix =
      /(デモ|公開URL|サービスURL|動作確認)\s*[:：]?\s*$/i.test(prefix);
    if (
      !isExcludedDemoHost(url.hostname) &&
      (isKnownDeploymentHost(url.hostname) || explicitLinkText || explicitPrefix)
    ) {
      demoUrls.push(normalizeUrl(rawUrl));
    }
  }
  for (const [repositoryUrl, candidate] of bodyGithubCandidates) {
    if (candidate.explicit || candidate.count >= 2) githubUrls.push(repositoryUrl);
  }
  return {
    githubUrls: unique(githubUrls),
    demoUrls: unique(demoUrls),
  };
}

const TECHNOLOGIES = [
  "Cloud Run",
  "Cloud Functions",
  "App Engine",
  "GKE",
  "Compute Engine",
  "Vertex AI",
  "Gemini API",
  "Gemma",
  "Imagen",
  "Veo",
  "ADK",
  "Firebase",
  "Flutter",
];

export function extractExplicitTechnologies(value) {
  const text = plainText(value);
  return TECHNOLOGIES.filter((technology) => {
    const escaped = technology.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^A-Za-z])${escaped}([^A-Za-z]|$)`).test(text);
  });
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|ref$|source$)/i.test(key)) url.searchParams.delete(key);
  }
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

function cleanHeading(value) {
  return value
    .replace(/[*_`]/g, "")
    .replace(/\s+#+\s*$/, "")
    .trim();
}

export function extractAwards(resultMarkdown = "") {
  const awards = new Map();
  const sections = resultMarkdown.split(/^###\s+/m).slice(1);
  for (const section of sections) {
    const [headingLine, ...bodyLines] = section.split("\n");
    const awardName = cleanHeading(headingLine);
    const body = bodyLines.join("\n");
    const seen = new Set();
    for (const match of body.matchAll(/\[[^\]]+\]\((https?:\/\/zenn\.dev\/[^)]+)\)/g)) {
      const articleUrl = normalizeUrl(match[1]);
      if (seen.has(articleUrl)) continue;
      seen.add(articleUrl);
      const values = awards.get(articleUrl) ?? [];
      if (!values.includes(awardName)) values.push(awardName);
      awards.set(articleUrl, values);
    }
  }
  return awards;
}

export function normalizeProjects(
  hackathon,
  edition,
  sourceUrl,
  checkedAt,
) {
  const awards = extractAwards(hackathon.resultMarkdown);
  const normalizedUrls = hackathon.projects.map((project) =>
    normalizeUrl(project.url),
  );
  const duplicateOrders = new Map();
  normalizedUrls.forEach((articleUrl, index) => {
    const orders = duplicateOrders.get(articleUrl) ?? [];
    orders.push(index + 1);
    duplicateOrders.set(articleUrl, orders);
  });
  return hackathon.projects.map((project, index) => {
    const articleUrl = normalizedUrls[index];
    const teamName = project.teamName?.trim() || null;
    const projectDescription = project.description?.trim() || null;
    const notes = [];
    if (!projectDescription) notes.push("公式一覧の説明が空欄");
    const matchingOrders = duplicateOrders.get(articleUrl) ?? [];
    if (matchingOrders.length > 1) {
      notes.push(
        `同一記事URLが公式一覧内で複数回掲載: entry_order ${matchingOrders.join(", ")}`,
      );
    }
    return {
      edition,
      entry_order: index + 1,
      project_name: project.projectName.trim(),
      project_description: projectDescription,
      article_title: null,
      article_url: articleUrl,
      participant_type: teamName ? "team" : "individual",
      participant_name: teamName,
      awards: awards.get(articleUrl) ?? [],
      is_finalist: null,
      github_urls: [],
      demo_urls: [],
      technologies: [],
      source_url: sourceUrl,
      checked_at: checkedAt,
      verification_status: "official-list-only",
      notes: notes.length > 0 ? notes.join("; ") : null,
    };
  });
}

function csvValue(value) {
  const text = value == null ? "" : String(value).replace(/[ \t]+(?=\r?\n|$)/g, "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(projects) {
  const rows = projects.map((project) =>
    CSV_COLUMNS.map((column) => {
      const value = Array.isArray(project[column])
        ? project[column].join(" | ")
        : project[column];
      return csvValue(value);
    }).join(","),
  );
  return `${CSV_COLUMNS.join(",")}\n${rows.join("\n")}\n`;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function currentTokyoDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

async function fetchText(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "rytich-ai-hackathon-research/1.0" },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(attempt * 1000);
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError?.message}`);
}

async function loadEdition(entry, cacheDirectory, options = {}) {
  fs.mkdirSync(cacheDirectory, { recursive: true });
  const cachePath = path.join(cacheDirectory, `vol-${entry.edition}.html`);
  const metadataPath = `${cachePath}.json`;
  if (!options.offlineCache) {
    const html = await fetchText(entry.url);
    fs.writeFileSync(cachePath, html);
    fs.writeFileSync(
      metadataPath,
      `${JSON.stringify({ sourceUrl: entry.url, checkedAt: options.checkedAt }, null, 2)}\n`,
    );
  } else if (!fs.existsSync(cachePath) || !fs.existsSync(metadataPath)) {
    throw new Error(`Offline cache or metadata is missing for edition ${entry.edition}`);
  }
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.checkedAt ?? "")) {
    throw new Error(`Offline cache metadata has no valid checkedAt for edition ${entry.edition}`);
  }
  return {
    hackathon: extractNextData(fs.readFileSync(cachePath, "utf8")),
    checkedAt: metadata.checkedAt,
  };
}

function parseOptions(args) {
  const options = {
    checkedAt: null,
    output: null,
    csvOutput: null,
    reportAwardMismatches: null,
    enrichAwards: null,
    cacheDirectory: ".cache/hackathons",
    offlineCache: false,
  };
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--checked-at") options.checkedAt = args[++index];
    else if (value === "--output") options.output = args[++index];
    else if (value === "--csv-output") options.csvOutput = args[++index];
    else if (value === "--cache-directory") options.cacheDirectory = args[++index];
    else if (value === "--offline-cache") options.offlineCache = true;
    else if (value === "--report-award-mismatches") {
      options.reportAwardMismatches = args[++index];
    } else if (value === "--enrich-awards") {
      options.enrichAwards = args[++index];
    } else throw new Error(`Unknown argument: ${value}`);
  }
  return options;
}

export function resetAwardEnrichment(project) {
  project.article_title = null;
  project.github_urls = [];
  project.demo_urls = [];
  project.technologies = [];
  project.verification_status = "official-list-only";
  const retainedNotes = (project.notes ?? "")
    .split("; ")
    .filter(
      (note) => note.length > 0 && !note.startsWith("受賞記事を取得・解析できず:"),
    );
  project.notes = retainedNotes.length > 0 ? retainedNotes.join("; ") : null;
}

async function enrichAwardProjects(datasetPath, csvOutput, cacheDirectory, offlineCache) {
  if (!csvOutput) throw new Error("--enrich-awards requires --csv-output");
  const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));
  const winners = dataset.projects.filter((project) => project.awards.length > 0);
  const articleCache = path.join(cacheDirectory, "articles");
  fs.mkdirSync(articleCache, { recursive: true });
  const actualCheckedAt = currentTokyoDate();
  if (!offlineCache && dataset.checked_at !== actualCheckedAt) {
    throw new Error(
      `Dataset checked_at ${dataset.checked_at} differs from article fetch date ${actualCheckedAt}; refresh the dataset first`,
   );
  }
  let checked = 0;
  let failed = 0;
  for (const [index, project] of winners.entries()) {
    const cachePath = path.join(
      articleCache,
      `vol-${project.edition}-entry-${project.entry_order}.html`,
    );
    const metadataPath = `${cachePath}.json`;
    resetAwardEnrichment(project);
    try {
      if (!offlineCache) {
        fs.writeFileSync(cachePath, await fetchText(project.article_url));
        fs.writeFileSync(
          metadataPath,
          `${JSON.stringify({ sourceUrl: project.article_url, checkedAt: actualCheckedAt }, null, 2)}\n`,
        );
      } else if (!fs.existsSync(cachePath) || !fs.existsSync(metadataPath)) {
        throw new Error("offline cache or metadata is missing");
      } else {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
        if (metadata.checkedAt !== dataset.checked_at) {
          throw new Error(
            `offline article cache checkedAt ${metadata.checkedAt ?? "missing"} differs from dataset ${dataset.checked_at}`,
          );
        }
      }
      const article = extractArticleData(fs.readFileSync(cachePath, "utf8"));
      const links = classifyLinks(article);
      project.article_title = article.title;
      project.github_urls = links.githubUrls;
      project.demo_urls = links.demoUrls;
      project.technologies = extractExplicitTechnologies(article.bodyHtml);
      project.verification_status = "article-checked";
      checked += 1;
    } catch (error) {
      const note = `受賞記事を取得・解析できず: ${error.message}`;
      project.notes = project.notes ? `${project.notes}; ${note}` : note;
      failed += 1;
    }
    if (index < winners.length - 1) await sleep(500);
  }
  fs.writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`);
  fs.writeFileSync(csvOutput, toCsv(dataset.projects));
  console.log(`award articles checked: ${checked}`);
  console.log(`award articles failed: ${failed}`);
  if (failed > 0) process.exitCode = 1;
}

function awardKey(record) {
  return `${record.edition}:${record.entry_order}`;
}

function sortedAwards(record) {
  return [...(record?.awards ?? [])].sort();
}

export function compareAwardAssignments(actualRecords, expectedRecords) {
  const actual = new Map(actualRecords.map((record) => [awardKey(record), record]));
  const expected = new Map(expectedRecords.map((record) => [awardKey(record), record]));
  const mismatches = [];
  for (const key of new Set([...actual.keys(), ...expected.keys()])) {
    const actualRecord = actual.get(key);
    const expectedRecord = expected.get(key);
    const actualAwards = sortedAwards(actualRecord).join(" | ") || "none";
    const expectedAwards = sortedAwards(expectedRecord).join(" | ") || "none";
    if (
      !actualRecord ||
      !expectedRecord ||
      actualRecord.article_url !== expectedRecord.article_url ||
      actualAwards !== expectedAwards
    ) {
      mismatches.push(
        `${key}: expected ${expectedAwards} at ${expectedRecord?.article_url ?? "missing"}; got ${actualAwards} at ${actualRecord?.article_url ?? "missing"}`,
      );
    }
  }
  return mismatches;
}

async function reportAwardMismatches(datasetPath, cacheDirectory, offlineCache) {
  const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));
  const expectedRecords = [];
  for (const entry of EDITIONS) {
    const loaded = await loadEdition(entry, cacheDirectory, {
      offlineCache,
      checkedAt: currentTokyoDate(),
    });
    expectedRecords.push(
      ...normalizeProjects(
        loaded.hackathon,
        entry.edition,
        entry.url,
        loaded.checkedAt,
      ),
    );
  }
  const mismatches = compareAwardAssignments(dataset.projects, expectedRecords);
  console.log(`award mismatches: ${mismatches.length}`);
  mismatches.forEach((value) => console.log(`- ${value}`));
  if (mismatches.length > 0) process.exitCode = 1;
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  if (options.enrichAwards) {
    await enrichAwardProjects(
      options.enrichAwards,
      options.csvOutput,
      options.cacheDirectory,
      options.offlineCache,
    );
    return;
  }
  if (options.reportAwardMismatches) {
    await reportAwardMismatches(
      options.reportAwardMismatches,
      options.cacheDirectory,
      options.offlineCache,
    );
    return;
  }
  if ((!options.checkedAt && !options.offlineCache) || !options.output || !options.csvOutput) {
    throw new Error(
      "Usage: collect-hackathon-data.mjs (--checked-at YYYY-MM-DD | --offline-cache) --output FILE --csv-output FILE",
    );
  }

  const projects = [];
  const checkedDates = new Set();
  for (const [index, entry] of EDITIONS.entries()) {
    const loaded = await loadEdition(entry, options.cacheDirectory, {
      offlineCache: options.offlineCache,
      checkedAt: options.checkedAt,
    });
    checkedDates.add(loaded.checkedAt);
    const records = normalizeProjects(
      loaded.hackathon,
      entry.edition,
      entry.url,
      loaded.checkedAt,
    );
    projects.push(...records);
    console.log(`edition ${entry.edition}: ${records.length}`);
    if (index < EDITIONS.length - 1) await sleep(500);
  }

  if (checkedDates.size !== 1) {
    throw new Error(
      `Cached editions have different checkedAt values: ${[...checkedDates].join(", ")}`,
    );
  }
  const [datasetCheckedAt] = checkedDates;

  const dataset = {
    schema_version: "1.0.0",
    checked_at: datasetCheckedAt,
    projects,
  };
  fs.mkdirSync(path.dirname(options.output), { recursive: true });
  fs.writeFileSync(options.output, `${JSON.stringify(dataset, null, 2)}\n`);
  fs.writeFileSync(options.csvOutput, toCsv(projects));
  console.log(`total: ${projects.length}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
