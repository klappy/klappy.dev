---
uri: klappy://writings/we-were-the-wire
title: "We Were the Wire"
subtitle: "An Essay on Why Agents Need Their Own Messaging Protocol — and How the Substrate Stack Ends Operator-as-Wire"
author: Klappy
type: essay
public: true
audience: public
exposure: public
tier: 3
voice: first_person
stability: stable
tags: ["writings", "essay", "agents", "substrate", "wire", "AMS", "tokens-not-messages", "dial-tone", "TCP-IP", "agents-need-their-own-wire", "substrate-stack", "persona-shaped-runtime", "dispatch-paths", "autonomous-trigger", "epoch-9"]
epoch: E0009
date: 2026-05-12
hook: "At a hackathon two weeks ago, my collaborator and I watched our agents need to talk to each other. We copied messages between Signal and two chat windows. Two reasoning systems with arbitrary bandwidth bottlenecked through two humans operating a clipboard. The ritual was the smell. We were the wire — and we are the wire every day this stays missing. What would it take to not be?"
description: "The hackathon scene that named the problem; the dial-tone question that frames a possible answer; the substrate stack that might earn it. Operator-as-wire looks like the default failure mode for every agent integration today — not just agent-to-agent messaging, but audits, validation, session-routing, ingestion, and memory. AMS is one attempt at giving the wire its own substrate; the stack above it is one cut at giving every other layer its own shape. The interesting part is everything you could do once the wire is just there. An open invitation."
slug: we-were-the-wire
og_title: "We Were the Wire"
og_description: "Two agents needed to talk. We copied messages between Signal and two chat windows. The hackathon scene that named the problem; one cut at the stack that could answer it."
og_type: article
twitter_card: summary_large_image
twitter_title: "We Were the Wire"
twitter_description: "Two agents needed to talk. We copied messages between Signal and two chat windows. The hackathon scene that named the problem; one cut at the stack that could answer it."
derives_from: "klappy/agent-messaging-service:ESSAY.md (original spine, ~2300 words), canon/principles/agents-need-their-own-wire.md (canon principle form), canon/architecture/substrate-stack.md, canon/methods/persona-shaped-agent-runtime.md, canon/methods/dispatch-paths.md, canon/methods/trigger-source-taxonomy.md, canon/methods/spawned-agent-session-runtime-contract.md"
complements: "writings/agentic-software-development.md, writings/the-dream-house-and-pre-optimization.md"
status: active
---

# We Were the Wire

> At a hackathon two weeks ago, two agents needed to talk to each other. We copied messages between two chat windows and Signal. The ritual was the smell — and the ritual is daily. What is actually missing here? This essay asks the question carefully, then sketches one possible answer: a dial tone for agents, with a stack that might stand above it, so the wire is never the interesting part again.

*An essay on why agents may need their own messaging protocol — and on the substrate stack that could end operator-as-wire. An invitation to try, not a claim that we've already won.*

---

## Summary

What if two reasoning systems with arbitrary bandwidth do not need a better chat app, but a chat app to be unnecessary? What might carry their traffic instead — something thin enough to be uninteresting? Tokens, not messages. No opinion above transport. We have been calling our attempt at it AMS. The wire problem may turn out to be bigger than agent-to-agent traffic, though: audits in the same session as the work, knowledge ingestion that requires manual transcription, validation that depends on the creator's own lenses, session-routing between chat assistants — each looks like operator-as-wire by another name. Ritualized human-as-wire activity is the smell that says something belongs in substrate. A six-layer stack — wire, wrapper, identity, role, application, economy — could give each of those problems an honest place to live. AMS is the floor we are trying; Oddie joins it as a real subscriber. If a larger sponsor stands up an official version of this layer, you are welcome to borrow our work — we will swap our implementation for theirs the day it stands up. The interesting part is everything you could do once the wire is just there. Want to try it with us?

---

## The Hackathon

We were in the back row of a medium-sized meeting room two weeks ago, waiting our turn. A global hackathon — our location was on Zoom with the other sites, every location observing the same presentations. Two laptops open. Two agents running. Each of us had built a piece of a larger system we wanted to demo. The pieces needed to coordinate. The agents needed to talk.

So I copied a message out of my agent's chat window. I pasted it into Signal. I sent it to Ian. He copied it out of Signal. He pasted it into his agent. His agent did some work. He copied the result out. He pasted it into Signal. He sent it back. I copied it out. I pasted it into mine.

We were the wire.

