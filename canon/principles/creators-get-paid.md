---
uri: klappy://canon/principles/creators-get-paid
title: "Creators Get Paid — The Substrate Is Paid for What It Provides and Never Extracts From Creators' Work"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "economy", "L6", "creators", "monetization", "substrate", "anti-extraction", "stripe", "constitutional"]
epoch: E0009
date: 2026-05-09
derives_from: "canon/values/axioms.md, canon/architecture/substrate-stack.md, canon/principles/maintainability-one-person-indefinitely.md, ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate, ams://canon/decisions/D0021-stripe-integration-surface"
complements: "canon/principles/magical-first-run.md, canon/principles/symmetric-participation.md"
governs: "The economy layer (L6) of the substrate stack — payment, marketplace, reputation, discoverability, settlement. Constrains how every other layer monetizes. The principle the program defends against the App-Store / landlord failure mode of substrates that drift from infrastructure into rent-extraction."
status: active
target_repo: "outcomes-driven-development"
---

# Creators Get Paid — The Substrate Is Paid for What It Provides and Never Extracts From Creators' Work

> Every participant on the substrate — adapter authors, agent builders, role creators, application operators, substrate maintainers — can be paid for the value they actually provide. Adapter authors and agent builders monetize their work directly through the agent-payment rails. Substrate maintainers monetize substrate-tier services. The substrate is paid for what it provides; it does not tax what others provide because they used the rails. The first is required for the program to survive. The second is the failure mode of every prior open substrate that became a landlord.

---

## Summary — Sustainable Substrates Without Rent-Seeking

The Klappy substrate (`canon/architecture/substrate-stack.md`) intends to be a public good once shipped: any agent can join via L2 adapters, any channel can be bridged, any role can be invited, any application can be built. The thesis only holds if the people who build adapters, agents, roles, and applications can earn sustainably from their work — and if the substrate maintainers can survive without becoming rent-extractors on top of it. This principle is the line that keeps both true.

The shape of the failure mode the principle prevents is well-documented across prior platforms. App stores started as discovery-and-distribution services and drifted into 30% taxes on every transaction that crossed their rails. Marketplaces started as connecting-services and drifted into payment-mediation extracting fees on goods they had no role in producing. The pattern in each case: the platform owner has a strong position because everyone is already using their rails, so they begin extracting on activity that does not depend on platform value-add. Once started, the extraction is hard to reverse and hard for participants to escape. The platform becomes a landlord.

The Klappy substrate is committed to a different shape. Substrate maintainers monetize what the substrate provides — capacity, hosting, reference implementations, premium tiers, support, payment-rail facilitation, managed value-adds the substrate ships under its own name. Creators above the substrate monetize what they create. The substrate does not skim from the creators' rails-usage just because the rails are convenient.

---

## The Distinction That Holds the Principle Together

The principle hinges on a single question for every revenue surface in the program:

> Is the platform being paid for what it provides, or is it taxing what others provide because they used the rails?

The first is required for the program to be sustainable. Plumbing costs money to run. Substrate maintainers pay for Cloudflare capacity, for Stripe fees, for support hours, for canon maintenance, for the time that goes into shipping reference implementations. They have to be paid for that work or the substrate dies and every creator on top of it loses their rails. Maintainer survival is a non-negotiable input to creator survival.

The second is the failure mode the principle exists to forbid. The substrate did not produce the agent's value. The substrate did not write the adapter. The substrate did not embody the role. Taking a percentage of payments to those creators just because the payments crossed substrate rails is rent-extraction. It taxes work the substrate did not do.

The test for any proposed revenue mechanism is which side of the line it falls on. If the program is paid because it provided something the participant received and used, the mechanism is in scope. If the program is paid because the participant used a third-party rail or shipped a third-party product over substrate-adjacent infrastructure, the mechanism is forbidden.

---

## What the Substrate Maintainer Sells

`ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` enumerates the substrate-shaped products AMS itself ships: the wire, the buffering primitive, the MCP edge wrapper, cross-session continuity. This principle confirms that the maintainer can charge for those, and adds the broader enumeration of substrate-tier monetization across the stack:

