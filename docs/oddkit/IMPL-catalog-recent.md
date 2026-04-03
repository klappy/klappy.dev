---
uri: klappy://docs/oddkit/IMPL-catalog-recent
title: "Implementation: Catalog Temporal Discovery — sort_by and limit Parameters"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["oddkit", "catalog", "discovery", "recent", "temporal", "implementation", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Implementation: Catalog Temporal Discovery — sort_by and limit Parameters

> oddkit has no temporal discovery axis. catalog answers "what exists?" but not "what's new?" Adding `sort_by` and `limit` parameters to catalog fills the gap without diluting the tool set.

---

## Summary — Discovery Needs a Time Axis

oddkit's three discovery mechanisms — search (by topic), get (by URI), catalog (by structure) — share a blind spot: none of them answer "what's new?" or "what was added recently?" The frontmatter `date` field exists on most documents. oddkit already parses it. The data is indexed but not queryable by time.

This matters for two immediate consumers. The klappy.dev site needs to show recent articles when a user switches branches. Any oddkit-powered agent needs to answer "what changed?" without requiring the operator to know specific URIs or search terms. Both need the same primitive: sort documents by date, return the top N.

The decision: add parameters to catalog rather than creating a new tool. Adding tools dilutes the existing set. Catalog is already the discovery tool — extending it with temporal sorting is a natural fit.

---

## The Problem — New Articles Are Invisible

When 15 new articles land on a branch (as with E0007), there is no way to discover them through oddkit unless you already know their URIs or search for the right keywords. Catalog returns total counts and categories — it can tell you the corpus grew from 411 to 426 documents, but not which 15 are new. Search finds documents by relevance to a query, not by recency.

The result: the very articles designed to improve discoverability are themselves undiscoverable by the most natural question a user would ask — "what's new?"

---

## Proposed Parameters

### `sort_by` (optional, string)

Sorts the catalog results by the specified frontmatter field.

- `"date"` — Sort by the frontmatter `date` field, newest first.
- Default behavior (omitted or null): current catalog response — counts, categories, start-here suggestions, no individual document listing.

When `sort_by` is provided, the response includes an `articles` array of individual document metadata (path, title, date, tags) in addition to the existing counts and categories.

### `limit` (optional, number)

Maximum number of documents to return in the `articles` array. Only meaningful when `sort_by` is provided.

- Default: `10`
- Range: `1–100`

### `filter_epoch` (future extension, not in initial implementation)

Filtering by epoch tag is a natural extension but has no immediate pain signal. Not all documents have `epoch` in frontmatter. Implement when it hurts — not before.

---

## Response Shape (Extended)

When `sort_by` is provided, the existing response is extended with an `articles` array:

```json
{
  "action": "catalog",
  "result": {
    "total": 426,
    "canon": 180,
    "baseline": 426,
    "categories": ["...existing..."],
    "start_here": ["...existing..."],
    "articles": [
      {
        "path": "docs/oddkit/proactive/continuous-encoding.md",
        "title": "Continuous OLDC+H Encoding — Track at Every Turn, Not Just Session End",
        "date": "2026-04-03",
        "tags": ["odd", "oddkit", "encode", "oldc-h", "proactive"]
      }
    ]
  }
}
```

When `sort_by` is omitted, the response is unchanged — backward compatible.

---

## Behavioral Rules

1. **Backward compatible.** Catalog with no new parameters returns exactly what it returns today. No existing consumer breaks.
2. **Metadata only.** The `articles` array returns frontmatter metadata, not document content. For content, follow up with `oddkit_get`. This preserves catalog's lightweight character.
3. **Documents without dates sort last.** Not all documents have a `date` field. Those without it appear at the end of the sorted list, not at the beginning.
4. **Limit caps response size.** Without a limit, a sorted catalog of 400+ documents would be unwieldy. The default of 10 serves the most common use case.
5. **Respect canon_url.** The temporal discovery works with branch overrides. `catalog({ sort_by: "date", limit: 10, canon_url: "...branch..." })` returns the 10 newest articles on that branch.

---

## Alternatives Considered

**New tool (`oddkit_recent`):** Rejected. Adding tools dilutes the existing set. Every new MCP tool competes for attention in tool selection. Catalog is already the discovery tool — temporal sorting belongs there.

**Parameter on search:** Rejected. Search is relevance-ranked by design. Adding a date sort to search would create ambiguity: is the result relevant or just recent? Catalog is the right home because it's already about structural discovery, not semantic relevance.

**Separate REST endpoint:** Rejected for now. The klappy.dev site can call oddkit via MCP. If performance requires it, a REST endpoint can be added later — but the governance and behavior should be defined in MCP first.

---

## Implementation Notes

- The frontmatter `date` field is already parsed during indexing. No new parsing required — but verify that `date` is included in the indexed fields. Canon reference `docs/planning/oddkit-full-frontmatter-and-drift-audit.md` documents that oddkit historically cherry-picks frontmatter fields. If `date` is not currently indexed, the indexer needs a one-line addition.
- The `articles` array is a projection of the existing index — path, title, date, tags. No additional data fetching required.
- The `limit` parameter caps response size. Without it, a sorted catalog of 400+ documents would be unwieldy.
- `include_metadata` already returns full parsed frontmatter for get/search — catalog's sorted output uses the same parsed data.

---

## Consumer Examples

**klappy.dev site — "What's new on this branch?"**
```
catalog({ sort_by: "date", limit: 15, canon_url: "https://raw.githubusercontent.com/klappy/klappy.dev/e0007-proactive-posture" })
```

**Agent — "What was added recently?"**
```
catalog({ sort_by: "date", limit: 20 })
```

**Operator — "Show me recent articles"**
```
catalog({ sort_by: "date", limit: 10 })
```

---

## Canon References

- `docs/oddkit/tools/oddkit_catalog.md` — Existing catalog tool specification
- `docs/oddkit/IMPL-oddkit-diff.md` — Related: diff answers "what changed since X" at git level; catalog recent answers "what's newest" at frontmatter level
- `docs/oddkit/proactive/proactive-search.md` — Proactive search pattern that this feature complements
