---
uri: klappy://docs/book/chapter-map
title: "Book Chapter Map — Nothing New, Even AI: Tracking Essays Promoted To Chapters and the Mini-Arcs They Form"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "book", "nothing-new-even-ai", "chapter-map", "manuscript-assembly", "mental-models"]
epoch: E0008
date: 2026-04-21
complements: "docs/book/how-to-read-this-book.md, docs/book/governance.md"
governs: "Manuscript assembly decisions for Nothing New, Even AI"
---

# Book Chapter Map — Nothing New, Even AI

> Essays carry a `book_chapter` frontmatter flag and a `book_part` placement when they are intended for the manuscript. This document tracks which essays are promoted, which mini-arcs they form, and the conversion notes that make manuscript assembly cheap when the time comes. Updated as new essays are written or promoted; not authoritative for chapter ordering until assembly happens.

---

## Summary — A Working Map, Not a Final Outline

The book has 21 chapters established at the outline level. Several essays have already been written and published as standalone pieces; some of those are intended as book chapters. Rather than convert them now (premature work that risks being undone), each chapter-bound essay carries a `book_chapter` frontmatter flag, a `book_part` placement hint, a `book_position` ordering hint, and a `book_chapter_note` describing what conversion work is needed when assembly happens.

This document is the index of those flags. It exists so that:

1. When manuscript assembly begins, the assembler does not have to grep the writings directory wondering which essays are intended as chapters.
2. The intended ordering and groupings are captured at the time the essay is written, while the author's intent is fresh.
3. New essays declared as chapter candidates are easy to discover and slot.
4. Mini-arcs (groups of essays that form a narrative within a part) are visible.

This document is not authoritative for final chapter order. Final order happens at assembly. This is a working map.

---

## The Mental-Models Mini-Arc (Practice Part)

The clearest mini-arc identified so far is a four-chapter sequence in the Practice part. It tells the story of how operators learn to work with AI as the relationship matures.

### Chapter (proposed): *Copy. Paste.* — The Friction That Defined an Era

- **Source:** `writings/copy-paste.md` (March 2026)
- **Role:** Names the friction that defined AI-augmented work in 2025 and the first quarter of 2026. Sets up the need for mental models by showing what working without good models actually felt like.
- **Frontmatter status:** Not yet flagged. To promote, add `book_chapter: candidate`, `book_part: practice`, `book_position: era-opener`.
- **Conversion notes:** Date references to "2026" and "early 2026" can stay; they ground the chapter in time. The closing wish (*I hope this essay ages poorly*) and the fact that it largely came true should be acknowledged in a brief author's note at the end of the chapter when the book is assembled.

### Chapter: *The Intern* — The First Mental Model (Starting)

- **Source:** `writings/the-intern.md`
- **Role:** First practice chapter. Gives readers the starting mental model: AI is a brilliant part-time intern with a second job where they're learning faster than you can teach them.
- **Frontmatter status:** Not yet flagged. To promote, add `book_chapter: true`, `book_part: practice`, `book_position: first-mental-model`.
- **Conversion notes:** Already chapter-shaped. Minimal conversion work expected.

### Chapter: *Shifting Bottlenecks, Climbing Ladders* — The Second Mental Model (Growing)

- **Source:** `writings/shifting-bottlenecks-climbing-ladders.md`
- **Role:** Second practice chapter. Gives readers the growing mental model: as the relationship matures, you climb a management ladder. Hersey-Blanchard situational leadership applied to a workforce that includes agents.
- **Frontmatter status:** Flagged in this PR. `book_chapter: true`, `book_part: practice`, `book_position: after-the-intern`.
- **Conversion notes:** Convert lived 4.7-specific references (*this week*, *six sessions*, the swipe-tap rhythm specifics) to footnotes pointing at the field-report chapters. Keep the Burger King story as the spine. Keep the *Write First, Build Second* section. The Hersey-Blanchard acknowledgment is already in place. The disconfirmer paragraph (about whose workflow the wish came true in) should stay; books need that scope honesty more than essays do.

### Chapter (candidate, possibly sidebar): *Fourteen Hours with Opus 4.7* — The First Field Report

- **Source:** `writings/fourteen-hours-with-opus-4-7.md`
- **Role:** Field report grounding the mental models in lived experience. Reads as a candid first-person account.
- **Frontmatter status:** Not yet flagged. To promote, add `book_chapter: candidate`, `book_part: practice`, `book_position: first-field-report`.
- **Conversion notes:** Decide at assembly whether this is a full chapter or a sidebar inset. Strong candidate for sidebar because of the model-specific detail; strong candidate for chapter because it's where the postscript predicted the next move (which became *Shifting Bottlenecks*).

