---
title: 統合ツールチェーン標準フローの調査と設計判断
date: 2026-07-15
status: done
sources:
  - https://github.com/obra/superpowers
  - https://crit.md
  - https://github.com/AI-Builder-Club/skills
  - https://github.com/github/spec-kit
---

# 統合ツールチェーン標準フローの調査と設計判断

## 目的

superpowers / crit / skills(AIBC) / Spec Kit / GitHub Issues / Linear を、単なる「使い分け」から「標準フローとして固定し確実に実行させる」段階へ。各ツールの守備範囲と重複を整理し、一意な標準フローを設計する。

## 各ツールの守備範囲

| ツール | 守備範囲 | 層 |
|---|---|---|
| AF | docs 構造・Issue 駆動・品質ゲート・承認境界 | 統治（常時 ON） |
| superpowers | brainstorm / plan / TDD / debug / verify / code-review の「やり方」 | 職人技 |
| Spec Kit | specify / plan / tasks / implement のフェーズ制御 | 実装層の要件・分解 |
| crit | plan / 差分 / 画面への人間インラインレビュー | 人間レビュー面 |
| skills(AIBC) | dev-local / e2e / crabbox / pr、new-loop 知識基盤 | 基盤・並列・自律 |
| GitHub Issues | 開発の作業単位 | 開発ハブ |
| Linear | ロードマップ・サイクル・プロジェクトタスク | PM ハブ |

## 重複（要タイブレーク）

1. **レビュー**: superpowers code-review（AI↔AI）／ crit（人間）／ AF Inline Review（いつやるか）／ Claude `/code-review`。
2. **出荷・検証**: skills `pr` ／ superpowers verification ／ AF `complete-task.sh`＋real-use gate。
3. **知識ベース**: AIBC `new-loop`（signals/docs/domains）／ AF `docs/knowledge/`。思想が正面衝突。
4. **企画/仕様**: superpowers writing-plans ／ Claude plan mode ／ Spec Kit specify/plan ／ AF `docs/planning/`。

## 確定した二層 × 入れ子モデル（ユーザー方針）

- **正は二層**: PM/企画 = Linear、開発 = GitHub Issues。
- 階層: 企画(superpowers)→Linear プロジェクトタスク → 実装主(Spec Kit 要件定義)→GitHub 主 Issue → 実装分割(Spec Kit)→GitHub 分割 Issue → 検証(crit)→対応 Issue にコメント → 課題解決(完了パイプライン)→Linear ロールアップ。
- **Spec Kit は企画の上位ではなく実装層**。企画を受けて要件定義・タスク分解を担い GitHub Issue にマップ。
- **課題解決→Linear のロールアップ**は AF 完了パイプライン（`complete-task.sh` の延長）が担う。

## タイブレークの結論

- レビュー: 人間面は **crit に一本化**。superpowers code-review は人間前の AI 相互チェックとして前段に置く。
- 出荷: 外側パイプラインは **AF `complete-task.sh`**、アプリ実駆動検証は **skills `pr`**、superpowers はチェックリスト規律。
- 知識ベース: **1 repo 1 つ**。AF 採用済み repo に new-loop の substrate を並置しない（思想を 1 つに寄せる = #6 規約）。
- 企画/仕様: 企画は superpowers→Linear、実装の要件は Spec Kit→GitHub。plan mode は対話の場、`docs/planning/` は企画書の置き場（Linear と相互リンク）。

## 強制の方針

- **行動ルール**（hooks なし）: AGENTS/CLAUDE に「標準フロー外を検知 → 非推奨と明示 → 代替案を提示」を規定。ツール非依存で全プロジェクトに効き、Claude Code 以外でも守れる。

## 示唆

実装は [../../decisions/2026-07-15-toolchain-standard.md](../../decisions/2026-07-15-toolchain-standard.md)。正本は `docs/framework/toolchain-flow.md`。

## 未確認事項

- Linear/Jira の具体 connector（MCP/CLI）はプロジェクト環境依存。AF はツール非依存の契約とし、正となるトラッカーと connector を per-project 設定（`docs/knowledge/engineering/`）で宣言する。
