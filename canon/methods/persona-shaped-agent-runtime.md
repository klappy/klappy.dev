---
uri: klappy://canon/methods/persona-shaped-agent-runtime
title: "Persona-Shaped Agent Runtime — Building a Reusable Substrate for Many Personas"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "methods", "agent-runtime", "persona-profile", "substrate", "vodka-architecture", "oddie", "spawned-agent-session", "role-enforcement", "surface-profile"]
epoch: E0008.5
date: 2026-05-10
derives_from: "canon/methods/spawned-agent-session-substrate-options.md, canon/principles/sessions-mirror-modes.md, canon/constraints/mode-transitions-require-encoded-handoff.md, canon/constraints/critic-cannot-be-resolver.md, canon/principles/verification-requires-fresh-context.md, canon/voice/oddie-the-river-guide.md, canon/principles/vodka-architecture.md"
complements: "canon/methods/spawned-agent-session-runtime-contract.md, canon/principles/methodology-personification.md, canon/principles/voice-as-cognitive-load-shedding.md, canon/principles/participation-replaces-integration.md"
governs: "Any service that hosts spawned agent sessions on behalf of multiple consumers and multiple personas"
status: proposed
---

# Persona-Shaped Agent Runtime — Building a Reusable Substrate for Many Personas

> A spawned-agent-session substrate (CF Sandboxes, Anthropic Managed Agents, etc.) hosts one session at a time. A *runtime* sits on top of a substrate and turns it into a service: many consumers can call it with many tasks, and the substrate stays opinion-free underneath. This method documents how to shape that runtime so it composes with **personas as first-class objects** — Oddie, an audit reviewer, a release validator, a docs mentor — without coupling the runtime to any specific persona's identity or any specific consumer's workflow. The pattern keeps the substrate vodka, makes critic-cannot-be-resolver mechanically enforceable, and turns voice canon into something the runtime honors automatically rather than something the agent inside has to remember.

---

## Companion Documents

