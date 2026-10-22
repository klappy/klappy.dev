---
uri: klappy://docs/guides/pdsa-ramps-in-practice
title: "PDSA Ramps in Practice — Start Small Without Lowering the Bar"
audience: docs
exposure: draft
tier: 3
voice: first_person
stability: draft
tags: ["docs", "pdsa", "practice", "learning", "scaling"]
epoch: E0012
date: 2026-10-22
status: proposed
derives_from: "canon/methods/pdsa-ramps.md, canon/principles/progress-over-perfection.md, canon/constraints/verification-and-evidence.md, canon/principles/verification-requires-fresh-context.md, canon/principles/specs-lock-at-implementation.md, canon/principles/irreversibility-is-the-real-cost.md"
complements: "canon/methods/toc-ooda-sprints.md"
---

# PDSA Ramps in Practice — Start Small Without Lowering the Bar

> When a large batch would repeat an uncertain pattern, finish one small representative slice at the agreed standard, study what happened, and repeat under the conditions that matter. Grow the batch from verified repeatability. Keep the standard and the approvals fixed. This draft connects Klappy's reported way of working with the borrowed name PDSA Ramp.

## Description — Find the Mistake While It Is Still Small

Discovering a mistake after repeating it across a whole project creates a familiar kind of waste: every copy needs fixing, and someone has to inspect them all again. A complete small slice lets the work meet reality before the uncertain pattern spreads. The useful question is what that slice teaches about doing the next one.

The personal account below is a draft of Klappy's self-description supplied on 2026-10-22, retained for his exact-text review before publication. It is not independent historical research. The example that follows illustrates the method; it reports no completed implementation or measured result.

## Summary — Increase the Batch After the Pattern Holds

I have always worked this way without knowing its official name: start small, validate the pattern, then increase the batch as confidence grows. PDSA Ramp gives me a name for that practice. Efficiency still means doing the agreed work well. Approved content, design, layout and components remain the standard; the amount attempted at once can change.

In practice, choose one small complete slice, predict what it will demonstrate, and observe the result. Have a fresh reviewer check the actual work. Then study what repeated, what surprised you and what remains untested. The next cycle may stay small, change a condition, or grow once the evidence supports it. A failure is a reason to narrow the next test, not lower acceptance. The [proposed method](/canon/methods/pdsa-ramps.md) carries the full pattern and its source boundaries; existing planning, verification and publication approvals still apply.

ToC helps choose the constraint to address, OODA keeps that choice current, premortems expose risks to test, and the established sprint cadence provides a checkpoint. Keep the learning in the existing work record. If the extra process costs more attention than it saves, simplify it and reconsider the method.

## Outline

- A Familiar Practice Acquires a Name
- One Complete Slice Can Reveal the Pattern
- Study Decides Whether the Next Batch Grows
- Put the Next Test in the Existing Work

---

## A Familiar Practice Acquires a Name

The starting point is the way of working I described: try a small amount, validate it, and do more as confidence grows. The name came afterward. It gives the practice a clearer shape because it asks for something beyond finishing and checking: study what the test taught before deciding what to do next.

The [Institute for Healthcare Improvement](https://www.ihi.org/library/model-for-improvement/testing-changes) calls linked Plan–Do–Study–Act cycles a PDSA ramp. Each test informs the next, including tests under different conditions before a change spreads. That is the borrowed vocabulary. My self-description explains why I recognize the pattern; it does not establish that every past project followed a documented PDSA process.

## One Complete Slice Can Reveal the Pattern

Consider reproducing an approved website. A team could build all the pages before anyone sees a complete result. If its interpretation of the layout is wrong, the same mistake may spread through every page.

In the current application, the chosen starting point is the QR slice, followed by work forward from Home through the user journey. That sequence is a local choice. What travels is the reason for choosing a calibration slice: it must expose the uncertain pattern without avoiding the integrations that could break it.

Before work begins, record a prediction such as: “This slice will reproduce the approved content and layout using the agreed components, and its connected user path will work under the named review conditions.” Record what would contradict it. If the slice omits the difficult handoff, it cannot tell us whether that handoff will work when the batch grows.

The example remains a plan for learning. It makes no claim that the QR slice or any page has passed review.

## Study Decides Whether the Next Batch Grows

After the test, acceptance and learning answer different questions. Did the slice meet the agreed standard? What does that result tell us about repeating it?

A fresh reviewer might find a mismatch. Correcting that mismatch may be the next small test. The slice might pass while leaving an important condition unexamined; then repeat at the same size under that condition. If representative repeats preserve acceptance and the relevant handoffs hold, a wider batch has evidence behind it. Choose its size from the remaining uncertainty and the cost of being wrong. There is no automatic doubling rule.

A larger batch can still fail. Reduce it, isolate what changed, and test again. Keep the content and design standard fixed. If learning calls for a different contract, take it through the existing planning and approval path rather than quietly changing what “accepted” means. Publication and other consequential commitments keep their own approvals too.

## Put the Next Test in the Existing Work

Use the work record already in use to capture the question, prediction, observed result, learning, untested conditions and next test. That is enough to make the next decision inspectable without creating another reporting system.

For the next uncertain batch, write down one question: what must this small complete slice teach before it is sensible to repeat it more widely? Keep the answer tied to evidence. Later comparable work at the same acceptance standard should show whether the practice saves rework and attention; repeated hidden failures or excess process would count against it.

## See Also

- [PDSA Ramps](/canon/methods/pdsa-ramps.md) — the proposed application pattern and its limits.
- [Progress Over Perfection](/canon/principles/progress-over-perfection.md) — reduce the step while keeping verification intact.
- [ToC OODA Sprints](/canon/methods/toc-ooda-sprints.md) — the existing tasting account of prioritization, cadence and orchestration.
