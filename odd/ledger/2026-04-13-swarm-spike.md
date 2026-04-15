# Session Journal — April 13, 2026

## TruthKit Swarm Architecture Review & Spike Planning

**Session type:** Architecture review of two uploaded docs (swarm harness decision + handoff doc for venture partners) intersecting with prior session decisions.

**Epistemic mode transition:** Planning → Execution (spike design resolved)

-----

## Observations

### O1: Bible translation is structurally unsuitable as swarm spike vertical

Target languages have zero model training data. The "LLM as mouth" thesis has a prerequisite: the mouth must speak the language. For minority languages, the mouth is mute. Bible translation may need a fundamentally different swarm architecture — one where the swarm governs the human translator's workflow, not the model's output.

### O2: Biblical resources are a stronger swarm candidate than translation

Resources (lexicons, commentaries, study helps) are authored in languages models already speak — English, Greek analysis, Hebrew analysis. Massive backlog exists: half-finished lexicons, commentaries that cover Genesis through Psalms then stop. The sequencing answer to the chicken-and-egg: resources first → translation second → model capability in new languages third.

### O3: Existing KBs don't need to be incomplete to benefit from the swarm

Most knowledge bases are collections of individually good articles that don't talk to each other. The swarm adds layers to complete, authoritative content: crosslinks, theme maps, contradiction detection, application notes. The KB doesn't need gaps — it needs connections.

### O4: Handoff doc contains a framing contradiction with prior decisions

The handoff says "TruthKit is oddkit's next evolutionary form. Same codebase (klappy/oddkit)." The April 4 session decided "TruthKit is a client of oddkit, not its evolution — the MCP boundary keeps oddkit sharp." The client-of relationship is architecturally load-bearing for licensing: if TruthKit code lands in the oddkit repo, MIT applies. Must correct before sending to Tim and Ian.

### O5: The swarm harness decision doc and handoff doc reinforce prior architecture cleanly

Zero-trust inference scales from 1 agent to N without change. DOLCHE compression extending to inter-agent membrane is continuous bidirectional encoding applied horizontally. Model-agnostic routing was already decided. "Protocol commodity / canon moat / harness product" sharpens existing positioning.

-----

## Learnings

### L1: The swarm IS the Scan pipeline — it was always distributed

**Strongest insight in this session.** The scan pipeline was always multi-pass — summary, claims, detail, crosslink. Each pass has different focus, output shape, and quality criteria. DOLCHE compression between passes is already DOLCHE-shaped: observations from claims pass feed learnings in crosslink pass. Progressive disclosure tiers map 1:1 to agent slots. The swarm architecture was latent in the scan pipeline from the beginning — it was a distributed pattern forced to run on one agent. This reframes the swarm from "new capability" to "correct topology for existing design." The foundation is an architectural insight, not a trend-chase.

### L2: Swarm orchestration demands a new vodka layer, not a thicker existing layer

The Worker doesn't get thicker — a new layer appears above it. This collapses the tension between swarm complexity and the vodka constraint. Each existing layer stays thin. New layers compose thin layers. Unix philosophy all the way through.

### L3: The Social Projector is the first swarm topology, not a separate workstream

Enriched klappy.dev KB feeds platform-specific agents — X agent (punchy, threaded, hook-first), LinkedIn agent (professional framing), Substack agent (deep-dive), Medium agent (accessible bridge). Each gets the same enriched source material but a different platform governance profile. Different models per slot, same governed canon.

### L4: The DOLCHE Membrane is drift correction, not just compression

If human operators drift across sessions even with a canonical source available (proven: vodka doc was assumed missing for three sessions without anyone checking), agents within a swarm will drift within a single run without the membrane actively correcting. The membrane's job description sharpens from "lossy inter-agent compression" to "epistemic alignment enforcement between agents." Compression is the mechanism. Drift correction is the function. Cross-session memory drift when the canon isn't checked is itself a constraint on the swarm design — the membrane must prevent within-run what humans failed to prevent across sessions.

