---
uri: klappy://docs/mode-separated-conversations
title: "Mode-Separated Conversations"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["exploration", "planning", "execution", "validation", "resolution", "collaboration", "fresh-context", "session-discipline"]
epoch: E0009
date: 2026-05-10
---

# Mode-Separated Conversations

> Trust emerges when participants know which epistemic mode they are in.

## Relationship to Canon

This document operationalizes:

- **Canon: Epistemic Modes** (`klappy://canon/epistemic-modes`) — the five canonical modes
- **Canon: Sessions Mirror Modes** (`klappy://canon/principles/sessions-mirror-modes`) — the principle that each mode earns its own session
- **Canon: Mode Transitions Require Encoded Handoff** (`klappy://canon/constraints/mode-transitions-require-encoded-handoff`) — the binding rule for journals + transition-specific handoffs at every gate

It does not redefine the modes or the constraints.
It describes how conversations respect them.

---

## The Core Insight

Confusion and mistrust arise when:

- exploration conversations pretend to decide
- planning conversations pretend to execute
- execution conversations reopen exploration
- validation conversations modify the artifact under review
- resolution conversations expand scope beyond findings

Separating conversations by epistemic mode reduces friction without reducing rigor.

---

## Exploration Conversations

Purpose:

- surface possibilities
- identify tensions and competing frames
- map the territory before deciding what to build

Characteristics:

- questions outnumber answers
- no convergence required
- assumptions are surfaced rather than acted on

Invalid moves:

- claiming a decision has been made
- treating one option as already chosen
- moving to artifact production before the territory is mapped

---

## Planning Conversations

Purpose:

- clarify intent
- surface assumptions
- explore tradeoffs

Characteristics:

- no artifacts required
- uncertainty is acceptable
- disagreement is productive

Invalid moves:

- claiming completion
- demanding proof
- optimizing prematurely

---

## Execution Conversations

Purpose:

- produce outcomes
- verify results
- evaluate completion

Characteristics:

- artifacts required
- claims must be verifiable
- scope is constrained

Invalid moves:

- introducing new ideas without acknowledgement
- reframing goals retroactively
- debating intent instead of evidence
- validating mid-build — noticing a concern and surfacing it inline rather than carrying it to validation

---

## Validation Conversations

Purpose:

- review produced artifacts against stated claims
- surface gaps between intent and outcome
- recommend disposition per finding (fix, pivot, accept)

Characteristics:

- the artifact exists; scope is bounded by what was claimed
- findings are grouped into a single coherent review, not interleaved with execution
- each finding carries explicit disposition
- conducted with fresh context — separate session, separate reviewer, or temporal break between creation and review (see `canon/principles/verification-requires-fresh-context`)

Invalid moves:

- introducing new requirements the artifact was never asked to satisfy
- modifying the artifact during review
- surfacing findings one-by-one during the build that produced the artifact
- holding accept hostage to findings that are actually planning-class ideas
- performing the review in the same session that produced the artifact, with no context break (this is self-review, not validation)

---

## Resolution Conversations

Purpose:

- address validation findings per their explicit dispositions (fix, pivot, accept)
- produce a revised artifact scoped strictly by the findings
- hand off to a fresh re-validation conversation

Characteristics:

- findings exist with explicit dispositions before the conversation begins
- scope is bounded by the findings, not by reopening planning
- each finding has a remediation action (or is accepted as-is, with reasoning)
- conducted in a fresh session per session-per-mode discipline (see `canon/principles/sessions-mirror-modes`)
- the revised artifact plus a remediation summary per finding is the durable handoff
- re-validation is performed in a separate session that does not inherit the resolver's reasoning

Invalid moves:

- introducing requirements the findings did not surface — that requires explicit reversion to planning
- using remediation as cover for redesign or for changes outside the findings
- self-validating the fix in the same session that produced it (the resolver does not certify their own work)
- ignoring findings rather than disposing of them explicitly
- treating validation findings as suggestions rather than as scoped work items
- handing off to re-validation without a remediation summary

---

## Multiple Participants

Multiple agents or assistants may participate in a single conversation, with one constraint: every participant in a conversation operates in the same mode.

- **Within-mode parallelism is encouraged.** Multiple explorers, multiple validators with different lenses, multiple builders working on different scoped artifacts — all valid. Conversations grow richer; the mode stays clean.
- **Cross-mode parallelism on the same artifact is forbidden.** A validator and a builder cannot share a conversation about the same artifact at the same time — that is mode collapse, not parallelism. The fix is to let each finish their mode and hand off via encoded handoff per `canon/constraints/mode-transitions-require-encoded-handoff`.
- **Cross-mode work on different artifacts is independent.** Two conversations in different modes on different artifacts run in parallel without coordination.

The distinguishing question: are the participants operating on the same artifact in different modes? If yes, separate the conversations. If no, the parallelism is fine.

---

## Operator Override — When Conversations Deliberately Collapse Modes

Operator override is a permitted deviation per `canon/constraints/mode-transitions-require-encoded-handoff`. In conversation, this looks like the operator declaring: *"skipping the gate, here's why, accepting the risks."*

Two categories where override is operationally legitimate:

- **Production incidents.** Urgency exceeds the cost of mode-clean handoffs. The operator collapses modes deliberately and accepts the corruption.
- **Governance creation.** Authoring principles, constraints, and methods is inherently oscillating; drafting a principle implies a constraint, drafting a constraint surfaces a principle refinement. Until handoff norms mature for this category, override-with-record produces work that clean sessions with poor handoffs cannot.

What override is not: a way to skip discipline because it feels heavy in the moment. The override is recorded; the corruption it accepts is acknowledged; the journal entry shows the trail. The override gives the operator a real escape hatch and binds them to declaring the escape explicitly.

---

## Handoff Insufficiency — When the Receiving Conversation Cannot Proceed

A conversation receiving an encoded handoff may discover the handoff is insufficient: missing dynamic context, missing crucial framing the prior session held implicitly, scope items named without bounded definition. Per `canon/methods/persona-shaped-agent-runtime` §Support Handoff-Insufficiency Signaling, this is a structural problem, not a content disagreement.

The receiving participant should:

1. Name the insufficiency explicitly — *"this handoff is insufficient; specifically X is missing"* — distinct from disagreement with the handoff's content
2. Propose a resolution: spawn a fresh upstream conversation, request clarification from the upstream author, or accept under operator override
3. Block on resolution rather than proceeding with degraded input

A conversation that proceeds on a bad handoff produces output worse than mode-collapse would have. Naming the insufficiency is signal; proceeding silently is failure.

---

## Mode Signaling

Mode MAY be signaled explicitly:

- "Let's stay in planning for now"
- "Switching to execution"
- "This is exploratory"
- "Resolving the validator findings now"

Explicit signaling prevents accidental collapse.

---

## Reversion Is Allowed

Returning to an earlier mode is not failure.
It is often evidence of learning.

What matters is **acknowledgement**, not momentum.

---

## Final Note

Mode separation is not rigidity.
It is how collaboration scales without coercion.
