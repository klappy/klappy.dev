---
uri: klappy://docs/oddkit/release-notes/2026-07-17-epoch-11-seat-to-loop
kind: docs
title: "Release Notes — Epoch 11: Seat to Loop (2026-07-17)"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: draft
tags: ["release-notes", "epoch", "E0011", "two-loop", "policy-first", "policy-precedes-build", "gated-loop", "governance"]
date: 2026-07-17
derives_from: "docs/appendices/epoch-11.md, canon/architecture/two-loop-operating-model.md, canon/constraints/policy-precedes-build.md, canon/constraints/governance-change-discipline.md"
---

# Release Notes — Epoch 11: Seat to Loop

> Epoch 11 is declared via `docs/appendices/epoch-11.md`. This release note and the changelog entry (canon 0.42.0) supply the `governance-change-discipline` markers alongside the declaration. DRAFT — authored for ratification; do not merge until reviewed and ratified.

## Impact at a glance

- **`docs/appendices/epoch-11.md`** — Declares E0011: trust moves from the boarded seat to the gated two-loop production frame. What makes an outcome valid changes.
- **`docs/appendices/epochs.md`** — The registry now carries E0011, and backfills E0009 and E0010, so the epoch ledger no longer skips epochs.
- **`canon/CHANGELOG.md`** — Canon 0.42.0.

## What changed

Nothing in the axioms, the canon corpus, the oddkit tools, or the E0010 seat and boarding frame changed. What changed is **what makes a production outcome valid**.

- **The seat is no longer the unit of trust; the loop is.** Under E0010, a correctly boarded seat was trusted to produce good work. E0011 keeps the seat but places it inside a loop that governs what its output must descend from. Boarding governs how a seat *behaves*; it says nothing about what a build is *allowed to descend from*. The loop supplies that.
- **The binding contract is `policy-precedes-build`.** No implementation, build, or deploy proceeds without a ratified, enforceable governing policy. The order is design -> policy (-> PRD) -> build, never code-first. The policy must be ratified, derivable (self-building), and cited by the build (self-documenting). Fleet-wide; every seat, flight, and project.
- **The mandatory evidence is gate-passage receipts plus fresh validation.** An outcome is valid because it descended stage by stage through the gated loop, each gate a fresh session so nothing certifies its own work — not because a capable seat produced it. The trail is the evidence.
- **The frame is universal across roles.** Director, planner, builder, validator, CDO seat, human and agent — every role runs the same loop and its output is valid on the same terms.

## Behavior change — what to do differently

**Before a build.** Confirm a ratified governing policy exists and is precise enough to build from, and cite its URI in the build artifact. If no ratified policy exists, the build does not start — surface the missing policy to the ratification seam instead.

- *Success indicator:* every build artifact points back to a governing policy URI; reviewers can reconcile code to policy at any time.
- *Failure indicator:* code is the first record of its own intent; a build exists that no ratified policy authorized (the ARS-freeze shape).

**At each gate.** Run the gate in a fresh session. For design outputs (policies, PRDs), treat the oddkit gauntlet as a refinement loop — fold the challenge's findings back into the artifact before ratification. A "clean" gate means findings were incorporated, not that none were found. For builds, run fresh-context validation plus tests.

- *Success indicator:* gate-passage receipts accompany the outcome, naming what was found and how it was folded.
- *Failure indicator:* a stage certifies its own work in the same session that produced it.

**Policy weight scales with maturity.** Policy-first is universal in *order*, not in *weight*. A Level-0 spike may be governed by one ratified sentence; a Level-2 build carries a full policy and PRD. Do not drag production-grade rigor onto exploratory work — that is the failure `odd/maturity.md` exists to prevent.

## What this release does NOT do

- It does **not** relabel the loop-frame canon (PRs #288-#291). The frontmatter retag from E0010 to E0011 is a documented follow-up, scoped in the appendix; the declaration comes first and the relabel follows it.
- It does **not** restamp the ARS policy set, ADR, or PRD — those run *through* the loop and keep their own epoch.
- It does **not** modify the boarding wrapper, the substrate stack, the axioms, or any prior epoch's governance.

## Reading guidance

- **Operators:** the seam you own is ratification. Rule on policy before the build exists; the loop makes an unauthorized build structurally hard to ship silently.
- **Agents / seats:** before you build, find the ratified policy and cite it. If it is not there, the build is not yours to start.
- **Reviewers:** check for the four governance-change-discipline markers and, for any build PR under E0011, for a cited governing policy and gate-passage receipts.

## Lineage and forward references

- Declaration: `docs/appendices/epoch-11.md`
- The frame: `canon/architecture/two-loop-operating-model` (PR #291)
- The binding contract: `canon/constraints/policy-precedes-build` (PR #290)
- The model-specific instance: `canon/constraints/ratified-model-requires-reconciliation-and-enforcer` (PR #288)
- The enforceable-policy template and policy-first principle: `canon/meta/enforceable-policy-anatomy`, `canon/principles/policy-first-self-building-self-documenting` (PR #289)
- Predecessor: `docs/appendices/epoch-10` (Flight Crew)
- Markers contract: `canon/constraints/governance-change-discipline`
