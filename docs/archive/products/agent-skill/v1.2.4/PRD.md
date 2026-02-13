# PRD: ODD Agent Skill — Canon Refresh v0.8.0

| Field             | Value       |
| ----------------- | ----------- |
| **PRD Version**   | v1.2.4      |
| **Lane**          | agent-skill |
| **Status**        | Active      |
| **Created**       | 2026-01-21  |
| **Author**        | Chris Klapp |
| **Canon Version** | 0.8.0       |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Objective

Recompile the PRD guide pack against canon v0.8.0, fixing stale ODD paths from the 0.6.0 root-level elevation and incorporating new concepts (Cognitive Partitioning, Tool Specialization).

---

## Background

**v1.2.3 delivered**: Canon refresh to v0.5.4 with ODD compliance. INSTRUCTIONS.md treated as ephemeral.

**Problem discovered**: The compile plan at `src/compile-plan.json` still references `canon/odd/manifesto.md`, but ODD was elevated to root level (`/odd/`) in canon 0.6.0. This path is stale.

**Canon changes since v0.5.4**:

| Version | Summary |
|---------|---------|
| 0.6.0   | Three-Tier Hierarchy — ODD elevated from `/canon/odd/` to `/odd/` |
| 0.6.1   | Docs epistemic hygiene, frontmatter standardization |
| 0.7.0   | Doc Inclusion Audit, README indexes, derived outputs |
| 0.8.0   | Cognitive Partitioning, Tool Specialization appendix |

**v1.2.4 patches v1.2.3** with:

- Fixed ODD paths (`canon/odd/` → `odd/`)
- Canon bumped to v0.8.0
- New content: Cognitive Partitioning, Tool Specialization
- Updated source hashes

---

## In Scope (v1.2.4)

### From v1.2.3 (retained)

- Lane-owned Cloudflare Pages deployment
- Versioned asset URLs
- README.md per version folder
- No website lane dependency
- INSTRUCTIONS.md as ephemeral artifact
- Compile plan in lane (`src/compile-plan.json`)

### New in v1.2.4

- Fixed ODD paths to reflect root-level elevation
- Recompiled pack against canon v0.8.0
- Added Cognitive Partitioning concept reference
- Added Tool Specialization appendix reference
- Updated `/latest/` to point to v1.2.4 pack
- Updated `latest/README.md` to reflect v1.2.4 as champion

---

## Explicitly Out of Scope (v1.2.4)

- Changes to distribution architecture (Cloudflare Pages setup unchanged)
- New workflow stages (that's v1.3)
- Changing INSTRUCTIONS.md content (only path fixes)
- Adding attempt execution guidance (that's v1.3)

---

## Success Criteria

- [ ] Compile plan paths updated (`odd/` instead of `canon/odd/`)
- [ ] Pack recompiled with canon v0.8.0 sources
- [ ] Provenance header shows updated source hashes
- [ ] Pack available at versioned URL (`/v1.2.4/prd-guide-pack.md`)
- [ ] `/latest/` updated to serve v1.2.4 pack
- [ ] `latest/README.md` updated to reference v1.2.4
- [ ] No behavioral changes to pack guidance (path fix only)

---

## Definition of Done

An attempt against this PRD is complete when:

### Compilation

- [ ] Compile plan paths corrected (`odd/manifesto.md`, etc.)
- [ ] Compile succeeds using lane-owned `src/compile-plan.json`
- [ ] Output written to attempt's `evidence/` folder
- [ ] Provenance header shows canon v0.8.0 source hashes
- [ ] INSTRUCTIONS.md generated fresh (not copied from persisted source)

### Distribution

- [ ] `public/agent-skill/v1.2.4/prd-guide-pack.md` created
- [ ] `public/agent-skill/latest/prd-guide-pack.md` updated
- [ ] `public/agent-skill/latest/README.md` updated (version reference)
- [ ] Public URL verified with HTTP 200

### Verification

- [ ] Source hashes differ from v1.2.3 (paths changed, canon content changed)
- [ ] ODD paths in compile plan point to `/odd/` not `/canon/odd/`
- [ ] Pack content includes correct ODD manifesto from root level
- [ ] No persisted INSTRUCTIONS.md in `src/` or version folder

### Evidence Required

- [ ] Screenshot or log of successful compile output
- [ ] Diff showing updated paths in compile-plan.json
- [ ] Diff showing updated source hashes
- [ ] HTTP 200 verification of preview URL
- [ ] Self-audit completed

---

## Pack Sources

The compiled pack concatenates these files:

### Canon Sources (persisted)

| #   | Source                                | Purpose                                          |
| --- | ------------------------------------- | ------------------------------------------------ |
| 1   | `canon/README.md`                     | Canon orientation, meta rules, confidence scores |
| 2   | `odd/README.md`                       | ODD folder index, core thesis                    |
| 3   | `odd/manifesto.md`                    | Full ODD philosophy                              |
| 4   | `odd/cognitive-partitioning.md`       | **NEW** Scaling pattern for reasoning systems    |
| 5   | `odd/appendices/README.md`            | Portable appendices summarized                   |
| 6   | `odd/decisions/README.md`             | ODD conceptual decisions                         |
| 7   | `canon/odd/appendices/tool-specialization.md` | **NEW** Tool isolation pattern           |
| 8   | `canon/constraints.md`                | Baseline assumptions                             |
| 9   | `canon/decision-rules.md`             | Decision heuristics                              |
| 10  | `canon/definition-of-done.md`         | Completion criteria                              |
| 11  | `canon/self-audit.md`                 | Review checklist                                 |
| 12  | `docs/PRD/PRD_TEMPLATE.md`            | PRD structure                                    |

### Generated Sources (ephemeral)

| #   | Source            | Purpose                                     |
| --- | ----------------- | ------------------------------------------- |
| 13  | `INSTRUCTIONS.md` | Interactive guidance (generated by attempt) |

**Note:** INSTRUCTIONS.md is a **generated artifact**, not persisted input. Each attempt generates it fresh based on PRD requirements. It is ephemeral like code — it lives only in the attempt's evidence folder, never in `src/` or version folders.

---

## Constraints

- **Path fix focus**: Primary goal is fixing stale paths
- **Same distribution**: Uses existing Cloudflare Pages setup
- **Traceability**: Canon version documented in PRD metadata
- **ODD formula**: Pack + CONTRACT + PRD = Attempt (nothing else)
- **Ephemeral artifacts**: Generated code (INSTRUCTIONS.md) not persisted
- **Lane isolation**: Compile plans and version-specific assets stay in lane
- **Complete latest update**: Both pack AND README must be updated

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.2.4/attempts/attempt-NNN/`

---

## Related Documents

- v1.2.3 Champion: [H0006](../history/H0006-v1.2.3-champion.md)
- v1.2.3 Attempt: `../v1.2.3/attempts/attempt-001/`
- Canon Changelog: `/canon/CHANGELOG.md`
- Three-Tier Hierarchy: `/odd/decisions/D0001-three-tier-conceptual-hierarchy.md`
- Cognitive Partitioning: `/odd/cognitive-partitioning.md`
- Tool Specialization: `/canon/odd/appendices/tool-specialization.md`
