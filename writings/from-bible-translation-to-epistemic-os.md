---
uri: klappy://writings/from-bible-translation-to-epistemic-os
title: "From Bible Translation to Epistemic OS — And Back Again"
subtitle: "An essay on how fifteen years of Bible translation work became the foundation for AI-human collaboration infrastructure"
author: "Klappy"
type: essay
public: true
audience: public
exposure: public
tier: 2
voice: first_person
stability: stable
tags:
  - writings
  - essay
  - bible-translation
  - epistemics
  - knowledge-transfer
  - ai
  - odd
  - origin-story
  - community-checking
epoch: E0005
date: 2026-02-15

# Discovery
hook: "Fifteen years of Bible translation taught me that every collaboration failure is an expectations failure. I abstracted those patterns into an Epistemic OS. Now I'm testing whether it can go back where it came from."
description: "The full-circle origin story of Outcomes-Driven Development — from Bible translation practices to universal AI-human collaboration infrastructure, and the vision of bringing it home."
slug: from-bible-translation-to-epistemic-os

# Social graph
og_title: "From Bible Translation to Epistemic OS — And Back Again"
og_description: "Fifteen years of Bible translation became the foundation for trustworthy AI collaboration. Now the abstraction is going home."
og_type: article
og_image: /images/from-bible-translation-to-epistemic-os-og.png
twitter_card: summary_large_image
twitter_title: "From Bible Translation to Epistemic OS — And Back Again"
twitter_description: "Fifteen years of Bible translation became the foundation for trustworthy AI collaboration. Now the abstraction is going home."
twitter_image: /images/from-bible-translation-to-epistemic-os-og.png

# Relationships
derives_from:
  - canon/values/axioms.md
  - canon/values/orientation.md
  - canon/values/trust-kernel.md
related:
  - uri: klappy://writings/the-most-expensive-problem
    label: "The Most Expensive Problem"
    relationship: companion
complements: "writings/the-most-expensive-problem.md, canon/methods/community-checking.md, canon/methods/borrow-bend-break-beget-build.md, docs/oddkit/positioning.md, docs/evidence/testimony-2026-02-15.md"
start_here: true
start_here_order: 2
start_here_label: "From Bible Translation to Epistemic OS — The Origin Story"
---

# From Bible Translation to Epistemic OS — And Back Again

### An essay on how fifteen years of Bible translation work became the foundation for AI-human collaboration infrastructure

