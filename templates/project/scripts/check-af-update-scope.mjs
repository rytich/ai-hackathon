#!/usr/bin/env node

import { main } from "./agentic/check-af-update-scope.mjs";

process.exitCode = await main(process.argv.slice(2));
