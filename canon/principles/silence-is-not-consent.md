---
uri: klappy://canon/principles/silence-is-not-consent
title: "Silence Is Not Consent — A Decision Is Incomplete Until Every Registered Perspective Has Answered"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: experimental
tags: ["principles", "review", "lenses", "cross-check", "completeness", "decisions", "operator"]
epoch: E0010
date: 2026-10-16
derives_from: "canon/bootstrap/generic-boarding-pass.md, canon/principles/verification-requires-fresh-context.md, canon/values/axioms.md, canon/methods/driver-seat-lens.md"
complements: "canon/principles/ownership-outlives-the-build.md, canon/methods/library-not-hand-rolled.md, canon/constraints/canon-is-metaphor-agnostic.md, canon/principles/contract-governs-handoff-drift.md"
governs: "When a decision in any project governed by this canon counts as reviewed: every review perspective the project registers has recorded an outcome for it, the operator's own proposals included."
status: proposed
supersedes: "canon/principles/library-not-hand-rolled.md (the review-completeness half of the former principle)"
target_repo: "outcomes-driven-development"
---

# Silence Is Not Consent — A Decision Is Incomplete Until Every Registered Perspective Has Answered

> A project registers review perspectives because each sees what the others miss, so a decision they were registered to see is not reviewed until every one has recorded an outcome: agree, proceed with a named concern, hold with a named rule, or outside my boundary with no flag. A perspective that says nothing has not agreed; it has failed to review, and the record shows the gap; no perspective is skipped because another looked; a hold names its rule. The operator's own proposals are reviewed the same way, and the operator rules after being told. Falsified if decisions answered by one perspective are reversed no more often than decisions every perspective answered.

---

## Summary — Every Registered Perspective Writes an Answer

A project's review perspectives are registered because they see different things, so a decision is reviewed only when every one registered for that gate has written one of four outcomes: agree, proceed with a named concern, hold with a named rule, or outside my boundary with no flag. A missing answer is a gap in the review and is recorded as one; it never reads as agreement, and it blocks the gate until written. No perspective is skipped because another looked, and a hold names the rule it holds on. The operator's own proposals are reviewed the same way and the operator reads the answers before ruling. The practice this produces for infrastructure is `canon/methods/library-not-hand-rolled`.

---

## Principle — Six Rules for a Complete Review

Every project that uses this canon registers a set of review perspectives: a list of named viewpoints, each with an owner and a boundary, that a decision must pass before it moves. The list exists because no single reviewer, human or model, sees everything, and because a creator cannot be their own critic (`verification-requires-fresh-context`). The list is only worth having if it is used in full. A decision that one perspective examined and three ignored has had one review, not a review.

The usual failure is silence rather than refusal. A perspective is not asked, or is asked and does not answer, or decides the question is someone else's and says nothing. Each of these reads, afterwards, exactly like agreement. This principle removes that ambiguity by requiring every registered perspective to write something down, even when what it writes is "this is outside my boundary."

1. **Every registered perspective answers on every decision in its scope.** A decision record is incomplete until each perspective the project registers for that gate has an outcome beside it.
2. **Four outcomes, and nothing else.** *Agree*, *proceed with a named concern*, *hold with a named rule*, or *outside my boundary, no flag*. The fourth exists so that absence is always visible as a choice, never mistaken for assent.
3. **Silence is a reviewer failure, not consent.** A missing answer is a gap in the review, recorded as such. It never completes the decision and never counts as agreement.
4. **No perspective is skipped because another covers it.** Perspectives are registered because they differ. "The other reviewer already looked" is the mechanism by which the one thing only this perspective would have seen goes unseen.
5. **The cross-check runs both directions.** The operator who proposes a decision is reviewed exactly as an agent would be, and is told exactly what an agent would be told, before ruling. The operator may still rule after being told; the principle guarantees the telling, not the outcome.
6. **A hold quotes its rule.** When a perspective holds, it names the bound rule or the specific risk it is holding on, so the proposer can answer it in writing and the record can show whether the answer was given.

---

## Simple Rules — When to Load This Page

- **Use when:** a decision is about to be recorded as reviewed: a plan, a six-row evaluation, an architecture or stack choice, a contract change, a page moving toward publication, or any artifact a project's registered review perspectives are listed to examine.
- **Skip when:** the project registers no review perspectives for the artifact's class or gate; or the question is what a particular perspective should look for, which its own definition governs.
- **Stop when:** every registered perspective has one of the four outcomes recorded beside the decision, and any hold has a written answer from the proposer or stands as the decision's current state.
- **Keep going when:** a registered perspective has no recorded answer; an answer is missing its rule or concern; the proposer is the operator and has not yet received the review; a hold has been answered only in conversation.
- **Where:** decision records, planning records, evaluation tables, and the review receipts beside any artifact that passes a gate.
- **Who:** every registered review perspective and its owner; every proposer, operator included; whoever closes a gate.
- **Why:** a perspective that was registered and did not answer is the one that would have caught the miss, and afterwards its silence reads as agreement (§ Grounds).
- **What:** a principle: a decision counts as reviewed only when every registered perspective has written an outcome, and silence is recorded as a gap, never as consent.
- **How:** apply the six rules under § Principle; record the outcomes as § What This Means in Practice describes; recognise drift with § Failure Modes.

---

## Grounds — Four Perspectives Registered, One Looked

- **2026-10-16.** A project registered four review perspectives for its design gate. An agent recorded a stack decision after one had looked; the other three left no answer and the decision moved. The perspective registered to hold on the house stack rule had not been run, and the operator reversed the decision the same morning. The same case is recorded from the cost angle in `canon/methods/library-not-hand-rolled` § Grounds.