This doc and [Spawned Agent Session Runtime Contract](klappy://canon/methods/spawned-agent-session-runtime-contract) are sibling layers, deliberately split:

- **This doc (Tier-1 method)** — the architectural shape. Why personas are first-class, what a persona profile contains, how the runtime composes with substrates, deployment sequencing, prior art, inheritance, and worked examples. Reads top-down: "what is this thing and why."
- **Runtime-contract (Tier-2 spec)** — the per-session-shape contract every spawned session satisfies. Per-mode tool allow-lists, output schemas, risk detectors, anti-pattern detectors; per-role boundaries; per-surface post-processing rules; per-engagement turn-control; the composition rules table with forbidden / rare / well-trodden combinations. Reads as a reference: "what does the runtime do at submit time."

When this doc names a runtime responsibility (resolve profile, enforce role, post-process by surface, honor mode toggles, honor engagement, support session types, support parallelism, support handoff-insufficiency signaling), the implementation contract for that responsibility lives in runtime-contract. This doc says *what* the runtime does and *why*; runtime-contract says *exactly how it behaves* per-dimension. Keep the layer distinction: changes to architecture land here; changes to per-dimension mechanics land there.

---

## What This Document Is

A design pattern for the layer that sits between a spawned-agent-session substrate and the consumers who want agent help. Companion to [Spawned Agent Session Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options): that doc catalogs *where* to host a session; this doc describes *how to build a service on top* so the same substrate serves many callers and many personas without each pair re-implementing infrastructure.

This is a method, not a decision. It documents the shape; it does not lock in implementation specifics. Specific runtime instances (the audit gate, a TinCan-Oddie deployment, a docs mentor service) are decisions that consume this method.

---

## The Pattern

A spawned-agent-session substrate gives you one capability: spin up an agent in an isolated context, hand it a task, get a result. That capability is generic. Every consumer that wants agent help would otherwise wire it themselves: prompt assembly, tool registration, MCP setup, secret injection, output parsing, surface-specific formatting. The wiring is repetitive. It also smuggles opinions into the substrate (which prompt? which tools? which output schema?), violating vodka-architecture at the substrate layer.

The runtime resolves this by hosting the wiring at a layer above the substrate:

```
┌────────────────────────────────────────────────────────────────┐
│ Consumers:  audit gate │ slack bot │ cron │ TinCan │ ...       │
│             (each one knows: "invoke this persona, this task")  │
├────────────────────────────────────────────────────────────────┤
│ Runtime:    persona resolution │ role enforcement │             │
│             surface post-processing │ session lifecycle         │
├────────────────────────────────────────────────────────────────┤
│ Substrate:  CF Sandbox │ Managed Agents │ Daytona │ ...         │
│             (just spawns isolated sessions)                     │
└────────────────────────────────────────────────────────────────┘
```

The runtime accepts requests of the form *"invoke persona P on surface S for task T,"* resolves P to operational configuration, dispatches to the substrate, post-processes the output per S, and returns. Personas are canon objects. Surfaces are constraints. The substrate stays generic. The consumer stays simple.

---

## The Persona Profile

A persona profile is a structured description of who an agent is, what it can do, and how its output is constrained. Profiles are themselves canon — versioned, URI-addressable, governed by the same rules as any other canon doc.

### What a Profile Contains

A profile bundles:

| Field | Purpose |
|---|---|
| `system_prompt_uri` | The voice canon or role specification. The runtime fetches this and passes it to the agent. |
| `role` | One of `detection-only`, `resolver`, `general`. Drives tool filtering and session lifecycle rules. |
| `mcp_servers.operational` | MCPs the persona requires to *be* itself, regardless of task. (Oddie needs oddkit always.) |
| `mcp_servers.task_relevant` | MCPs added per invocation based on the specific task. (A PR audit gets the GitHub MCP.) |
| `knowledge_bases` | URIs the persona can ground observations against (`klappy://`, `ams://`, etc.). |
| `surface_profiles` | Per-surface constraints: density caps, output format, narrative-vs-structured, max tokens per emission. |
| `brand_discipline` | URI pointing at the persona's voice canon section that governs emoji, vocabulary, machine-vs-human surface rules. |

### Illustrative Sketch

```yaml
persona: oddie
version: 1
system_prompt_uri: klappy://canon/voice/oddie-the-river-guide
role: detection-only
mcp_servers:
  operational: [oddkit]
  task_relevant: []
knowledge_bases:
  - klappy://
  - ams://
surface_profiles:
  real_time_stream:     { density: high,   max_tokens_per_emission: 60 }
  audit:                { density: medium, structured_output: required }
  mentorship:           { density: low,    narrative: true }
  strategic_translation: { density: medium, bidirectional: true }
brand_discipline: klappy://canon/voice/oddie-the-river-guide#brand-guide
```

The schema is illustrative. Specific field names, validation rules, and serialization format are implementation choices. The principle is that a persona's identity is captured in a structured artifact that the runtime can resolve to operational configuration.

### Where Profiles Live

Two reasonable options:

1. **The voice canon doc is the profile.** Structured fields go in the YAML frontmatter; narrative goes in the prose body. Single source of truth.
2. **Profiles are separate canon docs** (e.g., `klappy://personas/oddie`) that reference the voice canon for narrative. Cleaner separation; two-doc maintenance.

Either approach is consistent with this method. The choice belongs to the operator authoring the first profile.

---

## The Runtime's Job

The runtime accepts an invocation, resolves a profile, executes against a substrate, and post-processes the result. Five responsibilities specifically:

### 1. Resolve Profile to Operational Configuration

`runtime.invoke(persona="oddie", surface="audit", task="...")` triggers:

- Fetch the persona profile by name and version.
- Fetch the system prompt at `system_prompt_uri`.
- Compose the operational MCP set (always-on) with the per-invocation task-relevant MCPs.
- Apply the named surface profile's constraints.
- Hand the assembled config to the substrate.

The runtime is the only component that knows how to assemble these pieces. Consumers do not. New consumers can be added without touching profile-resolution logic.

### 2. Enforce Role at Submit Time

Two parallel constraints need architectural enforcement, drawn from two parent canon docs:

- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — detection and remediation must be separated by a *tool boundary*. A session that detects cannot also mutate.
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — creation and validation must be separated by a *context boundary*. A session that validates cannot inherit the creator's accumulated reasoning.

Generalized to all mode transitions per [Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes), every transition between epistemic modes is a context boundary deserving a fresh session. The runtime enforces the boundaries through five mode-bound roles plus an escape hatch.

#### The Five Mode-Bound Roles

Each role corresponds to one of the five canonical [epistemic modes](klappy://canon/epistemic-modes). The role declares the session's mode; the runtime enforces the role's constraints structurally.

- **`explorer`** — exploration mode. Read-broad tool set, no mutators. Output is a synthesis ledger; the durable handoff to a `planner`.
- **`planner`** — planning mode. Read-oriented tool set, no mutators. Output is a plan declaring assumptions, scope, deferred items, and invalidating conditions; the durable handoff to a `builder`.
- **`builder`** — execution mode. Mutating tools allowed, scoped to the plan. Output is the artifact plus a claims declaration; the durable handoff to a `validator`.
- **`validator`** — validation mode. Read-only on the artifact under test, fresh-context required (per [verification-requires-fresh-context](klappy://canon/principles/verification-requires-fresh-context)). Output is structured findings with explicit dispositions per [P0008](klappy://docs/promotions/P0008-pr-validator-dolcheo-ledger-as-deliverable); the durable handoff to a `resolver`, or terminal if all findings accept.
- **`resolver`** — resolution mode. Mutating tools allowed, scoped to the findings. Output is the revised artifact plus a per-finding remediation summary; the durable handoff back to a fresh `validator` for re-validation.

The per-role tool allow-lists, output schemas, risk detectors, anti-pattern detectors, and the same-session transitions the runtime refuses live in [Runtime Contract §Mode](klappy://canon/methods/spawned-agent-session-runtime-contract#mode) and [§Role](klappy://canon/methods/spawned-agent-session-runtime-contract#role). This doc names the role taxonomy; the contract specifies the per-role behavior.

#### Escape Hatch and Observer Sessions

**`general`** — no mode-binding, no fresh-context guarantee, no structured-deliverable requirement. Used for personas that intentionally combine modes in workflows where the context-corruption risk is acceptable. Mode-collapsed sessions are a deliberate choice to trade signal quality for throughput; the runtime supports them but does not pretend the constraints are met. PoC-scope work that explicitly skips modes (per the [encoded-handoff constraint](klappy://canon/constraints/mode-transitions-require-encoded-handoff)'s skip provision) is the canonical use case.

**Observer sessions.** Some sessions do not fit the five-mode taxonomy because they do not produce artifacts that hand off to a next mode — they are continuous observers, emitting commentary on streams produced elsewhere. Oddie's real-time stream interpretation surface is the worked example. These sessions are configured with the `subscribed` session type (see §5 below), a tool restriction (typically read-only), and no mode-bound role declaration. They are not gate-bounded work; the encoded-handoff constraint does not apply because there are no transitions to encode.

#### Constraints Are Composable

The named roles bundle (tool filter × fresh-context requirement × deliverable shape × mode binding) in their canonical configurations. The underlying parameters are composable. A persona profile can declare a custom role configuration if the named roles do not fit — e.g., a "drafting" role that combines builder-role tools with explorer-role context-freshness for early-stage artifact work. Named roles are recommended for legibility; custom configurations are supported for cases the named roles undersolve.

#### Universal Handoff Requirement

Per [Mode Transitions Require Encoded Handoff](klappy://canon/constraints/mode-transitions-require-encoded-handoff), every transition between mode-bound roles requires a journal entry plus a transition-specific minimal handoff artifact. The runtime enforces this by requiring handoff URI inputs on any session whose role is downstream of another role. Sessions invoked without complete handoff inputs are refused. The journal entry is universal; the runtime can require it as a side-effect of any mode-bound session's completion.

### 3. Apply Surface-Profile Output Post-Processing

Voice and brand are mechanically enforceable at the runtime layer. The agent inside speaks naturally; the runtime cleans before delivery — persona emoji stripped from machine fields, density caps enforced as retry-shorter loops, format contracts (structured-output vs narrative) honored at parse time.

The exact post-processing rules — which fields get tagged `machine` vs `human`, which emoji set survives the `neutral` and `strict` toggles, which output kinds get classified, how density caps trigger retries — live in [Runtime Contract §Surface](klappy://canon/methods/spawned-agent-session-runtime-contract#surface). This doc names the responsibility; the contract specifies the rules.

### 4. Honor Mode Toggles

Personas have three voice modes — `persona`, `neutral`, `strict` — declared per invocation. The runtime applies the toggle uniformly across all output fields; the agent inside does not need to know which mode is active. Functional status emoji (`✅ ⚠️ 🔴`) survive across all toggles per voice canon — they are information, not character.

The exact suppression rules per toggle live in [Runtime Contract §Surface](klappy://canon/methods/spawned-agent-session-runtime-contract#surface) under "Surface drives output post-processing."

### 5. Support Session Types

Two session shapes cover known use cases:

- **`one_shot`**: invoke, return, tear down. Audit gates, on-demand reviews, doc-generation tasks. Single output.
- **`subscribed`**: long-lived, connected to an event source, emits over time. The TinCan flagship case for Oddie. Real-time stream interpretation, scheduled monitoring, persistent observers.

A subscribed session needs: connection management, multi-output channels (per-channel post-processing), backpressure handling for when stream rate exceeds interpretation rate, and a teardown signal. The audit-gate use case does not need any of this. The runtime should support both without requiring `subscribed` consumers to use `one_shot` machinery or vice versa.

---

### 6. Honor the Engagement Contract

Sessions invoke the runtime under one of two engagement modes — *assistant* (turn-based dialogue with the caller; clarifying questions are valid output; state persists across turns) or *agent* (autonomous run-to-completion; clarifying questions are forbidden per [bottleneck-respect canon](klappy://canon/constraints/mode-discipline-and-bottleneck-respect); stuck sessions terminate with named failures rather than mid-flight questions).

Engagement is orthogonal to persona, mode, role, and surface — the same persona at the same surface in the same mode and role can be invoked under either engagement, with the caller's consent to interruption being what differs. The dimension exists at the runtime layer because it is the natural place to enforce turn-control and bottleneck-respect mechanically rather than by prompt discipline.

The full spec — turn-control markers, output-kind classification, how `engagement=agent` wraps clarifying-question emissions as named failures, the rare-but-legitimate combinations like `planning + agent` — lives in [Runtime Contract §Engagement](klappy://canon/methods/spawned-agent-session-runtime-contract#engagement). The engagement parameter appears in the invocation sketch alongside persona, role, surface, and task:

```
runtime.invoke(
  persona="oddie",
  role="validator",
  surface="audit",
  engagement="agent",       # autonomous; no clarifying questions
  task="..."
)
```

---

### 7. Support Parallelism and Operator Override

Two patterns the runtime needs to handle that are orthogonal to role enforcement: concurrent sessions in the same mode, and operator-declared mode collapse for urgency.

#### Parallelism

Per [Sessions Mirror Modes §Parallelism Patterns](klappy://canon/principles/sessions-mirror-modes), the runtime supports three of four parallelism patterns:

- **Within-mode fan-out.** Multiple sessions of the same role spawned concurrently — multiple explorers on different angles, multiple validators with different lenses, multiple builders on independent scope. The runtime spawns N concurrent sessions; the consumer is responsible for fan-in (consolidating outputs into a single encoded handoff for the next mode).
- **Multi-participant single session.** Multiple agents collaborating within one role-bound session, sharing context, producing a joint deliverable. The runtime treats this as one session with multiple participant identities. The session is bound to one mode; participants share the mode's tool restrictions.
- **Cross-mode parallelism on different artifacts.** Independent work streams running concurrently. The runtime spawns and tracks them independently; no coordination is required because the streams do not share artifacts.

The runtime *refuses* the fourth pattern: cross-mode sessions on the same artifact. A validator session cannot be invoked on an artifact whose builder session has not yet produced an encoded handoff (artifact + claims declaration). This is enforced at submit time — the runtime checks the artifact's handoff state before accepting a downstream-role invocation.

Fan-in is a consumer concern, not a runtime feature. The runtime spawns parallel sessions and returns their outputs; consolidating those outputs into a single handoff for the next mode is the consumer's job. The runtime can support this with conventions (e.g., a fan-in helper that takes N session outputs and produces a consolidated DOLCHEO ledger), but the conventions are layered above the core runtime.

#### Operator Override

Per [Mode Transitions Require Encoded Handoff §Operator Override](klappy://canon/constraints/mode-transitions-require-encoded-handoff), the runtime accepts an explicit override declaration that collapses mode boundaries into a single session. Sketched:

```
runtime.invoke(persona="...", task="...", override={
  type: "operator_collapsed_modes",
  modes_collapsed: ["exploration", "planning", "execution", "validation"],
  reason: "production incident — patch needed in 30 min",
  acknowledged_risks: [
    "validator shares context with builder; findings biased toward what builder framing surfaced",
    "no fresh planning context; speculative certainty propagates into build",
    "no fresh exploration; tensions not surfaced before convergence"
  ]
})
```

When an override is present, the runtime:

1. **Records a journal entry at session start** naming the override, modes collapsed, reason, and acknowledged risks.
2. **Relaxes role enforcement** for the collapsed modes. Tool sets are unioned; fresh-context guarantees are suspended for the collapsed transitions.
3. **Records a journal entry at session end** naming what actually happened — work performed, decisions made, tradeoffs that materialized.
4. **Tags the session's outputs as override-produced** in any downstream metadata, so consumers can see that subsequent work was built on overridden-session output and apply appropriate skepticism.

The override is *not* the same as the `general` role escape hatch. The general role is a persona-profile-level declaration that some sessions of this persona never had the constraints in the first place. The override is a runtime-invocation-level declaration that this specific session has the constraints temporarily suspended for declared reasons. Both produce relaxed sessions; the audit trail is different, and the override's audit trail names the urgency-driven choice explicitly.

The runtime cannot override the journal entry requirement itself. The override is a journal-worthy event; the journal entry is what makes the corruption visible later. A runtime that allowed override sessions to skip journaling would be silently undoing the constraint's audit-trail purpose.

#### What Conversational-Mode Orchestration Looks Like

The principle's note that "in conversational mode this should feel seamless" is a consumer pattern that composes parallelism and override support with session-spawning. A chat-facing consumer that wants to present unified continuity to a human user while respecting session-per-mode discipline orchestrates the runtime as follows:

- Detects mode transitions in the conversation (the human signals "okay let's plan it" or "start building").
- Spawns a fresh role-bound session at each transition, with the prior session's encoded handoff as input.
- Presents the new session's output as continuation of the conversation.
- Records journal entries at each transition invisibly to the human.
- Surfaces an explicit override prompt when the human wants to collapse modes ("you're asking me to skip planning and start building — do you want to declare an override, or take a moment to plan?").

The runtime does not implement this orchestration; it provides the primitives the orchestrator composes. This is a consumer pattern that warrants its own canon doc once a working orchestrator exists to point at; for now it is a deferred follow-up.

---

### 8. Support Handoff-Insufficiency Signaling

Per [Sessions Mirror Modes §Failure Modes](klappy://canon/principles/sessions-mirror-modes), the architecture's cost only pays back when handoffs preserve what would have transferred in shared sessions. The runtime cannot guarantee handoff quality — that is an encoding-norms discipline upstream of any runtime feature. But the runtime can ensure that bad handoffs are detectable and that receiving sessions can refuse to proceed on them.

The runtime supports a structured "handoff insufficient" outcome distinct from a session's normal deliverable:

```
session.outcome = {
  type: "handoff_insufficient",
  missing: [
    "the synthesis ledger lists three options but does not capture the tradeoff considerations",
    "scope item 'X' is named but its boundaries are unclear",
    "implicit assumption that {Y is true} appears load-bearing but is not declared"
  ],
  proposed_resolution: "request fresh upstream session" | "request clarification from upstream author" | "operator override decision"
}
```

When a receiving session returns this outcome instead of a normal deliverable, the runtime:

1. **Records the insufficiency in the journal** alongside the originating handoff URI. Audit trails accumulate; chronic insufficiency at a specific gate signals norm gaps that the project's encoding discipline should address.
2. **Does not produce a downstream handoff.** The receiving session cannot proceed; therefore there is no handoff to the next mode. The work blocks at this gate until resolution.
3. **Surfaces the resolution path to the consumer.** The consumer chooses among: (a) spawn a fresh upstream session with refined task scope to produce a better handoff, (b) request live clarification from the upstream session author and append the clarification to the handoff, (c) operator override declaring that the work proceeds despite the insufficient handoff.

This outcome is *not* the same as "I disagree with the handoff content" or "I have findings about the handoff." Disagreement is content-level; findings have a normal disposition. Handoff insufficiency is structural — the receiving session structurally cannot do its job because the input does not contain what its mode requires.

The signal is also a learning input. A project that observes its planner-role sessions routinely flagging explorer-handoffs as insufficient on a specific dimension — *"missing dynamic tensions that surfaced during exploration"* — has evidence that its synthesis-ledger encoding norms need to be extended. The runtime does not fix the norms; it surfaces the failure pattern that drives norm refinement.

#### Quality vs. Presence

To be explicit about what this feature does and does not do:

- The runtime *requires* handoff presence per [the encoded-handoff constraint](klappy://canon/constraints/mode-transitions-require-encoded-handoff). Sessions without complete handoffs are refused at submit time.
- The runtime *cannot validate* handoff quality before invocation. Quality is judged by the receiving session, in context, against the actual work it is being asked to do.
- The runtime *does support* the receiving session's structured refusal when quality is insufficient. The signal is the runtime's contribution to the quality-discipline problem; the discipline itself lives in encoding norms.

This is the same pattern as type-checking versus runtime validation in any system: the type system catches some classes of errors statically; runtime validation catches the rest. The encoded-handoff constraint is the type system. Handoff-insufficiency signaling is the runtime check.

---

## What This Method Is Not

**Not orchestration.** The runtime invokes one persona per request. It does not chain personas, route between them, or maintain workflows that span multiple invocations. Orchestration belongs to consumers, not to the runtime. (A consumer can call the runtime multiple times in sequence; that is the consumer's workflow.)

**Not coupling.** A persona profile does not specify *which* substrate hosts it. The same Oddie profile can run on CF Sandboxes, on Managed Agents, on Daytona, or on a local Docker container. The runtime resolves the profile and dispatches to whatever substrate is configured. Substrate choice is a runtime-deployment decision per [Spawned Agent Session Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options); persona authoring is independent.

**Not a CRM for personas.** The runtime is not a directory service, identity provider, or persona-discovery layer. It resolves profiles by URI. Listing, searching, and discovering personas is a separate concern — handled by canon search, by directory pages, or by whatever tooling exists upstream.

**Not a permission system.** Role enforcement is about epistemic-context separation (critic-cannot-be-resolver), not authorization. Whether a *consumer* is allowed to call the runtime is a separate question, handled at a different layer (API keys, OAuth, bearer tokens). The runtime trusts its callers; it just refuses to wire detection sessions with resolver tools.

---

## Prior Art

This pattern is not novel as a category — agent-runtime services and persona-shaped agents are an active design space. The contribution here is the specific composition of constraints, not the existence of the pattern.

Adjacent work this method is aware of:

- **OpenAI Custom GPTs** and **Anthropic Projects** — persona-shaped chat surfaces with system prompts, tools, and knowledge bases. Closest in spirit to persona profiles. Differences: Custom GPTs and Projects target end-user chat surfaces, not programmatic invocation by other services; they do not architecturally enforce role-separation (critic-cannot-be-resolver is left to prompt design); brand-discipline is not mechanically enforced at output time. The runtime pattern targets multi-consumer service composition, not direct human chat.
- **LangChain agent runtimes** and similar SDK-level abstractions — toolkit for assembling agents, often with persona-like configuration. Differences: typically embedded in the consumer's process rather than offered as a hosted service; do not enforce an explicit critic-vs-resolver context boundary; surface-aware output post-processing is left to consumers.
- **Cloudflare Agents SDK** and the **MCP `McpAgent` pattern** — substrate-aware abstractions for hosting agents on Workers. Closer to the substrate layer than to the runtime layer described here; this method composes on top of such abstractions rather than replacing them.
- **Anthropic Managed Agents** — the substrate captured in [Spawned Agent Session Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options). Substrate, not runtime. The runtime pattern is the layer that would sit above Managed Agents (or any other substrate) to multiplex consumers and personas.

The closest prior art is probably Custom GPTs / Projects, characterized as of mid-2026. The runtime pattern's distinguishing commitments are: programmatic-first interface, mechanical role enforcement, mechanical brand discipline at output time, and explicit separation between persona authoring (canon) and runtime engineering (service).

If a respected peer points to closer prior art that already names this composition, the contribution shrinks to "naming and codifying for this knowledge base" — which is still worthwhile as a vocabulary anchor but is not novel design.

---

## Inheritance — Why This Shape

The runtime shape is not original. It is a synthesis of three commitments already canonical:

**[Vodka Architecture](klappy://canon/principles/vodka-architecture)**: substrates win by refusing opinions. The substrate-options catalog stays opinion-free per that principle; this runtime stays opinion-free by pushing opinions up into persona profiles. Every layer above the substrate is removable without wire consequence.

**[Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes)**: each epistemic mode earns its own session because the structural blindness that makes a creator unable to validate their own work, a critic unable to remediate their own findings, and a planner unable to execute their own plan is the same blindness in different shapes. This runtime is the architectural expression of that principle — five mode-bound roles, each with its own session, each refusing to inherit context from prior-mode sessions.

**[Mode Transitions Require Encoded Handoff](klappy://canon/constraints/mode-transitions-require-encoded-handoff)**: every gate between modes requires a journal entry plus a transition-specific durable artifact. This runtime enforces that constraint mechanically by requiring handoff URI inputs on any session whose role is downstream of another role.

**[Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver)**: detection and remediation must be separated by a tool boundary. The runtime enforces this for the validator → resolver transition specifically, refusing mutating tools in validator sessions and requiring a fresh resolver session to act on findings.

**[Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context)**: a creator cannot be their own critic. The runtime enforces this for validator sessions specifically by guaranteeing fresh context — the validator session receives only the persona profile, artifact reference, claims declaration, and governance, never the creator's accumulated reasoning. The same fresh-context guarantee applies generally to every mode-bound role transition under sessions-mirror-modes.

**[Participation Replaces Integration](ams://canon/principles/participation-replaces-integration)**: open substrates collapse connector topology from O(N²) to O(N). Without this runtime, every persona × consumer pair requires its own wiring. With it, N personas + M consumers needs N + M descriptors, not N × M integrations. The runtime is the participation layer that makes the collapse work for agent invocation specifically.

The pattern is also consistent with [Methodology Personification](klappy://canon/principles/methodology-personification): if a methodology becomes more accessible when given a personified voice, the natural follow-up is infrastructure that lets the persona show up everywhere without re-engineering. The runtime is that infrastructure.

---

## First Worked Examples

Two consumers exercise the runtime's role enforcement most directly:

### Oddie (validator and observer across surfaces)

Oddie is the first persona this method targets. He exercises multiple parts of the shape:

- **Role spans validator and observer depending on surface.** Audit findings is `validator` — receives a specific PR or document, evaluates against governance, produces structured findings with dispositions. Real-time stream interpretation is an *observer* session — not a mode-bound role, since Oddie watching live agent traffic does not produce a hand-off artifact for a next mode. Mentorship and strategic translation are also observer-shaped: continuous narrative on something happening elsewhere, not gate-bounded work. The persona profile declares the allowable session shapes; each invocation specifies which is in play.
- **Two capability sources** — operational MCP (oddkit, used for self-hygiene) and knowledge base (klappy.dev, used for grounding). Both registered in every Oddie session.
- **Four surface profiles** — audit, real-time stream interpretation (flagship), mentorship, strategic translation. Each declares its density and verbosity tolerance.
- **Brand discipline** — 🦦 signature, river vocabulary, machine-surface ban, density rule, mode-aware suppression. All mechanically enforceable.
- **Both session types** eventually — the audit surface is `one_shot`; the TinCan flagship is `subscribed`. The runtime needs both.

Implementing the runtime against Oddie validates several parts of the shape but not all. Oddie does not exercise the explorer, planner, builder, or resolver roles — those need a different worked example.

### A Multi-Role Build Workflow (explorer → planner → builder → validator → resolver)

The cleanest exercise of the full five-role taxonomy is a multi-agent build workflow that crosses every gate. Sketched:

1. **Explorer session** — given a goal, surfaces possibilities, tensions, and unknowns. Produces a synthesis ledger entry.
2. **Planner session** — fresh, reads the synthesis. Produces a plan with explicit assumptions, scope, deferred items.
3. **Builder session** — fresh, reads the plan. Produces an artifact plus claims declaration.
4. **Validator session** — fresh, reads the artifact and claims. Produces findings with dispositions.
5. **Resolver session** — fresh, reads the findings. Produces a revised artifact plus remediation summary.
6. **Re-validation session** — fresh, reads the revised artifact and remediation summary. Produces validation pass or new findings.

Each transition produces a journal entry per [the encoded-handoff constraint](klappy://canon/constraints/mode-transitions-require-encoded-handoff). Each session is a fresh substrate spawn with no inherited context from upstream sessions beyond the encoded handoffs. The runtime enforces the role-bound tool restrictions at each step.

This workflow does not yet have a deployed instance. It is the canonical test of the runtime — the smallest workflow that exercises all five mode-bound roles plus the journal requirement. A first deployment that validates the full pipeline produces concrete signal on whether session-per-mode discipline is operationally feasible at the runtime layer.

### The Audit Gate (validator, single-role)

The audit gate that currently runs against AMS PRs is the cleanest validator-role consumer in isolation. It exercises the validator role's enforcement (read-only tools, fresh-context guarantee, structured deliverable per [P0008](klappy://docs/promotions/P0008-pr-validator-dolcheo-ledger-as-deliverable)) without needing the full multi-role pipeline. It is the right first deployment of the runtime because it isolates one role and produces concrete signal on whether validator-role enforcement works in production.

The deployment sequence is therefore:

1. Audit gate as single-role validator deployment — lowest-risk first deployment, validates one role's enforcement.
2. Multi-role build workflow as second deployment — exercises the full five-role pipeline plus journal handoffs.
3. Oddie's TinCan-flagship subscribed-session deployment — exercises the observer pattern and the long-lived session type.

In that order, each deployment validates a distinct dimension of the runtime without trying to validate all dimensions at once.

---

## Open Questions

These are explicitly unresolved. The method describes the shape; the open questions are about parameters that production evidence will tune.

**Subscribed-session backpressure policy.** When stream rate exceeds interpretation rate, what gets dropped, summarized, or queued? The TinCan integration spec flags this as an open question. The runtime has to expose policy — it cannot hide the question — but the right policy is empirical.

**Profile-discovery ergonomics.** How do consumers find available personas? Canon search works for humans; for programmatic consumers, a registry endpoint or a profile-listing convention may be needed. Defer until a second consumer beyond the first deployment exists.

**Versioning semantics.** Profiles are versioned (`oddie@v1`). What happens when `v2` ships? Do existing consumers pin? Auto-upgrade? Receive a deprecation window? The right answer is probably "consumers pin; profile authors emit deprecation notices." Confirm with operator.

**Surface-profile inheritance.** Can a persona's `mentorship` surface profile inherit from another persona's? If two personas share a surface specification, do they share a definition? Premature optimization until two personas exist with overlapping surfaces.

**Multi-knowledge-base grounding.** Oddie grounds in `klappy://`. A future persona might ground in `klappy://` and `ams://` and a private knowledge base simultaneously. The profile schema lists `knowledge_bases` as an array, but the runtime's job in arbitrating between sources is undefined. Defer.

---

## What This Changes for Existing Work

The substrate-options method doc catalogs *where* to host a session. This doc adds *how to build a service that hosts many sessions for many personas*. They compose without overlap.

The audit gate, currently scoped as a single Worker that wraps Claude Code in a CF Sandbox, becomes a specific deployment of this runtime: one persona (audit reviewer), one surface (audit), one substrate (CF Sandbox). The architecture shifts from "the audit Worker" to "the runtime, configured for audit." Same code, different framing — but the framing pays off when the second persona arrives.

Oddie's TinCan integration, currently a draft spec at `ams://docs/oddie/tincan-real-time-guide`, becomes a specific deployment of this runtime: one persona (Oddie), one surface (real-time stream interpretation), substrate to be determined. The integration spec's open questions (throughput, token budget, multi-conversation context) inherit into the runtime's open-questions list above.

Future deployments — a security detector, a docs mentor, a release validator — are new persona profiles plus runtime configuration, not new infrastructure.

---

## Confidence

**Working belief.** Zero production validations. The shape is derived from existing canonical commitments (vodka-architecture, critic-cannot-be-resolver, participation-replaces-integration) and from one designed-but-untested persona (Oddie). The pattern has not yet hosted a real consumer in production.

**What depends on this method being right.** If this shape is the wrong abstraction, the dependent work that has to be re-thought includes: the audit-gate migration off Anthropic Managed Agents (would revert to bespoke Worker per consumer); the TinCan-Oddie integration spec's deployment path (would require its own substrate wiring); and any follow-up persona deployments (security detector, docs mentor, release validator), each of which would duplicate substrate plumbing. The blast radius is significant but bounded — it does not affect AMS, oddkit, or klappy.dev canon themselves; only the agent-invocation infrastructure that sits above them.

**Retraction conditions:**

- If the runtime's overhead (profile resolution, post-processing, role enforcement) measurably degrades performance compared to bespoke per-consumer wiring without producing offsetting benefits in correctness or composability, the abstraction is retracted and consumers wire substrates directly.
- If persona profiles prove too rigid — if every new persona requires schema extensions — the profile concept is retracted in favor of a thinner contract (system prompt + tool list + surface tag, nothing else).
- If role enforcement at the runtime layer produces false-refusals frequently enough to be a friction tax, the enforcement moves back to prompt discipline and a softer warning layer.

**What would falsify the pattern most cleanly.** A second persona deployment that fights the abstraction — i.e., a persona whose natural shape requires schema extensions in three out of five fields, or whose surface profiles do not fit the density-cap model, or whose role does not map cleanly to detection-only/resolver/general. If two well-specified personas cannot share the runtime without per-persona special cases, the abstraction is leaking and should be retracted in favor of thinner contracts.

The retraction conditions are weak by design. The first deployment (audit gate) will surface concrete signal. The second deployment (Oddie on TinCan, or another non-audit persona) is the real test of whether the abstraction holds.

---

## See Also

- [Spawned Agent Session Runtime Contract](klappy://canon/methods/spawned-agent-session-runtime-contract) — the per-session-shape spec this method's runtime responsibilities are implemented against (Tier-2 sibling)
- [Sessions Mirror Modes](klappy://canon/principles/sessions-mirror-modes) — the principle this runtime is the architectural expression of
- [Mode Transitions Require Encoded Handoff](klappy://canon/constraints/mode-transitions-require-encoded-handoff) — the binding rule this runtime enforces mechanically
- [Spawned Agent Session Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options) — the catalog of substrates this runtime sits on top of
- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — the *tool-boundary* constraint this runtime enforces architecturally
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — the *context-boundary* principle this runtime enforces for validator-role sessions
- [P0008 — Fresh-Validator Deliverable Is a DOLCHEO Ledger](klappy://docs/promotions/P0008-pr-validator-dolcheo-ledger-as-deliverable) — the operationalized validator pattern this runtime hosts
- [Epistemic Modes](klappy://canon/epistemic-modes) — the parent canon defining the five modes whose role expressions this runtime supports
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the substrate-discipline this runtime extends to its own layer
- [Methodology Personification](klappy://canon/principles/methodology-personification) — why personas exist as canon objects in the first place
- [Oddie the River Guide — Voice Canon](klappy://canon/voice/oddie-the-river-guide) — the first worked example of a full persona profile
- [TinCan Real-Time Guide — Integration Spec](ams://docs/oddie/tincan-real-time-guide) — the first subscribed-session deployment target
- [Participation Replaces Integration](ams://canon/principles/participation-replaces-integration) — the topology principle this runtime instantiates for agent invocation
- [Voice as Cognitive Load Shedding](klappy://canon/principles/voice-as-cognitive-load-shedding) — why brand-discipline at the runtime layer is structural rather than cosmetic
