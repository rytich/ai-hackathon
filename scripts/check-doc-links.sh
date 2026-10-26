#!/usr/bin/env bash
# docs/ の相対リンクを検証する。
#   - broken link: 存在しないファイルへの相対リンク（エラー / exit 1）
#   - orphan: どこからもリンクされない content ノート（警告 / exit は変えない）
#
# 使い方:
#   scripts/check-doc-links.sh [docs_dir]     # 既定 docs_dir=docs
#
# 到達扱いにするもの:
#   - README.md / index.md（フォルダの入口）
#   - コード表記のパス `path/to/x.md`（AGENTS の Required Reading 等）
#   - ルートの README.md / AGENTS.md / CLAUDE.md からのリンク
#
# orphan の除外パス（時系列ログ・構造ファイル）は環境変数で調整する:
#   DOC_LINKS_EXEMPT="work-notes/,作業記録/,templates/"   # 既定
set -euo pipefail

DOCS_DIR="${1:-docs}"
EXEMPT="${DOC_LINKS_EXEMPT:-work-notes/,作業記録/,templates/}"

if [ ! -d "$DOCS_DIR" ]; then
  echo "docs dir not found: $DOCS_DIR" >&2
  exit 2
fi

DOCS_DIR="$DOCS_DIR" EXEMPT="$EXEMPT" python3 - <<'PY'
import os, re, glob, sys

DOCS = os.environ["DOCS_DIR"].rstrip("/")
EXEMPT = [e for e in os.environ["EXEMPT"].split(",") if e]

all_docs = set(os.path.normpath(p) for p in glob.glob(f"{DOCS}/**/*.md", recursive=True))

sources = list(all_docs)
for extra in ("README.md", "AGENTS.md", "CLAUDE.md"):
    if os.path.exists(extra):
        sources.append(extra)

link_re = re.compile(r'\]\(([^)]+)\)')
code_re = re.compile(r'`([^`]+\.md)`')

referenced = set()
broken = []

inline_code_re = re.compile(r'`[^`]*`')

for s in sorted(set(sources)):
    d = os.path.dirname(s)
    txt = open(s, encoding="utf-8").read()
    # コード表記のパスは到達扱い（Required Reading など）— 元テキストから拾う
    for raw in code_re.findall(txt):
        tgt = os.path.normpath(raw)
        if tgt in all_docs:
            referenced.add(tgt)
    # 実リンクの判定はインラインコード（説明用のリンク例）を除いてから行う
    txt_nocode = inline_code_re.sub("", txt)
    for raw in link_re.findall(txt_nocode):
        if raw.startswith(("http://", "https://", "#", "mailto:")):
            continue
        path = raw.split("#", 1)[0]
        if not path:
            continue
        if os.path.isabs(path) and path.endswith(".md"):
            broken.append((s, raw))
            continue
        tgt = os.path.normpath(path if os.path.isabs(path) else os.path.join(d, path))
        if tgt.endswith(".md"):
            if tgt in all_docs:
                referenced.add(tgt)
            elif not os.path.exists(tgt):
                broken.append((s, raw))

def is_exempt(p):
    if os.path.basename(p) in ("README.md", "index.md"):
        return True
    norm = "/" + p.replace(os.sep, "/")
    return any(e in norm for e in EXEMPT)

orphans = [p for p in sorted(all_docs) if p not in referenced and not is_exempt(p)]

print(f"docs: {len(all_docs)} files  |  exempt: {', '.join(EXEMPT) or '(none)'}")
if broken:
    print(f"\nBROKEN LINKS ({len(broken)}):")
    for s, raw in broken:
        print(f"  {s} -> {raw}")
if orphans:
    print(f"\nORPHANS ({len(orphans)}) — content that nothing links to; link it from an index/README or a related doc, or remove it:")
    for o in orphans:
        print(f"  {o}")
if not broken and not orphans:
    print("OK: no broken links, no orphans.")

sys.exit(1 if broken else 0)
PY
