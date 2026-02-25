---
uri: klappy://writings/the-horizon
title: "Horizon Surfaces — Where Decisions Go to Die (and How to Stop It)"
subtitle: "The most important decisions happen in meetings and Slack threads. The most knowledge gets lost there."
author: "Klappy"
type: article
public: true
audience: public
exposure: public
tier: 1
voice: first_person
stability: stable
tags:
  - writings
  - article
  - surfaces
  - horizon
  - team-chat
  - meetings
  - journal
  - knowledge-capture
epoch: E0005
date: 2026-02-25

# Discovery
hook: "Your most important decisions happen in meetings and Slack threads — the two places where knowledge is least durable. Three capabilities change that."
description: "The daily journal, the team chat assistant, and the meeting listener — three ways to capture decisions from the places where the most knowledge currently gets lost."
slug: the-horizon

# Social graph
og_title: "Horizon Surfaces — Where Decisions Go to Die"
og_description: "Your most important decisions happen in meetings and Slack threads — the two places where knowledge is least durable."
og_type: article
og_image: /images/the-horizon-og.png
twitter_card: summary_large_image
twitter_title: "Horizon Surfaces — Where Decisions Go to Die"
twitter_description: "Your most important decisions happen in meetings and Slack threads — the two places where knowledge is least durable."
twitter_image: /images/the-horizon-og.png

# Relationships
derives_from:
  - canon/the-frame.md
  - canon/values/trust-kernel.md
  - canon/constraints/guide-posture.md
related:
  - uri: klappy://writings/the-loop
    label: "The Loop — Every Role, Same Infrastructure"
    relationship: prequel
  - uri: klappy://writings/the-journey
    label: "The Journey — From First Use to AI That Actually Learns"
    relationship: companion
complements: "writings/the-loop.md, writings/the-journey.md, writings/the-project-journal.md"
---

# Horizon Surfaces — Where Decisions Go to Die (and How to Stop It)

> Your most important decisions happen in meetings and Slack threads — the two places where knowledge is least durable. Someone says "let's go with JWT tokens for auth" in a standup. It's a real decision. Nobody writes it down. Two sprints later, someone asks "why did we choose JWT?" and the answer is "I think it was in a Zulip thread somewhere." Three capabilities extend the loop into these gaps: durable journal entries that any team member can create from any surface with a single sentence, a team chat assistant that lurks in your channels and captures decisions from natural conversation, and a meeting listener that turns verbal decisions into structured records. All three connect to the same knowledge base. All three use the same infrastructure. The decisions stop dying.

-----

## Summary — Three Capabilities, One Infrastructure

I've been in this meeting. You've been in this meeting. Everyone's been in this meeting. Someone makes a decisive call. Everyone nods. The meeting ends. Two weeks later, nobody can find the decision because it was never written down — it lived in the air for an hour and then evaporated.

The same thing happens in team chat, except it's worse because it *feels* durable. The decision is "in Slack somewhere." It technically exists. But try finding it when you need it, buried under a thousand messages in a channel that three people are in. Durable in storage, ephemeral in practice.

Three capabilities close this gap. The **journal** is a cross-cutting practice available on every surface — encoding observations, learnings, decisions, and handoffs as they happen, in a single sentence. The **team chat assistant** lurks in your channels as a participant, not a bot you invoke. The **meeting listener** turns the room where the most important decisions happen into a source of durable knowledge.

All three connect to the same knowledge base, the same epistemic tools, the same infrastructure. They're not separate products. They're the loop, running in more places.

-----

## The Daily Journal — A Sentence Is Enough

Any team member, in any surface, can encode a durable journal entry. This isn't a feature of a specific tool — it's the default behavior of working within the system.

The journal captures the four things that matter most for project continuity: **observations** (what someone noticed), **learnings** (what someone figured out), **decisions** (what was chosen and why), and **handoffs** (what someone else needs to know to pick up the thread).

How it works in practice: a developer finishes a debugging session and says "The auth timeout was caused by a race condition in the token refresh — encode that as a learning." A PM wraps up a stakeholder call and says "The client confirmed Q3 launch but wants a demo by March 15 — encode the decision and the constraint." A QA engineer finds an edge case and says "The CSV import breaks on files over 10MB because of the streaming buffer — encode this observation." A team lead finishes a handoff and says "Sarah is picking up the payment integration next week, here's where I left off — encode this handoff."

One sentence. The system structures it. The next person who touches the relevant area finds it automatically. Nothing evaporates.

This is the smallest, most frequent unit of knowledge capture. It requires no ceremony. Just a sentence in conversation. The knowledge base only works if knowledge actually enters it. Journal entries are how most knowledge enters.

-----

## The Team Chat Assistant — A Lurking Participant

Not a bot you invoke with `@oddkit`. A lurking participant that follows conversations the way a sharp colleague would.

It has already read every prior decision, every constraint, every definition of done in the knowledge base. When the architect says "We're going with JWT tokens for auth," the assistant chimes in: "Looks like you just made an architectural decision. Want me to draft a decision record with the rationale from this thread?" When a developer asks "Does anyone know why we chose Postgres over Mongo?" the assistant responds before a human needs to — because the answer is in the knowledge base. When someone proposes an approach that contradicts an existing constraint, the assistant flags it gently.

The team just talks. The assistant does the epistemic work. Decisions stop getting lost in threads. Constraints stop getting violated because someone didn't check. The knowledge base grows from natural conversation, not from documentation sprints.

-----

## The Meeting Listener — Capture the Speech, Structure It After

The surface where the most important decisions happen and the most knowledge gets lost.

Meeting audio streams to an assistant — not a transcription service, a participant. The same assistant that lurks in team chat, with the same knowledge base, the same tools. As the meeting unfolds, it listens with context — it already knows every prior decision, every active constraint.

After the meeting, it presents its draft: "Three decisions were made. Two constraints were articulated. One observation contradicts assumption A from planning spec X. Four action items were assigned." Each item is already structured as a journal entry. The team reviews. Approved items enter the knowledge base. Meetings stop being where knowledge goes to die.

This mirrors an oral-first methodology I learned in Bible translation — capture the speech, structure it after. The same principle that drives translation workflows drives knowledge capture. You don't ask people to write things down during a meeting. You let them talk, and you structure it later.

-----

## One Infrastructure, Many Surfaces

Every surface described here connects the same way — same knowledge base, same tools, same trust posture. The only difference is where the conversation happens: a terminal, a chat window, a browser, a Slack channel, a conference room.

The journal works everywhere. The chat assistant works in team chat. The meeting listener works in the room. The infrastructure is one. The surfaces are many.

*This essay maps where the loop extends next. [The Loop](klappy://writings/the-loop) describes how every role runs the same cycle through a shared knowledge base today. And [The Journey](klappy://writings/the-journey) traces the individual path from first use to AI-augmented workflows.*
