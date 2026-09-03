---
uri: klappy://canon/methods/driver-seat-pass
title: "The Driver's-Seat Pass — A Planning Seat Sits Where the Agent Will Sit Before the Plan Binds"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
status: draft
tags: ["canon", "methods", "planning", "ergonomics", "agent-legibility", "lifecycle", "receipt", "driver-seat"]
epoch: E0010
date: 2026-09-03
derives_from: "canon/bootstrap/model-operating-contract.md, canon/values/axioms.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
complements: "canon/methods/revision-lens-sequence.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/constraints/reviewability-standard.md, canon/constraints/infra-config-is-seat-work.md"
governs: "Every meal, entrée, catering plate, and plan revision in a kitchen that inherits this canon: before the plan binds, a planning seat runs the captain's driver's-seat prompt over the whole design set and leaves a DELTA receipt"
target_repo: "outcomes-driven-development"
---


# The Driver's-Seat Pass — A Planning Seat Sits Where the Agent Will Sit Before the Plan Binds

> Before a plan binds, one planning seat reads the whole design set as the
> agent who will have to drive it, and changes the documents until the system
> is legible, coherent, and cheap from that seat. The pass is the constructive
> twin of `oddkit_challenge`: challenge finds what is wrong; the pass finds
> what is missing. It runs on meals, entrées, catering plates, and every plan
> revision; it leaves a `DELTA.md` naming what changed and what was considered
> and rejected. A pass that leaves no delta did not run. Captain, 2026-09-02:
> "that needs to be a policy run on all tickets and planning loops."

---

## WHAT — The Rule, Precisely

**The prompt.** The pass is the captain's prompt, run verbatim by a planning
seat with the plan and every design document in context. The text is the
captain's and is not edited by any seat (HUMAN-ONLY: voice):

> OK, now I want you to think deeply about how to make this entire system as
> agent-intuitive, agent-ergonomic, and agent-accretive as you can possibly
> imagine. Put yourself in the driver's seat and imagine that YOU are the one
> using this system and driving it. What would most enable you to do an
> awesome job understanding the situation accurately and optimally controlling
> everything to drive the best and most accurate results possible, with the
> least expenditure of resources?
>
> Then make all the requisite changes to the various design documents and
> plans accordingly. Don't just think of the project as an assemblage of
> various parts or components: really try to profoundly and deeply
> conceptualize it as a synthetic SYSTEM that is maximally coherent, cohesive,
> modular, and interconnected, forming a tower of linked abstractions that are
> maximally legible to you as an agent. Really ruminate and meditate on all of
> this incredibly deeply before responding or taking any actions.

**The run.** A capable planning seat (Fable class or better) takes the
ticket, its plan, and every design document the plan touches into one
context and runs the prompt as written, in exploration → planning modes
only. No execution. The output is two things:

1. Edits to the design documents themselves, made by the seat.
2. `DELTA.md` beside the ticket: for each thing the pass changed, one line
   naming the change and why; for each thing it considered and rejected, one
   line naming it and the reason; and a picture of the system as one thing
   ("the tower"), not as a parts list.

**Order.** The pass runs *before* `oddkit_challenge`. The pass finds what is
missing; the challenge then finds what is wrong with the plan the pass left.
Running them the other way spends challenge's questions on a plan about to
be rewritten.

**Voice.** The pass edits plans and seat-authored documents. A document in the
captain's voice is not edited by the pass; the proposed change is named in
`DELTA.md` and the pass stops there.

---

## WHY — Rationale and the Motivating Failure

The prompt already worked once. On 2026-09-02 it was run in chat over
`klappy/door43-mcp` and produced PR #1 (`a32ea6d`): `AGENTS.md`, the
response envelope, the docs ladder, projection-not-semantics, and teaching
errors — the revision that made the server's first three gates cheap to
build. That run was unprompted by any policy and recorded as no step. A
prompt that works once in chat and lives nowhere on the rail is the
rule-in-memory class (kitchen journal k0033): it runs when someone remembers
it and stops the day they do not.

The pass earns its place because the questions it asks are not the ones the
other gates ask. The order checklist asks whether the fields are there. The
challenge asks whether the claims survive pressure. Neither asks the
planning seat to sit where the agent will sit and say what would make the
job cheap. That is a substance read from a particular chair, and it needs
its own step so it is run every time and not when convenient.

