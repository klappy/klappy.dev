---
uri: klappy://docs/oddkit/responses/envelope-reference
title: "Response Envelope Reference — debug.trace and the Per-Request Story"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "response", "envelope", "debug", "trace", "transparency", "observability", "client-facing"]
epoch: E0008
date: 2026-04-26
derives_from: "canon/constraints/telemetry-governance.md, canon/principles/vodka-architecture.md"
complements: "docs/oddkit/tools/telemetry_public.md"
---

# Response Envelope Reference — debug.trace and the Per-Request Story

> Every oddkit response carries the full story of how it was assembled. This document explains what each field in the response envelope means, with real production traces as worked examples.

## Description

Every oddkit response is a JSON-RPC envelope wrapping a `result`, an `assistant_text`, a `server_time`, and a `debug` block. The `debug` block contains per-request observability that lives only in this response — it is never written to long-term storage. If you want to know why a specific call was slow, why a search returned what it did, or whether your client is hitting cold workers, the answer is in the response you already have.

For aggregate questions across many requests, use the `telemetry_public` tool to query Cloudflare Analytics Engine. The two surfaces share the same arithmetic but serve different audiences: `debug.trace` is for the call you just made; `telemetry_public` is for fleet-level patterns.

## Outline

- The Envelope at a Glance
- The `debug.trace` Block
- URL Prefixes — What Each Tier Means
- Worked Examples from Production
- When to Read the Envelope vs Query Telemetry
- Stability Guarantees
- See Also

---

## The Envelope at a Glance

A typical successful response looks like this:

```json
{
  "action": "search",
  "result": { "...": "tool-specific result payload" },
  "assistant_text": "...rendered text suitable for direct display...",
  "server_time": "2026-04-26T22:26:30.506Z",
  "debug": {
    "duration_ms": 511,
    "generated_at": "2026-04-26T22:26:30.506Z",
    "trace": {
      "spans": [...],
      "fetches": [...],
      "cacheStats": { "hits": 4, "misses": 0, "total": 4 },
      "total_ms": 721
    }
  }
}
```

| Field | Meaning |
|-------|---------|
| `action` | The action that ran (e.g. `search`, `get`, `orient`) |
| `result` | Tool-specific payload — the actual answer |
| `assistant_text` | Pre-rendered text suitable for an LLM client to display directly |
| `server_time` | Authoritative wall-clock time from the worker. Use this rather than your local clock for time-based reasoning |
| `debug.duration_ms` | Time spent inside the action handler (not including MCP transport overhead) |
| `debug.generated_at` | When the response was generated |
| `debug.trace` | Per-request observability — spans, fetches, cache arithmetic |

> Some tools surface additional fields on `result` — for example, `oddkit_search` returns `hits[]`, `evidence[]`, and `docs_considered`; `oddkit_resolve` returns `supersession_chain`. Those are documented per-tool. The envelope shape above is universal.

---

## The `debug.trace` Block

`debug.trace` has four fields:

### `spans[]` — non-fetch operations

Each entry records something the worker did that wasn't a storage read:

```json
{ "label": "action:search", "duration_ms": 511 }
{ "label": "sha:klappy.dev", "duration_ms": 0, "source": "memory" }
```

- `label` — what the span represents. `action:*` for the action handler itself, `sha:*` for repository-SHA resolution, and so on.
- `duration_ms` — wall-clock duration in milliseconds.
- `source` (optional) — present on SHA spans to indicate where the SHA came from (`memory`, `github`, `instance`).
- `detail` (optional) — free-form supplementary string.

### `fetches[]` — every storage read or network call

Each entry is one trip to a storage tier or external URL:

```json
{
  "url": "r2://canon/principles/vodka-architecture.md",
  "duration_ms": 142,
  "cached": true,
  "size": 17217
}
```

| Field | Meaning |
|-------|---------|
| `url` | Where the data came from. The URL prefix carries the tier (see below). |
| `duration_ms` | How long the read took, in milliseconds. |
| `cached` | `true` for cache hits; `false` for misses, cold rebuilds, and live network fetches. This is the primary fact — the URL is the breadcrumb. |
| `status` | HTTP status code, present only on real network fetches (typically GitHub ZIP archives). |
| `size` | Byte length of the response, present when known. |

### `cacheStats` — the arithmetic

```json
{ "hits": 4, "misses": 0, "total": 4 }
```

