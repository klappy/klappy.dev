# Learnings — attempt-002

> Post-attempt analysis of token efficiency and promotion readiness.

---

## Status: CLOSED — NOT PROMOTED

attempt-002 successfully implemented the v1.4.1 PRD. All acceptance criteria pass. However, post-completion analysis revealed significant token efficiency problems in the compiled packs that make promotion inadvisable.

**The compiler works correctly. The output format is wasteful.**

---

## Token Efficiency Analysis

### prd-guide-pack.md

| Metric | Value |
|--------|-------|
| Total tokens | ~12-14K |
| Useful content | ~10K |
| Waste/overhead | ~2-3K (15-20%) |

### default-odd-context-pack.md

| Metric | Value |
|--------|-------|
| Total tokens | ~25-33K |
| Useful content | ~15K |
| Waste/overhead | ~10-15K (40-50%) |

---

## Categories of Waste

### 1. Provenance Header (~3K tokens in default-odd-context)

```yaml
sources:
  - canon/constraints.md
  - canon/decision-rules.md
  # ... 97 more lines
source_hashes:
  canon/constraints.md: 5e1846a12abcc12f...
  # ... 97 more lines
```

**Problem**: SHA256 hashes are useful for CI/auditing, not for the agent consuming the pack.

**Recommendation**: Move provenance to separate `_meta.json` file, or make it optional.

---

### 2. Per-Source Frontmatter (~2K tokens)

Every source file includes:

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

**Problem**: The agent doesn't need `uri`, `audience`, `exposure`, `voice`, `stability` for PRD elicitation. It only needs the content.

**Recommendation**: Strip frontmatter except for `tier` (needed for projection verification).

---

### 3. Tier 2/3 Projections Are Low-Value

**Tier 2 (medium)** produces outlines without content:

```markdown
# Self-Audit Checklist

> A reflection layer...

## Outline
- Description
- Core Principle
- Checklist
...
```

The agent knows something exists but can't *use* it. ~100 tokens of "awareness" with no action value.

**Tier 3 (low)** is worse:

```markdown
# PRD Template

> Standard template for Product Requirements Documents.
```

~10 tokens to know a template exists. Not actionable.

**Recommendation**: Either project enough content to be useful, or exclude entirely. "Outline-only" is the worst of both worlds.

---

### 4. Separator/Structural Overhead (~1K tokens)

- 99× `## Source: \`path\`` headers
- 340× `---` horizontal rules
- Empty lines, navigation sections

**Recommendation**: Minimize structural markup. Consider more compact formats.

---

### 5. Discovery Scope Too Broad (default-odd-context)

99 files discovered and included, but many are:
- `TEMPLATE.md` files (useless for consumers)
- `CHANGELOG.md` (historical, not actionable)
- `docs/` implementation-specific content (klappy.dev-specific, not ODD methodology)
- Tier 3 stubs that are just titles

**Recommendation**: 
- Exclude template/changelog files in discovery
- Separate "ODD methodology" from "klappy.dev implementation"
- Don't discover files that will only produce title stubs

---

## What Works Well

1. **Tier-aware projection** — The concept is sound; Tier 1 gets full content, Tier 2 gets summary, Tier 3 gets stub
2. **Containment hardening** — Write fence and explicit plan loading worked perfectly
3. **Deterministic ordering** — Files sort alphabetically, output is reproducible
4. **Dual plan output** — JSON for CI, table for humans is useful

---

## Requirements for Next Version (v1.4.2 or v1.5)

To be promotion-ready, the compiler should:

### Must Have

1. **Move provenance to separate file** — `{pack}-pack.md` + `{pack}-meta.json`
2. **Strip frontmatter from output** — Only include `tier` if needed for verification
3. **Reconsider Tier 2/3 projection** — "Outline-only" should either include enough to be useful or be excluded

### Should Have

4. **Exclude templates/changelogs in discovery** — Add `discovery_excludes` patterns like `**/TEMPLATE.md`, `**/CHANGELOG.md`
5. **Reduce structural overhead** — Fewer separators, more compact format
6. **Separate ODD vs implementation content** — Different discovery roots for methodology vs repo-specific docs

### Nice to Have

7. **Token budget awareness** — Plan can specify max tokens, compiler can warn if pack exceeds
8. **Compression options** — `--compact` flag for minimal formatting

---

## Bottom Line

The v1.4.1 PRD asked: "Can we compile tier-aware packs?" Answer: **Yes.**

But the real question for production is: "Are the packs token-efficient?" Answer: **Not yet.**

The prd-guide pack wastes ~20% of context. The default-odd-context pack wastes ~50%. For agents with limited context windows, this matters.

**Verdict**: Close attempt-002 as successful against the PRD, but do not promote. File a v1.4.2 or v1.5 PRD targeting token efficiency improvements.

---

## Evidence Reference

| File | Purpose |
|------|---------|
| `evidence/prd-guide-pack.md` | 14 files, ~12-14K tokens |
| `evidence/default-odd-context-pack.md` | 99 files, ~25-33K tokens |
| `evidence/tier-verification.md` | Confirms tier logic works |
| `evidence/acceptance-criteria.md` | All 6 ACs pass |

---

## Per ODD

> "Evidence over assertion."

This analysis is evidence that the output format needs improvement, not the compiler logic.

> "AI is an accelerator, not an authority."

Promotion is a human decision. This document provides the evidence for that decision.