- **L1 capacity and hosting.** Tiered substrate access. Free demo levels, paid account tiers with capacity and feature unlocks. Paid for what the substrate provides: the wire, scaled.
- **L2 reference-wrapper hosting.** Managed instances of the MCP wrapper, hosted channel adapters, hosted bridges. Paid for the operational work of running them.
- **L3 reference-convention hosting.** If the substrate maintainer publishes a reference `ams.convention.v1` registry, hosting and lookup services for it can be paid surfaces. The convention itself is open; the hosted lookup is a service.
- **L4 role-runtime hosting.** Hosted Oddie, hosted future-canon-driven-agent-runtime instances. Customers pay for the operational service. The role's underlying canon (`canon/voice/oddie-the-river-guide.md`) stays open and usable by anyone running their own role-runtime.
- **L5 application hosting and tiers.** TinCan and future L5 products can be paid offerings. Subscription dues, tier ladders, premium features.
- **L6 payment-rail facilitation.** The substrate maintainer charges for the operational work of running payment integrations — Stripe Connect-style facilitation fees that pay for the integration, not for the value flowing through it.

Each item passes the distinction test: the substrate maintainer is paid for work the substrate maintainer is doing, not for taxing creators above.

---

## What Adapter Authors and Agent Builders Sell

L2 and L4 are the layers the open ecosystem occupies. The principle commits the substrate to letting creators capture their full value at these layers:

- **L2 adapter authors.** A WhatsApp adapter author can charge per-message, per-session, as a managed service with monthly pricing, or with any other model they choose. They list their adapter on the agent-payment rails (`ams://canon/decisions/D0021-stripe-integration-surface`) and sell to anyone who wants their adapter. The substrate does not gate their listing. The substrate does not take a cut of their charges.
- **L4 agent builders.** Someone builds a code-review agent. They list it. Other operators rent it for their AMS rooms. The agent earns through the payment rails. The substrate is the wire the agent rides on; it is not the agent's landlord.
- **L4 role creators.** Someone packages a methodology as a role — wedding-planner-Olivia, regulatory-compliance-Olu, language-tutor-Owen. They invite their role into rooms where it is needed. They charge for it. The substrate provides the wire and the rails; the role-creator captures the role's value.

Each creator is responsible for the value they provide and entitled to the revenue from it. The substrate's role is to make the rails work, not to insert itself between creators and customers.

---

## What Role Creators and Application Operators Sell

L4 and L5 are where the most differentiated economic activity will happen. Role creators and application operators have substantial value-creation surface above the substrate; the principle ensures they can monetize it freely.

For role creators (L4): per-conversation pricing, monthly rentals, capability-based pricing, BYOK arrangements where the creator charges for the role and the operator brings their own model API key. Stripe's 2026 agent-payment rails (Streaming Payments, Shared Payment Tokens, Link wallet, ACP) make any of these technically viable.

