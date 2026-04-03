---
uri: klappy://docs/oddkit/proactive/terminology-project-journal
title: "Terminology — Project Journal Over Epistemic Ledger"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "terminology", "project-journal", "epistemic-ledger", "naming", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Terminology — Project Journal Over Epistemic Ledger

> "Project journal" is the user-facing term. "Epistemic ledger" is the canon-precise term. Both are valid. Use "project journal" in tool descriptions, user-facing documentation, and any context where the audience is an operator rather than a canon contributor.

---

## Summary — Name Things for the Audience That Uses Them

The OLDC+H capture mechanism lives in the `odd/ledger/` directory and is formally called the "epistemic ledger" in canon documentation. This term is precise — it describes a record of epistemic events (observations, learnings, decisions, constraints, handoffs) structured for retrieval.

But "epistemic ledger" is jargon. An operator encountering oddkit for the first time does not know what "epistemic" means in this context, does not know what a "ledger" implies beyond accounting, and cannot infer from the term what the tool actually does.

"Project journal" communicates immediately: it is a journal for the project. It captures what happened, what was learned, what was decided. The metaphor is familiar. The function is clear.

---

## When to Use Which

**Project journal** — In tool descriptions, MCP tool summaries, onboarding documentation, user-facing error messages, and any context where the reader is an operator using the system.

**Epistemic ledger** — In canon governance documents, epoch declarations, system architecture discussions, and any context where precision about the knowledge-management function is required.

---

## The Directory Stays

The `odd/ledger/` directory name does not change. Directory names are stable identifiers, not user-facing labels. The user-facing term is "project journal." The storage location is `odd/ledger/`. Both can coexist because they serve different audiences.
