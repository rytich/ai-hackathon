# 判断: context7をrecommended toolとして採用する

## 日付

2026-08-14

## 背景 / 課題

外部libraryやAPIのsetup・実装では、agentの学習時点より仕様が更新されている可能性がある。AFには現行documentationを一貫して取得するroutingと、Codex / Claude Code共通の導入手順が不足していた。

## 選択肢

1. context7をrecommended toolとして採用し、対象taskだけ優先利用する。
2. context7をmustにし、未接続なら全作業を停止する。
3. 導入せず、毎回Web検索で公式documentationを探す。

## 決定

1を採用する。library/framework/SDK/API/CLI/cloud serviceのcode generation、setup、configuration、version migration、documentation確認ではcontext7を優先する。一般的なrefactor、business logicのdebug、repository固有code reviewには自動適用しない。

## 理由

- library ID解決とdocumentation queryが分離され、対象sourceを明示して再現できる。
- CodexとClaude Codeの両方に公式MCP導入手順がある。
- 全作業をblockする性質ではなく、repository固有作業には不要なためrecommendedが妥当。
- 未接続時も公式Web documentationへ縮退できる。

## 情報ソース

- [調査ノート](../planning/research/2026-08-14-context7.md)
- [upstash/context7 official repository](https://github.com/upstash/context7)

## 影響範囲

- `AGENTS.md`と配布templateのrouting rule
- `.ai/profiles/*/tools.tsv`
- `docs/framework/context7.md`
- `docs/framework/codex-dev-stack.md`
- `docs/framework/toolchain-flow.md`
- `scripts/check-agent-tools.sh`の既存MCP検査

## 却下した案・再検討条件

- must化は却下。外部documentationを必要としないlocal作業まで停止するため。
- Context7のavailability、privacy policy、client supportが大きく変わった場合は採否とsecret境界を再確認する。
