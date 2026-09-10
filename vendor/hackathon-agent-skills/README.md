# Zenn Hackathon Agent Skills

Zennが運営するハッカソンの参加者向けに、coding agent（Claude Code / Codex / Cursor など）で使えるスキルを配布するリポジトリです。

スキルをインストールすると、あなたのcoding agentが次のことをできるようになります。

- ハッカソンのルール・参加資格・スケジュール・提出方法に関する質問への回答
- 開発中のプロジェクトがレギュレーション（必須技術など）を満たしているかのチェック
- 提出前チェックリストの実行と提出手順の案内

## 提供中のスキル

| スキル | 内容 | 対象ハッカソン |
| ---- | ---- | ---- |
| [gc-hackathon-vol5](./gc-hackathon-vol5/skills/gc-hackathon-vol5/) | ルールQ&A・レギュレーション適合チェック・提出前チェック | [第5回 Agentic AI Hackathon with Google Cloud](https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5) |
| [gc-hackathon-vol5-ideation](./gc-hackathon-vol5/skills/gc-hackathon-vol5-ideation/) | プロジェクトのアイデア出し・壁打ち | 同上 |

> ⚠️ ルールの一次情報は各ハッカソンの公式ページです。スキルの情報が古い場合は公式ページが優先されます。

## インストール方法（rulesync）

[rulesync](https://github.com/dyoshikawa/rulesync) を使うと、お使いのcoding agent（Claude Code / Codex / Cursor / Copilot / Gemini CLI など20以上のツール）向けに、共通の手順でスキルを導入できます。ツールごとの配置場所や対応状況を意識する必要はありません。

あなたのプロジェクトのルートで以下を実行します。

```bash
# rulesync をインストール（初回のみ）
npm install -g rulesync

# プロジェクトで rulesync を使っていない場合は初期化（初回のみ）
rulesync init

# 本リポジトリから対象ハッカソンのスキルを取得（パス指定で該当回のみ取得されます）
rulesync fetch zenn-dev/hackathon-agent-skills:gc-hackathon-vol5 --features skills

# お使いのツール向けに生成（--targets はお使いのツールに合わせて変更）
rulesync generate --targets claudecode,codexcli,cursor --features skills --simulate-skills
```

- `--targets` に指定できるツール名や詳細は [rulesyncのドキュメント](https://github.com/dyoshikawa/rulesync) を参照してください
- スキル形式（SKILL.md）にネイティブ対応していないツールにも、`--simulate-skills` によってルール経由で擬似的に展開されます

導入後、agentに「ハッカソンのルールを教えて」「提出前チェックをして」のように話しかけると、スキルが使われます。

### rulesyncを使わない場合（手動インストール）

スキルはAgent Skills形式（SKILL.md）の素のMarkdownです。対応ツールでは該当ディレクトリへコピーするだけで使えます。

```bash
git clone --depth 1 https://github.com/zenn-dev/hackathon-agent-skills /tmp/hackathon-agent-skills
# Claude Code の場合
cp -r /tmp/hackathon-agent-skills/gc-hackathon-vol5/skills/gc-hackathon-vol5 .claude/skills/
# Codex の場合
cp -r /tmp/hackathon-agent-skills/gc-hackathon-vol5/skills/gc-hackathon-vol5 .codex/skills/
```

## スキルの更新方法

ハッカソンのルール公開・変更にあわせて、このリポジトリのスキルを更新していきます。

スキルの最新化に専用の手順はありません。**インストール時と同じコマンドをもう一度実行するだけ**です。

```bash
# インストール時と同じコマンド（rulesync fetch は既存のスキルを上書きします）
rulesync fetch zenn-dev/hackathon-agent-skills:gc-hackathon-vol5 --features skills
rulesync generate --targets claudecode,codexcli,cursor --features skills --simulate-skills
```

手動インストールの場合も同様に、インストール時と同じ手順（再度cloneして同じコピーコマンドを実行）で上書きされます。

## 問い合わせ

- スキルの内容に関する質問・不具合は本リポジトリのIssueへ
- ハッカソン自体への質問は各ハッカソンの案内（Discord等）へ
