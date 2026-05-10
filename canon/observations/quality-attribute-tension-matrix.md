---
uri: klappy://canon/observations/quality-attribute-tension-matrix
title: "Quality Attribute Tension Matrix — All Forty-Five Pairs Across Ten Virtues, Phase-Weighted"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "observations", "quality-attributes", "software-virtues", "tradeoffs", "tensions", "matrix", "phase-weighting", "ilities"]
epoch: E0008.4
date: 2026-05-10
derives_from: "canon/definitions/software-virtues-vocabulary.md, canon/principles/quality-attributes-are-in-tension.md, odd/maturity.md, https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe"
complements: "canon/values/axioms.md"
governs: "Reference for which quality attributes are in tension with which, the type and direction of each tension, and the project phase at which each tension bites hardest. Used during prioritization, design review, and tradeoff analysis."
status: active
---

# Quality Attribute Tension Matrix — All Forty-Five Pairs Across Ten Virtues, Phase-Weighted

> A worked example of the tension graph across the canonical ten quality attributes: forty-five unique pairs, each tagged with relationship type (mutual tension / asymmetric grounding / synergy / cost gravity), direction (which virtue erodes which), and the project phase at which the tension bites hardest (PoC / Pilot / Production). Twenty-one of the pairs are named in the 2018 source article; twenty-four are filled in here for the first time. The matrix demonstrates the shape the tension survey produces — it is not the master reference. The universe of quality attributes is far larger than ten; this document is the corpus that shows what good looks like when the principle at `canon/principles/quality-attributes-are-in-tension.md` is applied.

---

## Summary — A Worked Example of the Tension Graph for the Canonical Ten

Every design decision moves at least one quality attribute up and at least one other down. The principle at `canon/principles/quality-attributes-are-in-tension.md` asserts that the moves are not random and that this holds for any set of quality attributes. This document maps the canonical ten as a worked example: which virtue erodes which, in which direction, and at which project phase the erosion is most consequential.

The matrix uses four relationship types:

- **Mutual tension (M)** — both virtues erode the other. Optimizing for one reliably costs the other.
- **Asymmetric grounding (A)** — one virtue disciplines the other without symmetric retaliation. The grounding virtue (usually reality) does not get eroded by what it constrains.
- **Synergy (S)** — both virtues reinforce each other, with mild tension only at extremes. Pursuing one tends to advance the other.
- **Cost gravity ($)** — affordability's relationship with every other virtue: each virtue is purchased with effort, time, or money, so affordability constrains how much of each can be afforded.

Phase weighting follows the three-level maturity model from `odd/maturity.md`:

- **PoC** (Level 0 — exploration, learning) — tension bites when the team has not yet decided whether the idea is worth pursuing.
- **Pilot** (Level 1 — pilot/product) — tension bites when the project has real users but has not yet committed to long-term operation.
- **Production** (Level 2 — production / long-term) — tension bites when the project is committed to ongoing operation under real load.

Most tensions bite at one phase more than the others. A single phase tag per cell names where the tension is sharpest; secondary phases are noted where the bite is broad.

---

## Compact Reference — The 10×10 Grid

Quick-reference grid. Lower-left triangle is filled (each pair appears once). Reading: row virtue's relationship to column virtue.

|              | Use | Orig | Stab | Urg | Eff | Maint | Vers | Inter | Aff | Real |
|--------------|:---:|:----:|:----:|:---:|:---:|:-----:|:----:|:-----:|:---:|:----:|
| **Use**ability    | ·   |      |      |     |     |       |      |       |     |      |
| **Orig**inality   | M   | ·    |      |     |     |       |      |       |     |      |
| **Stab**ility     | M*  | M    | ·    |     |     |       |      |       |     |      |
| **Urg**ency       | M   | M*   | M    | ·   |     |       |      |       |     |      |
| **Eff**iciency    | M*  | M*   | M*   | M   | ·   |       |      |       |     |      |
| **Maint**ain      | M*  | M*   | S    | M   | M   | ·     |      |       |     |      |
| **Vers**atility   | M   | M*   | M*   | M*  | M   | M*    | ·    |       |     |      |
| **Inter**op       | M*  | M    | M*   | M   | M*  | M*    | S    | ·     |     |      |
| **Aff**ordability | $   | $    | $    | $   | S   | S     | $    | $     | ·   |      |
| **Real**ity       | A   | A    | S    | A   | S   | S     | A    | S     | S   | ·    |

