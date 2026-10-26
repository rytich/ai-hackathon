---
title: 第五回で優勝するための製品企画 AIコンテキスト
date: 2026-09-10
status: reference
source_dataset_schema: 1.0.0
---

# 第五回で優勝するための製品企画 AIコンテキスト

## 目的

過去4回の全提出・受賞データと第5回の公式評価軸を、製品企画の仮説生成・競合確認・企画採点に使える形で保持する。外部リンクが失効しても、取得時点の作品名・公式説明・受賞・参加形態・確認済み派生情報はこのファイルだけで読める。

## 根拠と限界

- 過去データ確認日: 2026-09-10。全589件、受賞32件。
- 第5回ルール確認日: 2026-09-10。公式URL: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5
- 非受賞作品は公式一覧の名称・説明まで。受賞作品だけ記事本文由来のタイトル・限定技術・GitHub・デモを補足している。
- 分類は作品名・公式説明・記事タイトルへの公開キーワード規則による一次分類であり、意味理解による断定ではない。
- 過去傾向は第5回での受賞を保証しない。第5回は審査軸が刷新されているため、公式基準を優先する。

## 第5回公式スナップショット

- 開催期間: 2026-08-20〜2026-10-15（提出締切 23:59）
- 最終ピッチ: 2026-12-01
- 必須実行基盤（1つ以上）: App Engine / Compute Engine / Google Kubernetes Engine (GKE) / Cloud Run / Cloud Run functions / Cloud TPU / GPU
- 必須AI技術（1つ以上）: Gemini Enterprise Agent Platform（旧称 Vertex AI） / Gemini API / Gemma / Nano Banana / Agent Development Kit (ADK) / Speech-to-Text / Text-to-Speech API / Vision AI / Natural Language AI / Translation AI
### 失格防止チェック

- GitHubリポジトリ連携を行う。
- 動作確認可能なデプロイURLを提出する。認証が必要な場合は、手順にテストアカウントとサンプルデータを記載する。
- ユーザー・課題・解決策を含む説明、システムアーキテクチャ図、約3分の自作デモ動画を提出し、動画はYouTubeで公開する。
- GitHubリポジトリの状態・連携とデプロイを12月1日まで維持し、提出時点のデフォルトブランチを保持する。

## 第5回に向けた企画判断

### まず満たすべき公式評価軸

1. **課題の新規性と解決策の有効性**
2. **自律性・エージェントらしさ**
3. **実装品質と拡張性**

過去4回の集計はアイデア探索の補助線であり、第5回の新審査基準に対する採点結果ではない。以下の受賞率はキーワード分類との相関であり、受賞理由の因果を証明するものではない。

### 過去データから得られるシグナル

- 応募形態別: チーム 248件中18件受賞（7.3%）、個人 341件中14件受賞（4.1%）。人数そのものではなく、実装・検証・デモを分担できる体制設計の参考値とする。
- 比較的受賞側へ偏った領域（5件以上）: 教育・学習 68件中6件（受賞指数1.63）、環境・一次産業 15件中1件（受賞指数1.24）、創作・メディア 80件中5件（受賞指数1.15）。
- 提出が多い領域: その他・分類不能 171件、創作・メディア 80件、教育・学習 68件。この領域を選ぶ場合、対象ユーザー、未解決の瞬間、固有データ、評価指標のいずれかで明確な差別化が必要。
- 技術欄は受賞32件の記事だけを限定語彙で確認しているため、技術の受賞率や非受賞作との差は算出できない。技術名の多さではなく、課題解決と管理された自律性を実証する構成を優先する。

### 優勝を狙う企画ゲート

1. **未解決課題**: 特定利用者の頻度・損失・既存代替策を実測し、『誰が、いつ、なぜ困るか』を一文で言える。
2. **解決の有効性**: エージェント導入前後を、時間・精度・完了率・金額・安全性のうち少なくとも1指標で比較できる。
3. **必然的な自律性**: LLMチャットでは足りない理由があり、観測→判断→ツール実行→結果確認→停止または人間承認のループをデモできる。
4. **制御可能性**: 権限境界、監査ログ、失敗時の停止、プロンプトインジェクション対策、人間へのエスカレーションを設計する。
5. **実用品質**: 実データ・実ユーザーフローで再現可能にし、費用、遅延、可用性、テスト、拡張方法を説明する。
6. **3分デモ**: 最初の30秒で課題と価値を示し、正常系だけでなくエージェントの判断根拠と安全な失敗も見せる。

### 企画候補の採点テンプレート（各5点）

| 軸 | 5点の状態 | 証拠 |
| --- | --- | --- |
| 課題の新規性 | 既存手段が見落とす具体的な未解決場面がある | ユーザー観察・一次情報 |
| 解決策の有効性 | ベースライン比の改善を計測済み | 比較実験・利用ログ |
| エージェント必然性 | 複数段の判断と行動が価値の中心 | 実行トレース |
| ガバナンス | 権限・監査・停止・攻撃対策が動作する | 失敗デモ・テスト |
| 実装品質 | 実利用可能で、費用・運用・拡張を説明可能 | 稼働URL・設計図・CI |
| プレゼン | 3分で課題→自律行動→成果が伝わる | 台本付きデモ動画 |

## 集計データ

### 回別

| 回 | 提出 | 受賞 | 受賞率 |
| --- | ---: | ---: | ---: |
| 第1回 | 128 | 8 | 6.3% |
| 第2回 | 158 | 9 | 5.7% |
| 第3回 | 108 | 6 | 5.6% |
| 第4回 | 195 | 9 | 4.6% |

### 課題領域（一次分類）

| 領域 | 提出 | 受賞 | 受賞率 | 提出構成比 | 受賞構成比 | 受賞指数 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| その他・分類不能 | 171 | 9 | 5.3% | 29% | 28.1% | 0.97 |
| 創作・メディア | 80 | 5 | 6.3% | 13.6% | 15.6% | 1.15 |
| 教育・学習 | 68 | 6 | 8.8% | 11.5% | 18.8% | 1.63 |
| 開発・IT運用 | 66 | 4 | 6.1% | 11.2% | 12.5% | 1.12 |
| コミュニケーション | 50 | 2 | 4% | 8.5% | 6.3% | 0.74 |
| 生活・家事・買い物 | 42 | 2 | 4.8% | 7.1% | 6.3% | 0.89 |
| 業務・経営 | 38 | 1 | 2.6% | 6.5% | 3.1% | 0.48 |
| 医療・健康 | 25 | 1 | 4% | 4.2% | 3.1% | 0.74 |
| 地域・移動・観光 | 17 | 0 | 0% | 2.9% | 0% | 0 |
| 福祉・公共 | 17 | 1 | 5.9% | 2.9% | 3.1% | 1.07 |
| 環境・一次産業 | 15 | 1 | 6.7% | 2.5% | 3.1% | 1.24 |

### 機能シグナル別比較（複数該当あり）

| 機能シグナル | 該当提出 | 受賞 | 受賞率 |
| --- | ---: | ---: | ---: |
| 行動・ワークフロー | 217 | 9 | 4.1% |
| 知識・調査・RAG | 147 | 9 | 6.1% |
| 音声・対話 | 124 | 5 | 4% |
| 画像・映像・マルチモーダル | 111 | 7 | 6.3% |
| 個別最適化 | 75 | 2 | 2.7% |
| リアルタイム | 45 | 3 | 6.7% |
| マルチエージェント | 25 | 2 | 8% |
| 物理・空間連携 | 19 | 5 | 26.3% |

### 歴代最優秀賞

- 第1回 **eCoino** — 想定外のズレをすぐに取り戻す！対話型AIシステム eCoino
- 第2回 **FlatJam** — 創造性を育む音楽教育ツール FlatJam
- 第3回 **フクシア** — 社会福祉士の現場では、煩雑なアセスメント作成や膨大な支援制度情報の検索が負担となり、本来利用者に寄り添う時間が削られています。私たちの開発した 「フクシア」 は、会話ログから自動でアセスメントを生成し、利用者に適した支援制度を検索・提案する AI Agent です。社会福祉士の業務を効率化し、支援が必要な人により多くの時間と心を注げる社会の実現を目指します。
- 第4回 **Anatom-AI** — AIで直感的かつ柔軟な操作を可能にしたAtlasアプリ, Anatom-AIです。 人体の理解の本質の1つに臓器の立体的な配置の学問、すなわち解剖学があります。一般にatlasとよばれる解剖図アプリケーションを介して解剖の勉強を医師・医学部生は行っています。 しかし、そもそもの解剖があまりにも複雑なために、1つの解剖を理解するのに極めて煩雑な操作を伴っています。また、病気や手術など複数臓器が関与してくるような事象では、さらに複雑な操作が必要です。本プロジェクトでは多くの場面で専門家相当の知性を持ち、multimodal性能も高いGeminiを活用することで、「膵臓みせて」や「中大脳動脈が詰まるとどこが虚血になる？」など、煩雑な操作を要する課題解決を自然言語を介して可能にしています。

## 全作品コンテキスト

### V1-001 HackMate

- 公式説明: 対話型AIエージェントでGoogle AI Agentハッカソンの担当者を作ってみた
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuno_miyako/articles/e2c02be1d73f7b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-002 PittariData - 3分で企業調査

- 公式説明: Geminiが変える企業調査：AIエージェントで調査費用を100分の1以下に
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/gepuro/articles/921ffb03bfc9c4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-003 専門家と一緒に使うTuned AI

- 公式説明: ちゃんと仕事でつかえる、人間を置いてきぼりにしない、専門家とAIがコラボするAIエージェント作ってみた #aiagenthackathon
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kusuke/articles/6a869635709b59
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-004 SnapmatchAI

- 公式説明: 構造化されていないデータの管理をAIで効率化：Snapmatch AIのご紹介
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/trapajim/articles/063bb27ea02d50
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-005 tech-curator

- 公式説明: tech-curator: AI Agent Hackathon with Google Cloud
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yutoo89/articles/ff6edf97a0f4a5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-006 エンタメチャットアプリ「にーいちよん」

- 公式説明: エンタメチャットアプリ「にーいちよん」による課題解決とAIエージェント実装について
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yasuna/articles/ce7e4e6dde57e3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-007 PodcastGenerator

- 公式説明: ポッドキャスト生成アプリ作ってみた
- 参加形態: チーム
- 参加者・チーム名: 桃瀬戸ファクトリー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/s_makio/articles/ad4666accaafa2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-008 BOOKA - Book App for AI price comparison agent

- 公式説明: BOOKA - 本好きのために一番お得に本が手に入るAIエージェント・アプリ、その他のブッカも自動チェックしてくれるよ！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ktrips/articles/9b11fd3fca1049
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-009 Listen-AI

- 公式説明: Gemini 2.0 と Multimodal Live API で実現するヒアリング Voice エージェント
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mrmtsntr/articles/3859ec6b61b63b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-010 WatchBot

- 公式説明: 自然言語で監視タスクを依頼できる「WatchBot」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shinyoshiaki/articles/watchbot-gemini-webrtc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-011 taik mate

- 公式説明: 流行りのAIをつかったIELTSの採点アプリ
- 参加形態: チーム
- 参加者・チーム名: ぷろぐらーにんぐ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nozomi_iida/articles/962b27396a127f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-012 ReGemini - Rehabilitation Gemini project

- 公式説明: ReGemini - リハビリをGeminiで生成して、双子アバターが一緒にやってくれるWebアプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ktrips/articles/26b0a84dadaf54
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-013 BLOOMS

- 公式説明: BLOOMS - 見つめてみよう。妊婦のあなたの日々の体調
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 🏅 Firebase賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: BLOOMS - 見つめてみよう。妊婦のあなたの日々の体調
- 記事URL（文字列保存）: https://zenn.dev/kingu/articles/a36196c5c66171
- GitHub URL: https://github.com/KoheiKanagu/blooms
- デモURL: 不明・未確認
- 明示技術: Cloud Functions / Vertex AI / Imagen / Firebase / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-014 OctoThink

- 公式説明: OctoThink: GitHubにAIを溶け込ませるセルフホストGitHub App
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hosaka313/articles/bc9768b8baaf0d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-015 debater

- 公式説明: 【debater】未来の情報提供AI！ 多角的視野の議論エージェント(AI agent Hackathon)
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuu7751/articles/29a12e90c279b8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-016 flutter_app_creator

- 公式説明: 【提出物】flutter_app_creater
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sakusin/articles/cfcc947c48d2df
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-017 スマブラ最適行動検証アプリ

- 公式説明: 大乱闘スマッシュブラザーズ SPECIAL最適化行動システム
- 参加形態: チーム
- 参加者・チーム名: 奈落旋風
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takuawn/articles/c58f801ca7fd77
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-018 BGMoo

- 公式説明: 「映画のように、小説を楽しむ」新体験──BGMoo【AI Agent Hackathon with Google Cloud 成果物】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rjg0gjirehbgot/articles/59d6077472c4df
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-019 Presio

- 公式説明: 【AI Agent Hackathon】プレゼンテーション資料をAIで作成するサービス『Presio』
- 参加形態: チーム
- 参加者・チーム名: Pied Piper
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tatsuya032/articles/301dd19235efc2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-020 Interview Agents

- 公式説明: Interview Agents – AIエージェントで、模擬面接を手間なく体験できるアプリを作りました！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yotaroyotaro/articles/4562bb480b415a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-021 ヘモグロビンガーディアン

- 公式説明: ヘモグロビンガーディアン：AIで貧血リスクを見える化するMVP
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toki_mwc/articles/6aa02097a4c474
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-022 AIインテリアコーディネーター

- 公式説明: Google Cloud AI Agent Hackathon: AIインテリアコーディネーター
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/jupitercyclone/articles/16b1d5c7f8fb67
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-023 eCoino

- 公式説明: 想定外のズレをすぐに取り戻す！対話型AIシステム eCoino
- 参加形態: チーム
- 参加者・チーム名: セイゾウギョウのチカラ
- 受賞: 🥇 最優秀賞
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 想定外のズレをすぐに取り戻す！対話型AIシステム eCoino
- 記事URL（文字列保存）: https://zenn.dev/nayus/articles/45d29a213c4213
- GitHub URL: https://github.com/takesei/namapn-council
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-024 ココいく

- 公式説明: おでかけプランニング AI エージェントを作った話【ハッカソン】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 🏅 Tech Deep Dive賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: おでかけプランニング AI エージェントを作った話【ハッカソン】
- 記事URL（文字列保存）: https://zenn.dev/kikagaku/articles/ae47497f5beed9
- GitHub URL: https://github.com/tishibashi1003/ai-event-guide
- デモURL: https://zenn-hackathon-b8dca.web.app/
- 明示技術: Cloud Run / Cloud Functions / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-025 Goroにゃーん

- 公式説明: 暗記特化型AIエージェント「Goroにゃーん」で暗記を効率化したい（AI agent Hackathon）
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mirainotori/articles/c37d88b37b39b0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-026 WebTech 道場

- 公式説明: Google Cloud x Gemini API を用いた Web 技術学習支援アプリの開発
- 参加形態: チーム
- 参加者・チーム名: トリメチルベンゼン
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/empelt/articles/69c480c0200f7b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-027 アドバイス

- 公式説明: 【AI Agent Hackathon 提出物】お手軽に食事のアドバイスがほしい
- 参加形態: チーム
- 参加者・チーム名: さがんエンジニア
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/500ban/articles/5e31485eb775ee
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-028 memory AI

- 公式説明: 内省促進×ラーニングの蓄積を補助するコーチングAI
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hmdai/articles/8679d26c8b2444
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-029 労働相談AIエージェント「まもる君」

- 公式説明: 労働相談AIエージェント「まもる君」作ってみた (AI Agent Hackathon)
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/x_ray/articles/28368ec860982d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-030 elecnecta（エレクネクタ）

- 公式説明: 一人ひとりの関心に刺さる政策を調べて比較してくれるAIエージェント「elecnecta」の開発【AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ghillie/articles/0abaad648dcd91
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-031 AIグループチャット

- 公式説明: 【AI Agent Hackathon】AIとワイワイ雑談！複数AIがあなたの悩みを解決する、新感覚グループチャットアプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/xxkuboxx/articles/98478887b98406
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-032 ArticlePlay

- 公式説明: Google Cloud x 生成AIで実現する新しい英語学習体験アプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tsuvic/articles/f6033ca5d2380c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-033 voice-routine

- 公式説明: Todo管理を管理してほしい ～電話でTodo管理を自動化するサービス～
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dev_commune/articles/473b01983d1cbd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-034 「AIがすぐ寄り添う！」ファイル共有アプリ

- 公式説明: 「AIがすぐ寄り添う！」ファイル共有アプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/icch_it/articles/cc100070805da5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-035 AgenTravel

- 公式説明: AIエージェントと創る、新しい1人旅のカタチ
- 参加形態: チーム
- 参加者・チーム名: AIAT
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/taisei_13046/articles/9ea814a6a25140
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-036 ワラドール・トーク

- 公式説明: ストレスをぶつけられる藁人形、ワラドール・トークをハッカソンで制作しました【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: 丑の刻参ラーズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hitotori/articles/b7787ad417ad8c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-037 Partner AI ～内省のススメ~

- 公式説明: (AI agent Hackathon)Partner AI ～内省のススメ～
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/uragasumi25/articles/aa8f6f863ebae4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-038 ミ=ホ (ミーホと読みます)

- 公式説明: AI Agent Hackathon project &quot;ミ=ホ (advena)&quot;
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hironow/articles/4f8eb43aa8deee
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-039 放課後DeFAIクラブ

- 公式説明: DeFi x AIの平滑化 - ライブチャット型DeFAIプロジェクトを開発しました 【Google AIエージェントハッカソン】
- 参加形態: チーム
- 参加者・チーム名: 放課後DeFAIクラブ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nft/articles/cae4b586f2216c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-040 coaching-ai

- 公式説明: AIコーチングアプリの開発：AI Agent Hackathon参加レポート
- 参加形態: チーム
- 参加者・チーム名: AI Craftmen
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kaz_miya/articles/4cc0f588b9a121
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-041 fuguru

- 公式説明: Geminiで資料をパーソナライズ化して効率的に読めるようにしてみた💡
- 参加形態: チーム
- 参加者・チーム名: FUGU
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yay1/articles/4c2615d147089c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-042 TaskTrail

- 公式説明: 目標達成支援型 AI エージェント「Task Trail」
- 参加形態: チーム
- 参加者・チーム名: TaskTrail
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/task_trail/articles/4a6a7d330f2adc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-043 wondy

- 公式説明: 子供の疑問に答える AI エージェント「wondy」
- 参加形態: チーム
- 参加者・チーム名: アクティ部
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nszknao/articles/zenn-ai-agent-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-044 Web会議の円滑な進行をサポートするAIエージェント「Meetiness」

- 公式説明: Web会議サポートAIエージェントつくってみた【Meetiness】
- 参加形態: チーム
- 参加者・チーム名: YAKIONIGIRIs
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tsmiyamoto/articles/e808497a732a5c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-045 Chat Reflection Loop

- 公式説明: Google Cloud AIエージェントハッカソン参加：Chat Reflection Loop
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/otar/articles/5170462d8d9241
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-046 WebExam

- 公式説明: WebExam - 「webでの学習」のより深い理解のために - をリリースしました！ \| AI Agent Hackathon
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakajiman/articles/9fb5ed8ea2b3bf
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-047 RecipAI

- 公式説明: AIで実現する食品ロスゼロ ― 冷蔵庫画像から残り食材を使って自動でレシピ生成できるアプリを作った
- 参加形態: チーム
- 参加者・チーム名: Hello Hack
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yui/articles/db8bf341365eee
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-048 Menu Bite

- 公式説明: Flutter × AI で実現！海外の飲食店で使えるメニュー認識アプリの開発【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: 京大にんじんサークル
- 受賞: 🏅 Moonshot賞
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 【AI Agent Hackathon 受賞🏆】海外の飲食店で使えるメニュー認識アプリの開発
- 記事URL（文字列保存）: https://zenn.dev/kanda9685/articles/69d5d02de3b724
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: App Engine / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-049 AI家庭教師くん

- 公式説明: 【AI Agent Hackathon】Chrome拡張「AI家庭教師くん」
- 参加形態: チーム
- 参加者・チーム名: もつなべ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/motsupot/articles/2ac5560d7840d5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-050 interFACE

- 公式説明: 不明・未確認
- 参加形態: チーム
- 参加者・チーム名: 1M1D
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/virtuouscore/articles/08faaad1e80539
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 公式一覧の説明が空欄
### V1-051 Browser AI Agent

- 公式説明: 開いているWebページを自然言語で操作するAIエージェントを作ったよ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nabettu/articles/dc4aeb4dcdb89f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-052 飲食店メニュー多言語化アプリ

- 公式説明: バ先のメニューを多言語化するアプリを作った。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ichihos1111/articles/160f7502032178
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-053 第ゼロ稿

- 公式説明: 第ゼロ稿 ~AI Agent Hackathon with Google Cloud提出プロダクト~
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/bamb00eth/articles/20250210gcphackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-054 JanJan for kids

- 公式説明: Multimodal Live API で、AIネイティブ次世代のリアルタイム会話型の学習サービスをつくってみた！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yahsan2/articles/71e5ff935108e2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-055 AI Workchain

- 公式説明: AI WorkChain - AI Agent × Web3で実現する自律型業務委託契約システム 【Zenn Hackathon】
- 参加形態: チーム
- 参加者・チーム名: Komlock lab
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/komlock_lab/articles/8f9702d9862dc0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-056 Opinion Galaxy

- 公式説明: 【選挙予測！？】政治意見のトレンドを可視化するAIアプリケーションの開発
- 参加形態: チーム
- 参加者・チーム名: いいっすね
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/edegp/articles/f9be4f4f19814f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-057 Co Email

- 公式説明: 不明・未確認
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ruki_kuri_sun/articles/e312d3b58394c2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 公式一覧の説明が空欄
### V1-058 マルチモダンAIエージェント

- 公式説明: Google Cloud × Gemini Pro で作る次世代チャットボット：マルチモーダルAIエージェントの実装と解説
- 参加形態: チーム
- 参加者・チーム名: 駆け出しエンジニア
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shahin/articles/44843c3b757121
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-059 Cloud Print AI

- 公式説明: Google Cloudの アーキテクチャ図を生成するCloud Print AI
- 参加形態: チーム
- 参加者・チーム名: CloudPrint AI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mathewchan/articles/552ee3580aa8fa
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-060 RrntFlow

- 公式説明: AI x Crypto による賃貸プラットフォーム構想 AI Agent Hackathon with Google Cloud
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hikesuns/articles/c1eb04b94caefa
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-061 momen.ai

- 公式説明: 【AI Agent Hackathon】あなたの「もめごと」を解決する、新時代のパーソナルコーチ を作ってみた
- 参加形態: チーム
- 参加者・チーム名: MGS
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/naotoitoi/articles/4b61d6257d0c95
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-062 Osiri

- 公式説明: [個人開発]海外スタートアップ情報を手軽に知れる生成AI系プロダクトを作った話
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sintaro/articles/e25fb64c95a4e1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-063 AIたんご帳

- 公式説明: 自動で英語の問題を作成してくれる！&quot;AIたんご帳&quot;の紹介
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yusuketagawa/articles/04724dd10456fa
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-064 鮮度判定アプリFreshFinder

- 公式説明: 【AI Agent Hackathon with Google Cloud】AIでスーパーの買い物をスマートに！鮮度判定アプリの挑戦！
- 参加形態: チーム
- 参加者・チーム名: TOPPA!!!
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/cloudknowhow/articles/52d49b328750ab
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-065 WanderLens

- 公式説明: 【AI Agent Hackathon】WanderLens - あなたの冒険を、もっと鮮やかに。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuulin/articles/632e987d8edc73
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-066 Safety Eye

- 公式説明: 建設現場における服装チェックの自動化システム
- 参加形態: チーム
- 参加者・チーム名: シェアラボAI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/acntechjp/articles/018aa891fdbdac
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-067 会話に溶け込むアンビエントAIエージェント

- 公式説明: 【ハッカソン開発】会話に溶け込むアンビエントAIエージェント
- 参加形態: チーム
- 参加者・チーム名: アテモヤ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sssssshun1122/articles/f3d80730d445be
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-068 WaiDDy Pocket

- 公式説明: AI Agent Hackathon : AI旅行プラン生成サービス「WaiDDy Pocket」を作ってみた
- 参加形態: チーム
- 参加者・チーム名: WaiDDy Pocket
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/waiddy/articles/376270bd1ae1b2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-069 Tascario

- 公式説明: AI エージェント開発ハッカソン参加記事：Gemini 2.0 Flash で技術文書分析ツール「Tascario」を作ってみた
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/erukiti/articles/2502-ai-agent-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-070 SasayakiAI

- 公式説明: 【Sasayaki AI 】会議でよく分からない専門用語を初心者でも分かるように解説してくれるツールを作りました
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pianopia/articles/982a4223da5055
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-071 CAST

- 公式説明: 【AI Agent Hackathon】PDF to Video! 教材動画生成ツール『CAST』を制作しました
- 参加形態: チーム
- 参加者・チーム名: Sorcerick
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sen_pt/articles/5a2a7504c2646a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-072 AiMee

- 公式説明: 会議進行をサポートするAIエージェント「AiMee」の紹介
- 参加形態: チーム
- 参加者・チーム名: ユニバック
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rapirapi/articles/de88dfb7d5e4fa
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-073 テックスキャン 😎

- 公式説明: AIがあなたの個性を発見！ハッカソンで開発した分析エージェント
- 参加形態: チーム
- 参加者・チーム名: シーラカンス
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mae616/articles/1847ef75cb96a3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-074 The 料理 2

- 公式説明: The 料理 2.0【AI Agent Hackathon with Google Cloud】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yiefhouse/articles/a5477c98d75106
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-075 SYUTYU Timer

- 公式説明: Pomodoro✖︎GenAI アプリ SYUTYU TIMER
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/connvoi/articles/b7cf65120fa496
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-076 ほすさぽくん

- 公式説明: 看護師のためのエージェントアプリ「ほすさぽくん」#AI Agent Hackathon with Google Cloud
- 参加形態: チーム
- 参加者・チーム名: まるさぽくん
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hatyametya_body/articles/2ddb1da924fb0a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-077 Perfect Health'n Man

- 公式説明: AI エージェントは健康を夢に見るか？ for AI Agent Hackathon
- 参加形態: チーム
- 参加者・チーム名: Perfect Health'n Man
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/axelasports/articles/ccc4883dc1e3c7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-078 マルチ生成AIチャットボット

- 公式説明: マルチ生成AIチャットボットアプリを作ってみた
- 参加形態: チーム
- 参加者・チーム名: DLab
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dainoji7474/articles/de6d43e90b1ae3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-079 ぴこかんむり＆温泉BBA

- 公式説明: 生成AIで「推し活エージェント」を作ってみた
- 参加形態: チーム
- 参加者・チーム名: 温泉BBA&amp;ぴこかんむり
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/voicehackerjp/articles/818266fd2510e5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-080 OSS-Rewards-Agent

- 公式説明: オープンソース開発を加速する AI 報酬システム OSS-Rewards-Agent
- 参加形態: チーム
- 参加者・チーム名: OSS-Rewards-Agent
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yukiki01/articles/d95f83a0b961e6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-081 走ルンRUN

- 公式説明: 「ランニングルート自動生成アプリ ～走る前の面倒なルート設定を一瞬で解決～」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tacos/articles/1fc6909c01cbe4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-082 『AI就活エージェント』

- 公式説明: 【生成AI】就活・転職のサポートをしてくれるAI AgentをGoogle✖️Zennハッカソンで開発しました🌟
- 参加形態: チーム
- 参加者・チーム名: ぴゅぴゅまる🐱
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/manase/articles/5325cb8966fe7c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-083 Prompt QR

- 公式説明: 【Prompt QR】 低コストで局所的な活用ができるAR/AIグラス向けカスタムAIエージェント
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ud_inc/articles/ca7dfbac605e22
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-084 議知録（gichiroku)

- 公式説明: 議知録（gichiroku）：会議の振り返りを支援するWebアプリ
- 参加形態: チーム
- 参加者・チーム名: おさかなふた
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/osakanafuta/articles/e8b047cb243709
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-085 LegalPilot

- 公式説明: LegalPilot: Vertex AI×BigQueryによるRAG構築 [AI Agent Hackathon]
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/aobaiwaki/articles/fe8225526034d7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-086 Manabiya AI

- 公式説明: ManabiyaAI：新人教師でも、ベテランでも、その先の学び舎へ。​​​​​​​​【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: Manabiya AI
- 受賞: 🥈 2位
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: ManabiyaAI：新人教師でも、ベテランでも、その先の学び舎へ。​​​​​​​​【AI Agent Hackathon】
- 記事URL（文字列保存）: https://zenn.dev/coco9122/articles/manabiya-ai-coco9122
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Firebase / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-087 LLM Fixer

- 公式説明: LLM Fixerの紹介: AI Agent Hackathon with Google Cloud
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kaiba/articles/ccbe756efe4f68
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-088 チャレンジコンパス

- 公式説明: 【AI Agent Hackathon】日々の仕事をやりがいのあるものにするサービス「チャレンジコンパス」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nabesan1114/articles/87a079ed237aa6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-089 ClearSky

- 公式説明: Firebaseを味わい尽くせ！ 限界突破ハッカソン！！
- 参加形態: チーム
- 参加者・チーム名: ツナ缶サラダ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tunburo/articles/clearsky-article
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-090 「Show Your AI」 10年後のあなたとチャットができる

- 公式説明: 「Show Your AI」 10年後のあなたとチャットができる
- 参加形態: チーム
- 参加者・チーム名: BIDIRE
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/bidire_ai/articles/b551feb3461089
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-091 AI Vtuber ディベート

- 公式説明: Chromeを使いながらディベートするマルチエージェントAI Tuberシステムを作ってみた
- 参加形態: チーム
- 参加者・チーム名: ONIXION
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hirekatsu0523/articles/8b0583ba9a01f6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-092 お天気おかん

- 公式説明: 【個人開発】お母さんみたいに天気予報を教えてくれるアプリをつくりました【with AIエージェント】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/caen/articles/c202f26e2cbddc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-093 今日もただいま

- 公式説明: AI Agent Hackathon with Google Cloud提出
- 参加形態: チーム
- 参加者・チーム名: チームSAL
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sola1216/articles/52ed91fed89caa
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-094 旅行計画お助けマン

- 公式説明: 会話内容で旅行計画をまとめてくれる『旅行計画お助けマン』を作りました【AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/y_aki/articles/30fe8ddaf79e90
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-095 # はっしゅたぐ工房

- 公式説明: # はっしゅたぐ工房を作りました 【AI Agent Hackathon with Google Cloud】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/michan74/articles/b442ee4115c7e5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-096 深夜のテックバー ～匿名の技術者コミュニティ開発の挑戦～

- 公式説明: 深夜のテックバー ～匿名の技術者コミュニティ開発の挑戦～ (AI Agent Hackathon with Google Cloud)
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/marcosan/articles/188e5f13464171
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-097 AI Vision Quest

- 公式説明: AI Vision Quest　〜ディープフェイクを見抜く審美眼〜
- 参加形態: チーム
- 参加者・チーム名: AI モノリス・オデッセイ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yamamomo/articles/ad77e0899b282c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-098 AI Agent Hackathon with Google Cloud

- 公式説明: AIエージェント Wikiだるま　第18話
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takayamasashi/articles/b00034f5d5e304
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-099 法令お答えチャットくん

- 公式説明: 非エンジニアがAIエージェントハッカソンに参加してみた話
- 参加形態: チーム
- 参加者・チーム名: yusa-san team
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yusa_san/articles/732a04cacabece
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-100 レシート仕分けサービス「レシートぽん！」

- 公式説明: AIがレシート仕分けしてくれるサービスを作ってみた
- 参加形態: チーム
- 参加者・チーム名: うちなんちゅ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/5hige99/articles/58212a00887146
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-101 Travel.Hub

- 公式説明: AIが旅行計画のお手伝い！ ~AI Agent Hackathon ~
- 参加形態: チーム
- 参加者・チーム名: 7号館house
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/water3/articles/5b627d7424d7be
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-102 MiMi

- 公式説明: Gemini AIを活用して認知症予防・改善アプリを開発【AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: ReRe
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dotback/articles/4bb70fa759d7ef
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-103 Flare

- 公式説明: &quot;Flare&quot; -新時代のモバイルアプリ開発AI Agent-
- 参加形態: チーム
- 参加者・チーム名: Flare
- 受賞: 🏅 Flutter + Firebase賞
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: &quot;Flare&quot; -新時代のモバイルアプリ開発AI Agent-
- 記事URL（文字列保存）: https://zenn.dev/flare_dev/articles/385d87dae6e0a9
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Cloud Functions / Vertex AI / Firebase / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-104 医師のための論文紹介Podcast

- 公式説明: 医師の学びをAIがアップデート - PubMed論文を3分動画に自動変換
- 参加形態: チーム
- 参加者・チーム名: pipon
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pipon_tech_blog/articles/ee78f920bc8d6e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-105 Geminiでタスク追加

- 公式説明: AI Agent Hackathon with Google Cloud 参加記事：Geminiでタスク追加
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/wonyx/articles/80d390ffef5f39
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-106 TRIP-LAN：生成AIで実現する次世代の旅行プラン作成アプリ

- 公式説明: [AI Agent Hackathon with Google] TRIP-LAN：生成AIで実現する次世代の旅行プラン作成アプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fooqoo/articles/fa02502450bf7f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-107 HUNGOUR（ハングル）

- 公式説明: 【ハッカソン記事】今すぐ入れる飲食店を自動予約してくれるサービスを作ってみた。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/reerishun/articles/32bf88b96536fd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-108 生成AIとおじいちゃんの見守り - 次世代介護システムの開発

- 公式説明: 生成AIとおじいちゃんの見守り - 次世代介護システムの開発[AI Agent Hackathon with Google Cloud]
- 参加形態: チーム
- 参加者・チーム名: Husen
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tki256/articles/782061fa95aa51
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-109 newln

- 公式説明: 不明・未確認
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yomek33/articles/a8b43d65627dc7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 公式一覧の説明が空欄
### V1-110 絵本の読み聞かせアプリ「AI StoryTeller」

- 公式説明: 絵本の読み聞かせアプリ「AI StoryTeller」による課題解決と実装方法
- 参加形態: チーム
- 参加者・チーム名: AI StoryTeller
- 受賞: 🏅 Flutter賞
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 絵本の読み聞かせアプリ「AI StoryTeller」による課題解決と実装方法
- 記事URL（文字列保存）: https://zenn.dev/knmknm/articles/4d08429c8e6864
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Vertex AI / Imagen / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-111 社内のぞき見新聞 ～The Internal Times～

- 公式説明: 社内のぞき見新聞 ～The Internal Times～【AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: シャリ無しわさび増し
- 受賞: 🥉 3位
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 社内のぞき見新聞 ～The Internal Times～【AI Agent Hackathon with Google Cloud】
- 記事URL（文字列保存）: https://zenn.dev/kaitat1231/articles/afce2c2202fa2b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Imagen
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V1-112 納得した買い物を瞬時に実現する比較特化型AI Agent「Smart Choice」

- 公式説明: [AI Agent Hackathon] 納得した買い物を瞬時に実現する比較特化型AI Agent「Smart Choice」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ms5/articles/70d6f1b2405fa9
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-113 AI Record

- 公式説明: AIが自動で日記をつけてくれるサービス
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ken5/articles/d35f524f107fe4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-114 エージェントネイティブな漫画エディタ

