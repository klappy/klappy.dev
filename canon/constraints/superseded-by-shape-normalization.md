---
uri: klappy://canon/constraints/superseded-by-shape-normalization
title: "superseded_by Values: Three Shapes Allowed, One Resolution Algorithm"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["constraint", "supersession", "frontmatter", "resolver", "vodka", "epoch-8"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "canon/methods/supersession.md"
  - "canon/principles/identity-resolved-by-protocol.md"
  - "canon/principles/vodka-architecture.md"
governs: "How tools that read superseded_by frontmatter normalize across authoring conventions"
---

# superseded_by Values: Three Shapes Allowed, One Resolution Algorithm

> Canon authors write `superseded_by` in three different shapes. Tools that read that field MUST normalize across all three; pushing the work to authors is the same anti-pattern this canon was built to solve.

## Summary

The `superseded_by` frontmatter field appears in canon documents in three shapes:

1. **Full canonical URI**: `superseded_by: "klappy://canon/x/y"`
2. **Repo-relative path with `.md`**: `superseded_by: "canon/x/y.md"`
3. **Repo-relative path without `.md`**: `superseded_by: "canon/x/y"`

All three are valid authoring conventions. Tools that resolve supersession (the resolver, the audit, future consumers) normalize across them. The normalization algorithm:

1. Try the value as a direct URI lookup. Hit → done.
2. Try the value as a direct path lookup. Hit → done.
3. If the value lacks `.md` and a path lookup with `.md` appended hits, use that.
4. If the value is not a `klappy://` URI, try `klappy://` + value-with-`.md`-stripped. Hit → done.
5. Miss after all four → treat as dangling reference.

Cycle detection MUST key on the canonical URI of each entry, not on the raw `superseded_by` string. Otherwise a chain that uses URI form in one step and path form in the next will not deduplicate.

## Why Three Shapes Coexist

Canon predates `oddkit_resolve`. Before the resolver shipped, supersession was a metadata convention readers parsed by hand or with ad-hoc scripts; "what shape goes in `superseded_by`" was not enforced and authors converged on whatever they typed first. The shapes accreted naturally; mass-rewriting them all to one shape is busywork that doesn't fix any consumer-visible problem.

The Vodka rule applies: the resolver normalizes; consumers and authors don't. Pushing this work outward repeats the link-rot anti-pattern (delegating identity-vs-location resolution to N consumers).

## When This Matters

Any tool that reads `superseded_by` and acts on its value:

- `oddkit_resolve` — authoritative; v0.25.0 ships the normalization
- `oddkit_audit` — relies on `oddkit_resolve` (or its inlined equivalent) for resolution
- Future tools that traverse supersession chains
- Any external consumer that walks `superseded_by` itself instead of calling the resolver

External consumers that walk `superseded_by` themselves are violating `klappy://canon/principles/identity-resolved-by-protocol`. The fix is to call `oddkit_resolve`, not to add a fourth shape-handler.

## Detection

Surface symptom: a `superseded_by` value pointing at a real successor returns `NOT_FOUND` or a truncated chain. The resolver's `warning` field on the response surfaces "X not in the index" — that warning is a hint that either (a) the resolver's normalization is missing a shape, or (b) the value genuinely points at a phantom.

When in doubt, query the index for the literal `superseded_by` string in both URI form and path form. If either exists, the resolver is missing a normalization; if neither, the canon entry is broken.

## Origin

Surfaced in klappy/oddkit#140 (PR-2.1 of the link-rot-elimination campaign). The initial resolver implementation looked up `superseded_by` strictly as a URI. The independent Sonnet 4.6 validator dispatched per release-validation-gate found that `klappy://docs/oddkit/proactive/dolche-vocabulary` had `superseded_by: "canon/definitions/dolcheo-vocabulary.md"` (path form, with `.md`). The terminus existed in the index as `klappy://canon/definitions/dolcheo-vocabulary` and resolved directly, but the chain walk could not reach it. Validator BLOCKED the PR. Fix landed in v0.25.0 as a normalization helper covering all three shapes.

## What This Demands

For tools that read `superseded_by`: normalize across all three shapes per the algorithm above. Use the canonical URI for cycle detection.

For canon authors: any of the three shapes is acceptable. Write what reads naturally. Don't mass-rewrite for consistency.

For new consumers: don't walk `superseded_by` directly. Call `oddkit_resolve`.

## See Also

- [Identity Is Resolved By The Protocol](klappy://canon/principles/identity-resolved-by-protocol) — the principle this constraint operationalizes
- [Supersession](klappy://canon/methods/supersession) — the metadata model
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — why the resolver carries normalization (thin layer absorbs the work; consumers stay simple)
- [Release Validation Gate](klappy://canon/constraints/release-validation-gate) — the gate that surfaced this
- [oddkit_resolve spec](klappy://docs/oddkit/specs/oddkit-resolve) — the resolver implementation
