---
uri: klappy://canon/constraints/oddkit-action-registration-completeness
title: "Adding an oddkit Action: Update Both Switch and VALID_ACTIONS"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["constraint", "oddkit", "actions", "vodka", "registration", "epoch-8"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "canon/principles/vodka-architecture.md"
governs: "Process for adding a new MCP action surface to klappy/oddkit"
---

# Adding an oddkit Action: Update Both Switch and VALID_ACTIONS

> A new MCP action in oddkit must be registered in two places, not one. Wiring only the dispatch switch ships an action that the validator rejects before the dispatch is reached. Smoke tests pass locally (where validation may be stubbed), production calls fail.

## Summary

`workers/src/orchestrate.ts` carries two collaborating but separate registration sites:

1. **The dispatch switch in `handleUnifiedAction`.** Maps `action: "<name>"` to the implementation function (`runX`).
2. **The `VALID_ACTIONS` array.** Used by the input validator to reject unknown actions before dispatch is even attempted.

Both must include the new action's name. Updating only the switch is the most common authoring mistake — the action is reachable in the code, but the validator returns `Unknown action` to every caller because the name isn't in the allowlist.

## Detection

Surface symptom: callers see `Unknown action: <name>. Valid actions: [list without yours]` and the smoke test that exercises the new tool fails on first invocation.

Mechanical detection: the audit landing in PR-2.3 does not catch this — it's an internal-consistency check inside the worker, not a canon-content check. Until a typecheck-time invariant exists (e.g., a single source-of-truth table that produces both the dispatch handler and the `VALID_ACTIONS` array), this is a process-level constraint enforced by reviewer attention and the PR template.

## Origin

Surfaced in klappy/oddkit#140 (PR-2.1 of the link-rot-elimination campaign). Initial implementation registered `oddkit_resolve` in the dispatch switch but not in `VALID_ACTIONS`. Cursor Bugbot caught it as one of three bugs on the initial commit. Without the catch, the resolver would have shipped to prod with `Unknown action: resolve` as the response to every call, and the smoke tests in the same PR would have failed on first invocation.

## What This Demands

When opening any PR that adds a new oddkit action, the PR description must state: "This action is registered in (a) the dispatch switch and (b) the `VALID_ACTIONS` array." Reviewers verify both. The PR template (when one exists) should include this as a checklist item.

## Future Work

A typecheck-time invariant would eliminate the need for this constraint as a process control. Possible shape: replace the dispatch switch with a `Record<ActionName, Handler>` plus `const VALID_ACTIONS = Object.keys(handlers)`. Defer per Use Only What Hurts — if this bug recurs, the typecheck-time invariant graduates from defer to active.

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the discipline this constraint protects (the action surface is the vodka-thin contract; missing entries break the contract silently)
- [Release Validation Gate](klappy://canon/constraints/release-validation-gate) — the process control that caught this (Cursor Bugbot)
