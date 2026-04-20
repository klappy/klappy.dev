---
uri: klappy://canon/principles/envelope-time-fields
title: "Envelope Time Fields — Request Time vs Content Provenance"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "envelope", "caching", "content-addressed", "anti-cache-lying", "vodka-architecture", "consistency", "DRY", "observability"]
epoch: E0008.3
date: 2026-04-20
derives_from: "odd/constraint/anti-cache-lying.md, canon/principles/cache-fetches-and-parses.md, canon/principles/consistency-same-pattern-every-time.md, canon/principles/dry-canon-says-it-once.md, docs/oddkit/IMPL-content-addressed-caching.md"
complements: "docs/appendices/epoch-8-2.md, canon/constraints/core-governance-baseline.md"
governs: "Semantics of time fields in the oddkit response envelope and any oddkit-pattern MCP server envelope — what each field means, which MUST be present, and which are forbidden"
status: draft
---

# Envelope Time Fields — Request Time vs Content Provenance

> Every oddkit response carries two kinds of time, and they are not the same. `server_time` is when the response was produced. `debug.generated_at` is when the canon content powering the response was last built. A response served from a content-addressed cache is truthful when `server_time` is current and `generated_at` is stale — both are correct. The anti-cache-lying failure mode is not staleness; it is ambiguity. Two fields under one name, or one field serving two meanings, hides the freshness signal the content-addressed storage design exists to expose.

**Confidence:** working belief, derivable from tier-1 `anti-cache-lying` + the `consistency` and `DRY` tier-2 principles. Ships as tier:2 status:draft with one application in hand; graduates to status:active on third deciding-argument recurrence per the `cache-fetches-and-parses` template.

**Prior art:** HTTP long ago separated `Date` (response time) from `Last-Modified` and `ETag` (resource provenance). This principle is that same division, restated in oddkit envelope vocabulary. The novelty is not the shape; it is the commitment that oddkit-pattern servers will honor the shape consistently across every tool, so the content-addressed provenance story the worker tells internally is visible externally on every response.

---

## Summary — Two Clocks, Two Meanings, One Rule Per Field

The oddkit envelope exposes time in two distinct places because there are two distinct truths a consumer needs to know.

`server_time`, at the envelope root, answers "when was this response produced?" It is always the current wall clock at response time. It proves the system is alive and processing. E0008.2 put this clock in the room to stop models from fabricating timelines from context clues.

`debug.generated_at`, inside the debug object, answers "when was the canon content this response was built from last indexed?" In a content-addressed caching system — the only kind oddkit permits per `odd/constraint/anti-cache-lying` — this timestamp is tied to the commit SHA of the current canon. When the SHA is unchanged, `generated_at` stays pinned to when the index was built, even if that was minutes or hours ago. That is not staleness; it is provenance. The response is as fresh as the canon it is built from.

The two fields are not redundant. `server_time - generated_at` is the content age of the response. In a healthy system, consumers can observe this gap directly and decide whether their workload needs newer canon.

The failure this principle prevents is field-name collision. When two different tools under the same server emit `generated_at` with two different meanings — one the index provenance, the other a synonym for `server_time` — the consumer cannot distinguish them. The content-freshness signal the anti-cache-lying constraint depends on becomes unreliable. The fix is not to eliminate the cache or reduce its staleness; it is to commit to one field, one meaning, across every tool that reads canon.

---

## The Rule

Every oddkit tool that reads canon content MUST populate both fields in every response:

- **`server_time`** at the envelope root — the ISO 8601 timestamp at which the response is produced. Always `new Date().toISOString()` called immediately before serialization. Required by canon (`docs/appendices/epoch-8-2`) and by this principle.
- **`debug.generated_at`** — the `generated_at` field of the content-addressed `BaselineIndex` (or equivalent canon snapshot) the response was built from. When the canon SHA is unchanged across requests, this value MUST be identical across those requests. It is NOT `new Date().toISOString()`.

Tools that do not read canon content (for example, `oddkit_time`, `telemetry_public`, `oddkit_cleanup_storage`) MUST omit `debug.generated_at`. Emitting it with a current wall-clock value in a non-canon-reading tool is the exact ambiguity this principle forbids.

## What `generated_at` Means in a Content-Addressed System

The canon served by oddkit is addressed by commit SHA (`docs/oddkit/IMPL-content-addressed-caching`). Each `BaselineIndex` carries a `generated_at` field set when that SHA was first indexed. Subsequent requests against the same SHA reuse the same index and return the same `generated_at`. When the SHA changes, a new index is built and its `generated_at` is fresh.

This is not a TTL cache. No flush realigns it with truth. No staleness window exists. The cache key is the proof, per `odd/constraint/anti-cache-lying` rule 2. The `generated_at` field is the visible surface of that proof — it lets consumers see which SHA-bound snapshot their response came from, indirectly but truthfully.

Exposing this field in the envelope is what turns content-addressed caching from an invisible implementation detail into an observable property of every response. That observability is what prevents the "nobody noticed for days" failure mode the anti-cache-lying case study documented.

## Why One Name Across Every Tool

Vodka Architecture (`canon/principles/consistency-same-pattern-every-time`) requires that the server behaves identically regardless of which tool is invoked. Envelope field semantics are part of that contract. A field whose meaning shifts between tools forces the consumer to remember which tool they called — the opposite of a server that tastes like nothing.

