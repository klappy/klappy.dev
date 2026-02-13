---
uri: oddkit://tools/encode
title: "oddkit_encode"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "encoding", "decisions", "durability"]
---

# oddkit_encode

> Capture a decision, insight, or boundary as a durable record.

## Description

`oddkit_encode` creates a structured decision artifact from a decision, insight, or boundary that has been reached. The record captures what was decided, what was rejected, and what evidence supported the choice — making settled ground inspectable and preventing re-litigation.

This tool operationalizes the canon constraint that epistemic decisions must be encoded (`klappy://canon/constraints/encode-epistemic-decisions`). Without encoding, settled ground does not stay settled. Agents re-litigate instantly; humans re-litigate slowly. The result is the same: reasoning resets instead of compounding.

## When to Use

- After a decision has been reached and confirmed
- After `oddkit_gate` passes a transition (encode the closure before moving on)
- When scope, boundaries, or refusal conditions are defined
- When "done" criteria are established
- When an assumption is promoted to a working constraint
- When repeated arbitration on the same question signals a missing record

## Tool Definition

**Name:** `oddkit_encode`

**Description:** Capture a decision, insight, or boundary as a durable, inspectable record. Records what was decided, what was rejected and why, and what evidence supported the decision. Prevents re-litigation of settled ground. Call after reaching a decision, passing a gate check, defining scope, or establishing "done" criteria. The output is a structured decision artifact suitable for future reference by humans and agents.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "The decision, insight, or boundary to capture. State it clearly. Include 'because...' for rationale."
    },
    "context": {
      "type": "string",
      "description": "Optional. Supporting context — goal, phase, alternatives considered, or constraints."
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
  "action": "encode",
  "result": {
    "status": "ENCODED",
    "artifact": {
      "title": "string — truncated title derived from the decision",
      "type": "decision",
      "decision": "string — the full decision text",
      "rationale": "string — extracted rationale, or '(not provided)' if missing",
      "constraints": [
        "string — constraints created by this decision"
      ],
      "status": "draft | active",
      "timestamp": "string — ISO 8601 timestamp"
    },
    "quality": {
      "level": "insufficient | adequate | strong",
      "score": "number — 1-5 quality score",
      "max_score": 5,
      "gaps": [
        "string — missing elements that would improve the record"
      ],
      "suggestions": [
        "string — specific improvements to strengthen the encoding"
      ]
    }
  }
}
```

## Behavioral Rules

1. **Require the decision to be stated clearly.** Vague or compound decisions must be split or clarified before encoding. "We decided some stuff" is not encodable.
2. **Encourage rejected alternatives.** The most durable records include what was *not* chosen and why. If rejected alternatives are absent, emit a warning — do not block.
3. **Distinguish evidence from hypothesis.** If the decision lacks supporting evidence, encode it as a hypothesis rather than a fact. Both are valid; the distinction prevents false confidence.
4. **Include invalidation conditions when possible.** Decisions without invalidation conditions are harder to revisit legitimately. Suggest conditions when the caller omits them.
5. **Never encode silently.** The caller must explicitly supply the decision. Encode does not infer or fabricate decisions from conversation history.
6. **Prefer stable language.** Decision records are consumed by future humans and agents. Use precise, unambiguous language. Avoid jargon, idioms, or context-dependent phrasing.

## Canon References

- `klappy://canon/constraints/encode-epistemic-decisions` — Why encoding is required and what counts as epistemic
- `klappy://canon/constraints/boundary-transitions-require-deceleration` — Closures that must be encoded at boundary exit
- `klappy://canon/epistemic-modes` — Mode-specific obligations that produce encodable decisions
- `klappy://canon/principles/focus-is-exclusion` — Scope closures and non-goals as first-class decisions
