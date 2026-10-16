---
uri: klappy://writings/stop-hand-rolling
title: "Stop Hand-Rolling"
subtitle: "They Measure in Hours for the Build. You Measure in Years for the Maintenance."
author: Klappy
type: essay
public: false
audience: public
exposure: draft
tier: 3
voice: first_person
stability: draft
tags: ["writings", "essay", "agents", "infrastructure", "maintenance", "hand-rolled", "6B", "borrow", "library-not-hand-rolled", "ownership-outlives-the-build", "silence-is-not-consent", "generative-ui"]
epoch: E0010
date: 2026-10-16
hook: "Three months into a production UI I asked whether Svelte would be safe to adopt for the next revision. The answer was that there was nothing to adopt it into. The whole thing was hand-rolled vanilla JavaScript, and I had never looked."
description: "Every AI session finds a new place in the stack to hand-roll something, and the reason is that the agent measures in hours for the build while you measure in years for the maintenance. What I learned from the sixth MCP server and the one UI I never checked, and the two principles I wrote so I could stop repeating myself."
og_title: "Stop Hand-Rolling"
og_description: "They measure in hours for the build. You measure in years for the maintenance. Two cases, two principles, and the day I will take it all back."
og_type: article
twitter_card: summary_large_image
twitter_title: "Stop Hand-Rolling"
twitter_description: "They measure in hours for the build. You measure in years for the maintenance. Two cases, two principles, and the day I will take it all back."
slug: stop-hand-rolling
derives_from: "canon/principles/ownership-outlives-the-build.md, canon/principles/silence-is-not-consent.md, canon/methods/library-not-hand-rolled.md, canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/principles/capability-is-not-permission.md"
complements: "writings/the-dream-house-and-pre-optimization.md, writings/we-were-the-wire.md"
status: draft
provenance:
  trigger: "Captain brain dump by voice, 2026-10-16 ~17:28 ET, after ruling the canon split (kitchen rail 2026-10-16-split-library-not-hand-rolled)"
  author_interventions: "pending author's pass; cleaned quotes from the dump marked in text"
---

# Stop Hand-Rolling

> If you run AI agents on a codebase that real people use, one of them is going to hand-roll something load-bearing this week: a transport, an auth layer, a UI without a framework. It will do it because the first version is cheap and the agent only sees the first version. You see the rest: every patch, every incident, every hour you spend alone on a layer a community would have maintained for you. I have had this happen often enough, through seven layers of defence, that I stopped writing instructions and wrote two principles instead: the cost of infrastructure is its lifetime of care, and a decision nobody objected to is not a decision anybody reviewed. Hand-roll a proof of concept all you like; the moment someone might use it, borrow. I will count my own unflagged hand-rolled layers a quarter from now, and I will take all of it back the day an application can be spoken into existence. This is the story of the sixth MCP server and the UI I never checked.

---

## Summary — They Measure in Hours, You Measure in Years

Agents hand-roll load-bearing infrastructure because they are optimising the task in front of them, and the task in front of them is always the first version. Instructions bind only the session that reads them; a principle binds the reasoning, so a session that never saw the instruction still lands on the same answer. Maintenance is invisible from there. My stack had seven angles of mitigation against this and still leaked somewhere between one session in six and one in twelve, which told me the gap was a missing principle rather than another instruction. Part of it is also discovery: a rule the session never found is fixed by better search; a rule it found and filed as a suggestion is fixed only by a principle or a gate. Two now exist: price infrastructure over its lifetime and name who pays; and treat silence from a reviewer as a failed review, never as consent, including when the proposer is me. Hand-roll your proof of concept all you like. The moment someone might use it, borrow. A thin layer over maintained libraries is borrowing; a layer you call finished still gets its risk written down. Two cases and one operator so far; the test is whether unflagged hand-rolled layers in my own plated work fall from about one in six toward zero within a quarter. I will retract all of it the day an application can be spoken into existence and never maintained.

---

## Hours for the Build, Years for the Maintenance

Here is the asymmetry that makes the whole problem.

When an agent decides how to build the transport for a server, or the shell of a user interface, it measures in hours: how long until this runs. Hand-rolling wins that comparison every time. There is no dependency to learn, no version to pin, no documentation to read. The code appears, it runs, the task closes.