-----

## Decisions

### D1: TruthKit = three-layer product stack

**Revised post-spike and post-altitude-reconciliation.** The session initially framed the swarm as sub-component layers (Membrane, Evaluator, Orchestrator). A cross-project review surfaced that this was the wrong altitude — it's the internal plumbing of one product layer, not the product stack itself.

**The product stack (what to build, what partners evaluate):**

1. **Layer 1 — Governed Model Call.** The atomic unit. TruthKit's core Worker. Fetch governance from oddkit, inject into model, validate output. One model, one governed invocation. Nearly exists in code.
2. **Layer 2 — Swarm Coordination.** Multiple instances of Layer 1 working together. Internal plumbing includes: DOLCHE Membrane (drift correction, vodka sub-component), Convergence Evaluator (ODD gauntlet, vodka sub-component), Swarm Orchestrator (topology + routing, operational sub-component), Community Checking Pass (transfer testing, persona injection).
3. **Layer 3 — Content Hosting.** Where enriched output lands and gets served. **Undesigned this session.** This is the encode-persist gap at product scale.

**Governance internals of Layer 2** (right altitude for architecture decisions, not partner conversations): The spike's Tension Agent caught that the Orchestrator fails the vodka doc's "serves epistemic discipline" test on two of three responsibilities. The Membrane and Convergence Evaluator are vodka sub-components. The Orchestrator is operational. This distinction is load-bearing for internal architectural honesty but nests inside the product layer.

### D2: Spike vertical is klappy.dev dogfooding

Not Bible translation, not pastoral, not recruiting. Run swarm passes against Klappy's own essays and oddkit canon. He is the domain expert, KB owner, and customer simultaneously. No external validation dependency. Immediate utility: enriched KB feeds syndication projections for all platforms. Because lean startup reversal — learn first (manual swarm), measure (did the layers add value?), then build (automate what worked).

### D3: Biblical resources → additive layer swarm is a future commercial vertical

A governed swarm producing draft lexical entries, commentary extensions, and crosslinks from authoritative Aquifer sources — giving scholars a first draft worth editing instead of a blank page. This doesn't replace the scholar; it accelerates their work. Evaluate after klappy.dev spike proves the swarm thesis.

-----

## Constraints

### C1: "LLM as mouth" requires the mouth to speak the language

The heterogeneous model thesis is bounded by model capability in the target language. For minority/unwritten languages, the swarm must govern human workflow, not model output. This constraint shapes which verticals can use TruthKit's swarm and which need a different architecture.

### C2: Handoff doc must correct "same codebase" language before distribution

The client-of relationship (TruthKit is a client of oddkit via MCP) must be preserved in all partner-facing documents. "Evolutionary form" is acceptable for narrative framing but "same codebase" is factually wrong and creates licensing exposure.

### C3: Each vodka layer must be independently removable

The swarm orchestrator, DOLCHE membrane, and convergence evaluator each must function independently and be removable without breaking the layers below them. If removing the orchestrator breaks the single-agent Worker, the layering is wrong.

### C4: Spike must validate three things before any code is written

(a) Can small models hold the zero-trust constraint under governed injection? (b) Does DOLCHE compression between passes preserve epistemic signal? (c) Does multi-perspective tension surface connections a single agent flattens? If any of these fail, the swarm thesis needs redesign before building.

**Concrete test for (b):** Run Agent 1 (claims extraction) on an essay. Capture full output. Manually DOLCHE-compress it. Feed the compressed version to Agent 2 (crosslink pass). Then re-run Agent 2 with Agent 1's *full uncompressed output*. Compare: did Agent 2 reach the same crosslinks from the compressed input as from the full transcript? If yes, the membrane preserved signal. If Agent 2 missed crosslinks that were only discoverable in the full output, the compression profile lost load-bearing detail. The delta between the two runs *is* the measurement of membrane fidelity.

