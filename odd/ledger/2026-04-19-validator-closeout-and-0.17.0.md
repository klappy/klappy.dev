---
uri: klappy://odd/ledger/2026-04-19-validator-closeout-and-0.17.0
title: "Session Ledger — Validator Closeout and 0.17.0 Release"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "ledger", "session", "epoch-8.3", "release", "validation", "frontmatter-schema", "closeout"]
epoch: E0008.3
date: 2026-04-19
session_span: "2026-04-19 closed"
derives_from: "odd/handoffs/2026-04-20-fresh-session-continuation.md, odd/ledger/2026-04-19-agent-team-pilot.md"
governs: "Retrospective record of the 2026-04-19T17:08–17:45Z session that closed out the Sonnet 4.6 validator arc from the prior session, shipped the frontmatter schema additions, and cut the 0.17.0 release."
status: active
---

# Session Ledger — Validator Closeout and 0.17.0 Release

> A prior session hung mid-investigation of a Sonnet 4.6 validator it had dispatched against three already-merged klappy.dev PRs. This fresh session reconstructed validator state from the Managed Agents API, found a clean VERIFIED verdict waiting, then closed the single open item (frontmatter schema gap) and shipped the deferred 0.17.0 release in parallel. Production is at 0.17.0, envelope smoke 24/24 pass on both main preview and prod. The next session can resume on P1.2 (`oddkit_encode` batch-mode + canary refactor) with a thin prompt; all prerequisites from the prior handoff are cleared.

---

## Summary — Prior Session Closed, 0.17.0 in Production, P1.2 Unblocked

The previous session (chat `5fb73cb9`) dispatched a Sonnet 4.6 validation agent against klappy.dev PRs #113 / #114 / #115 at 16:47Z, then hung while trying to poll the results. This session started 17:08Z by reconstructing state from the Managed Agents API, retrieving the validator's full report (VERIFIED, 95% confidence, zero blocking findings, one open item — frontmatter schema gap), and working through the operator's requested order: schema first, ship second, closeout third.

Both tasks shipped in parallel once the operator corrected the initial serial-polling instinct. klappy.dev PR #116 added the missing schema fields (`status`, `superseded_by`, `governs`, `session_span`) across `canon` / `docs` / `odd` audiences. oddkit PRs #112 (feature branch → main) and #113 (main → prod) cut the 0.17.0 release — backfilling `[Unreleased]` with the full E0008 → E0008.3 arc and bumping both package.json files, both lockfiles, and the CHANGELOG. Prod smoke returned 24 / 24 pass with health reporting `version: 0.17.0`.

Nothing outstanding from the validator arc. P1.2 (`oddkit_encode` batch-mode + canary refactor) is the next unit of work per the P1.2-specific handoff, and all its prerequisites (DOLCHEO canon merged, frontmatter schema covers the fields it will use) are now satisfied.

---

## Decisions

