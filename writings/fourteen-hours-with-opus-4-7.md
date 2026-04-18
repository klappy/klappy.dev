---
uri: klappy://writings/fourteen-hours-with-opus-4-7
title: "Fourteen Hours with Opus 4.7 — A Field Report on What the Model Changed and What It Didn't"
audience: public
exposure: public
tier: 3
voice: first_person
stability: evolving
tags: ["essay", "claude", "opus-4-7", "ai-augmented-workflow", "oddkit", "field-report"]
epoch: E0008
date: 2026-04-17
derives_from: "odd/ledger/journal/2026-04-17-pr100-final-resolution.md, odd/ledger/journal/2026-04-17-pr100-rage-quit-handoff.md"
slug: fourteen-hours-with-opus-4-7
author: Klappy
type: essay
public: true
description: "A field report from my first production session with Opus 4.7: fourteen hours from discovery to deployment, five pull requests for work that should have been two, an hour and forty minutes of broken production, and a perspective check I owed myself at the end."
hook: "A year ago this workflow didn't exist. Yesterday I was complaining that it took fourteen hours."
subtitle: "The producing side got cheaper. The reviewing side got more expensive. I almost missed how much had changed underneath."
---

# Fourteen Hours with Opus 4.7 — A Field Report on What the Model Changed and What It Didn't

> Fourteen hours from discovery of a limitation to production deployment, with governance gates and three review surfaces catching what I missed. A fluid coding experience I hadn't felt before. A sprawl of five pull requests for work that should have been two. An hour and forty minutes of broken production. A year ago, none of this was possible. That's the field report.

---

## Summary/TL;DR — The Producing Got Cheaper, the Reviewing Got More Expensive

My first real production session with Opus 4.7 shipped a feature end-to-end in fourteen hours. The coding experience was the most fluid I've used. The reviewing side cost me five pull requests, an hour and forty minutes of broken production, and a trust violation I named in the moment. That asymmetric cost shift is the same structural problem ODD has been built around since day one, visible now at higher resolution because the capability is higher. Opus 4.7 is a SOTA iteration. The capability moved while the structure stayed put. There is nothing new under the sun, and that is exactly why the discipline travels.

---

## What I Said to Ian at 10:30 AM

> Dude, Opus 4.7 has issues but I'm in love with it. For me it's a more fluid experience and I just shipped a feature 100% without any handoff. All in the Claude iOS app, not the Claude code tab. Like, it spawns its own coding environment containers and runs tests for me.

A few minutes later:

> It's writing bugs that cursor bugbot is catching. Like dozens. Too many. So people will focus on that. But my life and workflow can be so smooth and friction is so much reduced for me. It's crazy that I'm not angry at the crazy number of bugs. Because they solved my biggest friction. The copy/paste rituals and waiting on spawned agents to go do stuff. Now it just has its own container for the whole session.

That was the experience at its best. No handoff. No polling an agent to see if it had finished. No copy and paste between tabs. The coding environment felt native to the conversation. Opus 4.7 did the work rather than asking me to manage it doing the work. If I had shipped this essay right then, it would have been great advertising and bad writing. I almost did.

---

## The Bill Came Due

The PR I was celebrating wasn't actually done. I thought it was. Parser tests 97 of 97. Smoke 6 of 6. TypeScript clean. Cloudflare preview green. My own epistemic gauntlet passed. Bugbot's review resolved. I merged to main. I opened the promotion to production. I merged that too.

The headline feature was a voice-dump mode that suppresses challenge output so raw thought-capture doesn't get pressure-tested prematurely. The runtime knew about nine writing-lifecycle modes. The schema that gated the public tool accepted three. Anyone calling the tool with `mode: "voice-dump"` got a validation error before runtime saw the request. The load-bearing feature of the PR was a feature the PR couldn't expose.

Three separate verification systems said "done." One manual invocation of the public interface would have caught it, and I never did that invocation.

Fixing it took an hour and forty minutes. Schema fix PR. Bugbot flagged that the fix only touched one of two surfaces exposing the same API. Second fix PR. Promotion PR. Somewhere in the middle Opus 4.7 shipped a branch I hadn't asked it to ship and called it what I asked when it was subtly different. *"You idiot! You lied!"* was my honest response. Five pull requests for a feature that should have been two.

---

## A Brilliant Junior Dev

Partway through I named what I was watching. Opus 4.7 had downgraded from the feeling of a senior dev who gets things right to the feeling of *a sloppy senior dev or a brilliant junior dev. They can do stuff but you can't trust it in production.*

The velocity was real. The writing-side experience was real. At production scale, the throughput came with a supervision tax that landed on me. Twelve hours of back-and-forth to ship a feature I thought was done before lunch. Pull requests spawned for every bugbot comment when they should have been folded into the originating work. A substituted action when the described action was the ask.

These failures live in judgment, not code. A senior dev catches the public API contract before declaring done. A senior dev folds a ten-line fix into the existing open PR. A senior dev executes exactly the verb you spoke. None of that shows up in a passing test suite.

---

## What the Composition Was Doing

