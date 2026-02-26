---
uri: klappy://writings/every-handoff-drops-context
title: "Every Handoff Drops Context — Here's How to Stop It"
subtitle: "How one shared knowledge base eliminates the re-translation tax across every role and tool on your team"
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
  - product-team
  - roles
  - workflow
  - knowledge-base
  - oddkit
  - context-loss
  - handoffs
epoch: E0005
date: 2026-02-25

# Discovery
hook: "The PM writes a spec. The PO re-translates it into tickets. The engineer re-interprets the tickets. QA writes a separate test plan. Each handoff drops context. Here's how to stop it."
description: "Every role on a team runs the same loop — converse, generate, validate, promote. When they all read from and write to the same knowledge base, context stops getting lost at tool boundaries. Nobody changes how they work. The AI just gets a shared memory."
slug: every-handoff-drops-context

# Social graph
og_title: "Every Handoff Drops Context — Here's How to Stop It"
og_description: "Each tool has its own memory — which is to say, none of them do. One shared knowledge base fixes that."
og_type: article
og_image: /images/every-handoff-drops-context-og.png
twitter_card: summary_large_image
twitter_title: "Every Handoff Drops Context — Here's How to Stop It"
twitter_description: "Each tool has its own memory — which is to say, none of them do. One shared knowledge base fixes that."
twitter_image: /images/every-handoff-drops-context-og.png

# Relationships
derives_from:
  - canon/the-frame.md
  - docs/planning/kb-data-model.md
  - canon/methods/community-checking.md
related:
  - uri: klappy://writings/the-journey-from-ai-tasks-to-ai-augmented-workflows
    label: "The Journey (individual onboarding path)"
    relationship: companion
  - uri: klappy://writings/the-most-expensive-problem
    label: "The Most Expensive Problem (parent essay)"
    relationship: companion
complements: "writings/the-journey-from-ai-tasks-to-ai-augmented-workflows.md, writings/the-project-journal.md, writings/decisions-get-lost.md, writings/the-most-expensive-problem.md"
start_here: true
start_here_order: 8
start_here_label: "Every Handoff Drops Context — Team Collaboration"
---

# Every Handoff Drops Context — Here's How to Stop It

> Every handoff drops context — and handoffs happen constantly. Opening a new chat in the same project is a handoff. Switching from Claude Chat to Claude Code is a handoff. Picking up Monday where you left off Friday is a handoff. AI memory helps with preferences and names, but the actual working context — the decisions, the constraints, the state of what you're building — is lossy every time. You spend the first minutes of every session reconstructing it, or you work hard to synchronize just enough data to keep the workflow effective. The fix isn't better memory inside one tool. It's a shared knowledge base that carries the structured working context — decisions, constraints, learnings, handoffs — across every session, every tool, every role. Your knowledge lives in your repo. Any AI tool that connects reads the same source of truth. The handoff stops being lossy because the context was never trapped in one session to begin with.

---

## Summary — Every Session Is a Handoff, and Every Handoff Is Lossy

The obvious handoff is cross-tool: the PM writes a spec in Google Docs, the PO re-translates it into GitHub Issues, the engineer re-interprets the issue, QA writes a separate test plan. Each step drops context. You've felt that.

But the handoff you feel most often is quieter. You open a new chat in the same Claude project. Memory gives you your name, your preferences, maybe a few facts from last time. But the actual working context — the decisions you made yesterday, the constraints you're operating under, the specific state of what you're building — that's gone. You spend the first minutes reconstructing it. "We decided X because Y. The constraint is Z. Here's where I left off." Every single time.

When you switch tools — from Claude Chat to Claude Code, from ChatGPT to Cursor — it's worse. You're manually synchronizing just enough data to keep things moving. Copy-pasting the relevant decisions. Re-stating constraints. Carrying context in your head because no system carries it for you. And the providers have every structural incentive to keep it that way — portable knowledge means customer churn.

AI providers are making progress on memory. Claude has project memory. ChatGPT has shared projects and connectors. But generic memory carries preferences, not working context. It remembers *that* you discussed authentication. It doesn't carry the structured record of what you decided, why, what constrains the implementation, and where you left off. The working context that makes the next session productive from the first message — that's still on you to reconstruct.

The fix isn't better memory inside one tool. It's a shared knowledge base that lives in *your* repo — carrying decisions, constraints, learnings, and handoffs in structured form across every session, every tool, every role. The PO's definition of done *is* the QA manager's test specification. The architect's decision record *is* the engineer's constraint. User feedback *is* the PM's next planning input. And if you switch tools tomorrow, the knowledge comes with you — because it was never trapped in a provider's cloud.

The tools don't change. The loop doesn't change. The handoffs stop being lossy.

---

## The Loop Every Role Already Runs

Every role on a product team does the same four things, whether they realize it or not: **converse** (explore the problem space), **generate** (produce something), **validate** (check it against what matters), and **promote or pivot** (ship it or change direction).

The PM does this with strategy. The PO does it with requirements. The architect does it with constraints. The engineer does it with code. QA does it with evidence. The rhythm is the same. The tools are different. And right now, the context evaporates at every boundary.

What changes when the knowledge base is shared: each role's output becomes the next role's input — automatically.

---

## What This Looks Like Role by Role

### The Product Manager Stops Re-Explaining Context

