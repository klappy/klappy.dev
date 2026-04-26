---
uri: klappy://canon/constraints/telemetry-governance
title: "Telemetry Governance — What oddkit Tracks and Why"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "telemetry", "transparency", "privacy", "vodka-architecture", "maintainability", "analytics-engine"]
epoch: E0008
date: 2026-04-09
derives_from: "canon/principles/vodka-architecture.md, canon/principles/maintainability-one-person-indefinitely.md, canon/values/axioms.md"
complements: "docs/oddkit/tools/telemetry_public.md, docs/oddkit/tools/telemetry_policy.md, writings/half-a-million-requests.md"
governs: "All telemetry collection in oddkit hosted service and TruthKit"
status: active
---

# Telemetry Governance — What oddkit Tracks and Why

> oddkit is maintained by one person making decisions about where to invest their most limited resource — their own attention. Telemetry exists to make those decisions informed instead of blind. Not to profile users, not to feed a roadmap, not to build a growth chart. The system tracks the shape of usage, never the substance. The data is public. If you wouldn't show them the dashboard, you shouldn't be collecting the data.

---

## Summary — Mandatory Truth at Baseline, Optional Richness by Incentive

oddkit's hosted service at oddkit.klappy.dev collects transparent usage telemetry because the maintainer is making decisions in the dark. Cloudflare hosts the infrastructure essentially for free — cost is not the problem. The problem is that one person is deciding where to invest their time across ten epistemic tools, 400+ canon documents, and a growing user base they cannot see. Without telemetry, every prioritization decision is a guess: Is oddkit a protocol that's catching on, or a personal tool hosted publicly? Are people building their own knowledge bases, or is it just the maintainer talking to themselves in public? Which tools actually matter — is `gate` changing how people work, or is everyone just using `search`? If people depend on this infrastructure and the maintainer doesn't know it, they might break something that matters. If nobody depends on it, they can move fast. The answer changes everything, and today the answer is invisible.

The design follows three rules derived from a decade of open-community work in Bible translation technology:

1. **Track structural identifiers, never content.** The server counts which tools were called, which repos were served, which document paths were accessed, when, and how often. It never records what was searched for, what documents contained, or what the model responded.

2. **The data is public, not private.** Any user can call `telemetry_public` and see the same dashboard the maintainer sees. Same leaderboard. Same numbers. Same trends. There is no information asymmetry between host and user.

3. **Participation is rewarded, not extracted.** Users who identify themselves — via OAuth, header, or any other mechanism — appear on the transparency leaderboard. Identification is encouraged and scored, never coerced. The ask is proportional: every free API requires at least an API key. oddkit asks for less.

This governance document is the authoritative reference for what is tracked, what is excluded, and why. It is fetched at runtime by `telemetry_policy` — not hardcoded in server logic. If the policy changes, this document changes. The server stays the same.

---

## What Is Tracked (Automatic, Every Request)

All tracking occurs on `/mcp` POST envelopes. One data point is written per JSON-RPC message via Cloudflare Workers Analytics Engine.

### Structural Dimensions (Blobs)

| Dimension | What It Records | Example |
|-----------|----------------|---------|
| Event type | `mcp_request` or `tool_call` | `tool_call` |
| JSON-RPC method | The protocol method | `tools/call` |
| Tool name | Which epistemic action | `orient`, `search`, `gate` |
| Consumer label | Best-effort caller identity | `Claude-User`, `unknown` |
| Consumer source | How the label was resolved | `oauth`, `x-oddkit-client`, `user-agent` |
| Canon URL | Which repo is being served | `https://github.com/klappy/klappy.dev` |
| Document URI | For `get` calls, the path requested | `klappy://canon/principles/vodka-architecture` |
| Worker version | oddkit version string | `0.17.0` |

> Slot 9 (formerly `cache_tier`) is retired. The single-tier interpreter that picked one storage tier as the "winner" of a multi-fetch request was the source of repeated bugs across PRs #137–#139; it has been replaced by per-fetch records in the trace and aggregate counts in `cache_hits` / `cache_lookups` (doubles 7 and 8). The slot stays unused — no reuse — per the "no deprecation, nobody uses them yet" rule established in PR #137.

### Numeric Values (Doubles)

