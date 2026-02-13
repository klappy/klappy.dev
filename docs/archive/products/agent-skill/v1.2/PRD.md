# PRD: ODD Agent Skill

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.2             |
| **Lane**        | agent-skill      |
| **Status**      | Frozen (Failed)  |
| **Created**     | 2026-01-17       |
| **Updated**     | 2026-01-20       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

This lane is allowed to have no UI and is not required to satisfy build-output unless it produces a deployable artifact.

---

## Objective

Deliver a compiled pack (`prd-guide-pack.md`) that enables AI agents to interactively guide humans through creating ODD-aligned PRDs.

**v1.2 addition**: The compiled pack is publicly accessible at a stable URL without requiring clone or build.

---

## Background

This is the whole point.

This PRD is about how agents think, not what they render.

This is not tied to this website. This should work on any project.

Once this succeeds, any future PoC can start without rebuilding process.

**V1.1 delivered**: A portable, compiled pack that any LLM can use to guide PRD creation using ODD principles.

**V1.2 adds**: Zero-friction public distribution so anyone can grab the pack from a URL.

---

## In Scope (v1.2)

### From v1.1 (retained)

- Compiled pack for PRD creation guidance
- Distilled ODD philosophy (manifesto, constraints, decision rules)
- PRD template structure
- Interactive conversation flow instructions
- Questions to probe for outcomes, evidence, and constraints
- Anti-pattern detection (feature-first thinking, untestable criteria)

### New in v1.2

- Public URL for pack distribution
- Integration with existing Cloudflare Pages deployment
- Automated build-and-deploy (no manual upload)

---

## Explicitly Out of Scope (v1.2)

- UI rendering (belongs to website lane)
- Website styling or navigation
- Human onboarding (belongs to website lane)
- Content authoring for humans
- Helping humans understand ODD (belongs to ai-navigation lane)
- MCP server integration (future)
- Cursor SKILL.md format (future)
- Attempt execution guidance (future)
- Failure detection / self-improvement (future)
- Multi-project orchestration (future)

---

## Success Criteria

### v1.1 Criteria (retained)

- [ ] Pack can be consumed by any LLM with 100K+ context window
- [ ] Agent using pack asks clarifying questions about outcomes (not features)
- [ ] Agent using pack identifies untestable success criteria
- [ ] Agent using pack suggests missing constraints or non-goals
- [ ] Resulting PRD follows ODD template structure
- [ ] No dependency on this repo's UI or tooling

### v1.2 Criteria (new)

- [ ] Pack available at stable public URL (e.g., `https://klappy.dev/packs/agent-skill/prd-guide-pack.md`)
- [ ] URL returns HTTP 200 with correct pack content
- [ ] No clone or build required for consumers to access pack
- [ ] URL documented in lane README

---

## Definition of Done

An attempt against this PRD is complete when:

### v1.1 Requirements (retained)

- [ ] Compile plan exists at `infra/compile/plans/agent-skill/prd-guide.json`
- [ ] Interactive guidance exists at `products/agent-skill/src/INSTRUCTIONS.md`
- [ ] Pack generated at `products/agent-skill/dist/prd-guide-pack.md`
- [ ] Pack includes valid provenance header (lane, pack, built_at, git_commit, sources, source_hashes)

### v1.2 Requirements (new)

- [ ] Distribution mechanism implemented (build script copies pack to website dist)
- [ ] Public URL verified with HTTP 200 after deployment
- [ ] Pack content at URL matches local build output
- [ ] `products/agent-skill/src/README.md` updated with public URL

### Evidence Required

- [ ] Screenshot of pack URL returning 200
- [ ] Diff showing pack content matches local build
- [ ] Self-audit completed with explicit tradeoffs

---

## Primary User

AI agents (Claude Opus 4.5 or similar) operating in Claude Code, Cursor, or any IDE with LLM context injection.

---

## Target Use Case

A developer wants to create a V1 PRD for their product using ODD principles.

**v1.1 flow**: Clone repo, build pack, paste into AI context.

**v1.2 flow**: Copy pack from public URL, paste into AI context. No clone or build required.

The AI guides them through:

1. Clarifying the outcome (not features)
2. Defining testable success criteria
3. Establishing constraints and non-goals
4. Specifying evidence requirements
5. Completing a self-audit

---

## Compiled Pack

### Source

- `products/agent-skill/src/INSTRUCTIONS.md` - Interactive guidance
- `products/agent-skill/src/compile-plan.json` - Build configuration

### Build Command

- `npm run lane:compile -- --lane agent-skill --pack prd-guide`

### Output

- `products/agent-skill/dist/prd-guide-pack.md`
- `products/agent-skill/dist/_meta/prd-guide-COMPILE_META.json`

### Distribution (v1.2)

- Deployed to: `https://klappy.dev/packs/agent-skill/prd-guide-pack.md`
- Automated via website build process

### Verification

- `npm run verify:compiled -- --lane agent-skill --pack prd-guide`

### Contract

- The compiled pack MUST include a provenance header as defined in:
  - `klappy://canon/odd/compilation`

### Sources (in order)

1. `canon/odd/manifesto.md` - Philosophy foundation
2. `canon/constraints.md` - Baseline assumptions
3. `canon/decision-rules.md` - Decision heuristics
4. `canon/definition-of-done.md` - Completion criteria
5. `canon/self-audit.md` - Review checklist
6. `docs/PRD/PRD_TEMPLATE.md` - PRD structure
7. `products/agent-skill/src/INSTRUCTIONS.md` - Interactive guidance

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- Evolution, not automation (humans stay in the loop)
- Explicit tradeoffs required
- Bounded evolution (no self-modifying goals)
- Portability: pack must work outside this repository

### v1.2 Constraints

- Must integrate with existing Cloudflare Pages deployment
- Must not require manual steps after merge to main
- Pack must be regeneratable (not manually uploaded)

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.2/attempts/attempt-NNN/`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints/README.md`
- Definition of Done: `/canon/constraints/definition-of-done.md`
- Evolution philosophy: `/canon/odd/appendices/evolution-not-automation.md`
- Compilation: `/canon/odd/appendices/compilation.md`
- Compilation targets: `/canon/odd/appendices/compilation-targets.md`
- v1.1 Champion: `../v1.1/attempts/attempt-001/`

---

## Freeze Notice

This PRD is **FROZEN**. Attempt-001 ran against it and FAILED.

**Failure Reason**: The PRD requires cross-lane modification (website build process) which violates lane isolation constraints.

The mechanism was proven to work via mock testing, but the PRD cannot be satisfied without cross-lane modification.

See `v1.2/attempts/attempt-001/LEARNINGS.md` for detailed analysis.

A new PRD version (v1.2.1) addresses these issues with a revised approach.
