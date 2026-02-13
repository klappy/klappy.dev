# D0002 — Lane-Owned Cloudflare Pages Deployment

## Decision

The agent-skill lane owns its own Cloudflare Pages deployment, separate from the website lane. No cross-lane dependencies for distribution.

## Status

**Active**

## Context

PRD v1.2 attempted to distribute the compiled pack via the website lane's Cloudflare Pages deployment. This required modifying the website build process (`infra/scripts/smart-build.js`), which violated lane isolation.

The attempt proved the mechanism worked (via mock testing), but the PRD could not be satisfied without cross-lane modification.

## Why

- **Lane isolation**: Attempts cannot modify files outside their lane
- **Independence**: Lane can deploy without coordinating with other lanes
- **Simplicity**: No need to modify shared infrastructure
- **Ownership**: Lane is fully responsible for its deployment lifecycle

## Consequences

- ✅ Full lane isolation maintained
- ✅ No cross-lane coordination required
- ✅ Deployment can happen independently of website lane
- ⚠️ Requires separate Cloudflare Pages project setup
- ⚠️ May result in different domain (e.g., `agent-skill.klappy.dev` vs `klappy.dev/packs/`)

## Relationship to Canon

- **Overrides**: None (canon doesn't specify deployment ownership)
- **Extends**: Canon lane isolation principle
- **Candidate for elevation**: Yes — establishes pattern for lane-owned infrastructure

**Note**: Canon already documented lane isolation extensively (`product-lanes.md`: "Lanes share canon, not lifecycle"). Writing PRD v1.2 to require website build modification was a RTFM failure — we should have known cross-lane modification was prohibited. This decision documents the DEPLOYMENT pattern that respects the existing isolation principle.

## Evidence

- Conversation: 2026-01-20 (v1.2 failure analysis)
- Failed attempt: `v1.2/attempts/attempt-001/ATTEMPT.md`
- Learning source: `v1.2/attempts/attempt-001/LEARNINGS.md`
- PRD: `v1.2.1/PRD.md` (implements this decision)
