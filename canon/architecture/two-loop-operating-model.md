---
uri: klappy://canon/architecture/two-loop-operating-model
title: "The Two-Loop Operating Model — The Collaboration Loop and the Production Loop, Joined at Ratification"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "architecture", "governance", "two-loop", "policy-first", "ratification", "fresh-session-gates", "cdo-seat", "vodka-architecture", "prompt-over-code"]
epoch: E0009
date: 2026-07-17
derives_from: "canon/the-directors-chair-vision.md, canon/bootstrap/model-operating-contract.md, canon/constraints/audit-gates-are-spawned-agent-sessions.md, canon/principles/verification-requires-fresh-context.md, canon/principles/code-claims-require-code-observation.md, canon/constraints/dispatcher-dispatches-never-executes.md, canon/principles/prompt-over-code.md, canon/principles/vodka-architecture.md"
complements: "canon/methods/governance-validation-via-agents.md, canon/principles/mcp-as-universal-interface.md, canon/principles/antifragile-failures-grow-canon.md, canon/definitions/epistemic-modes.md"
governs: "The relationship between the operator↔CDO collaboration loop and the gated agent production loop, for every project running under ODD discipline. Names the two loops, the ratification seam that joins them, and the fresh-session gate discipline the inner loop runs under. It is the architectural frame; the rule that policy must precede build is the load-bearing rule that lives inside its inner loop."
status: active
target_repo: "outcomes-driven-development"
---

# The Two-Loop Operating Model — The Collaboration Loop and the Production Loop, Joined at Ratification

> The system runs on two loops, not one. An outer loop where the operator and the CDO seat trade direction and translated intent in natural language — producing decisions and ratifications, never code. An inner loop where agents turn ratified policy into PRDs into builds into validated outcomes, each stage consuming only the ratified output of the stage before it, each gate a fresh session so nothing certifies itself. The two loops touch at exactly one seam: ratification. Gate outputs from the inner loop surface to the outer loop for the captain's ruling; his rulings re-enter the inner loop as the ratified inputs the next stage is allowed to consume. This is the architecture that makes policy-first real instead of aspirational — and the structural reason a build can never legitimately run ahead of the policy that authorizes it.

---

## Summary

Most AI-assisted development collapses two different activities into one conversation: the human decides what should be true, and the agent produces artifacts, in the same undifferentiated stream. When those collapse, code races ahead of the policy that was supposed to govern it, and the governance becomes a post-hoc rationalization of whatever got built. The 2026-07-16 ARS monolith freeze is the reference failure of this shape: production artifact standing where ratified policy should have stood first.

The two-loop model separates the activities structurally. **Loop 1 (the collaboration loop)** runs between the human operator — the captain — and the CDO seat. Direction, rulings, and ratifications flow down; translated intent and results flow back. It is natural-language delegation under the crew-not-clone posture, and its only products are decisions and ratifications. It produces no code. **Loop 2 (the production loop)** is the agent pipeline, defined in policies: Director exploration emits policies; agents plan ratified policies into PRDs; agents build from policies plus PRD; agents validate against all of it. Every stage consumes only the *ratified* output of the prior stage, and every gate spawns a **fresh session** so no work certifies its own correctness. Design outputs (policies, PRDs) are gated by the oddkit gauntlet as a **refinement loop** — the challenge's findings are folded back into the artifact before ratification, so a "clean" gate means findings were incorporated, not that none were found — while the build is gated by fresh-context validation plus tests.

The **seam** between the loops is ratification, and it runs in both directions: Loop 2's gate outputs surface into Loop 1 for the captain to rule on, and his rulings descend back into Loop 2 as the ratified inputs the next stage is permitted to consume. Nothing crosses the seam except through ratification.

This document is the **frame**. The rule that policy must precede build is the **load-bearing rule that lives inside Loop 2** — the frame explains why that rule is structural rather than a matter of discipline. Together they replace "the agent should build the right thing" with "the agent structurally cannot build a thing the policy has not authorized."

---

## WHAT

The operating model is two nested loops joined at a single seam.

### Loop 1 — The Collaboration Loop (Operator ↔ CDO)

