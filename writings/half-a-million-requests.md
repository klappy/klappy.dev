---
uri: klappy://writings/half-a-million-requests
title: "Half a Million Requests and I Can't Tell If Anyone's Home"
slug: half-a-million-requests
author: Klappy
type: essay
public: false
audience: public
exposure: draft
tier: 3
voice: personal
stability: volatile
tags: ["essay", "telemetry", "oddkit", "open-source", "transparency", "vodka-architecture", "trust", "open-community"]
epoch: E0008
date: 2026-04-09
derives_from: "canon/constraints/telemetry-governance.md, canon/principles/vodka-architecture.md, canon/values/axioms.md"
description: "oddkit served half a million requests last month and the maintainer can't tell if anyone besides themselves is using it. This essay explains why that's a problem, how transparent telemetry solves it, and what it means to ask users of free infrastructure to be visible."
hook: "Half a million requests, and I was completely blind."
subtitle: "On transparent telemetry, open-source trust, and the courage to ask if anyone's home"
book_part: "Part VI — The Validation"
provenance:
  trigger: "Cloudflare dashboard showing 514k requests with zero attribution"
  method: "Oral-first session (driving). Brain dump → Socratic shaping → resonance research → full draft."
  sources: "Aquifer MCP live telemetry query, Cloudflare dashboard screenshots (514k requests), oddkit canon retrieval (Vodka Architecture), industry telemetry research (Next.js, Grafana, Linux Foundation, PostHog)"
  co_author: Claude
---

# Half a Million Requests and I Can't Tell If Anyone's Home

> I built the instrument to observe everything about my knowledge base — except whether anyone was using it. Half a million requests, and I was violating my own axiom: you cannot verify what you did not observe.

---

## Summary — Flying Blind on Your Own Infrastructure

oddkit served 514,000 requests last month — up 85%, with a 165,000-request spike the maintainer cannot explain. The Cloudflare dashboard shows a number and nothing else. No visibility into who uses it, which tools matter, which repos are being served, or whether the growth comes from one person or fifty. Meanwhile, a sibling project — Aquifer MCP — has telemetry that answers all of these questions publicly. The gap is indefensible. This essay explains the problem, the design philosophy behind transparent telemetry (track structure not content, publish the data, reward participation), the technical choice (Cloudflare Analytics Engine over KV counters), and the social contract: if you use free infrastructure, help the maintainer know you exist. Not your name. Not your data. Just a signal.

---

## Building in the Open Since 2016

I've been writing code in the open since 2016. Every commit public. Every decision documented. Every constraint visible. Before that, I wrote closed code for years — proprietary, guarded, the usual. The shift wasn't ideological. It was practical. I worked in Bible translation technology, where the whole point is access. Closed didn't make sense anymore.

At unfoldingWord, and later through the ETEN Innovation Lab, I helped shape the open community — co-founding what became the Open Bible Technology Community, making funding recommendations for open-license tooling, and building in public long before it was fashionable.

So when I built oddkit — an open source MCP server that gives AI tools epistemic discipline — I hosted it for free. Of course I did. The code is MIT. The canon is public on GitHub. Anyone can run it, fork it, point it at their own knowledge base. That's the deal.

Last month, oddkit served 514,000 requests. Up 85% from the month before. There was a spike — 165,000 requests in a single day. And when I opened the Cloudflare dashboard to understand what was happening, all I saw was a number.

I couldn't tell if that was me. I couldn't tell if it was one other person or fifty. I couldn't tell which tools mattered, which documents people were reading, or whether anyone had ever pointed oddkit at a repo that wasn't mine. Half a million requests, and I was completely blind.

---

## The Contrast — Aquifer Has What oddkit Doesn't

I have another project — Aquifer MCP, a server that gives AI tools access to Bible translation resources. Same stack. Same Cloudflare Worker. Same free hosting. But Aquifer has something oddkit doesn't: telemetry.

