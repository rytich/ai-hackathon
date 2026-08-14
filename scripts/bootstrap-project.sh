#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 [--accept-existing] /path/to/target-project"
}

ACCEPT_EXISTING=false
if [ "${1:-}" = "--accept-existing" ]; then
  ACCEPT_EXISTING=true
  shift
fi

if [ "$#" -ne 1 ]; then
  usage
  exit 1
fi

TARGET_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE_DIR="$ROOT_DIR/templates/project"
VERSION="$(tr -d '[:space:]' < "$ROOT_DIR/VERSION")"
INSTALLATION_MANIFEST="$TARGET_DIR/.agentic-framework/installation.json"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi

if [ -L "$TARGET_DIR" ]; then
  echo "Target directory must not be a symbolic link: $TARGET_DIR" >&2
  exit 1
fi

if [ -e "$INSTALLATION_MANIFEST" ]; then
  echo "AF is already installed: .agentic-framework/installation.json"
  echo "Use docs/framework/project-update.md for updates."
  exit 0
fi

SOURCES=()
DESTINATIONS=()
RELATIVE_PATHS=()
OWNERSHIPS=()

add_file() {
  SOURCES+=("$1")
  DESTINATIONS+=("$TARGET_DIR/$2")
  RELATIVE_PATHS+=("$2")
  OWNERSHIPS+=("$3")
}

while IFS= read -r -d '' file; do
  rel="${file#$TEMPLATE_DIR/}"
  case "$rel" in
    scripts/metrics.mjs|scripts/check-af-update-scope.mjs)
      add_file "$file" "$rel" managed
      ;;
    *)
      add_file "$file" "$rel" seeded
      ;;
  esac
done < <(find "$TEMPLATE_DIR" -type f -print0)

for doc in README.md knowledge-base.md ai-execution-framework.md collaboration-rules.md environment-reproducibility.md codex-dev-stack.md context7.md agent-handoff.md ai-environment-profiles.md agent-settings-replication.md software-engineering-practices.md github-configuration.md quality-gates.md effect-metrics.md toolchain-flow.md project-adoption.md project-update.md; do
  add_file "$ROOT_DIR/docs/framework/$doc" "docs/framework/$doc" seeded
done

add_file "$ROOT_DIR/scripts/complete-task.sh" "scripts/agentic/complete-task.sh" managed
add_file "$ROOT_DIR/scripts/metrics.mjs" "scripts/agentic/metrics.mjs" managed
while IFS= read -r -d '' file; do
  rel="${file#$ROOT_DIR/scripts/metrics/}"
  add_file "$file" "scripts/agentic/metrics/$rel" managed
done < <(find "$ROOT_DIR/scripts/metrics" -type f -print0)
add_file "$ROOT_DIR/scripts/check-af-update-scope.mjs" "scripts/agentic/check-af-update-scope.mjs" managed
add_file "$ROOT_DIR/scripts/af-installation.mjs" "scripts/agentic/af-installation.mjs" managed
add_file "$ROOT_DIR/schemas/metrics/work-unit.schema.json" ".agentic-framework/schemas/metrics/work-unit.schema.json" managed
add_file "$ROOT_DIR/schemas/metrics/work-unit.example.json" ".agentic-framework/schemas/metrics/work-unit.example.json" managed

COLLISION_INDEXES=()
BLOCKING_COLLISION=false

has_unsafe_ancestor() {
  local dest="$1"
  local current
  current="$(dirname "$dest")"
  while [ "$current" != "$TARGET_DIR" ]; do
    if [ -L "$current" ] || { [ -e "$current" ] && [ ! -d "$current" ]; }; then
      return 0
    fi
    current="$(dirname "$current")"
  done
  return 1
}

for index in "${!SOURCES[@]}"; do
  src="${SOURCES[$index]}"
  dest="${DESTINATIONS[$index]}"
  ownership="${OWNERSHIPS[$index]}"

  if has_unsafe_ancestor "$dest"; then
    COLLISION_INDEXES+=("$index")
    BLOCKING_COLLISION=true
    continue
  fi

  if [ -e "$dest" ] || [ -L "$dest" ]; then
    if [ -f "$dest" ] && [ ! -L "$dest" ] && cmp -s "$src" "$dest"; then
      continue
    fi
    COLLISION_INDEXES+=("$index")
    if [ "$ownership" = managed ] || [ ! -f "$dest" ] || [ -L "$dest" ]; then
      BLOCKING_COLLISION=true
    fi
  fi
