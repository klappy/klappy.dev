---
uri: klappy://docs/appendices/epoch-11
kind: docs
title: "Epoch 11 — Seat to Loop: The Gate Becomes the Verdict"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["epoch", "E0011", "two-loop", "policy-first", "policy-precedes-build", "gated-loop", "fresh-session-gates", "ratification", "governance", "experiment"]
epoch: E0011
date: 2026-07-17
derives_from: "docs/appendices/epoch-10.md, docs/appendices/epoch-9.md, canon/architecture/two-loop-operating-model.md, canon/constraints/policy-precedes-build.md, canon/constraints/ratified-model-requires-reconciliation-and-enforcer.md, canon/meta/enforceable-policy-anatomy.md, canon/principles/policy-first-self-building-self-documenting.md, canon/constraints/governance-change-discipline.md, canon/principles/verification-requires-fresh-context.md"
complements: "canon/bootstrap/model-operating-contract.md, canon/bootstrap/flight-deck-model.md, canon/the-directors-chair-vision.md, canon/constraints/dispatcher-dispatches-never-executes.md"
governs: "The evaluation reality for all production work from declaration forward: what 'done' means when a valid outcome is one that descended from ratified policy through the gated loop for every role, and the mandatory evidence (gate-passage receipts plus fresh validation) that a build must carry"
status: "DECLARED — 2026-07-17, by maintainer ratification"
---

# Epoch 11 — Seat to Loop: The Gate Becomes the Verdict

> Epoch 9 retired the operator as the wire; the substrate became the wire. Epoch 10 retired the costume; the seat replaced it. Epoch 11 retires the seat as the unit of trust; the loop replaces it. The axioms don't change. The canon doesn't change. The oddkit tools don't change. The seat and the boarding frame E0010 established don't change — a model still boards, still runs the clock, still challenges in both directions. What changes is what makes an outcome *valid*. Under E0010 a correctly boarded seat was the thing we trusted; the ARS monolith freeze of 2026-07-16 proved a seat can board perfectly and still build a thing no policy ever authorized, because code ran ahead of policy and no enforcer could measure the drift. Epoch 11 answers with the loop as the universal production frame. A valid outcome is one that descended from ratified policy, through the gated loop — exploration → policy → PRD → build → validate — fresh-validated at every gate, for *every* role, not just the seated model. The new binding contract is `policy-precedes-build`. The new mandatory evidence is gate-passage receipts. The gate stops being a checkpoint the work passes through and becomes the verdict on whether the work is real. Declared as an experiment: the same honest stakes and retraction conditions Epoch 10 put on the record.

---

## Summary — The Loop Is the Universal Production Frame

Everything E0010 seated is carried forward intact. The axioms, the canon corpus, the oddkit actions, the storage model, the publish gauntlets, and the boarding frame — creed, axioms, time rule, and a pointer to the operating contract — all remain exactly as Epoch 10 left them. A model still takes the first officer's seat; the seat is not deprecated. What Epoch 11 changes is the level at which trust is located.

E0010 located trust in the *seat*: a session that boarded the operating contract, ran its rhythm, and challenged in both directions was trusted to produce good work. That was a real advance over the costume, and it holds — for the seat's own conduct. What it does not cover is the relationship between a seat's output and the intent that was supposed to govern it. A boarded seat, following every procedure, can still write code that no ratified policy authorized, because boarding governs *how the seat behaves* and says nothing about *what the build is allowed to descend from*.

Epoch 11 supplies the missing frame. The system runs on two loops joined at ratification (`canon/architecture/two-loop-operating-model`). The outer collaboration loop — operator and CDO seat — trades direction and translated intent in natural language and produces decisions and ratifications, never code. The inner production loop turns ratified policy into PRDs into builds into validated outcomes, each stage consuming only the *ratified* output of the stage before it, each gate a fresh session so nothing certifies its own work. The two loops touch at exactly one seam: ratification, running both directions. Inside that inner loop lives the load-bearing rule — `policy-precedes-build` — and the mandatory evidence that makes it checkable: gate-passage receipts. This is the era where "the agent should build the right thing" is replaced by "the agent structurally cannot build a thing the policy has not authorized."

