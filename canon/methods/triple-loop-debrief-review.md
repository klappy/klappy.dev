---
uri: klappy://canon/methods/triple-loop-debrief-review
title: "Triple-Loop Debrief Review — Learning to Learn as a Standing Question"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["methods", "debrief", "learning-to-learn", "meta-skill", "triple-loop", "third-loop", "three-loops"]
derives_from:
  - klappy://canon/values/trust-kernel
status: active
---

# Triple-Loop Debrief Review

> Learning to learn from mistakes is a meta-skill, not an emergent nicety of
> good process. Every debrief answers three questions, not one.

## The Three Loops

1. **Fix the mistake** (single-loop) — a validator FAILs a PR; the seat
   iterates; re-validation passes. Routine by design.
2. **Fix the system that produced it** (double-loop) — casualties become
   `candidate:` lines, which become policy; the debrief legislates so the
   class of mistake dies, not the instance.
3. **Fix how the fixing works** (triple-loop, the meta-skill) — did the
   learning machinery itself perform? What would have caught this sooner,
   cheaper, or without escalating to the maintainer?

## The Standing Question

A debrief that only answers loop 1 is a log, not learning. Every debrief
should name, even briefly: *what did the learning machinery itself do this
session, and did it work?*

## Relationship to the Trust Kernel

This is not a new value — it is `canon/values/trust-kernel` ("Trust Is Built
by Managing Expectations") gaining a standing instrument. Declared
expectations are promises with a shape; triple-loop review is the audit that
keeps the promise about the *learning process itself* honest, not just the
promise about any single outcome.

## Failure Mode Without This

Triple-loop insight only surfaces when a human happens to notice it (e.g., a
bridge-fix vs. architecture-fix distinction). The class of catch does not
scale past the attention of whoever is watching that day.
