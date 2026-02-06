---
uri: klappy://odd/orientation-map
title: "ODD + Canon + Evidence — Orientation Map"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: semi_stable
tags: ["odd", "orientation", "mental-model", "outcomes-driven-development", "hierarchy"]
relevance: supporting
execution_posture: operational
---

# ODD + Canon + Evidence — Orientation Map

> A one-page mental model for the ODD system.

## Description

This orientation map provides a single-page mental model of how Intent flows through ODD Manifesto to Canon to Decisions to Evidence to Outcomes. ODD is organized as a three-tier conceptual hierarchy: ODD contains universal principles (timeless), Canon contains program-level constraints (shared rules), and Docs contains implementation details (how this instance works). Maturity moves from Exploration through Validation to Commitment. The map explicitly rejects "if it compiles, it's done" and "governance replaces judgment."

## Outline

- The Core Idea (Intent → ODD → Canon → Decisions → Evidence → Outcomes)
- How to Read This Map
- The Three-Tier Hierarchy (ODD → Canon → Docs)
- Where Maturity Lives
- What This Map Explicitly Rejects
- Why This Map Exists

---

## Content

> This is not a workflow. It is a mental model.

---

## 🎯 The Core Idea

```
        Intent
          |
          v
      ODD Manifesto
          |
          v
        Canon

(Constraints & Rules)
|
v
Decisions
|
v
Evidence
        |
        v
      Outcomes
```

---

## 📖 How to Read This Map
• ODD explains why and what we care about
• Canon explains how decisions tend to be shaped
• Decisions are local, contextual, and human
• Evidence grounds claims in reality
• Outcomes are the only thing that matters long-term

Nothing here enforces anything.
Everything here informs something.

**Canon may reference Docs. Docs must never redefine Canon.**

---

## 🏗️ The Three-Tier Hierarchy

ODD is a conceptual hierarchy, not a monolithic philosophy:

| Tier | Contains | Decay Rate |
|------|----------|------------|
| **ODD** | Universal principles (timeless, product-agnostic) | Almost never |
| **Canon** | Program-level constraints (shared rules across products) | Carefully |
| **Docs** | Implementation details (how this instance works) | Freely |

**The litmus test:**

1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

This separation allows ODD to outgrow any single repository.

See [D0001: Three-Tier Conceptual Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md).

---

## 📊 Where Maturity Lives (Not Gates)

```
Exploration ──────→ Validation ──────→ Commitment
   (PoC)            (Pilot)         (Production)
```

Rigor increases →
Evidence expectations increase →
Governance tightens →

    •	Early: bias toward learning
    •	Middle: bias toward validation
    •	Later: bias toward trust and durability

No sharp lines. No ceremony required.

---

## 🚫 What This Map Explicitly Rejects
• “If it compiles, it’s done.”
• “Trust the explanation.”
• “One true workflow.”
• “Governance replaces judgment.”

---

## 💡 Why This Map Exists
• To explain the system in under 60 seconds
• To anchor conversations without debate
• To keep humans oriented while tools change

---

## ✅ Why These Two Artifacts Are Enough for Now
• They surface risk without prescribing control
• They encode wisdom without freezing behavior
• They respect maturity without formalizing it

This keeps you aligned with:
• KISS
• Antifragility
• Prompt over code
• Convention over configuration

And most importantly:

They make misuse discussable instead of shameful.

---

## See Also

- [Cognitive Partitioning](/odd/cognitive-partitioning.md) — Why reasoning systems must divide under pressure
- [ODD Misuse Patterns](/odd/misuse-patterns.md) — Common failure modes and how ODD gets misapplied
