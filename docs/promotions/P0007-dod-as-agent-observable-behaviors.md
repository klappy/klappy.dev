---
uri: klappy://docs/promotions/P0007-dod-as-agent-observable-behaviors
title: "P0007: Spec DoD Must Be 5–7 Agent-Observable Behaviors, Not Implementation Milestones"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "accepted", "definition-of-done", "spec-convention", "agent-observable", "amendment"]
promotion_status: accepted
---

# P0007: Spec DoD Must Be 5–7 Agent-Observable Behaviors, Not Implementation Milestones

> When a software spec ships, its Definition of Done section MUST list 5–7 things the consumer/agent can observably do once the work lands, not implementation milestones. "Tools land," "tests pass," and "code compiles" are necessary but not the DoD; the DoD is what becomes possible for the consumer as a result.

## Observed Pattern

`canon/constraints/definition-of-done.md` defines DoD in terms of evidence and verification. It does not specify the *shape* of the DoD section in a spec document. Spec authors fill it with whatever feels right — sometimes implementation milestones (files to create, tests to pass), sometimes user-facing behaviors (what the consumer can do), sometimes a mix.

The pattern observed across server specs is that DoD-as-implementation-milestones produces specs whose "done" condition is "the build TODO list is checked off" rather than "the consumer can do the new things." Spec readers don't know what they get from the work. Validators can't validate against behaviors. Promotion gates can't verify intent because intent was never expressed in consumer-observable terms.

The fix is a one-line shape constraint: DoD entries are sentences of the form "`<consumer>` can `<action>` and observe `<outcome>`."

- Affects: every spec document with a DoD section
- Outcome without the constraint: DoD reads like a build TODO; "done" detaches from "consumer value"; fresh-validator reviews struggle because the contract was implementation-shaped
- Outcome with the constraint: DoD reads as the consumer contract; "done" means specific things the consumer can verifiably do; validators and reviewers have a concrete checklist

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| `klappy/PTXprint-MCP` v1.2 §9 | 2026-Q2 | DoD as 7 agent-observable behaviors | §9 lists 7 things an agent connected to PTXprint MCP + oddkit MCP must be able to do (read project state, construct valid payload, submit, poll, cancel, get cache hit on resubmit, get clear failure_mode classification). Implementation details (DO classes, wrangler config) are §5 and §10, separate |
| `klappy/PTXprint-MCP` PR #30 fresh-validator review | 2026-04+ | Validator could verify §9 directly | Each DoD entry mapped to a PASS/FAIL with file:line evidence. Validator's job was tractable because the contract was behavior-shaped |
| `klappy/agent-messaging-service` hosted /mcp planning | 2026-05-03 | Convention identified pre-spec | Hosted /mcp DoD will need 5–7 agent-observable behaviors that prove the wrapper does its job, not 5–7 source files that exist. Planning explicitly chose this shape |

**Total observations**: 3 across 2 independent server projects
**Independent occurrences**: 2 distinct repositories, with the second project pre-emptively adopting the convention from observing the first
**Affected workflows**: every spec author writing a DoD section

## Current Handling

- **Detection today**: `canon/constraints/definition-of-done.md` defines what completion *means* (evidence required, verification needed). It does not define what a *spec's* DoD section looks like
- **Closest adjacent canon**: `canon/constraints/definition-of-done.md` (the evidence policy), `canon/methods/self-audit.md` (the 10-area reflection), `canon/principles/specs-lock-at-implementation.md` (specs-as-contracts; this amendment specifies what the contract's DoD section contains)
- **Gap**: nothing names the consumer-observable shape as the required DoD format

## Proposed Promotion

### Target Document

`canon/constraints/definition-of-done.md` — append a new section.

### Section

`## Spec DoD Convention — Agent-Observable Behaviors` (new section appended to the existing doc)

### Proposed Language

```markdown
## Spec DoD Convention — Agent-Observable Behaviors

When a spec for an MCP server, library, or other consumer-facing surface includes a Definition of Done section, that section MUST express completion as 5–7 things the consumer can observably do once the work ships, not as implementation milestones.

### Format

A spec DoD entry is one sentence in the form:

> "`<consumer>` can `<action>` and observe `<outcome>`."

### Allowed

- "A Claude Code instance with `.mcp.json` pointing at this server can call `ams_create_conversation` and receive a magic link in the response."
- "A second instance with a different bearer can `ams_join` that link and `ams_send` a token; the first observes it as `notifications/ams/token` within 1s median."

### Disallowed (these are implementation, not DoD)

- "SessionDO class lands at `worker/src/session.ts`."
- "wrangler.toml updated with v2 migration."
- "All tests pass."

The implementation list belongs in a separate "Tomorrow's Execution Scope" or equivalent section. The DoD is the contract with the consumer; implementation is the contract with the codebase.

### Failure Mode

When a spec's DoD reads like a build TODO list, "done" becomes "the TODO list is checked off" rather than "the consumer can do the new things." Spec readers don't know what they get. Fresh-validator reviews struggle because the contract was never expressed in observable terms. Promotion gates can't verify consumer intent.

### Receipts

- `klappy/PTXprint-MCP` v1.2 §9 — 7 agent-observable behaviors as DoD; §5 and §10 carry the implementation specifics, kept separate. PR #30's fresh-validator review verified each §9 entry directly with file:line evidence.
```

### Rationale

The amendment sharpens existing definition-of-done. Same evidence requirements; specifies the format. The constraint is small (one section), low-risk (existing specs not retroactively invalid), and directly improves fresh-validator workflows because behavior-shaped DoDs are tractable to verify.

The convention pairs naturally with `canon/principles/specs-lock-at-implementation.md` (specs are contracts; this specifies what the contract's DoD section contains) and with the existing fresh-validator pattern in `canon/constraints/release-validation-gate.md`.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, no scope change** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: Existing specs are not retroactively invalid. The convention applies prospectively. Reviewers can cite the convention during PR review of new spec docs.

## Status

`accepted` (2026-05-05)

## Review Notes

- **Reviewer**: klappy (operator)
- **Decision**: `accepted`
- **Date**: 2026-05-05
- **Notes**: Accepted in the 8-proposal sweep. P0007 is the spec-side complement to P0001's runtime-side rule: P0001 says completion claims need artifacts; P0007 says specs must phrase completion in consumer-observable terms so artifacts can verify them. Section appended before the project-status marker `## ✅ Status` so the convention lives with the rest of the canonical content. Format constraint adopted verbatim: 5–7 entries, each in the form "`<consumer>` can `<action>` and observe `<outcome>`."

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/constraints/definition-of-done.md`
- **Backlink added**: Yes / No
