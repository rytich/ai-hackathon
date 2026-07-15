# AI Execution Framework

## Goal

複数の AI エージェントが、低コストかつ高品質に並行開発できる環境を作る。

この framework は特定の言語や cloud に依存しません。repository 内に残る仕様、作業ログ、判断ログ、検証コマンド、再現手順を信頼できる source of truth にします。

## Roles

### Coordinator

- Issue が実装可能な粒度か確認する。
- acceptance criteria、関連 spec、依存 Issue、危険領域を明確にする。
- branch/worktree 名と担当 agent を割り当てる。
- 並列化できない shared state を特定する。

### Implementer

- 専用 branch/worktree で作業する。
- 差分を小さく保ち、scope 外 refactor を避ける。
- 実装、テスト、docs を同じ PR にまとめる。
- 検証結果を PR と work note に残す。

### Reviewer

- bug、regression、missing tests、secret leak、privacy risk を優先して見る。
- acceptance criteria と PR の対応を確認する。
- 自動 merge 可能か、人間承認が必要か判定する。

### Human Approver

次の領域は人間が最終承認する。

- destructive migration
- auth、token、secret、permission、scope
- billing、payment
- production deployment、infrastructure
- legal、privacy、consent
- acceptance criteria の未解決議論

## Standard Workflow

```text
1. Intake
   Issue, spec, acceptance criteria, risk を確認する。

2. Plan
   変更ファイル、検証コマンド、parallel safety を短く決める。

3. Branch And Worktree
   Issue ごとに branch/worktree を分離する。

4. Implement
   小さい差分で実装し、必要な docs と tests を更新する。

5. Validate
   required checks を実行し、失敗は原因と対応を記録する。

6. Synchronize
   Spec Kit task と GitHub Issue の完了状態を同期する。

7. Complete Task Pipeline
   objective review、PR 作成、merge、Issue close を実行する。

8. Review
   Reviewer が品質、scope、secret、risk を確認する。

9. Handoff
   PR、work note、decision log、blocker を残す。

10. Merge
   条件を満たす場合のみ auto merge。危険領域は Human Approver が merge。
```

## Issue Readiness

実装前に次を確認する。

- 問題、期待結果、非目標が書かれている。
- 受け入れ条件が検証可能である。
- 対応する spec/task がある。
- 対応する Spec Kit task と GitHub Issue の紐づきが分かっている。
- 影響範囲と危険領域が明確である。
- secret、個人情報、production data の扱いが決まっている。
- 並列作業時の shared state が分かっている。

## Start Coordination Protocol

3 つ以上の AI エージェントが同時に作業する場合、各エージェントは作業開始前に GitHub 上の coordination state を確認する。private chat history、自分の local checkout、未共有メモだけで着手可否を判断しない。

確認対象:

- Issue assignee
- Issue labels
- Issue comments
- linked PR
- remote branch の存在
- latest stable branch
- open PR の touched files
- work notes
- decision log

推奨 status labels:

- `ready`: 着手可能
- `in-progress`: 誰かが着手中
- `blocked`: 外部判断や依存完了待ち
- `blocked-by-<issue-number>`: 特定 Issue の完了待ち
- `needs-human`: 人間承認待ち
- `review-ready`: PR review 待ち
- `auto-merge-ok`: 自動 merge 候補
- `manual-merge-required`: 手動 merge 必須

着手前の判定:

- 対象 Issue が `in-progress` なら、原則として着手しない。
- 対象 Issue に assignee があり、自分でなければ着手しない。
- 対象 Issue に未解決の `blocked` / `needs-human` があれば着手しない。
- 同じ Issue 番号または同じ topic の remote branch があれば、作業者と PR 状態を確認する。
- open PR が同じ files/directories を触っていれば、Coordinator に確認する。

着手時に行うこと:

- Issue に `in-progress` label を付ける。
- 可能なら assignee を設定する。
- Issue comment に branch、worktree、scope、dependency decision を残す。
- 作業を分割した場合は、元 Issue に派生 Issue/PR をリンクする。

## Dependency And Wait Decision

他 Issue の完了待ちかどうかは、次の順で判定する。

1. Explicit dependency: Issue、spec、comment に `depends on`、`blocked by`、`after #N` があるか。
2. Shared contract: API、schema、public type、permission model を共有していないか。
3. Verification dependency: 先行 Issue の test fixture、CI、migration、seed、mock がないと検証できないか。
4. Runtime dependency: database、queue、deployment、runtime config を共有していないか。
5. Security dependency: auth、permission、secret handling、privacy decision が未決定ではないか。
6. File conflict: 同じ files/directories を別 Issue が触っていないか。
7. Review dependency: 先行 PR の merge 内容を取り込まないと正しく判断できないか。

判定語彙:

- `Proceed`: 並行着手してよい。merge も独立して可能。
- `Proceed with guardrails`: 並行着手してよいが、先行 Issue 完了まで merge しない。
- `Wait`: 先行 Issue の close または人間判断を待つ。
- `Split`: Issue を小さく分け、独立部分だけ先に進める。

判定は Issue comment と work note に残す。

Issue comment 例:

