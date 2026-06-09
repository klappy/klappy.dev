---
uri: klappy://canon/constraints/humans-are-variable-inputs
title: "Humans Are Variable Inputs"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["humans", "variability", "constraints", "ergonomics", "epistemic-discipline"]
target_repo: "outcomes-driven-development"
---

# Humans Are Variable Inputs

Humans are not reliable, repeatable components.

This constraint exists to prevent designs that only work when people behave consistently, remember steps, or compensate for missing system affordances.

## What this forbids

A design is invalid if it assumes:

- users will remember a repeated sequence of steps to keep the system safe
- users will notice drift and correct it manually
- users will reinitialize context "the right way" after interruptions
- users will consistently interpret ambiguous instructions the same way
- success depends on "training people better" rather than changing the system

## What this requires

Systems MUST be designed to remain safe and correct under:

- partial compliance
- missed steps
- interruptions and resumptions
- variable attention and skill
- inconsistent interpretation

## Operational test

If failure analysis includes:

> "They forgot to…", "They didn't realize…", "They should have…", "They skipped…"

…then the system violated this constraint.

## Design consequences

When this constraint bites, the system response is not more reminders.

It is one (or more) of:

- remove the step
- automate the step
- make the step unavoidable at the moment it matters
- detect the omission and recover safely
- reduce the number of states a user must keep in their head

## Relationship

This constraint is a foundation for principles like:

- `klappy://canon/principles/ritual-is-a-smell`
