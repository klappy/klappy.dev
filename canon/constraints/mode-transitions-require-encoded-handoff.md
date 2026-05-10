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
complements: "canon/methods/persona-shaped-agent-runtime.md, docs/mode-separated-conversations.md, docs/oddkit/proactive/oldc-h-vocabulary.md"
governs: "Every transition between epistemic modes — exploration, planning, execution, validation, resolution — across all surfaces (agent runtime, human conversation, mixed teams)"
status: proposed
---

# Mode Transitions Require Encoded Handoff — Every Gate Demands a Durable Artifact

> A mode transition without a durable handoff is mode collapse with extra steps. The receiving session has no grounded artifact to read; it has only the working memory of the prior session, transmitted informally. That is exactly what session-per-mode discipline forbids. This constraint operationalizes [Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes) by requiring two things at every transition between epistemic modes: a journal entry recording the transition, and a transition-specific minimal handoff artifact. The journal is universal and applies to every transition without exception. The handoff content varies by transition. Both are required before the next mode's session can legitimately begin.

---

## The Two Required Artifacts

Every legitimate transition between epistemic modes produces two artifacts:

### 1. Journal Entry — Universal, No Exception

Every transition produces a journal entry recording what happened. The format is DOLCHEO+H per [the canonical vocabulary](klappy://docs/oddkit/proactive/oldc-h-vocabulary): observations, learnings, decisions, constraints, encodes, handoffs. The journal entry captures:

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

## Operator Override — Explicit Mode Collapse Under Urgency

A third escape mechanism, distinct from reversion and skip. An operator can declare a runtime override that collapses one or more mode boundaries into a single session — typically when urgency outweighs the cost of corruption. Like reversion and skip, the override requires explicit acknowledgment and a durable record.

### What an Override Is

A runtime-level declaration by the human operator that one or more mode boundaries will be deliberately collapsed for the current session. The operator names the collapse, states the reason, and acknowledges the corruption being accepted. The runtime records the override in the journal at session start, applies relaxed constraints for the session's duration, and records the actual work done in the journal at session end.

This differs from skip: a skip declares that a mode will not be entered at all. An override declares that multiple modes will be collapsed into a single session — work happens, but without the gate boundaries between modes. The corruption mode is also different: a skip means the mode's signal is missing entirely; an override means the mode's signal is produced under conditions that compromise its quality.

### What an Override Requires

- **Explicit declaration.** Override cannot be implicit. The operator names which boundaries are being collapsed: *"collapse exploration through validation in this session"* or *"collapse all five modes in this session."*
- **Stated reason.** Why urgency outweighs discipline. The reason need not be elaborate but must be specific enough to be auditable later — *"production incident; we need a working patch in the next thirty minutes"* is sufficient. *"In a hurry"* alone is not.
- **Acknowledged risks.** The operator names the corruption modes being accepted. For an override that collapses execution and validation, this is *"the validator will share context with the builder, and findings will be biased toward what the builder's framing made visible."*
- **Journal entry at session start** naming all of the above.
- **Journal entry at session end** naming what actually happened — what was built, what was validated under the override, what was skipped, what tradeoffs materialized in practice.

### Worked Use Cases — When the Override Earns Its Keep

Two categories where operator override is operationally legitimate, not a degradation of discipline:

**Production incidents.** A bug landed in production; the patch needs to ship in the next thirty minutes. The cost of moving through five clean sessions with handoffs at each gate exceeds the cost of context corruption — production downtime is not an acceptable tradeoff for epistemic hygiene at this moment. The operator declares the override, names the incident, acknowledges that the validator will share context with the builder, and accepts the corruption. The journal entries make the corruption visible later, so any code shipped under override gets flagged for proper post-incident review.

**Governance creation.** Authoring canonical principles, constraints, and methods is inherently oscillating work. A draft principle implies a constraint; drafting the constraint surfaces a refinement to the principle; the refinement reveals an unexamined assumption that needs an exploration pass. The work moves between modes faster than handoff norms can encode. Until handoff norms catch up — until a project has been through enough governance-creation cycles to know which dynamic types its synthesis ledgers must capture — this category may regularly justify override. The signal is not that discipline is being abandoned; the signal is that the encoding norms are still maturing. An override-with-record produces governance with full audit trail of *how the governance was made*; clean sessions with poor handoffs would produce governance whose drafting context died at every gate.

The honest framing: the architecture's value depends on handoffs being good enough to preserve what would have transferred in shared context. For categories of work where the encoding norms are still being learned, override-with-record is the correct operational response — not a permanent retreat, but a stopgap until norms catch up. The aspiration is that with explicit handoffs and forced same-branch work, encoding eventually becomes detailed enough that clean sessions become *transient, ephemeral, and transparent to the operator* — but reaching that state requires contact with reality, including the experience of trying and failing to encode well.

This use case is itself a worked example: this constraint document was drafted in a single collapsed session under operator-acknowledged override, because the explorer-planner-builder-validator-resolver oscillation was faster than the handoff norms could yet capture. The journal entries record the override; future iterations will improve the handoff norms; eventually governance creation may be doable in clean sessions. Until then, override is the rational choice.

### What an Override Is Not

- Not the `general` role escape hatch. The general role is a planned escape declared at persona-profile authoring time. The operator override is a reactive escape declared at session-invocation time. Different declaration point, different audit trail.
- Not transferable. An override applies only to the session it was declared for. Subsequent sessions do not inherit the override; if the urgency persists across sessions, each session gets its own override declaration.
- Not absolute. The operator can override gate transitions but cannot override the journal entry requirement itself. The override is the journal-worthy event; the journal entry is what makes the corruption visible later.
- Not a free pass for routine convenience. The override is for genuine urgency — production incidents, time-bounded operational decisions, situations where the cost of waiting exceeds the cost of corrupted signal. An override invoked routinely degrades the project's epistemic record over time.

### The Cost

An override produces a session whose epistemic record is corrupted by design. Future work that depends on this session's output should be aware of the corruption. The journal entry serves this purpose — downstream readers can see that the session was operator-overridden and apply appropriate skepticism to the outputs.

The discipline of recording the override is what allows the corruption to be visible later. A session that collapsed modes silently produces unfalsifiable history. A session that collapsed modes with a recorded override produces history that *knows* it is corrupted, which is recoverable.

The override is therefore not a violation of this constraint. It is a third permitted deviation, treated identically to reversion and skip: allowed with explicit acknowledgment, accompanied by a durable record, and accountable to its costs.

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

## Handoff Quality Is a Separate Discipline

This constraint codifies the *requirement* for encoded handoffs at every transition. It does not codify *quality*, and cannot. A handoff that satisfies the minimum content requirement above can still be insufficient — shallow encoding, lossy capture of dynamic context, missing the unwritten-but-obvious knowledge the prior session held implicitly. The constraint ensures the artifact exists; it does not ensure the artifact is good.

This is a meaningful gap. Per [Sessions Mirror Modes §Failure Modes](klappy://canon/principles/sessions-mirror-modes), the architecture's cost only pays back when handoffs preserve what would naturally transfer in shared sessions. Bad handoffs produce sessions operating on distorted input — worse than the mode-collapse the architecture was meant to replace. The constraint can require presence; the project's encoding norms have to deliver quality.

Three specific places this gap matters:

- **Minimum-met-but-thin handoffs** pass this constraint's check but fail the principle's purpose. Format-correct, content-poor. The constraint cannot detect this; downstream review and audit-trail patterns can.
- **Missing dynamic types** are the most common failure — settled decisions get encoded, live tensions and considered-rejected paths do not. The minimum-handoff list above does not require encoding these explicitly; projects that find their handoffs routinely losing dynamic context should extend their local handoff norms to require it.
- **Missing crucial context that felt obvious to the encoder** is the highest-cost failure. The encoder had it; they did not write it down because encoding it felt like overhead. The receiving session in fresh context does not have it. The constraint's minimum cannot anticipate which context will feel obvious; this gap closes only through observed failures and norm refinement.

The constraint's role here is operational: it makes encoding the work, surfaces gaps when receiving sessions cannot proceed, and preserves audit trails of insufficient handoffs. It does not — and cannot — guarantee the encoding captures what matters. That is upstream of any constraint, in the encoding norms a project develops over time.

A receiving session that cannot proceed on a handoff has the right to refuse with a structured signal — *"this handoff is insufficient; specifically X is missing"* — distinct from disagreement with the handoff's content. The runtime can support this signal as a first-class outcome (see [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime)). The constraint requires the handoff exists; the runtime feature requires the receiving session can refuse it when it is not enough.

---

## Confidence

**Working belief.** The journal-entry requirement extends an already-canonical practice (DOLCHEO+H entries on every session per [oldc-h-vocabulary](klappy://docs/oddkit/proactive/oldc-h-vocabulary)) to mode transitions specifically. The transition-specific handoff requirements extend already-canonical practice for individual transitions (P0008 for validator deliverables, plan documents for execution work, etc.) into a uniform contract.

**Retraction conditions:**

- If the universal journal-entry requirement produces audit-trail clutter without corresponding investigative value, the requirement narrows to specific high-stakes transitions (e.g., execution → validation) and becomes optional elsewhere.
- If the transition-specific handoff minimums prove to over-specify in practice — projects routinely producing the minimums but finding them insufficient or excessive — the minimums are revised against observed need.
- If conversational orchestration overhead (spawning fresh sessions, encoding handoffs invisibly) makes mode-disciplined chat surfaces too expensive to operate, the constraint is relaxed for conversational surfaces and remains binding only for explicit multi-session work.

**What this constraint costs.** Visibly: more journal entries, more handoff artifacts, more orchestration when conversational surfaces want to remain chat-shaped. Invisibly: the cost of *not* having durable records when work fails or audits arise — a cost that is paid in confusion, lost context, and unfalsifiable history when the constraint is violated. The visible cost is what operators feel; the invisible cost is what makes the constraint load-bearing.

---

## See Also

- [Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes) — the principle this constraint operationalizes
- [Epistemic Modes](klappy://canon/epistemic-modes) — the parent canon defining the modes whose transitions this constraint governs
- [DOLCHEO+H Vocabulary](klappy://docs/oddkit/proactive/oldc-h-vocabulary) — the journal entry format required at every transition
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — the principle motivating the encoded handoff for execution → validation specifically
- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — the constraint motivating the encoded handoff for validation → resolution specifically
- [P0008 — Fresh-Validator Deliverable Is a DOLCHEO Ledger](klappy://docs/promotions/P0008-pr-validator-dolcheo-ledger-as-deliverable) — the operationalized handoff pattern for the validator role
- [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) — the runtime architecture that enforces this constraint mechanically for agent work
- [Mode-Separated Conversations](klappy://docs/mode-separated-conversations) — the conversational application of mode discipline
