---
uri: klappy://odd/quantum-development
kind: canon
title: "Quantum Development"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: semi_stable
tags: ["odd", "quantum", "attempts", "uncertainty", "orientation"]
relevance: supporting
execution_posture: operational
target_repo: "outcomes-driven-development"
---

# Quantum Development

> Why multiple attempts against the same PRD are sometimes necessary.

## Description

Quantum Development is a way of reasoning about uncertainty in AI-assisted development. Given the same PRD, different agents, prompts, and execution paths can produce meaningfully different results. Each attempt is an independent observation of the same specification. The goal is to distinguish specification failure from execution-path variance. A PRD is a hypothesis, an attempt is an experimental run, an outcome is an observation. Multiple attempts allow patterns to emerge and prevent premature convergence. Quantum Development is appropriate when the PRD is clear but failure is ambiguous. It ends when one candidate is promoted.

## Content

## Purpose

This appendix formalizes Quantum Development as a way of reasoning about uncertainty in AI-assisted software development.

It explains why multiple attempts against the same PRD are sometimes necessary before changing the PRD itself.

This is an orientation model, not a workflow.

---

## Core Idea

In AI-assisted development, outcomes are non-deterministic.

Given the same PRD:

- different agents,
- different prompts,
- different execution paths,

can produce meaningfully different results.

Quantum Development treats each implementation attempt as an independent observation of the same specification.

The goal is to distinguish:

- specification failure from
- execution-path variance.

---

## PRD vs Attempt (Clarified)

- **PRD** = hypothesis
- **Attempt** = experimental run
- **Outcome** = observation

A single attempt provides insufficient evidence to judge the PRD.

Multiple attempts allow patterns to emerge.

---

## Why This Matters

Without multiple attempts, teams risk:

- **False negatives**
  Declaring a PRD "bad" when a single execution path failed.

- **False positives**
  Declaring a PRD "good" because one attempt happened to succeed.

Both lead to premature convergence.

Quantum Development exists to delay collapse of the PRD until enough signal exists.

---

## When Quantum Development Is Appropriate

Multiple attempts against the same PRD are appropriate when:

- The PRD is clear and internally consistent
- Failure is ambiguous (not obviously caused by missing requirements)
- The system involves AI agents or probabilistic behavior
- Execution choices materially affect outcomes

This is common in:

- agentic workflows
- prompt-driven systems
- generative UI
- complex orchestration logic

---

## When to Change the PRD Instead

Changing the PRD is appropriate when:

- Attempts fail due to missing constraints or goals
- Success criteria are unclear or contradictory
- Attempts stall due to underspecification
- New information invalidates the original intent

Quantum Development is not an excuse to avoid revising a bad PRD.

---

## Independence Requirement (Clarified)

Independence in Quantum Development is epistemic, not intrinsic to any specific tool or infrastructure.

An attempt is independent if:

- decisions are not steered by prior outcomes,
- implementation state is fresh,
- and the approach represents a genuine re-instantiation of the PRD.

Independence is therefore a property of decision-making and state, not of deployment mechanics.

### Infrastructure for Observability (Supporting, Not Defining)

Version control systems, isolated branches, and preview deployments do not create independence.

They support independence by:

- preventing accidental state leakage,
- enabling parallel observation of outcomes,
- and preserving each attempt as an inspectable artifact.

Infrastructure exists to protect and surface independence, not to define it.

Confusing infrastructural isolation with epistemic independence is a common failure mode in AI-assisted development.

See `/docs/appendices/attempt-lifecycle.md` for the attempt model and the “PRD as the unit of test” framing.

---

## Outcome Interpretation (Conceptual)

Observed outcomes across attempts can be interpreted as follows:

| Pattern                              | Implication                |
| ------------------------------------ | -------------------------- |
| Multiple failures, same failure mode | PRD likely flawed          |
| Failure → success                    | Execution-path sensitivity |
| Multiple successes                   | PRD likely robust          |
| Divergent behaviors                  | PRD underspecified         |

These interpretations are signals, not proofs.

Judgment is still required.

---

## On Timing and Observation

Quantum Development does not require attempts to run simultaneously.

Attempts may be:

- sequential or parallel
- human-driven or agent-driven
- observed over time rather than at once

The key requirement is not simultaneity, but comparability.

---

## Relationship to ODD

Quantum Development reinforces core ODD principles:

- **Outcomes over artifacts**
  Success is judged by results, not by effort or code reuse.

- **Prompt over code**
  Execution paths vary; intent must be tested across them.

- **Antifragility**
  Variance is not noise to eliminate but signal to observe.

- **Restartability**
  Clean restarts are a feature, not a failure.

---

## What This Appendix Is Not

Quantum Development is not:

- a requirement to always run multiple attempts
- a mandate to avoid PRD changes
- a replacement for engineering judgment
- a statistical guarantee

It is a lens for reasoning about uncertainty.

---

## Summary

Quantum Development acknowledges a reality of modern software:

> The same intent can produce multiple valid (or invalid) realities.

By observing more than one, teams reduce the risk of mistaking chance for truth.

**Quantum Development ends when one candidate is promoted.**

Observations without promotion are incomplete experiments. See the Champion selection and promotion procedure in `/docs/appendices/attempt-lifecycle.md`.

---

## Status

- Orientation-only
- Non-prescriptive
- Applies primarily to AI-assisted systems
