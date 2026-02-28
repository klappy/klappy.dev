---
uri: klappy://canon/resonance/seeing-like-an-agent
title: "Seeing Like an Agent — Claude Code Tool Design Lessons"
audience: canon
tier: 3
voice: neutral
stability: draft
tags: ["resonance", "progressive-disclosure", "tool-design", "agent-design", "claude-code", "capability-evolution", "observation"]
relevance: background
execution_posture: exploratory
exposure: nav
epoch: E0005
date: 2026-02-28
derives_from: "canon/values/axioms.md, docs/architecture/epistemic-os-layers.md"
complements: "writings/seeing-like-an-agent.md, canon/resonance/ai-coding-toolkit.md, canon/resonance/README.md, canon/methods/progressive-disclosure.md"
---

# Seeing Like an Agent — Claude Code Tool Design Lessons (Resonance)

> Thariq (@trq212), Anthropic Claude Code team, 2026. A practitioner account of lessons learned building Claude Code's tool surface. The thread independently converges on ODD's core operating principles: observation before assertion (Axiom 4), tools shaped to actual abilities rather than theoretical plans (Axiom 1), progressive disclosure over front-loaded context, and capability-driven evolution that catches when scaffolding becomes constraint (camping risk). The convergence validates ODD's patterns from inside the agent harness itself — the team building the agent arrived at the same structural conclusions as the system designed to govern what agents produce. Companion essay: [Seeing Like an Agent](klappy://writings/seeing-like-an-agent).

---

## How This Was Found

Discovered via X/Twitter, not studied. A thread by a Claude Code team member describing lessons from a year of building agent tool surfaces. The patterns were immediately recognizable as mechanical convergence with ODD's axioms, progressive disclosure architecture, and camping risk detection. This is the second independent convergence in two weeks (after Shoemaker), strengthening the signal that these patterns are structurally necessary rather than incidentally similar.

## The Parallel Journey

The convergence is strengthened by the timeframe. Thariq's team spent a year observing Claude's behavior and iterating on tool design. ODD's author spent fifteen years guiding development teams through Bible translation projects — internalizing patterns of trust, verification, and knowledge transfer — then, after rotating through every major agentic coding toolkit (VS Code extensions, Cursor, Windsurf, Codex, Claude Code, Lovable, and more) and finding similar gaps across all of them, began addressing those gaps in January 2026. Over 34 days (Jan 15 – Feb 18), the system went through 51 versions across 5 epochs, arriving at structural conclusions nearly identical to Thariq's. The compressed timeframe was possible because the patterns had already been learned in a different domain. The pain was acute. The iteration was rapid. The convergence was not designed — it emerged.

---

## ODD Principle: Observation Before Assertion

ODD's fourth axiom — You Cannot Verify What You Did Not Observe — governs not just claims about the world but the design of systems themselves. You do not design tools for what you imagine an agent will do. You observe what it actually does, then shape tools to match. Thariq's thread is a year-long application of this principle to agent harness design.

---

## Convergent Quotes (Non-Authoritative)

> "You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent."
> — Thariq, "Lessons from Building Claude Code" (2026)

> "Even the best designed tool doesn't work if Claude doesn't understand how to call it."
> — Thariq, on the AskUserQuestion tool design

> "As model capabilities increase, the tools that your models once needed might now be constraining them."
> — Thariq, on the Todos → Tasks evolution

---

## Where ODD Aligns

The mechanical convergence is specific:

