---
uri: klappy://odd/challenge-types/strong-claim
title: "Challenge Type: Strong Claim"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "strong-claim"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for strong-claim type"
status: active
---

# Challenge Type: Strong Claim

> A definitive statement offered without qualification. Strong claims foreclose doubt and deserve the most pressure, because their cost of being wrong is proportional to the confidence they project.

---

## Summary — Maximum Pressure For Claims Without Hedges

This type fires when an input uses definitive vocabulary — `must`, `always`, `never`, `guaranteed`, `impossible`, `certain` — that forecloses doubt and invites the reader to adopt the conclusion without qualification. The pressure this type applies scales with the absoluteness of the language: questions ask what evidence would disprove the claim, what conditions break it, and who would disagree. Prerequisites check that strength of claim matches strength of evidence, that scope is named, and that some disconfirmer is acknowledged. The goal is not to weaken confident claims but to ensure their confidence is load-bearing rather than rhetorical.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | strong-claim |
| Name | Strong Claim |
| Priority | high |

---

## Detection Patterns

```
must, always, never, guaranteed, impossible, certain, definitely, obviously, clearly, undeniably, without question, proven, fact
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| What evidence would disprove this? | baseline |
| Under what conditions does this NOT hold? | baseline |
| Who or what would disagree with this, and why? | elevated |
| What is the strongest version of the opposing view? | elevated |
| If this were wrong, how would you know? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| evidence-for-strength | input contains "because", "data", "measured", "studies", "evidence" | "Strong claim lacks explicit evidence — strength of claim should match strength of evidence" |
| scope-named | input contains "in", "when", "for", "under" scoping language | "Strong claim has no scope — universal claims are almost always false at the edges" |
| disconfirmer-acknowledged | input contains "unless", "except", "assuming", "given" | "No disconfirmer acknowledged — what would change this claim?" |

---

## Suggested Reframings

- Reframe as hypothesis: "We believe X because Y, and would reconsider if Z"
- Reframe with scope: "In contexts A and B, X holds; outside those, we have not tested"
- Reframe as falsifiable: "If we observed W, we would retract this claim"
