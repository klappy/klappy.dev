---
uri: klappy://docs/decisions/D0015
title: "D0015: Lane PRD Structure Alignment"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["docs", "decisions", "lane", "prd", "structure", "convention"]
---

# D0015 — Lane PRD Structure Alignment

> Lane-root PRD must be authoritative, not an index pointing elsewhere.

## Description

Product lanes must follow a consistent PRD structure where `PRD.md` at lane root contains the actual requirements (mutable, authoritative), not an index pointing to versioned PRDs in subfolders. Version history and learnings links belong in a separate `HISTORY.md`. Frozen PRD snapshots live in `attempts/v{VERSION}/PRD.md`.

## Outline

- Decision
- Status
- Context
- Consequences
- Implementation
- Pattern Recognition
- Evidence

---

## Decision

1. **Lane-root `PRD.md`** is the authoritative, mutable PRD containing current requirements
2. **`HISTORY.md`** tracks version evolution, frozen snapshot links, and learnings links
3. **`attempts/v{VERSION}/PRD.md`** contains frozen snapshots copied at attempt kickoff
4. **Attempt folders** use `v0.X/` naming, not `prd-v0.X/` (the PRD isn't "in" the folder)
5. **Learnings** are documented in attempt evidence folders, never appended to frozen PRDs

---

## Status

**Active**

---

## Context

The Fluent Mobile lane was created with a non-standard structure:

**Problem Structure (before):**
```
products/fluent-mobile/
├── PRD.md                        # INDEX pointing to versioned PRDs
└── attempts/
    └── prd-v0.3/
        └── PRD.md                # Actual PRD content lived here
```

This caused:
1. **Version drift** — Hardcoded version references in multiple places
2. **Confusion** — "Where is the real PRD?" was unclear
3. **Convention violation** — Other lanes (website, agent-skill) had PRD at root
4. **Maintenance burden** — Every version bump required edits in multiple files

**Expected Convention (other lanes):**
```
products/<lane>/
├── PRD.md                        # THE authoritative PRD
└── attempts/
    └── v{VERSION}/
        └── PRD.md                # Frozen snapshot
```

---

## Consequences

### Positive

- ✅ **Single source of truth** — Lane-root PRD is always authoritative
- ✅ **Reduced drift** — Version only needs updating in one place
- ✅ **Convention alignment** — All lanes follow same pattern
- ✅ **Cleaner folder names** — `v0.3/` instead of `prd-v0.3/`
- ✅ **Clear separation** — HISTORY.md for evolution, PRD.md for requirements

### Tradeoffs

- ⚠️ **Migration cost** — Existing lanes with wrong structure need refactoring
- ⚠️ **Link updates** — Internal links must be updated when restructuring
- ⚠️ **Historical artifacts** — JSON files with absolute paths become historical (acceptable)

---

## Implementation

### Files Changed in Fluent Mobile Refactor

| File | Change |
|------|--------|
| `PRD.md` | Now contains actual v0.3 requirements |
| `HISTORY.md` | New file — version table + learnings links |
| `README.md` | Fixed drift, uses dynamic references |
| `KICKOFF.md` | Uses `v{VERSION}` placeholders |
| `attempts/prd-v0.X/` | Renamed to `attempts/v0.X/` |

### Convention Rules

1. **When creating a new lane:**
   - Put actual PRD content in `PRD.md` at lane root
   - Create `HISTORY.md` for version tracking
   - Use `attempts/v{VERSION}/` folder structure

2. **When bumping PRD version:**
   - Update lane-root `PRD.md` with new requirements
   - Add new row to `HISTORY.md` version table
   - Mark old version as CLOSED in HISTORY.md
   - Frozen snapshots remain in their version folders

3. **When starting an attempt:**
   - Copy current lane-root PRD to `attempts/v{VERSION}/PRD.md` as frozen snapshot
   - Document learnings in `attempts/v{VERSION}/attempt-NNN/evidence/`, NOT in PRD

---

## Pattern Recognition

This decision documents a specific instance of a broader pattern:

**Anti-Pattern: Index Files Pretending to Be Authority**

When a file at a canonical location (like `PRD.md`) only points to the real content elsewhere, it creates:
- Confusion about source of truth
- Version drift across multiple files
- Maintenance burden

**Correct Pattern: Authority at Canonical Location**

The file at the canonical location should contain the authoritative content. Metadata, history, and navigation can live in adjacent files.

**Elevation Candidate:**

If this pattern recurs in other contexts (not just PRDs), consider elevating to:
- `/canon/odd/appendices/canonical-authority-pattern.md` — General pattern
- Or adding to `/canon/constraints/README.md` — As a design constraint

---

## Evidence

### Triggering Commit

- Commit: `2fc6cb6` — "fix(fluent-mobile): remove hardcoded PRD version from Starting an Attempt"
- Problem: PRD.md said v0.3 is active, but instructions said to use v0.2

### Refactoring Commit

- Commit: `530f0d7` — "refactor(fluent-mobile): align lane structure with convention"
- 54 files changed
- Renamed `prd-v0.X/` → `v0.X/` across all versions
- Promoted v0.3 content to lane-root PRD.md
- Created HISTORY.md for version tracking

### Root Cause

Lane was created before convention was fully established. The "versioned PRD in subfolder" approach seemed logical at the time but violated the principle that canonical locations should contain authoritative content.

---

## See Also

- [D0009: Multi-Lane PRD Architecture](./D0009-multi-lane-prd-architecture.md) — Original multi-lane decision
- [Product Lanes](/docs/appendices/product-lanes.md) — Lane architecture documentation
- [Fluent Mobile HISTORY.md](/products/fluent-mobile/HISTORY.md) — Example implementation
