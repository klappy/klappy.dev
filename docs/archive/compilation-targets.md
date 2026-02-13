---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://docs/appendices/compilation-targets
title: "Compilation Targets"
audience: docs
exposure: public
tier: 3
voice: neutral
stability: stable
tags: ["odd", "compilation", "memory", "portability", "packs", "lanes"]
---

# Compilation Targets

> Lane-scoped, target-specific packs that make the corpus usable at constrained context sizes.

## Description

Compiled packs are derived outputs identified by (lane, target) pairs that can be deleted and regenerated anytime. Each pack has a deterministic plan file defining ordered sources and compilation mode. Targets are constrained consumer profiles (like visitor or author), not personas, and all packs must include provenance for verification without requiring an LLM.

## Outline

- Key Idea
- Output Location (Wipeable)
- Compile Plans (Deterministic)
- Targets
- Invariants
- Phase Policy

---

## Content

Compiled packs exist to make the corpus usable at constrained context sizes without rewriting source truth.

A compiled pack is **derived output**. It can be deleted and regenerated at any time.

## Key Idea

Compilation is scoped by:

- **Lane** (which product's PRD and user intent we're serving)
- **Target** (which consumer needs the compressed view)

A pack is always identified as:

`(lane, target)`

## Output Location (Wipeable)

All compiled output MUST live under:

`/public/_compiled/<lane>/`

Example:

- `/public/_compiled/website/visitor-pack.md`
- `/public/_compiled/website/author-pack.md`

## Compile Plans (Deterministic)

Each pack MUST have a deterministic plan file:

`/infra/compile/plans/<lane>/<target>.json`

The plan defines:
- ordered source files
- compilation mode (Phase 0: concat)
- output filename

## Targets

Targets are **not personas**. They are constrained consumer profiles.

### Website Lane Targets

- `visitor` — minimal orientation surface; progressive disclosure; "what is this?"
- `author` — high-signal working pack for the repo owner; more depth; less onboarding

### Future Targets (Defined When Needed)

- `dev-peer` — evaluation / critique / contribution readiness
- `agent-core` — operational pack for agents to follow process consistently

These exist as names only until a lane PRD requires them.

## Invariants

- Packs are derived. Source docs are not overwritten.
- Packs do not introduce new truth. They reference truth.
- Packs must include provenance (lane, target, timestamp, git commit, source list + hashes).
- Verification MUST be possible without an LLM (hashes + structure + required header).

## Phase Policy

- **Phase 0 (Concat):** deterministic concatenation only
- **Phase 1 (LLM):** LLM may summarize/select, but output still must satisfy the same provenance + verification contract
