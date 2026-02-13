# 📝 Document Inclusion Audit Checklist

Quick reference checklist for evaluating documents.

---

## Progressive Disclosure Structure Checklist

Every document SHOULD follow this structure:

```markdown
---
uri: klappy://[tier]/[path]      ← Required: unique identifier
title: "Title"                   ← Required: document title
audience: docs | canon | odd     ← Required: target audience
tier: 1 | 2                      ← Required: disclosure tier
stability: stable | evolving     ← Required: change expectation
tags: ["tag1", "tag2"]           ← Required: search/filter tags
---

# Title                          ← Required: H1 matching frontmatter

> Subtitle blockquote            ← Required: one-line summary

## Description                   ← Required: 1-2 paragraph overview

[Self-contained summary...]

## Outline                       ← Recommended: table of contents

- Section 1
- Section 2

---

## Content                       ← Required: full content below

[Detailed content...]
```

### Quick Compliance Check

For each document:

- [ ] **Frontmatter complete?** (uri, title, audience, tier, stability, tags)
- [ ] **H1 title present?**
- [ ] **Blockquote subtitle?** (one line after H1)
- [ ] **Description section?** (## Description with summary)
- [ ] **Outline section?** (## Outline with bullet list)
- [ ] **Content section?** (## Content with full text)

### Compliance Levels

| Level | Requirements | Pack Usability |
|-------|--------------|----------------|
| **Full** | All 6 elements | Can compile at any level (L0-L4) |
| **Partial** | Frontmatter + H1 + Description | Can compile at L0-L2 |
| **Minimal** | Frontmatter + H1 only | Can only list, not summarize |
| **Missing** | No frontmatter | Cannot be reliably compiled |

---

## README-as-Index Checklist

Every folder SHOULD have a `README.md` that:

- [ ] Lists all files in the folder with one-line summaries
- [ ] Groups files by category (if applicable)
- [ ] Explains the folder's purpose
- [ ] Links to related folders/docs

### Folder Index Template

```markdown
# 📁 [Folder Name]

> [One-line description of what this folder contains]

## Contents

| File | Summary |
|------|---------|
| `file1.md` | One-line description |
| `file2.md` | One-line description |

## [Subfolders if any]

| Folder | Purpose |
|--------|---------|
| `subfolder/` | What it contains |

## See Also

- [Related doc](/path/to/doc.md)
```

---

## Book Export Decision Tree

```
Is this file a markdown document (.md)?
├── NO → EXCLUDE (book is markdown only)
└── YES → Continue
    │
    Is it in /public/content/?
    ├── YES → EXCLUDE (duplicate of source)
    └── NO → Continue
        │
        Is it in /node_modules/, /.git/, /dist/, /build/?
        ├── YES → EXCLUDE (build/dependency artifact)
        └── NO → Continue
            │
            Is it in /**/attempts/**?
            ├── YES → Is it ATTEMPT.md, EVIDENCE.md, or META summary?
            │   ├── YES → EVALUATE (may include sealed records)
            │   └── NO → EXCLUDE (implementation artifacts)
            └── NO → Continue
                │
                Is it in /**/src/**?
                ├── YES → EXCLUDE (source code, not docs)
                └── NO → Continue
                    │
                    Is it in /products/*/v*/**?
                    ├── YES → EXCLUDE (version-specific implementation)
                    └── NO → Continue
                        │
                        Is it in /.cursor/plans/?
                        ├── YES → EXCLUDE (ephemeral plans)
                        └── NO → INCLUDE ✅
```

---

## Context Pack Inclusion Matrix

### By Document Type and Disclosure Level

| Document Type | visitor | author | agent-core | dev-peer |
|---------------|---------|--------|------------|----------|
| **ODD Manifesto** | L2 | L4 | L2 | L4 |
| **ODD Appendices** | ❌ | L4 | L2 select | L4 |
| **ODD Decisions** | ❌ | L2 D0001 | ❌ | L4 |
| **Canon README** | L2 | L4 | L2 | L4 |
| **Canon Core** | ❌ | L4 | L3 | L4 |
| **Canon Changelog** | ❌ | ❌ | ❌ | L4 |
| **Docs README** | L2 | L4 | L2 | L4 |
| **Docs Appendices** | ❌ | L3 select | L2 select | L4 |
| **Docs Decisions** | ❌ | ❌ | L2 select | L4 |
| **Lane PRDs** | L2 | L4 | L4 | L4 |
| **Attempt Workflows** | ❌ | L4 | L3 | L4 |
| **Agent Kickoff** | ❌ | ❌ | L4 | L4 |
| **Interfaces/Contracts** | ❌ | L2 select | L3 | L4 |
| **Visual System** | ❌ | L2 select | ❌ | L4 |
| **About Pages** | L2 | L4 | ❌ | L4 |
| **Projects** | L2 | L4 | ❌ | L4 |
| **Folder READMEs** | L1 | L2 | L2 | L4 |

### Disclosure Level Legend

| Level | What's Included | Typical Tokens |
|-------|-----------------|----------------|
| **L0** | Title only (from frontmatter) | ~50 |
| **L1** | + Subtitle blockquote | ~100 |
| **L2** | + Description section | ~200-500 |
| **L3** | + Outline section | ~300-700 |
| **L4** | + Full Content | Full doc |
| **❌** | Exclude entirely | 0 |

### Selection Legend
- `L4` = Include full document
- `L2 select` = Include Description level for selected files only
- `❌` = Exclude from this pack

---

## Staleness Indicators

A document may be stale if:

- [ ] References paths that no longer exist
- [ ] References `/canon/odd/` instead of `/odd/`
- [ ] Uses deprecated terminology (see TRUTH_MAP.md)
- [ ] Has frontmatter with old URIs
- [ ] Mentions epoch E0001 without historical context
- [ ] References single-PRD model without lane context
- [ ] Has broken markdown links
- [ ] Mentions removed CLI commands (attempt:reserve, attempt:reset)

---

## Misclassification Indicators

A document may be in the wrong tier if:

### Should be ODD (currently elsewhere):
- [ ] Describes universal principles applicable to any project
- [ ] Would still be true if klappy.dev didn't exist
- [ ] Contains no repo-specific paths or commands

### Should be Canon (currently elsewhere):
- [ ] Defines rules shared across all product lanes
- [ ] Is referenced by multiple lanes as authoritative
- [ ] Changes would affect all products

### Should be Docs (currently elsewhere):
- [ ] Contains CLI commands specific to this repo
- [ ] References Cloudflare, specific branch names, or lane names
- [ ] Describes how *this* instance implements a concept

---

## Redundancy Indicators

A document may be redundant if:

- [ ] Content is duplicated in `/public/content/` (expected)
- [ ] Content is duplicated in another source file (NOT expected)
- [ ] Two files define the same concept differently (conflict)
- [ ] A file restates another file without adding value

---

## Quick Quality Checks

For each document, verify:

- [ ] **Has frontmatter?** (uri, title, audience, tier, stability, tags)
- [ ] **Has emoji headers?** (consistent with docs style)
- [ ] **Has "See Also" section?** (cross-references to related docs)
- [ ] **References correct tier?** (ODD vs Canon vs Docs)
- [ ] **Uses absolute paths?** (e.g., `/odd/` not `odd/` or `../odd/`)

---

## Audit Tracking Template

Copy this for each document:

```markdown
## [path/to/file.md]

- **Tier:** [ ] ODD  [ ] Canon  [ ] Docs  [ ] Other
- **Has emoji headers:** [ ] Yes  [ ] No  [ ] N/A

### Progressive Disclosure Compliance
| Element | Present | Notes |
|---------|---------|-------|
| Frontmatter | [ ] Yes [ ] No | uri, title, tier, stability, tags |
| H1 Title | [ ] Yes [ ] No | Matches frontmatter? |
| Blockquote subtitle | [ ] Yes [ ] No | One-line summary? |
| Description section | [ ] Yes [ ] No | 1-2 paragraphs? |
| Outline section | [ ] Yes [ ] No | Bullet list of sections? |
| Content section | [ ] Yes [ ] No | Full content below? |

**Compliance Level:** [ ] Full  [ ] Partial  [ ] Minimal  [ ] Missing

### Book Export
- **Current:** [ ] Included  [ ] Excluded
- **Should be:** [ ] Include  [ ] Exclude
- **Change needed:** [ ] Yes → [action]  [ ] No

### Context Packs (with disclosure level)
| Pack | Current | Should | Level |
|------|---------|--------|-------|
| visitor | [ ] In [ ] Out | [ ] In [ ] Out | L__ |
| author | [ ] In [ ] Out | [ ] In [ ] Out | L__ |
| agent-core | [ ] In [ ] Out | [ ] In [ ] Out | L__ |

### If Folder: README Index Check
- [ ] Has README.md
- [ ] README has contents table
- [ ] README has file summaries
- [ ] N/A (not a folder)

### Issues
- [ ] Stale content: [details]
- [ ] Misclassified: [should be X]
- [ ] Redundant: [duplicates Y]
- [ ] Broken refs: [list]
- [ ] Missing progressive disclosure structure
- [ ] Folder missing README index
- [ ] Other: [details]

### Recommendation
[No change | Add disclosure structure | Move to X | Update content | 
 Add to pack Y at L__ | Remove from pack Z | Create folder README | Delete]
```

---

## Folder Audit Template

For each folder with documents:

```markdown
## [path/to/folder/]

- **Has README.md:** [ ] Yes  [ ] No
- **README has contents table:** [ ] Yes  [ ] No  [ ] N/A
- **File count:** [X] files

### Files in Folder
| File | Has Disclosure Structure | Compliance |
|------|-------------------------|------------|
| file1.md | [ ] Full [ ] Partial [ ] Missing | Notes |
| file2.md | [ ] Full [ ] Partial [ ] Missing | Notes |

### Recommendation
[ ] Folder is compliant
[ ] Create README index
[ ] Update README with contents table
[ ] Add disclosure structure to [files]
```
