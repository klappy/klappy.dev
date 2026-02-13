# D0004 — README + CONTRACT Documentation Pattern

## Decision

Lane documentation is split into two files: `README.md` for human-friendly overview and `CONTRACT.md` for formal structure/deviations. README links to CONTRACT for details.

## Status

**Active**

## Context

We needed to document lane-specific deviations from canon (version-first structure, kickoff pattern, etc.). Options considered:

1. Single README with everything
2. CONTRACT.md only (formal)
3. README.md only (informal)
4. README + CONTRACT (both audiences)

## Why

- **README is universal**: First file humans and agents look for
- **CONTRACT is formal**: Structured, precise deviation documentation
- **Separation of concerns**: Overview vs. formal contract
- **Antifragile**: Human-readable prose survives better than brittle JSON manifests

## Consequences

- ✅ Humans get quick orientation from README
- ✅ Agents can find formal specifications in CONTRACT
- ✅ Neither file is cluttered with the other's content
- ✅ CONTRACT can have structured sections without hurting README readability
- ⚠️ Two files to maintain (but they serve different purposes)

## Relationship to Canon

- **Overrides**: None (canon doesn't specify lane documentation pattern)
- **Extends**: Canon principle of documentation as product
- **Candidate for elevation**: Yes — useful pattern for any lane with deviations

## Evidence

- Conversation: 2026-01-20 (documentation discussion)
- Implementation: `README.md`, `CONTRACT.md`
