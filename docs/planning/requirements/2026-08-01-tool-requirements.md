---
title: エージェント必須ツールと推奨ツールの分離
status: approved
updated: 2026-08-01
links:
  - ../../decisions/2026-08-01-tool-requirements.md
  - ../../framework/toolchain-flow.md
---

# エージェント必須ツールと推奨ツールの分離

## 背景

AF はツールの**使い方**（どの段で何を使うか）を `docs/framework/toolchain-flow.md` に定めているが、**導入させる仕組みを持たない**。現状を調べたところ、ツールごとに整備度が大きく異なっていた。

| ツール | 行動ルール | 導入手順 | 未導入時の縮退 |
|---|---|---|---|
| Serena | あり（条件付き） | あり（`codex-dev-stack.md`） | 明文なし |
| context-mode | あり（断定形） | 不完全（インストールコマンドが欠落） | 明文なし |
| superpowers | あり | **なし** | **なし** |

superpowers は標準フローの企画段を担う位置づけなのに、導入方法も未導入時の代替も framework docs に存在しない。導入先プロジェクトは「入れ方が分からず、無い場合どうするかも書かれていない」状態に置かれる。

構造的な原因は、端末セットアップ手順が `codex-dev-stack.md` という Codex 専用文書にしかないこと。superpowers は Claude Code のプラグインであり、対応する文書が無い。

同時に、AF は `.ai/profiles/` で AI 環境ごとの設定切り替えを既に持っている。ツール要件も本来この profile 軸で表現されるべきものが、profile と無関係な散文として各所に散っている。

## スコープ

### やる

- ツールを **must**（未導入なら作業を止めて導入を促す）と **recommended**（尋ねられたときだけ推奨する）に分類する。
- 分類を profile ごとに機械可読な形で宣言する。
- 未導入を検出する検証スクリプトを提供し、導入手順に組み込む。
- エージェントの行動契約（must / recommended それぞれへの振る舞い）を規約化する。
- 分類作業の過程で判明した `AGENTS.md` の profile 依存の不整合を修正する。

### やらない

- CI の required check 化。CI ランナーに Codex / Claude Code のプラグインは入らないため、実質検査できる対象が限られ形骸化する。将来必要になったら別途判断する。
- ツールの自動インストール。環境変更は人間の承認領域（`quality-gates.md`）であり、スクリプトは検出と案内までに留める。
- `codex-dev-stack.md` に相当する Claude Code 版端末セットアップ文書の新規作成。今回は分類と検証の仕組みに絞る。導入手順そのものは context7 経由で参照する方針とし、AF 側にベタ書きしない。

## 設計

### 分類基準

**縮退先が定義できるか**で分ける。

- **must** — 未導入では AF の規約文が成立しない。縮退先を書かない。
- **recommended** — フォールバックが定義されており、無くても運用が破綻しない。

この基準の利点は、`toolchain-flow.md` の既存の「優雅な縮退」表がそのまま判定器になること。表に行があるものは recommended、無いものが must 候補になる。分類表を作る作業と縮退表を完成させる作業が同一になり、二重管理が生じない。

### 分類結果

| ツール | 区分 | 対象 profile | 未導入時の縮退 |
|---|---|---|---|
| git | must | 全 | — |
| gh | must | 全 | — |
| context-mode | must | codex, codex-claude | — |
| superpowers | must | claude, codex-claude | — |
| Serena | recommended | codex, claude, codex-claude | rg/grep によるテキスト検索 |
| context7 | recommended | 全 | WebSearch/WebFetch で公式ドキュメントを直接取得 |
| Spec Kit | recommended | 全 | plan mode ＋ `docs/planning/requirements/` |
| crit | recommended | 全 | PR のインラインコメント |
| skills | recommended | claude, codex-claude | `complete-task.sh` ＋ real-use gate |
| crabbox | recommended | claude, codex-claude | ローカル worktree |
| Linear | recommended | 全 | GitHub Issues のみで運用 |
| Symphony | recommended | codex | 対話セッションで手動実行 |

copilot / generic profile は must が `git` / `gh` のみになる。これらの環境では Codex プラグインも Claude Code プラグインも使えないため、正しい結果である。

### 機械可読な宣言 — `.ai/profiles/<profile>/tools.tsv`

profile ごとに 1 ファイル。`manifest.env` は「profile ファイルをどこに配置するか」という単一の役割を持つので、そちらに相乗りさせない。

列は `tool` / `class` / `check` / `fallback` / `docs` の 5 つ、タブ区切り。

```
# tool	class	check	fallback	docs
git	must	command -v git	-	-
gh	must	command -v gh	-	-
context-mode	must	codex mcp list | grep -q context-mode	-	<context7 ID>
serena	recommended	command -v serena	rg/grep によるテキスト検索	<context7 ID>
```

TSV を選んだ理由は 2 つ。`context-mode` のようにハイフンを含むツール名は shell 変数名にできないこと。`check` 欄がパイプを含むこと。

`docs` 列には **context7 のライブラリ ID** を入れる。未導入ツールの導入手順や API 仕様を AF 側にベタ書きせず context7 から引くことで、導入コマンドの陳腐化を構造的に防ぐ。context7 が未導入の環境では WebSearch/WebFetch で同じ情報源に到達する。

`check` は同じ profile 内でもエージェントによって異なる（`claude mcp list` と `codex mcp list`）。profile ごとにファイルを分けることでこの差分が自然に吸収される。

