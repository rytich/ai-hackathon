# 作業サマリー: 統合ツールチェーン標準フローの定義

## 日付 / branch / AI profile
2026-07-15 / `1acx/toolchain-standard` / Claude Code

## 対象
superpowers / Spec Kit / crit / skills / GitHub Issues / Linear を標準フローとして固定し、逸脱時は非推奨提示＋代替案を出す。調査 [../planning/research/2026-07-15-toolchain-integration.md](../planning/research/2026-07-15-toolchain-integration.md)、判断 [../decisions/2026-07-15-toolchain-standard.md](../decisions/2026-07-15-toolchain-standard.md)。

## 内容

- **新規 `docs/framework/toolchain-flow.md`（正本）**: 入れ子＋ロールアップ型フロー、段ごとの担当表、Spec Kit の位置づけ（実装層）、相互リンク契約（企画書↔Linear、主 Issue↔Linear、分割↔主、crit→Issue）、ロールアップ契約（完了パイプライン→Linear）、3 つの衝突タイブレーカ、並列開発、逸脱時の行動、優雅な縮退。
- **配線**: `ai-execution-framework.md`（Standard Workflow に段注記＋Frame 段＋crit/Linear 反映、Completion Sync に契約追記）、`collaboration-rules.md`（crit→Issue、企画書↔Issue 双方向リンク）、`quality-gates.md`（4 チェック追加）、root/template `AGENTS.md` と全 profile（標準フロー＋**逸脱時の非推奨提示＋代替案**）、PR テンプレート（Toolchain 欄）。
- **二層ハブ**: PM/企画=Linear が正、開発=GitHub Issues が正。
- **強制=行動ルール**（hooks なし）。ツール非依存。
- **配布**: bootstrap に `toolchain-flow.md` を追加、index / framework README に導線、PM 連携設定点を `knowledge/engineering/README.md` に定義（`project-tracker.md`、既定 Linear）。

## 検証
- `./scripts/check-doc-links.sh` — broken 0 / orphan 0。
- 新規 bootstrap 先に `toolchain-flow.md`・AGENTS 逸脱ルール・PR Toolchain 欄が配布されることを確認。

## 未完了 / 次の作業
- Linear/Jira の具体 connector はプロジェクト環境依存。AF はツール非依存の契約に留め、各 project が `docs/knowledge/engineering/project-tracker.md` で宣言する。
- ロールアップは `complete-task.sh` 延長として規定。connector が固まれば専用 skill 化を再検討。
- ten_matcha 等への反映は本 PR merge 後に `project-update.md` の手順で別途（独自 IA へ読み替え）。
