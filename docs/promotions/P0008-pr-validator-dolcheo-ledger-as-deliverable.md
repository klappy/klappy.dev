---
uri: klappy://docs/promotions/P0008-pr-validator-dolcheo-ledger-as-deliverable
title: "P0008: Fresh-Validator Deliverable Is a DOLCHEO Ledger Committed to the Repo"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "accepted", "release-validation-gate", "dolcheo", "validator-ledger", "fresh-context", "amendment"]
promotion_status: accepted
---

# P0008: Fresh-Validator Deliverable Is a DOLCHEO Ledger Committed to the Repo

> When a PR is reviewed by a fresh-session validator under the release-validation-gate, the validator's deliverable is a DOLCHEO ledger committed to the repo at a stable path, paired with a companion review handoff doc. Comments on the PR are not the deliverable; the canon-resident ledger is.

## Observed Pattern

`canon/constraints/release-validation-gate.md` (2026-04-20) binds every ship in this program: PRs require fresh-context validator review before merge to main, and load-bearing PRs require independent validator dispatch via Managed Agents. The gate specifies *that* validation happens and *who* performs it (a fresh-session validator, not the orchestrator). It does not specify *what the validator produces*.

Without a deliverable convention, validation findings end up in PR comments. PR comments are ephemeral — filtered, paginated, hidden when threads collapse, not searchable across repos. The same deviation gets re-discovered three PRs later. The same "platform constraint" gets re-litigated each session because no one knows whether it was already accepted as a permanent compromise or a v+1 candidate.

The pattern observed in PTXprint-MCP PR #30 (v1.3 telemetry) is that a structured ledger committed to the repo solves the durability problem. The validator produces two artifacts: a DOLCHEO-structured ledger at `canon/encodings/pr-NN-fresh-validator-ledger.md` (verdict, per-DoD-item PASS/FAIL with file:line evidence, learnings, accepted-deviations-with-revisit-candidates, nits, open observations) and a companion handoff doc at `canon/handoffs/pr-NN-fresh-validator-review.md`. Both are committed; both are searchable via oddkit.

- Affects: every fresh-validator review under the release-validation-gate
- Outcome without a deliverable convention: findings live in PR comments; cross-PR memory is lost; validators re-discover deviations that previous validators already accepted
- Outcome with the convention: findings live in canon; future PRs can cite specific ledger entries; "we already accepted this constraint and queued v+1 revisit" is a one-search answer

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| `klappy/PTXprint-MCP` PR #30 v1.3 telemetry | 2026-Q2 | Structured ledger format established | Fresh-session managed agent produced `canon/encodings/pr-30-fresh-validator-ledger.md` (DOLCHEO) + `canon/handoffs/pr-30-fresh-validator-review.md` (prose review). Both committed, attributed, dated |
| `klappy/PTXprint-MCP` PR #30 re-validation addendum | 2026-Q2 | Format proved durable across re-review | When Cursor Agent landed three additional fix commits, the re-validation produced `pr-30-revalidation-addendum.md` referencing the original ledger's numbered observations. Cross-session continuity worked |

**Total observations**: 2 (initial review + re-review on the same PR)
**Independent occurrences**: 2 review sessions in different contexts on the same release pipeline
**Affected workflows**: every release-validation-gate dispatch

## Current Handling

- **Detection today**: `canon/constraints/release-validation-gate.md` requires the validator to produce findings; `canon/definitions/dolcheo-vocabulary.md` defines the DOLCHEO seven-letter session-capture format
- **Closest adjacent canon**: `canon/methods/governance-validation-via-agents.md` (validators do the checking before merge); `canon/constraints/canon-integration-audit.md` (the three audits between authoring and merge)
- **Gap**: no canon doc says "the validator's deliverable shape is DOLCHEO at this specific path." The DOLCHEO vocabulary covers session-capture broadly; the release gate covers when validation happens; the integration audit covers what to check; nothing joins them at "what does the validator commit to the repo when done"

## Proposed Promotion

### Target Document

`canon/constraints/release-validation-gate.md` — append a new section.

### Section

`## Validator Deliverable Convention — The PR-NN Fresh-Validator Ledger` (new section appended)

### Proposed Language

