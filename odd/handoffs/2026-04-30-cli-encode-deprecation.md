---
uri: klappy://odd/handoffs/2026-04-30-cli-encode-deprecation
title: "Handoff — Deprecate Node CLI Encode Path (src/tasks/encode.js Consumers, Worker Is Source of Truth)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "handoff", "session", "epoch-8.4", "cli-deprecation", "node-cli", "src-tasks-encode-js", "vodka-architecture", "single-source-of-truth", "audit-2026-04-30"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/principles/code-claims-require-code-observation.md, odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed.md, docs/architecture/encode-current-state-2026-04-30.md"
complements: "docs/architecture/encode-current-state-2026-04-30.md"
governs: "Deprecation path for the Node CLI encode tool surface (klappy/oddkit src/tasks/encode.js, src/mcp/orchestrate.js, src/core/actions.js encode handlers). Worker (workers/src/orchestrate.ts runEncodeAction) is the single source of truth for encode behavior."
status: active
---

# Handoff — Deprecate Node CLI Encode Path

> The Cloudflare Workers MCP server (`workers/src/orchestrate.ts:runEncodeAction`) is governance-driven and current. The Node CLI MCP server (`src/tasks/encode.js`, wired via `src/mcp/orchestrate.js` and `src/core/actions.js`) still uses the original four-keyword `detectEncodeType` regex. Same tool name, two surfaces, divergent behavior. The audit confirmed this; the operator confirmed deprecation is the right path. This handoff queues the work.

---

## Summary — What and Why

The CLI encode path is not just stale — it is structurally inconsistent with the canon-driven worker. Maintaining two implementations of the same MCP tool is a vodka-architecture violation: the code surface that consumes the canon should be a single thin server, not two diverging ones. Operator decision is to deprecate the CLI path rather than port it.

This is not a Phase 2 blocker. The CLI is rarely used (consumer count unknown but presumed near-zero — the production deployment is the worker). Deprecation can run on its own timeline, gated only by confirming there are no active CLI consumers.

---

## Scope

**In scope:**

1. Add a deprecation notice to `src/tasks/encode.js` (top-of-file JSDoc warning + console.warn at runtime).
2. Add a deprecation notice to `src/mcp/orchestrate.js` and `src/core/actions.js` for the `encode` action paths.
3. Update `README.md` and any setup docs that mention the Node CLI as an alternative to the Workers deployment.
4. Schedule removal: target oddkit 0.30.0 (or whatever minor lands one quarter from this handoff date — operator confirms before removal).
5. Confirm zero active CLI consumers via telemetry (`telemetry_public` query for `transport: "stdio"` or equivalent, last 30 days) before final removal.

**Out of scope:**

- Porting the CLI parser to governance-driven. Decision is deprecation, not parity.
- Removing the Node CLI entirely. Other CLI tools (search, get, catalog, version) may remain; only the encode action is deprecated. (Verify this — if the entire Node CLI is dormant, broader retirement may be cheaper than per-action deprecation.)
- Worker-side changes. The worker is the source of truth and is unaffected.

---

## Acceptance Criteria

For the deprecation PR:

1. CLI users invoking `encode` see a clear deprecation notice with a link to migrate to the Workers MCP server URL.
2. README and docs no longer present the CLI as a peer to the Workers deployment for encode functionality.
3. The deprecation notice references this handoff and the target removal version.

For the eventual removal PR:

1. Telemetry shows no encode CLI calls in the prior 30 days.
2. `src/tasks/encode.js`, `src/mcp/orchestrate.js` encode wiring, and `src/core/actions.js` encode handler removed in one commit.
3. Tests touching the CLI encode path removed; coverage gate not regressed.
4. CHANGELOG entry naming the removal version, the date, and the operator decision.

---

## Pitfalls

- **Don't remove without telemetry confirmation.** If a single consumer is still calling the CLI encode path, removal will break them silently. Telemetry first, removal second.
- **Don't conflate CLI encode with CLI as a whole.** Other CLI actions may have their own consumer profiles. Scope discipline matters.
- **Don't backport governance-driven encode to the CLI as a "nice to have."** Operator decision is deprecation. Backporting is parity work and was explicitly declined; doing it anyway is mode collapse.

---

## Open Items

| Tag | Description | Priority |
|---|---|---|
| O-open | Confirm zero active CLI encode consumers via telemetry before scheduling removal. | P2 |
| O-open | Decide whether the entire Node CLI should be retired alongside the encode path or whether other CLI actions remain. Cheaper to retire whole if dormant. | P2 |
| O-open | If retaining the CLI for non-encode actions, decide whether to ship a polyfill that proxies CLI encode calls to the worker rather than failing outright. Adds compatibility surface; pure deprecation is cleaner. | P3 |

---

## See Also

- [Audit 2026-04-30 Cleanup Ledger](klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed) — the parent handoff that surfaced this
- [Encode Current State (2026-04-30)](klappy://docs/architecture/encode-current-state-2026-04-30) — what the worker actually does today
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the principle that motivates single-implementation discipline
- [Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation) — the principle this audit graduated
