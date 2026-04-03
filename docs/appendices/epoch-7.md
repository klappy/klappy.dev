---
uri: klappy://docs/appendices/epoch-7
title: "Epoch 7 — From Passive to Proactive"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "proactive-posture", "cognitive-rhythm", "oldc-h", "epoch-7"]
epoch: E0007
date: 2026-04-03
supersedes: "Epoch 6 (scoped truth and operator governance)"
forcing_fault: "A system that requires its user to remember its features has delegated its cognition to the wrong party"
new_invariant: "The system acts, the operator reviews"
core_shift: "Passive tool invocation → proactive cognitive rhythm. User-remembered features → system-initiated behavior."
documents_introduced: ["docs/oddkit/encode-persistence-gap.md", "docs/oddkit/proactive/proactive-orient.md", "docs/oddkit/proactive/proactive-search.md", "docs/oddkit/proactive/proactive-challenge.md", "docs/oddkit/proactive/proactive-gate.md", "docs/oddkit/proactive/proactive-validate.md", "docs/oddkit/proactive/proactive-preflight.md", "docs/oddkit/proactive/continuous-encoding.md", "docs/oddkit/proactive/proactive-identity-of-integrity.md", "docs/oddkit/proactive/encode-does-not-persist.md", "docs/oddkit/proactive/oldc-h-vocabulary.md", "docs/oddkit/proactive/handoff-to-new-conversation.md", "docs/oddkit/proactive/terminology-project-journal.md", "odd/ledger/project-journal-best-practices.md"]
---

# Epoch 7 — From Passive to Proactive

> E0006 governed the operator's relationship to the system. E0007 governs the system's relationship to the operator — and reverses who initiates. The axioms don't change. The tools don't change. What changes is who acts first: the system proposes, the operator reviews. A tool that waits to be remembered is a tool that waits to be forgotten.

---

## Summary — The System Acts, the Operator Reviews

E0006 introduced operator governance and scoped truth. Together they ensured the operator could be sustainable while the system's truth remained portable. The guiding question was "Am I being faithful, and is this sustainable?" That question was correct and remains correct. But it was incomplete.

What emerged through observation — not theory — is that a system can satisfy every epistemic requirement while remaining invisible to its own operator. Every oddkit tool worked. Every governance article existed. Every constraint was encoded. And the operator still had to remember to use them. The tools were correct and available and unused — not because they failed, but because they waited.

E0006 had no axis for "who initiates." E0007 adds it.

The passive posture was not a mistake. It was intentional constraint during a period when the system needed to prove itself without imposing. The tools needed to be tested by an operator who chose them, not prompted by a system that insisted. That testing phase is complete. Months of daily driving oddkit across code, household planning, financial decisions, and home buying produced validated learning: the tools work, the operator trusts them, and the remaining friction is that the operator must remember they exist.

That friction is now the signal.

---

## A Change in What the System Assumes About Initiative

E0007 changes the answer to a foundational question:

**Who acts first — the operator or the system?**

E0006 answered: the operator acts. The system responds faithfully when invoked, sustainably within the operator's chosen boundaries.

E0007 answers: the system acts first. The operator reviews, approves, corrects, or overrides. The system proposes orientation when context shifts. The system tracks observations and learnings continuously. The system challenges consequential claims before encoding them. The system detects saturation and proposes handoff before quality degrades. The operator governs — but the system initiates.

This is a foundational shift because it changes what "available" means. Under E0006, an available tool was sufficient. Under E0007, an available tool that waits to be invoked has delegated its cognition to the operator's memory — the least reliable component in the system. Available is necessary but no longer sufficient. The tool must also act.

---

## The Forcing Fault — Delegated Cognition

The forcing fault is not a tooling failure. It is a design posture that succeeded itself into irrelevance.

