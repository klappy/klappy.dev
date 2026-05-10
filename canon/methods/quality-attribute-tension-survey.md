---
uri: klappy://canon/methods/quality-attribute-tension-survey
title: "Quality Attribute Tension Survey — Pick Ilities, Surface Tensions, Encode Constraints, Inherit"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "methods", "quality-attributes", "software-virtues", "tradeoffs", "tensions", "constraints", "elicitation", "survey", "agent-work", "scope-setting"]
epoch: E0008.4
date: 2026-05-10
derives_from: "canon/principles/quality-attributes-are-in-tension.md, canon/observations/quality-attribute-tension-matrix.md, canon/observations/observability-tension-extension.md, canon/definitions/software-virtues-vocabulary.md, odd/maturity.md, canon/values/axioms.md, https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe, https://medium.com/@klappy/lean-expectations-poc-prototype-mvp-140749383fd4"
complements: "canon/methods/borrow-bend-break-beget-build.md, odd/encoding-types/constraint.md, odd/encoding-types/observation.md, canon/constraints/borrow-evaluation-before-implementation.md"
governs: "How a project's quality-attribute priorities are surfaced, ranked, sacrificed-against, and encoded as constraints the agents working on the project inherit. Runnable in a single planning turn by an agent or a human operator. Re-runnable at phase transitions. Outputs are typed DOLCHEO Constraints, not free prose."
status: active
---

# Quality Attribute Tension Survey — Pick Ilities, Surface Tensions, Encode Constraints, Inherit

> A seven-phase method for surfacing a project's quality-attribute priorities at scope-setting time. Pick the ilities that matter for this project. Rank them at the project's current phase. Consult the tension matrix (or generate dynamically for ilities outside the canonical ten) to surface predicted sacrifices. Acknowledge each sacrifice explicitly. Encode the result as DOLCHEO Constraints the agents inherit. Re-run at phase transitions. The method is the operational layer that turns the static principle into a per-project artifact — a constraints survey, not a reference table.

---

## Summary — From Principle to Per-Project Artifact

The principle at `canon/principles/quality-attributes-are-in-tension.md` asserts that quality attributes are structurally in tension. The matrix at `canon/observations/quality-attribute-tension-matrix.md` shows what that looks like for the canonical ten. Neither doc tells a project team — or an agent starting a task — what to actually do with that knowledge at scope-setting time. This method does.

The method runs in seven phases, each phase producing one artifact for the next phase to consume. It can be run by a human operator scoping a project, by a single agent at the start of a task, or by a team in a planning session. The output is a small typed artifact — a list of ranked ilities, a list of accepted sacrifices, and a set of DOLCHEO Constraints — that the agents working on the project inherit.

The method's spirit is borrowed from a prior elicitation loop in the `agent-skill` PRD-guide pack (now archived; see borrow evaluation below). The loop's *philosophy* — agent-as-elicitor not agent-as-author, stage typing before questioning, explicit ambiguity capture — proved durable. The loop's *implementation* (lanes, pack compilation, Cloudflare Pages distribution, no update propagation to downstream consumers) proved brittle. This method takes the philosophy and rebuilds the apparatus on canon-and-tools instead of compiled-pack-distribution. Same questions, durable substrate.

The method's economic argument: the operator's attention is the system bottleneck. A constraints survey that runs in one planning turn and produces a typed artifact saves hours of mid-execution debate about which virtue is being prioritized. The cost is one ten-minute survey at scope-setting time. The savings are paid in every downstream decision the agent makes without needing to re-ask.

---

## When to Run the Survey

The survey is the right move at four entry points:

1. **Project scope-setting** — at the start of a new project, feature, or substantive sub-project, before the first artifact is produced.
2. **Phase transition** — when the project moves between maturity levels (PoC → Pilot → Production, per `odd/maturity.md`). The ranking that was correct at PoC is rarely correct at Production.
3. **Significant scope change** — when a project's scope expands or contracts enough that the previously-named ilities no longer cover the new shape.
4. **Tension surprise** — when a failure mode reveals a tension the original survey did not surface. The survey re-runs with the new tension named.

The survey is **not** the right move for routine tasks within an already-scoped project. Once the constraints are encoded, they govern. The survey is run rarely and re-run only when something material changes.

---

## The Seven Phases

