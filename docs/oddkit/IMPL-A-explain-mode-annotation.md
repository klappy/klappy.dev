---
uri: klappy://docs/oddkit/impl-a-explain-mode-annotation
title: "Implementation: Annotate oddkit explain with Epistemic Mode"
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: evolving
status: superseded
tags: ["oddkit", "implementation", "epistemic-modes"]
---

# Implementation Instruction Set A

**Superseded (E0005.1):** The `explain` action described here was never implemented as a standalone tool. The concept of epistemic mode annotation is handled by `oddkit_orient`, which returns `current_mode` and `mode_confidence` in every response.

---

## Lightly annotate oddkit explain output with detected epistemic mode

---

## Intent

Surface epistemic context without enforcing it.

The goal is not to control behavior, but to:

- increase user/agent self-awareness
- make mode mismatches visible
- preserve trust by explaining why oddkit behaved a certain way

This must remain **advisory, not normative**.

---

## Scope

**Files likely involved** (do not assume exact names):

- `src/explain/*` or renderer responsible for `oddkit explain`
- any debug or metadata structure already containing mode signals

**DO NOT touch:**

- Canon documents
- docs (except this instruction set)

---

## Requirements

### 1. Detect epistemic mode

Use existing signals only:

- tool invoked (librarian, validate)
- presence of artifacts
- completion claims
- question vs statement form

**Do NOT invent new heuristics yet.**

### 2. Annotate explain output

Add a small, optional section near the top:

```
Epistemic Mode (detected): Exploration | Planning | Execution
Confidence: low | medium | high
```

This must be:

- informational
- non-blocking
- non-judgmental

### 3. Explain impact (one sentence max)

Example:

> "This influenced behavior by deferring validation until artifacts are present."

### 4. Never fail or warn due to mode

- Mode detection must not change verdicts
- No errors, no refusal, no gating

---

## Acceptance Criteria

- [ ] Running `oddkit explain --last` shows:
  - detected mode
  - confidence level
  - brief explanation
- [ ] Removing the section would not change system behavior
- [ ] Users can ignore it without penalty

---

## Explicit Non-Goals

- ❌ No mode enforcement
- ❌ No policy rules
- ❌ No promotion logic
- ❌ No Canon changes

**This is observability, not governance.**

---

## Depends On

- **Canon: Epistemic Modes** — defines the modes
- **docs/oddkit/modes.md** — defines oddkit's mode behavior contract

---

## Next

After this is validated, proceed to **Instruction Set B** (mode headers).
