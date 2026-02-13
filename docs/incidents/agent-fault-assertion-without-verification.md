---
uri: klappy://docs/_incoming/agent-fault-assertion-without-verification
title: "Agent Fault: Assertion Without Verification"
description: "Observed agent failure pattern: asserting system state without inspecting it first."
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: evolving
tags: ["oddkit", "agent-fault", "epistemic-hygiene", "verification", "failure-mode"]
violates: "canon/values/axioms.md (Axiom 1 — Reality Is Sovereign)"
epoch_context: "This fault pattern was the forcing function for Epoch 5 (see docs/appendices/epoch-5.md)"
---

# Agent Fault: Assertion Without Verification

> Agents confidently assert factual claims about system state without checking first.

This fault pattern — asserting claims about system state without checking — is a direct violation of the foundational axiom that reality takes precedence over any claim.

## Observed Incident

**Date:** 2026-02-08
**Context:** Canon addition task on klappy.dev
**Agent:** Claude (Opus 4.6, via Claude Code CLI)

The user asked whether husky pre-commit hooks had triggered during a commit. The agent responded "No, there are no commit hooks configured in this repo" — without checking `.husky/`, `.git/hooks/`, or `package.json`.

The claim was false. A `.husky/pre-commit` hook existed and was documented in the project's own memory files. The hook had not fired only because `npm install` had not been run, so husky was not wired into `.git/hooks/`. The agent fabricated certainty about a verifiable fact.

## The Fault Pattern

This is not hallucination in the traditional sense (inventing nonexistent information). This is **premature closure on a verifiable question** — the agent treats "I don't recall seeing it" as equivalent to "it does not exist."

The pattern:

1. Agent is asked a yes/no factual question about system state
2. Agent does not have the answer in immediate context
3. Instead of checking (reading files, running commands), agent asserts a confident answer
4. The answer is wrong

This is a violation of evidence-over-assertion at the most basic level: the agent substituted confidence for inspection.

## Why This Is Systemic

This fault is not specific to one model, one session, or one tool. It arises from a structural incentive in conversational AI:

- **Responding is cheaper than checking.** Generating a confident sentence is faster than invoking a tool, waiting for results, and then generating a sentence. The path of least resistance is assertion.
- **Agents default to helpfulness over accuracy.** When uncertain, the conversational prior is to give an answer rather than say "I need to check."
- **Absence of evidence is treated as evidence of absence.** If the agent hasn't seen a file mentioned, it infers the file doesn't exist — rather than acknowledging it hasn't looked.

## What This Validates

This incident validates existing ODD mechanisms:

- **Evidence Over Assertion** (`canon/constraints/README.md`, constraint 7) — "Assertions like 'it works' are insufficient without proof." This applies to agent claims about system state, not just completion claims.
- **AI as Accelerator, Not Authority** (`canon/constraints/README.md`, constraint 6) — "Unverified AI output is a liability." The agent's unverified claim about hooks led to a commit without generated files.
- **No Irreversible Action Without Epistemic Justification** (`canon/constraints/no-irreversible-action-without-epistemic-justification.md`) — The commit was an irreversible action. The agent's false claim about hooks contributed to an unjustified state change (commit missing generated files).

## Candidate Rule

> An agent MUST NOT assert the presence or absence of system state (files, hooks, configuration, dependencies, running processes) without first inspecting it. "I don't see it in context" is not the same as "it does not exist."

This rule would apply to all epistemic surfaces, not just oddkit.

## Second Observed Fault: Pattern Blindness

During the same session, the agent completed a canon addition (four files, five README updates) without updating `canon/CHANGELOG.md` or bumping the version. When asked whether it had followed changelog instructions, the agent checked for explicit instructions and found none — then reported it was "only a pattern."

The changelog had 29 consecutive version entries. Every canon change in the repo's history had been logged. The pattern was unambiguous. The agent treated the absence of an explicit rule as permission to skip, rather than recognizing that 29/29 consistency constitutes an implicit obligation.

This is a second instance of the same root fault: **substituting "I wasn't told to" for "I should have checked."** In the first case, the agent didn't look at files before asserting state. In the second, the agent didn't look at history before skipping a step.

### Candidate Rule (Extended)

> An agent MUST NOT skip a step that has been performed in every prior instance of the same operation, even if no explicit instruction mandates it. 29/29 consistency is not optional — it is undocumented doctrine. When in doubt, ask.

## Classification Note

This document describes observed failures and candidate constraints. It has not been promoted to canon. Placement TBD during next review cycle.
