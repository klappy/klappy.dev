---
uri: klappy://canon/diagnostics/ritual-detected
title: "Diagnostic: RITUAL_DETECTED"
audience: canon
exposure: nav
tier: 3
voice: system_first_person
stability: evolving
tags: ["diagnostic", "smell", "ritual", "lint"]
target_repo: "outcomes-driven-development"
---

# RITUAL_DETECTED

## Trigger

Raise this diagnostic when correctness depends on repeated human memory of a procedure.

## Why it matters

This is a smell because it violates:

- `klappy://canon/constraints/humans-are-variable-inputs`
- `klappy://canon/principles/ritual-is-a-smell`

## Severity guidance

- warning by default
- escalate to error only when the ritual gates safety, data integrity, or irreversible actions
