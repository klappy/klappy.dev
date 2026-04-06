---
uri: klappy://canon/meta/frontmatter-schema
title: "Frontmatter Schema — The Authoritative Reference for All Document Metadata"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "meta", "frontmatter", "schema", "YAML", "metadata", "governance", "template", "validation"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/meta/writing-canon.md, canon/values/axioms.md"
complements: "canon/meta/TEMPLATE.md, docs/TEMPLATE.md, canon/constraints/definition-of-done.md"
governs: "All YAML frontmatter in all documents across all directories"
status: active
supersedes: "Frontmatter sections in canon/meta/TEMPLATE.md and docs/TEMPLATE.md (those remain as structural templates; this document is the authoritative field reference)"
---

# Frontmatter Schema — The Authoritative Reference for All Document Metadata

> YAML frontmatter values must match the types the site renderer expects: booleans unquoted, integers unquoted, dates unquoted, simple identifiers unquoted, strings with special characters quoted. Every document must include the eight universal fields: uri, title, audience, exposure, tier, voice, stability, tags. Additional fields are required or optional per audience. This document is the single source of truth for frontmatter — not templates, not other documents, not pattern-matching from existing files. When in doubt, consult this document. When this document and another disagree, this document wins.

---

## Summary — One Schema, All Documents, No Guessing

The canon has over 400 documents with no authoritative frontmatter schema. Fields, types, and quoting rules have been copied ad-hoc from whatever document an agent finds first. This has produced: unquoted values that parse as wrong types (dates as date objects, tiers as integers, booleans as booleans), inconsistent field presence across documents of the same audience, and silent rendering failures when the site's build system encounters unexpected types.

This document fixes the problem by defining the schema once. Templates (`canon/meta/TEMPLATE.md`, `docs/TEMPLATE.md`) define document structure. This document defines field requirements. When they disagree, this document wins.

---

## The Universal Rule — Quote Only What Needs Quoting

YAML frontmatter values follow a simple pattern derived from the working corpus: quote strings that contain special characters, leave simple identifiers and native types unquoted.

```yaml
# Simple identifiers — unquoted
audience: canon
exposure: nav
voice: neutral
stability: semi_stable
type: essay
author: Klappy
slug: my-article-slug
epoch: E0007
status: active

# Integers — unquoted
tier: 2

# Booleans — unquoted
public: true
archived: false

# Dates — unquoted
date: 2026-04-04

# URIs — unquoted
uri: klappy://canon/principles/example

# Strings with special characters — quoted
title: "My Title — With Dashes and Colons: Like This"
subtitle: "Why it matters"
description: "A sentence with punctuation, dashes — and other characters."
hook: "The one-liner that grabs attention."
derives_from: "canon/values/axioms.md, canon/principles/other.md"
complements: "docs/path/to/sibling.md"
governs: "All documents in this scope"

# Arrays — inline with quoted strings
tags: ["canon", "principle", "example"]
```

The test is simple: if the value is a single word or simple identifier (no spaces, no special characters), leave it unquoted. If it contains spaces, punctuation, or special characters, quote it. Booleans, integers, and dates are always unquoted — the renderer expects native YAML types, not strings.

---

## Universal Required Fields — Every Document, Every Audience

These eight fields are required on every document in the knowledge base, regardless of audience:

| Field | Format | Description |
|-------|--------|-------------|
| `uri` | `"klappy://path/to/slug"` | Canonical URI. Must match the file's logical location. |
| `title` | `"Full Title — With Stance"` | Document title. Must name concept and signal position (Writing Canon Tier 1). |
| `audience` | `"canon"` `"docs"` `"public"` `"odd"` `"operators"` `"apocrypha"` | Which audience this document serves. Determines required fields below. |
| `exposure` | `"nav"` `"public"` `"draft"` `"hidden"` `"internal"` | Visibility level. `nav` = navigable but not promoted. `public` = published on site. `draft` = work in progress. `hidden` = exists but not listed. `internal` = team-only. |
| `tier` | `"1"` `"2"` `"3"` `"4"` | Epistemic obligation level. `1` = foundational. `2` = governance. `3` = operational. `4` = ephemeral. See `canon/definitions/epistemic-obligation-and-document-tiers.md`. |
| `voice` | `"first_person"` `"neutral"` `"direct"` `"narrative"` `"conversational"` `"authoritative"` | Writing voice. `first_person` = Klappy speaks. `neutral` = system documentation. |
| `stability` | `"stable"` `"semi_stable"` `"evolving"` `"draft"` `"experimental"` | How likely this document is to change. Governs how confidently agents should rely on it. |
| `tags` | `["tag1", "tag2"]` | Inline array of quoted strings. Used for search and categorization. Must not be empty — at minimum include the audience and one topic tag. |

