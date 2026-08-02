# 判断: エージェントツールを must と recommended に分ける

## 日付
2026-08-01

## 背景 / 課題

- AF はツールの**使い方**を `docs/framework/toolchain-flow.md` に定めているが、**導入させる仕組みを持たない**。
- 整備度がツールごとにばらついていた。Serena は導入手順あり、context-mode は手順が不完全（インストールコマンドが欠落）、superpowers は導入手順も未導入時の代替も存在しない。
- superpowers は標準フローの企画段を担う位置づけであり、導入先プロジェクトが「入れ方も代替も分からない」状態に置かれていた。
- 原因は、端末セットアップ手順が `codex-dev-stack.md` という Codex 専用文書にしかないこと。superpowers は Claude Code のプラグインで、対応する文書が無い。
- AF は `.ai/profiles/` で AI 環境ごとの設定切り替えを既に持つが、ツール要件はこの profile 軸で表現されず散文として各所に散っていた。

## 選択肢

**強制手段**

1. 文書と行動ルールのみ。最も軽いが、`#29`（CODEOWNERS）で「行動ルールだけでは担保にならない」と自ら指摘した問題が残る。
2. 検証スクリプト＋文書。
3. 検証スクリプト＋CI required check。最も強いが、CI ランナーに Codex / Claude Code のプラグインは入らないため実質検査できる対象が限られ、形骸化する。

**分類基準**

1. 縮退先の有無。
2. 標準フローの段を担うか。分かりやすいが、`AGENTS.md` が断定形で使用を義務づけている context-mode が任意に落ちる。
3. 導入コストと影響範囲。導入者の負担は最小だが、規約上の重要度と無関係に決まり AF の体系とずれる。

**正本の位置**

1. `toolchain-flow.md` の既存「優雅な縮退」表を拡張。
2. 新規 `tool-requirements.md`。独立して読めるが、ツールの話が 2 文書に分かれる。
3. `manifest.env` を正本にする。二重管理は原理的に起きないが、区分の理由を説明する場所が無くなる。

## 決定

- 強制手段は **検証スクリプト＋文書**。`scripts/check-agent-tools.sh` を新設する。CI には持ち込まない。
- 分類基準は **縮退先の有無**。フォールバックが定義できれば recommended、無ければ規約が成立しないので must。
- 必須セットは **profile ごとに変える**。`.ai/profiles/<profile>/tools.tsv` に宣言する。
- 正本は **`toolchain-flow.md` の縮退表を拡張**する。新規文書は作らない。
- 分類結果は must が `git` / `gh` / `context-mode`（codex 系）/ `superpowers`（claude 系）の 4 つ。Serena、context7、Spec Kit、crit、skills、crabbox、Linear、Symphony は recommended。
- エージェントの行動契約として、**must が未導入なら作業を止めて導入を促す。recommended は尋ねられたときだけ推奨する。**
- 自動インストールはしない。環境変更は人間の承認領域に留める。

## 理由

- **縮退先の有無を基準にすると、分類表を作る作業が既存の縮退表を完成させる作業と同一になる。** 別表を立てないので二重管理が生じない。さらに表の形式（must の行は fallback 欄が空、recommended の行は必ず埋まる）が基準そのものを強制し、「must にしたのに縮退先も書く」矛盾が構造的に起きない。
- **profile ごとに分けないと成立しない。** context-mode は Codex プラグイン、superpowers は Claude Code プラグインであり、共通の 1 リストにすると copilot profile で Codex プラグインを必須にするような矛盾が出る。
- **context7 と Serena を recommended にしたのは基準を正直に当てた結果。** context7 は WebSearch/WebFetch、Serena は rg/grep という実在する縮退先を持つ。強制力の観点では context7 を must にしたかったが、基準に例外を作ると基準が機能しなくなる。代わりに縮退先を明文化することで、これまで曖昧だった「when available」の実体を与えた。
- **superpowers だけ must に残した。** 企画段の規律（brainstorming → 設計承認 → writing-plans）は plan mode では代替できない。plan mode は対話の場であって、設計を承認ゲートで区切る仕組みではない。
- **CI に持ち込まない。** CI ランナーには対象プラグインが存在せず、検査できるのは `git` / `gh` 程度になる。通っても意味がないチェックは、あることで安心を与える分だけ有害。

## 情報ソース

- 実機確認（2026-08-01、macOS）: `claude plugin list` → `superpowers@claude-plugins-official 6.1.1` / `skills@ai-builder-club 0.1.0`、`codex mcp list` → `context-mode` / `serena` / `context7` / `linear` / `github` / `atlassian`、`command -v` → `gh` `git` `specify` `serena` `crit` `uv` `node` すべて導入済み
- `claude mcp list` が空だったこと（context7 は Codex にのみ登録されており Claude Code からは見えなかった）。本設計中に `claude mcp add --transport http context7 https://mcp.context7.com/mcp --scope user` で登録し、接続を確認した
- superpowers: https://github.com/obra/superpowers
- Spec Kit: https://github.com/github/spec-kit
- Symphony: https://github.com/openai/symphony
- context7 MCP endpoint: https://mcp.context7.com/mcp
- 既存 AF docs: [../framework/toolchain-flow.md](../framework/toolchain-flow.md)、[../framework/codex-dev-stack.md](../framework/codex-dev-stack.md)、[../framework/ai-environment-profiles.md](../framework/ai-environment-profiles.md)、[../framework/quality-gates.md](../framework/quality-gates.md)
- 要件定義: [../planning/requirements/2026-08-01-tool-requirements.md](../planning/requirements/2026-08-01-tool-requirements.md)

## 影響範囲

- 新規: `scripts/check-agent-tools.sh`、`templates/project/scripts/check-agent-tools.sh`、`templates/project/.ai/profiles/*/tools.tsv`
- 変更: `docs/framework/toolchain-flow.md`（縮退表 → ツール要件表）、`AGENTS.md`、`templates/project/AGENTS.md`、`templates/project/.ai/profiles/*/files/` 配下の各 entrypoint（`AGENTS.md` / `CLAUDE.md` / `.github/copilot-instructions.md`）、`scripts/bootstrap-project.sh`、`docs/framework/project-adoption.md`、`docs/framework/environment-reproducibility.md`
- 併せて既存の不整合を修正する。`AGENTS.md` の Mandatory Routing が profile 非依存の書き方で Codex 前提の内容（context-mode）を必須化しており、claude profile では満たす手段が存在しない。profile 依存のツール名を entrypoint へ移す。

## 却下した案・再検討条件

- **CI required check 化** — 却下。検査できる対象が `git` / `gh` 程度に限られ形骸化する。再検討条件: CI 上でエージェントを実行する運用（Symphony のホスト運用など）を始めたとき。
- **共通 1 リスト** — 却下。profile 間の矛盾が避けられない。
- **`manifest.env` への相乗り** — 却下。`manifest.env` は配置定義という単一の役割を持つ。またハイフンを含むツール名（`context-mode`）は shell 変数名にできない。
- **context7 を must にする** — 却下。WebSearch/WebFetch という実在する縮退先がある以上、基準に例外を作ることになる。再検討条件: AF の規約文が context7 の存在を前提とする記述（「API 利用前に context7 で最新仕様を確認する」等）を Mandatory Routing に置いたとき。その時点で縮退先が消えるため must へ移る。
- **Claude Code 版の端末セットアップ文書を新設** — 今回は見送り。導入手順は context7 経由で参照し AF 側にベタ書きしない方針を採ったため。再検討条件: context7 で解決できないツールが must に増えたとき。
