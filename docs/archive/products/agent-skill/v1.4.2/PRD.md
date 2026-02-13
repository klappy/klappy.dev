# PRD: ODD Agent Skill — Token-Efficient Pack Compilation

| Field             | Value       |
| ----------------- | ----------- |
| **PRD Version**   | v1.4.2      |
| **Lane**          | agent-skill |
| **Status**        | Draft       |
| **Created**       | 2026-01-22  |
| **Author**        | Chris Klapp |
| **Canon Version** | 0.10.0      |
| **Parent PRD**    | v1.4.1      |

---

## v1.4.2 Scope

**Release: v1.4.2 — Token-Efficient Pack Compilation**

**Goal:** Reduce token waste in compiled packs while preserving tier-aware functionality from v1.4.1.

**Problem Statement:**

v1.4.1 attempt-002 demonstrated that the tier-aware compiler works correctly (all ACs pass), but post-completion analysis revealed significant token waste:

| Pack | Total Tokens | Useful | Waste |
|------|--------------|--------|-------|
| prd-guide | ~13K | ~10K | ~3K (23%) |
| default-odd-context | ~30K | ~15K | ~15K (50%) |

For agents with limited context windows (8K-32K tokens), 20-50% waste is unacceptable.

**v1.4.2 explicitly addresses:**

1. **Provenance bloat** — Source lists and SHA256 hashes consume ~3K tokens in large packs
2. **Frontmatter noise** — Per-file YAML metadata not needed for consumption
3. **Low-value projections** — Tier 2/3 "outline-only" content that agents can't act on
4. **Discovery over-inclusion** — Templates, changelogs, and stubs that add tokens without value

**Non-goals (explicit):**

- No changes to tier-to-detail mapping logic (Tier 1→high, 2→medium, 3→low remains)
- No changes to Tier 0 exclusion rule (still always excluded)
- No new projection algorithms
- No content rewrites of docs

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Objective

Reduce compiled pack token consumption by 30-50% through format optimization and smarter filtering, without changing the tier-aware compilation model.

---

## Background

**v1.4.1 delivered**: Working tier-aware compiler with:
- Discovery and curated selection modes
- Tier 0 exclusion (hard rule)
- Tier-based projection (1→high, 2→medium, 3→low)
- Deterministic ordering
- `--plan` output for auditability

**v1.4.1 attempt-002 revealed**: The compiler logic is correct, but the output format is wasteful.

### Categories of Waste (from LEARNINGS.md)

#### 1. Provenance Header (~3K tokens in large packs)

```yaml
sources:
  - canon/constraints.md
  - canon/decision-rules.md
  # ... 97 more lines
source_hashes:
  canon/constraints.md: 5e1846a12abcc12f...
  # ... 97 more lines
```

SHA256 hashes are useful for CI/auditing, not for the agent consuming the pack.

#### 2. Per-Source Frontmatter (~2K tokens)

Every included file outputs its full YAML frontmatter:

```yaml
---
uri: klappy://canon/constraints
title: "Constraints"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["constraints", "assumptions"]
---
```

Agents don't need `uri`, `audience`, `exposure`, `voice`, `stability` for PRD elicitation.

#### 3. Low-Value Tier 2/3 Projections

**Tier 2 (medium)** produces outlines without actionable content:

```markdown
# Self-Audit Checklist

> A reflection layer...

## Outline
- Description
- Core Principle
- Checklist
```

**Tier 3 (low)** is worse:

```markdown
# PRD Template

> Standard template for Product Requirements Documents.
```

~10-100 tokens per file of "awareness" that agents can't act on.

#### 4. Discovery Over-Inclusion

v1.4.1's discovery mode found 99 files, but many were:
- `TEMPLATE.md` files (useless for consumers)
- `CHANGELOG.md` (historical, not actionable)
- Implementation-specific docs (klappy.dev-specific, not ODD methodology)
- Tier 3 stubs that are just titles

---

## Functional Requirements (v1.4.2)

### FR-1: Separate Provenance from Pack Content

The compiler must output provenance metadata separately from pack content.

**Output structure:**

```
{pack}-pack.md      # Consumption artifact (agent-facing)
{pack}-meta.json    # Provenance artifact (CI/auditing)
```

**Pack file (`{pack}-pack.md`):**

```yaml
---
lane: agent-skill
pack: prd-guide
built_at: 2026-01-22T05:01:33.771Z
meta: prd-guide-meta.json
---
```

Minimal header, no source lists or hashes.

**Meta file (`{pack}-meta.json`):**

```json
{
  "lane": "agent-skill",
  "pack": "prd-guide",
  "built_at": "2026-01-22T05:01:33.771Z",
  "git_commit": "abc123...",
  "sources": ["canon/constraints.md", ...],
  "source_hashes": { "canon/constraints.md": "5e1846a..." },
  "token_estimate": 10500,
  "waste_ratio": 0.08
}
```

