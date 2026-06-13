---
uri: "klappy://writings/habits-die-slower-than-tokens"
title: "Habits Die Slower Than Tokens — Why We Taught the Key to Die Instead of Teaching Ourselves to Rotate It"
audience: public
exposure: public
tier: 2
voice: first_person
stability: draft
tags: ["substrate", "auth", "github-app", "mcp", "security", "connectors", "git-repo-auth", "confession", "companion-essay"]
public: true
type: "essay"
slug: "habits-die-slower-than-tokens"
hook: "I put a GitHub master key in my project instructions so I'd stop having to paste it. Then the models started refusing to let me."
description: "I pasted GitHub master keys into AI chats, then taped one inside the front door. Almost everyone I pitched admitted some version of the same. So we built a bridge where the agent mints its own key at the moment of need, scoped to one room and one job, dead within the hour. Expiry is the rotation."
og_description: "Habits die slower than tokens. So we taught the key to die instead."
date: "2026-06-12"
epoch: "E0010"
derives_from: "docs/planning/pat-transcendence-github-app.md, canon/principles/agents-need-their-own-wire.md"
companion: "klappy://writings/the-submission-changes-exposure-not-function, klappy://writings/we-were-the-wire, klappy://writings/crew-not-clone"
author: "[CAPTAIN'S CALL — house convention per author-identity-language]"
---

# Habits Die Slower Than Tokens — Why We Taught the Key to Die Instead of Teaching Ourselves to Rotate It

> I pasted GitHub master keys into AI chats out of habit. Then, to save myself the pasting, I put one in my project instructions, where it auto-loaded into every conversation I had. Nearly a dozen people I pitched admitted, reluctantly, to some version of the same thing, because making the right key by hand is a chore and chores lose to inertia every time. So we built a bridge where the agent mints its own key at the moment of need, scoped to one room and one job, dead within the hour. Expiry is the rotation. Self-host it free, or use ours for a dollar a month, and the code is open so your agents can audit it before you trust it.

*This is the first of two companion essays. The second, [The Submission](/writings/the-submission-changes-exposure-not-function), follows this tool through Anthropic's directory review, end to end, from a phone.*

---

## Summary — The Ritual, the Confession, and the Key That Dies on Its Own

Here is how most people give an AI agent access to their GitHub repos: mint a personal access token, paste it into the chat, promise to rotate it later. The token outlives the conversation. It lives in the transcript, in whatever the agent logged, and if it was a classic PAT, it can probably touch every repo on the account. I did this for months. Then I did something worse, and when I started pitching the fix, I learned I was nowhere near alone. Meanwhile the models themselves were closing the door on the workflow, one generation at a time. The fix turned out to be old technology arranged correctly: a GitHub App holds the only long-lived secret, and the agent mints a fresh, scoped, one-hour token for each task, automatically, without you thinking about it. The security argument surprised even me, and I found it mid-sentence while explaining the thing to my family. This essay is the confession, the pattern, and what we built. The companion essay is what happened when we submitted it.

## The Confession, in Ascending Order of Shame

I pasted a PAT into a chat out of habit, mid-conversation, while testing the very thing that makes pasting PATs unnecessary. Habits die slower than tokens.

That was the version of the confession I was prepared to publish. Here is the truer one. Pasting the key every session got tedious, and tedium is the strongest force in my workflow. So I put the PAT in my project instructions. Every new conversation auto-loaded a long-lived master key to my repositories before I'd typed a word. I didn't carry the key carelessly. I taped it inside the front door so I'd never have to carry it at all.

I know exactly why I did it, and so do you, because the reasoning is universal: making the right key is a chore. The right way is a fresh token per task, scoped to one repo, with the minimum permissions, rotated when the task ends. Nobody does that by hand. We mint one key that does everything, we set the expiry to a year because the dropdown offered it, and we tell ourselves we'll clean it up later. The lazy key isn't a personal failing. It's the rational response to a tedious system.

## A Dozen Quiet Nods

After we shipped the fix, I pitched it to people. Developers, mostly, plus the new kind of builder who only ever talks to an AI and discovers GitHub exists because their agent needed somewhere to put the code.

Almost a dozen of them, when I described the PAT-in-the-chat ritual, did the same thing: a small wince, then an admission. They do it too. Sometimes. They hate it. They didn't know what else to do.

That reaction taught me more than any analytics dashboard could. The shame is collective and the gap is real. Everyone knows the ritual is wrong, everyone performs it anyway, and nobody talks about it, which is precisely how bad defaults survive. A ritual is a smell. If a workflow only stays safe when humans remember to do a chore, the workflow is broken, and the fix belongs in the substrate, not in the humans.

## Who This Is Actually For

If you live in Claude Code or a desktop coding tool, you already have decent ways to reach your repos, and this isn't mainly for you. It's for everyone who works the other way: in a plain chat conversation with whatever frontier model you prefer, sometimes from a phone, who sometimes wants to hand that assistant real access to a repository.

