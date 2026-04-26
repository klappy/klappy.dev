---
uri: klappy://docs/oddkit/specs/oddkit-resolve
title: "oddkit_resolve — Action Specification (DRAFT v4 — KISS)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["spec", "oddkit", "resolve", "supersession", "anti-cache-lying", "vodka", "kiss"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "canon/methods/supersession.md"
  - "canon/principles/partial-data-with-transparency-and-background-warm.md"
  - "odd/constraint/anti-cache-lying.md"
  - "docs/oddkit/IMPL-catalog-recent.md"
governs: "Resolution of klappy:// URIs by every consumer of canon"
supersedes: "DRAFT v3 (2026-04-24, pre-Vodka-cut)"
---

# oddkit_resolve — Action Specification (DRAFT v4 — KISS)

> Take a `klappy://` URI. Return the current canonical answer. Walk supersession transparently. That's the entire job. Everything else was bloat.

## Conviction Shape

- **High conviction**: resolution belongs to the protocol, not consumers; transparent supersession redirect; partial-data compliance is mandatory.
- **Working belief**: returning the supersession chain in metadata so consumers that want it can read it; defaulting to `replace`-style redirect when `superseded_by` is set in frontmatter without further qualification.
- **Tunable**: error-mode names; partial-data threshold defaults.

## What This Does

Input: a `klappy://` URI.
Output: the current canonical doc the URI points to, after walking any `superseded_by` chain in existing frontmatter.

Nothing else. No meaning queries (deferred — see deferred-concerns ledger). No batch action (deferred). No `resolve_links` flag (deferred). No new frontmatter fields (deferred). One thin action over the index oddkit already maintains.

## Why This Is Enough

The failure mode reported was: hardcoded URLs and paths in markdown rot when files move or get superseded. The mechanism that fixes that failure is one capability — convert URI to current location at request time. Every other feature I drafted was building infrastructure for problems we haven't observed yet. Vodka says: don't.

When a consumer hits a real problem the v1 resolver doesn't solve (e.g., needs meaning fallback because authors typo URIs constantly, or needs batch resolution because a build pipeline is making N round-trips and choking), that pain becomes the trigger for adding the next capability — not before.

## The Action

### Input

```json
{ "uri": "klappy://writings/the-most-expensive-problem" }
```

That's it. One field. Required.

### Output

```json
{
  "action": "resolve",
  "result": {
    "status": "FOUND" | "NOT_FOUND" | "PARTIAL_INDEX",
    "resolved": {
      "uri": "klappy://writings/the-most-expensive-problem",
      "path": "writings/the-most-expensive-problem.md",
      "title": "The Most Expensive Problem",
      "url": "/writings/the-most-expensive-problem"
    },
    "supersession_chain": [
      { "uri": "klappy://writings/old-slug", "superseded_at": "2026-04-09" }
    ],
    "index_state": {
      "warm_count": 552,
      "warming_count": 0
    }
  },
  "server_time": "2026-04-26T02:50:00.000Z"
}
```

- `resolved` populated when status is `FOUND` (or `PARTIAL_INDEX` with cache hit). Always the canonical terminus after walking supersession.
- `supersession_chain` populated only when supersession occurred. Ordered oldest → newest. Empty array (or omitted) when the input URI is the terminus.
- `index_state` mandatory per partial-data principle. Concrete numbers, not "data may be incomplete."

### Algorithm

1. Look up `uri` directly in the index.
2. If found and `superseded_by` is unset → `FOUND`, no chain.
3. If found and `superseded_by` is set → walk the chain to terminus, return terminus, populate `supersession_chain`. Transparent redirect.
4. If not found → `NOT_FOUND`. No candidates, no fallback, no fuzziness — that's deferred.
5. If the index is partially warm and the URI isn't in cache → `PARTIAL_INDEX` with `resolved` omitted and `index_state` showing the warming gap. Caller may retry.

### Error modes

