---
uri: klappy://writings/the-loop
title: "The Loop — Every Role, Same Infrastructure"
subtitle: "Your PM writes a spec. Your PO re-translates it. Your engineer re-interprets it. Context drops at every handoff."
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
  - tools
  - knowledge-base
  - oddkit
epoch: E0005
date: 2026-02-25

# Discovery
hook: "Your team doesn't have a knowledge problem. It has a re-translation problem. Every handoff between roles drops context. Every tool has its own memory — which is to say, none of them do."
description: "How every role on a product team — PM, PO, architect, engineer, QA — runs the same loop through a shared knowledge base, using the tools they already have, without changing how they work."
slug: the-loop

# Social graph
og_title: "The Loop — Every Role, Same Infrastructure"
og_description: "Your team doesn't have a knowledge problem. It has a re-translation problem."
og_type: article
og_image: /images/the-loop-og.png
twitter_card: summary_large_image
twitter_title: "The Loop — Every Role, Same Infrastructure"
twitter_description: "Your team doesn't have a knowledge problem. It has a re-translation problem."
twitter_image: /images/the-loop-og.png

# Relationships
derives_from:
  - canon/the-frame.md
  - canon/values/trust-kernel.md
  - canon/constraints/guide-posture.md
related:
  - uri: klappy://writings/the-journey
    label: "The Journey — From First Use to AI That Actually Learns"
    relationship: prequel
  - uri: klappy://writings/the-horizon
    label: "Horizon Surfaces — Where the Loop Runs Next"
    relationship: sequel
complements: "writings/the-journey.md, writings/the-horizon.md, writings/the-project-journal.md"
---

# The Loop — Every Role, Same Infrastructure

> Your PM writes a spec in Google Docs. Your PO re-translates it into GitHub Issues. Your engineer re-interprets the issue in their IDE. Your QA manager writes a separate test plan from the issue. User feedback arrives via email and Slack and stays there, disconnected from all of it. Each handoff drops context. Each tool has its own memory — which is to say, none of them do. The fix isn't a better tool. It's giving every tool the same memory. One loop — converse, generate, validate, promote or pivot — and every role runs it through the same shared knowledge base, using the tools they already have.

-----

## Summary — The Knowledge Base Eliminates Re-Translation

I've watched this play out on every team I've worked with. The PM spends an hour crafting a thoughtful spec. The PO reads it, interprets it, and creates issues that capture maybe 60% of the intent. The engineer reads the issue — not the spec — and builds something that captures 60% of the PO's interpretation. By the time QA writes a test plan from the issue title, the original intent has been translated three times. Each translation is lossy. Nobody is incompetent. The process is.

The knowledge base changes one thing: every role reads from and writes to the same source of truth. The PO's definition of done IS the QA manager's test specification — because they're reading the same document. The architect's decision record IS the engineer's constraint — because the engineer's AI reads it automatically. User feedback IS the PM's next planning input — because it enters the knowledge base and drives the next cycle.

The tools don't change. The loop doesn't change. The context loss disappears.

-----

## One Loop, Every Role

The loop is: **converse → generate → validate → promote or pivot.** Every role runs this same loop. What differs is what they converse about, what they generate, and what "promote" means for their output. Here's how it plays out.

### Product Manager — Strategy, Priorities, and "Why"

The PM shapes what gets built and why. They open their AI chat with the knowledge base already connected. They explore strategy, market signals, and partner feedback — and the AI already knows every prior decision, every constraint, every piece of user feedback. No re-explaining context. No "let me catch you up on what we decided last month."

The AI drafts planning specs grounded in existing context. Prior decisions and architectural constraints surface automatically, not after someone remembers to mention them. The PM challenges proposals against existing governance: "Does this new priority contradict a decision we already made?" And when the spec is approved, it goes directly from conversation into the knowledge base — not into a Google Doc that someone will have to manually translate later.

### Product Owner — Requirements, Definitions of Done, and "What Specifically"

The PO translates "what and why" into "what specifically and how we'll know it's done." They open their AI chat and say: "Read the planning spec for epoch 6 and help me break it into requirements." The AI reads the PM's spec directly — no forwarded links, no stale copies.

Requirements get drafted with definitions of done, acceptance criteria, and traceability to the originating spec. The PO checks readiness before handing off: "Are these requirements complete? Testable? Aligned with constraints?" Ambiguous criteria get challenged before they reach the engineer.

