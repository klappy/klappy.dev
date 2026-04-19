---
uri: klappy://odd/handoffs/2026-04-19-fresh-session-continuation
title: "Handoff — Fresh Session Continuation from 2026-04-19 CST"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "handoff", "session", "epoch-8.3", "prompt-over-code", "continuation", "dolcheo"]
epoch: E0008.3
date: 2026-04-19
session_span: "2026-04-18 to 2026-04-19 (closed)"
derives_from: "odd/ledger/2026-04-18-e0008-3-validation-and-teams-over-swarms.md, docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md"
governs: "Fresh-session continuation context. Captures what shipped, what remains open, what the fresh session should tackle first, and the ongoing prompt-over-code refactor arc that predates E0008.3 and still governs remaining tool work."
status: active
---

# Handoff — Fresh Session Continuation from 2026-04-19 CST

> A reader of this document should be able to resume productive work without reading the full prior session transcript. The companion ledger (`klappy://odd/ledger/2026-04-18-e0008-3-validation-and-teams-over-swarms`) is the retrospective record; this document is the forward-pointing one. Start here.

---

## Where we are right now

**Current epoch:** E0008.3 (validation as fourth epistemic mode with context-break requirement). Canon merged. Covered in detail in `klappy://docs/appendices/epoch-8-3` and `klappy://canon/validation-as-epistemic-mode`.

**Next epoch (anticipated):** E0009 — self-correction. Requires teams-over-swarms principle landing first. See O11 in the ledger.

**What just shipped (this session):**

1. `klappy/klappy.dev#101` — knowledge_base_url contract rename + tier strings (canon → knowledge_base, baseline → bundled)
2. `klappy/klappy.dev#106` — forward-facing doc sweep for the rename
3. `klappy/klappy.dev#105` — validation as fourth epistemic mode (E0008.3) + context-break requirement + session ledger
4. `klappy/oddkit#105` — governance anti-pattern audit doc (11-tool sweep)
5. `klappy/oddkit#108` — telemetry_policy canary completion + rename + live smoke test template
6. `klappy/oddkit#109` — main → prod promotion of the canary arc
7. `klappy/klappy.dev#107` — DOLCHEO ledger framing + 19 open items + 5 open questions (**contains this handoff; merge after reading**)

**Verified production state:** `https://oddkit.klappy.dev/mcp` responding with full envelope (`action`, `result`, `server_time`, `assistant_text`, `debug`); `telemetry_policy` returns `governance_source: "knowledge_base"` by default; strict-override via `knowledge_base_url` correctly falls through to `minimal` tier when file missing. 24/24 smoke assertions green in prod.

---

## The governing arc that predates E0008.3 and still governs remaining work

**Prompt-over-code refactor of all oddkit tools.** This is where the session started and where the big remaining work still sits. E0008.3 was a detour that the canary incident forced us into — a good detour, but the canary was one tool out of eleven. The audit in `docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md` documents the full scope:

Every oddkit tool exhibits some form of the vodka anti-pattern: canon defines vocabulary (modes, challenge types, encoding types, DOLCHEO artifact types, stakes calibration, etc.), but tool code hardcodes interpretation. `telemetry_policy` was the first tool canary-refactored to fetch governance from the knowledge base at runtime with a bundled fallback and minimal last-resort. **The same refactor is still needed for the other 10 tools.**

The canary proved the pattern works. Now we scale it. The anti-pattern, the canary template, and the ship-blocker contract (live-smoke against deployed preview) are all documented in `canon/constraints/core-governance-baseline.md`.

---

## Priority 1 — Pick up immediately

### P1.1 — Internal oddkit rename (scope expanded per 2026-04-19 decision)
Original scope: rename internal `canonUrl` variables, `ZipBaselineFetcher` class, `BASELINE_URL` env. Expanded scope based on operator decision that **there are zero external users, so backward compatibility is not a constraint**:
- Strip the `a.canon_url` legacy fallback from `parseToolCall` in `workers/src/telemetry.ts`
- Rename `canonUrl` → `knowledgeBaseUrl` across `telemetry.ts` (9 refs), `orchestrate.ts` (111 refs), `zip-baseline-fetcher.ts` (24 refs)
- Rename `ZipBaselineFetcher` class → `KnowledgeBaseFetcher`
- Rename `BASELINE_URL` env var → `DEFAULT_KNOWLEDGE_BASE_URL` (update `wrangler.toml` and every `env.BASELINE_URL` reference)
- Rename blob6 schema references from `canon_url` → `knowledge_base_url` in `telemetry.ts` comment block and `docs/oddkit/tools/telemetry_public.md`
- No aliasing, no dual-accept, no migration note — just rename and move on
- Run typecheck, deploy to preview, run `workers/test/canon-tool-envelope.smoke.mjs` against preview, merge if 24/24 green, promote to prod

Expected size: ~150 refs across 4 files. Mechanical but real. **Do this with fresh eyes — decision to defer to fresh session was explicit E0008.3 practice.**

