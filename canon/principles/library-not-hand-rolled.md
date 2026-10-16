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
complements: "canon/constraints/canon-is-metaphor-agnostic.md, canon/principles/contract-governs-handoff-drift.md"
governs: "Any choice to build, fork, or adopt an unmaintained implementation of load-bearing infrastructure, by any agent or operator, in any project governed by this canon."
status: proposed
target_repo: "outcomes-driven-development"
---

# Library, Not Hand-Rolled — Load-Bearing Infrastructure Is Borrowed, and Every Reviewer Says So Before the First Commit

> Load-bearing infrastructure is borrowed from a maintained community, never hand-rolled, forked into solitude, or adopted from an abandoned source — and when anyone proposes otherwise, the operator included, every review perspective names the risk, the maintenance debt and the maintained alternative in writing before the first commit. The proposer may still decide after being told; the principle guarantees the telling, not the outcome. It is falsified the day a hand-rolled layer in this canon's projects proves cheaper to own over its life than the maintained one it replaced.

---

## Summary — Borrow the Load-Bearing Layers; Make the Warning Mandatory, Not the Veto

Infrastructure is load-bearing when other work stands on it and cannot easily move off it: the framework a user interface is written in, a database or storage engine, authentication, a transport or protocol implementation, build tooling, cryptography, scheduling and queues, document rendering, localisation. The first version of any of these is cheap to write; every patch, edge case and security fix after that is paid by whoever owns it, alone, for as long as the thing runs. A maintained community pays that cost across thousands of users. A hand-rolled layer pays it with one person's attention, which is the scarcest resource this canon manages.

So the principle has two halves. The first is a default: borrow. The second is a process guarantee that survives the default being overridden: every review perspective registered for a project must look at every infrastructure choice and say so, with one of four outcomes, so that the choice is never made in silence. The guarantee binds reviewers against the operator as firmly as against agents, because the operator's enthusiasm is the one failure mode no agent will challenge unasked.

## The principle

1. **Borrow by default.** For load-bearing infrastructure, a maintained community implementation is the starting assumption. Building, forking into a private line, or adopting an abandoned or single-maintainer source is the exception and carries the burden of proof.
2. **Every reviewer rows, every time.** A decision about load-bearing infrastructure is incomplete until every review perspective registered for the project has recorded one of: *agree*, *proceed with a named concern*, *hold with a named rule*, or *outside my scope, no flag*. Silence is a reviewer failure, not consent.
3. **The exception is a red flag, not a prohibition.** A proposal to hand-roll, fork or adopt unmaintained infrastructure is flagged red by default. The flag names the risk, the lifetime maintenance cost, and the maintained alternative, in writing, before the first commit.
4. **The proposer answers before building.** Nothing is built until the red flag has a written answer. The answer may be "I accept the cost" — but it is written, dated, and attributable.
5. **The operator is not exempt.** The cross-check runs in both directions. An operator who proposes the exception is told exactly what an agent would be told. The operator may still rule; the principle guarantees the telling.
6. **Bound stack rules pre-empt evaluation.** Where the operator's governing documents already name the stack for a class of infrastructure, that rule is the Borrow row; an evaluation that reaches a contrary verdict is a hold that quotes the rule, never a decision.

## Scope and what it does not say

It governs load-bearing layers, defined above by what stands on them, not by size. It does not govern application logic, domain code, glue, scripts, prototypes, or anything disposable by design; "regenerate, don't steer" already covers those. It does not say the maintained choice is always better; it says the unmaintained choice must be argued for in writing before it is made. It does not prefer any particular framework, vendor or language; project law names those, and this principle defers to it.

## Falsifier and retraction

Retract or narrow this principle if, across the projects it governs, hand-rolled load-bearing layers prove cheaper to own over their lifetime than the maintained alternatives they replaced — measured in patches, incidents and seat-hours, not in first-version effort — or if the mandatory-warning process produces more cost in ceremony than it saves in avoided maintenance. Either would be recorded as a dated amendment with the evidence.

## Evidence — the cases this rests on

Two cases in one house, two months apart, same shape:

- **2026-09-02.** Agents repeatedly hand-rolled JSON-RPC, transport and auth for MCP servers until a build convention bound "library, not hand-rolled" to a maintained SDK; a section was added after a repeat miss. One operator, several servers.
- **2026-10-16.** A cook read the house rule naming the UI framework, filed it as a correction option, placed the framework at "Bide" in its six-row evaluation, and shipped three vanilla components under provisional approval. One of four registered review perspectives had looked. The operator, on reading it: "I'm frustrated that a production UI would use vanilla JS without the benefit of a community-maintained framework," and on why: "You can build it in beautiful reusable abstractions. But state and memory management and a billion other things are addressed for us in UI frameworks." On the other direction of the cross-check: "If I go create a home landing page and choose Adobe Flash because I like it, somebody had better stop me, or at least tell me it's a bad idea. If I want to build my own database from scratch, tell me the risks and make me think about it."

A counter-example considered: a thin wrapper that keeps a maintained library behind a project-owned interface is not hand-rolling; it is Bend, and the principle does not flag it. A second: bootstrap code written to be thrown away on the first real refire is exempt by the scope section.

Confidence: a working rule with two cases and one operator. It is proposed, not stable; core extraction waits on a second independent adoption (`canon/methods/document-routing-tests`, T3).

## Relationship to other canon

- `canon/methods/borrow-bend-break-beget-build` — the method; this principle removes its escape hatch for load-bearing layers.
- `canon/constraints/borrow-evaluation-before-implementation` — the planning-mode binding; amended the same day so a bound stack rule pre-fills Borrow and a contrary verdict is a hold.
- `canon/bootstrap/generic-boarding-pass` — "the cross-check runs both directions"; this principle is that clause applied to infrastructure.
- `canon/principles/progress-over-perfection` — provisional approval covers reversible work; this principle names one decision class it never covers.
