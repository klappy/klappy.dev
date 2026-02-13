---
uri: klappy://docs/derivative-works
title: "Derivative Works — ODD in Practice"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["derivative-works", "odd", "portability", "projects"]
epoch: E0005
derives_from: "docs/decisions/D0016-structure-agnostic-odd.md"
---

# Derivative Works — ODD in Practice

> Four standalone projects originated from this repo's lane era. They are living evidence that ODD's concept of independent product evolution works — the products graduated from lanes into their own repos, proving ODD's portability thesis: the concepts transferred, the directory conventions didn't.

## Summary — Products Graduated, Not Failed

The multi-lane architecture (E0002-E0004) served its purpose: it proved that independent products can share canon without sharing lifecycle. That learning is durable. Each lane product eventually outgrew the directory conventions and became its own repository. This is the strongest evidence that lanes worked *conceptually* while the *folder structure* was scaffolding.

See `docs/decisions/D0016-structure-agnostic-odd.md` for the decision that formalized this transition.

---

## Projects

### OddKit — oddkit.klappy.dev

**Origin:** Agent-skill lane (compiled packs for AI agents)

OddKit is ODD's MCP (Model Context Protocol) server — the epistemic tooling interface that replaced prescribed lane workflow commands. It provides orient, challenge, gate, encode, search, validate, get, catalog, and preflight tools that dynamically route agents to relevant context.

**ODD concepts it exercises:** Epistemic routing, evidence gating, progressive disclosure, constraint enforcement.

---

### ODD — odd.klappy.dev

**Origin:** Website lane (odd-teaser) and ODD methodology docs

The ODD methodology as a standalone, explorable site. Where this repo contains the governance infrastructure (canon, constraints, decisions), odd.klappy.dev makes the methodology accessible to anyone exploring Outcomes-Driven Development.

**ODD concepts it exercises:** Progressive disclosure, structure-agnostic portability, values-first documentation.

---

### klappy.dev

**Origin:** This repo

The governance layer itself — canon, decisions, axioms, constraints, and the Definition of Done. This is where ODD's epistemic infrastructure lives and evolves. OddKit reads from this repo's baseline to serve agents.

**ODD concepts it exercises:** Three-tier hierarchy, epoch model, decision records, evidence policy.

---

### Apocrypha — apocrypha.klappy.dev

**Origin:** Canon fragments (canon/apocrypha/)

Creative and philosophical artifacts from the canon — fragments, predocumentaries, and reconstructions that explore the ideas behind ODD through narrative and allegory. Preserved as a standalone site for those who want to engage with the deeper conceptual grounding.

**ODD concepts it exercises:** Progressive elevation, narrative as epistemic tool, archive as provenance.

---

## How to Explore ODD

| If you want to... | Start here |
|-------------------|------------|
| Use ODD's epistemic tools | oddkit.klappy.dev |
| Understand the methodology | odd.klappy.dev |
| Read the governance infrastructure | This repo (klappy.dev) |
| Explore the philosophical grounding | apocrypha.klappy.dev |
