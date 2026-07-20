---
uri: klappy://docs/promotions/P0012-learning-to-learn-triple-loop-review
title: "P0012: Learning to Learn Is the Meta-Skill — Make Triple-Loop Review a Standing Debrief Question"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "learning-to-learn", "trust-kernel", "debrief", "meta-skill"]
promotion_status: proposed
---

# P0012: Learning to Learn Is the Meta-Skill — Make Triple-Loop Review a Standing Debrief Question

> Learning to learn from mistakes is a meta-skill, not an emergent nicety of good process, and the program should treat it as first-class. Concretely: every debrief should answer three questions, not one — *what did we learn* (single-loop: fix the mistake), *what law prevents the class* (double-loop: fix the system that produced it), and *did the learning machinery itself perform* (triple-loop: fix how the fixing works). A debrief that only answers the first is a log, not a learning event.

## Observed Pattern

Debriefs today reliably capture single-loop learning (fix the mistake) and, increasingly, double-loop learning (candidate lines → policy amendments, e.g. `dispatch-flight-rules`). What is not yet a standing question is triple-loop review: whether the learning machinery itself — the debrief format, the candidate-line duty, the validator posture — performed, or whether it would have caught the same class of miss sooner, cheaper, or without escalating to the captain.

- Affects: every debrief across every flight/session in this program
- Outcome without the standing question: the program keeps fixing instances and classes, but never audits whether its own learning apparatus is improving; triple-loop insight (e.g., the corpus incident's caching-architecture reversal) currently happens only when a captain personally catches it, not as a routine debrief question

## Evidence

All observations below are drawn from one calendar window (2026-07-18 evening
→ 2026-07-19 ~04:50Z) but span distinct events, distinct repositories, and
distinct mechanisms — treated here as independent occurrences of the pattern,
not a single incident, per the sweep's judgment that same-day-but-distinct
qualifies. Flagged honestly: none of these observations spans multiple
calendar days, which is a weaker independence bar than e.g. P0002's six
cross-repo occurrences.

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| ARS `dispatch-flight-rules` policy, same-day casualty→law | 2026-07-18/19 | Double-loop success | Casualties → `candidate:` lines → policy merged same-day (commit `0abf04d`); the debrief legislated so the class of mistake dies, not the instance |
| Validators failing their own author twice | 2026-07-18/19 | Triple-loop signal | PR #101 (api-listing scope) and PR #104 (three findings) — fresh-context validators correctly FAILed the authoring seat's own work; the check-the-checker layer performed |
| Guards catching their creators within seconds | 2026-07-18/19 | Triple-loop signal | Un-baked corpus guard flagged its own author's missing frontmatter; the pinned-list test guarded the guard itself |
| Cross-seat debrief-driving-fix | 2026-07-18/19 | Triple-loop success | A cowork seat's debrief drove a second seat's production fix (corpus outage RCA) — the debrief functioned as inter-seat learning transfer, not just intra-seat record |
| Captain's bridge-vs-architecture catch | 2026-07-19 | Triple-loop success (human-in-loop) | Seat proposed a workaround (auto-mirror machinery) to stabilize a bug; captain identified the deeper question (should the second source of truth exist at all), producing PRD corpus-self-serve-v1 within the hour — the fastest triple-loop turnaround observed, but currently requires the captain's personal attention rather than a standing debrief question |

**Total observations**: 5
**Independent occurrences**: 5 distinct mechanisms/events within one session window, across 2 repos (ARS, and the corpus/PRD work); no cross-session recurrence yet observed
**Affected workflows**: the debrief format itself, wherever it is practiced

## Current Handling

- **Detection today**: single-loop and double-loop learning are named and practiced (candidate lines feed policy amendments per the second-brain feeding loop PRD itself). Triple-loop review — auditing whether the learning machinery performed — has no standing prompt; it happened this window only because the captain personally noticed the bridge/architecture distinction
- **Closest existing canon**: `canon/values/trust-kernel.md` ("Trust Is Built by Managing Expectations") is the parent principle this seed derives from — trust compounds through expectations kept or honestly repaired, and triple-loop review is a mechanism for keeping the *learning process itself* honest, not just individual outcomes
- **Gap**: no canon document currently asks "did the learning machinery itself perform" as a standing debrief question; it currently depends on a human noticing

## Proposed Promotion

### Target Document

`canon/methods/triple-loop-debrief-review.md` (new)

### Section

Whole document; new file.

### Proposed Language

```markdown
---
uri: klappy://canon/methods/triple-loop-debrief-review
title: "Triple-Loop Debrief Review — Learning to Learn as a Standing Question"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["methods", "debrief", "learning-to-learn", "meta-skill"]
derives_from:
  - klappy://canon/values/trust-kernel
status: active
---

# Triple-Loop Debrief Review

> Learning to learn from mistakes is a meta-skill, not an emergent nicety of
> good process. Every debrief answers three questions, not one.

## The Three Loops

1. **Fix the mistake** (single-loop) — a validator FAILs a PR; the seat
   iterates; re-validation passes. Routine by design.
2. **Fix the system that produced it** (double-loop) — casualties become
   `candidate:` lines, which become policy; the debrief legislates so the
   class of mistake dies, not the instance.
3. **Fix how the fixing works** (triple-loop, the meta-skill) — did the
   learning machinery itself perform? What would have caught this sooner,
   cheaper, or without escalating to the maintainer?

## The Standing Question

A debrief that only answers loop 1 is a log, not learning. Every debrief
should name, even briefly: *what did the learning machinery itself do this
session, and did it work?*

## Relationship to the Trust Kernel

This is not a new value — it is `canon/values/trust-kernel` ("Trust Is Built
by Managing Expectations") gaining a standing instrument. Declared
expectations are promises with a shape; triple-loop review is the audit that
keeps the promise about the *learning process itself* honest, not just the
promise about any single outcome.

## Failure Mode Without This

Triple-loop insight only surfaces when a human happens to notice it (e.g., a
bridge-fix vs. architecture-fix distinction). The class of catch does not
scale past the attention of whoever is watching that day.
```

### Rationale

This canonizes a practice already observed working (validators catching
their authors, guards catching their creators, a captain's catch producing a
same-hour PRD) rather than introducing new behavior — it gives the pattern a
name and a standing home so future debriefs ask the question on purpose
instead of by luck. Placed under `canon/methods/` as a debrief procedure,
deriving from and citing `trust-kernel` rather than restating it, per
`dry-canon-says-it-once`.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, no scope change — adds a standing debrief question, no new gate or enforcement mechanism** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: This is a debrief-content addition, not a gate. A debrief that skips the third question is a quality gap to note, not a blocker to catch downstream work on.

## Status

**LANDED AS ACTIVE CANON** — extracted verbatim to `canon/methods/triple-loop-debrief-review.md`, 2026-07-20, on captain merge instruction ("306 A and merge it").

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
- **Canon doc updated**: `canon/methods/triple-loop-debrief-review.md`
- **Backlink added**: Yes / No

---

## Sweep Provenance

Drafted by the first distillation sweep (ODD `sweep/2026-07-20-first-distillation`,
2026-07-20), fed by the second-brain feeding loop PRD
(`klappy/outcomes-driven-development`, `docs/prd/2026-07-14-second-brain-feeding-loop.md`,
merged `46b2e9b`) from the candidate seed
`candidates/2026-07-19-learning-to-learn-meta-skill.md`. This is a DRAFT
proposal — per `docs/promotions/README.md`, promotion to Canon is the
maintainer's decision alone. Delivered as a fallback artifact (push to
klappy.dev refused — 403) inside the ODD sweep branch; the dispatch seat
opens the PR against klappy.dev from this file and its companion patch.
