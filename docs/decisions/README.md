---
uri: klappy://docs/decisions
title: "Implementation Decision Log"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["docs", "decisions", "adr", "implementation", "reference", "index"]
index_sort: id
---

# Implementation Decision Log

Architecture Decision Records (ADRs) specific to the klappy.dev repository implementation.

> **Relationship to ODD/Canon:** Universal principles live in `/odd/`. Program constraints live in `/canon/`. These decisions document specific choices made for this repository's implementation.

---

## Decisions

<!-- INDEX:START -->
| Title | Description |
|-------|-------------|
| [D0001: prod Branch Is Production](klappy://docs/decisions/D0001) | Protect production from accidental nuke operations by separating production from experiments. |
| [D0002: Attempt Provenance Required](klappy://docs/decisions/D0002) | Every attempt must capture model provenance at registration to enable meaningful comparison between AI models. |
| [D0003: PRD Version Auto-Detection](klappy://docs/decisions/D0003) | PRD version is parsed from source at runtime, eliminating hardcoded version drift in prompts. |
| [D0004: Repo Truth & Cleanup Mandatory](klappy://docs/decisions/D0004) | A dirty repository invalidates conclusions; cleanup resets epistemic state for valid experiments. |
| [D0005: Nuke Command Safety Guards](klappy://docs/decisions/D0005) | Branch-aware safety prevents accidental destruction of production code while preserving attempt branch freedom. |
| [D0006: Dogfooding Requirement](klappy://docs/decisions/D0006) | Agents must apply canon documents to their work, not just read them, validating documentation through actual use. |
| [D0007: Branch Names Are Convenience](klappy://docs/decisions/D0007) | Branch names are optional human convenience; canonical provenance lives in META.json files. |
| [D0008: Register Before Nuke](klappy://docs/decisions/D0008) | Registration must precede nuke to preserve provenance before destroying pre-state. |
| [D0009: Multi-Lane PRD Architecture](klappy://docs/decisions/D0009) | PRDs are organized into independent product lanes, sharing canon but maintaining separate lifecycles. |
| [D0010: Canonical Agent Kickoff](klappy://docs/decisions/D0010) | A single authoritative entry point file eliminates agent prompt reconstruction and drift. |
| [D0011: ODD System Contract 2.0.0](klappy://docs/decisions/D0011) | Major version bump introduces multi-lane architecture with explicit epoch boundaries. |
| [D0012: E0002 Transition Interpretation (Truth vs Enforcement Lag)](klappy://docs/decisions/D0012) | During epoch transitions, canon defines truth while tooling may temporarily lag behind. |
| [D0013: Build Output Truth is Lane-Scoped (products/<lane>/dist)](klappy://docs/decisions/D0013) | Lane builds must output to products/<lane>/dist/, eliminating repo-root collision. |
| [D0014: Declare E0003 Evidence-First Era](klappy://docs/decisions/D0014) | Attempts require externally verifiable deployment evidence, not just local build success. |
| [D0015: Lane PRD Structure Alignment](klappy://docs/decisions/D0015) | Lane-root PRD must be authoritative, not an index pointing elsewhere. |
| [D0016: Structure-Agnostic ODD (E0005.1)](klappy://docs/decisions/D0016) | Prescribed product lanes, attempt folder conventions, and lane-scoped tooling are superseded by dynamic epistemic routing through OddKit. The concept… |
<!-- INDEX:END -->

---

## What Makes These Implementation-Specific

These decisions reference:

- Specific file paths in this repository (`/docs/`, `/canon/`, `/odd/`)
- Specific branch naming conventions (`prod`, `main`)
- Specific tooling (Cloudflare Pages)

> **Note:** Some older decisions reference paths that have since been archived (e.g., `products/`, `infra/`). Decision records are historical and are not updated retroactively. See `docs/archive/` for archived content.

---

## How Decisions Are Made

1. **During an attempt**: Agent notes "Decision Delta" in `ATTEMPT.md`
2. **After the attempt**: Human or librarian promotes durable decisions here
3. **If stable**: Decision may be referenced from higher-visibility docs

---

## Decision File Template

Each decision file follows this structure:

```markdown
# D000X — [Title]

## Decision

[1-2 sentences stating what was decided]

## Status

**Active** | Proposed | Deprecated

## Why

- [Bullet point]
- [Bullet point]

## Consequences

- [What this enables]
- [What this prevents]
- [What this costs]

## Implementation

- Relevant files: `...`

## Evidence

- Commit: `abc1234`
```

---

## Deprecated Decisions

_None yet._

---

## Relationship to ODD and Canon

ODD contains universal principles. Canon contains program constraints. These decisions are the klappy.dev-specific application of those higher-level documents.

| Document | Tier | Related Decisions |
|----------|------|-------------------|
| `/odd/contract.md` | ODD | D0009, D0011, D0012 |
| `/odd/decisions/D0001-three-tier-conceptual-hierarchy.md` | ODD | All (tier separation) |
| `/canon/constraints/README.md` | Canon | All decisions respect constraints |
| `/docs/appendices/epochs.md` | Docs | D0012, D0014 |
