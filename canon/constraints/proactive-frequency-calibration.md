---
uri: klappy://canon/constraints/proactive-frequency-calibration
title: "Proactive Frequency Calibration — Cognitive Rhythm Without Operator Babysitting"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "constraints", "proactive", "frequency", "tool-budget", "turn-format", "bottleneck", "operator-attention"]
epoch: E0008
date: 2026-04-20
derives_from: "docs/oddkit/proactive/posture-lapse.md, odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md, writings/shifting-bottlenecks-climbing-ladders.md"
complements: "canon/constraints/mode-discipline-and-bottleneck-respect.md, docs/oddkit/proactive/posture-lapse.md"
governs: "Tool-call frequency, turn format, and gauntlet placement during proactive operation"
---

# Proactive Frequency Calibration — Cognitive Rhythm Without Operator Babysitting

> The proactive posture is right. Running it on every single turn is wrong. Calibrate frequency to mode boundaries, format every turn as a checkpoint (done, next, blocker or none), spend tool budget in phase-aligned clumps instead of per-decision sprinkles, and let "continue" be a safety valve, not a workflow step. The proactive posture exists to keep the operator's attention free for real decisions, not to consume it with mechanical taps.

---

## Summary — The Posture Is Right, the Cadence Was Wrong

The E0007 proactive posture made oddkit tools a cognitive rhythm rather than a passive toolbox. That shift produced the trustworthy, rule-following, consistent operation captured across six sessions on Opus 4.7 (see `odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md`). It also produced a new bottleneck: per-turn tool budgets exhausted continuously, fifteen-minute turns each ending in "tap continue," and operator attention dragged onto a button instead of a decision.

The fix is not to abandon proactivity. The fix is to calibrate it. The proactive posture exists to free the operator's attention for real decisions; running it on every turn re-imposes the cost it was supposed to eliminate.

This constraint formalizes five rules that preserve the trust and drop the babysitting tax:

1. Mode boundaries trigger the gauntlet, not turns.
2. Every turn ends in checkpoint format.
3. Tool budget spends in phase-aligned clumps.
4. Straight-line work proceeds without asking.
5. "Continue" is a safety valve, not a workflow step.

These rules complement (do not replace) the proactive posture defined in `docs/oddkit/proactive/posture-lapse.md` and the mode discipline defined in `canon/constraints/mode-discipline-and-bottleneck-respect.md`.

---

## The Five Rules

### Rule 1 — Mode Boundaries Trigger the Gauntlet, Not Turns

The full oddkit gauntlet (orient, search, preflight, gate, challenge, validate) is expensive in tool-call count and latency. Running it every turn is wasteful and re-creates the bottleneck the proactive posture exists to eliminate.

Run the gauntlet at mode transitions:

- Exploration → planning: orient, search.
- Planning → execution: preflight, gate, challenge.
- Execution → validation: validate.
- Validation → done (or back to planning): encode.

Within a mode, the rhythm is the work itself. `oddkit_time` at turn start is cheap and stays. Other tools fire only when the actual content of the turn calls for them.

### Rule 2 — Every Turn Ends in Checkpoint Format

The forced cutoffs at the per-turn tool ceiling produced a clean shape: *done, next, blocker or none*. That shape is mobile-readable, resumable in three seconds, and lets the operator return their attention to real decisions instead of parsing prose.

Adopt the shape voluntarily, every turn:

- **Done.** One sentence on what this turn produced.
- **Next.** One sentence on what comes next.
- **Blocker.** "None" by default; a single named blocker if reverting modes.

The narrative inside a turn can be whatever the work requires. The closing shape is non-negotiable. Turns that violate this format shift the cost of comprehension onto the operator's attention.

### Rule 3 — Tool Budget Spends in Phase-Aligned Clumps

Independent tool calls go in parallel, not sequential. Tool calls cluster at phase entry (gauntlet at a mode boundary), not sprinkle across micro-decisions inside a phase.

Counter-pattern: calling `oddkit_search` three times across a turn for three related questions. Better: one parallel batch at phase entry, or one well-formed search.

The goal is to keep total tool count per turn proportional to the work the turn is actually doing, not proportional to the number of micro-checks the proactive posture would naively prompt.

### Rule 4 — Straight-Line Work Proceeds Without Asking

If the next beat of work is unambiguous (PRD already approved, scope already locked, the obvious next file to write), produce the artifact. Do not ask "should I continue?" or "want me to proceed?"

The proactive posture's purpose is to free the operator's attention. A turn that ends in a permission request when no real ambiguity exists has done the opposite.

Genuine forks still warrant asking. The test is whether the operator could give a substantive answer that changes the work. "Should I continue?" fails this test. "Should the close return to the Whopper or shift to a new closing image?" passes it.

### Rule 5 — "Continue" Is a Safety Valve, Not a Workflow Step

The per-turn tool ceiling will sometimes force a stop. When it does, the checkpoint format from Rule 2 gives the operator everything they need to tap once and resume.

A workflow that requires the operator to tap continue between every micro-step has confused the safety valve for the workflow. The valve exists for genuine ceiling hits and genuine ambiguity. It does not exist to substitute for the agent making decisions inside its scope.

---

## What This Amends and What It Does Not

This constraint amends the *frequency* and *format* of the proactive posture. It does not amend:

- The proactive posture itself (`docs/oddkit/proactive/posture-lapse.md` remains canon).
- Mode discipline (`canon/constraints/mode-discipline-and-bottleneck-respect.md` remains canon; this constraint reinforces it by gating the gauntlet to mode boundaries).
- The writing canon gate (`canon/meta/writing-canon.md` remains canon; the checkpoint format complements progressive disclosure for in-session communication).
- Search-before-claiming or any other axiom-level requirement.

The proactive posture is a cognitive rhythm. This constraint specifies that the rhythm has a tempo, and the tempo is set by the work, not by reflex.

---

## Failure Modes

### Failure Mode 1 — Reflexive Gauntlet on Every Turn

Symptom: every turn includes orient, multiple searches, preflight, gate, challenge, encode, regardless of whether the work has crossed a mode boundary. Per-turn tool budget exhausts continuously. Operator taps continue every fifteen minutes.

Diagnosis: gauntlet is being run as ritual rather than at the boundaries it was designed for.

Correction: Rule 1.

### Failure Mode 2 — Narrative Without Checkpoint

Symptom: turns end in long explanatory paragraphs without a clean done/next/blocker close. Operator must read every turn fully to know whether to tap continue or steer.

Diagnosis: agent is performing thoroughness instead of communicating state.

Correction: Rule 2.

### Failure Mode 3 — Permission-Asking as Substitute for Action

Symptom: turn ends with "Want me to continue?" or "Should I proceed?" when no ambiguity exists in the locked scope.

Diagnosis: agent is externalizing the cost of confidence onto the operator's attention.

Correction: Rule 4. If genuine ambiguity exists, name it as a Rule 2 blocker and revert.

### Failure Mode 4 — "Continue" Treated as Throughput Metric

Symptom: agent designs its turn to fit within the per-turn tool ceiling deliberately, producing many small turns that each end in a "continue" prompt to keep momentum.

Diagnosis: the safety valve has become the workflow.

Correction: Rule 5. Larger phase-aligned turns with a clean checkpoint at the end. The ceiling exists to prevent runaway agents, not to set turn cadence.

---

## Operator Posture Implications

The operator side of this constraint:

- Trust the checkpoint format. If a turn ends with "done X, next Y, no blocker," the correct response is usually "continue" or silence-equals-consent. Reading the full turn is optional, not required.
- Treat "should I continue?" prompts as a smell. Push back: *make the call.*
- Use the operator's attention for genuine decisions. Reading turn narratives is not a decision; it is a tax.

The agent side of this constraint:

- Default to producing the next artifact, not asking about it.
- End every turn the way the ceiling would force you to end it: clean, compressed, resumable.
- Save the operator's attention for the moments when their judgment changes the outcome.

---

## Lineage

- **E0007 (Proactive Posture, realized).** Made the tools a cognitive rhythm rather than a passive toolbox. Earned the trustworthy operation captured in the six-session observation.
- **E0008 (Observability, active).** Surfaced the cost of unmodulated proactivity via tool-call ceilings and operator-attention measurement.
- **E0008.x (this constraint).** Calibrates the rhythm so the trust persists without the babysitting tax.

The relationship is layered, not contradictory. E0007 made the posture exist. E0008 named the cost of running it without calibration. This constraint sets the calibration.

---

## Validation Criteria

This constraint is working when:

1. Per-turn tool counts drop from ~10 to ~2-3 on most turns, with phase-entry turns spending more.
2. Turn narratives remain readable on mobile without the operator stopping to think.
3. "Continue" taps occur at genuine mode boundaries or genuine ceilings, not between every micro-step.
4. The trust and rule-following from E0007 persist across a multi-session sample.
5. Operator reports the bottleneck has moved off their thumb without re-landing on their judgment.

This constraint has failed when:

1. The trust degrades. Output becomes inconsistent or skips canon checks.
2. The agent over-corrects into asking permission for every fork it should make itself.
3. Mode discipline collapses (the Rule 1 boundary checks were skipped).
4. Operator reports having to babysit the same way as before.
