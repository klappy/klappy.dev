---
uri: klappy://canon/principles/quality-attributes-are-in-tension
title: "Quality Attributes Are In Tension — The Tradeoff Space Cannot Be Flattened"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "principles", "quality-attributes", "software-virtues", "tradeoffs", "tensions", "ilities"]
epoch: E0008.4
date: 2026-05-10
derives_from: "canon/definitions/software-virtues-vocabulary.md, canon/values/axioms.md, https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe"
complements: "odd/maturity.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
governs: "How tradeoffs between competing software properties are reasoned about across canon. Holds for any set of quality attributes, not only the canonical ten. Forbids reasoning that flattens the tradeoff space into a single objective function. Requires phase-aware weighting rather than universal rankings."
status: active
target_repo: "outcomes-driven-development"
---

# Quality Attributes Are In Tension — The Tradeoff Space Cannot Be Flattened

> Optimizing one quality attribute reliably degrades at least one other. The pairs are not random; they are structural. Urgency erodes stability and maintainability. Originality erodes usability and stability. Versatility erodes usability and efficiency. Affordability has cost gravity over all the others. Reality grounds them all against the world as it is. The pairs are real, the directions are predictable, and any framework that promises to optimize for everything simultaneously is selling you a flattened picture of a tradeoff space that is structurally a space of tensions. This principle holds for any set of quality attributes, not only the canonical ten worked through at `canon/observations/quality-attribute-tension-matrix.md`.

---

## Summary — The Tradeoff Space Is Structured by Tensions, and Pretending Otherwise Is the Failure

Software has no single objective function. The ten virtues catalogued in `canon/definitions/software-virtues-vocabulary.md` — usability, originality, stability, urgency, efficiency, maintainability, versatility, interoperability, affordability, reality — each name a property worth pursuing. None of them can be maximized in isolation. Optimizing one moves at least one other downward along a predictable axis. The same holds for the broader universe of quality attributes (auditability, securability, debugability, deployability, recoverability, observability, and dozens more) — the canonical ten are a worked example, not the full set.

This is not a regrettable accident of engineering. It is the structural shape of the problem. A framework that claims to deliver "fast, reliable, maintainable, secure, scalable, and innovative" software without naming what each of those costs is not describing a tradeoff space; it is describing a wishlist.

The principle has three operational consequences. First, **prioritization is not optional** — every project ranks its quality attributes, even if it ranks them by accident. Second, **the priorities shift** with the project's phase: a proof-of-concept that demands the same stability as a production system has misallocated its effort, and a production system that tolerates the originality budget of a prototype has accepted the wrong risk. Third, **the tension graph is the prior** — a ranking that violates the predictable directions of the graph (e.g., simultaneously claiming maximum urgency and maximum maintainability) is incoherent, not ambitious.

The principle is grounded in `canon/values/axioms.md` Axiom 1 (Reality Is Sovereign): the tension structure of the tradeoff space is real whether or not the team acknowledges it. Refusing to name the tensions does not eliminate them; it only ensures the team will hit them without orientation.

---

## The Pairs Are Predictable

The tension graph is not random. The pairs follow from how each virtue is achieved:

- **Urgency** is achieved by skipping checks. It erodes anything that requires checking — stability, maintainability, usability, interoperability.
- **Originality** is achieved by departing from the well-trodden path. It erodes anything that benefits from being well-trodden — usability (users know the old patterns), stability (the old patterns are battle-tested), interoperability (standards exist for a reason).
- **Versatility** is achieved by widening the surface area. It erodes anything that benefits from a narrow surface — usability (more options is more confusion), efficiency (more code paths is more cycles), maintainability (more states is more tests).
- **Efficiency** is achieved by shaping code tightly to its expected workload. It erodes anything that benefits from generality — versatility, maintainability (optimized code is harder to read), sometimes stability (defensive code costs cycles).
- **Affordability** is unique: it has cost gravity over every other virtue, because each virtue is purchased with effort, time, or money. Affordability does not erode the other virtues directly; it constrains how much of each can be afforded.
- **Reality** is also unique: it is the meta-virtue that grounds the others against the world as it is. It does not compete with them; it disciplines their pursuit.

The full enumeration — 45 unique pairs across the ten virtues, with phase-weighting and worked examples — is at `canon/observations/quality-attribute-tension-matrix.md`.

---

## The Failure Modes This Principle Forbids

Three reasoning failures violate the principle and should be flagged when they appear:

### Flattening — "We Optimize for All of Them"

The claim that a project simultaneously delivers all the virtues at high levels. This claim is not ambition; it is incoherence. The tension graph predicts that maximizing one virtue moves another downward. A project claiming maximum delivery on the full set is either lying, redefining the virtues to avoid their tensions, or has not yet hit the phase where the tensions bite.

### Universal Rankings — "Stability Is Always First"

The claim that one virtue is universally most important. This is true only when the project's phase is held fixed. A proof-of-concept that prioritizes stability over originality has spent its effort on the wrong virtue for its phase. A production release that prioritizes originality over stability has shipped a prototype to users. The ranking shifts with the phase; see `odd/maturity.md`.

### Hidden Tradeoffs — "We Did Not Sacrifice Anything"

The claim that a choice optimized for one virtue at no cost to others. Sometimes this is true at small scales (a small efficiency gain that does not measurably affect maintainability). Often it is the result of not having looked. The graph predicts where to look; if the predicted cost is not visible, the question is whether it has not yet manifested or whether the team has not yet measured the right thing.

---

## How to Use This Principle

When making a substantial design or scoping decision, the principle obligates the team to answer three questions:

1. **Which virtue is being prioritized?**
2. **Which other virtues does the tension graph predict will be sacrificed?**
3. **Is the predicted sacrifice acceptable for this project at this phase?**

Answers to (2) come from the matrix at `canon/observations/quality-attribute-tension-matrix.md` for the canonical ten, and from dynamic generation against this principle for any other quality attributes the project happens to use. Answers to (3) come from `odd/maturity.md` and the team's project-specific weighting.

A decision that cannot answer all three is incomplete, not because the team lacks vision, but because the team is operating on a flattened picture of a tradeoff space whose structure is tensions all the way down.

---

## Lineage

The principle is the canonical re-statement of the central observation in "Software Virtues — How to Prioritize" (Chris Klapp, Medium, 2018). The 2018 article called these tensions "natural enemies" and named them per-virtue; this principle states the structural fact behind them — quality attributes are in tension — and the matrix at `canon/observations/quality-attribute-tension-matrix.md` enumerates the canonical ten systematically. The principle holds for any set of quality attributes; the matrix is a worked example, not the master reference.
