# 作業サマリー: エージェント必須ツールと推奨ツールの分離

## 対象

- Issue: #35
- Branch: `ai/35-tool-requirements`
- PR: 未作成（Step 6 で人間確認待ち）
- Spec/Task: `docs/planning/requirements/2026-08-01-tool-requirements.md`（Task 1〜7）
- Agent: Claude Code
- AI profile: claude（このセッション自体。検証コマンドは `--profile codex-claude` を明示指定して実行した）

## 並行作業状態

- Assignee: Claude Code（本セッション）
- Labels: -
- Depends on: -
- Dependency decision: Proceed
- Parallel safety: 本 Issue 単独で `templates/project/.ai/profiles/*/tools.tsv`、`scripts/check-agent-tools.sh` 系、各 profile entrypoint、`toolchain-flow.md` を変更。他 Issue との同時変更は未確認。

## Spec Kit / GitHub 同期

- Spec Kit tasks: Task 1〜7（`.superpowers/sdd/` のプランに基づく）
- GitHub Issue: #35
- Completed task IDs: Task 1, 2, 3, 4, 5, 7
- Remaining task IDs: Task 6（`docs` 列の context7 ライブラリ ID 化。未実行）
- Issue state: open
- GitHub state re-fetched before comment/merge/close: 未実施（Step 6 は人間確認待ちのため push/PR/close 一切未実行）
- Closed Issue comment avoided: 該当なし
- Mismatch rationale: 該当なし

## Real-use Gate

- Real user path validated: `./scripts/check-agent-tools.sh --profile codex-claude` を実端末で実行し、実際の must/recommended 検出結果を確認した（下記「検証結果」参照）。
- Real provider/API/data path: 該当なし（外部 API 呼び出しは無い。ローカルコマンド存在確認のみ）
- User-facing fallback: recommended 欠落時の縮退案内メッセージが実際に表示されることを確認済み。
- Test doubles used: `scripts/test-check-agent-tools.sh` は一時ディレクトリに偽の `tools.tsv` を作って 11 ケースを検証するテストダブル方式。
- Mock-only drift check: 実端末での `--profile codex-claude` 実行（テストダブルではない本物のコマンド存在確認）も別途行い、両者の結果に矛盾がないことを確認した。

## 内容

- ツールを **must**（未導入なら作業を止めて導入を促す）と **recommended**（尋ねられたときだけ勧める）に分類する基準を確定した。
- `templates/project/.ai/profiles/<profile>/tools.tsv` を 5 profile 分作成し、`tool` / `class` / `check` / `fallback` / `docs` の宣言を profile ごとに機械可読な形で持たせた。
- 検証スクリプト `scripts/check-agent-tools.sh` とそのテストスイート `scripts/test-check-agent-tools.sh` を実装した。
- `docs/framework/toolchain-flow.md` の「優雅な縮退」節を「ツール要件」節へ拡張し、区分・対象 profile・縮退先の列を追加した。
- `AGENTS.md` と各 profile の entrypoint（`AGENTS.md` / `CLAUDE.md` / `.github/copilot-instructions.md`）に、must / recommended それぞれへの行動契約（停止して導入を促す／自発的に勧めない）を記載した。
- `bootstrap-project.sh` の末尾と `project-adoption.md` / `environment-reproducibility.md` の導入手順に検証スクリプトの実行を組み込んだ。
- `docs` 列の context7 ライブラリ ID 化は **未実施**（Task 6、後述）。現在は暫定の公式リポジトリ URL が入っている。

## Scope Discipline

- Change reason: Issue #35 の受け入れ条件（must/recommended 分離とその検証・行動契約の整備）に基づく。
- Out-of-scope findings:
  - `codex-dev-stack.md` に context-mode のインストールコマンドが欠落している（must に分類した以上いずれ埋める必要があるが、本件のスコープ外と判断し先送り）。
  - `templates/project/.ai/profiles/generic/files/AGENTS.md` の Required Reading 6 が Codex 専用の `codex-dev-stack.md` を指している（Task 4 のレビューで判明、範囲外として未対応）。
  - 英語版 Rules の recommended 文言が「縮退のコストが高いとき」という条件を落としている（Minor、未対応）。
  - `copilot-instructions.md` の箇条書きが本文の文体（段落のみ）と不一致（Minor、未対応）。
