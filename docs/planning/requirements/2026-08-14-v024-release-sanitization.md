---
title: v0.2.4 公開アーカイブ再サニタイズ・Release
status: approved
updated: 2026-08-14
links:
  - https://github.com/rytich/agentic-framework/issues/63
  - ../../superpowers/specs/2026-08-14-v024-release-sanitization-design.md
  - https://github.com/rytich/agentic-framework/tree/v0.2.4
---

# v0.2.4 公開アーカイブ再サニタイズ・Release

## What

`v0.2.4` タグを移動せず、公開ZIPから公開owner名と個人環境の絶対パスを除去できるようarchive生成処理を修正する。修正済み生成処理で同タグからZIPとSHA-256ファイルを再生成し、GitHub Release `v0.2.4`へ公開する。

## Why

現行ZIPには `rytich` と `/Users/ichie/...` が残っており、公開成果物として必要以上に生成環境を露出している。GitHub Releaseも未作成で、タグ、公開ZIP、検証用ハッシュを同じ公開証跡として取得できない。

## How

- 公開元URLのownerを`OWNER`へ置換する。
- repository内の絶対リンクを相対リンクへ変換する。
- 残るuser-home prefixを`$HOME`または`%USERPROFILE%`へ正規化する。
- archive regression testで生のowner名と個人ホームパスの残留を拒否する。
- 既存タグ`v0.2.4`のソースを、修正済み生成処理で包装する。タグ自体は変更しない。
- ZIPと`.sha256`をRelease assetとして公開し、再取得後に内容とハッシュを照合する。

## 対象外

- `v0.2.4`タグの付け替え
- AF本体機能、VERSION、CHANGELOGの変更
- `ai.microdotz.net`の更新・デプロイ
- repository visibility、Cloudflare、credential設定の変更

## 受け入れ条件

- archive regression testがowner URL、macOS/Linux home path、Windows user profileの残留を検出できる。
- 再生成ZIPに`rytich`、`/Users/<user>`、`C:\\Users\\<user>`、secret-like値、除外対象pathが残っていない。
- ZIP内`VERSION`が`0.2.4`である。
- 公開ZIPのSHA-256が公開`.sha256`およびローカル検証値と一致する。
- GitHub Release `v0.2.4`が既存タグを指し、ZIPとSHA-256の2 assetを持つ。
- Release notesに、タグ不変と後続サニタイズ修正による包装であることが明記されている。

詳細設計は [v0.2.4 公開アーカイブ再サニタイズ・Release 設計](../../superpowers/specs/2026-08-14-v024-release-sanitization-design.md) を参照する。
