---
uri: klappy://canon/principles/dream-house-principle
title: "The Dream House Principle — Draw the Full Version Before Cutting from Contact with Reality"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "methodology", "pre-optimization", "design", "scope", "decision-making", "axiom-1", "cost-collapse", "both-audiences"]
epoch: E0008
date: 2026-04-23
derives_from: "canon/values/axioms.md, canon/principles/capability-is-not-permission.md, canon/constraints/measure-before-you-object.md, canon/observations/performed-prudence-anti-pattern.md"
complements: "canon/principles/discernment-layer.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, writings/the-dream-house-and-pre-optimization.md"
governs: "All work that involves deciding what to cut, defer, simplify, or pre-emptively constrain before the full version has been drawn"
status: active
---

# The Dream House Principle — Draw the Full Version Before Cutting from Contact with Reality

> When facing a decision that involves cutting scope, sacrificing features, or pre-optimizing, draw the full version first. Then cut from contact with reality, not from prediction. The cuts you make from contact are smaller, sharper, and more correct than the cuts you would have made from imagination — and the rooms you would have cut speculatively often turn out to be the load-bearing ones.

---

## Summary — The Dream Is the Starting Point, Not the Fantasy

A recurring failure mode in engineering, product design, writing, and personal finance is to cut a scope item *before* the full version has been drawn. The contributor looks at a proposal, identifies items that might be expensive, and reaches for them first. The motivation sounds disciplined — *be realistic, stay in budget, avoid over-engineering*. The effect is to remove things that turn out to matter, based on a prediction about cost that is almost always wrong in the same direction: the predicted cost is too high, the predicted value is too low, and the removed item is missed when the artifact is used in practice.

The Dream House Principle inverts this sequence. The full version is drawn first — every room, every feature, every section. Only after the full version exists does the contributor evaluate against the real constraint: the actual budget, the actual scope, the actual timeline. Cuts are then made from that position. The cuts are different from the cuts that would have been made speculatively: they are fewer, larger, and more targeted. The small items that pre-optimization would have removed are almost always kept. The large structural choices that need real consideration get the attention they deserve.

This principle is not a claim that everything should always be built. It is a claim about *when* the cut should happen in the decision sequence. The rule is: **draw first, cut from contact second — never the reverse.**

The economic environment of 2026 is what makes the principle tractable. When the cost of producing a candidate — a draft, a diagram, a prototype, a bench — has dropped by one to two orders of magnitude (see `canon/principles/capability-is-not-permission`), the act of "drawing the full version" no longer requires a week of engineering labor. It requires a prompt, a few minutes of model time, and the operator's judgment about whether the result is worth iterating on. In that cost structure, pre-optimizing is no longer disciplined — it is the failure mode.

---

## The Rule — Draw First, Cut from Contact

The operative form of the principle is a two-step sequence with a forbidden third move.

**Step 1: Draw the full version.** The full version is the artifact that would exist if the constraint you are worried about did not apply. The whole feature set. The entire document. Every room of the house. The point is not to commit to building it — the point is to have it on the table, in enough detail that its parts can be evaluated against each other and against the constraint.

**Step 2: Evaluate against the real constraint.** The real constraint is the one that will actually bind: the real budget, the real timeline, the real bundle size, the real attention span of the reader. Not the worst-case constraint imagined in planning. The real one, with real numbers, measured or closely estimated.

**Forbidden third move: Cut from prediction before Step 1.** Any decision to remove, simplify, or constrain a part of the artifact that is made *before* the full version exists is a speculative cut. Speculative cuts are not discipline; they are a bet that the part being removed is not worth drawing — a bet made without the evidence that drawing the full version would have produced.

The sequence **draw → cut from contact** is the principle. The inversion **cut from prediction → draw what's left** is the anti-pattern. The two look similar from the outside because both produce an artifact with things omitted. The difference is visible in what the artifact contains: the draw-first version contains the rooms that turned out to matter; the cut-first version is missing them and the operator does not know what they were missing.

---

## What Counts as "the Full Version"

