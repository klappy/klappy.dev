---
uri: klappy://canon/methods/pdsa-ramps
title: "PDSA Ramps — Prove the Pattern Before Widening the Batch"
audience: canon
exposure: draft
tier: 2
voice: neutral
stability: draft
tags: ["canon", "methods", "pdsa", "learning", "scaling", "verification"]
epoch: E0012
date: 2026-10-22
status: proposed
derives_from: "canon/values/axioms.md, canon/principles/progress-over-perfection.md, canon/constraints/verification-and-evidence.md, canon/principles/verification-requires-fresh-context.md, canon/principles/irreversibility-is-the-real-cost.md, canon/principles/specs-lock-at-implementation.md, canon/principles/dry-canon-says-it-once.md"
complements: "canon/methods/toc-ooda-sprints.md, docs/guides/pdsa-ramps-in-practice.md"
target_repo: "outcomes-driven-development"
---

# PDSA Ramps — Prove the Pattern Before Widening the Batch

> Keep acceptance and verification fixed. Test a small, complete, representative slice; compare what happened with what was predicted; then adapt, retain or abandon the pattern. Increase the batch only when fresh verification shows it repeats under relevant conditions. Shrink it when failures expose uncertainty. This proposed method adds a learning decision to existing work, with every approval boundary intact.

## Description — A Small Test Earns the Next Test

A pattern that works once can still fail when repeated, integrated or used under different conditions. PDSA Ramps make that uncertainty the subject of the next test. Each Plan–Do–Study–Act cycle leaves evidence that changes the next cycle's question, conditions or batch size.

Klappy reports that starting small, validating a pattern and increasing the batch as confidence grows has long been his way of working, before he knew the PDSA name. That is personal testimony, not an independently researched history. This draft documents an application of existing canon; it claims neither invention of PDSA nor demonstrated effectiveness across every kind of work.

## Summary — Grow From Representative Evidence, Keep the Standard Fixed

Start with the agreed outcome and acceptance criteria, including approved content, design, layout and components where relevant. Choose the smallest complete slice that can answer the important uncertainty, including the integrations needed to make the result meaningful. Predict what will happen and decide what to observe. Carry out the test, record surprises, and obtain the fresh verification the work requires. Study the difference between the prediction and the observed result before choosing what to retain, change or abandon.

The next cycle may repeat the same size under a new condition, shrink to isolate a failure, or widen after representative verified repeatability. A clean first attempt earns another test; it does not prove scale. There is no automatic batch multiplier. Acceptance stays fixed within its agreed contract; a changed contract follows the existing planning and approval path. Publication, voice, secrets, revenue and other costly commitments keep their existing gates.

This method addresses the evidence for changing a batch. [ToC OODA Sprints](/canon/methods/toc-ooda-sprints.md) addresses constraint selection and orchestration; its tasting status and open operator questions remain. Use PDSA learning inside the existing work and review record, with premortem risks informing what to test and the established sprint cadence setting the checkpoint. Do not add a second mandatory ceremony. Reconsider the method if its overhead exceeds saved rework or if apparently representative tests repeatedly hide integration failures.

## Content — Link Tests Through What They Teach

### Plan the Question and a Complete Slice

Name the uncertainty that blocks justified growth: whether the accepted design can be reproduced, whether a handoff preserves meaning, or whether an integration holds under expected conditions. State a prediction and the observations that would support or contradict it. Include the cost of rework and reviewer attention when efficiency is the claim.

Cut scope rather than quality. One complete user path can be a useful test; an isolated component that avoids the uncertain handoff may answer the wrong question. Choose conditions that matter to the next intended batch. The easiest case is a useful starting point only when its limits stay visible.

### Do the Test Against the Agreed Contract

Run the bounded test as planned. Record what happened, including departures, failed checks and unexpected work. Keep observed results separate from expectations. [Verification & Evidence](/canon/constraints/verification-and-evidence.md) supplies the evidence standard; [Fresh Context](/canon/principles/verification-requires-fresh-context.md) supplies the separation between creator and consequential reviewer.

A timebox ending does not turn unfinished work into an accepted slice. Record the partial result and carry the unanswered question into the next bounded test.

### Study the Prediction, the Result and the Limits

