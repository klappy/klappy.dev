---
uri: klappy://odd/ledger/2026-05-15-cutover-validation-session
title: "Session Ledger — Cutover Validation, Canon Authoring, Wrapper Smoke (2026-05-15 to 2026-05-16)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["ledger", "session", "telemetry", "wrapper-validation", "canon-authoring", "performed-prudence", "smoke-gate"]
epoch: E0008
date: 2026-05-16
derives_from: "odd/handoffs/2026-05-14-telemetry-coverage-completeness.md, canon/constraints/telemetry-validation-gate.md"
complements: "canon/observations/2026-05-16-telemetry-wrapper-intermittent-emit-loss.md, canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md"
governs: "Session record only — no operational mandates"
status: closed
---

# Session Ledger — Cutover Validation, Canon Authoring, Wrapper Smoke (2026-05-15 to 2026-05-16)

> Continuation of the 2026-05-14 telemetry-coverage-completeness handoff. Three things happened: (1) the handoff's "24-hour soak + per-tool 95% statistical threshold" verdict model was identified as performed prudence and replaced with a deterministic smoke-and-verify gate canonized at `klappy://canon/constraints/telemetry-validation-gate`; (2) smoke against main preview and prod proved the wrapper measures accurately (every bytes_in matches no-space JSON of args exactly, every SSE bytes_out is non-zero, defeating the original wire-edge race); (3) a residual non-deterministic emit-loss bug was identified, documented, and accepted as a follow-up fix rather than a promotion blocker.

---

## D — Decisions

**D1. Replaced soak gate with smoke gate.** The handoff's "wait 24h, require ≥95% per-tool coverage with ≥5 organic samples" model was incoherent for oddkit, where organic load is essentially the maintainer plus the orchestrator. Klappy's correction collapsed the two-gate model I initially proposed into one gate: enumerate registered tools, drive one synthetic call per tool per surface, verify emitted bytes/tokens match the wrapper's measurement points (`JSON.stringify(args)` and `JSON.stringify(result.content)`).

**D2. Cleanup_storage hang accepted as intentional.** `oddkit_cleanup_storage` hangs at 30s and 120s timeouts. Klappy's call: leave it; the endpoint should be private to him (cache flush affects all consumers), and deterministic content-addressed caching makes the operation mostly moot. Not a wrapper bug — the handler never returns, so the wrapper never emits.

**D3. Promote on smoke evidence; file emit-loss as follow-up.** Both main preview and prod smoke passes dropped 2 of 16 successful calls' telemetry rows on first try. The wrapper IS attached (retries emit cleanly); the issue is most likely a `writeDataPoint` flush race tied to SSE-response isolate lifecycle. Klappy: ship the promotion, fix in a follow-up.

**D4. Bugbot finding on the canon I wrote was real and fix-forward.** Bugbot flagged the original procedure's reference to `request_body`/`response_body` (full HTTP bodies) as wrong — the wrapper measures `args` and `content` envelope. PR #210 merged with a partial correction; PR #211 fixed the residual SSE-zero claim that contradicted the wrapper's own design.

---

## O — Observations Closed

**O1. Pre-wrapper telemetry already populated the four numeric fields.** AE rows on `worker_version = '0.27.0'` for the tools that emitted at all showed non-zero `bytes_in`, `bytes_out`, `tokens_in`, `tokens_out`. The wrapper's value is closing *silent-tool gaps* (registrations that previously emitted no `tool_call` event), not closing *per-field gaps* on emitting tools. This recasts the original "coverage gap" framing.

**O2. Wrapper measurement is byte-exact for args.** Every emitted `bytes_in` across both smoke passes matches `utf8_byte_length(JSON.stringify(args, no-spaces))` exactly. JS `JSON.stringify` default produces no-space JSON; Python `json.dumps` default produces with-space JSON. Initial expected-value computations using Python defaults appeared off by 2-3 bytes; rerunning with `separators=(',', ':')` produced exact matches.

