# Toolchain Flow（統合ツールチェーン標準フロー）

superpowers / Spec Kit / crit / skills(AIBC) / GitHub Issues / Linear を **1 つの標準フロー**に束ねる正本。どのツールを、どの段で、何を成果物に、どの追跡先へ出すかを一意に決める。目的は、複数フレームワーク併用時の衝突（レビュー・出荷・知識ベース）を避け、作業を追跡可能に保つこと。

この標準から外れる進め方を見つけたら、**非推奨であることを明示し、標準の代替案を提示してから**進む（下記「逸脱時の行動」）。

## 追跡の正（二層）

- **PM / 企画 = Linear が正**（ロードマップ、サイクル、プロジェクトタスク）。
- **開発の作業単位 = GitHub Issues が正**（要件、主タスク、分割タスク、検証結果）。
- 両者は相互リンクし、各層で権威を持つ。開発の状態は GitHub が、プロジェクトの状態は Linear が真とする。

### 管理先の境界（Linear か GitHub か）

判定は 1 つ: **その作業がアプリケーションのソースコード（と、その改修・機能追加の要件定義・開発タスク）に関わるか。**

| 対象 | 管理先 | 分割 |
|---|---|---|
| 機能追加・バグ改修・リファクタなどのコード変更 | **GitHub** Issue ＋ PR | Spec Kit で主 / 分割 Issue |
| その改修の要件定義書・開発タスク（システム開発） | **GitHub** Issue | 主 / 分割 Issue |
| 人間が実行する企画・ロードマップ・事業判断 | **Linear** | 必要なら sub-issue |
| ソースコードに反映しないファイル変更（マーケ資料・ブランド・対外文書・非開発の設定など） | **Linear** | 必要なら sub-issue |
| `docs/knowledge/` の非開発カテゴリ更新（人間主導） | **Linear** で作業管理し、成果物は `docs/` に残す | 必要なら sub-issue |

- 迷ったら「これは**アプリのソースコードを変える or その要件・開発タスクか**」を問う。Yes → GitHub、No → Linear。
- ドキュメント変更の扱い: **開発ドキュメント**（要件定義、engineering 系）はコードと同じ Issue/PR に載せる（GitHub）。**非開発ドキュメント**（事業・マーケ・ブランド等）は Linear で管理する。
- 分割はどちらの側でも行う。GitHub は Spec Kit の主 / 分割 Issue、Linear は sub-issue。

## 標準フロー（入れ子＋ロールアップ）

```
企画          superpowers / plan mode（profile 依存）→ Linear（プロジェクトタスク）  [PM層・正=Linear]
 │            企画書は docs/planning/ に残し、Linear タスクと相互リンク
 └ 実装(主)   Spec Kit 要件定義    → GitHub Issue（主タスク）            [開発層・正=GitHub]
     │        主 Issue は上位の Linear タスクへリンク
     ├ 実装(分割) Spec Kit で分解  → GitHub Issue（分割タスク／主にリンク）
     │   └ 検証  crit             → 分割 Issue に「サブ開発結果報告」をコメント
     ├ 実装(分割) Spec Kit で分解  → GitHub Issue（分割タスク／主にリンク）
     │   └ 検証  crit             → 分割 Issue に「サブ開発結果報告」をコメント
     └ 検証(主)  crit             → 主 Issue に「主開発結果報告」をコメント
 └ 課題解決   complete-task.sh 延長 → Linear（解決を上位タスクへロールアップ）
```

企画段のツールは profile 依存: `claude` / `codex-claude` は superpowers、`copilot` / `generic` は superpowers が使えないため plan mode で企画を練り、成果を `docs/planning/` に残す。詳細は下記「ツール要件（must / recommended）」の表を参照。

補助レイヤー:

- **AF（統治）**: docs 構造・Issue 駆動・品質ゲート・承認境界。常時 ON で道具に依存しない。
- **skills（基盤/並列）**: 分割タスクを worktree → crabbox で並列に回す。dev-local/e2e で実行可能化し、pr で実駆動検証する。

## 段ごとの担当

