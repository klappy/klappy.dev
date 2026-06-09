---
uri: klappy://odd/appendices/template
kind: odd
title: "ODD Appendix Template"
audience: canon
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["odd", "appendices", "template"]
relevance: routing
execution_posture: routing
target_repo: "outcomes-driven-development"
---

# ODD Appendix Template

> Template for ODD appendices that elaborate on core principles.

## Description

This template defines the standard structure for ODD appendices. Appendices elaborate on ODD principles with deeper analysis, examples, or edge cases. They are still universal (not implementation-specific) but are tier 2 content—revealed after the core principles.

## Outline

- When to Add an ODD Appendix
- Frontmatter Fields
- Document Structure
- Example

---

## When to Add an ODD Appendix

Add an ODD appendix when:

- It elaborates on an existing ODD principle
- It's universal (not klappy.dev-specific)
- It's too detailed for the core principle document

Do NOT add an ODD appendix when:

- It's implementation-specific → `/docs/appendices/`
- It's a new core principle → `/odd/`
- It's a decision record → `/odd/decisions/`

---

## Frontmatter Fields

```yaml
---
uri: klappy://odd/appendices/<name>
title: "Title"
audience: odd
exposure: nav
tier: 1 | 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "topic"]
---
```

### Appendix-Specific Values

| Field | Typical Value | Notes |
|-------|---------------|-------|
| `audience` | `odd` | ODD appendix content |
| `tier` | `1` or `2` | Core elaboration or edge cases |
| `voice` | `neutral` | Universal, not personal |
| `stability` | `stable` | ODD appendices rarely change |

---

## Document Structure

```markdown
---
uri: klappy://odd/appendices/<name>
title: "Title"
audience: odd
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "topic"]
---

# Title

> One-line description of what this appendix elaborates.

## Description

1-2 paragraph compressed overview. What principle does this elaborate?
What additional depth does it provide?

## Outline

- Section 1
- Section 2
- Section 3

---

## Content

[Full content...]

---

## See Also

- [Parent Principle](/odd/related.md)
- [Related Appendix](/odd/appendices/related.md)
```

---

## Example

```markdown
---
uri: klappy://odd/appendices/example-elaboration
title: "Example Elaboration"
audience: odd
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "example"]
---

# Example Elaboration

> How the scarcity principle applies to documentation systems.

## Description

This appendix elaborates on the scarcity principle by examining how
it applies specifically to documentation systems. It provides examples
of decay-by-default and elevation criteria.

## Outline

- The Problem
- The Pattern
- The Application

---

## Content

### The Problem

[Why documentation sprawl happens...]

### The Pattern

[How decay-by-default works...]

### The Application

[Specific examples...]
```

---

## See Also

- [ODD Appendices Index](/odd/appendices/README.md)
- [ODD Index](/odd/README.md)
