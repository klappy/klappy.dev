---
uri: klappy://docs/oddkit/proactive/encode-does-not-persist
title: "Encode Does Not Persist — The Caller Must Save"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "encode", "persistence", "proactive", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Encode Does Not Persist — The Caller Must Save

> The encode tool returns structured artifacts in the response stream. It does not save them anywhere. Every encode output that isn't explicitly saved by the caller is lost.

---

## Summary — Encode Is a Formatter, Not a Database

This is the single most important operational fact about oddkit's encode tool: it does not persist. Calling encode structures a decision, observation, learning, constraint, or handoff into a well-formed artifact — and then returns it in the response. That's all it does.

If the caller does not save the output — to a file, a project journal, a database, a ledger entry — the artifact is gone. It existed in the response stream and nowhere else.

---

## Why This Matters

The natural assumption is that "encode" means "record." In most systems, encoding something implies storage. In oddkit, it does not. ODD is a protocol layer, not a storage layer. The encode tool structures; the caller persists.

This design is intentional. ODD does not own the operator's storage. Different operators use different storage: files, databases, project management tools, version control. The protocol provides structure. The operator provides persistence.

But the design created a gap: operators assumed encoding meant saving. Sessions of valuable OLDC+H capture were silently lost because the operator called encode and moved on, not realizing the output needed to be explicitly saved.

---

## What E0007 Changes

Under E0007, encode responses include an explicit declaration: `persist_required: true` and a next-action instruction telling the caller to save the output. The system does not silently lose the operator's work. The persistence gap is named, not hidden.

The agent's responsibility: after calling encode, save the output. Do not present encode results to the operator without also persisting them. The encode-then-forget pattern is a system failure, not an operator error.

---

## Where to Save

Save encode outputs to the project journal — the `odd/ledger/` directory in the repository, or whatever storage the current project uses. One entry per session or per significant milestone. Include timestamps. Maintain narrative order.
