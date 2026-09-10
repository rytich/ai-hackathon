# 第1〜4回 AI Agent Hackathon 調査データ設計

## 目的

第5回 Agentic AI Hackathon with Google Cloud で優勝を狙う製品企画の参考情報として、第1回から第4回までの公式提出・受賞プロジェクトを再利用可能な形で収集・分析する。外部リンクが失効しても作品の文脈を把握できる人間用HTMLとAI向けMarkdownを残し、調査・企画の成果物と、今後開発するアプリケーションのソースコードを明確に分離する。

## 対象範囲

- 対象は Zenn が主催した以下の4回とする。
  - 第1回: AI Agent Hackathon with Google Cloud
  - 第2回: 第2回 AI Agent Hackathon with Google Cloud
  - 第3回: 第3回 AI Agent Hackathon with Google Cloud
  - 第4回: 第4回 Agentic AI Hackathon with Google Cloud
- 各回について、Zenn の公式プロジェクト一覧に掲載された全提出プロジェクトを対象にする。
- 公式結果発表に掲載された賞名と受賞プロジェクトを記録する。
- 各プロジェクトの記事から取得できる範囲で、説明記事、作者またはチーム、GitHub、デモ、利用技術を記録する。
- 公式ページまたは提出記事で確認できない値は推測せず `null` とし、確認状態を記録する。
- 記事本文に記載された外部リンクの存在は記録できるが、サービスの現在の稼働やリポジトリ内容の正当性までは本調査の完了条件に含めない。
- 第5回の公式審査基準・必須技術・提出条件を確認し、過去4回の傾向より優先する企画ゲートとして明示する。
- 過去作品をキーワードで課題領域・機能シグナルへ分類し、提出数・受賞数・受賞率を比較する。ただし相関を受賞理由の因果として扱わない。

## ファイル境界

```text
docs/
  planning/research/hackathons/
    README.md                  # 調査範囲、一次情報、取得・判定方法
    vol-1.md                   # 第1回の概要、受賞一覧、調査上の注意
    vol-2.md
    vol-3.md
    vol-4.md
    vol1-4-strategy-report.html   # 人間用の単体HTMLレポート
    vol1-4-strategy-context.md    # AI向けの全件コンテキスト
  work-notes/
    2026-09-10-hackathon-history-research.md
data/
  hackathons/
    projects.json             # 正規化した全提出プロジェクト
    projects.csv              # 表計算・目視確認用の同等データ
    schema.json               # 項目、型、null、列挙値の定義
scripts/
  research/
    generate-strategy-report.mjs # JSONから2レポートを再生成
src/                          # 今後のアプリケーションコード専用。今回コードは作らない
vendor/                       # 外部リポジトリの取り込み物。調査データは置かない
```

AF 自体の運用スクリプトは既存の `scripts/` に維持し、プロダクト実装だけを `src/` に置く。調査結果をコードへ埋め込まず、将来のアプリは `data/hackathons/projects.json` を入力として利用する。

## 一次情報

確認日は 2026-09-10（Asia/Tokyo）とする。

| 回 | 公式ページ | 用途 |
| --- | --- | --- |
| 第1回 | https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects | 全提出作品、結果発表、受賞区分 |
| 第2回 | https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects | 全提出作品、結果発表、受賞区分 |
| 第3回 | https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects | 全提出作品、結果発表、受賞区分 |
| 第4回 | https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects | 全提出作品、結果発表、受賞区分 |
| 第5回 | https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5 | 審査基準、必須技術、提出条件、日程 |
| 全体一覧 | https://zenn.dev/challenges?type=hackathon | 開催期間、提出数の照合 |

提出記事は公式プロジェクト一覧からリンクされた Zenn 記事だけを起点にする。検索結果や第三者のまとめは候補発見には利用できるが、確定値の根拠にはしない。

## データモデル

`projects.json` は次のトップレベル構造を持つ。

```json
{
  "schema_version": "1.0.0",
  "checked_at": "2026-09-10",
  "projects": []
}
```

各 `projects` 要素は次の項目を持つ。

