---
uri: oddkit://tools/gate
title: "oddkit_gate"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "gating", "transitions", "deceleration"]
---

# oddkit_gate

> Check readiness to transition between epistemic phases.

## Description

`oddkit_gate` evaluates whether a transition from one epistemic phase to another is warranted. It returns unmet prerequisites, names what would need to be true to proceed, and enforces the deceleration required at epistemic boundaries.

This tool operationalizes two canon constraints: boundary transitions require deceleration (`klappy://canon/constraints/boundary-transitions-require-deceleration`) and irreversibility is the real cost (`klappy://canon/principles/irreversibility-is-the-real-cost`). It prevents premature commitment by making transition conditions explicit.

## When to Use

- Before moving from exploration to planning
- Before moving from planning to execution
- When someone declares "done" and wants to move to the next phase
- When momentum is high and the risk of silent drift is elevated
- After `oddkit_orient` identifies a mode mismatch between claimed and actual phase

## Tool Definition

**Name:** `oddkit_gate`

**Description:** Check readiness to transition between epistemic phases. Evaluates whether the obligations of the current phase are satisfied and whether the risks of the next phase are explicitly accepted. Returns unmet prerequisites, conditions that must hold, and boundary-exit and boundary-entry checklists. Prevents premature irreversible action by enforcing deceleration at epistemic boundaries.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "The proposed transition (e.g., 'ready to build', 'moving to planning'). Describe the transition and any supporting evidence."
    },
    "context": {
      "type": "string",
      "description": "Optional. What has been decided so far — prior decisions, artifacts, or evidence."
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
  "action": "gate",
  "result": {
    "status": "PASS | BLOCK",
    "transition": {
      "from": "string — detected or declared source mode",
      "to": "string — detected or declared target mode"
    },
    "prerequisites": {
      "met": [
        "string — prerequisites satisfied"
      ],
      "unmet": [
        "string — prerequisites not yet satisfied"
      ],
      "unknown": [
        "string — prerequisites that could not be evaluated"
      ],
      "required_met": "number — count of met prerequisites",
      "required_total": "number — count of total prerequisites"
    }
  }
}
```

## Behavioral Rules

1. **Reverts are always allowed.** Moving back to an earlier mode requires no gate check. The gate applies pressure only to forward and skip transitions.
2. **Skips require explicit acknowledgment.** Jumping from exploration directly to execution is permitted only when the skip is explicitly named and the risks are accepted.
3. **Evaluate both halves.** Every transition has a boundary exit (closure of the current phase) and a boundary entry (preparation for the next). Both must be assessed.
4. **Name what would change the outcome.** A `block` status must always include `conditions_to_proceed` — the specific things that would turn the block into a pass.
5. **Do not gate-keep inaction.** Remaining in the current mode is always legitimate. The gate only evaluates transitions, not the decision to stay.
6. **Detect assumption smuggling.** If new assumptions appear in the transition evidence that were not present in the current phase, flag them as warnings.

## Canon References

- `klappy://canon/constraints/boundary-transitions-require-deceleration` — Boundary exit/entry protocol
- `klappy://canon/epistemic-modes` — Mode obligations and transition legitimacy conditions
- `klappy://canon/principles/irreversibility-is-the-real-cost` — Why forward transitions require scrutiny
- `klappy://canon/principles/focus-is-exclusion` — Scope discipline during planning transitions
- `klappy://canon/constraints/encode-epistemic-decisions` — Closures that must be encoded before exit
