---
uri: klappy://canon/principles/working-state-is-per-actor-and-self-owned
title: "Working State Is Per-Actor and Self-Owned — Shared Residue Is Indistinguishable from Signal"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "principles", "epistemic-hygiene", "working-state", "isolation", "ownership", "residue", "substrate-independent"]
epoch: E0010
date: 2026-07-17
derives_from: "canon/values/axioms.md (Axiom 1 — Reality Is Sovereign; Axiom 3 — Integrity Is Non-Negotiable Efficiency)"
generalizes: "docs/decisions/D0004-repo-truth-cleanup-mandatory.md, docs/appendices/repo-truth.md"
complements: "canon/constraints/humans-are-variable-inputs.md, canon/principles/scoped-truth.md, canon/principles/scope-over-folders.md"
governs: "Any actor (human, agent, or process) that holds mutable working state on a substrate a later or concurrent actor can also reach — repositories, temp directories, sandboxes, caches, build trees, shared branches, scratch files."
target_repo: "outcomes-driven-development"
---

# Working State Is Per-Actor and Self-Owned — Shared Residue Is Indistinguishable from Signal

> Working state must be per-actor and self-owned. Shared mutable residue is indistinguishable from signal, so a dirty workspace invalidates the conclusions drawn from it.

---

## Summary — The Universal Law

When more than one actor can write to the same mutable location, and that location is not reliably wiped between them, whatever the previous actor left behind arrives at the next actor's boot indistinguishable from the next actor's own intentional state. The next actor cannot tell residue from signal by inspection — the bytes look the same. Any conclusion drawn from a workspace in that condition inherits the ambiguity: it may be reading its own work, or it may be reading a ghost.

The law has two clauses, and both are load-bearing:

1. **Working state must be per-actor and self-owned.** Each actor mints its own uniquely-named, self-owned working area, does all mutable work inside it, and is the sole owner of what it contains. Ownership is not a courtesy — it is what makes "whose state is this?" answerable without guessing.
2. **Shared mutable residue is indistinguishable from signal.** Because residue cannot be told apart from intentional state, a workspace carrying another actor's residue is *dirty*, and a dirty workspace invalidates the conclusions drawn from it.

The remedy is never "remember to clean up." A system whose failure analysis reads "the actor forgot to…" has already violated `canon/constraints/humans-are-variable-inputs.md`. The remedy is structural: make per-actor, self-owned working state the path of least resistance, and make teardown mechanical rather than remembered.

---

## Why It Is Universal — Abstraction Matches Scope

This principle belongs in canon, not in any one repository, because it is falsified only by something that reaches *every* actor and *every* substrate at once — not by any single stack changing. The claim does not depend on git, on a filesystem, on `/tmp`, on a particular operating system, or on a particular tool. It depends only on two facts that hold across substrates: that state can be shared, and that shared mutable state cannot self-identify its owner. Swap the substrate — object store, database scratch schema, cache namespace, message queue, in-memory arena — and the law is untouched. That invariance under substrate change is the mark of a universal, and it is why the abstract law lives up here while every substrate-specific mechanism that realizes it lives down in its own repository and derives from this.

The distinction is deliberate. A document that a change in one stack would falsify is scope-bound to that stack. A document that survives every such change is canon. This principle is the second kind; the mechanisms that enforce it are the first kind.

---

## The Instances — This Law, Realized on Concrete Substrates

This principle did not appear from theory. It is the generalization of a rule the canon already stated for one substrate, plus a second substrate that surfaced the missing half.

- **Git repositories.** `docs/decisions/D0004-repo-truth-cleanup-mandatory.md` and `docs/appendices/repo-truth.md` already state the epistemic-hygiene clause for the repository: *if the repository is dirty, conclusions drawn from it are invalid*, because *state residue is indistinguishable from signal*. Orphaned worktrees, detached HEADs, and stale branches are the git-substrate form of shared residue. D0004/repo-truth is this principle applied to one substrate — and it is why this principle is a generalization, not a new invention.
- **Per-flight agent sandboxes.** A flight (agent session) that writes to a fixed shared path such as `/tmp/pr_body.md` in a sandbox whose `/tmp` persists across flights inherits the prior flight's file — the observed cause of wrong-content PRs and git-lock failures. The substrate-specific mechanism that realizes this law there (per-flight `mktemp -d` scratch, no fixed shared temp names, mechanical teardown) lives in `agent-role-service` and derives from this principle. See `klappy://ars/policy/sandbox-hygiene-per-flight-scratch`.

