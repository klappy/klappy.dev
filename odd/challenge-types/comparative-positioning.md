---
uri: klappy://odd/challenge-types/comparative-positioning
title: "Challenge Type: Comparative Positioning"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "comparative-positioning", "writing-analysis"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for comparative-positioning claims — positioning work against a landscape of other work"
status: active
---

# Challenge Type: Comparative Positioning

> A claim that locates this work against other work — existing approaches, adjacent projects, viral repositories, published papers, competing frameworks. Comparative positioning lives or dies on whether the comparison target is characterized honestly and freshly. The failure mode is strawmanning, selective citation, or comparing against a stale snapshot of something that has since evolved.

---

## Summary — Honest Comparison Requires Fair Characterization And Current Evidence

This type fires when an input positions work against a landscape — `unlike`, `similar to`, `existing approaches`, `in contrast to`, `prior work`, `state of the art`. The challenge asks whether the comparison target is fairly represented or strawmanned, whether the snapshot is current, whether the strongest version of the compared work was engaged, what each approach is actually trying to solve, and whether a better comparison exists that was overlooked. Prerequisites check that the target is specifically named, that it is actually described (not just alluded to), that freshness is established, and that shared ground is acknowledged before differences. The goal is to keep comparative claims honest against both the comparison target and the reader who may know that target better than the writer does.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | comparative-positioning |
| Name | Comparative Positioning |
| Priority | high |

---

## Detection Patterns

```
unlike, similar to, where x differs, existing approaches, the difference from, as opposed to, compared to, in contrast to, other frameworks, unlike other, what makes this different, prior work, state of the art, comparable to
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| Is the comparison target fairly represented or characterized in its weakest form? | baseline |
| When was the comparison target last examined? Has it changed since? | baseline |
| Have you engaged the strongest version of the compared work, or the most convenient? | elevated |
| What is the compared work trying to solve that yours isn't, and vice versa? | elevated |
| If the author of the compared work read this, would they recognize their own work in your description? | rigorous |
| Are you missing an adjacent work that would be a better comparison than the one you chose? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| comparison-target-named | input contains a proper-noun reference to the compared work (project name, author, paper, repo) | "Comparison target not specifically named — 'existing approaches' is not a comparison" |
| target-accurately-characterized | input contains "their approach", "they do", "their design", "the x approach" with descriptive content | "Compared work not actually described — contrast requires describing what is being contrasted" |
| freshness-verified | input contains a date, version, or recency marker ("as of", "current", "recent", "latest", year) | "Freshness of the comparison not established — comparisons against stale snapshots are misleading" |
| shared-ground-acknowledged | input contains "similarly", "shared", "in common", "both", "where we agree" | "No shared ground acknowledged — honest comparison names similarities before differences" |

---

## Suggested Reframings

- Reframe with fairness: "X and my approach share A and B; they diverge on C, where X does Y and I do Z"
- Reframe with recency: "As of [date/version], X does Y; I'm aware this may have changed"
- Reframe with humility: "I may be mischaracterizing X; the claim holds against my reading of their docs as of [date]"
- Reframe to acknowledge strongest version: "The strongest defense of X is A; my claim is that even granting A, Z still holds"
