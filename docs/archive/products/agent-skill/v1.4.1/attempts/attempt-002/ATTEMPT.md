# Attempt 002 — v1.4.1 Tier-Aware Pack Compiler

| Field | Value |
|-------|-------|
| **Attempt** | attempt-002 |
| **PRD Version** | v1.4.1 |
| **Status** | CLOSED |
| **Started** | 2026-01-22 |
| **Closed** | 2026-01-22 |

---

## Objective

Execute v1.4.1 PRD with hardened containment:
- Compiler has built-in write fence (refuses writes outside evidence/)
- Explicit plan-file loading (no resolution from infra/)
- Comprehensive evidence for easy human promotion

---

## Hardened Containment (Key Improvement over attempt-001)

This attempt implements strict guardrails that were missing in attempt-001:

1. **Write Fence**: Compiler refuses to write anywhere except `attempt-002/evidence/`
2. **Explicit Plans**: Uses `--plan-file` instead of `--lane/--pack` resolution
3. **Dual Output**: Both JSON and human-readable table formats
4. **Determinism Proof**: Ordering verified as consistent
5. **No Source Writes**: git status proof that only attempt-002 was modified

---

## Evidence Checklist

- [x] `compile-output.txt` — Combined compilation logs
- [x] `plan-output-prd-guide.json` — JSON plan for CI
- [x] `plan-output-prd-guide.txt` — Human-readable table
- [x] `prd-guide-pack.md` — Compiled curated pack (14 files)
- [x] `plan-output-default-odd-context.json` — JSON plan for CI
- [x] `plan-output-default-odd-context.txt` — Human-readable table
- [x] `default-odd-context-pack.md` — Compiled discovered pack (99 files)
- [x] `tier-verification.md` — Tier 0 exclusions + sample projections
- [x] `acceptance-criteria.md` — AC-1 through AC-6 with pass/fail
- [x] `determinism.md` — Ordering verification
- [x] `no-source-writes.md` — git status showing only attempt-002 changes

---

## Self-Audit

- [x] All files written inside attempt-002/ folder
- [x] Compiler has hard write fence (validates --output path)
- [x] Compiler uses --plan-file (not --lane/--pack resolution)
- [x] Both packs compiled (prd-guide + default-odd-context)
- [x] AC-1 through AC-6 all passing
- [x] Determinism verified (ordering consistent)
- [x] No source writes verified (git status confirms)
- [x] PROMOTION_NOTES.md complete with exact commands

---

## Acceptance Criteria Results

| AC | Description | Status |
|----|-------------|--------|
| AC-1 | Tier 0 never included | **PASS** |
| AC-2 | Projection correctness | **PASS** |
| AC-3 | Discovery coverage >= 60 | **PASS** (99 files) |
| AC-4 | Curated pack tier-enforces | **PASS** |
| AC-5 | Plan output generated | **PASS** |
| AC-6 | Deterministic ordering | **PASS** |

---

## Outcome

**PRD SUCCESS / NOT PROMOTED** — All acceptance criteria pass. However, post-completion analysis revealed token efficiency problems that make promotion inadvisable.

### What Was Delivered

1. **Sandboxed Compiler** (`attempt-002/infra/scripts/compile-pack.js`)
   - Hard write fence prevents writes outside sandbox
   - Uses `--plan-file` for explicit plan loading
   - Implements FR-1 through FR-6

2. **Compile Plans** (`attempt-002/src/`)
   - `prd-guide.json` — Curated pack, 15 sources, tier-enforced
   - `default-odd-context.json` — Discovery mode, 101 sources scanned

3. **Compiled Packs** (`attempt-002/evidence/`)
   - `prd-guide-pack.md` — 14 files (1 Tier 0 excluded)
   - `default-odd-context-pack.md` — 99 files (2 Tier 0 excluded)

4. **INSTRUCTIONS.md** — PRD elicitation guide with tier-aware context guidance

### Why Not Promoted

Post-completion token analysis revealed:

| Pack | Total Tokens | Useful | Waste |
|------|--------------|--------|-------|
| prd-guide | ~13K | ~10K | ~3K (23%) |
| default-odd-context | ~30K | ~15K | ~15K (50%) |

The compiler logic is correct, but the output format wastes significant context window space on:
- Provenance headers (source lists, SHA256 hashes)
- Per-source frontmatter metadata
- Tier 2/3 projections that produce outlines without actionable content
- Structural separators

See **LEARNINGS.md** for full analysis and requirements for a token-efficient v1.4.2 or v1.5.

---

## Learnings

### Process Learnings (Positive)

1. **Hard fences > discipline** — Embedding containment rules in code eliminates "forgot to check" errors

2. **Explicit > implicit** — `--plan-file` is clearer than `--lane/--pack` resolution from infra/

3. **Determinism ≠ byte-identical** — Timestamps change, but ordering is consistent; AC-6 should focus on order

4. **Evidence trail matters** — Dual output (JSON + table) serves both CI and human reviewers

5. **Clean restart wins** — Rather than trying to "fix" attempt-001's violations, starting fresh with proper containment was faster and cleaner

### Output Quality Learnings (Blocking)

6. **Provenance is expensive** — SHA256 hashes useful for CI, useless for agent consumption (~3K tokens in default-odd-context)

7. **Tier 2/3 projections need rethinking** — "Outline-only" is the worst of both worlds; either include actionable content or exclude

8. **Frontmatter is noise** — Agent doesn't need `uri`, `audience`, `exposure`, `voice`, `stability` for PRD elicitation

9. **Discovery scope matters** — Including 99 files when half are templates/stubs/implementation-specific is wasteful

10. **Token efficiency must be explicit** — PRD should have specified acceptable waste ratio; "compile correctly" ≠ "compile efficiently"

---

## Next Steps (Human Action Required)

### Immediate (Documenting This Attempt)

1. Review LEARNINGS.md for full token efficiency analysis
2. Commit attempt-002 as CLOSED / NOT PROMOTED
3. Update lane README to note v1.4.1 has a working but inefficient compiler

### Future (New PRD Required)

4. File v1.4.2 or v1.5 PRD targeting token efficiency:
   - Move provenance to separate `_meta.json`
   - Strip frontmatter from pack output
   - Reconsider Tier 2/3 projection strategy
   - Add discovery excludes for templates/changelogs
   - Consider token budget constraints

5. See LEARNINGS.md § "Requirements for Next Version" for full specification

---

## Status

**CLOSED — NOT PROMOTED**

The v1.4.1 PRD acceptance criteria are satisfied, but token efficiency analysis reveals the output format is not production-ready.

| Decision | Rationale |
|----------|-----------|
| PRD Success | All 6 ACs pass |
| Not Promoted | 20-50% token waste unacceptable |
| Next Action | File v1.4.2/v1.5 PRD for efficiency |

Per ODD: "Evidence over assertion." The evidence says the compiler works but the output needs optimization.

Per ODD: "AI is an accelerator, not an authority." This analysis informs the human decision not to promote.
