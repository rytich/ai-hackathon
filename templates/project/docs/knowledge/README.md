# knowledge — 現在の事実（system of record）

「今どうなっているか」を保存する場所。開発・非開発を問わず、確定した知識の stock。企画中の検討は [../planning/](../planning/)、履歴は [../decisions/](../decisions/) と [../work-notes/](../work-notes/) に置く。

## カテゴリ

| フォルダ | 中身 |
|---|---|
| [product/](product/) | 確定した仕様・要件サマリ・ロードマップ |
| [engineering/](engineering/) | アーキ、runtime、secrets、テスト方針 |
| [business/](business/) | ビジネスモデル・マーケ・ブランディング・競合・法務 |
| [support/](support/) | FAQ・カスタマーサポート |
| [materials/](materials/) | 説明資料・ピッチ・対外資料 |

## ルール

- 各カテゴリの `README.md` がスキーマの正本。追加前に読む。
- 前提が変わったら、変更と同じ作業セッションで該当ファイルを更新する（[../framework/knowledge-base.md](../framework/knowledge-base.md#維持機構常に最新に保つ)）。
- 「なぜそうしたか」は本文に書かず、[../decisions/](../decisions/) にリンクする。
