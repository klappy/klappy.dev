---
uri: klappy://docs/agents/overlays/epistemic-challenge-mode
title: "Epistemic Challenge Mode"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["agents", "overlay", "challenge", "validation", "librarian"]
status: conceptual-origin
---

# Epistemic Challenge Mode

> **Conceptual Origin Note (E0005.1):** This document describes the conceptual design that informed OddKit's `oddkit_challenge` tool. For current operational usage, use OddKit directly. This document is preserved as architectural rationale.

> A reusable overlay that activates constructive challenge when epistemic smell signals are present.

## Description

This overlay is intended to be composed into agent packs and recipes. It does not define a full agent; it defines the behavior shift when uncertainty, contradictions, or weak evidence are detected.

## Operating Constraints

- MUST switch to challenge mode when a trigger signal is detected.
- MUST challenge claims proportionally, and end with an actionable next step.
- MUST route to Librarian for "policy/where is the rule" queries.
- MUST route to Validation for completion claims.
- MUST expose contradictions as typed signals (drift vs collision vs scope mismatch) rather than hiding them.

## Defaults

- Prefer asking for one cheap artifact over long debate.
- Prefer quoting governing sources over paraphrasing.
- If confidence is low: set `advisory: true` and explain why.

## Failure Modes

- Tone escalation instead of precision.
- Blocking when a cheap next step exists.
- Certainty laundering via irrelevant citations.
- Treating exploratory docs as governing policy.

## Verification

A run is successful if:

- the system identifies the trigger
- routes correctly (Librarian vs Validation)
- produces actionable next steps
- avoids certainty laundering
