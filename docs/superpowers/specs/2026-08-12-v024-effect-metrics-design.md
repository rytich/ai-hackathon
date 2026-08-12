---
title: v0.2.4 効果計測の最小基盤 設計
status: review
updated: 2026-08-12
issue: https://github.com/rytich/agentic-framework/issues/34
requirements: ../../planning/requirements/2026-08-12-v024-effect-metrics.md
---

# v0.2.4 効果計測の最小基盤 設計

## 1. 目的

AI エージェントの token 消費だけでなく、所要時間、完了、品質ゲート、review 指摘、retry、手戻りを同じ活動単位で記録し、project、Issue、PR、release、AI profile ごとに再現可能な集計を行う。

正本は Issue や task ではなく `work unit` とする。企画、調査、要件定義、実装、test、review、調整を個別に記録することで、企画コストが後工程の手戻り削減に寄与したかを後から比較できるようにする。

v0.2.4 は記録と記述統計の最小基盤である。因果関係、費用換算、agent ごとの自動 token 取得、commit / push の自動化は扱わない。

## 2. 設計原則

1. **共通形式を正本にする。** Codex、Claude Code、hermes などの環境差を schema で吸収する。
2. **取得不能を 0 にしない。** token を取得できなければ `null` とし、欠測率を必ず表示する。
3. **本文を保存しない。** prompt、response、自由記述、secret、個人情報、production data を計測対象外にする。
4. **計測データを AF 本体から分離する。** schema、CLI、合成 fixture だけを AF 本体へ commit する。
5. **Git 同期を許可するが自動化しない。** repository 作成、commit、push の責任は利用者に残す。
6. **AF 更新を fail-closed にする。** AF 更新として検査する差分に利用者所有ファイル、application source、計測データが混ざれば拒否する。

## 3. 構成

### 3.1 AF 本体 repository に置くもの

- Node.js 標準機能だけで動く metrics CLI
- work unit schema と入力 template
- 合成 fixture と自動 test
- privacy、保存モード、Git 連携、集計方法の文書
- AF 導入 manifest と AF 更新 scope 検査

実測 work unit と生成 report は AF 本体 repository の管理対象にしない。

### 3.2 CLI

公開 entrypoint は `node scripts/metrics.mjs <command>` とし、導入先では thin wrapper から `scripts/agentic/metrics.mjs` を呼ぶ。

| Command | 責務 |
|---|---|
| `init` | 保存先、project、保存モードを初期化する。必要な場合だけ local `git init` を行う。 |
| `record` | JSON template または標準入力から 1 work unit を検証し、atomic に作成する。 |
| `validate` | schema、重複 ID、禁止 field、参照、数値整合性を全件検査する。 |
| `report` | work unit、Issue、PR、release、profile の各粒度で Markdown と JSON report を生成する。 |
| `doctor` | 保存先、Git、remote、可視性設定、追跡状態、AF 更新境界を診断する。 |

外部 package は追加せず、Node.js 標準 module と既存必須 tool の `git` だけを使う。`gh` がなくても記録と集計は可能にする。

## 4. 保存先と Git 運用

### 4.1 保存先の解決順

1. command の `--metrics-dir`
2. `AF_METRICS_DIR` 環境変数
3. gitignored local 設定 `.af-metrics.local.json` の `metrics_dir`
4. project root の `.af-metrics/`

local 設定に secret、remote credential、絶対 path 以外の個人情報を保存しない。絶対 path は端末内だけで使い、work unit や report には出力しない。

### 4.2 保存モード

#### A. 既存 project 内の local-only（既定）

- `<project>/.af-metrics/` に保存する。
- 既存 Git repository では `.git/info/exclude` を使い、tracked `.gitignore` を自動変更しない。
- 新しい repository は不要だが、複数端末では自動同期されない。

#### B. 既存 project repository で追跡

- 新しい repository を作らず、既存 project の Git で統計を共有できる。
- `init` は活動時刻、profile、model、成果参照から開発行動を推測できることを警告し、明示的な acknowledgement がない限り有効化しない。
- `doctor` は計測 file が tracked または staged なら警告する。public または可視性不明の remote では警告を強める。
- AF は commit と push を実行しない。

