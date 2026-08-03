# Issue #41 GA4 タグ同期

## What

公開中の `ai.microdotz.net` に存在する GA4 タグを `site/index.html` に反映した。

## Why

公開済みの状態と GitHub の `main` の差分をなくし、再デプロイ時に計測設定が失われないようにする。

## How

- `G-4SDEDGB4XR` の gtag.js 読み込みと GA4 設定を `<head>` に追加した。
- ページ上の更新日を公開済みの内容に合わせた。

## Verification

- `git diff --check`
- `./scripts/check-doc-links.sh`
- 公開中の `https://ai.microdotz.net` が HTTP 200 で、同じ GA4 計測 ID を含むことを確認した。

## Notes

Issue #32 は closed のため、コメントや再 open は行わず、本 Issue で同期作業を追跡した。
