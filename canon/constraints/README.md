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
start_here_order: 5
start_here_label: Constraints
---

# Constraints

> Design defaults and assumptions that shape how systems are built.

## Description

Constraints define the baseline assumptions and design defaults applied to most work. They cover offline-first design, long-term maintainability, interoperability, stateless architectures, AI as accelerator (not authority), evidence over assertion, contextual UX, ephemeral artifacts, explicit tradeoffs, and lane self-containment. Each constraint includes what is assumed, why it matters, what it forces, and when it does not apply. These are not universal best practices but reflect specific environments and problems.

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
- Lane Self-Containment
- [Single-Agent Integrity Precedes Collaboration](/canon/constraints/single-agent-integrity-precedes-collaboration.md)
- [Encode Epistemic Decisions](/canon/constraints/encode-epistemic-decisions.md)
- [Boundary Transitions Require Deceleration](/canon/constraints/boundary-transitions-require-deceleration.md)
- [ODD Is an Epistemic OS, Not a Value System](/canon/constraints/odd-is-epistemic-os-not-values.md)
- [No Irreversible Action Without Epistemic Justification](/canon/constraints/no-irreversible-action-without-epistemic-justification.md)
- **ODD-Level Constraints** (universal, in `/odd/constraint/`):
  - [Anti-Metric Laundering](/odd/constraint/anti-metric-laundering.md) — A system that cannot surface its own blind spots will optimize to protect them
  - [Anti-Cache Lying](/odd/constraint/anti-cache-lying.md) — A cache of derived content is a polite lie; only content-addressed storage is acceptable
  - [Use Only What Hurts](/odd/constraint/use-only-what-hurts.md) — Prevents ODD from becoming heavy, coercive, or self-justifying

---

## Operating Constraints

- MUST design for offline-first unless explicitly stated otherwise; core functionality must work without network
- MUST treat AI as accelerator, not authority; this constraint is always in effect with no exceptions
- MUST verify work with evidence; assertions like "it works" are insufficient
- MUST keep lane artifacts self-contained; no cross-directory dependencies *(path under E0005.1 review)*
- MUST make tradeoffs explicit and visible; every decision excludes alternatives
- MUST assume systems will outlive original creators and change hands
- MUST establish single-agent integrity before scaling collaboration; integrity precedes participation
- MUST encode epistemic decisions so settled ground stays settled and reasoning compounds
- MUST decelerate at boundary transitions; speed inside a boundary does not justify speed across boundaries
- MUST NOT use ODD as a value system, moral authority, or ideological enforcement mechanism

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
- **Scattered Lanes**: Lane artifacts spread across directories, causing incomplete context and drift

---

## Verification

- System works without network (for offline-first requirements)
- Evidence produced demonstrates actual behavior, not assertion
- Tradeoffs documented with explicit acknowledgment of downsides
- Lane can be understood by reading only its directory *(path under E0005.1 review)*
- Next maintainer (who is not the author) can understand and modify the system

---

## Content

**Canon v0.1**

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

## 11. Lane Self-Containment

> ⚠️ **E0005.1 Review:** This constraint references the `products/<lane>/` directory model which has been archived as part of E0005.1 (Structure-Agnostic ODD). The substantive principle (self-containment of work units) may be preserved in revised form. This section is under human review — do not delete or rewrite.

I require product lanes to be self-contained units.

**Why this matters**

When lane artifacts are scattered across directories:
• Agents load incomplete context
• Documentation drifts from implementation
• Lanes cannot be moved, archived, or reasoned about as units
• "Where does X live?" becomes a recurring question

**What this forces**
• PRD, README, attempts, src, and all lane artifacts live within `products/<lane>/`
• No cross-directory dependencies for lane-specific content
• A lane can be understood by reading only its directory
• If creating lane artifacts outside the lane folder, stop and reconsider

**When this does not apply**
• Shared canon (which lanes reference but do not own)
• Cross-lane tooling (which is lane-agnostic by design)
• Legacy paths being migrated (must be documented and time-boxed)

---

## 💡 Closing Note

These constraints define how I default, not how everyone should build.

Agents and collaborators should:
• assume these constraints apply
• translate them into neutral/system requirements
• explicitly note when a constraint is overridden or does not apply

---

## ✅ Status

- Canon v0.1 — Constraints complete
- Ready to proceed to Canon v0.1 — Decision Rules
