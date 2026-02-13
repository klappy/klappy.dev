---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://docs/appendices/compilation
title: Compilation
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["odd", "compilation", "memory", "context", "packs"]
---

# Compilation

> The process of producing wipeable, portable context packs from source documents.

## Description

Compilation creates derived, regeneratable packs that fit in agent and human working memory while preserving source truth unchanged. Compiled outputs live under `/public/_compiled/<lane>/` with required provenance headers for auditability. This mechanism keeps context portable, auditable, and cheap while applying evolutionary pressure against documentation sprawl.

## Outline

- Summary
- Core Rule
- Output Location (Wipeable)
- Provenance Header (Required)
- Why This Is ODD
- Multi-Pack Output (E0002+)
- Relationship to Drift Checks
- Drift Audits

---

## Content

## Summary

Compilation is the process of producing a **derived, wipeable, portable pack** from higher-entropy source documents.

It exists to solve a practical constraint:

> Agents and humans cannot keep the entire repo in working memory at once.

Compilation produces a **smaller, purpose-built context artifact** that can be regenerated at any time.

---

## Core Rule

**Compilation never edits or replaces source.**

- Source docs remain the truth.
- Compiled packs are derived outputs.
- Compiled outputs may be deleted at any time and rebuilt deterministically.

This is compilation, not compression-in-place.

---

## Output Location (Wipeable)

Compiled outputs MUST live under:

`/public/_compiled/<lane>/`

Example:

`/public/_compiled/website/visitor-pack.md`

Compiled outputs MUST NOT be stored inside:
- `/canon/**`
- `/docs/**`
- `/attempts/**`

Those are source-of-truth layers.

---

## Provenance Header (Required)

Every compiled pack MUST begin with a provenance header containing:

- `lane`
- `pack`
- `built_at` (ISO8601)
- `git_commit`
- `sources` (list of source file paths)
- `source_hashes` (map of source path → sha256)

If provenance is missing, the compiled pack is invalid.

---

## Why This Is ODD

ODD treats "context" as a consumable.

Compilation is the mechanism that makes context:

- **portable** (shareable artifact)
- **auditable** (provenance)
- **regeneratable** (wipeable output)
- **cheap** (smaller input than full repo)

Compilation is not automation. It is an **evolutionary pressure** against doc sprawl.

If compilation output grows bloated, the correct response is:
- reduce scope
- tighten selection rules
- improve curation
not "add more docs."

---

## Multi-Pack Output (E0002+)

When a lane has more than one pack, output MUST be structured as:

```
/public/_compiled/<lane>/
  index.json
  <pack>-pack.md
  _meta/
    <pack>-COMPILE_META.json
```

### index.json

Each lane MUST emit `/public/_compiled/<lane>/index.json` listing all known packs from
`/infra/compile/plans/<lane>/*.json` and whether each output exists.

### Meta filenames are pack-scoped

`COMPILE_META.json` MUST NOT be shared across packs.

Meta MUST be written as:

`/public/_compiled/<lane>/_meta/<pack>-COMPILE_META.json`

This prevents clobbering and preserves provenance per target.

---

## Relationship to Drift Checks

Drift checks ensure the repo does not contradict itself.

Compilation ensures the repo remains **usable** under memory limits.

Both are required for scalability.

---

## Drift Audits

The repository SHOULD provide a read-only drift audit that can be run at any time:

- `npm run audit:drift`

This command MUST NOT regenerate or modify derived outputs. It only verifies consistency.

If regeneration is desired for wipeable derived outputs (compiled packs), the repository MAY also provide:

- `npm run audit:repair`

`audit:repair` may regenerate ONLY derived outputs under `/public/_compiled/**`, then MUST run `audit:drift`.

Canon and PRDs MUST NOT be modified by either command.