- Drive-by cleanup/refactor avoided or split: 実装エージェント（haiku）が「優雅な縮退」→「ツール要件」の文字列を **リポジトリ全体に一括置換** し、指示していなかった 3 ファイル（`docs/decisions/`、`docs/planning/requirements/`、`docs/work-notes/2026-07-15-toolchain-standard.md`）まで書き換える事故が Task 3 で発生した。特に `2026-07-15-toolchain-standard.md` は日付入りの過去記録であり、2026-07-15 時点に存在しなかった見出しを持つ内容に改変されてしまった。commit `5fd4733` で `a85d9c8` の状態へ復元した。本タスク（Task 7）はこの教訓を踏まえ、指示された 1 ファイルの新規作成のみに限定し、find-and-replace は一切行っていない。
- Existing pattern extended / new abstraction reason: `docs/framework/toolchain-flow.md` の既存「優雅な縮退」表を拡張する形にとどめ、新規文書は作成していない（設計方針どおり）。

## 理由

- AF はツールの使い方は定めていたが、導入させる仕組みを持たず、ツールごとに整備度がばらついていた（Serena は行動ルールあり／導入手順あり、context-mode は行動ルールのみ、superpowers はどちらも無し）。特に superpowers は標準フローの企画段を担うのに導入方法も未導入時の代替も存在しなかった。
- profile ごとに機械可読な宣言を持たせることで、`.ai/profiles/` という既存の profile 軸にツール要件を統合し、散在した散文を一箇所に集約した。

## 検証

Step 1（受け入れ条件を上から順に実行）:

```
$ ls templates/project/.ai/profiles/*/tools.tsv | wc -l
       5
```

```
$ ./scripts/check-agent-tools.sh --profile codex-claude; echo "exit=$?"
profile: codex-claude
tools:   /Users/ichie/github/agentic-framework/templates/project/.ai/profiles/codex-claude/tools.tsv

  OK        git            must
  OK        gh             must
  OK        context-mode   must
  OK        superpowers    must
  OK        serena         recommended
  OK        context7       recommended
  OK        specify        recommended
  OK        crit           recommended
  OK        skills         recommended
  optional  crabbox        recommended  fallback: ローカル worktree で並列
  OK        linear         recommended
  optional  symphony       recommended  fallback: 対話セッションで手動実行

recommended ツールが 2 件不足しています。
上記の縮退先で作業を継続できます。導入を自発的に勧めないこと。
must: OK
exit=0
```

```
$ ./scripts/test-check-agent-tools.sh
case 1: must も recommended も導入済みなら exit 0
  PASS  exit 0 を返す
case 2: must が欠落したら exit 1 とツール名の出力
  PASS  exit 1 を返す
  PASS  欠落した must のツール名が出る
  PASS  docs 列の参照先が出る
case 3: recommended だけ欠落なら exit 0 と縮退先の出力
  PASS  exit 0 を返す
  PASS  縮退先が出る
case 4: 定義ファイルが無い profile は exit 2
  PASS  exit 2 を返す
case 5: --profile が .ai/active-profile より優先される
  PASS  指定した profile が使われ exit 1 になる
  PASS  指定した profile のツールが出る
case 6: class が不正な値（例: Must）なら exit 2 でその値を示す
  PASS  exit 2 を返す
  PASS  不正な class 値が出る
case 7: フィールド数が5未満の行は exit 2
  PASS  exit 2 を返す
  PASS  フィールド数不正のメッセージが出る（class 分岐との偶然の一致でないことを確認）
case 8: CRLF 終端の tools.tsv でも正しく分類される（exit 2 にならない）
  PASS  CRLF でも exit 0 になる
  PASS  recommended の縮退先が出る
case 9: must 行の check 列が空だと exit 2（IFS 空白圧縮によるフィールドずれの回帰）
  PASS  exit 2 を返す（修正前は exit 0 で OK と誤判定していた）
case 10: tool 列が空だと exit 2
  PASS  exit 2 を返す
case 11: fallback 列が空だと exit 2（空フィールドは規約違反、'-' を使うこと）
  PASS  exit 2 を返す

PASS: 21  FAIL: 0
```

**注記:** タスクブリーフ（`.superpowers/sdd/task-7-brief.md`）は期待値を `PASS: 9  FAIL: 0` と記していたが、実際にテストを実行すると `PASS: 21  FAIL: 0` だった（11 ケース中に複数アサーションを持つケースがあるため PASS 行が 21 本になる。ブリーフ執筆時点の 9 から、レビューで見つかった欠陥の回帰テストを足した結果として増えている）。`FAIL: 0` は一致しており、テスト自体は全件成功している。ブリーフの期待値表記が古いだけで、スクリプトや実装に問題は無いと判断した。

