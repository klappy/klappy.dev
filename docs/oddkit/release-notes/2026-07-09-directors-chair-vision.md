---
uri: klappy://docs/oddkit/release-notes/2026-07-09-directors-chair-vision
title: "Release Notes — The Director's Chair Vision Overview (2026-07-09): What Changes For Agents After This Lands"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "oddkit", "release-notes", "directors-chair", "vision", "cdo", "otto", "provenance", "unfold-map"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/the-directors-chair-vision.md, canon/constraints/governance-change-discipline.md"
governs: "How the CDO (Otto) and other agents orient to the whole-program vision after this merges"
target_repo: "undecided"
---

# Release Notes — The Director's Chair Vision Overview (2026-07-09)

> This release adds one canon document: a captain-approved, thin-overview synthesis of the whole program vision, written so an agent can orient in one read and then fetch deeper detail only where it needs it. No existing canon changes meaning; this is a new top-level frame that cross-references what already exists.

---

## Summary — One Frame, Many Existing Threads, an Explicit Unfold-Map

`canon/the-directors-chair-vision.md` consolidates months of the captain's stated vision — the director's-chair posture, the six-layer substrate stack, the CDO/Otto seat, the policy-not-code governance spine, and the L6 penny-economy — into a single canon document. It does not introduce new canon threads; it names and cross-references ones that already exist (`canon/architecture/substrate-stack.md`, `canon/principles/vodka-architecture.md`, `canon/the-frame.md`, `writings/we-were-the-wire.md`) and adds the captain's four 2026-07-09 rulings on naming, Otto's runtime place, economy sequencing, and build philosophy.

The document is explicitly a **thin overview**, not an exhaustive one. It carries a provenance appendix — Bee conversation IDs and canon-thread names — as an **unfold-map**: the pointer set an agent walks when a section needs more depth than the overview gives. This is the mechanism that keeps the overview thin without losing the detail; the detail lives at the far end of the provenance links, not inline.

---

## What Changes After This Lands

- **The CDO (Otto) and other agents get a single orientation document for the whole-program vision.** Before this, the vision existed scattered across Bee conversations, the substrate-stack doc, and separate principle docs — no single frame tied them together. `oddkit_search`/`oddkit_preflight` now surface this document for vision-shaped queries ("what is the director's chair", "what is the CDO for", "how does the economy fit the substrate stack").
- **The provenance appendix is the drill-down contract.** When an agent needs more than the thin overview gives on a specific face of the vision (e.g., the penny-economy mechanics, or the CDO's bootstrapping), it follows the named Bee conversation or canon thread rather than the overview trying to carry that depth inline. Success looks like: agents cite the overview for orientation and the provenance links for specifics, not the overview alone for load-bearing claims.
- **The captain's four rulings are now canon, not conversation.** Naming is explicitly deferred (not silently assumed); Otto's place as one CDO persona among many crew agents (not the whole runtime) is now recorded; metering-before-Braigslist sequencing is now recorded; and the needs-first/vision-in-focus build philosophy is now recorded. Future proposals that contradict these rulings should cite this document and either align or explicitly propose revisiting the ruling.

---

## Lineage

- **Version bump:** Canon 0.39.0 → 0.40.0.
- **Changelog entry:** `canon/CHANGELOG.md`.
- **Release notes:** this document.
- **Epoch bump:** none. This document synthesizes and cross-references existing E0009/E0010 canon; it does not shift operator or agent posture on its own.

---

## Source

Consolidated by Otto (CDO seat) from Bee recordings (with explicit consent) and existing klappy.dev canon; captain-approved 2026-07-09. Full provenance (Bee conversation IDs, canon threads) is in the appendix of `canon/the-directors-chair-vision.md`.
