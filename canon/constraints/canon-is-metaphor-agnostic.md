---
uri: klappy://canon/constraints/canon-is-metaphor-agnostic
title: "Canon Is Metaphor-Agnostic — The School Binds in Neutral Terms and Illustrates in Any Metaphor"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
status: draft
tags: ["canon", "constraints", "metaphor", "vocabulary", "inheritance", "portability", "example-applications", "scope-chain"]
epoch: E0010
date: 2026-09-03
derives_from: "odd/contract.md, canon/values/trust-kernel.md, canon/principles/dry-canon-says-it-once.md"
complements: "canon/methods/driver-seat-lens.md, canon/constraints/infra-config-is-seat-work.md, canon/bootstrap/generic-boarding-pass.md"
governs: "Every document under canon/ on klappy.dev: which sections may carry an operating metaphor's vocabulary and which must bind in neutral terms, so that any operating metaphor — current, retired, or not yet invented — can inherit the school without rewriting it"
target_repo: "outcomes-driven-development"
---

# Canon Is Metaphor-Agnostic — The School Binds in Neutral Terms and Illustrates in Any Metaphor

> The school teaches every kitchen, every airline, and whatever comes after
> them. So the school's binding text names roles, work, and artifacts in
> terms that belong to no one metaphor — operator, seat, work unit, plan,
> receipt, lane, gate — and an operating metaphor's own words appear only in
> a section marked as illustration. Operator ruling, 2026-09-03, verbatim:
> "Klappy.dev should be agnostic to metaphors that evolve. Not ARS not
> kitchen. But compatible with both and future metaphors. Example
> applications can be stated." The rule is a scope-chain rule: authority
> flows down from the school into each adopter; vocabulary must not flow
> back up.

---

## WHAT — The Rule, Precisely

**Binding sections bind in neutral terms.** In any document under `canon/`,
the sections that carry the rule — WHAT, SCOPE, ENFORCEMENT, VERIFICATION,
and any Failure Modes / Required Response that name the rule's own
conditions — use metaphor-neutral vocabulary:

| Neutral term | Means |
|---|---|
| **operator** | the human whose judgment the system serves |
| **seat** | a role a human or model occupies for a session |
| **work unit** | the thing being planned, done, and reviewed |
| **plan** / **design set** | the documents a work unit is built from |
| **receipt** | the file that proves a step ran |
| **lane** | a position in a work unit's lifecycle |
| **gate** | a check a work unit must pass to move lanes |
| **adopter** | a body of work that inherits canon — a kitchen, an airline, a project |

Terms already used by more than one adopter — *captain*, *crew*, *seat*,
*board* (as verb) — are house terms, not metaphor terms; they pass.

**Metaphor vocabulary lives under one heading.** An adopter's own words —
the kitchen's *ticket, dish, entrée, plate, cook, pass, rail*; the
airline's *flight, brief, dispatch, tower, preflight* — appear only under a
heading titled **Example Applications** (or a table so labelled), and there
they are welcome: one row per metaphor, mapping each neutral term to the
adopter's word. A metaphor not yet invented adds a row; the binding text does
not change.

**The test.** Cover the Example Applications section. If the document still
tells a reader from a metaphor you have never heard of exactly what to do, it
passes. If a sentence in a binding section only makes sense to someone who
knows what a "pass" or a "flight" is, that sentence is captured.

---

## WHY — Rationale and the Motivating Failure

The school has already outlived one metaphor. The operating frame moved from
an airline (ARS v1) to a kitchen on 2026-08-08, and the school's job across
that move was to stay put: rulings, principles, and methods that held under
the first frame had to hold under the second without a rewrite. That only
works if the school's binding text never depended on the frame.

The instance that ordered this rule: on 2026-09-03 a new method
(`canon/methods/driver-seat-lens`) was first cut with the kitchen's
vocabulary in its binding sections — meals, entrées, catering plates,
tickets — and had to be recut by hand after the operator read it. The recut
found the shape this constraint now names: three neutral terms in the body,
a table of adopters underneath. The next author, without a rule, repeats the
first cut.

The strongest case against this rule is that vivid vocabulary teaches better
than neutral vocabulary, and that is true. It is why the adopters keep their
words and why Example Applications exists. The school is not asked to be
dull; it is asked to put the vividness where it can be swapped.

---

## ENFORCEMENT — The Named Enforcer, Honestly Graded

- **Review gate (agent, L2/L3).** The canon review that already runs on every
  klappy.dev PR (reference-integrity audit, frontmatter validation) gains one
  question: *do the binding sections read without the Example Applications
  section?* An agent reviewer can answer that; a word list cannot judge a
  novel metaphor.
- **Word-list tripwire (L3, honestly labelled).** A grep over the binding
  sections for the known adopters' vocabulary (the kitchen and airline lists
  above) flags a document for rewrite. A word in quotes or italics is a mention,
  not a use, and does not trip it — this document mentions *plate* and
  "flight" in its own binding text to say what the rule excludes. It catches
  the two metaphors we have;
  it will not catch the third until the third's words are added — which is
  the row the third adopter contributes.
