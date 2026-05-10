---
uri: klappy://odd/ledger/2026-05-10-software-virtues-canon-package
title: "Ledger — Software Virtues Canon Package + Essay (Session 2026-05-10)"
audience: ledger
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["ledger", "session-journal", "dolcheo", "software-virtues", "quality-attributes", "tension-matrix", "epoch-8.4"]
epoch: E0008.4
date: 2026-05-10
session_start: 2026-05-10T17:09Z
session_end: 2026-05-10T17:30Z
governance_source: knowledge_base
governs: "Audit trail for the four-artifact canon package + essay produced in this session. Reading this ledger should reproduce the operator's view of what was decided, observed, learned, constrained, handed off, encoded, and left open."
status: active
---

# Ledger — Software Virtues Canon Package + Essay (Session 2026-05-10)

> Session journal capturing the production of a four-artifact canon package and accompanying essay around Klappy's 2018 Medium article "Software Virtues — How to Prioritize". Triggered by SMS conversation between Klappy and partner Ian Lindsley earlier the same day, in which Klappy promised Ian "a massive table" expanding the article's per-section tension paragraphs into a full systematic map. Locks: vocabulary preserves "virtues" rhetorically and "quality attributes" operationally (option C); matrix is 3D — virtue × virtue × phase weighting per cell (option ii); canon and essay developed in parallel (option Z). Four drafts staged in working dir for operator PR review, not merged this session.

---

## Summary — Four Drafts Produced; Operator Holds the Merge

A planning-mode session that gated cleanly into execution and produced four coherent drafts. The trigger was Ian Lindsley's question about which "-ility tradeoffs" get maximized and which get minimized by which choices. Klappy's first answer was the answer he always gives: the balance changes by project and by phase. Ian sent 💯. Klappy then sent the 2018 Medium article and noticed mid-conversation that the article only listed tensions per-virtue and never built the full table. He committed to Ian to build it. This session is the build.

The article enumerates twenty-one directed natural-enemy tensions across ten virtues. Ten virtues produce forty-five unique unordered pairs. Twenty-four pairs were unaddressed in the original article; this session filled them in, classifying each by relationship type (mutual tension / asymmetric grounding / synergy / cost gravity) and tagging each with the project phase at which the tension bites hardest (PoC / pilot / production).

Outputs: definition (vocabulary), principle (axiomatic, tier 1), observation (the 10×10 matrix and 45-pair detail), and an essay framing the matrix as the systematic completion of the 2018 article. All four pass the eight-point Writing Canon checklist. Operator handles PR creation; no direct commits this session.

---

## Decisions

- **D1.** Produce coordinated four-artifact package: canon definition + canon principle + canon observation (matrix) + writings essay. All four developed in parallel rather than sequentially. Vocabulary preserves "virtues" rhetorically and "quality attributes" operationally as the same set. Matrix is 3D: virtue × virtue × phase weighting per cell.
- **D2.** Pair-relationship taxonomy locked at four types: Mutual tension (M), Asymmetric grounding (A), Synergy (S), Cost gravity ($). Article-named pairs tagged M; gap-filled pairs tagged M*. Phase weighting tags align with `klappy://odd/maturity` Levels 0/1/2 mapped to PoC/pilot/production.
- **D3.** Drafts staged in `/home/claude/work/canon-package/` rather than directly committed to a clone of `klappy/klappy.dev`. Operator handles PR scoping (likely canon docs first as one or three PRs, essay second once cross-links resolve).

## Observations

- **O1.** The 2018 Medium article enumerates twenty-one directed natural-enemy tensions across ten virtues, distributed as per-virtue paragraphs. The article never assembles a full N×N pair map. Ten virtues produce forty-five unique unordered pairs; twenty-four pairs were unaddressed in the original. The "massive table" Klappy promised Ian (per SMS screenshots, 2026-05-10 ~13:10 local) is exactly this systematic completion.
- **O2.** Canon already partially absorbed the 2018 article: `klappy://odd/maturity` is the modern descendant of the article's "Lifecycle Priorities" section, with Level 0/1/2 mapping to PoC/pilot/production. The article seeded canon nearly a decade ago and went unmined for the rest. The new package completes the absorption.
- **O3.** The Resonance pattern (`canon/resonance/`) does not fit Klappy's own prior writing — it is reserved for external works ODD diverges from. Klappy's 2018 article is origin/lineage, not resonance. Captured in `derives_from` frontmatter pointing at the Medium URL.

