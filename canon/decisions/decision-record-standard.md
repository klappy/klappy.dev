---
uri: klappy://canon/decisions/decision-record-standard
title: "Decision Record Standard"
subtitle: "How decisions become durable, citable truth in ODD"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
type: standard
tags: ["decisions", "adr", "documentation", "canon", "governance"]
relevance: decision
execution_posture: governing
---

# Decision Record Standard

> Decisions are first-class documentation. A decision record preserves intent, alternatives, rationale, and consequences.

## Description

Decision records prevent re-litigating choices and preserve the reasoning that led to a path. They are **citable** and **versioned**. Decisions can be superseded, but supersession must be explicit.

Decision records are promoted from the Decisions Ledger when they prove durable and broadly relevant.

## Outline

- File Location and Naming
- Required Frontmatter
- Required Sections
- Lifecycle States
- Promotion from Ledger

---

## Operating Constraints

- MUST preserve intent, alternatives, rationale, and consequences
- MUST be citable via stable URI
- MUST track supersession explicitly
- MUST require human approval for promotion from ledger to canon
- MUST NOT allow models to create decision records directly (must go through ledger → human review)

---

## Defaults

- Decision records live in `canon/decisions/`
- Use stable ID + slug naming: `DR-YYYYMMDD-####-short-slug.md`
- Status defaults to `proposed` until human accepts
- Supersession requires explicit `supersedes` / `superseded_by` fields

---

## Failure Modes

- **Orphan Decisions**: Decisions made without records, lost to time
- **Relitigating Settled Choices**: Same debates recurring because rationale was not preserved
- **Silent Supersession**: New decisions implicitly override old ones without explicit link
- **Premature Canonization**: Ledger entries promoted to canon before proving durable
- **Missing Alternatives**: Recording what was chosen without explaining what was rejected

---

## Verification

- Decision record exists for all significant architectural and process choices
- Each record has at least 2 alternatives considered
- Supersession chains are traceable
- Records are citable in other documents

---

## Content

### File Location

Canonical decision records live in:

```
canon/decisions/
```

### Naming Convention

Use a stable ID + slug:

```
DR-YYYYMMDD-####-short-slug.md
```

Example:

```
DR-20260129-0003-canon-target-first-freshness.md
```

### Required Frontmatter

```yaml
---
uri: klappy://canon/decisions/DR-YYYYMMDD-####
title: "DR-YYYYMMDD-####: <Decision title>"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
type: decision-record
tags: ["decision", "adr"]
status: accepted | proposed | superseded | deprecated
supersedes: []
superseded_by: null
---
```

### Required Sections

#### Context

What situation forced a choice? What constraints matter?

#### Decision

What did we choose?

#### Options Considered

List 2+ options, including "do nothing" if relevant. For each:

- Option name
- Pros
- Cons

#### Rationale

Why this choice? Tie to evidence and constraints.

#### Consequences

What does this enable? What does it restrict?

#### Evidence

Links to artifacts (tests, logs, docs, commits).

#### Notes

Any nuance, unresolved risks, or future revisit criteria.

---

## Lifecycle States

| Status | Meaning |
|--------|---------|
| `proposed` | Draft, awaiting human review |
| `accepted` | Active, governs behavior |
| `superseded` | Replaced by another decision |
| `deprecated` | No longer applies, not replaced |

---

## Promotion from Ledger

Decision records are promoted from the **Decisions Ledger** (`odd/ledger/decisions.jsonl`) when they prove:

1. **Durable** — Referenced multiple times, not one-off
2. **Broadly relevant** — Affects multiple features, repos, or agents
3. **Stable** — Wording and rationale are settled

The promotion process:

1. Scribe identifies candidate in ledger
2. Human reviews and approves
3. Draft canonical record created
4. Human commits to `canon/decisions/`

---

## See Also

- [ODD Scribe](/docs/agents/odd-scribe.md) — The agent role that records decisions to the ledger
- [Models Do Not Mutate Canon](/canon/decisions/models-do-not-mutate-canon.md) — Why models draft, humans commit
