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

> List all available documentation with counts, categories, and start-here suggestions.

## Description

`oddkit_catalog` provides a high-level map of the entire documentation corpus. It returns total document counts, a breakdown between canon and baseline, the full set of categories (derived from tags), and a curated list of start-here entry points for new users or agents.

This tool answers the question "what exists?" without returning any document content. It is the right starting point when orienting in an unfamiliar repo or verifying corpus shape after structural changes. For actual document content, follow up with `oddkit_search` (by topic) or `oddkit_get` (by URI).

## When to Use

- Understanding the size and shape of the documentation corpus
- Finding entry points when starting work in an unfamiliar repo
- Verifying document counts after structural changes or migrations
- Discovering available categories before running a targeted search
- Orienting a new agent to the repo's documentation landscape

## Tool Definition

**Name:** `oddkit_catalog`

**Description:** Lists available documentation with categories, counts, and start-here suggestions. Returns total document counts (canon vs. baseline), category distribution from tags, and curated entry points. Use to understand corpus shape, find starting points, or verify doc counts. Does not return document content — use search or get for that.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "canon_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    }
  },
  "required": []
}
```

### Response Shape

```json
{
  "action": "catalog",
  "result": {
    "total": "number — total documents in the corpus",
    "canon": "number — documents classified as canon",
    "baseline": "number — documents from the baseline (remote main branch)",
    "categories": [
      "string — category names derived from document tags"
    ],
    "start_here": [
      "string — file paths recommended as entry points"
    ]
  }
}
```

## Behavioral Rules

1. **Return counts and categories, not content.** Catalog provides structural metadata only. For document content, use `oddkit_search` or `oddkit_get`.
2. **Start-here docs are curated entry points.** These are documents explicitly marked as starting points for new users or agents. They represent the recommended reading order for orientation.
3. **Categories reflect tag distribution.** The categories list is derived from frontmatter tags across all indexed documents. It represents what the corpus covers, not a fixed taxonomy.
4. **Report canon vs. baseline breakdown.** The distinction between canon (immutable governing documents) and baseline (all indexed documents from remote main) is always surfaced.
5. **Lightweight and side-effect free.** Catalog reads index metadata only. It does not modify state, fetch document content, or trigger reindexing.

## Canon References

- `klappy://canon/README` — Canon root document, typically appears in start-here suggestions
- `klappy://canon/epistemic-modes` — Epistemic modes that inform how agents orient using catalog results
