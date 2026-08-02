# 作業サマリー: crit を実プロジェクトで検証する

## 対象

- Issue: #33
- Branch: `ai/35-tool-requirements`（#35 の作業ブランチ上で実施。crit の検証対象がこの PR の差分だったため）
- PR: https://github.com/rytich/agentic-framework/pull/36（レビュー対象）
- Agent: Claude Code
- AI profile: claude

## 並行作業状態

- Dependency decision: Proceed。#35 の PR がちょうどレビュー待ちだったため、mock ではない実差分を題材にできた
- Parallel safety: 規約の変更は `collaboration-rules.md` の Inline Review 節のみ。#35 の変更範囲と重ならない

## Real-use Gate

- Real user path validated: **実プロジェクト（AF 本体）の実 PR（#36、25 ファイル / +1286）に対して crit を一周実行した。** mock・サンプル差分は使っていない
- Test doubles used: なし
- User-facing fallback: crit 未導入時は PR のインラインコメントで代替する旨を規約に明記した

## 内容

`crit --pr 36 --no-open` でレビューセッションを起動し、次の一周を実行した。

1. エージェントが判断の要る 7 箇所へ `crit comment <path>:<line>` で事前コメントを投入
2. 人間がブラウザでレビューし、5 件を resolve、2 件に返信
3. エージェントが返信に応答（1 件は実測による検証、1 件は決定の記録）
4. 結果を対応 Issue へコメント

規約の過不足が 1 つ見つかったので `collaboration-rules.md` の Inline Review に「大きな差分の扱い（エージェントによる事前アノテーション）」を追加した。判断は [../decisions/2026-08-02-inline-review-annotation.md](../decisions/2026-08-02-inline-review-annotation.md)。

## 検証

### 一周の実績

```
$ crit --version
crit 0.17.1 (2026-07-03, brew)

$ crit --pr 36 --no-open --quiet
$ crit status
Daemon:      running (PID 26977, port 50348)
```

crit の画面に PR #36 の 25 ファイルが行単位のコメント UI 付きで表示されることを確認した。

投入した事前コメントと人間の判断:

| 箇所 | 種別 | 結果 |
|---|---|---|
| `scripts/check-agent-tools.sh:184` | 正しいが不自然に見えるコード | resolve |
| `scripts/check-agent-tools.sh:171` | リスク許容度の判断 | **返信**（追加検証の依頼） |
| `templates/project/.ai/profiles/codex-claude/tools.tsv:11-13` | 方針の選択 | **返信**（選択肢 a） |
| `templates/project/.ai/profiles/claude/tools.tsv:5` | 環境で検証できなかったもの | resolve（検証後） |
| `scripts/bootstrap-project.sh:55` | 方針の選択 | resolve |
| `templates/project/.ai/profiles/codex-claude/tools.tsv:10` | 小 | resolve |
| `docs/framework/toolchain-flow.md:200` | 文面が行動を縛るか | resolve |

### 指摘 → 差分応答が機能するか

2 件の返信に対して次のとおり応答した。

**`tools.tsv:5`（環境で検証できなかったもの）** — 人間が Claude Code へ context-mode を導入したのを受けて再実行し、判定が反転することを実機で確認した。

```
導入前: MISSING context-mode  must  docs: /mksglu/context-mode   → exit 1
導入後: OK       context-mode  must                              → exit 0（must 4 件すべて OK）
```

**`check-agent-tools.sh:171`（`eval` の是非）** — 「結果の違いが判断つかないので検証が必要」との返信。意見ではなく実測を返した。現行の check を全 profile から重複排除すると 18 種類あり、形は 4 つ（`command -v` / `test -f`・`-x` / `<agent> mcp|plugin list | grep -q` / それらの `||` 連結）に収まる。語彙 5 つの制限文法を実装して 18 種類すべてを機械変換し、現行の `eval` と結果を比較した。

```
合計 18 / 同値 18 / 表現不能 0
```

制限文法へ移行しても今日の時点で失われる表現力は無い、という判断材料を返した。**採否は未決**（下記「未対応」）。

**`tools.tsv:11-13`（crabbox / symphony）** — 選択肢 (a) 現状維持・観察が選ばれた。観察項目と再検討条件を [../decisions/2026-08-02-tool-check-observation.md](../decisions/2026-08-02-tool-check-observation.md) に記録した。

### Issue への結果反映

Issue #35 に主開発結果報告を、Issue #33 に本検証の結果をコメントした。

## 規約の過不足

**過不足があった。** AF の Inline Review は「いつ必須か」を定めるだけで、**大きな差分をどう絞るか**を定めていなかった。25 ファイルの差分を人間に丸ごと渡す運用は、実際には読まれないまま approve され、レビューを通したという記録だけが残る。規約があることでかえって危険な状態になる。

規律を明文化して `collaboration-rules.md` に追加した。要点は「機械的に検証済みのものにはコメントせず、検証コマンドと結果を PR に載せる」「人間の判断が要る 5 種類にだけコメントする」「コメント本文には何を判断してほしいかを書く」。

実際に適用した効果として、**25 ファイルが 7 箇所に減り、そのうち 2 箇所が本物の未決事項として浮かび上がった。** 絞り込まなければこの 2 件は差分の中に埋もれていた。

## 詰まった点

- `crit --pr <num>` は daemon を起動して常駐するため、フォアグラウンドで実行すると戻ってこない。バックグラウンド実行が必要。`--quiet` を付けると URL が出力されないので、`crit status` から port を取得した
- `crit status` が表示する review file の path が、実際にはまだ存在しないことがある。コメント投入までは書き出されない模様。動作に影響は無い
- `crit check` によると cursor / codex / gemini にはエージェント統合が未インストール。今回は CLI 直接実行で完結したため導入していない。統合を入れるかは環境変更のため人間の判断が要る

## 未対応 / 次の作業

- **`check` 欄の `eval` を制限文法へ移行するかは未決。** 実測では移行コストがゼロ（18/18 表現可能・結果一致）だが、PR #36 は既にレビュー済みのため別 Issue に切るのが妥当と考えている。人間の判断待ち
- `crit stop` で daemon を停止すること（本作業時点では起動したまま）

## 関連リンク

- Issue: https://github.com/rytich/agentic-framework/issues/33
- レビュー対象 PR: https://github.com/rytich/agentic-framework/pull/36
- 規約: [../framework/collaboration-rules.md](../framework/collaboration-rules.md) の Inline Review
- 判断: [../decisions/2026-08-02-inline-review-annotation.md](../decisions/2026-08-02-inline-review-annotation.md)、[../decisions/2026-08-02-tool-check-observation.md](../decisions/2026-08-02-tool-check-observation.md)
