# 判断: CODEOWNERSで人間承認領域を補強する

## 日付

2026-08-14

## 背景 / 課題

AFはauth、secret、permission、billing、production deploy、infrastructure、privacy/legal、destructive migrationなどを人間承認領域と定めているが、文書とlabelだけではGitHub上のmergeを機械的に止められない。

## 決定

- private AF repositoryの`.github/CODEOWNERS`に実ownerを設定する。
- 配布templateは`@YOUR-GITHUB-OWNER` placeholderを持ち、導入先でwrite accessを持つuser/teamへ置換する。
- stable branchで`Require review from Code Owners`を有効化する手順と実動testを必須にする。
- private repositoryのowner名を公開ZIPへ出さないため、root `.github/CODEOWNERS`はarchiveから除外し、汎用templateだけを配布する。

## 理由

- GitHubはbase branchのCODEOWNERSとbranch protection/rulesetを組み合わせてowner reviewを要求できる。
- owner定義自体を保護するpatternを置くことで、承認ルールの無断緩和もreview対象にできる。
- 1つの巨大なdefault ownerではなく、human approval requiredに対応するpathだけを対象にすると通常開発のreview負荷を抑えられる。

## 情報ソース

- [GitHub Docs: About code owners](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Docs: Managing a branch protection rule](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
- [Issue #29](https://github.com/rytich/agentic-framework/issues/29)

## 影響範囲

- `.github/CODEOWNERS`
- `templates/project/.github/CODEOWNERS`
- `docs/framework/github-configuration.md`
- `docs/framework/quality-gates.md`
- public archive exclusion/gate

## 却下した案・再検討条件

- 全pathを単一ownerで保護する案は通常変更まで人間承認必須になるため却下。
- 複数owner全員の承認が必要なprojectでは、CODEOWNERSだけで要件を満たせないため追加ruleset/checkを設計する。
