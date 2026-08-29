---
uri: klappy://canon/methods/discernment-transfer-ladder
title: "Method: The Discernment Transfer Ladder — Empirical Rulebook Transfer Across Adjacent Tiers"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
target_repo: "outcomes-driven-development"
date: 2026-06-30
derives_from: "canon/principles/rulebook-transfer, canon/principles/discernment-layer, canon/values/axioms, canon/constraints/measure-before-you-object, canon/methods/revision-lens-sequence, canon/principles/verification-requires-fresh-context"
status: active
---

# Method: The Discernment Transfer Ladder

> Discernment a frontier model performs once can be written down as a rulebook a lesser model runs — `rulebook-transfer` states the principle. This method is the empirical procedure that *derives* that rulebook from real evidence, and the observation that the same procedure runs at every adjacent rung of a ladder whose top is a human and whose floor is reality itself.

> This method **operationalizes** `klappy://canon/principles/rulebook-transfer` (Tier-1 principle, E0010). It does not restate the theory — it is the empirical *procedure* that derives and validates the rulebooks the principle describes. All theory (articulability, step-size, the execution/stewardship split, the authority asymmetry) defers to that principle.

## Summary

A task that a higher tier performs by judgment can be handed to a lower tier — but only by writing the judgment down, only between **adjacent** tiers, and only for the part of the judgment that is writable at all. The transfer is not assumed; it is **measured and compensated** in a loop. The same loop runs at every rung: human → SOTA model → mid model → small model. Each rung treats the tier above as its reference and the tier below as its student. The ladder bottoms out not at the human but at **reality** — the only sovereign reference (Axiom 1). The output is a per-task **tier-assignment map**: the cheapest tier that clears the fidelity bar for each task, and the rulebook that gets it there.

## The recursion, who authors, and the bottleneck

The theory — n-tier recursion, why hops have a maximum step size, the split between **execution capacity** (run a rulebook from above; extends far down) and **stewardship capacity** (author a rulebook *for the tier below*; scarcer, fewer rungs) — lives in `rulebook-transfer` and is not restated here. Canon names the dominant unresolved question: **star or chain** — does authoring concentrate at the frontier (one steward writes for everyone) or re-instantiate at each tier (each authors for the one below)?

This method answers it not as a *capability* question but as a *constraint* one, per the operating contract's third pillar (operator attention is the bottleneck). The scarcest resource is not model capability — it is the human's stewardship time. So the topology is decided by **availability × proven stewardship**, not tier-distance:

- **The human authors only for the frontier.** Stewardship-capable but maximally scarce, the human spends their authoring time only where it is irreplaceable: writing the rulebooks the top models run (Fable, Opus). Human time cannot reach lower and should not try.
- **The frontier authors for everyone below.** Fable and Opus have *observed* stewardship capacity and *abundant* availability, so the authoring of lower-tier rulebooks (for Sonnet, Haiku) is delegated to them. Authoring labor flows to the highest tier that has both proven stewardship and spare time.
- **Mid-tier stewardship is unproven and not depended on.** There is no evidence yet that Sonnet can author a working rulebook for Haiku. The topology does not assume it: if the frontier has the availability, the chain need not route authoring through the mid tier at all.

The result is a **shallow star**: human → {frontier}, thin and bottleneck-rationed; {frontier} → {everything below}, abundant and delegated. This is canon's star/chain question answered by the constraint — *author as high as the bottleneck forces, and delegate authoring downward to the most-capable tier that has time.*

Evidence so far (this session, honest): the v2 compensation rulebook was authored by the top tier and run directly by Haiku — supporting **frontier → bottom authoring** (the star arm). Whether a mid tier can author for the tier below it — the chain arm — was not tested. The COO project is itself an instance of the top arm: Wickman, Grove, Geary, and Gawande are human experts who wrote their discernment into **books** — frontier-grade rulebooks — and the model now runs them.

## The loop at a single rung

1. **Establish the reference and the answer key — and keep them separate.** Run the task on the higher tier to produce a reference output. Separately establish a held-out, ground-truth answer key checked against reality (or the closest available proxy). The higher tier's output seeds the rulebook's worked examples; it is **not** the answer key. Tuning the student to match the reference transfers the reference's *errors* too.
2. **Measure the gap on two axes.** *Structural* — counts, tiering, budget adherence, edge integrity; cheap and scriptable. *Semantic fidelity* — is the content true to the source/reality; requires an independent grader with fresh context (`verification-requires-fresh-context`). Structural pass without fidelity pass is shape posing as substance.
3. **Write the missing discernment down.** Diagnose the gap and compensate the rulebook with explicit, writable rules: hard budgets and caps, decision tests, anti-fragmentation rules, worked examples at the target grain, and self-count gates the student runs before returning.
4. **Re-run the student AND regression-run the reference.** Confirm the student converged — and that the new constraints did not lower the higher tier's ceiling. A compensation that helps the weak tier can over-constrain the strong one; lift the floor without dropping the ceiling.
5. **Loop over UNSEEN cases, and know when to stop.** Tune on case A, then run the *frozen* rulebook on an unseen case B (train/test split) — convergence on the unseen case is the only honest signal; tuning and testing on the same case is memorization. If after N rounds a capability still will not transfer to a tier, that capability is **not writable-down for that tier**: assign it permanently to a higher tier and stop spending on compensation.

