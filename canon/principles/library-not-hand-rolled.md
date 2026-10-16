---
uri: klappy://canon/principles/library-not-hand-rolled
title: "Library, Not Hand-Rolled — Load-Bearing Infrastructure Is Borrowed, and Every Reviewer Says So Before the First Commit"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: experimental
tags: ["principles", "borrow", "6B", "infrastructure", "dependencies", "review", "cross-check", "maintenance"]
epoch: E0010
date: 2026-10-16
derives_from: "canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/bootstrap/generic-boarding-pass.md, canon/principles/progress-over-perfection.md"
complements: "canon/constraints/canon-is-metaphor-agnostic.md, canon/principles/contract-governs-handoff-drift.md, canon/methods/writing-simple-rules.md"
governs: "Any choice to build, fork, or adopt an unmaintained implementation of load-bearing infrastructure, by any agent or operator, in any project governed by this canon."
status: proposed
target_repo: "outcomes-driven-development"
---

# Library, Not Hand-Rolled — Load-Bearing Infrastructure Is Borrowed, and Every Reviewer Says So Before the First Commit

> Load-bearing infrastructure is borrowed from a maintained community, never hand-rolled, forked into solitude, or adopted from an abandoned source — and when anyone proposes otherwise, the operator included, every review perspective names the risk, the maintenance debt and the maintained alternative in writing before the first commit. The proposer may still decide after being told; the principle guarantees the telling, not the outcome. It is falsified the day a hand-rolled layer in this canon's projects proves cheaper to own over its life than the maintained one it replaced.

---

## Principle

Infrastructure is load-bearing when other work stands on it and cannot easily move off it: the framework a user interface is written in, a database or storage engine, authentication, a transport or protocol implementation, build tooling, cryptography, scheduling and queues, document rendering, localisation. The first version of any of these is cheap to write; every patch, edge case and security fix after that is paid by whoever owns it, alone, for as long as the thing runs. A maintained community pays that cost across thousands of users. A hand-rolled layer pays it with one person's attention, which is the scarcest resource this canon manages.

So the principle has two halves. The first is a default: borrow. The second is a process guarantee that survives the default being overridden: every review perspective registered for a project must look at every infrastructure choice and say so, with one of four outcomes, so that the choice is never made in silence. The guarantee binds reviewers against the operator as firmly as against agents, because the operator's enthusiasm is the one failure mode no agent will challenge unasked.

1. **Borrow by default.** For load-bearing infrastructure, a maintained community implementation is the starting assumption. Building, forking into a private line, or adopting an abandoned or single-maintainer source is the exception and carries the burden of proof.
2. **Every reviewer rows, every time.** A decision about load-bearing infrastructure is incomplete until every review perspective registered for the project has recorded one of: *agree*, *proceed with a named concern*, *hold with a named rule*, or *outside my scope, no flag*. Silence is a reviewer failure, not consent.
3. **The exception is a red flag, not a prohibition.** A proposal to hand-roll, fork or adopt unmaintained infrastructure is flagged red by default. The flag names the risk, the lifetime maintenance cost, and the maintained alternative, in writing, before the first commit.
4. **The proposer answers before building.** Nothing is built until the red flag has a written answer. The answer may be "I accept the cost" — but it is written, dated, and attributable.
5. **The operator is not exempt.** The cross-check runs in both directions. An operator who proposes the exception is told exactly what an agent would be told. The operator may still rule; the principle guarantees the telling.
6. **Bound stack rules pre-empt evaluation.** Where the operator's governing documents already name the stack for a class of infrastructure, that rule is the Borrow row; an evaluation that reaches a contrary verdict is a hold that quotes the rule, never a decision.

---

## Simple Rules

- **Use when:** a plan, ticket, or six-row evaluation proposes to build, fork, or adopt an unmaintained implementation of a layer other work will stand on — a UI framework, database, auth, transport, build tooling, crypto, queue, rendering, localisation — or when a reviewer is asked to row on such a choice.
- **Skip when:** the choice is application logic, domain code, glue, a script, a prototype, or bootstrap code written to be regenerated; or a thin wrapper that keeps a maintained library behind a project-owned interface.
- **Stop when:** the infrastructure choice is recorded with a row from every registered reviewer and, if the exception was taken, a written, dated answer from the proposer.
- **Keep going when:** a reviewer has not rowed; the proposer has not answered a red flag; a bound stack rule exists and the evaluation has not quoted it.
- **Where:** planning records, six-row evaluations, tickets that add or change a load-bearing layer, and the review receipts beside them.
- **Who:** every reviewer registered for the project; every proposer, agent or operator alike.
- **Why:** the first version is cheap and the lifetime is not; the maintained alternative spreads that lifetime across a community (§ Grounds).
- **What:** a principle: borrow load-bearing layers by default, and make the warning mandatory, not the veto.
- **How:** apply the six rules under § Principle; record outcomes as § What This Means in Practice describes; recognise drift with § Failure Modes.

---

## Grounds

Two cases in one house, two months apart, same shape:

