---
uri: klappy://canon/observations/encode-dedup-by-letter-drops-open-quality-criteria
title: "Observation — `discoverEncodingTypes` Dedupes by Letter Alone, Silently Drops Open's Quality Criteria"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "observations", "encode", "oddkit", "open", "facet", "dedup-bug", "quality-criteria", "production-bug", "audit-2026-04-30", "epoch-8.4", "phase-2-blocker"]
epoch: E0008.4
date: 2026-04-30
describes_state_at: "klappy/oddkit@1a1f093 (main, 2026-04-29) — bug observed via live oddkit_encode call against production worker on 2026-04-30 after PR #157 merged Open's enriched canon"
derives_from: "canon/principles/code-claims-require-code-observation.md, docs/architecture/encode-current-state-2026-04-30.md, odd/encoding-types/observation.md, odd/encoding-types/open.md"
complements: "odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised.md, odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed.md"
governs: "Documents a verified production bug in `workers/src/orchestrate.ts:discoverEncodingTypes` (line 512) where dedup-by-letter silently drops Open's quality criteria when both Observation and Open register letter `O`. Searchable as a standalone observation so future sessions find it without needing to read the Phase 2 handoff first."
status: active
---

# Observation — `discoverEncodingTypes` Dedupes by Letter Alone

> Production bug verified by direct code observation and live tool call on 2026-04-30. `workers/src/orchestrate.ts:discoverEncodingTypes` (line 512) keeps the first encoding-type article per letter, so when `observation.md` and `open.md` both register letter `O`, alphabetical iteration keeps Observation's quality criteria (4) and silently drops Open's (5). Open is registered in name only; its facet survives the parser, but its quality scoring rubric does not. Fix is queued in the revised Phase 2 handoff (Item 2). This observation is standalone-searchable so future sessions catch it even without reading the handoff.

---

## Summary — What's Wrong, How to Verify, What Breaks

**The bug:** `discoverEncodingTypes` reads all canon articles tagged `encoding-type` and produces a registry keyed by letter. The dedup pass at line 512 keeps the first article per letter, with iteration order being alphabetical-by-path. Because `odd/encoding-types/observation.md` sorts before `odd/encoding-types/open.md`, Observation wins the `O` slot. Open's `qualityCriteria` array is silently discarded. The parser still recognizes the `[O-open]` prefix tag (facet handling lives elsewhere), and the artifact still emits with `facet: "open"`, but the scoring step looks up criteria by letter alone — which means Open artifacts are scored against Observation's four criteria, not Open's five.

**Verification path (reproducible):** Call `oddkit_encode` with input `[O-open P1] <any 10+ word body>`. The returned artifact carries `facet: "open"` and `priority_band: "P1"` correctly. Inspect `quality.maxScore`. If the bug is still live, it returns `4` — Observation's max. If the fix has shipped, it returns `5` — Open's max (Substance, Priority assigned, Closure path, Specificity, Owner clarity).

**What this breaks:** Open artifacts get adequate quality scores too easily. Observation's criteria don't include "Priority assigned" or "Closure path" — the two criteria that distinguish a properly-recorded Open from a vague one. Operators using encode for Open items aren't getting the gap messages that would push them to add priority bands and closure paths. Net effect: Opens are recorded but recorded loosely, defeating the purpose of the seventh letter.

---

## Why This Wasn't Caught Earlier

The bug landed when `open.md` was added to canon in PR #157 (E0008.4 Phase 1, merged 2026-04-30T05:08:53Z). Before PR #157, `open.md` either didn't exist or didn't register letter `O`, so the dedup logic never had to decide. The Phase 1 PR's canon migration didn't touch `discoverEncodingTypes`, and its closeout ledger didn't probe Open's quality scoring against expected output. The Audit 2026-04-30 (run within the hour after Phase 1 merged) caught it via direct tool call as part of inventorying actual code state vs. claimed code state.

This is a worked example of why the `code-claims-require-code-observation` principle matters: the closeout ledger for Phase 1 claimed Open had been "enriched in place" and was now part of the registry. That claim was true at the canon layer and false at the runtime layer. Only direct observation surfaced the gap.

---

## Where the Fix Lives

`klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised` Item 2:

> **Fix:** Dedup by `(letter, facet)` pair. Read `facet` from frontmatter on each encoding-type article. Keep Observation as `(O, undefined)` or `(O, "closed")`; keep Open as `(O, "open")`. Scorer selects criteria by full pair, matching the `facet` field set by the prefix parser on each parsed artifact.
>
> **Acceptance:** Same `oddkit_encode` call with `[O-open P1]` input now returns `maxScore: 5` and applies Open's five criteria. Observation calls (`[O]` prefix or unstructured) continue to apply Observation's four. Regression test added against the canon URIs that surfaced the bug.

Phase 2 PR target: oddkit 0.28.0. Full release-validation-gate applies.

---

## What Other Bugs This Pattern Could Hide

The dedup-by-single-key pattern almost certainly recurs elsewhere in the codebase. Worth spot-checking during Phase 2:

- Any registry built by `entries.filter(...).reduce(...)` keyed on a single field where a tag-pair or pair-key is the actual identity.
- Any `Map(types.map(t => [t.letter, t.name]))` pattern in the parsers — same shape, same trap.
- Any future encoding type that legitimately needs to share a letter with another type (the DOLCHEO design admits one such collision, Observation/Open; future types should follow the same `facet` pattern).

If Phase 2 surfaces a second instance of the same bug shape, that's evidence for graduating the pattern to a tier-2 constraint (`klappy://canon/constraints/registry-keys-must-include-disambiguating-facets` or similar).

---

## See Also

- [Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation) — the principle that surfaced this bug
- [Encode Current State (2026-04-30)](klappy://docs/architecture/encode-current-state-2026-04-30) — what the worker actually does today
- [Phase 2 Revised Handoff](klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised) — where the fix is scoped (Item 2)
- [Audit 2026-04-30 Cleanup Ledger](klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed) — the audit closeout
- [Encoding Type: Open](klappy://odd/encoding-types/open) — the type whose criteria are being dropped
- [Encoding Type: Observation](klappy://odd/encoding-types/observation) — the type whose criteria are being substituted
