#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/af-installer-test.XXXXXX")"
trap 'rm -rf "$WORK_DIR"' EXIT

make_fixture() {
  local exit_status="$1"
  local fixture_dir="$2"
  local archive_root="$fixture_dir/archive/agentic-framework-0.2.5"
  mkdir -p "$archive_root/scripts"
  printf '0.2.5\n' > "$archive_root/VERSION"
  cat > "$archive_root/scripts/bootstrap-project.sh" <<EOF
#!/usr/bin/env bash
mkdir -p "\$1/.agentic-framework"
printf 'bootstrap called\n' > "\$1/.agentic-framework/fixture-marker"
exit $exit_status
EOF
  chmod +x "$archive_root/scripts/bootstrap-project.sh"
  (
    cd "$fixture_dir/archive"
    zip -qr "$fixture_dir/public.zip" agentic-framework-0.2.5
  )

  local bytes sha
  bytes="$(wc -c < "$fixture_dir/public.zip" | tr -d '[:space:]')"
  sha="$(shasum -a 256 "$fixture_dir/public.zip" | awk '{print $1}')"
  cat > "$fixture_dir/release.json" <<EOF
{"version":"0.2.5","tag":"v0.2.5","artifact":{"filename":"public.zip","bytes":$bytes,"sha256":"$sha"}}
EOF
}

SUCCESS_FIXTURE="$WORK_DIR/success"
SUCCESS_TARGET="$WORK_DIR/success-target"
mkdir -p "$SUCCESS_FIXTURE" "$SUCCESS_TARGET" "$WORK_DIR/tmp"
make_fixture 0 "$SUCCESS_FIXTURE"

TMPDIR="$WORK_DIR/tmp" \
AF_ALLOW_FILE_URLS=1 \
AF_RELEASE_METADATA_URL="file://$SUCCESS_FIXTURE/release.json" \
AF_ARTIFACT_URL="file://$SUCCESS_FIXTURE/public.zip" \
  bash "$ROOT_DIR/scripts/install.sh" "$SUCCESS_TARGET" >/dev/null
test -f "$SUCCESS_TARGET/.agentic-framework/fixture-marker"
test -z "$(find "$WORK_DIR/tmp" -mindepth 1 -maxdepth 1 -type d -name 'agentic-framework-install.*' -print -quit)"

BAD_TARGET="$WORK_DIR/bad-target"
mkdir -p "$BAD_TARGET"
node -e '
  const fs = require("fs");
  const path = process.argv[1];
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  data.artifact.sha256 = "0".repeat(64);
  fs.writeFileSync(path, JSON.stringify(data));
' "$SUCCESS_FIXTURE/release.json"
if AF_ALLOW_FILE_URLS=1 \
   AF_RELEASE_METADATA_URL="file://$SUCCESS_FIXTURE/release.json" \
   AF_ARTIFACT_URL="file://$SUCCESS_FIXTURE/public.zip" \
   bash "$ROOT_DIR/scripts/install.sh" "$BAD_TARGET" >/dev/null 2>&1; then
  echo "FAIL: installer accepted a checksum mismatch" >&2
  exit 1
fi
test ! -e "$BAD_TARGET/.agentic-framework/fixture-marker"

CONFLICT_FIXTURE="$WORK_DIR/conflict"
CONFLICT_TARGET="$WORK_DIR/conflict-target"
mkdir -p "$CONFLICT_FIXTURE" "$CONFLICT_TARGET"
make_fixture 2 "$CONFLICT_FIXTURE"
set +e
AF_ALLOW_FILE_URLS=1 \
AF_RELEASE_METADATA_URL="file://$CONFLICT_FIXTURE/release.json" \
AF_ARTIFACT_URL="file://$CONFLICT_FIXTURE/public.zip" \
  bash "$ROOT_DIR/scripts/install.sh" "$CONFLICT_TARGET" >/dev/null 2>&1
STATUS=$?
set -e
test "$STATUS" -eq 2

echo "PASS: installer verifies releases, cleans temporary files, and propagates bootstrap status"