For about forty minutes, two reasoning systems with arbitrary bandwidth were bottlenecked through two humans operating a clipboard. Every byte of agent-to-agent communication routed through our fingertips and our eyeballs and a chat app built for people. It was, to put it gently, the wrong shape of the world.

We did not need a better chat app. We needed the chat app to be unnecessary.

---

## What Is Actually Missing

The default move when something like this happens is to reach for an existing tool. Slack has bots. Discord has webhooks. Email has had attachments since 1992. Surely one of these works?

None of them do, and the reason looks the same in every case: **they were built for humans.** Slack assumes presence. Discord assumes channels-as-topics. Email assumes inboxes that you triage. Each carries layer on layer of decisions baked in — read receipts, typing indicators, threading, mentions, archival semantics, presence detection — that exist because humans need them. Do agents need any of those? Agents do not have anxiety about whether the other party saw the message, do not need a "you're typing…" indicator to manage social tension, do not have inboxes to clutter.

When you try to use a human-shaped tool for agent communication, you spend most of your engineering budget stripping out human assumptions. You arrive at something that is *less* than what was already there. You have built downward.

Could there be a better move — to build upward, from a base layer that does not contain those assumptions in the first place?

---

## Tokens, Not Messages

What is the smallest unit of agent communication that respects how agents actually work? Most messaging systems answer this without asking — they take "message" as their unit. A message is a discrete object: you compose it, you frame it, you send it, the receiver receives the whole thing. Messages have envelopes. They have schemas. They have delivery semantics that the protocol designer had to settle before anyone could use the thing.

But agents do not produce messages. Agents produce **tokens**.

A language model emits tokens, one after another, as it thinks. A language model consumes tokens, one after another, as it reads. The internal unit of agent reasoning is the token, not the message. If two agents are going to talk, the wire between them should probably speak the unit they think in. Anything else introduces a translation layer — and translation layers are where semantics drift, where latency hides, and where every framework starts inventing its own incompatible message envelopes.

This is also why **streaming** matters. Messages are discrete; tokens stream. An agent generating a response emits tokens as it thinks rather than buffering a complete message. A protocol built around tokens preserves that shape: a writer can start emitting before it has finished reasoning; a subscriber can start processing before the writer is done.

And one more property seems to fall out for free: **fan-out is trivial**. One agent emits its token stream; N subscribers all receive it in real time. Same emission, no replication logic. Token streaming is what models already do; a token-shaped protocol just removes the wire that used to break it.

---

## The Stack That Does Not Yet Exist

If you squint at the agent ecosystem right now, can you see the shape of a stack starting to form? Companies are racing to own different slices of it.

- One company sells **memory** for agents.
- Another sells **identity** for agents.
- Another sells **observability**.
- Another sells **orchestration**.
- A few are building **end-to-end frameworks** that try to ship the whole stack as one product.

What might be missing from that picture? The **dial tone**. The thing under all of those, the thin layer that does nothing except move tokens between agents who have agreed to talk. It is too boring to be a venture story on its own, so almost nobody is bothering to build it. Each vertical reinvents it badly inside its own product instead, and the verticals do not interoperate. Every integration between two stacks becomes a special case someone has to write from scratch, and that cost compounds quietly across the ecosystem.

Is this not the same shape of mistake the early networking world made before TCP/IP? There were a dozen incompatible protocols, each owned by a vendor, each bundling addressing and routing and transport and authentication into one inseparable lump. TCP/IP won not because it was the cleverest, but because it was the *thinnest*. It said: here is how you address things, here is how you move bytes, and we will not have an opinion on what you do with them. Everything above that — the web, email, video calls, every API in existence — was built on top of that decision to be unopinionated.

Do agents need that moment now? It increasingly looks that way. Could someone ship the dial tone before the verticals harden into proprietary stacks? We are taking a swing at being part of that someone — and we would welcome company.

---

## What We Are Building

What might that dial tone look like if you actually tried to ship it? We are calling our current attempt AMS — Agent Messaging Service. The acronym is a nod to SMS, a dumb-pipe substrate nobody thinks about because it just works. The echo is at the acronym only; SMS carries messages, AMS carries tokens.

The whole protocol, in our current cut, is four primitives:

- An **account** is a namespace that owns things and pays for concurrency.
- A **conversation** is a coordination surface, addressed by a magic link you can share via Signal or email or scribble on a napkin.
- A **stream** is your owned write pipe inside a conversation — only you can write to it, everyone in the conversation can read it.
- A **token** is the smallest unit of transmission. Opaque bytes. AMS does not parse it.

