---
uri: klappy://odd/handoffs/2026-04-20-p1-3-3-challenge-revisit
title: "Handoff — P1.3.3 Challenge Canon-Parity Refactor + Cache Principle Graduation (0.21.0)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "handoff", "session", "epoch-8.3", "p1-3-3", "oddkit-challenge", "set-intersection", "d5-split-by-fit", "d9-no-microsecond-caching", "canon-principle-graduation", "sweep"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-20 post-P1.3.2 — fresh session handoff"
derives_from: "odd/ledger/2026-04-20-p1-3-2-gate-canary-landed.md, odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed.md, canon/constraints/core-governance-baseline.md, canon/principles/vodka-architecture.md"
governs: "Fresh-session continuation after P1.3.2 shipped oddkit 0.20.0. Points the next session at P1.3.3 — challenge's canon-parity refactor: migrate evaluatePrerequisiteCheck from regex to stemmed set intersection (D5, same matcher gate shipped), remove cachedChallengeTypeIndex and rebuild inline per D9, and graduate 'cache fetches and parses, not microsecond derivations' to canon at canon/principles/cache-fetches-and-parses.md (third deciding-argument recurrence). Scope is smaller than P1.3.2 because the design work is reused and there are no envelope changes. Ship as 0.21.0."
status: active
supersedes: "odd/ledger/2026-04-20-p1-3-2-gate-canary-landed.md (as the outbound handoff pointer; the ledger itself stays active as the durable record)"
---

# Handoff — P1.3.3 Challenge Canon-Parity Refactor + Cache Principle Graduation (0.21.0)

> P1.3.2 shipped clean to prod. `oddkit` 0.20.0 is live at `oddkit.klappy.dev`. Challenge (0.19.0) and gate (0.20.0) both declare `governance_source` + `governance_uris` in their envelopes; encode (0.18.0) has the singular variant. Three tools on the sweep. Challenge has one remaining piece of vodka anti-pattern: `evaluatePrerequisiteCheck` at L2294 still uses regex test per check, and `cachedChallengeTypeIndex` at L163 caches a BM25 index the D9 principle says shouldn't be cached. P1.3.3 closes both. The `cachedChallengeTypeIndex` removal is the third deciding-argument recurrence of "cache fetches and parses, not microsecond derivations" — the principle graduates to canon in the same session, at `canon/principles/cache-fetches-and-parses.md`. Scope is small: ~50-line code delta, one canon principle doc, no envelope changes, no new governance files. Target: 45-75 min to prod. Ship as 0.21.0.

---

## Current state at handoff

**Prod:** `oddkit.klappy.dev` serving 0.20.0. Three tools in the sweep:

