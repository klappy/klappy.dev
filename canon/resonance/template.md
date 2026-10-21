---
uri: klappy://canon/resonance/template
title: "Resonance Page Template"
audience: canon
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["resonance", "template"]
relevance: routing
execution_posture: routing
---

# Resonance Page Template

> Template for documenting external works that converge with ODD.

## Description

This template defines the standard structure for resonance pages. Use this when adding a new external work that has mechanical alignment with ODD — and explicit divergence.

---

## Naming Convention

**Files are named after the book, not the principle.**

This provides immediate orientation ("This is about Lean Startup") while preserving ODD-first thinking inside the file.

Examples:
- `lean-startup.md` — not `epistemic-feedback-loops.md`
- `antifragile.md` — not `convexity-under-stress.md`
- `ooda-loop.md` — not `orientation-dominates-action.md`

---

## Canon Rule (Mandatory)

**Every cited work must include at least one explicit divergence.**
**If no divergence exists, the citation does not belong.**

This rule prevents:
- Cargo-cult alignment ("We do X because Taleb says so")
- Silent disagreement (violating the book while keeping the quote)

---

## Frontmatter

```yaml
---
uri: klappy://canon/resonance/<book-slug>
title: "<Book Title>"
audience: canon
tier: 2
voice: neutral
stability: stable
tags: ["resonance", "<book-slug>", "<topic-tags>"]
---
```

---

## Structure

```markdown
---
uri: klappy://canon/resonance/<book-slug>
title: "<Book Title>"
audience: canon
tier: 2
voice: neutral
stability: stable
tags: ["resonance", "<book-slug>", "<topic-tags>"]
---

# <Book Title> (Resonance)

> <Author>, <Year>

## ODD Principle: <Principle Name>

<One or two sentences defining the principle strictly in ODD terms.
No references. No citations.>

---

## Convergent Quotes (Non-Authoritative)

> "<Quote>"
> — <Author>, *<Work>*

> "<Quote>"
> — <Author>, *<Work>*

<Optional third quote. Hard cap at three.>

---

## Where ODD Aligns

- <Specific, concrete alignment>
- <Behavioral or structural similarity>
- <What ODD genuinely shares>

Alignment must be **mechanical**, not philosophical.

---

## Where ODD Diverges (Explicit)

This is not disagreement for its own sake.
This is where ODD makes a **different tradeoff**.

- <Divergence #1>
- <Divergence #2>
- <What ODD refuses to adopt>

If this section feels uncomfortable, that's a signal the citation is weak.

---

## Why the Divergence Matters

<One short paragraph explaining the *consequences* of the difference.
This is where ODD sharpens itself.>

---

## Operationalization in ODD

- <Concrete practice>
- <Structural rule>
- <Artifact behavior>

---

## Related Canon

- [Related ODD file](/odd/<file>)
- [Related Canon file](/canon/<file>)
```

---

## Litmus Test

Before adding a resonance page, ask:

1. **Is there mechanical alignment?** — Not just philosophical vibes, but actual shared behavior.
2. **Is there explicit divergence?** — If you can't name a tradeoff ODD makes differently, don't add it.
3. **Does divergence have consequences?** — The difference should affect how work is done.

If all three are yes, the resonance page belongs.

---

## See Also

- [Resonance Index](/canon/resonance/README.md)
- [Canon Index](/canon/README.md)
