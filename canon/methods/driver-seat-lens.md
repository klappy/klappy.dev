---
uri: klappy://canon/methods/driver-seat-lens
title: "The Driver's-Seat Lens — A Planning Seat Sits Where the Agent Will Sit Before the Plan Binds"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
status: active
source: "Jeffrey Emanuel (@doodlestein), https://x.com/doodlestein/status/2094288037458882668"
tags: ["canon", "methods", "planning", "ergonomics", "agent-legibility", "lifecycle", "receipt", "driver-seat", "lens", "metaphor-agnostic"]
epoch: E0010
date: 2026-09-03
derives_from: "canon/bootstrap/model-operating-contract.md, canon/values/axioms.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
complements: "canon/methods/revision-lens-sequence.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/constraints/reviewability-standard.md, canon/constraints/infra-config-is-seat-work.md"
governs: "Any governed body of work, under any operating metaphor: before a plan of substantive size binds, a planning seat runs the operator's driver's-seat prompt over the whole design set and leaves a delta receipt"
target_repo: "outcomes-driven-development"
---

# The Driver's-Seat Lens — A Planning Seat Sits Where the Agent Will Sit Before the Plan Binds

> Before a plan binds, one planning seat reads the whole design set as the
> agent who will have to drive it, and changes the documents until the system
> is legible, coherent, and cheap from that seat. The lens is the constructive
> twin of `oddkit_challenge`: challenge finds what is wrong; the lens finds
> what is missing. It runs on every unit of work above the trivial, and on
> every revision of such a plan; it leaves a delta receipt naming what changed
> and what was considered and rejected. A lens that leaves no delta was not
> looked through. Operator, 2026-09-02: "that needs to be a policy run on all tickets
> and planning loops."

---

## WHAT — The Rule, Precisely

**The prompt.** The lens is the operator's prompt, run verbatim by a planning
seat with the plan and every design document in context. The wording is
**Jeffrey Emanuel's** (@doodlestein), from his "My Favorite Prompts" series —
https://x.com/doodlestein/status/2094288037458882668 — adopted here verbatim
by the operator on 2026-09-02. Attribution was missed at first cut and
corrected 2026-09-03; the omission is on the operator, not the author. The
text is not edited by any seat (HUMAN-ONLY: voice, the author's and the
operator's):

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

*— Jeffrey Emanuel, @doodlestein. The lens step, receipt, scope, and this
file are the house's; the words above are his.*

**Looking through it.** A capable planning seat takes the work unit, its plan, and every
design document the plan touches into one context and runs the prompt as
written, in exploration → planning modes only. No execution. The output is
two things:

1. Edits to the design documents themselves, made by the seat.
2. **The delta receipt** — a file stored with the work unit (`DELTA.md` by
   convention): for each thing the lens changed, one line naming the change
   and why; for each thing it considered and rejected, one line naming it and
   the reason; and a picture of the system as one thing, not as a parts list.

**Order.** The lens runs *before* `oddkit_challenge`. The lens finds what is
missing; the challenge then finds what is wrong with the plan the lens left.
Running them the other way spends challenge's questions on a plan about to
be rewritten.

**Voice.** The lens edits plans and seat-authored documents. A document in the
operator's voice is not edited by the lens; the proposed change is named in
the delta receipt and the lens stops there.

**Class.** This is the first instance of `klappy://canon/methods/lens` —
a prompt with an owner, a seat, a phase, inputs, a boundary, and a receipt.
A lens frame that admits many lenses reads that method; this file stays the
one prompt.

**Vocabulary.** This method names three things and nothing else: a *work
unit* (the thing being planned), a *planning seat* (whoever looks through the lens),
and a *delta receipt* (the file that proves the look happened). Every operating
metaphor supplies its own words for the work unit, its size classes, its
lanes, and its gates. The method binds to none of them; see Example
Applications.

---

## WHY — Rationale and the Motivating Failure

The prompt already worked once. On 2026-09-02 it was run in chat over
`klappy/door43-mcp` and produced PR #1 (`a32ea6d`): `AGENTS.md`, the
response envelope, the docs ladder, projection-not-semantics, and teaching
errors — the revision that made the server's first three milestones cheap to
build. That run was unprompted by any policy and recorded as no step. A
prompt that works once in chat and lives nowhere durable is the
rule-in-memory class: it runs when someone remembers it and stops the day
they do not.

The lens earns its place because the questions it asks are not the ones the
other gates ask. A form check asks whether the fields are there. A challenge
asks whether the claims survive pressure. Neither asks the planning seat to
sit where the agent will sit and say what would make the job cheap. That is
a substance read from a particular chair, and it needs its own step so it is
run every time and not when convenient.

---

## ENFORCEMENT — The Named Enforcer, Honestly Graded

This method is a lifecycle step with a file receipt. It is enforced wherever
the adopting system already gates a plan before it binds:

- **What canon asks of the adopter.** Name the lens as a step in the adopter's own
  planning lifecycle at the point just before bind; add one gate to the
  adopter's own pre-execution check (the last gate before work starts, after
  the planning seat has had its turn — not the ordering check, which runs
  before the lens and would deadlock) that reads whether the delta receipt exists
  beside the work unit, or the work unit carries an explicit exemption line
  (`driver-seat: exempt (<class>)`); put one pointer to this URI in the
  adopter's boarding text. Three touches, in the adopter's vocabulary.