```
$ grep -n "context-mode\|Serena" AGENTS.md templates/project/AGENTS.md; echo "exit=$?"
exit=1
```
（出力なし。`grep` が非マッチのため exit code 1。期待どおり。）

```
$ grep -n "context-mode" templates/project/.ai/profiles/claude/files/CLAUDE.md; echo "exit=$?"
exit=1
```
（出力なし。期待どおり。`superpowers` という語自体は AGENTS.md / templates/project/AGENTS.md に標準フローの説明として残っているが、これは grep 対象語ではなく想定通り。）

```
$ ./scripts/check-doc-links.sh
docs: 70 files  |  exempt: work-notes/, 作業記録/, templates/
OK: no broken links, no orphans.
```

Step 1b（5 profile すべての entrypoint に行動契約があることを検証）:

```
$ for f in ...; do printf "%-70s %s\n" "$f" "$(grep -c 'check-agent-tools.sh' "$f")"; done
templates/project/.ai/profiles/codex/files/AGENTS.md                   1
templates/project/.ai/profiles/claude/files/CLAUDE.md                  1
templates/project/.ai/profiles/codex-claude/files/AGENTS.md            1
templates/project/.ai/profiles/codex-claude/files/CLAUDE.md            1
templates/project/.ai/profiles/copilot/files/.github/copilot-instructions.md 1
templates/project/.ai/profiles/generic/files/AGENTS.md                 1
```

6 ファイルすべてが `1` で、期待どおり全て 1 以上。

Step 2（must の行の fallback 欄がすべて空であることを検証）:

```
$ awk -F'\t' '$0 !~ /^#/ && $2=="must" && $4!="-" {print FILENAME": "$1" has fallback: "$4}' \
    templates/project/.ai/profiles/*/tools.tsv
(出力なし)

$ awk -F'\t' '$0 !~ /^#/ && $2=="recommended" && $4=="-" {print FILENAME": "$1" has no fallback"}' \
    templates/project/.ai/profiles/*/tools.tsv
(出力なし)
```

どちらも出力なし。Task 3 で定めた不変条件（must は fallback 必ず `-`、recommended は必ず埋まる）が全 profile の `tools.tsv` で成立している。

Step 4（work note が orphan にならないこと）:

`./scripts/check-doc-links.sh` は上記 Step 1 で実行済みで `OK: no broken links, no orphans.` を確認した。`docs/work-notes/` は exempt 対象に含まれる（出力の `exempt: work-notes/, ...` で確認）。

コミット履歴（`a85d9c8`＝Task 1 着手直前 の直後 から HEAD まで）:

```
$ git log --oneline a85d9c8..HEAD
50c4249 fix: 実行権が無いだけの場合を「not found」と報告しないようにする
fb932cc feat: ツール要件の検査を導入フローへ組み込む
0194489 fix: copilot profile の entrypoint に停止規則を入れる
828ec49 fix: profile 単体で行動契約が成立するようにする
a7e4eff docs: ツールの行動契約を規約に入れ profile 依存の不整合を直す
104f9cc fix: ツール要件表の context7 と Linear の対象 profile を実態に合わせる
5fd4733 fix: 範囲外のドキュメント書き換えを戻し Symphony の対象 profile を直す
3cce6f2 docs: 縮退表をツール要件表へ拡張し must/recommended を明記する
322ac1e feat: profile ごとのツール要件定義 tools.tsv を追加する
bbaa04f fix: tools.tsv の空フィールドによる must チェック迂回を防ぐ
4fb5783 fix: tools.tsv の class 誤分類を定義ファイル不備として弾く
d82f1f2 feat: エージェントツールの導入状況を検査するスクリプトを追加する
```

- [x] lint/static analysis: 該当ツールなし（bash script、shellcheck 等の導入は本件スコープ外）
- [x] typecheck: 該当なし
- [x] unit test: `./scripts/test-check-agent-tools.sh` → `PASS: 21  FAIL: 0`
- [x] integration/e2e: `./scripts/check-agent-tools.sh --profile codex-claude` を実端末で実行し `exit=0` を確認
- [ ] build: 該当なし
- observable outcome: 上記コマンドの実出力どおり。すべて期待どおりの exit code とメッセージ。
- local/CI difference: 本機能は「ローカル端末の状態を見る」設計であり、CI では意味を持たないため CI には組み込んでいない（要件定義の「やらない」節どおり）。

## 判明した既存の不整合と対処

