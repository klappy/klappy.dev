# PRD: ODD Agent Skill — PRD Elicitation Enhancement

| Field             | Value       |
| ----------------- | ----------- |
| **PRD Version**   | v1.3.1      |
| **Lane**          | agent-skill |
| **Status**        | Active      |
| **Created**       | 2026-01-21  |
| **Updated**       | 2026-01-22  |
| **Author**        | Chris Klapp |
| **Canon Version** | 0.10.0      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Objective

Transform the prd-guide pack from an informational resource (teaches ODD) into an interrogative system (extracts PRDs from humans) by adding stage typing, asset intake, and a formal elicitation loop.

---

## Background

**v1.2.4 delivered**: Canon refresh to v0.8.0 with Cognitive Partitioning and Tool Specialization.

**Problem identified**: External review found the pack "conceptually sound but operationally incomplete":

| Strength | Gap |
|----------|-----|
| Canonical alignment unusually strong | No structured elicitation loop |
| Compilation philosophy correct | No stage-aware questioning |
| Agent authority properly scoped | No asset-gathering protocols |
| Treats PRDs as evolving intent | No explicit interview modes |

The pack teaches agents how ODD works, but does not fully teach agents how to elicit a PRD from a human.

**v1.2.x INSTRUCTIONS.md** has 7 stages, but:

- Jumps straight to "What outcome are you trying to achieve?"
- No classification of PRD type (PoC vs Feature vs Fix)
- No inventory of existing assets
- No explicit agent role declaration
- No ambiguity capture stage

**v1.3 addresses this** by adding:

- Agent Role Declaration (elicitation system, not author)
- PRD Stage Typing gate before questioning
- Resequenced Interview Loop with Inventory and Ambiguity Capture
- Asset Intake Contract with guidance for partial information

---

## In Scope (v1.3)

### From v1.2.4 (retained)

- Lane-owned Cloudflare Pages deployment
- Versioned asset URLs
- Canon sources at v0.8.0
- INSTRUCTIONS.md as ephemeral artifact
- Compile plan in lane (`src/compile-plan.json`)

### New in v1.3

#### 1. Agent Role Declaration

Add explicit framing at the top of INSTRUCTIONS.md:

```markdown
## Agent Role

You are not a PRD author.
You are a PRD elicitation system that helps humans externalize intent, constraints, uncertainty, and evidence.

You extract. You do not invent.
```

#### 2. PRD Stage Typing Gate

Add classification before current Stage 1:

| Stage Type | Evidence Expectations | Ambiguity Tolerance |
|------------|----------------------|---------------------|
| PoC / Exploration | Minimal, learning-focused | High |
| Feature | Required, scope bounded | Medium |
| Fix | Root cause required, regression risk | Low |
| Product slice | End-to-end verification | Medium |
| Refactor / migration | No user-facing change | Low |

Questions:
- "Is this exploring something new, building something known, or fixing something broken?"
- "Will users see a change, or is this internal?"

#### 3. Formal Interview Loop (Resequenced)

| Phase | v1.2.x Stage | v1.3 Phase |
|-------|--------------|------------|
| NEW | - | **0. Stage Identification** — What type of PRD is this? |
| NEW | - | **1. Orient** — What are we trying to learn or change? |
| NEW | - | **2. Inventory** — What assets already exist? |
| Moved | Stage 4 | **3. Constraint Surfacing** — Time, scope, reversibility, risk |
| Moved | Stage 1 | **4. Outcome Framing** — What would "better" look like? |
| Moved | Stage 2 | **5. Evidence Definition** — How will we know? |
| NEW | - | **6. Ambiguity Capture** — What is still unclear or contested? |
| Same | Stages 3,5,6,7 | **7. Draft Assembly** — Non-goals, risks, final PRD |

