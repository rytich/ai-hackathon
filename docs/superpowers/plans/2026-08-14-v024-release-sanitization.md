# v0.2.4 Public Archive Sanitization and Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove public owner and concrete user-home identifiers from AF public archives, then publish verified v0.2.4 ZIP and SHA-256 assets without moving the existing tag.

**Architecture:** Extend the existing archive build pipeline rather than changing tagged source content. A regression fixture is added to a temporary Git commit so the real `build-public-archive.sh` processes owner URLs and POSIX/Windows paths end to end; the build script normalizes those strings before its existing redaction and leak gates. The merged packaging tool then exports the immutable `v0.2.4` tag, produces two release assets, and verifies downloaded assets after GitHub publication.

**Tech Stack:** Bash, embedded Python 3, Git object plumbing for an isolated test fixture, `zip`/`unzip`/`grep`, GitHub CLI.

## Global Constraints

- Keep tag `v0.2.4` at `4fd1ae4edd2ffd541d7cff058d551195bb3a33d0`; never move or recreate it.
- Preserve `VERSION`, `CHANGELOG.md`, archive root `agentic-framework-0.2.4/`, file inventory, and current excluded paths.
- Replace source owner `rytich` with `OWNER`, repository-local absolute links with relative links, remaining POSIX homes with `$HOME`, and Windows homes with `%USERPROFILE%`.
- Do not change AF product behavior, Cloudflare configuration, credentials, or `ai.microdotz.net`.
- Do not publish a Release until the sanitizer change is merged and every local verification passes.
- Release exactly `agentic-framework-v0.2.4-public.zip` and `agentic-framework-v0.2.4-public.zip.sha256`.
- Track implementation in GitHub Issue #63 and branch `1acx/v024-release-sanitization`.

---

### Task 1: Add an end-to-end regression fixture

**Files:**
- Modify: `scripts/test-build-public-archive.sh`

**Interfaces:**
- Consumes: `scripts/build-public-archive.sh <tag> <output.zip>` and a Git tag whose tree contains `docs/archive-sanitization-fixture.txt`.
- Produces: an integration assertion that fails when raw owner names or concrete POSIX/Windows home paths survive archive creation.

- [x] **Step 1: Create a tagged temporary tree without modifying the worktree**

Add a fixture with literal expectations derived independently of the sanitizer:

```bash
FIXTURE_PATH="docs/archive-sanitization-fixture.txt"
FIXTURE_CONTENT="$TMP_DIR/archive-sanitization-fixture.txt"
cat > "$FIXTURE_CONTENT" <<'FIXTURE'
owner=https://github.com/rytich/agentic-framework/issues/34
repo-posix=/Users/example/github/agentic-framework/docs/README.md
home-posix=/Users/example/.codex/example.json
home-windows=C:\Users\example\.codex\example.json
FIXTURE

FIXTURE_BLOB="$(git -C "$ROOT_DIR" hash-object -w "$FIXTURE_CONTENT")"
TEST_INDEX="$TMP_DIR/index"
GIT_INDEX_FILE="$TEST_INDEX" git -C "$ROOT_DIR" read-tree HEAD
GIT_INDEX_FILE="$TEST_INDEX" git -C "$ROOT_DIR" update-index \
  --add --cacheinfo "100644,$FIXTURE_BLOB,$FIXTURE_PATH"
FIXTURE_TREE="$(GIT_INDEX_FILE="$TEST_INDEX" git -C "$ROOT_DIR" write-tree)"
FIXTURE_COMMIT="$(printf '%s\n' 'test: add archive sanitization fixture' | \
  GIT_AUTHOR_NAME='Archive Test' GIT_AUTHOR_EMAIL='archive-test@example.invalid' \
  GIT_COMMITTER_NAME='Archive Test' GIT_COMMITTER_EMAIL='archive-test@example.invalid' \
  git -C "$ROOT_DIR" commit-tree "$FIXTURE_TREE" -p HEAD)"
git -C "$ROOT_DIR" tag "$TAG" "$FIXTURE_COMMIT"
```

- [x] **Step 2: Assert the normalized fixture and global leak gate**

After building `$OUT`, compare `$PREFIX/$FIXTURE_PATH` with this exact result:

```text
owner=https://github.com/OWNER/agentic-framework/issues/34
repo-posix=docs/README.md
home-posix=$HOME/.codex/example.json
home-windows=%USERPROFILE%\.codex\example.json
```

Fail if `zipgrep` finds `rytich`, `/Users/example`, or `C:\Users\example` anywhere in the archive.

- [x] **Step 3: Run the regression test and confirm RED**

Run `bash scripts/test-build-public-archive.sh`.

