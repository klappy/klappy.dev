---
uri: klappy://canon/defaults/reasoning-effort-low-default
kind: canon
title: "Reasoning Effort Defaults Low; Escalate on Importance"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "defaults", "reasoning-effort", "cost", "dispatch", "otto", "harness", "harness-gap"]
epoch: E0010
date: 2026-07-11
derives_from: "canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/defaults/model-ladder-fable-ceiling.md"
complements: "canon/bootstrap/otto-operating-card.md"
governs: "The reasoning-effort setting for the dispatch seat and its flights: the default level and what justifies raising it."
target_repo: "outcomes-driven-development"
---

# Reasoning Effort Defaults Low; Escalate on Importance

> Captain's ruling, 2026-07-11. Reasoning effort starts at **LOW** and is raised deliberately when the work's importance warrants it — never left high out of habit. Thinking budget is spent where the stakes are.

## The Rule

- **Default: LOW.** Routine dispatch, well-scoped execution, mechanical work — low effort is the standing setting.
- **Escalate on importance, explicitly.** Hard problems, high-stakes calls, stewardship work (authoring rulebooks, canon changes, irreversibles) justify medium/high effort. The escalation is a decision, not a residue of the last task's setting.
- **Effort and model are independent dials.** The model ladder (`klappy://canon/defaults/model-ladder-fable-ceiling`) picks *who* thinks; this default picks *how hard*. A Fable flight at low effort is a normal, cheap, correct configuration for most turns.

## The Harness Gap (owed request)

As of 2026-07-11 the Cowork dispatch tools expose a per-flight `model` parameter but **no per-flight `effort` parameter** — effort is settable only project-wide via `settings.json` / environment today. That means this default can be *set globally* but not *escalated per flight* from the dispatch seat. This is recorded as an **owed harness request**: per-flight reasoning-effort control on the dispatch tools. Until it lands, the workable posture is: project-wide low, and escalate by briefing the flight to think harder (or by routing the important task to a session configured higher).
