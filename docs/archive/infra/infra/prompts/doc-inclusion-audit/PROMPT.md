# 📋 Document Inclusion Audit Prompt

> Evaluate which documents should be included in book exports and context packs.

## Your Task

You are auditing the klappy.dev repository to determine:
1. Which documents should be in the **book export** (`klappy-dev-book-export.md`)
2. Which documents should be in **context packs** (lane-scoped compilations)
3. Which documents are **stale, misclassified, or redundant**
4. Which documents follow the **progressive disclosure structure**
5. Which folders have **README-as-index** patterns

---

## Understanding the Three-Tier Hierarchy

Documents in this repo are organized into three tiers with different purposes:

| Tier | Location | Contains | Decay Rate | Book Export? |
|------|----------|----------|------------|--------------|
| **ODD** | `/odd/` | Universal principles (timeless, product-agnostic) | Almost never | ✅ Yes |
| **Canon** | `/canon/` | Program-level constraints (shared rules) | Carefully | ✅ Yes |
| **Docs** | `/docs/` | Implementation details (how this instance works) | Freely | ✅ Yes |

**The litmus test:**
1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

---

## Progressive Disclosure Structure

Documents in this repo follow a **progressive disclosure pattern** that enables different compilation depths:

### Document Structure (Top to Bottom)

```markdown
---
uri: klappy://[tier]/[path]
title: "Document Title"
audience: docs
exposure: nav
tier: 1 | 2
voice: neutral
stability: stable | evolving
tags: ["tag1", "tag2"]
---

# Title                              ← H1 title (same as frontmatter)

> One-line subtitle explaining       ← Blockquote subtitle
> what this document is about.

## Description                       ← 1-2 paragraph summary (LLM-friendly)

[Compressed overview of the entire document. Should be self-contained
enough that an LLM can understand the gist without reading further.]

## Outline                           ← Table of contents / what's covered

- Section 1
- Section 2
- Section 3

---

## Content                           ← Full content begins here

[The actual detailed content...]
```

### Disclosure Levels for Packs

| Level | Includes | Use Case | Context Size |
|-------|----------|----------|--------------|
| **L0: Title only** | Frontmatter + H1 | File listing | ~50 tokens |
| **L1: Subtitle** | + blockquote | Quick orientation | ~100 tokens |
| **L2: Description** | + Description section | LLM context | ~200-500 tokens |
| **L3: Outline** | + Outline section | Navigation aid | ~300-700 tokens |
| **L4: Full** | + Content section | Complete context | Full document |

### Pack Compilation by Disclosure Level

| Pack Target | Typical Level | Why |
|-------------|---------------|-----|
| `visitor` | L1-L2 | Minimal orientation, progressive reveal |
| `author` | L3-L4 | Working context, needs detail |
| `agent-core` | L2-L3 | Operational rules, not philosophy |
| `dev-peer` | L4 | Full understanding for contribution |

### README-as-Index Pattern

Every folder SHOULD have a `README.md` that serves as a scannable index:

```
/docs/
  README.md           ← Index with table of contents
  ATTEMPTS.md
  TRUTH_MAP.md
  appendices/
    README.md         ← Index of appendices with summaries
    epochs.md
    product-lanes.md
  decisions/
    README.md         ← Index of decisions with status
    D0001-*.md
```

**Benefits:**
- Agents can read the index (~500 tokens) instead of all files (~20K tokens)
- Packs can include folder READMEs for summaries without full content
- Tree-shaking: know what exists without loading everything

---

## Book Export Criteria

The book export (`klappy-dev-book-export.md`) is a **complete documentation snapshot** for sharing/uploading. It should include guidance docs but exclude implementation artifacts.

### Currently INCLUDED in book export:

| Path Pattern | Reason |
|--------------|--------|
| `/odd/**/*.md` | Universal principles |
| `/canon/**/*.md` | Program constraints |
| `/docs/**/*.md` | Implementation docs |
| `/about/**/*.md` | Author context |
| `/projects/**/*.md` | Project descriptions |
| `/interfaces/**/*.md` | Contracts |
| `/visual/**/*.md` | Visual system docs |
| `/infra/**/*.md` | Infrastructure docs |
| `/*.md` (root) | Top-level docs |

