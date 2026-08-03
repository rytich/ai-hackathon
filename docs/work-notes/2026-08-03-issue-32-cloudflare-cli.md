# Issue #32: Cloudflare CLI publication

## What

`scripts/deploy-site.sh` に、Cloudflare Pages custom domain と DNS CNAME を CLI で設定する処理を追加した。

## Why

`ai.microdotz.net` は名刺 QR の遷移先であり、手作業の DNS 設定を残さず再現可能に公開する必要がある。

## How

- Node.js 標準 `fetch` で Cloudflare Pages API と DNS API を呼ぶ CLI を追加した。
- `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`、`CLOUDFLARE_ZONE_ID` を実行環境から受け取る。
- 正しい proxied CNAME は変更せず、競合する record は停止する。
- Pages domain status を CLI 出力に含める。

## Verification

- `node --test scripts/test-configure-cloudflare-pages-domain.mjs`
- `node --check scripts/configure-cloudflare-pages-domain.mjs`
- `bash -n scripts/deploy-site.sh`
- `./scripts/check-doc-links.sh`
- `git diff --check`

## Pending real-use gate

現時点の実行環境には `CLOUDFLARE_API_TOKEN` がない。トークンを環境変数で渡した後、`scripts/deploy-site.sh <tag>` を実行し、`https://ai.microdotz.net` の HTTPS 配信と Pages status `active` を実測してから Issue を close する。
