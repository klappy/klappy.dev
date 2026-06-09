#!/usr/bin/env python3
"""
validate-frontmatter.py — enforce klappy.dev frontmatter schema in CI.

Authoritative schema: canon/meta/frontmatter-schema.md
Canon constraint:    canon/constraints/frontmatter-validation-before-merge.md

What this catches (all are documented "Known Crash Patterns" or schema
violations from the canon constraint):

  - Missing frontmatter block entirely
  - Missing one of the 8 universal fields (uri, title, audience, exposure,
    tier, voice, stability, tags)
  - Invalid enum values for exposure / voice / tier / audience
  - Quoted booleans (`public: "true"` instead of `public: true`) — YAML
    parses these as strings, which the renderer rejects
  - Contradictory flags (`public: false` + `exposure: public`) — renderer
    builds a route with no content
  - ANY essay in writings/ missing renderer-critical fields (public, type,
    slug, hook, description) — regardless of exposure. The card renders empty
    (or the essay silently never surfaces) without them. This is unconditional:
    the old gate only checked exposure=public essays, which let nav essays slip
    through with missing fields and then vanish from the homepage — the
    recurring "merged but invisible" bug.

What this does NOT catch (deferred — separate concerns):
  - Terminological drift, projection staleness, epoch gaps
  - Stale `derives_from` / `related` references (that's oddkit_audit's job)
  - Style / tone / writing canon checklist items (that's the writer's job)

Usage:
  python3 scripts/validate-frontmatter.py [path ...]
    Validates the named paths or — with no args — every .md in writings/.
    Exits 0 if clean, 1 if any errors found, 2 on internal error.

  python3 scripts/validate-frontmatter.py --json [path ...]
    Same, but emits findings as a JSON array on stdout (one object per
    violation) for consumption by the CI workflow's PR-comment renderer.

The Vodka discipline: this script reads its enum values from a single
constants block below. The canon schema document is the source of truth;
this script mirrors it for low-latency CI gating. Drift between them is
itself a violation — the script's own tests verify the mirror is in sync.
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
    sys.exit(2)


# ─── Schema mirror ─────────────────────────────────────────────────────────────
# Source of truth: canon/meta/frontmatter-schema.md
# If these diverge, the schema doc wins and this mirror must be updated.

ENUMS: dict[str, set] = {
    "exposure": {"nav", "public", "draft", "hidden", "internal"},
    "voice":    {"first_person", "neutral", "direct", "narrative",
                 "conversational", "authoritative"},
    "tier":     {1, 2, 3, 4},
    "audience": {"canon", "docs", "public", "odd", "operators", "apocrypha"},
    # Repo-routing field for the klappy.dev bifurcation. Optional: absence means
    # the file stays in klappy.dev. When present it must be one of these three
    # destinations — a malformed value would silently mis-route a file at
    # extraction time, so the gate rejects it. Source of truth:
    # canon/meta/frontmatter-schema.md §"Repo Routing — target_repo".
    "target_repo": {"outcomes-driven-development", "oddkit", "undecided"},
}

# The eight universal fields. Every document, regardless of audience, must
# declare these.
UNIVERSAL_REQUIRED: list[str] = [
    "uri", "title", "audience", "exposure", "tier", "voice", "stability", "tags",
]

# Renderer-critical discovery fields for public essays in writings/. Anything
# in writings/ with exposure=public hits the homepage card; without these the
# card renders empty (the May 10 incident).
ESSAY_DISCOVERY_REQUIRED: list[str] = [
    "type", "slug", "hook", "description",
]

# Fields that must be unquoted booleans in YAML. Quoting them produces a
# string, which the renderer rejects.
BOOLEAN_FIELDS: list[str] = ["public"]

# Fields that must be unquoted integers in YAML.
INTEGER_FIELDS: list[str] = ["tier"]


# ─── Finding shape ─────────────────────────────────────────────────────────────

def finding(
    rule_id: str,
    severity: str,
    path: str,
    occurrence: str,
    message: str,
) -> dict[str, Any]:
    return {
        "rule_id": rule_id,
        "severity": severity,
        "location": {"path": path, "line": 1},
        "occurrence": occurrence,
        "message": message,
    }


# ─── Validators ────────────────────────────────────────────────────────────────

CANON_REF = "klappy://canon/meta/frontmatter-schema"
CONSTRAINT_REF = "klappy://canon/constraints/frontmatter-validation-before-merge"

FRONTMATTER_BLOCK_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def validate_file(path: str) -> list[dict[str, Any]]:
    """Validate one markdown file. Returns list of findings (empty if clean)."""
    try:
        text = Path(path).read_text(encoding="utf-8")
    except OSError as e:
        return [finding("frontmatter-parse-error", "error", path, str(e),
                        f"Could not read file: {e}")]

    m = FRONTMATTER_BLOCK_RE.match(text)
    if not m:
        return [finding(
            "frontmatter-missing-block", "error", path, "(no --- delimiters)",
            f"File has no YAML frontmatter block. Every .md document under "
            f"writings/ must open with a frontmatter block. Canon: {CANON_REF}",
        )]

    try:
        fm = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as e:
        return [finding(
            "frontmatter-parse-error", "error", path, str(e),
            f"YAML frontmatter is malformed and could not be parsed: {e}. "
            f"Canon: {CANON_REF}",
        )]

    if not isinstance(fm, dict):
        return [finding(
            "frontmatter-parse-error", "error", path, str(type(fm).__name__),
            f"Frontmatter parsed as {type(fm).__name__} rather than a mapping. "
            f"Canon: {CANON_REF}",
        )]

    findings: list[dict[str, Any]] = []

    # 1. Universal required fields
    for field in UNIVERSAL_REQUIRED:
        v = fm.get(field)
        if v is None or v == "" or v == []:
            findings.append(finding(
                "frontmatter-missing-required", "error", path, field,
                f'Required universal field "{field}" is missing or empty. '
                f"The eight universal fields are: "
                f"{', '.join(UNIVERSAL_REQUIRED)}. Canon: {CANON_REF}",
            ))

    # 2. Enum validation — only flag if the field is present (missing was
    #    already handled above for universal fields).
    for field, allowed in ENUMS.items():
        v = fm.get(field)
        if v is None:
            continue
        # bool is a subclass of int in Python, so `True in {1, 2, 3, 4}` is
        # True. Reject booleans where the enum contains no booleans (e.g.
        # `tier: true` must not pass as `tier: 1`).
        bool_mismatch = isinstance(v, bool) and not any(
            isinstance(a, bool) for a in allowed
        )
        if bool_mismatch or v not in allowed:
            allowed_repr = ", ".join(sorted(repr(a) for a in allowed))
            findings.append(finding(
                "frontmatter-invalid-enum", "error", path,
                f"{field}: {v!r}",
                f'Field "{field}" has value {v!r}, which is not in the '
                f"allowed set: [{allowed_repr}]. Canon: {CANON_REF}",
            ))

    # 3. Quoted-boolean detection
    for field in BOOLEAN_FIELDS:
        v = fm.get(field)
        if isinstance(v, str) and v.lower() in ("true", "false"):
            findings.append(finding(
                "frontmatter-type-mismatch", "error", path,
                f'{field}: "{v}"',
                f'Field "{field}" is a quoted string {v!r} but must be an '
                f"unquoted boolean ({v.lower()}). YAML coerces unquoted "
                f"true/false to booleans; quoted values parse as strings, "
                f"which the renderer rejects. Canon: {CANON_REF}",
            ))

    # 4. Integer fields must not be quoted strings
    for field in INTEGER_FIELDS:
        v = fm.get(field)
        if isinstance(v, str) and v.isdigit():
            findings.append(finding(
                "frontmatter-type-mismatch", "error", path,
                f'{field}: "{v}"',
                f'Field "{field}" is a quoted string {v!r} but must be an '
                f"unquoted integer. Canon: {CANON_REF}",
            ))

    # 5. Contradictory flags (Known Crash Pattern from canon constraint)
    public_val = fm.get("public")
    public_is_false = public_val is False or (
        isinstance(public_val, str) and public_val.strip().lower() == "false"
    )
    if public_is_false and fm.get("exposure") == "public":
        findings.append(finding(
            "frontmatter-contradictory", "error", path,
            "public: false + exposure: public",
            f'Contradictory flags: "public: false" with "exposure: public" '
            f"causes the renderer to build a route with no content. "
            f"Set both consistently. Canon: {CONSTRAINT_REF}",
        ))

    # 6. Renderer-critical fields for ALL essays in writings/ (regardless of
    #    exposure). The OLD gate only fired for exposure=public, which let an
    #    essay sit on exposure=nav with missing type/slug/public and pass
    #    clean — then silently never appear on the homepage. That conditional
    #    blind spot is the recurring "merged but invisible" bug. Every essay in
    #    writings/ needs these fields to render a card on ANY surface (the
    #    homepage feed at exposure=public, or the nav list at exposure=nav), so
    #    require them unconditionally.
    is_writing = path.startswith("writings/") or "/writings/" in path
    if is_writing:
        # 6a. `public` must be PRESENT and a real boolean. Its absence is the
        #     exact shape of the silent-drop bug: the essay merges, CI is
        #     green, and it never surfaces. Every published essay in the corpus
        #     already carries `public: true`; the only files that omit it are
        #     the ones that vanished.
        if "public" not in fm or fm.get("public") is None:
            findings.append(finding(
                "frontmatter-missing-required", "error", path, "public",
                f'Essay in writings/ is missing the "public" field. Every '
                f"essay must declare `public: true` (a real published essay) "
                f"or `public: false` (draft/internal). Its absence is the "
                f"silent-drop pattern — the essay merges but never surfaces. "
                f"Canon: {CONSTRAINT_REF}",
            ))
        elif not isinstance(fm.get("public"), bool):
            findings.append(finding(
                "frontmatter-type-mismatch", "error", path,
                f"public: {fm.get('public')!r}",
                f'Field "public" must be an unquoted boolean (true/false); '
                f"got a {type(fm.get('public')).__name__}. Canon: {CANON_REF}",
            ))

        # 6b. Discovery fields required for EVERY essay, not just public ones.
        for field in ESSAY_DISCOVERY_REQUIRED:
            v = fm.get(field)
            if v is None or v == "" or v == []:
                findings.append(finding(
                    "frontmatter-missing-required", "error", path, field,
                    f'Essay in writings/ is missing renderer-critical field '
                    f'"{field}". Without it the card renders empty on whatever '
                    f"surface lists it (homepage feed or nav). Required for "
                    f"ALL writings essays: "
                    f"{', '.join(ESSAY_DISCOVERY_REQUIRED)}. "
                    f"Canon: {CONSTRAINT_REF}",
                ))

    return findings


def discover_targets(args_paths: list[str]) -> list[str]:
    """Resolve CLI args to a list of .md files to scan. README.md files are
    skipped as they are section indexes with a different shape from articles."""
    def keep(p: Path) -> bool:
        # Skip README indexes and underscore-prefixed files (templates,
        # partials, scaffolds like writings/_TEMPLATE.md).
        return (p.suffix == ".md"
                and p.name != "README.md"
                and not p.name.startswith("_"))

    if args_paths:
        out: list[str] = []
        for p in args_paths:
            pp = Path(p)
            if pp.is_dir():
                out.extend(str(x) for x in sorted(pp.rglob("*.md")) if keep(x))
            elif pp.is_file() and keep(pp):
                out.append(str(pp))
        return out
    # Default: every .md under writings/ except README.md
    base = Path("writings")
    if not base.is_dir():
        return []
    return [str(p) for p in sorted(base.rglob("*.md")) if keep(p)]


def render_human(findings: list[dict[str, Any]], scanned: int) -> str:
    if not findings:
        return f"✅ Frontmatter OK — {scanned} file(s) scanned, 0 findings."
    by_file: dict[str, list[dict[str, Any]]] = {}
    for f in findings:
        by_file.setdefault(f["location"]["path"], []).append(f)
    lines = [f"❌ Frontmatter validation found {len(findings)} finding(s) "
             f"across {len(by_file)} file(s) ({scanned} scanned).\n"]
    for path, items in sorted(by_file.items()):
        lines.append(f"  {path}:")
        for it in items:
            lines.append(f"    [{it['rule_id']}] {it['occurrence']}")
            lines.append(f"      → {it['message']}")
        lines.append("")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Validate klappy.dev frontmatter against the canon schema.",
    )
    ap.add_argument("paths", nargs="*", help="Files or directories to scan. "
                    "Default: every .md under writings/.")
    ap.add_argument("--json", action="store_true",
                    help="Emit findings as a JSON array on stdout.")
    args = ap.parse_args()

    targets = discover_targets(args.paths)
    all_findings: list[dict[str, Any]] = []
    for path in targets:
        all_findings.extend(validate_file(path))

    if args.json:
        json.dump({
            "scanned": len(targets),
            "findings": all_findings,
            "status": "OK" if not all_findings else "FINDINGS",
        }, sys.stdout, indent=2)
        sys.stdout.write("\n")
    else:
        sys.stdout.write(render_human(all_findings, len(targets)) + "\n")

    return 1 if all_findings else 0


if __name__ == "__main__":
    sys.exit(main())
