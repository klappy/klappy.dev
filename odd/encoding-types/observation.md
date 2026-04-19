---
uri: klappy://odd/encoding-types/observation
title: "Encoding Type: Observation (O)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "observation", "encoding-type"]
epoch: E0008
date: 2026-04-15
derives_from: "docs/oddkit/proactive/dolche-vocabulary.md"
governs: "oddkit_encode parsing and quality scoring for type O"
status: active
fallback: true
---

# Encoding Type: Observation (O)

> What was seen or noticed. Raw facts without interpretation.

---

## Summary — The Evidence Layer

Observations describe reality as encountered, not reality as theorized. They are the foundation that Learnings, Decisions, and Constraints build on.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | O |
| Name | Observation |

---

## Field Schema

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `O` |
| title | yes | Short summary of what was observed |
| body | yes | What was seen, measured, or encountered |

---

## Trigger Words (Fallback Classification)

```
observed, noticed, saw, measured, detected, appeared, showed
```

---

## See Also — Open Is the Forward-Pointing Sibling

Observation (closed) and Open (forward-pointing) share letter `O` and are distinguished by section placement and an optional `facet` field. A paragraph inside a section headed `## Open items` is an Open; elsewhere, `[O]` is a closed Observation. For the forward-pointing variant, see `odd/encoding-types/open.md`. For the umbrella vocabulary that defines both, see `canon/definitions/dolcheo-vocabulary.md`.

