import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MANIFEST_PATH = ".agentic-framework/installation.json";
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const SEMVER_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z0-9.-]+)?$/;
const SEEDED_EXACT = new Set([
  ".env.example",
  ".gitignore",
  "AGENTS.md",
  "CLAUDE.md",
  "outputs/README.md",
  "scripts/build-public-archive.sh",
  "scripts/check-agent-tools.sh",
  "scripts/check-doc-links.sh",
  "scripts/complete-task.sh",
  "scripts/select-ai-profile.sh",
  "scripts/setup-github-labels.sh",
]);
const SEEDED_PREFIXES = [".agents/", ".ai/", ".github/", "docs/"];

export function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function assertSafePath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\\") || path.posix.isAbsolute(value)) {
    throw new Error(`unsafe installation path: ${String(value)}`);
  }
  const parts = value.split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) {
    throw new Error(`unsafe installation path: ${value}`);
  }
}

export function classifyInstallationPath(value) {
  assertSafePath(value);
  if (value === ".af-metrics.local.json" || value.startsWith(".af-metrics/")) return "local-data";
  if (value === "scripts/metrics.mjs"
    || value === "scripts/check-af-update-scope.mjs"
    || value.startsWith("scripts/agentic/")
    || value.startsWith(".agentic-framework/schemas/")) return "managed";
  if (SEEDED_EXACT.has(value) || SEEDED_PREFIXES.some((prefix) => value.startsWith(prefix))) return "seeded";
  return null;
}

async function walkFiles(root, relative = "") {
  const directory = relative ? path.join(root, relative) : root;
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, "en"))) {
    const child = relative ? `${relative}/${entry.name}` : entry.name;
    if (child === ".git" || child.startsWith(".git/") || child === MANIFEST_PATH) continue;
    if (entry.isDirectory()) files.push(...await walkFiles(root, child));
    else if (entry.isFile()) files.push(child);
    else throw new Error(`unsupported installation file type: ${child}`);
  }
  return files;
}