-----

## Handoff

### Inbound (received this session)

- **truthkit-swarm-harness-decision.md** — DECISION record: TruthKit is a heterogeneous model swarm harness. Triggered by MiroFish analysis. Reviewed, validated, produced D1 (new vodka layers) and C2 (language correction needed).
- **truthkit-handoff.docx** — Executive handoff document for Tim, Ian, and venture partners. Full architecture, MiroFish positioning, commercial framing, vertical evaluation, next steps. Reviewed, validated with one correction needed (C2: "same codebase" language contradicts client-of decision).

Both documents are now part of the project record. The session DOLCHE above captures what the review surfaced.

### H1: Immediate — klappy.dev dogfood spike

Run manual swarm against klappy.dev essays and oddkit canon. No new infrastructure. Manual DOLCHE compression between passes. Compare multi-agent swarm output against single-agent baseline. Measure: did the swarm surface real connections that weren't explicit? Binary signal — a crosslink is valid or it isn't.

### H2: Immediate — Fix handoff doc language ✓

Corrected "same codebase (klappy/oddkit)" and "next evolutionary form" to accurately reflect the client-of relationship. OLDCH → DOLCHE throughout. Verified zero remaining OLDCH instances. **Done.**

### H2.5: Immediate — Finalize swarm decision doc ✓

Status updated Draft → Accepted. Two addenda appended: (1) Layer architecture with Orchestrator reclassification, (2) Community checking fourth pass from Run 2 findings. DOLCHE section updated with full session learnings. **Done.**

### H3: After spike — Syndication topology

If dogfood spike validates, build platform-specific agent profiles (X, LinkedIn, Substack, Medium). This is the Social Projector from the handoff doc, now understood as the first swarm topology rather than a separate tool.

### H4: After spike — Biblical resources vertical evaluation

Take spike learnings to Ian. Evaluate whether swarm-driven enrichment of Aquifer content would accelerate resource completion. The Aquifer MCP and data already exist. The question is whether the enrichment layers are scholar-grade.

### H5: Architecture — Layer stack needs names

The three new layers need canon-grade names and boundary definitions. Currently working names (Orchestrator, Membrane, Convergence Evaluator) are descriptive but not canonical. These need architecture decision records before code.

### H6: Carry-forward from prior sessions — DEBT STATUS

Four unresolved items across three sessions. ~Vodka Architecture canon doc~ — **resolved.** `klappy://canon/principles/vodka-architecture` exists, is comprehensive (six design heritage principles, three properties, three anti-patterns, three constraint test questions), dated April 4, status active, epoch E0007.1. The April 9 session flagged a gap that had already been closed. This is itself a data point: cross-session memory drifts when the canon isn't checked.

Remaining debt:

- **DOLCHE storage-at-scale tensions T1–T5** — unresolved from April 4. Exploration mode. Not blocking the spike but blocks TruthKit productization.
- **Encode-persist gap automation** — proven manually, needs TruthKit to close. The spike will produce more `persist_required: true` artifacts that don't persist. Irony compounds.
- **Managed Agents architecture design** — H4 from April 9. May intersect with swarm orchestrator design.
- **oddkit URI resolution fragility** — search returns URIs that get can't fetch. Technical debt in the tool layer.

-----

## Spike Results — Manual Swarm Against Vodka Architecture Doc

**Input:** `klappy://canon/principles/vodka-architecture` (comprehensive canon principle doc)
**Topology:** 3-pass sequential — Claims Extraction → Crosslink → Tension/Contradiction
**Models used:** Human operator (Klappy) + Claude — C4(a) small model test NOT performed
**Membrane test:** DOLCHE compression applied between passes — C4(b) A/B protocol NOT performed (no uncompressed comparison run)

### C4 Validation Status

