---
uri: klappy://canon/principles/scope-over-folders
title: "Scope Over Folders"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: draft
tags: ["epistemic-scope", "portability", "ritual-smell", "oddkit"]
target_repo: "outcomes-driven-development"
---

# Scope Over Folders

Epistemic scope is an attribute of a claim, not a property of its storage location.

Where a statement is stored (filesystem path, repo, branch) is an implementation detail. Meaning, applicability, and lifecycle must be explicitly declared and mechanically enforceable.

## Foundational assumptions

This principle rests on:

- `klappy://canon/constraints/humans-are-variable-inputs`
- `klappy://canon/principles/ritual-is-a-smell`

This principle extends those foundations by identifying path-based meaning as a primary source of ritual and drift.

## What counts as scope-over-folders

Scope-over-folders is present when:

- scope is declared as metadata on each claim (e.g., `global`, `product:<id>`, `experiment:<id>`)
- scope is queryable, filterable, and portable across repo topologies
- "lanes" exist as views or filters surfaced by tooling, not ontological truth
- promotion changes scope/status metadata, not file location

## What does NOT count as scope-over-folders

Scope-over-folders is violated when:

- scope is inferred from folder depth or naming conventions
- directories are treated as semantic containers of truth
- branch names or paths imply lifecycle state
- files are moved to indicate promotion, ratification, or survivability

## Required response when violated

When scope is inferred from location:

1. Treat the system state as epistemically invalid
2. Record a drift signal
3. Refactor to explicit scope metadata
4. Add tooling guardrails to prevent recurrence

## Design target

A system satisfies this principle when:

- oddkit can reconstruct scope and relevance without reading filesystem topology
- the same repository can be reorganized without semantic drift

## Relationship

This principle builds on:

- `klappy://canon/constraints/humans-are-variable-inputs`
- `klappy://canon/principles/ritual-is-a-smell`

and is enforced by the constraint:

- `klappy://canon/constraints/meaning-must-not-depend-on-path`

## One-liner

If meaning depends on where a line is stored, you've encoded ritual, not truth.
