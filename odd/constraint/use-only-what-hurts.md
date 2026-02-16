---
uri: klappy://odd/constraint/use-only-what-hurts
title: "Use Only What Hurts"
audience: system
exposure: constraint
tier: 1
voice: direct
stability: constrained
context:
  include: always
  priority: highest
tags: ["odd", "constraint", "tension-wire", "non-framework"]
relevance: decision
execution_posture: governing
---

# Use Only What Hurts

This document is not an introduction.

It is a system-level constraint.

It exists to prevent ODD from becoming heavy, coercive, or self-justifying as it grows.

If there is ever a conflict between this document and any other part of ODD, this document wins.

---

## Operating Constraints

- MUST only introduce structure, abstraction, or tooling in response to a concrete, experienced pain
- MUST NOT add systems, layers, or rules "just in case" or based on anticipated scale
- MUST treat felt friction as the prerequisite for architectural change
- MUST prefer temporary discomfort over premature optimization
- MUST preserve the ability to delete or reverse structure once pain subsides

---

## Defaults

- If no specific pain can be named, do nothing
- If the pain is tolerable, tolerate it
- If multiple pains exist, address the one causing the most drag first — this is the Theory of Constraints applied to ODD prioritization. Effort applied anywhere other than the current bottleneck produces local optimization that does not improve the system. The bottleneck must be observed, not assumed — consistent with Axiom 4. Relieving a constraint may reveal the next constraint; this is expected, not a failure. If no clear constraint can be identified, observe longer rather than picking something arbitrarily
- When unsure whether to add structure, delay and observe longer
- Prefer manual or ad-hoc solutions until repetition becomes painful

The prioritization chain is: "Use Only What Hurts" governs whether to act. The Theory of Constraints governs where to focus. "Borrow, Bend, Break, Beget, Build" (`canon/methods/borrow-bend-break-beget-build.md`) governs how to approach the work.

---

## Failure Modes

- **Premature Abstraction**: Adding abstraction because it feels "cleaner" rather than because something hurts
- **Anticipated Pain**: Building generalized systems to avoid anticipated future pain
- **Elegance as Justification**: Treating elegance or completeness as sufficient justification for new structure
- **Preference as Constraint**: Encoding preferences or aesthetics as constraints
- **Intellectual vs Operational**: Mistaking intellectual discomfort for operational pain

---

## Verification

- A named pain must be stated explicitly before new structure is introduced
- The pain must be observable in actual workflow, not hypothetical scenarios
- The introduced structure must demonstrably reduce the stated pain
- If no measurable reduction occurs, the structure should be removed
- Verification should be possible by inspecting recent attempts or friction points

---

## What This Constraint Exists To Do

ODD exists for one reason only:

**Agentic coding is fun until it quietly starts wasting your time.**

This constraint exists to ensure that ODD only intervenes when pain proves it is necessary — and nowhere else.

ODD must never require adoption, belief, or full-system buy-in in order to be useful.

Structure is allowed only as a response to experienced friction.

---

## What This Is

ODD is a collection of documented working patterns.

These patterns:

- Reduce specific kinds of friction in agentic coding
- Are derived from real use, not theory
- Are optional, composable, and discardable

Nothing in ODD requires installing software, enabling plugins, or agreeing to a framework.

Patterns may be automated later.
Automation is optional and downstream.

The patterns come first.

---

## What This Is Not

ODD is not:

- A framework to adopt
- A prescribed workflow
- A governance model
- A belief system

ODD does not replace judgment.
ODD does not mandate compliance.

If any part of ODD feels heavy, ceremonial, or joy-killing, it is being misapplied.

---

## How ODD Is Allowed To Grow

ODD may grow only by responding to real, repeated pain.

New structure is justified only when:

- A problem has been experienced in practice
- Lighter constraints have already failed
- The proposed addition demonstrably reduces friction

Completeness is not a goal.
Elegance is not a goal.

Relief is the goal.

---

## Adoption Follows the Same Rule — Use Only What Hurts

This constraint governs how people encounter ODD, not just how ODD grows.

The onboarding model for ODD is not "learn the system then use it." It is: what pain do you feel? Try this one thing. Did it help?

Users never need to learn ODD comprehensively. They reach for the piece that relieves their current pain. If they never need another piece, that is success — not incomplete adoption.

All public-facing entry points — documentation, website, fireside chats, onboarding — should lead with pain identification, not system explanation. The question is always "what hurts?" not "here's what ODD is."

If someone outgrows ODD, that is success. If someone adopts all of ODD, that is not a goal — it is a signal that they had a lot of pain.

---

## The Non-Negotiable Invariant

Regardless of form, tooling, or implementation:

**The work must never lie about reality.**

This means:

- No pretending something worked when it did not
- No hiding failure behind confidence
- No mistaking screenshots or partial outputs for success

Any pattern, practice, or agent behavior that violates this invariant is invalid, regardless of how elegant it appears.

---

## Operational Authority

This document has supremacy over:

- Patterns
- Canon
- Principles
- Terminology
- Agent skills
- Implementations

It must:

- Always be present in agent context
- Be consulted when evaluating additions or changes
- Be used to reject unnecessary structure

This document should change rarely.
Its role is to apply constant tension.

---

## Final Constraint

ODD exists to absorb the cost of experimentation — not to impose it.

If a user outgrows ODD, that is success.

If ODD becomes something that must be followed, it has failed.
