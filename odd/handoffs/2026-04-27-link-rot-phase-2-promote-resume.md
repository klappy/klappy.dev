---
uri: klappy://odd/handoffs/2026-04-27-link-rot-phase-2-promote-resume
title: "Handoff — Link-Rot Phase 2 Promote Resume (RV-Gate Cleared, Awaiting Final Merge)"
audience: odd
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["handoff", "link-rot", "phase-2", "promote", "rv-gate", "resume", "epoch-8"]
epoch: E0008
date: 2026-04-27
derives_from:
  - "odd/handoffs/2026-04-27-link-rot-phase-2-promote-and-phase-3.md"
  - "canon/constraints/release-validation-gate.md"
governs: "Resumption of v0.26.0 promote after RV-gate validator pass + F-1 fix-forward"
---

# Handoff — Link-Rot Phase 2 Promote Resume

> RV-gate validator was dispatched on PR #146 per canon (overriding the prior handoff's defer). Validator found one MEDIUM bug (F-1: misleading `oddkit_audit` tool description). Fix-forward shipped as PR #147, squash-merged to main at SHA `428b6769`. PR #146 is still open and now needs (a) CI re-run on the new main HEAD, (b) body updated with validator findings + dispositions, (c) merge. Same-session toolset regressed again before final steps could ship.

## Verified State (2026-04-27T02:39 UTC)