Legend: M = mutual tension (named in 2018 article). M* = mutual tension (filled in here). A = asymmetric grounding. S = synergy. $ = cost gravity. · = self.

---

## The Forty-Five Pairs

Each entry: relationship type, direction (if asymmetric), bite phase, and the operating dynamic. Pairs are ordered by row index then column index from the grid above.

### Pairs Centered on Usability

#### 1. Usability ↔ Originality (M, Pilot)

Mutual tension. New innovative features are rarely understood well enough to be made simple at first; usability requires patterns the user already recognizes, and originality means breaking those patterns. Bites hardest at pilot phase, when the original idea must reach actual users. Article-named.

#### 2. Usability ↔ Stability (M*, Pilot)

Mutual tension, mild. Polish for usability sometimes hides instability under aesthetics ("looks finished, breaks under edge cases"); defensive stability code can produce confirmation dialogs and error states that erode usability. The tension is subtle but real at pilot when the product first touches users who do not know the workarounds.

#### 3. Usability ↔ Urgency (M, Production)

Mutual tension. Rushing to ship leaves no time for user testing or interface refinement; user testing and refinement take time. Bites at production, where the cost of unusable software is paid in support load and churn. Article-named.

#### 4. Usability ↔ Efficiency (M*, Pilot)

Mutual tension, mild. Beautifully usable interfaces often involve animations, transitions, and helpful intermediate states that cost cycles; efficient backends sometimes dictate workflows that are technically correct but cognitively awkward. Bites at pilot when the product targets devices or networks where efficiency limits are felt.

#### 5. Usability ↔ Maintainability (M*, Production)

Mutual tension. Usability features add code paths (undo stacks, helpful errors, accessibility affordances) that increase the code surface; maintainable, conventional code structures sometimes resist the special-casing that good UX demands. Bites at production, where the maintenance cost of a usability-rich product compounds.

#### 6. Usability ↔ Versatility (M, Pilot)

Mutual tension. Versatility invites ambiguity that may undermine intuitiveness — software that does many things must offer choices, and choices erode the "one obvious way" that drives intuitive usability. Bites at pilot, when the product's scope is being negotiated against real-user friction. Article-named.

#### 7. Usability ↔ Interoperability (M*, Pilot)

Mutual tension. Interop layers expose options (which format to export, which provider to integrate with) that complicate the UX surface; UX that wants to feel decisive sometimes hides interop choices behind opinionated defaults that limit interoperability. Bites at pilot, when integration partners are negotiated.

#### 8. Usability ↔ Affordability ($, Pilot)

Cost gravity. Usability work — testing, iteration, design talent — has direct cost. Affordability constrains how much UX investment a project can sustain. Bites at pilot, when the unit economics of the product are first measured against the design budget.

#### 9. Usability ↔ Reality (A, PoC)

Asymmetric grounding. Reality keeps usability ambitions honest: an interface that tests well with the wrong user base is not usable with the right one. Reality is not eroded by usability; usability is grounded by reality. Bites at PoC, where unrealistic user assumptions are cheapest to correct.

### Pairs Centered on Originality

#### 10. Originality ↔ Stability (M, Pilot)

Mutual tension. Innovative approaches are inherently less battle-tested; stability requires patterns whose failure modes are known. Bites at pilot, when the original idea is exposed to the variability of real-world conditions. Article-named.

#### 11. Originality ↔ Urgency (M*, Pilot)

Mutual tension, asymmetric in flavor. Urgency forces shortcuts that look like originality but are actually hurried imitation; genuine originality requires the time to discover what is actually new. Bites at pilot, when the "are we actually doing something new or just shipping fast" question becomes answerable.

#### 12. Originality ↔ Efficiency (M*, Production)