### P1.2 — DOLCHE → DOLCHEO vocabulary canon
Write tier-2 canon doc (candidate path: `canon/definitions/dolcheo-vocabulary.md`) establishing DOLCHEO as canonical, replacing DOLCHE.

Operator's lean (from session, needs final decision): DOLCHEO **replaces** DOLCHE — DOLCHE was always incomplete because Open items had no home. Both Os remain `O`; rely on section context to distinguish.

Doc should cover:
- Why the extension (retrospective-only tracking loses forward-pointing threads)
- Each letter defined: **D**ecision, **O**bservation (closed), **L**earning, **C**onstraint, **H**andoff, **E**ncode, **O**pen (forward-pointing)
- Guidance on when to use Open vs Handoff (Handoff = work transfer; Open = unresolved thread or question)
- Example ledger structure with Open Items sectioned by priority band (P1–P6)

Then update the oddkit_encode tool description to reference DOLCHEO and unblock that long-deferred tool description improvement. See O3 in the ledger.

### P1.3 — Verify oddkit#56 and #57 are stale
Two old open PRs on oddkit from months ago, both titled "Add oddkit_write tool definition (stub)". Duplicates of each other. Check if either is still relevant given the current direction. If superseded, close with a note linking to canon. If still planned work, leave open and update the ledger with the reference.

---

## Priority 2 — The prompt-over-code refactor of remaining oddkit tools

Per the audit doc (`docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md`), the canary pattern needs to be applied to each of these tools. **Each one follows the same canary template:** canon doc defines vocabulary → tool fetches canon at runtime → falls back to bundled tier → falls back to minimal hardcoded behavior → response envelope declares `governance_source` → Zod schema accepts `knowledge_base_url` optional override → ship-blocker live-smoke test added to the smoke suite.

Rough priority order (highest-impact anti-pattern first):

1. **`oddkit_encode`** — hardcoded four types (O/L/D/C/H), canon actually specifies DOLCHEO (seven letters). Biggest vocabulary mismatch in the system. Blocks tool description update until resolved. Pairs naturally with P1.2 (DOLCHEO canon doc) — do them together.
2. **`oddkit_challenge`** — execution mode has hardcoded claim type detection via regex. Canon defines challenge types in `canon/`. Tool should read types from canon at runtime.
3. **`oddkit_gate`** — `problem_defined` prerequisite uses hardcoded regex for transition detection. Cannot recognize writing-canon transitions without runtime canon read.
4. **`oddkit_preflight`** — Definition of Done lookups are partially hardcoded. Should read full DoD spec from canon.
5. **`oddkit_validate`** — Completion criteria matching is hardcoded. Canon has validation vocabulary (now including E0008.3 context-break requirement); tool should fetch.
6. **`oddkit_orient`** — Mode classification uses hardcoded mode list. Now that validation is a fourth mode (E0008.3), tool must read modes from canon to keep pace with canon changes without code redeploys.
7. **`oddkit_search`** — Ranking weights and tag boosts are hardcoded. Lower priority because search behavior is less load-bearing for epistemic correctness.
8. **`oddkit_catalog`** — `start_here` suggestions hardcoded. Should be canon-driven.
9. **`oddkit_cleanup_storage`** — Probably fine as-is; mostly mechanical storage work with no canon-vocabulary dependency. Verify and mark complete.
10. **`oddkit_version`** — Trivial tool, probably no vodka violation. Verify and mark complete.

**Each refactor PR should:**
- Include a canon doc update defining the vocabulary if not already canon-clean
- Pass `oddkit_preflight` and `oddkit_challenge` in canon-tier-1 or -2 mode
- Extend `workers/test/canon-tool-envelope.smoke.mjs` with assertions for the new tool's envelope and governance_source
- Live-smoke against preview deploy before merge — ship-blocker per `canon/constraints/core-governance-baseline.md`

Total scope: likely 8–10 separate PRs over several sessions. Do them in priority order; do them one at a time with full gauntlet each time.

---

## Priority 3 — Canon principles queued from session

### P3.1 — `canon/principles/teams-over-swarms.md` (tier 2)
Governing architectural preference. Cite three anchors:
- African proverb: "If you want to go fast, go alone. If you want to go far, go together." (tradeoff)
- 1 Corinthians 12: body of Christ, many members with differentiated roles (anatomy)
- Operator testimony: oddkit and klappy.dev built alone (fast), TruthKit needs a team (far) (witness)

