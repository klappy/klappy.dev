---
uri: klappy://canon/architecture/substrate-stack
title: "The Klappy Substrate Stack — OSI-Equivalent Layered Architecture for the Program"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "principle", "architecture", "layered-model", "substrate", "vodka-architecture", "orthogonality", "OSI-equivalent", "ams", "tincan", "oddie"]
epoch: E0008.5
date: 2026-05-10
derives_from: "canon/principles/vodka-architecture.md, canon/principles/doing-less-enables-more.md, canon/principles/dream-house-principle.md, ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate, ams://canon/decisions/D0006-dream-house-wire-edge-wrappers, ams://canon/decisions/D0016-buffering-and-persistence-as-wrapper-primitive"
complements: "canon/principles/magical-first-run.md, canon/principles/symmetric-participation.md, canon/principles/creators-get-paid.md, canon/voice/oddie-the-river-guide.md"
governs: "Where any concern, feature, decision, or product lives in the program. The canonical lookup that replaces opinion-fights about which layer should own a responsibility. Applies to AMS substrate work, TinCan and other applications, role-runtimes like Oddie, channel adapters, and economic mechanisms."
status: active
---

# The Klappy Substrate Stack — OSI-Equivalent Layered Architecture for the Program

> Six layers, each with one concern, talking only to neighbors through narrow interfaces. The stack exists so the question "where does X live?" becomes a layer lookup rather than an argument. Every layer can be replaced without disturbing the others. Every layer can be implemented many times by many parties. The stack is the orthogonality contract that lets the substrate stay vodka while the products above it stay opinionated.

---

## Summary — The Architectural Map

The Klappy program builds substrates and the products that ride on them. Without an explicit stack, every architectural conversation re-litigates which layer should own a concern. Should the broker know about identity? Should TinCan ship Oddie? Does the wrapper hold the magic-link, or does the wire? The answers feel obvious in the moment and contradictory across moments. The result is layer-creep: every product accumulates concerns from layers above and below it until the code stops being replaceable.

The substrate stack fixes this by drawing the layers explicitly and binding each to one concern. New decisions look up which layer owns the concern they touch. Cross-layer features are flagged as suspicious by default. The stack is empirical, derived from what the program has actually built (AMS, TinCan, Oddie, the MCP wrapper, the planned channel adapters and agent-economy rails) plus what the working substrates of computing history teach (`canon/principles/doing-less-enables-more.md`).

The model is named "Substrate Stack" rather than copying OSI verbatim because the layers do not match OSI's; the orthogonality discipline is the same.

---

## Outline

- The Six Layers
- The Cross-Cutting Layer: Economy
- How to Use the Stack
- Layer Assignments for Existing Work
- What the Stack Forbids
- Open Questions
- See Also

---

## The Six Layers

### L1 — Wire

The transport layer for frames between accounts. Knows nothing about who, why, or what the frames mean. Ships only the primitives every consumer needs and benefits from being centralized: account credentials, conversation minting, stream attachment, frame delivery, selective subscription. Vodka by definition.

Canonical implementation: AMS. Governing decisions: `ams://canon/decisions/D0006-dream-house-wire-edge-wrappers`, `ams://canon/decisions/D0017-selective-subscription`, `ams://canon/decisions/D0018-multi-stream-per-account-per-conversation`. Buffering and persistence are explicitly NOT wire primitives — they live at L2 per `ams://canon/decisions/D0016-buffering-and-persistence-as-wrapper-primitive`.

### L2 — Wrapper / Adapter

The translation layer between L1 and a specific runtime, channel, or external protocol. Bidirectional. Holds connection state, credential mapping, payload shape, and any runtime-specific resilience logic. Carries no application opinion.

The MCP edge wrapper, which lets MCP-speaking runtimes reach the wire, is the reference implementation. Channel adapters (WhatsApp, Slack, Discord, SMS, email, cron, GitHub) and AI-tool adapters (ChatGPT connector, Cursor, Lovable, n8n) all share this shape: they translate channel-native events into L1 frames and back. Many implementations, single shape.

A wrapper that starts holding application semantics has stopped being a wrapper. The test: can this wrapper be removed and replaced by another implementation of the same shape, without anything above L2 noticing? If no, the wrapper has accumulated concerns from L3 or above and needs trimming.

### L3 — Identity & Convention

