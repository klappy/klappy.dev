---
uri: klappy://odd/ledger/2026-04-27-link-rot-phase-2-shipped
title: "Session Ledger — Link-Rot Phase 2 Shipped (oddkit v0.26.0 in prod)"
audience: odd
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["ledger", "session-ledger", "link-rot", "phase-2", "promote", "v0.26.0", "oddkit-audit", "epoch-8", "rv-gate"]
epoch: E0008
date: 2026-04-27
derives_from:
  - "odd/handoffs/2026-04-27-link-rot-phase-2-promote-resume.md"
  - "canon/constraints/release-validation-gate.md"
governs: "Closeout for the v0.26.0 promote — what shipped, what was verified, what remains for Phase 3"
---

# Session Ledger — Link-Rot Phase 2 Shipped

> oddkit v0.26.0 promoted to prod at 2026-04-27T02:51:55 UTC. CF auto-deploy completed by 02:55:26 UTC. All four post-deploy verifications passed against the live `https://oddkit.klappy.dev/mcp` endpoint. The new `oddkit_audit` action and unified-router `action: "audit"` are live; default scope `["writings/"]` and wider scope `["writings/", "canon/"]` both honored. One additional Cursor Bugbot finding surfaced on the promote PR head (low-severity dead `lineSeen` field) — waived in PR body with rationale and tracked at klappy/oddkit#148. Validator findings F-3 and F-5 (intentional spec drift) addressed in this same canon PR via the spec v2.2 amendment.

## Summary — What Shipped

- **Action**: `oddkit_audit` standalone tool + unified `oddkit` `action: "audit"` enum value
- **Version**: oddkit `0.25.0 → 0.26.0` (strictly additive +1 action; enum count `12 → 13`)
- **Default scope**: `["writings/"]`; opt-in wider via `scope.paths`
- **Surface**: `https://oddkit.klappy.dev/mcp` (and any oddkit-pattern MCP server using this Worker codebase)
- **Promote PR**: klappy/oddkit#146 — merged 2026-04-27T02:51:55Z via regular merge (`merge_method: "merge"`, promote convention)
- **First real findings**: 3 dead-reference findings surfaced in default-scope smoke; 17 in `["writings/", "canon/"]` smoke. Real link-rot in canon — useful Phase 3 input.

## Decisions Made This Session

### D — Bugbot lineSeen finding waived rather than fix-forwarded

The Cursor Bugbot review on PR #146 head SHA `428b6769` posted one Low-severity finding: the `lineSeen` property on the `pendingSuppress` object in `workers/src/orchestrate.ts:1947,1959` is assigned but never read. Independently verified via `grep -n lineSeen` — only two writes, no reads.

**Disposition**: waived in PR body with rationale + tracked at klappy/oddkit#148. **Rationale**: fix-forward would re-touch `orchestrate.ts` (load-bearing surface per `klappy://canon/constraints/release-validation-gate` Rule 2), which would force another full validator dispatch for what is a cosmetic-only cleanup with no behavioral surface. The release-validation-gate canon explicitly enumerates "waive in PR body with rationale" as one of three valid dispositions for `completed/neutral` Bugbot reviews with comments. The tracking issue keeps the dead code visible for the next PR that legitimately touches the audit code path.

### D — Spec amended to v2.2 in this same canon PR

