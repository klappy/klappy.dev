---
title: "Projection Inventory — Files That Should Be Generated, Not Hardcoded"
type: audit
date: 2026-03-21
epoch: E0006
derives_from:
  - "canon/methods/supersession.md"
  - "odd/constraint/anti-cache-lying.md"
status: approved
---

# Projection Inventory — Files That Should Be Generated, Not Hardcoded

> This audit identifies every file in klappy.dev that is a projection — a document whose content is a deterministic function of other canonical sources. Per the supersession method and Anti-Cache Lying, these should be generated JIT with content-hash keying, not committed as source files. A committed projection is a cached lie.

-----

## Classification Criteria

**Projection (should be generated):** Content is primarily a listing, index, table of contents, or navigational summary of other documents. The document's value comes from being accurate about what currently exists, not from its own authored argument.

**Hybrid (authored content + projection sections):** The document contains original authored governance AND navigational tables or lists that reference other documents. The authored sections are source; the navigational sections are projections embedded in source.

**Source (authored, not a projection):** The document's value is its own argument, analysis, or governance content. Even if it references other documents, the references serve the argument — the document is not primarily a directory.

-----

## Pure Projections — Should Be Fully Generated

These files exist solely to list, index, or navigate other documents. They have no independent authored content that would be lost by regeneration.

| File | Lines | Table Rows | Links | What It Projects |
|------|-------|------------|-------|-----------------|
| `writings/README.md` | 34 | 19 | 0 | List of published essays with descriptions |
| `canon/principles/README.md` | 31 | 10 | 8 | Table of canon principles |
| `odd/constraint/README.md` | 26 | 5 | 3 | Table of ODD-level constraints |
| `canon/apocrypha/fragments/README.md` | 37 | 11 | 10 | Table of system-voice fragments |
| `canon/apocrypha/predocumentaries/README.md` | 61 | 14 | 9 | Table of predocumentary documents |
| `canon/apocrypha/fragments-of-the-canon/README.md` | 27 | 0 | 0 | List of numbered fragments |
| `canon/apocrypha/reconstructions/README.md` | 55 | 0 | 10 | List of reconstruction documents |
| `docs/examples/README.md` | 31 | 3 | 3 | Table of example documents |
| `docs/incidents/README.md` | 21 | 4 | 2 | Table of incident records |
| `odd/decisions/README.md` | 51 | 7 | 4 | Table of ODD-level decisions |
| `odd/appendices/README.md` | 64 | 9 | 15 | Table of ODD appendices |
| `docs/agents/discovery/README.md` | 41 | 5 | 2 | Table of discovery agent docs |
| `docs/CONTENT-MAP.md` | ? | 23+ | 22+ | Full repo content map |
| `odd/index.md` | ? | tables | links | ODD document index |
| `about/README.md` | 60 | 13 | 9 | About page content listing |

**Count: ~15 pure projections**

These can be fully generated from directory listings + frontmatter extraction. The `writings/README.md` for example is literally a table built from the `title` and `description` frontmatter fields of every file in `writings/`. oddkit already has the index infrastructure to produce this.

-----

## Hybrid Documents — Authored Content with Embedded Projections

These files contain original governance or explanatory content AND navigational tables/lists that reference other documents. The authored sections should remain as source. The navigational sections should be marked for regeneration.

| File | Lines | Authored Content | Projection Sections |
|------|-------|-----------------|-------------------|
| `canon/README.md` | 230 | Canon philosophy, precedence rules, meta rules, what canon is/isn't, stability philosophy, confidence scores | Core Documents table, Principles table, Subfolders table, Resonance table |
| `canon/constraints/README.md` | 400 | Full constraint definitions (11 constraints with rationale) | Outline list, Operating Constraints bullets, Failure Modes list |
| `docs/README.md` | 158 | Implementation philosophy | Document listing tables |
| `docs/decisions/README.md` | 137 | Decision record governance | Decision table listing |
| `docs/appendices/README.md` | 86 | Appendix overview | Appendix listing table |
| `docs/agents/README.md` | 101 | Agent architecture overview | Agent listing table |
| `docs/agents/validation/README.md` | 78 | Validation agent design | Protocol listing table |
| `canon/methods/README.md` | 80 | Methods philosophy | Methods listing |
| `canon/resonance/README.md` | 117 | Resonance rules (divergence requirement) | Resonance table |
| `docs/promotions/README.md` | 140 | Promotion pipeline governance | Promotion record listing |
| `docs/agents/librarian/README.md` | 52 | Librarian conceptual design | E0005.1 note about oddkit superseding |
| `odd/README.md` | 183 | Full ODD philosophy, axioms, principles | Where to Go Next links |