### Chapter (candidate, possibly sidebar): *The Rhythm Emerged* — The Second Field Report

- **Source:** `writings/the-rhythm-emerged.md`
- **Role:** Companion field report covering Opus 4.7 sessions 2 through 6. Walks through the rules that earned their place in the harness.
- **Frontmatter status:** Flagged in this PR. `book_chapter: candidate`, `book_part: practice`, `book_position: field-report-after-shifting-bottlenecks`.
- **Conversion notes:** Same decision as *Fourteen Hours*: full chapter or sidebar. Both field reports together may be too much; one as chapter and one as sidebar is more likely. The naming-collision constraint between this essay and `writings/seven-weeks-to-southeast-asia.md` (already documented in the backlog stub) should not affect chapter conversion since neither essay headlines on *seven weeks*.

---

## Other Essays That Should Be Considered for Promotion (Survey Pending)

The following essays are not yet flagged but have been mentioned as candidates or have shapes that suggest chapter-suitability. To be reviewed during the next book-planning session:

- `writings/the-journey-from-ai-tasks-to-ai-augmented-workflows.md` — Likely Foundations or Practice. The journey framing is the on-ramp before *The Intern*.
- `writings/every-handoff-drops-context.md` — Practice or Architecture. Handoff failure is a load-bearing topic.
- `writings/decisions-get-lost.md` — Same neighborhood as the handoff essay.
- `writings/the-most-expensive-problem.md` — Likely Foundations.
- `writings/learning-in-the-open.md` — Likely Foundations.
- `writings/seeing-like-an-agent.md` — Likely Architecture.
- `writings/the-harness-and-the-operating-system.md` — Strong Architecture candidate.
- `writings/the-planning-queue.md`, `writings/the-drift-queue.md`, `writings/the-project-journal.md` — Practice or Architecture; possibly a Methods mini-arc.
- `writings/seven-weeks-to-southeast-asia.md` — Practice or Foundations as case study.
- `writings/self-ese-and-the-stacking-test.md` — Methods / Architecture.

This list is not exhaustive. The next book-planning session should walk the writings directory systematically and add `book_chapter` frontmatter to anything intended for promotion.

---

## How To Use This Document

**During essay authoring:** if an essay is intended as a chapter, add the four book frontmatter fields (`book_chapter`, `book_part`, `book_position`, `book_chapter_note`) at the time of authoring. The `book_chapter_note` is the conversion brief; it should describe what changes when the essay becomes a chapter.

**During chapter promotion:** if an existing essay is identified as a chapter candidate later, add the four fields and note here. Update the relevant section of this document.

**During manuscript assembly:** read this document first. Each flagged essay's `book_chapter_note` is the per-chapter conversion brief. Mini-arcs (like the Mental-Models arc above) are the proposed groupings. Final ordering, transitional material, and anything that requires cross-chapter coordination happens at assembly.

---

## Frontmatter Schema

Essays intended as chapters carry these fields in their YAML frontmatter:

- `book_chapter`: `true` (committed) | `candidate` (likely but not final) | absent (not in the book)
- `book_part`: `foundations` | `practice` | `architecture` | `methods` | named part
- `book_position`: short descriptive phrase indicating where in the part this sits, e.g. `after-the-intern`, `first-field-report`, `era-opener`
- `book_chapter_note`: free text. The conversion brief — what changes when the essay becomes a chapter.

These fields are advisory, not enforced by tooling. They exist so manuscript assembly can be a survey-and-execute task rather than a discovery task.

---

## What This Document Is Not

- Not a final chapter list. Final order happens at assembly.
- Not a substitute for `docs/book/how-to-read-this-book.md` or `docs/book/governance.md`. This map sits alongside them.
- Not a binding contract on chapter content. The conversion notes are starting points; the actual chapter shape gets decided at assembly.
- Not exhaustive. New essays and chapter candidates get added over time.

---

## Lineage

This document was authored during PR #133 (the post-4.7-adaptation suite) when Klappy named *Shifting Bottlenecks, Climbing Ladders* as a clear book chapter and the next mental model after *The Intern*. Rather than do the chapter conversion work prematurely, the decision was to capture the intent in frontmatter on the essays themselves and create this map so the conversion work happens cheaply during manuscript assembly.

The pattern this document establishes — flag intent now, convert later — is itself an application of `canon/principles/ritual-is-a-smell.md`: do not perform the conversion ritual on every essay just because some essays might be chapters. Flag, defer, batch.
