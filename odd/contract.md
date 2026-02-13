---
uri: klappy://odd/contract
title: "ODD System Contract"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "contract", "version", "semver", "compatibility", "structure-agnostic"]
relevance: decision
execution_posture: governing
epoch: E0005
derives_from: "canon/values/axioms.md (Axiom 1 — Reality Is Sovereign)"
---

# ODD System Contract

> The single source of truth for ODD workflow compatibility. ODD is structure-agnostic portable epistemic infrastructure — it works in any repo where canon is addressable. Version 3.0.0 removes prescribed directory conventions; epistemic routing is handled by OddKit tooling.

## Description

The ODD System Contract versions the three-tier hierarchy (ODD/Canon/Docs), epistemic tooling interface (OddKit), provenance requirements, and evidence standards. Version 3.0.0 drops lane-specific structural requirements in favor of dynamic epistemic routing through OddKit. The concepts of independent product evolution, restartability, and evidence gating remain core ODD — they are now handled by tooling rather than directory conventions. Canon must be addressable; repo layout is an implementation choice.

## Outline

- What This Versions
- Operating Constraints
- Three-Tier Hierarchy
- Epochs
- OddKit Epistemic Tooling Interface
- Compatibility
- Version History
- Related Documents

---

## Operating Constraints

- MUST follow three-tier hierarchy: ODD (universal) → Canon (program) → Docs (implementation)
- MUST declare epoch context for historical comparisons; outcomes are not comparable across epochs without explicit adjustment
- MUST use OddKit for epistemic routing (orient, challenge, gate, encode, search, validate)
- MUST satisfy Definition of Done requirements before claiming completion (see `canon/constraints/definition-of-done.md`)
- MUST keep canon addressable — OddKit must be able to search, retrieve, and cite any canon document
- MUST NOT prescribe repo directory structure — ODD works in monorepos, multi-repos, or any layout where canon is addressable

---

## Defaults

- When uncertain about file placement, use the litmus test: 10-year truth → ODD, all-products rule → Canon, local implementation → Docs
- Treat epoch boundaries as evaluation discontinuities, not version bumps
- Reference this document for system compatibility questions
- Use OddKit orient for routing decisions; do not rely on directory conventions

---

## Failure Modes

- **Cross-Epoch Comparison**: Comparing outcomes across epochs without adjustment distorts evaluation
- **Tier Confusion**: Placing implementation details in ODD or universal principles in Docs
- **Structural Prescription**: Requiring specific directory layouts as part of ODD methodology
- **Tooling Bypass**: Navigating by folder structure instead of using OddKit for epistemic routing
- **Evidence Skipping**: Claiming completion without meeting Definition of Done requirements

---

## Verification

- Documents placed according to litmus test (10-year, all-products, local)
- Epoch boundaries respected in any outcome comparison
- OddKit can search, retrieve, and cite all active canon documents
- Definition of Done requirements met before completion claims
- No directory layout assumptions embedded in methodology docs

---

## Content

**Current Version:** 3.0.0

This document is the single source of truth for the ODD workflow contract version.

All other documents reference this version. Individual projects and artifacts have their own versioning schemes, but compatibility with the ODD system is determined by this contract.

---

## What This Versions

The ODD System Contract covers:

- **Three-tier hierarchy** (ODD → Canon → Docs)
- **OddKit epistemic tooling interface** (orient, challenge, gate, encode, search, validate)
- **Evidence standards** (what counts as proof — see Definition of Done)
- **Epoch model** (evaluation context boundaries)
- **Provenance requirements** (decisions, learnings, evidence must be captured)

The contract does NOT prescribe:

- Directory layouts or folder naming conventions
- Specific tooling commands (register/nuke/finalize/promote are superseded)
- PRD file locations or attempt folder structures
- Build systems, deployment targets, or infrastructure configuration

---

## Three-Tier Hierarchy (3.0.0)

ODD is organized as a conceptual hierarchy with different decay rates:

| Tier | Location | Contains | Decay Rate |
|------|----------|----------|------------|
| **ODD** | `/odd/` | Universal principles (timeless, product-agnostic) | Almost never |
| **Canon** | `/canon/` | Program-level constraints (shared rules across products) | Carefully |
| **Docs** | `/docs/` | Implementation details (how this instance works) | Freely |

**The litmus test:**
1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

See [D0001: Three-Tier Conceptual Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md).

---

## Epochs

Epochs mark shifts in the evaluation landscape. Contract versions and epochs are related but distinct:

| Epoch | Contract Version | Description |
|-------|------------------|-------------|
| E0001 | 1.x | Single PRD era — single PRD, single product |
| E0002 | 2.x | Multi-lane era — prescribed directory conventions for product isolation |
| E0003 | 2.x | Evidence-first era — evidence requirements formalized |
| E0004 | 2.x | Canon migration era — three-tier hierarchy established |
| E0005 | 3.0.0 | Values-first epistemics — axioms, creed, internal orientation |
| E0005.1 | 3.0.0 | Structure-agnostic ODD — directory conventions replaced by OddKit routing |

**Rule:** Do not compare outcomes across epochs without explicit adjustment.

See `docs/appendices/epochs.md` for epoch semantics.

---

## OddKit Epistemic Tooling Interface

OddKit is the primary interface for epistemic routing in ODD. It replaces the prescribed tooling commands (register/nuke/finalize/promote) with dynamic, context-aware tools:

| Tool | Purpose | Replaces |
|------|---------|----------|
| `oddkit_orient` | Assess epistemic mode, surface unresolved items | Attempt registration context |
| `oddkit_challenge` | Pressure-test claims against canon constraints | Manual review checklists |
| `oddkit_gate` | Check transition readiness between modes | Attempt finalization gates |
| `oddkit_encode` | Record decisions as durable artifacts | Manual decision logging |
| `oddkit_search` | Find relevant canon by meaning | Directory-based navigation |
| `oddkit_validate` | Verify completion claims against required artifacts | Manual evidence checking |
| `oddkit_get` | Fetch specific canonical documents by URI | File path lookups |
| `oddkit_catalog` | List available documentation | Directory listings |
| `oddkit_preflight` | Pre-implementation constraint check | Kickoff checklists |

These tools are self-describing via MCP. Do not hardcode tool names or parameters — the MCP server advertises the current API.

---

## Compatibility

### Forward Compatibility
Documents written for contract 3.x may reference OddKit tools that are not available in 2.x environments. The three-tier hierarchy and epoch model are unchanged.

### Backward Compatibility
- Epoch 1-4 artifacts remain valid historical records
- Lane-era directory conventions are not "wrong" — they were a specific implementation that served its purpose
- Lane-era tooling commands (register/nuke/finalize/promote) are no longer operational
- Historical artifacts should be marked with appropriate epoch context

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 3.0.0 | 2026-02-12 | Structure-agnostic ODD; lane requirements removed; OddKit as primary epistemic interface |
| 2.1.0 | 2026-01-21 | Three-tier hierarchy (ODD/Canon/Docs), ODD at root level |
| 2.0.0 | 2026-01-17 | Multi-lane architecture, epoch requirements |
| 1.x | Pre-2026-01-17 | Single PRD era (implicit, never formally versioned) |

---

## Related Documents

- Decision log: `docs/decisions/D0016-structure-agnostic-odd.md`
- Prior contract decision: `docs/decisions/D0011-odd-contract-2.0.0.md`
- Epochs: `docs/appendices/epochs.md`
- Alignment Reviews: `odd/appendices/alignment-reviews.md`
- Definition of Done: `canon/constraints/definition-of-done.md`
- Axioms: `canon/values/axioms.md`
