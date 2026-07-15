# engineering — 開発知識

アーキテクチャ、実行環境、secret、テスト方針など、システム開発の現状を置く。

- 主なファイル:
  - `runtime.md` — runtime、package manager、起動・検証コマンド
  - `secrets.md` — secret 名と取得元（**値は書かない**）
  - `architecture.md` — 構成・依存・境界（必要になったら）
  - `testing.md` — テスト戦略・品質ゲート補足（必要になったら）
- frontmatter 例:
  ```yaml
  ---
  title: <タイトル>
  status: active
  updated: YYYY-MM-DD
  ---
  ```
- 更新トリガー: アーキ・runtime・secret・依存の変更（主担当: Implementer）
- secret、token、production data の**値**は commit しない。
