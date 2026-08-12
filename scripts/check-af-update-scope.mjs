#!/usr/bin/env node

import { pathToFileURL } from "node:url";

import { checkStagedUpdateScope } from "./af-installation.mjs";

const USAGE = "Usage: node scripts/check-af-update-scope.mjs --staged\n";

export async function main(argv, context = { cwd: process.cwd(), stdout: process.stdout, stderr: process.stderr }) {
  if (argv.length !== 1 || argv[0] !== "--staged") {
    context.stderr.write(USAGE);
    return 2;
  }
  const result = await checkStagedUpdateScope({ cwd: context.cwd });
  if (!result.ok) {
    for (const error of result.errors) context.stderr.write(`ERROR: ${error}\n`);
    return 1;
  }
  context.stdout.write(`AF update scope verified for ${result.paths.length} staged path(s).\n`);
  context.stdout.write("Commit the AF-only update manually after reviewing the staged diff; this command does not commit or push.\n");
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main(process.argv.slice(2));
}
