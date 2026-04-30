---
uri: klappy://odd/encoding-types/open
title: "Encoding Type: Open (O, forward-pointing)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "open", "open-items", "priority-bands", "forward-pointing", "encoding-type", "tsv", "governance", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/architecture/encode-architecture-problem-and-gaps.md, odd/ledger/2026-04-19-agent-team-pilot.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/observation.md, odd/encoding-types/handoff.md, odd/encoding-types/decision.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type O, facet=open"
status: active
---

# Encoding Type: Open (O, forward-pointing)

> An unresolved thread the current owner is still holding. Shares letter `O` with Observation; section placement and the `-open` subtype tag disambiguate. Open items carry priority bands (P1, P2, P3…) so the list is scannable. An Open closes by transitioning to a Decision when resolved, a Handoff when transferred, or a closed Observation when it completes as historical fact.

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
| Priority | High — Opens that aren't tracked become silent dropped work |

---

## Field Schema

When encoding an Open, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
O	{facet}	{priority}	{title}	{body}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `O` |
| facet | yes | Always `open` (distinguishes from closed Observation, which has no facet or `facet: closed`) |
| priority | yes | Band identifier — `P1`, `P2`, `P3`, …, with optional sub-band like `P1.1` |
| title | yes | Short summary of the unresolved thread (≤12 words) |
| body | yes | What remains to be done, decided, or answered, and what would close it |

Example:

```
O	open	P1	Encode parser still hardcodes 4 types	Parser detectEncodeType() recognizes only decision/insight/boundary/override via regex; DOLCHE governance defines six dimensions plus extension. Closes when parser reads vocabulary from canon at runtime per Alternative D.
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Open:

```
open item, still need to, haven't decided, unresolved, pending, awaiting, todo, followup, next up, P1, P2, P3, O-open, parked, holding, in flight
```

Classification preference: a paragraph inside a section whose header matches `/open items?/i` or `/forward[- ]pointing/i` is classified as Open regardless of trigger words. A paragraph prefixed `[O-open]` is classified as Open. A paragraph prefixed `[O]` outside an Open items section is classified as closed Observation.

These words are used by the server to build dynamic regex for fallback classification only. On the primary TSV path, the type letter `O` plus `facet=open` is the classifier.

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 5):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words | "Open is too brief — describe what remains and what would close it" |
| Priority assigned | Priority column is non-empty and matches `P\d+(\.\d+)*` | "Assign a priority band — P1 (must close), P2 (should close), P3 (parked)" |
| Closure path | Body names what would close this — a Decision, a Handoff, an Observation, or a specific event | "How does this close? Decision, handoff, or completion event?" |
| Specificity | Title is concrete, not a topic label | "Sharpen the title — what specifically remains unresolved?" |
| Owner clarity | Body or context makes clear who is currently holding the thread (or that ownership itself is unresolved) | "Who is holding this? If nobody, it should be a Handoff" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 5 | strong | recorded |
| 3–4 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## What Makes a Good Open Encoding

A strong Open encoding answers four questions: What is unresolved? What would close it? Who is holding it? How urgent is it? The most common gap is missing closure path — Opens that don't say what would close them tend to drift indefinitely. The second most common gap is vague titles that read like topics rather than threads ("caching" instead of "decide whether governance regex is module-cached or per-request").

Opens are the artifact type most likely to be silently dropped. Recording them aggressively is the discipline. Closing them honestly — via transition to D, H, or closed-O — is the follow-through.

---

## See Also

- [DOLCHEO Vocabulary](klappy://canon/definitions/dolcheo-vocabulary) — the seven-dimension framework this type belongs to
- [How to Write an Encoding Type](klappy://odd/encoding-types/how-to-write-encoding-types) — the meta-governance this doc follows
- [Encoding Type: Handoff](klappy://odd/encoding-types/handoff) — the companion forward-looking type (transfers ownership)
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