Derived from `fetches[]` — `total` is the count of fetch records, `hits` is the count where `cached === true`, `misses = total - hits`. The same numbers feed `cache_hits` and `cache_lookups` in the public telemetry dataset, so per-request and fleet-level views agree by construction.

### `total_ms` — wall-clock for the entire request

Time from request entry to response generation, including all spans and fetches.

---

## URL Prefixes — What Each Tier Means

The `url` field uses a stable prefix scheme that identifies the storage tier. Clients can rely on these prefixes to break down per-fetch latency by tier.

| Prefix | Tier | Typical latency | When `cached` |
|--------|------|-----------------|---------------|
| `memory://` | Module-level worker memory cache (5-min TTL) | 0ms | always `true` |
| `cf-cache://` | Cloudflare Cache API (edge cache) | 1–50ms | `true` on hit, `false` on miss |
| `r2://` | R2 durable object storage | 50–250ms | `true` on hit, `false` on miss |
| `build://` | Cold rebuild from a source ZIP | 1500–3000ms | always `false` |
| `https://...` | Real outbound network fetch (typically a GitHub ZIP archive) | 200–1500ms | always `false`; `status` and `size` populated |

A typical warm-cache request hits `memory://` (instant) or `cf-cache://` (a few ms). A cold-cache request can chain through `cf-cache://` miss → `r2://` miss → `https://github.com/...` for the ZIP → `build://` to extract — visible as four sequential fetch records, all `cached: false`.

> The URL is a breadcrumb, not a literal location. `r2://canon/foo.md` describes the path within the R2 bucket; `cf-cache://index/v2.4/abc123` describes the cache-key shape. The point of the scheme is to give every fetch a stable, parseable identifier.

---

## Worked Examples from Production

These are real envelopes captured from `oddkit.klappy.dev` on 2026-04-26 (cleaned of irrelevant fields for clarity).

### Example 1 — Warm-cache search (everything fast)

```json
{
  "action": "search",
  "result": { "hits": [...] },
  "debug": {
    "trace": {
      "spans": [{ "label": "action:search", "duration_ms": 511 }],
      "fetches": [
        { "url": "cf-cache://index/v2.4/...", "duration_ms": 51, "cached": true },
        { "url": "r2://canon/principles/vodka-architecture.md", "duration_ms": 142, "cached": true, "size": 17217 },
        { "url": "r2://docs/appendices/epoch-7-1.md", "duration_ms": 134, "cached": true, "size": 8904 },
        { "url": "r2://canon/principles/maintainability-one-person-indefinitely.md", "duration_ms": 184, "cached": true, "size": 5987 }
      ],
      "cacheStats": { "hits": 4, "misses": 0, "total": 4 },
      "total_ms": 721
    }
  }
}
```

Reading this trace:

- The search loaded a cached BM25 index from `cf-cache://` (51ms).
- It then read three result documents from `r2://`, all warm — total 460ms of R2 latency dominates the request.
- 4 hits, 0 misses. `cacheStats.hits == 4` and `cacheStats.total == 4`, so this request will contribute `cache_hits=4, cache_lookups=4` to the public telemetry.

> If this request were slow, the trace would tell you exactly why: R2 is the dominant cost. Adding a hotter tier in front of R2 (or a Cloudflare Cache layer that holds individual files, not just the index) would address it.

### Example 2 — Cold-cache search (everything slow)

```json
{
  "action": "search",
  "debug": {
    "trace": {
      "spans": [{ "label": "action:search", "duration_ms": 11072 }],
      "fetches": [
        { "url": "cf-cache://index/v2.4/...", "duration_ms": 33, "cached": false },
        { "url": "r2://index/v2.4/...", "duration_ms": 82, "cached": false },
        { "url": "https://github.com/klappy/klappy.dev/archive/main.zip", "duration_ms": 1020, "cached": false, "status": 200, "size": 19271673 },
        { "url": "build://index/v2.4/default", "duration_ms": 2107, "cached": false },
        { "url": "r2://docs/archive/klappy-dev/website-telemetry.md", "duration_ms": 103, "cached": false },
        { "url": "https://github.com/klappy/klappy.dev/archive/main.zip", "duration_ms": 897, "cached": false, "status": 200, "size": 19271673 },
        { "url": "build://docs/archive/klappy-dev/website-telemetry.md", "duration_ms": 2690, "cached": false, "size": 1141 }
      ],
      "cacheStats": { "hits": 0, "misses": 13, "total": 13 }
    }
  }
}
```

