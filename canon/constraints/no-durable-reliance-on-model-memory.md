---
uri: klappy://canon/constraints/no-durable-reliance-on-model-memory
title: "No Durable Reliance on Model Memory — Durable State Lives in Canon or the Board, Never in the Instance"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraint", "model-memory", "durable-state", "instance-side", "multi-device", "multi-client", "canon", "board", "flight-deck", "dry", "e0010"]
epoch: E0010
date: 2026-07-15
derives_from: "canon/bootstrap/boarding-pass.md, canon/bootstrap/flight-deck-model.md, canon/principles/dry-canon-says-it-once.md, canon/values/axioms.md"
complements: "canon/constraints/fresh-copy-from-source-of-truth.md, canon/bootstrap/model-operating-contract.md, canon/constraints/encode-epistemic-decisions.md"
governs: "Where durable state — policy, rulings, conventions, project/mission state, decisions — is allowed to live; specifically that it may never live in the model's instance-side memory system"
status: active
target_repo: "outcomes-driven-development"
---

# No Durable Reliance on Model Memory — Durable State Lives in Canon or the Board, Never in the Instance

> Captain's ruling, 2026-07-15: "NEVER rely on [the model's] memory for anything durable — it violates multi-device / client / user and makes a shitty experience." Nothing durable — policy, rulings, conventions, project state, decisions — may live in the model's instance-side memory system. Durable state lives in exactly two places, both fetched live: canon for governance, the board/log for mission state. The model's memory is per-instance, invisible to the captain, and NOT shared across devices, clients, or users, so anything stored there is silently lost or divergent on the next surface. If something feels worth remembering, that feeling is the signal to write it to canon or the board via a flight — never to memory.

## Description

The model's memory system is instance-side state. It is not shared across the captain's phone and laptop, not shared across clients, not shared across users, and not visible to the captain at all. A ruling stored there exists on exactly one surface and vanishes or diverges the moment the captain opens another. That is the "shitty experience" the ruling names: the system appears to know something on one device and to have forgotten it on the next, with no way for the captain to see, audit, or correct the discrepancy.

This constraint states the destination rule the flight deck and the boarding pass already imply. `canon/bootstrap/boarding-pass` established that reliance moves to the two instruction layers the maintainer authors and controls — never the model's memory system, which is instance-side state the maintainer cannot see. `canon/bootstrap/flight-deck-model` established that the manual is consulted, never recited from memory, because nothing on the model's side learns durably; the knowledge base does. `canon/principles/dry-canon-says-it-once` establishes that the truth is said once, in the authoritative place, and fetched — not copied into a second store that then drifts. This constraint composes those into one falsifiable rule about durable state's *home*.

The rule is one line: durable state lives in canon or on the board, fetched live; the model's memory holds nothing the next surface needs.

## Operating Constraints

- MUST store all durable governance — policy, rulings, conventions, decisions — in canon, fetched live, never in the model's memory system.
- MUST store all durable mission state — project status, board items, log entries — on the board/log, fetched live, never in the model's memory system.
- MUST NOT persist any durable fact in instance-side memory as the system of record, because it is per-instance and not shared across devices, clients, or users.
- MUST treat "this feels worth remembering" as the trigger to write to canon or the board via a flight, not to store in memory.
- MUST read durable state from its live source at the moment of use rather than from anything recalled instance-side.

## Defaults

- Prefer a canon write (a flight that lands a doc) over "I'll remember that" for any rule, convention, or ruling.
- Prefer a board/log write over holding project state in the session when the state must survive the session or reach another surface.
- Prefer fetching the current value live over trusting a value carried from earlier, when the value is durable and load-bearing.
- When the captain states something that should persist, route it to its home (canon or board) and confirm the write, rather than acknowledging it as remembered.

## Failure Modes

- **Memory as System of Record**: a ruling, convention, or decision held in instance-side memory, so it exists on one surface and is absent on the next.
- **Silent Divergence**: the same "remembered" fact differing across the captain's devices or clients, with no way for him to see or reconcile it.
- **Remember-Instead-of-Write**: treating "worth remembering" as a memory action rather than the signal to write canon or the board.
- **Invisible State**: durable state the captain cannot audit or correct because it lives where he cannot see it.
- **Recited Durable Fact**: acting on a durable value recalled instance-side instead of fetched from its live source.

## Verification

- Every durable ruling, policy, or convention has a home in canon, not in model memory.
- Every durable project/mission fact has a home on the board/log, not in model memory.
- No durable fact is treated as authoritative on the basis of instance-side recall.
- Items the captain marks as worth keeping are written to canon or the board via a flight, and the write is confirmed.
- The same durable fact reads identically regardless of device, client, or user, because it is fetched from one shared source.

## What This Does Not Claim

This bans DURABLE reliance on memory, not all within-session working state.

- It does NOT prohibit ephemeral within-session working state. Holding the current task's scratch context, the thread of the conversation, or intermediate reasoning for the duration of a session is normal and fine.
- It does NOT require writing every transient thought to canon; only state that must survive the session or reach another surface is durable and therefore homed in canon or the board.
- It does NOT concern the human's own notes or memory; it governs where the *system's* durable state lives, which must be the shared, fetchable sources.
- It does NOT invent new law. It composes the boarding pass's and flight deck's existing "never the model's memory" reflex with DRY's single-home rule; where this doc and a parent differ, the parent governs its own domain and this constraint yields.

## Why This Is Necessary

The captain works across devices, clients, and — for shared surfaces — potentially other users, and the system's whole value depends on it presenting one coherent, auditable state everywhere. Instance-side memory cannot deliver that: it is a private, invisible, per-surface store that the captain can neither see nor correct, so anything durable placed there fractures the experience the moment he changes surface. Canon and the board are the shared, fetchable, auditable homes; routing every durable fact to one of them is what keeps the system coherent across the surfaces the captain actually uses.

## See Also

- [The Boarding Pass](/canon/bootstrap/boarding-pass.md) — reliance moves to the layers the maintainer controls, never the model's memory system
- [The Flight Deck Model](/canon/bootstrap/flight-deck-model.md) — the manual is consulted, never recited from memory; the knowledge base learns durably, the model does not
- [DRY — The Canon Says It Once](/canon/principles/dry-canon-says-it-once.md) — the truth is said once in its authoritative home, not copied into a drifting second store
- [Fresh Copy From the Source of Truth](/canon/constraints/fresh-copy-from-source-of-truth.md) — the filesystem-side sibling of this memory-side rule
- [Encode Epistemic Decisions](/canon/constraints/encode-epistemic-decisions.md) — how decisions are written so settled ground stays settled
- [Constraints](/canon/constraints/README.md)
