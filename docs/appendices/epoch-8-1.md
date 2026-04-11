---
uri: klappy://docs/appendices/epoch-8-1
title: "Epoch 8.1 — X-Ray Tracing and Infrastructure Optimization"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "observability", "tracing", "performance", "cache-api", "vodka-architecture", "maintainability", "epoch-8", "epoch-8.1", "cross-project-learning"]
epoch: E0008.1
date: 2026-04-11
forcing_fault: "E0008 added duration_ms to every telemetry data point but provided no way to see what was inside that duration. 500–900ms outliers appeared in production with no explanation — the system could observe that a request was slow but not why."
new_invariant: "Same as E0008: the maintainer can see the shape of what's happening. E0008.1 extends 'shape' from usage patterns to infrastructure performance — which storage tier served each request, where time actually goes, and whether caching is working."
core_shift: "Opaque duration → x-ray traced storage tiers. KV on hot path → module memory + Cache API (cross-project learning from aquifer-mcp). Two observability systems → one writeDataPoint with one additional blob."
derives_from: "docs/appendices/epoch-8.md"
cross_project_learning: "aquifer-mcp L44 (subrequest count is the primary performance lever), L47 (removing one KV read = 15x speedup), L48 (module-level memory = 0ms reads)"
documents_introduced: ["docs/appendices/epoch-8-1.md"]
---

# Epoch 8.1 — X-Ray Tracing and Infrastructure Optimization

> E0008 gave oddkit eyes on its usage — who calls, which tools, how often. E0008.1 gives oddkit eyes on its own plumbing — which storage tier served each request, where milliseconds actually go, and whether the caching architecture is healthy. The insight came from a sibling project: aquifer-mcp discovered that each Cloudflare KV subrequest costs 300–1,000ms in envoy routing overhead, invisible to application-level timing. Applying that learning to oddkit — eliminating KV from the hot path, adding module-level memory caching, and folding trace data into the existing telemetry data point — is E0008.1.

---

## Summary — One Blob, Not Two Systems

E0008 wrote one `writeDataPoint` per MCP message with 8 structural dimensions and 2 numeric values. E0008.1 adds one dimension: `cache_tier` (blob9) — which storage tier served the navigability index for this request (`memory`, `cache`, `r2`, or `build`).

That single blob answers:
- What percentage of requests hit module memory? (cache health)
- How often do cold builds happen? (deploy/eviction signal)
- What's the real latency per tier? (`GROUP BY cache_tier, AVG(duration)`)
- Is the 5-minute TTL working? (memory hit rate over time)

Per-request diagnostic detail — every storage read, GitHub API call, and cache tier hit/miss with timing — flows to the `X-Oddkit-Trace` response header and the `debug.trace` field in tool responses. This is ephemeral: it exists in the HTTP response and nowhere else. It is not written to Analytics Engine, not persisted, and not queryable after the request completes.

One system with two views. Not two parallel observability systems.

---

## The Forcing Fault — Opaque Duration

E0008 tracked `duration_ms` for every request. Production data showed 500–900ms outliers alongside 60–120ms typical calls — a 10x variance with no explanation. The trace data from E0008.1 reveals why: cold isolates hit KV for the index (300–1,000ms envoy overhead), warm isolates serve from module memory (0ms). The outliers were KV subrequests, not slow tool logic.

Without x-ray tracing, the maintainer could see *that* a request was slow but not *why*. With it, the answer is in every response header.

---

## Cross-Project Learning — From aquifer-mcp to oddkit

aquifer-mcp is a sibling Cloudflare Worker MCP server for Bible Aquifer resources. During its v1.0–v1.5 optimization arc, the following learnings emerged:

**L44: Minimizing subrequest count is the primary performance lever for Cloudflare Workers.** Each subrequest adds 300–1,000ms of infrastructure overhead that cannot be optimized from inside the Worker.

**L47: Eliminating one KV subrequest from the hot path delivered a 15x speedup** (list: 1,800ms → 120ms). The KV read itself showed 3–105ms in Worker-internal timing, but its true cost was ~500–1,000ms in Cloudflare envoy infrastructure overhead.

