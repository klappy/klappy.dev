---
uri: klappy://odd/decisions
kind: canon
title: "ODD Conceptual Decisions"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "decisions", "conceptual", "philosophy"]
relevance: routing
execution_posture: routing
---

# ODD Conceptual Decisions

> Decisions about ODD's mental model and conceptual architecture.

This folder contains decisions about ODD itself — the philosophy, not any specific implementation.

To list decisions: oddkit catalog with path_prefix=odd/decisions/ (include all kinds until the kind fix lands).

---

## Two Types of Decisions

| Location | Contains | Example |
|----------|----------|---------|
| `/odd/decisions/` | Decisions about ODD's conceptual architecture | "ODD is a three-tier hierarchy" |
| `/docs/decisions/` | Decisions about this implementation | "prod branch is production" |

---

## The Principle

> **Conceptual architecture lives in canon. Implementation decisions live in docs.**

The three-tier model (ODD → Canon → Docs) is itself captured in D0001.

---

## See Also

- `/docs/decisions/README.md` — Implementation decision index
- `/odd/contract.md` — ODD System Contract
