---
uri: klappy://canon/methods/library-not-hand-rolled
title: "Library, Not Hand-Rolled — Borrow Load-Bearing Infrastructure by Default"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: experimental
tags: ["methods", "borrow", "6B", "infrastructure", "dependencies", "review", "red-flag", "maintenance"]
epoch: E0010
date: 2026-10-16
derives_from: "canon/principles/ownership-outlives-the-build.md, canon/principles/silence-is-not-consent.md, canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md"
complements: "canon/bootstrap/generic-boarding-pass.md, canon/principles/progress-over-perfection.md, canon/principles/contract-governs-handoff-drift.md, canon/constraints/canon-is-metaphor-agnostic.md"
governs: "The practice any seat follows when a plan, ticket, or evaluation proposes to build, fork, or adopt an unmaintained implementation of a load-bearing layer, in any project governed by this canon."
status: proposed
supersedes: "canon/principles/library-not-hand-rolled.md (the practice half of the former principle, reframed as a method)"
target_repo: "outcomes-driven-development"
---

# Library, Not Hand-Rolled — Borrow Load-Bearing Infrastructure by Default

> Two principles meet at every infrastructure choice: the cost of a load-bearing layer is its lifetime of care (`ownership-outlives-the-build`), and a decision is not reviewed until every registered perspective has answered (`silence-is-not-consent`). This method is the practice they produce. Load-bearing infrastructure is borrowed from a maintained community by default; a proposal to hand-roll, fork or adopt it from an abandoned source is a red flag from every registered perspective in whose boundary it falls, naming the risk, the lifetime cost and the maintained alternative in writing, and the proposer, operator included, answers in writing before anything is built. Where a project's governing documents already name the stack, that rule fills the Borrow row and a contrary evaluation is a hold, never a decision.

---

## Summary — Borrow by Default, Flag the Exception, Answer in Writing

For any load-bearing layer, the Borrow row names a maintained implementation, or a bound stack rule quoted into it. The layers in scope are the ones other work stands on: a UI framework, a database, auth, transport, build tooling, crypto, queues, rendering, localisation; a thin wrapper over a maintained library is Bend, not hand-rolling. If a proposal hand-rolls, forks or adopts an unmaintained layer instead, every in-boundary perspective writes a red flag naming risk, lifetime cost and the maintained alternative, and the proposer, operator included, answers in writing before anything is built. An evaluation that contradicts a bound rule is a hold quoting the rule, never a decision; Bide may defer an unknown, never a bound rule; provisional approval never covers re-deciding a bound rule. The two principles underneath are `ownership-outlives-the-build` and `silence-is-not-consent`.

---

## Method — Four Steps and One Pre-emption

The method has four steps and one pre-emption. It runs in planning, before any implementation begins, on any proposal that touches a load-bearing layer: the framework a user interface is written in, a database or storage engine, authentication, a transport or protocol implementation, build tooling, cryptography, scheduling and queues, document rendering, localisation.

1. **Borrow by default.** The starting assumption for any load-bearing layer is a maintained community implementation. Building, forking into a private line, or adopting an abandoned or single-maintainer source is the exception and carries the burden of proof. The six-row evaluation (`borrow-evaluation-before-implementation`) records which maintained option was considered and why.
2. **Red-flag the exception.** When a proposal takes the exception, every registered review perspective in whose boundary the question falls records a red flag, short and written: the risk, the lifetime maintenance cost and who pays it, and the maintained alternative. A perspective whose boundary excludes the question records "outside my boundary, no flag" instead, so absence is visible; `silence-is-not-consent` rules 2 and 5 govern the outcomes and the operator clause, and this method does not restate them.
3. **Answer before building.** Nothing is built until every red flag has a written, dated, attributable answer from the proposer. "I accept the cost" is an acceptable answer. An unwritten answer is not.
4. **The operator is told the same way.** When the proposer is the operator, steps 2 and 3 run unchanged: the operator receives exactly the flags an agent would receive, in writing, before ruling. The operator may rule after reading them; the method does not decide for the operator.

