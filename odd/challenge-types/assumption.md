---
uri: klappy://odd/challenge-types/assumption
title: "Challenge Type: Assumption"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "assumption"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for assumption type"
status: active
---

# Challenge Type: Assumption

> An implicit premise treated as established. Assumptions are dangerous precisely because they are not examined — the work built on top of them silently inherits their uncertainty. Pressure here is about making the premise explicit and naming what would validate or invalidate it.

---

## Summary — Make The Implicit Explicit Before It Compounds

This type fires when an input rests on an unexamined premise — `assume`, `since`, `because`, `given that`, `of course`, `naturally`. Assumptions are the silent structural risks: if the premise is wrong, every claim built on top inherits the error. The challenge asks whether the assumption has been validated, what breaks if it is wrong, whether it is documented or merely implicit, and when it was last verified. Prerequisites check that the assumption is marked for validation, that its breakage impact is considered, and that its source is named. The goal is to surface the assumption from the background of the argument into the foreground, where it can be tested or explicitly accepted.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | assumption |
| Name | Assumption |
| Priority | medium |

---

## Detection Patterns

```
assume, assuming, presume, given that, since, because, if we, taking for granted, it's obvious that, naturally, of course
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| Has this assumption been validated with evidence? | baseline |
| What if this assumption is wrong — what breaks? | baseline |
| Is this assumption documented or just implicit? | elevated |
| When was this last verified against reality? | elevated |
| Is this a universal assumption or context-specific? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| validation-marked | input contains "test", "verify", "validate", "check", "confirm" | "Assumption not marked for validation — assumptions without tests compound silently" |
| breakage-considered | input contains "if wrong", "break", "fail", "impact", "depends on" | "Dependency on this assumption not named — what else falls if this is false?" |
| source-of-assumption | input contains "from", "based on", "per", "according to", "historically" | "Source of the assumption not named — is this documented, observed, or inherited?" |

---

## Suggested Reframings

- Make explicit: "We are assuming X; we believe it because Y; we would test it by Z"
- Reframe as known-unknown: "X is assumed but unverified; impact if false is W"
- Promote to hypothesis: "Assumption X is treated as true until evidence from test T says otherwise"
