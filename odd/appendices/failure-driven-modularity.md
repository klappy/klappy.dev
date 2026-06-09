---
uri: klappy://odd/appendices/failure-driven-modularity
kind: odd
title: "Failure-Driven Modularity"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "evolution", "modularity", "regenerability"]
relevance: supporting
execution_posture: operational
target_repo: "outcomes-driven-development"
---

# Failure-Driven Modularity

> Modular boundaries emerge from repeated failure, not upfront design.

## Description

In ODD, modular boundaries are introduced only after repeated, documented failure to regenerate a system from its specification. Successful regeneration proves the system remains cognitively tractable as a single unit. A failure is when the generated system diverges materially, constraints are repeatedly omitted, specifications need ad hoc re-explanation, or attempts converge inconsistently. Only patterned failure justifies decomposition. The evolution rule: begin with the smallest viable specification, attempt regeneration, do not modularize if it succeeds, extract the smallest region of cognitive overload if it fails repeatedly.

## Outline

- Summary
- Definition of Failure
- The Evolution Rule
- Rationale
- Implications
- Non-Goals
- Related Canon

---

## Content

Successful regeneration is evidence that the system remains cognitively tractable as a single unit.
Repeated failure is evidence that the boundary is incorrect and must be revised.

Modularity is therefore an *outcome of failure*, not a prerequisite for success.

---

## Definition of Failure

A regeneration attempt is considered a **failure** when one or more of the following occur
despite reasonable effort:

- The generated system diverges materially from the intended behavior.
- Critical constraints are repeatedly omitted or misapplied.
- The specification must be re-explained in ad hoc or situational ways.
- Multiple regeneration attempts converge inconsistently.

Single failures are not sufficient.
Only **patterned failure** justifies decomposition.

---

## The Evolution Rule

1. Begin with the smallest viable specification that expresses the desired outcome.
2. Attempt full regeneration from that specification.
3. If regeneration succeeds, **do not modularize**.
4. If regeneration fails repeatedly:
   - Identify the smallest region of cognitive overload.
   - Extract that region into its own independently regenerable specification.
5. Repeat recursively.

This process continues until each module can be regenerated reliably and independently.

---

## Rationale

Traditional software architecture encourages early modularization based on anticipated reuse.
This introduces speculative boundaries, premature abstractions, and unnecessary coordination cost.

ODD replaces prediction with evidence.

A boundary is justified **only when failure proves it necessary**.

---

## Implications

- Architectural structure emerges empirically.
- Teams do not need shared architectural taste, only shared failure criteria.
- Systems evolve without centralized design authority.
- Regeneration remains feasible as complexity increases.

---

## Non-Goals

Failure-Driven Modularity does **not** claim that:

- All systems should be maximally decomposed.
- Regeneration will always succeed.
- Existing stable systems must be restructured.

It applies only to systems being actively evolved under ODD.

---

## Related Canon

- Reproducibility Test
- Outcome Promotion vs Artifact Preservation
- Regenerability as a First-Class Constraint

---

## Derivation

For historical and conceptual motivation, see:

> **From Reusability to Regenerability**  
> Canonical Derivation, `/canon/derivations/reusability-to-regenerability.md`
