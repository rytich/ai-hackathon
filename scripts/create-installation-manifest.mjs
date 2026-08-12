#!/usr/bin/env node

import path from "node:path";
import { pathToFileURL } from "node:url";

import { createInstallationManifest } from "./af-installation.mjs";

const USAGE = "Usage: node scripts/create-installation-manifest.mjs --target <path> --version <semver>\n";

export async function main(argv, context = { cwd: process.cwd(), stdout: process.stdout, stderr: process.stderr }) {
  let target;
  let version;
  for (let index = 0; index < argv.length; index += 2) {
    const option = argv[index];
    const value = argv[index + 1];
    if (!value || !["--target", "--version"].includes(option)) {
      context.stderr.write(USAGE);
      return 2;
    }
    if (option === "--target") target = value;
    else version = value;
  }
  if (!target || !version) {
    context.stderr.write(USAGE);
    return 2;
  }
  try {
    const manifest = await createInstallationManifest({ targetRoot: path.resolve(context.cwd, target), version });
    context.stdout.write(`Created installation manifest with ${manifest.files.length} files.\n`);
    return 0;
  } catch (error) {
    context.stderr.write(`ERROR: ${error.message}\n`);
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main(process.argv.slice(2));
}
