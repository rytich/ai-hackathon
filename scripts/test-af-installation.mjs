import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  checkStagedUpdateScope,
  classifyInstallationPath,
  createInstallationManifest,
  sha256,
} from "./af-installation.mjs";

function git(cwd, args) {
  return execFileSync("git", ["-C", cwd, ...args], { encoding: "utf8" }).trim();
}

async function write(repo, file, content) {
  const destination = path.join(repo, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

async function freshRepo() {
  const repo = await mkdtemp(path.join(tmpdir(), "af-installation-"));
  git(repo, ["init", "--quiet"]);
  git(repo, ["config", "user.email", "fixture@example.invalid"]);
  git(repo, ["config", "user.name", "AF Fixture"]);
  return repo;
}

async function installedRepo({ corruptBaseline = false } = {}) {
  const repo = await freshRepo();
  await write(repo, "scripts/metrics.mjs", "export const wrapper = 1;\n");
  await write(repo, "scripts/agentic/runtime.mjs", corruptBaseline ? "unauthorized\n" : "export const runtime = 1;\n");
  await write(repo, "AGENTS.md", "# User-owned instructions\n");
  await write(repo, "docs/guide.md", "# Guide\n");
  const manifest = {
    schema_version: 1,
    af_version: "0.2.4",
    files: [
      { path: "AGENTS.md", ownership: "seeded", sha256: sha256("# User-owned instructions\n") },
      { path: "docs/guide.md", ownership: "seeded", sha256: sha256("# Guide\n") },
      { path: "scripts/agentic/runtime.mjs", ownership: "managed", sha256: sha256("export const runtime = 1;\n") },
      { path: "scripts/metrics.mjs", ownership: "managed", sha256: sha256("export const wrapper = 1;\n") },
    ],
    local_data: [".af-metrics/", ".af-metrics.local.json"],
  };
  await write(repo, ".agentic-framework/installation.json", `${JSON.stringify(manifest, null, 2)}\n`);
  git(repo, ["add", "."]);
  git(repo, ["commit", "--quiet", "-m", "install"]);
  return repo;
}

async function stageManagedUpdateAndCandidateManifest(repo) {
  await write(repo, "scripts/agentic/runtime.mjs", "export const runtime = 2;\n");
  const manifestPath = path.join(repo, ".agentic-framework", "installation.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.files.find((entry) => entry.path === "scripts/agentic/runtime.mjs").sha256 = sha256("export const runtime = 2;\n");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  git(repo, ["add", "scripts/agentic/runtime.mjs", ".agentic-framework/installation.json"]);
}

test("classifies only explicit safe installation paths", () => {
  assert.equal(classifyInstallationPath("scripts/agentic/metrics.mjs"), "managed");
  assert.equal(classifyInstallationPath("scripts/metrics.mjs"), "managed");
  assert.equal(classifyInstallationPath(".agentic-framework/schemas/metrics/work-unit.schema.json"), "managed");
  assert.equal(classifyInstallationPath("AGENTS.md"), "seeded");
  assert.equal(classifyInstallationPath("docs/guide.md"), "seeded");
  assert.equal(classifyInstallationPath(".af-metrics/projects/p/work-units/x.json"), "local-data");
  assert.equal(classifyInstallationPath("src/app.js"), null);
  for (const unsafe of ["/tmp/file", "../file", "docs/../file", "docs\\..\\file"]) {
    assert.throws(() => classifyInstallationPath(unsafe), /unsafe installation path/);
  }
});

test("creates a sorted manifest once without application or local data", async () => {
  const targetRoot = await mkdtemp(path.join(tmpdir(), "af-manifest-"));
  await write(targetRoot, "scripts/agentic/metrics.mjs", "runtime\n");
  await write(targetRoot, "scripts/metrics.mjs", "wrapper\n");
  await write(targetRoot, "AGENTS.md", "instructions\n");
  await write(targetRoot, "src/app.js", "application\n");
  await write(targetRoot, ".af-metrics/data.json", "local\n");
  const manifest = await createInstallationManifest({ targetRoot, version: "0.2.4" });
  assert.deepEqual(manifest.files.map((entry) => entry.path), [
    "AGENTS.md",
    "scripts/agentic/metrics.mjs",
    "scripts/metrics.mjs",
  ]);
  assert.equal(manifest.files.every((entry) => /^[a-f0-9]{64}$/.test(entry.sha256)), true);
  assert.deepEqual(manifest.local_data, [".af-metrics/", ".af-metrics.local.json"]);
  await assert.rejects(createInstallationManifest({ targetRoot, version: "0.2.4" }), /already exists/);
});

test("allows a managed-only staged update with a matching candidate manifest", async () => {
  const repo = await installedRepo();
  await stageManagedUpdateAndCandidateManifest(repo);
  const result = await checkStagedUpdateScope({ cwd: repo });
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.paths, [".agentic-framework/installation.json", "scripts/agentic/runtime.mjs"]);
});

test("rejects application, seeded, and metrics paths", async () => {
  for (const file of ["src/app.js", "AGENTS.md", ".af-metrics/projects/p/work-units/x.json"]) {
    const repo = await installedRepo();
    await write(repo, file, "changed\n");
    git(repo, ["add", "-f", file]);
    const result = await checkStagedUpdateScope({ cwd: repo });
    assert.equal(result.ok, false, file);
    assert.match(result.errors.join("\n"), /outside AF managed update scope/);
  }
});

test("rejects a baseline managed file changed without a matching installed checksum", async () => {
  const repo = await installedRepo({ corruptBaseline: true });
  await stageManagedUpdateAndCandidateManifest(repo);
  const result = await checkStagedUpdateScope({ cwd: repo });
  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /baseline checksum/);
});

test("rejects deleted managed runtime and candidate checksum mismatch", async () => {
  const deletedRepo = await installedRepo();
  git(deletedRepo, ["rm", "--quiet", "scripts/agentic/runtime.mjs"]);
  const deleted = await checkStagedUpdateScope({ cwd: deletedRepo });
  assert.equal(deleted.ok, false);
  assert.match(deleted.errors.join("\n"), /candidate manifest|required managed file|deleted/);

  const mismatchRepo = await installedRepo();
  await stageManagedUpdateAndCandidateManifest(mismatchRepo);
  await write(mismatchRepo, "scripts/agentic/runtime.mjs", "different staged bytes\n");
  git(mismatchRepo, ["add", "scripts/agentic/runtime.mjs"]);
  const mismatch = await checkStagedUpdateScope({ cwd: mismatchRepo });
  assert.equal(mismatch.ok, false);
  assert.match(mismatch.errors.join("\n"), /candidate checksum/);
});

test("rejects removal of seeded ownership metadata", async () => {
  const repo = await installedRepo();
  const manifestPath = path.join(repo, ".agentic-framework", "installation.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.files = manifest.files.filter((entry) => entry.path !== "AGENTS.md");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  git(repo, ["add", ".agentic-framework/installation.json"]);
  const result = await checkStagedUpdateScope({ cwd: repo });
  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /seeded manifest entry removed/);
});
