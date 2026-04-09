---
uri: klappy://canon/resonance/agent-skills
title: "Agent Skills"
audience: canon
tier: 2
voice: neutral
stability: evolving
tags:
  - resonance
  - agent-skills
  - skills
  - progressive-disclosure
  - mcp
  - knowledge-management
  - oddkit
  - vodka-architecture
relevance: background
execution_posture: exploratory
exposure: nav
epoch: E0007
date: 2026-03-05
revised: 2026-04-09
complements: "docs/oddkit/positioning.md, canon/resonance/README.md, writings/when-skills-arent-enough.md, canon/principles/vodka-architecture.md"

# Provenance

provenance:
  original_draft: "Mar 5-6, 2026 — drafted during comparison session with Claude's Agent Skills system"
  lost_to_handoff: "Mar 6 - Apr 9, 2026 — completed and validated but never committed. Same handoff friction as the companion essay."
  revision: "Apr 9, 2026 — recovered. Skills system updated (subagents, evals, resource folders, hot-reload). oddkit side updated (Vodka Architecture named, E0007 proactive posture realized). Both sides matured; divergences sharpened."
---

# Agent Skills (Resonance)

> Anthropic (open standard via agentskills.io), December 2025. Updated through March 2026 with subagent delegation, eval/benchmark pipeline, resource subfolders, and hot-reloading.

## ODD Principle: The Serving Layer Carries Everything and Tastes Like Nothing

Epistemic infrastructure must be thin, stateless, and domain-agnostic — all substance comes from the knowledge base, not from the serving layer. The mechanism for retrieving knowledge must be portable across tools and interfaces, searchable by need rather than keyword, and continuously available rather than task-scoped.

---

## Convergent Quotes (Non-Authoritative)

> "Skills are folders of instructions, scripts, and resources that agents can discover and use to perform better at specific tasks."
> — agentskills.io

> "Skills prepare Claude to solve a problem, rather than solving it directly."
> — Lee Han Chung, "Claude Agent Skills: A First Principles Deep Dive"

---

## Where ODD Aligns

- **Progressive disclosure as architecture:** Both systems tier knowledge loading — metadata first, full content on demand, supporting resources only when needed. Neither dumps everything into context upfront. Skills' resource subfolders for on-demand loading are structurally parallel to oddkit's catalog → search → get retrieval depth.
- **Portable format over platform lock-in:** Agent Skills are an open standard adopted across Claude Code, Cursor, Codex, and ChatGPT. oddkit is an MCP server accessible from any MCP-compatible host. Both reject the "switch to our platform" adoption model.
- **Separation of discovery from content:** Skills separate the description (trigger) from the body (instructions) from bundled resources. oddkit separates catalog from search results from full document retrieval. The routing decision and the knowledge are distinct layers.

These alignments are mechanical — shared structural patterns, not philosophical agreements.

---

## Where ODD Diverges (Explicit)

oddkit is what results when skills scale beyond procedures into abstract thinking. The divergences are consequences of that scaling, not disagreements with the skills model.

- **Search vs. trigger matching:** Skills discover knowledge through keyword matching against frontmatter descriptions. oddkit discovers knowledge through natural language search across an entire corpus. When the collection is small and procedural, keyword triggers work. When it reaches hundreds of documents about how to think, search becomes necessary.
- **Variable-depth retrieval vs. fixed tiers:** Skills load in two tiers — frontmatter description, then full SKILL.md content (with optional resource subfolder). oddkit retrieves at continuously variable depth — catalog metadata, search snippets with scores, section-level extraction, full document. The depth is driven by the question, not by a fixed hierarchy.
- **Interconnected corpus vs. self-contained units:** Each skill is designed to work independently. oddkit documents have explicit `derives_from`, `complements`, and `governs` relationships. A verification principle surfaces during a challenge that was encoded months ago. A constraint documented in one context blocks premature convergence in another. Self-contained units can't hold interconnected knowledge.
- **Stateless server over stateful canon vs. instructions over static substrate:** oddkit's Vodka Architecture — thin, stateless server over a git-backed, accumulating knowledge base — means the knowledge grows while the serving layer stays fixed. Skills are instruction files that can be versioned but don't accumulate, interconnect, or evolve as a corpus. The knowledge base is the compound asset; individual files are not.
- **Epistemic tools vs. procedural instructions:** Skills tell agents *how to do things*. oddkit's tools — orient, challenge, gate, validate — operate *on* knowledge, not just within it. They apply knowledge against live claims, check transition readiness, and pressure-test assumptions. Skills gained eval/benchmark capability in March 2026, which is a step toward self-assessment, but the eval tests skill output quality — not epistemic integrity of the reasoning process.
- **Continuous posture vs. task-scoped activation:** Skills activate on keyword match and deactivate when done. They shape what the agent does *right now*. oddkit shapes how the agent thinks *continuously* — the project instructions carry axioms, and oddkit is always available to challenge, orient, or gate. That's the scope-of-influence distinction: an on-demand hammer vs. an always-present discipline. Skills can now delegate to subagents, which extends their reach, but the subagent still operates within the skill's task scope.
- **Thin prompts over front-loaded instructions:** oddkit's Vodka Architecture means the system prompt carries only posture and axioms. Everything else is retrieved on demand. Skills — even with progressive disclosure via resource subfolders — still operate within a prompt that front-loads their content when activated. When you have ten skills installed, their descriptions alone consume context on every message.

---

## Why the Divergence Matters

Skills are powerful for what they solve: repeatable procedures, consistent formatting, task-specific instructions. They're the right tool when the knowledge is procedural and the collection is manageable. oddkit doesn't replace skills. It is what the skills pattern becomes when the collection outgrows the recipe box and the content shifts from instructions to judgment. The management-and-scale problem, the scope-of-influence problem, and the system-prompt-pressure problem are all consequences of the same underlying shift: the knowledge that needs to travel with your agent outgrows the container you put it in.

---

## Operationalization in ODD

- oddkit search replaces keyword triggers when discovery requires ranking across hundreds of documents
- Progressive retrieval depth is driven by the question, not by a fixed three-tier hierarchy
- The knowledge base is the substrate — git-backed, accumulating, accessible from any MCP client on any device
- Epistemic tools (orient, challenge, gate, validate) operate on the knowledge base, not just within it — they apply knowledge against live claims rather than merely surfacing it
- The same MCP server serves Claude Chat, Claude Code, voice agents, Cursor, Gemini, and any future interface — the knowledge travels without being repackaged per client
- Vodka Architecture enforces domain-agnosticism: the server carries the epistemic discipline, the knowledge base carries the domain

---

## Related Canon

- [Vodka Architecture](klappy://canon/principles/vodka-architecture)
- [oddkit — A Protocol, Not a Platform](klappy://docs/oddkit/positioning)
- [When Skills Aren't Enough](klappy://writings/when-skills-arent-enough) — public-facing companion essay
- [Resonance Index](klappy://canon/resonance/README)