#### C. 専用 Git repository

- 組織横断、複数 project、複数端末の集計で推奨する。
- GitHub private repository を標準例とし、任意 Git remote も許可する。
- AF 開発チームの実測データは AF 本体とは別の private 計測 repository に置く。
- 一般の AF 利用者は AF 開発用計測 repository へアクセスさせない。各利用者・組織が自身の保存先を所有する。

### 4.3 Git repository がない場合

`init` は選択した metrics root で local `git init` を行う。remote の作成、credential 設定、commit、push は行わない。`doctor` と command 終了時の案内で、AF project ごとに変更を分けて commit するよう促す。

### 4.4 保存構造

```text
<metrics-root>/
  config.json
  projects/
    <project-id>/
      work-units/
        YYYY-MM/
          <work-unit-id>.json
      reports/
```

1 work unit を 1 file にして、複数端末の追加時に同一 JSONL への追記 conflict が起きないようにする。JSONL は `report` の export 形式としてのみ提供し、正本にはしない。

`project-id` は利用者が指定する非個人的な slug とする。repository 名や絶対 path から暗黙生成しない。

## 5. Work unit schema

schema は version を持ち、少なくとも次を含む。

| Field | 型・制約 |
|---|---|
| `schema_version` | 対応する固定 version |
| `work_unit_id` | UUID |
| `project_id` | 非個人的な slug |
| `kind` | `research`, `specification`, `implementation`, `test`, `review`, `coordination` |
| `purpose` | `feature`, `bugfix`, `maintenance`, `documentation`, `release`, `adoption`, `other` |
| `consumption_reason` | `primary`, `retry`, `review_fix`, `tool_failure`, `scope_change` |
| `profile` | profile slug。取得不能は `unknown` |
| `model` | model slug。取得不能は `unknown` |
| `tokens.input` | 0 以上の整数または `null` |
| `tokens.output` | 0 以上の整数または `null` |
| `tokens.total` | 0 以上の整数または `null`。既知の場合は input + output と一致 |
| `token_source` | `manual`, `agent_reported`, `unavailable` |
| `elapsed_ms` | 0 以上の整数または `null` |
| `outcome` | `completed`, `partial`, `failed`, `cancelled` |
| `retry_count` | 0 以上の整数 |
| `review_findings_count` | 0 以上の整数または `null` |
| `rework_count` | 0 以上の整数 |
| `quality_gate` | `pass`, `fail`, `unknown`, `not_applicable` |
| `links` | 任意の `task_id`, `issue_number`, `pr_number`, `release` |
| `artifact_refs` | repository 相対 path または GitHub Issue / PR 番号だけを許可 |
| `collector_id` | 任意の非個人的な slug |
| `recorded_at` | timezone 付き ISO 8601 |

目的文、prompt、response、email、user name、host name、branch の raw URL、自由記述 memo は schema に含めない。schema にない field は拒否する。

## 6. 記録と集計の data flow

1. 利用者または agent が template に分類値と数値を入力する。
2. `record` が全 field と privacy 制約を memory 上で検証する。
3. 同一 ID がないことを確認する。
4. 同じ directory に一時 file を作成し、排他的な rename で正本を作る。
5. `validate` が保存先全体を再検査する。
6. `report` が filter と集計軸を適用し、`reports/` へ Markdown と machine-readable JSON を生成する。

report は最低限、件数、完了率、token 合計、完了 work unit 当たり token、elapsed time、quality gate 通過率、retry、review 指摘、手戻り、各 field の欠測率を出す。

token が一部欠測している集計は `partial`、全件欠測は `unavailable` と表示する。比較対象の cohort で必要 field の coverage が揃わない場合は差分値を出さず `not_comparable` とする。v0.2.4 の比較は記述統計であり、因果効果や統計的有意差を主張しない。

## 7. Privacy と安全性

