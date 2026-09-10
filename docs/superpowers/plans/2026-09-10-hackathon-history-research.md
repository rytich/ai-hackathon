# 第1〜4回 AI Agent Hackathon 調査データ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 第1〜4回の公式提出作品589件と受賞情報を、根拠URL付きのJSON・CSV・Markdownとして収集する。

**Architecture:** Zenn公式ページの `__NEXT_DATA__` から各回の `hackathon.projects` と `hackathon.resultMarkdown` を取得し、調査用スクリプトで正規化する。調査データは `data/hackathons/`、説明と一次情報は `docs/planning/research/hackathons/`、収集・検証ツールは `scripts/research/` に置き、プロダクトコード用の `src/` とは分離する。

**Tech Stack:** Node.js 標準ライブラリ、JSON Schema Draft 2020-12、CSV、Markdown、Node.js test runner

**Spec:** `docs/superpowers/specs/2026-09-10-hackathon-history-research-design.md`

## Global Constraints

- 確定値の一次情報はZenn公式ハッカソンページと、そこからリンクされた提出記事だけに限定する。
- 公式情報で確認できない値は推測せず `null` または空配列にする。
- 作品名と賞名は公式表示を保存し、恣意的に改名・統合しない。
- 各レコードへ公式一覧URLと確認日 `2026-09-10` を保存する。
- 調査データと調査文書を `src/` に置かない。
- 非受賞作品の記事本文は全件取得せず、公式一覧の情報で `official-list-only` とする。
- 受賞作品だけ提出記事を確認し、本文から明示的に確認できるGitHub、デモ、主要技術を追加する。

---

### Task 1: 正規化スキーマと検証契約

**Files:**
- Create: `data/hackathons/schema.json`
- Create: `scripts/research/validate-hackathon-data.mjs`
- Create: `scripts/research/validate-hackathon-data.test.mjs`

**Interfaces:**
- Consumes: `data/hackathons/projects.json` と `data/hackathons/projects.csv`
- Produces: `validateDataset(dataset, csvText)`。違反一覧を返し、CLIでは違反があれば終了コード1にする。

- [ ] **Step 1: 失敗する検証テストを書く**

`node:test` で次を固定する。

```javascript
test("edition と entry_order の重複を拒否する", () => {
  const errors = validateDataset(datasetWithDuplicateKey, matchingCsv);
  assert.ok(errors.some((error) => error.includes("duplicate edition+entry_order")));
});

test("JSON と CSV の件数差を拒否する", () => {
  const errors = validateDataset(validDataset, headerOnlyCsv);
  assert.ok(errors.some((error) => error.includes("JSON/CSV row count mismatch")));
});

test("必須URLと確認日の欠落を拒否する", () => {
  const errors = validateDataset(datasetWithoutSources, matchingCsv);
  assert.ok(errors.some((error) => error.includes("required field")));
});
```

- [ ] **Step 2: テストが未実装エラーで失敗することを確認する**

Run: `node --test scripts/research/validate-hackathon-data.test.mjs`

Expected: `ERR_MODULE_NOT_FOUND` または `validateDataset is not defined` を含む失敗。

- [ ] **Step 3: schema.json と最小検証器を実装する**

`schema.json` は設計書の全フィールド、型、`participant_type` と `verification_status` の列挙値、`edition` の1〜4、日付形式、URL形式を定義する。検証器は標準ライブラリだけで次を検査する。

```javascript
export function validateDataset(dataset, csvText) {
  const errors = [];
  // top-level schema_version / checked_at / projects
  // record required fields and primitive types
  // unique `${edition}:${entry_order}`
  // JSON count equals parsed CSV data row count
  // CSV keys equal JSON edition+entry_order+article_url keys
  return errors;
}
```

- [ ] **Step 4: 検証テストを通す**

Run: `node --test scripts/research/validate-hackathon-data.test.mjs`

Expected: 3 tests passed、0 failed。

- [ ] **Step 5: Task 1 をコミットする**

