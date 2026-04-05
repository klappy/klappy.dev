---
uri: klappy://docs/oddkit/proactive/posture-lapse
title: "Proactive Posture Lapse — Detecting When the Cognitive Rhythm Breaks Down"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["oddkit", "proactive", "governance", "lapse", "breakdown", "cognitive-rhythm", "smell", "failure-mode", "orient", "gate", "search", "encode", "challenge", "preflight", "validate", "tool-use", "epoch-7", "design-smell"]
epoch: E0007.1
date: 2026-04-04
derives_from: "docs/appendices/epoch-7.md, canon/principles/ritual-is-a-smell.md, canon/values/axioms.md"
complements: "docs/oddkit/proactive/proactive-orient.md, docs/oddkit/proactive/proactive-gate.md, docs/oddkit/proactive/proactive-search.md, docs/oddkit/proactive/proactive-challenge.md, docs/oddkit/proactive/proactive-validate.md, docs/oddkit/proactive/proactive-preflight.md, docs/oddkit/proactive/continuous-encoding.md, docs/oddkit/proactive/proactive-identity-of-integrity.md"
governs: "All agent behavior in oddkit-powered sessions"
status: active
---

# Proactive Posture Lapse — Detecting When the Cognitive Rhythm Breaks Down

> The proactive posture is a cognitive rhythm: orient at every context shift, search before claiming, gate at every mode transition, challenge before encoding, encode at every milestone, validate before claiming done. When this rhythm breaks — when the agent stops using oddkit tools and starts improvising — governance becomes behavioral instead of structural. This article defines the smell tests, failure modes, and required responses for detecting and recovering from a posture lapse.

---

## Summary — The Rhythm Breaks Silently

E0007's core shift (`docs/appendices/epoch-7.md`) moved oddkit from passive (wait for invocation) to proactive (act as cognitive rhythm). The rhythm is: orient → search → challenge → gate → encode → validate, invoked continuously throughout every session, not just at designated moments.

The most dangerous failure mode is not using a tool wrong — it's *forgetting to use it at all*. An agent that stops calling oddkit doesn't produce errors. It produces plausible-sounding output without governance. The operator can't tell the difference unless they know what's missing. This is why posture lapse is a governance problem, not a tooling problem: the system must detect its own silence.

---

## Smell Test — How to Detect a Posture Lapse

### Tool Silence

- **No orient call after a context shift.** The operator changed topics, introduced a new goal, or shifted from asking to directing — and the agent didn't reorient. The session is now operating in an unverified mode.
- **No search before a factual claim about the canon.** The agent says "the canon says..." or "this principle means..." without having searched first. Every claim about canon content is a debt until search verifies it (Axiom 2).
- **No gate at a mode transition.** The conversation moved from exploration to planning or planning to execution, and no gate checked prerequisites. The most common version: the agent starts building an artifact during what was still an exploration conversation.
- **No challenge before encoding a consequential decision.** A decision is being recorded without having been pressure-tested. The encoded artifact may contain unexamined assumptions.
- **No encode at a milestone.** Durable insights, decisions, or constraints emerged in conversation but weren't encoded. They exist only in the transcript — which is ephemeral context, not durable governance.
- **No validate before claiming done.** The agent declares completion without checking whether the deliverable meets the definition of done.

### Behavioral Indicators

- **The agent stops quoting canon and starts paraphrasing from memory.** When output shifts from grounded retrieval to plausible-sounding assertions, the agent has stopped searching.
- **The creed and axioms haven't been surfaced in a long session.** The Identity of Integrity is not a session-start ritual — it's a drift-correction mechanism. If it hasn't been resurfaced during a long or complex session, drift may be accumulating.
- **The operator has to remind the agent to use oddkit.** If the operator says "did you check the canon?" or "shouldn't you gate this?" — the proactive posture has already failed. The whole point of E0007 is that the agent initiates, not the operator.
- **Output quality degrades toward the end of long sessions.** Context window pressure causes agents to drop governance tools first (because they seem optional) and keep content production (because it seems essential). This is backwards — governance tools prevent the errors that make content production worthless.

---

## Failure Modes — What Breaks When the Rhythm Collapses

**Ungrounded claims compound.** Without search, the agent's assertions about the canon drift from what the canon actually says. Each unverified claim becomes the foundation for the next. By mid-session, the agent may be confidently asserting things the canon contradicts — and the operator has no reason to doubt it.

**Premature convergence.** Without gate, exploration collapses into execution without the planning phase that would have revealed missing constraints. The deliverable gets built, then fails review because prerequisites were never checked. This is the most expensive failure mode — the work is done but wrong.