D0004/repo-truth carried the second clause well for git. What it did not carry — because a single repository over sequential attempts did not force the question — is the first clause: **per-actor self-ownership**. The sandbox instance forced it, because there residue is owned by *another actor* (`nobody:nogroup`), and ownership, not just cleanliness, is what the next actor must be able to establish. This principle states both clauses so any future substrate inherits the whole law, not half of it.

---

## The Test — Three Questions for Any Working Substrate

1. **Is the working area per-actor and uniquely named?** If two actors can land on the same path by default, isolation depends on discipline, and discipline is a variable input.
2. **Is ownership self-evident?** Can the current actor establish, without guessing, that the state it is reading is its own — or is foreign-owned residue indistinguishable from its own writes?
3. **Is teardown mechanical, not remembered?** If cleanup lives in a human's or an agent's memory rather than in an exit-trap, a lint, or the launch environment, it will decay to advice and then to residue.

A substrate that answers "no" to any of these produces conclusions that cannot be trusted, regardless of how correct the work inside it looks.

---

## Derivation

From **Axiom 1 (Reality Is Sovereign):** an actor may only assert what it has observed. When residue is indistinguishable from signal, the actor has not actually observed its own state — it has observed an ambiguous surface and assumed authorship. The assumption is the violation.

From **Axiom 3 (Integrity Is Non-Negotiable Efficiency):** a false "this is my clean workspace" costs more than an honest "I cannot tell whose state this is." Per-actor self-ownership is what converts the second, honest statement into a non-issue: the actor owns its area, so the question does not arise.

It complements `canon/constraints/humans-are-variable-inputs.md` (isolation must not depend on anyone remembering to clean up), `canon/principles/scoped-truth.md` (universal laws travel; substrate detail stays in its lane), and `canon/principles/scope-over-folders.md` (meaning and ownership are declared, not inferred from where a thing happens to sit).

---

## What This Does Not Require

It does not require that actors never share data — deliberate, named, read-only handoffs between actors are fine and often necessary. The law governs *mutable working state*, not intentional shared artifacts. The failure mode is unowned, unnamed, mutable residue silently inherited; the remedy is ownership and isolation of working state, not the abolition of sharing. Nor does it mandate any particular mechanism: `mktemp -d`, a per-run container, a namespaced cache key, and a scratch schema are all valid realizations. The principle fixes the invariant; each substrate chooses its enforcer.

## Resumability Is Explicit, Not Default

The two clauses above fix the default: working state is per-actor and self-owned, and nothing carries over between actors on its own. Carryover — resuming or continuing from a prior actor's state — is therefore never assumed; it is a deliberate, named, opt-in act. State does not carry over by default. When it does carry over, it does so because some actor named the handoff and chose to inherit from it — not because residue was silently present and got read as signal.

This is the positive statement of the carve-out in "What This Does Not Require": deliberate, named handoffs are permitted precisely because they are the opposite of inherited residue. A named seed is owned, addressed, and chosen; residue is unowned, unaddressed, and assumed. The distinction is not cleanliness but intent — resumption is legitimate only when an actor opts into a specific prior state by name, and illegitimate when a prior state merely happens to still be lying in the working area.

It complements `canon/principles/verification-requires-fresh-context.md` — every verification gate starts from clean context rather than inherited state — and it rhymes with the flight-seed mechanism, where a session resumes only from an explicit seed it was handed, not from whatever the last session left behind.

> **Folded in at low resolution.** This clause is recorded here as a complementary part of the working-state law for now. If it earns the weight, it may be spun into its own principle later; until then it lives here as the named exception that completes the default the two clauses establish.