**Count: ~12 hybrid documents**

The projection sections in these hybrids are the primary source of the "stale index" pain. The Canon README's Core Documents table still lists files that have moved. The Constraints README's outline still says "Lane Self-Containment." These are navigation-as-authored-content — the most dangerous pattern because they look stable but rot silently.

**Proposed approach for hybrids:** Extract the navigational sections into generated includes or partials. The authored sections remain committed source. The generated sections are marked with a comment or frontmatter annotation (`<!-- generated:start -->` / `<!-- generated:end -->`) and regenerated when source changes.

-----

## Other Projection Candidates

| File | Why It's a Projection |
|------|----------------------|
| `canon/CHANGELOG.md` | Should be generated from git history + commit metadata |
| `odd/terminology.md` | Vocabulary index — could be generated from glossary frontmatter across all docs |
| `odd/orientation-map.md` | Navigation map — should reflect current document set |
| `docs/appendices/repo-topology.md` | Directory structure description — should match actual directory structure |
| `docs/oddkit/SYSTEM-MAP.md` | System architecture map — could be partially generated from tool definitions |
| `docs/derivative-works.md` | List of derivative assets — should be generated from frontmatter relationships |

-----

## Files in `docs/archive/` — Not Applicable

Archived files are already retired from active governance. They are not projections — they are historical artifacts. The projection constraint does not apply to archived content. Leave them as-is.

-----

## Implementation Priority

### Immediate (eliminates active production pain)

1. **`writings/README.md`** — Pure projection, currently stale on the live website. Generated from `writings/*.md` frontmatter.
2. **`canon/README.md` projection sections** — Core Documents table, Principles table, Subfolders table. These direct agent navigation and are actively wrong.
3. **`canon/constraints/README.md` outline** — Still says "Lane Self-Containment" when the constraint was renamed weeks ago.
4. **`docs/decisions/README.md` table** — Decision listing should auto-update when new decisions are added.

### Near-term (prevents future pain)

5. **`canon/principles/README.md`** — Small, pure projection, easy to generate.
6. **`odd/constraint/README.md`** — Small, pure projection.
7. **All apocrypha READMEs** — Pure projections, fragment/reconstruction/predocumentary listings.
8. **`docs/appendices/README.md`** — Appendix listing.

### Deferred (lower pain, more complexity)

9. **`canon/CHANGELOG.md`** — Requires git history parsing. Complex but high-value.
10. **`odd/terminology.md`** — Requires glossary extraction from frontmatter across all docs.
11. **Hybrid document partial generation** — Requires the `<!-- generated:start -->` convention.

-----

## Generation Mechanism Options

### Option A: oddkit catalog + template

oddkit already has `catalog` which returns all documents with their metadata. A generation function takes the catalog output, filters by path prefix, and renders a markdown table. This is the simplest path for pure projections.

### Option B: CI/CD pipeline

A GitHub Action that runs on push to main, extracts frontmatter from changed files, regenerates affected projections, and commits the updates. Content-hash keyed — only regenerates when source actually changed.

### Option C: Build-time generation

The klappy.dev site build process generates projection files as part of the build. They're never committed — they exist only in the build output. This is the cleanest solution but requires build pipeline changes.

### Option D: oddkit action

A new `oddkit_generate` or `oddkit_project` action that takes a path and renders the projection from current baseline state. Agents call it when they need a fresh index instead of reading a potentially stale committed file.

**Recommended starting point:** Option A for immediate wins (oddkit catalog already exists), Option B for durability (CI prevents re-staleness), Option D for agent-facing freshness.

-----

## Relationship to Supersession Method

This inventory is the evidence artifact for the constraint in the supersession method: "Projections MUST NOT be stored as source." The inventory identifies what needs to change. The supersession method governs how. The implementation options above are the how.

Seven of the twelve drift findings from the March 2026 governance audit were stale projections. This inventory shows approximately 15 pure projections and 12 hybrids with embedded projection sections. Eliminating these as committed files eliminates the most painful class of drift the system produces.
