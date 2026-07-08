#!/usr/bin/env python3
"""Regression tests for validate-preflight-declaration.py."""
import importlib.util
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
SCRIPT = REPO / "scripts" / "validate-preflight-declaration.py"


def load_validator():
    spec = importlib.util.spec_from_file_location("validate_preflight_declaration", SCRIPT)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def rules(findings: list[dict]) -> set[str]:
    return {finding["rule_id"] for finding in findings}


def main() -> None:
    validator = load_validator()

    with tempfile.TemporaryDirectory() as tmp:
        tmpdir = Path(tmp)

        frontmatter_only = tmpdir / "frontmatter-only.md"
        frontmatter_only.write_text(
            """---
clock: observed
tier: 3
tags: ["canon", "tools", "boarded"]
---

<!-- flight-artifact -->

# Flight artifact without declaration

Result: cleared for takeoff.
""",
            encoding="utf-8",
        )
        got = rules(validator.check_file(str(frontmatter_only)))
        assert "missing-preflight-items" in got, (
            "frontmatter terms must not satisfy preflight declaration items; "
            f"got {got}"
        )
        print("  OK: frontmatter terms do not satisfy declaration items")

        unreadable_target = tmpdir / "unreadable.md"
        unreadable_target.mkdir()
        got = rules(validator.check_file(str(unreadable_target)))
        assert "unreadable" in got, f"OSError should produce unreadable finding; got {got}"
        print("  OK: OSError produces unreadable finding")

    print("\nAll preflight declaration regression tests passed.")


if __name__ == "__main__":
    main()
