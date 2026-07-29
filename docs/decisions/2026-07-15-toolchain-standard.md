# 判断: 統合ツールチェーンを標準フローとして固定し、逸脱を非推奨提示＋代替案で差し戻す

## 日付
2026-07-15

## 背景 / 課題
superpowers / crit / skills(AIBC) / Spec Kit / GitHub Issues / Linear を併用している。「使い分け」の指針（前 PR で整理）はあったが、標準として固定されておらず、レビュー・出荷・知識ベースで複数ツールが衝突しうる。ユーザーは、企画↔Issue 相互リンク・並列開発・crit 結果の Issue 反映・PM ツール反映を**確実に実行**させ、**逸脱時は非推奨を提示して代替案を出す**ことを求めた。

## 選択肢
- A: 使い分けの指針のみ（現状）
- B: 標準フローを 1 本定義し、AGENTS/quality-gates/PR に配線、逸脱は行動ルールで差し戻す（採用）
- C: hooks で標準外操作を機械的にブロック

## 決定
B を採用。`docs/framework/toolchain-flow.md` を標準の正本として新設し、AF の Standard Workflow・collaboration-rules・quality-gates・AGENTS・全 profile・PR テンプレートに配線した。

確定した設計:

- **追跡の正は二層**: PM/企画 = Linear、開発 = GitHub Issues。
- **入れ子＋ロールアップ**: 企画(superpowers)→Linear ／ 実装要件・主タスク(Spec Kit)→GitHub 主 Issue ／ 分割タスク(Spec Kit)→GitHub 分割 Issue ／ 検証(crit)→対応 Issue にコメント ／ 課題解決(完了パイプライン)→Linear ロールアップ。
- **Spec Kit は実装層**（企画の上位ではない）。要件定義・タスク分解を担い GitHub Issue にマップ。
- **強制は行動ルール**（hooks なし）: 標準外を検知 → 非推奨と明示 → 代替案を提示 → 明示選択なら記録して従う。
- **3 つのタイブレーカ**: レビュー＝人間面は crit 一本化、出荷＝外側は `complete-task.sh`／実駆動は skills `pr`、知識ベース＝1 repo 1 つ（new-loop substrate を並置しない）。

## 理由
- 各ツールは層が違い基本は積み重なるが、レビュー・出荷・知識ベースの 3 点で正面衝突する。標準を 1 本に固定しないと、記事（skill 分析）が警告する「複数フレームワークの衝突で予測不能」が現実化する。
- 二層ハブはユーザーの実運用（開発は GitHub、PM は Linear）に一致。入れ子＋ロールアップにすることで、PM 層と開発層が各々の正を保ちつつ連結する。
- 強制を行動ルールにしたのは、AF が複数ツール（Codex/Claude/Copilot）対応かつ多数の project に配布されるため。hooks は Claude Code 限定で可搬性を欠く。
- Spec Kit を実装層に位置づけたことで、superpowers（企画）・plan mode（対話）・`docs/planning/`（置き場）との重複が解消した。

## 情報ソース
- ユーザー提示の階層（企画 superpowers→Linear ／ 実装 SpecKit→GitHub Issues ／ 検証 crit→GitHub Issues ／ 課題解決→Linear）
- superpowers: https://github.com/obra/superpowers
- crit: https://crit.md
- skills(AIBC): https://github.com/AI-Builder-Club/skills
- Spec Kit: https://github.com/github/spec-kit
- 調査 [../planning/research/2026-07-15-toolchain-integration.md](../planning/research/2026-07-15-toolchain-integration.md)

## 影響範囲
- 新規: `docs/framework/toolchain-flow.md`、本ファイル、研究ノート、work note
- 編集: `docs/framework/{ai-execution-framework,collaboration-rules,quality-gates,README}.md`、`docs/index.md`、`AGENTS.md`、`templates/project/AGENTS.md`、全 profile entrypoint、`.github/pull_request_template.md` と配布ミラー、`scripts/bootstrap-project.sh`

## 却下した案・再検討条件
- **A（指針のみ）**: 確実な実行と逸脱の差し戻しが担保できない。
- **C（hooks 強制）**: Claude Code 限定で AF の可搬性に反する。将来 Claude Code 専用の追加ハードニングとしては再検討可（行動ルールの上乗せ）。
- **外部ハブ一本化（Linear のみ / GitHub のみ）**: 開発の粒度は GitHub、プロジェクトの粒度は Linear が実態に合うため二層を採用。
- **new-loop substrate の併置**: AF の `docs/knowledge/` と二重になるため却下。思想のみ借用。
- 再検討条件: ロールアップ担い手を `complete-task.sh` 延長にしたが、Linear connector の実装が固まれば専用 skill（`sync-tracker` 等）へ切り出す。二層の同期がノイズ過多になれば片方向に簡略化。
