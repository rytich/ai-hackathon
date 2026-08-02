# Project Adoption Guide

このガイドは **AF を初めて導入するとき**の手順。既に AF を導入済みのプロジェクトへ最新の変更を反映する場合は [project-update.md](project-update.md) を参照する。

## For Existing Projects

1. `scripts/bootstrap-project.sh /path/to/project` を実行する。
2. 生成された `AGENTS.md` と docs を project に合わせて編集する。
3. `docs/README.md` と `docs/framework/knowledge-base.md` を読み、知識ベース構造（framework / knowledge / planning / decisions）と維持ルールを確認する。
4. `docs/knowledge/` の各カテゴリ（product / engineering / business / support / materials）に owner を割り当て、`docs/framework/knowledge-base.md` の「維持機構」表を project に合わせて調整する。
5. 現在の README、CI、package scripts、runtime docs と矛盾がないか確認する。
6. Codex stack を使う場合は `docs/framework/codex-dev-stack.md` の導入・検証手順を端末ごとに確認する。
7. 利用する AI 環境ごとの profile を `.ai/profiles/` に設定する。
8. `./scripts/select-ai-profile.sh <profile>` で初期 profile を明示的に選ぶ。
9. `./scripts/check-agent-tools.sh` で必須ツールの導入状況を確認する。must が欠落していたら、先に導入してから次へ進む。recommended の欠落は縮退先で運用できるため、必須ではない。
10. `docs/framework/github-configuration.md` に沿って labels、Issue template、PR template、branch protection、required checks を設定する。
11. Spec Kit task と GitHub Issue の completion synchronization policy を確認する。
12. `scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue` を試行する。
13. 最初の 3 PR は trial として運用し、重すぎるルールを削る。
14. 効果測定を始める。

## GitHub Setup

最低限:

- Issues を有効にする。
- Pull requests を有効にする。
- labels を作成する: `ready`, `in-progress`, `blocked`, `needs-human`, `review-ready`, `auto-merge-ok`, `manual-merge-required`。
- 必要なら dependency label を作る: `blocked-by-<issue-number>`。
- PR template を置く。
- Issue template に assignee、labels、dependency、parallel safety 欄を含める。
- stable branch に branch protection を設定する。
- required checks を設定する。
- auto merge を使う場合、`manual-merge-required` の条件を docs と PR template に明記する。

`gh` CLI が使える場合は、導入先 repository で次を実行する。

```bash
./scripts/setup-github-labels.sh
```

AI profile を切り替える場合:

```bash
./scripts/select-ai-profile.sh codex
```

## For New Projects

Spec Kit が使える場合:

```text
specify -> plan -> tasks -> implement
```

各 phase の成果物:

- specify: problem、users、requirements、acceptance criteria、non-goals
- plan: architecture、runtime、quality gates、risk、parallelization strategy
- tasks: independent tasks、shared prerequisites、validation commands
- implement: Issue/branch/PR/work note/decision log

## Minimal Trial

最初から全てを導入しない。最低限:

- `AGENTS.md`
- `docs/framework/ai-execution-framework.md`
- `docs/framework/collaboration-rules.md`
- `docs/work-notes/template.md`
- `.github/pull_request_template.md`

## Adoption Metrics

2 週間ごとに見る。

- AI 作業 PR 数
- PR lead time
- review 指摘数
- CI failure rate
- merge conflict rate
- rollback/revert 数
- docs 更新漏れ
- human approval required ratio

## When To Relax Rules

- 1 人作業で branch/worktree 分離が過剰な場合。
- docs 更新より code diff が明らかな場合。
- prototype で品質 gate より探索速度を優先する場合。

ただし secret、privacy、production data の gate は緩めない。
