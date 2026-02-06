---
uri: klappy://docs/context-packs-and-projection-detail
title: "Context Packs and Projection Detail"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "context-packs", "projection", "detail-levels"]
---

# Context Packs and Projection Detail

> Detail levels control how much content is returned, not which content is relevant.

## Description

This document explains how context packs use projection detail to control output density. Document tiers determine epistemic obligation (what must be absorbed). Query-time detail levels determine how much of that content is returned (full, medium, low). These are orthogonal concepts. A Tier 1 document can be projected at low detail. A Tier 3 document can be projected at full detail. Detail controls density; tiers control obligation.

## Outline

- Document Tiers vs Query-Time Detail
- Detail Levels Explained
- How Detail Affects Output
- Degradation When Structure Is Missing
- Common Misunderstandings

---

## Document Tiers vs Query-Time Detail

Two different axes control what appears in a context pack:

| Axis | Question Answered | Set By |
|------|-------------------|--------|
| **Tier** | "How much must I absorb this?" | Document author |
| **Detail** | "How much should I return?" | Query/consumer |

Tiers are fixed properties of documents. Detail is a runtime choice.

**Example:**

A Tier 1 Canon document (high epistemic obligation) might be projected at:
- `full` — return the complete document
- `medium` — return description + outline
- `low` — return title + one-line summary

The tier doesn't change. The projection does.

### Tier 0 Content

Tier 0 is a scope exclusion marker, not an epistemic tier.

Tier 0 content is:

- Never included in default context-packs
- Excluded from agent reasoning contexts
- Not subject to projection detail levels

Projection detail (full, medium, low) applies only to Tier 1–3 content. Tier 0 content is simply absent from the epistemic system.

---

## Detail Levels Explained

Three detail levels are supported:

### `full`

Returns the complete document content.

**Use when:**
- Deep understanding is required
- The document is directly relevant to the task
- Token budget allows

### `medium`

Returns structural content: frontmatter, description, outline, section headers.

**Use when:**
- Orientation is needed but not full content
- Multiple documents must fit in context
- The document is relevant but not primary

### `low`

Returns minimal content: title, one-line summary (blockquote), and possibly description.

**Use when:**
- Existence matters more than content
- Many documents must be referenced
- Token budget is constrained

---

## How Detail Affects Output

Given a well-structured document:

```markdown
---
uri: klappy://example
title: "Example Document"
---

# Example Document

> One-line summary of what this is.

## Description

Two paragraphs explaining the document's purpose and scope.

## Outline

- Section 1
- Section 2
- Section 3

---

## Section 1

[Full content...]

## Section 2

[Full content...]
```

**Projection at different detail levels:**

| Level | Returns |
|-------|---------|
| `full` | Everything |
| `medium` | Frontmatter + title + summary + description + outline |
| `low` | Frontmatter + title + summary |

---

## Degradation When Structure Is Missing

Detail projection depends on document structure. When structure is missing, projection degrades:

| Missing Element | Consequence |
|-----------------|-------------|
| No blockquote summary | `low` falls back to title only |
| No Description section | `medium` falls back to outline or full |
| No Outline section | `medium` returns description + headers |
| No structure at all | All levels return full content |

**Implication:** Documents that follow the template project cleanly. Documents without structure force full inclusion regardless of requested detail.

This is intentional. The cost of bad structure is paid at query time, not authoring time.

---

## Common Misunderstandings

### "Higher detail means more important"

No. Detail controls density, not importance. A `low` detail projection of a critical Tier 1 document is still critical—just compressed.

### "Tier controls how much is returned"

No. Tier controls epistemic obligation. A Tier 3 document at `full` detail returns everything. A Tier 1 document at `low` detail returns minimal content.

### "Detail is set per-document"

No. Detail is set per-query. The same document can be projected at different detail levels for different purposes.

### "Missing structure is fine"

Technically yes. Practically, missing structure means the document cannot be compressed. It will consume full tokens regardless of requested detail.

---

## See Also

- [Epistemic Obligation and Document Tiers](/canon/definitions/epistemic-obligation-and-document-tiers.md) — What tiers mean
- [Article Template](/docs/TEMPLATE.md) — Standard structure for projectable documents
