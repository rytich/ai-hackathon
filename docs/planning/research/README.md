# research — 調査メモ

企画の一次調査を置く。**情報ソースを必ず添える。**

- ファイル名: `YYYY-MM-DD-<topic>.md`
- frontmatter 例:
  ```yaml
  ---
  title: <調査タイトル>
  date: YYYY-MM-DD
  status: draft | done
  sources: [<URL>, <URL>]
  ---
  ```
- 本文: 目的 / 調べたこと / わかったこと / 示唆 / 未確認事項。
- 確定した事実は [../../knowledge/](../../knowledge/) へ、判断は [../../decisions/](../../decisions/) へ反映する。

記入例: [_example-research.md](_example-research.md)

## 最新の調査

- [第1〜4回 AI Agent Hackathon 提出・受賞プロジェクト](hackathons/README.md) - 公式提出589件、受賞32件、構造化データ。
- [context7導入調査](2026-08-14-context7.md) - Codex / Claude Code導入、認証、tool contract、routing境界。
