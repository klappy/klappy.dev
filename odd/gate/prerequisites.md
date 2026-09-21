---
uri: klappy://odd/gate/prerequisites
kind: canon
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
target_repo: "outcomes-driven-development"
---

# Gate Prerequisites — Prerequisite IDs, Check Vocabularies, and Gap Messages

> Every transition in `odd/gate/transitions.md` references its prerequisites by id. This file is where those ids are defined. Each row names one prerequisite, gives a human-readable description, lists the check vocabulary that indicates the prerequisite is satisfied in the user input, and supplies the gap message surfaced when it is not. Prereq matching is by stemmed set intersection, not BM25: each prereq is evaluated independently — pass if any stemmed input token matches any stemmed check term, fail otherwise. Independence means there is no ranking pass and no IDF correction; the simpler matcher is fit-to-problem because each prereq returns gap-or-not in isolation.

---

## Summary — Fourteen Prerequisites, Referenced by ID from Transitions

Fourteen prerequisite ids are defined here. They are grouped roughly by what transition they tend to gate, though the same id can be referenced by multiple transitions if future canon adds such references. `problem_defined`, `constraints_reviewed`, `world_prior_cited`, `house_install_cited`, and `house_canon_cited` gate opening planning after exploration. The last three are independent presence-proofs — kitchen CHECKLIST 10 (observed world reference), CHECKLIST 11 (installation inspected), and a house-canon cite — because stemmed set intersection is per-id OR of stems; one id cannot enforce three-band AND, and a Worker AND would be Flavored Vodka. Official nulls count (`no world analogue` / `literature only` / `bide waiting`, `no house install`, `no house canon`). `decisions_locked`, `dod_defined`, `irreversibility_assessed`, and `constraints_satisfied` gate opening execution after planning. `dod_met` and `artifacts_present` gate declaring completion. `delegation_attempted` and `human_only_class_named` gate the `dispatch-to-captain-handoff` transition — the offload trip-wire of `klappy://canon/constraints/dispatcher-dispatches-never-executes`: no ask that assigns the captain operational work passes unless delegation to a subagent was attempted and a human-only class is named. `open_fork_cited` gates the `settled-direction-ratification` transition — the let-the-gates-govern clause of the same constraint: no approval-shaped escalation passes unless it affirmatively names the genuinely-open fork the gates cannot resolve. The prereq is deliberately framed as proof-of-openness rather than absence-of-settledness, because presence-based set-intersection matching can verify that an open fork was named but cannot verify that a settled decision was not — the burden sits on the escalation to cite what is open, and an ask ratifying an already-recorded decision has nothing to cite. Check vocabularies are deliberately broad word lists that cover the most common ways an operator signals the prerequisite in natural language. Gap messages name the missing prerequisite in a single sentence phrased to point the operator at what to surface next.

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
| delegation_attempted | delegated, dispatched, subagent, flight, spawned, routed, crew | "No delegation attempt named — operational work (launch/commit/push/run/deploy) goes to a subagent/flight, which holds full rights by intent; a 'blocked' subagent is a misconfigured hook to fix, never a reason to route the task to the captain" |
| human_only_class_named | human-only, secret, credential, authorial, voice, irreversible, approval, spend, ruling | "No human-only class named — only HUMAN-ONLY(secret / voice / irreversible / approval) asks may go to the captain; anything else is a dispatch wearing a question's clothes" |
| open_fork_cited | open fork, open question, genuinely open, undecided, unresolved, unsettled, options, fork, cannot resolve | "No open fork cited — this is settled: let the gates govern, proceed. The gates are the approval; escalate only a genuinely-open fork the gates cannot resolve, and name it: OPEN-FORK(the fork), with the open options stated" |
| world_prior_cited | analogue, analog, analogous, analogy, literature, bide | "world_prior_cited: World analogue not cited — name an observed world analogue, or official null (no world analogue / literature only / bide waiting)" |
| house_install_cited | install, installation | "house_install_cited: House install not cited — name the installation repo/path inspected (CHECKLIST 11), or the official null (no house install)" |
| house_canon_cited | canon | "house_canon_cited: House canon not cited — write the word canon with the klappy:// URI you read (canon: klappy://...), or the official null (no house canon); a repo slug or stack folklore (CF, vodka) is not a cite" |

---

## Notes