The full version is domain-specific. In software architecture, it is the system as it would be if the known-hard constraints did not apply — the feature set, the data model, the user flows, before any "we can't afford that" clause. In writing, it is the draft before the word count is enforced, with every section that seems to belong. In product design, it is the spec with every feature a user has asked for. In expense decisions, it is the wishlist with every item priced.

The full version does not mean the unconstrained fantasy. It means the *coherent vision*: the version a thoughtful contributor would propose if asked for their best design, knowing only the domain and the goal, before applying the budget as a filter. The difference between fantasy and full version is that the full version is defensible item by item — each part has a reason to be there, derived from the goal, not from indulgence.

The full version is also a thing that is *drawn*, not *built*. Drawing is cheap. Building is not. The principle only asks that the drawing happen before the cuts. The building, and what gets built, is decided in Step 2.

---

## The Failure Mode This Principle Prevents

The failure mode is pre-optimization — the move where a contributor removes a part of the artifact speculatively, before the whole artifact has been drawn or priced.

Pre-optimization is indistinguishable from prudence in the moment. The contributor sounds careful. Each cut has a plausible reason — *we probably can't afford that, we shouldn't even draw it*. The reasons are individually defensible and collectively wrong. The cumulative effect is an artifact that is missing the parts that would have mattered, designed around constraints that turn out to be cheaper than predicted, and optimizing for problems that were not real.

This pattern is named separately as `canon/observations/performed-prudence-anti-pattern` when it happens at the level of individual objections. The Dream House Principle is the preventive inverse: it specifies the sequence that makes pre-optimization structurally unavailable, because the cuts only exist *after* the full version has been drawn.

The rhetorical label for the failure mode is *penny wise and pound foolish*. Each speculative cut shaves a small amount off the predicted cost. Over time, the operator notices the absence of every removed item, and the cumulative lost value is many times the cost that was supposedly saved.

---

## Why This Works in 2026

The principle is not new. Semi-custom home designers have been teaching clients the dream-first approach for decades. The reason it was not universal in software before was that drawing the full version used to be expensive — an engineer's week to produce a serious design, an architect's month to produce a serious system, a writer's day to produce a serious draft. In that cost structure, a heuristic that cut items before drawing was at least partially rational: the cost of drawing everything was itself a scope risk.

That cost structure is gone. The cost of producing a first draft of a design, a system diagram, a prototype, a bench, or an essay has dropped by one to two orders of magnitude (see `canon/principles/capability-is-not-permission`). The limit is no longer the operator's labor to draw. The limit is the operator's judgment about what to ask for and what the result means.

In this environment, drawing the full version is not extravagant. It is the cheap step. Pre-optimizing is the expensive step, because it costs the operator's attention to debate hypothetical cuts against hypothetical budgets, when the actual full version and the actual constraint could both have been produced in the time the debate took.

The principle and the cost structure reinforce each other. Draw-first is tractable because drawing is cheap. Drawing is cheap because AI-augmented workflows changed the production cost of candidates. The operator's remaining expensive resource — judgment — is spent on the cut, not on the draw.

---

## Application Across Domains

The principle applies across domains that share the structure *propose → constrain → deliver*. A non-exhaustive list, with the shape the principle takes in each.

**Software architecture.** Design the full system before deciding what to de-scope. Write the full API before deciding which endpoints to defer. Draw the full data model before deciding what to normalize. The de-scope decisions made from a full system are different from the decisions made from a pre-scoped system — and almost always better.

**Writing.** Draft the full essay — every section that seems to belong — before cutting for length. The length-cut pass almost always removes less than the pre-optimizing pass would have, because the sections that seem cuttable in isolation often turn out to be load-bearing when the whole is in front of you.

**Product design.** Spec the whole feature set before triaging by effort. The triage is easier and more correct from a full spec than from a spec that was already pruned by effort-anxiety.

**Expense decisions.** Price the whole list — the house, the trip, the setup — before triaging by budget. The triage is easier and more correct from full prices than from a list that was already pruned by guessed costs.

**Hiring and team structure.** Design the whole team before cutting by headcount. The compromises made from a complete team design are different from the compromises made from a pre-pruned one.

**Personal schedule.** Draft the whole week or quarter before cutting by time budget. The same pattern — the items that look cheap-but-cuttable at the planning stage often turn out to be the things that preserve the operator's capacity.

