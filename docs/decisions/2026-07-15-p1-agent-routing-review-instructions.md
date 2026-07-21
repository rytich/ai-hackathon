# 判断: エージェント使い分け・インラインレビュー・指示の型を AF に組み込む

## 日付
2026-07-15

## 背景 / 課題
外部記事の調査（[../planning/research/2026-07-15-claude-code-guide.md](../planning/research/2026-07-15-claude-code-guide.md)）で、AF に 3 つの構造的ギャップが判明した。

1. `codex-claude` で複数 AI を有効化できるが、**どちらをいつ使うかの基準が皆無**。AGENTS.md は「どちらで作業する場合も同じ規約」と書くのみで、実質同一視していた。
2. 「企画と実作業を分離する」と決めたのに、**企画成果物（`docs/planning/`）に対する人間の承認手段が未定義**。レビューは PR ベースのみで、PR になる前の plan / 要件をレビューする導線が無かった。
3. Done の定義や real-use gate など**出力側の規律は厚い**が、**入力（指示・Issue 記述）側の規律がほぼ無かった**。

## 選択肢
- A: 3 件とも見送り、現行のまま運用する
- B: 3 件を既存ドキュメントへの追記で組み込む（採用）
- C: 新規ドキュメントを 3 本立てて体系化する

## 決定
B を採用。

- **Task Routing**: `ai-environment-profiles.md` にタスク種別 × 推奨エージェントの表と運用ルールを追加。
- **Inline Review**: `collaboration-rules.md` に節を新設し、企画成果物を実装着手前にレビューする導線を定義。`quality-gates.md` のレビューチェックリストにゲートを追加。
- **Instruction Pattern**: `collaboration-rules.md` に What/Why/How の型を定義し、Issue テンプレートに Why / How 欄を追加。
- 3 件とも root/template の `AGENTS.md` と全 profile entrypoint に 1 行ずつ反映。

## 理由
- いずれも既存構造（profile / collaboration-rules / quality-gates / Issue テンプレート）に素直に乗るため、C のようにドキュメントを増やすと参照先が分散し `map, not manual` の原則に反する。
- 既に `codex-claude` を導入済みのプロジェクト（ten_matcha、bonsmith_corporate）へ即座に効く。
- A は、特に 2 番目のギャップが AF 自身の「企画と実作業を分離する」という宣言と矛盾したまま残るため採用できない。

## 情報ソース
- 梶谷健人「この3連休でClaude Code活用力をワンランクアップしたい人のためのリーディングガイド」: https://note.com/kajiken0630/n/n1b83b7f15d55
  - **リーディングガイド形式**で詳細はメンバーシップ限定。取得できたのは論点のみで、実装は AF 文脈での再構成。
- crit（ローカルのインラインレビューツール）: https://crit.md / https://github.com/tomasz-tomczyk/crit

## 影響範囲
- 編集: `AGENTS.md`、`docs/framework/{ai-environment-profiles,collaboration-rules,quality-gates}.md`、`templates/project/AGENTS.md`、全 profile entrypoint（5 ファイル＋copilot）、`templates/project/.github/{ISSUE_TEMPLATE/agent-task.md,pull_request_template.md}`
- 新規: 本ファイル、`docs/planning/research/2026-07-15-claude-code-guide.md`

## 却下した案・再検討条件
- **レビュー手段を Notion にする案**（記事の例）は却下。外部サービス依存が増え、AF の「repository 内の成果物だけで再現する」という目的に反する。git 内で完結する crit を推奨としつつ、ツール未導入のプロジェクトは PR インラインコメントで代替可能とした。**特定ツールへの依存は作らない。**
- **P2 として保留**: 非エンジニアの参加経路（AF が Git/PR 前提である一方、`knowledge-base.md` の維持機構表は非開発カテゴリの主担当を非エンジニアと定義しており矛盾が残る）、学習の昇華経路（work-note → `.agents/skills/`）、対外成果物の出力形式。
- **見送り**: AI 活用スキルマップ（人材評価は AF スコープ外）、UX メソッド・デザイン品質（AF は技術スタック非依存が原則）、Mac 自動化（端末固有）、仕事と私生活を 1 フォルダに同居（AF は repo 単位の設計と衝突）。
- 再検討条件: Task Routing の表は work note の実績が溜まった時点で見直す。非エンジニアの編集頻度が git 運用を上回った場合、P2 の 1 件目を優先着手する。