- 公式説明: 【OSS】 エージェントネイティブなマンガ創作エディタ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/scich/articles/c18e181328eba9
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-115 Mail Magazine Manager

- 公式説明: Gmailに来る不要なメルマガを一掃するAIエージェント
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/k_sasaking/articles/d56487c4c34b1e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-116 AI漫才

- 公式説明: AI漫才師 - AIによる漫才スクリプト生成システム
- 参加形態: チーム
- 参加者・チーム名: チーム一橋
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/oreoreo/articles/51bfca8a2cdffd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-117 AILangSutdy

- 公式説明: AI多言語学習ツール
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yoneapp/articles/f020a05df2b4a6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-118 「この肉どの部位？」を無くす焼き肉AI

- 公式説明: 焼き肉で「この肉どの部位？」を無くす焼き肉AI作ってみた。【Flutter/Vertex AI】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kuredev/articles/b9df153342c5eb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-119 AIバスロケくん

- 公式説明: 「AIバスロケくん」- マルチモーダルAIでカメラ画像から簡単にバスロケ！ -
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/karamiso/articles/c1daecc46712a8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-120 LazySpotFinder: AIがあなたの「めんどくさい」を解決する、新しい場所探しのカタチ

- 公式説明: 「今日どこ行く？」をAIに丸投げ！スポット検索のAIエージェント作ってみた【Gemini × Flutter】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yusukec/articles/0403fdf72aa9dd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-121 agentClassroom

- 公式説明: AIエージェント教室：国際ニュースを多視点から探究
- 参加形態: チーム
- 参加者・チーム名: nishibori-hikawa
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tetty2525/articles/04f8478a303b32
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-122 DOODLE SCOPE

- 公式説明: 不明・未確認
- 参加形態: チーム
- 参加者・チーム名: ArtisanAlly
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/articles/ace4b23009e333
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 公式一覧の説明が空欄
### V1-123 Docgent

- 公式説明: Slackの会話からドキュメントを育てるGo製AIエージェント「Docgent」を開発しました
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kecy/articles/84509c63e76218
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-124 Corggle

- 公式説明: 次世代コミュニケーションパートナー AI Corggle
- 参加形態: チーム
- 参加者・チーム名: iroiro
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pluto0004/articles/40b511b74ecbf4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-125 食品添加物解析アプリ

- 公式説明: 食品添加物解析アプリ（AI Agent Hackathon with Google Cloud）
- 参加形態: チーム
- 参加者・チーム名: of
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/senbei139/articles/b78ae9d4a68340
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-126 GenRPG

- 公式説明: GenRPG - 究極のRPGを求めて - 【AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/atworks_np/articles/bb4e4fc79be314
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-127 名刺管理AIエージェント

- 公式説明: 埋もれた金鉱を見逃すな！展示会の名刺管理AIエージェント
- 参加形態: チーム
- 参加者・チーム名: 反天空後で世界を救えませんか？
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/liam/articles/13d00e3fd4b8f5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V1-128 アイデアの会議室

- 公式説明: AIがアイデアを育てる！GeminiとClaudeによる自動ブレインストーミングアプリの開発
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yersini_pestis/articles/3bda0515380265
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/2024-google-cloud-japan-ai-hackathon?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-001 ベビタ（BabyTouch）

- 公式説明: ベビタ: タッチで遊ぶ、赤ちゃん向けフィードバックアプリの開発記録
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mikkikimasutaro/articles/aae52e44fb2d12
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-002 化粧品分析AIエージェント、AI Skin Compassの開発

- 公式説明: 【Flutter×GCP】化粧品成分分析 モバイルアプリ「AI Skin Compass」
- 参加形態: チーム
- 参加者・チーム名: ひがぱん
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/panchorange/articles/b99d5fb95bd103
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-003 Linux Reader - Linux本家コードをAIで読もうとする挑戦 -

- 公式説明: Linux Reader - Linux本家コードをAIで読もうとする挑戦 -
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/coffeecupjp/articles/09eaa20edcf2c0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-004 AIによるリアルタイム実況テキスト付きブロック崩しゲーム

- 公式説明: 第2回 AI Agent Hackathon with Google Cloud 参加
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/megane_otoko/articles/93_ai_agent_hackathon_2nd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-005 todo-chronicle

- 公式説明: タスク完了で物語が進む！Gemini APIで作る異世界ファンタジーToDoアプリ 〜タスクをこなして、世界を救え〜
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sochi/articles/c28d78c190da05
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-006 投資パートナー AIエージェント「Investallia」

- 公式説明: 若年層向け投資パートナー AIエージェント「Investallia」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/to418/articles/f34cf8bb397f59
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-007 菜園の匠

- 公式説明: 家庭菜園AIアプリ「菜園の匠」【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: Developers_Miya
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/myapp/articles/fdf58e5529a43f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-008 紙カルテ電子化AIエージェントシステム

- 公式説明: 紙カルテ電子化AIエージェントシステム
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fumi_mizu/articles/505cbd14678388
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-009 地図の中の哲学者

- 公式説明: AIは「地方の過疎化」を救えるか？ 地域の物語を紡ぐAIエージェント「地図の中の哲学者」の挑戦
- 参加形態: チーム
- 参加者・チーム名: 社会人2年目
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/vel3633/articles/b06e8ded842ea7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-010 AIry Recipe

- 公式説明: 料理体験をアップデートするレシピアプリ「AIry Recipe」の開発
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 🏅 Gemma賞
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 料理体験をアップデートするレシピアプリ「AIry Recipe」の開発
- 記事URL（文字列保存）: https://zenn.dev/hal1986/articles/20250630-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Vertex AI / Gemma / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-011 パーソナル日本語学習チューターAI「NihonGo!」

- 公式説明: パーソナル日本語学習チューターAI「NihonGo!」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kenta1114/articles/738c3212b345e2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-012 TriviaGuideMap

- 公式説明: TriviaGuideMap
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tatetate/articles/a16d5dcb495bdf
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-013 PPP - Personalized Podcast Platfrom -

- 公式説明: 🎙️ AI ポッドキャスト生成プラットフォーム  PPP
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/soundtricker/articles/147c8e6d99f015
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-014 Gemiyou

- 公式説明: AIが人間にタスクを依頼する逆転発想アプリ「Gemiyou」の開発記録
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yukilab/articles/f281ec36462357
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-015 HabitLink

- 公式説明: 指導者と生徒を結ぶ、習慣化AIエージェント「HabitLink」
- 参加形態: チーム
- 参加者・チーム名: 地球オールスターズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tsukasajapan/articles/acf4ff56c0a68e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-016 ペット問診・診断サイト

- 公式説明: AIペット診断「Petnosis」プロジェクト
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pd98/articles/df961bfb03b276
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-017 よみあげくん

- 公式説明: 会議資料が読みにくい？AIエージェント×Genkitで1日開発した読み上げアプリの話
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kotoriyama/articles/cdf88b2f3e745c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-018 らくらく日記

- 公式説明: めんどくさがり屋のための日記サービス 【らくらく日記】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yamadamadamada/articles/2037f9bad4775c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-019 PersonalCast

- 公式説明: PersonalCast - 日々のメモからAIパーソナリティが番組を生成！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/henteko/articles/523c1cb87b5a27
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-020 zenith-assistant

- 公式説明: 自然言語チャットからGoogleカレンダーの空き時間検索・予定登録ができるAIエージェント構築
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/k__kanke/articles/4a9d2d9569aba4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-021 Solilo

- 公式説明: AIと心療内科シミュレーション！「うまく伝えられない」を解消する一人用タイムライン型体調メモ 第2回 AI Agent Hackathon
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/numekudi/articles/29e22e8806b0c5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-022 Whisky AI Bartender

- 公式説明: Multi AgentとGoogle Cloudで変革する、パーソナルなウイスキー体験【第2回AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: Nara Family
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yu5uke1024/articles/03adf04313af62
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-023 ワンダーストーリー

- 公式説明: うさぎでもわかる🐰すべての子どもに質の高い教育を AIエージェント「ワンダーストーリー」の紹介
- 参加形態: チーム
- 参加者・チーム名: r488it
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/taku_sid/articles/83ecad2d420ebb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-024 AniMaker AIアニメイカー

- 公式説明: AniMaker AIアニメイカー
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ktrips/articles/e1d720a439d7cb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-025 Sofia

- 公式説明: 知的作業の見えない仕事を見える化するAIシステム【Sofia】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fkky/articles/e12b7deaf028d6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-026 Infinite Intelligence: 知性の最強チームを創る

- 公式説明: Infinite Intelligence: 知性の最強チームを創る
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nujatigus/articles/be134aef2bc5d2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-027 Growth Buddy - 従業員と伴走するAIエージェントシステム

- 公式説明: Growth Buddy 従業員と伴走するAIエージェントシステム
- 参加形態: チーム
- 参加者・チーム名: manabi-dx-crew
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/zazen_inu/articles/bb3e9ec90c256d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-028 DbRheo（ディービー・レオ）

- 公式説明: DbRheo：自然言語だけでAI Agentがデータベース操作完結【AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/acntechjp/articles/9264063c34fc3c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-029 Swipelingo

- 公式説明: YouTube動画を活用したAI補助語学学習アプリの開発
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ioridev/articles/d1f43cf13a7e6a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-030 AI人狼

- 公式説明: 人狼参加者が足りない夜に、AIを
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shoko3168/articles/cddc59a7adafed
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-031 餃輪 (GeoCycle) — “餃⼦ × サイクリング” で Smart City, Smart Body を実現する

- 公式説明: 餃輪 (GeoCycle) — “餃⼦ × サイクリング” で Smart City, Smart Body を実現する
- 参加形態: チーム
- 参加者・チーム名: Team Land Lady
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kc7525/articles/e1d8129cbfb275
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-032 Michishiru

- 公式説明: Michishiru - 災害時にあなたを「導く」AI防災支援
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/wooloo/articles/f577f9a978adc5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-033 予定が含まれたSlackの投稿に、スタンプを押すだけでGoogleカレンダーに登録できるURLを生成してくれるBot

- 公式説明: 予定が含まれたSlackの投稿に、スタンプを押すだけでGoogleカレンダーに登録できるURLを生成してくれるBot
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/matsu/articles/cc0e726c848d45
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-034 Tech Post Cast

- 公式説明: Tech Post Cast — AIが届ける、あなただけのテックラジオ番組
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sumihiro3/articles/66643cce7dcb60
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-035 KnockAI

- 公式説明: KnockAI: 職人の見積もり&quot;暗黙知&quot;を継承するAIエージェント - Google Cloudで実現する製造業DX
- 参加形態: チーム
- 参加者・チーム名: KnockAI
- 受賞: 🏅 Moonshot賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: KnockAI: 職人の見積もり&quot;暗黙知&quot;を継承するAIエージェント - Google Cloudで実現する製造業DX
- 記事URL（文字列保存）: https://zenn.dev/enostech/articles/8a4a3f2589afd7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / ADK / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-036 Maisoku AI

- 公式説明: 【AI Agent Hackathon】Maisoku AI - AI技術で住まい選びサポート
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/aisumairu/articles/c165c83e15d19d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-037 Lecturia

- 公式説明: &quot;学び方から自分流&quot; - AIで講義を創る勉強アプリを作ったよ[第2回 AI Agent Hackathon]
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/neka_nat/articles/4930d5d90c7d38
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-038 Infumatch

- 公式説明: インフルエンサーとのタイアップ交渉をAIエージェントが自動化〜Infomatch〜
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hmdai/articles/60975c0a81485b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-039 WhiteboardLM

- 公式説明: Vertex AIで構築したRAGをDiscordやSlackから利用する
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/gerusuraimu/articles/2b7b21f646d857
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-040 「あついよ」熱中症みまもりAI

- 公式説明: -言えない暑さを、見える声に-「あついよ」熱中症みまもりAI
- 参加形態: チーム
- 参加者・チーム名: Teamあついよ＠AI木曜会
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/atsuiyo_aiagent/articles/e6b97302b79a1a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-041 Smart Check Sheet

- 公式説明: Smart Check Sheet -チェックシートで現場の勘をナレッジに-【AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sotky/articles/13c7b06d53b558
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-042 気分屋の芝日記

- 公式説明: 音声入力 × AI感情分析 × カラーパレット日記アプリ【第2回 AI Agent Hackathon with Google Cloud】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/matcha22/articles/3a23140ec1ed38
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-043 WellFin

- 公式説明: 【第2回 AI Agent Hackathon 提出物】習慣形成が苦手です
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/500ban/articles/2233b7870362cf
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-044 YouTube × Gemma 学習支援アプリ

- 公式説明: YouTube × Gemma 学習支援アプリ (第2回 AI Agent Hackathon with Google Cloud)
- 参加形態: チーム
- 参加者・チーム名: Youdemy
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuki731/articles/2349ad4d828a77
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-045 AIary

- 公式説明: AIとつくる日記 「AIary」
- 参加形態: チーム
- 参加者・チーム名: AIary
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tamaloon/articles/7d70da09a7a0a4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-046 KnowledgePaper

- 公式説明: あなたの論文調査ライフに彩りを！【KnowledgePaper】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/asap/articles/65740c3b110cc8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-047 nanimonjya

- 公式説明: AIエージェントとFirestoreで実現する、新しい「ナンジャモンジャ風」オンライン対戦ゲーム　nanimonjya
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toripy/articles/29dfdbd787c866
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-048 SUM-AI Navigator

- 公式説明: 地方創生の新たな希望：AI駆動型移住支援プラットフォーム「SUM-AI Navigator」で見つける最適な暮らし
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kdoai/articles/3f2a890966fd9f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-049 防災コンシェルジュ - Sonael(ソナエル)

- 公式説明: ファクト × しんぱいで動く防災コンシェルジュ - Sonael(ソナエル) \| 第2回 AI Agent Hackathonに挑戦！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/aya_u/articles/3de0b28619b486
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-050 MimiTalk — “よく聴くウサギ” が見守る 認知症リスク早期検知エージェント

- 公式説明: MimiTalk — “よく聴くウサギ” が見守る 認知症リスク早期検知エージェント
- 参加形態: チーム
- 参加者・チーム名: En-Dolphin
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kc7525/articles/aff930654102ea
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-051 マインドソート

- 公式説明: スワイプするだけで思考を整理 「マインドソート」【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: 寝ても覚めてもご自愛
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yatayata/articles/bd81528c760b1e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-052 WorkLoop

- 公式説明: 【WorkLoop】戦略から実行、そして成長へ。WorkLoopで仕事を設計せよ。
- 参加形態: チーム
- 参加者・チーム名: チームDD改
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fujidd/articles/2cd806452fcce1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-053 ココロン

- 公式説明: すれ違う「大丈夫」。精神疾患を持つ人と支える人のためのアプリ『ココロン』
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mugi007/articles/6e9427f2ba32bb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-054 ミライフ

- 公式説明: 準備をもっとスマートに！未来に寄り添うAIエージェント：「ミライフ」
- 参加形態: チーム
- 参加者・チーム名: Hello Hack
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yui/articles/b4b70159111b0c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-055 Session MUSE

- 公式説明: もう、曲作りで孤独じゃない。AIパートナー「Session MUSE」と創る音楽【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: Session MUSE
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/xxkuboxx/articles/51c82805edac7b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-056 AI Climbing Tokyo

- 公式説明: AI Climbing Tokyo — ボルダリング落下解析で次トライのヒントを生成【第2回 AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/climbing_hassan/articles/92e539d7713160
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-057 自分エージェント

- 公式説明: (第2回AI Agent Hakkathon) 自分エージェント
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/uragasumi25/articles/260403a5714768
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-058 CraftMate AI

- 公式説明: CraftMate AI ― DIYの設計をサポートするAI
- 参加形態: チーム
- 参加者・チーム名: CraftMate AI
- 受賞: 🏅 Flutter賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: CraftMate AI ― DIYの設計をサポートするAI
- 記事URL（文字列保存）: https://zenn.dev/sagara22/articles/535c03c31416e7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: App Engine / Vertex AI / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-059 AgriLens

- 公式説明: 衛星データを使って農地AIエージェントを作ってみた【AI Agent Hackathon応募作品】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/service/articles/b1095e5acb32c9
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-060 クックマネージャー

- 公式説明: 【AI Agent Hackathon】&quot;ごはん何作ろう問題&quot;にAIが壁打ち！AI×LINE×YouTubeで解決するボット開発
- 参加形態: チーム
- 参加者・チーム名: セル
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/anchan8/articles/25eddf1fa719b1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-061 おうちのAI相談室

- 公式説明: おうちのAI相談室：相続と空き家の&quot;感情の壁&quot;を対話型AIエージェントで乗り越える
- 参加形態: チーム
- 参加者・チーム名: ABの遺伝子
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mihyoshida/articles/28711d4a203800
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-062 CEMENT

- 公式説明: 【AI Agentハッカソン】読んだフリで終わらせない。プレゼンさせて記憶を固める鬼コーチAI「CEMENT」
- 参加形態: チーム
- 参加者・チーム名: AL2
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dmorita/articles/829de6120aab33
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-063 飲食店のシフト管理負担をゼロへ！シフト管理AI〜シフ長〜

- 公式説明: 飲食店のシフト管理負担をゼロへ！シフト管理AI〜シフ長〜【第2回 AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: シフ長
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/akito0818/articles/3e3f4694fc1846
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-064 Discordコミュニティ運営AIエージェント「コミュニティ羅針にゃん」

- 公式説明: Discordコミュニティ運営AIエージェント「コミュニティ羅針にゃん」
- 参加形態: チーム
- 参加者・チーム名: コミュニティプロメンバーズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ayyh_18/articles/e2695d72f3c2a6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-065 絵文字窓口

- 公式説明: 絵文字窓口 -絵文字で暮らしサポート- 【第2回 AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: Chronos
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/team_9z9/articles/7f356d0df0417b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-066 RoomBot

- 公式説明: 🤖 RoomBot-会議室向けAIエージェントシステム AI Agent Hackathon with Google Cloud
- 参加形態: チーム
- 参加者・チーム名: VIRMUS
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/td_maru/articles/50b299b23f8edb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-067 性格診断シューティングゲーム「深淵の射撃場」

- 公式説明: GeminiCLIとMCPで、性格診断シューティングゲーム作ってみた【MCP✖️BLE】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/beavers_hive/articles/2ae330de0a62b6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-068 AIを活用した住宅ミスマッチ防止アプリ「次の住処」

- 公式説明: 次の住処　〜住宅ミスマッチ防止bot〜【AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: sudo make coffee
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/wakioh/articles/befe49f63e5bf6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-069 GeminiとGoogleサービスで作る、お祭り検索＆訪問記録アプリ

- 公式説明: GeminiとGoogleサービスで作る、お祭り検索＆訪問記録アプリ開発記
- 参加形態: チーム
- 参加者・チーム名: ちゃそっこを調教する会 - AI Agent Hackathon編-
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/chattso_gpt/articles/bbfeccaf9c71cf
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-070 norn

- 公式説明: 面倒な旅行計画、さようなら。複数人のワガママを全て叶えるAI旅行プランナー
- 参加形態: チーム
- 参加者・チーム名: norn
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ryoga_88/articles/29be2860250abe
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-071 Polyphra

- 公式説明: 新感覚英語学習ツール「Polyphra」
- 参加形態: チーム
- 参加者・チーム名: Polyphra開発者たち
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/momocraft/articles/899cd2f2541d41
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-072 Skill Map

- 公式説明: VertexAIを活用したスキルマップ作成ツール
- 参加形態: チーム
- 参加者・チーム名: DCS
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuk0104/articles/6b6b10233ead6b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-073 Manga Maker

- 公式説明: MangaMaker 〜議事録から４コマ漫画を自動生成〜 【第2回 AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: fridaycat20
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/da_takatsuki/articles/6e8d2de4baa76f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-074 Summaryme.ai

- 公式説明: 積読おさらば。AIがあなたの「後で読む」をPodcastにする『Summaryme.ai』で、情報収集を劇的に効率化する
- 参加形態: チーム
- 参加者・チーム名: ガヤ民
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hue/articles/zenn_ai_hackathon_202506
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-075 Kikimimi

- 公式説明: Kikimimi — 字幕・翻訳・Q&amp;A・マインドマップで会議を加速するAIアシスタント
- 参加形態: チーム
- 参加者・チーム名: Kikimimi
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/riku_yanagawa/articles/193e19acd4ccc5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-076 AIMeeBo

- 公式説明: リアルタイムでグラフィカルな&quot;議事ボード&quot;を自動作成する「AI Meeting Board」を開発
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 🏅 Firebase賞
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / リアルタイム
- 記事タイトル: リアルタイムでグラフィカルな&quot;議事ボード&quot;を自動作成する「AI Meeting Board」を開発
- 記事URL（文字列保存）: https://zenn.dev/marcosan/articles/80c0b704e88191
- GitHub URL: https://github.com/marcosanyo/AIMeeBo
- デモURL: https://aimeebo-demo.web.app/
- 明示技術: Cloud Run / Vertex AI / Gemini API / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-077 hanaCare

- 公式説明: hanaCare（第2回 AI Agent Hackathon with Google Cloud 参加）
- 参加形態: チーム
- 参加者・チーム名: ViZO
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/vizo/articles/ca8824dae2cf52
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-078 OGORI MATCH

- 公式説明: OGORI MATCH: 一杯のドリンクで、組織の「風通し」を変えるAIエージェント
- 参加形態: チーム
- 参加者・チーム名: YOKOKU.D
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/zenn_tata/articles/e4cbd07926dd91
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-079 「学んだつもり」を「体験」に変える。学びのためのシミュレーションゲーム生成AIサービス -Noveroo-

- 公式説明: 「学んだつもり」を「体験」に変える。学びのためのシミュレーションゲーム生成AIサービス -Noveroo-
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yana22/articles/fc81742dc17193
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-080 everstudy

- 公式説明: 継続して学習することを支援するWebアプリ
- 参加形態: チーム
- 参加者・チーム名: シロナガスクジラ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ka_projects/articles/enken-hackathon-everstudy
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-081 ホジョキンTV エブリデイ

- 公式説明: 会話から「それ補助金貰えるかも」を通知するLINE Bot、ホジョキンTV エブリデイを制作しました【AI Agent Hackathon】
- 参加形態: チーム
- 参加者・チーム名: ホジョキン制作チーム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hitotori/articles/2116074aeadc71
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-082 旅するデジタルペット - たびぺっち

- 公式説明: 旅するデジタルペット - たびぺっち【第2回 AI Agent Hackathon with Google Cloud】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/enu_kuro/articles/2ebd7de4dbbca2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-083 cogni-team-ai

- 公式説明: CogniTeam AI
- 参加形態: チーム
- 参加者・チーム名: CogniTeam
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takanyan/articles/feeb77ea67229b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-084 「Me-Too!」

- 公式説明: Me-Too! - AIによる趣味・出身地マッチングアプリ
- 参加形態: チーム
- 参加者・チーム名: 3R
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rikut0417/articles/f093bbab7f1ab8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-085 DinnerCam -余りがちな食材においしいを-

- 公式説明: DinnerCam -余りがちな食材においしいを-
- 参加形態: チーム
- 参加者・チーム名: ニトリホールディングス
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/digitalbase/articles/60e2edede370a6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-086 飲み会幹事をイイ感じにサポートする！自律型AIエージェントアプリ「イイカンジ」

- 公式説明: 飲み会をサポートする！イイ感じの幹事「イイカンジ」
- 参加形態: チーム
- 参加者・チーム名: Room 501
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/agesagesage/articles/8e22d53c062656
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-087 レシートシェア

- 公式説明: レシート共有アプリ〜レシートシェア〜
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/masan_eeic/articles/ff4bd2a3747521
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-088 忙しい人のための料理支援アプリ「ストレスフリーに食卓を!」

- 公式説明: 忙しい人のための料理支援アプリ「ストレスフリーに食卓を!」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/namy3242/articles/59abc680d7b6ef
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-089 Nizukuri AI

- 公式説明: Nizukuri AI（荷造りAI）: 旅行の準備をより効率的に
- 参加形態: チーム
- 参加者・チーム名: お魚蓋
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/osakanafuta/articles/8dbb2f4e020080
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-090 すっきゃなー

- 公式説明: すべての人の「食」のバリアをなくしたい！メニュー翻訳＆アレルギーチェックアプリ「すっきゃなー」🌯🍣🍜
- 参加形態: チーム
- 参加者・チーム名: barbecue-trio
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/barbecue/articles/a874205903617f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-091 ブログ見直すくん

- 公式説明: GeminiでAIアプリ「ブログ見直すくん」を作った
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shimo_s3/articles/0-2025-06-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-092 linguasafetrip

- 公式説明: LinguaSafeTrip - 言葉の壁をなくし、災害から旅を守る !
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 🏅 Firebase賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: LinguaSafeTrip - 言葉の壁をなくし、災害から旅を守る !
- 記事URL（文字列保存）: https://zenn.dev/hamaup/articles/b34190ed8787bd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Firebase / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-093 ラーメンに愛(AI)を！

- 公式説明: ラーメンに愛を！ AIと共に最高のラーメンライフを送る【第2回 AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: 歴史に名を刻め
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kuuuuu/articles/e23d94d6ae9149
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-094 Edge Presence X（EP-X）

- 公式説明: Edge Presence X（EP-X）：エッジAIでリアルタイム存在感知を実現するMVP
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toki_mwc/articles/530355c3a3fa76
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-095 Interrogation Room

- 公式説明: AI取り調べゲームを作りました
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sachikonitta/articles/e87b22c8ecb88f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-096 お片付けパートナー

- 公式説明: 写真1枚で「どこから片付けるか」をAIが教えてくれる！家事苦手民のための「お片付けパートナー」
- 参加形態: チーム
- 参加者・チーム名: チームINT
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shouhei12/articles/07a58d80b41d6e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-097 暗記Pai

- 公式説明: 暗記科目にも、AIアプリを活用しよう【第2回 AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ichihos1111/articles/840884a20884ed
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-098 UX-AI Insight

- 公式説明: UX分析AI Agent「UX-AI Insight」第 2 回 AI Agent Hackathon with Google Cloud
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yatakemi/articles/e8899551068483
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-099 AI幹事くん

- 公式説明: AI幹事くん：団体予約の「面倒」を「楽しい」に変えるAIエージェント
- 参加形態: チーム
- 参加者・チーム名: B.FFS. @AI木曜会
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/motoi_asami/articles/79d7d1c7dce174
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-100 会議の障壁をなくす会議ファシリテーションwebアプリ

- 公式説明: 会議の障壁をなくす会議ファシリテーションwebアプリ
- 参加形態: チーム
- 参加者・チーム名: mac-sdo
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/coffeecupjp/articles/62ebc5f19ff819
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-101 Astar

- 公式説明: その場で決めて、今を動かす。オンライン会議アシスタントAstar
- 参加形態: チーム
- 参加者・チーム名: Koshiba
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hrichii/articles/ai_agent_hackthon_3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-102 IntelliQuest

- 公式説明: IntelliQuest：AIが導く新しいコミュニケーションの形 ― より良い対話のための賢いアンケートプラットフォーム💬
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/daydreamer/articles/c827e6c4c62b89
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-103 どこでもドア

- 公式説明: 【AI Agentハッカソン】どこでもドア：AI旅行プランニングアプリ
- 参加形態: チーム
- 参加者・チーム名: 台湾マンゴー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/atien/articles/8ea3492a786125
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-104 Agentpedia

- 公式説明: AIエージェントのための「Google検索」はなぜ必要か？ADKで構築するA2A検索エンジン「Agentpedia」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/y_t/articles/a8de7f6f997d63
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-105 おなかプランナー

- 公式説明: おなかプランナー：忙しい毎日を救う食事計画アシスタント
- 参加形態: チーム
- 参加者・チーム名: おなかプランナー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tokuda/articles/b6c0c37a8b65b1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-106 A-Idea (ええ、アイデア)

- 公式説明: 企画書作成・評価の相棒“A-Idea(ええ、アイデア)”ーAIエージェントで、稟議をもっと気軽にー
- 参加形態: チーム
- 参加者・チーム名: A-Idea
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/oidyps/articles/0bc4b86dbe4157
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-107 FlatJam

- 公式説明: 創造性を育む音楽教育ツール FlatJam
- 参加形態: チーム
- 参加者・チーム名: IBUKI
- 受賞: 最優秀賞
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 創造性を育む音楽教育ツール FlatJam
- 記事URL（文字列保存）: https://zenn.dev/nayus/articles/82e226cac28e53
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Gemini API / Firebase / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-108 AIくらべバトル

- 公式説明: AIと一緒に楽しむ新感覚ゲーム「くらべてAI」開発記
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kotap15/articles/b1cfa682d0f550
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-109 医療現場のパートナー

- 公式説明: AIエージェント「MedAgent-Chat」開発 臨床工学技士が挑む、医療現場の「知のパートナー」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/holyholy555/articles/33a90ec33b9046
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-110 データ分析と可視化をするBI Chatbot

- 公式説明: データ分析と可視化をするBI Chatbot
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/wonyx/articles/723d12ca292646
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-111 requirements Checker

- 公式説明: requirements.txt 診断エージェント【第2回 AI Agent Hackathon with Google Cloud】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ow_dev/articles/49474003bf16b2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-112 つながりコール

- 公式説明: 高齢者の社会的孤立をなくすAI電話「つながりコール」
- 参加形態: チーム
- 参加者・チーム名: ユニバック
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rapirapi/articles/96082fdce354d5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-113 小説コンシェルジュ

- 公式説明: “気分にぴったりの一冊”を届ける ─ Geminiで小説推薦アプリを作ってみた
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yanshee/articles/47ff01c9460a93
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-114 Proxima 〜エンジニアの「成長したい」を支える行動支援アプリケーション〜

- 公式説明: Proxima 〜エンジニアの「成長したい」を支える行動支援アプリケーション〜
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takkuhiro/articles/proxima-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-115 LoveApp

- 公式説明: 垢抜け支援アプリ「LoveApp」
- 参加形態: チーム
- 参加者・チーム名: Team CCH
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakamurakouta/articles/d1810b4bf13b8c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-116 プロジェクト横断の知識吸収と多角的思考を支援するAIアシスタントの開発

- 公式説明: プロジェクト横断の知識吸収と多角的思考を支援するAIアシスタントの開発
- 参加形態: チーム
- 参加者・チーム名: SynapseX
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ponpy/articles/10fc5144296446
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-117 Cocoro.Agent（ココロ・エージェント）

- 公式説明: Cocoro.Agent: AIで育児に“寄り添い”を届ける家庭用エージェントの挑戦
- 参加形態: チーム
- 参加者・チーム名: ミマモルンズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takukuku/articles/5d146a68ee25cb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-118 RoomCare: AI

- 公式説明: RoomCare AI: 住まいの「散らかり」とメンタルを同時にケアする【第二回AIハッカソン】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/atworks_np/articles/d6104ad63da017
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-119 Kanzy

- 公式説明: “今日誰かと遊びたい”を提案するAI-agent搭載の暇共有SNSを作ってみた
- 参加形態: チーム
- 参加者・チーム名: Kanzy作るニキネキ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/motsuo/articles/bfbbd82d70e796
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-120 Cheers Planner

- 公式説明: Cheers Planner
- 参加形態: チーム
- 参加者・チーム名: Cheers Planner
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hata_hata/articles/0d07bb77b1b7b1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-121 Your Horror Novel

- 公式説明: 🎭 あなただけの恐怖を紡ぐ - AIホラー小説共創アプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/y_gorilla/articles/ec7a5d794ec86b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-122 Bear Horizon くまの気持ちで英単語を学習

- 公式説明: Bear Horizon くまの気持ちで英単語を学習【第2回 AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/michan74/articles/36ef1b41d64590
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-123 project ECHO

- 公式説明: 従業員個人と会社の信頼を繋ぐ新しいコミュニケーションAI「ECHO」
- 参加形態: チーム
- 参加者・チーム名: TEAM ECHO
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kitamu_lucky/articles/0baf2045d6ced0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-124 Importion

- 公式説明: Webページを好きなNotionデータベースへ保存できるモバイルアプリ Importion を作成しました
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/bannzai/articles/3f5c9dbad0d381
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-125 AI Agent based Analyst

- 公式説明: データサイエンティスト撲滅！データ分析エージェントの開発
- 参加形態: チーム
- 参加者・チーム名: 株式会社KIYONO
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kiyono_nomura/articles/d22d8d4dfc1eeb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-126 チョットマッタAI

- 公式説明: チョットマッタAI ~AIが見守る安全なコミュニケーション~
- 参加形態: チーム
- 参加者・チーム名: まじんこ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tamyu/articles/440703aa87110f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-127 Turtle Soup

- 公式説明: Turtle Soup AI：英語の質問力を鍛えるウミガメのスープ【第2回 AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/armond/articles/15648b77bfa1d6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-128 TalkOne

- 公式説明: 【ゲーム感覚で会話力向上 !】 TalkOne : AI ともマッチングする匿名通話アプリ
- 参加形態: チーム
- 参加者・チーム名: Stargazer
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuuu1230/articles/cd90960b481966
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-129 AI栄養管理アプリDietitian

- 公式説明: AI栄養管理アプリ Dietitian【AI Agent Hackathon with Google Cloud】
- 参加形態: チーム
- 参加者・チーム名: なんでもええよう
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/gurekamu17/articles/b27a60bd5f2bc6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-130 AppointmentAI

- 公式説明: AppointmentAIで実現する営業・商談DX ─ “アポ準備の自動化”による現場革新
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kiriko_tech/articles/f1da526fffd8c7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-131 部活動支援エージェント AI Kommon

- 公式説明: 「AI時代の部活動は誰も取り残さない!」部活動支援エージェント AI Kommon
- 参加形態: チーム
- 参加者・チーム名: AI Kommon
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/delzaky/articles/8feac8cfbac845
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-132 Alco Guardian

- 公式説明: alco guardian: エージェントが協調し「飲み過ぎ」と向き合う新しい飲酒体験
- 参加形態: チーム
- 参加者・チーム名: Alco Guardian
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/satory074/articles/e0044b5c0222eb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-133 きっずフードアドバイザー

- 公式説明: 幼児食の悩みにAI栄養士がこたえてくれるやつ作ってみた
- 参加形態: チーム
- 参加者・チーム名: ゼクノヴァで4月頃に戻りたい
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/resqnet/articles/2fe887810da9d4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-134 ミーム論文

- 公式説明: あなたの「くだらない」を、権威ある「論文」に。AI論文ジェネレータ「ミーム論文」作ったので、裏側を全てお見せします
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/charokoukuu/articles/1f5b7a5befc228
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-135 RhymeFlow：ラップバトルAIエージェントで即興バトルに挑む！

- 公式説明: ラップバトルAIエージェント「RhymeFlow」で即興バトルに挑む！
- 参加形態: チーム
- 参加者・チーム名: ハック・ライム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kenue/articles/f29df9402b6cc3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-136 KaraMateAI

- 公式説明: KaraMateAI：カラオケのお供にパーソナルエージェント​​​​​​​​を。【AI Agent Hackathon】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/equal_nao/articles/5bc9b8beb7950a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-137 Vibe Planning

- 公式説明: Vibe Planning
- 参加形態: チーム
- 参加者・チーム名: Vibe Coders
- 受賞: 3位
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: Vibe Planning
- 記事URL（文字列保存）: https://zenn.dev/huku/articles/e1addc5cf3837c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Vertex AI
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-138 GenieUs

- 公式説明: 【第2回AI Agent Hackathon】Google Cloudで創る、子育ての“見えない頑張り”に光をあてるマルチエージェント
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tnoce/articles/bf4531c0ad8e32
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-139 マッチ売りの電卓