- **D1 — Accept validator VERIFIED disposition for PRs #113 / #114 / #115.** Evidence hashes matched production MCP content. Two advisory findings (FM-1, FM-2) both `accept` — fields are semantically correct, gap is in the schema not the docs.
- **D2 — Schema before ship, both in parallel after operator correction.** Operator ordering was "schema, ship, then closeout." Initial execution was serial (poll Bugbot on #116, then start oddkit work). Operator flagged the parallelism lapse and the two PRs ran concurrently thereafter.
- **D3 — Schema changes strictly additive.** No existing row removed or narrowed. Only `canon.status` extended (added `"superseded"` alongside existing `"active"` / `"proposed"` / `"final"`). Symmetric `superseded_by` added to `canon` where `supersedes` already lived, then both added to `docs`. `odd` audience gained `complements` / `governs` / `status` / `session_span`.
- **D4 — 0.17.0 MINOR not PATCH.** New standalone tool (`oddkit_time`), new envelope contract fields (`server_time`, `governance_source`), breaking argument rename (`canon_url` → `knowledge_base_url`, legacy accept stripped). Pre-1.0 semver allows breaking changes in MINOR and this aligns with user-facing contract scope.
- **D5 — Supersede prior fresh-session-continuation handoff rather than edit in place.** The handoff doc is tier-3 stable and its session_span already declared closed. Additive state changes belong in a new forward-pointing handoff; the old one gets `status: superseded` + `superseded_by` pointer.

## Observations (closed)

- **O1 — Filesystem resets between sessions.** The prior session's `/home/claude/work/validator-events.json` and `validator-session.txt` were gone at session start. Managed Agents API was the only reconstruction path.
- **O2 — Validator completed in 9 minutes with zero errors.** `agent_011CaDUFJYJ6W3ZPE9DrZ4Ha` / `sesn_011CaDUFMF2HZ95s4t74oMmj` went idle at 16:56Z. Prior orchestrator hung before reading.
- **O3 — Validator report is substantive and honest.** 246-line ledger with per-check evidence hashes, per-finding dispositions, and one open item surfaced correctly. Fresh-context Sonnet 4.6 with read-only scope did exactly the job the pattern was designed for.
- **O4 — Schema diff 10+/3-.** Small PR, narrow scope, Bugbot ✅ within ~3 minutes of push.
- **O5 — CHANGELOG backfill covered ~60 commits since 0.16.0 (2026-04-03).** Grouped into Added / Changed / Fixed / Notes with epoch progression (E0008 → E0008.1 → E0008.2 → E0008.3) called out explicitly.
- **O6 — Branch preview slug transform: slashes AND dots become hyphens.** `chore/v0.17.0-release` → `chore-v0-17-0-release`. Matches the dots-to-hyphens CI fix from an earlier session.
- **O7 — Smoke script URL contract requires `/mcp` suffix.** First branch-preview smoke passed bare origin; hit site 404 page instead of MCP endpoint. Retry with `/mcp` appended passed 24 / 24.
- **O8 — Main preview transient DNS cache overflow on first post-merge smoke.** Second call 10s later passed cleanly. Typical CF warmup artifact.
- **O9 — Prod deploy latency ~30s.** Health endpoint reported 0.16.0 for three polls, then flipped to 0.17.0 on the fourth.

## Learnings

- **L1 — Independent PRs default to parallel execution.** When two PRs touch different repos with no shared gate, polling one while drafting the other is the rhythm. Serial polling externalizes cost onto wall-clock time for no correctness gain.
- **L2 — Reconstruction from Managed Agents API is reliable.** When filesystem state is lost, `GET /v1/agents` + `GET /v1/sessions?agent_id=…&order=desc` + `GET /v1/sessions/{id}/events` fully reconstructs orchestrator context. Query parameter name is `agent_id`, not `agent`.
- **L3 — Smoke test invocation contract is documented in the script's header.** `ODDKIT_URL` is the full MCP endpoint, not just origin. The comment `ODDKIT_URL=https://preview-xxx.oddkit.klappy.dev/mcp` spells this out. Read the script header before running it with a custom URL.
- **L4 — Lockfile versions need syncing too.** Both `package-lock.json` files carry a top-level `version` field and a `packages[""].version` field. Pre-commit hook only checks the `package.json` files, but CI or consumers reading lockfiles will see drift if lockfiles are not synced in the same commit.
- **L5 — Session can be recovered even when the prior orchestrator hung.** Managed Agents API is durable. Recent_chats + tool_search for the agent object + event log fetch is the recovery pattern.

## Constraints

- **C1 — Pre-commit hook enforces `package.json` version sync.** Drift is blocked. Lockfiles need manual sync in the same commit (hook does not check them).
- **C2 — Managed Agents API session query parameter is `agent_id` (not `agent`).** Wrong name returns a 400 with a list of valid parameters.
- **C3 — Branch preview slug: slashes → hyphens AND dots → hyphens.** Both transformations apply. `feat/foo.bar` → `feat-foo-bar`.
- **C4 — `oddkit_time` is the first tool call of every turn.** Pass the prior response's `server_time` as `reference` to get current time and elapsed-since-last-turn in one call.

## Handoffs

- **H1 — Merges this session:**
  - `klappy/klappy.dev#116` → `c855ddf` — frontmatter schema additions, closes the single O-open from the prior validator report.
  - `klappy/oddkit#112` → `035dc41` — 0.17.0 release, CHANGELOG backfill + version bump (squash into main).
  - `klappy/oddkit#113` → `34e63fb` — main → prod promotion for 0.17.0 (merge commit).
- **H2 — Production state:** `https://oddkit.klappy.dev/health` reports `version: 0.17.0`. Prod envelope smoke 24 / 24 at `https://oddkit.klappy.dev/mcp`.
- **H3 — Forward pointer:** `klappy://odd/handoffs/2026-04-20-post-closeout` supersedes `klappy://odd/handoffs/2026-04-20-fresh-session-continuation`. Next-session reader should start there.
- **H4 — Next work unit:** P1.2 (`oddkit_encode` batch-mode + canary refactor) per `klappy://odd/handoffs/2026-04-20-p1-2-encode-canary`. All prerequisites now cleared.

## Encodes

- Validator event log persisted at `/home/claude/work/validator-events.json` (local to this session, ephemeral).
- Validator report (246 lines) transcribed to `/home/claude/work/ledger/validator-pr113-114-115-report.md` (local to this session).
- This ledger committed to the codebase at `odd/ledger/2026-04-19-validator-closeout-and-0.17.0.md`.
- Forward-pointing handoff committed at `odd/handoffs/2026-04-20-post-closeout.md`.
- Prior handoff marked superseded in the same PR.

## Timeline

| Time (UTC)  | Event                                                                                 |
|-------------|---------------------------------------------------------------------------------------|
| 17:08       | Fresh session start, bootstrap fetched, prior session transcript retrieved            |
| 17:09       | Validator verdict retrieved from Managed Agents API (VERIFIED, idle since 16:56)      |
| 17:17       | klappy.dev #116 opened — frontmatter schema additions                                 |
| 17:24       | oddkit #112 opened — 0.17.0 release (parallel with #116 after operator correction)    |
| 17:28       | #116 merged (Bugbot ✅, squash)                                                       |
| 17:33       | oddkit branch preview smoke 24 / 24 at chore-v0-17-0-release-oddkit.klappy.workers.dev |
| 17:35       | #112 merged (Version Sync / Creed / Bugbot / CF Preview / Workers Builds ✅, squash)   |
| 17:38       | Main preview redeploys to 0.17.0; smoke 24 / 24 after one transient retry             |
| 17:39       | oddkit #113 opened — main → prod promotion                                            |
| 17:40       | #113 merged                                                                           |
| 17:41       | Prod serves 0.17.0; smoke 24 / 24                                                     |
| 17:45       | Ledger + handoff drafted; supersession PR prepared                                    |

## Open items

(All P-banded items from the prior handoff's open list are resolved by this session. One prospective item surfaced:)

- **[O-open P5]** **P2.2 (CHANGELOG render on klappy.dev)** — Add `/oddkit/changelog` route that renders `CHANGELOG.md` from the oddkit repo, then add `version_notes_url` to the MCP `initialize` response. Observability win. Not blocking; slot into the post-refactor-arc pass when tool envelopes are being touched anyway. Low priority.
