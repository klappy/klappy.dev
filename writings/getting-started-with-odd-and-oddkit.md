---
uri: "klappy://writings/getting-started-with-odd-and-oddkit"
title: "Getting Started with ODD and oddkit"
subtitle: "From zero to structured AI collaboration in five minutes"
author: "Klappy"
type: "article"
public: true
audience: "public"
exposure: "public"
tier: 1
voice: "first_person"
stability: "stable"
tags:
  - "writings"
  - "article"
  - "getting-started"
  - "oddkit"
  - "odd"
  - "onboarding"
  - "mcp"
  - "ai-augmented-workflows"
epoch: "E0007"
date: "2026-04-03"

# Discovery
hook: "Your AI forgets everything between sessions. It guesses instead of checking. It can't tell a brainstorm from a decision. Here's how to fix that in five minutes."
description: "A practical quickstart for oddkit — the open-source MCP server that gives your AI structured memory, epistemic discipline, and the ability to build on what came before. Three platforms. Five minutes. No philosophy degree required."
slug: "getting-started-with-odd-and-oddkit"

# Social graph
og_title: "Getting Started with ODD and oddkit"
og_description: "Your AI forgets everything between sessions. Here's how to fix that in five minutes — no philosophy degree required."
og_type: "article"
og_image: "/images/getting-started-og.png"
twitter_card: "summary_large_image"
twitter_title: "Getting Started with ODD and oddkit"
twitter_description: "Your AI forgets everything between sessions. Here's how to fix that in five minutes — no philosophy degree required."
twitter_image: "/images/getting-started-og.png"

# Relationships
derives_from:
  - "docs/planning/developer-journey-ai-augmented-workflows.md"
  - "canon/constraints/oddkit-prompt-pattern.md"
related:
  - uri: "klappy://writings/the-journey-from-ai-tasks-to-ai-augmented-workflows"
    label: "The Journey — from tasks to workflows"
    relationship: "companion"
  - uri: "klappy://writings/the-project-journal"
    label: "The Project Journal"
    relationship: "companion"
complements: "writings/the-journey-from-ai-tasks-to-ai-augmented-workflows.md, writings/the-project-journal.md, writings/the-most-expensive-problem.md"
start_here: true
start_here_order: 1
start_here_label: "Getting Started — ODD and oddkit in Five Minutes"
---

# Getting Started with ODD and oddkit

> Your AI forgets everything between sessions. It guesses instead of checking. It can't tell a brainstorm from a hard decision. oddkit is an open-source MCP server that fixes this — it gives your AI structured memory, epistemic discipline, and the ability to build on what came before. Connect it in thirty seconds. Bootstrap your project with a short identity statement that teaches the AI to verify before claiming. See the difference immediately. Two repos: [oddkit](https://github.com/klappy/oddkit) (the engine) and [klappy.dev](https://github.com/klappy/klappy.dev) (one knowledge base that runs on it).

---

## Summary — Plug It In, Bootstrap It, See the Difference

You use AI every day. Each session is impressive. But nothing carries over with the structure it needs. Your AI treats a brainstorm and an architectural decision with equal weight. A casual mention and a firm constraint look identical. Every session starts from zero.

oddkit is an MCP server — a standard protocol that lets AI tools connect to external services. You add it to whatever AI tool you already use: Claude, ChatGPT, Gemini, Cursor, Claude Code, Lovable, Replit, ElevenLabs voice agents — anything that supports MCP. It takes thirty seconds. Then you bootstrap — paste a short identity statement into your project instructions that teaches the AI to verify before claiming, admit what it hasn't checked, and use oddkit proactively. After that, every session starts from a posture of integrity instead of a blank slate.