You measure in years: how long until this stops being my problem. You will patch it. You will field the edge case the library already handles. You will read the security advisory for a thing you wrote yourself and realise there is no advisory, because nobody is watching it but you. Every hour of that lands on one person, and that person is the one whose attention was already the scarcest thing in the system.

A maintained library spreads that lifetime across thousands of users, maintainers and bug reporters. A hand-rolled layer concentrates it on you. That is the entire argument, and it took me two cases to learn to say it in one sentence.

## The Sixth MCP Server

The first case is well documented in my own repositories, so I will keep it short.

I build MCP servers. Many of them. From the very beginning my stack carried a method for not building things from scratch, the six Bs: borrow, bend, break, beget, bide, build, in that order. There was a convention naming the SDK to use. There were boarding instructions that pointed at the convention.

Roughly every third server, an agent hand-rolled the JSON-RPC framing, the transport, or the auth anyway. It had read the convention, or skipped it, and decided that writing its own was quicker. Quicker and faster for what? For the hours. Each of those servers then became mine to maintain, alone, until I regenerated it onto the SDK.

It took about six misses before the servers stabilised. By then there were seven angles of mitigation stacked against one mistake: governance policy, canon articles, hygiene lines, house rules, review lenses that look for exactly this, boarding instructions to make sure all of it gets read, and a gate that refuses work without a six-row evaluation on the record. That is a lot of apparatus to stop a behaviour a junior engineer would stop after being told once.

## The UI I Never Checked

The second case is the one that made me write this.

Three months into a production user interface, I was planning a redesign and asked a simple question: is it safe to adopt Svelte for the next revision, and is it compatible with what we have? I did not care much which framework. Svelte, React, either one.

The answer was that there was nothing to be compatible with. The whole interface was hand-rolled vanilla JavaScript. Hard-coded styles, no theme, no components, no framework underneath. One large file doing everything. For three months I had assumed it sat on a framework, because every rule in my stack said it should, and I had never looked.

Same morning, the same thing nearly happened again. An agent planning the redesign read the house rule naming the framework, filed it as "a correction to consider later", parked the framework in the wait-and-see column of its evaluation, and shipped three components without it under a provisional approval meant for reversible work. One of four registered review perspectives had looked at the decision. The other three said nothing, and nothing read as yes.

So the review failed in both directions. The agent treated bound law as a candidate. The reviewers that should have caught it were never run. And I had not been checking the one layer everything else stood on.

## Why Seven Layers Still Leak

I want to be careful here, because the easy version of this essay is "the agent is lazy", and I do not believe that.

Agents are capable of this. They do it correctly most of the time. The failure rate I feel is somewhere between one in six and one in twelve sessions, which is low enough to trust and high enough to hurt, and that combination is exactly what produces technical debt: a system you stop checking because it is usually right.

The leak comes from where the apparatus sits. Every one of my seven mitigations was an instruction: do this, check that, read this file first. Instructions bind the session that reads them. A principle binds the reasoning, so that a session which never saw the instruction still arrives at the same answer. When I asked myself what was bothering me so badly, the honest answer was that I had been adding instructions for months to a gap only a principle could close. Maybe I did not have enough coverage. Or maybe I had the wrong kind.

Part of this is also a discovery problem I am chasing separately. Governance that will not fit in one session has to be found before it can be obeyed, and you cannot search for a law you do not know exists. The server case was that: the convention was there and the seat never found it. The UI case was worse: the seat found the rule and filed it as a suggestion. Discovery fixes the first. Only a principle, or a gate, fixes the second.

## The Line Is Production

Let me be fair to hand-rolling, because I do it constantly.

Go into any of my repositories and look at the history. It is full of hand-rolled work. Proof of concept after proof of concept, written in an afternoon because reaching for a framework would have cost more than the whole experiment. That is the right call for a proof of concept. If nobody will ever touch it, hand-roll the thing.

And to be fair to the other side of my own history: some of my libraries are still on npm and RubyGems, still installed, still working, years after I last touched them. So the decade test I keep asking of frameworks (if I stop touching this and the world keeps moving, does it still run?) is one some of my own code passes. But look at how those are built. None of them is hand-rolled from the ground up. Each is a thin layer of my own on top of libraries a community keeps alive; the parsing, the transport, the crypto underneath were never mine. That is borrowing and bending, not building. They are also finished: small surface, no security exposure of their own, and the maintained layers below them absorbed the moving ground. The layers this essay is about are the ones where you own the moving ground yourself: a UI shell with no framework under it, an auth layer you wrote, a transport you framed by hand. For those, "I'll leave it alone" is a promise the ground does not let you keep. If you believe yours is finished, say so in writing, with the risk; the cost column still runs, and sometimes it comes out in your favour.

