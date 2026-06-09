---
uri: klappy://odd/decisions/D0001
kind: canon
title: "Three-Tier Conceptual Hierarchy"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "architecture", "conceptual-model", "philosophy"]
relevance: decision
execution_posture: governing
---

# Three-Tier Conceptual Hierarchy

> ODD separates universal principles from program constraints from implementation details.

## Description

ODD is organized as a three-tier conceptual hierarchy where each layer absorbs different pressure and has different decay rates. ODD contains universal principles (timeless, product-agnostic), Canon contains program-level constraints (shared rules across products), and Docs contains implementation details (how this instance works). This separation allows ODD to outgrow any single repository without losing coherence.

## Operating Constraints

- MUST classify files using the litmus test: 10-year truth → ODD, all-products rule → Canon, local implementation → Docs
- MUST NOT conflate philosophy with plumbing; universal principles stay in ODD, implementation details stay in Docs
- MUST allow different decay rates: ODD (almost never), Canon (carefully), Docs (freely)
- MUST NOT break universal principles when fixing implementation bugs
- MUST keep ODD independent of any single repository, vendor, or implementation

---

## Defaults

- When uncertain about placement, ask: "Would this still be true if klappy.dev didn't exist?"
- ODD should almost never change; Canon evolves carefully; Docs may rot and be rebuilt
- Prefer placing content lower (Docs) unless it clearly belongs higher (Canon/ODD)
- Treat Canon as shared contract, not universal truth

---

## Failure Modes

- **Conflating Tiers**: Putting implementation decisions in ODD or philosophy in Docs
- **Premature Elevation**: Moving content to ODD before it's proven universal
- **Monolithic Thinking**: Treating all three tiers as a single philosophy
- **Decay Mismatch**: Expecting Docs-level stability from implementation details
- **Vendor Lock-in**: Embedding vendor-specific decisions into ODD or Canon

---

## Verification

- Files pass the litmus test for their tier placement
- ODD content would still be true if this repository didn't exist
- Canon changes have program-wide justification
- Docs changes don't require updates to ODD or Canon
- Teams could fork Canon while keeping ODD intact

---

## Content

## Decision

ODD is a three-tier conceptual hierarchy, not a single monolithic philosophy:

| Tier | Contains | Answers | Decay Rate |
|------|----------|---------|------------|
| **ODD** | Universal principles | "What is always true about building well?" | Almost never |
| **Canon** | Program-level constraints | "What rules do we share across products?" | Carefully |
| **Docs** | Implementation details | "How does this instance work?" | Freely |

## Status

**Active**

## The Three Tiers

### Tier 1: ODD (Universal Principles)

ODD is the root. It is:

- Not a framework
- Not a product philosophy
- Not owned by any single implementation

ODD contains:

- Progressive distillation
- Failure-driven modularity
- Visual proof > narrative confidence
- Evidence over assertion
- Elevation before optimization

**The test:** Would this still be true if klappy.dev didn't exist? If Cloudflare vanished? If LLMs were replaced?

If yes → it's ODD.

### Tier 2: Canon (Program-Level Constraints)

Canon is shared contract, not universal truth.

Canon answers: *"If you are building within this program, these are the rules we agree to."*

Canon contains:

- decision-rules
- definition-of-done
- self-audit
- misuse-patterns
- completion-report-template
- constraints (scoped to this program)

**The test:** Should all products in this program obey it?

If yes → it's Canon.

Crucially:
- Canon can change without invalidating ODD
- Two programs could share ODD but diverge in Canon

### Tier 3: Docs (Implementation Details)

Docs are the reference implementation.

Docs contain:

- Infrastructure decisions
- CLI paths
- Cloudflare specifics
- Repo structure
- Tooling affordances
- Branch naming conventions

**The test:** Is this about how *we* do it *here*?

If yes → it's Docs.

## The Litmus Test

For any file, ask:

1. **Would this still be true in 10 years?**
   - Yes → ODD
   - No → keep going

2. **Should all products in this program obey it?**
   - Yes → Canon
   - No → keep going

3. **Is this about how we do it here?**
   - Yes → Docs

If something fails all three, it probably doesn't belong at all.

## Why This Matters

This separation:

- Allows publishing ODD as a standalone essay/site
- Lets other teams adopt ODD without adopting your Canon
- Supports running multiple Canons under the same ODD
- Explains why "ODD isn't a framework"

Frameworks conflate all three layers. ODD separates them.

Different decay rates give real systems what they need:

- ODD should almost never change
- Canon is allowed to evolve carefully
- Docs are allowed to rot and be rebuilt

## Consequences

### Enables

- ODD can outgrow any single repository
- Teams can fork Canon while keeping ODD
- Implementation can be completely replaced without touching philosophy
- Clear criteria for file placement

### Prevents

- Conflating philosophy with plumbing
- Breaking universal principles when fixing implementation bugs
- Vendor lock-in at the conceptual level

### Costs

- Requires discipline to classify correctly
- Three places to look instead of one
- Harder to explain to newcomers (until they get it)

## Evidence

- D0015 (this decision) - formalizing the separation
- Canon progressive distillation effort - moved implementation decisions to docs/
- `/docs/appendices/` - now contains implementation-specific appendices
- `/docs/decisions/` - now contains implementation-specific decisions
- `/odd/appendices/` - retains only portable philosophy
