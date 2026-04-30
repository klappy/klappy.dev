---
uri: klappy://canon/principles/code-claims-require-code-observation
title: "Principle — Code Claims Require Code Observation (Canon Does Not Govern Reality)"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "principles", "code-observation", "verification", "reality-is-sovereign", "you-cannot-verify-what-you-did-not-observe", "anti-staleness", "epistemic-discipline", "audit-2026-04-30"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/principles/dry-canon-says-it-once.md, canon/principles/vodka-architecture.md, canon/observations/time-blindness-axiom-violation.md"
complements: "canon/constraints/release-validation-gate.md, canon/principles/contract-governs-handoff-drift.md, canon/methods/supersession.md"
governs: "Any claim that asserts what running code currently does. Architecture briefs, handoffs, ledgers, READMEs, essays, design docs, and prompt-side context all fall under this principle when they describe code behavior."
status: active
---

# Principle — Code Claims Require Code Observation

> Canon governs *what should be*. Code observation is the only ground for claims about *what currently is*. A claim of the form "the parser still hardcodes X," "the worker currently does Y," "tool Z does not yet read governance," is a debt that cannot be paid by reading another canon document — it can only be paid by reading the code at HEAD. Citing canon as evidence of code state is laundering inference into authority. Reality Is Sovereign; canon is not.

---

## Summary — Why This Constraint Exists

Canon documents are durable. Code is not. A canon document that describes code behavior is correct only at the moment it is written, against the commit it was written against. Every subsequent reader who treats that document as authoritative without re-verifying against current code is one link further from observation. After enough links, a stale claim has the social weight of consensus and the actual weight of zero — but the system can no longer tell which.

This is the failure mode that caused the Audit 2026-04-30 cleanup. An architecture brief in `klappy/truthkit-kb` was written on 2026-04-16 against an encode parser state that PR #96 in `klappy/oddkit` retired the same day. The brief described that retired state as the current problem. The brief was cited by P1.3.4's H-01 handoff (2026-04-20) as authoritative on current code state. P1.3.4's handoff was cited by user memory. User memory was cited by the model in a planning conversation (2026-04-30) without anyone in the chain reading the actual code. Phase 1 of E0008.4 then propagated the stale framing into oddkit canon, where it sat for less than an hour before the operator caught the inconsistency and asked the model to read the code. By that point, three published canon artifacts had been written against fiction.

The chain failed at every link, but no individual link was negligent in the conventional sense — each one trusted its source, which trusted its source, which trusted its source. The structural fix is to refuse to ratify any code-state claim without an independent code observation. Canon is not allowed to be the only evidence for a claim about what code does.

---

## The Test

Before any assertion of the form "the X currently does Y," ask: did I read the code, or did I read a document that told me the code does Y? If the latter, the assertion is unverified. Refuse it, or read the code.

This is not pedantry. It is the same axiom as `klappy://canon/observations/time-blindness-axiom-violation` ("never substitute inference for observation"), applied to the code surface. The axiom doesn't care whether the inference came from chronological context, social context, or document context. Inference is not observation, ever, regardless of how authoritative its source feels.

---

## Practical Application

**For any canon document that describes code behavior:** include `describes_state_at: <commit_sha or version_tag>` in frontmatter. Future readers can compare against current HEAD and detect potential staleness mechanically. (`oddkit_audit` may eventually surface this; not blocking on that.)

**For any model conversation in execution mode:** before claiming "the tool does X," fetch the code. `git clone --depth 1` is cheap. `curl https://api.github.com/.../contents/path` is cheaper. No claim about code state may be sourced exclusively from canon, ever.

**For any model conversation in planning mode:** when a handoff or architecture brief asserts a code-state claim, treat it as a hypothesis to verify, not a fact to plan around. The cost of one code read is nothing compared to the cost of planning a refactor of code that has already been refactored.

**For any author of a new canon document:** if the document makes a claim about current code state, cite the commit you read. Do not cite another document that made the claim before you. Re-observe.

---

## Anti-Patterns This Principle Forbids

- "The parser currently does X." (Source: another canon document.)
- "The tool still hardcodes Y." (Source: a handoff written six versions ago.)
- "The worker doesn't yet read governance from canon." (Source: an architecture brief from a different repo, written the same day a PR resolved that exact problem in this repo.)
- "Per the existing implementation, Z is the case." (Source: a README that was last updated two minor versions ago.)

In every case, the fix is the same: read the code. Then either ratify the claim or correct it.

---

## Anti-Patterns This Principle Permits

- "Per `canon/principles/vodka-architecture`, the design intent is that..." — canon governs intent.
- "The release-validation-gate constraint requires..." — canon governs constraints.
- "DOLCHEO defines seven dimensions..." — canon governs definitions.
- "The handoff at klappy://... names the scope as..." — canon governs scope statements.

Canon governs intent, constraint, definition, plan, decision. Canon does not govern code behavior. Two different epistemic categories. Do not collapse them.

---

## Relationship to Existing Canon

This principle complements rather than replaces:

- **Reality Is Sovereign** (Axiom 1) — the foundational version of this rule across all domains. This principle applies it specifically to the code-vs-canon interface.
- **You Cannot Verify What You Did Not Observe** (Axiom 4) — the verification half. This principle names the most common shape of the violation: substituting document-reading for code-reading.
- **DRY: Canon Says It Once** (`klappy://canon/principles/dry-canon-says-it-once`) — protects canon from self-redundancy. This principle protects canon from claiming authority it doesn't possess.
- **Vodka Architecture** (`klappy://canon/principles/vodka-architecture`) — the structural reason canon must not embed code claims: canon is meant to be slow and stable; code is meant to be fast and replaceable. Mixing the two corrupts both.
- **Time-Blindness Axiom Violation** (`klappy://canon/observations/time-blindness-axiom-violation`) — the observation that motivated the `oddkit_time` first-call rule. This principle is the same shape: substituting inference for observation, this time for code state instead of clock state.

---

## How This Principle Was Earned

Audit 2026-04-30 traced six links of citation across two repositories before any reader stopped to verify. The architecture brief was correct on the day it was written, stale within hours, and cited as authoritative for two weeks. PR #157 (E0008.4 Phase 1) shipped the stale framing into klappy.dev canon before the operator's question — "Why wasn't the journal included?" — opened the second-order audit that found the deeper rot. The cleanup PR that this principle ships within supersedes three artifacts and adds this constraint so the same chain cannot form again without immediate detection.

The lesson is not that the original brief was wrong. The lesson is that no document, no matter how recent or authoritative, can substitute for direct observation of code state. Code state moves; canon does not.

---

## See Also

- [Audit 2026-04-30 Cleanup Ledger](klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed) — the cleanup that earned this principle
- [Reality Is Sovereign](klappy://canon/axioms/reality-is-sovereign) — Axiom 1
- [You Cannot Verify What You Did Not Observe](klappy://canon/axioms/verify-what-you-observed) — Axiom 4
- [DRY: Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once) — companion principle on canon's epistemic role
- [Time-Blindness Axiom Violation](klappy://canon/observations/time-blindness-axiom-violation) — same-shape violation in a different domain
