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
