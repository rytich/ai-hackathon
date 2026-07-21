---
title: P2-6「成果物の出力形式」の実地検証
date: 2026-07-15
status: done
sources:
  - ./2026-07-15-claude-code-guide.md
---

# P2-6「成果物の出力形式」の実地検証

## 目的

対外資料を HTML で出す方式に、markdown 一辺倒から切り替えるだけの価値があるかを、実物を作って確かめる。AF の real-use gate に従い、机上比較ではなく実際の生成物で判断する。

## 方法

題材は AF 自身の対外説明資料。`docs/knowledge/materials/` が空で実需があり、既存の pptx（個人経歴を含む）より検証に適する。

既存の materials 規約（原稿は `docs/knowledge/materials/`、生成物は `outputs/`）が HTML でも成立するかを、原稿と生成物の両方を作って確認した。

- 原稿: `docs/knowledge/materials/agentic-framework-overview.md`（5.5KB）
- 生成物: `outputs/agentic-framework-overview.html`（19.8KB）

## わかったこと

機械検証はすべてパス。タグ整合、外部リソース参照ゼロ（自己完結）、light / dark 両テーマ、表と `pre` の横スクロール封じ込め、原稿の全節が生成物に反映。検証中に未使用 CSS を 1 件検出し除去した。

形式ごとの実際の差:

| 観点 | markdown | HTML |
|---|---|---|
| 4 レイヤー構造の表現 | 表でしか書けず、stock / flow / log の**性質の違いが落ちる** | 罫の形（実線・破線・点線）で性質を符号化でき、空間的に示せる |
| 企画→実作業のフロー | ASCII 図。崩れやすい | レスポンシブな実フロー図 |
| 届けやすさ | repo にアクセスできる人のみ | URL 1 本 |
| **差分追跡・レビュー** | **行単位で追える** | **差分がほぼ読めない** |
| 保守 | 単一 | 原稿と生成物の**二重管理リスク** |

## 示唆

- **HTML を single source of truth にしてはいけない。** AF の「repository 内の成果物だけで再現する」「行単位で指摘を返す」原則を壊す。
- 一方、**配布形態としては明確に価値がある**。特に「関係性そのものが情報」である資料（階層・フロー・対応関係）では、markdown の表で落ちる情報が HTML では残る。これは実際に作って初めて確認できた差。
- したがって新概念の追加ではなく、**既存の materials 規約（原稿と生成物の分離）の適用先を HTML へ広げる**のが妥当。実装コストも小さい。

## 未確認事項 → 後続で解決済み

- 検証時点で `outputs/` の git 管理方針が未定だった。→ [../../decisions/2026-07-15-outputs-commit-policy.md](../../decisions/2026-07-15-outputs-commit-policy.md) で決定。
- Artifact の URL は claude.ai アカウントが前提のため、社外配布には HTML ファイル現物の受け渡しが別途必要。
