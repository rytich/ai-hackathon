# 作業サマリー: Symphony と context-mode の記載

## 日付 / branch / AI profile
2026-07-29 / `1acx/symphony-context-mode` / Claude Code

## 対象
判断は [../decisions/2026-07-29-symphony-context-mode.md](../decisions/2026-07-29-symphony-context-mode.md)。

## 内容

- **context-mode**: 既存記載（`AGENTS.md` Mandatory Routing、`codex-dev-stack.md` の導入手順、collaboration-rules / quality-gates / agent-handoff の運用ルール）は十分だったが、本セッションで新設した Task Routing 表と toolchain-flow の担当表に載っていなかったため追記。新旧の規約で扱いを揃えた。
- **Symphony**: 新規記載。`toolchain-flow.md` に「実行の自動化層」節を設け、AF の契約（相互リンク・ロールアップ）が維持されること、人間承認領域は handoff state で止め自動 merge させないことを明記。`codex-dev-stack.md` に導入要点、`ai-environment-profiles.md` の Task Routing に担当行を追加。

## 調査で分かったこと

- Symphony は **spec + Elixir 参照実装**の公開で、OpenAI は製品として保守しない。
- 仕様上 **スケジューラ／ランナーであり、チケットの書き手ではない**。状態遷移・コメントはエージェントが provider-native tool で行う。この分離のおかげで AF の契約に手を入れずに済んだ。
- 成功実行は `Done` で終わらなくてよく、`Human Review` などの handoff state で止められる。AF の人間承認境界と接続できる根拠。
- 前提として **harness engineering**（run / test / verify できる状態）を要求する。導入済みの `skills` プラグイン（codebase-harness）と直結する。

## 範囲外としたもの

- 自宅サーバの具体構成（Symphony / hermes-agent / ローカル LLM / Tailscale）は AF に書かない。AF は project-neutral のため、実行ホスト・ネットワーク・認証情報は各プロジェクトの `docs/knowledge/engineering/` の領分。概要図（対外資料）に記載した。
- hermes-agent は別系統。AF の管理対象にしない。

## 検証
- `./scripts/check-doc-links.sh` — broken 0 / orphan 0。
- 新規 bootstrap 先へ 3 ファイルの追記が配布されることを確認。

## 未完了 / 次の作業
- Symphony を実運用に乗せた後、隔離ワークスペースと worktree / crabbox の使い分け指針が要るか確認する。
- 導入済みプロジェクトへの反映は必要になった時点で `project-update.md` の手順で行う。
