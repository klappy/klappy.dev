---
uri: oddkit://tools/orient
title: "oddkit_orient"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "orientation", "modes"]
---

# oddkit_orient

> Assess where a goal or idea sits epistemically before deciding what to do next.

## Description

`oddkit_orient` is the entry point for epistemic guidance. Given a goal, idea, or situation description, it determines the current epistemic mode (exploration, planning, or execution), surfaces what remains unresolved, and identifies the questions that must be answered before progressing.

This tool applies the epistemic modes defined in Canon (`klappy://canon/epistemic-modes`). It does not decide direction or priorities — it clarifies what kind of thinking is legitimate right now.

## When to Use

- At the start of any new initiative, goal, or conversation
- When uncertainty about the current phase is blocking progress
- When drift is suspected (work may have moved phases without acknowledgment)
- Before calling other epistemic guide tools, to establish shared context

## Tool Definition

**Name:** `oddkit_orient`

**Description:** Assess where a goal or idea sits epistemically. Determines the current mode (exploration, planning, or execution), surfaces what is unresolved, and identifies questions to answer before progressing. Call this first — before challenging, gating, or encoding — to establish epistemic context. Does not decide priorities or direction; it clarifies what kind of thinking is legitimate right now.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "The goal, idea, or situation to assess. Describe what you are trying to achieve or understand."
    },
    "knowledge_base_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    }
  },
  "required": ["input"]
}
```

### Response Shape (Observed)

```json
{
  "action": "orient",
  "result": {
    "status": "ORIENTED",
    "creed": [
      "string — orientation creed lines from canon/values/orientation.md"
    ],
    "current_mode": "exploration | planning | execution",
    "mode_confidence": "high | moderate | low",
    "assumptions": [
      "string — assumptions detected in the input"
    ],
    "suggested_questions": [
      "string — questions to answer before progressing"
    ],
    "canon_refs": [
      {
        "path": "string — file path#Section Name",
        "quote": "string — relevant excerpt from the referenced document"
      }
    ]
  }
}
```

## Behavioral Rules

1. **Infer mode from evidence, not labels.** A caller claiming "execution" while lacking artifacts is in exploration or planning regardless of the label.
2. **Surface unresolved items without resolving them.** Orient identifies what is open — it does not close gaps or make decisions.
3. **Prefer questions over declarations.** When mode is ambiguous, produce clarifying questions rather than forcing a classification.
4. **Detect drift signals.** If evidence suggests the work has moved phases without acknowledgment (e.g., code exists but no plan was encoded), flag this as a warning.
5. **Never collapse modes.** Do not combine exploration and execution into one assessment. Name the mode, name the obligations, name the risks.

## Canon References

- `klappy://canon/epistemic-modes` — The three modes, their truth conditions, obligations, and risks
- `klappy://canon/constraints/boundary-transitions-require-deceleration` — Why transitions require review
- `klappy://docs/agents/odd-epistemic-guide` — The epistemic guide role this tool supports
