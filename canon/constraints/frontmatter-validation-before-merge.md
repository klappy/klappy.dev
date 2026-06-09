---
uri: klappy://canon/constraints/frontmatter-validation-before-merge
title: "Frontmatter Validation Before Merge — No Exceptions"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraints", "frontmatter", "validation", "writings", "renderer", "quality-gate"]
epoch: E0007
date: 2026-04-09
derives_from: "canon/meta/frontmatter-schema.md, canon/values/axioms.md"
complements: "canon/meta/writing-canon.md, canon/constraints/definition-of-done.md"
governs: "All PRs that add or modify files in writings/, canon/, odd/, or docs/"
target_repo: "oddkit"
---

# Frontmatter Validation Before Merge — No Exceptions

> Broken frontmatter crashes the site renderer. This has happened repeatedly — the only signal is a blank page in production. No writing PR merges without automated frontmatter validation against the schema and working essays. This is not advice. It is a gate.

---

## Summary — Broken Frontmatter Is a Renderer Crash Waiting to Happen

The klappy.dev renderer expects specific frontmatter fields with specific types. When frontmatter is malformed — wrong types, missing required fields, contradictory flags — the page renders blank or crashes. The author's only signal is a broken preview site.

This constraint mandates that every PR touching `writings/` undergoes frontmatter validation before merge. The validation compares the file's frontmatter field-by-field against `canon/meta/frontmatter-schema.md` and at least two working essays with `public: true`.

---

## The Rule

Before pushing ANY file to `writings/` or creating ANY PR that includes writings:

1. Fetch `canon/meta/frontmatter-schema.md` via oddkit
2. Compare frontmatter field-by-field against the schema's required fields for the document's audience and type
3. Compare against at least 2 working published essays (`public: true`)
4. Verify no contradictory flags (e.g., `public: false` + `exposure: public`)
5. Fix ALL deviations before pushing

If the authoring agent is uncertain about any field, it MUST spin up a Managed Agent validation pass rather than guess.

---

## Known Crash Patterns

These specific combinations have caused renderer crashes in production:

| Pattern | Why it crashes |
|---------|---------------|
| `public: false` + `exposure: public` | Renderer builds a route but has no content to serve |
| Missing `slug` on essay/article type | Renderer cannot generate page URL |
| Missing `type` on public documents | Renderer cannot select template |
| Quoted booleans (`"true"` instead of `true`) | YAML parses as string, renderer expects boolean |
| Missing `hook` or `description` | Social card generation fails silently |
| Missing `public` field entirely | Essay is treated as unpublished — it merges, CI is green, and it is silently absent from the homepage |
| `exposure: nav` + missing `type` / `slug` / `public` | The silent-drop bug. Passed the OLD gate (which only checked `exposure: public`), then never surfaced anywhere |

---

## Automation

This constraint is implemented as a CI gate. The implementation is:

- **Validator**: `scripts/validate-frontmatter.py` (lives in this repo).
  Mirrors the schema's enums and required-field rules. Single-file Python,
  PyYAML, no external dependencies beyond the standard library + pyyaml.
- **Workflow**: `.github/workflows/canon-quality.yml` runs the validator as
  the **`frontmatter`** job on every PR and push that touches `writings/**`.
  Runs in parallel with the reference-integrity audit (`oddkit_audit`).
- **Enforcement mode**: **hard-block from day one**. The schema is
  unambiguous; the renderer's failure mode is silent-drop with no operator
  signal; canon mandates this gate "No Exceptions". There is no soft-block
  observation cycle. There is no allowlist directive — any finding fails the
  job.

The validator emits findings under five rule_ids, each mapped directly to a
"Known Crash Patterns" row above:

| rule_id | Catches |
|---------|---------|
| `frontmatter-missing-block` | File has no `---`-delimited frontmatter at all |
| `frontmatter-parse-error` | Frontmatter block exists but YAML is malformed |
| `frontmatter-missing-required` | One of the eight universal fields, or one of `public` / `type` / `slug` / `hook` / `description` on **any** essay in writings/ (regardless of exposure), is missing or empty |
| `frontmatter-invalid-enum` | `exposure`, `voice`, `tier`, or `audience` has a value not in the canonical allowed set |
| `frontmatter-type-mismatch` | Quoted boolean (`public: "true"`) or quoted integer (`tier: "3"`) |
| `frontmatter-contradictory` | `public: false` combined with `exposure: public` |

