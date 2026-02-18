---
uri: klappy://canon/constraints
title: "Constraints"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["constraints", "assumptions"]
relevance: decision
execution_posture: governing
start_here: true
start_here_order: 14
start_here_label: Constraints
---

# Constraints

> Design defaults and assumptions that shape how systems are built.

## Description

Constraints define the baseline assumptions and design defaults applied to most work. They cover offline-first design, long-term maintainability, interoperability, stateless architectures, AI as accelerator (not authority), evidence over assertion, contextual UX, ephemeral artifacts, explicit tradeoffs, work-unit self-containment, single-agent integrity before collaboration, encoding epistemic decisions, deceleration at boundary transitions, the value-grounded nature of ODD, irreversibility gates, human variability, and guide posture in public-facing content. Each constraint includes what is assumed, why it matters, what it forces, and when it does not apply. These are not universal best practices but reflect specific environments and problems.

## Outline

- Offline-First (Default)
- Long Timelines & Changing Ownership
- Maintainability Over Cleverness
- Interoperability Over Feature Completeness
- Stateless or Low-State by Default
- AI as Accelerator, Not Authority
- Evidence Over Assertion
- UX Is Contextual, Not Universal
- Ephemeral Artifacts Are Acceptable
- Explicit Tradeoffs
- Work-Unit Self-Containment
- [Single-Agent Integrity Precedes Collaboration](/canon/constraints/single-agent-integrity-precedes-collaboration.md)
- [Encode Epistemic Decisions](/canon/constraints/encode-epistemic-decisions.md)
- [Boundary Transitions Require Deceleration](/canon/constraints/boundary-transitions-require-deceleration.md)
- [ODD Is a Value-Grounded Epistemic OS](/canon/constraints/odd-is-epistemic-os-not-values.md)
- [No Irreversible Action Without Epistemic Justification](/canon/constraints/no-irreversible-action-without-epistemic-justification.md)
- [Humans Are Variable Inputs](/canon/constraints/humans-are-variable-inputs.md)
- [Guide Posture — We Enter Their Story, Not the Other Way Around](/canon/constraints/guide-posture.md)
- **ODD-Level Constraints** (universal, in `/odd/constraint/`):
  - [Anti-Metric Laundering](/odd/constraint/anti-metric-laundering.md) — A system that cannot surface its own blind spots will optimize to protect them
  - [Anti-Cache Lying](/odd/constraint/anti-cache-lying.md) — A cache of derived content is a polite lie; only content-addressed storage is acceptable
  - [Use Only What Hurts](/odd/constraint/use-only-what-hurts.md) — Prevents ODD from becoming heavy, coercive, or self-justifying

---

## Operating Constraints

- MUST design for offline-first unless explicitly stated otherwise; core functionality must work without network
- MUST treat AI as accelerator, not authority; this constraint is always in effect with no exceptions
- MUST verify work with evidence; assertions like "it works" are insufficient
- MUST keep work-unit artifacts self-contained; all context necessary to understand and execute a unit must be co-located or explicitly referenced from a single entry point
- MUST make tradeoffs explicit and visible; every decision excludes alternatives
- MUST assume systems will outlive original creators and change hands
- MUST establish single-agent integrity before scaling collaboration; integrity precedes participation
- MUST encode epistemic decisions so settled ground stays settled and reasoning compounds
- MUST decelerate at boundary transitions; speed inside a boundary does not justify speed across boundaries
- MUST NOT use ODD as a moral authority or ideological enforcement mechanism; ODD is value-grounded with an unconditional commitment to truth, but does not define what is morally correct or who decides
- MUST NOT take irreversible action without documented epistemic justification; defer commitment until epistemic thresholds are met
- MUST NOT design systems that assume humans behave consistently, remember steps, or compensate for missing affordances; failure attributed to user error is a system design failure
- MUST lead all public-facing content with the user's pain before introducing system terminology; guide posture governs the order of encounter

---

## Defaults

- Assume network is unreliable; data stored locally first, sync is opportunistic
- Prefer simple, boring, maintainable solutions over clever ones
- Prefer open formats, loose coupling, and clear interfaces over feature completeness
- Prefer stateless or low-state architectures; explicit state boundaries when state is needed
- Prefer ephemeral artifacts with durable principles; focus on outcomes over repos
- Prefer context-specific UX decisions over universal patterns

