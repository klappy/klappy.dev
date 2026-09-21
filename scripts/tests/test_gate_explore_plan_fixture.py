#!/usr/bin/env python3
"""Fixture for oddkit_gate exploration-to-planning presence-prereqs.

Mirrors workers/src/bm25.ts tokenize/stem and workers/src/orchestrate.ts
table parse + stemmed set-intersection (oddkit 0.30.1). Data-only: no
Worker AND. Kitchen ticket 2026-09-20-gate-explore-plan-prior-art Dish A.

Run from repo root:
    python3 scripts/tests/test_gate_explore_plan_fixture.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
TRANSITIONS = REPO / "odd" / "gate" / "transitions.md"
PREREQS = REPO / "odd" / "gate" / "prerequisites.md"

STOP = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "shall",
    "should", "may", "might", "must", "can", "could", "of", "in", "to",
    "for", "with", "on", "at", "by", "from", "as", "into", "through",
    "and", "but", "or", "nor", "not", "no", "so", "if", "then", "than",
    "that", "this", "it", "its", "we", "you", "he", "she", "they",
}

NEW_IDS = (
    "world_prior_cited",
    "house_install_cited",
    "house_canon_cited",
)


def stem(word: str) -> str:
    if len(word) < 4:
        return word
    word = re.sub(r"ies$", "y", word)
    word = re.sub(r"ied$", "y", word)
    word = re.sub(r"([^aeiou])ed$", r"\1", word)
    word = re.sub(r"(ing|tion|ment|ness|able|ible)$", "", word)
    word = re.sub(r"s$", "", word)
    return word


def tokenize(text: str) -> list[str]:
    cleaned = re.sub(r"[^\w\s-]", " ", text.lower())
    parts = re.split(r"[\s\-_/]+", cleaned)
    return [stem(t) for t in parts if len(t) > 1 and t not in STOP]


def parse_table(md: str, heading: str) -> list[list[str]]:
    marker = f"## {heading}"
    start = md.find(marker)
    if start < 0:
        raise SystemExit(f"missing heading {heading!r}")
    chunk = md[start:]
    end = chunk.find("\n## ", 3)
    if end > 0:
        chunk = chunk[:end]
    rows = []
    for line in chunk.splitlines():
        if "|" not in line or re.match(r"^\s*\|[-|\s]+\|\s*$", line):
            continue
        if "Prerequisite" in line and "Check" in line:
            continue
        if "Transition Key" in line:
            continue
        parts = [c.strip() for c in line.strip().strip("|").split("|")]
        rows.append(parts)
    return rows


def prereq_map(md: str) -> dict[str, set[str]]:
    out = {}
    for cols in parse_table(md, "Prerequisite Overlays"):
        if len(cols) < 2:
            continue
        out[cols[0]] = set(tokenize(cols[1]))
    return out


def exploration_prereq_ids(md: str) -> list[str]:
    for cols in parse_table(md, "Transitions"):
        key = cols[0].replace("`", "").strip()
        if key == "exploration-to-planning" and len(cols) >= 4:
            return [p.strip() for p in cols[3].split(",") if p.strip()]
    raise SystemExit("exploration-to-planning row missing")


def evaluate(input_text: str, ids: list[str], vocab: dict[str, set[str]]) -> tuple[list[str], list[str]]:
    stems = set(tokenize(input_text))
    met, unmet = [], []
    for pid in ids:
        check = vocab[pid]
        if any(s in stems for s in check):
            met.append(pid)
        else:
            unmet.append(pid)
    return met, unmet


NOT_READY = "ready to plan. the problem is a thin gate. constraints reviewed."
READY = (
    "ready to plan. the problem is a thin gate. constraints reviewed. "
    "no world prior. no house install. no house canon."
)
CF_VODKA = (
    "ready to plan. the problem is a thin gate. constraints reviewed. "
    "no world prior. no house install. we use CF and vodka"
)
CITE_LEAK = (
    "ready to plan. the problem is a thin gate. constraints reviewed. "
    "world prior cited. house install cited."
)


def main() -> None:
    trans = TRANSITIONS.read_text()
    prereqs = PREREQS.read_text()
    vocab = prereq_map(prereqs)
    ids = exploration_prereq_ids(trans)

    failed = 0

    def ok(label: str, cond: bool, hint: str = "") -> None:
        nonlocal failed
        if cond:
            print(f"  OK: {label}")
        else:
            print(f"  FAIL: {label}{(' — ' + hint) if hint else ''}")
            failed += 1

    ok(
        "exploration-to-planning lists the three new ids after problem+constraints",
        ids[:2] == ["problem_defined", "constraints_reviewed"]
        and ids[2:5] == list(NEW_IDS),
        f"got {ids}",
    )
    for pid in NEW_IDS:
        ok(f"prerequisites.md defines {pid}", pid in vocab)

    met, unmet = evaluate(NOT_READY, ids, vocab)
    ok(
        "ready-to-plan + problem + constraints only → NOT_READY naming new ids",
        set(NEW_IDS) <= set(unmet) and "problem_defined" in met and "constraints_reviewed" in met,
        f"met={met} unmet={unmet}",
    )

    met, unmet = evaluate(READY, ids, vocab)
    ok(
        "three official nulls → all exploration-to-planning prereqs met",
        unmet == [] and set(ids) <= set(met),
        f"met={met} unmet={unmet}",
    )

    met, unmet = evaluate(CF_VODKA, ids, vocab)
    ok(
        "we use CF and vodka → house_canon_cited fails (other new ids may pass)",
        "house_canon_cited" in unmet
        and "world_prior_cited" in met
        and "house_install_cited" in met,
        f"met={met} unmet={unmet}",
    )

    met, unmet = evaluate(CITE_LEAK, ids, vocab)
    ok(
        "cite verbs for the other two bands do not leak house_canon_cited",
        "house_canon_cited" in unmet
        and "world_prior_cited" in met
        and "house_install_cited" in met,
        f"met={met} unmet={unmet}",
    )
    ok(
        "house_canon_cited check stems omit cited (hyphen-split leak)",
        "cit" not in vocab["house_canon_cited"]
        and "cited" not in vocab["house_canon_cited"],
        f"stems={sorted(vocab['house_canon_cited'])}",
    )

    if failed:
        print(f"\n{failed} fixture(s) failed")
        sys.exit(1)
    print("\nall fixtures passed")


if __name__ == "__main__":
    main()
