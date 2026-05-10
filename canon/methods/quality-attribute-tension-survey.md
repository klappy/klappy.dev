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

**Question (dual-state).** Which quality attributes does this project optimize for **today**, and which should it optimize for **going forward**? The two lists are usually close but not identical; the survey asks for both in one pass.

**Output.** A pair of lists with explicit removals. The canonical ten from `canon/definitions/software-virtues-vocabulary.md` are the starting set; additions come from the broader universe (observability has its own extension at `canon/observations/observability-tension-extension.md`; auditability, securability, accessibility, portability, etc., may apply). Each ility is tagged with a current-state inclusion flag and a desired-state inclusion flag. Removals are listed explicitly for each state: "this project does not optimize for X today because Y" and "this project will not optimize for X going forward because Z." Differences between the lists are the *scope-shift* component of the roadmap.

**Transition.** When both lists are stable — every retained ility has a reason in both states, every removed ility has a reason in the state where it was removed. Aim for between four and twelve ilities in either list. Fewer than four usually means the project is too narrowly framed; more than twelve usually means the survey will not converge.

### Phase 2 — Phase-Weighted Ranking

**Entry.** Selected ilities (current + desired) from Phase 1, stage from Phase 0.

**Question (dual-state).** For each selected ility, what level is the project at **today** (1–4 MoSCoW), and what level **should it be** going forward? Answer both for each ility in the same pass.

