---
uri: klappy://docs/oddkit/impl-writing-canon-gate
title: "Implementation: Surface Writing Canon as a Gate for Document Deliverables"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "implementation", "writing-canon", "progressive-disclosure", "gate"]
derives_from: "canon/meta/writing-canon.md"
---

# Implementation: Surface Writing Canon as a Gate for Document Deliverables

> When the deliverable is a document targeting canon, ODD, or docs, OddKit's preflight and validate actions must surface Writing Canon (`canon/meta/writing-canon.md`) as a constraint and check for the structural requirements: blockquote with compressed argument, Summary section, descriptive headers that pass the scan test. This was proven necessary by the Progressive Disclosure Failure incident (February 2026), where an agent wrote and shipped three canon documents that violated every tier of progressive disclosure because no gate existed.

---

## Summary — OddKit Must Enforce Writing Quality, Not Just Artifact Existence

OddKit's preflight surfaces relevant docs and constraints before implementation. OddKit's validate checks completion claims against required artifacts. Neither currently recognizes that documents are deliverables with their own quality requirements. When an agent writes a canon doc, preflight should return Writing Canon as a governing constraint. When an agent claims a document is complete, validate should check for the progressive disclosure tiers (blockquote, summary, descriptive headers). Without this gate, agents will always skip writing validation — proven by the Progressive Disclosure Failure incident where three documents shipped to main without any structural checks.

---

## Required Change 1 — Preflight Must Detect Document Deliverables

When an agent describes an implementation that involves creating or editing `.md` files in `canon/`, `odd/`, or `docs/`, preflight should:
- Include `canon/meta/writing-canon.md` in the returned constraints
- Include the seven-point checklist as part of the definition of done
- Flag that document structure validation is required before completion

---

## Required Change 2 — Validate Must Check Progressive Disclosure Tiers

When an agent claims completion on a document deliverable, validate should check:
- **Tier 2:** Does a `>` blockquote exist immediately after the `#` title? Does it contain a substantive compressed argument (not a topic sentence)?
- **Tier 4:** Does a `## Summary —` section exist? Is it self-contained?
- **Tier 5:** Do headers pass the scan test — reading them in sequence tells the document's story?

If any of these fail, validate should return `NEEDS_ARTIFACTS` with specific guidance on what's missing.

---

## Acceptance Criteria — How to Know This Is Done

- [ ] `oddkit preflight` for a task involving document creation returns Writing Canon as a constraint
- [ ] `oddkit validate` for a document completion claim checks for blockquote, summary, and header quality
- [ ] A document missing a blockquote fails validation with a clear message
- [ ] A document missing a Summary section fails validation with a clear message
- [ ] The gate cannot be bypassed without explicit override

---

## After Implementation — Validation and Cleanup

1. Test with a document that passes all tiers — confirm it validates
2. Test with a document missing blockquote — confirm it fails with guidance
3. Test with a document with generic headers — confirm it flags the issue
4. Update OddKit documentation to reflect the new document validation capability
