---
uri: klappy://docs/examples/qa-validation-odd-vs-ddd
title: "From Execution to Outcome: A QA Validation Case Study"
audience: docs
exposure: nav
tier: 2
stability: evolving
voice: neutral
tags:
  - odd
  - qa
  - agents
  - validation
  - case-study
---

# From Execution to Outcome  
## A QA Validation Case Study

This example illustrates the practical difference between documentation-driven development and outcomes-driven development.

The scenario involves an AI agent tasked with supporting a QA validation workflow.

## The Initial Failure Mode (Without ODD)

When given a task without structured epistemic guidance, the agent:

- Quickly executed instructions
- Generated artifacts that *appeared* complete
- Skipped critical clarification steps
- Assumed implicit definitions of "done"

From a surface level, work was happening.  
From an outcome perspective, validation quality did not improve.

This mirrors a common human failure mode:  
**motion mistaken for progress.**

## Introducing ODD Constraints

Once ODD constraints were applied, the agent was required to:

- Explicitly define the intended outcome *before* execution
- Identify what evidence would demonstrate success
- Surface assumptions about quality thresholds
- Treat ambiguity as a signal to pause, not proceed

This was not a documentation exercise for record-keeping.  
It was a behavioral constraint.

Execution was intentionally slowed until outcome clarity improved.

## The Shift in Behavior

With ODD in place, the agent:

- Asked better questions
- Deferred execution when success criteria were unclear
- Iterated on the definition of validation itself
- Produced outputs that were easier to evaluate and trust

Most importantly, the QA manager reviewing the results did not simply receive "better documentation."

She received **leverage**.

## The Outcome Difference

The value was not that the QA manager became more efficient at reviewing artifacts.

The value was that:
- QA validation aligned more tightly with real needs
- Fewer false positives passed as "complete"
- Quality discussions moved upstream, before rework was required

The system improved outcomes *through* her role — not merely her performance.

## Why This Is Not Documentation-Driven Development

A documentation-driven approach would have focused on:
- Better reports
- More complete records
- Clearer explanations after the fact

ODD focused on:
- Redefining what success meant *before* acting
- Forcing discomfort around incomplete outcome definitions
- Treating execution without clarity as a failure condition

Documentation existed — but only as a mechanism to enforce this shift.

## Why This Is Just the Beginning

This example represents an early application of ODD.

As the system matures, QA itself may be re-examined:
- What counts as "quality"?
- Who defines it?
- How early can validation meaningfully occur?

ODD does not answer these questions upfront.  
It creates the conditions where they cannot be avoided.

That is its power.
