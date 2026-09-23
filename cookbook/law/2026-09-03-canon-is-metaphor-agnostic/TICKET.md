# TICKET — canon-is-metaphor-agnostic

**What this is:** One L1 constraint on `klappy/klappy.dev` saying the school's
canon is written in metaphor-neutral terms — not ARS, not kitchen — compatible
with both and with metaphors not yet invented, with example applications
allowed as illustration, never as binding.
**Why now:** Captain, 2026-09-03 ~00:28 ET, on reading #317's first cut (which
carried meals, entrées, and tickets into a klappy.dev method): "Klappy.dev
should be agnostic to metaphors that evolve. Not ARS not kitchen. But
compatible with both and future metaphors. Example applications can be
stated." #317 was recut by hand; without a rule, the next L1 doc repeats it.
**Your move:** Read the exact text of the constraint when the draft PR opens
(your ruling is quoted verbatim inside it — HUMAN-ONLY voice); rule ready or
season.

Class: petit four. Risk: ALLERGY (L1 law; captain's ruling quoted verbatim).
Lands DRAFT; VERDICT = captain's read.
Station: subagent (CoS). Owner: CoS. Promise: 1 h (R6). Depends: none.
driver-seat: exempt (petit four)

Ingredients:
- The ruling, captain's words, 2026-09-03 (verbatim, do not edit):
  > Klappy.dev should be agnostic to metaphors that evolve. Not ARS not
  > kitchen. But compatible with both and future metaphors. Example
  > applications can be stated.
- The instance (gate 10): `klappy/klappy.dev` PR #317, commits `3f445bd`→`374018f`
  — first cut bound to kitchen vocabulary; recut moved kitchen/ARS rows into
  an "Example Applications" table and left three neutral terms in the body.
  Divergence to name: that recut was a hand fix with no rule behind it.
- House prior art (gate 11, searched 2026-09-03 04:32Z): `klappy://odd/contract`
  ("ODD is structure-agnostic portable epistemic infrastructure — it works in
  any repo where canon is addressable") — agnostic to *structure*, silent on
  *vocabulary*; this constraint is its vocabulary twin. Kitchen R15 (scope
  chain: school → brigade → kitchen → project; the kitchen "inherits the
  school; it never copies it") — the downward direction is law; the upward
  direction (metaphor never flows up into the school) is what is missing.
  Nothing else found.
- Anatomy shape: `klappy://canon/meta/enforceable-policy-anatomy` is
  NOT_FOUND on main (draft klappy.dev#289); use the ratified shape observed in
  `klappy://canon/constraints/legibility-standard` (WHAT / WHY / ENFORCEMENT /
  SCOPE / VERIFICATION, Failure Modes + Required Response).

Declared product:
1. `klappy/klappy.dev` `canon/constraints/canon-is-metaphor-agnostic.md`
   (DRAFT PR): WHAT — canon documents under `canon/` name roles, work, and
   artifacts in neutral terms (operator, seat, work unit, plan, receipt,
   lane, gate); an operating metaphor's vocabulary appears only under a
   heading titled "Example Applications" or in a table so labelled, and
   never in WHAT, SCOPE, ENFORCEMENT, or VERIFICATION. WHY — the #317
   instance and the ruling verbatim; R15's one-way inheritance. ENFORCEMENT
   — the reference-integrity audit / spawned-agent review gate reads for
   metaphor words outside the example section (honest L3; a word list is a
   tripwire, not an enforcer). SCOPE — `canon/**` on klappy.dev; kitchens,
   brigades, and projects are explicitly exempt and encouraged to be vivid.
   VERIFICATION — a reader can grep an L1 doc's binding sections for the
   adopter word list and find nothing; retraction condition named.
2. One line in `canon/constraints/README.md` (the constraints index) pointing
   at it, if the index is hand-maintained (observe first; if generated, skip
   and say so in the DEBRIEF).
3. `rail/1-ordered/2026-09-03-canon-is-metaphor-agnostic/CHECKLIST-RUN.md`
   (this order's own pass, filed at cut).

Done-means:
- A seat drafting any `canon/**` document can `oddkit_get
  klappy://canon/constraints/canon-is-metaphor-agnostic` and observe which
  sections may carry metaphor vocabulary and which may not.
- A reviewer can open the draft PR and observe the captain's ruling quoted
  verbatim, unedited.
- A reader can run the doc's own VERIFICATION grep against #317 at `374018f`
  and observe zero hits outside Example Applications.
- A reader can run the same grep against the doc itself and observe zero
  hits outside its own Example Applications.
- A kitchen author can read SCOPE and observe that kitchen files are exempt.

## Failure Modes — What Breaks When the School Speaks One Kitchen's Language
- Metaphor capture: an adopter's words land in a binding section of an L1 doc.
- Over-scrub: the exemption is read backwards and kitchens are told to write
  neutrally too, killing the vivid local layer.
- Neutral-but-empty: "work unit" replaces "ticket" and the sentence stops
  meaning anything; abstraction standing where a name belongs (HYGIENE 14).

## Required Response When Detected
- Capture → move the words to Example Applications; binding sections keep
  neutral terms; the example table gains a row for that metaphor.
- Over-scrub → cite SCOPE; revert the kitchen edit; the school is neutral,
  the kitchen is not.
- Neutral-but-empty → add an Example Applications row that grounds the
  neutral term in at least two metaphors; if it cannot be grounded twice, the
  term is wrong, not the rule.
