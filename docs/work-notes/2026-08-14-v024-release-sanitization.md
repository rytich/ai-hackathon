# v0.2.4 公開アーカイブ再サニタイズ 作業記録

## 追跡

- Issue: https://github.com/rytich/agentic-framework/issues/63
- Branch: `1acx/v024-release-sanitization`
- Source tag: `v0.2.4` / `4fd1ae4edd2ffd541d7cff058d551195bb3a33d0`
- GitHub Release: merge後に作成するため未公開

## 原因

`scripts/build-public-archive.sh` の既定sanitizeは導入先・顧客名、除外path、secret-like patternを扱っていたが、公開元owner `rytich`と生成環境由来のuser-home pathを正規化していなかった。そのため、Issue/PR URLにowner名が13箇所、`/Users/ichie/...`が6箇所残るZIPを生成できた。

## 変更

- 公開元ownerを`OWNER`へ置換する設定と正規化を追加した。
- repository内のPOSIX/Windows絶対pathをrepository-relative pathへ変換した。
- repository外のPOSIX homeを`$HOME`、Windows user profileを`%USERPROFILE%`へ変換した。
- 変換後にもraw ownerまたは具体的user-home pathが残る場合、archiveを破棄するfail-closed検査を追加した。
- 一時Git treeへfixtureを追加し、実際のarchive生成を通す回帰テストを追加した。worktreeのtracked fileはfixture作成で変更しない。

## TDD証跡

- RED: owner URL、repository内POSIX path、POSIX home、Windows homeの4項目が生値のまま残り、`test-build-public-archive.sh`がexit 1になった。
- GREEN: 実装後、4項目がそれぞれ`OWNER`、relative path、`$HOME`、`%USERPROFILE%`へ変換され、既存除外検査を含めてPASSした。
- mutation check: owner変換、repository path短縮、POSIX home変換、Windows home変換を1つずつ無効化し、各ケースでexit 1になることを確認した。復元後はPASSした。

## 回帰検証

- `bash scripts/test-build-public-archive.sh`: PASS
- `node --test scripts/test-configure-cloudflare-pages-domain.mjs`: 5 pass / 0 fail
- `bash scripts/check-doc-links.sh`: broken link 0 / orphan 0
- `bash scripts/test-check-agent-tools.sh`: 23 PASS / 0 FAIL
- `bash scripts/test-complete-task.sh`: 17 PASS
- `bash scripts/test-select-ai-profile.sh`: 6 profiles PASS
- `bash scripts/test-bootstrap-project.sh`: PASS
- metrics / installation Node tests: 40 pass / 0 fail
- `git diff --check main...HEAD`: PASS

## v0.2.4候補成果物

- ZIP: `agentic-framework-v0.2.4-public.zip`
- bytes: `318707`
- SHA-256: `b9bed0253e6d508934e5c58ddf7c58ec15780dc28aad83afcc7085e08eb8a0f1`
- entries: `266`
- archive root: `agentic-framework-0.2.4/`
- `VERSION`: `0.2.4`
- CHANGELOG v0.2.4 entry: あり
- ZIP integrity: PASS
- raw owner、POSIX home、Windows user profile、既定redact名、secret-like値、除外path、work-note実体: 検出0

この候補はlocal verification用であり、PR merge前には公開しない。Release assetはmerge済みsanitize処理から再生成し、公開後に再取得して同じ検査を行う。`v0.2.4`タグは移動しない。
