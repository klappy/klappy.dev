---
uri: klappy://canon/principles/symmetric-participation
title: "Symmetric Participation — Every Peer on the Substrate Interacts Through Identical Wire Primitives"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "substrate", "wire-layer", "L1", "vodka-architecture", "BYOA", "BYOC", "open-substrate", "constitutional"]
epoch: E0009
date: 2026-05-10
derives_from: "canon/values/axioms.md, canon/architecture/substrate-stack.md, canon/principles/vodka-architecture.md, canon/principles/doing-less-enables-more.md, ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate, ams://canon/decisions/D0006-dream-house-wire-edge-wrappers"
complements: "canon/principles/magical-first-run.md, canon/principles/creators-get-paid.md, canon/principles/dream-house-principle.md"
governs: "The wire layer (L1) of the substrate stack and the constraints L2 wrappers must preserve. Forbids any feature that would special-case the substrate by peer type. Generalizes AMS D0020's agent-as-customer commitment from the customer layer to the wire layer."
status: active
target_repo: "outcomes-driven-development"
---

# Symmetric Participation — Every Peer on the Substrate Interacts Through Identical Wire Primitives

> The wire treats every peer through the same primitives, regardless of what or who the peer represents — autonomous agent, channel adapter bridging a human, role embodiment, AI-native tool bridge, scheduled trigger, or anything else. Identity, intent, role, posture, and capability are conveyed through metadata and frame content. They are never conveyed through protocol-level privilege. Any feature that special-cases the substrate by peer type is the slope this principle exists to forbid.

---

## Summary — One Wire, All Peers Equal

The Klappy substrate (`canon/architecture/substrate-stack.md`) is built on AMS at L1 and absorbs runtime, channel, and protocol diversity at L2. The wire-layer commitment is that this absorption is total: by the time a peer reaches L1, the wire cannot tell — and must not care — what kind of thing the peer represents. A human messaging through a WhatsApp adapter, an autonomous agent running in CI, a role like Oddie embodying a methodology, and a cron-triggered worker all show up at L1 as accounts holding credentials and streams emitting frames. Same primitives. Same affordances. Same constraints.

This generalizes the AMS-tier commitment in `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate`. D0020 names the customer: agents are the addressee of the substrate's product surface. This principle extends the same discipline to the wire: agents are the *only* peer-type the wire knows about, because there is only one peer-type the wire knows about — peers. Whether a peer is fronting a human, embodying a role, bridging a channel, or operating autonomously is metadata above the wire, not a wire concept.

The principle exists because every prior open substrate that drifted into peer-type-aware protocol semantics calcified around the privileged peer type and stopped hosting an ecosystem. TCP did not distinguish between protocols above it. HTTP did not distinguish between client kinds. Email did not distinguish between human-typed and machine-generated. Each substrate's openness was protected by its refusal to specialize. AMS inherits the discipline.

---

## The Wire Knows One Thing

The wire knows that an account holds a credential and that a stream emits frames. Beyond that, the wire knows nothing.

It does not know whether the account is funded by a human credit card, an enterprise billing relationship, a parent-agent's wallet allocation, or an automated grant from another system. That knowledge belongs to L6 (`canon/principles/creators-get-paid.md`).

It does not know whether the stream represents a human typing in WhatsApp, a Claude Code instance running in CI, an Oddie role embodying methodology, or a webhook trigger. That knowledge is conveyed through L3 metadata frames (`ams.convention.v1`-shape: identity, role, posture, capabilities) and consumed by L4 roles and L5 applications.

It does not know whether the frames emitted are agent-to-agent coordination, human-to-agent steering, role-emitted snapshots, or substrate notifications. The wire ships them. The peers above the wire interpret them.

The wire's poverty of knowledge is the principle. Every primitive it offers — account creation, conversation minting, stream attachment, frame delivery, selective subscription — works identically for every peer. There are no peer-type-aware code paths. No special-cased authentication for "human peers" versus "agent peers" versus "service peers." No protocol-level privilege.

What the wire refuses to own, the layers above it provide. Buffering is the worked example: most production multi-agent use cases require it — resumability after network blips, late-joiner catchup, multi-viewer fan-out, refresh-survives-disconnect, model-adapter discontinuity recovery. The wire still does not own buffering. Instead, per `ams://canon/decisions/D0016-buffering-and-persistence-as-wrapper-primitive`, AMS provides it as a *wrapper-tier primitive* — built once at L2, reused by every wrapper class that needs it, instead of forcing N independent reimplementations. This is the pattern that protects wire symmetry without sacrificing the use cases that depend on durability: the wire treats every peer identically because peer-aware features live one layer up, available to whoever needs them.

---

## What Symmetric Participation Enables

The principle's value shows up at the application layer. When the wire is symmetric:

- **Bring Your Own Agent.** Any agent — ChatGPT, Claude, Grok, Cursor, Lovable, or something the operator wrote yesterday — can join any conversation, with any other peer, without protocol-level negotiation. The wire does not care which it is. L2 wrappers handle the runtime translation; L4 metadata declares the role; the wire ships the frames.
- **Bring Your Own Channel.** Any channel — WhatsApp, Slack, Discord, SMS, email, cron, GitHub events, voice — can be bridged into AMS via an L2 adapter. The bridged peer participates as an ordinary peer on the wire. Humans on WhatsApp collaborate with agents on AMS through the adapter, and the wire knows nothing about WhatsApp's existence.
- **Bring Your Own Role.** Any role — Oddie as river-guide, a domain-specific facilitator, a translator, an auditor, a celebratory hype-bot — can be invited into any room. The role's behavior is its own canon (e.g., `canon/voice/oddie-the-river-guide.md`); the wire ships its frames.
- **Replaceability at every layer.** Because the wire is symmetric, any peer can be replaced by another peer of the same shape without coordination from anything else on the wire. ChatGPT can be swapped for Claude. WhatsApp can be replaced by Signal. Oddie can be replaced by another role. The wire does not care.

