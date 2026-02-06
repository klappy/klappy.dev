---
uri: klappy://canon/documentation/tier-vs-relevance
title: "Tier vs Relevance"
audience: canon
exposure: nav
tier: 1
relevance: decision
voice: neutral
stability: stable
tags: ["metadata", "documentation", "context-packs"]
execution_posture: governing
---

# Tier vs Relevance

> Two different axes with different purposes. Do not conflate them.

## Summary

This document defines the difference between **tier** and **relevance** metadata.
They solve different problems, apply to different consumers, and must remain independent.

Confusing them leads to bloated context packs, misplaced authority, and degraded agent behavior.

---

## Tier (Human Progressive Disclosure)

**Tier controls how content is surfaced to humans.**

It exists to prevent overwhelm in navigation, indexes, and reading flows.

Tier does **not** imply importance, correctness, or authority.

### Allowed Values

- `tier: 0` — hidden or internal
- `tier: 1` — default surfaced
- `tier: 2` — secondary / discoverable
- `tier: 3` — deep reference / long-form

### Rules

- Tier is UI-facing only
- Tier must never be used to decide context-pack inclusion
- Tier may be omitted on purely agent-facing documents

---

## Relevance (Context Pack Inclusion)

**Relevance controls whether a topic participates in agent context packs.**

It answers: *"Is this topic useful for making or supporting decisions?"*

### Allowed Values

- `decision` — changes what an agent should do next
- `supporting` — improves correctness and judgment
- `background` — provides understanding, narrative, or rationale
- `routing` — helps find other content

### Rules

- Relevance is execution-facing
- Relevance does not imply truth ranking
- A document must explicitly declare relevance
- Relevance is evaluated per topic/file, not per heading

---

## Hard Rule

> **Tier controls visibility. Relevance controls usability.  
> They must never substitute for each other.**

---

## Common Mistakes

- Treating `tier: 1` as "important for agents"
- Using numeric tiers to encode execution depth
- Inferring relevance from tier automatically

If any of the above occur, fix the metadata — not the compiler.

---

## Operating Constraints

- MUST NOT use tier to decide context-pack inclusion; use relevance instead
- MUST NOT infer relevance from tier automatically
- MUST declare relevance explicitly on each document
- MUST keep tier and relevance as independent axes
- MUST fix metadata errors, not compiler behavior, when conflation occurs

---

## Defaults

- Tier defaults to 2 (secondary/discoverable) when not specified
- Relevance defaults to supporting when not specified
- When uncertain whether content is decision-grade, start at supporting and upgrade based on observed impact
- Treat tier as UI-facing only; treat relevance as execution-facing only

---

## Failure Modes

- **Tier as Agent Signal**: Using tier: 1 to mean "important for agents"
- **Numeric Depth Encoding**: Using tier numbers to encode execution priority
- **Automatic Inference**: Deriving relevance from tier programmatically
- **Axis Conflation**: Treating visibility and usability as the same concern
- **Pack Bloat**: Including content in context packs based on tier instead of relevance

---

## Verification

- Context pack inclusion is determined by relevance, not tier
- Tier assignment reflects human navigation needs only
- Relevance assignment reflects agent decision-making needs only
- Metadata explicitly declares both values when both apply
- Changes to tier do not affect context pack composition
