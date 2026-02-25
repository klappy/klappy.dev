---
title: "Horizon Surfaces — Where the Loop Runs Next"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["surfaces", "horizon", "team-chat-assistant", "meeting-listener", "journal", "oddkit-write"]
epoch: E0005
date: 2026-02-25
derives_from:
  - canon/the-frame.md
  - canon/values/trust-kernel.md
  - docs/planning/the-loop-every-role-same-infrastructure.md
  - docs/oddkit/IMPL-oddkit-write.md
complements: "docs/planning/E0005_2-epoch-definition.md, docs/planning/developer-journey-ai-augmented-workflows.md, docs/planning/directors-chair-ai-augmented-workflows.md"
---

# Horizon Surfaces — Where the Loop Runs Next

> Every oddkit-powered surface connects to the same Knowledge Base, the same kernel, the same axioms, the same tools. The knowledge is one. The surfaces are many. Three capabilities extend the loop into contexts where decisions currently get lost: durable journal entries (observations, learnings, decisions, handoffs encoded from any surface by any team member — the most frequent unit of knowledge capture), the team chat assistant (a lurking participant in Slack/Zulip that captures decisions from natural conversation), and the meeting listener (a contextual participant that turns verbal decisions into structured records). All three use `oddkit_write`. All three are the loop, running in more places.

---

## Summary — Three Capabilities, One Infrastructure

Three capabilities extend the oddkit loop beyond developer tools into the full rhythm of team work. The **journal** is a cross-cutting capability available on every surface — the daily practice of encoding observations, learnings, decisions, and handoffs as they happen. The **team chat assistant** brings the loop into Slack and Zulip, lurking as a participant rather than waiting to be invoked. The **meeting listener** brings the loop into the room where the most important decisions happen and the most knowledge gets lost.

All three use the same `oddkit_write` path, the same Knowledge Base, the same epistemic tools. They are not separate products. They are the loop, running in more places.

---

## Durable Journal Entries — The Cross-Cutting Capability

Any team member, in any oddkit-enabled surface, can encode durable journal entries. This is not a feature of a specific tool — it is the default behavior of working with oddkit.

The journal captures the four things that matter most for project continuity: **observations** (what someone noticed), **learnings** (what someone figured out), **decisions** (what was chosen and why), and **handoffs** (what someone else needs to know to pick up the thread). These map directly to the epistemic ledger structure in the Knowledge Base.

How it works in practice: a developer finishes a debugging session and says "We discovered the auth timeout was caused by a race condition in the token refresh — encode that as a learning." A PM wraps up a stakeholder call and says "The client confirmed Q3 launch is firm but wants a demo by March 15 — encode the decision and the constraint." A QA engineer finds an edge case and says "The CSV import breaks on files over 10MB because of the streaming buffer — encode this observation." A team lead finishes a handoff and says "Sarah is picking up the payment integration next week, here's where I left off — encode this handoff."

In each case, oddkit's `encode` tool structures the entry, and `oddkit_write` persists it to the Knowledge Base. The next person or session that touches the relevant area finds it automatically through `search`. Nothing evaporates between sessions.

This is the smallest, most frequent unit of knowledge capture. It requires no ceremony — just a sentence in conversation. It is relevant to every user journey, every role, every surface. The loop only works if the knowledge actually enters the base. Journal entries are how most knowledge enters.

---

## Team Chat Assistant — A Lurking Participant

Not a bot you invoke with `@oddkit`. A lurking participant that follows conversations the way a sharp colleague would.

It has already read every prior decision, every constraint, every definition of done in the Knowledge Base. When the architect says "We're going with JWT tokens for auth," the assistant chimes in: "Looks like you just made an architectural decision. Want me to draft a decision record with the rationale from this thread?" When a developer asks "Does anyone know why we chose Postgres over Mongo?" the assistant responds before a human needs to — because the answer is in the KB. When someone proposes an approach that contradicts an existing constraint, the assistant flags it gently.

The team just talks. The assistant does the epistemic work. Decisions stop getting lost in threads. Constraints stop getting violated because someone didn't check. The Knowledge Base grows from natural conversation, not from documentation sprints.

The assistant also captures journal entries from chat — when someone shares an observation, learning, or decision in a thread, the assistant offers to encode it. The channel becomes a source of durable knowledge, not just ephemeral discussion.

---

## Meeting Listener — Capture the Speech, Structure It After

The surface where the most important decisions happen and the most knowledge gets lost.

Meeting audio streams to an oddkit-powered assistant — not a transcription service, a participant. The same assistant that lurks in Slack, with the same Knowledge Base, the same kernel, the same tools. As the meeting unfolds, the assistant listens with context — it already knows every prior decision, every active constraint.

After the meeting, it presents its draft: "Three decisions were made. Two constraints were articulated. One observation contradicts assumption A from planning spec X. Four action items were assigned." Each item is already structured as a journal entry. The team reviews. Approved items enter the Knowledge Base through `oddkit_write`. Meetings stop being where knowledge goes to die.

This mirrors oral-first methodology — capture the speech, structure it after. The same principle that drives Bible translation workflows and Klappy's own AI-augmented content creation process.

---

## What All Three Share

Every surface described here connects to oddkit the same way Claude Code or Claude Chat does — same MCP server, same kernel, same axioms, same tools, same Knowledge Base. The only difference is *where* the conversation happens: a terminal, a chat window, a browser, a Slack channel, a conference room.

The write path is always `oddkit_write`. The read path is always `search`, `get`, `orient`, `challenge`, `preflight`, `validate`. The journal is always `encode` → `oddkit_write`. The surfaces are many. The infrastructure is one.
