# Odd-Teaser Product Lane

This lane embodies the **Epoch 4 guiding artifact philosophy** as a maintained product.

Its purpose is not explanation, navigation, or engagement.
Its purpose is **epistemic externalization and exit**.

**Klappy.dev must always be easier to leave than to continue.**

---

## Lane Overview

| Field | Value |
|-------|-------|
| **Status** | Active |
| **PRD Version** | v1.1 |
| **Supersedes** | website, ai-navigation |
| **Primary User** | First-time visitors who externalize artifacts and leave |

---

## Quick Links

| Document | Purpose |
|----------|---------|
| [PRD.md](PRD.md) | Authoritative requirements |
| [KICKOFF.md](KICKOFF.md) | How to start an attempt |
| [HISTORY.md](HISTORY.md) | Version evolution and learnings |
| [behavior.md](behavior.md) | LLM behavior enforcement |
| [LEDGER.md](LEDGER.md) | Product-level decisions |

---

## Lane Structure

```
products/odd-teaser/
+-- PRD.md              # Authoritative, mutable PRD
+-- README.md           # This file
+-- KICKOFF.md          # Attempt starting instructions
+-- HISTORY.md          # Version tracking and learnings
+-- behavior.md         # LLM behavior contract
+-- LEDGER.md           # Product decisions log
+-- attempts/           # Attempt artifacts
|   +-- prd-v1.1/       # Attempts against v1.1
+-- src/                # Implementation source (human-promoted)
+-- dist/               # Build output
+-- prompts/            # Prompt templates (if any)
```

---

## Core Philosophy

This is NOT a documentation site. This is NOT a teaching tool.

The product exists for **epistemic externalization and exit**.

A first-time visitor leaves after one session having:
1. Externalized at least one epistemic artifact
2. Noticed a missing habit in their own workflow
3. Taken something with them (export)

The product succeeds even if the user never returns.

---

## Non-Goals (Hard Exclusions)

If you are looking to:
- Explain ODD
- Browse canon
- Answer questions
- Teach methodology
- Optimize engagement

**You are in the wrong lane.**

---

## Starting an Attempt

1. Read [KICKOFF.md](KICKOFF.md)
2. Check [HISTORY.md](HISTORY.md) for prior learnings
3. Create attempt folder: `attempts/prd-v<VERSION>/attempt-NNN/`
4. Work inside your sandbox
5. Close with evidence

See [KICKOFF.md](KICKOFF.md) for detailed instructions.

---

## Key Decision

**dec-20260131-0001:** odd-teaser MUST use LLM-based artifact detection (odd-scribe style) to watch user journaling and surface potential learnings/decisions for user confirmation. Manual categorization UI is explicitly rejected.

---

## Related Documents

- Epoch 4 Philosophy: `/docs/guiding-artifacts/epoch-4/`
- Product Lanes: `/docs/appendices/product-lanes.md`
- Canon Agents: `/docs/agents/odd-scribe.md`, `/docs/agents/odd-orchestrator.md`
