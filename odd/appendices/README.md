---
uri: klappy://odd/appendices
kind: canon
title: "ODD Appendices (Portable)"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["odd", "appendices", "index", "portable"]
relevance: routing
execution_posture: routing
target_repo: "outcomes-driven-development"
---

# ODD Appendices (Portable)

Extended concepts that deepen understanding without introducing enforcement. These are diagnostic and orientation documents, not requirements.

> **Note:** Implementation-specific appendices have been moved to `/docs/appendices/`. This folder contains only portable methodology that can apply to any ODD-following repository.

---

## Contents

To list the documents in this collection: oddkit `catalog` with `path_prefix=odd/appendices/`.

---

## Implementation-Specific Appendices (Archived)

The following implementation-specific appendices have been archived to `docs/archive/` as part of E0005 (Structure-Agnostic ODD). They are preserved as historical records but are no longer active:

- Lane-specific docs (`product-lanes.md`, `lane-build-layout.md`, `lane-implementation-surfaces.md`)
- Compilation docs (`compilation.md`, `compiled-memory.md`, `compilation-targets.md`, `canonical-compression.md`)
- Evidence path docs (`evidence.md`, `deploy-evidence.md`, `online-evidence.md`)
- Attempt lifecycle (`attempt-lifecycle.md`)
- Repo topology (`repo-topology.md`, `repo-truth.md`, `repo-truth-audit.md`)

---

## When to Read What

**Understanding ODD methodology?** Start with these portable appendices.

**Implementing ODD in your own repo?** Use these as the conceptual foundation.

**Understanding klappy.dev specifics?** Read `/docs/appendices/` instead.

---

## Relationship to Canon

These appendices extend the core canon documents:

- `constraints.md` → appendices explain edge cases
- `definition-of-done.md` → evidence philosophy here, evidence procedures in docs
- `odd/manifesto.md` → appendices operationalize philosophy
