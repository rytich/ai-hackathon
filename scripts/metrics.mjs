#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { MetricsValidationError } from "./metrics/schema.mjs";
import {
  initMetricsStore,
  loadWorkUnits,
  recordWorkUnit,
  resolveMetricsDir,
  validateMetricsStore,
} from "./metrics/storage.mjs";
import { buildMetricsReport, writeMetricsReport } from "./metrics/report.mjs";
import { inspectGitState } from "./metrics/git.mjs";

const USAGE = `Usage:
  node scripts/metrics.mjs init --project-id <slug> [--mode project-tracked|local-only|dedicated] [--metrics-dir <path>] [--remote-visibility private|public|unknown] [--acknowledge-repository-metrics-risk]
  node scripts/metrics.mjs record --input <path|-> [--metrics-dir <path>]
  node scripts/metrics.mjs validate [--metrics-dir <path>] [--project-id <slug>]
  node scripts/metrics.mjs report [--metrics-dir <path>] [--project-id <slug>] [--generated-at <iso8601>]
  node scripts/metrics.mjs doctor [--metrics-dir <path>] [--completion-warning]
`;

class UsageError extends Error {}

function parseOptions(args, definitions) {
  const options = {};
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    const definition = definitions[token];
    if (!definition) throw new UsageError(`unsupported option: ${token}`);
    if (definition.boolean) {
      options[definition.key] = true;
      continue;
    }
    const value = args[index + 1];
    if (value === undefined || value.startsWith("--")) throw new UsageError(`missing value for ${token}`);
    options[definition.key] = value;
    index += 1;
  }
  return options;
}

