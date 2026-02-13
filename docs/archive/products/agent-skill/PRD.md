# PRD: ODD Agent Skill — Tier-Aware Pack Compiler

| Field             | Value       |
| ----------------- | ----------- |
| **PRD Version**   | v1.4.1      |
| **Lane**          | agent-skill |
| **Status**        | Active      |
| **Created**       | 2026-01-21  |
| **Updated**       | 2026-01-22  |
| **Author**        | Chris Klapp |
| **Canon Version** | 0.10.0      |

---

## v1.4.1 Scope

**Release: v1.4.1 — Tier-Aware Pack Compiler**

**Goal:** Make pack compilation tier-aware by implementing:

1. **Discovery** — for default pack types (folder scan + filters)
2. **Tier 0 exclusion** — always, even if explicitly listed
3. **Tier-based projection** — Tier 1/2/3 → high/medium/low
4. **Auditability** — via `--plan` output and CI checks

**v1.4.1 explicitly includes:**

- Tier-aware compilation (discovery + exclusion + projection + plan)

**v1.4.1 fixes:**

- Tier 0 inclusion bug (docs marked `tier: 0` were being included)
- Tier projection ignored bug (all docs compiled at full detail)

**Non-goals (explicit):**

- No new projection formats beyond existing high/medium/low definitions
- No content rewrites of docs in this release
- No new UI/UX changes outside CLI/compiler outputs

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

**v1.4.0 defined**: Tiered context construction requirements (what the system should do).

**v1.4.1 implements**: The compiler changes to actually enforce those requirements.

---

## Current Behavior (Bug)

The current compiler does not enforce the tier system:

| Issue | Current Behavior | Required Behavior |
|-------|------------------|-------------------|
| Selection mode | Explicit whitelist only | Support discovery + curated |
| Tier 0 handling | Included if in whitelist | Always excluded |
| Projection | Full detail for all tiers | Tier 1→high, Tier 2→medium, Tier 3→low |
| Tier metadata | Ignored | Read from frontmatter, enforce |
| Auditability | None | `--plan` output with decisions |

**Critical example — Tier 0 violation:**

`odd/README.md` has `tier: 0` (scope exclusion) but was included in compiled packs because the compiler uses a whitelist that ignores tier metadata.

**Root cause:** The compiler concatenates files from an explicit list without reading or enforcing tier frontmatter.

---

## Functional Requirements (v1.4.1)

### FR-1: Tier Metadata Parsing

The compiler must read frontmatter and determine `tier: 0|1|2|3` per file.

**Missing tier handling:**

- Default: missing tier → Tier 3 (include at low projection)
- Must emit a warning in plan/audit output when tier is missing

**Implementation:** `readFrontmatterTier(filePath) → { tier, warnings }`

### FR-2: Tier 0 Exclusion Rule (Hard Rule)

Tier 0 files must never be included in any pack output.

- This includes explicitly listed/whitelisted files
- Tier 0 exclusion must be visible in `--plan` output with `reason: excluded:tier0`
- No exceptions, no overrides

### FR-3: Pack Selection Modes

Support two pack selection modes:

| Mode | Description | Example |
|------|-------------|---------|
| `curated` | Explicit file list | prd-guide (existing behavior, but now tier-enforced) |
| `discovered` | Folder scan + filters | default-odd-context (new) |

Both modes must enforce:

- Tier 0 exclusion
- Tier-based projection

### FR-4: Tier-Based Projection

Projection must happen per-file before concatenation.

| Tier | Projection | Output |
|------|------------|--------|
| Tier 1 | `high` | Full content |
| Tier 2 | `medium` | Frontmatter + description + outline |
| Tier 3 | `low` | Title + one-line summary |

**Implementation:** `projectFile(file, projection) → projectedText`

### FR-5: Auditability (`--plan`)

Add a compiler flag `--plan` that outputs per-file decisions:

| Field | Description |
|-------|-------------|
| `path` | File path |
| `tier` | 0, 1, 2, or 3 |
| `selected_by` | `curated` or `discovered` |
| `projection` | `high`, `medium`, `low`, or `excluded` |
| `included` | `true` or `false` |
| `reason` | `tier0`, `missing`, `filtered`, etc. |
| `tokens` | Estimated token count (recommended) |

