---
title: agentic-framework 概要（対外説明用）
status: draft
updated: 2026-07-15
---

# agentic-framework 概要

対外説明・紹介用の原稿。配布形態（HTML など）はこの原稿から生成する。生成物の置き場と生成手順は末尾に記載。

## 一行説明

複数の AI エージェントが、迷子にならずに並行開発するための軽量フレームワーク。仕様・実装・レビュー・検証・引き継ぎを、repository 内の成果物だけで再現する。ツールでも自動化でもなく、運用の型。

## 解決する課題

| 課題 | 内容 |
|---|---|
| 作業衝突 | 複数エージェントが同じ場所を同時に触り、変更が壊し合う |
| コンテキスト浪費 | 大量ログや巨大ファイルを会話へ流し、コストが跳ねる |
| 再現性の欠如 | 知識がチャット履歴に残り、別端末・別エージェントで再現できない |
| 承認の線引きの曖昧さ | 自動 merge してよい変更と人間承認が要る変更が区別されていない |

## docs/ の 4 レイヤー

知識を「性質」で分け、混ぜない。

| レイヤー | 場所 | 性質 | 中身 |
|---|---|---|---|
| framework | `docs/framework/` | メタ | エージェント運用のルール。プロジェクトが変わっても共通 |
| knowledge | `docs/knowledge/` | stock（現在の事実） | 「今どうなっているか」。開発＋非開発の system of record |
| planning | `docs/planning/` | flow（企画中の成果） | 調査メモ・要件定義。確定後に knowledge へ反映 |
| decisions / work-notes | `docs/decisions/` `docs/work-notes/` | log（履歴） | なぜ決めたか、誰が何をしたか。追記型 |

`knowledge/` は開発だけでなく、**マーケティング・ブランディング・競合・ビジネスモデル・法務・説明資料・FAQ・カスタマーサポート**も含む。事業の前提が repository の中にある状態を保つ。

## 企画と実作業の分離

```
[企画]  調査 → 要件定義 → 意思決定（情報ソース＋理由）
          docs/planning/          docs/decisions/
   │
   │  人間のインラインレビュー（行単位で指摘 → 差分で応答）
   ▼
[実作業]  実装  ＋  影響する docs/knowledge/ を同時更新
                    docs/work-notes/ に記録
```

企画成果物を残さずに実装へ進まない。意思決定には**情報ソース（URL・参照物）を必ず添える**。

## 維持機構

知識が陳腐化しないよう、更新のトリガーと担当を固定する。

| トリガー | 更新先 | 主担当 |
|---|---|---|
| 仕様・受け入れ条件の確定 | `knowledge/product/` | Coordinator |
| アーキ・runtime・secret の変更 | `knowledge/engineering/` | Implementer |
| 価格・提供形態・事業方針 | `knowledge/business/business-model/` | Human Approver |
| 競合の新情報 | `knowledge/business/competitive/` | 調査担当 |
| 規約・法令・プライバシー | `knowledge/business/legal/` | Human Approver |
| 問い合わせ傾向・定型応答 | `knowledge/support/` | サポート担当 |

強制の仕組みは、PR の「docs 鮮度チェック」と、前提が変わったら同じ作業セッションで docs を更新する義務。

## 品質ゲート

最低限の required checks に加え、次を独自ゲートとして持つ。

- **real-use gate** — mock / fixture / stub / fake / demo の成功を product acceptance として扱わない。usable / v1 / production-ready を名乗るなら、real user path または明示された user-facing fallback の検証を完了条件に含める。
- **docs 鮮度チェック** — 変更が影響する `knowledge/` カテゴリと、企画に用いた `planning/` `decisions/` が更新されているか。
- **人間承認領域** — destructive migration、auth / secret / permission、billing、production deploy、infrastructure、privacy / legal、不可逆なデータ削除は自動 merge しない。

## 複数 AI の使い分け

`.ai/profiles/` で Codex / Claude Code / Copilot / generic を切り替える。両方同時に有効化する場合（`codex-claude`）は、タスク種別ごとに担当を決める。

| タスク種別 | 推奨 |
|---|---|
| 定型実装、既存パターンの適用、機械的な修正 | Codex |
| 大量ファイルの一括変更、定型 refactor | Codex |
| 仕様・設計の検討、要件定義、trade-off の判断 | Claude Code |
| 不具合の原因調査、再現困難な問題の切り分け | Claude Code |
| 非開発知識（事業・法務・サポート）の整理 | Claude Code |

迷ったら深い方に倒す。同一 Issue を複数エージェントで並行させない。

## 導入

```bash
./scripts/bootstrap-project.sh /path/to/target-project
cd /path/to/target-project
./scripts/select-ai-profile.sh codex-claude
```

導入済みプロジェクトの更新は `docs/framework/project-update.md` に従う（独自の docs 構造にカスタマイズ済みの場合、bootstrap の再実行は二重構造を生む）。

---

## 配布形態の生成について

- 本ファイルが**原稿の正本**。配布形態（HTML / スライド等）はここから生成する。
- 生成物は repository 直下の `outputs/` に置く。原稿と生成物の二重管理をしない。
- 生成物を更新したら、必ず本ファイルを先に更新してから再生成する。
