---
uri: klappy://odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity
title: "Handoff — P1.3.4 Encode Canon-Parity Refactor (D5 Stemmed Matcher + D9 Cache Removal for triggerRegex) (0.22.0)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "handoff", "session", "epoch-8.3", "p1-3-4", "oddkit-encode", "trigger-regex", "set-intersection", "d5-split-by-fit", "d9-no-microsecond-caching", "sweep-completion", "vodka-architecture"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-20 post-P1.3.3 — fresh session handoff"
derives_from: "odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed.md, odd/ledger/2026-04-20-p1-3-2-gate-canary-landed.md, canon/principles/cache-fetches-and-parses.md, canon/principles/vodka-architecture.md, canon/constraints/release-validation-gate.md, canon/principles/contract-governs-handoff-drift.md"
governs: "Fresh-session continuation after P1.3.3 shipped oddkit 0.21.1. Points the next session at P1.3.4 — encode's canon-parity refactor: migrate the trigger-word matcher from regex alternation to stemmed set intersection (D5, same matcher shape as challenge + gate), and remove the module-level cachedEncodingTypes cache per D9 and cache-fetches-and-parses. Encode's trigger vocabulary is already governance-driven (read from odd/encoding-types/*.md at runtime); what remains is the matcher inside the classifier and the in-process cache on the parse products. This is the LAST regex matcher in the sweep. Ship as 0.22.0."
status: superseded
superseded_by: odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md
---

# Handoff — P1.3.4 Encode Canon-Parity Refactor (0.22.0)

> P1.3.3 shipped oddkit 0.21.1 to prod. Challenge joined gate in the stemmed-matcher + no-microsecond-cache camp. Encode is the last holdout: its trigger vocabulary is already canon-driven (reads `## Trigger Words` from `odd/encoding-types/*.md` at runtime), but the matcher is `new RegExp("\\b(word1|word2|...)\\b", "i")` — literal word-boundary alternation with no stemming. Input "deciding" does not match canon vocab `decided`; "realizing" does not match `realized`. Same bug class challenge had pre-D5, with an additional dimension: encode's classifier has a deliberate multi-type design (a paragraph can match Decision AND Constraint simultaneously — the `no break` comment at L1161 is load-bearing, not an oversight, and the refactor must preserve it). There's also a module-level `cachedEncodingTypes` at L506–508 that caches parse products per `cache-fetches-and-parses`. Scope: ~40-line code delta, no canon changes, no envelope changes. Target: 45-75 min to prod. Ship as 0.22.0. This closes the sweep.

---

## Bootstrap — Read Before Acting

**First turn of the session:**

1. Call `oddkit_time` to anchor the clock.
2. Fetch `klappy://canon/bootstrap/model-operating-contract` via `oddkit_get`. It now contains a "Before Shipping Code" section that points at `klappy://canon/constraints/release-validation-gate` and `klappy://canon/principles/contract-governs-handoff-drift`. Read both. They are tier-1 and tier-2 canon respectively and they bind this session.
3. `git pull` on both repos before touching anything.

