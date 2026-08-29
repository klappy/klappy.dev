---
uri: klappy://canon/bootstrap/any-seat-boarding-recipe
kind: canon
title: "The Any-Seat Boarding Recipe — A Three-Layer Disclosure Ladder Any Harness Can Consume"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: experimental
tags: ["bootstrap", "boarding", "disclosure-ladder", "progressive-disclosure", "multi-seat", "harness-agnostic", "crew-not-clone", "E0010"]
epoch: E0010
date: 2026-08-29
derives_from: "canon/bootstrap/generic-boarding-pass.md, canon/bootstrap/flight-deck-model.md, canon/bootstrap/model-operating-contract.md, canon/methods/document-routing-tests.md"
complements: "writings/crew-not-clone.md, docs/examples/project-instructions-template.md"
governs: "The minimal, harness-agnostic boarding block — shim, prompt, corpus — any runtime (chat harness, coding agent, CI job, voice runtime) consumes to seat an agent over a governed knowledge base. Generic by construction; operator specifics stay in the operator's working-conventions repo."
constraint: "Experimental (E0010 family). The multi-seat and non-blocking-ignition patterns rest on one operator's practice as of this date — a bet under the routing tests' T3 gate, deliberately NOT tagged for core extraction until a second independent adoption exists. The binding procedure remains canon/bootstrap/model-operating-contract; where they diverge, the contract governs."
---

# The Any-Seat Boarding Recipe — A Three-Layer Disclosure Ladder Any Harness Can Consume

> The generic boarding pass gave any adopter the seat: creed and axioms
> operated under rather than worn, board-before-work, fetch-live governance,
> the two-way cross-check, the clock rule. This recipe adds the *shape* that
> makes boarding survive small context windows, many harnesses, and many
> seats at once: **progressive disclosure at the prompt level — each session
> pulls only the threads relevant to the task at hand.** One thin shim in
> the harness, one full prompt in the repo, one corpus behind it. The
> operator instance this was derived in is cited as proof, never as subject.

---

## Summary — The Ladder Is the Recipe

A boarding text that tries to carry everything either overflows the harness
settings box or goes stale the day a rule changes. The cure is the same
progressive-disclosure contract governed knowledge bases already use for
retrieval, applied to the boarding prompt itself. Three layers, strictly
ordered, each pointing one rung down:

**L1 — the shim** lives in the harness (project instructions, system prompt,
CI env, a voice runtime's preamble). Ten to fifteen lines: who sits here
(the seats), the covenant (creed and axioms, stated — the one thing that
cannot be a fetch away), the fetch-pointer to L2, and the canon-wins clause.
Nothing else. Anything that grows in the shim migrates down.

**L2 — the full boarding prompt** lives in the operator's
working-conventions repo and is fetched on the first substantive turn. It is
the complete line check: read order, seat selection by recipe, custody,
dispatch/ignition behavior, memory discipline, capture duty, clock, register,
cross-check. Every section ends with its pointer deeper.

**L3 — the corpus** is the knowledge base itself: rulings, role recipes,
specs, journals, canon. Consulted at the moment of use, per task, never
preloaded. The corpus is the memory; the seat's local files are bootstrap
pointers, and every load-bearing remembered claim is verified at source.

## The Minimal Boarding Block — What Any Runtime Consumes

A harness boards a seat when it can do these six things, in order:

1. **Fetch** — reach the operator's governance (git checkout, MCP retrieval,
   or plain HTTPS). The checkout is the boarding door; a runtime that cannot
   read the repo has not boarded, whatever it remembers.
2. **Read in order** — the L2 prompt names the read order (charter → binding
   law → newest journal → live work state). Order is load-bearing: law
   before state, state before work.
3. **Seat by recipe** — roles are recipes in the corpus. The conversation
   names the seat(s); each boards from its own recipe. Multiple seats over
   one governed runtime are call signs, never personas; unaddressed input
   routes to the seat whose scope it plainly touches, and the routing is
   stated.
4. **Hold custody** — each seat's write surface is named in its recipe; an
   out-of-custody write is refused by name. Ignition never blocks the
   conversation: if the runtime can spawn, work rides spawned sessions
   carrying ticket custody (id, position, session pointer); if it cannot,
   it says so and degrades honestly.
5. **Capture before context dies** — an unwritten ruling cannot be routed;
   nothing load-bearing lives only in the transcript. Journal as turns land;
   never reconstruct at close.
6. **Observe, never infer** — the clock is read from an instrument every
   turn; claims carry citations; law is quoted from a fresh fetch, never
   paraphrased from memory. On conflict, the source wins instantly.

An adopter instantiates the ladder by writing their own L1 (swap in their
seats and their L2 URL), their own L2 (their read order and lanes), and
pointing L3 at whatever governance they already keep. At minimum the corpus
needs an operating contract for rung 1 to land.

## Proof — The Instance This Was Derived In

Operator instance, as evidence (criterion 5 of the core-boundary criteria:
proof, not subject): L1 = a Cowork project-instructions shim naming two
seats (a dispatcher and an expeditor); L2 = `cookbook/boarding/RECIPE.md` in
the operator's working-conventions repo, DRAFT pending the operator's
exact-text review; L3 = that repo's health code, role recipes and journals,
plus this canon via oddkit. The July 2026 predecessor
(`canon/bootstrap/generic-boarding-pass` + operating contract) is the one
*proven* rung of this lineage — a seat boarded cold from it and ran a fleet.
The multi-seat split, custody refusal, and non-blocking ignition are, as of
this writing, one day and one operator old: bets, honestly labeled, awaiting
their second proof before any core extraction.

## Relationship to the Other Bootstrap Documents

- `canon/bootstrap/model-operating-contract` — the binding procedure; this
  recipe is shape and pointers, the contract is the law.
- `canon/bootstrap/generic-boarding-pass` — the single-seat ancestor; still
  the right choice for one seat, one harness, no dispatch.
- `canon/bootstrap/flight-deck-model` — the why (crew, not clone).
- `canon/methods/document-routing-tests` — Gate 0 and the T3 bet gate this
  document's own constraint field obeys.
