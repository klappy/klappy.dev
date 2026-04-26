---
uri: klappy://odd/ledger/2026-04-26-pr139-and-deploy-propagation-correction
title: "Ledger Correction — PR #139 Closed The File-Tier Open Item, And A New Deploy-Propagation Open Item Surfaced"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["ledger", "correction", "file-tier", "cache-tier", "deploy-propagation", "validate-before-assuming", "session-2026-04-26", "epoch-E0008.4"]
epoch: E0008.4
date: 2026-04-26
derives_from: "odd/ledger/2026-04-26-telemetry-and-canon-integration-session.md, canon/principles/contract-governs-handoff-drift.md"
complements: "canon/principles/dream-house-principle.md, canon/values/axioms.md"
governs: "Two corrections to the prior session ledger merged minutes before this entry was written: one closing an [O-open] that was actually closed at the source level, and one opening a new [O-open] about deploy propagation."
status: active
session_span: "2026-04-26 follow-up"
---

# Ledger Correction — PR #139 Closed The File-Tier Open Item, And A New Deploy-Propagation Open Item Surfaced

> The prior session ledger (`odd/ledger/2026-04-26-telemetry-and-canon-integration-session`) recorded `[O-open]: getFile-tier vs index-tier wiring` as an open follow-up. That claim was inaccurate at the moment it was written — PR #139 at klappy/oddkit had been merged minutes earlier (squash-merged 2026-04-26T03:04:22Z as `e2912f3`), independently shipped by the maintainer while the ledger was being drafted. The fix is the cleanest of the three options surveyed: extend the tracer's `_indexSource` setter to also recognize `file:*` labels, with `source !== "miss"` as the guard and first-wins preserved. Local tests on merged main pass 22/22. However, production verification 13 minutes after the deploy reports `worker_version="0.23.1"` (main is `0.24.0`) and 6/6 `oddkit_get` calls in the post-deploy window still record `cache_tier="none"`. The code-level open is closed; a new deploy-propagation observation replaces it.

---

## Summary — Two Corrections to the Prior Ledger

The prior ledger entry (`8d1a99f`) recorded the file-tier-vs-index-tier wiring as `[O-open]`. At the moment that ledger was being drafted, PR #139 at klappy/oddkit had already been merged independently — the maintainer shipped the cleanest of the three options I had surveyed (extend the setter to recognize `file:*` labels), with first-wins preserved and `file-r2:*` (R2 miss spans) excluded by an explicit `source !== "miss"` guard. Test count went from 18 to 22 passing.

I missed it because I was working in parallel on the ledger entry while PR #139 was landing. The ledger merged at `8d1a99f` and was technically wrong at the moment of write — the open item it documented as open was, in code, already closed. This is a real "validate before assuming" miss in the same session that named the principle as a learning.

