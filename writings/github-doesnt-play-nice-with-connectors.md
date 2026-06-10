---
uri: klappy://writings/github-doesnt-play-nice-with-connectors
title: "GitHub Doesn't Play Nice with Connectors. So We Fixed That."
public: true
type: "essay"
slug: "github-doesnt-play-nice-with-connectors"
audience: public
exposure: public
tier: 2
voice: first_person
stability: draft
epoch: E0010
date: 2026-06-10
hook: "Your AI shouldn't hold a key that outlives the conversation. Ours dies in an hour, on schedule, scoped to one repo."
og_description: "You shouldn't need a coding tool to ship. From a plain chat with Claude or ChatGPT, even from a phone: mint hour-lived scoped tokens, push, open PRs, set up branch protection and CI. Self-host free, or $1 a month hosted. Open source so your agents can audit it."
twitter_description: "Stop pasting PATs into chats. Hour-lived, down-scoped GitHub tokens, minted on demand. Free to self-host, $1/mo hosted."
description: "Announcing the Git Repo Auth relay: app-minted, hour-lived, down-scoped GitHub tokens for AI agents and MCP connectors. Free self-host or $24 for two years hosted. Open source by design."
tags: ["substrate", "auth", "github-app", "mcp", "connectors", "security", "relay", "stacking"]
derives_from: "docs/planning/pat-transcendence-github-app.md, canon/principles/agents-need-their-own-wire.md, canon/architecture/substrate-stack.md"
complements: "writings/we-were-the-wire, writings/own-your-vertical"
---

# GitHub Doesn't Play Nice with Connectors. So We Fixed That.

> If you work with AI agents and GitHub, you've probably done the thing: minted a personal access token, pasted it into a chat, and promised yourself you'd rotate it later. That token is a master key sitting in a transcript. We built a relay that ends the ritual: a GitHub App mints hour-lived tokens on demand, scoped down to exactly the repos and permissions the task needs. Expiry is the rotation. Host it yourself for free, or use ours for $24 for two years. That's a dollar a month. And the code is open, so before you trust it, audit it. Or have your agents do it.

---

## The ritual everyone pretends is fine

Here is how most people give an AI agent access to their GitHub repos today. They go to developer settings, mint a personal access token, copy it, and paste it into a chat window. The agent uses it. The conversation ends. The token doesn't.

It lives on in the transcript. It lives in whatever the agent logged. If it was a classic PAT, it can probably touch every repo on the account. The responsible move is to rotate it after every session, and almost nobody does, because rotation is a chore and chores lose to inertia every time.

I know this ritual personally. Earlier today I pasted a PAT into a chat out of habit, mid-conversation, while testing the very thing that makes pasting PATs unnecessary. Habits die slower than tokens.

## Who this is actually for

If you live in Claude Code or some desktop coding tool, you already have decent ways to reach your repos. This isn't mainly for you. It's for everyone who works the other way: in a plain chat conversation with Claude or ChatGPT or whatever frontier model you prefer, sometimes from a phone, who sometimes wants to hand that assistant real access to a repository.

Today that handoff is broken at best. Plenty of chat surfaces have no GitHub connector at all. The ones that do, as of this writing, tend to carry auth assumptions that don't fit how a conversation actually works: no minting tokens scoped to a single repo for a single task, no bulk operations through the raw Git Data API, no bot identity to tell the agent's commits from yours. So you either paste a PAT and start the ritual, or you leave the conversation, switch tools, and lose the thread. For plenty of workflows the stock connector is the right choice. For shipping real work from a chat, it isn't enough.

We evaluated our own common use cases and built the relay around them. The result is that you can ship and deploy without ever leaving the conversation. Append to a repository. Cut a branch. Open a pull request. And here's the part I care about most: whatever your flow is, we don't determine it. We let you. Write straight to main if that's how you roll. Or run strict protected branches with required CI, and let the assistant bridge you into that setup instead of building the scaffolding alone.

That last part isn't theoretical. I have gone from a blank repository to branch protection and a working CI pipeline using Opus, and again using ChatGPT. In their chat environments, not their coding tools. From a conversation. It works.

## What the relay does instead

The fix is old technology arranged correctly. A GitHub App holds the only long-lived credential, a private key that lives in a worker secret and never appears in any conversation. When an agent needs access, it calls one tool. The worker signs a short JWT, asks GitHub for an installation token, and hands back something that:

- expires in an hour, no exceptions
- is scoped to exactly the repos you name, and only the permissions you name
- carries a bot identity, so every commit it makes is provably the agent's, not yours

This morning I watched my agent mint a token scoped to one repository with read-only access, verify it could see that repo, and confirm it got a 404 on every other repo on the account. Then the token expired mid-session, and instead of a rotation chore there was a retry: mint another, keep working. Nobody rotated anything. Expiry is the rotation.

There's a deeper property here too. Permissions the app was never granted are permissions no agent can ever exceed, no matter what it's asked or what it decides. My agent cannot touch repo settings or visibility because the app physically lacks Administration. That boundary isn't a policy the agent promises to follow. It's physics.

## Run it yourself, or don't

The relay is open source, and you can host your own for free. Your GitHub App, your keys, your worker. Nothing of yours ever touches our infrastructure, which is exactly how credentials should work when you can afford the setup time.

Or use ours: **$24 for two years.** That's a dollar a month. You can absolutely do it yourself, but at that price, why would you?

Either way, the code is the same code, and it's open on purpose. Don't take my word for what it does with tokens. Read it. Better yet, point your agents at it and ask them to audit it before you connect anything. An auth layer you can't inspect is a trust exercise. This one is an inspection invitation.

And if GitHub ships first-party, down-scoped, hour-lived minting for agents tomorrow, use it. So will I. The same offer I made about the wire stands here: the day an official version of this layer stands up, we swap ours for theirs and keep building on top. The point was never to own the layer. The point is that the layer exists.

## Why this layer exists at all

I've written before about [the wire](klappy://writings/we-were-the-wire): every place where a human manually shuttles things between systems is a place where substrate is missing. Data was the obvious case. Credentials turned out to be the same disease. Every time you mint a PAT by hand and paste it into a chat, you are the credential wire, and the rotation you keep deferring is the interest on that debt.

This relay is one more layer in the same stack: a clock so agents can tell time, a wire so they can talk to each other, governance so they tell the truth, and now auth so they can hold a key without you holding it for them. Each layer exists so you never have to think about it again, and can spend that attention on [the vertical only you can own](klappy://writings/own-your-vertical).

Your last PAT should be the one you revoke today.
