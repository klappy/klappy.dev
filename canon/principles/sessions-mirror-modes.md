---
uri: klappy://canon/principles/sessions-mirror-modes
title: "Sessions Mirror Modes — Each Epistemic Mode Earns Its Own Session"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "principles", "epistemic-modes", "session-discipline", "context-corruption", "mode-discipline", "agent-design", "fresh-context"]
epoch: E0009
date: 2026-05-10
derives_from: "canon/definitions/epistemic-modes.md, canon/principles/verification-requires-fresh-context.md, canon/constraints/critic-cannot-be-resolver.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
complements: "canon/constraints/mode-transitions-require-encoded-handoff.md, canon/methods/persona-shaped-agent-runtime.md, docs/mode-separated-conversations.md"
governs: "All multi-mode work — agent-driven and human-driven — where the same artifact passes through more than one epistemic mode"
status: proposed
---

# Sessions Mirror Modes — Each Epistemic Mode Earns Its Own Session

> The structural blindness that makes a creator unable to validate their own work, a critic unable to remediate their own findings, and a planner unable to honestly execute their own plan is the same blindness in three different shapes. The fix is the same in all three: separate the contexts. Sessions should map one-to-one onto epistemic modes — explorer, planner, builder, validator, resolver — because the context corruption that follows mode collapse follows the same structural pattern across every transition. This principle generalizes critic-cannot-be-resolver and verification-requires-fresh-context to a universal claim about session boundaries: every gate between modes is a context boundary, and every context boundary deserves a fresh session.

---

## The Pattern

Three constraints already canonical name the same structural problem in three places:

- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — the agent that detects drift cannot be the agent that resolves it. Same context corrupts both functions.
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — a creator cannot be their own critic, because the same lenses used to create are the same lenses used to evaluate.
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — exploration, planning, and execution are distinct epistemic states with different truth conditions; collapsing them produces false confidence.

These are not three independent rules. They are three applications of one structural insight: *a context that produced a mode's output cannot honestly evaluate, remediate, or transition out of that output without corruption.* The corruption is not a character flaw of the agent in the context. It is a structural property of any system that operates across mode boundaries with shared state.

This principle generalizes the insight: every transition between epistemic modes is a context boundary, and every context boundary deserves a fresh session. There are no special cases. The transitions between exploration and planning, between planning and execution, between execution and validation, and between validation and resolution are all instances of the same pattern.

---

## The Roles

A session is bound to a single role. The role is the operational expression of the mode the session is operating in. The roles are:

| Role | Mode | Primary Output |
|---|---|---|
| **Explorer** | Exploration | A synthesis of possibilities, tensions, and unknowns. Questions outnumber answers. |
| **Planner** | Planning | A plan with explicit assumptions, scope, deferred items, and conditions that would invalidate the plan. |
| **Builder** | Execution | An artifact plus claims about what the artifact does and does not do. |
| **Validator** | Validation | Findings with explicit dispositions — fix, pivot, or accept — grounded in the produced artifact. |
| **Resolver** | Resolution | A revised artifact plus remediation summary per finding, scoped strictly by the findings. |