Each phase has an entry condition, a question, an output artifact, and a transition rule to the next phase. The phases are sequential; an agent or operator running the method works through them in order and stops if a reversion is required.

### Phase 0 — Stage Identification

**Entry.** Project description in any form (a paragraph, a ticket, a conversation transcript). Current working state.

**Question.** What stage is this project at, and what does the stage imply about evidence expectations and ambiguity tolerance?

**Output.** One classification: PoC / Pilot / Production / Refactor / Other (with explicit name).

**Transition.** If the stage cannot be classified within the listed types, the method reverts to planning and the operator names the missing stage. Continuing without a stage is not allowed; every other phase depends on it.

### Phase 1 — Ility Selection

**Entry.** Stage from Phase 0.

**Question.** Which quality attributes matter for this specific project at this stage?

**Output.** A list of selected ilities, with explicit removals. The canonical ten from `canon/definitions/software-virtues-vocabulary.md` are the starting set; additions come from the broader universe (observability has its own extension at `canon/observations/observability-tension-extension.md`; auditability, securability, accessibility, portability, etc., may apply). Removals are listed explicitly: "this project does not optimize for X because Y."

**Transition.** When the list is stable — every retained ility has a reason, every removed ility has a reason. Aim for between four and twelve ilities. Fewer than four usually means the project is too narrowly framed; more than twelve usually means the survey will not converge.

### Phase 2 — Phase-Weighted Ranking

**Entry.** Selected ilities from Phase 1, stage from Phase 0.

**Question.** At this stage, which ilities are most important to this project, and which are least?

**Output.** A ranked list of the selected ilities. The ranking is project-and-stage-specific; do not reuse a ranking from another project.

**Transition.** The phase-weighting prior at `odd/maturity.md` gives the default shape (PoC tolerates more originality and less stability; Production demands more stability and tighter affordability; etc.). The project's specifics may override the default — but every override should be named. If the override list is longer than three items, the project is doing something genuinely unusual and the operator should pause.

### Phase 3 — Tension Surfacing

**Entry.** Ranked list from Phase 2.

**Question.** For the top-ranked ilities, what do the tensions predict will be sacrificed?

**Output.** A list of named tensions. For ility pairs within the canonical ten, consult `canon/observations/quality-attribute-tension-matrix.md` directly. For ility pairs that include observability, consult `canon/observations/observability-tension-extension.md`. For ility pairs outside the canonical ten and the worked extensions, generate the tension graph dynamically against the principle at `canon/principles/quality-attributes-are-in-tension.md`. The dynamic-generation step is described in the next subsection.

**Transition.** When every tension involving a top-three-ranked ility has been named with a relationship type (mutual / asymmetric / synergy / cost gravity), a phase tag, and a one-sentence operating dynamic, this phase is complete. The remaining tensions — those involving lower-ranked ilities — are surfaced as background but not analyzed in detail.

#### Dynamic Generation for Ilities Outside the Canonical Ten

When the survey includes ilities not covered by the canonical ten or the existing extensions, the method generates the tension graph by applying the principle to each new pair. The procedure:

1. **Define the new ility tightly.** What does it measure? What is observed when it is achieved?
2. **For each pair (new ility ↔ existing ility):** ask which is achieved by methods that erode the other. The principle's "Pairs Are Predictable" section is the rule book.
3. **Tag the relationship type:** mutual tension when both erode each other along symmetric axes; asymmetric grounding when one virtue disciplines the other without symmetric retaliation; synergy when both reinforce; cost gravity for affordability's relationship.
4. **Tag the phase weighting:** when does this tension bite hardest — PoC, Pilot, or Production?
5. **Cite evidence.** If ODD canon already discusses the new ility (case studies, epoch docs, prior writings), cite the source for each tension claim. The observability extension is the worked example of evidence-grounded generation.
6. **Surface the result for review** before treating it as authoritative. Dynamic-generation output is a hypothesis until the operator or downstream evidence corroborates it.

Future tooling (a potential `oddkit tensions(...)` action) will codify steps 1–4 as a tool call. Until then, the procedure is run by hand or by an agent reading this section.

### Phase 4 — Sacrifice Acknowledgment

**Entry.** Tension list from Phase 3, ranking from Phase 2.

**Question.** For each tension where a top-ranked ility erodes another, is the predicted sacrifice acceptable for this project at this stage?

