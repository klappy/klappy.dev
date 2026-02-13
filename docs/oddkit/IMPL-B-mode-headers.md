---
uri: klappy://docs/oddkit/impl-b-mode-headers
title: "Implementation: Optional Epistemic Mode Headers"
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: evolving
status: superseded
tags: ["oddkit", "implementation", "epistemic-modes"]
---

# Implementation Instruction Set B

**Superseded (E0005.1):** Mode headers described here were not implemented. Explicit mode declaration is handled by the `declared_mode` parameter in `oddkit_orient`.

---

## Add optional epistemic mode headers in conversations

---

## Intent

Allow humans and agents to explicitly signal epistemic intent without requiring it.

This preserves the separation between:

- idea shaping
- planning
- execution

...without turning conversations into ceremony.

---

## Scope

**Where this applies:**

- agent prompts
- orchestrator inputs
- oddkit CLI messages
- conversational interfaces

**Where it does NOT apply:**

- Canon documents
- Validation logic
- Librarian retrieval rules

---

## Requirements

### 1. Support optional headers

Recognize (case-insensitive):

```
[Mode: Exploration]
[Mode: Planning]
[Mode: Execution]
```

Header must:

- be optional
- appear at the top of a message
- not affect message content

### 2. Override inference when present

- If header exists, it takes precedence over detection
- If absent, system falls back to inference

### 3. Expose header to tools

Expose to:

- `oddkit explain`
- debug output
- explainable reasoning

**Not** to:

- enforcement logic (yet)

### 4. Never require headers

- No warnings
- No errors
- No "best practice" nags

---

## Acceptance Criteria

- [ ] Messages with headers:
  - are parsed correctly
  - influence detected mode
  - are reflected in explain output
- [ ] Messages without headers behave exactly as before
- [ ] Removing headers does not break flows

---

## Explicit Non-Goals

- ❌ No forced workflows
- ❌ No rejection based on mode
- ❌ No automatic transitions
- ❌ No requirement that users "get it right"

**This is clarity, not compliance.**

---

## Depends On

- **Canon: Epistemic Modes** — defines the modes
- **docs/oddkit/modes.md** — defines oddkit's mode behavior contract
- **Instruction Set A** — must be complete first (explain output must exist)

---

## Sequencing Note

This instruction set should only be executed **after Instruction Set A is validated**.

The order matters:

1. Annotation first → visibility without pressure
2. Headers second → voluntary alignment
3. Enforcement only after reality proves the value

Trust before control. Explanation before instruction. Structure that emerges instead of being imposed.
