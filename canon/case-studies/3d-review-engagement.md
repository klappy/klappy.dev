---
uri: klappy://canon/case-studies/3d-review-engagement
title: "Case Study — ODD Accelerates a Multi-Stakeholder Quality Assessment Tool from Fragmentation to Field Deployment in Five Sessions"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["case-study", "engagement", "multi-stakeholder", "acceleration", "proof-of-concept", "epistemic-state-extraction", "puzzle-model", "lovable", "build-spec", "field-deployment"]
epoch: E0006
date: 2026-04-01
derives_from: "canon/values/axioms.md, canon/constraints/definition-of-done.md"
complements: "canon/meta/writing-canon.md, docs/oddkit/tools/oddkit_encode.md"
governs: "Pattern recognition for future first-engagement scenarios"
status: active
---

# Case Study — ODD Accelerates a Multi-Stakeholder Quality Assessment Tool from Fragmentation to Field Deployment in Five Sessions

> In February–April 2026, a five-person team turned a year of rich methodology work into a live field deployment across five sessions. Four sessions of meeting time totaling roughly five hours produced a deployable progressive web app. A fifth session happened in Southeast Asia, where Teryl deployed the tool with two translation teams across two languages — and it worked. The prior work was the foundation. The sessions provided what was missing: a verified path from knowledge to working software. The pattern: epistemic discipline compounds across sessions and tools. Speed at implementation is downstream of clarity upstream. What survives the field is what was verified before departure.

---

## Summary — Five Sessions, Two Languages, One Viable Tool

The 3D Review project assesses Bible translation quality across three dimensions — translation process, community reception, and church affirmation — in a multi-agency ecosystem with no shared quality standard. It carried board-level attention, a hard field deployment date, and a year of methodology work, question design, agency partnerships, and framework development. What it did not yet have was a path from that knowledge to working software: no app, no proof of concept, no verified architecture, no single canonical source across the documents.

Session 1 (February 19): Live React prototype built during a Zoom call. ESE produced 14 documented tensions before the next session.

Session 2 (March 3): Three successive PoC versions. Canonical source consolidated to two documents. Architecture decisions encoded via oddkit. ESE v3 pre-identified 8 tensions before the team's written review.

Session 3 (March 9): Listening session — no live build. Requirements refined. Transcript converted to a comprehensive build spec. Lovable built the full PWA in approximately one hour.

Session 4 (March 13): Dry run of the Lovable-built PWA. Bugs fixed live. Teryl confirmed: "I feel like we could make it work."

Session 5 (March 23–24, Southeast Asia): Field deployment with Beyond Translation across Sela and Kara languages. Pastor and consultant surveys completed. Community surveys deferred to April 30 due to Easter and Lao New Year. Bottom line from field: "It worked. I think we have a viable tool."

---

## What the Project Was Carrying Before Session 1

Twenty or more documents existed in parallel versions with contradictions and no designated source of truth. Decisions from an Orlando meeting had restructured the Church dimension. None of it was reflected in any tool; it existed only in participant memory.

The team knew what they wanted the system to do. They did not have a shared, verified picture of what had been decided or what remained open. This is the standard first-engagement condition: high domain expertise, low epistemic legibility.

---

## The Live Build Changed the Kind of Meeting That Was Possible

During the February 19 Zoom call, a working prototype appeared while the team was still talking about requirements. This produced something a planning conversation cannot: a concrete artifact to react to.

The mechanism that made this possible: all prior documents — framework drafts, metadata specs, survey instruments — were uploaded as baseline context before the session began. During the call, the live transcript was copy-pasted into the system in real time as the conversation unfolded. The AI was not a tool used between meetings. It was present in the meeting, reading what was being said as it was said, and building against it simultaneously.

The consequence was immediate. Teryl identified a delivery constraint that appeared in no prior document. Steve stated that scoring should not be shown to respondents. A requirement for multi-org report routing surfaced as an afterthought near the end — something Teryl had not thought to write down before seeing the form.

An abstract planning conversation produces intentions. A live artifact produces reactions. Reactions are epistemically richer because they are grounded.

---

## Epistemic Surface Extraction Converted Verbal Feedback into Verifiable Decisions

After Session 1, an Epistemic Surface Extraction (ESE) identified 14 specific tensions between the build and the source documents. A second ESE captured speaker-attributed quotes — not inferred intent — and surfaced 4 requirements that appeared in no prior document.

After Session 2, ESE v3 pre-identified 8 tensions before the team's written review. When feedback arrived, the comparison between what ESE predicted and what the team raised became evidence: ESE caught structural tensions derivable from document comparison; the team caught runtime behavior and UX friction that only live use reveals. The gap between the two is the calibration signal.

The ESE pattern serves one function: converting the ephemeral output of a meeting into a durable, verifiable record before memory degrades.

---

## Session 2 Produced a Single Source of Truth

The March 3 session's most significant output was the consolidation decision: 19+ prior documents were superseded. The canonical source became exactly two files. Before: parallel versions, contradictions, no hierarchy. After: two files, one hierarchy, all derivation explicit.

Architecture decisions locked: puzzle model with role-specific shareable links, self-assessment vs. facilitator mode, no scoring shown to respondents, questions as a swappable data layer, randomized answer options with Other always last, CSV export, print form generation, camera scan ingestion. Each encoded via oddkit before the meeting transcript was no longer fresh.

The conversational AI vision was named and decoupled from the form-based pilot — letting both tracks proceed without confusion about what the Southeast Asia test is actually validating.

---

