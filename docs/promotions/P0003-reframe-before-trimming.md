---
uri: klappy://docs/promotions/P0003-reframe-before-trimming
title: "P0003: Reframe Before Trimming — When a Tool Surface Feels Bloated, Question the Frame"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "accepted", "mcp-server", "tool-surface", "refactoring", "vodka-architecture", "doing-less"]
promotion_status: accepted
---

# P0003: Reframe Before Trimming — When a Tool Surface Feels Bloated, Question the Frame

> When an MCP server's tool surface feels bloated, the bloat is usually in the frame the surface implies, not in the tool count. Reframe first; the trim follows mechanically.

## Observed Pattern

An MCP server's tool count drifts upward over time as features accrete. At some point the surface "feels wrong" — too many tools, too much overlap, too many edges to defend in PR review. The instinct is to ask "which tools can we cut?" and pick the weakest-justified ones. That move trims symptoms but preserves the conceptual model that produced the bloat.

The pattern observed across server projects is that the right move at this moment is structurally different: **suspect the frame the surface implies, not the count.** When the frame is wrong, the tool count collapses mechanically once the frame is corrected. When the frame is right and the count still feels high, the discomfort is usually about something else — vodka-boundary enforcement, async shape, or consumer-side wiring friction — and trimming will not address it.

- Affects: any MCP server going through scope review or v-bump refactoring
- Outcome without the move: smaller surface that still embodies the wrong model; conceptual debt persists; bloat returns at the next feature wave
- Outcome with the move: surface that fits the actual model; the trim is a side effect, not the goal

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| `klappy/PTXprint-MCP` v1.0 → v1.1 | 2026-Q1 | Trimmed without reframing | 17 → 7 tools by cutting features; surface still modeled the server as a project filesystem |
| `klappy/PTXprint-MCP` v1.1 → v1.2 | 2026-Q2 | Reframed, then trimmed | Reframed PTXprint as a pure function `(config, sources, fonts) → PDF` with content-addressed cache; tool count collapsed to 3 mechanically |
| `klappy/agent-messaging-service` hosted /mcp planning | 2026-05-03 | Pre-emptive reframe applied | Same diagnostic move applied during planning; spec landed on 6 tools per `mcp-wrapper-conformance-for-conversational-ai` rather than drifting to 8+ via "while we're here" additions |

**Total observations**: 3 across 2 independent server projects
**Independent occurrences**: 2 distinct repositories
**Affected workflows**: MCP server v-bump refactoring, hosted protocol-endpoint planning

## Current Handling

- **Detection today**: each server project re-derives the discipline through some combination of `vodka-architecture` review, `kiss-simplicity-is-the-ceiling` pressure, and operator intuition during PR review
- **Guidance**: there is no named diagnostic move that surfaces "the count is a symptom; the frame is the cause" before the trim instinct fires
- **Closest existing canon**: `canon/principles/doing-less-enables-more.md` is the structural empirical claim about why thin substrates win, and its smell test catches additions ("while we're here, the substrate could just…"). It does not address the post-hoc case where the surface has already drifted and the bloat is observable

This promotion fills the operational gap: when an existing surface has already drifted, what is the diagnostic move?

## Proposed Promotion

### Target Document

`canon/methods/reframe-before-trimming.md` (new)

Method, not principle. The principle space is occupied by `doing-less-enables-more` (the structural claim) and `vodka-architecture` (the discipline). This document operationalizes a specific diagnostic move during refactoring.

### Section

Whole document; new file.

### Proposed Language