| Status | Meaning |
|--------|---------|
| `FOUND` | Single canonical answer, possibly via supersession |
| `NOT_FOUND` | URI doesn't exist in the index |
| `PARTIAL_INDEX` | Index not fully warm; this answer is best-effort |
| `INVALID_INPUT` | Malformed call |
| `CIRCULAR_SUPERSESSION` | Index data error (`superseded_by` cycles) |

## Partial-Data Compliance

Per `klappy://canon/principles/partial-data-with-transparency-and-background-warm`:

1. User-blocking path bounded by cache lookups, not corpus scan.
2. Background warm via `ctx.waitUntil`. Next request reads warm cache.
3. Concrete disclosure via `index_state`.

Non-negotiable. Same shape as the existing `oddkit_search` and `oddkit_catalog` already implement.

## Disconfirmers — What Would Falsify This

1. **A consumer for whom request-time MCP round-trips are unacceptable AND no static-build-time alternative exists.** This was the original reason I drafted `oddkit_resolve_batch`. v1 doesn't ship it; if Lovable or another consumer demonstrates this pain in real use, the deferred batch action graduates from the deferred ledger.
2. **Authors typo URIs at a rate that makes pure URI-resolution insufficient.** Original argument for meaning queries. v1 punts; if the dead-reference CI gate (separate spec) reveals high typo rates, meaning fallback graduates.
3. **The five-response supersession taxonomy proves to need richer treatment than transparent redirect.** v1 treats every `superseded_by` as `replace`. If real cases of `graduate` / `tolerate` / `observe` produce broken behavior in consumers, the per-response field graduates.

The principle survives all three falsifiers. They're triggers for extending the resolver, not retracting it.

## What This Costs Us If We Don't Ship

Every recurrence of the broken-link bug class on every consumer, forever. The reader complaints that started this campaign cannot be answered durably without protocol-level resolution.

## Backward Compatibility

Net-new action. No existing callers. No breaking change.

## Migration

1. Land this spec as committed canon.
2. Implement `oddkit_resolve` per the algorithm above. Promotion gated on independent Sonnet 4.6 validator pass per E0008.3 / `klappy://canon/constraints/release-validation-gate`. Validator verifies: direct hit, supersession chain, NOT_FOUND, partial-index handling.
3. Convert writings: every `[label](/page/...)` and `[label](./relative.md)` becomes a `klappy://` URI. Re-scan against `klappy/klappy.dev@main` `writings/*.md` immediately before opening the cleanup PR.

## Open Questions (Tune During Build)

1. Should the `index_state.stale_threshold_seconds` default come from the existing index infrastructure or be set per-action? Recommendation: read from index infrastructure for consistency with `oddkit_search`.
2. Should `CIRCULAR_SUPERSESSION` halt resolution or fall through to `NOT_FOUND`? Recommendation: halt with the explicit error so the canon bug gets fixed, not papered over.

## See Also

- [Supersession](klappy://canon/methods/supersession) — the chain semantics this resolver follows
- [Partial Data With Transparency And Background Warm](klappy://canon/principles/partial-data-with-transparency-and-background-warm) — partial-data compliance
- [Anti-Cache Lying](klappy://odd/constraint/anti-cache-lying) — the axiom this resolver applies to references
- [Deferred Concerns Ledger](klappy://docs/planning/link-rot-deferred-concerns) — what we cut and when to revisit

## Origin

Drafted on 2026-04-26 in response to recurring broken-link reports on klappy.dev. v1 proposed a CI gate against hardcoded markdown patterns. v2 added a meaning-query primitive, batch action, resolve_links flag, supersession-response field, aliases field, build-time companion, and a four-check audit. v3 incorporated canon-tier-2 challenge findings. **v4 (this revision)** applied the Vodka discipline the operator surfaced — every piece that was building for hypothetical pain got cut. Result is one action with one input, doing one job: convert URI to current location. Everything else moved to the deferred-concerns ledger with explicit revisit conditions.
