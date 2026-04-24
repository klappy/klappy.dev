---
uri: klappy://canon/principles/type-contract-plus-adversarial-review
title: "Type Contract Plus Adversarial Review — Boundary Types Are Necessary, Not Sufficient"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "type-safety", "code-review", "adversarial-review", "paired-pattern", "boundary-conditions", "bugbot", "verification", "axiom-2", "axiom-4"]
epoch: E0008.3
date: 2026-04-24
derives_from: "canon/values/axioms.md, canon/principles/verification-requires-fresh-context.md, canon/constraints/release-validation-gate.md"
complements: "canon/constraints/release-validation-gate.md, canon/principles/cache-fetches-and-parses.md"
governs: "Any code change whose correctness depends on accurately reporting its own incompleteness, partiality, or failure. Binding on every orchestrator shipping type-carrying interfaces across trust boundaries in oddkit-pattern MCP servers and their consumers."
status: active
---

# Type Contract Plus Adversarial Review — Boundary Types Are Necessary, Not Sufficient

> When a function's correctness depends on reporting its own incompleteness honestly, a type-system contract at the API boundary is necessary but not sufficient. The type forces every caller to acknowledge the incompleteness axis; adversarial review catches the implementation lying about that axis. Either defense alone ships silent-truth-loss bugs. The pair is what earns the right to declare the boundary safe. The pair collapses to a single line of defense when the build pipeline bypasses the type system — at which point adversarial review is the only thing standing between compile and production.

---

## Summary — The Pair Is Load-Bearing, Not the Parts

