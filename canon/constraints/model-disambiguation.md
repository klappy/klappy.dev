---
uri: klappy://canon/constraints/model-disambiguation
title: "Model Disambiguation — Bare 'Model' Is the LLM; Every Other Sense Carries a Qualifier"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: draft
tags: ["canon", "constraints", "terminology", "model", "disambiguation", "vocabulary", "prompt-over-code"]
epoch: E0010
date: 2026-07-17
derives_from: "canon/constraints/harness-disambiguation.md, odd/terminology.md, canon/bootstrap/model-operating-contract.md"
complements: "canon/constraints/ratified-model-requires-reconciliation-and-enforcer.md, canon/architecture/two-loop-operating-model.md, canon/decisions/models-do-not-mutate-canon.md, docs/decisions/D0002-attempt-provenance-required.md"
governs: "All canon, docs, and public-facing content that uses the word 'model'. Establishes which sense keeps the bare word and which senses must always carry a qualifier."
status: draft
target_repo: "klappy.dev"
---

# Model Disambiguation — Bare 'Model' Is the LLM; Every Other Sense Carries a Qualifier

> **Posture:** DRAFT — captain's pen. Filed 2026-07-17 as a proposed terminology
> constraint. Authored in the captain's voice; **do not merge until he reviews the exact
> text.** The disambiguation it proposes is a ruling to be ratified, not a fait accompli.

> "Model" carries at least four distinct meanings that sit side by side in this canon — the
> AI that boards, a ratified data/design model, an operating/architecture model, and a
> mental model. Two of them collide in a single title line: *The Flight Deck **Model** —
> How a **Model** Boards This System.* One convention settles it: **bare, unqualified
> "model" means the AI/LLM, and every other sense must always carry a qualifier.** The one
> sense that must leave the word entirely is the ratified data/design "model," because it
> is the sense most likely to shorthand to a bare "the model" and collide with the AI.

---

## Summary — The One Convention

The word is overloaded, but the fix is not four renames. It is one load-bearing rule plus a
single targeted rename:

**Bare "model" is reserved for the AI/LLM.** When a document writes "the model" with no
qualifier, it means the language model in the seat — `claude-opus`, `claude-fable-5`, the
thing the boarding pass boards. This sense keeps the word because it is the most entrenched
(`model_id`, "model provenance", the model-operating-contract) and because it matches the
industry's own usage. Renaming it would be gratuitous and expensive.

**Every other sense must always carry a qualifier** — "operating model", "flight deck
model", "mental model" — and must never appear as a bare "the model" where the AI reading is
available. These senses already tend to be compounded in practice, so the rule mostly
ratifies existing habit.

**The ratified data/design sense leaves the word "model" entirely**, renamed to **"design"**
(or **"schema"** when it is specifically a data schema). This is the sense that most
naturally shorthands to "a ratified model" / "the model froze" — colliding head-on with the
AI sense — and it is the least entrenched, so the migration cost is near zero if done now
while its home documents are still unmerged drafts.

---

## The Four Meanings

**Model (AI) — KEEPS the bare word.** The language model that takes the first officer's
seat. Canonical uses: `model_id`; "every attempt must capture **model** provenance … to
enable meaningful comparison between AI **models**" (`docs/decisions/D0002`); "**Models** do
not mutate the operator's canon" (`canon/decisions/models-do-not-mutate-canon`); "how a
**model** works inside this system" (`canon/bootstrap/model-operating-contract`); "How a
**Model** Boards This System" (`canon/bootstrap/flight-deck-model`). This is the primary,
unqualified meaning.

