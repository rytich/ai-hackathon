---
title: v0.2.5 Safe Installer and License Design
date: 2026-08-14
status: approved
issue: https://github.com/rytich/agentic-framework/issues/65
---

# v0.2.5 Safe Installer and License Design

## Architecture

公開導線を `install.sh -> release.json -> verified ZIP -> bootstrap-project.sh` とする。downloadと展開はOSの一時directoryだけで行い、終了時に削除する。配布archive内のbootstrapを正本とし、installerは取得・検証・引き渡しだけを担当する。

bootstrapは全source/destination pairを最初に列挙する。destinationが存在しsourceと異なる場合をcollisionとする。collisionがなければcopyとmanifest生成へ進み、collisionがあれば通常destinationへは一切copyせず、candidate overlayと`CONFLICTS.md`だけをnamespaced incoming directoryへ書く。

## Installer contract

- 引数: `install.sh /path/to/project`
- 必須command: `bash`, `curl`, `unzip`, `node`, `mktemp`、および`shasum`または`sha256sum`
- metadata: `https://ai.microdotz.net/release.json`
- artifact: metadataの公開ZIP URLまたは同一originの既定path
- integrity: metadataのversion、bytes、SHA-256を照合する
- cleanup: `trap`で一時directoryを削除する
- bootstrapの終了statusと案内を利用者へ伝える

## Conflict contract

- identical existing file: collisionではない
- different existing file: collision
- existing directory at file destination: collision
- first-install collision: exit 2、candidate/reportを作成、通常pathは不変
- existing installation manifest: updater手順を案内し、初回bootstrapを実行しない
- `--force`は提供しない

## UX

installer成功時は「導入完了」と、最低限の編集対象・検証commandを表示する。collision時は「導入未完了」と明記し、report pathと統合後の再実行手順を表示する。サイトはinstallerを主CTA、ZIPを手動導入用の副CTAにする。

## License and release

MIT License、Copyright (c) 2026 株式会社 点。v0.2.5としてVERSION・CHANGELOG・archive・Release・site metadataを同期する。v0.2.4 tagとassetは変更しない。

## context7 integration

- Codexは公式plugin経由を第一候補、MCP直接登録をfallbackとして記載する。
- Claude Codeはuser scopeのMCP登録を記載する。
- API keyはcommand例ではplaceholderとし、repository・template・manifest・logへ保存しない。
- 配布するagent ruleは、library/framework/SDK/API/CLI/cloud serviceの現行仕様が必要な場合にcontext7を使い、`resolve-library-id`の後に単一conceptへ絞った`query-docs`を実行する。
- business logicのdebug、一般的なrefactor、code reviewには自動適用しない。
- `scripts/check-agent-tools.sh`はcontext7の接続可否を判定し、未導入時の公式導入先を表示する。
