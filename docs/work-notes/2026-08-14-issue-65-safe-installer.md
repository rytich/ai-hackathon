# Issue #65 v0.2.5 safe installer 作業記録

## 対応

- 公開release metadata、byte数、SHA-256、archive path、VERSIONを検証して一時展開する`install.sh`を追加した。
- bootstrapを全path preflightへ変更し、競合時は通常pathを変更せず`.agentic-framework/incoming/`へcandidate overlayとreportを保存するようにした。
- review済みseeded fileだけを明示採用する`--accept-existing`を追加した。managed、symbolic link、file/directory競合は採用できない。
- MIT License（Copyright (c) 2026 株式会社 点）を追加した。
- Context7公式documentationを確認し、Codex plugin/MCP、Claude Code MCP、secret境界、library ID解決、単一concept queryのruleを追加した。
- Issue #28の受け入れ条件に合わせ、情報ソース付き調査ノートと採否の意思決定記録を追加した。

## TDD

- RED: 旧bootstrapはmanaged競合でstatus 1となり、競合前に通常fileを一部作成した。installerとcontext7配布documentは存在しなかった。
- GREEN: 新規導入、seeded競合隔離、明示採用、managed競合拒否、checksum拒否、一時directory cleanup、bootstrap status伝播、context7配布ruleが成功した。
- executable bit回帰をcommit出力で検出し、`test-bootstrap-project.sh`へ実行権限gateを追加した。

## 検証

- `scripts/test-check-agent-tools.sh`: 23 pass / 0 fail
- metrics Node test: 40 pass / 0 fail
- bootstrap / installer / context7 / completion pipeline regression: pass
- docs link check: broken link 0 / orphan 0
- public archive regression: licenseとinstallerを含み、既存の公開除外gateもpass

## 標準完了pipelineからの逸脱

`scripts/complete-task.sh`のPR bodyがtask completion automation専用の固定文面であり、Issue #65のinstaller/License/context7変更を正確に説明できない。またIssue #65はframework PR merge後もReleaseと別repositoryのsite deployが完了するまでopenに保つ必要がある。そのため検証commandは同等以上を個別実行し、PR作成・merge・Issue closeは実際のmulti-repository release状態に同期して手動実行する。

## 残作業

- framework PR review/merge
- immutable tag `v0.2.5`、公開archive、GitHub Release
- microdotz-siteのinstaller主導線・release metadata・ZIP更新
- public URLからのreal installer flowとdesktop/mobile表示確認
