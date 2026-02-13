---
uri: klappy://infra/prompts
title: "Prompts"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["infra", "prompts", "agents", "index"]
---

# Prompts

> Reusable prompt templates for agent tasks.

## Description

The prompts folder contains curated prompt templates for common agent operations. These are not ad-hoc instructions—they encode tested workflows that agents should follow verbatim. Each prompt set includes context, criteria, and expected outputs.

## Outline

- Contents
- When to Use Prompts
- Creating New Prompts

---

## Contents

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `attempt-kickoff/` | Agent initialization for attempt work | `BOOTSTRAP.md`, lane-specific kickoffs |
| `doc-inclusion-audit/` | Document audit for packs and exports | `PROMPT.md`, `CHECKLIST.md` |

---

## Prompt Sets

### attempt-kickoff

Agent bootstrap for starting new attempts. Ensures agents read required docs, follow provenance rules, and produce online evidence.

| File | Purpose |
|------|---------|
| `BOOTSTRAP.md` | Universal agent initialization (read first) |
| `website.md` | Website lane-specific kickoff |

### doc-inclusion-audit

Evaluate which documents belong in book exports and context packs.

| File | Purpose |
|------|---------|
| `PROMPT.md` | Complete audit prompt with criteria |
| `CHECKLIST.md` | Quick decision trees and templates |
| `README.md` | Usage guide |

---

## When to Use Prompts

- **Starting an attempt:** Use `attempt-kickoff/BOOTSTRAP.md`
- **Auditing documentation:** Use `doc-inclusion-audit/PROMPT.md`
- **Adding new lanes:** Create lane-specific kickoff in `attempt-kickoff/`

---

## Creating New Prompts

New prompts should include:

1. **Context:** What the agent needs to know
2. **Criteria:** How to make decisions
3. **Output format:** Expected deliverables
4. **Verification:** How to check success

Store in a subfolder with a descriptive name and README.
