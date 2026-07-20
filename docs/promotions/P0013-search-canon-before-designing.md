---
uri: klappy://docs/promotions/P0013-search-canon-before-designing
title: "P0013: Search Canon Before Designing, Not Just Before Asking"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "canon-search", "design-time", "mode-discipline", "anti-cache-lying"]
promotion_status: proposed
---

# P0013: Search Canon Before Designing, Not Just Before Asking

> `canon/constraints/mode-discipline-and-bottleneck-respect.md` already binds "search canon before asking anything, in any mode." It does not yet bind the earlier moment: search canon before *designing* — before a solution shape is chosen, not just before a question is about to be surfaced to the maintainer. A violated constraint that had existed since February was rediscovered the hard way when a design decision skipped the search step entirely.

## Observed Pattern

A design decision with a named canon domain (in this case, caching) was made without first consulting the canon domain that already governed it. The existing "search before asking" rule did not catch this, because the failure never reached the asking step — it was a fully-formed design before any question would have been surfaced. The rule closes the gap between "a question is about to be asked" and "canon already answered it." It does not close the earlier gap: "a design is about to be chosen" and "canon already constrains this domain."

- Affects: any design decision with a named canon domain (caching, storage, identity, disclosure, and by extension any future domain that accumulates a canon constraint)
- Outcome without the corollary: canon can exist, be stable, and still be violated twice, because the discipline only fires at the asking boundary, which a fully-formed design can bypass entirely

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| Corpus v1 caching design (per-isolate cache) | 2026-07-19 | FAIL (canon violated) | Violated `odd/constraint/anti-cache-lying.md` (E0005, stable canon since 2026-02-12, itself proven necessary by the earlier OddKit Stale-Cache Incident) — a TTL-shaped per-isolate cache for derived content, without a canon search at design time |
| Corpus v1 caching design (mutable-key R2 write-through) | 2026-07-19 | FAIL (canon violated, same incident) | Second, independent design choice in the same rebuild that also violated the same already-stable constraint; caught only when the captain caught it in conversation, not by a design-time canon search |
| Folded seed: "a cache is a lie in wait" (debrief line, `odd/debriefs/2026-07-19-weekend-closeout.md`) | 2026-07-19 | Supporting evidence, not independently promoted | The sweep judged this debrief line's substance already fully covered by stable canon (`anti-cache-lying.md`); its value here is as *proof that the constraint's existence alone did not prevent violation* — the actionable gap is the design-time search corollary this promotion proposes, not a restatement of the caching rule itself |

**Total observations**: 2 independent design decisions violating the same pre-existing constraint in one incident, plus one folded corroborating debrief line
**Independent occurrences**: 2 (two distinct design choices, same incident) — honestly below this pipeline's usual ≥2-*independent*-incidents bar (see P0004/P0006, which each cite 2 distinct repositories/projects). Flagged for the maintainer: this promotion may be better dispositioned as **deferred pending a second, separate incident** rather than accepted outright, precisely because the sweep's own honesty mandate does not want to inflate a same-incident double-count into cross-incident evidence.
**Affected workflows**: any design-mode work touching a canon-governed domain

## Current Handling

- **Detection today**: `canon/constraints/mode-discipline-and-bottleneck-respect.md` binds "search canon before asking anything, in any mode" — this fires at the question-surfacing boundary
- **Closest existing canon**: the same document; also `canon/bootstrap/generic-boarding-pass.md`, which lists "search canon before asking" as one of the universal load-bearing behaviors an adopter must keep
- **Gap**: neither document binds a search at the *design* boundary — before a solution shape is chosen. A design can be fully formed and never trigger a question, if the designer is confident. Confidence without a canon search is exactly the failure mode observed here.

## Proposed Promotion

### Target Document

`canon/constraints/mode-discipline-and-bottleneck-respect.md`

### Section

Append immediately after the existing paragraph ending "...only in a mode where surfacing is valid." (the paragraph that currently reads: "Accompanying this: **search canon before asking anything, in any mode.** ...").

### Proposed Language

```markdown
**Corollary — search canon before designing, not just before asking.** The
rule above closes the gap between "a question is about to be asked" and
"canon already answered it." It does not close the earlier gap: a fully-formed
design can bypass the asking step entirely if the designer is confident.
Any design decision with a named canon domain (caching, storage, identity,
disclosure, or any future domain that accumulates a canon constraint) requires
a canon search *at design time*, before a solution shape is chosen — not only
when a question is about to be surfaced. Confidence is not evidence that
canon was consulted. A constraint that has existed in canon for months can
still be violated if the design step that should have searched for it never
did.
```

### Rationale

This is a minimal, additive corollary to an existing tier-1 constraint, not a new document. It names the specific temporal gap the incident exposed (design-time vs. ask-time) and generalizes the trigger condition ("any design decision with a named canon domain") so the fix is not caching-specific. Placed directly after the existing "search before asking" paragraph so the two rules read as one continuous discipline rather than a duplicate or a competing rule.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, extends its trigger condition earlier in the workflow, no new gate or enforcement mechanism** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: This does not introduce a new validator or block; it extends an existing, already-binding discipline one step earlier. If the evidence bar (2 occurrences in one incident, not 2 independent incidents) is judged insufficient, `deferred` with a named re-review trigger ("next canon-domain design decision") is a legitimate outcome and is explicitly not a rejection of the underlying claim.

## Status

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
- **Canon doc updated**: `canon/constraints/mode-discipline-and-bottleneck-respect.md`
- **Backlink added**: Yes / No

---

## Sweep Provenance

Drafted by the first distillation sweep (ODD `sweep/2026-07-20-first-distillation`,
2026-07-20), fed by the second-brain feeding loop PRD
(`klappy/outcomes-driven-development`, `docs/prd/2026-07-14-second-brain-feeding-loop.md`,
merged `46b2e9b`) from debrief lines in
`odd/debriefs/2026-07-19-weekend-closeout.md` ("search canon before DESIGNING,
not just before asking" and the folded "a cache is a lie in wait" line). This
is a DRAFT proposal — per `docs/promotions/README.md`, promotion to Canon is
the maintainer's decision alone. Delivered as a fallback artifact (push to
klappy.dev refused — 403) inside the ODD sweep branch; the dispatch seat
opens the PR against klappy.dev from this file and its companion patch.
