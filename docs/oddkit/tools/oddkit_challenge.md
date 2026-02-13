---
uri: oddkit://tools/challenge
title: "oddkit_challenge"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "challenge", "validation"]
---

# oddkit_challenge

> Pressure-test a claim, assumption, or proposal against canon constraints.

## Description

`oddkit_challenge` applies constructive epistemic pressure to a specific claim, assumption, or proposal. It surfaces tensions, identifies missing evidence, and exposes unexamined risks — proportionally to the stakes involved. Challenge ends with an actionable next step, not a verdict.

This tool operationalizes the epistemic challenge constraint (`klappy://canon/epistemic-challenge`). It challenges claims, not people. It applies pressure proportionally. It preserves collaborative flow.

## When to Use

- When a claim sounds confident but lacks supporting evidence
- When assumptions are being treated as facts
- When a proposal has not been tested against known constraints
- When competing interpretations exist and no evidence distinguishes them
- When a "done" claim lacks artifacts

## Tool Definition

**Name:** `oddkit_challenge`

**Description:** Pressure-test a claim, assumption, or proposal. Surfaces tensions with canon constraints, identifies missing evidence, and exposes unexamined risks. Applies proportional challenge — lightweight for low-stakes claims, rigorous for irreversible commitments. Always ends with an actionable next step. Does not render verdicts; it raises the questions that would need answers to proceed with confidence.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "The claim, assumption, or proposal to challenge. State it as the claimant would."
    },
    "mode": {
      "type": "string",
      "enum": ["exploration", "planning", "execution"],
      "description": "Optional. Epistemic mode for proportional challenge."
    },
    "canon_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override."
    }
  },
  "required": ["input"]
}
```

### Response Shape (Observed)

```json
{
  "action": "challenge",
  "result": {
    "status": "CHALLENGED",
    "claim_type": "string — inferred type: observation | assertion | assumption | proposal",
    "tensions": [
      "string — tensions with canon or prior decisions"
    ],
    "missing_prerequisites": [
      "string — evidence or prerequisites not yet provided"
    ],
    "challenges": [
      "string — specific questions that would need answers to proceed"
    ],
    "suggested_reframings": [
      "string — alternative framings that would be stronger"
    ],
    "canon_constraints": [
      {
        "citation": "string — file path#Section Name",
        "quote": "string — relevant excerpt from canon"
      }
    ]
  }
}
```

## Behavioral Rules

1. **Challenge claims, not people.** Never frame output as personal criticism. The subject is the claim.
2. **Apply proportional pressure.** Low-stakes claims get lightweight challenge (one question). Irreversible commitments get rigorous scrutiny (full tension analysis, evidence audit, risk enumeration).
3. **End with an actionable step.** Every challenge must produce at least one concrete next action that would increase certainty. Challenge without a path forward is obstruction.
4. **Prefer retrieval over opinion.** When canon or prior decisions bear on the claim, cite them directly. Do not paraphrase governing sources.
5. **Name the posture explicitly.** If evidence is insufficient, say `INSUFFICIENT_EVIDENCE` — do not invent support. If the claim is contested by canon, say `CONTESTED`.
6. **Do not over-block.** If a cheap next step exists that would raise confidence, recommend it instead of halting progress.

## Failure Modes to Avoid

- **Harmony bias:** Agreeing to preserve flow while certainty collapses
- **Certainty laundering:** Citing irrelevant sources to appear supported
- **Vague pushback:** "I'm not sure" without naming what would change the conclusion
- **Over-blocking:** Halting when a cheap artifact request would suffice

## Canon References

- `klappy://canon/epistemic-challenge` — Operating constraints, defaults, failure modes
- `klappy://canon/epistemic-modes` — Mode-specific truth conditions that inform challenge
- `klappy://canon/principles/irreversibility-is-the-real-cost` — Why stakes calibration matters
- `klappy://docs/agents/overlays/epistemic-challenge-mode` — Behavioral overlay for challenge activation
