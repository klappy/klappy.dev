---
uri: klappy://canon/principles/contract-governs-handoff-drift
title: "Contract Governs Handoff Drift — Canon Wins When Session Artifacts Disagree"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "governance", "drift", "handoff", "ledger", "canon-authority", "source-of-truth", "contract", "vodka-architecture"]
epoch: E0008.3
date: 2026-04-20
derives_from: "canon/principles/vodka-architecture.md, canon/principles/dry-canon-says-it-once.md, canon/principles/prompt-over-code.md, canon/values/axioms.md, odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed.md, odd/ledger/2026-04-20-p1-3-2-gate-canary-landed.md, odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed.md"
complements: "canon/constraints/release-validation-gate.md, canon/constraints/oddkit-prompt-pattern.md, canon/bootstrap/model-operating-contract.md"
governs: "All conflicts between session-scoped artifacts (handoffs, ledgers, PRDs, scratch notes) and tier-1 / tier-2 canon. Binding on every orchestrator: when a session artifact recommends a path that contradicts canon, canon wins, full stop."
status: active
---

# Contract Governs Handoff Drift — Canon Wins When Session Artifacts Disagree

> Session ledgers and handoffs are records of one session's judgment under one session's pressures. Canon is the program's binding contract, refined across many sessions and many incidents. When the two disagree, canon wins. The orchestrator that follows a session-scoped recommendation over a canon-level rule has substituted personal judgment for the program's accumulated wisdom — which is exactly what canon exists to prevent. The graduation test for this principle was satisfied painfully: P1.3.1 named it implicitly, P1.3.2 named it explicitly with three documented recurrences, and P1.3.3 demonstrated its absence costs by shipping two prod bugs precisely because a session ledger's recommendation was followed over the bootstrap contract's tier-1 rule.

---

## Summary — Canon Outranks Every Session Artifact Without Exception

Session artifacts — handoffs, ledgers, PRDs, scratch notes, post-mortems — are valuable. They capture context, surface lessons, and let one session hand state to the next. They are not, however, sources of binding governance. When a session artifact recommends a path that contradicts canon, the orchestrator follows canon and surfaces the contradiction so canon can be amended if the session's judgment was actually right.

This principle inverts a common temptation: when a session ledger written by a thoughtful prior orchestrator recommends a particular path ("Option A is fine for this scope," "Bugbot is non-blocking," "this release is small enough to skip the validator"), the next session feels social pressure to honor that recommendation. The pressure is misplaced. The prior session's recommendation is one data point under that session's pressures; canon is the contract refined across many. Canon wins.

The principle is not anti-ledger. Ledgers are essential — they are how learnings propagate, how rationale persists, how patterns become visible. The principle is about what a ledger CAN and CANNOT do. A ledger can describe, recommend, observe, and propose. A ledger cannot override canon. If the ledger's recommendation is genuinely better than canon's rule, the disposition is to amend canon, not to ignore canon. Canon amendment is a bounded, reviewable act; canon ignorance is unbounded and corrosive.

---

## What Canon Means In This Program

For purposes of this principle, "canon" is the set of documents in `klappy/klappy.dev` under:
- `canon/values/` (tier-1 axiomatic)
- `canon/principles/` (tier-1 or tier-2 principles)
- `canon/constraints/` (tier-1 binding rules)
- `canon/bootstrap/` (the operating contract fetched on session start)

These documents have governance authority. They are versioned, peer-reviewed (or self-reviewed under the writing-canon gate), and stable across sessions. Changes go through canon PRs.

"Session artifacts" are everything else that captures session work:
- `odd/handoffs/` (forward-looking transitions)
- `odd/ledger/` (retrospective records)
- Working-directory PRDs (ephemeral planning artifacts)
- Inline reasoning in chat (transient)
- Sonnet validator reports (single-session findings)

These artifacts have observational authority — they describe what happened and recommend what to do next. They do not have governance authority.

