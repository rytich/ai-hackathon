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
  const text = value == null ? "" : String(value);
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

async function fetchText(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "rytich-ai-hackathon-research/1.0" },
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

async function loadEdition(entry, cacheDirectory) {
  fs.mkdirSync(cacheDirectory, { recursive: true });
  const cachePath = path.join(cacheDirectory, `vol-${entry.edition}.html`);
  if (!fs.existsSync(cachePath)) {
    const html = await fetchText(entry.url);
    fs.writeFileSync(cachePath, html);
  }
  return extractNextData(fs.readFileSync(cachePath, "utf8"));
}

function parseOptions(args) {
  const options = {
    checkedAt: null,
    output: null,
    csvOutput: null,
    reportAwardMismatches: null,
    cacheDirectory: ".cache/hackathons",
  };
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--checked-at") options.checkedAt = args[++index];
    else if (value === "--output") options.output = args[++index];
    else if (value === "--csv-output") options.csvOutput = args[++index];
    else if (value === "--cache-directory") options.cacheDirectory = args[++index];
    else if (value === "--report-award-mismatches") {
      options.reportAwardMismatches = args[++index];
    } else throw new Error(`Unknown argument: ${value}`);
  }
  return options;
}

async function reportAwardMismatches(datasetPath, cacheDirectory) {
  const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));
  const keys = new Set(dataset.projects.map((project) => project.article_url));
  const mismatches = [];
  for (const entry of EDITIONS) {
    const hackathon = await loadEdition(entry, cacheDirectory);
    for (const articleUrl of extractAwards(hackathon.resultMarkdown).keys()) {
      if (!keys.has(articleUrl)) mismatches.push(`${entry.edition}: ${articleUrl}`);
    }
  }
  console.log(`award mismatches: ${mismatches.length}`);
  mismatches.forEach((value) => console.log(`- ${value}`));
  if (mismatches.length > 0) process.exitCode = 1;
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  if (options.reportAwardMismatches) {
    await reportAwardMismatches(
      options.reportAwardMismatches,
      options.cacheDirectory,
    );
    return;
  }
  if (!options.checkedAt || !options.output || !options.csvOutput) {
    throw new Error(
      "Usage: collect-hackathon-data.mjs --checked-at YYYY-MM-DD --output FILE --csv-output FILE",
    );
  }

  const projects = [];
  for (const [index, entry] of EDITIONS.entries()) {
    const hackathon = await loadEdition(entry, options.cacheDirectory);
    const records = normalizeProjects(
      hackathon,
      entry.edition,
      entry.url,
      options.checkedAt,
    );
    projects.push(...records);
    console.log(`edition ${entry.edition}: ${records.length}`);
    if (index < EDITIONS.length - 1) await sleep(500);
  }

  const dataset = {
    schema_version: "1.0.0",
    checked_at: options.checkedAt,
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
