---
uri: klappy://docs/oddkit/proactive/handoff-to-new-conversation
title: "Proactive Handoff — Detect Saturation, Bootstrap the Next Conversation"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "handoff", "proactive", "context-window", "saturation", "bootstrap", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Handoff — Detect Saturation, Bootstrap the Next Conversation

> Handoff is not "save and continue elsewhere." It is a proactive optimization that detects natural handoff points and initiates transition before quality degrades.

---

## Summary — Leave Before You Have To

The passive pattern was to continue a conversation until it failed — until the context window filled, responses degraded, or the operator noticed quality dropping. By then, valuable context was already lost or compressed. The handoff was reactive and lossy.

The proactive pattern is to detect natural handoff points and propose transition before quality degrades. The agent monitors for cognitive saturation — the point where the context window is full enough that new information displaces important earlier context — and initiates handoff while the conversation is still healthy.

---

## When to Propose Handoff

Propose handoff when:

- A major task or phase is complete and the next task is distinct.
- The context window is approaching capacity (the agent's responses are getting less precise or referencing earlier context less accurately).
- The conversation has shifted topics enough that the original orientation no longer applies.
- The agent detects diminishing returns — the same quality of work could be produced with a fresh context that includes only the relevant state.

The test: would a fresh conversation with a curated bootstrap produce better results than continuing this one?

---

## What Gets Bootstrapped

Bootstrapping the next conversation means curating what transfers. Not the entire conversation history — that's the problem handoff solves. Instead:

- **Project journal** — the accumulated OLDC+H from this session.
- **Active decisions** — what was decided and what governs.
- **Active constraints** — what rules apply going forward.
- **Handoff items** — explicit next actions and open questions.
- **Relevant canon references** — URIs the next session will need.

The operator reviews what gets carried forward. The agent proposes; the operator approves.

---

## Example — What a Handoff Proposal Looks Like

After completing the oddkit implementation and pushing the PR, the agent detects: task is complete, context window is filling, the next task (A/B testing) is distinct. The agent proposes:

*"This session produced 8 commits across 2 repos. The implementation work is complete. The next task — A/B testing — is a different mode (exploration/validation) and would benefit from a fresh context. Here's the handoff bootstrap:*

*Active decisions: catalog gets sort_by/limit/filter_epoch, full frontmatter on IndexEntry, governance before code.*

*Active constraints: INDEX_VERSION must bump on schema changes, governance articles before oddkit code changes.*

*Next actions: merge klappy.dev PR #72, then run A/B test scenarios using canon_url branch override.*

*Open questions: does the SSE test timeout fix resolve the flaky CI, or is there a deeper issue?*

*Want me to prepare this as a handoff document?"*

The operator reviews, adjusts, and starts fresh with curated context rather than degraded context.

---

## The Universal Failure Mode

This addresses a failure mode common to all AI conversation tools: conversations get long, quality degrades silently, and neither user nor agent acts on it. The degradation is gradual — each response is slightly less grounded than the last, slightly less aware of earlier context. By the time the operator notices, significant quality has been lost.

Proactive handoff names this pattern and provides a mechanism: the agent monitors for it and proposes transition while quality is still high.

---

## The Passive Pattern This Replaces

Under E0006, handoff happened when the operator decided to start a new conversation — usually after noticing degradation. The agent did not monitor for saturation, did not propose transition, and did not prepare a bootstrap. The operator had to manually transfer relevant context to the new conversation, which was itself a lossy process.

Under E0007, the agent detects the signal, proposes the transition, and prepares the bootstrap. The operator reviews and decides.