## Ground truth is tiered; reality is sovereign

At each rung the reference is the tier-above's *approximation*, not Truth. The human is the closest rung to reality but is still approximating it. Therefore: validate against **reality** wherever it can be reached (does the checklist actually work in the field; did the distilled procedure produce the right action), and fall back to the tier-above only when reality is out of reach. This is Axiom 1 applied to the ladder — observe before asserting, at every rung.

This is the same loop Gawande prescribes for checklists: *first drafts fall apart in the real world; test, study the failures, revise, re-test until it works.* The method we are encoding is checklist-design applied to the transfer of discernment itself — and the COO foldout that surfaced it contains the very row (`tra-`/`gaw-` test-and-refine) that states it. The method is self-evidencing.

## Output: the tier-assignment map

The loop does not crown one model. It produces a portfolio: for each task or lens, the cheapest tier that clears the fidelity bar, plus the rulebook that gets it there, plus the capabilities that refused to transfer and stay up-tier. Cost selection becomes a measured decision (`measure-before-you-object`), not a guess.

## Evaluation transfers too — as bounded delegated stewardship

Production is not the only thing that moves down the ladder. **Evaluation and ratification** — the act of judging an output, shaping it, and admitting it to a store — transfer by the same loop. But they transfer under a shape canon already names. Per `klappy://canon/decisions/models-do-not-mutate-canon`: *a model may hold delegated, bounded, revocable stewardship over a sub-scope — governing within it, never above it, never over itself.* The empirical loop is how that stewardship is **earned**: the steward's verdicts are measured against the tier above (and reality), its evaluation rulebook is compensated, and only once it converges on unseen cases is the authority granted — and it stays revocable.

Three guardrails travel with the delegation, each already in canon:

- **Within scope, never above it (domain bound).** A steward ratifies only artifacts inside the sub-scope it was granted. The COO agent may ratify COO-domain state; it does not ratify universal canon or another domain's. Higher-tier artifacts carry higher epistemic obligation (`klappy://canon/definitions/epistemic-obligation-and-document-tiers`), and the obligation rises faster than the delegation does.
- **Never over itself (independence).** A steward cannot ratify its own production. The critic cannot be the resolver and the creator cannot be its own critic (`klappy://canon/constraints/critic-cannot-be-resolver`, `klappy://canon/principles/verification-requires-fresh-context`). Delegated evaluation runs in a separate context/instance from the one that produced the artifact.
- **Proportional to stakes (calibration).** The ratification bar scales with the artifact's tier and reversibility (`klappy://odd/challenge/stakes-calibration`). Low-stakes, reversible, in-domain, high-frequency items are delegable to the tier whose eval rulebook clears the bar; high-stakes, irreversible, novel, or cross-domain items escalate up the ladder — ultimately to the human, who alone ratifies Tier-1 canon.

There is therefore **no conflict** with "models do not mutate canon." That decision forbids governing *above* one's scope and *over* oneself; it explicitly permits delegated, bounded, in-domain stewardship. The human keeps two things no rung below inherits: ratification of the top tier (universal canon), and the authority to grant and revoke every steward's scope.

This is not abstract for [ORG]. The COO's own design is this principle instantiated at the business layer: act-with-approval, solo-approve for low-stakes, 2-of-3 partners for high-stakes (`[ORG-APPROVAL-POLICY-DOC]`). The agent is a bounded, revocable steward of the COO domain — ratifying the reversible in-domain work itself, escalating the rest. The ladder and the COO approval model are the same structure at two altitudes.

## Worked example (the session that produced this method)

Task: fold one chapter of a COO book into a Kirigami foldout. Reference: Opus, 41 rows / 11 tier-1. Students under rulebook v1: Sonnet 37/9 (converged — adjacent tier), Haiku 88/4 (collapsed — two tiers down, judgment did not transfer; *format* — JSON, edge syntax — did transfer). Compensation v2: budgets, tier-1 test, anti-fragmentation rule, worked example, self-count gate. Students under v2: Haiku 45/10, back in the reference band. Not yet done: the semantic-fidelity gate (Step 2 axis two) and the unseen-case test (Step 5). Predicted non-transferable rung: cross-book reconciliation (L6) stays on the top model tier.

## Provenance and Ratification

- **Captain-ratified 2026-07-07 (America/New_York):** proven in practice — many experiments across many repos over the week since authoring, not only the session recorded above. Observed gaps in that proving period were attributable to unrelated causes, not this method.
- **Captain's caveat, same ruling:** ratified as proven is not ratified as robust — the process remains fragile, and every run wants careful planning, careful execution, and a real validation pass (fresh-context, per `verification-requires-fresh-context`).

## Open

- **Semantic fidelity unproven.** Convergence so far is structural only. The fidelity grader against a held-out answer key has not run.
- **N is uncalibrated.** How many compensation rounds before declaring a capability non-transferable is not yet known.
- **Reality-grounding for this domain.** For the COO, the ultimate answer key is whether the agent's actions are right in the field — which only the pilot ([ORG-PILOT-BRIEF] field phases) supplies.
