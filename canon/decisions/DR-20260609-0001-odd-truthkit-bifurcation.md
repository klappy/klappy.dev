---
uri: klappy://canon/decisions/DR-20260609-0001-odd-truthkit-bifurcation
title: "DR-20260609-0001 — Bifurcating klappy.dev: Universal Core, ODD Vertical, TruthKit-KB, and Frontmatter-Routed Extraction"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "decisions", "decision-record", "bifurcation", "extraction", "truthkit", "odd", "oddkit", "target_repo", "domain-applicability", "vodka-architecture", "epoch-9"]
epoch: "E0009"
date: 2026-06-09
derives_from: "canon/values/axioms.md, canon/constraints/core-governance-baseline.md, canon/principles/scoped-truth.md, canon/principles/meaning-must-not-depend-on-path.md, canon/principles/kiss-simplicity-is-the-ceiling.md, canon/principles/vodka-architecture.md, canon/constraints/frontmatter-validation-before-merge.md"
complements: "canon/meta/frontmatter-schema.md, canon/definitions/dolcheo-vocabulary.md, odd/handoffs/2026-06-09-scope-audit-execution.md, journal/2026-06-09-odd-truthkit-bifurcation-and-scope-audit.tsv"
governs: "How the klappy.dev knowledge base separates into a universal core, a software vertical, and a personal overlay; the meaning of the target_repo frontmatter field; and the audit-before-extract sequence that produces the outcomes-driven-development repo and, later, the TruthKit knowledgebase."
status: active
---

# DR-20260609-0001 — Bifurcating klappy.dev: Universal Core, ODD Vertical, TruthKit-KB, and Frontmatter-Routed Extraction

