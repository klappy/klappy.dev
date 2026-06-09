---
uri: klappy://odd/ledger/2026-05-05-biblical-roots-appendix-slug-alignment
kind: odd
title: "Biblical Roots Appendix Slug Alignment — Closing One Audit-Job-#36 Finding by Aligning the Forward-Ref to the Draft's Declared URI"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "ledger", "session", "epoch-8.5", "audit-job-36", "link-rot", "forward-ref", "auto-heal", "writings", "book"]
epoch: E0008.5
date: 2026-05-05
describes_state_at: "klappy/klappy.dev@09dce85 (main, post-PR-#174)"
derives_from: "docs/oddkit/specs/oddkit-audit.md, docs/planning/link-rot-elimination-campaign.md, canon/methods/reference-integrity-audit.md"
complements: "odd/ledger/2026-04-27-link-rot-phase-2-shipped.md"
governs: "Closeout for klappy/klappy.dev PR #174. Records what canon-quality job #36 actually surfaced after stale findings were filtered out, why one allowlisted forward-ref still required a fix, and the slug-alignment pattern that makes audit-allow's auto-heal promise true rather than aspirational."
status: active
---

# Biblical Roots Appendix Slug Alignment

> Canon-quality audit job #36 reported eight findings in `writings/`. Five were already resolved in current main and reflected the audit's lag, not present state. Of the three remaining — all allowlisted forward-refs to drafted-but-unpromoted book chapters — two (Ch.7 four-questions) were structurally correct and need no action: the inline link's `klappy://writings/four-questions-that-change-everything` slug matches the draft's declared frontmatter URI exactly, so the existing `audit-allow` directive's "auto-heals on promote" promise is real. The third (Appendix A biblical-roots) had a slug mismatch: the link said `klappy://draft-zeros/appendix-a-the-biblical-roots`, but the draft declared its URI as `klappy://writings/the-biblical-roots`. Promotion of the draft would not have closed the finding. PR #174 aligns four reference points in `the-broken-wall-and-the-buried-talent.md` (related uri, complements path, inline link, allowlist comment reason) to the draft's declared target so the auto-heal contract holds.

---

## Summary — What This Session Closed

Three things landed:

1. **One mechanical fix shipped to main.** PR #174 squash-merged at `09dce85` on `klappy/klappy.dev`. Single file, four edits, all rewriting `klappy://draft-zeros/appendix-a-the-biblical-roots` to `klappy://writings/the-biblical-roots` in `writings/the-broken-wall-and-the-buried-talent.md`.
2. **Stale-audit-report observation recorded.** Five of audit job #36's eight findings were already closed in current main before this session began. The report Claude was given reflected an earlier CI run, not present state. Verifying findings against current HEAD before executing on them is now the documented step zero for any audit-driven sweep.
3. **Slug-alignment pattern named.** The forward-ref `audit-allow` directive carries an implicit promise — that promotion of the draft auto-heals the dead reference. That promise is true if and only if the inline link's `klappy://` slug matches the draft's declared frontmatter URI exactly. Filesystem path agreement is insufficient. The pattern is now legible enough to apply to future forward-refs without rediscovery.

---

## Observations

- **Audit job #36 listed 8 findings; only 3 were still present in current main.** The closed five: rename `klappy://writings/nothing-new-even-ai` → `klappy://writings/preface-nothing-new-even-ai` in `agentic-software-development.md`, plus four `/page/...` → `klappy://...` conversions in `getting-started-with-odd-and-oddkit.md`. All five had landed before the session opened.
- **Both forward-ref drafts exist in `draft-zeros/`.** `draft-zeros/ch07-four-questions-that-change-everything.md` and `draft-zeros/appendix-a-the-biblical-roots.md` are real files. They are not "links to nothing"; they are deliberately allowlisted forward-refs to chapters of *Nothing New, Even AI* that have not yet promoted to `writings/`.
- **The allowlist directives are present and correctly formatted.** Each inline link is preceded by `<!-- audit-allow: dead-reference reason="..." -->` matching the syntax in `docs/oddkit/specs/oddkit-audit.md` (line 120 references the same directive form).
- **Slug-alignment audit:** the Ch.7 inline link slug (`klappy://writings/four-questions-that-change-everything`) matches `draft-zeros/ch07-four-questions-that-change-everything.md`'s declared `uri:` exactly. The Appendix A inline link slug (`klappy://draft-zeros/appendix-a-the-biblical-roots`) did NOT match `draft-zeros/appendix-a-the-biblical-roots.md`'s declared `uri: klappy://writings/the-biblical-roots`.
- **Frontmatter consistency requirement:** the appendix forward-ref appeared in three places in the file — `related:` URI, `complements:` filesystem path, and the closing inline teaser link — plus an allowlist comment. All four were rewritten in the same PR for internal consistency.

