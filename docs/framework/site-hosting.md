# 説明サイトのホスティング（Cloudflare Pages）

対外説明用のページと公開用 zip を、独自ドメインで配信するための手順。

## なぜ Cloudflare Pages か

| 要件 | 理由 |
|---|---|
| private repository のまま公開できる | AF は private。GitHub Pages は private repository だと有料プランが要る |
| 商用利用に制限がない | 受託業務でも使う。Vercel の無料プランは非商用限定 |
| CLI で再現できる | `deploy-site.sh` が Pages のアップロード、独自ドメイン、DNS を順に設定する |
| 独自ドメインが無料 | SSL 証明書も自動 |

**git 連携は使わない。** ディレクトリを直接アップロードする方式にする。private repository を外部サービスへ接続せずに済み、何が公開されるかがローカルで確定する。

## 初回セットアップ

Cloudflare アカウント作成と API トークン発行は**人間承認領域**である。以降の Pages 配信、独自ドメイン登録、DNS レコード設定は CLI で行う。

### 1. Cloudflare アカウントを作る

https://dash.cloudflare.com/sign-up

無料プランでよい。クレジットカードは不要。

### 2. API トークンを発行してローカルに保管する

Cloudflare Dashboard の **My Profile → API Tokens** で、次の最小権限を持つトークンを発行する。

- Account / Cloudflare Pages / Edit: 対象アカウント
- Zone / DNS / Edit: `microdotz.net`

トークンは `CLOUDFLARE_API_TOKEN` として、その実行シェルまたは CI の secret store にだけ設定する。トークン値を Issue、PR、work note、`.env`、シェル履歴、リポジトリに置かない。

```bash
export CLOUDFLARE_ACCOUNT_ID="<Cloudflare account id>"
export CLOUDFLARE_ZONE_ID="<microdotz.net zone id>"
export CLOUDFLARE_API_TOKEN="<API token>"
```

`CLOUDFLARE_ACCOUNT_ID` と `CLOUDFLARE_ZONE_ID` は secret ではないが、環境差分として環境変数で渡す。API トークンだけが secret である。

### 3. Pages プロジェクトを作る

初回のデプロイ時に作られる。プロジェクト名を決めておく（例: `agentic-framework`）。API トークンを設定済みなら `wrangler` は同じトークンを使う。

```bash
scripts/deploy-site.sh v0.2.1
```

初回は対話でプロジェクト名と本番ブランチを聞かれる。以後は聞かれない。

デプロイ後、`https://<project>.pages.dev` で見られる。

### 4. CLI で独自ドメインを割り当てる

`deploy-site.sh` は次を冪等に実行する。

1. `agentic-framework` Pages project へ `ai.microdotz.net` を登録する
2. `microdotz.net` Cloudflare zone に `CNAME ai -> agentic-framework.pages.dev` を proxied で作成または更新する
3. Pages domain API から status を取得して表示する

既に正しい CNAME がある場合は変更しない。A/AAAA など CNAME と両立しない既存レコードがある場合は、意図しない上書きを避けて停止する。

```text
CF_PAGES_PROJECT=agentic-framework
CF_CUSTOM_DOMAIN=ai.microdotz.net
```

- DNS の権威サーバーは Cloudflare（`ophelia.ns.cloudflare.com` / `duke.ns.cloudflare.com`）である。Value Domain のコントロールパネルは使わない。
- apex（`microdotz.net` 直下）ではなくサブドメインなので、CNAME を使う。
- 初回は DNS 伝播と SSL 証明書発行に数分かかる。CLI 出力が `Pages active` になるまで再実行して確認する。

CLI による確認:

```bash
scripts/deploy-site.sh vX.Y.Z
dig +short CNAME ai.microdotz.net
```

## 更新（版を上げたとき）

```bash
git tag -a vX.Y.Z -m "Release X.Y.Z" && git push origin vX.Y.Z
scripts/deploy-site.sh vX.Y.Z
```

`deploy-site.sh` が行うこと:

1. `build-public-archive.sh` で sanitize 済み zip を作る
2. zip を `site/` へ置く
3. `site/index.html` の版数表記と更新日を書き換える
4. `wrangler pages deploy site` でアップロードする
5. Cloudflare API で Pages domain と proxied CNAME を設定し、Pages の status を表示する

**zip は毎回ビルドし直す。** リポジトリには置かない（`site/*.zip` は gitignore 済み）。

## 公開されるもの

`site/` の中身がそのまま公開される。**ここに置いたものは全て世界中から見える。**

| ファイル | 内容 |
|---|---|
| `index.html` | 構成の説明ページ |
| `agentic-framework-public.zip` | sanitize 済みの配布用 archive（デプロイ時に生成） |

`site/` に他のファイルを足すときは、公開してよいか必ず確認する。sanitize が要るものは `build-public-archive.sh` を通す。

## 関連

- 配布物の作り方と sanitize: [../knowledge/materials/README.md](../knowledge/materials/README.md)
- archive の生成: `scripts/build-public-archive.sh`