**Why this is at the top:** the P1.3.3 session failed because the orchestrator shipped past Cursor Bugbot (treated `in_progress` as non-blocking) and skipped the Sonnet 4.6 validator dispatch, following a session-ledger recommendation over the bootstrap contract. The canon written in response (ee9aee4 on klappy.dev, merged as PR #126) makes those shortcuts structurally unavailable to future sessions. This handoff does not re-litigate the validation path; `release-validation-gate` does. Read the canon, not the handoff's opinion.

---

## Current state at handoff

**Prod:** `oddkit.klappy.dev` serving 0.21.1 (verified 2026-04-20T11:45Z). Three tools in the sweep:

| Tool | Version shipped | Envelope fields | Matcher shape |
|---|---|---|---|
| `oddkit_encode` | **0.21.1** (unchanged since 0.18.0 except version sync) | `governance_source`, `governance_uri` (singular) | **regex alternation — target of this refactor** |
| `oddkit_challenge` | 0.21.1 | `governance_source`, `governance_uris` (plural array of 4) | stemmed set intersection + 4 structural-test side-paths (P1.3.3 landed) |
| `oddkit_gate` | 0.20.0 | `governance_source`, `governance_uris` (plural array of 2) | BM25 for transitions, stemmed set intersection for prereqs (P1.3.2 landed) |

**Code baseline:** klappy/oddkit main at `d17bc0c` (fix PR #122) + `2c5d652` (promotion PR #123). Verify with `git log -1 --oneline` on main before touching.

**Canon baseline:** klappy/klappy.dev main at `bc6bfb1` (P1.3.3 closeout + handoff flip, PR #127) and `ee9aee4` (release-validation-gate canon, PR #126). No pending canon-first prerequisites for P1.3.4 — encode's trigger vocab has been in canon since encode's initial 0.18.0 ship. The `cache-fetches-and-parses` principle was graduated in P1.3.3 at PR #125 (`3726073`).

**Recent carry-forward reading (in priority order):**
- `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed` — the P1.3.3 closeout. Documents both the technical work (D5 stemmed matcher for challenge, D9 cache removal, cache-fetches-and-parses graduation) AND the process failure that produced `release-validation-gate`. Read both halves.
- `klappy://canon/constraints/release-validation-gate` — the binding constraint. Read before shipping anything.
- `klappy://canon/principles/contract-governs-handoff-drift` — the principle this handoff is bound by. If anything here conflicts with canon, canon wins.
- `klappy://canon/principles/cache-fetches-and-parses` — the principle that motivates D9.
- `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed` — D5 split-by-fit origin and gate's implementation.

---

## Scope — exactly two items

### Item 1 — Migrate encoding-type classifier from regex alternation to stemmed set intersection (D5)

**Current state (workers/src/orchestrate.ts):**

- **L64** — `EncodingTypeDef.triggerRegex: RegExp | null`
- **L434–443** — parse-time construction: reads `## Trigger Words` from each `odd/encoding-types/*.md`, splits on comma, builds `new RegExp("\\b(" + escaped.join("|") + ")\\b", "i")`. Canon-driven vocabulary, regex matcher.
- **L462** — `types.push({ letter, name, triggerWords, triggerRegex, qualityCriteria })`
- **L490–502** — minimal fallback has hardcoded 6-type vocab and the same regex construction.
- **L1123** — call site in the batch-prefix parser's untagged-paragraph path: `for (const t of types) { if (t.triggerRegex && t.triggerRegex.test(para)) { matched = t; break; } }` — note the **`break`**, this path picks one type.
- **L1165** — call site in `parseUnstructuredInput` (the back-compat path for single-paragraph input): `for (const t of types) { if (t.triggerRegex && t.triggerRegex.test(para)) { ... push artifact ... } }` — note there's **no `break`**, and the existing comment explicitly says so:

> `// DESIGN: no break — a paragraph can match multiple types intentionally.`
> `// "We must never deploy without tests" is both Decision and Constraint.`
> `// Multi-typing at the server level mirrors what the model would do with`
> `// separate TSV rows. Do not add a break here.`

**This comment is load-bearing. The refactor must preserve both semantics: batch-untagged path picks first match, unstructured path emits one artifact per matching type.**

**Target state:**

Replace `triggerRegex: RegExp | null` on `EncodingTypeDef` with a parse product shape analogous to what P1.3.3 did for challenge:

```ts
interface EncodingTypeDef {
  letter: string;
  name: string;
  triggerWords: string[];       // keep for debugging / visibility
  stemmedTokens: Set<string>;   // parse product: stemmed canon vocab
  qualityCriteria: Array<{ criterion: string; check: string; gapMessage: string }>;
  // triggerRegex field REMOVED
}
```

Build `stemmedTokens` at parse time by tokenizing each canon trigger word with stop-words disabled (same empty-Set pattern the 0.21.1 fix applied to challenge — canon vocab includes stop-word-adjacent phrases like `must not`, `committed to`, `turns out` where stop-words need to survive on both sides). At runtime:

```ts
const inputStems = new Set(tokenize(para, new Set()));
// First-match path (batch-untagged): replace the break-on-regex-match loop with:
let matched: EncodingTypeDef | null = null;
for (const t of types) {
  if (intersects(t.stemmedTokens, inputStems)) { matched = t; break; }
}
// Multi-match path (parseUnstructuredInput): same per-type intersection,
// no break, push one artifact per matching type (preserves the existing
// no-break design comment verbatim).
```

The `tokenize` function lives in `workers/src/bm25.ts` and has been callable with a custom stop-words `Set` since the 0.21.1 fix. The `intersects` helper does not exist yet — either inline `Array.from(a).some((s) => b.has(s))` or add a small helper.

**Stop-words caveat (inherited from P1.3.3 Bug #1):** pass `new Set()` as the stop-words argument to both the parse-time `tokenize(word, new Set())` and the runtime `tokenize(para, new Set())`. Several canon trigger words contain or are stop-words: `going with`, `turns out`, `committed to`, `next step`, `blocked by`, `waiting on`, `next up`. Dropping them would silently break the strictly-additive invariant the same way challenge's matcher did. This is not optional — write a preview smoke assertion that exercises a stop-word-containing trigger (e.g. `"going with option B"` should match Decision) before declaring the refactor complete.

**Multi-word phrase caveat:** canon includes several multi-word phrases (`committed to`, `going with`, `turns out`, `next step`, `next session`, `follow up`, `blocked by`, `waiting on`, `must not`, `found that`, `wrote to ledger`, `ran oddkit_encode`, `saved encode output`, `captured via encode`, `open item`, `still need to`, `haven't decided`). Under `tokenize(phrase, new Set())`, `"committed to"` stems into `Set{"commit", "to"}`. Under `tokenize(input, new Set())`, `"I committed to shipping X"` also stems to include `{"commit", "to", ...}`. Set intersection on those will match — the phrase's individual stems are in the input. This is correct behavior (challenge did the same thing) but worth explicitly asserting in smoke. **Potential false positive:** an input that contains `commit` for unrelated reasons (e.g. `"git commit"`) might match Decision via the `commit` stem alone. Decide at design time whether this is acceptable (probably yes — the multi-type design already accepts over-classification) or whether multi-word phrases need their own structural check. My read is yes, accept it — challenge accepted the same shape and the multi-type design is tolerant of over-classification by construction.

**Stemmer gemination caveat (from P1.3.2):** the Porter-style stemmer in bm25.ts drops `-ing`/`-ed` but doesn't reverse consonant gemination. `shipping` → `shipp`, not `ship`. If any canon trigger word contains a geminating inflection, either add the inflected form to canon vocabulary (pattern gate used) or extend the stemmer (pattern nothing has used). The encode trigger vocabs look mostly safe on this front — `chose`, `selected`, `committed`, `noticed`, `discovered`, `encoded`, `captured`, `crystallized` all stem cleanly — but audit each trigger vocab before shipping. Inflection catch list to consider adding to each canon file: `deciding`, `choosing` (already there), `observing`, `learning`, `constraining`, `handing off`, `encoding`.

### Item 2 — Remove `cachedEncodingTypes` module-level cache (D9)

**Current state (workers/src/orchestrate.ts):**

- **L506–508** — after `getOrBuildEncodingTypeIndex` builds the types array, it caches three module-level variables: `cachedEncodingTypes`, `cachedEncodingTypesKnowledgeBaseUrl`, `cachedEncodingTypesSource`.
- Grep for the three symbol names to find all touch points. The cache-miss path at the top of `getOrBuildEncodingTypeIndex` checks whether the cached url matches the incoming url; on match, returns cached. Same structural shape as challenge had pre-P1.3.3.

**Target state:** remove the three module-level variables and the cache-check path; always compute inline via the existing `buildBM25Index`-adjacent construction (or, if there is no index build for encode, just run the parse loop fresh per call). Per `klappy://canon/principles/cache-fetches-and-parses`: cache the fetch (the KV / Cache API layer underneath `fetcher.getFile`) and the parse product at module construction time — do NOT cache microsecond computations in-process.

**Check for cleanup_storage resets:** `workers/src/orchestrate.ts` contains a `cleanup_storage` action that resets module-level caches for `oddkit_challenge`. Mirror the removal for encode — any reset code that mentions `cachedEncodingTypes` also gets deleted. Search the file.

**Verification:** after removal, `oddkit_encode` should be functionally identical but the parse products are rebuilt each call. The underlying `fetcher.getFile` calls are already cached by the Cache API tier (5-min TTL per the Module Memory → Cache API → R2 → ZIP hierarchy from E0008.1). The delta is pure-derivation time, sub-millisecond, not worth caching.

---

## Out of scope for P1.3.4

- **Challenge-type catalog changes.** No changes to `odd/challenge-types/*.md` or any challenge code.
- **Gate changes.** No changes to `oddkit_gate` code or canon.
- **Envelope changes.** `oddkit_encode`'s envelope stays singular `governance_uri`. Moving to plural is a separate decision for a future session.
- **New canon docs.** Encode's trigger vocabulary is already canon-driven. No new governance files need to be written for this refactor.
- **`triggerWords` cleanup.** Keep the `triggerWords: string[]` field on `EncodingTypeDef` for debugging visibility (it's small, human-readable, and lets the operator see what canon said at build time). Do not remove.
- **Strict-mode `getIndex` (O-open P2).** Still carried forward. Not in scope.

---

## Key design decisions already settled (from P1.3.2 + P1.3.3 precedent)

- **D5 split by fit:** BM25 for ranking, stemmed set intersection for independent gap-or-not. Encode's classifier is independent-per-type (multi-match allowed in one path, first-match in the other); set intersection fits. BM25 would be wrong here for the same reason it was wrong for challenge's prereq evaluator.
- **Stop-words disabled on canon vocab tokenization.** Pass `new Set()` as second arg to `tokenize()` on both sides. Canon vocab owns its own vocabulary including stop-words. P1.3.3 Bug #1 is the concrete precedent.
- **Cache fetches and parses, not microsecond derivations.** Remove `cachedEncodingTypes`. Compute inline per call. Fetch layer caches already.
- **Multi-type semantics preserved.** The no-break comment at L1161 is canon-by-convention. Refactor preserves both first-match and multi-match paths with their existing contract.
- **Ship as 0.22.0.** Minor version bump. Changelog notes describe the D5 + D9 application to encode and explicitly cite `cache-fetches-and-parses` + `release-validation-gate`.

---

## Code locations — exact line references

**All line numbers are on main at the time this handoff was written (`d17bc0c`). Verify with `git log -1 --oneline` and `grep -n` before acting.**

| Symbol / purpose | File | Line |
|---|---|---|
| `EncodingTypeDef.triggerRegex` field declaration | workers/src/orchestrate.ts | 64 |
| Trigger-word parse and regex build (canon path) | workers/src/orchestrate.ts | 434–443 |
| `types.push({...triggerRegex...})` | workers/src/orchestrate.ts | 462 |
| Minimal fallback vocab + regex build | workers/src/orchestrate.ts | 490–502 |
| `cachedEncodingTypes` + siblings — module-level cache | workers/src/orchestrate.ts | 506–508 |
| Batch-untagged classifier call site (first-match, `break`) | workers/src/orchestrate.ts | 1123 |
| `parseUnstructuredInput` classifier call site (no-break, multi-type) | workers/src/orchestrate.ts | 1165 |
| The no-break design comment (preserve verbatim) | workers/src/orchestrate.ts | 1161–1164 |
| `tokenize` with custom stop-words argument | workers/src/bm25.ts | search for `export function tokenize` |

**Other symbols to grep for before editing:** `cachedEncodingTypes`, `cachedEncodingTypesKnowledgeBaseUrl`, `cachedEncodingTypesSource`, `getOrBuildEncodingTypeIndex`. Also check any `cleanup_storage` handler code for references to these.

---

## Smoke test expansion

**Existing encode smoke coverage is at `workers/test/canon-tool-envelope.smoke.mjs` lines 132–213** (envelope + governance_source, DOLCHEO batch-prefix parsing, Open facet + priority band, knowledge_base_url override). These must continue to pass.

**Add these regression assertions** (same pattern as the P1.3.3 fix added `(10)` and `(11)`):

1. **Stemmed match on a canon-vocab inflection not in the literal vocab list.** Input `"I'm deciding to ship two-tier cascade"`. Canon has `decided` (stem `decid`) but not `deciding` (also stems to `decid`). Pre-refactor this matches because `deciding` contains `decid`... wait, no — `\b(decided|decision|chose|...)` does NOT match `deciding` because it's literal word-boundary alternation. Post-refactor it matches via stem intersection. Assertion: the returned artifact type is `D`. This is the regression anchor proving D5 landed.

2. **Stop-word canon vocab survives tokenization.** Input `"we're going with option B after the review"`. Canon has `going with` (Decision trigger). `with` is a stop-word in the default `STOP_WORDS` set. If stop-word filtering slips in, `going with` tokenizes to `{going}` or `{go}` on the vocab side and `{going, option, ...}` on the input side, and the match still works via `go`/`going` — but the multi-word phrase semantics are weakened. Assertion: input matches Decision. (This is the P1.3.3 Bug #1 anchor ported to encode.)

3. **Multi-type match preserved (`parseUnstructuredInput` path).** Input `"We must never deploy without tests because we decided this last week"`. Canon has `must`, `never` (Constraint) and `decided` (Decision). Pre-refactor this emits TWO artifacts (one C, one D) via the no-break loop. Post-refactor the same behavior must hold. Assertion: artifacts array has length >= 2 and includes both `C` and `D` type letters.

4. **First-match path preserved (batch-untagged `parseBatchInput`).** Input is a multi-paragraph batch where the first paragraph is untagged and contains both Decision and Constraint triggers. Assertion: that paragraph emits exactly ONE artifact, and its type is the first-matching canon type in file order (typically `C` before `D` because types are loaded alphabetically by filename — verify this behavior doesn't shift).

5. **`cachedEncodingTypes` removal — parse runs each call.** Low-level: the `debug.trace` span log on the encode envelope should show `file:odd/encoding-types/*.md` fetches (via Cache API if hot, R2 if cold) on every call, not once-per-session. This is harder to assert from smoke directly, but a grep of orchestrate.ts confirming zero references to `cachedEncodingTypes` satisfies the structural test. The operator can spot-check via two consecutive `oddkit_encode` calls and observing that both spans show the file fetches.

**Target:** smoke baseline moves from 172 pass to 176–177 pass with the new assertions. Assertions 3 and 4 may be a single test with multiple `ok()` calls each.

---

## CHANGELOG sketch for 0.22.0

```markdown
## [0.22.0] - 2026-04-20

### Changed

- **`oddkit_encode` trigger-word classifier migrated from regex alternation to stemmed set intersection** — same D5 split-by-fit applied to challenge in 0.21.0. Canon trigger vocabulary reads unchanged from `odd/encoding-types/*.md`; the matcher now tokenizes each quoted vocabulary word with stop-words disabled, stems into a `Set<string>` at parse time, and intersects against a stop-word-disabled stemmed input set at runtime. Inflected forms (`deciding`, `realizing`, `discovering`) now match their canonical stems (`decid`, `realiz`, `discover`) without requiring each inflection to be listed in canon. The batch-untagged first-match path and the `parseUnstructuredInput` multi-type path both preserve their existing contracts — the no-break design comment at the multi-type call site remains the governing spec. Per `klappy://canon/principles/vodka-architecture`: fit the matcher to the problem shape (independent gap-or-not per type, multi-type allowed by design) rather than forcing a one-matcher-fits-all.

### Removed

- **Module-level `cachedEncodingTypes` in-process cache** — per `klappy://canon/principles/cache-fetches-and-parses`. The fetch layer (Module Memory → Cache API → R2) already caches the canon file content with a 5-minute TTL; caching the parse product for microsecond re-derivation savings is the anti-pattern the principle names. Parse runs fresh per call; overhead is sub-millisecond on hot fetches.

### Refs

- Handoff: `klappy://odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity`
- Closeout: `klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed` (post-ship)
- Canon basis: `klappy://canon/principles/cache-fetches-and-parses`, `klappy://canon/principles/vodka-architecture`
- Precedent: oddkit 0.21.1 (challenge's D5 + D9), 0.20.0 (gate's D5 + D9)
- Shipping gate: `klappy://canon/constraints/release-validation-gate` (binding)
```

---

## Validation plan — non-negotiable, per release-validation-gate

**This section does not offer options.** Per `klappy://canon/constraints/release-validation-gate`, the path is fixed. The P1.3.3 handoff had an "Option A vs. Option B" section that produced the P1.3.3 incident; future sessions should treat this single-path plan as binding.

### Before merging the feature PR to main

1. CI must reach all-green: Cursor Bugbot `completed` with conclusion `success` or `neutral`; if `neutral`, read every finding and disposition it (fix-forward / waive-in-body / tracking-issue). Do not merge past `in_progress`.
2. Preview smoke must run 3 consecutive times against the preview URL, 176+ pass each, 0 fail, with the new regression assertions explicitly exercised.
3. Live curl the preview MCP endpoint with the inflection-match input from assertion 1 and confirm the returned artifact type is `D`. Paste the curl in the PR body.

### Before merging the main → prod promotion PR

**This refactor touches `workers/src/orchestrate.ts`, which is load-bearing surface per `release-validation-gate` Rule 2. Independent fresh-context validator dispatch is mandatory.**

1. Dispatch a Sonnet 4.6 read-only validator session via Managed Agents (see `/mnt/skills/user/managed-agents/SKILL.md`). The 5-corroboration pattern from P1.3.1 applies, adapted for encode:
   - C1: PRD vs shipped diff drift.
   - C2: bytes-on-branch — zero refs to `cachedEncodingTypes`, `triggerRegex` field removed from `EncodingTypeDef`, both classifier call sites use `intersects(stemmedTokens, inputStems)`, stop-words disabled on both `tokenize()` calls, the no-break design comment is preserved verbatim.
   - C3: live curl matrix — inflection match (assertion 1), stop-word survival (assertion 2), multi-type preservation (assertion 3), first-match preservation (assertion 4), and a negative case (input with no vocab → single fallback-type artifact).
   - C4: canon retrievability — `oddkit_get` on each `odd/encoding-types/*.md` returns the expected file; no new canon docs are expected, existing ones unchanged.
   - C5: independent smoke against preview × 3.
2. Wait for validator `idle` status. Read every finding. Disposition each one in the closeout ledger before merging the promotion PR.
3. If any corroboration returns `FAIL` or `PARTIAL` without an acceptable reason, treat as blocker.

### After promotion

1. Prod smoke × 3 consecutive.
2. Live self-call from the orchestrator's own MCP connection against `oddkit.klappy.dev/mcp`: run `oddkit_encode` with `"I'm deciding to ship the refactor"` and confirm the returned artifact type is `D`. This is the in-session verification; it does NOT substitute for the Rule 2 validator, which is its own dispatch.
3. Write the P1.3.4 closeout ledger. Include validator session ID, validator verdict, any disposition. Flip this handoff to `status: superseded` with `superseded_by` pointing at the ledger.

---

## Attestation mapping — what satisfies which constraint

| Constraint | Rule | Satisfied by |
|---|---|---|
| release-validation-gate Rule 1 | No merge with active reviews | Wait for Bugbot `completed` on feature PR + promotion PR before merging either. Read and disposition any findings. |
| release-validation-gate Rule 2 | No promotion without independent validation | Sonnet 4.6 validator dispatch against feature branch + promotion branch + prod, 5-corroboration pattern, validator session ID recorded in closeout ledger. |
| release-validation-gate Rule 3 | Canon outranks session artifacts | Read canon first. If anything in this handoff conflicts with release-validation-gate, canon wins — surface the conflict and follow canon. |
| cache-fetches-and-parses | Cache the fetch, not the derivation | `cachedEncodingTypes` removed. Fetch tier (Cache API, 5-min TTL) stays. |
| vodka-architecture | Fit the matcher to the problem | Set intersection for multi-type independent classification. No BM25 (wrong shape). |
| contract-governs-handoff-drift | If this handoff recommends something that contradicts canon, follow canon | This handoff explicitly does not; if the orchestrator sees a conflict, name it and follow canon. |

---

## Standing rules (carried forward, unchanged)

- **`oddkit_time` first call of every turn.** Pass the prior turn's `server_time` as `reference`.
- **Mode before work.** Declare the mode before any substantive task.
- **Search canon before claiming.** `oddkit_search` before asserting anything about canon content.
- **Writing canon gate if any canon is touched.** This handoff does not expect canon changes, but if any emerge (e.g. adding an inflected form to a trigger vocabulary), gate applies: blockquote with compressed argument, Summary section, descriptive headers.
- **GitHub API JSON via python urllib.** Do not use inline shell JSON with apostrophes.
- **Never run `wrangler deploy` manually.** Git push triggers CF auto-deploy.
- **Persist encode output.** `oddkit_encode` does NOT persist. Save to file after every encode call.
- **YAML frontmatter typing.** Booleans, integers, dates unquoted. Only strings with special characters get quotes. Authoritative: `canon/meta/frontmatter-schema.md`.

---

## Carry-forward O-opens (updated from P1.3.3 closeout)

- **P2 (carried)** — `getIndex` strict-mode (`skipBaselineFallback`) across encode/challenge/gate. Would let 0.22.0's override-smoke assert `minimal` instead of the current `knowledge_base via baseline-merge`. Not in P1.3.4 scope; a good follow-up if time allows.
- **P3 (carried)** — Handoff text corrections (historical). Not blocking.
- **P5 (carried)** — `workers/baseline/` build pipeline.
- **P6 (carried)** — CHANGELOG render route + `version_notes_url` on MCP `initialize`.
- **P9 (carried)** — Global `cachedBM25Index` review under `cache-fetches-and-parses` (counter-case: 524+ docs, a legitimate cache candidate). Worth re-examining after P1.3.4 lands — with encode's cache removed, the BM25 index cache is the last module-level cache, and its justification should be re-stated or removed.
- **P10 (carried, from P1.3.2)** — Gate classifier oscillation under retry.
- **P11 (from P1.3.3)** — `oddkit_gate` mechanical enforcement of `release-validation-gate` at execution → completion transitions. This is the higher-leverage structural work after P1.3.4. Consider it the natural P1.3.5 if the sweep continues, or escalate to an epoch transition (E0008.4 or E0009) since it's a capability add, not a parity ship.
- **P12 (from P1.3.3)** — `tokenize()` audit pass: any caller that passes canon vocabulary or canon-adjacent input should explicitly name its stop-words choice. Related to this refactor — encode becomes the third explicit `new Set()` call site.

---

## Closes the sweep

P1.3.4 is the **last regex-matcher ship** in the canon-parity sweep. After it lands:

- All three tools use stemmed set intersection (or BM25 where ranking is the shape).
- All three tools have their in-process derivation caches removed per `cache-fetches-and-parses`.
- All three declare `governance_source` in the envelope; gate + challenge declare plural `governance_uris`; encode stays singular per its single-hierarchy structure.
- Two new canon docs (`release-validation-gate`, `contract-governs-handoff-drift`) govern the release pipeline itself.

The sweep's next move is P11 — mechanical enforcement of `release-validation-gate` in `oddkit_gate`. That's a capability add, not a parity ship; it belongs in a fresh epoch scope, not under E0008.3.

---

## Thin prompt for next session

> P1.3.3 shipped oddkit 0.21.1 to prod. Encode is the last regex-matcher in the sweep. Migrate it to stemmed set intersection (D5) and remove `cachedEncodingTypes` (D9). Preserve the multi-type no-break design at L1161. Stop-words disabled on tokenize() both sides (P1.3.3 Bug #1 precedent). Release validation gate is binding: no merge past Bugbot in_progress, independent Sonnet 4.6 validator before promotion, canon outranks any session recommendation. Scope is small (~40 lines), target 45–75 min. Ship as 0.22.0. Closes the sweep.

---

## Provenance

- Written 2026-04-20 immediately after P1.3.3 closed (closeout ledger `bc6bfb1`, canon meta-fix `ee9aee4`).
- Author's session context: P1.3.3 was the session that demonstrated why `release-validation-gate` needed to exist. This handoff is written with full awareness that a "recommendation vs. canon" ambiguity in its own body could produce the same failure mode. Every validation path in this handoff is presented as binding, not optional. If the next session reads something here that conflicts with canon, canon wins per `contract-governs-handoff-drift`.
- No validation-plan optionality. No "Option A vs. Option B." One path, per release-validation-gate.

---

## Refs

- Predecessor ledger: `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed`
- Release validation gate (binding): `klappy://canon/constraints/release-validation-gate`
- Contract governs handoff drift (binding): `klappy://canon/principles/contract-governs-handoff-drift`
- Cache fetches and parses: `klappy://canon/principles/cache-fetches-and-parses`
- Vodka architecture: `klappy://canon/principles/vodka-architecture`
- Bootstrap: `klappy://canon/bootstrap/model-operating-contract`
- Managed Agents skill (for Rule 2 dispatch): `/mnt/skills/user/managed-agents/SKILL.md`
- Encode canon source: `klappy://odd/encoding-types/*.md`
- DOLCHEO vocabulary: `klappy://canon/definitions/dolcheo-vocabulary`
