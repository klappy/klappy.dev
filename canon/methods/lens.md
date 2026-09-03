---
uri: klappy://canon/methods/lens
title: "The Lens — A Prompt With an Owner, a Seat, and a Receipt"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
status: draft
tags: ["canon", "methods", "planning", "lens", "receipt", "stakeholder", "persona", "kirigami", "metaphor-agnostic"]
epoch: E0010
date: 2026-09-03
derives_from: "canon/methods/driver-seat-lens.md, canon/methods/revision-lens-sequence.md, canon/values/trust-kernel.md"
complements: "canon/constraints/canon-is-metaphor-agnostic.md, canon/constraints/reviewability-standard.md"
governs: "Any governed body of work: a plan of substantive size is read through every lens its work unit's class names, each lens leaves finding rows, and no lens speaks for its owner until the owner has acked the rows"
target_repo: "outcomes-driven-development"
---

# The Lens — A Prompt With an Owner, a Seat, and a Receipt

> A lens is a prompt with an owner, a seat, a phase, declared inputs, a
> boundary, and a receipt. A planning seat looks through it at a plan and
> leaves finding rows. The driver's seat (`klappy://canon/methods/driver-seat-lens`)
> is the first lens; this method is the class it belongs to. A project has
> many people with less time than its plans need; a lens is how each of them
> is present in every plan without attending anything. Operator, 2026-09-03:
> "every team member on a project may contribute their lenses. This helps
> honor their limited time and attention."

---

## WHAT — The Rule, Precisely

**A lens has seven parts, or it is a vibe.**

1. **Owner** — who answers for the words. A stakeholder lens is a real
   person's, in their voice; a persona lens is a synthetic seat (end user,
   purchaser, funder) owned by whoever vouches for it and grounded in
   observed sources, or it is fiction; a portable lens is owned by the house
   and imported by URI.
2. **Seat** — where the lens sits when it looks: cockpit (driver) or cabin
   (consumer), and which chair in the cabin.
3. **Phase** — *shaping* lenses edit the plan's documents; *evaluating*
   lenses read them and only write rows. Shaping runs first, evaluating
   second, adversarial challenge third.
4. **Inputs** — the artifacts the lens declares it needs in context. A lens
   with no declared inputs costs the whole corpus every run.
5. **Boundary** — what the lens does not judge.
6. **Prompt** — the owner's words, run verbatim.
7. **Receipt** — finding rows, one per finding: accept, reject (kept, not
   deleted), defer, or tension. Rows stay in the seat's custody until the
   owner has read them; a seat running a person's lens is not that person.

**Vocabulary.** This method names a *lens*, an *owner*, a *planning seat*, a
*work unit*, and a *receipt*. Every operating metaphor supplies its own words
for the rest (`klappy://canon/constraints/canon-is-metaphor-agnostic`).

**Two lenses, one word.** Kirigami's `cut` verb is driven by a "lens": a
classifier that decides, per segment of raw material, what to keep, what to
compress, and what to discard, and assigns each row a verdict and a tier
(`kirigami://docs/usage/floor-and-verbs`). A house lens is a kirigami lens
whose raw material is a plan and whose rows are findings. Same word, same
role — reduce a source to load-bearing rows under a declared point of view —
one altitude apart. The house did not coin a second meaning; it found the
first one already in use and sat down in it. `revision-lens-sequence` uses the
word the same way for a single-concern read; this method adds the owner and
the receipt.

---

## WHY — Rationale and the Motivating Failure

The driver's-seat lens proved in one day (2026-09-02/03) that one prompt run
by a planning seat with a receipt changed a plan more than a meeting would
have. It is one seat's questions. The people whose questions matter most —
the product owner, the engineer, the validator, the field lead, the funder —
were not in that seat and cannot sit in every plan. Meetings spend their
attention; a lens spends a seat's. Two independent planning seats fed the
same thread on 2026-09-03 cut the same frame four hours apart (seventeen
findings, one naming difference), which is the reproducibility a lens
promises, demonstrated on its own design before it existed.

---

## ENFORCEMENT — The Named Enforcer, Honestly Graded

The adopting system keeps an index of its lenses (which lens runs on which
class of work unit at which gate), a presence gate before execution that
reads whether the receipt exists and matches the index, and a rule that
drops a silent lens to advisory: no finding in three consecutive runs, or an
owner who has not re-read their own body in ninety days. A presence gate is a
tripwire, not an enforcer (L3/L4 on the ladder): it reads that rows exist,
not that a seat looked. The receipt's shape is the interim obligation — a run
with no accepted, rejected, deferred, or tensioned row, and no explicit
nothing-found row, is malformed on its face.

---

## SCOPE — The Governed Surface

- **Runs on:** every work unit above the trivial, on the lenses its class
  names. Class picks the set; cost stays proportional by rule, not mood.
- **Exempt:** the adopter's two smallest classes, written in the work unit.
- **Lenses live with the work.** A project owns its lens registry. The only
  cross-project layer is portable lenses, imported by URI, for people or
  seats present on every project. A house-wide library of lenses with no
  live owner on a live project was considered and rejected: dead lenses
  teach seats to skim receipts.
- **Confidence.** Working belief, two cases (door43-mcp v2 planning; the
  lens frame's own design). Retract or narrow if two consecutive scoped
  units carry receipts that change nothing the challenge would also have
  caught — the same falsifier the driver's-seat lens carries.

---

## VERIFICATION — How Compliance Is Proven

- A seat can open a project's lens index and, from one read, know which
  lens files to load for its class and gate.
- A reader can open any receipt and find, per row: which lens, which
  verdict, whose custody.
- The owner of a stakeholder lens can find every question in their own
  words and every row still in the seat's custody until they ack it.
- A reader can `oddkit_resolve` a portable lens's URI from a project index
  and observe the body.

## Failure Modes — What Breaks When the Frame Owns the Bodies

- **Ventriloquism:** a seat's rows are read as the owner's opinion.
- **Template writes the questions:** the frame ships a body and every
  project's lenses ask the same things.
- **Dead lens:** a lens no one reads keeps running and its rows are skimmed.
- **Two meanings of one word:** the house lens and the kirigami lens drift
  apart and a seat cannot tell which is meant.

## Required Response When Detected

- **Ventriloquism** → custody stays `run`; the receipt is labelled a
  proposal in the owner's shape until acked.
- **Template body** → move it to an exemplar block; the frame keeps fields.
- **Dead lens** → advisory by rule; the owner is told; the rows stop
  blocking bind.
- **Drift** → the paragraph above is the bind; either the house or the tool
  changes its word, never both keep it with different meanings.

## See Also

- [The Driver's-Seat Lens](/canon/methods/driver-seat-lens.md) — the first
  lens; its prompt is the operator's and the author's, unedited
- [Revision Lens Sequence](/canon/methods/revision-lens-sequence.md) — one
  pass, one lens, one complete read
- [Canon Is Metaphor-Agnostic](/canon/constraints/canon-is-metaphor-agnostic.md)
  — why the adopter's words stay out of WHAT and SCOPE
