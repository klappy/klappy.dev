---
uri: klappy://canon/validation-as-epistemic-mode
title: "Validation as Epistemic Mode"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["epistemology", "decision-making", "governance", "validation", "epistemic-modes", "fresh-context", "context-break"]
epoch: E0008.3
date: 2026-04-19
derives_from: "canon/definitions/epistemic-modes.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/principles/verification-requires-fresh-context.md"
complements: "docs/appendices/mode-separated-conversations.md, docs/oddkit/tools/oddkit_validate.md, canon/methods/revision-lens-sequence.md"
governs: "Validation as a first-class epistemic mode — distinct from exploration, planning, and execution, with its own truth conditions, obligations, non-collapse requirements, and a structural separation requirement (context break between creator and validator). Applies to any review of produced artifacts against stated claims."
status: active
---

# Validation as Epistemic Mode

> Validation is not a phase of execution. It is a distinct epistemic mode with its own truth conditions, and it requires a structural separation from creation: a context break between the agent that produced the artifact and the agent that reviews it. A creator cannot be their own critic — not from ego, but from the accumulated context that makes flaws unremarkable. The mode name alone is cosmetic. Naming plus context separation is the contract. Execution produces the artifact; validation reviews the artifact with fresh context; iteration acts on findings. Three separate moves, three separate modes, with a handoff between modes 3 and 4.

---

## Summary — Validation Earns Its Own Mode and Its Own Context

Prior canon defined three epistemic modes: exploration, planning, execution. That framing is incomplete. The three-mode model implicitly treated validation as a step inside execution — something a careful executor does while producing the artifact. In practice, that collapsing is the second half of the failure pattern documented in `canon/constraints/mode-discipline-and-bottleneck-respect`. The first half is planning-into-execution (asking questions that should have been asked at the gate). The second half is validation-into-execution (noticing concerns mid-build and surfacing them as inline pivots).

Both are mode collapse. Both externalize cost to the operator's attention. Both feel like care to the agent performing them. The fix for both is the same: put each mode in its proper place and respect its boundaries.

Validation is a fourth epistemic mode. Its purpose is to verify that produced artifacts match their stated claims. Its truth condition is that findings are grounded in the artifact, not in what the validator wished had been built. Its obligations are to review the whole artifact before surfacing findings, separate defects from new ideas, and recommend disposition (fix, pivot, accept) without reopening planning. Its primary risk is scope creep — treating validation as an opportunity to redesign.

**But naming the mode is not enough.** The same agent in the same context cannot validate its own work honestly. `canon/principles/verification-requires-fresh-context` establishes that the same lenses used to create an artifact are the same lenses used to evaluate it. A creator's accumulated context bridges the gap between intent and artifact, making flaws invisible. Validation performed by the authoring agent in the authoring session is self-review, and self-review is execution-in-disguise no matter how thoroughly it is labeled "validation."

The fourth mode is therefore a pair: **a named mode plus a context break.** The handoff can be temporal (sleep, stepping away), architectural (fresh session with a single purpose), social (hand to a peer), or tooled (route to a separate reviewer agent, separate model, or dedicated bot). The model, the governance, and the rules can remain identical. What must change is the context. Without the break, you have a new label over the old behavior.

The rhythm becomes: exploration → planning → execution → **[context break]** → validation → (accept | iterate | pivot). Each transition is a gate. Each mode has invalid moves that belong to earlier or later modes. A model that notices a validation-worthy concern mid-execution should note it and keep building, bringing it up in validation — not inline. A validator that wants to redesign the artifact should declare reversion to planning, not smuggle redesign into a review. And no agent should attempt to validate its own in-session work without a context handoff.

This document defines validation as a peer mode, names its truth conditions and obligations, names the structural context-break requirement, and names the specific collapses it enables or prevents when respected.

---

## Why Validation Is Its Own Mode

Validation differs from execution in every dimension that matters for mode discipline:

The artifact is in a different state. During execution, the artifact is under construction and its shape is mutable. During validation, the artifact exists as produced and its shape is fixed for the duration of the review — modifications belong to iteration, not validation itself.

The work product is different. Execution's work product is the artifact. Validation's work product is a set of findings about the artifact, with recommended disposition for each.

The obligations differ. Execution obligates the builder to produce verifiable outcomes and distinguish effort from results. Validation obligates the reviewer to ground findings in the artifact, not in unstated preferences, and to separate what was asked for from what the reviewer would have asked for if starting over.

The failure modes differ. Execution fails through metric laundering (claiming success without proof). Validation fails through scope creep (using the review to redesign).

