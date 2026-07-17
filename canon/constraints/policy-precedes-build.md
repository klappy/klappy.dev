---
uri: klappy://canon/constraints/policy-precedes-build
title: "Policy Precedes Build — No Implementation Without a Ratified, Enforceable Governing Policy"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "governance", "policy-first", "prompt-over-code", "mode-discipline", "preflight", "fleet-wide"]
epoch: E0010
date: 2026-07-17
derives_from: "canon/values/axioms.md (Axiom 2 — A Claim Is a Debt; Axiom 4 — You Cannot Verify What You Did Not Observe), canon/principles/prompt-over-code.md, canon/bootstrap/model-operating-contract.md, canon/meta/constraint-driven-audits.md"
complements: "canon/constraints/release-validation-gate.md, canon/constraints/definition-of-done.md, canon/constraints/borrow-evaluation-before-implementation.md, docs/appendices/convention-requires-an-enforcer.md, odd/maturity.md, canon/principles/contract-governs-handoff-drift.md"
governs: "path STARTS WITH src/ OR path STARTS WITH products/ OR path STARTS WITH workers/ — every implementation, build, and deploy artifact in every project, every seat, every flight, fleet-wide. Applies to any change whose effect is a build/implementation/deploy, regardless of lane or repo."
generalizes: "PR #288 (ratified-model-requires-reconciliation-and-enforcer) — the model-specific instance of which this is the general rule."
status: active
---

# Policy Precedes Build — No Implementation Without a Ratified, Enforceable Governing Policy

> Nothing is built without a clear, ratified, enforceable policy that states what is being built and why. The order is design → policy (→ PRD) → build — never code-first. The policy must be precise enough that the implementation is *derivable* from it (self-building), and every build artifact must *cite* its governing policy URI (self-documenting). A build with no governing policy has nothing to be built *from* and no enforcer to catch the drift. This is not a per-task instruction the operator restates; it is fleet-wide canon that binds every seat, flight, and project automatically. Policy-first is universal in **order**; policy **weight** scales with project maturity.

---

## Summary — Why Code-First Has Nothing to Build From and No Enforcer to Catch the Drift

On 2026-07-16 the ARS monolith hit a `SQLITE_TOOBIG` freeze. The proximate error was a size limit; the structural cause was ordering. Code had run ahead of policy, so when the build wanted a governing intent to build *from*, there was none — and because no ratified policy existed, no enforcer could measure the drift between what was built and what was intended. The failure was not a missing check on one line of SQL. It was a build that never had a policy behind it, in a system whose entire premise is that governance is the law and code is derived from it (`canon/principles/prompt-over-code.md`).

This constraint encodes the operator's consistent build philosophy so it stops living in the operator's memory and starts living in canon: *the operator builds this way always, and should never have to say so per task.* "Policies first ensures all code is self-building and self-documenting" — self-building because a precise policy makes the implementation derivable, self-documenting because the code carries a pointer back to the policy that governs it. A convention to "write the policy first" is optional the moment attention lapses; a convention plus an enforcer is binding (`docs/appendices/convention-requires-an-enforcer.md`). This constraint supplies the enforcer.

The universality claim is about **order**, not **weight**. Policy-first does not mean production-grade rigor on a throwaway prototype — that would be the "rigor too early kills creativity" failure `odd/maturity.md` exists to prevent. It means every build, at every maturity level, is preceded by a governing policy whose weight matches the level: a Level 0 PoC may be governed by a single ratified sentence ("exploratory spike to learn X; success = the learning; non-authoritative"), while a Level 2 production build carries a full ratified policy and PRD. The order is invariant. The depth scales.

---

## WHAT — The Rule

On every project, no implementation, build, or deploy proceeds without a **ratified, enforceable governing policy** that states **what** is being built and **why**.

Three properties make the policy load-bearing rather than decorative:

