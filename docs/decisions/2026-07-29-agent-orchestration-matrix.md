# 判断: エージェント別のオーケストレーション方式を明記する

## 日付
2026-07-29

## 背景 / 課題

前 PR（#21）で Symphony と context-mode を記載したが、**どのエージェントがどの方式で Issue を消化するか**の対応が書かれていなかった。実運用では次のように分かれている。

- Codex → Symphony（tracker を継続ポーリングし、issue ごとに無人実行）
- Claude Code → skills のマルチエージェント（分割 Issue を並列に進める）
- hermes → skills のマルチエージェント（同上）

また AF の profile は codex / claude / codex-claude / copilot / generic の 5 種で、**hermes に対応する profile がない**。profile を持たないエージェントが規約の対象なのかが曖昧だった。

## 選択肢
- A: 記載しない（現状維持）
- B: `toolchain-flow.md` に「実行エージェントとオーケストレーション」節を設け、対応表と共通ルールを明記する（採用）
- C: hermes 用の profile を新設する

## 決定

B を採用。

- `toolchain-flow.md` に節を新設し、エージェント × オーケストレーション × 隔離方式の対応表を置いた。方式が違っても **追跡先（GitHub Issue）と承認境界は共通**であることを明記。
- **隔離方式はプロジェクトで 1 つに決める**（worktree / crabbox / Symphony のワークスペースを混在させない）ことを「並列開発」に追記。
- profile を持たないエージェントも、この repository で作業する間は `AGENTS.md` と規約に従う旨を `ai-environment-profiles.md` に明記。
- root/template の `AGENTS.md` と全 profile entrypoint に 1 行ずつ反映。

## 理由

- 方式の違いを書かないと、Symphony の無人実行と skills の並列実行が同じ Issue に同時に入る余地が残る。「同一 Issue を複数エージェントで並行させない」という既存ルールを、方式レベルでも担保する必要があった。
- 隔離方式の混在は、AF が `agent-settings-replication.md` で定めた Framework Coexistence（同じ領域を複数ツールが持つなら 1 つに寄せる）と同じ問題。同じ扱いに揃えた。
- C（hermes profile の新設）は却下。hermes は AF の外で運用されており、`.ai/profiles/` は「root に配置する tool-specific entrypoint」を管理する仕組みなので、entrypoint を持たないエージェントに profile を作る意味がない。代わりに「profile を持たなくても規約は適用される」と書いた。

## 情報ソース

- 実運用の構成（ユーザー提供）: Codex → Symphony、Claude Code / hermes → skills マルチエージェント
- Symphony 仕様: https://github.com/openai/symphony
- 前 PR の判断: [2026-07-29-symphony-context-mode.md](2026-07-29-symphony-context-mode.md)

## 影響範囲

- 編集: `docs/framework/toolchain-flow.md`、`docs/framework/ai-environment-profiles.md`、`AGENTS.md`、`templates/project/AGENTS.md`、全 profile entrypoint（5 ファイル）
- 新規: 本ファイル、work note

## 却下した案・再検討条件

- **hermes 用 profile の新設**: 上記の理由で却下。
- **自宅サーバ構成の記載**: 引き続き AF には書かない（project-neutral の原則）。対外向け概要図に記載済み。
- 再検討条件: hermes が root entrypoint（`HERMES.md` 等）を要求するようになったら profile 新設を検討する。隔離方式の混在が実際に必要になった場合は「1 つに決める」ルールを見直す。