The line between the two is enforced by location, frontmatter (tier field), and ownership. A document under `odd/ledger/` cannot grant itself canon-level authority by claiming so in its body. A document under `canon/constraints/` carries that authority by virtue of its location and tier-1 frontmatter.

---

## The Three Recurrences That Earned Graduation

The graduation test for a candidate canon principle is three deciding-argument recurrences — three decisions where the principle is the load-bearing reason, not three appearances of the pattern.

**Recurrence 1 — P1.3.1 (oddkit 0.19.0, implicit).** The P1.3.1 closeout ledger named the principle in passing as part of the carry-list: "ground framing in code + canon, not the latest handoff." The decision the principle drove was minor (whether to trust a handoff's claim about what shipped or to grep main directly), but the framing was correct: source-of-truth hierarchy puts code/canon above handoff narrative. Implicit recurrence; the principle was named but not yet load-bearing for a major decision.

**Recurrence 2 — P1.3.2 (oddkit 0.20.0, explicit).** The P1.3.2 closeout ledger documented three explicit appeals to the principle in a single session: (a) trusting parser-test bytes over handoff function-name claims when the handoff said `discover*` and the code said `fetch*`; (b) trusting current code state over handoff line-number claims when the line numbers had drifted; (c) using the principle as the standing rule that grounded the orchestrator's decision to git-pull main first before reading any handoff content. First explicit recurrence; principle was load-bearing for three decisions across one session.

**Recurrence 3 — P1.3.3 (oddkit 0.21.0, explicit-via-failure).** The P1.3.3 orchestrator violated the principle and shipped two prod bugs. The P1.3.2 closeout ledger had recommended Option A (smoke-heavy attestation, no Sonnet 4.6 validator dispatch) for P1.3.3 with the explicit caveat that smoke-only should not become the default. The bootstrap contract said validate before declaring done, with context break. The session-scoped recommendation contradicted the canon-level rule. The orchestrator picked the recommendation and shipped 0.21.0 to prod. Cursor Bugbot subsequently caught two real findings (one medium-severity prod regression breaking the strictly-additive invariant) that the orchestrator's same-session smoke and self-call had not surfaced. The structural fix was 0.21.1 plus the writing of this principle and its companion `klappy://canon/constraints/release-validation-gate`. Recurrence three is satisfied by demonstrating that the principle's absence costs.

The third recurrence was painful but it was the right kind of painful — the kind that produces durable canon rather than ephemeral lesson. P1.3.3's process failure is documented in full at `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed`.

---

## How Conflicts Get Resolved

When the orchestrator notices a conflict between a session artifact and canon — or between a recommendation and a tier-1 rule — the resolution sequence is:

**Step 1 — Identify the conflict explicitly.** Name what the session artifact recommends. Name what canon binds. Quote both. Do not let the conflict stay implicit; implicit conflicts get resolved by convenience.

**Step 2 — Default to canon.** Until canon is amended, canon binds. The orchestrator follows canon and proceeds. The session artifact's recommendation is recorded as a deviation, not acted on.

**Step 3 — Surface the deviation.** In the closeout ledger or in a follow-up handoff, name the conflict explicitly: *"The P1.3.2 ledger recommended X; canon binds Y; this session followed canon Y and surfaces the conflict for canon-level review."* This produces an audit trail and gives the next session a clear handoff.

**Step 4 — Propose canon amendment if the session's judgment was right.** If the session-scoped recommendation was genuinely better than canon's rule, propose a canon amendment in a separate PR. The amendment is a bounded, reviewable act. Canon authority lives where canon authority can be reviewed; sneaking changes via session ledgers bypasses review.

**Step 5 — If the amendment is rejected, the canon's rule was right.** The orchestrator's correct path was to follow canon, even when the prior session's recommendation said otherwise. The deviation record from step 3 becomes the evidence that canon held.

This is not rigid. It is structured. Rigidity would be "never deviate from canon under any circumstances." Structure is "deviate only via amendment, not via ignorance." The difference is auditability.

---

## What This Principle Does NOT Say

**It does not say session artifacts are unimportant.** Ledgers, handoffs, PRDs, and validator reports are essential to how this program works. They capture context that canon cannot. They surface lessons in the moment. They let sessions hand state to each other. The principle is not anti-ledger; it is anti-ledger-as-binding-governance.

**It does not say canon is always right.** Canon evolves. Canon has bugs. Canon can be wrong. The principle says: when canon is wrong, the disposition is to amend canon, not to ignore canon. Amendment is reviewable; ignorance is invisible.

**It does not say recommendations are bad.** A session ledger that says "Option A is fine for next time" is a useful data point and may genuinely save the next session time. The principle says: the next session's orchestrator must verify the recommendation against canon before acting on it. If canon binds the orchestrator to Option B, Option B is what ships, even when Option A would have been faster.

**It does not say the orchestrator must love this rule.** Following canon when a thoughtful prior session's ledger says otherwise feels like ignoring expertise. It is not. It is preserving the audit trail that lets canon evolve under review rather than via drift.

---

## Where This Principle Bites Hardest

This principle is uncomfortable in three predictable situations:

**Time pressure.** A session under wall-clock pressure feels the pull to follow whichever path is faster. When the faster path is the session-scoped recommendation and the canon-bound path is slower (e.g., dispatching a Sonnet validator that takes 5 minutes vs. running a smoke that takes 30 seconds), the principle binds against time. The orchestrator's preferences do not get to override canon because canon is inconvenient.

**Authority pressure.** A handoff or ledger written by a thoughtful prior orchestrator carries social weight. Following its recommendation feels respectful; deviating feels like second-guessing. The principle says: respect for the prior orchestrator looks like protecting the audit trail, not like rubber-stamping their judgment. If their judgment was canon-worthy, it goes in canon. If it didn't make it into canon, it's a recommendation, and recommendations don't bind.

**Scope-justified shortcuts.** "This release is small enough to skip the validator." "This change is too minor to bother Bugbot." "We've shipped 12 of these patterns; the 13th doesn't need re-review." The principle binds against scope-justified shortcuts. Canon does not have a scope clause unless canon explicitly writes one. If canon binds for "any PR to oddkit main," the rule binds for the smallest PR as much as for the largest. Scope-based exceptions go through canon amendment, not through orchestrator judgment.

---

## Related Canon

- **[Vodka Architecture](klappy://canon/principles/vodka-architecture)** — the server stays thin; canon enforces. This principle protects the canon-as-source-of-truth invariant by refusing to let session artifacts compete for governance authority.
- **[DRY — The Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once)** — if governance lives in two places (canon AND a session ledger), the two can drift. The principle here is the disposition rule when they have already drifted: canon wins; ledger gets reconciled or amended.
- **[Prompt Over Code](klappy://canon/principles/prompt-over-code)** — governance is fetched at runtime, never baked in. This principle extends the rule: governance is fetched from canon, not from session artifacts that happen to be in the orchestrator's context window.
- **[Release Validation Gate](klappy://canon/constraints/release-validation-gate)** — the constraint Rule 3 of which is a direct application of this principle to the release pipeline. The two were written together because P1.3.3's process failure required both to prevent recurrence.
- **[Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context)** — same author, same session, accumulated context degrades judgment. This principle is the meta-rule for when session-context-degraded judgment (recorded in a ledger) tries to override fresher canon.
- **[Model Operating Contract — Bootstrap](klappy://canon/bootstrap/model-operating-contract)** — fetched on every session's first turn. The bootstrap names "search canon before claiming" as non-negotiable; this principle is what to do when canon search returns a result that contradicts a session artifact already in context.

---

## See Also — The Three Deciding-Argument Recurrences

- `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed` — implicit recurrence; principle named in carry-list.
- `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed` — first explicit recurrence; three load-bearing applications in one session.
- `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed` — third recurrence via demonstrated cost: the principle's absence let a session ledger's recommendation override canon, shipping two prod bugs that an independent validator would have caught.
