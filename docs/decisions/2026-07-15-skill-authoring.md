# 判断: skill の昇華・呼び出し制御・progressive disclosure・共存規約を AF に組み込む

## 日付
2026-07-15

## 背景 / 課題
skill 作成の調査（[../planning/research/2026-07-15-skill-authoring.md](../planning/research/2026-07-15-skill-authoring.md)）で、AF の skill 規約に 4 つの穴が判明した。

1. **昇華トリガーが無い**。「繰り返し作業を skill 化」とあるが、いつ・何回でという基準が無く、work-note と接続していない（＝未対応 P2「学習の昇華経路」そのもの）。
2. **危険 skill にブレーキが無い**。bulk-message / production-inspection / migration を候補に挙げるが、自動呼び出しを止める仕組みが規約に無い。
3. **SKILL.md を小さく保つ規約が無い**。`references/` はあるが progressive disclosure の指針が無い。
4. **他フレームワークとの共存・第三者 skill の安全性**の規約が無い。superpowers / crit / AF を併用する実環境で命名衝突リスクが現実にある。

## 選択肢
- A: 何もしない
- B: 既存の `agent-settings-replication.md` に 4 点を追記し、配布する（採用）
- C: skill 専用の新規ドキュメントを立てる

## 決定
B を採用。`docs/framework/agent-settings-replication.md` に次を追加した。

- **Skill Lifecycle**: 昇華トリガー（work-note で 3 回以上の繰り返し）、`status: active/in-progress/deprecated`、畳み方、双方向リンク。
- **Invocation control**: 危険 skill の自動呼び出し無効化。frontmatter キーはツール依存のため能力として記述。
- **Progressive Disclosure**: SKILL.md は目次、詳細は references（1 階層まで）、共有 reference は 1 コピー。
- **Framework Coexistence and Third-party Skills**（#6）: 命名衝突回避、哲学の衝突を 1 つに寄せる、第三者 skill は中身を見てから導入。

あわせて root/template の `AGENTS.md`、`.agents/skills/README.md`、Adoption Checklist に反映。

## 理由
- 既存 skill 規約に素直に接続でき、C のように新規ドキュメントを立てると参照が分散し "map, not manual" に反する。
- 昇華トリガーは、先に作った work-notes / 孤立ノート検出・エントロピー管理と一直線（育てて畳む＝孤立検出と同思想）。progressive disclosure は knowledge-base の同名原則を skill へ広げるだけ。呼び出し制御は quality-gates の human-approval の機械的裏付け。
- #6 は superpowers + crit + skills@ai-builder-club + AF を実際に併用しているため、机上論ではない。

## 情報ソース
- 記事「有名エンジニアの .claude/skills から学ぶ」: https://note.com/ai_eng_tech/n/n1ef4d57df219
- mattpocock/skills, addyosmani/agent-skills, obra/superpowers（記事が参照するリポジトリ）
- 調査ノート [../planning/research/2026-07-15-skill-authoring.md](../planning/research/2026-07-15-skill-authoring.md)

## 影響範囲
- 新規: 本ファイル、研究ノート
- 編集: `docs/framework/agent-settings-replication.md`、`AGENTS.md`、`templates/project/AGENTS.md`、`templates/project/.agents/skills/README.md`

## 却下した案・再検討条件
- **frontmatter キーを固定表記で規定**（`disable-model-invocation` 等）: ツール実装で揺れる（AIBC は `user_invocable`）ため却下。AF は複数ツール対応なので能力として記述し、キーは各ツールのドキュメントに委ねた。
- **Eval 駆動 / 自由度の設計**: 有用だが P2 保留。まず本 4 点の効果を見る。
- **言い訳テーブル / context budget の詳細**: 個人流儀・実装依存のため見送り。
- 再検討条件: 昇華トリガーの「3 回」が実運用で早すぎ/遅すぎなら見直す。skill 数が増え context 圧迫が実害化したら budget 規約を追加検討。