When these modes blend — when a builder validates as they build, or a validator redesigns as they review — the failures compound. Neither mode does its job well, and the operator absorbs the resulting turbulence.

---

## Validation Mode — The Contract

### Purpose

To verify that produced artifacts match their stated claims. To surface gaps between intent and outcome. To recommend disposition for each gap.

### Characteristics

The artifact exists already. The validator is reviewing, not building. Scope is bounded by what was claimed, not what could have been claimed. Findings are observations about the artifact as produced, not proposals for what the artifact should have been. Disposition per finding is one of: **fix** (the artifact violates its own claims), **pivot** (the artifact reveals a flaw in the plan itself), or **accept** (the finding is noted but does not require action).

### Truth Condition

A validation is valid if its findings are grounded in the produced artifact. Findings about what the artifact should have done instead of what it was claimed to do are not validation — they are retroactive planning.

### Obligations

The validator reviews the whole artifact before surfacing individual findings. Piecemeal validation — interrupting the flow with a finding the moment it surfaces — is mode collapse toward execution-interruption. The validator separates defects (the artifact violates its own claims) from new ideas (the artifact could have done something different and better). New ideas are captured but marked as exploration or planning material, not as validation findings. The validator assigns disposition explicitly. A finding without a disposition is incomplete — the point of validation is to decide what to do, not merely to notice.

### Primary Risk

Scope creep. The validator drifts from "does this match the claim?" toward "is the claim itself the right claim?" The latter is valid work, but it is planning work, and it belongs in a reversion, not in the validation output.

### Valid Moves

Observe the artifact. Compare against the stated claim. Report findings with disposition. Recommend the overall disposition for the work (accept, iterate, or pivot). Reference canon when findings invoke it. Declare reversion to an earlier mode when a finding reveals the plan itself was wrong.

### Invalid Moves

Introducing new requirements the artifact was never asked to satisfy. Redesigning the artifact mid-review. Batching validation findings into execution instructions (telling the builder to fix things one-by-one instead of reporting all findings together). Treating validation as an opportunity to extend scope. Holding the artifact hostage to findings that are actually exploratory ideas. **Performing validation in the same context that produced the artifact** — same session, same accumulated state, same agent with creation memory intact. That is self-review, and self-review is execution-in-disguise regardless of label.

---

## The Context Break Requirement

This is the section the mode name alone does not capture, and the one most agents will miss if canon doesn't name it explicitly.

Validation requires a **structural separation** between the agent that produced the artifact and the agent that reviews it. The fourth mode is a pair: a named mode and a handoff. Without the handoff, the mode label is cosmetic — a creator reviewing their own in-session work has not broken the accumulated context that made the flaws invisible in the first place.

This is canon, not theory. `canon/principles/verification-requires-fresh-context` documents the evidence: PR #74 — an authoring agent performed nine explicit revision passes with full governance loaded and missed a protected name, a broken URI, a duplicate relationship field, and a rendering-incompatible link path. An independent reviewer (bugbot) caught all four in seconds. Same model family. Same governance documents. The only variable was context.

### Valid Forms of the Context Break

Context breaks are not about changing the reviewer's capability. They are about breaking the creator's accumulated state. Any of the following satisfies the requirement:

**Temporal.** Sleep on it. Step away for hours. Return when the draft reads like something someone else wrote. The human version of context flush. For multi-day projects this is often sufficient and often free.

**Architectural.** Spin up a fresh session with a single purpose: validate this artifact against this governance. The new session has no creation memory. Same model. Same canon. Different context. For AI workflows this is the most scalable form and directly maps to the `oddkit_validate` tool's intended use.

**Social.** Hand the artifact to another human. The colleague who wasn't in the room catches what the participants cannot. Most traditional code review is this form.

**Tooled.** Route the artifact to a separate reviewer agent or a dedicated review bot (bugbot, a different oddkit-driven session, a peer model). The tool or agent's identity is not what matters — its context independence is.

### What Does Not Satisfy the Requirement

- The same agent in the same session "switching into validation mode." No context change occurred.
- Multiple sequential "review passes" by the same agent without intervening context flush. The same lenses keep bridging the same gaps.
- The authoring agent declaring validation complete by reading its own work carefully. Carefulness does not produce independence.

### Model, Governance, and Tool Can All Stay the Same

The counterintuitive finding from `canon/principles/verification-requires-fresh-context`: the fix is not a better model, better governance, or a more rigorous process. The fix is context independence. A different reviewer applying identical governance to the same artifact with fresh eyes consistently catches what nine careful passes cannot.

