---
uri: klappy://odd/handoffs/2026-06-09-storage-model-execution
kind: docs
title: "Handoff — Execute the Canon Storage Model (D0002 v2), Verify oddkit, Then Bifurcate"
audience: canon
exposure: hidden
tier: 3
voice: neutral
stability: draft
tags: ["handoff", "execution", "d0002", "cqrs", "index-kill", "bifurcation"]
epoch: E0009
date: 2026-06-09
governs: "One fresh execution session"
---

# Handoff — Execute the Canon Storage Model (D0002 v2), Verify oddkit, Then Bifurcate

> Sequence: persist the decision → fix the kind bug → kill the static
> indexes → maintainer ratifies → bifurcate. Verify at every step. Never
> touch main except through merged PRs.

## Context

PR #227 (target_repo tagging, 232 md files) is MERGED — the sort key
exists. PR #228 carries D0002 and is OPEN/proposed; it must be rewritten to
v2 (the canon storage model) before ratification. The decision text and
rationale live in odd/decisions/D0002-canon-storage-model.md once step 0
lands. Maintainer: Klappy (terse, expects exhaustive execution without
permission-seeking; PRs always, main never directly).

## Locked decisions — do not re-litigate

All eight Decision items in D0002 v2, plus: README doctrine prose survives,
tables die; pointers to catalog are PROSE, not an executable-embed feature
(no such feature is needed or wanted); descriptive slugs are courtesy, not
requirement; no registry artifact of any kind; substrate stays git for now.

## Execution order

**Step 0 — Persist the decision (branch: decision-authority-uris).**
Replace D0002 v1 with v2 (rename file to D0002-canon-storage-model.md).
INVERT the existing README change on this branch: v1 ADDED a D0002 row to
the table in odd/decisions/README.md — instead DELETE the entire catalog
table, keep the doctrine prose ("what this folder is for", the two-types
doctrine), and add one line: "To list decisions: oddkit catalog with
path_prefix=odd/decisions/ (include all kinds until the kind fix lands)."
Commit this handoff file alongside. Update PR #228 title/body to the v2
framing. Verify: scripts/validate-frontmatter.py clean; full test suite
green.

**Step 1 — Fix odd/ kind-resolution (oddkit worker or frontmatter).**
Bug (recorded 2026-06-09): catalog with DEFAULT include filters
(canon,docs,essays) returns 0 results for path_prefix=odd/decisions/; full
allowlist returns the docs. Cause: kind is path-inferred and odd/ is
unmapped. End-state per D0002: kind from frontmatter only. OPEN QUESTION
for maintainer before implementing: which kind is odd/ content — `canon`
(default-visible) or a new kind added to defaults? Acceptance test: catalog
with default filters and path_prefix=odd/decisions/ returns D0001 + D0002.

**Step 2 — Index-kill PR (klappy.dev, new branch).**
Delete static enumerations: catalog tables in canon/constraints/README.md,
canon/methods/README.md, canon/principles/README.md (odd/decisions/README
already done in step 0); strip enumerations from odd/index.md and
odd/orientation-map.md — doctrine/definition prose survives (relocate the
"what is ODD" definition to a proper definitions doc if needed). Add prose
catalog pointers. Verification, recorded in the PR body: (a) catalog per
path_prefix before/after → identical document sets; (b) 5+ canned BM25
title queries before/after → the target doc ranks equal-or-higher after
(tables removed = less duplicate-title competition); (c) site builds and
renders; (d) validator + tests green; (e) audit run for dead references to
the stripped files. Follow-up to log, not block: index-smell detector as a
soft CI signal.

**Step 3 — Maintainer ratifies.** Klappy merges #228 (decision + handoff)
and the index-kill PR. No executor action.

**Step 4 — Bifurcate.** Per the merged #227 tags and the bifurcation DR
doc. Now framed as a write-path re-shard: create/populate the
outcomes-driven-development and oddkit repos; each new repo's root doc
self-declares its authority in frontmatter; peer pointers land as canon
declarations; oddkit federates the shards into one read model. References
cannot break — they resolve through the read model. target_repo and
scope-map.json retire after the move. Undecided files (19 md + AGENTS.md)
stay put pending authority adjudication: "can ODD supersede this without
oddkit's consent?"

## Known gaps carried forward

- oddkit classification gap: ~21 engine files + 29 judgment calls tagged
  core pending the adjudication question above (P1, post-move).
- oddkit `validate` returns NEEDS_ARTIFACTS for prose — use `challenge` as
  the quality gate; known gap, not a doc problem.
- oddkit MCP times out intermittently — fall back to direct GitHub API.
  A 422 on PR creation means the PR already exists; check open PRs.

## Definition of done

- D0002 v2 + this handoff committed on decision-authority-uris; PR #228
  updated; validator and tests green.
- odd/ documents visible to default-filter catalog (acceptance test above).
- Index-kill PR open with all five verification artifacts in its body.
- Zero static enumerations remain (grep evidence: no markdown tables of
  sibling-file links; no Outline sections enumerating own headings).
- main untouched except through merged PRs. No files moved before step 4.

## Blocked by

- Maintainer answer to the odd/ kind question (step 1).
- Maintainer ratification merges (step 3).
- GitHub PAT and, if a worker change is chosen, oddkit deploy access.
