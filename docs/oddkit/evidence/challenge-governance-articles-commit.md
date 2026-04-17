# Gauntlet Evidence — Challenge Governance Articles Commit

**Branch:** `feat/challenge-governance-articles`
**Date:** 2026-04-17
**Scope:** 11 new governance articles under `odd/challenge-types/` and `odd/challenge/`
**Deliverable type:** Canon documents (governance only — no code, no UI, no runtime behavior change)

---

## Definition of Done — Evidence

### 1. Change Description

Eleven governance articles committed to klappy.dev canon, setting up the oddkit_challenge refactor to mirror the PR #96 encode pattern (governance-driven via extraction contract rather than hardcoded source logic).

- 1 meta governance article: `odd/challenge-types/how-to-write-challenge-types.md`
- 4 software-engineering default challenge types: `strong-claim`, `proposal`, `assumption`, `observation` (fallback)
- 3 architectural-writing overlay challenge types: `pattern-coinage`, `comparative-positioning`, `principle-extraction`
- 3 supporting articles: `base-prerequisites`, `normative-vocabulary`, `stakes-calibration`

### 2. Verification Performed

- `oddkit_preflight` surfaced three constraint documents to check against: `canon/constraints/ai-voice-cliches.md`, `canon/constraints/author-identity-language.md`, `canon/constraints/definition-of-done.md`
- AI voice clichés audit via grep against new articles for formulaic transitions, puffing, overclarification, summary clichés, bold-then-explain, and em-dash clustering
- Em-dash density compared against precedent `odd/encoding-types/how-to-write-encoding-types.md`
- Author identity language audit (no identity claims about Klappy in any article)
- `derives_from` path audit — every referenced path checked against repo filesystem
- Writing Canon checklist (8 tests) applied per-article: title test, blockquote test, metadata test, summary test, header scan test, no buried claims, axiom space test, ghost writer test
- Header scan output reviewed for each representative article

### 3. Observed Behavior

- AI voice clichés audit: zero hits on formulaic transitions, puffing, overclarification, summary clichés, bold-then-explain
- Em-dash density: new articles average 0.04–0.16 per line; precedent meta averages 0.11 per line — same neighborhood, no ticced clustering
- All 11 articles contain the required `## Summary — [subtitle]` section after the blockquote
- Header scan confirmed headers tell each document's story in sequence (no "Background / Discussion / Conclusion" generic forms)
- `derives_from` paths: all verified against repo except one caught error — `canon/epistemic-modes.md` corrected to `canon/definitions/epistemic-modes.md` in `stakes-calibration.md`

### 4. Evidence Produced

This file. Plus the git diff (11 new files under `odd/challenge-types/` and `odd/challenge/`). Plus the session journal at `/home/claude/session-journal-challenge-refactor.md` capturing the full DOLCHE derivation: 1 Decision, 4 Learnings, 1 Constraint, 1 Handoff.

Visual proof: **N/A — no UI/interaction/layout change.** These are canon governance documents rendered by existing klappy.dev article templates (same as `odd/encoding-types/*` articles already in production). No new rendering path, no new visible state.

### 5. Self-Audit Completed

- **Intended outcome:** klappy.dev canon contains a complete governance set that the future `workers/src/orchestrate.ts` refactor can extract against — governance articles first, code refactor second, matching PR #96 order.
- **Constraints applied:** Writing Canon (progressive disclosure, summary sections, descriptive headers), AI voice clichés (no clustering of AI tells), author identity language (no translator claims about Klappy), definition-of-done (this file), frontmatter schema (booleans/integers/dates unquoted, strings with special chars quoted).
- **Decision rules followed:** mirror the PR #96 encode pattern; ship software-engineering defaults labeled honestly; use base-plus-overlay for prerequisites; multi-match semantics by design; governance before code.
- **Tradeoffs:** the defaults are software-flavored on purpose (alternative was "generic human-language defaults" that would serve every domain badly); both software and writing modes coexist in single supporting articles (alternative was separate canons per mode — heavier, not yet justified); no `## Summary` was originally drafted — caught by Writing Canon gate and remediated before commit.
- **Remaining risks:** detection-pattern overlap between new architectural-writing types and existing software types may produce noisier multi-matches until stakes-calibration trims by mode; `Priority` field semantics in Type Identity are under-specified for display ordering (flagged in session journal); no integration test against the live challenge tool yet — that comes with the workers/src/orchestrate.ts refactor.

---

## Writing Canon Gate — Per-Article Results

| Article | Title test | Blockquote test | Summary section | Header scan |
|---|---|---|---|---|
| how-to-write-challenge-types.md | ✓ | ✓ | ✓ | ✓ |
| strong-claim.md | ✓ | ✓ | ✓ | ✓ |
| proposal.md | ✓ | ✓ | ✓ | ✓ |
| assumption.md | ✓ | ✓ | ✓ | ✓ |
| observation.md | ✓ | ✓ | ✓ | ✓ |
| pattern-coinage.md | ✓ | ✓ | ✓ | ✓ |
| comparative-positioning.md | ✓ | ✓ | ✓ | ✓ |
| principle-extraction.md | ✓ | ✓ | ✓ | ✓ |
| base-prerequisites.md | ✓ | ✓ | ✓ | ✓ |
| normative-vocabulary.md | ✓ | ✓ | ✓ | ✓ |
| stakes-calibration.md | ✓ | ✓ | ✓ | ✓ |

---

## OLDC+H — Session Capture Reference

Full DOLCHE capture at `session-journal-challenge-refactor.md`. Summary:

- **D** — challenge-refactor-full-governance-drafted: commit 11 articles mirroring PR #96 encode pattern
- **L** — framework-agnostic-defaults-are-not: the extraction contract is domain-agnostic but default articles are not, and labeling them honestly serves every domain better than pretending they are neutral
- **L** — voice-dump-mode-is-a-feature: suppressing challenge in voice-dump mode preserves raw thought flow
- **L** — tim-complaint-surfaces-architectural-insight: software-verbiage complaint was a structural signal that the framework needed domain-adaptation as a first-class capability
- **L** — klappy-two-modes-same-kb: operator mode and architectural-writing mode coexist in klappy.dev canon via multi-match and shared supporting articles
- **C** — voice-dump-suppression-invariant: the tool must not interfere with raw thought capture
- **H** — challenge-refactor-code-next: implement extraction contract in `workers/src/orchestrate.ts` mirroring PR #96 after this commit merges

---

## Version Tracking

- Branch: `feat/challenge-governance-articles`
- Post-merge: ledger entry capturing E0008 challenge-governance milestone
- Related PRs: depends-on conceptually from PR #96 (governance-driven encode); precedes future PR for `workers/src/orchestrate.ts` challenge refactor
