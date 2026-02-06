---
uri: klappy://docs/decisions/D0006
title: "D0006: Dogfooding Requirement"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "dogfooding", "validation"]
---

# Dogfooding Requirement

> Agents must apply canon documents to their work, not just read them, validating documentation through actual use.

## Description

This decision mandates that agents building klappy.dev must internalize and apply the canon documents they're showcasing. ATTEMPT.md must demonstrate application of constraints and decision rules through a 9-section self-audit checklist. This validates the documentation itself—if agents can't follow it, the documentation needs fixing.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0006 — Dogfooding Requirement

## Decision

Agents building klappy.dev must actually FOLLOW the canon documents they're showcasing, not just read them. ATTEMPT.md must demonstrate internalization of constraints and decision rules.

## Status

**Active**

## Why

- klappy.dev is a docs site that showcases AI build processes
- If agents don't follow the documented processes, the documentation is unvalidated
- "Read the docs" is not the same as "apply the docs"
- This validates the documentation itself — if agents can't follow it, it needs fixing

## Consequences

- ✅ Documentation is validated by actual use
- ✅ Unclear or contradictory docs get flagged as feedback
- ✅ ATTEMPT.md becomes evidence of process adherence
- ⚠️ More overhead for agents (must document constraint application)
- ⚠️ Self-audit checklist adds 9 sections to ATTEMPT.md

## Implementation

- Prompt: `/docs/PROMPT_ATTEMPT_KICKOFF.txt` specifies dogfooding requirement
- Template: ATTEMPT.md template includes self-audit checklist

### Required Canon Documents

| Document | How to Apply |
|----------|--------------|
| `/canon/constraints/README.md` | Note which constraints were relevant, any overrides |
| `/canon/constraints/decision-rules.md` | Note which rules guided approach choices |
| `/canon/methods/self-audit.md` | Complete all 9 sections in ATTEMPT.md |
| `/canon/constraints/definition-of-done.md` | Meet all requirements before claiming completion |

### Self-Audit Checklist (9 Sections)

1. Intended Outcome
2. Constraints Applied
3. Decision Rules Followed
4. Verification Performed
5. Evidence Produced
6. UX and Behavior Check
7. Tradeoffs and Risks
8. Maintainability Check
9. Confidence Level

## Evidence

- Commit: `43e8428` — "feat: add dogfooding requirement - agents must apply canon docs not just read them"
- Commit: `157a2f3` — "feat: bulletproof attempt workflow - mandatory completion gates"
- Problem observed: Agents were reading canon docs but not applying them to their work
