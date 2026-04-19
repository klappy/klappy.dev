---
uri: klappy://odd/handoffs/2026-04-20-p1-2-encode-canary
title: "Handoff — P1.2 oddkit_encode Batch Mode + Prompt-Over-Code Canary"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "handoff", "session", "p1-2", "oddkit-encode", "batch-mode", "prompt-over-code", "canary", "knowledge-base-fetcher", "dolcheo", "epoch-8.3"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-19 closed"
derives_from: "odd/handoffs/2026-04-20-fresh-session-continuation.md, odd/ledger/2026-04-19-agent-team-pilot.md, canon/definitions/dolcheo-vocabulary.md, canon/constraints/core-governance-baseline.md"
governs: "The P1.2 implementation arc in the fresh session that picks up from 2026-04-19"
status: active
---

# Handoff — P1.2 oddkit_encode Batch Mode + Prompt-Over-Code Canary

> P1.1 shipped clean. DOLCHEO canon umbrella plus per-type governance docs merged to klappy.dev main via PR #112, and the three prior-session PRs (#109 ledger, #110 self-report principle, #111 fresh-session handoff) merged via this session. P1.2 is the next major arc: extend `oddkit_encode` to accept all six batch-mode letter prefixes (`[D]/[O]/[L]/[C]/[H]/[E]`) with per-artifact array output, and refactor the tool to read DOLCHEO vocabulary from canon at runtime via the prompt-over-code canary pattern. One PR on klappy/oddkit, path 3 orchestrator-applies workflow, Sonnet 4.6 validation agent. Estimate 90–150 min. The telemetry_policy canary (klappy/oddkit PRs #108/#109) is the reference shape; the DOLCHEO umbrella is the vocabulary source of truth to read at runtime.

---

## Where we are — P1.1 is done, P1.2 is next

**Shipped to production this session (2026-04-19):**

- `klappy/klappy.dev#112` — DOLCHEO canon umbrella + per-type encoding governance. Merged at `d030871`. Adds `canon/definitions/dolcheo-vocabulary.md` (228 lines, tier 2 canon, the umbrella contract), `odd/encoding-types/encode.md` (53 lines, letter E governance), `odd/encoding-types/open.md` (60 lines, letter O facet=open governance), plus a See Also cross-ref on `odd/encoding-types/observation.md`.
- `klappy/klappy.dev#109` — Agent-team-pilot session ledger, merged at `526c2051` after an editorial fix renaming the session-open `### Open items (forward-pointing)` header to `### Session-open queue (planned)` to distinguish the planned-queue-at-open from the forward-pointing-at-close snapshot. Bugbot's duplicate-section finding resolved.
- `klappy/klappy.dev#110` — `canon/principles/agent-self-report-under-stress.md` (tier 2). Merged at `62581600`.
- `klappy/klappy.dev#111` — The handoff doc that bootstrapped the 2026-04-19 session. Merged at `f5c8999b`.
- `klappy/klappy.dev#113` — DOLCHEO cleanup: flipped `docs/oddkit/proactive/dolche-vocabulary.md` to `status: superseded` with `superseded_by:` pointer, added banner. Acknowledged the intentional O/O-open collision in `odd/encoding-types/how-to-write-encoding-types.md`. Merge status: check at session start.