| 項目 | 型 | 内容 |
| --- | --- | --- |
| `edition` | integer | 1〜4 |
| `entry_order` | integer | 公式一覧内の掲載順 |
| `project_name` | string | 公式一覧の作品名 |
| `project_description` | string/null | 公式一覧に掲載された作品説明 |
| `article_title` | string/null | 提出記事のタイトル |
| `article_url` | string | 公式一覧がリンクする Zenn 記事 |
| `participant_type` | string | `individual`、`team`、`unknown` |
| `participant_name` | string/null | チーム名。個人で表示名がない場合は null |
| `awards` | string[] | 公式結果発表の賞名。非受賞は空配列 |
| `is_finalist` | boolean/null | 公式に最終ピッチ進出が示される場合のみ真偽を記録 |
| `github_urls` | string[] | 提出記事から確認できた GitHub URL |
| `demo_urls` | string[] | 提出記事から確認できたデモURL |
| `technologies` | string[] | 記事で明示された主要技術 |
| `source_url` | string | 公式プロジェクト一覧URL |
| `checked_at` | string | `YYYY-MM-DD` |
| `verification_status` | string | `official-list-only` または `article-checked` |
| `notes` | string/null | 表記揺れ、リンク切れ、取得制約 |

CSV は配列項目を ` | ` 区切りで表現し、JSON と同じ行数・同じ `edition + entry_order + article_url` を持たせる。

## 収集と判定

1. 各公式プロジェクト一覧から掲載順、作品名、参加形態、チーム名、提出記事URLを取得する。
2. 同じページの結果発表から賞名を取得し、記事URLを第一キー、作品名を補助キーとして提出一覧へ対応付ける。
3. 各提出記事を確認し、本文中で明示された GitHub、デモ、主要技術だけを追記する。
4. URL は追跡用クエリを除去し、末尾スラッシュを正規化する。作品名は表示文字列を保存し、検索用の恣意的な改名はしない。
5. 同じ記事URLが複数回現れた場合は回と掲載順を維持しつつ重複候補として `notes` に記録する。
6. 公式一覧の掲載件数と JSON/CSV の件数を回ごとに照合する。全体一覧で公開される提出数と差がある場合は、公式プロジェクト一覧の実掲載件数を採用し、差分を各回の調査メモへ記録する。

## 失敗時の扱い

- ページ取得に失敗した回は、不完全な全件データを完成扱いにせず、取得済み件数と未確認範囲を明記する。
- 記事が削除済み、非公開、または取得不能の場合も公式一覧のレコードは残し、`verification_status` を `official-list-only` にする。
- GitHub やデモのURLを作品名から検索して補完しない。
- 受賞名の表記は公式結果発表をそのまま使い、類似賞を統合しない。

## 検証条件

- `projects.json` が `schema.json` に適合する。
- CSV と JSON の総件数、および各回の件数が一致する。
- `edition + entry_order` が一意である。
- 全レコードに `project_name`、`article_url`、`source_url`、`checked_at` がある。
- 全受賞レコードについて、各回の Markdown に賞名と公式URLが掲載されている。
- 各回の公式一覧件数と収集件数を調査メモに記録する。
- `./scripts/check-doc-links.sh` が成功する。
- `src/` に調査データや調査メモを置かない。
- HTMLが外部CSS・JavaScriptへ依存せず、589件の作品名・公式説明・保存URL文字列を内包する。
- HTMLとAI向けMarkdownに、第5回の公式3評価軸、GitHub連携、デプロイ、認証時のテストアカウントとサンプルデータ、説明・構成図・YouTubeデモ、12月1日までの維持条件がある。
- AI向けMarkdownに分析の限界、企画ゲート、全589作品のコンテキストがある。
- HTMLとMarkdownへ保存する文字列を無害化し、URL項目はHTTP(S)だけを受け付ける。
- HTMLとMarkdownが同じ `projects.json` から再生成でき、回別件数・受賞件数が一致する。

## 完了条件

第1〜4回の全提出作品が JSON と CSV に格納され、受賞作品を `awards` で抽出できること。取得不能な情報は推測ではなく null または未確認状態として明示され、一次情報・確認日・件数照合の結果を各回の Markdown から追跡できること。加えて、第5回の製品企画に使う人間用HTMLとAI向けMarkdownが生成され、リンク切れ後も作品説明と分析根拠を参照できること。

## 実行計画

[第1〜4回 AI Agent Hackathon 調査データ Implementation Plan](../implementation/2026-09-10-hackathon-history-research.md)
