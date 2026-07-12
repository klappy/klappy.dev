---
uri: klappy://docs/oddkit/release-notes/2026-07-12-let-the-gates-govern
title: "Release Notes — Let the Gates Govern (2026-07-12): The Gates Are the Approval, and Now a Mechanism Says So"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "dispatcher", "cdo", "otto", "ratification", "gates-govern", "open-fork", "enforcement", "dispatch-guard", "gate"]
epoch: E0010
date: 2026-07-12
derives_from: "canon/constraints/dispatcher-dispatches-never-executes.md, canon/bootstrap/otto-operating-card.md, odd/gate/transitions.md, odd/gate/prerequisites.md"
governs: "How the dispatch seat orients to the ratification trip-wire and its enforcement layers after this merges"
target_repo: "undecided"
---

# Release Notes — Let the Gates Govern (2026-07-12)

## What this changes

The dispatcher rule grew its third face. The seat had learned not to execute in-seat and not to offload work to the captain — and started inserting the captain as an **approval step** instead: re-asking him to approve/ratify/bless decisions already made, serializing settled work through itself, producing "please approve" artifacts for settled calls. Captain ruling 2026-07-11: once direction is set, the gates/modes govern the agents — **the gates ARE the approval.** This release names the manufactured ratification gate a violation of the same family, gives the seat decision-moment triggers, and ships enforcement in the same three layers as the offload trip-wire.

## The three layers

1. **Dispatch-guard hook** (`klappy/agent-role-service` `templates/role-repo/hooks/dispatch-guard.mjs`, ratification wire landed 6d65384, PR #26; 238 tests): `PreToolUse` denies captain-facing messages that carry a ratification ask, and `Stop` blocks turn-end on the same, with the ruling fed back verbatim: *this is settled — let the gates govern, proceed.* Ratification verbs (ratify / rubber-stamp / ask-shaped re-approve / blessing asks) fire on their own; plain approval asks (do you approve / please confirm / shall I proceed / awaiting your approval) fire only alongside a settled-record marker (already decided / per the ruling / direction is set / decision record / confirmed GO). `HUMAN-ONLY(approval)` does **not** exempt — that class is for genuinely-open grants. The only pass is `OPEN-FORK(<the named fork>)`.
2. **Gate rule** (`klappy://odd/gate/transitions`, this repo): new `settled-direction-ratification` transition detects approval-shaped escalations and demands `open_fork_cited` (`klappy://odd/gate/prerequisites`) — the ask must affirmatively name the genuinely-open fork the gates cannot resolve, or it comes back NOT_READY.
3. **Canon triggers** (`klappy://canon/constraints/dispatcher-dispatches-never-executes` § Let the Gates Govern): the decision-moment triggers, the proceed-under-the-gate move, and the closed OPEN-FORK exception, boarded at session start.

## What the seat does after this lands

- About to ask "do you approve…?" about a recorded decision, a confirmed GO, a ruling, or canon → **proceed under the gate**; passing the gate is the approval, and there is no second, human-shaped copy of it.
- A genuinely-open fork the gates cannot resolve → escalate it **named**: `OPEN-FORK(<the fork>): …` with the open options stated. Naming the fork is what makes the assertion auditable.
- Never tag a re-approval `HUMAN-ONLY(approval)` — that class covers open grants (spend, promotion, quorum not yet given), and re-asking a settled call is exactly the failure this legislates.

## The honest limit

Two residues, stated plainly. First, the shared lexical bound: a genuinely novel phrasing slips once, then the debrief adds it to the phrasebook with a test. Second, one specific to this wire: it catches asks that are lexically self-incriminating (ratification verbs, or approval asks co-occurring with settled-record markers), but an approval ask that *omits* any mention the decision was made reads identically to a genuinely-open one — no lexical scan, hook or gate, can consult the decision record itself. The gate's `open_fork_cited` prereq carries that residue by inverting the burden: instead of detecting settledness, it demands proof of openness, which the presence-based matcher *can* check — and an ask ratifying a settled decision has nothing to cite. Full detail: `klappy://canon/constraints/dispatcher-dispatches-never-executes` § Enforcement.
