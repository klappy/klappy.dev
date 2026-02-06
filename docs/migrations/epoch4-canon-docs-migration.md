---
uri: klappy://docs/migrations/epoch4-canon-docs-migration
title: "Epoch 4 Canon & Docs Migration Plan"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: draft
tags: ["migration", "epoch-4", "canon", "docs", "epistemic-drift", "stabilization"]
---

# Epoch 4 Canon & Docs Migration Plan

> Controlled, iterative migration to stop epistemic drift and reorganize existing files into their Epoch 4–correct locations.

## Description

This is a stabilization and migration plan, not a refactor-by-force. The ontology has changed faster than the filesystem — documents have been written into inconsistent locations as the epistemic model evolved through Epoch 4. This plan restores coherence without breaking provenance or halting work.

## Goal

Restore structural alignment between the Epoch 4 epistemic model and the filesystem, so that document placement communicates category rather than requiring path inference.

## Outline

- Core Invariants
- Phase 0 — Freeze the Drift
- Phase 1 — Epoch 4 Target Topology
- Phase 2 — Classification Pass
- Phase 3 — Controlled Moves
- Phase 4 — Consolidation & Supersession
- Phase 5 — Enforce Going Forward
- Migration Heuristics
- Definition of Done

---

## Core Invariants (Non-Negotiable)

1. **Meaning must not depend on path** (canon constraint — see `klappy://canon/constraints/meaning-must-not-depend-on-path`)
2. **Files may move; meaning may not**
3. **History is preserved; conflicts are contextualized, not erased**
4. **Migration happens incrementally, not all at once**
5. **New writing must stop the bleeding first**

---

## Phase 0 — Freeze the Drift (Immediate)

**Objective:** Stop the system from getting worse while migration is planned and executed.

**Actions:**

1. Declare a temporary write convention (until migration completes):
   - All new documents MUST go in one of:
     - `canon/` (principles, constraints only)
     - `docs/_incoming/` (everything else)
2. Create `docs/_incoming/README.md` explaining the temporary holding area
3. Communicate to all contributors:

   > "If you are unsure where a document belongs, put it in `docs/_incoming/`."

**Success condition:** No new docs appear in ambiguous or legacy locations.

**Status:** Active. `docs/_incoming/README.md` created.

---

## Phase 1 — Epoch 4 Target Topology

### Canon (Normative Truth)

```
canon/
  principles/       # Canon-level principle articulations
  constraints/      # Load-bearing constraints
  diagnostics/      # System health signals
  apocrypha/        # Deprecated fragments
  decisions/        # Canon-level decision records
  definitions/      # Formal vocabulary
  methods/          # Durable application patterns
  resonance/        # External pattern alignment
  defaults/         # Default operational postures
  meta/             # Metadata and architecture
```

**Rules:**
- Only normative statements live here
- Canon files are slow-moving, deliberate, and reviewed
- See `klappy://canon/README` for governance

### Docs (Descriptive / Operational)

```
docs/
  plans/            # Forward-looking design & planning
  migrations/       # How we change the system
  history/          # What happened, with evidence
  appendices/       # Rationale, explanation, non-normative
  decisions/        # Frozen decisions (ADRs)
  audits/           # Epistemic drift, reviews, evaluations
  examples/         # Case studies
  _incoming/        # Temporary intake (emptied over time)
```

**Rules:**
- Docs explain, justify, or guide
- Docs may reference canon but do not define truth
- See `klappy://docs/README` for the hierarchy

### Existing Directories (Retained)

These existing `docs/` subdirectories remain valid and are not affected by this migration:

- `agents/` — Agent role guidance
- `agent-architecture/` — Agent system patterns
- `orchestrator/` — Orchestrator reference
- `oddkit/` — Oddkit subsystem docs
- `promotions/` — Canon promotion process
- `infra/` — Infrastructure docs
- `klappy-dev/` — Project-specific docs
- `guiding-artifacts/` — Artifact packs

---

## Phase 2 — Classification Pass (No Moving Yet)

**Objective:** Understand what you have before you move anything.

**Instructions:**

For every document outside its correct Epoch 4 category:

1. Assign a classification label:
   - `canon-candidate`
   - `decision`
   - `migration`
   - `history`
   - `appendix`
   - `plan`
   - `audit`
   - `unclear`
2. Ask one question only:

   > **Is this document trying to define truth, or explain/change/evaluate it?**

3. Do not edit content yet.

**Output:** A simple inventory list mapping:

```
<current_path> → <intended_epoch4_category>
```

---

## Phase 3 — Controlled Moves (Append-Only Semantics)

**Objective:** Move files to correct locations without rewriting meaning.

**Rules for moving:**

1. **File moves are mechanical** — no content edits in the same commit
2. Every moved file gets one of:
   - A `Moved in Epoch 4` note at the top, OR
   - A git-level commit message explaining the move
3. **Never merge or delete competing docs yet** — coexistence beats premature synthesis

**Commit pattern:**

```
move: relocate <doc> to Epoch 4 structure
```

---

## Phase 4 — Consolidation & Supersession (Optional, Slow)

Only after files are in the right category.

**Allowed actions:**
- Add `supersedes:` metadata
- Add `status: deprecated`
- Add clarifying footnotes or headers

**Forbidden actions:**
- Rewriting history to match current beliefs
- Deleting documents without replacement

---

## Phase 5 — Enforce Going Forward

### oddkit (Target Behavior)

- Warn when writing outside approved categories
- Default unknown writes to `docs/_incoming/`
- Offer to classify and move files interactively

### CI / Review

- Fail builds if canon files appear outside `canon/`
- Fail builds if `_incoming/` grows unreviewed beyond threshold

---

## Migration Heuristics (When Unsure)

| If the document... | Category |
|---------------------|----------|
| Defines a rule | `canon` |
| Explains why a rule exists | `appendix` |
| Records a choice | `decision` |
| Describes failure or events | `history` |
| Changes structure | `migration` |
| Checks alignment | `audit` |
| Proposes future work | `plan` |
| Still unclear | `_incoming/` |

---

## Definition of Done

The Epoch 4 migration is complete when:

- No active docs live in ambiguous or legacy locations
- `_incoming/` is empty or near-empty
- Canon contains only normative truth
- Docs are discoverable by category, not path inference
- oddkit can guide placement instead of humans guessing

---

## Meta-Rule

We stabilize first, then we perfect.

Epistemic drift is a systems problem. This plan treats it like one.

---

## Related Documents

- `klappy://canon/constraints/meaning-must-not-depend-on-path` — the constraint this migration enforces
- `klappy://canon/principles/scope-over-folders` — the principle behind structural clarity
- `klappy://docs/migrations/scope-experiments-minimal-migration` — prior migration removing semantic path dependence
- `klappy://docs/_incoming/README` — the temporary intake area created by Phase 0