All provenance for CI, none in the consumption artifact.

### FR-2: Strip Frontmatter from Pack Output

Source file frontmatter must not appear in compiled pack output.

**Current (v1.4.1):**

```markdown
## Source: `canon/constraints.md`

---
uri: klappy://canon/constraints
title: "Constraints"
audience: canon
...
---

# Constraints
```

**Required (v1.4.2):**

```markdown
## Source: `canon/constraints.md` (Tier 1)

# Constraints
```

- Keep source path (navigation)
- Add tier annotation (verification)
- Strip all YAML frontmatter

### FR-3: Minimum Viable Projection (MVP)

Rethink Tier 2/3 projections to produce actionable content or exclude.

**New projection rules:**

| Tier | Projection | Rule |
|------|------------|------|
| Tier 1 | `full` | Full content (unchanged) |
| Tier 2 | `summary` | Description block only (first blockquote or ## Description section) |
| Tier 3 | `reference` | Title only, no content (just `## Source: path (Tier 3)`) |

**Rationale:**

- Tier 2 `summary`: The description block is usually actionable. Outlines without content are not.
- Tier 3 `reference`: If it's truly low-priority, just mention it exists. Don't waste tokens on stubs.

**Option flag:**

```
--tier3-mode=reference|exclude
```

- `reference` (default): Include as header-only reference
- `exclude`: Omit Tier 3 files entirely

### FR-4: Discovery Excludes

Add default exclude patterns for discovery mode:

```json
{
  "discovery_excludes": [
    "**/TEMPLATE.md",
    "**/TEMPLATE/**",
    "**/CHANGELOG.md",
    "**/_template/**",
    "**/history/**"
  ]
}
```

These can be overridden per-plan.

**Rationale:** Templates and changelogs are never useful for agent consumption. They bloat discovery.

### FR-5: Structural Simplification

Reduce separator overhead:

**Current:**

```markdown
---

## Source: `path`

---
uri: ...
---

# Title
```

**Required:**

```markdown
---

## Source: `path` (Tier N)

# Title
```

- Single horizontal rule before each source
- No frontmatter block
- Tier annotation inline

### FR-6: Token Budget Awareness (Optional)

Add optional `--max-tokens` flag:

```
--max-tokens 15000
```

Behavior:
- If pack exceeds budget, emit warning with breakdown
- Suggest files to exclude (lowest tier first)
- Do not auto-truncate (manual decision)

**Plan output includes:**

| Field | Description |
|-------|-------------|
| `token_estimate` | Estimated tokens for this file |
| `cumulative_tokens` | Running total |
| `over_budget` | Boolean if cumulative > max |

---

## Acceptance Criteria (v1.4.2)

### AC-1: Provenance Separation

```
Given the compiler runs with --output dir
When pack compilation completes
Then dir contains {pack}-pack.md AND {pack}-meta.json
And {pack}-pack.md header has <=5 lines (no source lists or hashes)
And {pack}-meta.json contains full provenance
```

### AC-2: Frontmatter Stripped

```
Given source files have YAML frontmatter
When pack is compiled
Then compiled output does NOT contain frontmatter blocks
And tier is annotated inline (e.g., "## Source: path (Tier 2)")
```

### AC-3: Token Reduction Achieved

```
Given prd-guide pack compiled with v1.4.1 vs v1.4.2
When token counts are compared
Then v1.4.2 pack is at least 20% smaller
And useful content is preserved (Tier 1 content unchanged)
```

### AC-4: Discovery Excludes Work

```
Given discovery_excludes includes "**/TEMPLATE.md"
When discovery mode runs
Then TEMPLATE.md files are not included
And not listed in plan output
```

### AC-5: Tier 3 Mode Works

```
Given --tier3-mode=exclude is set
When pack is compiled
Then Tier 3 files do not appear in output
And plan output shows them as excluded:tier3-mode
```

### AC-6: Token Budget Warning

```
Given --max-tokens 10000 and pack would be 15000
When pack is compiled
Then warning is emitted with breakdown
And pack compiles anyway (no truncation)
And plan output shows over_budget=true for relevant files
```

### AC-7: v1.4.1 Functionality Preserved

```
Given all v1.4.1 acceptance criteria
When running v1.4.2 compiler
Then AC-1 through AC-6 from v1.4.1 still pass
(Tier 0 exclusion, projection correctness, discovery coverage, etc.)
```

---

## Implementation Plan

### Task 1: Refactor Output Writers

Split `writePackOutput()` into:
- `writePackContent(path)` — Agent-facing pack
- `writePackMeta(path)` — CI/auditing metadata

### Task 2: Strip Frontmatter in Projection

Modify `projectFile()`:
- Parse frontmatter for tier (internal use)
- Do not include frontmatter in output
- Add tier annotation to source header

### Task 3: Implement New Projection Rules

Update projection logic:
- Tier 1: unchanged (full content)
- Tier 2: extract description only (not outline)
- Tier 3: header-only reference or exclude

Add `--tier3-mode` flag.

### Task 4: Add Discovery Excludes

Update `selectFilesDiscovered()`:
- Apply default excludes
- Allow plan override
- Log excluded files in plan

### Task 5: Token Estimation

Add `estimateTokens(content)`:
- Simple heuristic: `words * 1.3` or `chars / 4`
- Include in plan output
- Add cumulative tracking

### Task 6: Add Budget Flag

Implement `--max-tokens`:
- Compare cumulative to budget
- Emit warning if exceeded
- Mark over-budget files in plan

---

## Success Criteria

### v1.4.2 — Token Efficiency

- [ ] Provenance in separate `{pack}-meta.json`
- [ ] Pack header <=5 lines
- [ ] No frontmatter in compiled output
- [ ] Tier annotation inline with source header
- [ ] Tier 2 projects description only (not outline)
- [ ] Tier 3 projects as reference-only or excluded
- [ ] Discovery excludes templates/changelogs by default
- [ ] Token estimates in plan output
- [ ] `--max-tokens` flag works with warning
- [ ] prd-guide pack reduced by >=20%
- [ ] default-odd-context pack reduced by >=40%

### v1.4.1 — Preserved Functionality

- [ ] Tier 0 exclusion still enforced
- [ ] Discovery mode still works
- [ ] Curated mode still works
- [ ] Deterministic ordering preserved
- [ ] `--plan` output still generated

---

## Definition of Done

An attempt against this PRD is complete when:

### Format Changes

- [ ] `{pack}-meta.json` generated alongside `{pack}-pack.md`
- [ ] Pack header reduced to <=5 lines
- [ ] Frontmatter stripped from all source content
- [ ] Tier annotated inline with source headers

### Projection Changes

- [ ] Tier 2 uses description-only projection
- [ ] Tier 3 uses reference-only projection (or excluded)
- [ ] `--tier3-mode` flag implemented

### Discovery Changes

- [ ] Default excludes applied (templates, changelogs)
- [ ] Excludes logged in plan output

### Token Awareness

- [ ] Token estimates in plan output
- [ ] `--max-tokens` flag with warning behavior
- [ ] Over-budget marking in plan

### Evidence Required

- [ ] Before/after token comparison table
- [ ] prd-guide pack >=20% smaller
- [ ] default-odd-context pack >=40% smaller
- [ ] Sample output showing stripped frontmatter
- [ ] Sample output showing new Tier 2/3 projection
- [ ] Plan output showing token estimates
- [ ] `--max-tokens` warning output
- [ ] All v1.4.1 ACs still passing

---

## Constraints

- **No logic changes to tier rules**: Tier 1/2/3 still map to high/medium/low conceptually
- **No synthesis**: Still projection-only, no content generation
- **Backward compatible meta**: Tools reading old packs should not break
- **Same distribution**: Uses existing Cloudflare Pages setup
- **Same sources**: Canon v0.10.0 unchanged
- **Ephemeral artifacts**: INSTRUCTIONS.md still not persisted
- **Lane isolation**: All changes stay within agent-skill lane

---

## Risks

| Risk | Mitigation |
|------|------------|
| Stripping frontmatter loses useful info | Tier annotation preserves what matters; meta.json has full provenance |
| Tier 2 description-only may miss key content | Description block is usually the most actionable; outline without content is noise |
| Tier 3 exclusion may hide important awareness | Default is reference-only, not exclude; user can override |
| Token estimation may be inaccurate | Use conservative heuristic; it's advisory, not controlling |
| Discovery excludes may be too aggressive | Defaults are narrow (templates/changelogs only); plan can override |

---

## Tradeoffs

| Decision | What Was Sacrificed |
|----------|---------------------|
| Separate meta file | Single-file convenience; now two files to manage |
| Strip frontmatter | Full metadata visibility in pack; available in meta.json |
| Description-only for Tier 2 | Outline visibility; outlines without content are noise anyway |
| Reference-only for Tier 3 | Stub content; stubs waste tokens without providing value |
| Default discovery excludes | Maximum inclusion; templates/changelogs never help agents |

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.4.2/attempts/attempt-NNN/`

---

## Related Documents

- v1.4.1 PRD: Parent version (tier-aware compiler)
- v1.4.1 attempt-002 LEARNINGS.md: Source of token efficiency analysis
- v1.3.1 Champion: Current production version
- Context Packs and Projection Detail: `/docs/context-packs-and-projection-detail.md`