```bash
git add data/hackathons/schema.json scripts/research/validate-hackathon-data.mjs scripts/research/validate-hackathon-data.test.mjs
git commit -m "test: define hackathon research data contract"
```

### Task 2: 公式一覧と受賞情報の抽出器

**Files:**
- Create: `scripts/research/collect-hackathon-data.mjs`
- Create: `scripts/research/collect-hackathon-data.test.mjs`

**Interfaces:**
- Consumes: Zenn公式ページHTML。HTML内の `script#__NEXT_DATA__` にある `props.pageProps.hackathon`。
- Produces: `extractNextData(html)`、`normalizeProjects(hackathon, edition, sourceUrl, checkedAt)`、`extractAwards(resultMarkdown)`、`toCsv(projects)`。

- [ ] **Step 1: 公式ページの縮小fixtureを使う失敗テストを書く**

テスト内に個人作品、チーム作品、2種類の賞を含む最小 `__NEXT_DATA__` HTMLを文字列fixtureとして置き、次を検証する。

```javascript
assert.equal(records[0].participant_type, "individual");
assert.equal(records[1].participant_type, "team");
assert.deepEqual(records[1].awards, ["優秀賞"]);
assert.equal(records[0].entry_order, 1);
assert.match(toCsv(records), /^edition,entry_order,/);
```

- [ ] **Step 2: 抽出器未実装で失敗することを確認する**

Run: `node --test scripts/research/collect-hackathon-data.test.mjs`

Expected: importまたはexport不足による失敗。

- [ ] **Step 3: 一覧・賞・CSV抽出を実装する**

- `extractNextData` はnonceなど追加属性を許容する `<script id="__NEXT_DATA__"[^>]*>` を扱う。
- `normalizeProjects` は `hackathon.projects` の順序を維持し、`projectName`、`teamName`、`url`、`description` を正規化する。
- `extractAwards` は `### 賞名` から次の `###` までのMarkdownリンクを拾い、記事URLをキーに賞名を対応付ける。
- 結果発表内の重複した裸URLは無視する。
- CSVはRFC 4180形式で引用符、改行、カンマをエスケープし、配列は ` | ` で連結する。

- [ ] **Step 4: 抽出テストを通す**

Run: `node --test scripts/research/collect-hackathon-data.test.mjs`

Expected: 個人/チーム、賞、順序、CSVの全テストが成功。

- [ ] **Step 5: Task 2 をコミットする**

```bash
git add scripts/research/collect-hackathon-data.mjs scripts/research/collect-hackathon-data.test.mjs
git commit -m "feat: add official hackathon project collector"
```

### Task 3: 第1〜4回の公式データ生成

**Files:**
- Create: `data/hackathons/projects.json`
- Create: `data/hackathons/projects.csv`
- Create locally and do not commit: `.cache/hackathons/vol-1.html`
- Create locally and do not commit: `.cache/hackathons/vol-2.html`
- Create locally and do not commit: `.cache/hackathons/vol-3.html`
- Create locally and do not commit: `.cache/hackathons/vol-4.html`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: 4つの公式projectsタブURL。
- Produces: `projects.json` と `projects.csv`。期待件数は第1回128、第2回158、第3回108、第4回195、合計589。

- [ ] **Step 1: `.cache/hackathons/` を追跡対象外にする**

`.gitignore` に `/.cache/hackathons/` を追加する。キャッシュは取得失敗時の再試行を減らすためにのみ使い、成果物にしない。

- [ ] **Step 2: 4つの公式ページを順次取得する**

Run:

```bash
node scripts/research/collect-hackathon-data.mjs \
  --checked-at 2026-09-10 \
  --output data/hackathons/projects.json \
  --csv-output data/hackathons/projects.csv
```

Expected: 4 URLのHTTP 200、`128 + 158 + 108 + 195 = 589` records written。1ページずつ取得し、リクエスト間隔を500ms以上空ける。

- [ ] **Step 3: 件数と一意性を検証する**

Run: `node scripts/research/validate-hackathon-data.mjs data/hackathons/projects.json data/hackathons/projects.csv`

