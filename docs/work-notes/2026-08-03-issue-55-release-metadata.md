# Issue #55 作業サマリー

## 修正

- `VERSION` を 0.2.3 に更新した。
- 公開 archive script は正式 release tag（`vX.Y.Z`）と、その tag が指す commit の `VERSION` が一致しない場合に exit 1 で停止する。
- template にも同じ guard を追加した。

## 背景

既存の `v0.2.3` tag は正しい feature merge commit を指していたが、その commit の `VERSION` は 0.2.1 だった。公開 ZIP の prefix と内部 metadata が食い違うため、tag を正しい metadata commit へ付け直す必要がある。

## 検証

- `bash scripts/test-build-public-archive.sh`
- `bash -n scripts/build-public-archive.sh`
- `bash -n templates/project/scripts/build-public-archive.sh`
- mismatch state の `v0.2.3` archive build が exit 1 になること
- `./scripts/check-doc-links.sh`