**Prod MCP state:** `https://oddkit.klappy.dev/mcp` at oddkit v0.16.0, serving from `https://raw.githubusercontent.com/klappy/klappy.dev/main`. Search index size 514+ (depending on whether #113 merged before this handoff was written). All DOLCHEO artifacts verified live via `oddkit_get` and `oddkit_search`.

**Not started in this session and deferred to you:** P1.2 (below) — no edits on `klappy/oddkit` in this session. The repo is untouched since the prior session's prod promotion at `fae2df6` / v0.16.0.

---

## P1.2 scope — one PR on klappy/oddkit

Two concerns, one PR, because they are the same work: the tool can't do batch mode with a hardcoded vocabulary, and the canary refactor is what makes the vocabulary canon-resolved.

### Feature half — batch-mode input

- Accept paragraph-split `input` with optional per-paragraph prefixes `[D]`, `[O]`, `[L]`, `[C]`, `[H]`, `[E]`. Six unique letters (DOLCHEO uses seven types but the letter registry is six, per the umbrella's "Both Os remain O" section). An `[O-open]` subtype hint is accepted and resolves to letter `O` with facet `open` — see `odd/encoding-types/open.md` for the facet schema.
- Return a per-artifact array instead of a single collapsed blob. Each artifact gets its own quality score, persist_required flag, gap messages, and the canon envelope (governance_source, server_time, etc).
- Single-artifact input without any prefix must still work — existing heuristic-based classification stays as the fallback path. Backward behavior preserved.
- Tool response envelope on batch input: `{ action: "encode", result: { artifacts: [...] }, ... }` with `artifacts` as the new array. For single-artifact / no-prefix input, `result` stays flat as today, or wrap in `artifacts: [single]` for uniformity — implementer's call, but document whichever shape lands.

### Refactor half — prompt-over-code canary for encode

Same pattern as `telemetry_policy` in klappy/oddkit PRs #108 and #109 (the completed reference). Read the vocabulary from canon at runtime via `KnowledgeBaseFetcher` with three-tier resolution.

Tier 1 (preferred): live canon — fetch `klappy://canon/definitions/dolcheo-vocabulary` from `DEFAULT_KNOWLEDGE_BASE_URL` (which points at klappy.dev main), parse the Seven Letters section and the tool-level implications.
Tier 2 (fallback): bundled baseline — a minimal DOLCHEO vocabulary shipped with the worker, used when live canon is unreachable. Just the six letter → name mapping plus the Open facet rule. Enough to keep encode working without external I/O.
Tier 3 (fail-loud): if both live and bundled sources return nothing parseable, return an actionable error envelope — not a silent default. Consistent with the core-governance-baseline contract (`canon/constraints/core-governance-baseline.md`).

Response envelope must declare `governance_source: "knowledge_base" | "bundled" | "minimal"` so callers can see which tier resolved. Same field the telemetry_policy canary writes.

Zod schema on the tool args accepts an optional `knowledge_base_url` override (for strict-mode testing where you want to force Tier 1 to fail and observe Tier 2/3 behavior). Same override shape as the telemetry canary.

### Smoke test extension

Extend `workers/test/canon-tool-envelope.smoke.mjs` with new encode assertions:

- Envelope shape on batch input: top-level `result.artifacts` is an array; each element carries `type`, `quality_level`, `persist_required`, and the canon envelope fields.
- `governance_source` present and valid on every encode response.
- Batch-mode per-artifact output: three-paragraph input with `[D]/[O]/[L]` prefixes returns exactly three artifacts with matching types.
- Single-artifact backward behavior: unprefixed single-paragraph input still returns a usable response (whatever shape is chosen — document it).
- `knowledge_base_url` override that points at a nonexistent file falls through to Tier 2 (bundled) — `governance_source: "bundled"`. A second override that disables bundled (implementation choice how) falls through to Tier 3 — actionable error envelope.

The smoke test currently runs `ODDKIT_URL=<preview> node workers/test/canon-tool-envelope.smoke.mjs` and must exit 0 with all assertions green.

### Tool description update

After the code lands, update the `oddkit_encode` tool description (in `workers/src/tools/encode.ts` or wherever the MCP tool definition lives) to reference DOLCHEO (seven artifact types, six letters, `[O-open]` subtype hint for the forward-pointing O) and mention batch-mode prefix syntax. The handoff that spawned P1.1 explicitly deferred this description update pending the refactor; ship it with the same PR.

---

## Path 3 workflow — orchestrator applies, Sonnet validates

Managed-agent execution on klappy/oddkit is blocked by a safety-layer false-positive. Operator has decided not to report this upstream. **Do not dispatch Opus 4.7 execution agents to klappy/oddkit.** Sonnet 4.6 read-only validation is fine.

Working rhythm:

1. Clone klappy/oddkit into `/home/claude/work/oddkit`, cut branch `encode/batch-mode-and-canary-refactor` off main.
2. Apply edits locally. Encode implementation is in `workers/src/` — find the file by grepping for existing encode code (the prior renaming from `canonUrl` to `knowledgeBaseUrl` touched `workers/src/zip-baseline-fetcher.ts` and neighbors; encode lives nearby).
3. Commit. Githooks run on commit and enforce version sync between `package.json` and `workers/package.json`. Don't skip.
4. Push to branch. Cloudflare auto-deploys every pushed branch to `https://<branch-slug>-oddkit.klappy.workers.dev/mcp` (slashes → hyphens). **Do not run `wrangler deploy` manually.**
5. Smoke the preview: `ODDKIT_URL=<preview-url> node workers/test/canon-tool-envelope.smoke.mjs`. Must exit 0.
6. Open PR via `urllib.request` + `json.dumps`. **Never inline shell heredoc JSON.**
7. Dispatch Sonnet 4.6 validator as a new agent object — not a session on an existing agent. `model: claude-sonnet-4-6`. Beta header: `managed-agents-2026-04-01`. Environment id: `env_016RffZyqSdHeb5s3Z6UABw8`. MCP: oddkit bound, read-only role. Acceptance criteria: PR URL, HEAD SHA, list of DOLCHEO canon URIs the tool must fetch, smoke test passing locally and on the preview URL. Template lives in `odd/ledger/2026-04-19-agent-team-pilot.md` and `canon/principles/agent-self-report-under-stress.md` (for how to read agent self-reports skeptically).
8. Accept VERIFIED or iterate. Do not trust the agent's terminal self-report as sole evidence — per `canon/principles/agent-self-report-under-stress`, pull the event log and corroborate tool calls against external state.
9. Squash-merge on VERIFIED. Run main-preview smoke: `ODDKIT_URL=https://main-oddkit.klappy.workers.dev/mcp node workers/test/canon-tool-envelope.smoke.mjs`.
10. Open main → prod PR (the operator prefers PRs over direct `promote.sh` pushes). Merge when green. Final smoke at `https://oddkit.klappy.dev/mcp`.

Six gates, each mechanical, each producing evidence. Expected total orchestrator time: 90–150 min including agent validation overhead.

---

## Standing rules for the fresh session

These carry from the prior handoff (`klappy://odd/handoffs/2026-04-20-fresh-session-continuation`) and apply unchanged:

- Call `oddkit_time` first in every turn, passing the prior `server_time` as `reference`. No inferred timestamps.
- Declare epistemic mode out loud. P1.2 opens in planning until preflight + plan are confirmed; then execution; then validation via Sonnet 4.6 agent (context-break required).
- Search canon before asking. Specifically for this arc: `klappy://canon/definitions/dolcheo-vocabulary`, `klappy://canon/constraints/core-governance-baseline` (three-tier fallback contract), and the per-type encoding docs under `odd/encoding-types/` are the primary reads.
- Track DOLCHEO continuously in `/home/claude/work/ledger/<date>-p1-2-encode-canary.md`. Save encode output to file — encode does NOT persist on its own.
- During execution, produce artifacts, not questions. Reversion requires one sentence naming the specific unknown.
- Never force-push without `git fetch` and remote diff first. The prior session's run-1 finding stands: a prior agent may have silently pushed work.
- GitHub API: Python `urllib.request` with `json.dumps`. Never bash heredoc.
- `$HOME=/root` in the managed-agent cloud container, not `/home/user` as the skill doc says.

---

## Reference material — read this at session start

Priority order for fresh-session reading:

1. This doc.
2. `klappy://canon/bootstrap/model-operating-contract` — the evolving operating contract.
3. `klappy://canon/definitions/dolcheo-vocabulary` — the vocabulary your refactor will read at runtime.
4. `klappy://canon/constraints/core-governance-baseline` — the three-tier resolution contract.
5. `klappy://canon/principles/agent-self-report-under-stress` — read before dispatching the Sonnet validation agent.
6. `klappy://odd/ledger/2026-04-19-agent-team-pilot` — the path-3 pattern in action, with the agent-team template for the Sonnet validator.
7. `klappy://canon/meta/frontmatter-schema` — if you touch any docs, native YAML types only.
8. `klappy://canon/constraints/ai-voice-cliches` — if you touch any writing, avoid negation parallelism and em-dash overuse.

The `klappy/oddkit` reference PRs for the canary pattern:

- `klappy/oddkit#108` and `#109` — the `telemetry_policy` canary, merged. Reference shape: what `governance_source` looks like in a real envelope, how the Zod override is wired, how the smoke test asserts three-tier behavior.
- `klappy/oddkit#110` and `#111` — the `canonUrl` → `knowledgeBaseUrl` internal rename that set up the current naming.

---

## Known foot-guns carried forward from 2026-04-19

- **Do not dispatch Opus 4.7 execution agents to klappy/oddkit.** The safety-layer false-positive halts them. Orchestrator-applies only. Sonnet read-only validation is fine.
- **Do not trust an agent's terminal self-report.** Pull the event log. Corroborate `git commit` / `git push` / PR creation / file-write claims against the external systems they affected. See the self-report-under-stress principle.
- **Do not mix shell `python3 <<PYEOF > file.txt` with in-script `open(file).write(...)`.** Shell `>` truncates on exit and overwrites the file with stdout content. Write from Python only, send diagnostics to `sys.stderr`.
- **Do not run `wrangler deploy` manually on klappy/oddkit.** Githooks + CF auto-deploy handle the pipeline.
- **Do not force-push without fetching remote first.** A prior agent may have pushed completed work silently.
- **Do not treat Cursor Bugbot's `in_progress` status as a merge blocker on klappy.dev.** It's informational, not a required check. `mergeable_state: clean` is the authoritative gate signal on that repo. (This session confirmed it on PRs #109, #110, #111, and almost certainly #113 too.)

---

## Open items going into the fresh session

- **[O-open P1]** Start P1.2. Preflight, plan, execute, validate via Sonnet 4.6, promote. The arc described in this doc.
- **[O-open P2]** If P1.2 converges cleanly and bandwidth remains, pick up the next canary in the governance-anti-pattern audit (`docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md`). Priority order per the 2026-04-20-fresh-session-continuation handoff: `oddkit_challenge`, then `oddkit_gate`, then `oddkit_preflight`, then `oddkit_validate`, then `oddkit_orient`. Each follows the same canary template.
- **[O-open P3]** Version bump on klappy/oddkit from 0.16.0 to 0.17.0 with a populated `CHANGELOG.md` `[Unreleased]` section. Deferred from the prior handoff's Priority 2 list. Natural to do in the same PR-window as P1.2 or as a separate atomic bump PR after.
- **[O-open P4]** If the `superseded_by` field and `status: superseded` value introduced in PR #113 become the standard pattern, update `canon/meta/frontmatter-schema` to include them in the canon-audience table. Low urgency; the cleanup PR's field semantics are self-describing.

---

## How this handoff will be validated

The next session should be able to open this doc, read Summary + Operating Notes + Reference Material, and start productive P1.2 work without rereading any transcripts. If the next session feels the need to reconstruct context from a prior session's messages, this handoff failed — file a learning under `canon/principles/` and revise.