The passive posture — tools that wait for explicit invocation — was the correct design for the testing phase. An operator learning to trust a new epistemic system needs to choose when and how to engage each tool. Prompting would have been intrusive. Waiting was respectful. The problem is that waiting, once correct, became permanent. The system never graduated from "prove yourself" to "participate."

The result: a system with 400+ governance documents, six completed epochs, validated daily use across multiple domains — and an operator who still had to type "encode OLDC+H" from memory. The system knew what OLDC+H meant. The system knew when encoding was appropriate. The system knew the operator wanted continuous tracking. And the system waited.

This is the RITUAL_DETECTED pattern: when a human repeatedly performs the same invocation sequence across sessions, the system has enough evidence to propose that sequence proactively. The ritual is the signal that the behavior should have been internalized.

Under E0006, this pattern was invisible to the evaluation framework. A system that waited faithfully for invocation was not violating any criterion. E0007 calls it a system failure — specifically, a failure of initiative.

---

## The New Invariant

**The system acts, the operator reviews.**

This invariant was previously false in the system's posture. A system that waited for invocation while the operator forgot its features was not a recognized failure mode. Now it is.

---

## One Shift — Proactive Cognitive Rhythm

### Every Tool Becomes Proactive

The shift applies to every oddkit tool, not just encode:

**Orient** is not a session-start ritual. The system reorients whenever context shifts, a new subtask emerges, or the mode may have changed. The operator does not need to remember to ask "where are we?"

**Search** happens before claiming, not after failing. When the system is about to make a claim that canon might have guidance on, it searches first. The operator does not need to remember what the canon covers.

**Challenge** fires before encoding consequential decisions. When a claim would close options, create constraints, or be expensive to reverse, the system challenges it proactively. The operator does not need to remember to ask "what could go wrong?"

**Gate** activates at every implicit mode transition. When the system detects a verb change — from exploring to building, from planning to executing — it gates. Most transitions are implicit. The operator does not need to recognize the shift.

**Validate** runs before claiming done. When the system believes a task is complete, it validates against requirements before presenting the deliverable. The operator does not need to remember to check.

**Preflight** precedes every execution task. Before producing an artifact, the system checks constraints and definition of done. The operator does not need to remember what was required.

**Encode** tracks continuously. Observations, learnings, decisions, constraints, and handoffs are captured at every exchange — not batched at session end. The operator does not need to remember to journal.

### The Identity of Integrity as Self-Correction

The creed and axioms are not a one-time orientation. They are a continuous self-correction mechanism. When the system detects its confidence outrunning its evidence — when it is about to claim what it has not verified — it resurfaces its own creed. This is observably effective: proactive creed resurfacing corrects hallucination patterns that passive orientation does not catch.

### Encode Does Not Persist — And That's the Caller's Problem

A critical discovery: the encode tool returns structured artifacts in the response stream. It does not persist them. Every encode output that isn't saved by the caller is lost. This is by design — ODD is a protocol layer, not a storage layer. But the design created a gap: the operator assumed encoding meant saving. It did not.

E0007 makes this explicit. Every encode response declares `persist_required: true` and instructs the caller to save the output. The system does not silently lose the operator's work.

### OLDC+H as Standard Vocabulary

Observations, Learnings, Decisions, Constraints, Handoffs — OLDC+H — is the standard vocabulary for session capture. Under E0006, this vocabulary existed but was not discoverable. An operator who didn't already know the acronym couldn't find it. E0007 ensures OLDC+H surfaces in any search about session capture, journaling, or encoding.

---

## From "Am I Being Faithful and Sustainable?" to "Am I Acting, Not Just Available?"

The guiding question expands. E0006's question remains embedded — faithfulness and sustainability are still required. E0007 adds initiative as a co-equal criterion.

This is not a relaxation. It is a constraint. Under E0006, a system that waited faithfully and sustainably for invocation was not violating any evaluation criterion. Under E0007, it is. The system now requires evidence that it initiates appropriate actions, that it does not delegate cognition to the operator's memory, and that "available" is a starting point rather than a destination.