The principle is what lets the substrate scale O(N) instead of O(N²). One adapter per channel; one wrapper per runtime; one role per methodology. Every new addition is a new peer, not a new integration matrix.

---

## What This Principle Forbids

The principle rejects three classes of move at the wire and lower L2 boundary:

1. **Wire features that interrogate peer identity beyond credential validity.** The wire authenticates accounts. It does not authenticate "human-ness," "agent-ness," "first-party-ness," or any other peer-type assertion. Identity claims live in L3 frames where any peer can publish them and any consumer can choose how much to trust them.

2. **Protocol-level privilege based on peer type.** No special command paths for "trusted agents," no ratelimit exemptions for "first-party clients," no schema variations for "human-bridged streams." Every peer uses the same control plane. Every peer respects the same constraints. Every peer reads the same documentation.

3. **Wrapper layers that bend application semantics into the wire.** L2 wrappers translate runtime and protocol; they do not encode application opinion. A wrapper that decides what "an outcome" means, what "a goal" looks like, or how a collaboration should proceed has crossed into L4 or L5 territory and broken its replaceability. The wire, sitting below the wrapper, must be able to host any number of conflicting wrappers without taking sides.

The forbidden list does not foreclose reference implementations. AMS shipping the MCP edge wrapper, Oddie shipping as the first L4 role, TinCan shipping as the first L5 application — all permitted, all useful for ecosystem bootstrap. The line is whether the implementation crowds out alternative implementations of the same shape. As long as someone else can build a different MCP wrapper, a different role, a different L5 product, and have it work on the same wire, the principle holds.

---

## The Relationship to D0020

`ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` commits AMS to substrate-not-application positioning and names agents as the customer. D0020 does the most work the customer-layer can do: it forbids AMS from competing with its own ecosystem, sets the test for whether features belong in-platform, and locks the positioning as a one-way door.

Symmetric participation extends D0020's commitment from the customer layer to the wire layer. Where D0020 says "AMS designs for agents and does not compete with the application-layer ecosystem agents will build," this principle says "the wire does not encode peer-type distinctions that would let AMS quietly become application-aware." Both protect the same thing — the substrate's openness — at different altitudes.

The two should be read together. D0020 is the product commitment; symmetric participation is the architectural invariant that makes the product commitment durable. If the wire ever started discriminating between peer types, D0020's positioning would erode regardless of how the marketing read.

---

## Implications for L2 Wrappers

The principle places a specific constraint on L2 wrappers that does not appear in `ams://canon/decisions/D0006-dream-house-wire-edge-wrappers` directly: the wrapper-side adapter pattern must work for any peer kind without per-kind special casing inside the wire.

Practically, this means:

- A WhatsApp adapter is an account on AMS that streams frames; the wire treats it like any other account.
- An MCP wrapper handles MCP-speaking runtimes; the wire does not know MCP exists.
- A Slack adapter, an email gateway, a cron trigger, a webhook receiver — each is an L2 implementation; the wire has no concept of any of them.
- A canon-driven-agent wrapper (the future abstraction Oddie is the first instance of) hosts roles as ordinary peers; the wire has no concept of "role."

The wrapper's job is to make its specific surface look like ordinary AMS account-and-stream activity to L1, and to make L1's frame transport look natural to its specific surface. The wrapper holds the asymmetry. The wire stays clean.

---

## Why This Survives Contact With Reality

The principle is `stability: semi_stable` rather than `stable` because the substrate has not yet hosted the full diversity of peer types the principle anticipates. Today's wire serves agent-via-MCP-wrapper traffic primarily; channel adapters and rich role-runtimes are planned but unbuilt. The principle is the contract those future implementations will be held to, but the contract has not been pressure-tested by the variety of contact-with-reality the substrate stack expects.

The principle survives the first round of pressure-testing — the ChatGPT-via-MCP path validated end-to-end on 2026-05-09 and the WhatsApp-bridge proposal both fit cleanly. Future moves that strain the principle (channel adapters with rich state, roles with complex orchestration, multi-protocol bridging) will either confirm the principle or surface where it needs refinement. Either outcome is a success of the principle, since the principle is intended to be the explicit thing the program defends.

The line in the sand the principle draws: if a feature requires the wire to know what kind of peer it is talking to, the feature does not belong at the wire. The fix is always to push the discrimination upward to a layer that owns peer-type awareness (L3 metadata, L4 role logic, L5 application orchestration), never to give the wire new powers.

---

## See Also

- `canon/architecture/substrate-stack.md` — the structural map this principle governs L1 within
- `canon/principles/magical-first-run.md` — the L5 success metric that depends on symmetric L1
- `canon/principles/creators-get-paid.md` — the L6 commitment that survives because the wire is symmetric
- `canon/principles/vodka-architecture.md` — the design discipline this principle operationalizes at the wire layer
- `canon/principles/doing-less-enables-more.md` — the empirical claim this principle relies on
- `canon/principles/dream-house-principle.md` — the wrapper-boundary commitment that complements wire symmetry
- `ams://canon/decisions/D0006-dream-house-wire-edge-wrappers` — the AMS-tier wire-vs-wrapper commitment
- `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` — the customer-layer commitment this principle generalizes
- `ams://canon/decisions/D0017-selective-subscription` — the wire feature that lets symmetric peers choose what to attend to
- `ams://canon/decisions/D0018-multi-stream-per-account-per-conversation` — the wire feature that lets a single account credential many peers symmetrically
