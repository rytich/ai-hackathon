# Issue #45 Serena ローカル状態の ignore

## What

Serena が生成する `.serena/` を root の `.gitignore` に追加した。

## Why

project 設定と memory は端末・セッション固有であり、フレームワーク本体の差分や PR に含めないため。

## Verification

- `git check-ignore -v .serena/project.yml`
- `git diff --check`

## Notes

既存の tracked file は存在しないため、削除や index 操作は行っていない。
