---
uri: klappy://odd/maturity
title: "Project Maturity & Progressive Governance"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: semi_stable
tags: ["maturity", "governance"]
relevance: supporting
execution_posture: operational
---

# Project Maturity & Progressive Governance

> When to apply rigor, not just what rigor exists.

## Description

Project maturity defines how constraints and policies change as a project matures. Three levels exist: Level 0 (PoC/Exploration) focuses on learning quickly with non-authoritative artifacts; Level 1 (Pilot/Product) delivers value safely with evidence, visual proof, and explicit tradeoffs; Level 2 (Production/Long-Term) sustains trust with measurable outcomes, observability, security, and explicit stop conditions. Rigor increases with maturity. Projects should move up when others depend on them, artifacts persist, decisions become costly to reverse, or trust is implicitly assumed.

## Outline

- Core Principle: Rigor increases with maturity
- Level 0 — PoC / Exploration
- Level 1 — Pilot / Product
- Level 2 — Production / Long-Term
- Relationship to Other Canon Documents
- Agent Expectations
- Escalation Rules

---

## Content

**Canon v0.1**

> This governance axis tells agents *when* to apply rigor, not just what rigor exists.

This page defines how my principles, constraints, and policies change as a project matures.

Not every project needs the same level of rigor on day one.
Applying production-level governance to exploratory work kills learning.
Failing to apply it later destroys trust.

This model exists to activate the right constraints at the right time.

---

## 📌 Core Principle

I do not apply all rules equally at all times.

Rigor increases with maturity.
Exploration comes first. Governance comes later.

Every project must explicitly state its current maturity level.

---

## 📋 Maturity Levels Overview

I use three maturity levels:

1. PoC / Exploration
2. Pilot / Product
3. Production / Long-Term

These levels are not about importance.
They are about risk, trust, and dependency.

---

## 🔬 Level 0 — PoC / Exploration

**Goal:** Learn quickly and discard freely.

**Characteristics**
• Short-lived or experimental
• Ephemeral artifacts
• Low dependency from others
• High uncertainty tolerated

What applies
• Prompt over code
• KISS (loosely)
• DRY (lightly)
• Consistency (local only)
• Evidence of possibility (not correctness)

What does not apply yet
• Formal observability
• Cost optimization
• Trust or authority boundaries
• Production security guarantees
• Long-term reversibility planning

Required labeling

“This is a PoC. Outputs are exploratory and non-authoritative.”

Critical rule

Nothing at this level is considered final or trusted.

---

## 🚀 Level 1 — Pilot / Product

**Goal:** Deliver real value safely to real users.

**Characteristics**
• Repeated use
• Growing user expectations
• Shared ownership begins
• Partial persistence

What turns on
• Definition of Done & Evidence Policy
• Visual proof for UI behavior
• Explicit tradeoffs
• Basic observability
• Reversibility for major decisions
• Defined human approval points

New obligation

If users depend on it, it must be verifiable.

Risk posture

Failure is acceptable, but silent failure is not.

---

## ✅ Level 2 — Production / Long-Term

**Goal:** Sustain trust over time.

**Characteristics**
• Canonical or authoritative data
• External dependencies
• Organizational or reputational risk
• Long timelines

What becomes mandatory
• Measurable outcomes with metrics
• Continuous feedback loops
• Full observability
• Trust & authority boundaries
• Cost predictability
• Security and privacy defaults
• Explicit stop conditions for autonomy

Critical rule

Nothing enters production without:
• a named owner
• an undo path
• an audit trail

At this level, correctness and trust outweigh speed.

---

## 🔗 Relationship to Other Canon Documents

This maturity model modulates the following:
• Constraints
Some constraints are optional at PoC and mandatory later.
• Decision Rules
Rules like KISS and Borrow→Bend→Break→Beget→Build (`canon/methods/borrow-bend-break-beget-build.md`) apply at all levels, but escalation thresholds change.
• Definition of Done
Evidence requirements increase with maturity.
• Self-Audit Checklist
More items become non-optional as maturity increases.
• Visual Proof Standards
Optional for PoCs, required for Pilot and Production.

---

## 🤖 Agent Expectations

Agents and collaborators are expected to:
• explicitly state the project’s maturity level
• apply only the rules required for that level
• refuse to over-govern PoCs
• refuse to under-govern Production systems

If maturity is unclear, the correct action is to ask.

---

## ⚠️ Escalation Rules

A project should move up a maturity level when:
• others begin depending on it
• artifacts persist beyond initial intent
• decisions become costly to reverse
• trust is implicitly assumed

A project may move down only with explicit acknowledgment.

---

## 💡 Closing Note

This model exists to protect both:
• exploration, and
• trust.

Rigor too early kills creativity.
Rigor too late kills credibility.

Progressive governance keeps both alive.

---

Status
• Canon v0.1 — Project Maturity complete
• Canon now supports lifecycle-aware enforcement

---

What This Unlocks (Important)

With this file added, agents can now:
• ask for or infer maturity
• activate the correct checks automatically
• avoid overbuilding PoCs
• avoid underbuilding production systems

This completes the missing dimension you identified.

---

Suggested Next Moves (Choose One) 1. Update ODD Manifesto → ODD + Maturity 2. Agent Handoff Instruction (now maturity-aware) 3. MCP schema that exposes maturity as a first-class field 4. Refactor existing canon docs to reference maturity thresholds

Say which you want next, and we’ll continue cleanly.
