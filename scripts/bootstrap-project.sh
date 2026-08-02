#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 /path/to/target-project"
}

if [ "${1:-}" = "" ]; then
  usage
  exit 1
fi

TARGET_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE_DIR="$ROOT_DIR/templates/project"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi

copy_if_missing() {
  local src="$1"
  local dest="$2"
  if [ -e "$dest" ]; then
    echo "skip existing: ${dest#$TARGET_DIR/}"
  else
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    echo "created: ${dest#$TARGET_DIR/}"
  fi
}

while IFS= read -r -d '' file; do
  rel="${file#$TEMPLATE_DIR/}"
  copy_if_missing "$file" "$TARGET_DIR/$rel"
done < <(find "$TEMPLATE_DIR" -type f -print0)

for doc in README.md knowledge-base.md ai-execution-framework.md collaboration-rules.md environment-reproducibility.md codex-dev-stack.md agent-handoff.md ai-environment-profiles.md agent-settings-replication.md software-engineering-practices.md github-configuration.md quality-gates.md toolchain-flow.md project-adoption.md project-update.md; do
  copy_if_missing "$ROOT_DIR/docs/framework/$doc" "$TARGET_DIR/docs/framework/$doc"
done

copy_if_missing "$ROOT_DIR/scripts/complete-task.sh" "$TARGET_DIR/scripts/agentic/complete-task.sh"

echo
echo "Bootstrap complete."
echo "Next: edit AGENTS.md, .env.example, docs/knowledge/engineering/runtime.md, docs/knowledge/engineering/secrets.md, docs/framework/codex-dev-stack.md, docs/agent-handoff.md, docs/framework/ai-environment-profiles.md, docs/framework/agent-settings-replication.md, docs/framework/software-engineering-practices.md, docs/framework/github-configuration.md, and .github/pull_request_template.md for this project."

echo
echo "--- Agent tool requirements ---"
if [ -x "$TARGET_DIR/scripts/check-agent-tools.sh" ]; then
  # must 欠落でも bootstrap 自体は失敗させない。導入直後は未設定が普通のため、
  # 結果を表示して利用者に判断させる。
  (cd "$TARGET_DIR" && ./scripts/check-agent-tools.sh) || true
elif [ -e "$TARGET_DIR/scripts/check-agent-tools.sh" ]; then
  echo "skip: scripts/check-agent-tools.sh is not executable, run: chmod +x scripts/check-agent-tools.sh"
else
  echo "skip: scripts/check-agent-tools.sh not found"
fi