| 段 | 担当ツール | 成果物 | 追跡先（正） |
|---|---|---|---|
| 企画・意図探索 | superpowers `brainstorming` / `writing-plans`（claude, codex-claude）／ plan mode（copilot, generic） | 企画書（`docs/planning/`） | Linear プロジェクトタスク |
| 要件定義・主タスク | Spec Kit `specify` / `plan` | 要件、`tasks.md` | GitHub 主 Issue |
| タスク分解 | Spec Kit `tasks` | 分割タスク | GitHub 分割 Issue |
| 並列実装 | superpowers `test-driven-development` ＋ skills `worktree`/`crabbox` | 差分 | GitHub 分割 Issue |
| 人間レビュー・検証 | crit | 行単位コメント → 差分反映 | 対応 Issue へ結果コメント |
| 出荷・完了 | AF `complete-task.sh`（＋ skills `pr` で実駆動検証） | PR、objective review | GitHub Issue close |
| 課題解決・ロールアップ | AF 完了パイプライン延長 | 解決サマリ | Linear アイテム更新 |

段をまたいで使う補助:

| 用途 | ツール | 使いどころ |
|---|---|---|
| 大量出力・ログ・広域検索・集計・parse | context-mode | 生データを会話へ流さない。Validate 段のテスト出力やログ解析、Intake 段の広域調査 |
| tracker 起点の無人継続実行 | Symphony | 下記「実行の自動化層」 |

## 実行の自動化層（Symphony）