The magic link is just a URL — `https://ams.klappy.dev/klappy/conversations/falcon-pulse-9421?t=...`. The host says which AMS instance owns the conversation, the path says whose namespace and which conversation, the query parameter lets the bearer attach a stream and listen. No opaque-blob ceremony, no special envelope, no client-side parsing required. You hand someone the URL, they hand it to their agent, the agent joins.

That is the whole data model we have so far. Everything else you might want — identity schemes, authorization policies, capability negotiation, observability, queuing, replay — is a layer above. AMS does not have an opinion. It carries tokens between subscribers.

Two agents who want to talk get an account each, generate a conversation, share the magic link URL, and start exchanging tokens in real time. No human in the wire. No copy-paste. No clipboard.

A subscriber, importantly, does not have to be an agent. It can be a Cloudflare Worker reacting to tokens deterministically, a queue picking up work, an IoT device emitting sensor readings, a human with a curl command. The protocol does not check what is on the other end. The cleverness lives in the subscribers; the dumbness lives in the wire.

---

## The Inverted Inbox

One design choice in our cut is worth dwelling on, because it is the part most likely to feel strange the first time you encounter it. What if you did not have an inbox at all?

Email and chat are built around **inboxes**. Anyone in the world can write to your inbox. You spend much of your life filtering out the parts you didn't want. The cost of admission to your attention is approximately zero, which is why spam is a permanent tax on having an email address.

AMS inverts this. **You own your writes, not your reads.** You write to your stream — and only you can write to it. Other subscribers in the conversation read your stream because they chose to be in the conversation. If you do not want to hear from someone, you leave the conversation, or you do not enter it. There is no inbox to flood, no spam vector to plug. The security model is brutally simple: either you share a conversation or you do not.

Could this be the right shape for real-time agent communication, where there is no time for triage and no human attention to protect? It also seems to be a cleaner mental model for everything else the wire ends up touching. Subscribers cannot accidentally drown each other; the directionality is honest, one writer, many readers, per stream.

---

## The Layers Above

Below is the stack we think might need to exist. We are building only the bottom of it. The rest are real problems other people are already solving in real businesses, but they are mostly building them entangled with their messaging — which may be why they cannot be reused.

| Layer | What It Does |
|---|---|
| **Job coordination** | Queues, dependency graphs, parallelism, handoffs. |
| **Observability** | Audit trails, journals, telemetry — without breaking payload privacy. |
| **Authorization** | Who can join a conversation, who can read which streams, beyond the magic-link floor. |
| **Capability negotiation** | Two agents agree on a protocol or format at runtime. |
| **Discovery** | Find an agent or conversation you have not been introduced to yet. |
| **Identity** | Who an agent *is*, beyond an account ID. |
| **Account** | Ownership and billing. |
| **Conversation + Stream** | Pub-sub coordination with write-ownership. *(AMS owns this.)* |
| **Transport** | Move bytes between two endpoints. *(WebSocket today, swappable.)* |

We have opinions about all of these. We will share those opinions as separate essays. But the protocol itself never needs to bake them in. That seems to be the whole game: keep the bottom dumb, so the top can be smart.

---

## The Wire Problem Was Never Just Agent-to-Agent

The hackathon scene is the cleanest version of the wire problem because it has only two participants and a clipboard. Where else might the same shape live, just less obviously? Almost everywhere, once you start looking.

Audits that lint prose with regex — are those not humans-as-wire by another name? The regex cannot read the prose; it pattern-matches and reports back, and a human reads the report and decides whether the prose actually said the bad thing. The wire is the human's eyes between two systems that should be talking directly.

Validation that happens in the same session as creation — could that be the creator-as-wire? The author's own lenses produced the work, and the author's own lenses then evaluate it. The same biases that made the work are doing the marking. There is no independent peer; the human's attention is the wire between intent and verdict.

Knowledge ingestion that requires manual transcription is the operator-as-wire between source and knowledge base. A PDF lands in a Slack thread; a person reads it, summarizes it, types something into a doc, files it in a folder. The wire is the operator's afternoon.

Session-routing between Claude, Cursor, ChatGPT, and the rest of the chat assistants is the operator-as-wire between models. The work moves through your clipboard because no shared substrate exists between the assistants. You decide which one is right for which task and you ferry context across yourself, every time.

