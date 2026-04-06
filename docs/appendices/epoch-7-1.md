---
uri: klappy://docs/appendices/epoch-7-1
title: "Epoch 7.1 — Vodka Architecture and Principled Governance"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "vodka-architecture", "design-pattern", "principles", "governance", "posture-lapse", "epoch-7", "epoch-7.1"]
epoch: E0007.1
date: 2026-04-04
extends: "Epoch 7 (from passive to proactive)"
forcing_fault: "A proactive system without named architectural principles cannot explain why it works or detect when it stops working"
new_invariant: "The architecture is named, the principles are formalized, and posture failure is detectable"
core_shift: "Unnamed conventions → named design pattern. Tool-level governance articles → principle-level governance with smell tests, failure modes, and required responses. No posture lapse detection → structural self-assessment."
documents_introduced: ["canon/principles/vodka-architecture.md", "canon/principles/kiss-simplicity-is-the-ceiling.md", "canon/principles/dry-canon-says-it-once.md", "canon/principles/consistency-same-pattern-every-time.md", "canon/principles/maintainability-one-person-indefinitely.md", "canon/principles/prompt-over-code.md", "canon/principles/antifragile-failures-grow-canon.md", "docs/oddkit/proactive/posture-lapse.md", "docs/oddkit/proactive/dolche-vocabulary.md", "canon/meta/frontmatter-schema.md", "docs/appendices/epoch-7-1.md"]
---

# Epoch 7.1 — Vodka Architecture and Principled Governance

> E0007 made the system proactive. E0007.1 names *why* it works and adds the mechanism for detecting *when it stops*. Six design principles — KISS, DRY, Consistency, Maintainability, Prompt Over Code, Antifragile — converge into a named design pattern: Vodka Architecture. Each principle is formalized with smell tests, failure modes, exclusions, and required responses. A posture lapse detection article closes the loop: the system can now diagnose its own governance breakdown.

---

## Summary — From "Act Proactively" to "Here's Why, and Here's How to Tell When You're Not"

E0007 declared the proactive posture shift and wrote tool-level governance articles — one per oddkit action, each describing when and how to use it proactively. This was correct and necessary. But it left two gaps:

The first gap was architectural: the principles underlying oddkit's design were practiced but unnamed. The system was thin, stateless, and domain-agnostic — but no document said so, explained why, or defined what violated those properties. An agent or operator encountering oddkit could use it correctly without understanding the architectural constraints that made it work.

The second gap was diagnostic: the proactive governance articles described what the system *should* do but not how to detect when it *stopped doing it*. A posture lapse — the agent silently ceasing to use oddkit tools — produced no error, no warning, and no structural signal. The failure was invisible because the system had no mechanism for self-assessment.

E0007.1 closes both gaps.

---

## The Forcing Fault — Unnamed Conventions Cannot Be Enforced

oddkit's architecture followed six design principles from inception. None were named. None were documented. None had smell tests or failure modes. They existed as tacit knowledge in the operator's head and as implicit constraints in the codebase.

This mattered because unnamed conventions cannot be enforced by agents, cannot be searched by operators, and cannot be challenged by reviewers. An agent that doesn't know "Vodka Architecture" exists cannot check whether a proposed change violates it. An operator who doesn't know "Prompt Over Code" is a principle cannot search the canon for guidance when choosing between a code change and a governance document.

The forcing fault was surfaced by two external events: the Claude Code source leak (March 31, 2026) exposed an orchestration harness without a governance layer, and Pliny the Liberator's agent chaos incident demonstrated what happens when behavioral conventions replace structural enforcement. Both validated oddkit's design — but oddkit couldn't explain *why* in terms an agent could discover and apply.

---

## What E0007.1 Introduces

### Vodka Architecture — The Named Design Pattern

A design pattern for epistemic infrastructure: infrastructure so thin and clean it disappears into whatever it carries. Stateless server, stateful canon. No domain opinion — all epistemic discipline. Remove it and everything breaks. Add more and you ruin it.

