---
uri: klappy://canon/decisions/models-do-not-mutate-canon
title: "Models Do Not Mutate Canon"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "decisions", "models", "mutation", "governance", "stewardship", "delegation", "authority", "epoch-10"]
relevance: decision
execution_posture: governing
date: 2026-06-26
---

# Models Do Not Mutate Canon

> Models do not mutate the operator's canon. A model may hold delegated, bounded, revocable stewardship over a sub-scope — governing within it, never above it, never over itself.

## Description

This decision records that AI models (LLMs, agents, assistants) are not permitted to directly edit the operator's Canon. Models may read, analyze, summarize, and report on Canon. They may draft proposed changes. The act of mutating the operator's Canon—writing changes to its files—requires the operator's review and approval. This preserves Canon's role as stable, human-governed truth.

This decision now also names the one axis along which a model may carry standing: **delegated stewardship over a bounded sub-scope.** The operator may grant a steward (human or model) authority over a sub-scope's governance — a delegated canon distinct from the operator's own. The steward governs within that scope and nowhere else. This is not an exception to human-governed truth; it is a downward delegation of it, and it is revocable from above. (See *Delegated Stewardship* below, and `klappy://canon/principles/rulebook-transfer` for the authority-flow asymmetry this rests on.)

## Operating Constraints

- MUST NOT allow models to write changes directly to the operator's Canon files
- MUST allow models to read, analyze, summarize, and report on Canon
- MUST allow models to draft proposed changes for review
- MUST require operator review and approval for all mutations to the operator's Canon
- MUST treat the operator's Canon as human-governed truth, not generated artifact
- MUST confine any delegated steward's authority to its granted sub-scope — never upward, never over its own boundary, never over its own proposals
- MUST keep every scope boundary owned by the granting tier, not by the steward it bounds
- MUST keep every delegation revocable from above, with revocation recorded as an attributed act
- MUST grant a delegated scope only to a tier with the capacity to steward it; stewardship capacity is not uniform across tiers, and a tier that can execute may still be unable to steward (see `klappy://canon/principles/rulebook-transfer`)

## Defaults

- Models draft, humans commit — for the operator's Canon
- Within a delegated sub-scope, the steward ratifies; across any scope boundary upward, it does not
- When a model detects a Canon error above its scope, report it rather than fix it
- Treat any model attempt to edit Canon above its scope, widen its own scope, or ratify its own proposal as a boundary violation
- Prefer slower Canon updates over model-driven drift

---

## Failure Modes

- **Direct Mutation**: Model writes to the operator's Canon files, bypassing review
- **Upward Reach**: A delegated steward edits a scope above its own
- **Self-Promotion**: A tier ratifies its own proposal or widens its own scope (a cycle of length one)
- **Boundary Capture**: A steward edits the definition of its own scope, breaking downward-only authority
- **Subtle Drift**: Well-meaning model edits introduce gradual inaccuracy
- **Accountability Gap**: No human responsible for model-introduced changes
- **Authority Erosion**: Canon becomes "just another generated file" when models edit freely
- **Approval Theater**: Rubber-stamping model changes without genuine review

---

## Verification

- No commits to the operator's Canon files have a model as author without operator approval
- Canon changes are traceable to an attributed ratification by a tier with authority over that scope
- No standing-bearing row was ratified by the same tier that authored it
- Scope boundaries are changed only by the granting tier; revocations are recorded
- Models produce drafts and reports, not direct mutations of canon above their scope
- The boundary is enforced in tooling and process, not just policy

---

## Content

## Decision

Models may not mutate the operator's Canon. A model may hold delegated, bounded, revocable stewardship over a sub-scope.

Actions on the **operator's Canon**:

| Action | Permitted |
|--------|-----------|
| Read Canon | ✓ Yes |
| Analyze Canon | ✓ Yes |
| Summarize Canon | ✓ Yes |
| Report on Canon | ✓ Yes |
| Draft proposed changes | ✓ Yes |
| Write changes to Canon files | ✗ No |

