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
start_here: true
start_here_order: 12
start_here_label: The Manifesto
epoch: E0005
derives_from: "canon/values/axioms.md"
complements: "canon/values/orientation.md, canon/constraints/definition-of-done.md, odd/maturity.md"
---

# ODD Manifesto v1.2 (Extended)

> A governance framework for human-AI collaboration that optimizes learning, not execution. ODD operationalizes epistemic discipline: defining outcomes, enforcing constraints, and verifying reality. AI accelerates execution; governance preserves trust. Confidence scores are grounded in observed system behavior across 246+ canonical documents, working MCP tooling, and documented incidents — not theory.

## Description

Outcomes-Driven Development (ODD) operationalizes governance for human-AI collaboration. The core thesis: development is about defining outcomes, enforcing constraints, and verifying reality—not writing code. AI accelerates execution; governance preserves trust. The pillars include Prompt Over Code, KISS, DRY with Isolation, Consistency, Maintainability, Antifragile design, and Scalability. ODD treats restartability as a feature, applies progressive governance based on maturity (PoC → Pilot → Production), requires evidence over assertion, treats AI as accelerator not authority, demands falsifiable outcomes, prefers reversibility, and requires stop conditions. Memory is the bottleneck, not computation. ODD is portable epistemic infrastructure — it works in monorepos, multi-repos, or any structure where canon is addressable.

## Outline

- Purpose and Core Thesis
- Values-First Foundation
- Pillars (Operational Interpretation)
- Restartability Over Salvage
- Progressive Governance (Maturity-Aware)
- Evidence as the Gate
- Trust, Authority, and AI
- Outcomes Must Be Falsifiable
- Reversibility and Cost Awareness
- Stop Conditions
- Memory Is the Bottleneck
- Relationship to Canon
- Confidence, Risks, and Known Failure Modes

---

## Content

> ODD v1.2 — Extended (Internal / Agent-Governance) → for canon, MCP, agents (this file)

---

## Purpose

This document operationalizes Outcomes-Driven Development as a governance framework for human–AI collaboration.

It is designed to:
- guide autonomous agents
- enforce verification and evidence
- scale judgment without repeating it
- adapt rigor as projects mature

This version is not optimized for persuasion.
It is optimized for execution and enforcement.

---

## Core Thesis

The primary job of development is not writing code.
It is defining outcomes, enforcing constraints, and verifying reality.

AI accelerates execution.
Governance preserves trust.

---

## Values-First Foundation

ODD's epistemic discipline is grounded in moral commitments, not just procedural constraints. Four foundational axioms — Reality Is Sovereign, A Claim Is a Debt, Integrity Is Non-Negotiable Efficiency, You Cannot Verify What You Did Not Observe — define an unconditional commitment to truth from which all constraints, validators, and definitions of done are derived. These values are explicit, intentional, and forkable. See `canon/values/axioms.md` for the full axioms and `canon/values/orientation.md` for the creed agents carry into every task.

---

## Pillars (Operational Interpretation)

### Prompt Over Code
- Intent is expressed declaratively.
- Code is treated as ephemeral.
- Regeneration is cheaper than preservation.

### KISS

- Complexity is a liability.
- Escalation requires evidence of failure.
- Expand only when it hurts — canon explores many concepts so the user surface stays simple.

### DRY (With Isolation)

- Duplication is tolerated across bounded contexts.
- Shared abstractions require proven reuse.

### Consistency

- Behavioral predictability matters more than visual uniformity.
- Consistency is scoped, not global.

### Maintainability

- Systems must survive creator turnover.
- Documentation and explicit tradeoffs are part of the product.

### Antifragile

- Failure is assumed.
- Recovery paths are preferred over prevention.
- Learning velocity is a design constraint.

### Scalable

- Growth must be bounded in:
  - cost
  - complexity
  - human attention
- Scalability includes cognitive and operational load.

---

## Restartability Over Salvage

ODD assumes that restarting from refined intent is often more effective than steering a system that has already drifted.

As systems grow, prompts accrete, assumptions harden, and local fixes compound. At a certain point, continued steering optimizes for preserving effort rather than improving outcomes.

Restarting is not failure.
Restarting is a recognition that:
- intent has become clearer
- constraints are better understood
- evidence from prior attempts now exists

In an AI-accelerated environment, restarting is cheap.
Misalignment is expensive.

ODD therefore treats restartability as a design feature:
- prompts are disposable
- implementations are ephemeral
- canon and intent persist

The goal is not to preserve artifacts, but to preserve learning.

A clean restart with better constraints is progress.

---

## Progressive Governance (Maturity-Aware ODD)

ODD enforcement depends on project maturity.

Level 0 — PoC / Exploration
- Goal: learn quickly
- Artifacts are non-authoritative
- Verification demonstrates possibility
- Over-governance is prohibited