`canon/principles/dry-canon-says-it-once` reinforces the point from the other side. When a tool's `debug.generated_at` is just a synonym for `server_time`, it is a second source of truth for the same value. The canon says it once: `server_time` for request time, `generated_at` for content provenance, and nowhere else.

## Tools In Scope

Tools that MUST emit both `server_time` and `debug.generated_at`:

- `oddkit_orient`
- `oddkit_search`
- `oddkit_get`
- `oddkit_catalog`
- `oddkit_preflight`
- `oddkit_gate`
- `oddkit_challenge`
- `oddkit_encode`
- `telemetry_policy` (reads canon)

Tools that MUST emit `server_time` only (no `generated_at`):

- `oddkit_time`
- `telemetry_public`
- `oddkit_cleanup_storage`
- `oddkit_version` (the worker version IS the freshness signal for this tool; `generated_at` would be redundant)

## How This Landed — The Triggering Observation

On 2026-04-20, a regression-test sweep of oddkit v0.21.0 found that `oddkit_catalog` reported `debug.generated_at` forty-eight minutes behind the envelope's `server_time`. The initial diagnosis was that the field was "stale" and should be regenerated per request.

Reading canon surfaced the opposite conclusion. `catalog`'s field was truthful — it propagated the content-addressed index's build time, exactly as anti-cache-lying prescribes. The real violation was that every other canon-reading tool set `debug.generated_at` to `new Date().toISOString()` — identical to `server_time` — hiding the content-freshness signal behind a field that nominally carried the same name as `catalog`'s provenance value.

The bug was ambiguity, not staleness. The fix was aligning every tool upward to match `catalog`'s content-addressed semantics, not dragging `catalog` down to the request-time echo the other tools had adopted.

## Alternatives Considered

**Regenerate `debug.generated_at` per request across every tool, including `catalog`.** Considered and rejected. This was the initial diagnosis on 2026-04-20. It aligns the value across tools but does so by dragging `catalog` down to a request-time echo of `server_time`. That restores consistency at the cost of eliminating the content-freshness signal content-addressed caching exists to provide — a direct violation of `odd/constraint/anti-cache-lying` rule 5 ("speed must come from architecture, not from pretending yesterday's answer is today's answer"). Rejected because the cheaper direction would hide the cache-provenance truth rather than expose it.

**Remove `debug.generated_at` entirely; let `server_time` carry the only time.** Considered. Cleanest envelope shape, but erases the content-provenance observability channel. Under content-addressed caching, consumers need a way to detect that their response came from a snapshot taken earlier; deleting the field removes that channel. Rejected because the point of content-addressed caching is observability, not silence.

**Rename only `catalog`'s field (e.g., to `index_built_at`); leave other tools untouched.** Considered. Smaller diff, backwards-compatible with current non-catalog field reads. Rejected as principle-unworthy: a tier-2 canon document should not exist to codify a two-tool disagreement. If the rule is worth naming, it is worth applying uniformly; if it is not worth applying uniformly, it is not principle material.

## Costs and Risks

**Breaking change for consumers reading `debug.generated_at` as request time.** Any downstream script, smoke test, or agent that currently parses `debug.generated_at` on non-catalog tools will receive the index-provenance value going forward rather than a wall-clock timestamp. The request-time value is still available one level up at `server_time` — consumers migrate by reading that field instead. The first application of this principle (oddkit 0.22.0) extends the smoke test to assert both fields are present; external consumers bear the migration cost.

**Observability signal only useful if consumers read it.** If no one ever inspects `server_time − generated_at`, the channel is silent in practice. The principle mitigates this by requiring both fields on every canon-reading response, so the signal is always available when needed, but cannot force inspection.

**Retraction condition.** If a future tool requires a third distinct time field — for example, a workload-specific content timestamp independent of the BaselineIndex — this principle MUST be revisited to name the additional field. The current rule accommodates two clocks only. The retraction is not of the two named fields but of the implicit ceiling.

## Related Canon

- **[Anti-Cache Lying](klappy://odd/constraints/anti-cache-lying)** — the tier-1 constraint this principle serves. Content-addressed provenance is the only caching posture that avoids lying; `generated_at` is how the envelope proves it.
- **[Cache Fetches and Parses](klappy://canon/principles/cache-fetches-and-parses)** — the BaselineIndex is a parse product; its `generated_at` is the correct surface for its provenance.
- **[Consistency — Same Pattern, Every Time](klappy://canon/principles/consistency-same-pattern-every-time)** — field semantics must not vary across tools.
- **[DRY — The Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once)** — two fields with identical values are a second source of truth.
- **[Epoch 8.2 — Put the Clock in the Room](klappy://docs/appendices/epoch-8-2)** — establishes `server_time` as the envelope's request-time clock.

## Graduation Path

This principle ships tier:2 status:draft with a single application in oddkit 0.22.0 (the refactor that motivated it). Candidate principles graduate to tier:2 status:active with three deciding-argument recurrences. Future applications of the two-clock pattern — to TruthKit, to any other oddkit-pattern MCP server, or to a future tool added to oddkit — should cite this principle as the reason rather than reinventing the rule.