- **`AGENTS.md` の Mandatory Routing が claude profile で満たせない `context-mode` を必須化していた件。** 修正後の `AGENTS.md` の Mandatory Routing は「大量出力、ログ、広い検索、集計、比較、parse は、生データを会話へ流さず要約してから判断する。使う手段は profile ごとの entrypoint に従う」という profile 非依存の書き方になっている（commit `a7e4eff` 系列で修正済みであることを本タスクで再確認）。
- **claude profile の Required Reading Order が Codex 専用文書を指していた件。** `templates/project/.ai/profiles/claude/files/CLAUDE.md` の Required Reading Order を確認したところ、現在は `docs/framework/ai-environment-profiles.md` → `docs/framework/toolchain-flow.md` → `docs/framework/ai-execution-framework.md` の並びであり、Codex 専用の `codex-dev-stack.md` は含まれていない。修正済みであることを確認した。

## 未対応 / 次の作業

- **Task 6（`docs` 列の context7 ライブラリ ID 化）が未実行。** context7 MCP は本件の作業中に user scope へ登録されたが、MCP サーバーはセッション開始時にロードされる仕様のため、登録した当セッションからは一度も呼び出せなかった。現在 `tools.tsv` の `docs` 列は暫定の公式リポジトリ URL（例: `https://github.com/openai/codex`、`https://github.com/obra/superpowers` 等）のままになっている。これは失敗ではなく、新しいセッション（context7 がロードされた状態）で実行する必要がある残作業として記録する。
- `codex-dev-stack.md` の context-mode インストールコマンド欠落（must に分類した以上いずれ埋める必要がある。別 Issue とするか本件の続きとするかは未判断）。
- 英語版 Rules の recommended 文言が「縮退のコストが高いとき」条件を落としている（Minor）。
- `copilot-instructions.md` の箇条書きが本文の文体（段落のみ）と不一致（Minor）。
- テストケース 9〜11（Task 1 時点）は exit code のみ検証していた点は、その後のテストスイート改修で exit code に加えメッセージ内容もアサートする形に強化されている（本タスクで実行した最新の `test-check-agent-tools.sh` の出力で確認）。

## 作業中に発生した事故と修正（記録）

- **repo 全体への find-and-replace 事故。** Task 3 で実装エージェント（haiku）が「優雅な縮退」→「ツール要件」の文字列一括置換をリポジトリ全体に対して実行し、指示していなかった 3 ファイルを書き換えた。うち `docs/work-notes/2026-07-15-toolchain-standard.md` は日付入りの過去記録であり、2026-07-15 時点には存在しなかったセクションを持つ内容に改変されてしまった。commit `5fd4733` で `a85d9c8` の状態へ復元した。
- **gate script の silent-bypass 欠陥が 2 件、レビューでのみ発見された。**
  - `class` 欄が `must` 以外の値（例: 誤字の `Must`）だった場合に、黙って recommended 扱いへフォールスルーする穴。commit `4fb5783` で、定義ファイル不備として exit 2 で弾くよう修正。
  - `IFS=$'\t' read` が連続するタブを畳んでしまい、空の中間フィールドを持つ行で列がずれ、`must` 行なのに check 欄が空のまま「OK」と誤報告して exit 0 になる Critical な欠陥。commit `bbaa04f` で修正。
