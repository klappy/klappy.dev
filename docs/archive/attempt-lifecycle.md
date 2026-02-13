---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://docs/appendices/attempt-lifecycle
title: "Attempt Lifecycle"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "attempt", "lifecycle", "restartability"]
---

# Attempt Lifecycle

> How work is iterated without steering failed attempts.

## Description

This appendix defines the klappy.dev attempt lifecycle: how PRD versions, attempts, evidence, and deployments are preserved. Core principles: attempts are disposable, infrastructure persists, content accumulates, deployments are views not truth. PRDs define what to build; attempts are bounded executions. Attempts exist to test PRDs, not evolve them. The system uses register → nuke for blank slate independence, artifacts always merge (even from failed attempts), and champion selection promotes exactly one attempt to production. The three planes of change are Application (disposable), Content/Canon (persistent), and Infrastructure (slow-changing).

## Outline

- Why This Appendix Exists
- Core Principles
- PRD Version vs Attempt
- PRD as the Unit of Test
- Independence: Goal vs Infrastructure
- Worktrees and Learnings
- Canonical Places (paths)
- Learnings Payload
- Artifacts Always Merge
- What an Attempt Is / Is Not
- The Three Planes of Change
- Canonical Structure (folder layout)
- Collision Avoidance
- Blank Slate Requirement (Register → Nuke)
- Attempt Lifecycle (High Level)
- Sealing an Attempt
- Champion Selection and Promotion
- Restartability as a Feature

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** How work is iterated without steering failed attempts

---

## Why This Appendix Exists

Outcomes-Driven Development (ODD) assumes that clarity improves faster than execution in an AI-accelerated environment.

As clarity improves, attempts that were once reasonable often become misaligned.

This appendix exists to make stopping, restarting, and rebuilding a normal, explicit part of the system rather than an emotional or ad-hoc decision.

---

## Core Principles

1. **Attempts are disposable.**
2. **Infrastructure persists.**
3. **Content accumulates.**
4. **Deployments are views, not truth.**

Restarting is not a failure of execution.  
Restarting is evidence that intent has sharpened.

Branch and preview deployments exist to observe behavior. The canonical record is the sealed attempt + commit SHA, not the deployment URL.

---

## PRD Version vs Attempt

A **PRD version** defines what should be built.  
An **attempt** is a bounded execution of that PRD.

**Key distinction:**
- A PRD version can have multiple attempts
- Attempts exist to test the PRD, not to evolve it
- If the PRD is wrong, create a new PRD version
- If the implementation fails, create a new attempt against the same PRD

This separation prevents "Phase 1.1" scope creep disguised as iteration.

See [Quantum Development](./quantum-development.md) for the rationale behind multiple attempts.

For the single canonical kickoff prompt used to start any new attempt, see: `/docs/ATTEMPT_KICKOFF.md`.

---

## PRD as the Unit of Test

In ODD, a PRD is treated as the primary test unit.

Issues and failures are mapped back to PRD improvements, and attempts are used to validate PRDs as hypotheses.

This reduces ticket sprawl by keeping the system legible: one PRD version, multiple observable attempts, sealed evidence.

---

## Independence: Goal vs. Infrastructure

Independence is the goal (epistemic).

Infrastructure is an enabler, not a guarantee.

An attempt is independent if:
- decisions are not steered by prior outcomes,
- implementation state is fresh,
- and the approach represents a genuine re-instantiation of the PRD.

Branches and preview deployments can support independence by reducing accidental state leakage and enabling parallel observation, but they do not define independence.

---

## Worktrees and Learnings

**Worktrees are disposable sandboxes. Learnings live in the main repo.**

When using git worktrees for parallel attempts:
- Each worktree is isolated code state
- Learnings are repo state, not worktree state
- Learnings must land in one canonical place that every attempt can write to

You do not try to "share memory" between worktree agents. You publish outputs.

### Canonical Places (Single Source of Truth)

These paths live in the main repo (not inside a worktree only):

