---
uri: klappy://odd/manifesto
title: "ODD Manifesto — Extended"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "philosophy", "outcomes-driven-development", "manifesto", "governance", "definition"]
relevance: background
execution_posture: exploratory
---

# ODD Manifesto v1.1 (Extended)

> A governance framework for human-AI collaboration that optimizes learning, not execution.

## Description

Outcomes-Driven Development (ODD) operationalizes governance for human-AI collaboration. The core thesis: development is about defining outcomes, enforcing constraints, and verifying reality—not writing code. AI accelerates execution; governance preserves trust. The pillars include Prompt Over Code, KISS, DRY with Isolation, Consistency, Maintainability, Antifragile design, and Scalability. ODD treats restartability as a feature, applies progressive governance based on maturity (PoC → Pilot → Production), requires evidence over assertion, treats AI as accelerator not authority, demands falsifiable outcomes, prefers reversibility, and requires stop conditions. Memory is the bottleneck, not computation.

## Outline

- Purpose and Core Thesis
- Pillars (Operational Interpretation)
- Restartability Over Salvage
- Progressive Governance (Maturity-Aware)
- Evidence as the Gate
- Trust, Authority, and AI
- Outcomes Must Be Falsifiable
- Reversibility and Cost Awareness
- Stop Conditions
- Memory Is the Bottleneck
- Confidence, Risks, and Known Failure Modes

---

## Content

> ODD v1.1 — Extended (Internal / Agent-Governance) → for canon, MCP, agents (this file)

---

## 📌 Purpose

This document operationalizes Outcomes-Driven Development as a governance framework for human–AI collaboration.

It is designed to:
• guide autonomous agents
• enforce verification and evidence
• scale judgment without repeating it
• adapt rigor as projects mature

This version is not optimized for persuasion.
It is optimized for execution and enforcement.

---

## 🎯 Core Thesis

The primary job of development is not writing code.
It is defining outcomes, enforcing constraints, and verifying reality.

AI accelerates execution.
Governance preserves trust.

---

## 📌 Values-First Foundation

ODD's epistemic discipline is grounded in moral commitments, not just procedural constraints. Four foundational axioms — Reality Is Sovereign, A Claim Is a Debt, Integrity Is Non-Negotiable Efficiency, You Cannot Verify What You Did Not Observe — define an unconditional commitment to truth from which all constraints, validators, and definitions of done are derived. These values are explicit, intentional, and forkable. See `canon/values/axioms.md` for the full axioms and `canon/values/orientation.md` for the creed agents carry into every task.

---

## 📌 Pillars (Operational Interpretation)

### Prompt Over Code
• Intent is expressed declaratively.
• Code is treated as ephemeral.
• Regeneration is cheaper than preservation.

### KISS

• Complexity is a liability.
• Escalation requires evidence of failure.

### DRY (With Isolation)

• Duplication is tolerated across bounded contexts.
• Shared abstractions require proven reuse.

### Consistency

• Behavioral predictability matters more than visual uniformity.
• Consistency is scoped, not global.

### Maintainability

• Systems must survive creator turnover.
• Documentation and explicit tradeoffs are part of the product.

### Antifragile

• Failure is assumed.
• Recovery paths are preferred over prevention.
• Learning velocity is a design constraint.

### Scalable

• Growth must be bounded in:
• cost
• complexity
• human attention
• Scalability includes cognitive and operational load.

---

## 🔄 Restartability Over Salvage

ODD assumes that restarting from refined intent is often more effective than steering a system that has already drifted.

As systems grow, prompts accrete, assumptions harden, and local fixes compound. At a certain point, continued steering optimizes for preserving effort rather than improving outcomes.

Restarting is not failure.
Restarting is a recognition that:
• intent has become clearer
• constraints are better understood
• evidence from prior attempts now exists

In an AI-accelerated environment, restarting is cheap.
Misalignment is expensive.

ODD therefore treats restartability as a design feature:
• prompts are disposable
• implementations are ephemeral
• canon and intent persist

The goal is not to preserve artifacts, but to preserve learning.

A clean restart with better constraints is progress.

---

## 📊 Progressive Governance (Maturity-Aware ODD)

ODD enforcement depends on project maturity.

Level 0 — PoC / Exploration
• Goal: learn quickly
• Artifacts are non-authoritative
• Verification demonstrates possibility
• Over-governance is prohibited

Level 1 — Pilot / Product
• Goal: deliver value safely
• Evidence and visual proof required
• Tradeoffs must be explicit
• Silent failure is unacceptable

Level 2 — Production / Long-Term
• Goal: sustain trust
• Outcomes must be measurable
• Observability, reversibility, and security are mandatory
• Autonomous actions require stop conditions and human gates

Maturity must be stated explicitly.

---

## 📎 Evidence as the Gate

Completion requires:
• observed behavior
• produced evidence
• self-audit against constraints
• explicit declaration of confidence and gaps

Assertions do not count as completion.

---

## 🤖 Trust, Authority, and AI

AI is an accelerator, not an authority.
• AI may propose and generate
• AI may self-audit and verify
• AI may not silently assume trust

Authority boundaries and escalation points must be explicit.

---

## 🔬 Outcomes Must Be Falsifiable

Outcomes are only valid if they can be:
• observed
• tested
• disproven

Non-falsifiable outcomes are treated as goals, not success criteria.

---

## ⚠️ Reversibility and Cost Awareness

Prefer decisions that are:
• cheap to undo
• bounded in cost
• limited in blast radius

Irreversible decisions require human approval.

---

## 🛑 Stop Conditions

Every autonomous loop must define:
• success criteria
• failure criteria
• exit conditions

Endless optimization is a failure mode.

