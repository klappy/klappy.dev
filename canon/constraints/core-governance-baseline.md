---
uri: klappy://canon/constraints/core-governance-baseline
title: "Core Governance Baseline — What Ships With the Worker, What Lives in Canon"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "governance", "vodka-architecture", "baseline", "fallback", "availability", "maintainability"]
epoch: E0008
date: 2026-04-17
derives_from: "canon/principles/vodka-architecture.md, canon/principles/dry-canon-says-it-once.md, canon/constraints/oddkit-prompt-pattern.md, canon/principles/maintainability-one-person-indefinitely.md, canon/values/axioms.md"
complements: "docs/oddkit/tools/oddkit_version.md, canon/constraints/telemetry-governance.md"
governs: "Every oddkit tool that reads governance from canon at runtime. Defines what must ship bundled, what must live only in canon, and what happens when canon is unreachable."
status: draft
---

# Core Governance Baseline — What Ships With the Worker, What Lives in Canon

> A knowledge-base-driven tool that cannot function without a live knowledge base fetch is a tool that disappears when GitHub throws a 403. A tool that ships its full governance hardcoded is a drift surface by definition. The answer is neither: each oddkit release ships a bundled canon baseline — the minimum set of files every tool requires to function — and fetches fresh canon at runtime to override it. When a custom knowledge_base_url is missing a required file, the worker falls back to its bundled baseline and marks the response so the caller knows which tier served them.

---

## Summary — Canon Is Authoritative; Baseline Is the Floor

Every oddkit tool that reads governance from canon sits on a three-tier resolution stack: **live canon** (preferred) → **bundled baseline** (fallback) → **fail loud** (if neither source contains a required file). The bundled baseline is a snapshot of core governance files taken at worker build time, shipped inside the worker bundle, and used only when the live fetch cannot serve the required file.

This is the Vodka-compliant answer to the availability tension. Pure knowledge-base-driven tools are brittle — a transient GitHub 403 or a custom knowledge_base_url missing a file breaks governance silently. Pure hardcoded tools violate `canon/principles/dry-canon-says-it-once` — the server re-encodes rules the canon already defines, creating drift surfaces. The baseline pattern splits the difference: canon is authoritative, baseline is the floor, and the response envelope declares which tier served each call.

Three rules govern the pattern. **First, the baseline is a snapshot, never a source.** It is regenerated from canon at every worker build; no file is ever edited in the baseline directory. **Second, the baseline contains only core governance files** — the files every knowledge-base-driven tool requires to function at all. Tool-specific governance (encoding types, challenge claim types, etc.) is not baseline; it is canon-only and tools degrade gracefully to minimal behavior without it. **Third, every knowledge-base-driven response declares its governance tier** — the response envelope surfaces `{ governance_source: "knowledge_base" | "bundled" | "minimal" }` so callers can detect degradation.

The failure mode this prevents: PR #100's `1h 39m` production breakage was a canon/code drift — schema said three modes, canon defined nine. Under this contract, drift of that shape cannot silently reach production, because the worker cannot ship without its baseline matching canon at build time, and runtime canon either agrees with baseline or supersedes it visibly.

---

## Prior Art & Honest Framing

This pattern is not novel. A three-tier resolution stack — fresh → cached → fallback — is the same shape as HTTP's `stale-while-revalidate` caching directive, DNS resolution with local hosts files, Linux's `/etc` configuration with package defaults, etcd configuration stores with bundled defaults, and npm's lockfile-over-registry resolution. What makes this contract specific to oddkit is not the stack — it's the *governance* focus: the stack resolves rule-defining documents, not content, and the tier signal is surfaced to callers as a first-class envelope field rather than buried in HTTP headers.

