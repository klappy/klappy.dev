---
uri: klappy://docs
title: "Implementation Documentation"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["docs", "implementation", "reference", "index"]
---

# 📖 Implementation Documentation

> How klappy.dev implements **ODD (Outcomes-Driven Development)**. This is the reference implementation, not the philosophy.
>
> **ODD** = **Outcomes-Driven Development** — see [/odd/README.md](/odd/README.md) for the full philosophy.

## 🗺️ Where You Are in the Hierarchy

```
/odd/     ← Universal principles (timeless, product-agnostic)
/canon/   ← Program constraints (shared rules across products)
/docs/    ← YOU ARE HERE: Implementation details
```

**The rule:** ODD explains *why*. Canon explains *what rules we share*. Docs explains *how we do it here*.

---

## ✅ What Belongs in /docs/

| Content Type | Examples | Why Here |
|--------------|----------|----------|
| CLI commands | `oddkit orient`, `oddkit validate` | Tool-specific |
| Specific paths | `/docs/archive/...`, `/docs/templates/...` | Repo-specific |
| Cloudflare config | Branch deploys, preview URLs | Vendor-specific |
| Epoch definitions | E0001–E0005 | Instance-specific |
| Tooling runbooks | Agent kickoff, orchestrator guides | Procedural |

---

## 🚫 What Does NOT Belong in /docs/

| Content Type | Where It Goes | Why |
|--------------|---------------|-----|
| "Durable thinking is scarce" | `/odd/` | Universal principle |
| "Evidence over assertion" | `/odd/` | Universal principle |
| Definition of Done | `/canon/` | Shared across all products |
| Decision rules | `/canon/` | Shared across all products |

**Litmus test:**
1. Would this still be true in 10 years? → `/odd/`
2. Should all products in this program obey it? → `/canon/`
3. Is this about how *we* do it *here*? → `/docs/` ✓

---

## 📁 Contents

### Discovery & Navigation

| File | Purpose |
|------|---------|
| [CONTENT-MAP.md](./CONTENT-MAP.md) | **Comprehensive index of ALL content** (including apocrypha) |

### Workflows & Procedures

| File | Purpose |
|------|---------|
| [agents/AGENT_KICKOFF.md](./agents/AGENT_KICKOFF.md) | Canonical agent entry point |
| [derivative-works.md](./derivative-works.md) | Derivative works and product guidance |

### Reference Documents

| File | Purpose |
|------|---------|
| [appendices/WHAT_THIS_REPO_IS_NOT.md](./appendices/WHAT_THIS_REPO_IS_NOT.md) | Scope boundaries |

### Templates

| File | Purpose |
|------|---------|
| [TEMPLATE.md](./TEMPLATE.md) | General article template |
| [TEMPLATE_README.md](./TEMPLATE_README.md) | Folder README index template |
| [decisions/TEMPLATE.md](./decisions/TEMPLATE.md) | Decision record template |
| [templates/PRD_TEMPLATE.md](./templates/PRD_TEMPLATE.md) | PRD template |

### Subfolders

| Folder | Purpose | Count |
|--------|---------|-------|
| [_incoming/](./_incoming/) | Temporary intake for unclassified documents (Epoch 4 migration) | — |
| [agent-architecture/](./agent-architecture/) | Agent system design patterns | 1 file |
| [agents/](./agents/) | Agent role definitions and guidance | 20 files |
| [appendices/](./appendices/) | Implementation-specific appendices | 22 files |
| [audits/](./audits/) | Epistemic drift checks, reviews, evaluations | 3 files |
| [decisions/](./decisions/) | Implementation decision records (ADRs) | 15 files |
| [examples/](./examples/) | Case studies and examples | 1 file |
| [history/](./history/) | What happened, with evidence | 2 files |
| [migrations/](./migrations/) | How we change the system | 2 files |
| [oddkit/](./oddkit/) | Oddkit subsystem documentation | 7 files |
| [orchestrator/](./orchestrator/) | Orchestrator reference guides | 5 files |
| [plans/](./plans/) | Forward-looking design & planning | 1 file |
| [promotions/](./promotions/) | Canon promotion process | 3 files |
| [templates/](./templates/) | Document templates (PRD, etc.) | 1 file |
| [archive/](./archive/) | Archived docs from prior structure | — |

---

## 🔗 Relationship to ODD & Canon

```
┌─────────────────────────────────────────────────┐
│  ODD (/odd/)                                    │
│  Universal principles                           │
│  - progressive-elevation.md (portability ladder)│
│  - quantum-development.md                       │
│  - evolution-not-automation.md                  │
└─────────────────────────────────────────────────┘
          │
          │ derives
          ▼
┌─────────────────────────────────────────────────┐
│  Canon (/canon/)                                │
│  Program constraints                            │
│  - constraints/README.md                        │
│  - constraints/definition-of-done.md            │
│  - constraints/decision-rules.md                │
└─────────────────────────────────────────────────┘
          │
          │ implements
          ▼
┌─────────────────────────────────────────────────┐
│  Docs (/docs/)  ← YOU ARE HERE                  │
│  Implementation details                         │
│  - appendices/ATTEMPTS.md (CLI procedures)      │
│  - appendices/epochs.md (E0001-E0003)           │
│  - decisions/D0001-*.md (klappy.dev choices)    │
└─────────────────────────────────────────────────┘
```

---

## 🧹 Epistemic Hygiene Rules

1. **Docs can rot.** Implementation details change frequently. That's fine.
2. **Don't redefine Canon here.** If you find yourself writing a principle, it probably belongs in `/canon/` or `/odd/`.
3. **Cross-reference up, not down.** Docs references ODD/Canon. ODD/Canon shouldn't reference specific docs paths.
4. **Keep it procedural.** Docs answers "how do I..." not "why should I..."

---

## 👀 See Also

- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md)
- [Progressive Elevation](/odd/appendices/progressive-elevation.md)
- [ODD Contract](/odd/contract.md)
- [Canon Index](/canon/README.md)
