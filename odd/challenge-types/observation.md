---
uri: klappy://odd/challenge-types/observation
title: "Challenge Type: Observation"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "observation"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for observation type and fallback routing"
fallback: true
status: active
---

# Challenge Type: Observation

> A report of something seen or noticed, offered without strong claim or directive. Observations are the lightest-pressure claim type. They deserve sample-representativeness and context questions, not adversarial scrutiny. This is the fallback type — inputs that match no other type route here.

---

## Summary — The Lightest-Pressure Type And The Fallback Destination

This type fires when an input reports what was seen, noticed, or experienced — `noticed`, `observed`, `seems`, `appears`, `found that` — without making a strong claim or directive. Observations deserve light pressure, not adversarial scrutiny. The challenge asks about sample size, context, and whether the observation reflects a single data point or a pattern. Prerequisites check that sample size and context are noted. This is also the declared fallback type: inputs that match no other type's detection patterns route here by convention, because an unclassified input is effectively a statement without a strong directive.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | observation |
| Name | Observation |
| Priority | low |

---

## Detection Patterns

```
noticed, saw, observed, seems, appears, looks like, found that, turns out, happened, occurred
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| Is this observation based on a representative sample? | baseline |
| What context might change this observation? | baseline |
| Is this one data point, or a pattern? | elevated |
| Who else has observed this, and do they agree? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| sample-size-noted | input contains "once", "twice", "every", "several", "many", "all", "few", numeric quantifier | "Sample size or frequency not noted — single observations and patterns deserve different weight" |
| context-noted | input contains "when", "where", "under", "during", "after", "in" | "Context of the observation not named — observations are context-bound until proven otherwise" |

---

## Suggested Reframings

- Reframe with context: "In situation X, I observed Y; outside X, I have not checked"
- Distinguish instance from pattern: "This happened once" vs "This happens consistently under condition C"
