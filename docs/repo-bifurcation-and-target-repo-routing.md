---
uri: klappy://docs/repo-bifurcation-and-target-repo-routing
title: "Repo Bifurcation and target_repo Routing"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "klappy-dev", "internals", "bifurcation", "extraction", "target_repo", "outcomes-driven-development", "oddkit", "truthkit"]
complements: "odd/handoffs/2026-06-09-scope-audit-execution.md, canon/meta/frontmatter-schema.md, scripts/validate-frontmatter.py"
governs: "How the klappy.dev knowledge base separates into a portable core, a tool layer, and a personal overlay; and how the target_repo frontmatter field routes files to their destination repos."
---

# Repo Bifurcation and target_repo Routing

> The klappy.dev knowledge base is the personal overlay. Portable governance lives in `outcomes-driven-development`; tool documentation lives in `oddkit`; the universal distillation lives in `truthkit`. A file's home is declared by its `target_repo` frontmatter field. Untagged means it stays in klappy.dev. Extraction is a search-and-copy over that field, never a re-organization.

---

## Summary

This is klappy.dev internal operations. It governs how this repository's contents separate into the repos that consume them. It is not portable methodology and nothing outside klappy.dev depends on it.

The engine is already domain-blind: the same oddkit actions serve a software canon and an oral-theology corpus unchanged. All domain specificity lives in the knowledge base, not the tool. Bifurcation therefore acts on the knowledge base alone.

---

## The Repos

- **`oddkit`** — the engine. Domain-blind. Holds the tool's own documentation and engine/release/telemetry governance.
- **`outcomes-driven-development`** — the portable core: universal governance and canon, plus the software-development vertical. What an outside adopter needs.
- **`klappy.dev`** — the personal overlay: essays, book, voice, apocrypha, substrate strategy, proprietary R&D, session history, and internal operations docs like this one. The default home.
- **`truthkit`** — the universal distillation: the minimal canon a harness needs to enforce discipline in any domain. The core with software vocabulary stripped out. Produced as a later pass, seeded from `outcomes-driven-development`.

A file belongs to the portable core only if a non-klappy user needs it. Everything klappy-specific stays in klappy.dev.

---

## The Domain-Applicability Test

A document is portable only if it works for any AI-assisted work, not only software. "Development" in ODD is a vertical label, not the universal frame. Most apparently software-specific governance is universal substance in software clothing; the genuinely software-only residue is thin. The universal distillation is that substance with the clothing removed.

---

## target_repo Routing

Each file declares its destination in frontmatter:

- `target_repo: "outcomes-driven-development"` — portable core.
- `target_repo: "oddkit"` — engine docs and governance.
- `target_repo: "undecided"` — contested; resolved deliberately before it moves.
- Absent — stays in klappy.dev. The default rule is the absence of a tag, so it never depends on a file's path.

Rules:

- Only files that leave klappy.dev carry a tag. The overlay's own files stay untagged.
- Non-markdown files cannot carry frontmatter; their routing is recorded in `canon/meta/scope-map.json`.
- The field is added to `canon/meta/frontmatter-schema.md` and allowlisted in `scripts/validate-frontmatter.py` (with fixtures) so the merge gate accepts it and a malformed value never reaches the renderer.
- Extraction is `git grep target_repo` plus copy. The Worker indexes only a fixed subset of frontmatter fields, so `target_repo` is not discoverable through oddkit search unless that indexing is extended.

---

## Constraints

- The Worker reads `main` at runtime. Tagging happens on a branch and merges after review; it never lands on `main` unreviewed.
- Tagging only the movers keeps each pass small enough to review.
- All routing is frontmatter on a branch, so the cost of a wrong tag is a one-line edit.
- `universality` (the universal-vs-software marker that seeds `truthkit`) is a separate pass; it requires reading the ODD spine and is not set during routing.

---

## What This Is Not

This article does not travel. It is klappy.dev-internal governance about this repository's own structure. Adopters of oddkit, ODD, or truthkit never need it. It carries no `target_repo` tag and stays in klappy.dev permanently.