- **Observation-first design:** Tools shaped to agent abilities through watching actual behavior, not theoretical prediction. Maps directly to Axiom 4 — verification requires observation.
- **Progressive disclosure:** Context discovered on demand rather than pre-loaded. Thariq uses the same term. Skill files reference other files; agents read recursively. Identical to oddkit's search → get → preflight chain.
- **Capability-driven evolution (Todos → Tasks):** Scaffolding that once helped becomes constraint as capabilities improve. The system reminders that kept Claude on track started preventing adaptation. Maps to camping risk — detecting when iterative work continues past productive improvement.
- **Elicitation through iteration (AskUserQuestion):** Three attempts, each informed by observing failure of the previous version. Maps to "use only what hurts" — build features only when pain becomes acute, iterate from observed failure.
- **Context on demand vs. context upfront:** RAG database → Grep tool → Agent Skills → Guide subagent. Each step moved from giving context to letting the agent find context. Oddkit follows the same trajectory — MCP server provides search and retrieval rather than system prompt bloat.
- **Minimal tool surface:** "Claude Code currently has ~20 tools, and we are constantly asking ourselves if we need all of them. The bar to add a new tool is high." Parallels ODD's constraint that tools should be minimal and each must earn its place through observed need.

---

## Where ODD Diverges (Explicit)

- **Tool surface vs. epistemic substrate:** Thariq designs the interface between agent and environment. ODD ensures the environment contains trustworthy knowledge. Different layers, complementary concerns.
- **Agent abilities vs. claim verification:** Thariq's observation ensures tools match capabilities. ODD's observation ensures claims match reality. Both use Axiom 4, but at different levels of abstraction.
- **Capability evolution vs. drift detection:** Thariq catches when tools constrain improving models. ODD catches when any assumption — including about tool design — silently diverges from truth. Thariq's scope is tool fitness; ODD's scope is epistemic integrity.
- **Single-domain progressive disclosure vs. cross-domain:** The Guide subagent searches Claude Code docs. Oddkit searches a knowledge base that spans any domain the user operates in — code, translation, consulting, ministry.
- **Implicit principles vs. explicit axioms:** Thariq's lessons are described as "an art, not a science." ODD makes the same principles explicit and forkable — codified as axioms so any participant (human or AI) can derive behavior from them without having spent a year observing Claude.

---

## Why the Divergence Matters

Thariq's team has deep observational access to how Claude uses tools — telemetry, usage data, model behavior at scale. They can iterate on the tool surface faster and with better signal than anyone outside Anthropic.

ODD cannot replicate that observational advantage. But ODD solves a problem Thariq's thread doesn't address: once the agent finds the right context through progressive disclosure, how do you know the context is *true*? How do you know it hasn't drifted? How do you distinguish verified claims from plausible-sounding assertions?

The Claude Code team makes the tool surface trustworthy. ODD makes the knowledge the tools access trustworthy. Neither replaces the other.

---

## Relationship to Shoemaker Convergence

This is the second independent convergence in two weeks. The structural pattern:

| Practitioner | Domain | Layer | Key Convergence |
|---|---|---|---|
| Shoemaker | AI coding toolkit | Generation (Layer 4) | Spec-first, layered verification, cross-evaluator checking |
| Thariq / Claude Code | Agent harness design | Tool surface (Layer 4–3 boundary) | Progressive disclosure, observation-first, capability evolution |
| ODD | Epistemic OS | Values + Context + Alignment (Layers 1–3) | Axioms, drift detection, community checking, compounding knowledge |

Three independent practitioners. Three entry points. Same structural conclusions. The patterns aren't accidents.

---

## Related Canon

- [Canon Resonance: AI Coding Toolkit](klappy://canon/resonance/ai-coding-toolkit) — The Shoemaker convergence, first in the series
- [The Harness and the Operating System](klappy://writings/the-harness-and-the-operating-system) — Public essay on the Shoemaker convergence
- [Progressive Disclosure](klappy://canon/methods/progressive-disclosure) — The method both systems converge on
- [Camping Risk](klappy://canon/constraints/camping-risk) — The pattern Thariq independently discovered in Todos → Tasks
- [Axiom 4: You Cannot Verify What You Did Not Observe](klappy://canon/values/axioms) — The axiom that governs both Thariq's design process and ODD's verification infrastructure