Output format: table (human) or JSON (CI).

### FR-6: Deterministic Ordering

Pack output ordering must be deterministic:

- Sort by path (or explicit stable ordering rules)
- Plan output must reflect final order
- Same inputs → same output across runs

---

## Core Requirements (v1.4.0, retained)

### Default Context Construction

The agent skill shall construct a default odd-context-pack using tier-weighted projection detail.

| Document Tier | Default Projection Detail |
|---------------|---------------------------|
| Tier 1        | `high` (full content)     |
| Tier 2        | `medium` (structural)     |
| Tier 3        | `low` (minimal)           |

**Requirements:**

1. **Tier determines default detail** — The agent shall project documents at detail levels corresponding to their epistemic tier unless explicitly overridden.

2. **No tier flattening** — The agent shall not equalize detail across tiers. Tier 1 content receives more tokens than Tier 3 content by default.

3. **No folder inference** — The agent shall determine epistemic obligation from document tier metadata, not from folder location.

4. **Degradation is explicit** — When document structure is insufficient for the requested projection detail, the agent shall surface this degradation rather than compensating.

5. **No synthesized context** — The agent shall use existing document structure for projection. It shall not summarize, synthesize, or generate context to fill gaps.

### Agent Responsibilities

The agent shall:

- Respect epistemic obligation as encoded in document tiers
- Treat Tier 3 content at low detail as awareness only, not reasoning input
- Surface when documents lack structure required for projection
- Proceed with available structure without inventing compensating context

The agent shall not:

- Infer obligation from folder hierarchy
- Special-case READMEs or index files for elevated inclusion
- Promote Tier 3 content to higher detail for perceived convenience
- Summarize or synthesize documentation content

---

## Non-Goals (v1.4)

These behaviors are explicitly excluded from this release to prevent design regression:

| Non-Goal | Rationale |
|----------|-----------|
| README/index file special-casing | Navigation documents are typically Tier 3; elevating them would distort context weighting |
| Convenience-based tier promotion | Tier 3 content exists for awareness, not reasoning; promoting it undermines epistemic discipline |
| Summarization or synthesis | Projection uses authored structure only; missing structure is a signal, not a gap to fill |
| Folder-based obligation inference | Tiers are document properties, orthogonal to folder location |
| Smart exceptions | No heuristics that override tier-to-detail mapping based on content analysis |

---

## In Scope (v1.4)

### New in v1.4

#### 1. Tier-Weighted Context Pack Assembly

Implement default context construction that maps document tiers to projection detail levels:

- Tier 1 documents projected at `high` detail (full content)
- Tier 2 documents projected at `medium` detail (frontmatter, description, outline)
- Tier 3 documents projected at `low` detail (title, one-line summary)

#### 2. Projection Detail Enforcement

Add validation that the assembled context pack respects tier-to-detail mapping:

- Tier 1 content must receive highest token allocation
- Tier 3 content must not exceed minimal token allocation
- Detail level must be determinable from tier without additional logic

#### 3. Degradation Surfacing

When documents lack structure required for their projected detail level:

- Return what structure exists (no fallback to full content silently)
- Include degradation indicator in pack output
- Do not synthesize missing structural elements

### From v1.3 (retained)

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

## Explicitly Out of Scope (v1.4.1)

