---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://docs/appendices/product-lanes
title: "Product Lanes in Outcome-Driven Development"
audience: docs
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["odd", "prd", "architecture", "lanes", "orientation"]
---

# Product Lanes in Outcome-Driven Development

> Why multiple PRD lanes exist and how they relate in klappy.dev.

## Description

This documents klappy.dev's product lanes. Each lane has its own PRD at `/products/<lane>/PRD.md`, attempts at `/products/<lane>/attempts/`, and independent lifecycle. Lanes share canon, not lifecycle. Implementation surfaces are lane-scoped (`products/<lane>/src` and `products/<lane>/dist`). This prevents scope creep, evidence pollution, and cascading reruns across unrelated products.

**Active lanes:** odd-teaser, agent-skill, fluent-mobile

**Deprecated lanes:** website (superseded by odd-teaser), ai-navigation (superseded by odd-teaser)

## Outline

- Summary
- Why PRDs Must Be Decoupled
- Active Lanes (odd-teaser, agent-skill, fluent-mobile)
- Deprecated Lanes (website, ai-navigation)
- Implementation Surfaces Are Lane-Scoped
- Canon Is Not a Product
- What Is Shared vs Isolated
- Attempt Structure (Locked)
- Anti-Patterns
- Implications for Tooling and Docs
- Scalability

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** Why multiple PRD lanes exist and how they relate

---

## Summary

ODD systems evolve across multiple independent product lanes.

Each lane has its own PRD, attempts, and failure modes.

Lanes share canon, not lifecycle.

---

## Why PRDs Must Be Decoupled

A single PRD governing everything creates cognitive collapse:

- **Different users**: Website serves humans exploring ODD. Agent skill serves AI systems executing ODD.
- **Different success criteria**: "Mobile usable" vs "Can propose a PRD autonomously"
- **Different rates of change**: Website can stagnate while agent skills evolve rapidly.
- **Different evidence**: Screenshots vs decision quality metrics.

Forcing these into one evolutionary track means:

- Progress in one lane forces reruns in another
- Evidence requirements conflict
- Scope creep becomes structural

---

## Active Lanes

### odd-teaser (Active)

**Purpose:** Single-session epistemic artifact externalization.

This is not explanation, navigation, or engagement.
This is artifact creation and exit.

The product succeeds even if the user never returns.

**Core constraint:** Klappy.dev must always be easier to leave than to continue.

**PRD Location:** `/products/odd-teaser/PRD.md`

**Primary User:** First-time visitors who externalize artifacts and leave

**Supersedes:** website, ai-navigation

---

### agent-skill (Active)

**Purpose:** A reusable agent cognitive framework for ODD reasoning.

This is about how agents think, not what they render.

Enables AI systems to:

- Reason using ODD principles
- Structure PRDs
- Define outcomes and evidence
- Run evolutionary attempts
- Improve their own process over time

This is not tied to this website. It should work on any project.

**PRD Location:** `/products/agent-skill/PRD.md`

**Primary User:** AI agents executing evolutionary development elsewhere

---

### fluent-mobile (Active)

**Purpose:** Mobile-first artifact capture for ODD workflows.

**PRD Location:** `/products/fluent-mobile/PRD.md`

---

## Deprecated Lanes

### website (Deprecated)

**Status:** DEPRECATED as of 2026-01-31

**Superseded by:** odd-teaser

The website lane focused on progressive disclosure and canon browsing.
The odd-teaser lane embodies the Epoch 4 philosophy: artifact externalization and exit.

Do not start new attempts against this lane.

---

### ai-navigation (Deprecated)

**Status:** DEPRECATED as of 2026-01-31

**Superseded by:** odd-teaser

The ai-navigation lane focused on conversational navigation and explanation of ODD.
The odd-teaser lane explicitly rejects teaching and navigation.

Do not start new attempts against this lane.

---

## Implementation Surfaces Are Lane-Scoped

Each lane is an independent product.

Implementation directories are lane-scoped:

- `products/<lane>/src` (disposable)
- `products/<lane>/dist` (build output)

Repo-root `/src` is not a shared surface in the multi-lane model.

See: `/docs/appendices/lane-implementation-surfaces.md`

---

## Canon Is Not a Product

Canon does not have a PRD.
Canon does not have attempts.
Canon evolves only through decision logs.

Products may render, query, or reason over canon - but never modify it directly.