- **What this does not enforce.** Neither mechanism reads meaning. A neutral
  term used emptily passes both. The Failure Modes below name that case and
  its response; the operator's read at ratification remains the judge of
  whether the neutral text still says something.

---

## SCOPE — The Governed Surface

- **Binds:** every document created or materially amended under `canon/` on
  klappy.dev from this ruling forward.
- **Existing documents migrate on touch.** As of 2026-09-03, 61 documents
  under `canon/` carry airline vocabulary and 12 carry kitchen vocabulary
  (counted by grep, same lists as above). They are not swept; each is
  brought under this rule the next time it is materially amended. A bulk
  sweep is a separate operator ruling, not implied here.
- **Exempt, and encouraged to be vivid:** every adopter's own repository —
  kitchens, airlines, brigades, projects. The kitchen's rulings say *ticket*
  and *plate* because those are the kitchen's words. This rule reaches none
  of them.
- **Exempt within canon:** essays, apocrypha, case studies, and the
  operator's own voice, which no seat edits. Bootstrap texts written *as* a
  frame (the airline-framed boarding passes) keep their frame and are read
  as illustration; a metaphor-neutral boarding text is a separate work unit
  if the operator orders one.

---

## Example Applications — The Same Neutral Terms Under Different Metaphors

Illustration, not binding. A future metaphor adds a column.

| Neutral term | Kitchen (`klappy/kitchen`) | Airline (ARS v1, retired) |
|---|---|---|
| work unit | ticket / dish | flight / brief |
| plan, design set | TICKET.md + PLAN.md + SPEC | flight plan + brief |
| receipt | CHECKLIST-RUN.md, FIRE-CHECK-RUN.md, DELTA.md, DEBRIEF.md | preflight log, landing report |
| lane | `1-ordered` → `4-plated` | filed → airborne → landed |
| gate | CHECKLIST gate, FIRE-CHECK gate, the pass | preflight item, dispatch release |
| seat | expeditor, CoS, cook, Otto, Auggie | dispatcher, first officer |
| adopter | the kitchen | the airline |

---

## VERIFICATION — How Compliance Is Proven

- A seat drafting any `canon/**` document can `oddkit_get
  klappy://canon/constraints/canon-is-metaphor-agnostic` and observe which
  sections may carry metaphor vocabulary and which may not.
- A reviewer can cover a document's Example Applications section and observe
  that its binding sections still instruct a reader from an unknown metaphor.
- A reader can grep a document's binding sections for the kitchen and airline
  word lists in WHAT and observe zero hits — first against
  `canon/methods/driver-seat-lens` as merged, then against this document.
- A kitchen author can read SCOPE and observe that the kitchen is exempt.
- **Retraction condition.** If a neutral term cannot be grounded in at least
  two adopters' rows, the term is wrong, not the rule — replace the term. If,
  across three consecutive canon documents, the rule produces binding text
  the operator reads as neutral-but-empty, the rule is costing meaning and is
  superseded, not deleted.

---

## Failure Modes — What Breaks When the School Speaks One Adopter's Language

- **Metaphor capture.** An adopter's words land in a binding section; the
  next adopter cannot inherit the sentence.
- **Over-scrub.** The rule is read backwards and an adopter is told to write
  neutrally too, killing the vivid local layer that teaches.
- **Neutral-but-empty.** "Work unit" replaces "ticket" and the sentence stops
  meaning anything; an abstraction stands where a name belongs.
- **Silent sweep.** A seat rewrites the 73 existing documents in one pass
  because the rule exists, with no operator ruling and no reader for the
  diff.

## Required Response When Detected

- **Capture** → move the words to Example Applications; the binding section
  keeps neutral terms; the table gains a row for that metaphor.
- **Over-scrub** → cite SCOPE; revert the adopter-side edit; the school is
  neutral, the adopter is not.
- **Neutral-but-empty** → add an Example Applications row that grounds the
  term in at least two metaphors; if it cannot be grounded twice, replace the
  term.
- **Silent sweep** → stop; migrate-on-touch is the rule; a sweep is its own
  work unit with the operator's ruling in its header.

## See Also

- [ODD System Contract](/odd/contract.md) — structure-agnostic; this
  constraint is its vocabulary twin
- [The Driver's-Seat Lens](/canon/methods/driver-seat-lens.md) — the
  document whose first cut ordered this rule; its Example Applications table
  is the reference shape
- [Infra Config Is Seat Work](/canon/constraints/infra-config-is-seat-work.md)
  — sibling L1 from the same night, same recurring-miss class
- [Generic Boarding Pass](/canon/bootstrap/generic-boarding-pass.md) — the
  airline-framed bootstrap, read as illustration under SCOPE
