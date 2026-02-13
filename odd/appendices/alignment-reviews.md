---
uri: klappy://odd/alignment-reviews
title: "Alignment Reviews"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "alignment", "drift", "hygiene", "selection-pressure"]
relevance: supporting
execution_posture: operational
---

# Alignment Reviews

> Periodic evaluation of the ODD system itself to detect drift.

## Description

Alignment Reviews are periodic evaluations that detect and correct drift between stated intent, implemented process, and observed outcomes. They apply to content, process, and tooling equally. Reviews evaluate Canon (contradicted rules, obsolete references, undocumented invariants), PRDs (actual decision criteria, implicit patching, boundary bleeding), Attempts (incompatible comparisons, ignored failures, insufficient evidence), and Tooling (enforced invariants, accidental drift, silent compensation). Reviews are triggered by events (epoch transitions, repeated failures, PRD rewrites) not schedules. They produce corrections, not features.

## Outline

- Summary
- Why This Exists
- What Is Reviewed (Canon, PRDs, Attempts, Tooling)
- When Reviews Occur
- What Reviews Produce
- Non-Goals
- Core Invariant

---

## Content

Its purpose is to detect and correct **drift** between:
- stated intent
- implemented process
- observed outcomes

Alignment Reviews apply to **content, process, and tooling** equally.

They do not produce features.
They produce corrections.

---

## Why This Exists

Outcome-Driven Development assumes:
- rapid iteration
- parallel attempts
- evolving intent

These conditions create drift by default.

Without an explicit alignment mechanism:
- outdated rules persist
- assumptions fossilize
- successful outcomes are misattributed
- failed outcomes are rationalized

Alignment Reviews introduce **selection pressure against incoherence**.

---

## What Is Reviewed

An Alignment Review evaluates:

### Canon
- Are any canon rules contradicted by current practice?
- Are obsolete rules still referenced?
- Are new invariants emerging without documentation?

### PRDs (Per Project)
- Do PRDs still reflect actual decision criteria?
- Are PRDs being patched implicitly via attempts?
- Are project boundaries bleeding into each other?

### Attempts
- Are outcomes being compared across incompatible contexts?
- Are failures producing learning, or being ignored?
- Is evidence sufficient to justify promotion?

### Tooling
- Does tooling enforce stated invariants?
- Does tooling encourage accidental drift?
- Are humans compensating for tooling gaps silently?

---

## When Reviews Occur

Alignment Reviews are triggered by **events**, not schedules.

Typical triggers include:
- Epoch transitions
- Repeated unexplained failures
- Major PRD rewrites
- Tooling changes that affect workflow
- Persistent disagreement about outcomes

They may also be run opportunistically.

---

## What Reviews Produce

An Alignment Review may result in:
- Canon updates (via decision logs)
- PRD clarification or split
- Epoch declaration
- Tooling constraints
- Explicit deprecation of rules or documents

Reviews **do not**:
- retroactively invalidate evidence
- rewrite history
- assign blame

---

## Non-Goals

Alignment Reviews are not:
- performance reviews
- approval gates
- compliance checklists
- automation requirements

They exist to preserve **truthfulness**, not control.

---

## Core Invariant

If alignment cannot be explained clearly,
it does not exist.

Drift that is invisible is more dangerous than failure.
