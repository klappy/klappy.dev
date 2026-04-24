---
uri: klappy://canon/principles/partial-data-with-transparency-and-background-warm
title: "Partial Data With Transparency And Background Warm — Never Block The User On A Corpus Scan"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "architecture", "latency", "partial-response", "background-warm", "cache", "user-blocking-path", "vodka-architecture", "axiom-4"]
epoch: E0008.3
date: 2026-04-24
derives_from: "canon/values/axioms.md, canon/principles/vodka-architecture.md, canon/principles/cache-fetches-and-parses.md"
complements: "canon/principles/cache-fetches-and-parses.md, canon/principles/type-contract-plus-adversarial-review.md"
governs: "Any tool handler, MCP server endpoint, or user-facing operation whose natural shape is 'scan a corpus to produce complete data.' Binding on all oddkit-pattern MCP servers in this program when deciding where expensive work runs relative to the user-blocking path."
status: active
---

# Partial Data With Transparency And Background Warm — Never Block The User On A Corpus Scan

> The user-blocking path never pays the full cost of an expensive corpus scan. Return whatever the system has already observed, disclose the missing portion concretely, schedule the remaining work in the background via `ctx.waitUntil`. The next request finds the cache warmed. The contract is explicit: the first response is honest about its incompleteness; the second response is complete. This inverts the common instinct that "scan the full corpus, then respond" is the correct architecture. The correct architecture is "respond now with what is available, warm in the background, honor the user's time as the bottleneck."

---

## Summary — Move The Scan Off The User-Blocking Path, Not To A Different Time

A common failure mode in MCP servers and similar agentic tooling is to move expensive corpus scans from query-time to build-time and declare the latency problem solved. It is not solved. The user still waits on a corpus scan — just on a different execution path. An OOM caused by query-time fan-out, fixed by moving the fan-out to build-time, produces a new gateway-timeout failure mode because the build-time scan is itself blocking on user action that triggered the build. The principle the user is actually feeling is not "the scan takes too long" but "I waited for the scan." Those are different axes.

This principle names the correct architecture: the user-blocking path returns whatever the system has already observed, with concrete disclosure of what is missing, and schedules the remaining work in the background. The disclosure is not a generic "some data may be missing" hedge — it is a structured report of which resources were scanned, which are still warming, and approximately when the caller should retry for completeness. The background work uses `ctx.waitUntil` or equivalent to continue past the response close, populating the per-resource cache entries that the next query will read directly. On the next request — whether from the same user or a different one — the cache is warm and the response is complete with no additional corpus scan.

The architecture has three load-bearing properties. First, the user-blocking path is bounded by the number of cache lookups, not by the cost of scanning the underlying data. Second, the background warm amortizes expense across every future query that touches the warmed resources, not just the query that triggered the warm. Third, the partial response's disclosure is specific enough that the caller can bound retry expectations — "28 of 33 indexed, 5 warming" is actionable; "some data may be incomplete" is not. The principle fails when any of the three properties is missing.

---

## The Three Load-Bearing Properties

**The user-blocking path is bounded by cache lookups.** The first-visit latency floor is the irreducible cost of checking every cache entry the response depends on, not the cost of populating them. In the aquifer-mcp session, the first-visit floor for a cold entity lookup was ~985ms — 33 parallel R2 reads of small blobs, most of them returning null. That is the honest floor at 33-resource scale, and it is visible to the user only because the partial response returns with it. Moving the scan behind the cache lookups is what makes the floor bounded; moving the scan to build-time would have replaced the 985ms cache-miss floor with a 22s corpus-scan floor on the same user-blocking path.

**The background warm amortizes across all future queries touching the warmed resources.** The per-resource cache write is the unit of amortization, not the per-entity cache write. In the aquifer-mcp session, warming the per-resource entity indexes for an Obadiah query made every future entity lookup in those same resources servable complete — the next cold entity (Onesimus) returned 73 matches with `partial=false` because its resources had been warmed by Obadiah's background work. This property fails if the cache granularity is wrong. Per-entity caching would amortize only across repeated queries for the same entity; per-resource caching amortizes across every entity in every query that touches any warmed resource.

