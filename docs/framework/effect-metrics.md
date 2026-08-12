# Effect Metrics（効果測定）

AI 作業を token 量だけで評価せず、所要時間、完了、品質ゲート、retry、review 指摘、手戻りを同じ work unit で記録する。v0.2.4 の report は記述統計であり、agent、model、profile の優劣、因果効果、統計的有意差は主張しない。

## 保存先の選択

### 既存プロジェクト repository（既定・明示同意が必要）

既存 Git repository がある場合の既定値は `project-tracked`。複数端末の記録を既存 repository で集計できるが、活動時刻、profile、model、Issue/PR 参照などの開発行動が commit/push 対象になり得る。可視性を確認し、次の明示同意を付ける。

```bash
node scripts/metrics.mjs init \
  --project-id example-project \
  --acknowledge-repository-metrics-risk \
  --remote-visibility private
```

`--remote-visibility` は Git remote URL から推測せず、`private`, `public`, `unknown` を利用者が設定する。`public` と `unknown` は `doctor` が警告する。

### local-only

端末内だけで試す場合は `.git/info/exclude` に `.af-metrics/` を追加する。repository には commit されず、複数端末集計には使えない。

```bash
node scripts/metrics.mjs init --project-id example-project --mode local-only
```

### 専用 repository

アプリ repository と統計情報を分離する場合は `dedicated` を選ぶ。既存 Git repository 内の path を指定した場合も、その保存先を独立 Git repository として初期化する。

```bash
AF_METRICS_DIR=../example-project-metrics node scripts/metrics.mjs init \
  --project-id example-project \
  --mode dedicated \
  --remote-visibility private
```

remote は自動作成しない。`doctor` が private GitHub repository または任意の private remote を設定するコマンド例を表示するが、実行、commit、push はしない。

## 所有権とアクセス境界

AF 開発チーム自身の実測値は、AF ソース repository とは別の private metrics repository に保存する。一般の AF 利用者にはこの AF 開発用 repository へのアクセスを与えない。一般利用者・組織は各自の project repository、local-only 保存先、または専用 private repository を所有し、AF 開発用 repository へ統計情報を送信しない。

AF の CLI は Git repository の初期化までを補助するが、remote 作成、`git add`、commit、push を自動化しない。既存 project repository に統計情報を push する場合は、必ず内容と repository 可視性を人間が確認する。

## 記録と検証

work unit は privacy-safe schema に適合する JSON とし、自由記述、URL、絶対 path、親 directory traversal、raw prompt、secret、個人情報を保存しない。token が取得不能な場合は 0 ではなく `null` とし、`token_source` を `unavailable` にする。

```bash
node scripts/metrics.mjs record --input work-unit.json
node scripts/metrics.mjs record --input - < work-unit.json
node scripts/metrics.mjs validate
```

同じ `work_unit_id` は上書きせず拒否する。複数端末で記録するときは端末ごとに別 UUID を使い、通常の Git review と手動 commit/push で集計する。

## Report

```bash
node scripts/metrics.mjs report
node scripts/metrics.mjs report --generated-at 2026-08-12T00:00:00Z
```

Markdown、JSON、JSONL を `reports/<project-id>/` に生成する。work unit、Issue、PR、release、profile ごとに集計する。欠測は `complete`, `partial`, `unavailable` で表示し、比較 cohort の coverage が揃わない場合は数値差を出さず `not_comparable` とする。JSONL は export 用で、record storage への再入力形式ではない。

## Doctor

```bash
node scripts/metrics.mjs doctor
node scripts/metrics.mjs doctor --completion-warning
```

保存 mode、Git、origin、可視性設定、追跡・staged 状態を診断する。警告は repository 作成や push を実行せず、task completion を停止しない。警告を無視して公開 repository に push してよいという意味ではない。

## AF 更新との分離

`.agentic-framework/installation.json` は AF 配布 file を `managed`, `seeded`, `local-data` に分類する。AF 更新 commit には managed file と candidate manifest だけを含める。詳しい手順と local check の限界は [project-update.md](project-update.md) を参照する。