> The klappy.dev knowledge base fuses four distinct layers at the file level: a universal epistemic kernel, a software-development vertical (ODD), a personal overlay (essays, voice, story), and a tool layer (oddkit's own governance and docs). The engine (oddkit) is already domain-blind — the same ten actions serve a software canon and an oral-theology corpus unchanged — so all domain specificity lives in the knowledge base, not the tool. This record commits to separating the universal core into a public `outcomes-driven-development` repo, folding tool docs into `oddkit`, keeping klappy.dev as the personal overlay, and treating the universal distillation (TruthKit-KB) as the first extraction pass after the audit — with `outcomes-driven-development` emerging as its software-flavored byproduct. The separation is routed through a `target_repo` frontmatter tag so the eventual move is a mechanical search-and-copy, not a re-organization.

---

## Summary — One Knowledge Base, Four Layers, Routed by Frontmatter

`klappy/klappy.dev` is the knowledge base the oddkit Worker reads at runtime; `klappy/oddkit` is the engine. The base currently mixes four layers in one tree. The primary goal is to let non-klappy users (Tim, Ian, and others) adopt oddkit **without** inheriting klappy's voice, story, or software-development framing — and to do so without disrupting klappy.dev, which is the daily driver.

The decision is to abstract the universal core out of klappy.dev rather than reorganize the whole repo. The core becomes a new public repo, `outcomes-driven-development`. The tool layer folds into the existing `oddkit` repo. The personal overlay stays in klappy.dev. The universal distillation — TruthKit-KB — is the first extraction pass after the audit: it strips software vocabulary from the core, and `outcomes-driven-development` falls out as the kernel-plus-thin-vertical byproduct. The distillation pass is never combined with the audit pass.

To make the eventual extraction mechanical, each file that will move is tagged with a `target_repo` frontmatter field. Untagged means "stays in klappy.dev." Extraction is then `git grep target_repo` plus copy — not a judgment call repeated 769 times.

---

## Decision

1. **Three live destinations, with TruthKit-KB as the distillation that produces one of them.** `outcomes-driven-development` (public, core governance and canon), `oddkit` (engine + its docs/governance), `klappy.dev` (personal overlay and story). TruthKit-KB (the minimal universal distillation) is the first extraction pass after the audit; `outcomes-driven-development` is the software-flavored byproduct of that same pass (kernel + thin vertical overlay).
2. **The core must not depend on the overlay.** `outcomes-driven-development` stands alone. Cross-links from klappy.dev into the core are allowed; links from the core into klappy.dev are not. Outbound links from klappy.dev may dead-end for readers without access — that is acceptable.
3. **Privacy is deferred.** Ship the core public now; privatize later if/when oddkit supports authenticated private knowledge bases. The separation happens today; the access-control change does not block it.
4. **Audit before extract.** One non-destructive observation pass (tag `target_repo`) precedes any move. The move is a second pass. The two are never combined.
5. **Sequence after the audit.** The first real extraction is TruthKit-KB (it alone satisfies the "without software focus" constraint); the `outcomes-driven-development` repo as a software-flavored whole is a byproduct (kernel + thin vertical overlay).

---

## The Four-Layer Ontology

- **Kernel (universal).** Axioms, the Orientation creed, verification and evidence, epistemic modes, challenge/gate/encode, trust. Domain-blind. This is the substance the harness needs.
- **ODD (software vertical).** The kernel applied to software delivery — comparative positioning against SDD/EDD/AI-DLC, the PoC → Pilot → Production maturity vocabulary, and software-flavored examples. "Development" is a vertical label, not the universal frame.
- **Personal overlay (klappy).** Essays, book, voice, apocrypha, substrate/AMS strategy, proprietary agent-runtime R&D, and the session history (ledger, handoffs, journal).
- **Tool layer (oddkit).** The engine's own governance — retrieval contract, release/telemetry gates, vodka-architecture internals — and its user-facing docs.

---

## The Domain-Applicability Test

A document belongs to the universal core only if it works for **any** AI-assisted work, not only software. The evidence that this test is meetable is already in canon: per `canon/principles/kiss-simplicity-is-the-ceiling`, the same ten oddkit actions serve a 400+-document software canon and a 26-document oral-theology corpus with no action added or removed. The engine is domain-blind; domain specificity is a property of the knowledge base alone.

A practical corollary: most of ODD's apparently software-specific governance is universal substance wearing software clothing (e.g., `use-only-what-hurts`, "claims about a system require observing that system," "do not change the contract mid-build"). The genuinely software-only residue is thin. TruthKit-KB is therefore best understood as **ODD with the software vocabulary removed**, not a separate artifact — which is why it is a distillation pass, not a parallel repo.

---

## TruthKit: Harness and Knowledgebase

TruthKit is one product in two halves, mirroring the oddkit/klappy.dev relationship:

- **TruthKit (harness)** operates at the context-window level — it *requires* discipline across any AI tool (e.g., injecting elapsed-time into every context window).
- **TruthKit-KB** is the minimal universal canon the harness reads to know *what* to require.

Engine : fuel :: harness : knowledgebase. The universal core produced by this bifurcation is the seed of TruthKit-KB.

---

## The `target_repo` Field (Governance)

A new frontmatter field routes each file to its destination. It must be added to `canon/meta/frontmatter-schema.md` and allowlisted in `scripts/validate-frontmatter.py` (with its test fixtures) **in the same change**, or `frontmatter-validation-before-merge` will reject the PR and a malformed value risks the silent blank-page renderer failure that constraint exists to prevent.

| Field | Type | Values | Meaning |
|---|---|---|---|
| `target_repo` | quoted string | `"outcomes-driven-development"`, `"oddkit"`, `"undecided"` | Destination repo for extraction. **Absent = stays in klappy.dev.** |

Notes:
- Only files that **leave** klappy.dev are tagged (~232 markdown movers). The 451 "stays" files are left untagged; the default rule (untagged → klappy.dev) is path-independent and so honors `meaning-must-not-depend-on-path` without redundant edits.
- Contested files (the open decisions below) are tagged `"undecided"` so they surface in a grep and are resolved deliberately rather than silently baked in.
- Non-markdown movers (e.g. `pack.json`) cannot carry frontmatter; they are recorded in a sidecar `canon/meta/scope-map.json`.
- **Search caveat:** the oddkit Worker indexes only a fixed subset of frontmatter fields (see `docs/planning/oddkit-full-frontmatter-and-drift-audit`), so `target_repo` will **not** be discoverable via `oddkit_search` unless the Worker's indexed-field set is extended. "Search and copy" therefore means `git grep target_repo` at extraction time. Extending Worker indexing is a separate, deferrable change.

---

## Constraints, Risks, and Reversibility

- **Stale index.** The oddkit catalog index lagged the live tree by ~6 weeks during this work and omitted recent files. The git tree is the source of truth for file existence; the catalog is not.
- **Production read path.** The Worker reads `main` at runtime. Tagging is performed on a branch and merged after review — never committed directly to `main`.
- **Reviewability.** Tagging only movers keeps the PR small enough to review; a whole-repo tag would not be.
- **Reversible.** All of this is frontmatter on a branch; cost of a wrong tag is a one-line edit.

---

## Status and Open Items

This record is `active`. The classification manifest (139 core / 104 tool / 371 personal / 155 archived, of 769 files) and the execution steps live in `odd/handoffs/2026-06-09-scope-audit-execution.md`. Open: ~29 file-level classification decisions plus three cross-cutting forks (the writing-vertical cluster, the vodka/oddkit-architecture principles, and the `AGENTS.md` split); the `universality` second-pass tagging that requires reading the ODD spine; and confirmation of the current epoch. `DEAD`/archive files (`docs/archive`, the apocrypha PDF) are explicitly out of scope and remain in place.