### Currently EXCLUDED from book export:

| Path Pattern | Reason |
|--------------|--------|
| `/public/content/**` | Copies of source files (duplicates) |
| `/.cursor/plans/**` | Ephemeral plan files |
| `/**/attempts/**` | Implementation work, not guidance |
| `/**/src/**` | Source code, not documentation |
| `/products/*/v*/**` | Version-specific implementations |
| `/node_modules/**` | Dependencies |
| `/.git/**` | Version control |
| `/dist/**`, `/build/**` | Build artifacts |

### Evaluation Questions for Book Export:

For each document, ask:

1. **Is it guidance or implementation?**
   - Guidance (philosophy, process, contracts) → INCLUDE
   - Implementation (code, attempt artifacts, build output) → EXCLUDE

2. **Is it a duplicate?**
   - `/public/content/` mirrors source files → EXCLUDE (duplicates)
   - Generated packs in `/_compiled/` → EVALUATE (may include if useful)

3. **Is it ephemeral?**
   - Plan files, temporary notes → EXCLUDE
   - Sealed attempt records → INCLUDE (historical evidence)

4. **Is it too granular?**
   - Individual attempt evidence (screenshots) → EXCLUDE
   - Attempt summaries (ATTEMPT.md, EVIDENCE.md) → EVALUATE

---

## Context Pack Criteria

Context packs are **lane-scoped, target-specific compilations** for constrained context windows.

### Existing Packs:

| Lane | Pack | Target Audience | Purpose |
|------|------|-----------------|---------|
| `website` | `visitor` | First-time visitors | Minimal orientation, progressive disclosure |
| `website` | `author` | Repo owner | High-signal working context |
| `agent-skill` | `prd-guide` | Agent developers | PRD + process guidance |

### Pack Inclusion Criteria:

| Target | Include | Exclude | Disclosure Level |
|--------|---------|---------|------------------|
| **visitor** | ODD manifesto, Canon README, PRD summary, "What is this?" | Implementation details, CLI commands, internal decisions | L1-L2 (titles + descriptions) |
| **author** | Canon core, PRD, epochs, lanes, compilation | Attempt artifacts, version-specific implementations | L3-L4 (outlines + full content) |
| **agent-core** (future) | Constraints, decision rules, process docs, kickoff | Philosophy, history, exploratory appendices | L2-L3 (descriptions + outlines) |
| **dev-peer** (future) | Full canon, decisions, architecture | Internal process details | L4 (full content) |

### Using Progressive Disclosure for Pack Compilation

Instead of including or excluding entire documents, packs can include documents at different **disclosure levels**:

```json
{
  "lane": "website",
  "pack": "visitor",
  "sources": [
    { "file": "odd/manifesto.md", "level": "L2" },
    { "file": "canon/README.md", "level": "L2" },
    { "file": "docs/README.md", "level": "L1" },
    { "file": "docs/PRD/website/PRD.md", "level": "L2" }
  ]
}
```

**Benefits:**
- Smaller context size for constrained windows
- Progressive reveal: start with L1, expand to L4 as needed
- Consistent structure enables automated extraction

### Evaluation Questions for Packs:

For each document, ask:

1. **Which targets need this?**
   - Everyone (core) → Include in all packs
   - Specific role → Include in targeted pack only
   - No one → Exclude from all packs

2. **What's the signal-to-noise ratio?**
   - High signal, low noise → INCLUDE
   - Low signal, high noise → EXCLUDE or SUMMARIZE

3. **Is it stable enough?**
   - Stable (rarely changes) → INCLUDE
   - Volatile (changes often) → EXCLUDE from long-lived packs

4. **Does it fit the context budget?**
   - Essential for correct behavior → INCLUDE
   - Nice-to-have → EXCLUDE if over budget

---

## Audit Output Format

For each document evaluated, produce:

