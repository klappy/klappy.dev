#!/usr/bin/env python3
"""
audit-retrieval-readiness.py — P0010 precursor audit for the Retrieval Disclosure Contract.

Authoritative schema:  canon/meta/frontmatter-schema.md
Governing constraint:   canon/constraints/retrieval-disclosure-contract.md (P0010)
Companion validator:    scripts/validate-frontmatter.py (schema enforcement on writings/)

WHY THIS EXISTS (separate from validate-frontmatter.py)
-------------------------------------------------------
validate-frontmatter.py hard-blocks SCHEMA violations on writings/. This audit
answers a different, P0010-specific question across the WHOLE corpus:

  "Can the retrieval disclosure contract's structural filters and kind
   resolution be trusted yet?"

The contract filters on audience / exposure / tier and resolves a document's
`kind` (canon | docs | journals | essays | apocrypha) frontmatter-primary,
path-secondary. Before the contract can enforce, two things must be true:

  1. STRUCTURAL FIELDS ARE TRUSTWORTHY — every doc the contract would filter
     has valid audience / exposure / tier values (per the schema enum).
  2. KIND RESOLUTION IS PREDICTABLE — every doc resolves to exactly one kind,
     and any doc whose path-derived kind would surprise gets surfaced so an
     explicit `kind:` frontmatter override can be a deliberate choice.

This audit produces a REPORT, not a gate (initially). It runs SOFT — it never
fails the job — until the corpus is clean and oddkit#149 (audit non-determinism)
is resolved, per P0010's own Risk Assessment mitigation.

WHAT IT CHECKS
--------------
  - audience present and in the schema enum (reports drift like 'ledger',
    'handoff', 'system', and template-placeholder leakage)
  - exposure present and in the schema enum
  - tier present and in the schema enum (1-4, unquoted integer)
  - kind resolution: frontmatter `kind:` if present (must be valid enum),
    else path-prefix fallback; reports the resolved kind and flags docs with
    NO path mapping (resolve to 'unknown')
  - default-include impact: which docs would appear / disappear under the
    contract's default include set ["canon", "docs", "essays"]

WHAT IT DOES NOT DO
-------------------
  - Does not enforce the full schema (that's validate-frontmatter.py)
  - Does not check link integrity (that's oddkit_audit)
  - Does not modify any file

Usage:
  python3 scripts/audit-retrieval-readiness.py [path ...]
      Audit named paths, or the whole repo if none given. Human-readable report.

  python3 scripts/audit-retrieval-readiness.py --json [path ...]
      Emit a JSON report for CI consumption.

  python3 scripts/audit-retrieval-readiness.py --summary [path ...]
      One-line-per-section summary only.

Exit codes:
  0 always in soft mode (report only). With --strict, exits 1 if any
  blocking-severity finding exists (for the eventual hard-block flip).
"""
from __future__ import annotations
import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:
    sys.stderr.write("This script requires PyYAML. Install with: pip install pyyaml\n")
    sys.exit(2)


# ─── Schema mirror ──────────────────────────────────────────────────────────
# Source of truth: canon/meta/frontmatter-schema.md
# Kept in sync with scripts/validate-frontmatter.py ENUMS.

AUDIENCE_ENUM = {"canon", "docs", "public", "odd", "operators", "apocrypha"}
EXPOSURE_ENUM = {"nav", "public", "draft", "hidden", "internal"}
TIER_ENUM = {1, 2, 3, 4}

# Canonical kind enumeration (P0010). Fixed across repos; not extensible
# without a canon amendment.
KIND_ENUM = {"canon", "docs", "journals", "essays", "apocrypha"}

# Default path → kind fallback map (P0010 "Document Kinds" section).
# This is the per-repo configurable mapping for klappy.dev. Frontmatter
# `kind:` overrides it. Order matters: longest / most-specific prefix first.
# A doc whose path matches no prefix resolves to 'unknown' and is flagged.
PATH_KIND_MAP: list[tuple[str, str]] = [
    ("writings/", "essays"),
    ("canon/apocrypha/", "apocrypha"),
    ("apocrypha/", "apocrypha"),
    ("canon/", "canon"),
    ("docs/", "docs"),
    ("odd/", "journals"),
    ("journal/", "journals"),
]

# The contract's default include set — docs of these kinds appear when a
# caller passes no include/exclude. Used to report default-visibility impact.
DEFAULT_INCLUDE = {"canon", "docs", "essays"}

