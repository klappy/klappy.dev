---
uri: klappy://canon/weighted-relevance-and-arbitration
title: "Weighted Relevance & Arbitration"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["arbitration", "relevance", "epistemic-hygiene", "promotion"]
---

# Weighted Relevance & Arbitration

> How the system handles conflict between competing truths — and why resolution is not always the goal.

## Problem Statement

Time-based rules are insufficient for managing truth in evolving systems. A document created yesterday may be more authoritative than one created today. A workaround discovered last week may contradict a pattern established months ago. Neither recency nor age alone determines relevance.

Systems that learn must tolerate disagreement. Contradiction is not a bug — it is evidence that the system is encountering reality. Drift between documents, between local and baseline knowledge, between intent and execution, is expected and healthy.

The question is not "how do we eliminate conflict?" but "how do we handle conflict without destroying the information it carries?"

Forced convergence — picking a winner to simplify the system — erases the signal that conflict provides. It trades epistemic honesty for false clarity.

## Core Principle

**Handling conflict is not the same as resolving conflict.**

Arbitration is the practice of weighing competing claims and producing a recommendation, a deferral, or an escalation. It does not produce a single winner except when evidence and intent clearly justify one.

Scores recommend. They do not decide. A high score indicates relevance, not authority. A low score indicates reduced signal, not invalidity.

Uncertainty is a valid and correct outcome. When signals conflict or evidence is weak, the system should surface that uncertainty rather than mask it with a confident-sounding answer.

Forced convergence — selecting one truth to avoid presenting ambiguity — is epistemically harmful. It teaches the system to lie by omission.

## Signals Used in Arbitration

Arbitration considers multiple signals. None of these signals alone determines outcome. Their combination, weighted by context, informs a recommendation.

### Scope Similarity

How close is the source to the current context?

Sources are considered in order of proximity:

- Same attempt
- Same feature
- Same PRD
- Same lane
- Same repo
- Baseline

A source from the same attempt is more relevant than one from baseline, all else being equal. But scope alone does not determine authority.

### Intent

What was the purpose of the source when it was created?

Intent categories, from least to most durable:

- **Workaround** — Temporary solution to unblock progress
- **Experiment** — Exploratory work without commitment
- **Operational** — Documentation of current practice
- **Pattern** — Recognized recurring solution
- **Promoted** — Elevated to governing status through evidence

A workaround is not expected to persist. A promoted pattern is expected to govern.

### Evidence Strength

How well is the claim supported by verifiable artifacts?

Evidence levels:

- **None** — Assertion without support
- **Weak** — Partial or anecdotal support
- **Medium** — Reproducible but limited scope
- **Strong** — Multiple independent validations

Evidence strength gates whether a claim can outrank others. Strong evidence permits stronger assertions.

### Recency

When was the source created or last validated?

Recency is explicitly gated by intent and evidence. A newer source with weaker evidence or lower intent does not automatically outrank an older source with stronger evidence or higher intent.

Recency without qualification is a dangerous heuristic. It privileges novelty over durability.

## Hard Constraints

The following rules are non-negotiable. They define the boundaries of arbitration behavior.

### Intent-Gated Precedence

A newer workaround or experiment MUST NOT outrank an older promoted or pattern unless it explicitly supersedes it. Intent hierarchy is enforced.

### Evidence Requirement

Claims without evidence trigger an epistemic hygiene smell. They may be surfaced but must be marked as unsupported. They cannot be preferred over evidenced claims.

### Explicit Supersedes

The `supersedes` mechanism is explicit only. Supersession is never inferred from recency, scope, or content similarity. If a document does not declare what it supersedes, it supersedes nothing.

### Confidence-Based Escalation

If arbitration confidence is low — because signals conflict, evidence is weak, or scope is ambiguous — the system must escalate or defer. Presenting a low-confidence result as if it were high-confidence is prohibited.

## Valid Outcomes of Arbitration

Arbitration produces one of the following outcomes. "Pick one" is not always correct.

### Prefer

One source is clearly more relevant given scope, intent, evidence, and recency. The system recommends it with an explanation of why.

### Defer

Multiple sources conflict. Evidence or intent does not clearly favor one. The system surfaces both and marks the result as unresolved. This is not a failure.

### Escalate

The conflict requires human judgment. The system cannot arbitrate without additional context or authority. Escalation is a valid and expected outcome.

### Propose Promotion

A pattern has emerged. The conflict reveals a gap in governing documentation. The system recommends capturing the learning through the promotion pipeline.

## Relationship to Other Systems

This doctrine governs how arbitration occurs. Other systems implement specific aspects.

**Librarian** is the retrieval substrate. It surfaces candidates and scores them. It does not decide.

**Validation** enforces evidence requirements. It ensures claims are supported before they can be trusted.

**Promotions** captures learning. When arbitration repeatedly encounters the same conflict, promotion is the path to resolution.

**oddkit** provides portable execution of this doctrine. It implements arbitration behavior and exposes signals in its output.

These systems work together. None of them operates in isolation. All of them defer to this doctrine for arbitration rules.

## Non-Goals

This doctrine explicitly does not pursue:

### Forced Consensus

Disagreement is permitted and expected. The system does not require all sources to agree.

### Automatic Canon Mutation

Arbitration does not change Canon. Only humans, through the promotion pipeline, can elevate patterns to governing status.

### Global Truth

There is no single correct answer for all contexts. Scope matters. What is true for one attempt may not be true for another.

### Elimination of Conflict

Conflict carries information. Eliminating it destroys signal. The goal is to handle conflict honestly, not to make it disappear.

---

Arbitration is not about finding the right answer. It is about honestly representing what the system knows, what it does not know, and when human judgment is required.
