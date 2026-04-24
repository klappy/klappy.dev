---
uri: klappy://odd/ledger/2026-04-24-aquifer-session-principles-graduated
title: "Ledger — Two Canon Principles Graduated From The aquifer-mcp J-002 → H11b Session"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["ledger", "canon-promotion", "graduation", "aquifer-mcp", "type-contract-plus-adversarial-review", "partial-data-with-transparency-and-background-warm", "manual-enforcement", "fresh-context-validation", "epoch-E0008.3"]
epoch: E0008.3
date: 2026-04-24
derives_from: "canon/principles/contract-governs-handoff-drift.md, canon/principles/cache-fetches-and-parses.md, canon/principles/verification-requires-fresh-context.md, canon/constraints/release-validation-gate.md"
complements: "canon/principles/type-contract-plus-adversarial-review.md, canon/principles/partial-data-with-transparency-and-background-warm.md"
governs: "The graduation arc for the two canon principles promoted 2026-04-24 from the aquifer-mcp J-002 → H11b session handoff."
status: active
session_span: "2026-04-24 closed"
---

# Ledger — Two Canon Principles Graduated From The aquifer-mcp J-002 → H11b Session

> A handoff arrived from a prior session on klappy/aquifer-mcp documenting four PRs that transformed a production 503 cascade on the `entity` tool into a principle-aligned partial-response architecture. The handoff nominated three candidate principles and recommended promoting only one. A fresh-context validation pass flagged that the strict letter of the graduation test (three deciding-argument recurrences) was not cleanly satisfied by the handoff's count on any candidate. The operator reframed: the three candidates had been *manually enforced* across the session — multiple PRs, adversarial review dispositioned each time, operator-stated principles cited as deciding arguments. Manual enforcement is deciding-argument recurrence. Two principles graduated; one held for further recurrence.

---

## Summary — The Reframe, The Count, The Graduation

A handoff pair landed in this session at 2026-04-24T03:10Z — a DOLCHEO ledger dump and a companion prose handoff — from a prior session spanning 2026-04-22T00:17Z to 2026-04-24T02:48Z on klappy/aquifer-mcp. The prior session took a production 503 cascade on the `entity` tool (Cloudflare Worker OOM on a 255-subrequest unbounded fan-out), traced it to root cause, shipped four PRs, and produced an architecture aligned with a principle the operator had stated verbatim during the session: partial data with transparency, background warm.

The handoff proposed three candidate principles for canon graduation and recommended promoting only one (`type-contract-plus-adversarial-review`). The prior Claude wrote the handoff carefully and deferred the promotion decision to a fresh-context reader.

This session, being that fresh-context reader, validated the handoff against the graduation test at `klappy://canon/principles/cache-fetches-and-parses#The Graduation` and found all three candidates below the strict letter of the bar — the prior count conflated appearances with deciding arguments. The operator reframed immediately: *"There were principles enforced manually that are worth promoting to governance."* Manual enforcement across a session — multiple PRs, adversarial review dispositioned each time, operator-stated principles cited as deciding arguments for architecture choices — is itself the deciding-argument recurrence the graduation test names. The principles had graduated during the session; this session records the graduation formally.

Two principles promoted to canon in this session:
- `klappy://canon/principles/type-contract-plus-adversarial-review`
- `klappy://canon/principles/partial-data-with-transparency-and-background-warm`

One principle held for further recurrence:
- `observe-before-you-fix-the-wrong-axis` — one explicit enforcement (H11 → H11b pivot), distinct from Axiom 4 but not yet canon-ready.

---

## How The Graduation Was Validated

The prior Claude's handoff applied the graduation test cautiously — counting the three Bugbot-adjacent events in the session (the J-003 9-finding arc, the J-005 `ctx` ReferenceError, the esbuild-transpile-only observation) as three recurrences of `type-contract-plus-adversarial-review`. This session's fresh-context read of `klappy://canon/principles/cache-fetches-and-parses#The Graduation` noted the bar is stricter than "the pattern appeared three times" — it is "the pattern was the *reason* for three decisions."

The validation finding: under the strict letter of the bar, the handoff's first two recurrences were Axiom-4-driven (the type was introduced because partial completeness must be disclosed per Axiom 4; the paired pattern's role was *demonstrated by* Bugbot's catches, not *reason for* the type). The third recurrence was an observation about the pattern's boundary condition, not a decision made because of the pattern.

The operator's reframe corrected this reading. The orchestrator in the aquifer-mcp session had been *manually enforcing* the paired pattern across multiple PRs — each PR opened with the expectation that Bugbot would be dispatched and its findings dispositioned before merge, each decision to route findings as fix-forward or waive with reason was a load-bearing use of the pattern, and the orchestrator's acceptance of blocks like the J-005 `ctx` finding was itself a deciding-argument application. The orchestrator was not invoking the pattern once and hoping it held; the orchestrator was treating the pattern as binding for every PR in the session.

Under the reframe, each manual enforcement across the four PRs is a deciding-argument recurrence. Both principles cleared the bar:

