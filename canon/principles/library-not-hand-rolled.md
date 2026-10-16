---
uri: klappy://canon/principles/library-not-hand-rolled
title: "Library, Not Hand-Rolled — Major Infrastructure Is Borrowed, and Every Lens Says So Before the First Commit"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: proposed
tags: ["principles", "borrow", "6B", "infrastructure", "frameworks", "lenses", "cross-check", "crew-not-clone"]
date: 2026-10-16
derives_from: "canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/bootstrap/generic-boarding-pass.md (the cross-check runs both directions)"
complements: "klappy/kitchen health-code/mcp-server-build-convention.md § 1, health-code/HYGIENE/cook.md item 11, HYGIENE item 51"
governs: "Any choice of major infrastructure — UI framework, database or storage engine, auth, transport or protocol, build tooling, crypto, scheduler or queue, rendering or PDF, i18n — by any seat, the captain included."
status: proposed
target_repo: "outcomes-driven-development"
---

# Library, Not Hand-Rolled — Major Infrastructure Is Borrowed, and Every Lens Says So Before the First Commit

> The house learned this twice: once when seats hand-rolled MCP servers until `mcp-server-build-convention` § 1 said "library, not hand-rolled", and once on 2026-10-16 when a cook placed the house's Svelte rule at Bide and shipped a vanilla UI. The captain, verbatim: "If I go create a home landing page and choose Adobe Flash because I like it, somebody better fucking stop me! Or at least tell me it's a bad idea. Heck, I want to go build my own database from scratch, tell me the risks and make me think about it. STOP FUCKING HANDROLLING MAJOR SHIT!!!!" — and, on why: "You can build it in beautiful reusable abstractions. But state and memory management and a billion other things are addressed for us in ui frameworks."

## The principle

A hand-rolled, abandoned, or single-maintainer choice for major infrastructure is a **red flag by default from every lens, whoever proposes it, the captain included.** The lens names the risk, the maintenance debt, and the community-maintained alternative, in writing, before the first commit, and the proposer answers before anything is built. The captain may still rule after being told; the rule is that he is told, every time. Silence from a lens on a stack choice is a lens failure.

## Why

The cost of hand-rolled infrastructure is not the first version; it is every patch, every edge case the community already met, and every new seat that has to learn a shape no one else maintains. "A fourth shape is a fourth thing to keep patched." The 6B method already prefers Borrow; this principle removes the escape hatch where a seat — or the operator on a whim — re-derives a choice the field has settled.

## What it binds

- The six-row evaluation: a bound house-stack rule pre-fills Borrow; a contrary verdict is a HOLD quoting the law (constraint amendment, same ruling).
- Every registered lens: one row per decision — LGTM, yellow, red, or outside-boundary — so absence is visible (kitchen HYGIENE item 51).
- The cross-check: it runs against the captain too. "Make me think about it."

## Status

Proposed on the operator's ruling; one instance of adoption (klappy/kitchen, klappy/3d-review-cookbook). Core extraction waits on a second independent adoption (document-routing-tests T3).
