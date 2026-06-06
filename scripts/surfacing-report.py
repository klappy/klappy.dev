#!/usr/bin/env python3
"""
surfacing-report.py — report where each writings/ essay will surface.

The frontmatter validator (validate-frontmatter.py) is a HARD gate: it fails
the build when renderer-critical fields are missing or malformed. But there is
a second, quieter failure mode it deliberately does NOT block, because the
state is sometimes intentional:

    A complete, valid essay set to `exposure: nav` is reachable through site
    navigation but is NOT promoted on the homepage feed.

`public: true` + `exposure: nav` is a legitimate, established pattern in this
repo (several essays use it on purpose). So we cannot hard-fail it. But the
recurring pain is that an author MEANT to publish to the homepage and the essay
silently landed on nav — and nothing said so.

This script makes that state LOUD instead of silent. It classifies every essay
by the surface it will appear on, using the schema's own definitions
(canon/meta/frontmatter-schema.md):

    homepage  = public: true  AND exposure: public   (homepage feed)
    start_here = start_here: true                     (curated reading path)
    nav       = public: true  AND exposure: nav       (navigable, NOT promoted)
    hidden    = exposure in {draft, hidden, internal} OR public is false/absent

It NEVER fails the build (exit 0 always). It is a report. Wire it into CI as a
soft PR comment and into the pre-commit hook so the author sees, at write time,
exactly where each essay they touched will (and will not) show up.

Usage:
  python3 scripts/surfacing-report.py [path ...]      # human-readable
  python3 scripts/surfacing-report.py --json [path ...]
"""
from __future__ import annotations
import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:
    sys.stderr.write("This script requires PyYAML. Install with: pip install pyyaml\n")
    sys.exit(0)  # report-only: never break the build on a missing dep

FRONTMATTER_BLOCK_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def parse_fm(path: str) -> dict[str, Any] | None:
    try:
        text = Path(path).read_text(encoding="utf-8")
    except OSError:
        return None
    m = FRONTMATTER_BLOCK_RE.match(text)
    if not m:
        return None
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError:
        return None
    return fm if isinstance(fm, dict) else None


def classify(fm: dict[str, Any]) -> tuple[str, str]:
    """Return (surface, human_explanation)."""
    public = fm.get("public")
    exposure = fm.get("exposure")
    start_here = bool(fm.get("start_here"))

    if public is not True or public is None:
        return ("hidden", f"public={public!r} — NOT a published essay; will not surface publicly")
    if exposure == "public":
        if start_here:
            return ("homepage+start_here", "homepage feed AND curated start_here reading path")
        return ("homepage", "homepage feed (exposure: public)")
    if exposure == "nav":
        return ("nav", "navigation only — reachable but NOT promoted on the homepage")
    return ("hidden", f"exposure={exposure!r} — not listed on public surfaces")


def discover(paths: list[str]) -> list[str]:
    def keep(p: Path) -> bool:
        return (p.suffix == ".md"
                and p.name != "README.md"
                and not p.name.startswith("_"))
    if paths:
        out: list[str] = []
        for p in paths:
            pp = Path(p)
            if pp.is_dir():
                out.extend(str(x) for x in sorted(pp.rglob("*.md")) if keep(x))
            elif pp.is_file() and keep(pp):
                out.append(str(pp))
        return out
    base = Path("writings")
    return [str(p) for p in sorted(base.rglob("*.md")) if keep(p)] if base.is_dir() else []


def main() -> int:
    ap = argparse.ArgumentParser(description="Report where each writings/ essay surfaces.")
    ap.add_argument("paths", nargs="*", help="Files/dirs. Default: writings/.")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    rows = []
    for path in discover(args.paths):
        fm = parse_fm(path)
        if fm is None:
            rows.append({"path": path, "surface": "unknown",
                         "explanation": "no parseable frontmatter"})
            continue
        surface, explanation = classify(fm)
        rows.append({"path": path, "surface": surface, "explanation": explanation})

    not_promoted = [r for r in rows if r["surface"] in ("nav", "hidden", "unknown")]

    if args.json:
        json.dump({"essays": rows,
                   "not_on_homepage": [r["path"] for r in not_promoted]},
                  sys.stdout, indent=2)
        sys.stdout.write("\n")
        return 0  # report-only

    name_w = max((len(Path(r["path"]).name) for r in rows), default=4)
    print(f"Surfacing report — {len(rows)} essay(s)\n")
    for r in rows:
        print(f"  {Path(r['path']).name.ljust(name_w)}  {r['surface']:18}  {r['explanation']}")
    if not_promoted:
        print("\n⚠ NOT on the homepage feed (confirm this is intentional):")
        for r in not_promoted:
            print(f"  - {Path(r['path']).name}: {r['explanation']}")
        print("\n  To promote to the homepage: set `public: true` and `exposure: public`.")
        print("  To keep it intentionally off the homepage: leave as-is (this is just a heads-up).")
    return 0  # ALWAYS report-only — never fails the build


if __name__ == "__main__":
    sys.exit(main())