Mutual tension. Novel approaches usually arrive less optimized than the patterns they replace; efficiency-first design often forecloses the experimental routes that produce originality. Bites at production, where the cost of novel-but-slow becomes operational.

#### 13. Originality ↔ Maintainability (M*, Production)

Mutual tension. Novel patterns are harder to hire for and harder to onboard against; maintainable conventions limit the shapes a novel approach can take. Bites at production, where the team must scale beyond the founders who understood the novelty natively.

#### 14. Originality ↔ Versatility (M*, Pilot)

Mutual tension, mild. Strong novel ideas are usually highly specific to a narrow problem; versatility-first design rarely produces deep originality. Bites at pilot, when the project must decide whether to deepen its novel angle or widen its applicability.

#### 15. Originality ↔ Interoperability (M, Pilot)

Mutual tension. Interop with existing systems requires conformance to existing standards, which forecloses some innovations; pure innovation often produces formats and protocols that the rest of the ecosystem cannot read. Bites at pilot, when integration with the user's existing workflow is negotiated. Article-named.

#### 16. Originality ↔ Affordability ($, Pilot)

Cost gravity. Innovation is expensive — research, dead ends, prototypes that do not ship. Affordability constrains how much novelty a project can afford. Bites at pilot, when the runway shape is first matched against the experimentation budget.

#### 17. Originality ↔ Reality (A, PoC)

Asymmetric grounding. Reality limits originality by reminding the team what is already done, what physics permits, and what users actually want. Reality is not eroded by originality; originality is grounded (sometimes harshly) by reality. Bites at PoC, where unrealistic novelty is cheapest to redirect. Article-named.

### Pairs Centered on Stability

#### 18. Stability ↔ Urgency (M, Production)

Mutual tension. Rushing increases the rate of bugs; thorough stabilization takes time the urgency budget does not have. Bites at production, where instability translates directly to user trust erosion. Article-named.

#### 19. Stability ↔ Efficiency (M*, Production)

Mutual tension. Hyper-optimization sometimes introduces instability (race conditions, edge-case overflow, brittle assumptions); defensive stability code adds overhead that erodes efficiency. Bites at production, where both stability and efficiency expectations are highest.

#### 20. Stability ↔ Maintainability (S, Production)

Synergy. Both stability and maintainability favor clean, predictable code with known failure modes. Mild tension only when "stable" code becomes "untouchable" — the legacy system whose stability comes from no one daring to change it. Bites at production, when the system is mature enough for legacy patterns to set in.

#### 21. Stability ↔ Versatility (M*, Pilot)

Mutual tension. Versatile code has more states, more code paths, and more configurations to test — making stabilization harder; stable code is often stable because its scope is narrow. Bites at pilot, when the scope-versus-reliability tradeoff is being negotiated.

#### 22. Stability ↔ Interoperability (M*, Production)

Mutual tension. External dependencies (services, APIs, formats) introduce failure modes the project cannot directly control; isolated, stability-first systems often refuse interop because every external connection is a new failure surface. Bites at production, where third-party outages become operational concerns.

#### 23. Stability ↔ Affordability ($, Production)

Cost gravity. Stability work — testing, redundancy, monitoring, on-call — has substantial cost. Affordability constrains how much reliability investment a project can sustain. Bites at production, where the cost of unreliability and the cost of reliability are both measurable.

#### 24. Stability ↔ Reality (S, PoC)

Synergy mostly. Reality demands stability where stakes are real; the meta-virtue and the technical virtue point in the same direction. Mild tension only when reality says "ship now and stabilize later" because the cost of waiting outweighs the cost of bugs. Bites at PoC, where the "ship now" pressure is highest.

### Pairs Centered on Urgency

#### 25. Urgency ↔ Efficiency (M, Production)

Mutual tension. Urgency leaves no time for optimization; efficiency work pushes against shipping deadlines. Bites at production, when the cost of inefficiency at scale finally exceeds the cost of slowing down to address it. Article-named.

#### 26. Urgency ↔ Maintainability (M, Production)

