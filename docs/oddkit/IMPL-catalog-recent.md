---
uri: klappy://docs/oddkit/IMPL-catalog-recent
title: "Implementation: Catalog Metadata Exposure — Articles List with Full Frontmatter"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["oddkit", "catalog", "discovery", "metadata", "recent", "temporal", "implementation", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Implementation: Catalog Metadata Exposure — Articles List with Full Frontmatter

> The metadata is already indexed. It's just not exposed. Catalog returns counts but no article-level metadata. Search and get hide metadata behind an opt-in flag. The real feature is exposure — sorting, filtering, and grouping are consumer concerns.

---

## Summary — Expose the Data, Let Consumers Decide

oddkit already parses and indexes full frontmatter for every document. The `include_metadata` flag on search and get proves the data is there. But catalog — the discovery tool — returns only aggregate counts and categories. It cannot list individual articles or their metadata. And search/get default `include_metadata` to false, hiding the very data that enables temporal discovery, epoch grouping, and audience filtering.

The core feature is metadata exposure: catalog should return an articles list with full frontmatter metadata. Sorting by date and limiting results are server-side operations — deterministic, cheap, and correct. The server does deterministic work (sort, filter, aggregate) because pushing that to an LLM is slow, expensive, and error-prone. Consumers get pre-sorted, pre-filtered results with full metadata attached — they can do additional grouping for novel queries without repeating the deterministic work.

This principle extends beyond catalog. Every tool that returns document references should expose metadata. The `include_metadata` default should be reconsidered across all tools — but catalog is the immediate priority because it's the discovery entry point.

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

### `filter_epoch` (optional, string)

Filter results to documents with a specific `epoch` value in frontmatter. Filtering is deterministic — the server should do it, not the LLM.

- Example: `"E0007"` returns only documents with `epoch: E0007` in frontmatter.
- Default: no filter (all documents).
- Documents without an `epoch` field are excluded when this filter is active.
- Limit applies after filtering.

---

## The Principle — Deterministic Work Belongs Server-Side

Sort and filter are deterministic operations. They belong on the server, not in the LLM. Making an LLM sort 400 articles by date is burning tokens on arithmetic the server can do in microseconds.

The division of labor: the server does deterministic work (sort, filter, aggregate, project metadata). The LLM does judgment work (interpretation, synthesis, recommendation, connecting patterns across results). Full metadata exposure enables the LLM to do its job without also doing the server's job.

Both are required. Metadata exposure without server-side sort/filter forces deterministic work onto the LLM. Server-side sort/filter without metadata exposure prevents the LLM from doing novel analysis. The correct design is both.

---

## Beyond Catalog — Metadata Exposure Across All Tools

This feature addresses catalog specifically, but the principle extends to all oddkit tools that return document references:

**Search** already supports `include_metadata: true` but defaults to false. With metadata exposed by default, agents get epoch, date, audience, and tier alongside relevance-ranked results — enabling them to interpret results without round-tripping back to get.

**Get** already supports `include_metadata: true`. Same principle — default to exposed.

**Orient, preflight, challenge** all return `canon_refs` — lists of relevant documents. These currently return path and a quote snippet but no metadata. Exposing metadata on these references would let consumers understand what they're looking at without calling get on each one.

The immediate implementation is catalog with `sort_by`, `limit`, and `filter_epoch`. Extend metadata exposure to other tools when the pain signal is clear.

---

## Response Shape (Extended)

When `sort_by` is provided, the existing response is extended with an `articles` array containing full frontmatter metadata:

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
        "uri": "klappy://docs/oddkit/proactive/continuous-encoding",
        "metadata": {
          "title": "Continuous OLDC+H Encoding — Track at Every Turn, Not Just Session End",
          "date": "2026-04-03",
          "epoch": "E0007",
          "audience": "docs",
          "exposure": "nav",
          "tier": 3,
          "voice": "neutral",
          "stability": "stable",
          "tags": ["odd", "oddkit", "encode", "oldc-h", "proactive", "continuous", "journal", "epoch-7"]
        }
      }
    ]
  }
}
```

The `metadata` object is the same shape that `include_metadata: true` returns on search and get — full parsed frontmatter, no cherry-picking. Consumers can group by `epoch`, filter by `audience`, sort by `date`, or use `tags` for faceted navigation. The server sorts; the consumer filters and groups.

When `sort_by` is omitted, the response is unchanged — backward compatible.

---

## Behavioral Rules

1. **Backward compatible.** Catalog with no new parameters returns exactly what it returns today. No existing consumer breaks.
2. **Full metadata, not cherry-picked fields.** The `metadata` object in each article is the complete parsed frontmatter — the same data `include_metadata: true` returns on search and get. No field filtering. Consumers decide what to use.
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

- Full frontmatter is already parsed during indexing — confirmed by `include_metadata: true` on search returning fields like `date`, `epoch`, `audience`, `tier`, `stability`, `tags`, and custom fields like `derives_from` and `complements`.
- The `articles` array is a projection of the existing index — path, URI, and the complete metadata object. No additional data fetching or parsing required.
- The `limit` parameter caps response size. Without it, a sorted catalog of 400+ documents would be unwieldy.
- Canon reference `docs/planning/oddkit-full-frontmatter-and-drift-audit.md` documents that oddkit historically cherry-picked frontmatter fields. The current `include_metadata` behavior suggests full parsing is now in place — verify before implementation.

---

## Consumer Examples

**klappy.dev site — "What's new on this branch?"**
```
catalog({ sort_by: "date", limit: 15, canon_url: "https://raw.githubusercontent.com/klappy/klappy.dev/e0007-proactive-posture" })
```

**Agent — "What was added in E0007?"**
```
catalog({ sort_by: "date", filter_epoch: "E0007" })
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