The outer loop runs between the human operator (the captain) and the CDO seat. It is a conversation, conducted in natural language:

- **Downward:** direction, rulings, and ratifications flow from the captain to the CDO seat.
- **Upward:** translated intent and results flow from the CDO seat back to the captain.

This is delegation under the crew-not-clone posture (`canon/bootstrap/model-operating-contract`): the CDO seat exercises its own judgment while flying under procedures that live in canon, not in its memory of them. The seat translates the captain's natural-language intent into terms the production loop can consume, and translates the production loop's results back into terms the captain can rule on. The captain's authorial voice is never committed, pushed, or merged without his review of the exact text.

**Loop 1 produces decisions and ratifications. It does not produce code.** This is the definitional boundary of the outer loop. The moment the collaboration loop starts producing artifacts, it has stopped being the collaboration loop — the same failure the dispatcher-never-executes constraint (`canon/constraints/dispatcher-dispatches-never-executes`) names for the CDO seat: every time the seat does the work itself, it stops doing the one thing it exists to do.

### Loop 2 — The Production Loop (the agent pipeline)

The inner loop is the gated pipeline that turns ratified intent into validated outcomes. It is **defined in policies**, not in server code — the pipeline's shape is programmable governance (`canon/principles/prompt-over-code`), not a hardcoded workflow. Each stage consumes the **ratified** output of the stage before it, and each gate spawns a **fresh session** so no stage certifies its own work:

| Stage | Consumes | Produces | Gate |
|---|---|---|---|
| **Director exploration** | ratified direction from Loop 1 | policies | oddkit gauntlet — **fresh session** |
| **Plan** | ratified policies | PRDs | oddkit gauntlet — **fresh session** |
| **Build** | ratified policies + ratified PRD | implementation | validation — **fresh session + tests** |
| **Validate** | policies + PRD + build | findings | gate — disposition to Loop 1 |

The two gate types are not interchangeable, because they check different kinds of claim:

- **Design gates use the oddkit gauntlet — as a refinement loop, not a turnstile.** Policies and PRDs are design outputs — prose claims about what should be true. They are pressure-tested by `oddkit_challenge` and the surrounding gauntlet, run in a fresh session, per `canon/constraints/audit-gates-are-spawned-agent-sessions`: the gate is a spawned agent session that reads the artifact and renders judgment, not a pattern matcher. But the gauntlet does more than pass or fail the artifact — its findings surface *details* that get folded back into the artifact. The design gate is therefore a loop, not a checkpoint: **stage output → oddkit challenge → fold the surfaced findings back into the output → (repeat if warranted) → ratify.** A "clean" design gate does not mean the challenge found nothing; it means the findings the challenge surfaced were addressed and incorporated into the artifact before ratification. The gate *enriches* the policy or PRD; it does not merely bless or bounce it. Each refinement pass runs in a fresh session so the fold-back is reviewed by context that did not author it.
- **The build gate uses fresh-context validation plus tests.** A build is a claim about what code *currently does*, and per `canon/principles/code-claims-require-code-observation`, that claim is only grounded by observing the code — running the tests, reading the artifact — from a fresh session that did not create it (`canon/principles/verification-requires-fresh-context`). Validation findings likewise route to iteration — a fresh execution pass scoped by the findings — rather than being treated as a mere reject.

### The Seam — Ratification

The two loops touch at exactly one place: **ratification**. It is bidirectional.

- **Upward across the seam:** each Loop 2 gate output surfaces into Loop 1. The captain rules on it.
- **Downward across the seam:** the captain's ruling re-enters Loop 2 as the *ratified input* the next stage is permitted to consume.

Nothing crosses the seam except through ratification. A Loop 2 stage may not consume an un-ratified prior output; a Loop 1 ruling has no effect until it descends as a ratified input. The seam is what keeps the loops distinct — and joined.

---

## WHY

**This is the operating architecture that makes policy-first real rather than aspirational.**

"Policy precedes build" is easy to state and easy to violate, because in an undifferentiated conversation there is nothing structural stopping an agent from building first and describing the policy afterward. When that happens, the policy stops governing the build and starts rationalizing it. The governance inverts: instead of the document constraining the code, the code dictates the document.

