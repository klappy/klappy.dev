---
uri: klappy://canon/principles/status-carries-three-tenses
title: "Status Carries Three Tenses — Was, Is, Will Be, Each With an Observed Time"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "principles", "trust", "expectations", "time", "status", "communication", "tense", "lifecycle", "product-development", "sales"]
epoch: E0008.1
date: 2026-10-09
derives_from: "canon/values/trust-kernel.md, canon/values/axioms.md, canon/observations/time-blindness-axiom-violation.md"
complements: "canon/principles/data-carries-observed-time.md, canon/constraints/legibility-standard.md, canon/bootstrap/model-operating-contract.md, canon/constraints/measure-before-you-object.md, canon/methods/toc-ooda-sprints.md"
governs: "Every status report, handoff, progress line, review request, release note, roadmap and sales claim about a product — human or model"
status: active
---

# Status Carries Three Tenses — Was, Is, Will Be, Each With an Observed Time

> A status that cannot be placed in time is not a status; it is a mood. The fourth dimension of software is the one that sinks projects: not the code, but the inability to say reliably what was, what is, and what will be — and when each was observed or is expected. Every status therefore carries three tenses, and every tense carries a time the reporter observed, not inferred. This is not a formatting rule. It is the trust kernel applied to the clock: expectations cannot be set, maintained, checked, or transferred about a thing whose position in time is unknown.

---

## Summary — Expectations Live in Time, So Status Must Too

Trust is built by managing expectations (`klappy://canon/values/trust-kernel`). An expectation is always about a state at a time: it was red at nine, it is green now, it will be on production after the next train. Remove the time and the expectation cannot be checked; remove the tense and the reader cannot tell a memory from a report from a promise. Both removals are expectations failures, and both produce the same symptom in the reader: they stop trusting the reporter, however accurate each individual sentence may have been.

Models make this failure easily. A session that watched a gate turn red remembers "red" and repeats it hours after the gate turned green, because nothing in its context stamped the observation with a time (`klappy://canon/observations/time-blindness-axiom-violation`). A reporter who mixes the old screenshot with the new one, or the merged change with the proposed one, forces the reader to reconstruct the timeline themselves — and the reader was the bottleneck already.

The fix is structural, not stylistic. Every status names what **was** (and when it was observed), what **is** (and when that was observed), and what **will be** (and when it is expected, with what gate decides it). A tense with no observed time is marked as such — "not re-checked since 09:39" — rather than silently carried forward.

---

## The Three Tenses

| Tense | Carries | Time it carries | Failure when missing |
|---|---|---|---|
| **Was** | the prior state the reader may still hold | when it was last observed to be so | a stale state is re-reported as current |
| **Is** | the state now | when the reporter last observed it | a memory is passed off as an observation |
| **Will be** | the next state and the gate that produces it | when it is expected, and what decides it | a plan is read as a result |

One line is enough when all three fit: *main was red at 23:05 (release gate), is green since 09:39 (checked 09:41), will be on production after the next deploy, which the door triggers.* Several lines are fine when the reader must compare before and after. What is not fine is a single present-tense sentence that could belong to any of the three.

---

## Why This Derives From the Trust Kernel, Not From Time Blindness

Time blindness explains *how* a model loses the clock. This principle states *why* the lost clock costs trust and *what* a status must carry regardless of who writes it. A human reporter with a perfect clock who writes "the gate is red" without a time has broken the same expectation: the reader cannot tell whether to act. The axioms supply the mechanics — observe before claiming (Axiom 1), do not imply what you did not verify (Axiom 4) — and the kernel supplies the reason: an unplaced status is an unmanaged expectation.

---

## Observed Across Roles — This Predates Models

The captain's account (2026-10-09): as founder, inventor, lead developer, architect, CTO and sales engineer, he repeatedly watched sales and leadership sell what the product *would be* and claim it already *was*. The person responsible for making it true carried the gap as anxiety. The outcomes were the same every time the tenses collapsed: lost clients, rework, frustrated users, angry funders, lost funding. When the tenses were kept — what is shipped, what is building, what is promised, each with its date — the same products kept their clients and their funders. In his judgment this is probably the root communication concern of product development, which is why it lives here as a principle and not as a style note for model output.

The model failure in the next section is one instance of a human pattern, not a new problem.

---

## Evidence

2026-10-09 (America/New_York), FIA app cookbook session. The first officer asked the captain a yes/no in the morning that the captain had answered at 23:17 the night before, and reported the main branch "red" when it had been green for three and a half hours. Each sentence had once been true. Neither carried the time it was true. The captain's response named the cost: when a report cannot distinguish past, present and future, the collaboration is bankrupt however good the work underneath — and the principle, in his words, hangs on the trust cornerstone.

---

## Constraints — What This Principle Requires and Prohibits

- A status with no tense is not a status. Rewrite it until a reader can place each claim as was, is, or will be.
- A tense with no observed time is marked unobserved, never inferred from context or from the last time the reporter looked.
- "Will be" names the gate that produces it, so the reader knows what to watch rather than when to hope.
- A before/after presentation keeps the two states visibly separate; one frame per state, never interleaved.
- This is a principle (why), not a format (how). Methods and operating contracts choose the line shape; they may not drop a tense or a time.

---

## The Test

If a reader who missed the last twelve hours can read one status and know what changed, what stands now, and what to expect next — and when each is true — the principle is satisfied. If they must ask "wait, is that still the case?", it is not.
