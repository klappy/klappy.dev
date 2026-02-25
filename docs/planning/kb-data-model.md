---
uri: klappy://docs/planning/kb-data-model
title: "Planning: Everything Is a Project — The oddkit Data Model"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["planning", "oddkit", "kb", "projects", "governance", "write-access", "architecture"]
epoch: E0005
date: 2026-02-25
derives_from: "odd/decisions/D0001-three-tier-conceptual-hierarchy.md, docs/decisions/D0016-structure-agnostic-odd.md, odd/ledger/epistemic-ledger.md, canon/principles/scope-over-folders.md, canon/constraints/meaning-must-not-depend-on-path.md"
complements: "docs/planning/oddkit-write-access.md, docs/decisions/D0017-oddkit-write-path.md, docs/oddkit/IMPL-oddkit-write.md"
governs: "oddkit write path target model, repo structure conventions"
---

# Planning: Everything Is a Project — The oddkit Data Model

> There is one concept: the project. A Knowledge Base (KB) is the root project — the one whose scope encompasses everything inside it. Governance is a role on a project — governance project constraints apply to sibling projects. If no governance project exists, ODD from klappy.dev is the default governance: axioms, creed, and core constraints always apply and can be extended but never weakened. The root project is where the global ledger, journal, and queues live unless explicitly scoped to a sub-project. oddkit connected to any repo treats that repo as a root project with ODD governance — zero-config onboarding. The full model is invisible until needed. Progressive disclosure applied to system architecture.

-----

## Summary — One Concept, Three Roles, Zero Config

The write path needs a target model. The simplest model that works: everything is a project. Projects have roles derived from D0001's three-tier litmus test. A root project (KB) is the top-level scope. A governance project provides constraints that apply across siblings. A regular project is where work happens. These are roles, not types — a project's role is determined by what it contains and how it's scoped, not by special infrastructure.

The zero-config insight: connect oddkit to any repo and ODD governance applies immediately. The user never needs to know about KBs, governance projects, or extensibility. They just get epistemic discipline. When they outgrow the defaults — when they need their own constraints — they create a governance project. It extends ODD. oddkit sees it. The complexity is progressive. The entry point is zero.

-----

## The Model — One Concept, Three Roles

**Project** — A collection of related content. Everything is a project. The distinctions are roles, not types.

**Root project (KB)** — The project at the top. Its scope encompasses everything inside it. The global ledger, journal, and queues live here unless a sub-project declares its own. Today, a root project maps to a GitHub repo. oddkit connects to it via repo URL + token.

**Governance project** — A project whose constraints apply across sibling projects in the same root. In klappy.dev today: `canon/` and `odd/` function as governance. Their axioms, constraints, principles, and methods govern everything else. The governance role is declared in frontmatter, not inferred from path.

**Regular project** — A project where work happens. Articles, code, resources, specs. Subject to governance constraints from sibling governance projects and from ODD defaults.

-----

## D0001's Litmus Test Determines Role

The three-tier conceptual hierarchy already solved this. The same litmus test that classifies files classifies projects:

**"Would this still be true if this KB didn't exist?"** → ODD tier. This is the default governance that oddkit provides from klappy.dev. It transcends any single root project.

**"Should all projects in this KB obey it?"** → Governance project. Local constraints that extend ODD for this specific scope of work.

**"Is this about how we do it here?"** → Regular project. The work itself.

-----

## Default Governance — ODD Is Always Present

If no governance project is selected or exists in a root project, ODD from klappy.dev is the default. This means:

- Brand-new empty repo + oddkit = epistemic discipline from day one
- The axioms, creed, and core constraints are never absent
- Local governance extends ODD, never weakens it
- A user can work with oddkit indefinitely without ever creating a governance project

This is the onramp. Someone connects oddkit to their repo — any repo — and it just works. They never need to learn the vocabulary of KBs, governance roles, or project scoping. When the defaults stop being sufficient, they extend. Not before.

-----

## Where the Ledger Lives

The epistemic ledger (observations, learnings, decisions, constraints, handoffs, planning queue, drift queue) lives at the root project level by default. This is the global ledger for the KB.

Sub-projects can scope their own ledger entries. A decision made within a sub-project applies within that sub-project unless explicitly promoted to root scope. The scoping is declared in the entry, not inferred from where the file lives.

Ledger entries are files. They go through the same write path as everything else — `oddkit_write` for non-terminal surfaces, native git for Claude Code.

-----

## How This Maps to klappy.dev Today

| Role | klappy.dev reality |
|---|---|
| Root project (KB) | The `klappy/klappy.dev` repo itself |
| Governance project | `canon/` + `odd/` (axioms, constraints, principles, methods) |
| Regular project | `writings/` (articles, essays) |
| Regular project | `docs/oddkit/` (tool docs, impl specs) |
| Regular project | `docs/planning/` (planning queue items) |
| Regular project | `docs/decisions/` (decision records) |
| Global ledger | Decisions, observations, learnings across `docs/` |

The model doesn't change the repo. It names what's already there.

-----

## What oddkit Needs to Connect

1. **Repo URL** — which GitHub repo to treat as root project. Already exists as `baseline_url`.
2. **GitHub token** — authentication with write permission. Required for `oddkit_write`.

That's it. oddkit doesn't need to discover project structure, enumerate governance projects, or build a project graph. It reads the repo. It writes files. Governance constraints are discovered through search, the way they already are today.

-----

## What This Does NOT Define

**Directory conventions** — E0005.1 removed these. Not reintroduced.

**Governance discovery mechanism** — oddkit already discovers constraints through search. No new mechanism needed until this breaks.

**Multi-tenancy** — Punted. One user, one or more repos.

**Sub-project scoping syntax** — How a sub-project declares its own ledger scope. Deferred until someone needs it.

**Permission modes** — Append-only ledger enforcement, read-only access for projections. GitHub Actions handles this when it hurts.

**Intermediate storage** — Write directly to GitHub. Buffer later if needed.

-----

## Derivation

- **D0001: Three-Tier Conceptual Hierarchy** — the litmus test that determines project roles. The KB model is D0001 applied to repositories instead of files.
- **D0016 / E0005.1** — structure-agnostic ODD; no prescribed directories
- **Scope Over Folders** — epistemic scope is an attribute, not a property of storage location
- **Meaning Must Not Depend on Path** — governance is declared, not inferred from where files live
- **Epistemic Ledger** — requires persistent storage; files in the root project are that storage
- **Progressive Disclosure** — the full model is invisible until needed; the entry point is zero-config

-----

## Next Steps

1. Commit this doc alongside D0017 and IMPL-oddkit-write
2. Update `odd/terminology.md` with KB, Project, and Governance role definitions
3. Build the write path targeting the root project
4. Governance discovery, sub-project scoping, permission enforcement — wait for pain