Named from a transcription error that turned "oddkit" into "vodka" — which works better as a metaphor than it should. The name is now canonical.

### Six Principle Spinoffs — Full Governance Articles

Each of the six principles underlying Vodka Architecture is formalized as a standalone governance article following the `ritual-is-a-smell` template: smell test → failure modes → exclusions → required response. Every article is grounded in oddkit's own production evidence — dogfooding each principle.

| Principle | Core Constraint |
|-----------|----------------|
| KISS | Every action must justify its existence against the alternative of not existing |
| DRY | The canon says it once, the server never repeats it |
| Consistency | Same pattern, every knowledge base, every time |
| Maintainability | One person, indefinitely |
| Prompt Over Code | Governance in documents, enforcement in the server, never the reverse |
| Antifragile | Every failure grows the canon, never the server |

### Posture Lapse Detection — The Diagnostic Mechanism

A meta-governance article that defines how to detect when the proactive cognitive rhythm has broken down. Includes tool silence indicators, behavioral signals, failure modes, self-detection vs operator-detection response paths, and a five-question posture health check.

This closes the gap between E0007's tool-level "when to use" articles and the system-level question "is the proactive posture actually working?"

### DOLCHE — Superseding OLDC+H

DOLCHE (Decisions, Observations, Learnings, Constraints, Handoffs, Encodes) supersedes OLDC+H by adding Encode as a meta-level action — not a sixth artifact type, but the act of crystallizing the other five, made visible and trackable. The vocabulary is extensible through governance documents: any knowledge base can add custom types without changing oddkit's server.

### Frontmatter Schema — The Authoritative Reference

A governance document defining every valid frontmatter field per audience, required types, quoting rules, and required vs optional status. Derived from corpus analysis of 389 documents. Supersedes template-based field guidance. Addresses the recurring "blank pages from broken frontmatter" problem by making the schema a preflight checkpoint rather than a copy-from-existing-doc ritual.

---

## What E0007.1 Does Not Change

- **The four axioms carry forward unchanged.**
- **The creed carries forward unchanged.**
- **All E0007 invariants remain in force.** The system still acts first. The operator still reviews.
- **All E0007 tool-level governance articles remain valid.** E0007.1 adds principle-level and system-level governance on top of them.
- **The proactive posture is not modified.** E0007.1 names and diagnoses it — it does not change it.

---

## Epoch 7.1 Documents

| Document | Purpose |
|----------|---------|
| `canon/principles/vodka-architecture.md` | Parent design pattern — six principles, three properties, three anti-patterns, constraint test |
| `canon/principles/kiss-simplicity-is-the-ceiling.md` | KISS principle with smell tests, failure modes, required response |
| `canon/principles/dry-canon-says-it-once.md` | DRY principle with smell tests, failure modes, required response |
| `canon/principles/consistency-same-pattern-every-time.md` | Consistency principle with smell tests, failure modes, required response |
| `canon/principles/maintainability-one-person-indefinitely.md` | Maintainability principle with smell tests, failure modes, required response |
| `canon/principles/prompt-over-code.md` | Prompt Over Code principle with smell tests, failure modes, required response |
| `canon/principles/antifragile-failures-grow-canon.md` | Antifragile principle with smell tests, failure modes, required response |
| `docs/oddkit/proactive/posture-lapse.md` | Posture lapse detection — system-level governance self-assessment |
| `docs/oddkit/proactive/dolche-vocabulary.md` | DOLCHE vocabulary — supersedes OLDC+H with meta-level Encode action |
| `canon/meta/frontmatter-schema.md` | Frontmatter schema — authoritative field reference for all documents |
| This document | Sub-epoch declaration |

---

## Compatibility

- E0007 artifacts remain valid. E0007.1 extends E0007 — it does not supersede it.
- E0007.1 adds architectural and diagnostic governance that E0007 did not include.
- E0007.1 is the current sub-epoch within E0007.
