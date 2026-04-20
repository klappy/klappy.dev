---
uri: klappy://odd/gate/prerequisites
title: "Gate Prerequisites — Prerequisite IDs, Check Vocabularies, and Gap Messages"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "gate", "prerequisites", "mode-discipline", "check-vocabulary"]
epoch: E0008.3
date: 2026-04-20
derives_from: "canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/constraints/core-governance-baseline.md, canon/principles/vodka-architecture.md"
complements: "odd/gate/transitions.md"
governs: "oddkit_gate prerequisite id definitions — each prereq's description, the vocabulary used to check whether the input satisfies it, and the gap message surfaced when it does not"
status: active
---

# Gate Prerequisites — Prerequisite IDs, Check Vocabularies, and Gap Messages

> Every transition in `odd/gate/transitions.md` references its prerequisites by id. This file is where those ids are defined. Each row names one prerequisite, gives a human-readable description, lists the check vocabulary that indicates the prerequisite is satisfied in the user input, and supplies the gap message surfaced when it is not. Prereq matching is by stemmed set intersection, not BM25: each prereq is evaluated independently — pass if any stemmed input token matches any stemmed check term, fail otherwise. Independence means there is no ranking pass and no IDF correction; the simpler matcher is fit-to-problem because each prereq returns gap-or-not in isolation.

---

## Summary — Eight Prerequisites, Referenced by ID from Transitions

Eight prerequisite ids are defined here. They are grouped roughly by what transition they tend to gate, though the same id can be referenced by multiple transitions if future canon adds such references. `problem_defined` and `constraints_reviewed` gate opening planning after exploration. `decisions_locked`, `dod_defined`, `irreversibility_assessed`, and `constraints_satisfied` gate opening execution after planning. `dod_met` and `artifacts_present` gate declaring completion. Check vocabularies are deliberately broad word lists that cover the most common ways an operator signals the prerequisite in natural language. Gap messages name the missing prerequisite in a single sentence phrased to point the operator at what to surface next.

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| problem_defined | problem, goal, objective, need, issue | "Problem statement not defined — the goal or issue being solved is unclear" |
| constraints_reviewed | constraint, rule, policy, reviewed, checked | "Relevant constraints have not been reviewed — what MUST-rules apply here?" |
| decisions_locked | decided, locked, chosen, selected, committed | "Key decisions are not locked — which options have been closed?" |
| dod_defined | definition of done, dod, done when, acceptance criteria | "Definition of done is unclear — what does the finished artifact look like?" |
| irreversibility_assessed | irreversible, can't undo, one-way, point of no return | "Irreversibility not assessed — which aspects cannot be undone after execution?" |
| constraints_satisfied | constraints met, constraints satisfied, constraints addressed | "Constraints not confirmed satisfied — are all MUST-rules addressable?" |
| dod_met | done, complete, finished, all criteria | "DoD not met — the completion claim is missing evidence against the criteria" |
| artifacts_present | screenshot, test, log, artifact, evidence, proof | "Required artifacts not present — what observable proof exists?" |

---

## Notes

Check terms in the table are comma-separated, case-insensitive, and parsed at canon-fetch time. The server tokenizes each term with the Porter-style stemmer and collects the result per prereq into a stemmed-token set. At gate time the user input is tokenized the same way and set-intersected against each prereq's token set. If the intersection is non-empty, the prereq passes; if it is empty, the gap message is surfaced.

Stemming consequence is significant and intentional. `problems identified` satisfies `problem_defined` because `problems` stems to `problem`. `constraints addressed` satisfies `constraints_satisfied` because `addressed` stems to `address` — matching the canonical `addressed` entry in the check column. `deployed it` satisfies `dod_met` via `deploy` → stems that match the check vocabulary of done-adjacent completion terms. The shift from word-boundary regex to stemmed matching is the session's functional improvement and applies to every prereq row. Canon revisions can tighten or broaden the check vocabulary at any time without requiring a code release.

Set intersection is used rather than BM25 here because prereq evaluation is not a ranking problem. Each prereq independently returns gap-or-not; there is no winner to pick across prereqs. BM25 would compute per-prereq scores only to threshold at zero and discard the ranking — wasted work, and on a small 8-prereq corpus with any shared vocabulary across rows, BM25's IDF term can flip negative and produce zero-scores on valid matches. Set intersection returns the semantically correct "any stem in common = prereq applies" with no scoring pass. The matcher choice reflects fit to the problem shape rather than symmetry with transition detection, which does need ranking.

Some check columns contain multi-word phrases (e.g., `definition of done`, `can't undo`, `one-way`, `point of no return`). The server tokenizes these at parse time the same way it tokenizes the user input: split on whitespace and word-separators, stem each token, drop short tokens and stop words. The resulting stemmed tokens are added to the prereq's set just like single-word entries. A user input containing `definition of done` contributes the same stemmed tokens as the canon entry and matches; a user input containing only `dod` matches via the `dod` token directly (acronyms pass through the stemmer unchanged when under the minimum-length threshold).

The check vocabularies in this file are deliberately broad rather than narrow, because prereq evaluation is meant to catch a reasonable signal that the prerequisite has been addressed, not to demand specific phrasing. A narrower vocabulary would produce false-negative gaps — the operator has addressed the constraint but did not happen to use the exact word canon expects. Broader vocabulary produces occasional false-positive passes — an input mentioning `problem` in passing satisfies `problem_defined` whether or not the problem was actually articulated — but that failure mode is preferable to false-negative gaps because the operator remains responsible for the transition regardless of what the gate reports. Gate is a discipline support, not a correctness enforcer.

When the server cannot reach this file at runtime, `oddkit_gate` falls back to a hardcoded minimal vocabulary that mirrors the check terms above. The minimal tier is identified in the response envelope via `governance_source: "minimal"`; the canon tier via `governance_source: "knowledge_base"`. Both tiers use the same set-intersection matcher; they differ only in whether the vocabulary is editable by updating this file or locked to the deployed worker version.
