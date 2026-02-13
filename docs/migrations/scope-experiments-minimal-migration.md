---
uri: klappy://docs/migrations/scope-experiments-minimal-migration
title: "Scope and Experiments Minimal Migration"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: draft
tags: ["migration", "oddkit", "scope", "experiments", "portability"]
---

# Scope and Experiments Minimal Migration

> Preserve the current repository layout while removing semantic dependence on folder structure.

## Description

This migration enables portability across monorepos, single repos, and submodules without semantic drift. It keeps today's folder structure working while quietly removing path-based meaning.

## Goal

Enable oddkit to reconstruct scope and experiment boundaries without reading filesystem topology as truth.

---

## Phase 0 — Declare Primitives (No Code Changes)

Introduce explicit record headers for all learnings/decisions:

```json
{
  "id": "string (stable)",
  "type": "learning|decision|override",
  "scope": "global|product:<id>|experiment:<id>",
  "status": "observed|stabilized|candidate|ratified|archived",
  "created_at": "ISO timestamp"
}
```

This extends the existing schema in `odd/ledger/learnings.jsonl` and does not break existing records.

**What this enables:**
- Append anywhere, merge safely
- Scope is data, not layout
- Existing records remain valid

---

## Phase 1 — Lanes as View (Not Ontology)

- Folder layout is non-authoritative (lanes archived as of E0005)
- Add `oddkit/scopes.json` mapping friendly names to scope IDs
- oddkit renders filtered views by scope regardless of file location

**Result:** Lanes remain useful but non-authoritative.

**Example `oddkit/scopes.json`:**

```json
{
  "scopes": {
    "global": { "id": "global", "display": "Global" },
    "odd-teaser": { "id": "product:odd-teaser", "display": "ODD Teaser" },
    "agent-skill": { "id": "product:agent-skill", "display": "Agent Skill" }
  }
}
```

---

## Phase 2 — Experiments as Enforced State

- oddkit owns experiment state (`ACTIVE` | `EXITED`)
- State is not inferred from branches
- New invariant: cannot import, deploy, or close PR with an `ACTIVE` experiment

**New command:**

```bash
oddkit experiment exit --status success|abandoned
```

This command:
- Appends a closing record
- Captures evidence where possible
- Transitions experiment state atomically

**State ownership:**
- Experiment state lives in oddkit's state store, not git branch names
- Branch names remain conveniences for humans and tools
- The invariant is enforced at integration points (PR close, deploy, import)

---

## Phase 3 — Decouple Survivability from Champion

- All learnings/decisions import by default
- "Champion" affects recommendation/ratification status only
- Prevents loss of learnings from failed or abandoned experiments

**Import rule change:**

| Before | After |
|--------|-------|
| Champion imports learnings | All experiments import learnings |
| Non-champion learnings may be lost | Non-champion learnings persist with `status: observed` |
| Champion = survivability | Champion = `status: ratified` |

---

## Append / Merge Rules

These rules make concurrent writes survivable:

### 1. Append-only blocks

Never edit prior entries. To correct or supersede, add a new record that references the old one:

```json
{
  "id": "learn-20260131-0002",
  "type": "override",
  "supersedes": "learn-20260131-0001",
  "scope": "global",
  "status": "observed",
  "created_at": "2026-01-31T14:00:00Z",
  "summary": "Corrected understanding of..."
}
```

### 2. Stable IDs + monotonic ordering

- Each entry has a unique `id`
- Ordering can be derived deterministically by `id` or `created_at`
- Git merges resolve cleanly because entries never conflict

---

## Success Test

The migration succeeds only when:

> **oddkit can reconstruct scope and experiment boundaries without reading filesystem topology as truth.**

If this test fails, migration is incomplete.

**Concrete validation:**
- Move a learning file to a different directory
- Run `oddkit query --scope global`
- The learning appears with correct scope
- If it doesn't, the system is still path-dependent

---

## What Does NOT Change

- Existing `odd/ledger/learnings.jsonl` entries remain valid
- Branch naming conventions remain unchanged (they're just non-authoritative)

> **Note (E0005):** `products/<lane>/` paths have been archived to `docs/archive/products/`. This migration's goal of removing semantic dependence on folder structure has been substantially achieved.

---

## Related Documents

- `klappy://canon/principles/scope-over-folders` — the principle this migration enforces
- `klappy://canon/constraints/meaning-must-not-depend-on-path` — the constraint this migration satisfies
- `klappy://docs/decisions/D0007` — prior decision establishing branch names as non-authoritative
- `klappy://docs/appendices/product-lanes` — lane documentation (archived to `docs/archive/product-lanes.md`)