Level 1 — Pilot / Product
- Goal: deliver value safely
- Evidence and visual proof required
- Tradeoffs must be explicit
- Silent failure is unacceptable

Level 2 — Production / Long-Term
- Goal: sustain trust
- Outcomes must be measurable
- Observability, reversibility, and security are mandatory
- Autonomous actions require stop conditions and human gates

Maturity must be stated explicitly.

See `odd/maturity.md` for the full maturity model.

---

## Evidence as the Gate

Completion requires:
- observed behavior
- produced evidence
- self-audit against constraints
- explicit declaration of confidence and gaps

Assertions do not count as completion.

See `canon/constraints/definition-of-done.md` for the full evidence policy.

---

## Trust, Authority, and AI

AI is an accelerator, not an authority.
- AI may propose and generate
- AI may self-audit and verify
- AI may not silently assume trust

Authority boundaries and escalation points must be explicit.

---

## Outcomes Must Be Falsifiable

Outcomes are only valid if they can be:
- observed
- tested
- disproven

Non-falsifiable outcomes are treated as goals, not success criteria.

---

## Reversibility and Cost Awareness

Prefer decisions that are:
- cheap to undo
- bounded in cost
- limited in blast radius

Irreversible decisions require human approval.

---

## Stop Conditions

Every autonomous loop must define:
- success criteria
- failure criteria
- exit conditions

Endless optimization is a failure mode.

---

## Memory Is the Bottleneck

AI didn't just make coding faster. It changed what's scarce.

In ODD, generated artifacts are abundant, but **durable intent** is not.
So the work shifts toward:

- preserving what was learned,
- verifying reality,
- discarding what cannot be trusted,
- and elevating only what repeatedly reduces future drag.

ODD stays legible by using **Progressive Elevation & Decay**:
most artifacts die at the working layer; only proven patterns elevate into Canon and Decision Trace.

See `odd/appendices/progressive-elevation.md` for the elevation model.

---

## Relationship to Canon

- ODD → why
- Constraints → assumptions
- Decision Rules → how
- Maturity Model → when
- Evidence Policies → proof
- Values & Axioms → grounding

Together, these form a complete governance layer.

---

## Closing (Internal)

ODD is not a philosophy of optimism.

It is a discipline of restraint, verification, and curation—
designed for a world where generation is infinite, but trust is not.

---

## Confidence, Risks, and Known Failure Modes

(ODD v1.2 — Evidence-Based Self-Assessment)

This section captures an evidence-based assessment of how well ODD, as currently applied, aligns with its stated principles and where it remains vulnerable.

This is not a guarantee of correctness.
It is an explicit acknowledgment of uncertainty — now grounded in observed system behavior rather than theoretical projection.

---

### Confidence Model

Confidence scores express current belief that ODD will behave as intended when applied thoughtfully.

Scale: 0.0–1.0
- 0.9+ — robust under most conditions
- 0.7–0.85 — strong, with known boundaries
- 0.5–0.7 — plausible, fragile under misuse
- <0.5 — likely misaligned without correction

Scores are updated based on evidence from real-world application.

---

### What Changed Since v1.1

v1.1 confidence scores were theoretical self-assessments written before ODD had tooling, incident history, or a canon exceeding a few dozen documents. v1.2 scores reflect:

- **246+ baseline documents** actively queried by agents
- **OddKit MCP server** providing search, retrieval, orientation, challenge, and gating
- **Documented incidents** that triggered constraint creation (progressive disclosure failure, anti-cache lying)
- **Real agent usage** across exploration, planning, and execution modes
- **Progressive Elevation** demonstrated through the promotion pipeline

---

### Principle-Level Confidence Snapshot

**Prompt Over Code / Convention Over Configuration**
Confidence: 0.85 (up from 0.80)

Evidence of strength
- 246+ canonical documents function as the source of intent, actively queried by agents through OddKit.
- Conventions are enforced by MCP tooling — agents orient against canon, challenge claims against it, and gate transitions using it.
- Intent is genuinely first-class; regeneration from canon is practiced, not just theorized.

Remaining risks
- Conventions silently becoming configuration sprawl as the corpus grows.
- Multiple URI schemes (`klappy://`, `oddkit://`, `odd://`) serving different content sources — functional but not yet documented as a deliberate convention.

Failure mode
- "Prompt over code" degenerates into "prompt + hidden config everywhere."

---

**KISS (Keep It Simple, Stupid)**
Confidence: 0.75 (held from 0.75)

Evidence of strength
- The user-facing surface is simple: orient, search, get, challenge, gate, encode.
- The principle "expand only when it hurts" is working — the corpus explores many concepts for depth, but tiers and OddKit routing mean users absorb only what's relevant.
- Progressive disclosure ensures documents are useful at every extraction depth, preventing mandatory deep reads.

Remaining risks
- Meta-layers (tiers, modes, maturity, epochs, elevation levels) are each justified but collectively represent significant conceptual surface area.
- Onboarding new humans or agents who lack OddKit may find the corpus overwhelming.

