---
uri: oddkit://system/map
title: "Oddkit System Map"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["oddkit", "odd", "outcomes-driven-development", "orchestrator", "librarian", "validation", "arbitration"]
---

# Oddkit System Map

> A practical guide for understanding oddkit behavior, outcomes, and next actions.

**ODD** = **Outcomes-Driven Development** — an approach to building software that prioritizes real-world results over artifacts. See [/odd/README.md](/odd/README.md) for the full philosophy.

This document explains **what oddkit does**, **how to interpret its outputs**, and **what actions are expected next**.
It is not a design doc, tutorial, or philosophy statement.

---

## What Oddkit Is

Oddkit is an **agent-facing orchestration tool** that helps AI agents:

1. Retrieve governing truth with citations
2. Validate claims against required evidence
3. Handle conflicts honestly without hiding uncertainty
4. Preserve learning through promotion artifacts

Oddkit **does not resolve conflicts by force** and **does not mutate Canon automatically**.

---

## High-Level Pipeline

Oddkit operates as a pipeline of distinct responsibilities:

1. **Index**
   - Builds a searchable map of documents (local + baseline)
   - Tracks identity, authority, scope, intent, and evidence signals

2. **Librarian**
   - Retrieves relevant documents
   - Extracts headed evidence with citations
   - Applies arbitration rules when candidates conflict

3. **Arbitration**
   - Scores candidates using weighted relevance
   - Handles drift, duplicates, and contradictions
   - Produces an explicit outcome (`prefer`, `defer`, `escalate`, `propose_promotion`)

4. **Validation**
   - Detects completion claims
   - Maps claims to required evidence
   - Blocks "done" without proof

5. **Explain**
   - Explains _why_ a result occurred
   - Shows rules fired, evidence accepted/rejected, and conflicts detected

Each stage is independent and inspectable.

---

## Interpreting Outcomes

| Outcome                        | Meaning                              | What To Do                              |
| ------------------------------ | ------------------------------------ | --------------------------------------- |
| `SUPPORTED`                    | Clear preferred answer               | Proceed                                 |
| `SUPPORTED` + `advisory: true` | Preferred answer with low confidence | Review contradictions                   |
| `defer`                        | Competing hypotheses                 | Decide manually or gather more evidence |
| `escalate`                     | Broken identity or metadata error    | Fix before proceeding                   |
| `propose_promotion`            | Repeated failure pattern detected    | Consider Canon promotion                |
| `NEEDS_ARTIFACTS`              | Claim lacks required proof           | Provide requested evidence              |

---

## Understanding Warnings

Warnings indicate **epistemic smells**, not failures.

| Warning                      | Meaning                                       |
| ---------------------------- | --------------------------------------------- |
| `INDEX_DUPLICATE_COLLAPSED`  | Same document appeared multiple times         |
| `URI_DRIFT`                  | Local and baseline versions differ (expected) |
| `NORMATIVE_DRIFT`            | Rule language changed (MUST / MUST NOT)       |
| `EXCESSIVE_DUPLICATES`       | Index hygiene issue                           |
| `MISSING_URI_FOR_POLICY_DOC` | Governing doc lacks stable identity           |

Warnings do **not** block progress unless explicitly escalated.

---

## Confidence & Arbitration

Oddkit confidence is **margin-based**, not absolute.

confidence = (top_score - second_score) / top_score

Low confidence means:

- Evidence exists
- But alternatives are close enough to warrant caution

Confidence does **not** mean correctness — only separation.

---

## What Oddkit Will Never Do

Oddkit will not:

- Invent answers without citations
- Hide contradictions
- Auto-resolve policy conflicts
- Mutate Canon or governing docs
- Treat drift as failure

Conflict, drift, and ambiguity are **signals**, not bugs.

---

## Epistemic Challenge (Behavioral Doctrine)

Epistemic Challenge defines _how_ the system applies constructive pressure when uncertainty,
weak evidence, or contradictions are detected.

It is triggered by epistemic hygiene smells and expressed through:

- Librarian behavior (citation-first retrieval)
- Validation behavior (claims-to-evidence)
- Arbitration outputs (prefer | defer | escalate | propose_promotion)

Epistemic Challenge does not add enforcement. It governs posture, tone, and next-step selection
when uncertainty must be handled rather than hidden.

---

## Where To Look Next

- For _why a rule exists_: follow the Promotion artifact linked in Explain
- For _governing intent_: see Canon documents
- For _implementation details_: see code and tests, not this document

---

## Summary

Oddkit helps agents **think clearly under uncertainty**.

If the system feels cautious, that is intentional.  
If the system escalates, it is asking for human judgment — not failing.