done

stage_conflicts() {
  local incoming_root="$TARGET_DIR/.agentic-framework/incoming"
  if [ -L "$TARGET_DIR/.agentic-framework" ] || { [ -e "$TARGET_DIR/.agentic-framework" ] && [ ! -d "$TARGET_DIR/.agentic-framework" ]; }; then
    echo "導入未完了: .agentic-framework が安全なdirectoryではないため候補を保存できません。" >&2
    return 2
  fi
  mkdir -p "$incoming_root"
  local candidate_dir
  candidate_dir="$(mktemp -d "$incoming_root/${VERSION}.XXXXXX")"
  local overlay_dir="$candidate_dir/overlay"
  mkdir -p "$overlay_dir"

  for index in "${!SOURCES[@]}"; do
    mkdir -p "$(dirname "$overlay_dir/${RELATIVE_PATHS[$index]}")"
    cp -p "${SOURCES[$index]}" "$overlay_dir/${RELATIVE_PATHS[$index]}"
  done

  {
    echo "# AF v${VERSION} 導入競合レポート"
    echo
    echo "導入未完了です。通常のproject pathには何も配置していません。"
    echo
    echo "## 競合"
    echo
    for index in "${COLLISION_INDEXES[@]}"; do
      echo "- \`${RELATIVE_PATHS[$index]}\` (${OWNERSHIPS[$index]})"
    done
    echo
    echo "## 次の操作"
    echo
    echo "1. \`overlay/\` と既存projectを比較し、必要な内容を統合する。"
    echo "2. managed競合とfile/directory競合は、配布版と一致する状態へ解決する。"
    echo "3. seeded競合を既存内容のまま採用する場合はinstallerを \`--accept-existing\` 付きで再実行する。"
  } > "$candidate_dir/CONFLICTS.md"

  echo "導入未完了: ${#COLLISION_INDEXES[@]} 件の競合を検出しました。"
  echo "既存fileは変更していません。候補とreport: $candidate_dir"
  return 2
}

if [ "${#COLLISION_INDEXES[@]}" -gt 0 ]; then
  if [ "$ACCEPT_EXISTING" = false ] || [ "$BLOCKING_COLLISION" = true ]; then
    stage_conflicts
    exit $?
  fi
  echo "review済みのseeded file ${#COLLISION_INDEXES[@]} 件を既存内容のまま採用します。"
fi

for index in "${!SOURCES[@]}"; do
  src="${SOURCES[$index]}"
  dest="${DESTINATIONS[$index]}"
  rel="${RELATIVE_PATHS[$index]}"
  if [ -e "$dest" ]; then
    if cmp -s "$src" "$dest"; then
      echo "skip identical: $rel"
    else
      echo "accepted existing seeded: $rel"
    fi
    continue
  fi
  mkdir -p "$(dirname "$dest")"
  cp -p "$src" "$dest"
  echo "created: $rel"
done

node "$ROOT_DIR/scripts/create-installation-manifest.mjs" \
  --target "$TARGET_DIR" \
  --version "$VERSION"

echo
echo "導入完了: AF v${VERSION}"
echo "次に編集: AGENTS.md、.env.example、docs/knowledge/engineering/runtime.md、docs/knowledge/engineering/secrets.md"
echo "次に確認: docs/framework/context7.md と docs/framework/project-adoption.md"
echo "検証: ./scripts/check-agent-tools.sh"

echo
echo "--- Agent tool requirements ---"
if [ -x "$TARGET_DIR/scripts/check-agent-tools.sh" ]; then
  (cd "$TARGET_DIR" && ./scripts/check-agent-tools.sh) || true
elif [ -e "$TARGET_DIR/scripts/check-agent-tools.sh" ]; then
  echo "skip: scripts/check-agent-tools.sh is not executable, run: chmod +x scripts/check-agent-tools.sh"
else
  echo "skip: scripts/check-agent-tools.sh not found"
fi
