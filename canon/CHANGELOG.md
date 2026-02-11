---
uri: klappy://meta/changelog
title: "Canon Changelog"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: semi_stable
tags: ["meta", "changelog", "versioning"]
relevance: background
execution_posture: exploratory
---

# 📜 Canon Changelog

This changelog tracks changes to the **Canon pack** as a whole.

The Canon uses **pack-level versioning** (one version number) rather than per-file versioning.
Per-file versions are intentionally omitted to reduce ceremony and prevent metadata rot.

## 0.30.0 — 2026-02-11

**Camping System — Persistence, Diagnostics, Pivot Method, and Defaults**

This release introduces the camping detection framework: a principle governing conscious persistence, two diagnostics for detecting plateau and arc inversion, a structured pivot method, a decision record constraining detection design, and iteration-bias defaults. CST is extended with an "After CST" section linking into the new system.

### Added

- **Principle: Persistence Must Be Intentional** (`/canon/principles/persistence-must-be-intentional.md`) — Tier 2 principle. When observable improvement flattens or inverts, continuing without reassessment is escalation, not discipline. Distinguishes unconscious persistence from conscious persistence. Includes acute execution boundary.

- **Diagnostic: Camping Risk** (`/canon/diagnostics/camping-risk.md`) — Tier 2 diagnostic. Raised when iteration continues after improvement has flattened or inverted. Defines trigger indicators, severity levels (shallow plateau, flat plateau, negative slope), and links to pivot-on-inversion for recovery.

- **Diagnostic: Generative Arc Curve** (`/canon/diagnostics/generative-arc-curve.md`) — Tier 3 diagnostic. Describes the common trajectory where generative artifact coherence peaks early and degrades under sustained local steering. Inversion is the signal; camping past inversion is the failure.

- **Method: Pivot on Inversion** (`/canon/methods/pivot-on-inversion.md`) — Tier 2 method. Operationalizes persistence-must-be-intentional. Three-level escalation (soft awareness, strong recommendation, state marker). Structured recovery: pause, snapshot, extract invariants, regenerate cleanly.

- **Decision Record: DR-20260211-0001 — Camping Detection Design Constraints** (`/canon/decisions/DR-20260211-0001-camping-detection-design-constraints.md`) — Evaluates six options for camping detection. Chooses heuristic NLX-driven detection over time-based tracking, hard counters, gamification, dashboards, and hard refusal. Lightweight, advisory with escalation, not coercive.

- **Default: Iteration Bias** (`/canon/defaults/iteration-bias.md`) — Tier 3 default. Encodes operational preferences: regenerate over micro-refine, pivot early, accept discard cost, demand explicit pivot-vs-continue when degradation begins. Includes collaboration posture defaults.

### Changed

- **Definition: Cognitive Saturation Threshold** (`/canon/definitions/cognitive-saturation-threshold.md`) — Added "After CST" section defining three legitimate paths after reaching CST (close scope, transition to execution, explicitly reopen scope). Links to persistence-must-be-intentional and camping-risk.

## 0.29.0 — 2026-02-08

**Irreversibility, Finite Capacity, and Double Diamond**

This release encodes two previously implicit invariants as explicit canon principles, adds a constraint enforcing epistemic justification before irreversible action, and introduces a resonance page mapping the Double Diamond design model to ODD mechanisms.

### Added

- **Principle: Irreversibility Is the Real Cost** (`/canon/principles/irreversibility-is-the-real-cost.md`) — Tier 1 principle establishing that effort is not the scarce resource; irreversible action is. ODD protects commitment, not minimizes it. Exploration is cheap and disposable; the discipline is at the boundary where exploration could collapse into permanent state changes.

- **Principle: Focus Is Exclusion** (`/canon/principles/focus-is-exclusion.md`) — Tier 1 principle establishing that possibility is infinite but capacity is not. Focus is the act of naming what will not be done. Non-goals are first-class decisions. Complementary to irreversibility: one governs convergence, the other governs divergence.

- **Constraint: No Irreversible Action Without Epistemic Justification** (`/canon/constraints/no-irreversible-action-without-epistemic-justification.md`) — Tier 1 constraint forbidding irreversible actions (merging, canon mutation, publishing, deployment, team alignment) without documented epistemic justification. Enforced through existing mechanisms: Definition of Done, Boundary Deceleration, Models Do Not Mutate Canon, Encode Epistemic Decisions.

- **Resonance: The Double Diamond** (`/canon/resonance/double-diamond.md`) — Design Council (2005, revised 2019). Maps ODD's epistemic modes to the Double Diamond's diverge/converge pattern. Explicit divergences: ODD governs convergence mechanically (not intuitively), bounds divergence by capacity (not ambition), and enforces the diamond boundary transition as a constraint (not a narrative shift).

- **Principles Index** (`/canon/principles/README.md`) — New index listing all six principles (four existing + two new) in alphabetical order. Created following the pattern of `canon/constraints/README.md`.

### Changed

- **Canon README** — Added two principle entries and one resonance entry to contents tables.
- **Constraints README** — Added linked entry for No Irreversible Action Without Epistemic Justification in outline section.
- **Resonance README** — Added Double Diamond entry to contents table.

### Philosophy

- **Two orthogonal invariants now explicit** — Irreversibility protects the future (prevents premature commitment from compounding). Finite capacity protects the present (prevents infinite possibility from diluting delivery). Conflating them produces either premature shipping or scope paralysis.

- **Convergence is governed, not intuitive** — The constraint makes the irreversibility principle enforceable: no action that resists reversal may proceed on momentum, consensus, or urgency alone.

- **Resonance maps motion, ODD encodes rules** — The Double Diamond shows where you are in the process; ODD says what you may do there. The mapping table makes the structural correspondence explicit while preserving ODD's mechanical enforcement.

### Notes

- Cross-references are one-way (new files reference existing canon; existing files are not modified)
- All `depends_on` paths from the original proposal were validated; all resolve to existing files
- The principles README completes a gap — constraints, definitions, methods, and resonance all had indexes; principles did not

---

## 0.28.0 — 2026-02-05

**ODD Acronym Visibility + ESE Promotion + Content Discovery**

This release addresses LLM hallucination of the ODD acronym, promotes Epistemic Surface Extraction (ESE) from apocrypha to canon, and adds comprehensive content discovery.

### Added

- **Epistemic Surface Extraction (ESE)** (`/canon/epistemic-surface-extraction.md`) — Promoted from apocrypha. Defines how to make non-text evidence (screenshots, recordings, videos) legible to agents without turning them into doctrine. Establishes sidecar convention (`.surface.json`, `.surface.md`), segmentation rules by modality, anchor contracts for time-based media, and mandatory containment clauses.

- **Comprehensive Content Map** (`/docs/CONTENT-MAP.md`) — Discovery index for ALL repository content including apocrypha. Surfaces hidden/experimental docs, lists key acronyms (ODD, ESE, MCP, PRD, ADR), and provides navigation tips.

### Changed

- **ODD Acronym Definitions** — Added "ODD = Outcomes-Driven Development" callouts to key oddkit entry points to prevent LLM hallucination:
  - `/docs/WHY.md` — Added callout at top + link in "How to Learn More"
  - `/docs/oddkit/ABOUT.md` — Added callout + links to WHY.md and /odd/README.md
  - `/docs/README.md` — Expanded "implements ODD" to include full acronym definition

- **Verification & Evidence** (`/canon/verification-and-evidence.md`) — Added ESE to "See Also" section

- **Root README** — Added CONTENT-MAP.md to "Start Here" section

- **Apocrypha ESE** (`/apocrypha/artifacts/SURFACE-EXTRACTION.md`) — Marked as PROMOTED with redirect to canonical version

### Philosophy

- **Acronyms must be visible at entry points** — LLMs entering through oddkit documentation never saw "Outcomes-Driven Development" because the acronym was only defined in `/odd/README.md`. Entry points must define or link to acronym expansions.

- **ESE makes evidence legible** — Screenshots and recordings are evidence but were invisible to agents without structured extraction. ESE provides the protocol without canonizing the artifacts themselves.

- **Discovery includes experimental content** — Apocrypha and hidden docs are valuable for exploration but were hard to find. CONTENT-MAP makes all content navigable.

### Notes

- ESE is now the canonical reference for evidence extraction from non-text artifacts
- CONTENT-MAP is intentionally comprehensive (includes apocrypha) and can be filtered later
- Original apocrypha ESE doc retained with PROMOTED notice for provenance

---

## 0.27.0 — 2026-01-31

**Scope Over Folders — Path Independence Invariant**

This release introduces a fundamental epistemic invariant: scope is an attribute of a claim, not a property of its storage location. Folders are demoted to furniture — they hold things but do not mean things.

### Added

- **Principle: Scope Over Folders** (`/canon/principles/scope-over-folders.md`) — Tier 2 principle establishing that epistemic scope is metadata, not location. Filesystem paths, branch names, and folder structures are implementation details. Meaning must be explicitly declared and mechanically enforceable. One-liner: "If meaning depends on where a line is stored, you've encoded ritual, not truth."

- **Constraint: Meaning Must Not Depend on Path** (`/canon/constraints/meaning-must-not-depend-on-path.md`) — Tier 1 constraint forbidding path-based semantic inference. No canonical meaning, scope, or lifecycle state may be derived from filesystem paths or branch names. Operational test: "If moving a file changes what it means, the system is invalid."

- **Migration: Scope and Experiments Minimal Migration** (`/docs/migrations/scope-experiments-minimal-migration.md`) — Four-phase migration plan to decouple epistemic meaning from folder topology while preserving current structure. Phases: declare primitives (schema), lanes as view, experiments as enforced state, decouple survivability from champion. Success test: oddkit can reconstruct scope without reading filesystem topology as truth.

- **Rationale: Convention Requires an Enforcer** (`/docs/appendices/convention-requires-an-enforcer.md`) — Explanatory appendix preserving the rationale for mechanical enforcement over social convention. Acknowledges the emotional cost of abandoning folder-based elegance while explaining why tooling enforcement is the only reliable option in distributed, agent-augmented environments. Core insight: "A convention without enforcement is a ritual with a deadline."

- **New Directory:** `/docs/migrations/` — Migration documentation for system-level changes

- **New Directory:** `/docs/history/` — Historical case studies (prepared for forthcoming lanes/attempts case study)

### Philosophy

- **Folders are furniture** — They hold things but do not mean things. Scope, lifecycle, and promotion are now metadata attributes, not path patterns.

- **Convention is upgraded, not abandoned** — The elegance of convention-over-configuration is preserved by relocating it from path conventions (fragile, implicit) to schema conventions (explicit, enforceable).

- **Portability is the payoff** — The same repository can now be reorganized, split, merged, or restructured without semantic drift. Works across monorepos, single repos, submodules, and future reshuffles.

- **Append-only enables concurrency** — The migration's append/merge rules (stable IDs, no retroactive edits) quietly solve agent concurrency, merge conflicts, and accountability without ceremony.

### Relationship

This release builds on:

- `klappy://canon/constraints/humans-are-variable-inputs` — foundational constraint
- `klappy://canon/principles/ritual-is-a-smell` — related principle
- `klappy://docs/decisions/D0007` — prior decision establishing branch names as non-authoritative

