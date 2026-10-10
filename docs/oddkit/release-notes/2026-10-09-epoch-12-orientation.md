---
uri: klappy://docs/oddkit/release-notes/2026-10-09-epoch-12-orientation
kind: docs
title: "Release Notes — Epoch 12: Orientation (2026-10-09)"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: draft
tags: ["release-notes", "epoch", "E0012", "orientation", "ooda", "three-tenses", "observed-time", "prior-art", "governance"]
epoch: E0012
date: 2026-10-09
derives_from: "docs/appendices/epoch-12.md, canon/principles/status-carries-three-tenses.md, canon/principles/data-carries-observed-time.md, canon/definitions/governance-artifacts.md, canon/constraints/governance-change-discipline.md"
---

# Release Notes — Epoch 12: Orientation

> Epoch 12 is declared via `docs/appendices/epoch-12.md`. This release note and the changelog entry (canon 0.44.0) supply the `governance-change-discipline` markers alongside the declaration. DRAFT — authored for the captain's exact-text review; do not merge until reviewed and ratified.

## Impact at a glance

- **`docs/appendices/epoch-12.md`** — Declares E0012: the unit of trust stays the loop; what makes a status valid changes. Every claim about state is placed in time; every plan orients against prior art.
- **`docs/appendices/epochs.md`** — The registry carries E0012; E0011 is no longer current.
- **`canon/CHANGELOG.md`** — Canon 0.44.0.
- **Retagged E0010 → E0012** — `status-carries-three-tenses`, `data-carries-observed-time`, `governance-artifacts`. The companion essay `writings/what-was-what-is-what-will-be` is retagged in PR #348, same release.

## What changed

Nothing in the axioms, the canon corpus, the oddkit tools, the E0010 seat, or the E0011 loop changed. What changed is **what makes a status valid**.

- **Status is placed in time.** Every claim about state carries was / is / will be, each with the time it was observed or is expected, plus confidence, proximity and relevance. Proximity is a last-mile rendering of a stored timestamp, never a stored word.
- **Data carries its observed time.** A reading without a timestamp is a memory, not an observation. Re-observe when the age exceeds how fast the datum changes; mark the untimed as untimed.
- **Prior art is mandatory evidence on every plan.** The three bands (world, house install, house canon) and the 6B table are on the record before a brief or PLAN binds.
- **The governance vocabulary is named.** Nine governance kinds, six consumers, one ledger (`canon/definitions/governance-artifacts`).
- **The record is a repo, not a harness.** ARS is on ice; the program lives in GitHub repos, files and folders any harness can board.

## Behavior change — what to do differently

**When reporting any state.** Observe before stating. Stamp what you read with the tool's `server_time`, the file's mtime, or the clock at the moment of reading. Write the line in three tenses: *was X at T1, is Y (checked T2), will be Z after gate G.*

- *Success indicator:* a reader who missed the last stretch can place every claim in time without asking.
- *Failure indicator:* a gate reported red from a reading hours old; a question re-asked that the journal already answered (the 2026-10-09 shape).

**Before a plan binds.** Run `/kitchen-priorart` or its equivalent. Land the three bands, the 6B table, the Reversibility Note and the Prior-decisions line in the ticket.

- *Success indicator:* the plan names what was tried, inside and outside the house, and when it was viable.
- *Failure indicator:* a brief that rebuilds something the record already tested.

**When filing or citing governance.** Use the kind's name (principle, constraint, definition, decision, charter, policy, mandate, requirement, value). "Policy" is a member, not the umbrella.

## What this release does NOT do

- It does **not** retag the companion essay; PR #348 owns that file.
- It does **not** declare a Decide epoch. Terry, the law seat, is blocked on orienting in the documented timeline; that is why Orientation comes first.
- It does **not** modify the seat, the loop, gate-passage receipts, fresh validation, or any prior epoch's governance.

## Reading guidance

- **Operators:** expect every status in three tenses with times. A bare present tense is a request to re-observe, not a report.
- **Agents / seats:** stamp what you read. If you cannot place a datum in time, say so and re-observe before you claim on it.
- **Reviewers:** check for the governance-change-discipline markers, then check tenses before content.

## Lineage and forward references

- Declaration: `docs/appendices/epoch-12.md`
- The binding contract: `canon/principles/status-carries-three-tenses`, `canon/principles/data-carries-observed-time`
- The vocabulary: `canon/definitions/governance-artifacts`
- The companion essay: `writings/what-was-what-is-what-will-be` (PR #348)
- Predecessor: `docs/appendices/epoch-11` (Seat to Loop)
- Markers contract: `canon/constraints/governance-change-discipline`