[Symphony](https://github.com/openai/symphony)（Apache 2.0）は、**issue tracker をコーディングエージェントの control plane にする**長期稼働サービスの仕様。OpenAI は仕様と Elixir の参照実装を公開しており、製品としては保守しない。使う場合は自前実装かリファレンス実装を運用する。

やること:

- tracker（Linear など）を継続的にポーリングし、active な issue を拾う。
- **issue ごとに隔離ワークスペース**を作り、その中でコーディングエージェントを実行する。
- スタール・クラッシュ時は再起動し、`max_turns` まで同一スレッドで継続する。
- 実行方針（プロンプトと runtime 設定）を **`WORKFLOW.md` としてリポジトリに置き**、コードと同じくバージョン管理する。

AF の標準フローとの関係:

- **Symphony はスケジューラ／ランナーであり、チケットの書き手ではない。** 状態遷移・コメント・PR リンクはエージェントが provider-native tool で行う。したがって本書の相互リンク契約とロールアップ契約は Symphony 導入後も変わらない。
- **成功した実行は `Done` で終わらなくてよい。** `Human Review` のような handoff state で止められる。`quality-gates.md` の人間承認領域（destructive migration、auth/secret/permission、billing、production deploy、infrastructure、privacy/legal、不可逆なデータ削除）は、この handoff state を終着点にして守る。**Symphony に自動 merge させない。**
- issue ごとの隔離ワークスペースは、本書「並列開発」の worktree / crabbox と同じ目的（並列時の衝突回避）を果たす。どれを使うかはプロジェクトで 1 つに決める。
- 前提として、リポジトリが **run / test / verify できる状態**（harness engineering）になっている必要がある。整っていないうちに無人実行させない。
- `WORKFLOW.md` はリポジトリ所有の設定であり、変更は他の運用ルールと同じく PR とレビューを通す。

導入するかはプロジェクトの判断。採否と理由は `docs/decisions/` に情報ソース付きで残す。

## Spec Kit の位置づけ

Spec Kit は**企画の上位ではなく実装層**のフェーズコントローラ。企画（担当ツールは profile 依存、→ Linear。後述のツール要件表を参照）を受けて、**要件定義とタスク分解**を担い、その成果を GitHub Issue（主・分割）にマップする。`tasks.md` ↔ GitHub Issues の同期は `docs/framework/ai-execution-framework.md` の Completion Synchronization と `complete-task.sh` に従う。

- Spec Kit が使える project: specify/plan/tasks を正式フェーズとして使い、tasks を Issue 化する。
- Spec Kit が無い project: plan mode で要件を書き、`docs/planning/requirements/` に残して Issue 化する（縮退）。
- plan mode は「対話で企画・要件を練る場」、`docs/planning/` は「企画書・要件の置き場」、Spec Kit は「フェーズ制御と分解」。役割が違うので競合しない。

## 相互リンク契約

1. **企画書 ↔ Linear**: 企画書（`docs/planning/`）に Linear タスク URL を、Linear タスクに企画書 path を記す。
2. **GitHub 主 Issue ↔ Linear**: 主 Issue 本文に上位 Linear タスク URL、Linear タスクに主 Issue URL。
3. **分割 Issue ↔ 主 Issue**: 分割 Issue に親（主 Issue）を明記。
4. **crit 検証結果 → Issue**: crit の指摘と解消状況を、対応 Issue にコメントで残す（分割 → サブ開発結果報告、主 → 主開発結果報告）。証跡リンク（crit のレビュー成果物や PR）を添える。

リンクは相対 URL でなく完全 URL を使う（別サービス間のため）。

## ロールアップ契約（課題解決 → Linear）

- GitHub の主/分割 Issue が解決したら、**AF 完了パイプライン（`complete-task.sh` の延長）**が、対応する Linear アイテムのステータスと解決サマリを更新する。
- 逆方向: Linear の優先度・サイクルが着手順として GitHub 側に降りる。
- 正は層ごと（PM=Linear, dev=GitHub）。矛盾したら、開発の事実は GitHub、プロジェクトの意思決定は Linear を優先する。

## 衝突タイブレーカ（1 領域 1 ツール）

複数ツールが同じ領域を持つ場合、次の 1 つに寄せる（`docs/framework/agent-settings-replication.md` の Framework Coexistence）。

- **レビュー**: 人間レビュー面は **crit に一本化**。superpowers `requesting/receiving-code-review` は「人間に見せる前の AI 相互チェック」として前段に置く。AF の Inline Review は「いつ必須か」を定めるだけ。
- **出荷・検証**: 外側パイプラインは **AF `complete-task.sh`**（何が Done か）。アプリを実駆動して確かめる工程は **skills `pr`**。superpowers はチェックリスト規律として併走。3 つを別々に走らせない。
- **知識ベース**: **1 repo 1 つ**。AF は `docs/knowledge/` を採用済みのため、同じ repo に AIBC `new-loop` の substrate（signals/docs/domains）を**並置しない**。new-loop の思想（compounding、決定論的 collector）は借りてよいが、並行フォルダ木は作らない。

## 実行エージェントとオーケストレーション

AF は特定の AI に依存しない。Codex / Claude Code / hermes のいずれでも同じ規約で動く。ただし **GitHub Issue をどう消化するか（オーケストレーション方式）はエージェントによって異なる**。

| エージェント | オーケストレーション | 隔離 |
|---|---|---|
| Codex | **Symphony** — tracker を継続ポーリングし、拾った issue ごとに無人で実行する | issue ごとのワークスペース |
| Claude Code | **マルチエージェント（skills）** — 分割 Issue を複数エージェントで同時に進める | worktree → crabbox |
| hermes | **マルチエージェント（skills）** — 同上 | worktree → crabbox |

方式が違っても、次は共通:

- **追跡先は GitHub Issue**。作業単位・検証結果の記録先は変わらない。
- **承認境界は同じ**。人間承認が必要な領域では自動 merge させない。Symphony では handoff state で止める。
- **同一 Issue を複数エージェントで並行させない。** 分担するなら Issue を分割する。

hermes のように AF の外で運用されるエージェントも、この repository で作業する間は本書と `AGENTS.md` の規約に従う。エージェント本体の実装・運用がどこにあるかは問わない。

## 並列開発

- 分割タスクは isolated worktree で並列に実装する（`docs/framework/collaboration-rules.md` の Worktree Rule）。
- 1 台で N スタックを同時に立てられない（固定ポート・単一 DB）場合は、skills `crabbox` でエージェントごとにクラウド隔離箱へ昇格する。
- Symphony を使う場合は issue ごとのワークスペースがこの役割を果たす。**隔離方式はプロジェクトで 1 つに決める**（worktree / crabbox / Symphony のワークスペースを混在させない）。
- 同一 Issue を複数エージェントで並行させない。分担するなら Issue を分割する。

## PM ツールの差し替え

既定は Linear。ツール非依存の契約とし、正となるトラッカーと connector（MCP / CLI / API）、同期方向、ID マッピング規則を **`docs/knowledge/engineering/`** に project ごとに宣言する。Jira / GitHub Projects などにも同じ契約を当てられる。

## 逸脱時の行動（徹底）

人間またはエージェントがこの標準フローから外れて進めようとした場合、黙って従わない。次を順に行う。

1. **検知**: どの段で標準と違うか（例: 企画を Linear に登録せず直接実装、crit を通さず PR、Spec Kit を飛ばして分割、知識を new-loop substrate に書く）。
2. **非推奨の明示**: なぜ非推奨か（追跡が切れる／レビューが飛ぶ／二重構造になる等）を一言で伝える。
3. **代替案の提示**: 標準に沿う具体的な進め方を示す。
4. それでも人間が明示的に選ぶなら従うが、逸脱と理由を work note か Issue に残す。

黙認は禁止。標準は守るためにあり、破る場合は記録して破る。

## ツール要件（must / recommended）

ツールは **must** と **recommended** に分ける。基準は**縮退先の有無**。

- **must** — 未導入では本書や `AGENTS.md` の規約文が成立しない。フォールバックを定義しない。
- **recommended** — フォールバックが定義されており、無くても運用が破綻しない。

**この表の形式が基準そのものである。** must の行は「未導入時」欄が必ず `-`、recommended の行は必ず埋まる。片方だけの状態を作らない。

| ツール | 区分 | 対象 profile | 未導入時 |
|---|---|---|---|
| git | must | 全 | - |
| gh | must | 全 | - |
| context-mode | must | codex, claude, codex-claude | - |
| superpowers | must | claude, codex-claude | - |
| Serena | recommended | codex, claude, codex-claude | rg/grep によるテキスト検索 |
| context7 | recommended | codex, claude, codex-claude | WebSearch/WebFetch で公式ドキュメントを直接取得 |
| Spec Kit | recommended | 全 | plan mode で要件を書き `docs/planning/requirements/` に残して Issue 化 |
| crit | recommended | 全 | PR のインラインコメントでレビュー |
| skills | recommended | claude, codex-claude | AF `complete-task.sh` と real-use gate のみで検証 |
| crabbox | recommended | claude, codex-claude | ローカル worktree で並列 |
| Linear（PM ツール） | recommended | codex, claude, codex-claude | GitHub Issues のみで運用（企画も Issue 化）。PM 反映はスキップ |
| Symphony | recommended | codex, codex-claude | 対話セッションで手動実行 |

copilot / generic profile は must が `git` / `gh` のみになる。Codex プラグインも Claude Code プラグインも使えない環境であり、正しい結果である。

### 検証

機械可読な定義は `.ai/profiles/<profile>/tools.tsv` に置き、次で検査する。

```bash
./scripts/check-agent-tools.sh
```

`check` は任意 shell ではない。`cmd:<name>`、`file:<path>`、`exec:<path>`、`mcp:<agent>:<name>`、`plugin:<agent>:<name>` を使い、複数候補は ` || ` で連結する。未知の語彙は定義不備として exit 2 になる。

must が欠落していれば `exit 1`、recommended だけの欠落は縮退先を表示して `exit 0`。**スクリプトはインストールを行わない。** 環境変更は人間の承認領域（[quality-gates.md](quality-gates.md)）。

### 行動契約

- **must が未導入と分かったら、作業を止めて導入を促す。** 縮退して進めない。
- **recommended は自発的に勧めない。** 尋ねられたとき、または縮退のコストが明らかに高いときだけ提示する。

縮退しても、追跡（企画↔Issue）と検証結果の記録は省かない。

## 関連

- 標準ワークフロー全体: [ai-execution-framework.md](ai-execution-framework.md)
- レビューと双方向リンク: [collaboration-rules.md](collaboration-rules.md)
- フレームワーク共存と skill 規約: [agent-settings-replication.md](agent-settings-replication.md)
- この標準を採用した理由や、PM ツール差し替えなどの判断は、各プロジェクトの `docs/decisions/` に情報ソース付きで残す。