**Output.** Each predicted sacrifice tagged accept or reject. Accepts proceed. Rejects trigger reversion to Phase 2 — the ranking that produced an unacceptable sacrifice is itself the problem, not the tension.

**Transition.** This phase commonly produces one or two reversions. That is healthy. A survey that runs straight through Phase 4 without any reversion is suspicious; either the rankings were trivially obvious or the survey is rubber-stamping rather than surveying.

### Phase 5 — Constraint Encoding

**Entry.** Accepted ranking from Phase 2 plus accepted sacrifices from Phase 4.

**Question.** What constraints does this survey produce that the agent working on the project must inherit?

**Output.** A set of typed Constraints in the DOLCHEO format (see `klappy://odd/encoding-types/constraint`). Each constraint is one of:

- **Priority constraint** — "This project prioritizes [ility] above [list of explicitly lower-ranked ilities] at this stage."
- **Sacrifice constraint** — "This project accepts [ility]'s erosion of [other ility] because [reason]."
- **Ility-set constraint** — "This project optimizes for these ilities and explicitly does not optimize for [removed ilities]."
- **Phase constraint** — "This project is at [stage]; constraints will be re-surveyed at the next phase transition."

The constraint set is saved to the project's session, ledger, or whichever persistence layer the project uses. It becomes the answer the agent gives whenever it is uncertain about which virtue to prioritize.

**Transition.** When every accepted sacrifice and every priority decision has produced at least one constraint, and when the constraint set is saved (encoded artifacts do not persist on their own — see `klappy://canon/definitions/dolcheo-vocabulary`), the survey is complete.

### Phase 6 — Re-Run Triggers

**Entry.** Saved constraint set from Phase 5.

**Question.** Under what conditions does the survey re-run, and what happens to the existing constraints when it does?

**Output.** A short list of explicit re-run triggers, with handling rules. Standard triggers:

- **Phase transition** — the survey re-runs from Phase 0; the prior constraint set is archived, not reused.
- **Scope change beyond a named threshold** — operator-defined; e.g., "if the user base or the use case fundamentally shifts, re-survey."
- **Tension surprise** — a failure mode reveals an unsurfaced tension; the survey re-runs from Phase 3 with the new tension added.
- **Stakeholder change** — if the team's composition shifts in a way that changes the priorities (a new product owner, a new technical partner with veto power), re-survey.

**Transition.** This phase produces a short paragraph attached to the constraint set, describing the trigger conditions. The paragraph is itself a constraint that the agent inherits.

---

## Output Format — What the Survey Produces

A complete survey run produces five named outputs, all small enough to fit in one operator-readable artifact:

1. **Stage** — single classification from Phase 0
2. **Ility set** — ranked list from Phase 2 with rationale for any removals from the canonical ten
3. **Tension list** — top tensions from Phase 3 with relationship types and phase tags
4. **Accepted sacrifices** — list from Phase 4 with one-sentence justification each
5. **Constraint set** — DOLCHEO Constraints from Phase 5 with re-run triggers from Phase 6

The whole artifact is typically under 500 words. Surveys longer than that are usually the result of skipping Phase 1's removal step (too many ilities in play) or skipping Phase 2's prior (re-deriving the ranking from scratch instead of starting from `odd/maturity`).

---

## How the Method Was Built — The 6B Borrow Evaluation

This method was not invented in isolation. The borrow evaluation below names the prior art and the verdict for each item, per `canon/constraints/borrow-evaluation-before-implementation`.

