#!/usr/bin/env python3
"""
validate-preflight-declaration.py — the structural half of the takeoff gate in CI.

Authoritative rule: canon/constraints/preflight-checklist-takeoff-gate.md
Operating contract:  canon/bootstrap/model-operating-contract.md ("The Preflight")
Dispatch protocol:   DISPATCH.md

WHAT THIS CHECKS (and what it deliberately does NOT)

  This is the mechanical, literal half of enforcement — the exact class of
  check `canon/constraints/audit-gates-are-spawned-agent-sessions.md` permits a
  pattern matcher to gate: "a path that doesn't exist, a frontmatter field that
  fails a type check, a forbidden phrase." Presence and well-formedness of a
  preflight declaration on a flight artifact is that kind of literal property.

  It checks that any file which DECLARES ITSELF a flight artifact carries a
  well-formed preflight declaration: all five item keywords (clock, canon,
  tools, tier, boarded) and an explicit disposition ("cleared for takeoff" for a
  passed gate, or "aborting" for an aborted one).

  It does NOT — and cannot — verify that the declared preflight was TRUE (that
  canon actually resolved, that the tools were actually present). Per
  audit-gates-are-spawned-agent-sessions, that judgment is a spawned agent
  session, never a regex. Green here means "a declaration exists and is
  well-formed," never "the flight was airworthy." Mistaking the two would create
  the false-confidence failure that canon warns about.

OPT-IN BY DESIGN (non-retroactive)

  Only files that self-identify as flight artifacts are checked. A file opts in
  by containing the marker `<!-- flight-artifact -->` on its own line. Legacy
  journal/ledger entries authored before this gate are untouched until they
  carry the marker, so the gate can ship soft and tighten without a mass
  backfill. This mirrors the soft->hard rollout the frontmatter and audit gates
  followed.

Usage:
  python3 scripts/validate-preflight-declaration.py [path ...]
    Checks the named paths, or — with no args — every .md under journal/,
    odd/ledger/, and odd/handoffs/. Exits 0 if clean, 1 if findings, 2 on error.

  python3 scripts/validate-preflight-declaration.py --json [path ...]
    Same, but emits {"scanned", "findings", "status"} JSON on stdout for the
    CI workflow's PR-comment renderer — identical shape to
    validate-frontmatter.py so the workflow consumes both the same way.
"""
from __future__ import annotations
import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

# ─── Contract mirror (source of truth: the canon constraint) ──────────────────
FLIGHT_MARKER = "<!-- flight-artifact -->"

# Each item -> the keyword(s) that satisfy it in a declaration. Matched
# case-insensitively as whole words. The constraint names five items.
REQUIRED_ITEMS = {
    "clock": [r"clock"],
    "canon": [r"canon"],
    "tools": [r"tools?"],
    "tier": [r"tier"],
    "boarded": [r"boarded", r"boarding"],
}
# A declaration must resolve to exactly one disposition.
DISPOSITION_PATTERNS = [r"cleared for takeoff", r"aborting", r"abort"]

DEFAULT_DIRS = ["journal", "odd/ledger", "odd/handoffs"]


def finding(path: str, rule_id: str, message: str, occurrence: str = "") -> dict[str, Any]:
    return {
        "rule_id": rule_id,
        "message": message,
        "occurrence": occurrence,
        "location": {"path": path},
    }


def check_file(path: str) -> list[dict[str, Any]]:
    """Return findings for one file (empty if clean or not a flight artifact)."""
    try:
        text = Path(path).read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as e:
        return [finding(path, "unreadable", f"could not read file: {e}")]

    if FLIGHT_MARKER not in text:
        return []  # not a flight artifact — out of scope, no findings

    low = text.lower()
    findings: list[dict[str, Any]] = []

    # Isolate a declaration region if one is delimited; else scan whole file.
    missing = [
        item for item, pats in REQUIRED_ITEMS.items()
        if not any(re.search(rf"\b{p}\b", low) for p in pats)
    ]
    if missing:
        findings.append(finding(
            path, "missing-preflight-items",
            f"flight artifact is missing preflight item(s): {', '.join(missing)}. "
            f"A declaration must name all five (clock, canon, tools, tier, boarded).",
            occurrence=", ".join(missing),
        ))

    if not any(re.search(p, low) for p in DISPOSITION_PATTERNS):
        findings.append(finding(
            path, "missing-disposition",
            "flight artifact declares no preflight disposition — expected "
            "'cleared for takeoff' (passed) or 'aborting' (aborted).",
        ))

    return findings


def discover_targets(args_paths: list[str]) -> list[str]:
    if args_paths:
        out: list[str] = []
        for a in args_paths:
            p = Path(a)
            if p.is_dir():
                out.extend(str(x) for x in p.rglob("*.md"))
            elif p.suffix == ".md":
                out.append(str(p))
        return sorted(set(out))
    out = []
    for d in DEFAULT_DIRS:
        dp = Path(d)
        if dp.is_dir():
            out.extend(str(x) for x in dp.rglob("*.md"))
    return sorted(set(out))


def render_human(findings: list[dict[str, Any]], scanned: int, flights: int) -> str:
    if not findings:
        return (f"✅ Preflight declarations OK — {scanned} file(s) scanned, "
                f"{flights} flight artifact(s) checked, 0 findings.")
    by_file: dict[str, int] = {}
    for f in findings:
        by_file[f["location"]["path"]] = by_file.get(f["location"]["path"], 0) + 1
    lines = [f"❌ Preflight-declaration check found {len(findings)} finding(s) "
             f"across {len(by_file)} flight artifact(s) ({scanned} scanned).\n"]
    for f in findings:
        lines.append(f"  {f['location']['path']}: [{f['rule_id']}] {f['message']}")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate preflight declarations on flight artifacts.")
    ap.add_argument("--json", action="store_true", help="Emit findings as JSON on stdout.")
    ap.add_argument("paths", nargs="*", help="Files or dirs to check (default: journal/, odd/ledger/, odd/handoffs/).")
    args = ap.parse_args()

    targets = discover_targets(args.paths)
    all_findings: list[dict[str, Any]] = []
    flights = 0
    for path in targets:
        try:
            if FLIGHT_MARKER in Path(path).read_text(encoding="utf-8"):
                flights += 1
        except (OSError, UnicodeDecodeError):
            pass
        all_findings.extend(check_file(path))

    if args.json:
        json.dump({
            "scanned": len(targets),
            "flight_artifacts": flights,
            "findings": all_findings,
            "status": "OK" if not all_findings else "FINDINGS",
        }, sys.stdout, indent=2)
        sys.stdout.write("\n")
    else:
        sys.stdout.write(render_human(all_findings, len(targets), flights) + "\n")

    return 1 if all_findings else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:  # noqa: BLE001
        sys.stderr.write(f"internal error: {e}\n")
        sys.exit(2)