**O3. SSE bytes_out is non-zero, contrary to the Emission Contract's literal text.** The Emission Contract's "0 for streamed (SSE) responses" caveat applies to the *old wire-edge instrumentation*, not the new wrapper. The wrapper measures the in-memory envelope before transport framing. All 14 successful SSE responses in the main preview pass and all 14 in the prod pass emitted non-zero `bytes_out` (range 288 to 28,765). The wrapper's in-memory measurement defeats the original wire-edge SSE race that motivated the wrapper's existence.

**O4. Token counts roughly bytes/4 across all tools.** Consistent with `cl100k_base` shape for English/JSON-ish payloads. No tokenization failures observed (would manifest as zero tokens with non-zero bytes — never seen).

**O5. Intermittent emit-loss is non-deterministic.** Main preview pass dropped `oddkit_get` and `oddkit_validate`. Prod pass dropped `oddkit_validate` and `oddkit_preflight`. Different sets between runs rule out per-tool wrapper attachment as the cause. Documented in `klappy://canon/observations/2026-05-16-telemetry-wrapper-intermittent-emit-loss`.

---

## L — Learnings

**L1. Performed prudence can leak into canon authoring.** PR #210 originally encoded a 24-hour soak gate with statistical thresholds — patterns transplanted from enterprise validation onto a one-person tool. Klappy course-corrected the operational plan; the canon I wrote still carried the same DNA until the rewrite. Canon-first absolute is a check on session drift, but canon written hastily can carry the very anti-pattern it should prevent.

**L2. The deterministic question deserves a deterministic gate.** "Does the wrapper emit the numbers we expect for the payloads we send?" is fully answered by one synthetic call per tool. Wrapping that in soak windows and percentage thresholds adds ceremony without adding signal. The canon now reflects this; future telemetry-surface validation should not re-introduce statistical framing without first ruling out determinism.

**L3. Bugbot is a real reviewer; high-severity findings on canon are not edge cases.** Bugbot caught a substantive factual error in the canon I authored — the kind of error that makes the gate "always fail when correctly implemented." Treating Bugbot as a release gate (Rule 1) and treating canon authoring as a release surface are the same posture.

**L4. SSE response lifecycle is a load-bearing variable for AE writes.** The intermittent emit-loss only manifests on SSE-framed responses (which is all MCP responses through this transport). Non-streaming responses would let `writeDataPoint` flush before the isolate winds down. The diagnostic suggests `ctx.waitUntil` as the fix — the same pattern E9 substrate-becomes-the-wire warned about in a different context applies here at the AE-write layer.

**L5. Surface-specific verdict shape matters.** The handoff's gate spec assumed prod and preview were both available for the same verdict computation. They are not. The two-gate framing I proposed was an attempt to honor that. Klappy's collapse-to-one-gate was sharper: the underlying question is the same on both surfaces; only the smoke driver changes.

---

## C — Constraints

**C1. Cleanup_storage hang accepted as permanent.** Not a v+1 revisit candidate. The endpoint's intended design is private (Klappy-only access); deterministic content-addressed caching renders the cleanup operation mostly unnecessary; the timeout-and-no-emit pattern is acceptable downstream of that design intent.

**C2. Release-validation-gate Rule 2 interpretation for wrapper-only changes.** The canon at `klappy://canon/constraints/telemetry-validation-gate` §"Relationship to release-validation-gate Rule 2" reads the wrapper change as NOT triggering Rule 2's "load-bearing surface" criterion (no response-envelope change, no tool add/remove, no governance-read change, no orchestrate.ts edit). Klappy proceeded under this reading. If a future wrapper change does touch Rule 2 surface, both gates apply.

---

## H — Handoffs

**H1. Wrapper emit-loss fix per PR #212.** Open PR documents the bug; the actual fix (wrap emit in `ctx.waitUntil`) is separate code work, not yet started. Owner: TBD. Surface: `workers/src/telemetry.ts` `withTelemetry` wrapper. Plumbing required: `ExecutionContext` through `makeToolWrapper` alongside `env`, `request`, `capturedClientInfo`.

