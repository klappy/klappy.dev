---
uri: klappy://canon/template
title: "Canon Article Template"
audience: canon
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["canon", "template"]
relevance: routing
execution_posture: routing
---

# Canon Article Template

> Template for program-level constraints shared across all products.

## Description

This template defines the standard structure for Canon articles. Canon contains program-level constraints—rules that all products in this program must follow. Canon is more stable than Docs but less universal than ODD. Use this template when adding new constraints, policies, or shared rules.

## Outline

- When to Add to Canon
- Frontmatter Fields
- Document Structure
- Example

---

## When to Add to Canon

Add to Canon when:

- The rule applies to ALL products in this program
- The rule is derived from ODD principles
- The rule would still apply if we added new products

Do NOT add to Canon when:

- It's implementation-specific → `/docs/`
- It's universal philosophy → `/odd/`
- It's project-specific → project docs

**Litmus test:** Should all products obey this? → Canon ✓

---

## Frontmatter Fields

```yaml
---
uri: klappy://canon/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: first_person | neutral
stability: stable
tags: ["canon", "topic"]
---
```

### Canon-Specific Values

| Field | Typical Value | Notes |
|-------|---------------|-------|
| `audience` | `canon` | Always canon |
| `tier` | `1` | Canon is core content |
| `voice` | `first_person` | Website-ready, personal |
| `stability` | `stable` | Canon changes carefully |

---

## Document Structure

```markdown
---
uri: klappy://canon/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["canon", "topic"]
---

# Title

> One-line description of this constraint or rule.

## Description

1-2 paragraph compressed overview. What is this constraint?
Why does it exist? How does it shape behavior?

## Outline

- Section 1
- Section 2
- Section 3

---

## Content

**Canon vX.Y**

[Full content...]

---

## See Also

- [Related Canon](/canon/related.md)
- [ODD Principle](/odd/appendices/related.md)
```

---

## Example

```markdown
---
uri: klappy://canon/example-constraint
title: "Example Constraint"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["canon", "example"]
---

# Example Constraint

> All products must X before Y.

## Description

This constraint ensures consistency across products by requiring X
before Y. It derives from the ODD principle of evidence over assertion
and applies to all lanes.

## Outline

- What I Assume
- Why It Matters
- What It Forces
- When It Doesn't Apply

---

## Content

**Canon v0.1**

### What I Assume

[...]

### Why It Matters

[...]

### What It Forces

[...]

### When It Doesn't Apply

[...]
```

---

## See Also

- [Canon Index](/canon/README.md)
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md)
