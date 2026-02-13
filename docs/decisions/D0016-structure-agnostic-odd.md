---
uri: klappy://docs/decisions/D0016
title: "D0016: Structure-Agnostic ODD (E0005.1)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "structure", "portability", "lanes", "epoch-5"]
epoch: E0005
date: 2026-02-12
derives_from: "canon/values/axioms.md (Axiom 1 — Reality Is Sovereign)"
supersedes: "D0009, D0011 (partially), D0013, D0015"
---

# D0016: Structure-Agnostic ODD (E0005.1)

> Prescribed product lanes, attempt folder conventions, and lane-scoped tooling are superseded by dynamic epistemic routing through OddKit. The concepts of independent product evolution, restartability, and evidence gating remain core ODD — they are now handled by epistemic tooling rather than directory conventions. ODD is portable epistemic infrastructure that works in any repo structure where canon is addressable.

## Summary — Folder Conventions Were External Compliance; OddKit Is Internal Orientation

In practice, rigid lane structures (products/<lane>/PRD.md, products/<lane>/attempts/prd-vX.Y/attempt-NNN/) created more friction than value. OddKit's epistemic tooling — orient, challenge, gate, encode — dynamically handles when to steer existing work versus starting fresh with a clean PRD, learnings, Definition of Done, and constraints. The prescribed implementation was a form of external compliance that Epoch 5's shift to internal orientation made unnecessary.

This is E0005.1: the same invariant ("epistemic systems require moral commitments to be finite") applied to structural prescriptions. No new epoch is declared because no new assumption about reality is introduced.

## Context

The multi-lane architecture was introduced in D0009 and formalized in the ODD System Contract 2.0.0 (D0011). It served its purpose: it proved that independent products can share canon without sharing lifecycle. That learning is durable. The folder conventions that encoded it are not.

The lane-era products did not fail — they graduated. Four standalone projects now exist as independent repos (oddkit.klappy.dev, odd.klappy.dev, klappy.dev, apocrypha.klappy.dev), each exercising ODD concepts without prescribed directory conventions. The lane structure was scaffolding; the products outgrew it.

### Evidence That Prescribed Structure Created Friction

**1. The Ritual Is Mind-Numbing (products/odd-teaser, 2026-01-31)**

A documented learning from the odd-teaser lane's attempt workflow captured the core failure:

- Ritual/process debugging consumed ~70% of session time; actual product implementation was ~20%
- "This session took hours. The actual product code was ~200 lines. The ritual consumed the rest."
- At any given moment, the agent had to track: current branch name, PRD version, attempt status, META.json fields, evidence requirements, ledger scope, import mechanics, and build script behavior — "too much state for humans OR agents to reliably maintain"
- User quotes: "The ritual is mind-numbing. Make sure that persists... I don't want to lose the learning opportunity here. This is so bad, it must be studied."

Source: `products/odd-teaser/attempts/prd-v1.1/_runs/6593bb53/LEARNINGS.md`

**2. AGENT_KICKOFF.md Still Referenced E0002**

The canonical agent entry point (`docs/agents/AGENT_KICKOFF.md`) still declared "Current Epoch: E0002-multi-lane-era" — three epochs behind the actual state of the system. The lane-specific steps (lane declarations, attempt:register --lane flags, "Do NOT touch other lanes") were actively misleading agents about how the system works.

**3. OddKit Handled What Lanes Were Supposed To Handle**

OddKit's orient, challenge, and gate tools dynamically route agents to relevant context without requiring prescribed directory structures. The 246-document baseline is searchable, addressable, and navigable through epistemic tooling. The static directory conventions that lanes imposed were a less flexible, more brittle version of what OddKit does dynamically.

**4. Lane Products Graduated Into Standalone Repos**

The clearest evidence that lanes worked conceptually but not structurally: every active lane product (odd-teaser, agent-skill, fluent-mobile) evolved into standalone projects in their own repositories. The directory convention didn't enable this — it constrained it.

## Decision

1. **Product lanes are conceptual, not structural.** Products may evolve independently and share canon, but this does not require prescribed directory conventions.
2. **OddKit is the primary interface for epistemic routing.** Orient, challenge, and gate replace folder-level attempt management.
3. **The products/ directory is removed.** Its contents were klappy.dev implementation artifacts, not ODD infrastructure. Valuable artifacts (decisions, learnings, evidence, attempt records) are preserved in `docs/archive/products/`.
4. **ODD System Contract bumps to 3.0.0.** Lane-specific requirements become optional conventions. The three-tier hierarchy (ODD/Canon/Docs) and epoch model remain.
5. **Superseded docs are archived**, not deleted. Historical value is preserved; active navigation is cleaned up.
6. **Defunct implementation infrastructure is removed.** `public/`, `fluent-mobile/`, `visual/`, `projects/`, and most of `infra/` were lane-era pipeline artifacts with no remaining consumers.

## Supersedes

- **D0009**: Multi-Lane PRD Architecture — concept preserved (independent evolution), implementation superseded
- **D0011**: ODD System Contract 2.0.0 — partially superseded; three-tier hierarchy and epochs remain, lane requirements dropped
- **D0013**: Build Output Lane-Scoped — fully superseded
- **D0015**: Lane PRD Structure Alignment — fully superseded

## Consequences

- ODD documentation no longer prescribes repo structure
- Agents use OddKit to navigate, not folder conventions
- New projects adopting ODD do not inherit klappy.dev's directory layout
- Historical artifacts from the lane era remain in archive for provenance
- Four derivative works (oddkit.klappy.dev, odd.klappy.dev, klappy.dev, apocrypha.klappy.dev) demonstrate ODD's portability thesis in practice

## Alternatives Considered

- **Keep lanes as optional convention**: Rejected — "optional but documented" tends to become "expected in practice"
- **Deprecate but don't remove**: Rejected — deprecated artifacts still cause confusion when they appear in search results
- **Remove without archiving**: Rejected — provenance has value; learnings and decisions should survive the structural transition

## Status

- [x] Decision record created
- [ ] Reviewed and approved
