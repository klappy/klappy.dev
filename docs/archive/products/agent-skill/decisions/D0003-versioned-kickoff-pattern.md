# D0003 — Versioned KICKOFF.md Pattern

## Decision

Each PRD version has its own `KICKOFF.md` with detailed shaping instructions. A minimal `ATTEMPT_KICKOFF.md` at the lane root points to the active version's KICKOFF.

## Status

**Active**

## Context

Initially, a single `prompts/ATTEMPT_KICKOFF.md` contained all attempt instructions. This created problems:

1. Instructions might need to change between attempts on the same PRD
2. Frozen versions should have frozen instructions for auditability
3. A folder for a single file is unnecessary overhead

## Why

- **Mutability**: Version-specific KICKOFF can evolve between attempts
- **Auditability**: When version is frozen, its KICKOFF is frozen too
- **Simplicity**: One-liner at root, details in version folder
- **Tight coupling**: KICKOFF and PRD are co-located and evolve together

## Consequences

- ✅ Instructions can evolve per-version without affecting other versions
- ✅ Frozen versions have complete, auditable instruction sets
- ✅ External kickoff is stable (just update the version pointer)
- ✅ No unnecessary `prompts/` folder
- ⚠️ Must remember to create KICKOFF.md when creating new version

## Relationship to Canon

- **Overrides**: Canon pattern of centralized kickoff prompt
- **Extends**: Canon principle of attempt containment
- **Candidate for elevation**: Yes — useful pattern for any lane with versioned PRDs

## Evidence

- Conversation: 2026-01-20 (structure discussion)
- Implementation: `ATTEMPT_KICKOFF.md`, `v1.1/KICKOFF.md`, `v1.2.1/KICKOFF.md`
