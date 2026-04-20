---
uri: klappy://canon/principles/cache-fetches-and-parses
title: "Cache Fetches and Parses — Not Microsecond Derivations"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "caching", "performance", "vodka-architecture", "governance", "bm25", "microsecond-derivation", "plumbing-tax"]
epoch: E0008.3
date: 2026-04-20
derives_from: "canon/principles/vodka-architecture.md, canon/principles/dry-canon-says-it-once.md, canon/constraints/core-governance-baseline.md, odd/ledger/2026-04-20-p1-3-2-gate-canary-landed.md, odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed.md"
complements: "canon/constraints/oddkit-prompt-pattern.md, canon/principles/ritual-is-a-smell.md"
governs: "All caching decisions in oddkit and any oddkit-pattern MCP server — which derived values get cached, which get rebuilt per request"
status: active
---

# Cache Fetches and Parses — Not Microsecond Derivations

> Cache the expensive work — fetching markdown over the network, parsing tables into structured data, stemming vocabularies into token sets. Don't cache microsecond derivations — rebuilding a BM25 index over an already-cached parse product is cheaper than the plumbing required to cache it safely. The plumbing tax (cache fields, URL-keyed invalidation, cleanup_storage wiring, drift risk when source data changes) compounds invisibly. Rebuild per request sidesteps all four. This is not a performance optimization — it is a plumbing minimization, which is the cheapest path to both correctness and performance at oddkit's current corpus sizes.

---

## Summary — The Principle Has Two Halves

A cache is a promise that two things stay equal: the cached value, and whatever the cached value is derived from. Every cache adds a maintenance burden — an invariant to preserve, an invalidation path to get right, a cleanup hook to remember. The question is not whether a cache is *faster*; the question is whether the speedup exceeds the cost of keeping the promise.

This principle draws a line. **Fetches and parses get cached** — they are expensive, they involve I/O or meaningful CPU work, and the cost of running them per-request is real. **Microsecond derivations do not get cached** — rebuilding them inline is cheaper than the plumbing required to cache them safely, and skipping the cache removes four hidden costs that compound as tool count grows.

The line sits at a specific threshold anchored in oddkit's current corpus sizes: 6–9 challenge types, 4 gate transitions, 8 base prerequisites. At these sizes, building a BM25 index over a cached parse product takes single-digit microseconds; caching it saves nothing and costs plumbing. If a future tool's governance corpus grows past ~50 entries, revisit — the threshold may shift.

This is a direct extension of vodka architecture: the server stays thin by caching only what genuinely needs caching, and the canon stays authoritative because the cached values trace back to parsed canon content without additional derived state to keep synchronized.

---

## What Counts As A Parse Product — Cache It

A **parse product** is a structured value derived from a canon document by work that would be wasteful to repeat on every request. Four attestation points across the current tool sweep:

**Encoding types parse caching (0.18.0, encode).** `cachedEncodingTypes` holds the parsed `EncodingTypeDef[]` from walking 10+ encoding-type canon docs, extracting frontmatter, regex-matching `## Quality Criteria` tables, and parsing each row. Building this list per request would repeat markdown parsing for every encode call. Cached by `knowledgeBaseUrl` — invalidates cleanly when canon source changes.

**Base prerequisites parse caching (0.19.0, challenge).** `cachedBasePrerequisites` holds the parsed `BasePrerequisite[]` from reading `odd/challenge/base-prerequisites.md`, matching the `## Prerequisite Overlays` table, and extracting rows. Similar I/O + regex work that would be pure waste to repeat.

**Gate stemmedTokens precompute (0.20.0, gate).** `GatePrerequisite.stemmedTokens: Set<string>` is populated at parse time in `fetchGatePrerequisites` by calling `tokenize(check)` on the vocabulary column. The stem Set is a parse product — it's the parsed form of the canon's vocabulary, ready for runtime use.

**Challenge stemmedTokens precompute (0.21.0, challenge).** Same pattern extended to `BasePrerequisite.stemmedTokens` and to the inline type on `ChallengeTypeDef.prerequisiteOverlays[].stemmedTokens`. Each check column's quoted keywords are extracted and stemmed at canon-fetch time; the resulting Set plus four structural-test boolean flags are cached as parse products alongside the rest of the prereq struct.

What unites these: each is a structured value that took real work to produce (I/O, regex matching, tokenization). The cached form is exactly the form the runtime needs. Cache hit = zero additional work.

---

## What Counts As A Microsecond Derivation — Don't Cache It

A **microsecond derivation** is a value that can be rebuilt from an already-cached parse product in single-digit microseconds. Two attestation points:

**Gate BM25 transition index (0.20.0, gate, D9).** Gate's 4-transition corpus is rebuilt inline per request: `buildBM25Index(bm25Docs, vocab.stopWords)` in `runGateAction`. Previously the plan was to mirror encode's and challenge's cache-this-too pattern; the operator rejected with the direct argument: *storing indexes for dynamic parsing is worthless and bad ROI*. The parsed `GateTransition[]` and `GatePrerequisite[]` are cached (parse products). The BM25 index over them is not (microsecond derivation).

**Challenge BM25 type index (0.21.0, challenge, third recurrence).** `cachedChallengeTypeIndex` was the same anti-pattern: lazy-built on first request, reused thereafter, with URL-keyed invalidation and a cleanup_storage reset. The 6–9-type corpus rebuilds in single-digit microseconds from the cached `cachedChallengeTypes`. Removed; inline build at the call site now mirrors gate.