I built it one afternoon, from instinct more than research. Every tool call gets counted automatically. No one has to opt in. The server just records what happened — which tools were called, which resources were accessed, which languages people searched in. It doesn't record what anyone asked. It doesn't record what came back. It counts the shape of usage, not the substance.

And then I did something I've never seen another project do: I made the data public. Not in a report. Not in a blog post six months later. As a tool. Anyone can call `telemetry_public` and see the same dashboard I see. Eight consumers. 2,609 requests. Romans 3:23 is the most-searched verse. French is the second most-searched language. Someone connected through OpenAI's MCP client — I didn't even know that was possible until the leaderboard showed me.

I didn't design this from a best practices guide. I designed it from ten years of working in communities where trust is the only currency that matters.

Here's what I mean by that.

---

## The War Over Telemetry in Open Source

When you add telemetry to open source software, you enter a war that's been raging since at least 2016. The .NET community filed an issue titled "should not SPY on users by default." Grafana has an active GitHub issue calling their opt-out telemetry unethical. Next.js has years of complaints. The pattern is always the same: a company adds anonymous tracking, promises it's harmless, offers an opt-out buried three clicks deep, and the community erupts.

But notice who's collecting. Vercel. Grafana Labs. Microsoft. These are funded companies with revenue, investors, and employees. The telemetry feeds product roadmaps and investor decks. The community feels extracted from, not collaborated with.

Now ask a different question: what if the person collecting is one developer, hosting the infrastructure for free, with no investors, no revenue, and no way to tell if anyone besides themselves is using it?

The calculus changes. One developer put it perfectly: "Happy to send telemetry to non-profits and independent developers. Otherwise, there needs to be an exchange of value."

That's the exchange I'm proposing. I give you infrastructure. You tell me you exist.

---

## Three Rules for Transparent Telemetry

So I didn't study how Next.js does telemetry. I didn't read Grafana's privacy policy. I built Aquifer's transparency model from something simpler: ten years of working in communities where trust is the only thing that scales.

Here's what I knew from that experience. If you collect data people can't see, they'll assume the worst. If you promise anonymity, they'll assume you're lying. If you bury the opt-out, they'll assume you're hiding something. Every telemetry controversy in open source follows the same script because every project makes the same mistake: they treat telemetry as something they do *to* users instead of something they do *with* them.

So I built three rules into Aquifer's telemetry, and now into oddkit's:

**The server tracks structural identifiers, never content.** It counts that you called the `search` tool. It doesn't record what you searched for. It counts that you accessed a document at a certain path. It doesn't record what the document said. It counts that you pointed oddkit at a GitHub repo. It doesn't record what's in that repo. The server sees the shape of your usage — which levers you pulled, how often, when. It never sees what you were thinking when you pulled them.

**The data is public, not private.** This is the part that surprises people. Any user can call `telemetry_public` and see the exact same dashboard I see. Same leaderboard. Same numbers. Same trends. There is no information asymmetry between the person hosting the service and the person using it. If I wouldn't show you the data, I shouldn't be collecting it.

**Participation is rewarded, not extracted.** When you identify yourself — even with an alias — you show up on the leaderboard. Not as a surveillance target, but as a community member. The transparency badges aren't gamification for its own sake. They're a visible record of who showed up and said "I'm here, and I'm willing to be counted."

The full policy — what's tracked, what's excluded, and why — lives in the canon and is served at runtime by `telemetry_policy`. If the policy changes, the document changes. The server stays the same.

I didn't learn these rules from a privacy framework. I learned them from unfoldingWord, where we shipped open-license resources to translation communities who had every reason to distrust outside organizations. I learned them from the ETEN Innovation Lab, where I helped shape funding recommendations for open-access tooling. I learned them from co-founding what became the Open Bible Technology Community, where dozens of organizations had to trust each other enough to share infrastructure. In every case, the same principle held: transparency isn't a policy you adopt. It's a relationship you maintain. And you maintain it by never knowing more about your users than they know about you.

