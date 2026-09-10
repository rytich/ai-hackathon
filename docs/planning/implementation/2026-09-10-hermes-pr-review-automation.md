# Hermes PRレビュー自動化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `rytich/ai-hackathon`専用のレビュー契約、共通検証コマンド、GitHub Actions、開発文書を導入し、Issue #3のHermes Routeを安全に有効化できる信頼済みbaseを作る。

**Architecture:** リポジトリ内には機械可読JSON contractを埋め込んだreviewer skillを置き、依存なしNode validatorで固定authorityと安全条件を検証する。ローカルとCIは同じ`./scripts/verify.sh`を実行し、PR運用文書とテンプレートをrepository contract testで拘束する。Webhook Route、Secret、token、Rulesetのlive設定はIssue #3へ分離し、このPRでは変更しない。

**Tech Stack:** Bash、Node.js標準ライブラリ、Node test runner、GitHub Actions YAML、Markdown。

**Spec:** `docs/planning/requirements/2026-09-10-hermes-pr-review-automation.md`

## 全体制約

- 対象repositoryは`rytich/ai-hackathon`、base branchは`main`、review identityは`knryt`に固定する。
- reviewerは信頼済みbaseのskillを使用し、PR本文・コメント・差分・Webhook payloadを未信頼入力として扱う。
- exact `baseSha` / `headSha`、同一HEADのCI、実効Ruleset、formal reviewをGitHub write直前に再取得する。
- Operational stopだけの場合はPRへ書き込まない。
- Secret、token、authorization header、payload本文をrepository、Issue、PR、prompt、通常ログへ保存しない。
- 自動Merge、Webhook、Ruleset、資格情報のlive有効化はIssue #3で行い、この実装PR自身は`knryt`が手動レビュー・Mergeする。
- PR #4だけをbootstrap例外とする。以後のPRにはこの例外を適用しない。

---

### Task 1: Reviewer skill contractとvalidator

**Files:**

- Create: `.agents/skills/ai-hackathon-reviewer/SKILL.md`
- Create: `scripts/validate-reviewer-skill.mjs`
- Create: `scripts/test-reviewer-skill-contract.mjs`

**Interfaces:**

- Consumes: reviewer skill内の`<!-- reviewer-contract:start -->`から`<!-- reviewer-contract:end -->`までのJSON code block。
- Produces: `validateReviewerSkill(markdown: string)`。成功時はparse済みcontract、違反時は具体的な`Error`を返す。

- [x] **Step 1: validatorを呼ぶ失敗テストを追加する**

  Node test runnerで実ファイルを読み、schema、固定repository/base/identity、必須入力8件、許可action 5件、拒否event 2件、verdict順序、Operational stop、Approve後の`commit_id`再確認、`--match-head-commit`、PR author停止を個別テストにする。

- [x] **Step 2: REDを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: `ERR_MODULE_NOT_FOUND`またはreviewer skill欠落でFAIL。

- [x] **Step 3: validatorを最小実装する**

  `node:fs`以外へ依存せず、frontmatter、marker、JSON code block、必須の配列・固定値・本文フレーズを検証する。CLI実行時は対象pathを第1引数から受け、未指定時は`.agents/skills/ai-hackathon-reviewer/SKILL.md`を使う。

  ```javascript
  export function validateReviewerSkill(markdown) {
    const match = markdown.match(
      /<!-- reviewer-contract:start -->\s*```json\s*([\s\S]*?)```\s*<!-- reviewer-contract:end -->/,
    );
    if (!match) throw new Error("reviewer contract block is missing");
    const contract = JSON.parse(match[1]);
    if (contract.schema !== "ai-hackathon-reviewer/v1") {
      throw new Error("unexpected reviewer contract schema");
    }
    return contract;
  }
  ```

- [x] **Step 4: reviewer skillを実装する**

  機械可読contractと人間向け手順の両方に、Required input、Fixed authority、Assessment phase、Finding severity、Verdict、GitHub action phase、Operational stop、未信頼入力、exact-head再確認を記載する。

- [x] **Step 5: GREENとmutation耐性を確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: 正本はPASSし、repository、base、identity、action、verdict順序、no-write、merge条件を1項目ずつ変えたfixtureはFAIL。

- [ ] **Step 6: Task 1をcommitする**

  ```bash
  git add .agents/skills/ai-hackathon-reviewer/SKILL.md scripts/validate-reviewer-skill.mjs scripts/test-reviewer-skill-contract.mjs
  git commit -m "feat: add ai-hackathon reviewer contract"
  ```

