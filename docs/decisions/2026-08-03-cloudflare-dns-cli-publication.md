# Cloudflare DNS を CLI で設定する

## 決定

`ai.microdotz.net` の Pages 公開は、Cloudflare Dashboard の手作業ではなく、`scripts/deploy-site.sh` から Cloudflare API を呼ぶ CLI で行う。

## 理由

- 名刺 QR が `https://ai.microdotz.net` に固定され、手順の再現性と速い復旧が必要になった。
- `microdotz.net` の権威 DNS は Cloudflare であり、以前の Value Domain 管理という説明は実態と異なる。
- `wrangler pages deploy` はアップロードを担うが、Pages の custom domain と DNS record を一貫して設定する CLI 契約には不足がある。
- Cloudflare API は Pages domain の作成と DNS CNAME の作成・更新を提供する。

## 境界

- Cloudflare account 作成と API token 発行は人間承認領域とする。
- API token は `CLOUDFLARE_API_TOKEN` として実行環境から渡し、repository、Issue、PR、work note に記録しない。
- 既存の CNAME が正しければ変更しない。CNAME と競合する既存 record は自動上書きしない。

## 参照

- Cloudflare Pages Add domain API: https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create/
- Cloudflare Pages Get domain API: https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/get/
- Cloudflare DNS Create record API: https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/
- Cloudflare API token permissions: https://developers.cloudflare.com/fundamentals/api/reference/permissions/