There is also a legitimate counter-position worth naming: **pure fail-loud systems work**. Cloudflare Workers themselves, for example, do not ship with bundled fallback policies — if R2 fails, the Worker fails, and the orchestrator (Cloudflare's edge network) handles the failure. That pattern is coherent when upstream failures are rare enough that loud failure is cheaper than ongoing availability complexity. The case for *not* adopting that pattern here is that oddkit's transparent GitHub 403 errors (observed in this very session's traces) are frequent enough — and the tools disappearing on every transient failure would be severe enough — that the availability floor is worth the added complexity.

Finally, this contract rests on one documented failure case (PR #100) and a few transient-403 observations. It is proposed as a hypothesis about the right shape for the sweep, not an established principle. Retraction conditions: if the canary refactor reveals that the build-time schema check blocks valid canon evolution more often than it catches real drift, or if consumers end up relying on baseline as if it were canon (the "baseline capture" failure mode below), the pattern should be revisited before being applied to more tools.

---

## The Resolution Stack

Every knowledge-base-driven tool follows this resolution order for every governance file it needs:

```
1. Live canon fetch (knowledge_base_url or default baseline_url)
   ↓ on 404 / 403 / network failure / file missing
2. Bundled baseline (shipped inside the worker)
   ↓ on file not in baseline either
3. Fail loud (error envelope naming the missing file)
```

The response envelope surfaces which tier served the governance:

- `governance_source: "knowledge_base"` — live knowledge base fetch succeeded, the file was present
- `governance_source: "bundled"` — live fetch failed or file was missing; bundled baseline used
- `governance_source: "minimal"` — neither canon nor baseline had the file; tool degraded to its hardcoded minimum behavior (e.g. challenge falls back to generic "what evidence supports this?")
- `error: "required_governance_missing"` — the file is required for the tool to function at all; no fallback exists

Callers that need authoritative governance can inspect the envelope and refuse to proceed if `governance_source !== "knowledge_base"`. Callers that value availability over strict authority (most humans, most agents) can proceed with the bundled tier knowing they're on the floor, not the surface.

### Fail-Loud Error Envelope — Transparency Is Actionable or It Is Nothing

Fail-loud is a service to the operator only if the error tells them how to fix it. A bare "required file missing" is a stack trace, not transparency. The error envelope for the third tier must be self-resolving: what broke, why it broke, and what to do next.

```json
{
  "error": "required_governance_missing",
  "tool": "validate",
  "missing_files": [
    "canon/constraints/definition-of-done.md"
  ],
  "knowledge_base_url_in_use": "https://github.com/someuser/my-canon",
  "is_default_canon": false,
  "resolution": {
    "if_using_default_canon": "The oddkit baseline regeneration failed — the file is required but not bundled. Report at https://github.com/klappy/oddkit/issues.",
    "if_using_custom_knowledge_base_url": "Your canon at https://github.com/someuser/my-canon is missing required governance. Either (a) add the file to your canon, or (b) omit knowledge_base_url to use the oddkit-hosted default.",
    "required_file_spec": "klappy://canon/constraints/core-governance-baseline#required-in-baseline",
    "reference_content_url": "https://raw.githubusercontent.com/klappy/klappy.dev/main/canon/constraints/definition-of-done.md"
  }
}
```

The `reference_content_url` points at the oddkit-hosted canon's version of the missing file. This is explicitly a **reference implementation, not a mandatory canon** — the operator can copy, adapt, or replace the content entirely. What matters is the file exists and parses to the required schema. The URL is there so operators don't have to hunt for an example of what the file should look like. Consumers building their own canon stay sovereign over content; they inherit only the structural contract.

---

## Baseline Health — The `oddkit_baseline_check` Probe

Operators need a way to check governance health without having to trigger errors through real tool calls. A new tool, `oddkit_baseline_check`, answers the question "is my canon complete?" as a first-class probe.

**Input:** optional `knowledge_base_url` (defaults to the standard baseline URL).

**Output:** a manifest-compliance report.

```json
{
  "action": "baseline_check",
  "knowledge_base_url": "https://github.com/someuser/my-canon",
  "result": {
    "status": "INCOMPLETE",
    "required_files": {
      "canon/values/orientation.md": { "present": true, "schema_valid": true },
      "canon/values/axioms.md": { "present": true, "schema_valid": true },
      "canon/meta/writing-canon.md": { "present": true, "schema_valid": true },
      "canon/constraints/definition-of-done.md": {
        "present": false,
        "affects_tools": ["validate", "preflight"],
        "reference_content_url": "https://raw.githubusercontent.com/klappy/klappy.dev/main/canon/constraints/definition-of-done.md"
      },
      "canon/constraints/telemetry-governance.md": { "present": true, "schema_valid": true },
      "odd/challenge/stakes-calibration.md": {
        "present": true,
        "schema_valid": false,
        "schema_errors": ["mode table row 4: missing 'stakes' column"],
        "affects_tools": ["challenge"]
      }
    },
    "tools_degraded": ["validate", "preflight"],
    "tools_broken": ["challenge"],
    "baseline_sha": "abc123def"
  }
}
```

Three status values:

- `COMPLETE` — every required file is present and schema-valid; no tools will degrade
- `INCOMPLETE` — one or more required files missing or schema-invalid; lists which tools are affected
- `UNREACHABLE` — the knowledge_base_url itself could not be fetched; operator needs to check the URL or their network

The probe is cheap (one index fetch, file existence checks, schema parses) and idempotent. It's the tool an operator runs before trusting their custom canon in production, and the tool a CI job runs to validate a canon branch before merge. It is explicitly not a replacement for the per-tool `governance_source` signal — probe is a before-you-deploy check, `governance_source` is a during-the-call signal.

---

## What Ships in the Baseline

The baseline directory contains *exactly* the files every knowledge-base-driven tool requires to function. This is a small set — single digits. The rule is: **if any tool would fail closed without this file, it's baseline. Otherwise, it's canon-only.**

### Required in Baseline (Every Worker Release)

These files MUST be present in the baseline snapshot. The worker build fails if any are missing from the canon repo at build time.

- `canon/values/orientation.md` — The creed; required by `orient`
- `canon/values/axioms.md` — The four axioms; required by `orient` and `challenge`
- `canon/meta/writing-canon.md` — Writing Canon checklist; required by `preflight` and `validate`
- `canon/constraints/definition-of-done.md` — Evidence requirements for completion; required by `validate` and `preflight`
- `canon/constraints/telemetry-governance.md` — Header table and policy; required by `telemetry_policy`
- `odd/challenge/stakes-calibration.md` — The 9-mode calibration; required by `challenge`

### Canon-Only (Never Bundled)

These files enhance tool behavior but their absence degrades to sensible minimums rather than failing:

- Every file in `odd/encoding-types/` — encode falls back to OLDC+H defaults
- Every file in `odd/challenge-types/` — challenge falls back to generic pressure questions
- Every file in `odd/gate/` — gate falls back to structural prereqs
- All `writings/`, `docs/`, `apocrypha/` content — only relevant for search/get/catalog, not governance

The split test: if a tool cannot return a coherent response without the file, it's baseline. If the tool can return a response that is less governed but still useful, it's canon-only.

---

## Search-Corpus Boundary — Project-KB Visibility Is an Observability Property

The split between *required-baseline* (§"Required in Baseline") and *canon-only* (§"Canon-Only (Never Bundled)") classifies what the worker bundles. It also classifies what the **search corpus** indexes when a project KB is set.

E0008 made oddkit observable from the inside — every subrequest traced, every cache decision recorded, every envelope carrying its own time. E0008.5 extends that posture outward: **observability requires discoverable and reliable document retrieval.** When a project's own canon is buried under hundreds of unrelated documents from a co-located baseline, the project KB is not observable from the agent's seat. The documents exist; they cannot be found. That is the same failure shape as a missing trace span — present in the system, absent from the view that decisions are made from. The boundary defined in this section is the search-corpus expression of that posture.

When `knowledge_base_url` is set, the search corpus default is **overlay + required-baseline only** — not overlay + the entire baseline repo. The required-baseline files are the floor every tool needs; the canon-only files (`writings/`, `apocrypha/`, `odd/ledger/`, encoding-types, challenge-types, gate variants) belong only to the project that authored them. Indexing them into a third-party project KB drowns the project's own canon in unrelated noise — the failure shape `klappy://canon/principles/scoped-truth` names as the anti-pattern of unscoped governance, and the failure shape this document's §"Failure Modes OF This Contract" anticipates as silent baseline capture. Both reduce to the same root: a corpus the agent cannot see clearly is a corpus the agent cannot reason about.

### Why Scoping Defaults to On — Buried Is Indistinguishable from Absent

The observability framing makes the design choice automatic: a default that hides a project's own canon under unrelated baseline content fails the discoverability half of the property — and a corpus that cannot be discovered cannot be reliably retrieved from. From the agent's seat, a top-ranked unrelated document is functionally indistinguishable from the relevant document being missing. Both produce the same outcome: the right answer is not on the screen. The default must be the configuration where the project's own canon shows up first when its own canon is the right answer.

A project KB exists because the project has its own canon. The agent searches it because the project's canon is the right answer to the project's questions. Merging the entire baseline into that search corpus inverts the design: in measured probes against `klappy/ptxprint-mcp`, the 566 baseline docs outranked the project's 21 canon docs in BM25 for queries the project's canon was authored to answer. The project KB's content was present and correct; it was simply outvoted. From the agent's seat that is operationally equivalent to the project KB not being there at all — which is exactly the unobservability the boundary is designed to remove.

Scoping is a default, not a hard wall. Required-baseline still travels with every project KB — `axioms.md`, `orientation.md`, `definition-of-done.md`, `writing-canon.md`, `telemetry-governance.md`, and `stakes-calibration.md` are present in the search index for every consumer. Tools that depend on those files (orient, challenge, validate, preflight, telemetry_policy) keep working unchanged. What stops surfacing in scoped mode is the broader baseline: another project's writings, another project's session ledgers, another project's apocrypha. Those were never required for tool function — this document already classifies them as canon-only — they just happened to be inside the same baseline repo and to land in the search index by accident of co-location.

### Opt-In to Merged

Callers who genuinely want the merged corpus pass `include_full_baseline: true` on the relevant action. This restores the prior behavior: overlay + full baseline indexed together, with arbitration favoring overlay on path/URI conflicts. Use cases include a project that intentionally wants to surface cross-domain hits, a debugging session reproducing a prior result, and the default-KB consumer where there is no overlay to scope to (in which case the parameter is a no-op).

When `knowledge_base_url` is unset, default behavior is unchanged: the baseline is the canon, `include_full_baseline` defaults to `true`, and there is nothing to scope.

### Scope Applies Only to the Search Index — Not to Per-File Resolution

The boundary defined here applies to the **search corpus** — the set of documents the worker BM25-indexes for ranked retrieval. It does **not** override the per-required-file resolution stack defined in §"The Resolution Stack." `oddkit_get` for a required-baseline URI still walks live-canon → bundled-baseline → fail-loud as documented. `oddkit_orient`, `oddkit_challenge`, and `oddkit_validate` still read their required governance files via the resolver, not the search index. The fact that `writings/the-intern.md` is excluded from a scoped search corpus does not mean it disappears from `oddkit_get`'s resolution surface; it means it does not compete for ranking slots against the project KB's own canon.

This separation is what keeps Runtime Invariant #5 (`baseline path is never user-configurable`) intact. The baseline floor — the files that must always be available regardless of caller — is unchanged. Only the search corpus, which is a derived surface assembled per-call from canon and baseline together, becomes scope-sensitive.

### Affected Tools

| Tool | Default when `knowledge_base_url` is set | Accepts `include_full_baseline`? |
|---|---|---|
| `oddkit_search` | Overlay + required-baseline | Yes |
| `oddkit_catalog` | Overlay + required-baseline (counts and category aggregations scoped accordingly) | Yes |
| `oddkit_preflight` | Overlay + required-baseline | Yes |
| `oddkit_orient` | Unchanged — governance reads, not search index | No |
| `oddkit_get` | Unchanged — per-file resolution stack | No |
| `oddkit_challenge`, `oddkit_validate`, `oddkit_gate`, `oddkit_encode` | Unchanged — governance reads only | No |

### Cache Key Includes Scope

The compiled search index is content-addressed by `(baselineSha, knowledgeBaseSha, scope)`. A scoped index and a merged index against the same KB have distinct cache keys; neither poisons the other.

### Telemetry — The Property Has to Be Checkable from Outside

The telemetry envelope adds `search_scope`, `overlay_doc_count`, and `baseline_doc_count` on ranked actions. Without these, the boundary would be a contract the maintainer has to take on faith — observable from inside the worker's logs but invisible to the consumer reading the response. With them, every ranked response carries the evidence of which corpus it was drawn from, in numbers anyone can read without running a smoke test. The maintainer can detect (a) whether scoped is the dominant default in the wild, (b) whether `include_full_baseline=true` is being adopted intentionally, and (c) whether any consumer is silently capturing baseline content into their search corpus — the failure shape §"Failure Modes OF This Contract" already names. This is the §"Fail-Loud Error Envelope" pattern applied to ranking provenance: the envelope tells you what corpus it came from so you do not have to guess.

---

## Build-Time Invariants

The worker build process must enforce these invariants. A build that violates any of them fails before produce.

1. **Baseline is regenerated, never edited.** The build script fetches the canon repo at the pinned SHA, extracts the required-baseline files, and writes them into `workers/baseline/`. Any manual edits to files in `workers/baseline/` are discarded at next build.

2. **Baseline schema must match canon schema.** For files that define structured data (like `stakes-calibration` mode table, `telemetry-governance` header table, encoding-type identity tables), the build runs a schema check: baseline and canon must parse to the same structure. Schema divergence fails the build. This is the invariant that would have caught PR #100 before merge.

3. **Baseline SHA is recorded in worker env.** `env.BASELINE_SHA` exposes the canon commit the baseline was generated from. `oddkit_version` surfaces this. Debugging drift requires knowing which canon commit is the floor.

4. **All required-baseline files enumerated in one manifest.** A single file (`workers/baseline/MANIFEST.json`) lists every file the baseline must contain. Build failures cite this manifest. Adding a new required file means updating the manifest and incrementing a migration marker.

---

## Runtime Invariants

Every knowledge-base-driven tool must follow these rules. Review is mechanical: grep for any canon fetch and verify each of these holds.

1. **Fetch canon first; fall back to baseline on any failure.** The fetcher exposes a single method that implements the resolution stack. Tools call the fetcher, not `raw.githubusercontent.com` directly.

2. **Declare the tier in every response.** The envelope field `governance_source` is required on every knowledge-base-driven response. Missing field is a bug.

3. **Return the full response envelope.** Every knowledge-base-driven tool (and every oddkit tool generally) must return `{action, result, server_time, assistant_text, debug}` where `server_time` is ISO 8601 UTC, `assistant_text` is a short human-readable summary, and `debug` contains at minimum `duration_ms`. Partial envelopes are a regression. The time-discipline system depends on `server_time` being on every response — a tool that returns only `{action, result}` silently breaks the model's clock-in-the-room contract.

4. **Accept `knowledge_base_url` as a first-class parameter.** Every knowledge-base-driven tool must declare `knowledge_base_url: z.string().optional()` in its Zod schema and thread it through to the fetcher. A schema of `{}` causes MCP to strip the parameter silently, defeating the override contract that this entire document is built on. Consumers pointing oddkit at their own canon (TruthKit, private KBs, custom forks) depend on `knowledge_base_url` being honored.

5. **Baseline path is never user-configurable.** `knowledge_base_url` overrides the live knowledge base fetch, not the baseline. Callers cannot point the baseline at an arbitrary URL. The baseline is the floor; the floor does not move.

6. **Cache empty results only when the resolution stack succeeded.** The H4 bug in the PR #100 handoff — cache poisoning from 403 — is addressed here: a 403 triggers baseline fallback, not a cached empty result. Empty results are cached only when canon authoritatively returns empty (which is itself unusual and flagged).

7. **Live-smoke against the MCP endpoint is mandatory pre-merge.** Internal parser tests verify parser correctness; they do not verify tool contract. The canary refactor (telemetry_policy) shipped with a broken envelope and a silently-stripped `knowledge_base_url` parameter because nothing invoked the MCP tool end-to-end pre-merge. A live-smoke test that curls the MCP endpoint and asserts the full envelope shape, `governance_source` presence, and `knowledge_base_url` override behavior is a ship-blocker. Template lives in `workers/test/canon-tool-envelope.smoke.mjs` in the oddkit repo.

---

## Why This Is Vodka-Compliant

The three-tier stack reads like adding server opinion, but it does the opposite. Here is the ledger:

- **Canon is still the single source of truth.** Baseline is a snapshot of canon, not a fork. Edits happen in canon; baseline regenerates. There is no second source to keep in sync.
- **The server still contains no governance.** The baseline directory contains canon files, not re-encoded rules. The server reads them the same way it reads live canon.
- **Drift is structurally impossible.** The build fails if baseline and canon disagree on schema. Runtime fetches override baseline when available. The only drift window is between a canon edit and the next worker deploy — which is the same window every system has, and it's covered by the `governance_source: "bundled"` signal in responses.

The pattern satisfies `dry-canon-says-it-once` (no duplicated rules, just a cached snapshot), `vodka-architecture` (thin server over stateful canon, with the baseline as the freshness floor), and `maintainability-one-person-indefinitely` (the baseline is generated, never edited — no ongoing maintenance tax on the maintainer).

---

## Refactor Implications

Every tool in the governance anti-pattern sweep (`docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md`) must conform to this contract as part of its refactor. Seven criteria (see `Runtime Invariants` above):

- Every canon fetch routes through the resolution stack
- Every response declares `governance_source: "knowledge_base" | "bundled" | "minimal"`
- Every response returns the full envelope: `{action, result, server_time, assistant_text, debug}`
- Every knowledge-base-driven tool's Zod schema accepts `knowledge_base_url`
- Required baseline files for the tool are enumerated in the manifest
- The build-time schema check is added for any structured canon file the tool reads
- A live-smoke test against the MCP endpoint passes pre-merge (template at `workers/test/canon-tool-envelope.smoke.mjs`)

The canary refactor (telemetry_policy self_report_headers) was the first test of this contract. It shipped as two PRs: `klappy/oddkit#106` (original canary — governance_source + canon-fetched headers) and `klappy/oddkit#108` (completeness fix — envelope shape + knowledge_base_url schema + live smoke). The split is itself a lesson: the original PR claimed conformance to this contract but met only 2 of the 7 criteria above. Live validation against prod surfaced the gaps; the follow-up closed them. Every subsequent refactor in the sweep runs the 7-point checklist before the PR opens, not after.

---

## Failure Modes Under This Contract

**Canon unreachable, baseline serves.** Transient GitHub outage: tools continue working, every response carries `governance_source: "bundled"`. Operator notices the signal, diagnoses the fetch, canon resolves. No silent degradation.

**Custom knowledge_base_url missing a required file.** A TruthKit user points oddkit at their private canon that lacks `definition-of-done.md`. `validate` falls back to baseline's version — which reflects the oddkit-hosted canon's definition. Response is marked `baseline`. User sees the tier signal and either adds the file to their canon or accepts the oddkit floor.

**Schema drift caught at build.** Someone edits `stakes-calibration.md` in canon with a malformed table. The build-time schema check fails. The worker does not deploy. This is the exact failure mode PR #100 needed and didn't have.

**Canon, baseline, and minimal all fail to serve a required file.** A bug in the fetcher; the manifest-required file is missing from baseline (regeneration bug); and the tool has no minimal fallback (required-baseline class). Response is an error envelope with the full resolution block — operator reads the envelope, sees which file is missing, sees the reference content URL, fixes the bundle or adds the file to their canon. Loud, but self-resolving.

---

## Failure Modes OF This Contract — How the Pattern Itself Could Be Wrong

The failure modes above are how the contract handles adverse conditions. These are the ways the contract itself could be the wrong answer — the self-falsification conditions that would force a revisit before applying the pattern to more tools.

**Build-time schema check too strict; blocks valid evolution.** The build enforces that baseline schemas match canon schemas. If canon evolves — adding a column to the mode calibration table, restructuring the encoding-types tables — the build fails until the schema check itself is updated. If this happens more than once or twice per epoch, the check is friction, not safety. Retraction signal: canon PRs that are structurally correct but blocked by the build-time check need more than trivial schema updates to land. Mitigation if it happens: relax the schema check to field-presence-only, not full structural match.

**Baseline capture.** Consumers of custom canons come to rely on `governance_source: "bundled"` as acceptable steady state. Instead of adding missing files to their canon, they silently accept the oddkit-hosted baseline's version. The baseline becomes de-facto canon for those consumers — exactly the DRY violation this contract exists to prevent, just shifted from code to baseline. Retraction signal: telemetry shows a persistent non-trivial share of requests returning `governance_source: "bundled"` from non-default knowledge_base_urls. Mitigation: make baseline responses come with an explicit "degraded" flag and include the reference URL in every response, not just errors.

**Baseline corruption.** The build script regenerates baseline at worker build, but if the regeneration is silently wrong (GitHub returned a stale SHA, the zip was incomplete, a file got truncated), the worker ships with a corrupt baseline. Runtime canon masks this most of the time, but when canon is unreachable, the baseline takes over and serves subtly-broken governance. Retraction signal: `telemetry_policy` or `baseline_check` responses show baseline content that diverges from the canon repo at the recorded `BASELINE_SHA`. Mitigation: content-hash every required-baseline file at build time, verify the hashes match at runtime before serving.

**Schema check creates false confidence.** Passing the build-time schema check is not a guarantee of semantic correctness. A mode calibration table can be structurally valid (9 rows, correct columns) but semantically wrong (mode names misspelled, stakes descriptions contradictory). The contract as written catches structural drift but not semantic drift. The check buys less than it appears to buy. Retraction signal: a production bug ships that has canon and baseline agreeing structurally but disagreeing with the tool's behavior expectations. Mitigation: add semantic test cases per tool, exercised at build time.

**Pattern doesn't generalize beyond this session's 2-3 tools.** The pattern was designed from audit of 11 tools and tested against one (`challenge`, via PR #100's retroactive lessons). If the canary and the first two refactors reveal that each tool needs substantially different fallback behavior — that the "governance_source" tier signal is not uniform across tools — the pattern is an abstraction over a shape that doesn't actually exist. Retraction signal: more than half of the sweep's refactors need meaningful adaptations to the base contract. Mitigation: document the variations as first-class, not as the contract failing.

---

## Handoff

This doc ships `tier: 1, status: draft`. It graduates to `status: active` when:

- The canary refactor (telemetry_policy) lands following this contract
- The baseline manifest is populated and the build-time schema check is in place
- At least two tools (telemetry_policy + validate) return `governance_source` in their envelopes
- The `oddkit_baseline_check` probe ships and returns the manifest-compliance report for the standard baseline URL
- Error envelopes for the fail-loud tier include the full `resolution` block (what's missing, what tool needs it, reference content URL, is-default-canon flag)
- The refactor template in the audit doc is updated to require conformance

Until then, this is the proposed contract under which the governance anti-pattern sweep proceeds.