- `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/**` — sealed record + evidence (lane-contained)
- `/docs/PRD/<lane>/PRD.md` — living PRD per lane
- `/docs/learnings/prd-vX.Y.md` — (optional) rolling "what we learned" log

Anything in those paths is real. Anything else is temporary.

Note: Root `/attempts/**` is legacy (read-only). All new attempts are lane-contained.

### Learnings Payload (Required)

At the end of each attempt, the agent must produce:

1. `products/<lane>/attempts/prd-vX.Y/attempt-NNN/ATTEMPT.md` — closure record
2. `products/<lane>/attempts/prd-vX.Y/attempt-NNN/META.json` — commit SHA, preview URL, status
3. `products/<lane>/attempts/prd-vX.Y/attempt-NNN/evidence/*` — screenshots, logs
4. PRD patch (if learnings exist): updates to `/docs/PRD/<lane>/PRD.md` in a dedicated section:
   - "Observed failure modes"
   - "Clarifications / constraints added"
   - "New DoD checks"

The PRD patch is how learning persists across attempts.

---

## Artifacts Always Merge

**Failed attempts still contribute learnings.**

Attempts produce two types of outputs:
- **Code changes** — the implementation
- **Artifacts** — attempt folder, evidence, PRD patches

The merge rule:

| Output | Merge to main? |
|--------|----------------|
| Artifacts (attempt folder, evidence, PRD patches) | **Always** |
| Code (src/, components, etc.) | **Only if Champion** |

This prevents "we lost the learning because the attempt failed."

### Two Merges Per Attempt

1. **Artifacts merge** (always happens)
   - Seal the attempt folder
   - Commit evidence and closure record
   - Apply any PRD patches
   - Merge to `main`

2. **Code promotion** (only if winner)
   - Champion's code merges to `main`
   - Non-winners keep their preview URLs but code stays on attempt branch

This separation ensures every attempt contributes to the knowledge base, regardless of whether its code ships.

---

## What an Attempt Is

An Attempt is a bounded execution of a specific Product Requirements Document (PRD).

An attempt:
- has a single PRD version
- has a defined scope
- produces an outcome artifact
- is evaluated against its own Definition of Done
- is explicitly closed (CLOSED or ABANDONED)

An attempt does not:
- evolve indefinitely
- absorb new scope reactively
- serve as the foundation for all future work

---

## What an Attempt Is Not

An attempt is not:
- a phase in a linear roadmap
- a commitment to incremental improvement
- a promise of continuity

Attempts are experiments with intent, not investments to be amortized.

---

## The Three Planes of Change

ODD separates work across three independent planes:

### 1. Application Plane (Behavior)

What the system does:
- UI structure
- interaction patterns
- navigation model
- rendering logic

This plane is **attempt-scoped and disposable**.

### 2. Content / Canon Plane (Knowledge)

What the system knows:
- Canon documents
- ODD Manifesto
- Projects
- Writings, notes, transcripts

This plane is **persistent and cumulative**.

Content may evolve independently of any attempt.

### 3. Infrastructure Plane (Capability)

What makes building cheap:
- deployment setup
- build tooling
- sync/verify scripts
- schemas and formats

This plane **changes slowly and intentionally**.

---

## Canonical Structure

Attempts are **lane-contained**. All attempt artifacts live under the product lane:

```
products/<lane>/attempts/
  prd-vX.Y/
    PRD.md                    # frozen PRD for this version
    _runs/<run_id>/           # working directory (before finalization)
    attempt-001/              # finalized attempts
      ATTEMPT.md              # closure record
      META.json               # canonical pointers (provenance is truth)
      EVIDENCE.md             # evidence index
      evidence/               # screenshots, logs, etc.
    attempt-002/              # retry (if needed)
```

Note: Root `/attempts/**` is legacy (read-only). See `/attempts/README.md`.

