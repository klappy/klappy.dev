---
uri: klappy://canon/principles/rulebook-transfer
title: "Rulebook Transfer — Prompt Over Code, Bounded by Articulability"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "principle", "epoch-10", "agentic", "the-loop", "prompt-over-code", "discernment", "articulability", "stewardship", "delegation-ladder", "kirigami", "rulebook-transfer"]
epoch: E0010
date: 2026-06-26
derives_from: "canon/principles/prompt-over-code.md, canon/principles/discernment-layer.md, canon/principles/skills-are-procedure-not-judgment.md, canon/decisions/models-do-not-mutate-canon.md, canon/principles/code-claims-require-code-observation.md, canon/principles/verification-requires-fresh-context.md"
complements: "writings/shifting-bottlenecks-climbing-ladders.md (operator-side delegation ladder), writings/how-you-lead-is-what-you-build.md (delegation as graduation), docs/planning/kb-data-model.md (governance is a role on a scope), canon/principles/symmetric-participation.md, canon/constraints/odd-is-epistemic-os-not-values.md, kirigami contributor/custody/synthesized model, P0 cross-model reconstruction-fidelity sweep"
governs: "How discernment transfers down model tiers; how a self-building loop surfaces candidate governance without unravelling"
status: active
target_repo: "outcomes-driven-development"
---

# Rulebook Transfer — Prompt Over Code, Bounded by Articulability

> Discernment a frontier model performs once can be written down as a rulebook a lesser model runs — but only the part that can be written down transfers, only adjacent tiers can hand it off cleanly, and authority over what becomes canon flows one way: downward, never up, never reflexive.

## The principle

Discernment a frontier model performs once can be crystallized into an explicit lens — a rulebook — that a lesser, ultimately local model executes without holding equivalent intelligence. Only the *articulable* portion of the discernment transfers. Tacit judgment stays in the frontier weights. A lens goes local in proportion to how expressible its cut-rules are.

## Mechanism — prompt over code, applied to the fold

