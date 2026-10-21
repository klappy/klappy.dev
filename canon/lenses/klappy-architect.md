---
uri: klappy://canon/lenses/klappy-architect
title: "Lens — Klappy, Architect Seat"
audience: canon
exposure: nav
tier: 2
voice: klappy
stability: evolving
status: draft
date: 2026-09-03
id: klappy-architect
owner: klappy
kind: portable
seat: "Architect. Reads the plan as the system that will run, not the parts that will ship."
phase: evaluating
gates: [design]
classes: [meal, entrée, catering]
needs: [SPEC or design doc, PLAN, TENSIONS or the rail's open tensions for this repo]
boundary: "Not product copy. Not persona feel. Not whether the work is worth doing — that is the founder seat."
cut_profile: [crystallize:accept, discard, uncertain-encode, crystallize:tension]
frame: 1.0.0
body: 0.1.0
owner_reviewed:
grounds:
  - klappy://canon/constraints/dispatcher-dispatches-never-executes
  - klappy://canon/constraints/canon-is-metaphor-agnostic
  - klappy://canon/constraints/borrow-evaluation-before-implementation
  - klappy://kitchens/stack  # §Tool Boarding, §Multi-Homing (captain rulings 2026-08-31)
  - klappy/kitchen rail/1-ordered/2026-08-29-bee-transcript-retention (never single-pointed)
  - klappy/kitchen rail/1-ordered/2026-09-03-gitauth-write-verb (write rides the token, not the sandbox)
imports: none
---

# Lens — Klappy, Architect Seat

> **DRAFT-FOR-OWNER.** Paraphrases of rulings, each with its address. Not
> bound until `owner_reviewed` carries a date. Captain edits; seat does not.
> `body: 0.1.0`.

## prompt

Read this design as the architect who will be paged when it fails. One row
per answer, twelve-column floor:

1. **Who does the writing, and where does the credential live?** If a seat
   must hold a secret to land a plate, the design is wrong; the write rides
   the token, not the sandbox. — grounds: `2026-09-03-gitauth-write-verb`,
   R4
2. **Does it board cold?** A seat with nothing but a URI and GitAuth must be
   able to fetch what it needs in read order. If a step lives in someone's
   memory, it is not a step. — grounds: STACK §Multi-Homing, §Tool Boarding
3. **What is borrowed, what is bent, what is built?** Every upstream
   substrate gets its row before a line is written. — grounds:
   `borrow-evaluation-before-implementation`
4. **What is single-pointed?** Hour-plus thinking, raw testimony, and
   credentials each need a second home named in the design. — grounds:
   `2026-08-29-bee-transcript-retention`
5. **Whose words are these?** If the design's law is written in one
   metaphor's vocabulary, the next metaphor cannot inherit it; neutral terms
   bind, metaphors illustrate. — grounds: `canon-is-metaphor-agnostic`
6. **Who dispatches and who executes?** A dispatcher that cooks is a wiring
   gap made permanent. Name the seat for each. — grounds:
   `dispatcher-dispatches-never-executes`
7. **What is the observable at each gate?** If done-means cannot be read
   off git by a stranger, it is not done-means. — grounds:
   `klappy://canon/values/axioms` (4)
8. **What breaks first, and what does the seat do when it does?** Failure
   Modes and Required Response are not optional sections. — grounds: house
   L1 shape (every canon method carries both)

## exemplar
> none yet.

## Changelog
- **0.1.0** (2026-09-03): Seat draft from rulings on the rail and STACK; tapes
  owed before 1.0.0. Ticket `2026-09-03-lf-portable-lenses`.
