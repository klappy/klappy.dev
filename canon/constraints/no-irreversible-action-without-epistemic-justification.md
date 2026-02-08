---
uri: klappy://canon/constraints/no-irreversible-action-without-epistemic-justification
title: "No Irreversible Action Without Epistemic Justification"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["canon", "constraints", "irreversibility", "epistemic-safety", "commitment", "enforcement"]
relevance: decision
execution_posture: governing
---

# No Irreversible Action Without Epistemic Justification

> Defer irreversibility until epistemic thresholds are met.

---

## Constraint

No action that resists reversal may be taken without documented epistemic justification.

Irreversible actions include, but are not limited to:

- Merging code into production branches
- Mutating canon
- Publishing or socializing decisions
- Aligning teams around a direction
- Deploying to production
- Encoding a claim as settled

Each of these narrows future options. None may proceed on momentum, consensus, or urgency alone.

---

## What Qualifies as Epistemic Justification

The justification must demonstrate that the commitment is warranted — not merely that work was done. Specifically:

1. The relevant exploration has been conducted, not skipped.
2. The decision or artifact meets the Definition of Done.
3. The epistemic mode transition (exploration → execution) was intentional, not accidental.

If justification cannot be provided, the action remains in exploration or planning. It does not advance.

---

## What This Constraint Prevents

- Premature convergence disguised as decisiveness
- Social momentum overriding epistemic readiness
- Urgency collapsing uncertainty into permanent commitments
- Agents or automation encoding unjustified state changes

---

## Enforcement

This constraint is enforced through existing mechanisms:

- **Definition of Done** (`canon/constraints/definition-of-done.md`) — Gates completion claims.
- **Boundary Transitions Require Deceleration** (`canon/constraints/boundary-transitions-require-deceleration.md`) — Requires intentional slowdown at mode boundaries.
- **Models Do Not Mutate Canon** (`canon/decisions/models-do-not-mutate-canon.md`) — Prevents agents from making irreversible changes to governing documents.
- **Encode Epistemic Decisions** (`canon/constraints/encode-epistemic-decisions.md`) — Ensures decisions that survive become durable and inspectable.
