---
uri: klappy://odd/encoding-types/handoff
title: "Encoding Type: Handoff (H)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "handoff", "encoding-type", "tsv", "governance", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/architecture/encode-architecture-problem-and-gaps.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/open.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type H"
status: active
---


# Encoding Type: Handoff (H)

> What comes next and what context the next session needs. Explicit transfer of state across conversation boundaries. Handoffs are the artifacts most likely to be lost because they describe what hasn't happened yet. A session without handoffs forces the next session to reconstruct context from scratch.

---

## Summary — The Continuity Layer

Handoffs are how work survives across session boundaries. Every conversation ends. The question is whether the next one starts from zero or starts from where this one left off. Handoffs answer that question by explicitly naming: what's next, what's blocked, what context is needed, and who owns it.

The key discipline: handoffs describe the future, not the past. "We decided to use TSV" is a decision. "Next session: write the remaining four encoding-type governance docs" is a handoff — it transfers intent across a boundary.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | H |
| Name | Handoff |
| Priority | High — handoffs are the most frequently lost artifact type |

---

## Field Schema

When encoding a Handoff, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
H	{title}	{body}	{blocked_by}	{owner}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `H` |
| title | yes | Short summary of what comes next (≤12 words) |
| body | yes | What needs to happen and what context is needed to do it |
| blocked_by | no | What must happen before this can proceed. Empty if unblocked |
| owner | no | Who owns this next action — a person, role, or "next session" |

Example:

```
H	Write O, L, C, H encoding-type governance docs	Create the remaining four default encoding-type governance docs following the Decision template. Each needs type identity, TSV schema, trigger words, and quality criteria.		next session
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Handoff:

```
next session, next step, todo, to do, follow up, blocked by, waiting on, needs to happen, pick up, continue, remaining, outstanding, handoff, hand off, carry forward, defer
```

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 4):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words | "Handoff is too brief — what context does the next session need?" |
| Actionability | Body describes a concrete next action, not just a topic | "Make it actionable — what specifically needs to happen next?" |
| Blocker clarity | Blocked_by column is non-empty OR body explicitly states unblocked | "Is this blocked by anything? State blockers or confirm unblocked" |
| Ownership | Owner column is non-empty | "Who owns this? A person, role, or 'next session'" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 4 | strong | recorded |
| 3 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## What Makes a Good Handoff Encoding

A strong Handoff answers: what needs to happen, what context is needed to do it, what's blocking it, and who owns it. The most common gap is handoffs that name a topic without naming an action — "encoding architecture" is a topic, "implement TSV parsing in the encode handler" is an action.

The second most common gap is missing blockers. A handoff without blocker information forces the next session to rediscover dependencies. Even "unblocked" is valuable — it confirms the work can start immediately.

---

## See Also

- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework this type belongs to
- [Proactive Session Close](klappy://docs/oddkit/proactive/proactive-session-close) — handoffs are central to session closing
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