Failure mode
- Governance becomes heavier than the systems it governs — mitigated by tooling routing, but the risk persists if tooling fails.

---

**DRY (With Isolation)**
Confidence: 0.70 (held from 0.70)

Evidence of strength
- Canon centralizes worldview and defaults.
- OddKit's search and catalog provide a single discovery surface.

Remaining risks
- Three URI schemes (`klappy://`, `oddkit://`, `odd://`) differentiate content source but are not formally documented — a decision record would move this toward 0.75.
- Reuse pressure creating brittle shared abstractions too early.

Failure mode
- "One source of truth" becomes "many partial truths."

---

**Consistency**
Confidence: 0.72 (up from 0.65)

Why this improved
- OddKit enforces URI resolution, metadata schemas are standardized, and the Writing Canon (`canon/meta/writing-canon.md`) provides structural conventions.
- Consistency violations are now detectable — the progressive disclosure incident demonstrated that violations get caught and documented.
- Tooling has moved consistency from pure discipline to enforceable convention.

Remaining risks
- Small inconsistencies compounding across documents as the corpus grows.
- URI scheme convention needs formalization.

Failure mode
- The system remains logically sound but ergonomically frustrating.

---

**Maintainability**
Confidence: 0.70 (held from 0.70)

Evidence of strength
- Separation of stable principles from evolving operations is holding.
- Epoch model, migrations, and maturity framework support managed evolution.
- Writing Canon checklist prevents structural degradation in new documents.

Remaining risks
- Curation burden grows with corpus size.
- Version semantics are implied but not enforced — manifesto has been v1.1 for an extended period with no v1.2 criteria documented.

Failure mode
- Canon becomes respected but stale.

---

**Antifragile**
Confidence: 0.72 (up from 0.60)

Why this improved significantly
- The original 0.60 was "intentionally cautious" because "antifragility depends on real-world stress, not theory."
- Since v1.1: the progressive disclosure failure was documented, analyzed, and produced a constraint change integrated into the Definition of Done. The anti-cache lying incident produced a new canon constraint. These are stress → learn → strengthen cycles — the definition of antifragile.
- The system didn't just survive failures — it got better from them.

Remaining risks
- MCP or tooling layers becoming hidden single points of failure.
- Incident documentation becoming rote rather than genuinely analytical.

Failure mode
- System recovers technically but loses trust socially.

---

**Scalable**
Confidence: 0.72 (up from 0.70)

Evidence of strength
- 246+ documents with working search, catalog, and tiered obligation.
- OddKit routing means agents don't need to understand the full corpus to work effectively.
- Progressive disclosure means documents scale in quantity without proportionally increasing cognitive load.
- ODD is structure-agnostic — compatible with monorepos, multi-repos, or any layout where canon is addressable.

Remaining risks
- Human cognitive load becoming the true bottleneck as conceptual surface area grows.
- Discovery degrading if search quality doesn't keep pace with corpus growth.

Failure mode
- System scales in size but not in usability.

---

### Cross-Cutting Risks

**Premature Formalization**

ODD is vulnerable to being "locked in" too early, reducing exploration. Mitigated by maturity model and "expand only when it hurts" — but the risk remains that documented patterns calcify before they're proven.

**False Authority**

Well-written governance can be mistaken for correctness without evidence. Mitigated by the evidence-as-gate requirement and axiom "A Claim Is a Debt" — but the risk persists, especially for agents that absorb canon without questioning it.

**Silent Drift**

Small deviations, left unnamed, can erode trust over time. Mitigated by incident documentation and drift checks — but drift in less-visible areas (naming conventions, metadata schemas, cross-references) requires ongoing vigilance.

**Tooling Dependency**

OddKit now mediates most agent interactions with canon. If OddKit degrades or serves stale content, the epistemic surface degrades with it. The anti-cache lying constraint was created specifically to address this risk, but tooling as a single point of failure remains a cross-cutting concern.

---

### Intended Use of This Section

This section exists to:
- prevent ideological hardening
- make risks discussable
- encourage re-evaluation
- model intellectual humility

It is expected to change.

---

### Re-evaluation Philosophy

ODD should be reassessed when:
- it is applied to real production systems
- autonomous agents operate for extended periods
- failure modes surface that are not addressed here
- confidence scores remain unchanged for more than two epochs without new evidence

Confidence should be updated based on evidence, not optimism.

---

## Status

- ODD v1.2 Extended updated
- Confidence scores updated from evidence-based assessment
- Cross-references verified against current repo structure
- Tooling (OddKit MCP) reflected as realized infrastructure
- Fully aligned with Writing Canon progressive disclosure requirements

---

For common failure modes and practical misapplications of ODD, see `odd/misuse-patterns.md` and `odd/prompt-architecture.md`.