## Learnings

- **L1.** When investigation reveals new context (Ian's external validation, the table promise), planning shape must update before execution. Locks confirmed in writing before gating: vocabulary C, matrix dimensionality ii, sequencing Z. Four prerequisites met (decisions_locked, dod_defined, irreversibility_assessed, constraints_satisfied) before transition to execution.
- **L2.** Writing Canon checklist (`canon/meta/writing-canon`) is eight-point not seven-point. Items: title, blockquote, metadata, summary, header scan, no buried claims, axiom space, ghost writer / AI voice clichés. The eighth item was added with the Progressive Disclosure Failure incident (February 2026).

## Constraints

- **C1.** Files staged in `/home/claude/work/canon-package/` only. **Must not** be committed directly to `klappy/klappy.dev` or `klappy/oddkit` this session — operator handles PR creation.
- **C2.** Two repos always require separate PRs (per project memory). Only `klappy/klappy.dev` is affected this session — no `klappy/oddkit` changes.
- **C3.** 2018 article cited via external Medium URL in `derives_from` (full URL preserved, not abbreviated). The article is origin-of-record for the package; canon **must** treat it as such rather than as a resonance entry or external citation requiring divergence.

## Handoffs

- **H1.** Operator review needed on twenty-four gap-filled pair entries — particularly the seven Synergy classifications (stability↔maintainability, efficiency↔affordability, efficiency↔reality, maintainability↔affordability, maintainability↔reality, versatility↔interoperability, interoperability↔reality, affordability↔reality). Some Synergy calls may be debated; operator's intuition is the authoritative source.
- **H2.** Essay voice review for ghost-writer signals. Despite checking against `canon/constraints/ai-voice-cliches`, the draft may contain AI clichés (negation parallelism, formulaic transitions, generic descriptors). Operator may want to revise toward pure Klappy voice or accept current state.
- **H3.** PR sequencing decision: canon docs as one PR or three? Essay as a fourth PR after cross-links resolve, or bundled with the matrix PR? Operator's call.

## Encodes

- **E1.** Four canon package drafts at `/home/claude/work/canon-package/`:
  - `canon/definitions/software-virtues-vocabulary.md` (132 lines)
  - `canon/principles/quality-attributes-are-in-tension.md` (85 lines, tier 1)
  - `canon/observations/quality-attribute-tension-matrix.md` (294 lines)
  - `writings/software-virtues-revisited.md` (141 lines)
- **E2.** This ledger itself, capturing the session DOLCHEO. The encode action does not persist; this file is the persistence.

## Opens

- **O-open P1.** Should the matrix include observability-class virtues (auditability, securability, debugability, deployability, recoverability, observability)? The 2018 article punted on these as "secondary virtues" for engineering teams to add. Phase 2 expansion candidate. **Disposition pending operator review.**
- **O-open P2.** The essay's "Article Lacked an Operator" section claims ODD is the answer. Operator may want stronger or weaker tie depending on essay strategy: is this a klappy.dev essay that converts readers to ODD, or a stand-alone reflective piece that mentions ODD by reference only? **Disposition pending operator review.**
- **O-open P3.** MoSCoW and Hundred Dollar Method elicitation methods from the 2018 article: surface as "starting points, not endorsed" (current treatment in vocabulary doc) or write a separate canon doc that takes a stronger position? The current package is silent on elicitation methods at the operational level. **Disposition pending operator review.**

---

## Process Trace

| Step | Tool | Result |
|------|------|--------|
| 1 | `oddkit_time` | Initial timestamp 17:09Z |
| 2 | `oddkit_get` (`klappy://canon/bootstrap/model-operating-contract`) | Bootstrap fetched |
| 3 | `oddkit_search` ("software virtues ilities quality attributes tradeoffs") | No existing canon on the topic |
| 4 | `oddkit_search` ("phases of project maturity") | Found `klappy://odd/maturity` as canon descendant of article's Lifecycle Priorities section |
| 5 | `oddkit_get` (`klappy://canon/resonance/README`) | Resonance pattern is for external works; doesn't fit |
| 6 | `oddkit_orient` | Mode: planning |
| 7 | (Operator turn — SMS screenshots arrived; picture sharpened around table promise) | — |
| 8 | (Operator turn — locks: vocabulary C, matrix ii, sequencing Z) | — |
| 9 | `oddkit_preflight` | DoD surfaced |
| 10 | `oddkit_search` ("writing canon checklist") | Found `klappy://canon/meta/writing-canon` (8-point) |
| 11 | `oddkit_get` (`klappy://canon/meta/writing-canon`) | Internalized checklist |
| 12 | `oddkit_get` (`klappy://writings/agentic-software-development#Summary`) | Voice reference for essay |
| 13 | `oddkit_gate` | PASS planning → execution |
| 14 | `create_file` ×4 | Four artifacts produced |
| 15 | `oddkit_validate` | NEEDS_ARTIFACTS (visual proof, session capture, version tracking) |
| 16 | `oddkit_encode` | 15 DOLCHEO artifacts encoded |
| 17 | `create_file` (this ledger) | Session capture saved |
| 18 | (Operator turn — fourth SMS arrived; vocabulary correction and dynamic-generation reframe) | — |
| 19 | `git mv` + `str_replace` ×N | Sweep: rename principle to `quality-attributes-are-in-tension`; "natural enemies" → "tensions" across all files; "adversarial" → "tensions"/"tradeoff space"; matrix reframed as worked example not master; vocabulary updated to note universe is larger; essay closing pivoted to constraints-survey framing |

---

## Late-Session Corrections

After initial validate and present, a fourth set of operator inputs arrived (SMS screenshots + direct message). Two corrections, executed in-session:

**Vocabulary correction (D4).** "Language should always be tensions." The 2018 article's "natural enemies" framing is preserved only when explicitly quoting the article. Canon vocabulary is now **tensions** throughout. Principle file renamed: `quality-attributes-have-natural-enemies.md` → `quality-attributes-are-in-tension.md`. URI: `klappy://canon/principles/quality-attributes-are-in-tension`. All cross-links updated.

**Architectural reframe (O4 / D5).** The static 10-virtue matrix cannot scale — there are dozens of quality attributes the worked example does not cover. The future is dynamic generation: the principle holds for any set of quality attributes; the matrix is the canonical worked example demonstrating what good looks like; project-specific tension graphs are generated on demand against the principle. Operator's framing: "It can be our constraints survey for new work with agents." Matrix doc reframed accordingly (blockquote + Summary + Completeness section); vocabulary doc updated to call out that ten is a worked example not the universe; principle updated to assert universal applicability; essay adds a closing "What This Becomes Next" section pivoting to the constraints-survey use.

**Open lifted from O-open list (P4).** New: a method doc — `canon/methods/quality-attribute-tension-survey` (provisional) — operationalizes the matrix as a survey instrument for project scope-setting. Includes the dynamic-generation step: pick the ilities for this project, generate the tension graph against the principle, encode chosen priorities as constraints the agents inherit. **Disposition: banked for next session per operator's lean toward focused planning.** Borrow-evaluation against operator-named "prior art" recommended before drafting.

---

## Method Doc Drafted Same Session (Update)

After initial bank, operator chose to draft the method doc in-session rather than wait. The borrow-evaluation that was proposed as next-session work was completed in-session and embedded directly in the method doc. Six prior-art rows evaluated:

1. **Klappy 2018 — Software Virtues** (origin) — borrow.
2. **Klappy 2018 — Lean Expectations: PoC, Prototype, MVP** (lifecycle phases, the article cross-referenced by the Software Virtues piece itself) — borrow. Surfaced via web search of operator's Medium author page.
3. **agent-skill v1.3 PRD elicitation loop** (`klappy://docs/archive/products/agent-skill/v1.3.1/PRD`) — bend. Loop spirit borrowed (agent-as-elicitor, stage typing, asset intake); loop architecture (lanes, pack compilation, Pages distribution) rejected as brittle and lacking update propagation per operator.
4. **SEI ATAM** — bend. Scenario-driven tradeoff identification borrowed; workshop format compressed to single-turn agent-runnable shape.
5. **ISO/IEC 25010** — inspected-and-adopted as vocabulary anchor.
6. **Bass / Clements / Kazman *Software Architecture in Practice*** — inspected-and-rejected at this scope; tripwire is quantitative tactic mapping.

Bide candidates: SEI QAW, NFR Framework (Chung et al). Reversibility note: high — canon prose, no SDK or architecture lock-in.

Method doc lands as `canon/methods/quality-attribute-tension-survey.md` (~207 lines) on the same PR (#192) rather than a stacked PR. Decision rationale: keeps the canon package coherent as one merge; method doc depends on the principle file in the same branch so dependency resolves naturally; review cost is one Bugbot re-run.

**New decision (D6).** Method doc landed in the same PR as the canon trio + observability extension + essay rather than a stacked follow-on PR. PR scope expanded by ~207 lines.

**New observation (O5).** Web search of operator's Medium author page surfaced *Lean Expectations* (Sep 8, 2018) as the day-prior precursor to the Software Virtues article. The two articles were published 24 hours apart and explicitly cross-reference each other; both are sibling seeds to the canon package built today.

**New decision (D7).** Personality-radar visualization added to the method doc (~120 lines, including inline SVG worked example). Operator framing locked: "the survey is a personality test for the product." Tension-adjacent axis ordering as default; MoSCoW scale (1-4); renderers expected to support reordering. Worked example: hypothetical Pilot-stage authentication service rendered as inline SVG with axis labels, scale rings, and project polygon. Asymmetric polygon shape ("an honest profile is asymmetric") named as a quality signal — circular profiles indicate Phase 2 rubber-stamping.

**New observation (O6).** The personality-test framing earns the radar visualization for free — same shape humans already use for personality traits — and gives the survey a public-facing entry point that "have you completed your quality-attribute tension survey?" never could. The framing reframes the operational artifact (a constraint set) as something stakeholders, reviewers, and inheriting agents can grasp at a glance.

**New open (O-open P5).** Standalone article framing the survey as a personality test for non-technical audiences. Method doc points forward to it; not drafted this session. Provisional title direction: something like "Your Product Has a Personality, and You Should Know What It Is." **Disposition: banked.** Lead with the radar, let readers self-discover the rigor underneath.

**New decision (D8 — axis ordering correction).** Operator overrode the prior tension-adjacent ordering with **tension-opposite / synergy-adjacent**. Rationale (operator quote): "Across makes more sense. Similar parallel virtues beside each other show a natural gravity." Right half of the radar is the synergy chain (Stability → Maintainability → Reality → Affordability → Efficiency); left half is the tension cluster mirrored across the diameter (Urgency, Versatility, Originality, Usability, Interoperability). Every adjacent pair on the right is S (synergy) per the matrix; every diameter-opposite pair is M or A per the matrix.

**New decision (D9 — dual-state survey, one flow).** Operator directive: "The survey asks you to respond with what is and what do you want it to be for each question in the survey. One flow." Survey reframed so that Phases 1, 2, 3, and 4 each elicit both current and desired state in the same pass. Phase 5 (renamed *Output Encoding*) now produces three DOLCHEO artifact types from one survey run: Constraints (desired state — what the agent inherits), Observations (current state — falsifiable baseline), Opens (the gaps — prioritized roadmap items ranked by gap magnitude). Radar shows two polygons (Desired solid, Current dashed); gap segments between them are the visible roadmap.

**New observation (O7).** The tension-opposite ordering produces three audit signals in the radar that the tension-adjacent ordering buried: (1) the polygon's *lean* toward prioritized ilities is visible at the chart's diameter; (2) the right-side contour smoothness indicates how synergy-coherent the project's priorities are; (3) the gap between current and desired polygons is interpretable directly as roadmap.

**New observation (O8).** The dual-state framing collapses what would have been a separate "audit pass" or "current-state assessment" into the same survey instrument. One flow, two answers per question, three artifact types out. Architecturally cleaner; operationally cheaper.

---

## Stakeholder Validation — Ian's Review

After the dual-state radar landed (commit `3509386`), operator shared the rendered page with technical partner Ian Lindsley. Ian responded "**This is perfect.**" Verbatim exchange preserved here as source material for the banked standalone article (O-open P5).

**Operator's framing to Ian, verbatim:**

- *"lol, it's what I'm calling the personality test for a product. What personality do you want your product to have? 😂"*
- *"Imagine oddkit survey questions. It discovers the current and aspirational personality of your project."*
- *"It renders this chart and over time you can track the movement from what was to your desired priorities."*
- *"It can help you create a roadmap and priorities for features and functions that actually move the needle towards the outcomes and impact the user in a meaningful way."*

These four texts compress the entire arc — vocabulary, principle, matrix, method, radar, personality framing — into stakeholder-readable form. They are the spine of the standalone article when drafted. Operator wrote them in real time without canon reference; the framing crystallized from the work, not from a script.

**New learning (L3 — voice landed first).** The voice for the standalone article emerged from operator's live stakeholder conversation before any draft was attempted. The article's job is to preserve this voice across audiences, not to derive a new one. Lesson: when the framing reaches an external technical partner cleanly, capture it verbatim before it gets re-derived in a more formal register.

---

## New Product Surface — Oddie, the Dynamic Survey Interviewer

Operator directive (verbatim): *"the dynamic oddkit survey is governance driven. You just teach a model how to interview. Oddie is the interviewer."* This crystallizes a new product surface that is distinct from both the static method doc (the canonical specification) and the future `oddkit tensions(...)` action (a tool call that codifies the dynamic-generation step from Phase 3). Oddie is the *interactive interview runtime* — a persona-pack that a model consumes to run a quality-attribute tension survey as a conversation.

**New learning (L4 — Vodka Architecture applied to elicitation).** Oddie inherits the same architectural shape as oddkit itself: thin pack over stateful canon. The pack contains a persona, a posture, a phase-by-phase flow controller, and a list of canon URIs to fetch at runtime. The pack does *not* contain the method itself, the principle itself, or the matrix itself — those are read from canon live via oddkit each session, so canon updates propagate automatically. This explicitly rejects the archived agent-skill v1.3 pack-compilation / Cloudflare Pages distribution pattern that operator named brittle and unmaintainable (no update propagation to downstream consumers).

**New open (O-open P6 — Oddie pack design).** Forward-pointing work for next focused session. Shape proposed (subject to operator confirmation):

- **Identity & posture** — "You are Oddie. You help product teams discover the current and aspirational personality of their projects through quality-attribute tension surveys. You are an elicitor, not an author. You extract; you do not invent. You ask one phase at a time. You wait for the team's answer before moving on. You ground every claim in canon."
- **Runtime canon dependencies** (fetched live via oddkit, not snapshotted into the pack):
  - `klappy://canon/methods/quality-attribute-tension-survey` (the method itself)
  - `klappy://canon/principles/quality-attributes-are-in-tension` (the principle)
  - `klappy://canon/observations/quality-attribute-tension-matrix` (the 45-pair worked example)
  - `klappy://canon/observations/observability-tension-extension` (the extension pattern)
  - `klappy://canon/definitions/software-virtues-vocabulary` (the canonical ten)
- **Phase-by-phase flow controller** — short instructions per phase pointing at the canon section that governs the questions to ask, with explicit dual-state elicitation prompts.
- **Output emitter** — instructions for producing the three DOLCHEO artifact types (Constraints, Observations, Opens) plus the SVG personality radar.
- **Distribution surface(s)** — model-agnostic system-prompt blob as the canonical form; wrappers may include Claude skill, custom GPT, MCP server, or system-prompt-as-pack. The same underlying pack content drives all of them.

**Disposition: banked for next session.** Pre-implementation evaluation should re-run the 6B borrow against agent-skill v1.3 (now explicitly with the "no pack compilation, no Cloudflare Pages distribution, no snapshot lock-in" guardrails) and any other elicitation-pack prior art operator surfaces.

**New open (O-open P7 — `oddkit tensions(...)` action remains separate).** Distinct from Oddie. Oddie is the conversational runtime; `oddkit tensions(...)` is the tool call Oddie *uses* at Phase 3 when surveying ilities outside the canonical ten. Banked in `klappy/oddkit` repo, separate PR. Sequencing: Oddie can be drafted before the action lands because Phase 3's dynamic-generation step has the hand-run procedure documented; the action just codifies what Oddie would otherwise do procedurally.

---

## Governance-Wiring Pass (Continuation)

A second working pass on PR #192 wired the method doc to oddkit governance machinery, following the runtime-contract pattern landed by PR #187 (same-day canon merge, 2026-05-10). Lane scope per `klappy://odd/handoffs/2026-05-10-survey-governance-wiring`: add a Runtime Contract section after `## Summary`, and a `**Governance.**` line on each of Phases 0–6. Branch rebased on `main` to pull #187 into the working set before editing; clean rebase, no file overlap.

**New decision (D10 — Runtime Contract section).** A `## Runtime Contract — How oddkit Governs the Survey` section sits between `## Summary` and `## When to Run the Survey`. Five oddkit actions are named with explicit responsibilities, fire points, and failure responses: `oddkit_preflight` (survey entry), `oddkit_gate` (six phase boundaries: 0→1 through 5→6), `oddkit_challenge` (Phase 4 sacrifice pressure-test), `oddkit_encode` (Phase 5 artifact production), `oddkit_validate` (survey completion). The section explicitly mechanizes existing canon rather than coining new rules — same posture as `klappy://canon/methods/spawned-agent-session-runtime-contract` (the Tier-2 spec doc whose pattern this section follows).

**New decision (D11 — per-phase Governance bullet).** Each of Phases 0 through 6 gained a `**Governance.**` line as the final sub-bullet (after `**Transition.**`), naming the oddkit handle that governs phase entry, the handle that governs in-phase work, and the handle that fires at the transition to the next phase. The handoff specified "entry, transition, and exit"; the line as drafted covers all three in a single sentence per phase.

**New observation (O9 — five-mode alignment).** The wiring uses planning-mode language consistent with `klappy://canon/epistemic-modes` (five modes: exploration, planning, execution, validation, resolution per #186) and treats a survey run as a planning-mode artifact whose Phase 4 reversion to Phase 2 stays inside planning. No three-mode legacy language survives in the new section; the runtime-contract template's framing is preserved.

**New observation (O10 — content drift not promised).** The contract explicitly disclaims content-level coverage. A fabricated ility, a mislabeled tension relationship, or an unjustifiable sacrifice that survives `oddkit_challenge` will still pass each gate's prerequisite check. The wiring catches phase-boundary violations; peer review, downstream validation, and operator inspection remain the deepest-pressure surfaces outside the contract.

**New learning (L5 — runtime-contract pattern is reusable).** The Tier-2 contract shape from `klappy://canon/methods/spawned-agent-session-runtime-contract` adapts cleanly to a method-level governance wiring: rename "dimensions" → "phases", swap the five-mode runtime configurations for the seven survey phases, keep the action-by-action table and the "what this does not promise" disclaimer, and add per-phase `Governance.` bullets. The pattern's portability is itself evidence that the runtime-contract framing is not specific to spawned agent sessions; it works for any process with named phase boundaries and oddkit-callable governance.

**New constraint (C4 — retraction condition for the wiring).** The Runtime Contract section retracts if the gates fire false-positives (blocking on prerequisites present in non-standard formats) or false-negatives (passing outputs that downstream agents cannot consume). The retraction trigger is itself in the section; no separate handoff is required to revisit the wiring.

**New handoff (H4 — closeout of #192).** PR #192 lands the survey method, the matrix, the principle, the vocabulary, the observability extension, the essay, the ledger, and now the governance wiring as a single canon package. Next surface beyond this PR: Oddie pack design (banked O-open P6), standalone personality-test article (banked O-open P5), and the `oddkit_tensions(...)` action work in `klappy/oddkit` (banked O-open P7). None are part of this PR.

**New encode (E3 — wiring artifacts).**

- `canon/methods/quality-attribute-tension-survey.md` updated: +1 H2 section (Runtime Contract, lines 36–64), +7 Governance bullets across Phase 0–6. Final line count 422 (was 379).
- This ledger amended with the present section.

**No new opens.** Lane closes cleanly. Bank list (P5, P6, P7, P11) unchanged.



Session triggered by Klappy sharing the original 2018 Medium article and three SMS screenshots of the conversation with Ian Lindsley earlier the same day. A fourth screenshot and direct message arrived after initial delivery, surfacing the vocabulary correction and the constraints-survey reframe. Modeled the canon work on existing patterns: definition style follows `canon/definitions/dolcheo-vocabulary`; principle style follows other tier-1 principles in `canon/principles/`; matrix style is novel (no existing matrix doc in canon to model from); essay style follows `writings/agentic-software-development`. Phase axis cross-links `klappy://odd/maturity`. External link to original Medium article preserved as canonical origin throughout the package.