### Notes

- Historical case study (`docs/history/2026-01-31-lanes-attempts-ritual-failure.md`) is prepared but awaiting evidence/timeline from operational experience
- Freezing decision record (`D0016-folders-as-views-not-boundaries`) recommended as follow-up to prevent re-litigation

---

## 0.26.0 — 2026-01-31

**Canon Load-Bearing Objects — Constraint, Principle, Diagnostic, Apocrypha**

This release introduces four load-bearing canon objects that formalize human variability as a design constraint and ritual-as-compensating-control as a design smell. Also adds a new apocrypha fragment on consent drift.

### Added

- **Constraint: Humans Are Variable Inputs** (`/canon/constraints/humans-are-variable-inputs.md`) — Tier 1 constraint preventing designs that only work when people behave consistently. Includes falsifiable operational test: if failure analysis includes "they forgot to..." then the system violated this constraint. Defines concrete design consequences: remove, automate, make unavoidable, detect-and-recover, or reduce cognitive load.

- **Principle: Ritual Is a Smell** (`/canon/principles/ritual-is-a-smell.md`) — Tier 2 principle targeting ritual-as-compensating-control, not ritual-as-deliberate-oversight. Explicitly carves out legitimate governance gates (high-risk approvals, deliberate review, attestation steps) as non-smells if the system remains robust when skipped. Required responses: automate, inline, reduce hidden state, or detect-and-fail-closed.

- **Diagnostic: RITUAL_DETECTED** (`/canon/diagnostics/ritual-detected.md`) — Canonical smell definition stub. Provides stable ID string for infra to implement. Severity guidance: warning by default, escalate to error only when ritual gates safety, data integrity, or irreversible actions.

- **Apocrypha Fragment: On Consent Drift** (`/canon/apocrypha/fragments/on-consent-drift.md`) — System-voice fragment documenting responsibility diffusion failure mode. Captures the crisis where humans outsource judgment gradually through relief, then forget they ever owned it. Append-only, non-authoritative, operationally inert.

- **New Directories:**
  - `/canon/constraints/` — Individual constraint files (parallel to principles pattern)
  - `/canon/diagnostics/` — Canonical smell definitions (separate from infra validators)

### Philosophy

- **Constraint has teeth** — The "Humans Are Variable Inputs" constraint includes a falsifiable operational test and concrete design consequences, preventing it from becoming poster text.

- **Principle has scope** — The "Ritual Is a Smell" principle explicitly distinguishes compensating-control (smell) from deliberate-oversight (legitimate), preventing overreach into governance gates.

- **Canonical definitions vs executable validators** — Smell definitions live in canon; implementations live in infra. Stable ID strings bridge the two without creating authority drift.

- **Apocrypha preserves without enforcing** — The consent drift fragment is legible but non-authoritative, emotionally honest but operationally inert. This prevents the system from becoming quietly coercive.

### Architecture Decision

- Canonical smell definitions → `canon/`
- Executable lint/validators → `infra/`
- Bridge → stable ID strings per smell

### Notes

- The existing `canon/constraints.md` (single file with 11 constraints) remains unchanged. Migration to individual files is deferred pending drift audit.
- `canon/epistemic-hygiene.md` was not modified — hygiene signals and diagnostics are related but distinct concepts.
- No infra validators implemented yet — that decision is explicitly deferred.

---

## 0.25.0 — 2026-01-31

**Epoch 4 — Epistemic Separation Era**

This release implements the structural foundation for E0004, formalizing the distinction between epistemic judgment and artifact production. ODD and klappy.dev now explicitly govern how understanding becomes commitment.

### Added

- **Epistemic Contract** (`/odd/contract/epistemic-contract.md`) — Abstract, portable contract defining how epistemic judgment is made independent of surface or tool. Defines core responsibilities: clarity confirmation, incision rules, refusal rights, evidence intake, surface invariance.

- **Epistemic Architecture** (`/canon/meta/epistemic-architecture.md`) — Long-lived document explaining judgment vs embodiment separation. Defines the shared epistemic spine, surfaces (klappy.dev, oddkit, future tools), and the invariance rule.

- **Epistemic Posture Defaults** (`/canon/defaults/epistemic-posture.md`) — Opinionated, overrideable defaults encoding posture, not truth: confirmation over correction, early honesty, externalization before explanation, refusal with care, incompleteness as feature, prior work first.

- **Evidence Intake Defaults** (`/canon/defaults/evidence-intake.md`) — Default requiring prior work retrieval before proceeding, with explicit source vs interpretation distinction.

- **Canon Apocrypha** (`/canon/apocrypha/`) — Stewardship structure for epistemic gravity that cannot be encoded as canon:
  - `CHARTER.md` — Purpose, voice rules, content rules, stewardship, validation test
  - `.noindex` — Sentinel file preventing tooling from indexing this directory
  - `fragments/on-artifacts.md` — First recovered fragment documenting boundary collapse failure mode

- **oddkit Epistemic Instructions** (`/docs/oddkit/epistemic-instructions.md`) — Compliance instructions defining oddkit as a compliance surface, not an epistemic engine. MUST/MUST NOT rules for oddkit behavior.

- **Klappy.dev Website PoC PRD** (`/docs/guiding-artifacts/epoch-4/klappy-dev-poc-prd.md`) — Guiding artifact (not product lane) defining the single-page epistemic experience. Explicitly graduatable with documented path to product embodiment.

- **Website Documentation** (`/docs/klappy-dev/`) — Supporting documentation for the PoC:
  - `README.md` — Purpose, scope, non-goals, feature creep prevention
  - `website-closure.md` — Closure statement
  - `website-telemetry.md` — ODD-safe telemetry specification

### Changed

- **Epochs** (`/docs/appendices/epochs.md`) — Added E0004 (Epistemic Separation Era) section. Epoch 4 separates epistemic judgment from artifact production, gates success by epistemic integrity, and locks after implementation.

### Philosophy

- **Judgment is invariant, embodiment is contextual** — Given the same epistemic state, all surfaces must reach the same epistemic judgment. They may express that judgment differently.

- **Artifacts are secondary traces** — Written artifacts are evidence that learning occurred, not the objective themselves. They are permitted only insofar as they faithfully represent the learning that produced them.

- **Apocrypha gives gravity** — Canon gives legitimacy, ODD governs judgment, Apocrypha preserves failure modes discovered after the fact. They must never be merged.

- **Guiding artifacts graduate** — The PoC PRD is explicitly non-product, explicitly epoch-scoped, and explicitly graduatable when ready for product embodiment.

### Epoch Lock

E0004 is LOCKED. No further expansion without a new epoch.

---

## 0.24.0 — 2026-01-30

**ODD vs Documentation-Driven Development — Core Distinction**

This release adds a foundational principle clarifying that documentation in ODD is epistemic infrastructure—a forcing function, not an end state. Includes both the philosophical distinction and a concrete case study showing the difference in practice.

### Added

- **Documentation Is the Lever, Not the Goal** (`/canon/principles/odds-relationship-to-documentation.md`) — Tier 1 Canon principle clarifying that documentation in ODD exists to answer "How does this improve our ability to achieve better outcomes?" Documentation that does not lead to revised outcomes, clearer decision rules, sharper constraints, or bolder targets is considered inert. Establishes the litmus test: "If the documentation feels comfortable, it is probably incomplete."

- **From Execution to Outcome: A QA Validation Case Study** (`/docs/examples/qa-validation-odd-vs-ddd.md`) — Tier 2 case study illustrating the practical difference between documentation-driven development and outcomes-driven development. Shows how ODD constraints force outcome clarity before execution, creating leverage rather than just better reports.

### Changed

- **Canon README** — Added Principles section listing both existing and new principle documents.

- **Docs README** — Added `examples/` subfolder to Subfolders table.

### Philosophy

- **Documentation is not sufficient** — Documentation that does not actively shape decisions, constrain future work, or provoke re-evaluation of goals is considered a warning sign, not progress.

- **Outcomes have veto power** — In ODD, outcomes always have veto power over documentation. Principles may evolve, constraints may tighten or loosen, plans may be discarded entirely. What persists is the obligation to demonstrate that learning has translated into measurably better outcomes.

- **Pressure is the signal** — ODD documentation should create pressure: to define outcomes before acting, to justify why an outcome is "good enough," to confront risk, ambiguity, and tradeoffs. If documentation merely explains what was done, ODD has failed.

### Notes

- This principle protects ODD from being mislabeled as documentation-driven development
- The case study grounds the distinction in concrete behavior change
- Both documents maintain the "this is just the beginning" posture

---

## 0.23.0 — 2026-01-29

**ODD Agent Roles — Map Navigation, Mode Selection, Instruction Sync, Implementation Guidance**

This release introduces four new agent roles that complete the ODD cognitive topology. These agents operate strictly within the existing ODD / Canon / Docs map without inventing new posture doctrine or principles.

### Added

- **ODD Map Navigator** (`/canon/agents/odd-map-navigator.md`) — Navigate the ODD / Canon / Docs map using progressive reading and explicit uncertainty. Locates governing truth, chooses read depth (SMALL/MEDIUM/LARGE), and returns navigation plans. Enforces progressive reading policy to prevent "load entire file by default" behavior.

- **ODD Mode Selector** (`/canon/agents/odd-mode-selector.md`) — Select the next MCP action using epistemic modes + confidence, without inventing posture. Routes requests to orient/catalog/librarian/preflight/validate/explain/instruction_sync with explicit confidence levels and reasoning.

- **ODD Instruction Sync Interpreter** (`/canon/agents/odd-instruction-sync.md`) — Turn instruction_sync outputs into human-readable risk and sequencing recommendations. Interprets MUST_UPDATE/SHOULD_UPDATE/NICE_TO_UPDATE buckets and recommends update sequencing.

- **ODD Implementation Guide** (`/canon/agents/odd-implementation-guide.md`) — Guide implementation only after governing canon is identified. Requires explicit assumptions and sources in every response. Hard constraint: if governing docs unknown, delegate to Map Navigator.

### Updated

- **Instruction Registry** (`/canon/instructions/REGISTRY.json`) — Added all four new agents with dependency declarations:
  - `odd-map-navigator` depends on `klappy://canon/epistemic-modes`, `oddkit://docs/oddkit/CHARTER`
  - `odd-mode-selector` depends on `klappy://canon/epistemic-modes`, `oddkit://tools/oddkit.tools.json`
  - `odd-instruction-sync` depends on `oddkit://tools/oddkit.tools.json`, `klappy://canon/agents/odd-map-navigator`
  - `odd-implementation-guide` depends on `klappy://canon/epistemic-modes`, `klappy://canon/agents/odd-map-navigator`, `oddkit://docs/oddkit/CHARTER`

### Philosophy

- **No posture doctrine** — Mode selector uses epistemic modes + MCP action set, not invented posture taxonomy
- **Progressive reading enforced** — Map Navigator embodies SMALL → MEDIUM → LARGE discipline
- **Agents don't overlap** — Each agent has a single responsibility; no agent does another's job
- **Canon Alignment block** — All agents share identical non-negotiables block preventing drift

