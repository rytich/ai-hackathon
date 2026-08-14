# v0.2.5 Safe Installer Implementation Plan

**Goal:** Provide a no-manual-extraction installer, fail-closed collision handling for existing projects, an explicit MIT license, and documented/testable Context7 integration.

**Architecture:** Keep acquisition/integrity checks in a small network installer and keep project overlay logic in `bootstrap-project.sh`. Preflight every destination before normal writes; stage a complete candidate overlay and report when any differing destination exists.

**Tech Stack:** Bash 3.2-compatible shell, Node.js for JSON metadata parsing and existing manifest tooling, ZIP/SHA-256 release pipeline, GitHub Release, Cloudflare Pages.

**Issues:** https://github.com/rytich/agentic-framework/issues/65 / https://github.com/rytich/agentic-framework/issues/28

---

### Task 1: Lock behavior with tests

- Extend `scripts/test-bootstrap-project.sh` with a new-project success case, identical-file case, collision case, normal-tree immutability assertion, candidate/report assertion, and existing-manifest refusal.
- Add `scripts/test-install.sh` using local fixture metadata/artifact URLs so it covers success, checksum rejection, cleanup, and bootstrap status propagation without production network access.
- Extend `scripts/test-build-public-archive.sh` to require `LICENSE` and installer files.
- Run the focused tests and confirm the new assertions fail before implementation.

### Task 2: Implement safe bootstrap and installer

- Refactor `scripts/bootstrap-project.sh` into plan, preflight, candidate staging, and apply phases without changing its safe successful output contract unnecessarily.
- Add `scripts/install.sh` with dependency checks, release metadata parsing, byte/hash verification, temporary extraction, cleanup, and bootstrap invocation.
- Add MIT `LICENSE`.
- Update README and adoption/update documentation with explicit post-install steps and collision resolution.

### Task 3: Add context7 installation and usage support

- Update Codex and Claude Code setup documents using the official `upstash/context7` client instructions.
- Add a distributed agent rule that routes current library/API/setup questions through context7 while excluding business-logic debugging and general review.
- Extend tool requirement checks and tests so missing/available context7 states and the official setup guidance are observable.
- Keep API keys out of repository files, templates, examples, generated manifests, and logs.

### Task 4: Prepare and verify v0.2.5

- Update `VERSION` and `CHANGELOG.md`.
- Run shell syntax, focused tests, repository quality gates, archive build, archive inventory, sanitize scan, and real local HTTP installer flow.
- Record a work note and objective review evidence.

### Task 5: Publish framework release

- Re-read GitHub state, create Issue and PR, review the exact diff, merge after checks, tag immutable `v0.2.5`, build assets from the tag, and create a non-draft GitHub Release.

### Task 6: Publish site update

- Create a separate `microdotz-site` branch/PR that serves `install.sh`, makes installer the primary CTA, keeps ZIP as a manual fallback, and updates release metadata/archive.
- Merge, wait for deployment, then verify page, installer, metadata, ZIP, SHA-256, security headers, and desktop/mobile layout from public URLs.
