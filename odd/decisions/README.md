---
uri: klappy://odd/decisions
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

---

## Conceptual Decisions (This Folder)

| ID | Decision | Summary |
|----|----------|---------|
| [D0001](./D0001-three-tier-conceptual-hierarchy.md) | Three-Tier Conceptual Hierarchy | ODD separates universal principles → program constraints → implementation details |
| [D0002](./D0002-uri-prefixes-denote-governance-authority.md) | URI Prefixes Denote Governance Authority | Identity = authority prefix + opaque slug; registry binds authority → repo; target_repo retires post-bifurcation (proposed) |

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

- [D0001: Three-Tier Conceptual Hierarchy](./D0001-three-tier-conceptual-hierarchy.md)
- `/docs/decisions/README.md` — Implementation decision index
- `/odd/contract.md` — ODD System Contract