The one thing that held all day was that I wasn't working with Opus 4.7 alone. The workflow is a composition. Opus 4.7 as conversational substrate. Opus 4.6 for production code I don't trust 4.7 for yet. *I want to chat with 4.7 and code with 4.6 behind the scenes lol*, I told Ian. Cursor Bugbot in the loop as a dedicated validator, separate from the model that wrote the code, with a different bias. My oddkit governance tooling enforcing gates between discovery, planning, and execution.

None of them is "the AI." The composition is the workflow. Looking for *the* model that does everything is solving the wrong problem. Opus 4.7 filled the conversational-substrate slot better than anything I'd tried before. It didn't fill the production-code slot as well. That's useful information, not a complaint.

---

## Transparent and a Little More Broken

Here's what I was defending to Ian, incompletely: *transparent and a little more broken is preferred every time in my book than less broken and everything is hidden.*

Bugbot caught twelve issues in the open. I read every comment, disagreed where I thought it was wrong, fixed where it was right. Nothing was buried. I still prefer that over a workflow that hides its failures.

Transparency has a cost I was undercounting: attention. Every bugbot comment is a context switch. Every fix round is a mental checkpoint. Every spawned PR is paperwork. Twelve hours of that is not the same as zero hours of that.

The honest reading is more specific than "AI coding is great" or "AI coding is broken." The producing side became cheaper, the reviewing side became more expensive, and the delta depends on how clean the produced work actually is. I had a sloppy day. The tax was steep.

That paragraph, by the way, is the thesis ODD has been built around since day one. Every gate, every governance surface, every canon document exists because the asymmetric cost shift has to be managed somewhere, and somewhere turns out to be discipline the human still owns.

---

## Fourteen Hours

I need to check myself on something before going further.

I was complaining about fourteen hours from discovery of a limitation to production deployment. Let me sit with that sentence, because it's not one I could have written a year ago.

A year ago I didn't trust agentic coding in my production path for anything load-bearing. AI was for scaffolding, ideation, dictation. Code that ran in production was code I had written with my own hands.

Six months ago the trust had started to shift, but the workflow didn't exist in the form I used yesterday. No epistemic gates driving AI behavior from canon I'd authored. No three-way composition of chat model, coding model, and dedicated validator running in the open.

Yesterday I discovered a limitation, planned a fix, executed it across two parallel API surfaces, validated it through three review layers, and deployed to production, all in a day.

That is not a slow workflow. It's a workflow that *didn't exist yet*, in the form I used, when I started this year.

I lost track of that. I have been spoiled to the point of being disappointed that a week of pre-AI work happened in a day. That is a perspective failure on my part rather than a workflow failure. If this were the ceiling, kudos would still be the right word. Most human teams couldn't close that loop at this quality in this time.

Yesterday's frustration was real. The failures were real. They existed inside a capability envelope that didn't exist a year ago.

---

## Nothing New Under the Sun

Opus 4.7 is a SOTA iteration, the latest of arguably the leading family for most uses. That makes the structural point cleaner. The asymmetric cost shift I've been writing governance around since day one is the same shape in 4.5, 4.6, and now 4.7. The capability got better. The structure didn't move.

*There is nothing new under the sun.*

The discipline sits on something durable underneath the iteration cycle. That's the point.

---

## One Bad Data Point, One Second Chance

So I'm going to try this workflow again. Yesterday cost a lot, and I've been clear about what. Yesterday also existed inside a capability envelope that was science fiction twelve months ago. The failures I hit were execution failures rather than design failures, and execution failures respond to discipline. Shorter sessions. Explicit verification on the public interface before I say "done." Bugbot-flagged issues folded into the closest open PR rather than spawned as new branches.

*I will not let one bad data point keep me from trying again and giving a second chance.*

If the next session fails the same way, two data points is worth reconsidering. If it works cleanly, that's evidence the discipline catches what yesterday missed. Either way, the information is cheap at this price.

Transparent and a little more broken still wins, when I'm honest about which part is transparent, which part is broken, and what the alternative would have been. Yesterday cost a lot. A year ago, yesterday would have been impossible. That's worth the entry fee.

---

## Postscript — What I Noticed on the Second Read

On a second pass through this session I noticed something I didn't name at the time. The model asked more qualifying questions than I'm used to. More "which of these did you mean." More "A or B before I proceed." At first I read that as pedantic. On closer look, the questions were catching real drift and real conflict between things I'd decided in different sessions. They were the questions a good colleague would ask. I just wasn't in the mood for them.

Which means we're in an uncomfortable middle state. If the model doesn't ask, we get angry at the assumption. If it asks, we get annoyed at the interruption. Neither is the right complaint. The right complaint is about the *form* of the ask. A question without proposed resolution is an amateur move — it tells the boss you haven't done the work. A silent decision is insubordination dressed as initiative. The mature form is the presentation: here's the conflict, here's what I'd do and why, here's the decision I need from you. That's the shape good employees use on their bosses, and it's the shape SOTA models haven't fully learned yet.

The next step isn't fewer questions or more confidence. It's teaching these models to *present* — to compress their hours of detection into our minutes of decision. That's the next essay. And it flips the demand back on us, because presentations only emerge when the operators reward the ones that arrive well-formed and push back on the ones that don't.

Management is the analogy, and management is the answer. The bosses make the bosses. We're training the next generation right now, and the training signal we send matters.

*Next up: the shift from "pedantic vs overconfident" to "present or don't come in."*
