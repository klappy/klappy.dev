---
uri: klappy://canon/principles/status-carries-three-tenses
title: "Status Carries Three Tenses — Was, Is, Will Be, Each With an Observed Time and Its Confidence, Proximity and Relevance"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "principles", "trust", "expectations", "time", "status", "communication", "tense", "lifecycle", "product-development", "sales"]
epoch: E0012
date: 2026-10-09
derives_from: "canon/values/trust-kernel.md, canon/values/axioms.md, canon/observations/time-blindness-axiom-violation.md"
complements: "canon/principles/data-carries-observed-time.md, canon/constraints/legibility-standard.md, canon/bootstrap/model-operating-contract.md, canon/constraints/measure-before-you-object.md, canon/methods/toc-ooda-sprints.md"
governs: "Every status report, handoff, progress line, review request, release note, roadmap and sales claim about a product, and every agent-to-agent contract or schema that states what exists — human or model"
status: active
---

# Status Carries Three Tenses — Was, Is, Will Be, Each With an Observed Time and Its Confidence, Proximity and Relevance

> A status that cannot be placed in time is not a status; it is a mood. The fourth dimension of software is the one that sinks projects: not the code, but the inability to say reliably what was, what is, and what will be — and when each was observed or is expected. Every status therefore carries three tenses, and every tense carries a time the reporter observed, not inferred, and names how it is known, how far from now it sits, and why it bears on the task at hand. It is the trust kernel applied to the clock: expectations cannot be set, maintained, checked, or transferred about a thing whose position in time is unknown.

---

## Simple Rules

- **Use when:** Use when any message, document or contract states what exists, existed or will exist — status, release note, roadmap, demo, sales claim, handoff, schema.
- **Skip when:** Skip for claims with no state in them — a definition, a question, a pure opinion.
- **Stop when:** Stop when a reader who missed the last stretch can place every claim as was / is / will be, each with its time, confidence, proximity and relevance (see The Test).
- **Keep going when:** Keep going while any claim could be read in two tenses or any "will be" lacks its gate.
- **Where:** Captain-facing and agent-facing surfaces, including agent-to-agent contracts and schemas; rendering rules live in `canon/constraints/legibility-standard` (Three Tenses amendment).
- **Who:** Whoever makes the claim, human or model; a reviewer checks tenses before content.
- **Why:** An expectation has no footing without a place in time (`klappy://canon/values/trust-kernel`).
- **What:** Three tenses, each with observed time plus confidence, proximity and relevance; timelines cut at natural snapshots (Three Axes; Each Tense Is a Timeline).
- **How:** Observe before stating, stamp what you read, carry the path from what the reader holds to now and from now to the gate the decision waits on (Constraints).

---

## Summary — Expectations Live in Time, So Status Must Too

Trust is built by managing expectations (`klappy://canon/values/trust-kernel`). An expectation is always about a state at a time: it was red at nine, it is green now, it will be on production after the next train. Remove the time and the expectation cannot be checked; remove the tense and the reader cannot tell a memory from a report from a promise. Both removals are expectations failures, and both produce the same symptom in the reader: they stop trusting the reporter, however accurate each individual sentence may have been.

Models make this failure easily. A session that watched a gate turn red remembers "red" and repeats it hours after the gate turned green, because nothing in its context stamped the observation with a time (`klappy://canon/observations/time-blindness-axiom-violation`). A reporter who mixes the old screenshot with the new one, or the merged change with the proposed one, forces the reader to reconstruct the timeline themselves — and the reader was the bottleneck already.

The fix is structural, not stylistic. Every status names what **was** (and when it was observed), what **is** (and when that was observed), and what **will be** (and when it is expected, with what gate decides it). A tense with no observed time is marked as such — "not re-checked since 09:41" — rather than silently carried forward.

---

## The Three Tenses

| Tense | Carries | Time it carries | Failure when missing |
|---|---|---|---|
| **Was** | the prior state the reader may still hold | when it was last observed to be so | a stale state is re-reported as current |
| **Is** | the state now | when the reporter last observed it | a memory is passed off as an observation |
| **Will be** | the next state and the gate that produces it | when it is expected, and what decides it | a plan is read as a result |

One line is enough when all three fit: *main was red at 23:05 (release gate), is green since 06:05 (checked 09:41), will be on production after the next deploy, which the deploy gate triggers.* Several lines are fine when the reader must compare before and after. What is not fine is a single present-tense sentence that could belong to any of the three.

---

## Three Axes Compound on Time — Confidence, Proximity, Relevance

Past and future are not one thing each. Every point on either side of now carries three independent measures, and a status that names the tense but not the measures still misleads. The captain named all three on 2026-10-09 and asked that they not be conflated.

| Axis | Question it answers | Was | Will be |
|---|---|---|---|
| **Confidence** | *How is this known?* | observed by the reporter · observed by a tool whose output the reporter read · recorded in a ledger or log · reported by another seat or person · remembered from earlier in the session · inferred | committed and gated · planned, with evidence it is on course · planned on track record alone · proposed, awaiting a ruling · hoped, no commitment |
| **Proximity** | *How far from now?* | seconds ago · this session · last release · releases ago | next train · this release · a few releases out · the vision |
| **Relevance** | *How much does it bear on this task?* | changed what the reader holds now · context the reader never acted on · unrelated to this task | the gate this decision waits on · the horizon the decision reaches · the roadmap beyond it |

