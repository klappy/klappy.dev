---
uri: klappy://odd/handoffs/2026-06-09-scope-audit-execution
kind: odd
title: "Handoff — scope-audit PR: Tag Movers with target_repo (klappy.dev Bifurcation, Pass 1)"
audience: odd
exposure: nav
tier: 2
voice: terse
stability: draft
tags: ["handoff", "session", "scope-audit", "target_repo", "bifurcation", "extraction", "frontmatter", "outcomes-driven-development", "oddkit", "truthkit", "execution-contract", "epoch-9"]
epoch: "E0009"
date: 2026-06-09
derives_from: "docs/repo-bifurcation-and-target-repo-routing.md, canon/meta/frontmatter-schema.md, canon/constraints/frontmatter-validation-before-merge.md, canon/constraints/release-validation-gate.md, canon/principles/meaning-must-not-depend-on-path.md"
complements: "journal/2026-06-09-odd-truthkit-bifurcation-and-scope-audit.tsv, canon/meta/scope-map.json, scripts/validate-frontmatter.py"
governs: "The fresh-session execution of Pass 1 (tag movers with target_repo) of the klappy.dev bifurcation. In scope: a single reviewable PR on a branch. Out of scope: moving files, the universality pass, and anything touching docs/archive or the apocrypha PDF."
status: open
---

# Handoff — scope-audit PR (Bifurcation Pass 1)

> Open a single PR on branch `scope-audit` against `klappy/klappy.dev` that writes a `target_repo` frontmatter tag onto the ~232 markdown files that will leave klappy.dev, records non-markdown movers in a sidecar, and bundles the schema + validator + test changes that keep the merge gate green. Do not move any files. Do not touch `main` directly. The strategy and rationale are in `klappy://docs/repo-bifurcation-and-target-repo-routing`; read it first. The full per-file classification is reproducible from the live git tree.

---

## Summary

This is Pass 1 of the klappy.dev bifurcation: a non-destructive audit that routes files to their future repos via frontmatter, so a later extraction is `git grep target_repo` + copy. It writes tags only; it moves nothing. The receiving session should be able to execute without the originating conversation — everything needed is here and in the DR.

Why a tag and not a move: the move is a separate, later pass, and combining a relocation with the editorial work of the universality pass risks corrupting the daily-driver knowledge base. One observation pass now; action passes later.

---

## Locked decisions (do not re-litigate)

- Destinations: `"outcomes-driven-development"` (core canon/governance), `"oddkit"` (engine docs/governance), klappy.dev (everything else, **untagged**). `"undecided"` for contested files.
- Tag **movers only** (~232 md). Untagged = stays. This honors `meaning-must-not-depend-on-path` via a single default rule, without 451 redundant edits.
- Field name is `target_repo` — **not** `scope` (overloaded in this canon: scoped-truth, scope-over-folders).
- Branch `scope-audit`, never a direct commit to `main` (the Worker reads `main` at runtime).
- "Search and copy" = `git grep`, **not** `oddkit_search` (the Worker indexes only a fixed field subset; `target_repo` won't be indexed unless that's separately extended — out of scope here).
- `universality` (the TruthKit-KB seed marker, universal vs software-clothing) is a **second pass** requiring a read of the ODD spine. Not in this PR.
- `DEAD`/archive (`docs/archive`, apocrypha PDF) is punted — leave in place, do not tag.

---

## Scope

In scope:
- Add `target_repo` (quoted-string enum) to `canon/meta/frontmatter-schema.md`.
- Allowlist `target_repo` in `scripts/validate-frontmatter.py` and update fixtures in `scripts/tests/`.
- Write `target_repo` into the ~232 markdown mover files (confident → repo; contested → `"undecided"`).
- Create sidecar `canon/meta/scope-map.json` for the ~11 non-markdown movers (e.g. `canon/meta/pack.json`).
- Open one PR on branch `scope-audit`; do not merge.

Out of scope:
- Moving/copying any file to another repo.
- The `universality` pass (needs the ODD spine read).
- Worker changes to index `target_repo`.
- `docs/archive`, the apocrypha PDF, and any klappy.dev "stays" file (left untagged).

---

## How to reproduce the file classification

The classification is deterministic from the live tree, not a stored list:

1. `GET /repos/klappy/klappy.dev/git/trees/main?recursive=1` → 769 blobs (the catalog index is stale; use the tree).
2. Apply the bucket rules in the DR and the manifest below. Buckets map to `target_repo`:
   - core → `"outcomes-driven-development"` (~138 md)
   - tool → `"oddkit"` (~94 md)
   - personal/archive → untagged (stays in klappy.dev)
3. Movers = core + tool ≈ **232 markdown** files + ~11 non-markdown (sidecar).

