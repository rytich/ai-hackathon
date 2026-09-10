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
---

# 第1〜4回 AI Agent Hackathon 提出・受賞プロジェクト調査

## 目的

Zenn主催「AI Agent / Agentic AI Hackathon with Google Cloud」の第1〜4回について、公式掲載された全提出作品と受賞作品を再利用可能なデータとして整理する。

## 成果物

- [全589件のJSON](../../../../data/hackathons/projects.json)
- [全589件のCSV](../../../../data/hackathons/projects.csv)
- [JSON Schema](../../../../data/hackathons/schema.json)
- [第1回](vol-1.md)（128件、受賞8件）
- [第2回](vol-2.md)（158件、受賞9件）
- [第3回](vol-3.md)（108件、受賞6件）
- [第4回](vol-4.md)（195件、受賞9件）
- [設計](../../../superpowers/specs/2026-09-10-hackathon-history-research-design.md)
- [実行計画](../../../superpowers/plans/2026-09-10-hackathon-history-research.md)

## データの読み方

- `official-list-only`: 公式プロジェクト一覧の作品名、説明、参加形態、記事URLまで確認した。
- `article-checked`: 上記に加えて受賞作品のZenn記事本文を確認した。
- `awards`: 空配列なら公式結果発表上は非受賞。値があれば公式の賞見出しを保存している。
- `github_urls`: 受賞記事からプロジェクトのリポジトリと判断できたURLだけをリポジトリrootへ正規化している。
- `demo_urls`: 受賞記事に明示された公開アプリ用ホストまたは明確なデモリンクだけを保存している。
- `technologies`: 記事本文に明示された限定語彙だけを保存しており、技術構成全体を網羅する値ではない。
- `null` / 空配列: 公式ページまたは記事から確認できなかった。検索による推測補完はしていない。

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
4. JSON/CSVの件数、キー、必須項目、受賞URL対応をスクリプトで検証した。

再取得コマンド:

```bash
node scripts/research/collect-hackathon-data.mjs \
  --checked-at 2026-09-10 \
  --output data/hackathons/projects.json \
  --csv-output data/hackathons/projects.csv
node scripts/research/collect-hackathon-data.mjs \
  --enrich-awards data/hackathons/projects.json \
  --csv-output data/hackathons/projects.csv
node scripts/research/validate-hackathon-data.mjs \
  data/hackathons/projects.json data/hackathons/projects.csv
```

## 確認境界

- 確認日: 2026-09-10（Asia/Tokyo）
- 全提出記事の本文確認はしていない。非受賞作品は公式一覧に掲載された情報のみ。
- GitHubリポジトリやデモの現在の稼働、ソースコード内容、ライセンスは検証対象外。
- 第1回4件、第2回1件は公式一覧の説明が空欄。
- 第3回は同一記事URLがentry order 12と14で別作品名として掲載されているため、公式掲載どおり2レコードを維持した。