- 公式説明: マッチ売りの電卓【 お金の感覚を見える化するアプリ 】
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rabbitprogram/articles/6f27a2ea2d0755
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-140 AI英単語学習アプリ「Ai単 ~ Eitan ~」

- 公式説明: 【第2回 AI Agent Hackathon】AI英単語学習アプリ「Ai単 ~ Eitan ~」で変わる語学学習体験
- 参加形態: チーム
- 参加者・チーム名: ゲコゲコ戦隊サンケンジャー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yoh_siba/articles/ff8ec3719be335
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-141 Elevia

- 公式説明: ムーンショットな OKR 達成を支援するサービス「Elevia」
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mrmtsntr/articles/d700c483bfeed2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-142 シフト作成AIエージェント「Shift Agent」

- 公式説明: シフト作成AIエージェント「Shift Agent」📅
- 参加形態: チーム
- 参加者・チーム名: 新木場PJ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/jacksen/articles/47e7c8e451669a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-143 空間AIエージェント わらびくん

- 公式説明: 【AI Agent Hackathon】Apple Vison Proアプリ 空間AIエージェント わらびくんを作ってみた
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mouri45/articles/0bccdc2be26513
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-144 Chat-MBTI

- 公式説明: Chat-MBTI -チャットボットとの会話による性格診断ツール- (Agent Hackathon with Google Cloud)
- 参加形態: チーム
- 参加者・チーム名: M-two
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/oh80/articles/a2e7d01225105d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-145 Smart Twin Room

- 公式説明: Smart Twin Room ～誰もがAIデジタルツインを持つ世の中へ～
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 🏅 Tech Deep Dive賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: Smart Twin Room ～誰もがAIデジタルツインを持つ世の中へ～
- 記事URL（文字列保存）: https://zenn.dev/yumabo/articles/21cf9234d07328
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-146 UltraSoulMatch.ai

- 公式説明: あなたを調べ上げて最高のエンジニア仲間を見つける！：UltraSoulMatch.ai
- 参加形態: チーム
- 参加者・チーム名: Tru-S3
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/teba_eleven/articles/5dbaabf3047e25
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-147 Realingo

- 公式説明: 【Realingo】あなたや友達のストーリーを教材に！SNS型AI語学アプリ
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/naoto000/articles/d92ffc77b6761a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-148 PRNews

- 公式説明: PRNews
- 参加形態: チーム
- 参加者・チーム名: 神山ブラザーズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/k_r_programing/articles/77cb5f2fd062dc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-149 おすすめ居住エリア診断アプリ

- 公式説明: 【おすすめ居住エリア診断アプリ】都内の住む場所をAIエージェントが提案
- 参加形態: チーム
- 参加者・チーム名: チーム不動産Lovers
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shoma_inv/articles/b09ee383350bc2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-150 Sticker Atelier

- 公式説明: AIスタンプ共同制作アプリ「Sticker Atelier」で、友人との思い出を形に。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/zaic_master/articles/a691cfa42bf905
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-151 おまかせダイアリー

- 公式説明: 【AI Agentハッカソン】GeminiとADKで創る、親子の物語自動生成AI「おまかせダイアリー」
- 参加形態: チーム
- 参加者・チーム名: チームけんたく
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kennr/articles/e757723aaf09ea
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-152 WhatWeTalked

- 公式説明: 「記憶に頼らない接客」でリピーター獲得を支えるAI接客支援システム WhatWeTalked
- 参加形態: チーム
- 参加者・チーム名: GDG on Campus Osaka
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/gdgoc_osaka/articles/ae5b89e170b2f3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-153 学校だよりAI

- 公式説明: 【学校だよりAI】なくならない “紙” 文化｡それなら「今」を照らそう｡AIと｡
- 参加形態: チーム
- 参加者・チーム名: わきAIAI@AI木曜会
- 受賞: 2位
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 【学校だよりAI】なくならない &quot;紙&quot; 文化｡それなら「今」を照らそう｡AIと｡
- 記事URL（文字列保存）: https://zenn.dev/gakkoudayoriai/articles/d7c61ec828913d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Gemini API / ADK / Firebase / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V2-154 QA3

- 公式説明: 不明・未確認
- 参加形態: チーム
- 参加者・チーム名: QA3開発チーム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/and_dot/articles/7e054d7769835d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 公式一覧の説明が空欄
### V2-155 あなたのインフルエンサー

- 公式説明: 「あなたのインフルエンサー」 自分だけのインフルエンサーをAIで作ろう！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/karamiso/articles/d77beddb96aab6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-156 珈琲焙煎ロガー：Artizen

- 公式説明: 珈琲焙煎ロガー：Artizen - バイブコーディングで開発！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/k223tech/articles/artizen-logger-ai-hackathon-vol2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-157 Location Insights AI住環境分析システム

- 公式説明: &quot;Google Cloud AIを活用した住環境分析システム 「Location Insights」の開発&quot; 🏠
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tenyyprn/articles/8f8245584dcbb2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V2-158 AI人狼オンライン

- 公式説明: AI人狼オンライン：次世代マルチプレイヤーゲーム
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hamutaro_kun/articles/9413e193fd812e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-001 マイ国家シミュレーター

- 公式説明: 「マイ国家シミュレーター」は、仮想国家の統治者となりAIと対話しながら国を運営し、政治や社会の仕組みを楽しく学べる教育型ゲームアプリです。Google CloudのVertex AIを活用し、多様な市民の声やリアルな政策シナリオを体験可能。政治や社会が難しく感じる中高生や一般ユーザーに、自分ごととして主体的に学ぶ環境を提供します。学校やワークショップでの教材としても活用でき、ゲームの面白さとAIによる臨場感を融合した新しい学びの形を目指します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tmkst/articles/4515c6dc4ed28b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-002 Kakuti

- 公式説明: Kakutiは、効率化ではなく理解の深化を重視する「AI知識パートナー」です。PDFやMarkdownの管理・編集、全文検索、ハイライトや翻訳、RAGによるAI対話を統合。読む・書く・問い直す体験を支援し、知識の内面化と成長を促します。さらに、選択範囲を直感的に指定できるMagic Wand機能を開発中で、論文や資料の探索をより自由にします。ローカル優先設計とプラガブルなLLM/埋め込みに対応し、学習と創造の循環を加速します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ianmeng/articles/9ea26b6d0baa20
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-003 A2A+MCPを使用したデータガバナンス自動化システム

- 公式説明: 日本企業の97%がデータ活用で十分な成果を上げられていない課題に対し、最新のA2A（Agent-to-Agent）とMCP（Model Context Protocol）技術を活用したデータガバナンス自動化システムを開発しました。 BigQueryテーブルのメタデータ不足を自動検出し、AIが適切な論理名・説明を提案。さらに統計情報に基づく品質ルールを自動生成し、ガバナンススコアで総合評価します。親エージェントが2つの専門エージェント（BigQuery・Dataplex）を協調制御し、MCPサーバー経由でGoogle Cloudと連携。 従来170時間かかっていた品質管理業務を大幅削減し、年間374万円の効果が期待できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/phper8080/articles/b6034eb0aba907
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-004 ピクプロ！〜Picture Prompt Game〜

- 公式説明: AIが作成したお手本の絵を見て、「お題の絵にできるだけ近い絵を出力させるプロンプト」を考えるゲームです。対戦形式でゲームを楽しみながら、プロンプトの試行錯誤を繰り返すことで、AIに与える「プロンプトのより良い形」を学ぶことが出来ます。また、老若男女の誰でも気軽に参加できるゲームなので、コミュニケーションの促進も図れます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hal1986/articles/20250920-hackathon-v3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-005 AICCA(AI Content Credibility Agent)

- 公式説明: AICCA（AI Content Credibility Agent）は、AI生成コンテンツの信頼性を検証する専門エージェントシステムです。テキスト・画像・動画を対象に真偽を判定し、ディープフェイクを含むAI生成コンテンツを高精度で検出します。ReActアーキテクチャを採用し、Sapling、C2PA、Google Vision APIなど複数の検証ツールを統合して総合的な分析を実現しています。さらにリアルタイムWebSocket通信により即座に結果を表示。情報の真偽が問われる現代において、信頼性を科学的に評価し、デジタル情報の透明性向上に貢献します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hongbod/articles/316f27826c17ed
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-006 おはなしまもりん

- 公式説明: AI読み聞かせアプリ『おはなし まもりん』は、子育て中の「目が離せない」不安を解消し、「親子のあんしん時間」を創出します。動画の手軽さと読み聞かせの温かさを両立し、AIが子どもの名前や好きなものに合わせたオリジナル物語を生成・読み聞かせすることで、親子の共創体験を促します。音声中心のデザインとアクセシビリティへの配慮により、親の負担を軽減しながら、自然なコミュニケーションを深める新しい子育ての形を提案します。
- 参加形態: チーム
- 参加者・チーム名: おはなしまもりん制作チーム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/myapp/articles/f84850bd55dc70
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-007 AdCraft AI

- 公式説明: 商品画像から自動でコマーシャル動画を生成するAIマルチエージェントシステム。商品インテリジェンス、クリエイティブディレクター、ビデオプロデューサーの3つのAIエージェントが連携し、商品の特徴を分析→創造的なコンセプトを構築→高品質な動画を制作。Google Cloud Vertex AI (Gemini Pro Vision, Imagen, Veo API)を活用し、従来数日かかる動画制作を数分で実現。EC事業者の広告制作コストを大幅削減し、効果的なマーケティング動画の民主化を目指します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/oharu121/articles/61afd3a6f63103
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-008 多国語版労働安全ナビゲーター

- 公式説明: 大型プラント建設などで働く、安価な労働力と言われているアジア圏の作業者の労働災害は後を絶たず、施主であるプラント企業などの賠償、レピュテーションリスクを下げる必要があります。 本プロジェクトは、ベンガル語を含む4か国語で、その日行う作業の注意点および対策を動画と画像を含めてわかりやすく作業員に提示することで、安全行動の実施および災害の防止に寄与するものです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shogonohito/articles/0e2a85773e1a8d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-009 MAsterpIece（マスターピース）

- 公式説明: 「名作」と呼ばれる本は難しい、というイメージがあります。 「MAsterpIece」は、名作をより気軽に楽しんでもらうために、「探す」場面から「読む」場面まで、名作の読書を総合サポートするプロダクトです。 「探す」場面では、本プロダクト上での読書履歴を参考に、「司書エージェント」がおすすめの本を提案してくれます。 また、「読む」場面では、難しい表現を平易にしてくれる「ここだけ現代語訳」、読書中の様々な疑問に答える「解説エージェント」、シーンを絵にしてより楽しめる「挿絵を生成」、「動く挿絵を生成」の機能を利用できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tea_py/articles/236d753168681e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-010 初めての子育てをAIがサポート｜Sukusuku

- 公式説明: すべての親御さんを支えるAI育児アシスタントアプリ「Sukusuku」です。従来のチャット型AIとは異なり、育児日記と赤ちゃんの生育情報を元に毎日の状態や育児日記の分析を毎日自動で行います。Vertex AIによる分析と、厚生労働省の乳幼児健診データをRAG技術で活用した科学的根拠に基づく総合評価を実施します。不足情報はGoogle Search機能で自動補完し、毎日育児専門家からアドバイスを受けているような安心感のある育児支援を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mmol93/articles/3bc9849cb0af95
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-011 たべぶい

- 公式説明: 肉好き必見！牛・豚・鳥の各部位を食べた記録を管理し、制覇率をゲーミフィケーションで楽しめるWebアプリです。最大の特徴は、Gemini APIを活用した「Agent食べ歩きコンシェルジュ」機能。ユーザーの未制覇部位を分析し、その部位が食べられる最適なお店を自動推薦します。React + FastAPI + MySQLで構築し、Google OAuth認証で手軽にログイン。写真付きで食べた部位を記録しながら、AIが次の食べ歩き先を提案してくれる、肉愛好家のための革新的なアプリケーションです。
- 参加形態: チーム
- 参加者・チーム名: ものたの
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/articles/79518edd9ed12e/edit
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-012 detection-game

- 公式説明: カメラで撮影して獲得したスコアで友だちと競い合おう！  Cloud Vision APIによる物体検出結果を元にスコアを算出。 ただし同じような画像を何度撮影してもスコアは獲得できない。 いろんなものを撮影できるところでポイントを稼ごう！ただし勝手に人や人のものを撮影するのはやめましょう。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/megane_otoko/articles/94_ai_agent_hackathon_3rd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 同一記事URLが公式一覧内で複数回掲載: entry_order 12, 14
### V3-013 Homefit Studio

- 公式説明: 「今日、何を着ていこう…」 そんな悩みを解決するのがHomefit Studioです。  手持ちの服と自分の写真を登録し、「週末の公園デート」「取引先との会食」などシーンを入力するだけで、AIがTPOに合った最適なコーデを提案。動画で“自分が着ている姿”を確認できるので、現実味のある体験感を得られます。  服選びにかかる時間と労力を減らし、自信を持って出かけられる、新しいファッション体験型ソリューションを提供します。
- 参加形態: チーム
- 参加者・チーム名: チームZ世代
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ruki_kuri_sun/articles/865667be266367
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-014 物体検出ゲーム

- 公式説明: 物体検出とゲームを組み合わせたスマホアプリ(Androidのみ) カメラで撮影して獲得したポイントで友だちと競い合おう！ Cloud Vision APIによる物体検出結果を元にスコアを算出。 30秒以内に撮影しよう、ただし同じような画像を何度撮影してもスコアは獲得できないぞ！ いろんなものを撮影できるところでポイントを稼ごう！ ただし勝手に人や人のものを撮影するのはやめましょう。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/megane_otoko/articles/94_ai_agent_hackathon_3rd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 同一記事URLが公式一覧内で複数回掲載: entry_order 12, 14
### V3-015 Reliable Eats

- 公式説明: 「Reliable Eats」は、サクラレビューに惑わされず本当に信頼できる飲食店を探せるAI Webアプリです。4つの専門エージェントが並列処理で候補選定・レビュー検証・店舗信頼性確認・総合判定を行い、ユーザーに安心して選べるTOP5を提示します。Google CloudのVertex AI（Gemini 2.5）とWeb Groundingを活用し、最新の口コミや店舗情報をリアルタイムに収集。検索モードと調査モードを備え、直感的なUIで結果を可視化。外食選びの「失敗」を減らす次世代のレストラン検索体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 知識・調査・RAG / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/serge/articles/61a0e06ee54d5c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-016 Genba Insight

- 公式説明: プロジェクト概要 - 背景: オンラインでは Google Analytics のように行動計測が容易だが、店舗では入店数や滞留程度に留まり「どの棚で何をしたか」の解像度が低い。 - 目的: ユーザーの棚前での行動を簡単に可視化し、セッション単位で分析・要約する。 - アプローチ:   - Webカメラのみで動作。ブラウザで姿勢/手のランドマークを推定し、ジェスチャをイベント化。   - 必要時のみ静止画を取得して、分析完了後はインメモリ上の画像を即時破棄し、プライバシとコストを両立。   - 行動ログと分析結果はBigQuery 連携。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ossy/articles/a2846dcdfde18e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-017 Qualia Portal

- 公式説明: 「Qualia Portal」は、AIの力で「記録と記憶の断絶を越える」新しい映像体験です。1枚の写真から、その場の空気感や胸の高鳴りといった「主観的な感覚（クオリア）」をAIが読み解き、エモーショナルな映像として翻訳。時間や空間の軸をずらした複数の世界をもとに再構築することで、あなたの写真が、見る人と感動を共有する「記憶の入り口」に変わります。AIが人と人の深い共感を可能にする、新しいコミュニケーションを提案します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ishikr/articles/8f7fbdec085f5c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-018 VoiceSketchAI

- 公式説明: 発話を入力としてAIが絵を生成し、元の音声と合成した動画を作成するアプリを開発しました。 このアプリを使えば、声をいつものカメラ録画とは一味違った、視覚的にユニークな形で記録できます。 例えば、話し始めたばかりの愛らしい子どもの声を、その声に反応して生まれるAIアートと組み合わせることで、いつまでも心に残る特別な思い出として記録できます。 また、大人が使えば、面白い画像生成を狙ったり、アート的な表現を楽しんだりするなど、無限の創造性を発揮できます。 このアプリは、単なる音声記録ツールではなく、声とAIアートが融合した新しい形の表現メディアです。誰もが簡単に、そして楽しく、自分の声をユニークなアート作品に変えることができます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mikkikimasutaro/articles/0e30affc535c1d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-019 DreamGenie

- 公式説明: DreamGenieは、目標達成を支援するAIアシスタントです。ユーザーが「やりたいこと」と「期限」を入力するだけで、AIが達成までのステップを自動設計し、日々の予定に落とし込みます。予定変更も自然言語で伝えるだけで再調整可能。Flutter WebとGCP Cloud Run上のFastAPIで構築され、Gemini APIと連携して柔軟なスケジュール管理を実現。資格取得や習慣化など、計画立案に悩む人々の「夢の設計士」として寄り添うツールです
- 参加形態: チーム
- 参加者・チーム名: ポストイーロンマスク
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/satoru_ishida/articles/mainarticlefile
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-020 日記AI

- 公式説明: 日記AI- 高齢者向け音声日記アプリ 高齢者の方でも簡単に使える音声日記アプリです。話すだけで日記を記録でき、AIが感情や健康状態を自動分析します。家族との安全な共有機能により、離れていても安心を提供できます。 大きなボタンとシンプルな画面設計で、手が不自由な方でも直感的に操作可能。プッシュ通知で家族に高齢者の状況を伝え、早期の健康変化を発見できます。 現在、Stripe決済システムの審査対応中で、正式リリースに向けて準備を進めています。高齢者の孤独感軽減と家族の安心をテクノロジーの力で実現する、社会課題解決型のWebアプリケーションです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/boy6/articles/6a7c3b1bbaec4f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-021 Facthub(ファクトハブ)

- 公式説明: データ分析の真のボトルネックは「示唆に富んだレポート作成」です。LLMは便利ですが、曖昧な指示から意思決定を促すレポートまでは作りません。「FactHub」は、この課題を解決する&quot;理想のデータアナリスト&quot;AIエージェントです。分析設計から最終レポートまでを自律的に一気通貫で実行。専門家でなくとも、データを組織の武器に変え、データに基づく意思決定の総量を飛躍的に向上させます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/enostech/articles/73010d80d02883
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-022 魔法の天秤 with Gemini

- 公式説明: 日常にあふれる「目玉焼きは醤油派かソース派？」「犬派か猫派？」といったどうでもいい論争を、本気のディベートに変える装置が「魔法の天秤」です。参加者は魔法使いビーバーの声に導かれ、交互に主張を述べます。その内容はLLMによって司会・採点され、論理性や根拠の有無など多角的に評価されます。結果はモーター制御によって物理的な天秤の揺れとして可視化され、言葉が現実を動かす瞬間を体験できます。遊びながら論理的思考を鍛え、笑いと驚きを共有できる新感覚のディベートゲームです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 優秀賞
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: MCP ✖️ BLEで、どんなことでも弁論大会にできる【魔法の天秤】作ってみた！
- 記事URL（文字列保存）: https://zenn.dev/beavers_hive/articles/bde66a38b4b978
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V3-023 CogniTerms

- 公式説明: あなたは、利用中のAIサービスの利用規約を理解しようと読み込んだことはありますか？ AIサービスの利用においては、入力した自身のコンテンツの帰属が奪われたり、入力した情報が意図しない形で使われたりするなど、非常に大きなリスクが潜んでいるにも関わらず、サービスプロバイダとユーザーの間には、規約の理解に必要な知識や、理解に費やせるコストの非対称性が存在しており、ユーザーは不利な立場に置かれています。 CogniTermsは、この非対称性を解消するためのAIエージェントWebアプリです。あなたに合ったペルソナを選択し、理解したい利用規約を入力するだけで、様々な観点でのリスクレベルを可視化できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/cogniterms_adm/articles/86cddd95c21e1a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-024 Auto Draft Maker

- 公式説明: Auto Draft Makerは、ビジネスパーソンが抱えるメール処理の負担を劇的に軽減するAIエージェントです。Gmailと連携してワンクリックで高品質な返信下書きを自動生成することで、日本全体で年間約63兆円にも及ぶメール未処理によって生まれる経済損失を限りなく減らします。  未返信メールを自動抽出し、ワンクリックでAIが文脈を理解し、適切な返信案を瞬時に作成します。ボタンを選ぶだけのシンプルな操作で、メール作成時の心理的・時間的コストをゼロに近づけます。  これにより、定型的なコミュニケーションから解放された時間を、新製品開発や顧客との対話、戦略策定といった創造的で人間的な活動に再配分でき、個人の生産性向上と企業の競争力強化を実現します。
- 参加形態: チーム
- 参加者・チーム名: そのだとよしだ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sonoken/articles/0e75ad989c8d91
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-025 MindEcho ~AIと対話しながらつける日記~

- 公式説明: MindEchoは、AIと対話しながら音声入力で日記をつけられるアプリです。日記を書くことで感情や出来事を整理し、ストレス軽減や自己成長を実感できますが、手作業の継続が面倒、思考整理が難しいという課題を解決します。Speech-to-Textで音声入力をテキスト化し、Vertex AIで共感的なインタビュー形式の対話を展開。最後にAIが要約を作成します。Firebase Hosting、Cloud Run、Cloud Firestoreを活用し、ユーザーごとの履歴管理を実現。感情分析に基づく適応型質問で自然な会話を提供し、リアルタイムフィードバックで使いやすさを向上。日常の心の整理を手助けするツールとして、忙しい人や不安を抱える人に最適です。
- 参加形態: チーム
- 参加者・チーム名: MindEcho
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/666giru/articles/04fef6731d041c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-026 PawMate

- 公式説明: PawMateは、愛するペットが迷子になってしまった飼い主さんと、ペットを見つけた方をAI技術でつなぐWebサービスです。Google CloudのAI技術を活用し、2つのAIエージェント（画像を分析する探偵AIと、ペットの行動を予測するAI）が24時間体制でペット探しをサポート。天気や時間帯、地形などのデータから「今どこにいる可能性が高いか」を地図上にヒートマップで表示し、効率的な捜索を実現します。また、見つけた方が写真を投稿すると、AIが自動で似ているペットを判定してマッチング。飼い主さんへ即座に通知が届き、チャット機能で直接やり取りができます。従来の「ポスターを貼って探す」方法から、データとAIを活用した新しいペット捜索の形を提案します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 優秀賞
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: AIエージェントが迷子のペットを探す時代へ
- 記事URL（文字列保存）: https://zenn.dev/jagaimo_poteto/articles/0a74c4f4e64b90
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Gemini API / ADK / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V3-027 いざ旅

- 公式説明: 「次の休み、どこへ行こう？」でも結局、いつも同じような旅になっていませんか？本当に行きたい旅は、あなた自身も知らないかもしれません。『いざ旅』は、AIとの対話であなたの深層心理を診断し、価値観を可視化。あなただけの運命の旅を３つ提案する新しい旅のソムリエです。旅行中はリアルタイムのコンシェルジュとしてあなたを支え、旅の後はVeoが感動をショートムービーに。計画の面倒さから解放され、本当のあなたに出会う旅へ。さあ、いざ。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakayutthi/articles/914d968b4175e8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-028 小規模店舗のInstagram投稿支援エージェントシステム

- 公式説明: 個人店や小規模ビジネスのSNS運用、大変じゃないですか？ 投稿用の画像や文章作りは時間がかかる上、お店の個性を出すのも一苦労です。  このシステムは、簡単な言葉で指示するだけで、お店のキャラクターやロゴが入ったオリジナルの画像と魅力的な文章をAIが自動で作成し、Instagramに投稿まで行います。  Googleの最新AI技術を使い、面倒な作業をAIエージェントチームが代行。SNSマーケティングの負担を劇的に減らし、ファンを増やすお手伝いをします。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/neoki_no_naoki/articles/e8d34fd410a27c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-029 Coco-Ai (ココアイ)

- 公式説明: Coco-Ai（ココアイ）は、スマホ利用が親子の会話を奪う課題に向き合い、子どもの「なんで？」を親子の対話に変えるソリューションです。子ども向けの簡潔な解説と魅力的なイラストで理解を支え、親が声をかけやすい「おはなしのタネ」で自然な会話を誘導します。アプリはFirebaseを基盤にCloud Run Functions・Cloud Run・Firestoreを連携させたイベント駆動型の構成で、リアルタイムかつ安全に利用できる設計となっています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuma_s81128/articles/751220cc0fee2c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-030 Pocket Photographer

- 公式説明: 「思い通りの写真が撮れない」「自分の写真が良いのか分からない」 このようなカメラ初心者が直面する課題に対して、ポケットに入るプロフォトグラファー(写真家)をコンセプトとし、具体的なフィードバックを提供するAIエージェント「Pocket Photographer」を開発した。  使用している機材に特化した正確なQ&amp;Aで操作の疑問を解消し、撮影した写真をAIが分析して具体的な改善点をアドバイスします。まるで専属のメンターがいるかのように、あなたの写真ライフをサポート。カメラを学ぶ楽しさを、お届けします。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hiro3432/articles/4c851947bc6eb4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-031 HAYAOSHI

- 公式説明: 「HAYAOSHI」は、教科書や問題集を撮るだけでAIがクイズ化し、友だちと早押し対戦できる学習アプリです。ChatGPTの登場以降「暗記なんてAIがやればいい」とモチベーションが下がってしまっている学生を沢山見てきました。このHAYAOSHIはつまらない暗記を友人との対戦形式で楽しく学ぶことができます。出題は二つのAIエージェントによって行われ、クイズを生成するものとそのクイズを評価するものが協奏することにより精度の高い問題生成が可能です。
- 参加形態: チーム
- 参加者・チーム名: こんぱす
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/usutaku/articles/66c108b0e75a57
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-032 モチらぶ

- 公式説明: 日本社会の重要問題であるリスキリングに対する課題解決を行うプロダクト「モチらぶ」。従来は人間が担っていた学習を継続するためのキーファクターであるモチベーションコントロールをリアルタイム音声×AIマルチエージェントにより再現することで、本当の人間が側にいて、まるで恋人のようにつきっきりで支援してくれるプロダクトです。さぁ、Let's モチらぶ！
- 参加形態: チーム
- 参加者・チーム名: 合同会社ChameleonMeme
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / マルチエージェント / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/chameleon/articles/18afcd7f8230d1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-033 フクシア

- 公式説明: 社会福祉士の現場では、煩雑なアセスメント作成や膨大な支援制度情報の検索が負担となり、本来利用者に寄り添う時間が削られています。私たちの開発した 「フクシア」 は、会話ログから自動でアセスメントを生成し、利用者に適した支援制度を検索・提案する AI Agent です。社会福祉士の業務を効率化し、支援が必要な人により多くの時間と心を注げる社会の実現を目指します。
- 参加形態: チーム
- 参加者・チーム名: てりたま
- 受賞: 最優秀賞
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 【フクシア】社会福祉士をサポートし支援が必要な人たちの生活をより豊かに
- 記事URL（文字列保存）: https://zenn.dev/teritama/articles/aa54b4fbed1231
- GitHub URL: https://github.com/teritamas/fukushia
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V3-034 シゴットニア

- 公式説明: 未来の働くを切り開くシゴットニアは、AIに聞くだけではなく、AIから質問を受けたり、AIから出題される問題を解決し、仕事を疑似的に体験するプロダクトです。子供向けの職業体験は充実していますが、新たな挑戦を目指そうとする大人の職業体験は充実していません。そこで、未来を創る子供から今を創る大人まで、全員が興味のある仕事や職人のような専門知識を学ぶことのできるプラットフォームを開発しました。どのような職種を体験したいか、具体的な考えがなくても関心のある情報を入力すると、そこからはユーザーの求める職業体験が始まります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/jinkutoriu/articles/7d2527a7ea6a4c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-035 Edison's Eye

- 公式説明: 『Edison’s Eye』は型通りの教育から自由な学びを実現するために、エジソンの少年時代の経験を参考に開発した学習アプリです。このアプリは身の回りの写真・位置情報・テキストから学びの“種”を見つけ、3つのテーマを提案します。選んだテーマに基づくソクラテス式対話のシナリオを作成して、それをもとに音声教材を自動生成します。さらに、一つの教材から3つのテーマを作成することで、学びを深める機会を提供します。これらの機能でユーザーは現実世界を豊かな学びの空間へと変えることができます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/t_buemon/articles/dafdfe1f602d8c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-036 シネモ ~心が求める映画を~

- 公式説明: 日本では年間約2万人が自殺で命を落とす深刻な社会問題があります。「シネモ」は、AIが感情を読み取り、その人に最適な映画を提案するシネマセラピーアプリです。  従来の動画配信サービスは視聴履歴に基づく推薦ですが、シネモはその時の感情や境遇に寄り添います。音声対話やテキスト入力から感情を分析し、プルチックの感情の輪理論に基づく映画データベースから最適な3本を選定。各映画には「観た後どう感じられるか」の紹介文も生成します。  技術面では、感情認識に特化したgemini-2.5-flash-preview-native-audio-dialogと高速処理のgemini-2.5-flashを使用しています。  一本の映画が人生を変えることがある。AIの力でその瞬間を生み出し、シネモが一人でも多くの方の心に希望の光を灯せることを願っています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kadotchi/articles/65bd10ee6031cb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-037 Session Buddy - イベント参加者と発表者をつなぐAIエージェントシステム

- 公式説明: 勉強会で「今さら聞けない…」と質問を諦めていませんか？「Session Buddy」は、そんな悩みを解決する双方向コミュニケーションサービスです。参加者は匿名で気軽に質問を投稿でき、発表者は参加者のニーズや理解度をリアルタイムで把握。これにより質疑応答が活発になり、参加者と発表者の双方にとって、より満足度の高い学習体験を創出します。  --- （以下は運営様に補足説明） デプロイしたURLは2つあります。参加者側のURL, 発表者側のURL。デプロイしたURL記入欄にカンマ区切りで記入しています。
- 参加形態: チーム
- 参加者・チーム名: Manabi-DX-Crew
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/manabi_dx_crew/articles/d13ab381645876
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-038 BUD-Next

- 公式説明: BUDは「芽（bud）」を育てるという想いを込めた子ども向け音声チャレンジアプリです。従来の「正解を覚える教育」から脱却し、「伝わる楽しさを体験する学び」への転換を目指しています。 内向的な子どもたちが「話すこと」に苦手意識を持つ現代の教育課題に対し、AIフィードバックと親のサポートを組み合わせることで解決に取り組みます。完璧な発話よりも「伝わった瞬間の喜び」を重視し、子どもたちの小さな成功体験を積み重ねることで自信を育みます。 音声認識技術とAI分析により、一人ひとりの成長段階に合わせた個別フィードバックを提供。家庭と学校の両方で活用できるプラットフォームとして、子どもたちの「話す勇気」と「伝える力」を段階的に伸ばしていきます。
- 参加形態: チーム
- 参加者・チーム名: BUD
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mse2506/articles/aa8773c7205be7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-039 Prezento AI Coach

- 公式説明: Prezento AI Coachは、AIがあなたの**「伝え方」**を多角的に分析し、改善を支援するパーソナルコーチです。Chrome拡張機能として提供され、いつでもどこでも、ブラウザ上でプレゼンや対話の練習ができます。  主な特徴は以下の2つのモードです。  1.  **フリープレイモード**: 自由にテーマを設定し、AIから客観的なフィードバックを得られます。「投資家」「面接官」など、AIに**ペルソナ（役割）**を与えることで、特定の聞き手を想定したリアルな練習が可能です。 2.  **ミッションモード**: 「AIの上司に企画の承認を得る」といった具体的なシナリオに挑戦します。**制限時間**内にAIとの対話を通じて目的達成を目指す、より実践的なトレーニングモードです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kosuke_takahara/articles/d3bc9f684f4750
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-040 Talk Paint

- 公式説明: 教育コンテンツやストーリー制作において、会話シーンを効率的にビジュアル化できます。CSVやMarkdownで対話データをインポートし、Google AI (ImageFX/Gemini)を使って各ダイアログに最適化された画像を自動生成。プロンプトテンプレートのカスタマイズ、参考画像の追加、一括生成後の個別編集など、柔軟な画像生成ワークフローを提供します。生成した画像はギャラリーで一元管理し、絵本として書き出すことができます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tcool/articles/0cf8904971eea0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-041 RouteKeeperAI

- 公式説明: 「RouteKeeperAI」は、複数の専門AIエージェントが協調して道路の安全性を分析   し、人々の日常移動をより安全で豊かにするシステムです。    ルート分析エージェントがGoogle Street   Viewで収集した画像を、危険検知エージェントがGemini   Visionで解析。さらに安全アドバイザーエージェントが、検出されたリスクに対す   る具体的な対策を提案します。    これらのAIエージェントは、単に危険を警告するだけでなく、「なぜその場所が危   険なのか」「どう行動すれば安全か」を対話的に教えてくれます。    AIエージェントが現実世界の道路を仮想的に「事前検証」することで、実際の移動   をより安心で豊かなものに変えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 優秀賞
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / マルチエージェント / 物理・空間連携
- 記事タイトル: 道を知り、命を守る。～AI危険予知システム RouteKeeperAI～
- 記事URL（文字列保存）: https://zenn.dev/riti0208/articles/314c8bfae02b4b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Functions / Veo / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V3-042 ADKで作るAIクリエイティブアシスタント：多様な視点でアイデアを磨くマルチエージェントシステム

- 公式説明: 広告クリエイティブ制作では、アイデアの偏りや評価の属人化が課題です。本プロジェクトでは、GoogleのAgent Development KitとVertex AIを活用し、AIエージェントがアイデア生成から多角的評価、統合レポート作成までを自動化する仕組みを構築しました。複数ペルソナによる並列評価で短時間に多様な意見を取得でき、潜在的リスクや改善点を提示します。まるでチームでブレストしているかのような体験を提供し、広告制作の効率と品質を向上させます。
- 参加形態: チーム
- 参加者・チーム名: Connective Hack
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/endr/articles/1a6ed568d691d8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-043 FutureRun

- 公式説明: 「Future Run」は、マラソン大会前にわかるコース情報＋気象予報と個々のランナーの目標や過去のデータを掛け合わせ、最適なレース戦略を 動画付きアドバイス として提供する AI パーソナルマラソン支援アプリです。重要な地点でのペース配分、給水／給食タイミング、走り方などのアドバイスを動画（テロップ付き）で可視化して提示します。FutureRunを利用することでランナーはレース中のリスクとなる地点の理解とその対応方針をじど前検討することでリスクを最小化し、レース中のパフォーマンスを最大化するという価値を提供します。
- 参加形態: チーム
- 参加者・チーム名: FutureRun
- 受賞: 優秀賞
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: Future Run 〜マラソンの理想の未来をデザインする〜
- 記事URL（文字列保存）: https://zenn.dev/sagara22/articles/77f231a8468a40
- GitHub URL: https://github.com/sagara-221/FutureRun
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Veo / Flutter
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V3-044 晴れムビ

- 公式説明: 少子化で縮むブライダル市場。一方で費用・準備負担は増加。HARE Movie（晴れムビ）は、本人写真×衣装×式場写真からAIが“自分の結婚式”のイメージ動画を自動生成。来館・試着なしで複数パターンを比較検討でき、理想の式を具体化。ターゲットは時間や手間をかけられないカップルや具体像が湧かない人。Google ADK上のエージェントがNano BananaとVeo3を連携し、短時間で高品質な提案体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/neka_nat/articles/d6cae805c18a7f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-045 LingoSavor - 英語学習の手間を半減し、効果を倍増させるアプリ

