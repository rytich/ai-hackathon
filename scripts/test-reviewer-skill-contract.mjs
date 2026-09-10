import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { validateReviewerSkill } from "./validate-reviewer-skill.mjs";

const skillPath = new URL(
  "../.agents/skills/ai-hackathon-reviewer/SKILL.md",
  import.meta.url,
);
const workflowPath = new URL("../.github/workflows/verify.yml", import.meta.url);

function loadSkill() {
  return readFileSync(skillPath, "utf8");
}

function mutate(markdown, from, to) {
  assert.ok(markdown.includes(from), `fixture must contain ${from}`);
  return markdown.replace(from, to);
}

test("accepts the canonical ai-hackathon reviewer contract", () => {
  const contract = validateReviewerSkill(loadSkill());

  assert.equal(contract.schema, "ai-hackathon-reviewer/v1");
  assert.deepEqual(contract.authority, {
    repository: "rytich/ai-hackathon",
    baseBranch: "main",
    reviewerLogin: "knryt",
    verificationCommand: "./scripts/verify.sh",
    skillPath: ".agents/skills/ai-hackathon-reviewer/SKILL.md",
  });
});

const unsafeMutations = [
  [
    "repository allowlist",
    '"repository": "rytich/ai-hackathon"',
    '"repository": "rytich/another-repository"',
    /repository/,
  ],
  ["base branch", '"baseBranch": "main"', '"baseBranch": "develop"', /base branch/],
  ["review identity", '"reviewerLogin": "knryt"', '"reviewerLogin": "rytich"', /reviewer/],
  [
    "required delivery header",
    '"deliveryId",',
    '"omittedDeliveryId",',
    /required input/,
  ],
  [
    "allowed webhook action",
    '"review_requested"',
    '"closed"',
    /allowed action/,
  ],
  [
    "conditional reviewer",
    '"reviewRequestedReviewer": "knryt"',
    '"reviewRequestedReviewer": "*"',
    /requested reviewer/,
  ],
  [
    "recursive review event",
    '"pull_request_review",',
    '"pull_request_review_removed",',
    /denied event/,
  ],
  [
    "operational stop write boundary",
    '"whenOnlyBlocker": "no-pr-write"',
    '"whenOnlyBlocker": "comment"',
    /operational stop/,
  ],
  [
    "approval commit binding",
    '"verifyReturnedCommitId": true',
    '"verifyReturnedCommitId": false',
    /approval/,
  ],
  [
    "self approval guard",
    '"denyReviewerAuthoredPullRequest": true',
    '"denyReviewerAuthoredPullRequest": false',
    /self approval/,
  ],
  [
    "merge head binding",
    '"matchHeadCommit": true',
    '"matchHeadCommit": false',
    /merge/,
  ],
];

for (const [name, from, to, expectedError] of unsafeMutations) {
  test(`rejects an unsafe mutation to ${name}`, () => {
    const markdown = mutate(loadSkill(), from, to);
    assert.throws(() => validateReviewerSkill(markdown), expectedError);
  });
}

test("requires the stable verdict section order", () => {
  const markdown = mutate(
    loadSkill(),
    '"Critical",\n    "Important",',
    '"Important",\n    "Critical",',
  );

  assert.throws(() => validateReviewerSkill(markdown), /verdict section order/);
});

test("runs verify for the four allowed pull request actions with read-only permissions", () => {
  const workflow = readFileSync(workflowPath, "utf8");

  assert.match(workflow, /^name: verify$/m);
  assert.match(workflow, /^  pull_request:$/m);
  assert.match(
    workflow,
    /^    types: \[opened, synchronize, reopened, ready_for_review\]$/m,
  );
  assert.doesNotMatch(workflow, /pull_request_target/);
  assert.match(workflow, /^permissions:\n  contents: read$/m);
  assert.doesNotMatch(workflow, /^\s+\w[\w-]*: write$/m);
  assert.match(workflow, /^  verify:$/m);
  assert.match(workflow, /uses: actions\/checkout@v7/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /AF_VERIFY_PROFILE: generic/);
  assert.match(workflow, /run: \.\/scripts\/verify\.sh/);
});
