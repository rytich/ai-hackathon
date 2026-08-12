# v0.2.4 Effect Metrics 作業サマリー

## 対象

- Issue: [#34](https://github.com/rytich/agentic-framework/issues/34)
- Branch: `1acx/v024-effect-metrics`
- Agent: Codex
- AI profile: `codex`
- Change reason: privacy-safe な AI 作業効果測定と AF-only update 境界を v0.2.4 として追加する。

## What

- strict work unit schema、atomic JSON storage、duplicate 防止、破損 record 検証を追加した。
- `project-tracked`（既定・明示同意必須）、`local-only`、`dedicated` の 3 保存 mode を追加した。
- work unit、Issue、PR、release、profile ごとの決定的 Markdown / JSON / JSONL report と coverage を追加した。
- `init`, `record`, `validate`, `report`, `doctor` の CLI と Git 状態診断を追加した。
- installation manifest、managed / seeded / local-data 分類、HEAD/index 両側 checksum の AF-only staged scope check を追加した。
- bootstrap 配布、thin wrapper、既存 project file と manifest の非上書き、completion の非ブロッキング warning を追加した。
- 日本語の運用ガイド、privacy/access 境界、更新境界の保証範囲を同期した。

## Why

token 量だけでは品質、所要時間、retry、review、手戻りを評価できない。また、複数端末集計のため既存 repository を使える一方、統計情報を push すると開発行動が露出し得る。利用者が保存先を選び、明示的に risk を承認し、AF 更新と利用者所有 file・metrics data を混ぜない最小基盤が必要だった。

## 実装 file

- Schema / storage / report / Git / CLI: `schemas/metrics/`, `scripts/metrics/`, `scripts/metrics.mjs`
- Installation boundary: `scripts/af-installation.mjs`, `scripts/create-installation-manifest.mjs`, `scripts/check-af-update-scope.mjs`
- Distribution: `scripts/bootstrap-project.sh`, `templates/project/scripts/metrics.mjs`, `templates/project/scripts/check-af-update-scope.mjs`
- Tests / synthetic evidence: `scripts/test-metrics-*.mjs`, `scripts/test-af-installation.mjs`, `scripts/test-bootstrap-project.sh`, `scripts/fixtures/metrics/representative/`
- Docs: `docs/framework/effect-metrics.md` と関連 framework / planning / release 文書

## 検証 command

- `bash scripts/test-build-public-archive.sh`
- `bash scripts/test-check-agent-tools.sh`
- `bash scripts/test-complete-task.sh`
- `bash scripts/test-select-ai-profile.sh`
- `bash scripts/test-bootstrap-project.sh`
- `node --test scripts/test-configure-cloudflare-pages-domain.mjs`
- `node --test scripts/test-metrics-schema.mjs scripts/test-metrics-storage.mjs scripts/test-metrics-report.mjs scripts/test-metrics-cli.mjs scripts/test-af-installation.mjs`
- `bash scripts/check-doc-links.sh`
- `bash scripts/check-agent-tools.sh`
- `git diff --check main...HEAD`

最終実行結果:

- public archive regression: PASS
- agent tools regression: PASS 23 / FAIL 0
- completion pipeline regression: PASS 17
- profile selection regression: PASS（6 profiles）
- bootstrap integration: PASS
- Cloudflare unit: PASS 5 / FAIL 0
- metrics / installation tests: PASS 34 / FAIL 0
- docs link / orphan check: PASS（107 files）
- Codex must tools: PASS
- branch diff hygiene / clean worktree: PASS

## Acceptance evidence と制約

- 合成 fixture だけで正常系、欠測、比較不能、破損、scope 違反を検証した。real project の実測値や production data は acceptance evidence に使っていない。
- 外部 dependency 追加数: `0`。package manager、lockfile、外部 metrics service を追加していない。
- `.af-metrics/`、`.af-metrics.local.json`、real metrics data は AF repository に commit していない。
- AF 開発の実測値は AF repository と別の private metrics repository に置き、一般利用者へ access させない。private repository の作成・remote 設定・commit・push は自動化していない。
- 一般利用者は自身の既存 project repository、local-only、または自身の専用 repository を選択する。AF 開発用 metrics repository へ送信しない。
- `doctor` と completion warning は非ブロッキングであり、product acceptance の代替ではない。
- local staged scope check は直接 Git command で迂回できる。remote 強制の CODEOWNERS / branch protection guidance は v0.2.5 の既知未対応である。
- v0.2.4 は記述統計を提供するが、profile / model の優劣、因果効果、統計的有意差は主張しない。
