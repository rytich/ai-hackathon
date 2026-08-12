import { execFileSync } from "node:child_process";
import {
  appendFile,
  link,
  mkdir,
  readFile,
  readdir,
  realpath,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { assertValidWorkUnit, validateWorkUnit } from "./schema.mjs";

const CONFIG_FILE = "config.json";
const DEFAULT_METRICS_DIR = ".af-metrics";
const MODES = new Set(["project-tracked", "local-only", "dedicated"]);

function gitRoot(cwd) {
  try {
    return execFileSync("git", ["-C", cwd, "rev-parse", "--show-toplevel"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function absoluteFrom(cwd, value) {
  return path.isAbsolute(value) ? path.normalize(value) : path.resolve(cwd, value);
}

export function resolveMetricsDir({ cwd, argvDir, env = process.env, localConfig } = {}) {
  if (!cwd) throw new TypeError("cwd is required");
  const selected = argvDir || env?.AF_METRICS_DIR || localConfig?.metrics_dir || DEFAULT_METRICS_DIR;
  return absoluteFrom(cwd, selected);
}

async function addLocalExclude(repositoryRoot, metricsDir) {
  const [canonicalRoot, canonicalMetricsDir] = await Promise.all([
    realpath(repositoryRoot),
    realpath(metricsDir),
  ]);
  const relative = path.relative(canonicalRoot, canonicalMetricsDir);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("local-only metrics_dir must be inside the current Git repository");
  }

  const excludeFile = path.join(repositoryRoot, ".git", "info", "exclude");
  await mkdir(path.dirname(excludeFile), { recursive: true });
  let content = "";
  try {
    content = await readFile(excludeFile, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const entry = `${relative.split(path.sep).join("/").replace(/\/$/, "")}/`;
  if (!content.split(/\r?\n/).includes(entry)) {
    const prefix = content.length > 0 && !content.endsWith("\n") ? "\n" : "";
    await appendFile(excludeFile, `${prefix}${entry}\n`, { mode: 0o600 });
  }
}

export async function initMetricsStore({
  cwd,
  metricsDir,
  projectId,
  mode,
  acknowledgeRisk = false,
  remoteVisibility = "unknown",
}) {
  if (!cwd) throw new TypeError("cwd is required");
  if (!projectId) throw new TypeError("projectId is required");

  const repositoryRoot = gitRoot(cwd);
  const selectedMode = mode || (repositoryRoot ? "project-tracked" : "dedicated");
  if (!MODES.has(selectedMode)) throw new Error(`unsupported metrics mode: ${selectedMode}`);
  if (selectedMode === "project-tracked" && !repositoryRoot) {
    throw new Error("project-tracked mode requires an existing Git repository");
  }
  if (selectedMode === "project-tracked" && !acknowledgeRisk) {
    throw new Error("project-tracked mode requires --acknowledge-repository-metrics-risk");
  }
  if (selectedMode === "local-only" && !repositoryRoot) {
    throw new Error("local-only mode requires an existing Git repository");
  }

  const selectedDir = metricsDir
    ? absoluteFrom(cwd, metricsDir)
    : resolveMetricsDir({ cwd, env: process.env, localConfig: null });
  await mkdir(selectedDir, { recursive: true, mode: 0o700 });

  if (!repositoryRoot) {
    execFileSync("git", ["init", "--quiet", selectedDir], {
      stdio: ["ignore", "ignore", "ignore"],
    });
  }
  if (selectedMode === "local-only") await addLocalExclude(repositoryRoot, selectedDir);

  const config = {
    schema_version: 1,
    project_id: projectId,
    mode: selectedMode,
    remote_visibility: remoteVisibility,
  };
  const configPath = path.join(selectedDir, CONFIG_FILE);
  try {
    await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, { flag: "wx", mode: 0o600 });
  } catch (error) {
    if (error.code === "EEXIST") throw new Error(`metrics config already exists: ${configPath}`);
    throw error;
  }

  return { metrics_dir: selectedDir, mode: selectedMode };
}

async function readConfig(metricsDir) {
  const configPath = path.join(metricsDir, CONFIG_FILE);
  const config = JSON.parse(await readFile(configPath, "utf8"));
  if (config.schema_version !== 1 || typeof config.project_id !== "string") {
    throw new Error(`invalid metrics config: ${configPath}`);
  }
  return config;
}

export async function recordWorkUnit({ metricsDir, value }) {
  assertValidWorkUnit(value);
  const config = await readConfig(metricsDir);
  if (value.project_id !== config.project_id) {
    throw new Error("work unit project_id does not match metrics config");
  }

  const month = value.recorded_at.slice(0, 7);
  const directory = path.join(metricsDir, "projects", config.project_id, "work-units", month);
  const destination = path.join(directory, `${value.work_unit_id}.json`);
  const temporary = path.join(directory, `.${value.work_unit_id}.${randomUUID()}.tmp`);
  await mkdir(directory, { recursive: true, mode: 0o700 });

  try {
    await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx", mode: 0o600 });
    try {
      await link(temporary, destination);
    } catch (error) {
      if (error.code === "EEXIST") throw new Error(`work unit already exists: ${value.work_unit_id}`);
      throw error;
    }
  } finally {
    try {
      await unlink(temporary);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return destination;
}

async function listJsonFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) files.push(...await listJsonFiles(entryPath));
      else if (entry.isFile() && entry.name.endsWith(".json")) files.push(entryPath);
    }
    return files;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function loadWorkUnits({ metricsDir, projectId }) {
  const directory = path.join(metricsDir, "projects", projectId, "work-units");
  const records = [];
  const errors = [];
  for (const file of await listJsonFiles(directory)) {
    let value;
    try {
      value = JSON.parse(await readFile(file, "utf8"));
    } catch {
      errors.push({ code: "invalid_json", file: path.relative(metricsDir, file) });
      continue;
    }
    const validationErrors = validateWorkUnit(value);
    if (validationErrors.length > 0) {
      errors.push({ code: "invalid_work_unit", file: path.relative(metricsDir, file) });
      continue;
    }
    if (value.project_id !== projectId) {
      errors.push({ code: "project_mismatch", file: path.relative(metricsDir, file) });
      continue;
    }
    records.push(value);
  }
  return { records, errors };
}

export async function validateMetricsStore(options) {
  const result = await loadWorkUnits(options);
  return { records: result.records.length, errors: result.errors };
}
