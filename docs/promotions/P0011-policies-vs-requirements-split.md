---
uri: klappy://docs/promotions/P0011-policies-vs-requirements-split
title: "P0011: Policies vs. Requirements — Split an Overloaded Category So Steering Failures Stop Reproducing"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "policy", "requirements", "steering", "prd", "governance"]
promotion_status: proposed
---

# P0011: Policies vs. Requirements — Split an Overloaded Category So Steering Failures Stop Reproducing

> "Policy" has been used to name two different artifact types — durable, slow-changing principles (POLICIES) and fast-changing, build-specific functional needs (REQUIREMENTS). Collapsing them is a suspected root cause of steering failures: requirements dressed as policy resist necessary change; policy dressed as requirements churns when it shouldn't. This promotion canonizes the split as a named distinction, without yet resolving the boundary test or migration path for existing documents.

## Observed Pattern

The program has overloaded "policy" to cover everything that shapes AI behavior, from durable abstract guidance down to the specific functional needs of a single build. Two failure modes follow from the collapse:

- A requirement written as if it were policy inherits policy's durability expectations and becomes artificially resistant to change, when it should be revisable per build.
- A policy written as if it were a requirement inherits requirements' fast-changing cadence and churns on every build cycle, when it should be stable.

- Affects: mode-output contracts, PRD gates, and any surface that currently asks for "policy" without naming which of the two artifact types it means
- Outcome without the split: steering failures of the two shapes above continue to reproduce, each misdiagnosed as a one-off rather than an instance of a named category error

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| Captain's log capture (Bee), relayed via Otto seat sess_f7294064 | 2026-07-18 ~12:10 EDT | Ratified | Captain named the category collapse directly and credited the observation to Jesse; ratified in-session 2026-07-19 |

**Total observations**: 1 (direct captain ruling, not a repeated-validator-failure pattern)
**Independent occurrences**: 1 — this promotion does **not** meet `docs/promotions/README.md`'s literal rule ("No promotion without ≥2 independent validations"). Flagged squarely, not softened: this is below the pipeline's stated floor, not merely a "different evidence class." It is drafted anyway because the evidentiary basis is a direct captain ruling already recorded (`candidates/2026-07-18-policies-vs-requirements-split.md`, status: ratified) rather than a validator-discovered failure pattern, and the sweep judges that a captain's own in-session ratification is a legitimate basis for the maintainer to consider — but the maintainer should treat the ≥2-validations rule as unmet here, and `accepted` on the strength of the ruling alone (rather than `deferred` pending independent corroboration) is a deliberate exception to the pipeline's own numeric bar, not a case where the bar was satisfied.
**Affected workflows**: any workflow that produces or consumes something currently labeled "policy" — mode-output contracts, PRD gates, canon authoring

## Current Handling

No canon document currently names this split. `canon/meta/writing-canon.md` and the PRD gate discuss what canon documents look like, but neither distinguishes POLICIES (durable, canon-shaped) from REQUIREMENTS (fast-changing, PRD-shaped) as a named category question a document must answer before being filed.

## Proposed Promotion

### Target Document

`canon/meta/policies-vs-requirements.md` (new)

### Section

Whole document; new file.

### Proposed Language

```markdown
---
uri: klappy://canon/meta/policies-vs-requirements
title: "Policies vs. Requirements — A Category the Program Has Been Collapsing"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["meta", "policy", "requirements", "steering", "governance"]
derives_from:
  - klappy://canon/meta/writing-canon
status: active
---

# Policies vs. Requirements

> "Policy" has been used to name two different things: durable, slow-changing
> principles (POLICIES) and fast-changing, build-specific functional needs
> (REQUIREMENTS). Collapsing them is a suspected root cause of steering
> failures.

## The Split

- **POLICIES** — principles and abstract guidance. Durable, slow-changing,
  canon-shaped.
- **REQUIREMENTS** — specific functional needs of a build. Fast-changing,
  PRD-shaped.

## Why the Collapse Fails

A requirement written as if it were policy inherits policy's durability
expectations and resists necessary change. A policy written as if it were a
requirement inherits requirements' fast cadence and churns when it should
hold steady.

## What This Does Not Resolve

The exact boundary test for classifying an existing document, and the
migration path for documents currently misfiled, are not defined here. This
document names the split; a follow-on promotion would need to propose the
test and the migration.

## Practical Implication

Mode-output contracts and the PRD gate should each name explicitly which
artifact type — policy or requirement — they are demanding, rather than
leaving "policy" to do double duty.
```

### Rationale

The split is cheap to state and, per the captain's ratification, already agreed conceptually — this promotion's job is only to give it a canon home so mode-output contracts and the PRD gate can cite it. Placed under `canon/meta/` alongside `writing-canon.md` since this is a claim about how governing documents are classified, not a domain principle or a process method.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, no scope change — names a distinction, proposes no migration or enforcement mechanism** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: This document only names the category; it does not reclassify any existing document. A follow-on promotion would be needed before any document is moved or retagged.

## Status

**LANDED AS ACTIVE CANON** — extracted verbatim to `canon/meta/policies-vs-requirements.md`, 2026-07-20, on captain merge instruction ("A and merge it").

`proposed`

## Review Notes

(To be filled during review)

- **Reviewer**:
- **Decision**:
- **Date**:
- **Notes**:

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/meta/policies-vs-requirements.md`
- **Backlink added**: Yes / No

---

## Sweep Provenance

Drafted by the first distillation sweep (ODD `sweep/2026-07-20-first-distillation`,
2026-07-20), fed by the second-brain feeding loop PRD
(`klappy/outcomes-driven-development`, `docs/prd/2026-07-14-second-brain-feeding-loop.md`,
merged `46b2e9b`) from the ratified seed
`candidates/2026-07-18-policies-vs-requirements-split.md`. This is a DRAFT
proposal — per `docs/promotions/README.md`, promotion to Canon is the
maintainer's decision alone. Delivered as a fallback artifact (push to
klappy.dev refused — 403) inside the ODD sweep branch; the dispatch seat
opens the PR against klappy.dev from this file and its companion patch.
