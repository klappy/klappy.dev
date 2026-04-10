---
uri: klappy://canon/case-studies/catalog-observability-gap
title: "Case Study — When the Knowledge Server Cannot See Its Own Knowledge Base"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["case-study", "observability", "catalog", "pagination", "oddkit", "klappy-dev", "vodka-architecture", "axiom-4"]
epoch: E0008
date: 2026-04-09
derives_from: "canon/values/axioms.md"
complements: "docs/appendices/epochs.md"
governs: "Design assumptions about catalog consumers and enumeration use cases"
status: active
---

# Case Study — When the Knowledge Server Cannot See Its Own Knowledge Base

> oddkit serves 500+ documents. The primary public interface for reading those documents could only retrieve 196 of them — not because of a bug, but because oddkit was never designed for a consumer that needed to see everything. Two fixes shipped the same day: pagination with a raised limit doubled coverage to 389, and a new `sort_by=path` mode closed the remaining gap to 473. Along the way, a second observability failure surfaced: GitHub API rate limiting silently defeated the SHA-based cache, serving a six-day-old index while the system believed it was content-addressed. The fixes were small. The lesson is about what happens when infrastructure works well enough to hide its own blind spots.

---

## Summary

klappy.dev is the public website where humans read oddkit's canon — essays, principles, case studies, observations. Behind it, a Supabase edge function assembles the document catalog by calling oddkit's MCP tools. In April 2026, with the canon at 500 documents and growing, the edge function was retrieving only 196. Eighteen parallel MCP calls — seven epoch-partitioned catalog queries plus eleven prefix-targeted searches — and still 60% of the knowledge base was invisible to the reading interface.

The root cause was not a bug. It was a design assumption: `oddkit_catalog` was built as a discovery menu for AI agents making targeted queries, not as an enumeration surface for programmatic consumers needing completeness. The hard cap of 100 results with no pagination made this assumption structural.

The fix came in two phases on the same day. First: raise the limit to 500 and add an `offset` parameter for pagination — this doubled coverage from 196 to 389. Second: add `sort_by=path`, which includes all indexed entries regardless of frontmatter presence — this closed the gap to 473. A secondary finding surfaced during verification: GitHub API rate limiting was silently defeating the SHA-based cache, serving a six-day-old index. PRs #74 and #76 on klappy/oddkit.

---

## The Problem as Encountered

The klappy.dev doc-listing edge function is the only path between oddkit's knowledge base and a human reader browsing the site. It calls oddkit's MCP server, assembles document entries, and feeds them to the frontend. The frontend handles filtering by section, toggling between public and internal views, and rendering navigation.

The edge function was doing heroic work to compensate for a tool that would not give it what it needed. The strategy: fan out across every available axis.

Seven catalog calls partitioned by epoch — E0002 through E0008 — each requesting 100 items sorted by date. Eleven search calls targeting path prefixes: `writings/`, `canon/values/`, `canon/constraints/`, `canon/meta/`, `canon/case-studies/`, `docs/oddkit/`, `docs/appendices/`, `docs/explorations/`, `odd/`, `about/`, `interfaces/`. All eighteen calls fired in parallel. Results were deduplicated and merged.

Despite this, only ~196 unique documents came back. The gap:

`oddkit_catalog` with `sort_by=date` returned at most 100 items per call, and many epoch partitions overlapped or returned the same documents. Documents without dates in their frontmatter were invisible to date-sorted mode entirely.

`oddkit_catalog` without `sort_by` returned category names and counts — "canon: 139, docs: 259" — but zero individual document paths. It was a summary of what existed, not a listing of it.

`oddkit_search` returned roughly 10 relevance-ranked results per query. Useful for supplementing, but fundamentally not a listing tool. Many documents did not match any of the eleven prefix queries.

There was no "list all paths" capability. The only complete file index available was GitHub's Tree API, which lives outside oddkit's epistemic surface entirely.

---

## Why This Is an Axiom 4 Violation

Axiom 4: You cannot verify what you did not observe.

The primary public interface for human consumption of the canon could not observe 60% of the documents it was supposed to serve. This is not a degraded experience — it is a structural blind spot. Documents existed, had frontmatter, had content, were indexed internally by oddkit's own build pipeline. But no tool exposed them to the consumer that needed them.

The irony is specific to E0008. The epoch's thesis is observability — the system turning observation inward. Telemetry was the first deliverable: oddkit can now see who uses it, which tools matter, how many requests it handles. But it could not enumerate its own documents to the interface that serves them to readers. The system could observe its traffic but not its content.

---

## The Design Assumption That Created the Gap

oddkit's catalog was designed as a discovery menu. Its mental model: an AI agent arrives at a knowledge base it has never seen, calls `oddkit_catalog`, and gets oriented — here are the top categories, here is where to start, here are recent additions. The agent then makes targeted queries: search for a topic, get a specific document, challenge a claim against the canon.

