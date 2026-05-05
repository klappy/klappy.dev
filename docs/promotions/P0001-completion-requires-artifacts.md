---
uri: klappy://docs/promotions/P0001-completion-requires-artifacts
title: "P0001: Completion Claims Require Artifacts"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "accepted", "validation", "evidence"]
promotion_status: accepted
---

# P0001: Completion Claims Require Artifacts

> Completion claims without artifacts are automatically flagged as NEEDS_ARTIFACTS, never PASS.

## Observed Pattern

Users assert completion ("done", "finished", "shipped", "it works") without providing supporting artifacts.

- Affects: All completion validation
- Outcome: Validation Agent cannot verify claims
- Behavior without rule: System would accept claims at face value

## Evidence

| Validation Session       | Date       | Outcome         | Notes                                                      |
| ------------------------ | ---------- | --------------- | ---------------------------------------------------------- |
| Validation Agent v0 test | 2026-01-27 | NEEDS_ARTIFACTS | "I finished the login form." — no screenshot               |
| Validation Agent v0 test | 2026-01-27 | NEEDS_ARTIFACTS | "Done with the API endpoint." — no test output             |
| Validation Agent v0 test | 2026-01-27 | NEEDS_ARTIFACTS | "Shipped the new dashboard." — PR link only, no deploy log |

**Total observations**: 3 (initial test suite)
**Independent occurrences**: 3
**Affected workflows**: UI completion, API completion, deployment completion

## Current Handling

- **Agent**: Validation Agent (`infra/orchestrator/services/validation.js`)
- **Detection**: `determineVerdict()` returns `NEEDS_ARTIFACTS` when `matched.length === 0` or `gaps.length > 0`
- **Guidance**: Returns checklist of missing evidence types

The Validation Agent already enforces this pattern. This promotion makes it explicit in Canon.

## Proposed Promotion

### Target Document

`canon/constraints/definition-of-done.md`

### Section

`## Operating Constraints` (new bullet) + `## Failure Modes` (new entry)

### Proposed Language

Add to Operating Constraints:

```text
- MUST NOT mark a claim as verified without at least one artifact that demonstrates the claimed outcome
- MUST return NEEDS_ARTIFACTS when claims exist but evidence is absent
```

Add to Failure Modes:

```text
- **Unverified Completion**: Accepting "done" claims without corresponding artifacts (screenshots, logs, links, command output)
```

### Rationale

- Aligns Canon with Validation Agent behavior
- Makes the rule discoverable via Librarian
- Provides citation basis for future validation verdicts

## Risk Assessment

| Risk Level | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| Low        | Clarifies existing behavior, already enforced by Validation Agent |

**Risk level**: Low

**Mitigation**: None required — this is documentation of existing enforcement.

## Status

`accepted` (2026-05-05)

## Review Notes

- **Reviewer**: klappy (operator)
- **Decision**: `accepted`
- **Date**: 2026-05-05
- **Notes**: Oldest backlog item in the `proposed` queue. The Validation Agent (`infra/orchestrator/services/validation.js`) already enforces this at code level via `determineVerdict()` — this canon edit aligns the written constraint with the enforced behavior. Accepted as drafted; execution committed in the same PR appends two MUST bullets to `## Operating Constraints` and one new entry to `## Failure Modes` of `canon/constraints/definition-of-done.md`.

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**:
- **Backlink added**:
