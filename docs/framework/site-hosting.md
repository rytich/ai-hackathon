# 説明サイトのホスティング（Cloudflare Pages）

対外説明用のページと公開用 zip を、独自ドメインで配信するための手順。

## なぜ Cloudflare Pages か

| 要件 | 理由 |
|---|---|
| private repository のまま公開できる | AF は private。GitHub Pages は private repository だと有料プランが要る |
| 商用利用に制限がない | 受託業務でも使う。Vercel の無料プランは非商用限定 |
| 1 コマンドでデプロイできる | `wrangler pages deploy` だけ。リリース手順に組み込める |
| 独自ドメインが無料 | SSL 証明書も自動 |

**git 連携は使わない。** ディレクトリを直接アップロードする方式にする。private repository を外部サービスへ接続せずに済み、何が公開されるかがローカルで確定する。

## 初回セットアップ

以下は**人間が実行する**。エージェントは代行しない（アカウント作成と認証、DNS 変更のため）。

### 1. Cloudflare アカウントを作る

https://dash.cloudflare.com/sign-up

無料プランでよい。クレジットカードは不要。

### 2. wrangler で認証する

```bash
npx wrangler login
```

ブラウザが開き、Cloudflare の認可画面が出る。`Allow` を押すとターミナルに戻り、認証が完了する。

- 認証情報は `~/.wrangler/` に保存される。**リポジトリには入らない**。
- `npx` を使うので wrangler のグローバルインストールは不要。
- 確認: `npx wrangler whoami`

### 3. Pages プロジェクトを作る

初回のデプロイ時に作られる。プロジェクト名を決めておく（例: `agentic-framework`）。

```bash
scripts/deploy-site.sh v0.2.1
```

初回は対話でプロジェクト名と本番ブランチを聞かれる。以後は聞かれない。

デプロイ後、`https://<project>.pages.dev` で見られる。

### 4. 独自ドメインを割り当てる

Cloudflare のダッシュボードで **Workers & Pages → 対象プロジェクト → Custom domains → Set up a domain** を開き、使うサブドメイン（例: `ai.microdotz.net`）を入力する。

Cloudflare が CNAME の設定値を表示するので、**DNS 側にそのレコードを追加する**。

このドメインの DNS は Value Domain（`ns1.value-domain.com`）が管理している。Value Domain のコントロールパネルで、対象ドメインの DNS レコードに次を追加する。

```text
cname  ai  <project>.pages.dev
```

- ネームサーバを Cloudflare へ移す必要はない。サブドメインを CNAME で向けるだけでよい。
- apex（`microdotz.net` 直下）ではなくサブドメインなので、CNAME で問題ない。
- 反映後、Cloudflare 側が自動で SSL 証明書を発行する。数分かかる。

確認:

```bash
dig +short ai.microdotz.net
curl -sI https://ai.microdotz.net | head -3
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
