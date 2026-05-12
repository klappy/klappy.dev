---
uri: klappy://canon/methods/trigger-source-taxonomy
title: "Dispatch Routing for Spawned Agent Sessions — Trigger Sources and Their Mapping to the Five Dimensions"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["canon", "methods", "spawned-agent-sessions", "trigger-source", "dispatch-routing", "autonomous-trigger", "agent-runtime", "vodka-architecture", "substrate-agnostic", "ese", "r2-events", "ams-frames"]
epoch: E0008.5
date: 2026-05-11
derives_from: "canon/methods/spawned-agent-session-runtime-contract.md, canon/methods/persona-shaped-agent-runtime.md, canon/methods/spawned-agent-session-substrate-options.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/epistemic-surface-extraction.md, canon/principles/symmetric-participation.md, canon/principles/vodka-architecture.md"
complements: "canon/methods/spawned-agent-session-runtime-contract.md, canon/methods/persona-shaped-agent-runtime.md"
governs: "How an input edge (webhook, AMS frame, alarm, email, RPC, queue message, object-store event, platform webhook, push notification) resolves to a spawned-agent-session invocation. Substrate-neutral. Companion to runtime-contract (which specifies the per-session contract) and persona-shaped-agent-runtime (which specifies the runtime layer above the substrate). This doc specifies the layer above the runtime — the dispatch-routing layer that decides which session tuple to invoke when an event arrives."
status: proposed
---

# Dispatch Routing for Spawned Agent Sessions — Trigger Sources and Their Mapping to the Five Dimensions

> A spawned agent session is fully characterized by the five orthogonal dimensions of the runtime contract — persona, mode, role, surface, engagement. Sessions still have to *start* somehow. The trigger source is the input edge that wakes the runtime: a webhook, a frame on an AMS topic, a scheduled alarm, an inbound email, a sub-agent RPC, a queue message, an object-store event, a platform webhook, a push notification. This doc names the trigger-source taxonomy and specifies the **dispatch-routing convention** — the function from trigger payload to a runtime invocation tuple. Trigger sources are not a sixth dimension; they are the layer above invocation that decides which tuple to invoke. The convention names how each trigger type resolves persona, mode, role, surface, and engagement from its payload (statically via config, dynamically via lookup, or by payload-derived inference). The canonical worked example is object-store events: a file lands in a bucket, the trigger wakes a DO-hosted persona, the persona runs Epistemic Surface Extraction (`klappy://canon/epistemic-surface-extraction`) to make the artifact legible, encodes the result, and a thin gate/challenge/search/write pipeline lands it in the knowledge base — drag-and-drop knowledge ingestion with no assistant in the loop.

---

## Summary — Dispatch Routing Is the Input Edge Above Invocation

The runtime contract states that a spawned agent session is fully characterized by five orthogonal dimensions: persona, mode, role, surface, engagement. That characterization holds. Sessions, however, must be *started*. The starting event — the input edge — is not part of the session itself; it is the layer above invocation. This doc names that layer.

