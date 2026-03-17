---
uri: klappy://docs/decisions
title: "Implementation Decision Log"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["docs", "decisions", "adr", "implementation", "reference", "index"]
---

# 📜 Implementation Decision Log

Architecture Decision Records (ADRs) specific to the klappy.dev repository implementation.

> **Relationship to ODD/Canon:** Universal principles live in `/odd/`. Program constraints live in `/canon/`. These decisions document specific choices made for this repository's implementation.

---

## ✅ Active Decisions

### Branch & Deploy Model

| ID | Decision | Status |
|----|----------|--------|
| [D0001](./D0001-prod-branch-is-production.md) | `prod` branch is production; `main` is experiment ledger | **Active** |
| [D0005](./D0005-nuke-safety-guards.md) | Nuke command refuses on `prod`, warns on `main` | **Active** |
| [D0007](./D0007-branch-names-are-convenience.md) | Branch names are convenience; provenance lives in META | **Active** |

### Attempt Lifecycle

| ID | Decision | Status |
|----|----------|--------|
| [D0002](./D0002-attempt-provenance-required.md) | Model provenance must be captured at registration | **Active** |
| [D0003](./D0003-prd-version-auto-detection.md) | PRD version auto-detected from lane PRD | **Active** |
| [D0006](./D0006-dogfooding-requirement.md) | Agents must apply canon docs, not just read them | **Active** |
| [D0008](./D0008-register-before-nuke.md) | Register first (provenance), then nuke (independence) | **Active** |
| [D0010](./D0010-canonical-agent-kickoff.md) | Single canonical agent entry point (`AGENT_KICKOFF.md`) | **Active** |

### Architecture

| ID | Decision | Status |
|----|----------|--------|
| [D0009](./D0009-multi-lane-prd-architecture.md) | PRDs organized into independent product lanes | **Active** |
| [D0011](./D0011-odd-contract-2.0.0.md) | ODD System Contract 2.0.0 (multi-lane era) | **Active** |
| [D0012](./D0012-e0002-transition-interpretation.md) | E0002 transition interpretation (truth can lead enforcement) | **Active** |
| [D0013](./D0013-build-output-lane-scoped-dist.md) | Build output truth is lane-scoped (`products/<lane>/dist`) | **Active** |
| [D0014](./D0014-e0003-evidence-first-era.md) | E0003 evidence-first era (deployment proof required) | **Active** |
| [D0015](./D0015-lane-prd-structure-alignment.md) | Lane-root PRD must be authoritative, not an index | **Active** |

### Provenance & Verification

| ID | Decision | Status |
|----|----------|--------|
| [D0018](./D0018-transcripts-are-lossy-sources.md) | Transcripts are lossy sources; speaker confirmation required for named quotes | **Active** |

### Repository Hygiene

| ID | Decision | Status |
|----|----------|--------|
| [D0004](./D0004-repo-truth-cleanup-mandatory.md) | Cleanup is mandatory; dirty repos invalidate conclusions | **Active** |

---

## 🔧 What Makes These Implementation-Specific

These decisions reference:

- Specific file paths in this repository (`/docs/`, `/canon/`, `/odd/`)
- Specific branch naming conventions (`prod`, `main`)
- Specific tooling (Cloudflare Pages)

> **Note:** Some older decisions reference paths that have since been archived (e.g., `products/`, `infra/`). Decision records are historical and are not updated retroactively. See `docs/archive/` for archived content.

---

## 🔄 How Decisions Are Made

1. **During an attempt**: Agent notes "Decision Delta" in `ATTEMPT.md`
2. **After the attempt**: Human or librarian promotes durable decisions here
3. **If stable**: Decision may be referenced from higher-visibility docs

---

## 📝 Decision File Template

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

## 🚫 Deprecated Decisions

_None yet._

---

## 🔗 Relationship to ODD and Canon

ODD contains universal principles. Canon contains program constraints. These decisions are the klappy.dev-specific application of those higher-level documents.

| Document | Tier | Related Decisions |
|----------|------|-------------------|
| `/odd/contract.md` | ODD | D0009, D0011, D0012 |
| `/odd/decisions/D0001-three-tier-conceptual-hierarchy.md` | ODD | All (tier separation) |
| `/canon/constraints/README.md` | Canon | All decisions respect constraints |
| `/docs/appendices/epochs.md` | Docs | D0012, D0014 |
