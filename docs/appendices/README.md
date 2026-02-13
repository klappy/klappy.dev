---
uri: klappy://docs/appendices
title: "Implementation Appendices"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["docs", "appendices", "implementation", "reference", "index"]
---

# 📚 Implementation Appendices

Implementation-specific appendices that document how klappy.dev applies ODD concepts. These are reference implementation details, not portable methodology.

> **Relationship to ODD:** Portable concepts live in `/odd/appendices/`. This folder contains the klappy.dev-specific implementation of those concepts.

---

## 📁 Contents

### Evidence

| File | Title | Summary |
|------|-------|---------|
| `evidence.md` | Evidence | Evidence requirements including `/_evidence/` path structure and `.attempt.json` schema. |
| `online-evidence.md` | Online Evidence Requirement | Attempts are invalid without online preview URLs via Cloudflare Pages. |

### Compilation & Memory

| File | Title | Summary |
|------|-------|---------|
| `compiled-memory.md` | Compiled Memory | Wipeable, auditable compressed artifacts with specific output paths. |
| `canonical-compression.md` | Canonical Compression | How derived, minimal working models are produced with `_compiled/` output locations. |

### Repository Structure

| File | Title | Summary |
|------|-------|---------|
| `repo-topology.md` | Repository Topology | What lives where and what changes when. Post-lane structure. |
| `repo-truth.md` | Repository Truth | Branch roles (`prod`, `main`) and cleanup. |
| `drift-checks.md` | Drift Checks | `npm run verify:contracts` and drift prevention with specific contracts. |
| `epochs.md` | Epochs | Named periods (E0001–E0005) and era transitions. |

### Archived (moved to `docs/archive/`)

The following docs were archived as part of E0005 (Structure-Agnostic ODD):

- `product-lanes.md`, `lane-implementation-surfaces.md`, `lane-build-layout.md` — lane-specific structure
- `attempt-lifecycle.md`, `deploy-evidence.md` — attempt/deploy procedures
- `compilation.md`, `compilation-targets.md`, `context-packs-and-projection-detail.md` — compilation procedures
- `ATTEMPTS.md`, `ATTEMPT_KICKOFF.md` — attempt workflow docs

---

## 🔧 What Makes These Implementation-Specific

These appendices contain:

- Absolute paths specific to this repository (`/docs/`, `/canon/`, `/odd/`)
- Specific CLI commands (`npm run verify:contracts`)
- Branch names specific to this workflow (`prod`, `main`)
- Tool-specific configuration (Cloudflare Pages)

---

## 🧭 When to Read What

**Understanding evidence requirements?** Read `evidence.md` and `online-evidence.md`.

**Building compilation packs?** Read `compiled-memory.md` and `canonical-compression.md`.

**Debugging drift?** Read `drift-checks.md` and `repo-truth.md`.

**Understanding epochs?** Read `epochs.md`.

---

## 🔗 Relationship to ODD Appendices

| ODD Appendix | Implementation Appendix | Relationship |
|--------------|------------------------|--------------|
| `/odd/appendices/evolution-not-automation.md` | `attempt-lifecycle.md` | Philosophy → Procedure |
| `/odd/appendices/failure-driven-modularity.md` | `repo-topology.md` | Concept → Structure |
| `/odd/appendices/quantum-development.md` | `epochs.md` | Theory → Practice |
| `/odd/appendices/alignment-reviews.md` | `drift-checks.md` | What to review → How to audit |