**The partial response's disclosure is specific, not hedged.** Concrete disclosure — "0/33 indexed, 33 warming" on first visit, "28/33 indexed, 5 warming" on second visit — gives the caller bounded retry expectations. Generic hedges ("some data may be missing," "partial results") do not. The disclosure should name the unit the caller can reason about (resources, files, partitions) and the count in each state (indexed, warming, missing). In the aquifer-mcp session, the disclosure was the `formatPartialFanOutNote` helper that rendered `{ scanned_resources, total_resources, missing_resources }` into a human-readable sentence in the tool response. The mechanism matters less than the specificity.

---

## The Three Deciding-Argument Recurrences

Graduation test: three decisions where the principle is the load-bearing reason, not three appearances of the pattern. For this principle, the recurrences span implicit prior art and explicit session-level enforcement.

**Recurrence 1 — `refreshAndUpdateCurrentIndex` in aquifer-mcp `src/registry.ts` (implicit prior art).** The composite-SHA-staleness check has used this architecture since early in the project: serve the current index from R2 immediately, kick off `ctx.waitUntil(refreshAndUpdateCurrentIndex())` in the background, the next request finds the refreshed index. The decision was made before the principle was named; the principle was the load-bearing reason for the decision regardless. Implicit recurrence; the pattern was the reason without being labeled.

