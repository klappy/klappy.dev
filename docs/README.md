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
| CLI commands | `attempt:register`, `attempt:nuke` | Tool-specific |
| Specific paths | `/products/<lane>/attempts/...` | Repo-specific |
| Cloudflare config | Branch deploys, preview URLs | Vendor-specific |
| Lane names | `website`, `ai-navigation`, `agent-skill` | Instance-specific |
| Epoch definitions | E0001, E0002, E0003 | Instance-specific |
| Tooling runbooks | ATTEMPTS.md, PREVIEW.md | Procedural |

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
| [ATTEMPTS.md](./ATTEMPTS.md) | Attempt lifecycle, CLI commands, artifact locations |
| [ATTEMPT_KICKOFF.md](./ATTEMPT_KICKOFF.md) | Human workflow for starting attempts |
| [AGENT_KICKOFF.md](./AGENT_KICKOFF.md) | Canonical agent entry point |
| [PREVIEW.md](./PREVIEW.md) | Local and Cloudflare preview guide |
| [CLOUDFLARE_CONFIG.md](./CLOUDFLARE_CONFIG.md) | Deploy configuration |

### Reference Documents

| File | Purpose |
|------|---------|
| [TRUTH_MAP.md](./TRUTH_MAP.md) | Authoritative source for each domain |
| [PRD.md](./PRD.md) | PRD orientation and routing |
| [WHAT_THIS_REPO_IS_NOT.md](./WHAT_THIS_REPO_IS_NOT.md) | Scope boundaries |
| [context-packs-and-projection-detail.md](./context-packs-and-projection-detail.md) | Detail levels for context pack projection (full, medium, low) |

### Templates

| File | Purpose |
|------|---------|
| [TEMPLATE.md](./TEMPLATE.md) | General article template |
| [TEMPLATE_README.md](./TEMPLATE_README.md) | Folder README index template |
| [decisions/TEMPLATE.md](./decisions/TEMPLATE.md) | Decision record template |
| [PRD/PRD_TEMPLATE.md](./PRD/PRD_TEMPLATE.md) | PRD template |

### Subfolders

| Folder | Purpose | Count |
|--------|---------|-------|
| [agent-architecture/](./agent-architecture/) | Agent system design patterns | 1 file |
| [appendices/](./appendices/) | Implementation-specific appendices | 17 files |
| [decisions/](./decisions/) | Implementation decision records (ADRs) | 14 files |
| [examples/](./examples/) | Case studies and examples | 1 file |
| [PRD/](./PRD/) | Lane PRDs and template | 3 files |
| [infra/](./infra/) | Infrastructure documentation | 1 file |

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
│  - constraints.md                               │
│  - definition-of-done.md                        │
│  - decision-rules.md                            │
└─────────────────────────────────────────────────┘
          │
          │ implements
          ▼
┌─────────────────────────────────────────────────┐
│  Docs (/docs/)  ← YOU ARE HERE                  │
│  Implementation details                         │
│  - ATTEMPTS.md (CLI procedures)                 │
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
