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
author: "Klappy"
date: "2026-06-12"
epoch: "E0010"
derives_from: "docs/planning/pat-transcendence-github-app.md, canon/principles/agents-need-their-own-wire.md"
companion: "klappy://writings/the-submission-changes-exposure-not-function, klappy://writings/we-were-the-wire, klappy://writings/crew-not-clone"
---

# Habits Die Slower Than Tokens — Why We Taught the Key to Die Instead of Teaching Ourselves to Rotate It

> If you've ever minted a GitHub personal access token, pasted it into an AI chat, and promised yourself you'd rotate it later, this is for you, from someone who did worse: I put one in my project instructions so every conversation auto-loaded a master key. Nearly a dozen people I pitched admitted, reluctantly, to some version of the same thing, because making the right key by hand is a chore and chores lose to inertia every time. So we built a bridge where your agent mints its own key at the moment of need, scoped to one room and one job, dead within the hour. Expiry is the rotation. Self-host it free, or use ours for a dollar a month, and the code is open so your agents can audit it before you trust it.

*This is the first of two companion essays. The second, [The Submission](/writings/the-submission-changes-exposure-not-function), follows this tool through Anthropic's directory review, end to end, from a phone.*

---

## A Quick Word Before We Start — You Don't Need to Be Technical for This

If words like "token" and "repo" aren't your native language, you're not just welcome here, you're exactly who we built this for. Everything in this essay works in hotel keys, so let's set that up front.

An old hotel used metal keys. A metal key can be copied at any hardware store, it works forever, and if it's the master key, it opens every room in the building. Lose one and the hotel re-cores every lock. A modern hotel uses keycards. The desk programs a card for your room and your stay. It opens your door and nothing else, it dies at checkout, and if you lose it, the desk voids it and hands you a new one in thirty seconds. Nobody re-cores anything.

Everything that follows is that story. The way most people connect an AI to their code today is the metal master key. What we built is the front desk.

## Summary — Your Ritual, My Confession, and the Keycard That Dies at Checkout

Where is your last personal access token right now? If you work with AI agents and GitHub, there's a decent chance it's sitting in a chat transcript, still valid, still able to touch every repo on your account. You meant to rotate it. You didn't, because rotation is a chore, and chores lose. I know, because I did it for months, and then I did something worse, and when I started pitching the fix I learned how much company we have. Meanwhile the models themselves were closing the door on the whole workflow, one generation at a time. The fix turned out to be old technology arranged correctly: a GitHub App holds the only long-lived secret, and your agent mints a fresh, scoped, one-hour token for each task, automatically, without you thinking about it. I found the security argument mid-sentence, explaining the thing to my family. This essay walks you to it the same way. The companion essay is what happened when we submitted it.

## Where Is Your Last Token Right Now?

A "personal access token" is GitHub's version of a key: a string of characters that proves to the server you're allowed in. Treat the word token as key for the rest of this essay and you won't miss a thing.

So, be honest. Not the key you meant to make, the one you actually made. Did the expiry dropdown say ninety days, or did you pick the longest thing it offered? Did you scope it to one repo, or was "all repositories" easier? And after the conversation ended, did the token?

If you'd rather not answer, you're in good company, and I'll go first. I pasted a PAT into a chat out of habit, mid-conversation, while testing the very thing that makes pasting PATs unnecessary. Habits die slower than tokens.

That was the confession I was prepared to publish. Here's the truer one. Pasting the key every session got tedious, and tedium is the strongest force in my workflow. So I put the PAT in my project instructions. Every new conversation auto-loaded a long-lived master key to my repositories before I'd typed a word. I didn't carry the master key carelessly. I taped it inside the front door so I'd never have to carry it at all. A metal key, copied, taped where every guest who entered could find it.

Why would anyone do that? For the same reason you picked the longest expiry in the dropdown. The right way is a fresh token per task, scoped to one repo, minimum permissions, rotated when the task ends. Nobody does that by hand. The lazy key isn't a personal failing. It's the rational response to a tedious system.

## So Why Does Everyone Keep Doing It?

After we shipped the fix, I pitched it around. Developers, mostly, plus the new kind of builder who only ever talks to an AI and discovers GitHub exists because their agent needed somewhere to put the code.

Almost a dozen of them, when I described the PAT-in-the-chat ritual, did the same thing: a small wince, then an admission. They do it too. Sometimes. They hate it. They didn't know what else to do.

Sound familiar? The shame is collective and the gap is real. Everyone knows the ritual is wrong, everyone performs it anyway, and nobody talks about it, which is precisely how bad defaults survive. Here's the test worth keeping: a ritual is a smell. If a workflow only stays safe when humans remember to do a chore, the workflow is broken, and the fix belongs in the substrate, not in you.

## Is This for You?

If you live in Claude Code or a desktop coding tool, you already have decent ways to reach your repos, and this isn't mainly for you. But what if the conversation is your dev environment? Plenty of people work that way now: a plain chat with whatever frontier model they prefer, sometimes from a phone, wanting to hand that assistant real access to a repository.

