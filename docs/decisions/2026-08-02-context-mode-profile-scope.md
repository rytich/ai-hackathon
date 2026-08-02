# 判断: context-mode の対象 profile を claude まで広げる

## 日付
2026-08-02

## 背景 / 課題

- [2026-08-01-tool-requirements.md](2026-08-01-tool-requirements.md) は `context-mode` を「Codex プラグイン」と前提し、対象 profile を `codex` / `codex-claude` に限定した。`claude` profile には縮退先が無いとして、`claude` の entrypoint（`CLAUDE.md`）からは context-mode の記述を外し、代わりに「大量出力・ログ・広域検索は script かサブエージェントで要約してから判断する」という文言に差し替えていた。
- この前提は事実誤りだった。発覚の経緯: Task 6（`tools.tsv` の `docs` 列を context7 のライブラリ ID に置き換える残タスク）に着手し、`context-mode` の `docs` 列を解決するためインストール済みプラグインの実体を確認したところ、`/Users/ichie/.codex/plugins/cache/context-mode/context-mode/1.0.169/package.json` の `description` に "Works with Claude Code, Gemini CLI, VS Code Copilot, OpenCode, and Codex CLI." とあり、Codex 専用ではないことが判明した。README にも Claude Code 向けの導入手順が 2 通り（プラグインマーケットプレイス経由、MCP 直接登録）明記されている。
- つまり `claude` profile が縮退先（script/サブエージェントによる要約）を持っていたのは、「context-mode が Claude Code から使えない」という誤った前提の産物であり、正しい前提の下では縮退先ではなく単なる代替不能な省略だった。

## 選択肢

- **claude profile まで拡張し must にする** — 前提の誤りを訂正し、`context-mode` が実際に対応する範囲（claude を含む）を対象 profile に反映する。
- **対象 profile はそのまま（codex, codex-claude）にして、理由の記述だけ直す** — 対象範囲を変えずに「Codex プラグイン」という誤記だけ訂正する。却下（後述）。
- **別 Issue へ先送りする** — 本件を対象範囲に含めず、新規 Issue を立てて検討する。却下（後述）。

## 決定

- `context-mode` の対象 profile を `codex, codex-claude` から **`codex, claude, codex-claude`** へ拡張する。
- `claude` profile での区分は **must**（未導入時の縮退先は無し）とする。
- `claude` profile の check は、Claude Code の 2 通りの導入経路（プラグイン / MCP 直接登録）のどちらでも認識できるようにする:
  ```
  claude plugin list 2>/dev/null | grep -q context-mode || claude mcp list 2>/dev/null | grep -q context-mode
  ```
- `codex-claude` profile の check も、Codex 側に加えて Claude Code の 2 経路を受理するよう拡張する（3 通りの `||` 連結）。

## 理由

- 分類基準は [2026-08-01-tool-requirements.md](2026-08-01-tool-requirements.md) が定めたとおり**縮退先の有無**であり、本判断もこれを継承する。基準そのものは変えていない。
- `claude` profile が「fallback を持つ」と判定されていたのは、context-mode が Claude Code に存在しないという誤った前提の産物にすぎない。前提を訂正すると、`claude` profile にも context-mode という縮退不要な手段が実在することになり、既存の縮退文言（script/サブエージェントで要約）は代替手段ではなく単に基準を満たさない省略と分かる。縮退先が無い以上、基準に従えば `claude` も must に分類するのが整合的である。
- 一方、`AGENTS.md` の Mandatory Routing を profile 非依存の書き方に直した [2026-08-01-tool-requirements.md](2026-08-01-tool-requirements.md) の修正（「大量出力等は、生データを会話へ流さず要約してから判断する。使う手段は profile ごとの entrypoint に従う」という書き方への変更）は、本件とは独立に正しい。profile 非依存のファイルが特定ツールの使用を断定形で義務づけると、そのツールを持たない profile で規約が成立しなくなる問題自体は、context-mode が claude profile に対応するかどうかに関わらず存在する。したがって Mandatory Routing 側の修正は取り消さず、profile 依存のツール名は entrypoint 側（`CLAUDE.md` / `AGENTS.md` 等）に置く方針を維持する。

## 情報ソース

- `/Users/ichie/.codex/plugins/cache/context-mode/context-mode/1.0.169/package.json`（`repository.url`: `https://github.com/mksglu/context-mode`、`version`: `1.0.169`、`description`: "MCP plugin that saves 98% of your context window. Works with Claude Code, Gemini CLI, VS Code Copilot, OpenCode, and Codex CLI. ..."）
- README（同パッケージに同梱）が示す Claude Code 向け導入手順 2 通り:
  - プラグインマーケットプレイス経由（推奨）: `/plugin marketplace add mksglu/context-mode` → `/plugin install context-mode@context-mode`（`claude plugin list` に現れる）
  - MCP 直接登録: `claude mcp add context-mode -- npx -y context-mode`（`claude mcp list` に現れる）
- https://github.com/mksglu/context-mode

## 影響範囲

- `templates/project/.ai/profiles/claude/tools.tsv`（`context-mode` 行を must として追加、`superpowers` 直後に配置）
- `templates/project/.ai/profiles/codex-claude/tools.tsv`（`context-mode` の check を Claude Code 2 経路を含む 3 択 `||` へ拡張）
- `docs/framework/toolchain-flow.md`（ツール要件表の `context-mode` 対象 profile を `codex, codex-claude` → `codex, claude, codex-claude` に修正。未導入時欄は `-` のまま変更なし）
- `templates/project/.ai/profiles/claude/files/CLAUDE.md`（script/サブエージェント要約の文言を、他 profile の must ツールと同じ形の行動契約に差し替え）
- [2026-08-01-tool-requirements.md](2026-08-01-tool-requirements.md) および `docs/planning/requirements/2026-08-01-tool-requirements.md` は意図的に訂正しない。両者は意思決定・要件定義の時点記録であり、本書がその後の事実訂正を反映する現行の正本となる。

## 却下した案・再検討条件

- **対象 profile はそのままで理由の記述だけ直す** — 却下。分類基準（縮退先の有無）を正しく適用すると、前提訂正後の `claude` profile には縮退先が無いため、対象範囲を変えずに理由だけ書き換えると表の記述と基準の適用結果が矛盾したままになる。基準を反故にしないためには対象範囲自体を直す必要がある。
- **別 Issue へ先送りする** — 却下。誤り自体は本 Issue（#35）の成果物（`tools.tsv` 群、`toolchain-flow.md`、`CLAUDE.md`）に直接含まれており、既に配布可能な状態でリポジトリに存在する。事実誤りを含んだ規約文を放置する期間を最小化するため、発見した当箇所で即時訂正する。再検討条件は無し（先送りしない判断そのものが決定）。
