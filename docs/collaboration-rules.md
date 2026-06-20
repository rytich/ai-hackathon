# Collaboration Rules

## Basic Policy

- 作業単位は Issue に寄せる。
- 1 Issue = 1 branch = 1 PR を基本にする。
- 並列作業は worktree を分ける。
- 仕様判断と作業記録を repository 内に残す。
- 3 つ以上の AI エージェントがいる場合、GitHub の Issue/label/comment/PR/branch を coordination state とする。
- AI は大きな出力を直接読まず、context-mode や script で要約してから判断する。

## GitHub Coordination

作業開始前に確認するもの:

- Issue assignee
- Issue labels
- Issue comments
- linked PR
- remote branch
- open PR の touched files
- work notes
- decision log

推奨 labels:

- `ready`
- `in-progress`
- `blocked`
- `blocked-by-<issue-number>`
- `needs-human`
- `review-ready`
- `auto-merge-ok`
- `manual-merge-required`

着手してよい条件:

- 対象 Issue に `in-progress` が付いていない。
- 対象 Issue の assignee が空、または自分である。
- 対象 Issue に未解決の `blocked` / `needs-human` がない。
- 関連 Issue の依存関係を確認済みである。
- 同名または同 Issue 番号の remote branch があれば、作業者と PR 状態を確認済みである。

着手時に必ず行うこと:

- Issue に `in-progress` label を付ける。
- 可能なら assignee を設定する。
- Issue comment に branch、worktree、scope、dependency decision を書く。

着手コメント例:

```text
着手します。

- Branch: ai/42-add-health-check
- Worktree: ../worktrees/project-42-add-health-check
- Scope: health check endpoint and tests
- Dependency decision: Proceed
- Parallel safety: shared config and migrations are out of scope
```

依存判定語彙:

- `Proceed`: 並行着手してよい。merge も独立して可能。
- `Proceed with guardrails`: 並行着手してよいが、先行 Issue 完了まで merge しない。
- `Wait`: 先行 Issue の close または人間判断を待つ。
- `Split`: Issue を小さく分け、独立部分だけ先に進める。

## Branch Naming

推奨形式:

```text
ai/<issue-number>-<short-topic>
```

例:

```text
ai/42-add-health-check
ai/57-refactor-auth-scope
```

Codex desktop など branch prefix が決まっている環境では、その prefix を優先する。

## Worktree Rule

推奨形式:

```text
../worktrees/<repo-name>-<issue-number>-<topic>
```

shared files を触る場合は、Coordinator が他 branch との競合を先に確認する。

## Start Procedure

1. Issue、spec、tasks、related docs を読む。
2. scope、acceptance criteria、non-goals を確認する。
3. GitHub coordination state を確認する。
4. dependency decision を `Proceed` / `Proceed with guardrails` / `Wait` / `Split` で決める。
5. Issue に着手コメントを残し、必要な label と assignee を設定する。
6. branch/worktree を作る。
7. 変更予定ファイルと検証コマンドを短くメモする。
8. 実装する。

## Commit And PR

commit は小さく、PR は Issue ごとに作る。

PR には次を含める。

- 対象 Issue
- 対応した spec/task
- 変更概要
- 検証結果
- 既知の未対応、後続 Issue
- work note path
- auto merge 可否

## Work Summary Notes

作業終了時に `docs/work-notes/YYYY-MM-DD-<topic>.md` を作る。

最低限:

- 対象
- 並行作業状態
- 内容
- 理由
- 検証
- 未完了、次の作業
- 関連リンク

## Decision Log

判断ログは `docs/decision-log/YYYY-MM-DD-<topic>.md` に残す。

書くもの:

- 後で揉めそうな設計判断
- 採用した trade-off
- 却下した案
- 再検討条件

書かないもの:

- 単なる作業ログ
- typo 修正
- PR の差分で明らかなもの

## Context And Memory

- 大量出力、ログ、広い検索は context-mode に寄せる。
- resume 後は過去の summary、decision、constraint を検索してから質問する。
- raw HTML、巨大 JSON、test log を会話へ直接流さない。
- agent handoff では repository 内 docs と work note を source of truth にする。