- **2026-09-02.** Agents repeatedly hand-rolled JSON-RPC, transport and auth for MCP servers until a build convention bound "library, not hand-rolled" to a maintained SDK; a section was added after a repeat miss. One operator, several servers.
- **2026-10-16.** A cook read the house rule naming the UI framework, filed it as a correction option, placed the framework at "Bide" in its six-row evaluation, and shipped three vanilla components under provisional approval. One of four registered review perspectives had looked.

The operator, 2026-10-16, cleaned for grammar with his review (the raw lines stay in the private transcript): "I'm frustrated that a production UI would use vanilla JS without the benefit of a community-maintained framework." On why: "You can build it in beautiful reusable abstractions. But state and memory management and a billion other things are addressed for us in UI frameworks." On the other direction of the cross-check: "If I go create a home landing page and choose Adobe Flash because I like it, somebody had better stop me, or at least tell me it's a bad idea. If I want to build my own database from scratch, tell me the risks and make me think about it. Stop hand-rolling major infrastructure."

Confidence: a working rule with two cases and one operator. Proposed, not stable; core extraction waits on a second independent adoption (`canon/methods/document-routing-tests`, T3).

---

## What This Means in Practice

Every registered reviewer leaves one row per infrastructure decision, with one of four outcomes, so absence is visible. A red flag is a short written note — the risk, the lifetime cost, the maintained alternative — not an essay. The proposer's answer is written, dated and attributable, even when it is "I accept the cost." A bound stack rule is quoted into the Borrow row before any evaluation begins; an evaluation that would contradict it stops and asks, rather than deciding. The operator receives the same note an agent would, and rules after reading it.

---

## What This Does Not Mean

This does not say the maintained choice is always better; it says the unmaintained choice must be argued for in writing before it is made.

This does not prefer any framework, vendor or language; project law names those, and this principle defers to it.

This does not reach application logic, domain code, glue, scripts, prototypes, or anything disposable by design; "regenerate, don't steer" already covers those.

This does not forbid wrapping: a thin project-owned interface over a maintained library is Bend, not hand-rolling.

This does not override the operator. It guarantees he is told; it never decides for him.

**Falsifier.** Retract or narrow this principle if, across the projects it governs, hand-rolled load-bearing layers prove cheaper to own over their lifetime than the maintained alternatives they replaced — measured in patches, incidents and seat-hours, not in first-version effort — or if the mandatory-warning process costs more in ceremony than it saves in avoided maintenance. Either is recorded as a dated amendment with the evidence.

---

## Failure Modes

| Name | What it looks like | Why it fails this principle | Pointer |
|---|---|---|---|
| **Law filed as a correction** | A bound stack rule is read, then listed as a "later" option while the evaluation proceeds | Bound rules pre-fill Borrow; they are not candidates | § Principle 6; `canon/constraints/borrow-evaluation-before-implementation` |
| **Bide as a shelf** | The maintained choice is parked at Bide with a tripwire so the hand-rolled one can ship | Bide defers unknowns, never bound rules | § Principle 6 |
| **One reviewer, called a review** | A single perspective rows and the decision is treated as reviewed | Every registered reviewer rows; silence is failure, not consent | § Principle 2 |
| **Out of scope, unsaid** | A reviewer whose boundary excludes the question says nothing | "Outside my scope, no flag" is a row; silence is not | § Principle 2 |
| **The operator's pass** | No reviewer flags the operator's own preference for a hand-rolled or unmaintained layer | The cross-check runs both directions | § Principle 5; `canon/bootstrap/generic-boarding-pass` |
| **Provisional cover** | A decision that contradicts bound law ships under provisional approval | Provisional approval covers reversible work, not re-deciding settled law | `canon/principles/progress-over-perfection` |
| **First-version accounting** | The build is justified by how little the first version costs | The cost is the lifetime of patches, incidents and seat-hours | § Grounds |
| **Paraphrased order** | The operator's instruction naming a stack is restated as a list of candidates | The seat carries the order forward verbatim; paraphrase turns orders into options | § Grounds (2026-10-16) |
| **The wrapper mistaken for a build** | A thin interface over a maintained library is flagged as hand-rolling | Wrapping is Bend; the principle does not reach it | § What This Does Not Mean |

---

## Cross-References

- **Borrow, Bend, Break, Beget, Bide, Build** (`canon/methods/borrow-bend-break-beget-build.md`) — the method; this principle removes its escape hatch for load-bearing layers.
- **Borrow Evaluation Before Implementation** (`canon/constraints/borrow-evaluation-before-implementation.md`) — the planning-mode binding; amended the same day so a bound stack rule pre-fills Borrow and a contrary verdict is a hold.
- **The Generic Boarding Pass** (`canon/bootstrap/generic-boarding-pass.md`) — "the cross-check runs both directions"; this principle is that clause applied to infrastructure.
- **Progress Over Perfection** (`canon/principles/progress-over-perfection.md`) — provisional approval covers reversible work; this principle names one decision class it never covers.
- **Contract Governs Handoff Drift** (`canon/principles/contract-governs-handoff-drift.md`) — a session artifact cannot override canon; neither can an evaluation override a bound rule.
