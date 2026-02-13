---
uri: klappy://docs/appendices/memory-architecture
title: "Memory Architecture"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["odd", "memory", "elevation", "portability"]
status: proposed
---

# Memory Architecture

> The layered system that preserves learning while discarding what no longer reduces drag.

## Description

Memory in ODD is the percolation path from ephemeral execution to durable truth through five layers: Attempt Evidence, Lane History, Lane Decisions, Cross-Lane Patterns, and Canon. Each layer has different durability, scope, and elevation criteria, with most artifacts expected to decay at lower layers. The system preserves what repeatedly reduces drag, discards what no longer serves, and keeps percolation paths visible.

## Outline

- Summary
- Why Memory Matters
- The Memory Layers
- The Percolation Model
- Decay Is the Default
- Folder Patterns
- What Memory Is Not
- Relationship to Other Concepts
- Related Documents

---

## Content

## Summary

In ODD, **memory** is the layered system that preserves what was learned while discarding what no longer reduces drag.

Memory is not a single artifact. It is the percolation path from ephemeral execution to durable truth:

```
Attempts → Lane History → Lane Decisions → Cross-Lane Patterns → Canon
```

Each layer has different durability, scope, and elevation criteria.

---

## Why Memory Matters

ODD assumes:
- Generation is abundant
- Trust is scarce
- Context is bounded
- Drift is inevitable unless actively curated

Memory is the bottleneck — not computation, not generation, not storage.

The system must:
- Preserve what repeatedly reduces drag
- Discard what no longer serves
- Make the percolation path visible
- Keep each layer scannable by agents and humans

Evidence without elevation creates false confidence rather than learning.

---

## The Memory Layers

### Layer 1: Attempt Evidence (Ephemeral)

**Scope:** Single execution against a PRD  
**Durability:** Sealed when attempt closes; may be pruned later  
**Lives in:** Scoped to the attempt (historically `products/<lane>/<version>/attempts/attempt-NNN/evidence/`, now archived)

Attempts capture what happened during execution:
- Test output, logs, screenshots
- Verification artifacts
- Failure evidence

**Elevates when:** A pattern appears across multiple attempts and can be stated as a reusable learning.

---

### Layer 2: Lane History (Lane-Durable)

**Scope:** What happened in this lane — champions, failures, infrastructure changes  
**Durability:** Persists as long as the lane exists  
**Lives in:** Scoped to the product (historically `products/<lane>/history/`)

History records **what happened** without turning it into rules:
- Champion promotions
- Failed attempts with learnings
- Infrastructure migrations

**Elevates when:** A learning recurs across multiple versions or informs lane decisions.

---

### Layer 3: Lane Decisions (Lane-Durable)

**Scope:** Why this lane chose what it chose  
**Durability:** Persists as long as the lane exists; may be deprecated  
**Lives in:** Scoped to the product (historically `products/<lane>/decisions/`)

Decisions record **why we chose** to make things happen the way they did:
- Architectural choices
- Deviations from canon
- Patterns that worked

History says "we did X." Decisions say "we did X because Y."

**Elevates when:** A decision proves valuable across multiple lanes.

---

### Layer 4: Cross-Lane Patterns (Repo-Durable)

**Scope:** Patterns that recur across lanes  
**Durability:** Persists in interfaces or shared tooling  
**Lives in:** `/interfaces/**` or shared infrastructure

Cross-lane patterns emerge when:
- Multiple lanes solve the same problem
- Interoperability requires explicit contracts
- Drift across lanes becomes expensive

**Elevates when:** A pattern satisfies elevation criteria (recurrence, portability, drag reduction, testability).

Many cross-lane patterns remain permanently non-canonical — useful, local, and intentionally contextual. Canon is not the goal of all things.

---

### Layer 5: Canon (Durable Truth)

**Scope:** Curated, high-signal rules that survive context changes  
**Durability:** Persists across projects, tools, and time  
**Lives in:** `/canon/**`

Canon is intentionally small. Adding to canon requires:
1. **Recurrence** — appears across multiple attempts/projects
2. **Portability** — remains true across stacks/models/tools
3. **Drag Reduction** — prevents repeated confusion or failure
4. **Testability** — can be expressed as a falsifiable claim

Canon does not grow by accumulation. It grows by curation.

---

## The Percolation Model

Memory does not flow upward automatically. It requires explicit elevation.

```
┌─────────────────────────────────────────────────────────────┐
│                        CANON                                │
│  (Durable truth that survives context changes)              │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ elevation (strict criteria)
                           │
┌─────────────────────────────────────────────────────────────┐
│                   CROSS-LANE PATTERNS                       │
│  (Interfaces, shared contracts, proven interop)             │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ elevation (recurrence across lanes)
                           │
┌───────────────────────┐ ┌───────────────────────┐
│   LANE A              │ │   LANE B              │
│   ├── decisions/      │ │   ├── decisions/      │
│   ├── history/        │ │   ├── history/        │
│   └── attempts/       │ │   └── attempts/       │
└───────────────────────┘ └───────────────────────┘
         ▲                          ▲
         │ elevation                │ elevation
         │ (recurrence,             │ (recurrence,
         │  learning)               │  learning)
         │                          │
    ┌─────────┐                ┌─────────┐
    │ attempt │                │ attempt │
    │ attempt │                │ attempt │
    │ attempt │                │ attempt │
    └─────────┘                └─────────┘
```

Most artifacts die at the attempt layer. That is correct behavior.

---

## Decay Is the Default

Memory preservation has a cost: maintenance, cognitive load, drift risk.

ODD assumes most artifacts should decay:
- Attempts are sealed and may be pruned
- History entries are append-only but finite
- Decisions may be deprecated
- Even canon can be curated down

Discarding is not loss. It is how memory stays useful.

---

## Folder Patterns

Each layer has a consistent folder pattern within lanes:

| Layer | Pattern | Index Style | Authored By |
|-------|---------|-------------|-------------|
| Attempts | `<version>/attempts/attempt-NNN/` | Flat enumeration | Agent or human |
| History | `history/H000X-*.md` | Index table + individual files | Human (post-attempt) |
| Decisions | `decisions/D000X-*.md` | Index table + individual files | Human |

The index + individual files pattern keeps scan cost low while allowing entries to grow.

---

## What Memory Is Not

Memory is not:
- A **changelog** (user-facing release notes)
- A **git log** (commit history)
- A **wiki** (sprawling documentation)

Memory is curated learning that reduces future drag.

---

## Relationship to Other Concepts

| Concept | Relationship |
|---------|--------------|
| Progressive Elevation | The criteria for when something moves up a layer |
| Compiled Memory | Compression of memory into agent-consumable packs |
| Product Lanes | The boundaries within which memory is scoped |
| Epochs | Comparability boundaries when the rules change |

---

## Related Documents

- `/odd/appendices/progressive-elevation.md` — Elevation criteria
- `/docs/appendices/compiled-memory.md` — Compression for agents
- `/docs/archive/product-lanes.md` — Lane isolation (archived)
- `/docs/archive/attempt-lifecycle.md` — Attempt containment (archived)
