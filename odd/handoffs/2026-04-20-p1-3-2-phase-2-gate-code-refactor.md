---
uri: klappy://odd/handoffs/2026-04-20-p1-3-2-phase-2-gate-code-refactor
title: "Handoff — P1.3.2 Phase 2: oddkit_gate Code Refactor (0.20.0)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "handoff", "session", "epoch-8.3", "p1-3-2", "phase-2", "oddkit-gate", "bm25", "set-intersection", "governance-source", "sweep"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-20 phase-1 closed"
derives_from: "odd/handoffs/2026-04-21-p1-3-2-gate-canary.md, odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed.md, canon/constraints/core-governance-baseline.md, canon/principles/vodka-architecture.md"
governs: "Phase 2 continuation after Phase 1 canon docs landed. Points the next session at the klappy/oddkit 0.20.0 refactor consuming odd/gate/transitions.md and odd/gate/prerequisites.md. Split by fit (BM25 for transitions, set intersection for prereqs) per D5 in the Phase 1 session's PRD. Canon-first prerequisite satisfied — both files retrievable from canon at commit 86a7194 on klappy.dev main."
status: superseded
superseded_by: "odd/ledger/2026-04-20-p1-3-2-gate-canary-landed.md"
supersedes: "odd/handoffs/2026-04-21-p1-3-2-gate-canary.md"
---

# Handoff — P1.3.2 Phase 2: oddkit_gate Code Refactor (0.20.0)

> Phase 1 of P1.3.2 landed on klappy.dev. Two canon files merged at commit `86a7194` — `odd/gate/transitions.md` (four transition keys, detection terms, prereq id references) and `odd/gate/prerequisites.md` (eight prereq definitions with check vocabularies). Both files retrievable via `oddkit_get` against live canon. Phase 2 is the klappy/oddkit code refactor: `runGateAction` consumes the canon files via two new helpers, replaces the hardcoded `detectTransition` regex with BM25 stemmed matching for transitions and stemmed set intersection for prereqs, declares `governance_source` + `governance_uris` (plural array of 2) in envelope, ships as 0.20.0. Full PRD was drafted in the Phase 1 session's working directory; its decisions and scope are summarized below so the next session doesn't need to re-derive them from scratch.

---

## What shipped in Phase 1

| PR | Repo | Merged SHA | Purpose |
|----|------|-----------|---------|
| #120 | klappy/klappy.dev | `86a7194` | **odd/gate: canon governance docs for P1.3.2 gate vodka refactor (Phase 1).** Squash-merged on self-review (canon docs, low-risk, no Sonnet 4.6 validator required). |

**Canon state:** `klappy://odd/gate/transitions` and `klappy://odd/gate/prerequisites` both return valid content via `oddkit_get`. Zip size increased from 18560KB to 18566KB confirming the new files are live in canon's zip build. Phase 2's `fetchGateTransitions` and `fetchGatePrerequisites` helpers will consume these at runtime.

