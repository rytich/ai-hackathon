# GitHub Copilot Instructions

Read these shared project instructions before making or suggesting changes:

1. `AGENTS.md`
2. `docs/framework/ai-execution-framework.md`
3. `docs/framework/agent-settings-replication.md`
4. `docs/framework/quality-gates.md`
5. `docs/framework/knowledge-base.md`

Project-specific agent skills live in `.agents/skills/<name>/SKILL.md`.

ドキュメントは `docs/` 配下に日本語で構造化して保存する。企画（調査・要件定義）と実作業を分離し、意思決定は情報ソース付きで `docs/decisions/` に残す。詳細は `docs/framework/knowledge-base.md`。

指示・Issue には What / Why / How を含める。重要な作業ほど Why（背景・経緯）を厚く書く。詳細は `docs/framework/collaboration-rules.md` の Instruction Pattern。

ツールチェーンは `docs/framework/toolchain-flow.md` の標準フローに沿う（superpowers が使えないためこの profile の企画は plan mode で練り、成果を `docs/planning/` に残してから Linear へ、実装 Spec Kit→GitHub Issue、検証 crit→Issue、解決→Linear ロールアップ）。標準外の進め方を人間が選ぼうとしたら、非推奨と明示し代替案を提示する。

- ツール要件と検査は `docs/framework/toolchain-flow.md` のツール要件表と `./scripts/check-agent-tools.sh` に従う。この profile の must は git と gh のみ。**must が未導入と分かったら、作業を止めて導入を促す。縮退して進めない。** recommended は自発的に勧めず、尋ねられたとき、または縮退のコストが明らかに高いときだけ提示する。ツールを自動でインストールしない。

Keep suggestions aligned with the repository quality gates, safety rules, and active GitHub Issue/PR state.
