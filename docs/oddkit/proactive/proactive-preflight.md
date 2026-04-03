---
uri: klappy://docs/oddkit/proactive/proactive-preflight
title: "Proactive Preflight — Preflight Before Every Execution Task"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "preflight", "proactive", "execution", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Preflight — Preflight Before Every Execution Task

> Preflight before any execution that produces an artifact. What constraints apply? What's the definition of done? What pitfalls exist? Ask before building, not after shipping.

---

## Summary — Know the Rules Before You Play

The passive pattern was to preflight only for major deliverables — documents, PRDs, significant code changes. Smaller execution tasks skipped preflight entirely. The result: the agent would produce work that violated constraints it could have discovered in advance.

The proactive pattern is to preflight before any execution task that produces an artifact. The cost of a preflight check is one API call. The cost of rework is a conversation turn and operator frustration.

---

## When to Preflight Proactively

Preflight before:

- Writing a governance document, decision record, or canon article.
- Producing code that will be committed.
- Creating any artifact that will persist beyond the current exchange.
- Starting a task where the definition of done is not yet clear.

The test: if the agent is about to produce something, it should know what "correct" looks like before it starts.

---

## What Preflight Returns

Preflight returns relevant constraints, definition of done, and known pitfalls for the task. It surfaces what the agent needs to know before executing. If no specific constraints exist, preflight says so — and the agent proceeds with the axioms as the governing framework.

---

## The Passive Pattern This Replaces

Under E0006, preflight was reserved for significant work. The agent would start smaller tasks without checking what constraints applied, then discover mid-execution that a convention existed or a pitfall was documented.

Under E0007, the agent checks before starting. Every time.