async function readLocalConfig(cwd) {
  try {
    return JSON.parse(await readFile(path.join(cwd, ".af-metrics.local.json"), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    if (error instanceof SyntaxError) throw new Error("local metrics config is not valid JSON");
    throw error;
  }
}

async function metricsDirFor(context, argvDir) {
  return resolveMetricsDir({
    cwd: context.cwd,
    argvDir,
    env: context.env,
    localConfig: await readLocalConfig(context.cwd),
  });
}

async function readStoreConfig(metricsDir) {
  let config;
  try {
    config = JSON.parse(await readFile(path.join(metricsDir, "config.json"), "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("metrics config is not valid JSON");
    throw error;
  }
  if (config.schema_version !== 1) throw new UsageError("unsupported metrics config schema version");
  if (typeof config.project_id !== "string") throw new Error("metrics config project_id is invalid");
  return config;
}

function writeJson(stream, value) {
  stream.write(`${JSON.stringify(value, null, 2)}\n`);
}

async function readStandardInput() {
  let content = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) content += chunk;
  return content;
}

async function initCommand(args, context) {
  const options = parseOptions(args, {
    "--project-id": { key: "projectId" },
    "--mode": { key: "mode" },
    "--metrics-dir": { key: "metricsDir" },
    "--remote-visibility": { key: "remoteVisibility" },
    "--acknowledge-repository-metrics-risk": { key: "acknowledgeRisk", boolean: true },
  });
  if (!options.projectId) throw new UsageError("--project-id is required");
  if (options.remoteVisibility && !["private", "public", "unknown"].includes(options.remoteVisibility)) {
    throw new UsageError("unsupported --remote-visibility");
  }
  const result = await initMetricsStore({
    cwd: context.cwd,
    metricsDir: await metricsDirFor(context, options.metricsDir),
    projectId: options.projectId,
    mode: options.mode,
    acknowledgeRisk: Boolean(options.acknowledgeRisk),
    remoteVisibility: options.remoteVisibility || "unknown",
  });
  writeJson(context.stdout, result);
}

async function recordCommand(args, context) {
  const options = parseOptions(args, {
    "--input": { key: "input" },
    "--metrics-dir": { key: "metricsDir" },
  });
  if (!options.input) throw new UsageError("--input is required");
  const metricsDir = await metricsDirFor(context, options.metricsDir);
  let text;
  if (options.input === "-") text = context.stdinText;
  else text = await readFile(path.resolve(context.cwd, options.input), "utf8");
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error("work unit input is not valid JSON");
  }
  const destination = await recordWorkUnit({ metricsDir, value });
  writeJson(context.stdout, { recorded: path.relative(metricsDir, destination) });
}

async function validateCommand(args, context) {
  const options = parseOptions(args, {
    "--metrics-dir": { key: "metricsDir" },
    "--project-id": { key: "projectId" },
  });
  const metricsDir = await metricsDirFor(context, options.metricsDir);
  const config = await readStoreConfig(metricsDir);
  const projectId = options.projectId || config.project_id;
  if (projectId !== config.project_id) throw new Error("project_id does not match metrics config");
  const result = await validateMetricsStore({ metricsDir, projectId });
  writeJson(context.stdout, result);
  if (result.errors.length > 0) throw new Error("metrics store validation failed");
}

async function reportCommand(args, context) {
  const options = parseOptions(args, {
    "--metrics-dir": { key: "metricsDir" },
    "--project-id": { key: "projectId" },
    "--generated-at": { key: "generatedAt" },
  });
  const metricsDir = await metricsDirFor(context, options.metricsDir);
  const config = await readStoreConfig(metricsDir);
  const projectId = options.projectId || config.project_id;
  if (projectId !== config.project_id) throw new Error("project_id does not match metrics config");
  const generatedAt = options.generatedAt || context.now();
  if (Number.isNaN(Date.parse(generatedAt))) throw new UsageError("--generated-at must be ISO 8601");
  const loaded = await loadWorkUnits({ metricsDir, projectId });
  if (loaded.errors.length > 0) throw new Error("metrics store contains invalid work units; run validate");
  const report = buildMetricsReport(loaded.records, { generatedAt });
  const paths = await writeMetricsReport({
    metricsDir,
    projectId,
    report,
    formats: ["markdown", "json", "jsonl"],
  });
  writeJson(context.stdout, { reports: paths.map((value) => path.relative(metricsDir, value)) });
}

async function doctorCommand(args, context) {
  const options = parseOptions(args, {
    "--metrics-dir": { key: "metricsDir" },
    "--completion-warning": { key: "completionWarning", boolean: true },
  });
  const metricsDir = await metricsDirFor(context, options.metricsDir);
  const config = await readStoreConfig(metricsDir);
  const state = await inspectGitState({
    cwd: context.cwd,
    metricsDir,
    remoteVisibility: config.remote_visibility,
  });
  context.stdout.write(`Repository: ${state.repository || "none"}\n`);
  context.stdout.write(`Tracked: ${state.tracked}\nStaged: ${state.staged}\n`);
  context.stdout.write(`Remote: ${state.remote || "none"}\nVisibility: ${state.visibility}\n`);
  for (const warning of state.warnings) context.stdout.write(`WARNING: ${warning}\n`);
  if (options.completionWarning && config.mode === "project-tracked" && !state.tracked) {
    context.stdout.write("WARNING: metrics are not tracked; commit them only after reviewing repository visibility\n");
  }
  if (config.mode === "dedicated" && !state.remote) {
    const repositoryName = path.basename(metricsDir);
    context.stdout.write(`NEXT: gh repo create ${repositoryName} --private --source ${metricsDir} --remote origin\n`);
    context.stdout.write(`NEXT: git -C ${metricsDir} remote add origin <private-remote-url>\n`);
  }
}

export async function main(argv, suppliedContext) {
  let stdinText = "";
  if (!suppliedContext && argv[0] === "record") {
    const inputIndex = argv.indexOf("--input");
    if (inputIndex !== -1 && argv[inputIndex + 1] === "-") stdinText = await readStandardInput();
  }
  const context = suppliedContext || {
    cwd: process.cwd(),
    env: process.env,
    stdinText,
    stdout: process.stdout,
    stderr: process.stderr,
    now: () => new Date().toISOString(),
  };
  try {
    const [command, ...args] = argv;
    if (command === "--help" || command === "-h" || command === "help") {
      context.stdout.write(USAGE);
      return 0;
    }
    if (!command) throw new UsageError("command is required");
    if (command === "init") await initCommand(args, context);
    else if (command === "record") await recordCommand(args, context);
    else if (command === "validate") await validateCommand(args, context);
    else if (command === "report") await reportCommand(args, context);
    else if (command === "doctor") await doctorCommand(args, context);
    else throw new UsageError(`unsupported command: ${command}`);
    return 0;
  } catch (error) {
    const unsupportedSchema = error instanceof MetricsValidationError
      && error.errors.some((item) => item.code === "unsupported_schema");
    const usage = error instanceof UsageError || unsupportedSchema;
    context.stderr.write(`ERROR: ${error.message}\n`);
    if (usage) context.stderr.write(USAGE);
    return usage ? 2 : 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main(process.argv.slice(2));
}
