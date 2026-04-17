---
uri: klappy://odd/challenge-types/principle-extraction
title: "Challenge Type: Principle Extraction"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "principle-extraction", "writing-analysis"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for principle-extraction claims — elevating a heuristic from experience into canon"
status: active
---

# Principle Extraction

> A move that lifts a heuristic out of specific experience and elevates it to a principle — a named rule, an aphorism, an invariant the writer intends others to adopt. The failure mode is over-generalization: treating a pattern that held in one or two cases as universal. Principles are load-bearing once canonized; pressure here is about sample size, counter-examples, and scope.

---

## Summary — Principles Are Load-Bearing And Demand Proportional Sample Size

This type fires when an input elevates a heuristic to a principle — `the principle is`, `the rule is`, `the test is`, `the lesson is`, `invariant`, `forcing function`, `non-negotiable`. Principles become canon once stated, so the challenge asks how many cases the principle rests on, what counter-example was considered and rejected, what the scope is, and under what conditions the principle would be retracted. Prerequisites check that the principle is anchored in multiple cases, that counter-examples were considered, that scope is named, and that a retraction condition exists. The governing question is whether the principle is surviving because it is true or because its failure mode has not yet been encountered. The goal is to prevent single-case patterns from masquerading as universal rules.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | principle-extraction |
| Name | Principle Extraction |
| Priority | high |

---

## Detection Patterns

```
the principle is, the rule is, the test is, the lesson is, what this teaches us, the takeaway is, always, never, the real cost, the whole point, the key insight, invariant, forcing function, non-negotiable, only what, pure
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| How many distinct cases does this principle rest on? One, two, many? | baseline |
| What's a counter-example you considered and rejected? | baseline |
| What's the scope? Does this hold for a specific domain, or are you making a universal claim? | elevated |
| Under what conditions would you retract this principle? | elevated |
| Is this principle surviving because it's true, or because you haven't encountered its failure yet? | rigorous |
| If a respected peer challenged this principle, what's the strongest defense — and where does the defense crack? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| derived-from-multiple-cases | input contains "case", "example", "instance", "time", or plural enumerations | "Principle not anchored to multiple cases — one observation is a pattern; one pattern is a principle only with more cases" |
| counter-examples-considered | input contains "except", "unless", "fails when", "not when", "counter-example", "doesn't hold" | "No counter-examples considered — a principle without acknowledged limits is a bias in formalwear" |
| scope-named | input contains "in", "for", "when", "applies to", "within", "in the context of" | "Scope not named — universal claims in particular domains are the classic overreach" |
| retraction-condition | input contains "would retract", "would revise", "if X then", "change my view", "reconsider" | "No retraction condition named — a principle that cannot be falsified is a preference, not a principle" |

---

## Suggested Reframings

- Reframe as scoped rule: "In the context of C, the pattern I've seen is X; outside C, I don't know"
- Reframe with sample: "Across cases A, B, and D, I observe X; I treat this as a principle within that class"
- Reframe as working heuristic: "My current working rule is X; I'd revise it if I encountered W"
- Reframe as hypothesis under test: "I'm treating X as a principle; the cases that would challenge it are A, B, C, and I'll watch for them"