This model is correct for AI consumers. An agent does not need to enumerate every document. It needs to know what kind of knowledge base it is working with and then drill into specifics. The 100-item cap was not arbitrary — it was a reasonable guard against returning massive payloads to a context window that has better things to do with its tokens.

But klappy.dev is not an AI agent. It is a programmatic consumer that renders a navigation interface. It needs completeness, not discovery. It needs every path, every title, every date — not a curated sample. The catalog tool had one consumer archetype in mind, and a second archetype arrived that it could not serve.

Aquifer-MCP — a sibling project serving Bible translation resources — had already encountered and solved this same pattern. Its solution: use GitHub's API as the authoritative enumeration surface, then enrich entries with MCP metadata where available. The complete index comes from git; the rich metadata comes from the knowledge server. Two surfaces, each doing what it is good at.

The klappy.dev edge function was attempting the same hybrid approach — using oddkit's MCP tools as both enumeration and enrichment — and the enumeration half was failing because the tools were never built for it.

---

## The Fix

Three changes to the oddkit Worker (`workers/src/orchestrate.ts` and `workers/src/index.ts`):

**Raise the limit cap from 100 to 500.** The catalog response contains paths and frontmatter metadata, not full document content. At 500 documents, the payload is roughly 200KB — well within reason for a programmatic consumer. The old cap was a design choice for AI context windows, not a technical constraint.

**Add an `offset` parameter.** Consumers that prefer incremental retrieval can paginate: `offset=0, limit=100`, then `offset=100, limit=100`, and so on. The implementation is a slice over the already-sorted candidate array — no new data structures, no cursor state.

**Return pagination metadata.** The response now includes `{ offset, limit, total_candidates, has_more }` so consumers know whether they have everything or need another call.

The Zod schemas on both the unified `oddkit` tool and the standalone `oddkit_catalog` tool were updated to reflect the new parameter and the raised cap.

This immediately doubled coverage — from ~196 documents to 389 in a single call. But 84 documents were still missing. They were indexed by oddkit's build pipeline, present in the category counts, but invisible to `sort_by=date` because they had no date in their frontmatter.

---

## Closing the Last Gap

The original version of this case study noted the remaining gap and predicted the fix: a `sort_by=path` mode that returns all indexed entries regardless of frontmatter presence. That prediction shipped the same day.

**Add `sort_by=path`.** Where `sort_by=date` filters to documents with frontmatter and sorts by date, `sort_by=path` includes every indexed entry — regardless of whether it has frontmatter, a date, or any metadata at all — and sorts alphabetically by path. Undated documents get empty metadata but their paths and titles are discoverable.

What the edge function can now do:

```
oddkit_catalog({ sort_by: "path", limit: 500 })
```

One call. All 473 documents. The eighteen-call fan-out becomes unnecessary. Consumers needing rich metadata on dated documents can use `sort_by=date`; consumers needing completeness use `sort_by=path`; consumers needing both can merge the two.

---

## A Second Observability Gap: SHA Resolution Under Rate Limiting

During verification, the production index reported 411 documents with a `generated_at` timestamp six days old — despite the cache being content-addressed by commit SHA. Investigation revealed a second Axiom 4 violation in the SHA resolution logic.

The Worker resolves the current commit SHA via an unauthenticated GitHub API call (60 requests/hour limit). When rate-limited, `getLatestCommitSha` returns `null`. The cache match logic then evaluates `!baselineSha || cached.commit_sha === baselineSha` — and since `baselineSha` is null, the condition is trivially true. Any cached index matches, regardless of age.

The system believed its cache was content-addressed. Under rate limiting, it silently degraded to a TTL-free stale cache with no expiration. The index served was truthful for the commit it was built from, but the system had no way to know it was six days behind. This is the same pattern as the catalog gap: not an error, not a crash — silent incompleteness where everything appears to be working.

---

## The Pattern

When a tool designed for one consumer archetype encounters a second archetype with fundamentally different access patterns, the failure mode is not errors — it is silent incompleteness. The tool works. Every call returns valid results. The consumer assembles what it can and presents it as if it were everything. No error is raised. No warning appears. The 304 missing documents simply do not exist from the reader's perspective.

This is the most dangerous kind of infrastructure gap: one that produces a plausible but incomplete picture. The fix is rarely complex. The hard part is noticing that the picture is incomplete when everything appears to be working.

---

## What Remains

The SHA resolution vulnerability identified above has not yet been fixed. Options include authenticating GitHub API calls (raising the limit from 60 to 5,000 requests/hour) or treating a null SHA as a cache miss rather than a universal match. Either fix is small; the hard part was noticing the degradation.

---

## See Also

- `canon/values/axioms.md` — Axiom 4: You cannot verify what you did not observe
- `docs/appendices/epochs.md` — E0008 epoch declaration (Observability)
- oddkit PR #74 — Catalog pagination and limit raise
- oddkit PR #76 — `sort_by=path` for complete enumeration
