---
uri: klappy://odd/challenge/stakes-calibration
title: "Challenge Stakes Calibration"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "stakes-calibration", "proportional-pressure", "epistemic-modes"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/definitions/epistemic-modes.md, canon/constraints/epistemic-challenge.md, canon/principles/irreversibility-is-the-real-cost.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge mode-to-depth mapping — which question tiers, prerequisite strictness, and reframings surface for a given caller mode"
status: active
---

# Challenge Stakes Calibration

> Proportional pressure is a canon commitment. A voice-dump deserves different treatment than a published essay. A one-line experiment deserves different treatment than an irreversible production deploy. This article defines the mapping from epistemic mode to challenge depth — which question tiers surface, how strict prerequisite checking is, and how many reframings are offered. The `mode` parameter on oddkit_challenge reads this table to filter output.

---

## Summary — Nine Modes Across Two Lifecycles, With Voice-Dump As Suppression Invariant

This article governs how the `mode` parameter on oddkit_challenge filters output. Nine modes coexist: software-engineering modes (`exploration`, `planning`, `execution`) from canon epistemic-modes, and architectural-writing modes (`voice-dump`, `drafting`, `peer-review-ready`, `canon-tier-2`, `canon-tier-1`, `published-essay`) from the klappy.dev writing lifecycle. Each mode names which question tiers to surface (baseline, elevated, rigorous), how strict prerequisite checking is (optional, required, required-plus-source-named), and whether reframings surface (none, first one, all, all-plus-block-until-addressed). Voice-dump mode suppresses all challenge output as a structural invariant — some modes exist for getting thoughts out of the head, and pressure-testing at that stage damages the mode. Default is `planning` when no mode is supplied. If this article is absent, the server surfaces everything at every mode — challenge without calibration is still challenge, just uniformly loud.

---

## Stakes Calibration

| Mode | Question tiers surfaced | Prerequisite strictness | Reframings surfaced |
|---|---|---|---|
| exploration | baseline | optional (warn only) | first 1 |
| planning | baseline, elevated | required (gap messages) | all |
| execution | baseline, elevated, rigorous | required plus source-named | all, plus block-until-addressed |
| voice-dump | none (suppress all challenge) | optional (warn only) | none |
| drafting | baseline | optional (warn only) | first 1 |
| peer-review-ready | baseline, elevated | required (gap messages) | all |
| canon-tier-2 | baseline, elevated | required (gap messages) | all |
| canon-tier-1 | baseline, elevated, rigorous | required plus source-named | all |
| published-essay | baseline, elevated, rigorous | required plus source-named | all, plus block-until-addressed |

---

## Mode Families

### Software Engineering Modes (canon epistemic-modes)

- **exploration** — widening the space of ideas. Heavy challenge here kills good ideas before they mature.
- **planning** — narrowing to a path. This is where tradeoffs get examined.
- **execution** — committing. The cost of being wrong is highest; scrutiny is highest.

### Architectural Writing Modes (klappy.dev writing lifecycle)

- **voice-dump** — raw thinking, transcribed. Challenge here is counterproductive; suppress and let thought flow.
- **drafting** — shaping a voice-dump into an argument. Light challenge only.
- **peer-review-ready** — the draft is leaving the author's head and entering review. Baseline and elevated checks apply.
- **canon-tier-2** — content is being added to canon but not as a load-bearing foundation. Same treatment as peer-review-ready.
- **canon-tier-1** — content will be load-bearing for future work. Rigorous treatment including source-named strictness.
- **published-essay** — the work is going to an external audience, including hostile readers. Maximum scrutiny, including reframings as block-until-addressed so the author explicitly chooses to publish despite any open gaps.

---

## Tier Vocabulary

This table uses three tiers: `baseline`, `elevated`, `rigorous`. Challenge-type articles assign each question to a tier in their `## Challenge Questions` table. Tier names are coordinated across this article and every type article — if this article changes the tier names, type articles must follow.

The mode `voice-dump` surfaces `none` — the tool suppresses all challenge questions regardless of which types matched. This is a feature: some modes are for getting thoughts out of the head, and pressure-testing at that stage damages the very function of the mode.

---

## Strictness Modes

- **optional (warn only):** Missing prerequisites produce advisory notes; the challenge does not flag them as blocking.
- **required (gap messages):** Missing prerequisites produce explicit gap messages in the response.
- **required plus source-named:** All required gaps surface, plus the `source-named` check is escalated from advisory to blocking. When stakes are high, sources matter.

---

## Reframing Surfacing

- **none:** No reframings surface. Used for voice-dump mode.
- **first 1:** Only the first reframing from each matched type is surfaced. Keeps exploration and drafting unhurried.
- **all:** All reframings from all matched types surface, deduped.
- **all, plus block-until-addressed:** All reframings surface, and the response includes a posture marker indicating the claim should not proceed until reframings are addressed or explicitly declined.

---

## Default Behavior

When the `mode` parameter is not provided, the server defaults to `planning` with a low-confidence marker. This matches existing behavior and keeps calibration safe-by-default: neither too loose (exploration) nor too strict (execution) when the caller hasn't said which mode they're in.

If this article is absent entirely, the server surfaces every question at every mode, runs prerequisites as advisory, and surfaces all reframings. Challenge without calibration is still challenge — it is just uniformly loud.

---

## Notes

The software-engineering modes and the architectural-writing modes coexist in one table because klappy.dev canon supports both kinds of work. A KB with a single-domain workflow can prune to its own set.

A KB whose workflow uses different lifecycle stages (`ideation / design / build / ship` for product development; `note-taking / drafting / teaching-material` for thought leadership from books; `drafting / community-check / consultant-check / publication` for Bible translation) can rename modes here — the server treats mode names as strings matched against the `mode` parameter.