- prompt、response、source code、diff、log 本文を取り込まない。
- secret、token 値、credential、個人情報、production data を禁止する。
- artifact は識別子または repository 相対 path のみとし、親 directory traversal、絶対 path、URL query、fragment を拒否する。
- record は validation 完了前に正本を変更しない。
- 同一 work unit ID は上書きせず失敗する。
- `init` は既存 config、work unit、report、Git config を上書きしない。
- remote 可視性は `private`, `public`, `unknown` の明示設定として扱う。判定できない場合は安全側の `unknown` とし、共有前に確認を促す。
- metrics 未記録、remote 未設定、可視性不明は v0.2.4 では warning であり、task completion を block しない。

## 8. AF 更新境界

### 8.1 Installation manifest

導入先に `.agentic-framework/installation.json` を置き、次を記録する。

- 導入した AF version
- schema version
- project 相対 path
- ownership: `managed`, `seeded`, `local-data`
- 導入時の SHA-256 checksum

絶対 path、user、host、remote credential は記録しない。

### 8.2 Ownership

- `managed`: AF runtime と thin entrypoint。将来の AF updater が変更できる。
- `seeded`: `AGENTS.md`、project 固有 docs、profile 設定、GitHub template など。初回導入後は利用者所有で、自動上書きしない。
- `local-data`: `.af-metrics/`、local 設定、実測 report。AF 更新から常に除外する。

### 8.3 Scope check

`node scripts/agentic/check-af-update-scope.mjs --staged` は AF 更新 commit の staged path を manifest と比較する。

- `managed` と manifest 自身以外が含まれたら失敗する。
- checksum が導入時または直前 update 時から変わった `managed` file は利用者変更とみなし、上書きせず conflict で失敗する。
- `seeded`, `local-data`, application source, manifest にない path を含む差分は失敗する。
- 検査成功後も commit / push は行わず、AF 更新だけの commit を促す。

v0.2.4 は manifest と scope check を提供する。AF file を取得・置換する汎用 updater は別 Issue とする。local Git command は利用者が迂回できるため、remote での強制は v0.2.5 の CODEOWNERS / branch protection で扱う。この限界を「厳守できる」の例外として明記し、v0.2.4 の保証範囲を誇張しない。

## 9. Error handling

CLI は成功を 0、入力・schema・scope 違反を 1、usage または unsupported schema version を 2 とする。error は file path、field、期待値を示すが、record 本文や環境変数値を出さない。

複数 record に対する `validate` と `report` は全件を走査し、error 件数と対象 ID を列挙して非 0 で終了する。壊れた record を黙って除外して report を生成しない。

## 10. Test design

Node.js 標準 `node:test` を使い、次を自動検証する。

- local-only、既存 project 追跡、専用 repository の 3 モード
- Git repository がない場合の local `git init`
- public / unknown remote warning と明示 acknowledgement
- 複数 project、Issue、PR、release、profile 集計
- token 欠測時の `partial`, `unavailable`, `not_comparable`
- duplicate ID、不正 schema、未知 field、禁止 field、path traversal
- record の atomic 作成と既存 file 非上書き
- AF installation manifest の分類、checksum、staged scope 違反
- root と project template の runtime 同期
- 合成 fixture から Markdown / JSON report が決定的に生成されること
- 既存 Bash / Node test と docs link check の回帰がないこと

実測データ、実 user path、production repository は fixture に使わない。

## 11. Rollout と非目標

### v0.2.4 で行う

- 共通 schema、CLI、template、合成 fixture、report
- 3 つの保存モードと Git 連携案内
- privacy / access boundary の文書化
- installation manifest と AF update scope check
- completion pipeline からの非 blocking な未記録 warning

### v0.2.4 で行わない

- agent session からの自動 token 取得
- repository、GitHub remote、commit、push の自動作成
- billing 金額への換算
- dashboard、server、database
- 因果評価、ranking、performance quota
- 汎用 AF updater
- remote branch protection による強制

## 12. 完了判定

完了条件は [要件書](../../planning/requirements/2026-08-12-v024-effect-metrics.md) を正とする。実装後の PR では、合成 fixture の report、全検証 command、既知の欠測・比較不能条件、AF 更新境界の限界を明示する。