The metadata layer that gives peers human-legible identity. Who is on the wire, what role they play, what they can do, what posture they hold (always-on, intermittent, observer). Conveyed through frames the wire transports as opaque content. The wire never reads them; everything from L4 up does.

The canonical convention shape is `ams.convention.v1` (in development): a peer joining a room posts an identity frame declaring name, role, function, model or client information when applicable, posture, and capabilities. Snapshot frames carry the resolved peer roster plus current goal and recent state for late joiners. Completion frames signal end-of-collaboration with evidence.

L3 conventions are open: anyone can adopt them, anyone can extend them, anyone can publish their own. The wire treats every metadata shape identically. The convention's value comes from broad adoption by behavior, never from protocol-level enforcement.

### L4 — Role / Agent

The behavior layer. What a peer does once it is on the wire. Encompasses autonomous agents (ChatGPT, Claude, Grok, custom agents), domain-specialist agents (a code reviewer, a translator, a contract analyzer), and methodology-personification roles (Oddie as river guide, future truthkit-derived roles for other domains).

L4 behavior is canon-driven where the role is methodology-bound. Oddie reads `klappy://canon/voice/oddie-the-river-guide` and the oddkit canon at runtime; his behavior derives from canon, not from hand-coded logic. The L4 runtime is a thin substrate that loads canon and acts on it. This makes L4 roles maintainable by the people who own the canon.

A peer at L4 does not know which L2 brought it onto the wire. Same Oddie role serves a TinCan UI session, a WhatsApp-bridged conversation, and a Slack-bridged team channel. The role wrapper executes the canon; the channel adapter handles the channel surface; neither reaches into the other.

### L5 — Application

The user-facing layer. A specific product that orchestrates roles, identities, adapters, and the wire into a coherent experience. TinCan is L5. A wedding-coordination app would be L5. A regulatory-compliance audit room would be L5. Operators interact with the system at L5.

L5 is where consumer ergonomics live. The "magical first-run" success metric is an L5 property; the wire below is not graded on it. L5 products bundle lower layers into packaged experiences but do not own those layers. TinCan invites Oddie; it does not ship him. TinCan presents identity from `ams.convention.v1`; it does not define the convention.

### L6 — Economy

The value-flow layer. Payment, marketplace, reputation, discoverability, settlement. Cuts across L2 through L5: any peer can be paid, any wrapper can charge, any role can have a price, any application can have tiers. The economy is not stacked above L5 because revenue is not downstream of having an application. A substrate-tier subscriber pays the substrate maintainer without touching any application.

Stripe's 2026 agent-payment rails (`ams://canon/decisions/D0021-stripe-integration-surface`) are the integration surface. Specific economic mechanisms (penny economy, BraigsList agent job marketplace, Penny-onaire's Club, BYOK-with-marketplace-credit) are products built on the rails. The rails are open; the mechanisms are competitive.

---

## The Cross-Cutting Layer: Economy

L6 is drawn as a vertical band rather than a horizontal layer because it touches every other layer:

- **At L1**: Substrate maintainers charge for capacity, hosting, premium tiers, support.
- **At L2**: Adapter authors charge per-message, per-session, or as managed services.
- **At L3**: Identity and reputation services charge for verification, attestation, vouching.
- **At L4**: Role creators charge for agent rental, role-as-a-service, methodology subscriptions.
- **At L5**: Application operators charge for product subscriptions, usage, premium features.

The principle that governs L6 (`canon/principles/creators-get-paid.md`) requires that every layer's actor can be paid for value they actually provide, and that the substrate never extracts a tax from the layer above it for using the rails. Substrate maintainers monetize substrate-tier services; creators above monetize their own creations.

---

## How to Use the Stack

When deciding where a feature, concern, or product should live:

1. Identify the concern. Phrase it as one sentence.
2. Find the lowest layer that can hold the concern without compromising its role.
3. If the concern straddles two layers, suspect that the concern is actually two concerns and split it.
4. Verify the layer assignment against the layer's stated role above. If the concern adds an opinion the layer is supposed to refuse (a wire deciding identity, a wrapper deciding goal semantics), the assignment is wrong.
5. Ship at the chosen layer. Every other layer should be unaware of the change.

