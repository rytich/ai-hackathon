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
    const metricsRelative = path.relative(canonicalRepository, canonicalMetricsDir);
    const pathspec = metricsRelative || ".";
    const trackedPaths = git(repository, ["ls-files", "--", pathspec]);
    tracked = Boolean(trackedPaths);
    const stagedPaths = git(repository, ["diff", "--cached", "--name-only", "--", pathspec]);
    staged = Boolean(stagedPaths);
    remote = git(repository, ["remote", "get-url", "origin"]);
  }

  const mode = await readMode(metricsDir);
  const warnings = [];
  if (mode === "project-tracked") {
    warnings.push("project-tracked metrics may expose activity timing, profile, model, and artifact references");
  }
  if (mode === "local-only" && tracked) {
    warnings.push("local-only metrics files are tracked; unstage them and remove them from the Git index before committing");
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