Check terms in the table are comma-separated, case-insensitive, and parsed at canon-fetch time. The server tokenizes each term with the Porter-style stemmer and collects the result per prereq into a stemmed-token set. At gate time the user input is tokenized the same way and set-intersected against each prereq's token set. If the intersection is non-empty, the prereq passes; if it is empty, the gap message is surfaced.

Stemming consequence is significant and intentional. `problems identified` satisfies `problem_defined` because `problems` stems to `problem`. `constraints addressed` satisfies `constraints_satisfied` because `addressed` stems to `address` — matching the canonical `addressed` entry in the check column. `deployed it` satisfies `dod_met` via `deploy` → stems that match the check vocabulary of done-adjacent completion terms. The shift from word-boundary regex to stemmed matching is the session's functional improvement and applies to every prereq row. Canon revisions can tighten or broaden the check vocabulary at any time without requiring a code release.

Set intersection is used rather than BM25 here because prereq evaluation is not a ranking problem. Each prereq independently returns gap-or-not; there is no winner to pick across prereqs. BM25 would compute per-prereq scores only to threshold at zero and discard the ranking — wasted work, and on a small prereq corpus with any shared vocabulary across rows, BM25's IDF term can flip negative and produce zero-scores on valid matches. Set intersection returns the semantically correct "any stem in common = prereq applies" with no scoring pass. The matcher choice reflects fit to the problem shape rather than symmetry with transition detection, which does need ranking.

Some check columns contain multi-word phrases (e.g., `definition of done`, `can't undo`, `one-way`, `point of no return`). The server tokenizes these at parse time the same way it tokenizes the user input: split on whitespace and word-separators, stem each token, drop short tokens and stop words. The resulting stemmed tokens are added to the prereq's set just like single-word entries. A user input containing `definition of done` contributes the same stemmed tokens as the canon entry and matches; a user input containing only `dod` matches via the `dod` token directly (acronyms pass through the stemmer unchanged when under the minimum-length threshold).

The check vocabularies in this file are deliberately broad rather than narrow, because prereq evaluation is meant to catch a reasonable signal that the prerequisite has been addressed, not to demand specific phrasing. A narrower vocabulary would produce false-negative gaps — the operator has addressed the constraint but did not happen to use the exact word canon expects. Broader vocabulary produces occasional false-positive passes — an input mentioning `problem` in passing satisfies `problem_defined` whether or not the problem was actually articulated — but that failure mode is preferable to false-negative gaps because the operator remains responsible for the transition regardless of what the gate reports. Gate is a discipline support, not a correctness enforcer.

When the server cannot reach this file at runtime, `oddkit_gate` falls back to a hardcoded minimal vocabulary that mirrors the check terms above. The minimal tier is identified in the response envelope via `governance_source: "minimal"`; the canon tier via `governance_source: "knowledge_base"`. Both tiers use the same set-intersection matcher; they differ only in whether the vocabulary is editable by updating this file or locked to the deployed worker version.

The three exploration-to-planning presence ids (2026-09-21, kitchen ticket `2026-09-20-gate-explore-plan-prior-art`) omit shared tokens such as `house` and `cited` from their check columns so hyphen-split cannot leak a band: `no-house-install` in a check column would add `house`, and then `no house canon` would false-pass `house_install_cited`; `canon-cited` would add `cited`, and then ordinary cite language for the other two bands (`world prior cited`, `house install cited`) would false-pass `house_canon_cited`. Official nulls work from the input side (`no world analogue` contributes `analogue`). Do not put `prior-art` or `world-prior` in the check column: hyphen-split adds `prior`, and a problem statement that says prior art false-passes the band. No hyphenated entry belongs in any of these three check columns: `repo-path` and `inspected-repo` were removed from `house_install_cited` because hyphen-split added `repo`, `path`, and `inspect`, and `the path forward` false-passed the band. `klappy` was removed from `house_canon_cited` because every house repo slug (`klappy/oddkit`, `klappy.dev`) contains it, so an honest install cite paid the canon band too and the bands stopped being independent; the word `canon` is the only key, and the gap message says so. These three ids exist only in the canon tier: the Worker's minimal fallback still carries the original pair for this transition, so a run reporting `governance_source: "minimal"` can pass 2/2 — read the source field before trusting a PASS. Presence is not proof a tool ran, and negation passes (`did not read canon` contains `canon`); a dummy `klappy://` paste is the new cowboy — spawned audit, not this matcher.