export async function createInstallationManifest({ targetRoot, version }) {
  if (typeof targetRoot !== "string" || targetRoot.length === 0) throw new TypeError("targetRoot is required");
  if (typeof version !== "string" || !SEMVER_PATTERN.test(version)) throw new Error("version must be semver");
  const manifestPath = path.join(targetRoot, MANIFEST_PATH);
  try {
    await lstat(manifestPath);
    throw new Error(`installation manifest already exists: ${manifestPath}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const files = [];
  for (const relative of await walkFiles(targetRoot)) {
    const ownership = classifyInstallationPath(relative);
    if (ownership === null || ownership === "local-data") continue;
    const content = await readFile(path.join(targetRoot, relative));
    files.push({ path: relative, ownership, sha256: sha256(content) });
  }
  files.sort((a, b) => a.path.localeCompare(b.path, "en"));
  const manifest = {
    schema_version: 1,
    af_version: version,
    files,
    local_data: [".af-metrics/", ".af-metrics.local.json"],
  };
  await mkdir(path.dirname(manifestPath), { recursive: true, mode: 0o700 });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx", mode: 0o600 });
  return manifest;
}

function gitBuffer(cwd, args) {
  return execFileSync("git", ["-C", cwd, ...args], {
    encoding: "buffer",
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function gitText(cwd, args) {
  return gitBuffer(cwd, args).toString("utf8");
}

function tryGitBuffer(cwd, args) {
  try {
    return gitBuffer(cwd, args);
  } catch {
    return null;
  }
}

function parseManifest(content, label, errors) {
  let manifest;
  try {
    manifest = JSON.parse(content);
  } catch {
    errors.push(`${label} manifest is not valid JSON`);
    return null;
  }
  if (manifest?.schema_version !== 1) errors.push(`${label} manifest has unsupported schema_version`);
  if (typeof manifest?.af_version !== "string" || !SEMVER_PATTERN.test(manifest.af_version)) errors.push(`${label} manifest has invalid af_version`);
  if (!Array.isArray(manifest?.files)) {
    errors.push(`${label} manifest files must be an array`);
    return null;
  }
  const seen = new Set();
  for (const entry of manifest.files) {
    if (!entry || typeof entry !== "object") {
      errors.push(`${label} manifest contains an invalid file entry`);
      continue;
    }
    try {
      assertSafePath(entry.path);
    } catch {
      errors.push(`${label} manifest contains an unsafe path`);
      continue;
    }
    if (seen.has(entry.path)) errors.push(`${label} manifest contains duplicate path: ${entry.path}`);
    seen.add(entry.path);
    const classification = classifyInstallationPath(entry.path);
    if (!["managed", "seeded"].includes(entry.ownership) || classification !== entry.ownership) {
      errors.push(`${label} manifest ownership mismatch: ${entry.path}`);
    }
    if (typeof entry.sha256 !== "string" || !SHA256_PATTERN.test(entry.sha256)) {
      errors.push(`${label} manifest checksum is invalid: ${entry.path}`);
    }
  }
  if (!Array.isArray(manifest.local_data)
    || JSON.stringify(manifest.local_data) !== JSON.stringify([".af-metrics/", ".af-metrics.local.json"])) {
    errors.push(`${label} manifest local_data is invalid`);
  }
  return manifest;
}

function entriesByPath(manifest) {
  return new Map((manifest?.files || []).map((entry) => [entry.path, entry]));
}

export async function checkStagedUpdateScope({ cwd }) {
  const errors = [];
  let paths = [];
  try {
    paths = gitText(cwd, ["diff", "--cached", "--name-only", "-z"])
      .split("\0")
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "en"));
  } catch {
    return { ok: false, errors: ["not a readable Git repository"], paths: [] };
  }

  const baselineBytes = tryGitBuffer(cwd, ["show", `HEAD:${MANIFEST_PATH}`]);
  const candidateBytes = tryGitBuffer(cwd, ["show", `:${MANIFEST_PATH}`]);
  if (!baselineBytes) errors.push("baseline installation manifest is missing");
  if (!candidateBytes) errors.push("candidate installation manifest is missing");
  const baseline = baselineBytes ? parseManifest(baselineBytes.toString("utf8"), "baseline", errors) : null;
  const candidate = candidateBytes ? parseManifest(candidateBytes.toString("utf8"), "candidate", errors) : null;
  const baselineEntries = entriesByPath(baseline);
  const candidateEntries = entriesByPath(candidate);

  for (const entry of baseline?.files || []) {
    if (entry.ownership === "seeded") {
      const candidateEntry = candidateEntries.get(entry.path);
      if (!candidateEntry) errors.push(`seeded manifest entry removed: ${entry.path}`);
      continue;
    }
    if (entry.ownership !== "managed") continue;
    const bytes = tryGitBuffer(cwd, ["show", `HEAD:${entry.path}`]);
    if (!bytes || sha256(bytes) !== entry.sha256) errors.push(`baseline checksum mismatch: ${entry.path}`);
    const candidateEntry = candidateEntries.get(entry.path);
    if (!candidateEntry || candidateEntry.ownership !== "managed") errors.push(`required managed file deleted from candidate manifest: ${entry.path}`);
  }

  for (const entry of candidate?.files || []) {
    if (entry.ownership === "seeded") {
      const baselineEntry = baselineEntries.get(entry.path);
      if (!baselineEntry || baselineEntry.ownership !== "seeded" || baselineEntry.sha256 !== entry.sha256) {
        errors.push(`seeded manifest entry changed during AF update: ${entry.path}`);
      }
      continue;
    }
    if (entry.ownership !== "managed") continue;
    const bytes = tryGitBuffer(cwd, ["show", `:${entry.path}`]);
    if (!bytes) errors.push(`required managed file is missing from candidate index: ${entry.path}`);
    else if (sha256(bytes) !== entry.sha256) errors.push(`candidate checksum mismatch: ${entry.path}`);
  }

  for (const stagedPath of paths) {
    if (stagedPath === MANIFEST_PATH) continue;
    let classification;
    try {
      classification = classifyInstallationPath(stagedPath);
    } catch {
      classification = null;
    }
    const candidateEntry = candidateEntries.get(stagedPath);
    if (classification !== "managed" || candidateEntry?.ownership !== "managed") {
      errors.push(`outside AF managed update scope: ${stagedPath}`);
    }
  }

  return { ok: errors.length === 0, errors: [...new Set(errors)], paths };
}
