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

if [ ! -f "$MANIFEST" ]; then
  echo "Missing manifest: $MANIFEST" >&2
  exit 1
fi

# shellcheck disable=SC1090
source "$MANIFEST"

if [ "${PROFILE_NAME:-}" != "$PROFILE" ]; then
  echo "Manifest PROFILE_NAME does not match requested profile: $PROFILE_NAME != $PROFILE" >&2
  exit 1
fi

if [ "${PROFILE_FILES:-}" = "" ]; then
  echo "No PROFILE_FILES defined in $MANIFEST" >&2
  exit 1
fi

TIMESTAMP="$(date +%Y%m%d%H%M%S)"
BACKUP_DIR=".ai/backups/$TIMESTAMP"

backup_file() {
  local file="$1"
  mkdir -p "$BACKUP_DIR/$(dirname "$file")"
  cp "$file" "$BACKUP_DIR/$file"
}

is_target_file() {
  local needle="$1"
  for target in $PROFILE_FILES; do
    if [ "$target" = "$needle" ]; then
      return 0
    fi
  done
  return 1
}

MANAGED_FILES="$(
  for manifest in .ai/profiles/*/manifest.env; do
    PROFILE_FILES=""
    # shellcheck disable=SC1090
    source "$manifest"
    for rel in $PROFILE_FILES; do
      printf "%s\n" "$rel"
    done
  done | sort -u
)"

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

for rel in $PROFILE_FILES; do
  src="$PROFILE_DIR/files/$rel"
  dest="$rel"

  if [ ! -f "$src" ]; then
    echo "Missing profile file: $src" >&2
    exit 1
  fi

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