**Recurrence 2 — H11b architecture rejection and redesign (aquifer-mcp PR #20, J-005 explicit).** The orchestrator had just shipped H11, which moved the entity-index corpus scan from query-time to build-time. Post-merge probe revealed H11 had fixed the OOM but left a user-blocking gateway timeout in place on cold cache — `entity:Obadiah` returned HTTP 502 at 11.2s because the build-time scan was itself still on a user-triggered execution path. The operator named this principle verbatim as the reason to reject H11's framing and pivot to H11b: *"It's a principle of partial data with transparency to come back for more. Background fetch will warm the cache before you come back."* The load-bearing decision was not "move the scan somewhere else"; it was "remove the user-blocking property from every path where the scan can run." H11b implemented the principle by adding `FanOutEntityResult`, emitting `formatPartialFanOutNote`, and scheduling `warmEntityIndexesForResources` via `ctx.waitUntil`. The principle was the reason; H11b was the implementation.

**Recurrence 3 — H11b live validation (J-006 explicit, operator-reframe-to-manual-enforcement).** The operator's reframe from "the prior Claude's graduation count was too narrow" to "there were principles enforced manually that are worth promoting to governance" is itself a deciding-argument recurrence of this principle at the meta-level. The reframe directly named what had been manually enforced across PRs #17, #18, #19, and #20 — an architecture in which the user-blocking path never paid the full scan cost, with the disclosure + background-warm pattern applied consistently. The decision the reframe drove was canon promotion: treating the manual enforcement across four PRs as graduation-worthy rather than requiring one more unrelated session's recurrence. The principle was the load-bearing reason for the decision to graduate now rather than defer.

The live-validation probe at 2026-04-24T02:43Z produced the empirical evidence the principle describes: first visit 985ms with `"0/33 indexed, 33 warming"`, second visit 20s later with `"28/33 indexed, 5 warming"` showing the background warm had populated 28 of 33 per-resource entity indexes during the interval. The architecture worked exactly as the principle named it.

---

## Where This Principle Bites Hardest

**The instinct that "complete data is always better than partial data."** This instinct is correct in the abstract and wrong in the context of a user-blocking path. Complete data that arrives after a timeout is worse than partial data that arrives in 985ms with an honest disclosure. The principle requires the orchestrator to accept that partial + transparent + warming beats complete-but-blocking, and to resist the architectural temptation to "just make the corpus scan faster."

**Cache granularity choices that undercut amortization.** A cache keyed at per-entity granularity amortizes only across repeated queries for the same entity. A cache keyed at per-resource granularity amortizes across every entity in every query that touches any warmed resource. The choice is not incidental — it is the difference between a background warm that helps only the user who triggered it and a background warm that helps every future user. Get the cache key shape right; the amortization property depends on it.

**Disclosures that hedge instead of specify.** "Some data may be incomplete" gives the caller no information to act on. "28/33 indexed, 5 warming, retry in ~N seconds" does. The principle fails when the disclosure is written as a liability disclaimer rather than as a structured report. Name the unit, name the counts, name the expected retry window. If the expected retry window cannot be estimated, say so explicitly — "5 resources still warming, retry duration varies by resource size" is better than a hedge.

**Build-time vs runtime ambiguity on "what triggered the scan."** A scan that runs at build-time is still user-blocking if the build is triggered by user action (a deploy, an index rebuild, a new SHA). The principle is not "move the scan to build-time"; it is "remove the user-blocking property from whatever path the scan runs on." Build-time scans should themselves be partial + transparent + warming if the build is user-visible, or relegated to genuinely asynchronous paths (cron, queue workers) if they must be complete.

---

## What This Principle Does NOT Say

**It does not say caching is unnecessary.** Per `klappy://canon/principles/cache-fetches-and-parses`, caching fetches and parse products is the right architecture. This principle governs *when* the cache gets populated, not *whether* it gets populated. The per-resource cache entries in the aquifer-mcp session are the parse products; caching them is correct. The principle ensures the cache's population trigger is not on the user-blocking path.

**It does not say partial responses are always appropriate.** Operations whose correctness requires complete data (financial reconciliation, security audits, any operation with strong consistency requirements) cannot ship partial. The principle applies where partial + transparent is *acceptable to the caller* — which is usually true for search, retrieval, and summarization operations, and usually false for write operations and transactional reads.

**It does not say `ctx.waitUntil` is the only mechanism.** Cloudflare Workers uses `ctx.waitUntil`; other runtimes use different primitives (async task queues, background workers, durable objects, fire-and-forget RPC). The principle is agnostic to mechanism; it requires only that the background work continues past the response close and writes to a cache the next request will read.

**It does not say the first-visit floor is acceptable at any scale.** At 33-resource scale, a 985ms floor is honest. At 330-resource scale, the same architecture would produce a ~3s floor, which approaches client-side timeout tolerances. The principle requires monitoring: if future corpus growth pushes the fan-out floor past the caller's patience, the partial-response path will start producing gateway timeouts despite clean server success. The fix at that point is shape, not hack — likely a tiered cache where the per-resource indexes are themselves summarized into a global index cached at request-time.

---

## Related Canon

- **[Foundational Axioms](klappy://canon/values/axioms)** — Axiom 4 ("You Cannot Verify What You Did Not Observe") is the axiomatic grounding. The user gets what the system has actually observed, not what the system hopes to produce if it keeps working. Partial responses with honest disclosure serve Axiom 4 directly; complete-but-blocking responses violate it when the "complete" arrives after the caller has timed out.
- **[Vodka Architecture](klappy://canon/principles/vodka-architecture)** — the server stays thin by doing as little as possible on the user-blocking path. This principle is the specific application to corpus-scan operations: the server's user-blocking contribution is cache lookups and background scheduling, nothing more.
- **[Cache Fetches And Parses](klappy://canon/principles/cache-fetches-and-parses)** — the sibling principle that governs *what* to cache. This principle governs *when* to populate the cache. The two are complementary.
- **[Type Contract Plus Adversarial Review](klappy://canon/principles/type-contract-plus-adversarial-review)** — the principle graduated alongside this one. That principle governs how to type the partial-data return so callers cannot silently mistake partial for complete. Together they are the full architecture: type the partiality honestly, populate the cache off the user-blocking path.

---

## See Also — The Three Deciding-Argument Recurrences

- `klappy://odd/ledger/2026-04-24-aquifer-session-principles-graduated` — the session ledger documenting all three recurrences.
- `klappy/aquifer-mcp` `src/registry.ts` `refreshAndUpdateCurrentIndex` — Recurrence 1, implicit prior art.
- PR klappy/aquifer-mcp#20 — Recurrence 2, H11b architecture with `FanOutEntityResult`, `formatPartialFanOutNote`, and `warmEntityIndexesForResources` via `ctx.waitUntil`.
- The operator-reframe conversation that produced this canon promotion — Recurrence 3, meta-level deciding argument for graduation.