**Phase 1 gauntlet record:** `oddkit_preflight` on the canon deliverable returned start-here refs and constraint refs, no blockers. Writing Canon 7-point self-check passed (blockquote + descriptive summary subtitle + story-telling headers + progressive disclosure + native YAML frontmatter types + klappy:// URI format). AI voice cliché scan returned zero matches.

---

## Phase 2 scope — the klappy/oddkit 0.20.0 refactor

### What Phase 2 ships

**Branch:** `gate/governance-source-envelope` off `klappy/oddkit` main. Preview slug: `gate-governance-source-envelope`.
**Version bump:** 0.20.0 (MINOR, matches sweep precedent: 0.18.0 encode, 0.19.0 challenge, 0.20.0 gate).

**Files changed (expected):**

- `workers/src/orchestrate.ts` — two new helpers (`fetchGateTransitions`, `fetchGatePrerequisites`), refactored `runGateAction`, extended `cleanup_storage` reset block. Estimated delta: +250 / -90 lines.
- `workers/src/index.ts` — `oddkit_gate` tool description updated per D8 to name the two governance surfaces, the envelope signal, and the stemmed-matching behavior.
- `workers/test/canon-tool-envelope.smoke.mjs` — ~30 new assertions covering envelope shape, governance_source enum, governance_uris array, knowledge_base_url override, literal + stemmed-variation transition cases, stemmed prereq check, and uniform stemming across tiers.
- `CHANGELOG.md` — `[0.20.0]` entry per D7 with Added / Changed / Known-limitations sections.
- `package.json` + `workers/package.json` — synced to `0.20.0` (pre-commit hook enforces).

### The split-by-fit matching design (D5 — load-bearing)

**Transitions use BM25 stemmed matching.** Picking the best transition is a ranking problem (one transition wins). BM25 naturally prefers specific-phrase matches over single-word matches (`ready to build` outscores bare `ready`), so the regex cascade's "specific phrase must come first" fragility disappears. Row order stays as deterministic tiebreaker for genuine ties. Index is built inline per request from the cached governance array — **not** cached separately (per D9; the build cost is microseconds and caching adds plumbing without throughput benefit).

**Prereqs use stemmed set intersection.** Each prereq evaluates independently — pass if any stemmed input token matches any stemmed check term; fail otherwise. No ranking, no scoring, no BM25. The reason is correctness, not just simplicity: BM25's IDF term is `log((N - df + 0.5) / (df + 0.5))`, which flips negative when `df > (N-1)/2`. For 8 prereqs sharing vocabulary across rows (words like `goal`, `done`, `constraint` plausibly recur), high-df terms produce negative IDF contributions and can drag valid matches to score 0. Set intersection returns the semantically correct "any stem in common = prereq applies" with no scoring pass and no IDF pathology.

**Caching asymmetry is principled.** Transitions rebuild their BM25 index per request (stack-local, GC'd after return). Prereqs cache a precomputed `stemmedTokens: Set<string>` on each `GatePrerequisite` at parse time (populated in `fetchGatePrerequisites`, reused across requests). The principle: **cache fetches and parses, not microsecond derivations.** The tokenize-and-stem operation that produces `stemmedTokens` is a parse product; the BM25 index is a microsecond derivation.

### Helper contracts

**`fetchGateTransitions(fetcher, knowledgeBaseUrl)` → `{ transitions, source }`**
- `TransitionDef = { key: string; from: string; to: string; prereqIds: string[]; detectionText: string; rowOrder: number }`
- `detectionText` = comma-separated Detection Terms column concatenated (fed to `buildBM25Index` at `runGateAction` call time)
- `rowOrder` = canon table row index, used as deterministic tiebreaker
- Cache: `cachedGateTransitions` + `cachedGateTransitionsKnowledgeBaseUrl` + `cachedGateTransitionsSource` (no separate index cache per D9)
- Parses `## Transitions` section; empty result → `source: "minimal"`

**`fetchGatePrerequisites(fetcher, knowledgeBaseUrl)` → `{ prerequisites, source }`**
- `GatePrerequisite = { id: string; check: string; gapMessage: string; stemmedTokens: Set<string> }`
- `stemmedTokens` precomputed at parse time via `tokenize` from `bm25.ts`
- Cache: `cachedGatePrerequisites` + `cachedGatePrerequisitesKnowledgeBaseUrl` + `cachedGatePrerequisitesSource`
- Parses `## Prerequisite Overlays` section; empty result → `source: "minimal"`

### `runGateAction` refactored logic

1. `Promise.all` both helpers. Aggregate source with strict union (any helper `"minimal"` → aggregate `"minimal"`) per D1, same as challenge.
2. Build BM25 index over `transitions` inline from `detectionText` fields.
3. `searchBM25(index, input, transitions.length)` → top hit with score > 0 wins. Ties resolved by `rowOrder` ascending. Zero matches → `{from: "unknown", to: "unknown"}`.
4. `const inputStems = new Set(tokenize(input));` once.
5. For each prereq id in the matched transition's `prereqIds`, look up the `GatePrerequisite` and check `Array.from(prereq.stemmedTokens).some(s => inputStems.has(s))`. Pass/fail per prereq.
6. When aggregated `source === "minimal"`: use `MINIMAL_TRANSITIONS` and `MINIMAL_PREREQUISITES` module-level constants. Vocabulary mirrors today's hardcoded regex alternations flattened to comma-separated phrases (transitions) and words (prereqs); `MINIMAL_PREREQUISITES` entries include their `stemmedTokens` as `new Set([...])` initialized at module load. Algorithm uniform across tiers; only vocabulary source differs.
7. Envelope additions: `governance_source: "knowledge_base" | "minimal"`, `governance_uris: ["klappy://odd/gate/prerequisites", "klappy://odd/gate/transitions"]` (alphabetical by path-tail, array length exactly 2), `debug.knowledge_base_url` echoed on override.

### Envelope before/after

**Before (0.19.0):**
```json
{
  "action": "gate",
  "result": { "status": "...", "transition": {...}, "prerequisites": {...} },
  "state": {...},
  "server_time": "...",
  "assistant_text": "...",
  "debug": { "duration_ms": N, "generated_at": "..." }
}
```

**After (0.20.0):**
```json
{
  "action": "gate",
  "result": {
    "status": "...",
    "transition": {...},
    "prerequisites": {...},
    "governance_source": "knowledge_base",
    "governance_uris": [
      "klappy://odd/gate/prerequisites",
      "klappy://odd/gate/transitions"
    ]
  },
  "state": {...},
  "server_time": "...",
  "assistant_text": "...",
  "debug": { "duration_ms": N, "generated_at": "...", "knowledge_base_url": "..." }
}
```

Additive only. No existing field removed or reshaped.

### Decisions — the 9 D-lines from Phase 1 PRD (compact)

- **D1 Aggregation rule:** strict union (any `"minimal"` → aggregate `"minimal"`). Inherits from P1.3.1.
- **D2 Two-file canon split:** `odd/gate/transitions.md` + `odd/gate/prerequisites.md`. Reinforced by the foreign-key argument (`transitions → prereq_ids → prerequisites` unambiguous one-hop), prereq-tuple uniformity (all 8 prereqs identical `{id, description, required, check}` shape), and DRY (one canonical home per concept).
- **D3 Per-helper domain-noun tuples:** `{transitions, source}` and `{prerequisites, source}`. Inherits from P1.3.1 D3 style nit.
- **D4 `governance_uris` plural array of 2:** alphabetical by path-tail. Shape divergence from encode's singular `governance_uri` defended by the same D4 principle P1.3.1 established. Symmetry with challenge's plural array is structurally cleaner than challenge's because both gate URIs point to peer single files (challenge's array mixed a directory anchor with three files).
- **D5 Split matchers by fit:** BM25 for transitions (ranking problem), stemmed set intersection for prereqs (independent gap-or-not, avoids BM25 IDF-negative pathology on 8-prereq shared-vocabulary corpora). Fit-to-problem > symmetry-of-algorithm, same move D4 made at the envelope level.
- **D6 Uniform algorithm across tiers, vocabulary differs:** `MINIMAL_TRANSITIONS` and `MINIMAL_PREREQUISITES` hardcoded constants with vocabulary equal to today's regex alternations. Both tiers run the same matcher (BM25 for transitions, set intersection for prereqs). Behavior strictly additive vs pre-0.20.0 — every input that matched word-boundary regex still matches, plus stemmed variations now match.
- **D7 CHANGELOG `[0.20.0]`:** Added / Changed sections explicitly name the stemming upgrade and the split-by-fit matcher choice with concrete examples (shipping, started building, stepped back, etc.). Known-limitations inherits encode/challenge's `getIndex` strict-mode limitation and notes challenge's `evaluatePrerequisiteCheck` is still regex-based (O-open P7).
- **D8 Tool description:** updates to name the two governance surfaces, envelope signals, and stemmed-matching behavior with concrete examples.
- **D9 Index caching policy:** on-the-fly, not cached. Operator-directed — "storing indexes for dynamic parsing is worthless and bad ROI." Gate's BM25 index is a microsecond derivation; caching it adds cache fields + invalidation plumbing + memory without throughput benefit on tiny corpora. Challenge's existing `cachedChallengeTypeIndex` pattern (L130) should get the same review in O-open P7.

### Smoke test expansion

New block `─── oddkit_gate: envelope + governance_source + governance_uris + BM25 detection ───` in `workers/test/canon-tool-envelope.smoke.mjs`. ~30 new `ok()` assertions covering:

- Envelope shape via `expectFullEnvelope`
- `governance_source === "knowledge_base"` via `expectGovernanceSource` on default tier
- `governance_uris` is array of 2, alphabetical `["klappy://odd/gate/prerequisites", "klappy://odd/gate/transitions"]`
- `governance_uri` singular is `undefined` (D4 divergence from encode asserted explicitly)
- `knowledge_base_url` override echoes in `debug.knowledge_base_url`, governance_source becomes `"minimal"` against hollow canon (`torvalds/linux`)
- Literal + stemmed-variation pairs per transition:
  - `"ready to build"` / `"started building the feature"` → `"execution"`
  - `"start planning"` / `"we're planning the approach"` → `"planning"`
  - `"ship it"` / `"shipping this now"` → `"completion"`
  - `"step back"` / `"stepped back to reconsider"` → `"exploration"`
- Default guard: `"hello there"` → `"unknown"`
- Stemmed prereq check: `"ready to build — decisions locked, done when tests pass, no irreversible changes, all constraints addressed"` → `status: "PASS"`
- Uniform-stemming-across-tiers: override to `torvalds/linux` + `"shipping this now"` → `transition.to === "completion"` AND `governance_source === "minimal"`
- Priority resolution via BM25 scoring: `"ready to build my feature"` → `"execution"` (2-term match on `ready` + `build` beats 1-term match on `ready` alone for `exploration-to-planning`)

Target test count post-refactor: ~156 (up from 126 at P1.3.1).

### Validator dispatch — five corroborations

Template from P1.3.1 ledger §"What the Validator Actually Checked", adapted for gate:

1. **Main-branch bytes grep** — validator clones `klappy/oddkit`, checks out main, greps `workers/src/orchestrate.ts` in the `runGateAction` function body (L2097–L2241 pre-refactor) for `governance_source`. Confirms zero hits — pre-refactor state matches PR's "before" claim. The only `governance_source` matches in main pre-merge are inside `runEncodeAction` and `runChallengeAction`.
2. **Live preview curl, four shapes:**
   - Default + planning-to-execution input → `governance_source: "knowledge_base"`, `governance_uris` length 2, `governance_uri` undefined.
   - Default + stemmed variation (`"shipping this now"`) → `transition.to: "completion"`. Confirms BM25 stemming on default tier.
   - Override `torvalds/linux` + `"shipping this now"` → `governance_source: "minimal"`, `transition.to: "completion"`. Confirms uniform stemming across tiers (load-bearing for D6).
   - Default + unknown input → `transition.to: "unknown"`, `status: "PASS"`.
3. **Canon citation on `core-governance-baseline`** — `oddkit_get` §Runtime Invariants and §What-Ships-in-Baseline. Confirm `odd/gate/` is in Canon-Only class (not required-in-baseline). Two-tier cascade coherent with contract.
4. **Canon files retrievable** — `oddkit_get` on `klappy://odd/gate/transitions` and `klappy://odd/gate/prerequisites`. Both must return non-error responses with parseable `## Transitions` and `## Prerequisite Overlays` sections. **This session confirmed both files retrievable at session close** — Phase 2's validator re-confirms at dispatch time.
5. **Independent smoke runs** — validator clones branch, runs smoke 3 consecutive times against preview URL. ~156 assertions per run clean.

Expected disposition: `VERIFIED / 5/5 / [] blockers / [] advisories`.

### Path 3 workflow

1. Clone `klappy/oddkit`, cut `gate/governance-source-envelope` off main.
2. Apply orchestrate.ts edits (two helpers + runGateAction refactor + cleanup_storage extension + MINIMAL_* constants).
3. Apply index.ts tool-description update.
4. Apply smoke-test extension.
5. Apply CHANGELOG + package.json version bumps (0.20.0).
6. `npm run typecheck` in `workers/`. `node workers/test/governance-parser.test.mjs` — confirm parser tests still pass (may grow if new gate-specific parser tests added).
7. Commit. Push. Wait ~25s for CF auto-deploy of preview. Smoke preview 3× clean.
8. Open PR via `urllib.request` + `json.dumps` against `klappy/oddkit`.
9. Dispatch Sonnet 4.6 read-only validator with the five corroborations above.
10. Accept VERIFIED. Squash-merge. Main-preview smoke 3× clean. Open main → prod PR. Merge. Prod smoke 3× clean (accept warmup pattern — 40s wait then 3 consecutive clean).

---

## Session state at Phase 1 close

- Session start: 2026-04-20T01:21:45Z
- Phase 1 merged: 2026-04-20T02:32Z (approx 70 min in)
- Forward-handoff written: ~75 min in
- PRD v4 (615 lines, 9 decisions, 12 risks) was an ephemeral working artifact in the orchestrator's working directory. Its decisions are summarized above; next session re-derives specifics from code + canon + this handoff.

## Standing rules (carried from prior handoffs, unchanged)

- **Call `oddkit_time` first every turn.** Pass the prior `server_time` as `reference`.
- **Declare epistemic mode out loud.** Planning until PRD is written and contract decisions are named; execution after the gate; validation via Sonnet 4.6 (context-break required, same-session self-review is not validation).
- **Search canon before asking.**
- **Ground framing in code + canon, not the latest handoff.** Per `contract-governs-handoff-drift` (three prior recurrences, standing principle). If a handoff's word choice disagrees with a contract's enum or a live code reality, the contract/code wins.
- **PRD before code.** Write the plan as a file before touching source.
- **During execution, produce artifacts, not questions.**
- **Canon-first is absolute.** Phase 1 is done; Phase 2 can reference the files at `86a7194` or any later commit on klappy.dev main that includes them.
- **No force-push without `git fetch` first.**
- **GitHub API: `urllib.request` + `json.dumps`, never bash heredoc.**
- **Do NOT dispatch Opus 4.7 execution agents to klappy/oddkit.** Safety-layer false-positive blocks them. Sonnet 4.6 read-only validation is fine; orchestrator-applies for writes.
- **Do NOT run `wrangler deploy` manually.** Githooks + CF auto-deploy handle the pipeline.
- **Branch preview slug rule:** slashes AND dots → hyphens. `gate/governance-source-envelope` → `gate-governance-source-envelope`.
- **Prod deploy warmup:** accept 3 consecutive clean runs as the prod-ready gate after ~40s warmup wait.

---

## Carry-forward O-opens

- **[O-open P1]** **P1.3.2 Phase 2 — gate code refactor + envelope.** This handoff.
- **[O-open P2]** `getIndex` strict-mode (`skipBaselineFallback`) — now affects telemetry_policy + encode + challenge. Same limitation, one fix. Pull into a later P1.3.x PR if a tool exercises the code path; otherwise standalone PR.
- **[O-open P3]** Handoff text corrections on klappy.dev — two deferred: (a) P1.2 "bundled baseline" → "minimal fallback"; (b) P1.3 three `discover*` → `fetch*`. Low priority. Bundle into a tiny canon PR.
- **[O-open P4]** `canon/principles/contract-governs-handoff-drift.md` draft. Principle has standing (three recurrences documented). Bundle with O-open P3.
- **[O-open P5]** `workers/baseline/` bundled-tier build pipeline — separate epoch.
- **[O-open P6]** CHANGELOG render route on klappy.dev + `version_notes_url` on MCP `initialize`. Low priority.
- **[O-open P7]** **Challenge's next revisit — bundled scope:** (a) `evaluatePrerequisiteCheck` (L2068–L2095) migration from regex to stemmed set intersection (same matcher as gate's prereqs per D5 — ranking not applicable for challenge's prereq surface either), (b) review of `cachedChallengeTypeIndex` (L130) + `getOrBuildChallengeTypeIndex` (L585+) under the D9 lens. Both items together keep challenge's revisit atomic.

## Candidate canon principle (not yet written)

"Cache fetches and parses, not microsecond derivations." Operator named in turn 5 of the Phase 1 session. Precedents: encoding-types parse products cached, base-prerequisites parse products cached, challenge types parse products cached, gate's `stemmedTokens` precompute; challenge's BM25 index is the negative-example outlier that should be reviewed under this principle. Not worth writing down as canon yet per operator's guidance; pending a third recurrence in the sweep where the principle is the deciding argument rather than a summary of prior choices. When written, draft location: `canon/principles/cache-fetches-and-parses.md`.

---

## Reference material — read this at session start

Priority order for the Phase 2 session:

1. This doc.
2. `klappy://canon/bootstrap/model-operating-contract` — the evolving operating contract.
3. `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed` — P1.3.1 closeout with validator corroboration pattern.
4. `klappy://canon/constraints/core-governance-baseline` — §Runtime Invariants and §What-Ships-in-Baseline.
5. `klappy://canon/principles/vodka-architecture`.
6. `klappy://canon/principles/agent-self-report-under-stress` — for validator dispatch.
7. `klappy://odd/gate/transitions` — freshly merged Phase 1 canon.
8. `klappy://odd/gate/prerequisites` — freshly merged Phase 1 canon.
9. `klappy://odd/challenge/base-prerequisites` — structural parallel for `fetchGatePrerequisites`.

Reference PRs for canary pattern:

- `klappy/oddkit#108` / `#109` — telemetry_policy canary.
- `klappy/oddkit#114` — encode canary completion (P1.2).
- `klappy/oddkit#116` — challenge canary completion (P1.3.1, most recent precedent).
- `klappy/klappy.dev#120` — **P1.3.2 Phase 1 canon (this session's output)**.

---

## Thin prompt for the next session

```
Resume P1.3.2 Phase 2 per klappy://odd/handoffs/2026-04-20-p1-3-2-phase-2-gate-code-refactor.

Current state: 0.19.0 in prod (oddkit.klappy.dev). Phase 1 canon merged at
klappy/klappy.dev commit 86a7194 (PR #120); klappy://odd/gate/transitions
and klappy://odd/gate/prerequisites retrievable via oddkit_get.

Phase 2 scope: klappy/oddkit runGateAction refactor consuming the merged
canon via fetchGateTransitions ({transitions, source}) and
fetchGatePrerequisites ({prerequisites, source}) helpers. BM25 stemmed
matching for transitions (ranking problem), stemmed set intersection for
prereqs (independent gap-or-not; avoids BM25 IDF-negative pathology on
shared-vocabulary 8-prereq corpus). GatePrerequisite struct carries
precomputed stemmedTokens: Set<string>. BM25 index built inline per
request (D9 — don't cache microsecond derivations). Declare
governance_source + governance_uris (plural length 2, alphabetical) in
envelope. Preserve today's regex vocabulary as MINIMAL_* hardcoded
fallback; algorithm uniform across tiers. Ship as 0.20.0. Orchestrator
applies; Sonnet 4.6 read-only validates with the 5-corroboration pattern.

Read the handoff. Run the gauntlet on the refactor plan. Write a fresh
PRD as a file before touching source (the Phase 1 PRD was ephemeral;
re-derive from handoff + code + canon). Then execute.

Credentials in project instructions. Path 3 workflow (orchestrator
applies writes, no Opus 4.7 execution agents to klappy/oddkit).
```

---

## Provenance

- **Prior handoff:** `odd/handoffs/2026-04-21-p1-3-2-gate-canary.md` — original two-phase handoff; this doc supersedes it at the Phase 1/Phase 2 boundary.
- **Phase 1 PR:** `klappy/klappy.dev#120` (merged `86a7194`).
- **Phase 1 canon files:** `klappy://odd/gate/transitions`, `klappy://odd/gate/prerequisites` — both retrievable via `oddkit_get` at session close.
- **Target oddkit code at main HEAD `71ee6ed`:** `workers/src/orchestrate.ts` `runGateAction` L2097–L2241, `detectTransition` L306–L324. Zero canon integration pre-refactor; this is what Phase 2 rewrites.
