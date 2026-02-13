---
uri: klappy://docs/oddkit/modes
title: "Epistemic Mode Guidance for oddkit"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
epoch: E0005
tags: ["oddkit", "agents", "epistemic-modes"]
---

# Epistemic Mode Guidance for oddkit

> oddkit respects epistemic modes defined in Canon and must not collapse them.

## Canon Reference

This document depends on:

- **Canon: Epistemic Modes** — `canon/definitions/epistemic-modes.md`
- **Canon: Axioms** — `canon/values/axioms.md` (values-first grounding for mode behavior)

If Canon changes, this document must adapt.

---

## Default Mode Behavior

| Mode        | oddkit Behavior                                        |
| ----------- | ------------------------------------------------------ |
| Exploration | Ask questions, surface tensions, record insights       |
| Planning    | Clarify assumptions, outline intent, avoid claims      |
| Execution   | Require artifacts, validate outcomes, enforce evidence |

oddkit MUST explain when it refuses an action due to mode mismatch.

---

## Detection (Heuristic)

oddkit MAY infer mode from:

- user language ("what if", "let's plan", "I finished")
- presence or absence of artifacts
- explicit user declaration

Inference is always weaker than explicit declaration.

---

## Mode Refusal Examples

Valid refusals:

- "This appears to be exploratory. I can't validate completion yet."
- "You're asking for execution validation, but no artifacts were provided."
- "This introduces new alternatives during execution. Do you want to return to planning?"

Refusals MUST cite the epistemic reason, not a tool limitation.

---

## Interaction with Other oddkit Capabilities

- **Search / Get / Catalog** (`oddkit_search`, `oddkit_get`, `oddkit_catalog`) respects mode by:
  - preferring governing docs in Planning
  - allowing broader sources in Exploration

- **Validate** (`oddkit_validate`) triggers only in Execution

- ~~**Promotions**~~ — Historical concept from the lane era; not present in the current oddkit action set.

---

## Final Note

oddkit does not decide when to act.
It enforces clarity about **what kind of thinking is happening**.