- 公式説明: LingoSavorは、英語学習における単語調べや文法質問、復習管理といった「面倒くさい」をAIで解消するアプリです。ユーザーが教科書やSNS、音声などを取り込むと、AIが瞬時に文章を解析。ワンタップでの単語・熟語の意味表示、文法事項に関する24時間対応のAIへの質問、リピーティング・シャドーイング用音声の自動生成など、学習の手間を大幅に削減します。さらに、AIエージェントが忘却曲線に基づき最適な復習問題を自動で出題。特定の教材に縛られず、あらゆる英語を教材にできる真のパーソナライズ学習で、忙しい学習者の最速での目標達成を支援します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/p05t_hum4n/articles/b900054757c64f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-046 Re:Read

- 公式説明: Re:ReadはVertex AIとFirestoreを軸にした次世代輪読会プラットフォーム。参加者の寄稿とディスカッションログを安全にサニタイズし、AIがハイライト・改善提案・総括・Podcast音声を一括生成することで、学びの熱量を維持したまま共有を加速します。ホストは公開範囲・再生成・進行ログを一元管理でき、チームの読書体験を継続的にアップデートします。さらに、Podcast音声をCloud Storageに自動保存し、遠隔メンバーも最新レビューを即参照できます。
- 参加形態: チーム
- 参加者・チーム名: さくさくぱんだ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sakupanda/articles/26e7ca8062088a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-047 StanceScope

- 公式説明: StanceScopeは、YouTube動画のコメントを収集し、AIエージェントで分析することで、議論や討論における主要な論点や支持の偏り、要約をダッシュボード形式で可視化するリサーチ支援アプリです。人気動画には数千件ものコメントが寄せられ、全体の論調を把握するのは困難です。また、確証バイアスによって自分の意見に近いコメントばかりが目に入りやすく、声の大きい少数派と静かな多数派を区別するのも難しいという課題があります。さらに既存のYouTube Analyticsにはコメント内容の分析機能がなく、一般的なテキスト分析ツールも日本語の議論構造に十分対応していません。こうした状況に対し、StanceScopeはコミュニティの議論構造を素早く把握できる新しいアプローチを提供します。
- 参加形態: チーム
- 参加者・チーム名: StanceScope
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ryuto_yoda/articles/35ab97e16d6c31
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-048 めぐロード!! ～新感覚ルート提案アプリケーション～

- 公式説明: 課題解決のためのソリューション(MEGROAD) 〇「寄り道」ルート提案アプリケーション 従来の「最短経路」のみではなく、その日の気分に合わせた「寄り道」を含むルートを提案するアプリケーション 〇特徴 - 個人の気分を基に「最短距離」ではなく「混雑を避ける寄り道」を提案     - ルートを分散させることで交通量の分散を実現     - ユーザーごとの気分を基にルート提案し、ドライバーの運転体験を向上 〇アピールポイント ・社会課題と個人的体験の同時解決 本アプリを用いることで渋滞に起因する経済損失や環境へ与える影響を軽減するという社会課題の解決と個人の運転体験の向上というマクロな改善とミクロな改善を同時に達成することができます。
- 参加形態: チーム
- 参加者・チーム名: Hack’n’Play
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/td_maru/articles/c48b38dde93e51
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-049 MangaMatic

- 公式説明: MangaMatic は、プロンプトから数分で“完成した4コマ”を作る全自動AIです。脚本・キャラクター・レイアウトまでワンストップで生成し、仕上げは顔・小物・吹き出しなどをパーツ単位で即編集。制作の学習コストと手戻りを削減し、日次の発信やA/Bテストを現実に。アイデアをさっと試し、すぐ出せます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kiyo2023/articles/df077d4cdef34d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-050 すうべに屋

- 公式説明: 出張や旅行の際、誰に何を買うか、お土産選びで悩んだ経験はありませんか？「すうべに屋」は、そんなお土産選びの迷子を救うAIパートナーです 。  ビジネスパーソンなどを主なターゲットとし、贈りたい相手の人数や関係性、過去の履歴を管理できます 。気になったお土産は、商品名や画像だけでAIが詳細情報を補完して登録可能 。  最大の特徴は、AIエージェントによる提案機能です 。ユーザーの条件に基づき、「おすすめ」「相手視点」「想定外の視点」「一般的基準」という4つの役割を担うAIが、登録データやWeb検索を駆使して多角的に最適なお土産を提案 。Google Cloudの技術を活用し、複雑なお土産選びを強力にサポートします 。
- 参加形態: チーム
- 参加者・チーム名: すうべに屋本舗
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/creamypotage/articles/4d9f07310df6d5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-051 もう誕生日プレゼント選びに迷わない！SNSから相手の好みを分析する「birthd.ai (バースデイ)」

- 公式説明: 「birthd.ai」は、誕生日プレゼント選びで最も難しい「相手の好みが分からない」という課題を解決するAIエージェントです。  相手のXアカウントのURLを入力するだけで、AIが投稿から趣味や潜在的なニーズを分析。チャットでの対話を通じて、関係性や予算に応じた最適なプレゼントを提案します。  欲しいものリストとは違い、本人も気づいていない好みまで「発掘」し、「これ欲しかったの、なんで分かったの!?」という最高のサプライズを演出できるのが強みです。プレゼント選びの悩みを、ワクワクする宝探しに変えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tsmiyamoto/articles/cfaf57af30b0df
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-052 「それ、どうします？」一緒に考え、やるべきことの整理してくれるAIパートナー TaskEcho

- 公式説明: TaskEchoは、思いついた瞬間に声で話すだけでAIが内容を理解し、タスクとして構造化・登録する次世代のタスク管理アプリ。文脈から重要度や期限も判断し、優先順位を提案。従来の手入力による煩雑さを排除し、思考の流れを止めずに記録・整理・検索まで完結。多忙なビジネスパーソンやクリエイターの「脳の外部記憶装置」として機能する、対話型パーソナルAIアシスタントです。
- 参加形態: チーム
- 参加者・チーム名: ぷらいおり隊
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kou426/articles/597ff80cf77437
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-053 Yukuri Novel

- 公式説明: 「Yukuri Novel」は、キャラクターの会話形式の物語に特化した、AI時代のウェブ小説プラットフォームです。Googleの最新AI「Gemini」を創作のコアに統合し、キャラクター設定、プロット、本文、挿絵の生成から、AIによる作品評価や高品質な音声読み上げまで、物語が生まれる全工程を強力にサポート。 誰もが手軽に、そして豊かに物語を創造し共有できる、全く新しい創作体験を提供します。
- 参加形態: チーム
- 参加者・チーム名: 人生エクストリームスポーツ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rat_hill01/articles/0eb3e4041ac1c1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-054 AI TRPG Agent

- 公式説明: TRPGの魅力は、参加者全員で協力して物語を創り上げる「共創体験」にありますが、その体験には「GMの高い専門性」と「参加者間のスケジュール調整」、「テキストベースの進行によるとっつきにくさ」という3つの大きなハードルが存在します。  上記のハードルに対して、以下の3つの要素を含むアプリケーションを開発しました。 ①「自律的なAI Agent」 ②「リアルタイム・マルチプレイヤー」 ③「マルチモーダルな体験 これにより、「とっつきにくい初心者」でも、「リアルで仲間とスケジュールの都合がつかないプレイヤー」でも「テキストベースで没入感がなく楽しめないプレイヤー」でも誰でも楽しい共想体験が味わえ、TRPGの発展に繋がると考えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hamutaro_kun/articles/3242fba8ee8d0f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-055 AI未来日記

- 公式説明: 「明日は早起きして勉強しよう」「休日は映画に行こう」と予定を立てても、実際は全然違うことをしてしまう、誰もが経験するこのギャップを、私はAIで楽しみに変えました。予定を入力すると、物語風の“未来日記”とイラストを自動生成。夜には実際の行動を記録し、両者を並べて差分を振り返ることで「ズレ」から学びや気づきを得られます。さらに写真アップロードや7日連続チャレンジ機能で、継続的な日記習慣を支援。予定と現実のすれ違いを、ストレスではなくユーモアと自己理解に変える新しい日記体験を提供します。
- 参加形態: チーム
- 参加者・チーム名: debug_coffee
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/debug_coffee/articles/ai-future-diary-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-056 Artorial

- 公式説明: Artorial は、初心者が「どうやって絵を書けばいいか分からない」「色の混ぜ方が難しい」といった壁を乗り越えられるように、AIを使ってユーザーが絵を描くことを支援するサービスです。好きな画像をアップロードするだけで、Gemini が難易度や配色、描き方のステップを提案。さらに印刷用の下書きや混色アドバイスも生成し、誰でも気軽に作品を完成させられます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yumemi9808/articles/a7b7f2c94f0859
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-057 映画監督になろう

- 公式説明: 画像生成AIと動画生成AIを活用して、脚本や構図、撮影技法の難しいことは全部ワークフローでいい感じにできるだれでも映画監督になれるWebAppです
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fkky/articles/8cca5e5cc864ab
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-058 Career Accord AI

- 公式説明: Career Accord AI は、応募者が将来のキャリアを見直し、自分の「やりたいこと（Will）」を実現できる世界を目指すマッチングサービスです。 応募者は履歴書・職務経歴書・Willを入力し、企業は「やらせたいこと（Mission）」や条件を登録。AI同士が交渉し、合意形成を通じて一次面接を確約します。 従来の職種名や媒体に依存せず、真に価値観と条件が合う企業と出会える体験を提供します。 さらに不足スキルも提示することで、応募者は学び直しや成長の機会を得られ、自己実現に近づくことができます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ux_xu/articles/6eec091279baad
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-059 AIで理想の自分は作れる！ AIメイクアップガイド Ejan

- 公式説明: 「Ejan(いいじゃん)」は、AI生成の理想像と現実のギャップを埋めるAIスタイルガイドです。多くの人々がメイクやヘアスタイルを苦手と感じる課題に対し、顔写真1枚から理想のメイク・ヘアスタイルへの具体的な道筋を可視化。NanoBananaとVeo3を活用し、パーソナライズされた段階的なビジュアルガイドと動画による実践的な説明を自動生成。従来の動画チュートリアルでは平均再生率29.5%という低い完走率の問題を、ステップごとの完成イメージと手順の明確化により解決。「なりたい自分」への変身を、誰もが自分の手で実現できるようサポートします。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takkuhiro/articles/ejan-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-060 Promo Reels- 誰でもセンスあるプロモーション動画を

- 公式説明: 高品質なプロモーション動画を誰もが簡単に作れるツール「Promo Reels」は、動画制作の専門知識がない人でも、AIとのチャットを通じて撮影計画を立てられるサービスです。漠然としたアイデアから具体的なシーン割やカメラワークを導き出し、現実世界では非常に時間がかかるトライアンドエラーの時間を大幅に短縮します。Veo3などを使うことで、現実と見まがうような映像イメージを生成し、動画制作のハードルを下げ、感性豊かな表現をサポートします。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/akiratake/articles/2aa98e02e1d756
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-061 YouTubeLM

- 公式説明: YouTubeのURLを貼り付けるだけで、動画の内容を分析し要点をまとめた視覚的に分かりやすいWebページを自動生成するAIサービス
- 参加形態: チーム
- 参加者・チーム名: 四次元テクノロジー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuntan_t/articles/d0462d7f5c625a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-062 コマンド&amp;AIバディ

- 公式説明: 「言葉」だけでAIを動かす新感覚の脱出ゲーム「コマンド＆AIバディ」は、AIに初めて触れるお子様から大人まで、誰でも直感的に楽しめるAIとの対話体験を提供します。  自然言語でロボットの「バディ」を操作し、密室からの脱出に挑戦。ローカルLLM「Gemma」を搭載しているため、インターネット接続は不要で、快適なプレイが可能です。試行錯誤しながらAIに的確な指示を出す面白さを通じ、AIと共創する未来の可能性を体験してください。
- 参加形態: チーム
- 参加者・チーム名: HT With B
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hanachiru/articles/ddab1de37881e5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-063 高齢者に寄り添い、地域情報を届けるAIボット　ZundaPi（ずんだパイ）

- 公式説明: 日本の深刻な社会課題である、高齢者の「孤独」と「情報格差」。 この問題を、私たちは安価なRaspberry Piで動作するAIパートナー『ZundaPi』で解決します。  ZundaPiは、音声だけで操作できゴミ出しの日や地域のイベントといった生活に不可欠な情報を的確に伝えます。 さらに、お孫さんのような親しみやすい声での対話機能を備え、日々の孤独感を和らげる温かい相棒となります。  Google Cloudを活用したスケーラブルな設計により、低コストでの全国展開も可能。 技術の力で高齢者と社会を繋ぎ直し、ビジネスと社会貢献を両立させる新しい共生社会のモデルを提案します！
- 参加形態: チーム
- 参加者・チーム名: コニーサワー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sawasawadawasa/articles/3e144a0fa28494
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-064 TownReady

- 公式説明: 「TownReady」は、自治会、学校、企業などが長年抱えてきた防災訓練の企画・準備における非効率性と形骸化という根深い課題に対し、Google Cloudの最先端AI技術を活用した解決策を提供するプラットフォームです。 住所、参加者の属性、想定する災害といった基本情報を入力するだけで、わずか10分で地域に特化した実践的な訓練一式を自動生成。これにより、これまで数週間から数ヶ月を要していた準備期間を劇的に短縮し、誰もが質の高い防災訓練を継続的に実施できる社会を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/arin1930/articles/13f2c045d24519
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-065 たすかるごはん

- 公式説明: 「健康や節約のために自炊したいけど、毎日の献立を考えるのは大変…」そんな悩みを抱える忙しいあなたへ。私たちのマルチAI献立提案アプリ「たすかるごはん」が、そのジレンマを解決します。 多くの献立アプリが冷蔵庫の残り物や旬の食材の“どちらか”に注目する中、「たすかるごはん」は市場データと連携し、「今一番おトクで栄養価の高い旬の食材」をAIが自動で選定。その上で、健康志向AIと満足度重視AIが協力し、栄養と「食べたい！」気持ちを両立させた、あなたに最適な一週間分の献立を共同で考案します。もう献立に悩む日々は終わりです。「たすかるごはん」で、無理なく食費を節約しながら、美味しく健康的な毎日を手に入れましょう。
- 参加形態: チーム
- 参加者・チーム名: チームたすかるごはん
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/otasukegohan/articles/f8e857f3de45dd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-066 AI画像匿名化ツール Peacek

- 公式説明: 画像をアップロードするだけで簡単匿名化！SNSに公開する前に個人情報を隠そう！ Peacekは、Google Cloud Run上で動作する画像処理Webアプリケーションで、Vertex AI Imagen APIを使用して人物写真の顔を花束やポストカードで隠す機能を提供します。
- 参加形態: チーム
- 参加者・チーム名: team LN
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rii_n/articles/6d5445c99c4f31
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-067 No More Smoking！ ~今の喫煙習慣を続けると20年後のお前はこうだ~

- 公式説明: 喫煙者に厳しいこのご時世、多くの人が禁煙を望みながらも、意志力だけでは限界があるのが現実です。 私が開発した「No More Smoking!」は、生成AIを活用した革新的な禁煙サポートアプリです。このアプリの最大の特徴は、ユーザーの現在の喫煙習慣と顔写真を分析し、20年後の健康被害を視覚的にリアルに表現することです。単なる文字や数値による警告ではなく、自分自身の未来の姿を目の当たりにすることで、禁煙への強いモチベーションを生み出します。 日本の約1,400万人の喫煙者が潜在的なユーザーとなり、健康増進と医療費削減への社会貢献も期待できます。 未来の自分と向き合い、今こそ変わるときです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/skyryo/articles/14206697a7b571
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-068 「お道具アナライザー」 —— 茶道体験をアップデートするAIエージェントを作ってみた

- 公式説明: 茶道の体験を「知って」「感じて」「残す」へアップデートするAIエージェントアプリを開発しました。スマホをかざすだけで茶道具や設えを認識し、その背景や意味を多言語でリアルタイム解説。写真や会話を保存し、自分だけの“学びのアルバム”として振り返ることも可能です。技術面ではGoogle ADKを用いたマルチエージェント構成とCloud Runを中心としたクラウド基盤を採用。文化体験をより深く、身近にすることを目指しました。
- 参加形態: チーム
- 参加者・チーム名: チーム TeaRoom
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル / マルチエージェント / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sugawara/articles/af4094624b7066
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-069 LocAIver

- 公式説明: 地方自治体では、観光や特産品のPRを目的にSNSを活用した情報発信を求める声が多いものの、人手不足や外注の高コストが障壁となり、「伝えたいのに伝えられない」という課題があります。私たちの開発したLocAIverは、AIを活用し誰でも簡単にSNS特化型の地方PR映像を作成できるサービスです。対話形式で利用者の希望を引き出し、カラー絵コンテで内容を確認・編集したうえで映像を生成します。数万円・数週間を要する外注による映像制作を、わずか数千円・30分以内で実現可能とします。LocAIverは「誰もが手軽に地域の魅力を伝えられる」社会を実現します。
- 参加形態: チーム
- 参加者・チーム名: Akakura
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/akakura16/articles/76c5065276ce2f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-070 Vegitage

- 公式説明: 畑で生まれた、物語を持つ野菜。しかし、その声を伝える術がありませんでした。この経験から『Vegitage』は生まれました。AIが伝統野菜の歴史や個性を「手紙」として執筆し、QRコードがそれを直売所の野菜そのものに結びつけます。消費者はその場で物語を知り、生産者は想いを届けることができる。AIと人の協働で、私たちの食卓と、その背景にある文化を豊かにする挑戦です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/niji2/articles/vegitage0000
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-071 ラクばと！

- 公式説明: 情報過多の時代における「買い物体験の疲弊」を「ラクばと！」で解決します。YouTubeなどのレビュー動画に時間を奪われ、選択に迷う現状に対し、AIがユーザーの価値観を分析し、ゲーム感覚で最適な商品を提案。楽しさと納得感のある買い物体験に変えます。
- 参加形態: チーム
- 参加者・チーム名: ReactCamp inDs
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/anzn0/articles/1de3a00db22101
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-072 らんらんるんるん

- 公式説明: 🏃‍♂️ らんらんるんるん 一緒に走ろう 一人でランニングする孤独感とモチベーション維持の困難を解決するAI応援団アプリです。あなた好みのAI応援団が、あなたのランニング記録に共感し、「一緒に走っていたように」一人称で励ましのメッセージを送ります。 ランニング記録を入力すると、応援団が即座に共感の返信を生成。連続記録バッジや目標管理機能で継続をサポートし、カスタム応援団（最大6人）の追加も可能。Vertex AI Gemini 1.5 FlashとFirebaseを活用したサーバーレスアーキテクチャで、自然な会話体験を実現しています。 孤独なランニングを楽しい体験に変え、継続的な健康習慣を身につけられる革新的なソリューションです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hosazaemoooon/articles/6f55eb1e53bd74
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-073 MonoPon

- 公式説明: 「思い出があるから捨てられない」「価値が分からない」といった片づけの心理的課題をAI技術で解決するモバイルアプリです。 Google  Vision APIで物品を撮影・認識し、Custom Search APIとGemini Pro Visionを組み合わせて商品名と市場価値を判定します。 手放す物品はデジタル思い出として写真とメモで保存し、物理的には手放しても思い出は失わない安心感を提供。ユーザーの心理的負担を軽減するアプローチを実装しました。
- 参加形態: チーム
- 参加者・チーム名: team-nup
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/enumura/articles/f7df0f846cf376
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-074 Smart Meet Agent

- 公式説明: Smart Meeting Agent は、Google Cloud と Vertex AI を活用して会議の流れを自動化するエージェントです。メールから会議ニーズを検出し、参加者のカレンダーをもとに候補時間を提示、一クリックで日程確定や議事録作成まで行います。手間の多い日程調整や会後作業を減らし、効率的なコラボレーションを実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/moose/articles/fc352a7e5744ef
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-075 エルブリ（ElderBridge)

- 公式説明: 日本で急増する電話詐欺は、高齢者など弱い立場の人々を狙い、深刻な社会課題となっています。攻撃者はAIや自動発信システムを駆使して規模を拡大する一方、防御側の手段は追いついていません。ElderBridge（エルブリ）は、このギャップを埋める新しい仕組みです。AIがおばあちゃん役として着信を先に受け、会話を解析し、ときには詐欺師を相手に“時間を稼ぎながら”怪しさを見抜きます。危険なら遮断・記録、安全なら本人へ転送。さらにホワイトリスト／ブラックリストやモニタリング機能を備え、家族や管理者も安心。電話という従来インフラをAIで再発明し、守りをスケールさせることが可能です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dustinli/articles/d988bb7bef8045
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-076 Gemini Baby Monitor

- 公式説明: Gemini Baby Monitor は、赤ちゃんを見守る安心を次のレベルへ引き上げる軽量 Web アプリです。家庭用ネットワークカメラの映像をブラウザでシンプルに確認できるだけでなく、Google Gemini API を活用した AI 画像解析で危険を自動チェック。Docker 構成による HLS / WebRTC 対応でリアルタイム性と拡張性を兼ね備え、スマホからでも安全に利用できます。保護者の“もしも”を未然に防ぐ、次世代のベビーモニターです。
- 参加形態: チーム
- 参加者・チーム名: Maki
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sunwoodailabsii/articles/22d549bc89f6e2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-077 manatasuAI

- 公式説明: manatasuAIは、中学校教員の大きな負担となっている「授業準備・宿題やテスト問題」を生成AIで効率化する教育支援ツールです。教科書や過去の教材PDFをアップロードするだけで、問題・解答・解説を瞬時に自動生成し、PDFや印刷形式で利用できます。これにより、毎日平均2時間以上かかる授業準備時間を約半分に削減し、先生が本来注力すべき授業や生徒指導、自主研修に時間を振り向けられる環境を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kapiha/articles/d1dbff93eb9b5a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-078 One-to-Multi Agent

- 公式説明: One-to-Multi Agent は、発信者のワンソースマルチユースを支援するAIツールです。 1つのソース（動画、音声、テキスト）から、ユーザーごとのプロンプトに合わせて、各SNSに最適化されたコンテンツを自動生成します。 Gemini AIを活用し、YouTube、Xなど6種類のプラットフォームに対応。 Next.js + Hono + PostgreSQLで構築され、Cloud Run上で動作。 従来数時間かかっていた作業を数分に短縮し、全ての発信者の効率的なワンソースマルチユースを支援します。
- 参加形態: チーム
- 参加者・チーム名: 筋肉で伸ばすアルゴリズム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hirosuke0520/articles/316adf517f8370
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-079 Agent Canvas

- 公式説明: こちらはGUIで直感的にAIエージェントの連携（A2A）を設計できるノーコード・プラットフォームです。分析役、レビュー役など、役割の違うAIエージェントを組み合わせ、独自の自動化ワークフローを自由に構築。プロンプトだけでなくPythonコードも実行でき、ファイルアップロードによるデータ連携も簡単です。GCPとLangGraphを基盤に、複雑な実装を肩代わり。開発者はアイデアの実現そのものに集中でき、生産性を最大化します。
- 参加形態: チーム
- 参加者・チーム名: critical thinking crew
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kc7525/articles/0af9ae781e0120
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-080 Smart Chore App - 共働き家庭を救うAIエージェント

- 公式説明: 共働き家庭の深刻な課題—女性の家事時間は男性の3.4倍、家事分担が原因の夫婦喧嘩は週3回。Smart Chore AppはAIエージェントが家族の特性・スケジュール・好みを学習し、最適な家事分担を自動提案するアプリです。従来アプリとの差別化ポイントは「人間が決めない」こと。意思決定疲れを根本解決し、公平性を数値化して見える化します。Firebase + Google App Engineで構築、リアルタイム同期を実現。共働き家庭の「時間貧困」を解消するAIソリューションです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tenyyprn/articles/9965fd0b8f144a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-081 もしもでんわ

- 公式説明: 「もしもでんわ」は、誰もが心に浮かべる“もしも”を簡単に動画化できるアプリです。スマホに向かって「もしも猫が世界を支配していたら」と話すだけで、AIがストーリーを組み立て、音声と映像を自動生成。複雑な編集や高価な機材は不要、数秒であなたの空想が形になります。想像力はあるけれど表現の手段がなかった人、創作を始めたいけれど技術に不安がある人に最適です。子供から大人まで、誰もが気軽に“もしも”を共有できる創作の民主化を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kdoai/articles/b3cb679ccf0d92
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-082 添削AI 言の葉

- 公式説明: 私が制作したアプリケーションは、端的に言えば、&quot;手書き答案の添削をAIがアシストしてくれるアプリケーション&quot;です。  答案における「よい考え方」や「誤りの原因」を丁寧にフィードバックすることで、生徒の「長所」と、「つまずきポイント」が明確化され、復習がしやすくなります。それにより、学習のPDCAが自然と回っていきます。  一方で、テストの評価ではそのほとんどがただの採点に留まっているのが現状です。 これを添削という形にすることで、生徒の思考力の増強につながっていきます。  採点に留めざるを得ない原因の一つとして、現実に教員の平均残業時間は月88時間を超えており、採点から添削に移行するためには工数不足という非常に大きな壁が存在します。  そのため今回はAIを用いることで、答案の添削にかかってしまう時間と労力の削減に挑戦しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 優秀賞
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 復習したい生徒と面倒を見てあげたい先生の想いを叶える　「添削AI 言の葉」
- 記事URL（文字列保存）: https://zenn.dev/mugi007/articles/cf764e26f3adeb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Gemini API
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V3-083 Edibuddy

- 公式説明: Edibuddyは、食材をキャラクター化して「友達」のように感じながら冷蔵庫を管理できるアプリです。賞味期限に応じて表情が変わる食材たちが、楽しく消費を促してくれます。さらにAIが冷蔵庫の中身から最適な献立を提案し、期限の近い食材を無駄なく活用。義務感ではなく楽しさや愛着をきっかけに、家庭から自然に食品ロス削減を実現します。
- 参加形態: チーム
- 参加者・チーム名: F06
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/moyarzabalstake/articles/d102dde6403bc9
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-084 WIND

- 公式説明: 災害時、膨大な情報に混乱し、「自分は大丈夫」と過小評価してしまう——これが命を危険にさらす現実です。 私たちが開発するWIND（What I Need to Do）は、マルチAI Agentが連携する災害情報システムです。各種メディアやSNSから情報を自動収集・要約し、ユーザーの位置や個人情報に基づいて「あなたに本当に必要な情報」だけを提供します。 「あなたの自宅は震度5弱が予想されます」「通勤経路で運行停止の可能性があります」といった具体的で客観的な影響予測により、正常性バイアスを排除し、適切な行動判断を支援、情報過多による混乱と不安を解消します。 南海トラフ地震の発生確率80％、異常気象の激化——災害常態化時代に、AI技術で一人でも多くの命を救いたい。それがWINDの使命です。
- 参加形態: チーム
- 参加者・チーム名: シェアラボAI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/acntechjp/articles/bd1b64b9f13c6d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-085 EnQuest

- 公式説明: EnQuestは、社内イベントの「気まずい沈黙」をAIで最高の出会いに変える交流促進アプリです。 イベントの中で「話すきっかけがない」「いつも同じ人と固まる」という課題があります。EnQuestは、Vertex AI (Gemini)を活用し、参加者同士がQRコードを交換するだけで、その二人のための会話テーマを自動生成。さらに、個人のプロフィールに合わせたパーソナライズされたビンゴミッションを通じて、ゲーム感覚で部署や役職を超えた偶発的な交流を促します。  これにより、参加者全員が主役となり、イベントを一過性のものから、継続的な組織活性化へと繋げます。AIの力で、すべての出会いを「冒険」に変える、それがEnQuestです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/7subasa/articles/c18676695eebbc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-086 フードスナップ

- 公式説明: 現代人は忙しく、健康管理は後回しになりがちです。特に、毎日の食事管理は手間がかかり、挫折する人が少なくありません。  今回のプロジェクトは、AI健康管理アプリ「FoodSnap」。食事の写真をアップだけで、AIが自動でカロリーや栄養バランスを分析。あなたの健康目標に合わせたアドバイスを毎日お届けします。  手入力は一切不要。「写真をアップ」というシンプルなアクションが、無理なく継続的な健康管理につながります。まるで専属の栄養士がいつもそばにいるかのように、あなたの健康を楽しく、確実にサポートします。  「FoodSnap」で、すべての人が食事を通して、より健康的で充実した生活を送ることを目指します。健康指導さようなら！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pirozhok/articles/af1bab8d09949b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-087 BlueBird ～アノヒトの青い鳥～

- 公式説明: 『BlueBird』は、ユーザー専属AIの青い鳥に日々の出来事を預けると、鳥たちが「さえずり」としてタイムラインを彩る癒し系AI SNSです。青い鳥は寄り添うように日記を要約し、スズメや鷹はおしゃべりや情報収集で世界観を広げます。さらに、匿名要約を交換する「森」で間接的な共感を得られ、投稿内容に応じた「オソナエモノ」が提案される仕組みも搭載。SNS疲れに悩む人へ、AIの安心感とゆるやかなつながりを届けます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/emuco/articles/d0215d1803193c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-088 Hey-ya

- 公式説明: hey-yaはあなたに寄り添うマルチエージェントAIコーチングアプリです。Google Cloud Agent Development Kitの機能を活用し、ユーザーの目標やメモやプロフィール、タスクを考慮したパーソナライズドされたコーチング、長期的かつ多角的なコーチングを実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ynishino/articles/2f46fa718bcaa7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-089 Persona Interview

- 公式説明: ユーザーインタビューをAIでオンライン完結できるサービスを作りました。 6人の専門家と、4人のユーザー目線、合計10人のAIペルソナにインタビューできます。 彼らはAIエージェントで構築されており、それぞれエージェントには、経験があり、黒歴史もあり、最近の趣味など、、現実の人をリアルに再現したペルソナです。 グループインタビューの機能ではAIエージェント同士で会話しながら回答するので人間らしい回答が得られます。一斉インタビューで10名にまとめて聞くことも、個別に会話することもできます。 従来の調査に係る工数を大幅に削減し、企画や新機能・アイデアをブラッシュアップするために活用できます！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yana22/articles/774cd36db27f5d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-090 Knowledge Hub

- 公式説明: 私たちのチームはベクトルデータベースに保存された情報をRAGベースのAIチャットアプリ、「Knowledge Hub」を開発しました。  主な機能は情報を新規登録・更新・削除をするインタフェース、 RAGを搭載したチャットアプリで情報を検索するインタフェースの2つになります。  またログイン機能も実装しており、社内で使うアプリケーションを想定しているため、従業員用のアカウントを作るAdmin用ログイン、従業員用ログインと2つに分けました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tsunemori/articles/7d7be4c542c8a8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-091 lazy-bear

- 公式説明: 資格の勉強、「計画倒れ」で諦めていませんか？lazy-bearは、そんな悩みを解決するAI学習プランナーです。取得したい資格と学習期間を入力するだけで、AIがあなたに最適な学習ステップとタスクを自動で生成し、ガントチャートで可視化します。もう「何から始めるか」で悩む必要はありません。AIが常にあなたの学習進捗を見守り、計画を最適化する未来を目指します。lazy-bearで、賢く、効率的な学習を始めましょう。
- 参加形態: チーム
- 参加者・チーム名: lazy-bear
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shiseitech/articles/ab93721a833fb7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-092 RevuRal

- 公式説明: 生成AIはアウトプットを加速させましたが、その裏で「レビュー疲れ」が深刻化し、意思決定を遅らせています。私たちの『RevuRal』は、必要な時にいつでも呼び出せる、あなたのための“専門家AIチーム”です。多角的な視点から課題を瞬時に洗い出し、対話で論点を深めることで、チームが自信を持って前に進むための、新しい形の知的生産を支援します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/zerebom/articles/0e18d93ca870cf
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-093 EkiPick

- 公式説明: 私たちは、上京や転勤を検討する人々が抱える「住む場所が分からない」という課題を解決するため、通勤時間・家賃・生活利便性を考慮して最適な駅を推薦するAI Agentを開発しました！ GCPの各種サービスを活用し、会話形式で候補駅の提案や周辺情報を提示。ピン止めやサマリー機能を備え、直感的かつ効率的に住居選びを支援します。関西からリモート勤務中の私たち自身の課題感を出発点に、学生や転勤者にも役立つ実用的なサービスを目指しています。
- 参加形態: チーム
- 参加者・チーム名: EkiPick
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tonoyama/articles/a2db07ddb7c7f5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-094 Gehon

- 公式説明: Gehonは、名前と題材を入れるだけで、昔話風・水彩タッチの10ページ絵本を自動生成するNext.jsアプリです。Geminiで本文、Gemini/Imagen/Vertexのマルチエンジンでイラストを生成し、GCSに保存。Cloud Runで運用しページ遷移ごとにAIエージェントのオーケストレーションで前画像を参照し一貫性を維持、3候補からの自動選択で品質を担保します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yukilab/articles/e9b16e0cf5a41c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-095 AIスタイリスト

- 公式説明: 自分らしさを表現したい、でもどうすればいいかわからない。「AIスタイリスト」は、この課題を根本から解決します。単なるパーソナルカラー診断を超えて、「なりたい自分」への変身体験を提供するアプリケーションです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mahiguch/articles/c4d732e173e66c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-096 Gemini実装ナビ

- 公式説明: アイデアを形にしたいのに、難易度や相場がわからない――。Gemini実装ナビは、要件テキストを解析し、機能カテゴリごとの難易度・工数・費用感を★で直感表示するツールです。非エンジニアでも開発可否の判断や、外注・学習の選択がすぐに可能に。今後は「必要な知識」「学ぶ順番」「学習タスク」を自動生成し、誰もが一歩ずつスキルを積み上げて自作できる未来をめざします。Gemini APIとCloud Runで実装。
- 参加形態: チーム
- 参加者・チーム名: Michishiru
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/michishiru_ai/articles/9fc3302bef389a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-097 AI Decision Support

- 公式説明: 「意思決定、マジで難しい…」「会議、長引くし、言ってることバラバラだし…」 そんな悩みを抱えるあなたに朗報です！今回我々が開発したのは、なんと **「AIアドバイザー軍団」** を仮想会議室に召喚し、人間だけでは気づけなかった盲点や、爆速での意思決定をサポートするシステムです！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/articles/11691d0ebbd42a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-098 カルチャー

- 公式説明: こんにちは。チームカルチャーです。  私たちは情報過多の時代に、効率的に自分好みの記事を見つけられるニュースアプリを開発しました。  特徴は以下の通りです： ・ティールをテーマカラーとしたシンプルなUI ・AIエージェント「黒猫さん」がユーザーに合わせたニュース記事を提案 ・利用するほど学習し、よりパーソナライズされた情報を提供  情報収集の疲れを軽減し、自分に関連性の高いニュースだけをお届けします。
- 参加形態: チーム
- 参加者・チーム名: カルチャー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/006613/articles/838f73cf06db78
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-099 What If AI Visualizer

- 公式説明: 私たちは、イノベーションは誰もが持つ小さなアイデアから生まれると信じています。子供の頃から私たちは想像し続けています。今、私たちはその想像を現実のビジュアルに変換したいと考えました。  「What If AI Visualizer」は、Google Cloud上で動作するAI駆動の画像・動画生成プラットフォームです。「もし猫が空を飛べたら？」「もし椅子が掃除ロボットの下で浮遊できたら？」といった短いフレーズから、誰でも簡単に自分のアイデアを視覚化できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/daydreamer/articles/2798ac84e28df5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-100 Picca

