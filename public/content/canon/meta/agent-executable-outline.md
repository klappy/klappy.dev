---
uri: klappy://canon/meta/agent-executable-outline
title: "Agent-Executable Documentation Outline"
audience: canon
exposure: nav
tier: 1
relevance: decision
voice: neutral
stability: stable
tags: ["templates", "agents", "documentation"]
execution_posture: governing
---

# Agent-Executable Documentation Outline

> Supplement human-readable documentation with decision leverage.

## Purpose

This outline defines **agent-useful sections** that may be added where appropriate.
It supplements catalog information without replacing it.

Only documents intended to influence behavior should use this structure fully.

---

## Section Contracts

### Subtitle — Trigger + Scope
**One sentence.**
When does this apply? What decision does it govern?

Good:
> "Use when validating user-visible changes; screenshots alone can falsely signal success."

---

### Description — Decision Model
1–2 short paragraphs.
What decision does this document govern?
What invariant must hold?
What goes wrong if ignored?

This is a compressed stance, not a catalog summary.

---

### Operating Constraints
Non-negotiables.
Use MUST / MUST NOT / NEVER.
No prose.

---

### Defaults
What to do when uncertain.
Heuristics, not rules.

---

### Failure Modes
Named traps you've actually seen.
Concrete and specific.

---

### Verification
What counts as "done."
Evidence required.
Unacceptable substitutes.

---

### Summary
Working-memory compression.
No history.
At least one testable heuristic.

---

### Examples
Minimal.
Good vs bad preferred.

---

### Background / Rationale
Optional.
Human-first.
Not required for execution.

---

### Related
Explicit links only.
No explanation.

---

## Applicability by Execution Posture

- Governing: most sections expected
- Operational: subset expected
- Exploratory: optional, light use
- Routing: usually omitted

---

## Final Rule

> **If a section would be forced, omit it deliberately.**

---

## Operating Constraints

- MUST use MUST/MUST NOT/NEVER in Operating Constraints, not prose
- MUST name Failure Modes concretely after traps actually observed
- MUST specify evidence requirements in Verification, not just outcomes
- MUST NOT fill sections just to satisfy tooling; omit deliberately instead
- MUST keep sections short (3-5 bullets typical); long sections indicate bloat

---

## Defaults

- Start with Subtitle and Operating Constraints only; add others based on observed failures
- Failure Modes are added when agents repeat known mistakes
- Verification is added when agents claim success prematurely
- Defaults are added when agents hesitate on uncertain decisions
- Background is optional and human-first; not required for execution

---

## Failure Modes

- **Form Filling**: Adding sections to satisfy tooling rather than encoding real constraints
- **Prose in Constraints**: Using explanatory sentences instead of actionable MUST/MUST NOT
- **Vague Failure Modes**: Labels without concrete traps (e.g., "Be careful" instead of named mistakes)
- **Outcome-Only Verification**: Stating what "done" looks like without specifying evidence
- **Section Bloat**: Long sections that should be split or moved to background

---

## Verification

- Operating Constraints contain verbs and objects ("MUST include X", "MUST NOT do Y")
- Failure Modes name specific traps observed in practice
- Verification specifies evidence type, not just desired outcome
- Sections are short enough for S-slice extraction (under 2000 chars typically)
- Forced or empty sections were omitted rather than filled with placeholders
