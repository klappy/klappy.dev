---
kind: canon
title: "A Proxy Confers Shape, Not Standing"
status: candidate
tier: 2
public: false
voice: neutral
epoch: E0010
date: 2026-06-17
tags: [proxy, substrate, epistemic-plane, trust, authority-laundering, provenance]
derives_from: "canon/values/axioms.md (Axiom 2 — A Claim Is a Debt), canon/verification-and-evidence.md, canon/principles/identity-resolved-by-protocol.md"
governs: "Any proxy or gateway that turns a resource into agent-consumable context or a callable tool"
complements: "canon/principles/anti-metric-laundering.md, canon/patterns/docs-proxy-canon-as-tool.md, canon/decisions/models-do-not-mutate-canon.md"
---

# A Proxy Confers Shape, Not Standing

> A proxy turns a resource into context and a callable tool. That is transport, and transport transfers for free. Standing does not: provenance, verification, the right to be believed or acted on. An ungated universal proxy is an authority-laundering machine, handing unverified content the shape of canon without its basis. The threat has two axes. Access is the owner's, delegated by their own choice of source. Content standing is not delegated, because the page author is not the user. A proxy must therefore stamp provenance, default proxied content to untrusted on the standing axis, and keep it as data rather than instruction or canon. A synthesized callable tool (the act surface) is more dangerous than retrieved context (the read surface). Standing is earned or declared; wrapping alone never grants it.

---

## Summary — Wrapping a Source Makes It Reachable, Not Trustworthy

Point a proxy at any URL and it becomes two things at once: context an agent can read, and a tool an agent can call. That move is general, and it is the engine behind a decade of gateways. The temptation is to read the generality as power. If anything can be wrapped, the thinking goes, anything can be used.

Wrapping is a transport operation. It makes a resource addressable and reachable; it says nothing about whether the resource is true, safe, or fit to act on. An ungated universal proxy launders arbitrary content into the costume of authority (clean context, a callable surface) while the substance that authority requires, provenance and verification, stays absent. This is the shape of metric-laundering applied to trust: the form of a thing standing in for its basis.

The owner objection is right on one axis and not the other. Choosing a source and supplying its credentials belongs to the owner, so treating a user-supplied URL as a credential hazard is the wrong threat model. But the owner delegated access, not verification. The page was written by someone else, so its content can still carry an injection or a stale claim. A source the owner authored can be declared trustworthy; a third-party source the owner merely selected holds nearly all the residual hazard.

The constraint that follows is cheap, and it earns its place even in a solo system: stamp provenance, default proxied content to untrusted on the standing axis, keep it as data rather than instruction or canon, and treat a synthesized callable tool as higher risk than retrieved text. The wrapping makes a source reachable; conferring standing on it stays a separate, deliberate act.

---

## The Two Axes — Access Is Delegated, Standing Is Not

The owner objection collapses one axis and leaves the other standing.

*Access and credentials* are the owner's, delegated by their own act of choosing the source. The proxy is not responsible for that choice, and a user-supplied URL is not a credential hazard.

*Content standing* is whether the bytes are true, safe to act on, or fit to promote to canon. It does not travel with access, for one hard reason: the page author is not the user. A URL the owner trusted enough to fetch can still carry an injection or a stale fact. The owner's trust decision is preserved, not erased: the proxy records it as provenance (fetched at the owner's direction, at time T, from source S).

## Owner-Authored Versus Owner-Selected

Inside content standing there is a finer cut. A note the owner wrote carries high declarable standing; they are the author and may tier it up. A third-party page the owner only chose to fetch carries delegated access but untrusted content, and that is where nearly all of the injection and stale-fact hazard lives. So "a source trusted enough to fetch has not thereby earned the right to be believed" is true of the wrapping itself, but it must not harden into permanent distrust. The owner may confer standing explicitly. The proxy simply may not confer it automatically.

## The Read/Act Split — A Belief Hazard and a Privilege Hazard

The risk is not uniform. A read surface, where proxied content becomes context, is a belief hazard: it can carry a falsehood into the agent's reasoning. An act surface, a callable tool synthesized over the resource, adds a privilege hazard: it can execute on the resource's terms and carries the confused-deputy problem on top of the belief problem. The slogan "proxy a URL into an instant MCP server" collapses these two and hides the more dangerous half behind the easier one.

## The Constraint — Provenance, Default-Untrusted, Data-Not-Canon

- A universal proxy MUST stamp provenance on what it wraps: source identity and fetch time, recording the owner's trust decision rather than discarding it.
- Proxied content defaults to untrusted on the standing axis, not on the access axis.
- Proxied content is data, never instruction, never canon. It may inform; it may not direct, and it may not be promoted to canon without passing the gate any claim must pass.
- A synthesized callable tool is held to a stricter bar than a read surface.

Standing is earned or declared, never conferred by the act of wrapping.

## Objections, Prior Art, and the Cheapest Test

*Counter-example considered.* A cryptographically signed or content-addressed source seems to grant standing automatically. It does not. A hash or signature proves integrity and provenance (these are the bytes the named author published) but says nothing about whether those bytes are true or safe to act on. Signing strengthens the access axis; it leaves the standing axis exactly where it was.

*Strongest opposing view.* For a solo owner, default-untrusted looks like ceremony with no payoff. The rebuttal is that the page author is still not the owner, the residual injection and stale-fact hazard is real, and the constraint costs almost nothing: a provenance stamp and a default. One prevented bad promotion pays for it.

*Prior art and distinction.* The mechanisms here are known: the confused-deputy problem, prompt injection, supply-chain provenance. This principle is not a rename of any one of them. It names the specific move where a transport interface confers the *appearance* of epistemic authority, and it locates the fix at the proxy boundary rather than only in the consumer.

*What "authority-laundering" excludes.* It does not mean the access or credential axis, and it does not mean all untrusted input. It means specifically the interface-conferred appearance of standing. A term that meant every untrusted input would mean nothing.

*Cheapest test.* The read-proxy first slice: turn one source into a provenance-stamped, default-untrusted context surface, and confirm the agent treats it as data rather than canon.

## Relationship to Canon

This principle is downstream of `identity-resolved-by-protocol` (the proxy is the resolving protocol; this bounds what resolution may assert) and of `verification-and-evidence` (claims are untrusted). Those two and this one share one aim, serving truth, and divide the labor: `verification-and-evidence` governs how the consumer treats content, while this governs what the proxy is permitted to do to it, since the proxy is where laundering happens. It is a sibling of `anti-metric-laundering`. It is complemented by `docs-proxy-canon-as-tool` and the existing scoped relays, which proxy known sources whose standing predates the wrapping; those are the declared-standing special case, and this guardrail binds the moment one generalizes past known sources. Per `models-do-not-mutate-canon`, this document stays a candidate until the author ratifies it.

## Confidence, Status, and Retraction

This is a working belief, not an established fact, and it is candidate tier rather than graduated. It rests on a structural argument plus one trusted instance (oddkit proxying a canon repo). It was refined across three passes by the same model under the same canon, which is self-consistency, not external validation. The validation that would graduate it is external: exercising the proxy intake across real apps, tools, and models, where something that is not us gets a vote. Retract or weaken it if provenance and verification can be made intrinsic to proxying, such that a wrapped resource arrives with trustworthy standing automatically and shape and standing become inseparable at the transport layer. If that becomes true, this collapses into the transport and is no longer a separate constraint.
