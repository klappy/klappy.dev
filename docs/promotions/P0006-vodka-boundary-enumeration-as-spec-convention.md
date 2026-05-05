---
uri: klappy://docs/promotions/P0006-vodka-boundary-enumeration-as-spec-convention
title: "P0006: Vodka Boundary Enumeration — Specs Must List What the Server Knows, Doesn't Know, and Is NOT"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "accepted", "vodka-architecture", "spec-convention", "boundary", "non-goals", "amendment"]
promotion_status: accepted
---

# P0006: Vodka Boundary Enumeration — Specs Must List What the Server Knows, Doesn't Know, and Is NOT

> Every MCP server spec written under vodka-architecture MUST include three enumerated sections: "What the server knows," "What the server does NOT know," and "What this server is NOT." Implicit boundaries get violated at PR time; enumerated boundaries get cited in PR review.

## Observed Pattern

`canon/principles/vodka-architecture.md` defines the discipline philosophically. Specs that follow vodka-architecture get the boundary right by author intuition plus reviewer pressure. Specs that don't, sprawl. The discipline is implicit; PR-level enforcement is by-feel.

The pattern observed is that author intuition alone is insufficient at PR-review time. A boundary kept in author memory gets violated when the author rotates out, when a "small addition" PR lands, or when the spec is re-implemented by an agent that does not have the original author's mental model. A boundary written down — as enumerated bullet lists in the spec — survives those transitions because future PR authors must rebut a bulleted non-goal to expand scope, which is asymmetrically harder than arguing for a useful-sounding addition.

- Affects: every MCP server spec written under vodka-architecture
- Outcome without enumeration: implicit boundaries drift across PRs; "small additions" cumulatively violate the original frame; the next vodka rewrite has to undo additions one by one
- Outcome with enumeration: boundary visible in the spec itself; PR reviewers can cite specific bullets; scope expansion requires explicit rebuttal of an existing non-goal

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| `klappy/PTXprint-MCP` v1.0 (boundary implicit) | 2026-Q1 | Boundary drifted | v1.0 spec had no enumerated boundary; tools accreted across releases until v1.1 had 17 tools modeling the server as a project filesystem |
| `klappy/PTXprint-MCP` v1.2 §1 (boundary enumerated) | 2026-Q2 | Boundary held | v1.2 §1 enumerates 5 things the server knows (payload schema, dispatch, R2 presigning, DO state, content-addressed cache lookup), 4 things it does not (cfg semantics, font logic, config inheritance, override resolution), and a separate "What this server is NOT" section. Subsequent PRs cite §1 in review |
| `klappy/agent-messaging-service` `mcp-wrapper-conformance-for-conversational-ai` constraint | 2026-04+ | Philosophy stated, enumeration partial | "The wrapper does not parse `data`; it forwards opaque bytes" is one bullet. Full boundary enumeration not yet in spec form. Hosted /mcp planning explicitly identified the gap |

**Total observations**: 3 across 2 independent server projects
**Independent occurrences**: 2 distinct repositories
**Affected workflows**: every spec author writing a vodka-architecture-compliant spec

## Current Handling

- **Detection today**: vodka-architecture (existing canon) describes the boundary philosophically with examples; specs follow it by author intuition; PR review surfaces drift case-by-case
- **Closest existing canon**: `canon/principles/vodka-architecture.md` (the philosophy) and `canon/principles/doing-less-enables-more.md` (the empirical claim about why thinness wins). Neither codifies the *spec-section convention* — what specific sections a spec must contain to prove it observes vodka discipline
- **Gap**: vodka-architecture says "the server should be thin." It does not say "specs MUST include these enumerated sections." The convention is missing one altitude down

## Proposed Promotion

### Target Document

`canon/principles/vodka-architecture.md` — append a new section.

### Section

`## Spec Convention — The Boundary Must Be Enumerated` (new section near the end of the existing doc, before any "See Also" / footer sections)

### Proposed Language

```markdown
## Spec Convention — The Boundary Must Be Enumerated

A server claiming to follow vodka-architecture MUST include three enumerated sections in its spec:

### Boundary Section

`## What This Server Knows` — bullet list of every state, schema, or external resource the server understands or holds.

`## What This Server Does NOT Know` — bullet list of the domain semantics this server defers to canon or the consumer environment. **This list IS the vodka boundary, written down.**

### Non-Goals Section

`## What This Server Is NOT` — bullet list of the categories of responsibility this server explicitly refuses. Each item is a statement future PR authors must rebut to expand scope.

### Why Enumeration Matters

A boundary kept in author intuition gets violated when the author rotates out. A boundary written down survives the rotation. PR authors proposing a new tool must argue against an enumerated non-property — asymmetrically harder than arguing for a useful-sounding addition.

### Failure Mode

Implicit boundaries drift. After a few PRs, the server has accumulated "small additions" that each individually felt fine but cumulatively violate the original vodka frame. The next vodka rewrite has to undo those additions one by one. Enumeration prevents the drift at the PR-review surface, where it is cheapest to catch.

### Receipts

- `klappy/PTXprint-MCP` v1.2 §1 — enumerated boundary + non-goals, with explicit attribution that the v1.0 → v1.1 sprawl happened because the v1.0 boundary was implicit.
- *(Each subsequent vodka-compliant spec adds a row pointing at its boundary section.)*
```

### Rationale

The amendment sharpens vodka-architecture from philosophy to convention. It does not change *what* vodka means; it specifies *how* a spec proves it observes vodka. Same enforcement model the canon doc already uses (smell tests, design pressure), now with a concrete spec-shape requirement that reviewers can cite directly.

Placed at the end of vodka-architecture.md (near "See Also" but above it) so the philosophy reads first and the convention lands as a concrete operationalization.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| Low | Clarifies existing rule, no scope change |
| **Medium** | **Adds new requirement, may affect workflows** |
| High | Changes existing behavior, requires migration |

**Risk level**: Medium

**Mitigation**: Existing specs without enumerated boundaries are not retroactively invalid. The convention applies to new specs and v-bump rewrites. Reviewers may cite the convention as "missing — recommended for next rewrite" rather than as a hard merge blocker. Adoption is gradual and per-spec.

## Status

`accepted` (2026-05-05)

## Review Notes

- **Reviewer**: klappy (operator)
- **Decision**: `accepted`
- **Date**: 2026-05-05
- **Notes**: Accepted in the 8-proposal sweep. P0006 sharpens vodka-architecture from philosophy to spec convention by requiring three enumerated sections in any compliant spec ("What This Server Knows", "What This Server Does NOT Know", "What This Server Is NOT"). Section appended before `## See Also` so the convention sits as the operationalization closure of the principle. Last of the small append-style amendments in this sweep — P0003/P0004/P0005 next create whole new canon docs.

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/principles/vodka-architecture.md`
- **Backlink added**: Yes / No