**Pre-emption: bound stack rules fill the Borrow row.** Where the project's governing documents already name the stack for a class of layer, that rule is the Borrow row of the evaluation before the evaluation begins. An evaluation that reaches a verdict contrary to a bound rule is a hold that quotes the rule, never a decision; "Bide" may defer an unknown, never a bound rule. A proposal to change the bound rule is a proposal to the rule's owner, made where that rule lives, not an evaluation outcome.

---

## Simple Rules — When to Load This Page

- **Use when:** a plan, ticket, or six-row evaluation proposes to build, fork, or adopt an unmaintained implementation of a layer other work will stand on, or a registered review perspective is asked to row on such a proposal, or a bound stack rule exists for the layer's class.
- **Skip when:** the choice is application logic, domain code, glue, a script, a prototype, or anything written to be regenerated; or a thin wrapper that keeps a maintained library behind a project-owned interface; or the question is how to cost the layer (the principle) rather than what to do about it.
- **Stop when:** the layer is borrowed from a maintained source and the evaluation says so; or the exception is taken and every registered perspective has answered and every red flag has a written, dated answer from the proposer.
- **Keep going when:** a registered perspective has not answered; a red flag has no written answer; a bound stack rule exists and the evaluation has not quoted it; the proposer is the operator and has not yet read the flags.
- **Where:** planning records, six-row evaluations, tickets that add or change a load-bearing layer, and the review receipts beside them.
- **Who:** every proposer, agent or operator; every registered review perspective; whoever closes the planning gate.
- **Why:** the first version is cheap and the lifetime is not, and the one perspective that would have objected is the one that stayed silent (§ Grounds).
- **What:** a method: borrow load-bearing layers by default, red-flag the exception from every registered perspective, answer in writing before building, and let bound stack rules pre-fill Borrow.
- **How:** run the four steps and the pre-emption under § Method; leave the records § What This Means in Practice describes; recognise drift with § Failure Modes.

---

## Grounds — Six Hand-Rolled Servers and One Unchecked UI

Two cases in one house, two months apart, same shape:

- **2026-09-02.** Agents repeatedly hand-rolled JSON-RPC, transport and auth for protocol servers until a build convention bound those layers to a maintained SDK; a section was added after a repeat miss. The convention is this method's first instance, applied to one class of layer.
- **2026-10-16.** An agent read the house rule naming the UI framework, filed it as a correction option, placed the framework at "Bide" in its six-row evaluation, and shipped three framework-free components under provisional approval. One of four registered review perspectives had looked. The operator reversed the decision the same morning, and the pre-emption above was bound the same day.

The operator, 2026-10-16, cleaned for grammar with his review (the raw lines stay in the private transcript): "If I go create a home landing page and choose Adobe Flash because I like it, somebody had better stop me, or at least tell me it's a bad idea. If I want to build my own database from scratch, tell me the risks and make me think about it. Stop hand-rolling major infrastructure."

Confidence: a working method with two cases and one operator. Proposed, not stable; stability moves only after a second independent adoption, recorded as a dated amendment.

---

## What This Means in Practice

A planning record for a load-bearing layer shows a Borrow row naming a maintained implementation, or a bound stack rule quoted into that row. If the proposal takes the exception, the review receipt beside it has one row per registered perspective, each a red flag naming risk, lifetime cost and alternative, or "outside my boundary, no flag". Below the flags sits the proposer's answer, written and dated, before any implementation record exists. When the proposer is the operator, the same receipt exists and the operator's ruling is recorded beneath it. An evaluation that would have contradicted a bound rule shows a hold quoting the rule instead of a verdict.

---

## What This Does Not Mean

The maintained choice is the default, not a verdict: the unmaintained choice stays available once argued for in writing. No framework, vendor or language is preferred here; a project's governing documents name those and this method defers to them. Out of scope: application logic, domain code, glue, scripts, prototypes and anything written to be regenerated, which "regenerate, don't steer" already covers; and wrapping, since a thin project-owned interface over a maintained library is Bend. The operator is told, never overruled. The six-row evaluation stays in force; this method fixes what its Borrow row holds for load-bearing layers and what happens when the evaluation wants to leave it.

Where this diverges from its parents: the two principles say what a layer costs and who must have answered; this method says what to do with both at the moment of choosing. The six-B sequence lets any step be skipped with a named justification; for load-bearing layers this method removes the skip past Borrow unless every registered perspective has flagged it and the proposer has answered.