- **2 つの profile で行動契約が結線されていなかった。** `select-ai-profile.sh` は、有効化した profile が「managed」と宣言していない既存の instruction file を削除する。`generic` を有効化すると root の `AGENTS.md` が置き換えられ、`copilot` を有効化すると root の `AGENTS.md` が削除される。この 2 つの profile 自身の entrypoint には停止規則が書かれていなかったため、profile 適用後にその規則が到達不能になっていた。commit `828ec49`（generic）、`0194489`（copilot）で修正。
- **承認済み要件文書自身の分類表にも誤りがあった。** `docs/planning/requirements/2026-08-01-tool-requirements.md` の分類結果の表は、正本である `toolchain-flow.md` と同じ誤り（`context7` と `Linear` の対象 profile を「全」としていたが、実際には `copilot` と `generic` は MCP レジストリを問い合わせる手段が無いためこの 2 行を持ち得ない）を含んでいた。`toolchain-flow.md` 側は commit `104f9cc` で修正済み。要件文書側はあえて未修正のまま残している。要件定義書は承認時点の記録であり、後から誤りが分かったからといって書き換える運用にしていないため。
- **`check` コマンドはすべて PATH 依存。** `~/.local/bin` が PATH に無い shell では `codex` / `serena` / `specify` が missing と判定される。これは Task 2 のレビューエージェントの環境で実際に発生した。「到達できないツールは利用不可」という意味では正しい挙動とも言えるが、PATH の設定不備だけでゲートが作業をブロックしうる点は運用上注意が必要。
- **`crabbox` と `symphony` は多くのプロジェクトで常に「optional 欠落」と表示される。** 実際、本セッションの `--profile codex-claude` 実行結果でも両者は `optional` 表示だった。チェックが「その環境に大抵存在しないファイル／実行ファイル」を探しているため。出力が定常的に「欠落」を示し続けることで、運用者がこの出力自体を無視するようになっていないか、実運用の中で観察が必要。
- **`pipefail` により、導入済みの must ツールが確率的に「未導入」と判定されていた（Critical）。** ブランチ全体の最終レビューで発見。`check-agent-tools.sh` は `set -euo pipefail` の下で `eval "$check"` を実行しており、`check` の多くは `codex mcp list | grep -q context-mode` の形をしている。`grep -q` は最初のマッチで終了するため producer が次の書き込みで SIGPIPE を受け、`pipefail` がそれをパイプライン全体の失敗として表面化させていた。最小再現での測定結果は次のとおり。

  | 条件 | 12 回実行の結果 |
  |---|---|
  | `set -euo pipefail`（修正前） | ほぼ全て MISSING |
  | `set -eu`（pipefail なし） | 12/12 OK |
  | pipefail 有効のまま eval だけ `set +o pipefail` | 12/12 OK |

  影響を受けるのは `context-mode` と `superpowers`（どちらも **must**）、`context7`、`skills`、`linear` の各行。`command -v` 系と `test -f` / `test -x` 系だけが無傷だった。本ブランチが定めた行動契約の下では、**導入済みのツールについてエージェントに「作業を止めて人間に導入を依頼せよ」と指示する**ことになり、しかも bootstrap 経由で全導入先へ配布される。commit `3170cf0` で、eval だけを `set +o pipefail` のサブシェルで包むよう修正し、修正後は 20 回連続で exit 0 を確認した。

  この欠陥は per-task レビューを通り抜けている。Task 1 のレビューは TSV のパースと分類ロジックに集中しており、`check` の実行形態そのものは検査対象になっていなかった。単体では正しく見える部品でも、実行環境（この場合は shell option）と組み合わせた時にだけ壊れる種類の欠陥は、タスク単位のレビューでは捕まらないことがある、という記録として残す。

## 関連リンク

- Issue: #35
- 要件定義: `docs/planning/requirements/2026-08-01-tool-requirements.md`
- 判断記録: `docs/decisions/2026-08-01-tool-requirements.md`
- 正本: `docs/framework/toolchain-flow.md`
- 検証スクリプト: `scripts/check-agent-tools.sh`、`scripts/test-check-agent-tools.sh`

## 追記（2026-08-02）: context-mode の対象 profile の訂正

- 本ブランチが記録した「context-mode は Codex 専用プラグイン」という前提は事実誤りだった。インストール済みプラグインの `package.json`（`description`: "Works with Claude Code, Gemini CLI, VS Code Copilot, OpenCode, and Codex CLI."）を確認したところ、Claude Code にも対応しており、README にプラグインマーケットプレイス経由と MCP 直接登録の 2 通りの導入手順があることが分かった。
- 訂正内容と理由は新規の判断記録 [2026-08-02-context-mode-profile-scope.md](../decisions/2026-08-02-context-mode-profile-scope.md) に記載した。`2026-08-01-tool-requirements.md` は時点記録として書き換えず、この新しい判断記録を現行の正本として扱う。
- 変更したファイル: `templates/project/.ai/profiles/claude/tools.tsv`（`context-mode` を must として追加）、`templates/project/.ai/profiles/codex-claude/tools.tsv`（check を Claude Code 2 経路含む 3 択に拡張）、`docs/framework/toolchain-flow.md`（ツール要件表の対象 profile 修正）、`templates/project/.ai/profiles/claude/files/CLAUDE.md`（script/サブエージェント要約の記述を must ツール行動契約へ差し替え）。
- **想定される影響（回帰ではない）**: 本作業を行った端末では `context-mode` は Codex 側には導入済みだが Claude Code 側（プラグイン・MCP のいずれ）にも導入していない。そのため `./scripts/check-agent-tools.sh --profile claude` は訂正後 `exit 1` で `context-mode` の未導入を報告するようになる。これは縮退先が無い must ツールが未導入であることをゲートが正しく検出した結果であり、ゲートの設計どおりの動作である。