The roles are not interchangeable. Each operates under the truth conditions and obligations of its mode (per [Epistemic Modes](klappy://canon/epistemic-modes)) and deserves a session whose context is bounded by that mode's purpose.

---

## Why Each Boundary Earns a Fresh Session

The structural argument repeats at every transition, with the specific corruption shape varying:

**Exploration → Planning.** A planner who shares the explorer's context inherits the explorer's framing of what is interesting. The planner narrows toward what was salient during exploration rather than toward what is actually load-bearing for the work ahead. Exploration's primary risk — false closure, mistaking familiarity for understanding — is most acute at this boundary. A fresh planner reads the exploration's encoded synthesis and forms their own narrowing.

**Planning → Execution.** A builder who shares the planner's context inherits the planner's confidence in the plan. Where the plan was uncertain, the builder treats the planner's resolution of that uncertainty as fact, because the planner-context bridges the gap between assumption and decision. Speculative certainty — the planner's primary risk — propagates into execution as treated-as-known. A fresh builder reads the plan, sees the assumptions explicitly, and surfaces a question rather than silently filling in.

**Execution → Validation.** This is the canonical case. A validator who shares the builder's context cannot honestly evaluate the artifact because their context contains the builder's intent, not just the builder's output. They see what was meant, not what was produced. This is the boundary [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) was written to defend.

**Validation → Resolution.** A resolver who shares the validator's context inherits the validator's framing of each finding. Where the validator's framing was wrong — a finding incorrectly classified, a disposition applied without sufficient evidence — the resolver cannot independently assess. They optimize toward fixing what the validator said is broken rather than toward fixing what is actually broken. This is the boundary [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) was written to defend.

**Resolution → Validation (re-validation).** When a resolver hands a revised artifact back for validation, the validating session must again be fresh. A validator who saw the original findings and now sees the resolution may unconsciously calibrate toward "did the resolver address my findings" rather than "does the revised artifact match its claims." A fresh validator session reading the revised artifact and the remediation summary, without the original-findings context, gets cleaner signal.

The shape of the corruption changes at each boundary. The structural fix does not.

---

## What Sharing Context Costs

Operators reasonably ask whether the gates can be relaxed. Two relaxations seem appealing:

**Bleed-over between exploration and planning.** Both modes are thinking-shaped. Neither produces a load-bearing artifact. Same-session E↔P feels efficient.

But exploration's primary risk is false closure, and planning's primary purpose is convergence. Sharing the session means convergence begins before tension-surfacing has finished. The cost is invisible from inside the session — the planner experiences clean reasoning while quietly missing the alternatives the explorer would have surfaced if pushed further. The fix is not to share context but to make the explorer-to-planner handoff cheap. A fresh planner reading a well-encoded synthesis ledger has the same speed advantage with none of the corruption.

**PoC scope as a free pass.** For throwaway work, full mode discipline can feel like overhead. The temptation is to collapse all five roles into one session for a proof-of-concept and only impose discipline when the work is "real."

The risk is that "PoC" stretches. Work that started exploratory becomes load-bearing because it was useful, and the audit trail of mode separation was never built. By the time someone notices the work is consequential, no one can trust its history. PoC scope can still skip modes — the canonical position is that *skipping is allowed when explicitly acknowledged* (per [Epistemic Modes](klappy://canon/epistemic-modes)) — but the discipline is acknowledgment, not size. PoC sessions that skip modes declare the skip; production work that skips modes does not get the same forgiveness.

The relaxations are permissions, not the default. Default is gate-required for every transition.

---

## Parallelism Patterns — What This Principle Does Not Forbid

Session-per-mode discipline is often misread as "work serializes through five modes." It does not. Parallelism is supported in three of four patterns; only one is forbidden.

### Within-Mode Parallelism — Encouraged

Multiple sessions operating in the same mode, in parallel, on the same goal is the Quantum Development insight applied at the session layer: same mode, different execution paths, different outcomes. The pattern is most useful when:

- Multiple explorers fan out on different angles of a single goal, each with fresh context. Fan-in produces a consolidated synthesis ledger that the planner reads as the encoded handoff.
- Multiple validators apply different lenses to the same artifact — security validator, UX validator, technical validator. Each runs independently with fresh context. Fan-in produces consolidated findings with each lens's dispositions preserved.
- Multiple builders work on independent parts of a planned scope. Fan-in produces the artifact when each builder's contribution is independent of the others.

The fan-in is itself a consumer pattern — the consumer collects parallel sessions' outputs and produces a single encoded handoff to the next mode. Fan-in is not free; the consumer assumes responsibility for reconciling overlapping outputs and surfacing genuine disagreement among parallel sessions.

### Multi-Participant Single Session — Allowed Within a Mode

Multiple agents or assistants can collaborate within a single session, sharing the session's context and operating in the session's mode. A builder collaborating with a coding-style reviewer assistant is one builder-role session with two participants. The session is still mode-bound; the participants share the mode's tool restrictions and produce the mode's deliverable jointly.

This does not violate session-per-mode discipline because the session is bound to one mode. The participants are inside that mode together. The handoff at the next gate is from the session's joint output, not from individual participants.

### Cross-Mode Parallelism on the Same Artifact — Forbidden

A builder still building cannot have a validator already validating the same artifact. The validator's input is the encoded artifact-plus-claims handoff, which does not exist until the builder is done. Premature validation reviews an unfinished artifact, which corrupts both roles: the validator produces findings against a moving target; the builder feels evaluated mid-build and starts optimizing toward what the validator is surfacing rather than toward what the plan called for.

This is the only parallelism pattern the principle forbids. Runtimes that host this work can enforce it mechanically by refusing validator sessions on artifacts not yet declared complete via the encoded-handoff mechanism.

### Cross-Mode Parallelism on Different Artifacts — Independent

Multiple work streams, each with their own mode chain, can run concurrently with no conflict. A team can have one stream in exploration, another in planning, a third in build, a fourth in validation, simultaneously. Each stream has its own handoffs, its own journal entries, its own session structure. They share only what they choose to share — typically nothing more than upstream canon and downstream consumer interests.

This is the default mode of a productive multi-agent system. The principle does not slow this down; it constrains only the within-stream serialization of an artifact through modes.

### The Distinguishing Question

When evaluating any parallelism pattern, ask: *are these sessions operating on the same artifact in different modes simultaneously?* If yes, forbidden. If no — same mode, or different artifacts — allowed. Most parallelism intuitions resolve cleanly under this test.

---

## Why This Is Architectural, Not Conversational

This principle applies wherever modes are crossed: human work, agent work, mixed teams. But the architectural application is what makes it operationally enforceable.

For agent runtimes, sessions are first-class objects. A runtime that hosts agent work can enforce session-per-mode structurally — refusing to wire a builder's tools into a validator session, refusing to inherit context across role boundaries. See [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) for the runtime expression of this principle.

For human work, the principle is harder to enforce mechanically and easier to violate. A human who explored, planned, built, validated, and resolved a piece of work in a single afternoon has crossed five mode boundaries with shared context and may not notice. The mitigation is the same as for any cognitive-discipline question: rest, peer review, and explicit acknowledgment when modes were collapsed for legitimate reasons (genuine PoC scope, time pressure with stated tradeoff).

For conversational surfaces — chat with an AI assistant, pair-programming sessions, design reviews — the principle is most often violated and least often noticed. A conversation that flows from "let's explore this" to "okay, here's the plan" to "I'm building it now" to "looks good" within a single context window has executed every transition without any gate. The conversational ergonomic is comforting; the epistemic state is corrupted. Surfaces that want both ergonomic continuity and mode discipline have to orchestrate the transitions invisibly — spawning fresh sessions per mode while presenting unified continuity at the human-facing surface. That is a consumer pattern, not a runtime feature.

---

## Failure Modes — When Handoff Quality Determines Whether the Architecture Pays Back

Session-per-mode discipline is not free. Each transition costs orchestration overhead, journal entries, and the inherent information loss of encoding into a durable artifact what would otherwise live in continuous working context. The principle's claim is that the signal-quality gain from fresh context exceeds these costs.

That claim depends entirely on handoff quality. If the encoded handoff fails to preserve what would have transferred in a shared session, the receiving session is operating on degraded input — which is worse than the mode-collapse it was meant to replace. Mode-collapse at least operates on the real picture (just corrupted by the collapse). A bad handoff produces a session operating on a distorted picture *and* paying the architectural cost to do so.

### What Bad Handoffs Look Like

The failure is not random encoding error. It is systematic loss of the kinds of context that resist explicit encoding:

**Lossy encoding.** The handoff captures the decisions but not the live tensions, the considered-and-rejected paths, the *"we almost went with X but Y because Z"* context that would have been visible in shared session state. A planner reading "scope: A, B, C" without seeing that "we initially had D in scope and removed it because of constraint K" will plan as if D was never considered — and may rediscover D's appeal mid-execution without K's reasoning to bound it.

**Missing dynamic types.** Static handoffs preserve static decisions but not *live* state — assumptions that feel load-bearing but are still tentative, conclusions that feel right but are sensitive to inputs the next session will see, hypotheses that the prior session was about to test. These dynamic types resist encoding because they have no settled form yet, but they are exactly the context the next session needs to know is unstable.

**Missing crucial context that felt obvious.** The most dangerous gap. The encoder knew something but did not write it down because encoding it felt like overhead — the kind of context everyone-on-the-project-knows. Receiving sessions in fresh context do not have that everyone-knows context. They proceed as if the unwritten thing did not exist.

**Minimum-met-but-insufficient handoffs.** The handoff satisfies the [encoded-handoff constraint](klappy://canon/constraints/mode-transitions-require-encoded-handoff)'s minimum content requirement but is shallow — checkbox compliance without substantive encoding. The format is right; the meaning is thin. The receiving session has nothing to refuse the handoff against, but it also has nothing to work with.

### When Costs Exceed Benefits

The architecture fails to pay back when handoff quality is poor enough that the receiving session is operating on a distorted view *and* the orchestration cost is being paid in full. Two specific conditions:

**The encoder is the only one who knew it.** When the prior session held context that genuinely cannot be reconstructed from canon, prior journal entries, or general project knowledge — and the encoder did not surface it — that context dies at the gate. The receiving session has no way to recover it. Mode-collapse would have preserved it; session-per-mode loses it.

**The encoding norms have not yet caught the failure mode.** Every project has handoff-quality patterns that emerge over time. Until those patterns include the specific kind of context that gets routinely lost, sessions-per-mode will produce visibly worse output than mode-collapse on that kind of work. The principle becomes load-bearing only after the encoding norms are sharp enough to capture what matters.

In both cases, the rational choice is to relax the architecture for the affected transitions until the failure mode is addressed — either by mode-collapse with operator override (per [the encoded-handoff constraint's override provision](klappy://canon/constraints/mode-transitions-require-encoded-handoff)), or by improving the encoding norms first, or by accepting that some handoffs need supplementary live consultation between sessions.

### Detection Signals

A session operating on a bad handoff produces detectable signals:

- The receiving session asks questions whose answers should have been in the handoff (and that the handoff format was supposed to capture)
- The receiving session builds on assumptions not stated in the handoff, sourced from inference or generalization rather than from declared inputs
- The receiving session's output contradicts implicit context the prior session held but did not encode
- Findings or revisions surface issues the prior session would have prevented if its context had transferred

These signals are detectable to the receiving session itself, to a downstream session reviewing both, and to a longitudinal review of the project's journal entries. The architecture's mitigation path is to make these signals visible — receiving sessions can refuse insufficient handoffs and request escalation rather than proceeding with degraded input.

### Mitigation, Not Elimination

Handoff quality is its own discipline, distinct from the structural discipline of session boundaries. The principle's costs only pay back if both disciplines are in place. Specifically:

- **Encoding norms must surface dynamic types, considered-and-rejected paths, and load-bearing-but-tentative state** — not just settled decisions. Norms emerge over time and from observed failures.
- **Receiving sessions must be able to flag insufficient handoffs** as a first-class outcome — distinct from "I disagree with the handoff" or "I have findings about it." A handoff insufficiency is a structural problem requiring escalation, not a content disagreement requiring resolution.
- **Audit trails should preserve handoff insufficiency events** so projects can observe which transitions routinely produce bad handoffs and improve norms at those gates.
- **Operator override is a legitimate response to chronic handoff-quality problems** for affected transitions — not as a permanent retreat, but as a stopgap until norms catch up.

The principle is right when handoffs are right. It is wrong, in the sense of producing worse outcomes than its alternative, when handoffs are bad. The architecture does not eliminate the encoding-quality problem; it relocates it from "did the prior session communicate well" to "did the prior session encode well." That is a different problem and one some failure modes resist.

---

## Derivation

This principle derives from three sources, each of which it generalizes:

**Axiom 4 — You Cannot Verify What You Did Not Observe.** A session that operates across mode boundaries with shared context has not fully observed each mode's truth conditions. It has observed an interpolation between them, weighted by which mode's framing arrived first. Fresh context per mode restores the capacity to observe each mode's reality cleanly.

**Verification Requires Fresh Context.** That principle named the corruption shape for the creation→validation transition specifically. This principle observes that the same shape applies at every transition — exploration→planning corrupted by premature convergence, planning→execution corrupted by speculative certainty, validation→resolution corrupted by inherited framing. The structural mechanism is the same; only the surface symptom differs.

**Critic Cannot Be Resolver.** That constraint named the corruption shape for the detection→remediation transition. This principle observes that *every* role transition is a critic-cannot-be-resolver instance in spirit — each role's purpose is bounded by its mode's truth conditions, and each downstream role inherits corruption when it shares context with the upstream role.

The relationship is not that this principle replaces those. It generalizes them, and they remain the canonical references for their specific transitions. Where a question is specifically about creation→validation, [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) is the right pointer. Where the question is about session structure across all transitions, this principle is the right pointer.

---

## Confidence

**Working belief.** The underlying corruption mechanism is established (verification requires fresh context, critic cannot be resolver). Generalizing to all mode transitions is consistent with the established mechanism but has more limited production evidence — the canonical applications have been creation→validation and detection→remediation specifically.

**Retraction conditions:**

- If production evidence shows that one or more transitions produce no measurable signal degradation when context is shared (controlling for handoff quality), the universal claim is retracted in favor of the previously canonical narrower constraints.
- If the cost of fresh sessions per transition exceeds the benefit at scale — for example, if the orchestration overhead for invisible mode transitions consumes most of the throughput gain — the principle is revised to identify which transitions justify fresh sessions and which do not.

**What would falsify the principle most cleanly.** A controlled comparison between two work streams: one with full session-per-mode discipline, one with shared context across two-or-more transitions, both producing the same artifact. If the shared-context stream produces equal or higher-quality output with the same effort budget, the universal claim is wrong and the canonical narrower constraints (verification-requires-fresh-context, critic-cannot-be-resolver) are sufficient.

The principle is consequential because it argues for more session boundaries — and therefore more handoffs, more journal entries, more orchestration cost — than the previously canonical narrower constraints required. That cost is real. The claim is that the signal-quality gain exceeds the cost. That claim deserves pressure.

---

## See Also

- [Epistemic Modes](klappy://canon/epistemic-modes) — the parent canon defining the modes themselves
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — the principle this generalizes for the creation→validation transition specifically
- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — the constraint this generalizes for the detection→remediation transition specifically
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the operator-attention argument for mode separation
- [Mode Transitions Require Encoded Handoff](klappy://canon/constraints/mode-transitions-require-encoded-handoff) — the binding rule that operationalizes this principle
- [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) — the runtime architecture that enforces this principle for agent work
- [Mode-Separated Conversations](klappy://docs/mode-separated-conversations) — the conversational application of this principle