| # | Prior art | Verdict | Reasoning |
|---|---|---|---|
| 1 | Klappy 2018 — *Software Virtues, How to Prioritize* (`https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe`) | borrow | Origin of the canonical ten ilities and the natural-tension framing. Already absorbed into `canon/definitions/software-virtues-vocabulary` and `canon/principles/quality-attributes-are-in-tension`. |
| 2 | Klappy 2018 — *Lean Expectations: PoC, Prototype, MVP* (`https://medium.com/@klappy/lean-expectations-poc-prototype-mvp-140749383fd4`) | borrow | Origin of the lifecycle-phase framing (PoC / Prototype / MVP) referenced by Phase 0 and Phase 2. Already partially absorbed into `klappy://odd/maturity`. Cited explicitly. |
| 3 | Archived `agent-skill` v1.3 PRD elicitation loop (`klappy://docs/archive/products/agent-skill/v1.3.1/PRD`) | bend | Loop *spirit* is borrowed (agent-as-elicitor, stage typing, asset intake, ambiguity capture). Loop *architecture* is rejected: lanes / pack-compilation / Cloudflare Pages distribution had no update propagation to downstream consumers and proved unmaintainable. The seven phases here adapt the spirit to canon-and-tools delivery. |
| 4 | SEI ATAM (Architecture Tradeoff Analysis Method, Carnegie Mellon SEI, ~2000) | bend | Scenario-driven tradeoff identification is the conceptual ancestor of Phase 3. Bend: ATAM's stakeholder-workshop format is too heavy for agent-task scoping; this method runs in one planning turn rather than a multi-day workshop. The scenario discipline is preserved; the workshop ceremony is not. |
| 5 | ISO/IEC 25010 — Software Product Quality Model | inspected-and-adopted | Cited in `canon/definitions/software-virtues-vocabulary` as the standard validating "the universe of quality attributes is larger than ten." Provides the vocabulary anchor for ility selection in Phase 1. No further borrow at this scope. |
| 6 | Bass / Clements / Kazman — *Software Architecture in Practice* | inspected-and-rejected | The book's full tactics-and-patterns framework is too heavy to absorb at this scope. The scenario-discipline content is already carried via ATAM (#4); the additional taxonomic detail does not earn its weight. Tripwire: when the matrix needs quantitative tactic mappings rather than categorical relationships, re-evaluate. |

**Bide candidates** (tracked but not borrowed):

- **SEI QAW** — redundant with ATAM borrow at this scope; tripwire is multi-stakeholder elicitation becoming a goal.
- **NFR Framework (Chung, Nixon, Yu, Mylopoulos)** — softgoal-satisficing math; tripwire is when the matrix needs probabilistic tension weights rather than categorical types.

**Reversibility note.** This method is canon prose; superseding it later costs no code, no SDK choice, no architecture lock-in. Reversibility is high.

---

## Integration Points

The survey is most useful when it integrates with the rest of the operating context. Two integration points are explicit:

- **`oddkit_preflight`.** When the preflight surfaces requirements for execution, the survey output should be among the inputs preflight has access to. An agent that runs preflight on a project with an existing constraint set inherits the survey's decisions automatically. Surfacing this method as a constraint reference in preflight is the next step.
- **Future `oddkit tensions(...)` action.** Codifies the dynamic-generation step from Phase 3 as a tool call. Inputs: list of ilities, current phase, optional context. Output: tension graph in the same format as the canonical matrix. Until that tool exists, the dynamic-generation step is run by hand or by an agent reading the procedure in Phase 3.

---

## What This Method Does Not Do

Three things the method is deliberately silent on:

- **Stakeholder elicitation across multiple humans.** This method is single-operator or single-agent. Multi-stakeholder elicitation (the SEI QAW pattern) is a different method that may be drafted later if the need arises. The survey can be run by a team in conversation, but the method itself does not orchestrate that conversation.
- **Quantitative tension weights.** Tensions are tagged with relationship types (mutual / asymmetric / synergy / cost gravity) and phase weights (PoC / Pilot / Production), not with probabilistic or numeric scores. The categorical level matches the level at which decisions are actually made; quantitative scoring is tracked as a Bide candidate (NFR Framework above).
- **Continuous re-survey.** The survey is a discrete artifact, not a running process. Re-runs are triggered by named events (Phase 6), not by a heartbeat. Continuous tension monitoring would be a different method built on the observability extension; this one stops at scope-setting.

---

## Lineage

Two 2018 Medium articles by the same author seeded this method twenty months apart from arriving at canon: *Software Virtues — How to Prioritize* (the ility vocabulary and tensions) and *Lean Expectations — PoC, Prototype, MVP* (the lifecycle phasing). The agent-skill v1.3 PRD elicitation loop (now archived) prototyped the seven-phase shape in an elicitation context with brittle distribution; this method preserves the spirit on a durable substrate. The SEI ATAM tradition contributed the scenario-driven tradeoff framing; ISO/IEC 25010 contributed the vocabulary anchor. The principle at `canon/principles/quality-attributes-are-in-tension` is the asserted fact this method operationalizes; the matrix and observability extension are the worked examples this method consults during Phase 3.