Expected:

```text
edition 1: 128
edition 2: 158
edition 3: 108
edition 4: 195
total: 589
errors: 0
```

- [ ] **Step 4: 受賞対応付けの未解決を確認する**

Run: `node scripts/research/collect-hackathon-data.mjs --report-award-mismatches data/hackathons/projects.json`

Expected: 公式結果発表内の受賞記事URLがすべて提出一覧に対応し、`award mismatches: 0`。不一致があれば作品名で自動確定せず、URLと候補名を調査メモへ残す。

- [ ] **Step 5: Task 3 をコミットする**

```bash
git add .gitignore data/hackathons/projects.json data/hackathons/projects.csv
git commit -m "data: collect hackathon submissions from volumes 1 to 4"
```

### Task 4: 受賞作品の記事確認と外部リンク補足

**Files:**
- Modify: `data/hackathons/projects.json`
- Modify: `data/hackathons/projects.csv`
- Modify: `scripts/research/collect-hackathon-data.mjs`
- Modify: `scripts/research/collect-hackathon-data.test.mjs`

**Interfaces:**
- Consumes: `awards.length > 0` の提出記事。
- Produces: 受賞作品の `github_urls`、`demo_urls`、`technologies`、`verification_status: article-checked`。

- [ ] **Step 1: URL分類と技術語抽出の失敗テストを書く**

```javascript
assert.deepEqual(classifyLinks(articleHtml).githubUrls, ["https://github.com/example/project"]);
assert.deepEqual(classifyLinks(articleHtml).demoUrls, ["https://example.run.app"]);
assert.deepEqual(extractExplicitTechnologies(articleText), ["Cloud Run", "Gemini API"]);
```

技術語は `Cloud Run`、`Cloud Functions`、`App Engine`、`GKE`、`Compute Engine`、`Vertex AI`、`Gemini API`、`Gemma`、`Imagen`、`Veo`、`ADK`、`Firebase`、`Flutter` の完全一致辞書だけを使う。

- [ ] **Step 2: 新規テストが失敗することを確認する**

Run: `node --test scripts/research/collect-hackathon-data.test.mjs`

Expected: `classifyLinks` または `extractExplicitTechnologies` 未実装による失敗。

- [ ] **Step 3: 受賞記事だけを取得・補足する処理を実装する**

- GitHub URLは `github.com` のHTTP(S)リンクだけを保存する。
- デモURLは記事内で「デモ」「アプリ」「試す」「公開URL」の近傍にある外部HTTP(S)リンクだけを候補にし、Zenn、GitHub、YouTube、SNSを除外する。
- 技術語は本文の完全一致だけを保存し、利用の肯否が不明な文脈は `notes` に残す。
- 受賞記事が取得不能でも受賞情報は維持し、状態を `official-list-only` のままにする。
- 同じホストへ500ms以上の間隔を置き、取得済み記事は `.cache/hackathons/articles/` を利用する。

- [ ] **Step 4: テストと再検証を通す**

Run:

```bash
node --test scripts/research/collect-hackathon-data.test.mjs scripts/research/validate-hackathon-data.test.mjs
node scripts/research/validate-hackathon-data.mjs data/hackathons/projects.json data/hackathons/projects.csv
```

Expected: tests 0 failed、dataset errors 0。受賞作品以外は `official-list-only` のまま。

- [ ] **Step 5: Task 4 をコミットする**

```bash
git add data/hackathons/projects.json data/hackathons/projects.csv scripts/research/collect-hackathon-data.mjs scripts/research/collect-hackathon-data.test.mjs
git commit -m "data: enrich award-winning hackathon projects"
```

### Task 5: 各回の調査メモと索引

**Files:**
- Create: `docs/planning/research/hackathons/README.md`
- Create: `docs/planning/research/hackathons/vol-1.md`
- Create: `docs/planning/research/hackathons/vol-2.md`
- Create: `docs/planning/research/hackathons/vol-3.md`
- Create: `docs/planning/research/hackathons/vol-4.md`
- Modify: `docs/planning/README.md`
- Modify: `docs/index.md`