Mutual tension. Rushing produces technical debt; clean, maintainable patterns take longer to arrive at. Bites at production, where accumulated technical debt becomes the project's primary cost driver. Article-named.

#### 27. Urgency ↔ Versatility (M*, Pilot)

Mutual tension. Rushing leads to ignoring related use cases that would have informed a more versatile design; versatile design takes time to surface, name, and implement. Bites at pilot, when the project's scope-versus-deadline tradeoff is most consequential.

#### 28. Urgency ↔ Interoperability (M, Production)

Mutual tension. Rushing skips the study and integration of existing standards; interop work has substantial up-front cost that urgency budgets cannot afford. Bites at production, when standards-non-compliance produces real integration failures. Article-named.

#### 29. Urgency ↔ Affordability ($, Pilot)

Cost gravity. Urgency itself is expensive — overtime, rushed contractors, parallel workstreams. Affordability constrains how much urgency a project can fund. Bites at pilot, when burn rate and timeline first collide.

#### 30. Urgency ↔ Reality (A, Production)

Asymmetric grounding. Reality fights the tyranny of the urgent: not every urgent thing is actually urgent, and rushing on a false deadline costs everything else. Reality is not eroded by urgency; urgency is grounded by reality. Bites at production, where false urgency creates real damage. Article-named.

### Pairs Centered on Efficiency

#### 31. Efficiency ↔ Maintainability (M, Production)

Mutual tension. Optimized code is harder to read; readable conventional code is often slower. Bites at production, when both performance and maintainability bills come due. Article-named.

#### 32. Efficiency ↔ Versatility (M, Pilot)

Mutual tension. Efficient code is shaped tightly to its expected workload; versatile code must accommodate workloads it was not optimized for. Bites at pilot, when the scope decision determines how tight the optimization can be. Article-named.

#### 33. Efficiency ↔ Interoperability (M*, Production)

Mutual tension. Interop overhead — serialization, format conversion, protocol negotiation — has real cost; high-performance systems often use proprietary protocols specifically to skip that overhead. Bites at production, where high-throughput meets standards compliance.

#### 34. Efficiency ↔ Affordability (S, Production)

Synergy. Efficiency is a primary mechanism for affordability — fewer cycles is fewer dollars. The two reinforce each other directly. Mild tension only when the engineering cost of an efficiency win exceeds the operational cost of running un-optimized. Bites at production, where unit economics become decisive.

#### 35. Efficiency ↔ Reality (S, Pilot)

Synergy. Reality demands that hardware and cloud bills get paid; efficiency answers. Mild tension only when reality says "ship before optimizing" because the optimization budget is better spent learning whether anyone wants the product. Bites at pilot, where the "premature optimization" failure mode is most expensive.

### Pairs Centered on Maintainability

#### 36. Maintainability ↔ Versatility (M*, Production)

Mutual tension. Versatile code has more code paths to maintain; maintainable conventions often limit the shapes a versatile system can take. Bites at production, where both maintainability and versatility expectations compound.

#### 37. Maintainability ↔ Interoperability (M*, Production)

Mutual tension, mild. Interop layers add code surface area to maintain; well-chosen standards reduce interop complexity by externalizing the spec. The tension net depends on which standards are chosen. Bites at production.

#### 38. Maintainability ↔ Affordability (S, Production)

Synergy. Maintainability reduces technical debt, which reduces ongoing development cost. The two reinforce each other directly. Tension only when maintainability investment (refactoring, documentation, test infrastructure) exceeds the cost of accumulated debt at the project's current scale. Bites at production, where the cost of un-maintainable code compounds. Article-named (implicitly).

#### 39. Maintainability ↔ Reality (S, Pilot)

Synergy. Reality favors hireable, conventional, well-understood code; maintainability serves that. Tension only at PoCs where conventional code costs more than throwaway code. Bites at pilot/production, where the project commits to a maintenance future or accepts a rewrite.

### Pairs Centered on Versatility

#### 40. Versatility ↔ Interoperability (S, Production)

