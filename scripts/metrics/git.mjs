import { execFileSync } from "node:child_process";
import { readFile, realpath } from "node:fs/promises";
import path from "node:path";

function git(cwd, args) {
  try {
    return execFileSync("git", ["-C", cwd, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

async function readMode(metricsDir) {
  try {
    const config = JSON.parse(await readFile(path.join(metricsDir, "config.json"), "utf8"));
    return config.mode;
  } catch {
    return null;
  }
}

export async function inspectGitState({ cwd, metricsDir, remoteVisibility = "unknown" }) {
  const repository = git(metricsDir, ["rev-parse", "--show-toplevel"])
    || git(cwd, ["rev-parse", "--show-toplevel"]);
  let tracked = false;
  let staged = false;
  let remote = null;

  if (repository) {
    const [canonicalRepository, canonicalMetricsDir] = await Promise.all([
      realpath(repository),
      realpath(metricsDir),
    ]);
    const configRelative = path.join(path.relative(canonicalRepository, canonicalMetricsDir), "config.json");
    tracked = git(repository, ["ls-files", "--error-unmatch", "--", configRelative]) !== null;
    const stagedPaths = git(repository, ["diff", "--cached", "--name-only", "--", path.dirname(configRelative)]);
    staged = Boolean(stagedPaths);
    remote = git(repository, ["remote", "get-url", "origin"]);
  }

  const mode = await readMode(metricsDir);
  const warnings = [];
  if (mode === "project-tracked") {
    warnings.push("project-tracked metrics may expose activity timing, profile, model, and artifact references");
  }
  if (remoteVisibility === "public") {
    warnings.push("metrics remote visibility is public; review the privacy-safe fields before every push");
  } else if (remoteVisibility === "unknown") {
    warnings.push("metrics remote visibility is unknown; verify the remote before pushing metrics");
  }
  if (mode === "dedicated" && !remote) {
    warnings.push("dedicated metrics repository has no origin remote; configure a private remote manually");
  }

  return {
    repository,
    tracked,
    staged,
    remote,
    visibility: remoteVisibility,
    warnings,
  };
}