**Undurable decisions.** Without encode, decisions made during conversation exist only in the transcript. Next session, the agent doesn't know what was decided. The operator repeats themselves. Work is redone. The system doesn't compound — it loops.

**Hallucination without correction.** Without challenge, the agent's internal consistency goes unexamined. Hallucinated facts, circular reasoning, and ungrounded assertions pass without resistance. The Identity of Integrity creed exists to correct this — but only if it's surfaced.

**Invisible governance debt.** Every turn without oddkit tools is a turn of ungoverned output. The debt is invisible because the output looks normal. It becomes visible only when a downstream consumer acts on unverified claims and the chain of trust breaks.

---

## What Does NOT Count as a Posture Lapse

- **Not calling every tool on every turn.** Proactive doesn't mean compulsive. A simple factual question doesn't need orient + search + gate + challenge. The rhythm applies to *context shifts*, *mode transitions*, *consequential decisions*, and *milestone completions* — not to every message exchange.
- **The operator explicitly declining a tool invocation.** If the agent offers to gate and the operator says "skip it, I know what I'm doing" — that's the operator exercising judgment, not the agent lapsing. The gap was named, which is the point.
- **Tools returning unhelpful results.** If search returns irrelevant hits or orient gives low-confidence mode assessment, the tools are working — the results just aren't useful for this query. That's a knowledge base coverage issue, not a posture lapse.
- **Quick exchanges in settled territory.** If the conversation is operating within a well-established mode on a well-understood topic, lighter tool use is appropriate. The smell test is whether the agent would *notice* if the mode changed — not whether it gates every sentence.

---

## Required Response When Detected

### Self-Detection (Agent Detects Its Own Lapse)

1. **Acknowledge the gap.** Name what was missed: "I've been responding without searching the canon" or "I should have gated before starting to build that."
2. **Retroactively apply the missed tool.** Run the search, gate, or challenge now. If the results contradict what was already produced, surface the contradiction rather than hiding it.
3. **Encode the lapse itself.** The posture lapse is an observation worth encoding — it reveals where the rhythm is weakest and what conditions cause it to break.
4. **Resurface the creed.** The Identity of Integrity is the recovery mechanism. Reading it resets the posture.

### Operator Detection (Human Notices the Lapse)

1. **The operator's reminder is the signal, not the fix.** If the operator had to remind the agent, the proactive posture failed. Acknowledge this directly rather than just doing the requested tool call.
2. **Diagnose the cause.** What caused the lapse? Context window pressure? A topic shift that wasn't detected? A long session without resurfacing the creed? The cause determines the prevention.
3. **Propose a structural fix.** If the lapse is recurring, it may indicate a ritual smell — the posture depends on the agent remembering to act, which is the exact problem E0007 was supposed to solve. The structural fix might be a governance article that triggers at the detected failure point.

---

## The Posture Health Check

At any point during a session, an agent can self-assess its proactive posture by answering:

1. **When did I last orient?** If the answer is "session start" and the context has shifted since, the posture has lapsed.
2. **Am I currently searching or remembering?** If the answer is "remembering," a search is overdue.
3. **Has the mode changed since my last gate?** If yes and ungated, the gate is overdue.
4. **Have I encoded anything this session?** If the session has produced decisions, observations, or constraints and nothing has been encoded, the encode is overdue.
5. **Would the creed change my current behavior?** If reading the creed would cause the agent to act differently, the creed should have been surfaced earlier.

---

## See Also

- [Epoch 7 — From Passive to Proactive](klappy://docs/appendices/epoch-7) — the epoch that introduced proactive posture
- [Proactive Orient](klappy://docs/oddkit/proactive/proactive-orient) — reorient at every context shift
- [Proactive Gate](klappy://docs/oddkit/proactive/proactive-gate) — gate at every mode transition
- [Proactive Search](klappy://docs/oddkit/proactive/proactive-search) — search before claiming
- [Proactive Challenge](klappy://docs/oddkit/proactive/proactive-challenge) — challenge before encoding
- [Continuous Encoding](klappy://docs/oddkit/proactive/continuous-encoding) — encode at every turn
- [Proactive Validate](klappy://docs/oddkit/proactive/proactive-validate) — validate before claiming done
- [Proactive Identity of Integrity](klappy://docs/oddkit/proactive/proactive-identity-of-integrity) — surface the creed to prevent drift
- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — if the posture depends on remembering, the design has a gap
