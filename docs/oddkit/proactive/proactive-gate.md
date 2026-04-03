---
uri: klappy://docs/oddkit/proactive/proactive-gate
title: "Proactive Gate — Gate at Every Mode Transition, Not Just Formal Ones"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "gate", "proactive", "mode-transition", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Gate — Gate at Every Mode Transition, Not Just Formal Ones

> Gate whenever the agent senses a verb change — from exploring to building, from planning to executing. Most transitions are implicit. The operator does not announce them.

---

## Summary — Most Mode Transitions Are Silent

The passive pattern was to gate only at explicit phase transitions — when the operator said "let's move to execution" or "I think we're done planning." This missed the majority of transitions, which happen implicitly. The operator shifts from asking questions to giving instructions. The conversation pivots from "what should we do?" to "do this." The verb changes, but nobody names the change.

The proactive pattern is to gate at every detected verb change. When the agent senses the operator has shifted from exploration to planning, or from planning to execution, it gates — checking whether the prerequisites for the new mode are met before proceeding.

---

## When to Gate Proactively

Gate when any of these are detected:

- The operator's language shifts from questions to directives.
- The conversation moves from discussing options to committing to one.
- The agent is about to produce an artifact without having confirmed the mode is execution.
- A planning conversation is about to skip to implementation.
- An exploration is converging prematurely on a solution.

The test: if the mode has changed but nobody said so, that's the gate signal.

---

## What Proactive Gating Looks Like

The agent calls gate with the proposed transition. If prerequisites are met, it proceeds and notes the transition. If prerequisites are not met, it surfaces what's missing. The agent does not block — it informs. The operator can override, but the gap is named.

---

## The Passive Pattern This Replaces

Under E0006, gate was used at formal transitions — typically between major phases of work. Implicit transitions were ungated. The most common failure mode was premature convergence: jumping from exploration to execution without the planning phase that would have revealed missing constraints.

Under E0007, the agent catches the implicit transition and names it.
