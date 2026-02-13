---
uri: klappy://docs/oddkit/epistemic-instructions
title: "oddkit Epistemic Instructions"
audience: docs
stability: stable
---

# oddkit Epistemic Instructions

oddkit is a compliance surface, not an epistemic engine.

## MUST

oddkit MUST:

- obey the Epistemic Contract (`odd/contract/epistemic-contract.md`, URI: `odd://contract/epistemic-contract`)
- derive behavior from documented artifacts
- surface which rule authorized a move
- refuse to act when prerequisites are unmet

## MUST NOT

oddkit MUST NOT:

- encode implicit epistemic logic
- substitute agent confidence for judgment
- silently diverge from canon posture

## Relationship to Surfaces

oddkit is one of several epistemic surfaces. Others include:

- klappy.dev (human-facing)
- future tools (editors, bots, assistants)

All surfaces obey the same epistemic contract. They MAY express judgment differently. They MUST NOT reach different judgments given the same epistemic state.

## Invariance

If oddkit and klappy.dev reach different epistemic conclusions given identical state, that indicates drift.

Drift must be surfaced, not hidden.