**Interfaces:**
- Consumes: 検証済み `projects.json` と公式URL。
- Produces: 人が読める開催概要、提出件数、受賞一覧、取得制約、データへの導線。

- [ ] **Step 1: READMEへ調査契約を書く**

対象、一次情報、確認日、JSON/CSV列、`official-list-only` と `article-checked` の意味、更新コマンドを記載する。

- [ ] **Step 2: 各回のMarkdownを生成する**

各ファイルに次を含める。

- 正式名称、開催期間、公式URL
- 公式公表提出数と収集件数
- 賞名、作品名、チーム名、提出記事URL
- GitHub/デモ/技術情報の確認範囲
- 公式公表数との差、取得不能、表記揺れ

- [ ] **Step 3: docs索引からリンクする**

`docs/planning/README.md` と `docs/index.md` から `docs/planning/research/hackathons/README.md` へリンクし、設計書だけを向いていた索引を成果物の入口へ更新する。

- [ ] **Step 4: ドキュメント検査を通す**

Run: `./scripts/check-doc-links.sh`

Expected: `OK: no broken links, no orphans.`

- [ ] **Step 5: Task 5 をコミットする**

```bash
git add docs/index.md docs/planning/README.md docs/planning/research/hackathons
git commit -m "docs: summarize historical hackathon submissions and awards"
```

### Task 6: 全体検証と作業記録

**Files:**
- Create: `docs/work-notes/2026-09-10-hackathon-history-research.md`

**Interfaces:**
- Consumes: 全成果物とGit差分。
- Produces: 実行結果、件数、検証結果、既知の未確認事項をまとめた作業記録。

- [ ] **Step 1: 全テスト・データ・docsを再検証する**

Run:

```bash
node --test scripts/research/*.test.mjs
node scripts/research/validate-hackathon-data.mjs data/hackathons/projects.json data/hackathons/projects.csv
./scripts/check-doc-links.sh
git diff --check
```

Expected: test failures 0、dataset errors 0、589 records、broken links 0、orphans 0、whitespace errors 0。

- [ ] **Step 2: 機密情報混入を確認する**

Run:

```bash
git diff --cached --name-only
git grep -n -E '(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*[^[:space:]]+' -- data docs/planning/research/hackathons scripts/research
```

Expected: 対象は公開URLと公開記事だけで、秘密値の一致なし。

- [ ] **Step 3: 作業記録を作る**

一次情報URL、各回の公式件数/収集件数、受賞件数、テスト結果、取得不能記事、未確認のGitHub/デモURL、非受賞記事を本文確認していない境界を記載する。

- [ ] **Step 4: 最終差分を確認する**

Run: `git status --short && git diff --stat main...HEAD`

Expected: 設計・計画・調査データ・調査文書・調査スクリプト・テスト・work noteだけが変更対象で、`src/` は存在しないか空のまま。

- [ ] **Step 5: Task 6 をコミットする**

```bash
git add docs/work-notes/2026-09-10-hackathon-history-research.md
git commit -m "docs: record hackathon history research verification"
```

### Task 7: レビュー用push

**Files:**
- No file changes expected.

**Interfaces:**
- Consumes: 検証済みブランチ `1a-m4/hackathon-history-research`。
- Produces: GitHub上のレビュー可能なブランチ。PR作成はユーザーの明示指示がある場合に行う。

- [ ] **Step 1: GitHub実状態を再取得する**

Run: `git fetch origin && git status --short --branch`

Expected: ローカル変更なし、ブランチ名が `1a-m4/hackathon-history-research`。

- [ ] **Step 2: ブランチをpushする**

Run: `git push -u origin 1a-m4/hackathon-history-research`

Expected: remote tracking branchが設定される。

- [ ] **Step 3: remote commitを照合する**

Run: `test "$(git rev-parse HEAD)" = "$(git ls-remote origin refs/heads/1a-m4/hackathon-history-research | awk '{print $1}')"`

Expected: 終了コード0。