---

## Failure Modes

- **Hidden State**: Global state, implicit lifecycle, or "reaching for" state instead of passing it
- **Tribal Knowledge**: Systems that require undocumented expertise to operate or maintain
- **Clever Code**: Solutions that only the original author understands
- **Tight Coupling**: Small changes causing widespread breakage; teams blocked on shared components
- **AI as Oracle**: Treating unverified AI output as authoritative truth
- **Scattered Work Units**: Artifacts spread across locations, causing incomplete context and drift
- **Premature Collaboration**: Scaling participation before single-agent integrity is established; noise compounds before signal is stable
- **Epistemic Amnesia**: Decisions re-litigated because they were never encoded; settled ground treated as open ground
- **Boundary Rushing**: Speed inside a boundary used to justify speed across a boundary; transitions skipped rather than decelerated
- **Irreversible Overcommit**: Committing before epistemic thresholds are met; action taken before claims are tested
- **Human System Blame**: Failures attributed to user error rather than system design; "they should have remembered" instead of redesigning the affordance
- **Hero Posture**: Public-facing content that leads with system terminology or methodology before establishing the user's problem; centering the product instead of the user

---

## Verification

- System works without network (for offline-first requirements)
- Evidence produced demonstrates actual behavior, not assertion
- Tradeoffs documented with explicit acknowledgment of downsides
- Work unit can be understood from its entry point without reading the rest of the system
- Next maintainer (who is not the author) can understand and modify the system
- Single-agent output is coherent and trustworthy before additional agents or collaborators are introduced
- Epistemic decisions are recorded; the same question does not need to be re-litigated in a subsequent session
- Boundary transitions are preceded by explicit deceleration; mode changes are not made at speed
- Irreversible actions are preceded by documented epistemic justification; no commitment taken before thresholds are met
- System failures are analyzed for design-level causes; "user forgot to" is treated as a system deficiency, not a user deficiency
- Public-facing content leads with the user's problem before naming the system; the system is introduced as a plan, not an opening

---

## Content

> This is written in first person, website-ready, and structured so agents can reliably translate it into neutral/system constraints at runtime.

Each constraint includes:
- what I assume
- why it matters
- what it forces
- when it doesn't apply

That last part is critical to avoid dogma.

This page documents the defaults and constraints I design under most often.
They are not universal best practices. They reflect the environments and problems I regularly work in.

Unless explicitly stated otherwise, these constraints should be assumed to apply.

---

## 1. Offline-First (Default)

I design as if network connectivity is unreliable, intermittent, or unavailable.

**Why this matters**

Many of the contexts I work in:
• have poor or inconsistent internet access
• require field use
• cannot assume cloud availability

Designs that fail offline tend to fail catastrophically.

**What this forces**
• Core functionality must work without a network
• Data is stored locally first
• Synchronization is opportunistic, not assumed
• Conflicts are expected and must be resolvable

**When this does not apply**
• Short-lived internal tools
• One-off demos where offline support would distort the experiment
• Explicitly cloud-only systems (must be stated)

---

## 2. Long Timelines & Changing Ownership

I assume systems will live longer than their original creators and will change hands.

**Why this matters**

Many projects:
• span years, not months
• outlast funding cycles
• rotate maintainers or organizations

Systems that assume stable ownership tend to rot.

**What this forces**
• Clear separation of concerns
• Minimal hidden state
• Explicit documentation as part of the product
• Avoidance of "tribal knowledge" dependencies

**When this does not apply**
• Throwaway prototypes
• Time-boxed experiments with a defined end date

---

## 3. Maintainability Over Cleverness

I default to solutions that are easy to understand, modify, and repair.

**Why this matters**

Maintenance cost usually exceeds build cost, especially over long timelines.

**What this forces**
• Preference for simple, boring solutions
• Avoidance of unnecessary abstractions
• Clear tradeoffs documented when complexity is introduced

**When this does not apply**
• Exploratory research prototypes
• Performance-critical paths where simplicity is insufficient

