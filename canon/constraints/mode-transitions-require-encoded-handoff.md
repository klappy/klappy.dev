---
uri: klappy://canon/constraints/mode-transitions-require-encoded-handoff
title: "Mode Transitions Require Encoded Handoff — Every Gate Demands a Durable Artifact"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "constraints", "epistemic-modes", "handoff-contract", "journal", "dolcheo", "session-discipline", "mode-discipline", "encoding"]
epoch: E0008.5
date: 2026-05-10
derives_from: "canon/principles/sessions-mirror-modes.md, canon/definitions/epistemic-modes.md, canon/constraints/critic-cannot-be-resolver.md, canon/principles/verification-requires-fresh-context.md"
complements: "canon/methods/persona-shaped-agent-runtime.md, docs/mode-separated-conversations.md, canon/definitions/dolcheo-vocabulary.md"
governs: "Every transition between epistemic modes — exploration, planning, execution, validation, resolution — across all surfaces (agent runtime, human conversation, mixed teams)"
status: proposed
---

# Mode Transitions Require Encoded Handoff — Every Gate Demands a Durable Artifact

> A mode transition without a durable handoff is mode collapse with extra steps. The receiving session has no grounded artifact to read; it has only the working memory of the prior session, transmitted informally. That is exactly what session-per-mode discipline forbids. This constraint operationalizes [Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes) by requiring two things at every transition between epistemic modes: a journal entry recording the transition, and a transition-specific minimal handoff artifact. The journal is universal and applies to every transition without exception. The handoff content varies by transition. Both are required before the next mode's session can legitimately begin.

---

## The Two Required Artifacts

Every legitimate transition between epistemic modes produces two artifacts:

### 1. Journal Entry — Universal, No Exception

