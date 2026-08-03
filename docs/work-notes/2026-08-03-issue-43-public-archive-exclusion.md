# Issue #43 公開配布 ZIP のローカル公開資産除外

## What

公開配布 ZIP から Cloudflare と説明サイト公開のためだけの資産を既定で除外した。

## Why

これらは agentic-framework 本体に含めず、利用先で再現する配布物をホスティング固有の設定から分離するため。

## How

- `scripts/build-public-archive.sh` に固定の local-only 除外リストを追加した。
- `site/`、Cloudflare の設定・検証・デプロイスクリプト、ホスティング手順、当該判断ログを除外した。
- 配布版 README から除外済みパスへの参照行を削除するようにした。
- `PUBLIC_ARCHIVE_EXTRA_EXCLUDE` でプロジェクト固有の追加除外パスを指定できるようにした。

## Verification

- `bash scripts/test-build-public-archive.sh`
- `bash -n scripts/build-public-archive.sh`
- `./scripts/check-doc-links.sh`
- `./scripts/test-check-agent-tools.sh`

## Notes

本 repository には運用資産を残すが、公開 ZIP と bootstrap で配布するフレームワーク本体には含めない。