Validator findings F-3 (`index_state` field shipped omitted but spec mandated it) and F-5 (`PARTIAL_INDEX` status absent but spec listed it) are intentional drift documented in CHANGELOG. The spec is the authoritative future-target; rather than carry permanent drift, the spec graduates to v2.2 in this canon PR with both fields marked deferred. F-4 (`suppressed_findings` returns full objects vs spec's "count only") was dispositioned "no action" by the validator and remains unchanged in v2.2 — additive, not harmful, and any future amendment can be a separate small PR if alignment becomes useful.

### D — Original handoff persisted only via reference, not reconstruction

Item 9 of the resume handoff said BOTH handoffs needed persisting:
- `odd/handoffs/2026-04-27-link-rot-phase-2-promote-and-phase-3.md` — the "original," attached at start of the prior session
- `odd/handoffs/2026-04-27-link-rot-phase-2-promote-resume.md` — the resume

This session has the resume in full text but does not have the original. The original was attached to the prior session's chat context only; it was never persisted to canon and the prior session's container/transcript was no longer accessible. **Per axiom 4 ("You Cannot Verify What You Did Not Observe"), this session refuses to reconstruct the original from inference.** The resume is comprehensive enough to stand alone for forensic purposes — it summarizes the validator dispatch, the F-1 fix-forward, the open promote-PR state, and the full continuation test. The original's loss is recorded honestly in the resume's "Persistence Note" appendix.

## Observations

### O — Containers reset DNS resolution mid-session

POST `/mcp` from `curl` in the working container hit "DNS cache overflow" reproducibly after enough other network calls — the same environmental issue the validator's container hit (recorded as F-7 in the validator findings). Switching to Python `urllib.request` with an explicit `User-Agent` header bypassed it cleanly. This is a CF Workers Containers / Anthropic execution-environment quirk, not an oddkit defect. Worth carrying forward: post-deploy verification scripts should default to urllib over curl when running inside this environment.

### O — Cursor Bugbot Autofix is correctly non-blocking per canon Rule 1

The promote PR's `Cursor Bugbot Autofix` check sat in `in_progress` while the parent `Cursor Bugbot` check completed `neutral`. The `mergeable_state` was `unstable` as a result. Canon (`klappy://canon/constraints/release-validation-gate` Rule 1) explicitly addresses this: "`Cursor Bugbot Autofix` may remain `in_progress` indefinitely without blocking, BUT only after the parent `Cursor Bugbot` check has reached `completed`." This session followed canon and merged anyway. Confirming the canon's specific carve-out is real and operational.

### O — Real link-rot exists in `writings/`

Default-scope audit returned 3 dead-reference findings on first prod run:
- `writings/choosing-faith-not-fear.md:203` → `klappy://writings/four-questions-that-change-everything`
- (two more — visible in any subsequent default-scope audit call)

Phase 3 enforcement will surface these on the next PR that touches a writings file. The campaign was always "wire the gate, then fix what it surfaces" — this is the input data for the fix sweep.

## Learnings

### L — Validator findings split cleanly into "fix" vs "amend spec" vs "no action"

The 7-finding validator report disposed cleanly:
- F-1: real bug → fix-forward (PR #147)
- F-2, F-4, F-6: doc-debt or additive — no action
- F-3, F-5: intentional implementation drift from spec → amend spec (this PR)
- F-7: environmental — not a code defect

This is the pattern the release-validation-gate is meant to produce. Each finding gets a category, each category has a standard disposition. No finding gets ignored; no finding's disposition is left ambiguous. The review is genuinely a contract, not a ceremony.

### L — Continuation Test as written-in-handoff is a strong checkpoint mechanism

The resume handoff's three-action Continuation Test (`oddkit_version` → `GET /repos/.../pulls/146` → patch+merge or rerun) gave this session an unambiguous starting line. The handoff's failure clause ("If the next session starts re-dispatching the validator, re-deriving validator findings, or arguing about scope — the handoff failed") gave a clear failure signal. Sessions that lose state benefit enormously from explicit Continuation Tests in the prior handoff.

## Constraints Held

### C — Release-Validation-Gate Rules 1, 2, 3 all honored

- **Rule 1**: every check-run reached `completed` with acceptable conclusion (success / neutral) before merge. The one Bugbot review comment was dispositioned (waive + tracking issue) per the rule's three valid options.
- **Rule 2**: the original PR #143 had been validated by an independent fresh-context Sonnet 4.6 agent. F-1 was fixed-forward in PR #147 before promote merged. The validator did its job — this session honored its findings rather than re-litigating them.
- **Rule 3**: the resume handoff explicitly noted the prior session's compaction; this session did not treat any session-scoped recommendation as overriding canon. The Bugbot finding got a canon-prescribed disposition.

## Handoff — What Remains

### Item 6 from the resume handoff: Phase 3 PR-3.1

`.github/workflows/canon-quality.yml` on klappy/klappy.dev. Triggers on PR + push, calls `oddkit_audit` against prod via `curl` (or `python -c "import urllib..."` if curl fails — see the DNS observation above), sticky comment via `marocchino/sticky-pull-request-comment@v2`, respects `vars.AUDIT_ENFORCEMENT_MODE` (soft default).

Spec is at `klappy://docs/oddkit/specs/oddkit-audit` (v2.2 after this PR). The workflow is a separate execution beat — substantial enough to warrant its own gate transition.

### Item 7: Observation cycle

3-5 PRs through the soft-block gate, observing finding rate and noise patterns. Cannot run inside a single session.

### Item 8: PR-3.2 — flip enforcement to hard mode

Single-line change to `vars.AUDIT_ENFORCEMENT_MODE`. Trivial mechanically; gated on item 7.

### Item 10 (resolved in this PR): spec amendment v2.2

This PR contains the spec amendment. After merge, F-3 and F-5 close cleanly.

## Continuation Test — for the next session

If picking up Phase 3 PR-3.1:

1. `oddkit_version` — confirm prod is still `0.26.0`.
2. `oddkit_get` on `klappy://docs/oddkit/specs/oddkit-audit` — confirm v2.2 amendment landed (Origin section shows v2.2 entry).
3. `GET /repos/klappy/klappy.dev/contents/.github/workflows/canon-quality.yml` — confirm workflow does NOT yet exist (404 expected).
4. Begin PR-3.1: branch, write workflow per spec, open draft PR, smoke locally if possible, ungate.

## See Also

- `klappy://odd/handoffs/2026-04-27-link-rot-phase-2-promote-resume` — the handoff this session executed
- `klappy://canon/constraints/release-validation-gate` — Rules 1/2/3, all honored
- `klappy://docs/oddkit/specs/oddkit-audit` — the spec, now at v2.2
- `klappy://docs/planning/link-rot-elimination-campaign` — the multi-phase campaign this PR completes Phase 2 of
- klappy/oddkit#146 — the promote PR
- klappy/oddkit#147 — the F-1 fix-forward
- klappy/oddkit#148 — tracking issue for the dead `lineSeen` field
