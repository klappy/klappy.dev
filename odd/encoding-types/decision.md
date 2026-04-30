---
uri: klappy://odd/encoding-types/decision
title: "Encoding Type: Decision (D)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "decision", "encoding-type", "tsv", "governance", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, docs/architecture/encode-architecture-problem-and-gaps.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md, odd/encoding-types/encode.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type D"
status: active
---


# Encoding Type: Decision (D)

> What was chosen. Explicit commitments with rationale. Decisions close options and create direction. They are the highest-stakes artifacts because they constrain all subsequent work. A decision without rationale is a debt. A decision without a constraint test is untested.

---

## Summary — The Highest-Stakes Artifact Type

Decisions are the encoding type most likely to affect future work. A missed observation can be recovered from the transcript. A missed decision may not surface again. Decisions create direction, close options, and bind future behavior. They deserve the most rigorous quality criteria of any encoding type.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | D |
| Name | Decision |
| Priority | Highest — decisions constrain all subsequent work |

---

## Field Schema

When encoding a Decision, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
D	{title}	{body}	{rationale}	{alternatives}	{reversibility}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `D` |
| title | yes | Short summary of the decision (≤12 words) |
| body | yes | The decision statement — what was chosen and why it matters |
| rationale | yes | Why this was chosen. Starts with the reasoning, not "because" |
| alternatives | no | What else was considered. Empty string if none discussed |
| reversibility | no | "reversible", "permanent", "reversible until {condition}", or empty |

Example:

```
D	TSV as encode input format	Governance defines strict TSV output contract for encode input. Model outputs typed rows, server parses mechanically.	TSV is pure string splitting — no regex, no NLP. Model is already restructuring content. Adding column structure is trivial.	Free-form prose with regex classification; JSON structured output; model-labeled paragraphs	reversible
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Decision:

```
decided, decision, chose, choosing, selected, committed to, going with, will use, adopted, settled on, picked, determined, resolved to
```

These words are used by the server to build dynamic regex for fallback classification only. On the primary TSV path, the type letter `D` is the classifier.

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 5):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words | "Decision body is too brief — expand what was chosen" |
| Rationale | Rationale column is non-empty and ≥3 words | "No rationale — add why this was chosen" |
| Alternatives | Alternatives column is non-empty | "No alternatives considered — what else was an option?" |
| Reversibility | Reversibility column is non-empty | "Note whether this is reversible or permanent" |
| Constraints | Body or rationale mentions what this decision constrains or binds | "What constraints does this decision create?" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 5 | strong | recorded |
| 3–4 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## What Makes a Good Decision Encoding

A strong Decision encoding answers five questions: What was chosen? Why? What else was considered? Is it reversible? What does it constrain? The model doesn't need to answer all five — but quality scoring rewards completeness.

The most common gap is missing rationale. Models often encode the what without the why. The quality feedback loop teaches the model to include rationale in future calls.

The second most common gap is missing alternatives. A decision without alternatives is an assertion, not a choice. Even "no alternatives were discussed" is better than silence — it's honest about the decision's context.

---

## See Also

- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework this type belongs to
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
- [Encode Does Not Persist](klappy://docs/oddkit/proactive/encode-does-not-persist) — the caller must save encoded artifacts
