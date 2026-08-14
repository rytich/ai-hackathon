---
title: v0.2.5 安全なinstallerと配布ライセンス
status: approved
date: 2026-08-14
issue: https://github.com/rytich/agentic-framework/issues/65
links:
  - ../../decisions/2026-08-14-safe-installer-conflict-strategy.md
  - ../../superpowers/specs/2026-08-14-v025-safe-installer-design.md
  - ../../superpowers/plans/2026-08-14-v025-safe-installer.md
---

# v0.2.5 安全なinstallerと配布ライセンス

関連: [競合処理の意思決定](../../decisions/2026-08-14-safe-installer-conflict-strategy.md) / [context7採用判断](../../decisions/2026-08-14-context7-integration.md) / [設計](../../superpowers/specs/2026-08-14-v025-safe-installer-design.md) / [実装計画](../../superpowers/plans/2026-08-14-v025-safe-installer.md) / [Issue #65](https://github.com/rytich/agentic-framework/issues/65) / [Issue #28](https://github.com/rytich/agentic-framework/issues/28)

## What

- 利用者が公開ZIPを手動で展開せず、1つのinstallerコマンドからAFを導入できるようにする。
- 導入後に何を編集・確認すればよいかを、installerの完了メッセージとREADMEと説明サイトで明示する。
- 既に進行中のprojectへ初回導入するとき、既存file・directoryを上書きせず、部分導入も起こさない。
- repositoryと公開配布物へMIT Licenseを設定する。
- CodexとClaude Codeでcontext7を導入・検証し、library/APIの現行仕様を調べるときに自動活用できる規約を配布する。
- 公開済みv0.2.4を改変せず、変更をv0.2.5として配布する。

## Why

現行の導線はZIPを取得した後の操作が分かりにくく、`bootstrap-project.sh`を使うために利用者自身がarchiveを展開する必要がある。また、既存projectでは`AGENTS.md`、`.github/`、`docs/`などが既に存在する可能性があり、単純なfile配置では競合や部分導入が発生し得る。公開配布物には利用・改変・再配布条件も明示されていない。

## How

1. `https://ai.microdotz.net/install.sh` からinstallerを提供する。
2. installerはrelease metadataとZIPを一時directoryへ取得し、byte数とSHA-256を検証してからbootstrapを呼び出し、一時fileを削除する。
3. bootstrapは書き込み前に全配布pathを検査する。
4. 内容が異なる既存pathが1件でもあれば、通常の導入先を変更せず、候補一式と競合reportを `.agentic-framework/incoming/` へ保存して終了する。
5. 競合がなければ新規fileだけを配置し、installation manifestを生成する。
6. MIT Licenseをrepository rootと公開ZIPへ含める。
7. context7はAPI keyをrepositoryへ保存せず、Codex pluginまたはMCP、Claude Code MCPの公式導入手順を示す。
8. agent rulesへ、library/framework/SDK/API/CLI/cloud serviceのsetup・configuration・API documentationではcontext7を優先し、library ID解決後に単一conceptずつqueryする規約を加える。

## 受け入れ条件

- 新規または配布pathと競合しない既存projectへ、手動展開なしで導入できる。
- SHA-256不一致時はbootstrapを実行しない。
- 異なる既存fileがある場合、そのfileと他の通常pathを一切変更しない。
- 競合候補と人間・AIが確認できるMarkdown reportがnamespaced directoryへ残る。
- 再実行や既導入projectでは既存manifestを尊重し、初回導入として扱わない。
- 完了出力に、導入状態、次に編集するfile、検証commandが表示される。
- `LICENSE`がMIT本文であり、Copyright (c) 2026 株式会社 点を示す。
- CodexとClaude Codeそれぞれに、context7の導入command、secret境界、動作確認、削除・再設定方法がある。
- context7未導入時はtool requirement検査で検出でき、導入済みならlibrary ID解決とdocumentation queryの実行例を辿れる。
- 公開ZIPに`LICENSE`とinstaller関連fileが含まれ、sanitize検査を通る。
- v0.2.5 Release asset、説明サイトのrelease metadata、配布ZIPのSHA-256が一致する。

## 対象外

- 既存project固有の文章をinstallerが意味的に自動mergeすること。
- 競合時の既存file上書きや`--force` option。
- Windows PowerShell native installer。

## context7情報ソース

- [upstash/context7: Codex client setup](https://github.com/upstash/context7/blob/master/docs/clients/codex.mdx)
- [upstash/context7: all MCP clients](https://github.com/upstash/context7/blob/master/docs/resources/all-clients.mdx)
- [upstash/context7: official MCP rules](https://github.com/upstash/context7/blob/master/rules/context7-mcp.md)