Sections:
- Opening blockquote
- Summary (engineering argument)
- Derivation from the body metaphor (Paul's four moves: no self-disqualification, no role-elimination, no one-part-does-everything, shared fate)
- When swarms are fine (keep principle honest — batch processing, parallel independent work)
- Architectural implications pointing forward to E0009 and TruthKit harness design

See O4 in the ledger.

### P3.2 — Solo-to-team transition canon record
Durable decision doc recording the operator's explicit shift. Candidate location: `odd/decisions/solo-to-team-transition.md` or `docs/appendices/solo-to-team-transition.md`.

Covers:
- oddkit + klappy.dev as complete solo arc (public field notebook / resume / book source)
- TruthKit as team-driven commercial successor
- Open-core positioning (oddkit MIT cornerstone → TruthKit proprietary harness)
- Book *Nothing New, Even AI* as the polished handoff document from solo to team arc
- Course (O19) as the separate teaching product derived from the same journey

Should follow P3.1 so it can reference the teams-over-swarms principle.

### P3.3 — `canon/patterns/bugbot-as-validator.md` (tier 2, lower priority)
Codify the bugbot collaboration pattern as canonical team architecture. See O6 in the ledger. Could live inside teams-over-swarms instead; decide when P3.1 is drafted.

### P3.4 — `canon/principles/mechanical-work-belongs-in-code.md` (tier 2, lower priority)
Principle: if a transformation is mechanical (string splitting, formatting, classification with deterministic rules), the server owns it — not the LLM. Surfaced tonight via the encode blob-vs-artifact issue. First concrete application is `oddkit_encode` batch-mode. See O7 in the ledger.

---

## Priority 4 — Tool feature work

### P4.1 — `oddkit_encode` batch-mode feature (O2 in ledger)
Encode currently collapses multi-artifact input into a single typed blob. Fix: server-side paragraph splitting, optional typed prefixes (`[D]`/`[L]`/`[O]`/`[C]`/`[H]`/`[E]`), returns per-artifact array with individual quality scores.

This is P2.1 (encode canon refactor) and P4.1 combined — one PR, canon doc first, then tool change. Probably the single highest-leverage remaining work after the internal rename.

---

## Priority 5 — Writing thread (longer horizon, not-now-but-not-forgotten)

See O14, O15, O16, O19 in the ledger. Summary:
- Book *Nothing New, Even AI* — seven parts, polish/selection of public journal
- Essay: creator-cannot-be-own-critic — anchor tonight's bugbot story
- Essay: teams-over-swarms — general-audience version of P3.1 canon
- Course: chronological journey with forward-references — distinct product from the book (Q5 flags positioning decision)

---

## Priority 6 — Infrastructure threads (non-urgent)

See O17, O18 in the ledger.
- Social Projector at post.klappy.dev
- klappy.dev doc-listing cache staleness under GitHub rate limits

---

## Open questions carried forward

See Q1–Q5 in the ledger. The ones most likely to need a decision in the near term:

- **Q1** — DOLCHEO replaces DOLCHE or coexists? (Decide when writing P1.2 canon doc; lean: replace)
- **Q2** — Does the second O in DOLCHEO need a distinguishing letter? (Decide with Q1; lean: keep both as O)
- **Q5** — Course (O19) a companion to the book (O14) or a separate product? (Decide before significant investment in either product's structure; lean: separate)

---

## Operating notes for the fresh session

- **Read the bootstrap first.** Project instructions point at `klappy://canon/bootstrap/model-operating-contract`. Fetch it at session start. Mode discipline, context-break requirement, and DOLCHEO-style continuous tracking all live there.
- **Declare mode out loud.** "Exploring." "Moving to planning." "Executing." The operator should never guess.
- **Search canon before asking.** `oddkit_search` is essentially free. Most questions are already answered in canon.
- **During execution, produce artifacts.** Not questions. Not check-ins. Questions belong in planning.
- **Validate with fresh context.** You (the fresh session) ARE the fresh context for everything listed above. That is the structural advantage. Use it.
- **Run the gauntlet before declaring canon done.** `oddkit_preflight` → edits → `oddkit_challenge` in canon-tier-{1,2} mode → frontmatter audit → commit.
- **Live smoke before merging any MCP tool change.** Ship-blocker per canon. Template lives at `workers/test/canon-tool-envelope.smoke.mjs` in the oddkit repo.
- **Track DOLCHEO continuously.** Don't wait to be asked. Add Open items to the session ledger as they surface.

---

## Credentials and tooling reference

- GitHub PAT: see project instructions
- ANTHROPIC_API_KEY: see project instructions
- Working dirs used this session: `/home/claude/work/oddkit`, `/home/claude/work/klappy.dev-pr/klappy.dev`
- oddkit prod: `https://oddkit.klappy.dev/mcp`
- oddkit main preview: `https://main-oddkit.klappy.workers.dev`
- klappy.dev canon live on `main` branch

---

## Recommended first action for the fresh session

Orient. Search canon for `prompt-over-code refactor oddkit tools` and for `vodka anti-pattern audit`. Read the audit doc. Pick either **P1.1** (internal rename, ~60–90 min, purely mechanical) or **P1.2 + P4.1 bundled** (DOLCHEO canon + encode batch-mode, ~2–3 hours, higher impact but more design work).

Either is a clean win. If operator is present, ask which they want to prioritize. If operating async from operator explicit instruction, default to P1.1 — lower-risk mechanical work is safer for an async session than design work.

Then open a new session ledger for that session's work and pick up the DOLCHEO tracking discipline from there.