The operator, 2026-10-16, cleaned for grammar with his review (the raw lines stay in the private transcript): "All lenses must look at this. Everything impacts everything else. Let the team look at decisions and at least have a chance to say LGTM or raise a red or yellow flag." On the other direction of the cross-check: "If I go create a home landing page and choose Adobe Flash because I like it, somebody had better stop me, or at least tell me it's a bad idea."

The clause this principle generalises already stands in the reusable boarding pass: "Challenge the captain when the evidence warrants it; accept the captain's ruling once it is given." That clause tells a single seat how to behave toward the operator. This principle tells a project how to know whether every registered seat did.

Confidence: a working rule with one case and one operator, grounded in a standing boarding clause. Proposed, not stable; stability moves only after a second independent adoption, recorded as a dated amendment.

---

## What This Means in Practice

The review record beside a decision has exactly as many entries as the project registers perspectives for that gate, each with one of the four outcomes, the perspective's name, and, for a concern or a hold, the rule or risk it names. A perspective whose boundary excludes the question still writes its entry. A missing entry blocks the gate until it is written or the perspective is deregistered. When the proposer is the operator, the entries are written before the operator rules, and the operator reads them. The record shows who looked, not a vote: one hold with a quoted rule is enough to stop a decision until the proposer answers it in writing.

---

## What This Does Not Mean

Agreement is never required; an answer is. The operator may overrule a hold after reading it in writing, and the ruling is recorded beside the hold. The principle governs completeness against the registered list, not the length of the list: one registered perspective is satisfied by one answer. A perspective records an outcome and nothing more; it does not edit the artifact, rule on it, or speak for the operator. Decisions no perspective was registered to see are outside this page; registration, not this principle, sets what each perspective examines.

Where this diverges from its parents: `verification-requires-fresh-context` says a reviewer must not be the creator; this principle says the set of reviewers must be complete. The boarding pass's cross-check clause binds one seat's conduct toward the operator; this principle binds the project's record of whether every seat conducted itself so.

**Prior art and the strongest opposing view.** The name inverts the legal maxim that one who is silent is taken to consent, and the practice has cousins: the sign-off matrix, the required-reviewers list on a merge gate, and "disagree and commit", which this principle keeps in its fourth outcome and its hold-then-rule shape. The strongest case against is cost: an answer from every perspective on every decision is ceremony, and ceremony is the failure this canon's lighter rules exist to avoid. The reply is that the entry is one line and the fourth outcome makes it cheap, while the miss it prevents was a reversed architecture decision; the falsifier below keeps that trade measurable. Alternatives considered and rejected: a quorum (any three of four), which is exactly the condition that let the one holding perspective stay silent; and a designated-reviewer model, which makes one perspective responsible for seeing what it was not registered to see.

**Falsifier.** Retract or narrow this principle if, across the projects it governs, decisions on which only some registered perspectives answered are reversed, re-decided or escalated no more often than decisions on which all of them answered; or if the cost of the mandatory answer, in seat-hours, exceeds the cost of the misses it prevents. Record either as a dated amendment with the evidence.

---

## Failure Modes — How Silence Gets Read as Yes

| Name | What it looks like | Why it fails this principle | Pointer |
|---|---|---|---|
| **One reviewer, called a review** | A single perspective answers and the decision is treated as reviewed | Every registered perspective answers; one answer is one review | § Principle 1 |
| **Out of scope, unsaid** | A perspective whose boundary excludes the question says nothing | "Outside my boundary, no flag" is an answer; silence is not | § Principle 2 |
| **Covered by the other one** | A perspective is skipped because a neighbour already looked | Perspectives are registered because they differ | § Principle 4 |
| **The operator's pass** | No perspective answers on the operator's own proposal | The cross-check runs both directions | § Principle 5; `canon/bootstrap/generic-boarding-pass` |
| **The unquoted hold** | A perspective holds without naming the rule or risk | A hold the proposer cannot answer in writing is not a review outcome | § Principle 6 |
| **Answered in the hallway** | A hold is resolved in conversation and the record shows only the hold | The record must show the written reply, or the hold stands | § What This Means in Practice |
| **Silence read as assent** | A gate closes with answers missing and the missing answers are later cited as agreement | A missing answer is a gap, never consent | § Principle 3 |

---

## Cross-References — Parents, Sibling and the Method

- **The Generic Boarding Pass** (`canon/bootstrap/generic-boarding-pass.md`) — "the cross-check runs both directions"; this principle is that clause made checkable across every registered perspective.
- **Verification Requires Fresh Context** (`canon/principles/verification-requires-fresh-context.md`) — a creator cannot be their own critic; this principle adds that the critics must all have spoken.
- **The Driver's-Seat Lens** (`canon/methods/driver-seat-lens.md`) — one registered perspective and the record shape its entries take; this principle governs the full set it belongs to.
- **Ownership Outlives the Build** (`canon/principles/ownership-outlives-the-build.md`) — the sibling principle: what the decision costs; this one says who must have answered on it.
- **Library, Not Hand-Rolled** (`canon/methods/library-not-hand-rolled.md`) — the method both principles produce for load-bearing infrastructure; its red flag is one hold under this principle.
- **Contract Governs Handoff Drift** (`canon/principles/contract-governs-handoff-drift.md`) — a session artifact cannot override canon; a review record with missing answers is such an artifact.
- **Axioms** (`canon/values/axioms.md`) — a claim is a debt; "this was reviewed" is a claim that every registered answer is the evidence for.