---

## ENFORCEMENT — The Named Enforcer, Honestly Graded

This is a lifecycle step with a file receipt, enforced at the ticket gate:

- **Wire (L4):** the kitchen's `cookbook/tickets/LIFECYCLE.md` step 3 names
  when the pass runs; `cookbook/tickets/CHECKLIST.md` gate 13 ("Pass
  receipt") reads whether `DELTA.md` exists beside the ticket or the ticket
  carries `driver-seat: exempt (<class>)`. A scoped ticket with neither is
  not bound. The boarding shim carries one line pointing here.
- **What this does and does not enforce.** Gate 13 reads file presence. It
  cannot read whether the delta is real. A `DELTA.md` that says "looks good"
  passes the gate and fails the pass; the Failure Modes below name the
  response. Under the enforcement ladder this is honest L3/L4 territory: a
  seat can comply by remembering to write a file, so the gate is a tripwire,
  not an enforcer. The interim obligation is the receipt's shape — a DELTA
  with no named change and no named rejection is malformed on its face, and
  the health inspection may lint for that.

---

## SCOPE — The Governed Surface

- **Runs on:** meals, entrées, catering plates, and every plan revision to
  one of those. A revision without a fresh `DELTA.md` is a plan that changed
  with no one in the seat.
- **Exempt by default:** fast-food (one-line dishes) and petit fours. The
  exemption is written in the ticket, not assumed.
- **Widening is the captain's ruling, not the seat's.** The captain may put
  the pass on every plate. The seat does not widen scope on its own and does
  not narrow it to save cost.
- **Cost:** one planning-seat turn on a capable model per scoped plate or
  revision. Scope stays proportional to that cost, or the rule dies of it.

---

## VERIFICATION — How Compliance Is Proven

- A planning seat can `oddkit_get klappy://canon/methods/driver-seat-pass`
  and observe the prompt verbatim plus when and on what to run it.
- A cook can run the kitchen CHECKLIST on an entrée and observe gate 13 pass
  only with a `DELTA.md` present or an explicit exemption line.
- The captain can read this file and find the prompt is his text, unedited.
- A reader can open the folder of the first scoped ticket after it plates
  (`klappy/kitchen` `2026-09-02-door43-mcp-v2-planning`) and observe a
  `DELTA.md` with named changes and named rejections.
- **Falsifier / retraction condition:** if two consecutive scoped plates
  carry `DELTA.md` files that change nothing the challenge would not also
  have caught, the pass is not earning its turn — scope narrows by ruling, or
  the step retracts and this document is superseded, not deleted.

---

## Failure Modes — What Breaks When the Pass Is a Vibe

- **Re-read, not a pass:** the seat reads the docs and writes "looks good"
  — no delta.
- **Scope creep by cost:** the pass runs on fast-food, gets expensive, and
  the rule is dropped for everything.
- **Voice edit:** the pass rewrites a captain-voice document because it was
  in context.
- **Wrong order:** challenge runs first and its findings are made stale by
  the pass.

## Required Response When Detected

- **Empty delta** → gate 13 fails; the pass is re-run with the docs *and* a
  list of every call the seat would make as the user of the system.
- **Cost** → scope stays proportional; the captain widens it by ruling, not
  the seat.
- **Voice** → stop; revert the edit; name the proposed change in `DELTA.md`
  and show the exact text.
- **Wrong order** → re-run challenge on the post-pass plan; the earlier run
  is noted in DELTA as pre-pass.

## See Also

- [Model Operating Contract](/canon/bootstrap/model-operating-contract.md) —
  the four modes; the pass lives at the planning → execution boundary
- [Revision Lens Sequence](/canon/methods/revision-lens-sequence.md) —
  single-lens passes verify; the driver's-seat pass is one such lens
- [Borrow Evaluation Before Implementation](/canon/constraints/borrow-evaluation-before-implementation.md)
  — the other planning-time table a plan owes before it fires
- [Infra Config Is Seat Work](/canon/constraints/infra-config-is-seat-work.md)
  — the sibling L1 landed the same night, same class of recurring miss
- Kitchen wire: `klappy/kitchen` `cookbook/tickets/LIFECYCLE.md` (step 3),
  `cookbook/tickets/CHECKLIST.md` (gate 13)