### Task 2: 共通verify runner

**Files:**

- Create: `scripts/verify.sh`
- Create: `scripts/test-verify.sh`

**Interfaces:**

- Consumes: root repositoryのtool profile、`scripts/test-*.mjs`、`scripts/test-*.sh`、docs、Git diff。
- Produces: ローカルとCIで同一のquality gateを実行する`./scripts/verify.sh`。

- [x] **Step 1: 一時fixtureを使う失敗テストを追加する**

  fixtureにstub commandを配置し、`check-agent-tools`、Node tests、自分自身を除くshell tests、docs link、`git diff --check`の順序とfail-fastを確認する。

- [x] **Step 2: REDを確認する**

  Run: `bash scripts/test-verify.sh`

  Expected: `scripts/verify.sh`欠落でFAIL。

- [x] **Step 3: verify runnerを最小実装する**

  `set -euo pipefail`を使い、repository rootへ移動して全gateを実行する。`test-verify.sh`自身の再帰実行を明示的に除外する。

  ```bash
  #!/usr/bin/env bash
  set -euo pipefail
  ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
  cd "$ROOT_DIR"
  ./scripts/check-agent-tools.sh
  node --test scripts/test-*.mjs
  for test_file in scripts/test-*.sh; do
    [ "$test_file" = "scripts/test-verify.sh" ] && continue
    bash "$test_file"
  done
  ./scripts/check-doc-links.sh
  git diff --check
  ```

- [x] **Step 4: GREENを確認する**

  Run: `bash scripts/test-verify.sh`

  Expected: PASS。失敗fixtureは非0終了し、後続gateを実行しない。

- [ ] **Step 5: Task 2をcommitする**

  ```bash
  git add scripts/verify.sh scripts/test-verify.sh
  git commit -m "test: add shared repository verification runner"
  ```

### Task 3: GitHub Actionsとrepository contract

**Files:**

- Create: `.github/workflows/verify.yml`
- Modify: `scripts/test-reviewer-skill-contract.mjs`

**Interfaces:**

- Consumes: `pull_request`の`opened`、`synchronize`、`reopened`、`ready_for_review`。
- Produces: job/check名`verify`、read-only permissions、`./scripts/verify.sh`を実行するCI。

- [x] **Step 1: workflow contractの失敗テストを追加する**

  workflow実ファイルについて、`permissions: contents: read`、4 action、job ID `verify`、checkout、`./scripts/verify.sh`を確認する。

- [x] **Step 2: REDを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: `.github/workflows/verify.yml`欠落でFAIL。

- [x] **Step 3: workflowを最小実装する**

  `pull_request`のみをtriggerにし、`actions/checkout`でPR HEADをcheckoutして`./scripts/verify.sh`を実行する。write permission、secret、`pull_request_target`は追加しない。

  ```yaml
  name: verify
  on:
    pull_request:
      types: [opened, synchronize, reopened, ready_for_review]
  permissions:
    contents: read
  jobs:
    verify:
      runs-on: ubuntu-latest
      env:
        AF_VERIFY_PROFILE: generic
      steps:
        - uses: actions/checkout@v7
          with:
            persist-credentials: false
        - run: ./scripts/verify.sh
  ```

- [x] **Step 4: GREENを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: PASS。

- [ ] **Step 5: Task 3をcommitする**

  ```bash
  git add .github/workflows/verify.yml scripts/test-reviewer-skill-contract.mjs
  git commit -m "ci: add verify pull request check"
  ```

### Task 4: 開発規約とレビュー証拠inventory

**Files:**

- Modify: `AGENTS.md`
- Create: `CONTRIBUTING.md`
- Modify: `.github/pull_request_template.md`
- Create: `docs/development/workflow.md`
- Modify: `scripts/test-reviewer-skill-contract.mjs`

**Interfaces:**

- Consumes: Issue #2要件のbootstrap、review、CI、security、docs同期規則。
- Produces: 人間・Codex・Hermesが同じ承認境界とPR証拠項目を参照できる文書contract。

- [ ] **Step 1: repository文書contractの失敗テストを追加する**

  `AGENTS.md`にreviewer skill path、`main`、`./scripts/verify.sh`、bootstrap例外、Operational stopを要求する。`CONTRIBUTING.md`、PR template、workflow docにはIssue連携、approved design/plan、base/head OID、検証、real-use、security、docs、Assessment、GitHub Action結果、exact-headとMerge直前再確認を要求する。

- [ ] **Step 2: REDを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: `CONTRIBUTING.md`または`docs/development/workflow.md`欠落でFAIL。