Authoring agents may run the validator locally before pushing
(`python3 scripts/validate-frontmatter.py`); the CI gate is the
authoritative check.

When the validator and `canon/meta/frontmatter-schema.md` disagree, the
schema doc wins and the validator's enum mirror must be updated to match.

---

## Homepage Surfacing — Where Essays Appear, and Why They Vanish

Two distinct frontmatter signals decide where a writings/ essay shows up. Per
`canon/meta/frontmatter-schema.md` (the source of truth):

- **Homepage feed** — `public: true` **and** `exposure: public`. This is the
  default published surface.
- **Curated reading path** — `start_here: true` (ordered by `start_here_order`).
  An additional, editorial "start here" path on the homepage. Independent of
  the feed; set it deliberately, not by default.
- **Navigation only** — `public: true` **and** `exposure: nav`. Reachable
  through site navigation but **not** promoted on the homepage. This is a
  legitimate, intentional state for some essays — it is NOT an error.
- **Hidden / draft** — `public: false`/absent, or `exposure` in
  `draft` / `hidden` / `internal`.

### The recurring failure this prevents

An essay authored with `exposure: nav` and missing `public` / `type` / `slug`
**merges clean and then never appears on the homepage.** The original gate only
required the renderer-critical fields when `exposure: public`, so a `nav` essay
sailed through with a green check and vanished silently. "Be more careful" does
not fix a blind spot in the gate; widening the gate does.

### The strengthened rule (no exceptions)

`public`, `type`, `slug`, `hook`, and `description` are required on **every**
essay in writings/, **regardless of exposure**. An essay cannot exist in
writings/ without declaring `public` explicitly. This is enforced
unconditionally by `scripts/validate-frontmatter.py`.

Because `public: true` + `exposure: nav` is legitimate, the gate cannot
hard-fail it. Instead, `scripts/surfacing-report.py` makes the state **loud**:
it reports, per essay, exactly which surface it lands on and flags anything not
on the homepage feed — so "I meant to publish and it landed on nav" is visible
at write time, not discovered in production.

### Caught at every layer

| Layer | Mechanism |
|-------|-----------|
| Writing (scaffold) | `writings/_TEMPLATE.md` ships the complete required field set; copy it to start a new essay correct |
| Writing (commit) | `.husky/pre-commit` runs the validator (hard) + surfacing report (soft) on staged writings/ essays |
| Validating | `scripts/validate-frontmatter.py` — fields required for all essays unconditionally |
| Challenging | This constraint; oddkit `preflight`/`challenge`/`validate` surface it when a deliverable includes writings/ |
| CI/CD | `.github/workflows/canon-quality.yml` `frontmatter` job hard-blocks; the surfacing report runs as a soft PR comment |

---

## Enforcement

This constraint is part of the Definition of Done for any writing. A writing that exists but has broken frontmatter is not complete — it is a liability that will crash the renderer.

oddkit's preflight and validate should surface this constraint when the deliverable includes writings.

---

## Origin

This constraint was created on 2026-04-09 after broken frontmatter was shipped three times in a single session. Each time, the only signal was the preview site crashing. The pattern is: the AI co-author generates plausible-looking frontmatter that deviates from the schema in subtle ways, and no automated check catches it before merge.

The fix is not "be more careful." The fix is a gate that cannot be bypassed.

---

## See Also

- [Canon-Integration Audit](klappy://canon/constraints/canon-integration-audit) — extends this rule with the validator-completeness audit: the validator relied on for this gate must implement the full schema's type discipline, not just field presence
- [Frontmatter Schema](klappy://canon/meta/frontmatter-schema) — the authoritative reference
- [Writing Canon](klappy://canon/meta/writing-canon) — the quality checklist (item 8: ghost writer test)
- [Definition of Done](klappy://canon/constraints/definition-of-done) — structural requirements for all deliverables
