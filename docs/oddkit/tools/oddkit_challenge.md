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
    "claim": {
      "type": "string",
      "description": "The claim, assumption, or proposal to challenge. State it as the claimant would."
    },
    "claim_type": {
      "type": "string",
      "enum": ["assertion", "assumption", "proposal", "completion_claim", "scope_decision"],
      "description": "Optional. The nature of what is being challenged. Helps calibrate proportional pressure."
    },
    "context": {
      "type": "string",
      "description": "Optional. Surrounding context — current mode, prior decisions, relevant constraints, or evidence already gathered."
    },
    "stakes": {
      "type": "string",
      "enum": ["low", "moderate", "high", "irreversible"],
      "description": "Optional. How consequential this claim is. Higher stakes trigger more rigorous challenge. Defaults to moderate."
    }
  },
  "required": ["claim"]
}
```

### Response Shape

```json
{
  "challenged": "string — restated version of the claim being tested",
  "tensions": [
    {
      "source": "string — canon reference, prior decision, or evidence that creates tension",
      "description": "string — what the tension is",
      "type": "contradiction | gap | drift | scope_mismatch | weak_evidence"
    }
  ],
  "missing_evidence": [
    {
      "what": "string — evidence that would strengthen or refute the claim",
      "smallest_artifact": "string — the cheapest artifact that would increase certainty"
    }
  ],
  "risks": [
    {
      "risk": "string — an unexamined risk exposed by the challenge",
      "severity": "low | moderate | high",
      "mitigation": "string — what would reduce this risk"
    }
  ],
  "next_step": "string — one actionable step to increase certainty",
  "posture": "SUPPORTED | INSUFFICIENT_EVIDENCE | CONTESTED"
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