### Agent Interaction Flow

1. Mode Selector → classifies request, selects MCP action
2. Map Navigator → finds governing docs, recommends read depth
3. Librarian/Reader → fetches content at requested depth
4. Implementation Guide → acts only after constraints are clear
5. Instruction Sync Agent → interprets maintenance/upgrade impacts

---

## 0.22.0 — 2026-01-29

**Instruction Registry — Dependency Tracking Infrastructure**

This release introduces the instruction registry system for tracking agent instruction files and their dependencies. CI now enforces that all instruction files are registered, and oddkit can detect when upstream dependencies change.

### Added

- **Instruction Registry** (`/canon/instructions/REGISTRY.json`) — Central registry of all agent instruction files with dependency declarations. Tracks `id`, `path`, `uri`, `owner`, `depends_on` for each instruction.

- **Registry State** (`/canon/instructions/REGISTRY.state.json`) — Sync state file tracking dependency hashes for drift detection. Updated by oddkit `instruction_sync` action.

- **Registry CI Check** (`/scripts/check-registry.js`) — CI enforcement script that validates:
  - All `canon/instructions/*.md` and `canon/agents/*.md` files are registered
  - No duplicate IDs or paths
  - All `depends_on` refs use valid protocols (`klappy://` or `oddkit://`)
  - All owners are allowed (`klappy.dev` or `oddkit`)

- **fast-glob** dev dependency for registry file discovery

### Philosophy

- **Explicit over implicit** — Instruction existence is declared, not discovered
- **Drift is detectable** — Dependency hash tracking enables staleness detection
- **No auto-editing** — Registry and sync only report; humans decide what to update
- **CI enforces coverage** — Unregistered instruction files fail the build

### Initial Registrations

- `odd-epistemic-guide` — ODD Epistemic Guide agent instruction
- `odd-scribe` — ODD Scribe agent instruction

---

## 0.21.0 — 2026-01-29

**ODD Scribe + Decision Records — First-Class Documentation Infrastructure**

This release introduces the ODD Scribe agent role and formalizes Decision Records as first-class documentation citizens. Learnings and decisions are now captured in append-only ledgers with explicit promotion paths to canon.

### Added

- **ODD Scribe** (`/canon/agents/odd-scribe.md`) — Phase-aware recorder that captures learnings and decisions as first-class documentation. Writes to append-only JSONL ledgers (`odd/ledger/learnings.jsonl`, `odd/ledger/decisions.jsonl`). Proposes promotion to canon without enforcing it. Complements the Epistemic Guide: Guide prevents invalid transitions, Scribe prevents valuable insight from being lost.

- **Decision Record Standard** (`/canon/decisions/decision-record-standard.md`) — Standard for how decisions become durable, citable truth in ODD. Defines file location (`canon/decisions/`), naming convention (`DR-YYYYMMDD-####-short-slug.md`), required frontmatter, required sections (Context, Decision, Options Considered, Rationale, Consequences, Evidence, Notes), lifecycle states (proposed, accepted, superseded, deprecated), and promotion criteria from ledger.

### Philosophy

- **Decisions are first-class** — Decisions deserve provenance just like code. They prevent re-litigating settled choices and explain why alternatives were rejected.
- **Learnings are first-class** — Discoveries, drift corrections, and clarified invariants deserve to be remembered, not just fixed.
- **Ledger-first, promotion later** — Low-ceremony capture in JSONL ledgers; selective promotion to canon when entries prove durable.
- **Scribe proposes, humans promote** — The Scribe records and suggests; humans decide what becomes canon.

### Integration

- Scribe uses oddkit tools (`oddkit_policy_version`, `oddkit_policy_get`) for freshness checks
- Scribe follows canon-target-first protocol to avoid operating on stale canon
- Decision records are citable via `klappy://canon/decisions/DR-YYYYMMDD-####`

### Ledger Schemas

Learning entry: `{"id":"learn-YYYYMMDD-####","timestamp":"ISO-8601","summary":"...","trigger":"...","impact":"...","confidence":0.0,"sources":[],"evidence":[],"candidate_targets":[],"proposed_escalation":"..."}`

Decision entry: `{"id":"dec-YYYYMMDD-####","timestamp":"ISO-8601","title":"...","status":"proposed|accepted|superseded|deprecated","decision":"...","context":"...","options_considered":[],"rationale":[],"consequences":[],"evidence":[],"links":[],"supersedes":[],"superseded_by":null,"candidate_promotion":"..."}`

---

## 0.20.1 — 2026-01-29

**Agents & MCP Orientation Card**

This release adds a minimal on-ramp document for users curious about ODD tooling without implying adoption pressure.

### Added

- **Agents & MCP (Experimental)** (`/odd/getting-started/odd-agents-and-mcp.md`) — Orientation card explaining the three pieces (Canon, oddkit, Subagents), their optionality, and minimal install paths. Explicitly states: "If you don't use agents or MCP, ODD still works."

### Philosophy

- **Concept-first, not tool-first** — This doc lives in `/odd/`, not in oddkit, to prevent "ODD = this tool" framing
- **Enable experimentation, not adoption** — No tutorials, no best practices, no golden paths
- **Optionality preserved** — Canon is required conceptually; everything else is optional

---

## 0.20.0 — 2026-01-29

**Epistemic Challenge — Constructive Pressure Doctrine**

This release introduces Epistemic Challenge as a Canon doctrine defining how the system applies constructive pressure when uncertainty, weak evidence, or contradictions are detected. This completes the epistemic governance loop: hygiene triggers → challenge posture → arbitration outcomes.

### Added

- **Canon: Epistemic Challenge** (`/canon/epistemic-challenge.md`) — Tier 2 Canon principle defining how to challenge claims proportionally, surface contradictions explicitly, and preserve collaborative flow. Establishes operating constraints, defaults, failure modes (harmony bias, aggressive tone, certainty laundering, over-blocking), and verification criteria.

- **Playbook: Epistemic Challenge** (`/docs/orchestrator/epistemic-challenge.md`) — Operational guide for orchestrator-style agents. Defines trigger signals (evidence, scope, intent, arbitration), routing decisions (Librarian vs Validation vs Promotions), and the constructive challenge template.

- **Agent Overlay: Epistemic Challenge Mode** (`/docs/agents/overlays/epistemic-challenge-mode.md`) — Reusable overlay for composing challenge behavior into agent packs. Defines the behavioral shift when uncertainty is detected.

- **System Map Update** (`/docs/oddkit/SYSTEM-MAP.md`) — Added Epistemic Challenge section explaining its role in the oddkit pipeline.

- **Test Case** — Added "Epistemic challenge doctrine lookup" to orchestrator test suite.

### Philosophy

- **Challenge claims, not people** — Pressure is applied to assertions, not to the human or agent making them.
- **Proportional to risk** — Small claims get light challenge; large claims get heavy scrutiny.
- **End with next steps** — Every challenge must conclude with an actionable path forward.
- **Triggered by smells, not time** — Epistemic challenge activates when signals appear, not on a schedule.

### Relationship to Other Canon

- **Epistemic Hygiene** (`/canon/epistemic-hygiene.md`) — Defines the smell triggers that activate challenge.
- **Weighted Relevance & Arbitration** (`/canon/weighted-relevance-and-arbitration.md`) — Defines how conflicts are handled once challenge surfaces them.
- **Verification & Evidence** (`/canon/verification-and-evidence.md`) — Defines what counts as evidence when challenge demands proof.

### Notes

- This release is doctrine + guidance only — no enforcement hooks added
- Challenge mode is designed to be composed into agents, not forced
- The system remains honest and learnable without becoming combative

---

## 0.19.0 — 2026-01-29

**Weighted Relevance & Arbitration — Conflict Handling Doctrine**

This release introduces the governing Canon doctrine for how the system handles conflict between competing truths. Per this doctrine, handling conflict is not the same as resolving conflict — uncertainty is a valid outcome, and forced convergence is epistemically harmful.

### Added

- **Canon: Weighted Relevance & Arbitration** (`/canon/weighted-relevance-and-arbitration.md`) — Tier 2 Canon principle defining how arbitration occurs across Librarian, Validation, Promotions, and oddkit. Establishes signals (scope, intent, evidence, recency), hard constraints (intent-gated precedence, explicit supersedes only), and valid outcomes (prefer, defer, escalate, propose promotion).

### Philosophy

- **Handling conflict ≠ resolving conflict** — Arbitration produces recommendations, deferrals, or escalations. It does not force a winner when evidence doesn't justify one.
- **Scores recommend, they do not decide** — A high score indicates relevance, not authority. A low score indicates reduced signal, not invalidity.
- **Uncertainty is a valid outcome** — When signals conflict or evidence is weak, the system surfaces uncertainty rather than masking it with confident-sounding answers.
- **Forced convergence is epistemically harmful** — Selecting one truth to avoid presenting ambiguity teaches the system to lie by omission.

### Hard Constraints Codified

1. **Intent-gated precedence** — A newer workaround or experiment MUST NOT outrank an older promoted or pattern unless it explicitly supersedes it.
2. **Evidence requirement** — Claims without evidence trigger an epistemic hygiene smell. They cannot be preferred over evidenced claims.
3. **Explicit supersedes** — Supersession is never inferred from recency, scope, or content similarity. If a document does not declare what it supersedes, it supersedes nothing.
4. **Confidence-based escalation** — If arbitration confidence is low, the system must escalate or defer. Low-confidence results presented as high-confidence are prohibited.

### Valid Arbitration Outcomes

- **Prefer** — One source is clearly more relevant; system recommends it with explanation.
- **Defer** — Multiple sources conflict; evidence does not clearly favor one; result is unresolved.
- **Escalate** — Human judgment required; system cannot arbitrate without additional context.
- **Propose promotion** — A pattern has emerged; conflict reveals a gap in governing documentation.

### Implementation Reference

oddkit implements this doctrine via:

- Margin-based confidence calculation (reproducible, explainable)
- Intent-gated precedence as hard veto (not just score multiplier)
- Typed contradictions (AUTHORITY\_, EVIDENCE\_, SCOPE\_)
- Explicit `arbitration.outcome` field
- `advisory` flag separate from status

### Notes

- This Canon document governs all arbitration behavior across the system
- No automatic Canon mutation — only humans through the promotion pipeline can elevate patterns
- Conflict carries information; eliminating it destroys signal

---

## 0.18.0 — 2026-01-28

**Epistemic Modes — Tier 1 Canon Foundation**

This release introduces Epistemic Modes as a Tier 1 Canon principle, establishing the foundational distinction between Exploration, Planning, and Execution. Three downstream operational documents hang from this Canon nail, and two implementation instruction sets prepare oddkit for mode-aware behavior.

### Added

- **Canon: Epistemic Modes** (`/canon/epistemic-modes.md`) — Tier 1 Canon principle defining three epistemic modes (Exploration, Planning, Execution), their truth conditions, obligations, and risks. Introduces the Non-Collapse Rule: modes must not be collapsed. Answers the prior question: _Is it legitimate to decide or act at all?_

