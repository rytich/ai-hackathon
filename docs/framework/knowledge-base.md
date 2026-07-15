# 知識ベース構造（knowledge base）

この document は `docs/` 全体の構造・スキーマ・維持ルールの**正本**です。AI エージェント（Codex / Claude Code）と人間が、開発・非開発を問わずプロジェクトの知識を同じ場所・同じ型で蓄積し、常に最新に保つための規約を定めます。

原則:

- すべて **markdown + frontmatter を git で管理**する（diff・レビュー・エージェント編集が可能）。
- すべて **日本語**で書く（コード識別子・固有名詞・コマンドは原文可）。
- **1 つの知識は 1 つの置き場**を持つ。横断は tag と link で表現し、複製しない。

---

## 4 つのレイヤー

| レイヤー | フォルダ | 性質 | 中身 |
|---|---|---|---|
| framework | `docs/framework/` | メタ（運用ルール） | エージェント運用の規約。プロジェクトが変わっても共通 |
| knowledge | `docs/knowledge/` | stock（現在の事実） | 「今どうなっているか」。開発＋非開発の system of record |
| planning | `docs/planning/` | flow（企画中の成果） | 調査メモ・要件定義。plan mode で作り、確定後に knowledge へ反映 |
| record | `docs/decisions/`, `docs/work-notes/` | log（履歴） | 意思決定の記録と作業サマリー。追記型 |

> **stock と flow を混ぜない。** 「今の正しい状態」は `knowledge/`、「そこに至る調査・検討」は `planning/`、「なぜそう決めたか」は `decisions/`、「誰が何をしたか」は `work-notes/`。

---

## 企画と実作業の分離

調査・要件定義（企画）と実装（実作業）を、フェーズとして明確に分ける。

```
[企画フェーズ]  plan mode などで実施
  調査        → docs/planning/research/<topic>.md    （情報ソースを必ず添える）
  要件定義    → docs/planning/requirements/<topic>.md
  意思決定    → docs/decisions/YYYY-MM-DD-<topic>.md  （情報ソース＋理由）
        │  人間承認（必要な領域）
        ▼
[実作業フェーズ]  実装・検証
  コード変更  + docs/knowledge/ を同時更新（影響カテゴリ）
  作業記録    → docs/work-notes/YYYY-MM-DD-<topic>.md
```

- 企画の成果物を残さずに実装へ進まない。最低限、要件または意思決定のいずれかを `planning/` / `decisions/` に置く。
- 実装で knowledge が古くなる場合は、同じ作業セッションで該当カテゴリを更新する（下記「維持機構」）。

---

## 意思決定の型（`docs/decisions/`）

ファイル名: `YYYY-MM-DD-<短いトピック>.md`。次の項目を簡潔に埋める。

```md
# 判断: <短いタイトル>

## 日付
YYYY-MM-DD

## 背景 / 課題
- 何を決める必要があったか

## 選択肢
- A / B / C

## 決定
- 採用したもの

## 理由
- なぜそれを選んだか（簡潔に）

## 情報ソース
- <URL / 参照した repo・記事・skill・社内資料など。何を根拠にしたか>

## 影響範囲
- 更新した docs / コード / 対象カテゴリ

## 却下した案・再検討条件
- 却下理由 / 見直すトリガー
```

**情報ソースは必須**。企画で参照した URL・ツール・資料を残し、後から根拠を追跡できるようにする。

---

## knowledge のカテゴリ（`docs/knowledge/`）

| カテゴリ | フォルダ | 何を置くか |
|---|---|---|
| プロダクト | `product/` | 確定した仕様・要件サマリ・ロードマップ |
| 開発 | `engineering/` | アーキテクチャ、`runtime.md`、`secrets.md`、テスト方針 |
| 事業 | `business/` | ビジネスモデル、マーケティング、ブランディング、競合、法務・規制 |
| サポート | `support/` | FAQ、カスタマーサポートの方針・定型応答 |
| 説明資料 | `materials/` | ピッチ、対外説明資料、紹介文 |

各フォルダの `README.md` がそのカテゴリのスキーマ（frontmatter 項目・書き方・命名規則）を定義する。artifact を追加する前に読むこと。

---

## 維持機構（常に最新に保つ）

知識が陳腐化しないよう、更新のトリガーと担当を固定する。

| トリガー（この変更が起きたら） | 更新する場所 | 主担当ロール |
|---|---|---|
| 仕様・受け入れ条件の確定 | `knowledge/product/` | Coordinator |
| アーキ・runtime・secret・依存の変更 | `knowledge/engineering/` | Implementer |
| 価格・提供形態・事業方針の変更 | `knowledge/business/business-model/` | Human Approver |
| 施策・チャネル・キャンペーン | `knowledge/business/marketing/` | 担当者 |
| トーン&マナー・ロゴ・命名規則 | `knowledge/business/branding/` | 担当者 |
| 競合の新情報 | `knowledge/business/competitive/` | 調査担当 |
| 規約・法令・プライバシー | `knowledge/business/legal/` | Human Approver |
| 問い合わせ傾向・定型応答 | `knowledge/support/` | サポート担当 |
| 対外資料の更新 | `knowledge/materials/` | 担当者 |

強制の仕組み:

- **PR チェック**: `docs/framework/quality-gates.md` の「docs 鮮度チェック」で、変更が影響する knowledge カテゴリの更新有無を確認する。
- **同時更新義務**: `AGENTS.md`「Knowledge Base（docs の維持）」に従い、前提が変わったら同じ作業で docs を更新する。
- **Codex / Claude 共通**: どちらのエージェントも `docs/` を single source of truth として維持する。tool 固有の記憶やチャット履歴に知識を残さない。

---

## ルール（DRY / MECE）

1. **1 つの知識 = 1 つの置き場。** 横断は link（`[[...]]` や相対パス）で表現し、複製しない。
2. **stock / flow / log を混ぜない。** knowledge は現在、planning は企画中、decisions/work-notes は履歴。
3. **frontmatter は検索するもの。** 状態・カテゴリ・日付など query したい情報は frontmatter に、説明は本文に。
4. **早すぎる細分化をしない。** カテゴリやサブフォルダは実際に必要になってから増やす。
