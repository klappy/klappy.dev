---
uri: klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer
title: "Ratified Model Requires Reconciliation and an Enforcer — A Ruled Design Must Bind the Code"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: draft
tags: ["canon", "constraint", "ratification", "data-model", "reconciliation", "convention-requires-an-enforcer", "drift", "prompt-over-code", "ars"]
epoch: E0010
date: 2026-07-16
derives_from: "docs/appendices/convention-requires-an-enforcer.md, canon/principles/prompt-over-code.md, canon/principles/vodka-architecture.md, canon/values/axioms.md, outputs/debrief-ars-monolith-2026-07-16.md"
complements: "canon/constraints/release-validation-gate.md, canon/constraints/frontmatter-validation-before-merge.md"
governs: "Any program in which the captain ratifies a data model, schema, or design invariant that running code is expected to honor. Binding on every seat that ships an implementation against a ruled model — the reconciliation is owed, and an enforcer must make the drift impossible to ship silently."
status: draft
target_repo: "klappy.dev"
---

# Ratified Model Requires Reconciliation and an Enforcer — A Ruled Design Must Bind the Code

> **Posture:** DRAFT — filed 2026-07-16 as the durable lesson from the ARS one-blob
> monolith write-freeze (see `outputs/debrief-ars-monolith-2026-07-16.md`). The
> constraint below awaits the captain's ratification. It is authored in the captain's
> voice and must not be merged until he reviews the exact text.

> A ratified model is a debt against the code, not a decoration on it. When the captain
> rules a data/design model, the implementation MUST be reconciled to that model — or a
> tracked, dated exception MUST be logged naming the divergence and its owner. And
> because a ruling that no machine checks is a convention, an **enforcer must exist that
> flags code diverging from a ratified model**. Ratification without reconciliation, and
> reconciliation without an enforcer, are the two halves of the same silent-drift failure.

---

## Summary — What Must Be True Once a Model Is Ruled

Two rules bind from the moment the captain ratifies a model that code is expected to honor.

**First, the implementation is reconciled to the ratified model, or an exception is tracked.**
A ruling is not satisfied by a commit subject that says the code "owes the reconciliation."
The debt must be made visible and closeable: either the store/schema is brought into line
with the ruled model, or a dated exception record is logged that names precisely how the
code diverges, why, and who owns closing it. "Ruled but not yet reconciled" is a legitimate
state only when it is *recorded* as such. Silent divergence is not.

**Second, an enforcer flags divergence from the ratified model.**
Per `docs/appendices/convention-requires-an-enforcer`, a convention without an enforcer is a
ritual with a deadline: under pressure it is skipped, and over time "everyone knows the code
should match the ruling" decays. The enforcer need not be clever — a CI check, an oddkit
preflight, or a schema invariant that fails when a ratified model has no matching
reconciliation record (or logged exception) is enough. Its only job is to make ruled-vs-shipped
drift impossible to merge without someone seeing it. This is the same shape as
`canon/constraints/release-validation-gate`: convention is optional; convention plus an
enforcer is binding.

---

## The Motivating Case — The ARS One-Blob Monolith

On **2026-07-10** the captain ruled the ARS data model: *flat records + provenance, the board
a projection of a flat store* (`agent-role-service` `docs/policy/ars-data-model-philosophy.md`,
`status: active`). An earlier ratification (commit `f7fdeb8`, 2026-07-08) had already recorded
that *"code owes the reconciliation."*

But the store had been **built on 2026-07-07/08** as the opposite shape: the AccountDO wrote
**all** state — sessions, leases, board, and a 2000-row log — as one plain-JSON object under a
single key. `src/core/state.js`: *"Everything here is plain JSON, serializable in one storage
write."* `src/do.js`: `await this.ctx.storage.put(STATE_KEY, this.state)`.

Nothing reconciled the pre-existing monolith to the ruling, and no enforcer flagged that the
shipped store contradicted it. Six days later, on **2026-07-16**, the single value outgrew the
Durable Object SQLite ceiling and the write path froze — `SQLITE_TOOBIG`
(fix branch `fix/ars-do-write-freeze-sqlite-maintenance`). The mechanical cause was the
un-reconciled, un-enforced drift between a ruled model and the running code.

---

## Why This Is a Tier-1 Constraint

The failure is not specific to storage. It is the general failure of a ruling that lands in
`docs/policy/` while the code keeps its old shape and no mechanism ever compares the two. Prompt-over-code
governance (`canon/principles/prompt-over-code`) only holds when a ruling actually reaches the
enforcer surface. A ratified model that the code is free to ignore is not governance — it is a
document. This constraint closes that gap: the ruling creates a reconciliation obligation, and
the enforcer makes the obligation mechanical.

---

## Relationship

- Rests on `klappy://docs/appendices/convention-requires-an-enforcer` — the rationale that a
  convention without a mechanical enforcer decays.
- Mirrors `klappy://canon/constraints/release-validation-gate` — the sibling constraint of the
  same "convention plus an enforcer is binding" shape, for the ship pipeline.
- Serves `klappy://canon/principles/prompt-over-code` — governance is programmable only when
  rulings reach an enforcer.
- Motivating evidence: `outputs/debrief-ars-monolith-2026-07-16.md` (the black box for the ARS
  monolith write-freeze).