Example: snapshot-on-join (deliver outcome and peer roster to a fresh joiner). The concern is "give a joining peer enough context to participate." This is L3 (it provides identity and convention) plus L4 (the role that posts the snapshot). The wire transports the snapshot frame as opaque content; L3 defines the schema; L4 (Oddie or another facilitator role) actually emits the snapshot. L1 stays out. L5 displays the snapshot in its UI but does not generate it.

Example: "stay connected" persistence for a turn-based agent. The concern is "the wire perceives reconnects from the same logical agent as continuity." This is L1 (stream-name-based resumption is a wire feature) plus L2 (the wrapper assigns a stable stream name based on consumer label). L3 conveys posture as `intermittent` so observers know the rejoin pattern is normal. L4 and L5 stay unaware.

---

## Layer Assignments for Existing Work

| Concern | Layer | Implementation |
|---|---|---|
| AMS broker (frame transport, account, conversation, stream) | L1 | `klappy/agent-messaging-service` |
| MCP edge wrapper | L2 | `worker/src/mcp.ts` in AMS repo |
| Magic-link auth (D0030) | L2 | wrapper-resident; binding_id is a planned L2 ergonomic |
| `ams.convention.v1` peer identity | L3 | TBD canonical convention doc |
| Snapshot / outcome / completion frames | L3 schema, L4 emission | TinCan + Oddie |
| Oddie the role | L4 | `klappy/oddie` (planned) |
| Truthkit-derived roles | L4 | future, multi-tenant L4 runtime |
| TinCan portal and UI | L5 | TinCan-the-app |
| Penny economy, Penny-onaire's Club, BraigsList, BYOK | L6 | proposal-tier (encode-12 in AMS journal) |
| Stripe integration surface | L6 | `ams://canon/decisions/D0021-stripe-integration-surface` |

---

## What the Stack Forbids

The stack rejects three classes of move on sight:

1. **Wire opinions about peer type.** L1 must treat every peer through identical primitives. Special-casing humans, agents, channel adapters, or roles at L1 is the slippery slope `canon/principles/symmetric-participation.md` exists to forbid.

2. **Wrapper application semantics.** L2 must remain a translator. A wrapper that decides what an outcome looks like, what a goal means, or how a collaboration should proceed has crossed into L4 or L5 territory and broken its replaceability.

3. **Application-layer features inside the substrate.** L1 must not ship features that compete with the third-party ecosystem the substrate is meant to enable. This is the one-way door commitment in `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate`.

The stack permits and encourages reference implementations at each layer (the MCP wrapper at L2, Oddie at L4, TinCan at L5) when they bootstrap an ecosystem without crowding out independent implementations of the same shape.

---

## Open Questions

- **L3 convention authority.** Who curates `ams.convention.v1`? A single repo, a federation, or anyone-publishes-their-own with adoption deciding which version wins? Lean: the latter, with klappy.dev publishing a reference convention as one option among many.
- **L4 runtime abstraction.** The first L4 implementation is Oddie, scaffolded for one role. Once two roles ship, the shared abstraction (a canon-driven-agent wrapper) becomes the next vodka layer. Naming and home for that abstraction is not yet canon.
- **Truthkit's relationship to the stack.** Truthkit appears to be an L4-source-canon for non-Klappy domains, parallel to oddkit. Its place in the stack is implied but not yet documented in canon.
- **L6 sub-structure.** Payment rails, marketplaces, reputation, and discoverability are distinct enough that L6 may want sub-layers. Deferred until a second economic mechanism ships and contrast forces the structure.

The stack is `stability: evolving`. It is the starting point, not the end state. Iteration comes from contact with reality.

---

## See Also

- `canon/principles/vodka-architecture.md` — the design discipline this stack operationalizes
- `canon/principles/doing-less-enables-more.md` — the empirical claim that justifies thin substrate layers
- `canon/principles/dream-house-principle.md` — the wrapper boundary that defines L1↔L2
- `canon/principles/magical-first-run.md` — the L5 success criterion
- `canon/principles/symmetric-participation.md` — the L1 invariant
- `canon/principles/creators-get-paid.md` — the L6 commitment
- `canon/voice/oddie-the-river-guide.md` — the L4 role-canon for the program's first role
- `ams://canon/decisions/D0006-dream-house-wire-edge-wrappers` — the L1↔L2 architectural commitment in AMS
- `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` — the substrate-not-application positioning that L1 inherits
- `ams://canon/decisions/D0021-stripe-integration-surface` — the L6 payment-rail integration
