# 判断: Symphony と context-mode を標準フローに位置づける

## 日付
2026-07-29

## 背景 / 課題

- **context-mode** は AF に古くから記載があるが（`AGENTS.md` の Mandatory Routing、`codex-dev-stack.md` の導入手順ほか）、本セッションで追加した新しい規約——`ai-environment-profiles.md` の Task Routing 表と `toolchain-flow.md` の担当表——には載っておらず、新旧の規約で扱いが揃っていなかった。
- **Symphony** は AF に一切記載がなかった。issue tracker をコーディングエージェントの control plane にする仕様で、AF が PR #19 で標準化した Linear ↔ GitHub 境界の**自動化層**に相当する。記載がないまま運用すると、無人実行が AF の人間承認境界を素通りしうる。

## 選択肢
- A: 記載しない（現状維持）
- B: 既存の該当節へ追記し、Symphony は「実行の自動化層」として標準フローに位置づける（採用）
- C: Symphony 専用の新規ドキュメントを立てる

## 決定

B を採用。

- `ai-environment-profiles.md` の Task Routing に 2 行追加（大量出力・ログ・広域検索 → context-mode、tracker 起点の無人継続実行 → Symphony）。
- `toolchain-flow.md` に「段をまたいで使う補助」表と「**実行の自動化層（Symphony）**」節を追加。AF の相互リンク契約・ロールアップ契約が Symphony 導入後も変わらないこと、人間承認領域は `Human Review` などの handoff state で止め**自動 merge させない**ことを明記。
- `codex-dev-stack.md` の Stack と Global Routing Rules に Symphony を追加し、導入時の要点（`WORKFLOW.md` のリポジトリ所有、harness 前提、認証情報の扱い）を記載。

## 理由

- Symphony の設計は AF と衝突しない。仕様上 **Symphony はスケジューラ／ランナーであり、チケットの書き手ではない**（状態遷移・コメント・PR リンクはエージェントが provider-native tool で実行）。よって AF の契約はそのまま維持できる。
- 仕様が「成功した実行は `Done` で終わらなくてよく、`Human Review` のような handoff state で止められる」と明記しているため、AF の人間承認境界を**規約として接続できる**。ここを明文化しないと、無人実行が承認境界を越える余地が残る。
- issue ごとの隔離ワークスペースは、AF の worktree / crabbox と同じ目的（並列時の衝突回避）。重複するので「プロジェクトで 1 つに決める」と規定した（`agent-settings-replication.md` の Framework Coexistence と同じ扱い）。
- C（専用ドキュメント）は参照が分散し "map, not manual" に反するため却下。

## 情報ソース

- Symphony 仕様と参照実装: https://github.com/openai/symphony （Apache 2.0、`SPEC.md`）
- OpenAI 発表: https://openai.com/index/open-source-codex-orchestration-symphony/
- 前提とされる harness engineering: https://openai.com/index/harness-engineering/
- 既存の context-mode 記載: `AGENTS.md`、`docs/framework/codex-dev-stack.md` ほか

## 影響範囲

- 編集: `docs/framework/ai-environment-profiles.md`、`docs/framework/toolchain-flow.md`、`docs/framework/codex-dev-stack.md`
- 新規: 本ファイル、work note

## 却下した案・再検討条件

- **自宅サーバの具体構成を AF に書く案**: 却下。AF は project-neutral な汎用フレームワークであり、実行ホスト・ネットワーク・認証情報は各プロジェクトの `docs/knowledge/engineering/` に置く。AF には契約だけを書いた。
- **hermes-agent を AF の管理対象に含める案**: 却下。別系統として運用するため、AF の規約対象にしない。
- 再検討条件: Symphony を実運用に乗せた結果、隔離ワークスペースと worktree / crabbox の使い分けに指針が要ると判明したら、`toolchain-flow.md` の「並列開発」に追記する。
