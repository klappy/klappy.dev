---
uri: klappy://odd/template
title: "ODD Article Template"
audience: canon
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["odd", "template"]
relevance: routing
execution_posture: routing
---

# ODD Article Template

> Template for universal principles that transcend any single implementation.

## Description

This template defines the standard structure for ODD articles. ODD contains universal principles—truths that would still be valid in 10 years, for any team, in any context. ODD is the most stable layer. Use this template when adding new principles or philosophy documents.

## Outline

- When to Add to ODD
- Frontmatter Fields
- Document Structure
- Example

---

## When to Add to ODD

Add to ODD when:

- The principle would still be true in 10 years
- The principle applies regardless of implementation
- The principle would survive if klappy.dev disappeared

Do NOT add to ODD when:

- It's program-specific → `/canon/`
- It's implementation-specific → `/docs/`
- It's project-specific → project docs

**Litmus test:** Would this still be true if klappy.dev didn't exist? → ODD ✓

---

## Frontmatter Fields

```yaml
---
uri: klappy://odd/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "philosophy", "topic"]
---
```

### ODD-Specific Values

| Field | Typical Value | Notes |
|-------|---------------|-------|
| `audience` | `canon` | ODD is canon-level content |
| `tier` | `1` | Core philosophical content |
| `voice` | `neutral` | Universal, not personal |
| `stability` | `stable` | ODD almost never changes |

---

## Document Structure

```markdown
---
uri: klappy://odd/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "philosophy"]
---

# Title

> One-line universal principle.

## Description

1-2 paragraph compressed overview. What is this principle?
Why is it universal? How does it shape thinking?

## Outline

- Section 1
- Section 2
- Section 3

---

## Content

[Full philosophical content...]

---

## See Also

- [Related ODD](/odd/appendices/related.md)
- [ODD Manifesto](/odd/manifesto.md)
```

---

## Example

```markdown
---
uri: klappy://odd/example-principle
title: "Example Principle"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "philosophy", "example"]
---

# Example Principle

> Durable thinking is scarce; generated artifacts are abundant.

## Description

This principle recognizes that human cognitive bandwidth is limited
while machine output is cheap. Systems should optimize for preserving
valuable thinking, not for preserving generated artifacts.

## Outline

- The Scarcity
- The Abundance
- The Implication

---

## Content

### The Scarcity

[Why durable thinking is rare...]

### The Abundance

[Why generated artifacts are cheap...]

### The Implication

[What this means for system design...]
```

---

## See Also

- [ODD Index](/odd/README.md)
- [ODD Manifesto](/odd/manifesto.md)
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md)