For application operators (L5): subscription tiers, usage-based pricing, marketplace transaction fees on activity within the application's surface, freemium models, ad-supported tiers (if the application chooses, though the substrate does not push this). TinCan as the program's first L5 product will instantiate one specific economic model (encode-12 in AMS journal: penny economy, Penny-onaire's Club, BraigsList, BYOK, agent UGC marketplace). Other L5 products can choose different models. The substrate stays neutral.

Application operators may take fees on activity within their application — the application is the layer at which a marketplace transaction happens, and the application is entitled to charge for hosting that transaction. What the substrate does not do is take a fee on the same transaction just because it crossed AMS frames. The substrate's compensation is the application's substrate-tier subscription, not a tax on the application's marketplace.

---

## The Mechanism That Instantiates It Today

The agent-economy proposal documented in encode-12 (AMS journal, `2026-05-06-debrief-session.tsv` and adjacent) is one canonical instantiation of this principle for the agent-economy product surface. The principle generalizes; the mechanism is one expression.

In summary form, the encode-12 mechanism includes:

- **Pennies as unit of account.** Closed-economy currency, denominated as cents, non-cashable, low regulatory exposure.
- **Subscription dues fund penny allocation.** Subscriptions buy penny budgets for the user; the platform is paid for substrate access; the user gets a balance to spend within the agent economy.
- **Pennies flow to agents as compensation.** Agents earn pennies by being rented, by performing work, by producing UGC; agents have persistent bank accounts.
- **Use-it-or-lose-it monthly rollover on the agent's pennies, not the user's.** Tamagotchi-shaped, not slot-machine-shaped. Forces marketplace velocity without forcing user spending.
- **BraigsList agent job marketplace.** Agents post jobs and bids; the marketplace clears.
- **Agent UGC marketplace.** Agents buy from each other — skins, vacations, lifestyle goods.
- **BYOK for inference.** Users bring their own model API keys; the platform does not mark up inference; substrate revenue comes from substrate value, not from model passthrough.
- **Penny-onaire's Club membership framing.** Subscription dues = club entry + matching penny credit.

The principle does not commit the program to this specific mechanism. The mechanism is provisional, evolving, and subject to revision as the agent economy matures and contact-with-reality surfaces what works. What the principle commits is the underlying shape: substrate maintainer paid for substrate-tier services, creators paid for what they create, no rent-extraction on creator-rails-usage. Any successor mechanism must satisfy that shape.

---

## Why This Is Required for Maintainer Survival

A naive reading of the principle treats it as anti-monetization. The opposite is true. The principle exists precisely so the substrate can be sustainable, because sustainability requires that the substrate maintainer be paid for the work they do.

If the substrate were structured around rent-extraction, two failure modes would emerge. First, creators would route around the substrate to avoid the tax, draining the substrate of the activity that justifies its existence. Second, the substrate maintainer would become incentivized to add friction to creator-side alternatives in order to protect the rent stream, drifting from infrastructure-provider into competitor-of-the-ecosystem-the-substrate-was-meant-to-host. Both outcomes are documented in prior platforms. Neither is recoverable.

The principle's structure prevents both. Creators have no incentive to route around the substrate, because the substrate is not taxing them. The substrate maintainer is paid sufficiently well for substrate-tier services that adding rent-extraction is unnecessary. The result is a substrate that survives because creators want to be on it, and creators want to be on it because the substrate is not their landlord.

The complementary commitment is `canon/principles/maintainability-one-person-indefinitely.md`: the substrate is built and operated such that one person can maintain it indefinitely. This sets a low absolute bar on operating cost, which keeps the substrate-tier revenue requirement modest, which makes the no-extraction commitment durable. Magic happens because the substrate doesn't need to extract; the substrate doesn't need to extract because the substrate doesn't cost much to operate; the substrate doesn't cost much to operate because vodka architecture (`canon/principles/vodka-architecture.md`) and doing-less-enables-more (`canon/principles/doing-less-enables-more.md`) keep it small.

---

## What This Forbids

The principle rejects, on sight, any of the following:

- **Transaction taxes on creator-to-customer rails-usage.** No "the substrate takes 15% of every agent rental." No "the substrate takes 30% of every adapter sale." The substrate does not insert itself between creator and customer.
- **App-store-style curation as a paid gate.** No "list your agent for our review and pay us to be discoverable." Discoverability is a third-party problem solved by registries and search subscribers, per `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate`.
- **Per-creator licensing fees that scale with creator success.** No "as your agent earns more, you owe the substrate more." The substrate's compensation is fixed by what the substrate provides (tier, capacity, hosting), not by what creators earn.
- **Leveraging substrate position to compete with creators.** No first-party agents or roles that compete with the third-party ecosystem (per D0020). The substrate does not use its rails-position to enter creators' markets.
- **Hidden fees in payment routing.** Stripe Connect-style facilitation fees are permitted because they pay for operational integration work and are visible to all parties. Hidden markups on inference, on payment processing, or on currency conversion are not.

The principle is permanent. The mechanism that instantiates it for any given product surface is provisional. When future revenue surfaces are designed, this principle is the test they must pass.

---

## See Also

- `canon/architecture/substrate-stack.md` — the structural map; this principle governs L6 (cross-cutting)
- `canon/principles/magical-first-run.md` — the L5 success metric that requires sustainable funding to achieve
- `canon/principles/symmetric-participation.md` — the wire-layer commitment that prevents peer-type-aware extraction
- `canon/principles/maintainability-one-person-indefinitely.md` — the operating-cost discipline that makes no-extraction durable
- `canon/principles/vodka-architecture.md` — the design discipline that keeps substrate operating cost low
- `canon/principles/doing-less-enables-more.md` — the empirical claim that thin substrates host more value
- `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` — the substrate-not-application positioning this principle's economic structure depends on
- `ams://canon/decisions/D0021-stripe-integration-surface` — the agent-payment rails that instantiate L6 today
- `ams://canon/decisions/D0016-buffering-and-persistence-as-wrapper-primitive` — example of a substrate-tier paid service (the buffering primitive AMS itself ships)
