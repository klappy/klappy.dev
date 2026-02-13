# D0006 — Lane-Level Decision Logs

## Decision

Lanes maintain their own `decisions/` folder for lane-specific architecture decisions that don't rise to canon level but need documented rationale.

## Status

**Active**

## Context

Canon says "Cross-lane learnings are captured in decision logs, not PRD mutations" (`product-lanes.md`). However, ODD only has repo-level decisions (`/odd/decisions/`).

When this lane deviated from canon patterns (version-first structure, versioned kickoff, etc.), we needed a place to document:

- What we decided
- Why we decided it
- How it relates to canon
- Whether it's an elevation candidate

Without lane-level decisions, these learnings would be scattered across LEDGER, ROADMAP, and attempt files — harder to find and replicate.

## Why

- **Transparency**: Deviations from canon are explicitly documented
- **Replicability**: Other lanes can copy successful patterns
- **Elevation path**: Patterns that work can be proposed for canon
- **Auditability**: Future maintainers understand why things are different

## Structure

```
products/<lane>/decisions/
├── index.md                    # Decision log with tables
├── D0001-<title>.md
├── D0002-<title>.md
└── ...
```

Each decision includes:

- Decision statement
- Context (what prompted this)
- Relationship to canon (overrides, extends, gap)
- Elevation candidate flag

## Consequences

- ✅ Lane deviations are documented and justified
- ✅ Patterns can be shared across lanes
- ✅ Clear path from lane → canon promotion
- ✅ Aligns with canon statement about decision logs
- ⚠️ One more folder to maintain
- ⚠️ Must avoid duplicating canon decisions

## Relationship to Canon

- **Extends**: Canon "decision logs" concept to lane level
- **Supports**: Canon statement "Cross-lane learnings are captured in decision logs"
- **Gap filled**: Canon only had repo-level decisions
- **Candidate for elevation**: Yes — useful for any lane with deviations

## Evidence

- Conversation: 2026-01-20
- Canon reference: `product-lanes.md` line 227
- Implementation: `products/agent-skill/decisions/` (this folder)
