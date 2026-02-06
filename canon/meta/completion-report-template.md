---
uri: klappy://canon/completion-report-template
title: "Completion Report Template"
audience: canon
exposure: nav
tier: 3
voice: first_person
stability: evolving
tags: ["completion-report", "template"]
relevance: routing
execution_posture: routing
---

# Completion Report Template

> The standard format for claiming work is complete.

## Description

The completion report template is the mandatory output format for claiming completion. It ties together the Definition of Done, Self-Audit, and Visual Proof Standards into a single, reviewable artifact. Reports must include task overview, intended outcome, what changed, verification performed, observed behavior, evidence produced, visual proof (if applicable), self-audit summary, confidence and gaps, exceptions or notes, and a completion declaration. Reports may be brief but must be honest. If the report is unclear, the work is unclear.

## Outline

- Task Overview
- Intended Outcome
- What Changed
- Verification Performed
- Observed Behavior
- Evidence Produced
- Visual Proof (If Applicable)
- Self-Audit Summary
- Confidence & Gaps
- Exceptions or Notes
- Completion Declaration

---

## Content

**Canon v0.1**

> This is the standard output format humans and agents must use to claim completion. It ties together the Definition of Done, Self-Audit, and Visual Proof Standards into a single, reviewable artifact.

This template defines how completed work must be reported.
If a task does not have a completion report following this structure, it is not complete.

This report may be brief, but it must be honest.

---

## 1. Task Overview

- **Task name:**
- **Date:**
- **Status:** Complete / Partially Complete / Not Complete

**Short description:**
What this task was intended to do (1–2 sentences).

---

## 2. Intended Outcome

What outcome was this work meant to achieve?

How would someone know, by observation, that the outcome was achieved?

---

## 3. What Changed

List the concrete changes made.

Examples:
• files modified
• components added or removed
• behavior changed

Be specific but concise.

---

## 4. Verification Performed

What was run or exercised to verify the work?

Examples:
• dev server started
• page loaded
• interaction performed
• tests executed
• offline scenario simulated

If verification was not performed, state why.

---

## 5. Observed Behavior

What actually happened when the system was run?

Describe observed behavior, not expected behavior.

---

## 6. Evidence Produced

List the evidence that proves the observed behavior occurred.

Examples:
• Screenshot: link or reference
• Screen recording: link or reference
• Rendered output: file name
• Logs or test output: location

Each item must be labeled with what it demonstrates.

---

## 7. Visual Proof (If Applicable)

If the work affects UI or interaction:
• What visual proof was captured?
• What does it show?
• Is there before/after evidence?

If visual proof could not be produced, explain why.

---

## 8. Self-Audit Summary

Briefly summarize the self-audit:
• Constraints applied
• Decision rules followed
• Tradeoffs made
• Risks or unknowns remaining

One sentence per item is sufficient.

---

## 9. Confidence & Gaps

How confident am I that this works as intended?

What would increase confidence further?

---

## 10. Exceptions or Notes

Note any:
• deviations from defaults
• known limitations
• follow-up work required

---

## ✅ Completion Declaration

I consider this task:
• ☐ Complete
• ☐ Partially Complete
• ☐ Not Complete

Reason (if not complete):

If marked complete, all required evidence and self-audit items are present.

---

## 🤖 Agent Expectations

Agents are expected to:
• produce this report before claiming completion
• refuse to mark tasks complete without evidence
• clearly mark partial or incomplete work

Completion is a claim that must be justified.

---

## 💡 Closing Note

This template exists to:
• replace repeated QA questions
• surface problems early
• make review fast and objective

If the report is unclear, the work is unclear.

---