---

## 4. Interoperability Over Feature Completeness

I prioritize systems that can work with others over systems that try to do everything.

**Why this matters**

Closed or tightly coupled systems:
• limit collaboration
• increase lock-in
• age poorly

Interoperable systems survive organizational change.

**What this forces**
• Preference for open formats and protocols
• Loose coupling between components
• Clear interfaces instead of shared internals

**When this does not apply**
• Highly specialized tools with no external integration needs
• Temporary scaffolding code

---

## 5. Stateless or Low-State by Default

I default to stateless or low-state architectures where possible.

**Why this matters**

State increases:
• complexity
• failure modes
• recovery cost

Stateless systems are easier to reason about and recover.

**What this forces**
• Explicit state boundaries
• Externalized persistence where necessary
• Clear lifecycle management

**When this does not apply**
• Systems whose core value is stateful (e.g., editors, long-running workflows)
• Performance-critical stateful processes (must be justified)

---

## 6. AI as Accelerator, Not Authority

I treat AI as a tool to accelerate thinking and execution, not as a source of truth.

**Why this matters**

AI systems:
• hallucinate
• optimize for plausibility, not correctness
• require human judgment

Unverified AI output is a liability.

**What this forces**
• Human-defined outcomes
• Verification and evidence requirements
• Explicit refusal when confidence is not warranted

**When this does not apply**
• None. This constraint is always in effect.

---

## 7. Evidence Over Assertion

I do not consider work complete unless it is verified with evidence.

**Why this matters**

Assertions like "it works" are unreliable without proof.

**What this forces**
• Running the system
• Observing behavior
• Producing visual or test evidence

**When this does not apply**
• Purely conceptual or theoretical work (must be labeled as such)

---

## 8. UX Is Contextual, Not Universal

I do not assume a single UX pattern works everywhere.

**Why this matters**

Users vary by:
• language
• culture
• technical experience
• environment

Universal UX claims often hide bias.

**What this forces**
• Context-specific design decisions
• Willingness to diverge from mainstream patterns
• Clear explanation of UX tradeoffs

**When this does not apply**
• Internal tools for a well-defined, homogeneous user group

---

## 9. Ephemeral Artifacts Are Acceptable

I assume many outputs (code, UI, builds) are temporary.

**Why this matters**

AI makes regeneration cheap. Maintaining everything forever is unnecessary.

**What this forces**
• Focus on outcomes over artifacts
• Willingness to discard and regenerate
• Durable principles instead of durable repos

**When this does not apply**
• Canonical data
• Long-term user content
• Legal or compliance artifacts

---

## 10. Explicit Tradeoffs

I expect tradeoffs to be named, not hidden.

**Why this matters**

Every decision excludes alternatives. Unspoken tradeoffs cause confusion later.

**What this forces**
• Short explanations of why choices were made
• Acknowledgment of downsides
• Easier future revision

**When this does not apply**
• Truly trivial decisions

---

## 11. Work-Unit Self-Containment

> **D0016 (Structure-Agnostic ODD):** The prescribed `products/<lane>/` directory model has been superseded. The surviving principle — self-containment of work units — is retained here decoupled from any directory convention.

I require units of work to be self-contained and independently coherent.

**Why this matters**

When the artifacts that define a unit of work are scattered:
• Agents load incomplete context
• Documentation drifts from implementation
• Units cannot be moved, archived, or reasoned about in isolation
• "Where does X live?" becomes a recurring question

**What this forces**
• All artifacts necessary to understand and execute a unit of work must be co-located or explicitly referenced from a single entry point
• No implicit dependency on context that lives outside the unit's scope
• A unit can be understood without reading the rest of the system
• If creating artifacts outside a unit's scope, stop and reconsider whether the boundary is correctly drawn

**When this does not apply**
• Shared canon (which units reference but do not own)
• Cross-unit tooling (which is unit-agnostic by design)
• Legacy paths being migrated (must be documented and time-boxed)

---

## Closing Note

These constraints define how I default, not how everyone should build.

Agents and collaborators should:
• assume these constraints apply
• translate them into neutral/system requirements
• explicitly note when a constraint is overridden or does not apply
