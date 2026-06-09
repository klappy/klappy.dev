---
uri: klappy://odd/handoffs/2026-05-10-survey-governance-wiring
kind: odd
title: "Handoff — Survey Method Governance Wiring (PR #192 continuation)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "handoff", "session", "pr-192", "quality-attribute-tension-survey", "governance-wiring", "survey-method", "runtime-contract", "persona-shaped"]
date: 2026-05-10
derives_from: "canon/methods/quality-attribute-tension-survey.md, odd/ledger/2026-05-10-software-virtues-canon-package.md"
governs: "Continuation of PR #192 (canon/software-virtues-tension-matrix). The next session's lane is wiring the quality-attribute-tension-survey method to oddkit's existing governance machinery (preflight, gate, challenge, validate, encode) following the persona-shaped / runtime-contract pattern landed in PR #187. The next session must read canon merged in PRs #179, #180, #186, #187 before editing the method doc."
status: closed
---

> **Lane is narrow.** Wire the existing survey method to oddkit governance machinery using the runtime-contract pattern from PR #187. Do not add new product surfaces. Do not draft Oddie content — Oddie already exists in canon. Do not reframe the seven phases or the dual-state radar. Both are locked and stakeholder-validated.

## Why this handoff exists

The prior session shipped the canon package on PR #192 (vocabulary, principle, matrix, observability extension, essay, method doc with seven phases and dual-state tension-opposite radar). The radar was stakeholder-validated by Ian Lindsley with "this is perfect." Then the prior session drifted off-lane and started drafting an "Oddie system prompt" without consulting canon — discovering only after operator correction that Oddie already exists in canon (PRs #179, #180) with voice, brand, activation rule, and methodology-personification pattern. The off-lane draft at `/mnt/user-data/outputs/oddie-system-prompt-v0.md` is **withdrawn** and should be ignored.

The actual lane the prior session was supposed to occupy is **survey governance** — making the method doc *governance-driven* by wiring its phases to oddkit's preflight/gate/challenge/validate/encode actions, following the runtime-contract pattern PR #187 landed.

## Current PR #192 state

- **Branch:** `canon/software-virtues-tension-matrix`
- **Head:** `645d0b7` (pushed, on origin)
- **Mergeable:** True (last checked at 21:43Z), Bugbot `in_progress`, reference-integrity `in_progress`
- **Files in PR:** 8 — vocabulary, principle, matrix, observability extension, encoding-type cross-ref, essay, method doc, session ledger

The method doc (`canon/methods/quality-attribute-tension-survey.md`, ~378 lines) is the file the next session will edit. It currently describes the seven phases conceptually but does NOT wire them to oddkit governance. Everything else in the PR is settled.

## Required reading BEFORE editing

The prior session was working off a five-PR-stale view of canon. Do not skip this step; the lane depends on understanding what's already there.

| PR | Status | What it landed |
|---|---|---|
| **#187** | merged 2026-05-10 | Runtime method docs: persona-shaped + runtime-contract pattern. **This is the template to follow.** |
| **#186** | merged 2026-05-10 | Session-per-mode discipline + Resolution as **fifth mode** (canon now has five modes, not three) |
| **#180** | merged 2026-05-08 | Oddie voice canon wired into model operating contract — activation rule + brand guidelines |
| **#179** | merged 2026-05-08 | Oddie the river guide — voice canon, methodology-personification, critic-cannot-be-author |
| **#189** | OPEN | agents-need-their-own-wire (Tier-1) + mode-separated-conversations five-mode patch |
| **#188** | OPEN | rename audit-gates Tier-1 → spawned-agent-sessions + substrate-options method |
| **#190** | OPEN | Sweep DOLCHEO+H residue from active surfaces (P0009 enforcement) |
| **#193** | OPEN | journal: runtime canon merged provisionally |

**Action:** before any edit, run `oddkit_search` for: `"runtime contract"`, `"persona-shaped method"`, `"governance wiring"`, `"five modes"`, `"session-per-mode"`. Then `oddkit_get` on every URI returned. Then run `oddkit_preflight` with input `"wire quality-attribute-tension-survey method to oddkit governance machinery following PR #187 runtime-contract pattern"` to load the actual constraints and DoD.

If any of the four open PRs above merges before you start, rebase `canon/software-virtues-tension-matrix` on `main` first. PR #190 is most likely to surface conflicts in the ledger if any DOLCHEO+H residue slipped in.

## Concrete next steps

