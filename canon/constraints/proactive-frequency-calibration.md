---
uri: klappy://canon/constraints/proactive-frequency-calibration
title: "Proactive Frequency Calibration — Cognitive Rhythm Without Operator Babysitting"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "constraints", "proactive", "frequency", "tool-budget", "turn-format", "bottleneck", "operator-attention"]
epoch: E0008.4
date: 2026-04-20
derives_from: "canon/principles/ritual-is-a-smell.md, docs/oddkit/proactive/posture-lapse.md, odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md, writings/copy-paste.md, writings/shifting-bottlenecks-climbing-ladders.md"
complements: "canon/constraints/mode-discipline-and-bottleneck-respect.md, docs/oddkit/proactive/posture-lapse.md, canon/diagnostics/ritual-detected.md"
governs: "Tool-call frequency, turn format, and gauntlet placement during proactive operation"
---

# Proactive Frequency Calibration — Cognitive Rhythm Without Operator Babysitting

> Continued micro-rituals (swipe, tap, continue, swipe, tap, continue) are a smell, not a workflow. When the operator has been absorbed into the system as a mechanical component, the failure is not friction to optimize. It is a workflow shape that should never have been accepted. Calibrate frequency to mode boundaries, format every turn as a checkpoint (done, next, blocker or none), spend tool budget in phase-aligned clumps instead of per-decision sprinkles, and treat continued continue-tapping as evidence the workflow needs redesign, not the tap needs optimizing. The proactive posture exists to keep the operator's attention free for real decisions, not to consume it with rituals so small they fail to register as friction.

---

## Summary — The Ritual Is the Smell

The E0007 proactive posture made oddkit tools a cognitive rhythm rather than a passive toolbox. That shift produced trustworthy, rule-following, consistent operation across six sessions on Opus 4.7 (see `odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md`). It also produced a new failure mode: per-turn tool budgets exhausted continuously, fifteen-minute turns each ending in "tap continue," and operator attention dragged onto a button instead of a decision.

The deeper failure is not the cost of any individual tap. The deeper failure is that the operator adapted to the rhythm without flagging it. Humans absorb micro-frictions silently. Swipe, tap, continue. Nothing about any single act is hard, so we do not flag it, so we keep doing it, so we build our day around it, so we mistake "I am getting work done" for "I am the workflow's mechanical component."

The Burger King manager has the same disease in mirror. None of her individual tasks were hard. Take an order, run a drink, check a fryer. She rituals into doing all of them herself for an hour and forty-five minutes and never notices the ritual *is* the failure.

The fix is not to abandon proactivity. The fix is to refuse the ritual. The proactive posture exists to free the operator's attention for real decisions; running it on every turn re-imposes the cost it was supposed to eliminate, in a form so small the operator stops noticing.

This constraint formalizes five rules that preserve the trust and refuse the ritual:

1. Mode boundaries trigger the gauntlet, not turns.
2. Every turn ends in checkpoint format.
3. Tool budget spends in phase-aligned clumps.
4. Straight-line work proceeds without asking.
5. Continued continue-tapping is a smell, not a workflow.

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

### Rule 5 — Continued Continue-Tapping Is a Smell, Not a Workflow

The per-turn tool ceiling will sometimes force a stop. When it does, the checkpoint format from Rule 2 gives the operator everything they need to tap once and resume.

That is the safety valve working as designed. One ceiling hit, one continue, work resumes.

What is not the safety valve working: a sustained rhythm of continue-taps across a session, a day, or several days. That rhythm is a *smell*. It tells you the workflow has absorbed the operator as a mechanical component. Each individual tap is too small to register as friction, which is exactly what makes the pattern dangerous. The operator stops noticing. The rhythm becomes the workflow.

When you notice you have been tapping continue in a sustained rhythm:

- Do not optimize the tap. Optimizing a tap that should not exist is a worse failure than the tap.
- Do not adapt to the rhythm. Adaptation is the disease, not the cure.
- Redesign the workflow so the rhythm is not required. Larger phase-aligned turns. Pre-approved tool-call ranges. Auto-continue inside locked-scope execution. Whatever moves the work off the operator's thumb without moving it back onto the operator's judgment.

The test for this rule: if you removed the operator from the workflow for an hour, would the system make obvious progress, or would it stall at the next continue-prompt? If it stalls, the workflow has confused the operator's presence for the operator's judgment. The operator is supposed to be present for decisions, not for taps.