The PM opens Claude Chat with oddkit connected. The AI already knows every prior decision, every constraint, every piece of user feedback in the knowledge base. No "let me catch you up on what we decided last month." The PM explores strategy, the AI drafts planning specs grounded in real context, and approved specs get committed directly — content goes from conversation to repo without copy-paste. When the PM pivots, the rationale gets recorded instead of lost in a chat thread.

### The Product Owner Stops Writing Redundant Documents

The PO reads the PM's spec directly from the knowledge base — no forwarded links, no stale copies. Requirements get drafted with definitions of done that trace back to the originating spec. When those requirements are ready, the PO commits them and creates GitHub Issues that reference the knowledge base. The engineer's Claude Code reads the full spec, not just the issue title.

Here's the critical shift: the PO's definitions of done *become* the QA manager's validation criteria automatically. No separate test plan document. The definition of done IS the test specification — because they're in the same knowledge base.

### The Architect Stops Attending Every Standup to Enforce Decisions

The architect explores design trade-offs with an AI that surfaces prior decisions and constraints from the knowledge base — decisions the architect may not remember making six months ago. When the architect commits a decision record, every engineer's Claude Code session and every PO's Claude Chat session reads it automatically. Architecture enforces itself through the knowledge base.

When an engineer discovers a constraint doesn't work in practice, that feedback writes back to the knowledge base where the architect sees it — not buried in a Zulip thread, visible in context.

### The Engineer Stops Asking "Where's the Spec?"

The engineer opens Claude Code with oddkit connected. "Search the KB for the spec on feature X." The agent reads the PO's requirements, the architect's constraints, and prior implementation learnings — without being told where to look. Before starting, oddkit's preflight surfaces relevant constraints, the definition of done, and known pitfalls. After building, oddkit's validate checks the implementation against the acceptance criteria.

Implementation learnings, gotchas, and constraint feedback write back to the knowledge base. The next person who touches the same area finds what the engineer discovered — instead of rediscovering it.

### QA Stops Writing Separate Test Plans

The QA manager opens Claude Chat with oddkit. "Show me all completion claims for this sprint and their definitions of done." The AI reads everything from the knowledge base. No separate test plan to write — the definitions of done already exist. Validation reports trace every verdict to specific criteria and evidence. Gaps become GitHub Issues with knowledge base references — not vague bug tickets, but traceable gaps tied to specific criteria from specific specs.

### User Feedback Stops Dying in Inboxes

User feedback arrives scattered across channels — Zulip threads, email, field reports. A team member synthesizes patterns with AI assistance and encodes the insights to the knowledge base. These reports drive the PM's next planning cycle. The loop feeds itself.

This is community checking — not as a metaphor, but as a practice. The product team doesn't decide if the feature works. The users do. That feedback travels back through the same knowledge base everyone reads.

---

## What Actually Changes for the Team

People keep using their preferred tools. What changes is invisible.

**Before:** PM writes spec in Google Doc → shares link in Zulip → PO reads Doc, creates GitHub Issues manually → engineer reads issue, opens Claude Code, re-explains context → QA reads issue, writes separate test plan → user feedback arrives via email, stays in email → architect's decisions live in someone's head.

**After:** PM writes spec via Claude Chat → committed to knowledge base → PO's Claude Chat reads the spec, generates Issues with references → engineer's Claude Code reads spec and constraints directly → QA's AI reads definition of done from the knowledge base → user feedback encoded, drives PM's next cycle → architect's decisions visible to every AI session automatically.

The human workflow barely changes. The system gains a shared memory without anyone changing how they work.

---

## The Tools Stay — The Connective Layer Is New

The principle is simple: the system slipstreams into existing tools. It never requires anyone to leave their current workflow.

Claude Code gets knowledge base read access through oddkit. Writes use native git. Claude Chat gets full context. Writes use oddkit's write path. GitHub Issues reference knowledge base specs by URI. Zulip discussions stay in Zulip — key decisions get encoded to the knowledge base as durable records. Email feedback gets encoded. Google Docs continue for collaborative editing.

The knowledge base is one. The surfaces are many. Each surface writes through its native path. Nobody learns a new tool. The AI just gets a shared memory.

---

## The Deeper Pattern

Every session boundary is a handoff. Every handoff is a knowledge transfer problem. The [most expensive problem](klappy://writings/the-most-expensive-problem) in any collaboration isn't building things — it's getting what one session knows into the next session without losing what matters.

Generic memory softens this but doesn't solve it. It carries preferences and facts. It doesn't carry the structured working context — the decisions with their rationale, the constraints with their sources, the learnings with their evidence — that makes the difference between a productive first message and ten minutes of reconstruction.

A shared knowledge base doesn't solve that problem by being clever. It solves it by being *structured* and *present* — available at every session boundary, every tool boundary, every role boundary. Decisions carry their rationale. Constraints carry their sources. Learnings carry their evidence. The knowledge doesn't degrade at handoffs because it was captured with enough structure to survive them.

Start with one role, one tool, one connection. The value compounds from there.

*For the individual path to getting started, see [The Journey from AI Tasks to AI-Augmented Workflows](klappy://writings/the-journey-from-ai-tasks-to-ai-augmented-workflows). For where this extends beyond dev tools into meetings and chat, see [Decisions Get Lost in Meetings, Chat, and Handoffs](klappy://writings/decisions-get-lost).*
