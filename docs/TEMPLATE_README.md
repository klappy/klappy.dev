---
uri: klappy://docs/template-readme
title: "README Index Template"
audience: docs
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["template", "readme", "index"]
---

# README Index Template

> Template for folder README.md files that serve as scannable indexes.

## Description

Every navigable folder should have a README.md that serves as a scannable index. This enables agents to understand folder contents (~500 tokens) without reading every file (~20K+ tokens). The README-as-index pattern supports tree-shaking in context packs.

## Outline

- When to Use This Template
- Frontmatter by Folder Type
- Template Structure
- Contents Table Format

---

## When to Use This Template

Create a README index when:

- A folder contains 3+ files
- The folder is navigable (not internal/generated)
- Agents or humans need to discover what's in the folder

Do NOT create a README index for:

- Generated/derived folders (`public/_compiled/`, `dist/`)
- Single-file folders (promote the file to parent instead)
- Internal tooling folders (`.git/`, `node_modules/`)

---

## Frontmatter by Folder Type

### Public-facing folders (`/about/`)

```yaml
---
uri: klappy://about
title: "About"
audience: public
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["about", "index"]
---
```

### Implementation docs (`/docs/`, `/infra/`)

```yaml
---
uri: klappy://docs/appendices
title: "Appendices"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "appendices", "index"]
---
```

### Canon/ODD folders (`/canon/`, `/odd/`)

```yaml
---
uri: klappy://canon
title: "Canon"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "index"]
---
```

### Project documentation

```yaml
---
uri: klappy://docs/templates/prd-template
title: "PRD Template"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "templates", "prd"]
---
```

---

## Template Structure

```markdown
---
uri: klappy://<path>
title: "Folder Name"
audience: docs | canon | public
exposure: nav
tier: 1 | 2
voice: neutral
stability: stable | evolving
tags: ["folder", "index"]
---

# Folder Name

> One-line description of what this folder contains.

## Description

1-2 paragraph overview of the folder's purpose. What kind of content
lives here? Who is the intended audience? How does this folder relate
to the broader structure?

## Outline

- Contents
- [Optional: How to Use]
- [Optional: Relationship to X]
- See Also

---

## Contents

| File | Purpose |
|------|---------|
| `file1.md` | Brief description |
| `file2.md` | Brief description |
| `subfolder/` | Brief description |

---

## [Optional Section]

[Additional context if needed...]

---

## See Also

- [Related Folder](/path/to/folder/) — Brief description
- [Related Doc](/path/to/doc.md) — Brief description
```

---

## Contents Table Format

### For files

```markdown
| File | Purpose |
|------|---------|
| `ATTEMPTS.md` | Attempt lifecycle and CLI commands |
| `TRUTH_MAP.md` | Authoritative source for each domain |
```

### For files with titles

```markdown
| File | Title | Summary |
|------|-------|---------|
| `bio.md` | Bio | Author background |
| `faq.md` | FAQ | Common questions |
```

### For subfolders

```markdown
| Folder | Purpose | Count |
|--------|---------|-------|
| `appendices/` | Implementation appendices | 17 files |
| `decisions/` | Decision records | 14 files |
```

### For decisions (with status)

```markdown
| ID | Title | Status |
|----|-------|--------|
| D0001 | prod Branch Is Production | Active |
| D0002 | Attempt Provenance Required | Active |
```

---

## See Also

- [Docs Index](./README.md) — Example implementation docs index
- [About Index](/about/README.md) — Example public-facing index
- [Article Template](./TEMPLATE.md) — For non-index documents
