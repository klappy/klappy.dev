---
uri: klappy://canon/meta/writing-canon
title: "Writing Canon — Progressive Disclosure and Topographic Navigation"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "meta", "writing", "progressive-disclosure"]
epoch: E0005
date: 2026-02-09
complements: "canon/meta/TEMPLATE.md, docs/TEMPLATE.md, canon/meta/agent-executable-outline.md, canon/constraints/definition-of-done.md, canon/methods/self-audit.md, docs/oddkit/IMPL-writing-canon-gate.md"
derives_from: "canon/values/axioms.md (Axiom 2 — A Claim Is a Debt)"
governs: "All documents in canon/, odd/, and docs/ directories"
---

# Writing Canon — Progressive Disclosure and Topographic Navigation

> Every canon document must be actionable at every extraction depth: title alone, title + blockquote, title + blockquote + metadata, summary section, and full document. Headers are a navigational map — scanning filenames and headings is the topography. If a partial extraction cannot guide a correct decision, the document has failed before it was read. Every document competes with the axioms and creed for context space; bulk without progressive disclosure threatens the foundation.

---

## Summary — Documents Are Read in Fragments, So Write Them That Way

Agents and tooling rarely consume a full document. The librarian returns a title and a blockquote snippet. Context packs project at varying detail levels. Humans scan headings before committing to read. Every document must therefore be structured so that progressively larger excerpts are each independently actionable — not merely informative, but sufficient to guide a decision.

This is not a formatting preference. It is a structural requirement derived from how documents actually get consumed. A document that only works when read in full is a document that fails in practice. More critically, the axioms and creed are the most important content in any context window — every other document competes with them for space. Canon growth that lacks progressive discipline doesn't just waste tokens; it buries the values that make the system trustworthy.

---

## The Five Extraction Tiers

Every canon document must pass the smell test at each of these tiers: given only this much, could an agent act correctly?

### Tier 1: Title — Names the Concept and Its Stance

The title is the most extracted element in the system. It appears in file listings, librarian results, table of contents, and navigation indexes. It must do two things: name what the document is about, and signal what position it takes.

**Good:** "Epoch 5 — Values-First Epistemics"
**Good:** "Foundational Axioms"
**Bad:** "New Changes"
**Bad:** "Notes on Recent Discussion"

A title that requires opening the document to understand what it's about has already failed.

### Tier 2: Title + Blockquote — A Complete Compressed Argument

The blockquote (the `>` line immediately after the title) is the most important line in the document after the title. In many extraction paths, it is the *only* content returned alongside the title.

The blockquote must contain the document's complete argument in compressed form — not a teaser, not a topic sentence, but the full claim. Someone reading only the title and blockquote should be able to:

- Understand what the document asserts
- Decide whether to read further
- Act on the core claim without further context

**Good:** "> Four values from which all ODD epistemic discipline is derived: (1) Reality Is Sovereign — observe before asserting, (2) A Claim Is a Debt — every assertion requires evidence, (3) Integrity Is Non-Negotiable Efficiency — shortcuts on truth always cost more, (4) You Cannot Verify What You Did Not Observe — if you didn't look, you don't know."

**Bad:** "> This document describes the foundational values of ODD."

The first blockquote lets an agent apply the axioms immediately. The second tells the agent nothing except that the document exists.

### Tier 3: Title + Blockquote + Metadata — Orientation and Relationships

Metadata fields provide structural orientation: when was this written, what epoch does it belong to, what does it derive from, what does it govern, what constraints apply. An agent reading this tier should understand the document's place in the canon without reading the body.

Key metadata fields for orientation:

- **Epoch** — when this entered the system
- **Derives from** — what this document is grounded in (use full file paths, not floating references like "Axiom 2")
- **Governs** — what this document constrains
- **Complements** — related documents that work alongside this one
- **Status** — whether this is active, experimental, or superseded
- **Constraints** — any hard limits on this document's authority

### Tier 4: Summary Section — Self-Contained Full Picture

The Summary section is the complete argument in prose — everything an agent needs to act on the document without reading the detail sections below. It should be independently actionable: if you read only the title, blockquote, metadata, and summary, you have the full picture. Everything after the summary is elaboration, rationale, and worked detail.

The Summary section heading should use the pattern: `## Summary — [descriptive subtitle]`

The "Summary" prefix is a stable extraction key that tooling can target. The subtitle makes the topography readable when scanning headers.

### Tier 5: Full Document — Elaboration, Rationale, and Worked Detail

The body sections provide depth: historical context, worked examples, derivation logic, edge cases, constraints. These sections exist for readers who need to understand *why*, not just *what*. They should never contain claims that aren't already present in compressed form at a higher tier.

---

## Headers Are a Navigational Map