*By Klappy — builder of the Epistemic OS*
*Companion: [The Most Expensive Problem](klappy://writings/the-most-expensive-problem)*

---

For fifteen years I built software and helped oversee funding and exploration in Bible translation — first at unfoldingWord, then through partnerships across the ETEN Innovation Lab, always in collaboration with peers and colleagues across our partner organizations. Not just translation software — software designed to support everything: the full translation process from beginning to end, so that church networks around the world could own it themselves. Guidance from the experts, not controlled by the experts.

That distinction matters more than anything else I'll say here.

---

## What Bible Translation Actually Looks Like

Most people imagine Bible translation as a scholar at a desk with dictionaries. The reality — especially in oral communities — is radically different.

Understanding the source isn't a reading exercise. In oral Bible translation, it starts with listening to a source recording. From there, communities move through multiple modalities — actions, songs, acting, dances, personifying objects as visual aids. They embody what they've heard until comprehension is real, not assumed. You haven't understood a passage until you can perform it, not just parse it.

Then comes drafting. Then checking — not once, but in nested cycles. Understand, translate, check, repeat. The checking itself is layered: self-checking, peer checking, consultant checking, and finally community checking, where the translation goes back to the people it was made for. Not the experts. The community.

The community doesn't evaluate correctness. They test transfer. Can they retell it? Does it produce the right response? Do they understand it in their bones, not just their heads? They use it in pulpits and ministry. They sing it. They live with it. And their response tells you whether the translation actually works — or whether it only satisfied the translator.

This is not quality assurance. This is outcome validation.

---

## The Pattern I Didn't See For Years

I spent years working in this process across languages, cultures, and organizations — alongside colleagues who had been doing this work far longer than me. I saw things work and I saw things break. At different layers, for different reasons. But I didn't yet have language for the common thread underneath.

One pattern was everywhere but invisible: no two organizations blindly adopt each other's tools or resources. They review extensively, test carefully, and half the time create their own version anyway. Not from stubbornness — from genuine need. The existing tool doesn't fit their context, their methodology, their community's requirements. So they borrow, bend, hit the breaks, and build their own.

Software developers do the exact same thing. Evaluate a framework, try to adapt it, hit the limitations, build a custom version. The pattern is identical. And in both worlds, without a shared record of what was tried and why it broke, the next organization or the next developer rediscovers the same breaks independently. The learning doesn't transfer.

That came later.

---

## The Most Expensive Problem

Then I started working with AI — building systems where humans and AI collaborate on complex outputs. And familiar patterns appeared immediately.

AI doesn't remember what you decided last session. Context dies when the conversation closes. The human becomes a copy-paste engine carrying decisions between tools. And even when checking happens — and it does — the results don't automatically carry forward into the next session or the next tool.

And the AI agents themselves are just as lossy. Without epistemic discipline, they hallucinate, forget what was decided, agree too quickly, and lose context between sessions. The problem isn't unique to humans carrying knowledge in their heads — agents without durable infrastructure are equally unreliable routers. The inconsistencies are remarkably similar.

This isn't hypothetical. Some BT organizations are already using AI to help their content teams create and maintain translation resources — notes, interlinked reference materials, iteratively published book packages that translation teams use on the field. They're embedding their knowledge of how to create these resources into prompts, and they're learning and refining their process as they go. It's working. But it requires manual processes to handle every interaction with AI. The human is managing the context, updating the prompts by hand, keeping track of what changed and why. The learning is happening, but nothing carries it automatically.

Every collaboration with AI that relies on manual knowledge transfer has the same vulnerability I saw in Bible translation. The knowledge lives in someone's head — or now, in someone's prompt. When that person moves on, the knowledge goes with them.

I wrote about this as "The Most Expensive Problem" — the cost of knowledge transfer failure in AI-assisted work. But I didn't yet see where the solution had come from.

---

## The Abstraction Was Subconscious

I've been building a system called Outcomes-Driven Development. It has axioms about truth and verification. It has epistemic modes for different phases of work. It has a ledger for durable decisions. It has community checking for outcome validation. It has a principle that the human directs and the AI generates, but neither promotes unsupervised.

I've been building the tooling — oddkit — as a protocol that slipstreams into existing workflows. It doesn't replace your tools. It keeps your agents honest while they think. Orient before acting. Challenge before agreeing. Gate before transitioning. Encode before forgetting. Validate before shipping.

oddkit itself exists because I followed a sequence I later formalized: borrow what exists, bend it to your context, let the breaks reveal what's missing, offload to others what they can build in parallel, and only build what nobody else can carry. I borrowed existing AI models and interfaces — Claude, existing agent frameworks, the MCP standard. I bent MCP into an epistemic discipline layer. I let the breaks show me where existing tools lost context and trust. And I built only the thinnest possible layer — oddkit — that makes all of it trustworthy without replacing any of it. No models trained, no UIs created, no hundreds of millions of dollars spent. The entire system runs on what already exists, bent to serve epistemic discipline.

And recently, in a conversation about the system's architecture, I said out loud what I hadn't consciously realized:

I had been abstracting the ETEN Innovation Lab's recommendations for Bible Translation — the process designed to reach our 2033 All Access Goals — into universally applicable practices for creating responsibly in collaboration with AI and local communities. I hadn't set out to do that. I just kept solving the problems in front of me and the patterns that emerged were the same ones I'd been immersed in for fifteen years.

Understand, translate, check, repeat had become converse, generate, validate, promote or pivot.

Guidance from experts, not controlled by experts had become the protocol-not-platform positioning — oddkit slipstreams in, it doesn't take over.

Multimodal understanding had become the Director's Chair — the insight that comprehension and intent are sensory, not textual. The human says "darker," "that felt wrong," "more like the first one but lonelier." The AI does the writing.

Community checking didn't get borrowed as a metaphor. It *is* the original practice. Everything else was abstracted. Community checking was carried over whole.

And the kernel — trust is built by managing expectations — came from watching what happens when processes break. In translation and everywhere else.

The realization wasn't that I'd solved something. It was that the patterns I'd absorbed from Bible translation might be exactly what AI collaboration needs — and that oddkit could be the vehicle to bring them back.

---

## Going Back

Here's what I didn't expect: the abstracted system might be ready to go back to its origin domain. That's the vision. It hasn't happened yet.

But the path is forming. BT Servant — a project with unfoldingWord — is the intended partner effort where we're already collaborating to build toward this. Spoken Worldwide has signed on and is helping fund the initial R&D with the ETEN Innovation Lab.

The vision for Bible translation is specific: each organization would encode their own methodology into their canon, and oddkit would operate out of that.

Spoken Worldwide would encode their oral methodology and processes. Faith Comes By Hearing would encode theirs. SIL would encode their translation principles, their consultant checking questions, their key term policies. Wycliffe Global Partners would encode whatever serves their network. BCS in India would encode whatever they've developed that works for their context — maybe simpler, maybe more culturally specific, maybe entirely oral.

Other Lab projects point toward where this could go. Fluent, an end-to-end multimodal BT tool with an upcoming mobile app, could use a future BT Servant powered by this kind of epistemic backbone to enable interoperability between tools — augmented handoffs that carry context across platforms instead of requiring translators to start over every time they switch tools.

BT Servant is already using shared open-licensed resources from the Bible Aquifer — a curated collection of Bible translation resources deemed useful for this purpose. This includes unfoldingWord's Translation Helps, FIA (Familiarize, Internalize, Articulate) process materials for OBT, Tyndale Bible Study Notes, many open-licensed Bible translations, and each translated into many of the world's most spoken trade languages that translation teams use to translate from. The vision is that each organization's canon is theirs, while these shared resources are available to everyone.

The goal for BT Servant and Church Based Bible Translation is to raise the floor — any translator, anywhere, should have access to scripture exegetical resources just in time through AI to aid in their understanding as they translate and check. Not to replace the expert guidance that consultants and coaches provide, but to make the resources available between visits, between sessions, between questions that would otherwise go unanswered until someone with the right training is in the room.

Imagine a coach or consultant visits and doesn't spend the first day catching up. The ledger carries the context — every key term decision, every checking result, every constraint the team discovered. They orient in minutes and spend their time on what only a human guide can do.

Imagine a new team member joins and doesn't need six months of context transfer. The ledger *is* the onboarding.

Imagine a veteran's hard-won knowledge doesn't retire with them. It's encoded. It persists. It's available to every future team and every AI agent that works on that language.

This is the most expensive problem — knowledge transfer failure — addressed in the domain where I first encountered it. Whether it works as well as I hope remains to be tested. Prayerfully, it will.

There's already a small proof of concept that gives me hope. oddkit currently powers a voice agent — using a clone of my own voice — that guided my wife through sharpening her business ideas for online courses. In Spanish. For almost 30 minutes. I don't speak Spanish. My knowledge transferred through the agent into a language and context I couldn't have reached personally. If the system can do that for product development, the vision of it doing the same for translation teams — carrying expert knowledge across language barriers, available between visits, in the languages teams actually work in — feels less like theory and more like trajectory.

I also expect that when these abstractions encounter BT reality again, they'll drift. The patterns I extracted will need to bend and adapt to a domain that's more complex and more human than any other context I've tested them in. That's not failure — it's evidence of a system that's still learning. I'd be worried if it didn't drift.

---

## The Onboarding Is the Same

How does an organization start? The same way anyone starts with ODD.

What hurts?

Is it access to exegetical resources between coaching visits? Let AI surface them just in time as translators work. Is it key term consistency across teams? Encode your key term decisions in the ledger so every team reads from the same record. Is it new team member ramp-up? Start with the ledger. Is it community checking logistics? Let the AI help structure feedback, track what was tested, and surface patterns across sessions.

They never need to learn ODD. They reach for the piece that relieves their current pain. If they never need another piece, that's success.

Guidance from the infrastructure, not controlled by the infrastructure.

---

## Why This Matters Beyond Translation

Bible translation teams figured out something that the rest of the world is just now encountering: how to collaborate faithfully across language, culture, modality, and expertise boundaries with the goal of producing output that actually transfers to the people it's for.

They figured out that understanding is multimodal. That checking must include the community, not just the experts. That local ownership produces better outcomes than expert control. That the process is nested and iterative, not linear. That expectations must be managed explicitly or trust collapses.

AI collaboration has exactly the same challenges. Different domain. Same patterns.

The practices that I believe make AI-human collaboration trustworthy were observed in communities translating scripture into their own languages. I spent fifteen years working alongside them. Then I abstracted those patterns without realizing it. Now a few colleagues are helping me test those theories in their own domains. Prayerfully, the abstraction is ready to go home — not as a finished solution, but as an augmenting toolkit that can work inside the existing and next generation of Bible translation tools.

Trust is built by managing expectations. Bible translators have been practicing this longer than anyone in tech. I'm still learning from them.

---

*The Epistemic OS is open, public, and working in the open at [github.com/klappy/klappy.dev](https://github.com/klappy/klappy.dev).*