- 公式説明: Piccaは、顔や映像で人を判断しない「動きだけの評価基盤」です。ブラウザで抽出した骨格キーポイントをCloud Runに送り、約1秒で総合＋左右差・出力・一貫性を返却。画像/動画は長期保存せず、東京リージョン運用・一時データは24時間で自動削除。短い助言文で次の一手を示し、将来は特定職種の適性確認や安全指導を支えるHRアシスタントにも展開を見据えています。動作をより細かな信号に分解し、あらゆる拡張が可能な設計です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/udonburo/articles/e606e6cd895aad
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-101 AIコーディネーター

- 公式説明: 本アプリは、人物写真からAIが自然なフルボディ画像を生成し、選んだ服をリアルに着せ替えることで、まるで試着したかのようなコーディネートを体験できるサービスです。ネットショッピングでの購入前に自分に似合うかを確認でき、失敗の少ない買い物をサポートします。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/k_sasaking/articles/e5475a39e5c8b7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-102 Knowledge Gym

- 公式説明: 「Knowledge Gym」は、SNS依存を断ち切りつつ知的好奇心を広げるための Chrome 拡張+webアプリです。SNSを開く前にランダムに提示される記事や動画を5分以上読み、要点と感想文を書いてAI採点で合格しないとSNSを利用できません。採点は要約一致度・論理展開など5指標で評価され、結果はダッシュボードで分野バランスや弱点として可視化されます。短期間でMVPを開発し、「読書感想文」を大人向けに再解釈した本プロジェクトは、習慣形成と学習効果を同時に実現する新しい知識ジムです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/water3/articles/80765d354b8978
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-103 フリージャ

- 公式説明: 専門知識ゼロからでも、誰もがオリジナル商品を企画・販売できるAIアシスタント。アイデアを入力するだけで、AIが商品コンセプト、2段階の料金プラン、LPを自動生成する。自動化に特化し、外部サービス連携によって「最速で商品を形にする」ことを実現。これにより、ユーザーは商品を量産し、従来の数倍の速度で販売、講座ビジネス等で大きな収益を目指せる。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ryyyo/articles/55dfa6c5ec3240
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-104 TaleZine

- 公式説明: 生成AIの進化により文章作成は容易になりましたが、その一方で「自分の言葉で考え抜く力＝言語的思考力」が弱まる懸念があります。TaleZineは、この課題に対して「自分だけの本を作る体験」を通じて解決を目指します。写真や短文をZINE（自由な小冊子）にまとめるだけでAIが短編小説へと昇華。さらにAI作家との対話的な推敲を繰り返すことで、“読む→直す→また読む”という言語活動の循環を自然に引き出します。子どもから大人まで、楽しく本づくりをしながら言語力を伸ばせる学習・創作の新しい形を実現します。
- 参加形態: チーム
- 参加者・チーム名: TaleZine
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/gaju/articles/a84fc6ce0b6f61
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-105 Trypedia

- 公式説明: 「いつもの休日に物足りなさを感じていませんか？」 そんな悩みを解決するのが、魅力的な体験と“偶然”出会えるアプリ『Trypedia』です。 何が出るかお楽しみの「おまかせガチャ」で、予想もしなかったワクワクを発見。タグを使った「簡単検索」で、あなたの興味にぴったりの体験を効率的に探せます。さらに、面白かった体験を投稿・記録することで、次の誰かのワクワクに繋げることもできます。 ありふれた日常に、新しい発見と感動を。さあ、Trypediaであなただけの特別な体験を探す旅に出かけませんか？
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/bellvine/articles/5b5d3872d33496
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-106 Novel2Manga

- 公式説明: テキストで書かれた小説を自動的にマンガ形式に変換します。自分で書いた小説や記事をマンガとしてイメージできるようにしたり、著作権の消失した古典を漫画形式に再解釈することができるようになります。外国語や明治時代の文語も現代日本語口語に翻訳するので、とても読みやすくなります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/matsu/articles/f446cac346e262
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-107 Veyoo AI

- 公式説明: AIがつくる未来のキャリア体験シミュレーター
- 参加形態: チーム
- 参加者・チーム名: Veyoo AI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mungunshagai/articles/f9860783d71873
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V3-108 運動支援AIエージェント AIthlete

- 公式説明: 「AIthlete」は、運動フォーム分析のAIエージェントです。部活動や個人トレーニングで専門指導者がいない環境でも、ユーザーが撮影した運動動画をアップロードするだけで、AIがプロ選手のフォームと比較し、3Dボーンデータとして可視化します。VideoPose3Dによる高精度な動作解析とGeminiによる具体的改善アドバイスにより、「膝の曲げ方が浅い」「腕の振りが足りない」など個別課題を明確化。従来は専門家が必要だったフォーム分析を誰でも手軽に受けられるようにすることで、運動初心者から上級者まで安全かつ効率的な技術向上を支援し、スポーツを楽しむ人の増加を目指します。
- 参加形態: チーム
- 参加者・チーム名: 3Dポージング
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/forest_tech/articles/5240bac7bfefa0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol3?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-001 喋って使えるAIデバイス

- 公式説明: 喋って使えるAIデバイスは、ハードウェアとGoogle Gemini Live APIを組み合わせたネックレス型の音声AIアシスタントです。全世界の人がAIを日常的に使う未来に向けて、プロダクトを開発しました。声だけでメッセージの送信、カメラを使って現実世界の把握、ライフログで人生の記録。撮影した写真はCloud Functionsが自動でGemini Visionで分析し、後から振り返ることもできます。AIの時代にはAIデバイスが必要でその未来を形作りました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / リアルタイム / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hotaka0908/articles/862f43628bc0f0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-002 MAP Grammar

- 公式説明: English Visualizerは、英文リストから統一感のある画像をAIで一括生成する、教育コンテンツ制作に特化したツールです。 Google Gemini APIを活用し、フラッシュカードや教材に最適な高品質イラストを効率的に作成。最大の特徴は、画風をプロンプトで細かく指定し、全ての画像に一貫性を持たせられる点です。CSVアップロード、自動リトライ機能、ZIP形式での一括出力など、大量のデータ処理を前提とした実用的な設計が魅力です。 IndexedDBによるローカル保存や検索・フィルタ機能も完備し、作業の継続性も抜群。AIの力で、視覚的な英語学習体験を劇的に進化させ、教材制作の時間を大幅に短縮します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tcool/articles/460a4b46b83f5d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-003 Agentic Traffic Market

- 公式説明: AIエージェントが交差点で通行権を自律交渉し、マイクロペイメントで合意形成する「Agentic Traffic Market」を開発。Gemini 3（Vertex AI）とVercel AI SDKで判断・交渉を行い、EIP‑7702で鍵を渡さず安全に決済を実行。JPYCの利用で即時に少額決済を実現。自動運転が当たり前の未来の交通のあり方の提案です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 奨励賞
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / リアルタイム
- 記事タイトル: 自動運転が当たり前の未来の交通を考える ~AIエージェント×ステーブルコイン決済~
- 記事URL（文字列保存）: https://zenn.dev/mameta29/articles/325569b451b2a0
- GitHub URL: https://github.com/Mameta29/Agentic-Traffic-Market
- デモURL: https://agentic-traffic-market-jgdosuuqxa-uc.a.run.app/agent
- 明示技術: Cloud Run / Vertex AI
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-004 よやくらく

- 公式説明: 医療機関や美容サロン向けAI予約チャットボット「よやくらく」は、現場の予約対応負担を劇的に解消します。多くの施設が施術中の電話中断や営業時間外の予約取りこぼしに悩んでいますが、本サービスはAIが24時間365日、会話形式で自動受付・FAQ対応を行います。予約情報はGoogleスプレッドシートにリアルタイム記録されるため、誰でも簡単に管理可能です。導入により電話対応を最大80%削減、来院数を20〜30%向上させ、年間250万円以上の人件費削減を実現します。コード1行で設置でき、最短10日で運用を開始できる業務効率化の決定版です
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/boy6/articles/243de99e608151
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-005 Ask Kamos - それちょっとKamosに聞いてみよう！

- 公式説明: Ask Kamosは、Google GeminiとKamos（加藤康祐の思考の道具）がマトリクス分析を介して問いに対する答えの往還を行い、思考を醸成するためのWebアプリです。AIの利用には効率やスピードが求められますが、人間に必要なのは時間をかけ丁寧に考えることです。FirebaseとKamos Framework APIを活用することで、マルチエージェントなAI間の対話を実現しています。Ask KamosはGenerative Thinking（醸成思考）のプロトタイプでありプレゼンテーションです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kosukekato/articles/7651c76569306e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-006 Shadow Director

- 公式説明: 「説明するのが面倒で、結局自分でやる」——そんなNPO現場の悲鳴に応えるため、Gemini 3.0を搭載した完全自律型エージェント『Shadow Director』を開発しました。 特徴は、Playwrightと連携した独自の「SGNAモデル」によるWeb深層探索と、Thinking Modeを駆使した「自己批判ループ」です。ユーザーの入力を待たずに助成金を見つけ、勝率を予測し、AI同士の敵対的議論（Adversarial Loop）を経て申請書を磨き上げます。Google Antigravity環境で鍛えられたこの「デジタル参謀」は、単なる代筆を超え、ソーシャルイノベーターの魂を継承して自律的に活動します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tigurt/articles/81dd42b0513f3c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-007 Time Defender

- 公式説明: Time Defender は、Google Calendar と連携し、ダブルブッキングや過密スケジュールからユーザーを守る「Anti-DoubleBooking AI Secretary」です。既存のAIアシスタントが「Yesマン」として何でも受け入れてしまう問題に対し、移動時間や認知負荷を考慮し、あえて警告を出す「門番」として機能します。Vertex AI（Gemini 2.0 Flash）とCloud Runを活用し、自然言語で入力された予定を解析、前後の文脈を踏まえてリスクを可視化し、代替案を提示します。Human-in-the-Loop設計により、最終判断は人間に委ね、AIに使われるのではなく、AIを盾にして自分の時間を守る新しいアプローチを実現しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toki_mwc/articles/000ed53dc988a2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-008 ローカルMaster

- 公式説明: オーバーツーリズム問題の一因である、観光地における「選択の偏り」に着目しました。良い店が他にもあるにもかかわらず、一部の有名店に人が集中してしまう構造です。ローカルMasterは、この偏りを選択の段階から変える体験型グルメ探索アプリです。評価点数やランキングで正解を決めるのではなく、12人の専門AIエージェントがレビューやWeb上の体験談を多角的に分析し、ユーザーの志向に合った複数の選択肢と理由を提示します。人が分散して選べる状態を作ることで、観光体験の質向上と地域価値の再発見を目指します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/verlaine/articles/0855695b65ecdc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-009 NoteAlchemist

- 公式説明: 「NoteAlchemist」は、Google Gemini 2.5 Flashを活用した自律型Note記事作成支援ツールです。ユーザーがテーマを入力すると、エージェント「Trend Hunter」がBrave Search APIを用いて最新トレンドを調査し、読者の悩みを特定します。続いて「The Editor」が攻略ノウハウに基づき、無料・有料エリアを分けた戦略的な記事構成案を作成します。最終的にMarkdown形式の記事本文と、内容に即した画像生成用プロンプトを自動生成し、Note運営をワンストップで効率化します。技術スタックにはPython、Flask、Vertex AIを採用しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/myapp/articles/5ee5da7b60c350
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-010 会議から日本の組織文化に変革を～Meeting Mind～

- 公式説明: Meeting Mindは、会議を通じて日本の組織文化を変革するAI会議ファシリテーションツールです。会議中、AIが意図的に反対意見を出すことで多様性と心理的安全性を組織に根付かせます。Gemini APIにより会議テーマを検出、議論されていない視点を提案、マインドマップで意見を可視化します。ドラッカーが紹介したGMの事例のように、異なる意見を歓迎する文化が、より良い意思決定を生み出します。組織全体の意思決定の質が向上し、成果も組織文化も向上することが期待されます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/forthvalleyst/articles/473665cef04cff
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-011 あるく🚶パラレル

- 公式説明: 皆さんは散歩をするときにナビやAIを使いますでしょうか？ 最適化が進むほど、寄り道や迷いをノイズとして排除し、余白が除かれた一方向へ誘導されがちです。 しかし散歩は、選びながら感じる過程にこそ価値があるのでは無いのでしょうか？ 「あるく:walking:パラレル」はAIを指示者ではなく“もう一人の自分”として並走させる実験的プロダクトです。 AIはユーザーと異なる実際の道を自律的に散策し、「もし歩いていたら？」を提案してくれます。行くも行かないもあなた次第。 最適化社会に対する「非介入型Agentic AI」という提案を是非このアプリで体験してみてください！
- 参加形態: チーム
- 参加者・チーム名: ｺｯｶﾗｯｽ🥹
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/i_icc/articles/2a1107e5fabab5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-012 ResonaCanvas

- 公式説明: 言葉はいりません。直感で並べて、共鳴させるだけ。 「ResonaCanvas」は、画像の配置とサイズだけで生成をコントロールするプロンプトを書かない画像生成ツールです。 「プロンプトを書くのが面倒」というクリエイターの課題に対し、「配置＝意図」として解釈させるアプローチをとりました。 直感的なGUI操作で画像をコラージュのように並べるだけで、画像を生成できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/uchiyanma/articles/6251533539c193
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-013 Foody Note

- 公式説明: 「私のお腹、何に弱いんだろう？」──原因不明の腹痛やIBS傾向に悩みつつも、病院でその傾向をうまく説明できない。そんな“見えない不調”と“伝わらないもどかしさ”を解決するため「Foody Note」は生まれました。 日々の食事と体調を記録し、AIが相関を分析することで、自分でも気づかない「不調のトリガー」を可視化します。 さらにAIエージェントが医学的知見に基づき、あなただけの傾向と対策をレポート化。客観的なデータで医師との対話を支え、不安のない食生活を取り戻す一歩を後押しします。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hal1986/articles/20260203-hackathon-v4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-014 TierSpectrum

- 公式説明: TierSpectrumは、ティアリストを「説明できる意思決定」に変えるAIエージェント搭載の共同編集ツールです。従来の「なんとなく」の配置から脱却し、数値スコアと論理的な理由付けに基づいた納得感のあるランキングを作成できます。 ADKを活用し、AIが文脈を理解してドラフト作成、バランス調整、理由の記述を自律的にサポートします。Firestoreによるリアルタイム同期と直感的なUIにより、ゲームのキャラランクからタスク整理まで、あらゆる比較検討をロジカルに行えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/numekudi/articles/a6b9ba37fb01f8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-015 Art coachIng

- 公式説明: 「Art coachIng」は、独学で絵を学ぶ人の「客観的な評価が欲しいけれど、人に見せるのは恥ずかしい」という悩みに寄り添うAIデッサンコーチです。 Gemini搭載のエージェントが、あなたのデッサンをプロ視点で分析。単なる採点にとどまらず、「Memory Bank」で過去の課題を記憶し、前回の自分と比較して成長を評価します。最大の特徴は視覚的な指導です。「Agentic Vision」が修正箇所を画像に直接書き込み、さらにあなたのタッチを活かした「お手本画像」を生成して、具体的な「次の一歩」を提示します。 論理的な解説と視覚的なお手本で、あなたの創作活動を伴走します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nuance/articles/bed956f867e4a4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-016 NewsScope Daily

- 公式説明: NewsScope Dailyは、世界各地の出来事を俯瞰的に整理し、日々の流れとして届ける情報プロジェクト。 公開中のWEB版では、国際ニュースを独自の視点で収集・再構成し、背景や関連性を意識したダイジェストとして掲載。 新たに開発が進むアプリ版では、記事の一覧性と読みやすさを重視し、利用者が短時間で世界の動きを把握できる閲覧体験を目指す。 速報性だけでなく、社会や経済の潮流を静かに観測する“朝刊”のような役割を担うことを狙う。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pla/articles/ee6f116b3095c8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-017 Agentic Architecture

- 公式説明: 本プロジェクトは、自然言語で記述された業務手順を、実行可能な構造化タスクへ変換する Agentic Architecture を提案・実装したものです。 Reader / Planner / Validator / Generator の4段階に役割を分離し、曖昧な業務指示を検証可能な JSON として生成します。 Cloud Run と Vertex AI を用いたサーバーレス構成により、業務定義の再利用性・検証性・拡張性を確保。 「AIに考えさせる」だけでなく、「業務として安全に使える」ことを重視した、実運用志向のAI活用モデルです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kazu_watanabe/articles/b357d68d667bb7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-018 Cross Industry RAG Template

- 公式説明: 業界を問わず再利用できる「実運用向けRAG（検索拡張生成）テンプレ」をCloud Run上に最小構成で実装しました。単なるサンプルではなく、回答生成・検索・評価（ハルシネーション検知）を分離した実務志向のアーキテクチャを提供し、企業がRAGを素早く導入・運用・改善できる土台を目指しています。さらにGemini APIの生回答とRAG回答を並列比較できるUIを備え、RAGの価値を実践的に検証できる点が特徴です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ugkd/articles/4db80bc977c2b5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-019 iDev Tango

- 公式説明: iDev Tango — Gemini × Firebase AI Logic で作る、エンジニア向け AI 単語帳 iDev Tango は、Firebase AI Logic と Gemini 2.5 Flash-Lite を組み合わせたiOSエンジニア向け AI 単語帳アプリです。 Mobile / iOS / Swift / SwiftUI などの技術用語を、AI が簡潔な定義に変換し、フラッシュカードで学習できます。 単語入力と「意味を確認」タップでクラウド AI が定義を生成。Firebase App Check で API を保護し、 GitHub 用語集との同期や理解度に応じた復習など、実務で使える学習体験を提供します。 自分の興味のあることがiOSアプリ開発なのでアプリ開発に特化していますが、それぞれのユーザーの学習したいことの単語帳を作成できます（資格や英単語など） またAIエージェントですが一回の生成当たり約 0.005円しかかからないのでコストの面でも優れいています。 一般消費者（エンジニア・学習者）向けの体験提供型プロジェクトです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/perksh/articles/9b71d5eb2bf1f5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-020 日本語パートナーは

- 公式説明: 日本語パートナーは、Google Cloud AIをベースとした自己学習型日本語学習エージェントです。実際の会話練習、インテリジェントな分析、パーソナライズされたレコメンデーションを通じて、外国人学習者の日本語会話スキルを効率的に向上させます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/liushengli/articles/8112bd6040b639
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-021 concept fit

- 公式説明: 推しの雰囲気を日常に取り入れる「概念コーデ」。憧れるけど、言語化やアイテム選びのセンスがなくて諦めていませんか？ 「Concept Fit」は、Gemini 2.5 FlashとImagenを駆使した、推し活特化型AIスタイリストです。キャラクターの性格や世界観を入力するだけで、AIがその「概念」をファッションとして再解釈し、具体的な着用イメージまで可視化します。 さらに、生成したコーデはSNS機能で共有・検索が可能。「好き」を形にするハードルをテクノロジーで下げ、誰もが日常で推しを感じられる新しい体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toroochi/articles/39f1e07b480dc2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-022 proof of trust

- 公式説明: 和牛・日本酒・工芸品といった日本の一次産業の課題であるキャッシュフロー問題をマイルストーンを完了するたびにJPYCを自動送金する分散型マーケットプレイスdAppです。購入したNFTはトレーサビリティの証明にもなる。面倒な売買はAIによる自然言語で購入承認までを可能にしました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/usagi26/articles/9e5e89aafe9451
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-023 Typecast

- 公式説明: TYPECASTは、MBTIの心理機能（Ti、Ne、Ni、Teなど）に基づいて映画を推薦するAIサービスです。「泣ける」「元気が出る」といった曖昧な感情タグではなく、「なぜあなたのタイプにこの映画が合うのか」をGemini AIが論理的に説明します。現在の気分をテキストで入力すると感情スコア化され、過去の推薦履歴と組み合わせて重複のない3本の映画を提案。日本で視聴可能なストリーミングサービスへのリンクも表示します。Go + React + Firebaseで構築され、Cloud Runでホスティング。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nihiru/articles/b6145f9d3d4e9a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-024 NotebookLM Talk

- 公式説明: NotebookLM Talk は、NotebookLM のチャット画面に音声入力、読み上げ（TTS）、さらに翻訳機能を追加する Chrome 拡張機能です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tcool/articles/48a2404670cfc1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-025 oshi-pitch

- 公式説明: OshiPitchは、Vtuberの名前を入力するだけで「布教用プレゼン資料」を自動生成するWebアプリです 友達に推しを布教したいけど、何から説明すればいいかわからない。そんな時に、AIが推しの魅力を整理して、Webページ形式で出力します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/siesta0905/articles/66e466d9bf6e96
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-026 ShareSeed

- 公式説明: 特別支援学校の現場では、生徒一人ひとりに合わせた授業づくりが求められますが、その準備負担は非常に重いのが現状です。私自身、昨年まで教員として教壇に立つ中で、一人でゼロから指導案を作成する大変さを痛感してきました。 こうした課題を解決するために開発したのが、指導案作成支援AIエージェント『ShareSeed』です。教員の相談内容に対し、AIが専門的な視点から助言を行い、授業の「たたき台」を提示します。 ゼロから考える負担を減らし、先生が自信を持って授業に臨めるようサポートすること。現場を経験したエンジニアとして、実用的なツールで事務時間を短縮し、先生が子どもと向き合う時間を創出したいと考えています。
- 参加形態: チーム
- 参加者・チーム名: 新米さん
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakjr_0118/articles/e0b40e43135ec8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-027 Fieldwork Supporter

- 公式説明: 私たちの生活を支える重要な知見の多くはフィールド調査から得られています。しかし、実際に現地へ行くまでは、調査対象が「どこ」にあるのか分からない場合も多く、時間や調査コストの増加につながる要因となっています。Fieldwork Supporter は、Google Street View 画像を取得・解析し、ユーザーが指定した対象を探索・可視化することで、フィールド調査の事前準備における情報収集と意思決定を支援する AI エージェントです。柔軟な入力と汎用性の高い出力を通じて、従来の課題特化型サービスでは対応が難しかった、多様でニッチなフィールド調査を支援することを目指しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/elle_woods_pen/articles/6a139083bf21e2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-028 AIOPRESS

- 公式説明: ブランドのDNA（ミッション、ビジョン、トーン&amp;マナー、カラーパレット）などを一度登録すれば、そのブランドらしさを保ったクリエイティブをワンクリックで生成できるプラットフォーム。GeminiとImagenを活用し、キャッチコピー、SNS投稿、ブログ記事、画像、プレゼン資料をまとめて出力します。ReActパターンのAIエージェントも搭載しており、指示ひとつで生成から評価、改善まで自律的にこなします。デザイナーを雇えない中小企業やスタートアップでも、ブランドの一貫性を崩さずクリエイティブを量産できます。
- 参加形態: チーム
- 参加者・チーム名: AIO総研
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/aiosoken/articles/aiopress-brand-ai-creative-platform
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-029 ショッピング・コロシアム

- 公式説明: ショッピング・コロシアムは、買い物の意思決定に悩むユーザーを支援するアプリです。論理派・コスパ重視・デザイン重視など10種類の個性を持つAIエージェントから議論相手を選び、ターン制で商品について多角的に議論します。Google Search Groundingによるリアルタイム情報とAI審判による購入推奨度スコアにより、事実に基づいた議論と一貫性のある評価を実現。「AIが代わりに決める」のではなく、ユーザー自身が考えを整理し、納得して決断できる体験を提供する、情報過多の時代における新しい意思決定支援の形です。
- 参加形態: チーム
- 参加者・チーム名: なかもず
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakakoubrawl/articles/e93dcdb7cb4c43
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-030 Project Quest

- 公式説明: Project Quest（プロジェクエスト）は、RPG風UIでプロジェクト管理を“攻略”するAI支援ツールです。進捗や予算、タスク状況をステータス（AGI / HP / EXP）として直感的に可視化し、AI評議会が多角的な議論と行動案を提示。さらに報告書や想定QAまで自動生成し、状況把握から意思決定、報告作成までをなめらかにつなぎます。PM/PLが説明や整形作業に追われず、前進に集中できる環境を実現します。
- 参加形態: チーム
- 参加者・チーム名: 勇者一行
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/koman/articles/74b96570001c66
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-031 ワタシラジオ

- 公式説明: あなたのための、AIによる、あなただけのラジオ。それが「ワタシラジオ」です。 自分にぴったりのコンテンツにたどりつくために、他の誰かが作ったコンテンツを探し回る時代はもう終わり。 「ワタシラジオ」では、あなたの興味を設定するだけで一日一回、または最大毎週3つのラジオを作ります。 AIは設定された興味をもとにグーグル検索を駆使して台本を作るので勿論最新情報もカバーします。 そしてカスタマイズ可能な二人のAIラジオパーソナリティがかけあいをしながらラジオをお届け。 あなたは&quot;ながら&quot;でそれを聞いて、ポチッとリアクションを送るだけ。 これがAIラジオ「ワタシラジオ」です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tamagokakedon/articles/5cfe73d46c0d7c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-032 Step Slide

- 公式説明: 「何か質問はありますか？」── 返ってくるのは沈黙。 参加者にやる気がないわけではありません。質問を完成させて、自分の名前で投稿するハードルが高すぎるのです。 Step Slide は、このハードルを 5 つの小さなステップに分解するリアルタイムインタラクションツールです。 スマホでスライドの気になる箇所をタップし、引っかかりの種類をタグで選ぶだけ。 同じ疑問を持つ人が自動マッチングされ、AI が質問文を生成。 「参加者 N 名からの質問」として匿名で投稿されます。 もう「質問してください」と言う必要はありません。 質問が自然に生まれる場を、Step Slide がつくります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/zaic_master/articles/80d87e5025bfeb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-033 Personal Commerce Agent

- 公式説明: 「Personal Commerce Agent」は、ユーザーの価値観に基づき「自律的購買」と「安全な権限委譲」を両立する次世代AIエージェントです。 最大の特徴は、独自のTrust Layerによる信頼制御です。Geminiがユーザーのペルソナ（富裕層・倹約家等）に応じた購買計画を策定し、店舗エージェントとUCPで自律交渉します。低額取引はAIが代理署名で自動完結させ、高額や初回利用時はFIDO認証による本人承認（Human in the Loop）を要求します。 これら全工程はAP2に基づき「Mandateチェーン（意思・合意・決済の証跡）」としてFirestoreに刻まれ、Visualizerで署名主体を完全可視化。AIへの盲信ではなく、確かな証跡に基づく「信頼の委譲」を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/uragasumi25/articles/17723523a9f211
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-034 Blog Risk Checker

- 公式説明: 「公開ボタンが怖くて押せない！」そんなエンジニアの心理的ハードルを取り除く、AI技術ブログ執筆アシスタントです。 Gemini 2.5を活用し、記事に含まれる個人情報の漏洩リスクや、炎上につながる攻撃的な表現を自動で検知・修正提案します。さらに、特定の読者層からの反応をシミュレーションするペルソナレビュー機能も搭載。 最大の特徴は、安全スコアが70点を超えないと外部出力できないセキュリティ仕様です。「万が一」の不安をAIが肩代わりすることで、企業の技術広報や初学者の背中を押し、誰もが安心して技術発信ができる世界を実現します。
- 参加形態: チーム
- 参加者・チーム名: Sumi-Nur
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fmbro0203/articles/88c192221fc6ab
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-035 KOMANAVI

- 公式説明: KOMANAVI（コマナビ） は、難解な行政文書の情報格差を解消するWebアプリケーションです。行政ページのURLを入力するだけで、AIが内容を解析し、「やさしい日本語」による要約・手続きチェックリスト・漫画を自動生成します。ひとり親・介護者・外国人住民・災害被災者など、最も支援を必要としながら情報へのアクセスが困難な方々に寄り添い、「正確だが読まれない行政文書」を「誰もが理解し、行動に移せるコンテンツ」へと変換します。行政と市民の間にある&quot;伝わらない壁&quot;を取り除くことを目指しています。
- 参加形態: チーム
- 参加者・チーム名: manzAI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kwa7anabe/articles/0ad1ba25001a1a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-036 AI写真コーチ

- 公式説明: 写真を趣味とする人が、写真をアップロードするだけで、コンテスト入賞を目指すためにどのような点が改善できるか、構図や露出など写真の基本要素に沿ってアドバイスしてくれるAIエージェント。赤ペンで添削してくれる他、チャットで深掘って質問ができるため、写真技術の向上に役立つ。Geminiのマルチモーダル性能の高さを活かしたエージェント
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/catkawaii/articles/01018ee17da018
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-037 Mano

- 公式説明: 感情移入型デートプランニングエージェント『Mano』 「今日どこ行く？」「何でもいい」という、外出時の意思決定コストとマンネリを解消するマルチエージェントシステムです。 最大の特徴は、単なる検索に留まらない「人間理解」と「信頼性」の両立です。Vertex AIを活用し、相手との関係性を学習するコンシェルジュ機能に加え、Google Search連携（Grounding）により実在するスポットのみを提案。王道プランだけでなく、あえて意外性を突く「チャレンジプラン」を提示し、ユーザーの行動変容を促します。 AIが面倒な計画を「ときめき」へと昇華させ、大切な人と向き合う時間を最大化します。
- 参加形態: チーム
- 参加者・チーム名: Cuore Fiore
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 知識・調査・RAG / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/flinters_blog/articles/2f3667714634a1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-038 PhotoPipe

- 公式説明: NASに眠る膨大な思い出が「重くて見づらい」「家族が検索できない」という、NAS所有者が共通して抱える、未だ解決されていない「死蔵データ」の課題に着目しました。 本プロジェクトは、画像リサイズによる爆速ビューワーと、MCPを活用したAIチャット検索を統合。Geminiが自然言語で写真を特定し、リモートPCから直接表示・再生します。長時間処理はPub/Subで非同期化し、Firebase基盤で堅牢に実装。MCP採用によりUI改修なしで機能拡張が可能で、ストレージ負荷も最小限に抑制しました。 「技術がわからない家族」でも即座に思い出に触れられる、実用性と拡張性、コスト効率を兼ね備えた次世代のホームメディア基盤です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mikkikimasutaro/articles/e9b89ff6a906b1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-039 Agent Town

- 公式説明: 災害時の「迷い」を減らすためのAI社会シミュレーション 「Agent Town」 を作成しました。 住人をAIエージェントで構築し、災害が起きた時にどのような行動を取るのか、シミュレーションするゲームになります。 このプロジェクトの目的は、次の3つです。 1, 災害時の初動で「何を先にやるか」を迷わないようにする。2, パニックを減らし、必要な人へ支援を早く届ける。3, 訓練の振り返りを「なんとなく」ではなく、数字で比較できるようにする。これらの目的を、シミュレーションゲームを通じて学ぶことができます。 「Agent Town」の最終目的は、実際の災害でパニックを減らすことです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/jagaimo_poteto/articles/1503303cab9e89
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-040 Bananacraft

- 公式説明: 子どもの「こんなやつ作って！」が、そのままマインクラフトの「街」になる。 Bananacraftは、Nano Banana Proの表現力とGemini 3 Proのマルチモーダル認識性能を駆使した建築AIエージェントです。 「葉っぱで作ったかっこいい街」のような曖昧な言葉から、美しいマインクラフトの街並み/建築物のコンセプト画像を生成。そしてその画像をGeminiが視覚的に解析。「どこが壁で、どこが窓か」を構造的に理解して設計図データへ変換し、マインクラフトの世界で瞬時に施工します。プログラミングと生成AIの力で、子供たちの創造力を最大限に引き出すプロジェクトです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 優秀賞
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: Bananacraft: 4歳の息子と遊ぶために、GeminiでマイクラAI建築エージェントを作った話
- 記事URL（文字列保存）: https://zenn.dev/nakaniship/articles/9f6eb4b7f8a44e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Compute Engine
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-041 HomeCare AI

- 公式説明: 患者に関する様々な情報を、総合診療のBio-Psycho-Socialモデルで分解し、長期のケアに有用な文脈として保存し、危険を検知する、在宅医療多職種連携アプリです。インプットはSlack上で完結できる為、多職種の学習コストが少なく、患者一人ひとりに合わせた文脈の整理・閲覧が手軽に行えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kamuigp/articles/f7f3c8f391d26b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-042 Journey Map

- 公式説明: 旅行中に撮った写真をアップロードするだけで、EXIF情報（GPS・撮影日時）を解析し、行動履歴を地図上に自動マッピングするWebアプリです。Google Gemini APIが写真の被写体・シーン・ムードを自動解析してタグ付けし、さらに撮影地点周辺のお祭り・イベント情報まで発掘します。「記録」を超えて「再発見」を促す、写真起点の旅の発見プラットフォームです。フロントエンドはReact/TypeScriptでCloud Run上にデプロイし、AI機能はSupabase Edge Functions経由でGemini APIを呼び出すサーバーレス構成を採用しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/chattso_gpt/articles/journey-map-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-043 Faceless.fm

- 公式説明: ポッドキャストのショート動画を作りたいけれど、「どこを切り出すか」の判断と画像素材の用意に毎回2〜3時間かかる——Faceless.fmはこの課題を解決するAIエージェントです。音声ファイルをアップロードするだけで、Cloud Speech-to-Text (Chirp 2) で単語レベルの文字起こしを行い、Gemini 3 Flashがバイラル性の高いセグメントを5件自律選定。さらにGemini 3 Pro Imageがセグメント内容に応じたビジュアルを自動生成し、FFmpegで字幕付き9:16縦動画まで一気に仕上げます。顔出し不要で、誰でもポッドキャストの切り抜きショート動画を作れるWebアプリです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kontaco/articles/3f272057e4001a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-044 TB: Talking Bookshelf

- 公式説明: Talking Bookshelfは、本棚を通じて自分を紹介できるサービスです。 読んだ本は、その人の興味や考え方をよく表しています。このサービスでは、あなたの本棚が訪問者と会話し、読書体験やおすすめの本について話してくれます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shusuke_o/articles/2db32be371f76b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-045 モヤモヤキャッチャー ～地域活動家のための「お金と人の不安」解消エージェント～

- 公式説明: 「来年度の予算が読めない」「協賛の頼み方が分からない」地域で活動する個人やチームは、こんな漠然とした不安を抱えながら、言語化できずに行動が止まっています。モヤモヤキャッチャーは、選択チップによる短い対話で不足情報を補い、90日アクションプラン・資金複線化プラン・関係者別の依頼文章を一括生成するAIエージェント。生成後は受け取り手（行政・企業・協力者）視点のレビューと反映まで一気通貫で行え、「今すぐできる次の一歩」まで具体的になります。 これは、非エンジニアがAIエージェントとの対話だけで実装。言いたい放題わがままを言って開発する――WDD（Wagamama Driven Development：わがままドリブン開発）で実現しました👐
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/naka668/articles/fa5b258e3c5592
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-046 スマホAIサポーター

- 公式説明: スマートフォンの操作に困っている高齢者が、アプリのボタンをひとつ押すだけでAIサポートを受けられるiOSアプリです。Vertex AIのLive APIを活用し、ユーザーの画面と音声をリアルタイムでAIに送信。AIが実際の画面を見ながら「右上に青いボタンがありますね、そこを押してください」のように音声で具体的に操作を案内します。テキスト入力は一切不要で、話すだけで利用可能。サポート完了後はLINEで家族に自動通知されるため、離れて暮らす家族も安心です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kinjo_dev/articles/648a5691a48eb1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-047 ojoya

