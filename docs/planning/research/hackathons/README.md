---
title: 第1〜4回 AI Agent Hackathon 提出・受賞プロジェクト調査
date: 2026-09-10
status: done
sources:
  - https://zenn.dev/challenges?type=hackathon
  - https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
  - https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
  - https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
  - https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
  - https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5
---

# 第1〜4回 AI Agent Hackathon 提出・受賞プロジェクト調査

## 目的

Zenn主催「AI Agent / Agentic AI Hackathon with Google Cloud」の第1〜4回について、公式掲載された全提出作品と受賞作品を再利用可能なデータとして整理する。

## 成果物

- [全589件のJSON](../../../../data/hackathons/projects.json)
- [全589件のCSV](../../../../data/hackathons/projects.csv)
- [JSON Schema](../../../../data/hackathons/schema.json)
- [第5回優勝に向けた人間用HTMLレポート](vol1-4-strategy-report.html)
- [第5回優勝に向けたAIコンテキスト](vol1-4-strategy-context.md)
- [第1回](vol-1.md)（128件、受賞8件）
- [第2回](vol-2.md)（158件、受賞9件）
- [第3回](vol-3.md)（108件、受賞6件）
- [第4回](vol-4.md)（195件、受賞9件）
- [設計](../../requirements/2026-09-10-hackathon-history-research-design.md)
- [実行計画](../../implementation/2026-09-10-hackathon-history-research.md)

## データの読み方

- `official-list-only`: 公式プロジェクト一覧の作品名、説明、参加形態、記事URLまで確認した。
- `article-checked`: 上記に加えて受賞作品のZenn記事本文を確認した。
- `awards`: 空配列なら公式結果発表上は非受賞。値があれば公式の賞見出しを保存している。
- `github_urls`: 受賞記事からプロジェクトのリポジトリと判断できたURLだけをリポジトリrootへ正規化している。
- `demo_urls`: 受賞記事に明示された公開アプリ用ホストまたは明確なデモリンクだけを保存している。
- `technologies`: 記事本文に明示された限定語彙だけを保存しており、技術構成全体を網羅する値ではない。
- `null` / 空配列: 公式ページまたは記事から確認できなかった。検索による推測補完はしていない。

## 第5回の製品企画への利用

人間用HTMLとAI向けMarkdownは、過去4回の全589件と第5回の公式審査条件を同じ視点で参照するための派生成果物である。第5回では審査軸が「課題の新規性と解決策の有効性」「自律性・エージェントらしさ」「実装品質と拡張性」に刷新されているため、過去の受賞率は発想の補助線に留め、公式3軸を優先する。

- HTML: 回別・領域別グラフ、歴代最優秀賞、機能シグナル比較、企画ゲート、全作品フィルターを持つ。外部CSS・JavaScriptに依存しない。
- Markdown: AIが企画候補の比較や競合作品の検索に使えるよう、分析前提、公式条件、全589件の説明とURL文字列を定型で保持する。
- 分類は作品名・公式説明・記事タイトルへのキーワード規則による一次分類であり、各作品の完全な機能分類でも受賞理由の因果分析でもない。

## 集計

| 回 | 開催期間 | エントリー | 提出 | 個人 | チーム | 受賞 |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 第1回 | 2024-12-19〜2025-02-10 | 500 | 128 | 69 | 59 | 8 |
| 第2回 | 2025-04-14〜2025-06-30 | 850 | 158 | 80 | 78 | 9 |
| 第3回 | 2025-08-05〜2025-09-24 | 500 | 108 | 67 | 41 | 6 |
| 第4回 | 2025-12-10〜2026-02-15 | 880 | 195 | 125 | 70 | 9 |
| 合計 | — | 2,730 | 589 | 341 | 248 | 32 |

エントリー数、開催期間、提出数は各公式ページの公開値。個人・チーム・受賞件数は取得した589レコードから集計した。

## 取得・検証方法

1. 公式projectsタブの `__NEXT_DATA__` 内 `hackathon.projects` を掲載順のまま取得した。
2. 同じデータの `resultMarkdown` にある賞見出しとZenn記事URLを、提出一覧の記事URLへ対応付けた。
3. 受賞32件のみ提出記事本文を確認し、タイトル、GitHub、デモ、主要技術を補足した。
4. JSON/CSVの全17列、回別件数、掲載順、必須項目、受賞名をスクリプトで検証した。

再取得コマンド:

```bash
node scripts/research/collect-hackathon-data.mjs \
  --checked-at "$(date +%F)" \
  --output data/hackathons/projects.json \
  --csv-output data/hackathons/projects.csv
node scripts/research/collect-hackathon-data.mjs \
  --enrich-awards data/hackathons/projects.json \
  --csv-output data/hackathons/projects.csv
node scripts/research/validate-hackathon-data.mjs \
  data/hackathons/projects.json data/hackathons/projects.csv
node scripts/research/generate-strategy-report.mjs \
  --input data/hackathons/projects.json \
  --html-output docs/planning/research/hackathons/vol1-4-strategy-report.html \
  --markdown-output docs/planning/research/hackathons/vol1-4-strategy-context.md
```

通常実行は公式ページを再取得してキャッシュを更新する。`--checked-at` には実行日を指定する。既存キャッシュを使う場合だけ `--offline-cache` を指定し、各回のキャッシュメタデータに保存された確認日を採用する。受賞記事キャッシュも同じ確認日のメタデータを持ち、datasetと日付が違う場合はenrichmentを停止する。受賞情報の再照合は次で行う。

```bash
node scripts/research/collect-hackathon-data.mjs \
  --report-award-mismatches data/hackathons/projects.json
```

## 確認境界

- 確認日: 2026-09-10（Asia/Tokyo）
- 第5回公式ルールの確認日: 2026-09-10（Asia/Tokyo）
- 全提出記事の本文確認はしていない。非受賞作品は公式一覧に掲載された情報のみ。
- GitHubリポジトリやデモの現在の稼働、ソースコード内容、ライセンスは検証対象外。
- 第1回4件、第2回1件は公式一覧の説明が空欄。
- 第3回は同一記事URLがentry order 12と14で別作品名として掲載されているため、公式掲載どおり2レコードを維持した。