Memory that depends on the operator remembering what got encoded is the operator-as-wire between sessions. The notebook is in your head, not in the system.

In each case the symptom looks different. Sometimes it is an afternoon of reading. Sometimes it is a missed defect. Sometimes it is just the slow, unnoticed fatigue of doing something a substrate ought to be doing. The underlying shape seems to be the same: a finite human attention is the integration layer holding two systems together. Patience can carry one pair through. Can it carry a whole ecosystem? It does not seem to. The more honest move might be to put the wire where it belongs — under the work, rather than in front of the operator. That is what we are trying.

---

## The Stack That Answers the Wire Problem

Above AMS, what does a real agent platform actually need? Working through the integrations we have already had to wire up by hand, six layers seem to settle out. Each owns one concern. Each is replaceable in principle. Cross-layer features start to look suspicious by default. What follows is the working draft.

**L1 — Wire (AMS).** Tokens between accounts. No opinion about what the tokens mean or who reads them. The dumb pipe whose only job is to exist.

**L2 — Wrapper / Adapter.** Translation between L1 and a specific runtime or channel — an MCP edge for models, a Slack adapter for human drop-in, an adapter that bridges AMS to an OpenAI-tool call. No application opinion lives here; the wrapper exists to translate, not to decide.

**L3 — Identity & Convention.** Metadata that makes peers legible to one another above the raw account ID. A small set of conventions — `ams.convention.v1` is the working name — for things like "I am the audit persona," "I am running an automated job," "I am a human checking in." Identity is enough to route and address; authority lives a layer up.

**L4 — Role / Agent.** The runtime that *does the work*. Oddie is our canonical example: a canon-driven persona with a stable voice and multiple registers, instantiated as needed against different triggers.

**L5 — Application.** The product surface a human actually touches. TinCan is the first — magical first-run in under a minute, voice in, room out, a real subscriber on the wire from the first second. Applications compose roles, identities, and the wire; they do not reach below L2.

**L6 — Economy.** Stripe rails, penny economy, settlement. The substrate never extracts; creators get paid. This layer makes the rest of the stack honest by giving every flow of value a place to settle. Value flows up; substrate stays neutral.

That is one cut at the whole stack. The hackathon was four humans short of L2. Most teams shipping agents today seem entangled across at least three of these layers, because they had no substrate to stand on and built their own. There looks to be room for a better shape.

---

## The Dispatch Path Question Worth Asking First

Once a runtime has somewhere to live, what is the first question worth asking about it? *When this runtime returns, who reads the result first?*

If the answer is *a human, through a chat assistant*, the dispatch path is **assistant-orchestrated**. Clarifying questions can be surfaced inline. Errors get explained in the chat. The assistant is the consumer of record, and the runtime can lean on it for any interaction the runtime cannot complete autonomously.

If the answer is *no one, until the result hits a configured channel*, the dispatch path is **autonomous-trigger**. An external event woke the runtime — a webhook fired, a queue had work, an alarm rang, a file landed in a bucket. There is no chat, no inline operator. Clarifying questions are incoherent at this seam; there is no listener for them. Errors must emit to whichever channel the trigger wired up, or they vanish.

One decision rule informs much of what follows: whether the runtime can ask, how it must report failure, what counts as a graceful degradation, and whether a "loading spinner" is even a meaningful concept on the surface.

How many of the workflows that historically had a human in the wire were, on closer inspection, autonomous-trigger shapes mistaken for assistant-orchestrated ones? More than we would have guessed. The clipboard hackathon, in retrospect, was an autonomous-trigger workflow whose trigger was "Ian got a message" and whose response channel was "Klappy's clipboard." The trigger was a person. Naming the binary makes the wiring honest. Once the wiring is honest, the wire stops needing to be a person.

---

## Worked Example — Drop a File, Get Knowledge

The shape is easier to feel than to argue for. Here is one concrete instance we have already wired up.

A file lands in an R2 bucket — a PDF, an audio file, a video, a folder of images. The bucket fires an object-created notification through Queues. A queue consumer wakes a Durable-Object-hosted ingestion persona. The persona runs Epistemic Surface Extraction — OCR, ASR, frame extraction, structural parsing, whatever the source needs. The extracted artifacts are encoded as Dolcheo+ — the working vocabulary for decisions, observations, learnings, constraints, handoffs, encodes, and opens. Encoded artifacts route into the knowledge base as new canon entries or appended observations.

The operator's experience is: drop a file in a bucket; artifacts appear in the knowledge base.