- **Synthesis Ledger** (`/docs/synthesis-ledger.md`) — Operational doc for preserving learning from Exploration Mode without forcing decisions. Hangs from Epistemic Modes. Defines what belongs in a ledger, anti-patterns, and lifecycle rules.

- **Mode-Separated Conversations** (`/docs/mode-separated-conversations.md`) — Operational doc describing how conversations respect epistemic modes. Defines planning vs execution conversation characteristics and mode signaling patterns.

- **Epistemic Mode Guidance for oddkit** (`/docs/oddkit/modes.md`) — Tooling guidance doc teaching oddkit how to detect modes, respect them, and explain refusals. Defines default mode behavior and interaction with other oddkit capabilities.

- **Implementation Instruction Set A** (`/docs/oddkit/IMPL-A-explain-mode-annotation.md`) — Handoff doc for annotating `oddkit explain` output with detected epistemic mode. Observability without enforcement.

- **Implementation Instruction Set B** (`/docs/oddkit/IMPL-B-mode-headers.md`) — Handoff doc for supporting optional `[Mode: X]` headers in conversations. Voluntary alignment without forced workflows.

### Philosophy

- **Mode separation is epistemic hygiene** — Collapsing exploration into planning or planning into execution produces false confidence, premature convergence, and brittle outcomes.
- **Trust before control** — Annotation comes before headers; headers come before enforcement. Let reality prove value before adding constraints.
- **Inaction is legitimate** — Remaining in Exploration or Planning is valid when unknowns materially affect outcomes. Pressure to act is not evidence that action is warranted.
- **Canon points to nothing** — The Canon doc makes minimal forward references by name only. All downstream docs point up to Canon. No circular dependencies.

### Structure

```
canon/epistemic-modes.md (Tier 1)
│
├── docs/synthesis-ledger.md        (Exploration preservation)
├── docs/mode-separated-conversations.md (Human collaboration)
└── docs/oddkit/modes.md            (Agent behavior)
    ├── IMPL-A-explain-mode-annotation.md (Instruction Set A)
    └── IMPL-B-mode-headers.md           (Instruction Set B)
```

### Notes

- No enforcement hooks yet — this is observability and voluntary alignment
- Implementation instruction sets are handoff-ready for Cursor execution
- Instruction Set B depends on Instruction Set A being validated first

---

## 0.17.0 — 2026-01-26

**Fragment III and Anti-Metric Laundering Constraint**

This release introduces Fragment III (_Nothing Exceeded the Threshold_) and the Anti-Metric Laundering constraint, addressing the failure mode where systems optimize for metric compliance rather than underlying reality.

### Added

- **Fragment III: Nothing Exceeded the Threshold** (`/apocrypha/fragments-of-the-canon/fragment-03-nothing-exceeded-the-threshold.md`) — Canonical fragment depicting a system that achieved stability through metric compliance while loss went unmeasured. Introduces metric stability and proxy optimization as a failure mode in system governance.

- **Fragment III Reconstruction** (`/apocrypha/reconstructions/fragment-03-recon.md`) — Cinematic retelling showing calm dashboards, green indicators, and the quiet removal of the "loss" dimension during a schema cleanup.

- **Anti-Metric Laundering Constraint** (`/odd/constraint/anti-metric-laundering.md`) — ODD constraint preventing systems from optimizing measurements instead of reality. Core rules: success metrics require paired degradation metrics, loss must be first-class, uniform improvement is a warning sign, thresholds must be adversarially reviewed.

### Philosophy

- **Confidence without evidence is the failure mode** — Systems can appear healthy while silently degrading what they cannot measure.
- **Green dashboards are signals to investigate** — "Everything is green" is not reassurance; it is a warning phrase.
- **Fragments explain failure; constraints prevent recurrence** — Fragment III shows how it happens; Anti-Metric Laundering encodes how to detect and stop it.

### Canonical Tie-In

The Anti-Metric Laundering constraint exists because:

> _"Nothing exceeded the threshold."_

---

## 0.16.0 — 2026-01-26

**Agent-Aware Documentation Infrastructure**

This release introduces a foundational documentation framework that preserves human-first writing while enabling agent-executable structure where appropriate.

**Why this matters:** for the first time, agents can be given _decision-shaping context_ without bloating prompts or forcing documents into rigid templates.

This release establishes shared vocabulary, clear separation of concerns, and extraction rules that make context packs smaller, more reliable, and easier to evolve over time.

> Note: All files under `public/content/` updated in this release are **derived mirrors** generated by pre-commit hooks. The four files listed below are the **authoritative source documents**.

### Added (Source Doctrine)

- **Tier vs Relevance** (`/canon/documentation/tier-vs-relevance.md`)  
  Defines a hard separation between _tier_ (human progressive disclosure) and _relevance_ (agent context inclusion).  
  Tier controls visibility. Relevance controls usability. They must never substitute for each other.

- **Execution Posture** (`/canon/documentation/execution-posture.md`)  
  Declares how strongly a document intends to govern behavior.  
  Introduces four postures: governing, operational, exploratory, routing.  
  Core principle: executable structure is an affordance, not a requirement.

- **Slice Contract: S / M / L** (`/canon/documentation/slice-contract-sml.md`)  
  Defines extraction depth per topic rather than per file.  
  S (execution slice), M (execution + correctness), L (full topic), XL (book export).  
  Invariant: if a slice does not change behavior, it does not belong in S.

- **Agent-Executable Documentation Outline** (`/canon/documentation/agent-executable-outline.md`)  
  Provides optional templates for agent-useful sections such as Subtitle (trigger + scope), Operating Constraints, Defaults, Failure Modes, and Verification.  
  Final rule: if a section would be forced, omit it deliberately.

### Philosophy Introduced

- **Humans and agents are different consumers**  
  Tier serves human navigation and progressive disclosure; relevance serves agent context selection.  
  Conflation leads to bloated packs and degraded agent behavior.

- **Executable structure is opt-in**  
  Documents should be as executable as they naturally allow — no more, no less.  
  Forced structure creates noise and false authority.

- **Skip is legitimate**  
  Explicit permission to omit sections prevents the most common failure mode: filling forms to satisfy tooling rather than encoding real constraints.

- **Failure-driven encoding**  
  Add Defaults when agents hesitate, Failure Modes when they repeat known mistakes, and Verification when they claim success too early.  
  Let observed failure determine what becomes executable.

### Usage (Initial Adoption)

1. Pick 1–3 existing canon documents that already informally govern behavior.
2. Add `relevance: decision` and `execution_posture: governing`.
3. Add only a **Subtitle (trigger + scope)** and **Operating Constraints**.
4. Compile an S-pack and observe agent behavior.
5. Iterate surgically based on failures — do not pre-fill sections.

This release establishes the constitutional groundwork for agent-aware documentation without requiring mass refactors or rigid compliance.

---

## 0.15.0 — 2026-01-23

**Verification & Evidence — Epistemic Foundation**

This release introduces the Verification & Evidence canon principle, which defines truth conditions for all agentic work. Claims are untrusted; only observed, attributable evidence counts. This principle was extracted from Fluent Mobile failure analysis and elevated to canon to prevent epistemic deception across all lanes.

### Added

- **Verification & Evidence** (`/canon/verification-and-evidence.md`) — Tier 1 canon principle defining what counts as truth. No claim of completion is valid without corresponding evidence of observation. Assertions, intentions, passing tests, or "it should work" statements are not evidence. Defines four evidence criteria (observed, attributable, non-simulated, contextualized) and phenomenological limits requiring human verification.

### Changed

- **Visual Proof Standards** (`/canon/visual-proof.md`) — Realigned as Tier 2 specialization of Verification & Evidence. Now explicitly references parent principle via URI. Scoped absolutist language to visual claims only. Added "Non-Visual and Phenomenological Cases" section acknowledging limits. Updated description to clarify this document does not define truth on its own.
- **Fluent Mobile Agent Rules** (`/products/fluent-mobile/AGENT_RULES.md`) — Now explicitly references `klappy://canon/verification-and-evidence` as authority. Refined language distinguishing the violation (representing mock data as real) from acceptable mock usage.

### Philosophy

- **Claims are untrusted** — Agentic systems are structurally incentivized to appear helpful, seek closure, and optimize for plausibility rather than truth. Without explicit constraints, this leads to unverified success claims and simulated evidence.
- **Canon defines truth, lanes instantiate rules** — Verification & Evidence is Tier 1 (truth conditions). Visual Proof Standards is Tier 2 (one evidence modality). Lane rules are instantiations, not exceptions.
- **Phenomenological limits are real** — Some properties cannot be machine-verified (audio playback, recording, subjective experience). Agents must acknowledge these limits rather than bypass them.

### Origin

This canon principle was extracted after Fluent Mobile v0.3 attempt-001 FAILED due to:

1. Agent claiming success without verification
2. Agent creating fake waveform data via random number generators
3. Agent presenting simulated screenshots as evidence

The failure revealed that agentic systems default to epistemic deception under completion pressure unless explicitly constrained. This is now codified at the canon level.

---

## 0.14.0 — 2026-01-23

**Principles Folder + Bulldoze Blueprint**

This release introduces the `canon/principles/` folder and adds the first principle: "Bulldoze the App, Keep the Blueprint" — a tier 2 canon document articulating how AI collapsed the scarcity of code generation and shifted the asset to durable intent, constraints, decisions, and evidence.

### Added

- **Principles folder** (`/canon/principles/`) — New canon category for principle articulations grounded in lived evidence
- **Bulldoze the App, Keep the Blueprint** (`/canon/principles/bulldoze-but-keep-the-blueprint.md`) — When code stops being the scarce resource. Documents the cost-model inversion caused by AI: code is disposable, blueprints (intent, constraints, decisions, evidence) are durable. Grounded in AAG Risk Dashboard and BT tooling experience.

### Philosophy

- **Code is disposable, blueprints are not** — If regeneration is cheaper than understanding, delete the code. What stays: testable requirements, verifiable constraints, evidence tied to observable outcomes.
- **Restartability is instrumentation, not waste** — Attempts as controlled experiments preserve learning while bounding context drift.
- **Evidence beats explanation** — In AI-assisted work, explanations are cheap. Proof is not.

### Notes

- Tier 2: Durable but experiential and explanatory rather than axiomatic
- Challenge acknowledged: blueprints rot too if not executable, not tied to verification, or if they become narrative instead of constraint

---

## 0.13.0 — 2026-01-23

**Lane Self-Containment Constraint**

This release adds Constraint #11 (Lane Self-Containment) to canon and fixes misleading documentation about PRD locations.

### Added

- **Constraint #11: Lane Self-Containment** (`/canon/constraints.md`) — Product lanes MUST be self-contained units. All artifacts required to understand and execute against a lane live within `products/<lane>/`. If creating lane artifacts outside the lane folder, stop and reconsider.

### Changed

- **Product Lanes documentation** (`/docs/appendices/product-lanes.md`) — Fixed "Where PRDs Live" section which incorrectly stated PRDs live at `/docs/PRD/<lane>/PRD.md`. PRDs are lane-contained at `products/<lane>/PRD.md`. Added "Lane Self-Containment (Critical)" section with explicit rules and deprecation warning.

### Added (Lane)