The critical shift: the PO's definitions of done become the QA manager's validation criteria automatically. No separate test plan document. The definition of done IS the test specification.

### Architect — Constraints, Decisions, and Boundaries

The architect defines the boundaries that make the system possible. They explore design trade-offs with full context: "If we choose X, what constrains Y? What are we giving up?" The AI surfaces prior decisions from the knowledge base that are relevant — decisions the architect may not remember making six months ago.

Decision records get committed to the knowledge base. Every engineer's AI session, every PO's chat session — they all read these constraints automatically. Architecture enforces itself through the knowledge base. The architect doesn't attend every standup to enforce decisions — the system does it.

When an engineer discovers a constraint doesn't work in practice, that feedback writes back to the knowledge base where the architect sees it. Decisions stay alive, not buried in a wiki nobody reads.

### Engineer — Building, Learning, and Feeding Back

The engineer opens their CLI with the knowledge base connected. "Search for the spec on feature X." The agent reads the PO's requirements, the architect's constraints, and prior implementation learnings — without being told where to look.

Before building, the engineer runs a preflight check that surfaces relevant constraints, the definition of done, and known pitfalls. After building, they validate against the definition of done: "Does this implementation satisfy the acceptance criteria?" Evidence-based, not gut-based.

And here's what closes the loop: implementation learnings, gotchas, and constraint feedback write back to the knowledge base. The next person or session that touches the area finds them.

### QA Manager — Validation, Evidence, and Gap Analysis

The QA manager doesn't write a separate test plan. The definitions of done already exist in the knowledge base. They open their AI chat: "Show me all completion claims for this sprint and their definitions of done."

The AI generates validation reports: "Claim X — VERIFIED, evidence at [URI]" or "Claim Y — NEEDS_ARTIFACTS, missing evidence for criterion Z." Every verdict is traceable. Gaps become specific issues with knowledge base references — not vague bug tickets.

### User Feedback — The Reality Check

User feedback is the loop's reality check. It arrives through community channels, email, support conversations, and field observations. A team member synthesizes feedback patterns: "Users consistently struggle with X." Validated feedback enters the knowledge base and drives the PM's next cycle. The loop feeds itself.

This is where the Bible translation origin of this system completes the circle. Community checking — the practice of having the audience validate whether the output serves them — isn't a metaphor. It's the same practice. The translator doesn't decide if the translation works. The community does. The product team doesn't decide if the feature works. The users do.

-----

## What Actually Changes for the Team

People keep using their preferred tools. What changes is invisible: every AI-powered tool in the chain now reads from the same source of truth. Context stops getting lost at tool boundaries.

**Before:** PM writes spec in Google Doc → shares link in Slack → PO reads Doc, creates issues manually → engineer reads issue, re-explains context to AI → QA writes separate test plan → user feedback stays in email → architect's decisions live in someone's head.

**After:** PM writes spec via AI chat → it enters the knowledge base → PO's AI reads the spec, generates issues with references → engineer's AI reads spec and constraints directly → QA's AI reads definition of done (that IS the test criteria) → user feedback encoded to knowledge base, drives the next cycle → architect's decisions live in the knowledge base, every AI session reads them.

The human workflow barely changes. The system gains a shared memory without anyone switching tools.

-----

## The Tools Stay — The Memory Connects

Every tool the team already uses stays in place. What oddkit adds is the connective tissue — every AI-powered tool reads from and writes to the same knowledge base.

**CLI tools** get direct read access and write through native git. **AI chat** gets full context and writes through oddkit. **GitHub Issues** reference knowledge base specs by URI — the definition of done lives in the knowledge base, the issue links to it. **Team chat** stays in Slack or Zulip — key decisions get encoded to the knowledge base as durable records. **Email** stays in email — relevant feedback gets encoded to the knowledge base. **Google Docs** stays for collaborative editing — finalized docs can migrate to the knowledge base.

The system never requires anyone to leave their current tool. If it does, the principle has been violated.

*This essay describes what the team loop looks like today. [Horizon Surfaces](klappy://writings/the-horizon) maps where it runs next — team chat assistants, meeting listeners, and the daily journal practice that makes it all work. And [The Journey](klappy://writings/the-journey) traces the individual path from first use to AI-augmented workflows.*