This is [Prompt Over Code](klappy://canon/principles/prompt-over-code) turned on the act of discernment itself. The frontier model spends its judgment once, writing the lens; the rulebook is the prompt; the cheaper model runs the prompt. The cheaper model is not asked to be intelligent — it is asked to be faithful to something intelligent that already ran. Execution moves down-tier, and where the rulebook is explicit enough, onto local hardware.

## The bound — why articulability

The transfer is lossy, and it is lossiest at the hard cases. A rulebook captures the typical, median call well. The ambiguous tail — the place where frontier judgment earned its keep — is captured worst, and judgment that is irreducibly tacit does not reduce to writable rules at all. A lens whose cut-rules can be written down ships down-tier and to-device first; a lens whose discernment stays tacit remains frontier-bound or escalates. Articulability is a property to measure, not assume, and it is the criterion that ranks which lenses move local first.

This bound is the same line [Skills Are Procedure, Not Judgment](klappy://canon/principles/skills-are-procedure-not-judgment) already draws. That principle holds that a skill encodes the procedure and never the verdict; the verdict stays judgment. Rulebook Transfer is the generalization: what crosses a tier boundary is the articulable procedure, and what does not cross is the verdict. The expressible is portable; the tacit is not.

## The recursion — and why you cannot skip rungs

The transfer is not two layers. It is n-tier, and the operation is identical whichever tier sits on top: an upper tier distills its discernment into a rulebook the next tier runs. A human writing a rulebook a frontier model runs is the same move as a frontier model writing a lens a local model runs. "Systems that build systems" is this one operation permitted to run more than once.

But each hop bridges only a bounded capability gap. Skip too many tiers and the rulebook silently assumes tacit context the executor does not have — and the loss does not degrade gently, it collapses, because the part that failed to transfer is exactly the unwritten judgment the bottom tier most needed. So transfer is a ladder of adjacent steps, not a cliff. The design variable is **step size** — how large a capability gap a single rulebook can bridge — and step size is itself bounded by articulability across *that specific gap*. The wider the gap, the more of the discernment must be made explicit; past some width the tacit residual is too large to write down, and the hop fails. "We cannot skip too much or it becomes impractical" is this constraint, stated exactly.

## Two capacities: execution and stewardship

The chain depends on two different capacities, and conflating them hides the real limit.

- **Execution capacity** — run a rulebook from above faithfully. This extends far down the tiers.
- **Stewardship capacity** — author a rulebook *for the tier below*, hold a bounded domain, recognize what falls outside it, and escalate the rest. This is scarcer, and extends less far.

The delegation ladder therefore has fewer rungs than the execution ladder. This mirrors any human organization: nearly everyone can execute competently within their lane; far fewer can manage, delegate, and judge what is out of their lane. So the transferability question is not a single number — "how far does it go?" — but two tests applied at each rung: can this tier (a) run a rulebook from above, and (b) author one for the tier below? A tier may pass (a) and fail (b) — a faithful executor that cannot steward. The ladder is mapped rung by rung, not assumed.

This is the agent-side mirror of the operator-side ladder in [Shifting Bottlenecks, Climbing Ladders](klappy://writings/shifting-bottlenecks-climbing-ladders): *capability gets you to the next rung; trust, harness, and delegation maturity decide whether you can stand on it.* The same sentence governs both sides of the handoff.

## The loop closes because authority flows one way

A loop that surfaces its own governance unravels when authority forms a cycle: when something downstream can rewrite the rules upstream of it, the system begins ratifying itself, and early mistakes entrench. The guarantee against that is a single asymmetry — **information flows in every direction; authority flows in one.** Proposals travel up, down, and sideways freely. Authority travels downward only, and never forms a cycle. The loop is safe to close in the information dimension precisely because it stays acyclic in the authority dimension.

The governance rules follow as corollaries of that asymmetry:

- **Induction proposes; it does not ratify.** A regularity observed across many decisions is evidence *for* a candidate principle, not a principle. It enters advisory only — in kirigami terms, custody `synthesized`, with named grounds, carrying no standing.
- **No tier promotes itself.** A tier cannot ratify its own proposal, widen its own scope, or write rules about itself. Reflexive authority is a cycle of length one, forbidden for the same reason longer cycles are. ("Agents never self-promote" is this corollary, not a separate axiom.)
- **No tier writes upward.** A tier cannot edit the canon of a tier above it. This preserves [Models Do Not Mutate Canon](klappy://canon/decisions/models-do-not-mutate-canon): a model never edits the operator's sovereign canon.
- **Authority is delegated, bounded, and revocable.** A tier that has the capacity to steward may hold authority over a sub-scope granted from above — its own canon, within its jurisdiction — and may ratify within it. It never owns the definition of its own boundary, and the grant can be revoked from above. Governance is [a role on a scope](klappy://docs/planning/kb-data-model), not a possession.

Authority is a role-overlay above the wire, not a wire primitive: [Symmetric Participation](klappy://canon/principles/symmetric-participation) keeps every peer identical at the wire, and jurisdiction is metadata above it. It is sited at the governance layer, not the epistemic core — [ODD does not define authority](klappy://canon/constraints/odd-is-epistemic-os-not-values), and this principle adds that axis where "governance is a role" already lives, rather than inside the epistemic OS.

The verdict — promotion across a scope boundary — is never encoded into a lower tier. This is `Skills Are Procedure, Not Judgment` restated once more: encode the procedure, never the verdict.

## Evidence, bounded

Two layers of evidence, each scoped honestly.

**Execution transfer** has probe support. The fold-fidelity probe had three models (Haiku, Sonnet, Opus) fold the same corpus under the same lens; all three passed the faithfulness gate, with tier-1 pivotal agreement near 80–90%. This supports down-tier *execution* at the cloud tier. It is not support for the *device* tier; that is the hypothesis the P0 cross-model reconstruction-fidelity sweep is built to test, and P0 is post-build.

**Stewardship transfer** has been observed at exactly one rung: a frontier-tier model holding delegated authority over real repositories in an operator-approved working agreement, proposing downward and escalating out-of-scope decisions upward for approval. That is N=1, and it sits at the *top* rung — the least surprising place for stewardship to hold and the least informative about whether it transfers downward. The multi-rung chain, in which each tier stewards the one below, is unproven.

A further hazard sharpens both: an articulated rulebook can be fluent and still not describe what its author actually did. A confabulated rulebook reads well and reproduces badly. Fidelity is therefore never inferred from how good the rulebook reads; it is measured by testing that the lesser tier makes the same cuts — consistent with [Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation): the claim is verified against observation, not against its own prose.

### Second probe — COO canon, 2026-06-30 (real corpus, three tiers)

A live cross-model run folded chapters from four COO books through one lens, graded by a fresh-context grader against held-out truth (`kirigami://docs/eval/coo-corpus-fidelity-run-2026-06-30`). It extends both evidence layers:

**Execution transfer — strengthened.** Under a sufficiently explicit lens a Haiku-class model reached ship-grade fidelity (8/8 held-out questions on the hardest chapter). The *articulability step-size* mechanism was observed directly: under a thin lens Haiku collapsed (88 rows, 4 tier-1 — a starved skeleton); writing the missing discernment down (budgets, tier test, anti-fragmentation rule, worked example, self-count gate) moved the same model into the frontier band (45 rows, 10 tier-1) with no model change. Articulability, not raw capability, was the binding variable — exactly as the principle predicts.

**Stewardship transfer — first data on the chain arm.** The prior evidence was N=1 at the top rung. This probe tested the rung below: a mid-tier model (Sonnet) *authored* a compensating rule for a Haiku failure, and it worked when Haiku ran it (the targeted hallucination and orphan edges disappeared) — but it **over-corrected**, dropping coverage. A frontier model (Opus), given the identical brief, authored the same fix **surgically** — failure removed, coverage preserved. Reading: stewardship *does* transfer below the top rung, but it is **lossy in the tacit dimension** — the mid tier fixes the articulable bug and fumbles the balance the frontier holds. This is a first, concrete data point on the **star-or-chain** question: frontier→bottom authoring is clean (the star arm holds); mid-tier→bottom authoring is real but degraded — consistent with the claim that the delegation ladder has fewer rungs than the execution ladder.

**Still open.** The device tier is untested (all three models are cloud). The multi-rung chain remains thin: one rung of mid-tier stewardship, observed once, lossy. Star-vs-chain is now *informed*, not resolved.

## Open questions

- **Star or chain?** Does stewardship capacity re-instantiate at each tier (a chain — every tier stewards the one below), or does it concentrate at the frontier (a star — one steward authoring for everyone)? The single observed rung does not distinguish them. This is the dominant empirical question for the whole model.
- **Fixed or teachable?** Is stewardship capacity a fixed property of a model tier, or can a tier be brought up a rung with the right harness — the graduation arc of [How You Lead Is What You Build](klappy://writings/how-you-lead-is-what-you-build) applied to a model rather than a person? The answer decides whether the ladder is discovered or built.

## Design implications

- **Cascade, not replacement.** The lesser model folds the confident median and escalates the ambiguous tail. Temporality routes: fresh and typical rows stay local; stale or edge rows escalate to a frontier pass.
- **Articulability ranks the roadmap.** Lenses move to-device in order of how much of their discernment is expressible.
- **Build the ladder rung by rung.** Hand stewardship only between adjacent tiers, and test each rung's two capacities separately before relying on it. Do not assume a rung that has not been observed.
- **Authorship is frontier; execution is local.** The substrate carries both the rulebook and the folded output in one shape, so the frontier-judgment → local-execution handoff has somewhere to live. The substrate stays blind; the lens carries the flavor ([Vodka Architecture](klappy://canon/principles/vodka-architecture)).
