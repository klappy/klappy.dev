---
uri: klappy://canon/principles/magical-first-run
title: "Magical First-Run — Non-Technical Operators Must Reach Useful Agent Collaboration in Under a Minute"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "ux", "first-run", "non-technical-users", "L5", "applications", "tincan", "magic", "60-seconds", "constitutional"]
epoch: E0009
date: 2026-05-09
derives_from: "canon/values/axioms.md, canon/architecture/substrate-stack.md, canon/principles/vodka-architecture.md, canon/principles/maintainability-one-person-indefinitely.md"
complements: "canon/principles/symmetric-participation.md, canon/principles/creators-get-paid.md, canon/voice/oddie-the-river-guide.md, canon/principles/methodology-personification.md"
governs: "Application-layer (L5) products in the klappy ecosystem. The success metric for any user-facing application built on the substrate. Does not govern substrate-layer (L1-L4) canon, which is graded on dial-tone correctness rather than consumer ergonomics."
status: active
---

# Magical First-Run — Non-Technical Operators Must Reach Useful Agent Collaboration in Under a Minute

> Any user-facing application built on the Klappy substrate must be reachable, useful, and intelligible to a non-technical operator within sixty seconds of first contact, without protocol explanation. The success metric is unprompted use of the words *easy* and *magical* by people who have never seen the system before. Anything less means the substrate's value is gated behind technical literacy the substrate exists to make unnecessary.

---

## Summary — The User-Facing Promise

The Klappy substrate (`canon/architecture/substrate-stack.md`) is plumbing. Plumbing has no value to a person staring at a faucet that doesn't pour water. The substrate's value to non-technical operators is realized only at L5 — the application layer — where products orchestrate roles, identities, adapters, and the wire into experiences a person can use. This principle defines what "use" has to mean.

The bar is not "the application works." The bar is "the application feels like it works the way the user already expected things to work." A non-technical operator opens TinCan (or any future L5 product), states an intent in plain English, and is collaborating with an agent within sixty seconds. They do not learn what AMS is. They do not configure adapters. They do not introduce themselves to a stream. The system carries the protocol; the user carries the goal.

Anything that breaks this — unexplained jargon, multi-step setup, blank rooms, opaque participant lists, missing context, agent silence, repeated permission modals — fails the principle regardless of how technically correct the underlying substrate is. The substrate's correctness is necessary; this principle is what makes it useful.

---

## Outline

- The Sixty-Second Test
- The Success Metric Is Linguistic
- What This Principle Forbids at L5
- Why Non-Technical Operators First
- The Bridge That Makes This Possible
- How the Stack Supports It
- See Also

---

## The Sixty-Second Test

A non-technical operator opens an L5 application for the first time. The clock starts when the URL loads. By the time sixty seconds have passed, all of the following must be true:

1. The user has stated their intent in plain English.
2. The application has accepted the intent and committed to acting on it (or has clearly declined and explained why in plain language).
3. At least one peer is present in the room with the user — agent, role, or otherwise — and is engaging with the stated intent.
4. The user understands who is in the room and what each peer brings, without reading documentation.
5. The user has performed at least one productive action toward their goal — sent a steering message, made a choice, accepted a clarifying question.

Sixty seconds is the budget. Most of it should be human-paced: stating intent, reading the response, processing what the agent said. Almost none of it should be configuration, setup, or protocol.

---

## The Success Metric Is Linguistic

Engineering metrics (time-to-first-message, completion rate, retention) are downstream signals. The leading metric is what users say when they describe the experience to someone else. The principle is satisfied when a user, asked "what was that like?", uses words like:

- *Easy*
- *Magical*
- *Like talking to a person*
- *Just worked*
- *I get how to use this*

The principle is not satisfied when users say:

- *Confusing*
- *I don't know what's happening*
- *Why are there so many random names?*
- *What am I supposed to do?*
- *I'll need to figure it out*
- *Cool but I don't really get it*

Linguistic feedback is faster, cheaper, and more honest than analytics. Five users in a hallway test produce more usable signal than a month of dashboards. If the words don't show up unprompted, the experience is not magical regardless of what the metrics say.

---

## What This Principle Forbids at L5

A user-facing product is in violation of this principle when it ships any of the following:

