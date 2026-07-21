# outputs — 生成物（agentic-framework 本体）

原稿（`docs/knowledge/materials/`）から生成した配布形態を置く。

## このリポジトリでは生成物をコミットしない

AF 本体の生成物は、フレームワーク開発の副産物（デモ用デッキ、検証用レンダリング）で、**配布先が存在しない**。bootstrap で導入先へ配られるものでもない。よって `.gitignore` で除外し、この README だけを追跡する。

原稿は `docs/knowledge/materials/` に残るため、必要になれば再生成できる。

## 導入先プロジェクトでは方針が逆になる

導入先プロジェクトの `outputs/` は**コミットする**。対外資料・提案書・レポートは事業の成果物そのもので、非エンジニアが参照する最終形でもあり、「repository 内の成果物だけで再現する」という原則の対象になるため。

配布される雛形は `templates/project/outputs/README.md` と `templates/project/.gitignore` を参照。

判断の基準は**受け手がいるか**であって、リポジトリの種類ではない。