Expected: non-zero exit because the existing build script leaves the owner/path fixture unchanged. Confirm the failure identifies the raw fixture value, not test setup or Git plumbing.

- [x] **Step 4: Commit the failing test**

```bash
git add scripts/test-build-public-archive.sh
git commit -m "test: reject owner and home paths in public archives"
```

---

### Task 2: Normalize owner and user-home identifiers

**Files:**
- Modify: `scripts/build-public-archive.sh`
- Test: `scripts/test-build-public-archive.sh`

**Interfaces:**
- Consumes: extracted UTF-8 archive files under `$SRC`, `PUBLIC_ARCHIVE_OWNER` defaulting to `rytich`, and `PUBLIC_ARCHIVE_OWNER_WITH` defaulting to `OWNER`.
- Produces: normalized archive text plus a fail-closed check for the raw owner and concrete user-home prefixes.

- [x] **Step 1: Add owner configuration beside existing redaction configuration**

```bash
OWNER="${PUBLIC_ARCHIVE_OWNER:-rytich}"
OWNER_WITH="${PUBLIC_ARCHIVE_OWNER_WITH:-OWNER}"
```

Document both environment variables in the script header.

- [x] **Step 2: Extend the existing Python text pass**

Pass `OWNER` and `OWNER_WITH` to the current embedded Python program. Before the generic `REDACT` loop, normalize in this order:

