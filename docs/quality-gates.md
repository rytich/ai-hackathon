# Quality Gates

## Purpose

AI エージェントが速く作業しても品質を落とさないため、merge 前に必ず通す gate を定義する。

## Required Checks

プロジェクトごとに具体コマンドへ置き換える。

```text
format or lint
typecheck or static analysis
unit test
integration test if applicable
e2e test if applicable
build or package
contract/schema validation if applicable
secret scan or secret checklist
open GitHub issues vs tasks.md pending check if Spec Kit is used
objective review report generated and posted to PR
```

## Reviewer Checklist

- Issue と acceptance criteria に対応している。
- scope 外の変更が混ざっていない。
- public API、schema、migration、config の互換性を確認した。
- tests が失敗時に意味のある coverage を持つ。
- logs に secret、個人情報、token が出ない。
- docs、env example、runtime guide が必要に応じて更新されている。
- Spec Kit task と GitHub Issue の完了状態が同期されている。
- open GitHub Issues と `tasks.md` pending count の mismatch が説明されている。
- `scripts/complete-task.sh` の objective review が PASS している。
- rollback または migration recovery の考慮がある。

## Human Approval Required

次の変更は自動 merge しない。

- destructive migration
- auth、token、secret、permission、scope
- billing、payment
- production deployment
- infrastructure
- privacy、consent、legal wording
- irreversible data deletion

## Low Cost Practices

- 大きな test output は失敗 summary だけを出す。
- 広い grep や log parse は script/context-mode で集約する。
- 同じ調査を繰り返さないよう work note と decision log を残す。
- 生成物や lockfile を触る PR は理由を明記する。