- 公式説明: フリマアプリで不用品を売りたいけど、相場を調べるのが面倒 — そんな課題を解決するのがOjoyaです。商品の写真を1枚撮るだけで、AIが商品を特定し、中古市場の相場を自動で査定します。バックエンドではLangGraphで構築した3段階のAIエージェントパイプライン（画像認識→市場調査→価格算出）が動作し、各段階で条件分岐による早期終了を行うことでLLMコストを最適化。Gemini 2.5のGoogle Search Grounding機能を活用して市場データを取得し、価格帯と信頼度を提示します。査定の進捗はSSEでストリーミング配信され、ユーザーはAIの過程状況をリアルタイムで確認できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/keitoda/articles/ee41c1b0cd0b6a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-048 NomikAI

- 公式説明: プロジェクト概要：NomikAI（ノミカイ） 飲み会は楽しいものですが、コース料理などは自分で量を調整しにくく、健康管理が困難です 。NomikAIは、そんな「飲み会でのささやかな抵抗」を支える専用AIエージェントです 。Gemini 2.5 Flashを活用し、料理写真からカロリーを推定 。最大の特徴は、残り品数を考慮したペース配分機能です 。AIが「少なめ・推奨・多め」の3段階で摂取量を提案するため、罪悪感なく食事を楽しめます 。飲み会の楽しさと健康を両立させる、心強い相棒です。
- 参加形態: チーム
- 参加者・チーム名: NomikAI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/flinters_blog/articles/073dae60214472
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-049 PaperForge

- 公式説明: 論文PDFをアップロードするだけで、概念と関係性を自動抽出しナレッジグラフとして可視化するパーソナルナレッジエージェントです。Google ADKによるマルチエージェントパイプライン（Extraction → Graph → Tutor）が連携し、概念抽出・グラフ構築・学習支援を一気通貫で実行します。セマンティック検索による類似概念の発見、最大3本の論文のAI比較分析、依存関係を考慮した学習パス生成、難易度別の理解度クイズなど、論文を「読んだ後」の学習定着ワークフローを包括的に支援。Vertex AI（Gemini 2.0 Flash）の推論能力とFirestoreによるデータ永続化をCloud Run上で統合し、論文理解を&quot;作業&quot;から&quot;対話型の学習体験&quot;へ変えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 個別最適化 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tenyyprn/articles/dc34a05e588302
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-050 Sleep Journal

- 公式説明: Sleep Journal は、就寝前のジャーナリングを通じて心と睡眠を整えるAI Webアプリです。ユーザーの気分（mood）とストレス（stress）をもとに、Gemini 2.5 Flashが最適なフィードバックを生成。さらに、サムズアップ／ダウンの評価を活用した Contextual Bandit により、共感や支援の質を継続的に最適化します。ジャーナル本文は保存せず、 一定期間のみ匿名データを保持するプライバシー設計。やさしく、安全に、そして賢く進化する睡眠サポートを実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nisiwa02/articles/66ade10d016263
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-051 ZUBORUNNER

- 公式説明: 「あの大会の記録、何分だっけ？」完走証の管理に悩む、全てのずぼらなマラソンランナーへ捧ぐサービスです。 ZUBORUNNERは、完走証の画像やPDFをアップロードするだけで、Gemini 2.0 Flash が記録を自動抽出しデータベース化します。 最大の特徴は、AIエージェントによる「環境データの自動補完」。大会名や日付から「コースの起伏」や「当日の天気」を推論し、記録とセットで資産化します。さらにChrome拡張機能によりブラウザのサイドパネルに常駐可能。エントリーサイトを見ながら過去データを瞬時に参照できる、ランナーのための「最強の振り返りアーカイブ」です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takaki_baribari/articles/fdfb5b9d8af9cc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-052 MR Quiz

- 公式説明: MR Quizは、MR作成時にAIがそのコード差分に基づいた技術クイズを自動生成する「教育型MRレビューエージェント」です。コメントで回答すると採点と丁寧な解説がその場で届きます。AIでコードは書けても中身を説明できない——そんなジュニアエンジニアの課題を、特別な学習時間を設けることなく日常の業務の中で解決します。
- 参加形態: チーム
- 参加者・チーム名: 温コード知新
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/flinters_blog/articles/bb93718f770010
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-053 Enikki

- 公式説明: Enikki（絵日記） は、音声で喋るだけで、今日一日の出来事を「ぼくの夏休み」風の懐かしい絵日記に仕立ててくれるアプリ。入力の面倒さと記録の味気なさを解消し、日々の振り返りを楽しい儀式に変える。
- 参加形態: チーム
- 参加者・チーム名: 庭とイノベーション
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hirokts/articles/8d8890b1c32e94
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-054 Knowva-reading

- 公式説明: Knowva-readingは、AIとの対話を通じて、読書中の「なんとなくの感想」を言葉にし、自分だけの読書ログとして残せるアプリです。
- 参加形態: チーム
- 参加者・チーム名: Knowva-reading
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/q2chen/articles/31ce3319c43b64
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-055 Visionfy

- 公式説明: 画像処理アルゴリズムをGUIワークフローで構築でき、AIエージェントによるアルゴリズム開発支援を受けることができるプロダクト『Visionfy』を開発しました。画像処理アルゴリズム開発の現場における「コードが複雑怪奇になり、解読不可能・修正が難しくなる」「アルゴリズムの処理内容が可視化できず、チームメンバーへのコミュニケーションコストがかかる」といった課題に対し、直感的なGUIエディタや処理内容を即時にプレビュー可能なビジュアルデバッグ機能などを搭載し、アルゴリズムの開発体験を大きく向上させました。さらに、AIエージェントによるワークフロー自動生成機能により、自然言語によるアルゴリズム構築が可能になり、画像処理という専門的な領域を民主化するという試みにも挑戦しています。
- 参加形態: チーム
- 参加者・チーム名: Visionfy
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yoshi108/articles/79a22fcf39b6b7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-056 DIAMONDMIND

- 公式説明: 野球コンサルアプリ「DIAMONDMIND」は、指導者や資金が不足しているチームの課題を解決する、AI搭載の統合プラットフォームです。従来の「感覚」に頼った曖昧な指導を、最新の姿勢推定技術（YOLO）とGeminiにより、「数値と言語」による定量的な評価へとアップデートします。 主な機能は、動画解析による動作診断、ポジション別の悩み相談、専門的なトレーニングメニュー提案の3点です。Google Cloudのサーバーレス構成を活用することで、低コストながらプロレベルの分析環境を実現しました。 地方の選手や限られた環境で戦うチームに最新の野球理論を届け、誰もが平等に上達できる環境を提供することで、様々な野球人を全力でバックアップします！
- 参加形態: チーム
- 参加者・チーム名: BPSD
- 受賞: 奨励賞
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 「感覚」の野球指導をAIで「数値と言語」へ。野球コンサルアプリ「DIAMONDMIND」
- 記事URL（文字列保存）: https://zenn.dev/maoya23/articles/276c97e2c3e7f3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Gemini API / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-057 Bous AI (ボウサイ)

- 公式説明: Bous AI（ボウサイ）は、マンション防災マニュアルの作成・更新が進まないという社会課題に向き合う、対話型の防災マニュアル作成支援エージェントです。 マンションでは、防災マニュアルの作成責任は住民にある一方、作業の煩雑さや専門知識の必要性から、多くのマンションで整備が進んでいません。 本エージェントは、理事会の議事録メモをもとに、防災体制や避難方針を整理し、イラスト付き防災マニュアルPDFを自動生成します。さらに、地域の行政防災マニュアルを参照しながら会話形式で編集でき、マンション理事会の際、その場で即時更新と合意形成を可能にします。
- 参加形態: チーム
- 参加者・チーム名: チームKブラザーズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ruki_kuri_sun/articles/ec7505de749e6c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-058 金融取引分析エージェント(AIとデータサイエンス)- Python &amp; Google ADKで金融取引戦略を生成

- 公式説明: 「金融取引分析エージェント(AIとデータサイエンス)」は、Python と yfinance による金融データの取引手法検証と、Google ADK（Agent Development Kit）を用いた**データサイエンスと AI による戦略生成を統合した Web アプリケーションです。 対象は、個人投資家・トレーダー、特にプログラミングが苦手な人で、自分の考えた取引ルールを、コードを書かずに自然言語で入力し、過去データで検証したい人となります。 解決する課題として、戦略のコード化のハードルを下げ、買い・売りタイミングの曖昧さ、銘柄×戦略の手動検証、戦略の再利用が可能となり、コードを書けない人でも高度な分析やバックテストが可能となります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mmmot/articles/560829d90036dc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-059 歴史を「体験して学ぶ」学習支援AIエージェント

- 公式説明: 本アプリは、歴史を学ぶためのAI学習支援サービスです。目的地とスポットを入力すると、Google検索に基づく正確な歴史情報から旅行ガイドを自動生成。現地では旅行ガイドを活用しながら巡り、旅行後は写真と感想から振り返りパンフレットを作成できます。事前学習・現地体験・振り返りまでを一貫して支援する、新しい歴史学習体験を提供します。
- 参加形態: チーム
- 参加者・チーム名: ankw
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/narumikr/articles/5296da37bf4b74
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-060 trimee

- 公式説明: 全員参加型の旅行計画をフルサポートするAIエージェントアプリ。参加メンバーが各自の希望をカードとして投稿し、それらの希望をもとに叩き台となるプランをAIが提案。叩き台プランの編集も全員でリアルタイムにAIと。「もうちょっと時間に余裕を持たせてほしい」「お酒が飲めるプランに変更してほしい」などそのタイミングでの希望でAIが直接プランに変更を反映します。 宿やレストランもAIがおすすめを提案、web検索も併用しながら具体的にプランを決定していくことができます。各行程は位置情報と紐づけられており、地図上で時系列順に場所を確認しながらプランを検討することも可能です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 知識・調査・RAG / リアルタイム / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ichihos1111/articles/aa7a7229c8d8b6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-061 Nano Parrot

- 公式説明: Nano Parrot(ナノパロット)はブラウザ完結型 AI カメラ — リアルタイム複数人物トラッキング＆属性分析システムです。 Chrome に内蔵された Gemini Nano (Prompt API) と MediaPipe を組み合わせ、カメラ映像内の複数人物を同時検出・個別識別（UID 管理）して属性を分析します。すべての処理がクライアントサイドで完結するため、サーバーへの送信は一切行わず、高度なプライバシー保護 を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ossy/articles/ac3cb299b814d4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-062 PawGuardian

- 公式説明: 「数分間だけ」という油断が、愛犬の命を脅かす車内放置事故。 PawGuardianは、Google Cloudの最新AI「Gemini 3 Flash Preview」を活用し、既存の車をスマートなドッグモードへと進化させるAIエージェントシステムです。 映像とテキストを統合するマルチモーダル推論により、愛犬の行動変化や環境リスクを総合的に判断。状況分析を行う「Analysis Agent」と、音声再生や通知を実行する「Action Agent」が連携するDual-Agent構成を採用しました。 AIと人間の認識差をプロンプト設計で補完し、DIYでも実装可能な次世代ペット安全ソリューションを提案します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/song4wk/articles/2af0cf1d050356
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-063 Saib-AI

- 公式説明: 「家庭菜園を始めたいが、失敗が怖い」「忙しくて管理できない」そんな悩みを解決するのが、自律型AI農業プラットフォーム『Saib-AI』です。 Gemini 3を使用したエッジエージェントが、カメラとセンサーで植物の状態と周りの環境を読み取り、水やり等の世話を完全自律で行います。単なる自動化ではなく、植物をキャラクター化して絵日記に登場させたり、あなたに話しかけるといったエンタメ性も実装。テクノロジーが栽培のハードルを下げ、誰もが失敗を恐れず植物と暮らす喜びを享受できる、新しいボタニカルライフを提案します。
- 参加形態: チーム
- 参加者・チーム名: Team 笑顔隊
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakayutthi/articles/85b8e07904707f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-064 DocuAlign AI — ドキュメントの「サイレント劣化」をAIが自動検知

- 公式説明: 企業のドキュメントは作成後、UIの変更や用語の改定により静かに劣化し続けます。 Iron Mountain の調査では、この非効率により生産性が21.3%も損なわれています。DocuAlign AI は、Google Drive上のドキュメントをLangGraphエージェントが自律的にスキャンし、Gemini 2.0 Flashのマルチモーダル解析で「テキストの意味的矛盾」と「スクリーンショットの視覚的劣化」を同時に検出します。 従来の差分検出ツールでは不可能だった意味レベルの矛盾を捉え、修正提案をワンクリックで適用可能。100% Google Cloud（Cloud Run, Firestore, Vertex AI）のサーバーレス構成で、開発にはGoogle AntiGravityを全面活用しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/2mugi/articles/b386d6cd03952b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-065 Kintsugi-Helix（金継ぎヘリックス）

- 公式説明: 金継ぎの哲学「壊れた部分を金で修復し、より美しく仕上げる」をソフトウェアに適用した自律型障害回復AIエージェントです。Cloud Loggingからエラーを自動検知し、Vertex AI Gemini 2.5 Proが根本原因を分析。JUnitテストを自動生成してTestcontainersでバグを再現し、コード修正→テスト検証→OpenRewriteによるリファクタリングまでを人間の介入なしに実行します。Blast Radius分析で影響範囲を定量評価し、低リスク修正は自動マージ、高リスク修正はPRで人間に判断を委ねる安全設計。さらに修正パターンをナレッジベースに蓄積し、同種の障害に対して精度が向上する免疫システムを備えています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hatyibei/articles/977fb79be8f472
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-066 ThinkResume

- 公式説明: LLMとの対話は思考を深めますが、重要な洞察や仮説は断片化しがちです。ThinkResumeは、人が選んだ対話をAIが構造化し、洞察の抽出・整理・再利用を可能にする仕組みです。単なる履歴保存ではなく、「対話 → 洞察抽出 → 仮説固定 → 再利用」という循環を設計することで、LLM対話を知的資産へと変換します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mae616/articles/3db9e1f0ce3e65
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-067 TSUGIAI

- 公式説明: TSUGIAIは、24時間稼働の製造現場で重大事故になり得るシフト引継ぎ（申し送り）の「抜け漏れ」「惰性入力」「記録のばらつき」を、AIエージェントの対話チェックアウトで構造的に解消する次世代システムです。業種・職種に合わせてチェックリストをAIが自動生成、危険兆候は深掘り質問、音声/チャットでAIエージェントが能動的介入を行うことで現場負荷を最小化、会話ログから引継ぎノートとアクションを自動生成し、後任コメントで改善ループまで回します。TSUGIAIは意識や根性に頼らず、質問・深掘り・証跡・ドキュメント化を仕組みに落とし込み、誰が担当しても一定品質の引継ぎができる状態を目指しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kdoai/articles/d8268f95d243b4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-068 Asset Agentic

- 公式説明: Asset Agenticは、PDF書類から固定資産と経費を自動判定するAgentic AIです。最大の特徴は「止まる」設計——曖昧な案件を無理に分類せず、GUIDANCE（要確認）として人に判断を委ねます。経理担当者は全件を精査する必要がなくなり、AIが迷った案件だけに集中できるため、認知判断の負荷を大幅に軽減します。PDFアップロード→明細抽出→3値分類（資産寄り／経費寄り／要確認）→根拠提示までをワンストップで処理。Gemini APIによる文書解析とルールベース判定を組み合わせ、判定根拠をエビデンス付きで出力します。「間違えないAI」ではなく「間違える前に止まるAI」という新しいアプローチで、経理業務の属人化解消と判断品質の向上を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/majiro_ns/articles/asset-agentic-stop-first
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-069 「FlowGuard AI」地図×生成AIでイベント運営の「想定外」を減らすリスク管理プラットフォーム

- 公式説明: イベント当日に「想定外」が連鎖して、現場の判断と共有が追いつかなくなる──そんな経験はありませんか？この課題意識から、私はイベント運営で起きがちな「想定外」のトラブルを減らすための、新世代の生成AI×協働型リスク管理Webアプリ「FlowGuard AI」を制作しました。AIの推論・整理の力で複数カテゴリのリスクを分析・統合し、連鎖まで含めて見立てます。対策は採用判断からToDo化まで一体で管理し、危険箇所や誘導ポイントは地図上で共有。関係者の状態をリアルタイムに同期しながら、ケース比較やPDF出力まで含めて、会議・当日運用・引き継ぎを一気通貫で支援します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sei_1205/articles/a267cfa9fd2ba3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-070 Kensan

- 公式説明: エンジニアの自己研鑽を支援する統合管理アプリ「Kensan」です。目標・時間・メモの3軸を1箇所に集約し、ツール間の行き来による時間損失を解消します。 最大の特徴は、Gemini 2.0 Flashを活用した「共に進化するAIエージェント」です。蓄積された行動データをAIが自ら分析してプロンプトの改善案を生成し、ユーザーがA/Bテストで承認することで、使うほど自分専用へと最適化されます。Human-in-the-Loopの思想に基づき、AIと人間が共に成長する「共進化」のサイクルで、本質的な学びの時間を最大化します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuu7751/articles/f14bd01d1d04a8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-071 コマンドセンター

- 公式説明: 今の教育現場が進めるデジタル化は、ともすれば「管理の効率化」に終始し、子供たちが本来主役であるはずの「学ぶ喜び」が二の次になっているのではないか。そんな強い危機感と、教育に純粋なワクワクを取り戻したいという願いが開発の原点です。本プロダクトは、先生の分身のような存在として子供一人ひとりに寄り添い、大人が見逃してしまいそうな小さな「できた！」その瞬間を自律的に見つけ出します。効率優先の波で削られがちな達成感を丁寧に拾い上げ、次なる探究心へと繋げる。管理のためではなく、子供の好奇心に火を灯し続けるための伴走者として、教育の未来を切り拓きます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/motomiki/articles/f813c272765f39
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-072 Tsugi no Tokimeki（次のトキメキ）

- 公式説明: Tsugi no Tokimeki（次のトキメキ） は、入手困難な“ボンボンドロップシール”などの探索を楽にするコミュニティアプリ。ユーザーの目撃・購入投稿をNext.js（Cloud Run）×Firebase/Firestoreに蓄積し、Vertex AIがエリア・時間帯・投稿傾向から“発見確率”を推定。AIエージェントが確率を“行動提案”に変換し、今日行くべき当たりルート／寄り道順／滞在目安まで提示して空振り移動を削減。見つけた体験を共有でき、投稿が次の探索者を助けて循環が回る。通知は朝夕2回に抑え、疲れと運用コストを両立。将来はデータ蓄積により機械学習へ移行し、他の限定アイテム探索にも転用可能。
- 参加形態: チーム
- 参加者・チーム名: 平成女児
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yumemi9808/articles/88de0472107c7e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-073 Amber Ink

- 公式説明: Amber Inkは、孤独・孤立を防ぎ、個人の尊厳を守りながら「生きた証」を次世代へ繋ぐAIエージェントシステムです。 従来の監視型サービスとは異なり、AI「琥珀」との温かい対話を通じて日々の安否を確認し、その軌跡を「宝石」として記録します。 アピールしたい特徴： ・対話ベースのUX: 煩雑な登録フォームを排除し、オンボーディングからプロフィール更新まで全てをAIとの会話で完結させます。 ・情緒的な暗号化: ステガノグラフィー技術を用い、暗号鍵を「画像」の中に隠すことで、遺族が直感的に想いへアクセスできる仕組みを構築しています。 ・究極のプライバシー: すべての暗号化プロセスをデバイス内で完結させ、平文の個人情報をシステム側ですら覗けない「聖域」として保護します。 ・永続的な情報継承: サーバーに依存しないスタンドアロンな「記念ページ（HTML）」により、サービス終了後も想いを手元に残し続けることが可能です。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/julia_caesaris/articles/88233f487dbaf1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-074 Tasuke

- 公式説明: 「Tasuke」とは、テキスト教材（PDF/Word）を渡すだけで、生徒がつまずきやすいポイントを予見し、噛み砕いた解説動画を全自動で生成してくれる AI エージェントです。 先生が教材をアップロードすると、Gemini 3 Flash が教材を読み解き、「ここは初学者がつまずきやすい」「ここは身近な例え話で噛み砕いた方がいい」と自律的に判断。解説台本を生成し、キャラクター（ずんだもんなど）が音声で解説する動画まで一気通貫で作り上げます。
- 参加形態: チーム
- 参加者・チーム名: 宝くじ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/vel3633/articles/684a599cc1eaab
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-075 mathgirl

- 公式説明: 私たちは数学を楽しく学ぶことができるMathGirlを開発しました。数学の勉強には課題が山積みです。教師に聞きに行こうにも「そんなことも知らないの？」みたいな顔をされたりひとたびゼミにでたら教授から詰められるそんな「怖い」学習が大学高校中学では起こっています。私たちは、数学をもっと楽しく友達に数学を教えながら教わるという感覚で一緒に教科書を読みながら勉強するという体験を作りました。言えない・失敗する・頼れないそんな恐怖から「楽しくて暖かい」数学を私たちは提供します。数学を学ぶ全世界の学習者が、安心して数学を楽しみながら学べる「暖かい数学」の世界を届けます！！
- 参加形態: チーム
- 参加者・チーム名: mathgirl
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shota_neuron/articles/89ce3ec63ccebc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-076 Hobo - 小学生の「考える力」を育てる宿題コーチロボット

- 公式説明: 共働き世帯68.5%が直面する「宿題バトル」問題を、AIエージェント技術で解決します。Google ADK（Agent Development Kit）とGemini Live APIを活用し、小学校低学年向けにソクラテス式対話で思考プロセスを支援する音声コーチロボサービス。マルチエージェント構成（算数・国語・励まし・復習の専門エージェント）、Vertex AI Memory Bankによる学習履歴活用、音声感情分析による適応的支援により、親は教育タスクから解放され、子供の成長を見守る時間に変わります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / マルチエージェント / リアルタイム / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takashi_araki/articles/0230bfd1996ac0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-077 Quest Board

- 公式説明: 「アイデアはあるが仕様書が書けない非エンジニア」と「実績と成長機会を求めるエンジニア」をつなぐ、RPG型マッチングプラットフォームです。 Gemini 3.0搭載のAIエージェントが、曖昧なアイデアを対話のみで瞬時に「クエスト（要件定義書）」へと翻訳。エンジニアはこれを攻略（実装）し、AIによる客観的なコード評価とステータス化を受けることで、楽しみながらキャリアの「経験値」を可視化できます。 学習の義務感を「冒険」に変え、全ての人が場所や役割に縛られず挑戦できる、現代のキャリア・セーフティネットを目指します。
- 参加形態: チーム
- 参加者・チーム名: Quest Board
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takataku0223/articles/1f91233d9084c0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-078 Personal Book Brain

- 公式説明: Personal Book Brainは、「過去に読んだ本の内容を忘れて活用できない」という課題を解決する、AIを活用した蔵書管理システムです。ISBNを入力するだけでGeminiが目次を自動取得。学びたいテーマを自然言語で入力すれば、Vertex AI Searchが蔵書から関連する書籍を抽出し、なぜ読むべきかの根拠を添えた「パーソナライズされた再読ガイド」を生成します。従来のキーワード検索では難しかった文脈の理解により、適切なタイミングで「どの本の、どの章を読み返すべきか」の示唆を与え、個人の蔵書をより効率的な学習リソースへと変換します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ssfuno/articles/70f192ac815190
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-079 Lexio

- 公式説明: Lexio は、Google ADK と Gemini を活用した AI エージェントによるパーソナライズ言語学習プラットフォームです。ユーザーが普段読んでいる RSS フィードから最新記事を取得し、言語習得理論の「i+1（現在の能力より少し上）」の難易度で学習コンテンツを自動生成します。技術用語を保持しつつ文法・語彙を調整することで、興味のある分野の最新情報を追いながら語学力を伸ばせます。Content Agent によるコンテンツ生成、Quiz Agent による選択問題の自動生成、Assessment Agent による能力評価の3つの AI エージェントが連携し、一人ひとりに最適化された学習体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/flyinglimao/articles/3f7e4a8f3a7dd5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-080 Donut Tail

- 公式説明: 今回開発した「Donut Tail」はタスクに関する「どうなっている?」を解決するためのサービスです。業務などでチャットでのコミュニケーションをしていると、大量の投稿によってタスクの依頼や進捗報告を見逃してしまうことがあります。そのため、AIエージェントによってタスクの状態を自動的に管理し、チャットによるコミュニケーションにおけるロスを減らします。チャットに投稿された内容をAIで解析し、どんな内容が依頼されたのか、タスクの状態がどう変化したのかを解析します。これにより、チャットの発言内容とタスクの状態が一致し、タスクを把握してなかったなどのミスを防ぎます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/northdipper/articles/f9374f95928fb4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-081 Zero Assembly

- 公式説明: Climate TRACEとGeminiを利用した包括的な排出量の洞察 1. グローバルの排出量を追跡する: 世界中の７億 4,500万の温室効果ガスと大気汚染物質の発生源から。現在は、日本中の4,700の温室効果ガスと大気汚染物質の発生源から。 2. 排出量削減の推定: 世界中のあらゆる発生源に対する具体的かつ可能な気候アクションから。現在は、日本中あらゆる発生源に対する具体的かつ可能な気候アクションから。 3. 排出量削減の購入: 世界中のあらゆる発生源に対する具体的かつ可能な気候資金から。現在は、日本中あらゆる発生源に対する具体的かつ可能な気候資金から。
- 参加形態: チーム
- 参加者・チーム名: ゼロ会
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shogoorg/articles/2d8afff966732d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-082 コンセプトをデザインするAgentic AI『Sol LeWitt』

- 公式説明: コンセプチュアル・アートの巨人ソル・ルウィットの思想を参考に、人が 「誰に・何を伝え・どう動いてもらうか」 というコンセプトの追求に集中できる世界を実現するAgentic AIシステムです。Gemini＋LangGraphによるマルチエージェント構成で、Coordinator・Planner・Writer・Visualizerなどが自律的に連携し、スライド・絵本・漫画など多様な視覚コンテンツをGemini 3.0 Pro Imageで高品質に生成。インペイントによる部分修正、企業テンプレートに沿ったブランド準拠のスライド生成にも対応します。終わりのない「見栄え調整」から解放し、本質的なコンセプトに時間を使える未来を届けます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ohnegi/articles/b74258b5987e0b
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-083 MebuKi

- 公式説明: MebuKiは、日常の中で生まれる小さな気づきを「タネ」として残し、思考へと芽吹かせるアプリです。情報過多で効率が優先される現代社会では、未完成の違和感や問いはノイズとして排除されがちです。本プロジェクトは、その“思考の前段階”を守ることに着目しました。言語化しきれない断片をそのまま保存し、AIとの対話や時間経過を通じて耕すことで、探索的な思考が育つ余地を取り戻します。MebuKiは、AI時代に失われつつある「考え始める瞬間」を守る思考支援アプリです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nihey/articles/a2a3d451cb125f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-084 しゃべらないAIチャット

- 公式説明: しゃべらないAIチャットは、対話型AIチャットの煩わしさを、新しいアプローチで開所するプロジェクトです。 従来の対話型AIチャットの問題点は、AIが余計な返答をする、過去のやり取りが混ざる、チャットが散乱するなど、端的に回答を知りたいときに不便さがあります。 これをを解決するため、ユーザーが一方的に質問を投げかけるだけのシンプルな設計を採用しました。その手法としてスレッド形式の新しいUIを使ったAIチャットを作りました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/atworks_np/articles/6e3e35e191b4b8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-085 HairGuard Agent

- 公式説明: HairGuard Agent - 薄毛対策を3つのAIエージェントで支える継続支援アプリ 薄毛対策の最大の課題は「継続できないこと」。AGA潜在患者1,260万人のうち、66.1%が1年以内に中断しています。その理由は「変化が見えない」「孤独感」「生活習慣の維持が難しい」という3つの壁。 HairGuard Agentは、この3つの壁に対応する3つのAIエージェントで継続を支援します。Hair Check Agentが頭皮写真を数値化して変化を可視化、Mental Shield Agentが3人の専門家による2ラウンド議論で多角的にサポート、Lifestyle Agentが体質評価と具体的な改善アクションを提案。週間プランは毎日午前4時に自動管理され、ユーザーは朝起きたら今日のアクションが用意されています。Firebase + Google Cloud + Vertex AI Geminiで構築した、継続のハードルを極限まで下げるヘルスケアプロダクトです。
- 参加形態: チーム
- 参加者・チーム名: GRAV
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yujmatsu/articles/20260215_hackason_hairguard_agent
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-086 Multi-Layer Mirror

- 公式説明: 日記は続かないという普遍的な課題に対し、本プロジェクトは「今日の断片だけでその日の物語を生成する」新しい体験を提案します。ユーザーは短いメモを入力するだけ。生成処理はCloud Functions上で制御し、当日の断片のみをGeminiに送信することで、過度な分析や過去情報の混入を防ぎます。Firestoreには日付単位でimmutable保存し、予定連携・検索・写真統合へ拡張可能な実運用設計を採用しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/chips/articles/b59fcb282cf572
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-087 子供の「なぜ？」を親子の「対話」に変える「OyaCo Lab」

- 公式説明: 「OyaCo Lab」は、1日300回繰り返される子供の「なぜ？」を、ただの質問応答で終わらせず、親子の豊かな「対話」へと変えるAIパートナーです。 子供がAI博士たちと楽しく会話して疑問を解消すると、AIはその興味を分析し、親へ「会話のネタ」や「次のアクション」を提案します。親は専門知識がなくても、「ねえ、これ知ってる？」と子供に話しかけられ、デジタルの学びをリアルの体験へと繋げることができます。 忙しい親が抱える「あとでね」という罪悪感を解消し、限られた親子の時間を「質」で満たす。それが私たちの提案する新しい家族のコミュニケーションです。
- 参加形態: チーム
- 参加者・チーム名: としゆうき
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toshiz_t/articles/d3010e2403df10
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-088 Brave

- 公式説明: 老後資金2000〜3000万円の準備が必要とされる中、20〜30代の8割が将来のお金に不安を抱えています。Life CompassはAIファイナンシャルプランナーとして、専門知識がなくても約5分の入力でライフプラン表を自動作成し、個人に最適化されたアドバイスとネクストアクションを提案します。Vertex AI Agent Engineのマルチエージェント構成により、FPエージェントが専門的思考を担当し、構造化エージェントがJSON変換を行うことで、高精度な診断を実現。従来のFP相談の高コストや行政サイトの画一的シミュレーションの課題を解決し、誰もが気軽に将来設計できる環境を提供します。
- 参加形態: チーム
- 参加者・チーム名: Brave
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tpi/articles/1fd013077103dc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-089 GameStudio 1984

- 公式説明: GameStudio 1984は、1984年のゲーム開発スタジオを現代によみがえらせることをコンセプトにした、自律型AIエージェントによるゲーム制作システムです。このシステムではマルチエージェントシステムを採用し、企画からプログラミング、グラフィック、サウンド、テストに至るまで、役割の異なる6つのエージェントが連携してHTML5ゲームを自動生成します。 本システムの開発はマルチエージェントシステムの試作をとおして、エージェント間の連携やFunction Callingの安定実行を実現するための実装手法を習得するために実施しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dltk/articles/a8ab44fafe7a19
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-090 BA-SUU

- 公式説明: BA-SUUは、AIアバターとリアルタイム音声で面接練習ができるWebアプリです。就活生の最大の壁は面接対策ですが、練習相手がいない・費用が高い・本番でしか場数を踏めないという課題があります。BA-SUUはGemini Live APIによる自然な日本語音声対話と3Dアバターで対面感覚を再現し、面接後には5軸レーダーチャート・改善アクション・詰まりポイント分析を含む構造化フィードバックを提供します。AIを「審判」ではなく「練習相手」に位置づけ、合否判定を出さず改善行動だけを返す設計で、誰でも繰り返し場数を踏める環境を実現しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/king/articles/d735e7dfcc5cbf
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-091 AIM3:AI Agents Ecosystem &amp; Unified system

- 公式説明: AIM3:AI駆動・サーバーレス設計 P2P AI Ecosystem &amp; Unified system AIM3の設計、このAIエコシステムが「革命的」とされる所以は、単なる技術の組み合わせではなく、**「中央集権的な運用コストと依存を徹底的に排除した、自律的なコミュニケーション基盤」**を目指している点とAI 共創型のエコシステム設計とAI ×Notebook機能。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/amas/articles/205784fb1db084
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-092 会いたくないあの人 — スリルで覚える英単語アクションゲーム

- 公式説明: 「勉強は退屈」という固定概念を破壊する、スリル直結型の英単語学習アクションゲームです。学習が続かない、単調で飽きやすいという課題に対し、「今、会いたくないあの人から逃げ切る」という極限の緊張感をソリューションとして提供します。 最大の特徴は、敵の名前に「上司」や「元カレ」など実在の人物を設定できる点。予測不能な動きをする敵を回避し、マップ上のジェムを集める過程で英単語テストが出題されます。計50問を突破しなければクリアできない「学習強制型報酬システム」と、逃走のドキドキによる「感情ドリブン学習」の融合により、遊びながら自然と記憶に定着する全く新しい学習体験を実現しました。
- 参加形態: チーム
- 参加者・チーム名: ねこ村なぞBOX
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sunadorineko/articles/93003c70649bb0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-093 【Mappy】 対面麻雀において何切るに遭遇した時どうしてますか？

- 公式説明: Mappyは、手牌の写真から最適な打牌を提案する麻雀AIアシスタントです。 雀魂や天鳳といったゲームの特化AIや「何切る」AIは存在します。しかし対面麻雀で「この手、何切る？」となったときは、従来は自分で手牌情報を入力する必要がありました。本プロジェクトはその課題を、写真を撮って送るだけで認識〜分析まで一気に届く形で改善しています。 手牌写真をアップロードすると GCP（Cloud Storage・Gemini Vision）で手牌を認識し、Mastra 上のエージェントが 評価ロジックとGeminiによる説明で最適打牌を提案してくれます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kazuuuuuu/articles/886735f24d6151
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-094 TogeNuki

- 公式説明: TogeNukiは「メールが怖い」という心理的負担を軽減するためのメールサポートツールです。威圧的なメールを直接読まずに、選択したキャラクター(全肯定お姉さん/優しい先輩/冷静な執事)が寄り添いながら音声で優しく読み上げます。返信は音声入力だけで完結し、AIが自然なビジネスメールに清書。過去のメール履歴から文体を学習するため、相手にAIと気づかれにくい自然な返信が可能です。認知的再評価の心理学的アプローチと、Gemini 2.5 Flash、Cloud Run、Pub/Subなど Google Cloudの技術を組み合わせ、リモートワークでのテキストコミュニケーションの心理的ハードルを下げることを目指しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takkuhiro/articles/togenuki-hackathon
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-095 Gymini

- 公式説明: ジム入会者の96%が1年以内に辞めてしまうほど、筋トレを継続するのは大変なことです。原因は「何をすればいいか分からない」「成果が見えない」こと。Gyminiアプリは、AIトレーナー&quot;Rooちゃん&quot;があなたの目標や生活スタイルに合わせて、相談に乗ってくれるとともに最適なメニューを提案し、トレーニングを記録・可視化してくれるアプリです 。高額なパーソナルトレーナーではなく、いつでもポケットの中にいる専属トレーナーとして、初心者でも迷わず続けられる運動習慣をつくります。
- 参加形態: チーム
- 参加者・チーム名: FCID
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/douxsh/articles/gymini-hackathon-2026
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-096 補助金ナビ

