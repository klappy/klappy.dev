---
uri: klappy://canon/methods/spawned-agent-session-substrate-options
title: "Spawned Agent Session Substrate Options — Multi-Vendor Catalog with Cost Shapes"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "methods", "spawned-agent-sessions", "substrate", "cost-shape", "vendor-portability", "anthropic", "cloudflare", "vodka-architecture"]
epoch: E0008.5
date: 2026-05-09
derives_from: "canon/constraints/audit-gates-are-spawned-agent-sessions.md, canon/principles/vodka-architecture.md, canon/principles/doing-less-enables-more.md, canon/constraints/borrow-evaluation-before-implementation.md"
complements: "canon/methods/governance-validation-via-agents.md"
governs: "Substrate selection for any spawned agent session that satisfies klappy://canon/constraints/audit-gates-are-spawned-agent-sessions. Catalogues current implementations, their billing dimensions, vendor lock surfaces, and the cost-shape implications that drive choice. Numbers are illustrative and dated; treat them as examples of the shape, not commitments."
status: active
---

# Spawned Agent Session Substrate Options — Multi-Vendor Catalog with Cost Shapes

> Every spawned agent session has at least two cost streams that add up: LLM inference (paid to the model provider) and runtime hosting the session. The cost-optimal architecture for teams using Anthropic models is to mix vendors — Anthropic's model and harness (Claude Code CLI) running on Cloudflare's substrate (Sandboxes with outbound-Worker credential injection) — and to authenticate Claude Code against an Anthropic Pro/Max/Team subscription rather than a pay-as-you-go API key whenever the workload fits within plan limits. The subscription absorbs inference under its included usage; the substrate runtime stays cheap on Cloudflare. Anthropic Managed Agents has no subscription path: it bills inference at API rates plus a $0.08/session-hour premium regardless of any subscription the operator holds. Each vendor competes for one layer of the stack; bundling everything from one vendor pays one vendor's premium on every layer. The substrate that hosts the session is implementation, not governance, and may be swapped without amending the constraint. This doc catalogues current substrate options, their billing dimensions, what does not vary by substrate, and the mixing-tools strategy — including subscription-vs-API inference billing — that often makes Anthropic-model audits 70%+ cheaper than Anthropic-bundled audits at meaningful volume. Numbers are dated illustrative; cost-shape framing is the durable contribution.

---

## Summary — Multiple Substrates, Multiple Billing Dimensions, Vendor-Mixed Architectures Win

`klappy://canon/constraints/audit-gates-are-spawned-agent-sessions` names the abstract requirement: a fresh, isolated LLM-with-tools run dispatched per audit cycle, fetching canon at runtime and emitting structured findings. It does not name the substrate. This method doc catalogues current substrate options.

Four observations shape every substrate decision:

**Inference dominates total cost at API rates.** When billing is pay-as-you-go via API key, the model token bill is paid to the model provider regardless of where the session runs and is roughly 80–95% of total per-session cost for a typical audit. Substrate switches change runtime overhead, not inference cost. Subscription billing inverts this picture entirely: under a Pro/Max/Team/Enterprise subscription via Claude Code, inference is a sunk subscription cost and substrate runtime becomes the dominant per-audit variable.

**Each substrate has multiple billing dimensions, and they compound.** Anthropic Managed Agents: standard token rates plus $0.08/session-hour. Cloudflare Sandboxes: $5/month Workers Paid prerequisite plus per-vCPU-second active-CPU plus per-GB-second memory plus per-GB-second disk plus per-GB egress plus Workers request fees. Self-hosted: hardware amortization plus operations cost. The headline number on any one axis does not represent total cost; substrate comparison requires summing axes for a representative workload.