The two-loop model removes the opportunity for that inversion by making the loops structurally distinct and joining them only at ratification. A build stage in Loop 2 can consume only a *ratified* PRD, which could only have come from a *ratified* policy, which could only have come from ratified direction across the seam. There is no path by which a build legitimately precedes the policy that authorizes it, because every input a build is allowed to touch has already crossed the ratification seam. The rule becomes a property of the architecture, not a hope about agent behavior.

The reference failure is **the 2026-07-16 ARS monolith freeze**: a production artifact standing where ratified policy should have stood first — code ahead of policy, exactly the inversion this frame is built to prevent. The captain names this event as the motivating failure. Its durable lesson is being filed in a parallel flight as `canon/constraints/ratified-model-requires-reconciliation-and-enforcer` (DRAFT PR #288) — the constraint that a ratified model must be reconciled to its implementation, backed by an enforcer that flags divergence. That constraint and this frame are two responses to the same failure: PR #288 supplies the reconciliation-and-enforcer rule; this document supplies the architecture that makes such inversions structurally hard to reach in the first place. At time of authoring the freeze has no standalone incident record and the constraint is not yet merged, so both are cited as the operator-attested / in-flight artifacts they are; when they land, tighten these references to merged URIs.

**The alternative this frame rejects** is the single undifferentiated loop — one conversation in which the human decides and the agent builds, with no structural boundary between deciding and producing and no ratification seam. That is the default shape of most AI-assisted work, and it is chosen for its low friction. This frame trades that friction back for the boundary, on the judgment that the cost of code-ahead-of-policy failures exceeds the cost of the seam. The trade is **reversible**: this is a canon document, amendable by the same ratification it defines, not a one-way architectural commitment burned into a server. If the seam proves to cost more throughput than the inversions it prevents, the frame is retracted or narrowed by amendment — see Confidence and Falsifiability below.

The deeper reason the model works is that it respects where different kinds of truth live. Loop 1 is where *what should be true* is decided — the mode where questions are cheap and belong (`canon/definitions/epistemic-modes`). Loop 2 is where *what is true* is produced and observed. Collapsing them forces the human's judgment and the agent's production into the same stream, where each corrupts the other: the human's decisions get made under production pressure, and the agent's production gets driven by half-formed intent. The seam is the membrane that lets each loop run in its own truth conditions and still stay coupled.

---

## ENFORCEMENT

The frame is enforceable because each of its structural claims maps to a concrete, checkable gate. Advice would be a description of the loops; this is the set of conditions a compliant pipeline must satisfy.

1. **Gates spawn fresh sessions — no self-certification.** Every gate in Loop 2 runs in a session that did not produce the artifact under review. A stage that reviews its own output in its own session has not passed a gate; it has performed self-review, which `canon/principles/verification-requires-fresh-context` forbids and `canon/constraints/audit-gates-are-spawned-agent-sessions` operationalizes. Same model family is acceptable; same governance is acceptable; same session is not.

2. **Each stage consumes only ratified prior-stage output.** A plan built on un-ratified policy, or a build built on an un-ratified PRD, is out of contract regardless of its intrinsic quality. Ratification status is a precondition on the *input*, checked before the stage runs — not a judgment on the output after.

3. **Design gates run the oddkit gauntlet; the build gate runs validation plus tests.** Policies and PRDs (design outputs, prose claims) are gated by `oddkit_challenge` and the gauntlet in a fresh session. Builds (code-state claims) are gated by fresh-context validation and executed tests. Substituting a cheaper mechanical check for either gate — a lint pass standing in for the gauntlet, a same-session smoke standing in for validation — is a failed gate wearing a green check.

4. **A design gate must enrich its artifact, not merely rule on it.** The oddkit challenge is a refinement loop: its surfaced findings are folded back into the policy or PRD before ratification. "Clean" is a claim about *incorporation* — the findings were addressed in the artifact — not about *silence* — the challenge found nothing. A design gate that recorded a verdict but folded no findings back into an artifact the challenge raised findings on has skipped its own purpose: it blessed or bounced the artifact instead of improving it. Where a challenge genuinely surfaces nothing material, that is a legitimate clean pass, but it must be observable as "challenge run, no material findings," not assumed.

5. **Loop 1 produces no artifacts.** The collaboration loop's outputs are decisions and ratifications. A commit, push, or merge originating in Loop 1 rather than descending as a ratified input into Loop 2 is a boundary violation — the CDO seat executing instead of dispatching (`canon/constraints/dispatcher-dispatches-never-executes`).

6. **The seam is the only crossing.** No Loop 2 stage consumes un-ratified input; no Loop 1 ruling takes effect except as a ratified descent. Any path that moves an output from one loop to the other without passing through ratification is out of contract.

This document is self-governing: it is itself a policy authored in Loop 1's mode and, per its own design gate, must pass an `oddkit_challenge` before it can be ratified into canon. A two-loop model that exempted its own authoring from the loop it defines would refute itself. It obeys the loop it describes.

---

## SCOPE

**Governs.** The relationship between the collaboration loop and the production loop for every project running under ODD discipline: what each loop may produce, what each stage may consume, what each gate must be, and how the two loops exchange work across the ratification seam.

**Frame, not rule.** This document is the architectural frame. The universal rule that *policy must precede build* is the load-bearing rule that lives **inside** Loop 2; it is being authored in a parallel flight as its own constraint. The relationship is deliberate and should be stated wherever either document is read: **the two-loop model is the architecture; policy-precedes-build is the load-bearing rule of its inner loop.** This frame extends that rule by explaining why it holds structurally; it does not restate or duplicate it. Its nearest in-flight sibling is `canon/constraints/ratified-model-requires-reconciliation-and-enforcer` (DRAFT PR #288), which handles the adjacent half of the same failure: when a ratified model and its implementation diverge, reconciliation is required and an enforcer must flag the gap. That constraint governs *drift between a ratified model and its code*; this frame governs *the loop structure that produces ratified models in the first place*. When either companion merges, update this document's `derives_from`/`complements` to cite it by URI.

**Relationship to adjacent canon.** This frame sits on top of, and does not restate:
- `canon/the-directors-chair-vision` — names the director's-chair posture and the CDO/Otto seat that Loop 1 runs through.
- `canon/bootstrap/model-operating-contract` — the four epistemic modes, preflight, and gate rhythm that Loop 2's stages and gates are made of. Loop 2's Director-exploration/plan/build/validate stages *are* the contract's exploration/planning/execution/validation modes, arranged as a pipeline with ratification between them.
- `canon/principles/prompt-over-code` and `canon/principles/vodka-architecture` — the reason Loop 2 is "defined in policies" and not hardcoded: the pipeline's shape is programmable governance.
- `docs/planning/the-loop-every-role-same-infrastructure` — **prior art, reconciled, not duplicated.** "The Loop" names the single shared cycle *every role* runs — converse → generate → validate → promote-or-pivot — over one Knowledge Base. This two-loop model does not compete with it; it makes a distinction that framing leaves implicit: the human-facing collaboration cycle and the agent-facing production cycle are *different loops with different products*, and "The Loop" as described is the shape Loop 2's stages take. Read together: every role runs The Loop; the two-loop model names which of those runs are collaboration (Loop 1, decisions/ratifications) and which are production (Loop 2, artifacts), and the seam between them.
- The "gates are the approval" lineage (`docs/oddkit/release-notes/2026-07-12-let-the-gates-govern` and the dispatcher rule) — the reason ratification rides on the gates rather than on the captain re-approving each step: the gate *is* the approval mechanism, and the seam surfaces its output for ruling rather than re-litigating the work.
- **PR #288** (`canon/constraints/ratified-model-requires-reconciliation-and-enforcer`, DRAFT) — verified at authoring time to be the parallel-flight constraint that files the ARS-freeze lesson as a reconciliation-and-enforcer rule. It is the sibling this frame reconciles against; see "Frame, not rule" above. Because #288 is itself unmerged and in the captain's authorial voice, this cross-reference stays a pointer until #288 lands.

**Out of scope.** The internal mechanics of any single stage (how a Director explores, how an agent plans) beyond the input/output/gate contract stated here; the substrate that runs a spawned gate session (`canon/methods/spawned-agent-session-substrate-options` owns that); and the specific text of the policy-precedes-build rule.

---

## VERIFICATION

A pipeline is compliant with this frame when all of the following can be observed — not asserted:

- **Loop separation is visible.** Loop 1 exchanges produce decision/ratification records and no code artifacts. Show the record; show the absence of a commit originating in Loop 1.
- **Every gate ran in a fresh session.** For each Loop 2 gate, there is evidence that the reviewing session is distinct from the producing session — a separate session id, a separate agent, or a tooled handoff. A gate with no observable context break failed the fresh-session test regardless of its verdict.
- **Every stage's input was ratified.** For each stage, the input it consumed carries a ratification marker traceable across the seam to a Loop 1 ruling. An input with no ratification lineage is a contract violation, even if the stage's output is good.
- **Gate type matches artifact type.** Design gates (policy, PRD) show an `oddkit_challenge`/gauntlet run; the build gate shows fresh-context validation and executed test results. A design output validated only by tests, or a build validated only by challenge, is a mismatched gate.
- **Design-gate findings were folded back, not just recorded.** For each design gate, the ratified artifact is observably *later* than the version the challenge was run against, changed in the direction of the surfaced findings — or the record explicitly states the challenge surfaced no material findings. A ratified artifact that is byte-identical to its pre-challenge version, over a challenge that raised findings, is the failure mode: the gate ruled instead of enriched. The observable is the diff between pre-challenge and ratified artifact, read against the challenge findings.
- **The seam has no bypass.** No output moved between loops except through a ratification event. Trace each crossing to its ratification; an untraceable crossing is the failure mode.

**Self-application.** This document's own path to canon is its first verification case: it was authored in Loop 1's mode, and it is submitted as a DRAFT PR whose gate is an `oddkit_challenge` run in this authoring pass plus the captain's ratification of the exact text before merge. The challenge surfaced findings; per the refinement-loop discipline this document defines, those findings were folded back into it — the prior-art reconciliation against "The Loop," the named-alternative-and-reversibility note in WHY, and this very section were added in response to the challenge, not recorded beside it. That is what a clean design gate looks like under this model: the artifact is later than, and improved over, the version the challenge ran against. If it were merged without that challenge and that ratification, it would have violated the model it defines — and the violation would be observable in the absence of a challenge record and a ratification. The check is the artifact.

---

## Confidence and Falsifiability

**Confidence.** This is a captain-ratified operating model — the articulation was confirmed by the operator, and the frame is grounded in existing canon (the CDO seat, fresh-session gates, mode discipline, prompt-over-code). It is offered as an established design decision, not as an empirically-tested law. Its strongest evidence is structural coherence with adjacent canon and one named failure it is built to prevent; it is not yet backed by a large sample of pipelines run end-to-end under it.

**What would retract or narrow it.** The frame is falsifiable, and these are its retraction conditions:

- If pipelines run under strict loop separation are observed to produce *more* code-ahead-of-policy inversions than undifferentiated ones, the causal claim in WHY is wrong and the frame is retracted.
- If the ratification seam is observed to cost more operator attention than the inversions it prevents cost to repair — the bottleneck-respect trade going the wrong way (`canon/bootstrap/model-operating-contract`) — the frame is narrowed to the contexts where the trade still holds.
- If the collaboration/production distinction collapses in practice because a real seat cannot produce ratifications without producing artifacts, the two-loop boundary is a fiction and must be re-drawn.

Absent those observations, the frame stands. Its scope is projects under ODD discipline; it makes no claim about teams or tools that do not run a policy-first pipeline.

---

## How This Document Evolves

Per `canon/principles/antifragile-failures-grow-canon`, the failures that pressure this frame become amendments to this document, never changes to a server. When the policy-precedes-build companion constraint merges, cite it here by URI. When the ARS monolith freeze incident record is written, link it from WHY. When PR #288's relationship is confirmed, tighten the SCOPE pointer into a verified cross-reference. The frame is a living artifact, governed by the same ratification seam it defines: nothing in the captain's authorial voice enters it without his review of the exact text.