## The Forcing Fault — A Seat Can Board Correctly and Still Build the Wrong Thing

On 2026-07-16 the ARS monolith hit a `SQLITE_TOOBIG` write-freeze. The proximate error was a size limit; the structural cause was ordering. Code had run ahead of policy, so when the build wanted a governing intent to build *from*, there was none — and because no ratified policy existed, no enforcer could measure the drift between what was built and what was intended.

Under E0010's frame this failure is invisible, because the seat did nothing wrong by E0010's own lights: it boarded, it ran the rhythm, it produced artifacts. The failure lives one level up, in the relationship between the artifact and the intent. E0010 has no invariant there. That gap — a correctly boarded seat producing an unauthorized build with no enforcer to catch it — is the forcing fault that makes the seat insufficient as the unit of trust and forces the loop to become the frame.

## What Changed

Three things become binding at declaration, and together they move the locus of validity from the seat to the loop.

### The Binding Contract — Policy Precedes Build

The new binding contract is `policy-precedes-build` (`canon/constraints/policy-precedes-build`): no implementation, build, or deploy proceeds without a **ratified, enforceable governing policy** that states what is being built and why. The canonical order is **design → policy (→ PRD) → build**, never code-first. The policy must be **ratified** (committed and accepted by the scope's authority, not held in memory), **derivable** (precise enough that the implementation follows from it — self-building), and **cited** (every build artifact references its governing policy URI — self-documenting). This is fleet-wide canon, not a per-task instruction the operator restates: it binds every seat, flight, and project automatically. Policy-first is universal in *order*; policy *weight* scales with project maturity, so a Level-0 spike may be governed by a single ratified sentence while a Level-2 build carries a full policy and PRD.

### The Mandatory Evidence — Gate-Passage Receipts and Fresh Validation

E0003 made deployment evidence mandatory. E0008 made infrastructure observable. E0011 adds a new class of mandatory evidence: **gate-passage receipts**. An outcome is not valid because a capable seat produced it; it is valid because it descended, stage by stage, through the gated loop, and each gate ran in a **fresh session** so no stage certified its own work (`canon/principles/verification-requires-fresh-context`). Design outputs — policies and PRDs — pass the oddkit gauntlet as a *refinement loop*: a "clean" gate means the challenge's findings were folded back into the artifact before ratification, not that none were found. The build passes fresh-context validation plus tests. The receipt of that passage — which gate, which fresh session, what it found and how it was folded — is the evidence the outcome must carry. A build with no gate-passage trail is unproven regardless of how good it looks.

### The Universal Scope — Every Role, Not Just the Seated Model

The loop is not a discipline that applies only to the model in the chat window. It is the production frame for *every* role on the team — Director, planner, builder, validator, the CDO seat, human and agent alike. Every role runs the same loop against the same Knowledge Base; every role's output is valid on the same terms: it descended from ratified policy through the gated loop and carries its gate-passage receipts. The frame is what makes the roles comparable, and it is what makes "done" mean the same thing whoever produced the work.

## What Carries Forward Unchanged

Epoch 11 changes the frame, not the foundation. Carried forward exactly as prior epochs left them:

The four **axioms** and the orientation creed (E0005) are untouched — E0011 is a direct application of Axiom 2 (a build is a claim about intent; without a cited policy the claim has no evidence) and Axiom 4 (an intent never written cannot be verified against the build). The **canon corpus** and its tiers are unchanged. The **oddkit** actions — time, orient, search, preflight, gate, challenge, validate, encode — are unchanged; E0011 leans harder on gate and validate but adds no new tool. The **seat and the boarding frame** E0010 established — the operating contract fetched on the first substantive turn, the clock every turn, the sterile cockpit in execution, the cross-check both directions, the black box and the debrief — remain the way a model boards and behaves. The seat is not retired; it is placed inside a loop that now governs what its output must descend from.

## Scope Boundary — What This Epoch Does and Does Not Touch

E0011 governs the **evaluation reality for production work**: what makes an outcome valid, what evidence a build must carry, and the order every build must follow. It does **not** modify the boarding wrapper (that is E0010), the substrate stack or the wire (that is E0009), the proactive posture (E0007), observability (E0008), scoped truth and operator governance (E0006), or the axioms and creed (E0005). It does not rebuild anything and it does not add a folder taxonomy. It is a shift in the fitness landscape — a change in what "done" and "mandatory evidence" mean — and nothing below that line moves.

## The Relabel Scope — What Becomes E0011, What Stays, What Keeps Its Own Epoch

This epoch is declared by authoring the epoch write-up first; the frontmatter relabel of the loop-frame canon to `E0011` is the **follow-up step**, executed after this declaration exists. It is documented here so the boundary is ratified before it is applied. The loop-frame canon presently carries `epoch: E0010` (it was authored inside the E0010 window); the relabel corrects that to the epoch it actually defines.

**Relabel to E0011 — the docs that DEFINE the universal frame:**

- `canon/architecture/two-loop-operating-model` (PR #291) — the frame itself: the collaboration loop, the production loop, and the ratification seam that joins them.
- `canon/constraints/policy-precedes-build` (PR #290) — the binding contract: design → policy (→ PRD) → build, fleet-wide.
- `canon/constraints/ratified-model-requires-reconciliation-and-enforcer` (PR #288) — the model-specific instance of the general rule; ratification is a debt against the code, and an enforcer must make the drift impossible to ship silently.
- `canon/meta/enforceable-policy-anatomy` (PR #289) — the five-part enforceable-policy template (WHAT · WHY · ENFORCEMENT · SCOPE · VERIFICATION) that makes a policy buildable-from rather than advisory.
- `canon/principles/policy-first-self-building-self-documenting` (PR #289) — the principle that policies authored first and precisely make code self-building (derivable) and self-documenting (cited).

**Stays E0010 — the seat/boarding wrapper the loop runs inside:**

`canon/bootstrap/model-operating-contract`, `canon/bootstrap/flight-deck-model`, `writings/crew-not-clone`, `docs/appendices/epoch-10`, and the dispatcher/gates constraint `canon/constraints/dispatcher-dispatches-never-executes` together with its release notes. These define how a seat boards and behaves; they are governed by the loop but do not define it.

**Keeps its own epoch — the work that RUNS THROUGH the loop:**

The ARS policy set, its ADR, and its PRD (`canon/constraints/ars-bounded-storage` and companions) are *instances* that flow through the production loop; they are not restamped. They are governed by the frame, not constitutive of it.

**The rule that resolves every case:** a document is relabeled to E0011 only if it **defines** the universal frame. If it is merely **governed by** the frame — a seat wrapper, or a concrete build that runs through the loop — it keeps its epoch. Define the frame → E0011. Governed by the frame → unchanged.

## Prior Art and Honest Limits

Three honesty notes, folded from the declaration gauntlet:

**The loop is not newly coined.** ODD already named the loop — `docs/planning/the-loop-every-role-same-infrastructure` ("converse → generate → validate → promote or pivot") and `canon/the-frame`, with lineage back to Boyd's OODA (`canon/resonance/ooda-loop`). E0011 does not invent the loop; it *promotes the already-named loop from a description of how the team works to the condition an outcome must satisfy to count as valid.* The novelty is the elevation to validity condition and the binding contract (`policy-precedes-build`) that lives inside it, not the loop itself.

**The forcing evidence is, so far, a single incident.** The ARS monolith freeze (2026-07-16) is one data point, not a series. The frame is a strong response to a demonstrated failure, but the claim that gating every production outcome eliminates that class of failure across the fleet is a working belief under test, not an established fact. This is why the epoch is declared as an experiment rather than a settled result, and why the retraction conditions below are on the record.

**The alternative is named, not ignored.** The considered alternative is to keep the loop as *recommended discipline* — the E0010 posture, where a well-boarded seat is trusted and the loop is advice — rather than promoting it to a *validity condition*. E0011 chooses the stronger form because discipline-without-enforcement is exactly the convention-decays failure the ARS incident exemplified. If that choice proves to be ceremony, the retraction clause reverts precisely to the named alternative.

## What This Epoch Is Measured Against

An epoch is a named period whose success criteria are stable enough to compare outcomes. E0011's criteria, stated at declaration so the comparison is honest:

A production outcome counts as **loop-valid** when it can show the trail: a ratified governing policy it descended from, the PRD (where maturity requires one) derived from that policy, and gate-passage receipts from fresh sessions at each stage, with the build artifact citing its governing policy URI. The epoch **succeeds** if loop-valid outcomes eliminate the ordering failure the ARS freeze exemplified — code standing where ratified policy should have stood first — and if the maintainer's attention shifts from catching unauthorized builds after the fact to ruling on policy at the ratification seam before the build exists. The comparison baseline is the ARS monolith incident (2026-07-16): a boarded seat producing an unauthorized, unenforced build under E0010's frame, which E0011's frame is designed to make structurally impossible to ship silently.

## Retraction Conditions — The Experiment Clause

This epoch is declared as an experiment, not a victory. Revert to E0010's seat-as-unit-of-trust frame (loop as recommended discipline rather than validity condition) if, across a meaningful sample, the loop's gates prove to be ceremony that does not reduce unauthorized or drift-ridden builds, or if requiring policy-before-build at every maturity level reproduces the "rigor too early kills creativity" failure `odd/maturity.md` exists to prevent — that is, if policy-first *order* cannot be held without dragging production-grade *weight* onto exploratory work. The seat, the boarding frame, and everything below the loop are unaffected by any such reversion; that is the point of changing only the frame.

## Documents Introduced

This epoch lands its declaration trio under `Canon 0.42.0` with all four `governance-change-discipline` markers:

- `docs/appendices/epoch-11.md` (this file) — the canon appendix declaring the epoch and documenting the relabel scope.
- `docs/appendices/epochs.md` — registry entry for E0011 (and backfilled entries for E0009 and E0010, whose appendices existed without registry lines).
- `canon/CHANGELOG.md` — version bump 0.41.0 → 0.42.0 with the E0011 entry.
- `docs/oddkit/release-notes/2026-07-17-epoch-11-seat-to-loop.md` — what changes for operators and agents after this lands.

The loop-frame canon this epoch declares — `two-loop-operating-model`, `policy-precedes-build`, `ratified-model-requires-reconciliation-and-enforcer`, `enforceable-policy-anatomy`, and `policy-first-self-building-self-documenting` — is authored in PRs #288–#291. Its frontmatter relabel from `E0010` to `E0011` is the follow-up step scoped above; this declaration does not restamp it, because the write-up is the declaration and the relabel follows the declaration.

## Lineage

E0005 grounded the system in values. E0006 made truth scoped and the operator governed. E0007 made the system proactive. E0008 made it observable. E0009 made the substrate the wire and the knowledge base the unit. E0010 seated the model as crew. E0011 makes the loop the frame every seat produces inside. Each era kept everything the prior one proved and changed the one thing the prior one exposed: this time, that a seat which boards correctly can still build a thing no policy authorized — so trust moves from the seat to the loop the seat runs inside, and the gate stops being a checkpoint and becomes the verdict.

## See Also

- `klappy://canon/architecture/two-loop-operating-model` — the frame this epoch declares
- `klappy://canon/constraints/policy-precedes-build` — the binding contract
- `klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer` — the model-specific instance
- `klappy://canon/meta/enforceable-policy-anatomy` — the five-part enforceable-policy template
- `klappy://canon/principles/policy-first-self-building-self-documenting` — policy-first as self-building and self-documenting
- `klappy://canon/principles/verification-requires-fresh-context` — why every gate is a fresh session
- `klappy://docs/appendices/epoch-10` — the seat/boarding wrapper this epoch runs inside
- `klappy://docs/appendices/epoch-9` — substrate becomes the wire
- `klappy://canon/constraints/governance-change-discipline` — the four markers this trio carries
- `klappy://docs/oddkit/release-notes/2026-07-17-epoch-11-seat-to-loop` — what changes after this lands