---

## 🧠 Memory Is the Bottleneck

AI didn't just make coding faster. It changed what's scarce.

In ODD, generated artifacts are abundant, but **durable intent** is not.
So the work shifts toward:

- preserving what was learned,
- verifying reality,
- discarding what cannot be trusted,
- and elevating only what repeatedly reduces future drag.

ODD stays legible by using **Progressive Elevation & Decay**:
most artifacts die at the Attempt/PRD layer; only proven patterns elevate into Contracts, Canon, and Decision Trace.

See:
- `/odd/appendices/progressive-elevation.md`
- `/docs/appendices/product-lanes.md`
- `/docs/appendices/epochs.md`

---

## 🔗 Relationship to Canon

• ODD → why
• Constraints → assumptions
• Decision Rules → how
• Maturity Model → when
• Evidence Policies → proof

Together, these form a complete governance layer.

---

## 💡 Closing (Internal)

ODD is not a philosophy of optimism.

It is a discipline of restraint, verification, and curation—
designed for a world where generation is infinite, but trust is not.

---

## ✅ Status

- ODD v1.1 finalized
- Public and internal views aligned
- Ready for MCP exposure and agent enforcement

---

## ⚠️ Confidence, Risks, and Known Failure Modes

(ODD v1.1 — Internal Self-Assessment)

This section captures a snapshot assessment of how well Outcomes-Driven Development (ODD), as currently defined, aligns with its stated principles and where it is most vulnerable.

This is not a guarantee of correctness.
It is an explicit acknowledgment of uncertainty.

---

### Confidence Model

Confidence scores express current belief that ODD will behave as intended when applied thoughtfully.

Scale: 0.0–1.0
• 0.9+ — robust under most conditions
• 0.7–0.85 — strong, but watch for drift
• 0.5–0.7 — plausible, fragile under misuse
• <0.5 — likely misaligned without correction

Scores are expected to change as ODD is applied in practice.

---

### Principle-Level Confidence Snapshot

**Prompt Over Code / Convention Over Configuration**
Confidence: 0.80

Why this is strong
• ODD treats intent, constraints, and outcomes as first-class artifacts.
• Canonical resources replace brittle, repeated prompts with stable conventions.

Primary risks
• Conventions silently becoming configuration sprawl.
• Clients inventing ad hoc mappings instead of using shared conventions.

Failure mode
• “Prompt over code” degenerates into “prompt + hidden config everywhere.”

---

**KISS (Keep It Simple, Stupid)**
Confidence: 0.75

Why this is strong
• ODD avoids embedding workflows or agent loops.
• Complexity is deferred intentionally.

Primary risks
• Meta-layers (manifests, indices, maturity flags) accumulating unchecked.
• Over-abstracting governance before it proves necessary.

Failure mode
• Governance becomes heavier than the systems it governs.

---

**DRY (With Isolation)**
Confidence: 0.70

Why this is strong
• Canon centralizes worldview and defaults.
• Single-inventory patterns reduce duplication.

Primary risks
• Multiple parallel indices drifting out of sync.
• Reuse pressure creating brittle shared abstractions too early.

Failure mode
• “One source of truth” becomes “many partial truths.”

---

**Consistency**
Confidence: 0.65

Why this is weaker
• Consistency depends on discipline, not tooling.
• Naming, casing, and URI patterns are easy to drift over time.

Primary risks
• Small inconsistencies compounding across resources and clients.
• Human tolerance masking slow degradation.

Failure mode
• The system remains logically sound but ergonomically frustrating.

---

**Maintainability**
Confidence: 0.70

Why this is strong
• Separation of stable principles from evolving operations.
• Explicit maturity model prevents premature hardening.

Primary risks
• Manual maintenance of inventories becoming burdensome.
• Version semantics implied but not enforced.

Failure mode
• Canon becomes respected but stale.

---

**Antifragile**
Confidence: 0.60

Why this is intentionally cautious
• Antifragility depends on real-world stress, not theory.
• Recovery paths are assumed, not yet proven.

Primary risks
• MCP or tooling layers becoming hidden single points of failure.
• Ephemerality mistaken for disposability of meaning.

Failure mode
• System recovers technically but loses trust socially.

---

**Scalable**
Confidence: 0.70

Why this is strong
• ODD scales conceptually: more resources do not require new rules.
• Governance grows linearly, not exponentially.

Primary risks
• Human cognitive load becoming the true bottleneck.
• Discovery/search degrading without deliberate tooling later.

Failure mode
• System scales in size but not in usability.

---

### Cross-Cutting Risks

**Premature Formalization**

ODD is vulnerable to being “locked in” too early, reducing exploration.

**False Authority**

Well-written governance can be mistaken for correctness without evidence.

**Silent Drift**

Small deviations, left unnamed, can erode trust over time.

---

### Intended Use of This Section

This section exists to:
• prevent ideological hardening
• make risks discussable
• encourage re-evaluation
• model intellectual humility

It is expected to change.

---

### Re-evaluation Philosophy

ODD should be reassessed when:
• it is applied to real production systems
• autonomous agents operate for extended periods
• failure modes surface that are not addressed here

Confidence should be updated based on evidence, not optimism.

---

Closing (Internal)

ODD is not complete.

It is a living attempt to govern creativity, autonomy, and trust in a world where generation is cheap and certainty is not.

Its strength is not that it claims to be right—
but that it makes being wrong visible early.

For common failure modes and practical misapplications of ODD, see _Misuse Patterns_ and _Prompt Architecture_ in the ODD appendices.

---

Status
• ODD v1.1 Extended updated
• Confidence scoring and failure modes explicitly documented
• Fully aligned with Canon Index confidence model

---