**Mixing tools across vendors is the cost-optimal path.** Each vendor competes for a different layer of the stack: Anthropic owns the Claude model and the Claude Code harness; Cloudflare owns the Sandbox substrate and the outbound-Worker credential plane. Bundling everything from one vendor (Anthropic Managed Agents = Anthropic model + Anthropic harness + Anthropic substrate) means paying one vendor's premium on every layer. Mixing — Anthropic model + Anthropic Claude Code harness + Cloudflare Sandbox substrate — pays each vendor only for what they uniquely provide. **And critically, Claude Code authenticated against an Anthropic Pro or Max subscription consumes inference under the subscription's included usage rather than at pay-as-you-go API rates** — so the inference cost stream collapses entirely for teams already paying for Max, while the substrate-runtime cost stream stays cheap on Cloudflare. Anthropic Managed Agents has no such option; it bills inference at API rates regardless of whether you hold a Max subscription.

**Vendor portability lives at the harness, not the substrate.** Cloudflare Sandboxes can host Claude Code (Anthropic-tied), OpenCode (multi-vendor), Aider, or a custom loop. Anthropic Managed Agents is locked to Anthropic models. Substrate choice constrains harness choice; harness choice constrains model choice. A repo that wants reversibility on model provider needs both a substrate that admits multiple harnesses and a harness that admits multiple model providers.

---

## The Cost Composition of a Spawned Agent Session

Every session pays at least three streams:

1. **Inference** — paid to the model provider (Anthropic for Claude, OpenAI for GPT, Google for Gemini, etc.) for the model's reasoning work. Varies by model, by prompt-cache hit rate, by context length, by output length. The billing path varies by harness and substrate: pay-as-you-go API rates from Anthropic Managed Agents, from a self-hosted loop, or from Claude Code authenticated via API key; or absorbed under a Pro/Max/Team/Enterprise subscription's included usage when Claude Code is authenticated against the subscription instead of an API key. The subscription path is harness-and-substrate-conditional — Managed Agents has no subscription option; Claude Code on a CF Sandbox does. See §Mixing Tools Across Vendors for the cost arbitrage this enables.

2. **Runtime** — paid to the substrate provider for hosting the session. Anthropic Managed Agents bills this as a per-session-hour rate; Cloudflare bills it as a sum of CPU-time, memory-time, disk-time, and egress; self-hosted bills it as hardware depreciation plus electricity plus operations attention.

