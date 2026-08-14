# Changelog

## 0.2.5 - 2026-08-14

- release metadataとSHA-256を検証し、公開ZIPを一時展開して導入するinstallerを追加した。
- 初回導入の全pathを事前検査し、競合時は通常pathを変更せずcandidate overlayとreportへ隔離するようにした。
- review済みseeded fileだけを明示的に採用できる`--accept-existing`を追加し、managed・symbolic link・file/directory競合はfail-closedにした。
- MIT License（Copyright (c) 2026 株式会社 点）を設定した。
- Codex / Claude Code向けcontext7導入、secret境界、library ID解決、単一concept queryの利用ruleを追加した。
- CODEOWNERS templateとbranch protection guidanceにより、人間承認領域のowner reviewを設定・検証できるようにした。

## 0.2.4 - 2026-08-12

- privacy-safe work unit schema、atomic storage、欠測 coverage、work unit / Issue / PR / release / profile 別の決定的 report を追加した。
- 既存 project repository、local-only、専用 repository の保存 mode を追加し、既存 repository 追跡には明示同意、public / unknown 可視性には警告を要求した。
- installation manifest と HEAD/index 両側 checksum により、AF-only update へ seeded、local-data、application source が混入する変更を fail-closed で拒否するようにした。
- bootstrap へ metrics runtime と thin wrapper を配布し、remote 作成、commit、push は自動化しない運用境界を文書化した。

## 0.2.3 - 2026-08-03

- `tools.tsv` の check 欄を任意 shell の `eval` から制限文法へ移行し、未知語彙を fail-closed で拒否するようにした。
- 公開 archive は release tag と `VERSION` が一致しない場合に生成を停止するようにした。

## 0.2.2 - 2026-08-03

- 完了パイプラインが既存 PR を再利用し、merge 成功を再確認してから Issue を close するようにした。
- 人間確認コメントを未解決の確認点だけに限定した。

## 0.2.1 - 2026-07-29

- エージェント別のオーケストレーション方式を明記した。Codex は Symphony で無人実行、Claude Code と hermes は skills のマルチエージェントで並列に進める。方式が違っても追跡先（GitHub Issue）と承認境界は共通。
- 隔離方式をプロジェクトで 1 つに決めるルールを追加した（worktree / crabbox / Symphony のワークスペースを混在させない）。
- profile を持たないエージェントにも規約が適用されることを明記した。
- 外部配布用 archive の作成を `scripts/build-public-archive.sh` に仕組み化した。内部の作業記録を除外し、他プロジェクト・顧客の固有名を伏せ、漏れと秘密情報の混入を機械的に検証する。

## 0.2.0 - 2026-07-29

docs/ を開発・非開発を含む知識ベースとして再構造化し、複数ツールの併用を標準フローとして固定したリリース。

### 知識ベース

- `docs/` を framework / knowledge / planning / decisions の 4 レイヤーに再構造化した。stock（現在の事実）、flow（企画中）、log（履歴）を混ぜない。
- マーケティング、ブランディング、競合、ビジネスモデル、法務、説明資料、FAQ、カスタマーサポートなど**システム開発に直接関係しない知識**の置き場を `docs/knowledge/` に定義した。
- 企画（調査・要件定義）と実作業（実装）を分離し、企画成果物を `docs/planning/` に残してから実装に入る規約を追加した。
- 意思決定に**情報ソースの記載を必須**にした。
- カテゴリ別の更新トリガーと担当ロールを定めた維持機構を追加した。
- ドキュメントはすべて日本語で保存する方針を明文化した。

### 標準フローとツールの分担

- superpowers / Spec Kit / crit / skills / GitHub Issues / Linear を 1 本の標準フローに束ねる `docs/framework/toolchain-flow.md` を追加した。企画は Linear、実装の要件と分解は GitHub Issue、検証結果は対応 Issue、解決は Linear へロールアップする。
- **管理先の境界**を定義した。アプリのソースコード（と、その改修の要件定義・開発タスク）は GitHub、ソースコードに反映しない企画・非開発のファイル変更は Linear。
- レビュー・出荷・知識ベースで複数ツールが重なる 3 点にタイブレーカを設けた。
- **標準フローから外れた進め方には、非推奨である旨と代替案を提示する**行動ルールを追加した。
- 複数 AI を有効化した場合のタスク種別ごとの担当（Task Routing）を定義した。
- Symphony（issue tracker を control plane にした無人継続実行）と context-mode の位置づけを追加した。人間承認領域は handoff state で止め、自動 merge させない。

### 品質と規律

- 指示・Issue に What / Why / How を含める型を定義した。
- 企画成果物を実装着手前に人間のインラインレビューへ通す導線を定義した。
- 生成物の出力形式（原稿は markdown、配布形態は HTML 等）と `outputs/` のコミット方針を定めた。
- 双方向リンク規約と、孤立ドキュメントを検出する `scripts/check-doc-links.sh` を追加した。
- skill の昇華トリガー（同じ手順を 3 回以上繰り返したら skill 化）、ライフサイクル、危険 skill の呼び出し制御、段階的情報開示、外部フレームワークとの共存規約を追加した。

### 導入と配布

- 導入済みプロジェクトを最新化する `docs/framework/project-update.md` を追加した。独自の docs 構造にカスタマイズ済みの場合、bootstrap の再実行は二重構造を生むため行わない。
- 上記すべてを `templates/project/` から配布し、全 AI profile の entrypoint に反映した。

## 0.1.0 - 2026-06-20

Initial framework release.

- Added the core AI execution framework derived from ichimesher practices.
- Added GitHub coordination rules for multi-agent parallel development.
- Added reproducible project bootstrap templates.
- Added explicit AI environment profile switching for Codex, Claude, and generic agents.
- Added work note, decision log, PR, Issue, label, runtime, and secret templates.
