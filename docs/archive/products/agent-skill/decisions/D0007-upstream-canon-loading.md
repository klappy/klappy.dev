# D0007 — Upstream Canon Loading via Public URL

## Decision

Agent kickoffs load the compiled ODD canon pack from a public URL FIRST (upstream), before any lane-specific instructions. The URL points to `/latest/` which resolves to the current champion version.

## Status

**Active**

## Context

The agent-skill lane produces a compiled pack that contains ODD philosophy (manifesto, constraints, decision rules, etc.). For agents to make good decisions, they need this context BEFORE reading lane-specific instructions.

Two problems with local file references:

1. **Not portable**: `../v1.1/dist/prd-guide-pack.md` only works inside this repo
2. **Buried context**: If canon comes after lane instructions, it can be obscured

## Why

- **Portable**: Public URL works in any context (parallel lanes, external projects)
- **Upstream loading**: Canon shapes everything that follows, so it must come first
- **Latest convention**: `/latest/` always points to current champion, no manual updates
- **Parallel reuse**: Other lanes can reference the same URL

## Pattern

### URL Structure

```
https://agent-skill.klappy.dev/
├── latest/                    # Always points to current champion
│   └── prd-guide-pack.md
├── v1.1/dist/
│   └── prd-guide-pack.md
└── ...
```

### Kickoff Structure

```markdown
# Kickoff

## Step 0: Load ODD Canon (UPSTREAM)

Read and internalize: https://agent-skill.klappy.dev/latest/prd-guide-pack.md

---

## Step 1: Lane-specific instructions
...
```

## Consequences

- ✅ Agents start with full ODD context
- ✅ Parallel lanes can use the same pack
- ✅ External projects can bootstrap with ODD
- ✅ No manual version updates needed (latest redirects)
- ⚠️ Requires deployment infrastructure (v1.2.1 scope)
- ⚠️ Network dependency (URL must be accessible)

## Relationship to Canon

- **Extends**: Canon compilation pattern
- **New pattern**: Public URL + latest convention + upstream loading
- **Candidate for elevation**: Yes — other lanes producing packs should follow

## Evidence

- Conversation: 2026-01-20
- Implementation: v1.2.1 attempt will create deployment
- Will update: `ATTEMPT_KICKOFF.md` to reference public URL
