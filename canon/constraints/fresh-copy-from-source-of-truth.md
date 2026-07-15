---
uri: klappy://canon/constraints/fresh-copy-from-source-of-truth
title: "Fresh Copy From the Source of Truth — Default to Live, Treat Stale as the Rare Exception"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraint", "source-of-truth", "fresh-copy", "clone-from-source", "fetch-live", "staleness", "cache", "flight-deck", "verification", "e0010"]
epoch: E0010
date: 2026-07-15
derives_from: "canon/bootstrap/boarding-pass.md, canon/bootstrap/flight-deck-model.md, canon/principles/verification-requires-fresh-context.md, canon/values/axioms.md"
complements: "canon/constraints/no-durable-reliance-on-model-memory.md, canon/bootstrap/model-operating-contract.md, canon/constraints/verification-and-evidence.md"
governs: "Every acquisition of a working copy of any artifact that has an authoritative upstream — code repos, canon reads, and any document, dataset, or config with a source of truth"
status: active
target_repo: "outcomes-driven-development"
---

# Fresh Copy From the Source of Truth — Default to Live, Treat Stale as the Rare Exception

> Captain's ruling, 2026-07-15: "It should be an extremely rare exception to ever not get a fresh copy from the source." For ALL work — not just repositories — the default is a FRESH copy fetched from the source of truth at the moment of use: clone from GitHub, fetch live via oddkit, pull the authoritative upstream. Operating on a stale local checkout or a cached copy is the smell, not the shortcut. It is permitted ONLY as a named, rare exception with a stated reason, never as the silent default. A stale copy is the same class of failure the flight deck exists to prevent — recall standing in for retrieval — moved from the model's memory to the filesystem.

## Description

Every artifact that has an authoritative upstream has a live edge, and the live edge is the truth. A local checkout, a cached read, a copy someone handed over "to save a step" — each is a snapshot of the truth at some past moment, and the gap between the snapshot and the edge is invisible until it bites. The captain's ruling makes the default explicit: get the fresh copy from the source, and if you are about to operate on something older, that is a decision you must name and justify, not a convenience you may take in silence.

This is the filesystem sibling of the flight deck's rule that the manual is *opened, not remembered*. `canon/bootstrap/flight-deck-model` governs the model side: canon is fetched at the moment of use because access is not enforcement. `canon/bootstrap/boarding-pass` names the same reflex — board first, fetch governance live. `canon/principles/verification-requires-fresh-context` establishes that a fresh acquisition, not a carried-over one, is what makes verification trustworthy. This constraint carries that discipline to *every* working copy: a stale local repo is to code what recited governance is to canon — a plausible substitute for the truth that drifts the moment the edge moves.

The rule is one line: fetch fresh from the source by default; treat any stale or cached copy as a named exception.

## Operating Constraints

- MUST acquire a fresh copy from the source of truth by default for any artifact with an authoritative upstream.
- MUST, for code flights, clone from the canonical remote (e.g., GitHub) — never ask the captain for, nor operate on, a local machine path or pre-existing working directory as the default source.
- MUST fetch canon reads live via oddkit at the moment of use rather than relying on a cached or previously retrieved copy.
- MUST name any use of a stale, local, or cached copy as an explicit exception with a stated reason — the exception is rare and visible, never silent.
- MUST NOT let a snapshot stand in for the source when the source is reachable; unreachability is itself a stated condition, not a license to guess.

## Defaults

- Prefer `git clone` from the canonical remote over reusing an existing local checkout, even when a local one appears to be present.
- Prefer a live `oddkit_get` / `oddkit_search` over reasoning from a copy fetched earlier in the session, when the content is load-bearing.
- Prefer stating "source unreachable, proceeding on the last copy because X" over silently continuing on stale data.
- When an exception is genuinely warranted (source down, provably-safe cache, offline constraint), name it, state the reason, and note the staleness risk carried.

## Failure Modes

- **Silent Stale Checkout**: operating on a pre-existing local repo or directory without cloning fresh, so upstream changes are invisible.
- **Local-Path Handoff**: asking the captain for, or accepting, a path on his machine as the source instead of cloning from the canonical remote.
- **Recited Canon**: reasoning from canon recalled or fetched-long-ago instead of fetched live at the moment of use.
- **Unnamed Cache Reliance**: using a cached copy as the default with no statement that it is a cache or why the fresh fetch was skipped.
- **Drift-On-Read**: acting on a snapshot after the edge has moved, discovering the divergence only when the work fails to apply.

## Verification

- Every code flight begins with a fresh clone from the canonical remote, not a reused local path.
- Load-bearing canon is fetched live at the moment of use, not carried from an earlier point.
- Any use of a stale, local, or cached copy is named as an exception with a stated reason in the same hand-off.
- When the source is unreachable, that condition and its consequence for staleness are stated explicitly.

## What This Does Not Claim

This is a constraint about sources of TRUTH, not a ban on caching.

- It does NOT prohibit caching for performance where staleness is provably safe. A build cache, a memoized read, a CDN edge whose invalidation is understood — these are legitimate when the safety of the staleness is established, not assumed.
- It does NOT require re-fetching within a single locked execution pass where the source cannot have changed and the copy was itself freshly acquired at pass entry.
- It does NOT extend to artifacts with no authoritative upstream; a scratch file the flight itself produced is its own source.
- It does NOT invent new law. It carries the flight deck's fetch-live reflex and the boarding pass's board-first reflex onto the filesystem; where this doc and a parent differ, the parent governs its own domain and this constraint yields.

## Why This Is Necessary

The whole system's continuity depends on the truth living at a reachable edge and being fetched there, not carried in a copy that silently ages. The flight deck established this for the model's recall of governance; the captain's ruling extends it to every working copy, because a stale local repo produces the same failure by a different route — plausible, confident work built on a past state of the world. Making the fresh fetch the default, and the stale copy a named exception, keeps the gap between snapshot and source visible instead of latent.

## See Also

- [The Boarding Pass](/canon/bootstrap/boarding-pass.md) — board first, fetch governance live at the moment of use
- [The Flight Deck Model](/canon/bootstrap/flight-deck-model.md) — the manual is opened, not remembered; access is not enforcement
- [Verification Requires Fresh Context](/canon/principles/verification-requires-fresh-context.md) — fresh acquisition is what makes verification trustworthy
- [No Durable Reliance on Model Memory](/canon/constraints/no-durable-reliance-on-model-memory.md) — the memory-side sibling of this filesystem-side rule
- [Verification and Evidence](/canon/constraints/verification-and-evidence.md)
- [Constraints](/canon/constraints/README.md)