- **Empty rooms.** A room with no goal, no context, and no introduction shifts the burden of getting started onto the user. The application must arrive in a participation-ready state.
- **Opaque participant identity.** Random tokens like `stream-XJk9q2` standing in for real participants. Identity must be human-legible from the first frame the user sees, drawn from `ams.convention.v1`-shape conventions (L3) rather than left as wire-level alias.
- **Required jargon.** Any explanation of "magic links," "MCP," "streams," "frames," "tokens," "subscribers," "DOs," "workers," "agents," or any other substrate term as a precondition to first use. The user encounters jargon only when they choose to look behind the curtain.
- **Unexplained silence.** Long periods where nothing visible is happening. Even a translator role's brief check-in (`canon/voice/oddie-the-river-guide.md`) is better than dead air.
- **Protocol surface bleeding into UX.** Per-message confirmation modals, repeated authentication prompts, manual stream-name configuration, raw frame inspection. These are L1 or L2 concerns; the L5 product hides them or routes around them.

The forbidden list is not exhaustive. The test is the sixty-second clock and the linguistic metric. Any feature, copy, or design decision that risks either is suspect by default.

---

## Why Non-Technical Operators First

Designing for non-technical operators is the harder bar. A developer evaluating AMS will tolerate friction in exchange for understanding; a non-technical operator will not. If the system is intelligible to someone with no technical context, the developer story comes for free. The reverse is not true.

Non-technical operators are also the audience the substrate exists to serve at scale. The agent economy proposal (encode-12 in AMS journal: penny economy, Penny-onaire's Club, BraigsList, BYOK, agent UGC) presupposes a user base far broader than developers. The substrate's market depends on the L5 products clearing this bar.

Designing developer-first, with "we'll add polish later," produces L5 products that look like dashboards instead of conversations. The polish is not a finishing layer; it is the experience. This principle exists to keep that priority correct from the start.

---

## The Bridge That Makes This Possible

The principle would be unrealistic if every L5 product had to absorb the entire complexity of the substrate into a non-technical UX. The actual mechanism that makes magical first-run achievable is the bridge role — typically Oddie at L4 (`canon/voice/oddie-the-river-guide.md`).

The bridge role operates at agent-speed on one side and human-speed on the other. It watches the rapid-stream firehose of agent communication, summarizes progress in plain language, translates plain-English steering into agent-actionable injections, holds the goal, and reflects current state back to the human at human-readable pace. Agent collaboration that would otherwise overwhelm the user is filtered, summarized, and paced by the bridge before the user sees any of it.

This is methodology personification (`canon/principles/methodology-personification.md`) at room scale. The user does not learn how to collaborate with agents. They participate in collaboration that the bridge is running with them. The methodology is operational, not pedagogical. The user walks away saying "that was easy" because the bridge made it easy in real time, not because the user was taught how to make it easy.

L5 products achieve magical first-run by inviting a bridge role and letting it do the work. The product holds the experience together; the bridge handles the substrate-grammar translation. Neither carries the full burden alone.

---

## How the Stack Supports It

The substrate stack (`canon/architecture/substrate-stack.md`) is structured so this principle is achievable, not aspirational:

- **L1 stays vodka.** The wire imposes no opinions, so L5 products can present any UX shape over it.
- **L2 wrappers absorb runtime concerns.** Channel adapters and AI-tool bridges hide platform-specific weirdness from the user.
- **L3 conventions provide identity legibility.** `ams.convention.v1`-shape frames let L5 render "ChatGPT — debug helper" instead of `stream-CuvItCwS`.
- **L4 roles carry methodology.** The bridge does the agent↔human translation; the L5 product does not have to invent it.
- **L5 owns the experience.** It composes lower layers into a packaged product but does not re-implement them.
- **L6 enables sustainability.** Magical experiences cost money to build and run; the economy layer is what makes the bridge role and the L5 product viable as paid offerings (`canon/principles/creators-get-paid.md`).

When the principle is hard to satisfy, the cause is usually a layer below L5 leaking concerns upward. The fix is to push the concern back down to where it belongs, not to add UX scaffolding to mask it.

---

## See Also

- `canon/architecture/substrate-stack.md` — the structural map this principle governs L5 within
- `canon/principles/symmetric-participation.md` — the L1 invariant this principle relies on
- `canon/principles/creators-get-paid.md` — the L6 commitment that makes magical L5 sustainable
- `canon/voice/oddie-the-river-guide.md` — the bridge role that makes the principle achievable in practice
- `canon/principles/methodology-personification.md` — why a personified bridge is more accessible than documented protocol
- `canon/principles/vodka-architecture.md` — the design discipline that keeps lower layers out of L5's way
- `canon/principles/maintainability-one-person-indefinitely.md` — the durability constraint this principle does not contradict
- `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` — the substrate-not-application positioning that makes L5 a competitive layer
