---
uri: klappy://canon/meta/epistemic-architecture
title: "Epistemic Architecture"
audience: canon
stability: long_lived
derived_from:
  - klappy://docs/appendices/epochs
  - odd://contract/epistemic-contract
exposure: nav
tier: 2
---

# Epistemic Architecture

This document describes how epistemic judgment is shared across tools without collapsing them into a single implementation.

## Separation of Concerns

ODD distinguishes between:

- **Epistemic judgment** — deciding how to respond to the state of understanding
- **Surface embodiment** — deciding how that response is expressed

Judgment is invariant.
Embodiment is contextual.

Epistemic judgment is expressed through documented rules and decision boundaries, not through a centralized runtime or service.

## The Shared Epistemic Spine

All ODD-compliant systems operate over the same epistemic spine:

- Epistemic Contract (ODD-level)
- Canon Defaults (instance-level)

These define when to confirm clarity, interrupt, refuse, externalize, or proceed.

No surface may redefine these rules implicitly.

## Surfaces

Examples of epistemic surfaces include:

- klappy.dev (human-facing)
- oddkit (agent-facing)
- future tools (editors, bots, assistants)

Each surface:
- obeys the same epistemic contract
- renders posture differently
- does not own epistemic authority

## Invariance Rule

Given the same epistemic state:

- klappy.dev and oddkit MUST reach the same epistemic judgment
- they MAY express that judgment differently

Differences in judgment indicate epistemic drift.
Differences in expression do not.

## Tool Reuse vs Judgment

Surfaces may reuse tools across boundaries (summarization, artifact generation).

Epistemic judgment MUST NOT be delegated to:
- agents
- UI logic
- convenience heuristics

Judgment precedes tooling.

## Why This Matters

This architecture ensures that:
- systems feel alive without being deceptive
- tools adapt without becoming inconsistent
- trust is built through restraint, not cleverness