**The dispatch-routing convention.** A trigger source produces a payload. The dispatch-routing convention is the function that maps `(trigger_source, payload)` to a `runtime.invoke(persona, mode, role, surface, engagement, task)` call. Three resolution methods are recognized: **static** (the trigger source's configuration declares the tuple in full), **lookup** (the trigger source's configuration declares persona+surface+role, and the payload's content is mapped via a lookup table to mode+engagement), **payload-derived** (one or more dimensions are inferred from the payload itself, typically by a thin classifier or rule set). The convention is deliberately substrate-agnostic. A trigger source on Cloudflare Durable Objects, on a self-hosted queue consumer, or on Anthropic Managed Agents all resolve through the same shape; only the wake mechanism differs.

**The canonical trigger sources.** Nine trigger types cover known autonomous-dispatch use cases as of 2026-05-11: HTTP webhook, WebSocket message, scheduled alarm, inbound email, sub-agent typed RPC, queue consumer message, object-store event (R2/S3/GCS/Azure Blob/filesystem watcher), platform webhook (Slack/Discord/Linear/GitHub-app/Bee), push notification. Each is characterized by its wake mechanism, its substrate fit (which substrates from `canon/methods/spawned-agent-session-substrate-options.md` natively support it), its default engagement (autonomous-trigger sources default to `engagement=agent` per `canon/constraints/mode-discipline-and-bottleneck-respect.md`), and its typical resolution method. The list is open at the edges — a tenth or eleventh trigger source can be added without revising the convention.

**Why this is not a sixth dimension.** A session's identity does not depend on what woke it. The same `(oddie, validation, validator, audit, agent)` tuple can be invoked by an HTTP webhook from a GitHub-app, a scheduled alarm running nightly, or a queue message dispatched by an orchestrator — and the session that runs is identical in all three. The trigger source matters for accounting, observability, and routing rules — not for the session contract. Conflating trigger and session would corrupt the five-dimension claim of the runtime contract.

**Why this is not a section of substrate-options.** Substrate-options catalogs substrates and their cost shapes. Trigger sources cross substrates: an HTTP webhook is the same trigger source whether it wakes a Durable Object or hits a self-hosted Worker. Per `canon/principles/vodka-architecture.md`, the substrate stays opinion-free; cross-substrate normalization belongs at a higher layer. This doc is that higher layer.

**The R2/object-store worked example.** A file lands in an R2 bucket. R2 emits a notification through Queues. A Queue consumer wakes a DO-hosted persona configured for ingestion. The persona runs Epistemic Surface Extraction per `canon/epistemic-surface-extraction` — OCR for screenshots/PDFs, ASR for audio/recordings, frame extraction for video, structural parsing for text-first formats. The extracted content is encoded as dolcheo+ artifacts. A thin gate/challenge/search-and-write pipeline routes the artifacts into the knowledge base. The operator drops a file in a bucket; the artifacts appear in the KB. No assistant in the loop.

**What this doc unblocks.** The AMS audit-gate first implementation needs a canonical trigger-routing reference to point at when the GitHub webhook arrives. A future Oddie-in-TinCan deployment needs the same reference for AMS-frame triggers. The R2/object-store + ESE pipeline unblocks any oddkit-or-truthkit ingestion workflow that wants to operate on dropped files. Without this doc, each implementation re-derives the routing convention; with it, they inherit a substrate-neutral contract.

---

<!-- Subsequent sections to follow:
4. The Surface-vs-Trigger Distinction
5. The Dispatch-Routing Function
6. Trigger-Source Taxonomy (enumeration)
7. Worked Example — R2/Object-Store + ESE Pipeline
8. Resolving the Subscribed-Session Open Question
9. Alternatives Considered
10. Open Questions
11. See Also
-->

---

## The Surface-vs-Trigger Distinction

The most load-bearing claim of this doc, and the one most at risk of being read as wordplay: **trigger source and surface are categorically different**. Conflating them would corrupt the runtime contract.

**What surface is.** Surface, per `canon/methods/persona-shaped-agent-runtime.md#the-persona-profile`, is the output-shape constraint declared in a persona's profile. A surface specifies density caps, format contracts (structured vs narrative), max tokens per emission, and machine-vs-human-field tagging. Examples named in canon: `real_time_stream`, `audit`, `mentorship`, `strategic_translation`. The persona profile maps a surface to a set of output rules; the runtime enforces them at post-processing time, mechanically, before delivery.

**What trigger source is.** Trigger source is the input edge that wakes the runtime. It is not declared in a persona profile; it is declared in the deployment configuration of a specific consumer. Examples: an HTTP webhook handler on `/audit-gate` configured to invoke `(persona=audit-reviewer, role=validator, surface=audit, engagement=agent)`; a queue consumer on `pr-audit-queue` invoking the same tuple; a scheduled alarm on a Durable Object invoking `(persona=oddie, role=general, surface=real_time_stream)`. The trigger source decides *when* a session runs and *what tuple* runs; the surface (resolved as part of that tuple) decides *what the session's output looks like*.

**Why the distinction matters concretely.** A single trigger source dispatches sessions whose surfaces vary by tuple. A GitHub webhook can dispatch an audit-surface session for PR reviews, a mentorship-surface session for a documentation diff explanation, and a strategic-translation-surface session for a release-notes generation — all from the same webhook source. Conversely, a single surface receives invocations from many trigger sources. The audit surface receives invocations from HTTP webhooks (CI gate), scheduled alarms (nightly canon audits), and queue messages (deferred review queue) without changing what the audit-surface output looks like. Trigger and surface vary independently.

**The tempting-conflation case.** A long-lived subscribed observer session running on a WebSocket connection blurs the surfaces. The same wire carries both the wake events (incoming WS messages) and the emission events (outgoing WS messages). In this case the trigger source ("WebSocket message") and the surface ("real_time_stream") sit on the same transport. The temptation is to call them the same thing. They are not. The trigger names what the session *does in response to* — a new message arrived; the surface names what the session *emits like* — a stream of short, dense interpretive snippets. The shared wire is an implementation property of the substrate; the conceptual separation between input edge and output shape holds. A future substrate that decouples the wake-channel from the emission-channel (e.g., wake on push notification, emit on email) would expose the separation immediately.

**Prior art.** This is not a novel distinction in the broader literature. Event-driven architecture names "event sources" or "triggers" as the input edge, distinct from "handlers" and "output formats." Hexagonal architecture (ports-and-adapters) names "input adapters" and "output adapters" as separate concerns by design — the same domain logic accepts work from multiple input adapters and emits to multiple output adapters. Serverless platforms (AWS Lambda, Cloudflare Workers) explicitly model "triggers" as a configuration property of a function, separate from the function's response. The contribution of this doc is not the input/output separation itself but the specific composition of that separation with the runtime-contract's five-dimension session shape and the dispatch-routing convention that maps trigger payloads to invocation tuples.

**Retraction conditions.** This distinction holds if and only if at least one of the following is true for the deployed system: (a) at least one trigger source dispatches sessions with more than one surface, (b) at least one surface receives invocations from more than one trigger source. If neither holds across the deployment portfolio, the distinction is observationally vacuous — every trigger maps 1:1 to a surface and the abstraction is overhead. The current AMS audit gate validates (a) weakly (the same webhook can dispatch audit or strategic-translation invocations depending on the request body), and the planned Oddie-on-TinCan deployment validates (b) (real_time_stream surface receives WebSocket-message triggers and scheduled-alarm triggers for periodic check-ins).

**Confidence.** Working belief. The distinction is consistent with all canon read at draft time and matches the existing AMS audit-gate implementation pattern. It has not been pressure-tested against a hostile reader. The retraction conditions above are the empirical tests; the first non-AMS consumer that wires the runtime will produce additional signal.

---

## The Dispatch-Routing Function

The dispatch-routing function is the operational core of this doc. Given a trigger source and an arriving payload, it produces a runtime invocation tuple:

```
dispatch_route(trigger_source, payload) →
  runtime.invoke(persona, mode, role, surface, engagement, task)
```

The function is implemented per trigger source. The contribution of this doc is the **classification of how each implementation resolves the tuple**, so that consumers know what to write and validators know what to verify.

### Three Resolution Methods

Every single-invocation dispatch falls into one of three methods. The classification is mutually exclusive at the per-invocation level: a single dispatch event uses exactly one method, though a deployment with multiple trigger sources can use different methods for different sources, and a deployment that emits multiple invocations from one trigger event (fan-out) is treated as multiple applications of the function — each application uses exactly one method.

**1. Static resolution.** The trigger source's deployment configuration declares the full invocation tuple at deployment time. The payload is passed through to the session as the `task` parameter but does not influence the tuple. Use when the trigger source has a single semantic — e.g., a webhook endpoint at `/audit-gate` is configured to invoke `(audit-reviewer, validation, validator, audit, agent)` for every request that arrives. The webhook payload becomes the audit target; the tuple is constant.

Implementation cost: lowest. Surface for routing bugs: lowest — there is no routing logic to test. Failure mode: the trigger source's semantic drifts (e.g., the audit-gate webhook starts receiving requests that aren't PRs), and the constant tuple is no longer appropriate. Mitigation: a precondition check at session start that fails fast with a named error rather than running the wrong persona on the wrong input.

