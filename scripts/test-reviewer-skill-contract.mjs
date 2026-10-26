import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  validateRepositoryDocumentation,
  validateReviewerSkill,
} from "./validate-reviewer-skill.mjs";

const skillPath = new URL(
  "../.agents/skills/ai-hackathon-reviewer/SKILL.md",
  import.meta.url,
);
const workflowPath = new URL("../.github/workflows/verify.yml", import.meta.url);
const repositoryRoot = new URL("../", import.meta.url);

function loadRepositoryDocumentation() {
  return {
    agents: readFileSync(new URL("AGENTS.md", repositoryRoot), "utf8"),
    contributing: readFileSync(new URL("CONTRIBUTING.md", repositoryRoot), "utf8"),
    pullRequestTemplate: readFileSync(
      new URL(".github/pull_request_template.md", repositoryRoot),
      "utf8",
    ),
    workflow: readFileSync(
      new URL("docs/development/workflow.md", repositoryRoot),
      "utf8",
    ),
    decision: readFileSync(
      new URL(
        "docs/decisions/2026-09-10-use-hermes-automated-pr-reviewer.md",
        repositoryRoot,
      ),
      "utf8",
    ),
    workNote: readFileSync(
      new URL(
        "docs/work-notes/2026-09-10-issue-2-hermes-pr-review.md",
        repositoryRoot,
      ),
      "utf8",
    ),
  };
}

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
  assert.deepEqual(contract.requiredInputs, {
    always: [
      "baseSha",
      "headSha",
      "pullRequestNumber",
      "taskSummary",
      "approvedDesignPath",
      "approvedPlanPath",
      "reviewRound",
    ],
    webhookTriggered: [
      "deliveryId",
      "webhookEvent",
      "webhookAction",
      "repository",
    ],
    reviewRequested: ["requestedReviewerLogin"],
  });
  assert.deepEqual(contract.reviewRounds, ["initial", "re-review"]);
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
    '"deliveryId"',
    '"omittedDeliveryId"',
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
    "approval event",
    '"event": "APPROVE"',
    '"event": "COMMENT"',
    /approval event/,
  ],
  [
    "approval commit-bound declaration",
    '"commitBound": true',
    '"commitBound": false',
    /commit-bound/,
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
  [
    "merge method",
    '"method": "merge"',
    '"method": "squash"',
    /merge method/,
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
  assert.match(
    workflow,
    /ref: \$\{\{ github\.event\.pull_request\.head\.sha \}\}/,
  );
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /AF_VERIFY_PROFILE: generic/);
  assert.match(workflow, /run: \.\/scripts\/verify\.sh/);
});

test("accepts repository documentation with every review safety boundary", () => {
  assert.doesNotThrow(() =>
    validateRepositoryDocumentation(loadRepositoryDocumentation()),
  );
});

for (const [name, field, phrase] of [
  ["trusted reviewer skill", "agents", ".agents/skills/ai-hackathon-reviewer/SKILL.md"],
  ["bootstrap exception", "agents", "PR #4"],
  ["operational no-write stop", "agents", "Operational stop"],
  ["issue branch PR discipline", "contributing", "1 Issue = 1 branch = 1 PR"],
  ["local verification", "contributing", "./scripts/verify.sh"],
  ["approved plan evidence", "pullRequestTemplate", "Approved implementation plan"],
  ["reviewed head evidence", "pullRequestTemplate", "headRefOid"],
  ["real-use evidence", "pullRequestTemplate", "Real-use Gate"],
  ["security evidence", "pullRequestTemplate", "Security / Secret / Permissions"],
  ["assessment evidence", "pullRequestTemplate", "Reviewer Assessment"],
  ["exact head review", "workflow", "exact base/head"],
  ["stale approval invalidation", "workflow", "stale approval"],
  ["ruleset verification", "workflow", "effective Ruleset"],
  ["atomic merge binding", "workflow", "--match-head-commit"],
  ["issue retention", "workflow", "Issueを自動closeしない"],
  ["staged bootstrap decision", "decision", "段階的ブートストラップ"],
  ["rejected Hermes-first approach", "decision", "Hermes先行"],
  ["decision source", "decision", "https://docs.github.com/"],
  ["issue dependency", "decision", "Issue #3"],
  ["AI profile", "workNote", "AI profile: codex"],
  ["TDD evidence", "workNote", "## TDD"],
  ["human approval boundary", "workNote", "人間承認"],
  ["remaining live work", "workNote", "Issue #3"],
]) {
  test(`rejects repository documentation missing ${name}`, () => {
    const documentation = loadRepositoryDocumentation();
    assert.ok(documentation[field].includes(phrase), `fixture must contain ${phrase}`);
    documentation[field] = documentation[field].replaceAll(phrase, "removed-required-phrase");
    assert.throws(
      () => validateRepositoryDocumentation(documentation),
      /repository documentation/,
    );
  });
}
