# Release Checklist

正式 release の tag 作成・公開 ZIP 生成前に、次を確認する。

- `VERSION` が release version と一致する。
- tag は VERSION と CHANGELOG を含む commit を指す。
- `CHANGELOG.md` に同じ version の見出しと利用者向けの変更点がある。
- public archive の prefix と ZIP 内の VERSION が release version と一致する。
- archive の sanitizer、除外、秘密情報チェックが成功する。
- ZIP の SHA-256 を release record に残す。