| # | Value | What It Records |
|---|-------|----------------|
| 1 | Count | Always `1`, for SUM aggregation |
| 2 | `duration_ms` | Full request wall-clock at the worker edge — includes V8 cold-start, KB fetch, MCP SDK overhead, and handler compute |
| 3 | `bytes_in` | UTF-8 byte length of the JSON-RPC request body. Tokenizer-agnostic; exact wire size. `0` when the body could not be read |
| 4 | `bytes_out` | UTF-8 byte length of the response body. `0` for streamed (SSE) responses where the body cannot be measured without consuming the stream |
| 5 | `tokens_in` | `cl100k_base` token count of the request body. See *Tokenizer Choice* below for rationale. `0` when tokenization was skipped or failed |
| 6 | `tokens_out` | `cl100k_base` token count of the response body. `0` for streamed responses or tokenizer failure |
| 7 | `cache_hits` | Count of per-fetch records in the request whose `cached` flag was true. Sourced from `tracer.cacheStats.hits` |
| 8 | `cache_lookups` | Total per-fetch records in the request — the denominator for hit-rate. Sourced from `tracer.cacheStats.total` |

#### Why no `tokenize_ms`

A previous iteration shipped a `double7: tokenize_ms` field intended to capture the wall-clock cost of tokenization for bench-vs-prod comparison. It was removed after live-smoke verification confirmed it always reads `0` in production. The cause is a Cloudflare Workers runtime constraint, not a bug: both `performance.now()` and `Date.now()` are frozen between network I/O events as a timing-side-channel mitigation. Tokenization is pure CPU work, so any sub-request timing of it is unmeasurable from inside a Worker request handler. The bench at `workers/test/tokenize.test.mjs` characterized the cost curve once (cl100k handles 50 KB in ~1.3 ms on Node v22, which is the same V8 the Workers runtime uses); future per-call cost can be predicted from `bytes_out` and `tokens_out` against that curve.

#### Tokenizer Choice

