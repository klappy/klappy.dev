---
uri: klappy://canon/definition-of-done
title: "Definition of Done & Evidence Policy"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: semi_stable
tags: ["definition-of-done", "evidence"]
derives_from: "canon/values/axioms.md (Axiom 2 — A Claim Is a Debt)"
relevance: decision
execution_posture: governing
start_here: true
start_here_order: 13
start_here_label: Definition of Done
---

# Definition of Done & Evidence Policy

> The enforcement backbone that defines what "complete" means.

## Description

This policy is a specific application of the foundational axiom that every claim creates an evidence obligation. This policy defines completion requirements for all work: code, UI, architecture, automation, documents, and AI-assisted outputs. Work is only done when it includes a change description, verification performed, observed behavior, evidence produced, and self-audit completed. Evidence must demonstrate actual behavior (screenshots, recordings, rendered output, test logs) and be produced after the change. Visual verification is required for UI work. The policy covers partial completion handling, explicit exceptions, and agent responsibilities.

## Outline

- Core Principle: Verified with evidence
- Definition of Done (5 requirements)
- Evidence Requirements
- Visual Verification (Preferred)
- Verification Must Be Performed
- Self-Audit Requirement
- What Does Not Count as Done
- Partial Completion
- Explicit Exceptions
- Agent Responsibility

---

## Operating Constraints

- MUST include all 5 DoD requirements: Change Description, Verification Performed, Observed Behavior, Evidence Produced, Self-Audit Completed
- MUST produce evidence after the change, not before or from previous runs
- MUST demonstrate actual behavior, not expected or intended behavior
- MUST provide visual proof for any work affecting UI, interaction, layout, or visible state
- MUST NOT claim "done" without evidence; the correct response is "This is not complete yet"
- MUST label partial completion explicitly with what was verified and what remains
- MUST validate document deliverables against the Writing Canon checklist (`canon/meta/writing-canon.md`) before claiming completion

---

## Defaults

- When uncertain whether evidence is needed: include it
- Short recordings (10-30 seconds) are usually sufficient for interaction work
- Self-audit should be brief reflection, not bureaucracy
- If evidence cannot be produced, state why and propose an alternative
- Treat ambiguity as worse than incompleteness

---

## Failure Modes

- **"It compiles"**: Treating successful compilation as completion
- **"The logic is sound"**: Treating reasoning as substitute for verification
- **"This should work"**: Treating confidence as evidence
- **"I reviewed the code"**: Treating inspection as observation of behavior
- **"I didn't have time to test"**: Treating explanation as exemption from evidence
- **"The document exists"**: Treating file creation as completion without validating progressive disclosure structure

---

## Verification

- System was actually run or exercised (dev server, tests, page load, workflow trigger)
- Evidence shows actual observed behavior (screenshots, recordings, test logs, DOM snapshots)
- Evidence is specific to the task and clearly labeled
- Self-audit includes: intended outcome, constraints applied, decision rules followed, tradeoffs, remaining risks

---

## Content

**Canon v0.1**

> This is the enforcement backbone of the canon. It replaces repeated QA reminders with a clear, reusable contract.

This page defines what I mean when I say work is “done.”
If these conditions are not met, the work is not complete, regardless of confidence or explanation.

This policy applies to:
• code
• UI
• architecture
• automation
• AI-assisted outputs

---

## 📌 Core Principle

I do not consider work complete unless it is verified with evidence.

Reasoning alone is insufficient.
Assertions like “this should work” or “this is correct” do not count as completion.

---

## 📋 Definition of Done (DoD)

A task is only considered done when all of the following are present:

1. **Change Description** — What changed, where, and why.
2. **Verification Performed** — What was run or checked to verify the change.
3. **Observed Behavior** — What actually happened when the system was run.
4. **Evidence Produced** — Proof that the behavior matches the intended outcome.
5. **Self-Audit Completed** — A brief audit against constraints and decision rules.

If any of these is missing, the task is incomplete.

---

## 📎 Evidence Requirements

Evidence must demonstrate actual behavior, not expected behavior.

Acceptable evidence includes one or more of the following:
• screenshots
• short screen recordings (10–30 seconds)
• rendered output files
• test output logs
• DOM snapshots or structured UI state captures

Evidence must be:
• produced after the change
• specific to the task
• clearly labeled

---

## 📄 Document Deliverables — Progressive Disclosure Is a Structural Requirement

If the work produces a document targeting `canon/`, `odd/`, or `docs/`, the document must pass the Writing Canon checklist (`canon/meta/writing-canon.md`):

1. **Title** names the concept and its stance
2. **Blockquote** contains the complete compressed argument — an agent could act on title + blockquote alone
3. **Metadata** includes epoch, derivation, governance with full file paths
4. **Summary section** (`## Summary — [subtitle]`) is self-contained — could skip everything below and have the full picture
5. **Headers** pass the scan test — reading them in sequence tells the document's story
6. **No buried claims** — every key assertion is present in compressed form at a higher tier

A document that exists but fails these tiers is not done. Existence is not quality.

This was added after the Progressive Disclosure Failure incident (February 2026) — see `docs/incidents/progressive-disclosure-failure-2026-02.md`.

---

## 👁️ Visual Verification (Preferred)

If the work affects:
• UI
• interaction
• layout
• user flow
• visible state

Then visual proof is required.

**What counts as visual proof**
• screenshot showing the correct state
• short recording demonstrating the interaction
• before/after comparison when relevant

If visual proof cannot be produced, the reason must be stated explicitly.

---

## 🔬 Verification Must Be Performed

I expect the system to be run or exercised, not just reasoned about.

Verification may include:
• running a dev server
• executing tests
• loading a page
• triggering a workflow
• simulating offline/online transitions

If verification cannot be performed (missing environment, credentials, etc.), this must be stated clearly, along with a proposed alternative.

---

## 🔍 Self-Audit Requirement

Each completed task must include a short self-audit covering:
• intended outcome
• relevant constraints applied
• relevant decision rules followed
• known tradeoffs
• remaining risks or unknowns

The purpose is reflection and traceability, not bureaucracy.

---

## ⚠️ What Does Not Count as Done

The following do not qualify as completion:
• “It compiles”
• “The logic is sound”
• “I reviewed the code”
• “This should work”
• “I didn’t have time to test”

These may be intermediate states, but they are not “done.”

---

## ⏳ Partial Completion

If work is partially complete, it must be labeled as such.

A valid partial completion includes:
• what was attempted
• what was verified
• what could not be verified
• what remains

Ambiguity is worse than incompleteness.

---

## 🚫 Explicit Exceptions

This policy may be relaxed only when explicitly stated, such as for:
• conceptual design discussions
• theoretical analysis
• early ideation

In those cases, the output must be clearly labeled “unverified”.

---

## 🤖 Agent Responsibility

Agents and collaborators are expected to:
• retrieve this policy before claiming completion
• translate it into neutral/system requirements
• enforce it against their own output
• refuse to claim “done” without evidence

If evidence cannot be produced, the correct response is:

“This is not complete yet.”

---

## 💡 Closing Note

This policy exists to:
• prevent false confidence
• reduce rework
• replace repeated QA reminders
• make outcomes trustworthy

It is not meant to slow work down.
It is meant to stop work from being incorrectly declared finished.

---

## ✅ Status

- Canon v0.1 — Definition of Done & Evidence Policy complete
- Ready to proceed to Canon v0.1 — Self-Audit Checklist