Every transition produces a journal entry recording what happened. The format is DOLCHEO per [the canonical vocabulary](klappy://canon/definitions/dolcheo-vocabulary): decisions, observations, learnings, constraints, handoffs, encodes, opens. The journal entry captures:

- The mode transition itself (from → to, with timestamp)
- What was completed in the prior mode (obligations met)
- What is being deferred or carried forward
- Any reversion or skip, with explicit acknowledgment
- The handoff artifact reference (URI or path)

Journal entries are append-only durable records. They live in the project's ledger or equivalent canon-adjacent location. They do not replace the handoff artifact described below; they complement it. The journal is for the project's longitudinal memory; the handoff is for the next session's working context.

This requirement admits no exceptions. Even transitions between modes whose obligations are minimal — exploration to planning, where neither produces a heavy artifact — produce a journal entry. Even transitions during PoC-scope work produce a journal entry. The journal is the audit trail that allows future work to trust the history.

### 2. Transition-Specific Minimal Handoff

Each transition has a minimum required handoff content beyond the journal. The receiving session reads this handoff, not the prior session's working memory. The minimal contents are:

| Transition | Minimal Handoff |
|---|---|
| **Exploration → Planning** | Encoded synthesis of possibilities, tensions, unknowns, and competing frames surfaced during exploration. Stored as a synthesis ledger entry, research artifact, or equivalent durable encoding. The planner reads the synthesis; they do not inherit the explorer's session state. |
| **Planning → Execution (build)** | A plan declaring: explicit assumptions, scope (what is in and out), deferred items, and conditions that would invalidate the plan. The builder reads the plan; they do not inherit the planner's reasoning beyond what is captured. |
| **Execution → Validation** | The artifact itself plus an explicit claims declaration — what the artifact does, what it does not do, what scope it was built against. The validator reads the claims and the artifact; they do not inherit the builder's intent beyond what is declared. |
| **Validation → Resolution** | Findings with explicit dispositions (fix, pivot, accept) per the validation mode's obligations. Each finding includes evidence grounded in the produced artifact. The resolver reads the findings; they do not inherit the validator's framing beyond what is captured. |
| **Resolution → Validation (re-validation)** | The revised artifact plus a remediation summary per finding (what was changed, what was not changed and why). The re-validating session reads the revised artifact and the remediation summary; they do not inherit the resolver's reasoning beyond what is captured. |

These are minimums. A handoff can include more — supporting evidence, screenshots, traces, alternative framings considered and rejected — but it cannot include less. A handoff that does not contain its minimum content is incomplete; the next session cannot legitimately begin until the handoff is complete.

---

## Why "Encoded" Is the Operative Word

The handoff must be encoded — written down in a form the next session can read independently of any human or agent who participated in the prior session. Verbal handoffs, working-memory carry-over, and "I'll explain when you get there" patterns are not encoded handoffs. They are mode collapse with extra steps.

The encoding requirement serves three purposes:

**Independence.** The next session can begin without coordinating with the prior session. The handoff artifact is sufficient input. This is what makes session-per-mode discipline operationally feasible — a fresh planner can read the synthesis ledger and start planning without scheduling a conversation with the explorer.

**Durability.** The handoff outlives both sessions. If a question arises later about why a plan made a specific assumption, the synthesis ledger that the plan was based on is still readable. The audit trail is preserved.

**Falsifiability.** An encoded handoff can be reviewed for completeness. A working-memory handoff cannot — there is no way to check whether anything important was lost in the transition because there is no record of what was supposed to transfer. Encoding makes the handoff inspectable.

---

## Reversion and Skip Are Allowed With Acknowledgment

This constraint does not forbid reversion or skip. It requires that both be encoded.

**Reversion** — returning to an earlier mode — produces a journal entry naming the reversion and its cause. The originally received handoff remains valid for future re-attempts; nothing is destroyed. The reversion entry acknowledges that the prior mode's obligations were not met sufficiently to proceed, and reframes the work back into that mode.

**Skip** — moving to a later mode without satisfying the intermediate one — produces a journal entry naming the skip and the explicit acknowledgment. Skipping validation, for example, is allowed when the artifact is throwaway and the cost of skipping is accepted. The acknowledgment must be explicit and durable, and the skipped mode's risks are inherited by the project.

Both reversion and skip require the journal entry. Neither is a free move. The discipline is not that work always proceeds linearly through five modes; the discipline is that every deviation from linear progress is acknowledged in a durable record.

---

## Operational Enforcement

This constraint is enforceable at three layers:

**Agent runtime.** A runtime that hosts agent sessions per [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) can require a handoff URI and a journal entry reference as inputs to any session whose role is downstream of another role. Sessions invoked without complete handoff inputs are refused. This makes the constraint structural rather than dependent on agent discipline.

**Human workflow tooling.** PR templates, design-doc templates, ticket workflows, and similar can require handoff fields before transitioning a unit of work to its next mode. The tooling does not enforce the *quality* of the handoff (the encoded synthesis might be sparse), but it enforces the *existence* of one.

**Conversational surfaces.** Chat-based interfaces, pair-programming sessions, and design reviews enforce this constraint through explicit gating language: "okay, before we move from planning to building, let's encode the plan." The discipline is harder to mechanize at this layer and easier to violate; the mitigation is participant awareness and operator-as-bottleneck framing.

The runtime layer is where this constraint is most cleanly enforced. The conversational layer is where it is most often violated and most consequential when violated, because conversations naturally flow across mode boundaries without ceremony.

---

## What This Constraint Does Not Require

It does not require that the handoff be exhaustive. The minimums above are minimums; the goal is sufficient encoding to allow a fresh session to begin, not perfect documentation. A planner who declares three explicit assumptions, defines scope in two paragraphs, and notes one invalidating condition has met the minimum, even if a richer plan would have been better.

It does not require that the handoff be authored by the prior session's primary agent. An explorer can ask a side-task to draft the synthesis ledger; a builder can ask another agent to write the claims declaration. The encoding requirement is about the artifact existing in durable form, not about who produced it.

It does not require that every project use these specific role names. The mapping is to epistemic modes, which are canonical. Projects that use different vocabulary (research → spec → implementation → review → fix, for example) are still bound by this constraint, with the role names mapped to the canonical modes.

It does not require that the receiving session never communicate with the prior session's participants. Q&A about ambiguities in the handoff is permitted. The constraint is that the handoff itself is the primary input — a question to the prior session's author is a clarification, not a substitute for the encoded artifact.

---

## Conversational Mode Should Feel Seamless — But Underneath Is Discipline

Operators may object that this constraint is incompatible with chat-based work, where the cognitive flow naturally moves from "let's explore this" through "okay let's plan it" through "I'm building" without ceremony.

The constraint is not that the *human experience* must feel like five separate conversations. The constraint is that the *epistemic record* must reflect five separate sessions when five modes were crossed. The two are reconciled by orchestration: a chat-facing surface can spawn fresh sessions per mode in the background, write encoded handoffs at each transition, and present a unified conversation to the human user. The user sees continuity; the system records discipline.

This is a consumer pattern, not a runtime feature, and it is documented separately. See [Mode-Separated Conversations](klappy://docs/mode-separated-conversations) for the conversational application of mode discipline. The principle here is that the handoff requirement does not relax for conversational surfaces; it just gets handled by orchestration rather than by the human noticing each transition.

---

## Confidence

**Working belief.** The journal-entry requirement extends an already-canonical practice (DOLCHEO entries on every session per [the dolcheo-vocabulary](klappy://canon/definitions/dolcheo-vocabulary)) to mode transitions specifically. The transition-specific handoff requirements extend already-canonical practice for individual transitions (P0008 for validator deliverables, plan documents for execution work, etc.) into a uniform contract.

**Retraction conditions:**

- If the universal journal-entry requirement produces audit-trail clutter without corresponding investigative value, the requirement narrows to specific high-stakes transitions (e.g., execution → validation) and becomes optional elsewhere.
- If the transition-specific handoff minimums prove to over-specify in practice — projects routinely producing the minimums but finding them insufficient or excessive — the minimums are revised against observed need.
- If conversational orchestration overhead (spawning fresh sessions, encoding handoffs invisibly) makes mode-disciplined chat surfaces too expensive to operate, the constraint is relaxed for conversational surfaces and remains binding only for explicit multi-session work.

**What this constraint costs.** Visibly: more journal entries, more handoff artifacts, more orchestration when conversational surfaces want to remain chat-shaped. Invisibly: the cost of *not* having durable records when work fails or audits arise — a cost that is paid in confusion, lost context, and unfalsifiable history when the constraint is violated. The visible cost is what operators feel; the invisible cost is what makes the constraint load-bearing.

---

## See Also

- [Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes) — the principle this constraint operationalizes
- [Epistemic Modes](klappy://canon/epistemic-modes) — the parent canon defining the modes whose transitions this constraint governs
- [DOLCHEO Vocabulary](klappy://canon/definitions/dolcheo-vocabulary) — the journal entry format required at every transition
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — the principle motivating the encoded handoff for execution → validation specifically
- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — the constraint motivating the encoded handoff for validation → resolution specifically
- [P0008 — Fresh-Validator Deliverable Is a DOLCHEO Ledger](klappy://docs/promotions/P0008-pr-validator-dolcheo-ledger-as-deliverable) — the operationalized handoff pattern for the validator role
- [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) — the runtime architecture that enforces this constraint mechanically for agent work
- [Mode-Separated Conversations](klappy://docs/mode-separated-conversations) — the conversational application of mode discipline