| Layer    | Coupling                      |
|----------|-------------------------------|
| Canon    | Shared, slow, authoritative   |
| PRDs     | Isolated, fast, disposable    |
| Attempts | Ephemeral, lane-scoped        |
| Tooling  | Canon-aware, lane-agnostic    |

---

## What Is Shared vs What Is Isolated

| Artifact          | Shared Across Lanes? | Notes                                      |
|-------------------|----------------------|--------------------------------------------|
| Canon             | Yes                  | All lanes reference the same constraints   |
| Decision logs     | Yes                  | Architectural decisions affect all lanes   |
| PRDs              | No                   | Each lane has its own PRD                  |
| Attempts          | No                   | Attempts are lane-scoped                   |
| Evidence          | No                   | Success criteria differ per lane           |
| Definition of Done| Partially            | Core DoD applies; lane-specific criteria extend it |

---

## Attempt Structure (Locked)

Every attempt MUST declare a lane before registration.
Attempts without a lane are invalid.

**Folder structure:** `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`

Attempts are **lane-contained** — all artifacts live under the product lane directory.

Valid examples:
- `/products/odd-teaser/attempts/prd-v1.0/attempt-001/`
- `/products/agent-skill/attempts/prd-v1.0/attempt-001/`
- `/products/fluent-mobile/attempts/prd-v1.0/attempt-001/`

Invalid (do not use):
- `/attempts/<lane>/prd-vX.Y/attempt-NNN/` (legacy, read-only)
- `/attempts/prd-vX.Y/<lane>/`
- `/products/<lane>/attempts/attempt-NNN/` (missing PRD version)

---

## Anti-Patterns

### One PRD to Rule Them All

Treating all work as variations of a single product forces:

- Conflicting success criteria
- Evidence that doesn't apply
- Reruns across unrelated changes

### Treating Artifacts as Features

The odd-teaser lane exists for artifact externalization and exit.
The agent-skill lane exists for autonomous ODD execution.

Mixing these creates scope confusion and evidence pollution.

### Re-running Experiments Across Lanes

A UI fix in odd-teaser should not invalidate agent skill experiments.

Lane isolation prevents cascading reruns.

---

## Implications for Tooling and Docs

### Lane Self-Containment (Critical)

**A product lane MUST be self-contained.**

All artifacts required to understand and execute against a lane live within `products/<lane>/`:

```
/products/<lane>/
  PRD.md                              # Lane PRD (authoritative)
  README.md                           # Lane overview
  KICKOFF.md                          # Attempt instructions
  attempts/prd-vX.Y/attempt-NNN/      # Attempt artifacts
  src/                                # Implementation source
  dist/                               # Build output (if applicable)
```

**Why this matters:**
- Agents can load a single directory and have complete context
- No cross-directory dependencies to track
- Lane can be moved, copied, or archived as a unit
- Documentation drift cannot split a lane's truth across locations

**If you find yourself creating lane artifacts outside `products/<lane>/`, stop.**

### Where PRDs Live

PRDs are lane-contained:

```
/products/
  odd-teaser/PRD.md
  agent-skill/PRD.md
  fluent-mobile/PRD.md
```

> ⚠️ **Not** `/docs/PRD/<lane>/PRD.md`. That path pattern is deprecated.

### Where Attempts Live

Attempts are lane-contained:

```
/products/
  odd-teaser/attempts/prd-vX.Y/attempt-NNN/
  agent-skill/attempts/prd-vX.Y/attempt-NNN/
  fluent-mobile/attempts/prd-vX.Y/attempt-NNN/
```

Note: Root `/attempts/**` is legacy (read-only). See `/attempts/README.md`.

### How Evolution Propagates

- Canon changes affect all lanes (but rarely change)
- PRD changes affect only that lane
- Attempt outcomes inform only that lane's PRD evolution
- Cross-lane learnings are captured in decision logs, not PRD mutations

---

## Scalability

This architecture is scalable because it is NOT interdependent.

You do not get a monorepo of coupled PRDs.
You get shared canon + independent evolutionary tracks.

This lets you:

- Freeze the website indefinitely
- Rapidly evolve agent skills
- Replace AI navigation entirely
- Add a fourth lane later without touching the others

---

## Related Documents

- Decision log: `/docs/decisions/D0009-multi-lane-prd-architecture.md`
- Attempt lifecycle: `/docs/appendices/attempt-lifecycle.md`
- Evolution philosophy: `/odd/appendices/evolution-not-automation.md`
