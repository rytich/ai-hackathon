# planning — 企画フェーズの成果（flow）

調査と要件定義を置く。**企画は plan mode などで行い、実作業（実装）と分離する。** 確定した内容は [../knowledge/](../knowledge/) に反映し、判断は [../decisions/](../decisions/) に残す。

## フォルダ

| フォルダ | 中身 |
|---|---|
| [research/](research/) | 調査メモ（情報ソース付き） |
| [requirements/](requirements/) | 要件定義 |
| [implementation/](implementation/) | 承認済み要件を実装単位へ分解した計画 |

## 流れ

```
調査(research) → 要件定義(requirements) → 意思決定(../decisions) → 実装
                                                    │
                                        確定内容は ../knowledge へ反映
```

- 企画成果物を残さずに実装へ進まない。
- 情報ソース（URL・参照物）を必ず残し、根拠を追跡可能にする。