Today that handoff is broken at best. Plenty of chat surfaces have no GitHub connector at all, and the ones that do tend to carry auth assumptions that don't fit a conversation: no tokens scoped to a single repo for a single task, no bulk operations through the raw Git Data API, no bot identity to tell the agent's commits from yours. So you either paste a PAT and start the ritual, or you leave the conversation, switch tools, and lose the thread. For shipping real work from a chat, the stock options aren't enough. I have gone from a blank repository to branch protection and a working CI pipeline from inside a chat conversation, on more than one model. The bridge is why.

## What Changed First, the Workflow or the Models?

Here's an era marker I want on the record, as testimony rather than benchmark. When I asked successive Claude models to work with a pasted PAT: Opus 4.5 complied. 4.6 warned. 4.7 nagged. 4.8 refused. And Fable 5 said, in effect, well, okay, I'll do it, but we need to prioritize a root fix. Then it cited my own canon and essays back at me, and proposed the fix.

Read the progression again. The tooling grew a conscience faster than my workflow did. Each generation tightened the screws on a practice everyone privately knew was indefensible, until the newest one stopped resisting and started engineering. I didn't build this bridge in spite of the models' objections. I built it because their objections were correct, and because the last one offered to help. (If you want that arc from the model's side of the table, it wrote its own essay: [Crew, Not Clone](/writings/crew-not-clone).)

## What Would the Key Look Like If Your Agent Made It?

The fix is old technology arranged correctly. A GitHub App holds the only long-lived credential, a private key that lives in a worker secret and never appears in any conversation. You connect once, with a normal sign-in, and choose which repositories the bridge can ever see. From then on, when your agent needs access, it walks to the front desk and gets a keycard: programmed for the rooms you chose, look-but-don't-touch unless the job genuinely needs to change something, and dead within the hour. Checkout is built in. Nobody re-cores anything. Expiry is the rotation.

You never ask for a token. You ask for an outcome, like "take a look at my repo and tell me what needs attention," and the minting happens underneath. I understood this best the day I explained it to my family at the kitchen table. Halfway through I heard myself say it: you get a key that only gets you into the one room, to do your one job, and then the key stops working. The hotel keycard, discovered out loud at a kitchen table. And I stopped, because I realized mid-sentence that this convenience bridge for newcomers is quietly more secure than what most professional developers do by hand. The laziness that produces year-long master keys is the same laziness the bridge redirects into one-hour scoped ones. We didn't defeat your inertia. We re-aimed it.

## Why Should You Trust Us? You Mostly Don't Have To

GitHub enforces every wall, which matters more than anything we wrote. Permissions the App was never granted are permissions no agent can ever exceed, no matter what it's asked or what it decides. That boundary isn't a policy the agent promises to follow. It's physics. The permission ceiling is the grant you installed. The repository scope is the set you selected. The expiry is GitHub's, not ours. Every action lands signed by a bot identity, the way a hotel's card log shows exactly which card opened which door at what time, so your records can tell the agent's work from yours, and even a refused door names the card. And the kill switch is one click that belongs entirely to you: uninstall the App, and it's the front desk voiding every card in the building at once, with nothing required from us.

I can vouch for that last wall personally, because it locked me out of my own project. Mid-session, while testing the install flow, I reinstalled the App, which invalidated the working session's grant and stranded two finished commits. The verdict in the journal reads: working as designed. A kill switch that spares its builder isn't a kill switch.

## What Does It Cost You to Find Out?

A hundred mints, free, no card, which is enough to genuinely feel what it's like to hand an agent your repos. Past that it starts at a dollar a month, priced deliberately too cheap to argue with, because the alternative is self-hosting the same open-source code for nothing, and I'd rather the hosted price lose to the hassle of thinking about it.

The first paying subscription on the books is mine. I bought my own bottom tier to find out whether the pipes leaked, checkout to webhook to live tier, with real money. They didn't. The most honest dollar in SaaS, until someone shows me a more honest one.

## Why This Layer Exists at All

I've written before about [the wire](/writings/we-were-the-wire): every place a human manually shuttles things between systems is a place where substrate is missing. Data was the obvious case. Credentials turned out to be the same disease. Every time you mint a PAT by hand and paste it into a chat, you are the credential wire, and the rotation you keep deferring is the interest on that debt.

And if GitHub ships first-party, down-scoped, hour-lived minting for agents tomorrow, use it. So will I. The day an official version of this layer stands up, we swap ours for theirs and keep building on top. The point was never to own the layer. The point is that the layer exists.

## The Door

So, one more time: where is your last token right now? If the answer made you wince, the bridge is at [gitauth.klappy.dev](https://gitauth.klappy.dev), the code is open at [github.com/klappy/git-repo-auth-mcp](https://github.com/klappy/git-repo-auth-mcp), and your first hundred mints are free. Have your agent audit the repo before you trust us. That's what the read-only default is for.

And if you want to know what happened when we walked this thing into Anthropic's directory review, with a test account, a favicon stuck in Google's cache, and no laptop anywhere in the story, that's the companion essay: [The Submission](/writings/the-submission-changes-exposure-not-function).

Your last PAT should be the one you revoke today.