**L48: Module-level memory caching delivers 0ms index reads** for all requests within the same isolate. Combined with a well-known R2 key, the hot path goes from 2 subrequests to 0 on memory hit.

**L49: The entire v1.3–v1.5 investigation was necessary to isolate the root cause.** Each failed hypothesis (SSE transport, SDK version, background refresh) eliminated a variable. The final fix was simple but could only be identified after ruling out every other layer.

These learnings are encoded in aquifer-mcp's project journal (`odd/ledger/journal.md`) with full evidence chains. Applying them to oddkit is a transfer of proven knowledge, not speculation.

---

## What E0008.1 Introduces

### X-Ray Request Tracing

A `RequestTracer` class records every I/O operation with timing and source tier. Created per-request, threaded through `ZipBaselineFetcher` and `handleUnifiedAction`. The tracer's `indexSource` accessor extracts the single summary value that feeds telemetry blob9.

### Module-Level Caching (Three-Tier Hot Path)

Deserialized `BaselineIndex`, resolved commit SHAs, and recently-accessed file content cached at the module level with a 5-minute TTL. On warm isolates, subsequent requests serve from memory without any subrequests.

**Module Memory (0ms)** → **Cache API (~1ms)** → **R2 (durable)** → **Build from ZIP (cold start)**

### KV Eliminated from Hot Path

`BASELINE_CACHE` KV namespace removed from the index resolution and file retrieval paths. KV is retained in `wrangler.toml` for backward compatibility but no longer read during `getIndex` or `getFile`. R2 and Cache API handle all durable caching. Content-addressed correctness (SHA-keyed storage) preserved on all durable tiers.

### Bounded Staleness Window

The module-level memory cache introduces a maximum 5-minute staleness window. This is a conscious tradeoff, distinct from the February 2026 stale cache incident in every dimension:

- **Staleness bound:** 5 minutes (vs unbounded days in the incident)
- **Correctness layer:** SHA-keyed durable storage preserved (vs none in the incident)
- **Observability:** `cache_tier` telemetry dimension + `X-Oddkit-Trace` header (vs silent lies in the incident)
- **Detection:** Queryable via `SELECT cache_tier, COUNT() GROUP BY cache_tier` (vs impossible in the incident)

### Telemetry Integration

`cache_tier` added as blob9 in the existing `writeDataPoint` call. No new Analytics Engine binding. No new data point. The governance update is in `canon/constraints/telemetry-governance.md` (living policy document).

---

## Why E0008.1 and Not E0009

No new assumption about reality is introduced. E0008.1 extends E0008's observability invariant from "shape of usage" (who, what, when) to "shape of infrastructure performance" (which tier, how fast, why slow). Same invariant, broader application — the E0005.1 and E0007.1 pattern.

E0008 explicitly scoped x-ray tracing as future work under the epoch theme. E0008.1 delivers that work plus an architectural optimization (KV elimination) that emerged from cross-project learning E0008 did not anticipate.

---

## What E0008.1 Does Not Change

- **E0008 artifacts remain valid.** The telemetry schema gains one blob; existing blobs 1–8 and doubles 1–2 are unchanged.
- **The four axioms carry forward unchanged.**
- **Vodka Architecture is not violated.** The `RequestTracer` is 95 lines. Module-level caches are ~15 lines of declarations. The three-question test passes.
- **Content-addressed caching correctness is preserved.** SHA keys on R2 and Cache API. The module-level memory cache is a performance layer above the storage layer, not a replacement for it.
- **The telemetry social contract is unchanged.** No new content is tracked. `cache_tier` is a structural identifier (infrastructure metadata), not user content.

---

## Compatibility

- E0008 artifacts remain valid. E0008.1 does not modify telemetry tools, governance, or the Analytics Engine schema beyond adding blob9.
- E0007.1 artifacts remain valid. Proactive posture, Vodka Architecture, and all principles unchanged.
- E0008.1 is the current epoch.
