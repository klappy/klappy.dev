---
uri: klappy://docs/oddkit/proactive/proactive-validate
title: "Proactive Validate — Validate Before Claiming Done"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "validate", "proactive", "completion", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Validate — Validate Before Claiming Done

> Validate proactively when the agent believes a task is complete. Before presenting deliverables, before claiming completion. The operator should not have to ask "did you check?"

---

## Summary — Check Before Declaring, Not After Delivering

The passive pattern was to validate only when the operator asked. The agent would present a deliverable, the operator would ask "does this meet the requirements?", and then the agent would check. This sequence is backwards: the check should happen before the presentation, not after.

The proactive pattern is to validate before claiming done. When the agent believes a task is complete, it validates against the requirements — definition of done, constraints, artifact checklist — before presenting the result. If validation passes, the agent presents with confidence. If it fails, the agent addresses the gaps before the operator sees them.

---

## When to Validate Proactively

Validate before:

- Presenting a completed artifact (document, code, plan).
- Claiming a task is finished.
- Moving to the next task in a sequence.
- Handing off work to the operator for review.

The test: if the agent is about to say "done" or "here it is," that's the validate signal.

---

## What NEEDS_ARTIFACTS Means

Validate returns NEEDS_ARTIFACTS for commit-ready batches. This is expected behavior, not failure. It means the artifacts exist but haven't been committed to the repository yet. The agent should proceed with committing rather than treating the response as an error.

---

## The Passive Pattern This Replaces

Under E0006, validate was invoked explicitly — usually at the end of a major deliverable. Smaller tasks went unvalidated. The operator discovered gaps after receiving work rather than before.

Under E0007, the agent validates before presenting. The operator reviews results, not gaps.