- Changes to distribution architecture (Cloudflare Pages setup unchanged)
- Multi-pack compilation (that's v1.5+)
- Role-specific packs (that's v1.5+)
- Renaming the pack (keep "prd-guide" for now)
- Override mechanisms for tier-to-detail mapping (future consideration)
- Dynamic detail adjustment based on token budget (future consideration)
- New projection formats (stick to high/medium/low)
- Content rewrites of existing docs

---

## Implementation Plan (v1.4.1)

### Task 1: Create Tier Reader

Implement `readFrontmatterTier(filePath)`:

- Returns `{ tier: number, warnings: string[] }`
- Parses YAML frontmatter
- Returns tier value (0, 1, 2, or 3)
- Missing tier → 3 with warning

### Task 2: Implement Selection Modes

**Curated mode:** `selectFilesCurated(packConfig)`

- Read explicit file list from config
- Pass to tier enforcement

**Discovered mode:** `selectFilesDiscovered(packConfig)`

- Allowed roots (e.g., `canon/`, `odd/`, `docs/`)
- Ignore patterns (e.g., `**/node_modules/**`)
- Only markdown (`.md` files)

### Task 3: Apply Tier Enforcement + Projection

Implement `applyTierRules(files)`:

- Returns `decisions[]` with per-file outcomes
- Enforce Tier 0 exclude (hard rule)
- Assign projection per tier (1→high, 2→medium, 3→low)

### Task 4: Projection Execution

Implement `projectFile(file, projection)`:

- `high`: return full content
- `medium`: return frontmatter + description + outline
- `low`: return title + one-line summary (blockquote)
- Concatenate projected results

### Task 5: Add `--plan` Flag

- Output table (human readable) and/or JSON (CI)
- Include: path, tier, selected_by, projection, included, reason
- Include token/word estimates (recommended)

### Task 6: CI Tests

Add automated checks for:

- AC-1: Tier 0 exclusion
- AC-2: Projection correctness
- AC-3: Discovery coverage threshold
- AC-4: Curated pack tier enforcement
- AC-5: Plan artifact generation

---

## Acceptance Criteria (v1.4.1)

These are CI-friendly gates written as Given/When/Then.

### AC-1: Tier 0 Never Included

```
Given a Tier 0 doc exists (e.g., odd/README.md with tier: 0)
When any pack is compiled
Then Tier 0 docs are excluded
And appear as excluded in --plan output with reason: tier0
```

### AC-2: Projection Correctness

```
Given Tier 2 and Tier 3 docs exist
When a pack is compiled
Then Tier 2 docs are NOT compiled at high detail
And Tier 3 docs are NOT compiled at high detail
And Tier 1 docs ARE compiled at high detail
```

### AC-3: Discovery Coverage Guardrail

```
Given repo has >100 eligible docs (Tier 1-3)
When compiling default-odd-context via discovery
Then compiled file count >= 60 (catches regression to whitelist)
```

### AC-4: Curated Pack Still Tier-Enforces

```
Given prd-guide uses a curated list
When compiling prd-guide
Then Tier 0 files in list are excluded
And Tier 2/3 files are projected (not full detail)
```

### AC-5: `--plan` Required in CI

```
Given CI runs on PR
When pack compilation runs
Then CI produces a plan artifact
And CI fails if any Tier 0 inclusion occurs
```

---

## Success Criteria

### v1.4.1 — Tier-Aware Compiler

- [ ] Compiler reads tier from frontmatter
- [ ] Tier 0 docs are never included (hard rule)
- [ ] Tier 1 → high, Tier 2 → medium, Tier 3 → low projection
- [ ] `--plan` flag outputs per-file decisions
- [ ] Discovery mode works for default-odd-context
- [ ] Curated mode still works for prd-guide (with tier enforcement)
- [ ] Output ordering is deterministic
- [ ] Missing tier defaults to Tier 3 with warning

### v1.4.0 — Tiered Context Construction (retained)

- [ ] Default context pack assembles with tier-weighted detail mapping
- [ ] No tier-flattening occurs in assembled context
- [ ] Degradation is surfaced when document structure is insufficient
- [ ] README/index files do not receive elevated detail due to file type

### v1.4.0 — Agent Behavior (retained)

- [ ] Agent behavior demonstrates tier-weighted context usage
- [ ] Tier 3 documents do not materially influence agent reasoning unless explicitly requested
- [ ] Agent does not synthesize context to compensate for missing document structure

### v1.3 — Elicitation Enhancement (retained)

- [ ] INSTRUCTIONS.md includes Agent Role Declaration section
- [ ] INSTRUCTIONS.md includes Stage Identification gate (Phase 0)
- [ ] INSTRUCTIONS.md includes Inventory phase (Phase 2)
- [ ] INSTRUCTIONS.md includes Ambiguity Capture phase (Phase 6)
- [ ] INSTRUCTIONS.md includes Asset Intake guidance
- [ ] Interview loop resequenced per spec
- [ ] Stage Typing table included with evidence expectations
- [ ] Pack available at versioned URL (`/v1.4/prd-guide-pack.md`)
- [ ] `/latest/` updated to serve v1.4 pack
- [ ] `latest/README.md` updated to reference v1.4

---

## Definition of Done

An attempt against this PRD is complete when:

### v1.4.1 — Compiler Implementation

- [ ] `default-odd-context` compiles via discovery (not whitelist)
- [ ] Tier 0 exclusion is enforced in all packs
- [ ] Tier 1/2/3 projection mapping enforced
- [ ] `--plan` flag exists and outputs readable decisions
- [ ] CI blocks Tier 0 inclusion
- [ ] CI blocks projection violations
- [ ] Pack compilation is deterministic across runs
- [ ] Missing tier defaults to Tier 3 with warning

### v1.4.1 — Acceptance Criteria Verification

- [ ] AC-1 passes: Tier 0 never included
- [ ] AC-2 passes: Projection correctness verified
- [ ] AC-3 passes: Discovery coverage >= threshold
- [ ] AC-4 passes: Curated packs tier-enforce
- [ ] AC-5 passes: `--plan` in CI with failure on Tier 0

### Context Construction (v1.4.0, retained)

- [ ] Context pack assembly implements tier-to-detail mapping
- [ ] No special-casing for README or index files
- [ ] Degradation surfaced when structure missing

### INSTRUCTIONS.md Content (v1.3, retained)

- [ ] Agent Role Declaration added at top
- [ ] Stage Identification (Phase 0) defined with PRD type classification
- [ ] Inventory (Phase 2) defined with asset intake questions
- [ ] Ambiguity Capture (Phase 6) defined with uncertainty documentation
- [ ] Interview loop has 8 phases (0-7) in correct order

### Compilation

- [ ] Compile succeeds with new tier-aware compiler
- [ ] Output written to attempt's `evidence/` folder
- [ ] Plan output included in evidence
- [ ] Provenance header shows canon v0.10.0 source hashes

### Distribution

- [ ] `public/agent-skill/v1.4.1/prd-guide-pack.md` created
- [ ] `public/agent-skill/latest/prd-guide-pack.md` updated
- [ ] `public/agent-skill/latest/README.md` updated (version reference)
- [ ] Public URL verified with HTTP 200

### Evidence Required

- [ ] `--plan` output showing tier enforcement
- [ ] Diff showing Tier 0 exclusion vs previous version
- [ ] Screenshot or log of successful compile output
- [ ] HTTP 200 verification of preview URL
- [ ] CI run showing AC-1 through AC-5 passing
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

- **Tier-detail mapping is fixed**: Tier 1 → high, Tier 2 → medium, Tier 3 → low. No adaptive logic.
- **No synthesis**: Projection uses existing document structure only. Missing structure degrades output explicitly.
- **No special cases**: READMEs, indexes, and navigation files receive tier-appropriate treatment, not elevated treatment.
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
| Missing tier defaults to Tier 3 may silently include docs at low fidelity | Emit warnings in plan output; clean up missing tiers in follow-up |
| Discovery may balloon pack size if ignore rules wrong | Thresholds + token estimates in plan; AC-3 guards against regression |
| Projection quality depends on projector implementation | Deterministic projection; snapshot tests; explicit degradation |
| Tier 0 enforcement may break existing workflows | Tier 0 is explicit opt-out; docs must be updated if incorrectly marked |
| Future engineers may add "smart" exceptions | Non-goals section explicitly forbids; acceptance criteria test for absence |
| Documents lacking structure degrade projection | Degradation is explicit by design; documents should follow templates |

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.4.1/attempts/attempt-NNN/`

---

## Related Documents

- v1.3.1 Prior: Previous elicitation-focused release
- v1.2.4 Champion: [H0007](./history/H0007-v1.2.4-champion.md)
- Roadmap: [ROADMAP.md](./ROADMAP.md)
- Context Packs and Projection Detail: `/docs/context-packs-and-projection-detail.md`
- Epistemic Obligation and Document Tiers: `/canon/epistemic-obligation-and-document-tiers.md`
