---
uri: klappy://odd/backlog/2026-06-09-bifurcation-follow-ups
kind: docs
title: "Backlog — Bifurcation Follow-Ups (Queued by Maintainer, 2026-06-09)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stub
tags: ["backlog", "bifurcation", "d0002", "oddkit", "outcomes-driven-development", "truthkit", "follow-up"]
date: 2026-06-09
epoch: E0009
status: queued
priority: ordered-below
derives_from: "odd/decisions/D0002-canon-storage-model.md, odd/handoffs/2026-06-09-storage-model-execution.md, docs/repo-bifurcation-and-target-repo-routing.md"
---

# Backlog — Bifurcation Follow-Ups

> Maintainer rulings recorded 2026-06-09: ODD repo is public for now; license deliberately undecided; no federation built today — clients make multiple calls per repo via `knowledge_base_url`; defaults and auth are queued, not built.

## P1 — Multi-repo read defaults

oddkit should default its read scope to `outcomes-driven-development` + `klappy.dev` until a caller overrides via `knowledge_base_url`. Interim contract (live now): one call per repo. Unblocks the removal pass below.

## P1 — Removal pass in klappy.dev (4e)

Blocked by the defaults item. Delete the moved files (142 ODD + 75 oddkit md + sidecar) from klappy.dev; in the same sweep retire `target_repo` from schema + validator, delete `canon/meta/scope-map.json`, and remove the transitional `odd/ → canon` PATH_KIND_MAP fallback in the worker. Dead-reference audit + read-model parity required in the PR body.

## P1 — Undecided adjudication (joint session)

19 `target_repo: "undecided"` files + 3 forks (writing-vertical cluster; vodka/architecture principles split; AGENTS.md two-way split). Format: succinct per-file proposal + one-line why, timeboxed review with maintainer. AGENTS.md must split before either half moves.

Adjudication criteria (maintainer calibration, recorded 2026-06-09):

1. **Topic is not the routing criterion.** A doc is not pulled from core because of what it talks about; canon principles route on whether the principle itself is portable. Ruled in-session: `canon/principles/methodology-personification` and `canon/principles/voice-as-cognitive-load-shedding` are core despite being voice/communication-flavored.
2. **Provisional found-frameworks stay overlay.** A framework the maintainer found and is still personally validating ("applied as working practice, retired when disconfirmed") does not ship to adopters as core canon until proven. Ruled in-session: `canon/methods/triangle-pass` returned to the overlay (klappy.dev #233, outcomes-driven-development #3) — it derives from `canon/meta/triangle-of-yaps` (undecided).

3. **Exposed tension without a ruling is core; the ruling itself is overlay.** When a principle, constraint, or method names a tension — "it could be this or this, with a range between" — and does not make the maintainer's judgment call about where on the range to land, that exposure is universal fodder for outcomes-driven-development. The test per doc: does it adjudicate, or does it only surface what you need to think through? Adjudication is klappy-specific; the tension travels.

4. **oddkit the repo is a user manual and a maintenance manual — nothing else.** If a doc is not about creating, maintaining, or using oddkit specifically, it does not belong in the oddkit repo. Principles and methods that oddkit merely embodies are ODD core; the engine being the proof does not make the principle engine documentation. Ruled in-session: 7 docs moved oddkit → core (the principles cluster + audit-gates-are-spawned-agent-sessions). Open: some user-manual content may itself need a different home — review when the manuals are next touched.

## P2 — Worker auth for private knowledge bases

GitHub App or scoped-PAT worker secret so oddkit can read private repos. Enables flipping ODD private later if monetization positioning demands it.

## P2 — ODD repo license decision

Open. No LICENSE file = all rights reserved (interim posture consistent with license-never-assign). Decide deliberately; the licensed artifact is the clonable repo (D0002 item 8).

## P2 — Authority-as-column (D0002 item 3)

Root doc per repo self-declares authority in frontmatter; peer pointers as canon declarations; build index ingests both. No registry file.

## P2 — CI port to outcomes-driven-development

Frontmatter validator + canon-quality workflow in the new repo (canonical scripts now live in oddkit per scope-map routing).

## P3 — truthkit universality pass

Read the ODD spine; tag the portable core `universal` vs `software`; that set seeds truthkit. Editorial, later.

## P3 — Index-smell soft CI detector

Soft signal flagging new static enumerations (sibling-file tables, Outline own-heading sections). Follow-up from the index-kill PR (#230).
