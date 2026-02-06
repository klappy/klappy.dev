---
uri: klappy://docs/orchestrator/usage-librarian
title: "Using the Librarian"
subtitle: "How to ask for rules and get answers with receipts"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["librarian", "citations", "policy", "lookup"]
---

# Using the Librarian

> The Librarian is for "what's the rule / where is it / what does Canon say?"

## When to use it

Use Librarian for:

- "Where is the rule about X?"
- "What does ODD say about Y?"
- "What is the definition of done?"
- "Show me the policy / constraint / verification standard"

Do NOT use Librarian for:

- creating a PRD
- building code
- brainstorming features

(Those are execution tasks — Librarian is retrieval.)

## How to run it

```bash
npm run orchestrator:dry -- "Where is the rule about visual proof?"
```

## How to interpret the output

### Status

- `SUPPORTED` — answer is backed by repo sources
- `INSUFFICIENT_EVIDENCE` — cannot safely answer from sources

### Evidence bullets (load-bearing)

A valid evidence bullet has:

- a quote (8–40 words)
- a citation formatted as `path/to/doc.md#Heading`

Example:

- "MUST provide visual proof for any work affecting user-visible behavior" — `canon/constraints/visual-proof.md#Operating Constraints`

If the response lacks evidence bullets, treat it as untrusted.

### Read Next

This is navigation, not filler.
Use it to deepen context without stuffing more into the initial response.

## How to ask better questions

**Better:**

- "Where is the rule about visual proof?"
- "What is the definition of done?"
- "What does Canon say about claiming completion?"

**Worse:**

- "Tell me everything about ODD"
- "How should we do software?"

When in doubt, ask:

- "Where is the rule…"
- "What does it require…"
- "What evidence is required…"

## Expected failure mode (healthy)

If a rule is missing, Librarian should refuse.
That refusal is a signal:

- add documentation
- or capture a promotion artifact
