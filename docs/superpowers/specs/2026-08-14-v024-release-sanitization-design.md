---
title: v0.2.4 公開アーカイブ再サニタイズ・Release 設計
status: approved
updated: 2026-08-14
issue: https://github.com/rytich/agentic-framework/issues/63
requirements: ../../planning/requirements/2026-08-14-v024-release-sanitization.md
---

# v0.2.4 公開アーカイブ再サニタイズ・Release 設計

## 背景

`v0.2.4` のソースタグは `4fd1ae4edd2ffd541d7cff058d551195bb3a33d0` にあり、`VERSION` と CHANGELOG は同版で整合している。一方、生成済み公開 ZIP には公開 owner 名 `rytich` と個人環境の絶対パス `/Users/ichie/...` が残っている。既存の `build-public-archive.sh` は顧客・導入先名と秘密情報を検査するが、公開元 owner とホームディレクトリ由来のパスを正規化していない。

GitHub Release `v0.2.4` はまだ存在しない。既存タグを移動せず、サニタイズ処理を後続コミットで修正したうえで、同タグのソースから公開成果物を再生成して Release asset とする。

## 目的

- 公開 ZIP から `rytich` と `/Users/<user>`・Windows user profile の実名部分を除去する。
- リポジトリ内ドキュメントへの絶対リンクは相対リンクへ正規化し、リンクとしての意味を保つ。
- 公開元 repository URL の owner は `OWNER` プレースホルダーへ置換する。
- 同種の漏れを archive regression test で検出する。
- 既存 `v0.2.4` タグを動かさず、再生成した ZIP と SHA-256 ファイルを GitHub Release に公開する。
- 公開後に Release asset を再取得し、ローカル成果物とのハッシュ一致とサニタイズ条件を検証する。

## 対象外

- `v0.2.4` タグの移動・再作成
- AF 本体機能、VERSION、CHANGELOG の変更
- `ai.microdotz.net` のサイトファイル更新または production deploy
- 既存ドキュメント本文の一般的なリンク整理
- GitHub repository の visibility、branch protection、credential 設定の変更

## サニタイズ設計

`scripts/build-public-archive.sh` の既存 export・除外・固有名置換処理に、公開元識別子とローカルパスの正規化を加える。

1. `https://github.com/rytich/agentic-framework` の owner 部分を `OWNER` に置換する。Issue・PRへのパスは保持する。
2. `/Users/<user>/.../agentic-framework/` および Windows の同等パスが repository 内ファイルを指す場合、repository root より後ろだけを残して相対リンク化する。
3. repository 外を指す残りの user-home prefix は、macOS/Linux では `$HOME`、Windows では `%USERPROFILE%` に置換する。
4. 既存の `PUBLIC_ARCHIVE_REDACT` と secret-like pattern 検査は維持する。
5. 検証段で `rytich`、`/Users/<user>`、`C:\\Users\\<user>` が残っていれば archive を破棄する。

置換は UTF-8 text として読めるファイルだけを対象にし、バイナリには触れない。ZIPのルート名、ファイル一覧、除外対象は変更しない。

## テスト設計

`scripts/test-build-public-archive.sh` に、タグ付きfixtureへ次の文字列を追加して archive を生成する回帰テストを加える。

- 公開元 URL: `https://github.com/rytich/agentic-framework/issues/34`
- repository 内絶対リンク: `/Users/example/github/agentic-framework/docs/README.md`
- repository 外ホームパス: `/Users/example/.codex/example.json`
- Windows user profile: `C:\\Users\\example\\.codex\\example.json`

テストは修正前に生値が残って失敗し、修正後に次を確認する。

- `rytich` と user 名が archive 内に存在しない。
- URL は `https://github.com/OWNER/agentic-framework/issues/34` になる。
- repository 内リンクは `docs/README.md` になる。
- repository 外パスは `$HOME/.codex/example.json` と `%USERPROFILE%\\.codex\\example.json` になる。
- 既存の site/Cloudflare除外、tag/VERSION整合、secret検査が引き続き通る。

## Release 作成

サニタイズ修正を通常の branch・PRで `main` に取り込む。マージ済みの生成スクリプトを使い、入力ソースは既存 `v0.2.4` タグに固定して次の2 assetを生成する。

- `agentic-framework-v0.2.4-public.zip`
- `agentic-framework-v0.2.4-public.zip.sha256`

GitHub Release は既存タグ `v0.2.4` を対象にし、タイトルを `Agentic Framework v0.2.4` とする。Release notesには、機能変更がタグ内にあり、公開包装処理のサニタイズ修正は後続コミットで行ったことを明記する。タグは変更しない。

## 検証と失敗時の扱い

Release作成前に archive regression、ドキュメントリンク、主要回帰テスト、ZIP内文字列検査、SHA-256照合を実行する。1つでも失敗した場合はReleaseを作成しない。

Release作成後はassetを新しい一時ディレクトリへ再取得し、次を再検証する。

- ZIPのSHA-256が公開 `.sha256` と一致する。
- ローカルで検証したZIPと公開ZIPのSHA-256が一致する。
- `VERSION` が `0.2.4` である。
- owner名、個人ホームパス、secret-like値、除外対象ディレクトリが存在しない。

検証に失敗した場合はサイト更新へ進まず、Releaseをdraft相当として扱えるよう直ちに報告する。公開済みassetの差し替えは証跡を失うため、原因と対応方針を確認してから行う。

## 変更単位

1つのPRには、公開archiveのサニタイズ強化、回帰テスト、関連設計・work noteだけを含める。サイト更新は `microdotz-site` の別PRとする。
