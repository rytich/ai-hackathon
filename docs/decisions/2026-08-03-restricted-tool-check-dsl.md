# tools.tsv check 欄を制限文法へ移行する

## 決定

`tools.tsv` の `check` 欄は任意 shell ではなく、`cmd:`、`file:`、`exec:`、`mcp:`、`plugin:` と ` || ` 連結だけを許可する制限文法にする。未知の語彙は定義不備として exit 2 で停止する。

## 理由

TSV はデータであり、`eval` による任意コード実行を許すべきではない。Issue #37 の事前調査では既存 18 種類の check をすべてこの文法で表現できた。

## 参照

- GitHub Issue #37
- `docs/decisions/2026-08-01-tool-requirements.md`
- `docs/work-notes/2026-08-02-issue-33-crit-verification.md`