Ask what the result taught that was unknown before the test. Compare the prediction with observations: which parts repeated, which needed intervention, which integration or condition was untested, and what side effects appeared? Passing acceptance establishes the slice's result. Study establishes what can reasonably be carried into the next test.

A successful sample under one condition supports that condition. Before widening, test the variation that could plausibly break the next batch. The amount of repetition depends on the uncertainty and consequence; this method prescribes no universal sample count or statistical confidence threshold.

### Act by Changing the Next Test, Then Grow Conditionally

Retain the parts supported by evidence, adapt the parts contradicted by it, or abandon a change that does not help. Use the existing durable work record for the question, prediction, observations, learning, limits and next test. A separate PDSA log is unnecessary when those facts already have a home.

Keep the batch small while uncertainty remains. Widen when representative repeat tests preserve acceptance, pass the required independent checks and show that the relevant handoffs hold. Carry the verified pattern forward as the working baseline, with its limits attached. When a larger batch fails, reduce its size or isolate the failing condition before spreading the pattern further.

Learning may change the proposed solution or next test. It cannot silently amend a locked implementation contract: [Specs Lock at Implementation](/canon/principles/specs-lock-at-implementation.md) governs that boundary. [Irreversibility Is the Real Cost](/canon/principles/irreversibility-is-the-real-cost.md) governs the move from disposable test to consequential commitment.

## Fit — One Learning Pattern Inside the Existing Loop

The [Methods collection](/canon/methods/README.md) defines application patterns, without granting new authority. [Progress Over Perfection](/canon/principles/progress-over-perfection.md) already supplies the small verifiable increment. The ToC method already says to widen after the smaller shape holds. This method makes one narrower decision reproducible: what was learned, under which conditions, and why that evidence warrants the next batch's size.

ToC identifies where learning would relieve the constraint; OODA updates the decision from current observations. A premortem identifies failure conditions worth including in the test. Sprint cadence bounds the next opportunity to inspect evidence. Those remain parts of the existing operating context, not four additional PDSA loops.

Use this pattern when repetition or widening creates uncertainty worth testing. For a single settled action with no scaling question, use the existing execution and verification path. For an irreversible action, a small test informs the decision while the required approval still governs the action.

## Failure Modes — Reduce Scope When Confidence Outruns Evidence

| Observed problem | Response |
|---|---|
| A deadline is met by loosening acceptance or skipping proof | Restore the agreed standard; reduce the batch. |
| A component passes while the full path or handoff remains untested | Complete the representative path before claiming repeatability. |
| Repeated identical easy cases are treated as evidence for different conditions | Test the relevant variation and state the remaining limits. |
| A pass/fail result produces no learning or change to the next test | Compare prediction and observation; name what the next test will resolve. |
| A growing batch causes rework or review congestion | Shrink it and test the source of the failure. |
| PDSA paperwork duplicates an existing record without changing a decision | Fold the evidence into that record; remove the duplicate. |

## Provenance — Borrowed Terminology, Proposed Application

The [Institute for Healthcare Improvement's Model for Improvement](https://www.ihi.org/library/model-for-improvement/testing-changes) describes PDSA as learning through planned tests, observed results and subsequent changes. Linked tests examine varying conditions before broader implementation; such linked cycles are called a PDSA ramp. The term is borrowed here.

The proposed application combines that learning pattern with the cited canon's existing standards. Its personal origin is Klappy's reported practice on 2026-10-22. Comparative results at unchanged acceptance are still needed to establish whether this formulation reduces rework and attention cost. The [practical account](/docs/guides/pdsa-ramps-in-practice.md) separates that testimony from an illustrative application.

## See Also

- [Progress Over Perfection](/canon/principles/progress-over-perfection.md) — small steps with verifiability as the floor.
- [ToC OODA Sprints](/canon/methods/toc-ooda-sprints.md) — the existing tasting orchestration method and scaling ladder.
- [DRY — The Canon Says It Once](/canon/principles/dry-canon-says-it-once.md) — reference governing content rather than repeating it in prompts or runtimes.
- [PDSA Ramps in Practice](/docs/guides/pdsa-ramps-in-practice.md) — personal origin and a worked example.
