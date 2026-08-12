#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <profile>"
  echo
  echo "Available profiles:"
  find ".ai/profiles" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; 2>/dev/null | sort || true
}

if [ "${1:-}" = "" ]; then
  usage
  exit 1
fi

PROFILE="$1"
PROFILE_DIR=".ai/profiles/$PROFILE"
MANIFEST="$PROFILE_DIR/manifest.env"

if [ ! -d "$PROFILE_DIR" ]; then
  echo "Unknown AI profile: $PROFILE" >&2
  usage
  exit 1
fi

validate_profile_path() {
  local rel="$1"
  local manifest="$2"
  case "$rel" in
    AGENTS.md|/*|../*|*/../*|*/..|.|./*|-*|*[[:space:]]*)
      echo "Unsafe profile file path '$rel' in $manifest" >&2
      return 1
      ;;
  esac
}

read_profile_files() {
  local manifest="$1"
  local expected_name="$2"
  (
    PROFILE_NAME=""
    PROFILE_FILES=""
    if [ ! -f "$manifest" ]; then
      echo "Missing manifest: $manifest" >&2
      exit 1
    fi
    # shellcheck disable=SC1090
    source "$manifest"
    if [ "$PROFILE_NAME" != "$expected_name" ]; then
      echo "Manifest PROFILE_NAME does not match profile: $PROFILE_NAME != $expected_name" >&2
      exit 1
    fi
    for rel in $PROFILE_FILES; do
      validate_profile_path "$rel" "$manifest" || exit 1
      printf "%s\n" "$rel"
    done
  )
}

# Validate every manifest before any backup, removal, or copy. A malformed
# sibling profile must not be able to turn a safe selection into a mutation.
MANAGED_FILES="$({
  for profile_dir in .ai/profiles/*; do
    [ -d "$profile_dir" ] || continue
    profile_name="$(basename "$profile_dir")"
    read_profile_files "$profile_dir/manifest.env" "$profile_name" || exit 1
  done
} | sort -u)"

SELECTED_PROFILE_FILES="$(read_profile_files "$MANIFEST" "$PROFILE")"

# Preflight every selected source before deactivating the current profile.
for rel in $SELECTED_PROFILE_FILES; do
  src="$PROFILE_DIR/files/$rel"
  if [ ! -f "$src" ]; then
    echo "Missing profile file: $src" >&2
    exit 1
  fi
done

TIMESTAMP="$(date +%Y%m%d%H%M%S)"
BACKUP_DIR=".ai/backups/$TIMESTAMP"

backup_file() {
  local file="$1"
  mkdir -p "$BACKUP_DIR/$(dirname "$file")"
  cp "$file" "$BACKUP_DIR/$file"
}

is_target_file() {
  local needle="$1"
  for target in $SELECTED_PROFILE_FILES; do
    if [ "$target" = "$needle" ]; then
      return 0
    fi
  done
  return 1
}

for managed in $MANAGED_FILES; do
  if is_target_file "$managed"; then
    continue
  fi

  if [ -e "$managed" ]; then
    backup_file "$managed"
    rm -f "$managed"
    echo "deactivated: $managed -> $BACKUP_DIR/$managed"
  fi
done

for rel in $SELECTED_PROFILE_FILES; do
  src="$PROFILE_DIR/files/$rel"
  dest="$rel"

  if [ -e "$dest" ]; then
    backup_file "$dest"
    echo "backed up: $dest -> $BACKUP_DIR/$dest"
  fi

  mkdir -p "$(dirname "$dest")"
  cp "$src" "$dest"
  echo "activated: $dest"
done

printf "%s\n" "$PROFILE" > .ai/active-profile
echo "active profile: $PROFILE"
