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

コメント直前に Issue state を再取得する。Issue が既に closed の場合はコメントしない。

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

## Instruction Pattern（指示の型）

Issue、タスク依頼、エージェントへの指示には **What / Why / How** を含める。

| 要素 | 内容 | 省略すると |
|---|---|---|
| What | 何をするか | 作業対象がぶれる |
| Why | なぜ必要か、背景、経緯、誰が困っているか | **判断が浅くなる。トレードオフを誤る** |
| How | 使ってよい/いけない手段、既存パターン、優先すべきトレードオフ | 既存パターンを無視した実装が出る |

ルール:

- **重要な作業ほど Why を厚く書く。** 出力が浅いときの原因は、指示の言い回しではなく背景情報の不足であることが多い。
- 指示を出す前に「この内容を人間の担当者に渡して作業が始められるか」で確認する。始められないなら情報が足りていない。
- 制約が無い場合も How に「制約なし」と明記する。空欄は「未検討」と区別がつかない。
- 抽象的な品質要求（「もっと良くして」など）は禁止。**何がどう良くないのか**を具体化して渡す。
- Why に書いた背景が後から重要になる場合は `docs/decisions/` に情報ソース付きで残す。Issue は閉じると読まれない。

## Start Procedure

1. Issue、spec、tasks、related docs を読む。
2. scope、acceptance criteria、non-goals を確認する。What/Why/How が欠けていれば、着手前に補完を依頼する。
3. GitHub coordination state を確認する。
4. Spec Kit task と GitHub Issue の対応を確認する。
5. dependency decision を `Proceed` / `Proceed with guardrails` / `Wait` / `Split` で決める。
6. Issue に着手コメントを残し、必要な label と assignee を設定する。
7. branch/worktree を作る。
8. 変更予定ファイルと検証コマンドを短くメモする。
9. 実装する。

## Completion Sync

Spec Kit tasks と GitHub Issues は同じ作業セッションで同期する。

完了時に行うこと:

- `tasks.md` を `[x]` にする。
- 対応 Issue に validation 結果をコメントする。
- scope が完了した Issue は completed として close する。
- 部分完了の Issue は open のまま、完了 task ID と残 task ID をコメントする。
- `tasks.md` pending count と open GitHub Issues を照合する。
- mismatch がある場合は、work note と final report に理由を書く。
- real-use evidence を確認する。mock/fixture/stub/fake/demo の成功だけなら Issue を close しない。

標準コマンド:

```bash
scripts/complete-task.sh --issue <number> --stage-all --merge --close-issue
```

人間承認が必要な変更では merge/close を自動化しない。

closed Issue にはコメントしない。必要な追加フィードバックは新 Issue、reopen、または open PR comment として扱う。

## Commit And PR

commit は小さく、PR は Issue ごとに作る。

PR には次を含める。

- 対象 Issue
- 対応した spec/task
- Spec Kit / GitHub sync 結果
- objective review report
- 変更概要
- 検証結果
- 既知の未対応、後続 Issue
- work note path
- auto merge 可否

## Inline Review（企画・差分への人間レビュー）

企画（`docs/planning/` の調査・要件）と実装差分には、**人間がピンポイントで指摘を返せる導線**を用意する。PR の総評だけでは、どの記述のどこが違うのかが伝わらず、修正のたびに全体を作り直すことになる。

### レビュー対象と手段

| 対象 | 手段 |
|---|---|
| 企画成果物（`docs/planning/research/`、`docs/planning/requirements/`） | 実装着手**前**にインラインレビュー。承認されるまで実装に進まない |
| 実装差分 | PR のインラインコメント、またはローカルでのインラインレビュー |
| 対外資料・UI などの見た目 | レンダリング結果に対してインラインレビュー |

### 手段の選択