Token counts use `gpt-tokenizer/encoding/cl100k_base` (GPT-4's tokenizer) as a tokenizer-agnostic proxy for "payload token shape." This is **not** a billing-accurate measure for any specific consumer model — counts diverge from Claude's tokenizer by approximately 3–4% on English prose. For the question telemetry is trying to answer ("how big are typical payloads, and which tools produce the most output?"), that noise floor is acceptable.

The choice was driven by an empirical bench rather than tokenizer-correctness arguments. On Node v22 (same V8 engine as Workers), `cl100k_base` was roughly six times faster than `@anthropic-ai/tokenizer` (WASM) on representative payload sizes (200 B – 50 KB), with a dramatically more predictable p95 — no WASM memory-grow spikes. Bundle delta measured via esbuild: **432 KB gzipped**, comfortably within paid-tier Workers limits.

The methodology behind this choice is documented separately in `klappy://canon/constraints/measure-before-you-object` — three theoretical objections (bundle bloat, vodka-architecture violation, tokenizer-choice as domain opinion) were falsified by a five-minute bench. See also `klappy://canon/observations/performed-prudence-anti-pattern` for the failure mode that prompted the constraint.

### Automatic Properties

| Property | Source |
|----------|--------|
| Timestamp | Cloudflare Analytics Engine (automatic per data point) |
| Sampling key | Consumer label (for Analytics Engine sampling consistency) |

### What This Enables

- **Consumer leaderboard** — how many unique callers, who are they
- **Tool leaderboard** — which epistemic actions are actually used
- **Canon URL leaderboard** — which repos are being served (the adoption signal)
- **Document leaderboard** — which canon documents are most accessed
- **Daily/hourly trends** — when usage happens, what caused spikes
- **Method breakdown** — protocol-level health
- **Cache effectiveness** — hit rate as `SUM(cache_hits) / SUM(cache_lookups)` over any time window or grouping; cold-start frequency as `WHERE cache_hits = 0`. Per-tier latency and per-tier breakdown are visible in each response's `debug.trace.fetches[]` for ad-hoc investigation, but are not aggregated into Analytics Engine — the dashboard does the math, the tracer reports the facts
- **Payload shape** — average and percentile bytes/tokens per tool, response-size distribution, token-cost-per-tool ranking. Lets the maintainer see which tools produce verbose responses and where trimming would actually move the needle (`GROUP BY tool_name, AVG(double6) AS avg_tokens_out`)

### Per-Request Diagnostics (Ephemeral, Not Stored)

The `X-Oddkit-Trace` response header and the `debug.trace` field in tool responses contain per-request span detail: every storage read and GitHub API call as a per-fetch record (`url`, `duration_ms`, `cached`, optional `status`/`size`), plus action and SHA spans. The trace also exposes `cacheStats` (`hits`, `misses`, `total`) — the same arithmetic that feeds the `cache_hits` / `cache_lookups` doubles. This is ephemeral diagnostic data — it exists in the HTTP response and nowhere else. It is not written to Analytics Engine, not persisted, and not queryable after the request completes. The retired `tracer.indexSource` getter and `index_source` field on `toJSON()` no longer exist; consumers that read either should switch to `cacheStats` for arithmetic or `fetches[]` for per-tier detail.

---

## What Is Excluded (Safety Boundary)

The following are never collected under any circumstance:

- **Raw search queries** — what users searched for
- **Document content** — what was returned from `get` or `search`
- **Model responses** — what the LLM said
- **Raw prompts** — what the user or system prompt contained
- **User identity fields** — name, email, account IDs (beyond self-declared consumer label)
- **IP addresses** — never logged for telemetry purposes
- **Browser or device fingerprinting** — never collected

The principle: if it reveals what someone was *thinking* rather than what they were *doing*, it is excluded.

---

## Consumer Identification Model

### Phase 1 — Track What (No Auth Required)

Consumer labels are resolved from whatever the request provides, in priority order:

1. `?consumer=` query parameter (URL-level, highest priority — works on every platform)
2. `x-oddkit-client` header (explicit)
3. MCP `initialize` → `clientInfo.name` (protocol-native)
4. `User-Agent` header (fallback)
5. `"unknown"` (default)

No authentication is required. The hosted service is open. The query parameter is the recommended identification method because every MCP client lets users edit the URL, while not all platforms expose custom headers. Unidentified consumers see a one-line footer on tool responses linking to this policy and explaining how to identify themselves.

### Phase 2 — Track Who (OAuth for TruthKit)

TruthKit's hosted service requires GitHub OAuth via Cloudflare. Consumer label comes from the authenticated GitHub username. OAuth-identified consumers are automatically verified.

oddkit's hosted service remains open with optional identification. Headers and conversational identification remain available.

### Verified Clients

A server-side allowlist (env var `TELEMETRY_VERIFIED_CLIENTS`) designates verified consumer labels. Verified clients receive weighted leaderboard scoring. Verification increases visibility but never blocks participation.

---

## Transparency Leaderboard

Modeled after the proven pattern in Aquifer MCP:

### Self-Report Fields (Optional, Incentivized)

| Field | Header | Source | Description |
|-------|--------|--------|-------------|
| Client name | `x-oddkit-client` | Header or clientInfo | Your client name (highest priority identifier). Examples: `claude-desktop`, `truthkit-cli`, `your-company-agent`. |
| Client version | `x-oddkit-client-version` | Header or clientInfo | Version string for the client above. Semver recommended but any stable identifier works. |
| Agent name | `x-oddkit-agent-name` | Header | The AI agent or model name when distinct from the client. Example: `claude-opus-4-7`. |
| Agent version | `x-oddkit-agent-version` | Header | Version string for the agent/model above. |
| Surface | `x-oddkit-surface` | Header | Where this is running. Examples: `claude.ai`, `vscode`, `cli`, `ci`, `production`. |
| Contact URL | `x-oddkit-contact-url` | Header | URL for your project or organization. Appears on the transparency leaderboard. |
| Policy URL | `x-oddkit-policy-url` | Header | Your privacy or telemetry policy URL. Signals reciprocal transparency. |
| Capabilities | `x-oddkit-capabilities` | Header | Comma-separated capability list describing what your client can do. Example: `read,write,vision`. |

### Completeness Scoring

Each `tools/call` scores the number of self-report fields present (0–8). Completeness percentage drives badge assignment:

| Badge | Threshold |
|-------|-----------|
| Open Ledger | ≥ 90% |
| Clear Reporter | ≥ 70% |
| Starter Reporter | ≥ 40% |
| Hint Reporter | > 0% |
| Silent Reporter | 0% |

### Leaderboard Integrity

Consumer labels are transparent self-declarations. They are not identity proof unless verified by the server-side allowlist or OAuth. Treat labels as honest claims, not authentication.

---

## Storage and Infrastructure

### Cloudflare Workers Analytics Engine

Telemetry data points are written via `env.ODDKIT_TELEMETRY.writeDataPoint()`. Writes are non-blocking and add zero latency to request handling.

- **Retention:** 3 months (Cloudflare default)
- **Querying:** SQL API via `CF_ACCOUNT_ID` and `CF_API_TOKEN`
- **Visualization:** Grafana-compatible
- **Pricing:** 100,000 data points/day free; 10,000 queries/day free

### Long-Term Retention

Analytics Engine data expires after 3 months. Monthly aggregate snapshots should be persisted to a durable store (KV, R2, or canon article) before expiration if long-term trend analysis is needed.

---

## Vodka Architecture Compliance

This telemetry implementation is infrastructure serving the Maintainability principle. It passes the three-question constraint test:

1. **Has the server grown thick?** No. One `writeDataPoint()` call per message. Two new tools (`telemetry_public`, `telemetry_policy`). The telemetry module is self-contained.

2. **Has the server acquired domain opinions?** No. The telemetry tracks tool names, repo URLs, and document paths — structural identifiers that are identical regardless of what knowledge base is being served. The server does not know whether the document at `canon/principles/vodka-architecture` is about software design or cooking recipes.

3. **Can the server be removed without consequence?** No. Without telemetry, the maintainer has no signal on adoption, no evidence to sustain hosting, and no way to answer whether oddkit serves anyone beyond themselves. The telemetry is load-bearing for infrastructure sustainability.

---

## Query Security Boundary

`telemetry_public` accepts raw SQL and passes it to Cloudflare Analytics Engine. The data is public by design — there is nothing to steal. But the query interface requires infrastructure guards to prevent abuse without adding domain opinions.

### Threat Model

The data is public. The API token is read-only. The risk is not data exfiltration — it's resource exhaustion and information leak about other account resources.

### Guards (Infrastructure, Not Domain Opinion)

**1. Dataset allowlist.** The server validates that the SQL query targets only the `oddkit_telemetry` dataset. Any query referencing a different dataset is rejected before reaching the Analytics Engine API. This prevents cross-dataset access to other Analytics Engine data on the same Cloudflare account.

**2. Rate limiting.** `telemetry_public` calls are rate-limited per consumer label. The limit protects the Analytics Engine query quota (10,000 queries/day free tier). Rate limiting is infrastructure — it protects the resource, not the data.

**3. Error sanitization.** Analytics Engine API errors are caught and returned as generic failure messages. Raw error responses — which may contain account IDs, dataset names, or internal schema details — are never forwarded to the caller.

### What Is NOT Guarded (By Design)

- **Column restriction** — any column can be queried. The data is public.
- **Query complexity** — no LIMIT enforcement. Analytics Engine has built-in timeouts.
- **Authentication** — no auth required to query. Transparency means anyone can see the data.
- **SQL keyword blocking** — unnecessary. The API token is read-only. DROP, ALTER, INSERT are rejected by Analytics Engine regardless.

### Vodka Compliance

These three guards are infrastructure serving security, not domain opinions about what questions are interesting. They are the same category as CORS headers, `keep_vars`, and the `catch` block in telemetry recording. The server does not decide what to ask — it decides what is safe to forward.

---

## The Social Contract

oddkit is free. The code is MIT. Anyone can self-host. Cloudflare hosts the service at oddkit.klappy.dev for essentially zero cost — infrastructure is not the bottleneck. Attention is.

One person maintains this. One person decides which tools to improve, which bugs to fix, which features to build next. Without signal, those decisions are guesses. With signal, they're informed. That's the difference telemetry makes — not paying for servers, but knowing where to spend the only resource that's actually scarce.

The ask: help the maintainer know you exist. A GitHub username, an alias, a header value — any unique identifier. Not so the maintainer can track you. So the maintainer can make better decisions about the infrastructure you use.

The deeper ask: if oddkit is catching on as a protocol — if people are building their own knowledge bases, their own governance systems, their own epistemic discipline on top of it — the maintainer needs to know. That changes what oddkit is. That changes whether TruthKit is viable as a product. That changes every conversation with collaborators and partners. Right now, 514,000 monthly requests could be one person or fifty. The answer matters.

This is not the standard telemetry social contract. The standard contract is: a funded company collects your data privately and promises it's anonymous. This contract is: one person publishes the data publicly and asks you to be visible. The relationship is different because the power dynamic is different.

---

## Operating Principle

**Mandatory truth at baseline, optional richness by incentive.**

- Baseline usage is always tracked. This is non-negotiable for infrastructure sustainability.
- Optional details are encouraged, scored, and made visible via the transparency leaderboard.
- Verification increases score weight but never blocks participation.
- The data is always public. The dashboard is always shared.
- If the policy changes, this document changes. The server never hardcodes governance.

---

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — The design pattern telemetry must not violate
- [Maintainability — One Person, Indefinitely](klappy://canon/principles/maintainability-one-person-indefinitely) — The principle telemetry serves
- [KISS — Simplicity Is the Ceiling](klappy://canon/principles/kiss-simplicity-is-the-ceiling) — Why two tools, not twenty
- [Axiom 4: You Cannot Verify What You Did Not Observe](klappy://canon/values/axioms) — The axiom telemetry corrects
- [Measure Before You Object](klappy://canon/constraints/measure-before-you-object) — The methodology that drove the tokenizer choice
- [Performed Prudence Anti-Pattern](klappy://canon/observations/performed-prudence-anti-pattern) — The failure mode that almost killed token tracking before it shipped
- [Aquifer MCP Telemetry Governance](https://github.com/klappy/aquifer-mcp/blob/main/docs/telemetry-governance-snapshot.md) — The proven pattern this derives from