---

## Audience-Specific Fields

### audience: "canon"

Canon documents define program-level constraints.

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `epoch` | recommended | `"E0007"` | Which epoch introduced this document |
| `date` | recommended | `"2026-04-04"` | Date created or last substantively revised |
| `derives_from` | recommended | `"path/to/source.md, path/to/other.md"` | What this document is grounded in. Full file paths, not floating names. |
| `complements` | optional | `"path/to/sibling.md"` | Related documents that work alongside this one |
| `governs` | optional | `"description of what this constrains"` | What behavior or documents this constrains |
| `status` | optional | `"active"` `"proposed"` `"final"` | Lifecycle status |
| `supersedes` | optional | `"path/to/old.md"` | What this replaces |

### audience: "docs"

Docs documents define implementation details, planning, and operational guides.

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `epoch` | recommended | `"E0007"` | Which epoch this belongs to |
| `date` | recommended | `"2026-04-04"` | Date created |
| `derives_from` | optional | `"path/to/source.md"` | What this is grounded in |
| `complements` | optional | `"path/to/sibling.md"` | Related documents |
| `governs` | optional | `"description"` | What this constrains |
| `supersedes` | optional | `"path or description"` | What this replaces |
| `forcing_fault` | epoch docs only | `"description"` | What friction triggered this epoch |
| `new_invariant` | epoch docs only | `"statement"` | What's now true that wasn't before |
| `core_shift` | epoch docs only | `"old → new"` | What changed |
| `documents_introduced` | epoch docs only | `["path1.md", "path2.md"]` | Files added in this epoch |
| `extends` | sub-epoch docs | `"Epoch N (description)"` | Parent epoch this extends |

### audience: "public"

Public documents include essays, articles, about pages, and website navigation pages. Essays and articles have additional required fields for site rendering.

**All public documents:**

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `epoch` | recommended | `"E0007"` | Which epoch |
| `date` | recommended | `"2026-04-04"` | Publication or creation date |
| `derives_from` | recommended | `"path/to/source.md"` | Grounding |
| `complements` | optional | `"path/to/sibling.md"` | Related content |

**Additional fields required when `type` is `"essay"` or `"article"`:**

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `slug` | **required** | `"kebab-case-url-slug"` | URL path. Used by the site renderer to generate page URLs. **Without this, pages render blank.** |
| `author` | **required** | `"Klappy"` | Author name. Always `"Klappy"` for this project. |
| `type` | **required** | `"essay"` or `"article"` | Content type. Used by the renderer to select template. |
| `public` | **required** | `"true"` or `"false"` | Whether this is published on the site. `"false"` = draft, not visible. |
| `description` | **required** | `"1-2 sentence description"` | Used for SEO meta description and social sharing. |
| `hook` | **required** | `"One compelling sentence"` | Used for teaser text in listings and cards. |
| `subtitle` | recommended | `"Explanatory subtitle"` | Appears below title on the page |
| `og_title` | recommended | `"Title for social sharing"` | OpenGraph title. Defaults to `title` if omitted. |
| `og_description` | recommended | `"Description for social sharing"` | OpenGraph description. Defaults to `description` if omitted. |
| `og_type` | optional | `"article"` | OpenGraph type |
| `og_image` | optional | `"/images/slug-og.png"` | OpenGraph image path |
| `twitter_card` | optional | `"summary_large_image"` | Twitter card type |
| `twitter_title` | optional | `"Title for Twitter"` | Twitter title |
| `twitter_description` | optional | `"Description for Twitter"` | Twitter description |
| `twitter_image` | optional | `"/images/slug-og.png"` | Twitter image path |
| `related` | optional | `[{uri, label, relationship}]` | Related content links (YAML object array) |
| `provenance` | optional | `{trigger, author_interventions, ...}` | Detailed authorship record (YAML object) |
| `book_part` | book chapters only | `"Part N — Title"` | Book section |
| `book_chapter` | book chapters only | `"5"` | Chapter number (quoted) |