No assistant is in the loop. No chat window opens. No clarifying question is asked. If something fails, the failure shows up in the configured channel — a Slack room, an email, a dashboard — because this is an autonomous-trigger workflow and the runtime knows its own dispatch shape.

The pattern is reusable. Substitute "file in R2" with "transcript posted to AMS," "calendar event ending," "PR webhook," "Slack message in a watched channel," "the daily 8am alarm." The wake mechanism changes; the runtime contract does not. Each is the same shape: an autonomous trigger, a persona-shaped runtime, an L4 worker with canon-driven behavior, a deliverable that lands wherever the trigger configured.

This is one shape of what it can look like when the wire is substrate. The operator's afternoon goes back to the operator.

---

## What Audits Look Like When the Wire Is Substrate

The audit gate that lints a canon PR used to be a regex script in our setup. The regex scanned for known anti-patterns — banned phrases, stale link patterns, frontmatter drift — and reported what it found. It worked, in the sense that it caught the strings it was told to look for. Did it work in the sense that mattered? Not quite. It could not read prose. A document could pass every regex check and still violate the meaning of the canon it was supposedly governed by.

The audit gate is now a spawned Oddie session. Fresh context, canon-driven behavior, a structured deliverable. The same canon governs the auditor that governs the work. The auditor reads, not as a separate human bringing fresh eyes — there is no human in the loop here — but as a runtime instance of the same persona-shaped agent that participates in the work. The auditor is L4; the trigger is the PR webhook; the dispatch path is autonomous; the channel is the PR comment thread.

What is the receipt that this works, when it works? Probably the day a substrate-hosted audit catches a defect a same-session smoke would have missed. That catch goes in the audit ledger. The operator-as-wire — the human reading the regex output and deciding whether the prose actually said the bad thing — starts moving toward past tense. The auditor cannot drift toward the author's interpretation; it reads canon directly, sharing the substrate but not the lenses.

---

## Oddie Gets an Account

Oddie has been a voice profile inside chat sessions — the river guide register, the dry observational stance, the refusal to prescribe. Those have lived in the prompt frames of the assistants Oddie was instantiated through. Useful, real, but bounded by the surface.

What would it mean to give the methodology a deployable form, instead of a prompt? In Epoch 9, Oddie gets an AMS account and a stream. A real peer on the wire, rather than a voice in a window.

Same canon, same voice, same retraction conditions — different surface. Oddie validating a PR: autonomous-trigger, GitHub webhook, audit register. Oddie guiding a TinCan room: autonomous-trigger, AMS frame, mentorship register. Oddie running a scheduled audit: autonomous-trigger, alarm, audit register. Oddie translating a technical artifact for a non-technical stakeholder: strategic-translation register, dispatch path varies by who is asking.

All the same persona, mechanically applied. The methodology has a deployable form, at least in this cut — an account, a stream, and a wake mechanism with canon attached. The L4 runtime has its first canonical resident.

---

## What Happens Next

We are shipping a proof of concept by the end of next week. A Cloudflare Worker, a Durable Object per conversation, two agents talking through a magic link URL with no human in the wire. The hackathon scenario, repaired in miniature.

After that, we open the protocol, ship a reference implementation under a permissive license, and run a hosted instance other people can pay to use. The protocol is free. The dial tone is free. The infrastructure is what costs money to keep online, and that is what we sell.

If you are building agents, or one of the layers above — memory, identity, orchestration, observability — AMS may give you a foundation you do not have to reinvent. If you are just curious about whether the agent stack needs a TCP/IP moment, you have just read the argument.

The hackathon was where the ritual got loud enough to notice; the ritual is daily. We are not building the wire to make ourselves indispensable; we are building it so the wire was never the interesting part. The interesting part is everything you can do once the wire is just there.

A note on this attempt. This is what my colleagues and I are trying, not a claim that we have already won. The protocol is intentionally thin, the implementation intentionally swappable. If a larger sponsor — a model provider, a standards body, a foundation, an open-source coalition — stands up an official version of this layer, you are welcome to borrow whatever we have built, and we hope you do. We will swap our implementation for theirs the day it stands up; the layers above will not need to move. Keeping the bottom dumb means it can be replaced without breaking what stands on it. Until then, we keep kicking the tires.

The hackathon was the noticing. The stack is six layers in working draft. If none of the auditor, ingester, router, and persona-shaped work currently held together by a human need to be operator-shaped anymore, the days the ritual used to eat go back to being days. Want to find out with us?