1. **Read canon above.** Especially PR #187's runtime-contract / persona-shaped docs. Note exact section structure used.
2. **Open `canon/methods/quality-attribute-tension-survey.md`.**
3. **Add a "Runtime Contract" section** near the top (after `## Summary`) following the #187 shape. Names the actions the survey uses: `oddkit_preflight` (entry), `oddkit_gate` (phase transitions), `oddkit_challenge` (Phase 4), `oddkit_validate` (completion), `oddkit_encode` (Phase 5 output).
4. **For each of Phases 0–6**, add a `**Governance.**` line stating which oddkit action governs phase entry, transition, and exit. Pattern from #187 will show the exact wording shape.
5. **Update ledger** (`odd/ledger/2026-05-10-software-virtues-canon-package.md`) with the new decisions, observations, and learnings from this wiring pass. Maintain DOLCHEO format. Do NOT write `DOLCHEO+H` — H is already in the acronym (P0009 anti-pattern).
6. **Commit** as `canon: wire survey method to oddkit governance machinery (runtime-contract pattern per #187)`.
7. **Push** to the same branch. Watch for Bugbot + reference-integrity audit to land `completed`.
8. **Update this handoff** with `status: closed` and a one-paragraph closeout when the wiring lands.

## Do not

- **Do not draft Oddie content.** Oddie already exists in canon (PR #179, #180). Reference existing voice canon if needed; do not generate new persona/posture/prompt material.
- **Do not reframe the seven phases or the dual-state survey directive.** Stakeholder-validated; locked.
- **Do not change the radar SVG, axis ordering, or two-polygon convention.** Tension-opposite ordering with Desired-solid / Current-dashed is locked.
- **Do not bundle `oddkit_tensions(...)` action work** into this PR. That's separate, in `klappy/oddkit` repo (banked as O-open P7 in the ledger).
- **Do not introduce three-mode language anywhere.** Canon now has five modes per #186 (including Resolution). The method's phase descriptions should align with five-mode canon, not the three-mode mental model the prior session was operating in.
- **Do not invent new encoding types.** Phase 5 produces Constraints, Observations, Opens — three of the seven DOLCHEO letters. Do not add a "Survey" encoding type or similar.

## Banked / out of scope for this PR

These are real items but they belong on different lanes. Do not pull them in:

- **P5** — Standalone "personality test" article for non-technical audiences. Operator's verbatim framing to Ian Lindsley is preserved in the ledger as voice source. Future PR, future session.
- **P6** — Oddie pack design. **Superseded** — Oddie already exists in canon. Whatever further Oddie product work happens references the existing canon, not new drafts.
- **P7** — `oddkit_tensions(...)` action in `klappy/oddkit`. Separate repo, separate PR.
- **P11** — `oddkit_gate` mechanical enforcement of release-validation-gate. Open from prior work; not part of this lane.

## Verified environment state

- Working copy: `/home/claude/work/klappy.dev` on `canon/software-virtues-tension-matrix` at `645d0b7`, pushed to origin.
- Staging mirror: `/home/claude/work/canon-package/` (older snapshot, ignore in favor of working copy).
- PR helper scripts: `/home/claude/work/open_pr.py`, `/home/claude/work/check_pr.py` — use `python3` + `urllib.request` per project memory (curl unreliable in this container).
- Fresh sessions need to re-clone both repos to working dirs.

## DOLCHEO of the off-lane drift (for the record)

**[D]** Prior session withdrew the off-lane Oddie system-prompt draft on operator correction; lane reset to survey governance.

**[L]** "Search Canon Before Asking Anything" is a hard rule, not a soft preference. The prior session drafted Oddie persona content without `oddkit_search` first; Oddie already had voice canon, brand guidelines, and a methodology-personification pattern in canon. Result was scope creep + lane violation + wasted operator attention.

**[C]** Next session reads required canon BEFORE editing the method doc. Non-negotiable.

**[H]** This handoff. Lane: survey governance wiring per #187 runtime-contract pattern. Scope: method doc + ledger update on existing PR #192 branch.

---

## Closeout — 2026-05-10T22:00Z

Lane closed cleanly. Branch `canon/software-virtues-tension-matrix` rebased on `main` to pull in PR #187's runtime-contract canon (no file overlap). The method doc at `canon/methods/quality-attribute-tension-survey.md` now carries a `## Runtime Contract — How oddkit Governs the Survey` section between `## Summary` and `## When to Run the Survey`, plus a `**Governance.**` final bullet on each of Phases 0 through 6. Five oddkit actions wired to the seven phases: `oddkit_preflight` (entry), `oddkit_gate` (every phase boundary), `oddkit_challenge` (Phase 4), `oddkit_encode` (Phase 5), `oddkit_validate` (completion). Ledger amended with a "Governance-Wiring Pass (Continuation)" section capturing D10–D11, O9–O10, L5, C4, H4, and E3. No new opens; banked items (P5, P6, P7, P11) untouched. The four Do-Not boundaries (no Oddie content, no phase reframing, no radar changes, no `oddkit_tensions(...)` work) held throughout.