### 文書の正本 — `toolchain-flow.md`

既存の「優雅な縮退」節を「ツール要件」節に拡張し、`区分` / `対象 profile` / `検証` の列を追加する。新規文書は作らない。ツールの位置づけの正本を 1 箇所に保つ。

表の形式そのものが分類基準を強制する。**must の行は fallback 欄が必ず `-`、recommended の行は必ず埋まる。** 「must にしたのに縮退先も書く」という矛盾が構造的に起こらない。

### 検証スクリプト — `scripts/check-agent-tools.sh`

`.ai/active-profile` を読み、対象 profile の `tools.tsv` の各行を検査する。

- **must 欠落** — 欠落したツール名と `docs` 列の参照先を出力し、`exit 1`
- **recommended 欠落** — 縮退先を告げて `exit 0`
- **自動インストールはしない**

AF 本体は `.ai/` を持たない（profile 機構は `templates/project/` にのみ存在する）ため、`.ai/active-profile` が無い場合は `templates/project/.ai/profiles/<profile>/tools.tsv` を読み、profile は `--profile` で明示指定させる。AF が自分の配布物を自分に適用する形になる。

### 組み込み位置

- `bootstrap-project.sh` の末尾で実行し、結果を表示する。
- `project-adoption.md` の導入手順に追加する。
- `environment-reproducibility.md` の Bootstrap Checklist に追加する。

### エージェントの行動契約

`AGENTS.md` と各 profile の entrypoint に規約として入れる。これが「must で導入させる / 尋ねられたら推奨する」の実体である。

- **must が未導入と分かったら、作業を止めて導入を促す。** 縮退して進めない。
- **recommended は自発的に勧めない。** 尋ねられたとき、または縮退のコストが明らかに高いときだけ提示する。

### `AGENTS.md` の profile 依存の不整合

分類を profile 別に割り付ける過程で判明した既存の欠陥を、本件の一部として修正する。

`AGENTS.md` の Mandatory Routing は profile 非依存の書き方だが、内容は Codex 前提になっている。

> 大量出力、ログ、広い検索、集計、比較、parse は context-mode で処理する。

context-mode は Codex のプラグインであり、claude profile ではこの必須ルールを満たす手段が存在しない。`ai-environment-profiles.md` が定める「tool-specific files は薄い entrypoint にする」にも反する。

本件の仕組みを入れると `check-agent-tools.sh` がこの矛盾を検出してしまう（claude profile で must な context-mode が永久に欠落する）ため、修正は必須である。

- profile 依存のツール名を `AGENTS.md` 本体から各 profile の entrypoint へ移す。
- claude profile 側は「大量出力は script かサブエージェントで要約する」に置き換える。

## 受け入れ条件（検証可能な形）

- [ ] `templates/project/.ai/profiles/` の 5 profile すべてに `tools.tsv` があり、上表の分類と一致する。
- [ ] `./scripts/check-agent-tools.sh --profile codex-claude` が、この端末（must 4 つすべて導入済み）で `exit 0` を返す。
- [ ] `tools.tsv` から must の 1 行を意図的に壊すと `exit 1` になり、欠落ツール名と参照先が出力される。
- [ ] recommended が欠落しても `exit 0` を返し、縮退先が表示される。
- [ ] `toolchain-flow.md` のツール要件表で、must の行の fallback 欄がすべて `-`、recommended の行がすべて埋まっている。
- [ ] `AGENTS.md` と `templates/project/AGENTS.md` の本体に、profile 依存のツール名（context-mode / superpowers / Serena）が残っていない。
- [ ] claude profile の `CLAUDE.md` に context-mode への必須依存が残っていない。
- [ ] 5 profile すべての entrypoint（`AGENTS.md` / `CLAUDE.md` / `.github/copilot-instructions.md`）に行動契約が記載されている。
- [ ] `bootstrap-project.sh` を空ディレクトリに対して実行すると、末尾で検証結果が表示される。
- [ ] `./scripts/check-doc-links.sh` が broken 0 / orphan 0 で通る。
- [ ] 意思決定記録が情報ソース付きで `docs/decisions/` にある。
- [ ] 作業記録が `docs/work-notes/` にある。

## 制約

- `check` 欄は eval される。リポジトリ内の他のスクリプトと同じ信頼水準（バージョン管理下、PR レビュー対象）として扱う。外部から取得した `tools.tsv` を読み込ませない。
- スクリプトは bash / macOS を前提とする（AF の既存スクリプトと同じ）。
- 検証はローカル端末の状態を見るものであり、CI では意味を持たない。CI へ持ち込まない。

## 未決事項

- **`docs` 列の context7 ライブラリ ID は未確定。** context7 MCP は本設計中に user scope へ登録したが、MCP はセッション開始時にロードされるため当セッションからは呼べなかった。実装時に context7 の resolve で各ツールの ID を確定させる。推測値を書かない。
- context7 が ID を持たないツール（crit など社外公開の少ないもの）の `docs` 列の扱い。公式リポジトリ URL を入れるか `-` にするかは実装時に判断する。
- `codex-dev-stack.md` の context-mode インストールコマンド欠落は本件の範囲外だが、must に分類した以上いずれ埋める必要がある。別 Issue とするか本件に含めるかは実装着手時に判断する。

→ 承認後に実装。判断は [../../decisions/2026-08-01-tool-requirements.md](../../decisions/2026-08-01-tool-requirements.md) に残す。
