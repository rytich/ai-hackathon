# docs/ 運用規約

このリポジトリの知識はすべて `docs/` 配下に**日本語で**、構造化して保存する。開発に直接関係しない知識（事業・サポート・法務など）も含む。

## 憲法（要約）

1. **1 知識 = 1 置き場。** どこに書くかは [index.md](index.md) と [framework/knowledge-base.md](framework/knowledge-base.md) に従う。
2. **企画と実作業を分離する。** 調査・要件・意思決定は `planning/` と `decisions/` に残してから実装に入る。
3. **意思決定には情報ソースと理由を添える**（`decisions/`）。
4. **前提が変わったら該当 knowledge を同じ作業で更新する**（維持機構）。
5. **Codex / Claude Code 共通**で `docs/` を single source of truth として維持する。

## フォルダ

| フォルダ | 役割 |
|---|---|
| [framework/](framework/) | エージェント運用ルール（メタ） |
| [knowledge/](knowledge/) | 現在の事実（stock、開発＋非開発） |
| [planning/](planning/) | 企画フェーズの成果（flow、調査・要件） |
| [decisions/](decisions/) | 意思決定記録（情報ソース＋理由） |
| [work-notes/](work-notes/) | 作業サマリー |

各フォルダの `README.md` がそのフォルダのスキーマ（書き方・命名規則・frontmatter）を定義する。追加前に読むこと。

正本は [framework/knowledge-base.md](framework/knowledge-base.md)。
