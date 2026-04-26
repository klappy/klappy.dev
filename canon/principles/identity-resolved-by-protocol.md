---
uri: klappy://canon/principles/identity-resolved-by-protocol
title: "Identity Is Resolved By The Protocol — Hardcoded References Are A Cached Lie"
audience: canon
exposure: nav
tier: 1
voice: principled
stability: graduating
tags: ["principle", "anti-cache-lying", "antifragile", "references", "vodka", "protocol-layer"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "odd/constraint/anti-cache-lying.md"
  - "canon/methods/supersession.md"
  - "canon/principles/ritual-is-a-smell.md"
governs: "All cross-document identity references in canon and consumers of canon"
complements:
  - "canon/principles/anti-cache-lying.md"
  - "docs/oddkit/specs/oddkit-resolve.md"
---

# Identity Is Resolved By The Protocol — Hardcoded References Are A Cached Lie

> An author writing `[link](/page/some-slug)` is hardcoding a location in source. The location will drift; the source will not. Every consumer that reads this source will encounter a broken reference at some point that depends on which consumer renders it, when, and against which version of the canon. The fix is not better discipline. The fix is moving resolution out of source into the protocol that serves it.

## Summary

Identity references in canon are written as identity, not as location. Resolution to a current location belongs to the protocol that serves the canon — not to the author writing the reference, not to the consumer rendering it. When resolution lives in the protocol, every consumer gets correct, current, supersession-aware references for free. When resolution lives in source (hardcoded URLs, hardcoded paths, hardcoded index tables), every consumer reproduces drift independently.

This is anti-cache-lying applied to references. A hardcoded `/page/some-slug` is a cached projection of "this article currently lives at this URL." A hardcoded `[next article](./relative.md)` is a cached projection of "this file is currently at this relative path." A hardcoded `klappy.dev/writings/foo` link in a chat reply is a cached projection of "this URL is currently the public location." All three are lies the moment the underlying state changes — and the underlying state always changes eventually.

## The Principle

Three load-bearing claims:

1. **References in canon source are identities, not locations.** A `klappy://` URI declares "this is what I'm pointing at" — not "this is where it lives." Locations change; identities don't.
2. **The protocol resolves identity to current location at request time.** Whatever serves the canon (oddkit, in current implementation) takes a URI and returns the canonical current answer, walking supersession chains transparently. Consumers never compute locations from identities themselves.
3. **Consumers receive resolved answers and render them.** They do not maintain private indexes. They do not parse path components. They do not interpret URI structure beyond passing it to the resolver.

When all three hold, references are antifragile to file moves, supersession, renaming, and reorganization. When any one fails, drift returns.

## Why Hardcoded References Are A Smell

Every hardcoded reference is a bet that the location won't change. The bet is always wrong eventually. The cost compounds:

- **For authors**: every move requires a sweep of every consumer to update references. The sweep is never complete.
- **For consumers**: every reader who follows a stale link loses trust. The loss compounds across the corpus.
- **For canon**: supersession metadata exists but cannot help if references don't go through resolution. Authors write `superseded_by` in frontmatter and consumers still hit the dead URL.

The smell is not "links break." That's the symptom. The smell is **state expressed as authored content** — the same anti-pattern as committing a generated file, the same anti-pattern as caching a derived value in source. Anti-cache-lying names this clearly for derived data; this principle extends it to identity references specifically because identity references are the most common, most invisible, most aggressively-rotting case.

## What This Excludes

The principle is about identity references, not all references. It does NOT govern:

- **External URLs** to systems not under canonical governance (third-party docs, Wikipedia, GitHub repos that aren't ours). Those are genuinely locations, not identities. The HTTP layer handles their resolution.
- **Anchors within a document** (`#section-name`). Internal to a document, no protocol round-trip needed.
- **Code paths** in implementation files (`./utils.ts`). Build systems handle these; they're not canon references.

A reference is governed by this principle when it points to another canon document. Then identity-not-location applies.

## How This Manifests

### In writings

Every cross-reference is a `klappy://` URI. The renderer (Lovable, claude.ai, agents, future consumers) calls the resolver to get the current URL. Authors never write `/page/...` paths or `./relative.md` paths.

### In canon docs

Same as writings. Cross-references between canon, docs, and odd documents use `klappy://` URIs. The `derives_from`, `complements`, `supersedes`, and similar frontmatter fields all use `klappy://` URIs.

### In renderers

Consumers walk content for `klappy://` URIs at render time and call the resolver. Static-build consumers without request-time access call a build-time resolver and ship a manifest. Either way, source never contains a resolved URL.

### In agents

When an agent surfaces a reference in a response, it does so via `klappy://` URI, not by guessing or hardcoding a klappy.dev URL. The presence layer (chat client, document renderer) resolves at display time.

## Disconfirmers

Conditions under which this principle would be retracted:

1. **A consumer for whom request-time resolution is unacceptable AND no static-build companion is workable.** Every air-gapped agent, every offline export, every one-shot ingest. If this case becomes load-bearing, the principle weakens to "for first-party request-time-capable consumers."
2. **The resolution layer becomes itself a single point of failure that fails more often than it prevents drift.** If oddkit serves wrong resolutions at higher rate than authors would have introduced drift, the principle is net-negative. (Mitigation: the resolver is well-tested before this principle gets enforced; release-validation-gate exists exactly for this.)
3. **A class of reference emerges that is genuinely a location, not an identity.** Currently every cross-canon reference is plausibly an identity. If a real exception arises, the principle's scope narrows.

The principle survives all three falsifiers as scoping refinements rather than retractions. Real retraction requires the principle producing more drift than it prevents — which would be visible in the dead-reference audit's findings volume over time.

## Relationship to Other Canon

- **Anti-cache-lying** (`klappy://odd/constraint/anti-cache-lying`): this principle is its application to identity references. Anti-cache-lying says "don't store derived state as authored content." This principle says "the location of a reference is derived state; therefore don't author it."
- **Supersession** (`klappy://canon/methods/supersession`): five responses to drift. This principle is what makes the metadata actionable — without resolution-by-protocol, `superseded_by` in frontmatter is a fact nobody acts on.
- **Ritual is a smell** (`klappy://canon/principles/ritual-is-a-smell`): "if correctness depends on remembering a procedure, the system has delegated cognition to the wrong party." Hardcoded references depend on authors remembering to update them on every move. That's ritual. The system should act; the operator reviews.

## Generalizes To

Same architectural answer applies to other surfaces where state is expressed as authored content:

- **README index tables** that list current children of a folder.
- **Frontmatter cross-reference fields** (`complements:`, `related:`, `derives_from:`) that hardcode URIs that should resolve at read time.
- **Glossary entries** that reference defining articles.
- **Navigation menus** that hardcode current canonical paths.

Each of those is a cached projection of state. Each rots independently. The fix is the same — move the projection into the protocol layer. v1 of this principle ships only with link rot fixed via `oddkit_resolve`. The other surfaces become deferred work; when their pain is acute, the principle's prior application gives the architectural answer.

## What This Demands

Of authors: write identity, not location. `klappy://` URIs only.

Of canon governance: ban hardcoded location patterns at lint time (`oddkit_audit` — separate spec) so the principle is mechanically enforced.

Of the protocol (oddkit): provide one canonical resolution surface (`oddkit_resolve` — separate spec). Be partial-data-compliant. Be supersession-aware. Be backward-compatible.

Of consumers: call the resolver. Don't parse URIs. Don't maintain private indexes. Render whatever the resolver returns.

## See Also

- [Anti-Cache Lying](klappy://odd/constraint/anti-cache-lying) — the parent constraint this principle extends
- [Supersession](klappy://canon/methods/supersession) — the metadata this principle activates
- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — why discipline alone isn't enough
- [oddkit_resolve](klappy://docs/oddkit/specs/oddkit-resolve) — the protocol mechanism that implements this principle
- [oddkit_audit](klappy://docs/oddkit/specs/oddkit-audit) — the enforcement mechanism that prevents regression

## Origin

Graduated on 2026-04-26 from recurring broken-link reports on klappy.dev that traced to hardcoded `/page/...` and relative-path patterns in source markdown. The April 9, 2026 reference integrity audit found 85 broken references; a 2026-04-24 scan of `writings/*.md` found 11 more from articles authored just weeks earlier. Discipline alone had failed multiple times across multiple sessions. This principle names the architectural reason — identity is not location, and location is derived state — so future surfaces inherit the same answer rather than re-discovering it through their own incidents.
