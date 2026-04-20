---
uri: klappy://odd/gate/transitions
title: "Gate Transitions — Mode Transition Keys and Detection Terms"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "gate", "transitions", "mode-discipline", "detection-terms"]
epoch: E0008.3
date: 2026-04-20
derives_from: "canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/constraints/core-governance-baseline.md, canon/principles/vodka-architecture.md"
complements: "odd/gate/prerequisites.md"
governs: "oddkit_gate transition keys, their from/to endpoints, the prerequisite ids required at each transition, and the detection terms used to identify a transition in user input"
status: active
---

# Gate Transitions — Mode Transition Keys and Detection Terms

> `oddkit_gate` checks prerequisites before the operator crosses a mode boundary. Each transition is identified by a stable key, has a `from` and `to` endpoint, names the prerequisite ids that must be satisfied before the transition is considered ready, and supplies a vocabulary of detection terms used to recognize the transition in user input. The server tokenizes and Porter-stems both the detection terms and the user input, then uses BM25 scoring to pick the single best-matching transition. Top hit with score greater than zero wins; row order in the table below breaks ties. When no row scores above zero, the transition is reported as `unknown → unknown` and the gate returns `PASS` with no prerequisites checked, matching the current reversion-path convention.

---

## Summary — One Row Per Transition Key, Detection and Prerequisites Co-Located

Four declared transitions cover the mode-discipline cycle: opening planning after exploration, opening execution after planning, reverting from execution to exploration when the plan needs rethinking, and declaring completion when execution produces a validated artifact. Each row carries its own detection vocabulary and prerequisite-id list, so consumers reading this file can answer "what fires this transition, and what must be true for it to pass?" in one lookup. Prerequisite ids resolve against `odd/gate/prerequisites.md` — that file defines each id's description, check vocabulary, and gap message. Detection terms are matched via BM25 over stemmed tokens; the specific-phrase-beats-single-word property of BM25 scoring means that `ready to build` outscores the bare word `ready` when both appear in the input, so the specific transition wins on score rather than relying on regex cascade order.

---

## Transitions

| Transition Key | From | To | Prerequisites | Detection Terms |
|---|---|---|---|---|
| `planning-to-execution` | planning | execution | decisions_locked, dod_defined, irreversibility_assessed, constraints_satisfied | ready to build, ready to implement, start building, let's code, start coding, moving to execution, moving to build |
| `exploration-to-planning` | exploration | planning | problem_defined, constraints_reviewed | ready to plan, start planning, let's plan, time to plan, move to planning, moving to planning, ready, let's go, proceed, move forward, next step |
| `execution-to-exploration` | execution | exploration |  | back to exploration, need to rethink, step back, reconsider |
| `execution-to-completion` | execution | completion | dod_met, artifacts_present | ship, deploy, release, go live, push to prod |

---

## Notes

Row order is the tiebreaker priority when two transitions score identically under BM25. BM25 naturally prefers specific-phrase matches over single-word matches — an input like "ready to build my feature" scores the multi-term match against `planning-to-execution` above the single-term match against `exploration-to-planning` — so row order rarely decides the winner. The ordering is kept stable regardless to produce deterministic output on genuine ties.

Detection terms are stemmed at parse time using the Porter-style stemmer in the server. Stemming covers the common inflection suffixes `ies`, `ied`, `ed`, `ing`, `tion`, `ment`, `ness`, `able`, `ible`, and `s`, which means variations like `shipping`, `shipped`, `deploying`, `released`, `started building`, `building`, `stepped back`, `stepping back`, and `reconsidering` match their canonical transitions even though the exact phrases are not listed. Terms that already appear in their stemmed base form — `ship`, `build`, `reconsider` — match themselves directly.

The `execution-to-exploration` transition has no prerequisites because reversion is explicitly permitted under the mode-discipline contract at `klappy://canon/constraints/mode-discipline-and-bottleneck-respect`. Reversion requires only that the operator name the specific unknown that drove the reversion, which is a behavioral expectation enforced by the operator's own discipline rather than by a gated prereq check.

When no row's detection terms score above zero against the user input, the server reports the transition as `unknown → unknown`. In this case no prerequisites are looked up and the gate returns `PASS` — the convention being that an unrecognized input is not a gate crossing at all, so there is nothing to block. This matches the pre-refactor behavior encoded in the previous hardcoded detection cascade.

Prereq-ids listed in the Prerequisites column are resolved against `odd/gate/prerequisites.md`. An id that appears in this table but not in that file is a governance error; the server's minimal fallback tier carries a hardcoded vocabulary snapshot that keeps gate functional in this case, but the canon-level fix is to update one file or the other.

When the server cannot reach this file at runtime, `oddkit_gate` falls back to a hardcoded minimal vocabulary that mirrors the row order and detection terms above. The minimal tier is identified in the response envelope via `governance_source: "minimal"`; the canon tier via `governance_source: "knowledge_base"`. Both tiers run the same BM25 matcher; they differ only in whether the vocabulary is editable by updating this file or locked to the deployed worker version.
