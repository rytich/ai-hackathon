# 安全なinstallerの競合処理

## 決定

初回導入前に全配布pathをpreflightし、内容が異なる既存fileが1件でもあれば通常pathへの書き込みを行わない。代わりに `.agentic-framework/incoming/<version>.<suffix>/` へ候補overlayと競合reportを保存する。

## 理由

- 「既存fileをスキップして残りを配置する」方式は既存資産を壊さないが、導入状態が部分的になり、利用者が完了と誤認しやすい。
- shellによる文章や設定の自動mergeはproject固有の意味を判断できず、silent corruptionの危険がある。
- namespacedな候補領域なら既存projectを維持したまま、人間またはAIが差分を確認して統合できる。

## 比較した案

1. **preflight + 候補隔離（採用）**: fail-closedで通常pathを不変に保ち、解決材料を残せる。
2. 競合だけskipして残りを配置: 簡単だが部分導入になる。
3. 自動merge: 操作は少ないが、Markdown・YAML・agent設定の意味的競合を安全に解決できない。

## 情報ソース

- 利用者フィードバック（2026-08-14）: 既存projectではfile・folderが競合する可能性がある。
- repository内 `scripts/bootstrap-project.sh`: 現行は`copy_if_missing`を順次実行する。
- repository内 `docs/framework/project-update.md`: 導入済みprojectの更新は差分確認と個別反映を要求する。
