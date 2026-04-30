---
uri: klappy://odd/encoding-types/constraint
title: "Encoding Type: Constraint (C)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "constraint", "encoding-type", "tsv", "governance", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/architecture/encode-architecture-problem-and-gaps.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type C"
status: active
---


# Encoding Type: Constraint (C)

> What now governs future work. Rules, boundaries, and non-negotiables that emerged from the session. Constraints bind future behavior — they are the artifacts most likely to prevent future mistakes. A constraint without enforcement is a suggestion.

---

## Summary — The Binding Layer

Constraints are the artifacts that prevent future mistakes by binding future behavior. They emerge from decisions, observations, and learnings — but once established, they outlive the context that created them. A constraint from six months ago still governs today's work even if nobody remembers why.

The key discipline: constraints define what cannot be done, not just what should be done. "Use TSV for encode input" is a decision. "The tool description must never hardcode specific keywords" is a constraint — it binds all future work regardless of context.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | C |
| Name | Constraint |
| Priority | High — constraints bind future behavior and prevent repeated mistakes |

---

## Field Schema

When encoding a Constraint, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
C	{title}	{body}	{origin}	{scope}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `C` |
| title | yes | Short summary of the constraint (≤12 words) |
| body | yes | The constraint statement — what is bound, limited, or prohibited |
| origin | no | What decision, observation, or learning produced this constraint |
| scope | no | "permanent", "until {condition}", "this project", "this epoch", or empty |

Example:

```
C	Server must never hardcode encoding type keywords	The encode tool description and server code must never hardcode specific type keywords because the DOLCHE vocabulary is extensible via governance and hardcoding creates drift between code and canon.	D: Governance-defined TSV contract for encode input	permanent
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Constraint:

```
must, must not, shall, shall not, never, always, required, prohibited, constraint, cannot, non-negotiable, boundary, rule, forbidden, mandatory
```

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 4):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words | "Constraint is too brief — expand what is bound" |
| Clarity | Body contains a clear prohibition or requirement (must/must not/never/always) | "Make the constraint explicit — what must or must not happen?" |
| Origin | Origin column is non-empty | "What produced this constraint? Link to the decision or observation" |
| Scope | Scope column is non-empty | "Is this permanent, temporary, or scoped to a specific context?" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 4 | strong | recorded |
| 3 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## What Makes a Good Constraint Encoding

A strong Constraint answers: what is bound, why it's bound (origin), and how long it's bound (scope). The most common gap is missing scope — constraints without expiration or context become invisible governance debt. "Never do X" is stronger than "don't do X" but "never do X because Y, permanent" is strongest.

The second most common gap is constraints that read like preferences. "We should use TypeScript" is a preference. "All server code must be TypeScript because the CI pipeline only compiles TS" is a constraint — it names the enforcement mechanism.

---

## See Also

- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework this type belongs to
- [Encoding Type: Decision](klappy://odd/encoding-types/decision) — decisions often produce constraints
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