|Criterion                                                          |Status        |Evidence                                                                                                     |
|-------------------------------------------------------------------|--------------|-------------------------------------------------------------------------------------------------------------|
|(a) Small models hold zero-trust constraint                        |**NOT TESTED**|This run used human + SOTA, not Gemma-class                                                                  |
|(b) DOLCHE compression preserves epistemic signal                  |**NOT TESTED**|Compressed between passes but no A/B comparison against uncompressed                                         |
|(c) Multi-perspective tension surfaces findings single agent misses|**VALIDATED** |5 tensions, 7 missing crosslinks, 3 quantitative inconsistencies — none caught in earlier single-agent review|

### Findings Summary

**Pass 1 — Claims Extraction:** 23 claims extracted. 3 quantitative inconsistencies found: action count (doc says 10, system has 9 epistemic), document count (391 vs 400+ vs 477 actual), epoch count (says seven, E0008 exists).

**Pass 2 — Crosslink:** 7 missing crosslinks identified (4 strong, 3 moderate). Strongest gap: doc doesn't link to E0007 posture shift or D0016 structure-agnostic decision — it knows what it is but not where it came from.

**Pass 3 — Tension/Contradiction:** 5 tensions between vodka doc and swarm architecture. Most consequential: T2 (Orchestrator fails "serves epistemic discipline" test on 2 of 3 responsibilities) → triggered D1 revision. T4 ("removal breaks everything" vs optional layers) → needs vodka doc evolution to "removal breaks the use case it serves."

### What the Spike Proved

The swarm topology works. Multi-perspective tension surfaces architectural problems a holistic single-agent read smoothes over. The system caught its own governing document contradicting its own new architecture — and the architecture was revised as a result.

### What the Spike Did NOT Prove

Small model viability (C4a). Membrane fidelity (C4b). These require separate spikes with the defined test protocols.

### Queued for Vodka Doc Update (batch after more content runs)

- Fourth constraint question: "Has the layer count grown beyond what the epistemic discipline requires?"
- T4 resolution: "removal breaks the use case it serves" (composable vodka layers, not vestigial)
- 7 missing crosslinks from Pass 2
- Quantitative corrections (action count, doc count, epoch count)

-----

## Spike Run 2 — "The Harness and the Operating System" (E0005 essay)

**Input:** `klappy://writings/the-harness-and-the-operating-system` (public essay, tier 2, first person, E0005)
**Topology:** Same 3-pass sequential — Claims Extraction → Crosslink → Tension/Contradiction
**Content type test:** Essay (rhetorical) vs. Run 1's principle doc (structural)

### Findings Summary

**Pass 1 — Claims Extraction (Klappy):** 21 claims extracted across 4 categories (convergence, difference, architectural, trajectory). Key finding: the word "harness" has semantically shifted since this essay — it meant "coding constraint toolkit" then, it means "epistemic governance orchestrator" now. Quantitative claim: "ten composable actions" inconsistent with system's actual nine.