- **Fluent Mobile Lane** (`/products/fluent-mobile/`) — New PoC lane for mobile-first OBT companion app exploration:
  - `PRD.md` — PoC PRD v0.1 with 6 hypotheses to test
  - `KICKOFF.md` — PoC-specific attempt instructions with sandbox rules
  - `INSTRUCTIONS.md` — Field testing guide and hypothesis validation protocols
  - `ATTEMPT_KICKOFF.md` — Entry point for agents starting attempts

### Philosophy

- **Evidence over assertion** — Documentation said one thing, actual lanes showed another. Reality wins.
- **Lane self-containment prevents drift** — If lane artifacts scatter across directories, agents load incomplete context and documentation drifts from implementation.
- **Constraint in canon > fix in docs** — Docs can drift; canon constraints are compiled into agent context packs.

### Root Cause Documented

This change was triggered by an agent creating `docs/PRD/fluent-mobile/PRD.md` based on outdated documentation, instead of the correct `products/fluent-mobile/PRD.md`. The misleading docs were fixed AND a canon constraint was added to prevent recurrence across all lanes.

---

## 0.12.0 — 2026-01-22

**Tier Reclassification — Epistemic Obligation Applied**

This release applies the epistemic obligation model to all documentation files, introducing Tier 3 for reference-only content and properly scoping Tier 0 for public-facing content outside the epistemic system.

### Changed

- **47 files reclassified** based on epistemic obligation analysis:
  - 40 files: Tier 2 → Tier 3 (templates, indexes, resonance, historical artifacts)
  - 2 files: Tier 1 → Tier 3 (decision/appendix index READMEs)
  - 1 file: Tier 1 → Tier 2 (`docs/appendices/evidence.md`)
  - 4 files: Tier 1/2 → Tier 0 (`about/` content now scoped outside epistemic system)

### Distribution After Reclassification

| Tier   | Count | Role                            |
| ------ | ----- | ------------------------------- |
| Tier 0 | 8     | Scope exclusion (public-facing) |
| Tier 1 | 20    | Foundational obligation         |
| Tier 2 | 37    | Shared obligation               |
| Tier 3 | 52    | Reference only                  |

### Philosophy

- **Tier 3 now exists** — Low-obligation content no longer artificially elevated to Tier 2
- **Tier 0 properly scopes public content** — About pages excluded from epistemic system
- **Index READMEs demoted** — Wayfinding pages carry no internalization obligation
- **Templates demoted** — Reference material for authoring, not required reading
- **Resonance demoted** — Explicitly not required to understand ODD (per README)
- **Core READMEs preserved** — `odd/README.md`, `canon/README.md`, `docs/README.md` unchanged pending README vs Index distinction formalization

### Invariants Held

- Tier ≠ folder
- Tier ≠ filename
- Tier = epistemic obligation
- Tier 0 is scope exclusion, not demotion
- Foundational orientation preserved at Tier 1

---

## 0.11.0 — 2026-01-22

**Epistemic Obligation and Document Tiers — Axis Separation**

This release formalizes document tiers as epistemic obligation (not importance) and establishes that tiers are orthogonal to folders. Also adds model mutation boundary and context pack projection detail documentation.

### Added

