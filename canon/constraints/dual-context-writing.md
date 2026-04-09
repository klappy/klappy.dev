---
uri: klappy://canon/constraints/dual-context-writing
title: "Constraint: Dual-Context Writing — One Document, Two Surfaces"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags:
  - canon
  - constraints
  - writing
  - dual-context
  - book
  - essay
  - website
epoch: E0007
date: 2026-04-09
derives_from: "docs/book/governance.md, docs/planning/book-vs-website-distribution.md, canon/constraints/guide-posture.md"
complements: "canon/meta/writing-canon.md, docs/book/how-to-read-this-book.md"
governs: "All writings/ documents that also appear in the book chapter plan"
---

# Constraint: Dual-Context Writing — One Document, Two Surfaces

> A document that lives in both a book and on a website must never assume which context the reader found it in. The body stays agnostic. The metadata carries both identities. The reader should never feel like they walked into the wrong room.

-----

## Summary — The Body Doesn't Know Where It Lives

The book governance declares that each chapter works independently as a published essay. This creates a dual-context problem: the same document renders as a book chapter for sequential readers and as a standalone essay for website visitors. If the body assumes either context, it alienates the other audience. A book reader encountering "the previous essay" wonders why it doesn't say "the previous chapter." A website visitor encountering "the previous chapter" wonders what book they're supposed to be reading.

The constraint is simple: the body never declares which context it belongs to. The metadata handles both. The reader never feels like they're in the wrong place.

-----

## The Rules

**Reference by title, not position.** Instead of "the previous essay" or "the next chapter," use the title as a link. *The Cost of Code Dropped to Zero* diagnosed the problem — works whether you encounter it as Chapter 13 or as a Tuesday blog post. The link resolves in both contexts.

**The document never calls itself or its siblings "essay" or "chapter."** It just references them by name. The frontmatter declares the role — `type: essay` for site rendering, `book_part` and `book_chapter` for book placement. The body stays agnostic. Same file, two contexts, zero confusion.

**"See Also" not "Companion essays."** In essay context, footer links are navigation. In book context, the publisher strips them or they become endnotes. "See Also" is context-neutral. "Companion essays" locks the reader into website-land.

**Frontmatter carries both identities.** The site renderer reads `type`, `exposure`, `public`. The book build reads `book_part`, `book_chapter`, `book_title`. Neither system needs to know about the other. The document doesn't care which one is reading it.

**Don't alienate either audience.** This is the governing principle beneath the rules. If a sentence would confuse a book reader, rewrite it. If a sentence would confuse a website visitor, rewrite it. If you can't satisfy both, the sentence is making an assumption about context that the body shouldn't be making.

-----

## When This Applies

This constraint governs any document in `writings/` that also appears in the book chapter plan (`docs/book/governance.md`). Documents that are website-only or book-only are not bound by this constraint — they can assume their context freely.

-----

## The Test

Read every sentence that references another document in the collection. For each one, ask: would this sentence make sense to someone who has no idea this is part of a book? Would it make sense to someone who has no idea this is on a website? If either answer is no, the sentence is context-locked and needs rewriting.

-----

*See also: [Book Governance](klappy://docs/book/governance) — the complete chapter plan. [Book vs. Website](klappy://docs/planning/book-vs-website-distribution) — the two distribution paths and their different purposes.*