```markdown
---
uri: klappy://canon/methods/reframe-before-trimming
title: "Reframe Before Trimming — When a Tool Surface Feels Bloated, Question the Frame"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "method", "refactoring", "tool-surface", "mcp-server", "vodka-architecture", "doing-less", "diagnosis"]
derives_from:
  - klappy://canon/principles/doing-less-enables-more
  - klappy://canon/principles/vodka-architecture
  - klappy://canon/principles/kiss-simplicity-is-the-ceiling
complements:
  - klappy://canon/methods/pivot-on-inversion
status: active
---

# Reframe Before Trimming

> When an MCP server's tool surface feels bloated, the bloat is usually in the frame the surface implies, not in the tool count. Reframe first; the trim follows mechanically.

## When This Method Applies

A surface feels bloated. The instinct is to cut tools. This method says: pause that instinct.

Specifically, this method applies when:

- An existing MCP server has accrued tools across multiple versions
- Reviewers describe the surface as "too many tools" or "feels overlapping"
- A refactor is being scoped that will trim the count

## The Method

1. **Do not ask "which tools can we cut?"**
2. **Ask "is the frame this surface implies actually correct?"** Write down what mental model a fresh consumer would build by reading the tool list cold. Compare it against what the server actually does in the world.
3. **If the frame is wrong, fix the frame.** Restate the server's job in one sentence that matches reality. The tool count usually collapses mechanically because tools justified only by the wrong frame stop being justified.
4. **If the frame is right and the tool count still feels high**, the discomfort is probably elsewhere — vodka-boundary leakage (`canon/principles/vodka-architecture.md`), async shape mismatch (`canon/principles/async-by-default-for-long-running-tools.md` if proposed), or consumer-side wiring friction. Diagnose that, not the count.

## Failure Mode — Trimming Without Reframing

Cutting tools without reframing produces a smaller surface that still embodies the wrong model. The tool count drops; the conceptual debt stays. Bloat returns at the next feature wave because the model's gravity pulls toward the same shape.

## Receipts

- **PTXprint-MCP v1.0 → v1.2.** v1.0 had 17 tools modeling the server as a project filesystem. v1.1 trimmed to 7 by cutting features but kept the filesystem frame. v1.2 reframed the server as a pure function `(config, sources, fonts) → PDF` with content-addressed cache. Tool count collapsed to 3 — `submit_typeset`, `get_job_status`, `cancel_job` — without functionality loss. The trim was a side effect of the reframe, not its goal.
- *(Receipt pattern: each future application adds one row — server, before-count, after-count, the reframe in one sentence. Dense, not narrative.)*

## Relationship to Adjacent Canon

This method is the operational complement to `canon/principles/doing-less-enables-more`. That principle is the structural empirical claim about why thin substrates win and catches NOT-ADOPTING-new-opinions through its smell test. This method addresses the post-hoc case: the substrate already drifted; the bloat is observable; what now?

`canon/methods/pivot-on-inversion` is adjacent but different — that method is about recovery when an iteration's gradient turns negative. This method is about diagnosis when a surface's tool count feels wrong. Pivot-on-inversion answers "should we keep going?"; reframe-before-trimming answers "what should we change first?"
```

### Rationale

The principle layer is occupied. `doing-less-enables-more` (2026-05-02) makes the structural claim; `vodka-architecture` defines the discipline; `kiss-simplicity-is-the-ceiling` constrains surface area at construction. None of them address the post-drift diagnostic move. This is a method-shaped gap, not a principle-shaped one — operationalizing a specific decision sequence during refactoring.

Placing this in `canon/methods/` rather than `canon/principles/` is deliberate. It sits next to `pivot-on-inversion` (also a method-shaped recovery procedure) and clearly relates to the principles via derives_from rather than competing with them.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| Low | Clarifies existing rule, no scope change |
| **Medium** | **Adds new method, may affect refactoring workflows** |
| High | Changes existing behavior, requires migration |

**Risk level**: Medium

**Mitigation**: The method is opt-in diagnostic guidance for refactoring, not a hard requirement. It does not block any workflow; it offers a sequencing rule for surface-level refactors. Adoption can be gradual — cited in PR descriptions when relevant, not enforced by gate.

## Status

`accepted` (2026-05-05)

## Review Notes

- **Reviewer**: klappy (operator)
- **Decision**: `accepted`
- **Date**: 2026-05-05
- **Notes**: First of three new-doc proposals (P0003/P0004/P0005). Created `canon/methods/reframe-before-trimming.md` as a tier-2 method doc, following the precedent set by `canon/methods/pivot-on-inversion.md` (the doc named in P0003's `complements` field): H1 + blockquote + descriptive section headers, no separate `## Summary` (the blockquote carries the compressed argument). Frontmatter, body, and section structure used verbatim from P0003's "Proposed Language" block.

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/methods/reframe-before-trimming.md`
- **Backlink added**: Yes / No