# Paths that legitimately carry placeholder / non-conforming frontmatter.
# Templates contain instructional placeholder values by design; archive and
# draft-zero material is not contract-governed. These are reported as
# 'informational' rather than 'blocking'.
EXEMPT_PREFIXES = (
    "docs/TEMPLATE",
    "docs/decisions/TEMPLATE",
    "canon/meta/TEMPLATE",
    "docs/TEMPLATE_README",
    "draft-zeros/",
    "docs/archive/",
    "interfaces/",
    "skills/",
)

FRONTMATTER_BLOCK_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def is_exempt(rel_path: str) -> bool:
    return any(rel_path.startswith(p) or ("/" + p) in ("/" + rel_path)
              for p in EXEMPT_PREFIXES) or "TEMPLATE" in rel_path


def resolve_kind(rel_path: str, fm: dict[str, Any]) -> tuple[str, str]:
    """Return (kind, source) where source is 'frontmatter' or 'path' or 'none'."""
    fk = fm.get("kind")
    if isinstance(fk, str) and fk in KIND_ENUM:
        return fk, "frontmatter"
    if isinstance(fk, str) and fk:  # declared but invalid
        return "invalid", "frontmatter"
    for prefix, kind in PATH_KIND_MAP:
        if rel_path.startswith(prefix):
            return kind, "path"
    return "unknown", "none"


def parse_frontmatter(path: Path) -> tuple[dict[str, Any] | None, str | None]:
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as e:
        return None, f"unreadable: {e}"
    m = FRONTMATTER_BLOCK_RE.match(text)
    if not m:
        return None, "no frontmatter block"
    try:
        data = yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        return None, f"yaml parse error: {e}"
    if not isinstance(data, dict):
        return None, "frontmatter is not a mapping"
    return data, None


def finding(rule_id: str, severity: str, path: str, occurrence: str, message: str) -> dict:
    return {
        "rule_id": rule_id,
        "severity": severity,  # blocking | warning | informational
        "location": {"path": path},
        "occurrence": occurrence,
        "message": message,
    }


def audit_file(path: Path, root: Path) -> tuple[list[dict], dict]:
    rel = str(path.relative_to(root)).replace("\\", "/")
    findings: list[dict] = []
    fm, err = parse_frontmatter(path)
    exempt = is_exempt(rel)
    sev = "informational" if exempt else "blocking"

    if fm is None:
        # Missing frontmatter only matters for contract-governed docs.
        if not exempt:
            findings.append(finding("fm-missing", "blocking", rel, err or "",
                                    "No parseable frontmatter; contract cannot resolve filters."))
        kind, ksrc = resolve_kind(rel, {})
        return findings, {"path": rel, "kind": kind, "kind_source": ksrc,
                          "audience": None, "exposure": None, "tier": None, "exempt": exempt}

    audience = fm.get("audience")
    exposure = fm.get("exposure")
    tier = fm.get("tier")

    # audience
    if audience is None:
        findings.append(finding("audience-missing", sev, rel, "", "Missing audience."))
    elif audience not in AUDIENCE_ENUM:
        findings.append(finding("audience-invalid", sev, rel, str(audience),
                                f"audience {audience!r} not in {sorted(AUDIENCE_ENUM)}."))
    # exposure
    if exposure is None:
        findings.append(finding("exposure-missing", sev, rel, "", "Missing exposure."))
    elif exposure not in EXPOSURE_ENUM:
        findings.append(finding("exposure-invalid", sev, rel, str(exposure),
                                f"exposure {exposure!r} not in {sorted(EXPOSURE_ENUM)}."))
    # tier
    if tier is None:
        findings.append(finding("tier-missing", sev, rel, "", "Missing tier."))
    elif tier not in TIER_ENUM:
        findings.append(finding("tier-invalid", sev, rel, str(tier),
                                f"tier {tier!r} not in {sorted(TIER_ENUM)} (must be unquoted int 1-4)."))

    # kind resolution
    kind, ksrc = resolve_kind(rel, fm)
    if kind == "invalid":
        findings.append(finding("kind-invalid", sev, rel, str(fm.get("kind")),
                                f"frontmatter kind {fm.get('kind')!r} not in {sorted(KIND_ENUM)}."))
    elif kind == "unknown":
        findings.append(finding("kind-unresolvable", "warning", rel, rel.split("/")[0] + "/",
                                "No frontmatter kind and no path-prefix match; resolves to 'unknown'. "
                                "Add an explicit `kind:` field or extend the path map."))

    return findings, {"path": rel, "kind": kind, "kind_source": ksrc,
                      "audience": audience, "exposure": exposure, "tier": tier, "exempt": exempt}