1. **Ratified.** The policy is committed to canon (or the project's governance scope) and accepted by the authority for that scope, not held in conversation or memory. An un-ratified draft is not a governing policy.
2. **Derivable (self-building).** The policy is precise enough that a competent builder — human or model — can derive the implementation from it without re-litigating intent. If two builders would reasonably produce incompatible builds from the same policy, the policy is not yet precise enough to build from.
3. **Cited (self-documenting).** The build artifact references its governing policy URI. Code points back to the policy that governs it, so the policy and the implementation can be reconciled at any time.

The canonical order is **design → policy (→ PRD) → build**. Code-first is prohibited: no artifact whose effect is a build/implementation/deploy may be the first record of its own intent.

---

## WHY — The Rationale

Two forces converge here, and both are load-bearing.

**The incident.** The 2026-07-16 ARS `SQLITE_TOOBIG` freeze is the concrete cost of inverted order. Code ran ahead of policy; there was nothing to build *from* and no enforcer to catch the drift. (This constraint records the incident from the operator's account; the standalone incident report, if written, is the ARS policy-first principle being authored in parallel. Where that principle and this constraint overlap, this is the fleet-wide general rule and that is the ARS-scoped instance.)

**The philosophy.** This is how the operator builds, always. Under `canon/principles/prompt-over-code.md`, governance belongs in policy and documents; the server/build is the enforcer; the canon is the law; changing the law means writing a document, not changing the enforcer. That architecture only works if the policy exists *before* the code it governs. Policy-first is the ordering precondition prompt-over-code silently assumes. Encoding it removes the per-task restatement and makes compliance the default rather than an act of the operator's vigilance. Under Axiom 2 (a claim is a debt) a build is a claim about intent; without a cited policy that claim has no evidence backing it. Under Axiom 4 (you cannot verify what you did not observe) an intent that was never written cannot be verified against the build.

---

## ENFORCEMENT — Real, Not Aspirational

Per `canon/meta/constraint-driven-audits.md`, a constraint that cannot be audited against its governed artifacts is advice, not enforcement. This constraint declares a machine-resolvable governance scope (frontmatter `governs`), the named tests below, and a remediation vocabulary. It is enforced at three hooks, each wiring into machinery that already exists — extending it, not duplicating it.

### Hook 1 — The Mode Gate (planning → execution)

Entering **build/execution mode requires a cited, ratified governing policy.** This is a new named prerequisite on the existing planning → execution transition governed by `canon/bootstrap/model-operating-contract.md` ("At Mode Transitions") and read at runtime by `oddkit_gate` from `klappy://odd/gate/transitions` and `klappy://odd/gate/prerequisites`.

- Add prerequisite `ratified-governing-policy-cited` to the `planning → execution` (and any `→ execution`/build) transition in `klappy://odd/gate/prerequisites`.
- `oddkit_gate` returns a gap on that transition when no ratified governing policy URI is supplied in context. The gate is a contract, not a formality: no policy URI, no execution mode.
- `oddkit_preflight` — which fires before any execution step that produces an artifact — surfaces this constraint and **refuses to clear build mode** when the described work cites no ratified governing policy. "Make the call and proceed" (the bottleneck-respect rule) does not apply to *this* precondition: proceeding to build without a policy is the one uncertainty execution may not swallow, because it is the uncertainty this constraint exists to stop.

### Hook 2 — The Build-PR / CI Check

Every build/implementation PR must **reference its governing policy URI.** A PR/CI check **fails a build that cites none.**

- The check reads the PR body (and/or a required trailer such as `Governing-Policy: klappy://...`) and the changed files' scope. If the change matches this constraint's `governs` scope and no governing policy URI is present *and resolvable* via `oddkit_resolve`, the check fails.
- This composes with `canon/constraints/release-validation-gate.md` — the mechanical rules that bind every ship — as an additional, non-negotiable gate in the same "convention plus an enforcer is binding" family. It does not replace those rules; it sits alongside them.
- A failing check is remediated by one of the remediation actions below, never by waiving the requirement silently.

### Hook 3 — Generalize PR #288, Do Not Duplicate It

The already-drafted **PR #288 (`ratified-model-requires-reconciliation-and-enforcer`)** requires a ratified model to carry a reconciliation and an enforcer before it can be built against. That is the **model-specific instance**; this constraint is the **general rule** of which it is one case: *no build without a ratified, enforceable policy — for models, for the flat-records model, for anything.* PR #288 and the ratified flat-records model are cross-referenced here as the first concrete instances; their model-specific mechanics are **not** restated in this document. When both are active, this constraint governs the order and the enforcer *in general*, and #288 governs the model case *in particular*. Extend and point; never copy.

### Remediation Vocabulary

When a test fails, exactly one of:

- **author-policy** — no governing policy exists; write and ratify one before building.
- **cite-policy** — a ratified policy exists but the build does not reference it; add the `Governing-Policy` URI.
- **sharpen-policy** — a cited policy exists but is not precise enough for the implementation to be derived from it; tighten it until it is.
- **block-build** — the build proceeds to merge/deploy with no resolvable governing policy; the gate/CI check blocks it. This is the terminal action, not a warning.

---

## SCOPE

All projects, all builds, all seats, all flights — **fleet-wide.** Any change whose effect is an implementation, build, or deploy is in scope regardless of lane or repository. The machine-resolvable scope is declared in frontmatter `governs`.

**Maturity modulation (order is universal; weight scales).** Per `odd/maturity.md`, the *order* design → policy → build binds at every level; the *weight* of the policy scales with maturity. Level 0 / PoC: a single ratified sentence of governing intent suffices, and this constraint must not be used to impose production rigor on exploratory spikes. Level 1 / Pilot: a governing policy with explicit success criteria and tradeoffs. Level 2 / Production: a full ratified policy plus PRD, reconciled and enforced. What never scales down to zero is the *existence* of a ratified, cited policy before the build. There is no maturity level at which code-first is permitted.

**Not in scope:** pure exploration and planning that produce no build artifact (writing the policy itself, drafting a PRD, spikes explicitly labeled non-authoritative that are discarded, not shipped). The constraint governs the transition *into* building, not the thinking that precedes it.

---

## VERIFICATION — Named Tests (Pass/Fail)

Structural tests (automatable):

- **T1 — policy-cited (structural).** The build artifact/PR references a governing policy URI (e.g., a `Governing-Policy:` trailer or an explicit in-code/PR citation). *Fail → cite-policy or author-policy.*
- **T2 — policy-resolves (structural).** The cited URI resolves via `oddkit_resolve` to a ratified policy in the governing scope. *Fail → author-policy (if none) or fix the citation.*
- **T3 — gate-cleared (structural).** The session's planning → execution transition recorded the `ratified-governing-policy-cited` prerequisite as satisfied (preflight/gate evidence present). *Fail → block-build.*

Semantic tests (require judgment):

- **T4 — derivable (semantic).** The implementation is derivable from the cited policy: a reviewer reading only the policy could reconstruct the build's intent and would not produce an incompatible build. *Fail → sharpen-policy.*
- **T5 — precedence (semantic).** The policy was ratified *before* the build — the order was design → policy → build, not build-then-backfill-policy. *Fail → recorded as drift; the build's order is corrected forward and the incident noted.*

A build **satisfies this constraint** when: it cites its governing policy URI (T1), the URI resolves to a ratified policy (T2), the mode gate recorded the policy prerequisite before execution (T3), the implementation is derivable from the policy (T4), and the policy preceded the build (T5).

---

## Edge Cases — Where the Order Bends but Does Not Break

The strongest opposing view is real and must be answered, not waved away: *sometimes you must build now, and writing policy first is waste or worse.* Two cases, handled explicitly.

- **Emergency / incident response.** During a live incident (a P1 outage, a production freeze like the ARS `SQLITE_TOOBIG` event itself), the fix cannot wait for a full policy cycle. The order still holds, compressed: the responder cites a **named emergency governing policy** — a standing, ratified incident-response policy that authorizes bounded emergency builds — and the specific fix is reconciled to a proper governing policy **within a bounded window after the incident** (retroactive ratification). The emergency policy *is* the ratified policy; what is deferred is the fix-specific policy, not the existence of governing authority. A hotfix with no governing policy *and* no emergency-policy citation is still a violation. The exception is a compression of the order, not a suspension of it.
- **True throwaway spikes.** A spike explicitly labeled non-authoritative and discarded (never shipped, never depended upon) is out of scope entirely — it produces no build artifact this constraint governs. The moment a spike is promoted toward shipping, it re-enters scope and needs its governing policy before it goes further.

If neither case applies, there is no build-now exception. "We're moving fast" is not an incident.

---

## Alternatives Considered and Rejected

- **Convention only (no enforcer).** "Always write the policy first" as guidance. Rejected: a convention without an enforcer is a ritual with a deadline (`docs/appendices/convention-requires-an-enforcer.md`) — this is exactly the failure the ARS freeze demonstrated.
- **Lint-warning, non-failing.** Surface a warning when a build cites no policy, but let it merge. Rejected: a non-blocking signal is ignored under pressure precisely when it matters most; the gate must fail closed for the act of entering build mode / merging a build.
- **Post-hoc audit only.** Catch policy-less builds in the drift queue after the fact. Rejected as *sufficient*, kept as *complementary*: audit is the right tool for corpus drift, but the build precondition itself must be a live gate, not a retrospective finding. This constraint uses both — blocking gate for the transition, non-blocking audit for standing compliance.

## Falsifiability & Retraction

This constraint is a principle, not a preference, because it names the conditions under which it would be narrowed or retracted:

- **Retract or narrow if** the enforcement demonstrably costs more throughput than the drift it prevents — e.g., if the mode-gate/CI check blocks a materially large fraction of legitimate builds with vacuous-but-compliant policies (T1/T2 passing while T4 fails), such that the semantic backstop cannot hold and the gate becomes theater. In that case the disposition is to strengthen T4 or narrow scope, not to keep a gate that only catches the honest.
- **Amendable by canon.** Like every constraint, this is reversible by canon amendment (`canon/principles/contract-governs-handoff-drift.md`) — a session may not override it, but the operator may amend it. It is a one-way door only for a given build, never for the program.

---

## Reconciliation — Where This Sits in the Existing Canon

- **`canon/bootstrap/model-operating-contract.md`** — this constraint adds one named prerequisite (`ratified-governing-policy-cited`) to the existing planning → execution gate and gives `oddkit_preflight` a refusal condition. It does not introduce a new gate system; it names a precondition on the one that exists.
- **`canon/principles/prompt-over-code.md` / vodka architecture** — this is the ordering discipline prompt-over-code presupposes. Prompt-over-code says the policy is the law and the build is derived; policy-precedes-build says the law must exist *first*. Parent principle; this is its ordering corollary.
- **`canon/meta/constraint-driven-audits.md`** — this constraint is written as an auditable compliance surface (machine-resolvable `governs`, named T1–T5 tests split structural/semantic, remediation vocabulary), so `oddkit audit` can run it and populate the non-blocking drift queue. Note the deliberate exception: the *gate/CI* enforcement (Hooks 1–2) **is** blocking for the specific act of entering build mode / merging a build — audit drift stays non-blocking, but the precondition on building does not.
- **`canon/constraints/release-validation-gate.md`** — the build-PR-cites-policy check (Hook 2) composes with the release gate as an additional binding rule; same "convention plus enforcer" family, not a replacement.
- **`canon/constraints/definition-of-done.md`** — "done" for any build now includes "cites its resolvable governing policy URI." This extends the Definition of Done; it does not fork it.
- **`canon/constraints/borrow-evaluation-before-implementation.md` (and `docs/promotions/P0002`)** — complementary precondition on entering execution, not a duplicate. Borrow-evaluation governs *whether to build at all* (the falsifiable 6B table: borrow / bend / break / beget / bide / build, produced in planning). Policy-precedes-build governs *the order once you are building* (a ratified policy must precede the code). A build clears both: it survived the 6B evaluation (should this be built?) **and** it cites a ratified governing policy (is there intent to build it from?). They stack; neither substitutes for the other.
- **`odd/maturity.md`** — resolves the universality tension: order is universal, weight scales. This constraint explicitly refuses to impose production rigor on PoCs.
- **`canon/principles/contract-governs-handoff-drift.md`** — a session ledger or handoff that recommends "just build, we'll write the policy after" does not override this constraint. Canon wins; if the shortcut was genuinely right, amend canon.
- **PR #288 (`ratified-model-requires-reconciliation-and-enforcer`) and the ratified flat-records model** — the specific instances; this is the general rule. Cross-referenced, not duplicated. *(Author's note: PR #288 and the flat-records model were not fetchable from the indexed canon at authoring time — consistent with living in an open, unmerged PR — so this document generalizes from the operator's stated description of #288 and asserts nothing about its internal mechanics.)*

---

## How This Constraint Was Authored — Provenance

Authored 2026-07-17 under the Model Operating Contract, in execution mode, on the operator's ruling that policy-first is universal and enforceable fleet-wide. Reconciliation targets were retrieved from live canon via oddkit before drafting, and the draft was pressure-tested with `oddkit_challenge` at `canon-tier-1` stakes; the challenge returned no hard canon tensions and `block_until_addressed: false`. Its substantive prompts drove the additions above: the Edge Cases section (emergency/incident exception with retroactive ratification), the Alternatives Considered section, the Falsifiability & Retraction section, and the borrow-evaluation reconciliation.

**Honest residuals** (per Axiom 4 — not fabricated, flagged):

- **PR #288, the ratified flat-records model, and the ARS incident report were not present in the indexed canon baseline** at authoring time — consistent with living in open, unmerged PRs. They are referenced from the operator's account and their internal mechanics are asserted nowhere in this document. When they merge, this constraint should be reconciled against their exact text.
- **Structural tests can be satisfied by a vacuous policy.** T1/T2 (cited + resolves) can pass on a meaningless one-line "policy." The semantic backstop is T4 (derivable), which requires reviewer judgment and cannot be fully mechanized. This is a known soft floor, called out in Falsifiability & Retraction as the condition that would force strengthening T4.
- **The mechanical wiring (Hooks 1–2) describes prerequisites and a CI check that must be implemented** in `klappy://odd/gate/prerequisites` and the CI pipeline. This document ratifies the *policy*; the enforcer implementation is a build that — fittingly — must itself proceed from this ratified policy.

This document is authored for ratification and ships only after review of the exact text; it is opened as a DRAFT PR, not merged.