Actions on a **delegated sub-scope** (granted from above):

| Action | Permitted |
|--------|-----------|
| Govern / ratify within the granted scope | ✓ Yes (within scope only) |
| Edit a scope above its own | ✗ No |
| Widen or redefine its own scope boundary | ✗ No |
| Ratify its own proposal | ✗ No |
| Grant itself authority | ✗ No |

## Status

**Active.** Refined 2026-06-26 to add the delegated-stewardship axis; the core prohibition on mutating the operator's Canon is unchanged.

## Context

Canon exists to preserve stable, shared truth across this program. Its value depends on careful curation, intentional change, and human accountability. Models are powerful tools for analysis and drafting, but they optimize for plausibility over correctness, cannot be held accountable for mistakes, and may introduce subtle drift through well-meaning edits. Allowing models to directly mutate the operator's Canon would erode the trust boundary that makes Canon useful.

The delegated-stewardship axis does not weaken that boundary. Authority flows downward only: the operator grants a bounded scope, the steward governs within it, and the grant is revocable. A steward never reaches up into the operator's Canon and never authors the definition of its own scope. Accountability is preserved because every ratification and every revocation is attributed and recorded.

## Alternatives Considered

### 1. Models may edit Canon freely

**Rejected.** This removes the human governance layer that makes Canon authoritative. Canon would become another generated artifact rather than curated truth.

### 2. Models may edit Canon with approval workflow

**Accepted in narrow form.** Models draft; ratification is an attributed act by a tier with authority over the scope. For the operator's Canon, that tier is the operator. The earlier rejection ("adds complexity") stands for any workflow that lets a model commit to the operator's Canon; it does not stand against attributed downward ratification within a delegated scope.

### 3. Models may edit Tier 3 but not Tier 1–2

**Rejected — and distinct from delegated stewardship.** Alternative 3 proposed graduated edit-rights *inside the operator's single Canon* (tiers of the operator's own truth). That remains rejected: the operator's Canon has no model-editable tier. Delegated stewardship is a different axis — a *separate, bounded sub-scope* granted downward, not a tier of the operator's Canon. The operator's Canon stays flatly non-model-mutable; a steward's canon is its own jurisdiction, not a privileged slice of the operator's.

## Consequences

### Enables

- The operator's Canon remains human-governed
- Self-building loops can close without unravelling, because authority stays acyclic
- Delegated stewards can govern bounded sub-scopes without reaching upward
- Changes are intentional, attributed, and traceable
- Models still provide value through analysis, drafting, and in-scope stewardship

### Prevents

- Subtle drift from well-meaning model edits to the operator's Canon
- Upward reach, self-promotion, and boundary capture
- Accountability gaps
- Canon becoming "just another generated file"

### Costs

- Slower updates to the operator's Canon (requires operator action)
- Delegation and revocation must be tracked as attributed acts
- A model cannot self-correct an error in Canon above its scope

---

## Refinement note (2026-06-26)

This document extends the original binary decision (*models may analyze and report on Canon, but may not edit it*) with the delegated-stewardship axis introduced by `klappy://canon/principles/rulebook-transfer`. The original rule is preserved unchanged for the operator's Canon. The refinement adds only the downward-delegation axis and its guards. Landing mechanism (in-place amendment vs a superseding decision) and the `stability` setting are the operator's call; this draft sets `stability: semi_stable` to reflect active refinement.

## See Also

- [Rulebook Transfer](klappy://canon/principles/rulebook-transfer) — the authority-flow asymmetry this rests on
- [Everything Is a Project](klappy://docs/planning/kb-data-model) — governance is a role on a scope
- [ODD Is a Value-Grounded Epistemic OS](klappy://canon/constraints/odd-is-epistemic-os-not-values) — authority is a governance-layer axis, not an epistemic-core one
- [Epistemic Obligation and Document Tiers](/canon/definitions/epistemic-obligation-and-document-tiers.md)
- [Constraints](/canon/constraints/README.md) — AI as Accelerator, Not Authority
