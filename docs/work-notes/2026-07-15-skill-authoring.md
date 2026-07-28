# 作業サマリー: skill 作成規約の強化（P1 + #6）

## 日付 / branch / AI profile
2026-07-15 / `1acx/skill-authoring-guidance` / Claude Code

## 対象
skill 作成の調査（[../planning/research/2026-07-15-skill-authoring.md](../planning/research/2026-07-15-skill-authoring.md)）で選んだ P1 3 件＋#6。判断は [../decisions/2026-07-15-skill-authoring.md](../decisions/2026-07-15-skill-authoring.md)。

## 内容（すべて `docs/framework/agent-settings-replication.md` に追記）

1. **Skill Lifecycle** — 昇華トリガー（work-note で 3 回以上）、`status` フィールド、deprecated での畳み方、双方向リンク。未対応 P2「学習の昇華経路」を解消。
2. **Invocation control** — 危険 skill（production/顧客データ、bulk message、migration、billing）の自動呼び出し無効化。frontmatter キーはツール依存のため能力として記述。
3. **Progressive Disclosure** — SKILL.md は目次、詳細は references（1 階層まで）、共有 reference は 1 コピー。
4. **#6 Framework Coexistence and Third-party Skills** — 命名衝突回避、哲学衝突を 1 つに寄せる、第三者 skill は中身を見てから導入。

反映先: root/template の `AGENTS.md`（昇華トリガーの 1 行）、`templates/project/.agents/skills/README.md`（器→規約付き）、Adoption Checklist、description の what+when 明確化。

## 却下
frontmatter キーの固定表記（ツール依存）、Eval 駆動・自由度の設計（P2 保留）、言い訳テーブル・context budget（見送り）。

## 検証
- `./scripts/check-doc-links.sh` — broken 0 / orphan 0。
- 新規 bootstrap 先でも `.agents/skills/README.md` と agent-settings-replication.md の追記が届くことを確認。

## 未完了 / 次の作業
- ten_matcha への反映（本件を含む複数 PR 分）は保留。ユーザー判断待ち。
- P2 残り: 非エンジニアの参加経路、リンクグラフ可視化、skill の Eval 駆動・自由度設計。