- **GitHub PR のインラインコメント**: 差分レビューの既定手段。追加ツール不要。
- **ローカルのインラインレビューツール**（例: [crit](https://crit.md)）: **PR になる前**の plan / 要件 / 生成物をレビューしたい場合に使う。markdown・diff・ローカル起動中のページへ行単位でコメントし、エージェントにそのまま反映させられる。git 内で完結し外部サービスに依存しない。

  ```bash
  crit docs/planning/requirements/<topic>.md   # 要件をレビュー
  crit                                          # branch の差分をレビュー
  crit http://localhost:3000                    # 起動中のアプリをレビュー
  ```

  ツールを導入していないプロジェクトは、PR を先に作ってインラインコメントで代替してよい。**重要なのは行単位で指摘が返る導線があること**で、特定ツールの採用ではない。

### 大きな差分の扱い（エージェントによる事前アノテーション）

差分が大きいと、人間が毎回すべてを読むのは現実的でない。**全部読む前提の運用は、実際には読まれないまま approve されるので、レビューが形骸化する。**

そこで、**人間に渡す前にエージェントが判断の要る箇所にだけ行単位のコメントを打ち、人間はそのコメントだけを見る。**

エージェントがコメントする（＝人間の判断が要る）もの:

1. **方針の選択が残っているもの。** 妥当な選択肢が複数あり、どれを採るかで結果が変わる
2. **リスク許容度の判断。** セキュリティ、破壊的操作、外部への配布
3. **文面が実際に行動を縛るか。** 規約・プロンプト・契約文の類
4. **その環境では検証できなかったもの**
5. **正しいが不自然に見えるコード。** 将来「整理」で壊される危険があるもの

コメントしないもの:

- **機械的に検証済みのもの**（テスト、リンク検査、不変条件の検査など）。代わりに検証コマンドと結果を PR / Issue に載せる。人間が読んでも機械より確かにはならない
- 単なる事実の報告。コメントは判断を求めるためにある

コメント本文には**何を判断してほしいか**を書く。「確認してください」では判断できない。選択肢があるなら列挙する。

応答の型:

- **resolve** = 合意。変更不要
- **返信** = 判断、または追加検証の依頼
- 検証を依頼されたら、エージェントは意見ではなく**実測**を返す

```bash
crit --pr <番号>                          # PR の差分をレビュー対象にする
crit comment <path>:<line[-end]> <本文>   # 判断が要る箇所へコメント
crit comments [--json] [--all]            # 指摘を読む
crit comment --reply-to <id> <本文>       # 返信
```

crit を導入していないプロジェクトは、PR のインラインコメントで同じことをする。手段ではなく**絞り込みの規律**が本体である。

採用理由は [../decisions/2026-08-02-inline-review-annotation.md](../decisions/2026-08-02-inline-review-annotation.md)。

### ルール

- 指摘は**行・箇所に紐づけて**返す。「全体的にもう少し良く」のような抽象指示はやり直しを招くため避ける。
- エージェントは指摘に**差分で応答する**。指摘のない箇所を作り直さない。
- 企画フェーズのレビュー結果で方針が変わったら、`docs/decisions/` に理由と情報ソースを残す。
- 人間承認が必要な領域（auth/secret/billing/production/legal）は、インラインレビューの完了を merge の前提にする。
- **crit の検証結果を対応 Issue に反映する。** 指摘と解消状況を、対応する GitHub Issue にコメントで残す（分割 → サブ開発結果報告、主 → 主開発結果報告）。詳細は `docs/framework/toolchain-flow.md`。

### 企画書と Issue の相互リンク

企画（superpowers でまとめ、`docs/planning/` に残す）と、それを実装する GitHub Issue / Linear タスクを双方向にリンクする。

- 企画書に、対応する Linear タスクと GitHub Issue の完全 URL を記す。
- GitHub 主 Issue 本文に、上位 Linear タスク URL と企画書 path を記す。分割 Issue は親（主 Issue）を明記する。
- 追跡が切れる進め方（企画を Linear/Issue に登録せず実装、crit を通さず PR 等）は非推奨。検知したら理由と代替案を示してから進む（`docs/framework/toolchain-flow.md` の「逸脱時の行動」）。

## Work Summary Notes

作業終了時に `docs/work-notes/YYYY-MM-DD-<topic>.md` を作る。

最低限:

- 対象
- 並行作業状態
- Spec Kit / GitHub 同期
- 内容
- 理由
- 検証
- 未完了、次の作業
- 関連リンク

## Decision Log

判断ログは `docs/decisions/YYYY-MM-DD-<topic>.md` に残す。

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
