# D0001 — Version-First Folder Structure

## Decision

This lane uses version-first folder organization (`vX.Y/src/`, `vX.Y/dist/`, `vX.Y/attempts/`) instead of the canon default (`src/`, `dist/`, `attempts/prd-vX.Y/`).

## Status

**Active**

## Context

PRD v1.2 failed because it required cross-lane modification. During the post-mortem, we discovered that:

1. Dependents need stable URLs to pin to specific versions
2. Assets must be immutable once published
3. Each version should be fully self-contained for auditability

The canon default structure makes versioning implicit (buried in attempts folder). This lane needs explicit versioning at the top level.

## Why

- **Immutable releases**: Published assets are versioned by PRD version and persist indefinitely
- **Dependent stability**: Consumers can pin to specific versions (e.g., `v1.1/dist/prd-guide-pack.md`)
- **Clear boundaries**: Each version is fully self-contained
- **Parallel development**: Multiple versions can evolve independently
- **Auditability**: When a version is frozen, everything in that folder is frozen

## Consequences

- ✅ Versioned URLs are stable and predictable
- ✅ Failed versions are preserved alongside successful ones
- ✅ Easy to see all versions at a glance
- ⚠️ Deviates from canon default (documented in CONTRACT.md)
- ⚠️ Requires updating paths in multiple places when referencing

## Relationship to Canon

- **Overrides**: Canon default of `attempts/prd-vX.Y/` nesting
- **Extends**: Canon principle of immutable attempts
- **Candidate for elevation**: Yes — if other lanes need versioned distribution

**Note**: Canon already documented PRD immutability (`repo-topology.md`: "PRD (frozen) | N/A (immutable)"). Our v1.2 failure to increment versions was a RTFM failure, not a canon gap. This decision addresses the STRUCTURE pattern, not the immutability principle.

## Evidence

- Conversation: 2026-01-20 (v1.2 failure analysis)
- Learning source: `v1.2/attempts/attempt-001/LEARNINGS.md`
- Documentation: `CONTRACT.md` (Structure Deviation section)