**Pass 2 — Crosslink (Claude):** 9 missing crosslinks identified (5 strong, 4 moderate). Essay has 7 frontmatter connections but zero inline body crosslinks. Strongest gaps: vodka architecture doc (bidirectional — confirmed from Run 1), anti-metric laundering (essay describes the concept without naming it), verification-requires-fresh-context (canonical principle behind the essay's cross-model verification argument). The vodka↔harness-essay gap is now confirmed from both directions across two separate runs.

**Pass 3 — Tension/Contradiction (Klappy):** 5 tensions identified. Most consequential:

- **T1: "Harness" semantic drift.** The essay says "Ben built the harness. I built the operating system." TruthKit says "TruthKit IS a harness." A reader encountering both sees a contradiction. Needs canonical disambiguation.
- **T2: Harness/OS collapse.** TruthKit collapsed the essay's harness/OS distinction by building both into one product. Not incoherent — it's "these belong in the same stack" taken to completion. But the essay doesn't anticipate it.
- **T5: Community checking absent from swarm.** The essay's strongest differentiator (does output transfer to the intended audience?) is absent from the swarm topology. By the essay's own taxonomy, the swarm as designed is a sophisticated harness, not an operating system. **A fourth pass (community checking agent) closes this gap.**

### What Run 2 Proved

The claims→crosslinks→tensions topology holds for essay-form content, not just principle docs. Different content types surface different kinds of findings: principle docs produce quantitative drift and architectural self-contradiction; essays produce semantic drift and conceptual evolution the canon hasn't tracked. Older public-facing content is where drift compounds most dangerously because external readers encounter stale framing.

### New Architecture Items from Run 2

- **L5: Community checking agent = fourth pass.** The pass that makes the swarm an operating system, not just a harness. Asks "does this transfer?" not "is this correct?" May need persona injection (audience expertise, vocabulary, goals) rather than canon injection.
- **C5: "Harness" needs canonical disambiguation.** Constraints doc defining harness(generation) vs. harness(governance) with evolution rationale. Public-facing coherence at risk until resolved.
- **C6: Four-layer Epistemic OS model incomplete for swarm.** The Membrane doesn't fit any of the four layers. Either needs a fifth layer (inter-agent communication) or acknowledgment that the model predates multi-agent architecture.
- **C7: C4(b) test must account for two membrane types.** Passes 1-2-3 use canon-to-canon compression (filtering epistemic signal). Pass 3→4 (community checking) uses analysis-to-persona compression (translating findings into audience-legible terms). These are fundamentally different compression profiles. The A/B test for membrane fidelity must run separately for each type — fidelity for one doesn't imply fidelity for the other.

-----

## Cross-Run Meta-Assessment

|                        |Run 1 (Vodka Doc)                              |Run 2 (Harness Essay)                    |
|------------------------|-----------------------------------------------|-----------------------------------------|
|Content type            |Principle doc (structural)                     |Public essay (rhetorical)                |
|Epoch                   |E0007.1 (recent)                               |E0005 (older)                            |
|Pass 1 findings         |Quantitative inconsistencies                   |Semantic drift                           |
|Pass 2 findings         |7 missing crosslinks (structural isolation)    |9 missing crosslinks (temporal isolation)|
|Pass 3 findings         |Self-contradiction with current architecture   |Conceptual evolution canon hasn't tracked|
|Strongest single finding|Orchestrator is not a vodka layer (D1 revision)|Community checking absent from swarm (T5)|

**C4 validation status after two runs:**

- **(a) Small models hold zero-trust:** NOT TESTED
- **(b) DOLCHE compression preserves signal:** NOT TESTED
- **(c) Multi-perspective tension surfaces findings:** VALIDATED (2 runs, 2 content types, 10 tensions, 16 missing crosslinks, multiple quantitative corrections — none caught in single-agent review)

-----

## Architecture Diagram — Final Product Stack

```
Layer 3: DOLCHE Storage (enrichment artifacts per document)
    ↑ enrichment flows up
Layer 2: Swarm Coordination (all passes parallel per document)
    ┌───────────────────────────────────────────────┐
    │  FOUNDATIONAL                                 │
    │  Pass 1: ESE + DOLCHEO extraction (1–N docs)  │
    │      ↓ DOLCHE compress                        │
    │  Pass 2: Progressive Disclosure (1–N docs)    │
    │      ↓ DOLCHE compress                        │
    │  ANALYTICAL                                   │
    │  Pass 3: Claims Extraction (1–N docs)         │
    │      ↓ DOLCHE compress                        │
    │  Pass 4: Crosslink Discovery (1–N docs)       │
    │      ↓ DOLCHE compress                        │
    │  Pass 5: Tension/Contradiction (1–N docs)     │
    │      ↓ DOLCHE compress (analysis→persona)     │
    │  Pass 6: Community Checking (1–N personas)    │
    │      ↓                                        │
    │  Convergence Evaluator (→ stop/loop)          │
    │                                               │
    │  [Orchestrator: sequential between passes,    │
    │   parallel within passes, model routing both] │
    │  [Each agent = a governed model call (Lyr 1)] │
    └───────────────────────────────────────────────┘
    ↑ governed model calls
Layer 1: Governed Model Call (Worker)
    ↑ governance + context
oddkit MCP + canon
```

**Product altitude:** Three layers. Layer 1 is the atomic unit (nearly exists in code). Layer 2 orchestrates six passes — two foundational, four analytical — all embarrassingly parallel per document. Layer 3 is DOLCHE storage: the enrichment artifact each document accumulates across all passes.

**Single-agent mode:** Remove Layer 2 entirely. Layer 1 connects directly to the frontend.

-----

## Session DOLCHEO

**D (Decisions):**
- TruthKit = three-layer product stack (governed model call → swarm coordination → DOLCHE storage)
- Six passes: ESE, progressive disclosure, claims extraction, crosslink discovery, tension analysis, community checking
- All six embarrassingly parallel per document; sequential dependency is pass-to-pass, not document-to-document
- DOLCHE compression is per-document between passes; each document carries its own DOLCHE chain
- Layer 3 IS the DOLCHE storage — not a separate design concern
- DOLCHEO-aware ESE is the transformation step that converts any generic KB into a governance canon
- D1 revised: Orchestrator is operational, not a vodka layer (caught by swarm's own tension pass)

**O (Observations):**
- ESE was misused all session to mean "multi-pass swarm analysis" — actually means awareness extraction from non-text evidence. Eight instances corrected.
- Cross-document intelligence comes from oddkit's canon index, not from agents talking to each other within a pass
- The membrane fires between passes, not between documents
- Vodka architecture canon doc was assumed missing for three sessions — it existed. Cross-session memory drifts when the canon isn't checked.

**L (Learnings):**
- The swarm IS the scan pipeline — always a distributed pattern running on one agent
- DOLCHEO categories are epistemically generic — decisions, observations, learnings, constraints, handoffs, encodes, open items exist in every domain. Zero domain opinion.
- The difference between a generic KB and a governance canon isn't the content — it's whether the content's DOLCHEO structure has been surfaced
- TruthKit's commercial thesis: take any knowledge base and make it governable
- Two altitude framings (product stack vs. governance internals) are both valid but serve different audiences — reconcile before shipping

**C (Constraints):**
- ESE containment applies: extracted DOLCHEO is interpretive and non-canonical
- Foundational passes (1–2) skippable for mature KBs
- "Harness" disambiguated: harness(generation) = coding toolkit; harness(governance) = TruthKit
- DOLCHE compression profiles vary by membrane type (canon-to-canon vs. analysis-to-persona)

**H (Handoffs):**
- PR #95 open: harness disambiguation + session journal → klappy.dev repo
- Decision doc ready for Tim and Ian (with six-pass pipeline and DOLCHEO)
- Handoff docx ready for Tim and Ian (client-of language corrected)
- DOLCHEO schema needs canon treatment — load-bearing for ESE, compression, AND storage
- Vodka doc update batched (fourth constraint question, 16 crosslinks, quantitative corrections)
- C4a (small model viability) and C4b (membrane fidelity) remain open

**E (Encodes):**
- Session journal (this document)
- Harness disambiguation constraint doc
- Decision doc with reconciled product stack and six-pass pipeline

**O (Open):**
- Can DOLCHEO extraction be fully automated or does it need human review per document?
- Does DOLCHEO-aware ESE replace or extend ESE's existing invariant contract?
- Is DOLCHEO the right schema for Layer 3 storage or does it need a wrapper format?
- How does the six-pass pipeline interact with the build sequence (model harness → orchestration → DOLCHE storage)?
- DOLCHEO schema itself — what earns the O? Broader than "questions" or "unknowns" — TBD