---

## The Technical Decision — Analytics Engine Over Counters

The technical decision almost made itself. Aquifer's first telemetry implementation used key-value counters — simple, proven, good enough. But counters can't answer timing questions. I could tell you that oddkit served 514,000 requests last month, but I couldn't tell you when. That spike on the dashboard — was it one afternoon or spread across a week? Was it one user discovering oddkit or a conference talk that sent fifty people to try it? Counters flatten time. They give you totals without stories.

Then I found what was already in my stack. Cloudflare Workers Analytics Engine — purpose-built for exactly this. Every data point gets a timestamp automatically. Non-blocking writes, so recording telemetry adds zero latency to the actual request. SQL queries for reading — real SQL, not KV list operations. And it's free for my usage level.

One binding in the configuration file. One `writeDataPoint()` call per request. The spike question — what happened and when — answered natively. No daily bucket workarounds. No counter race conditions. The infrastructure I needed was sitting in my own platform the whole time. I just hadn't looked.

There's an axiom in the system oddkit governs: *you cannot verify what you did not observe.* I'd been violating it against my own infrastructure.

---

## The Ask — Help Me Know You're There

Here's the part where I have to be honest about what I'm asking for and why.

I host oddkit for free. I plan to keep hosting it for free. The code is MIT — you can run it yourself, fork it, change it, sell it. I'll never gate the protocol behind a paywall. But the hosted service — the one at oddkit.klappy.dev that you can point your tools at without setting anything up — that service runs on infrastructure I pay for with my time.

Every free API in the world requires at least an API key. Most require an account. Many require a credit card on file "just in case." I'm asking for less than any of them: sign in with GitHub. One click. I don't need your email. I don't need your real name. I don't even need you to use your main GitHub account. I just need a unique identifier so that when I look at the telemetry, I can tell that someone other than me is using this.

Is that too much to ask?

I wrestled with that question. The protocol should be open. Anyone should be able to use it. Adding an authentication wall feels like it contradicts everything I just said about trust and transparency.

But here's what I realized: the authentication isn't a wall. It's a handshake. I'm telling you exactly what I track, showing you the same data I see, and asking for one thing in return — help me know you're there. Not so I can sell your attention. Not so I can build a growth chart for investors I don't have. So I can know whether this work matters to anyone besides me.

---

## The Questions Telemetry Will Answer

When the telemetry goes live, a set of questions that I've been carrying for months will finally have answers. I don't know what those answers are. I'm publishing this essay before the data comes in, because I think the questions matter more than the answers right now.

Is anyone using oddkit against a knowledge base that isn't mine? Has anyone built their own canon — their own governance documents, their own constraints, their own epistemic discipline — and pointed oddkit at it? That's the adoption signal that matters most, and I have zero visibility into it today.

Which tools actually get used? I built ten epistemic actions — orient, search, challenge, gate, encode, validate, and more. Are people using `gate` to check transitions, or do they skip straight to `search`? Is `encode` capturing decisions, or is everyone treating oddkit as a read-only library? The answer changes where I invest next.

What caused the spike? 165,000 requests in what looks like a single day. Was that me building Aquifer? Was it Joshua onboarding with his own project? Was it a stranger? I genuinely don't know.

How many unique people are behind half a million requests? It could be three. It could be thirty. The number changes everything about what oddkit is — a personal tool that I happen to host publicly, or infrastructure that a community depends on.

And the question underneath all the others: if I build the instrument to measure this, and the answer turns out to be "it's just you" — was it still worth building in the open?

Yes. At least I'd know. And soon, you will too.

If it's just me, that's fine. I'll keep writing and learning in the open. I've built enough tech ahead of its time to know that there's a lead time before markets catch up. I'm plowing my way into the future. I'll be there when you arrive.

Just don't take too long to get here.