Key changes:
- Inventory BEFORE outcome (you can't define what you want until you know what you have)
- Explicit ambiguity capture (ODD acknowledges uncertainty)
- Stage identification gates the entire flow

#### 4. Asset Intake Contract

| Type | Examples | When missing |
|------|----------|--------------|
| Text | docs, notes, prior PRDs | Proceed with "no prior docs" flag |
| Media | screenshots, recordings, mockups | Proceed if non-UI; require for UI work |
| Links | repos, tickets, deployed systems | Note as "greenfield" if no links |
| Oral testimony | interview answers | This is the PRD session itself |

Guidance:
- "What documentation already exists for this?"
- "Do you have any screenshots, mockups, or recordings?"
- "Is there a repo, ticket, or deployed system I should know about?"
- Proceed with what's available; don't block on missing assets

---

## Explicitly Out of Scope (v1.3)

- Changes to distribution architecture (Cloudflare Pages setup unchanged)
- Multi-pack compilation (that's v1.4)
- Tiered content inclusion (that's v1.4)
- Role-specific packs (that's v1.5+)
- Renaming the pack (keep "prd-guide" for now)

---

## Success Criteria

- [ ] INSTRUCTIONS.md includes Agent Role Declaration section
- [ ] INSTRUCTIONS.md includes Stage Identification gate (Phase 0)
- [ ] INSTRUCTIONS.md includes Inventory phase (Phase 2)
- [ ] INSTRUCTIONS.md includes Ambiguity Capture phase (Phase 6)
- [ ] INSTRUCTIONS.md includes Asset Intake guidance
- [ ] Interview loop resequenced per spec
- [ ] Stage Typing table included with evidence expectations
- [ ] Pack available at versioned URL (`/v1.3/prd-guide-pack.md`)
- [ ] `/latest/` updated to serve v1.3 pack
- [ ] `latest/README.md` updated to reference v1.3

---

## Definition of Done

An attempt against this PRD is complete when:

### INSTRUCTIONS.md Content

- [ ] Agent Role Declaration added at top
- [ ] Stage Identification (Phase 0) defined with PRD type classification
- [ ] Inventory (Phase 2) defined with asset intake questions
- [ ] Ambiguity Capture (Phase 6) defined with uncertainty documentation
- [ ] Interview loop has 8 phases (0-7) in correct order
- [ ] Stage Typing table includes all 5 types with implications

### Compilation

- [ ] Compile succeeds using lane-owned `src/compile-plan.json`
- [ ] Output written to attempt's `evidence/` folder
- [ ] Provenance header shows canon v0.10.0 source hashes
- [ ] INSTRUCTIONS.md generated fresh (not copied from persisted source)

### Distribution

- [ ] `public/agent-skill/v1.3/prd-guide-pack.md` created
- [ ] `public/agent-skill/latest/prd-guide-pack.md` updated
- [ ] `public/agent-skill/latest/README.md` updated (version reference)
- [ ] Public URL verified with HTTP 200

### Verification

- [ ] INSTRUCTIONS.md demonstrably different from v1.2.4
- [ ] Agent using pack asks about PRD type before jumping to outcomes
- [ ] Agent using pack asks about existing assets before defining scope
- [ ] Ambiguity capture section present and functional

### Evidence Required

- [ ] Diff showing new INSTRUCTIONS.md content vs v1.2.4
- [ ] Screenshot or log of successful compile output
- [ ] HTTP 200 verification of preview URL
- [ ] Sample conversation demonstrating elicitation flow
- [ ] Self-audit completed

---

## Pack Sources

The compiled pack concatenates these files:

### Canon Sources (v0.10.0)

| # | Source | Purpose |
|---|--------|---------|
| 1 | `canon/README.md` | Canon orientation, meta rules, confidence scores |
| 2 | `odd/README.md` | ODD folder index, core thesis |
| 3 | `odd/terminology.md` | **NEW** Constrained vocabulary and disambiguation |
| 4 | `odd/manifesto.md` | Full ODD philosophy |
| 5 | `odd/cognitive-partitioning.md` | Scaling pattern for reasoning systems |
| 6 | `odd/appendices/README.md` | Portable appendices summarized |
| 7 | `odd/decisions/README.md` | ODD conceptual decisions |
| 8 | `canon/odd/appendices/tool-specialization.md` | Tool isolation pattern |
| 9 | `canon/constraints.md` | Baseline assumptions |
| 10 | `canon/decision-rules.md` | Decision heuristics |
| 11 | `canon/definition-of-done.md` | Completion criteria |
| 12 | `canon/self-audit.md` | Review checklist |
| 13 | `docs/PRD/PRD_TEMPLATE.md` | PRD structure |

### Generated Sources (ephemeral)

| # | Source | Purpose |
|---|--------|---------|
| 13 | `INSTRUCTIONS.md` | **UPDATED** Interactive elicitation guidance |

**Note:** INSTRUCTIONS.md is the primary deliverable of this PRD. It must include all elicitation enhancements.

---

## Constraints

- **Elicitation focus**: Primary goal is improving the interview mechanics
- **Same distribution**: Uses existing Cloudflare Pages setup
- **Same canon sources**: v0.10.0 sources (includes terminology.md)
- **ODD formula**: Pack + CONTRACT + PRD = Attempt (nothing else)
- **Ephemeral artifacts**: Generated code (INSTRUCTIONS.md) not persisted
- **Lane isolation**: All changes stay within agent-skill lane
- **Backward compatible**: Existing PRD guidance still works (enhanced, not replaced)

---

## Risks

| Risk | Mitigation |
|------|------------|
| Elicitation loop changes may require iteration | v1.3 can have patch versions (v1.3.1, v1.3.2) |
| Stage typing may not cover all cases | Include "Other" type with fallback to generic flow |
| Interview loop may feel too long | Can be streamlined in v1.3.x based on feedback |
| Asset intake may block users who have nothing | Explicit guidance to proceed with partial information |

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.3/attempts/attempt-NNN/`

---

## Related Documents

- v1.2.4 Champion: [H0007](../history/H0007-v1.2.4-champion.md)
- v1.2.4 Attempt: `v1.2.4/attempts/attempt-001/`
- Roadmap: [ROADMAP.md](./ROADMAP.md)
- External Review: Feedback that identified elicitation gap (provided by user)
