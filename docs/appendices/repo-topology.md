---
uri: klappy://docs/appendices/repo-topology
title: "Repository Topology"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: semi_stable
tags: ["odd", "topology", "structure", "decoupling"]
---

# Repository Topology

> What lives where, what changes when, and how concerns stay decoupled.

## Description

The repository separates Content Plane (evolves independently), Governance Plane (canon + ODD), and Implementation Docs. Product lanes (`products/`) have been archived (see `docs/archive/products/`). This topology keeps concerns decoupled and content accumulating independently of any particular product implementation.

## Outline

- Why This Appendix Exists
- Core Topology
- What Lives Where
- What Changes When
- Source of Truth
- One Active App Per Lane
- Generated vs Source
- Deployment Preservation
- Summary

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** What lives where and what changes when

---

## Why This Appendix Exists

This appendix answers:
- "Where does stuff go?"
- "What moves vs what stays stable?"
- "What is allowed to change without triggering a new attempt?"

It encodes the decoupling between App, Content, and Infrastructure planes.

---

## Core Topology

```
/canon/                         # Canon documents (evolves independently)
/odd/                           # ODD public docs (evolves independently)
/about/                         # About docs (evolves independently)
/writings/                      # Public-facing essays and long-form content
/docs/                          # Implementation docs, decisions, agent guides
/docs/archive/                  # Archived content (products/, infra/, projects/, etc.)
/docs/templates/                # Document templates (PRD, etc.)
```

> **Post-lane architecture (E0005):** Product lanes (`products/`), infrastructure (`infra/`), and project docs (`projects/`) have been archived. The repository is now structure-agnostic — meaning is carried by frontmatter metadata and oddkit scope, not by folder paths. See `docs/derivative-works.md` for how derivative products relate to ODD.

---

## What Lives Where

### Content Plane (`/canon/`, `/odd/`, `/about/`, `/writings/`)

**Evolves independently.**

Contains:
- Canon documents (governance, constraints, principles)
- ODD philosophy (universal, product-agnostic)
- About pages (author context)
- Public-facing essays and long-form content

### Implementation Docs (`/docs/`)

**Implementation-specific reference and procedures.**

Contains:
- Agent guides and kickoff procedures
- Decision records (ADRs)
- Appendices, migrations, plans
- Templates (`/docs/templates/`)
- Archived content (`/docs/archive/`)

### Archive (`/docs/archive/`)

**Historical records from prior structure.**

Contains archived content from:
- `products/` — former product lanes (website, ai-navigation, agent-skill, etc.)
- `infra/` — former infrastructure scripts and config
- `projects/` — former project documentation
- Lane-specific docs (product-lanes.md, attempt-lifecycle.md, etc.)

---

## What Changes When

| Change Type | Location | Impact |
|-------------|----------|--------|
| Fix a typo in Canon | `/canon/` | Minimal — content evolves freely |
| Add a new ODD appendix | `/odd/` | Minimal — philosophy evolves freely |
| Update implementation docs | `/docs/` | Minimal — docs can rot and be updated |
| Add new content doc | `/about/` | Minimal — content evolves independently |
| Add new essay or writing | `/writings/` | Minimal — content evolves independently |
| Change manifest schema | `/canon/meta/` | May affect downstream consumers |

---

## Source of Truth

| Asset | Source |
|-------|--------|
| Canon governance | `/canon/` (frontmatter-bearing markdown) |
| ODD philosophy | `/odd/` (frontmatter-bearing markdown) |
| About content | `/about/` (frontmatter-bearing markdown) |
| Public writings | `/writings/` (frontmatter-bearing markdown) |
| Implementation docs | `/docs/` |
| Archived products/infra | `/docs/archive/` (read-only historical) |

---

## Summary

- **Content accumulates** — canon, ODD, about, and writings evolve independently
- **Docs are implementation-specific** — procedures, decisions, and guides for this repo
- **Archive preserves history** — former products, infra, and projects are archived, not deleted
- **Structure is not meaning** — scope and identity come from frontmatter and oddkit, not folder paths

This topology keeps concerns decoupled and supports the structure-agnostic ODD model (E0005).

---

**Status:** Updated for E0005 (post-lane, structure-agnostic)