What unites these: each is a reshape of an already-cached parse product. Building it is cheap. Caching it adds plumbing without speedup.

Other microsecond derivations to watch for as tools grow: regex compilation from literal string lists (if the input list is already parsed), Set rebuilds from cached arrays, Map construction from cached entries. If the derivation source is already in memory and the derivation is pure and fast, caching it is a plumbing tax, not a speedup.

---

## The Plumbing Tax — Four Hidden Costs

Every module-level cache of a microsecond derivation pays four costs that rebuilding inline avoids:

**Module-level state.** A `let cachedFoo: Foo | null = null` declaration plus a `cachedFooKnowledgeBaseUrl: string | undefined` companion. Two new mutable globals per cache. The server gains statefulness it could have avoided.

**URL-keyed invalidation.** The cache must key on `knowledgeBaseUrl` so overrides don't read stale data. Every consumer site must remember to pass the URL. Every cache-check branch must test equality and invalidate on mismatch. Miss one consumer, get stale data. Miss one equality check, get subtle override bugs.

**cleanup_storage wiring.** The `oddkit_cleanup_storage` action must reset the cache to `null` alongside every other cache. Forget the reset, leak memory across cleanup calls. Add a new cache, forget to add its reset entry, create an invisible divergence between `cleanup_storage`'s contract ("all caches cleared") and its behavior.

**Drift risk when source data changes.** If the parse product is updated (e.g., during live canon-refresh work, or at test boundaries), the derived cache must also be invalidated. Every derivation chain must be walked to find every downstream cache. Miss one, ship with data from two different canon states simultaneously.

Rebuild per request sidesteps all four. The server has fewer mutable globals, no invalidation logic to reason about, no cleanup wiring to remember, and no cross-cache drift surface. The cost is a few microseconds per request. The savings are in the reduction of plumbing-induced bug classes, not in wall-clock speed.

---

## The Graduation — Third Deciding-Argument Recurrence

Candidate canon principles graduate to canon when they have three deciding-argument recurrences — decisions where the principle is the load-bearing reason, not a summary of prior choices. For this principle:

1. **Implicit (P1.3.1, 0.19.0).** Challenge's `cachedBasePrerequisites` was cached because parsing markdown tables is expensive work. The caching decision was natural; the principle was not yet named.

2. **Explicit (P1.3.2, 0.20.0).** Gate's D9 decision rejected the mirror-cache-this-too pattern for the BM25 transition index. The operator named the argument directly: *"storing indexes for dynamic parsing is worthless and bad ROI."* This was the first time the principle was the load-bearing reason for a decision, not a summary of prior choices.

3. **Explicit (P1.3.3, 0.21.0).** Challenge's `cachedChallengeTypeIndex` removal applied D9 to a second tool, producing the second explicit application of the principle as deciding argument. The recurrence test is satisfied. Principle graduates.

The graduation test is not "three times the pattern appeared." It is "three times the pattern was the *reason* for a decision." Appearances are evidence; decisions are graduation.

---

## Trade-off — When Does The Threshold Shift?

This principle is a rule-of-thumb, not a physical law. The threshold between "cache it" and "rebuild it inline" depends on corpus size: at small sizes, rebuild cost is negligible and plumbing tax dominates; at large sizes, rebuild cost becomes real and caching starts paying for itself.

**Current anchoring (2026-04):** challenge has 6–9 types, gate has 4 transitions, challenge's base prereqs has 8 entries. At these sizes, single BM25 build is well under 1ms (typically 10–100μs depending on per-doc text length). The plumbing tax (four costs above) clearly dominates.

**Out-of-scope counter-example:** the global `cachedBM25Index` over 524+ canon documents is cached, and reasonably so — building a BM25 index over 524 documents is non-trivial work (tens of milliseconds at least). This sits on the other side of the threshold. If any tool's governance corpus grows past approximately 50 entries, the caching decision should be revisited for that tool specifically.

**The general rule:** if the rebuild takes single-digit microseconds, don't cache it. If it takes milliseconds, consider caching but measure the plumbing cost against the speedup. If it takes tens of milliseconds or more, cache it and accept the plumbing. Size matters; symmetry across tools does not.

---

## Related Principles

- **[Vodka Architecture](klappy://canon/principles/vodka-architecture)** — the server stays thin. Caches that don't earn their keep are weight the glass didn't need.
- **[DRY — The Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once)** — derived caches are a second source of truth for the same data. The more derivations cached, the more places the canon-vs-cache drift can happen.
- **[Prompt Over Code](klappy://canon/principles/prompt-over-code)** — governance is fetched at runtime. Cached parse products of that governance preserve the canon-as-source semantics; cached microsecond derivations add a server-side layer that doesn't serve the governance.
- **[Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell)** — if correctness depends on remembering to update the cleanup_storage hook every time a new cache is added, the design is compensating. Fewer caches, less ritual.

## See Also — The Three Deciding-Argument Recurrences

- `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed` — 0.19.0 base-prereq parse caching (implicit recurrence).
- `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed` — 0.20.0 gate D9 (first explicit recurrence; principle named as deciding argument).
- `klappy://odd/ledger/2026-04-21-p1-3-3-challenge-canon-parity-landed` (pending) — 0.21.0 challenge `cachedChallengeTypeIndex` removal (second explicit recurrence; graduation test satisfied).