**2. Lookup resolution.** The trigger source's deployment configuration declares a partial tuple (typically persona + surface) and a lookup table keyed on one or more payload fields. The runtime resolves the remaining dimensions by looking up the payload's key in the table at dispatch time. Use when the trigger source carries categorically distinct payloads that map to different roles or engagements — e.g., a GitHub-app webhook receives multiple event types (`pull_request.opened`, `issue_comment.created`, `release.published`) and the dispatch table maps each event type to a specific tuple.

Implementation cost: moderate. The lookup table is configuration, not code, and is reviewable. Surface for routing bugs: limited to the table — a missing key produces a named error, not a silent misroute. Failure mode: the table drifts out of sync with the trigger source's schema (e.g., GitHub adds a new event type the table doesn't know about). Mitigation: an explicit default case in the table that produces a named "unrouted event" outcome rather than picking a fallback tuple.

**3. Payload-derived resolution.** At least one tuple dimension is computed from the payload itself by a thin classifier or rule set. Use when the dispatch decision depends on payload content that does not fit a finite lookup — e.g., an inbound email is routed to `surface=mentorship` or `surface=audit` based on a content classifier examining the message body and subject. The classifier may be a rule set (regex over the subject line, keyword match), a model call (a Haiku-tier classifier), or a structured-output extraction.

Implementation cost: highest. Surface for routing bugs: largest — the classifier can misclassify in ways that are hard to detect without per-dispatch logging. Failure mode: the classifier's accuracy degrades over time as payload distributions shift. Mitigation: log every classification with the payload features used, sample classifications for periodic review, and prefer lookup over payload-derived whenever the payload has discrete categorical fields that can carry the decision.

### Why Exactly Three

The three methods correspond to three increasing levels of where the routing decision is made:

- **Static** — decision made at deployment time, frozen into config.
- **Lookup** — decision made at dispatch time, but from a finite enumeration declared at deployment time.
- **Payload-derived** — decision made at dispatch time from open-ended payload content.