Section headers serve two audiences simultaneously: tooling that extracts by structural markers, and readers who scan before committing to read.

### Structural Markers Stay Stable, Descriptive Subtitles Make the Map Readable

Headers that serve as extraction targets (like "Summary" or "Constraints") should keep their structural prefix for tooling stability, with a descriptive subtitle appended:

**Good:** `## Summary — Axioms Replace Rules as the Foundation of Epistemic Trust`
**Good:** `## Constraints — Illustrative, Mortal, and Subordinate to Axioms`

Headers that are not extraction targets should be purely descriptive:

**Good:** `## Agents Simulated Integrity Without Embodying It`
**Good:** `## From "Am I Following the Rules?" to "Am I Being Faithful?"`
**Bad:** `## Background`
**Bad:** `## Discussion`
**Bad:** `## Details`

### The Header Scan Test

Print only the `#` lines from a document. Read them in sequence. If they tell the document's complete story — its argument, its structure, its conclusion — the headers pass. If they read like a generic form ("Summary, Background, Discussion, Conclusion"), they fail.

The headers of a well-written canon document are a table of contents that doubles as an executive summary.

---

## The Governing Principle — A Claim Is a Debt at Every Layer

Progressive disclosure is not a formatting technique. It is the structural application of Axiom 2 (`canon/values/axioms.md`): every layer of the document makes claims, and every claim must be substantive enough to act on. A title that says nothing is an empty claim. A blockquote that teases without delivering is a debt unpaid. A summary that requires the full document to make sense is a deferred obligation that compounds in every context window that doesn't have room for the full text.

Write each tier as if it is the only tier the reader will see — because it usually is.

---

## Every Document Competes with the Axioms for Context Space

The axioms and creed are four statements and five lines. They were born compressed. They are the most important content in any context window they appear in. Every other document in that window is competing with them for space.

A canon document that demands full reading to be useful doesn't just fail on its own terms — it actively harms the system by consuming context that the axioms and creed need to remain present and audible. A poorly structured document in a small context window can displace the values entirely, leaving an agent with procedures but no orientation.

This is the balance that must be maintained as the canon grows: every new document should amplify the axioms, not dilute them. Concreteness is good. Elaboration is good. But bulk without progressive disclosure is a threat to the foundation.

The practical test: if your document were loaded alongside `canon/values/axioms.md` and `canon/values/orientation.md` in a constrained context, would it help the agent apply the axioms more effectively — or would it crowd them out? If the answer is "crowd out," the document needs to be shorter, or its progressive disclosure needs to be sharper, or it doesn't belong in canon.

---

## Checklist — Before Committing a Canon Document

1. **Title test:** Does the title name the concept and its stance? Could someone decide relevance from the title alone?
2. **Blockquote test:** Does the blockquote contain the complete compressed argument? Could an agent act on title + blockquote alone?
3. **Metadata test:** Do the metadata fields orient the document in the canon? Is the epoch, derivation, and governance clear? Are derivation references full file paths, not floating names?
4. **Summary test:** Is the summary self-contained? Could someone skip everything below it and still have the full picture?
5. **Header scan test:** Do the headers tell the document's story when read in sequence? Do structural markers have descriptive subtitles?
6. **No buried claims:** Is every key assertion present in compressed form at a higher tier? Does the body elaborate rather than introduce?
7. **Axiom space test:** If loaded in a small context alongside the axioms and creed, does this document amplify the values or crowd them out?

---

## Enforcement — This Checklist Is Not Optional

This checklist is not advice. It is a structural requirement integrated into the Definition of Done (`canon/constraints/definition-of-done.md`) and the Self-Audit Checklist (`canon/methods/self-audit.md`).

If the deliverable is a document targeting `canon/`, `odd/`, or `docs/`, the progressive disclosure tiers are Definition of Done requirements. A document that exists but fails these tiers is not complete.

OddKit's preflight and validate actions surface this checklist automatically when the deliverable is a document. Preflight includes the seven-point checklist in the definition of done. Validate checks for blockquote, summary section, and header quality, returning `NEEDS_ARTIFACTS` with specific guidance when checks fail. The gate fires without being asked. See `docs/oddkit/tools/oddkit_preflight.md` and `docs/oddkit/tools/oddkit_validate.md` for behavioral specification, and `docs/oddkit/IMPL-writing-canon-gate.md` for the implementation record.

This enforcement was proven necessary by the Progressive Disclosure Failure incident (February 2026), where an AI agent wrote and shipped three canon documents that violated every tier of this checklist. The documents were merged to main without validation. The agent had full access to this document but never checked its output against it. Access is not enforcement.

See `docs/incidents/progressive-disclosure-failure-2026-02.md` for the full incident record.
