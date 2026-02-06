---
uri: klappy://docs/decisions/template
title: "Decision Template"
audience: docs
exposure: hidden
tier: 3
voice: neutral
stability: stable
tags: ["template", "decision", "adr"]
---

# Decision Template

> ADR-lite template for recording architectural and process decisions.

## Description

This template defines the standard structure for decision records. Decisions document the "why" behind choices that affect the repository, products, or processes. Use this for both `/docs/decisions/` (implementation choices) and `/odd/decisions/` (universal principle choices).

## Outline

- When to Create a Decision
- Numbering Convention
- Template Structure
- Frontmatter by Location

---

## When to Create a Decision

Create a decision record when:

- A choice affects multiple files or systems
- The reasoning would be lost without documentation
- Someone might ask "why did we do it this way?"
- A constraint or rule is being established

Do NOT create a decision record for:

- Trivial implementation choices
- One-off fixes
- Temporary workarounds

---

## Numbering Convention

| Location | Format | Example |
|----------|--------|---------|
| `/docs/decisions/` | `D00XX-slug.md` | `D0015-cache-invalidation.md` |
| `/odd/decisions/` | `D00XX-slug.md` | `D0002-memory-portability.md` |

Numbers are sequential within each folder. Check the folder's README for the next available number.

---

## Frontmatter by Location

### For `/docs/decisions/` (implementation choices)

```yaml
---
uri: klappy://docs/decisions/D00XX
title: "D00XX: Decision Title"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["docs", "decisions", "topic"]
---
```

### For `/odd/decisions/` (universal principle choices)

```yaml
---
uri: klappy://odd/decisions/D00XX
title: "D00XX: Decision Title"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "decisions", "philosophy", "topic"]
---
```

---

## Template Structure

```markdown
---
uri: klappy://<tier>/decisions/D00XX
title: "D00XX: Decision Title"
audience: docs | canon
exposure: internal | nav
tier: 1 | 2
voice: neutral
stability: stable
tags: ["decisions", "topic"]
---

# D00XX — Decision Title

> One-line summary of what this decision establishes.

## Description

2-3 sentence compressed overview. What was decided? Why does it matter?
This should be self-contained for LLM context.

## Outline

- Decision
- Status
- Context
- Consequences
- Implementation
- Evidence
- Pattern Recognition (Optional)

---

## Decision

[Clear statement of what was decided. Use active voice.]

## Status

**Active** | **Superseded by D00YY** | **Deprecated**

## Context

[Why did this decision need to be made? What problem prompted it?]

## Consequences

- ✅ Positive consequence
- ✅ Another positive
- ⚠️ Tradeoff or cost
- ⚠️ Another tradeoff

## Implementation

[Where is this decision implemented? Files, scripts, configs.]

- Script: `/path/to/script.js`
- Config: `/path/to/config.md`

## Evidence

[What triggered this decision? Commits, incidents, observations.]

- Commit: `abc1234` — "commit message"
- Problem observed: [description]

## Pattern Recognition (Optional)

[Is this decision part of a broader pattern? Could it be elevated?]

- **Anti-pattern identified:** [What failure mode does this prevent?]
- **Elevation candidate:** [Could this become a Canon constraint or ODD principle?]
- **Recurrence check:** [Has this pattern appeared elsewhere?]

If the pattern recurs across multiple decisions or lanes, consider elevating to:
- `/canon/constraints/` — Program-level constraint
- `/odd/appendices/` — Universal principle
```

---

## Status Values

| Status | Meaning |
|--------|---------|
| **Active** | Currently in effect |
| **Superseded** | Replaced by another decision |
| **Deprecated** | No longer recommended |
| **Proposed** | Under consideration |

---

## See Also

- [Decisions Index](./README.md) — Implementation decisions index
- [ODD Decisions](/odd/decisions/README.md) — ODD decisions index