The axes are independent. A *hoped* feature can be *near* ("we want it in this release") and a *committed* one can be *far* (contracted for next year). "It was green" read from a CI badge an hour ago and "it was green" recalled from a colleague's message yesterday differ on confidence *and* proximity; both may be irrelevant if the reader is deciding about a different gate. Collapsing the three into one word — "soon", "basically done", "we had that" — is how a *hoped* "will be" gets delivered at the *is* tense, which is the sales failure named above.

Naming an axis can be one word or the time and source that imply it: "observed 09:41" carries confidence and proximity; "the gate your yes is waiting on" carries relevance.

---

## Each Tense Is a Timeline, and Relevance Chooses the Points

"Was" is not one state and neither is "will be." The same thing can have a dozen past states — a gate that went red, green, red, green in twelve hours; a screen tweaked pixel by pixel for two hours — and a dozen future ones — the next train, the deploy after it, the field test, the release milestone. A status that reports one "was" and one "will be" has already chosen, and the choice is where expectations are managed or lost.

The filter is relevance to the reader's current moment and current task, and the default cut points are the natural snapshots:

| Tense | Carry | Default snapshots | Leave behind an exit |
|---|---|---|---|
| **Was** | the state the reader last held, and the path from it to now | before this working session · the last release · the release before that | every intermediate tweak; states the reader never acted on |
| **Is** | the current state, with its observed time and confidence | now | detail the current decision does not need |
| **Will be** | the next gate and as many beyond it as the current decision reaches | the next train · this release · the next | the roadmap past that horizon |

Two readers of the same thing get different statuses. The captain who last saw the gate red at 23:05 needs "went green 06:05, still green 09:41"; the cook who watched it turn green needs only "still green 09:41." A design review after two hours of tweaking needs three frames — before the session, the last release, now — not two hundred screenshots. The reporter's job is to know which state the reader is still holding — the ledger and the last message to them say so — and to carry the path from there to now, then from now to the next decision.

What relevance does not permit: dropping a transition because it is embarrassing, or carrying a far-future state because it is attractive. The horizon is the task's, not the reporter's.

---

## What This Is Not

- **Not the epistemic modes.** Exploration, planning, execution and validation are linear stages of work with their own time dimension; the three tenses apply *inside* any of them. A validator reports was/is/will-be as much as a builder does.
- **Not a version scheme.** Release identifiers are a cross-section of this principle, strongest for the past and present: a released version is a trustworthy snapshot of *was* and *is*. The future stays loose by design — ship when the gate passes, cut a patch when the fix lands, do not pre-number what has not been built — so "will be" is anchored by gates, not by version numbers promised in advance.
- **Not a skill.** It is a lens applied across skills, methods, contracts and schemas, including the contracts agents write to each other between layers.

---

## Why This Derives From the Trust Kernel, Not From Time Blindness

Time blindness explains *how* a model loses the clock. This principle states *why* the lost clock costs trust and *what* a status must carry regardless of who writes it. A human reporter with a perfect clock who writes "the gate is red" without a time has broken the same expectation: the reader cannot tell whether to act. The axioms supply the mechanics — observe before claiming (Axiom 1), do not imply what you did not verify (Axiom 4) — and the kernel supplies the reason (`klappy://canon/values/trust-kernel`): an unplaced status is an expectation that was never set.

---

## Observed Across Roles — This Predates Models

The captain's account (2026-10-09): as founder, inventor, lead developer, architect, CTO and sales engineer, he repeatedly watched sales and leadership sell what the product *would be* and claim it already *was*. The person responsible for making it true carried the gap. The outcomes were the same every time the tenses collapsed: lost clients, rework, frustrated users, angry funders, lost funding. When the tenses were kept — what is shipped, what is building, what is promised, each with its date — the same products kept their clients and their funders. In his judgment this is probably the root communication concern of product development, which is why it lives here as a principle and not as a style note for model output.

The model failure in the next section is one instance of a human pattern, not a new problem.

---

## Evidence

2026-10-09 (America/New_York), FIA app cookbook session. The first officer asked the captain a yes/no in the morning that the captain had answered at 23:17 the night before, and reported the main branch "red" when it had been green for three and a half hours. Each sentence had once been true. Neither carried the time it was true. The captain's response named the cost: when a report cannot distinguish past, present and future, the collaboration is bankrupt however good the work underneath — and the principle, in his words, hangs on the trust cornerstone.

---

## Constraints — What This Principle Requires and Prohibits

- A status with no tense is not a status. Rewrite it until a reader can place each claim as was, is, or will be.
- A tense with no observed time is marked unobserved, never inferred from context or from the last time the reporter looked.
- "Will be" names the gate that produces it, so the reader knows what to watch rather than when to hope.
- Each point in a tense names its confidence (observed, reported, recalled; gated, planned, hoped) and its proximity (when), by a word or by the time and source that imply them. A bare tense is read at the strongest confidence and the nearest proximity, which is the reporter's lie by omission.
- Each tense is a timeline. The status carries the past states from the one the reader last held to now, and the future states as far as the current decision reaches — chosen by relevance to the reader's moment and task, never by comfort.
- A before/after presentation keeps the two states visibly separate; one frame per state, never interleaved.
- This is a principle (why), not a format (how). Methods and operating contracts choose the line shape; they may not drop a tense or a time.

---

## The Test

If a reader who missed the last twelve hours can read one status and know what changed, what stands now, and what to expect next — and when each is true — the principle is satisfied. If they must ask "wait, is that still the case?", it is not.