**META.json** contains:
- `tool` — which tool was used (Cursor, Claude, etc.)
- `agent_id` — agent identifier
- `model` — model used (e.g., "claude-opus-4-5-20250514")
- `run_id` — unique run identifier
- `branch` — branch name (convenience, not truth)
- `prd_version` — PRD version being tested
- `sealed_commit` — the commit SHA (truth)
- `git_tag` — convenience pointer (optional)
- `status` — CLOSED, ABANDONED, or CHAMPION
- `deploy` — recorded URLs (production, preview) as evidence artifacts

The concrete sealing procedure is documented in `/docs/ATTEMPTS.md`.

---

## Collision Avoidance (Current Model)

Parallel agents don't reserve numbers upfront. Instead:

1. **Register** — Each agent runs `attempt:register` to capture provenance (creates `run-<run_id>/`)
2. **Build** — Agent works in isolation
3. **Finalize** — `attempt:finalize` sorts runs by completion time and assigns `attempt-001`, `attempt-002`, etc.

This prevents collisions because numbers are assigned deterministically at completion, not reserved upfront.

> **Deprecated:** The `ATTEMPT_REGISTRY.json` / `attempt:reserve` model is no longer used.

---

## Blank Slate Requirement

**Attempts must start from a clean slate to be independent.**

### The Problem

If attempt-002 branches from attempt-001's code, it's not independent. The agent will see existing patterns and converge on similar solutions.

### The Solution: Register → Nuke

The required sequence is:

1. **`attempt:register --lane <lane>`** — Captures provenance (who, with what model, from where)
2. **`attempt:nuke --lane <lane>`** — Deletes lane src and framework configs (guarantees blank slate)
3. **Only then** does implementation begin

This preserves forensic traceability (we know who showed up) while guaranteeing experimental independence (no inherited code).

### What Gets Nuked (Lane-Scoped)

- `products/<lane>/src/` — lane application code
- `products/<lane>/vite.config.js`, `products/<lane>/tailwind.config.js`, etc. — lane framework configs

> **Note:** Root-level `/src/` no longer exists. All app code is lane-scoped.

### What Survives

- `/infra/` — deployment scripts, contracts
- `/canon/`, `/about/`, `/projects/` — content
- `/docs/` — process documentation
- `/products/<lane>/attempts/` — sealed evidence (lane-contained)
- `/attempts/` — legacy sealed evidence (read-only)
- `package.json` — dependency manifest
- Other lanes (`products/<other-lane>/src/`) — only the target lane is nuked

> **Decision:** See [D0008: Register Before Nuke](/docs/decisions/D0008-register-before-nuke.md)

---

## Attempt Lifecycle (High Level)

1. **Intent Articulation**
   - A PRD is written for a specific outcome
   - Scope is explicit and finite

2. **Execution**
   - The application is built from scratch against the PRD
   - Existing infrastructure may be reused
   - Existing content may be consumed
   - Prior app logic is not assumed

3. **Evaluation**
   - Outcome is evaluated against the PRD's Definition of Done
   - Evidence is captured

4. **Closure**
   - The attempt is explicitly marked CLOSED or ABANDONED
   - No new scope is added under the same attempt

5. **Reflection**
   - Learnings inform the next PRD or attempt
   - The current attempt is not retrofitted

---

## Sealing an Attempt

A **sealed attempt** has:
- A frozen PRD snapshot (at the PRD version level)
- Evidence captured and linked
- A commit pointer (SHA) in META.json
- Status: CLOSED, ABANDONED, or CHAMPION

Once sealed:
- No further work is done on that attempt
- The record is immutable
- New work requires a new attempt (same PRD) or new PRD version

---

## Champion Selection and Promotion

Quantum Development produces observations. Promotion converts one observation into production.

### Definitions

- **Attempts** = competing candidates (separate branches / preview deploys)
- **Champion** = the single candidate chosen to become production
- **`prod` branch** = production deployment (klappy.dev)
- **`main` branch** = experiment ledger, history aggregation

### The Promotion Rule

**Exactly one attempt becomes Champion for a PRD version.**