A fourth class — "runtime-decided," where the runtime itself chooses the tuple without consulting trigger config or payload — would violate the substrate-agnostic positioning of the runtime and is structurally excluded by the persona-shaped-agent-runtime contract (`runtime.invoke()` takes the tuple as required input, not as a hint). The three above span the space of "decision made before or during dispatch using only the trigger source's config and the arriving payload," which is the entire space available to a dispatch-routing function.

### Prior Art

The pattern is not novel as a category. Enterprise Application Integration literature names "content-based routing" (Hohpe & Woolf, *Enterprise Integration Patterns*) for what this doc calls payload-derived, and "fixed router" / "recipient list" for static. AWS EventBridge implements lookup as its "rules" engine. Kubernetes admission webhooks resolve handlers via static registration. The contribution of this doc is not the trichotomy but the specific binding to the five-dimensional runtime invocation contract — the EAI patterns route to "destinations" or "handlers" without specifying what the handler's session shape must satisfy.

### Scope and Retraction Conditions

**In scope:** single-invocation dispatch. The function emits one invocation per call. Multi-invocation fan-out (one trigger event producing N invocations) is handled by calling the function N times — usually in a fan-out helper layered above the function, not inside it.

**Out of scope:** invocation chaining (one session's output triggering the next session), retry policies (a re-invocation after failure is a new dispatch), and back-pressure (deciding whether to dispatch at all). These are orchestration concerns and live above the dispatch-routing layer per `canon/methods/persona-shaped-agent-runtime.md#what-this-method-is-not`.

**Retraction conditions:** the trichotomy holds if and only if every dispatch implementation across the deployment portfolio classifies into exactly one of the three methods. If an implementation routinely combines methods at the per-invocation level in a way that cannot be decomposed into "first lookup, then payload-derived for the residual," the trichotomy is leaking and a fourth class needs naming. Two implementations beyond the first AMS audit-gate are required before the trichotomy can be promoted from "working belief" to "established."

**Confidence:** working belief. The trichotomy is consistent with the AMS audit-gate's current static-resolution implementation and with the planned GitHub-app multi-event-type dispatch (lookup) and the R2/ESE pipeline (payload-derived classification on file type). It has not been validated against a deployment-portfolio of four-plus implementations.

---

## Trigger-Source Taxonomy

The enumeration as of 2026-05-11. Nine trigger sources cover the autonomous-dispatch use cases observed in current and planned deployments. The list is **open at the edges** — a tenth or eleventh source can be added without revising the dispatch-routing function above; the function operates on `(trigger_source, payload)` regardless of which source.

### Categories

Three categories distinguish what the dispatch-routing configuration needs to know about a trigger source:

- **Transport-level** — the trigger is defined by a protocol that the substrate handles natively. Routing config knows the protocol endpoint; payload semantics are application-defined.
- **Infrastructure-level** — the trigger is emitted by an infrastructure service. Routing config knows the service and its emit contract; payload semantics are service-defined.
- **Application-level** — the trigger arrives over a transport-level mechanism (typically HTTP) but carries semantic content from a specific platform. Routing config knows the platform; payload schema is platform-defined.

The application-level category exists *because* the routing-config concern is different. A generic HTTP webhook handler is configured with an endpoint path and a tuple; a Slack platform webhook is configured with the platform's signing secret, event-subscription schema, and event-type-to-tuple lookup table. The transport is the same (HTTPS POST); the routing concerns are categorically different. Treating Slack as "just HTTP" would force the routing config to re-encode platform-specific semantics inline at every consumer site.

### The Nine Sources

| Source | Category | Wake Mechanism | Default Engagement | Typical Resolution |
|---|---|---|---|---|
| HTTP webhook | Transport | HTTP POST/GET to a configured endpoint | `agent` | Static |
| WebSocket message | Transport | Inbound message on an established WS connection | `agent` (per-message) or subscribed-observer | Static (per connection) |
| Scheduled alarm | Transport | DO/Worker alarm fires at a configured time | `agent` | Static |
| Sub-agent typed RPC | Transport | One DO calls another via typed RPC | `agent` | Static |
| Queue consumer message | Infrastructure | Queue delivers a message to a consumer | `agent` | Lookup (by message type field) |
| Object-store event | Infrastructure | Bucket emits notification on create/update/delete | `agent` | Payload-derived (by file type / content) |
| Inbound email | Infrastructure | Email-handling service routes message to runtime | `agent` | Payload-derived (by subject/body classifier) |
| Platform webhook | Application | Platform (Slack/Discord/Linear/GitHub-app) sends event over HTTP | `agent` | Lookup (by event type) |
| Push notification | Application | Device/service (Bee/IFTTT/mobile) sends event over HTTP or WebSocket | `agent` | Lookup or payload-derived |

### Per-Source Notes

**HTTP webhook.** The substrate-native trigger on virtually every serverless platform. Substrate fit: Cloudflare Durable Objects, Workers, Sandboxes; AWS Lambda; Anthropic Managed Agents (via wrapper Worker). Routing config: endpoint path → tuple. Payload validation MUST happen before dispatch — webhooks are unauthenticated by default and arbitrary bodies arrive; the routing layer's first job is to refuse malformed payloads before they reach the runtime.

**WebSocket message.** The transport that pairs naturally with `subscribed` session type per `canon/methods/persona-shaped-agent-runtime.md#5-support-session-types`. A single WS connection holds the subscription; each inbound message can wake the runtime for a per-message dispatch (the observer-shaped session interprets the message), or the WS lifecycle itself wakes a long-lived session. Substrate fit: Durable Objects native; Sandboxes require an HTTP-WS adapter. Backpressure policy MUST be declared per the persona-shaped-agent-runtime open question on subscribed-session backpressure — drop, summarize, or queue when wake rate exceeds interpretation rate.

**Scheduled alarm.** DO native; Worker Cron Triggers; Lambda EventBridge schedules. Routing config: cron expression → tuple. Substrate fit: Durable Objects natively support per-instance alarms with millisecond precision and persistent state; Workers support per-Worker cron at coarser intervals. Use for nightly canon audits, periodic health checks, scheduled report generation.

**Sub-agent typed RPC.** One DO-hosted persona calls another via the substrate's typed RPC mechanism. Routing config: the calling persona declares the target persona, role, and surface explicitly. Substrate fit: Durable Objects support typed RPC across DO instances via the `getStub` pattern; Sandboxes do not. Use cautiously — sub-agent RPC is the easiest path to violating `canon/methods/persona-shaped-agent-runtime.md#what-this-method-is-not` (the runtime is not orchestration). A sub-agent call is appropriate when the calling persona needs a structured response from another persona's role-bounded session; it is inappropriate when the calling persona is implicitly running a multi-step workflow that should have been a top-level orchestration consumer.

**Queue consumer message.** Cloudflare Queues; AWS SQS; Google Pub/Sub. Routing config: queue name → partial tuple, with the message type field driving lookup. Substrate fit: Durable Objects via Queue consumer binding; Workers natively. Use for decoupling producer rate from consumer capacity, deferred processing, and bridging non-Worker triggers (such as object-store events) into the runtime.

**Object-store event.** R2 bucket notifications; S3 EventBridge events; GCS Pub/Sub notifications; Azure Blob storage events. Routing config: bucket name → partial tuple, with the object key prefix and/or content type driving classification. Substrate fit: object stores typically emit through Queues or pub/sub; the runtime consumes via Queue consumer or pub/sub subscriber. **The R2/ESE pipeline (Section 7) is the canonical worked example for this source.**

**Inbound email.** Cloudflare Email Workers; AWS SES inbound; SendGrid Inbound Parse. Routing config: address → partial tuple, with subject/body classifier driving the final resolution. Use for journal-by-email (operator sends a recording transcript to `journal@truthkit.ai`, runtime extracts and encodes), ticket-creation triggers, support-mailbox routing. Payload-derived resolution is typical because email semantics rarely match a finite event-type lookup.

**Platform webhook.** Slack Events API, Discord interactions, Linear webhooks, GitHub Apps. The physical arrival is HTTP POST, but the routing concerns are categorically different from generic HTTP webhook handling: platform-specific signing-secret verification, event-subscription configuration in the platform's app manifest, platform-specific schemas. Routing config: platform identity + event type → tuple. Each platform's event types form a finite enumeration that fits lookup naturally.

**Push notification.** Bee personal-AI device, IFTTT triggers, mobile-app push events. The least-standardized category — different platforms use different transports (HTTP, WebSocket, MQTT) and very different payload schemas. Routing config: device/service identity + event type or payload classifier → tuple. Use for ambient-evidence triggers — operator wears a Bee, Bee captures conversation, Bee emits a transcript-ready event, runtime wakes a persona to encode.

### Disconfirmers

The enumeration is **complete-as-observed**, not complete-by-construction. It is incomplete if any of the following materializes:

- A deployment surfaces a meaningful trigger source not in the list (e.g., a hardware sensor, a real-world signal like an NFC tap, an in-game event from a virtual environment) that requires routing-config concerns not subsumable into the existing categories.
- A deployment shows that one of the listed sources is categorically the same as another — e.g., if WebSocket messages and platform webhooks always need identical routing-config shape, the distinction collapses into one source.
- A new transport-level mechanism (e.g., a gRPC-streaming standard becoming substrate-native) requires a new transport-level entry.

The first non-AMS consumer to ship will produce signal on enumeration completeness. The list is reversible — adding a tenth source or merging two existing sources are both low-cost edits.

### Engagement Defaults

Every listed source defaults to `engagement=agent` per `canon/constraints/mode-discipline-and-bottleneck-respect.md`. Autonomous-trigger dispatch means no assistant in the loop; an `engagement=assistant` invocation from one of these sources would emit clarifying questions into a channel with no listener, which is incoherent. The default is enforced at the routing layer: a dispatch-routing config that declares `engagement=assistant` for a trigger source listed here MUST also declare a turn-channel target that can receive clarifying questions (e.g., a Slack thread, an inbound-email reply chain). Without such a target, the routing layer MUST refuse the config at deployment time, not at dispatch time.

The single exception is WebSocket message in the subscribed-observer shape — the WS connection itself is the turn-channel, and clarifying questions emitted back through the WS are received by the connection's holder.

---

## Worked Example — R2/Object-Store + ESE Pipeline

The object-store-event trigger source is the highest-leverage entry in the taxonomy because it generalizes drag-and-drop knowledge ingestion. Any file the operator (or any platform) drops into a designated bucket gets canon-conformant processing without an assistant in the loop. This section traces the pipeline end-to-end as the canonical worked example.

**Status:** designed, not yet implemented. The pipeline composes existing canon (`klappy://canon/epistemic-surface-extraction`, `klappy://canon/methods/persona-shaped-agent-runtime`) with Cloudflare infrastructure (R2 bucket notifications, Queues, Durable Objects) that is GA as of 2026-05-11. The first implementation is on the near-horizon execution backlog; this section describes the intended shape.

### Pipeline

```
File lands in R2 bucket
        ↓ (R2 bucket notification)
Cloudflare Queue
        ↓ (Queue consumer)
DO-hosted ingest-encoder persona wakes
        ↓ (per content-type branch)
Epistemic Surface Extraction (ESE)
        ↓ (extracted text + structural metadata)
dolcheo+ encoding
        ↓ (per-artifact)
Thin gate / challenge / search-for-routing / write
        ↓
Artifact lands in KB
```

Five steps, each a discrete responsibility.

### Step 1 — File Lands

The operator (or any upstream platform) writes a file to a designated R2 bucket. The bucket has notifications enabled via R2's event-notification feature, configured to publish to a Queue on `PutObject` and `DeleteObject` events. The operator's perspective: drop a file in a folder; everything else is the runtime's job.

**Decision point:** bucket layout. A single bucket with key-prefix routing (`recordings/`, `screenshots/`, `pdfs/`) keeps configuration simple. Multiple buckets (one per content category) keep IAM scopes tighter. Default to single-bucket-with-prefixes; revisit when access-control concerns appear.

**Failure mode:** notification loss. R2 notifications are best-effort; a dropped notification leaves the file unprocessed. Mitigation: a scheduled-alarm consumer periodically reconciles the bucket against the KB and emits backfill events for un-encoded files. The scheduled-alarm consumer is a separate trigger source (per Section 6), so the recovery path is itself a dispatch-routing config — not bespoke recovery code.

### Step 2 — Queue Wakes the Persona

R2 publishes the notification to a Queue. A Queue consumer on the runtime's Worker reads the message, validates it (R2 source identity, valid object key), and wakes the appropriate DO-hosted persona by routing to the persona's stub.

**Dispatch-routing classification:** payload-derived. The Queue message carries the object key and content type; the routing layer uses these to resolve the tuple. The persona is statically `ingest-encoder` (the persona profile is a canon object per `klappy://canon/methods/persona-shaped-agent-runtime#the-persona-profile`); the surface is resolved from the content type (`audit` for canon-candidate documents identified by `canon-candidates/` prefix; `mentorship` for transcripts identified by `recordings/` prefix; `strategic-translation` for partner documents identified by `partner-evidence/` prefix). Role is `builder` for ingestion. Engagement is `agent`.

The `runtime.invoke()` call therefore takes the shape: `runtime.invoke(persona=ingest-encoder, mode=execution, role=builder, surface=<resolved>, engagement=agent, task=<R2 key + content type>)`.

**Decision point:** persona pluralization. One `ingest-encoder` persona parameterized by surface, or N specialized personas (one per content type)? Default to one parameterized persona — the encoding behavior is largely shared, surface-specific output rules already live in the surface_profile per `persona-shaped-agent-runtime#the-persona-profile`. Revisit when a content type's processing diverges so much that the shared persona becomes a switch statement.

### Step 3 — Epistemic Surface Extraction

The persona's first substantive step is calling Epistemic Surface Extraction (`klappy://canon/epistemic-surface-extraction`) to make the artifact legible. ESE is the canon-named operation that turns non-text evidence into text the runtime can encode against.

Per content type, ESE branches:

- **Screenshots, PDFs (text-extractable):** OCR. Cloudflare AI's Vision models or Anthropic Vision via Claude API. Returns extracted text plus per-page bounding-box metadata.
- **Audio, recordings:** ASR. Cloudflare AI's Whisper deployment or external ASR (AssemblyAI, Deepgram). Returns transcript plus speaker diarization where available.
- **Video:** frame extraction at scene boundaries, plus ASR on the audio track. Returns key frames (each subject to OCR if text-bearing) plus full transcript with timestamps.
- **Text-first formats (Markdown, DOCX, TXT):** structural parsing. Returns the text content plus structural metadata (headings, tables, code blocks).

**Decision point:** inline vs deferred ESE. Files under a size threshold (default: 5 MB) run ESE inline within the persona's session. Files over the threshold trigger a deferred-extraction job — the persona emits a "pending ESE" placeholder artifact and a follow-up trigger fires when ESE completes. Inline is simpler; deferred is necessary for hour-long recordings or large video files. The threshold MUST be configurable per deployment.

**Failure mode:** ESE accuracy. OCR misreads, ASR mistranscribes, structural parsers mis-segment. Mitigation: every ESE output carries a confidence-band metadata field, and the dolcheo+ artifact records the ESE method + confidence. Downstream consumers can filter by confidence; the operator can re-process low-confidence artifacts with an alternative ESE method.

### Step 4 — Dolcheo+ Encoding

With the extracted text in hand, the persona calls `oddkit_encode` to structure the content as dolcheo+ artifacts per `klappy://canon/definitions/dolcheo-vocabulary`. The artifact types (Observation, Learning, Decision, Constraint, Handoff, Encode) are inferred from the content — a recording of an architecture discussion produces Decisions and Constraints; a screenshot of a chat exchange produces Observations.

**Decision point:** encoding granularity. One artifact per source file, or N artifacts per file based on content segmentation? Default to N — a 60-minute meeting transcript contains many distinct decisions and observations; one artifact per file would collapse them. Segmentation rules are persona-config concerns, not runtime concerns.

**Failure mode:** mis-typing. A passage that looks like an observation but is actually a constraint gets typed wrong. Mitigation: `oddkit_encode` returns artifact-quality scores; low-quality encodings (e.g., 2/4 or below) are flagged for operator review rather than auto-committed. The quality gates are part of the encoding contract, not the runtime.

### Step 5 — Gate / Challenge / Search / Write

Each encoded artifact passes through a thin governance pipeline before landing in the KB:

- **`oddkit_gate`** — checks completion prerequisites against the artifact type's required fields.
- **`oddkit_challenge`** — pressure-tests the claim against canon constraints; flags tensions.
- **`oddkit_search`** — finds the right KB location (canon vs odd vs writings vs journal) based on the artifact's content and the matching canon docs already in the KB.
- **`oddkit_write`** (or equivalent commit path) — writes the artifact to the KB at the resolved location.

The gate, challenge, and search steps are not optional. Every artifact runs the gauntlet. An artifact that fails gate or challenge with severity above a threshold is held for operator review rather than auto-committed to the KB.

**Failure mode:** noise injection. The pipeline runs without an assistant in the loop; bad artifacts could accumulate. Mitigation: the operator review queue holds anything below confidence threshold; threshold MUST be conservative initially and only loosened as observed precision improves.

### What This Unblocks

Once the pipeline is implemented and validated, several workflows become possible without manual encoding:

- **Voice-to-canon ingestion.** Operator records a thought walking through the woods; recording uploads to R2; transcript and encoded artifacts appear in the KB; operator reviews and promotes.
- **Meeting transcript ingestion.** Zoom recording lands in R2; transcript with diarization extracts; per-speaker decisions and observations encoded; landed in journal.
- **Partner-document ingestion.** Email attachment from a collaborator lands in R2 (via inbound-email trigger writing to R2); strategic-translation surface processes; cross-organization references encoded.
- **Screenshot-to-evidence.** Operator pastes a screenshot of a chat thread into R2; OCR extracts; encoded as Observation linked to participants.
- **Reference-document ingestion.** Operator drops a PDF research paper in R2; structural parsing extracts sections; key claims encoded as Observations with citations.

The list is illustrative, not exhaustive. The general pattern: any file the operator or any platform writes to the bucket becomes canon-conformant content in the KB.

### Confidence

**Working belief.** The pipeline is designed but not implemented. Each individual component is canon (ESE, dolcheo+ encoding) or GA infrastructure (R2 events, Queues, DOs). The composition has not been built and tested. The first implementation will produce concrete signal on: (a) ESE accuracy across content types, (b) appropriate confidence thresholds for auto-commit vs review queue, (c) whether one parameterized ingest-encoder persona suffices or specialization is needed, (d) whether the inline-vs-deferred ESE threshold of 5 MB is right.

**Retraction conditions.** The pipeline is retracted as "the" canonical worked example if (a) ESE accuracy falls below operator-tolerance thresholds for a majority of content types, or (b) operator review queue grows faster than the operator can clear it (indicating either threshold mis-calibration or systemic quality issues), or (c) a simpler pipeline (e.g., skip dolcheo+ encoding for some content types and write raw transcripts directly) provides equivalent operator value at lower complexity.

---

## Resolving the Subscribed-Session Open Question

`klappy://canon/methods/spawned-agent-session-runtime-contract` lists "Subscribed (long-lived) session shape" as an open question. This taxonomy resolves it:

A subscribed session is **not** a sixth session-shape category alongside `one_shot`. It is a `one_shot` session invoked by a trigger source that produces multiple wake events over a long wall-clock window — specifically WebSocket message in the subscribed-observer configuration, or scheduled alarm with short intervals. The session's `engagement` parameter and the WebSocket connection's lifecycle together determine whether the session persists across wake events or is freshly spawned per event.

Concretely:

- **Persistent subscribed session** — engagement is a long-lived assistant or observer; one session instance handles all wake events on the connection; the DO instance holds session state across wake events. This is the Oddie-on-TinCan pattern.
- **Per-event subscribed dispatch** — each wake event spawns a fresh session; the DO instance is just a wake handler; no state persists between events. This is the audit-gate pattern if it were rewired to be triggered by a subscribed event stream rather than a per-PR HTTP webhook.

The choice between the two is a deployment configuration of the trigger source, not a session-shape dimension. The runtime contract's five-dimension claim continues to hold; "subscribed" is a property of how the trigger source produces events, not a property of the session.

---

## Alternatives Considered

The dispatch-routing layer could have been authored differently. Alternatives weighed and rejected during this doc's planning:

- **Tier-3 docs/ guidance.** A docs-level guide would lack the authority needed for a routing contract. Rejected because consumers building against the runtime need a Tier-1 or Tier-2 reference they can pin to.
- **A section inside `spawned-agent-session-substrate-options`.** Mixes substrate properties (cost shapes, native capabilities) with cross-substrate normalization (trigger semantics), violating vodka separation. Rejected because the substrate-options doc must stay opinion-free per `canon/principles/vodka-architecture.md`.
- **An addendum inside `spawned-agent-session-runtime-contract`.** Would force an invasive rewrite of stable canon. The runtime contract's five-dimension claim must remain intact and prominent; appending trigger material risks readers conflating triggers with dimensions. Rejected.
- **Defer until the first implementation lands.** A Bide-style hold would let evidence drive the abstraction. Rejected because the AMS audit-gate implementation needs a canonical routing reference to point at *before* it ships; deferring would force the implementation to invent the convention and the convention to follow rather than lead.

A future revision could merge this doc back into one of the alternatives above if implementation evidence shows the trichotomy and nine-source taxonomy are stable and small enough to absorb without confusion. The boundary holds today because the routing contract is novel enough to warrant a dedicated reference.

---

## Open Questions

These are explicitly unresolved. The method describes the shape; implementation will tune the parameters.

- **Multi-tenant routing.** A single deployment may host multiple tenants whose dispatch configurations are independent. The function `dispatch_route(trigger_source, payload)` becomes `dispatch_route(tenant, trigger_source, payload)`. The tenant dimension is implicit in the current sketch but not formalized.
- **Cross-bucket routing.** Object-store events from multiple buckets may map to the same persona but different surfaces. The bucket name should be part of the routing key, but the convention for multi-bucket configuration is unspecified.
- **Trigger source authentication.** Each trigger source has different authentication mechanisms (HMAC signatures for HTTP webhooks, OAuth for platform webhooks, IAM for queue messages). The routing-config contract for authentication is unspecified.
- **Retry policy as a separate config.** Currently, retry policy is named as out of scope. The boundary between dispatch-routing config and retry-policy config needs clearer articulation when the first implementation hits a retry case.
- **Observability conventions.** Every dispatch should emit a structured trace including trigger source, classification method used, resolved tuple, and outcome. The trace schema is unspecified.

---

## See Also

- [Spawned Agent Session Runtime Contract](klappy://canon/methods/spawned-agent-session-runtime-contract) — the five-dimension session contract this doc complements
- [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) — the runtime layer this doc sits above
- [Spawned Agent Session Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options) — the substrate catalog this doc references for native trigger surfaces
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the canon that makes `engagement=agent` the default for autonomous-trigger dispatch
- [Epistemic Surface Extraction](klappy://canon/epistemic-surface-extraction) — the operation called by the canonical worked example
- [Symmetric Participation](klappy://canon/principles/symmetric-participation) — the principle that makes trigger-source diversity a feature rather than a complexity tax
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the substrate-discipline this doc extends one layer above the runtime
- [Definition of Done](klappy://canon/definition-of-done) — the evidence policy this doc was authored against
- [DOLCHEO Vocabulary](klappy://canon/definitions/dolcheo-vocabulary) — the encoded-artifact types referenced in the worked example

