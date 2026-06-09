---
uri: klappy://odd/prompt-architecture
kind: odd
title: "Prompt Architecture"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "prompt-architecture", "orchestration"]
relevance: supporting
execution_posture: operational
target_repo: "outcomes-driven-development"
---

# Prompt Architecture (Orientation)

> How intent scales without collapsing into a monolithic prompt.

## Description

Prompt architecture addresses the God Prompt anti-pattern: as scope grows, prompts become monolithic, unmaintainable, sensitive to small edits, context-bloated, and inconsistent. The alternative is Orchestrated Intent: keep stable intent in canonical artifacts, construct task prompts dynamically, use smaller focused agents for bounded tasks, pass results through shared constraints and evidence standards. Intent is layered: Worldview (rarely changes), Project Intent (changes occasionally), Task Intent (changes constantly). Only the bottom layer should enter the working prompt in full detail. Context budgeting treats every token like a limited resource.

## Outline

- The Anti-Pattern: Prompt Maximalism (God Prompt)
- The Alternative: Orchestrated Intent
- Intent Graph (Mental Model)
- Context Budgeting
- Maturity Note
- Failure Mode of Orchestration

---

## Content

**Canon / ODD Appendix v0.1**

This appendix names a common scaling failure mode: the God Prompt.

As an app’s scope grows, prompts tend to grow into a single monolith that becomes:
• unmaintainable
• difficult to reason about
• sensitive to small edits
• context-bloated
• increasingly inconsistent

This is rarely intentional. It is a natural default.

---

## ⚠️ The Anti-Pattern: Prompt Maximalism ("God Prompt")

What it looks like
• One prompt tries to cover:
• product requirements
• system constraints
• UI conventions
• coding standards
• edge cases
• release steps
• testing expectations
• The prompt becomes the “real system,” and code becomes an artifact of that prompt.

Why it fails
• Cognitive load explodes
• Context bloat crowds out task-relevant details
• Small edits have unpredictable consequences
• The prompt becomes a fragile dependency

---

## ✅ The Alternative: Orchestrated Intent

Instead of one prompt that does everything:
• keep stable intent in canonical artifacts (ODD + Canon)
• construct task prompts dynamically
• use smaller focused agents for bounded tasks
• pass results through shared constraints and evidence standards

In this model:
• the Canon is the constitution
• the task prompt is a temporary work order
• the output is verified by evidence, not confidence

---

## 🧭 Intent Graph (Mental Model)

Think of intent as layered:

1. **Worldview** (rarely changes) — ODD, constraints, decision rules
2. **Project intent** (changes occasionally) — PRD, scope, priorities, maturity level
3. **Task intent** (changes constantly) — the specific job to be done right now

Only the bottom layer should enter the working prompt in full detail.

---

## 💰 Context Budgeting (A Simple Heuristic)

Treat context like a budget:
• Every token spent on generic policy reduces tokens available for task specifics.
• The goal is not “more context,” but “relevant context.”

A healthy system prefers:
• small, precise context
• stable references by URI
• on-demand retrieval

---

## 📊 Maturity Note (Intentionally Light)

- **PoC:** A larger prompt may be acceptable for speed, as long as it is treated as disposable.
• Pilot: Prompt growth becomes a risk. Begin splitting tasks and referencing canonical resources.
• Production: Monolithic prompts become a liability. Orchestrated intent and bounded sub-tasks become the default.

This is not a rule. It is a scaling reality.

---

## ⚠️ Failure Mode of Orchestration (So We Don't Romanticize It)

Orchestration can fail too.

Common orchestration failure modes:
• semantic drift across sub-agents
• inconsistent assumptions
• extra coordination overhead
• loss of a single coherent narrative

The mitigation is not “more instructions,” but:
• shared canonical references
• explicit evidence requirements
• clear boundaries between tasks

---

## 💡 Closing

When prompts grow without bound, the system becomes fragile.

ODD favors:
• stable intent captured in canonical artifacts
• small prompts constructed for the task at hand
• verification through evidence rather than explanation

---

## ✅ Status

- Appendix v0.1 complete
- Orientation-only
- No enforcement semantics

---

## 🔗 Why This Fits Your Pillars
• KISS: It discourages giant prompts; encourages small bounded contexts.
• DRY: Canonical references prevent repeating the same boilerplate in every prompt.
• Consistency: Canon provides a stable “source of truth” across sub-agents.
• Maintainability: Prompts become smaller, modular, and replaceable.
• Antifragile: Smaller tasks fail faster and recover easier.
• Scalable: Orchestration scales better than monoliths.
• Prompt-over-code: This is the application of that principle at scale.

---