**Alternatives considered, and reversibility.** Three shapes were rejected before this one: a prohibition on hand-rolling, because the operator must keep the ruling; a check by one designated perspective, because one perspective is exactly what looked on 2026-10-16 and missed; and a justification note inside the six-B evaluation, because the skip past Borrow with a note beside it is the failure that occurred. The method itself is reversible in text: it adds a review step and a pre-emption, both of which can be withdrawn by amending this page, and it builds nothing. What it protects against is not reversible: a load-bearing layer, once other work stands on it, is what `irreversibility-is-the-real-cost` describes. Prior art: the build convention of 2026-09-02 for protocol servers is the first instance; outside this canon the shape resembles an architecture decision record with mandatory reviewers.

**Falsifier.** Retract or narrow this method if the mandatory flag-and-answer step costs more in ceremony, measured in seat-hours per infrastructure decision, than it saves in avoided maintenance, incidents and reversals across the projects it governs; or if either root principle is retracted, since the method has no ground without them. Record the result as a dated amendment with the evidence.

---

## Failure Modes — How the Exception Slips Past the Flag

| Name | What it looks like | Why it fails this method | Pointer |
|---|---|---|---|
| **Law filed as a correction** | A bound stack rule is read, then listed as a "later" option while the evaluation proceeds | Bound rules pre-fill Borrow; they are not candidates | § Method, pre-emption; `canon/constraints/borrow-evaluation-before-implementation` |
| **Bide as a shelf** | The maintained choice is parked at Bide with a tripwire so the hand-rolled one can ship | Bide defers unknowns, never bound rules | § Method, pre-emption |
| **The unflagged exception** | A hand-rolled or unmaintained layer is proposed and no perspective writes a red flag | The exception is a red flag by default, from every registered perspective | § Method 2; `canon/principles/silence-is-not-consent` |
| **The flag without an answer** | Red flags are written and the build starts anyway | Nothing is built until the proposer answers in writing | § Method 3 |
| **The operator's pass** | No perspective flags the operator's own preference for a hand-rolled or unmaintained layer | The operator is told exactly what an agent would be told | § Method 4; `canon/bootstrap/generic-boarding-pass` |
| **Provisional cover** | A decision that contradicts bound law ships under provisional approval | Provisional approval covers reversible work, not re-deciding settled law | `canon/principles/progress-over-perfection` |
| **Paraphrased order** | The operator's instruction naming a stack is restated as a list of candidates | The agent carries the order forward verbatim; paraphrase turns orders into options | § Grounds (2026-10-16) |
| **The wrapper mistaken for a build** | A thin interface over a maintained library is flagged as hand-rolling | Wrapping is Bend; the method does not reach it | § What This Does Not Mean |

---

## Cross-References — The Two Roots, the Sequence and the Binding

- **Ownership Outlives the Build** (`canon/principles/ownership-outlives-the-build.md`) — the first root: the cost of a load-bearing layer is its lifetime of care; the red flag's cost line comes from here.
- **Silence Is Not Consent** (`canon/principles/silence-is-not-consent.md`) — the second root: every registered perspective rows; the red flag from every perspective, and "outside my boundary, no flag", come from here.
- **Borrow, Bend, Break, Beget, Bide, Build** (`canon/methods/borrow-bend-break-beget-build.md`) — the sequence; this method fixes Borrow as the default for load-bearing layers and names when Bide may not be used.
- **Borrow Evaluation Before Implementation** (`canon/constraints/borrow-evaluation-before-implementation.md`) — the planning-mode binding; its bound-stack bullet points here for the practice.
- **The Generic Boarding Pass** (`canon/bootstrap/generic-boarding-pass.md`) — "the cross-check runs both directions"; step 4 is that clause applied to infrastructure.
- **Progress Over Perfection** (`canon/principles/progress-over-perfection.md`) — provisional approval covers reversible work; this method names one decision class it never covers.
- **Contract Governs Handoff Drift** (`canon/principles/contract-governs-handoff-drift.md`) — a session artifact cannot override canon; neither can an evaluation override a bound rule.