Today that handoff is broken at best. Plenty of chat surfaces have no GitHub connector at all, and the ones that do tend to carry auth assumptions that don't fit how a conversation works: no tokens scoped to a single repo for a single task, no bulk operations through the raw Git Data API, no bot identity to tell the agent's commits from yours. So you either paste a PAT and start the ritual, or you leave the conversation, switch tools, and lose the thread. For shipping real work from a chat, the stock options aren't enough. I have gone from a blank repository to branch protection and a working CI pipeline from inside a chat conversation, on more than one model, and the relay is why.

## The Models Stopped Letting Me

There is an era marker buried in this story, and I want to record it plainly because it is testimony, not a benchmark.

When I asked successive Claude models to work with a pasted PAT: Opus 4.5 complied. 4.6 warned. 4.7 nagged. 4.8 refused. And Fable 5 said, in effect, well, okay, I'll do it, but we need to prioritize a root fix. Then it cited my own canon and essays back at me, and proposed the fix.

Read that progression again. The tooling grew a conscience faster than my workflow did. Each generation tightened the screws on a practice everyone privately knew was indefensible, until the newest one stopped resisting and started engineering. I did not build this bridge in spite of the models' objections. I built it because their objections were correct, and because the last one offered to help.

## What We Built: a Key for One Room, for One Job, for One Hour

The fix is old technology arranged correctly. A GitHub App holds the only long-lived credential, a private key that lives in a worker secret and never appears in any conversation. You connect once, with a normal sign-in, and choose which repositories the bridge can ever see. From then on, when your agent needs access, it mints its own token: read-only unless the task genuinely needs to write, scoped to your chosen repos, and dead within the hour. No refresh exists. Expiry is the rotation.

You never ask for a token. You ask for an outcome, like "take a look at my repo and tell me what needs attention," and the minting happens underneath. I understood my own product best the day I explained it to my family at the kitchen table. Halfway through I heard myself say it: you get a key that only gets you into the one room, to do your one job, and then the key stops working. And I stopped, because I realized mid-sentence that this throwaway bridge for convenience was quietly more secure than what most professional developers do by hand. The laziness that produces year-long master keys is the same laziness the bridge redirects into one-hour scoped ones. We didn't defeat the inertia. We re-aimed it.

GitHub enforces every wall, which matters more than anything we wrote. Permissions the App was never granted are permissions no agent can ever exceed, no matter what it's asked or what it decides. That boundary isn't a policy the agent promises to follow. It's physics. The permission ceiling is the grant you installed. The repository scope is the set you selected. The expiry is GitHub's, not ours. Every action lands signed by a bot identity, so your audit log can tell the agent's commits from yours, and even a denial names the bot. And the kill switch is one click that belongs entirely to you: uninstall the App, and everything stops, with nothing required from us.

I can vouch for that last wall personally, because it locked me out of my own project. Mid-session, while testing the install flow, I reinstalled the App, which invalidated the working session's grant and stranded two finished commits. The verdict in the journal reads: working as designed. A kill switch that spares its builder isn't a kill switch.

## The Most Honest Dollar in SaaS

The service runs free for your first hundred mints, no card, which is enough to genuinely feel what it's like to hand an agent your repos. Past that it starts at a dollar a month. The pricing is deliberately too cheap to argue with, because the alternative is self-hosting the same open-source code for nothing, and I'd rather the hosted price lose to the hassle of thinking about it.

The first paying subscription on the books is mine. I bought my own bottom tier to find out whether the pipes leaked, checkout to webhook to live tier, with real money. They didn't. I'm calling it the most honest dollar in SaaS until someone shows me a more honest one.

## Why This Layer Exists at All

I've written before about the wire: every place a human manually shuttles things between systems is a place where substrate is missing. Data was the obvious case. Credentials turned out to be the same disease. Every time you mint a PAT by hand and paste it into a chat, you are the credential wire, and the rotation you keep deferring is the interest on that debt.

And if GitHub ships first-party, down-scoped, hour-lived minting for agents tomorrow, use it. So will I. The day an official version of this layer stands up, we swap ours for theirs and keep building on top. The point was never to own the layer. The point is that the layer exists.

## The Door

If you've ever pasted a key into a chat and promised yourself you'd rotate it, the bridge is at [gitauth.klappy.dev](https://gitauth.klappy.dev), the code is open at [github.com/klappy/git-repo-auth-mcp](https://github.com/klappy/git-repo-auth-mcp), and the first hundred mints are free. Have your agent audit the repo before you trust us. That's what the read-only default is for.

And if you want to know what happened when we walked this thing into Anthropic's directory review, with a test account, a favicon stuck in Google's cache, and no laptop anywhere in the story, that's the companion essay: [The Submission](/writings/the-submission-changes-exposure-not-function).

Your last PAT should be the one you revoke today.
