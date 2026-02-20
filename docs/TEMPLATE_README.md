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

Contents tables are **auto-generated** from frontmatter by `scripts/generate-indexes.mjs`. The pre-commit hook runs the script and stages any updated READMEs. To enable auto-indexing for a folder, add `index_sort` to the README's frontmatter and place `<!-- INDEX:START -->` / `<!-- INDEX:END -->` markers where the table should appear.

## Outline

- When to Use This Template
- Frontmatter by Folder Type
- Auto-Generated Contents Tables
- Template Structure

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
index_sort: alpha
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
index_sort: alpha
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
index_sort: alpha
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
index_sort: alpha
---
```

---

## Auto-Generated Contents Tables

Contents tables are derived artifacts, not hand-maintained lists. The source of truth is the frontmatter in each file plus the file system directory listing. See `docs/planning/automated-readme-indexes.md` for the rationale.

### How it works

1. Add `index_sort` to the README's frontmatter (see sort modes below)
2. Place `<!-- INDEX:START -->` and `<!-- INDEX:END -->` markers in the README where the table should appear
3. The pre-commit hook runs `scripts/generate-indexes.mjs`, which scans the directory, parses frontmatter from each `.md` file (excluding `README.md` and `TEMPLATE.md`), and generates a `| Title | Description |` table between the markers
4. Modified READMEs are staged automatically

### Sort modes (`index_sort`)

| Value | Behavior | Use for |
|-------|----------|---------|
| `date_desc` | Reverse chronological by frontmatter `date` | `writings/` |
| `alpha` | Alphabetical by frontmatter `title` | `canon/` folders |
| `id` | Numeric by ID extracted from filename | `docs/decisions/` |

### Required frontmatter on content files

For a file to appear in the auto-generated index, it must have at minimum:

- `title` — used as the link text
- `uri` (recommended) — used as the link target; falls back to relative file path

Description is derived from (in priority order): `description` > `hook` > `subtitle` > first blockquote in body.

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
index_sort: alpha | date_desc | id
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

<!-- INDEX:START -->
<!-- INDEX:END -->

---

## [Optional Section]

[Additional context if needed...]

---

## See Also

- [Related Folder](/path/to/folder/) — Brief description
- [Related Doc](/path/to/doc.md) — Brief description
```

---

## See Also

- [Docs Index](./README.md) — Example implementation docs index
- [About Index](/about/README.md) — Example public-facing index
- [Article Template](./TEMPLATE.md) — For non-index documents
- [Planning: Automated README Indexes](./planning/automated-readme-indexes.md) — Rationale for this pattern