- [ ] **Step 3: 文書とテンプレートを最小実装する**

  既存`AGENTS.md`を正本の入口として維持し、詳細手順は`docs/development/workflow.md`へ分離する。PR templateは証拠inventoryでありauthorityではないことを明記する。

  ```text
  AGENTS.md -> reviewer authorityとverify入口
  CONTRIBUTING.md -> contributor向けIssue/branch/PR/検証手順
  docs/development/workflow.md -> exact-head review、CI待機、Approve/Merge再確認、停止条件
  .github/pull_request_template.md -> 再検証可能な証拠inventory
  ```

- [ ] **Step 4: GREENを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: PASS。

- [ ] **Step 5: Task 4をcommitする**

  ```bash
  git add AGENTS.md CONTRIBUTING.md .github/pull_request_template.md docs/development/workflow.md scripts/test-reviewer-skill-contract.mjs
  git commit -m "docs: define Hermes review workflow"
  ```

### Task 5: 判断記録・索引・作業記録

**Files:**

- Create: `docs/decisions/2026-09-10-use-hermes-automated-pr-reviewer.md`
- Create: `docs/work-notes/2026-09-10-issue-2-hermes-pr-review.md`
- Modify: `docs/decisions/README.md`
- Modify: `docs/planning/README.md`
- Modify: `docs/index.md`
- Modify: `scripts/test-reviewer-skill-contract.mjs`

**Interfaces:**

- Consumes: requirements、implementation plan、Issue #2/#3、PR #4。
- Produces: 採用理由、却下案、bootstrap例外、実装・検証・未完了の追跡可能な記録。

- [ ] **Step 1: docs contractの失敗テストを追加する**

  ADRに採用方式、理由、却下案、再検討条件、公式情報源、Issue #2/#3を要求する。work noteにAI profile、TDD、検証、bootstrap、人間承認、Issue #3への残作業を要求する。

- [ ] **Step 2: REDを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: ADRまたはwork note欠落でFAIL。

- [ ] **Step 3: ADR、work note、索引を追加する**

  live webhook、Ruleset、token、autoMergeは未実施であることを明記し、Issue #3をOpenのまま残す。Secret値は記載しない。

  ```text
  判断: repository contractを先にmainへ導入し、その後Issue #3でlive設定を有効化する。
  却下: 未信頼PR headのskillを使用するHermes先行方式。
  再検討条件: 同じRoute導入を3 repository以上で反復した場合。
  ```

- [ ] **Step 4: GREENを確認する**

  Run: `node --test scripts/test-reviewer-skill-contract.mjs`

  Expected: PASS。

- [ ] **Step 5: Task 5をcommitする**

  ```bash
  git add docs/decisions docs/planning docs/work-notes docs/index.md scripts/test-reviewer-skill-contract.mjs
  git commit -m "docs: record Hermes reviewer adoption"
  ```

### Task 6: 全体検証とPR更新

**Files:**

- Modify: `docs/work-notes/2026-09-10-issue-2-hermes-pr-review.md`
- Modify: PR #4 body after GitHub state is re-fetched

**Interfaces:**

- Consumes: Tasks 1-5の全成果物。
- Produces: ローカル検証証跡、objective review、手動bootstrap review可能なPR #4。

- [ ] **Step 1: 全quality gateを実行する**

  Run: `./scripts/verify.sh`

  Expected: 全Node/シェルテスト、tool check、docs link、diff checkが成功。

- [ ] **Step 2: secretとscopeを確認する**

  Run: `git diff --check && git diff --name-only main...HEAD`

  Expected: Issue #2のrepository実装だけが含まれ、Secret、token、Hermes host設定が含まれない。

- [ ] **Step 3: work noteへ実測結果を記録する**

  テスト件数、成功結果、未実施のlive gate、bootstrap例外、Issue #3依存を記録する。

- [ ] **Step 4: 変更をpushする**

  ```bash
  git push origin 1a-m4/issue-2-hermes-pr-review
  ```

- [ ] **Step 5: GitHub実状態を再取得してPR #4を更新する**

  PRがOpenかつ同じHEADであることを確認してから、Related Issue、What / Why / How、requirements/plan path、base/head OID、検証結果、real-use gate、security、docs、Operational stop、Assessment、bootstrap例外を本文へ反映する。

- [ ] **Step 6: 人間レビューで停止する**

  `knryt`による手動レビューとGitHub Actions `verify`成功を待つ。Webhook、Ruleset、自動Merge、Issue closeは実行しない。