This correction records two things: that the original `[O-open]` is closed at the code level (PR #139, `e2912f3`), and that a new observation has surfaced from production verification — the deployed worker is reporting the pre-PR-139 behavior 13+ minutes after Workers Builds completed.

---

## Correction 1 — The File-Tier Open Item Was Closed Before The Ledger Documented It As Open

**Original claim (in `odd/ledger/2026-04-26-telemetry-and-canon-integration-session`, section Opens):**

> `[O-open: getFile-tier vs index-tier wiring]` — Three options surveyed during the session: (a) extend the setter to recognize "file" labels, (b) each action explicitly sets a primary tier via a new `setPrimaryTier()` method, (c) add a separate `file_tier` blob10. Filing for follow-up; not blocking.

**Correction:** PR #139 at klappy/oddkit (squash-merged 2026-04-26T03:04:22Z as `e2912f3`) shipped option (a) — extend the setter to recognize `file:*` labels alongside `index` / `index-build`. First-wins guard preserved (`!this._indexSource` check), `source !== "miss"` guard added to exclude `file-r2:*` miss spans. The implementation is in `workers/src/tracing.ts:48-56`:

```ts
if (!this._indexSource && source && source !== "miss") {
  if (
    label === "index" ||
    label === "index-build" ||
    label.startsWith("file:")
  ) {
    this._indexSource = source;
  }
}
```

Test coverage: 4 new regression tests (file:* recognition, index-wins preserved, miss-spans excluded, original behavior unchanged). Test count: 18 → 22 passing. Local run on merged main confirms 22/22.

The original ledger's `[O-open]` for file-tier wiring is hereby corrected to `[O-closed: PR #139, e2912f3]` at the code level.

---

## Correction 2 — The Deployed Worker Is Not Yet Running The PR #139 Code

A new observation replaces the closed open. Production verification 13+ minutes after PR #139's Workers Builds completion (build completed 2026-04-26T03:04:49Z; verification queries at 03:13-03:17Z) shows the deployed worker is still serving the pre-PR-139 setter:

**Evidence:**

- `oddkit_version` returns `0.23.1`. The `package.json` and `workers/package.json` on main both report `0.24.0` (bumped at `d023ad6`, four commits before PR #139). The deploy mechanism is supposed to inject `ODDKIT_VERSION` from `package.json` per the comment in `workers/wrangler.toml`: `# ODDKIT_VERSION injected at deploy time from root package.json`.
- Three independent `oddkit_get` calls to `klappy://` URIs (the fast path that PR #139 specifically targets) returned debug traces with the expected `file:*` spans and non-"miss" sources (`r2`, `build`), but `index_source: "none"` in the trace summary. With PR #139's setter, those traces should report `index_source: "r2"` and `index_source: "build"` respectively.
- Telemetry query (`SELECT blob9 AS cache_tier, blob8 AS worker_version FROM oddkit_telemetry WHERE blob3='oddkit_get' AND timestamp > NOW() - INTERVAL '15' MINUTE`) confirms 6/6 `oddkit_get` calls in the post-deploy window record `cache_tier="none"` with `worker_version="0.23.1"`. No exceptions.

**Possible explanations:**

- Workers Builds completed but the actual edge-rollout to production is taking longer than the typical 2–5 minute window. Most likely.
- The CF deploy mechanism does not actually update `ODDKIT_VERSION` from `package.json` despite the wrangler.toml comment, and the env var was last set to `0.23.1` manually. This explains the version mismatch but does not directly explain why the trace setter behavior is still pre-#139.
- The build artifact deployed by Workers Builds is somehow not the source on `main`. Less likely; would imply a deeper CI/CD issue.

**Why this entry exists:** the prior ledger's correction is itself a small fact, but the new observation deserves recording because it is the kind of finding the next session will want to start from. If `oddkit_get` continues recording `cache_tier="none"` 30+ minutes after PR #139's Workers Builds completed, the deploy mechanism itself is suspect, not the code.

---

## Open

**[O-open: deploy-propagation-or-version-skew on klappy/oddkit production worker]** Workers Builds reported `completed/success` at 2026-04-26T03:04:49Z for PR #139's merge SHA `e2912f3`. As of 03:17:44Z (12m 55s later), the production worker still reports `oddkit_version="0.23.1"` and `oddkit_get` calls still record `cache_tier="none"` with `worker_version="0.23.1"` in telemetry. The source on `main` is `0.24.0` and the merged setter clearly recognizes `file:*` spans. Either (a) edge propagation is taking longer than expected, or (b) the deploy mechanism is not actually picking up `main` for some reason, or (c) `ODDKIT_VERSION` is a static env var unrelated to the deployed bundle and the bundle is fresh but the version reporting is stale (which would not explain the still-"none" cache_tier on file:* spans). Suggested next probe: re-query telemetry 30+ minutes after the build-complete timestamp to see whether `oddkit_get` cache_tier values shift, and inspect the Cloudflare dashboard for the actual deployed bundle version.

**[O-still-open from prior ledger: P11 mechanical enforcement of canon-integration-audit]** Unchanged from the prior ledger. Tool-side wiring deferred.

---

## Learning

**[L: validate before assuming, even when the assumption is your own ledger draft]** The same principle this session named as a Learning (`klappy://canon/principles/validate-before-assuming`-equivalent observation) was violated by the act of writing the ledger that documented it. The ledger's `[O-open]` for file-tier wiring was authored on the assumption that no follow-up had been merged in the few minutes between the prior verification query and the ledger's drafting. That assumption was wrong: PR #139 merged 4 minutes after the previous ledger PR's commit timestamp. The corrective is structural, not motivational: any session ledger that records `[O-open]` items should re-query the relevant repos for newer merges immediately before the ledger PR is opened. A small `git fetch && git log --oneline origin/main` against each tracked repo, run at ledger-PR time, would have caught this.

The deeper learning: a session ledger is itself a claim about state. Per Axiom 4 ("You Cannot Verify What You Did Not Observe"), the claim "this is open" requires a fresh observation that it is open at write-time, not a memory from earlier in the session. The prior ledger drew on a memory from ~25 minutes earlier; in fast-moving sessions, that's enough lag for the claim to be wrong.

---

## Handoff

**[H]** Two corrections to `odd/ledger/2026-04-26-telemetry-and-canon-integration-session` (`8d1a99f`):

1. `[O-open: getFile-tier vs index-tier wiring]` is closed at the source level by PR #139 at klappy/oddkit (squash-merged `e2912f3`). 22/22 tests pass on merged main.
2. A new `[O-open]` is recorded: 13+ minutes after Workers Builds completion, the production worker reports `worker_version="0.23.1"` (main is `0.24.0`) and `oddkit_get` still records `cache_tier="none"`. Either edge propagation is slower than expected, or there's a deploy-mechanism issue worth probing on the next session.

The prior ledger's other open (P11 mechanical enforcement of canon-integration-audit) is unchanged. Working copies remain at `/home/claude/work/oddkit` (synced to `e2912f3`) and `/home/claude/work/klappy.dev` (synced to `8d1a99f` plus this branch).
