---
uri: klappy://canon/methods/document-routing-tests
kind: canon
title: "Document Routing Tests — A Falsifiable Decision Tree for What Goes Where"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "methods", "routing", "bifurcation", "target_repo", "core-boundary-criteria", "split-rule", "office", "working-conventions", "repo-scope"]
epoch: E0010
date: 2026-08-28
derives_from: "odd://canon/constraints/core-boundary-criteria, docs/repo-bifurcation-and-target-repo-routing.md, canon/methods/governance-validation-via-agents.md"
complements: "canon/meta/writing-canon.md, canon/meta/frontmatter-schema.md, canon/principles/scope-over-folders.md"
governs: "How any document in a layered estate routes to exactly one home per layer — universal canon, portable core, owner's office, working conventions, or project repo — via tests answerable from the document's own text."
target_repo: "outcomes-driven-development"
---

# Document Routing Tests — A Falsifiable Decision Tree for What Goes Where

> A document routes on its substance, never its topic, and every routing verdict must be derivable from the document's own text — no context, no author interview, no vibes. This method extends the seven core-boundary criteria (`odd://canon/constraints/core-boundary-criteria`) from a three-home world (core, overlay, tool repo) to a five-layer estate: universal canon, portable core, the owner's office, the working-conventions repo, and project repos. One gate runs before everything: an unwritten law cannot be routed — capture precedes routing. One rule runs after everything: when a document carries substance for more than one layer, SPLIT it — one layer per rung, pointers not copies. When no test clearly decides, the document stays at the lower rung; the upper layers are pulled toward quality, never pushed toward volume.

---

## Summary — Why Routing Needs Tests, Not Taste

A layered estate accumulates documents faster than any maintainer can adjudicate them by feel. Without tests, routing decays into topic-matching ("it mentions writing, so it goes to the writing canon") — the exact failure the core-boundary criteria were canonized to prevent. With tests, any agent or adopter can take a document, read only its text, and produce a verdict another agent would reproduce.

The tests below are ordered as a decision tree because order is load-bearing: the genericization gate and the bet gate must run *before* the canon test, or provisional, operator-specific material leaks upward into layers that outsiders consume. Each test is falsifiable — it names the textual evidence that would flip its verdict. The method closes with tie-breakers for documents that pass multiple tests, and the SPLIT rule for documents that genuinely carry substance for more than one layer.

Every claim here is an application of settled prior art: the seven core-boundary criteria, the `target_repo` extraction convention (route by frontmatter, extract verbatim-minus-`target_repo`, grandfather existing URIs, never mint new URI schemes), and the repo-scope discipline ("product research lands in the product repo"). This document adds the layer map and the executable ordering; it restates the criteria only where a test compresses one, and cites them everywhere else.

---

## The Layer Map — Five Homes, One Test Each

Generic layer names are the subject; any single estate's repo names are proof (criterion 5). An adopter substitutes their own instances.

| Layer | Generic name | What lives there | One-line test |
|---|---|---|---|
| L1 | Universal canon | Epistemic invariants that survive with zero operator context | True for any operator, any domain |
| L2 | Portable core (ODD) | Methodology an outside adopter needs, genericized | Proven across ≥2 repos and useful beyond the operator |
| L3 | The owner's office | Law binding the operator's portfolio and life, not outsiders | Binds the whole estate; governs, never cooks |
| L4 | Working conventions | Procedures a cook follows during service | Consulted mid-service; recipes, rulings, rail mechanics |
| L5 | Project repo | Product knowledge | Meaningful only inside one project |