### Confident routing (folder-level)
- `"outcomes-driven-development"`: `canon/values/`, `canon/definitions/`, `canon/diagnostics/`, `canon/defaults/`, most `canon/constraints/` and `canon/principles/` and `canon/methods/` (the universal subset — see manifest), `canon/bootstrap/`, all structural `odd/` (manifesto, contract, maturity, terminology, prompt-architecture, gate/, challenge/, challenge-types/, encoding-types/, getting-started/, appendices/, constraint/).
- `"oddkit"`: `docs/oddkit/`, `interfaces/mcp|manifest|canon-frontmatter/`, `canon/meta/pack.json` (sidecar), `canon/constraints/{retrieval-disclosure-contract, oddkit-action-registration-completeness, release-validation-gate, telemetry-governance, telemetry-validation-gate, core-governance-baseline, canon-integration-audit, audit-gates-are-spawned-agent-sessions, frontmatter-validation-before-merge}`, `canon/principles/{vodka-architecture (see fork), dry-canon-says-it-once, consistency-same-pattern-every-time, cache-fetches-and-parses, envelope-time-fields, partial-data-..., async-by-default, identity-resolved-by-protocol}`, governance tooling in `scripts/` (except `surfacing-report.py`, which is klappy.dev-only → untagged).
- Untagged (stays): `writings/`, `about/`, `draft-zeros/`, `journal/`, `docs/` (except `docs/oddkit/`), `canon/{apocrypha, resonance, observations, voice, case-studies, architecture, CHANGELOG.md}`, `odd/{ledger, handoffs, decisions, backlog}`, and the heavy R&D in `canon/methods/{spawned-agent-session-*, persona-shaped-agent-runtime, trigger-source-taxonomy, quality-attribute-tension-survey}`.

### Contested → `target_repo: "undecided"` (do not guess)
~29 file-level calls plus three cross-cutting forks. The forks:
1. **Writing-vertical cluster** — `canon/meta/{writing-canon, triangle-of-yaps}`, `canon/constraints/{ai-voice-cliches, guide-posture, dual-context-writing, relational-sensitivity, author-identity-language, harness-disambiguation}`, `canon/methods/{revision-lens-sequence, using-ease-and-resistance-as-signals, choosing-the-right-narrative-container, writing-apocrypha-fragments, writing-predocumentaries}`. Lean: klappy.dev. Flips to core only if the core should ship a worked vertical.
2. **vodka/oddkit-architecture principles** — `canon/principles/{vodka-architecture, prompt-over-code, kiss-simplicity-is-the-ceiling, maintainability-one-person-indefinitely, doing-less-enables-more, antifragile-failures-grow-canon}`. Split: most → oddkit; `prompt-over-code` and `antifragile` lean core.
3. **`AGENTS.md`** — must be split: creed+axioms half → core; oddkit-MCP-integration half → oddkit. Tag `"undecided"` until split.

---

## Execution steps

1. Branch `scope-audit` off `main`. Fetch the recursive tree; compute movers per the rules above. Fetch each mover's blob SHA from the **branch** (not main) before committing.
2. Edit `canon/meta/frontmatter-schema.md`: add `target_repo` as an optional quoted-string enum (`"outcomes-driven-development" | "oddkit" | "undecided"`); document "absent = klappy.dev."
3. Edit `scripts/validate-frontmatter.py`: allowlist `target_repo`; add valid/invalid fixtures under `scripts/tests/`; confirm `test_validator.py` passes locally.
4. Insert the `target_repo:` line into each mover's existing YAML block (quoted value; do not reorder other fields; do not touch body). Contested → `"undecided"`.
5. Write `canon/meta/scope-map.json` for non-md movers: `{ "<path>": "<target_repo>" }`.
6. Commit via the Git Data API (create blobs → tree → commit → branch ref) to avoid 769 single-file calls. Open the PR; **do not merge.** Title: "scope-audit: tag movers with target_repo (bifurcation pass 1)".
7. Verify (Reality Is Sovereign): the PR's CI (`canon-quality.yml`) passes; `git grep 'target_repo: "outcomes-driven-development"' | wc -l` ≈ 138; `... "oddkit"` ≈ 94; no value outside the enum; renderer smoke (a tagged page still renders).

---

## Verification / definition of done

- One PR open on `scope-audit`; `main` untouched.
- `frontmatter-validation-before-merge` and `canon-quality` CI green.
- Mover counts match (~138 / ~94); contested files carry `"undecided"`.
- Sidecar present for non-md movers.
- No file moved; no body content changed; `docs/archive` and the PDF untouched.

---

## Open / next (DOLCHEO O, forward-pointing)

- **P1** — Resolve the 3 forks + ~29 `"undecided"` files, then flip those tags.
- **P1** — `universality` pass: read the ODD spine, tag the ~138 core files `universal` vs `software`; that set is the TruthKit-KB seed.
- **P2** — Decide whether to extend Worker frontmatter indexing to include `target_repo` (enables `oddkit_search` routing; otherwise grep-only).
- **P2** — Confirm the current epoch; bump if this thread warrants its own epoch declaration.
- **P3** — Deferred: private-repo support in oddkit; apocrypha PDF → release asset; `docs/archive` cleanup.

### Handoff fields (DOLCHEO H)
- **blocked_by:** maintainer go-ahead to write to the public repo (branch + PR).
- **owner:** next session.