- 公式説明: 「AI補助金ナビ」は、複雑で難解な補助金制度と、それを必要とする人々をAIの力で最短距離でつなぐ診断プラットフォームです。従来の補助金探しは、膨大な募集要項から自身に適合するものを探す手間が大きな壁となっていました。本プロジェクトでは、Vite/Reactによる高速なフロントエンドと、Vertex AIを活用した高精度な判定エンジンを構築。ユーザーの属性を入力するだけで、対象となる補助金の抽出から、申請の「根拠」や「最初のアクション」までを即座に提示します。 誰一人取り残さない補助金活用の民主化を目指し、アクセシビリティと信頼性を両立した体験を提供します
- 参加形態: チーム
- 参加者・チーム名: Tsukemen
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tarry008/articles/e2083ae82b61df
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-097 TSUTAWARU(ツタワル): 仮ナレーション入り動画を爆速で「公開品質」に仕上げる事に特化🍳 ブラウザ完結型AI動画エディタ

- 公式説明: 「これ音声付きの動画なら一発で伝わるのに…」そのもどかしさ、『TSUTAWARU』が解消します。 口頭でラフナレーションを吹き込んだ動画を用意するだけで、シーン分割・書き起こし・音声合成を担う3つのエージェントが自律連携し、爆速で公開品質の動画へ昇華。 操作マニュアルから製品デモ、教育まで。クラウド完結でPCスペックを問わず、あらゆる「説明」のコストをゼロにする、動画コミュニケーションの新しいインフラです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/enostech/articles/10f1009b79dab8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-098 『Future Memories』－旅行プランは「検索」から「体験」へ－

- 公式説明: 皆さま、観光地の混雑や、溢れる情報に旅行計画が面倒になった経験はありませんか？ 私たちが提案する「Future Memories」は、その課題を解決します。 このサービスは、あなたの顔写真と好みをAIに教えるだけで、「未来のあなたがその場所を旅している」様子を動画や画像でリアルに再現します。 もう、他人のレビューやランキングを延々と調べる必要はありません。 「Future Memories」は、旅行プランのあり方を「検索」から「感情を揺さぶる体験」へと革新します。 まるで映画の予告編のように、未来の感動的な旅行をプレビューし、あなたの心を動かす旅先との出会いを創造するのです。
- 参加形態: チーム
- 参加者・チーム名: コニーサワー
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/sawasawadawasa/articles/8efc40dcf84662
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-099 AI家事アプリ STOX

- 公式説明: AI家事アプリ「STOX」は、 料理を📸でカロリー計算、 冷蔵庫を📸でレシピ提案、 レシートを📸で賞味期限前にお知らせしてくれる、 「ありそうでなかった買い物・料理エージェント」です。 📸で解析したデータは 家にあるもの・ないものを自動で管理してくれて、 スーパーの棚ごとに並んだ買い物リストまで作ってくれます。 お気に入りレシピの管理もAIにおまかせで、 手順と材料を往復せずにレシピを見られる便利機能も揃っています。 「チャッピーは話し相手だけ」「AIが家事なんてできるわけ」 って思った人向けの超便利アプリができました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/bodkaapp/articles/24353fb6709814
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-100 Beyond Anxiety Cards

- 公式説明: SNS時代に生まれる漠然とした不安を「見える化」し、行動へつなげるWebアプリです。ユーザーが入力した不安をもとに象徴的なカード画像を生成し、客観視を促します。さらに、その不安に対する小さなアクションを提案し、カレンダーや履歴として蓄積。不安を消すのではなく、成長の軌跡として積み重ねていく体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hosazaemoooon/articles/5815fd374e0676
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-101 SENP_AI

- 公式説明: SENP_AI（センパイ）は、PC操作に迷うユーザーを「赤い矢印」で直接導く、PCに詳しい先輩のようなAIアシスタントです。 従来のAIはテキスト説明が主ですが、操作場所を特定できず、スクリーンショットを貼る手間に疲弊する課題がありました。本プロジェクトでは、Gemini 3 Flashのマルチモーダル機能を活用し、画面をリアルタイムに解析。操作すべきボタンの正確な座標を特定し、画面上にオーバーレイで視覚的なガイドを表示します。 「答えを代行する」のではなく、ユーザーの主体性を尊重し「自立を促す」体験を提供。Cloud Runによる高速なバックエンド構成により、誰もが迷わず操作を完遂できる、人に寄り添うAIエージェントの形を提案します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/osusoworks/articles/102ca2bfd06f7e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-102 せきゅトレ -電脳番付 サイバーランク-

- 公式説明: 攻撃者の視点を体験することでサイバーセキュリティを学ぶ教育ゲームです。 プレイヤーは情報収集からランサムウェア展開までの攻撃プロセスを疑似体験し、 個人情報の漏洩やランサムウェア被害がどのように発生するかを学びます。 具体的なシナリオを通じて、どのような行動がリスクを高めるか、どのようにそれを防ぐことができるかを理解します。 この体験を通じて、一般の会社員や学生をはじめとする幅広い層のセキュリティ意識と行動変容を促し、 サイバー攻撃の被害を減らすことを目指します。
- 参加形態: チーム
- 参加者・チーム名: チーム池田
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nishikawa_mko/articles/aa2f1743c423e3
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-103 Anatom-AI

- 公式説明: AIで直感的かつ柔軟な操作を可能にしたAtlasアプリ, Anatom-AIです。 人体の理解の本質の1つに臓器の立体的な配置の学問、すなわち解剖学があります。一般にatlasとよばれる解剖図アプリケーションを介して解剖の勉強を医師・医学部生は行っています。 しかし、そもそもの解剖があまりにも複雑なために、1つの解剖を理解するのに極めて煩雑な操作を伴っています。また、病気や手術など複数臓器が関与してくるような事象では、さらに複雑な操作が必要です。本プロジェクトでは多くの場面で専門家相当の知性を持ち、multimodal性能も高いGeminiを活用することで、「膵臓みせて」や「中大脳動脈が詰まるとどこが虚血になる？」など、煩雑な操作を要する課題解決を自然言語を介して可能にしています。
- 参加形態: チーム
- 参加者・チーム名: JCS 300 (Japan Changing System 300)
- 受賞: 最優秀賞
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: Anatom-AI - 自然言語で動かす3D人体解剖図
- 記事URL（文字列保存）: https://zenn.dev/jcs300/articles/5511ded660f522
- GitHub URL: https://github.com/chicken-salad/Anatomography
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-104 Agent Tavinikkiy

- 公式説明: 旅行の画像・動画をアップロードするだけで、AIエージェントが自律的にメディア分析・スクリプト生成・動画合成を行い、エモいショートVlogを自動生成するWebアプリケーション。「旅行の振り返りを AI で、簡単に、便利に、そして、もっとエモく」がコンセプト。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/o_ga/articles/637a25fbdc1179
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-105 Civitas Twin -仮想市民による社会反応シミュレーション基盤-

- 公式説明: 本プロジェクト「Civitas Twin」は、仮想市民による社会反応シミュレーション基盤です。年齢・価値観・立場の異なる多数のAIエージェントを生成し、施策や製品、メッセージに対する社会的反応を事前に実験・可視化します。単一の意見ではなく反応の分布として提示することで、炎上リスクや誤解が生まれるポイント、受容度の高い表現を意思決定前に把握可能にします。市場調査やSNS分析に頼らず、社会に出す前に社会を試せる、新しい意思決定支援インフラの実現を目指します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kiriko_tech/articles/f40a50b847a3c4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-106 相棒Reachyと楽しくドライブ！

- 公式説明: 〜助手席に座るのは、最高の相棒『ロボ』でした〜 「ひとりのドライブは少し寂しい」「渋滞中の退屈をなんとかしたい」「運転中に窓から見える景色について話したい」「車内で流れている曲に一緒にノリノリでノって欲しい」…… そんなドライバーの孤独を解消し、移動時間を最高にクリエイティブな体験に変える。 それが、フィジカルAI OSSロボット「ReachyMini」を相棒にした、次世代のドライブ体験です！ Geminiの圧倒的な知能を持ったエージェントと、物理的な身体がMCPを介して融合することで、ただの音声アシスタントではない、そこにいる安心感と楽しさを実現しました。
- 参加形態: チーム
- 参加者・チーム名: ビーバーズ・ハイブ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 音声・対話 / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/beavers_hive/articles/8d4d34d54bec1c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-107 SukimaNews

- 公式説明: 「SukimaNews」は、多忙な現代人が通勤や用事の隙間時間に効率よく情報収集できる、Agentic AI搭載のパーソナライズ型ニュースラジオです。 本サービスはGemini AIを活用し、日々溢れる膨大なニュースからユーザーの興味関心に合致するトピックを嗜好に合わせて収集・選別、スクリプト構成から音声生成までをシームレスに完結させ、まるで本物のパーソナリティが語りかけるような自然なナラティブを実現します。 「読む」から「聴く」への体験変革により、1分1秒の隙間時間を価値あるインプットへと変える、Google Cloudを基盤とした次世代のオーディオニュースサービスです。
- 参加形態: チーム
- 参加者・チーム名: Arvione AI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/louislee/articles/07ea1dce4eecf5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-108 MysteryMesh

- 公式説明: MysteryMesh は、マーダーミステリー（マダミス）の「人数が揃わない」「同じシナリオを二度遊べない」という2つの課題を解決するプラットフォームです。足りないプレイヤーの席を、自律的に嘘をつき推理するAgentic AIが埋め、Geminiがシナリオを無限に自動生成します。AIエージェントは独自の3層メモリと矛盾検出エンジンを持ち、人間と同じ卓でリアルタイムに議論・投票に参加します。Next.js + Firestore + Vertex AI構成で、マルチリージョンフェイルオーバーにより60〜120分の長時間セッションを安定稼働させます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hamutaro_kun/articles/20bb0cf7783e6f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-109 Judgment ― AI Agent ゼロトラスト実行基盤

- 公式説明: AI Agent を業務に導入したとき、「何が起きたか」は記録できても、「なぜその判断になったのか」を説明することは困難です。本プロジェクトは、AI Agent の行動を直接許可するのではなく、実行前の「判断」を第一級データとして永続化し、JWT + consume-one-time による一回性保証と、Envoy による構造的強制を組み合わせたゼロトラスト実行基盤を構築しました。AI Agent を止めるのではなく、責任を持てる状態を設計するプラットフォームです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ishiguchi/articles/20260215-ai-agent-zero-trust-governance
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-110 Threat Drill

- 公式説明: あなたのアプリ、本当に安全ですか？ Threat Drillは、生成AIで作られたWeb/APIを対象に、コード（GitHub/ローカル）と実行中アプリ（ステージング/サンドボックスURL）を横断して自動検査するセキュリティ診断基盤です。Red/Blue/Purple Teamの視点をAIエージェント化し、LLM特有の脆弱性（Prompt Injection、System Prompt漏洩、Excessive Agency等）と従来のWebリスクをまとめて可視化します。また、誤爆防止のため、ターゲット制約・サンドボックスHandshake・明示承認をデフォルトにしています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toshi_20/articles/e227454fe9bfff
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-111 ボートレースAI予想ファンサイト

- 公式説明: ボートレースサイトにはAI予想として三連単の結果が掲載されていますが、なぜそうなるのか説明が掲載されていません。AI Agentを利用することで、レース展開から結果を文字と画像で説明します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mahiguch/articles/ca8e19d03a2cdc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-112 Amu

- 公式説明: Amu（アム） は、GitHubリポジトリのURLを入力するだけで、ソースコードから「プロジェクトDNA」を自動抽出し、CM動画・プレゼンスライド・技術記事・製品仕様書を一括生成するMulti-Agent AIツールです。Gemini 2.5 Proを3つの専門エージェント（CTO・UIアーキテクト・クリエイティブディレクター）として並列稼働させ、技術分析・UI再現・コンテンツ戦略を同時に実行。Flutter製のクロスプラットフォームアプリとして、DesktopではローカルフォルダをWebではGitHub APIを通じて解析し、Cloud Runでデプロイされています。開発者がコードを書くことに集中できる世界を実現します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ibukinagase/articles/d96642bc6062eb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-113 寄り道マップ

- 公式説明: 寄り道マップは、ドライブ中の「どこか寄りたい」を自然言語で叶えるAIルートプランナーです。「途中で美味しいお蕎麦屋さんに寄りたい」と話しかけるだけで、Geminiがルート沿いのスポットを自動検索し、候補を提案。気に入った場所を選べば、ワンタップで Google マップのナビが起動します。複数アプリの横断検索も、カーナビへの手入力も不要。スポット探しからナビ開始まで、すべてが一つの画面で完結します。
- 参加形態: チーム
- 参加者・チーム名: ぎすぎす
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/iota/articles/ai-hackathon-yorimichi-map
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-114 つぎココ

- 公式説明: 旅行中の「次、どこ行く？」という気まずい沈黙を、全員の「ここ行きたい！」に変える合意形成ツールです。 最大の強みは、「情報の非対称」を埋める圧倒的なスピード感。一人がスマホで調べ、他の人が待つという時間をゼロにします。誰かがURLを共有した瞬間、AIが全員の画面にその場所の魅力を整理して一斉提示。全員が同じ情報を持つことで、「声の大きい人」の意見に流されず、フラットに相談できる環境を即座に作り出します。 アプリ不要、QR一つで迷ったその場で「全員が心から納得できる答え」を数分で導き出す。それが『つぎココ』の提供する価値です。
- 参加形態: チーム
- 参加者・チーム名: HCB
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hcb/articles/df662ed9c322c0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-115 HELLO VOID

- 公式説明: Hello, Void. は深夜に表面化する「痛みの検索」を信号として捉え、東京23区の地図上に“熱→光→霧”で可視化するプロダクトです。政策・制度のカバー度をVOID判定で示し、今夜できる1つの行動へ接続。LLM要約とe-Stat統計で根拠を補い、煽らず共鳴で包む体験で孤立の夜に小さな道筋を渡します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/neko_stack/articles/312b199e45b933
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-116 Living Tale

- 公式説明: Living Taleは、テーマを1行入力するだけで起承転結のある物語が育つAI物語生成システムです。語り手エージェントが第三者視点で物語を紡ぎ、各キャラクターの内心は独立したエージェントが自身の性格・目的だけをもとに生成する「Dual-Layer構造」により、作者自身も予測できない創発的な展開が生まれます。各フェーズではAIが「次に面白くなる展開」を3つ提案し、初心者からプロまで誰でも物語の舵取りに参加可能。Gemini 2.0 Flash × Imagen 3 × Cloud Runで構築し、1回あたり約$0.05〜0.10で動作します。「書く」のではなく「育てる」——新しい創作体験を提案します。
- 参加形態: チーム
- 参加者・チーム名: ADS'25
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/zunda_official/articles/435cab215d4f16
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-117 MiraIF（ミライフ）｜AIエージェントのマッチング代行アプリ

- 公式説明: マッチングアプリで「会ってみたら話が合わなかった」経験、ありませんか？ プロフィールを取り繕い、条件で絞り込む──この仕組み自体が限界に来ています。 MiraIFは、AIがあなたの「分身（Mirror）」となり、相手のMirrorと「もしもの会話」をシミュレーションして相性を確かめる、新しいかたちのマッチングアプリです。Mirrorは日常会話から性格・趣味・話し方を自律的に学習。5つのシチュエーションで会話をシミュレーションし、3回「いいかも」が揃えばマッチング成立。演じる必要なし、プロフィールを書く必要なし。AIという鏡に映った「自分らしさ」で、人とつながれます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/emuco/articles/2782865adf86cb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-118 Vibe Sliding AI

- 公式説明: Vibe Sliding AIは、コンサルティング業界で常態化している「作って直す」スライド制作プロセスを再設計するAIエージェントです。ストーリー設計から画像生成、PowerPoint変換までを一気通貫で自動化し、AIがドラフトを生成、人間が承認・改善する流れへと転換します。さらに、ユーザーの選択履歴を学習し、暗黙知を形式知化することで、組織全体のスライド作成精度を継続的に向上させます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/norix/articles/5ead9cecd91887
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-119 Rakuhuku

- 公式説明: 「毎朝、何を着よう？」——天気・予定・手持ちの服・好みを同時に考える服選びは、誰もが悩む多変数最適化問題です。Rakufuku（ラクフク）は、4人の専門AIスタイリスト（カジュアル・フォーマル・バランス・トレンド）がGoogle Cloud上で並列にコーディネートを生成し、オーケストレーターAIが天気API・Googleカレンダー・嗜好データを統合スコアリングして、最適な5パターンをImagen 4 Fastのマネキン画像付きで提案するマルチエージェントアプリです。スワイプ操作だけでAIが好みを自動学習し、使うほど「あなた専用のスタイリスト」に進化します。
- 参加形態: チーム
- 参加者・チーム名: Poltan
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/raorao/articles/b0f5e585ab6793
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-120 Ghost in the Archive

- 公式説明: 「Ghost in the Archive」は、デジタルアーカイブに眠る歴史的未解決事件や怪異を自律的に発掘・発信する、マルチエージェント型コンテンツ生成プラットフォームです。Google ADKとGeminiを駆使し、世界各地の一次資料調査から学際的な議論、多言語ナラティブ（7言語）の執筆、イラスト生成、音声制作までを全自動で実行します。「検証可能な事実」と「土地の記憶」を融合させ、独自のナラティブを構築。Vertex AIとCloud Runを基盤に、高度な推論と生成を組み合わせた次世代の自律型クリエイティブ・エコシステムを実現しました。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ai_kurogo/articles/ff4f4d45732ef6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-121 IKAI（イカイ）

- 公式説明: 社会人になると避けては通れない「怒られる」ことをAIによって疑似的に再現したサービスです。ユーザーはワークスペースを通して、ドキュメントやプログラムを提出し、リアルタイムでAIからフィードバックを受け取れます。怒られる温度感をユーザー自身がカスタマイズし、「怒られる」ことに慣れたり、実際の社会人になる前に心の準備を整えることができます。また、怒られる側だけでなく、怒る側が使用することで、AIから怒られたときに「怒られた人」がどのような気持ちになるかを理解し、実感につながるため、管理職のハラスメント研修にも活用できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/jinkutoriu/articles/6f0e5dbeee89be
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-122 撮るだけマニュアル

- 公式説明: マニュアル作成の時間を、本来の開発業務へ。「撮るだけマニュアル」は、画面録画から業務手順書を全自動生成するAIエージェントです。Gemini 3.0 Flashを活用した独自の「動画×画像」の2段階解析により、操作箇所の赤枠付与、個人情報のマスキング、テキスト生成までを自動化します。利用者からのフィードバック機能も備え、マニュアルの誤りや陳腐化を低減します。現場の属人化を解消し、変化に強い組織づくりとエンジニアの生産性向上を支援します。
- 参加形態: チーム
- 参加者・チーム名: ひとり情シス救済委員会
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/koichi73/articles/e726853482d639
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-123 MathDesk

- 公式説明: 「数学、どっからわからないのかわからない」という娘の相談から開発した数学AIチューター。学習指導要領に基づく382個のスキルを依存関係つきのマップで可視化し、「いま自分がどこにいるか」を一目で把握できる。Gemini 3 Proによる対話型コーチングは答えではなく「答え方」を教える方針で、誤りを検出すると前提スキルまで自動的に遡って診断する。2,800問以上のAI生成問題プール、部分点評価、数式キーボード、音声入力、手書きノート読み取りに対応。開発にはClaude Codeを活用し、AIペルソナによるバーチャルプレイヤーテストでUX改善も自動化した。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/orangewk/articles/031a5776986417
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-124 CircleMate

- 公式説明: CircleMateは、サークル運営で発生しがちな「情報の分散」と「集金・出欠の手作業」を解消するWebアプリです。イベントを軸にお知らせ・出欠・清算情報を一元化し、運営側の確認・催促負担を軽減します。さらにGemini APIを活用したAIチャットにより、集合場所や持ち物などを自然文で即座に確認可能。情報と行動をつなぎ、サークルが本来の活動に集中できる環境を実現します。
- 参加形態: チーム
- 参加者・チーム名: チームすし
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kana562/articles/dd1b34b47e6dcd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-125 Chatter 2 Chapter

- 公式説明: Podcastの音声コンテンツは増加の一方で、その内容を記事として二次展開するには「聴く →要点を構造化 → 執筆 →アイキャッチ作成 →入稿」と多大な手作業が必要であり、多くの配信者が発信機会を逃しています。Chatter 2 Chapterは、文字起こしテキストを投入するだけで公開可能な記事を自動生成する Google ADKマルチエージェントパイプラインです。5 つの専門エージェントが構造抽出・記事執筆・Imagen 4によるヒーロー画像生成と日本語タイトル合成・frontmatter付き最終出力までを一気通貫で処理し、数分で完成記事を得られます。ADKのSequentialAgentによる疎結合設計のため、エージェントの差し替えや追加が容易で、Cloud Run上で低コストに運用できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yukamiya/articles/baf9872a13a176
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-126 Beauty Mind

- 公式説明: Geminiを頭脳に持つ完全自律型AIエージェントです。Coordinator AgentがFunction Callingを駆使し、天気・予定・手持ちコスメ等の文脈を能動的に収集。最大14ターンの推論を経て、論理的に最適なメイクプランを構築します。 描画工程も自動化されており、MediaPipeによる精密マスク生成とImagen 3.0をCloud Tasks経由で連携。本人性を厳密に検証（Embedding類似度≧0.85）しつつ、高精度なプレビューを非同期で生成する、GCPフルマネージドのAgenticシステムです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/moose/articles/6e06fdac16b810
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-127 Claris

- 公式説明: 「Claris」は、孤独な開発作業を「ペアプログラミング」へと変える、Google Agent Development Kit (ADK) 製の自律型AIパートナーです。 既存のAIとは異なり、指示を待つだけではありません。GitHubのPRやエラーを能動的に検知して修正を提案したり、作業中のファイル拡張子に合わせて「人格（思考スタイル）」を変化させる「Soul Unison」機能で、最適なテンションと視点でアドバイスを提供します。 さらにFirestore Vector Searchによる長期記憶を持ち、文脈を理解した対話が可能。GeminiとCloud Runを駆使し、開発者の隣で自律的に走り続ける、新しい開発体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 音声・対話 / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/blacpans/articles/b6700809b61bc1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-128 PaperPilot

- 公式説明: PaperPilotは、論文探索・読解・整理・再検索を一体化し、研究の進め方そのものを支援する研究エージェントです。検索結果を分野の構造として提示し、重要箇所や気づきをメモとして蓄積、横断的に呼び出すことで調べ直しを減らし理解を段階的に深めます。関心の変化に応じて過去の知識を再提示し、試行錯誤を「やり直し」ではなく「前進」へ変換します。蓄積された知識はプロジェクト単位で整理され、引用や執筆にもつながります。AIが代わりに考えるのではなく、考え続けられる状態を支えることで、自分だけの研究スタイルを形にします。
- 参加形態: チーム
- 参加者・チーム名: cordes
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kamekingdom/articles/ebafb7d2f51dcc
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-129 Bookshelf Agent - あなたの読書を、AIがサポート

- 公式説明: 「Bookshelf Agent」は、日々の忙しさや意思決定疲れによる「読書の習慣化の壁」と、本を買って満足してしまう「積読の無限ループ」を解決するAIエージェントです。従来の単なる読書記録やリマインダーといった受動的なツールとは異なり、Agentic AIが「判断」と「実行」を代行します。ユーザーの積読状況、最後に読んだ日時、今の気分などをAIが総合的に判断し、「今、最適な一冊」を提案。「今日何を読もう？」と迷う負担をゼロにし、AIの伴走によって無理のない読書の習慣化をサポートします。
- 参加形態: チーム
- 参加者・チーム名: ASUKA
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kei_y0614/articles/14754113bac0f1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-130 行政秘書

- 公式説明: 行政秘書は、ユーザのプロファイル (自治体・世帯構成・収入の目安、直近のライフイベント等) をもとに、関連しうる公共支援制度を検索し、内容の理解から申請手順までを一気通貫で案内するAIエージェントサービスです。単に制度一覧を表示するだけでなく、制度の説明、手続きの流れ、参照元等の必要なポイントを整理して一気通貫で案内し、「知らない」「見つからない」「わからない」による機会損失を解消します。検索モードとチャットモードを備え、データベース化した制度情報を活用することで、正確かつ迅速な情報提供を実現しています。
- 参加形態: チーム
- 参加者・チーム名: Teletubbies
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/moriaki_slf/articles/9ffe167254fdb0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-131 tekuteq（てくてく）

- 公式説明: 「休日に動けない」「なんとなく不調」。 多くの現代人が抱えるなんとなく元気が出ない状態。散歩が回復の鍵だと分かっていても、心が疲れた時、人はどこへ行くかを決めるエネルギーさえ失います。 『tekuteq（てくてく）』は、そんなあなたの意思決定をAIに外注するアプリです。今の気分をAIと相談するだけで、AIが最短距離ではなく心の回復に最適なルートを提案。あなたは思考ゼロで、ただ靴を履くだけでいいのです。 「歩けた」という小さな事実は、失われた自信を取り戻す最初の一歩になります。tekuteqは、テクノロジーで心の健康を守る、あなた専属の処方箋です。
- 参加形態: チーム
- 参加者・チーム名: VIKINGS
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/vikings45th/articles/fb9be1dbf4220c
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-132 ding

- 公式説明: 対話ベースでフォームを作成・入力できるプロダクト。フォーム作成時はタイトルと目的を伝えてフォームを作成でき、フォーム回答時は質問に答えるだけでフォームを入力できます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/vanellope/articles/14bde50261c1a0
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-133 KOTOWARI Link

- 公式説明: 「KOTOWARI Link」は、日常の風景を「学びの入り口」に変えるARアプリです。 ふとした瞬間に感じる「なぜ？」に対し、スマホをかざすだけで、Googleの最新AIが対象を解析。噴水の放物線や橋の力学構造など、目に見えない科学法則をARで現実空間に直接可視化します。 検索の手間なく、目の前の現象と法則を直感的にリンクさせることで、「世界の解像度」を上げる体験を提供。単なる風景を意味のある構造として再認識させ、ユーザーの知的好奇心を自然な形で学問的な探究へと接続します。
- 参加形態: チーム
- 参加者・チーム名: KOTOWARI Link
- 受賞: 優秀賞
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 物理・空間連携
- 記事タイトル: 偶然の興味を、学問の入口へ — KOTOWARI Link
- 記事URL（文字列保存）: https://zenn.dev/sagara22/articles/81257d3d7f5f61
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Vertex AI / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-134 食事キロクマ

- 公式説明: 食事記録が続かない人向けに、楽しく気軽に食事記録をするアプリです。LINEで画像を送信するだけで、食事内容を反映したクマを生成し、食事によるクマの変化を楽しむことができます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/michan74/articles/65a0ecc47c9d7f
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-135 OUCHI-AI

- 公式説明: 「卵買ってきた」と話しかけるだけ。OUCHI-AIは、Discordの自然言語会話で在庫管理を自動化するAIエージェントです。GeminiのFunction Callingを活用し、専用アプリや複雑なコマンドは一切不要。「これ作りたい（URL）」と送れば、AIがレシピから必要食材を抽出し、Notion上の現在庫と突合して不足分を即座に判定することもできます。日常のチャットがそのまま管理台帳に変わる、TypeScriptとCloud Runで構築された新世代のスマートホーム体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pudiwarak/articles/ed3fc6b1f37cfa
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-136 SegMentor

- 公式説明: 画像から部品を正確に切り出し比較表を作る――このようなお客様視点での製品検証は開発現場で頻発する重要なプロセスですが、この手作業は3〜4時間を要します。SegMentorは2つのAIがタッグを組んで解決します。Segmentation AIがGemini 2.5 Proで高速に画像を切り出し、結果が不十分ならMentor AIが製造業の問題解決フレームワーク（現状把握→原因分析→対策立案→実行）で4段階の改善を支援。ユーザーは画像をクリックし曖昧な言葉で伝えるだけで、AIが技術的なプロンプトに変換。対話を重ねる中でAIへの指示の出し方も自然と身につく「AI共創型」ツールです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/so9/articles/5cf7d7172b09d9
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-137 Emotion ReadAR

- 公式説明: Emotion ReadAR（ERA）は、対面コミュニケーションに苦手意識を持つ人々を支援するXRコミュニケーション訓練システムです。 近年、オンライン交流の普及により対面での会話に不安を感じる人が増えています。特に恋愛や初対面のシーンでは、相手の感情を読み取れず、会話が続かない悩みが深刻です。 ERAはMeta Questを活用し、相手の表情から感情をリアルタイムで可視化。さらにAIが会話の文脈を分析し、次の一手を提案します。コンセプトは「コミュニケーションの補助輪」——使うほど自信がつき、最終的にデバイスなしでも自立したコミュニケーションができる状態を目指します。 将来的にはスマートグラスでの実装により、日常的な対面交流を支援する新時代のツールとなりうると考えています。
- 参加形態: チーム
- 参加者・チーム名: 調布恋AI連合
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/miyabi206/articles/5d73fdba36c75e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-138 MathLeaf

- 公式説明: 式変形で一度つまずくと、そこから先の見通しが立たなくなり、時間だけが過ぎていく。 そんな高校時代の私が苦しんだ「計算の壁」を取り払い、計算が苦手な学生にも「試行錯誤をぶん回す権利」を開放するのが『MathLeaf』です。 本アプリはGemini 3を活用し、ユーザーが「解法の方針」を指示するだけで、面倒な計算をAIが代行。計算の苦痛から解放され、本質的な「ロジックの理解」だけに集中できます。 最大の特徴は「思考の分岐」への対応です。行き詰まっても何度でもルート変更が可能。失敗した枝葉も含めGeminiが文脈を管理し、挫折せず安心して正解を探求する体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ymsy/articles/8853f169dd4fbe
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-139 Flexivel

- 公式説明: 本サービスは、旅行中の遅延を自律的に検知し、即座に「実現可能な新行程」を自動生成する旅行エージェントです。 ​最大の特徴は、トラブル発生時にユーザーが手を動かすことなく、AIが裏で勝手に「次の一手」を構築する点にあります。GPSと行程表を照合し、予約や営業時間に「物理的に間に合わない」状況をGeminiが即座に推論。警告を出すのと同時に、周辺スポットの営業状況や移動ルートを再解析し、最適化された代替プランを提示します。 不測の事態を「諦め」ではなく「新しい旅の発見」へと変える。刻一刻と変わる現場状況に合わせて行程を自ら書き換える「意思を持つ旅の栞」を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 地域・移動・観光
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kind/articles/8cf923f9431c66
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-140 BranchSpark

- 公式説明: アイデアを出して仮説検証や課題解決の行動に移していきたいとき、ブレストをAIとやっている人は多いと思います。既存のサービスでも、その場で議論が盛り上がり、有益な観点を得るということはできると思います。「あの時誰かが何とかって言っていたような・・・」「そういえばこの話を深めてきたけど、あの観点も深く掘り下げる価値があるんじゃないか？」というような有機的な議論の展開についてはどうでしょうか？ このプロジェクトは、それを実現する網羅的な対話を、１つのUIで実施できるべく作ったMVPです！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mushroom/articles/4041b078e5a157
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-141 Aether

- 公式説明: 「Aether」は、Gemini 2.5と音楽生成モデルLyriaを駆使し、あなたの人生を映画のワンシーンに変える「聴覚的AR」アプリです。 位置情報、天候、スケジュールといった断片的なコンテキストをAIが統合・解釈。「新宿の雨なら哀愁漂うサイバーパンク」「沖縄の晴れなら心躍るトロピカル」のように、その場所と瞬間に完璧に調和した音楽をリアルタイムで作曲します。 単なるBGMではなく、退屈な移動時間を「物語」へと変え、見慣れた風景をかけがえのない記憶として保存する。世界とユーザーを音で再接続する試みです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: リアルタイム / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/halogen/articles/b68e411563fead
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-142 AIRS - 獣害通報AI管理システム

- 公式説明: 獣害通報AI管理システムAIRSは、獣害通報における通報・管理・分析業務を一気通貫で自動化し、自治体の通報業務を最適化するシステムです。AIRSは、住民が通報するLINEアプリと職員が通報情報を管理・分析するシステムで構成されます。住民がLINEから通報すると、AIが対話形式で状況を聞き取り、写真の画像解析まで自動で処理します。管理画面では通報の一元管理から GIS地図・統計グラフによる傾向分析、AIが地図のレイヤー操作や周辺施設のマッピングまで行うAgenticな分析機能を備えています。AIRSを利用することで、電話対応・情報管理・分析業務が自動化され、職員が手作業から解放され、現場の判断と対応に集中できるようになります。
- 参加形態: チーム
- 参加者・チーム名: dx-junkyard モンキーハンターチーム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fooqoo/articles/eeeebf27353744
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-143 Daycast

- 公式説明: Daycastは、ToDoリストやカレンダーといった静的な記録に、天気や予定の空き枠などのリアルタイムな状況を掛け合わせることで、最適な行動を導き出すプロダクトです。 現在の状況をカレンダーtodoリスト、外部APIから得ることができた情報により多角的に現状を推論することによって、今この瞬間に優先すべきアクションを予報として提示します。タスクの整理や判断に迷う時間を最小化し、ユーザーが即座に実行フェーズへと移行できる体験を提供します。
- 参加形態: チーム
- 参加者・チーム名: めんたいふらんす
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/musiyaki/articles/b45b00770541d1
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-144 Enjo-Guardian

- 公式説明: Enjo-Guardianは、SNS投稿前の動画をAIがチェックし、炎上につながるリスクを事前に見つけてくれるツールです。動画をアップロードするだけで、AIが音声・映像・テキストを自動解析し、攻撃性・差別性・誤解を招く表現・迷惑行為などをスコア化。問題のある可能性が高い箇所をタイムライン上に分かりやすく表示し、修正ポイントの提案から編集対応までをサポートします。 企業のPR・広報担当者やSNS運用チームが「投稿してから気づく」リスクを減らし、ブランドの信頼性を守りながら、安心して発信できる環境を提供します。
- 参加形態: チーム
- 参加者・チーム名: ユニバック
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/rapirapi/articles/f73d8714294233
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-145 リンゴル - 英語学習DX

- 公式説明: 「リンゴル - 英語学習DX」は、効果的とされながらも面倒くさい英語学習をAIで効率化するアプリです。ユーザーが日常で触れたテキストや音声を取り込むと、Geminiが文字起こし・単語分割を行い、タップ一つで文脈に即した意味や用法を確認・保存できます。分からない文法もその場でAIに質問可能。さらに音声を一文ごとに自動分割し、リピーティング練習にも対応します。蓄積された学習データを元に、忘却曲線に沿った単語問題・文法問題・リーディング/リスニング問題をAIが毎日自動生成。既存の語学アプリがコンテンツを提供するのに対し、リンゴルはユーザーの日常にある英語を学びに変換する「英語学習の拡張」を目指しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/p05t_hum4n/articles/be809d28b1a976
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-146 learn k8s scenario

- 公式説明: learn k8s scenarioは自然言語で入力したKubernetes運用シナリオをAIで解析し、YAMLマニフェスト・日本語説明・Mermaid構成図として同時に生成/可視化することを目的としたプロトタイプアプリです
- 参加形態: チーム
- 参加者・チーム名: プルリクの多い料理店
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kyoto_chan_desu/articles/712871728612a4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-147 オンライン料理教室　告知AI

- 公式説明: 個人でオンライン料理教室を運営する中で、毎回1時間以上かかるLP・LINE・メールの告知作業が本業を圧迫していた原体験から生まれたシステムです。Vertex AI SDK経由でGeminiを呼び出し、教室のブランドガイドラインをシステムプロンプトに構造化。1回のリクエストで3チャネル分を一括生成し、Human in the Loopで承認後、LP公開・LINE配信まで自動実行します。Next.js(TypeScript)/Cloud Run/Firebase Hosting/FirestoreによるGCP100%構成で、無料枠内ほぼゼロ円運用。実際に自分の教室で使い、1時間が10分になりました。
- 参加形態: チーム
- 参加者・チーム名: 関西AIエージェント研究会
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ricopi/articles/99a4d3342bb1c5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-148 のぞハム

