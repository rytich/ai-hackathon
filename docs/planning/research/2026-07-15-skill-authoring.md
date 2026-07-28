---
title: 良い skill の書き方の調査と AF への取り込み判断
date: 2026-07-15
status: done
sources:
  - https://note.com/ai_eng_tech/n/n1ef4d57df219
  - https://github.com/mattpocock/skills
  - https://github.com/addyosmani/agent-skills
  - https://github.com/obra/superpowers
---

# 良い skill の書き方の調査と AF への取り込み判断

## 目的

有名エンジニアの `.claude/skills` を読み比べた記事から、AF の未対応 P2「学習の昇華経路（work-note → `.agents/skills/`）」を埋める要素を選別する。

## 記事の要点

- **description = 何をするか＋いつ使うか**。トリガーになる語を含める。
- **呼び出し制御**: `disable-model-invocation`（自動呼び出し禁止＝危険操作向け）、`user-invocable`（slash メニューへの露出制御）。
- **Progressive disclosure**: SKILL.md は目次に留め（〜500 行）、詳細は参照ファイルへ。参照は 1 階層まで。全分岐が要る情報はインライン、一部だけ要る情報はポインタの先。
- **自由度の設計**: 判断業務＝散文、中間＝疑似コード、危険操作＝固定スクリプト。
- **Eval 駆動**: skill 無しで失敗する 3 タスクでベースライン測定。
- **ライフサイクル**: skill は「一度書いて放置」でなく「育てて要らなくなったら畳む」。deprecated / in-progress を明示。
- **多重フレームワーク衝突**: 複数の skill フレームワークを同時導入するとコマンド名が衝突し予測不能に。
- **セキュリティ**: skill は手順・スクリプトを含むため、信頼できるソースのみ、中身を見てから入れる。

## AF の現状

`docs/framework/agent-settings-replication.md` に skill 規約あり: frontmatter（name/description/argument-hint/allowed-tools）、最小テンプレート、`references/` `scripts/` 構造、安全ルール、permission allowlist、intent-based 命名。

## ギャップと判断

| 記事の要素 | AF | 判断 |
|---|---|---|
| 昇華トリガー＋ライフサイクル | 「繰り返しを skill 化」だがトリガー無し・work-note と未接続 | **P1 採用**。P2 の穴そのもの |
| 呼び出し制御 frontmatter | 危険 skill を列挙するがブレーキ無し | **P1 採用**。human-approval と整合 |
| Progressive disclosure | references はあるが SKILL.md を小さく保つ規約無し | **P1 採用**。"map, not manual" と同思想 |
| 多重フレームワーク衝突＋第三者安全性 | 警告無し | **採用（#6）**。superpowers+crit+AF 併用の実環境で該当 |
| 自由度の設計 | リスク別の指針無し | P2 保留 |
| Eval 駆動 | real-use gate はあるが skill eval 無し | P2 保留 |
| 言い訳テーブル / context budget | — | 見送り（個人流儀・実装依存） |

## 示唆

昇華トリガーは、先に作った work-notes / 孤立ノート検出・エントロピー管理と一直線（育てて畳む＝孤立検出と同思想）。呼び出し制御は既存の危険 skill 列挙に実際のブレーキを付ける。実装は [../../decisions/2026-07-15-skill-authoring.md](../../decisions/2026-07-15-skill-authoring.md)。

## 未確認事項

- `disable-model-invocation` / `user-invocable` の正確な frontmatter キー（ハイフン/アンダースコア）はツール実装で揺れる（AIBC skill は `user_invocable` を使用）。AF は複数ツール対応のため、キー名でなく**能力**として記述し、正確なキーは各ツールの skill ドキュメントに委ねる方針とした。
