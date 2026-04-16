---
uri: klappy://odd/encoding-types/handoff
title: "Encoding Type: Handoff (H)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "handoff", "encoding-type"]
epoch: E0008
date: 2026-04-15
derives_from: "docs/oddkit/proactive/dolche-vocabulary.md"
governs: "oddkit_encode parsing and quality scoring for type H"
status: active
---

# Encoding Type: Handoff (H)

> What comes next and what context the next session needs.

---

## Summary — The Continuity Layer

Handoffs transfer state across session boundaries. A session without handoffs forces the next session to reconstruct context from scratch.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | H |
| Name | Handoff |

---

## Field Schema

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `H` |
| title | yes | Short summary of what comes next |
| body | yes | What needs to happen and what context is needed |

---

## Trigger Words (Fallback Classification)

```
next session, next step, todo, follow up, blocked by, waiting on, continue, remaining, handoff
```