def collect_md(paths: list[str], root: Path) -> list[Path]:
    out: list[Path] = []
    for p in paths:
        pp = (root / p) if not Path(p).is_absolute() else Path(p)
        if pp.is_dir():
            out.extend(sorted(pp.rglob("*.md")))
        elif pp.is_file() and pp.suffix == ".md":
            out.append(pp)
    # de-dupe, skip node_modules
    seen, uniq = set(), []
    for f in out:
        s = str(f)
        if "node_modules" in s or s in seen:
            continue
        seen.add(s)
        uniq.append(f)
    return uniq


def main() -> int:
    ap = argparse.ArgumentParser(description="P0010 retrieval-readiness audit")
    ap.add_argument("paths", nargs="*", help="paths to audit (default: whole repo)")
    ap.add_argument("--json", action="store_true", help="emit JSON report")
    ap.add_argument("--summary", action="store_true", help="one-line summary per section")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any blocking finding (for hard-block flip)")
    ap.add_argument("--root", default=".", help="repo root (default: cwd)")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    targets = args.paths or ["writings", "canon", "docs", "odd", "apocrypha", "journal", "about"]
    files = collect_md(targets, root)

    all_findings: list[dict] = []
    rows: list[dict] = []
    for f in files:
        fnd, row = audit_file(f, root)
        all_findings.extend(fnd)
        rows.append(row)

    # Aggregates
    kind_dist = Counter(r["kind"] for r in rows)
    kind_source_dist = Counter(r["kind_source"] for r in rows)
    blocking = [f for f in all_findings if f["severity"] == "blocking"]
    warnings = [f for f in all_findings if f["severity"] == "warning"]
    info = [f for f in all_findings if f["severity"] == "informational"]
    by_rule = Counter(f["rule_id"] for f in all_findings)

    # Default-include visibility impact
    default_visible = sum(1 for r in rows if r["kind"] in DEFAULT_INCLUDE)
    default_hidden = sum(1 for r in rows if r["kind"] not in DEFAULT_INCLUDE)

    report = {
        "audit": "retrieval-readiness",
        "constraint": "klappy://canon/constraints/retrieval-disclosure-contract",
        "scanned": len(files),
        "status": "OK" if not blocking else "FINDINGS",
        "summary": {
            "blocking": len(blocking),
            "warning": len(warnings),
            "informational": len(info),
            "by_rule": dict(by_rule),
            "kind_distribution": dict(kind_dist),
            "kind_source_distribution": dict(kind_source_dist),
            "default_include_visible": default_visible,
            "default_include_hidden": default_hidden,
        },
        "findings": all_findings,
    }

    if args.json:
        print(json.dumps(report, indent=2))
        return 1 if (args.strict and blocking) else 0

    if args.summary:
        s = report["summary"]
        print(f"retrieval-readiness: {report['status']} | scanned={report['scanned']}")
        print(f"  blocking={s['blocking']} warning={s['warning']} info={s['informational']}")
        print(f"  kinds={s['kind_distribution']}")
        print(f"  kind_source={s['kind_source_distribution']}")
        print(f"  default-include visible={s['default_include_visible']} hidden={s['default_include_hidden']}")
        return 1 if (args.strict and blocking) else 0

    # Human-readable report
    print(f"\n=== P0010 Retrieval-Readiness Audit ===")
    print(f"Constraint: {report['constraint']}")
    print(f"Scanned: {report['scanned']} files")
    print(f"Status:  {report['status']}")
    s = report["summary"]
    print(f"\nFindings: {s['blocking']} blocking, {s['warning']} warning, {s['informational']} informational")
    print(f"By rule:  {dict(by_rule)}")
    print(f"\nKind distribution:        {dict(kind_dist)}")
    print(f"Kind source:              {dict(kind_source_dist)}")
    print(f"Default-include impact:   {default_visible} visible, {default_hidden} hidden (journals/apocrypha/unknown)")

    if blocking:
        print(f"\n--- BLOCKING ({len(blocking)}) — contract cannot trust these docs ---")
        for f in blocking[:60]:
            print(f"  [{f['rule_id']}] {f['location']['path']}: {f['message']} ({f['occurrence']})")
        if len(blocking) > 60:
            print(f"  … and {len(blocking) - 60} more")

    if warnings:
        print(f"\n--- WARNING ({len(warnings)}) — kind resolution needs attention ---")
        for f in warnings[:30]:
            print(f"  [{f['rule_id']}] {f['location']['path']}: {f['message']}")
        if len(warnings) > 30:
            print(f"  … and {len(warnings) - 30} more")

    if info:
        print(f"\n--- INFORMATIONAL ({len(info)}) — exempt (templates/archive/drafts) ---")
        print(f"  {len(info)} finding(s) on exempt paths; not contract-governed.")

    print()
    return 1 if (args.strict and blocking) else 0


if __name__ == "__main__":
    sys.exit(main())
