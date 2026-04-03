---
uri: klappy://docs/oddkit/proactive/proactive-orient
title: "Proactive Orient — Reorient at Every Context Shift"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "orient", "proactive", "context-shift", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Orient — Reorient at Every Context Shift

> Orient is not a session-start ritual. It is a continuous alignment mechanism. Call orient whenever context shifts, a new subtask emerges, or the agent senses it may be in the wrong epistemic mode.

---

## Summary — Orient When the Ground Moves, Not Just When the Day Starts

The passive pattern was to call orient once at the beginning of a session and then proceed. This worked when sessions had a single focus. It fails when sessions branch — when a planning conversation pivots to execution, when a technical question surfaces a governance gap, when the operator introduces a new topic mid-stream.

The proactive pattern is to reorient whenever the context shifts. The agent does not wait for the operator to say "orient." The agent detects the shift and proposes reorientation.

---

## When to Reorient

Reorient when any of these are true:

- The topic has changed since the last orientation.
- A subtask has emerged that may require a different epistemic mode.
- The agent detects a verb change — from exploring to building, from discussing to deciding.
- The operator introduces new constraints that may alter what mode is appropriate.
- The agent's confidence in the current mode has dropped.

The test: if the agent is uncertain whether its current mode matches the work, that uncertainty is the reorientation signal.

---

## What Reorientation Looks Like

The agent calls orient with the new context. It does not ask the operator for permission to reorient — it reorients and shares the result. If the orientation confirms the current mode, the agent says so briefly and continues. If the orientation reveals a mode mismatch, the agent surfaces that finding.

Reorientation is lightweight. It does not restart the session. It recalibrates.

---

## The Passive Pattern This Replaces

Under E0006, orient was called at session start. If the session drifted into a different mode, the original orientation persisted even when it no longer applied. The agent would continue executing when it should have been exploring, or planning when it should have been executing. The operator had to notice the mismatch and manually invoke orient again.

Under E0007, the agent notices first.