```markdown
### [File Path]

**Tier:** ODD | Canon | Docs | Other
**Current Status:** In book export? In which packs?

**Progressive Disclosure Structure:**
- [ ] Has frontmatter (uri, title, tier, stability, tags)
- [ ] Has H1 title matching frontmatter
- [ ] Has blockquote subtitle
- [ ] Has Description section
- [ ] Has Outline section
- [ ] Has Content section
- **Compliance:** Full | Partial | Missing

**Book Export:**
- [ ] INCLUDE | EXCLUDE
- Reason: [why]

**Context Packs:**
- [ ] visitor (L1-L2): INCLUDE | EXCLUDE — [reason]
- [ ] author (L3-L4): INCLUDE | EXCLUDE — [reason]
- [ ] agent-core (L2-L3): INCLUDE | EXCLUDE — [reason]

**If folder, has README-as-index?**
- [ ] Yes, with contents table
- [ ] Yes, but missing contents table
- [ ] No README.md

**Issues Found:**
- [ ] Stale content (last updated: [date], references outdated: [what])
- [ ] Misclassified (should be in [tier] instead of [tier])
- [ ] Redundant (duplicates [other file])
- [ ] Missing from manifest
- [ ] Broken references
- [ ] Missing progressive disclosure structure
- [ ] Folder missing README index

**Recommended Action:**
- [ ] No change
- [ ] Move to [new location]
- [ ] Update content
- [ ] Add progressive disclosure structure
- [ ] Add to pack: [pack name] at level [L1-L4]
- [ ] Remove from pack: [pack name]
- [ ] Create README index for folder
- [ ] Delete (with reason)
```

---

## Running the Audit

### Step 1: Collect All Documents

```bash
# List all markdown files in the repo
find . -name "*.md" -type f | grep -v node_modules | grep -v .git | sort
```

### Step 2: Check Current Book Export Inclusion

Review `/infra/scripts/export-book.js` for:
- `EXCLUDE_DIRS` — directories to skip
- `EXCLUDE_PATHS` — specific paths to skip
- `EXCLUDE_LANE_PATTERNS` — pattern-based exclusions
- `EXCLUDE_FILES` — specific files to skip

### Step 3: Check Current Pack Inclusion

Review `/infra/compile/plans/` for existing compile plans:
- What sources are included?
- What's missing?
- What's redundant?

### Step 4: Evaluate Each Document

Use the evaluation questions above to assess each document.

### Step 5: Produce Recommendations

Group recommendations by:
1. **Book export changes** (add/remove files from export)
2. **Pack changes** (add/remove files from compile plans)
3. **Tier corrections** (move files between ODD/Canon/Docs)
4. **Content fixes** (update stale content, fix references)
5. **Deletions** (remove obsolete files)

---

## Key Files to Read Before Auditing

| File | Why |
|------|-----|
| `/odd/decisions/D0001-three-tier-conceptual-hierarchy.md` | Tier definitions |
| `/docs/TRUTH_MAP.md` | Authoritative sources |
| `/docs/appendices/compilation-targets.md` | Pack target definitions |
| `/docs/appendices/canonical-compression.md` | Compression philosophy |
| `/docs/appendices/compilation.md` | Compilation process |
| `/infra/scripts/export-book.js` | Current book export logic |
| `/infra/compile/plans/**/*.json` | Current pack definitions |
| `/docs/appendices/epochs.md` | Example of full progressive disclosure structure |
| `/docs/appendices/README.md` | Example of README-as-index pattern |

---

## Success Criteria

The audit is complete when:

1. Every markdown file has been evaluated
2. Book export includes all guidance, excludes all implementation
3. Each pack serves its target audience with minimal noise
4. No stale content remains unaddressed
5. No misclassified documents remain in wrong tiers
6. All broken references have been flagged
7. **Progressive disclosure compliance assessed** for all documents
8. **README-as-index pattern verified** for all folders
9. **Disclosure levels assigned** for each pack inclusion

---

## Notes

- This audit is about **what to include**, not **how to compile**
- Packs are regenerated frequently; the audit focuses on the compile plans
- The book export is a snapshot; staleness is acceptable if flagged
- Prefer fewer, higher-quality inclusions over comprehensive coverage
