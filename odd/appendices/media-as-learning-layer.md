---
uri: klappy://odd/media-as-learning-layer
title: "Media as a Learning Layer"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "media", "learning", "progressive-disclosure", "website"]
relevance: supporting
execution_posture: operational
---

# Media as a Learning Layer

> Media reduces cognitive load over stable written content.

## Description

Media exists to reduce cognitive load, not increase it. It is a learning layer over stable written content—optional, contextual, and regenerable. Canonical truth lives in text; media supports understanding but does not define it. Core rules: clarity is the default (not any specific medium), media is not canon, progressive disclosure is mandatory (opt-in only, no autoplay), media must match learning intent (diagrams for mental models, short video for orientation, audio for reflection), and media is created only for stable content. The system rejects media-first pages, content dumps, and redundant explanations.

## Outline

- Summary
- Core Rules
  - Clarity is the default
  - Media is not Canon
  - Progressive disclosure is mandatory
  - Match media to learning intent
  - Stability before production
- Anti-Patterns (Explicitly Rejected)
- Compliance Note

---

## Content

Media is a **learning layer** over stable written content.
It is optional, contextual, and regenerable.

**Canonical truth lives in text.**
Media supports understanding — it does not define it.

---

## Core Rules

### 1) Clarity is the default
Text is not the default.
Video is not the default.
Audio is not the default.

**Clarity is the default.**

Media is used only when it teaches faster or better than text alone.

---

### 2) Media is not Canon
Canonical truth is preserved in:
- markdown content
- frontmatter
- decision records
- evidence policies

Media assets are:
- supporting artifacts
- replaceable / regenerable
- optional

**The ownership and placement of media is canonical.**
The media itself is not.

---

### 3) Progressive disclosure is mandatory
All media must be **opt-in**.

Allowed interactions:
- Watch
- Listen
- View diagram
- Download

Disallowed patterns:
- autoplay (anywhere)
- background video
- forced consumption
- media that blocks navigation or comprehension

The default experience must remain:
- readable
- navigable
- understandable
- usable without media

---

### 4) Match media to learning intent
Media must be chosen based on the learning outcome:

- **Images / diagrams**
  - Establish mental models
  - Replace multi-paragraph explanations
- **Short video (≤ 90 seconds)**
  - Orientation and framing
  - Not exhaustive detail
- **Audio**
  - Reflection and deeper thinking
  - Always optional
- **PDF**
  - Reference, synthesis, offline use
  - Never required for basic understanding

Each asset must answer:
> What does this teach faster or better than text?

If it cannot answer, it does not belong.

---

### 5) Stability before production
Media is created only for **stable content**.

Draft or evolving ideas remain text-first until:
- the concept stabilizes
- the page stops churn
- the narrative is unlikely to drift

This prevents:
- outdated explainers
- conflicting narratives
- re-record churn

Media follows clarity — not the other way around.

---

## Anti-Patterns (Explicitly Rejected)

The system intentionally avoids:
- media-first pages
- content dumps / galleries
- redundant explanations across formats
- "just in case" assets
- polish media used to compensate for unclear thinking

If removing a piece of media would break understanding, that is a design failure.

---

## Compliance Note

PRDs may reference this appendix.
They should not re-litigate the philosophy.

PRDs define **how** a project applies this principle.
This appendix defines the governing constraint.