**About pages, indexes, and navigation pages** (`about/`, READMEs, positioning docs) do not need slug, author, type, or social metadata. They render through structural routes, not content templates.

### audience: "operators"

Operator documents are tool references and MCP server documentation.

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `epoch` | optional | `"E0007"` | Which epoch |
| `date` | optional | `"2026-04-04"` | Date |
| `derives_from` | optional | `"path/to/source.md"` | Grounding |
| `complements` | optional | `"path/to/sibling.md"` | Related docs |
| `governs` | optional | `"description"` | What this constrains |

### audience: "apocrypha"

Apocrypha documents are system-voice fragments, predocumentaries, and reconstructions.

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `epoch` | recommended | `"E0005"` | Origin epoch |
| `type` | recommended | `"fragment"` `"predocumentary"` `"reconstruction"` | Apocrypha subtype |
| `depends_on` | optional | `["path1.md", "path2.md"]` | Source dependencies |
| `confidence` | optional | `"experiential"` `"unknown"` | Interpretive confidence |
| `provenance` | optional | `"cinematic"` `"disputed"` `"uncertain"` | Origin classification |
| `classification` | optional | `"post-stability record"` | Temporal classification |

### audience: "odd"

ODD documents define universal philosophy and methodology.

| Field | Required? | Format | Notes |
|-------|-----------|--------|-------|
| `epoch` | optional | `"E0005"` | Which epoch |
| `date` | optional | `"2026-04-04"` | Date |
| `derives_from` | optional | `"path/to/source.md"` | Grounding |
| `version` | optional | `"1.0"` (quoted) | Document version |
| `slug` | if site-rendered | `"kebab-case"` | URL slug for public-facing ODD docs |

---

## Archived Documents

Any document can be archived by adding:

```yaml
archived: "true"
archived_reason: "E0005.1 — superseded by description"
```

Archived documents remain in the knowledge base for history but are excluded from active navigation and search prioritization.

---

## Smell Test — How to Detect a Frontmatter Violation

- **Type mismatches.** If a boolean field like `public` is quoted as `"false"` (a truthy string) instead of `false` (a boolean), the renderer behaves incorrectly. If an integer field like `tier` is quoted as `"2"` instead of `2`, type comparisons fail.
- **Blank pages in PR previews.** The most common symptom of frontmatter errors. Usually caused by quoted booleans/integers that should be native types, missing `slug` on public essays, or missing `type` on essays.
- **Copying frontmatter from another document.** The smell itself. If the source of truth for frontmatter is "whatever document I found first," the schema is not being consulted. Consult this document instead.
- **Fields that don't appear in this schema.** If you're adding a field that doesn't appear here, either this schema needs updating (propose the addition) or the field is ad-hoc and shouldn't be added.

---

## Required Response When a Violation Is Detected

1. **Match the type the renderer expects.** Booleans unquoted (`true`/`false`), integers unquoted (`2`), dates unquoted (`2026-04-04`), simple identifiers unquoted (`canon`, `nav`), complex strings quoted (`"Title — With Special Characters"`).
2. **Check required fields.** Consult the audience-specific table above. If required fields are missing, add them.
3. **Consult this document, not other documents.** Do not copy frontmatter from another file to fix the problem. This schema is the source of truth.
4. **If this schema is incomplete, update it.** If a legitimate field is missing from this schema, add it here first, then use it. The schema must stay current with actual usage.

---

## Enforcement

This schema is a preflight and validate checkpoint. When the deliverable is a document, frontmatter compliance is a Definition of Done requirement alongside the Writing Canon checklist.

The schema was derived from corpus analysis of 389 documents on April 4, 2026, and should be maintained as the canon evolves. Fields that appear in fewer than 5% of documents within an audience are not listed unless they serve a specific structural purpose.

---

## See Also

- [Writing Canon](klappy://canon/meta/writing-canon) — progressive disclosure and structural requirements for document bodies
- [Canon Article Template](klappy://canon/meta/TEMPLATE.md) — structural template for canon documents (consult this schema for field requirements)
- [Epistemic Obligation and Document Tiers](klappy://canon/definitions/epistemic-obligation-and-document-tiers) — what tier values mean
- [Definition of Done](klappy://canon/constraints/definition-of-done) — completion requirements including frontmatter compliance
