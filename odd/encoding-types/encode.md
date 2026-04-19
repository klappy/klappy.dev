---
uri: klappy://odd/encoding-types/encode
title: "Encoding Type: Encode (E)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "encode-type", "meta-level", "encoding-type", "epoch-8.3"]
epoch: E0008.3
date: 2026-04-19
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/oddkit/proactive/dolche-vocabulary.md, docs/oddkit/proactive/encode-does-not-persist.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md"
governs: "oddkit_encode parsing and quality scoring for type E"
status: active
---

# Encoding Type: Encode (E)

> The meta-level action of crystallizing a D, O, L, C, H, or Open into a structured, quality-scored artifact. Encode is a receipt that capture happened, not another category of content.

---

## Summary — The Self-Audit Layer

Encode tracks the crystallization work itself. Every time `oddkit_encode` runs, it takes one or more DOLCHEO artifacts and structures them — producing a quality score, a persistence flag, and suggestions for improvement. Recording the Encode event as its own entry closes the loop between "discussed" and "captured." A ledger with five Decisions and zero Encodes says the decisions were mentioned but never formally processed. A ledger with Encodes but no corresponding saves says crystallization happened and the artifacts were lost in the response stream (see `docs/oddkit/proactive/encode-does-not-persist.md`). Both gaps are visible from the E entries alone.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | E |
| Name | Encode |

---

## Field Schema

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `E` |
| title | yes | Short summary of what was crystallized |
| body | yes | What was encoded, the quality level returned, whether persistence was required, and what was done with the output |

---

## Trigger Words (Fallback Classification)

```
encoded, crystallized, captured via encode, persisted, wrote to ledger, journaled, saved encode output, ran oddkit_encode
```