3. **Tool calls** — paid per external service the session uses. Web search has its own per-call rate (Anthropic's web search tool: $10 per 1,000 calls at the time of writing). MCP servers like oddkit are typically free at the call layer but add their own latency and may carry their own cost (oddkit telemetry runs on Cloudflare Analytics Engine, which is cheap but not zero). GitHub API calls are free up to rate limits, paid above.

A "cheaper substrate" that doubles inference cost (because it forces a different model, or breaks prompt caching, or requires longer context) is not cheaper. A cheaper substrate that halves runtime overhead but inference is 90% of total saves 5%. The arithmetic matters more than the headline rate.

---

## Anthropic Managed Agents

**Billing dimensions** (current as of May 2026, public beta):

- **Tokens** at standard Claude API rates. Sonnet 4.6: $3.00/MTok input, ~$15/MTok output, $0.30/MTok input on cache reads (90% off). Opus 4.6: $5/MTok input, $25/MTok output. Cache writes: 25% premium over standard input.
- **Session-hour** at $0.08, billed to the millisecond, only while session status is `running` (idle waiting time is free).
- **Web search** at $10 per 1,000 calls when the session uses Anthropic's web search tool.
- **No prerequisite subscription, no per-agent licensing.** Pay-as-you-go on top of standard API access.

**Worked example — single audit cycle** (5 min running, Sonnet 4.6, ~80K input tokens with 60% cache hit, ~8K output tokens):

- Input: 32K standard ($0.096) + 48K cached ($0.014) = **$0.11**
- Output: 8K * $15/M = **$0.12**
- Session-hour: 5/60 * $0.08 = **$0.0067**
- **Total: ~$0.24 per audit, of which ~$0.007 (3%) is the substrate runtime premium.**

**Locks and constraints:**

- Single-vendor: model is Claude, period. Switching to GPT or Gemini means switching off Managed Agents.
- Beta API surface: requires `managed-agents-2026-04-01` beta header; pricing and shape may change at GA.
- Batch API discounts (50% off) do not apply to Managed Agents sessions; sessions are stateful and interactive.
- Session caps: 60 requests/min on create endpoints, 600/min on read endpoints.

**Strengths:**

- Lowest implementation cost: the agent loop, sandboxing, tool execution, observability, and tracing are all native. No code to write beyond the system prompt and the dispatcher.
- First-party support: built and operated by the model provider, with the tightest integration to Claude's tool-use schema and prompt caching.
- Foundation system prompt and oddkit posture compose with task role per the existing managed-agents skill.

**Weaknesses:**

- Vendor lock at the model layer: the substrate refuses to host non-Claude harnesses.
- Beta status: not yet GA; pricing model and feature set may shift.
- The session-hour premium is small per session but compounds at high audit frequency.

---

## Cloudflare Sandboxes (with Claude Code, OpenCode, or Custom Harness)

**Billing dimensions** (current as of May 2026, GA April 2026):

- **Workers Paid plan**: $5/month prerequisite for any Sandbox or Container usage. Includes monthly allowances on most other axes.
- **CPU time**: $0.00002 per vCPU-second, billed only on active CPU usage (the November 2025 pricing change moved from provisioned to active). 20% utilization on a 1-vCPU instance for 1 hour costs $0.0144, not $0.072.
- **Memory time**: ~$2.50 per 1M GB-seconds, billed on provisioned memory regardless of utilization.
- **Disk time**: $0.07 per 1M GB-seconds, included 200 GB-hours/month on Workers Paid.
- **Egress**: $0.025/GB North America/Europe (1 TB included), $0.05/GB Australia/NZ/Taiwan/Korea (500 GB included), $0.04/GB elsewhere (500 GB included).
- **Workers requests**: $0.30 per 1M requests above the included tier.
- **Durable Objects** (if used for session state): separate request and storage rates.
- **Inference**: paid separately to whichever model provider the harness inside calls. Same rates as direct API access.

**Worked example — single audit cycle** (5 min wall-clock, standard-2 instance with 1 vCPU + 4GB memory at ~50% CPU utilization, Claude Code harness running Sonnet 4.6, same token shape as above):

- CPU: 300s * 1 vCPU * 0.5 utilization * $0.00002 = **$0.003**
- Memory: 300s * 4 GB * $2.50/M GB-s = **$0.003**
- Disk: negligible (well under included)
- Egress: negligible (audit traffic is small)
- Workers requests: negligible per cycle
- Inference (paid to Anthropic, same as Managed Agents example): **$0.23**
- **Total: ~$0.24 per audit, of which ~$0.006 (2.5%) is the substrate runtime premium.**

Plus the $5/month Workers Paid base fee, which amortizes to a meaningful per-session adder only at very low audit volumes (at 100 audits/month it adds $0.05/audit; at 1000 audits/month it adds $0.005/audit).

**Locks and constraints:**

- Multi-vendor at the model layer: the substrate is harness-agnostic. Run Claude Code (Anthropic), OpenCode (multi-vendor), Aider (multi-vendor), or a custom loop. Swap harnesses without swapping substrate.
- Vendor lock at the substrate layer: the Sandbox primitive is Cloudflare-specific. Equivalent primitives elsewhere (E2B, Daytona, Northflank, Modal) have different billing shapes and integration surfaces.
- Outbound Workers pattern enables zero-trust credential injection: the harness inside the sandbox never holds API keys; outbound Workers inject them at the egress boundary. This is a stronger security posture than env-var-based credentials.
- Beta features (Durable Object Facets, etc.) are subject to change; the core Sandboxes API is GA.

**Strengths:**

- Multi-vendor portability at the harness/model layer.
- Zero-trust credential injection via outbound Workers — the agent never sees secrets.
- Per-vCPU-second active billing means idle-tolerant workloads cost less than provisioned-resource billing.
- TLS interception via ephemeral CA per sandbox enables full request observability without exposing keys.

**Weaknesses:**

- More billing dimensions to track and forecast. The $5/month base fee is a sunk cost that needs amortization across enough audit volume to disappear.
- Implementation effort: choosing and wiring a harness (Claude Code, OpenCode, etc.) inside the sandbox is a project-level integration task that Managed Agents handles natively.
- Cloudflare-platform lock at the substrate layer (cf. multi-vendor at the harness layer above).

---

## Self-Hosted (DIY Sandbox + Custom Loop)

**Billing dimensions** (illustrative, varies by deployment):

- **Hardware** (CPU, memory, disk) — amortization on owned hardware or per-instance fees on cloud (EC2, GCE, etc.).
- **Operations** — engineering attention to keep the loop running, handle errors, manage credentials. Per-engineer-day at full burdened rate. The Anthropic Managed Agents launch piece quoted ~0.4 of an engineer's time to maintain a self-hosted agent loop; that's the cost the managed substrate offloads.
- **Inference**: paid to whichever model provider the loop calls.
- **Tool execution**: each tool the loop implements (bash sandbox, web fetch, MCP client) is custom code with its own maintenance cost.

**Worked example — not given, because the operations cost dominates and is project-specific.** A self-hosted loop that handles 100 audits/day at high reliability typically costs more in engineer-days than either Managed Agents or Sandboxes for the same workload. Self-hosted is the right answer when the project has unusual requirements (regulatory isolation, on-prem only, custom tool surface, sovereign cloud) that the managed substrates do not satisfy.

**Locks and constraints:**

- No vendor lock at any layer. Full control of substrate, harness, and model.
- Full responsibility for security boundaries, credential management, sandboxing, retries, observability — every property the managed substrates bundle.

**Strengths:**

- Maximum portability and control.
- Required for regulated environments where managed substrates aren't certified.

**Weaknesses:**

- Operations cost dominates. Pricing the loop accurately requires pricing the engineering attention.
- Each new requirement (a new tool, a new safety control, a new retry policy) is project code, not vendor code.

---

## Things That Do Not Vary by Substrate

Substrate choice does not change:

- **Inference cost at API rates.** Sonnet 4.6 tokens cost the same per-token whether called from Managed Agents, from Claude Code inside a Sandbox, from OpenCode inside a Sandbox, or from a self-hosted loop, when billing is pay-as-you-go via API key. The bill goes to Anthropic either way at standard rates. (The exception is the subscription-billing path covered in §Mixing Tools Across Vendors: Claude Code authenticated against a Pro/Max/Team/Enterprise subscription consumes included usage rather than billing per-token, which is a substrate-conditional capability — Managed Agents has no equivalent path.)
- **Model choice within the harness.** A harness that supports multiple model providers (OpenCode does; Claude Code does not currently) lets the operator swap models without swapping substrate. A harness that supports one model provider locks the model regardless of substrate.
- **The audit task itself.** Canon defines what to check. Substrate defines where the check runs. The check shape is the same.
- **Constraint conformance.** Any of these substrates can satisfy `klappy://canon/constraints/audit-gates-are-spawned-agent-sessions` if it spawns clean per cycle, runs an agentic loop, fetches canon at runtime, and emits structured findings. None of them automatically conforms; conformance is verified per implementation.

---

## Mixing Tools Across Vendors — Anthropic Models on Cloudflare Substrate

The substrate decision is rarely "Anthropic vs Cloudflare." For most teams using Anthropic models, the cost-optimal architecture is *both*: Anthropic's model (Sonnet 4.6, Opus 4.6, Haiku 4.5), Anthropic's harness (Claude Code CLI), running on Cloudflare's substrate (Sandboxes with outbound-Worker credential injection).

This works because each vendor is competitive on a different layer of the stack:

- **Model** — Anthropic owns the Claude models. Sonnet 4.6 inference costs $3/MTok input, $15/MTok output at API rates, regardless of where the call originates. There is no cheaper Claude.
- **Harness** — Claude Code is built and maintained by Anthropic with deep prompt-cache optimization. Running it inside a Cloudflare Sandbox preserves its caching wins because it is the same client code making the same API calls.
- **Substrate** — Cloudflare's per-vCPU-second active-CPU billing on Sandboxes is leaner than Anthropic Managed Agents' $0.08/session-hour bundled premium when sessions are CPU-light (most audit workloads are). The $5/month Workers Paid base amortizes across enough audit volume to disappear.

### The Subscription Inclusion Lever

Claude Code can authenticate against either the Anthropic API (pay-per-token) or against an Anthropic Pro/Max/Team/Enterprise subscription (included usage up to plan limits). Anthropic's help center is explicit: if `ANTHROPIC_API_KEY` is set in the environment, Claude Code uses the API key and bills at API rates; if it is unset and the user is logged in to a subscription, Claude Code uses the subscription's included usage instead.

This is the largest cost lever in the catalog and one that Anthropic Managed Agents does not have. Managed Agents bills every inference call at API rates regardless of any subscription the operator holds. Claude Code on a Cloudflare Sandbox, authenticated against a Max plan, consumes its inference under the Max subscription's included usage — which can be up to $600–$1,500 worth of API-equivalent tokens per month on Max 20x ($200/mo) for a Max user who fills the plan.

The subscription tiers (current as of May 2026):

- **Pro**: $20/month. Modest included usage, suitable for low-volume audit workloads. Hard cap with no overflow option except enabling extra usage.
- **Max 5x**: $100/month. 5× Pro's included usage. Suitable for moderate-volume audits or a small team's combined Claude + Claude Code usage.
- **Max 20x**: $200/month. 20× Pro's included usage. The standard answer for teams running automated audit workloads at meaningful frequency. Includes the option to overflow to API rates once limits are hit, so the workload does not block.
- **Team / Enterprise**: seat-based, with included usage shared across seats. Typically the right answer for teams where multiple humans plus automated workloads share the inference budget.

### The Cost Arbitrage Made Concrete

A 5-minute Sonnet 4.6 audit with the same token shape as the worked examples above (~80K input with 60% cache hit, ~8K output):

- *Anthropic Managed Agents (bundled, API-billed)*: $0.23 inference (paid to Anthropic at API rates) + $0.0067 session-hour premium = **$0.237 per audit**. No subscription absorption available.
- *Cloudflare Sandbox + Claude Code (mixed, API-billed)*: $0.23 inference (paid to Anthropic, identical) + ~$0.006 CF runtime = **$0.236 per audit**, plus $5/month Workers Paid base.
- *Cloudflare Sandbox + Claude Code (mixed, Max-subscription-billed)*: ~$0.006 CF runtime per audit + amortized portion of Max subscription. **At 100 audits/day (3000/month) on Max 20x: $200 sub + $5 CF base + $18 CF runtime = $223/month total**, versus Managed Agents' ~$711/month for the same workload (3000 × $0.237). Roughly 70% reduction.

The savings come from the inference axis collapsing under the subscription, not from substrate runtime. Substrate runtime on either side is a rounding error compared to inference. The mixing-tools win is "use the substrate that lets you authenticate against your subscription."

### Caveats — What This Costs

The Max-subscription path is not free of operational concerns:

- **Rate limits are real.** Pro and Max use rolling 5-hour windows with weekly active-compute caps. Heavy automated workloads can exhaust the window mid-audit and block until reset. Max 20x has the option to overflow to API rates ("Enable extra usage"), which preserves availability at the cost of pay-per-token billing for the overflow portion. Pro and Max 5x block hard until reset. Plan capacity must match audit cadence; if it doesn't, the cost story degrades back toward API rates for the overflow.
- **Authentication on a CI runner is operationally non-trivial.** Claude Code on a developer's laptop authenticates via OAuth login against the subscription. On a CI runner or in a CF Sandbox, the auth needs to persist somehow — typically a long-lived session token stored as a CI secret. This works but requires careful credential management; a leaked Max-plan auth token is more sensitive than a scoped API key because it has the full subscription's usage and may have access to other Claude products.
- **Subscription terms may not cover automated workloads.** Anthropic's subscription tiers are positioned for individual and team use; running them as the inference path for an automated CI audit gate may be a gray area depending on volume and concurrency. The terms of service should be reviewed before standardizing on this pattern at scale. If automated use is restricted, the alternative is the API-billed mixed architecture (still cheaper than Managed Agents on substrate, but inference goes back to API rates).
- **Subscription limits are intentionally undocumented.** Anthropic does not publish exact token or message counts per tier; limits vary by message length, file attachments, conversation history, model selection, and feature usage. Forecasting precise capacity per audit is harder on subscription billing than on API billing. Build in headroom.

### What Managed Agents Bundles That Mixing Doesn't

Anthropic Managed Agents is not just substrate runtime; it bundles loop reliability, error recovery, observability, tracing, and the agentic execution model. Running Claude Code in a CF Sandbox makes those properties the operator's responsibility — the harness handles its own loop, but session-level guarantees (retry on network blip, graceful resume from checkpoint, structured event stream for debugging) are operationally on the team. For high-frequency automated workloads where an audit failing silently is worse than the cost saved, the Managed Agents premium is the price of operational simplicity.

### The General Principle

Buying the model from Anthropic, the harness from Anthropic, and the substrate from Anthropic — and the inference at pay-as-you-go API rates — means paying one vendor's premium on every layer with no subscription leverage. Mixing means paying each vendor only for the layer they uniquely provide, and using whichever billing arrangement (subscription or API) is cheaper per layer.

This is the same architectural pattern as picking AWS for compute, Cloudflare for CDN, and a third-party service for video — vendor-by-layer, not vendor-by-bundle. It applies to AI agent infrastructure for the same reason: the layers are decomposable, and each vendor competes for one layer with its own pricing and bundling logic.

The mixing strategy is not unique to Anthropic-and-Cloudflare. The same pattern applies to other model providers running on Cloudflare or on alternative sandbox primitives (E2B, Daytona, Modal, Northflank). The constraint is harness compatibility: the harness must support the model provider, and the substrate must support the harness.

---

## When To Pick Which

The decision tree, in priority order:

1. **Cost-conscious adopter wanting Anthropic models, with a Pro/Max/Team/Enterprise subscription already paid for or justifiable** — **Cloudflare Sandboxes with Claude Code CLI authenticated against the subscription.** This is the largest cost lever in the catalog. Inference consumes the subscription's included usage instead of API rates; substrate runtime is CF's cheap per-vCPU-second active-CPU billing. At meaningful audit volumes on Max 20x, this can drop total cost by ~70% versus Anthropic Managed Agents for the same workload. Caveats in §Mixing Tools Across Vendors: rate limits, CI authentication operational complexity, ToS questions for automated workloads.

2. **Cost-conscious, but no subscription justifiable or automated workloads beyond ToS comfort** — **Cloudflare Sandboxes with Claude Code CLI authenticated via API key.** Inference at API rates (paid to Anthropic, same as Managed Agents would charge), substrate runtime at CF's lean rates instead of $0.08/session-hour. Modest substrate-runtime savings; the inference axis dominates.

3. **Lowest implementation effort, single-vendor acceptable** — Anthropic Managed Agents. Native loop, native tool execution, native observability; nothing to wire. The session-hour premium and the inability to leverage subscription billing are the price of operational simplicity. Right answer when the team's bottleneck is engineer-time, not substrate cost.

4. **Multi-vendor portability is a hard commitment** — Cloudflare Sandboxes with a multi-vendor harness (OpenCode, custom loop). The harness layer absorbs model-provider swaps. Adopt this if the team wants to be able to flip from Claude to GPT to Gemini without changing substrate. Subscription-billing path is harness-dependent — OpenCode against Anthropic still works under the Anthropic subscription if the harness supports OAuth subscription auth.

5. **Existing Cloudflare ecosystem (Workers, R2, KV, D1)** — Cloudflare Sandboxes integrates natively via outbound Workers and bindings. Stronger fit; reinforces (1), (2), or (4).

6. **Security posture matters and credentials are sensitive** — Cloudflare Sandboxes' outbound Worker pattern (credential injection at egress, agent never sees keys) is the strongest of the substrate options. Useful when the audited content might contain prompt-injection attempts or when API keys are tightly scoped. Reinforces (1), (2), or (4).

7. **Regulated / on-prem / sovereign-cloud requirements** — self-hosted is the only option. Cost is what it is; the requirement set determines the answer.

For most cost-conscious teams using Anthropic models, the answer is (1) if a Max subscription is justifiable, otherwise (2). Managed Agents (3) wins when implementation simplicity outweighs substrate cost. Multi-vendor (4) wins when the team explicitly wants to be able to swap model providers. Self-hosted (7) is reserved for when no managed substrate satisfies the requirements.

---

## Notes on Numbers and Aging

The token rates, session-hour rates, CPU-second rates, and subscription tier prices in this doc are current as of May 2026 and are dated to that frame. They will change. The cost-shape framing — "inference dominates at API rates," "subscription billing inverts the per-call dominance," "multiple billing dimensions add up," "mixing tools across vendors is the cost-optimal path," "vendor portability lives at the harness," "subscription auth is a substrate-conditional lever" — is the durable contribution and should outlast specific numbers.

When a substrate's rate card changes meaningfully, this doc gets a §Implementation Examples-style entry update, not a rename. If a substrate is deprecated (Anthropic deprecates Managed Agents, Cloudflare deprecates Sandboxes), its section is marked as such with a date and the catalog continues serving the surviving options.

If a fourth substrate enters the market and meets the spawn-clean / agentic / canon-at-runtime / structured-findings test, it gets a new section. The doc structure is additive.

---

## Relationship to Other Canon

- `klappy://canon/constraints/audit-gates-are-spawned-agent-sessions` — the constraint this method serves. The constraint names what the gate must be; this doc catalogues how to host it.
- `klappy://canon/methods/governance-validation-via-agents` — how the agent session is configured (system prompt foundation, oddkit posture, model choice). Substrate-agnostic; this method's choices apply regardless of which substrate hosts the session.
- `klappy://canon/principles/vodka-architecture` — the principle that makes substrate substitution viable. Governance fetched at runtime, not hardcoded in the launcher.
- `klappy://canon/principles/doing-less-enables-more` — the substrate refusing to own the harness layer is the same shape as TCP/IP refusing to own the application layer. Sandboxes wins by being agnostic about what runs inside.
- `klappy://canon/constraints/borrow-evaluation-before-implementation` — the constraint that argues for adopting a managed substrate before building a custom one. Self-hosted is a Build choice; the managed substrates are Borrow choices.

---

## See Also

- Cloudflare blog: "Dynamic, identity-aware, and secure Sandbox auth" (2026-04-13) — outbound Workers as zero-trust credential injection.
- Cloudflare blog: "Agents have their own computers with Sandboxes GA" (2026-04-13) — the GA announcement.
- Anthropic Managed Agents docs at https://docs.claude.com — current beta API surface and pricing.
- `skills/managed-agents/SKILL.md` — the operational skill for using Anthropic Managed Agents specifically.