Proof — the instance this method was derived in: L1/L2 = `klappy.dev` canon with `target_repo: "outcomes-driven-development"` extraction; L3 = `klappy/kitchens` (the chef-owner's office — "governs; never cooks"); L4 = `klappy/kitchen` (health-code, cookbook, rail, specs); L5 = each product repo under `research/<topic>/` per repo-scope discipline (Policy 15). Authority cascades downward — school → office → kitchen → project — and "law binds downward; specificity wins only where no upstream law speaks" (kitchen ruling R15).

---

## Gate 0 — Existence: An Unwritten Law Cannot Be Routed

**Test:** Does the document exist as text in a repository (or as a reviewable draft)?

**If no → capture first.** A law stated aloud during service, however load-bearing, has no routing verdict — it has no text to run the tests against. The failure mode is real, not hypothetical: of six artifacts from one recent night of service, four existed only in the session transcript (see Worked Examples). Routing them required writing them down first. What has not been written has not been routed; what has not been seen is not known.

**Falsifier:** a repo path or PR containing the text.

---

## The Decision Tree — Run in Order, Stop at First Verdict

Each test is answerable from the document's own text. Run T1–T6 in order; the SPLIT rule (below) handles documents that trip more than one.

### T1 — The Genericization Gate (criterion 6)

**Test:** Does the text contain operator-specific operational values — repo names, server URLs, account-bound commands, copy-pasteable prompts naming the operator's resources — *as subject rather than proof*?

**If yes → not L1/L2 yet.** Either genericize the subject to placeholders (`[OWNER]/[REPO]` — the precedent: the governance-validation method's core copy reads "Validate the frontmatter of `[FILE]` on branch `[BRANCH]` in `[OWNER]/[REPO]`" while the overlay copy keeps the live values), or route the document down to the layer whose readers share those values. An adopter copy-pasting upper-layer content must land in their own world, not the operator's.

**Distinguisher (criterion 5):** instance values appearing as *evidence, worked example, or provenance* inside an upper-layer document are healthy and do not trip this gate. The gate trips when the document is *about* the instance or cannot function without instance context.

**Falsifier:** a copy of the document with all operator values replaced by placeholders that still says everything it needs to say.

### T2 — The Universal-Invariant Test (L1 candidate)

**Test:** Strip every operator-specific fact from the text. Does what remains still assert a true, falsifiable epistemic invariant — a claim about observation, evidence, verification, attention, or system behavior that holds for any operator in any domain?

**If yes → L1 canon candidate** — *candidate*, because T3 still gates landing.

**Falsifier:** a domain or operator for which the stripped claim is false, or a demonstration that the claim is empty once the operator context is removed (an "invariant" that only restates the operator's preference is a ruling, not an invariant — route via T4).

### T3 — The Bet Gate (criterion 2)

**Test:** Is the claim settled doctrine — survived across contexts, adjudicated, with counter-examples considered — or a provisional found-framework still under validation?

**If a bet → it stays at the operator's layer (overlay/office/kitchen), whatever T2 said.** The overlay is where bets live; the core is where settled doctrine lives. A single supporting case makes an aphorism, not an invariant; principles become canon once stated, so a principle resting on one incident routes down until it has survived contact with a second.

**Falsifier for "settled":** name the ≥2 independent contexts it survived and the counter-example that was considered and rejected. Absent both, it is a bet.

### T4 — The Adopter Test (L2, via `target_repo`)

**Test:** Is the methodology proven across ≥2 repositories *and* useful to an outside adopter with zero operator context after T1 genericization?

**If yes → L2**, mechanically: the document stays in the overlay carrying `target_repo: "outcomes-driven-development"`; extraction is search-and-copy over that field, verbatim minus the tag; existing `klappy://` URIs are grandfathered and **no new URI scheme is ever minted** for the move. Untagged means it stays home.

**Falsifier:** an adopter who, handed the genericized text, still cannot use it without asking the operator what it means.

### T5 — The Portfolio Test (L3, the office)

**Test:** Does the document bind the operator's portfolio or life — allocation across repos, obligations, seasons, delegation, strategy, cross-estate law — while binding no outsider?

**If yes → the office.** The office "governs; never cooks": it holds who-does-what and what-goes-where, never the work itself. Endgames, portfolio manifests, adoption maps of upper-layer canon, and cross-repo ledgers are office material. The dispatch record always stays at the office layer even when every substantive artifact routes elsewhere — a landing summary pointing at the product-side PR is the ideal office-side residue.

**Falsifier:** either an outsider who is bound by it (route up, through T1–T4) or a cook who must consult it mid-service (route down, T6).

### T6 — The Service Test (L4, the working conventions)

**Test:** Is it a procedure, ruling, recipe, or convention a cook follows *during service* — consulted while cooking, not while governing?

**If yes → the working-conventions repo**, in its native shapes: standing rulings as dated, append-only entries amended only by dated supersession; recipes as templates; specs as design docs; live state as rail position. The conventions repo inherits the upper layers by reference — "this kitchen inherits the school; it never copies it" — so no upper-layer content is ever restated there, only pointed to.

**Falsifier:** a service session that never needs it (route up to the office) or one project being its only consumer (route down, T7).

### T7 — The Project Test (L5, terminal)

**Test:** Is the document meaningful only inside one project?

**If yes → that project's repo** (`research/<topic>/`, its docs, its changelog). This is repo-scope discipline: "Product research lands in the product repo," and a tool repository holds that tool's user manual and maintenance manual — nothing else (criterion 4). A mixed branch gets decomposed file-by-file, never migrated wholesale; cross-repo moves carry provenance (origin repo, branch, tip SHA) in both commit message and PR body. If the product repo does not exist, that is an escalation, not a reason to land product material at a governance layer.

**Everything reaches a verdict here.** A document that failed T1–T6 and is not project-scoped is, by construction, operator material with no external consumer: it stays in the overlay by default — the same default the boundary criteria set: *when no criterion clearly decides, the document stays put; the core must be pulled toward quality, not pushed toward volume.*

---

## Tie-Breakers and the SPLIT Rule

**SPLIT — one layer per rung, pointers not copies.** A single artifact can legitimately carry an L1 invariant, an L3 adoption, and an L4 procedure. The resolution is never double-homing (a named failure mode of the boundary criteria) but a split: the invariant lands as canon, the office records the adoption *by pointer* to the canon URI, the conventions repo records the service procedure *by pointer* to both. Each rung holds only the substance native to it; everything upward is a reference. The derivation chain (criterion 7) travels with each piece — a split fragment stranded from its `derives_from` ancestry is a routing smell.

**Tension vs ruling (criterion 3).** A document that *exposes* a tension without adjudicating it is upper-layer material; the *ruling* on that tension is office or kitchen material. Per-document test: does it surface what you must think through, or does it decide for you?

**Proof vs subject (criterion 5).** Runs as a lens inside every test: instance material as evidence is healthy anywhere; instance material as subject caps the document at the layer that shares the instance.

**Manuals are manuals (criterion 4).** A principle a tool *embodies* routes by T2–T4; the tool's own usage and maintenance documentation routes to the tool repo regardless of how philosophical it sounds.

**Topic is never the criterion (criterion 1).** No test above ever asks what the document mentions — only what its substance requires of its reader.

**Routing PRs carry evidence.** Per the boundary criteria's verification standard: the mover list from parsed frontmatter (never a body-grep), before/after parity or delta counts, the test number that decided each contested document with one line of why, and — for any genericized or split document — which copy is canonical.

---

## Worked Examples — One Night's Artifacts Through the Tree

Six artifacts from the night of 2026-08-27/28, verdict each. Two existed in the pushed record; four tripped Gate 0 — their verdicts below are conditional on capture, which is itself the first finding.

**1. The 3-tool surface law** (captain's standing ruling: "one for understanding, one for executing, one for observability"; shipped in cartographer PR #110 — 16 tools/20,114 B → 3 tools/4,444 B). **SPLIT across three rungs.** (a) The invariant — *a tool surface collapses to understand/execute/observe, and disclosure is bought per capability, never shipped wholesale* ("collapse the surface, never the legibility") — survives T2 with zero operator context; T3: two independent proofs exist (cartographer 0.17.0; oddkit's retrieval-disclosure contract), so it clears the bet gate → **L1 canon, `target_repo` per T4**. (b) The ruling that *this estate's* MCP servers ship exactly `docs`/`execute`/`telemetry` is an adjudication (criterion 3) consulted while building servers → **L4: a dated standing ruling in the working-conventions health code**, pointing at the canon. (c) The implementation, changelog, and guide → **L5: cartographer** (criterion 4), where PR #110 already correctly holds them. Note: the refinement sentence itself was unpersisted — Gate 0 applies to (a) until the canon doc lands.

**2. The collapse rule (MCP → filesystem conventions).** Gate 0: unpersisted; nearest recorded cousin is one line in the conventions repo's folder-grammar spec ("retrieval-disclosure as filesystem convention"). Substance: an architectural direction — services collapse into git/filesystem conventions — with exactly one completed case behind it. T3: **a bet.** Verdict: **capture at L4** (extend the folder-grammar spec or a sibling spec, where its cousin already lives); canon/ODD candidacy re-runs after a second independent collapse completes.

**3. The client-autonomy law.** Gate 0: unpersisted (org-wide search: zero hits). Substance: how the operator's practice treats client estates — custody, hand-back, operability without the operator. That is a ruling binding the operator's conduct during client service, in the lineage of the existing client-custody rulings (R17/R18 family). Verdict: **capture at L4 as a dated health-code ruling.** Its universal kernel (a client's estate must remain operable without you) is a T2 candidate but T3-gated: one practice, no counter-example considered yet — the invariant extraction waits.

**4. The antifragile-decentralization endgame.** Gate 0: unpersisted. Substance: where the whole portfolio is headed — an endgame is strategy, and strategy binds the portfolio while binding no outsider and no mid-service cook. Verdict: **capture at L3, the office** (the office holds seasons, portfolio strategy, the delegation ladder). The related L1 material that already exists (antifragile-failures-grow-canon) is pointed to, not restated; any genuinely universal decentralization invariant inside the endgame routes up only after it survives T3.

**5. The ARS deconstruction verdicts** (agent-role-service PR #133: 14 capabilities scored "8 → kitchen/git · 4 → retire · 2 → keep-as-ARS-core"). T7 direct hit: the subject is one product's architecture. Verdict: **L5 — already correctly filed** in the product repo under `research/deconstruction/`. Repo-scope discipline's residue rule applies: the office keeps only the dispatch record and a landing summary pointing at PR #133. The eight capabilities routing "→ kitchen/git" become *new work items on the conventions repo's rail* — tickets pointing at the map, never copies of it. The map's one generalizable observation (git already held the truths the service duplicated) feeds artifact 2's spec as a cited case, which is exactly how a bet accumulates its second proof.

**6. "A filter that never forgets is a cron that never sleeps."** Gate 0: unpersisted. T2: stripped of context it asserts a real invariant — every standing automation bills for attention whether or not it produces any — and it is falsifiable (a filter with true zero idle cost would refute it). T3: it rests on a single incident (one service's ~44,640 idle cron wakeups a month, ~$260). **A bet, by the method's own arithmetic.** Verdict: **capture in the overlay as an observation** (the overlay is where bets live), no `target_repo` until a second independent case and a considered counter-example exist. Canon-shaped is not canon-ready.

---

## Self-Application — This Document Through Its Own Tree

Gate 0: passes as of this PR. T1: operator values appear only as proof (the layer-map instance row, the worked examples) — the tests themselves name generic layers; the gate does not trip. T2: the stripped substance — *route on substance, decide from the text alone, gate genericization and bets before canon, split one-layer-per-rung* — is an operator-free method; candidate. T3: the underlying criteria are settled tier-1 doctrine that survived a full bifurcation; the five-layer extension rests on a ratified office topology and the downward-cascade ruling — the extension is newer than the criteria, and this document's `stability: evolving` says so honestly. T4: the routing practice is proven across ≥2 independent boundaries (overlay→core bifurcation, June 2026; office→product decomposition under repo-scope discipline, July 2026) and is useful to any adopter with a layered estate → **verdict: L1/L2 — overlay canon carrying `target_repo: "outcomes-driven-development"`.**

The SPLIT rule then assigns the residue: the office receives a **pointer plus the concrete adoption map** (which real repos sit at which layers — instance-owned, office material by T5), and a journal entry per the office's own convention. The working-conventions repo receives **nothing** — it inherits the school by reference and never copies it; when a cook routes a document mid-service, the pointer chain already reaches here. No project repo is touched.

Verdicts this document does *not* claim: it is not ratified law until the captain merges it, and its worked-example verdicts on unpersisted artifacts bind nothing until those artifacts are captured. Both are Gate 0 talking.