**Output.** A pair-of-ranks per ility: `(current, desired)`. MoSCoW scale — 1 (Won't), 2 (Could), 3 (Should), 4 (Must). The ranking is project-and-stage-specific; do not reuse a ranking from another project. Where current equals desired, the project is on-target on that axis. Where they differ, the gap *is* the roadmap item for that axis (Phase 5 will encode it).

**Transition.** The phase-weighting prior at `odd/maturity.md` gives the default shape for the *desired* column (PoC tolerates more originality and less stability; Production demands more stability and tighter affordability; etc.). The *current* column comes from observation — code investments, telemetry, contributor surveys, spec compliance, lived experience of the team. Both columns may override the prior, but every override should be named. If the override list is longer than three items in either column, the project is doing something genuinely unusual and the operator should pause.

### Phase 3 — Tension Surfacing

**Entry.** Dual-state ranked list (current + desired) from Phase 2.

**Question (dual-state).** What tensions does the **desired** ranking expose? What tensions is the **current** ranking already exposing? Where the two differ, which tensions are being added, removed, or intensified by the planned shift?

**Output.** Two tension sets — desired-state tensions (what the project is *committing to* live with) and current-state tensions (what the project is *already* living with) — plus a delta noting any tensions that change between them. For ility pairs within the canonical ten, consult `canon/observations/quality-attribute-tension-matrix.md` directly. For pairs that include observability, consult `canon/observations/observability-tension-extension.md`. For pairs outside the canonical ten and the worked extensions, generate the tension graph dynamically against the principle at `canon/principles/quality-attributes-are-in-tension.md`. The dynamic-generation step is described in the next subsection.

**Transition.** When every tension involving a top-three-ranked ility (in either state) has been named with a relationship type (mutual / asymmetric / synergy / cost gravity), a phase tag, and a one-sentence operating dynamic, this phase is complete. The remaining tensions — those involving lower-ranked ilities — are surfaced as background but not analyzed in detail.

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

**Entry.** Tension list from Phase 3 (both states), dual-state ranking from Phase 2.

**Question (dual-state).** Are the sacrifices the project is **currently** making acceptable? Are the sacrifices the **desired** ranking will require acceptable? Where they differ, name the shift explicitly.

**Output.** Each predicted sacrifice tagged accept or reject for both states. Accepts proceed. Rejects trigger reversion to Phase 2 — the ranking that produced an unacceptable sacrifice is itself the problem, not the tension. The dual-state view often surfaces an asymmetry the single-state view misses: the project may be living with a sacrifice today that the team rejects as a future commitment, in which case the shift itself is a roadmap item — not just a re-ranking.

**Transition.** This phase commonly produces one or two reversions. That is healthy. A survey that runs straight through Phase 4 without any reversion is suspicious; either the rankings were trivially obvious or the survey is rubber-stamping rather than surveying.

### Phase 5 — Output Encoding

**Entry.** Accepted dual-state ranking from Phase 2, accepted sacrifices from Phase 4.

**Question.** What artifacts does this survey produce that the agent working on the project must inherit, and how is the gap between current and desired encoded as roadmap?

**Output.** Three DOLCHEO artifact types fall out of one survey pass — see `canon/definitions/dolcheo-vocabulary`:

- **Constraints (C)** encode the **desired state** — these are what the agent inherits. Each one of:
  - **Priority constraint** — "This project prioritizes [ility] at level [N] above [list of lower-ranked ilities]."
  - **Sacrifice constraint** — "This project accepts [ility]'s erosion of [other ility] because [reason]."
  - **Ility-set constraint** — "This project optimizes for these ilities and explicitly does not optimize for [removed ilities]."
  - **Phase constraint** — "This project is at [stage]; constraints will be re-surveyed at the next phase transition."
- **Observations (O)** encode the **current state** — one per ility, recording the observed level as evidence rather than aspiration. "Observed: Stability at level [N] today, based on [source — telemetry, code review, contributor survey, lived experience]."
- **Opens (O-open)** encode the **gaps** — one per ility where current ≠ desired, ranked by gap magnitude. Each Open is a roadmap item: "Stability: current [N], desired [M], gap +[k] — close by [direction of investment]." Where current > desired, the Open names a *disinvestment* opportunity.

All three sets are saved to the project's session, ledger, or whichever persistence layer the project uses. Constraints become the answer the agent gives whenever it is uncertain about which virtue to prioritize. Observations are the falsifiable baseline against which future surveys measure drift. Opens are the prioritized roadmap.

**Transition.** When every desired-state decision has produced at least one Constraint, every selected ility has at least one Observation recording its current level, every non-zero gap has produced one Open, and all three sets are saved (encoded artifacts do not persist on their own — see `klappy://canon/definitions/dolcheo-vocabulary`), the survey is complete.

### Phase 6 — Re-Run Triggers

**Entry.** Saved Constraint set, Observation set, and Open (gap/roadmap) set from Phase 5.

**Question.** Under what conditions does the survey re-run, and what happens to the existing artifacts when it does?

**Output.** A short list of explicit re-run triggers, with handling rules. Standard triggers:

- **Phase transition** — the survey re-runs from Phase 0; the prior Constraints and Observations are archived as historical record; the prior Opens are evaluated for closure (did the roadmap items get done?) before being archived. The re-survey produces fresh artifact sets.
- **Scope change beyond a named threshold** — operator-defined; e.g., "if the user base or the use case fundamentally shifts, re-survey."
- **Tension surprise** — a failure mode reveals an unsurfaced tension; the survey re-runs from Phase 3 with the new tension added.
- **Stakeholder change** — if the team's composition shifts in a way that changes the priorities (a new product owner, a new technical partner with veto power), re-survey.
- **Drift detection** — if observed behavior (telemetry, code investments, contributor surveys) shows the current state has drifted measurably from the prior Observation set, re-survey Phases 1–2 minimum.

**Transition.** This phase produces a short paragraph attached to the artifact set, describing the trigger conditions. The paragraph is itself a Constraint that the agent inherits.

---

## Output Format — What the Survey Produces

A complete survey run produces seven named outputs, all small enough to fit in one operator-readable artifact:

1. **Stage** — single classification from Phase 0
2. **Ility set (current + desired)** — paired lists from Phase 1 with rationale for removals in either column
3. **Rankings (current + desired)** — per-ility (current, desired) tuples from Phase 2 on the MoSCoW scale
4. **Tension list** — top tensions from Phase 3, with deltas where current and desired diverge
5. **Accepted sacrifices (current + desired)** — list from Phase 4 with one-sentence justification each
6. **Constraint set** — DOLCHEO Constraints from Phase 5 (encoding the desired state) plus Observations (current state) and Opens (gaps as roadmap)
7. **Re-run triggers** — short paragraph from Phase 6

The whole artifact is typically under 600 words. Surveys longer than that are usually the result of skipping Phase 1's removal step (too many ilities in play) or skipping Phase 2's prior (re-deriving the ranking from scratch instead of starting from `odd/maturity`).

---

## The Survey Is a Personality Test for the Product

The cleanest way to think about the survey output is not as a list of constraints but as a personality profile. The same shape humans use to map traits onto a person — a radar chart with one axis per trait — maps naturally onto a project. Each ility is a trait; the project's ranking on each ility is its score; the polygon connecting the scores is the project's *shape*. Two products can have similar functions and entirely different personalities, and that personality difference is the most important thing a stakeholder, a reviewer, or an inheriting agent needs to know about the project up front.

This framing earns the radar chart for free. It is also the framing that lets the survey reach audiences who would never read a method doc — "what's your product's personality?" is a question that gets answered; "have you completed your quality-attribute tension survey?" is a question that gets ignored.

### Format — Tension-Opposite Ordering, MoSCoW Scale, Two Polygons, Sortable

The default radar has one axis per ility in the project's selected set, ordered such that **ilities in strong mutual tension sit across from each other on the chart**, and ilities that reinforce each other sit adjacent. The visual benefit is structural: a spike on one axis with a valley directly across it shows the polygon *leaning* toward what the project prioritizes against what it sacrifices. Adjacent synergistic ilities form smooth contours — the polygon's "natural gravity" toward coherent clusters. Tension-adjacent ordering (the earlier draft) buried both effects in local jaggedness.

The default tension-opposite ordering for the canonical ten, clockwise from top:

| Position | Right half (synergy chain) | Across from | Left half (tension cluster) |
|:---:|---|---|---|
| 0 (top) | Stability | ↔ (5, bottom) | Urgency |
| 1 | Maintainability | ↔ (6) | Versatility |
| 2 | Reality | ↔ (7) | Originality |
| 3 | Affordability | ↔ (8) | Usability |
| 4 | Efficiency | ↔ (9) | Interoperability |

The right half (axes 0–4) forms a synergy chain: every adjacent pair on the right is synergistic per the matrix (Stability ↔ Maintainability, Maintainability ↔ Reality, Reality ↔ Affordability, Affordability ↔ Efficiency). Each axis is *also* mutually tense with the axis 180° across it — the article-named pair Stability/Urgency leads, then Maintainability/Versatility, Reality/Originality, Affordability/Usability, Efficiency/Interoperability. The polygon's silhouette becomes the tradeoff record by construction.

Extensions slot in adjacent to whichever canonical ility they have the strongest *synergy* with, and (if possible) opposite their strongest *tension*. Observability sits adjacent to Stability (its strongest S) and benefits from being across the urgency-leaning portion of the chart. Auditability sits adjacent to Reality (its grounding ility). Accessibility sits adjacent to Usability. The general rule: synergy adjacent, tension opposite.

The scale is **MoSCoW** — 1 (Won't), 2 (Could), 3 (Should), 4 (Must) — matching the elicitation method the 2018 source article surfaced and the categorical level at which Phase 2 produces its rankings. Quantitative 0–100 scoring is rejected as false precision; the categorical level matches the level at which decisions are actually made.

Every radar shows **two polygons** because every survey produces a dual-state output (Phase 2):

- **Desired polygon** (solid fill, full opacity) — the personality the project commits to. Encoded as DOLCHEO Constraints in Phase 5.
- **Current polygon** (dashed outline, lighter, no fill) — the personality the project actually has today. Encoded as DOLCHEO Observations in Phase 5.

Where the polygons coincide, the project is on-target on that axis. Where they diverge, the gap is a roadmap item — Phase 5 encodes each non-zero gap as an Open. The radar *is* the roadmap, visualized.

Renderers that present this radar interactively should support **axis reordering** so a viewer can flip from tension-opposite to alphabetical to category-grouped without losing the underlying data. The static SVG below is one ordering; the data is the same regardless of which ordering renders.

### Worked Example — A Pilot-Stage Authentication Service

A hypothetical authentication service for a vertical SaaS product, scoped at the Pilot stage. The dual-state survey output captures both where the project is today (current) and where it commits to going (desired):

| Ility | Current | Desired | Gap | Why |
|---|:---:|:---:|:---:|---|
| Stability | 2 | 4 | **+2** | Auth failures are product failures; current build is mid-hardening |
| Maintainability | 2 | 3 | **+1** | Long-term maintainers will rotate; current code has legacy patterns |
| Reality | 3 | 4 | **+1** | Compliance is non-negotiable; current compliance posture has gaps |
| Affordability | 3 | 3 | 0 | Per-user cost model already on-target |
| Efficiency | 2 | 2 | 0 | Latency matters but the bar is moderate; current build meets it |
| Urgency | 1 | 1 | 0 | Don't rush auth; rank is already correctly low |
| Versatility | 1 | 1 | 0 | Auth is auth; scope correctly narrow |
| Originality | 1 | 1 | 0 | Proven patterns are good; novelty correctly low |
| Usability | 1 | 1 | 0 | Developer-facing API, not an end-user UI |
| Interoperability | 2 | 4 | **+2** | OAuth only today; SAML and OIDC are committed roadmap items |

Four non-zero gaps. Stability (+2) and Interoperability (+2) are the top-priority roadmap items; Reality (+1) and Maintainability (+1) follow. The other six axes are on-target — the project is already living the personality it commits to on those axes.

The radar:

<svg viewBox="0 0 600 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="radar-title radar-desc" style="max-width: 600px; background: white;">
  <title id="radar-title">Project Personality Radar — Pilot-stage Authentication Service (Current and Desired)</title>
  <desc id="radar-desc">Radar chart with ten axes showing both the current and desired priority profiles of a hypothetical pilot-stage authentication service. The desired polygon (solid blue) reaches level 4 on Stability, Reality, and Interoperability and level 3 on Maintainability and Affordability. The current polygon (dashed orange) is smaller, sitting at level 2 on Stability, Maintainability, and Interoperability and level 3 on Reality and Affordability. Gaps between the two polygons on Stability, Maintainability, Reality, and Interoperability visualize the roadmap. Axes ordered tension-opposite clockwise from top: Stability, Maintainability, Reality, Affordability, Efficiency, Urgency, Versatility, Originality, Usability, Interoperability.</desc>

  <!-- Scale rings -->
  <g fill="none" stroke="#d0d0d0" stroke-width="0.7">
    <polygon points="300.0,212.5 322.0,219.7 335.7,238.4 335.7,261.6 322.0,280.3 300.0,287.5 278.0,280.3 264.3,261.6 264.3,238.4 278.0,219.7" />
    <polygon points="300.0,175.0 344.1,189.3 371.3,226.8 371.3,273.2 344.1,310.7 300.0,325.0 255.9,310.7 228.7,273.2 228.7,226.8 255.9,189.3" />
    <polygon points="300.0,137.5 366.1,159.0 407.0,215.2 407.0,284.8 366.1,341.0 300.0,362.5 233.9,341.0 193.0,284.8 193.0,215.2 233.9,159.0" />
    <polygon points="300.0,100.0 388.2,128.6 442.7,203.6 442.7,296.4 388.2,371.4 300.0,400.0 211.8,371.4 157.3,296.4 157.3,203.6 211.8,128.6" stroke="#999" stroke-width="1" />
  </g>

  <!-- Axis lines (tension-opposite ordering, clockwise from top) -->
  <g stroke="#999" stroke-width="0.5">
    <line x1="300" y1="250" x2="300.0" y2="100.0" />
    <line x1="300" y1="250" x2="388.2" y2="128.6" />
    <line x1="300" y1="250" x2="442.7" y2="203.6" />
    <line x1="300" y1="250" x2="442.7" y2="296.4" />
    <line x1="300" y1="250" x2="388.2" y2="371.4" />
    <line x1="300" y1="250" x2="300.0" y2="400.0" />
    <line x1="300" y1="250" x2="211.8" y2="371.4" />
    <line x1="300" y1="250" x2="157.3" y2="296.4" />
    <line x1="300" y1="250" x2="157.3" y2="203.6" />
    <line x1="300" y1="250" x2="211.8" y2="128.6" />
  </g>

  <!-- Desired polygon (solid fill, full opacity) -->
  <polygon points="300.0,100.0 366.1,159.0 442.7,203.6 407.0,284.8 344.1,310.7 300.0,287.5 278.0,280.3 264.3,261.6 264.3,238.4 211.8,128.6"
           fill="rgba(0,100,200,0.20)" stroke="#0064C8" stroke-width="2" />

  <!-- Current polygon (dashed outline, no fill, contrasting color) -->
  <polygon points="300.0,175.0 344.1,189.3 407.0,215.2 407.0,284.8 344.1,310.7 300.0,287.5 278.0,280.3 264.3,261.6 264.3,238.4 255.9,189.3"
           fill="none" stroke="#E07B2A" stroke-width="2" stroke-dasharray="5,3" />

  <!-- Desired polygon vertices -->
  <g fill="#0064C8">
    <circle cx="300.0" cy="100.0" r="3.5" />
    <circle cx="366.1" cy="159.0" r="3.5" />
    <circle cx="442.7" cy="203.6" r="3.5" />
    <circle cx="407.0" cy="284.8" r="3.5" />
    <circle cx="344.1" cy="310.7" r="3.5" />
    <circle cx="300.0" cy="287.5" r="3.5" />
    <circle cx="278.0" cy="280.3" r="3.5" />
    <circle cx="264.3" cy="261.6" r="3.5" />
    <circle cx="264.3" cy="238.4" r="3.5" />
    <circle cx="211.8" cy="128.6" r="3.5" />
  </g>

  <!-- Current polygon vertices -->
  <g fill="#E07B2A">
    <circle cx="300.0" cy="175.0" r="2.5" />
    <circle cx="344.1" cy="189.3" r="2.5" />
    <circle cx="407.0" cy="215.2" r="2.5" />
    <circle cx="407.0" cy="284.8" r="2.5" />
    <circle cx="344.1" cy="310.7" r="2.5" />
    <circle cx="300.0" cy="287.5" r="2.5" />
    <circle cx="278.0" cy="280.3" r="2.5" />
    <circle cx="264.3" cy="261.6" r="2.5" />
    <circle cx="264.3" cy="238.4" r="2.5" />
    <circle cx="255.9" cy="189.3" r="2.5" />
  </g>

  <!-- Axis labels -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#333">
    <text x="300.0" y="75.0" text-anchor="middle">Stability</text>
    <text x="402.9" y="108.4" text-anchor="middle">Maintainability</text>
    <text x="466.4" y="199.9" text-anchor="start">Reality</text>
    <text x="466.4" y="308.1" text-anchor="start">Affordability</text>
    <text x="402.9" y="395.6" text-anchor="middle">Efficiency</text>
    <text x="300.0" y="425.0" text-anchor="middle">Urgency</text>
    <text x="197.1" y="395.6" text-anchor="middle">Versatility</text>
    <text x="133.6" y="308.1" text-anchor="end">Originality</text>
    <text x="133.6" y="199.9" text-anchor="end">Usability</text>
    <text x="197.1" y="108.4" text-anchor="middle">Interoperability</text>
  </g>

  <!-- Scale labels along the top axis -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#999">
    <text x="305" y="216">1</text>
    <text x="305" y="178">2</text>
    <text x="305" y="141">3</text>
    <text x="305" y="103">4</text>
  </g>

  <!-- Title -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fill="#222">
    <text x="300" y="22" text-anchor="middle" font-size="14" font-weight="600">Pilot-Stage Authentication Service</text>
    <text x="300" y="40" text-anchor="middle" font-size="11" fill="#666">Personality Radar — MoSCoW (1=Won't, 2=Could, 3=Should, 4=Must)</text>
  </g>

  <!-- Legend -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#333">
    <line x1="438" y1="445" x2="458" y2="445" stroke="#0064C8" stroke-width="2" />
    <text x="462" y="448">Desired</text>
    <line x1="510" y1="445" x2="530" y2="445" stroke="#E07B2A" stroke-width="2" stroke-dasharray="5,3" />
    <text x="534" y="448">Current</text>
  </g>
</svg>

The radar makes three things visible at a glance that the table buries:

- **The gap between the polygons is the roadmap.** Visible *gap segments* — Stability (top, +2), Maintainability (upper-right, +1), Reality (right, +1), Interoperability (upper-left, +2) — are the four committed investment directions, ranked by gap magnitude. The bottom and bottom-left of the chart show coincident polygons: those axes are on-target. The radar audits the project's trajectory, not just its commitments.
- **Tension-opposite axes show their tradeoff structurally.** Stability sits at the top, Urgency directly opposite at the bottom — the project's spike on Stability (level 4) with valley on Urgency (level 1) shows the strongest single tradeoff being made, visualized as the radar's most pronounced lean. The same pattern across Reality/Originality, Affordability/Usability, Interoperability/Efficiency. The polygon's silhouette is structurally the tradeoff record.
- **An honest profile is asymmetric — and the two polygons should usually differ.** A near-circular polygon means Phase 2 was rubber-stamped (no real prioritization). A perfectly-coincident pair of polygons means either the project is already at its committed personality (rare on first survey) or current state was reported aspirationally rather than observationally. Both failure modes are diagnoseable from the picture.

A standalone article framing the dual-state personality view for non-technical audiences is forthcoming; this section is the technical specification it will reference. The article will lead with "your product already has a personality, and a different one it should grow into" — the radar carries the rest.

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