- `type-contract-plus-adversarial-review` — enforced in PR #18 (BootstrapEntityResult + 9 Bugbot findings), PR #20 (FanOutEntityResult + High-severity `ctx` block), and across PRs #17/#19/#20 as the operating pattern under the esbuild-transpile-only pipeline constraint. Three distinct deciding-argument applications in one session.

- `partial-data-with-transparency-and-background-warm` — implicit prior art in `refreshAndUpdateCurrentIndex` (aquifer-mcp `src/registry.ts`), explicit reason-for-architecture-pivot in H11 → H11b (PR #20), and meta-level deciding argument in the operator reframe that produced this ledger. Three distinct deciding-argument applications, one spanning the full arc from implicit to explicit to graduation-promotion.

- `observe-before-you-fix-the-wrong-axis` — one explicit enforcement only. Held for further recurrence.

---

## The Canon PRs

Two separate PRs were opened against klappy/klappy.dev, one per principle, each carrying only its own canon doc. This preserves the ability to land, revert, or iterate on either independently.

**PR — `canon/principles/type-contract-plus-adversarial-review.md`**
- Branch: `feat/canon-type-contract-plus-adversarial-review`
- Body: writing-canon checklist attestation, frontmatter-schema compliance statement, three-recurrence evidence summary, release-validation-gate Rule 1 attestation (Bugbot wait + disposition) and Rule 2 attestation (fresh-context Sonnet 4.6 validator dispatched, findings dispositioned).

**PR — `canon/principles/partial-data-with-transparency-and-background-warm.md`**
- Branch: `feat/canon-partial-data-with-transparency-and-background-warm`
- Body: same attestation structure.

Both PRs explicitly carry the release-validation-gate disposition because the gate's `governs` clause includes "klappy.dev canon PRs that change governance documents the worker reads at runtime." New canon docs are additive but still fall under that scope by default; per the gate's "ambiguous cases default to load-bearing" guidance, the validator dispatch is treated as required.

---

## What This Graduation Does NOT Do

**It does not retroactively change the aquifer-mcp session's ledger entries.** J-002 through J-006 remain as the record of one session's work. This graduation is a forward action: two principles now exist as canon and are citable by future sessions. The aquifer-mcp ledger entries continue to describe what happened; this ledger entry describes what the program learned from them.

**It does not close the open items on the aquifer-mcp handoff.** H15 (24-48h observability monitoring), H16 (delete `bootstrapEntityMatches` after H15 clears), H12 (audit other unbounded fan-outs), H13 (long-lived Cloudflare Workers Observability token) remain as aquifer-mcp-project carry-forwards. They are tracked at the source project, not here.

**It does not promote `observe-before-you-fix-the-wrong-axis` to canon.** One explicit recurrence (H11 → H11b) is below the bar even under the manual-enforcement reframe, because the recurrence was a single pivot decision rather than a pattern sustained across multiple decisions. It is captured as an open candidate; watch for recurrence across future sessions that would graduate it.

---

## Forward-Pointing Open Items

**O-open (P2) — Monitor for a third recurrence of `observe-before-you-fix-the-wrong-axis`.** Capture it as a ledger observation in any future session where a fix targets a named failure symptom rather than the actually-felt failure axis. At two more recurrences under the manual-enforcement reframe, or two more under the strict letter of the bar, the principle graduates.

**O-open (P3) — Consider cross-referencing the two new canon principles from `canon/constraints/release-validation-gate`.** The gate's Rule 1 (Bugbot findings are non-waivable without disposition) is the mechanical enforcement of `type-contract-plus-adversarial-review`'s adversarial-review leg. Adding a see-also link in the gate would make the design rationale discoverable from the enforcement.

**O-open (P3) — Consider a `canon/meta/` doc on the manual-enforcement path to graduation.** The operator's reframe here (manual enforcement across multiple session PRs = deciding-argument recurrence) is itself a graduation-pattern observation. If future sessions produce similar reframes, a meta-level doc on "what counts as a deciding-argument recurrence" would be useful. One recurrence so far; hold.

---

## Related Canon

- **[Contract Governs Handoff Drift](klappy://canon/principles/contract-governs-handoff-drift)** — the handoff recommended promoting only one principle; canon's graduation test (under the operator's reframe) supported promoting two. Canon-side reasoning won, but the handoff's careful recurrence counts were valuable input for the reframe.
- **[Release Validation Gate](klappy://canon/constraints/release-validation-gate)** — binding on both canon PRs in this graduation; the gate's `governs` clause explicitly includes klappy.dev canon PRs.
- **[Cache Fetches And Parses](klappy://canon/principles/cache-fetches-and-parses)** — the precedent for the graduation test structure used in both new principle docs.
- **[Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context)** — why a fresh session (this one) was structurally eligible to validate the prior session's handoff.
- **[Type Contract Plus Adversarial Review](klappy://canon/principles/type-contract-plus-adversarial-review)** — the first principle graduated in this ledger entry.
- **[Partial Data With Transparency And Background Warm](klappy://canon/principles/partial-data-with-transparency-and-background-warm)** — the second principle graduated in this ledger entry.