**H2. Original cutover handoff superseded.** The "24-hour soak validator dispatch" step in `klappy://odd/handoffs/2026-05-14-telemetry-coverage-completeness` Definition of Done step 7 is superseded by `klappy://canon/constraints/telemetry-validation-gate`. The original handoff's framing carried the soak assumption that does not apply to oddkit's load profile.

**H3. canon-quality.yml audit gate behaved correctly.** All three PRs in this session (#210, #211, #212) hit the audit; reference-integrity and frontmatter checks all completed successfully. No `oddkit_audit` non-determinism issues observed in this session, though the bug at `klappy/oddkit#149` remains open.

---

## E — Encodes

- `klappy/klappy.dev#210` — `canon/constraints/telemetry-validation-gate.md` (merged 2026-05-16T00:22Z, with the Bugbot-flagged residual issue)
- `klappy/klappy.dev#211` — fix-forward for SSE bytes_out claim (merged 2026-05-16T01:17Z)
- `klappy/klappy.dev#212` — `canon/observations/2026-05-16-telemetry-wrapper-intermittent-emit-loss.md` (open at session close)
- `klappy/oddkit#162` — `main → prod` promotion (merged 2026-05-16T01:10Z, brought wrapper code to prod)
- Smoke evidence in `oddkit_telemetry`: consumer_label `oddkit-smoke` rows for windows `2026-05-16 00:30:00 → 00:33:00` (main preview, `worker_version 0.28.0`) and `2026-05-16 01:12:00 → 01:15:00` (prod, `worker_version 0.28.0`)
- This session ledger

---

## O — Opens

**O-open-1. Wrapper emit-loss fix.** PR #212 documents; fix not yet written. Suggested change in `workers/src/telemetry.ts`: wrap the emit in `ctx.waitUntil(emitWrapperTelemetry({...}).catch(() => {}))`. Requires plumbing `ExecutionContext` through `makeToolWrapper`. Estimated size: small.

**O-open-2. Cleanup_storage privatization.** Klappy's design intent is for `oddkit_cleanup_storage` to be a private endpoint that only he can hit. Not yet implemented. Auth gating not yet specified. May be obsoleted entirely if deterministic caching makes the operation unnecessary in practice.

**O-open-3. PR #212 still in CI.** At session close, Bugbot was still in_progress on the observation PR. Reference integrity and frontmatter passed. If Bugbot finds anything, it's a fix-forward on the observation text, not a release issue.

**O-open-4. Audit non-determinism (`klappy/oddkit#149`).** Not exercised in this session, but remains open. The 3-run warm-cache pattern from the canon was not needed here because the smoke gate is deterministic by design.

---

## Session Arc

The session opened on a continuation handoff that framed the cutover validation as a 24-hour soak window with fresh-context validator dispatch. The first verdict I produced inside that framing was internally consistent but answered the wrong question — coverage on a surface that doesn't receive the load the gate assumes. Klappy's two interventions ("don't we need to promote?" and "24-hour soak makes no sense") collapsed the framing twice: first to recognize that preview-only verification was incoherent, then to recognize that statistical thresholds were performed prudence.

The corrected gate canonized in `klappy://canon/constraints/telemetry-validation-gate` is deterministic, surface-portable, and operator-runnable. The smoke evidence against main preview and prod confirms the wrapper's primary claim (in-memory measurement defeats wire-edge SSE) and surfaces a residual `writeDataPoint` flush race that becomes the next code beat. The promotion shipped on the smoke verdict; the residual bug is owned by `klappy://canon/observations/2026-05-16-telemetry-wrapper-intermittent-emit-loss`.

The canon authoring itself went through one fix-forward cycle: Bugbot caught a real high-severity error (wrong measurement source in the procedure), the merged version corrected the primary issue, PR #211 corrected the residual SSE claim with smoke evidence as the receipt. The pattern proves the release-validation-gate canon's Rule 1 ("Bugbot is a real reviewer") applies to canon-authoring PRs the same way it applies to code PRs.
