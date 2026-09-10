#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const EXPECTED = {
  authority: {
    repository: "rytich/ai-hackathon",
    baseBranch: "main",
    reviewerLogin: "knryt",
    verificationCommand: "./scripts/verify.sh",
    skillPath: ".agents/skills/ai-hackathon-reviewer/SKILL.md",
  },
  requiredInputs: [
    "deliveryId",
    "webhookEvent",
    "webhookAction",
    "requestedReviewerLogin",
    "repository",
    "pullRequestNumber",
    "baseSha",
    "headSha",
  ],
  allowedActions: [
    "opened",
    "synchronize",
    "reopened",
    "ready_for_review",
    "review_requested",
  ],
  deniedEvents: ["pull_request_review", "issue_comment"],
  verdictSectionOrder: [
    "Review scope",
    "Strengths",
    "Critical",
    "Important",
    "Minor",
    "Operational stop",
    "Assessment",
  ],
};

function fail(message) {
  throw new Error(message);
}

function requireDeepEqual(actual, expected, message) {
  try {
    assert.deepEqual(actual, expected);
  } catch {
    fail(message);
  }
}

export function validateReviewerSkill(markdown) {
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) fail("reviewer frontmatter is missing");
  if (!/^name: ai-hackathon-reviewer$/m.test(frontmatter[1])) {
    fail("reviewer frontmatter name is invalid");
  }
  if (!/^description: Use when /m.test(frontmatter[1])) {
    fail("reviewer frontmatter description must start with Use when");
  }

  const contractBlock = markdown.match(
    /<!-- reviewer-contract:start -->\s*```json\s*([\s\S]*?)```\s*<!-- reviewer-contract:end -->/,
  );
  if (!contractBlock) fail("reviewer contract block is missing");

  let contract;
  try {
    contract = JSON.parse(contractBlock[1]);
  } catch (error) {
    fail(`reviewer contract JSON is invalid: ${error.message}`);
  }

  if (contract.schema !== "ai-hackathon-reviewer/v1") {
    fail("unexpected reviewer contract schema");
  }
  requireDeepEqual(contract.authority, EXPECTED.authority, "repository, base branch, or reviewer authority is invalid");
  requireDeepEqual(contract.requiredInputs?.always, EXPECTED.requiredInputs, "required input contract is invalid");
  if (contract.webhook?.event !== "pull_request") fail("webhook event must be pull_request");
  requireDeepEqual(contract.webhook?.allowedActions, EXPECTED.allowedActions, "allowed action contract is invalid");
  if (contract.webhook?.reviewRequestedReviewer !== "knryt") {
    fail("requested reviewer must be knryt");
  }
  requireDeepEqual(contract.webhook?.deniedEvents, EXPECTED.deniedEvents, "denied event contract is invalid");
  requireDeepEqual(
    contract.verdictSectionOrder,
    EXPECTED.verdictSectionOrder,
    "verdict section order is invalid",
  );
  if (contract.operationalStop?.whenOnlyBlocker !== "no-pr-write") {
    fail("operational stop must prevent PR writes");
  }
  if (contract.approval?.verifyReturnedCommitId !== true) {
    fail("approval must verify returned commit_id");
  }
  if (contract.approval?.denyReviewerAuthoredPullRequest !== true) {
    fail("self approval must be denied");
  }
  if (contract.merge?.matchHeadCommit !== true) {
    fail("merge must be bound to the reviewed head");
  }

  return contract;
}

export function validateReviewerSkillFile(path) {
  return validateReviewerSkill(readFileSync(path, "utf8"));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const path = process.argv[2] ?? ".agents/skills/ai-hackathon-reviewer/SKILL.md";
  validateReviewerSkillFile(path);
  process.stdout.write(`PASS: ${path}\n`);
}
