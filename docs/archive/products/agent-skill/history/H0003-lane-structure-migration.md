# H0003 — Lane Structure Migration

- **Date**: 2026-01-20
- **Type**: Infrastructure
- **Epoch**: E0003 (evidence-first)

## Summary

Migrated lane from flat structure to version-first structure, enabling immutable versioned releases.

## What Changed

**Before:**

```
products/agent-skill/
├── PRD.md
├── src/
├── dist/
└── attempts/
    └── prd-vX.Y/
```

**After:**

```
products/agent-skill/
├── README.md        # Lane overview
├── CONTRACT.md      # Formal structure/deviations
├── ROADMAP.md       # Vision document
├── history/         # What happened (this folder)
├── decisions/       # Architecture decisions
├── prompts/
│   └── ATTEMPT_KICKOFF.md
├── v1.1/            # Version-first
│   ├── PRD.md       # Frozen
│   ├── src/
│   ├── dist/
│   └── attempts/
├── v1.2/            # Failed version
│   ├── PRD.md       # Frozen
│   └── attempts/
└── v1.2.1/          # Current
    └── PRD.md       # Active
```

## Why

- Versioned assets enable immutable releases
- Dependents can pin to specific versions
- Each version is fully self-contained
- Clear boundaries between version states

## Documented In

- `README.md` — Lane overview, file index, version table
- `CONTRACT.md` — Formal deviation from canon structure
- `decisions/D0001-version-first-structure.md` — Decision record
