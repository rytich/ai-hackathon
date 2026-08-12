---
title: v0.2.4 効果計測の最小基盤
status: review
updated: 2026-08-12
links:
  - https://github.com/rytich/agentic-framework/issues/34
  - ../../superpowers/specs/2026-08-12-v024-effect-metrics-design.md
---

# v0.2.4 効果計測の最小基盤 要件

詳細設計は [v0.2.4 効果計測の最小基盤 設計](../../superpowers/specs/2026-08-12-v024-effect-metrics-design.md) を参照する。

## 背景

複数 AI エージェント運用の効果を token 量だけで判断すると、品質、所要時間、retry、review、手戻りを無視した局所最適になる。Issue #34 と承認済み v0.3 roadmap の R5 に従い、企画から review までを work unit として記録・集計する最小基盤を提供する。

## スコープ

### やること

- Node.js 標準機能のみの `init / record / validate / report / doctor` CLI
- privacy-safe な work unit schema、template、合成 fixture
- work unit、Issue、PR、release、profile ごとの再現可能な集計
- local-only、既存 project Git、専用 Git repository の 3 保存モード
- Git repository がない保存先での local `git init` と manual commit の案内
- AF 開発用計測 repository と一般利用者の保存先の access 分離
- AF installation manifest と AF-only update scope check
- 非 blocking な未記録・未共有 warning

### やらないこと

- prompt、response、source、diff、log 本文の収集
- agent 別の自動 token 取得
- repository、remote、commit、push の自動化
- dashboard、database、billing 換算、因果評価
- 汎用 AF updater と remote branch protection

## 受け入れ条件

- [ ] work unit schema が version、分類、profile、model、token、時間、outcome、retry、review、rework、quality gate、artifact link を検証する。
- [ ] token 取得不能を `null` として保存し、0 と区別して欠測率を report する。
- [ ] schema 外 field、自由記述、secret / 個人情報を意図する field、絶対 path、親 directory traversal を拒否する。
- [ ] 1 work unit = 1 JSON file で atomic に作成し、duplicate ID を上書きしない。
- [ ] work unit、Issue、PR、release、profile の各粒度で Markdown と JSON report を決定的に生成できる。
- [ ] 欠測条件が揃わない cohort を `partial`, `unavailable`, `not_comparable` として区別する。
- [ ] local-only、既存 project Git 追跡、専用 Git repository の 3 モードを検証する。
- [ ] 既存 Git repository がない場合、metrics root を local Git repository として初期化する。
- [ ] 既存 project に統計を commit / push しうる mode は明示 acknowledgement と public / unknown remote warning を要求する。
- [ ] AF は repository、remote、commit、push を自動操作しない。
- [ ] AF 開発の実測値は AF 本体とは別の private 計測 repository に置き、一般利用者へ access させないことを文書化する。
- [ ] 一般利用者は新規 repository を必須とせず、既存 project repository または自身の専用 repository を選べる。
- [ ] `.agentic-framework/installation.json` が `managed`, `seeded`, `local-data` と checksum を保持する。
- [ ] AF update scope check が `managed` 以外、利用者変更済み managed file、application source、metrics data の混入を非 0 で拒否する。
- [ ] metrics 未記録や remote 未設定は warning に留め、task completion を block しない。
- [ ] 合成 fixture だけで代表 report と failure case を検証する。
- [ ] 外部 package を追加せず、既存 test と docs link check が回帰しない。
- [ ] 実装、検証 command、既知制約を work note に記録する。

## 制約

- schema、CLI、fixture、文書だけを AF 本体へ commit し、実測データと生成 report は commit しない。
- 既存 project 追跡 mode は許可するが、開発行動が推測可能になる risk を毎回診断できるようにする。
- v0.2.4 の AF update scope check は local quality gate であり、利用者による迂回を remote で阻止しない。remote 強制は v0.2.5 の対象とする。
- 計測値は記述統計であり、agent、model、profile の優劣や因果効果を断定しない。

## 未決事項

なし。詳細な field、exit code、保存構造は設計書を正とする。