```markdown
## Validator Deliverable Convention — The PR-NN Fresh-Validator Ledger

A fresh-session validator running under this gate MUST produce two artifacts as part of accepting or rejecting a PR. Both committed to the repo.

### 1. The Ledger

**Path**: `canon/encodings/pr-NN-fresh-validator-ledger.md` (or repo-equivalent)
**Structure**: DOLCHEO per `canon/definitions/dolcheo-vocabulary`

Sections (in order):

- **Decisions (D)** — the verdict (`SAFE TO MERGE` | `NOT SAFE`) with one-paragraph reason
- **Observations Closed (O)** — per-DoD-item PASS/FAIL with file:line evidence
- **Learnings (L)** — patterns the validator wants future readers to internalize
- **Constraints (C)** — deviations from spec accepted as platform/library constraints. Each accepted-as-constraint deviation MUST be paired with either "permanent" or "v+1 revisit candidate" — never silently accepted as permanent without explicit naming
- **Handoff (H)** — nits-grade follow-ups for the next session
- **Opens (O-open)** — still-open questions, each numbered for back-reference from future sessions

### 2. The Companion Review

**Path**: `canon/handoffs/pr-NN-fresh-validator-review.md` (or repo-equivalent)

Free-form prose attribution and summary. May reference the ledger's numbered observations directly. Names the validator (model + session ID), date, scope.

### Both committed to the repo

In the same PR or as a follow-up commit on the validation branch. Frontmatter declares `reviewer:` and `reviews:`. Date in frontmatter `date:`.

### Why a Canon-Resident Ledger Is the Deliverable

GitHub PR comments are ephemeral — filtered, paginated, hidden on thread collapse, not searchable across repos. A canon-resident ledger is searchable via oddkit, indexed by the validator's repo, and forms the long-term record of what was checked, what was accepted as a platform constraint with v+1 candidate, and what nits remain. Future PRs that reopen the same ground can cite the ledger directly.

### Failure Mode

Without this convention: findings live in PR comments that are read once and forgotten. The same deviation gets re-discovered three PRs later. The same "platform constraint" gets re-litigated each session because no one knows whether it was already accepted. The ledger creates the system memory the gate's enforcement-by-convention-plus-enforcer shape requires.

### Receipts

- `klappy/PTXprint-MCP` PR #30 v1.3 telemetry — `canon/encodings/pr-30-fresh-validator-ledger.md` + `canon/handoffs/pr-30-fresh-validator-review.md`. Re-validation produced `pr-30-revalidation-addendum.md` referencing the original ledger's numbered observations.
```

### Rationale

The release-validation-gate currently says validation must happen and must be fresh-context. This amendment adds *what shape the output takes* — same enforcement model the gate already uses, with a writeable target. The DOLCHEO vocabulary already exists; this amendment specifies its application to the PR-validator workflow.

Joining `release-validation-gate` + `dolcheo-vocabulary` at the deliverable layer closes a real gap. Both docs exist; nothing tells a validator "produce a DOLCHEO ledger at `canon/encodings/pr-NN-...`."

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| Low | Clarifies existing rule, no scope change |
| **Medium** | **Adds new requirement, may affect workflows** |
| High | Changes existing behavior, requires migration |

**Risk level**: Medium

**Mitigation**: The convention adds a deliverable requirement to fresh-validator dispatch. Existing PRs whose validators commented inline are not retroactively invalid. The convention applies prospectively. The format is well-defined (DOLCHEO is canon) and template-friendly — a validator can be primed with the structure, lowering authoring overhead.

## Status

`accepted` (2026-05-05)

## Review Notes

- **Reviewer**: klappy (operator)
- **Decision**: `accepted`
- **Date**: 2026-05-05
- **Notes**: Accepted in the 8-proposal sweep (P0001 + P0003–P0009) sitting behind P0002's just-merged chain. P0008 is prioritised as third in the queue because it directly affects the release-validation-gate workflow that PRs ship under daily. The proposed language is appended verbatim before `## Related Canon`. Two structural choices ratified: (1) the canon-resident ledger is the validator's deliverable, not PR comments; (2) accepted-as-constraint deviations MUST be paired with permanent / v+1-revisit-candidate framing — silent acceptance is the failure mode being prevented.

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/constraints/release-validation-gate.md`
- **Backlink added**: Yes / No