The Burger King manager working through her lunch rush is the analogy. None of her individual tasks were hard. Each one took thirty seconds. She rituals into doing all of them herself for almost two hours and never notices the ritual is the failure. The continue-tap rhythm is the same disease in a different room. Refuse it.

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

### Failure Mode 4 — Operator Adapts to a Rhythm Instead of Refusing It

Symptom: operator reports a smooth workflow that involves tapping continue every fifteen minutes for hours. Operator describes the rhythm positively, as a sign things are working. No one in the loop has flagged the rhythm itself as a problem.

Diagnosis: the operator has absorbed into the workflow as a mechanical component. The micro-frictions are individually too small to register, so the operator never flags them. The rhythm has become invisible.

Correction: Rule 5. The smooth rhythm is the smell. Redesign the workflow so the rhythm is not required, rather than continuing to live inside it. Adaptation to a ritual that should not exist is not a win. It is the workflow training the operator instead of the operator training the workflow.

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

This constraint is not a new discovery. It is a new instance of an existing principle.

### Canonical Lineage — Ritual Is a Smell, Now Instanced Again

The parent principle is `canon/principles/ritual-is-a-smell.md`, which states: *if correctness depends on people repeatedly remembering a procedure, the system is compensating for missing design.* The continue-tap rhythm meets the ritual-smell criteria as written:

- Repeated procedure operators must remember to perform.
- System ergonomics degrade when the operator stops performing it (work stalls).
- The ritual exists because state (tool budget) is fragile and per-turn.
- The ritual's purpose is "make it work again," not deliberate review.

The parent principle also names the required response: automate the ritual, inline it into the moment it matters, make it unnecessary by reducing hidden state, or detect non-compliance and fail closed. Rule 5 of this constraint operationalizes that response for the specific case of continue-tapping.

The prior public-facing instance of the same pattern is `writings/copy-paste.md` (March 2026), which named the copy-paste-between-tools ritual that defined AI-augmented work in 2025 and the first quarter of 2026. That essay closed with a wish: *I hope this essay ages poorly. I can't wait to not be able to imagine it.* By April 2026, native-container coding workflows had largely ended that ritual. The continue-tap rhythm emerged in its place. The pattern repeated faster than expected.

The companion ledger `odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md` documents the lived experience this constraint was authored from. The companion essay `writings/shifting-bottlenecks-climbing-ladders.md` extracts the public-facing framework.

This lineage is worth naming because canon is supposed to be cumulative. The ritual-is-a-smell principle has now been instanced twice in public writing in seven weeks. It will be instanced again. The principle stays canonical; the instances become evidence of how reliably it applies.

### Epoch Lineage — Where This Constraint Lives in the Stack

- **E0007 (Proactive Posture, realized).** Made the tools a cognitive rhythm rather than a passive toolbox. Earned the trustworthy operation captured in the six-session observation.
- **E0008 (Observability, active).** Surfaced the cost of unmodulated proactivity via tool-call ceilings and operator-attention measurement.
- **E0008.x (this constraint).** Calibrates the rhythm so the trust persists without the babysitting tax, and applies the existing ritual-is-a-smell principle to the specific case of continue-tap rhythms.

The relationship is layered, not contradictory. E0007 made the posture exist. E0008 named the cost of running it without calibration. This constraint sets the calibration and ties it to the canon principle that has governed similar smells before.

---

## Validation Criteria

This constraint is working when:

1. Per-turn tool counts drop from ~10 to ~2-3 on most turns, with phase-entry turns spending more.
2. Turn narratives remain readable on mobile without the operator stopping to think.
3. Continue-taps occur at genuine mode boundaries or genuine ceilings, not as a sustained rhythm across hours.
4. The operator notices and flags any sustained continue-tap rhythm as a smell, before adapting to it.
5. The trust and rule-following from E0007 persist across a multi-session sample.
6. Operator reports the bottleneck has moved off their thumb without re-landing on their judgment.

This constraint has failed when:

1. The trust degrades. Output becomes inconsistent or skips canon checks.
2. The agent over-corrects into asking permission for every fork it should make itself.
3. Mode discipline collapses (the Rule 1 boundary checks were skipped).
4. The operator describes a sustained continue-tap rhythm positively, as part of a smooth workflow.
5. Operator reports having to babysit the same way as before.
