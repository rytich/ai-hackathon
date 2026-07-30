# materials — 説明資料

ピッチ、対外説明資料、紹介文など、外部に見せる資料の原稿・元データを置く。

- ファイル名: `<topic>.md`（例: `pitch.md`, `product-intro.md`, `press-kit.md`）
- frontmatter 例:
  ```yaml
  ---
  title: <タイトル>
  status: draft | active
  updated: YYYY-MM-DD
  ---
  ```
- 更新トリガー: 対外資料の作成・更新（主担当: 担当者）
- ブランド基準は [../business/branding/](../business/branding/) に従う。

## 資料一覧（map of content）

作成した資料はここに一覧し、発見できる状態を保つ（孤立させない）。

- [agentic-framework 概要](agentic-framework-overview.md) — 対外説明用。docs 4 レイヤー・企画と実作業の分離・品質ゲート・複数 AI の使い分け

## 配布先（上書き対象）

| 対象 | 場所 |
|---|---|
| 公開用 zip | Google Drive `agentic-framework-public.zip`（file ID `101fkoLu7JW2Ubb8L4lLnZv7UqyrxjRYH`、リンクを知っている全員が閲覧可） |
| 構成の図解 | Claude Artifact（版数表記と更新日を zip に合わせる） |

版を上げたら、この 2 つを同じ作業で更新する。手順は下記「外部へ配布するとき」。

## 原稿と配布形態を分ける

**このフォルダの markdown が正本。** 配布形態はここから生成し、`outputs/` に置く。

| | 場所 | 役割 |
|---|---|---|
| 原稿 | `docs/knowledge/materials/<topic>.md` | 正本。レビューと差分追跡はここで行う |
| 配布形態 | `outputs/<topic>.<ext>` | 生成物。直接編集しない |

配布形態の選び方:

- **HTML** — 構造そのものが情報である資料（階層、フロー、対応関係）に向く。markdown の表では落ちる関係性を表現でき、URL 1 本で共有できる。テキストなので git とも相性がよい。
- **pptx / pdf** — 対面説明や配布形式が指定されている場合。バイナリなので更新頻度に注意する（`outputs/README.md` 参照）。

ルール:

- 生成物を直接編集しない。**原稿を先に更新してから再生成する。**
- 配布形態を single source of truth にしない。HTML は差分が読めず、レビューできない。
- 生成物のコミット方針は `outputs/README.md` に従う。

## 外部へ配布するとき（sanitize 必須）

この repository は private だが、フレームワーク自体は外部へ配布する。**repository の中身をそのまま渡さない。** 内部の作業記録や、他プロジェクト・顧客の名前が含まれるため。

配布用 archive は必ず次で作る。

```bash
scripts/build-public-archive.sh v0.2.0
```

このスクリプトが行うこと:

- `docs/work-notes/` の中身を落とす（内部の作業ログ。リンク切れを避けるため理由を書いた README を残す）。
- 他プロジェクト・顧客の固有名を汎用表記へ置換する。置換で崩れた日本語（列挙の重複、余分な空白）も整える。
- **伏せ漏れと秘密情報の混入を機械的に検証**し、引っかかったら archive を破棄して失敗する。

除外・置換のルールは環境変数で調整する（`PUBLIC_ARCHIVE_DROP` / `PUBLIC_ARCHIVE_REDACT` / `PUBLIC_ARCHIVE_REDACT_WITH`）。新しいプロジェクトや顧客が増えたら `PUBLIC_ARCHIVE_REDACT` の既定値を更新する。

### 配布方法（Google Drive 上の 1 ファイルを上書きする）

公開用 zip は **Google Drive の共有ファイル 1 つ**に置き、版が上がるたび**同じファイルを上書き**する。ファイル ID が変わらないので、資料側の URL を張り替えずに済む。

- ファイル名に版数を入れない（`agentic-framework-public.zip`）。上書きしても名前が実態と食い違わないようにするため。
- **どの版かは Drive の更新日時から辿る。** 資料側に更新日を書き、`CHANGELOG.md` の日付と突き合わせれば版が特定できる。
- 共有設定は「リンクを知っている全員が閲覧可」。直接ダウンロードの URL 形式は `https://drive.google.com/uc?export=download&id=<FILE_ID>`。

タグを切ったときの手順:

1. `git tag -a vX.Y.Z -m "Release X.Y.Z" && git push origin vX.Y.Z`
2. `scripts/build-public-archive.sh vX.Y.Z`
3. 生成された zip で **Drive の既存ファイルを上書き**する（新規アップロードにしない。ID が変わる）
4. 資料側の版数表記と更新日を直す

採用しなかった方法:

- **アーティファクトに zip を埋め込む（`data:` URI）** — Chrome が大きい `data:` URI のダウンロードをブロックするため実用にならなかった。
- **GitHub Release** — private repository の release asset は認証が必要。誰でも取得できるようにするには公開用の別 repository が要る。

**生の `git archive` や repository の zip を直接渡さない。** 必ず上記スクリプトを通す。
