---
uri: klappy://docs/orchestrator/quickstart
title: "Orchestrator Quickstart"
subtitle: "How to run Librarian + Validation + Promotions in this repo"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["orchestrator", "librarian", "validation", "promotions", "quickstart"]
---

# Orchestrator Quickstart

> The shortest path from "fresh clone" to "useful answers with receipts."

## What this system is

This repo contains an orchestrator with three main capabilities:

1. **Librarian** — answers policy / "what's the rule?" questions using repo sources, with citations and quotes.
2. **Validation** — turns "done" claims into required evidence and returns a verdict (PASS / NEEDS_ARTIFACTS / FAIL / CLARIFY).
3. **Promotions** — a human-controlled pipeline for capturing repeated failures and proposing Canon improvements with provenance.

The orchestrator routes incoming messages to the right capability.

## Prerequisites

- Node.js installed
- Repo dependencies installed:

```bash
npm install
```

## Build the docs index (fast lookup)

The Librarian uses a compiled index for fast retrieval:

```bash
npm run docs:index
```

This generates:

- `public/_compiled/index/docs.json`

## Run the orchestrator (dry)

Use the orchestrator dry runner to test a single query:

```bash
npm run orchestrator:dry -- "Where is the rule about visual proof?"
```

Expected outcome:

- `SUPPORTED`
- 2+ evidence bullets with quotes + `path#Heading` citations
- A short Read Next section

## Run the test harness

This prevents regressions and checks for citation laundering:

```bash
npm run orchestrator:test
```

Expected outcome:

- All tests pass

## How to "use it" day-to-day

You have two usage modes:

### Mode A — CLI (fastest)

Use `orchestrator:dry` with real questions or completion claims:

```bash
npm run orchestrator:dry -- "What is the definition of done?"
npm run orchestrator:dry -- "We finished the UI update and shipped it."
```

### Mode B — Embed into an agent workflow

Copy/paste the orchestrator output (Librarian or Validation) into:

- Cursor agent system prompt
- a PR review template
- an internal doc

The key is that Librarian outputs are citation-backed, so they are safe to reuse.

## Troubleshooting

### "INSUFFICIENT_EVIDENCE"

This is not a failure. It means:

- the system could not find sufficient source support
- or the query is too vague
- or relevant docs are missing

Next step:

- follow the Read Next links
- or ask a narrower question
- or add the missing documentation (then rerun `npm run docs:index`)

### "docs.json is stale"

If you add or change docs and results look wrong:

```bash
npm run docs:index
```

## File map (where the important code lives)

- `infra/orchestrator/services/librarian.js` — retrieval + scoring + slicing
- `infra/orchestrator/renderers/librarian-renderer.js` — canonical output formatting (single renderer)
- `infra/orchestrator/validators/librarian-response.js` — enforces citations + relevance + anti-laundering
- `infra/orchestrator/services/validation.js` — claims → evidence → verdict
- `infra/orchestrator/router.js` — decides which service to call
- `infra/orchestrator/tests/` — adversarial behavior tests
- `docs/promotions/` — learning artifacts and proposals

## Concepts

For deeper reading on orchestrator behaviors:

- **Epistemic Challenge (playbook)** — `docs/orchestrator/epistemic-challenge.md`
- **Canon doctrine: Epistemic Challenge** — `canon/constraints/epistemic-challenge.md`
- **Epistemic Hygiene (smell triggers)** — `canon/diagnostics/epistemic-hygiene.md`
- **Weighted Relevance & Arbitration** — `canon/methods/weighted-relevance-and-arbitration.md`
