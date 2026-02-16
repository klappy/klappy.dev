---
uri: klappy://canon/self-audit
title: "Self-Audit Checklist"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: evolving
tags: ["self-audit", "verification"]
relevance: supporting
execution_posture: operational
---

# Self-Audit Checklist

> A reflection layer that makes the Definition of Done actionable.

## Description

The self-audit checklist defines how work should be self-reviewed before claiming completion. It covers ten areas: intended outcome, constraints applied, decision rules followed, verification performed, evidence produced, document structure validation, UX and behavior check, tradeoffs and risks, maintainability check, and confidence level. Minimum acceptable completion requires a stated outcome, at least one verification step, at least one piece of evidence, and acknowledgment of tradeoffs or unknowns. This replaces repeated back-and-forth questions about whether work was actually run and verified.

## Outline

- Intended Outcome
- Constraints Applied
- Decision Rules Followed
- Verification Performed
- Evidence Produced
- Document Structure Check
- UX & Behavior Check
- Tradeoffs & Risks
- Maintainability Check
- Confidence Level
- Minimum Acceptable Completion
- Agent Expectations

---

## Content

**Canon v0.1**

> This is the reflection and enforcement layer that makes the Definition of Done actionable without turning you into a QA manager.

This checklist defines how I expect work to be self-reviewed before it is considered complete.

The purpose is not bureaucracy.
The purpose is to catch obvious failures before someone else does.

Every completed task must include a filled version of this checklist.

---

## 📌 Core Principle

I expect builders—human or AI—to audit their own work against stated outcomes, constraints, and evidence.

If an item cannot be answered, that is a signal—not a failure.

---

## 📋 Self-Audit Checklist

### 1. Intended Outcome

   • What outcome was this work intended to achieve?
   • How will someone know if that outcome was achieved?

---

### 2. Constraints Applied

- Which constraints were relevant to this task?
- (e.g., offline-first, maintainability, interoperability)
- Were any default constraints intentionally overridden?
- If yes, why?

---

### 3. Decision Rules Followed

- Which decision rules guided the approach?
- (e.g., Borrow→Bend→Break→Beget→Build (`canon/methods/borrow-bend-break-beget-build.md`), KISS, explicit tradeoffs)
- Were there moments where a different rule could have been applied?
- Why was it not?

---

### 4. Verification Performed

- What was run or exercised to verify the work?
- What behavior was directly observed?

---

### 5. Evidence Produced

- What evidence proves the behavior occurred?
  - screenshots
  - recordings
  - logs
  - rendered output
- Where can this evidence be found?

---

### 5b. Document Structure Check (If Applicable)

If the deliverable is a document targeting `canon/`, `odd/`, or `docs/`:

   • Does it pass the Writing Canon checklist (`canon/meta/writing-canon.md`)?
   • Does the blockquote contain the full compressed argument?
   • Is the Summary section self-contained?
   • Do headers tell the story when read in sequence?
   • Could an agent act on title + blockquote alone?

---

### 6. UX & Behavior Check (If Applicable)

- Does the UI or interaction behave as expected?
- Is the behavior understandable without explanation?
- If explanation is required, is that a UX smell?

---

### 7. Tradeoffs & Risks

- What tradeoffs were made?
- What risks remain?
- What assumptions could be wrong?

---

### 8. Maintainability Check

- Would someone else understand this in six months?
- What would be the hardest part to maintain or change?

---

### 9. Confidence Level

- How confident am I that this works as intended?
- What would increase confidence further?

---

## ⚠️ Minimum Acceptable Completion

At a minimum, a completed task must include:
• a stated outcome
• at least one verification step
• at least one piece of evidence
• acknowledgment of tradeoffs or unknowns

If these are missing, the task is not complete.

---

## 🚫 What This Checklist Is Not

This checklist is not:
• a justification exercise
• a sales pitch
• a guarantee of correctness

It is a thinking aid designed to surface problems early.

---

## 🤖 Agent Expectations

Agents and collaborators are expected to:
• fill this checklist before claiming completion
• be concise (one sentence per item is often enough)
• explicitly state uncertainty instead of hiding it

If an agent cannot complete the checklist honestly, the correct action is to continue working or mark the task incomplete.

---

## 📦 Canon Document Preflight — Six Checks Before Done

When the deliverable is a canon document, six checks must pass before it is considered done. This preflight supplements the self-audit — it does not replace it.

1. **Progressive disclosure** — Writing Canon checklist (`canon/meta/writing-canon.md`): blockquote with complete compressed argument, self-contained summary, descriptive headers, no buried claims.
2. **Drift audit** — What existing documents does this create tension with? For each: amend, acknowledge, or investigate. See `canon/values/drift.md`.
3. **Cross-reference integrity** — Bidirectional links verified. `derives_from`, `complements`, and `governs` fields are accurate and reciprocated where appropriate.
4. **Downstream amendments** — Existing documents that should now reference the new document have been updated.
5. **Frontmatter completeness** — YAML metadata includes URI, title, audience, exposure, tier, voice, stability, tags, epoch, date, and relationship fields as applicable.
6. **Self-audit** — This ten-item checklist, completed honestly.

---

## 💡 Closing Note

This checklist exists to replace repeated back-and-forth questions like:
• “Did you actually run it?”
• “Did you verify this visually?”
• “Why did you choose this approach?”

Those questions should already be answered here.

---

## ✅ Status

- Canon v0.1 — Self-Audit Checklist complete
- Ready to proceed to Canon v0.1 — Visual Proof Standards