**Design / schema (ratified) — RENAMED off "model".** A ruled data model, schema, or design
invariant the code must honor. Current uses: "when the captain rules a data/design
**model**, the implementation MUST be reconciled to that **model**"
(`ratified-model-requires-reconciliation-and-enforcer`, DRAFT PR #288); "The Canon Storage
**Model**" (`odd/decisions/D0002-canon-storage-model`); the ARS `data-model` philosophy doc.
Under this constraint the term becomes **ratified design** (or **ratified schema**).

**Operating model / architecture model — KEEPS the word, always compounded.** A framework or
architectural frame. Uses: "The Two-Loop Operating **Model**" (`two-loop-operating-model`,
DRAFT PR #291); "The Flight Deck **Model**" (`canon/bootstrap/flight-deck-model`). Always
written as a compound noun phrase ("operating model", "flight deck model", "two-loop
operating model"), never as a bare "the model."

**Mental / conceptual model — KEEPS the word, always compounded.** An explanatory device.
Uses: "a one-page **mental model** for the ODD system" (`odd/orientation-map`); "The Intern —
A **Mental Model** for Starting with AI" (`writings/the-intern`); "the **mental model**
behind attempts" (`docs/attempts`); "ODD's **mental model** and conceptual architecture"
(`odd/decisions`). Standard English; always qualified.

---

## When to Use Which

**Use bare "model"** only for the AI/LLM. If a sentence could be read as either the AI or
something else, and you mean the AI, "model" alone is correct.

**Never write a bare "the model" for a design, schema, operating model, or mental model.**
Add the qualifier every time. A data-schema document that shorthands its subject to "the
model" is the exact collision this constraint exists to prevent.

**Use "design" or "schema"** — never "model" — for a ruled data/design invariant. "The
ratified design", "the ratified schema", "reconcile the code to the design."

**Use "operating model" / "flight deck model" / "the two-loop operating model"** for the
architecture sense — always the full compound.

**Use "mental model" / "conceptual model"** for the explanatory sense — always the full
compound.

---

## Apply-Scope — What Changes

The blast radius is deliberately small, and smallest if ruled while PR #288 and PR #291 are
still open drafts:

- **PR #288** (`ratified-model-requires-reconciliation-and-enforcer`, unmerged) — rename to
  `ratified-design-requires-reconciliation-and-enforcer`: URI, title, the `data-model` tag,
  and the body's "ratified model" / "data/design model" → "ratified design". Cost ≈ zero
  while unmerged.
- **PR #291** (`two-loop-operating-model`, unmerged) — keeps its title (compound "operating
  model" is compliant); update only its cross-references to #288's new URI. Cost ≈ zero
  while unmerged.
- **This document** — the new home of the rule; mirrors `harness-disambiguation`.
- **`odd/terminology`** — add one row to the Disambiguation Table pointing here (reference,
  not duplicate, per that document's own rule).
- **No change** to `model_id`, `docs/decisions/D0002` (model provenance),
  `models-do-not-mutate-canon`, `model-operating-contract`, or `flight-deck-model`'s title.
  The AI sense keeps the word; its blast radius is zero.
- **Adjacent, lower priority (different repo):** `agent-role-service`'s
  `ars-data-model-philosophy` could later align to "design/schema", but "data model" is a
  legitimate industry term of art and this is out of klappy.dev's immediate scope.

---

## Relationship

- Mirrors `klappy://canon/constraints/harness-disambiguation` — the in-canon precedent for
  disambiguating an overloaded term with a "when to use which" ruling. This is the same
  pattern, applied to "model."
- Homed against `klappy://odd/terminology` — the constrained-vocabulary glossary, which this
  document extends by reference.
- Protects the entrenchment recorded in `klappy://canon/bootstrap/model-operating-contract`
  and `klappy://docs/decisions/D0002-attempt-provenance-required` — the AI sense keeps the
  word.
- Coordinates with the two in-flight drafts that motivated it:
  `klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer` (PR #288)
  and `klappy://canon/architecture/two-loop-operating-model` (PR #291).

---

## Confidence and Falsifiability

**Confidence.** This is a proposed convention, not an empirical law. Its evidence is the
documented four-sense usage above and one direct in-canon precedent
(`harness-disambiguation`). It is offered for the captain's ruling.

**What would retract or narrow it.** If "design"/"schema" proves to lose a distinction that
"data model" carried (some readers hear "data model" as broader than "schema"), the rename
target narrows rather than the rule. If the always-qualified rule proves to cost more
friction than the collisions it prevents, it is narrowed to the documents where the AI
reading is genuinely available. A residual the captain should weigh: `model-operating-contract`
sits one directory from the "operating model" sense and a careless reader could conflate
"[the] model[-]operating contract" with "[the] operating[-]model contract" — the rule
resolves it (bare "model" = AI, so it is the AI's operating contract) but the adjacency is
real.