---

## Learnings

- **Operator directives can rest on the model's own incomplete framing.** Initial characterization of the dead refs as "no matching slug in canon" was technically accurate at the URI but missed that the targets exist as deliberately allowlisted forward-refs in `draft-zeros/`. The operator's "Remove dead links to nothing" was a clean response to the framing they were given. New evidence (drafts exist, allowlists in place, slug mismatch on appendix) genuinely changed the picture and justified a named reversion to planning rather than executing on the bad premise.
- **Audit reports embedded in operator context can be stale.** A canon-quality CI report references a specific commit; current main may have moved past it. Always verify findings against the working tree before executing. This adds at most one grep per finding and protects against multi-step work undoing already-shipped fixes.
- **Forward-ref auto-heal pattern.** When an inline link points at a draft that has not yet promoted, three conditions must hold for the `audit-allow` directive's "auto-heals on promote" promise to be true: (a) the draft exists; (b) the draft's frontmatter declares the URI the inline link uses; (c) the surrounding `related:`, `complements:`, and any cross-references in the same file all point at the same target. Missing (b) means promotion creates the wrong URI; missing (c) means the file is internally inconsistent and the reading graph is broken even after promotion.
- **`complements:` semantics.** Per `canon/methods/reference-integrity-audit.md`, `complements:` asserts that a sibling file exists. For a forward-ref, pointing it at the future home means the assertion is false today and true after promotion. Updating it together with `related:` keeps the file's intent coherent across the promotion boundary; leaving it pointed at `draft-zeros/` would make the file's two graph fields contradict each other.

---

## Decisions

- **D1: Treat stale-audit-vs-current-HEAD discovery as in-execution observation, not gate failure.** The locked scope was "close audit findings"; discovering five were already closed narrowed the scope rather than invalidating it. Continued with the still-relevant three.
- **D2: Revert from execution to planning when the dead-ref characterization proved incomplete.** The drafts existed; the inline links were allowlisted; removal would have destroyed curated reading-graph structure for content the operator had drafted. Named the reversion explicitly with the new evidence and a single question presenting three dispositions.
- **D3: Per operator option B, fix only the appendix slug; leave Ch.7 refs untouched.** The Ch.7 link slugs already matched their drafts' declared URIs and would auto-heal cleanly on promotion. No edit needed.
- **D4: Update all four reference points in the appendix file.** `related:` URI, `complements:` path, inline link, and allowlist comment reason text — all rewritten in the same PR so the file is internally consistent and the auto-heal promise is structurally sound.
- **D5: Ship as a single-file PR, no validator dispatch.** Docs-only change, no load-bearing code surface, no governance text touched. Same-session validation acceptable per `klappy://canon/constraints/release-validation-gate` scope rules.

---

## Constraints Satisfied

- **`klappy://canon/meta/writing-canon`** — no new prose; only link-target and structural-frontmatter edits in an existing essay. Voice and structure of the essay unchanged.
- **`klappy://canon/constraints/release-validation-gate`** — change is docs-only, four lines, no load-bearing surface; same-session validation acceptable per scope.
- **`klappy://docs/planning/link-rot-elimination-campaign`** — closes one of the slug-mismatch contributors to the broken-link bug class; complements rather than supersedes existing campaign artifacts.

---

## Handoffs

- **Open:** `main` → `prod` promotion PR not yet opened. Left to operator cadence; they may batch promotions across multiple recently-merged main commits.
- **Open:** When `draft-zeros/appendix-a-the-biblical-roots.md` promotes to `writings/the-biblical-roots.md`, the audit finding for this URI auto-closes. No additional action required at promotion time for this specific finding.
- **Future:** The slug-alignment pattern (link slug must match draft's declared URI, not draft's filesystem path) is a candidate for promotion to a tier-2 principle if it is rediscovered in a later session. Not promoted now — one observation is not yet a pattern under the canon promotion rules.
- **Adjacent (no carry):** Phase 2 encode vodka refactor sweep on `klappy/oddkit` is unchanged by this session; this work was on `klappy/klappy.dev`.

---

## Evidence

- **PR #174:** https://github.com/klappy/klappy.dev/pull/174 — opened, reviewed, merged in this session
- **Merge SHA on main:** `09dce85305182ca29c4369a32a1f65a92ed9641b`
- **Reference integrity audit on PR head:** `success`
- **Cursor Bugbot on PR head:** `success` (no issues found, 2m 22s detection)
- **Files touched:** `writings/the-broken-wall-and-the-buried-talent.md` (+4/-4)
- **Files audited but unchanged:** `writings/choosing-faith-not-fear.md`, `writings/the-voice-came-first.md` — both already correctly aligned for auto-heal