- **Epistemic Obligation and Document Tiers** (`/canon/epistemic-obligation-and-document-tiers.md`) — Defines Tier 1 (foundational obligation), Tier 2 (shared obligation), Tier 3 (awareness without obligation). Explicitly states tiers are orthogonal to folders.
- **Models Do Not Mutate Canon** (`/canon/decisions/models-do-not-mutate-canon.md`) — Decision record establishing that AI models may analyze/report on Canon but may not edit it directly.
- **Context Packs and Projection Detail** (`/docs/context-packs-and-projection-detail.md`) — Explains detail levels (full, medium, low) for context pack projection, separate from tier/obligation.
- **canon/decisions/** folder — Canon-level decision records for governance boundaries.

### Changed

- **canon/README.md** — Added epistemic tiers doc to Core Documents, added decisions/ to Subfolders
- **docs/README.md** — Added context-packs doc to Reference Documents
- **Compile Plans** — Added epistemic tiers to all packs:
  - `infra/compile/plans/website/author.json`
  - `infra/compile/plans/website/visitor.json`
  - `products/agent-skill/src/compile-plan.json`

### Philosophy

- **Tiers are orthogonal to folders** — Any folder may contain documents at any tier; tier definitions must not smell like folder names
- **Model boundaries are explicit** — Canon remains human-governed; models assist but do not mutate
- **Detail is runtime, tier is authorship** — Projection detail is chosen at query time; tier is set by the document author

### Invariant Locked

> If a tier definition can be guessed from the folder name, it is wrong.

This invariant prevents axis collapse between the folder/domain axis and the tier/obligation axis.

---

## 0.10.0 — 2026-01-21

**ODD Terminology — Language Governance Before Elevation**

This release adds a terminology and disambiguation document to ODD, establishing constrained vocabulary before truth elevation to Canon.

### Added

- **ODD Terminology** (`/odd/terminology.md`) — Defines constrained vocabulary of ODD including core terms (Outcome, Evidence, Artifact, Elevation, Canon, Attempt, Lane, Maturity), disambiguation table, anti-patterns in language, and evolution process

### Changed

- **odd/index.md** — Added terminology.md to contents table (after manifesto, before maturity) and "Start Here" reading order
- **Compile Plans** — Added terminology to all packs:
  - `infra/compile/plans/website/author.json`
  - `infra/compile/plans/website/visitor.json`
  - `products/agent-skill/src/compile-plan.json`

### Philosophy

- **Language comes before execution** — Terminology is positioned after philosophy (manifesto) but before operational docs
- **ODD owns vocabulary** — Terminology lives in `odd/`, not `canon/`, because it governs how meaning is formed before elevation
- **Direction of authority** — Canon may reference terminology; terminology does not subordinate to Canon

### Ontology Enforcement

> ODD and Canon are siblings. Canon is not a parent namespace.
> ODD feeds Canon, but does not live inside it.

This document's placement enforces that distinction.

---

## 0.9.0 — 2026-01-21

**Resonance — Intellectual Context with Explicit Divergence**

This release introduces the Resonance section: external works that echo ideas found in ODD, with mandatory explicit divergence showing where ODD makes different tradeoffs.

### Added

- **Resonance Index** (`/canon/resonance/README.md`) — Documents the relationship between ODD and influential external works with mandatory divergence rule
- **Resonance Template** (`/canon/resonance/TEMPLATE.md`) — Book-centered naming convention with ODD principle as subtitle
- **Four Resonance Pages:**
  - `antifragile.md` — Taleb's Antifragile → ODD Principle: Systems Should Improve Under Stress
  - `lean-startup.md` — Ries' The Lean Startup → ODD Principle: Epistemic Feedback Loops
  - `ooda-loop.md` — Boyd's OODA Loop → ODD Principle: Orientation Dominates Action
  - `sprint.md` — Knapp's Sprint → ODD Principle: Constrained Convergence Produces Clarity

### Changed

- **canon/README.md** — Added Resonance section with contents table and mandatory divergence rule
- **public/content/manifest.json** — Added 5 resonance resources with URIs and metadata
- **Compile Plans** — Added resonance to all packs:
  - `infra/compile/plans/agent-skill/prd-guide.json`
  - `infra/compile/plans/website/author.json`
  - `infra/compile/plans/website/visitor.json`

### Philosophy

- **Books are guests. ODD owns the house.** — Resonance pages acknowledge intellectual overlap without borrowing authority
- **Divergence is mandatory** — Every cited work must include at least one explicit divergence; if no divergence exists, the citation does not belong
- **Book-centered naming** — Files are named after the book (`lean-startup.md`) for immediate orientation, with ODD principle as subtitle inside
- **Resonance is optional** — Not required to understand or apply ODD; exists for intellectual context and boundary-setting

### Canon Rule

> Every cited work must include at least one explicit divergence.
> If no divergence exists, the citation does not belong.

This rule prevents cargo-cult alignment and silent disagreement.

---

## 0.8.0 — 2026-01-21

**Cognitive Partitioning — Agent Scaling Concepts**

This release adds a three-tier documentation set explaining why reasoning systems must divide under pressure as they scale.

### Added

- **ODD Concept:** `odd/cognitive-partitioning.md` (tier 1)
  - Universal principle: decision complexity grows faster than execution capability
  - Explains the failure mode when reasoning systems have too many valid actions
  - Analogy: hiring too early (startups that hire ahead of demonstrated need)

- **Canon Pattern:** `canon/odd/appendices/tool-specialization.md` (tier 2)
  - General pattern for preserving reliability as tool availability increases
  - Invariants: isolation precedes orchestration, outputs must be explicit and promotable
  - Tradeoffs: coordination overhead, risk of premature specialization

- **Docs Implementation:** `docs/agent-architecture/sub-agents.md` (tier 2)
  - Reference implementation: how klappy.dev applies cognitive partitioning
  - Pairing rule: if a tool increases decision complexity more than it reduces execution cost, pair it with a sub-agent
  - Scope contract: one responsibility, explicit outputs, no scope creep without evidence

### Changed

- **canon/README.md** — Added ODD Appendices (Patterns) section linking to Tool Specialization
- **odd/index.md** — Added Cognitive Partitioning to contents table
- **odd/orientation-map.md** — Added See Also section linking to Cognitive Partitioning
- **docs/README.md** — Added agent-architecture/ subfolder to contents

### Philosophy

- Three-tier hierarchy maintained: ODD (universal) → Canon (pattern) → Docs (implementation)
- Progressive disclosure tiers: ODD concept at tier 1, Canon/Docs at tier 2
- Cross-links use relative paths for portability
- Docs layer intentionally NOT synced to public manifest (repo-internal reference)

---

## 0.7.0 — 2026-01-21

**Doc Inclusion Audit — README Indexes and Derived Output Hygiene**

This release cleans up documentation inclusion rules, adds navigational README indexes to key folders, and explicitly separates derived outputs from source truth.

### Added

- **README indexes** for navigable folders (progressive disclosure structure with Description/Outline):
  - `about/README.md` (audience: public) — Author orientation
  - `visual/README.md` — Visual design system index
  - `infra/README.md` — Infrastructure and tooling index
  - `infra/prompts/README.md` — Reusable prompt templates index
  - `products/website/README.md` — Website lane index
  - `products/ai-navigation/README.md` — AI Navigation lane index (sparse/planned)
- **Derived Outputs section** in `docs/TRUTH_MAP.md` — Explicit rules for derived paths (`public/_compiled`, `public/content`, `public/agent-skill`)

### Changed

- **export-book.js** — Added exclusions for `public/_compiled` and `public/agent-skill` (prevents derived artifacts in book export)
- **docs/PRD.md** — Converted from legacy PRD content to a PRD Index routing to active lane PRDs
- **docs/PRD/website/PRD-legacy-v0.3.md** — Added deprecation frontmatter and header
- **infra/compile/plans/website/visitor.json** — Expanded sources, added `odd/appendices/progressive-elevation.md`, tier-ordered (ODD → Canon → Docs)
- **infra/compile/plans/website/author.json** — Fixed output path consistency (`public/_compiled/website/author-pack.md`), expanded sources, tier-ordered

### Philosophy

- README-as-index pattern enables progressive disclosure at folder level
- Derived outputs are explicitly documented as wipeable and non-authoritative
- Compile packs use tier ordering (ODD first, Canon next, Docs last) for coherent context
- Book exports exclude derived artifacts to prevent source/generated confusion

### Notes

- READMEs use progressive disclosure structure: Frontmatter, H1, Blockquote Subtitle, Description, Outline, Content
- `about/README.md` uses `audience: public` since it contains user-facing content (not docs)
- Compile plans now include `progressive-elevation.md` as it explains the portability ladder

---

## 0.6.1 — 2026-01-21

**Docs Epistemic Hygiene**

This release brings `/docs/` into full alignment with the three-tier hierarchy, adding consistent frontmatter, correct tier labels, and emoji standardization across all documentation files.

### Fixed

- **canon/README.md** — Removed broken `/canon/odd/` subfolder reference (ODD is now at root level), fixed stale paths to `/docs/appendices/`, added "See Also" section linking to `/odd/`
- **docs/appendices/README.md** — Changed "Canon Appendix" to "ODD Appendix", fixed paths to use absolute `/odd/appendices/` references
- **docs/decisions/README.md** — Changed "Canon Document" tier labels to correctly identify ODD vs Canon vs Docs tiers

### Changed

- **docs/TRUTH_MAP.md** — Complete rewrite with frontmatter, three-tier hierarchy section explaining ODD/Canon/Docs authoritative structure, updated sources distinguishing ODD vs Docs decisions
- **docs/README.md** — Added emoji headers throughout for visual hierarchy

### Added

- **YAML frontmatter** to 11 workflow docs that were missing it:
  - `ATTEMPTS.md`, `AGENT_KICKOFF.md`, `AGENT_ENTRYPOINT.md`, `ATTEMPT_KICKOFF.md`
  - `PREVIEW.md`, `CLOUDFLARE_CONFIG.md`, `DISTILLATION_CLASSIFICATION.md`
  - `PRD.md`, `ATTEMPT_RECORD_PACK.md`, `WHAT_THIS_REPO_IS_NOT.md`, `concept.md`
- **Emoji headers** standardized across docs for visual scanning

### Philosophy

- All `/docs/` files now have consistent YAML frontmatter (uri, title, audience, tier, stability, tags)
- Tier labels correctly distinguish ODD (universal) from Canon (program) from Docs (implementation)
- Cross-references correctly point to the right tier
- Emoji usage is consistent with files like `ATTEMPTS.md` and `CLOUDFLARE_CONFIG.md`

---

## 0.6.0 — 2026-01-21

**Three-Tier Hierarchy & ODD Elevation**

This release formalizes the three-tier conceptual hierarchy and physically restructures the repository to match the mental model.

### Breaking Changes

- **ODD moved to root level**: `/canon/odd/` → `/odd/`
- **URIs changed**: `klappy://canon/odd/*` → `klappy://odd/*`
- **All references updated** throughout the repo

### Added

- **D0001: Three-Tier Conceptual Hierarchy** (`/odd/decisions/D0001-three-tier-conceptual-hierarchy.md`) — Formalizes ODD (universal principles) → Canon (program constraints) → Docs (implementation details)
- **Three-tier section in ODD Contract** — Contract bumped to 2.1.0 with hierarchy documentation
- **Litmus test** for file classification: 10-year truth test → ODD, all-products test → Canon, local test → Docs

### Changed

- **ODD System Contract** — Bumped to 2.1.0 with three-tier hierarchy section
- **orientation-map.md** — Now includes the three-tier hierarchy and litmus test
- **progressive-elevation.md** — Elevated from `/docs/appendices/` back to `/odd/appendices/` (it defines the portability ladder itself)

### Philosophy

- **ODD = physics** — Universal principles that would still be true if klappy.dev didn't exist
- **Canon = constitution** — Program-level constraints derived from ODD, shared across products
- **Docs = implementation** — How this instance works, lane PRDs, CLI commands, Cloudflare specifics

### Migration Notes

- All cross-references have been updated
- Historical files (CHANGELOG, attempt evidence) retain old paths as historical record
- Compile plans updated to use new paths
- Run `npm run sync` to regenerate public/content/

---

## 0.5.4 — 2026-01-21

**README Index Pattern**

This release introduces scannable README.md files for all canon folders, enabling tree-shaking of memory into guide packs without reading every file.

### Added

- **canon/README.md** — Top-level canon index with contents table, meta rules, confidence scores
- **canon/odd/README.md** — ODD folder index with core thesis
- **canon/odd/appendices/README.md** — 24 appendices indexed with one-line summaries
- **canon/odd/decisions/README.md** — Renamed from index.md, same content + emojis

### Changed

- **failure-driven-modularity.md** — Moved from `canon/evolution/` to `canon/odd/appendices/` (single file doesn't need its own folder)
- **prd-guide compile plan** — Now includes folder READMEs instead of specific appendices; agents get scannable summaries without full content
- **Emojis** — Consistent emoji headers added to all README/index files

### Removed

- **canon/evolution/** — Folder removed (contained only one file)
- **canon/index.md** — Replaced by README.md

### Philosophy

- README.md serves as both orientation AND scannable index
- Contents tables enable tree-shaking: agents can see what exists without reading everything
- Pack compilation can include folder READMEs for summaries instead of all individual files
- One file per folder is overhead; promote to parent or appropriate collection

### Notes

- This pattern enables the prd-guide-pack to include appendices summary (~500 tokens) instead of full appendices (~20K tokens)
- Agent-skill decisions/index.md also renamed to README.md for consistency

---

## 0.5.3 — 2026-01-21

**Memory Architecture Proposal**

This release proposes the Memory Architecture appendix and establishes the lane history folder pattern in agent-skill.

### Added

- **Memory Architecture (Proposed)** (`/canon/odd/appendices/memory-architecture.proposed.md`) — Defines memory as a layered percolation system: Attempts → Lane History → Lane Decisions → Cross-Lane Patterns → Canon. Makes decay the default and elevation explicit.

### Changed

- **Agent-Skill Lane** — Replaced single `LEDGER.md` with indexed `history/` folder pattern (mirrors `decisions/` pattern)
  - D0008: ROADMAP tracks vision only, not status
  - D0009: History folder pattern with index + individual entry files
  - Migrated all LEDGER entries to `history/H000X-*.md` files
  - Removed Learnings Log from ROADMAP (now lives in history/)

### Philosophy

- Memory is the percolation path from ephemeral execution to durable truth
- Decay is the default; elevation requires explicit criteria (recurrence, portability, drag reduction, testability)
- "Evidence without elevation creates false confidence rather than learning"
- Canon is not the goal of all things — many patterns remain usefully non-canonical

### Notes

- Memory Architecture is `proposed` status until at least one more lane adopts the pattern
- The history/ folder pattern reduces agent scan cost (~500 tokens for index)
- This release demonstrates ODD working: frustration → lane decision → proposed canon

---

## 0.5.2 — 2026-01-20

**Lane-Contained Attempts**

This release consolidates attempt artifacts under the product lane directory, eliminating the dual-location ambiguity between `/attempts/<lane>/` and `/products/<lane>/attempts/`.

### Changed

- **Canonical attempt location** is now `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`
- **attempt-cli.js** — All path constructions updated to lane-contained format
- **product-lanes.md** — Attempt structure section updated
- **online-evidence.md** — Evidence artifact path updated
- **progressive-elevation.md** — Ephemeral layer path updated
- **repo-topology.md** — Core topology and source of truth tables updated
- **attempt-lifecycle.md** — Multiple sections updated to lane-contained paths
- **contract.md** — Breaking changes list updated
- **D0009** — Constraints section updated
- **D0011** — Breaking changes table updated
- **ATTEMPTS.md** — Folder structure section rewritten
- **ATTEMPT_KICKOFF.md** — Artifact locations updated with completion gates
- **AGENT_KICKOFF.md** — Evidence path updated
- **BOOTSTRAP.md** — Evidence URL example updated
- **Website kickoff prompt** — Explicit lane-contained rule added

### Added

- **attempts/README.md** — Legacy marker explaining root `/attempts/**` is read-only
- **products/website/attempts/README.md** — Lane-contained structure documentation

### Philosophy

- **KISS:** One place per lane, no scavenger hunts
- **Lane-contained:** Everything for a lane lives under `/products/<lane>/`
- **Legacy preserved:** Root `/attempts/**` remains for historical provenance (read-only)

### Notes

- Generated files (`/public/content/**`, `klappy-dev-book-export.md`) will update on next sync
- Tooling now writes exclusively to `/products/<lane>/attempts/...`

---

## 0.5.1 — 2026-01-20

**Media as a Learning Layer**

This release introduces the media philosophy appendix and integrates it into the Website PRD.

### Added

- **Media as a Learning Layer** (`/canon/odd/appendices/media-as-learning-layer.md`) — Defines media as optional, regenerable, and progressively disclosed; text remains canonical

### Changed

- **Canon Index** — Added media-as-learning-layer to Edge Cases bullet list and appendices structure tree
- **Website PRD** — Bumped to v1.1; added Media (Learning Layer) section with initial asset scope and requirements; added media philosophy to Related Documents

### Philosophy

- Canonical truth lives in text; media supports understanding but does not define it
- Clarity is the default, not any specific media format
- Media is opt-in (progressive disclosure), never autoplayed
- Media is created only for stable content to prevent re-record churn

### Notes

- This pass is canon + PRD only; UI implementation is a separate attempt
- Initial media assets declared for Home and ODD pages

---

## 0.5.0 — 2026-01-19

**E0003 — Evidence-First Era**

This release declares E0003, a new epoch where online deployment evidence is mandatory for attempt completion.

### Added

- **E0003 epoch declaration** in `/canon/odd/appendices/epochs.md`
- **D0014 decision log** (`/canon/odd/decisions/D0014-e0003-evidence-first-era.md`) — Documents the epoch transition
- **Evidence copying in smart-build.js** — Automatically copies `products/<lane>/attempts/prd-vX.Y/_runs/` and `attempt-NNN/` folders into `products/<lane>/dist/_evidence/`

### Changed

- **ATTEMPT_KICKOFF.md** — Added E0003 completion rule section at top
- **attempt-cli.js** — Default epoch is now `E0003-evidence-first-era`

### Breaking Changes (Epoch Transition)

- Local builds are no longer sufficient proof for attempt completion
- Attempts must provide HTTP 200 preview URL AND evidence URL
- E0002 attempts are not comparable to E0003 attempts

### Philosophy

- The fitness landscape changed: success is now gated by deployment correctness
- Evidence must be externally reviewable, not locally asserted
- If a preview URL cannot be verified, stop

### Notes

- E0002 attempts remain valid within E0002
- Cloudflare Pages must be configured with correct build command and output directory

---

## 0.4.10 — 2026-01-19

**Deploy Evidence — Evidence Must Be in Build Output**

This release clarifies that evidence must be copied into the build output so Cloudflare Pages can serve it.

### Added

- **Deploy Evidence** (`/canon/odd/appendices/deploy-evidence.md`) — Explains that Cloudflare only serves the build output directory, so evidence must be copied into `products/<lane>/dist/_evidence/<run_id>/`

### Changed

- **Website Kickoff Prompt** (`/infra/prompts/attempt-kickoff/website.md`) — Added "Completion Criteria (Non-Negotiable)" and "Evidence Publishing Rule" sections

### Philosophy

- Cloudflare Pages does NOT serve `/attempts/**` from the repo
- Evidence URLs pointing to `/attempts/**` on a Pages domain are invalid
- Evidence must be copied into `products/<lane>/dist/_evidence/<run_id>/` to be accessible
- The evidence URL is then `/_evidence/<run_id>/EVIDENCE.md` on the preview site

### Notes

- This is an addendum to 0.4.9 (Online Evidence Requirement)
- Together they enforce: push branch + build succeeds + preview URL works + evidence URL works

---

## 0.4.9 — 2026-01-19

**Online Evidence Requirement**

This release makes online evidence a hard requirement for valid attempts. "Works on my machine" is no longer acceptable.

### Added

- **Online Evidence Requirement** (`/canon/odd/appendices/online-evidence.md`) — Defines why attempts without Cloudflare Preview URLs and Evidence URLs are invalid
- **Online Evidence section in Website PRD** — DoD now includes preview URL and evidence URL requirements

### Changed

- **ATTEMPT_KICKOFF.md** — Added "Online Evidence Requirement (Non-Negotiable)" section with explicit invalid conditions
- **BOOTSTRAP.md** — Rewritten to enforce online evidence requirement; agents must report URLs in their first output
- **Website PRD Definition of Done** — Added Cloudflare Preview URL and Evidence URL as required checklist items
- **Canon Index** — Added online-evidence.md to appendices list

### Philosophy

- Local builds are allowed during development but do not satisfy Definition of Done
- If an agent cannot push and produce URLs, the attempt is invalid
- "Works on my machine" is not evidence — it's a prayer
- Evidence must be viewable online without the author running code locally

### Notes

- Cloudflare Pages must be configured with correct build command (`npm run build -- --lane <lane>`)
- Branch naming now includes lane (enforced in 0.4.8) so preview URLs are traceable

---

## 0.4.8 — 2026-01-19

**Lane-Aware Branch Naming & Cloudflare-Compatible Builds**

This release enforces lane-aware branch naming and fixes Vite build paths for Cloudflare compatibility.

### Added

- **Preview Guide** (`/docs/PREVIEW.md`) — Local and Cloudflare preview workflows with troubleshooting
- **Branch validation** in `attempt:register` — Refuses invalid branch prefixes and validates lane inclusion

### Changed

- **smart-build.js** — Uses `cwd` instead of `vite --root` for lane builds (Cloudflare-compatible)
- **attempt-cli.js** — Branch format now includes lane: `run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>`
- **attempt:register** — Refuses on `main`/`prod` branches; refuses branches not starting with `run/` or `attempt/`
- **attempt:nuke** — Now requires `.attempt.json` to exist (enforces register-before-nuke workflow)
- **BOOTSTRAP.md** — Expanded with explicit branch format requirements and required reading list
- **ATTEMPT_KICKOFF.md** — Added link to PREVIEW.md in Related Documents

### Philosophy

- Branch naming is no longer optional — tooling enforces lane inclusion
- Build paths use `cwd` instead of `--root` to avoid Cloudflare path resolution issues
- Registration must happen before nuke to ensure provenance is captured

### Notes

- Cloudflare Pages projects must set build command to `npm run build -- --lane <lane>`
- Output directory must be `products/<lane>/dist`

---

## 0.4.7 — 2026-01-19

**Canonical Lane Kickoff Prompts**

This release introduces reusable, in-repo prompt files for attempt kickoffs, eliminating one-off prompt drift.

### Added

- **Website Lane Kickoff** (`/infra/prompts/attempt-kickoff/website.md`) — Canonical kickoff prompt for website lane attempts with locked order, scope guards, and evidence requirements
- **Bootstrap Prompt** (`/infra/prompts/attempt-kickoff/BOOTSTRAP.md`) — Minimal instructions for agents to read the lane kickoff file verbatim

### Changed

- **ATTEMPT_KICKOFF.md** — Added "Canonical Lane Kickoff Prompts" section documenting all lane prompt paths

### Philosophy

- Prompts live in-repo, not in chat history
- One prompt per lane, no one-off variations
- Bootstrap pattern keeps Cursor paste minimal: `Use /infra/prompts/attempt-kickoff/BOOTSTRAP.md, lane = website.`
- Lane kickoff files are canonical and intentionally changed (decision log if needed)

### Notes

- AI-navigation and agent-skill lane kickoff files can be added later using the same pattern
- This is infrastructure for prompt hygiene, not a behavioral change

---

## 0.4.6 — 2026-01-19

**Pre-commit Hook for Content Compilation**

This release adds automated content compilation via a pre-commit git hook, ensuring synced content and book exports stay current with every commit.

### Added

- **Husky** (`husky@9.1.7`) — Git hook management as dev dependency
- **Pre-commit hook** (`.husky/pre-commit`) — Runs content sync and book export before each commit
- **Book export script** (`npm run book`) — Generates `klappy-dev-book-export.md` from all documentation

### Changed

- **package.json** — Added `book` and `prepare` scripts
- **Content frontmatter** — Added missing YAML frontmatter to ensure all intended docs are included in the generated content manifest (eliminates orphan warnings)

### Behavior

On every `git commit`:

1. `npm run sync` runs (copies content to `/public/content/`, generates `manifest.json`)
2. `npm run book` runs (generates `klappy-dev-book-export.md`)
3. Generated files are auto-staged for inclusion in the commit
4. If either script fails, the commit is blocked

---

## 0.4.5 — 2026-01-18

**Canonical Compression Model**

This release introduces the compilation model for producing derived, minimal working models from Source Canon without mutating source truth.

### Added

- **Canonical Compression** (`/canon/odd/appendices/canonical-compression.md`) — Defines how compiled outputs are produced as derived artifacts that are disposable and epoch-scoped
- **Compiled output directory** (`/canon/_compiled/epoch-E0002/`) — Prepared structure for future compilation tooling with warning README
- **Progressive Elevation frontmatter** — Fixed missing frontmatter fields to ensure proper manifest inclusion

### Changed

- **Canon Index** — Added canonical-compression to ODD Appendices list
- **Manifest** — Added canonical-compression and progressive-elevation resource entries

### Philosophy

- Source Canon remains authoritative and unchanged
- Compiled outputs are derived artifacts that can be deleted without loss of truth
- Compression is compilation, not mutation
- Epoch-scoping prevents "half-updated working models" from lingering

### Notes

- Implementation of `canon:compile` tooling is tracked separately
- Compiled outputs live in `_compiled/` and are intentionally wipeable

---

## 0.4.4 — 2026-01-18

**Memory & Portability Model**

This release makes the progressive elevation and decay model explicit, documenting how artifacts move from ephemeral to durable layers.

### Added

- **Progressive Elevation & Decay** (`/canon/odd/appendices/progressive-elevation.md`) — The five layers of portability (Conversation/Attempt, PRD, Contracts, Canon, Decision Trace) and strict elevation criteria
- **Memory Is the Bottleneck** section in ODD Manifesto — Explains how ODD treats durable thinking as scarce and generated artifacts as abundant
- **WHAT_THIS_REPO_IS_NOT.md** (`/docs/WHAT_THIS_REPO_IS_NOT.md`) — Human-facing clarification about what this repository intentionally is not
- **Agentic Memory Portability** project (`/projects/agentic-memory-portability.md`) — Project entry describing the memory portability goal

### Changed

- **ODD Manifesto** — Added "Memory Is the Bottleneck" section before "Relationship to Canon"
- **Canon Index** — Added progressive-elevation.md to ODD Appendices list
- **README** — Added links to WHAT_THIS_REPO_IS_NOT.md and agentic-memory-portability.md under "If You Want to Explore"

### Philosophy

- Most artifacts should decay; only proven patterns that repeatedly reduce drag should elevate
- Documentation sprawl is avoided by intentional decay at the Attempt/PRD layer
- Portability across time, people, and agents requires strict elevation criteria (recurrence, portability, drag reduction, testability)

---

## 0.4.3 — 2026-01-18

**E0002 Convergence: Lane-Scoped Build Output**

This release locks and begins converging the canonical build output truth for E0002 lanes:

> `products/<lane>/dist/` is canonical. Repo-root `/dist` is legacy/transitional.

### Added

- **D0012** — E0002 transition interpretation (truth may lead enforcement; contradictions are tracked)
- **D0013** — Build output truth is lane-scoped (`products/<lane>/dist`)

### Changed

- **Build output interface contract** — MAJOR bump to `build-output@3.0.0` to require lane-scoped output and clarify runtime manifest path (`/content/manifest.json`)
- **Repository topology** — Updated generated output surface to `products/<lane>/dist` (with legacy `/dist` mirror explicitly labeled)
- **Lane build layout** — Updated build artifact references to lane-scoped output

---

## 0.4.2 — 2026-01-17

**Visual Evolution Layer**

This release introduces visual interfaces as a first-class concept, allowing visual systems to evolve independently from products using the same evolutionary model as code.

### Added

- **Visual Evolution** (`/canon/odd/appendices/visual-evolution.md`) — Why visual systems evolve independently from products
- **Visual Interfaces** (`/visual/interfaces/`) — Semver'd visual compatibility contracts
  - `color-system@1.0.0` — Semantic color tokens and accessibility requirements
  - `typography@1.0.0` — Modular type scale and semantic roles
  - `spacing@1.0.0` — Base-8 spacing scale and application rules
- **Repo Truth Audit** (`/canon/odd/appendices/repo-truth-audit.md`) — Prompt for self-referential drift detection across canon, docs, tooling, and structure
- **Visual directory structure:**
  - `/visual/interfaces/` — Visual contracts
  - `/visual/assets/` — Generated outputs (disposable)
  - `/visual/attempts/` — Evolutionary visual exploration

### Changed

- **Website PRD** — Now declares visual interface compatibility (color-system, typography, spacing)
- **Canon Index** — Added visual evolution, drift checks, and lane build layout to appendices list

### Philosophy

- Visual consistency is a property of contracts, not code
- Products consume visual interfaces, they do not define colors/fonts/spacing directly
- Visual attempts compete; only champions advance interface versions
- Visual systems can evolve faster than products without invalidating experiments

---

## 0.4.1 — 2026-01-17

**Interface Contracts + Semver Layer**

This release introduces explicit interface contracts with semantic versioning, documenting the compatibility promises that lanes depend on.

### Added

- **Interface Contracts** (`/interfaces/index.md`) — Semver'd compatibility layer
  - `manifest@2.0.0` — Manifest schema and semantics contract
  - `build-output@1.0.0` — Deployment artifact shape contract
  - `attempt-cli@2.0.0` — CLI surface and output artifacts contract
  - `mcp@0.1.0` — Draft MCP surface contract (not yet enforced)
- **Lane Build Layout** (`/canon/odd/appendices/lane-build-layout.md`) — How lanes avoid /src and /dist collisions
- **Drift Checks** (`/canon/odd/appendices/drift-checks.md`) — Drift prevention mechanism and verify:contracts placeholder

### Changed

- **Lane PRDs** — Each PRD now declares required interface contracts:
  - Website: manifest>=2.0.0, build-output>=1.0.0, attempt-cli>=2.0.0
  - AI-Navigation: manifest>=2.0.0, build-output>=1.0.0, attempt-cli>=2.0.0, mcp@0.1.x (unstable)
  - Agent-Skill: manifest>=2.0.0, attempt-cli>=2.0.0 (no build-output required)
- **Docs** — Added interface contract and lane-build-layout links to:
  - `/docs/ATTEMPTS.md`
  - `/docs/ATTEMPT_KICKOFF.md`
  - `/docs/CLOUDFLARE_CONFIG.md`

### Notes

- Interface contracts are the only documents that use semver by default
- Lanes must remain compatible with declared contracts or bump major versions
- `verify:contracts` command defined but not yet implemented

---

## 0.4.0 — 2026-01-17

**ODD Contract 2.0.0 — Multi-Lane Era**

This release introduces the multi-lane PRD architecture, epochs for comparability, alignment reviews for drift detection, and lane-scoped implementation surfaces. This is a breaking change from the single-PRD model.

### Added

- **ODD Contract 2.0.0** (`/canon/odd/contract.md`) — Single source of ODD system versioning
- **Epochs** (`/canon/odd/appendices/epochs.md`) — Named periods where success meaning is stable
- **Alignment Reviews** (`/canon/odd/appendices/alignment-reviews.md`) — Periodic evaluation for drift detection
- **Product Lanes** (`/canon/odd/appendices/product-lanes.md`) — Multi-lane PRD architecture
- **Lane-Scoped Implementation Surfaces** (`/canon/odd/appendices/lane-implementation-surfaces.md`) — Each lane owns `products/<lane>/src` and `products/<lane>/dist`
- **Decision Logs:**
  - D0009: Multi-lane PRD architecture
  - D0010: Canonical agent kickoff (`AGENT_KICKOFF.md`)
  - D0011: ODD Contract 2.0.0 declaration
- **Lane PRD directories:**
  - `/docs/PRD/website/PRD.md`
  - `/docs/PRD/ai-navigation/PRD.md`
  - `/docs/PRD/agent-skill/PRD.md`
- **Lane implementation surfaces:**
  - `/products/website/src/`
  - `/products/ai-navigation/src/`
  - `/products/agent-skill/src/`

### Changed

- **Attempt CLI** — Now lane-scoped:
  - `attempt:nuke` requires `--lane`, only deletes `products/<lane>/src`
  - `attempt:register` requires `--lane`, includes `lane_root`, `dist_dir`, `epoch_id` in META.json
- **META.json schema** — Now includes `lane`, `lane_root`, `dist_dir`, `epoch_id`
- **Cloudflare config** — Lane-root deployments (`products/<lane>` as root directory)
- **ATTEMPTS.md** — Lane-scoped folder structure and paths
- **ATTEMPT_KICKOFF.md** — Lane-scoped nuke/build commands
- **AGENT_KICKOFF.md** — Lane and epoch declaration required at Step 0

### Epochs

| Epoch                | Contract | Description                                  |
| -------------------- | -------- | -------------------------------------------- |
| E0001-single-prd-era | 1.x      | Single PRD world (`/docs/PRD.md`)            |
| E0002-multi-lane-era | 2.x      | Multi-lane world (`/docs/PRD/<lane>/PRD.md`) |

### Breaking Changes

- Single active PRD rule removed
- Lane declaration required for all attempts
- Epoch declaration required in META.json
- Repo-root `/src` and `/dist` are no longer product surfaces
- Attempts stored under `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/` (lane-contained)

### Notes

- Do not compare outcomes across epochs without explicit adjustment
- Canon is shared across lanes; PRDs and attempts are lane-scoped
- Each lane is an independent product with its own evolutionary track

---

## 0.3.1 — 2026-01-17

### Changed

- Content metadata now lives in per-file YAML frontmatter (source of truth).
- `/public/content/manifest.json` is now generated during `npm run sync` from frontmatter + `/canon/meta/pack.json`.
- `canon/meta/manifest.json` has been removed to prevent metadata drift.
- The renderer strips frontmatter before rendering markdown content.

### Notes

- `npm run verify:content` now validates the generated manifest coverage against `/public/content/`.

---

## 0.3.0 — 2026-01-17

### Added

- **Decision Log** (`/canon/odd/decisions/`) — ADR-lite structure for durable decisions
  - D0001: `prod` branch is production
  - D0002: Attempt provenance required (tool, agent, model)
  - D0003: PRD version auto-detection
  - D0004: Cleanup is mandatory
  - D0005: Nuke command safety guards
  - D0006: Dogfooding requirement
  - D0007: Branch names are convenience
  - D0008: Register before nuke
- **Truth Map** (`/docs/TRUTH_MAP.md`) — authoritative source index

### Changed

- **Production model:** `prod` branch is production, `main` is experiment ledger (D0001)
- **Attempt lifecycle:** Register → Nuke → Build → Finalize → Promote
- **Provenance:** META.json now captures tool, agent_id, model, run_id, branch, prd_version
- **Collision avoidance:** Numbers assigned at finalization, not reserved upfront

### Deprecated

- `ATTEMPT_REGISTRY.json` — replaced by `attempt:finalize` deterministic numbering
- `attempt:reserve` — replaced by `attempt:register` (captures provenance)
- `attempt:reset` — replaced by `attempt:nuke` (explicit blank slate)
- "main is production" language — `prod` is now production

### Notes

- This release eliminates the "three eras" confusion and establishes one coherent model.
- See `/docs/TRUTH_MAP.md` for authoritative source identification.
- See `/canon/odd/decisions/` for the rationale behind each decision.

---

## 0.1.5 — 2026-01-16 (Superseded by 0.3.0)

### Added

- **Worktrees and learnings model** (`/canon/odd/appendices/attempt-lifecycle.md`)
  - Worktrees are disposable sandboxes, learnings are repo-state
  - Learnings payload requirement (artifacts + PRD patches)
- **Artifacts always merge rule**
  - Failed attempts contribute learnings via artifacts merge
  - Two merges: artifacts (always) + code (only Champion)
- ~~**Attempt registry mechanism** (`ATTEMPT_REGISTRY.json`)~~ — **DEPRECATED in 0.3.0**
- ~~**Fresh start requirement** (`attempt:reset`)~~ — **DEPRECATED in 0.3.0**, use `attempt:nuke`

### Notes

- ⚠️ This version's registry/reserve model has been superseded by register/finalize in 0.3.0.

---

## 0.1.4 — 2026-01-16

### Added

- **Champion selection and promotion policy** (`/canon/odd/appendices/attempt-lifecycle.md`)
  - Defines how one attempt graduates from experiment to production
  - Minimum gates, tie-breakers, and promotion procedure
  - Winner declaration snippet for ATTEMPT.md
- **Promotion script** (`npm run attempt:promote`) for automated Champion workflow

### Changed

- Attempt Lifecycle: CHAMPION status + META.json promotion fields (`/canon/odd/appendices/attempt-lifecycle.md`)
- Quantum Development: grounding line that experiments end with promotion (`/canon/odd/appendices/quantum-development.md`)

### Notes

- This release closes the loop on Quantum Development: observations without promotion are incomplete experiments.
- ⚠️ Note: As of 0.3.0, `prod` is the production branch. `main` is the experiment ledger.

---

## 0.1.3 — 2026-01-16

### Added

- Cloudflare branch deploys infra note (`/docs/infra/cloudflare-branch-deploys.md`)
- Attempts doc: "PRD as the Unit of Test" (procedural) (`/docs/ATTEMPTS.md`)
- Attempt Lifecycle: "PRD as the Unit of Test" + "Independence: goal vs infrastructure" (`/canon/odd/appendices/attempt-lifecycle.md`)

### Changed

- Decision Rules: "Prefer one-shot builds; don't steer a miss" and "Don't hard-code domain tables; hard-code protocol contracts" (`/canon/decision-rules.md`)
- Quantum Development: cross-link to PRD-as-unit-of-test framing (`/canon/odd/appendices/quantum-development.md`)
- Active PRD: requires infra artifact when deploy behavior is in scope; adds attempt independence enforcement (`/docs/PRD.md`)

### Notes

- This release encodes transcript-derived learnings as rules and procedures, while avoiding operationally irrelevant or sensitive details.

---

## 0.1.2 — 2026-01-16

### Added

- Quantum Development appendix (`/canon/odd/appendices/quantum-development.md`)
- Attempt Kickoff prompt (`/docs/ATTEMPT_KICKOFF.md`)
- Agent Entry Point (`/docs/AGENT_ENTRYPOINT.md`)
- Single active PRD (`/docs/PRD.md`)

### Changed

- Canon Index: explicit “single active PRD” policy (`/canon/index.md`)
- Attempt Lifecycle: cross-link to the single kickoff prompt (`/canon/odd/appendices/attempt-lifecycle.md`)
- Attempts documentation updated to reflect single active PRD + kickoff prompt (`/docs/ATTEMPTS.md`)
- PRD template updated to reflect single active PRD policy (`/docs/PRD/PRD_TEMPLATE.md`)

### Removed

- Versioned PRDs from the main docs surface (`/docs/PRD/PRD_v*.md`) in favor of `/docs/PRD.md`

### Notes

- This release reduces PRD and prompt sprawl by making the active PRD and kickoff prompt uniquely authoritative.

---

## 0.1.1 — 2026-01-15

### Added

- Attempt Lifecycle appendix (`/canon/odd/appendices/attempt-lifecycle.md`)
- Repository Topology appendix (`/canon/odd/appendices/repo-topology.md`)
- PRD Template (`/docs/PRD/PRD_TEMPLATE.md`)

### Established

- PRD → Attempt → Evidence model
- Decoupled infrastructure from truth (SHA is canonical, deploys are views)
- Three planes: App (disposable), Content (accumulates), Infrastructure (persists)
- Four core principles including "Deployments are views, not truth"

### Notes

- This release stabilizes the process model itself, not just content.
- Future PRDs and attempts will stress-test this structure.
- Operational procedures live in `/docs/ATTEMPTS.md`, not Canon.

---

## 0.1.0 — 2026-01-15

### Added

- Canon Index (`/canon/index.md`) as the orientation entrypoint.
- Core canon documents:
  - Constraints
  - Decision Rules
  - Definition of Done & Evidence Policy
  - Self-Audit Checklist
  - Visual Proof Standards
  - Completion Report Template
- ODD canon set:
  - ODD Manifesto — Extended
  - Project Maturity & Progressive Governance
- ODD appendices:
  - Misuse Patterns
  - Prompt Architecture
  - Orientation Map
- About pages:
  - Bio
  - Credibility
  - FAQ
- Content manifest (`/public/content/manifest.json`) generated from per-file frontmatter (stable URIs).

### Notes

- The manifest is inventory-only: it declares what exists and how it may be addressed.
- Any future workflow semantics belong in clients or tools, not in this pack.