The principle is not that every domain will produce the full version and build all of it. The principle is that the cuts happen *from contact with reality*, which requires contact with reality to exist — which requires the full version to have been drawn.

---

## What This Principle Does Not Require

The principle does not require building the full version. It requires *drawing* the full version — producing a concrete enough representation that its parts can be evaluated and cut. A napkin sketch, a one-paragraph spec, a rough prototype — any artifact detailed enough to make the cut-from-contact decision is sufficient.

The principle does not require that every full version gets most of its parts kept. Some full versions turn out to be genuinely over-scoped and get cut significantly. The point of the principle is not to preserve parts — it is to make sure the parts that get kept are the ones that survive contact with the real constraint, not the ones that survive predicted constraints.

The principle does not apply when the drawing cost is comparable to the building cost. In domains where the full version cannot be drawn cheaply — hardware requiring physical fabrication, clinical trials, cryptographic protocols where testing is the cost of waiting for a real-world attack, regulated domains where the measurement itself is a legal event — the old sequencing may still be the right sequencing. See `writings/the-dream-house-and-pre-optimization` for the scope caveat.

The principle does not promise that the cuts will be painless. It promises they will be *more correct*. A cut made from contact with reality can still be a hard cut, a painful trade-off, a real sacrifice. The value is that the operator knows what was traded for what, rather than discovering a year later that a speculative cut removed a room they would have loved.

---

## Verification

An operator or team applying this principle can verify they are doing so by asking the following questions at the moment a cut is being made:

- Has the full version of this artifact been drawn, in enough detail that I can see what I'm cutting?
- Am I cutting because the real constraint requires it, or because I predict it will?
- If I evaluated this cut after drawing the full version, would I still make it?

Three yeses indicate the principle is being honored. Any no indicates the cut is speculative and the principle is being violated.

A team that notices its cuts in retrospect are the cuts it wishes it hadn't made — that the removed rooms turn out to have been the load-bearing ones — is a team that has been pre-optimizing. The fix is structural, not motivational: change the sequencing so the cuts happen after the full version exists.

---

## Origin

The principle is older than its naming. It has been operating in multiple domains for a long time — in architecture, in product design, in long-form writing, in investment strategy. The version that produced this canon entry was articulated by a semi-custom home designer to a client who was triaging every fixture and finish before drawing the whole house. The designer's move — *let's design the dream version first, see how far over budget we are, then decide what to swap* — surfaced a pattern the client had been applying implicitly in software architecture for years without naming it.

The lived account is `writings/the-dream-house-and-pre-optimization`. The principle is canonized here so the rule can be applied without needing to re-derive it from the story.

---

## See Also

- [Measure Before You Object](klappy://canon/constraints/measure-before-you-object) — the rule that prevents pre-optimizing objections from blocking the drawing of the full version
- [Canon-Integration Audit](klappy://canon/constraints/canon-integration-audit) — the meta-constraint whose concept audit would have canonized this principle at rev 5 of the sibling essay instead of rev 23
- [Performed Prudence Anti-Pattern](klappy://canon/observations/performed-prudence-anti-pattern) — the failure mode that the Dream House sequencing structurally prevents
- [Capability Is Not Permission](klappy://canon/principles/capability-is-not-permission) — the cost structure that makes draw-first tractable; when production cost drops below deliberation cost, drawing is cheap and cutting-first loses its justification
- [The Discernment Layer](klappy://canon/principles/discernment-layer) — what the operator's judgment does during Step 2 (cut from contact); discernment is the expensive resource after drawing becomes cheap
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — why speculative cuts tax the operator's attention, which is the bottleneck of the modern workflow
- [Axioms](klappy://canon/values/axioms) — Axiom 1 (Reality Is Sovereign) is the source: the cut must be made against real constraints, not predicted ones
- [The Dream House and Pre-Optimization](klappy://writings/the-dream-house-and-pre-optimization) — the sibling essay; lived account, receipts, and the economic context
- [The Cost of Code Dropped to Zero](klappy://writings/the-cost-of-code-dropped-to-zero) — predecessor essay on the same cost-collapse that makes draw-first tractable
