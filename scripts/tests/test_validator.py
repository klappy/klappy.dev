#!/usr/bin/env python3
"""
Smoke tests for validate-frontmatter.py.

Run from the repo root:
    python3 scripts/tests/test_validator.py
"""
import json
import os
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
SCRIPT = REPO / "scripts" / "validate-frontmatter.py"
FIXTURES = REPO / "scripts" / "tests" / "fixtures"


def run(*paths) -> dict:
    proc = subprocess.run(
        [sys.executable, str(SCRIPT), "--json", *paths],
        capture_output=True, text=True, cwd=REPO,
    )
    return json.loads(proc.stdout), proc.returncode


def expect(rule_ids: set[str], findings: list, msg: str) -> None:
    actual = {f["rule_id"] for f in findings}
    missing = rule_ids - actual
    if missing:
        print(f"FAIL: {msg}: missing rules {missing}; got {actual}")
        sys.exit(1)
    print(f"  OK: {msg} — {sorted(actual)}")


def main() -> None:
    # 1. Valid essay → no findings, exit 0
    d, rc = run(str(FIXTURES / "writings" / "valid.md"))
    assert rc == 0 and not d["findings"], f"valid case failed: {d}"
    print("  OK: valid public essay → 0 findings, exit 0")

    # 2. Missing universal + invalid enums + quoted booleans
    d, rc = run(str(FIXTURES / "broken-missing-universal.md"))
    assert rc == 1, f"expected exit 1, got {rc}"
    expect(
        {"frontmatter-missing-required",
         "frontmatter-invalid-enum",
         "frontmatter-type-mismatch"},
        d["findings"],
        "broken-missing-universal: 3 rule classes fire",
    )

    # 3. Contradictory flags + essay discovery missing
    d, rc = run(str(FIXTURES / "writings" / "broken-contradictory.md"))
    assert rc == 1, f"expected exit 1, got {rc}"
    expect(
        {"frontmatter-contradictory",
         "frontmatter-missing-required"},
        d["findings"],
        "broken-contradictory: contradictory + missing-essay-critical fire",
    )

    # 4. No frontmatter block at all
    d, rc = run(str(FIXTURES / "broken-no-frontmatter.md"))
    assert rc == 1, f"expected exit 1, got {rc}"
    expect(
        {"frontmatter-missing-block"},
        d["findings"],
        "broken-no-frontmatter: missing-block fires",
    )

    # 4b. REGRESSION: the recurring "merged but invisible" bug. A writings
    #     essay on exposure=nav with missing public/type/slug used to pass the
    #     old conditional gate (which only checked exposure=public). It must
    #     now fail. This fixture must produce a `public` finding AND `type`/
    #     `slug` discovery findings regardless of its nav exposure.
    d, rc = run(str(FIXTURES / "writings" / "broken-nav-missing-discovery.md"))
    assert rc == 1, f"expected exit 1 for nav-missing-discovery, got {rc}"
    occurrences = {f["occurrence"] for f in d["findings"]}
    for required in ("public", "type", "slug"):
        assert required in occurrences, (
            f"nav-missing-discovery should flag missing {required!r}; "
            f"got occurrences {occurrences}"
        )
    expect(
        {"frontmatter-missing-required"},
        d["findings"],
        "broken-nav-missing-discovery: nav essay missing public/type/slug fails",
    )

    # 4c. target_repo allowlist (repo bifurcation). A valid enum value passes
    #     clean; an out-of-enum value fires frontmatter-invalid-enum. The field
    #     is optional, so its absence is never itself a finding (covered by the
    #     other fixtures, none of which carry target_repo).
    d, rc = run(str(FIXTURES / "valid-target-repo.md"))
    assert rc == 0 and not d["findings"], f"valid target_repo failed: {d}"
    print("  OK: valid target_repo → 0 findings, exit 0")

    d, rc = run(str(FIXTURES / "broken-invalid-target-repo.md"))
    assert rc == 1, f"expected exit 1 for invalid target_repo, got {rc}"
    occurrences = {f["occurrence"] for f in d["findings"]}
    assert any(o.startswith("target_repo:") for o in occurrences), (
        f"invalid target_repo should flag the field; got {occurrences}"
    )
    expect(
        {"frontmatter-invalid-enum"},
        d["findings"],
        "broken-invalid-target-repo: out-of-enum value fails",
    )

    # 5. Real writings/ directory must be clean (this enforces that we never
    #    ship the validator with existing breakage)
    d, rc = run("writings/")
    assert rc == 0, (
        f"writings/ failed validation with {len(d['findings'])} finding(s): "
        f"{[(f['location']['path'], f['rule_id']) for f in d['findings']]}"
    )
    print(f"  OK: writings/ clean ({d['scanned']} files)")

    print("\nAll validator smoke tests passed.")


if __name__ == "__main__":
    main()
