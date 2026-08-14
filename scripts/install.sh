#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: install.sh [--accept-existing] /path/to/target-project"
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
METADATA_URL="${AF_RELEASE_METADATA_URL:-https://ai.microdotz.net/release.json}"

for command_name in curl unzip node mktemp wc tr; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "必要なcommandが見つかりません: $command_name" >&2
    exit 1
  fi
done

if command -v shasum >/dev/null 2>&1; then
  SHA_COMMAND=shasum
elif command -v sha256sum >/dev/null 2>&1; then
  SHA_COMMAND=sha256sum
else
  echo "必要なcommandが見つかりません: shasum または sha256sum" >&2
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "Target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi

fetch() {
  local url="$1"
  local output="$2"
  case "$url" in
    https://*)
      curl -fsSL --proto '=https' --tlsv1.2 "$url" -o "$output"
      ;;
    file://*)
      if [ "${AF_ALLOW_FILE_URLS:-0}" != 1 ]; then
        echo "file URLはtest時にAF_ALLOW_FILE_URLS=1を指定した場合だけ利用できます。" >&2
        return 1
      fi
      curl -fsSL --proto '=file' "$url" -o "$output"
      ;;
    *)
      echo "許可されていないURL schemeです: $url" >&2
      return 1
      ;;
  esac
}

TMP_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/agentic-framework-install.XXXXXX")"
trap 'rm -rf "$TMP_ROOT"' EXIT
METADATA_FILE="$TMP_ROOT/release.json"
ARCHIVE_FILE="$TMP_ROOT/public.zip"
INFO_FILE="$TMP_ROOT/release-info.txt"

echo "release metadataを取得しています: $METADATA_URL"
fetch "$METADATA_URL" "$METADATA_FILE"

node - "$METADATA_FILE" "$METADATA_URL" > "$INFO_FILE" <<'NODE'
const fs = require("fs");
const [metadataPath, metadataUrl] = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
const version = data.version;
const artifact = data.artifact || {};
const name = artifact.name || artifact.filename;
const bytes = artifact.bytes;
const sha256 = artifact.sha256;
if (typeof version !== "string" || !/^\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/.test(version)) {
  throw new Error("release metadata version is invalid");
}
if (typeof name !== "string" || !/^[A-Za-z0-9._-]+\.zip$/.test(name)) {
  throw new Error("release metadata artifact name is invalid");
}
if (!Number.isSafeInteger(bytes) || bytes <= 0) {
  throw new Error("release metadata artifact bytes is invalid");
}
if (typeof sha256 !== "string" || !/^[a-f0-9]{64}$/.test(sha256)) {
  throw new Error("release metadata artifact sha256 is invalid");
}
console.log(version);
console.log(name);
console.log(bytes);
console.log(sha256);
console.log(new URL(name, metadataUrl).href);
NODE

VERSION="$(sed -n '1p' "$INFO_FILE")"
ARTIFACT_NAME="$(sed -n '2p' "$INFO_FILE")"
EXPECTED_BYTES="$(sed -n '3p' "$INFO_FILE")"
EXPECTED_SHA="$(sed -n '4p' "$INFO_FILE")"
DEFAULT_ARTIFACT_URL="$(sed -n '5p' "$INFO_FILE")"
ARTIFACT_URL="${AF_ARTIFACT_URL:-$DEFAULT_ARTIFACT_URL}"

echo "AF v${VERSION}を取得しています。"
fetch "$ARTIFACT_URL" "$ARCHIVE_FILE"

ACTUAL_BYTES="$(wc -c < "$ARCHIVE_FILE" | tr -d '[:space:]')"
if [ "$ACTUAL_BYTES" != "$EXPECTED_BYTES" ]; then
  echo "archive byte数がrelease metadataと一致しません。" >&2
  exit 1
fi

if [ "$SHA_COMMAND" = shasum ]; then
  ACTUAL_SHA="$(shasum -a 256 "$ARCHIVE_FILE" | awk '{print $1}')"
else
  ACTUAL_SHA="$(sha256sum "$ARCHIVE_FILE" | awk '{print $1}')"
fi
if [ "$ACTUAL_SHA" != "$EXPECTED_SHA" ]; then
  echo "archive SHA-256がrelease metadataと一致しません。" >&2
  exit 1
fi

PREFIX="agentic-framework-${VERSION}"
ENTRY_LIST="$TMP_ROOT/archive-entries.txt"
unzip -Z1 "$ARCHIVE_FILE" > "$ENTRY_LIST"
if [ ! -s "$ENTRY_LIST" ]; then
  echo "archiveが空です。" >&2
  exit 1
fi
while IFS= read -r entry; do
  case "$entry" in
    "$PREFIX"|"$PREFIX/"|"$PREFIX/"*) ;;
    *)
      echo "archiveに許可されていないpathがあります。" >&2
      exit 1
      ;;
  esac
  case "$entry" in
    *"/../"*|*"\\"*)
      echo "archiveに安全でないpathがあります。" >&2
      exit 1
      ;;
  esac
done < "$ENTRY_LIST"

unzip -q "$ARCHIVE_FILE" -d "$TMP_ROOT/extracted"
SOURCE_ROOT="$TMP_ROOT/extracted/$PREFIX"
if [ "$(tr -d '[:space:]' < "$SOURCE_ROOT/VERSION")" != "$VERSION" ]; then
  echo "archive内VERSIONがrelease metadataと一致しません。" >&2
  exit 1
fi

BOOTSTRAP_ARGS=()
if [ "$ACCEPT_EXISTING" = true ]; then
  BOOTSTRAP_ARGS+=(--accept-existing)
fi
BOOTSTRAP_ARGS+=("$TARGET_DIR")

set +e
bash "$SOURCE_ROOT/scripts/bootstrap-project.sh" "${BOOTSTRAP_ARGS[@]}"
STATUS=$?
set -e

if [ "$STATUS" -eq 2 ]; then
  echo
  echo "installerは競合を検出したため、導入を完了していません。"
elif [ "$STATUS" -ne 0 ]; then
  echo
  echo "installerはstatus $STATUSで終了しました。" >&2
fi
exit "$STATUS"