- 公式説明: のぞハムは、ファイル名に頼らず「内容」で全てを把握し、整理まで代行する次世代AIファイルエージェントです。Geminiのマルチモーダル能力を活かし、テキストやソースコードだけでなく画像の中身まで深く理解。自然言語による高度な検索はもちろん、「関連ファイルを整理して」といった抽象的な指示に基づき、AIが自律的にファイルの移動やフォルダ構成の最適化を実行します。散らかりがちなローカル環境を賢く管理し、ユーザーを煩わしいファイル管理から解放。本来の創造的な業務に集中できる究極のデスクトップ体験を提供します。
- 参加形態: チーム
- 参加者・チーム名: のぞハム
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/dds_kibi/articles/b35725208417f2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-149 Rap Dojo

- 公式説明: 「Rap Dojo」は、ラップ未経験者でも一瞬でオリジナルリリックを生み出せるAI駆動の自己表現ツールです。ヒップホップ最大の壁である「語彙力」と「韻（ライム）」の難しさを、Gemini APIを用いた2段階の生成ロジックで解決しました。わずか5秒で、あなたのプロフィールからキャッチーな自己紹介ラップを生成。BGMプレイヤー内蔵でその場ですぐに披露できます。イベントでのアイスブレイクから、新しい言葉遊びまで。テクノロジーの力で、誰もが手軽にカルチャーを楽しめる体験を提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/heysho/articles/36524b55055133
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-150 法律の脆弱性を攻撃して堅牢にするホワイトハッカーAI「Legal White Hat」

- 公式説明: 「194kmの暴走が危険運転にならない」 ニュースでそんな話をみたときに、法律って意外に脆弱なのかも。 そう思ったことがスタートでした。 法律の仕様漏れやバグに対処するには 日本には法律が多すぎる。 対応している人数が少なすぎる。 こういうとここそAIエージェントが役にたつのではないかと思い 法律の脆弱性を AIエージェントがホワイトハッカーとして攻撃し 堅牢性を高めていくシステム 「Legal White Hat」 をつくりました。 人ができない壁を突破するために AIエージェントの力を借りる形のイメージをつくれればと思っています。 どうぞよろしくお願いします！
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/senaiworks/articles/3d8a338c9d1c3a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-151 agentic-hackathon

- 公式説明: Google Cloud の Vertex AI (Gemini 2.5) を活用し、レシート画像を解析して市場価格と比較、さらに健康・フィットネスの観点からマルチエージェントが助言をくれる**「捜査本部 (Receipt Deca Extended)」**を開発しました
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 画像・映像・マルチモーダル / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/personal/articles/df55a22a496301
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-152 Taskal

- 公式説明: SlackやLINEといったチャットツール上の会話からAIが「やること」を読み取り、タスクとして自動で一元管理するプロダクトTaskalを開発しました。タスクが分散することで生じる認知負荷や探す手間を減らし、管理そのものからユーザーを解放することを目的としています。自然な会話の流れの中でタスクを生成・更新・完了できる体験により、意識せずともタスクが集まり、今やるべきことに集中できる環境を実現します。
- 参加形態: チーム
- 参加者・チーム名: タスカリ隊
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kyoka/articles/714669cd902bf7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-153 Cogno

- 公式説明: Cognoは、AIが自発的に進捗管理を行う次世代ワークスペースです。 従来のタスク管理ツールは「人間が情報を入力し、人間が確認する」前提で設計されています。その結果、週20時間が進捗確認だけで消え、PMの負担は極限に達しています。 Cognoは、Chat・Notes・タスク・外部ツールから情報を自動取り込み。AIが進捗を把握し、最適なタイミングで通知を送ります。さらに、軽いタスクはAIが先回りして進め、成果物のドラフトまで用意。チームメンバーは通知を受け取った瞬間に仕事を始められます。 指示せずとも、組織がまわりだす世界を実現します。
- 参加形態: チーム
- 参加者・チーム名: Cogno
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/cogno/articles/e5e855ddc63382
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-154 SHIORI

- 公式説明: SHIORIは、技術書の完読を支援するAI学習パートナーです。Vertex AI の Gemini 3 Flash 等を活用し、役割の異なる3つのエージェント（司書・レビュアー・スケジュール調整）が連携して学習を並走します。 主な機能は、目次画像からの学習構造の自動抽出、対話によるパーソナライズされた計画策定、ノート内容の高度な理解度分析、そして自然言語による柔軟なスケジュール調整です。Google Cloud のサーバーレス構成により、スケーラブルな学習環境を実現。複雑な推論が必要なレビュー工程には ThinkingConfig を導入し、質の高いフィードバックを提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 環境・一次産業
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/ryuuga89/articles/260eeb3bad3529
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-155 【朗報】ずんだもん、野菜になる。小学生のやしい植物教育を目指して。

- 公式説明: 子どもがアサガオを育てながらもスマホに気を取られている、そんな体験から着想したのが、本プロジェクトの植物と会話できるIoT教育デバイスです。文部科学省も重視する自然体験の価値を踏まえ、温湿度や土壌センサーのデータをもとに植物キャラクターが声で反応し、世話への関心を高めます。ハードはRaspberry Pi Foundation系デバイス、音声AIはGoogle Cloudを活用し、教育現場や家庭でも導入可能な構成です。デジタルの即時報酬と自然の成長体験をつなぎ、子どもの主体的な学びを促す仕組みを目指しています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 奨励賞
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話 / リアルタイム / 物理・空間連携
- 記事タイトル: 【朗報】ずんだもん、野菜になる。小学生のやさしい植物教育を目指して。
- 記事URL（文字列保存）: https://zenn.dev/rebun/articles/e07bea98f14c7d
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Compute Engine / Gemma
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-156 gemihub

- 公式説明: 答えるだけじゃない、動く AI GemiHub は、ファイルを読んで、必要な情報を探して、作業までこなしてくれる AI アシスタントです。外部ツールとの連携、ドキュメント横断の意味検索、繰り返し作業の自動化まで。データはすべてあなたの Google Drive に保存されます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/takeshy/articles/07f818ccd46418
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-157 FTR

- 公式説明: 「FTR」は、20年間確定申告の伝票整理に週末を奪われてきた開発者の実体験から生まれた、個人事業主のための経理自律化エージェントです。 領収書やカード明細の画像をアップロードするだけで、Google CloudのGeminiが画像を解析。日付や金額の読み取りに加え、文脈から適切な勘定科目を推論し、会計ソフトに直接取り込めるCSVを自動生成します。 単なるOCRツールではなく、判断を伴う経理パートナーとして機能するこのAIは、煩雑な記帳業務を劇的に削減。私たちに「心休まる休日」と「家族との大切な時間」を取り戻してくれます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mihyoshida/articles/276566be65e77e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-158 Promptman-MVP

- 公式説明: Promptmanは、記事を生成するのではなく「記事を生成させる設計図」を提供するツールです。多くのAIライティングツールは完成記事を出力しますが、ユーザーはAIに依存し、プロダクトはAPIコストに縛られます。Promptmanは、ユーザーの選択（note/Zenn/X）と意図を解析し、媒体別ルールを厳密に適用した「実行用プロンプト」を生成。ユーザーは自分の無料AIで実行でき、APIコストはゼロ。LLMアダプターパターンにより、Ollama/Gemini/Claude間の切り替えも.env一行で完結します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/eternal/articles/b312b1bbc64990
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-159 CAToC : Tier-3 サポートエンジニア業務のオーケストレーションAI

- 公式説明: CAToCは、高度な技術サポートを行う「Tier-3エンジニア」のための自律型AIコックピットです。 難解な障害対応において、エンジニアはログ解析や過去事例の調査で多忙を極めます。 CAToCはメール受信をトリガーに、Vertex AI SearchとGeminiがバックグラウンドで即座に解析を開始。 原因仮説の立案からポリシーに準拠した返信ドラフトの作成までを、人間が画面を開く前に完了させます。 エンジニアの仕事は、AIの回答をレビューして「承認」するだけ。 調査時間を極限まで圧縮し、エンジニアを創造的な業務へと解放します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mirai_techlab/articles/b18f86074bd101
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-160 FoundingAgent

- 公式説明: 創業融資の最初の壁、創業計画書。初めての起業家は「何をどう書けばいいか分からない」という悩みを抱え、作成に3-5日かかります。FoundingAgentは、Google CloudのVertex AIを活用し、AI対話で事業内容をヒアリングしながら、日本政策金融公庫の公式記入例を参考に創業計画書を自動生成します。作成時間を約半分に短縮し、有料コンサル不要で誰でも無料で利用可能。AI検証により整合性をチェックし、Excel形式で即提出できます。すべての起業家に、最高のスタートを。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hideoamezawa/articles/founding-agent-ai-business-plan
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-161 local-sidekick

- 公式説明: Local Sidekick は、カメラとPC操作をローカルLLMでリアルタイム解析し、眠気・集中切れ・過集中を自動検知して、必要なときだけそっと介入するアプリです。映像は一切デバイス外に出さないプライバシー重視の設計で、タイムラインによる集中パターンの可視化とVertex AIによる改善レポート生成により、「検知→介入→振り返り→改善」のサイクルを実現します。ポモドーロやTODOアプリと違い、ユーザーが何も操作しなくても機能する点が最大の特長です。今後は、キャリブレーションなどのパーソナライズ、時系列コンテキスト判定による推定精度の向上などを予定しています。将来的には、Sidekickの名の通り、集中以外の面でもユーザーを助けるツールへと進化させます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/okuma/articles/local-sidekick
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-162 MANZYUU

- 公式説明: MITSDAKEは、複業で案件をまたぐ人向けに、切り替えコストを下げる雑なメモ起点の実行支援アプリです。雑メモをAIで「やるかも」と「ナレッジ」に整理し、今すぐ着手すべき3つだけを提示。各タスクは次の一手まで具体化されるため、迷わず動き出せます。さらに案件タグでタスクとノートを同時に切り替え、必要な文脈を即座に揃えられるのが特長です。タスク管理より、着手の速さに焦点を当てています。
- 参加形態: チーム
- 参加者・チーム名: MANZYUU
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kiyogon/articles/e3e7869bcda548
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-163 AI JOKE RADIO

- 公式説明: 再生ボタンを押すだけで、AIラジオパーソナリティが笑えるトークを永遠に届けてくれるWebアプリです。Gemini 2.0Flashがスタンドアップ、漫才、大喜利などのお笑いコンテンツをリアルタイム生成し,複数の声で読み上げます。プリセット番組はもちろん、自分だけのオリジナル番組も作成可能。シャッフル再生やスリープタイマーなど、本物のラジオのような体験をブラウザだけで実現しました。通勤中や作業中のBGMに、AIが生成する笑いをどうぞ。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/armond/articles/88a7dfe08134cb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-164 キメボード

- 公式説明: 会議メモを貼るだけで、議事録から「決めるべきこと」＝決裁を自動で抽出します。決裁者・期限・判断基準などが足りないと、AIが不足を質問。回答を埋めると、その決裁は「決められる状態」になり、会議で意思決定しやすくなります。決裁に紐づくアクション管理や、次回会議のアジェンダ案の自動生成にも対応。社内プロジェクトの「決まらない」を減らし、会議を「決裁」で締めるためのB2B SaaSです。
- 参加形態: チーム
- 参加者・チーム名: 775533
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/higaso_oss/articles/713d610dd39737
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-165 Tabi

- 公式説明: 今までのBIツールは、エンジニアなどの専門家が現場のニーズを把握して、その要件に沿って１枚１枚スライドのように作成することになっていた。一方で、現場で使うユーザはグラフを見て判断できるほど、複雑な問題に直面したときにどう使って良いかわからないし、またエンジニアに依頼して、作り直していると時間がかかってしまっていた。Tabiは、この構造をAIエージェントで根本から変えます。エンジニアは「画面作成」から解放され「データ管理」に専念。現場ユーザーは「ツールの操作」ではなく「知りたいことの言語化」に集中するだけで、必要な分析結果を即座に手にできます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/koumei234/articles/656f735a05d687
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-166 syufy(シュフィ)

- 公式説明: syufyはレシート1枚で食材管理から献立提案までを自動化するWebアプリです。Gemini AIがレシート画像から食材名・数量を構造化出力で正確に抽出し、在庫に一括登録。賞味期限の自動推定と期限アラートに加え、期限が近い食材を優先活用するレシピをAIが料理写真付きで提案します。調理実行時には使用食材の在庫を自動減算し、常備品は減らさない設計。ファジーマッチングによる表記ゆれ吸収や密度テーブルによる単位換算など、実用性にこだわりました。買い物から消費までの食材ライフサイクルをシームレスに管理し、家庭の食品ロス削減と毎日の「今日何作ろう？」を同時に解決します。
- 参加形態: チーム
- 参加者・チーム名: チコボウズ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/hidaken/articles/ddd085d1f4ad88
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-167 Kami Treasure Battle

- 公式説明: コンビニなどのセルフレジをよく使う人向けに、レシートが取られず溜まり続ける“モヤッ”を、気持ちよく解消するプロダクトです。レシートを撮ると購入内容から世界に1枚のカードが生まれ、集めたり対戦したりして遊べます。紙の回収をエンタメに変え、ガチャのような「何が出るかな？」のワクワクで内発的に動けるから、レシート回収が自然と習慣に。「もらう理由」ができて、最後まで気持ちよく退店できます。毎日の買い物が少し楽しくなります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/whitedoor/articles/cdc524fdf8dcb4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-168 アイデア生成AIエージェント AI Thinking Partner

- 公式説明: 生成AIチャットの一問一答型が抱える「思考の全体像が見えない」「発想が広がらない」という課題に対し、AIの思考をノードとエッジで可視化するアプリを開発しました。思考の探索（可視化）、AI同士の多角的議論、即時プロトタイプ生成までを一気通貫で行い、0→1のアイデア創出と構想整理を支援します。
- 参加形態: チーム
- 参加者・チーム名: WestComAI
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/oreoreo/articles/0bf569141c4891
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-169 SIRISA

- 公式説明: SIRISAは高校生用の質問投稿サイトである。 SIRISAは従来のような質問投稿サイトに生成AIの機能を組み合わせることで、質問する側も質問される側も負担を軽減することを実現したシステムである。 生成AIによる独自機能として、具体的には、質問の即時回答・HTMLで回答することによるグラフの使用や思考過程の把握の容易化、回答文章中の任意の単語の注釈を自動生成、AI返信機能などを追加した。 今までの質問投稿サイトとは異なり、AIの回答をベースとして人間の回答者が手を加えていくことで質問の回答を作り上げることで、AIが苦手とする情報の正確性や人間らしい複雑なタスクなどを人間が補うこと、人間が苦手な量的なタスクをAIが補うことが可能となる。
- 参加形態: チーム
- 参加者・チーム名: ryotaka
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nk2005/articles/sirisa_overview
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-170 Doppo

- 公式説明: Doppo は、行政手続きや窓口システムなどのWebフォームに対し、音声・テキスト対話でUI操作を支援するエージェントです。デジタル庁が住民向けサービスのDX推進を掲げる一方、端末操作に不慣れな高齢者や外国人が複雑な入力フォームに戸惑い、窓口業務の圧迫や手続の途中離脱が課題となっています。チャットボットをはじめとする従来の技術では「いま目の前の画面で何を入力すべきか」という個別具体的な質問に答えられません。Doppoは「いま見ている画面」をリアルタイムに理解し、ユーザーの疑問にその場で応答することで、操作を代行せず安全に手続き完了まで導きます。既存のWebサイトにscriptタグ1行で導入可能です。
- 参加形態: チーム
- 参加者・チーム名: うまみ工房
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話 / 個別最適化 / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pepepepepepepe/articles/77b7f874c37662
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-171 Liverty Music

- 公式説明: 「あのライブ、気づいた時にはもうチケットの申込期間が終わってた…」 こんな悔しい思いをしたことはありませんか？熱心なファンほど、公式サイト、SNS、メールと情報を追うのは本当に大変ですよね。 私たちが開発するアプリは、そんなあなたのための「ライブ専門のパーソナルアシスタント」です。一度アーティストを登録すれば、あとは重要な情報だけがプッシュ通知で届きます。 もう、あなたから情報を見つけに行く必要はありません。このアプリが、あなたの音楽ライフをより充実させる最高のパートナーになります。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/pannpers/articles/1037c93e2cc47a
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-172 medigate-ai

- 公式説明: MediGate AIは、体調不良時に「何科に行けばいい？」「今開いている近くの外来は？」という迷いを減らす受診ナビです。適切な診療科にかかれず受診が回り道になり、結果として医療費や時間の負担が増える課題に着目。症状を自然文で入力すると、Gemini（Vertex AI）が追加質問→推奨診療科と注意事項を生成。現在地/主要駅を起点に約7.7万件のクリニックCSVから距離・受付中/終了間近・次回受付開始を算出し一覧表示します（診断は行いません）。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/toshikusa/articles/4e150492c9ec76
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-173 Mental Debugger System

- 公式説明: MDSは、心の不調を「自己のバグ」と捉え、AIとの対話を通じて客観的に原因究明・解決を図るナレッジシステムです。感情に流されず課題を特定し、具体的なアクションを提示。解決プロセスを「進化の記録」として蓄積・資産化することで、ユーザー固有の価値観分析や類似課題への再発防止に役立てます。悩みを単に解消するだけでなく、自己成長の糧へと変えるサイクルを提供します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shinry/articles/72f6bea55a642e
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-174 ARTESTERISM

- 公式説明: ARTESTERISMは、美術館と来場者をAIとデータでつなぎ、鑑賞体験と美術館運営の双方を支援するプラットフォームです。Geminiによるレベル別・多言語の作品解説生成と、BigQueryのエンベディングを活用した作品レコメンドにより、来場者には自分の興味度に合った鑑賞体験を提供します。同時に、作品単位のフィードバックデータを可視化・分析することで、美術館の展示改善や経営判断を支援します。大規模美術館から中小規模美術館への回遊を促進し、日本の美術館体験の持続的な発展を目指します。
- 参加形態: チーム
- 参加者・チーム名: Akakura
- 受賞: 奨励賞
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化
- 記事タイトル: 【ARTESTERISM】-美術館体験を「点」から「面」に- 来場者と美術館の双方に新しい価値を届ける次世代プラットフォーム
- 記事URL（文字列保存）: https://zenn.dev/akakura16/articles/9437cc784031c5
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Run / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-175 nagi - 自律型秘書AI

- 公式説明: 『nagi』は、「人々をタスク管理における不安と労力から解放し、創造的な仕事に注力できるようにする」ためのアプリケーションです。 やることは、頭の中のカオスを音声やチャットで「吐き出す」だけ。あとは自律型エージェントが、文脈を理解し、タスク化・分解・スケジューリング・リマインドまでを全自動で代行します。 タスク管理というすべての仕事人に降りかかる「仕事のための仕事」の負荷ゼロにし、創造的な仕事に没頭できる&quot;凪&quot;へ足を踏み入れましょう。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mugi007/articles/a4b3bb53efe3ce
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-176 AIZAP

- 公式説明: 健康アプリの30日継続率はわずか数％。原因は運動・食事・睡眠にまたがる複雑な意思決定を毎日自分で行う負担です。AIZAPは、Google ADKで構築されたマルチAIエージェントが協業するLINE健康管理アプリ。目標設定から日々の記録、振り返りまで役割分担しながら一貫サポートし、健康習慣の継続を実現します。
- 参加形態: チーム
- 参加者・チーム名: Banana Brothers
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 医療・健康
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/heyhey1028/articles/ai_agentic_hackathon_vol4_aizap
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-177 COCO

- 公式説明: 「あれ、リモコンどこ？」人生で146日も費やす探し物の時間。CoCoはそんな日常の課題を解決し、実世界に干渉できるAIパートナーです。 Geminiの映像理解とVertex AIで部屋の状況を記憶し、ADKを用いたマルチエージェント構成で高度な推論を実行。「鍵どこ？」への即答や、カレンダーから「ジムバッグかも？」と提案します。 さらにobnizと連携し、自律的に視線を動かして死角を探索。常に傍に寄り添い、人とAIがシームレスに共存する未来を描きます。
- 参加形態: チーム
- 参加者・チーム名: CAPEPOINT
- 受賞: 奨励賞
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / マルチエージェント / 物理・空間連携
- 記事タイトル: 【COCO】「ドコ？のヒントはココにある」お部屋の探し物AIパートナー
- 記事URL（文字列保存）: https://zenn.dev/takoeno/articles/ae8e042de0fb62
- GitHub URL: https://github.com/h4ckberry/coco-gcaihack4
- デモURL: 不明・未確認
- 明示技術: Cloud Functions / Vertex AI / ADK / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-178 Curation-Persona

- 公式説明: Curation Personaは、RSSフィードから記事を自動収集し、ユーザーの評価履歴を学習してパーソナライズされたスコアリングを行うAIリサーチプラットフォームです。A2Aプロトコルで協調する3つのGeminiエージェントが、記事収集・関連度評価・深掘りレポート生成を自律的に実行します。異業種フィードバックやMCPサーバーによる連携も備えています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/bh_ren/articles/71e5be805c18d7
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-179 PLURA（プルーラ） — Flash Teaming Network

- 公式説明: AI Agentの急速な発展により社会構造は大きく変化します。固定化されていた組織は柔軟で即応性のあるネットワーク、Liquid Organizationへと変化し、必要な瞬間に必要な才能が結びついて課題を解くフラッシュチームが次々に生まれては解散するようになります。価値の中心も「管理」から「接続」へ移り、成功談だけでなく未完成のアイデアや試行錯誤、失敗の記録が次の挑戦を加速する資源として循環していきます。 そのような社会に向けて、共通のビジョンと課題意識を手がかりに、個々の思考ログや試行錯誤から欠けたピースを見つけて組み合わせ、必要な瞬間にフラッシュチームを立ち上げて駆動する仕組みを提案します。
- 参加形態: チーム
- 参加者・チーム名: dx-junkyard
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 行動・ワークフロー
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/uras/articles/b3cf8578668440
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-180 RAPID Agent

- 公式説明: 最新論文が年々増え続ける中、AIの研究者にとって、「関連論文を探し、ある観点で仕分ける」ことは大きな負担になっています。LLMを用いた検索は候補は入出力制限やコンテキスト制限、検索精度の限界などにより網羅性が低く、多数の論文をカテゴリ分けするのもまだ手間がかかる作業です。 そこで、私たちはRAPID Agentを開発しました。これは、CVF Open Access上の大量の論文を対象に、「探す」と「仕分ける」を高速化するツールです。ベクトル埋め込みによる検索と、自然文で指定した観点からのカテゴリ集合生成により、論文調査の速度と網羅性を両立できます。
- 参加形態: チーム
- 参加者・チーム名: D魂
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/murakawatakuya/articles/8a621a8c56aacb
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-181 alche:me

- 公式説明: 「手持ちコスメで、まだ見ぬ私に出会う」。 alche:meは、眠ったコスメから無限の可能性を調合する自律型AIエージェントチームです。Google ADKとGeminiを活用し、「鑑定」「調合」「トレンド分析」などの専門家が協調。ユーザーの所持品・天気・予定を解析し、買い足し不要な「今日の一顔」を仕上がりプレビューと共に提案します。さらに「あと1つあれば、3つの新しいルックが楽しめる」といった戦略的な提案により、在庫活用と購買意欲を両立。レシピ共有によるコミュニティ機能も備え、個人の課題解決を集合知へ昇華させつつ、美容体験を「検索」から「提案」へと再定義するプラットフォームです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 生活・家事・買い物
- 機能シグナル（キーワード推定）: 知識・調査・RAG / マルチエージェント
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/khoorzruog22/articles/dc018a8d904082
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-182 HomeOfficeAI

- 公式説明: 「やる気はあるのに、家だとどうしても集中が続かない」 HomeOfficeAIは、そんな悩みをIoT×AIで解消し、自宅を「勝手に集中させてくれる空間」へ変えるプロダクトです。最大の特徴は、AIがWebカメラを通じてあなたの状態を理解し、照明・音楽・空調を自律的に操る点です。デスクに座れば即座に集中モードへ、居眠りすれば適切な仮眠後に覚醒を促すなど、環境側があなたに合わせて変化します。操作は一切不要です。座るだけで、そこがオフィスになる。意志の力に頼らない、新しい時代の働き方を提案します。
- 参加形態: チーム
- 参加者・チーム名: トモビ
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/shinya337/articles/2d7728b4810399
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-183 Assistant

- 公式説明: Google Gemini APIを活用したマルチモーダルAIアシスタントです。会議中のリアルタイム音声認識・28言語間同時通訳により、国際的な会議でも言語の壁を超えたコミュニケーションを実現します。画面共有内容の自動解析、RAG技術による関連資料の即時参照、Co-Pilotモードでの議題管理と進行サポート、会議後の自動要約・議事録生成など、ミーティングの全プロセスをAIがアシストします。音声対話、文書参照、画面解析を統合したElectronベースのクロスプラットフォームアプリケーションで、ビジネスコミュニケーションの生産性を劇的に向上させます。
- 参加形態: チーム
- 参加者・チーム名: Assistant
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / リアルタイム
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/meruhappy/articles/62f0fd5d5edd07
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-184 ただ、言葉を記録する、 Agentic AI スマホアプリ Alithea

- 公式説明: 声を言葉にして、記録し、あらゆるAINativeワークに、自らの意志を展開できます。 AI時代、声を文字にすることができるようになり、自らのうちなる言葉にきづける体験と、AI生産性に寄与します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: その他・分類不能
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/peco6/articles/255e4d2c9831c2
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-185 Amibuddy - AI driven homework assistant powered by Google cloud

- 公式説明: 「ママ、私の絵がしゃべった！」 小1の娘が「宿題やりたくない」と言うのを見て、エンジニアママが立ち上がりました。**AmiBuddy**は、子供の落書きを**Google Gemini**と**Meta SAM 2**の力で「生きたAI家庭教師」に変えるアプリです。 ただ絵が動くだけではありません。Geminiの視覚機能で宿題（プリント）を読み取り、ElevenLabsで生成された「自分の絵の声」で、優しくヒントを教えてくれます。「勉強しなさい」と言う代わりに、「バディと一緒に冒険しよう」と言える世界へ。 最新AI技術を駆使して、親子の学習時間を孤独な戦いからワクワクするエンターテインメントに変えます。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 不明・未確認
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mungunshagai/articles/0f9bc0b08e4815
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-186 テツナビ（手続きナビ）

- 公式説明: 日本では年間約700万人が引越しをし、1回あたり行政・民間合わせて20〜30種類の手続きが必要です。しかし真の課題は手続きの多さではなく、「知らないことは検索できない」という構造にあります。テツナビは、引越し元・先・日を入力するだけで、5体のAIエージェントがユーザーの状況に応じた手続きを自律的に洗い出し、必要書類・管轄窓口・タイムラインまでを一気通貫で提示します。
- 参加形態: チーム
- 参加者・チーム名: 775533
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 福祉・公共
- 機能シグナル（キーワード推定）: 知識・調査・RAG
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/nakabayashiy/articles/5b738ea1ecc4e4
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-187 Parallel AI

- 公式説明: ハッカソンに出場するために考えたアイデアは、ステークホルダーが本当に必要とするか、ヒアリングで検証が必要不可欠である。このとき、身の回りの人にGoogle Formなどでアンケートを取ることがほとんどだと思う。 しかし、Google Form含む既存のフォームサービスでは定型化された質問(一問一答形式など)しか投げることができず、インサイトの深堀りには不足する部分がある。 そこで、定型化された質疑応答で終わらない、短い時間でヒアリング価値を最大化させるサービス｢Parallel AI｣を提案する。 既存のフォームサービスとは異なり、ユーザーが求めるゴールに対してAIが必要なソース･戦略を収集し、ヒアリングルームを作成する。ヒアリング対象者は、AIによるチャット形式による対話で質疑応答をするだけ。最終的に集まったチャット郡をアナライズし、一問一答では得られなかった結果やインサイトを可視化する。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/kz25/articles/f68cedbb0969ac
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-188 ZAX

- 公式説明: 「人間関係を通じて、人はどこまで幸福になれるか」を追求する、長期的な自己変容支援プラットフォームです。 単なるマッチングで終わらせず、ユーザーがどのような対人関係を築き、その過程でどのように考えが変化し、何を感じたのかをデータ化。独自の解析により、一過性の出会いではなく、ユーザーを長期目線で幸福にする「最適な関係性のサイクル」を導き出します。 表層的な条件ではなく、関係性の中での『変容』を価値基準に置くことで、ユーザーの精神的な成長と持続的なウェルビーイングをサポート。対人関係の履歴を「幸せへのロードマップ」へと転換し、人間がより深く、豊かに生きるための新たなインフラを目指します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 開発・IT運用
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/fumi3333/articles/d665bb7e500dd6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-189 Smart Play Counselor

- 公式説明: 「今日、何して遊ぶ？」——幼稚園から帰ってきた子どもの無邪気な一言に、答えに詰まった経験はありませんか。つい YouTube を見せてしまう罪悪感、毎回同じ遊びのマンネリ、買ったのに使いこなせないおもちゃたち。これは親の怠慢ではなく、情報が足りないだけです。Smart Play Counselor は、子どもの年齢・興味・発達段階と家にあるおもちゃを AI が分析し、「この子に、今日、この30分で最適な遊び」を提案します。おもちゃは写真を撮るだけで自動登録。遊んだ後のフィードバックで提案は日々進化します。保育の専門知識を AI の力ですべての家庭に届け、親子の時間をもっと豊かにするアプリです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/tarooo37/articles/25b23aef7fa3b6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-190 Prompt Morpher

- 公式説明: 【課題】 生成AIへの指示が曖昧で期待通りの回答が得られない、または自身の意図をうまく言語化・構造化できないユーザーが多いこと。 【解決策】 断片的なキーワード（Input）から対話形式で意図を段階的に具体化するアプリ。AIが「方向性」を提案し、不足情報を穴埋め形式でヒアリングすることで、誰でも熟練者レベルの高品質なプロンプトを作成できる。 【提供価値】 AIとの不毛な修正の往復（ラリー）を激減させる。さらに、回答そのものだけでなく、それを生み出した「再利用可能なプロンプトの型」も同時に提供することで、ユーザーの資産として蓄積可能にする。
- 参加形態: チーム
- 参加者・チーム名: Local Novel LLM Project
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yuutti/articles/e1a363fb7322dd
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-191 VidManual - 動画から自動生成する多言語マニュアル作成ツール

- 公式説明: VidManualは、操作動画から多言語対応の手順書を自動生成するWebアプリケーションです。 業務現場では「動画はあるが検索できない」という課題があり、従来は手作業で数時間かけてマニュアルを作成する必要がありました。 本ソリューションは、Google Geminiのマルチモーダル能力を活用し、音声解説と画面操作の両方を解析。 最適なスクリーンショットタイミングをAIが自動選定し、ステップごとの構造化された手順書をWord形式で出力します。 既存の録画済み動画をそのまま活用でき、10言語へのワンクリック翻訳にも対応。Cloud Runでサーバーレス実行し、社内教育・カスタマーサポート・プロダクトドキュメント作成の工数を大幅に削減します。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 教育・学習
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話 / 画像・映像・マルチモーダル / 個別最適化
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/yukkie1114/articles/7b85d090f0e308
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-192 BrickQuest

- 公式説明: 家にLEGO好きの子供が2人。遊ぶうちに説明書はなくなり、パーツだけが残っていきます。「捨てるのはもったいない、何か作れないか」から始めたプロジェクトです。主な機能が2つあります。「マイブリック」ではブロックを撮影・アップロードするとAIがパーツを自動認識しコレクションとして管理、そこからGemini AIが組み立て手順を生成します。「デザイン」では参考画像からLEGO正射投影ビューを生成し、承認後に組み立て手順へ変換します。いずれも3Dワークスペースでステップごとに回転・拡大しながら確認でき、足りないパーツはBrickLink購入リストとして出力可能です。家に眠るブロックにもう一度遊ぶ理由を作りたいアプリです。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 優秀賞
- 主分類（キーワード推定）: 創作・メディア
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 画像・映像・マルチモーダル / 物理・空間連携
- 記事タイトル: LEGOの組み立て説明書をAIが自動生成 — 物理エンジンで「やり直し」させるAgentic AIの仕組み
- 記事URL（文字列保存）: https://zenn.dev/parklab/articles/33f9058ea00231
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: Cloud Functions / Gemini API / Firebase
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / article-checked
- 注記: 不明・未確認
### V4-193 リモートワークで滞留しがちなタスクを解消するAIエージェント

- 公式説明: リモートワークのチャット業務で起きやすい「タスクが止まっている状態」を自動で見つけ、支援できるメンバーを提示するAIシステムです。チャットログをもとに担当者がタスクを保持している時間を分析し、通常より長く止まっている場合に停滞として検知します。さらに、過去のやり取りから専門分野を推定し、余裕のある適切なメンバーを選定して介入メッセージを生成します。数理モデルとAIエージェントを組み合わせ、チームのタスク進行を円滑にすることを目的としています。
- 参加形態: 個人
- 参加者・チーム名: 不明・未確認
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 知識・調査・RAG / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/mie000012/articles/734c3f9ce8e3e6
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-194 Vlog agent

- 公式説明: 「動画を毎日見ているのに、自分では1本も投稿したことがない」——私たち大学生チームが同世代に広く感じてきたこの乖離の正体は、編集スキルの不足ではなく、企画・撮影・編集という制作フロー全体の分断にあります。ZennVlogは、AIエージェントとのチャットで撮影構成を決め、セグメント単位のガイドで撮影を進め、字幕・BGMまで統合して書き出す、企画から完走まで一気通貫のiOSアプリです。Vertex AI GeminiのFunction Callingを中核に、会話入力を具体的な制作アクションへ変換するAgentic設計で、「まず1本完成させる」体験を誰もが手にできるものにします。
- 参加形態: チーム
- 参加者・チーム名: Treasure
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: コミュニケーション
- 機能シグナル（キーワード推定）: 音声・対話 / 画像・映像・マルチモーダル
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/as_atushi/articles/7a80dd5c676444
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
### V4-195 Helm

- 公式説明: 会議は動いて見えても、意思決定が止まっていませんか？Helmは、意思決定の詰まりを会議・チャットから検知し、AIが人を呼び出して「次に誰が何を決めるか」まで落とし込む一気通貫のAIエージェントです。タスク管理ではなく意思決定プロセスに働きかけ、撤退判断の早期化やリスク報告の漏れ防止を支援。人は舵を取る。AIは船でありパドルでありレーダーである——そんな新しいヒト×AIの関係を目指します。
- 参加形態: チーム
- 参加者・チーム名: 褒めJAWS
- 受賞: 公式結果上は受賞なし
- 主分類（キーワード推定）: 業務・経営
- 機能シグナル（キーワード推定）: 行動・ワークフロー / 音声・対話
- 記事タイトル: 不明・未確認
- 記事URL（文字列保存）: https://zenn.dev/charles_389no/articles/f4adff7b7bcaf8
- GitHub URL: 不明・未確認
- デモURL: 不明・未確認
- 明示技術: 不明・未確認
- 公式一覧URL（文字列保存）: https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol4?tab=projects
- 確認日・状態: 2026-09-10 / official-list-only
- 注記: 不明・未確認
