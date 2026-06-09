---
uri: klappy://canon/principles/ritual-is-a-smell
title: "Ritual Is a Smell"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: semi_stable
tags: ["ritual", "design-smell", "automation", "stateless", "continuity", "ergonomics"]
target_repo: "outcomes-driven-development"
---

# Ritual Is a Smell

If correctness depends on people repeatedly remembering a procedure, the system is compensating for missing design.

Ritual is not "bad." Ritual-as-compensating-control is a smell.

## Foundational assumption

This principle rests on:

- `klappy://canon/constraints/humans-are-variable-inputs`

If humans are variable, then "just do the ritual" is not a strategy. It is debt.

## What counts as a ritual smell

A ritual smell exists when:

- a repeated checklist exists mainly to prevent avoidable system failure
- the system becomes unsafe when the ritual is skipped
- the ritual exists because state is hidden, fragile, or hard to restore
- the ritual's purpose is "make it work again" rather than "deliberate review"

Examples:

- "Always run preflight before anything" because the system can't detect prerequisites
- "Remember to resync baseline" because sync isn't observable or enforced
- "Don't forget to export receipts" because evidence isn't captured by default

## What does NOT count as a ritual smell

Some repeated human actions are intentional guardrails:

- high-risk approvals and signoffs
- deliberate review/attestation steps where human judgment is the point
- governance gates where accountability must be explicit

Those are not smells *if the system is still robust when skipped* (it should fail closed, not fail weird).

## Required response when a ritual smell is detected

When a ritual smell exists, the system must do one of:

- automate the ritual
- inline the ritual into the moment it matters (make it unavoidable)
- make the ritual unnecessary by reducing hidden state
- detect non-compliance and fail closed with a clear recovery path

## Design target

A stateless or low-state system should automate continuity.

It should not delegate continuity to memory.
