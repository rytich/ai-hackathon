# Issue #40 作業サマリー

## What

`complete-task.sh` が既存の open PR を再利用し、merge の成功を GitHub から再取得して確認してから Issue を close するようにした。人間確認コメントは、明示された未解決 review request がある場合だけ投稿する。

## Why

既存 PR がある場合に PR 作成で終了し、merge / Issue close へ進まない回帰を防ぐため。機械的な objective review の全文を人間確認依頼として投稿しないため。

## Verification

- `bash -n scripts/complete-task.sh && bash -n scripts/test-complete-task.sh`
- `bash scripts/test-complete-task.sh` （7 checks）
- `./scripts/check-doc-links.sh`
- `./scripts/test-check-agent-tools.sh` （21 checks）

## Known limitations

- review request の内容は `--review-request-file` で明示して渡す。空または必須見出しのないファイルは投稿しない。