```python
owner = os.environ["OWNER"]
owner_with = os.environ["OWNER_WITH"]
repo = "agentic-framework"

repo_posix = re.compile(
    rf"/(?:Users|home)/[^/\s\"'<>`]+/(?:[^/\s\"'<>`]+/)*{re.escape(repo)}/"
)
repo_windows = re.compile(
    rf"[A-Za-z]:\\Users\\[^\\\s\"'<>`]+\\(?:[^\\\s\"'<>`]+\\)*{re.escape(repo)}\\",
    re.IGNORECASE,
)
posix_home = re.compile(r"/(?:Users|home)/[^/\s\"'<>`]+")
windows_home = re.compile(r"[A-Za-z]:\\Users\\[^\\\s\"'<>`]+", re.IGNORECASE)

s = s.replace(
    f"https://github.com/{owner}/{repo}",
    f"https://github.com/{owner_with}/{repo}",
)
s = repo_posix.sub("", s)
s = repo_windows.sub("", s)
s = posix_home.sub("$HOME", s)
s = windows_home.sub("%USERPROFILE%", s)
s = s.replace(owner, owner_with)
```

Keep the existing customer/project name redaction and Japanese spacing cleanup unchanged after this normalization.

- [x] **Step 3: Extend the fail-closed verification**

After the existing `PUBLIC_ARCHIVE_REDACT` checks, reject the raw owner and concrete homes:

```bash
if [ -n "$OWNER" ] && grep -rq -- "$OWNER" "$SRC" 2>/dev/null; then
  echo "NG: public owner '$OWNER' が残っている" >&2
  leak=1
fi
```

Use a short embedded Python scan for POSIX and Windows home patterns so shell quoting cannot weaken the path checks.

- [x] **Step 4: Run the regression test and confirm GREEN**

Run `bash scripts/test-build-public-archive.sh`.

Expected: `PASS`, with the exact normalized fixture and all prior exclusion assertions succeeding.

- [x] **Step 5: Run the mutation check**

Temporarily disable each of owner replacement, repository path shortening, POSIX home normalization, and Windows home normalization one at a time. Confirm the regression test fails for each mutation, then restore the implementation and rerun to `PASS`.

- [x] **Step 6: Commit the implementation**

```bash
git add scripts/build-public-archive.sh
git commit -m "fix: sanitize public archive provenance"
```

---

### Task 3: Verify the branch and record implementation evidence

**Files:**
- Create: `docs/work-notes/2026-08-14-v024-release-sanitization.md`
- Modify: `docs/superpowers/plans/2026-08-14-v024-release-sanitization.md`

**Interfaces:**
- Consumes: the passing sanitizer branch and Issue #63.
- Produces: a reviewable PR with exact local evidence and explicit note that GitHub Release publication remains pending until merge.

- [x] **Step 1: Run the complete local validation batch**

```bash
bash scripts/test-build-public-archive.sh
node --test scripts/test-configure-cloudflare-pages-domain.mjs
bash scripts/check-doc-links.sh
bash scripts/test-check-agent-tools.sh
bash scripts/test-complete-task.sh
bash scripts/test-select-ai-profile.sh
bash scripts/test-bootstrap-project.sh
node --test scripts/test-af-installation.mjs scripts/test-metrics-cli.mjs scripts/test-metrics-report.mjs scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs
git diff --check main...HEAD
```

Expected: every command exits 0; Node reports zero failed tests; docs report no broken links or orphans.

- [x] **Step 2: Generate and inspect a candidate v0.2.4 artifact**

```bash
ASSET_DIR="$(mktemp -d)"
scripts/build-public-archive.sh v0.2.4 "$ASSET_DIR/agentic-framework-v0.2.4-public.zip"
(cd "$ASSET_DIR" && shasum -a 256 agentic-framework-v0.2.4-public.zip > agentic-framework-v0.2.4-public.zip.sha256)
```

Verify `VERSION=0.2.4`, the `.sha256` value, absence of raw owner and user-home paths, absence of excluded paths, and absence of secret-like values. Do not publish this candidate before merge.

- [x] **Step 3: Write the work note**

Record root cause, red/green evidence, changed behavior, exact validation commands, candidate SHA-256 and byte size, tag immutability, and `Release pending after merge`.

- [x] **Step 4: Mark completed plan checkboxes but keep the requirement approved**

Check off implementation and local-verification steps in this plan. Keep requirement status `approved` because its GitHub Release acceptance conditions are not yet satisfied.

- [x] **Step 5: Commit the evidence**

```bash
git add docs/work-notes/2026-08-14-v024-release-sanitization.md docs/superpowers/plans/2026-08-14-v024-release-sanitization.md
git commit -m "docs: record v0.2.4 archive verification"
```

---

### Task 4: Merge the fix, publish Release assets, and verify remotely

**Files:**
- Generated outside Git: `outputs/agentic-framework-v0.2.4-public.zip`
- Generated outside Git: `outputs/agentic-framework-v0.2.4-public.zip.sha256`
- GitHub: Issue #63, sanitizer PR, Release `v0.2.4`

**Interfaces:**
- Consumes: reviewed and merged sanitizer PR, immutable tag `v0.2.4`, GitHub CLI authentication.
- Produces: a published GitHub Release with two verified assets and an Issue #63 completion comment.

- [ ] **Step 1: Publish the branch and merge the reviewed PR**

Push `1acx/v024-release-sanitization`, open a PR targeting `main`, include root cause and validation evidence, and merge only after the PR diff and current GitHub state are rechecked. Do not delete or move tag `v0.2.4`.

- [ ] **Step 2: Generate final assets using the merged sanitizer**

Use a checkout containing the merged script while passing `v0.2.4` as the source tag:

```bash
ASSET_DIR="$(mktemp -d)"
scripts/build-public-archive.sh v0.2.4 "$ASSET_DIR/agentic-framework-v0.2.4-public.zip"
(cd "$ASSET_DIR" && shasum -a 256 agentic-framework-v0.2.4-public.zip > agentic-framework-v0.2.4-public.zip.sha256)
```

Repeat every candidate inspection from Task 3, then copy the two verified files to `/Users/ichie/github/agentic-framework/outputs/`.

- [ ] **Step 3: Create the GitHub Release**

Write Release notes that summarize v0.2.4 effect metrics and AF-only update protection, and include this provenance statement:

```text
Source code is the immutable v0.2.4 tag at 4fd1ae4edd2ffd541d7cff058d551195bb3a33d0. The public archive was packaged after merge using the follow-up sanitizer from Issue #63; the tag itself was not moved.
```

Create the release:

```bash
gh release create v0.2.4 \
  "$ASSET_DIR/agentic-framework-v0.2.4-public.zip" \
  "$ASSET_DIR/agentic-framework-v0.2.4-public.zip.sha256" \
  --repo rytich/agentic-framework \
  --verify-tag \
  --title "Agentic Framework v0.2.4" \
  --notes-file "$RELEASE_NOTES"
```

- [ ] **Step 4: Re-download and verify published assets**

```bash
VERIFY_DIR="$(mktemp -d)"
gh release download v0.2.4 --repo rytich/agentic-framework --dir "$VERIFY_DIR"
(cd "$VERIFY_DIR" && shasum -a 256 -c agentic-framework-v0.2.4-public.zip.sha256)
```

Confirm the downloaded ZIP hash equals the local final hash, `VERSION=0.2.4`, the Release targets tag commit `4fd1ae4...`, there are exactly two expected assets, and all sanitizer/exclusion/secret scans pass.

- [ ] **Step 5: Synchronize GitHub tracking**

Refresh Issue #63 and Release state, then add one evidence comment with PR URL, Release URL, final SHA-256, byte size, tag commit, and remote verification results. Close Issue #63 only when every Done checkbox is proven.

- [ ] **Step 6: Report the remaining site task**

State explicitly that `ai.microdotz.net` remains on v0.2.3 and that updating `microdotz-site` is a separate PR using the newly published assets.
