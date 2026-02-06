# PRD: ODD Agent Skill

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.1             |
| **Lane**        | agent-skill      |
| **Status**      | Frozen           |
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

---

## Background

This is the whole point.

This PRD is about how agents think, not what they render.

This is not tied to this website. This should work on any project.

Once this succeeds, any future PoC can start without rebuilding process.

**V1 Focus**: Before agents can run evolutionary attempts or detect failure, they need to help humans write better PRDs. V1 delivers a portable, compiled pack that any LLM can use to guide PRD creation using ODD principles.

---

## In Scope (V1)

- Compiled pack for PRD creation guidance
- Distilled ODD philosophy (manifesto, constraints, decision rules)
- PRD template structure
- Interactive conversation flow instructions
- Questions to probe for outcomes, evidence, and constraints
- Anti-pattern detection (feature-first thinking, untestable criteria)

---

## Explicitly Out of Scope (V1)

- UI rendering (belongs to website lane)
- Website styling or navigation
- Human onboarding (belongs to website lane)
- Content authoring for humans
- Helping humans understand ODD (belongs to ai-navigation lane)
- MCP server integration (V2+)
- Cursor SKILL.md format (V2+)
- Attempt execution guidance (V2+)
- Failure detection / self-improvement (V2+)
- Multi-project orchestration (V2+)

---

## Success Criteria

- [ ] Pack can be consumed by any LLM with 100K+ context window
- [ ] Agent using pack asks clarifying questions about outcomes (not features)
- [ ] Agent using pack identifies untestable success criteria
- [ ] Agent using pack suggests missing constraints or non-goals
- [ ] Resulting PRD follows ODD template structure
- [ ] No dependency on this repo's UI or tooling

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] Compile plan exists at `v1.1/src/compile-plan.json`
- [ ] Interactive guidance exists at `v1.1/src/INSTRUCTIONS.md`
- [ ] Pack generated at `v1.1/dist/prd-guide-pack.md`
- [ ] Pack includes valid provenance header (lane, pack, built_at, git_commit, sources, source_hashes)
- [ ] Pack tested with Claude Code (or similar) on a sample project
- [ ] Evidence: transcript of successful PRD creation session
- [ ] Resulting PRD demonstrates ODD alignment (outcomes, evidence, constraints)
- [ ] Self-audit completed with explicit tradeoffs

---

## Primary User

AI agents (Claude Opus 4.5 or similar) operating in Claude Code, Cursor, or any IDE with LLM context injection.

---

## Target Use Case

A developer wants to create a V1 PRD for their product using ODD principles. They paste the pack into their AI context, and the AI guides them through:

1. Clarifying the outcome (not features)
2. Defining testable success criteria
3. Establishing constraints and non-goals
4. Specifying evidence requirements
5. Completing a self-audit

---

## Compiled Pack (V1 Deliverable)

### Command

- `npm run lane:compile -- --lane agent-skill --pack prd-guide`

### Output

- `v1.1/dist/prd-guide-pack.md`
- `v1.1/dist/_meta/prd-guide-COMPILE_META.json`

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
7. `v1.1/src/INSTRUCTIONS.md` - Interactive guidance

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- Evolution, not automation (humans stay in the loop)
- Explicit tradeoffs required
- Bounded evolution (no self-modifying goals)
- Portability: pack must work outside this repository

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.1/attempts/attempt-NNN/`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints/README.md`
- Definition of Done: `/canon/constraints/definition-of-done.md`
- Evolution philosophy: `/canon/odd/appendices/evolution-not-automation.md`
- Compilation: `/canon/odd/appendices/compilation.md`
- Compilation targets: `/canon/odd/appendices/compilation-targets.md`

---

## Freeze Notice

This PRD is **FROZEN**. It was used by attempt-001 which achieved CHAMPION status.

Any modifications require a new PRD version.
