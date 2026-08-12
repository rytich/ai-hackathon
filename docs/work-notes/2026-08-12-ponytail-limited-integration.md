# Ponytail 限定統合 作業サマリー

- GitHub Issue: [#59](https://github.com/rytich/agentic-framework/issues/59)

## What

- AF自身とproject templateの既定AI profileを`codex`にした。
- Codex、Claude Code、Codex+Claude、hermes、Copilot、genericの6 profileを定義した。
- profile切替の管理対象をhost固有の薄い入口に限定し、共有`AGENTS.md`を上書きしないようにした。
- `software-engineering-practices.md`へ、安全境界付きの最小実装判断ラダーを追加した。
- objective reviewへ、最小差分、依存・抽象化の選択理由、安全境界を確認する`Scope Discipline`を追加した。
- profile切替回帰検査を標準completion validationへ接続した。

## Why

Ponytailの「必要性、既存実装、標準機能、既存依存、最小実装」の順で判断する考え方はAFと整合する。一方、Ponytailの常時hookやMCPをそのまま導入すると、AFのIssue / Spec Kit / docs / quality gateとの優先順位が曖昧になるため、判断規律だけをAFの安全境界の下位へ統合した。

## How

- active profile: `codex`
- Ponytail package: 未導入
- Node.js lifecycle hook: 未導入
- Ponytail MCP server: 未導入
- 外部依存: 追加なし

## 検証

- `bash scripts/test-check-agent-tools.sh`: PASS 23 / FAIL 0
- `bash scripts/test-select-ai-profile.sh`: 6 profileで共有`AGENTS.md`保持を確認
- `bash scripts/test-complete-task.sh`: PASS 11
- `bash scripts/check-doc-links.sh`: broken link 0、orphan 0
- `bash scripts/check-agent-tools.sh`: Codexのmust（git、gh、context-mode）はすべてOK
- `diff -ru .ai templates/project/.ai`: 差分なし
- `diff -u scripts/select-ai-profile.sh templates/project/scripts/select-ai-profile.sh`: 差分なし
- `git diff --check`: 問題なし

## 客観的な期待効果と限界

- 直接確認できる効果は、6つのAI環境profileの責務明確化、安全なprofile切替、最小実装判断とScope Disciplineの共有である。
- 規約driftや過剰実装の見逃しが減る可能性はあるが、開発時間、token/cost、変更LOC、欠陥数、review時間の改善は未計測であり、この変更だけでは効果量を主張できない。
- hookやMCPによる自動強制ではなく、agentとreviewerが規約に従う運用を前提とする。
- `manifest.env`はrepository内の信頼済み設定を対象とし、未信頼manifestを実行する仕組みではない。
- rootとproject templateのprofile payloadは同期検査が必要であり、保守コストは残る。
- 実証範囲はmacOS中心で、Windowsネイティブ環境は未検証である。将来対応は[#61](https://github.com/rytich/agentic-framework/issues/61)で追跡する。
- GitHub上のrequired CI checkは現時点でなく、merge判断はローカル検証と独立レビューを証拠とする。

## 既知事項

- Codex profileのrecommended `symphony`はこのcheckoutに`WORKFLOW.md`がないためoptional扱い。定義済みの縮退先どおり対話セッションで手動実行できる。
- `scripts/bootstrap-project.sh`はrootのframework文書と`complete-task.sh`正本を生成先へコピーする。template配下へ重複する正本は置いていない。
