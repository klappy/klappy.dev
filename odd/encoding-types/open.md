---
uri: klappy://odd/encoding-types/open
title: "Encoding Type: Open (O, forward-pointing)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "open", "open-items", "priority-bands", "forward-pointing", "encoding-type", "epoch-8.3"]
epoch: E0008.3
date: 2026-04-19
derives_from: "canon/definitions/dolcheo-vocabulary.md, odd/ledger/2026-04-19-agent-team-pilot.md"
complements: "odd/encoding-types/observation.md, odd/encoding-types/handoff.md, odd/encoding-types/decision.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md"
governs: "oddkit_encode parsing and quality scoring for type O, facet=open"
status: active
---

# Encoding Type: Open (O, forward-pointing)

> An unresolved thread the current owner is still holding. Shares letter `O` with Observation; section placement and the `-open` subtype tag disambiguate. Open items carry priority bands (P1, P2, P3…) so the list is scannable.

---

## Summary — What Is Still Alive, Not What Is Done

Open items are the forward-pointing half of the letter `O`. Closed Observations describe reality as encountered; Opens describe what has not yet been resolved. The distinction matters because DOLCHE could not separate "I saw this" from "I am still holding this" without forcing unresolved threads into Handoffs that did not fit. Open makes live work first-class.

An Open becomes closed by transitioning to another artifact: to a Decision when resolved, to a Handoff when transferred to another owner, to a closed Observation when it completes as historical fact. Opens that never close accumulate as parked threads at the lowest priority band. See `canon/definitions/dolcheo-vocabulary.md` for the umbrella vocabulary and the Open-vs-Handoff ownership test.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | O |
| Facet | open |
| Name | Open |

---

## Field Schema

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `O` |
| facet | yes | Always `open` (distinguishes from closed Observation, which has no facet or `facet: closed`) |
| priority | yes | Band identifier — `P1`, `P2`, `P3`, …, with optional sub-band like `P1.1` |
| title | yes | Short summary of the unresolved thread |
| body | yes | What remains to be done, decided, or answered, and what would close it |

---

## Trigger Words (Fallback Classification)

```
open item, still need to, haven't decided, unresolved, pending, awaiting, todo, followup, next up, P1, P2, P3, O-open
```

Classification preference: a paragraph inside a section whose header matches `/open items?/i` or `/forward[- ]pointing/i` is classified as Open regardless of trigger words. A paragraph prefixed `[O-open]` is classified as Open. A paragraph prefixed `[O]` outside an Open items section is classified as closed Observation.