For TruthKit and future harness work, this implies the architecture: validation is a routing concern. The harness accepts an artifact from an executor agent and routes it to a reviewer agent with no shared context. Same model family is acceptable. Same canon is acceptable. Shared session is not.

### The Two-Layer Effective Pattern

Per canon, the proven pattern is:

1. **Depth:** Same agent, sequential single-lens passes during execution (the Revision Lens Sequence method).
2. **Breadth:** Independent reviewer with fresh context, same governance, single purpose — validation.

Not twenty reviewers. Not seven models. Two layers — sequential self-review during execution, plus one independent validation with a context break. The diminishing returns on additional validation layers are real.

---

## The Four-Mode Rhythm

The three-mode framing in `canon/definitions/epistemic-modes` produces this sequence:

```
exploration → planning → execution → (done?)
```

The four-mode framing makes the review explicit:

```
exploration → planning → execution → [context break] → validation → (accept | iterate | pivot)
```

The `iterate` arrow returns to execution with a new scope derived from validation findings. The `pivot` arrow returns to planning when validation reveals the plan itself was flawed. The `accept` arrow ends the sequence. The `[context break]` between execution and validation is not decorative — it is the mechanism that gives validation its independence from the creation it is evaluating.

Each transition is a gate. Each mode has its own boundaries. The cognitive rhythm in oddkit (`orient`, `search`, `gate`, `challenge`, `preflight`, `validate`) already reflects this — the existence of `oddkit_validate` as a distinct tool is prior evidence that validation is a distinct mode, even though canon had not yet named it as such.

---

## Non-Collapse Rules — Extended for Validation

The non-collapse rule in `canon/definitions/epistemic-modes` states that exploration, planning, and execution must not be collapsed. The extended rule covers all four modes:

- **Exploration must not pretend to decide.**
- **Planning must not pretend to execute.**
- **Execution must not pretend to explore alternatives retroactively.**
- **Execution must not pretend to validate.** A builder who validates as they build produces the micro-pivot pattern — interrupting execution the moment a concern surfaces. Concerns during execution should be noted and carried forward to validation, not acted on inline.
- **Validation must not pretend to plan.** A validator who redesigns the artifact during review is running planning in validation's slot. Redesign requires explicit reversion.
- **Validation must not pretend to execute.** A validator who fixes the artifact mid-review is running execution in validation's slot. Fixes belong to iteration, which is a fresh execution pass scoped by validation findings.
- **Validation must not skip the context break.** An agent that validates its own in-session work without a context handoff has not left execution mode, regardless of what it calls the activity. Self-review is the specific collapse this pairing prevents.

---

## The Bottleneck Argument, Applied to Validation

The throughput argument from `canon/constraints/mode-discipline-and-bottleneck-respect` applies directly. During execution, validation-flavored interruptions pull the operator into reviewing fragments of the artifact before the artifact exists. Each interruption requires context-switch cost from the operator. A single post-execution validation review consolidates these interruptions into one coherent attention event.

A builder who notices five potential issues during execution has two options. The first is to surface them one by one as they arise, producing five separate operator-attention events and five separate micro-pivots. The second is to note them internally, continue execution, and surface all five together in validation with recommended dispositions. The second option costs the same operator attention in total but consolidates the interruption into a single coherent review — and often reveals that some of the five issues interact, that some are duplicates, or that some dissolve once the full artifact exists. The first option foregoes all of that.

The instinct to surface issues as they arise feels like transparency. It is not. It is mode collapse that externalizes consolidation work onto the operator's attention.

---

## Prior Art — What This Inherits and What Is Specific

Validation as a distinct phase is not new. What this canon contributes is its integration into the epistemic-mode framework with non-collapse obligations — not the idea of reviewing work against its claims.

**Deming's PDCA cycle** (Plan, Do, Check, Act) separates the doing from the checking and the adjustment. The "Check" phase in PDCA is the direct ancestor of this document's validation mode. What this canon adds beyond PDCA is the truth-condition framing — a validation is valid if findings are grounded in the produced artifact, not in retroactive preferences.

**Software QA practice** has long treated validation as a role separated from development — the tester reviews against requirements, reports defects, and does not silently edit the code to fix them. The fix/pivot/accept disposition inherits directly from defect-triage practice. What this canon adds is the specific execution-into-validation collapse: the builder who validates mid-build is running QA inside development, producing the same dysfunction that organizational separation-of-duties exists to prevent.

**Agile retrospectives** institutionalize periodic review of produced work. The whole-artifact-before-findings obligation echoes the retrospective convention of reviewing the sprint before planning the next. What this canon adds is the frame that validation is not a time-based ritual but a mode — it happens whenever execution produces something, not on a fixed cadence.