The Champion is merged to `main`, then `prod` is fast-forwarded to `main`. Everything else stays sealed evidence.

### Minimum Gate (must pass)

1. PRD Success Criteria (the checkboxes in the PRD)
2. Evidence bundle (desktop + mobile + deep-link round-trip + failure behavior)
3. Cloudflare preview URL captured in META.json
4. No fatal regressions vs current production

### Tie-Breakers (when multiple pass)

Pick one axis and declare it ahead of time:

- Best mobile UX
- Best navigation clarity
- Cleanest deep-link contract and anchor behavior
- Simplest code / fewest dependencies (maintainability)

**Important:** Tie-breakers are not more features. They're about quality under the same PRD.

### Promotion Procedure

**Branch Roles:**
- `prod` — **production** (only champions go here)
- `main` — experiment ledger, artifact aggregation
- `*` (any other) — attempt sandboxes (preview deploys)

**When an attempt wins:**

1. **Seal it**
   - `products/<lane>/attempts/prd-vX.Y/attempt-NNN/` has: ATTEMPT.md, META.json, evidence folder, preview URL.
   - Status: CHAMPION

2. **Tag it** (immutable pointer)
   - Tag: `prd-vX.Y-attempt-NNN`

3. **Merge artifacts to main**
   - Attempt folder, evidence, PRD patches

4. **Promote code to main**
   - Champion's `products/<lane>/src` merges to `main`

5. **Fast-forward prod**
   - `git checkout prod && git merge main --ff-only`
   - Cloudflare deploys `prod` → production

**What happens to other attempts?**
- Seal them (ABANDONED or CLOSED-but-not-chosen)
- Keep their preview URLs + evidence
- Merge their artifacts to `main` (learnings persist)
- Do NOT merge their code

### The One Rule That Prevents Chaos

**Only `prod` is allowed to be production.**

`main` is for experiments and history. Attempts can be preview deployments forever.

This makes "which one is live?" a non-question.

> **Decision:** See [D0001: prod Branch Is Production](/docs/decisions/D0001-prod-branch-is-production.md)

### Winner Declaration (ATTEMPT.md snippet)

When an attempt wins, add to its ATTEMPT.md:

```
Status: CHAMPION (Promoted to Production)
Promoted commit: <sha>
Attempt tag: prd-vX.Y-attempt-NNN
Production tag: production-vX.Y
Production URL: https://klappy.dev
Preview URL: <cloudflare preview>
Why this one won (tie-breaker): <one sentence>
```

---

## Restartability as a Feature

ODD treats restartability as a first-class design feature:
- prompts are rewritten, not patched
- applications are regenerated, not endlessly refactored
- artifacts are preserved for learning, not extended by default

This prevents:
- sunk-cost bias
- prompt sprawl
- architectural drift

---

## What Persists Across Attempts

The following may persist across attempts:
- deployment infrastructure
- build and verification scripts
- content repositories
- Canon structure
- naming conventions
- evidence standards

The following must not be assumed to persist:
- UI composition
- routing model
- state management decisions
- interaction flow

---

## Why Attempts Are Explicitly Closed

Explicit closure:
- creates psychological safety to restart
- prevents scope creep disguised as "Phase 1.1"
- keeps PRDs honest and legible
- makes outcomes comparable across attempts

Unclosed attempts silently turn into products by accident.

---

## How This Appendix Should Be Used

This appendix is:
- a shared mental model
- a permission structure
- a vocabulary for stopping well

It is not:
- a workflow
- a checklist
- a gating mechanism

---

## Summary

ODD optimizes for learning velocity, not artifact continuity.

Attempts exist to be finished.  
Infrastructure exists to make finishing cheap.  
Content exists to compound over time.

**Quantum Development ends when one candidate is promoted.**
Observations without promotion are incomplete experiments.

---

**Status:** Updated 2026-01-16 — Aligned with D0001 (prod branch), D0008 (register before nuke)

> **Authoritative source for attempt workflow:** `/docs/ATTEMPTS.md`
