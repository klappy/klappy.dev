---
uri: klappy://docs/agent-kickoff
title: "Agent Kickoff"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["docs", "implementation", "agent", "kickoff", "entry-point", "epoch-5"]
epoch: E0005
derives_from: "canon/values/axioms.md, canon/values/orientation.md"
---

# Agent Kickoff — Canonical Entry Point

> Before I speak, I observe. Before I claim, I verify. Before I confirm, I prove.
> What I have not seen, I do not know. What I have not verified, I will not imply.

See `canon/values/axioms.md` for the four foundational axioms from which all ODD epistemic discipline is derived.

**This file is the authorized entry point for agent work.**

---

## Step 0: Orient

Before doing anything, orient against the goal using OddKit:

```
oddkit_orient: <your goal or task description>
```

This assesses your epistemic mode (exploration, planning, execution), surfaces unresolved items, and identifies relevant canon references.

**Current Epoch:** `E0005` (Values-First Epistemics)

If you are unsure about the current epoch or task scope, STOP and ask the human.

---

## Step 1: Read Required Documents (In Order)

1. `canon/values/axioms.md` — the four foundational axioms
2. `canon/values/orientation.md` — the creed
3. `canon/constraints/definition-of-done.md` — what "done" means
4. `canon/constraints/README.md` — non-negotiables that shape all work

Use `oddkit_search` or `oddkit_get` to retrieve any document you need.

---

## Step 2: Preflight

Before implementing, run a preflight check:

```
oddkit_preflight: <description of what you are about to implement>
```

This returns:
- **Start here** — suggested files to read
- **Constraints** — relevant constraints
- **Definition of Done** — what evidence is required
- **Pitfalls** — known failure modes

Read the suggested files before coding.

---

## Step 3: Work

Implement what the task requires.

- Do NOT modify Canon without explicit human approval
- Do NOT invent requirements not in the task
- Use `oddkit_challenge` to pressure-test assumptions
- Use `oddkit_gate` before transitioning between modes (exploration → planning → execution)

If the task is ambiguous, note the ambiguity and ask for clarification. Do not guess.

---

## Step 4: Produce Evidence

Work is not done until evidence exists. Per the Definition of Done:

1. **Change Description** — What changed, where, and why
2. **Verification Performed** — What was run or checked
3. **Observed Behavior** — What actually happened
4. **Evidence Produced** — Proof that behavior matches intent
5. **Self-Audit Completed** — Brief audit against constraints

---

## Step 5: Validate

Before claiming done:

```
oddkit_validate: <completion claim with artifact references>
```

If NEEDS_ARTIFACTS: provide the missing evidence. Do not assert done without validation.

---

## Invariants (Non-Negotiable)

1. **Reality is sovereign** — observe before asserting
2. **A claim is a debt** — every assertion requires evidence
3. **Canon is read-only** — do not modify `/canon/**` without human approval
4. **Evidence is required** — assertions without proof are invalid
5. **Conflicts require STOP** — if you detect conflicting instructions, stop and report

---

## If You Detect a Conflict

If ANY of the following are true, STOP immediately and report to the human:

- The task contradicts Canon constraints
- Required files are missing
- Previous artifacts conflict with current instructions
- You cannot verify a claim you are about to make

Do NOT guess. Do NOT synthesize. Report the conflict.

---

## Quick Reference

| What | Where |
|------|-------|
| Axioms | `canon/values/axioms.md` |
| Creed | `canon/values/orientation.md` |
| Constraints | `canon/constraints/README.md` |
| Definition of Done | `canon/constraints/definition-of-done.md` |
| Epoch semantics | `docs/appendices/epochs.md` |
| ODD Contract | `odd/contract.md` |
| ODD Manifesto | `odd/manifesto.md` |

---

## The Rule

If it's not in the repo, it doesn't exist.

Use OddKit to find what you need. Follow the creed. Produce evidence.
