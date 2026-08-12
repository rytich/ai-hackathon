# Ponytail の限定統合 — 要件

## 状態

実装済み（2026-08-12）。

## Tracking

- GitHub Issue: [#59](https://github.com/rytich/agentic-framework/issues/59)

## What

Ponytail の常時プラグイン、Node.js hook、MCP server は導入しない。その代わり、AF の既存品質ゲートを優先する「最小で正しい実装」の判断ラダーを共有規律として追加し、Codex を active profile にする。Claude Code、Codex+Claude、hermes、Copilot、generic のprofileも、同じ共有規律を参照する薄い互換エントリとして補完する。

## Why

Ponytail の YAGNI、既存実装・標準機能優先、最小差分という価値は AF と整合する。一方で、設計ノートやテストを省く常時指示、および全セッション・サブエージェントへのhook注入は、AF が必須とする Issue / Spec Kit / docs / quality gate と競合する。判断ラダーだけを AF の優先順位で再定義し、ホスト固有設定と切り離す。

## How

1. `.ai/active-profile` を `codex` とし、`.ai/profiles/` に Codex を基準とする profile 定義を置く。
2. `scripts/select-ai-profile.sh` を、共有の `AGENTS.md` を削除・置換せず、profile固有の薄いエントリファイルだけを切り替えられるようにする。profile固有ファイルが不要なhostも有効なprofileとして選択できるようにする。
3. Codex、Claude Code、Codex+Claude、hermes、Copilot、generic の `tools.tsv` を整備する。`must` は実際に必要な最小セットだけにし、追加ツールは `recommended` とその縮退先を記録する。
4. `docs/framework/software-engineering-practices.md` の YAGNI 節を、次の順序で明文化する。
   - 要件として存在すべきか
   - 既存のコード・パターンで満たせるか
   - 標準ライブラリまたはネイティブ機能で満たせるか
   - 既存依存で満たせるか
   - それでも必要な最小実装は何か
5. 同節で、入力検証、データ損失防止、セキュリティ、アクセシビリティ、明示されたテスト・docs・承認要件は判断ラダーで省略できないと定義する。
6. objective review のチェック対象に、不要な依存・抽象化・範囲外変更がないこと、および必要なら選択理由が記録されていることを追加する。

## 対象外

- `codex plugin add ponytail@ponytail` と marketplace の登録
- Ponytail の Node.js hook、状態ファイル、デフォルトモード、subagent自動注入
- Ponytail MCP server の常駐登録
- AF の既存 Issue / Spec Kit / docs / quality gate の緩和
- 依頼外の依存追加、コードリファクタリング、外部サービス設定

## 受入条件

- `./scripts/check-agent-tools.sh` が active profile `codex` を読み、必須ツールの不足を正しくexit 1で報告する。必要ツールが揃うこの環境では exit 0 になる。
- `scripts/select-ai-profile.sh codex`、`claude`、`codex-claude`、`hermes`、`copilot`、`generic` が、共有 `AGENTS.md` を削除・上書きせずにprofileを選択できる。
- profile切替後、各host固有の指示ファイルは共有規律への参照だけを持ち、長い規則の手コピーを作らない。
- 判断ラダーは既存のテスト、docs、セキュリティ、アクセシビリティ、承認境界より下位であることが明記される。
- objective review が、最小差分の根拠と範囲逸脱を確認する。
- profile選択スクリプトとドキュメントリンクの自動検証が成功する。

## 情報ソース

- https://github.com/DietrichGebert/ponytail （評価commit `2ed6c52c9d7e5e56942508591085fd45dea277d3`）
- [Ponytail 導入判断](../../decisions/2026-08-11-ponytail-integration.md)
- [Toolchain Flow](../../framework/toolchain-flow.md)
- [Software Engineering Practices](../../framework/software-engineering-practices.md)
- [Agent Settings Replication](../../framework/agent-settings-replication.md)
- [実装計画](../../superpowers/plans/2026-08-12-ponytail-limited-integration.md)