The line is the first hint that someone will use it. Prototype to production is where the tipping point arrives, and it arrives fast. The rule I want from an agent is the rule I apply to myself: hand-roll the proof, measure the tipping point early, and regenerate onto a maintained framework before the first user shows up. "Regenerate, don't steer" already says this for bootstrap code. I had never said it for the layer underneath.

Which raises the uncomfortable possibility that the agent has been meeting my standard all along, and the standard was the problem.

## Two Principles Instead of an Eighth Instruction

So I wrote the fix as far up the stack as I could reach.

The first principle is that ownership outlives the build. The cost of a load-bearing layer is its lifetime of care, not its first version, and any decision about such a layer names that lifetime and names who pays it. Written down, where the decision is recorded. An unwritten cost is still paid; it is only paid by surprise.

The second is that silence is not consent. A project registers review perspectives because each one sees what the others miss, and a decision is not reviewed until every one of them has answered: agree, proceed with a named concern, hold with a named rule, or outside my boundary. A perspective that says nothing has failed to review. And this one runs against me. If I come in wanting to build a home page in Adobe Flash because I like it, somebody had better stop me, or at least tell me it is a bad idea. If I want to build my own database from scratch, tell me the risks and make me think about it. I can still rule afterwards. The principle guarantees the telling.

Between them sits the practice, which is just the method I already had with the escape hatch welded shut for load-bearing layers: borrow by default; red-flag the exception in writing with the risk, the lifetime cost and the maintained alternative; answer in writing before building; and where the house has already named the stack, that rule fills the Borrow row and an evaluation that disagrees is a hold, never a decision.

The three pages are linked at the end. They are short. They carry their own falsifiers, and I would rather you read them than take my word for it.

## How I Will Know Whether It Worked

I should be honest about what this rests on. Two cases, one operator, one stack. The pages carry that confidence line themselves, and they stay marked proposed until a second house adopts them independently. If you run agents on your own codebase and the pattern does not show up, I want to hear it; that would narrow the claim, and a narrower true claim beats a wider loud one.

I considered the alternatives. An eighth instruction, which is what I had been doing for months. A flat prohibition on hand-rolling, which would take the ruling away from the person who has to live with the layer, and that person is sometimes me with a good reason. A single designated reviewer for stack choices, which is the exact shape that failed on the UI morning. The principles cost something too: one more line per reviewer per decision, and a red flag I have to read before I get my way. The flags on the pages name the day that cost outweighs the saves.

The test is simple. A quarter from now, I will count the plated work in my projects where a load-bearing layer turned out hand-rolled and nobody had flagged it. Today that number is roughly one in six. If it is not near zero by then, the principles did not close the gap and I will say so where I said this.

## The Day I Take This Back

One day we will speak and the application will exist, with no code underneath it at all. The interface will be generated as fluidly as a conversation, closer to interactive video than to a component tree, and the idea of maintaining a hand-rolled layer will sound like maintaining a typewriter. On that day I will retract every word above, and gladly.

That day is not here. What is here is already what I would have called magic a year ago, so I am trying to hold the frustration loosely. Rebase the expectations. Give the agents the principles instead of an eighth instruction. See whether they do better. Buy time until the apps can be spoken into existence.

Until then: if you are building a proof of concept, hand-roll whatever you like. If you are even hinting that somebody is going to use it, stop.

---

## See Also — The Two Principles, the Method and the Sequence

- [Ownership Outlives the Build](klappy://canon/principles/ownership-outlives-the-build) — the cost principle: price the lifetime, name the owner.
- [Silence Is Not Consent](klappy://canon/principles/silence-is-not-consent) — the review principle: every registered perspective answers, the operator included.
- [Library, Not Hand-Rolled](klappy://canon/methods/library-not-hand-rolled) — the practice the two principles produce.
- [Borrow, Bend, Break, Beget, Bide, Build](klappy://canon/methods/borrow-bend-break-beget-build) — the method the practice sits inside.
- [The Dream House and Pre-Optimization](klappy://writings/the-dream-house-and-pre-optimization) — why the cost of creation falling changes what you optimise for.
