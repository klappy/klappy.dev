---
uri: klappy://odd/challenge-types/proposal
title: "Challenge Type: Proposal"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "proposal"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, canon/principles/irreversibility-is-the-real-cost.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for proposal type"
status: active
---

# Challenge Type: Proposal

> A future-oriented plan or recommendation. Proposals carry their weight in the options they close. Pressure here is about alternatives considered, reversibility, and what would need to be true for the proposal to fail.

---

## Summary — Pressure Scales With Irreversibility

This type fires when an input projects a plan or recommendation — `should`, `plan to`, `propose`, `recommend`, `will`, `let's`. Proposals close options, so the challenge asks about the options that were considered and rejected, the cost of being wrong, the reversibility of the commitment, and what would need to be true for the proposal to fail. Prerequisites check that alternatives were explored, risks were acknowledged, reversibility was addressed, and success criteria were named. Irreversible proposals get the most scrutiny; experimental proposals get the least. The goal is to move proposals from unexamined intentions to defensible choices.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | proposal |
| Name | Proposal |
| Priority | high |

---

## Detection Patterns

```
should, plan to, going to, will, propose, suggest, recommend, let's, want to, intend to, aim to, we'll, i'll
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| What's the cost of being wrong here? | baseline |
| What alternatives were considered and rejected, and why? | baseline |
| What would need to be true for this to fail? | elevated |
| Is this reversible? If not, what's the point of no return? | elevated |
| Who benefits if this succeeds? Who bears the cost if it fails? | rigorous |
| What is the smallest version of this we could test first? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| alternatives-considered | input contains "alternative", "instead", "option", "considered", "rejected" | "No alternatives mentioned — single-option proposals lack rigor" |
| risk-acknowledged | input contains "risk", "cost", "downside", "tradeoff", "expense" | "No risks or costs acknowledged" |
| reversibility-named | input contains "reversible", "reversal", "undo", "rollback", "temporary", "trial" | "Reversibility not addressed — irreversible proposals deserve proportional scrutiny" |
| success-criteria | input contains "success", "works", "done when", "measured by" | "No success criteria named — how will you know if this worked?" |

---

## Suggested Reframings

- Add optionality: "We're choosing X over Y because Z, reversible until W"
- Reframe with stakes: "This is a one-way door; we are committing because A, B, C"
- Reframe as experiment: "We'll try X for duration D; success looks like M; we'll abandon if N"
- Address canon tensions directly before proceeding
