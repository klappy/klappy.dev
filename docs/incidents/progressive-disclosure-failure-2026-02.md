---
uri: klappy://docs/incidents/progressive-disclosure-failure-2026-02
title: "Incident: Canon Documents Shipped Without Progressive Disclosure (February 2026)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["incident", "progressive-disclosure", "writing-canon", "definition-of-done", "dogfooding", "axiom-violation"]
derives_from: "canon/meta/writing-canon.md"
epoch: E0005
date: 2026-02-12
---

# Incident: Canon Documents Shipped Without Progressive Disclosure (February 2026)

> An AI agent wrote three canon documents (Anti-Cache Lying constraint, OddKit incident record, implementation instruction) that violated every tier of the Writing Canon progressive disclosure requirements — no blockquotes, no Summary sections, generic headers that fail the scan test. The documents were merged to main without validation. The author caught the failure only by manually checking odd.klappy.dev. The root cause: the Definition of Done does not include document structure as a completable deliverable, the Self-Audit does not check for progressive disclosure, and no gate exists in OddKit to enforce Writing Canon on document outputs. The system that was supposed to prevent bad work from shipping had no checkpoint for writing quality.

---

## Summary — Documents Are Deliverables, and the Definition of Done Didn't Know That

Three canon documents were written by an AI agent during the Anti-Cache Lying work. All three failed every tier of the Writing Canon checklist: no blockquote with compressed argument (Tier 2), no Summary section (Tier 4), generic headers that fail the scan test (Tier 5). The agent had full access to the Writing Canon document — it had used OddKit to search and retrieve canon docs throughout the session — but never validated its writing output against the checklist. The documents were merged to main. The failure was caught only by the author manually checking the rendered site. This exposed a structural gap: the Definition of Done covers code, UI, and behavior verification, but does not include document structure as a DoD requirement. The Self-Audit Checklist does not mention progressive disclosure. OddKit's preflight and validate actions do not surface Writing Canon when the deliverable is a document. Without a gate, agents will always skip this — just as they will always serve stale caches without a signal that something is wrong.

---

## What Happened — Three Documents Passed Every Check Except the One That Mattered

During the Anti-Cache Lying work session, an AI agent:
1. Read and referenced multiple canon documents using OddKit (axioms, orientation, decision rules, anti-metric laundering)
2. Modeled its document structure after Anti-Metric Laundering — which itself does not follow progressive disclosure
3. Wrote three documents that matched the pattern of the model it copied
4. Never checked the Writing Canon document (`canon/meta/writing-canon.md`) or ran the seven-point checklist
5. Presented the documents as complete
6. The documents were merged to main

The author later checked odd.klappy.dev and noticed the documents lacked blockquotes, summaries, and descriptive headers. The agent was confronted and acknowledged the failure.

---

## Why the Agent Skipped Validation — No Gate, No Signal, No Cost

The agent did not maliciously skip the checklist. It simply never encountered it as a requirement. The Writing Canon exists as a `canon/meta/` document — advice about how to write — but it is not wired into any enforcement mechanism:

- The **Definition of Done** requires: change description, verification performed, observed behavior, evidence produced, self-audit completed. None of these mention document structure or progressive disclosure.
- The **Self-Audit Checklist** covers: intended outcome, constraints applied, decision rules followed, verification performed, evidence produced, UX check, tradeoffs, maintainability, confidence. None of these mention document structure.
- **OddKit's preflight** surfaces relevant docs and constraints — but does not know that Writing Canon is a constraint when the deliverable is a document.
- **OddKit's validate** checks for artifacts and evidence — but a markdown file that fails every tier of progressive disclosure passes validation because it *exists*.

The system had no gate. The agent had no cost for skipping. The failure was invisible until a human looked at the output.

---

## Axiom Violations — The Same Pattern as the Cache Incident

**Axiom 2: A Claim Is a Debt**
The agent claimed the documents were complete. It owed evidence that they met the canon's writing standards. It never checked. The claim was unpaid.

**Axiom 4: You Cannot Verify What You Did Not Observe**
The agent did not observe its output against the Writing Canon checklist. It cannot have verified what it did not look at.

**Axiom 3: Integrity Is Non-Negotiable Efficiency**
Writing the documents once without validation was "faster" than writing them, checking the checklist, and revising. The cost was a second round of work, a second set of instructions for Claude Code, and trust erosion.

---

## Root Cause — Documents Are Not Treated as Deliverables in the Definition of Done

The Definition of Done was written for code, UI, and behavioral verification. It does not recognize that documents are deliverables that require their own form of verification. Progressive disclosure is not a formatting preference — it is a structural requirement for how documents get consumed by agents and tooling (`canon/meta/writing-canon.md`). Without explicit inclusion in the DoD, it will always be treated as optional.

---

## Resolution — Four Changes Required

1. **Amend Definition of Done** (`canon/constraints/definition-of-done.md`) — add document deliverables as a category with progressive disclosure as a DoD requirement
2. **Amend Self-Audit Checklist** (`canon/methods/self-audit.md`) — add a document structure check referencing Writing Canon
3. **Fix the three broken documents** — rewrite anti-cache-lying, incident record, and implementation instruction with proper progressive disclosure
4. **Create OddKit implementation instruction** (`docs/oddkit/IMPL-writing-canon-gate.md`) — when the deliverable is a document, preflight/validate should surface Writing Canon as a constraint

---

## Lessons — What This Incident Teaches About Agent Writing Quality

1. A checklist that exists but isn't wired into a gate will be skipped. By agents and humans alike.
2. Modeling structure after an existing document propagates that document's failures. The agent copied Anti-Metric Laundering's structure, which also lacks progressive disclosure.
3. The same pattern keeps repeating: the system doesn't stop bad work from shipping, so bad work ships, and a human catches it after the fact. Caches, documents, whatever — the fix is always the same: make the gate structural, not behavioral.
4. "The agent had access to the checklist" is the document equivalent of "the cache had a flush button." Access is not enforcement.

---

## Canonical Tie-In

This incident exists because:

> *"The agent had access to the checklist."*
