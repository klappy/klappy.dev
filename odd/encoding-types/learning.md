---
uri: klappy://odd/encoding-types/learning
title: "Encoding Type: Learning (L)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "learning", "encoding-type", "tsv", "governance", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/architecture/encode-architecture-problem-and-gaps.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type L"
status: active
---


# Encoding Type: Learning (L)

> What was understood from the observations. Interpretation with evidence. Learnings connect observations to meaning — the bridge between "what did we see?" and "what does it mean?" A learning without an observation is speculation. A learning with an observation is knowledge.

---

## Summary — The Interpretation Layer

Learnings are where observations become understanding. They require evidence — the observation that prompted the interpretation. Without that link, a learning is just an assertion dressed up as insight.

The key discipline: learnings explain why, not just what. "The deploy took 47 seconds" is an observation. "Cold starts dominate deploy time because the first fetch always misses cache" is a learning — it names the mechanism and connects to evidence.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | L |
| Name | Learning |
| Priority | Medium — learnings inform future decisions but don't constrain them directly |

---

## Field Schema

When encoding a Learning, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
L	{title}	{body}	{evidence}	{applicability}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `L` |
| title | yes | Short summary of what was learned (≤12 words) |
| body | yes | The learning — what was understood and why it matters |
| evidence | no | The observation(s) that support this learning. References to O-typed entries or direct evidence |
| applicability | no | "local" (this project only), "general" (applies broadly), or "provisional" (needs more evidence) |

Example:

```
L	Platform-agnostic identification requires URL-level mechanisms	Headers are implementation details that vary by platform. URLs are universal. The consumer query param works everywhere because every MCP platform lets users edit URLs.	O: Labeled consumers only got credit for MCP initialize events — headers weren't forwarded on tool calls	general
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Learning:

```
learned, realized, discovered, understood, found that, turns out, the reason is, this means, implies, suggests, the pattern is, insight, takeaway, the mechanism is, because
```

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 4):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words | "Learning is too brief — expand what was understood" |
| Evidence | Evidence column is non-empty | "What observation supports this? A learning without evidence is speculation" |
| Mechanism | Body explains why or how, not just what | "Add the mechanism — why does this happen, not just that it does" |
| Applicability | Applicability column is non-empty | "Is this local to this project, generally applicable, or provisional?" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 4 | strong | recorded |
| 3 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## What Makes a Good Learning Encoding

A strong Learning answers: what was understood, what evidence supports it, why it happens (the mechanism), and how broadly it applies. The most common gap is missing evidence — models often encode interpretations without citing the observations that prompted them. The second most common gap is asserting a pattern without explaining the mechanism.

---

## See Also

- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework this type belongs to
- [Encoding Type: Observation](klappy://odd/encoding-types/observation) — the companion type that provides evidence for learnings
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