- ✅ Prod oddkit `v0.25.0` (`oddkit_version` confirms — promote NOT shipped)
- ✅ Canon constraints from PR-2.3b live (`oddkit-action-registration-completeness` resolves, hash `pcc8q2`)
- ✅ Per compaction summary: main HEAD = `428b6769ea5dcb7041f8af924c129dee78a9c74f` (PR #147 squash merge)
- ✅ Per compaction summary: PR #146 OPEN, body still says "DO NOT MERGE until validator findings appended"

## RV-Gate Validator Outcome (PR #143 → promote PR #146)

Dispatched via Managed Agents API, claude-sonnet-4-6, read-only fresh-context.
- AGENT_ID: `agent_011CaTUhej22aHQ8yxuH5cKF`
- SESSION_ID: `sesn_011CaTUjLzivzqVVboKnfUjw`
- Report saved at agent's `/home/user/ledger/rv-gate-pr146-v0.26.0-oddkit-audit.md`

| ID | Severity | Finding | Disposition |
|----|----------|---------|-------------|
| F-1 | MEDIUM | `workers/src/index.ts` tool description claimed default scope was `writings/, canon/, odd/, docs/`; actual `DEFAULT_AUDIT_PATHS = ["writings/"]` | **Fixed** — PR #147 (squash `428b6769`), merged to main pre-promote |
| F-2 | LOW | PR #143 body table stale post-merge | Doc-debt, no live impact, no action |
| F-3 | MEDIUM | Spec mandated `index_state: {warm_count, warming_count}`; shipped omits it | Intentional — CHANGELOG documents drift; queue follow-up canon PR on klappy.dev to amend spec (precedent: spec was already amended once at v2.1) |
| F-4 | LOW | `suppressed_findings` returns full objects; spec said count only | Additive, not harmful, no action |
| F-5 | INFO | `PARTIAL_INDEX` status absent | Intentional; spec disagrees — fold into F-3 spec amendment |
| F-6 | INFO | `since_commit` accepted but ignored | Documented in CHANGELOG, no action |
| F-7 | env | Validator's CF Workers container hit DNS overflow on POST `/mcp` | Not a code defect — CI's "Test CF Preview" green on same surface (after re-run) satisfies live-behavior corroboration |

C2 (bytes-on-main) and C4 (canon retrievability) both PASSED. Verdict: **fix-forward required → COMPLETE; cleared to merge once body updated.**

## Pending — Resume Here

1. **Wait for PR #146 CI on new main HEAD** (`428b6769`). Pattern observed: "Test CF Preview" check fails ~22-26s on first run of any new commit (deploy race — the wait-for-preview step doesn't actually wait long enough). If it fires, immediately `POST /actions/runs/{id}/rerun-failed-jobs`. Twice in a row = real regression.

2. **Update PR #146 body** via `PATCH /repos/klappy/oddkit/pulls/146`. Replace the trailing line `⏳ Validator findings: pending — DO NOT MERGE until appended.` with the dispositions table above, then `✅ Validator findings appended; cleared to merge.`

3. **Merge PR #146** with `merge_method: "merge"` (regular merge — promote PR convention; check #142/#145 for the exact body).

4. **Wait ~3 min for CF auto-deploy** to prod from new prod HEAD.

5. **Post-deploy verification**:
   - `oddkit_version` → `0.26.0`
   - Call unified `oddkit` action `audit` (default scope) → expect `{status, summary, findings, scope: { paths: ["writings/"] }}`
   - Call standalone `oddkit_audit` with `{scope: {paths: ["writings/", "canon/"]}}` → expect wider scope honored
   - Confirm action enum has 12 values (not 11)

6. **Phase 3 PR-3.1**: Open `.github/workflows/canon-quality.yml` on klappy/klappy.dev (soft-block mode). Re-draft from `klappy://docs/oddkit/specs/oddkit-audit` (~225-line workflow). Triggers on PR + push, calls `oddkit_audit` against prod via curl, sticky comment via `marocchino/sticky-pull-request-comment@v2`, respects `vars.AUDIT_ENFORCEMENT_MODE` (soft default).

7. **Observation cycle**: 3-5 PRs through soft-block gate.

8. **Phase 3 PR-3.2**: Flip `vars.AUDIT_ENFORCEMENT_MODE` to `hard`.

9. **Save BOTH handoffs to canon** (small canon PR on klappy.dev):
   - `odd/handoffs/2026-04-27-link-rot-phase-2-promote-and-phase-3.md` (the original, attached at start of this session — never landed)
   - `odd/handoffs/2026-04-27-link-rot-phase-2-promote-resume.md` (this document)

10. **Spec amendment PR** for F-3/F-5 on klappy.dev: amend `docs/oddkit/specs/oddkit-audit` to v2.2 — drop `index_state` from spec OR mark it as planned-future; document `PARTIAL_INDEX` status as deferred.

## Key Resources

- GitHub PAT (do NOT commit): in project instructions
- Anthropic API key: in project instructions
- Managed-agents env: `env_016RffZyqSdHeb5s3Z6UABw8`, header `managed-agents-2026-04-01`
- Validator transcript: previous session container `/home/claude/work/events_final.json` (lost when container resets — full text was in compacted transcript at `/mnt/transcripts/2026-04-27-02-37-54-oddkit-audit-promote-rv-gate.txt`)

## Continuation Test

First three actions for the next session:
1. `oddkit_version` — sanity check (should still be `0.25.0` until step 3 completes).
2. `GET /repos/klappy/oddkit/pulls/146` — confirm still open, check check-status on head.
3. If checks green: PATCH body → merge. If checks red: rerun failed jobs first.

If the next session starts re-dispatching the validator, re-deriving validator findings, or arguing about scope — the handoff failed.

## Persistence Note (added when this handoff was persisted to canon)

This handoff was authored during the prior session (compacted at 2026-04-27T02:39 UTC) and persisted to canon by the next session that successfully executed the Continuation Test. The "original" handoff referenced in item 9 (`odd/handoffs/2026-04-27-link-rot-phase-2-promote-and-phase-3.md`) was not persistable — it was attached only to the prior session's chat context, was never written to canon, and was lost when that session compacted. This document is comprehensive enough to stand alone for forensic purposes; the original handoff's contribution is preserved indirectly via this document's references and the session ledger linked below.

## See Also

- `klappy://canon/constraints/release-validation-gate` (Rule 2 — independent validator dispatch on load-bearing surface)
- `klappy://canon/principles/contract-governs-handoff-drift`
- `klappy://docs/planning/link-rot-elimination-campaign` (sequencing v2.1)
- `klappy://docs/oddkit/specs/oddkit-audit` (v2.2 — amended in the same PR that persisted this handoff)
- `klappy://odd/ledger/2026-04-27-link-rot-phase-2-shipped` — session ledger that closes out the promote
