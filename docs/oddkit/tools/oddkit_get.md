---
uri: oddkit://tools/get
title: "oddkit_get"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "retrieval", "get", "lookup"]
---

# oddkit_get

> Fetch a specific canonical document by its URI, returning full content and a content hash.

## Description

`oddkit_get` retrieves a single document by its `klappy://` URI. It returns the full markdown content — including frontmatter — along with a content hash that enables content-addressed caching. This is the direct-access complement to `oddkit_search`: use search when you don't know the URI, use get when you do.

The content hash is a short, stable identifier derived from the document's content. If the hash has not changed since your last retrieval, the content has not changed. This enables agents to cache documents locally and skip re-reading when the hash matches, without risking stale data.

## When to Use

- When you know the exact `klappy://` URI and need the full document
- After `oddkit_search` returns a URI and you need the complete content
- When you need to verify a content hash has not changed since a prior retrieval
- When citing a document and you need the full text to quote accurately

## Tool Definition

**Name:** `oddkit_get`

**Description:** Fetch a canonical document by klappy:// URI. Returns full content, including frontmatter, and a content hash for cache validation. Use when you know the exact URI — after search returns a hit, when a canon reference needs reading, or when verifying content freshness via hash comparison.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "A klappy:// URI identifying the document to fetch (e.g., 'klappy://canon/values/axioms')."
    },
    "canon_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    }
  },
  "required": ["input"]
}
```

### Response Shape

**Success:**

```json
{
  "action": "get",
  "result": {
    "path": "string — file path relative to repo root",
    "content": "string — full markdown content of the document including frontmatter",
    "content_hash": "string — short content-addressed hash for cache validation"
  }
}
```

**Not found:**

```json
{
  "action": "get",
  "result": {
    "error": "string — error message describing what was not found",
    "path": "string — the path that was resolved from the URI"
  }
}
```

## Behavioral Rules

1. **Only resolve `klappy://` URIs.** Other URI schemes are not supported. If a non-klappy URI is provided, return an error — do not attempt to fetch arbitrary URLs.
2. **Return full document content including frontmatter.** The response includes the complete markdown file as stored in the baseline, not a summary or excerpt.
3. **Content hash enables content-addressed caching.** The hash is derived from the document content. Same hash means same content — agents can skip re-reading when the hash matches a cached version.
4. **Return a clear error for unknown URIs.** If the URI does not resolve to a document, return an error with the resolved path. Do not return empty content or fabricate a document.
5. **Fetch from the baseline, not local state.** Documents are retrieved from the remote main branch, ensuring consistency regardless of local modifications.

## Canon References

- `klappy://canon/values/axioms` — Axiom 4 (You Cannot Verify What You Did Not Observe) — get provides direct observation of document state
- `klappy://odd/contract` — System contract defines URI resolution semantics
- `klappy://docs/agents/librarian/trusted-sources` — Trusted source hierarchy for retrieval
