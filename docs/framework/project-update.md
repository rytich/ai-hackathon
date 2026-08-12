# Project Update Guide（導入済みプロジェクトの AF 更新）

`agentic-framework`（以下 AF）を既に導入済みのプロジェクトへ、AF 側の最新変更を反映する手順。新規導入は [project-adoption.md](project-adoption.md) を参照。

## 前提

AF は `bootstrap-project.sh` の `copy_if_missing` により**既存ファイルを上書きしない**。そのため単純な再実行では更新にならない。加えて、導入先プロジェクトは運用しながら**独自にカスタマイズ**していることが多い（フォルダ名を日本語化する、カテゴリを事業に合わせて再編する、など）。よって更新は「機械的な再配布」ではなく、**差分の洗い出し→反映方針の判断→個別反映**という手順を踏む。

## 手順

### 1. 導入先の現状を把握する

- `AGENTS.md` と `.ai/active-profile` を確認し、使っている profile を特定する。
- `docs/` の構造を確認する。AF の標準構造（`docs/framework/` `docs/knowledge/` `docs/planning/` `docs/decisions/` `docs/work-notes/`）をそのまま使っているか、独自の IA（Information Architecture）に再編されているかを見る。
- 独自 IA の場合は、その IA のルールファイル（多くは `docs/README.md` 相当）を読み、カテゴリの対応関係を把握する。

### 2. 標準構造かどうかで進め方を分ける

| 状態 | 進め方 |
|---|---|
| AF の標準構造のまま | `scripts/bootstrap-project.sh <target>` を再実行してよい。`copy_if_missing` なので既存ファイルは壊れない。存在しないファイル（新設された `docs/framework/*.md` など）だけが追加される。実行後、3 以降で中身の更新差分を確認する。 |
| 独自 IA にカスタマイズ済み | **bootstrap を再実行しない**（新旧 2 つの構造が並立し、二重管理になる）。3 以降の手順で、AF 側の変更点を導入先の対応ファイルに**個別に反映**する。 |

### 3. 差分を洗い出す

AF リポジトリの `docs/framework/*.md` と、導入先の対応ファイルを突き合わせる。

```bash
diff <導入先の対応ファイル> /path/to/agentic-framework/docs/framework/<同名ファイル>
```

独自 IA でファイル名やパスが違う場合は、内容（ルールの文面、チェック項目、テンプレートの型）で対応させる。過去の対応例:

| AF 側 | 独自 IA 側の対応（例: ten_matcha） |
|---|---|
| `docs/framework/` | `docs/バックオフィス/エージェント運用/` |
| `docs/decisions/` | 各カテゴリ内の判断ログ（`decision-log-template.md`） |
| `docs/work-notes/` | `docs/バックオフィス/作業記録/` |
| `docs/knowledge/business/*` | 事業カテゴリ（市場調査／ブランド／製品／サービス／製造 等）に分散 |

### 4. 反映方針を判断する

差分は 2 種類に分かれる。

- **構造の追加**（例: 新しい `docs/knowledge/` サブカテゴリ、`knowledge-base.md` の新設）
  → 既存 IA に相当するカテゴリが**既にあれば新設しない**。維持機構表（下記）にマッピングを追記するだけで済ませる。相当するカテゴリが無い場合のみ、既存 IA の作法（フォルダ命名・言語）に合わせて追加する。
- **ルール文面の追加・修正**（例: 品質ゲートへのチェック項目追加、テンプレートへの必須欄追加）
  → 既存ファイルに、既存 IA の用語・パスに合わせて追記する。AF の文面をそのまま貼らない。

**やってはいけないこと**: 独自 IA を持つプロジェクトに対して、AF の新しいフォルダ構造（`docs/framework/` 等）をまるごとコピーし、既存構造と並立させること。概念が重複し、どちらが正か分からなくなる。

### 5. 典型的な反映内容（AF の直近の変更例）

- `docs/framework/quality-gates.md` の Required Checks / Reviewer Checklist に「docs 鮮度チェック」を追加した → 導入先の品質ゲートファイルにも同趣旨を追記。
- 意思決定ログのテンプレートに「情報ソース」欄を必須化した → 導入先の decision log テンプレートにも同欄を追加。
- `docs/framework/knowledge-base.md` に「企画（調査・要件定義）と実作業を分離する」「Codex/Claude 双方で `docs/` を維持する」を明文化した → 導入先の IA ルールファイル（`docs/README.md` 相当）に同趣旨を追記し、「維持機構（更新トリガー×置き場）」表を導入先のカテゴリ名で作る。
- パス参照の誤り（存在しないファイルを指している等）は、AF の更新とは無関係でも見つけ次第その場で直す。

### 6. 反映後の検証

- 編集したファイル内の相対リンク・パス参照が実在するか確認する。
- `AGENTS.md` の Required Reading Order が指すパスと実ファイルが一致しているか確認する。
- 無関係な既存差分（他エージェントや自動生成ファイルの変更）をコミットに含めない。`git status` で確認してから `git add` は対象ファイルを明示する。

### 7. コミット方法

- 数ファイルの小さな追記・文言修正: 対象プロジェクトの運用ルールに従い、`main` へ直接コミットしてよい。
- 構造変更やルールの解釈が変わる規模の変更: そのプロジェクトの `AGENTS.md`（1 Issue = 1 branch = 1 PR）に従い、ブランチを切って PR にする。
- どちらでも、コミットメッセージに「AF のどの変更を反映したか」を残す（後から追跡できるように）。

### 8. 更新のタイミング

- AF リポジトリで `docs/framework/` に変更が入ったとき（このガイド自体もその一部）。
- 導入先で「これは AF のルールとして守るべきか」という疑問が出たとき。
- 定期棚卸し（例: 月次）で、AF の `docs/decisions/` に新しい意思決定記録が増えていないか確認する。

## AF-only update scope

AF 更新はアプリの機能変更や実測 metrics と同じ commit に混ぜない。candidate manifest と managed file だけを stage し、両側 checksum と ownership を検査する。

```bash
git add .agentic-framework scripts/agentic scripts/metrics.mjs scripts/check-af-update-scope.mjs
node scripts/check-af-update-scope.mjs --staged
git commit -m "chore: update agentic framework"
```

`AGENTS.md`、`.ai/`、`.github/`、project 固有 docs などの `seeded` file、アプリ source、`.af-metrics/` と `.af-metrics.local.json` は AF 更新 commit に含めない。scope check は remote 作成、commit、push を行わないため、成功後も staged diff を人間が確認する。

この検査は local Git command を直接実行すれば迂回できる。v0.2.4 の保証は staged scope の fail-closed 検査までであり、remote での強制ではない。v0.2.5 で CODEOWNERS と branch protection の guidance を追加する。それまでは AF-only commit の review を必須とし、「厳守できる」と誇張しない。

## チェックリスト

- [ ] 導入先の `docs/` 構造（標準 / 独自）を確認した
- [ ] AF `docs/framework/*.md` との差分を洗い出した
- [ ] 構造変更とルール変更を区別し、既存 IA を壊さない形で反映した
- [ ] リンク・パス参照を検証した
- [ ] 無関係な差分を含めずコミットした