Synergy mostly. Interoperability is itself a form of versatility — the ability to participate in adjacent workflows. The two reinforce each other. Mild tension only when interop standards limit what the project can express (e.g., a REST-only standard locks out streaming designs). Bites at production.

#### 41. Versatility ↔ Affordability ($, Pilot)

Cost gravity. Versatile design takes more time, more testing, and more code surface — all expensive. Affordability constrains how much versatility a project can afford. Bites at pilot, when scope and budget first negotiate.

#### 42. Versatility ↔ Reality (A, Pilot)

Asymmetric grounding. Reality limits versatility ambitions: it is rarely realistic to achieve broad versatility, and chasing it produces software that does many things badly. Reality is not eroded by versatility; versatility is grounded by reality. Bites at pilot, where scope ambition meets evidence about what users actually do. Article-named.

### Pairs Centered on Interoperability

#### 43. Interoperability ↔ Affordability ($, Pilot)

Cost gravity. Interop work — protocol implementation, format conversion, partner integration — has direct cost. Affordability constrains how much interop a project can fund. Bites at pilot, when integration partner agreements are first scoped against budget.

#### 44. Interoperability ↔ Reality (S, Pilot)

Synergy. Reality favors integration with the tools users already have; interoperability answers. Mild tension only when interop ambitions outrun real user needs (building bridges to systems no one bridges to). Bites at pilot, when integration scope is decided.

### Pair Centered on Affordability and Reality

#### 45. Affordability ↔ Reality (S, all phases)

Synergy. Affordability and reality are both grounding meta-virtues; they reinforce each other directly. Reality's costs/benefits/risks/dependencies/penalties/compliance lens IS, in operational terms, an affordability analysis. Tension only when the framings are mismatched (e.g., reality demands compliance investment that the affordability budget cannot sustain — at which point the project's viability is itself in question). Bites at all phases, since both operate continuously.

---

## How to Read the Matrix

The matrix supports three primary uses:

**Design review.** Before committing to a design, look up the pairs of virtues most affected by the choice. For each pair, name the predicted direction of erosion and decide whether the cost is acceptable for the project's current phase.

**Disagreement diagnosis.** When a team disagrees about a tradeoff, the disagreement is often about which virtue is being prioritized rather than about facts. The matrix gives the disagreement a vocabulary: "you are prioritizing originality and accepting the predicted erosion of stability — at our current phase, is that the right call?"

**Phase audit.** When a project moves between phases (PoC → Pilot → Production), the priorities shift. Use the phase tags to identify which tensions become more consequential at the new phase and which become less. Cross-reference with `odd/maturity.md` for the phase-by-phase weighting of the virtues themselves.

---

## What This Matrix Does Not Claim

Three things the matrix is deliberately silent on:

- **The relative weight of each virtue** — that is project-specific and phase-specific. The matrix names the directions of tension, not the priority ranking.
- **The correct decision in any given case** — the matrix surfaces the costs of a choice; the choice itself is a judgment call that depends on the team's priorities and the project's phase.
- **Completeness** — there are dozens of quality attributes beyond these ten (auditability, securability, debugability, deployability, recoverability, observability, portability, accessibility, localizability, and many more). A static matrix cannot scale to the full universe; the canonical ten are a worked example that demonstrates the shape. For a project that uses a different set, the principle at `canon/principles/quality-attributes-are-in-tension.md` holds — generate the tension graph for that set dynamically rather than treating this matrix as the master reference. See `canon/observations/observability-tension-extension.md` for one worked example of the extension pattern, applied to observability because ODD has rich existing canon to stitch from.

---

## Lineage

Twenty-one of the forty-five pairs are named in "Software Virtues — How to Prioritize" (Chris Klapp, Medium, 2018), distributed across the article's per-virtue sections as "natural enemies" paragraphs. Twenty-four pairs are filled in here for the first time, completing the worked example the original article only sketched. Canon vocabulary uses "tensions" rather than the article's original "natural enemies" — the relationship is structural, and "tensions" carries the structural meaning more precisely. The phase-weighting axis is added from `odd/maturity.md`, which itself descends from the 2018 article's "Lifecycle Priorities" section.