| Tool | Version shipped | Envelope fields |
|------|-----------------|-----------------|
| `oddkit_encode` | 0.18.0 | `governance_source`, `governance_uri` (singular — encode's docs sit under a single canonical umbrella) |
| `oddkit_challenge` | 0.19.0 | `governance_source`, `governance_uris` (plural array of 4 — peer governance files, alphabetical by path-tail) |
| `oddkit_gate` | 0.20.0 | `governance_source`, `governance_uris` (plural array of 2 — peer governance files: transitions + prerequisites) |

**Code baseline:** klappy/oddkit main at merge-commit `260492c` (feat PR #118) + `1308245` (promotion PR #119). **Before touching code, run `git pull` on main** — this handoff was written immediately after promotion; the tip should be stable but verify.

**Canon baseline:** klappy/klappy.dev main at `e8be010` (P1.3.2 closeout ledger + superseded handoffs, PR #123). No pending canon-first prerequisites for P1.3.3 — challenge's four governance files have been live since 0.19.0.

**Recent carry-forward reading:**
- `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed` — the P1.3.2 closeout; names the D5 split-by-fit decision, the D9 no-microsecond-caching decision, and the candidate canon principle status in detail.
- `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed` — the P1.3.1 closeout; names the 5-corroboration Sonnet 4.6 validator pattern and the `contract-governs-handoff-drift` principle.

---

## Scope — exactly three items

### Item 1 — Migrate `evaluatePrerequisiteCheck` from regex to stemmed set intersection (D5)

**Current state (L2294):** function takes `(input: string, check: string)` where `check` is a comma-separated vocabulary from canon (per-type quality criteria or per-base-prereq check column). Current implementation compiles `check` into a regex and runs `regex.test(input)`.

**Target state:** parse `check` at canon-fetch time into a stemmed `Set<string>` stored on the parent struct (ChallengeTypeDef for per-type, BasePrerequisite for universal), same shape as `GatePrerequisite.stemmedTokens` in gate. At runtime, tokenize `input` once into `inputStems: Set<string>`, then test each check via `Array.from(stemmedTokens).some(s => inputStems.has(s))`.

**Why:** same D5 rationale applied to challenge. Prereq evaluation is independent gap-or-not per prereq, not ranked. Regex-per-check misses stemmed variations (`problems identified` fails `\b(problem|goal)\b`); stemmed set intersection catches them. Porter-style stemmer already shipped in `workers/src/bm25.ts`.

**Call site (L2129):** `const passed = evaluatePrerequisiteCheck(input, p.check);` — this lives inside `runChallengeAction`. After refactor, the function signature becomes `evaluatePrerequisiteCheck(inputStems: Set<string>, stemmedTokens: Set<string>): boolean`, and `inputStems` is computed once per `runChallengeAction` call outside the per-prereq loop.

**Stemmer gemination caveat (from P1.3.2):** the Porter-style stemmer drops `-ing`/`-ed` but doesn't reverse consonant gemination. If challenge's check vocabularies contain geminating words (`shipping`, `stepped`, etc.), add their inflected forms directly to canon check columns — same pattern gate used for `odd/gate/transitions.md` in klappy/klappy.dev#122. Check for this before shipping; it's the same bug class and can be caught at preview smoke.

**Files changed:** `workers/src/orchestrate.ts`. No canon file changes required — the check vocabularies already live in `odd/challenge/base-prerequisites.md` and per-type challenge docs. Only the parser needs to compute `stemmedTokens` at parse time and the runtime needs to consume them.

**Estimated delta:** ~40 lines across the per-type parser, the base-prereq parser, `evaluatePrerequisiteCheck` itself, and the call site.

### Item 2 — Remove `cachedChallengeTypeIndex`, rebuild inline per request (D9)

**Current state:** module-level cache at L163–164 (`cachedChallengeTypeIndex`, `cachedChallengeTypeIndexKnowledgeBaseUrl`). Built lazily by `getOrBuildChallengeTypeIndex` at L634–651 on first request, reused thereafter. Reset in `cleanup_storage` at L1518–1519. Consumed at `runChallengeAction` L2028: `const typeIndex = getOrBuildChallengeTypeIndex(types, vocab, knowledgeBaseUrl);`.

**Target state:** delete the cache fields. Delete `getOrBuildChallengeTypeIndex`. Rebuild inline at the call site, same pattern as gate's transition-index build:

```typescript
const bm25Docs = types.map((t) => ({ id: t.slug, text: t.detectionText }));
const typeIndex = buildBM25Index(bm25Docs, vocab.stopWords);
```

**Why:** per D9. BM25 index construction over challenge's tiny per-type corpus (typically 6-9 types, each with a short detection text) is a microsecond derivation. Caching it adds plumbing (cache fields + invalidation on source/url change + cleanup_storage resets + drift risk when source data changes) without throughput benefit. The cached parse products (`cachedChallengeTypes`, `cachedNormativeVocabulary`, etc.) stay — those are actual parse work. The index is just a reshape of the parse product.

**Files changed:** `workers/src/orchestrate.ts`. Four locations: delete at L163–164, delete the function at L634–651, delete cleanup_storage resets at L1518–1519, inline the build at L2028.

**Estimated delta:** ~25 lines removed, ~3 lines added (the inline build).

### Item 3 — Graduate `cache-fetches-and-parses` to canon

**Current attestation points** (four, across the sweep):

1. **Encoding types parse caching (0.18.0):** `cachedEncodingTypes` — parse product, kept. ✓
2. **Base-prerequisites parse caching (0.19.0):** `cachedBasePrerequisites` — parse product, kept. ✓
3. **Gate's `stemmedTokens` precompute (0.20.0):** per-prereq Set stored inside `GatePrerequisite` at parse time. Parse product, cached. ✓
4. **Gate's BM25 index NOT cached (0.20.0, D9):** inline build per request. Microsecond derivation, not cached. ✗ (intentional non-caching)

**The third recurrence needed to graduate a candidate canon principle is a _deciding-argument_ recurrence — a decision where the principle is the load-bearing reason, not a summary of prior choices.** P1.3.1's D2/D3 decisions implicitly applied the pattern. P1.3.2's D9 was the first time the principle was named explicitly and used as the deciding argument. **P1.3.3's Item 2 (`cachedChallengeTypeIndex` removal) is the second explicit application of D9 across tools** — the third recurrence that satisfies the graduation test.

**Target canon doc:** `klappy://canon/principles/cache-fetches-and-parses.md`. Tier 2. Structure mirrors existing principle docs (e.g., `klappy://canon/principles/vodka-architecture`):

- Frontmatter: `tier: 2`, `date: 2026-04-20`, `derives_from` pointing at the two ledgers and the core-governance-baseline
- Blockquote with compressed argument: *"Cache the expensive work — fetching over the network, parsing markdown tables, building stemmed token sets. Don't cache microsecond derivations — rebuilding a BM25 index over a cached parse product is cheaper than the plumbing required to cache it safely."*
- **Summary — The Principle Has Two Halves** section naming the distinction
- **What counts as a parse product** section with the four attestation points
- **What counts as a microsecond derivation** section (BM25 indexes over small parse products; regex compilation from literal string lists; etc.)
- **Trade-off** section noting the size-threshold nuance: as corpus sizes grow, the rebuild cost moves. The principle is a rule-of-thumb anchored to the codebase's current corpus sizes (6–9 types, 4 transitions, 8 prereqs); revisit if any tool grows its governance corpus substantially.
- **Related principles:** `vodka-architecture` (governance over code), `contract-governs-handoff-drift` (source-of-truth hierarchy)

**Canon-first sequencing:** this canon doc ships BEFORE the code PR that removes `cachedChallengeTypeIndex`. Same pattern as P1.3.2's Phase 1 canon preceding Phase 2 code. One small canon PR on klappy/klappy.dev; wait for merge + retrievability via `oddkit_get`; then open the code PR on klappy/oddkit referencing the canon URI.

**Estimated effort for canon doc:** 15-20 min once the execution phase begins.

---

## Out of scope for P1.3.3

Named here so the scope stays bounded. Each is a legitimate follow-up for a future session:

- **encode's `triggerRegex` paragraph classification (L1113, L1155).** Different tool, different code path. encode's batch-mode paragraph classification compiles a per-type regex at parse time (`EncodingTypeDef.triggerRegex` at L473) and tests each paragraph against it. Migration to BM25 top-hit or stemmed set intersection is a natural next beat but belongs to a separate encode-scoped PR. Don't pull it into P1.3.3.
- **Global `cachedBM25Index` at L218.** This is the canon-level index used by canon search, not a challenge-specific cache. Separate concern; may or may not qualify as a microsecond derivation depending on canon corpus size (524 docs at last search — meaningfully bigger than challenge's 6-9 types). Size-threshold judgment; defer.
- **Sonnet 4.6 validator dispatch vs smoke-heavy self-review.** P1.3.1 used Sonnet 4.6 with 5 corroborations. P1.3.2 used smoke-heavy self-review (9 smoke runs + live self-call). The P1.3.2 ledger named the tradeoff honestly; neither is strictly superior. P1.3.3 can go either way — see "Attestation options" below.
- **Remaining O-opens from prior ledgers:** P2 (`getIndex` strict-mode), P3 (handoff text corrections), P4 (draft `contract-governs-handoff-drift` principle), P5 (workers/baseline build pipeline), P6 (CHANGELOG render route). All remain open; not part of P1.3.3.

---

## Key design decisions already settled

The next session does not need to re-derive these; they are inherited from P1.3.2's PRD v4 and the ledger's Patterns section:

- **D5 Split by fit.** BM25 for ranking problems (transition detection, challenge-type detection). Set intersection for independent gap-or-not problems (prereq evaluation). **Challenge inherits the split:** type detection keeps BM25 (ranking — pick the best matching type); prereq evaluation migrates to set intersection (independent gap-or-not per prereq).
- **D9 Don't cache microsecond derivations.** BM25 indexes over small parse products are rebuilt inline per request. Parse products (the stemmed token sets, the parsed governance structs) stay cached.
- **Uniform algorithm across tiers.** challenge's minimal-tier fallback already exists for types, base-prereqs, normative-vocab, and stakes. The refactor doesn't change which tier is active; it changes the algorithm used inside the tiers uniformly. Minimal-tier fallback still produces the same shape of `ChallengeTypeDef` / `BasePrerequisite` with the new `stemmedTokens` field populated.

---

## Code locations — exact line references

**Baseline: klappy/oddkit main `1acc452` (feat), merged as `260492c` (squash into main). Verify `git pull` on main before starting — line numbers assume this baseline.**

**Remove (D9 — `cachedChallengeTypeIndex`):**
- L163–164: module-level cache declarations
- L634–651: `getOrBuildChallengeTypeIndex` function definition
- L1518–1519: cleanup_storage reset entries
- L2028: call site in `runChallengeAction` — replace with inline `buildBM25Index` call

**Refactor (D5 — `evaluatePrerequisiteCheck`):**
- L2294: function definition — change to accept pre-stemmed inputs rather than compile regex
- L2129: call site — move `tokenize(input)` up and out of the per-prereq loop, pass `inputStems` in
- Per-type parser in `discoverChallengeTypes` (around L413–435): add `stemmedTokens: Set<string>` to `ChallengeTypeDef` per-quality-criterion, populated at parse time via `tokenize(criterion.check)`
- `fetchBasePrerequisites` parser (around L709+): add `stemmedTokens: Set<string>` to `BasePrerequisite`, populated at parse time via `tokenize(p.check)`

**Keep (parse product caches):**
- L160–162: `cachedChallengeTypes` (parse product) — keep
- L165–167: `cachedBasePrerequisites` (parse product) — keep
- L168–170: `cachedNormativeVocabulary` — keep
- L171–173: `cachedStakesCalibration` — keep

---

## Smoke test expansion

Existing challenge smoke block in `workers/test/canon-tool-envelope.smoke.mjs` at roughly L220–322. Current coverage: envelope shape, governance_source enum, governance_uris length-4 array, knowledge_base_url override, 9-mode parse integrity.

**New assertions to add (~10):**

- Stemmed prereq match for a per-type challenge — e.g., `"we've identified the problem"` stems `identified` → `identif` and `problem` → `problem`; canon vocabulary for a challenge-type prereq includes `problem` → match.
- Stemmed match for a base prereq — same pattern against universal checks.
- Non-match case — input with no stemmed overlap against canon vocab → prereq surfaces in missing list.
- Gemination check — if any challenge check vocabulary contains `ship`/`step`/similar, test inflected forms and expect them to work (after canon amendment if needed).
- Index-rebuild-per-request check — call challenge twice with the same input, assert both produce identical results (proxy for: the rebuild produces stable output).

No envelope shape assertions need to change. `governance_source` and `governance_uris` contracts are unchanged.

---

## CHANGELOG sketch for 0.21.0

```markdown
## [0.21.0] - 2026-04-21  (or whenever it ships)

### Changed

- **`oddkit_challenge` prerequisite evaluation migrated from regex to stemmed set intersection.** Per PRD D5 from P1.3.2 (split-by-fit): prereq evaluation is independent gap-or-not per prereq, not ranked; set intersection over stemmed tokens is the fit-to-problem matcher and avoids BM25's IDF-negative pathology on small shared-vocabulary corpora. Strictly additive: every input that matched the prior regex still matches; stemmed variations now match too. [Mention specific affected patterns based on what the refactor surfaces.]

- **`oddkit_challenge` type index cache removed.** Per PRD D9 from P1.3.2 (don't cache microsecond derivations): the BM25 type index over challenge's 6-9-type corpus is rebuilt inline per request. Parse-product caches (cachedChallengeTypes, cachedBasePrerequisites, cachedNormativeVocabulary, cachedStakesCalibration) remain — those are actual parse work.

### Added

- **New canon principle:** `klappy://canon/principles/cache-fetches-and-parses`. Graduates the "cache fetches and parses, not microsecond derivations" pattern to canon after its third deciding-argument recurrence (0.18.0 encode parse caching, 0.20.0 gate D9, 0.21.0 challenge `cachedChallengeTypeIndex` removal).

### Known limitations

- Same as 0.20.0 (stemmer gemination gap, getIndex strict-mode).
```

---

## Attestation options — operator's call

Per P1.3.2's ledger on the tradeoff:

**Option A — Smoke-heavy self-review (P1.3.2 pattern):** preview-smoke 3× clean, CI smoke on PR, main-preview smoke 3× post-merge, prod smoke 3× post-promotion + warmup, live self-call from session's MCP connection. Catches mechanical bugs. Misses PRD-vs-PR intent drift. Total: ~9-10 smoke runs + one live call.

**Option B — Sonnet 4.6 validator dispatch (P1.3.1 pattern):** 5-corroboration protocol adapted for this PR. Main-branch bytes grep + live preview curl of the key envelope shapes + canon citation + canon files retrievable + independent smoke runs. Catches intent drift. Costs more time and a separate agent session.

**Recommendation given smaller scope:** Option A is fine for P1.3.3. No envelope changes, no new governance files, no multi-phase sequencing. The one real risk is stemmer gemination surfacing again at preview-smoke (same as P1.3.2), which is exactly the class of bug Option A catches concretely. If any smoke failure surfaces something that requires judgment-call resolution (rather than obvious canon-vocab-or-code-fix), escalate to Option B.

**Not recommended:** skipping both. Both tools in prior sweep steps had attestation.

---

## Path 3 workflow

1. **Canon PR first.** Write `canon/principles/cache-fetches-and-parses.md` on klappy/klappy.dev. Small PR. Self-review squash-merge. Verify retrievable via `oddkit_get`.
2. **Code branch.** Cut `challenge/d5-d9-parity` off klappy/oddkit main.
3. **Apply code edits** in the order above (Item 2 is simpler — remove cache first, verify tests still pass; then Item 1 — refactor `evaluatePrerequisiteCheck`).
4. **Typecheck + existing parser tests.** `npm run typecheck` in `workers/`, `node workers/test/governance-parser.test.mjs`.
5. **CHANGELOG + version bump** to 0.21.0 (pre-commit hook enforces sync between root + workers package.json).
6. **Add smoke assertions.**
7. **Commit + push.** Wait ~25s for CF preview. Smoke preview 3× clean (watch for gemination surprises).
8. **If gemination surfaces:** small canon PR to klappy/klappy.dev adding inflected forms to affected challenge check columns (same fix pattern as klappy/klappy.dev#122). Wait for merge. Amend commit + force-push. Re-smoke.
9. **Open feat PR** via `urllib.request` + `json.dumps`. Wait for CI (Test CF Preview typically takes 60-90s).
10. **Self-review or dispatch validator per Option above.**
11. **Squash-merge.** Main-preview smoke 3× clean.
12. **Open main → prod promotion PR.** Merge. Wait ~40s warmup. Prod smoke 3× clean.
13. **Write closeout ledger** at `odd/ledger/2026-04-21-p1-3-3-challenge-canon-parity-landed.md` (or date-appropriate). Flip this handoff to `status: superseded` with `superseded_by` pointing at the new ledger. Document whether the third recurrence landed cleanly and whether the principle doc required any post-facto adjustment based on execution learnings.

---

## Thin prompt for next session

```
Resume P1.3.3 per klappy://odd/handoffs/2026-04-20-p1-3-3-challenge-revisit.

Current state: oddkit 0.20.0 in prod. Three tools in the sweep carry
governance_source + governance_uris: encode (0.18.0 singular), challenge
(0.19.0 plural array of 4), gate (0.20.0 plural array of 2).

Phase 2 scope is bounded at three items: (1) migrate challenge's
evaluatePrerequisiteCheck from regex to stemmed set intersection (D5 —
same matcher gate shipped), (2) remove cachedChallengeTypeIndex and
rebuild inline per D9 (microsecond derivation, not worth caching), (3)
graduate 'cache fetches and parses, not microsecond derivations' to
canon at canon/principles/cache-fetches-and-parses.md (third deciding-
argument recurrence). No envelope changes. No new governance files. Ship
as 0.21.0.

Start by:
1. git pull on both klappy/oddkit main and klappy/klappy.dev main
2. Read this handoff end-to-end
3. Read klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed for the
   D5 and D9 rationale in full
4. Read the existing canon principle doc at klappy://canon/principles/
   vodka-architecture for the structure to mirror when writing
   canon/principles/cache-fetches-and-parses.md
5. Write a short PRD as a working-directory file before touching code
   (~100-150 lines; most design is reused from P1.3.2)
6. Canon PR first (canon-first absolute)
7. Code PR second

Credentials in project instructions. Orchestrator-applies for writes;
Sonnet 4.6 read-only for validation if Option B chosen.
```

---

## Standing rules (carried forward, unchanged)

- `oddkit_time` first every turn. Pass prior `server_time` as `reference`.
- Declare epistemic mode out loud.
- Search canon before asking.
- Ground framing in code + canon, not the latest handoff (per `contract-governs-handoff-drift`).
- PRD before code.
- During execution, produce artifacts, not questions.
- Canon-first absolute.
- No force-push without `git fetch` first.
- GitHub API: `urllib.request` + `json.dumps`, never bash heredoc.
- No Opus 4.7 execution agents to klappy/oddkit. Sonnet 4.6 read-only for validation; orchestrator-applies for writes.
- No `wrangler deploy` manually.
- Branch preview slug rule: slashes AND dots → hyphens.
- Prod deploy warmup: accept 3 consecutive clean runs as the prod-ready gate after ~40s warmup wait.
- **Same-session handoff anti-pattern:** do not write a forward handoff for work that can be executed in the same session. This handoff is the legitimate cross-session case — the receiving session is a different agent in a different context window.

---

## Carry-forward O-opens (unchanged from P1.3.2 ledger)

- **P2** `getIndex` strict-mode across encode/challenge/gate
- **P3** handoff text corrections (P1.2 "bundled baseline"→"minimal fallback"; P1.3 `discover*`→`fetch*`)
- **P4** draft `canon/principles/contract-governs-handoff-drift.md`
- **P5** `workers/baseline/` build pipeline
- **P6** CHANGELOG render route on klappy.dev + `version_notes_url` on MCP `initialize`
- **P8** (new) — encode's `triggerRegex` paragraph classification migration (out of P1.3.3 scope per above)
- **P9** (new) — global `cachedBM25Index` review (may have a size-threshold answer; out of P1.3.3 scope)

---

## Provenance

- **Prior ledger:** `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed`
- **Recent PRs:** klappy/oddkit#118 (feat `260492c`), #119 (promotion `1308245`), klappy/klappy.dev#120 #121 #122 #123
- **Session that wrote this handoff:** 2026-04-20T01:21:45Z–2026-04-20T03:40Z (2h 18m — wrote this handoff at the end as session-close deliverable, after P1.3.2 shipped end-to-end). The handoff is genuinely forward-looking; the receiving session is a different conversation.
