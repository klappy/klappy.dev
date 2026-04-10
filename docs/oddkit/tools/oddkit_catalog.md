---
uri: oddkit://tools/catalog
title: "oddkit_catalog"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "catalog", "discovery", "navigation"]
---

# oddkit_catalog

> List all available documentation with counts, categories, and start-here suggestions. Supports temporal discovery and complete enumeration via sort modes and pagination.

## Description

`oddkit_catalog` provides a high-level map of the entire documentation corpus. In its default mode, it returns total document counts, a breakdown between canon and baseline, the full set of categories (derived from tags), and a curated list of start-here entry points.

When `sort_by` is provided, catalog also returns an `articles` array with per-document metadata — paths, URIs, and full frontmatter. Two sort modes are available: `date` (newest first, includes only documents with frontmatter) and `path` (alphabetical, includes all indexed documents regardless of frontmatter presence). Pagination via `limit` and `offset` supports both single-call retrieval (`limit=500`) and incremental consumption.

This tool answers both "what exists?" (default mode) and "give me everything" (with `sort_by`). For actual document content, follow up with `oddkit_search` (by topic) or `oddkit_get` (by URI).

## When to Use

- Understanding the size and shape of the documentation corpus
- Finding entry points when starting work in an unfamiliar repo
- Verifying document counts after structural changes or migrations
- Discovering available categories before running a targeted search
- Orienting a new agent to the repo's documentation landscape
- Enumerating all documents for a programmatic consumer (use `sort_by: "path", limit: 500`)
- Retrieving recent documents with full metadata (use `sort_by: "date"`)
- Filtering documents by epoch (use `filter_epoch`)

## Tool Definition

**Name:** `oddkit_catalog`

**Description:** Lists available documentation with categories, counts, and start-here suggestions. Supports temporal discovery: use `sort_by='date'` to get recent articles with full frontmatter metadata, or `sort_by='path'` for complete enumeration of all indexed documents.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "canon_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    },
    "sort_by": {
      "type": "string",
      "enum": ["date", "path"],
      "description": "Sort articles. 'date' returns newest first (requires frontmatter). 'path' returns all docs alphabetically, including undated."
    },
    "limit": {
      "type": "number",
      "minimum": 1,
      "maximum": 500,
      "description": "Max articles to return when sort_by is provided. Default: 10, max: 500."
    },
    "offset": {
      "type": "number",
      "minimum": 0,
      "description": "Skip this many articles before returning results. Use with limit for pagination. Default: 0."
    },
    "filter_epoch": {
      "type": "string",
      "description": "Filter to articles with this epoch value in frontmatter (e.g. 'E0007')."
    }
  },
  "required": []
}
```

### Response Shape

Default mode (no `sort_by`):

```json
{
  "action": "catalog",
  "result": {
    "total": "number — total documents in the corpus",
    "canon": "number — documents classified as canon",
    "baseline": "number — documents from the baseline (remote main branch)",
    "categories": ["string — category names derived from document tags"],
    "start_here": ["string — file paths recommended as entry points"]
  }
}
```

With `sort_by` provided:

```json
{
  "action": "catalog",
  "result": {
    "total": "number",
    "canon": "number",
    "baseline": "number",
    "categories": ["string"],
    "start_here": ["string"],
    "articles": [
      {
        "path": "string — file path relative to repo root",
        "uri": "string — klappy:// URI",
        "metadata": "object — full parsed frontmatter (title, date, tags, epoch, etc.)"
      }
    ],
    "pagination": {
      "offset": "number — current offset",
      "limit": "number — current limit",
      "total_candidates": "number — total articles matching filters",
      "has_more": "boolean — whether more articles exist beyond this page"
    }
  }
}
```

## Usage Examples

Complete enumeration in a single call:

```
oddkit_catalog({ sort_by: "path", limit: 500 })
```

Recent documents with full metadata:

```
oddkit_catalog({ sort_by: "date", limit: 20 })
```

Paginated retrieval:

```
oddkit_catalog({ sort_by: "date", limit: 100, offset: 0 })
oddkit_catalog({ sort_by: "date", limit: 100, offset: 100 })
```

Filter by epoch:

```
oddkit_catalog({ sort_by: "date", limit: 500, filter_epoch: "E0008" })
```

## Behavioral Rules

1. **Without `sort_by`, return counts and categories only.** Default mode provides structural metadata. No `articles` array, no pagination.
2. **With `sort_by=date`, include only documents with frontmatter.** Documents without frontmatter or without a date field are excluded. Sorted newest first; undated documents sort last.
3. **With `sort_by=path`, include all indexed entries.** Every document in the index appears regardless of frontmatter presence. Sorted alphabetically by path. This is the mode for complete enumeration.
4. **Pagination metadata is always present when `sort_by` is provided.** Consumers should check `has_more` to know whether additional pages exist.
5. **Start-here docs are curated entry points.** These are documents explicitly marked as starting points for new users or agents.
6. **Categories reflect tag distribution.** The categories list is derived from frontmatter tags across all indexed documents.
7. **Report canon vs. baseline breakdown.** The distinction between canon and baseline is always surfaced.
8. **Lightweight and side-effect free.** Catalog reads index metadata only. It does not modify state, fetch document content, or trigger reindexing.

## Canon References

- `klappy://canon/README` — Canon root document, typically appears in start-here suggestions
- `klappy://canon/case-studies/catalog-observability-gap` — Case study documenting the design evolution of this tool
