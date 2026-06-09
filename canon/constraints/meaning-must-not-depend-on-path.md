---
uri: klappy://canon/constraints/meaning-must-not-depend-on-path
title: "Meaning Must Not Depend on Path"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["constraint", "epistemic-safety", "portability", "oddkit"]
target_repo: "outcomes-driven-development"
---

# Meaning Must Not Depend on Path

No canonical meaning, scope, or lifecycle state may be inferred from filesystem paths or branch names.

## What this forbids

A design is invalid if it:

- derives scope from folder structure or path patterns
- infers experiment/attempt state from git branch names
- uses file relocation as promotion
- ties survivability to "champion" or merge status

## What this requires

Systems MUST:

- attach explicit scope metadata to all learnings, decisions, and overrides
- own and enforce lifecycle state via tooling, not convention
- express promotion as metadata transitions, not file moves
- preserve learnings regardless of experiment success

## Operational test

If moving a file changes what it means, the system is invalid.

Any system that fails this test must be refactored before extension.

## Design consequences

When this constraint bites, the system response is:

- paths are non-authoritative
- branch names are conveniences, not truth
- oddkit must own state transitions and validate invariants
- views replace directories as the primary navigation surface

## Relationship

This constraint enforces:

- `klappy://canon/principles/scope-over-folders`
- `klappy://canon/principles/ritual-is-a-smell`

and rests on:

- `klappy://canon/constraints/humans-are-variable-inputs`
