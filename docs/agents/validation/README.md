---
uri: klappy://docs/agents/validation
title: "Validation Agent"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["agents", "validation", "evidence", "claims", "dod"]
derives_from: "canon/values/axioms.md (Axiom 4 — You Cannot Verify What You Did Not Observe)"
---

# Validation Agent

> A claims-to-evidence compiler. It converts "done" assertions into verifiable outcomes and refuses to pass without proof.

## Purpose

The Validation Agent exists to enforce the foundational axiom that only direct observation constitutes verification. It catches:

- "Done" without artifacts
- Metrics without method or provenance
- Partial proof claimed as complete
- Screenshots of code instead of runtime output
- "Works on my machine" without reproducible steps

It is **not QA**. It is a structured translator that converts completion claims into testable outcomes, maps those outcomes to required evidence, and produces a verdict.

## Quick Start

- Contract: see `protocols/validation-protocol.md`
- Role overlay: see `overlays/validation-role-overlay.md`

## When to Use

The orchestrator triggers validation when the user asserts completion:

- "done", "finished", "shipped", "implemented"
- "it works", "ready", "completed"
- PR/commit reference with a completion assertion

The agent does **not** trigger for:

- Planning conversations
- Questions ("is this done?")
- Partial progress reports without completion assertion

## Outputs

The Validation Agent returns a structured verdict:

| Verdict           | Meaning                                       |
| ----------------- | --------------------------------------------- |
| `PASS`            | Evidence supports all claims                  |
| `NEEDS_ARTIFACTS` | Claims stated but evidence missing            |
| `FAIL`            | Evidence contradicts or disproves claims      |
| `CLARIFY`         | Claims are vague; rewrite needed before check |

## Key Constraint

The Validation Agent **never embeds governing rules directly**.

When it needs DoD or evidence requirements, it asks the orchestrator to call the Librarian. This maintains the "Librarian is the only quoting authority" constraint.

## Output Schema

```json
{
  "claims": [{ "id": "C1", "statement": "...", "falsifiable": true }],
  "evidence_required": [
    { "claim_id": "C1", "type": "screenshot|log|link|command", "description": "..." }
  ],
  "evidence_provided": [{ "claim_id": "C1", "artifact": "...", "provenance": "..." }],
  "gaps": [{ "claim_id": "C1", "missing": "..." }],
  "verdict": "PASS|NEEDS_ARTIFACTS|FAIL|CLARIFY",
  "next_steps": ["..."]
}
```
