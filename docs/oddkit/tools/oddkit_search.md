---
uri: oddkit://tools/search
title: "oddkit_search"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "search", "retrieval", "discovery"]
---

# oddkit_search

> Semantic search across all canon and baseline documents by meaning, not exact text.

## Description

`oddkit_search` finds relevant documents by natural language query or tags. Given a query, it searches the full baseline (remote main branch) and returns ranked results with relevance scores, direct quotes as evidence, and canonical URIs for each hit.

This tool is the primary discovery mechanism for navigating the corpus. Unlike `oddkit_get`, which requires a known URI, search accepts natural language and returns the most relevant documents — making it the right entry point when you know *what* you need but not *where* it lives.

Results include both hits (ranked document summaries with scores) and evidence (direct quotes with citations). The evidence section provides ready-to-cite material without requiring a follow-up `oddkit_get` call for simple policy questions.

## When to Use

- Finding relevant documents without knowing exact paths or URIs
- Exploring unfamiliar areas of the corpus
- Answering policy questions with cited evidence
- Discovering canon constraints that bear on a current decision
- Locating prior decisions or encoded artifacts on a topic

## Tool Definition

**Name:** `oddkit_search`

**Description:** Search canon and baseline docs by natural language query or tags. Returns ranked results with citations and excerpts. Use when you need to find relevant documents without knowing exact URIs, explore unfamiliar areas, or answer policy questions with evidence. Always prefer this over answering from memory when canon or baseline docs may contain the answer.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "Natural language query or tags to search for. Describe what you are looking for in plain language."
    },
    "knowledge_base_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    },
    "result_grouping": {
      "type": "string",
      "enum": ["merged", "overlay_first", "grouped"],
      "description": "Optional. Ranking policy for results when an overlay (knowledge_base_url) is set. \"merged\" preserves pure BM25 score order. \"overlay_first\" promotes overlay (canon) hits above baseline hits while preserving BM25 score order within each tier. \"grouped\" additionally returns separate overlay_hits and baseline_hits arrays. Conditional default: knowledge_base_url unset → \"merged\" (no behavior change); knowledge_base_url set → \"overlay_first\"."
    }
  },
  "required": ["input"]
}
```

### Response Shape

```json
{
  "action": "search",
  "result": {
    "status": "FOUND | NOT_FOUND",
    "hits": [
      {
        "uri": "oddkit://... — canonical URI for this document",
        "path": "string — file path relative to repo root",
        "title": "string — document title from frontmatter",
        "tags": ["string — tags from frontmatter"],
        "score": "number — relevance score (higher is more relevant)",
        "snippet": "string — excerpt from the document",
        "source": "canon | baseline"
      }
    ],
    "overlay_hits": "array — only present when result_grouping is \"grouped\"; same shape as hits, restricted to source=\"canon\"",
    "baseline_hits": "array — only present when result_grouping is \"grouped\"; same shape as hits, restricted to source=\"baseline\"",
    "evidence": [
      {
        "quote": "string — direct quote from the document",
        "citation": "string — path#Section Name",
        "source": "canon | baseline"
      }
    ],
    "docs_considered": "number — total documents in the search index"
  }
}
```

## Result Grouping (Knowledge Base Overlay)

When `knowledge_base_url` is set, the search index merges the project's overlay docs (`source: "canon"`) with the configured baseline (`source: "baseline"`). Without ranking guidance, baseline content can outrank project-specific docs simply because the baseline is larger — a contamination shape `klappy://canon/principles/scoped-truth` names as the anti-pattern.

`result_grouping` controls how this is resolved:

- **`"merged"`** — Pure BM25 score order. No partition. The previous default for all calls; remains the default when `knowledge_base_url` is unset.
- **`"overlay_first"`** — Stable partition: all `source: "canon"` hits precede all `source: "baseline"` hits. BM25 score order is preserved within each tier, so a uniquely-relevant baseline doc still surfaces — just below the overlay's hits. **This is the default when `knowledge_base_url` is set.**
- **`"grouped"`** — Same ranking as `overlay_first`, plus the response carries explicit `overlay_hits` and `baseline_hits` arrays so callers can render the tiers separately.

The candidate pool is widened to 50 BM25 results when `result_grouping !== "merged"`, partitioned, then truncated to the response cap of 5. This ensures overlay docs ranked at BM25 position 6+ are visible to the partition rather than truncated before it.

## Behavioral Rules

1. **Return ranked results by relevance score.** Higher scores indicate stronger semantic match to the query. Results are ordered by descending score.
2. **Include direct quotes as evidence.** Evidence entries provide exact quotes with file path and section citations, ready for use without follow-up retrieval.
3. **Search the baseline, not local state.** Results come from the remote main branch (baseline), ensuring consistency across agents and sessions.
4. **Never invent results.** If no documents match, return `NOT_FOUND` with zero hits. Do not fabricate documents, URIs, or quotes.
5. **Report docs_considered for transparency.** The total number of documents in the search index is always returned, providing corpus size context.
6. **Prefer search over memory for policy questions.** When a question might be answered by canon or baseline docs, search first — do not answer from model knowledge.

## Canon References

- `klappy://canon/values/axioms` — Axiom 1 (Reality Is Sovereign) requires retrieval over fabrication
- `klappy://canon/principles/scoped-truth` — The contamination shape that motivated `result_grouping`; ranking precedence between overlay and baseline is the implementation answer
- `klappy://canon/constraints/definition-of-done` — Evidence standards that search helps satisfy
- `klappy://docs/agents/librarian/trusted-sources` — Citation rules governing how search results should be used