**What is specific to ODD.** The integration with exploration/planning/execution as a four-mode system with formal non-collapse obligations is specific. So is the Theory of Constraints framing that ties validation discipline to operator-attention throughput, and the `oddkit_validate` tool's built-in enforcement of the mode's shape (requires artifact references, returns VERIFIED or NEEDS_ARTIFACTS, does not return questions). These are not re-inventions of QA or PDCA — they are the specific operationalization of validation inside a canon-driven, model-collaborator workflow where the operator's attention is the scarce resource.

**Retraction condition.** This canon should be revised if: (a) a four-mode framing creates more collapse opportunities than it prevents in practice, (b) a validator role distinct from executor role proves impractical for single-operator workflows, or (c) prior-art sources reveal a more precise distinction we should inherit. Until then, treat as a working operationalization, not a final one.

---

## Applied to `oddkit_validate`

The `oddkit_validate` tool already encodes this mode in its contract. Its input is a completion claim with artifact references. Its output is VERIFIED or NEEDS_ARTIFACTS. The call signature enforces separation: validation requires an artifact to exist and a claim about it, and produces a judgment. There is no shape in the tool for "validate a thing that is partially built" — that is by design.

When `oddkit_validate` returns NEEDS_ARTIFACTS, the correct move is to produce the artifacts, then re-validate. The incorrect move is to surface the NEEDS_ARTIFACTS response to the operator as a question asking whether the artifacts are required. Validation's output is a finding; the builder acts on the finding. This is the same pattern as `oddkit_challenge` in execution — challenge prompts are not questions to relay, they are pressure-tests to absorb.

---

## When Validation Reveals the Plan Was Wrong

A validation finding can reveal that the plan itself — not the artifact — was the problem. The artifact faithfully implements the plan, but the plan should not have been implemented. This is a legitimate finding and it does not fit inside the fix/accept disposition scheme. The disposition for this class of finding is `pivot`: explicit reversion to planning mode.

Reversion from validation to planning must be named the same way reversion from execution to planning is named: "Reverting to planning because [specific finding]. The plan [specifically] needs revision." One sentence, one reason, one revision scope. The validation output stops at that point — the remaining findings, if any, go back into validation once planning has been revised and the artifact re-executed.

---

## Failure Signals — When Validation Has Collapsed

Validation is collapsing if any of the following hold:

- The validator is surfacing findings one at a time during execution rather than after execution completes
- The validator is modifying the artifact during review rather than reporting findings with disposition
- Findings are being introduced that describe new requirements the artifact was never asked to satisfy
- The validator is treating every imperfection as a defect rather than separating defects from exploratory ideas
- The validator is asking questions about what should have been built rather than reporting on what was built
- The validator is holding accept hostage to findings that are actually planning-mode material
- **The validator is the authoring agent in the authoring session with no context break.** This is the most structural collapse — the label says "validation" but no independence was introduced. The fix is a handoff (fresh session, different reviewer, temporal break, or tooled routing), not a more careful read.

Any of these signals the validator has slipped into a different mode — or never left the previous one — and should either return to validation's boundaries, declare reversion, or acknowledge the missing context break and route accordingly.

---

## Related Canon

- `canon/definitions/epistemic-modes.md` — the three-mode framing this document extends. That doc is being revised to incorporate validation as the fourth mode.
- `canon/constraints/mode-discipline-and-bottleneck-respect.md` — the non-collapse contract and bottleneck argument. Companion update names validation-into-execution alongside planning-into-execution.
- `canon/principles/verification-requires-fresh-context.md` — **load-bearing companion.** Establishes the creator-cannot-be-own-critic principle that makes the context-break requirement non-negotiable. The evidence (PR #74, nine-pass authoring agent vs. fresh-context reviewer) is the empirical anchor for this doc's structural separation requirement.
- `canon/methods/revision-lens-sequence.md` — the depth side of the two-layer pattern (sequential self-review with single-lens focus). Validation is the breadth side with fresh context.
- `docs/appendices/mode-separated-conversations.md` — operational guide for conversations. Companion section on validation conversations.
- `canon/bootstrap/model-operating-contract.md` — revised to name four modes and the execution → validation → iteration rhythm.
- `docs/oddkit/tools/oddkit_validate.md` — the tool whose contract already encoded this mode before canon named it.
- `docs/appendices/epoch-8-3.md` — the epoch that introduces validation as observable mode and names self-correction (E0009) as the next move that becomes possible once validation is structurally separable.