## Session 3 — Listening Produced a Cleaner Spec Than Building Would Have

The March 9 session had no live build. Klappy listened and gathered. Andy named the value explicitly: "I prefer that you listen and kind of gather all of it, and then the next thing takes into account the whole meeting."

Authentication model finalized: admin-only login, survey links unauthenticated. Multi-language hierarchy confirmed: a regional level containing individual language assessments. Steve stated data normalization requirements. Teryl identified that role labels would not be recognizable in Southeast Asia.

After the session, the transcript became a build spec. Lovable built the full PWA in approximately one hour — not because Lovable is fast, but because three sessions of ESE and encoding had resolved the contradictions that would otherwise have required multiple build-test-feedback cycles.

---

## Session 4 — The Dry Run Confirmed Field Readiness

The March 13 dry run surfaced authentication failures, form persistence bugs, missing conditional logic, unclear check-all instructions, and terminology too technical for translation contexts — none of which ESE had predicted. All were fixed live. Scripture passage media upload was built and tested during the session.

Teryl's close: "I feel like we could make it work."

---

## Session 5 — Southeast Asia Field Deployment

Teryl deployed the tool March 23–24 with Beyond Translation across two languages: Sela (ngt) and Kara (lhu), Matthew through John. MTTs, Quality Checkers, In-Country Trainers, QA Mentors, and one consultant participated. Pastor and consultant surveys were completed. The community pastor for Sela produced encouraging data about use and impact in his congregation.

**What worked:** The tool functioned. Pastor and consultant surveys were completed successfully. Paper forms were used by the teams for village community surveys — the intended workflow for low-tech contexts, designed as Plan A rather than a contingency. Teams used it without hesitation. Teryl's observation on Tuesday confirmed that practice matched what teams had reported in the surveys.

**What the field revealed that prior sessions had not:**

The project/assessment hierarchy did not match the cluster model. Language identity fields appeared at the project level rather than the assessment level — meaning there was no field to specify which language an assessment belonged to. Teryl worked around this by putting language information in the Scripture field.

Translator metadata was too burdensome to collect at survey time. Every translator filled out team formation, education level, and role composition before reaching the actual questions. This held everyone up. Daniel, the director of training at Beyond Translation, independently named this as his number one piece of feedback.

The role taxonomy had no category for "middle roles" — QA Checkers, In-Country Trainers, QA Mentors. Beyond Translation has at least three distinct roles between Translator and Consultant, all of whom contribute to quality and have the capacity to assess it. They were directed to use the Translator questions as the closest fit.

Denominational leader responses apply at the cluster level, not the language level. Teryl instructed leaders to pick one assessment and enter their responses there. The data model does not yet support project-level respondent roles.

**What remains outstanding:** Kara pastor paper form not yet entered digitally. Community surveys deferred to April 30. Paper-to-digital entry required after field teams return. Steve needs to validate CSV export and metadata normalization against actual Southeast Asia data before analysis.

---

## The Reusable Pattern

1. **Build live in the first session** — change what kind of meeting is possible before it ends
2. **Run ESE immediately after each session** — convert verbal output to verifiable record before memory degrades
3. **Encode decisions before context drifts** — lock architecture during or immediately after each session
4. **Consolidate canonical sources early** — one source of truth is a prerequisite for coherent iteration
5. **Name the destination and decouple it from the pilot** — clarify what the near-term test validates
6. **Know when not to build** — a listening session that produces a clean transcript is faster than one that builds before requirements are stable
7. **Convert the clean transcript to a build spec, feed it to an AI code builder** — the spec determines the hour, not the tool
8. **Run ESE before team review, then compare** — the gap between prediction and observation is a calibration signal
9. **Expect the field to surface what sessions cannot** — data model assumptions, role taxonomy gaps, and metadata burden only become visible under actual deployment conditions

---

## Self-Audit

**Intended outcome:** Discoverable canon document encoding the full 3D Review engagement through Southeast Asia field deployment as a reusable pattern.

**Constraints applied:** Writing Canon progressive disclosure (all five tiers, `canon/meta/writing-canon.md`), Definition of Done evidence policy (`canon/constraints/definition-of-done.md`), META-ODD (no canonical closure, contestability required), Author Identity Language (`canon/constraints/author-identity-language.md` — neutral voice, no identity claims for Klappy).

**Sensitivity disclosure:** For the security of field workers and the language communities they serve, the names of specific countries, languages, and individuals have been changed throughout this document. This substitution is disclosed rather than hidden because silent pseudonymization violates the axiom that a claim is a debt.

**Decision rules followed:** Observation before assertion — every claim sourced from session transcripts, ESE documents, dry run record, and Teryl's field notes. Build-spec-to-Lovable timing (~1 hour) reported from builder's account, not independently verified. Field note claims attributed to Teryl's voice memos, transcribed in real time.

**Known tradeoffs:** Community survey data not yet collected. Southeast Asia field outcomes are partial — pastor and consultant dimensions only. Full picture requires April 30 community survey completion and Steve's data validation.

**Remaining risks:** Paper-to-digital entry quality unknown. Role taxonomy gaps identified but not yet resolved. Cluster/language hierarchy fix not yet implemented.

---

## See Also

- `canon/values/axioms.md` — foundational axioms from which this pattern derives
- `canon/constraints/definition-of-done.md` — evidence policy governing this document
- `canon/meta/writing-canon.md` — progressive disclosure requirements applied here
- `docs/oddkit/tools/oddkit_encode.md` — the encode operation used to lock decisions during sessions