```text
依存判定: Proceed with guardrails
理由: UI skeleton は進められるが、API response contract 確定まで integration は merge しない。
Branch: ai/42-ui-skeleton
Worktree: ../worktrees/project-42-ui-skeleton
Scope: UI files only
```

## Parallel Agents

並列化してよいもの:

- 独立した UI、API、domain module、docs、tests。
- 別 Issue に紐づく小さい bug fix。
- 同じ spec の中でも file ownership が分かれている作業。

並列化に注意するもの:

- database schema、migration、generated files。
- shared config、package manager lockfile、CI workflow。
- auth、permission、secret、runtime entrypoint。
- 同じ public API や共通型の変更。

衝突しやすい作業は Coordinator が順序を決める。

## Documentation

各作業で残すもの:

- Work note: 作業内容、理由、検証、次の作業。
- Decision log: 採用した判断、却下した案、再検討条件。
- PR body: Issue、変更概要、検証、未対応、work note path。

推奨 directory:

```text
docs/work-notes/
docs/decisions/
```

## Completion Synchronization

Spec Kit と GitHub Issues を併用する project では、`tasks.md` だけを完了 ledger にしない。GitHub を coordination state とするため、対応 Issue の state/comment/labels も同じ作業セッションで更新する。

実装開始前:

- 対象 Spec Kit task ID を確認する。
- 対応する GitHub Issue を確認する。
- task と Issue の対応が曖昧なら、Issue comment または work note に mapping を残す。

実装完了時:

- `tasks.md` を `[x]` にする作業と同じ session で、対応 Issue を更新する。
- validation が scope 全体に通ったら、Issue を completed として close する。
- 部分完了の場合は Issue を open のままにし、完了 task ID と残 task ID をコメントする。
- `review-ready` / `auto-merge-ok` / `manual-merge-required` などの labels を最新化する。

handoff 前:

- `tasks.md` の pending count と open GitHub Issues を照合する。
- mismatch がある場合は、意図的な理由を final report と work note に書く。
- close できない Issue には blocker、残 task、次の validation をコメントする。
- mock-only / fixture-only の成功は completion evidence として扱わず、real-use evidence または fallback tracking を確認する。

## Task Completion Automation

タスクが完了したら、標準パイプラインとして `scripts/complete-task.sh` を実行する。

通常の完了:

```bash
scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue
```

人間承認が必要な変更:

```bash
scripts/complete-task.sh --issue <number> --stage-all
```

この script が行うこと:

- local validation を実行する。
- staged diff から objective review report を生成する。
- mock/fixture/stub/fake/demo と product acceptance の混同を review で確認する。
- secret/env/local artifact の混入を機械的に確認する。
- GitHub 操作の直前に Issue/PR の実状態を再取得する。
- work note として objective review を保存する。
- commit を作成する。
- branch を push する。
- PR を作成する。
- objective review を PR comment として投稿する。
- `--merge` 指定時は PR を merge する。
- `--close-issue` 指定時は対応 Issue を completed として close する。
- Issue が既に closed の場合はコメントも close も再実行しない。

禁止事項:

- destructive migration、auth/secret/permission、billing、production deploy、privacy/legal は自動 merge しない。
- objective review が blocker を出した場合は merge しない。
- Spec Kit task と GitHub Issue の completion mismatch を説明なしで残さない。
- closed Issue にコメントしない。
- thread 内の情報だけを前提に GitHub 操作しない。

## Real-use Completion Gate

agent は test surrogate を product acceptance と誤認しない。

mock、fixture、stub、fake client、demo data は validation/support tool であって、実利用完了の証跡ではない。

milestone / v1.0 / usable / production-ready を名乗る場合:

- 少なくとも 1 つの real external integration path を検証する。
- real path が不可能な場合は、明示された real user-facing fallback を検証する。
- mock mode を UI、docs、final report に明示する。
- real provider path が未実装なら、Issue を close せず残 task / follow-up Issue で追跡する。

completion challenge:

```text
Did we validate the real user path, or only a mock/demo path?
If using mock data, where is the real provider path or user-facing fallback tracked?
```

## Auto Merge

auto merge を許可する条件:

- PR が Issue に紐づいている。
- required checks が成功している。
- merge conflict がない。
- Reviewer が approve している。
- work note がある。
- secret、個人情報、production data が含まれていない。
- acceptance criteria との対応が PR に書かれている。

auto merge を禁止する条件:

- destructive migration
- auth、token、secret、permission、scope の変更
- billing、payment の変更
- production deployment、infrastructure の変更
- legal、privacy、consent の最終判断
- CI failure
- acceptance criteria の未解決議論

## Evaluation

framework 自体の効果は次で測る。

- PR lead time
- rework rate
- CI failure rate
- merge conflict rate
- human approval required ratio
- context/tool cost
- escaped defect count
- docs freshness

## Project Adaptation Checklist

他プロジェクトへ移植するときに決めるもの:

- stable branch 名
- branch naming rule
- worktree directory rule
- Issue labels
- Issue status labels
- dependency labels
- PR template
- required checks
- auto merge permission
- human approval required areas
- docs directory
- work note template
- decision log template
- secret handling policy
- deployment approval policy
- Spec Kit task と GitHub Issue の completion synchronization policy
