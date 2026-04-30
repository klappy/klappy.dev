---
uri: klappy://odd/encoding-types/observation
title: "Encoding Type: Observation (O)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "observation", "encoding-type", "tsv", "governance", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/architecture/encode-architecture-problem-and-gaps.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type O"
fallback: true
status: active
---


# Encoding Type: Observation (O)

> What was seen or noticed. Raw facts without interpretation. Observations are the evidence layer — they describe reality as encountered, not reality as theorized. An observation that nobody recorded is an observation that never happened for the system's purposes.

---

## Summary — The Evidence Layer

Observations are the foundation that all other DOLCHE types build on. Learnings interpret observations. Decisions respond to them. Constraints emerge from them. Without recorded observations, the rest is speculation.

The key discipline: observations describe what happened, not what it means. "The deploy took 47 seconds" is an observation. "The deploy is too slow" is a learning. Keeping these separate matters because the same observation can support different interpretations. Recording the raw fact preserves optionality.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | O |
| Name | Observation |
| Priority | High — observations are the evidence that grounds all other types |

---

## Field Schema

When encoding an Observation, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
O	{title}	{body}	{source}	{verifiability}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `O` |
| title | yes | Short summary of what was observed (≤12 words) |
| body | yes | The observation — what was seen, measured, or encountered |
| source | no | Where or how this was observed: direct measurement, log output, user report, conversation, etc. |
| verifiability | no | "verified", "reported", "inferred", or empty. Distinguishes firsthand evidence from secondhand |

Example:

```
O	Deno user-agent was 39% of oddkit traffic	Deno/2.1.4 accounted for 2,631 of 6,753 total tool calls in the telemetry data. Access pattern was entirely Apocrypha-focused.	telemetry_public SQL query	verified
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Observation:

```
observed, noticed, saw, measured, detected, appeared, showed, the data shows, the log shows, the output was, encountered, surfaced, evidence, metric
```

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 4):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words | "Observation is too brief — expand what was seen" |
| Specificity | Body contains a number, name, or concrete detail | "Add specifics — numbers, names, or concrete details strengthen observations" |
| Source | Source column is non-empty | "Where was this observed? Add the source" |
| Separation | Body does not contain interpretation words (should, better, worse, means, implies) | "This reads like interpretation, not observation — separate what was seen from what it means" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 4 | strong | recorded |
| 3 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## What Makes a Good Observation Encoding

A strong Observation answers: what was seen, where it was seen, and whether it's firsthand. It resists the urge to interpret — that's what Learnings are for. The most common gap is mixing observation with interpretation in the same entry. "The API returned a 403" is an observation. "The API is broken" is a learning. Recording both is fine — as separate typed entries.

---

## See Also

- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework this type belongs to
- [Encoding Type: Learning](klappy://odd/encoding-types/learning) — the companion type that interprets observations
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