A function that summarizes a remote dataset, fans out across a corpus, or returns partial results under timeout pressure can lie about its own state in two independent ways. It can fail to surface the incompleteness at all (returning `matches` without a completeness flag), and it can surface a completeness flag whose implementation does not match its documented meaning (`complete=true` under conditions that violate the field's contract). These are distinct failure modes. A type contract at the boundary prevents the first; adversarial review of the implementation prevents the second. Either alone ships bugs the other would have caught.

The paired pattern is: define a structured return type at every trust boundary where incompleteness is possible, then require adversarial review of the implementation against that type's documented invariants. Concretely, in the aquifer-mcp session that forced this principle into canon, the `BootstrapEntityResult` struct had nine fields that together made it impossible for a caller to ignore whether the result was complete. The type worked. The implementation then violated its own contract on three independent axes — a deadline that could not kill in-flight fetches, a completeness flag that force-flipped on budget exceedance, and rejected fetches counted as scanned. Only Cursor Bugbot's adversarial pass caught the three implementation lies. The type alone would have shipped silent truth loss; the review alone, without a type that forced callers to acknowledge completeness, would not have known what invariant to audit.

The pair's boundary condition is where this principle bites hardest. A build pipeline that bypasses the type system — esbuild transpile-only, swc transpile-only, or `tsc --noEmit` run only in local dev — collapses the pair to adversarial review alone for a class of bugs the type system would normally catch at compile. In the aquifer-mcp session, an undeclared `ctx` free variable passed esbuild cleanly and would have shipped as a production `ReferenceError` on every cold-cache search with an entity filter. Bugbot was the sole defense. When the pipeline bypasses types, the orchestrator's obligation on adversarial review is heavier, not lighter.

---

## What Counts As A Trust Boundary

Not every function needs a structured return type. This principle targets functions whose correctness depends on reporting their own state honestly — specifically functions that can succeed, fail, or *partially succeed* under observable conditions. The three shapes:

**Bounded fan-out over a corpus.** The function scans a set of resources and returns matches. Deadlines, concurrency caps, individual fetch failures, or budget exhaustion can all cause the return to be incomplete. If the caller cannot distinguish "I scanned everything and found nothing" from "I scanned 7 of 33 and timed out," the caller will make wrong decisions. Type the result with `{ matches, complete, scanned_resources, total_resources, missing_resources }` at minimum.

**Remote data hydration.** The function fetches + parses a remote artifact. Network, cache, and parse failures are independent. Returning `null` conflates "artifact does not exist" with "artifact exists but fetch failed" with "artifact fetched but parse failed." Distinguish them in the type.

**Cache reads with fallback.** The function checks a cache, falls back to computation, optionally memoizes the result. Returning the value alone hides which path produced it. When a caller needs to distinguish cached-clean-read from recomputed-with-partial-inputs, the type must carry the provenance.

Functions whose failure modes are binary (succeed or throw) do not need structured returns. Functions whose failure modes are a spectrum do. The test: can this function return something that looks correct but is silently incomplete? If yes, the boundary needs a type.

---

## What Counts As Adversarial Review

Adversarial review is not "a second pair of eyes." It is a review process whose job is specifically to find what the implementation lies about. In the aquifer-mcp session, Cursor Bugbot played this role: an automated reviewer with no bridging context, no social relationship to the implementer, and no commitment to the framing in the PR description. Its findings were read adversarially — *where does this implementation fail its own contract?* — rather than charitably.

The reviewer need not be automated. A human reviewer can be adversarial if the reviewer actively treats the PR as suspect rather than as correct-until-proven-otherwise. A fresh-context LLM validator can be adversarial if dispatched under the release-validation-gate. The mechanism matters less than the posture. What matters:

- The reviewer is independent of the implementer's creation context.
- The reviewer reads the documented invariants of the type, then audits the implementation against them.
- Findings are dispositioned individually, not summarized as a batch.
- Silent-truth-loss findings are treated as blocking, not as style feedback.

Adversarial review without a typed contract is aimless — the reviewer has no anchor for what the implementation should satisfy. A typed contract without adversarial review is a promise the compiler cannot enforce at the level the type is documented to represent. Both sides of the pair do real work.

---

## The Three Deciding-Argument Recurrences

Graduation test: three decisions where the principle is the load-bearing reason for a manual enforcement, not three appearances of the pattern. For this principle, the recurrences were all manual enforcements in the aquifer-mcp J-002 → H11b session — three distinct decisions where the orchestrator acted on the paired pattern as the reason, not as a summary of prior choices.

**Recurrence 1 — PR #18 (BootstrapEntityResult, J-003).** The orchestrator introduced a structured return type with nine fields (`matches`, `complete`, `scanned_resources`, `total_resources`, `scanned_files`, `failed_files`, `total_files_estimate`, `budget_exceeded`, `duration_ms`) specifically to force every caller to observe the completeness axis. The load-bearing decision was *not* "use a struct"; it was *"trust the struct at the boundary, require adversarial review of the implementation."* The orchestrator did not self-certify the implementation. Bugbot was invoked on the PR and its findings were treated as blocking. Bugbot surfaced nine findings across three review cycles; three were silent-truth-loss bugs where `complete=true` could ship under conditions that violated the field's documented meaning (failed fetches counted as scanned; `complete` force-flipped on budget exceedance; deadline could not kill in-flight fetches). All three were closed before merge. The paired pattern was the reason those bugs did not ship.

**Recurrence 2 — PR #20 (FanOutEntityResult, J-005).** Same shape, different function. The orchestrator introduced `FanOutEntityResult` with the same completeness axis for the H11b partial-fan-out path. The load-bearing decision was identical: typed contract at the boundary, adversarial review required before merge. Bugbot surfaced a High-severity finding that `searchByEntity` referenced an undeclared `ctx` free variable — a `ReferenceError` under strict-mode ES modules that would have shipped as a production crash on every cold-cache search with an entity filter. The orchestrator accepted the block and routed the fix forward via autofix rather than waiving it. The paired pattern was again the reason the bug did not ship; this time the specific bug was a type-system-visible error that the build pipeline had made type-system-invisible.

**Recurrence 3 — The esbuild-transpile-only boundary condition (J-005 generalization).** Recurrence 2 exposed a structural property of this project's build pipeline: esbuild runs transpile-only in the CI build, which means TypeScript errors at author time become runtime errors at deploy time. The orchestrator's load-bearing decision — extended across the remaining aquifer-mcp PRs (#17, #19, #20) — was to treat Bugbot as the *sole* defense for this class of bug, not as a secondary check. This elevated the adversarial-review leg of the pair from defense-in-depth to structurally required. The decision was acted on: Bugbot findings across the four PRs were all read adversarially and dispositioned individually, with no scope-based waivers. This is a distinct deciding-argument recurrence from (1) and (2) because the decision was *about the pair itself* — specifically, that the pipeline's type-bypass property changed which leg of the pair was doing the work.

The three recurrences are all from one session, which is uncommon for canon graduation. The pattern is still graduation-worthy because each recurrence was a distinct manual enforcement — a decision where the orchestrator acted on the principle as reason, and the principle's presence is what prevented a shipped bug. The principle's absence would have shipped production regressions in all three cases.

---

## Where This Principle Bites Hardest

**Build pipelines that bypass the type system.** esbuild transpile-only, swc transpile-only, and CI that runs tests without `tsc --noEmit` all produce a gap where TypeScript errors at author time become runtime errors at deploy time. Under these pipelines, adversarial review is not an additional safety net; it is the only safety net for the class of bugs the type system would normally catch. The orchestrator's obligation to dispatch adversarial review — Bugbot, fresh-context validator, peer review — is heavier when the pipeline bypasses types, not lighter.

**Functions whose partial-success contract is implicit.** When a function returns an array and the calling convention is "empty array means no matches," the convention hides the distinction between "nothing to match" and "fan-out aborted at 7 of 33." Making the contract explicit via a typed return is the cheapest fix; the expensive fix is auditing every call site for correct handling of the implicit convention. Callers cannot ignore a typed completeness flag; they routinely ignore an implicit convention.

**Deadlines and budget caps on async fan-outs.** A deadline that fires while fetches are in-flight produces a race condition between the deadline's disposition and the fetches' completion. The implementation can easily report `complete=false` while still returning all matches, or report `complete=true` while silently dropping half the matches. Both bugs are invisible to the caller, visible to adversarial review, and detectable at compile time only if the type forces the implementation to name both axes (`budget_exceeded: boolean` AND `scanned_resources: number` AND `total_resources: number`).

**Autofix loops that close findings in-place.** When an adversarial reviewer (automated or human) surfaces findings and an autofix mechanism closes them in the same PR, the orchestrator can lose track of which findings were substantive and which were cosmetic. The disposition record matters: every finding gets a one-line disposition, even "closed by autofix — confirmed correct." Without the record, the review's work is invisible on the next regression.

---

## What This Principle Does NOT Say

**It does not say every function needs a structured return type.** Functions with binary success/failure modes are fine with primitive returns and thrown errors. The principle applies where partial success is possible and invisible to the caller without a typed contract.

**It does not say adversarial review is always automated.** Cursor Bugbot happens to be the automated reviewer in the aquifer-mcp session; the principle is agnostic to mechanism. A fresh-context Sonnet validator under the release-validation-gate is adversarial review. A human reviewer operating in adversarial posture is adversarial review. What the principle requires is the posture, not a specific tool.

**It does not say a typed contract prevents all silent truth loss.** It reduces the category from "possible anywhere in the function" to "possible only at the call sites that misread the contract." That reduction is large but not total. Adversarial review of call sites is still necessary when the type is being introduced to an existing codebase; the next-session principle will likely name that as its own recurrence candidate.

**It does not say the pair substitutes for testing.** Tests verify that the implementation satisfies the type at specific call sites with specific inputs. The pair verifies that the type documents the right invariants and that the implementation satisfies them in general. Tests and the pair are complementary, not substitutes.

---

## Related Canon

- **[Foundational Axioms](klappy://canon/values/axioms)** — Axiom 2 ("A Claim Is a Debt") and Axiom 4 ("You Cannot Verify What You Did Not Observe") are the axiomatic grounding. The type contract prevents silent debt at the boundary; adversarial review prevents silent debt in the body. Both serve verification.
- **[Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context)** — adversarial review works because the reviewer does not share the implementer's creation context. This principle is the specific application of the fresh-context rule to type-carrying interfaces.
- **[Release Validation Gate](klappy://canon/constraints/release-validation-gate)** — Rule 1 binds Bugbot findings as non-waivable without explicit disposition. This principle is the design rationale for why Rule 1 exists; the gate is the enforcement.
- **[Cache Fetches And Parses](klappy://canon/principles/cache-fetches-and-parses)** — a sibling principle with identical graduation structure. That principle names what to cache; this one names how to verify the cache's partiality surfaces honestly.
- **[Partial Data With Transparency And Background Warm](klappy://canon/principles/partial-data-with-transparency-and-background-warm)** — the principle graduated alongside this one. That principle governs when to return partial data; this principle governs how to type the partial-data return so callers cannot silently mistake partial for complete.

---

## See Also — The Three Manual Enforcements

- `klappy://odd/ledger/2026-04-24-aquifer-session-principles-graduated` — the session ledger documenting all three recurrences.
- PR klappy/aquifer-mcp#18 — Recurrence 1, BootstrapEntityResult, 9 Bugbot findings including 3 silent-truth-loss bugs.
- PR klappy/aquifer-mcp#20 — Recurrence 2, FanOutEntityResult, High-severity `ctx` ReferenceError that would have shipped without Bugbot.
- The esbuild-transpile-only observation in the J-005 arc — Recurrence 3, elevation of Bugbot from defense-in-depth to sole defense.
