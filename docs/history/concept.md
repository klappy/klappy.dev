---
uri: klappy://docs/concept
title: "Concept Snapshot"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "concept", "overview", "problem-statement"]
---

# 🧠 Concept Snapshot

> **Working Title:** Outcomes-Driven Canon + Evidence-Based Agents

Below is Deliverable 1: Concept Snapshot.

This is intentionally tight, durable, and handoff-ready. It freezes the spine of the idea without dragging along the exploratory noise from this chat.

You can copy this verbatim into a doc, repo, or `/docs/concept.md`.

---

## 1. The Problem

AI coding agents are now capable of generating large amounts of code, UI, and architecture quickly. The limiting factor is no longer generation—it is judgment, consistency, and verification.

In practice, this creates three recurring failures:

**1. Prompt entropy**
- Dozens of fragile prompts and markdown files
- Each tool (Claude Code, Cursor, etc.) requires re-teaching
- Drift over time; nothing is canonical

**2. False completion**
- Agents confidently claim "it works"
- They didn't actually run it
- They didn't verify behavior
- They didn't look at the UI
- A human becomes the QA manager repeating the same objections

**3. Infinite possibility, no curation**
- AI unlocks many valid implementations for the same intent
- Artifacts are increasingly ephemeral
- Maintenance explodes unless abstraction moves up a level

The current workaround—better prompts—does not scale.

---

## 2. Core Insight

The solution is not better prompting.
The solution is a canonical contract.

Instead of embedding "how I think" into prompts, externalize it into a single, versioned source of truth that defines:

- design constraints
- decision rules
- what "done" actually means
- what evidence is required before a claim of success

AI agents must retrieve this canon, translate it into operational constraints, self-audit, and prove compliance with evidence (especially visual) before claiming completion.

This replaces repeated human nagging—not human judgment.

---

## 3. What This Is

This is a system composed of three layers:

**1. Authorial Canon (Human-Facing)**
- First-person documents (website artifacts)
- Constraints, principles, decision rules, QA expectations
- Expresses intent and defaults, not universal law
- Evolves over time

**2. Distribution Layer (MCP)**
- Serves the canon to LLMs and agents
- Provides stable, addressable retrieval
- No duplicated logic or rewritten versions

**3. Agent Contract (Execution-Facing)**
- Agents must:
  - retrieve canon
  - translate first-person intent into neutral constraints
  - build accordingly
  - self-audit
  - produce verification + visual proof
- If evidence cannot be produced, the task is not "done"

---

## 4. What This Is Not

- Not a manifesto meant to convince others
- Not a personality clone or "AI that sounds like me"
- Not a single chat prompt
- Not a magic replacement for judgment or taste
- Not a build system

It is policy + verification, not creativity.

---

## 5. Why MCP Is Involved

MCP is used strictly as a transport and discovery mechanism.

It allows:

- multiple tools to retrieve the same canon
- no re-prompting per environment
- no drift between agents
- explicit provenance ("this rule came from here")

The website remains the canonical source.
MCP exposes it; it does not redefine it.

---

## 6. What "Replace Me" Actually Means

"Replace me" does not mean replacing judgment, creativity, or final responsibility.

It means replacing:

- repeated reminders to follow principles
- repeated questions like "did you actually run it?"
- repeated demands to "prove it visually"

The human role shifts from QA enforcer to reviewer of evidence.

---

## 7. Immediate Outcomes

When this system is in place:

- Prompt sprawl collapses into a single canon
- Agents converge faster
- Failures are explicit instead of hidden
- Autonomous loops improve without human babysitting
- Ephemeral builds are acceptable because outcomes are verified

---

## 8. Why This Matters Now

AI has moved software creation into a space of infinite possibility.
The scarce resource is no longer implementation—it is trustworthy outcomes.

This system treats:

- code as potentially ephemeral
- principles as durable
- verification as mandatory
- curation as the core skill

---

## 9. Next Artifacts (Downstream)

This snapshot feeds directly into:

- an updated PRD
- a first-person canon (constraints, rules, QA contract)
- an agent handoff instruction
- an MCP server design

None of those should re-litigate the ideas above.

---

## ✅ Status

- Concept frozen
- Ready to proceed to Updated PRD