- **What this does and does not enforce.** A presence gate reads whether the
  file exists. It cannot read whether the delta is real. A receipt that says
  "looks good" passes the gate and fails the lens; Failure Modes below name
  the response. Under the enforcement ladder this is honest L3/L4 territory:
  a seat can comply by remembering to write a file, so the gate is a
  tripwire, not an enforcer. The interim obligation is the receipt's shape —
  a delta with no named change and no named rejection is malformed on its
  face, and an inspection may lint for that.

---

## SCOPE — The Governed Surface

- **Runs on:** every work unit above the trivial — anything with a plan of
  its own, anything composed of several parts, anything delivered as a set —
  and every plan revision to one of those. A revision without a fresh delta
  receipt is a plan that changed with no one in the seat.
- **Exempt by default:** the two smallest size classes the adopter defines —
  the one-line change, and the small self-contained change. The exemption is
  written in the work unit, not assumed.
- **Widening is the operator's ruling, not the seat's.** The operator may
  put the lens on every unit. The seat does not widen scope on its own and
  does not narrow it to save cost.
- **Cost:** one planning-seat turn on a capable model per scoped unit or
  revision. Scope stays proportional to that cost, or the rule dies of it.

---

## Example Applications — The Same Lens Under Different Metaphors

These are illustrations, not the binding. A future metaphor supplies its own
row; canon does not change.

| This method says | Kitchen (`klappy/kitchen`, 2026) | ARS / aviation (v1, retired) |
|---|---|---|
| work unit | ticket / dish | flight / brief |
| scoped classes | meal, entrée, catering plate | mission, multi-leg flight |
| exempt classes | fast-food, petit four | taxi run, single-leg hop |
| planning seat | CoS or expeditor in planning mode | dispatch seat, preflight |
| the step in the lifecycle | `cookbook/tickets/LIFECYCLE.md` step 3, before bind | preflight checklist item, before pushback |
| the presence gate | `cookbook/tickets/FIRE-CHECK.md` gate 8 "Lens receipt" (CHECKLIST gate 13 only checks the exemption line for exempt classes) | a line on the dispatch release |
| delta receipt | `DELTA.md` beside `TICKET.md` | `DELTA.md` in the flight folder |
| boarding pointer | one line in `cookbook/boarding/SHIM.md` | one line in the boarding pass |
| first receipt | kitchen `2026-09-02-door43-mcp-v2-planning` | — |

---

## VERIFICATION — How Compliance Is Proven

- A planning seat can `oddkit_get klappy://canon/methods/driver-seat-lens`
  and observe the prompt verbatim plus when and on what to run it.
- An adopter's pre-execution check can be run on a scoped work unit and
  observed to pass only with a delta receipt present or an explicit
  exemption line.
- The operator can read this file and find the prompt is his text, unedited.
- A reader can open the first scoped work unit after it lands and observe a
  delta receipt with named changes and named rejections.
- **Falsifier / retraction condition:** if two consecutive scoped units carry
  delta receipts that change nothing the challenge would not also have
  caught, the lens is not earning its turn — scope narrows by ruling, or the
  step retracts and this document is superseded, not deleted.

---

## Failure Modes — What Breaks When the Lens Is a Vibe

- **Re-read, not a lens:** the seat reads the docs and writes "looks good"
  — no delta.
- **Scope creep by cost:** the lens runs on trivial units, gets expensive,
  and the rule is dropped for everything.
- **Voice edit:** the lens rewrites an operator-voice document because it was
  in context.
- **Wrong order:** challenge runs first and its findings are made stale by
  the lens.
- **Metaphor capture:** an adopter's vocabulary is written back into this
  method, and the next metaphor cannot inherit it.

## Required Response When Detected

- **Empty delta** → the presence gate fails; the lens is re-run with the
  docs *and* a list of every call the seat would make as the user of the
  system.
- **Cost** → scope stays proportional; the operator widens it by ruling, not
  the seat.
- **Voice** → stop; revert the edit; name the proposed change in the delta
  receipt and show the exact text.
- **Wrong order** → re-run challenge on the post-lens plan; the earlier run
  is noted in the receipt as pre-lens.
- **Metaphor capture** → move the words to Example Applications; the WHAT,
  SCOPE, and ENFORCEMENT sections keep the three neutral terms only.

## See Also

- [Model Operating Contract](/canon/bootstrap/model-operating-contract.md) —
  the four modes; the lens lives at the planning → execution boundary
- [Revision Lens Sequence](/canon/methods/revision-lens-sequence.md) —
  single-lens passes verify; this is one such lens, given a name and a receipt
- [Borrow Evaluation Before Implementation](/canon/constraints/borrow-evaluation-before-implementation.md)
  — the other planning-time table a plan owes before it binds
- [Infra Config Is Seat Work](/canon/constraints/infra-config-is-seat-work.md)
  — the sibling L1 landed the same night, same class of recurring miss