(Some fetches truncated for brevity — the full trace had 13 records.)

Reading this trace:

- `cf-cache://` miss, then `r2://` miss for the index. Both fast (33ms, 82ms) — the misses themselves cost almost nothing; it's what they trigger that's expensive.
- A GitHub ZIP fetch (1020ms, 19MB) followed by a `build://` rebuild of the search index (2107ms).
- The same pattern repeats for each result document being read for snippet extraction — three more `build://` rebuilds at ~2 seconds each.
- 0 hits out of 13 fetches. This single request will contribute `cache_hits=0, cache_lookups=13` to the public telemetry.

> A cold-cache search is roughly 15× slower than a warm one. A reasonable client response to seeing this trace would be: trigger a cheap warmup call (like `oddkit_version`) before any latency-sensitive request to a freshly-spawned worker, or accept the cold tax and surface a "first request is slow" hint to the user.

### Example 3 — Pure-CPU action (no storage at all)

```json
{
  "action": "time",
  "debug": {
    "trace": {
      "spans": [{ "label": "action:time", "duration_ms": 0 }],
      "fetches": [],
      "cacheStats": { "hits": 0, "misses": 0, "total": 0 },
      "total_ms": 0
    }
  }
}
```

Reading this trace:

- No fetches at all — `oddkit_time` is pure-CPU.
- `cacheStats.total == 0` — this request will contribute `cache_hits=0, cache_lookups=0` to the public telemetry. Any aggregate query that excludes lookup-zero rows (`WHERE cache_lookups > 0`) will exclude this tool entirely, which is usually what you want for cache-effectiveness analysis.

---

## When to Read the Envelope vs Query Telemetry

| Question | Right surface |
|----------|---------------|
| Why was *this specific call* slow? | `debug.trace.fetches[]` |
| Did *this call* hit a cold worker? | `debug.trace.cacheStats` (`hits == 0 && total > 0`) |
| What URL did the data actually come from? | `debug.trace.fetches[].url` |
| What's the typical hit rate for `oddkit_audit` over the last week? | `telemetry_public` |
| Which tools have the highest fan-out? | `telemetry_public` |
| Has cold-start frequency for `oddkit_search` changed since the last deploy? | `telemetry_public` with a `worker_version` filter |

`debug.trace` is ephemeral, stored only in the response. `telemetry_public` is durable, sampled, and 3-month-retained.

---

## Stability Guarantees

The shape described here reflects oddkit `0.25.0` (the deploy after the [retire-indexsource-interpreter](https://github.com/klappy/oddkit/pull/141) refactor merged on 2026-04-26) and the design pattern adopted from [translation-helps-mcp](https://github.com/klappy/translation-helps-mcp)'s `EdgeXRayTracer`. These are working stability claims, not guarantees:

- **Top-level envelope shape** (`action`, `result`, `assistant_text`, `server_time`, `debug`) has been stable across the E0008 epoch and is intended to remain so. New top-level fields may be added; existing fields are not expected to change shape or be removed without a deprecation window noted in canon.
- **`debug.trace` field set** (`spans[]`, `fetches[]`, `cacheStats`, `total_ms`) is the current shape. The earlier `index_source` field was removed in the refactor cited above, demonstrating that retirements do happen — they are surfaced via canon updates and PR notes, but clients reading any specific field should be prepared for it to evolve.
- **The URL-prefix scheme** (`memory://`, `cf-cache://`, `r2://`, `build://`, `https://`) is the current vocabulary. New prefixes may be added when new tiers are introduced; existing prefixes are not expected to be repurposed.

If your client depends on a specific field shape, pin to a known `worker_version` (visible via the `oddkit_version` tool and in every public-telemetry row) and re-verify when that version changes.

The retired field `debug.trace.index_source` — a single string indicating one "winning" cache tier per request — was removed in the [retire-indexsource-interpreter](https://github.com/klappy/oddkit/pull/141) refactor. Clients that read it should switch to `cacheStats` for arithmetic or `fetches[]` for per-tier detail.

---

## See Also

- [telemetry_public](oddkit://tools/telemetry_public) — Aggregate queries across all requests
- [telemetry_policy](oddkit://tools/telemetry_policy) — What is tracked, what is excluded, and why
- [Telemetry Governance](klappy://canon/constraints/telemetry-governance) — Authoritative governance constraint
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — Why the tracer reports facts and the dashboard does the math
