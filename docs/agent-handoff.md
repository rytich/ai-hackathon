# AI Agent Handoff

## Goal

AI エージェントや人間が途中参加しても、repository 内の情報だけで安全に作業を継続できるようにする。

## Bootstrap

新しい agent は最初に次を行う。

1. `git status --short --branch` で現在地を確認する。
2. `AGENTS.md` を読む。
3. 対象 Issue、spec、tasks、関連 docs を読む。
4. `docs/work-notes/` と `docs/decision-log/` から直近の判断を確認する。
5. runtime と validation command を確認する。
6. secret や production data が必要な作業か確認する。

## Required Reading Order

プロジェクトごとに編集する。

1. `README.md`
2. `AGENTS.md`
3. `docs/runtime.md`
4. `docs/secrets.md`
5. `docs/codex-dev-stack.md`
6. `docs/ai-execution-framework.md`
7. `docs/collaboration-rules.md`
8. `docs/quality-gates.md`
9. relevant spec/task files
10. recent work notes
11. recent decision logs

## Handoff Note

作業を中断するときは、PR、Issue、または work note に次を残す。

- 現在の branch/worktree
- 完了したこと
- まだ壊れていること
- 次に見るべき file/path
- 実行済み validation
- Spec Kit task と GitHub Issue の同期状態
- real-use evidence と mock-only drift check の結果
- 失敗した command と原因
- 触ってはいけない unrelated changes

## Safe Continuation Rules

- secret、token、production data を commit しない。
- Issue-linked branch と isolated worktree を使う。
- 小さい差分を保つ。
- runtime、scope、secret、permission が変わったら docs を更新する。
- Spec Kit task と GitHub Issue の completion mismatch を残したまま handoff しない。残す場合は理由を書く。
- GitHub 操作前に実際の Issue/PR state を再取得する。thread 内の情報だけで close/comment/merge しない。
- mock-only / fixture-only の成功を real-use completion として handoff しない。
- 大量出力は context-mode や script で要約する。
- 不明な危険領域は Human Approver に渡す。
