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

---

## Automation

A Managed Agent can be used for validation. The agent should:
1. Clone the repo and check out the branch
2. Fetch the frontmatter schema via oddkit
3. Read 3-4 working essays for structural comparison
4. Diff the new essay's frontmatter field-by-field
5. Fix issues and push, or report findings

The agent configuration, environment ID, and API credentials are stored in the project instructions.

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

- [Frontmatter Schema](klappy://canon/meta/frontmatter-schema) — the authoritative reference
- [Writing Canon](klappy://canon/meta/writing-canon) — the quality checklist (item 8: ghost writer test)
- [Definition of Done](klappy://canon/constraints/definition-of-done) — structural requirements for all deliverables
