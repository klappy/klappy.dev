---
uri: klappy://docs/truth-map
title: "Truth Map"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["docs", "implementation", "truth", "authority", "reference"]
---

# 🗺️ Truth Map

> **Purpose:** This document identifies the single authoritative source for each category of truth in this repository. If something is not listed here, it is not authoritative.

---

## 🏛️ Three-Tier Authority Structure

Truth in this repository is organized into three tiers with different decay rates:

| Tier | Location | Contains | Decay Rate |
|------|----------|----------|------------|
| **ODD** | `/odd/` | Universal principles (timeless, product-agnostic) | Almost never |
| **Canon** | `/canon/` | Program-level constraints (shared rules) | Carefully |
| **Docs** | `/docs/` | Implementation details (this instance) | Freely |

**The litmus test:**
1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

See [D0001: Three-Tier Conceptual Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md) for the full decision.

---

## 📋 Authoritative Sources

| Domain | Authoritative Source | Notes |
|--------|---------------------|-------|
| **Universal methodology** | `/odd/` | ODD principles, portable across repos |
| **Program constraints** | `/canon/` | Shared rules (definition-of-done, decision-rules) |
| **Deploy workflow** | `/docs/infra/CLOUDFLARE_CONFIG.md` | Branch roles, promotion, Cloudflare setup |
| **Attempt workflow** | `/docs/appendices/ATTEMPTS.md` | Lifecycle, META schema, finalization |
| **Agent kickoff** | `/docs/agents/AGENT_KICKOFF.md` | Canonical agent entry point |
| **Active PRDs** | `/docs/PRD/<lane>/PRD.md` | Current hypothesis per lane |
| **Content manifest** | `/public/content/manifest.json` | Generated; what exists, disclosure tiers |
| **ODD decisions** | `/odd/decisions/` | Universal methodology decisions |
| **Implementation decisions** | `/docs/decisions/` | klappy.dev-specific ADRs |

---

## 🌿 Branch Roles (Canonical)

| Branch | Role | Deploys To |
|--------|------|------------|
| `prod` | **Production** — only champions go here | klappy.dev (production) |
| `main` | **Lab notebook** — experiments, history, artifacts | Preview only |
| `*` (any other) | **Attempt sandboxes** — ephemeral agent workspaces | Preview only |

> **Invariant:** You never nuke `prod`. You may nuke `products/<lane>/src` on agent branches freely.

---

## 🔄 Current Attempt Model (Canonical)

| Step | Command | What It Does |
|------|---------|--------------|
| 1 | `attempt:register --lane <lane>` | Captures provenance (agent, model, tool, git SHA, lane) |
| 2 | `attempt:nuke --lane <lane>` | Deletes `products/<lane>/src/` — guarantees blank slate |
| 3 | (agent builds) | Implementation from scratch |
| 4 | `attempt:finalize --lane <lane>` | Assigns `attempt-001`, `attempt-002`, etc. |
| 5 | `attempt:promote --lane <lane>` | Merges champion to `main`, fast-forwards `prod` |

> **Invariant:** Register first to capture provenance. Nuke immediately after to guarantee independence.

---

## 🚫 Deprecated Terminology (Do Not Use)

| Old Term | Replaced By | Notes |
|----------|-------------|-------|
| `ATTEMPT_REGISTRY.json` | `attempt:finalize` | Numbers assigned at completion, not reservation |
| `attempt:reserve` | `attempt:register` | Registration captures provenance, not just a number |
| `attempt:reset` | `attempt:nuke` | Nuke is explicit; reset was ambiguous |
| "main is production" | "`prod` is production" | D0001 decision |
| `/canon/odd/` | `/odd/` | ODD elevated to root level (2.1.0) |

---

## 📖 How to Use This Document

1. **If two docs conflict**, the one listed in "Authoritative Sources" wins.
2. **If you find drift**, fix it or flag it — don't propagate the error.
3. **If you're adding new truth**, update the authoritative source, not a satellite doc.
4. **If unsure which tier**, apply the litmus test above.

---

## 🗑️ Derived Outputs (Do Not Edit)

These paths contain derived/compiled artifacts. Never edit them directly:

| Path | Why Derived | Source |
|------|-------------|--------|
| `public/_compiled/**` | Compilation outputs | Source docs + compile plans |
| `public/content/**` | Mirrored content | Source folders (odd/, canon/, docs/, about/) |
| `public/agent-skill/**` | Versioned skill packs | products/agent-skill/ |

**Rules:**

- **Always link to source URIs** (`klappy://...` or source file paths) — compiled outputs are ephemeral views
- If a derived file needs fixing, fix the source and regenerate
- Derived outputs can be deleted and rebuilt anytime
- Never edit derived files directly

---

## 🔗 See Also

- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md)
- [ODD Contract](/odd/contract.md) — Version 2.1.0
- [D0001: prod Branch Is Production](/docs/decisions/D0001-prod-branch-is-production.md)
- [D0007: Branch Names Are Convenience](/docs/decisions/D0007-branch-names-are-convenience.md)
- [D0008: Register Before Nuke](/docs/decisions/D0008-register-before-nuke.md)