---

## What E0007 Does Not Change

- **The four axioms carry forward unchanged.** Reality Is Sovereign. A Claim Is a Debt. Integrity Is Non-Negotiable Efficiency. You Cannot Verify What You Did Not Observe.
- **The creed carries forward unchanged.** Before I speak, I observe. Before I claim, I verify. Before I confirm, I prove. What I have not seen, I do not know. What I have not verified, I will not imply.
- **Operator governance carries forward.** Capability is still not permission. Sustainability is still required.
- **Scoped truth carries forward.** Axioms travel. Domain doesn't.
- **All E0006 principles remain valid within E0006.** No prior work is invalidated.
- **Progressive disclosure and writing canon remain in force.**
- **The Definition of Done still applies.** E0007 extends what "available" means — it does not replace the existing requirements.

---

## Evidence — Not Theory

This epoch is grounded in observation, not speculation. The evidence includes:

- **Daily driving across domains.** Months of using oddkit for software development, household planning, financial decisions, and home buying. The tools work. The trust is established. The remaining friction is recall.
- **The "encode OLDC+H" ritual.** The operator typed this invocation sequence from memory in every session. The system had enough context to propose it proactively. It waited instead.
- **The persistence gap discovery.** The operator assumed encode persisted. It did not. Multiple sessions of work were silently lost because the system did not declare its own limitation.
- **BM25 surfacing failure.** The cornerstone article — a comprehensive treatment of the proactive posture — did not surface in oddkit's top-5 search results. Many small, pointed files are required for discoverability. The system's own search mechanism confirmed the need for spin-off articles.
- **Proactive creed resurfacing.** In sessions where the creed and axioms were resurfaced mid-conversation, hallucination patterns were observably corrected. In sessions where they were only stated at orientation, drift accumulated.
- **The OLDC+H discoverability problem.** An operator who didn't know the acronym couldn't find the vocabulary. The system required prior knowledge of its own conventions to use them.

---

## Epoch 7 Documents

| Document | Purpose |
|----------|---------|
| `docs/oddkit/encode-persistence-gap.md` | Cornerstone article — diagnoses the encode persistence gap, prescribes continuous proactive usage |
| `docs/oddkit/proactive/proactive-orient.md` | Proactive orient — reorient at every context shift |
| `docs/oddkit/proactive/proactive-search.md` | Proactive search — search before claiming |
| `docs/oddkit/proactive/proactive-challenge.md` | Proactive challenge — challenge before encoding |
| `docs/oddkit/proactive/proactive-gate.md` | Proactive gate — gate at every mode transition |
| `docs/oddkit/proactive/proactive-validate.md` | Proactive validate — validate before claiming done |
| `docs/oddkit/proactive/proactive-preflight.md` | Proactive preflight — preflight before every execution task |
| `docs/oddkit/proactive/continuous-encoding.md` | Continuous OLDC+H encoding — track at every turn |
| `docs/oddkit/proactive/proactive-identity-of-integrity.md` | Proactive Identity of Integrity — resurface the creed to prevent drift |
| `docs/oddkit/proactive/encode-does-not-persist.md` | Encode does not persist — the caller must save |
| `docs/oddkit/proactive/oldc-h-vocabulary.md` | OLDC+H — the five standard artifact types |
| `odd/ledger/project-journal-best-practices.md` | Project journal best practices — sizing, timestamps, tradeoffs |
| `docs/oddkit/proactive/handoff-to-new-conversation.md` | Proactive handoff — detect saturation, bootstrap next conversation |
| `docs/oddkit/proactive/terminology-project-journal.md` | Terminology — project journal over epistemic ledger |
| This document | Epoch declaration and historiographic record |

---

## Compatibility

- E0006 artifacts remain valid within E0006.
- E0006 artifacts are not comparable to E0007 artifacts by default — E0007 requires evidence of proactive system initiative that E0006 does not.
- E0007 is the current epoch.
