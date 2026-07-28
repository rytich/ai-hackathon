# Project Agent Skills

Store repeatable agent workflows here. 詳細な規約は `docs/framework/agent-settings-replication.md` を参照。

Each skill lives in `.agents/skills/<name>/SKILL.md` with frontmatter:

- `name` — 固有の識別子（外部フレームワークと衝突しない接頭辞を付ける）
- `description` — 何をするか＋**いつ使うか**（トリガーになる語を含める）
- `argument-hint`
- `allowed-tools` — 必要最小限
- `status` — `active | in-progress | deprecated`

本文には workflow steps / safety rules / references を置く。

## 原則

- **昇華トリガー**: 同じ手順を work-note で 3 回以上繰り返したら skill 化する。1〜2 回で先回りしない。
- **Progressive disclosure**: `SKILL.md` は目次に留め、詳細は `references/`（1 階層まで）、コマンドは `scripts/` へ。
- **危険な skill**（production/顧客データ、bulk message、migration、billing）は自動呼び出しを無効化し、明示要求時のみ実行する。
- **ライフサイクル**: 使われなくなった skill は `deprecated` にして畳む。放置は誤誘導のもと。
- **共存**: 外部 skill フレームワークと命名・哲学が衝突しないようにする。第三者 skill は中身を見てから入れる。

Tool-specific compatibility files should point back to this directory instead of duplicating detailed instructions.
