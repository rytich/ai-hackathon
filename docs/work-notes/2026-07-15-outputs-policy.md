# 作業サマリー: 出力形式の検証と outputs/ のコミット方針

## 日付 / branch / AI profile
2026-07-15 / `1acx/outputs-policy` / Claude Code

## 対象
P2-6「成果物の出力形式」の実地検証と、そこで未決だった `outputs/` の git 管理方針の決定。

- 検証: [../planning/research/2026-07-15-output-format-verification.md](../planning/research/2026-07-15-output-format-verification.md)
- 判断: [../decisions/2026-07-15-outputs-commit-policy.md](../decisions/2026-07-15-outputs-commit-policy.md)

## 内容

1. **検証** — AF 自身の対外説明資料を題材に、原稿（md 5.5KB）と生成物（HTML 19.8KB）を実際に作成。機械検証（タグ整合・自己完結・両テーマ・横スクロール封じ込め・原稿カバレッジ）を通し、形式ごとの差を比較した。
2. **materials 規約の拡張** — `docs/knowledge/materials/README.md` に「原稿と配布形態を分ける」節を追加。HTML と pptx/pdf の使い分け、生成物を直接編集しない、配布形態を正本にしないルールを明記。配布テンプレート側にもミラー。
3. **outputs/ のコミット方針** — AF 本体は `outputs/*` を ignore（`outputs/README.md` のみ追跡）、導入先は `outputs/` をコミットし `outputs/tmp/` のみ除外。両方に `.gitignore` と `outputs/README.md` を新設。バイナリの扱い（git 履歴は追記型、テキスト形式優先、大きいものは LFS か外部リンク）と秘密情報の確認も明記。
4. **原稿の実例** — `docs/knowledge/materials/agentic-framework-overview.md` を追加。空だった materials/ の最初の実コンテンツ兼、規約の実例。

## 理由
判断基準は「リポジトリの種類」ではなく「**その生成物に受け手がいるか**」。導入先の対外資料は非エンジニアが参照する最終形で、repo 外にあると AF の再現性原則が非開発カテゴリで破綻する。AF 本体の生成物には受け手がいないため同じ理屈が適用されない。

## 検証
- `git check-ignore` で AF 側: `outputs/README.md` は追跡、HTML と pptx は除外を確認。
- 一時 repo へ実 bootstrap し、導入先側: `outputs/README.md` と `outputs/deck.html` は追跡、`outputs/tmp/scratch.html` と `.env` は除外を確認。
- `docs/knowledge/materials/README.md` と配布テンプレート側ミラーの一致を確認。

## 未完了 / 次の作業
- 導入済みプロジェクト（ten_matcha / bonsmith_corporate）への反映は未実施。どちらも現状 `outputs/` を持たないため、必要になった時点で `project-update.md` の手順で反映する。
- Artifact URL は claude.ai アカウント前提のため、社外配布には HTML 現物の受け渡しが別途必要。
- P2 の残り: 非エンジニアの参加経路、学習の昇華経路（work-note → `.agents/skills/`）。
