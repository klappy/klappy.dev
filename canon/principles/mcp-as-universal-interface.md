---
uri: klappy://canon/principles/mcp-as-universal-interface
title: "MCP as a Universal Interface — Every User, Full Parity"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "vision", "mcp", "parity", "interface", "surfaces", "authz", "vodka-architecture", "ars", "director-chair", "captain-approved", "e0010"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/the-directors-chair-vision.md, canon/architecture/substrate-stack.md, canon/principles/vodka-architecture.md, canon/principles/symmetric-participation.md, canon/principles/capability-is-not-permission.md, canon/constraints/reviewability-standard.md, odd/maturity.md"
complements: "canon/methods/persona-shaped-agent-runtime.md, writings/artifacts-are-projections.md, docs/decisions/D0017-oddkit-write-path.md, writings/habits-die-slower-than-tokens.md"
governs: "How every product in the program exposes its capabilities to agents: the MCP connector is a first-class, permission-equal interface at full parity with the GUI, not a bolted-on chatbot. Sets the five constraints that make full parity sound."
status: active
target_repo: "outcomes-driven-development"
---

# MCP as a Universal Interface — Every User, Full Parity

> The captain's framing, 2026-07-09: give **every** user the product's MCP connector, so that everything they can do in the graphical interface they can also do through Claude, ChatGPT, or any agent. When a user doesn't know how to do something, they ask the agent — and because the MCP server hands the agent the product's own current policy and docs, any agent has 100% coverage to both *guide* the user and *perform* the action. The GUI stops being the product and becomes **one projection** over a shared capability surface; the agent is a first-class, equal interface beside it. Five constraints (Otto's analysis, captain-endorsed) make this sound and are doctrine, not footnotes: **(1) authz parity** — the tools enforce the same permissions as the GUI, never a backdoor; **(2) reads before writes** — ship read-parity everywhere first, ride write-parity behind the GUI's own confirmations and irreversibility holds; **(3) one capability core** — GUI and MCP are thin projections over the same functions, never two implementations; **(4) served-policy keystone** — the agent guides from the authoritative policy the server serves, not the model's guess; **(5) attribution** — every agent-driven action carries provenance. This is the product embodiment of the director's-chair/substrate thesis: the human directs, the agent acts, and the capability is one thing wearing many faces.

## Summary

Most products bolt a chatbot onto a finished GUI. The chatbot can answer questions about the product but cannot *do* the product, and when it can act it usually acts through a second, thinner code path that drifts from the real one. This doctrine rejects that shape. The MCP connector is not an assistant grafted onto the edge of the application — it is a **peer interface** to the same capability core the GUI renders, offered to every user by default, at full parity.

"Full parity" is a strong claim, and the strength is the point: anything a user can accomplish by clicking, they can accomplish by asking an agent, and anything they don't know how to do, they can learn from the agent because the server hands that agent the product's own live documentation and policy. Coverage is total in both directions — the agent can *guide* (it holds the docs) and *act* (it holds the tools). This is `writings/artifacts-are-projections` applied to the interface itself: the GUI is a map printed from the capability core, and the MCP connector is another map printed from the same core. Neither is the territory.

Parity of this kind is only safe under five constraints, drawn from Otto's analysis and endorsed by the captain. They are stated here as first-class doctrine because each one, if dropped, turns "full parity" into a liability: authz parity keeps parity from becoming a permission bypass; the reads-before-writes sequence keeps the low-risk half shipping while the high-risk half stays gated; one capability core keeps the two faces from disagreeing and the agent from misguiding; the served-policy keystone keeps the agent's guidance current instead of hallucinated; and attribution keeps every agent action accountable. Together they are what let the agent be a *first-class* interface rather than a dangerous one.

## The thesis — the GUI is a projection, not the product

The program's spine holds that artifacts are projections over a stable source (`writings/artifacts-are-projections`), and that the substrate stays neutral so the products on top can be opinionated (`canon/architecture/substrate-stack`, `canon/principles/vodka-architecture`). Applied to a product's own interface, the consequence is direct: the graphical interface is not the product. The product is the **capability core** — the set of functions that read and change the product's state. The GUI is one rendering of that core for human hands. The MCP connector is another rendering of the same core for agent hands.

Once the interface is understood as a projection, the historical asymmetry — humans get the whole product, agents get a chat box that can answer FAQs — stops being natural and starts looking like an accident of sequencing. There is no principled reason the human projection should be complete and the agent projection partial. The thesis corrects the asymmetry: **both projections are complete, and both are offered to every user.**

This connects directly to `canon/principles/symmetric-participation`. On the wire, every peer reaches the substrate through identical primitives; no peer type is privileged. This doctrine is that same refusal-to-privilege, one layer up at the application: no *interface* type is privileged. The human's clicks and the agent's tool calls are two ways onto the same capability core, and the core cannot tell — and must not care — which one it is serving. Symmetric participation at L1 has a mirror at L5, and this doctrine is that mirror.

The user-facing payoff is the "ask the agent" loop. A user who does not know how to do something in the product does not file a ticket, hunt through docs, or abandon the task. They ask the agent, in the client they already live in (Claude, ChatGPT, Cursor, wherever). Because the server serves the product's own policy and docs to that agent, the agent can walk them through it *and* do it for them — full coverage to guide and to act, from one connection. The GUI's discoverability problem and the product's support burden both dissolve into the same surface.

## The five constraints — doctrine, not footnotes

### 1. AuthZ parity — the tools enforce the same permissions as the GUI

The MCP tools MUST inherit the exact authorization model the GUI enforces — org scoping, role scoping, per-object permissions — and MUST NOT offer any path that the GUI would deny. The captain names this the **D6 access model** applied to the interface: the org/role scoping the product already enforces is *inherited* by the connector, never skipped. 100% capability coverage explicitly **includes 100% of the permission model.** An agent acting for a viewer sees what a viewer sees; an agent acting for an admin can do what that admin can do; neither can exceed the human whose seat it occupies.

This is the interface-level statement of `canon/principles/capability-is-not-permission`: a frictionless tool is not a grant of new authority. The connector makes the capability *reachable by asking*; it does not make anything *permitted* that was forbidden at the GUI. A parity that leaked permissions would not be parity — it would be a backdoor wearing parity's clothes. The test is symmetrical and total: for every action, the answer to "may this actor do this?" is identical whether the actor arrives through the GUI or through an agent.

### 2. Reads before writes — ship the low-risk half everywhere first

Read-parity and write-parity have different risk profiles and MUST be sequenced accordingly. **Read-parity is low-risk and high-value; ship it everywhere first.** An agent that can see everything the GUI can show — the user's data, state, and context — is already transformative and carries little downside, because reads do not change the world. **Write-parity — deletes, submits, publishes, anything that mutates or is irreversible — rides behind the same confirmations and irreversibility holds the GUI already has.** The connector does not invent a faster, quieter path to destructive actions; it routes them through the product's existing guardrails.

The pattern is **read by default, write by asking**, and it has direct precedent in the program. The oddkit write path (`docs/decisions/D0017-oddkit-write-path`) is exactly this: read is open, write is one action behind progressive protection. The GitAuth pattern (`writings/habits-die-slower-than-tokens`) is the same posture at the credential layer — a token is read-only unless write is explicitly, narrowly requested. Write-parity is further modulated by maturity (`odd/maturity`): what is a shrug at Level 0 is a held breath at Level 2, and the irreversibility holds tighten as the product carries real users and real data.

### 3. One capability core — GUI and MCP are thin projections over the same functions

There MUST be exactly one implementation of each capability, and both the GUI and the MCP tools MUST call it. Two implementations rot: they drift apart, and the day they disagree is the day the agent confidently guides the user to an outcome the GUI would never produce — the agent *misguides*, and trust is spent. A second write path is not a convenience; it is a latent contradiction waiting for load.

This is `canon/principles/vodka-architecture` at the product layer: **one enforcer, many faces.** The capability core is the flavorless base — one chokepoint that owns what the product can actually do; the GUI and the connector are opinionated projections rendered over it. The permission checks, the business rules, the side effects live once, in the core, and every face inherits them by construction. When the rule changes, it changes in one place and both faces move together. Parity is not something you maintain by hand across two codebases; it is something you *get for free* when there is only one codebase to project from.

### 4. Served-policy keystone — the agent guides from served policy, not its guess

When the agent guides a user, it MUST guide from the product's **current, authoritative policy and documentation, served to it by the MCP server** — not from the model's training-time recollection of how the product works. This is the keystone constraint: it is what makes "100% coverage to guide" true rather than aspirational. A model's guess about a product's current behavior is stale by construction and wrong at the worst moments — right after a change. Served policy is always current, because it is fetched at the moment of use.

This is the oddkit prompt-over-code pattern (`canon/principles/vodka-architecture`, prompt-over-code) applied to product help: governance and guidance are documents the server hands over at runtime, never logic baked into the model or the client. The server is the vodka layer; the product's live docs are the flavor. This constraint is **non-negotiable** — it is the difference between an agent that reliably teaches the product and one that fabricates plausible-sounding instructions. Everything else in the doctrine can degrade gracefully; this one cannot be dropped without the guidance promise collapsing.

### 5. Attribution — every agent-driven action carries provenance

Every action taken through the connector MUST carry provenance: **which user, which agent, what was done.** An agent acting on a user's behalf is not anonymous and is not the user — it is a named actor operating under a delegation, and the record must say so. Without attribution, parity becomes an accountability hole: actions appear in the product's history with no way to distinguish a human click from an agent call made on the human's behalf, and no way to trace which agent did what.

This ties to the program's agent-identity and attestation work — the same discipline that assigns provenance to agent-authored commits and requires the runtime substrate to attest who acted. Under Epoch 10 (Flight Crew), the crew acts and the black box records; attribution is that black box at the product's interface. It is also what makes the write half auditable enough to trust: an irreversible action is far more acceptable when its provenance is unforgeable.

## What exists already — this is not greenfield

The doctrine is a name for a direction the program is already moving, not a proposal from zero.

The **surfaces model** already distinguishes agent-native surfaces from human surfaces bridged by adapters (`canon/architecture/substrate-stack`, L2 wrapper/adapter; `docs/planning/horizon-surfaces-where-the-loop-runs-next`). This doctrine sharpens that model at the application layer: the agent-native surface and the human surface are two projections of one capability core, and full parity is the requirement that neither projection be starved.

The **read half is already proven.** The captain names the **3D data connector, deployed today,** as the standing proof: an MCP connector that already gives agents read-parity over the product's data. Read-parity is not a hypothesis in this program — it is running. What the doctrine adds is the mandate to make read-parity universal and to sequence write-parity in behind it.

The **write half has its substrate.** ARS — the persona-shaped agent runtime (`canon/methods/persona-shaped-agent-runtime`), the harness the program is standing up — is the layer that enforces authz and carries attestation for actions taken by agents. The captain's framing of **ARS multitenancy** is what lets one runtime host many users' delegated actions while keeping each user's authz and provenance separate. Constraints 1 and 5 — authz parity and attribution — are not new machinery to be invented; they are ARS's job, applied at the product's interface. The maturity-scaled gate policy (`odd/maturity`) supplies the irreversibility holds that constraint 2 rides behind.

Framed whole: this doctrine is the **product embodiment of the director's-chair/substrate thesis** (`canon/the-directors-chair-vision`). The director sits and speaks; the crew of agents runs the work; the substrate stays neutral so the products stay open. "MCP as a universal interface" is what that thesis looks like from inside a single product — the human directs through whichever face they prefer, the agent is a first-class equal interface, the capability is one core wearing many faces, and value and control stay with the user whose seat the agent occupies.

## Operating Constraints

- The MCP connector MUST be offered to every user of the product, not a premium or developer-only tier — parity is universal or it is not parity.
- MCP tools MUST enforce the identical authorization model as the GUI (org/role/object scoping inherited, never skipped); no tool may expose a path the GUI would deny.
- Read-parity SHOULD ship first and broadly; write-parity MUST ride behind the GUI's existing confirmations and irreversibility holds, scaled by maturity.
- GUI and MCP MUST call one shared capability core per function; a second implementation of any capability is a defect, not a convenience.
- Agent guidance MUST derive from server-served current policy and docs, never the model's recollection.
- Every agent-driven action MUST record provenance: acting user, acting agent, action taken.

## Failure Modes

- **Chatbot-on-the-side**: an assistant that can answer questions about the product but cannot do the product, or does it through a separate thin path — the shape this doctrine exists to reject.
- **Parity-as-backdoor**: MCP tools that reach actions the GUI would deny, skipping org/role scoping — capability parity without permission parity.
- **Two cores that drift**: GUI and MCP each with their own implementation; the agent confidently guides the user to an outcome the GUI would never produce.
- **Guessed guidance**: the agent instructing the user from training-time memory instead of served policy, stale exactly when the product just changed.
- **Anonymous action**: agent-driven writes landing in the product's history indistinguishable from human clicks, with no provenance to trace.
- **Write-parity shipped flat**: destructive actions exposed with the same friction as reads, bypassing the confirmations and irreversibility holds the GUI enforces.

## Verification

- For a representative set of actions, the answer to "may this actor do this?" is identical through the GUI and through the connector — including denials.
- Every user of the product can reach the connector; it is not gated behind a tier.
- Read operations have parity coverage; write operations route through the same guardrails the GUI uses, and their gating tightens with maturity.
- A capability changed in the core changes in both faces with no separate edit.
- Agent guidance cites served policy; disabling the served policy visibly degrades guidance rather than substituting a guess.
- The product's action log distinguishes agent-driven actions and names the user and agent for each.

## Scope and Standing

This is the captain's vision, in his framing, dated 2026-07-09 and endorsing Otto's five-constraint analysis — not an independently verified claim about a shipped system. Its **scope** is the product-interface layer (L5 projections over a capability core); it is not a claim about the wire (L1 symmetric participation already governs that) nor about any specific product's current internals.

Several terms are the **captain's naming**, recorded here as his vocabulary and anchored to observed canon where it exists: the **D6 access model** (org/role-scoped access, anchored in `canon/principles/capability-is-not-permission`), **ARS multitenancy** (the persona-shaped runtime hosting many users' delegated actions, `canon/methods/persona-shaped-agent-runtime`), and the **3D data connector** as the deployed read-half proof. The 3D data connector's deployment is asserted on the captain's authority; this doctrine does not independently verify it. The nearest **prior art** is ordinary "API parity" — this doctrine is distinguished from it by three things API parity does not require: universality (every user, not developers), permission parity (100% of the authz model, not just the capabilities), and the served-policy keystone (guidance from live server-served docs, not the caller's knowledge).

**Retraction condition.** The doctrine should be revised if the one-capability-core constraint proves impractical at scale (forcing a defensible second implementation), or if served policy cannot be kept current enough to make guidance trustworthy — either would break a load-bearing constraint and the parity promise with it.

## See Also

- [The Director's Chair — The Whole Vision, Whole](/canon/the-directors-chair-vision.md) — the thesis this doctrine embodies at the product layer
- [The Klappy Substrate Stack](/canon/architecture/substrate-stack.md) — surfaces, adapters, and the six layers
- [Vodka Architecture](/canon/principles/vodka-architecture.md) — one enforcer, many faces; prompt over code
- [Symmetric Participation](/canon/principles/symmetric-participation.md) — no privileged peer type on the wire; this doctrine's mirror at L5
- [Capability Is Not Permission](/canon/principles/capability-is-not-permission.md) — the authz-parity constraint's home
- [Reviewability Standard](/canon/constraints/reviewability-standard.md) — and its companion legibility standard
- [Persona-Shaped Agent Runtime](/canon/methods/persona-shaped-agent-runtime.md) — ARS, the substrate for the write half
- [Project Maturity & Progressive Governance](/odd/maturity.md) — the irreversibility holds write-parity rides behind
- [D0017 — oddkit Write Path](/docs/decisions/D0017-oddkit-write-path.md) — read by default, write by asking, in the program's own tooling
- [Habits Die Slower Than Tokens](/writings/habits-die-slower-than-tokens.md) — GitAuth: the same read/write posture at the credential layer
- [Artifacts Are Projections](/writings/artifacts-are-projections.md) — the interface as a projection over a stable core