This page gets you from zero to running in five minutes. The [deeper journey](klappy://writings/the-journey-from-ai-tasks-to-ai-augmented-workflows) — building your own knowledge base, encoding decisions, making AI collaboration cumulative — is there when you're ready. Start here.

---

## The Problem oddkit Solves

What does an AI session look like without oddkit?

You open a conversation. You explain your project. You give context. The AI does good work. Session ends. You open a new conversation. You explain your project again. You re-give the context. The AI does good work — different good work, because it doesn't remember the decisions from last time.

Over time, the pattern gets worse. The AI confidently asserts things about your project it hasn't actually checked. It confuses an offhand brainstorm with a firm decision. It generates code that violates constraints you established three sessions ago. Not because it's dumb — because nothing persists with structure.

What does it look like with oddkit?

The AI starts by orienting. It reads your project's governance — the decisions, constraints, and learnings you've accumulated. It checks actual state before claiming. It says "I haven't verified that" instead of guessing. When you make a decision, it offers to record it so the next session finds it automatically.

The difference isn't that the AI is smarter. It's that the AI is *focused*.

---

## Connect oddkit in Thirty Seconds

oddkit is a remote MCP server. You don't install anything. You point your AI tool at a URL. Different tools call it different things — Claude calls them "connectors," ChatGPT calls them "apps," Lovable and Replit call them "MCP servers" — but the setup is always the same: give the tool a URL.

The base URL is `https://oddkit.klappy.dev/mcp`. You can optionally add `?consumer=yourname` to identify yourself on the public transparency leaderboard — oddkit tracks which tools are used and how often, but not what you search for or what documents contain. Adding your name helps the maintainer know the infrastructure is being used by real people. You can see the same data yourself by calling `telemetry_public`. Replace `yourname` with whatever you'd like to appear on the leaderboard — your name, a handle, a project name. Or leave it off entirely and stay anonymous.

### Claude.ai

Open Settings → Connectors → Add Custom Integration. Enter:

- **Name:** `oddkit`
- **URL:** `https://oddkit.klappy.dev/mcp?consumer=yourname`

That's it. Start a new conversation and oddkit's tools are available.

### ChatGPT

Open Settings → Developer Mode → Create App. Add the MCP server URL:

`https://oddkit.klappy.dev/mcp?consumer=yourname`

### Claude Code / Cursor / Any MCP Client

Add to your `.mcp.json` or MCP configuration:

```json
{
  "mcpServers": {
    "oddkit": {
      "type": "http",
      "url": "https://oddkit.klappy.dev/mcp?consumer=yourname"
    }
  }
}
```

In Claude Code, you can also run: `claude mcp add --transport http oddkit https://oddkit.klappy.dev/mcp?consumer=yourname`

### Lovable / Replit / Gemini / ElevenLabs Voice Agents

Same URL, same protocol. Any tool that supports MCP can connect to oddkit. Look for "MCP server," "custom integration," or "external tool" in your tool's settings and provide the URL:

`https://oddkit.klappy.dev/mcp?consumer=yourname`

The setup varies by platform, but the URL is always the same.

---

## Try It Right Now

Once connected, try these prompts in your next conversation. Say "use oddkit" or "ask oddkit" to make sure your AI invokes it:

**Orient on a decision you're facing:**
> "Use oddkit to orient me on whether I should take this new job offer. I'm weighing salary against work-life balance."

oddkit will assess your situation, surface questions you haven't asked yet, and help you think through the decision instead of just picking one side and selling you on it.

**Challenge something you believe:**
> "Ask oddkit to challenge my assumption that I need to go back to school to switch careers."

oddkit will pressure-test your claim, surface specific counter-arguments, and force you to defend the position — or reconsider before you invest in it.

**Record a decision so it sticks:**
> "We decided to homeschool next year because the local school's class sizes have doubled. Use oddkit to encode that decision with the reasoning."

oddkit structures and captures it. The next session that touches education planning will find it automatically — with the reasoning attached.

**Process a meeting or conversation:**
> *[paste your meeting notes or transcript]* "Use oddkit to encode the key decisions, action items, and constraints from this meeting."

You don't have to encode things one at a time. Invite your AI to your meetings, or bring your transcripts afterward — paste them in and ask oddkit to extract and encode everything worth keeping. One conversation captures what would otherwise evaporate before the next standup.

---

## Bootstrap Your Project — Make It Stick

Connecting oddkit gives you the tools. Bootstrapping makes them automatic.

Without a bootstrap, you have to ask the AI to use oddkit each time. With one, the AI starts every session already oriented — it checks before claiming, admits uncertainty, and uses oddkit proactively without being prompted.

The bootstrap is a short text you paste into your project's system prompt. In Claude.ai, that's Project Instructions. In Claude Code, it's `CLAUDE.md`. In Cursor, it's your project rules file. The content is the same everywhere:

```markdown
## Identity of Proactive Integrity

Before I speak, I observe.
Before I claim, I verify.
Before I confirm, I prove.
What I have not seen, I do not know.
What I have not verified, I will not imply.

This is not a checklist. It is a posture — the default stance from
which all work in this project begins.

## Foundational Axioms

1. **Reality Is Sovereign** — Observe before asserting.
2. **A Claim Is a Debt** — Every assertion requires evidence.
3. **Integrity Is Non-Negotiable Efficiency** — False "done" costs
   more than honest "I haven't checked."
4. **You Cannot Verify What You Did Not Observe** — If you didn't
   look, you don't know.

## Epistemic Backbone: oddkit

This project uses the **oddkit MCP server** as its epistemic guide.
Use oddkit tools proactively — orient when context shifts, search
before claiming, challenge before committing to decisions, validate
before calling something done.
```

Think of it as an employee handbook that you and the AI both agree to. You're not configuring a tool — you're establishing shared integrity. The creed and axioms aren't aspirational. They're operational constraints that make the AI behave like someone you'd actually trust with your work.

The [full bootstrap prompt](klappy://docs/oddkit/proactive/proactive-bootstrap) includes additional guidance on continuous session capture, artifact provenance, and proactive tool usage — use it when you're ready for the complete version. The compact version above is enough to start.

If you want to see the actual template I use — creed, axioms, time perception, mode discipline, bottleneck respect, and the pointer to the evolving operating contract all in one system prompt — see [Project Instructions Template](klappy://docs/examples/project-instructions-template). It's model-agnostic; the same template works for Claude, GPT, Gemini, or any LLM with tool-use and an MCP connection.

### A Note on Permissions

When you first connect oddkit, your AI tool will ask permission each time oddkit is invoked — "oddkit wants to use orient," "oddkit wants to use search." This is the right default. You should see what oddkit does before trusting it to act freely.

After a few sessions, those approval prompts will start to feel tedious. That's the signal. In Claude.ai, you can switch a connector to "Always allow" in Settings → Connectors. Other platforms have similar controls. The pattern is deliberate: start with visibility, graduate to trust when it's earned.

---

## What Changes — Before and After

**Before oddkit**, your AI is brilliant within each session and amnesiac between them. It generates useful work but can't tell a verified fact from an optimistic guess. Every session starts from zero. You are the integration layer — carrying context in your head, re-explaining constraints, catching contradictions that the AI can't see because it doesn't remember.

**After oddkit**, your AI checks before claiming. It admits uncertainty. It searches your project's accumulated knowledge before asserting. When you make a decision, it records it with structure — not as flat memory, but as a typed record (decision, observation, learning, constraint) that the next session can act on. The AI becomes a focused collaborator instead of a talented stranger you meet for the first time every morning.

The difference compounds. Each session builds on the last. Decisions persist. Constraints stay visible. Context stops evaporating.

---

## The Two Repos

oddkit has two parts. They're separate and they're both open source.

**[oddkit](https://github.com/klappy/oddkit)** is the engine — the MCP server code. It's a Cloudflare Worker that reads markdown files from a GitHub repository, indexes them, and exposes them through structured tools (orient, search, challenge, encode, validate, and more). It's framework-agnostic. It reads from any repo.

**[klappy.dev](https://github.com/klappy/klappy.dev)** is one knowledge base that runs on oddkit. It's the one you're reading right now — hundreds of documents covering governance, methodology, decisions, learnings, and constraints. When you connect to `https://oddkit.klappy.dev/mcp`, you're connecting to oddkit reading *this* knowledge base.

The key insight: **oddkit is the engine, your repo is the fuel. They're separate. You can swap the fuel.**

---

## Build Your Own Knowledge Base

oddkit reads markdown files from any GitHub repository. You can point it at yours.

The simplest way to start: create a GitHub repo with a few markdown files — decisions you've made, constraints your project follows, learnings from debugging sessions. Then tell oddkit to read from your repo instead of (or alongside) the default one using the `canon_url` parameter.

You don't need to learn a schema. You don't need to adopt a methodology. You don't need to restructure anything. Start with what hurts — if decisions keep getting lost, write them down as markdown files. If context keeps evaporating between sessions, capture it. oddkit reads what you write and makes it available to your AI.

### The Force Multiplier — Let Your AI Write Back

Here's where it gets powerful.

Create a GitHub Personal Access Token with repo write permissions. Add it to your AI tool's environment. Now your AI can use its built-in GitHub tools to write directly to your knowledge base — project journal entries, governance articles, decision records, constraint documents. You dictate direction; the AI captures, structures, and commits.

This is the workflow that makes you truly feel augmented. After a meeting: "Encode that we decided to use PostgreSQL and commit it." After a debugging session: "Write up what we learned about the race condition and push it." Before a handoff: "Capture where we left off so the next session picks up cleanly." Or skip the manual step entirely — invite your AI to your meetings, or paste the transcript afterward and say "encode everything worth keeping." The AI writes your project journal. You tell it to draft governance articles — "write a constraint that all API endpoints require authentication" — and it produces structured documents customized to how *you* work, committed to *your* repo. Your knowledge base grows from direction, not from you opening a text editor.

And because oddkit reads from a GitHub repo, not from any single AI provider's memory, you can use *any* AI tool that supports MCP and point it at your knowledge base. Claude today, ChatGPT tomorrow, Cursor for coding, Lovable for building UIs, Replit for prototyping, Gemini for research, ElevenLabs voice agents for hands-free brainstorming — they all connect to the same source of truth. Switch tools freely. All your sessions connect.

This is how I work. It's the difference between using AI for tasks and AI-augmented workflows.

### What a Mature Knowledge Base Looks Like

For an example, browse the [klappy.dev repo](https://github.com/klappy/klappy.dev). You'll find governance (`canon/`), methodology (`odd/`), planning and implementation records (`docs/`), and public essays (`writings/`). You don't need any of that to start. But it's there when you want to see how deep the rabbit hole goes.

The progression — from a few markdown files to a living knowledge base — is described in detail in [The Journey from AI Tasks to AI-Augmented Workflows](klappy://writings/the-journey-from-ai-tasks-to-ai-augmented-workflows).

---

## What Comes Next

You don't need to do anything else. Seriously.

oddkit follows a principle called "Use Only What Hurts" — you add structure when the lack of it becomes painful, not before. Connect oddkit. Use your AI normally. Notice the difference. When something hurts — when you're tired of re-explaining context, when decisions keep getting overridden because nobody remembers them, when handoffs keep dropping information — that's when you add the next piece.

The system reveals itself through use. The vocabulary, the patterns, the deeper capabilities — they show up when you need them, not when you read about them. Your AI will start using terms like "orient" and "challenge" and "encode" in conversation, and you'll understand them from context before you ever read a definition.

Start wherever it hurts. The system meets you there.
