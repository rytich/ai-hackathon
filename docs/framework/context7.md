# context7 の導入と利用

context7はlibrary、framework、SDK、API、CLI、cloud serviceの現行documentationを取得するMCP server。学習時点の記憶だけでsetupやAPIを断定しないために使う。

## 利用境界

次の場合はcontext7を優先する。

- code generationで外部libraryのAPIを使う。
- setup、configuration、version migrationを調べる。
- library、SDK、CLI、cloud serviceの仕様やexampleを確認する。

一般的なrefactor、business logicのdebug、repository固有codeのreview、一般概念の説明には自動適用しない。

## API key

Context7 dashboardで発行したkeyは`CONTEXT7_API_KEY`としてuser環境に置く。実値をrepository、`.env.example`、agent指示、installation manifest、logへ書かない。公式MCPは`--api-key` optionに加え、`CONTEXT7_API_KEY`環境変数を参照できる。

```bash
export CONTEXT7_API_KEY='<your-context7-api-key>'
```

常用端末ではOSのsecret managerやuser scopeのshell設定を使う。project配下へ実値を保存しない。

## Codex

公式pluginを第一候補とする。

```bash
codex plugin marketplace add upstash/context7
codex plugin add context7@context7-marketplace
```

pluginを使わずMCPを直接登録する場合:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

Codexを`CONTEXT7_API_KEY`が利用できるuser環境から起動する。登録確認:

```bash
codex mcp list
```

## Claude Code

user scopeへ登録する。

```bash
claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp
claude mcp list
```

Claude Codeも`CONTEXT7_API_KEY`が利用できるuser環境から起動する。

## 動作確認

新しいsessionで次を依頼する。

1. 対象library名と質問から`resolve-library-id`を実行する。
2. reputation、coverage、用途からIDを1つ選ぶ。
3. 選んだIDで、単一conceptに絞った`query-docs`を実行する。
4. 回答に参照した公式sourceと、推論した箇所を分ける。

例: 「Context7でReactのeffect cleanupだけを現行公式documentationから確認してください」。複数conceptを1 queryへ詰めず、routing、authentication、cacheのように論点が別ならqueryを分ける。

## 再設定と削除

CodexまたはClaude CodeのMCP一覧で登録名`context7`を確認し、各clientのMCP remove commandでuser scopeの登録を削除してから再登録する。pluginを使うCodexではplugin管理commandでcontext7を削除する。実行前に各clientの`--help`で現行commandを確認する。

## 公式情報

- [Context7 Codex client setup](https://github.com/upstash/context7/blob/master/docs/clients/codex.mdx)
- [Context7 all MCP clients](https://github.com/upstash/context7/blob/master/docs/resources/all-clients.mdx)
- [Context7 MCP README](https://github.com/upstash/context7/blob/master/packages/mcp/README.md)
- [Context7 official agent rule](https://github.com/upstash/context7/blob/master/rules/context7-mcp.md)
