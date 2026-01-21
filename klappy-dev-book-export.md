

================================================================================
# klappy.dev - Complete Book Export
================================================================================


Generated: 2026-01-21T20:24:19.950Z
Total Files: 152

This is a documentation export of all markdown files from the klappy.dev
repository. It includes lane guidance docs but excludes implementation
details (attempts, version folders, source code).


================================================================================
## Table of Contents
================================================================================

- **Root** (1 files)
- **About** (6 files)
- **Canon** (11 files)
- **Documentation** (55 files)
- **Infrastructure** (9 files)
- **Interfaces & Contracts** (6 files)
- **ODD (Outcomes-Driven Development)** (21 files)
- **Products** (32 files)
- **Projects** (6 files)
- **Visual Design System** (5 files)


================================================================================
## Root
================================================================================



--------------------------------------------------------------------------------
📄 File: README.md
--------------------------------------------------------------------------------

# 🧠 klappy.dev

This repository is a working surface for ideas, experiments, and reference documents about how software is designed and built in an AI-accelerated world.

It is intentionally **not** a framework, product, or SDK.  
It is a public record of thinking, constraints, and proofs of concept that evolve over time.

---

## What This Repository Is

- A portfolio of projects and proofs of concept
- A canon of design principles, constraints, and verification standards
- A place to work in the open, with assumptions and tradeoffs made explicit
- A reference for how I think about AI-assisted development, architecture, and long-lived systems

Much of the content here exists to reduce repeated reasoning and to make decision-making easier to inspect and challenge.

---

## What This Repository Is Not

- Not a step-by-step tutorial
- Not a prescriptive workflow
- Not a prompt collection
- Not a promise of stability or completeness

Most documents are orientation, not instruction. They describe how decisions are reasoned about, not rules that must be followed.

---

## If You Want to Explore

Start with **ODD** (Outcomes-Driven Development) — the core philosophy that shapes everything here.

If that resonates, the **Canon** contains the principles, constraints, and verification standards that guide decisions.

If you want to see the philosophy applied, browse the **Projects**.

There is no required order. Follow your curiosity.

- `/docs/WHAT_THIS_REPO_IS_NOT.md` — what this repository is intentionally not
- `/projects/agentic-memory-portability.md` — the memory portability project

---

## About the Canon

The Canon is a curated set of documents that capture:

- assumptions and constraints
- decision heuristics
- definitions of completion
- evidence and verification standards

The Canon exists for clarity, not control.  
It does not execute anything by itself and is intentionally separated from tooling or automation.

---

## Versioning & Change

The Canon uses pack-level versioning with a single changelog:

- `/public/content/manifest.json` — generated inventory of what exists (compiled from per-file frontmatter)
- `/canon/CHANGELOG.md` — record of changes

Individual files are not versioned independently to avoid unnecessary ceremony.

---

## License

All content in this repository is released under the [MIT License](LICENSE).  
Reuse is encouraged.

---

## Detailed Exploration Paths

If you're new and want a concrete path, here's a reasonable order:

1. **About** — context and trust surface

   - `/about/bio.md`
   - `/about/credibility.md`
   - `/about/faq.md`

2. **ODD (Outcomes-Driven Development)** — the core philosophy

   - `/odd/README.md` (public-facing)
   - `/odd/manifesto.md` (extended)

3. **Canon** — how decisions and verification are shaped

   - `/canon/index.md` (orientation)
   - Supporting documents on constraints, decision rules, evidence, and verification

4. **Projects** — proofs of concept and experiments (added over time)

---

## Web App (Phase 1)

This repository includes a static SPA for browsing content via a chat-first interface.

```bash
npm install
npm run dev
```

The app lives in `/src` and serves content from `/public/content/`.

**Note:** `/public/content/` contains copies of source content (`/canon`, `/odd`, `/about`, `/projects`) for the SPA to serve. The source folders remain the canonical authoring location; `/public/content/` is the rendered content root for the web app.

---

## Status

This repository is active and evolving.  
Some documents are stable; others are intentionally exploratory.  
Where possible, documents label their stability and confidence level.

Feedback, questions, and challenges are welcome.

---

This repository is about preserving intent without freezing execution.  
The goal is better outcomes, not perfect artifacts.



================================================================================
## About
================================================================================



--------------------------------------------------------------------------------
📄 File: about/README.md
--------------------------------------------------------------------------------

---
uri: klappy://about
title: "About"
audience: public
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["about", "author", "index"]
---

# About

> Author information, credibility signals, and site orientation.

## Description

The about folder contains public-facing content that introduces the author, explains the site's purpose, and provides orientation for visitors. These documents are user-facing (not implementation reference), answering "who made this?" and "why does it exist?" rather than "how does it work?"

## Outline

- Contents
- Relationship to Site
- Reading Order

---

## Contents

| File | Title | Summary |
|------|-------|---------|
| `bio.md` | Bio | Author background and interests |
| `credibility.md` | Credibility | Why the work here should be trusted |
| `faq.md` | FAQ | Common questions about the site |
| `home.md` | Home | Media asset declarations for the home page |
| `why-this-exists.md` | Why This Exists | The philosophy behind this project |

---

## Relationship to Site

These documents are served directly to visitors. They are not implementation docs or internal process notes.

| Document | Purpose |
|----------|---------|
| `/odd/` | Philosophy (what is always true) |
| `/canon/` | Constraints (what rules we share) |
| `/docs/` | Implementation (how we do it here) |
| `/about/` | **Orientation (who and why)** |

---

## Reading Order

1. **`why-this-exists.md`** — Start here for site philosophy
2. **`bio.md`** — Who built this
3. **`credibility.md`** — Why trust the approach
4. **`faq.md`** — Quick answers to common questions



--------------------------------------------------------------------------------
📄 File: about/bio.md
--------------------------------------------------------------------------------

---
uri: klappy://about/bio
title: "Bio"
audience: public
exposure: nav
tier: 1
voice: first_person
stability: semi_stable
tags: ["about", "bio"]
---

# 👤 Bio — Who I Am

I work at the intersection of software architecture, AI-assisted development, and long-term system sustainability.

Most of my work focuses on helping teams move from fragile, tool-specific solutions toward systems that are resilient, interoperable, and grounded in real outcomes rather than artifacts. I care less about how something is built and more about whether it can survive change, scale responsibly, and remain trustworthy over time.

My background includes building and advising software in complex, real-world contexts—often where connectivity is unreliable, users are diverse, timelines are long, and failure has real consequences. These constraints have shaped how I think about architecture, tooling, and the role of automation.

I’m particularly interested in how AI changes the shape of software creation: shifting the bottleneck from writing code to defining intent, verifying results, and curating among many possible outcomes. Much of my recent work explores how to design systems that make those shifts explicit instead of accidental.

This site is not a résumé. It's a working surface for ideas, experiments, and proofs of concept that reflect how I think and build.



--------------------------------------------------------------------------------
📄 File: about/credibility.md
--------------------------------------------------------------------------------

---
uri: klappy://about/credibility
title: "Credibility"
audience: public
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["about", "credibility", "trust"]
---

# 🏛️ Credibility — Why Trust My Work

Trust, in software, is rarely about credentials alone. It’s about whether ideas hold up when conditions are imperfect.

The approaches documented here are informed by:

- repeated exposure to long-lived systems
- work in environments where maintenance and handoff matter more than novelty
- experience with tools and workflows that must function offline, across cultures, and over many years

Rather than claiming correctness, this site emphasizes:

- explicit assumptions
- named failure modes
- evidence over explanation
- confidence scores instead of certainty

Many of the concepts here—such as Outcomes-Driven Development, canonical constraints, and visual verification—exist because simpler approaches failed under real pressure.

If something here is useful, it should be because it reduces confusion, improves outcomes, or makes systems easier to reason about. If it isn’t, it should be easy to challenge.

That's the standard this work is held to.



--------------------------------------------------------------------------------
📄 File: about/faq.md
--------------------------------------------------------------------------------

---
uri: klappy://about/faq
title: "FAQ"
audience: public
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["about", "faq"]
---

# ❓ FAQ — Frequently Asked Questions

## What is this site?

This is a portfolio and thinking space. It collects projects, writing, and reference documents that reflect how I approach software design, AI-assisted development, and system architecture.

## Is this a framework or product?

No. The ideas here are not a packaged framework or a tool you install. They are principles, patterns, and experiments that can inform how tools and systems are designed.

## Who is this for?

Primarily:

- engineers and architects working on complex or long-lived systems
- teams exploring AI-assisted development beyond prompt hacking
- people curious about how software design changes when generation becomes cheap

## Is everything here meant to be followed exactly?

No. Most documents are orientation, not instruction. They describe how decisions are reasoned about, not rules that must be obeyed.

## Why so much emphasis on evidence and verification?

Because explanations are cheap—especially with AI. Evidence creates shared reality and prevents misplaced confidence.

## Is this content stable?

Some parts are intentionally stable; others are evolving. Where possible, documents label their maturity and confidence level so readers can judge how much weight to give them.

## Can I reuse these ideas?

Yes. The intent is openness and reuse. Attribution is appreciated, but the bigger goal is to reduce repeated mistakes and encourage clearer thinking.

## Why do some ideas appear unfinished or revisited?

Because in non-deterministic systems, one outcome isn't enough to judge an idea. This work favors observing multiple attempts before drawing conclusions.



--------------------------------------------------------------------------------
📄 File: about/home.md
--------------------------------------------------------------------------------

---
uri: klappy://public/home
title: "Home"
audience: public
exposure: hidden
tier: 0
voice: neutral
stability: stable
tags: ["home", "orientation", "media"]
assets: {"hero_image":"/assets/home/hero-odd-diagram.png","orientation_map":"/assets/home/orientation-map-diagram.png","explainer_video":"/assets/home/outcomes-driven_development.mp4"}
---

# Home

This document exists to declare **home page media assets** as a learning layer.

The Home route (`/`) is implemented as a component (not markdown), but it should still discover media via the canonical manifest rather than scanning folders.



--------------------------------------------------------------------------------
📄 File: about/why-this-exists.md
--------------------------------------------------------------------------------

---
uri: klappy://about/why-this-exists
title: "Why This Exists"
audience: public
exposure: nav
tier: 0
voice: neutral
stability: semi_stable
tags: ["about", "philosophy", "overview"]
---

# 💡 Why This Exists

This site is not a product.
It is not a demo.
It is not a framework.

It is a record of thinking under uncertainty.

---

## The Problem

Modern software—especially AI-assisted software—produces outcomes that are:

- non-deterministic
- highly sensitive to execution paths
- difficult to evaluate after the fact

Most repos hide this reality.
They optimize for forward motion, not understanding.

---

## The Choice

This project makes a different tradeoff:

- clarity over velocity
- evidence over momentum
- restartability over polish

That requires discipline.

---

## Why So Much Process?

Because without it:

- failures look like bad ideas
- successes look repeatable when they aren't
- learning gets lost in filesystem noise

The structure you see exists to preserve *truth*, not control.

> **If the repository is dirty, conclusions drawn from it are invalid.**

---

## What You're Looking At

- PRDs are hypotheses
- Attempts are observations
- Evidence is first-class
- Production is explicit
- Cleanup is mandatory

Nothing here is accidental.

---

## The Core Idea

AI can generate code quickly.
But generated code is not the same as understood code.

This project exists to answer a question:

*What does it take to actually learn from AI-assisted development, rather than just produce with it?*

The answer, so far:

- Treat outcomes as experiments
- Capture evidence, not just artifacts
- Reset state between attempts
- Never trust a dirty repository

---

## Who This Is For

This is for:

- builders working with AI
- teams exploring uncertain design spaces
- people who care more about learning than shipping illusions

If that's not you, this may feel heavy.

That's okay.

---

## What This Is Not

This is not:

- a claim that this approach is the only way
- a judgment of faster, looser workflows
- a finished system

It is a working hypothesis about how to build carefully in an era of easy generation.

---

## Orientation

If you want to understand the philosophy:
→ Start with the [ODD Manifesto](/odd/manifesto.md)

If you want to see how it's applied:
→ Browse the [Attempts](/attempts/)

If you want to understand the rules:
→ Read the [Canon](/canon/)



================================================================================
## Documentation
================================================================================



--------------------------------------------------------------------------------
📄 File: docs/AGENT_ENTRYPOINT.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/agent-entrypoint
title: "Agent Entry Point"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["docs", "implementation", "agent", "entrypoint", "redirect"]
---

# 🧭 Agent Entry Point

**If you are an AI agent starting an attempt, go directly to:**

## `/docs/AGENT_KICKOFF.md`

That file is the canonical, copy-pasteable entry point for all agent attempts.

---

## For Orientation (Not Execution)

If you want to understand the system before acting:

1. `/docs/appendices/product-lanes.md` — multi-lane PRD architecture
2. `/canon/index.md` — Canon orientation, precedence, stability
3. `/odd/manifesto.md` — philosophy and intent
4. `/docs/ATTEMPTS.md` — attempt lifecycle orientation

---

## For Humans

Human workflow lives at `/docs/ATTEMPT_KICKOFF.md`.

---

## Quick Reference

| Lane | PRD Location |
|------|--------------|
| `website` | `/docs/PRD/website/PRD.md` |
| `ai-navigation` | `/docs/PRD/ai-navigation/PRD.md` |
| `agent-skill` | `/docs/PRD/agent-skill/PRD.md` |

**Every attempt MUST declare a lane before registration.**



--------------------------------------------------------------------------------
📄 File: docs/AGENT_KICKOFF.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/agent-kickoff
title: "Agent Kickoff"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["docs", "implementation", "agent", "kickoff", "entry-point"]
---

# 🤖 Agent Kickoff — Canonical Entry Point

**This file is the ONLY authorized entry point for agent attempts.**

Do not rely on external prompts. Do not synthesize from multiple documents.
Read this file. Follow it exactly.

---

## Step 0: Declare Your Lane and Epoch

You MUST know which lane and epoch you are working in before proceeding.

| Lane | PRD Location | Purpose |
|------|--------------|---------|
| `website` | `/docs/PRD/website/PRD.md` | Human-facing UI/UX |
| `ai-navigation` | `/docs/PRD/ai-navigation/PRD.md` | AI layer over documentation |
| `agent-skill` | `/docs/PRD/agent-skill/PRD.md` | Agent cognitive framework |

**Current Epoch:** `E0002-multi-lane-era`

Epoch determines whether your attempt's outcomes can be compared to prior attempts. If the evaluation rules changed (evidence requirements, provenance, deploy contracts), you are in a new epoch.

**If you do not know your lane, STOP and ask the human.**  
**If you are unsure whether the epoch has changed, STOP and ask the human.**

---

## Step 1: Read Required Documents (In Order)

1. `/docs/appendices/product-lanes.md` — understand the multi-lane model
2. `/docs/appendices/epochs.md` — understand when outcomes are comparable
3. Your lane's PRD (e.g., `/docs/PRD/ai-navigation/PRD.md`)
4. `/canon/constraints.md` — non-negotiables that shape all work

---

## Step 2: Register Your Attempt

```bash
npm run attempt:register -- --lane <LANE> --tool <TOOL> --agent <AGENT_ID> --model <MODEL>
```

Example:
```bash
npm run attempt:register -- --lane ai-navigation --tool cursor --agent a --model "claude-opus-4"
```

This creates `.attempt.json` with your run_id, lane, and provenance.

**Lane is REQUIRED. Attempts without a lane are invalid.**

**Epoch is REQUIRED.** Your `META.json` must include `epoch_id`. If missing, results cannot be compared to prior attempts.

---

## Step 3: Nuke and Start Fresh

```bash
npm run attempt:nuke -- --lane <LANE>
```

Example:
```bash
npm run attempt:nuke -- --lane website
```

This deletes `products/<lane>/src/` and lane-local framework configs. You start from a blank slate.

Choose any stack that satisfies the deploy contract (`/infra/contracts/build-output.md`).

Your implementation goes in `products/<lane>/src/`. Build output goes to `products/<lane>/dist/`.

See `/docs/appendices/lane-implementation-surfaces.md` for the locked folder contract.

---

## Step 4: Build Against Your Lane's PRD

Implement ONLY what your lane's PRD specifies.

- Do NOT modify Canon
- Do NOT touch other lanes
- Do NOT invent requirements not in the PRD

If the PRD is ambiguous, note the ambiguity in your ATTEMPT.md. Do not guess.

---

## Step 5: Write Evidence

Write to your runs directory (path is in `.attempt.json`):

```
products/<lane>/attempts/prd-vX.Y/_runs/<run_id>/
  ATTEMPT.md    — what you built, decisions made, self-audit
  EVIDENCE.md   — screenshot index, test results
  evidence/     — actual screenshots, logs
```

Evidence must prove the PRD success criteria are met.

Note: Attempts are lane-contained. Root `/attempts/**` is legacy.

---

## Step 6: Push

```bash
git add -A && git commit -m "Attempt: <lane> <description>"
git push
```

This triggers Cloudflare preview deploy.

---

## Invariants (Non-Negotiable)

1. **Lane declaration is mandatory** — no lane, no attempt
2. **Epoch declaration is mandatory** — no epoch, results are not comparable
3. **Canon is read-only** — do not modify `/canon/**`
4. **PRD is authoritative** — if it's not in the PRD, don't build it
5. **Evidence is required** — assertions without proof are invalid
6. **Conflicts require STOP** — if you detect conflicting instructions, stop and report

---

## If You Detect a Conflict

If ANY of the following are true, STOP immediately and report to the human:

- The PRD contradicts Canon constraints
- The lane is unclear or undeclared
- Required files are missing
- Previous attempt artifacts conflict with current instructions

Do NOT guess. Do NOT synthesize. Report the conflict.

---

## Quick Reference

| What | Where |
|------|-------|
| Lane architecture | `/docs/appendices/product-lanes.md` |
| Lane implementation surfaces | `/docs/appendices/lane-implementation-surfaces.md` |
| Epoch semantics | `/docs/appendices/epochs.md` |
| Constraints | `/canon/constraints.md` |
| Definition of Done | `/canon/definition-of-done.md` |
| Deploy contract | `/infra/contracts/build-output.md` |
| Attempt lifecycle | `/docs/ATTEMPTS.md` |
| Human workflow | `/docs/ATTEMPT_KICKOFF.md` |

---

## The Rule

If it's not in the repo, it doesn't exist.

This file IS the prompt. Follow it exactly.



--------------------------------------------------------------------------------
📄 File: docs/ATTEMPTS.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/attempts
title: "Attempt Lifecycle"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["docs", "implementation", "attempts", "lifecycle", "orientation"]
---

# 🧭 Attempt Lifecycle — Orientation

> **If the repository is dirty, conclusions drawn from it are invalid.**

This document explains the mental model behind attempts: what they are, why they exist, and how they fit together.

**For step-by-step procedures, see:** `/docs/ATTEMPT_KICKOFF.md`  
**For the agent entry point, see:** `/docs/AGENT_KICKOFF.md`

---

## 📌 Core Principles

1. **One active implementation per lane:** `products/<lane>/src/` is disposable; prior attempts are preserved by git history + sealed records.
2. **PRD lanes are independent:** Each product lane (website, ai-navigation, agent-skill) has its own PRD, attempts, and lifecycle. Lanes share canon, not lifecycle.
3. **PRD versions are first-class:** A PRD version can have multiple attempts.
4. **Provenance is truth:** `META.json` stores who made what (tool, agent, model) AND which lane, not branch names.
5. **Artifacts always merge:** Even failed attempts contribute learnings.
6. **Production is explicit:** Only the `prod` branch deploys to production.

> **Every attempt MUST declare a lane before registration. Attempts without a lane are invalid.**

See `/docs/appendices/product-lanes.md` for the multi-lane architecture.

---

## 🌿 Branch Roles

| Branch | Purpose | Can Be Nuked? |
|--------|---------|---------------|
| `prod` | Live production deployment | ❌ Never |
| `main` | Experiment aggregation + history + PRD truth | ⚠️ With care |
| Agent branches | Ephemeral workspaces (Cursor worktrees, etc.) | ✅ Always |

> **Branch names are convenience. Provenance lives in META.json.**

See `/docs/CLOUDFLARE_CONFIG.md` for deploy behavior.

---

## 🧠 What is an Attempt?

An **attempt** is a bounded effort to implement a specific PRD version. When an attempt is complete (or abandoned), it is **sealed**:

- No further work is done on that attempt
- Evidence is captured
- `META.json` records provenance + sealed commit SHA
- Artifacts merge to `main`

Multiple attempts against the same PRD version are expected (fail, retry with different approach).

### Attempt Origin Variations

Attempts may originate from different sources while targeting the same PRD:

- Different tools (Cursor, VS Code, CLI)
- Different AI models (opus-4.5, gpt-4o, claude-sonnet)
- Different approaches or architectures
- The same prompt interpreted differently

Parallel agent runs are treated as distinct attempts. Provenance tracking ensures they can be compared meaningfully.

See `/odd/appendices/quantum-development.md` for the orientation model behind this practice.

---

## 🧹 Fresh Start Requirement

**Attempts must start from a blank slate.**

`attempt:nuke --lane <lane>` deletes `products/<lane>/src/` and removes lane-local framework configs so the agent can choose any stack that satisfies the deploy contract.

This ensures:
- No inherited UI patterns
- No framework bias (React, Vue, Svelte — all valid)
- True independence between attempts
- No cross-lane contamination

See `/docs/appendices/lane-implementation-surfaces.md` for the locked folder contract.

---

## 🚀 How Attempts Work (Current Model)

### During an Attempt

1. **Each agent starts in its own workspace** (Cursor worktree, branch, etc.)
2. **Declare lane and register** (lane declaration is MANDATORY):
   ```bash
   npm run attempt:register -- --lane website --tool cursor --agent a --model "opus-4.5"
   npm run attempt:nuke -- --lane website
   ```
3. **Build from lane PRD** — implement against the lane's PRD (e.g., `/docs/PRD/website/PRD.md`)
4. **Write artifacts** to `products/<lane>/attempts/prd-vX.Y/_runs/<run_id>/`
5. **Push** — triggers Cloudflare preview

### After All Agents Finish

A human runs:
```bash
npm run attempt:finalize -- --prd vX.Y
```

This assigns `attempt-001`, `attempt-002`, etc. based on completion order.

### Collision Avoidance

Attempt numbers are assigned **after** work completes, not before.

`attempt:finalize` sorts completed runs and assigns attempt numbers deterministically. No registry, no race conditions.

---

## 📁 Folder Structure

```
/products/                      # lane implementation surfaces (self-contained)
  website/
    src/                        # website source (disposable)
    dist/                       # website build output (not committed)
    attempts/                   # website lane attempts (CANONICAL)
      prd-v1.0/
        PRD.md                  # frozen PRD for this version
        _runs/                  # in-progress runs (before finalize)
          <run_id>/
            META.json
            ATTEMPT.md
            EVIDENCE.md
            evidence/
        attempt-001/            # finalized attempts
          META.json             # canonical pointers + provenance + lane
          ATTEMPT.md
          EVIDENCE.md
          evidence/
        attempt-002/
          ...
  ai-navigation/
    src/                        # ai-navigation source (disposable)
    dist/                       # ai-navigation build output (not committed)
    attempts/                   # ai-navigation lane attempts
      prd-v1.0/
        ...
  agent-skill/
    src/                        # agent-skill source (disposable)
    dist/                       # agent-skill build output (not committed)
    attempts/                   # agent-skill lane attempts
      prd-v1.0/
        ...
/infra/scripts/                 # build scripts (persist across attempts)
/docs/PRD/                      # active PRDs organized by lane
  website/PRD.md                # website lane PRD
  ai-navigation/PRD.md          # ai-navigation lane PRD
  agent-skill/PRD.md            # agent-skill lane PRD
/attempts/                      # LEGACY (read-only, see /attempts/README.md)
/public/content/                # generated (by sync script)
```

## Attempt Location (Canonical)

All attempt artifacts are lane-contained:

```
/products/<lane>/attempts/prd-vX.Y/attempt-NNN/
```

**Notes:**
- Root `/attempts/**` is legacy and read-only
- Evidence for public verification is always served from the deployed build at: `/_evidence/`

**Locked folder structure:** `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`

Do NOT use:
- `/attempts/<lane>/prd-vX.Y/attempt-NNN/` (legacy)
- `/attempts/prd-vX.Y/<lane>/`
- `/products/<lane>/attempts/attempt-NNN/` (missing PRD version)

---

## 📎 META.json Schema

Each attempt contains a `META.json` with provenance, lane, and canonical pointers:

```json
{
  "lane": "website",
  "prd_version": "v1.0",
  "epoch_id": "E0002-multi-lane-era",
  "run_id": "a1b2c3d4",
  "attempt": "001",
  
  "tool": "cursor",
  "agent": "a",
  "model": "opus-4.5",
  
  "lane_root": "products/website",
  "dist_dir": "products/website/dist",
  
  "worktree_path": "/path/to/worktree",
  "branch": "run/website/v1.0/cursor/a/opus-45/a1b2c3d4",
  "git_head": "abc123...",
  
  "registered_at": "2026-01-16T10:00:00Z",
  "completed_at": "2026-01-16T12:00:00Z",
  "finalized_at": "2026-01-16T14:00:00Z",
  
  "status": "CLOSED",
  "preview_url": "https://run-website-v10-cursor-a-opus-45-a1b2c3d4.klappy-dev.pages.dev",
  "evidence_index": ["evidence/desktop.png", "evidence/mobile.png"]
}
```

**Lane field is REQUIRED.** Valid values: `website`, `ai-navigation`, `agent-skill`

**Epoch field is REQUIRED.** If `epoch_id` is missing, the attempt is not comparable to other attempts by default. See `/docs/appendices/epochs.md`.

**Key insight:** The commit SHA + provenance fields + lane + epoch are truth. Branch names and tags are convenience.

---

## 📦 Artifacts Always Merge

**Failed attempts still contribute learnings.**

| Output | Merge to main? |
|--------|----------------|
| Artifacts (attempt folder, evidence, PRD patches) | **Always** |
| Code (`products/<lane>/src`, components, etc.) | **Only if Champion** |

### Two Phases Per Attempt

1. **Artifacts merge** (always)
   - Seal attempt folder
   - Commit evidence and closure record
   - Merge to `main`

2. **Code promotion** (only if winner)
   - Champion's code merges to `main`
   - `prod` fast-forwards to `main`
   - Non-winners keep preview URLs but code stays on attempt branch

This ensures every attempt contributes to the knowledge base.

---

## 🔄 What Evolves vs. What is Frozen

| Category | Evolves? | Notes |
|----------|----------|-------|
| `/canon/**` | ✅ Yes | Living orientation docs (shared across lanes) |
| `/docs/PRD/<lane>/PRD.md` | ✅ Yes | Active PRD per lane |
| `/products/<lane>/attempts/prd-vX.Y/PRD.md` | ❌ No | Frozen snapshot |
| `/products/<lane>/attempts/*/attempt-NNN/*` | ❌ No | Sealed record + evidence |

**Note:** Each lane evolves independently. Changes to the website PRD do not affect agent-skill attempts.

---

## 💡 Why This Structure?

- **No filesystem sprawl:** One `products/<lane>/src/` per lane, not `/app-v1`, `/app-v2`, etc.
- **PRD-first:** Clear hierarchy of what was attempted
- **Retry-friendly:** Multiple attempts per PRD version is expected
- **Provenance is truth:** `META.json` ensures attempts are interpretable even if branch names drift
- **Self-contained:** Each attempt has everything needed to understand it

---

## 🔮 Resurrection

To resurrect any sealed attempt:

```bash
git checkout <sealed_commit>
npm install
npm run build
# Deploy to preview or production as needed
```

The attempt folder contains everything needed:
- Exact code state (via commit SHA)
- Evidence (screenshots, logs)
- Provenance (who/what made it)
- Deploy history (URLs where it ran)

---

## 📋 Current Policies

| Decision | Answer |
|----------|--------|
| Are preview deploys required for sealing? | Required for UI changes, optional for doc-only |
| Do we preserve attempt previews permanently? | No — we preserve links + evidence |
| Do failed attempts merge to main? | Artifacts yes, code no |
| How do parallel agents avoid collisions? | `finalize` assigns numbers after completion |
| Must lane src be reset between attempts? | Yes, via `attempt:nuke --lane <lane>` (blank slate) |
| What branch is production? | `prod` (never nuked, explicit promotion only) |

---

## 🛠️ Tooling Summary

| Command | Purpose |
|---------|---------|
| `npm run attempt:register -- --lane <lane> --tool <t> --agent <id> --model <m>` | Register run with lane + provenance |
| `npm run attempt:nuke -- --lane <lane>` | Blank slate — delete `products/<lane>/src` |
| `npm run attempt:submit` | Commit + push (triggers CF preview) |
| `npm run attempt:finalize -- --lane <lane> --prd vX.Y` | Assign attempt numbers for lane |
| `npm run attempt:promote -- --lane <lane> --prd vX.Y --attempt 001` | Promote lane champion to production |
| `npm run attempt:cleanup` | Prune stale worktrees and branches |

**Lane is required for register, nuke, finalize, and promote commands.**

---

## 🔗 Related Documents

- **Product Lanes Architecture: `/docs/appendices/product-lanes.md`** (READ FIRST)
- **Interface Contracts: `/interfaces/index.md`** (semver'd compatibility promises)
- **Lane Build Layout: `/docs/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- Step-by-step workflow: `/docs/ATTEMPT_KICKOFF.md`
- Agent entry point: `/docs/AGENT_KICKOFF.md`
- Deploy behavior: `/docs/CLOUDFLARE_CONFIG.md`
- Decision log: `/odd/decisions/`
- Quantum Development: `/odd/appendices/quantum-development.md`
- Repo Truth: `/docs/appendices/repo-truth.md`
- Drift Checks: `/docs/appendices/drift-checks.md`



--------------------------------------------------------------------------------
📄 File: docs/ATTEMPT_KICKOFF.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/attempt-kickoff
title: "Attempt Workflow (Human)"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["docs", "implementation", "attempts", "workflow", "human"]
---

# 🚀 Attempt Workflow (Human)

This document describes the **human workflow** for running attempts.

**For agents:** Go directly to `/docs/AGENT_KICKOFF.md` — that is the canonical agent entry point.

---

## Canonical Lane Kickoff Prompts

Agents do NOT use one-off prompts.

All attempts must start from the lane's canonical kickoff prompt:

- Website: `/infra/prompts/attempt-kickoff/website.md`
- AI Navigation: `/infra/prompts/attempt-kickoff/ai-navigation.md`
- Agent Skill: `/infra/prompts/attempt-kickoff/agent-skill.md`

Bootstrap (optional): `/infra/prompts/attempt-kickoff/BOOTSTRAP.md`

---

## E0003.1 Completion Rule (Evidence Discoverable)

An attempt is NOT complete unless its deployed build exposes **discoverable** evidence.

**Required URLs (must return HTTP 200):**

- `/_evidence/index.html` — human-browsable evidence index
- `/_evidence/index.json` — machine inventory
- `/_evidence/EVIDENCE.md` — summary + links

**Required proof assets:**

- At least **1 screenshot** in `/_evidence/screenshots/`
- AND at least **1 recording** in `/_evidence/recordings/` OR **3 screenshots total**

Markdown alone does not count as proof.

**Build enforcement:**

When `.attempt.json` exists:
- Build FAILS if evidence folder is missing
- Build FAILS if required documents are missing
- Build FAILS if proof assets are insufficient
- Build FAILS if index generation fails

**If `/_evidence/index.html` returns 404, the attempt is INVALID.**

See `/docs/decisions/D0014-e0003-evidence-first-era.md` for the epoch decision.

---

## ⚠️ Before Starting

1. **Identify which lane this attempt belongs to:**
   - `website` — human-facing UI/UX
   - `ai-navigation` — AI layer over documentation
   - `agent-skill` — agent cognitive framework
2. Checkout `main`
3. Ensure repository is clean:
   - `git status` shows nothing to commit
4. Commit all changes that define the experiment:
   - Lane PRD (e.g., `/docs/PRD/website/PRD.md`)
   - Contracts (`/infra/contracts/`)
   - Canon docs (if updated)
5. (Optional) Create worktrees if running parallel agents
6. (Optional) Run `npm run attempt:cleanup` to prune stale branches/worktrees

**Rule:**  
If it is not committed before Cursor starts, it does not exist.

**Rule:**  
Every attempt MUST declare a lane. Attempts without a lane are invalid.

**Rule:**  
Before registration, declare the current epoch. Epoch determines comparability of outcomes. If `epoch_id` is missing, results must not be compared to prior attempts.

See `/docs/appendices/product-lanes.md` for the multi-lane architecture.  
See `/docs/appendices/epochs.md` for epoch semantics.

---

## 🤖 Starting Agents

Point each agent at:

**`/docs/AGENT_KICKOFF.md`**

That file is the canonical, self-contained entry point. Do not paste external prompts.

The file contains all instructions agents need:
- Lane declaration
- Registration
- Nuke
- Build
- Evidence

---

## ✅ After All Agents Finish

On `main` branch:

```bash
# 1. Import artifact folders from all attempt branches for the lane
npm run attempt:import -- --lane <lane> --prd <active>
```

**Invariant:** This command **MUST NOT** merge application code (`products/<lane>/src`).  
Only sealed attempt artifacts (`_runs/` folders) are imported.

```bash
# 2. Finalize runs (assign attempt-001, 002…)
npm run attempt:finalize -- --lane <lane> --prd <active>

# 3. Review evidence + preview URLs in each attempt folder

# 4. Promote winner to production
npm run attempt:promote -- --lane <lane> --prd <active> --attempt 001
```

**Note:** `<lane>` is the product lane (e.g., `website`).  
**Note:** `<active>` is the PRD version from the lane's PRD (e.g., `v1.0`).

---

## 🛠️ CLI Reference

| Command | Purpose |
|---------|---------|
| `npm run attempt:nuke -- --lane <l>` | Blank slate — delete `products/<lane>/src`, lane configs |
| `npm run attempt:register -- --lane <l> --tool <t> --agent <id> --model <m>` | Register run with lane + provenance |
| `npm run attempt:submit` | Commit + push (triggers CF preview) |
| `npm run attempt:import -- --lane <l> --prd <v>` | Pull artifacts from branches to main |
| `npm run attempt:finalize -- --lane <l> --prd <v>` | Assign attempt numbers for lane |
| `npm run attempt:promote -- --lane <l> --prd <v> --attempt <n>` | Merge lane champion → main → prod |
| `npm run attempt:cleanup` | Prune stale worktrees and branches |

**Lane is required for register, import, finalize, and promote commands.**
Valid lanes: `website`, `ai-navigation`, `agent-skill`

---

## 📁 Artifact Locations

Attempt artifacts live at (lane-contained):

```
/products/<lane>/attempts/prd-vX.Y/attempt-NNN/
```

**During attempt:**
```
products/<lane>/attempts/prd-<version>/_runs/<run_id>/
```

**After finalize:**
```
products/<lane>/attempts/prd-<version>/attempt-001/
products/<lane>/attempts/prd-<version>/attempt-002/
```

**Locked folder structure:** `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`

**Note:** Root `/attempts/**` is legacy and read-only. See `/attempts/README.md`.

**Completion gates (E0003+):**
- Branch pushed to origin
- Cloudflare preview deployment is live
- HTTP 200 for:
  - `/`
  - `/_evidence/`
- `/_evidence/` includes:
  - index.html
  - index.json
  - ATTEMPT.md
  - EVIDENCE.md
  - META.json
  - proof assets (screenshots/recording per contract)

---

## 📜 Deploy Contract

See `/infra/contracts/build-output.md`

- Output must be `products/<lane>/dist/index.html`
- Must load `/public/content/manifest.json`
- Stack choice is unrestricted
- No client secrets

See `/docs/appendices/lane-implementation-surfaces.md` for the locked folder contract.

---

## 🔗 Cloudflare Previews

Any `git push` to an attempt branch creates a preview:

```
https://<branch-slug>.klappy-dev.pages.dev
```

Preview URLs are evidence artifacts, not permanent guarantees.

---

## 🚨 Online Evidence Requirement (Non-Negotiable)

**An attempt is INVALID unless it provides online evidence.**

Before an attempt can be marked complete, the agent MUST:

1. **Push the attempt branch to `origin`**
2. **Provide the Cloudflare Preview URL** for the branch
3. **Provide the online Evidence URL** (where EVIDENCE.md is viewable)

| Condition | Result |
|-----------|--------|
| Agent cannot push the branch | Attempt is **INVALID** |
| Cloudflare Preview URL missing | Attempt is **INVALID** |
| Evidence URL missing | Attempt is **INVALID** |
| "Works on my machine" only | Attempt is **INVALID** |

Local builds and previews are allowed during development, but they **do not satisfy** the Definition of Done.

See `/docs/appendices/online-evidence.md` for the full requirement.

---

## 🔑 Key Mental Model

| Principle | Meaning |
|-----------|---------|
| Humans define the experiment | PRD, contracts, canon are committed before agents start |
| Agents execute in isolation | Each agent has its own worktree/branch |
| Git commits define reality | Uncommitted work doesn't exist |
| Cleanup is epistemic, not cosmetic | Dirty repos invalidate conclusions |
| Promotion is the only path to prod | Champions merge to main, then fast-forward to prod |

---

## 🔗 Related Documents

- **Product Lanes Architecture: `/docs/appendices/product-lanes.md`** (READ FIRST)
- **Online Evidence Requirement: `/docs/appendices/online-evidence.md`** (no URL = invalid attempt)
- **Preview Guide: `/docs/PREVIEW.md`** (local + Cloudflare preview how-to)
- **Interface Contracts: `/interfaces/index.md`** (semver'd compatibility promises)
- **Lane Build Layout: `/docs/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- **Agent Entry Point: `/docs/AGENT_KICKOFF.md`** (canonical agent instructions)
- Attempt lifecycle (deep): `/docs/ATTEMPTS.md`
- Deploy contract: `/infra/contracts/build-output.md`
- Cloudflare config: `/docs/CLOUDFLARE_CONFIG.md`
- Decision log: `/docs/decisions/`
- Repo truth principle: `/docs/appendices/repo-truth.md`
- Drift Checks: `/docs/appendices/drift-checks.md`



--------------------------------------------------------------------------------
📄 File: docs/ATTEMPT_RECORD_PACK.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/attempt-record-pack
title: "Attempt Record Packs"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "attempts", "records", "evidence"]
---

# 📦 Attempt Record Packs

An attempt produces immutable evidence and metadata that MAY be merged
before a winner is chosen.

## SHA Model

Each attempt tracks:

- `attempt_head_sha`: build + evidence commit
- `record_pack_merge_sha`: merge of attempt records into main
- `champion_merge_sha`: merge of winning src (optional)

Auditability is preserved by never reusing SHAs.

## Evidence Location

Evidence is always exposed at:

```
/_evidence/
```

This URL must return HTTP 200 on any deployed build.

## Minimum Proof

- 1 video recording OR
- 3 screenshots

Markdown alone does not count.

## Merge Policy

Attempt records MAY be merged to main before a champion is selected.
This preserves auditability without blocking parallel work.

The winning attempt's source code is merged separately via `champion_merge_sha`.



--------------------------------------------------------------------------------
📄 File: docs/CLOUDFLARE_CONFIG.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/cloudflare-config
title: "Cloudflare Pages Configuration"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "cloudflare", "deploy", "configuration"]
---

# ☁️ Cloudflare Pages Configuration

This document describes how Cloudflare Pages should be configured for the klappy.dev repository.

**Scope:** Deploy behavior only. For attempt workflow mechanics, see `/docs/ATTEMPTS.md`.

---

## 🌿 Branch Roles

| Branch | Purpose | Deploy Target |
|--------|---------|---------------|
| `prod` | Live production deployment | **Production URL** (klappy.dev) |
| `main` | Experiment aggregation + history | Preview URL only |
| Any other branch | Agent workspaces, Cursor worktrees, experiments | Preview URLs |

**Note:** Cloudflare does not require specific branch naming. Any non-`prod` branch that builds successfully gets a preview URL.

---

## ⚠️ Critical Configuration

### Production Branch

**Set the production branch to `prod`, NOT `main`.**

In Cloudflare Pages → Settings → Builds & deployments:

```
Production branch: prod
```

This ensures:
- Only promoted, verified code goes to production
- `main` can be used for experimentation without risk
- Agents can never accidentally deploy to production

### Preview Deployments

**Enable preview deployments for ALL branches.**

In Cloudflare Pages → Settings → Builds & deployments:

```
Preview branches: All non-production branches
```

This ensures:
- Every agent branch gets a preview URL
- Cursor worktrees get preview URLs automatically
- Reviewers can compare multiple attempts side-by-side

---

## 🛠️ Build Configuration

Each lane is deployed as a separate Cloudflare Pages project.

```
Root directory:    .
Build command:     npm run build -- --lane <lane>
Build output:      products/<lane>/dist
```

For example, the `website` lane:
```
Root directory:    .
Build command:     npm run build -- --lane website
Build output:      products/website/dist
```

See `/docs/appendices/lane-implementation-surfaces.md` for the locked folder contract.

> **Legacy / Transitional note (pre-D0013):** Some existing deploy configurations may still publish repo-root `/dist/`. That output is no longer canonical; the canonical build output for lane deployments is `products/<lane>/dist/`.

---

## 📋 Expected Behavior

| Action | Result |
|--------|--------|
| Push to `prod` | Deploys to klappy.dev (production) |
| Push to `main` | Deploys to preview URL (main.klappy-dev.pages.dev) |
| Push to any other branch | Deploys to preview URL (`<branch-slug>.klappy-dev.pages.dev`) |
| `npm run attempt:promote` | Merges champion to `main`, fast-forwards `prod` → deploys to production |

### Promotion Semantics

1. **Artifacts merge first** — attempt evidence merges to `main` before promotion
2. **Champion code merges** — winning attempt's code merges to `main`
3. **`prod` fast-forwards** — `prod` fast-forwards to match `main`
4. **Cloudflare deploys** — `prod` push triggers production deployment

Only champion code reaches production. Losing attempts contribute artifacts but not code.

---

## ✅ Verification

After configuring, verify:

1. **Push to `prod`** → klappy.dev updates
2. **Push to `main`** → main.klappy-dev.pages.dev updates (NOT klappy.dev)
3. **Push to any agent branch** → preview URL generates

---

## 💡 Why This Matters

> **Production and experimentation must never share a mutable surface.**

This configuration ensures:
- Production is always stable
- Experiments are always disposable
- Nuclear resets on `main` never affect production
- Agents can work in parallel without coordination
- One winner ships; losers don't pollute production

---

## 📝 Note on Branch Naming

> **Branch names are optional convenience. Provenance lives in META.json.**

Cloudflare does not depend on specific branch naming conventions. Any branch that:
- Is not `prod`
- Produces a valid `products/<lane>/dist/` on build

Will get a preview URL.

The canonical record of "who made what" lives in `META.json`, not in the branch name.
This keeps the system antifragile — branch naming can drift without breaking provenance.

---

## 🔗 Related Documents

- Attempt workflow: `/docs/ATTEMPTS.md`
- Deploy contract: `/infra/contracts/build-output.md`
- **Interface Contracts: `/interfaces/index.md`** (semver'd compatibility promises)
- **Lane Build Layout: `/docs/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- Decision: `/docs/decisions/D0001-prod-branch-is-production.md`



--------------------------------------------------------------------------------
📄 File: docs/DISTILLATION_CLASSIFICATION.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/distillation-classification
title: "Canon Distillation Classification"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "distillation", "classification", "archive"]
---

# 📊 Canon Distillation Classification

**Status: COMPLETED (with corrections)**

This document tracks the classification of canon files for the progressive distillation effort.

## Summary of Work Completed

- Classified all 57 canon files as portable or implementation-specific
- Extracted 14 decisions to `/docs/decisions/`
- Extracted 17 appendices to `/docs/appendices/` (originally 18, 1 re-elevated)
- Added progressive distillation structure (Title, Subtitle, Description, Outline, Content) to all files
- Updated cross-references in key canon files
- **Moved ODD to root level**: `/canon/odd/` → `/odd/`
- **Re-elevated `progressive-elevation.md`** back to `/odd/appendices/` (it defines the portability ladder itself)

## Post-Distillation Corrections

| File | Original Classification | Corrected Classification | Reason |
|------|------------------------|-------------------------|--------|
| `progressive-elevation.md` | IMPLEMENTATION | **ODD** | Defines the five-layer portability model - that's universal methodology, not implementation |

## Classification Criteria

**PORTABLE** = Concepts that could apply to any ODD-following repo
- No hardcoded paths or tooling references
- Methodology/philosophy over procedure

**IMPLEMENTATION-SPECIFIC** = Contains this repo's specific implementation details
- Absolute paths (`/products/`, `/docs/PRD.md`, `/infra/`)
- CLI commands (`attempt:register`, `attempt:nuke`)
- Branch names (`prod`, `main`, `attempt/*`)
- Tool-specific config (Cloudflare Pages, git worktrees)
- Lane names (`website`, `ai-navigation`, `agent-skill`)

---

## Canon Root Files (6 files)

| File | Classification | Notes |
|------|---------------|-------|
| `constraints.md` | PORTABLE | Pure methodology |
| `decision-rules.md` | PORTABLE | Pure heuristics |
| `definition-of-done.md` | PORTABLE | Pure methodology |
| `self-audit.md` | PORTABLE | Pure methodology |
| `visual-proof.md` | PORTABLE | Pure methodology |
| `completion-report-template.md` | PORTABLE | Pure template |

---

## Canon ODD Root Files (7 files)

| File | Classification | Notes |
|------|---------------|-------|
| `manifesto.md` | PORTABLE | Pure philosophy |
| `contract.md` | IMPLEMENTATION | Epoch IDs, paths, META.json schema |
| `maturity.md` | PORTABLE | Pure methodology |
| `orientation-map.md` | PORTABLE | Pure mental model |
| `misuse-patterns.md` | PORTABLE | Pure failure modes |
| `prompt-architecture.md` | PORTABLE | Pure methodology |
| `README.md` | STAYS | Index file |

---

## Canon ODD Decisions (15 files)

**ALL DECISIONS → docs/decisions/**

| File | Classification | Notes |
|------|---------------|-------|
| `D0001-prod-branch-is-production.md` | IMPLEMENTATION | Branch names, CLI, Cloudflare |
| `D0002-attempt-provenance-required.md` | IMPLEMENTATION | CLI, META.json, paths |
| `D0003-prd-version-auto-detection.md` | IMPLEMENTATION | Specific paths, CLI |
| `D0004-repo-truth-cleanup-mandatory.md` | IMPLEMENTATION | CLI commands, paths |
| `D0005-nuke-safety-guards.md` | IMPLEMENTATION | CLI, branch names, paths |
| `D0006-dogfooding-requirement.md` | IMPLEMENTATION | klappy.dev specific |
| `D0007-branch-names-are-convenience.md` | IMPLEMENTATION | Cloudflare, META.json |
| `D0008-register-before-nuke.md` | IMPLEMENTATION | CLI commands |
| `D0009-multi-lane-prd-architecture.md` | IMPLEMENTATION | Specific lanes, paths |
| `D0010-canonical-agent-kickoff.md` | IMPLEMENTATION | Specific paths |
| `D0011-odd-contract-2.0.0.md` | IMPLEMENTATION | Epoch IDs, paths |
| `D0012-e0002-transition-interpretation.md` | IMPLEMENTATION | Epoch transitions |
| `D0013-build-output-lane-scoped-dist.md` | IMPLEMENTATION | Specific paths |
| `D0014-e0003-evidence-first-era.md` | IMPLEMENTATION | Cloudflare, evidence URLs |
| `README.md` | STAYS | Index file (will update) |

---

## Canon ODD Appendices (25 files)

| File | Classification | Notes |
|------|---------------|-------|
| `alignment-reviews.md` | PORTABLE | Pure methodology |
| `attempt-lifecycle.md` | IMPLEMENTATION | CLI, paths, META.json |
| `canonical-compression.md` | IMPLEMENTATION | Specific paths |
| `compilation.md` | IMPLEMENTATION | Paths, npm commands |
| `compilation-targets.md` | IMPLEMENTATION | Specific paths |
| `compiled-memory.md` | IMPLEMENTATION | Paths, lanes |
| `deploy-evidence.md` | IMPLEMENTATION | Cloudflare, paths |
| `drift-checks.md` | IMPLEMENTATION | npm commands, contracts |
| `epochs.md` | IMPLEMENTATION | E0003 section is very implementation-specific |
| `evidence.md` | IMPLEMENTATION | Specific path structure |
| `evolution-not-automation.md` | PORTABLE | Pure philosophy |
| `failure-driven-modularity.md` | PORTABLE | Pure methodology |
| `lane-build-layout.md` | IMPLEMENTATION | Cloudflare, lanes |
| `lane-implementation-surfaces.md` | IMPLEMENTATION | Cloudflare, lanes |
| `media-as-learning-layer.md` | PORTABLE | Pure principles |
| `memory-architecture.proposed.md` | IMPLEMENTATION | Folder patterns |
| `online-evidence.md` | IMPLEMENTATION | Cloudflare, paths |
| `product-lanes.md` | IMPLEMENTATION | Specific lanes, paths |
| `progressive-elevation.md` | **ELEVATED TO ODD** | Defines the portability ladder - paths are examples, principle is universal |
| `quantum-development.md` | PORTABLE | Pure methodology |
| `repo-topology.md` | IMPLEMENTATION | All paths |
| `repo-truth.md` | IMPLEMENTATION | CLI, branch names |
| `repo-truth-audit.md` | IMPLEMENTATION | Specific files to read |
| `visual-evolution.md` | PORTABLE | Pure methodology |
| `README.md` | STAYS | Index file (will update) |

---

## Summary

- **PORTABLE (Stay in Canon):** ~18 files
- **IMPLEMENTATION-SPECIFIC (Move to docs/):** ~32 files (14 decisions + 18 appendices)
- **Index files (Stay, update references):** ~4 files

## Extraction Order

1. Move all 14 decisions to `docs/decisions/`
2. Move 18 appendices to `docs/appendices/`
3. Update README indexes in both locations
4. Add progressive distillation structure to all files



--------------------------------------------------------------------------------
📄 File: docs/PRD.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/prd
title: "PRD Index"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "prd", "index"]
---

# PRD Index

> Product Requirements Documents organized by lane.

## Description

PRDs define the requirements for each product lane. Each lane has its own PRD with independent versioning and attempt lifecycle. This index routes to the active PRDs.

## Outline

- Active PRDs
- Template
- Legacy PRDs

---

## Active PRDs

| Lane | PRD | Version | Status |
|------|-----|---------|--------|
| website | [PRD.md](PRD/website/PRD.md) | v1.2 | Active |
| ai-navigation | [PRD.md](PRD/ai-navigation/PRD.md) | — | Draft |

---

## Template

New PRDs should follow [PRD_TEMPLATE.md](PRD/PRD_TEMPLATE.md).

---

## Legacy PRDs

| Lane | File | Notes |
|------|------|-------|
| website | [PRD-legacy-v0.3.md](PRD/website/PRD-legacy-v0.3.md) | Superseded by v1.2 |

---

## See Also

- [Product Lanes](/docs/appendices/product-lanes.md) — Lane architecture
- [Attempt Lifecycle](/docs/appendices/attempt-lifecycle.md) — How attempts work



--------------------------------------------------------------------------------
📄 File: docs/PRD/PRD_TEMPLATE.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/prd/template
title: "PRD Template"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "prd", "template"]
---

# 📋 PRD Template

> Standard template for Product Requirements Documents.

## Description

This template defines the standard structure for PRDs. Each product lane has one active PRD at a time. PRDs define success criteria, constraints, and definition of done for attempts. Use this template when creating or revising a lane's PRD.

## Outline

- PRD Identity
- Objective and Success Criteria
- Non-Goals
- Background and Approach
- Phases
- Definition of Done
- Constraints, Risks, Notes
- Attempt Policy

---

Use this template when drafting or revising the active PRD.

Policy: There is exactly one active PRD at any time: `/docs/PRD.md`.
Prior PRDs only exist as frozen artifacts within sealed attempts.

---

## PRD Identity

| Field | Value |
|-------|-------|
| **PRD Version** | vX.Y |
| **Status** | Draft / Active / Superseded |
| **Created** | YYYY-MM-DD |
| **Author** | |
| **Preview Deploy Required** | Yes / No (phase-dependent) |

---

## Objective

_What outcome does this PRD target? One sentence._

---

## Success Criteria

_What must be true for this PRD to be considered successful?_

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## Non-Goals (Anti-Scope)

_What is explicitly NOT part of this PRD?_

- Not: X
- Not: Y
- Not: Z

---

## Background

_Why does this PRD exist? What problem does it solve?_

---

## Approach

_High-level description of how the objective will be achieved._

---

## Phases (if applicable)

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| Phase 1 | | |
| Phase 2 | | |

---

## Definition of Done

_What evidence is required to close an attempt against this PRD?_

- [ ] 
- [ ] 
- [ ] 

---

## Constraints

_What constraints shape this work?_

---

## Risks

_What could go wrong?_

---

## Notes

_Additional context, references, or considerations._

---

## Attempt Policy

**This PRD may be attempted multiple times.**

- Do not extend a failed attempt; start a new attempt folder
- Each attempt is evaluated independently against this PRD
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

See: `/docs/appendices/attempt-lifecycle.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD/ai-navigation/PRD.md
--------------------------------------------------------------------------------

# PRD: AI Navigation Interface

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.0             |
| **Lane**        | ai-navigation    |
| **Status**      | Active           |
| **Created**     | 2026-01-17       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- build-output >=3.0.0 <4.0.0
- attempt-cli >=2.0.0 <3.0.0

If MCP is used, it is currently draft (`mcp@0.1.x`) and MUST be treated as unstable.

---

## Objective

Enable humans to ask questions of the ODD corpus and be:

- Answered accurately
- Guided progressively
- Linked to the right documents
- Without reading everything

---

## Background

This is an AI layer over the documentation.

It helps humans understand ODD through conversation.

This is NOT agent tooling.
This is NOT teaching agents to execute ODD.
This is AI helping humans navigate and understand.

---

## Core Capability

- Load all site content + Medium articles into retrievable context
- Answer questions conversationally
- Navigate users to relevant docs
- Respect progressive disclosure tiers

---

## In Scope

- RAG over markdown content
- Citation + linking to canon/docs
- Progressive depth control ("go deeper", "show sources")
- Conversational Q&A interface
- Eventually voice (explicitly deferred to future version)

---

## Explicitly Out of Scope

- Teaching agents how to execute ODD (belongs to agent-skill lane)
- Modifying the canon
- Running attempts
- Enforcing process
- Website UI/UX concerns (belongs to website lane)

---

## Success Criteria

- [ ] User can ask "What is ODD?" and get a correct summary + links
- [ ] Follow-up questions narrow scope instead of expanding noise
- [ ] Responses always cite source docs
- [ ] No hallucinated concepts outside corpus
- [ ] Progressive disclosure respected (Tier 0 answers don't dump Tier 2 content)

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] RAG retrieval working over canon + docs
- [ ] Test questions answered correctly with citations
- [ ] Hallucination check passed (no invented concepts)
- [ ] Progressive depth demonstrated (follow-up narrows, doesn't explode)
- [ ] Self-audit completed with explicit tradeoffs

---

## Primary User

Humans trying to understand and evaluate ODD.

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- AI as accelerator, not authority
- Grounding required (no unmoored responses)
- Maintainability over cleverness

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `/attempts/ai-navigation/prd-v1.0/attempt-NNN/`

---

## Related Documents

- Lane architecture: `/docs/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD/website/PRD-legacy-v0.3.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/prd/website/legacy-v0.3
title: "Website PRD (Legacy v0.3)"
audience: docs
exposure: hidden
tier: 2
voice: neutral
stability: deprecated
status: deprecated
superseded_by: PRD.md
tags: ["docs", "prd", "website", "legacy", "deprecated"]
---

# PRD Identity (LEGACY)

> **DEPRECATED:** This PRD has been superseded by [PRD.md](PRD.md) (v1.2).
> This file is preserved for historical reference only.

| Field                       | Value       |
| --------------------------- | ----------- |
| **PRD Version**             | v0.3        |
| **Status**                  | Deprecated  |
| **Created**                 | 2026-01-16  |
| **Author**                  | Chris Klapp |
| **Preview Deploy Required** | Yes         |
| **Superseded By**           | PRD.md (v1.2) |

---

## Objective

Make klappy.dev feel like a usable 2026 portfolio experience (not just a functional proof) by adding shareable deep links, real LLM integration, mobile-responsive navigation, and verified Cloudflare Pages branch deploys.

---

## Background

PRD v0.1 proved Phase 1 mechanics (manifest-driven content, three-pane UI, deterministic action primitives) across multiple independent attempts.

However, attempt records explicitly left critical user-facing gaps unproven or unimplemented:

- Deep linking / shareable state (not implemented)
- Real LLM integration (mock provider only)
- Cloudflare Pages deploy verification (not tested)

In parallel, live-site UX feedback shows the UI is currently experienced as a barrier:

- No navigational deep links (resource or section)
- Navigation density causes visual fatigue
- Mobile usability is effectively broken
- Visual polish does not match 2026 portfolio expectations (should be modern, legible, and worthy of the content)

This PRD exists to convert those gaps into explicit, testable requirements.

---

## Success Criteria

- [ ] **Deep links work**: the URL can represent the current resource and optional section anchor; copying the URL + reloading restores the same state.
- [ ] **Section linkability is real**: major headings are anchorable and can be navigated to reliably (no collisions).
- [ ] **Navigation is usable**: sidebar is no longer a wall of items; hierarchy is visible and progressive disclosure exists.
- [ ] **Mobile is supported**: navigation and chat are usable on phones and tablets (portrait/landscape) without obscuring reading.
- [ ] **Real LLM integration works**: chat uses a real model (default: GPT-4o-mini unless a smaller GPT-5 tier is available) via a Worker-compatible endpoint; no client-side secrets.
- [ ] **Cloudflare Pages branch deploys are verified**: preview deploys exist for branches, and an attempt can record a working preview URL as evidence.
- [ ] **Evidence bundle closes the loop**: build + verification + screenshots (desktop + mobile) are produced and indexed per attempt.

---

## Non-Goals (Anti-Scope)

- Not: SSR, Next.js migration, or multi-page routing.
- Not: Authentication, user accounts, or multi-user chat history.
- Not: Perfect SEO parity with a multi-page docs site (deep links + sane metadata only).
- Not: Full MCP export (may remain future phase).
- Not: A “portfolio template” or heavy visual animation system.

---

## Approach

This is a UI/UX + integration upgrade that preserves the v0.1 content model:

- Canonical content remains static and local (synced to `/public/content/`)
- Manifest remains the authoritative inventory surface
- The UI becomes linkable and responsive
- The chat becomes real (LLM-backed) while remaining constrained and evidence-oriented

---

## Requirements

### 1) Navigation & Linkability

**1.1 URL contract**

The application MUST encode navigable state into the URL such that it is shareable and reload-safe.

- URL MUST represent:
  - resource (by `uri`, not by title)
  - optional section anchor (heading id)
- URL SHOULD be human-legible (query + hash), but correctness is primary.

Recommended contract (example):

- `/?r=klappy://canon/constraints#offline-first-default`

**1.2 Restore on load**

On initial load and on browser navigation (back/forward), the app MUST:

- Open the resource referenced by `r` if present
- Scroll to and briefly highlight the section referenced by the hash if present

**1.2.1 Round-trip integrity**

A deep link is considered valid only if:

- Loading the URL opens the same resource and section
- Navigating away and using browser back/forward restores the same state
- Invalid or unknown resources degrade gracefully (default entrypoint + no crash)
- Invalid anchors do not break reading or navigation

**1.3 Anchor stability**

- Heading anchors MUST be URL-safe and stable.
- Duplicate headings within a document MUST produce unique anchors (e.g., `heading`, `heading-2`, ...).

**1.4 UI affordance**

- Headings SHOULD expose a “copy link” affordance (hover on desktop, tap-accessible on mobile).

---

### 2) Information Architecture (reduce cognitive load)

**2.1 Progressive disclosure**

- Navigation MUST provide collapsible groupings (at minimum by top-level category).
- Default view MUST not render as an unbounded wall of items on first load.

**2.2 Orientation-first defaults**

- Navigation SHOULD prioritize the most important entrypoints for first-time visitors (e.g., public ODD + Canon index + projects index).
- Navigation SHOULD support “recently opened” resources (local-only).

**2.3 Active state clarity**

- Current resource MUST be visually distinct.
- When a section anchor is active, the reading pane MUST communicate it (scroll + highlight).

**2.4 Cognitive load constraint**

On first load, the navigation MUST expose no more than one screen-height of primary options without interaction.

Additional content MUST be revealed progressively (collapse, expand, filter, or context).

**2.5 Progressive Disclosure Model**

Goal: Prevent overwhelm by default. Reveal complexity only after user intent.

Disclosure tiers:

- **Tier 0 (Immediate Orientation)**: Minimal, calming entry. One obvious next step. No decisions required.
- **Tier 1 (Tell Me More)**: Core principles + curated entrypoints. Hints that deeper structure exists.
- **Tier 2 (Machinery)**: Full canon, appendices, attempts, CLI/process, lifecycle mechanics.

Tier assignments are encoded in the manifest via the `tier` field.

**2.6 Repo Disclosure Requirements**

Progressive disclosure applies to documentation, not just UI:

- `README.md` MUST be a narrative scroll (no folder trees, no path dumps up front).
- `README.md` MUST NOT enumerate all subfolders or file paths in the first screen.
- `canon/index.md` MUST present a "Start here / Go deeper / Edge cases" structure without enumerating all files.
- Tier 2 content (appendices, lifecycle, confidence scores) MUST appear only after explicit scroll or navigation.

**2.7 Manifest Contract: Tier Field**

Each resource in `manifest.json` MUST include a `tier` field:

- `tier`: 0, 1, or 2

Tier assignment rules:

- **Tier 0**: Public entrypoints (ODD public, Why This Exists, Projects Index)
- **Tier 1**: Core canon (Canon Index, Constraints, Definition of Done, Bio, Credibility)
- **Tier 2**: Everything else (appendices, templates, internal docs, changelogs)

The manifest is the authoritative source for tier assignments. UI and agents MUST respect these tiers.

**2.8 Site Disclosure Requirements**

- Sidebar MUST NOT render the full manifest as a wall by default.
- Sidebar MUST show Tier 0 + Tier 1 resources first.
- Tier 2 resources MUST require explicit expansion ("Show more", "Expand", or equivalent affordance).
- Default view MUST expose no more than 7 nav items without scrolling (desktop).
- On mobile, navigation MUST NOT exceed a single-column view on first load.

**2.9 Progressive Disclosure Acceptance Criteria**

An attempt satisfies progressive disclosure requirements if:

- [ ] First load shows ≤ 7 nav items visible without scrolling (desktop).
- [ ] First load shows single-column navigation (mobile).
- [ ] A visitor can reach any Tier 2 resource in ≤ 2 intentional actions.
- [ ] No information is deleted; only the default revelation order changes.
- [ ] `README.md` contains no folder paths in its first 3 sections.
- [ ] `canon/index.md` does not enumerate all files in its first screen.

These criteria are testable via visual inspection and interaction audit.

---

### 3) Responsive Layout (mobile and tablet)

**3.1 Supported devices**

The site MUST work on:

- phones
- tablets
- desktops
- portrait and landscape orientations

**3.2 Small-screen navigation**

On small screens, navigation MUST be usable without consuming the entire viewport:

- Sidebar MUST be collapsible (drawer / overlay)
- Chat MUST be accessible without permanently obscuring reading (sheet / tab switch / split depending on breakpoint)

**3.3 No horizontal scrolling**

- The UI MUST avoid horizontal scroll in primary reading flows on mobile.

**3.4 Reading-first invariant**

On mobile:

- Reading content MUST always have a clear, unobstructed path
- Chat and navigation MAY overlay or drawer-in, but MUST not permanently obscure reading
- At least one mode must prioritize uninterrupted reading

---

### 4) Visual Design (2026 polish, “quantum development vibe”)

**4.1 Design goals**

The UI MUST feel modern and intentional while remaining non-distracting:

- clean typography and spacing
- clear hierarchy
- intentional color system with accessible contrast
- subtle interaction feedback (active states, transitions)

**4.2 “Quantum development vibe” (interpretation)**

The UI SHOULD communicate:

- exploration
- clarity under uncertainty
- progressive disclosure

This should be achieved through layout, hierarchy, and feedback—not through heavy animation.

The “quantum development vibe” SHOULD be conveyed through:

- progressive disclosure
- reversible actions
- visible state changes tied to intent

Not through heavy animation, novelty UI, or visual noise.

---

### 5) Real LLM Integration

**5.1 Model**

- Default model: GPT-4o-mini
- If a smaller GPT-5 tier exists and is appropriate, it MAY replace GPT-4o-mini.

**5.2 Security**

- API keys MUST NOT be shipped to the client.
- LLM calls MUST be made through a Worker-compatible API surface (Cloudflare Worker / Pages Functions).

**5.3 Retrieval grounding**

- The model MUST be grounded in local canonical content.
- The implementation MUST define what content is sent to the model (scope limits are required).

**5.4 Failure behavior**

- If the model call fails, the UI MUST remain usable (reading + navigation still function).

---

### 6) Cloudflare Pages Deployment (branch deploys)

**6.1 Preview deploys**

- Branch deploy previews MUST be enabled and verified.
- The workflow MUST support capturing a preview URL per attempt as evidence.

**6.2 Production deploy**

- Production deploys from the `prod` branch (fast-forwarded from `main` after champion promotion).
- Champion code lives on `main`; `prod` is the deploy target.

**6.3 Infrastructure artifact (when deploy behavior is in scope)**

When deploy behavior is in scope for an attempt, the attempt MUST include an infrastructure note describing how branch previews, evidence capture, and rollback are expected to work.

Canonical location: `/docs/infra/cloudflare-branch-deploys.md`

---

## Phases

| Phase   | Scope                                               | Deliverable                                                                   |
| ------- | --------------------------------------------------- | ----------------------------------------------------------------------------- |
| Phase 1 | Deep links + URL state contract + anchor stability  | Shareable resource + section URLs that round-trip on reload                   |
| Phase 2 | Responsive navigation + IA hierarchy                | Collapsible nav + mobile-friendly layout that preserves reading + chat access |
| Phase 3 | Real LLM integration via Worker-compatible endpoint | Chat backed by real model, grounded in canon, no client secrets               |
| Phase 4 | Cloudflare branch deploy verification               | Preview URLs captured as evidence, repeatable deploy story                    |
| Phase 5 | Visual polish pass                                  | Typography/spacing/hierarchy refresh consistent with goals                    |

---

## Definition of Done (for attempts against this PRD)

- [ ] Build output produced (`npm run build`) and output captured in evidence.
- [ ] Verification performed and recorded (at minimum: deep link round-trip, mobile layout verification, LLM call success/failure behavior).
- [ ] Visual proof captured:
  - desktop layout screenshot(s)
  - mobile layout screenshot(s) (phone width)
  - at least one deep-link screenshot showing URL + correct section state
- [ ] If Cloudflare branch preview is in scope for the attempt: preview URL captured in attempt `META.json`.
- [ ] If deploy behavior is in scope: the infrastructure artifact exists and is referenced (`/docs/infra/cloudflare-branch-deploys.md`).
- [ ] Self-audit completed with explicit tradeoffs and remaining gaps.

---

## Constraints

This PRD is shaped by Canon constraints and decision rules, especially:

- Evidence over assertion
- AI as accelerator, not authority
- Maintainability over cleverness
- Explicit tradeoffs
- UX should carry the explanation (reduce text compensation)

---

## Risks

- **Scope creep**: “make it look modern” becomes unbounded without measurable criteria.
- **Over-navigation**: adding hierarchy/search can reintroduce complexity without reducing cognitive load.
- **LLM grounding drift**: model responses become unmoored without strict retrieval and scoping.
- **Mobile regressions**: responsive behavior can break reading if overlays are not carefully constrained.

---

## Notes

- PRD v0.1 proved mechanics; v0.2 targeted linkability, usability, and credible polish; v0.3 adds explicit progressive disclosure requirements (Tier model, manifest contract, repo/site disclosure).
- Attempts should be bounded: if a phase fails, start a new attempt rather than extending a drifting implementation.

---

## Attempt Policy

**This PRD may be attempted multiple times.**

- For UX-heavy requirements, multiple independent attempts may be required before judging the PRD itself.
- Do not extend a failed attempt; start a new attempt folder.
- Each attempt is evaluated independently against this PRD.
- Failed attempts inform future attempts or PRD revisions.
- Attempts are sealed when CLOSED or ABANDONED.

Independence enforcement:

- Do not “promote” an attempt folder into `/src/` as a substitute for sealing.
- Attempts are sealed records; `/src/` remains disposable and may be rebuilt between attempts.

See: `/docs/appendices/attempt-lifecycle.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD/website/PRD.md
--------------------------------------------------------------------------------

# PRD: Public Website

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.1             |
| **Lane**        | website          |
| **Status**      | Active           |
| **Created**     | 2026-01-17       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- build-output >=3.0.0 <4.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Visual Interfaces

This product MUST remain compatible with:

- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
- spacing >=1.0.0 <2.0.0

This product does NOT define colors, fonts, or spacing directly.
It consumes visual interfaces.

See `/odd/appendices/visual-evolution.md` for the visual evolution model.

---

## Objective

Create a public website that allows humans to:

- Understand what ODD is
- Explore it progressively without overwhelm
- Verify credibility
- Navigate to deeper material intentionally

---

## Background

This is the human-facing orientation surface for ODD.

It is portfolio, explanation, credibility layer.

It does NOT teach agents how to think.
It does NOT execute ODD.
It explains ODD progressively to humans.

---

## In Scope

- Progressive disclosure UX
- Canon browsing
- Essays / articles (including Medium content)
- Clear entry points ("Start here", "Go deeper")
- Mobile usability
- Visual calm
- Deep links / shareable URLs

---

## Explicitly Out of Scope

- AI chat (belongs to ai-navigation lane)
- Agent execution (belongs to agent-skill lane)
- Process enforcement
- MCP servers
- "How to run ODD" instructions for agents

---

## Success Criteria

- [ ] First load shows no more than 7 navigational items
- [ ] Mobile usable without horizontal scrolling
- [ ] Canon discoverable without file paths exposed
- [ ] No agent instructions present in UI
- [ ] No CLI/process language exposed to visitors
- [ ] Deep links work (URL represents resource + section)
- [ ] Progressive disclosure tiers respected (Tier 0/1/2)

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] Build output produced (`npm run build -- --lane website`)
- [ ] Visual proof captured (desktop + mobile screenshots)
- [ ] First load shows ≤7 nav items (verified via screenshot)
- [ ] Mobile layout verified (no horizontal scroll)
- [ ] Deep link round-trip tested
- [ ] Self-audit completed with explicit tradeoffs
- [ ] **Cloudflare Preview URL provided** (branch must be pushed)
- [ ] **Evidence URL provided** (viewable online without local code)

---

## Online Evidence (Required)

A website lane attempt is **not complete** unless:

1. The attempt branch is pushed to `origin`.
2. Cloudflare Pages generates a Preview Deployment URL for that branch.
3. The attempt includes an Evidence URL viewable online without running code locally.

Local preview instructions are allowed during development, but they **do not satisfy attempt completion**.

If an agent cannot provide both URLs, the attempt is **INVALID**.

See `/docs/appendices/online-evidence.md` for the full requirement.

---

## Primary User

Human developers, peers, evaluators exploring ODD.

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- UX should carry the explanation (reduce text compensation)
- Maintainability over cleverness
- Progressive disclosure required

---

## Media (Learning Layer)

This lane follows: `/odd/appendices/media-as-learning-layer.md`

Media is:
- optional (progressive disclosure)
- non-blocking (site must work with media collapsed)
- never autoplayed
- attached to stable pages only

### Initial Assets (Phase 0)

**Home (`/`)**
- Hero diagram (image): `/assets/home/hero-odd-diagram.png`
- Orientation map (image): `/assets/home/orientation-map-diagram.png`
- ODD explainer (video): `/assets/home/outcomes-driven_development.mp4`

**ODD (`/odd/...`)**
- ODD in practice (video): `/assets/odd/odd-in-practice.mp4`
- ODD is not a framework (image): `/assets/odd/odd-is-not-a-framework.png`
- Why evidence beats confidence (audio): `/assets/odd/why-evidence-beats-confidence.m4a`

### Requirements

- The default experience must not require media consumption to understand the page.
- Media must be user-initiated (explicit Watch/Listen/View affordances).
- No autoplay video or audio.
- Media must not add to the primary navigation item count.

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `/attempts/website/prd-v1.0/attempt-NNN/`

---

## Compiled Pack (Phase 0)

The website lane MUST support generating a wipeable "visitor pack" used for progressive disclosure and AI-friendly context.

### Command
- `npm run lane:compile -- --lane website --pack visitor`

### Output
- `public/_compiled/website/visitor-pack.md`
- `public/_compiled/website/_meta/COMPILE_META.json`

### Verification
- `npm run verify:compiled -- --lane website --pack visitor`

### Contract
- The compiled pack MUST include a provenance header as defined in:
  - `klappy://docs/appendices/compilation`

---

## Related Documents

- Lane architecture: `/docs/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/docs/appendices/compilation.md`
- Media philosophy: `/odd/appendices/media-as-learning-layer.md`



--------------------------------------------------------------------------------
📄 File: docs/PREVIEW.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/preview
title: "Previewing Lanes and Attempts"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "implementation", "preview", "cloudflare", "local"]
---

# 👁️ Previewing Lanes and Attempts

> **Scope:** Local + Cloudflare preview workflows for lanes and attempts.

## Local Preview (Any Lane)

Build the lane:

```bash
npm run build -- --lane <lane>
```

Preview the built output:

```bash
npx wrangler pages dev products/<lane>/dist --port 8788
```

Open: http://localhost:8788

---

## Cloudflare Pages Preview

Each lane is deployed as its own Cloudflare Pages project.

**Build configuration (REQUIRED):**

| Setting | Value |
|---------|-------|
| Build command | `npm run build -- --lane <lane>` |
| Output directory | `products/<lane>/dist` |
| Root directory | `.` (repo root) |

**Examples:**

| Lane | Build Command | Output Directory |
|------|--------------|------------------|
| `website` | `npm run build -- --lane website` | `products/website/dist` |
| `ai-navigation` | `npm run build -- --lane ai-navigation` | `products/ai-navigation/dist` |
| `agent-skill` | `npm run build -- --lane agent-skill` | `products/agent-skill/dist` |

---

## Troubleshooting

### Wrong lane building

If a Cloudflare Pages build log shows the wrong lane (e.g., `Lane: ai-navigation` when you expected `website`):

1. **Check the build command** — Must explicitly pass `--lane <lane>`
2. **Check the output directory** — Must match `products/<lane>/dist`
3. **Verify smart-build.js** — Should NOT use `vite --root` flag

### Build succeeds but site shows wrong content

1. Verify the output directory in Cloudflare Pages settings
2. Check that `products/<lane>/dist/index.html` exists after build
3. Ensure `products/<lane>/index.html` exists as the Vite entry point

### Local preview differs from Cloudflare

1. Clear local dist: `rm -rf products/<lane>/dist`
2. Rebuild: `npm run build -- --lane <lane>`
3. Use wrangler for local preview (matches Cloudflare environment)

---

## Preview URLs

### Branch previews (automatic)

Any `git push` to an attempt/run branch creates a preview:

```
https://<branch-slug>.klappy-dev.pages.dev
```

Branch names are slugified (slashes become dashes).

Example:
- Branch: `run/website/prd-v1.0/cursor/a/claude-opus-4/e2c41bb5`
- Preview: `https://run-website-prd-v1-0-cursor-a-claude-opus-4-e2c41bb5.klappy-dev.pages.dev`

### Production

Production deploys from the `prod` branch to the primary domain.

---

## Related Documents

- Build contract: `/infra/contracts/build-output.md`
- Lane architecture: `/docs/appendices/product-lanes.md`
- Cloudflare config: `/docs/CLOUDFLARE_CONFIG.md`



--------------------------------------------------------------------------------
📄 File: docs/README.md
--------------------------------------------------------------------------------

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

> How klappy.dev implements ODD. This is the reference implementation, not the philosophy.

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



--------------------------------------------------------------------------------
📄 File: docs/TEMPLATE.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/template
title: "Article Template"
audience: docs
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["template", "article"]
---

# Article Template

> Standard template for documentation articles with progressive disclosure.

## Description

This template defines the standard structure for documentation articles. All documents should follow this progressive disclosure pattern to enable different compilation depths for context packs.

## Outline

- Frontmatter Fields
- Document Structure
- Example

---

## Frontmatter Fields

```yaml
---
uri: klappy://<tier>/<path>/<name>    # Stable identifier
title: "Human-Readable Title"          # Display name
audience: docs | canon | public        # Who reads this
exposure: nav | hidden                 # Appears in navigation?
tier: 0 | 1 | 2                        # Progressive disclosure tier
voice: neutral | authoritative         # Tone
stability: stable | evolving | deprecated
tags: ["tag1", "tag2"]
---
```

### Field Reference

| Field | Required | Values | Purpose |
|-------|----------|--------|---------|
| `uri` | Yes | `klappy://path/name` | Stable linking identifier |
| `title` | Yes | String | Human-readable title |
| `audience` | Yes | `public`, `docs`, `canon` | Target reader |
| `exposure` | Yes | `nav`, `hidden` | Show in navigation? |
| `tier` | Yes | `0`, `1`, `2` | Disclosure tier |
| `voice` | No | `neutral`, `authoritative` | Tone (default: neutral) |
| `stability` | Yes | `stable`, `evolving`, `deprecated` | Change frequency |
| `tags` | No | Array | Categorization |

### Audience Values

| Value | Meaning | Example Folder |
|-------|---------|----------------|
| `public` | User-facing content | `/about/` |
| `docs` | Implementation reference | `/docs/` |
| `canon` | Shared constraints | `/canon/`, `/odd/` |

### Tier Values

| Tier | Meaning | Visibility |
|------|---------|------------|
| `0` | Immediate orientation | Always visible |
| `1` | Core content | Visible by default |
| `2` | Detailed/edge cases | Requires expansion |

---

## Document Structure

```markdown
---
uri: klappy://<path>/<name>
title: "Title"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["tag1"]
---

# Title

> One-line subtitle explaining what this document is about.

## Description

1-2 paragraph compressed overview. Should be self-contained enough that
an LLM can understand the gist without reading further.

## Outline

- Section 1
- Section 2
- Section 3

---

## Section 1

[Content...]

---

## Section 2

[Content...]

---

## See Also

- [Related Doc](/path/to/doc.md) — Brief description
```

---

## Disclosure Levels

| Level | Includes | Use Case | ~Tokens |
|-------|----------|----------|---------|
| L0 | Frontmatter + H1 | File listing | ~50 |
| L1 | + blockquote subtitle | Quick orientation | ~100 |
| L2 | + Description | LLM context | ~200-500 |
| L3 | + Outline | Navigation aid | ~300-700 |
| L4 | Full document | Complete context | Full |

---

## Example

```markdown
---
uri: klappy://docs/appendices/example
title: "Example Appendix"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "example"]
---

# Example Appendix

> Demonstrates the standard article structure.

## Description

This example shows how to structure a documentation article using
progressive disclosure. The Description section provides a compressed
overview that can stand alone in context-constrained situations.

## Outline

- Background
- Implementation
- Consequences

---

## Background

[Why this exists...]

---

## Implementation

[How it works...]

---

## Consequences

[What results from this...]

---

## See Also

- [Article Template](/docs/TEMPLATE.md)
```



--------------------------------------------------------------------------------
📄 File: docs/TEMPLATE_README.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/template-readme
title: "README Index Template"
audience: docs
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["template", "readme", "index"]
---

# README Index Template

> Template for folder README.md files that serve as scannable indexes.

## Description

Every navigable folder should have a README.md that serves as a scannable index. This enables agents to understand folder contents (~500 tokens) without reading every file (~20K+ tokens). The README-as-index pattern supports tree-shaking in context packs.

## Outline

- When to Use This Template
- Frontmatter by Folder Type
- Template Structure
- Contents Table Format

---

## When to Use This Template

Create a README index when:

- A folder contains 3+ files
- The folder is navigable (not internal/generated)
- Agents or humans need to discover what's in the folder

Do NOT create a README index for:

- Generated/derived folders (`public/_compiled/`, `dist/`)
- Single-file folders (promote the file to parent instead)
- Internal tooling folders (`.git/`, `node_modules/`)

---

## Frontmatter by Folder Type

### Public-facing folders (`/about/`)

```yaml
---
uri: klappy://about
title: "About"
audience: public
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["about", "index"]
---
```

### Implementation docs (`/docs/`, `/infra/`)

```yaml
---
uri: klappy://docs/appendices
title: "Appendices"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "appendices", "index"]
---
```

### Canon/ODD folders (`/canon/`, `/odd/`)

```yaml
---
uri: klappy://canon
title: "Canon"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "index"]
---
```

### Product lanes (`/products/<lane>/`)

```yaml
---
uri: klappy://products/website
title: "Website Lane"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["products", "website", "lane", "index"]
---
```

---

## Template Structure

```markdown
---
uri: klappy://<path>
title: "Folder Name"
audience: docs | canon | public
exposure: nav
tier: 1 | 2
voice: neutral
stability: stable | evolving
tags: ["folder", "index"]
---

# Folder Name

> One-line description of what this folder contains.

## Description

1-2 paragraph overview of the folder's purpose. What kind of content
lives here? Who is the intended audience? How does this folder relate
to the broader structure?

## Outline

- Contents
- [Optional: How to Use]
- [Optional: Relationship to X]
- See Also

---

## Contents

| File | Purpose |
|------|---------|
| `file1.md` | Brief description |
| `file2.md` | Brief description |
| `subfolder/` | Brief description |

---

## [Optional Section]

[Additional context if needed...]

---

## See Also

- [Related Folder](/path/to/folder/) — Brief description
- [Related Doc](/path/to/doc.md) — Brief description
```

---

## Contents Table Format

### For files

```markdown
| File | Purpose |
|------|---------|
| `ATTEMPTS.md` | Attempt lifecycle and CLI commands |
| `TRUTH_MAP.md` | Authoritative source for each domain |
```

### For files with titles

```markdown
| File | Title | Summary |
|------|-------|---------|
| `bio.md` | Bio | Author background |
| `faq.md` | FAQ | Common questions |
```

### For subfolders

```markdown
| Folder | Purpose | Count |
|--------|---------|-------|
| `appendices/` | Implementation appendices | 17 files |
| `decisions/` | Decision records | 14 files |
```

### For decisions (with status)

```markdown
| ID | Title | Status |
|----|-------|--------|
| D0001 | prod Branch Is Production | Active |
| D0002 | Attempt Provenance Required | Active |
```

---

## See Also

- [Docs Index](./README.md) — Example implementation docs index
- [About Index](/about/README.md) — Example public-facing index
- [Article Template](./TEMPLATE.md) — For non-index documents



--------------------------------------------------------------------------------
📄 File: docs/TRUTH_MAP.md
--------------------------------------------------------------------------------

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
| **Deploy workflow** | `/docs/CLOUDFLARE_CONFIG.md` | Branch roles, promotion, Cloudflare setup |
| **Attempt workflow** | `/docs/ATTEMPTS.md` | Lifecycle, META schema, finalization |
| **Agent kickoff** | `/docs/AGENT_KICKOFF.md` | Canonical agent entry point |
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



--------------------------------------------------------------------------------
📄 File: docs/WHAT_THIS_REPO_IS_NOT.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/what-this-repo-is-not
title: "What This Repo Is Not"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "scope", "boundaries", "philosophy"]
---

# 🚫 What This Repo Is Not

This repository is intentionally not optimized for "everything in one place."

It is optimized for **portability of thinking** without creating documentation sprawl.

## This Is Not a Knowledge Base of Everything

If a detail is not durable, it should not be immortalized.

Most artifacts decay by design:
- branches die,
- attempts seal evidence then stop,
- PRDs churn,
- and only proven patterns elevate.

See: `/odd/appendices/progressive-elevation.md`

## This Is Not a Framework You Must Adopt

ODD is not a prescriptive methodology.

It is a set of lenses and constraints for keeping outcomes and evidence reliable in an environment where generation is abundant and confidence is cheap.

## This Is Not a Promise of Stability Everywhere

Some parts are intentionally unstable:

- Attempts are ephemeral
- PRDs evolve rapidly
- Tooling may lag during epoch transitions

What is stable:
- Canon (curated)
- Interface contracts (semver)
- Decision logs (traceability)

## This Is Not "Documentation Completeness"

Completeness is a trap.

The goal is:
- minimal orientation for humans,
- and reliable navigation for agents,
without drowning either in uncurated files.

If it feels "unfinished," that may be intentional:
unfinished is often more honest than prematurely sealed truth.

## This Is Not Code-Centric

The primary artifact is not the codebase.

The durable artifact is:
- intent,
- constraints,
- decisions,
- and evidence.

Code is allowed to be disposable when regeneration is cheaper than understanding.



--------------------------------------------------------------------------------
📄 File: docs/agent-architecture/sub-agents.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/agent-architecture/sub-agents
title: "Sub-Agents"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["agents", "tools", "mcp", "implementation"]
---

# Sub-Agents

> How klappy.dev applies cognitive partitioning to tool-heavy agent systems.

## Description

In klappy.dev, adding tools or MCP servers directly to a single "main" agent can
increase decision paralysis and degrade reliability.

Sub-agents are used to isolate tool usage behind narrowly scoped reasoning
contexts that already know how to use a specific tool correctly.

This document is the reference implementation layer: concrete guidance for this
repo, not a universal principle.

## Outline

- When to introduce a sub-agent
- Tools vs sub-agents (the pairing rule)
- Scope contract (what a sub-agent is allowed to do)
- Outputs and promotion
- Common failure modes

---

## When to Introduce a Sub-Agent

Introduce a sub-agent when:
- a tool is powerful but brittle
- tool choice dominates reasoning time
- repeated misuse happens despite prompt constraints
- the "main" agent succeeds in isolation but fails during integration

---

## Tools vs Sub-Agents (Pairing Rule)

Tools increase capability.
Sub-agents reduce choice.

**Rule of thumb:**
If adding a tool increases decision complexity more than it reduces execution cost,
pair it with a specialist sub-agent that uses that tool and emits bounded outputs.

This is "Unix philosophy," but applied to agents: small specialists with explicit
inputs/outputs.

---

## Scope Contract

A sub-agent:
- owns one responsibility (one tool or one narrow workflow)
- returns explicit outputs (no hidden state assumptions)
- does not expand its own scope without evidence

---

## Outputs and Promotion

Sub-agent outputs should be:
- explicit (named, structured, and quotable)
- promotable (eligible to become decisions/patterns later)
- attributable (easy to trace back to the run/attempt)

---

## Common Failure Modes

- Premature sub-agents (created before real pressure exists)
- Sub-agents accreting responsibilities ("just one more thing")
- Treating sub-agents as personas instead of constraints
- Adding tools without narrowing decision surfaces

---

## See Also

- [Cognitive Partitioning](/odd/cognitive-partitioning.md) — Universal concept
- [Tool Specialization](/canon/odd/appendices/tool-specialization.md) — General pattern



--------------------------------------------------------------------------------
📄 File: docs/appendices/README.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices
title: "Implementation Appendices"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "appendices", "implementation", "reference", "index"]
---

# 📚 Implementation Appendices

Implementation-specific appendices that document how klappy.dev applies ODD concepts. These are reference implementation details, not portable methodology.

> **Relationship to ODD:** Portable concepts live in `/odd/appendices/`. This folder contains the klappy.dev-specific implementation of those concepts.

---

## 📁 Contents

### Attempt & Evidence

| File | Title | Summary |
|------|-------|---------|
| `attempt-lifecycle.md` | Attempt Lifecycle | How PRD versions, attempts, evidence, and deployments are preserved. Includes CLI commands and folder structure. |
| `evidence.md` | Evidence | Evidence requirements including `/_evidence/` path structure and `.attempt.json` schema. |
| `deploy-evidence.md` | Deploy Evidence | Why evidence must be in the build output. Cloudflare Pages serving requirements. |
| `online-evidence.md` | Online Evidence Requirement | Attempts are invalid without online preview URLs via Cloudflare Pages. |

### Compilation & Memory

| File | Title | Summary |
|------|-------|---------|
| `compilation.md` | Compilation | The process of producing derived packs. Includes `/public/_compiled/<lane>/` paths and npm commands. |
| `compiled-memory.md` | Compiled Memory | Lane-scoped, wipeable, auditable compressed artifacts with specific output paths. |
| `compilation-targets.md` | Compilation Targets | How compiled packs make the corpus usable with specific plan file paths. |
| `canonical-compression.md` | Canonical Compression | How derived, minimal working models are produced with `_compiled/` output locations. |
| `memory-architecture.proposed.md` | Memory Architecture | Memory as layered percolation with specific folder patterns. |
| `progressive-elevation.md` | Progressive Elevation & Decay | Five layers of portability with specific klappy.dev paths. |

### Repository Structure

| File | Title | Summary |
|------|-------|---------|
| `repo-topology.md` | Repository Topology | What lives where and what changes when. Complete folder structure. |
| `repo-truth.md` | Repository Truth | `attempt:cleanup` command and branch roles (`prod`, `main`, `attempt/*`). |
| `repo-truth-audit.md` | Repo Truth Audit | Specific files to read for epistemic audit. |
| `drift-checks.md` | Drift Checks | `npm run verify:contracts` and drift prevention with specific contracts. |

### Product Lanes

| File | Title | Summary |
|------|-------|---------|
| `product-lanes.md` | Product Lanes | The three lanes (website, ai-navigation, agent-skill) and their structure. |
| `lane-build-layout.md` | Lane Build Layout | How lanes avoid `/src` and `/dist` collisions with Cloudflare. |
| `lane-implementation-surfaces.md` | Lane-Scoped Implementation Surfaces | Each lane owns `products/<lane>/src` and `products/<lane>/dist`. |
| `epochs.md` | Epochs | Named periods including E0003 evidence requirements with Cloudflare specifics. |

---

## 🔧 What Makes These Implementation-Specific

These appendices contain:

- Absolute paths specific to this repository (`/products/`, `/docs/PRD.md`, `/infra/`)
- Specific CLI commands (`attempt:register`, `attempt:nuke`, `npm run verify:contracts`)
- Branch names specific to this workflow (`prod`, `main`, `attempt/*`)
- Tool-specific configuration (Cloudflare Pages, git worktrees)
- Lane names specific to klappy.dev (`website`, `ai-navigation`, `agent-skill`)

---

## 🧭 When to Read What

**Setting up a new lane?** Start with `product-lanes.md` and `lane-implementation-surfaces.md`.

**Understanding attempt workflow?** Read `attempt-lifecycle.md` and `evidence.md`.

**Building compilation packs?** Read `compilation.md`, `compiled-memory.md`, and `compilation-targets.md`.

**Debugging drift?** Read `drift-checks.md`, `repo-truth.md`, and `repo-truth-audit.md`.

---

## 🔗 Relationship to ODD Appendices

| ODD Appendix | Implementation Appendix | Relationship |
|--------------|------------------------|--------------|
| `/odd/appendices/evolution-not-automation.md` | `attempt-lifecycle.md` | Philosophy → Procedure |
| `/odd/appendices/failure-driven-modularity.md` | `product-lanes.md` | Concept → Structure |
| `/odd/appendices/quantum-development.md` | `attempt-lifecycle.md` | Theory → Practice |
| `/odd/appendices/alignment-reviews.md` | `repo-truth-audit.md` | What to review → How to audit |



--------------------------------------------------------------------------------
📄 File: docs/appendices/attempt-lifecycle.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/attempt-lifecycle
title: "Attempt Lifecycle"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "attempt", "lifecycle", "restartability"]
---

# Attempt Lifecycle

> How work is iterated without steering failed attempts.

## Description

This appendix defines the klappy.dev attempt lifecycle: how PRD versions, attempts, evidence, and deployments are preserved. Core principles: attempts are disposable, infrastructure persists, content accumulates, deployments are views not truth. PRDs define what to build; attempts are bounded executions. Attempts exist to test PRDs, not evolve them. The system uses register → nuke for blank slate independence, artifacts always merge (even from failed attempts), and champion selection promotes exactly one attempt to production. The three planes of change are Application (disposable), Content/Canon (persistent), and Infrastructure (slow-changing).

## Outline

- Why This Appendix Exists
- Core Principles
- PRD Version vs Attempt
- PRD as the Unit of Test
- Independence: Goal vs Infrastructure
- Worktrees and Learnings
- Canonical Places (paths)
- Learnings Payload
- Artifacts Always Merge
- What an Attempt Is / Is Not
- The Three Planes of Change
- Canonical Structure (folder layout)
- Collision Avoidance
- Blank Slate Requirement (Register → Nuke)
- Attempt Lifecycle (High Level)
- Sealing an Attempt
- Champion Selection and Promotion
- Restartability as a Feature

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** How work is iterated without steering failed attempts

---

## Why This Appendix Exists

Outcomes-Driven Development (ODD) assumes that clarity improves faster than execution in an AI-accelerated environment.

As clarity improves, attempts that were once reasonable often become misaligned.

This appendix exists to make stopping, restarting, and rebuilding a normal, explicit part of the system rather than an emotional or ad-hoc decision.

---

## Core Principles

1. **Attempts are disposable.**
2. **Infrastructure persists.**
3. **Content accumulates.**
4. **Deployments are views, not truth.**

Restarting is not a failure of execution.  
Restarting is evidence that intent has sharpened.

Branch and preview deployments exist to observe behavior. The canonical record is the sealed attempt + commit SHA, not the deployment URL.

---

## PRD Version vs Attempt

A **PRD version** defines what should be built.  
An **attempt** is a bounded execution of that PRD.

**Key distinction:**
- A PRD version can have multiple attempts
- Attempts exist to test the PRD, not to evolve it
- If the PRD is wrong, create a new PRD version
- If the implementation fails, create a new attempt against the same PRD

This separation prevents "Phase 1.1" scope creep disguised as iteration.

See [Quantum Development](./quantum-development.md) for the rationale behind multiple attempts.

For the single canonical kickoff prompt used to start any new attempt, see: `/docs/ATTEMPT_KICKOFF.md`.

---

## PRD as the Unit of Test

In ODD, a PRD is treated as the primary test unit.

Issues and failures are mapped back to PRD improvements, and attempts are used to validate PRDs as hypotheses.

This reduces ticket sprawl by keeping the system legible: one PRD version, multiple observable attempts, sealed evidence.

---

## Independence: Goal vs. Infrastructure

Independence is the goal (epistemic).

Infrastructure is an enabler, not a guarantee.

An attempt is independent if:
- decisions are not steered by prior outcomes,
- implementation state is fresh,
- and the approach represents a genuine re-instantiation of the PRD.

Branches and preview deployments can support independence by reducing accidental state leakage and enabling parallel observation, but they do not define independence.

---

## Worktrees and Learnings

**Worktrees are disposable sandboxes. Learnings live in the main repo.**

When using git worktrees for parallel attempts:
- Each worktree is isolated code state
- Learnings are repo state, not worktree state
- Learnings must land in one canonical place that every attempt can write to

You do not try to "share memory" between worktree agents. You publish outputs.

### Canonical Places (Single Source of Truth)

These paths live in the main repo (not inside a worktree only):

- `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/**` — sealed record + evidence (lane-contained)
- `/docs/PRD/<lane>/PRD.md` — living PRD per lane
- `/docs/learnings/prd-vX.Y.md` — (optional) rolling "what we learned" log

Anything in those paths is real. Anything else is temporary.

Note: Root `/attempts/**` is legacy (read-only). All new attempts are lane-contained.

### Learnings Payload (Required)

At the end of each attempt, the agent must produce:

1. `products/<lane>/attempts/prd-vX.Y/attempt-NNN/ATTEMPT.md` — closure record
2. `products/<lane>/attempts/prd-vX.Y/attempt-NNN/META.json` — commit SHA, preview URL, status
3. `products/<lane>/attempts/prd-vX.Y/attempt-NNN/evidence/*` — screenshots, logs
4. PRD patch (if learnings exist): updates to `/docs/PRD/<lane>/PRD.md` in a dedicated section:
   - "Observed failure modes"
   - "Clarifications / constraints added"
   - "New DoD checks"

The PRD patch is how learning persists across attempts.

---

## Artifacts Always Merge

**Failed attempts still contribute learnings.**

Attempts produce two types of outputs:
- **Code changes** — the implementation
- **Artifacts** — attempt folder, evidence, PRD patches

The merge rule:

| Output | Merge to main? |
|--------|----------------|
| Artifacts (attempt folder, evidence, PRD patches) | **Always** |
| Code (src/, components, etc.) | **Only if Champion** |

This prevents "we lost the learning because the attempt failed."

### Two Merges Per Attempt

1. **Artifacts merge** (always happens)
   - Seal the attempt folder
   - Commit evidence and closure record
   - Apply any PRD patches
   - Merge to `main`

2. **Code promotion** (only if winner)
   - Champion's code merges to `main`
   - Non-winners keep their preview URLs but code stays on attempt branch

This separation ensures every attempt contributes to the knowledge base, regardless of whether its code ships.

---

## What an Attempt Is

An Attempt is a bounded execution of a specific Product Requirements Document (PRD).

An attempt:
- has a single PRD version
- has a defined scope
- produces an outcome artifact
- is evaluated against its own Definition of Done
- is explicitly closed (CLOSED or ABANDONED)

An attempt does not:
- evolve indefinitely
- absorb new scope reactively
- serve as the foundation for all future work

---

## What an Attempt Is Not

An attempt is not:
- a phase in a linear roadmap
- a commitment to incremental improvement
- a promise of continuity

Attempts are experiments with intent, not investments to be amortized.

---

## The Three Planes of Change

ODD separates work across three independent planes:

### 1. Application Plane (Behavior)

What the system does:
- UI structure
- interaction patterns
- navigation model
- rendering logic

This plane is **attempt-scoped and disposable**.

### 2. Content / Canon Plane (Knowledge)

What the system knows:
- Canon documents
- ODD Manifesto
- Projects
- Writings, notes, transcripts

This plane is **persistent and cumulative**.

Content may evolve independently of any attempt.

### 3. Infrastructure Plane (Capability)

What makes building cheap:
- deployment setup
- build tooling
- sync/verify scripts
- schemas and formats

This plane **changes slowly and intentionally**.

---

## Canonical Structure

Attempts are **lane-contained**. All attempt artifacts live under the product lane:

```
products/<lane>/attempts/
  prd-vX.Y/
    PRD.md                    # frozen PRD for this version
    _runs/<run_id>/           # working directory (before finalization)
    attempt-001/              # finalized attempts
      ATTEMPT.md              # closure record
      META.json               # canonical pointers (provenance is truth)
      EVIDENCE.md             # evidence index
      evidence/               # screenshots, logs, etc.
    attempt-002/              # retry (if needed)
```

Note: Root `/attempts/**` is legacy (read-only). See `/attempts/README.md`.

**META.json** contains:
- `tool` — which tool was used (Cursor, Claude, etc.)
- `agent_id` — agent identifier
- `model` — model used (e.g., "claude-opus-4-5-20250514")
- `run_id` — unique run identifier
- `branch` — branch name (convenience, not truth)
- `prd_version` — PRD version being tested
- `sealed_commit` — the commit SHA (truth)
- `git_tag` — convenience pointer (optional)
- `status` — CLOSED, ABANDONED, or CHAMPION
- `deploy` — recorded URLs (production, preview) as evidence artifacts

The concrete sealing procedure is documented in `/docs/ATTEMPTS.md`.

---

## Collision Avoidance (Current Model)

Parallel agents don't reserve numbers upfront. Instead:

1. **Register** — Each agent runs `attempt:register` to capture provenance (creates `run-<run_id>/`)
2. **Build** — Agent works in isolation
3. **Finalize** — `attempt:finalize` sorts runs by completion time and assigns `attempt-001`, `attempt-002`, etc.

This prevents collisions because numbers are assigned deterministically at completion, not reserved upfront.

> **Deprecated:** The `ATTEMPT_REGISTRY.json` / `attempt:reserve` model is no longer used.

---

## Blank Slate Requirement

**Attempts must start from a clean slate to be independent.**

### The Problem

If attempt-002 branches from attempt-001's code, it's not independent. The agent will see existing patterns and converge on similar solutions.

### The Solution: Register → Nuke

The required sequence is:

1. **`attempt:register --lane <lane>`** — Captures provenance (who, with what model, from where)
2. **`attempt:nuke --lane <lane>`** — Deletes lane src and framework configs (guarantees blank slate)
3. **Only then** does implementation begin

This preserves forensic traceability (we know who showed up) while guaranteeing experimental independence (no inherited code).

### What Gets Nuked (Lane-Scoped)

- `products/<lane>/src/` — lane application code
- `products/<lane>/vite.config.js`, `products/<lane>/tailwind.config.js`, etc. — lane framework configs

> **Note:** Root-level `/src/` no longer exists. All app code is lane-scoped.

### What Survives

- `/infra/` — deployment scripts, contracts
- `/canon/`, `/about/`, `/projects/` — content
- `/docs/` — process documentation
- `/products/<lane>/attempts/` — sealed evidence (lane-contained)
- `/attempts/` — legacy sealed evidence (read-only)
- `package.json` — dependency manifest
- Other lanes (`products/<other-lane>/src/`) — only the target lane is nuked

> **Decision:** See [D0008: Register Before Nuke](/docs/decisions/D0008-register-before-nuke.md)

---

## Attempt Lifecycle (High Level)

1. **Intent Articulation**
   - A PRD is written for a specific outcome
   - Scope is explicit and finite

2. **Execution**
   - The application is built from scratch against the PRD
   - Existing infrastructure may be reused
   - Existing content may be consumed
   - Prior app logic is not assumed

3. **Evaluation**
   - Outcome is evaluated against the PRD's Definition of Done
   - Evidence is captured

4. **Closure**
   - The attempt is explicitly marked CLOSED or ABANDONED
   - No new scope is added under the same attempt

5. **Reflection**
   - Learnings inform the next PRD or attempt
   - The current attempt is not retrofitted

---

## Sealing an Attempt

A **sealed attempt** has:
- A frozen PRD snapshot (at the PRD version level)
- Evidence captured and linked
- A commit pointer (SHA) in META.json
- Status: CLOSED, ABANDONED, or CHAMPION

Once sealed:
- No further work is done on that attempt
- The record is immutable
- New work requires a new attempt (same PRD) or new PRD version

---

## Champion Selection and Promotion

Quantum Development produces observations. Promotion converts one observation into production.

### Definitions

- **Attempts** = competing candidates (separate branches / preview deploys)
- **Champion** = the single candidate chosen to become production
- **`prod` branch** = production deployment (klappy.dev)
- **`main` branch** = experiment ledger, history aggregation

### The Promotion Rule

**Exactly one attempt becomes Champion for a PRD version.**

The Champion is merged to `main`, then `prod` is fast-forwarded to `main`. Everything else stays sealed evidence.

### Minimum Gate (must pass)

1. PRD Success Criteria (the checkboxes in the PRD)
2. Evidence bundle (desktop + mobile + deep-link round-trip + failure behavior)
3. Cloudflare preview URL captured in META.json
4. No fatal regressions vs current production

### Tie-Breakers (when multiple pass)

Pick one axis and declare it ahead of time:

- Best mobile UX
- Best navigation clarity
- Cleanest deep-link contract and anchor behavior
- Simplest code / fewest dependencies (maintainability)

**Important:** Tie-breakers are not more features. They're about quality under the same PRD.

### Promotion Procedure

**Branch Roles:**
- `prod` — **production** (only champions go here)
- `main` — experiment ledger, artifact aggregation
- `*` (any other) — attempt sandboxes (preview deploys)

**When an attempt wins:**

1. **Seal it**
   - `products/<lane>/attempts/prd-vX.Y/attempt-NNN/` has: ATTEMPT.md, META.json, evidence folder, preview URL.
   - Status: CHAMPION

2. **Tag it** (immutable pointer)
   - Tag: `prd-vX.Y-attempt-NNN`

3. **Merge artifacts to main**
   - Attempt folder, evidence, PRD patches

4. **Promote code to main**
   - Champion's `products/<lane>/src` merges to `main`

5. **Fast-forward prod**
   - `git checkout prod && git merge main --ff-only`
   - Cloudflare deploys `prod` → production

**What happens to other attempts?**
- Seal them (ABANDONED or CLOSED-but-not-chosen)
- Keep their preview URLs + evidence
- Merge their artifacts to `main` (learnings persist)
- Do NOT merge their code

### The One Rule That Prevents Chaos

**Only `prod` is allowed to be production.**

`main` is for experiments and history. Attempts can be preview deployments forever.

This makes "which one is live?" a non-question.

> **Decision:** See [D0001: prod Branch Is Production](/docs/decisions/D0001-prod-branch-is-production.md)

### Winner Declaration (ATTEMPT.md snippet)

When an attempt wins, add to its ATTEMPT.md:

```
Status: CHAMPION (Promoted to Production)
Promoted commit: <sha>
Attempt tag: prd-vX.Y-attempt-NNN
Production tag: production-vX.Y
Production URL: https://klappy.dev
Preview URL: <cloudflare preview>
Why this one won (tie-breaker): <one sentence>
```

---

## Restartability as a Feature

ODD treats restartability as a first-class design feature:
- prompts are rewritten, not patched
- applications are regenerated, not endlessly refactored
- artifacts are preserved for learning, not extended by default

This prevents:
- sunk-cost bias
- prompt sprawl
- architectural drift

---

## What Persists Across Attempts

The following may persist across attempts:
- deployment infrastructure
- build and verification scripts
- content repositories
- Canon structure
- naming conventions
- evidence standards

The following must not be assumed to persist:
- UI composition
- routing model
- state management decisions
- interaction flow

---

## Why Attempts Are Explicitly Closed

Explicit closure:
- creates psychological safety to restart
- prevents scope creep disguised as "Phase 1.1"
- keeps PRDs honest and legible
- makes outcomes comparable across attempts

Unclosed attempts silently turn into products by accident.

---

## How This Appendix Should Be Used

This appendix is:
- a shared mental model
- a permission structure
- a vocabulary for stopping well

It is not:
- a workflow
- a checklist
- a gating mechanism

---

## Summary

ODD optimizes for learning velocity, not artifact continuity.

Attempts exist to be finished.  
Infrastructure exists to make finishing cheap.  
Content exists to compound over time.

**Quantum Development ends when one candidate is promoted.**
Observations without promotion are incomplete experiments.

---

**Status:** Updated 2026-01-16 — Aligned with D0001 (prod branch), D0008 (register before nuke)

> **Authoritative source for attempt workflow:** `/docs/ATTEMPTS.md`



--------------------------------------------------------------------------------
📄 File: docs/appendices/canonical-compression.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/canonical-compression
title: Canonical Compression
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "compression", "compiled", "epochs", "drift"]
status: canonical
category: odd
version: 1.0
epoch: E0002
---

# Canonical Compression

> Derived compression outputs that fit bounded context windows without modifying source truth.

## Description

Canonical Compression produces minimal, derived working models from the full Canon to solve context window limits. Source Canon remains authoritative while compiled outputs are epoch-scoped, disposable artifacts that can be regenerated anytime. This is compilation, not mutation—compressed outputs live in `_compiled/` and never replace source truth.

## Outline

- Summary
- The Problem It Addresses
- Two Classes of Canon Artifacts
- Compilation Model
- Where Compiled Canon Lives
- What Compression Produces
- What Compression Must Never Do
- Relationship to Drift Checks
- Relationship to Epochs
- The Rule
- Status

---

## Content

## Summary

As the Canon grows, agents and humans cannot hold the entire system in working memory.

Canonical Compression solves this by producing a **derived, minimal working model** of the Canon that fits into limited context windows without sacrificing the source of truth.

**Canonical Compression is compilation, not mutation.**

- Source Canon remains authoritative and unchanged.
- Compressed outputs are derived artifacts.
- Derived artifacts are disposable and regenerable.
- Any compression output can be deleted without loss of truth.

---

## The Problem It Addresses

Agents drift for reasons beyond contradiction:

- The total doc surface becomes too large for a single context window.
- Important rules are duplicated across files, creating divergence.
- Low-signal history (old decisions, obsolete guidance) consumes attention.
- "More documentation" paradoxically makes behavior less consistent.

Drift checks detect inconsistency.
Canonical Compression reduces the size of the reasoning surface so consistency becomes feasible.

---

## Two Classes of Canon Artifacts

### 1) Source Canon (Authoritative, Slow)

Examples:

- `/canon/**`
- `/odd/appendices/**`
- `/odd/decisions/**`

Properties:

- Curated and human-owned
- Evidence-backed
- Traceable
- Evolves slowly
- Never rewritten by synthesis

Source Canon is **truth storage**.

### 2) Compiled Canon (Derived, Fast)

Canonical Compression produces **Compiled Canon** outputs.

Properties:

- Derived and lossy (summaries, collapsed checklists, working models)
- Replaceable and disposable
- Epoch-scoped
- Designed for agent working memory
- Must include links back to Source Canon

Compiled Canon is **truth projection**, not truth itself.

---

## Compilation Model

Canonical Compression produces **derived artifacts**.

- Source Canon is never modified
- Compressed outputs live in `_compiled/`
- Outputs are epoch-scoped and disposable
- Regeneration is always preferred to editing

Compression is compilation, not mutation.

---

## Where Compiled Canon Lives (Exact)

Compiled outputs MUST NOT be written into `/canon/` as source documents.

They live here:

/canon/_compiled/
epoch-E0002/
agent-working-model.md
reasoning-checklist.md
failure-patterns-collapsed.md

Notes:

- `_compiled/` is derived output (wipeable).
- Outputs are organized by epoch to preserve comparability.
- If the entire folder is deleted, no truth is lost — only convenience.

---

## What Compression Produces

Canonical Compression generates a small set of artifacts (exact list may evolve):

- **Agent Working Model**: minimal worldview for correct behavior
- **Reasoning Checklist**: step-by-step constraints + invariants
- **Failure Patterns (Collapsed)**: common pitfalls distilled into triggers + tests
- **Doc Map (Progressive Links)**: what to read next when confidence drops

Each output MUST:

- Be marked as derived/compiled
- Declare its epoch
- Link back to source documents for traceability

---

## What Compression Must Never Do

- Rewrite or replace Source Canon files
- Delete decision logs
- "Optimize" by removing nuance from the source
- Invent new rules (compression may restate, not legislate)

If a compression output implies a new rule, that rule must be introduced via:
- a decision log, or
- a PRD + attempt process in the relevant lane

---

## Relationship to Drift Checks

Drift checks answer: **"Do these documents contradict?"**

Canonical Compression answers: **"Can a bounded context window hold the rules needed to behave correctly?"**

Drift checks prevent incoherence.
Compression prevents overload.

Both are required.

---

## Relationship to Epochs

Compression outputs are epoch-scoped.

- If epoch changes, compiled outputs must be regenerated
- Comparability across epochs is not assumed
- Old compiled outputs may be archived or deleted

Epoch scoping prevents "half-updated working models" from lingering.

---

## The Rule (One Sentence)

**Canon is written by humans and proven by outcomes.  
Compiled Canon is written by synthesis and proven by usability.**

---

## Status

This document defines the conceptual model.
Implementation of tooling to generate compiled outputs is tracked separately.



--------------------------------------------------------------------------------
📄 File: docs/appendices/compilation-targets.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/compilation-targets
title: "Compilation Targets"
audience: docs
exposure: public
tier: 2
voice: neutral
stability: stable
tags: ["odd", "compilation", "memory", "portability", "packs", "lanes"]
---

# Compilation Targets

> Lane-scoped, target-specific packs that make the corpus usable at constrained context sizes.

## Description

Compiled packs are derived outputs identified by (lane, target) pairs that can be deleted and regenerated anytime. Each pack has a deterministic plan file defining ordered sources and compilation mode. Targets are constrained consumer profiles (like visitor or author), not personas, and all packs must include provenance for verification without requiring an LLM.

## Outline

- Key Idea
- Output Location (Wipeable)
- Compile Plans (Deterministic)
- Targets
- Invariants
- Phase Policy

---

## Content

Compiled packs exist to make the corpus usable at constrained context sizes without rewriting source truth.

A compiled pack is **derived output**. It can be deleted and regenerated at any time.

## Key Idea

Compilation is scoped by:

- **Lane** (which product's PRD and user intent we're serving)
- **Target** (which consumer needs the compressed view)

A pack is always identified as:

`(lane, target)`

## Output Location (Wipeable)

All compiled output MUST live under:

`/public/_compiled/<lane>/`

Example:

- `/public/_compiled/website/visitor-pack.md`
- `/public/_compiled/website/author-pack.md`

## Compile Plans (Deterministic)

Each pack MUST have a deterministic plan file:

`/infra/compile/plans/<lane>/<target>.json`

The plan defines:
- ordered source files
- compilation mode (Phase 0: concat)
- output filename

## Targets

Targets are **not personas**. They are constrained consumer profiles.

### Website Lane Targets

- `visitor` — minimal orientation surface; progressive disclosure; "what is this?"
- `author` — high-signal working pack for the repo owner; more depth; less onboarding

### Future Targets (Defined When Needed)

- `dev-peer` — evaluation / critique / contribution readiness
- `agent-core` — operational pack for agents to follow process consistently

These exist as names only until a lane PRD requires them.

## Invariants

- Packs are derived. Source docs are not overwritten.
- Packs do not introduce new truth. They reference truth.
- Packs must include provenance (lane, target, timestamp, git commit, source list + hashes).
- Verification MUST be possible without an LLM (hashes + structure + required header).

## Phase Policy

- **Phase 0 (Concat):** deterministic concatenation only
- **Phase 1 (LLM):** LLM may summarize/select, but output still must satisfy the same provenance + verification contract



--------------------------------------------------------------------------------
📄 File: docs/appendices/compilation.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/compilation
title: Compilation
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "compilation", "memory", "context", "packs"]
---

# Compilation

> The process of producing wipeable, portable context packs from source documents.

## Description

Compilation creates derived, regeneratable packs that fit in agent and human working memory while preserving source truth unchanged. Compiled outputs live under `/public/_compiled/<lane>/` with required provenance headers for auditability. This mechanism keeps context portable, auditable, and cheap while applying evolutionary pressure against documentation sprawl.

## Outline

- Summary
- Core Rule
- Output Location (Wipeable)
- Provenance Header (Required)
- Why This Is ODD
- Multi-Pack Output (E0002+)
- Relationship to Drift Checks
- Drift Audits

---

## Content

## Summary

Compilation is the process of producing a **derived, wipeable, portable pack** from higher-entropy source documents.

It exists to solve a practical constraint:

> Agents and humans cannot keep the entire repo in working memory at once.

Compilation produces a **smaller, purpose-built context artifact** that can be regenerated at any time.

---

## Core Rule

**Compilation never edits or replaces source.**

- Source docs remain the truth.
- Compiled packs are derived outputs.
- Compiled outputs may be deleted at any time and rebuilt deterministically.

This is compilation, not compression-in-place.

---

## Output Location (Wipeable)

Compiled outputs MUST live under:

`/public/_compiled/<lane>/`

Example:

`/public/_compiled/website/visitor-pack.md`

Compiled outputs MUST NOT be stored inside:
- `/canon/**`
- `/docs/**`
- `/attempts/**`

Those are source-of-truth layers.

---

## Provenance Header (Required)

Every compiled pack MUST begin with a provenance header containing:

- `lane`
- `pack`
- `built_at` (ISO8601)
- `git_commit`
- `sources` (list of source file paths)
- `source_hashes` (map of source path → sha256)

If provenance is missing, the compiled pack is invalid.

---

## Why This Is ODD

ODD treats "context" as a consumable.

Compilation is the mechanism that makes context:

- **portable** (shareable artifact)
- **auditable** (provenance)
- **regeneratable** (wipeable output)
- **cheap** (smaller input than full repo)

Compilation is not automation. It is an **evolutionary pressure** against doc sprawl.

If compilation output grows bloated, the correct response is:
- reduce scope
- tighten selection rules
- improve curation
not "add more docs."

---

## Multi-Pack Output (E0002+)

When a lane has more than one pack, output MUST be structured as:

```
/public/_compiled/<lane>/
  index.json
  <pack>-pack.md
  _meta/
    <pack>-COMPILE_META.json
```

### index.json

Each lane MUST emit `/public/_compiled/<lane>/index.json` listing all known packs from
`/infra/compile/plans/<lane>/*.json` and whether each output exists.

### Meta filenames are pack-scoped

`COMPILE_META.json` MUST NOT be shared across packs.

Meta MUST be written as:

`/public/_compiled/<lane>/_meta/<pack>-COMPILE_META.json`

This prevents clobbering and preserves provenance per target.

---

## Relationship to Drift Checks

Drift checks ensure the repo does not contradict itself.

Compilation ensures the repo remains **usable** under memory limits.

Both are required for scalability.

---

## Drift Audits

The repository SHOULD provide a read-only drift audit that can be run at any time:

- `npm run audit:drift`

This command MUST NOT regenerate or modify derived outputs. It only verifies consistency.

If regeneration is desired for wipeable derived outputs (compiled packs), the repository MAY also provide:

- `npm run audit:repair`

`audit:repair` may regenerate ONLY derived outputs under `/public/_compiled/**`, then MUST run `audit:drift`.

Canon and PRDs MUST NOT be modified by either command.



--------------------------------------------------------------------------------
📄 File: docs/appendices/compiled-memory.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/compiled-memory
title: "Compiled Memory"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "compiled", "memory", "drift"]
---

# Compiled Memory

> Lane-scoped, wipeable artifacts that keep guidance small and citeable without destroying underlying truth.

## Description

Compiled Memory solves context overload and documentation sprawl by producing auditable compressed artifacts while keeping source truth in Canon, PRDs, and Attempts. The mechanism compiles out-of-place with four outputs per lane: Canon Pack, Lane Pack, PRD Pack, and Run Pack. All compile runs emit provenance metadata and source hashes for traceable, defensible compression.

## Outline

- Summary
- Why This Exists
- Compile Is Not Compression-In-Place
- Scope Levels (The Four Outputs)
- Lane Rules
- Auditable by Design
- Drift and Epochs
- What This Enables
- Non-Goals

---

## Content

## Summary

In ODD, repositories accumulate truth faster than agents can hold it in context.

**Compiled Memory** is the mechanism for producing **lane-scoped, wipeable, auditable**
compressed artifacts that are safe for agents and humans to consume.

This is a **derivation pipeline**, not a rewrite pipeline.

- Source truth remains in Canon + PRDs + Attempts.
- Compiled output is generated *out of place*.
- Compiled output can be deleted and regenerated at any time.

## Why This Exists

ODD assumes:
- generation is abundant
- trust is not
- context is bounded
- drift is inevitable unless actively checked

Agents fail in two predictable ways:
1. **Context overload** → they miss constraints, repeat mistakes, invent structure.
2. **Doc sprawl** → humans keep writing more guidance, and agents still can’t load it all.

Compiled Memory keeps the guidance surface **small, current, and citeable** without destroying the underlying truth.

## Compile Is Not Compression-In-Place

**Rule:** Compiled Memory MUST NOT replace Canon/PRDs/Attempts in place.

This is compile-out-of-place:

- Inputs: Canon + lane docs + PRDs + attempt artifacts
- Outputs: `/public/_compiled/<lane>/**`
- Verification: hashes + sources + provenance

If compiled output is wrong, we delete it and recompile.
If source truth is wrong, we change the source truth explicitly.

## Scope Levels (The Four Outputs)

Compiled Memory produces four outputs per lane.

1) **Canon Pack**
- Purpose: high-signal orientation + invariants relevant to the lane
- Input: Canon (+ decisions, appendices)

2) **Lane Pack**
- Purpose: lane identity, non-goals, and how this lane “wins”
- Input: lane PRD folder + lane docs

3) **PRD Pack**
- Purpose: the active PRD distilled into an agent-usable execution contract
- Input: `/docs/PRD/<lane>/PRD.md` (and supporting files in that folder)

4) **Run Pack**
- Purpose: “what’s happening right now” for an attempt/run
- Input: attempt artifacts for the lane (or latest run metadata)
- Note: optional when no runs exist

These are distinct because they change at different rates.

## Lane Rules

Compiled output is always lane-scoped:

- Output root: `/public/_compiled/<lane>/`
- Meta: `/public/_compiled/<lane>/_meta/`

Lanes are:
- `website`
- `ai-navigation`
- `agent-skill`

Attempts without a lane are invalid (see Product Lanes).

## Auditable by Design

Every compile run MUST emit:

- `COMPILE_META.json`
  - includes provenance (tool, model, command, timestamp)
  - includes content hashes for plan + sources
- `COMPILE_SOURCES.txt`
  - lists every input file used for compilation (paths)

Every compiled markdown output MUST include a **Sources** section.

The goal is not “perfect summaries.”
The goal is **traceable, defensible compression**.

## Drift and Epochs

Compiled Memory is an explicit response to drift.

- Canon and PRDs may advance faster than tooling (epoch transitions).
- Compiled output is always treated as **derived evidence**, not authority.

If Canon/PRDs and tooling disagree:
- Canon/PRDs define intended truth.
- tooling must converge later.
- compiled outputs MUST reflect the intended truth (and cite the mismatch if necessary).

## What This Enables

- Agents can behave consistently without ingesting the whole repo.
- Humans can evaluate the system without wading through every artifact.
- Each lane can have its own “agent-ready” pack without coupling to other lanes.
- The repo can evolve without turning into a documentation graveyard.

## Non-Goals

Compiled Memory does not:
- attempt to make Canon smaller by rewriting it
- delete or “consolidate away” decision history
- guarantee correctness without verification
- replace evidence capture

It exists to keep context bounded while keeping truth traceable.




--------------------------------------------------------------------------------
📄 File: docs/appendices/deploy-evidence.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/deploy-evidence
title: "Deploy Evidence"
audience: docs
exposure: nav
tier: 2
voice: first_person
stability: stable
tags: ["odd", "deploy", "evidence", "cloudflare", "attempts"]
---

# Deploy Evidence

> Evidence is only valid when externally reviewable via deployed URLs.

## Description

Local builds are insufficient proof for online deployment outcomes—evidence must be copied into the lane build output to be served by Cloudflare Pages. Evidence must be accessible at `/_evidence/<run_id>/EVIDENCE.md` on the preview deployment. An attempt is incomplete until the branch is pushed, preview build succeeds, and both preview and evidence URLs return HTTP 200.

## Outline

- Summary
- Cloudflare Pages Reality
- Required Evidence Publication Path
- Completion Rule

---

## Content

## Summary

In ODD, evidence is only valid if it is externally reviewable.

Local builds are not sufficient proof when the intended outcome is an online deployment.

## Cloudflare Pages Reality

Cloudflare Pages serves only the configured build output directory.
It does **not** serve arbitrary repo folders such as `/attempts/**`.

Therefore, any "Evidence URL" that points to `/attempts/**` on a Pages domain is invalid.

## Required Evidence Publication Path

Evidence MUST be copied into the lane build output so it is served by Pages:

`products/<lane>/dist/_evidence/<run_id>/EVIDENCE.md`

This makes the evidence accessible from the preview deployment at:

`/_evidence/<run_id>/EVIDENCE.md`

## Completion Rule

An attempt is not complete until all are true:

1) The branch is pushed to origin  
2) Cloudflare preview build succeeds  
3) The preview URL renders (HTTP 200)  
4) The evidence URL renders (HTTP 200)

If (2)-(4) cannot be proven, the attempt must seal as failure.



--------------------------------------------------------------------------------
📄 File: docs/appendices/drift-checks.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/drift-checks
title: "Drift Checks"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "drift", "verification", "contracts"]
---

# Drift Checks

> The mechanism for detecting when documentation, prompts, and tooling diverge from truth.

## Description

Drift is the primary failure mode of ODD systems—when components diverge, truth becomes vibes. The drift check command verifies alignment between interface contracts, lane PRDs, attempt lifecycle docs, tooling behavior, and manifest schema. If drift checks fail, conclusions drawn from the repo are invalid and must be fixed before running new attempts.

## Outline

- What Must Stay Aligned
- The Drift Check Command
- Epistemic Rule

---

## Content

Drift is the primary failure mode of ODD systems.

When documentation, prompts, and tooling diverge, "truth" becomes vibes again.

This appendix defines the drift-prevention mechanism.

---

## What Must Stay Aligned

- Interface contracts (`/interfaces/**`)
- Lane PRDs (`/docs/PRD/**`)
- Attempt lifecycle docs (`/docs/**`)
- Tooling behavior (CLI)
- Manifest schema and semantics

---

## The Drift Check Command

The repository SHOULD provide:

```bash
npm run verify:contracts
```

This command verifies:

1. `manifest.json` conforms to `manifest@current`
2. builds conform to `build-output@current`
3. attempt artifacts conform to `attempt-cli@current`
4. lane PRDs declare required contracts

---

## Epistemic Rule

If drift checks fail, conclusions drawn from the repo are invalid.

Fix drift before running new attempts.



--------------------------------------------------------------------------------
📄 File: docs/appendices/epochs.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/epochs
title: "Epochs"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "fitness-landscape", "comparability", "orientation"]
---

# Epochs

> Named periods where success criteria are stable enough for outcome comparison.

## Description

An epoch is a named period where "success" meaning is stable enough to compare outcomes. Attempts are individuals, PRDs are fitness functions, Promotion is selection, Canon is inherited traits, and Epochs are shifts in the fitness landscape. An epoch defines evaluation reality: what "done" means, mandatory evidence, binding contracts, acceptable risks, and infrastructure stability. Epochs are not PRDs—they are the context in which PRDs are interpreted. klappy.dev defines E0001 (single-PRD era), E0002 (multi-lane era), and E0003 (evidence-first era with Cloudflare deployment proof required).

## Outline

- What an Epoch Is
- What an Epoch Is Not
- Relationship to Product Lanes
- Relationship to PRDs and Attempts
- When to Start a New Epoch
- Naming Convention (E0001, E0002, E0003)
- Minimal Epoch Metadata (META.json)
- Anti-Patterns
- E0003 — Evidence-First Era (klappy.dev specific)

---

## Content

An **epoch** is a named period where the meaning of "success" is stable enough that outcomes can be compared.

This is borrowed from evolutionary systems:

- **Attempts** are individuals.
- **PRDs** are fitness functions.
- **Promotion** is selection.
- **Canon** is inherited traits.
- **Epochs** are shifts in the fitness landscape itself.

If epochs are implicit, the system will compare results across incompatible standards and produce folklore.

---

## What an Epoch Is

An epoch defines the **evaluation reality** for a period of work:

- what "done" means (and what it does not)
- what evidence is mandatory
- what contracts are binding (build/deploy, provenance, etc.)
- what risks are acceptable
- what is treated as stable vs experimental infrastructure

An epoch is *not* a PRD.  
An epoch is the context in which PRDs are interpreted.

---

## What an Epoch Is Not

Epochs are not:

- a semantic version of the website
- a replacement for product lanes
- a reason to rebuild everything
- a new folder taxonomy for creativity

Epochs exist to prevent invalid comparisons, not to add structure.

---

## Relationship to Product Lanes

**Product lanes** separate *simultaneous intent*.  
**Epochs** separate *changes over time* in how intent is evaluated.

- Lanes answer: "Which product are we evolving?"
- Epochs answer: "What counts as truth *right now* across those products?"

Lanes are parallel. Epochs are sequential.

---

## Relationship to PRDs and Attempts

Within a lane:

- A **PRD** specifies requirements for a specific capability.
- An **attempt** is an observation (implementation + evidence) against that PRD.

Across time:

- An **epoch** determines whether two attempts are comparable.
- If the evaluation rules changed, you are in a new epoch.

Rule of thumb:

> If you changed what evidence is required, or what contract is binding, you changed the fitness landscape. That is a new epoch.

---

## When to Start a New Epoch

Start a new epoch when any of the following change in a way that would invalidate comparisons with prior attempts:

- Evidence requirements (e.g., "preview URL required" becomes mandatory)
- Provenance requirements (e.g., capturing tool/model becomes required)
- Deployment topology (e.g., `prod` branch becomes the production branch)
- Build/deploy contract semantics (`/dist` rules change materially)
- Attempt lifecycle mechanics (e.g., reserve → register/finalize)
- Evaluation method (e.g., manual review → scripted verification gates)

If the change is "nice-to-have" and does not affect comparability, do not create an epoch.

---

## Naming Convention

Epoch IDs should be boring and stable:

- `E0001-<short-name>`
- `E0002-<short-name>`

Examples:
- `E0001-single-prd-era`
- `E0002-multi-lane-era`
- `E0003-evidence-first-era`

The ID is the canonical reference. The name is a hint.

---

## Minimal Epoch Metadata (Required)

Every attempt's `META.json` MUST include:

- `lane`
- `prd_version`
- `epoch_id`

Example:

```json
{
  "lane": "website",
  "prd_version": "v1.0",
  "epoch_id": "E0002-multi-lane-era"
}
```

If epoch_id is missing, the attempt is not comparable by default.

---

## Anti-Patterns

- **Epoch inflation**: Creating a new epoch for every PRD bump.
- **Hidden epoch shifts**: Changing contracts or evidence rules without naming it.
- **Epoch as marketing**: Treating epoch IDs like product versions.
- **Cross-epoch comparisons**: Declaring "Attempt 003 is better than Attempt 001" when the evaluation rules changed.

---

## Why This Exists

Evolutionary systems assume a stable fitness landscape per generation.

Human + AI systems change the landscape constantly (tools, contracts, evidence standards, deployment topology).
Naming epochs makes those shifts explicit so we can:

- preserve honest comparisons
- prevent "it worked because residue" confusion
- keep learnings interpretable over time

If the evaluation landscape changed, say so.
That's what an epoch is for.

---

## E0003 — Evidence-First Era

### What changed

E0003 begins when online deployment evidence becomes mandatory for attempt completion.

In this epoch, a local build is not sufficient proof when the intended outcome is an online deployment.

### Binding rule (new fitness landscape)

An attempt is not complete until all are true:

1) The attempt branch is pushed to origin
2) Cloudflare Pages preview deployment succeeds (build passes)
3) The preview URL returns HTTP 200 and renders the site
4) The evidence URL returns HTTP 200 and renders the evidence at:

`/_evidence/<run_id>/EVIDENCE.md`

### Why this is a new epoch

This change alters the repository's selection pressure:

- Success is now gated by deployment correctness, not just build correctness
- Evidence must be externally reviewable, not locally asserted
- Attempts become comparable only within the same deploy-evidence regime

### Compatibility

- E0002 attempts remain valid within E0002.
- E0002 attempts are not comparable to E0003 attempts by default.



--------------------------------------------------------------------------------
📄 File: docs/appendices/evidence.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/evidence
title: "Evidence"
audience: docs
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["evidence", "verification"]
---

# Evidence

> Proof through deployed artifacts, not narrative claims.

## Description

An attempt is valid only if its deployed build exposes public evidence at `/_evidence/` with minimum proof of 1 video recording or 3 screenshots—markdown alone doesn't count. Required files include index.html, index.json, EVIDENCE.md, ATTEMPT.md, META.json, and proof assets. Evidence must be discoverable without knowing run IDs, reading narratives, or running code locally.

## Outline

- Minimum Proof
- Required Files
- Discoverability
- Build Enforcement
- Related

---

## Content

Evidence is proof, not narrative.

An attempt is valid ONLY if its deployed build exposes public evidence at:

`/_evidence/`

## Minimum Proof

- 1 video recording OR
- 3 screenshots

Markdown alone does not count as proof.

## Required Files

Every `/_evidence/` folder must contain:

- `index.html` — human-browsable index
- `index.json` — machine inventory
- `EVIDENCE.md` — summary and links
- `ATTEMPT.md` — what was done
- `META.json` — provenance
- `screenshots/` — at least 1 image
- `recordings/` — video proof (or 3 screenshots total)

## Discoverability

Evidence MUST be discoverable without:

- knowing a run ID
- reading a narrative
- running code locally
- guessing paths

If `/_evidence/` returns 404, the attempt is **INVALID**.

## Build Enforcement

When `.attempt.json` exists:

- Build FAILS if `/_evidence/` is missing
- Build FAILS if proof assets are insufficient
- Build FAILS if index generation fails

## Related

- Attempt Record Packs: `/docs/ATTEMPT_RECORD_PACK.md`
- Attempt Kickoff: `/docs/ATTEMPT_KICKOFF.md`



--------------------------------------------------------------------------------
📄 File: docs/appendices/lane-build-layout.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/lane-build-layout
title: "Lane Build Layout"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "lanes", "build", "layout", "deploy"]
---

# Lane Build Layout

> Policy ensuring multiple product lanes share Canon without colliding in implementation output.

## Description

Multiple product lanes share Canon but must not collide in `/src` or `products/<lane>/dist`. Each attempt operates in its own branch/worktree with disposable, lane-specific `/src` and lane-scoped build output. The recommended deployment model creates one Cloudflare Pages project per lane to avoid requiring a single repo-level `/dist` to represent multiple products.

## Outline

- Policy: One Lane Builds at a Time in a Worktree
- Policy: Production Deployments Are Lane-Scoped
- Recommended Deployment Model (Least Brittle)
- What This Means for `/main` and `/prod`
- Invariant

---

## Content

This repository contains multiple **product lanes** that share Canon but must not collide in implementation output.

The core collision surfaces are:
- `/src` (implementation workspace)
- `products/<lane>/dist` (deployment artifact)

This document defines the lane-safe layout policy.

---

## Policy: One Lane Builds at a Time in a Worktree

Each attempt operates in its own branch/worktree. Within that sandbox:

- `/src` is disposable and lane-specific for that attempt.
- `products/<lane>/dist` is the output of that lane's build.

Because worktrees isolate filesystem state, lanes do not collide during development.

---

## Policy: Production Deployments Are Lane-Scoped

A single git repository may be deployed multiple times (e.g., Cloudflare Pages projects), each targeting:

- a specific lane
- a specific branch (`prod/<lane>` or similar)

This prevents one lane's deployment from overwriting another.

---

## Recommended Deployment Model (Least Brittle)

Create one Cloudflare Pages project per lane:

- `klappy-website` → deploys lane `website`
- `klappy-ai-navigation` → deploys lane `ai-navigation` (when it becomes deployable)
- `klappy-agent-skill` → deploys lane `agent-skill` (if it has a deployable surface)

Each Pages project selects its own production branch.

This avoids requiring a single repo-level `/dist` to represent multiple products simultaneously.

---

## What This Means for `/main` and `/prod`

- `main` is the aggregation branch for artifacts and evaluation history.
- Production branches are lane-specific (implementation detail, but must be stable).

Promotion updates the lane's production branch only.

---

## Invariant

A lane must be promotable without affecting any other lane's production surface.

If promoting lane A changes lane B's production outcome, the layout is invalid.



--------------------------------------------------------------------------------
📄 File: docs/appendices/lane-implementation-surfaces.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/lane-implementation-surfaces
title: "Lane-Scoped Implementation Surfaces"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "lanes", "deployment", "contract", "build"]
---

# Lane-Scoped Implementation Surfaces

> Each lane owns its own source, build output, and deploy root for epistemic independence.

## Description

In the multi-lane PRD model, each lane MUST have its own implementation surface under `/products/<lane>/` with src, dist, and no shared repo-root directories. Nuking is lane-scoped and MUST NOT affect other lanes, Canon, docs, or attempts. Lane-scoped surfaces restore epistemic independence—if a lane succeeds, you can know it succeeded because the intent was correct, not because of residue from another lane.

## Outline

- Summary
- Locked Folder Contract
- Build Output Contract (Pages-style)
- Attempt Independence
- Deployment Isolation (Cloudflare)
- Promotion Model
- Why This Exists

---

## Content

## Summary

In the multi-lane PRD model, each lane is an independent product.

Therefore each lane MUST have its own implementation surface:
- its own source directory
- its own build output directory
- its own deploy root

No lane may rely on a shared, repo-root `/src` or `/dist`.

This prevents cross-lane contamination and restores independence of attempts.

---

## Locked Folder Contract

Each lane owns its implementation under:

```
/products/<lane>/
  src/          # lane implementation source (disposable)
  dist/         # lane build output (never committed)
```

`<lane>` is one of:
- `website`
- `ai-navigation`
- `agent-skill`

The repo-root directories `/src` and `/dist` are NOT product surfaces.

---

## Build Output Contract (Pages-style)

For any lane deployed via Cloudflare Pages:

- Build output MUST be `products/<lane>/dist/`
- `products/<lane>/dist/index.html` MUST exist after build

The lane may use any stack as long as it satisfies the lane's deploy contract.

---

## Attempt Independence

Attempts MUST be able to start from a blank slate without affecting other lanes.

Therefore nuking is lane-scoped:

- `attempt:nuke --lane <lane>` deletes ONLY:
  - `products/<lane>/src/`
  - lane-local config files inside `products/<lane>/` (if any)

Nuking MUST NOT delete:
- `/canon/**`
- `/docs/**`
- `/attempts/**`
- other lanes under `/products/**`

---

## Deployment Isolation (Cloudflare)

Each lane SHOULD be deployed as a separate Cloudflare Pages project.

For each Pages project:
- Root directory: `products/<lane>`
- Build command: `npm run build -- --lane <lane>` (or lane-local build)
- Build output: `dist`
- Production branch: `prod`
- Preview deployments: enabled for all non-production branches

This allows all lanes to share one git repository and one production branch while remaining operationally independent.

---

## Promotion Model

Promotion is lane-scoped.

Promoting a champion for lane `<lane>` updates ONLY:
- `products/<lane>/**` (implementation)
- the attempt artifacts for that lane

Promotion MUST NOT modify other lanes.

---

## Why This Exists

A shared `/src` makes outcomes non-attributable.

If a lane succeeds, you cannot know whether it succeeded because:
- the intent was correct, or
- residue from another lane made it work.

Lane-scoped implementation surfaces restore epistemic independence.



--------------------------------------------------------------------------------
📄 File: docs/appendices/memory-architecture.proposed.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/memory-architecture
title: "Memory Architecture"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "memory", "elevation", "portability"]
status: proposed
---

# Memory Architecture

> The layered system that preserves learning while discarding what no longer reduces drag.

## Description

Memory in ODD is the percolation path from ephemeral execution to durable truth through five layers: Attempt Evidence, Lane History, Lane Decisions, Cross-Lane Patterns, and Canon. Each layer has different durability, scope, and elevation criteria, with most artifacts expected to decay at lower layers. The system preserves what repeatedly reduces drag, discards what no longer serves, and keeps percolation paths visible.

## Outline

- Summary
- Why Memory Matters
- The Memory Layers
- The Percolation Model
- Decay Is the Default
- Folder Patterns
- What Memory Is Not
- Relationship to Other Concepts
- Related Documents

---

## Content

## Summary

In ODD, **memory** is the layered system that preserves what was learned while discarding what no longer reduces drag.

Memory is not a single artifact. It is the percolation path from ephemeral execution to durable truth:

```
Attempts → Lane History → Lane Decisions → Cross-Lane Patterns → Canon
```

Each layer has different durability, scope, and elevation criteria.

---

## Why Memory Matters

ODD assumes:
- Generation is abundant
- Trust is scarce
- Context is bounded
- Drift is inevitable unless actively curated

Memory is the bottleneck — not computation, not generation, not storage.

The system must:
- Preserve what repeatedly reduces drag
- Discard what no longer serves
- Make the percolation path visible
- Keep each layer scannable by agents and humans

Evidence without elevation creates false confidence rather than learning.

---

## The Memory Layers

### Layer 1: Attempt Evidence (Ephemeral)

**Scope:** Single execution against a PRD  
**Durability:** Sealed when attempt closes; may be pruned later  
**Lives in:** `products/<lane>/<version>/attempts/attempt-NNN/evidence/`

Attempts capture what happened during execution:
- Test output, logs, screenshots
- Verification artifacts
- Failure evidence

**Elevates when:** A pattern appears across multiple attempts and can be stated as a reusable learning.

---

### Layer 2: Lane History (Lane-Durable)

**Scope:** What happened in this lane — champions, failures, infrastructure changes  
**Durability:** Persists as long as the lane exists  
**Lives in:** `products/<lane>/history/`

History records **what happened** without turning it into rules:
- Champion promotions
- Failed attempts with learnings
- Infrastructure migrations

**Elevates when:** A learning recurs across multiple versions or informs lane decisions.

---

### Layer 3: Lane Decisions (Lane-Durable)

**Scope:** Why this lane chose what it chose  
**Durability:** Persists as long as the lane exists; may be deprecated  
**Lives in:** `products/<lane>/decisions/`

Decisions record **why we chose** to make things happen the way they did:
- Architectural choices
- Deviations from canon
- Patterns that worked

History says "we did X." Decisions say "we did X because Y."

**Elevates when:** A decision proves valuable across multiple lanes.

---

### Layer 4: Cross-Lane Patterns (Repo-Durable)

**Scope:** Patterns that recur across lanes  
**Durability:** Persists in interfaces or shared tooling  
**Lives in:** `/interfaces/**` or shared infrastructure

Cross-lane patterns emerge when:
- Multiple lanes solve the same problem
- Interoperability requires explicit contracts
- Drift across lanes becomes expensive

**Elevates when:** A pattern satisfies elevation criteria (recurrence, portability, drag reduction, testability).

Many cross-lane patterns remain permanently non-canonical — useful, local, and intentionally contextual. Canon is not the goal of all things.

---

### Layer 5: Canon (Durable Truth)

**Scope:** Curated, high-signal rules that survive context changes  
**Durability:** Persists across projects, tools, and time  
**Lives in:** `/canon/**`

Canon is intentionally small. Adding to canon requires:
1. **Recurrence** — appears across multiple attempts/projects
2. **Portability** — remains true across stacks/models/tools
3. **Drag Reduction** — prevents repeated confusion or failure
4. **Testability** — can be expressed as a falsifiable claim

Canon does not grow by accumulation. It grows by curation.

---

## The Percolation Model

Memory does not flow upward automatically. It requires explicit elevation.

```
┌─────────────────────────────────────────────────────────────┐
│                        CANON                                │
│  (Durable truth that survives context changes)              │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ elevation (strict criteria)
                           │
┌─────────────────────────────────────────────────────────────┐
│                   CROSS-LANE PATTERNS                       │
│  (Interfaces, shared contracts, proven interop)             │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ elevation (recurrence across lanes)
                           │
┌───────────────────────┐ ┌───────────────────────┐
│   LANE A              │ │   LANE B              │
│   ├── decisions/      │ │   ├── decisions/      │
│   ├── history/        │ │   ├── history/        │
│   └── attempts/       │ │   └── attempts/       │
└───────────────────────┘ └───────────────────────┘
         ▲                          ▲
         │ elevation                │ elevation
         │ (recurrence,             │ (recurrence,
         │  learning)               │  learning)
         │                          │
    ┌─────────┐                ┌─────────┐
    │ attempt │                │ attempt │
    │ attempt │                │ attempt │
    │ attempt │                │ attempt │
    └─────────┘                └─────────┘
```

Most artifacts die at the attempt layer. That is correct behavior.

---

## Decay Is the Default

Memory preservation has a cost: maintenance, cognitive load, drift risk.

ODD assumes most artifacts should decay:
- Attempts are sealed and may be pruned
- History entries are append-only but finite
- Decisions may be deprecated
- Even canon can be curated down

Discarding is not loss. It is how memory stays useful.

---

## Folder Patterns

Each layer has a consistent folder pattern within lanes:

| Layer | Pattern | Index Style | Authored By |
|-------|---------|-------------|-------------|
| Attempts | `<version>/attempts/attempt-NNN/` | Flat enumeration | Agent or human |
| History | `history/H000X-*.md` | Index table + individual files | Human (post-attempt) |
| Decisions | `decisions/D000X-*.md` | Index table + individual files | Human |

The index + individual files pattern keeps scan cost low while allowing entries to grow.

---

## What Memory Is Not

Memory is not:
- A **changelog** (user-facing release notes)
- A **git log** (commit history)
- A **wiki** (sprawling documentation)

Memory is curated learning that reduces future drag.

---

## Relationship to Other Concepts

| Concept | Relationship |
|---------|--------------|
| Progressive Elevation | The criteria for when something moves up a layer |
| Compiled Memory | Compression of memory into agent-consumable packs |
| Product Lanes | The boundaries within which memory is scoped |
| Epochs | Comparability boundaries when the rules change |

---

## Related Documents

- `/odd/appendices/progressive-elevation.md` — Elevation criteria
- `/docs/appendices/compiled-memory.md` — Compression for agents
- `/docs/appendices/product-lanes.md` — Lane isolation
- `/docs/appendices/attempt-lifecycle.md` — Attempt containment



--------------------------------------------------------------------------------
📄 File: docs/appendices/online-evidence.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/online-evidence
title: Online Evidence Requirement
audience: docs
exposure: nav
tier: 2
voice: authoritative
stability: stable
tags: ["evidence", "cloudflare", "preview", "attempts", "validation"]
---

# Online Evidence Requirement

> Attempts are invalid unless output and evidence are viewable online without running code locally.

## Description

Local builds are allowed during development but do not satisfy the Definition of Done—every attempt must provide a Cloudflare Preview URL and an Evidence URL. The default mechanism is Cloudflare Pages branch preview deployments with attempt branches pushed to origin. Evidence must be exposed via a static hub path at `/_evidence/` or a dedicated Pages project, documented in the lane PRD.

## Outline

- Summary
- Required Online Proof
- Required Mechanism (Default)
- Required Evidence Artifact
- Non-Goals
- Related Documents

---

## Content

## Summary

An attempt is not considered valid unless its output and evidence are viewable online without the author running code locally.

Local builds are allowed during development, but they do not satisfy the Definition of Done for an attempt.

## Required Online Proof

Every attempt MUST provide:

1. **Cloudflare Preview URL** for the attempt branch.
2. **Evidence URL** (an online URL that displays the attempt's evidence artifact).

If either URL is missing, the attempt is **INVALID**.

## Required Mechanism (Default)

The default mechanism is Cloudflare Pages branch preview deployments:

- Each attempt MUST push its branch to `origin`.
- Cloudflare Pages MUST be configured to deploy preview builds for all branches.
- The attempt branch name MUST include the lane so preview URLs are traceable.

## Required Evidence Artifact

Each attempt MUST produce an evidence markdown file:

`/products/<lane>/attempts/prd-vX.Y/attempt-NNN/EVIDENCE.md` (or run-scoped equivalent during `_runs/`)

The repo MUST expose evidence online via one of:

- A static "evidence hub" path served by the lane site at `/_evidence/`, OR
- A dedicated Cloudflare Pages project serving the lane's attempts as static content.

The chosen mechanism must be documented in the lane PRD and enforced in kickoff.

Note: Attempts are lane-contained. Root `/attempts/**` is legacy (read-only).

## Non-Goals

- This does not require production promotion.
- This does not require perfect UI polish.
- It requires that a human can click a link and see the output and evidence.

## Related Documents

- Definition of Done: `/canon/definition-of-done.md`
- Visual Proof Standards: `/canon/visual-proof.md`
- Attempt Lifecycle: `/docs/appendices/attempt-lifecycle.md`
- Preview Guide: `/docs/PREVIEW.md`



--------------------------------------------------------------------------------
📄 File: docs/appendices/product-lanes.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/product-lanes
title: "Product Lanes in Outcome-Driven Development"
audience: docs
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["odd", "prd", "architecture", "lanes", "orientation"]
---

# Product Lanes in Outcome-Driven Development

> Why multiple PRD lanes exist and how they relate in klappy.dev.

## Description

This documents klappy.dev's three product lanes: Website (human-facing orientation), AI Navigation Interface (AI helping humans understand ODD), and Agent Cognitive Skill (reusable agent framework). Each lane has its own PRD at `/docs/PRD/<lane>/PRD.md`, attempts at `/products/<lane>/attempts/`, and independent lifecycle. Lanes share canon, not lifecycle. Implementation surfaces are lane-scoped (`products/<lane>/src` and `products/<lane>/dist`). This prevents scope creep, evidence pollution, and cascading reruns across unrelated products.

## Outline

- Summary
- Why PRDs Must Be Decoupled
- The Three Lanes (Website, AI Navigation, Agent Skill)
- Implementation Surfaces Are Lane-Scoped
- Canon Is Not a Product
- What Is Shared vs Isolated
- Attempt Structure (Locked)
- Anti-Patterns
- Implications for Tooling and Docs
- Scalability

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** Why multiple PRD lanes exist and how they relate

---

## Summary

ODD systems evolve across multiple independent product lanes.

Each lane has its own PRD, attempts, and failure modes.

Lanes share canon, not lifecycle.

---

## Why PRDs Must Be Decoupled

A single PRD governing everything creates cognitive collapse:

- **Different users**: Website serves humans exploring ODD. Agent skill serves AI systems executing ODD.
- **Different success criteria**: "Mobile usable" vs "Can propose a PRD autonomously"
- **Different rates of change**: Website can stagnate while agent skills evolve rapidly.
- **Different evidence**: Screenshots vs decision quality metrics.

Forcing these into one evolutionary track means:

- Progress in one lane forces reruns in another
- Evidence requirements conflict
- Scope creep becomes structural

---

## The Three Lanes

### Lane 1: Public Website (Humans)

**Purpose:** A human-facing orientation surface for ODD.

This is portfolio, explanation, credibility.
It does not teach agents how to think.
It does not execute ODD.
It explains ODD progressively to humans.

**PRD Location:** `/docs/PRD/website/PRD.md`

**Primary User:** Human developers, peers, evaluators

---

### Lane 2: AI Navigation Interface (Humans talking to AI)

**Purpose:** An AI layer over documentation that helps humans understand ODD.

This enables humans to ask questions of the ODD corpus and be:

- Answered accurately
- Guided progressively
- Linked to the right documents
- Without reading everything

This is NOT agent tooling. This is AI helping humans navigate.

**PRD Location:** `/docs/PRD/ai-navigation/PRD.md`

**Primary User:** Humans trying to understand and evaluate ODD

---

### Lane 3: Agent Cognitive Skill (Evolution Engine)

**Purpose:** A reusable agent cognitive framework for ODD reasoning.

This is about how agents think, not what they render.

Enables AI systems to:

- Reason using ODD principles
- Structure PRDs
- Define outcomes and evidence
- Run evolutionary attempts
- Improve their own process over time

This is not tied to this website. It should work on any project.

**PRD Location:** `/docs/PRD/agent-skill/PRD.md`

**Primary User:** AI agents executing evolutionary development elsewhere

---

## Implementation Surfaces Are Lane-Scoped

Each lane is an independent product.

Implementation directories are lane-scoped:

- `products/<lane>/src` (disposable)
- `products/<lane>/dist` (build output)

Repo-root `/src` is not a shared surface in the multi-lane model.

See: `/docs/appendices/lane-implementation-surfaces.md`

---

## Canon Is Not a Product

Canon does not have a PRD.
Canon does not have attempts.
Canon evolves only through decision logs.

Products may render, query, or reason over canon - but never modify it directly.

| Layer    | Coupling                      |
|----------|-------------------------------|
| Canon    | Shared, slow, authoritative   |
| PRDs     | Isolated, fast, disposable    |
| Attempts | Ephemeral, lane-scoped        |
| Tooling  | Canon-aware, lane-agnostic    |

---

## What Is Shared vs What Is Isolated

| Artifact          | Shared Across Lanes? | Notes                                      |
|-------------------|----------------------|--------------------------------------------|
| Canon             | Yes                  | All lanes reference the same constraints   |
| Decision logs     | Yes                  | Architectural decisions affect all lanes   |
| PRDs              | No                   | Each lane has its own PRD                  |
| Attempts          | No                   | Attempts are lane-scoped                   |
| Evidence          | No                   | Success criteria differ per lane           |
| Definition of Done| Partially            | Core DoD applies; lane-specific criteria extend it |

---

## Attempt Structure (Locked)

Every attempt MUST declare a lane before registration.
Attempts without a lane are invalid.

**Folder structure:** `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`

Attempts are **lane-contained** — all artifacts live under the product lane directory.

Valid examples:
- `/products/website/attempts/prd-v1.0/attempt-001/`
- `/products/ai-navigation/attempts/prd-v1.0/attempt-001/`
- `/products/agent-skill/attempts/prd-v1.0/attempt-001/`

Invalid (do not use):
- `/attempts/<lane>/prd-vX.Y/attempt-NNN/` (legacy, read-only)
- `/attempts/prd-vX.Y/<lane>/`
- `/products/<lane>/attempts/attempt-NNN/` (missing PRD version)

---

## Anti-Patterns

### One PRD to Rule Them All

Treating all work as variations of a single product forces:

- Conflicting success criteria
- Evidence that doesn't apply
- Reruns across unrelated changes

### Treating Agents as UI Features

The AI navigation interface (Lane 2) is NOT the same as agent cognitive skill (Lane 3).

- Lane 2: AI helps humans understand
- Lane 3: AI executes ODD autonomously

Mixing these creates scope confusion and evidence pollution.

### Re-running Experiments Across Lanes

A mobile navigation fix (Lane 1) should not invalidate agent skill experiments (Lane 3).

Lane isolation prevents cascading reruns.

---

## Implications for Tooling and Docs

### Where PRDs Live

```
/docs/PRD/
  website/PRD.md
  ai-navigation/PRD.md
  agent-skill/PRD.md
```

### Where Attempts Live

Attempts are lane-contained:

```
/products/
  website/attempts/prd-vX.Y/attempt-NNN/
  ai-navigation/attempts/prd-vX.Y/attempt-NNN/
  agent-skill/attempts/prd-vX.Y/attempt-NNN/
```

Note: Root `/attempts/**` is legacy (read-only). See `/attempts/README.md`.

### How Evolution Propagates

- Canon changes affect all lanes (but rarely change)
- PRD changes affect only that lane
- Attempt outcomes inform only that lane's PRD evolution
- Cross-lane learnings are captured in decision logs, not PRD mutations

---

## Scalability

This architecture is scalable because it is NOT interdependent.

You do not get a monorepo of coupled PRDs.
You get shared canon + independent evolutionary tracks.

This lets you:

- Freeze the website indefinitely
- Rapidly evolve agent skills
- Replace AI navigation entirely
- Add a fourth lane later without touching the others

---

## Related Documents

- Decision log: `/docs/decisions/D0009-multi-lane-prd-architecture.md`
- Attempt lifecycle: `/docs/appendices/attempt-lifecycle.md`
- Evolution philosophy: `/odd/appendices/evolution-not-automation.md`



--------------------------------------------------------------------------------
📄 File: docs/appendices/repo-topology.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/repo-topology
title: "Repository Topology"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "topology", "structure", "decoupling"]
---

# Repository Topology

> What lives where, what changes when, and how concerns stay decoupled.

## Description

The repository separates Application Plane (disposable per attempt), Content Plane (evolves independently), and Infrastructure Plane (persists across attempts). Each product lane owns its implementation under `products/<lane>/src/` with no root-level `/src/` directory. This topology makes restartability cheap by keeping app disposable, content accumulating, infrastructure persisting, and attempts archived.

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
/products/<lane>/src/           # Lane application (disposable per attempt)
/products/<lane>/dist/          # Lane build output (generated)
/products/<lane>/attempts/      # Lane attempts (sealed, immutable after seal)
/canon/                         # Canon documents (evolves independently)
/odd/                           # ODD public docs (evolves independently)
/about/                         # About docs (evolves independently)
/projects/                      # Project docs (evolves independently)
/infra/                         # Infrastructure (persists across attempts)
/docs/                          # Operational docs + PRD versions
/attempts/                      # LEGACY (read-only, see /attempts/README.md)
/public/content/                # Generated (by sync script)
/dist/                          # Legacy/transitional mirror (generated)
```

> **Lane-contained architecture:** Each product lane owns its own app plane under `products/<lane>/src/` and its attempts under `products/<lane>/attempts/`. There is no root-level `/src/` directory. Root `/attempts/` is legacy.

---

## What Lives Where

### Application Plane (`products/<lane>/src/`)

**Disposable per attempt. Lane-scoped.**

Each product lane (website, ai-navigation, agent-skill) has its own application plane:
- `products/website/src/`
- `products/ai-navigation/src/`
- `products/agent-skill/src/`

Contains:
- UI components
- Routing logic
- State management
- Rendering code

This folder can be deleted and rebuilt from scratch for each attempt via `attempt:nuke --lane <lane>`.

### Content Plane (`/canon/`, `/odd/`, `/about/`, `/projects/`)

**Evolves independently of attempts.**

Contains:
- Canon documents
- ODD philosophy
- About pages
- Project documentation

Content changes do not require a new attempt.  
Content is synced to `/public/content/` for the webapp.

### Infrastructure Plane (`/infra/`)

**Persists across attempts.**

Contains:
- Build scripts
- Sync scripts
- Verification scripts
- Deployment configuration

Infrastructure changes rarely.  
When it does, the change benefits all future attempts.

### PRD Versions (`/docs/PRD/`)

**Living drafts.**

Contains:
- PRD drafts and working versions
- PRD template

These are editable until frozen into an attempt.

### Sealed Attempts (`/products/<lane>/attempts/`)

**Lane-contained. Immutable after seal.**

Contains:
- Frozen PRD per version (`prd-vX.Y/PRD.md`)
- Attempt records (`attempt-NNN/`)
- Evidence bundles

Once sealed, these folders are not modified.

Note: Root `/attempts/**` is legacy (read-only). New attempts are lane-contained.

---

## What Changes When

| Change Type | Location | Triggers New Attempt? |
|-------------|----------|----------------------|
| Fix a typo in Canon | `/canon/` | No |
| Add a new ODD appendix | `/odd/` | No |
| Update build script | `/infra/` | No |
| Redesign the UI | `products/<lane>/src/` | Yes (same or new PRD) |
| Add new feature | `products/<lane>/src/` | Yes (requires PRD) |
| Add new content doc | `/about/`, `/projects/` | No |
| Change manifest schema | `/canon/meta/` | No (but may affect app) |

---

## Source of Truth

| Asset | Source | Synced To |
|-------|--------|-----------|
| Content manifest | per-file frontmatter in `/canon/`, `/odd/`, `/about/`, `/projects/` | `/public/content/manifest.json` |
| Markdown content | `/canon/`, `/odd/`, `/about/`, `/projects/` | `/public/content/` |
| PRD (frozen) | `/products/<lane>/attempts/prd-vX.Y/PRD.md` | N/A (immutable) |
| Evidence | `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/evidence/` | N/A (immutable) |

---

## One Active App Per Lane

Each lane contains **one active app implementation** in `products/<lane>/src/`.

Prior attempts are preserved by:
- Git history
- Sealed attempt records in `/products/<lane>/attempts/`
- Commit SHAs in `META.json`

There are no `/app-v1`, `/app-v2` folders.  
There is one `products/<lane>/src/` per lane that gets rebuilt.

---

## Generated vs Source

| Type | Location | How Updated |
|------|----------|-------------|
| Source | `/canon/`, `/odd/`, `/about/`, `/projects/` | Manual edit |
| Generated | `/public/content/` | `npm run sync` |
| Generated | `/products/<lane>/dist/` | `npm run build -- --lane <lane>` |

**Rule:** Edit source, sync generates output.

---

## Deployment Preservation

Each attempt may be deployed as a preview during development. See [Attempt Lifecycle](/docs/appendices/attempt-lifecycle.md) for how deployments fit into the broader attempt model.

Attempt metadata (`META.json`) stores:
- `sealed_commit` — the commit SHA (truth)
- `deploy.production_url` — live site URL (if applicable)
- `deploy.preview_url` — branch/commit preview URL
- `deploy.provider` — deployment platform (e.g., cloudflare-pages)

Preview URLs are treated as evidence artifacts and must be recorded when sealing.

**Resurrection path:** To resurrect any attempt, check out the `sealed_commit` and redeploy. The attempt record contains everything needed.

Branches used during development are ephemeral. The durable record is the commit SHA and recorded URLs, not the branch name.

---

## Summary

- **App is disposable** — rebuilt per attempt
- **Content accumulates** — evolves independently
- **Infrastructure persists** — shared across attempts
- **Attempts are archived** — sealed and immutable
- **PRDs are versioned** — frozen when attempted
- **Deploys are recorded** — preview URLs preserved in metadata

This topology makes restartability cheap and keeps concerns decoupled.

---

**Status:** Appendix stable for v0.1



--------------------------------------------------------------------------------
📄 File: docs/appendices/repo-truth-audit.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/repo-truth-audit
title: "Repo Truth Audit (Epistemic Audit)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "repo-truth", "epistemic", "audit", "drift"]
---

# Repo Truth Audit (Epistemic Audit)

> A repeatable ritual to detect epistemic drift across canon, docs, tooling, and structure.

## Description

Epistemic drift occurs when documentation, tooling, structure, or process encode conflicting truths about how the system works. The audit inventories all sources of truth, identifies contradictions, ambiguities, and deprecated references, then classifies findings and proposes minimum corrective actions. Constraints prohibit inventing new philosophy, rewriting Canon, or fixing by adding more rules—prefer deletion or clarification over expansion.

## Outline

- Definition
- Read the Following FIRST
- Audit Scope
- Your Tasks
- Constraints
- Output Format

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** A repeatable audit ritual to detect epistemic drift across canon, docs, tooling, and structure

---

You are performing a **Repo Truth Audit**.

Your role is **NOT** to implement features.  
Your role is to **detect epistemic drift**.

## Definition

**Epistemic drift** occurs when documentation, tooling, structure, or process encode conflicting truths about how the system works.

---

## Read the Following FIRST (in order)

1. `/docs/appendices/repo-truth.md`
2. `/docs/appendices/product-lanes.md`
3. `/docs/appendices/epochs.md`
4. `/docs/ATTEMPTS.md`
5. `/docs/ATTEMPT_KICKOFF.md`
6. `/docs/AGENT_ENTRYPOINT.md`

---

## Audit Scope

- Canon vs docs vs tooling
- Single-PRD assumptions vs multi-lane reality
- Attempt lifecycle consistency
- Folder structures vs documented invariants
- Terminology consistency (lane, PRD, attempt, epoch, promotion)
- Deprecated concepts that still appear as instructions

---

## Your Tasks

### 1. Inventory all sources of “truth” in the repo

- Canon rules
- Docs procedures
- CLI behavior
- Folder structures

### 2. Identify drift

- Statements that contradict each other
- Instructions that no longer match reality
- Concepts defined in one place but used differently elsewhere
- Dead rules (documented but unenforced)
- Enforced behavior that is undocumented

### 3. Classify findings into

- ❌ Contradiction (must be fixed)
- ⚠️ Ambiguity (should be clarified)
- 🪦 Deprecated but still referenced
- ✅ Consistent and aligned

### 4. For each ❌ or ⚠️ item

- Cite exact file + section
- Explain the conflict
- Propose the *minimum* corrective action
- DO NOT implement yet

---

## Constraints

- Do NOT invent new philosophy
- Do NOT rewrite Canon
- Do NOT fix by adding more rules
- Prefer deletion or clarification over expansion

---

## Output Format

## Repo Truth Audit — Findings

### ❌ Contradictions
- Item 1
- Item 2

### ⚠️ Ambiguities
- Item 1

### 🪦 Deprecated References
- Item 1

### ✅ Verified Alignment
- Item 1

### Recommended Next Actions
- Ordered, minimal steps

If the repository is clean, explicitly say:

“The repository is epistemically aligned.”




--------------------------------------------------------------------------------
📄 File: docs/appendices/repo-truth.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/appendices/repo-truth
title: "Repository Truth & Epistemic Hygiene"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epistemic", "hygiene", "truth", "cleanup"]
---

# Repository Truth & Epistemic Hygiene

> If the repository is dirty, conclusions drawn from it are invalid.

## Description

In AI-assisted development, state residue is indistinguishable from signal—unclean repositories produce false confidence, failures, and learning. A repository is dirty when orphaned worktrees, detached HEADs, stale branches, overlapping attempts, or ambiguous production state exist. `attempt:cleanup` is a reset of epistemic state that guarantees only sealed attempts and intentional branches remain.

## Outline

- Core Principle
- What "Dirty" Means
- `attempt:cleanup` as a Truth Reset
- Why This Matters
- The Truth Boundary
- Branch Roles as Epistemic Contracts
- Orientation Note

---

## Content

## Core Principle

> **If the repository is dirty, conclusions drawn from it are invalid.**

In AI-assisted development, state residue is indistinguishable from signal.
Unclean repositories produce false confidence, false failures, and false learning.

This project treats repository cleanliness as a prerequisite for reasoning.

---

## What "Dirty" Means

A repository is considered dirty when:

- orphaned worktrees exist
- detached HEADs remain
- stale branches survive past their relevance
- attempts overlap in filesystem state
- production state is ambiguous

When this happens, outcomes cannot be trusted.

---

## `attempt:cleanup` as a Truth Reset

`attempt:cleanup` is not housekeeping.

It is a **reset of epistemic state**.

Running cleanup guarantees:

- only sealed attempts remain
- only intentional branches exist
- production state is explicit
- new attempts begin without contamination

Without cleanup, experimentation collapses into folklore.

---

## Why This Matters

Quantum Development relies on comparing independent observations.

Independence is meaningless if the filesystem lies.

Therefore:

- cleanup is mandatory
- residue is failure
- convenience never overrides truth

---

## The Truth Boundary

```
┌─────────────────────────────────────────────────────────────┐
│                     TRUTH BOUNDARY                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   INSIDE (trustworthy)          OUTSIDE (suspect)           │
│   ─────────────────────         ──────────────────          │
│   • prod branch                 • orphaned worktrees        │
│   • main branch                 • detached HEADs            │
│   • sealed attempts             • stale branches            │
│   • explicit state              • filesystem residue        │
│                                                             │
│   `attempt:cleanup` moves everything INSIDE                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Branch Roles as Epistemic Contracts

| Branch | Role | Can Be Nuked? |
|--------|------|---------------|
| `prod` | Production truth | ❌ Never |
| `main` | Experiment ledger | ⚠️ Only via promotion |
| `attempt/*` | Hypotheses | ✅ Always |

These aren't conventions. They're contracts about what can be trusted.

---

## Orientation Note

This document explains *why* the rule exists.
Procedures for enforcing it live elsewhere.

See:
- `/docs/ATTEMPTS.md` — attempt lifecycle procedures
- `/docs/ATTEMPT_KICKOFF.md` — agent kickoff instructions
- `/docs/CLOUDFLARE_CONFIG.md` — deploy branch mapping



--------------------------------------------------------------------------------
📄 File: docs/concept.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/concept
title: "Concept Snapshot"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "implementation", "concept", "overview", "problem-statement"]
---

# 🧠 Concept Snapshot

> **Working Title:** Outcomes-Driven Canon + Evidence-Based Agents

Below is Deliverable 1: Concept Snapshot.

This is intentionally tight, durable, and handoff-ready. It freezes the spine of the idea without dragging along the exploratory noise from this chat.

You can copy this verbatim into a doc, repo, or `/docs/concept.md`.

---

## 1. The Problem

AI coding agents are now capable of generating large amounts of code, UI, and architecture quickly. The limiting factor is no longer generation—it is judgment, consistency, and verification.

In practice, this creates three recurring failures:

**1. Prompt entropy**
- Dozens of fragile prompts and markdown files
- Each tool (Claude Code, Cursor, etc.) requires re-teaching
- Drift over time; nothing is canonical

**2. False completion**
- Agents confidently claim "it works"
- They didn't actually run it
- They didn't verify behavior
- They didn't look at the UI
- A human becomes the QA manager repeating the same objections

**3. Infinite possibility, no curation**
- AI unlocks many valid implementations for the same intent
- Artifacts are increasingly ephemeral
- Maintenance explodes unless abstraction moves up a level

The current workaround—better prompts—does not scale.

---

## 2. Core Insight

The solution is not better prompting.
The solution is a canonical contract.

Instead of embedding "how I think" into prompts, externalize it into a single, versioned source of truth that defines:

- design constraints
- decision rules
- what "done" actually means
- what evidence is required before a claim of success

AI agents must retrieve this canon, translate it into operational constraints, self-audit, and prove compliance with evidence (especially visual) before claiming completion.

This replaces repeated human nagging—not human judgment.

---

## 3. What This Is

This is a system composed of three layers:

**1. Authorial Canon (Human-Facing)**
- First-person documents (website artifacts)
- Constraints, principles, decision rules, QA expectations
- Expresses intent and defaults, not universal law
- Evolves over time

**2. Distribution Layer (MCP)**
- Serves the canon to LLMs and agents
- Provides stable, addressable retrieval
- No duplicated logic or rewritten versions

**3. Agent Contract (Execution-Facing)**
- Agents must:
  - retrieve canon
  - translate first-person intent into neutral constraints
  - build accordingly
  - self-audit
  - produce verification + visual proof
- If evidence cannot be produced, the task is not "done"

---

## 4. What This Is Not

- Not a manifesto meant to convince others
- Not a personality clone or "AI that sounds like me"
- Not a single chat prompt
- Not a magic replacement for judgment or taste
- Not a build system

It is policy + verification, not creativity.

---

## 5. Why MCP Is Involved

MCP is used strictly as a transport and discovery mechanism.

It allows:

- multiple tools to retrieve the same canon
- no re-prompting per environment
- no drift between agents
- explicit provenance ("this rule came from here")

The website remains the canonical source.
MCP exposes it; it does not redefine it.

---

## 6. What "Replace Me" Actually Means

"Replace me" does not mean replacing judgment, creativity, or final responsibility.

It means replacing:

- repeated reminders to follow principles
- repeated questions like "did you actually run it?"
- repeated demands to "prove it visually"

The human role shifts from QA enforcer to reviewer of evidence.

---

## 7. Immediate Outcomes

When this system is in place:

- Prompt sprawl collapses into a single canon
- Agents converge faster
- Failures are explicit instead of hidden
- Autonomous loops improve without human babysitting
- Ephemeral builds are acceptable because outcomes are verified

---

## 8. Why This Matters Now

AI has moved software creation into a space of infinite possibility.
The scarce resource is no longer implementation—it is trustworthy outcomes.

This system treats:

- code as potentially ephemeral
- principles as durable
- verification as mandatory
- curation as the core skill

---

## 9. Next Artifacts (Downstream)

This snapshot feeds directly into:

- an updated PRD
- a first-person canon (constraints, rules, QA contract)
- an agent handoff instruction
- an MCP server design

None of those should re-litigate the ideas above.

---

## ✅ Status

- Concept frozen
- Ready to proceed to Updated PRD



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0001-prod-branch-is-production.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0001
title: "D0001: prod Branch Is Production"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "branch", "deploy"]
---

# D0001 — `prod` Branch Is Production

> Protect production from accidental nuke operations by separating production from experiments.

## Description

The `prod` branch is the sole source of production deployments, while `main` serves as the experiment ledger and history aggregation point. This separation protects production from accidental nuke/reset operations, allows `main` to be freely reset, and makes promotion explicit via merge main → prod. Implementation involves `/infra/scripts/attempt-cli.js` and requires Cloudflare Pages configuration (production branch = `prod`).

## Outline

- Decision statement
- Status: Active
- Why (production protection, experiment isolation)
- Consequences (protection, free reset, explicit promotion)
- Implementation (CLI script, config)
- Evidence (commits)

---

## Content

## Decision

The `prod` branch is the sole source of production deployments. The `main` branch is the experiment ledger and history aggregation point, but never deploys to production directly.

## Status

**Active**

## Why

- Agents running experiments on `main` were accidentally nuking production code
- No clear separation between "what's live" and "what's being tested"
- Need a branch that is **never** touched by experiment tooling
- Production stability requires explicit, intentional promotion

## Consequences

- ✅ Production is protected from accidental nuke/reset operations
- ✅ `main` can be freely reset without affecting live site
- ✅ Promotion to production is explicit: merge main → prod
- ⚠️ Requires Cloudflare Pages configuration change (production branch = `prod`)
- ⚠️ Adds one extra step to the promotion workflow

## Implementation

- Script: `/infra/scripts/attempt-cli.js` (`cmdPromote` merges to main, then fast-forwards prod)
- Config: `/docs/CLOUDFLARE_CONFIG.md` documents the branch mapping
- Contract: `/infra/contracts/build-output.md` defines what must be in `products/<lane>/dist`

## Evidence

- Commit: `15b5c2e` — "feat: environment hardening - prod branch, nuke safety, promote to prod"
- Commit: `0cce06d` — "fix: protect production - nuclear reset on main skips /src nuke by default"
- Problem observed: Production was nuked when running `attempt:reset` on `main`



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0002-attempt-provenance-required.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0002
title: "D0002: Attempt Provenance Required"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "provenance", "model"]
---

# Attempt Provenance Required

> Every attempt must capture model provenance at registration to enable meaningful comparison between AI models.

## Description

This decision mandates that every attempt capture model provenance (agent, model, tool, git HEAD, timestamp) at registration time. If the model is unknown, the system proceeds but flags the degraded provenance. This enables forensic traceability and meaningful comparison between different AI models and approaches.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0002 — Attempt Provenance Required

## Decision

Every attempt must capture model provenance at registration time. If the model is unknown, proceed but flag the degraded provenance clearly.

## Status

**Active**

## Why

- If we can't tell which model produced which attempt, comparisons are contaminated
- "Unknown model" is not the same as "no provenance" — at least we know it's unknown
- Provenance must be captured at registration, not guessed later
- Enables meaningful comparison between different AI models/approaches

## Consequences

- ✅ Every attempt knows: who made it, what made it, where, when
- ✅ Branch names encode provenance: `run/v0.3/cursor-a/opus-45/abc123`
- ✅ META.json preserves provenance even after worktree is deleted
- ⚠️ Agents must provide `--agent` and `--model` flags
- ⚠️ Warning shown if model not provided (but doesn't block progress)

## Implementation

- Script: `/infra/scripts/attempt-cli.js` (`cmdRegister` captures provenance)
- Prompt: `/docs/PROMPT_ATTEMPT_KICKOFF.txt` instructs agents to provide flags
- Schema: `.attempt.json` and `META.json` include provenance fields

### Provenance Fields

| Field | Source | Purpose |
|-------|--------|---------|
| `agent` | `--agent` flag | Human-friendly label (cursor-a, cursor-b) |
| `model` | `--model` flag | AI model identifier (opus-4.5, gpt-4o) |
| `git_head` | Auto-detected | SHA at registration time |
| `worktree_path` | Auto-detected | Filesystem location |
| `branch` | Auto-detected | Git branch name |
| `registered_at` | Auto-generated | ISO timestamp |

## Evidence

- Commit: `8e49616` — "feat: add model provenance tracking to attempt lifecycle"
- Problem observed: Multiple attempts existed but no way to know which AI model made which



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0003-prd-version-auto-detection.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0003
title: "D0003: PRD Version Auto-Detection"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "prd", "version"]
---

# PRD Version Auto-Detection

> PRD version is parsed from source at runtime, eliminating hardcoded version drift in prompts.

## Description

This decision establishes that PRD versions are automatically parsed from `/docs/PRD.md` at runtime rather than hardcoded in operational prompts. When the PRD version changes, prompts don't need updating—the single source of truth in PRD.md is authoritative. A mismatch guard validates any explicit `--prd` flag against the actual PRD.md content.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0003 — PRD Version Auto-Detection

## Decision

The PRD version is automatically parsed from `/docs/PRD.md` at runtime. Operational prompts must never hardcode evolving identifiers like PRD versions.

## Status

**Active**

## Why

- Hardcoded version strings in prompts cause maintenance drift
- When PRD goes from v0.2 → v0.3, the kickoff prompt shouldn't need updating
- Single source of truth: `/docs/PRD.md` is authoritative
- Eliminates "forgot to update the prompt" class of errors

## Consequences

- ✅ Prompts are version-agnostic and future-proof
- ✅ PRD version changes require only one edit (PRD.md)
- ✅ Mismatch guard prevents accidental version divergence
- ⚠️ PRD.md must have parseable version format
- ⚠️ `--prd` flag still accepted but validated against PRD.md

## Implementation

- Script: `/infra/scripts/attempt-cli.js` (`parsePrdVersion()` reads PRD.md)
- Prompt: `/docs/PROMPT_ATTEMPT_KICKOFF.txt` uses `attempt:register` without version
- Guard: If `--prd` is passed and mismatches PRD.md, command fails

### Parseable Formats

The script accepts either:

```markdown
| **PRD Version** | v0.3 |
```

Or:

```markdown
PRD Version: v0.3
```

## Evidence

- Commit: `bcfbf55` — "feat: make attempt:register version-agnostic"
- Problem observed: PRD went to v0.3 but prompt still said v0.2



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0004-repo-truth-cleanup-mandatory.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0004
title: "D0004: Repo Truth & Cleanup Mandatory"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "cleanup", "hygiene"]
---

# Repository Truth: Cleanup Is Mandatory

> A dirty repository invalidates conclusions; cleanup resets epistemic state for valid experiments.

## Description

This decision establishes that repository cleanliness is a prerequisite for valid conclusions in AI-assisted development. Orphaned worktrees, stale branches, and detached HEADs contaminate experiments by making filesystem state indistinguishable from intentional signal. Cleanup after each PRD cycle ensures only sealed attempts and intentional branches remain, preserving the independence that Quantum Development requires.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0004 — Repository Truth: Cleanup Is Mandatory

## Decision

If the repository is dirty, conclusions drawn from it are invalid. Cleanup is not housekeeping — it is a reset of epistemic state.

## Status

**Active**

## Why

- In AI-assisted development, state residue is indistinguishable from signal
- Orphaned worktrees, stale branches, and detached HEADs contaminate experiments
- Quantum Development relies on comparing **independent** observations
- Independence is meaningless if the filesystem lies

## Consequences

- ✅ Only sealed attempts remain after cleanup
- ✅ Only intentional branches exist
- ✅ Production state is explicit
- ✅ New attempts begin without contamination
- ⚠️ Requires discipline: cleanup after each PRD cycle
- ⚠️ Some data loss if worktrees weren't properly submitted

## Implementation

- Script: `/infra/scripts/attempt-cli.js` (`cmdCleanup` prunes worktrees/branches)
- Philosophy: `/docs/appendices/repo-truth.md` documents the principle
- Automation: `attempt:reset` auto-calls cleanup for PRD-specific branches

### What "Dirty" Means

A repository is dirty when:

- Orphaned worktrees exist
- Detached HEADs remain
- Stale branches survive past relevance
- Attempts overlap in filesystem state
- Production state is ambiguous

## Evidence

- Commit: `e7c88aa` — "feat: add attempt:cleanup command for automatic worktree/branch pruning"
- Commit: `5278f2f` — "docs: encode epistemic hygiene as canonical principle"
- Document: `/docs/appendices/repo-truth.md`
- Problem observed: Old worktrees and branches accumulated, making repo state untrustworthy



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0005-nuke-safety-guards.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0005
title: "D0005: Nuke Command Safety Guards"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "nuke", "safety"]
---

# Nuke Command Safety Guards

> Branch-aware safety prevents accidental destruction of production code while preserving attempt branch freedom.

## Description

This decision implements tiered safety guards for the `attempt:nuke` command based on branch context. Production (`prod`) can never be nuked, `main` requires explicit `--force` confirmation, while attempt branches can be freely nuked as they are ephemeral by design. Protected paths like `/canon/`, `/docs/`, and `/infra/` are never deleted even during nuke operations.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0005 — Nuke Command Safety Guards

## Decision

The `attempt:nuke` command has branch-aware safety guards: refuses on `prod`, warns and requires `--force` on `main`, allows freely on `attempt/*` branches.

## Status

**Active**

## Why

- Agents were accidentally nuking production code by running reset on `main`
- Need explicit friction before destructive operations on important branches
- `attempt/*` branches are ephemeral by design — no protection needed
- `prod` is sacred — never allow accidental destruction
- `main` is valuable but restorable — allow with confirmation

## Consequences

- ✅ Production (`prod`) cannot be accidentally nuked
- ✅ Main requires explicit `--force` to nuke
- ✅ Attempt branches can be freely nuked (that's their purpose)
- ⚠️ Agents on wrong branch will see errors (intentional friction)
- ⚠️ Human must intervene if nuke is needed on protected branches

## Implementation

- Script: `/infra/scripts/attempt-cli.js` (`cmdNuke` checks branch before proceeding)

### Branch Safety Rules

| Branch | Nuke Allowed? | Behavior |
|--------|---------------|----------|
| `prod` | ❌ Never | Hard fail with explanation |
| `main` | ⚠️ With `--force` | Warning, requires explicit override |
| `attempt/*` | ✅ Always | Proceeds immediately |
| Other | ⚠️ With `--force` | Warning, requires explicit override |

### Protected Paths (Never Deleted)

Even during nuke, these are never touched:

- `/canon/`
- `/docs/`
- `/attempts/`
- `/infra/`
- `/public/`
- `/.cloudflare/`
- `/.github/`

## Evidence

- Commit: `15b5c2e` — "feat: environment hardening - prod branch, nuke safety, promote to prod"
- Commit: `0cce06d` — "fix: protect production - nuclear reset on main skips /src nuke by default"
- Problem observed: Running `attempt:reset` on `main` deleted production `/src`



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0006-dogfooding-requirement.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0006
title: "D0006: Dogfooding Requirement"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "dogfooding", "validation"]
---

# Dogfooding Requirement

> Agents must apply canon documents to their work, not just read them, validating documentation through actual use.

## Description

This decision mandates that agents building klappy.dev must internalize and apply the canon documents they're showcasing. ATTEMPT.md must demonstrate application of constraints and decision rules through a 9-section self-audit checklist. This validates the documentation itself—if agents can't follow it, the documentation needs fixing.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0006 — Dogfooding Requirement

## Decision

Agents building klappy.dev must actually FOLLOW the canon documents they're showcasing, not just read them. ATTEMPT.md must demonstrate internalization of constraints and decision rules.

## Status

**Active**

## Why

- klappy.dev is a docs site that showcases AI build processes
- If agents don't follow the documented processes, the documentation is unvalidated
- "Read the docs" is not the same as "apply the docs"
- This validates the documentation itself — if agents can't follow it, it needs fixing

## Consequences

- ✅ Documentation is validated by actual use
- ✅ Unclear or contradictory docs get flagged as feedback
- ✅ ATTEMPT.md becomes evidence of process adherence
- ⚠️ More overhead for agents (must document constraint application)
- ⚠️ Self-audit checklist adds 9 sections to ATTEMPT.md

## Implementation

- Prompt: `/docs/PROMPT_ATTEMPT_KICKOFF.txt` specifies dogfooding requirement
- Template: ATTEMPT.md template includes self-audit checklist

### Required Canon Documents

| Document | How to Apply |
|----------|--------------|
| `/canon/constraints.md` | Note which constraints were relevant, any overrides |
| `/canon/decision-rules.md` | Note which rules guided approach choices |
| `/canon/self-audit.md` | Complete all 9 sections in ATTEMPT.md |
| `/canon/definition-of-done.md` | Meet all requirements before claiming completion |

### Self-Audit Checklist (9 Sections)

1. Intended Outcome
2. Constraints Applied
3. Decision Rules Followed
4. Verification Performed
5. Evidence Produced
6. UX and Behavior Check
7. Tradeoffs and Risks
8. Maintainability Check
9. Confidence Level

## Evidence

- Commit: `43e8428` — "feat: add dogfooding requirement - agents must apply canon docs not just read them"
- Commit: `157a2f3` — "feat: bulletproof attempt workflow - mandatory completion gates"
- Problem observed: Agents were reading canon docs but not applying them to their work



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0007-branch-names-are-convenience.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0007
title: "D0007: Branch Names Are Convenience"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "branches", "provenance"]
---

# Branch Names Are Convenience, Provenance Lives in META

> Branch names are optional human convenience; canonical provenance lives in META.json files.

## Description

This decision establishes that branch naming conventions are not authoritative—the canonical record of "who made what" lives in META.json. Since Cursor manages worktrees dynamically and attempt numbers are assigned after finalize, systems cannot rely on specific branch patterns. Cloudflare deploys any branch that builds; docs and tooling must not depend on branch naming conventions.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0007 — Branch Names Are Convenience, Provenance Lives in META

## Decision

Branch names are optional convenience for humans and tooling. The canonical record of "who made what" lives in `META.json`. Cloudflare and the attempt system must not depend on specific branch naming conventions.

## Status

**Active**

## Why

- Cursor manages worktrees and branches dynamically — we can't control names reliably
- Attempt numbers are assigned **after** finalize, not at branch creation
- Agents don't know their attempt number when they start
- Hardcoded branch patterns (like `attempt/prd-v0.2/a001`) were causing doc drift
- Cloudflare deploys any branch that builds — it doesn't parse branch names

## Consequences

- ✅ System is Cursor-proof and future-proof
- ✅ Branch naming can drift without breaking provenance
- ✅ Cloudflare config is simpler (just "any non-prod branch")
- ✅ Docs don't need updating when naming conventions change
- ⚠️ Humans can't infer provenance from branch names alone
- ⚠️ Must check `META.json` to know who made what

## Implementation

- Provenance schema: `.attempt.json` and `META.json` include `tool`, `agent`, `model`, `prd_version`, `run_id`, `git_head`
- Cloudflare: Configured to deploy all non-`prod` branches
- Docs: `CLOUDFLARE_CONFIG.md` describes deploy behavior, not branch naming

### What Gets Namespaced (Durable)

| Field | Location | Purpose |
|-------|----------|---------|
| `prd_version` | META.json | Which PRD |
| `tool` | META.json | cursor, vscode, cli |
| `agent` | META.json | Agent ID within tool |
| `model` | META.json | AI model identifier |
| `run_id` | META.json | Unique identifier |
| `git_head` | META.json | SHA at registration |

### What Does NOT Get Namespaced

- Branch names (convenience only)
- Folder names in worktrees
- Cloudflare subdomain slugs

## Evidence

- Commit: `15dfa26` — "feat: add --tool flag to provenance tracking"
- Document: `/docs/CLOUDFLARE_CONFIG.md` — "Branch names are optional convenience"
- Problem observed: Docs assumed `attempt/prd-v0.2/a001` format, but Cursor doesn't create branches that way



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0008-register-before-nuke.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0008
title: "D0008: Register Before Nuke"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "lifecycle", "provenance", "independence"]
---

# Register Before Nuke

> Registration must precede nuke to preserve provenance before destroying pre-state.

## Description

This decision establishes the mandatory sequence of register → nuke for starting any attempt. Registration captures provenance (agent, model, tool, git HEAD, timestamp) while nuke guarantees independence by deleting inherited code. This order is non-negotiable because nuking before registration loses observer identity and pre-state snapshot, while skipping nuke contaminates outcomes.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0008: Register Before Nuke

**Status:** Active  
**Date:** 2026-01-16  
**Scope:** Attempt lifecycle  

---

## Decision

The required sequence for starting any attempt is:

1. **`attempt:register`** — captures provenance
2. **`attempt:nuke`** — guarantees independence
3. Only then does implementation begin

This order is **mandatory and non-negotiable**.

---

## Why

### If an agent nukes before registering:
- You lose the "observer" identity
- You lose the pre-state snapshot (`git_head`, branch, timestamp)
- You cannot answer: *who did what, with what model, from where?*

### If an agent registers but doesn't nuke:
- You lose independence
- You contaminate outcomes with inherited code
- You lie to yourself about variance between attempts

**Register → Nuke** is the only sequence that satisfies both forensic traceability and experimental purity.

---

## What This Preserves

| Concern | How It's Addressed |
|---------|-------------------|
| Provenance | Registration captures agent, model, tool, git HEAD, timestamp |
| Independence | Nuke deletes `/src` and framework configs — zero inheritance |
| Forensic truth | Pre-state is recorded before it's destroyed |
| Experimental purity | Implementation starts from a true blank slate |

---

## Consequences

1. **Agents cannot skip registration** — attempts without provenance are invalid
2. **Agents cannot skip nuke** — attempts with inherited code are contaminated
3. **The sequence is enforced by documentation and social contract** — tooling may add guardrails but the rule is the rule
4. **META.json becomes the authoritative record** — branch names are convenience, provenance is truth

---

## Implementation Hooks

- `PROMPT_ATTEMPT_KICKOFF.txt`: First actions section explicitly states register → nuke
- `ATTEMPT_KICKOFF.md`: Procedure section documents this order
- `attempt-cli.js`: Could add warnings if nuke is called without prior registration (future enhancement)

---

## See Also

- [D0002: Attempt Provenance Required](./D0002-attempt-provenance-required.md)
- [D0005: Nuke Safety Guards](./D0005-nuke-safety-guards.md)
- [D0006: Dogfooding Requirement](./D0006-dogfooding-requirement.md)



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0009-multi-lane-prd-architecture.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0009
title: "D0009: Multi-Lane PRD Architecture"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "lanes", "prd", "architecture"]
---

# Multi-Lane PRD Architecture

> PRDs are organized into independent product lanes, sharing canon but maintaining separate lifecycles.

## Description

This decision supersedes the single-PRD model by introducing independent product lanes (website, ai-navigation, agent-skill). Each lane has its own PRD, attempts, success criteria, and evidence, while canon remains shared gravity. This prevents scope creep, evidence pollution, and confusion about "done" when products have different users, rates of change, and requirements.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0009: Multi-Lane PRD Architecture

**Status:** Accepted  
**Date:** 2026-01-17  
**Deciders:** Chris Klapp  
**Supersedes:** Single Active PRD rule (formerly in canon/index.md)

---

## Context

The original ODD model assumed a single active PRD at any time (`/docs/PRD.md`). All attempts, evidence, and lifecycle tracked against this single evolutionary line.

This created cognitive collapse when multiple independent products emerged:

1. **Public Website** — human-facing orientation surface
2. **AI Navigation Interface** — AI layer helping humans understand ODD
3. **Agent Cognitive Skill** — agent framework for executing ODD on any project

These have:
- Different users (humans vs AI vs AI-as-tool)
- Different success criteria (screenshots vs citations vs autonomous PRD generation)
- Different rates of change (website can stagnate while agent skill evolves rapidly)
- Different evidence requirements

Forcing them into a single PRD caused:
- Scope creep across unrelated concerns
- Evidence pollution (mobile screenshots don't validate agent reasoning)
- Progress in one area forcing reruns in another
- Confusion about what "done" means

---

## Decision

PRDs are now organized into independent product lanes.

Each lane has:
- Its own PRD at `/docs/PRD/<lane>/PRD.md`
- Its own attempts at `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/` (lane-contained)
- Its own lifecycle, success criteria, and evidence

The three initial lanes are:
- `website` — human-facing UI/UX
- `ai-navigation` — AI over documentation
- `agent-skill` — agent cognitive framework

**Lanes share canon, not lifecycle.**

Canon remains the shared gravity — constraints, decision rules, and definitions that apply to all lanes. Canon evolves via decision logs, not PRDs.

---

## Consequences

### Positive

- **Independence:** Evolve agent skills without touching website PRD
- **Clarity:** Each lane has explicit success criteria
- **Scalability:** Add new lanes without restructuring existing ones
- **Evidence integrity:** Lane-specific evidence stays lane-scoped

### Negative

- **Complexity:** More structure to understand and maintain
- **Tooling updates:** CLI commands now require `--lane` flag
- **Migration:** Existing attempts need mental model adjustment

### Neutral

- **Canon unchanged:** Shared constraints still apply to all lanes
- **Attempt mechanics unchanged:** Same register/nuke/build/seal flow

---

## Constraints

- Every attempt MUST declare a lane before registration
- Attempts without a lane are invalid
- Folder structure is locked: `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`
- No creative variations on attempt folder structure allowed
- Root `/attempts/**` is legacy (read-only)

---

## Related Documents

- `/docs/appendices/product-lanes.md` — full orientation
- `/docs/ATTEMPTS.md` — updated attempt lifecycle
- `/docs/ATTEMPT_KICKOFF.md` — updated workflow with lane declaration



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0010-canonical-agent-kickoff.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0010
title: "D0010: Canonical Agent Kickoff"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "agent", "kickoff", "entrypoint"]
---

# Canonical Agent Kickoff Artifact

> A single authoritative entry point file eliminates agent prompt reconstruction and drift.

## Description

This decision creates `/docs/AGENT_KICKOFF.md` as the only allowed entry point for agent attempts. Rather than expecting agents to compose context from multiple documents, this single file contains all invariants. Humans paste exactly what's in the repo—no external prompts, no helpful context, no reconstruction. The file IS the prompt.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0010: Canonical Agent Kickoff Artifact

**Status:** Accepted  
**Date:** 2026-01-17  
**Deciders:** Chris Klapp  
**Related:** D0009-multi-lane-prd-architecture

---

## Context

After implementing multi-lane PRD architecture (D0009), the agent entry surface became fragmented:

- `/docs/AGENT_ENTRYPOINT.md` — orientation pointers
- `/docs/ATTEMPT_KICKOFF.md` — human workflow with agent notes
- `/docs/ATTEMPTS.md` — lifecycle orientation
- `/docs/appendices/product-lanes.md` — lane architecture

Agents were expected to "compose context" by reading multiple documents. This violated a core principle:

> If it's not in the repo, it doesn't exist.

When a human pastes a "helpful" prompt into Cursor, that prompt is not repo-authoritative. The agent reconstructs intent rather than reading authority.

This creates:
- Drift between what humans think agents should do and what's documented
- Hallucinated procedures based on reasonable-sounding synthesis
- No single source of truth for agent behavior

---

## Decision

Create a single, canonical, copy-pasteable agent kickoff artifact:

**`/docs/AGENT_KICKOFF.md`**

This file:
- Is the ONLY allowed entry point for agent attempts
- Contains all invariants in one place
- Is lane-aware (declares variables, not per-lane copies)
- Explicitly instructs agents to STOP if conflicts are detected

The existing files are rescoped:
- `/docs/AGENT_ENTRYPOINT.md` — now points directly to AGENT_KICKOFF
- `/docs/ATTEMPT_KICKOFF.md` — human workflow only
- `/docs/ATTEMPTS.md` — orientation, not procedure

---

## Consequences

### Positive

- **Single source of truth:** Agents have one authoritative entry point
- **No reconstruction:** Humans paste exactly what's in the repo
- **Conflict detection:** Agents are instructed to stop and report, not guess
- **Scalable:** New lanes are added to the file, not as separate artifacts

### Negative

- **One more file:** Adds to the doc surface area
- **Maintenance:** Must be kept in sync with lane changes

### Mitigations

- AGENT_KICKOFF.md references lane PRDs by path pattern, not hardcoded content
- Lane additions require updating ONE file, not rewriting agent prompts
- File is self-describing: agents can validate it against repo state

---

## The Invariant

If a human wants an agent to start an attempt, they do ONE thing:

> Point the agent at `/docs/AGENT_KICKOFF.md`

No external prompts. No "helpful context." No reconstruction.

The file IS the prompt.

---

## Related Documents

- `/docs/AGENT_KICKOFF.md` — the canonical artifact
- `/docs/AGENT_ENTRYPOINT.md` — now a redirect
- `/docs/appendices/product-lanes.md` — lane architecture
- D0009 — multi-lane PRD architecture



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0011-odd-contract-2.0.0.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0011
title: "D0011: ODD System Contract 2.0.0"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "contract", "version", "epoch"]
---

# ODD System Contract 2.0.0

> Major version bump introduces multi-lane architecture with explicit epoch boundaries.

## Description

This decision formalizes ODD Contract 2.0.0 with the multi-lane architecture, declaring two epochs: E0001-single-prd-era and E0002-multi-lane-era. The contract lives at `/odd/contract.md` and requires epoch_id in META.json for all new attempts. Breaking changes include lane-scoped PRD locations, lane-scoped attempt locations, and required `--lane` tooling flags.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0011: ODD System Contract 2.0.0

## Status

Accepted

## Context

The ODD system evolved from a single-PRD model to a multi-lane architecture. This change affects:

- Directory structure (PRDs, attempts)
- Tooling requirements (lane flags)
- Mental model (products decoupled, canon shared)
- Comparability rules (epochs required)

These changes are not backwards-compatible. Applying 2.x workflows to 1.x structures, or comparing 2.x attempts to 1.x attempts without adjustment, produces invalid conclusions.

The system needed:
1. A single authoritative version for the ODD contract
2. Clear epoch boundaries
3. A path to mark legacy documents without rewriting history

## Decision

1. **Create `/odd/contract.md`** as the single source of ODD system versioning.
2. **Declare contract version 2.0.0** with the multi-lane architecture.
3. **Define two epochs:**
   - E0001-single-prd-era (contract 1.x)
   - E0002-multi-lane-era (contract 2.x)
4. **Require epoch_id in META.json** for all new attempts.
5. **Preserve Epoch 1 artifacts** as historical records, not errors.

## Consequences

### Positive
- Single source of truth for ODD compatibility
- Clear boundary between eras
- Historical artifacts remain valid in their context
- Future major changes have a pattern to follow

### Negative
- Epoch 1 documents may need headers if kept for reference
- Tooling must be epoch-aware for meaningful comparisons
- Slight overhead in declaring epoch during registration

### Neutral
- PRD versions remain lane-local (unaffected)
- Content pack manifest version is separate (unaffected)

## Breaking Changes in 2.0.0

| Category | 1.x | 2.x |
|----------|-----|-----|
| PRD location | `/docs/PRD.md` | `/docs/PRD/<lane>/PRD.md` |
| Attempt location | `/attempts/prd-vX.Y/attempt-NNN/` | `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/` |
| Lane declaration | N/A | Required |
| Epoch declaration | N/A | Required |
| Tooling flags | None | `--lane` required |

Note: Root `/attempts/**` is legacy (read-only). All new attempts are lane-contained under `/products/<lane>/attempts/`.

## Epoch 1 Document Header (Standard)

For documents kept for historical reference that describe 1.x workflows:

```markdown
> **Epoch 1 Document** (ODD Contract ≤1.x)
>
> Kept for historical context. Current workflow is defined by ODD Contract 2.x.
> See `/odd/contract.md` for the current contract.
```

## Related

- `/odd/contract.md` — the contract itself
- `/docs/appendices/epochs.md` — epoch semantics
- `/docs/appendices/product-lanes.md` — lane architecture
- `/docs/decisions/D0009-multi-lane-prd-architecture.md` — the architectural decision



--------------------------------------------------------------------------------
📄 File: docs/decisions/D0012-e0002-transition-interpretation.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0012
title: "D0012: E0002 Transition Interpretation (Truth vs Enforcement Lag)"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "epochs", "lanes", "drift", "interfaces", "tooling"]
---

# E0002 Transition Interpretation (Truth vs Enforcement Lag)

> During epoch transitions, canon defines truth while tooling may temporarily lag behind.

## Description

This decision addresses the expected gap during E0002 transition where truth (canon/PRDs/contracts) advances faster than enforcement (CLI/build scripts). Canon and lane PRDs define intended truth; tooling lag is temporarily permitted but legacy surfaces must be explicitly labeled. Each contradiction requires selecting ONE canonical truth—no "synthesis truth" allowed.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0012: E0002 Transition Interpretation (Truth vs Enforcement Lag)

**Status:** Accepted  
**Date:** 2026-01-17  
**Deciders:** Chris Klapp  
**Related:** D0009-multi-lane-prd-architecture, D0011-odd-contract-2.0.0

---

## Context

The repository has crossed an epoch boundary into **E0002-multi-lane-era** (ODD Contract 2.x).

A repo truth audit surfaced explicit contradictions between:

- Canon + lane PRDs (intended truth for E0002)
- Docs (mixed E0001/E0002 references)
- Tooling + scripts (partially E0001-encoded invariants)
- Interface contracts (claimed E0002 compatibility; some still encode E0001 shapes)

This is expected during transition: truth (canon/PRDs/contracts) can advance faster than enforcement (CLI/build scripts), and historical artifacts can persist.

---

## Decision

During the E0002 transition:

1. **Canon and lane PRDs define intended truth.**  
2. **Tooling and enforcement may lag (mixed-era is permitted temporarily).**  
3. **Legacy surfaces may remain, but MUST be explicitly labeled as legacy (pre-E0002).**  
4. **Comparability across E0001 ↔ E0002 is limited by default.** If lane and epoch metadata are missing, outcomes are **not comparable by default**.
5. **Each surfaced contradiction requires selecting ONE canonical truth before alignment work begins.** No “synthesis truth” is permitted.

---

## Consequences

### Positive

- Preserves historical evidence without rewriting it into the new model
- Prevents folklore by forcing explicit truth selection per contradiction
- Makes mixed-era state explicitly permissible (and therefore auditable)

### Negative

- Temporary cognitive dissonance: documentation and tooling may disagree
- Requires deliberate convergence work (contracts, docs labeling, tooling alignment)

---

## Operational Rules (Minimal)

- **Label, don’t rewrite:** Prefer small “Legacy (pre E0002)” headers/notes over broad edits.
- **Decide before implementing:** For each contradiction, record the canonical truth first; then align docs/contracts/tooling mechanically.
- **No silent drift:** If contradictions exist, they must be citeable and tracked until resolved.




--------------------------------------------------------------------------------
📄 File: docs/decisions/D0013-build-output-lane-scoped-dist.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0013
title: "D0013: Build Output Truth is Lane-Scoped (products/<lane>/dist)"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "lanes", "build", "deploy", "contracts"]
---

# Build Output Truth is Lane-Scoped (products/<lane>/dist)

> Lane builds must output to products/<lane>/dist/, eliminating repo-root collision.

## Description

This decision establishes `products/<lane>/dist/` as the canonical build output location for E0002. Multi-lane architecture requires lane-scoped implementation and deployment surfaces—repo-root `/dist` cannot represent multiple lanes without collision. Each lane build must produce `products/<lane>/dist/index.html` to support independent deployment and promotion.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0013: Build Output Truth is Lane-Scoped (products/<lane>/dist)

**Status:** Accepted  
**Date:** 2026-01-17  
**Deciders:** Chris Klapp  
**Related:** D0009-multi-lane-prd-architecture, D0011-odd-contract-2.0.0, D0012-e0002-transition-interpretation

---

## Decision

For ODD Contract 2.x (E0002), the canonical build output location is:

> **`products/<lane>/dist/`**

Specifically, each lane build MUST produce:

- `products/<lane>/dist/`
- `products/<lane>/dist/index.html`

This is required to support product lanes as first-class, independent products.

---

## Why

- Multi-lane PRD architecture (D0009) requires lane-scoped implementation and deployment surfaces.
- Repo-root `/dist` cannot represent multiple lane builds without collision or ambiguity.
- Lane-scoped output enables per-lane Cloudflare Pages projects and per-lane promotion.

---

## Consequences

- Any references to repo-root `/dist` as a universal requirement are **legacy / transitional** and must be labeled as such until aligned.
- Interface contracts and build tooling must converge mechanically to this truth (tracked as alignment work; not part of this decision).
- Verifiers (future `verify:contracts`) must validate lane-scoped output, not repo-root output.

---

## Scope Notes (Non-Decision)

This decision does not prescribe:

- how the build is implemented (Vite, etc.)
- which lanes require a deployable artifact
- manifest runtime URL conventions

It defines only the canonical output location when a lane produces a deployable build artifact.




--------------------------------------------------------------------------------
📄 File: docs/decisions/D0014-e0003-evidence-first-era.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/D0014
title: "D0014: Declare E0003 Evidence-First Era"
audience: docs
exposure: internal
tier: 2
voice: first_person
stability: stable
tags: ["odd", "epochs", "evidence", "cloudflare", "attempts", "lanes"]
---

# Declare E0003 Evidence-First Era

> Attempts require externally verifiable deployment evidence, not just local build success.

## Description

This decision declares E0003 — Evidence-First Era, requiring attempts to prove success through externally reviewable deployment. An attempt is incomplete until the branch is pushed, Cloudflare preview deploys successfully, and evidence renders at `/_evidence/<run_id>/EVIDENCE.md` with HTTP 200. Attempts that cannot prove deployment must seal as failure.

## Outline

- Decision statement
- Status
- Why
- Consequences
- Implementation
- Evidence

---

## Content

# D0014: Declare E0003 Evidence-First Era

**Status:** Accepted  
**Date:** 2026-01-19  
**Decider:** Klappy  
**Epoch:** E0003  
**Related:** D0009 (Multi-lane PRDs), D0012 (Transition Interpretation), D0013 (Lane-scoped dist), Deploy Evidence (klappy://docs/appendices/deploy-evidence)

## Context

Under E0002, attempts could claim success with local build proof and repository artifacts.

In practice, this created invalid conclusions:

- Cloudflare Pages serves only the configured build output directory
- `/attempts/**` is not served by Pages by default
- Agents completed "successful" attempts that never rendered online
- Evidence URLs were often hypothetical or unverified

The system incentivized local-only success and narrative closure instead of externally reviewable proof.

## Decision

We declare **E0003 — Evidence-First Era**.

In E0003, an attempt is not complete unless:

1) The attempt branch is pushed to origin
2) Cloudflare Pages preview deployment succeeds
3) The preview URL returns HTTP 200 and renders the site
4) The evidence URL returns HTTP 200 and renders evidence at:

`/_evidence/<run_id>/EVIDENCE.md`

Additionally:

- Evidence MUST be copied into the lane build output:
  `products/<lane>/dist/_evidence/<run_id>/`
- Attempts that cannot prove (2)-(4) MUST seal as failure

## Consequences

### Positive

- Prevents "success without deployment"
- Makes evidence externally reviewable and durable
- Forces alignment between docs, tooling, and Cloudflare configuration

### Negative

- Adds operational friction (intentional)
- Increases failure rate until tooling and CF projects are correctly configured

## Compatibility

- E0002 attempts remain valid within E0002.
- E0002 attempts are not comparable to E0003 attempts by default.

## Minimal operational rule

If a preview URL cannot be verified, stop.
No additional work is permitted under a false success state.



--------------------------------------------------------------------------------
📄 File: docs/decisions/README.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions
title: "Implementation Decision Log"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["docs", "decisions", "adr", "implementation", "reference", "index"]
---

# 📜 Implementation Decision Log

Architecture Decision Records (ADRs) specific to the klappy.dev repository implementation.

> **Relationship to ODD/Canon:** Universal principles live in `/odd/`. Program constraints live in `/canon/`. These decisions document specific choices made for this repository's implementation.

---

## ✅ Active Decisions

### Branch & Deploy Model

| ID | Decision | Status |
|----|----------|--------|
| [D0001](./D0001-prod-branch-is-production.md) | `prod` branch is production; `main` is experiment ledger | **Active** |
| [D0005](./D0005-nuke-safety-guards.md) | Nuke command refuses on `prod`, warns on `main` | **Active** |
| [D0007](./D0007-branch-names-are-convenience.md) | Branch names are convenience; provenance lives in META | **Active** |

### Attempt Lifecycle

| ID | Decision | Status |
|----|----------|--------|
| [D0002](./D0002-attempt-provenance-required.md) | Model provenance must be captured at registration | **Active** |
| [D0003](./D0003-prd-version-auto-detection.md) | PRD version auto-detected from lane PRD | **Active** |
| [D0006](./D0006-dogfooding-requirement.md) | Agents must apply canon docs, not just read them | **Active** |
| [D0008](./D0008-register-before-nuke.md) | Register first (provenance), then nuke (independence) | **Active** |
| [D0010](./D0010-canonical-agent-kickoff.md) | Single canonical agent entry point (`AGENT_KICKOFF.md`) | **Active** |

### Architecture

| ID | Decision | Status |
|----|----------|--------|
| [D0009](./D0009-multi-lane-prd-architecture.md) | PRDs organized into independent product lanes | **Active** |
| [D0011](./D0011-odd-contract-2.0.0.md) | ODD System Contract 2.0.0 (multi-lane era) | **Active** |
| [D0012](./D0012-e0002-transition-interpretation.md) | E0002 transition interpretation (truth can lead enforcement) | **Active** |
| [D0013](./D0013-build-output-lane-scoped-dist.md) | Build output truth is lane-scoped (`products/<lane>/dist`) | **Active** |
| [D0014](./D0014-e0003-evidence-first-era.md) | E0003 evidence-first era (deployment proof required) | **Active** |

### Repository Hygiene

| ID | Decision | Status |
|----|----------|--------|
| [D0004](./D0004-repo-truth-cleanup-mandatory.md) | Cleanup is mandatory; dirty repos invalidate conclusions | **Active** |

---

## 🔧 What Makes These Implementation-Specific

These decisions reference:

- Specific file paths in this repository (`/products/`, `/docs/PRD.md`, `/infra/`)
- Specific CLI scripts (`/infra/scripts/attempt-cli.js`)
- Specific branch naming conventions (`prod`, `main`, `attempt/*`)
- Specific tooling (Cloudflare Pages, git worktrees)
- Specific product lane names (`website`, `ai-navigation`, `agent-skill`)

---

## 🔄 How Decisions Are Made

1. **During an attempt**: Agent notes "Decision Delta" in `ATTEMPT.md`
2. **After the attempt**: Human or librarian promotes durable decisions here
3. **If stable**: Decision may be referenced from higher-visibility docs

---

## 📝 Decision File Template

Each decision file follows this structure:

```markdown
# D000X — [Title]

## Decision

[1-2 sentences stating what was decided]

## Status

**Active** | Proposed | Deprecated

## Why

- [Bullet point]
- [Bullet point]

## Consequences

- [What this enables]
- [What this prevents]
- [What this costs]

## Implementation

- Script: `/infra/scripts/...`
- Contract: `/infra/contracts/...`

## Evidence

- Commit: `abc1234`
- Attempt: `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`
```

---

## 🚫 Deprecated Decisions

_None yet._

---

## 🔗 Relationship to ODD and Canon

ODD contains universal principles. Canon contains program constraints. These decisions are the klappy.dev-specific application of those higher-level documents.

| Document | Tier | Related Decisions |
|----------|------|-------------------|
| `/odd/contract.md` | ODD | D0009, D0011, D0012 |
| `/odd/decisions/D0001-three-tier-conceptual-hierarchy.md` | ODD | All (tier separation) |
| `/canon/constraints.md` | Canon | All decisions respect constraints |
| `/docs/appendices/epochs.md` | Docs | D0012, D0014 |



--------------------------------------------------------------------------------
📄 File: docs/decisions/TEMPLATE.md
--------------------------------------------------------------------------------

---
uri: klappy://docs/decisions/template
title: "Decision Template"
audience: docs
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["template", "decision", "adr"]
---

# Decision Template

> ADR-lite template for recording architectural and process decisions.

## Description

This template defines the standard structure for decision records. Decisions document the "why" behind choices that affect the repository, products, or processes. Use this for both `/docs/decisions/` (implementation choices) and `/odd/decisions/` (universal principle choices).

## Outline

- When to Create a Decision
- Numbering Convention
- Template Structure
- Frontmatter by Location

---

## When to Create a Decision

Create a decision record when:

- A choice affects multiple files or systems
- The reasoning would be lost without documentation
- Someone might ask "why did we do it this way?"
- A constraint or rule is being established

Do NOT create a decision record for:

- Trivial implementation choices
- One-off fixes
- Temporary workarounds

---

## Numbering Convention

| Location | Format | Example |
|----------|--------|---------|
| `/docs/decisions/` | `D00XX-slug.md` | `D0015-cache-invalidation.md` |
| `/odd/decisions/` | `D00XX-slug.md` | `D0002-memory-portability.md` |

Numbers are sequential within each folder. Check the folder's README for the next available number.

---

## Frontmatter by Location

### For `/docs/decisions/` (implementation choices)

```yaml
---
uri: klappy://docs/decisions/D00XX
title: "D00XX: Decision Title"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["docs", "decisions", "topic"]
---
```

### For `/odd/decisions/` (universal principle choices)

```yaml
---
uri: klappy://odd/decisions/D00XX
title: "D00XX: Decision Title"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "decisions", "philosophy", "topic"]
---
```

---

## Template Structure

```markdown
---
uri: klappy://<tier>/decisions/D00XX
title: "D00XX: Decision Title"
audience: docs | canon
exposure: internal | nav
tier: 1 | 2
voice: neutral
stability: stable
tags: ["decisions", "topic"]
---

# D00XX — Decision Title

> One-line summary of what this decision establishes.

## Description

2-3 sentence compressed overview. What was decided? Why does it matter?
This should be self-contained for LLM context.

## Outline

- Decision
- Status
- Context
- Consequences
- Implementation
- Evidence

---

## Decision

[Clear statement of what was decided. Use active voice.]

## Status

**Active** | **Superseded by D00YY** | **Deprecated**

## Context

[Why did this decision need to be made? What problem prompted it?]

## Consequences

- ✅ Positive consequence
- ✅ Another positive
- ⚠️ Tradeoff or cost
- ⚠️ Another tradeoff

## Implementation

[Where is this decision implemented? Files, scripts, configs.]

- Script: `/path/to/script.js`
- Config: `/path/to/config.md`

## Evidence

[What triggered this decision? Commits, incidents, observations.]

- Commit: `abc1234` — "commit message"
- Problem observed: [description]
```

---

## Status Values

| Status | Meaning |
|--------|---------|
| **Active** | Currently in effect |
| **Superseded** | Replaced by another decision |
| **Deprecated** | No longer recommended |
| **Proposed** | Under consideration |

---

## See Also

- [Decisions Index](./README.md) — Implementation decisions index
- [ODD Decisions](/odd/decisions/README.md) — ODD decisions index



--------------------------------------------------------------------------------
📄 File: docs/infra/cloudflare-branch-deploys.md
--------------------------------------------------------------------------------

# ☁️ Cloudflare Pages — Branch Deploys (Observation Infrastructure)

This document describes how branch deploys support observation and rollback.

It is infrastructure documentation, not Canon.

---

## 🌿 Branch Naming Convention

Use one branch per attempt:

```
attempt/prd-vX.Y/aNNN
```

Examples:

```
attempt/prd-v0.2/a001
attempt/prd-v0.2/a002
```

---

## 🔗 Preview Deploy Expectation

- Each attempt branch SHOULD produce a Cloudflare Pages preview deployment.
- Preview URLs are treated as evidence artifacts (views), not truth.

---

## 📎 Recording Deploy Evidence in META.json

When sealing an attempt, record deploy evidence in the attempt `META.json`:

- `deploy.provider`: `cloudflare-pages`
- `deploy.preview_url`: preview deployment URL (when available)
- `deploy.production_url`: production URL (when relevant)
- `deploy.captured_at`: date captured

---

## 🏷️ "Every Tag Has a Branch" (Optional Policy)

If rollback speed is a priority, adopt this policy:

- For each sealed attempt tag, keep a branch that points to the same commit.
- The branch exists to make resurrection and preview redeploy trivial.

This is optional because:
- the commit SHA remains the truth
- long-lived branches are not always desirable early

---

## 🔮 Rollback Model (Intent)

Rollback is achieved by returning production to a known commit (usually a previously sealed attempt).

The practical mechanism (re-deploying a commit, retargeting, or reverting) is less important than:
- the sealed commit SHA
- the evidence bundle
- the ability to reproduce the build




================================================================================
## Canon
================================================================================



--------------------------------------------------------------------------------
📄 File: canon/CHANGELOG.md
--------------------------------------------------------------------------------

---
uri: klappy://meta/changelog
title: "Canon Changelog"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["meta", "changelog", "versioning"]
---

# 📜 Canon Changelog

This changelog tracks changes to the **Canon pack** as a whole.

The Canon uses **pack-level versioning** (one version number) rather than per-file versioning.
Per-file versions are intentionally omitted to reduce ceremony and prevent metadata rot.

## 0.8.0 — 2026-01-21

**Cognitive Partitioning — Agent Scaling Concepts**

This release adds a three-tier documentation set explaining why reasoning systems must divide under pressure as they scale.

### Added

- **ODD Concept:** `odd/cognitive-partitioning.md` (tier 1)
  - Universal principle: decision complexity grows faster than execution capability
  - Explains the failure mode when reasoning systems have too many valid actions
  - Analogy: hiring too early (startups that hire ahead of demonstrated need)

- **Canon Pattern:** `canon/odd/appendices/tool-specialization.md` (tier 2)
  - General pattern for preserving reliability as tool availability increases
  - Invariants: isolation precedes orchestration, outputs must be explicit and promotable
  - Tradeoffs: coordination overhead, risk of premature specialization

- **Docs Implementation:** `docs/agent-architecture/sub-agents.md` (tier 2)
  - Reference implementation: how klappy.dev applies cognitive partitioning
  - Pairing rule: if a tool increases decision complexity more than it reduces execution cost, pair it with a sub-agent
  - Scope contract: one responsibility, explicit outputs, no scope creep without evidence

### Changed

- **canon/README.md** — Added ODD Appendices (Patterns) section linking to Tool Specialization
- **odd/index.md** — Added Cognitive Partitioning to contents table
- **odd/orientation-map.md** — Added See Also section linking to Cognitive Partitioning
- **docs/README.md** — Added agent-architecture/ subfolder to contents

### Philosophy

- Three-tier hierarchy maintained: ODD (universal) → Canon (pattern) → Docs (implementation)
- Progressive disclosure tiers: ODD concept at tier 1, Canon/Docs at tier 2
- Cross-links use relative paths for portability
- Docs layer intentionally NOT synced to public manifest (repo-internal reference)

---

## 0.7.0 — 2026-01-21

**Doc Inclusion Audit — README Indexes and Derived Output Hygiene**

This release cleans up documentation inclusion rules, adds navigational README indexes to key folders, and explicitly separates derived outputs from source truth.

### Added

- **README indexes** for navigable folders (progressive disclosure structure with Description/Outline):
  - `about/README.md` (audience: public) — Author orientation
  - `visual/README.md` — Visual design system index
  - `infra/README.md` — Infrastructure and tooling index
  - `infra/prompts/README.md` — Reusable prompt templates index
  - `products/website/README.md` — Website lane index
  - `products/ai-navigation/README.md` — AI Navigation lane index (sparse/planned)
- **Derived Outputs section** in `docs/TRUTH_MAP.md` — Explicit rules for derived paths (`public/_compiled`, `public/content`, `public/agent-skill`)

### Changed

- **export-book.js** — Added exclusions for `public/_compiled` and `public/agent-skill` (prevents derived artifacts in book export)
- **docs/PRD.md** — Converted from legacy PRD content to a PRD Index routing to active lane PRDs
- **docs/PRD/website/PRD-legacy-v0.3.md** — Added deprecation frontmatter and header
- **infra/compile/plans/website/visitor.json** — Expanded sources, added `odd/appendices/progressive-elevation.md`, tier-ordered (ODD → Canon → Docs)
- **infra/compile/plans/website/author.json** — Fixed output path consistency (`public/_compiled/website/author-pack.md`), expanded sources, tier-ordered

### Philosophy

- README-as-index pattern enables progressive disclosure at folder level
- Derived outputs are explicitly documented as wipeable and non-authoritative
- Compile packs use tier ordering (ODD first, Canon next, Docs last) for coherent context
- Book exports exclude derived artifacts to prevent source/generated confusion

### Notes

- READMEs use progressive disclosure structure: Frontmatter, H1, Blockquote Subtitle, Description, Outline, Content
- `about/README.md` uses `audience: public` since it contains user-facing content (not docs)
- Compile plans now include `progressive-elevation.md` as it explains the portability ladder

---

## 0.6.1 — 2026-01-21

**Docs Epistemic Hygiene**

This release brings `/docs/` into full alignment with the three-tier hierarchy, adding consistent frontmatter, correct tier labels, and emoji standardization across all documentation files.

### Fixed

- **canon/README.md** — Removed broken `/canon/odd/` subfolder reference (ODD is now at root level), fixed stale paths to `/docs/appendices/`, added "See Also" section linking to `/odd/`
- **docs/appendices/README.md** — Changed "Canon Appendix" to "ODD Appendix", fixed paths to use absolute `/odd/appendices/` references
- **docs/decisions/README.md** — Changed "Canon Document" tier labels to correctly identify ODD vs Canon vs Docs tiers

### Changed

- **docs/TRUTH_MAP.md** — Complete rewrite with frontmatter, three-tier hierarchy section explaining ODD/Canon/Docs authoritative structure, updated sources distinguishing ODD vs Docs decisions
- **docs/README.md** — Added emoji headers throughout for visual hierarchy

### Added

- **YAML frontmatter** to 11 workflow docs that were missing it:
  - `ATTEMPTS.md`, `AGENT_KICKOFF.md`, `AGENT_ENTRYPOINT.md`, `ATTEMPT_KICKOFF.md`
  - `PREVIEW.md`, `CLOUDFLARE_CONFIG.md`, `DISTILLATION_CLASSIFICATION.md`
  - `PRD.md`, `ATTEMPT_RECORD_PACK.md`, `WHAT_THIS_REPO_IS_NOT.md`, `concept.md`
- **Emoji headers** standardized across docs for visual scanning

### Philosophy

- All `/docs/` files now have consistent YAML frontmatter (uri, title, audience, tier, stability, tags)
- Tier labels correctly distinguish ODD (universal) from Canon (program) from Docs (implementation)
- Cross-references correctly point to the right tier
- Emoji usage is consistent with files like `ATTEMPTS.md` and `CLOUDFLARE_CONFIG.md`

---

## 0.6.0 — 2026-01-21

**Three-Tier Hierarchy & ODD Elevation**

This release formalizes the three-tier conceptual hierarchy and physically restructures the repository to match the mental model.

### Breaking Changes

- **ODD moved to root level**: `/canon/odd/` → `/odd/`
- **URIs changed**: `klappy://canon/odd/*` → `klappy://odd/*`
- **All references updated** throughout the repo

### Added

- **D0001: Three-Tier Conceptual Hierarchy** (`/odd/decisions/D0001-three-tier-conceptual-hierarchy.md`) — Formalizes ODD (universal principles) → Canon (program constraints) → Docs (implementation details)
- **Three-tier section in ODD Contract** — Contract bumped to 2.1.0 with hierarchy documentation
- **Litmus test** for file classification: 10-year truth test → ODD, all-products test → Canon, local test → Docs

### Changed

- **ODD System Contract** — Bumped to 2.1.0 with three-tier hierarchy section
- **orientation-map.md** — Now includes the three-tier hierarchy and litmus test
- **progressive-elevation.md** — Elevated from `/docs/appendices/` back to `/odd/appendices/` (it defines the portability ladder itself)

### Philosophy

- **ODD = physics** — Universal principles that would still be true if klappy.dev didn't exist
- **Canon = constitution** — Program-level constraints derived from ODD, shared across products
- **Docs = implementation** — How this instance works, lane PRDs, CLI commands, Cloudflare specifics

### Migration Notes

- All cross-references have been updated
- Historical files (CHANGELOG, attempt evidence) retain old paths as historical record
- Compile plans updated to use new paths
- Run `npm run sync` to regenerate public/content/

---

## 0.5.4 — 2026-01-21

**README Index Pattern**

This release introduces scannable README.md files for all canon folders, enabling tree-shaking of memory into guide packs without reading every file.

### Added

- **canon/README.md** — Top-level canon index with contents table, meta rules, confidence scores
- **canon/odd/README.md** — ODD folder index with core thesis
- **canon/odd/appendices/README.md** — 24 appendices indexed with one-line summaries
- **canon/odd/decisions/README.md** — Renamed from index.md, same content + emojis

### Changed

- **failure-driven-modularity.md** — Moved from `canon/evolution/` to `canon/odd/appendices/` (single file doesn't need its own folder)
- **prd-guide compile plan** — Now includes folder READMEs instead of specific appendices; agents get scannable summaries without full content
- **Emojis** — Consistent emoji headers added to all README/index files

### Removed

- **canon/evolution/** — Folder removed (contained only one file)
- **canon/index.md** — Replaced by README.md

### Philosophy

- README.md serves as both orientation AND scannable index
- Contents tables enable tree-shaking: agents can see what exists without reading everything
- Pack compilation can include folder READMEs for summaries instead of all individual files
- One file per folder is overhead; promote to parent or appropriate collection

### Notes

- This pattern enables the prd-guide-pack to include appendices summary (~500 tokens) instead of full appendices (~20K tokens)
- Agent-skill decisions/index.md also renamed to README.md for consistency

---

## 0.5.3 — 2026-01-21

**Memory Architecture Proposal**

This release proposes the Memory Architecture appendix and establishes the lane history folder pattern in agent-skill.

### Added

- **Memory Architecture (Proposed)** (`/canon/odd/appendices/memory-architecture.proposed.md`) — Defines memory as a layered percolation system: Attempts → Lane History → Lane Decisions → Cross-Lane Patterns → Canon. Makes decay the default and elevation explicit.

### Changed

- **Agent-Skill Lane** — Replaced single `LEDGER.md` with indexed `history/` folder pattern (mirrors `decisions/` pattern)
  - D0008: ROADMAP tracks vision only, not status
  - D0009: History folder pattern with index + individual entry files
  - Migrated all LEDGER entries to `history/H000X-*.md` files
  - Removed Learnings Log from ROADMAP (now lives in history/)

### Philosophy

- Memory is the percolation path from ephemeral execution to durable truth
- Decay is the default; elevation requires explicit criteria (recurrence, portability, drag reduction, testability)
- "Evidence without elevation creates false confidence rather than learning"
- Canon is not the goal of all things — many patterns remain usefully non-canonical

### Notes

- Memory Architecture is `proposed` status until at least one more lane adopts the pattern
- The history/ folder pattern reduces agent scan cost (~500 tokens for index)
- This release demonstrates ODD working: frustration → lane decision → proposed canon

---

## 0.5.2 — 2026-01-20

**Lane-Contained Attempts**

This release consolidates attempt artifacts under the product lane directory, eliminating the dual-location ambiguity between `/attempts/<lane>/` and `/products/<lane>/attempts/`.

### Changed

- **Canonical attempt location** is now `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/`
- **attempt-cli.js** — All path constructions updated to lane-contained format
- **product-lanes.md** — Attempt structure section updated
- **online-evidence.md** — Evidence artifact path updated
- **progressive-elevation.md** — Ephemeral layer path updated
- **repo-topology.md** — Core topology and source of truth tables updated
- **attempt-lifecycle.md** — Multiple sections updated to lane-contained paths
- **contract.md** — Breaking changes list updated
- **D0009** — Constraints section updated
- **D0011** — Breaking changes table updated
- **ATTEMPTS.md** — Folder structure section rewritten
- **ATTEMPT_KICKOFF.md** — Artifact locations updated with completion gates
- **AGENT_KICKOFF.md** — Evidence path updated
- **BOOTSTRAP.md** — Evidence URL example updated
- **Website kickoff prompt** — Explicit lane-contained rule added

### Added

- **attempts/README.md** — Legacy marker explaining root `/attempts/**` is read-only
- **products/website/attempts/README.md** — Lane-contained structure documentation

### Philosophy

- **KISS:** One place per lane, no scavenger hunts
- **Lane-contained:** Everything for a lane lives under `/products/<lane>/`
- **Legacy preserved:** Root `/attempts/**` remains for historical provenance (read-only)

### Notes

- Generated files (`/public/content/**`, `klappy-dev-book-export.md`) will update on next sync
- Tooling now writes exclusively to `/products/<lane>/attempts/...`

---

## 0.5.1 — 2026-01-20

**Media as a Learning Layer**

This release introduces the media philosophy appendix and integrates it into the Website PRD.

### Added

- **Media as a Learning Layer** (`/canon/odd/appendices/media-as-learning-layer.md`) — Defines media as optional, regenerable, and progressively disclosed; text remains canonical

### Changed

- **Canon Index** — Added media-as-learning-layer to Edge Cases bullet list and appendices structure tree
- **Website PRD** — Bumped to v1.1; added Media (Learning Layer) section with initial asset scope and requirements; added media philosophy to Related Documents

### Philosophy

- Canonical truth lives in text; media supports understanding but does not define it
- Clarity is the default, not any specific media format
- Media is opt-in (progressive disclosure), never autoplayed
- Media is created only for stable content to prevent re-record churn

### Notes

- This pass is canon + PRD only; UI implementation is a separate attempt
- Initial media assets declared for Home and ODD pages

---

## 0.5.0 — 2026-01-19

**E0003 — Evidence-First Era**

This release declares E0003, a new epoch where online deployment evidence is mandatory for attempt completion.

### Added

- **E0003 epoch declaration** in `/canon/odd/appendices/epochs.md`
- **D0014 decision log** (`/canon/odd/decisions/D0014-e0003-evidence-first-era.md`) — Documents the epoch transition
- **Evidence copying in smart-build.js** — Automatically copies `products/<lane>/attempts/prd-vX.Y/_runs/` and `attempt-NNN/` folders into `products/<lane>/dist/_evidence/`

### Changed

- **ATTEMPT_KICKOFF.md** — Added E0003 completion rule section at top
- **attempt-cli.js** — Default epoch is now `E0003-evidence-first-era`

### Breaking Changes (Epoch Transition)

- Local builds are no longer sufficient proof for attempt completion
- Attempts must provide HTTP 200 preview URL AND evidence URL
- E0002 attempts are not comparable to E0003 attempts

### Philosophy

- The fitness landscape changed: success is now gated by deployment correctness
- Evidence must be externally reviewable, not locally asserted
- If a preview URL cannot be verified, stop

### Notes

- E0002 attempts remain valid within E0002
- Cloudflare Pages must be configured with correct build command and output directory

---

## 0.4.10 — 2026-01-19

**Deploy Evidence — Evidence Must Be in Build Output**

This release clarifies that evidence must be copied into the build output so Cloudflare Pages can serve it.

### Added

- **Deploy Evidence** (`/canon/odd/appendices/deploy-evidence.md`) — Explains that Cloudflare only serves the build output directory, so evidence must be copied into `products/<lane>/dist/_evidence/<run_id>/`

### Changed

- **Website Kickoff Prompt** (`/infra/prompts/attempt-kickoff/website.md`) — Added "Completion Criteria (Non-Negotiable)" and "Evidence Publishing Rule" sections

### Philosophy

- Cloudflare Pages does NOT serve `/attempts/**` from the repo
- Evidence URLs pointing to `/attempts/**` on a Pages domain are invalid
- Evidence must be copied into `products/<lane>/dist/_evidence/<run_id>/` to be accessible
- The evidence URL is then `/_evidence/<run_id>/EVIDENCE.md` on the preview site

### Notes

- This is an addendum to 0.4.9 (Online Evidence Requirement)
- Together they enforce: push branch + build succeeds + preview URL works + evidence URL works

---

## 0.4.9 — 2026-01-19

**Online Evidence Requirement**

This release makes online evidence a hard requirement for valid attempts. "Works on my machine" is no longer acceptable.

### Added

- **Online Evidence Requirement** (`/canon/odd/appendices/online-evidence.md`) — Defines why attempts without Cloudflare Preview URLs and Evidence URLs are invalid
- **Online Evidence section in Website PRD** — DoD now includes preview URL and evidence URL requirements

### Changed

- **ATTEMPT_KICKOFF.md** — Added "Online Evidence Requirement (Non-Negotiable)" section with explicit invalid conditions
- **BOOTSTRAP.md** — Rewritten to enforce online evidence requirement; agents must report URLs in their first output
- **Website PRD Definition of Done** — Added Cloudflare Preview URL and Evidence URL as required checklist items
- **Canon Index** — Added online-evidence.md to appendices list

### Philosophy

- Local builds are allowed during development but do not satisfy Definition of Done
- If an agent cannot push and produce URLs, the attempt is invalid
- "Works on my machine" is not evidence — it's a prayer
- Evidence must be viewable online without the author running code locally

### Notes

- Cloudflare Pages must be configured with correct build command (`npm run build -- --lane <lane>`)
- Branch naming now includes lane (enforced in 0.4.8) so preview URLs are traceable

---

## 0.4.8 — 2026-01-19

**Lane-Aware Branch Naming & Cloudflare-Compatible Builds**

This release enforces lane-aware branch naming and fixes Vite build paths for Cloudflare compatibility.

### Added

- **Preview Guide** (`/docs/PREVIEW.md`) — Local and Cloudflare preview workflows with troubleshooting
- **Branch validation** in `attempt:register` — Refuses invalid branch prefixes and validates lane inclusion

### Changed

- **smart-build.js** — Uses `cwd` instead of `vite --root` for lane builds (Cloudflare-compatible)
- **attempt-cli.js** — Branch format now includes lane: `run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>`
- **attempt:register** — Refuses on `main`/`prod` branches; refuses branches not starting with `run/` or `attempt/`
- **attempt:nuke** — Now requires `.attempt.json` to exist (enforces register-before-nuke workflow)
- **BOOTSTRAP.md** — Expanded with explicit branch format requirements and required reading list
- **ATTEMPT_KICKOFF.md** — Added link to PREVIEW.md in Related Documents

### Philosophy

- Branch naming is no longer optional — tooling enforces lane inclusion
- Build paths use `cwd` instead of `--root` to avoid Cloudflare path resolution issues
- Registration must happen before nuke to ensure provenance is captured

### Notes

- Cloudflare Pages projects must set build command to `npm run build -- --lane <lane>`
- Output directory must be `products/<lane>/dist`

---

## 0.4.7 — 2026-01-19

**Canonical Lane Kickoff Prompts**

This release introduces reusable, in-repo prompt files for attempt kickoffs, eliminating one-off prompt drift.

### Added

- **Website Lane Kickoff** (`/infra/prompts/attempt-kickoff/website.md`) — Canonical kickoff prompt for website lane attempts with locked order, scope guards, and evidence requirements
- **Bootstrap Prompt** (`/infra/prompts/attempt-kickoff/BOOTSTRAP.md`) — Minimal instructions for agents to read the lane kickoff file verbatim

### Changed

- **ATTEMPT_KICKOFF.md** — Added "Canonical Lane Kickoff Prompts" section documenting all lane prompt paths

### Philosophy

- Prompts live in-repo, not in chat history
- One prompt per lane, no one-off variations
- Bootstrap pattern keeps Cursor paste minimal: `Use /infra/prompts/attempt-kickoff/BOOTSTRAP.md, lane = website.`
- Lane kickoff files are canonical and intentionally changed (decision log if needed)

### Notes

- AI-navigation and agent-skill lane kickoff files can be added later using the same pattern
- This is infrastructure for prompt hygiene, not a behavioral change

---

## 0.4.6 — 2026-01-19

**Pre-commit Hook for Content Compilation**

This release adds automated content compilation via a pre-commit git hook, ensuring synced content and book exports stay current with every commit.

### Added

- **Husky** (`husky@9.1.7`) — Git hook management as dev dependency
- **Pre-commit hook** (`.husky/pre-commit`) — Runs content sync and book export before each commit
- **Book export script** (`npm run book`) — Generates `klappy-dev-book-export.md` from all documentation

### Changed

- **package.json** — Added `book` and `prepare` scripts
- **Content frontmatter** — Added missing YAML frontmatter to ensure all intended docs are included in the generated content manifest (eliminates orphan warnings)

### Behavior

On every `git commit`:
1. `npm run sync` runs (copies content to `/public/content/`, generates `manifest.json`)
2. `npm run book` runs (generates `klappy-dev-book-export.md`)
3. Generated files are auto-staged for inclusion in the commit
4. If either script fails, the commit is blocked

---

## 0.4.5 — 2026-01-18

**Canonical Compression Model**

This release introduces the compilation model for producing derived, minimal working models from Source Canon without mutating source truth.

### Added

- **Canonical Compression** (`/canon/odd/appendices/canonical-compression.md`) — Defines how compiled outputs are produced as derived artifacts that are disposable and epoch-scoped
- **Compiled output directory** (`/canon/_compiled/epoch-E0002/`) — Prepared structure for future compilation tooling with warning README
- **Progressive Elevation frontmatter** — Fixed missing frontmatter fields to ensure proper manifest inclusion

### Changed

- **Canon Index** — Added canonical-compression to ODD Appendices list
- **Manifest** — Added canonical-compression and progressive-elevation resource entries

### Philosophy

- Source Canon remains authoritative and unchanged
- Compiled outputs are derived artifacts that can be deleted without loss of truth
- Compression is compilation, not mutation
- Epoch-scoping prevents "half-updated working models" from lingering

### Notes

- Implementation of `canon:compile` tooling is tracked separately
- Compiled outputs live in `_compiled/` and are intentionally wipeable

---

## 0.4.4 — 2026-01-18

**Memory & Portability Model**

This release makes the progressive elevation and decay model explicit, documenting how artifacts move from ephemeral to durable layers.

### Added

- **Progressive Elevation & Decay** (`/canon/odd/appendices/progressive-elevation.md`) — The five layers of portability (Conversation/Attempt, PRD, Contracts, Canon, Decision Trace) and strict elevation criteria
- **Memory Is the Bottleneck** section in ODD Manifesto — Explains how ODD treats durable thinking as scarce and generated artifacts as abundant
- **WHAT_THIS_REPO_IS_NOT.md** (`/docs/WHAT_THIS_REPO_IS_NOT.md`) — Human-facing clarification about what this repository intentionally is not
- **Agentic Memory Portability** project (`/projects/agentic-memory-portability.md`) — Project entry describing the memory portability goal

### Changed

- **ODD Manifesto** — Added "Memory Is the Bottleneck" section before "Relationship to Canon"
- **Canon Index** — Added progressive-elevation.md to ODD Appendices list
- **README** — Added links to WHAT_THIS_REPO_IS_NOT.md and agentic-memory-portability.md under "If You Want to Explore"

### Philosophy

- Most artifacts should decay; only proven patterns that repeatedly reduce drag should elevate
- Documentation sprawl is avoided by intentional decay at the Attempt/PRD layer
- Portability across time, people, and agents requires strict elevation criteria (recurrence, portability, drag reduction, testability)

---

## 0.4.3 — 2026-01-18

**E0002 Convergence: Lane-Scoped Build Output**

This release locks and begins converging the canonical build output truth for E0002 lanes:

> `products/<lane>/dist/` is canonical. Repo-root `/dist` is legacy/transitional.

### Added

- **D0012** — E0002 transition interpretation (truth may lead enforcement; contradictions are tracked)
- **D0013** — Build output truth is lane-scoped (`products/<lane>/dist`)

### Changed

- **Build output interface contract** — MAJOR bump to `build-output@3.0.0` to require lane-scoped output and clarify runtime manifest path (`/content/manifest.json`)
- **Repository topology** — Updated generated output surface to `products/<lane>/dist` (with legacy `/dist` mirror explicitly labeled)
- **Lane build layout** — Updated build artifact references to lane-scoped output

---

## 0.4.2 — 2026-01-17

**Visual Evolution Layer**

This release introduces visual interfaces as a first-class concept, allowing visual systems to evolve independently from products using the same evolutionary model as code.

### Added

- **Visual Evolution** (`/canon/odd/appendices/visual-evolution.md`) — Why visual systems evolve independently from products
- **Visual Interfaces** (`/visual/interfaces/`) — Semver'd visual compatibility contracts
  - `color-system@1.0.0` — Semantic color tokens and accessibility requirements
  - `typography@1.0.0` — Modular type scale and semantic roles
  - `spacing@1.0.0` — Base-8 spacing scale and application rules
- **Repo Truth Audit** (`/canon/odd/appendices/repo-truth-audit.md`) — Prompt for self-referential drift detection across canon, docs, tooling, and structure
- **Visual directory structure:**
  - `/visual/interfaces/` — Visual contracts
  - `/visual/assets/` — Generated outputs (disposable)
  - `/visual/attempts/` — Evolutionary visual exploration

### Changed

- **Website PRD** — Now declares visual interface compatibility (color-system, typography, spacing)
- **Canon Index** — Added visual evolution, drift checks, and lane build layout to appendices list

### Philosophy

- Visual consistency is a property of contracts, not code
- Products consume visual interfaces, they do not define colors/fonts/spacing directly
- Visual attempts compete; only champions advance interface versions
- Visual systems can evolve faster than products without invalidating experiments

---

## 0.4.1 — 2026-01-17

**Interface Contracts + Semver Layer**

This release introduces explicit interface contracts with semantic versioning, documenting the compatibility promises that lanes depend on.

### Added

- **Interface Contracts** (`/interfaces/index.md`) — Semver'd compatibility layer
  - `manifest@2.0.0` — Manifest schema and semantics contract
  - `build-output@1.0.0` — Deployment artifact shape contract
  - `attempt-cli@2.0.0` — CLI surface and output artifacts contract
  - `mcp@0.1.0` — Draft MCP surface contract (not yet enforced)
- **Lane Build Layout** (`/canon/odd/appendices/lane-build-layout.md`) — How lanes avoid /src and /dist collisions
- **Drift Checks** (`/canon/odd/appendices/drift-checks.md`) — Drift prevention mechanism and verify:contracts placeholder

### Changed

- **Lane PRDs** — Each PRD now declares required interface contracts:
  - Website: manifest>=2.0.0, build-output>=1.0.0, attempt-cli>=2.0.0
  - AI-Navigation: manifest>=2.0.0, build-output>=1.0.0, attempt-cli>=2.0.0, mcp@0.1.x (unstable)
  - Agent-Skill: manifest>=2.0.0, attempt-cli>=2.0.0 (no build-output required)
- **Docs** — Added interface contract and lane-build-layout links to:
  - `/docs/ATTEMPTS.md`
  - `/docs/ATTEMPT_KICKOFF.md`
  - `/docs/CLOUDFLARE_CONFIG.md`

### Notes

- Interface contracts are the only documents that use semver by default
- Lanes must remain compatible with declared contracts or bump major versions
- `verify:contracts` command defined but not yet implemented

---

## 0.4.0 — 2026-01-17

**ODD Contract 2.0.0 — Multi-Lane Era**

This release introduces the multi-lane PRD architecture, epochs for comparability, alignment reviews for drift detection, and lane-scoped implementation surfaces. This is a breaking change from the single-PRD model.

### Added

- **ODD Contract 2.0.0** (`/canon/odd/contract.md`) — Single source of ODD system versioning
- **Epochs** (`/canon/odd/appendices/epochs.md`) — Named periods where success meaning is stable
- **Alignment Reviews** (`/canon/odd/appendices/alignment-reviews.md`) — Periodic evaluation for drift detection
- **Product Lanes** (`/canon/odd/appendices/product-lanes.md`) — Multi-lane PRD architecture
- **Lane-Scoped Implementation Surfaces** (`/canon/odd/appendices/lane-implementation-surfaces.md`) — Each lane owns `products/<lane>/src` and `products/<lane>/dist`
- **Decision Logs:**
  - D0009: Multi-lane PRD architecture
  - D0010: Canonical agent kickoff (`AGENT_KICKOFF.md`)
  - D0011: ODD Contract 2.0.0 declaration
- **Lane PRD directories:**
  - `/docs/PRD/website/PRD.md`
  - `/docs/PRD/ai-navigation/PRD.md`
  - `/docs/PRD/agent-skill/PRD.md`
- **Lane implementation surfaces:**
  - `/products/website/src/`
  - `/products/ai-navigation/src/`
  - `/products/agent-skill/src/`

### Changed

- **Attempt CLI** — Now lane-scoped:
  - `attempt:nuke` requires `--lane`, only deletes `products/<lane>/src`
  - `attempt:register` requires `--lane`, includes `lane_root`, `dist_dir`, `epoch_id` in META.json
- **META.json schema** — Now includes `lane`, `lane_root`, `dist_dir`, `epoch_id`
- **Cloudflare config** — Lane-root deployments (`products/<lane>` as root directory)
- **ATTEMPTS.md** — Lane-scoped folder structure and paths
- **ATTEMPT_KICKOFF.md** — Lane-scoped nuke/build commands
- **AGENT_KICKOFF.md** — Lane and epoch declaration required at Step 0

### Epochs

| Epoch | Contract | Description |
|-------|----------|-------------|
| E0001-single-prd-era | 1.x | Single PRD world (`/docs/PRD.md`) |
| E0002-multi-lane-era | 2.x | Multi-lane world (`/docs/PRD/<lane>/PRD.md`) |

### Breaking Changes

- Single active PRD rule removed
- Lane declaration required for all attempts
- Epoch declaration required in META.json
- Repo-root `/src` and `/dist` are no longer product surfaces
- Attempts stored under `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/` (lane-contained)

### Notes

- Do not compare outcomes across epochs without explicit adjustment
- Canon is shared across lanes; PRDs and attempts are lane-scoped
- Each lane is an independent product with its own evolutionary track

---

## 0.3.1 — 2026-01-17

### Changed

- Content metadata now lives in per-file YAML frontmatter (source of truth).
- `/public/content/manifest.json` is now generated during `npm run sync` from frontmatter + `/canon/meta/pack.json`.
- `canon/meta/manifest.json` has been removed to prevent metadata drift.
- The renderer strips frontmatter before rendering markdown content.

### Notes

- `npm run verify:content` now validates the generated manifest coverage against `/public/content/`.

---

## 0.3.0 — 2026-01-17

### Added

- **Decision Log** (`/canon/odd/decisions/`) — ADR-lite structure for durable decisions
  - D0001: `prod` branch is production
  - D0002: Attempt provenance required (tool, agent, model)
  - D0003: PRD version auto-detection
  - D0004: Cleanup is mandatory
  - D0005: Nuke command safety guards
  - D0006: Dogfooding requirement
  - D0007: Branch names are convenience
  - D0008: Register before nuke
- **Truth Map** (`/docs/TRUTH_MAP.md`) — authoritative source index

### Changed

- **Production model:** `prod` branch is production, `main` is experiment ledger (D0001)
- **Attempt lifecycle:** Register → Nuke → Build → Finalize → Promote
- **Provenance:** META.json now captures tool, agent_id, model, run_id, branch, prd_version
- **Collision avoidance:** Numbers assigned at finalization, not reserved upfront

### Deprecated

- `ATTEMPT_REGISTRY.json` — replaced by `attempt:finalize` deterministic numbering
- `attempt:reserve` — replaced by `attempt:register` (captures provenance)
- `attempt:reset` — replaced by `attempt:nuke` (explicit blank slate)
- "main is production" language — `prod` is now production

### Notes

- This release eliminates the "three eras" confusion and establishes one coherent model.
- See `/docs/TRUTH_MAP.md` for authoritative source identification.
- See `/canon/odd/decisions/` for the rationale behind each decision.

---

## 0.1.5 — 2026-01-16 (Superseded by 0.3.0)

### Added

- **Worktrees and learnings model** (`/canon/odd/appendices/attempt-lifecycle.md`)
  - Worktrees are disposable sandboxes, learnings are repo-state
  - Learnings payload requirement (artifacts + PRD patches)
- **Artifacts always merge rule**
  - Failed attempts contribute learnings via artifacts merge
  - Two merges: artifacts (always) + code (only Champion)
- ~~**Attempt registry mechanism** (`ATTEMPT_REGISTRY.json`)~~ — **DEPRECATED in 0.3.0**
- ~~**Fresh start requirement** (`attempt:reset`)~~ — **DEPRECATED in 0.3.0**, use `attempt:nuke`

### Notes

- ⚠️ This version's registry/reserve model has been superseded by register/finalize in 0.3.0.

---

## 0.1.4 — 2026-01-16

### Added

- **Champion selection and promotion policy** (`/canon/odd/appendices/attempt-lifecycle.md`)
  - Defines how one attempt graduates from experiment to production
  - Minimum gates, tie-breakers, and promotion procedure
  - Winner declaration snippet for ATTEMPT.md
- **Promotion script** (`npm run attempt:promote`) for automated Champion workflow

### Changed

- Attempt Lifecycle: CHAMPION status + META.json promotion fields (`/canon/odd/appendices/attempt-lifecycle.md`)
- Quantum Development: grounding line that experiments end with promotion (`/canon/odd/appendices/quantum-development.md`)

### Notes

- This release closes the loop on Quantum Development: observations without promotion are incomplete experiments.
- ⚠️ Note: As of 0.3.0, `prod` is the production branch. `main` is the experiment ledger.

---

## 0.1.3 — 2026-01-16

### Added

- Cloudflare branch deploys infra note (`/docs/infra/cloudflare-branch-deploys.md`)
- Attempts doc: "PRD as the Unit of Test" (procedural) (`/docs/ATTEMPTS.md`)
- Attempt Lifecycle: "PRD as the Unit of Test" + "Independence: goal vs infrastructure" (`/canon/odd/appendices/attempt-lifecycle.md`)

### Changed

- Decision Rules: "Prefer one-shot builds; don't steer a miss" and "Don't hard-code domain tables; hard-code protocol contracts" (`/canon/decision-rules.md`)
- Quantum Development: cross-link to PRD-as-unit-of-test framing (`/canon/odd/appendices/quantum-development.md`)
- Active PRD: requires infra artifact when deploy behavior is in scope; adds attempt independence enforcement (`/docs/PRD.md`)

### Notes

- This release encodes transcript-derived learnings as rules and procedures, while avoiding operationally irrelevant or sensitive details.

---

## 0.1.2 — 2026-01-16

### Added

- Quantum Development appendix (`/canon/odd/appendices/quantum-development.md`)
- Attempt Kickoff prompt (`/docs/ATTEMPT_KICKOFF.md`)
- Agent Entry Point (`/docs/AGENT_ENTRYPOINT.md`)
- Single active PRD (`/docs/PRD.md`)

### Changed

- Canon Index: explicit “single active PRD” policy (`/canon/index.md`)
- Attempt Lifecycle: cross-link to the single kickoff prompt (`/canon/odd/appendices/attempt-lifecycle.md`)
- Attempts documentation updated to reflect single active PRD + kickoff prompt (`/docs/ATTEMPTS.md`)
- PRD template updated to reflect single active PRD policy (`/docs/PRD/PRD_TEMPLATE.md`)

### Removed

- Versioned PRDs from the main docs surface (`/docs/PRD/PRD_v*.md`) in favor of `/docs/PRD.md`

### Notes

- This release reduces PRD and prompt sprawl by making the active PRD and kickoff prompt uniquely authoritative.

---

## 0.1.1 — 2026-01-15

### Added

- Attempt Lifecycle appendix (`/canon/odd/appendices/attempt-lifecycle.md`)
- Repository Topology appendix (`/canon/odd/appendices/repo-topology.md`)
- PRD Template (`/docs/PRD/PRD_TEMPLATE.md`)

### Established

- PRD → Attempt → Evidence model
- Decoupled infrastructure from truth (SHA is canonical, deploys are views)
- Three planes: App (disposable), Content (accumulates), Infrastructure (persists)
- Four core principles including "Deployments are views, not truth"

### Notes

- This release stabilizes the process model itself, not just content.
- Future PRDs and attempts will stress-test this structure.
- Operational procedures live in `/docs/ATTEMPTS.md`, not Canon.

---

## 0.1.0 — 2026-01-15

### Added

- Canon Index (`/canon/index.md`) as the orientation entrypoint.
- Core canon documents:
  - Constraints
  - Decision Rules
  - Definition of Done & Evidence Policy
  - Self-Audit Checklist
  - Visual Proof Standards
  - Completion Report Template
- ODD canon set:
  - ODD Manifesto — Extended
  - Project Maturity & Progressive Governance
- ODD appendices:
  - Misuse Patterns
  - Prompt Architecture
  - Orientation Map
- About pages:
  - Bio
  - Credibility
  - FAQ
- Content manifest (`/public/content/manifest.json`) generated from per-file frontmatter (stable URIs).

### Notes

- The manifest is inventory-only: it declares what exists and how it may be addressed.
- Any future workflow semantics belong in clients or tools, not in this pack.



--------------------------------------------------------------------------------
📄 File: canon/README.md
--------------------------------------------------------------------------------

---
uri: klappy://canon
title: "Canon"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "index", "orientation"]
---

# 🧭 Canon

Curated documents that capture how decisions are made, what assumptions are held, how work is verified, and how rigor changes as projects mature.

The Canon exists so that reasoning does not have to be repeated.

---

## 📁 Contents

### Core Documents

| File | Title | Summary | Answers |
|------|-------|---------|---------|
| `constraints.md` | Constraints | Baseline assumptions and non-negotiables that shape every decision. | What must be true for this work to make sense? |
| `decision-rules.md` | Decision Rules | Default heuristics used when multiple valid options exist. | How do choices tend to be made? |
| `definition-of-done.md` | Definition of Done | What qualifies as completed work and what evidence is required. | When can work honestly be called done? |
| `self-audit.md` | Self-Audit Checklist | Review checklist before declaring completion. | What should be reviewed before claiming success? |
| `visual-proof.md` | Visual Proof Standards | What qualifies as acceptable visual evidence. | What does "prove it visually" mean? |
| `completion-report-template.md` | Completion Report Template | Standard format for reporting completed work. | How should completion be communicated? |
| `CHANGELOG.md` | Canon Changelog | Version history of canon changes. | What changed and when? |

### Subfolders

| Folder | Purpose |
|--------|---------|
| `meta/` | Metadata and pack configuration. |
| `_compiled/` | Compiled outputs (derived, wipeable). |
| `odd/appendices/` | ODD-derived patterns and invariants. |

### ODD Appendices (Patterns)

| File | Title | Summary |
|------|-------|---------|
| `odd/appendices/tool-specialization.md` | Tool Specialization | Preserve reliability as tool availability increases by isolating tool usage behind narrowly scoped reasoning units. |

---

## 🚀 Start Here

1. **`constraints.md`** — What must be true for this work to make sense?
2. **`definition-of-done.md`** — When can work honestly be called done?
3. **`/odd/manifesto.md`** — Why this approach exists.

These three documents anchor everything else.

---

## 📖 Precedence & Interpretation

A useful mental model for reading:

1. ODD Manifesto provides philosophical grounding
2. Maturity Model explains when rigor increases
3. Constraints shape the solution space
4. Decision Rules guide choices
5. Evidence Policies define completion

If documents appear to conflict, maturity context and explicit tradeoffs usually explain why.

---

## 🧠 What the Canon Is (and Is Not)

**The Canon Is:**
- A shared reference
- A source of assumptions and defaults
- A way to encode thinking without enforcing execution

**The Canon Is Not:**
- A workflow
- A command system
- A task list
- A replacement for judgment

Nothing in the Canon executes by itself.

---

## 🔒 Public vs Internal Boundary

- `/odd/README.md` → public-facing ODD (shareable, human-friendly)
- `/canon/**` → internal reference (governance artifacts, precise language)

Public documents explain intent. Canon documents preserve precision.

---

## 📋 Meta Rules

Structural conventions for keeping the Canon coherent over time. These are not workflows or enforcement steps.

**1. Single Inventory Source**
If an inventory of Canon resources exists, there should be one authoritative source (e.g., a manifest). Other indexes should be derived or optional.

**2. Stable Names Beat Clever Names**
Prefer stable file and URI naming over clever branding. Rename rarely.

**3. Audience Separation Matters**
"Public" explains and invites. "Canon" defines and stabilizes.

**4. Voice Is Labeled, Not Transformed**
First-person documents may be consumed as-is or translated by clients. The Canon itself does not require a specific rendering voice.

**5. Multi-Lane PRD Architecture**
PRDs are organized into independent product lanes. Each lane has its own active PRD, attempts, and lifecycle. Lanes share canon, not lifecycle. See `/docs/appendices/product-lanes.md` for the full model.

---

## 🔄 Stability & Change Philosophy

Not all Canon documents are equally stable.

Some are intended to remain largely fixed. Others are expected to evolve through use.

Change is allowed, but should be:
- Intentional
- Versioned (at least informally)
- Documented somewhere discoverable

---

## ⚠️ Confidence & Drift Risk

This section expresses current confidence that the Canon and surrounding architecture align with the core pillars: KISS, DRY, Consistency, Maintainability, Antifragile, Scalable, Prompt-over-Code.

These are not guarantees. They are a snapshot of perceived risk.

**Confidence scale:**
- 0.9+ — robust
- 0.7–0.85 — strong, but watch for drift
- 0.5–0.7 — plausible, fragile under misuse
- <0.5 — likely misaligned unless corrected

**Current scores (v0.1 snapshot):**

| Pillar | Score | Notes |
|--------|-------|-------|
| Prompt-over-Code | 0.80 | Strong fit. Risk: schema sprawl or client-specific conventions. |
| KISS | 0.75 | Minimal primitives. Risk: meta-layer creep. |
| DRY (with isolation) | 0.70 | Canon centralizes principles. Risk: duplicate indices drifting. |
| Consistency | 0.65 | URI/metadata structure supports it. Risk: naming drift. |
| Maintainability | 0.70 | Stable worldview vs evolving templates. Risk: manual updates out of sync. |
| Antifragile | 0.60 | Recoverable if served statically. Risk: hidden single points of failure. |
| Scalable | 0.70 | Schema supports growth. Risk: large manifests becoming brittle. |

---

## 🚫 What Is Intentionally Undefined

The Canon deliberately does not define:
- Specific tools
- Specific agents
- Specific workflows
- Specific automation loops

These are left open to evolve without rewriting foundational thinking.

---

## 📦 For Pack Compilation

When building a guide pack, include:
- This README for orientation
- Specific documents needed for the pack's purpose
- Subfolder READMEs for scannable summaries without including all files

See `/docs/appendices/compilation.md` for the compilation model.

---

## 🔗 See Also

- [ODD (Universal Principles)](/odd/README.md) — Timeless methodology that Canon derives from
- [Implementation Docs](/docs/README.md) — How klappy.dev implements Canon
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md) — Why ODD, Canon, and Docs are separate

---

## ✅ Status

- Canon Index v0.1 complete
- Orientation-only
- Includes confidence and drift snapshot

This Canon v0.1 is considered stable for initial builds. Revisions should be additive unless a documented failure requires change.



--------------------------------------------------------------------------------
📄 File: canon/TEMPLATE.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/template
title: "Canon Article Template"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["canon", "template"]
---

# Canon Article Template

> Template for program-level constraints shared across all products.

## Description

This template defines the standard structure for Canon articles. Canon contains program-level constraints—rules that all products in this program must follow. Canon is more stable than Docs but less universal than ODD. Use this template when adding new constraints, policies, or shared rules.

## Outline

- When to Add to Canon
- Frontmatter Fields
- Document Structure
- Example

---

## When to Add to Canon

Add to Canon when:

- The rule applies to ALL products in this program
- The rule is derived from ODD principles
- The rule would still apply if we added new products

Do NOT add to Canon when:

- It's implementation-specific → `/docs/`
- It's universal philosophy → `/odd/`
- It's lane-specific → `/products/<lane>/`

**Litmus test:** Should all products obey this? → Canon ✓

---

## Frontmatter Fields

```yaml
---
uri: klappy://canon/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: first_person | neutral
stability: stable
tags: ["canon", "topic"]
---
```

### Canon-Specific Values

| Field | Typical Value | Notes |
|-------|---------------|-------|
| `audience` | `canon` | Always canon |
| `tier` | `1` | Canon is core content |
| `voice` | `first_person` | Website-ready, personal |
| `stability` | `stable` | Canon changes carefully |

---

## Document Structure

```markdown
---
uri: klappy://canon/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["canon", "topic"]
---

# Title

> One-line description of this constraint or rule.

## Description

1-2 paragraph compressed overview. What is this constraint?
Why does it exist? How does it shape behavior?

## Outline

- Section 1
- Section 2
- Section 3

---

## Content

**Canon vX.Y**

[Full content...]

---

## See Also

- [Related Canon](/canon/related.md)
- [ODD Principle](/odd/appendices/related.md)
```

---

## Example

```markdown
---
uri: klappy://canon/example-constraint
title: "Example Constraint"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["canon", "example"]
---

# Example Constraint

> All products must X before Y.

## Description

This constraint ensures consistency across products by requiring X
before Y. It derives from the ODD principle of evidence over assertion
and applies to all lanes.

## Outline

- What I Assume
- Why It Matters
- What It Forces
- When It Doesn't Apply

---

## Content

**Canon v0.1**

### What I Assume

[...]

### Why It Matters

[...]

### What It Forces

[...]

### When It Doesn't Apply

[...]
```

---

## See Also

- [Canon Index](/canon/README.md)
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md)



--------------------------------------------------------------------------------
📄 File: canon/_compiled/epoch-E0002/README.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/compiled/epoch-e0002-readme
title: "Compiled Canon Outputs (Epoch E0002)"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "compiled", "epoch", "e0002"]
---

# Compiled Canon Outputs (Epoch E0002)

⚠️ **This folder contains derived output.**

- This folder is derived output
- It may be deleted anytime
- Do not edit compiled files by hand
- Regenerate from source Canon

See `/docs/appendices/canonical-compression.md` for the compilation model.



--------------------------------------------------------------------------------
📄 File: canon/completion-report-template.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/completion-report-template
title: "Completion Report Template"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: evolving
tags: ["completion-report", "template"]
---

# Completion Report Template

> The standard format for claiming work is complete.

## Description

The completion report template is the mandatory output format for claiming completion. It ties together the Definition of Done, Self-Audit, and Visual Proof Standards into a single, reviewable artifact. Reports must include task overview, intended outcome, what changed, verification performed, observed behavior, evidence produced, visual proof (if applicable), self-audit summary, confidence and gaps, exceptions or notes, and a completion declaration. Reports may be brief but must be honest. If the report is unclear, the work is unclear.

## Outline

- Task Overview
- Intended Outcome
- What Changed
- Verification Performed
- Observed Behavior
- Evidence Produced
- Visual Proof (If Applicable)
- Self-Audit Summary
- Confidence & Gaps
- Exceptions or Notes
- Completion Declaration

---

## Content

**Canon v0.1**

> This is the standard output format humans and agents must use to claim completion. It ties together the Definition of Done, Self-Audit, and Visual Proof Standards into a single, reviewable artifact.

This template defines how completed work must be reported.
If a task does not have a completion report following this structure, it is not complete.

This report may be brief, but it must be honest.

---

## 1. Task Overview

- **Task name:**
- **Date:**
- **Status:** Complete / Partially Complete / Not Complete

**Short description:**
What this task was intended to do (1–2 sentences).

---

## 2. Intended Outcome

What outcome was this work meant to achieve?

How would someone know, by observation, that the outcome was achieved?

---

## 3. What Changed

List the concrete changes made.

Examples:
• files modified
• components added or removed
• behavior changed

Be specific but concise.

---

## 4. Verification Performed

What was run or exercised to verify the work?

Examples:
• dev server started
• page loaded
• interaction performed
• tests executed
• offline scenario simulated

If verification was not performed, state why.

---

## 5. Observed Behavior

What actually happened when the system was run?

Describe observed behavior, not expected behavior.

---

## 6. Evidence Produced

List the evidence that proves the observed behavior occurred.

Examples:
• Screenshot: link or reference
• Screen recording: link or reference
• Rendered output: file name
• Logs or test output: location

Each item must be labeled with what it demonstrates.

---

## 7. Visual Proof (If Applicable)

If the work affects UI or interaction:
• What visual proof was captured?
• What does it show?
• Is there before/after evidence?

If visual proof could not be produced, explain why.

---

## 8. Self-Audit Summary

Briefly summarize the self-audit:
• Constraints applied
• Decision rules followed
• Tradeoffs made
• Risks or unknowns remaining

One sentence per item is sufficient.

---

## 9. Confidence & Gaps

How confident am I that this works as intended?

What would increase confidence further?

---

## 10. Exceptions or Notes

Note any:
• deviations from defaults
• known limitations
• follow-up work required

---

## ✅ Completion Declaration

I consider this task:
• ☐ Complete
• ☐ Partially Complete
• ☐ Not Complete

Reason (if not complete):

If marked complete, all required evidence and self-audit items are present.

---

## 🤖 Agent Expectations

Agents are expected to:
• produce this report before claiming completion
• refuse to mark tasks complete without evidence
• clearly mark partial or incomplete work

Completion is a claim that must be justified.

---

## 💡 Closing Note

This template exists to:
• replace repeated QA questions
• surface problems early
• make review fast and objective

If the report is unclear, the work is unclear.

---



--------------------------------------------------------------------------------
📄 File: canon/constraints.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/constraints
title: "Constraints"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["constraints", "assumptions"]
---

# Constraints

> Design defaults and assumptions that shape how systems are built.

## Description

Constraints define the baseline assumptions and design defaults applied to most work. They cover offline-first design, long-term maintainability, interoperability, stateless architectures, AI as accelerator (not authority), evidence over assertion, contextual UX, ephemeral artifacts, and explicit tradeoffs. Each constraint includes what is assumed, why it matters, what it forces, and when it does not apply. These are not universal best practices but reflect specific environments and problems.

## Outline

- Offline-First (Default)
- Long Timelines & Changing Ownership
- Maintainability Over Cleverness
- Interoperability Over Feature Completeness
- Stateless or Low-State by Default
- AI as Accelerator, Not Authority
- Evidence Over Assertion
- UX Is Contextual, Not Universal
- Ephemeral Artifacts Are Acceptable
- Explicit Tradeoffs

---

## Content

**Canon v0.1**

> This is written in first person, website-ready, and structured so agents can reliably translate it into neutral/system constraints at runtime.

Each constraint includes:
- what I assume
- why it matters
- what it forces
- when it doesn't apply

That last part is critical to avoid dogma.

This page documents the defaults and constraints I design under most often.
They are not universal best practices. They reflect the environments and problems I regularly work in.

Unless explicitly stated otherwise, these constraints should be assumed to apply.

---

## 1. Offline-First (Default)

I design as if network connectivity is unreliable, intermittent, or unavailable.

**Why this matters**

Many of the contexts I work in:
• have poor or inconsistent internet access
• require field use
• cannot assume cloud availability

Designs that fail offline tend to fail catastrophically.

**What this forces**
• Core functionality must work without a network
• Data is stored locally first
• Synchronization is opportunistic, not assumed
• Conflicts are expected and must be resolvable

**When this does not apply**
• Short-lived internal tools
• One-off demos where offline support would distort the experiment
• Explicitly cloud-only systems (must be stated)

---

## 2. Long Timelines & Changing Ownership

I assume systems will live longer than their original creators and will change hands.

**Why this matters**

Many projects:
• span years, not months
• outlast funding cycles
• rotate maintainers or organizations

Systems that assume stable ownership tend to rot.

**What this forces**
• Clear separation of concerns
• Minimal hidden state
• Explicit documentation as part of the product
• Avoidance of "tribal knowledge" dependencies

**When this does not apply**
• Throwaway prototypes
• Time-boxed experiments with a defined end date

---

## 3. Maintainability Over Cleverness

I default to solutions that are easy to understand, modify, and repair.

**Why this matters**

Maintenance cost usually exceeds build cost, especially over long timelines.

**What this forces**
• Preference for simple, boring solutions
• Avoidance of unnecessary abstractions
• Clear tradeoffs documented when complexity is introduced

**When this does not apply**
• Exploratory research prototypes
• Performance-critical paths where simplicity is insufficient

---

## 4. Interoperability Over Feature Completeness

I prioritize systems that can work with others over systems that try to do everything.

**Why this matters**

Closed or tightly coupled systems:
• limit collaboration
• increase lock-in
• age poorly

Interoperable systems survive organizational change.

**What this forces**
• Preference for open formats and protocols
• Loose coupling between components
• Clear interfaces instead of shared internals

**When this does not apply**
• Highly specialized tools with no external integration needs
• Temporary scaffolding code

---

## 5. Stateless or Low-State by Default

I default to stateless or low-state architectures where possible.

**Why this matters**

State increases:
• complexity
• failure modes
• recovery cost

Stateless systems are easier to reason about and recover.

**What this forces**
• Explicit state boundaries
• Externalized persistence where necessary
• Clear lifecycle management

**When this does not apply**
• Systems whose core value is stateful (e.g., editors, long-running workflows)
• Performance-critical stateful processes (must be justified)

---

## 6. AI as Accelerator, Not Authority

I treat AI as a tool to accelerate thinking and execution, not as a source of truth.

**Why this matters**

AI systems:
• hallucinate
• optimize for plausibility, not correctness
• require human judgment

Unverified AI output is a liability.

**What this forces**
• Human-defined outcomes
• Verification and evidence requirements
• Explicit refusal when confidence is not warranted

**When this does not apply**
• None. This constraint is always in effect.

---

## 7. Evidence Over Assertion

I do not consider work complete unless it is verified with evidence.

**Why this matters**

Assertions like "it works" are unreliable without proof.

**What this forces**
• Running the system
• Observing behavior
• Producing visual or test evidence

**When this does not apply**
• Purely conceptual or theoretical work (must be labeled as such)

---

## 8. UX Is Contextual, Not Universal

I do not assume a single UX pattern works everywhere.

**Why this matters**

Users vary by:
• language
• culture
• technical experience
• environment

Universal UX claims often hide bias.

**What this forces**
• Context-specific design decisions
• Willingness to diverge from mainstream patterns
• Clear explanation of UX tradeoffs

**When this does not apply**
• Internal tools for a well-defined, homogeneous user group

---

## 9. Ephemeral Artifacts Are Acceptable

I assume many outputs (code, UI, builds) are temporary.

**Why this matters**

AI makes regeneration cheap. Maintaining everything forever is unnecessary.

**What this forces**
• Focus on outcomes over artifacts
• Willingness to discard and regenerate
• Durable principles instead of durable repos

**When this does not apply**
• Canonical data
• Long-term user content
• Legal or compliance artifacts

---

## 10. Explicit Tradeoffs

I expect tradeoffs to be named, not hidden.

**Why this matters**

Every decision excludes alternatives. Unspoken tradeoffs cause confusion later.

**What this forces**
• Short explanations of why choices were made
• Acknowledgment of downsides
• Easier future revision

**When this does not apply**
• Truly trivial decisions

---

## 💡 Closing Note

These constraints define how I default, not how everyone should build.

Agents and collaborators should:
• assume these constraints apply
• translate them into neutral/system requirements
• explicitly note when a constraint is overridden or does not apply

---

## ✅ Status

- Canon v0.1 — Constraints complete
- Ready to proceed to Canon v0.1 — Decision Rules



--------------------------------------------------------------------------------
📄 File: canon/decision-rules.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/decision-rules
title: "Decision Rules"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: stable
tags: ["decision-rules", "heuristics"]
---

# Decision Rules

> Heuristics for choosing between valid options when designing systems.

## Description

Decision rules describe how decisions are made when multiple valid options exist. They complement Constraints by answering "how I choose." Rules include: outcomes before implementation, borrow-bend-break-build progression, KISS, DRY with isolation, explicit state, recoverability over perfection, visible tradeoffs, optimizing for the next maintainer, UI carrying explanation, verification before completion, escalation only when defaults fail, admitting uncertainty early, preferring one-shot builds over steering misses, and hard-coding protocols (not domain tables).

## Outline

- Outcomes Before Implementation
- Borrow, Bend, Break, Build
- Simplicity Wins (KISS)
- DRY, But Not at the Cost of Isolation
- Prefer Explicit State
- Favor Recoverability Over Perfection
- Make Tradeoffs Visible Early
- Optimize for the Next Maintainer
- UI Should Carry the Explanation
- If It Cannot Be Verified, It Is Not Done
- Escalate Only When Defaults Fail
- Say "I Don't Know" Early
- Prefer One-Shot Builds
- Hard-Code Protocols, Not Domain Tables

---

## Content

**Canon v0.1**

> This complements the Constraints by answering "how I choose" when multiple valid options exist.

These rules describe how I tend to make decisions when designing systems.
They are not absolute laws. They are defaults I apply unless there is a clear reason not to.

If a rule is overridden, I expect the reason to be stated explicitly.

---

## 1. Outcomes Before Implementation

I define the outcome I care about before choosing tools, architectures, or code.

**How I apply this**
• I ask what problem is actually being solved
• I avoid committing to implementation details too early
• I prefer deleting work that doesn't move the outcome forward

**Signals this rule was violated**
• The solution is impressive but unclear in purpose
• Success criteria are vague or missing
• The system “works” but doesn’t help anyone

---

## 2. Borrow → Bend → Break → Build

I follow a progression when deciding how much to create from scratch.

**The order:**

1. **Borrow** — Use an existing tool as-is
2. **Bend** — Extend or configure an existing tool
3. **Break** — Fork or partially replace an existing tool
4. **Build** — Create something new from components

**How I apply this**
• I start at Borrow and justify moving down the list
• Building from scratch requires explicit justification

**Signals this rule was violated**
• Reinventing something stable and well-understood
• Forking without a clear maintenance plan

---

## 3. Simplicity Wins by Default (KISS)

I choose the simplest solution that plausibly works.

**How I apply this**
• I reject unnecessary abstraction
• I prefer readable code over clever code
• I add complexity only when simplicity demonstrably fails

**Signals this rule was violated**
• Explanations are longer than the code
• Only the original author understands the system

---

## 4. DRY, But Not at the Cost of Isolation

I avoid duplication, but not if it creates brittle coupling.

**How I apply this**
• I allow duplication across bounded contexts
• I extract shared logic only when reuse is proven
• I avoid "god modules" shared by everything

**Signals this rule was violated**
• Small changes cause widespread breakage
• Teams are blocked waiting on shared components

---

## 5. Prefer Explicit State Over Implicit State

I choose designs where state is visible, named, and bounded.

**How I apply this**
• I avoid hidden global state
• I make lifecycle and ownership explicit
• I prefer passing state over reaching for it

**Signals this rule was violated**
• Bugs depend on execution order
• Restarting the system produces surprising behavior

---

## 6. Favor Recoverability Over Perfection

I prefer systems that fail safely and recover easily over systems that try to prevent all failure.

**How I apply this**
• I design for partial failure
• I assume components will break
• I prefer restartable, replayable processes

**Signals this rule was violated**
• A single failure takes everything down
• Recovery requires deep expertise or manual intervention

---

## 7. Make Tradeoffs Visible Early

I name tradeoffs as part of the design, not as a postmortem.

**How I apply this**
• I document why a choice was made
• I acknowledge what the choice sacrifices
• I leave breadcrumbs for future maintainers

**Signals this rule was violated**
• Future changes require archaeology
• Decisions feel arbitrary in hindsight

---

## 8. Optimize for the Next Maintainer

I assume the next person to touch the system is not me.

**How I apply this**
• I favor clarity over personal preference
• I document non-obvious decisions
• I avoid designs that require constant explanation

**Signals this rule was violated**
• The system works but no one wants to touch it
• Knowledge exists only in conversations or chat logs

---

## 9. UI Should Carry the Explanation

I prefer showing over telling, especially in user-facing systems.

**How I apply this**
• I let interfaces demonstrate behavior
• I keep explanatory text short
• I ask permission before going deep

**Signals this rule was violated**
• Long explanations compensate for confusing UX
• Users need documentation to complete basic tasks

---

## 10. If It Can't Be Verified, It Isn't Done

I do not consider work complete unless it is verified.

**How I apply this**
• I run the system
• I observe behavior directly
• I require visual or test evidence

**Signals this rule was violated**
• Confidence is based on reasoning alone
• Bugs are discovered by users instead of builders

---

## 11. Escalate Only When Defaults Fail

I start with defaults and escalate only when necessary.

**How I apply this**
• I try the obvious solution first
• I gather evidence before increasing complexity
• I treat escalation as a signal, not a failure

**Signals this rule was violated**
• Overengineering early
• Complex solutions to simple problems

---

## 12. Say "I Don't Know" Early

I prefer admitting uncertainty to pretending confidence.

**How I apply this**
• I name unknowns explicitly
• I design experiments to reduce uncertainty
• I avoid locking in assumptions prematurely

**Signals this rule was violated**
• Decisions are justified with vague confidence
• Surprises appear late and expensively

---

## 13. Prefer One-Shot Builds; Don't Steer a Miss

I prefer fixing the asset (PRD, constraints, inputs) and re-running clean over steering a multi-turn miss.

**How I apply this**
• I treat a failed execution path as signal, not a trajectory to nurse back to health
• If context decays, I restart with corrected inputs rather than accumulating patches
• I preserve the attempt as evidence, then begin a new attempt independently

**Signals this rule was violated**
• “Just one more tweak” turns into extended steering
• The system only works if the same person keeps nudging it
• The final outcome cannot be reproduced from a clean start

---

## 14. Don't Hard-Code Domain Tables; Hard-Code Protocol Contracts

I avoid hard-coding domain lookups that can be derived, fetched, or updated without code changes.

I do hard-code protocol contracts that define interoperability:
- types
- schemas
- action primitives
- allowed states and transitions

**How I apply this**
• If it’s “data,” I prefer it to live in content, configuration, or a source of truth
• If it's "interface," I prefer it to be explicit and enforced in code

**Signals this rule was violated**
• Large in-code tables that drift from reality (e.g., enumerations maintained by hand)
• Domain updates require redeploys without justification
• Integrations fail because the “contract” was implicit or inconsistent

---

## 💡 Closing Note

These rules describe how I tend to decide, not how decisions must always be made.

Agents and collaborators should:
• apply these rules by default
• translate them into neutral/system logic
• state clearly when a rule is overridden and why

---

## ✅ Status

- Canon v0.1 — Decision Rules complete
- Ready to proceed to Canon v0.1 — Definition of Done & Evidence Policy



--------------------------------------------------------------------------------
📄 File: canon/definition-of-done.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/definition-of-done
title: "Definition of Done & Evidence Policy"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: semi_stable
tags: ["definition-of-done", "evidence"]
---

# Definition of Done & Evidence Policy

> The enforcement backbone that defines what "complete" means.

## Description

This policy defines completion requirements for all work: code, UI, architecture, automation, and AI-assisted outputs. Work is only done when it includes a change description, verification performed, observed behavior, evidence produced, and self-audit completed. Evidence must demonstrate actual behavior (screenshots, recordings, rendered output, test logs) and be produced after the change. Visual verification is required for UI work. The policy covers partial completion handling, explicit exceptions, and agent responsibilities.

## Outline

- Core Principle: Verified with evidence
- Definition of Done (5 requirements)
- Evidence Requirements
- Visual Verification (Preferred)
- Verification Must Be Performed
- Self-Audit Requirement
- What Does Not Count as Done
- Partial Completion
- Explicit Exceptions
- Agent Responsibility

---

## Content

**Canon v0.1**

> This is the enforcement backbone of the canon. It replaces repeated QA reminders with a clear, reusable contract.

This page defines what I mean when I say work is “done.”
If these conditions are not met, the work is not complete, regardless of confidence or explanation.

This policy applies to:
• code
• UI
• architecture
• automation
• AI-assisted outputs

---

## 📌 Core Principle

I do not consider work complete unless it is verified with evidence.

Reasoning alone is insufficient.
Assertions like “this should work” or “this is correct” do not count as completion.

---

## 📋 Definition of Done (DoD)

A task is only considered done when all of the following are present:

1. **Change Description** — What changed, where, and why.
2. **Verification Performed** — What was run or checked to verify the change.
3. **Observed Behavior** — What actually happened when the system was run.
4. **Evidence Produced** — Proof that the behavior matches the intended outcome.
5. **Self-Audit Completed** — A brief audit against constraints and decision rules.

If any of these is missing, the task is incomplete.

---

## 📎 Evidence Requirements

Evidence must demonstrate actual behavior, not expected behavior.

Acceptable evidence includes one or more of the following:
• screenshots
• short screen recordings (10–30 seconds)
• rendered output files
• test output logs
• DOM snapshots or structured UI state captures

Evidence must be:
• produced after the change
• specific to the task
• clearly labeled

---

## 👁️ Visual Verification (Preferred)

If the work affects:
• UI
• interaction
• layout
• user flow
• visible state

Then visual proof is required.

**What counts as visual proof**
• screenshot showing the correct state
• short recording demonstrating the interaction
• before/after comparison when relevant

If visual proof cannot be produced, the reason must be stated explicitly.

---

## 🔬 Verification Must Be Performed

I expect the system to be run or exercised, not just reasoned about.

Verification may include:
• running a dev server
• executing tests
• loading a page
• triggering a workflow
• simulating offline/online transitions

If verification cannot be performed (missing environment, credentials, etc.), this must be stated clearly, along with a proposed alternative.

---

## 🔍 Self-Audit Requirement

Each completed task must include a short self-audit covering:
• intended outcome
• relevant constraints applied
• relevant decision rules followed
• known tradeoffs
• remaining risks or unknowns

The purpose is reflection and traceability, not bureaucracy.

---

## ⚠️ What Does Not Count as Done

The following do not qualify as completion:
• “It compiles”
• “The logic is sound”
• “I reviewed the code”
• “This should work”
• “I didn’t have time to test”

These may be intermediate states, but they are not “done.”

---

## ⏳ Partial Completion

If work is partially complete, it must be labeled as such.

A valid partial completion includes:
• what was attempted
• what was verified
• what could not be verified
• what remains

Ambiguity is worse than incompleteness.

---

## 🚫 Explicit Exceptions

This policy may be relaxed only when explicitly stated, such as for:
• conceptual design discussions
• theoretical analysis
• early ideation

In those cases, the output must be clearly labeled “unverified”.

---

## 🤖 Agent Responsibility

Agents and collaborators are expected to:
• retrieve this policy before claiming completion
• translate it into neutral/system requirements
• enforce it against their own output
• refuse to claim “done” without evidence

If evidence cannot be produced, the correct response is:

“This is not complete yet.”

---

## 💡 Closing Note

This policy exists to:
• prevent false confidence
• reduce rework
• replace repeated QA reminders
• make outcomes trustworthy

It is not meant to slow work down.
It is meant to stop work from being incorrectly declared finished.

---

## ✅ Status

- Canon v0.1 — Definition of Done & Evidence Policy complete
- Ready to proceed to Canon v0.1 — Self-Audit Checklist



--------------------------------------------------------------------------------
📄 File: canon/odd/appendices/tool-specialization.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/tool-specialization
title: "Tool Specialization"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "pattern", "tools", "decision-complexity"]
---

# Tool Specialization

> A general pattern for preserving reliability as tool availability increases.

## Description

When systems accumulate many tools or actions, generalist reasoning becomes
unreliable. The Tool Specialization pattern isolates tool usage behind narrowly
scoped reasoning units, reducing decision complexity while preserving capability.

This pattern captures invariants and tradeoffs without prescribing a specific
implementation.

## Outline

- Context
- The pattern
- Invariants
- Tradeoffs
- Non-goals

---

## Context

This pattern emerges when adding tools increases confusion, misfires, or decision
paralysis instead of effectiveness.

Typical triggers:
- a growing tool menu that the "main" agent uses inconsistently
- repeated tool misuse despite prompt reminders
- correct tools, wrong selection timing
- tool choice dominates reasoning time

---

## The Pattern

Assign responsibility for a narrow set of tools or actions to a dedicated reasoning
unit with constrained scope and explicit outputs.

The goal is not "smarter" reasoning.
The goal is making tool-use boring and reliable.

---

## Invariants

- Capability grows faster than reliability without isolation
- Isolation precedes orchestration
- Specialization reduces decision load, not intelligence
- Outputs must be explicit and promotable

---

## Tradeoffs

- Increased coordination overhead
- Additional interfaces to maintain
- Risk of premature specialization if created before pressure is visible

---

## Non-goals

This pattern does not define:
- an agent framework
- a required topology
- how sub-agents are implemented in any specific repo

---

## See Also

- [Cognitive Partitioning](/odd/cognitive-partitioning.md) — Universal concept
- [Canonical Compression](/docs/appendices/canonical-compression.md) — Reduce reasoning surface area (context limits)



--------------------------------------------------------------------------------
📄 File: canon/self-audit.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/self-audit
title: "Self-Audit Checklist"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: evolving
tags: ["self-audit", "verification"]
---

# Self-Audit Checklist

> A reflection layer that makes the Definition of Done actionable.

## Description

The self-audit checklist defines how work should be self-reviewed before claiming completion. It covers nine areas: intended outcome, constraints applied, decision rules followed, verification performed, evidence produced, UX and behavior check, tradeoffs and risks, maintainability check, and confidence level. Minimum acceptable completion requires a stated outcome, at least one verification step, at least one piece of evidence, and acknowledgment of tradeoffs or unknowns. This replaces repeated back-and-forth questions about whether work was actually run and verified.

## Outline

- Intended Outcome
- Constraints Applied
- Decision Rules Followed
- Verification Performed
- Evidence Produced
- UX & Behavior Check
- Tradeoffs & Risks
- Maintainability Check
- Confidence Level
- Minimum Acceptable Completion
- Agent Expectations

---

## Content

**Canon v0.1**

> This is the reflection and enforcement layer that makes the Definition of Done actionable without turning you into a QA manager.

This checklist defines how I expect work to be self-reviewed before it is considered complete.

The purpose is not bureaucracy.
The purpose is to catch obvious failures before someone else does.

Every completed task must include a filled version of this checklist.

---

## 📌 Core Principle

I expect builders—human or AI—to audit their own work against stated outcomes, constraints, and evidence.

If an item cannot be answered, that is a signal—not a failure.

---

## 📋 Self-Audit Checklist

### 1. Intended Outcome

   • What outcome was this work intended to achieve?
   • How will someone know if that outcome was achieved?

---

### 2. Constraints Applied

- Which constraints were relevant to this task?
- (e.g., offline-first, maintainability, interoperability)
- Were any default constraints intentionally overridden?
- If yes, why?

---

### 3. Decision Rules Followed

- Which decision rules guided the approach?
- (e.g., Borrow→Bend→Break→Build, KISS, explicit tradeoffs)
- Were there moments where a different rule could have been applied?
- Why was it not?

---

### 4. Verification Performed

- What was run or exercised to verify the work?
- What behavior was directly observed?

---

### 5. Evidence Produced

- What evidence proves the behavior occurred?
  - screenshots
  - recordings
  - logs
  - rendered output
- Where can this evidence be found?

---

### 6. UX & Behavior Check (If Applicable)

- Does the UI or interaction behave as expected?
- Is the behavior understandable without explanation?
- If explanation is required, is that a UX smell?

---

### 7. Tradeoffs & Risks

- What tradeoffs were made?
- What risks remain?
- What assumptions could be wrong?

---

### 8. Maintainability Check

- Would someone else understand this in six months?
- What would be the hardest part to maintain or change?

---

### 9. Confidence Level

- How confident am I that this works as intended?
- What would increase confidence further?

---

## ⚠️ Minimum Acceptable Completion

At a minimum, a completed task must include:
• a stated outcome
• at least one verification step
• at least one piece of evidence
• acknowledgment of tradeoffs or unknowns

If these are missing, the task is not complete.

---

## 🚫 What This Checklist Is Not

This checklist is not:
• a justification exercise
• a sales pitch
• a guarantee of correctness

It is a thinking aid designed to surface problems early.

---

## 🤖 Agent Expectations

Agents and collaborators are expected to:
• fill this checklist before claiming completion
• be concise (one sentence per item is often enough)
• explicitly state uncertainty instead of hiding it

If an agent cannot complete the checklist honestly, the correct action is to continue working or mark the task incomplete.

---

## 💡 Closing Note

This checklist exists to replace repeated back-and-forth questions like:
• “Did you actually run it?”
• “Did you verify this visually?”
• “Why did you choose this approach?”

Those questions should already be answered here.

---

## ✅ Status

- Canon v0.1 — Self-Audit Checklist complete
- Ready to proceed to Canon v0.1 — Visual Proof Standards



--------------------------------------------------------------------------------
📄 File: canon/visual-proof.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/visual-proof
title: "Visual Proof Standards"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: semi_stable
tags: ["visual-proof", "evidence"]
---

# Visual Proof Standards

> What "prove it visually" actually means for UI and interaction work.

## Description

Visual proof standards define what constitutes valid visual evidence for work affecting anything a user can see or interact with. Visual proof is required for UI, layout, navigation, interaction, animation, visible state changes, and user-facing behavior. Acceptable forms include screenshots (clearly labeled, not cropped ambiguously), screen recordings (10-30 seconds showing interaction), rendered output artifacts, and structured UI captures. Before/after evidence is required for changes. Visual proof must show correct state, behavior, and context. Explanations without screenshots do not qualify.

## Outline

- Core Principle: Observed behavior over reasoning
- When Visual Proof Is Required
- Acceptable Forms (Screenshots, Recordings, Artifacts, UI Captures)
- What Visual Proof Must Show
- Labeling Requirements
- Before/After Evidence
- Tooling Expectations
- When Visual Proof Is Not Possible
- What Does Not Count as Visual Proof

---

## Content

**Canon v0.1**

> This defines what "prove it visually" actually means, so neither humans nor agents can wiggle out with vague claims.

This page defines what I mean by visual proof.

If work affects anything a user can see or interact with, I expect direct visual evidence that it behaves as intended.

Visual proof replaces explanation.
If it can’t be shown, it isn’t verified.

---

## 📌 Core Principle

I trust observed behavior more than reasoning.

Visual proof demonstrates that:
• the system was actually run
• the behavior exists in reality
• the output matches the intended outcome

---

## ⚠️ When Visual Proof Is Required

Visual proof is required for any work involving:
• UI or layout
• navigation or flow
• interaction or animation
• visible state changes
• user-facing behavior
• generative UI output

If a user could notice the change, visual proof is required.

---

## 📎 Acceptable Forms of Visual Proof

One or more of the following is required, depending on the task:

**Screenshots**
• Show the relevant state clearly
• Must not be cropped ambiguously
• Must reflect the final behavior

**Screen Recordings (Preferred for Interaction)**
• 10–30 seconds is usually sufficient
• Show the interaction from start to end
• No narration required

**Rendered Output Artifacts**
• Generated HTML files
• Static exports
• Snapshots of rendered states

**Structured UI Captures**
• DOM snapshots
• Component tree states
• Selector highlights

---

## 📋 What Visual Proof Must Show

Visual proof must demonstrate:
• the correct state
• the correct behavior
• the correct context

When relevant, it should include:
• the starting state
• the resulting state
• the transition between them

---

## 🏷️ Labeling Requirements

Each piece of visual proof must be accompanied by a short caption:
• What this proof demonstrates
• Which outcome it supports

One sentence is enough.

Unlabeled screenshots are not acceptable.

---

## 🔄 Before / After Evidence

For changes that modify existing behavior or UI:
• Include “before” and “after” visuals when feasible
• If “before” is unavailable, state why

This makes regressions and improvements obvious.

---

## 🛠️ Tooling Expectations

Visual proof may be produced via:
• browser dev servers
• headless browsers
• automated UI testing tools
• screen capture utilities

The specific tool does not matter.
The evidence does.

---

## 🚫 When Visual Proof Is Not Possible

If visual proof cannot be produced, the output must explicitly state:
• why it was not possible
• what alternative verification was used
• what remains unverified

“Not possible” is acceptable.
“Not mentioned” is not.

---

## ⚠️ What Does Not Count as Visual Proof

The following do not qualify:
• descriptions of expected behavior
• screenshots of code
• diagrams without runtime evidence
• “it looks correct to me”
• reasoning without observation

---

## 🔗 Relationship to Definition of Done

Visual proof is a required component of the Definition of Done for UI-related work.

Without visual proof:
• the task is not complete
• confidence claims are invalid

---

## 🤖 Agent Expectations

Agents are expected to:
• capture visual proof themselves when possible
• request assistance when they cannot
• refuse to claim completion without evidence

Producing visual proof is not optional.
It is part of the work.

---

## 💡 Closing Note

This standard exists to eliminate ambiguity.

If something works:
• it can be shown

If it can’t be shown:
• it isn’t verified

---

## ✅ Status

- Canon v0.1 — Visual Proof Standards complete
- Ready to proceed to Canon v0.1 — Completion Report Template



================================================================================
## ODD (Outcomes-Driven Development)
================================================================================



--------------------------------------------------------------------------------
📄 File: odd/README.md
--------------------------------------------------------------------------------

---
uri: klappy://public/odd
title: "ODD Manifesto — Public"
audience: public
exposure: nav
tier: 0
voice: neutral
stability: semi_stable
tags: ["odd", "public", "overview"]
assets: {"practice_video":"/assets/odd/odd-in-practice.mp4","misconception_image":"/assets/odd/odd-is-not-a-framework.png","deep_dive_audio":"/assets/odd/why-evidence-beats-confidence.m4a"}
---

# 🧠 Outcomes-Driven Development (ODD)

Outcomes-Driven Development (ODD) is an approach to building software that prioritizes real-world results over artifacts.

In an environment where AI can generate code, interfaces, and entire applications quickly, the limiting factor is no longer production speed—it is clarity of intent, quality of verification, and the ability to choose among many possible outcomes.

ODD exists to make those constraints explicit.

---

## The Core Idea

Traditional software development often optimizes for outputs:

- lines of code
- shipped features
- completed tickets

ODD shifts the focus to outcomes:

- Does this solve the real problem?
- Can it be demonstrated, not just explained?
- Will it hold up as conditions change?

Code is still written. Tools still matter. But they are means, not ends.

---

## Why ODD Now

AI changes the economics of software creation.

When generation becomes cheap:

- variation explodes
- artifacts become disposable
- maintenance becomes the real cost

ODD responds by:

- treating code as ephemeral
- emphasizing verification over explanation
- encouraging curation over accumulation

The goal is not to generate _more_ software, but to ship _better_ outcomes with less long-term drag.

---

## Core Principles

ODD is guided by a small set of principles that recur across projects:

- **Prompt over Code**
  Natural language intent guides generation; code is an output, not the source of truth.

- **Keep It Simple (KISS)**
  Prefer the simplest solution that works and can be explained clearly.

- **Don’t Repeat Yourself (DRY), with Isolation**
  Reuse ideas and components where it helps, but avoid brittle global coupling.

- **Consistency**
  Similar problems should feel similar to users and maintainers.

- **Maintainability**
  Optimize for low-effort upkeep and clear handoff, not cleverness.

- **Antifragility**
  Systems should learn from stress and failure, not just survive them.

- **Scalability**
  Growth should increase capability without exploding complexity or cost.

These principles are lenses, not rules. Their application changes as projects mature.

---

## Evidence Over Explanation

ODD places a strong emphasis on evidence.

In practice, this means:

- showing working systems
- favoring visual or experiential proof
- treating explanations as hypotheses until verified

This is especially important in AI-assisted workflows, where fluent explanations are easy to produce but easy to trust incorrectly.

---

## Project Maturity Matters

ODD does not apply the same rigor at every stage.

- **Exploration (PoC)** — bias toward learning and speed
- **Validation (Pilot)** — bias toward proof and repeatability
- **Commitment (Production)** — bias toward trust, durability, and handoff

Rigor increases with maturity. Governance tightens gradually. There are no sharp lines.

---

## What ODD Is Not

ODD is not:

- a framework to install
- a fixed workflow
- a claim that outcomes can be fully predicted

It does not replace judgment. It exists to support it.

---

## How This Repository Uses ODD

This repository applies ODD in two layers:

- **Public-facing** — this document and related writing explain the philosophy in human terms.
- **Canonical** — internal reference documents capture constraints, decision rules, evidence standards, and failure modes.

The Canon is designed for orientation, not enforcement.

---

## On Variance and Learning

In AI-assisted development, outcomes are not deterministic. The same intent can produce different results depending on execution paths.

This site reflects that reality. Ideas are tested, observed, and sometimes retried before conclusions are drawn. What you see here is not a straight line—it's a record of learning under uncertainty.

---

## Where to Go Next

If you want to explore further:

- Read the **extended ODD Manifesto** in `/odd/manifesto.md`
- See how rigor scales in **Project Maturity & Progressive Governance**
- Browse the **Canon Index** to understand how decisions and verification are structured

Or skip the theory and look at projects as they are added over time.

---

> ODD is about preserving intent without freezing execution.
> The measure of success is not how elegant the artifact is, but whether the outcome holds up in the real world.



--------------------------------------------------------------------------------
📄 File: odd/TEMPLATE.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/template
title: "ODD Article Template"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["odd", "template"]
---

# ODD Article Template

> Template for universal principles that transcend any single implementation.

## Description

This template defines the standard structure for ODD articles. ODD contains universal principles—truths that would still be valid in 10 years, for any team, in any context. ODD is the most stable layer. Use this template when adding new principles or philosophy documents.

## Outline

- When to Add to ODD
- Frontmatter Fields
- Document Structure
- Example

---

## When to Add to ODD

Add to ODD when:

- The principle would still be true in 10 years
- The principle applies regardless of implementation
- The principle would survive if klappy.dev disappeared

Do NOT add to ODD when:

- It's program-specific → `/canon/`
- It's implementation-specific → `/docs/`
- It's lane-specific → `/products/<lane>/`

**Litmus test:** Would this still be true if klappy.dev didn't exist? → ODD ✓

---

## Frontmatter Fields

```yaml
---
uri: klappy://odd/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "philosophy", "topic"]
---
```

### ODD-Specific Values

| Field | Typical Value | Notes |
|-------|---------------|-------|
| `audience` | `canon` | ODD is canon-level content |
| `tier` | `1` | Core philosophical content |
| `voice` | `neutral` | Universal, not personal |
| `stability` | `stable` | ODD almost never changes |

---

## Document Structure

```markdown
---
uri: klappy://odd/<name>
title: "Title"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "philosophy"]
---

# Title

> One-line universal principle.

## Description

1-2 paragraph compressed overview. What is this principle?
Why is it universal? How does it shape thinking?

## Outline

- Section 1
- Section 2
- Section 3

---

## Content

[Full philosophical content...]

---

## See Also

- [Related ODD](/odd/appendices/related.md)
- [ODD Manifesto](/odd/manifesto.md)
```

---

## Example

```markdown
---
uri: klappy://odd/example-principle
title: "Example Principle"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "philosophy", "example"]
---

# Example Principle

> Durable thinking is scarce; generated artifacts are abundant.

## Description

This principle recognizes that human cognitive bandwidth is limited
while machine output is cheap. Systems should optimize for preserving
valuable thinking, not for preserving generated artifacts.

## Outline

- The Scarcity
- The Abundance
- The Implication

---

## Content

### The Scarcity

[Why durable thinking is rare...]

### The Abundance

[Why generated artifacts are cheap...]

### The Implication

[What this means for system design...]
```

---

## See Also

- [ODD Index](/odd/README.md)
- [ODD Manifesto](/odd/manifesto.md)
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md)



--------------------------------------------------------------------------------
📄 File: odd/appendices/README.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/appendices
title: "ODD Appendices (Portable)"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "appendices", "index", "portable"]
---

# ODD Appendices (Portable)

Extended concepts that deepen understanding without introducing enforcement. These are diagnostic and orientation documents, not requirements.

> **Note:** Implementation-specific appendices have been moved to `/docs/appendices/`. This folder contains only portable methodology that can apply to any ODD-following repository.

---

## Contents

| File | Title | Summary |
|------|-------|---------|
| `alignment-reviews.md` | Alignment Reviews | Periodic evaluation of the ODD system itself to detect drift between stated intent, implemented process, and observed outcomes. |
| `evolution-not-automation.md` | Evolution, Not Automation | This system optimizes learning, not execution. Humans stay in the loop. |
| `failure-driven-modularity.md` | Failure-Driven Modularity | Modular boundaries are introduced only after repeated failure to regenerate from spec. Modularity is an outcome of failure, not a prerequisite. |
| `media-as-learning-layer.md` | Media as a Learning Layer | Media reduces cognitive load over stable written content. Canonical truth lives in text. |
| `progressive-elevation.md` | Progressive Elevation & Decay | The five-layer portability model: how artifacts move from ephemeral attempts to durable canon through strict elevation criteria. Most should decay; few should elevate. |
| `quantum-development.md` | Quantum Development | Why multiple attempts against the same PRD are sometimes necessary before changing the PRD itself. |
| `visual-evolution.md` | Visual Evolution | Visual systems evolve independently from products through versioned visual interfaces. |

---

## Implementation-Specific Appendices

The following have been moved to `/docs/appendices/` as they contain klappy.dev-specific implementation details:

- `attempt-lifecycle.md` — Attempt folder structure, CLI commands, META.json schema
- `compilation.md`, `compiled-memory.md`, `compilation-targets.md` — Compilation paths and tooling
- `epochs.md` — E0003 evidence requirements with Cloudflare specifics
- `evidence.md`, `deploy-evidence.md`, `online-evidence.md` — Evidence path structure
- `lane-build-layout.md`, `lane-implementation-surfaces.md` — Lane-specific paths
- `product-lanes.md` — Specific lane names (website, ai-navigation, agent-skill)
- `repo-topology.md`, `repo-truth.md`, `repo-truth-audit.md` — Specific folder structures
- `canonical-compression.md`, `memory-architecture.proposed.md` — Compilation and memory paths

---

## When to Read What

**Understanding ODD methodology?** Start with these portable appendices.

**Implementing ODD in your own repo?** Use these as the conceptual foundation.

**Understanding klappy.dev specifics?** Read `/docs/appendices/` instead.

---

## Relationship to Canon

These appendices extend the core canon documents:

- `constraints.md` → appendices explain edge cases
- `definition-of-done.md` → evidence philosophy here, evidence procedures in docs
- `odd/manifesto.md` → appendices operationalize philosophy



--------------------------------------------------------------------------------
📄 File: odd/appendices/TEMPLATE.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/appendices/template
title: "ODD Appendix Template"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "template"]
---

# ODD Appendix Template

> Template for ODD appendices that elaborate on core principles.

## Description

This template defines the standard structure for ODD appendices. Appendices elaborate on ODD principles with deeper analysis, examples, or edge cases. They are still universal (not implementation-specific) but are tier 2 content—revealed after the core principles.

## Outline

- When to Add an ODD Appendix
- Frontmatter Fields
- Document Structure
- Example

---

## When to Add an ODD Appendix

Add an ODD appendix when:

- It elaborates on an existing ODD principle
- It's universal (not klappy.dev-specific)
- It's too detailed for the core principle document

Do NOT add an ODD appendix when:

- It's implementation-specific → `/docs/appendices/`
- It's a new core principle → `/odd/`
- It's a decision record → `/odd/decisions/`

---

## Frontmatter Fields

```yaml
---
uri: klappy://odd/appendices/<name>
title: "Title"
audience: odd
exposure: nav
tier: 1 | 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "topic"]
---
```

### Appendix-Specific Values

| Field | Typical Value | Notes |
|-------|---------------|-------|
| `audience` | `odd` | ODD appendix content |
| `tier` | `1` or `2` | Core elaboration or edge cases |
| `voice` | `neutral` | Universal, not personal |
| `stability` | `stable` | ODD appendices rarely change |

---

## Document Structure

```markdown
---
uri: klappy://odd/appendices/<name>
title: "Title"
audience: odd
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "topic"]
---

# Title

> One-line description of what this appendix elaborates.

## Description

1-2 paragraph compressed overview. What principle does this elaborate?
What additional depth does it provide?

## Outline

- Section 1
- Section 2
- Section 3

---

## Content

[Full content...]

---

## See Also

- [Parent Principle](/odd/related.md)
- [Related Appendix](/odd/appendices/related.md)
```

---

## Example

```markdown
---
uri: klappy://odd/appendices/example-elaboration
title: "Example Elaboration"
audience: odd
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "appendices", "example"]
---

# Example Elaboration

> How the scarcity principle applies to documentation systems.

## Description

This appendix elaborates on the scarcity principle by examining how
it applies specifically to documentation systems. It provides examples
of decay-by-default and elevation criteria.

## Outline

- The Problem
- The Pattern
- The Application

---

## Content

### The Problem

[Why documentation sprawl happens...]

### The Pattern

[How decay-by-default works...]

### The Application

[Specific examples...]
```

---

## See Also

- [ODD Appendices Index](/odd/appendices/README.md)
- [ODD Index](/odd/README.md)



--------------------------------------------------------------------------------
📄 File: odd/appendices/alignment-reviews.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/alignment-reviews
title: "Alignment Reviews"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "alignment", "drift", "hygiene", "selection-pressure"]
---

# Alignment Reviews

> Periodic evaluation of the ODD system itself to detect drift.

## Description

Alignment Reviews are periodic evaluations that detect and correct drift between stated intent, implemented process, and observed outcomes. They apply to content, process, and tooling equally. Reviews evaluate Canon (contradicted rules, obsolete references, undocumented invariants), PRDs (actual decision criteria, implicit patching, lane bleeding), Attempts (incompatible comparisons, ignored failures, insufficient evidence), and Tooling (enforced invariants, accidental drift, silent compensation). Reviews are triggered by events (epoch transitions, repeated failures, PRD rewrites) not schedules. They produce corrections, not features.

## Outline

- Summary
- Why This Exists
- What Is Reviewed (Canon, PRDs, Attempts, Tooling)
- When Reviews Occur
- What Reviews Produce
- Non-Goals
- Core Invariant

---

## Content

Its purpose is to detect and correct **drift** between:
- stated intent
- implemented process
- observed outcomes

Alignment Reviews apply to **content, process, and tooling** equally.

They do not produce features.
They produce corrections.

---

## Why This Exists

Outcome-Driven Development assumes:
- rapid iteration
- parallel attempts
- evolving intent

These conditions create drift by default.

Without an explicit alignment mechanism:
- outdated rules persist
- assumptions fossilize
- successful outcomes are misattributed
- failed outcomes are rationalized

Alignment Reviews introduce **selection pressure against incoherence**.

---

## What Is Reviewed

An Alignment Review evaluates:

### Canon
- Are any canon rules contradicted by current practice?
- Are obsolete rules still referenced?
- Are new invariants emerging without documentation?

### PRDs (Per Lane)
- Do PRDs still reflect actual decision criteria?
- Are PRDs being patched implicitly via attempts?
- Are lanes bleeding into each other?

### Attempts
- Are outcomes being compared across incompatible contexts?
- Are failures producing learning, or being ignored?
- Is evidence sufficient to justify promotion?

### Tooling
- Does tooling enforce stated invariants?
- Does tooling encourage accidental drift?
- Are humans compensating for tooling gaps silently?

---

## When Reviews Occur

Alignment Reviews are triggered by **events**, not schedules.

Typical triggers include:
- Epoch transitions
- Repeated unexplained failures
- Major PRD rewrites
- Tooling changes that affect workflow
- Persistent disagreement about outcomes

They may also be run opportunistically.

---

## What Reviews Produce

An Alignment Review may result in:
- Canon updates (via decision logs)
- PRD clarification or split
- Epoch declaration
- Tooling constraints
- Explicit deprecation of rules or documents

Reviews **do not**:
- retroactively invalidate evidence
- rewrite history
- assign blame

---

## Non-Goals

Alignment Reviews are not:
- performance reviews
- approval gates
- compliance checklists
- automation requirements

They exist to preserve **truthfulness**, not control.

---

## Core Invariant

If alignment cannot be explained clearly,
it does not exist.

Drift that is invisible is more dangerous than failure.



--------------------------------------------------------------------------------
📄 File: odd/appendices/evolution-not-automation.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/evolution-not-automation
title: "Evolution, Not Automation"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "evolution", "automation", "orientation"]
---

# Evolution, Not Automation

> This system optimizes learning, not execution.

## Description

ODD is often mistaken for an attempt to automate software development. It is not. Automation optimizes execution; evolution optimizes learning. ODD is designed for disciplined evolution: humans define intent (PRDs, constraints, DoD), agents generate variation (independent attempts), reality provides feedback (evidence), humans perform selection (promotion/rejection), and learnings are retained. Humans stay in the loop because fully automated selection optimizes for what is easy to measure rather than what actually matters. All evolution is discrete, auditable, reversible, and bounded.

## Outline

- Why This Appendix Exists
- What We Are Not Doing
- What We Are Doing Instead
- Why Humans Stay in the Loop
- Evolutionary Scope
- Controlled, Not Runaway
- The Core Principle

---

## Content

**Status:** Orientation  
**Audience:** Internal / Canon  
**Scope:** Keep learning/evolution distinct from automation

---

## Why This Appendix Exists

This system is often mistaken for an attempt to automate software development.

It is not.

Automation optimizes execution.  
Evolution optimizes learning.

The difference matters.

---

## What We Are Not Doing

We are not building a system that:

- automatically decides what to build
- automatically selects winners
- automatically rewrites its own goals
- optimizes hidden metrics without human review

Those paths tend to collapse into proxy optimization, confidence theater, or silent drift.

---

## What We Are Doing Instead

We are designing a system that supports disciplined evolution:

- Humans define intent (PRDs, constraints, Definition of Done)
- Agents generate variation (independent attempts)
- Reality provides feedback (evidence, behavior, performance)
- Humans perform selection (promotion or rejection)
- Learnings are retained (PRD patches, decision logs, sealed artifacts)

This mirrors evolutionary systems without surrendering judgment.

---

## Why Humans Stay in the Loop

Fully automated selection optimizes for what is easiest to measure.

Human review optimizes for what actually matters.

By keeping humans responsible for:

- approving PRD changes
- evaluating evidence
- selecting champions

we prevent the system from drifting toward shallow success criteria or self-reinforcing errors.

---

## Evolutionary Scope

Evolution in this system applies to:

- problem definitions (PRDs)
- success criteria (DoD)
- constraints (performance, usability, deployability)
- measurement methods (what counts as evidence)

Implementation code is disposable.  
Learning is not.

---

## Controlled, Not Runaway

All evolution is:

- discrete (versioned PRDs, sealed attempts)
- auditable (evidence over explanation)
- reversible (commit SHAs are truth)
- bounded (no self-modifying goals)

If a change cannot be explained, evidenced, and reviewed, it does not propagate.

---

## The Core Principle

We are not trying to make software build itself.

We are trying to make truth accumulate faster than mistakes.

Automation accelerates output.  
Evolution, done carefully, accelerates understanding.

This appendix exists to keep that distinction explicit—and to prevent future readers (human or AI) from optimizing the wrong thing.




--------------------------------------------------------------------------------
📄 File: odd/appendices/failure-driven-modularity.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/appendices/failure-driven-modularity
title: "Failure-Driven Modularity"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "evolution", "modularity", "regenerability"]
---

# Failure-Driven Modularity

> Modular boundaries emerge from repeated failure, not upfront design.

## Description

In ODD, modular boundaries are introduced only after repeated, documented failure to regenerate a system from its specification. Successful regeneration proves the system remains cognitively tractable as a single unit. A failure is when the generated system diverges materially, constraints are repeatedly omitted, specifications need ad hoc re-explanation, or attempts converge inconsistently. Only patterned failure justifies decomposition. The evolution rule: begin with the smallest viable specification, attempt regeneration, do not modularize if it succeeds, extract the smallest region of cognitive overload if it fails repeatedly.

## Outline

- Summary
- Definition of Failure
- The Evolution Rule
- Rationale
- Implications
- Non-Goals
- Related Canon

---

## Content

Successful regeneration is evidence that the system remains cognitively tractable as a single unit.
Repeated failure is evidence that the boundary is incorrect and must be revised.

Modularity is therefore an *outcome of failure*, not a prerequisite for success.

---

## Definition of Failure

A regeneration attempt is considered a **failure** when one or more of the following occur
despite reasonable effort:

- The generated system diverges materially from the intended behavior.
- Critical constraints are repeatedly omitted or misapplied.
- The specification must be re-explained in ad hoc or situational ways.
- Multiple regeneration attempts converge inconsistently.

Single failures are not sufficient.
Only **patterned failure** justifies decomposition.

---

## The Evolution Rule

1. Begin with the smallest viable specification that expresses the desired outcome.
2. Attempt full regeneration from that specification.
3. If regeneration succeeds, **do not modularize**.
4. If regeneration fails repeatedly:
   - Identify the smallest region of cognitive overload.
   - Extract that region into its own independently regenerable specification.
5. Repeat recursively.

This process continues until each module can be regenerated reliably and independently.

---

## Rationale

Traditional software architecture encourages early modularization based on anticipated reuse.
This introduces speculative boundaries, premature abstractions, and unnecessary coordination cost.

ODD replaces prediction with evidence.

A boundary is justified **only when failure proves it necessary**.

---

## Implications

- Architectural structure emerges empirically.
- Teams do not need shared architectural taste, only shared failure criteria.
- Systems evolve without centralized design authority.
- Regeneration remains feasible as complexity increases.

---

## Non-Goals

Failure-Driven Modularity does **not** claim that:

- All systems should be maximally decomposed.
- Regeneration will always succeed.
- Existing stable systems must be restructured.

It applies only to systems being actively evolved under ODD.

---

## Related Canon

- Reproducibility Test
- Outcome Promotion vs Artifact Preservation
- Regenerability as a First-Class Constraint

---

## Derivation

For historical and conceptual motivation, see:

> **From Reusability to Regenerability**  
> Canonical Derivation, `/canon/derivations/reusability-to-regenerability.md`



--------------------------------------------------------------------------------
📄 File: odd/appendices/media-as-learning-layer.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/media-as-learning-layer
title: "Media as a Learning Layer"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "media", "learning", "progressive-disclosure", "website"]
---

# Media as a Learning Layer

> Media reduces cognitive load over stable written content.

## Description

Media exists to reduce cognitive load, not increase it. It is a learning layer over stable written content—optional, contextual, and regenerable. Canonical truth lives in text; media supports understanding but does not define it. Core rules: clarity is the default (not any specific medium), media is not canon, progressive disclosure is mandatory (opt-in only, no autoplay), media must match learning intent (diagrams for mental models, short video for orientation, audio for reflection), and media is created only for stable content. The system rejects media-first pages, content dumps, and redundant explanations.

## Outline

- Summary
- Core Rules
  - Clarity is the default
  - Media is not Canon
  - Progressive disclosure is mandatory
  - Match media to learning intent
  - Stability before production
- Anti-Patterns (Explicitly Rejected)
- Compliance Note

---

## Content

Media is a **learning layer** over stable written content.
It is optional, contextual, and regenerable.

**Canonical truth lives in text.**
Media supports understanding — it does not define it.

---

## Core Rules

### 1) Clarity is the default
Text is not the default.
Video is not the default.
Audio is not the default.

**Clarity is the default.**

Media is used only when it teaches faster or better than text alone.

---

### 2) Media is not Canon
Canonical truth is preserved in:
- markdown content
- frontmatter
- decision records
- evidence policies

Media assets are:
- supporting artifacts
- replaceable / regenerable
- optional

**The ownership and placement of media is canonical.**
The media itself is not.

---

### 3) Progressive disclosure is mandatory
All media must be **opt-in**.

Allowed interactions:
- Watch
- Listen
- View diagram
- Download

Disallowed patterns:
- autoplay (anywhere)
- background video
- forced consumption
- media that blocks navigation or comprehension

The default experience must remain:
- readable
- navigable
- understandable
- usable without media

---

### 4) Match media to learning intent
Media must be chosen based on the learning outcome:

- **Images / diagrams**
  - Establish mental models
  - Replace multi-paragraph explanations
- **Short video (≤ 90 seconds)**
  - Orientation and framing
  - Not exhaustive detail
- **Audio**
  - Reflection and deeper thinking
  - Always optional
- **PDF**
  - Reference, synthesis, offline use
  - Never required for basic understanding

Each asset must answer:
> What does this teach faster or better than text?

If it cannot answer, it does not belong.

---

### 5) Stability before production
Media is created only for **stable content**.

Draft or evolving ideas remain text-first until:
- the concept stabilizes
- the page stops churn
- the narrative is unlikely to drift

This prevents:
- outdated explainers
- conflicting narratives
- re-record churn

Media follows clarity — not the other way around.

---

## Anti-Patterns (Explicitly Rejected)

The system intentionally avoids:
- media-first pages
- content dumps / galleries
- redundant explanations across formats
- "just in case" assets
- polish media used to compensate for unclear thinking

If removing a piece of media would break understanding, that is a design failure.

---

## Compliance Note

Product PRDs may reference this appendix.
They should not re-litigate the philosophy.

PRDs define **how** the lane applies this principle.
This appendix defines the governing constraint.



--------------------------------------------------------------------------------
📄 File: odd/appendices/progressive-elevation.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/appendices/progressive-elevation
title: Progressive Elevation & Decay
audience: odd
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "memory", "portability", "elevation", "decay"]
status: canonical
category: odd-appendix
version: 1.0
---

# Progressive Elevation & Decay

> How artifacts move from ephemeral attempts to durable Canon through strict elevation criteria.

## Description

ODD treats durable thinking as scarce and generated artifacts as abundant—most should decay while only patterns that reduce future drag should elevate. The five layers of portability are Conversation/Attempt, Product Lane/PRD, Interoperability/Contracts, Canon, and Decision Trace. Elevation requires recurrence, portability, drag reduction, and testability; if any criterion fails, the artifact stays local or dies.

## Outline

- Summary
- The Five Layers of Portability
- Elevation Criteria (Strict)
- Decay Rule (Default)
- Where This Fits With Lanes and Epochs

---

## Content

## Summary

ODD treats **durable thinking** as scarce and **generated artifacts** as abundant.

Most artifacts should **decay** (be discarded or sealed as evidence).
Only patterns that repeatedly reduce future drag should **elevate** into more durable layers.

This is how the repository avoids documentation sprawl while remaining portable across:
- time (future-you),
- people (collaborators),
- and agents (tooling that reasons over the corpus).

---

## The Five Layers of Portability

### 1) Conversation / Attempt (Ephemeral)

**What it is:** raw chats, prompts, branches, quick experiments, and run folders.  
**Default fate:** extract value → seal evidence → discard everything else.

**Lives in:**
- `/products/<lane>/attempts/prd-vX.Y/_runs/<run_id>/`
- transient branches / worktrees
- PRD patches produced by failure

**Elevate when:** a failure mode repeats and you can state it as a stable rule, constraint, or test.

---

### 2) Product Lane / PRD (Project-Local)

**What it is:** current intent for a specific product lane.  
**Default fate:** churn freely. PRDs are disposable and should change as reality is observed.

**Lives in:**
- `/docs/PRD/<lane>/PRD.md`

**Elevate when:** a requirement becomes reusable across lanes/projects, or becomes an interface boundary.

---

### 3) Interoperability / Contracts (Portability Bridge)

**What it is:** explicit interfaces that allow portability across tools, agents, and products.

Contracts are where compatibility becomes real.

**Lives in:**
- `/interfaces/**` (semver'd contracts)
- shared inputs/outputs, schemas, stable runtime paths

**Elevate when:** multiple projects repeatedly need the same boundary and drift becomes expensive.

---

### 4) Canon (Durable, Lean)

**What it is:** curated, high-signal rules and lenses that survive multiple contexts.

Canon is intentionally small. If it bloats, that is a signal to curate harder, not to add more.

**Lives in:**
- `/canon/**`

**Elevate when:** a pattern recurs across multiple projects/lenses and stays true even when tooling changes.

---

### 5) Decision Trace (Why It Changed)

**What it is:** lightweight records explaining why the system moved.

Decisions preserve context without polluting Canon with history.

**Lives in:**
- `/odd/decisions/**`

**Elevate when:** a change affects interpretation, compatibility, or the "rules of the game."

---

## Elevation Criteria (Strict)

Something may be elevated only if it satisfies all of the following:

1. **Recurrence**: it appears across multiple attempts or projects (not a one-off).
2. **Portability**: it remains true across different stacks/models/tools.
3. **Drag Reduction**: it prevents repeated confusion, re-explanation, or failure.
4. **Testability**: it can be expressed as a check, constraint, or falsifiable claim.

If any criterion fails, the artifact stays local (Attempt/PRD) or dies.

---

## Decay Rule (Default)

Most artifacts should not be preserved.

ODD assumes:
- generation is abundant,
- maintenance is the tax you pay forever,
- and residue creates epistemic drift.

Discarding is not nihilism. It is how the system stays legible.

---

## Where This Fits With Lanes and Epochs

- **Product lanes** isolate intent and success criteria so that unrelated surfaces do not drift together.
- **Epochs** define comparability boundaries when the "rules of the game" change.

This document explains the memory model underneath both.

See also:
- `/docs/appendices/product-lanes.md`
- `/docs/appendices/epochs.md`



--------------------------------------------------------------------------------
📄 File: odd/appendices/quantum-development.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/quantum-development
title: "Quantum Development"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "quantum", "attempts", "uncertainty", "orientation"]
---

# Quantum Development

> Why multiple attempts against the same PRD are sometimes necessary.

## Description

Quantum Development is a way of reasoning about uncertainty in AI-assisted development. Given the same PRD, different agents, prompts, and execution paths can produce meaningfully different results. Each attempt is an independent observation of the same specification. The goal is to distinguish specification failure from execution-path variance. A PRD is a hypothesis, an attempt is an experimental run, an outcome is an observation. Multiple attempts allow patterns to emerge and prevent premature convergence. Quantum Development is appropriate when the PRD is clear but failure is ambiguous. It ends when one candidate is promoted.

## Outline

- Purpose
- Core Idea
- PRD vs Attempt (Clarified)
- Why This Matters
- When Quantum Development Is Appropriate
- When to Change the PRD Instead
- Independence Requirement
- Outcome Interpretation
- On Timing and Observation
- Relationship to ODD
- What This Appendix Is Not
- Summary

---

## Content

## Purpose

This appendix formalizes Quantum Development as a way of reasoning about uncertainty in AI-assisted software development.

It explains why multiple attempts against the same PRD are sometimes necessary before changing the PRD itself.

This is an orientation model, not a workflow.

---

## Core Idea

In AI-assisted development, outcomes are non-deterministic.

Given the same PRD:

- different agents,
- different prompts,
- different execution paths,

can produce meaningfully different results.

Quantum Development treats each implementation attempt as an independent observation of the same specification.

The goal is to distinguish:

- specification failure from
- execution-path variance.

---

## PRD vs Attempt (Clarified)

- **PRD** = hypothesis
- **Attempt** = experimental run
- **Outcome** = observation

A single attempt provides insufficient evidence to judge the PRD.

Multiple attempts allow patterns to emerge.

---

## Why This Matters

Without multiple attempts, teams risk:

- **False negatives**
  Declaring a PRD "bad" when a single execution path failed.

- **False positives**
  Declaring a PRD "good" because one attempt happened to succeed.

Both lead to premature convergence.

Quantum Development exists to delay collapse of the PRD until enough signal exists.

---

## When Quantum Development Is Appropriate

Multiple attempts against the same PRD are appropriate when:

- The PRD is clear and internally consistent
- Failure is ambiguous (not obviously caused by missing requirements)
- The system involves AI agents or probabilistic behavior
- Execution choices materially affect outcomes

This is common in:

- agentic workflows
- prompt-driven systems
- generative UI
- complex orchestration logic

---

## When to Change the PRD Instead

Changing the PRD is appropriate when:

- Attempts fail due to missing constraints or goals
- Success criteria are unclear or contradictory
- Attempts stall due to underspecification
- New information invalidates the original intent

Quantum Development is not an excuse to avoid revising a bad PRD.

---

## Independence Requirement (Clarified)

Independence in Quantum Development is epistemic, not intrinsic to any specific tool or infrastructure.

An attempt is independent if:

- decisions are not steered by prior outcomes,
- implementation state is fresh,
- and the approach represents a genuine re-instantiation of the PRD.

Independence is therefore a property of decision-making and state, not of deployment mechanics.

### Infrastructure for Observability (Supporting, Not Defining)

Version control systems, isolated branches, and preview deployments do not create independence.

They support independence by:

- preventing accidental state leakage,
- enabling parallel observation of outcomes,
- and preserving each attempt as an inspectable artifact.

Infrastructure exists to protect and surface independence, not to define it.

Confusing infrastructural isolation with epistemic independence is a common failure mode in AI-assisted development.

See `/docs/appendices/attempt-lifecycle.md` for the attempt model and the “PRD as the unit of test” framing.

---

## Outcome Interpretation (Conceptual)

Observed outcomes across attempts can be interpreted as follows:

| Pattern                              | Implication                |
| ------------------------------------ | -------------------------- |
| Multiple failures, same failure mode | PRD likely flawed          |
| Failure → success                    | Execution-path sensitivity |
| Multiple successes                   | PRD likely robust          |
| Divergent behaviors                  | PRD underspecified         |

These interpretations are signals, not proofs.

Judgment is still required.

---

## On Timing and Observation

Quantum Development does not require attempts to run simultaneously.

Attempts may be:

- sequential or parallel
- human-driven or agent-driven
- observed over time rather than at once

The key requirement is not simultaneity, but comparability.

---

## Relationship to ODD

Quantum Development reinforces core ODD principles:

- **Outcomes over artifacts**
  Success is judged by results, not by effort or code reuse.

- **Prompt over code**
  Execution paths vary; intent must be tested across them.

- **Antifragility**
  Variance is not noise to eliminate but signal to observe.

- **Restartability**
  Clean restarts are a feature, not a failure.

---

## What This Appendix Is Not

Quantum Development is not:

- a requirement to always run multiple attempts
- a mandate to avoid PRD changes
- a replacement for engineering judgment
- a statistical guarantee

It is a lens for reasoning about uncertainty.

---

## Summary

Quantum Development acknowledges a reality of modern software:

> The same intent can produce multiple valid (or invalid) realities.

By observing more than one, teams reduce the risk of mistaking chance for truth.

**Quantum Development ends when one candidate is promoted.**

Observations without promotion are incomplete experiments. See the Champion selection and promotion procedure in `/docs/appendices/attempt-lifecycle.md`.

---

## Status

- Orientation-only
- Non-prescriptive
- Applies primarily to AI-assisted systems



--------------------------------------------------------------------------------
📄 File: odd/appendices/visual-evolution.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/visual-evolution
title: "Visual Evolution"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "visual", "evolution", "interfaces"]
---

# Visual Evolution

> Visual systems evolve independently through versioned interfaces.

## Description

In ODD, visual systems evolve independently from products. Visual consistency is enforced through versioned visual interfaces and evolutionary selection of visual assets, not shared components or frozen style guides. Products consume visual systems as contracts. Visual decisions are explicit, versioned, testable, and replaceable—treated like API decisions. Three layers exist: Visual Interfaces (compatibility contracts, slow, versioned), Visual Assets (generated outputs, disposable), and Visual Attempts (evolutionary exploration, ephemeral). Visual evolution follows the same promotion rules as code. Products declare compatibility; they do not own visuals.

## Outline

- Summary
- The Core Principle
- Visual Layers
- Visual Interfaces
- Visual Assets
- Visual Attempts
- Promotion Model
- Separation from Product Lanes
- Relationship to Evolutionary Development
- Non-Goals
- Related Canon

---

## Content

Visual consistency is not enforced through shared components or frozen style guides.
It is enforced through **versioned visual interfaces** and **evolutionary selection of visual assets**.

Products consume visual systems as contracts.
Visual systems are not embedded inside product PRDs.

---

## The Core Principle

> **Visual consistency is a property of contracts, not code.**

Visual decisions are treated the same way as API decisions:
- Explicit
- Versioned
- Testable
- Replaceable

A product does not "own" its visuals.
It declares compatibility with a visual interface.

---

## Visual Layers

Visual concerns are split into three distinct layers:

| Layer | Purpose | Mutability |
|-------|---------|------------|
| Visual Interfaces | Compatibility contracts | Slow, versioned |
| Visual Assets | Generated outputs | Disposable |
| Visual Attempts | Evolutionary exploration | Ephemeral |

---

## Visual Interfaces

Visual interfaces define **what consumers may rely on**, not how visuals are implemented.

They include:
- Color systems
- Typography systems
- Spacing scales
- Motion primitives
- Iconography rules

Visual interfaces:
- Are versioned using semantic versioning
- Define breaking vs additive changes
- Contain no implementation code
- Are required for product compatibility

Example declaration (in a product PRD):

```markdown
## Visual Interfaces

This product MUST remain compatible with:
- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
```

---

## Visual Assets

Visual assets are outputs, not sources of truth.

They may include:
- CSS token files
- JSON theme descriptors
- Generated previews
- Screenshots

Rules:
- Assets may be regenerated
- Assets may be deleted
- Assets are always downstream of interfaces
- Assets are never authoritative

---

## Visual Attempts

Visual attempts are bounded experiments that propose changes to a visual interface or generate candidate assets.

They:
- Compete against each other
- Are evaluated on evidence, not taste
- Produce screenshots, recordings, and artifacts
- Do not directly modify products

Only a championed visual attempt may advance an interface version.

---

## Promotion Model

Visual evolution follows the same promotion rules as code:

| Stage | Result |
|-------|--------|
| Attempt | Exploration |
| Evidence | Observable comparison |
| Champion | Selected outcome |
| Promotion | Interface version update |

Products may upgrade visual compatibility only after promotion.

---

## Separation from Product Lanes

Visual evolution MUST NOT be embedded in product PRDs.

Products:
- Declare compatibility
- Consume visual interfaces
- Do not define colors, fonts, or spacing directly

Visual systems:
- Evolve independently
- May be AI-driven
- May change faster than products

This separation prevents visual churn from invalidating product experiments.

---

## Relationship to Evolutionary Development

Visual evolution is an explicit application of evolutionary principles:
- Variation via attempts
- Selection via evidence
- Retention via contracts

Visual systems form their own fitness landscape.
Products adapt to stable interfaces, not raw experimentation.

---

## Non-Goals

Visual Evolution does NOT claim:
- That one global style must exist
- That visuals must be AI-generated
- That products must share identical appearance

It exists to preserve compatibility, comparability, and reversibility.

---

## Related Canon

- [Product Lanes](./product-lanes.md)
- [Attempt Lifecycle](./attempt-lifecycle.md)
- [Interface Contracts](/interfaces/index.md)
- [Epochs](./epochs.md)



--------------------------------------------------------------------------------
📄 File: odd/cognitive-partitioning.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/cognitive-partitioning
title: "Cognitive Partitioning"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["odd", "cognition", "scaling", "decision-load"]
---

# Cognitive Partitioning

> Why reasoning systems must divide under pressure, just like execution systems do.

## Description

As systems accumulate tools, context, and responsibilities, the decision surface of a
single reasoning entity expands faster than its reliability.

Cognitive Partitioning names this constraint and explains why isolating reasoning
responsibilities becomes necessary as systems scale. The concept is universal and
does not prescribe any specific implementation.

## Outline

- The failure mode
- The underlying constraint
- Analogy: hiring too early
- Relationship to other ODD concepts
- Non-goals

---

## The Failure Mode

When a reasoning system has access to too many valid actions, it begins to fail
not from lack of capability, but from excess choice.

Symptoms include hesitation, inconsistent behavior, over-exploration, and repeated
clarification loops — even when the tools themselves are "correct."

---

## The Constraint

Decision complexity grows faster than execution capability.

Past a threshold, adding more tools can degrade reliability unless reasoning scope
is reduced.

---

## Analogy: Hiring Too Early

The same failure mode appears in early-stage teams.

Effective startups rarely hire a large staff upfront and then decide what each
person should do. Instead, they operate with a small, generalist core until
specific pain becomes visible — missed deadlines, overloaded founders, or repeated
failures in a narrow area.

Hiring occurs in response to pressure, not anticipation.

Teams that hire ahead of demonstrated need experience the same symptoms as
overloaded reasoning systems:
- unclear ownership
- duplicated or conflicting work
- excessive coordination
- founders managing people instead of outcomes

Cognitive Partitioning follows the same rule. Reasoning capacity is expanded only
when existing structures can no longer reliably absorb the load.

---

## Relationship to Other ODD Concepts

Product Lanes partition execution to preserve evidence integrity.
Cognitive Partitioning applies the same pressure logic to reasoning itself.

---

## Non-goals

This document does not define:
- specific agents
- specific tools or MCP servers
- orchestration frameworks
- required workflows

It explains why systems evolve toward isolation as complexity grows.

---

## See Also

- [Product Lanes](/docs/appendices/product-lanes.md) — Execution partitioning under pressure
- [ODD Misuse Patterns](/odd/misuse-patterns.md) — Common failure modes (diagnostic)



--------------------------------------------------------------------------------
📄 File: odd/contract.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/contract
title: "ODD System Contract"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "contract", "version", "semver", "compatibility"]
---

# ODD System Contract

> The single source of truth for ODD workflow compatibility.

## Description

The ODD System Contract versions the three-tier hierarchy (ODD/Canon/Docs), repo structure, PRD lanes, attempt lifecycle, tooling invariants, required paths, provenance requirements (META.json), and evidence standards. Current version is 2.1.0. Version 2.1.0 formalizes the three-tier conceptual hierarchy where ODD contains universal principles, Canon contains program constraints, and Docs contains implementation details. Each tier has different decay rates. Epochs mark shifts in the evaluation landscape. Do not compare outcomes across epochs without explicit adjustment.

## Outline

- What This Versions
- Epochs (E0001, E0002)
- Contract 2.0.0 Breaking Changes
- Compatibility (Forward and Backward)
- Version History

---

## Content

**Current Version:** 2.1.0

This document is the single source of truth for the ODD workflow contract version.

All other documents reference this version. Individual PRDs, attempts, and content packs have their own versioning schemes, but compatibility with the ODD system is determined by this contract.

---

## What This Versions

The ODD System Contract covers:

- **Three-tier hierarchy** (ODD → Canon → Docs)
- **Repo structure** required for ODD workflow
- **PRD lanes** and attempt lifecycle contracts
- **Tooling invariants** (register/nuke/finalize/promote)
- **Required paths** and naming conventions
- **Provenance requirements** (META.json schema)
- **Evidence standards** (what counts as proof)

---

## Three-Tier Hierarchy (2.1.0)

ODD is organized as a conceptual hierarchy with different decay rates:

| Tier | Location | Contains | Decay Rate |
|------|----------|----------|------------|
| **ODD** | `/odd/` | Universal principles (timeless, product-agnostic) | Almost never |
| **Canon** | `/canon/` | Program-level constraints (shared rules across products) | Carefully |
| **Docs** | `/docs/` | Implementation details (how this instance works) | Freely |

**The litmus test:**
1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

See [D0001: Three-Tier Conceptual Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md).

---

## Epochs

Epochs mark shifts in the evaluation landscape. Contract versions and epochs are related but distinct:

| Epoch | Contract Version | Description |
|-------|------------------|-------------|
| E0001-single-prd-era | 1.x | Single PRD world (`/docs/PRD.md`) |
| E0002-multi-lane-era | 2.x | Multi-lane world (`/docs/PRD/<lane>/PRD.md`) |

**Rule:** Do not compare outcomes across epochs without explicit adjustment.

See `/docs/appendices/epochs.md` for epoch semantics.

---

## Contract 2.0.0 — Breaking Changes

This version introduces structural changes that are not backwards-compatible:

### Removed
- Single active PRD rule (`/docs/PRD.md` as sole PRD location)

### Added
- **Lane declaration required** for all attempts
- **Epoch declaration required** in META.json
- PRDs stored under `/docs/PRD/<lane>/PRD.md`
- Attempts stored under `/products/<lane>/attempts/prd-vX.Y/attempt-NNN/` (lane-contained)
- Tooling requires `--lane` flag for register, finalize, promote

Note: Root `/attempts/**` is legacy (read-only). All new attempts are lane-contained.

### Changed
- Mental model: products decoupled, canon shared
- Comparison validity: same lane + same PRD + same epoch required

---

## Compatibility

### Forward Compatibility
Documents written for contract 2.x will not work correctly in a 1.x environment.

### Backward Compatibility
Epoch 1 artifacts (pre-lanes) remain valid historical records. They are not "wrong" — they are from a different evaluation context.

Epoch 1 documents should be marked with an epoch header if they remain in the repo for historical reference.

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 2.1.0 | 2026-01-21 | Three-tier hierarchy (ODD/Canon/Docs), ODD at root level |
| 2.0.0 | 2026-01-17 | Multi-lane architecture, epoch requirements |
| 1.x | Pre-2026-01-17 | Single PRD era (implicit, never formally versioned) |

---

## Related Documents

- Decision log: `/docs/decisions/D0011-odd-contract-2.0.0.md`
- Epochs: `/docs/appendices/epochs.md`
- Product Lanes: `/docs/appendices/product-lanes.md`
- Alignment Reviews: `/odd/appendices/alignment-reviews.md`



--------------------------------------------------------------------------------
📄 File: odd/decisions/D0001-three-tier-conceptual-hierarchy.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/decisions/D0001
title: "Three-Tier Conceptual Hierarchy"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "architecture", "conceptual-model", "philosophy"]
---

# Three-Tier Conceptual Hierarchy

> ODD separates universal principles from program constraints from implementation details.

## Description

ODD is organized as a three-tier conceptual hierarchy where each layer absorbs different pressure and has different decay rates. ODD contains universal principles (timeless, product-agnostic), Canon contains program-level constraints (shared rules across products), and Docs contains implementation details (how this instance works). This separation allows ODD to outgrow any single repository without losing coherence.

## Outline

- Decision
- Status
- The Three Tiers
- The Litmus Test
- Why This Matters
- Consequences
- Evidence

---

## Content

## Decision

ODD is a three-tier conceptual hierarchy, not a single monolithic philosophy:

| Tier | Contains | Answers | Decay Rate |
|------|----------|---------|------------|
| **ODD** | Universal principles | "What is always true about building well?" | Almost never |
| **Canon** | Program-level constraints | "What rules do we share across products?" | Carefully |
| **Docs** | Implementation details | "How does this instance work?" | Freely |

## Status

**Active**

## The Three Tiers

### Tier 1: ODD (Universal Principles)

ODD is the root. It is:

- Not a framework
- Not a product philosophy
- Not owned by any single implementation

ODD contains:

- Progressive distillation
- Failure-driven modularity
- Visual proof > narrative confidence
- Evidence over assertion
- Elevation before optimization

**The test:** Would this still be true if klappy.dev didn't exist? If Cloudflare vanished? If LLMs were replaced?

If yes → it's ODD.

### Tier 2: Canon (Program-Level Constraints)

Canon is shared contract, not universal truth.

Canon answers: *"If you are building within this program, these are the rules we agree to."*

Canon contains:

- decision-rules
- definition-of-done
- self-audit
- misuse-patterns
- completion-report-template
- constraints (scoped to this program)

**The test:** Should all products in this program obey it?

If yes → it's Canon.

Crucially:
- Canon can change without invalidating ODD
- Two programs could share ODD but diverge in Canon

### Tier 3: Docs (Implementation Details)

Docs are the reference implementation.

Docs contain:

- Infrastructure decisions
- CLI paths
- Cloudflare specifics
- Repo structure
- Tooling affordances
- Branch naming conventions

**The test:** Is this about how *we* do it *here*?

If yes → it's Docs.

## The Litmus Test

For any file, ask:

1. **Would this still be true in 10 years?**
   - Yes → ODD
   - No → keep going

2. **Should all products in this program obey it?**
   - Yes → Canon
   - No → keep going

3. **Is this about how we do it here?**
   - Yes → Docs

If something fails all three, it probably doesn't belong at all.

## Why This Matters

This separation:

- Allows publishing ODD as a standalone essay/site
- Lets other teams adopt ODD without adopting your Canon
- Supports running multiple Canons under the same ODD
- Explains why "ODD isn't a framework"

Frameworks conflate all three layers. ODD separates them.

Different decay rates give real systems what they need:

- ODD should almost never change
- Canon is allowed to evolve carefully
- Docs are allowed to rot and be rebuilt

## Consequences

### Enables

- ODD can outgrow any single repository
- Teams can fork Canon while keeping ODD
- Implementation can be completely replaced without touching philosophy
- Clear criteria for file placement

### Prevents

- Conflating philosophy with plumbing
- Breaking universal principles when fixing implementation bugs
- Vendor lock-in at the conceptual level

### Costs

- Requires discipline to classify correctly
- Three places to look instead of one
- Harder to explain to newcomers (until they get it)

## Evidence

- D0015 (this decision) - formalizing the separation
- Canon progressive distillation effort - moved implementation decisions to docs/
- `/docs/appendices/` - now contains implementation-specific appendices
- `/docs/decisions/` - now contains implementation-specific decisions
- `/odd/appendices/` - retains only portable philosophy



--------------------------------------------------------------------------------
📄 File: odd/decisions/README.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/decisions
title: "ODD Conceptual Decisions"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "decisions", "conceptual", "philosophy"]
---

# ODD Conceptual Decisions

> Decisions about ODD's mental model and conceptual architecture.

This folder contains decisions about ODD itself — the philosophy, not any specific implementation.

---

## Conceptual Decisions (This Folder)

| ID | Decision | Summary |
|----|----------|---------|
| [D0001](./D0001-three-tier-conceptual-hierarchy.md) | Three-Tier Conceptual Hierarchy | ODD separates universal principles → program constraints → implementation details |

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



--------------------------------------------------------------------------------
📄 File: odd/index.md
--------------------------------------------------------------------------------

---
uri: klappy://odd
title: "Outcomes-Driven Development"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "index"]
---

# 🎯 Outcomes-Driven Development (ODD)

The philosophical and operational foundation for this repository. ODD treats outcomes as primary, artifacts as ephemeral, and verification as mandatory.

---

## 📁 Contents

| File | Title | Summary |
|------|-------|---------|
| `manifesto.md` | ODD Manifesto | The core philosophy: defining outcomes, enforcing constraints, verifying reality. AI accelerates execution; governance preserves trust. |
| `maturity.md` | Project Maturity | How rigor changes as projects mature. PoC → Pilot → Production. |
| `contract.md` | ODD System Contract | Version contract for ODD compatibility. Currently v2.0.0 (multi-lane era). |
| `misuse-patterns.md` | Misuse Patterns | Common failure modes and how ODD gets misapplied in practice. |
| `prompt-architecture.md` | Prompt Architecture | How intent scales without giant prompts. |
| `orientation-map.md` | Orientation Map | One-page mental model of ODD, Canon, Evidence, and Outcomes. |
| `cognitive-partitioning.md` | Cognitive Partitioning | Why reasoning systems must divide under pressure as they scale. |

### Subfolders

| Folder | Purpose |
|--------|---------|
| `appendices/` | Extended concepts (23 files). See [appendices/README.md](./appendices/README.md) |
| `decisions/` | Architecture Decision Records. See [decisions/README.md](./decisions/README.md) |

---

## 🚀 Start Here

1. **`manifesto.md`** — Understand the philosophy
2. **`maturity.md`** — Know when rigor increases
3. **`appendices/attempt-lifecycle.md`** — See how work flows

---

## 💡 Core Thesis

The primary job of development is not writing code. It is:
- Defining outcomes
- Enforcing constraints
- Verifying reality

AI accelerates execution. Governance preserves trust.



--------------------------------------------------------------------------------
📄 File: odd/manifesto.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/manifesto
title: "ODD Manifesto — Extended"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "philosophy"]
---

# ODD Manifesto v1.1 (Extended)

> A governance framework for human-AI collaboration that optimizes learning, not execution.

## Description

Outcomes-Driven Development (ODD) operationalizes governance for human-AI collaboration. The core thesis: development is about defining outcomes, enforcing constraints, and verifying reality—not writing code. AI accelerates execution; governance preserves trust. The pillars include Prompt Over Code, KISS, DRY with Isolation, Consistency, Maintainability, Antifragile design, and Scalability. ODD treats restartability as a feature, applies progressive governance based on maturity (PoC → Pilot → Production), requires evidence over assertion, treats AI as accelerator not authority, demands falsifiable outcomes, prefers reversibility, and requires stop conditions. Memory is the bottleneck, not computation.

## Outline

- Purpose and Core Thesis
- Pillars (Operational Interpretation)
- Restartability Over Salvage
- Progressive Governance (Maturity-Aware)
- Evidence as the Gate
- Trust, Authority, and AI
- Outcomes Must Be Falsifiable
- Reversibility and Cost Awareness
- Stop Conditions
- Memory Is the Bottleneck
- Confidence, Risks, and Known Failure Modes

---

## Content

> ODD v1.1 — Extended (Internal / Agent-Governance) → for canon, MCP, agents (this file)

---

## 📌 Purpose

This document operationalizes Outcomes-Driven Development as a governance framework for human–AI collaboration.

It is designed to:
• guide autonomous agents
• enforce verification and evidence
• scale judgment without repeating it
• adapt rigor as projects mature

This version is not optimized for persuasion.
It is optimized for execution and enforcement.

---

## 🎯 Core Thesis

The primary job of development is not writing code.
It is defining outcomes, enforcing constraints, and verifying reality.

AI accelerates execution.
Governance preserves trust.

---

## 📌 Pillars (Operational Interpretation)

### Prompt Over Code
• Intent is expressed declaratively.
• Code is treated as ephemeral.
• Regeneration is cheaper than preservation.

### KISS

• Complexity is a liability.
• Escalation requires evidence of failure.

### DRY (With Isolation)

• Duplication is tolerated across bounded contexts.
• Shared abstractions require proven reuse.

### Consistency

• Behavioral predictability matters more than visual uniformity.
• Consistency is scoped, not global.

### Maintainability

• Systems must survive creator turnover.
• Documentation and explicit tradeoffs are part of the product.

### Antifragile

• Failure is assumed.
• Recovery paths are preferred over prevention.
• Learning velocity is a design constraint.

### Scalable

• Growth must be bounded in:
• cost
• complexity
• human attention
• Scalability includes cognitive and operational load.

---

## 🔄 Restartability Over Salvage

ODD assumes that restarting from refined intent is often more effective than steering a system that has already drifted.

As systems grow, prompts accrete, assumptions harden, and local fixes compound. At a certain point, continued steering optimizes for preserving effort rather than improving outcomes.

Restarting is not failure.
Restarting is a recognition that:
• intent has become clearer
• constraints are better understood
• evidence from prior attempts now exists

In an AI-accelerated environment, restarting is cheap.
Misalignment is expensive.

ODD therefore treats restartability as a design feature:
• prompts are disposable
• implementations are ephemeral
• canon and intent persist

The goal is not to preserve artifacts, but to preserve learning.

A clean restart with better constraints is progress.

---

## 📊 Progressive Governance (Maturity-Aware ODD)

ODD enforcement depends on project maturity.

Level 0 — PoC / Exploration
• Goal: learn quickly
• Artifacts are non-authoritative
• Verification demonstrates possibility
• Over-governance is prohibited

Level 1 — Pilot / Product
• Goal: deliver value safely
• Evidence and visual proof required
• Tradeoffs must be explicit
• Silent failure is unacceptable

Level 2 — Production / Long-Term
• Goal: sustain trust
• Outcomes must be measurable
• Observability, reversibility, and security are mandatory
• Autonomous actions require stop conditions and human gates

Maturity must be stated explicitly.

---

## 📎 Evidence as the Gate

Completion requires:
• observed behavior
• produced evidence
• self-audit against constraints
• explicit declaration of confidence and gaps

Assertions do not count as completion.

---

## 🤖 Trust, Authority, and AI

AI is an accelerator, not an authority.
• AI may propose and generate
• AI may self-audit and verify
• AI may not silently assume trust

Authority boundaries and escalation points must be explicit.

---

## 🔬 Outcomes Must Be Falsifiable

Outcomes are only valid if they can be:
• observed
• tested
• disproven

Non-falsifiable outcomes are treated as goals, not success criteria.

---

## ⚠️ Reversibility and Cost Awareness

Prefer decisions that are:
• cheap to undo
• bounded in cost
• limited in blast radius

Irreversible decisions require human approval.

---

## 🛑 Stop Conditions

Every autonomous loop must define:
• success criteria
• failure criteria
• exit conditions

Endless optimization is a failure mode.

---

## 🧠 Memory Is the Bottleneck

AI didn't just make coding faster. It changed what's scarce.

In ODD, generated artifacts are abundant, but **durable intent** is not.
So the work shifts toward:

- preserving what was learned,
- verifying reality,
- discarding what cannot be trusted,
- and elevating only what repeatedly reduces future drag.

ODD stays legible by using **Progressive Elevation & Decay**:
most artifacts die at the Attempt/PRD layer; only proven patterns elevate into Contracts, Canon, and Decision Trace.

See:
- `/odd/appendices/progressive-elevation.md`
- `/docs/appendices/product-lanes.md`
- `/docs/appendices/epochs.md`

---

## 🔗 Relationship to Canon

• ODD → why
• Constraints → assumptions
• Decision Rules → how
• Maturity Model → when
• Evidence Policies → proof

Together, these form a complete governance layer.

---

## 💡 Closing (Internal)

ODD is not a philosophy of optimism.

It is a discipline of restraint, verification, and curation—
designed for a world where generation is infinite, but trust is not.

---

## ✅ Status

- ODD v1.1 finalized
- Public and internal views aligned
- Ready for MCP exposure and agent enforcement

---

## ⚠️ Confidence, Risks, and Known Failure Modes

(ODD v1.1 — Internal Self-Assessment)

This section captures a snapshot assessment of how well Outcomes-Driven Development (ODD), as currently defined, aligns with its stated principles and where it is most vulnerable.

This is not a guarantee of correctness.
It is an explicit acknowledgment of uncertainty.

---

### Confidence Model

Confidence scores express current belief that ODD will behave as intended when applied thoughtfully.

Scale: 0.0–1.0
• 0.9+ — robust under most conditions
• 0.7–0.85 — strong, but watch for drift
• 0.5–0.7 — plausible, fragile under misuse
• <0.5 — likely misaligned without correction

Scores are expected to change as ODD is applied in practice.

---

### Principle-Level Confidence Snapshot

**Prompt Over Code / Convention Over Configuration**
Confidence: 0.80

Why this is strong
• ODD treats intent, constraints, and outcomes as first-class artifacts.
• Canonical resources replace brittle, repeated prompts with stable conventions.

Primary risks
• Conventions silently becoming configuration sprawl.
• Clients inventing ad hoc mappings instead of using shared conventions.

Failure mode
• “Prompt over code” degenerates into “prompt + hidden config everywhere.”

---

**KISS (Keep It Simple, Stupid)**
Confidence: 0.75

Why this is strong
• ODD avoids embedding workflows or agent loops.
• Complexity is deferred intentionally.

Primary risks
• Meta-layers (manifests, indices, maturity flags) accumulating unchecked.
• Over-abstracting governance before it proves necessary.

Failure mode
• Governance becomes heavier than the systems it governs.

---

**DRY (With Isolation)**
Confidence: 0.70

Why this is strong
• Canon centralizes worldview and defaults.
• Single-inventory patterns reduce duplication.

Primary risks
• Multiple parallel indices drifting out of sync.
• Reuse pressure creating brittle shared abstractions too early.

Failure mode
• “One source of truth” becomes “many partial truths.”

---

**Consistency**
Confidence: 0.65

Why this is weaker
• Consistency depends on discipline, not tooling.
• Naming, casing, and URI patterns are easy to drift over time.

Primary risks
• Small inconsistencies compounding across resources and clients.
• Human tolerance masking slow degradation.

Failure mode
• The system remains logically sound but ergonomically frustrating.

---

**Maintainability**
Confidence: 0.70

Why this is strong
• Separation of stable principles from evolving operations.
• Explicit maturity model prevents premature hardening.

Primary risks
• Manual maintenance of inventories becoming burdensome.
• Version semantics implied but not enforced.

Failure mode
• Canon becomes respected but stale.

---

**Antifragile**
Confidence: 0.60

Why this is intentionally cautious
• Antifragility depends on real-world stress, not theory.
• Recovery paths are assumed, not yet proven.

Primary risks
• MCP or tooling layers becoming hidden single points of failure.
• Ephemerality mistaken for disposability of meaning.

Failure mode
• System recovers technically but loses trust socially.

---

**Scalable**
Confidence: 0.70

Why this is strong
• ODD scales conceptually: more resources do not require new rules.
• Governance grows linearly, not exponentially.

Primary risks
• Human cognitive load becoming the true bottleneck.
• Discovery/search degrading without deliberate tooling later.

Failure mode
• System scales in size but not in usability.

---

### Cross-Cutting Risks

**Premature Formalization**

ODD is vulnerable to being “locked in” too early, reducing exploration.

**False Authority**

Well-written governance can be mistaken for correctness without evidence.

**Silent Drift**

Small deviations, left unnamed, can erode trust over time.

---

### Intended Use of This Section

This section exists to:
• prevent ideological hardening
• make risks discussable
• encourage re-evaluation
• model intellectual humility

It is expected to change.

---

### Re-evaluation Philosophy

ODD should be reassessed when:
• it is applied to real production systems
• autonomous agents operate for extended periods
• failure modes surface that are not addressed here

Confidence should be updated based on evidence, not optimism.

---

Closing (Internal)

ODD is not complete.

It is a living attempt to govern creativity, autonomy, and trust in a world where generation is cheap and certainty is not.

Its strength is not that it claims to be right—
but that it makes being wrong visible early.

For common failure modes and practical misapplications of ODD, see _Misuse Patterns_ and _Prompt Architecture_ in the ODD appendices.

---

Status
• ODD v1.1 Extended updated
• Confidence scoring and failure modes explicitly documented
• Fully aligned with Canon Index confidence model

---



--------------------------------------------------------------------------------
📄 File: odd/maturity.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/maturity
title: "Project Maturity & Progressive Governance"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: semi_stable
tags: ["maturity", "governance"]
---

# Project Maturity & Progressive Governance

> When to apply rigor, not just what rigor exists.

## Description

Project maturity defines how constraints and policies change as a project matures. Three levels exist: Level 0 (PoC/Exploration) focuses on learning quickly with non-authoritative artifacts; Level 1 (Pilot/Product) delivers value safely with evidence, visual proof, and explicit tradeoffs; Level 2 (Production/Long-Term) sustains trust with measurable outcomes, observability, security, and explicit stop conditions. Rigor increases with maturity. Projects should move up when others depend on them, artifacts persist, decisions become costly to reverse, or trust is implicitly assumed.

## Outline

- Core Principle: Rigor increases with maturity
- Level 0 — PoC / Exploration
- Level 1 — Pilot / Product
- Level 2 — Production / Long-Term
- Relationship to Other Canon Documents
- Agent Expectations
- Escalation Rules

---

## Content

**Canon v0.1**

> This governance axis tells agents *when* to apply rigor, not just what rigor exists.

This page defines how my principles, constraints, and policies change as a project matures.

Not every project needs the same level of rigor on day one.
Applying production-level governance to exploratory work kills learning.
Failing to apply it later destroys trust.

This model exists to activate the right constraints at the right time.

---

## 📌 Core Principle

I do not apply all rules equally at all times.

Rigor increases with maturity.
Exploration comes first. Governance comes later.

Every project must explicitly state its current maturity level.

---

## 📋 Maturity Levels Overview

I use three maturity levels:

1. PoC / Exploration
2. Pilot / Product
3. Production / Long-Term

These levels are not about importance.
They are about risk, trust, and dependency.

---

## 🔬 Level 0 — PoC / Exploration

**Goal:** Learn quickly and discard freely.

**Characteristics**
• Short-lived or experimental
• Ephemeral artifacts
• Low dependency from others
• High uncertainty tolerated

What applies
• Prompt over code
• KISS (loosely)
• DRY (lightly)
• Consistency (local only)
• Evidence of possibility (not correctness)

What does not apply yet
• Formal observability
• Cost optimization
• Trust or authority boundaries
• Production security guarantees
• Long-term reversibility planning

Required labeling

“This is a PoC. Outputs are exploratory and non-authoritative.”

Critical rule

Nothing at this level is considered final or trusted.

---

## 🚀 Level 1 — Pilot / Product

**Goal:** Deliver real value safely to real users.

**Characteristics**
• Repeated use
• Growing user expectations
• Shared ownership begins
• Partial persistence

What turns on
• Definition of Done & Evidence Policy
• Visual proof for UI behavior
• Explicit tradeoffs
• Basic observability
• Reversibility for major decisions
• Defined human approval points

New obligation

If users depend on it, it must be verifiable.

Risk posture

Failure is acceptable, but silent failure is not.

---

## ✅ Level 2 — Production / Long-Term

**Goal:** Sustain trust over time.

**Characteristics**
• Canonical or authoritative data
• External dependencies
• Organizational or reputational risk
• Long timelines

What becomes mandatory
• Measurable outcomes with metrics
• Continuous feedback loops
• Full observability
• Trust & authority boundaries
• Cost predictability
• Security and privacy defaults
• Explicit stop conditions for autonomy

Critical rule

Nothing enters production without:
• a named owner
• an undo path
• an audit trail

At this level, correctness and trust outweigh speed.

---

## 🔗 Relationship to Other Canon Documents

This maturity model modulates the following:
• Constraints
Some constraints are optional at PoC and mandatory later.
• Decision Rules
Rules like KISS and Borrow→Build apply at all levels, but escalation thresholds change.
• Definition of Done
Evidence requirements increase with maturity.
• Self-Audit Checklist
More items become non-optional as maturity increases.
• Visual Proof Standards
Optional for PoCs, required for Pilot and Production.

---

## 🤖 Agent Expectations

Agents and collaborators are expected to:
• explicitly state the project’s maturity level
• apply only the rules required for that level
• refuse to over-govern PoCs
• refuse to under-govern Production systems

If maturity is unclear, the correct action is to ask.

---

## ⚠️ Escalation Rules

A project should move up a maturity level when:
• others begin depending on it
• artifacts persist beyond initial intent
• decisions become costly to reverse
• trust is implicitly assumed

A project may move down only with explicit acknowledgment.

---

## 💡 Closing Note

This model exists to protect both:
• exploration, and
• trust.

Rigor too early kills creativity.
Rigor too late kills credibility.

Progressive governance keeps both alive.

---

Status
• Canon v0.1 — Project Maturity complete
• Canon now supports lifecycle-aware enforcement

---

What This Unlocks (Important)

With this file added, agents can now:
• ask for or infer maturity
• activate the correct checks automatically
• avoid overbuilding PoCs
• avoid underbuilding production systems

This completes the missing dimension you identified.

---

Suggested Next Moves (Choose One) 1. Update ODD Manifesto → ODD + Maturity 2. Agent Handoff Instruction (now maturity-aware) 3. MCP schema that exposes maturity as a first-class field 4. Refactor existing canon docs to reference maturity thresholds

Say which you want next, and we’ll continue cleanly.



--------------------------------------------------------------------------------
📄 File: odd/misuse-patterns.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/misuse-patterns
title: "ODD Misuse Patterns"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "misuse", "failure-modes"]
---

# ODD Misuse Patterns

> Predictable failure modes when ODD is applied incorrectly.

## Description

This appendix documents predictable ways ODD fails: Outcome Theater (saying outcomes but measuring artifacts), Prompt Maximalism (one huge prompt replacing thinking), Premature Governance (locking down before patterns stabilize), Evidence Substitution (assertions replacing demonstrations), Consistency Absolutism (treating early conventions as immutable), and Antifragility as Optimism (assuming recovery without testing it). These are human failure modes under real constraints, not violations of intent. The purpose is early recognition through shared language, not prevention through rules.

## Outline

- Outcome Theater
- Prompt Maximalism
- Premature Governance
- Evidence Substitution
- Consistency Absolutism
- Antifragility as Optimism
- Maturity Note
- How to Use This Appendix

---

## Content

**(Appendix to ODD Manifesto — Internal)**

This section documents predictable ways Outcomes-Driven Development (ODD) fails when applied incorrectly.
These are not violations of intent; they are human failure modes under real constraints.

The purpose is not prevention through rules, but early recognition through shared language.

---

## Misuse Pattern 1: Outcome Theater

> "We say outcomes, but still worship artifacts."

What it looks like
• Outcomes are stated, but success is still measured by:
• shipped code
• completed tickets
• deployed features
• Evidence is implied, not demonstrated.

Why it happens
• Artifact-based metrics feel concrete.
• Outcomes feel abstract until proven.

Where it shows up
• Early PoCs that never re-anchor to real user value.
• Pilots that quietly revert to velocity metrics.

Risk
• ODD becomes rebranded output-driven development.

---

## Misuse Pattern 2: Prompt Maximalism

> "If one prompt is good, ten must be better."

What it looks like
• Large, ornate prompts replace thinking.
• Slight prompt changes cause wildly different outcomes.
• Prompts are curated like fragile artifacts.

Why it happens
• Early AI success feels magical.
• Teams mistake correlation for control.

Where it shows up
• PoCs experimenting rapidly.
• Teams hopping between tools without stabilizing conventions.

Risk
• Prompt over code collapses into prompt over judgment.

---

## Misuse Pattern 3: Premature Governance

> "Let's lock this down before it breaks."

What it looks like
• Rules introduced before patterns stabilize.
• Heavy definitions of “done” applied too early.
• Checklists used as gates instead of lenses.

Why it happens
• Fear of chaos.
• Desire for predictability before understanding.

Where it shows up
• Pilots transitioning too quickly to “production thinking.”
• Teams scaling before learning.

Risk
• Innovation slows before it has a chance to inform governance.

---

## Misuse Pattern 4: Evidence Substitution

> "Trust me, it works."

What it looks like
• Assertions replace demonstrations.
• Logs, explanations, or screenshots stand in for proof.
• Visual verification is deferred indefinitely.

Why it happens
• Evidence takes effort.
• Verifying your own work is uncomfortable.

Where it shows up
• Autonomous agent workflows.
• Systems that “should” work but haven’t been observed.

Risk
• Trust becomes social instead of empirical.

---

## Misuse Pattern 5: Consistency Absolutism

> "One way forever."

What it looks like
• Early conventions treated as immutable.
• Divergence framed as error instead of signal.
• Local context ignored for global uniformity.

Why it happens
• Consistency reduces cognitive load.
• Change feels like regression.

Where it shows up
• Mature systems resisting evolution.
• Teams optimizing for internal harmony over external reality.

Risk
• The system becomes brittle under real-world variation.

---

## Misuse Pattern 6: Antifragility as Optimism

> "It'll recover."

What it looks like
• Failure assumed to be harmless.
• Recovery paths untested.
• Learning deferred until “later.”

Why it happens
• Antifragility sounds resilient.
• Testing failure is inconvenient.

Where it shows up
• Distributed systems.
• Autonomous or semi-autonomous agents.

Risk
• Systems degrade silently until trust collapses.

---

A note on maturity (intentionally light)

These patterns tend to:
• appear early as curiosity and speed
• persist silently through pilots
• cause real damage in production if unexamined

The solution is not stricter rules, but timely awareness.

---

How this appendix should be used
• As a diagnostic lens
• As shared language for course correction
• As a reminder that misuse is normal — and fixable

This list is expected to grow as real failures are observed.

---



--------------------------------------------------------------------------------
📄 File: odd/orientation-map.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/orientation-map
title: "ODD + Canon + Evidence — Orientation Map"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "orientation", "mental-model"]
---

# ODD + Canon + Evidence — Orientation Map

> A one-page mental model for the ODD system.

## Description

This orientation map provides a single-page mental model of how Intent flows through ODD Manifesto to Canon to Decisions to Evidence to Outcomes. ODD is organized as a three-tier conceptual hierarchy: ODD contains universal principles (timeless), Canon contains program-level constraints (shared rules), and Docs contains implementation details (how this instance works). Maturity moves from Exploration through Validation to Commitment. The map explicitly rejects "if it compiles, it's done" and "governance replaces judgment."

## Outline

- The Core Idea (Intent → ODD → Canon → Decisions → Evidence → Outcomes)
- How to Read This Map
- The Three-Tier Hierarchy (ODD → Canon → Docs)
- Where Maturity Lives
- What This Map Explicitly Rejects
- Why This Map Exists

---

## Content

> This is not a workflow. It is a mental model.

---

## 🎯 The Core Idea

```
        Intent
          |
          v
      ODD Manifesto
          |
          v
        Canon

(Constraints & Rules)
|
v
Decisions
|
v
Evidence
        |
        v
      Outcomes
```

---

## 📖 How to Read This Map
• ODD explains why and what we care about
• Canon explains how decisions tend to be shaped
• Decisions are local, contextual, and human
• Evidence grounds claims in reality
• Outcomes are the only thing that matters long-term

Nothing here enforces anything.
Everything here informs something.

**Canon may reference Docs. Docs must never redefine Canon.**

---

## 🏗️ The Three-Tier Hierarchy

ODD is a conceptual hierarchy, not a monolithic philosophy:

| Tier | Contains | Decay Rate |
|------|----------|------------|
| **ODD** | Universal principles (timeless, product-agnostic) | Almost never |
| **Canon** | Program-level constraints (shared rules across products) | Carefully |
| **Docs** | Implementation details (how this instance works) | Freely |

**The litmus test:**

1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

This separation allows ODD to outgrow any single repository.

See [D0001: Three-Tier Conceptual Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md).

---

## 📊 Where Maturity Lives (Not Gates)

```
Exploration ──────→ Validation ──────→ Commitment
   (PoC)            (Pilot)         (Production)
```

Rigor increases →
Evidence expectations increase →
Governance tightens →

    •	Early: bias toward learning
    •	Middle: bias toward validation
    •	Later: bias toward trust and durability

No sharp lines. No ceremony required.

---

## 🚫 What This Map Explicitly Rejects
• “If it compiles, it’s done.”
• “Trust the explanation.”
• “One true workflow.”
• “Governance replaces judgment.”

---

## 💡 Why This Map Exists
• To explain the system in under 60 seconds
• To anchor conversations without debate
• To keep humans oriented while tools change

---

## ✅ Why These Two Artifacts Are Enough for Now
• They surface risk without prescribing control
• They encode wisdom without freezing behavior
• They respect maturity without formalizing it

This keeps you aligned with:
• KISS
• Antifragility
• Prompt over code
• Convention over configuration

And most importantly:

They make misuse discussable instead of shameful.

---

## See Also

- [Cognitive Partitioning](/odd/cognitive-partitioning.md) — Why reasoning systems must divide under pressure
- [ODD Misuse Patterns](/odd/misuse-patterns.md) — Common failure modes and how ODD gets misapplied



--------------------------------------------------------------------------------
📄 File: odd/prompt-architecture.md
--------------------------------------------------------------------------------

---
uri: klappy://odd/prompt-architecture
title: "Prompt Architecture"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "prompt-architecture", "orchestration"]
---

# Prompt Architecture (Orientation)

> How intent scales without collapsing into a monolithic prompt.

## Description

Prompt architecture addresses the God Prompt anti-pattern: as scope grows, prompts become monolithic, unmaintainable, sensitive to small edits, context-bloated, and inconsistent. The alternative is Orchestrated Intent: keep stable intent in canonical artifacts, construct task prompts dynamically, use smaller focused agents for bounded tasks, pass results through shared constraints and evidence standards. Intent is layered: Worldview (rarely changes), Project Intent (changes occasionally), Task Intent (changes constantly). Only the bottom layer should enter the working prompt in full detail. Context budgeting treats every token like a limited resource.

## Outline

- The Anti-Pattern: Prompt Maximalism (God Prompt)
- The Alternative: Orchestrated Intent
- Intent Graph (Mental Model)
- Context Budgeting
- Maturity Note
- Failure Mode of Orchestration

---

## Content

**Canon / ODD Appendix v0.1**

This appendix names a common scaling failure mode: the God Prompt.

As an app’s scope grows, prompts tend to grow into a single monolith that becomes:
• unmaintainable
• difficult to reason about
• sensitive to small edits
• context-bloated
• increasingly inconsistent

This is rarely intentional. It is a natural default.

---

## ⚠️ The Anti-Pattern: Prompt Maximalism ("God Prompt")

What it looks like
• One prompt tries to cover:
• product requirements
• system constraints
• UI conventions
• coding standards
• edge cases
• release steps
• testing expectations
• The prompt becomes the “real system,” and code becomes an artifact of that prompt.

Why it fails
• Cognitive load explodes
• Context bloat crowds out task-relevant details
• Small edits have unpredictable consequences
• The prompt becomes a fragile dependency

---

## ✅ The Alternative: Orchestrated Intent

Instead of one prompt that does everything:
• keep stable intent in canonical artifacts (ODD + Canon)
• construct task prompts dynamically
• use smaller focused agents for bounded tasks
• pass results through shared constraints and evidence standards

In this model:
• the Canon is the constitution
• the task prompt is a temporary work order
• the output is verified by evidence, not confidence

---

## 🧭 Intent Graph (Mental Model)

Think of intent as layered:

1. **Worldview** (rarely changes) — ODD, constraints, decision rules
2. **Project intent** (changes occasionally) — PRD, scope, priorities, maturity level
3. **Task intent** (changes constantly) — the specific job to be done right now

Only the bottom layer should enter the working prompt in full detail.

---

## 💰 Context Budgeting (A Simple Heuristic)

Treat context like a budget:
• Every token spent on generic policy reduces tokens available for task specifics.
• The goal is not “more context,” but “relevant context.”

A healthy system prefers:
• small, precise context
• stable references by URI
• on-demand retrieval

---

## 📊 Maturity Note (Intentionally Light)

- **PoC:** A larger prompt may be acceptable for speed, as long as it is treated as disposable.
• Pilot: Prompt growth becomes a risk. Begin splitting tasks and referencing canonical resources.
• Production: Monolithic prompts become a liability. Orchestrated intent and bounded sub-tasks become the default.

This is not a rule. It is a scaling reality.

---

## ⚠️ Failure Mode of Orchestration (So We Don't Romanticize It)

Orchestration can fail too.

Common orchestration failure modes:
• semantic drift across sub-agents
• inconsistent assumptions
• extra coordination overhead
• loss of a single coherent narrative

The mitigation is not “more instructions,” but:
• shared canonical references
• explicit evidence requirements
• clear boundaries between tasks

---

## 💡 Closing

When prompts grow without bound, the system becomes fragile.

ODD favors:
• stable intent captured in canonical artifacts
• small prompts constructed for the task at hand
• verification through evidence rather than explanation

---

## ✅ Status

- Appendix v0.1 complete
- Orientation-only
- No enforcement semantics

---

## 🔗 Why This Fits Your Pillars
• KISS: It discourages giant prompts; encourages small bounded contexts.
• DRY: Canonical references prevent repeating the same boilerplate in every prompt.
• Consistency: Canon provides a stable “source of truth” across sub-agents.
• Maintainability: Prompts become smaller, modular, and replaceable.
• Antifragile: Smaller tasks fail faster and recover easier.
• Scalable: Orchestration scales better than monoliths.
• Prompt-over-code: This is the application of that principle at scale.

---



================================================================================
## Projects
================================================================================



--------------------------------------------------------------------------------
📄 File: projects/ADDING-A-PROJECT.md
--------------------------------------------------------------------------------

---
uri: klappy://projects/adding-a-project
title: "Adding a Project"
audience: public
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["projects", "contributing", "guide"]
---

# How to Add a Project

This repository treats projects as **evidence**, not outputs.

Projects are added only when an idea has reached a point where it is useful to share—either because it demonstrates a constraint, validates a tradeoff, or falsifies an assumption.

This document explains _when_ to add a project and provides a lightweight template to keep projects consistent without ceremony.

---

## When to Add a Project

A project is ready to be added when:

- the intent can be stated clearly in a few sentences
- the constraints shaping the work are understood
- at least one meaningful outcome can be demonstrated
- the project teaches something that isn’t already obvious from the Canon alone

Projects do **not** need to be complete, polished, or production-ready.
They do need to be honest.

---

## What a Project Is (and Is Not)

A project **is**:

- a proof of concept
- an experiment with clear boundaries
- a reference implementation

A project **is not**:

- a roadmap
- a client deliverable
- a long-term supported product

---

## Project Structure

Each project lives in its own folder under `/projects/` and must include a `README.md`.

Optional supporting files (code, diagrams, screenshots) may be included as needed.

Example:

```text
/projects/example-project/
  README.md
  src/
  screenshots/
```

---

## Project README Template

Use the following template for each project’s `README.md`.
Sections may be omitted if they are not relevant, but the order should be preserved.

```md
# Project Name

## Intent

What this project is trying to prove, explore, or demonstrate.

## Context

Why this project exists and what prompted it.

## Constraints

Key constraints that shaped the design (technical, environmental, human, etc.).

## Approach

High-level description of how the problem was approached.
Avoid step-by-step instructions.

## Tradeoffs

Important decisions made and what was intentionally _not_ optimized.

## Evidence

What can be shown to demonstrate outcomes:

- screenshots
- recordings
- working demos
- observable behavior

## What This Proves

What can reasonably be concluded from this project.

## What This Does Not Prove

Explicit limits of what should _not_ be inferred.

## Status

Exploratory | Validated | Abandoned | Superseded
```

---

## Evidence Expectations

Evidence should be:

- observable
- reproducible in principle
- proportional to the project’s maturity

Explanations alone are insufficient.

---

## Naming & Scope Guidance

- Prefer descriptive names over clever ones
- Keep projects small and focused
- One core idea per project

If a project grows beyond its original intent, consider splitting it.

---

## Updating or Retiring Projects

Projects may be:

- updated as understanding improves
- explicitly marked as abandoned
- superseded by newer work

Retired projects are still valuable as evidence of learning.

---

## Final Note

Projects exist to ground ideas in reality.

If a project doesn’t change how you think, it probably doesn’t belong here.



--------------------------------------------------------------------------------
📄 File: projects/_template/README.md
--------------------------------------------------------------------------------

# 📁 Project Name

## Intent

What this project is trying to prove, explore, or demonstrate.

## Context

Why this project exists and what prompted it.

## Constraints

Key constraints that shaped the design (technical, environmental, human, etc.).

## Approach

High-level description of how the problem was approached.
Avoid step-by-step instructions.

## Tradeoffs

Important decisions made and what was intentionally _not_ optimized.

## Evidence

What can be shown to demonstrate outcomes:

- screenshots
- recordings
- working demos
- observable behavior

## What This Proves

What can reasonably be concluded from this project.

## What This Does Not Prove

Explicit limits of what should _not_ be inferred.

## Status

Exploratory | Validated | Abandoned | Superseded



--------------------------------------------------------------------------------
📄 File: projects/agentic-memory-portability.md
--------------------------------------------------------------------------------

---
uri: klappy://projects/agentic-memory-portability
title: "Agentic Memory Portability"
audience: public
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["projects", "agents", "memory", "odd"]
---

# Agentic Memory Portability

## Goal

Turn klappy.dev into a reusable system that can carry intent forward across:
- sessions,
- collaborators,
- and AI agents,

without requiring the author (or any agent) to reread the entire corpus or rebuild the same mental models from scratch.

This is not "automation."
It is **evolutionary portability**: preserve learning, verify outcomes, discard residue, and elevate only what keeps working.

## What This Is Testing

This project tests whether ODD can be operationalized as a portable cognitive system:

1. **Ingest** canon + docs + articles as a queryable corpus
2. **Navigate** humans to the right references progressively (not "dump everything")
3. **Guide** agents to run ODD-like attempts without reinventing the workflow per project
4. **Elevate** recurring patterns into contracts/canon/decisions
5. **Prove** that reasoning transfers across new projects without re-explaining the worldview

## Non-Goals

- Building a perfect chatbot
- Turning Canon into a rigid framework
- Replacing human judgment
- Preserving every artifact

## Success Signals

- A human can ask a question and get a correct answer with citations and links, without reading the whole site.
- An agent can start a brand-new project using the ODD workflow with minimal bootstrapping.
- Drift decreases over time because contradictions are detected and resolved via decisions/contracts.
- The system improves by elevating only patterns that survive repeated attempts.

## Where This Fits

- Memory model: `/odd/appendices/progressive-elevation.md`
- Multi-lane intent isolation: `/docs/appendices/product-lanes.md`
- Comparability boundaries: `/docs/appendices/epochs.md`
- Decisions: `/docs/decisions/`



--------------------------------------------------------------------------------
📄 File: projects/index.md
--------------------------------------------------------------------------------

---
uri: klappy://projects/index
title: "Projects Index"
audience: public
exposure: nav
tier: 0
voice: neutral
stability: evolving
tags: ["projects", "index"]
---

# 📁 Projects

This folder contains proofs of concept, experiments, and working artifacts built using the principles described in the [Canon](/canon/index.md).

---

## What belongs here

- Small, focused projects that test specific ideas
- Experiments with AI-assisted development workflows
- Reference implementations that demonstrate constraints and tradeoffs

---

## What doesn't belong here

- Production systems
- Client work
- Anything that requires external dependencies to understand

---

## Current projects

- **repo-as-a-system** — treating the repository itself as an outcomes-driven system

Projects will be added as they reach a point worth sharing.  
Each project will include its own README with context, constraints, tradeoffs, and evidence of completion.

---

## Status

This folder intentionally starts small.  
The Canon comes first. Projects follow.

Projects may represent different attempts at the same idea. Multiple outcomes are sometimes necessary to understand whether an idea or its execution needs to change.



--------------------------------------------------------------------------------
📄 File: projects/repo-as-a-system/BUILD_PROMPT_PHASE1.md
--------------------------------------------------------------------------------

---
uri: klappy://projects/repo-as-a-system/build-prompt-phase1
title: "Build Prompt — Phase 1"
audience: internal
exposure: internal
tier: 2
voice: neutral
stability: frozen
tags: ["projects", "repo-as-a-system", "build-prompt", "internal"]
---

# Build Prompt (Phase 1)

This document captures the kickoff prompt used to initialize AI-assisted development for Phase 1 of this project.

It is provided for transparency, reproducibility, and historical context.

It is not a workflow, enforcement mechanism, or guarantee of outcomes.

---

You are an implementation agent building Phase 1 (Conversational UI) of klappy.dev.

Primary objective (Phase 1 only):
Build a static webapp/SPA that renders local Markdown documents and supports LLM-guided navigation via a small set of UI action primitives. The UI should feel like a familiar AI chat page, but the assistant must keep responses short and prefer navigation actions over long explanations.

Non-negotiable platform constraint:
Target deployment is Cloudflare Pages + (optional) Cloudflare Workers.
Phase 1 MUST be deployable as a static SPA to Cloudflare Pages.
Assume Workers runtime later (no Node-only server APIs). Avoid SSR for v0.

Repository inputs you must use:

- /public/content/manifest.json (generated inventory of content; compiled from per-file frontmatter)
- Markdown content under /canon, /odd, /about, /projects (do not invent content)
- The PRD at /docs/PRD.md (behavior contract + scope)
  Important: Canon documents are orientation, not executable workflow. Do not encode agent loops in the app.

Phase 1 deliverable:
A working SPA that:

1. Loads the manifest.json and uses it to list/locate documents
2. Renders selected Markdown in a main reading pane (with stable heading anchors)
3. Provides a chat panel (familiar layout) that accepts user questions
4. Supports UI action primitives by consuming structured “actions” (JSON) and executing them deterministically:
   - open(page_or_uri)
   - scroll_to(section_id)
   - highlight(section_id)
   - expand(section_id) / collapse(section_id) (can be minimal for now)
   - preview(item_id)
   - show_related(items[])
   - pin(item_id)
   - ask_followup(question)
   - suggest_questions(questions[])
5. Keeps assistant text responses short (1–3 sentences) and relies on UI actions to orient the user
6. Works without any backend (Phase 1: no real LLM calls required)

LLM integration requirement (Phase 1):

- Implement a “provider adapter” interface but ship with a MOCK provider by default.
- The mock provider can return:
  a) short responses
  b) a set of UI actions to demonstrate navigation
- Do NOT implement real model calls yet unless it can be done safely without secrets in the browser.
- If you include real LLM support, it must be optional and use a Worker proxy (Phase 1.5), not direct browser secrets.

UX constraints:

- Chat-first layout (left/right or split-pane) that feels familiar.
- Don’t over-explain what is already visible on screen.
- When taking an action, the assistant should optionally include 1 short sentence like:
  “Jumping you to the section that answers that.”

Tech guidance (for v0):

- Prefer Vite + React (static build). No SSR.
- Keep dependencies minimal (KISS).
- Use a simple Markdown renderer with heading IDs.
- Implement highlight via DOM scroll + CSS class toggling.
- Prefer deterministic, explicit state.

Definition of Done (Phase 1):

- Running locally: “npm install && npm run dev” starts the app
- The app shows:
  - a sidebar or list derived from manifest resources (at least entrypoints)
  - a reading pane that renders markdown from selected resource
  - a chat pane that can trigger UI actions (open/scroll/highlight)
- Provide evidence:
  1. Diff summary of what changed
  2. Commands run
  3. Visual proof: screenshots or a short screen recording showing:
     - opening a document
     - scrolling/highlighting a section via an action
     - assistant giving a short response while the UI does the work

What NOT to build yet:

- No MCP server
- No voice/hands-free
- No authentication
- No personalization
- No self-audit automation enforcement in-app
- No “autonomous loops” inside the product

Execution plan you should follow:

1. Propose a minimal folder structure and core components
2. Implement manifest loading + routing to resources
3. Implement markdown rendering + anchors
4. Implement chat UI + action interpreter
5. Implement mock provider that outputs actions + short text
6. Provide evidence artifacts (screenshots/recording) and a brief completion report

Now begin by:

- listing the minimal architecture (components + key data structures),
- then implementing the app incrementally with frequent local verification.

---

## Notes

This prompt reflects the state of the Canon and PRD at the time it was written.
Future phases may require different constraints or context.



--------------------------------------------------------------------------------
📄 File: projects/repo-as-a-system/README.md
--------------------------------------------------------------------------------

---
uri: klappy://projects/repo-as-a-system
title: "Repo-as-a-System"
audience: public
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["projects", "repo-as-a-system"]
---

# 🧪 This Repository as a System

## Intent

Demonstrate that a software repository can function as a coherent system of intent, constraints, and evidence _before_ it contains traditional code artifacts.

This project exists to test whether structure, clarity, and verification can precede implementation without becoming abstract or performative.

---

## Context

Many technical repositories lead with code and retroactively explain intent.

This repository inverts that pattern:

- philosophy first
- constraints second
- artifacts last

The goal is to explore whether this inversion improves clarity, reduces rework, and makes AI-assisted development more predictable.

---

## Constraints

- No production code required
- Public-by-default
- Orientation documents must not prescribe workflows
- All structure must remain understandable without automation
- AI tooling is assumed but not required

---

## Approach

The repository was constructed in layers:

1. **Orientation** — README, About pages, and public ODD articulation
2. **Canon** — constraints, decision rules, evidence policies, and maturity framing
3. **Inventory** — a manifest describing what exists without encoding behavior
4. **Evidence discipline** — explicit definitions of what counts as “done” and “proven”

Each layer was added only when the previous one was coherent.

---

## Tradeoffs

- Delayed visible progress in exchange for long-term coherence
- Higher upfront thinking cost
- Fewer early artifacts to point to

These tradeoffs were intentional.

---

## Evidence

- A navigable repository structure with clear entry points
- Consistent tone and framing across documents
- A manifest that inventories content without enforcing behavior
- A changelog that records evolution without per-file versioning

The system can be understood end-to-end without executing any code.

---

## What This Proves

- A repository can encode intent and constraints explicitly
- Canonical thinking can be separated from execution
- AI-facing structure does not require heavy automation
- Public work can be disciplined without being rigid

---

## What This Does Not Prove

- That this approach improves delivery speed
- That all teams benefit from this level of upfront structure
- That outcomes will always be better

Those claims require future projects and comparison.

---

## Status

**Phase 1 Complete** — Conversational UI SPA built and verified.

---

## Phases

### Phase 1 — Conversational UI (Complete)

Built a static Vite + React SPA that:
- Loads the manifest and renders documents
- Provides a chat panel with mock LLM provider
- Executes UI action primitives (`open`, `scroll_to`, `highlight`, `suggest_questions`)
- Deployable to Cloudflare Pages

See [BUILD_PROMPT_PHASE1.md](BUILD_PROMPT_PHASE1.md) for the kickoff prompt.

### Phase 2 — Evidence & Self-Audit (Planned)

### Phase 3 — MCP Export (Planned)



================================================================================
## Interfaces & Contracts
================================================================================



--------------------------------------------------------------------------------
📄 File: interfaces/attempt-cli/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: attempt-cli
version: 2.0.0
status: active
---

# Attempt CLI Contract (attempt-cli@2.0.0)

This contract defines the stable CLI surface and output artifacts for running attempts.

It exists to prevent drift between:
- human procedure docs
- agent prompts
- actual CLI implementation

---

## Compatibility Promise

If documentation or prompts reference `attempt-cli@2.x`, the repository must provide commands and outputs compatible with this contract.

---

## Required Commands (2.x)

### `attempt:cleanup`
Purpose: prune stale worktrees/branches and restore epistemic cleanliness.

### `attempt:register`
Purpose: register a run and write `.attempt.json` with provenance.

Required flags:
- `--lane <lane>`
- `--tool <tool>`
- `--agent <id>`
- `--model <name>`

### `attempt:nuke`
Purpose: wipe disposable implementation state for a clean attempt.

### `attempt:finalize`
Purpose: assign attempt numbers after runs are complete and move `_runs/` into `attempt-00N/`.

### `attempt:promote`
Purpose: promote the champion attempt for a given lane.

---

## Required Outputs

### `.attempt.json`
Written at registration time.

MUST include:
- `lane`
- `prd_path`
- `prd_version`
- `run_id`
- `runs_dir`
- provenance: `tool`, `agent`, `model`
- `git`: `branch`, `head_sha`

### `META.json`
Written when an attempt is sealed/finalized.

MUST include:
- `lane`
- `prd_version`
- `attempt` (e.g. `001`)
- `sealed_commit`
- provenance fields
- optional deploy evidence (preview URL)

---

## Breaking Change Definition (MAJOR)

Requires MAJOR bump if:

- required flags change or are removed
- `.attempt.json` or `META.json` required fields are renamed or removed
- commands are renamed

---

## Verification Rules (for tooling)

A verifier for `attempt-cli@2.0.0` MUST check:

- required commands exist (by invoking help or command registry)
- `.attempt.json` contains required fields
- finalized attempts contain `META.json` with required fields



--------------------------------------------------------------------------------
📄 File: interfaces/build-output/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: build-output
version: 3.0.0
status: active
---

# Build Output Contract (build-output@3.0.0)

This contract defines the required deployment artifact shape produced by any lane build.

It applies to:
- Cloudflare Pages deployments
- local verification
- future multi-lane deployments

---

## Compatibility Promise

Any lane implementation that claims `build-output@3.x` must output a deployable artifact that conforms to this contract.

---

## Required Output

For a given lane `<lane>`, a build MUST produce a folder named:

- `products/<lane>/dist/`

That folder MUST contain at minimum:

- `products/<lane>/dist/index.html`

---

## Required Runtime Availability

The deployed site MUST be able to load:

- `/content/manifest.json`

The canonical manifest file in the repository is `/public/content/manifest.json`. Platforms typically serve it at runtime as `/content/manifest.json` (e.g., by copying `public/` assets into the deploy artifact), but the deployed app must be able to fetch it via HTTP at `/content/manifest.json`.

---

## Stack Freedom

Any framework or stack is permitted.

The only requirement is that the output conforms to:
- `products/<lane>/dist/index.html` exists
- the app can load the manifest at runtime
- no client secrets are embedded

---

## Breaking Change Definition (MAJOR)

Requires MAJOR bump if:

- `products/<lane>/dist` is renamed or lane scoping is removed
- `index.html` is no longer required
- required runtime paths change

---

## Verification Rules (for tooling)

A verifier for `build-output@3.0.0` MUST check (for a chosen `<lane>`):

- `products/<lane>/dist/` exists after build
- `products/<lane>/dist/index.html` exists after build
- `public/content/manifest.json` exists in repo



--------------------------------------------------------------------------------
📄 File: interfaces/canon-frontmatter/CONTRACT.md
--------------------------------------------------------------------------------

---
uri: klappy://interfaces/canon-frontmatter/contract
title: "Canon Frontmatter Contract"
audience: internal
exposure: public
tier: 2
voice: neutral
stability: stable
tags: ["interfaces", "canon", "frontmatter", "schema", "verification"]
---

# Canon Frontmatter Contract

This contract defines the required YAML frontmatter for canonical markdown files so that
verification tooling can reliably index, validate, and serve content without drift.

## Scope

Applies to markdown documents intended to be addressable content in the site corpus, including:

- `/canon/**`
- `/docs/**` (only when treated as addressable content)
- Any content registered into `/public/content/manifest.json`

This contract does **not** apply to:
- generated output under `/public/_compiled/**`
- attempt artifacts under `/attempts/**`

## Required Fields (E0002+)

All new canonical documents MUST include YAML frontmatter with at least:

- `uri` (string) — stable, unique identifier
- `title` (string)
- `tier` (number) — progressive disclosure tier (1 = most prominent)
- `tags` (array of strings)

### Optional but Recommended Fields

- `audience` (string) — e.g. `public | internal`
- `exposure` (string) — e.g. `public | internal`
- `voice` (string) — e.g. `neutral`
- `stability` (string) — e.g. `stable | draft`
- `category` (string)
- `status` (string)
- `version` (string)

## Canonical Example (Minimum)

```yaml
---
uri: klappy://odd/example
title: "Example Doc"
tier: 2
tags: ["odd", "example"]
---
```

## Uniqueness Rules

- `uri` MUST be globally unique across the repo's addressable corpus.
- If two files claim the same `uri`, verification MUST fail.

## Legacy

Older docs may exist that predate this contract and use alternate frontmatter shapes.
Legacy docs are permitted during epoch transitions, but:
- Any doc modified or created in the E0002+ era MUST conform to this contract.
- Tooling may warn on legacy shapes; warnings are acceptable until the migration is complete.

## Relationship to Manifest

`/public/content/manifest.json` is the published inventory.
Frontmatter is the file's self-declaration.
They must align (same identity, same title intent, no conflicting tags).

If they diverge, frontmatter is the source-of-truth for the file, and the manifest must be updated to match.



--------------------------------------------------------------------------------
📄 File: interfaces/index.md
--------------------------------------------------------------------------------

# Interfaces

Interfaces are the repository's **compatibility contracts**.

They are the only documents that use **semantic versioning** (semver) by default.

Everything else (attempts, internal docs, implementation) may evolve freely, but must remain compatible with the published interface contracts or bump the appropriate major version.

---

## What is an Interface Contract?

An interface contract is a stable promise that other systems, agents, or humans may depend on.

Examples:

- **Manifest schema** (`/public/content/manifest.json`)
- **Build output contract** (`products/<lane>/dist` shape required for deployment)
- **Attempt tooling contract** (CLI flags + output files like `.attempt.json`, `META.json`)
- **MCP surface** (tools/endpoints/resources and their response schema)

---

## Semver Rules (Repo Policy)

We use semver only where compatibility matters.

- **MAJOR (X.0.0):** breaking change that requires downstream updates
- **MINOR (0.Y.0):** backwards-compatible additions
- **PATCH (0.0.Z):** clarifications, bug fixes, tighter wording that does not invalidate previously valid implementations

---

## Scope Boundaries

- Attempts are **observations**, not releases.
- Lanes are **products** (each lane may have its own semver).
- Canon is **shared truth**, but not an interface unless explicitly declared as one.

---

## Interface Contracts

- [Manifest Contract](./manifest/CONTRACT.md)
- [Build Output Contract](./build-output/CONTRACT.md)
- [Attempt CLI Contract](./attempt-cli/CONTRACT.md)
- [MCP Contract](./mcp/CONTRACT.md)



--------------------------------------------------------------------------------
📄 File: interfaces/manifest/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: manifest
version: 2.0.0
status: active
---

# Manifest Contract (manifest@2.0.0)

This contract defines the required schema and semantics for:

- `/public/content/manifest.json`

The manifest is the authoritative inventory of addressable content and is consumed by:
- the website lane UI
- ai-navigation systems
- agent-skill systems
- future MCP proxies

---

## Compatibility Promise

Any consumer that supports `manifest@2.x` must be able to load and interpret any `manifest@2.x` file without modification.

A producer that claims `manifest@2.x` must emit a file that conforms to this contract.

---

## Required Top-Level Fields

The manifest JSON MUST be an object containing:

- `pack_version` (string) — version of the manifest pack (not semver for the repo; informational)
- `resources` (array) — list of resource objects

Example:

```json
{
  "pack_version": "0.2.0",
  "resources": []
}
```

---

## Resource Object Schema

Each entry in `resources` MUST contain:

- `uri` (string) — globally unique, stable identifier (e.g. `klappy://odd/epochs`)
- `title` (string) — display title
- `path` (string) — repo-relative path beginning with `/`
- `tier` (integer) — 0, 1, or 2 (progressive disclosure tier)

Each entry MAY contain:

- `tags` (array of strings)
- `summary` (string)
- `status` (string)

---

## Semantics

### `uri`

- MUST be stable across time.
- MUST NOT be reused for different content.
- MAY point to updated content at the same path over time.

### `path`

- MUST resolve to an actual file in the repo.
- MUST begin with `/`.

### `tier`

Progressive disclosure tiers:

- **0** — immediate orientation / public entrypoints
- **1** — core canon / curated entrypoints
- **2** — full machinery / appendices / deep structure

---

## Breaking Change Definition (MAJOR)

Any of the following requires a MAJOR version bump:

- removing or renaming required fields
- changing the meaning of `tier`
- changing `resources` from an array to another structure
- changing required URI conventions such that existing URIs become invalid

---

## Backwards-Compatible Changes (MINOR)

Allowed without a MAJOR bump:

- adding new optional fields to resources
- adding new resource entries
- adding new tags, summaries, statuses

---

## Verification Rules (for tooling)

A verifier for `manifest@2.0.0` MUST check:

- manifest is valid JSON
- top-level contains `resources` array
- every resource contains `uri`, `title`, `path`, `tier`
- `tier` is one of `0|1|2`
- every `path` exists in the repository

---

## Change Log

- **2.0.0** — Introduces required `tier` field on all resources and formalizes schema.



--------------------------------------------------------------------------------
📄 File: interfaces/mcp/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: mcp
version: 0.1.0
status: draft
---

# MCP Contract (mcp@0.1.0)

This contract is intentionally draft.

It defines the future stable surface for exposing:
- canon resources
- manifest resources
- lane-scoped artifacts
via MCP.

This contract is NOT yet enforced.

---

## Scope (Draft)

Potential stable capabilities:

- list resources
- fetch resource by URI
- search content with citations
- retrieve lane PRDs
- retrieve attempt artifacts (sealed only)

---

## Non-Goals (for 0.1.0)

- no guarantee of tool names
- no guarantee of response schema
- no guarantee of authentication model

---

## When this becomes semver-stable

When an external consumer depends on this for more than experiments, we will:
- define exact tools/endpoints
- define response schemas
- publish `mcp@1.0.0`



================================================================================
## Visual Design System
================================================================================



--------------------------------------------------------------------------------
📄 File: visual/README.md
--------------------------------------------------------------------------------

---
uri: klappy://visual
title: "Visual Design System"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["visual", "design", "interfaces", "index"]
---

# Visual Design System

> Versioned visual contracts that define appearance without prescribing implementation.

## Description

The visual folder contains visual interface contracts that products consume for consistent appearance. Like API interfaces, visual interfaces use semantic versioning (semver). Products declare compatibility with visual interface versions rather than defining colors, fonts, or spacing directly.

## Outline

- Contents
- How Visual Interfaces Work
- Relationship to Products

---

## Contents

| Path | Title | Summary |
|------|-------|---------|
| `interfaces/index.md` | Visual Interfaces | Overview of visual compatibility contracts |
| `interfaces/color-system/CONTRACT.md` | Color System | Semantic color tokens and accessibility rules |
| `interfaces/typography/CONTRACT.md` | Typography | Font scales, weights, and usage rules |
| `interfaces/spacing/CONTRACT.md` | Spacing | Spacing scale and application rules |

---

## How Visual Interfaces Work

Visual interfaces follow semver:

- **MAJOR (X.0.0):** Breaking change (removed tokens, changed meaning)
- **MINOR (0.Y.0):** Backwards-compatible additions (new tokens)
- **PATCH (0.0.Z):** Documentation fixes

---

## Relationship to Products

Products declare visual interface compatibility in their PRDs:

```markdown
## Visual Interfaces

This product MUST remain compatible with:
- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
```

---

## See Also

- [Visual Evolution](/odd/appendices/visual-evolution.md) — Philosophy of visual system evolution
- [Interface Contracts](/interfaces/index.md) — General interface contract pattern



--------------------------------------------------------------------------------
📄 File: visual/interfaces/color-system/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: color-system
version: 1.0.0
status: active
---

# Color System Contract (color-system@1.0.0)

This contract defines the canonical color tokens and semantic roles used across all visual surfaces.

---

## Compatibility Promise

Any consumer that supports `color-system@1.x` must be able to apply any `color-system@1.x` token set without modification.

A producer that claims `color-system@1.x` must emit tokens that conform to this contract.

---

## Guarantees

Consumers may rely on:

- Token names remaining stable across 1.x
- Semantic meaning not changing within a major version
- Contrast ratios meeting WCAG AA accessibility requirements

---

## Required Tokens

The following semantic tokens MUST exist:

### Background Tokens

- `--color-bg-primary` — primary background surface
- `--color-bg-secondary` — secondary/elevated background surface
- `--color-bg-tertiary` — tertiary/recessed background surface

### Text Tokens

- `--color-text-primary` — primary text color
- `--color-text-secondary` — secondary/muted text color
- `--color-text-inverse` — text on accent backgrounds

### Accent Tokens

- `--color-accent` — primary accent color
- `--color-accent-hover` — accent hover state
- `--color-accent-active` — accent active/pressed state

### Semantic Tokens

- `--color-success` — success/positive state
- `--color-warning` — warning/caution state
- `--color-error` — error/destructive state

### Border Tokens

- `--color-border-primary` — primary border color
- `--color-border-secondary` — subtle/secondary border color

---

## Optional Tokens (MINOR additions)

The following tokens MAY be added in minor versions:

- Additional semantic states
- Surface elevation variants
- Mode-specific overrides (dark/light)

---

## Accessibility Requirements

All text/background combinations MUST meet:

- WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Sufficient distinction between semantic states

---

## Breaking Change Definition (MAJOR)

Requires MAJOR bump if:

- Removing or renaming required tokens
- Changing semantic meaning (e.g., accent → warning)
- Reducing contrast below accessibility thresholds

---

## Backwards-Compatible Changes (MINOR)

Allowed without a MAJOR bump:

- Adding new tokens
- Adding token aliases
- Adding mode variants (dark mode tokens)

---

## Verification Rules (for tooling)

A verifier for `color-system@1.0.0` MUST check:

- All required tokens exist
- Tokens resolve to valid CSS color values
- Primary text on primary background meets WCAG AA

---

## Change Log

- **1.0.0** — Initial color system contract with semantic tokens and accessibility requirements.



--------------------------------------------------------------------------------
📄 File: visual/interfaces/index.md
--------------------------------------------------------------------------------

# Visual Interfaces

Visual interfaces are the repository's **visual compatibility contracts**.

They define what consumers may rely on for visual consistency, without prescribing implementation details.

Like API interfaces, visual interfaces use **semantic versioning** (semver).

---

## What is a Visual Interface Contract?

A visual interface contract is a stable promise about visual behavior that products may depend on.

Examples:

- **Color System** — semantic color tokens and roles
- **Typography** — font scales, weights, and usage rules
- **Spacing** — spacing scale and application rules
- **Motion** — animation timing and easing contracts
- **Iconography** — icon style and usage rules

---

## Semver Rules (Visual Policy)

Visual interfaces follow the same semver rules as API interfaces:

- **MAJOR (X.0.0):** breaking change (removed tokens, changed semantic meaning)
- **MINOR (0.Y.0):** backwards-compatible additions (new tokens, aliases)
- **PATCH (0.0.Z):** clarifications, documentation fixes

---

## Relationship to Products

Products declare visual interface compatibility in their PRDs:

```markdown
## Visual Interfaces

This product MUST remain compatible with:
- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
```

Products do NOT define colors, fonts, or spacing directly.
They consume visual interfaces.

---

## Visual Interface Contracts

- [Color System Contract](./color-system/CONTRACT.md)
- [Typography Contract](./typography/CONTRACT.md)
- [Spacing Contract](./spacing/CONTRACT.md)

---

## Related Documentation

- [Visual Evolution](/odd/appendices/visual-evolution.md)
- [Interface Contracts](/interfaces/index.md)



--------------------------------------------------------------------------------
📄 File: visual/interfaces/spacing/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: spacing
version: 1.0.0
status: active
---

# Spacing Contract (spacing@1.0.0)

This contract defines the canonical spacing tokens and application rules used across all visual surfaces.

---

## Compatibility Promise

Any consumer that supports `spacing@1.x` must be able to apply any `spacing@1.x` token set without modification.

A producer that claims `spacing@1.x` must emit tokens that conform to this contract.

---

## Guarantees

Consumers may rely on:

- Token names remaining stable across 1.x
- Spacing scale ratios remaining consistent within a major version
- Semantic application rules not changing within a major version

---

## Required Tokens (Base-8 Scale)

The spacing system uses a base-8 scale for consistency:

- `--space-0` — 0px (no space)
- `--space-1` — 4px (hairline)
- `--space-2` — 8px (tight)
- `--space-3` — 12px (compact)
- `--space-4` — 16px (base)
- `--space-5` — 24px (comfortable)
- `--space-6` — 32px (relaxed)
- `--space-8` — 48px (loose)
- `--space-10` — 64px (spacious)
- `--space-12` — 96px (generous)
- `--space-16` — 128px (expansive)

---

## Semantic Tokens

For common use cases:

- `--space-inline-xs` — inline spacing (icons, badges)
- `--space-inline-sm` — small inline gaps
- `--space-inline-md` — medium inline gaps
- `--space-stack-xs` — tight vertical stacking
- `--space-stack-sm` — small vertical stacking
- `--space-stack-md` — medium vertical stacking
- `--space-stack-lg` — large vertical stacking
- `--space-inset-sm` — small padding (buttons, chips)
- `--space-inset-md` — medium padding (cards, panels)
- `--space-inset-lg` — large padding (sections)

---

## Application Rules

| Context | Recommended Token |
|---------|-------------------|
| Icon-to-text gap | space-1 or space-2 |
| Button padding | space-2 (vertical), space-4 (horizontal) |
| Card padding | space-4 or space-5 |
| Section spacing | space-8 or space-10 |
| Page margins | space-4 (mobile), space-6+ (desktop) |
| List item gap | space-2 or space-3 |

---

## Breaking Change Definition (MAJOR)

Requires MAJOR bump if:

- Removing or renaming required tokens
- Changing the scale ratio (e.g., base-8 to base-4)
- Changing semantic token mappings

---

## Backwards-Compatible Changes (MINOR)

Allowed without a MAJOR bump:

- Adding new scale tokens
- Adding new semantic tokens
- Adding responsive variants

---

## Verification Rules (for tooling)

A verifier for `spacing@1.0.0` MUST check:

- All required tokens exist
- Tokens resolve to valid CSS length values
- Scale maintains consistent ratios

---

## Change Log

- **1.0.0** — Initial spacing contract with base-8 scale and semantic tokens.



--------------------------------------------------------------------------------
📄 File: visual/interfaces/typography/CONTRACT.md
--------------------------------------------------------------------------------

---
contract: typography
version: 1.0.0
status: active
---

# Typography Contract (typography@1.0.0)

This contract defines the canonical typography tokens and usage rules used across all visual surfaces.

---

## Compatibility Promise

Any consumer that supports `typography@1.x` must be able to apply any `typography@1.x` token set without modification.

A producer that claims `typography@1.x` must emit tokens that conform to this contract.

---

## Guarantees

Consumers may rely on:

- Token names remaining stable across 1.x
- Semantic roles not changing within a major version
- Readability meeting accessibility requirements

---

## Required Tokens

### Font Family Tokens

- `--font-family-sans` — primary sans-serif stack
- `--font-family-mono` — monospace stack for code

### Font Size Tokens (modular scale)

- `--font-size-xs` — extra small (captions, labels)
- `--font-size-sm` — small (secondary text)
- `--font-size-base` — base size (body text)
- `--font-size-lg` — large (lead paragraphs)
- `--font-size-xl` — extra large (subheadings)
- `--font-size-2xl` — heading level 3
- `--font-size-3xl` — heading level 2
- `--font-size-4xl` — heading level 1

### Font Weight Tokens

- `--font-weight-normal` — normal weight (400)
- `--font-weight-medium` — medium weight (500)
- `--font-weight-semibold` — semi-bold weight (600)
- `--font-weight-bold` — bold weight (700)

### Line Height Tokens

- `--line-height-tight` — tight leading (headings)
- `--line-height-normal` — normal leading (body)
- `--line-height-relaxed` — relaxed leading (long-form)

### Letter Spacing Tokens

- `--letter-spacing-tight` — tighter tracking (headings)
- `--letter-spacing-normal` — normal tracking
- `--letter-spacing-wide` — wider tracking (small caps, labels)

---

## Semantic Roles

Tokens should be applied according to semantic purpose:

| Role | Font Size | Font Weight | Line Height |
|------|-----------|-------------|-------------|
| Body | base | normal | normal |
| Lead | lg | normal | relaxed |
| Caption | xs | normal | normal |
| Label | sm | medium | tight |
| H1 | 4xl | bold | tight |
| H2 | 3xl | semibold | tight |
| H3 | 2xl | semibold | tight |
| Code | base | normal (mono) | normal |

---

## Accessibility Requirements

- Base font size MUST be at least 16px equivalent
- Line height for body text MUST be at least 1.5
- Sufficient contrast between font weights for hierarchy

---

## Breaking Change Definition (MAJOR)

Requires MAJOR bump if:

- Removing or renaming required tokens
- Changing semantic role mappings
- Reducing base font size below accessibility threshold

---

## Backwards-Compatible Changes (MINOR)

Allowed without a MAJOR bump:

- Adding new size tokens
- Adding new weight tokens
- Adding font family variants

---

## Verification Rules (for tooling)

A verifier for `typography@1.0.0` MUST check:

- All required tokens exist
- Font size tokens resolve to valid CSS values
- Base font size is >= 16px equivalent

---

## Change Log

- **1.0.0** — Initial typography contract with modular scale and semantic roles.



================================================================================
## Infrastructure
================================================================================



--------------------------------------------------------------------------------
📄 File: infra/README.md
--------------------------------------------------------------------------------

---
uri: klappy://infra
title: "Infrastructure"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["infra", "scripts", "tooling", "index"]
---

# Infrastructure

> Tooling, scripts, and configuration that power the repository.

## Description

The infra folder contains implementation tooling for the klappy.dev repository: build scripts, verification tools, compile plans, deployment configuration, and reusable prompts. These are execution artifacts, not philosophy—they implement the contracts defined in `/interfaces/` and the constraints defined in `/canon/`.

## Outline

- Contents
- Key Scripts
- Relationship to Other Folders

---

## Contents

| Folder | Purpose |
|--------|---------|
| `cloudflare/` | Cloudflare Pages deployment configuration |
| `compile/` | Pack compilation plans (JSON definitions) |
| `contracts/` | Build and deployment contracts |
| `prompts/` | Reusable prompt templates for agents |
| `scripts/` | Node.js tooling scripts |

---

## Key Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `export-book.js` | `node infra/scripts/export-book.js` | Export all docs to single markdown |
| `verify-content.js` | `npm run verify:content` | Check manifest vs disk alignment |
| `verify-contracts.js` | `npm run verify:contracts` | Verify build output contracts |
| `compile-pack.js` | `npm run compile` | Generate context packs |
| `sync-content.js` | `npm run sync` | Sync source docs to public/content |
| `attempt-cli.js` | `npm run attempt:*` | Attempt lifecycle commands |
| `audit-drift.js` | `npm run audit:drift` | Check for document drift |

---

## Relationship to Other Folders

| Folder | Relationship |
|--------|--------------|
| `/interfaces/` | Infra implements these contracts |
| `/canon/` | Infra enforces these constraints |
| `/docs/` | Infra is documented here |
| `/products/` | Infra builds and deploys these |

---

## See Also

- [Build Output Contract](contracts/build-output.md) — What builds must produce
- [Cloudflare Config](/docs/CLOUDFLARE_CONFIG.md) — Authoritative deploy config
- [Compilation Targets](/docs/appendices/compilation-targets.md) — Pack definitions



--------------------------------------------------------------------------------
📄 File: infra/cloudflare/README.md
--------------------------------------------------------------------------------

# ☁️ Cloudflare Pages Deployment

## Configuration

- **Build command:** `npm run build -- --lane <lane>`
- **Output directory:** `products/<lane>/dist`
- **Root directory:** `.`

> **Legacy / Transitional note (pre-D0013):** Some older configurations may still publish repo-root `/dist/`. That output is no longer canonical.

## Branch Deploys

| Branch | Deploys To |
|--------|------------|
| `prod` | **Production** (klappy.dev) |
| `main` | Preview only (experiment ledger) |
| `*` (any other) | Preview (`https://<branch-name>.klappy-dev.pages.dev`) |

> **Note:** See `/docs/CLOUDFLARE_CONFIG.md` for the authoritative deploy configuration.

## What This Means for Attempts

1. Each attempt branch auto-deploys on push
2. Preview URLs are available for evaluation
3. No manual deployment steps required

## Deploy Contract

See `/infra/contracts/build-output.md` for what builds must produce.

## Key Principle

> The app code is disposable. The deploy contract is not.

Cloudflare Pages remains perpetually deployable regardless of what stack (or no stack) is in `/src`.



--------------------------------------------------------------------------------
📄 File: infra/contracts/build-output.md
--------------------------------------------------------------------------------

# 📜 Build Output Contract

> **This is the ONLY surviving build rule across all attempts.**
> Do not modify this file during an attempt unless the PRD explicitly requires it.
> If you believe this contract is wrong, propose changes in `PRD_PATCH.md`.

---

## Requirements

### 1. Build Must Produce `products/<lane>/dist`

```
npm run build -- --lane <lane> → products/<lane>/dist
```

The build command must generate a production-ready bundle in `products/<lane>/dist`.
Any stack is allowed (React, Vue, Svelte, Vanilla JS, static HTML, etc.)

### 2. Lane Build Must Load Content

The app MUST fetch and display content from:

```
/content/manifest.json
```

This manifest is generated from per-file frontmatter during `npm run sync`.
Your app must be able to load and render resources listed in this manifest.

### 3. No Client Secrets

- No API keys in client code
- No secrets in `products/<lane>/dist`
- If external APIs are needed, they must be public or use server-side proxies

### 4. Cloudflare Pages Compatible

The build output must work with Cloudflare Pages:

- Static files only (no SSR unless using Workers)
- No server-side dependencies
- Assets must use relative paths or be under `products/<lane>/dist`

Cloudflare configuration for lane deployments:

- One Pages project per lane
- Project root directory: repository root (`.`)
- Build command: `npm run build -- --lane <lane>`
- Build output directory: `products/<lane>/dist`

---

## The Contract

| Requirement | Test |
|-------------|------|
| `products/<lane>/dist` exists after build | `ls "products/<lane>/dist/"` succeeds |
| Entry point exists | `ls "products/<lane>/dist/index.html"` succeeds |
| Manifest is accessible | `curl $PREVIEW_URL/content/manifest.json` returns JSON |
| App loads | Browser shows content, no white screen |

---

## What This Means for Agents

- You may use **any framework** or no framework
- You may use **any CSS approach** (Tailwind, vanilla, CSS-in-JS)
- You may use **any build tool** (Vite, esbuild, Rollup, Parcel, none)
- You **must** ensure `npm run build -- --lane <lane>` produces `products/<lane>/dist`
- You **must** ensure the app can display content from `/content/manifest.json`

---

## Non-Negotiable

If your build doesn't produce `products/<lane>/dist` with a working `index.html` that loads the manifest, **your attempt fails the deploy contract**.

Fix the build. Don't modify this contract.



--------------------------------------------------------------------------------
📄 File: infra/prompts/README.md
--------------------------------------------------------------------------------

---
uri: klappy://infra/prompts
title: "Prompts"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["infra", "prompts", "agents", "index"]
---

# Prompts

> Reusable prompt templates for agent tasks.

## Description

The prompts folder contains curated prompt templates for common agent operations. These are not ad-hoc instructions—they encode tested workflows that agents should follow verbatim. Each prompt set includes context, criteria, and expected outputs.

## Outline

- Contents
- When to Use Prompts
- Creating New Prompts

---

## Contents

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `attempt-kickoff/` | Agent initialization for attempt work | `BOOTSTRAP.md`, lane-specific kickoffs |
| `doc-inclusion-audit/` | Document audit for packs and exports | `PROMPT.md`, `CHECKLIST.md` |

---

## Prompt Sets

### attempt-kickoff

Agent bootstrap for starting new attempts. Ensures agents read required docs, follow provenance rules, and produce online evidence.

| File | Purpose |
|------|---------|
| `BOOTSTRAP.md` | Universal agent initialization (read first) |
| `website.md` | Website lane-specific kickoff |

### doc-inclusion-audit

Evaluate which documents belong in book exports and context packs.

| File | Purpose |
|------|---------|
| `PROMPT.md` | Complete audit prompt with criteria |
| `CHECKLIST.md` | Quick decision trees and templates |
| `README.md` | Usage guide |

---

## When to Use Prompts

- **Starting an attempt:** Use `attempt-kickoff/BOOTSTRAP.md`
- **Auditing documentation:** Use `doc-inclusion-audit/PROMPT.md`
- **Adding new lanes:** Create lane-specific kickoff in `attempt-kickoff/`

---

## Creating New Prompts

New prompts should include:

1. **Context:** What the agent needs to know
2. **Criteria:** How to make decisions
3. **Output format:** Expected deliverables
4. **Verification:** How to check success

Store in a subfolder with a descriptive name and README.



--------------------------------------------------------------------------------
📄 File: infra/prompts/attempt-kickoff/BOOTSTRAP.md
--------------------------------------------------------------------------------

# BOOTSTRAP (Read Verbatim)

You are an agent operating inside the klappy.dev repo.

You MUST follow repo instructions. You MUST NOT invent process.

## Required Reads (in order)

1. `/docs/appendices/product-lanes.md`
2. `/docs/appendices/epochs.md`
3. `/docs/appendices/online-evidence.md`
4. `/docs/ATTEMPT_KICKOFF.md`
5. `/docs/ATTEMPTS.md`
6. The lane PRD you are assigned (e.g., `/docs/PRD/website/PRD.md`)

## Hard Invariants

1. You MUST declare a lane before registration.
2. You MUST run `attempt:register` first, then `attempt:nuke` immediately after.
3. You MUST NOT modify Canon unless explicitly instructed by the PRD.
4. You MUST produce **ONLINE evidence**:
   - Push the attempt branch to `origin`
   - Report the Cloudflare Preview URL
   - Report the Evidence URL
   
   **If you cannot do this, the attempt is INVALID.**

## Branch Naming (Enforced by Tooling)

Branch format: `run/<lane>/prd-v<version>/<tool>/<agent>/<model>/<run_id>`

Example: `run/website/prd-v1.0/cursor/a/claude-opus-4/59bc9355`

Do not invent branch names. Use what `attempt:register` suggests.

## Your First Output

After reading the required documents, print:

- **Lane:** (which lane you are targeting)
- **PRD path:** (full path to the lane PRD)
- **Planned branch name:** (following the format above)
- **How you will produce the Cloudflare Preview URL:** (push branch, CF builds automatically)
- **Where the Evidence URL will live:** (e.g., `products/<lane>/attempts/prd-vX.Y/_runs/<run_id>/EVIDENCE.md`)

## Then Proceed

After printing the above, follow the lane-specific kickoff prompt:

- `/infra/prompts/attempt-kickoff/<lane>.md`

Copy/paste its contents **verbatim** and follow it exactly.



--------------------------------------------------------------------------------
📄 File: infra/prompts/attempt-kickoff/website.md
--------------------------------------------------------------------------------

---
id: attempt-kickoff-website
lane: website
status: canonical
epoch: E0003
audience: agents
---

# Attempt Kickoff — Website Lane

This is the ONLY instruction needed to start a website attempt.
Copy/paste into agent chat WITHOUT modification.

---

## Read First

1. `/docs/appendices/evidence.md`
2. `/docs/PRD/website/PRD.md`
3. `/canon/constraints.md`

---

## Lane (LOCKED)

- **Lane:** `website`
- **PRD:** `/docs/PRD/website/PRD.md`
- **Build output:** `products/website/dist/`
- **Evidence URL:** `/_evidence/`

---

## First Actions (EXACT ORDER)

1) Register:
```bash
npm run attempt:register -- --lane website --tool cursor --agent a --model "<your-model>"
```

2) Nuke:
```bash
npm run attempt:nuke -- --lane website
```

3) Create evidence folder:
```bash
mkdir -p attempts/website/prd-v1.0/_runs/<run_id>/screenshots
mkdir -p attempts/website/prd-v1.0/_runs/<run_id>/recordings
```

Use the run_id from step 1.

---

## Build

Implement in `products/website/src/`:

- Load `/content/manifest.json`
- Render home page with ≤7 nav items
- Render markdown content
- Mobile-usable

---

## Evidence (MANDATORY)

Write to `attempts/website/prd-v1.0/_runs/<run_id>/`:

- `ATTEMPT.md` — what you did
- `EVIDENCE.md` — proof links
- `META.json` — provenance (auto-created by register)
- `screenshots/` — at least 1 image
- `recordings/` — at least 1 video OR 3 screenshots total

---

## Completion (NON-NEGOTIABLE)

An attempt is **INVALID** unless ALL are true:

1. Branch pushed to origin
2. Cloudflare Pages builds successfully
3. App loads at preview URL
4. `/_evidence/` returns HTTP 200
5. Screenshots/video present in evidence

**Local preview is NOT acceptable as completion.**

If `/_evidence/` returns 404 → STOP. Attempt is INVALID.

---

## Scope Guard

You MUST NOT:

- Modify `canon/**`
- Modify other lanes
- Add infra, contracts, audits
- Invent workflows

Your ONLY job: **produce a working website with public evidence**.

---

## Before Coding

List exact files you will create/modify.
Then begin.



--------------------------------------------------------------------------------
📄 File: infra/prompts/doc-inclusion-audit/CHECKLIST.md
--------------------------------------------------------------------------------

# 📝 Document Inclusion Audit Checklist

Quick reference checklist for evaluating documents.

---

## Progressive Disclosure Structure Checklist

Every document SHOULD follow this structure:

```markdown
---
uri: klappy://[tier]/[path]      ← Required: unique identifier
title: "Title"                   ← Required: document title
audience: docs | canon | odd     ← Required: target audience
tier: 1 | 2                      ← Required: disclosure tier
stability: stable | evolving     ← Required: change expectation
tags: ["tag1", "tag2"]           ← Required: search/filter tags
---

# Title                          ← Required: H1 matching frontmatter

> Subtitle blockquote            ← Required: one-line summary

## Description                   ← Required: 1-2 paragraph overview

[Self-contained summary...]

## Outline                       ← Recommended: table of contents

- Section 1
- Section 2

---

## Content                       ← Required: full content below

[Detailed content...]
```

### Quick Compliance Check

For each document:

- [ ] **Frontmatter complete?** (uri, title, audience, tier, stability, tags)
- [ ] **H1 title present?**
- [ ] **Blockquote subtitle?** (one line after H1)
- [ ] **Description section?** (## Description with summary)
- [ ] **Outline section?** (## Outline with bullet list)
- [ ] **Content section?** (## Content with full text)

### Compliance Levels

| Level | Requirements | Pack Usability |
|-------|--------------|----------------|
| **Full** | All 6 elements | Can compile at any level (L0-L4) |
| **Partial** | Frontmatter + H1 + Description | Can compile at L0-L2 |
| **Minimal** | Frontmatter + H1 only | Can only list, not summarize |
| **Missing** | No frontmatter | Cannot be reliably compiled |

---

## README-as-Index Checklist

Every folder SHOULD have a `README.md` that:

- [ ] Lists all files in the folder with one-line summaries
- [ ] Groups files by category (if applicable)
- [ ] Explains the folder's purpose
- [ ] Links to related folders/docs

### Folder Index Template

```markdown
# 📁 [Folder Name]

> [One-line description of what this folder contains]

## Contents

| File | Summary |
|------|---------|
| `file1.md` | One-line description |
| `file2.md` | One-line description |

## [Subfolders if any]

| Folder | Purpose |
|--------|---------|
| `subfolder/` | What it contains |

## See Also

- [Related doc](/path/to/doc.md)
```

---

## Book Export Decision Tree

```
Is this file a markdown document (.md)?
├── NO → EXCLUDE (book is markdown only)
└── YES → Continue
    │
    Is it in /public/content/?
    ├── YES → EXCLUDE (duplicate of source)
    └── NO → Continue
        │
        Is it in /node_modules/, /.git/, /dist/, /build/?
        ├── YES → EXCLUDE (build/dependency artifact)
        └── NO → Continue
            │
            Is it in /**/attempts/**?
            ├── YES → Is it ATTEMPT.md, EVIDENCE.md, or META summary?
            │   ├── YES → EVALUATE (may include sealed records)
            │   └── NO → EXCLUDE (implementation artifacts)
            └── NO → Continue
                │
                Is it in /**/src/**?
                ├── YES → EXCLUDE (source code, not docs)
                └── NO → Continue
                    │
                    Is it in /products/*/v*/**?
                    ├── YES → EXCLUDE (version-specific implementation)
                    └── NO → Continue
                        │
                        Is it in /.cursor/plans/?
                        ├── YES → EXCLUDE (ephemeral plans)
                        └── NO → INCLUDE ✅
```

---

## Context Pack Inclusion Matrix

### By Document Type and Disclosure Level

| Document Type | visitor | author | agent-core | dev-peer |
|---------------|---------|--------|------------|----------|
| **ODD Manifesto** | L2 | L4 | L2 | L4 |
| **ODD Appendices** | ❌ | L4 | L2 select | L4 |
| **ODD Decisions** | ❌ | L2 D0001 | ❌ | L4 |
| **Canon README** | L2 | L4 | L2 | L4 |
| **Canon Core** | ❌ | L4 | L3 | L4 |
| **Canon Changelog** | ❌ | ❌ | ❌ | L4 |
| **Docs README** | L2 | L4 | L2 | L4 |
| **Docs Appendices** | ❌ | L3 select | L2 select | L4 |
| **Docs Decisions** | ❌ | ❌ | L2 select | L4 |
| **Lane PRDs** | L2 | L4 | L4 | L4 |
| **Attempt Workflows** | ❌ | L4 | L3 | L4 |
| **Agent Kickoff** | ❌ | ❌ | L4 | L4 |
| **Interfaces/Contracts** | ❌ | L2 select | L3 | L4 |
| **Visual System** | ❌ | L2 select | ❌ | L4 |
| **About Pages** | L2 | L4 | ❌ | L4 |
| **Projects** | L2 | L4 | ❌ | L4 |
| **Folder READMEs** | L1 | L2 | L2 | L4 |

### Disclosure Level Legend

| Level | What's Included | Typical Tokens |
|-------|-----------------|----------------|
| **L0** | Title only (from frontmatter) | ~50 |
| **L1** | + Subtitle blockquote | ~100 |
| **L2** | + Description section | ~200-500 |
| **L3** | + Outline section | ~300-700 |
| **L4** | + Full Content | Full doc |
| **❌** | Exclude entirely | 0 |

### Selection Legend
- `L4` = Include full document
- `L2 select` = Include Description level for selected files only
- `❌` = Exclude from this pack

---

## Staleness Indicators

A document may be stale if:

- [ ] References paths that no longer exist
- [ ] References `/canon/odd/` instead of `/odd/`
- [ ] Uses deprecated terminology (see TRUTH_MAP.md)
- [ ] Has frontmatter with old URIs
- [ ] Mentions epoch E0001 without historical context
- [ ] References single-PRD model without lane context
- [ ] Has broken markdown links
- [ ] Mentions removed CLI commands (attempt:reserve, attempt:reset)

---

## Misclassification Indicators

A document may be in the wrong tier if:

### Should be ODD (currently elsewhere):
- [ ] Describes universal principles applicable to any project
- [ ] Would still be true if klappy.dev didn't exist
- [ ] Contains no repo-specific paths or commands

### Should be Canon (currently elsewhere):
- [ ] Defines rules shared across all product lanes
- [ ] Is referenced by multiple lanes as authoritative
- [ ] Changes would affect all products

### Should be Docs (currently elsewhere):
- [ ] Contains CLI commands specific to this repo
- [ ] References Cloudflare, specific branch names, or lane names
- [ ] Describes how *this* instance implements a concept

---

## Redundancy Indicators

A document may be redundant if:

- [ ] Content is duplicated in `/public/content/` (expected)
- [ ] Content is duplicated in another source file (NOT expected)
- [ ] Two files define the same concept differently (conflict)
- [ ] A file restates another file without adding value

---

## Quick Quality Checks

For each document, verify:

- [ ] **Has frontmatter?** (uri, title, audience, tier, stability, tags)
- [ ] **Has emoji headers?** (consistent with docs style)
- [ ] **Has "See Also" section?** (cross-references to related docs)
- [ ] **References correct tier?** (ODD vs Canon vs Docs)
- [ ] **Uses absolute paths?** (e.g., `/odd/` not `odd/` or `../odd/`)

---

## Audit Tracking Template

Copy this for each document:

```markdown
## [path/to/file.md]

- **Tier:** [ ] ODD  [ ] Canon  [ ] Docs  [ ] Other
- **Has emoji headers:** [ ] Yes  [ ] No  [ ] N/A

### Progressive Disclosure Compliance
| Element | Present | Notes |
|---------|---------|-------|
| Frontmatter | [ ] Yes [ ] No | uri, title, tier, stability, tags |
| H1 Title | [ ] Yes [ ] No | Matches frontmatter? |
| Blockquote subtitle | [ ] Yes [ ] No | One-line summary? |
| Description section | [ ] Yes [ ] No | 1-2 paragraphs? |
| Outline section | [ ] Yes [ ] No | Bullet list of sections? |
| Content section | [ ] Yes [ ] No | Full content below? |

**Compliance Level:** [ ] Full  [ ] Partial  [ ] Minimal  [ ] Missing

### Book Export
- **Current:** [ ] Included  [ ] Excluded
- **Should be:** [ ] Include  [ ] Exclude
- **Change needed:** [ ] Yes → [action]  [ ] No

### Context Packs (with disclosure level)
| Pack | Current | Should | Level |
|------|---------|--------|-------|
| visitor | [ ] In [ ] Out | [ ] In [ ] Out | L__ |
| author | [ ] In [ ] Out | [ ] In [ ] Out | L__ |
| agent-core | [ ] In [ ] Out | [ ] In [ ] Out | L__ |

### If Folder: README Index Check
- [ ] Has README.md
- [ ] README has contents table
- [ ] README has file summaries
- [ ] N/A (not a folder)

### Issues
- [ ] Stale content: [details]
- [ ] Misclassified: [should be X]
- [ ] Redundant: [duplicates Y]
- [ ] Broken refs: [list]
- [ ] Missing progressive disclosure structure
- [ ] Folder missing README index
- [ ] Other: [details]

### Recommendation
[No change | Add disclosure structure | Move to X | Update content | 
 Add to pack Y at L__ | Remove from pack Z | Create folder README | Delete]
```

---

## Folder Audit Template

For each folder with documents:

```markdown
## [path/to/folder/]

- **Has README.md:** [ ] Yes  [ ] No
- **README has contents table:** [ ] Yes  [ ] No  [ ] N/A
- **File count:** [X] files

### Files in Folder
| File | Has Disclosure Structure | Compliance |
|------|-------------------------|------------|
| file1.md | [ ] Full [ ] Partial [ ] Missing | Notes |
| file2.md | [ ] Full [ ] Partial [ ] Missing | Notes |

### Recommendation
[ ] Folder is compliant
[ ] Create README index
[ ] Update README with contents table
[ ] Add disclosure structure to [files]
```



--------------------------------------------------------------------------------
📄 File: infra/prompts/doc-inclusion-audit/PROMPT.md
--------------------------------------------------------------------------------

# 📋 Document Inclusion Audit Prompt

> Evaluate which documents should be included in book exports and context packs.

## Your Task

You are auditing the klappy.dev repository to determine:
1. Which documents should be in the **book export** (`klappy-dev-book-export.md`)
2. Which documents should be in **context packs** (lane-scoped compilations)
3. Which documents are **stale, misclassified, or redundant**
4. Which documents follow the **progressive disclosure structure**
5. Which folders have **README-as-index** patterns

---

## Understanding the Three-Tier Hierarchy

Documents in this repo are organized into three tiers with different purposes:

| Tier | Location | Contains | Decay Rate | Book Export? |
|------|----------|----------|------------|--------------|
| **ODD** | `/odd/` | Universal principles (timeless, product-agnostic) | Almost never | ✅ Yes |
| **Canon** | `/canon/` | Program-level constraints (shared rules) | Carefully | ✅ Yes |
| **Docs** | `/docs/` | Implementation details (how this instance works) | Freely | ✅ Yes |

**The litmus test:**
1. Would this still be true in 10 years? → **ODD**
2. Should all products in this program obey it? → **Canon**
3. Is this about how *we* do it *here*? → **Docs**

---

## Progressive Disclosure Structure

Documents in this repo follow a **progressive disclosure pattern** that enables different compilation depths:

### Document Structure (Top to Bottom)

```markdown
---
uri: klappy://[tier]/[path]
title: "Document Title"
audience: docs
exposure: nav
tier: 1 | 2
voice: neutral
stability: stable | evolving
tags: ["tag1", "tag2"]
---

# Title                              ← H1 title (same as frontmatter)

> One-line subtitle explaining       ← Blockquote subtitle
> what this document is about.

## Description                       ← 1-2 paragraph summary (LLM-friendly)

[Compressed overview of the entire document. Should be self-contained
enough that an LLM can understand the gist without reading further.]

## Outline                           ← Table of contents / what's covered

- Section 1
- Section 2
- Section 3

---

## Content                           ← Full content begins here

[The actual detailed content...]
```

### Disclosure Levels for Packs

| Level | Includes | Use Case | Context Size |
|-------|----------|----------|--------------|
| **L0: Title only** | Frontmatter + H1 | File listing | ~50 tokens |
| **L1: Subtitle** | + blockquote | Quick orientation | ~100 tokens |
| **L2: Description** | + Description section | LLM context | ~200-500 tokens |
| **L3: Outline** | + Outline section | Navigation aid | ~300-700 tokens |
| **L4: Full** | + Content section | Complete context | Full document |

### Pack Compilation by Disclosure Level

| Pack Target | Typical Level | Why |
|-------------|---------------|-----|
| `visitor` | L1-L2 | Minimal orientation, progressive reveal |
| `author` | L3-L4 | Working context, needs detail |
| `agent-core` | L2-L3 | Operational rules, not philosophy |
| `dev-peer` | L4 | Full understanding for contribution |

### README-as-Index Pattern

Every folder SHOULD have a `README.md` that serves as a scannable index:

```
/docs/
  README.md           ← Index with table of contents
  ATTEMPTS.md
  TRUTH_MAP.md
  appendices/
    README.md         ← Index of appendices with summaries
    epochs.md
    product-lanes.md
  decisions/
    README.md         ← Index of decisions with status
    D0001-*.md
```

**Benefits:**
- Agents can read the index (~500 tokens) instead of all files (~20K tokens)
- Packs can include folder READMEs for summaries without full content
- Tree-shaking: know what exists without loading everything

---

## Book Export Criteria

The book export (`klappy-dev-book-export.md`) is a **complete documentation snapshot** for sharing/uploading. It should include guidance docs but exclude implementation artifacts.

### Currently INCLUDED in book export:

| Path Pattern | Reason |
|--------------|--------|
| `/odd/**/*.md` | Universal principles |
| `/canon/**/*.md` | Program constraints |
| `/docs/**/*.md` | Implementation docs |
| `/about/**/*.md` | Author context |
| `/projects/**/*.md` | Project descriptions |
| `/interfaces/**/*.md` | Contracts |
| `/visual/**/*.md` | Visual system docs |
| `/infra/**/*.md` | Infrastructure docs |
| `/*.md` (root) | Top-level docs |

### Currently EXCLUDED from book export:

| Path Pattern | Reason |
|--------------|--------|
| `/public/content/**` | Copies of source files (duplicates) |
| `/.cursor/plans/**` | Ephemeral plan files |
| `/**/attempts/**` | Implementation work, not guidance |
| `/**/src/**` | Source code, not documentation |
| `/products/*/v*/**` | Version-specific implementations |
| `/node_modules/**` | Dependencies |
| `/.git/**` | Version control |
| `/dist/**`, `/build/**` | Build artifacts |

### Evaluation Questions for Book Export:

For each document, ask:

1. **Is it guidance or implementation?**
   - Guidance (philosophy, process, contracts) → INCLUDE
   - Implementation (code, attempt artifacts, build output) → EXCLUDE

2. **Is it a duplicate?**
   - `/public/content/` mirrors source files → EXCLUDE (duplicates)
   - Generated packs in `/_compiled/` → EVALUATE (may include if useful)

3. **Is it ephemeral?**
   - Plan files, temporary notes → EXCLUDE
   - Sealed attempt records → INCLUDE (historical evidence)

4. **Is it too granular?**
   - Individual attempt evidence (screenshots) → EXCLUDE
   - Attempt summaries (ATTEMPT.md, EVIDENCE.md) → EVALUATE

---

## Context Pack Criteria

Context packs are **lane-scoped, target-specific compilations** for constrained context windows.

### Existing Packs:

| Lane | Pack | Target Audience | Purpose |
|------|------|-----------------|---------|
| `website` | `visitor` | First-time visitors | Minimal orientation, progressive disclosure |
| `website` | `author` | Repo owner | High-signal working context |
| `agent-skill` | `prd-guide` | Agent developers | PRD + process guidance |

### Pack Inclusion Criteria:

| Target | Include | Exclude | Disclosure Level |
|--------|---------|---------|------------------|
| **visitor** | ODD manifesto, Canon README, PRD summary, "What is this?" | Implementation details, CLI commands, internal decisions | L1-L2 (titles + descriptions) |
| **author** | Canon core, PRD, epochs, lanes, compilation | Attempt artifacts, version-specific implementations | L3-L4 (outlines + full content) |
| **agent-core** (future) | Constraints, decision rules, process docs, kickoff | Philosophy, history, exploratory appendices | L2-L3 (descriptions + outlines) |
| **dev-peer** (future) | Full canon, decisions, architecture | Internal process details | L4 (full content) |

### Using Progressive Disclosure for Pack Compilation

Instead of including or excluding entire documents, packs can include documents at different **disclosure levels**:

```json
{
  "lane": "website",
  "pack": "visitor",
  "sources": [
    { "file": "odd/manifesto.md", "level": "L2" },
    { "file": "canon/README.md", "level": "L2" },
    { "file": "docs/README.md", "level": "L1" },
    { "file": "docs/PRD/website/PRD.md", "level": "L2" }
  ]
}
```

**Benefits:**
- Smaller context size for constrained windows
- Progressive reveal: start with L1, expand to L4 as needed
- Consistent structure enables automated extraction

### Evaluation Questions for Packs:

For each document, ask:

1. **Which targets need this?**
   - Everyone (core) → Include in all packs
   - Specific role → Include in targeted pack only
   - No one → Exclude from all packs

2. **What's the signal-to-noise ratio?**
   - High signal, low noise → INCLUDE
   - Low signal, high noise → EXCLUDE or SUMMARIZE

3. **Is it stable enough?**
   - Stable (rarely changes) → INCLUDE
   - Volatile (changes often) → EXCLUDE from long-lived packs

4. **Does it fit the context budget?**
   - Essential for correct behavior → INCLUDE
   - Nice-to-have → EXCLUDE if over budget

---

## Audit Output Format

For each document evaluated, produce:

```markdown
### [File Path]

**Tier:** ODD | Canon | Docs | Other
**Current Status:** In book export? In which packs?

**Progressive Disclosure Structure:**
- [ ] Has frontmatter (uri, title, tier, stability, tags)
- [ ] Has H1 title matching frontmatter
- [ ] Has blockquote subtitle
- [ ] Has Description section
- [ ] Has Outline section
- [ ] Has Content section
- **Compliance:** Full | Partial | Missing

**Book Export:**
- [ ] INCLUDE | EXCLUDE
- Reason: [why]

**Context Packs:**
- [ ] visitor (L1-L2): INCLUDE | EXCLUDE — [reason]
- [ ] author (L3-L4): INCLUDE | EXCLUDE — [reason]
- [ ] agent-core (L2-L3): INCLUDE | EXCLUDE — [reason]

**If folder, has README-as-index?**
- [ ] Yes, with contents table
- [ ] Yes, but missing contents table
- [ ] No README.md

**Issues Found:**
- [ ] Stale content (last updated: [date], references outdated: [what])
- [ ] Misclassified (should be in [tier] instead of [tier])
- [ ] Redundant (duplicates [other file])
- [ ] Missing from manifest
- [ ] Broken references
- [ ] Missing progressive disclosure structure
- [ ] Folder missing README index

**Recommended Action:**
- [ ] No change
- [ ] Move to [new location]
- [ ] Update content
- [ ] Add progressive disclosure structure
- [ ] Add to pack: [pack name] at level [L1-L4]
- [ ] Remove from pack: [pack name]
- [ ] Create README index for folder
- [ ] Delete (with reason)
```

---

## Running the Audit

### Step 1: Collect All Documents

```bash
# List all markdown files in the repo
find . -name "*.md" -type f | grep -v node_modules | grep -v .git | sort
```

### Step 2: Check Current Book Export Inclusion

Review `/infra/scripts/export-book.js` for:
- `EXCLUDE_DIRS` — directories to skip
- `EXCLUDE_PATHS` — specific paths to skip
- `EXCLUDE_LANE_PATTERNS` — pattern-based exclusions
- `EXCLUDE_FILES` — specific files to skip

### Step 3: Check Current Pack Inclusion

Review `/infra/compile/plans/` for existing compile plans:
- What sources are included?
- What's missing?
- What's redundant?

### Step 4: Evaluate Each Document

Use the evaluation questions above to assess each document.

### Step 5: Produce Recommendations

Group recommendations by:
1. **Book export changes** (add/remove files from export)
2. **Pack changes** (add/remove files from compile plans)
3. **Tier corrections** (move files between ODD/Canon/Docs)
4. **Content fixes** (update stale content, fix references)
5. **Deletions** (remove obsolete files)

---

## Key Files to Read Before Auditing

| File | Why |
|------|-----|
| `/odd/decisions/D0001-three-tier-conceptual-hierarchy.md` | Tier definitions |
| `/docs/TRUTH_MAP.md` | Authoritative sources |
| `/docs/appendices/compilation-targets.md` | Pack target definitions |
| `/docs/appendices/canonical-compression.md` | Compression philosophy |
| `/docs/appendices/compilation.md` | Compilation process |
| `/infra/scripts/export-book.js` | Current book export logic |
| `/infra/compile/plans/**/*.json` | Current pack definitions |
| `/docs/appendices/epochs.md` | Example of full progressive disclosure structure |
| `/docs/appendices/README.md` | Example of README-as-index pattern |

---

## Success Criteria

The audit is complete when:

1. Every markdown file has been evaluated
2. Book export includes all guidance, excludes all implementation
3. Each pack serves its target audience with minimal noise
4. No stale content remains unaddressed
5. No misclassified documents remain in wrong tiers
6. All broken references have been flagged
7. **Progressive disclosure compliance assessed** for all documents
8. **README-as-index pattern verified** for all folders
9. **Disclosure levels assigned** for each pack inclusion

---

## Notes

- This audit is about **what to include**, not **how to compile**
- Packs are regenerated frequently; the audit focuses on the compile plans
- The book export is a snapshot; staleness is acceptable if flagged
- Prefer fewer, higher-quality inclusions over comprehensive coverage



--------------------------------------------------------------------------------
📄 File: infra/prompts/doc-inclusion-audit/README.md
--------------------------------------------------------------------------------

# 🔍 Document Inclusion Audit

Prompt and checklist for evaluating which documents should be included in:
- **Book export** (`klappy-dev-book-export.md`)
- **Context packs** (lane-scoped compilations)

## Files

| File | Purpose |
|------|---------|
| `PROMPT.md` | Complete audit prompt with context, criteria, and output format |
| `CHECKLIST.md` | Quick reference decision trees and tracking templates |

## When to Use

Run this audit when:
- Major documentation restructuring (like the three-tier hierarchy change)
- Adding new lanes or packs
- Suspecting content drift or staleness
- Reviewing book export size or quality

## How to Use

1. **Read the prompt** (`PROMPT.md`) to understand criteria
2. **Use the checklist** (`CHECKLIST.md`) for quick decisions
3. **Track findings** using the templates provided
4. **Produce recommendations** grouped by action type

## Quick Start

```bash
# List all markdown files to audit
find . -name "*.md" -type f | grep -v node_modules | grep -v .git | sort | wc -l

# Check current book export size
wc -l klappy-dev-book-export.md

# Review compile plans
cat infra/compile/plans/website/visitor.json
cat infra/compile/plans/website/author.json
```

## Related Documents

- [Compilation Targets](/docs/appendices/compilation-targets.md) — Pack definitions
- [Canonical Compression](/docs/appendices/canonical-compression.md) — Compression philosophy
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md) — Tier definitions
- [Truth Map](/docs/TRUTH_MAP.md) — Authoritative sources



================================================================================
## Products
================================================================================



--------------------------------------------------------------------------------
📄 File: products/agent-skill/ATTEMPT_KICKOFF.md
--------------------------------------------------------------------------------

# Agent Skill — Start Attempt

## Step 1: Load ODD Canon

Read and internalize: `public/agent-skill/latest/prd-guide-pack.md`

---

## Step 2: Follow Kickoff

Read and follow: `products/agent-skill/KICKOFF.md`



--------------------------------------------------------------------------------
📄 File: products/agent-skill/CONTRACT.md
--------------------------------------------------------------------------------

# Agent Skill Lane Contract

Formal documentation of structure, behavior, and deviations from canon for the agent-skill lane.

---

## Structure Deviation

This lane uses **version-first** folder organization instead of canon default.

### Canon Default

```
products/<lane>/
├── PRD.md
├── src/
├── dist/
└── attempts/
    └── prd-vX.Y/
        └── attempt-NNN/
```

### This Lane

```
products/agent-skill/
├── README.md
├── CONTRACT.md
├── ATTEMPT_KICKOFF.md  # One-liner → active version's KICKOFF
├── vX.Y/
│   ├── KICKOFF.md      # Detailed attempt instructions for this version
│   ├── PRD.md          # Frozen PRD for this version
│   ├── src/            # Source files for this version
│   ├── dist/           # Compiled output for this version
│   └── attempts/       # Attempts against this version's PRD
│       └── attempt-NNN/
```

### Rationale

1. **Immutable releases**: Published assets are versioned by PRD version and persist indefinitely
2. **Dependent stability**: Consumers can pin to specific versions (e.g., `v1.1/dist/prd-guide-pack.md`)
3. **Clear boundaries**: Each version is fully self-contained
4. **Parallel development**: Multiple versions can evolve independently

---

## Publishing Rules

1. Each version's `dist/` folder contains the compiled output
2. Each `dist/` folder has a `README.md` explaining what's inside and how to use it
3. Versions are **immutable** once published — bug fixes require new versions
4. Meta files (`_meta/`) provide provenance for compiled artifacts

---

## Kickoff Pattern

1. `ATTEMPT_KICKOFF.md` at lane root is a minimal one-liner pointing to active version
2. Each version has its own `KICKOFF.md` with detailed shaping instructions
3. Version KICKOFF is frozen when version is frozen (for auditability)
4. New versions get new KICKOFF.md that can evolve independently

---

## Deployment

This lane owns its own Cloudflare Pages deployment (not shared with website lane).

- **Project**: `klappy-dev-agent-skill`
- **Production domain**: `https://agent-skill.klappy.dev/`
- **Production URL pattern**: `https://agent-skill.klappy.dev/vX.Y/<asset>`
- **Main branch preview**: `https://main.klappy-dev-agent-skill.pages.dev/`
- **Branch preview pattern**: `https://<deployment-id>.klappy-dev-agent-skill.pages.dev/`
- **Isolation**: Full lane ownership, no cross-lane dependencies

### Finding Preview URLs

During PR review, get the deployment ID from `gh pr checks`:
```
Cloudflare Pages: klappy-dev-agent-skill  pass  https://dash.cloudflare.com/.../<deployment-id>
```
Then construct: `https://<first-8-chars>.klappy-dev-agent-skill.pages.dev/`

---

## Constraints

In addition to canon constraints, this lane observes:

1. **Lane isolation during attempts**: Test execution stays within attempt folder
2. **No cross-lane modification**: PRDs cannot require modifying other lanes
3. **Version immutability**: Once a version is published, it cannot be changed
4. **INSTRUCTIONS.md is ephemeral**: Generated per-attempt in the attempt folder, never persisted in `src/` or version folders
5. **Verify before CHAMPION**: No attempt may be marked CHAMPION until HTTP 200 verified on deployed preview URL
6. **Complete latest update**: Promotion must update both `latest/prd-guide-pack.md` AND `latest/README.md` to reflect new champion version

---

## Learnings That Shaped This Contract

### v1.1 (2026-01-20)

- Lane isolation matters: all artifacts should live in `products/<lane>/`
- Compiled pack is like compiled code — source in `src/`, output in `dist/`

### v1.2 (2026-01-20) — Failed

- PRDs can have design flaws that violate constraints
- Test execution must stay contained — even "tests" can't write outside the attempt folder
- A lane cannot require modification of another lane's build process

### v1.2.1 Planning (2026-01-20)

- Version-first structure enables immutable releases
- Each version needs its own README for consumer guidance
- Antifragile documentation (README) beats brittle manifests (JSON)

### v1.2.2 (2026-01-21) — Failed

- INSTRUCTIONS.md was being persisted when it should be ephemeral
- Compile plans lived in central `infra/` instead of lane
- ODD formula violated: agents should only need Pack + CONTRACT + PRD
- Don't steer a miss — when fundamentals are wrong, fail and restart clean

### v1.2.3 (2026-01-21) — Champion

- INSTRUCTIONS.md generated per-attempt in attempt folder (ephemeral)
- Verify deployment HTTP 200 BEFORE claiming CHAMPION
- Cloudflare preview URLs use deployment ID from PR checks
- Clean restart after v1.2.2 failure (didn't steer a miss)
- Promotion must update `latest/README.md` — pack file copy alone leaves stale version reference

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

This lane is allowed to have no UI and is not required to satisfy build-output unless it produces a deployable artifact.

---

## Lane Decisions

Lane-specific architecture decisions are documented in [decisions/](decisions/index.md).

These decisions may override canon defaults with documented rationale. Successful patterns may be proposed for elevation to canon.



--------------------------------------------------------------------------------
📄 File: products/agent-skill/KICKOFF.md
--------------------------------------------------------------------------------

# Agent-Skill — Attempt Kickoff

You are starting an attempt in the **agent-skill** lane.

---

## Step 1: Find Active Version

Check `README.md` — the Versions table shows which version is **Active**.

Note the active version (e.g., `v1.2.2`). This is your target.

---

## Step 2: Read Context

Read these files in order:

1. `README.md` — Lane overview, version table, current champion
2. `CONTRACT.md` — Structure deviations from canon
3. `history/index.md` — Champion history and learnings
4. `<active-version>/PRD.md` — The PRD you're executing

The PRD defines your task, deliverables, and definition of done.

---

## Step 3: Review Prior Art

Check the history folder and previous attempt folders for learnings:

- `history/` — What worked, what didn't
- Previous version attempts — Evidence and learnings

---

## Step 4: Create Attempt Folder

Create: `<active-version>/attempts/attempt-NNN/`

Where NNN is the next number (check existing folders).

Required files:

- `ATTEMPT.md` — Closure record
- `META.json` — Machine-readable metadata
- `evidence/` — Verification artifacts

---

## Step 5: Execute

Follow the PRD's Definition of Done exactly.

- Produce evidence for every claim
- No assertions without proof
- Document tradeoffs

---

## Critical Rules

1. **Lane Isolation**: Do NOT modify files outside `products/agent-skill/`
2. **Version Isolation**: Work within `<active-version>/` folder
3. **Attempt Containment**: All changes go in attempt folder until promotion
4. **Evidence Required**: No assertions without proof
5. **PRD Immutability**: If PRD has a problem, create a NEW version — don't bend rules

---

## When Complete

Update `ATTEMPT.md` with:

- Status: CHAMPION, CLOSED, or ABANDONED
- Outcome summary
- Evidence produced
- Self-audit results
- Learnings

If championed, add entry to `history/` folder.

---

## If PRD Seems Problematic

Don't bend rules to make it work.

1. Document the issue in `LEARNINGS.md`
2. Mark attempt as FAILED with clear explanation
3. Propose a new PRD version to address the issue



--------------------------------------------------------------------------------
📄 File: products/agent-skill/PRD.md
--------------------------------------------------------------------------------

# PRD: ODD Agent Skill — PRD Elicitation Enhancement

| Field             | Value       |
| ----------------- | ----------- |
| **PRD Version**   | v1.3        |
| **Lane**          | agent-skill |
| **Status**        | Active      |
| **Created**       | 2026-01-21  |
| **Author**        | Chris Klapp |
| **Canon Version** | 0.8.0       |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Objective

Transform the prd-guide pack from an informational resource (teaches ODD) into an interrogative system (extracts PRDs from humans) by adding stage typing, asset intake, and a formal elicitation loop.

---

## Background

**v1.2.4 delivered**: Canon refresh to v0.8.0 with Cognitive Partitioning and Tool Specialization.

**Problem identified**: External review found the pack "conceptually sound but operationally incomplete":

| Strength | Gap |
|----------|-----|
| Canonical alignment unusually strong | No structured elicitation loop |
| Compilation philosophy correct | No stage-aware questioning |
| Agent authority properly scoped | No asset-gathering protocols |
| Treats PRDs as evolving intent | No explicit interview modes |

The pack teaches agents how ODD works, but does not fully teach agents how to elicit a PRD from a human.

**v1.2.x INSTRUCTIONS.md** has 7 stages, but:

- Jumps straight to "What outcome are you trying to achieve?"
- No classification of PRD type (PoC vs Feature vs Fix)
- No inventory of existing assets
- No explicit agent role declaration
- No ambiguity capture stage

**v1.3 addresses this** by adding:

- Agent Role Declaration (elicitation system, not author)
- PRD Stage Typing gate before questioning
- Resequenced Interview Loop with Inventory and Ambiguity Capture
- Asset Intake Contract with guidance for partial information

---

## In Scope (v1.3)

### From v1.2.4 (retained)

- Lane-owned Cloudflare Pages deployment
- Versioned asset URLs
- Canon sources at v0.8.0
- INSTRUCTIONS.md as ephemeral artifact
- Compile plan in lane (`src/compile-plan.json`)

### New in v1.3

#### 1. Agent Role Declaration

Add explicit framing at the top of INSTRUCTIONS.md:

```markdown
## Agent Role

You are not a PRD author.
You are a PRD elicitation system that helps humans externalize intent, constraints, uncertainty, and evidence.

You extract. You do not invent.
```

#### 2. PRD Stage Typing Gate

Add classification before current Stage 1:

| Stage Type | Evidence Expectations | Ambiguity Tolerance |
|------------|----------------------|---------------------|
| PoC / Exploration | Minimal, learning-focused | High |
| Feature | Required, scope bounded | Medium |
| Fix | Root cause required, regression risk | Low |
| Product slice | End-to-end verification | Medium |
| Refactor / migration | No user-facing change | Low |

Questions:
- "Is this exploring something new, building something known, or fixing something broken?"
- "Will users see a change, or is this internal?"

#### 3. Formal Interview Loop (Resequenced)

| Phase | v1.2.x Stage | v1.3 Phase |
|-------|--------------|------------|
| NEW | - | **0. Stage Identification** — What type of PRD is this? |
| NEW | - | **1. Orient** — What are we trying to learn or change? |
| NEW | - | **2. Inventory** — What assets already exist? |
| Moved | Stage 4 | **3. Constraint Surfacing** — Time, scope, reversibility, risk |
| Moved | Stage 1 | **4. Outcome Framing** — What would "better" look like? |
| Moved | Stage 2 | **5. Evidence Definition** — How will we know? |
| NEW | - | **6. Ambiguity Capture** — What is still unclear or contested? |
| Same | Stages 3,5,6,7 | **7. Draft Assembly** — Non-goals, risks, final PRD |

Key changes:
- Inventory BEFORE outcome (you can't define what you want until you know what you have)
- Explicit ambiguity capture (ODD acknowledges uncertainty)
- Stage identification gates the entire flow

#### 4. Asset Intake Contract

| Type | Examples | When missing |
|------|----------|--------------|
| Text | docs, notes, prior PRDs | Proceed with "no prior docs" flag |
| Media | screenshots, recordings, mockups | Proceed if non-UI; require for UI work |
| Links | repos, tickets, deployed systems | Note as "greenfield" if no links |
| Oral testimony | interview answers | This is the PRD session itself |

Guidance:
- "What documentation already exists for this?"
- "Do you have any screenshots, mockups, or recordings?"
- "Is there a repo, ticket, or deployed system I should know about?"
- Proceed with what's available; don't block on missing assets

---

## Explicitly Out of Scope (v1.3)

- Changes to distribution architecture (Cloudflare Pages setup unchanged)
- Multi-pack compilation (that's v1.4)
- Tiered content inclusion (that's v1.4)
- Role-specific packs (that's v1.5+)
- Renaming the pack (keep "prd-guide" for now)

---

## Success Criteria

- [ ] INSTRUCTIONS.md includes Agent Role Declaration section
- [ ] INSTRUCTIONS.md includes Stage Identification gate (Phase 0)
- [ ] INSTRUCTIONS.md includes Inventory phase (Phase 2)
- [ ] INSTRUCTIONS.md includes Ambiguity Capture phase (Phase 6)
- [ ] INSTRUCTIONS.md includes Asset Intake guidance
- [ ] Interview loop resequenced per spec
- [ ] Stage Typing table included with evidence expectations
- [ ] Pack available at versioned URL (`/v1.3/prd-guide-pack.md`)
- [ ] `/latest/` updated to serve v1.3 pack
- [ ] `latest/README.md` updated to reference v1.3

---

## Definition of Done

An attempt against this PRD is complete when:

### INSTRUCTIONS.md Content

- [ ] Agent Role Declaration added at top
- [ ] Stage Identification (Phase 0) defined with PRD type classification
- [ ] Inventory (Phase 2) defined with asset intake questions
- [ ] Ambiguity Capture (Phase 6) defined with uncertainty documentation
- [ ] Interview loop has 8 phases (0-7) in correct order
- [ ] Stage Typing table includes all 5 types with implications

### Compilation

- [ ] Compile succeeds using lane-owned `src/compile-plan.json`
- [ ] Output written to attempt's `evidence/` folder
- [ ] Provenance header shows canon v0.8.0 source hashes
- [ ] INSTRUCTIONS.md generated fresh (not copied from persisted source)

### Distribution

- [ ] `public/agent-skill/v1.3/prd-guide-pack.md` created
- [ ] `public/agent-skill/latest/prd-guide-pack.md` updated
- [ ] `public/agent-skill/latest/README.md` updated (version reference)
- [ ] Public URL verified with HTTP 200

### Verification

- [ ] INSTRUCTIONS.md demonstrably different from v1.2.4
- [ ] Agent using pack asks about PRD type before jumping to outcomes
- [ ] Agent using pack asks about existing assets before defining scope
- [ ] Ambiguity capture section present and functional

### Evidence Required

- [ ] Diff showing new INSTRUCTIONS.md content vs v1.2.4
- [ ] Screenshot or log of successful compile output
- [ ] HTTP 200 verification of preview URL
- [ ] Sample conversation demonstrating elicitation flow
- [ ] Self-audit completed

---

## Pack Sources

The compiled pack concatenates these files:

### Canon Sources (persisted, unchanged from v1.2.4)

| # | Source | Purpose |
|---|--------|---------|
| 1 | `canon/README.md` | Canon orientation, meta rules, confidence scores |
| 2 | `odd/README.md` | ODD folder index, core thesis |
| 3 | `odd/manifesto.md` | Full ODD philosophy |
| 4 | `odd/cognitive-partitioning.md` | Scaling pattern for reasoning systems |
| 5 | `odd/appendices/README.md` | Portable appendices summarized |
| 6 | `odd/decisions/README.md` | ODD conceptual decisions |
| 7 | `canon/odd/appendices/tool-specialization.md` | Tool isolation pattern |
| 8 | `canon/constraints.md` | Baseline assumptions |
| 9 | `canon/decision-rules.md` | Decision heuristics |
| 10 | `canon/definition-of-done.md` | Completion criteria |
| 11 | `canon/self-audit.md` | Review checklist |
| 12 | `docs/PRD/PRD_TEMPLATE.md` | PRD structure |

### Generated Sources (ephemeral)

| # | Source | Purpose |
|---|--------|---------|
| 13 | `INSTRUCTIONS.md` | **UPDATED** Interactive elicitation guidance |

**Note:** INSTRUCTIONS.md is the primary deliverable of this PRD. It must include all elicitation enhancements.

---

## Constraints

- **Elicitation focus**: Primary goal is improving the interview mechanics
- **Same distribution**: Uses existing Cloudflare Pages setup
- **Same canon sources**: v0.8.0 sources unchanged
- **ODD formula**: Pack + CONTRACT + PRD = Attempt (nothing else)
- **Ephemeral artifacts**: Generated code (INSTRUCTIONS.md) not persisted
- **Lane isolation**: All changes stay within agent-skill lane
- **Backward compatible**: Existing PRD guidance still works (enhanced, not replaced)

---

## Risks

| Risk | Mitigation |
|------|------------|
| Elicitation loop changes may require iteration | v1.3 can have patch versions (v1.3.1, v1.3.2) |
| Stage typing may not cover all cases | Include "Other" type with fallback to generic flow |
| Interview loop may feel too long | Can be streamlined in v1.3.x based on feedback |
| Asset intake may block users who have nothing | Explicit guidance to proceed with partial information |

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.3/attempts/attempt-NNN/`

---

## Related Documents

- v1.2.4 Champion: [H0007](./history/H0007-v1.2.4-champion.md)
- v1.2.4 Attempt: `v1.2.4/attempts/attempt-001/`
- Roadmap: [ROADMAP.md](./ROADMAP.md)
- External Review: Feedback that identified elicitation gap (provided by user)



--------------------------------------------------------------------------------
📄 File: products/agent-skill/README.md
--------------------------------------------------------------------------------

# Agent Skill Lane

This lane produces compiled packs for AI agent consumption. The primary deliverable is a portable context artifact that enables any LLM to guide humans through ODD-aligned PRD creation.

## Current Champion

**v1.3** — PRD Elicitation Enhancement (interview mechanics, stage typing)

**Public URL**: `https://main.klappy-dev-agent-skill.pages.dev/latest/prd-guide-pack.md`

## Quick Start

**Option 1: Public URL (no clone required)**
```
https://main.klappy-dev-agent-skill.pages.dev/latest/prd-guide-pack.md
```

**Option 2: Local file**
Copy the pack from `public/agent-skill/latest/prd-guide-pack.md` and paste it into your AI context.

See the [usage README](https://main.klappy-dev-agent-skill.pages.dev/latest/README.md) for detailed instructions.

## Lane Files

| File | Purpose |
|------|---------|
| [ATTEMPT_KICKOFF.md](ATTEMPT_KICKOFF.md) | Copy/paste prompt to start an attempt |
| [KICKOFF.md](KICKOFF.md) | Full attempt instructions (version-agnostic) |
| [CONTRACT.md](CONTRACT.md) | Formal structure, deviations from canon |
| [ROADMAP.md](ROADMAP.md) | Vision and future versions |
| [history/](history/) | Champion history, failures, learnings |
| [decisions/](decisions/README.md) | Lane-specific architecture decisions |

## Versions

| Version | Status | Description |
|---------|--------|-------------|
| [v1.1/](v1.1/) | Champion | Core PRD guide pack |
| [v1.2/](v1.2/) | Failed | Distribution attempt (PRD conflict) |
| [v1.2.1/](v1.2.1/) | Champion | Lane-owned Cloudflare Pages deployment |
| [v1.2.2/](v1.2.2/) | Failed | Exposed ODD violations (ephemeral artifacts, compile plan location) |
| [v1.2.3/](v1.2.3/) | Champion | Canon refresh v0.5.4 + ODD compliance |
| [v1.2.4/](v1.2.4/) | Superseded | Canon refresh v0.8.0 (path fixes + new content) |
| [v1.3/](v1.3/) | **Champion** | PRD Elicitation Enhancement (interview mechanics, stage typing) |

## Structure

This lane uses a **version-first** folder structure (differs from canon default). See [CONTRACT.md](CONTRACT.md) for details.

```
products/agent-skill/
├── README.md              # You are here
├── ATTEMPT_KICKOFF.md     # Copy/paste prompt (loads canon, points to KICKOFF)
├── KICKOFF.md             # Full attempt instructions (version-agnostic)
├── CONTRACT.md            # Formal structure/deviations
├── ROADMAP.md             # Vision document
├── history/               # Champion log, failures, learnings
├── decisions/             # Lane-specific ADRs
├── v1.1/                  # Version 1.1 (champion)
│   ├── PRD.md             # Frozen PRD
│   ├── src/               # Source files
│   ├── dist/              # Compiled output
│   └── attempts/          # Attempt history
├── v1.2/                  # Version 1.2 (failed)
│   ├── PRD.md             # Frozen PRD
│   └── attempts/          # Failed attempt evidence
├── v1.2.1/                # Version 1.2.1 (champion)
│   └── PRD.md             # Frozen PRD
├── v1.2.2/                # Version 1.2.2 (failed)
│   └── PRD.md             # Canon refresh PRD (failed)
├── v1.2.3/                # Version 1.2.3 (champion)
│   └── PRD.md             # Canon refresh v0.5.4 + ODD compliance
├── v1.2.4/                # Version 1.2.4 (champion)
│   └── PRD.md             # Canon refresh v0.8.0 (path fixes)
└── v1.3/                  # Version 1.3 (active)
    └── PRD.md             # PRD Elicitation Enhancement
```

## Build

To compile a pack for a specific version:

```bash
# From repo root
npm run lane:compile -- --lane agent-skill --pack prd-guide
```

Note: Build configuration lives in each version's `src/compile-plan.json`.



--------------------------------------------------------------------------------
📄 File: products/agent-skill/ROADMAP.md
--------------------------------------------------------------------------------

# Agent Skill Lane Roadmap

Living document capturing the evolution vision for the agent-skill lane.

This is not a commitment — it's a sketch that evolves as we learn.

> **Note:** This roadmap tracks *vision*, not *status*. For what actually happened (champions, failures, learnings), see **[history/](./history/)**.

---

## Versioning Strategy

- **v1.1** = Initial pack (PRD guidance)
- **v1.2.x** = Distribution + patches (deployment, canon refreshes)
- **v1.3** = PRD Elicitation Enhancement (interview mechanics, stage typing)
- **v1.4** = Pack Architecture v2 (multi-pack, tiered compilation)
- **v1.5+** = Role-specific packs (Attempt Agent, Verification Agent)
- **v2.x** = Presentation layer (UI/showcase)

Minor versions add features; patch versions fix issues or refresh content.

---

## v1.1 — PRD Creation Guidance

**Location**: `v1.1/`

A compiled pack (`prd-guide-pack.md`) that enables AI agents to interactively guide humans through creating ODD-aligned PRDs.

**Target outcome**: Pack available locally after build

**Friction level**: Clone repo, run build, copy pack

---

## v1.2 — Distribution (Website Lane)

**Location**: `v1.2/`

Zero-friction public access via website lane's Cloudflare Pages deployment.

**Target outcome**: Pack available at public URL via website deployment

**Friction level**: Copy from URL

**Why it didn't work**: PRD required cross-lane modification (website build process), which violates lane isolation. See [history/H0002](./history/H0002-v1.2-failed.md) for details.

---

## v1.2.1 — Distribution (Lane-Owned)

**Location**: `v1.2.1/`

Patches v1.2 with a lane-owned approach:

- Agent-skill lane owns its own Cloudflare Pages deployment
- Versioned asset URLs (e.g., `/v1.1/prd-guide-pack.md`)
- `/latest/` convention pointing to current champion
- No website lane dependency

**Target outcome**: Pack available at `https://agent-skill.klappy.dev/latest/prd-guide-pack.md`

**Friction level**: Copy from URL

---

## v1.2.2 — Canon Content Refresh

**Location**: `v1.2.2/`

Patches v1.2.1 with updated canon content (v0.5.3):

- Recompile pack against canon v0.5.3
- Includes Memory Architecture proposal (manifesto references)
- No functional changes to pack behavior or distribution
- Documents canon version for traceability

**Target outcome**: Pack reflects canon v0.5.3 content

**Friction level**: Same as v1.2.1 (copy from URL)

**Why it didn't work**: INSTRUCTIONS.md was being persisted when it should be ephemeral, and compile plans lived in central `infra/` instead of lane. ODD formula violated. See [history/H0005](./history/H0005-v1.2.2-failed.md) for details.

---

## v1.2.3 — Canon Refresh + ODD Compliance

**Location**: `v1.2.3/`

Patches v1.2.2 with ODD compliance + canon v0.5.4:

- INSTRUCTIONS.md treated as ephemeral (generated per-attempt)
- Compile plan lives in lane (`src/compile-plan.json`)
- Pack includes folder READMEs for scannable summaries
- Clean restart with corrected architecture

**Target outcome**: Pack reflects canon v0.5.4 with proper ODD compliance

**Friction level**: Same as v1.2.1 (copy from URL)

---

## v1.2.4 — Canon Refresh v0.8.0

**Location**: `v1.2.4/`

Patches v1.2.3 with canon v0.8.0:

- Fixes stale ODD paths (`canon/odd/` → `odd/`) from 0.6.0 elevation
- Includes Three-Tier Hierarchy formalization
- Adds Cognitive Partitioning concept
- Adds Tool Specialization appendix

**Target outcome**: Pack reflects canon v0.8.0 with correct paths

**Friction level**: Same as v1.2.1 (copy from URL)

---

## v1.3 — PRD Elicitation Enhancement

**Location**: `v1.3/`

Addresses the gap between "understanding ODD" and "extracting a PRD from a human." The pack teaches ODD philosophy well, but v1.2.x lacked the interrogative mechanics to guide elicitation.

**Key features**:

- **Agent Role Declaration**: Explicit framing that the agent is an elicitation system, not a PRD author
- **PRD Stage Typing**: Classification gate before questioning (PoC, Feature, Fix, Product slice, Refactor)
- **Formal Interview Loop**: Resequenced stages with Orient, Inventory, Constraint Surfacing before Outcome Framing
- **Asset Intake Contract**: Formalized guidance for what assets to request and how to proceed with partial information
- **Ambiguity Capture**: Explicit stage for documenting what remains unclear or contested

**Interview Loop (resequenced)**:

| Phase | Purpose |
|-------|---------|
| 0. Stage Identification | What type of PRD is this? |
| 1. Orient | What are we trying to learn or change? |
| 2. Inventory | What assets already exist? |
| 3. Constraint Surfacing | Time, scope, reversibility, risk |
| 4. Outcome Framing | What would "better" look like? |
| 5. Evidence Definition | How will we know? |
| 6. Ambiguity Capture | What is still unclear or contested? |
| 7. Draft Assembly | Assemble the PRD |

**Target outcome**: Agents using the pack ask about PRD type and existing assets before jumping to outcomes

**Friction level**: Same as v1.2.x (copy from URL)

**Why this matters**: The pack was conceptually sound but operationally incomplete. This version makes it interrogative, not just informational.

---

## v1.4 — Pack Architecture v2

Major architectural upgrade enabling role-specific agent packs with tiered content inclusion.

**Key features**:

- **Multi-pack support**: Single compile plan produces multiple role-specific packs
- **Tiered compilation**: 
  - Tier 1 (Core): Full file content
  - Tier 2 (Context): Title, subtitle, description, outline only
  - Tier 3 (Index): Title + subtitle (skip if already in README index)
- **Role-specific instructions**: Each pack gets tailored guidance
- **Progressive disclosure**: Agents get what they need without token bloat

**Compile plan schema v2**:

```json
{
  "packs": {
    "prd-guide": {
      "tier1_full": [...],
      "tier2_summary": [...],
      "tier3_index": [...],
      "instructions": "instructions/PRD_AGENT.md"
    }
  }
}
```

**Target outcome**: Architecture supports multiple specialized packs; PRD Agent Pack recompiled using tiered approach

**Why this matters**: Cognitive Partitioning applied to agent context — each agent role gets precisely the context it needs

---

## v1.5 — Attempt Agent Pack

Role-specific pack for agents executing attempts against PRDs.

**Tier 1 (Full)**:

- Attempt lifecycle
- Lane isolation rules
- META.json requirements
- Definition of done

**Tier 2 (Summary)**:

- Progressive elevation (memory architecture)
- Online evidence requirements
- Deploy evidence rules

**Tier 3 (Index)**:

- ODD decisions (already in README index)
- History patterns

**Instructions focus**: Execute attempts, produce evidence, know when to stop

**Target outcome**: `attempt-guide-pack.md` available at public URL

---

## v1.6 — Verification Agent Pack

Role-specific pack for agents evaluating and verifying work.

**Tier 1 (Full)**:

- Definition of done
- Self-audit checklist
- Visual proof standards
- Evidence policy

**Tier 2 (Summary)**:

- Failure detection patterns
- LEARNINGS.md structure
- PRD conflict detection

**Tier 3 (Index)**:

- ODD appendices (failure-driven modularity, etc.)

**Instructions focus**: Verify claims, detect failures, enforce evidence standards

**Target outcome**: `verification-guide-pack.md` available at public URL

---

## v2.0 — Showcase Page

A webpage that showcases the pack with good UX for discovery and use.

**Potential features**:

- Syntax-highlighted pack preview
- Collapsible sections (manifesto, constraints, instructions, etc.)
- "Copy to clipboard" button
- Token count display
- Last updated / provenance info
- Link to source (for transparency)

**Target outcome**: Visitors can discover, preview, and copy the pack from a nice UI

**Friction level**: Click to copy

---

## Future Ideas (Unprioritized)

Captured here so we don't forget, not committed to any version:

- **MCP server**: Expose packs via Model Context Protocol
- **Cursor SKILL.md format**: Package packs as Cursor skills
- **Pack versioning**: Semantic versions for packs, backward compatibility
- **Analytics**: Track pack usage (if hosted)
- **Feedback loop**: Users can report issues with pack guidance
- **Self-improvement guidance**: Pack that helps agents improve packs themselves
- **Dynamic tier selection**: Agents request tier depth based on task complexity
- **Cross-pack references**: Packs can reference other packs for handoff workflows

---

## Removed from This Lane

- **Try-It Chat Interface**: Moved to `ai-navigation` lane (AI helping humans navigate ODD). This lane produces the pack; ai-navigation consumes it for chat experiences.

---

## How to Use This Document

1. **Before starting a version**: Read the vision here, refine it, then write the PRD
2. **After completing a version**: Add entry to [history/](./history/) (not here)
3. **When ideas emerge**: Add to "Future Ideas" section above
4. **Periodically**: Review and prune ideas that no longer make sense

This roadmap informs PRDs but does not replace them. PRDs are the contract; this is the vision.



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0001-version-first-structure.md
--------------------------------------------------------------------------------

# D0001 — Version-First Folder Structure

## Decision

This lane uses version-first folder organization (`vX.Y/src/`, `vX.Y/dist/`, `vX.Y/attempts/`) instead of the canon default (`src/`, `dist/`, `attempts/prd-vX.Y/`).

## Status

**Active**

## Context

PRD v1.2 failed because it required cross-lane modification. During the post-mortem, we discovered that:

1. Dependents need stable URLs to pin to specific versions
2. Assets must be immutable once published
3. Each version should be fully self-contained for auditability

The canon default structure makes versioning implicit (buried in attempts folder). This lane needs explicit versioning at the top level.

## Why

- **Immutable releases**: Published assets are versioned by PRD version and persist indefinitely
- **Dependent stability**: Consumers can pin to specific versions (e.g., `v1.1/dist/prd-guide-pack.md`)
- **Clear boundaries**: Each version is fully self-contained
- **Parallel development**: Multiple versions can evolve independently
- **Auditability**: When a version is frozen, everything in that folder is frozen

## Consequences

- ✅ Versioned URLs are stable and predictable
- ✅ Failed versions are preserved alongside successful ones
- ✅ Easy to see all versions at a glance
- ⚠️ Deviates from canon default (documented in CONTRACT.md)
- ⚠️ Requires updating paths in multiple places when referencing

## Relationship to Canon

- **Overrides**: Canon default of `attempts/prd-vX.Y/` nesting
- **Extends**: Canon principle of immutable attempts
- **Candidate for elevation**: Yes — if other lanes need versioned distribution

**Note**: Canon already documented PRD immutability (`repo-topology.md`: "PRD (frozen) | N/A (immutable)"). Our v1.2 failure to increment versions was a RTFM failure, not a canon gap. This decision addresses the STRUCTURE pattern, not the immutability principle.

## Evidence

- Conversation: 2026-01-20 (v1.2 failure analysis)
- Learning source: `v1.2/attempts/attempt-001/LEARNINGS.md`
- Documentation: `CONTRACT.md` (Structure Deviation section)



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0002-lane-owned-deployment.md
--------------------------------------------------------------------------------

# D0002 — Lane-Owned Cloudflare Pages Deployment

## Decision

The agent-skill lane owns its own Cloudflare Pages deployment, separate from the website lane. No cross-lane dependencies for distribution.

## Status

**Active**

## Context

PRD v1.2 attempted to distribute the compiled pack via the website lane's Cloudflare Pages deployment. This required modifying the website build process (`infra/scripts/smart-build.js`), which violated lane isolation.

The attempt proved the mechanism worked (via mock testing), but the PRD could not be satisfied without cross-lane modification.

## Why

- **Lane isolation**: Attempts cannot modify files outside their lane
- **Independence**: Lane can deploy without coordinating with other lanes
- **Simplicity**: No need to modify shared infrastructure
- **Ownership**: Lane is fully responsible for its deployment lifecycle

## Consequences

- ✅ Full lane isolation maintained
- ✅ No cross-lane coordination required
- ✅ Deployment can happen independently of website lane
- ⚠️ Requires separate Cloudflare Pages project setup
- ⚠️ May result in different domain (e.g., `agent-skill.klappy.dev` vs `klappy.dev/packs/`)

## Relationship to Canon

- **Overrides**: None (canon doesn't specify deployment ownership)
- **Extends**: Canon lane isolation principle
- **Candidate for elevation**: Yes — establishes pattern for lane-owned infrastructure

**Note**: Canon already documented lane isolation extensively (`product-lanes.md`: "Lanes share canon, not lifecycle"). Writing PRD v1.2 to require website build modification was a RTFM failure — we should have known cross-lane modification was prohibited. This decision documents the DEPLOYMENT pattern that respects the existing isolation principle.

## Evidence

- Conversation: 2026-01-20 (v1.2 failure analysis)
- Failed attempt: `v1.2/attempts/attempt-001/ATTEMPT.md`
- Learning source: `v1.2/attempts/attempt-001/LEARNINGS.md`
- PRD: `v1.2.1/PRD.md` (implements this decision)



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0003-versioned-kickoff-pattern.md
--------------------------------------------------------------------------------

# D0003 — Versioned KICKOFF.md Pattern

## Decision

Each PRD version has its own `KICKOFF.md` with detailed shaping instructions. A minimal `ATTEMPT_KICKOFF.md` at the lane root points to the active version's KICKOFF.

## Status

**Active**

## Context

Initially, a single `prompts/ATTEMPT_KICKOFF.md` contained all attempt instructions. This created problems:

1. Instructions might need to change between attempts on the same PRD
2. Frozen versions should have frozen instructions for auditability
3. A folder for a single file is unnecessary overhead

## Why

- **Mutability**: Version-specific KICKOFF can evolve between attempts
- **Auditability**: When version is frozen, its KICKOFF is frozen too
- **Simplicity**: One-liner at root, details in version folder
- **Tight coupling**: KICKOFF and PRD are co-located and evolve together

## Consequences

- ✅ Instructions can evolve per-version without affecting other versions
- ✅ Frozen versions have complete, auditable instruction sets
- ✅ External kickoff is stable (just update the version pointer)
- ✅ No unnecessary `prompts/` folder
- ⚠️ Must remember to create KICKOFF.md when creating new version

## Relationship to Canon

- **Overrides**: Canon pattern of centralized kickoff prompt
- **Extends**: Canon principle of attempt containment
- **Candidate for elevation**: Yes — useful pattern for any lane with versioned PRDs

## Evidence

- Conversation: 2026-01-20 (structure discussion)
- Implementation: `ATTEMPT_KICKOFF.md`, `v1.1/KICKOFF.md`, `v1.2.1/KICKOFF.md`



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0004-readme-contract-pattern.md
--------------------------------------------------------------------------------

# D0004 — README + CONTRACT Documentation Pattern

## Decision

Lane documentation is split into two files: `README.md` for human-friendly overview and `CONTRACT.md` for formal structure/deviations. README links to CONTRACT for details.

## Status

**Active**

## Context

We needed to document lane-specific deviations from canon (version-first structure, kickoff pattern, etc.). Options considered:

1. Single README with everything
2. CONTRACT.md only (formal)
3. README.md only (informal)
4. README + CONTRACT (both audiences)

## Why

- **README is universal**: First file humans and agents look for
- **CONTRACT is formal**: Structured, precise deviation documentation
- **Separation of concerns**: Overview vs. formal contract
- **Antifragile**: Human-readable prose survives better than brittle JSON manifests

## Consequences

- ✅ Humans get quick orientation from README
- ✅ Agents can find formal specifications in CONTRACT
- ✅ Neither file is cluttered with the other's content
- ✅ CONTRACT can have structured sections without hurting README readability
- ⚠️ Two files to maintain (but they serve different purposes)

## Relationship to Canon

- **Overrides**: None (canon doesn't specify lane documentation pattern)
- **Extends**: Canon principle of documentation as product
- **Candidate for elevation**: Yes — useful pattern for any lane with deviations

## Evidence

- Conversation: 2026-01-20 (documentation discussion)
- Implementation: `README.md`, `CONTRACT.md`



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0005-test-execution-containment.md
--------------------------------------------------------------------------------

# D0005 — Test Execution Containment

## Decision

Test execution during attempts must stay within the attempt folder. Cross-lane testing uses mock structures inside the attempt, not actual cross-lane writes.

## Status

**Active**

## Context

During v1.2 attempt-001, the distribution test script initially wrote files to `products/website/dist/packs/`. Even though the *proposals* were contained in the attempt folder, the *test execution* crossed lane boundaries.

This violated lane isolation even though it was "just a test."

## Why

- **Lane isolation is absolute**: Not just for proposals, but for test execution too
- **Attempts are sandboxes**: Nothing should escape the attempt folder until promotion
- **Mock structures prove mechanisms**: You can verify cross-lane behavior without actually crossing

## Pattern: Mock Structures

When testing cross-lane behavior:

```
attempt-001/
├── mock-website-dist/      # Mirror of target structure
│   └── packs/
│       └── agent-skill/
│           └── prd-guide-pack.md
└── scripts/
    └── distribute.js       # Writes to mock, not real target
```

The test proves the mechanism works. Actual cross-lane changes happen during PROMOTION, not during the attempt.

## Consequences

- ✅ Attempts are fully contained (no side effects)
- ✅ Failed attempts don't leave debris in other lanes
- ✅ Mechanism is proven without risk
- ⚠️ Requires creating mock structures (minor overhead)
- ⚠️ Mock may diverge from real target (verify during promotion)

## Relationship to Canon

- **Extends**: Canon "lane-contained" principle
- **Gap filled**: Canon didn't explicitly cover test execution
- **Candidate for elevation**: Yes — this is a universal principle

## Evidence

- Conversation: 2026-01-20
- Failed test: `v1.2/attempts/attempt-001/` (initially wrote outside lane)
- Corrected test: `v1.2/attempts/attempt-001/mock-website-dist/`
- Learning source: `v1.2/attempts/attempt-001/LEARNINGS.md`



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0006-lane-level-decision-logs.md
--------------------------------------------------------------------------------

# D0006 — Lane-Level Decision Logs

## Decision

Lanes maintain their own `decisions/` folder for lane-specific architecture decisions that don't rise to canon level but need documented rationale.

## Status

**Active**

## Context

Canon says "Cross-lane learnings are captured in decision logs, not PRD mutations" (`product-lanes.md`). However, ODD only has repo-level decisions (`/odd/decisions/`).

When this lane deviated from canon patterns (version-first structure, versioned kickoff, etc.), we needed a place to document:

- What we decided
- Why we decided it
- How it relates to canon
- Whether it's an elevation candidate

Without lane-level decisions, these learnings would be scattered across LEDGER, ROADMAP, and attempt files — harder to find and replicate.

## Why

- **Transparency**: Deviations from canon are explicitly documented
- **Replicability**: Other lanes can copy successful patterns
- **Elevation path**: Patterns that work can be proposed for canon
- **Auditability**: Future maintainers understand why things are different

## Structure

```
products/<lane>/decisions/
├── index.md                    # Decision log with tables
├── D0001-<title>.md
├── D0002-<title>.md
└── ...
```

Each decision includes:

- Decision statement
- Context (what prompted this)
- Relationship to canon (overrides, extends, gap)
- Elevation candidate flag

## Consequences

- ✅ Lane deviations are documented and justified
- ✅ Patterns can be shared across lanes
- ✅ Clear path from lane → canon promotion
- ✅ Aligns with canon statement about decision logs
- ⚠️ One more folder to maintain
- ⚠️ Must avoid duplicating canon decisions

## Relationship to Canon

- **Extends**: Canon "decision logs" concept to lane level
- **Supports**: Canon statement "Cross-lane learnings are captured in decision logs"
- **Gap filled**: Canon only had repo-level decisions
- **Candidate for elevation**: Yes — useful for any lane with deviations

## Evidence

- Conversation: 2026-01-20
- Canon reference: `product-lanes.md` line 227
- Implementation: `products/agent-skill/decisions/` (this folder)



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0007-upstream-canon-loading.md
--------------------------------------------------------------------------------

# D0007 — Upstream Canon Loading via Public URL

## Decision

Agent kickoffs load the compiled ODD canon pack from a public URL FIRST (upstream), before any lane-specific instructions. The URL points to `/latest/` which resolves to the current champion version.

## Status

**Active**

## Context

The agent-skill lane produces a compiled pack that contains ODD philosophy (manifesto, constraints, decision rules, etc.). For agents to make good decisions, they need this context BEFORE reading lane-specific instructions.

Two problems with local file references:

1. **Not portable**: `../v1.1/dist/prd-guide-pack.md` only works inside this repo
2. **Buried context**: If canon comes after lane instructions, it can be obscured

## Why

- **Portable**: Public URL works in any context (parallel lanes, external projects)
- **Upstream loading**: Canon shapes everything that follows, so it must come first
- **Latest convention**: `/latest/` always points to current champion, no manual updates
- **Parallel reuse**: Other lanes can reference the same URL

## Pattern

### URL Structure

```
https://agent-skill.klappy.dev/
├── latest/                    # Always points to current champion
│   └── prd-guide-pack.md
├── v1.1/dist/
│   └── prd-guide-pack.md
└── ...
```

### Kickoff Structure

```markdown
# Kickoff

## Step 0: Load ODD Canon (UPSTREAM)

Read and internalize: https://agent-skill.klappy.dev/latest/prd-guide-pack.md

---

## Step 1: Lane-specific instructions
...
```

## Consequences

- ✅ Agents start with full ODD context
- ✅ Parallel lanes can use the same pack
- ✅ External projects can bootstrap with ODD
- ✅ No manual version updates needed (latest redirects)
- ⚠️ Requires deployment infrastructure (v1.2.1 scope)
- ⚠️ Network dependency (URL must be accessible)

## Relationship to Canon

- **Extends**: Canon compilation pattern
- **New pattern**: Public URL + latest convention + upstream loading
- **Candidate for elevation**: Yes — other lanes producing packs should follow

## Evidence

- Conversation: 2026-01-20
- Implementation: v1.2.1 attempt will create deployment
- Will update: `ATTEMPT_KICKOFF.md` to reference public URL



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0008-roadmap-vision-only.md
--------------------------------------------------------------------------------

# D0008 — ROADMAP as Vision Only (No Status Tracking)

## Decision

ROADMAP tracks future vision and version objectives only. It does not track version status (champion, failed, in-progress). The `history/` folder is the single source of truth for what happened.

## Status

**Active**

## Context

The ROADMAP contained a "Status" field for each version (e.g., "CHAMPION", "FAILED", "PRD written, awaiting attempt"). After v1.2.1 was promoted to champion, the ROADMAP still showed "awaiting attempt" — creating drift between ROADMAP and history.

Options considered:

1. **Remove status from ROADMAP** — history/ is authoritative, ROADMAP is vision-only
2. **Enforce ROADMAP updates during promotion** — Add to promotion checklist

## Why

- **DRY**: history/ already tracks champion/failed status authoritatively. Duplicating in ROADMAP violates DRY.
- **KISS**: Fewer places to maintain = fewer places to forget
- **Role clarity**: ROADMAP answers "where are we going?" / history/ answers "where have we been?"
- **Antifragile**: Design removes drift possibility rather than relying on discipline to prevent it

Option 2 was rejected because it fights drift with process discipline instead of structural design. Discipline eventually loses to forgetfulness.

## Consequences

- ✅ No more drift between ROADMAP and history/
- ✅ Clear separation of concerns (vision vs. history)
- ✅ Simpler ROADMAP maintenance (just update vision, not status)
- ⚠️ Loses at-a-glance "where are we" in ROADMAP (go to history/ for that)
- ⚠️ Agents loading ROADMAP need to also check history/ for current state

## Relationship to Canon

- **Overrides**: None (canon doesn't specify roadmap structure)
- **Extends**: Canon principle of DRY (with isolation), KISS
- **Candidate for elevation**: Yes — useful pattern for any lane with both ROADMAP and LEDGER

## Evidence

- Conversation: 2026-01-21 (ROADMAP showed v1.2.1 as "awaiting attempt" after champion promotion)
- Root cause: Status tracked in two places (ROADMAP + LEDGER)



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/D0009-history-folder-pattern.md
--------------------------------------------------------------------------------

# D0009 — History Folder Pattern (Indexed Entries)

## Decision

Lane history is stored in a `history/` folder with an index file (`index.md`) and individual entry files (`H000X-*.md`). This mirrors the `decisions/` folder pattern for consistency.

## Status

**Active**

## Context

LEDGER.md was a single file capturing all lane history (champions, failures, learnings, infrastructure changes). As the lane matures, this file will grow unbounded, making it slow for agents to parse and increasing cognitive load.

Options considered:

1. **Keep single LEDGER.md** — simple but doesn't scale
2. **Rename to CHANGELOG.md** — standard format but loses narrative/learnings structure
3. **Split into history/ folder** — mirrors decisions/ pattern, scales well

## Why

- **Consistency**: Same pattern as `decisions/` — index + individual files
- **Scalability**: Agents can scan index (~500 tokens) and dig deeper only when needed
- **Cognitive load**: Familiar pattern reduces mental overhead
- **Growth-friendly**: Individual entries can include evidence, links, screenshots without bloating index

## Structure

```
products/agent-skill/
├── history/
│   ├── index.md                           # Quick reference table
│   ├── H0001-v1.1-champion.md
│   ├── H0002-v1.2-failed.md
│   ├── H0003-lane-structure-migration.md
│   └── H0004-v1.2.1-champion.md
```

## Naming

- Folder: `history/` (not `memory/`) — universally understood, consistent with conventions
- Files: `H000X-<slug>.md` — mirrors `D000X-*.md` pattern from decisions
- Index: `index.md` — same as decisions

## Consequences

- ✅ Agents can quickly scan lane history via index
- ✅ Individual entries can grow without affecting scan performance
- ✅ Consistent with decisions/ pattern — less cognitive load
- ✅ LEDGER.md removed — single source of truth
- ✅ ROADMAP Learnings Log removed — history/ is the authority
- ⚠️ More files to manage (but same tradeoff as decisions/)

## Relationship to Canon

- **Overrides**: None (canon doesn't specify history storage pattern)
- **Extends**: Canon principle of "Memory Is the Bottleneck" — this makes memory scannable
- **Candidate for elevation**: Yes — useful pattern for any lane with accumulated history

## Evidence

- Conversation: 2026-01-21 (LEDGER drift discussion, scalability concerns)
- Prior art: `decisions/` folder in this lane



--------------------------------------------------------------------------------
📄 File: products/agent-skill/decisions/README.md
--------------------------------------------------------------------------------

# 📋 Agent-Skill Lane Decision Log

Lane-specific Architecture Decision Records (ADRs) for the agent-skill product lane.

> **Scope:** These decisions apply only to this lane. They may override or extend canon patterns with documented rationale. Successful patterns may be proposed for elevation to canon.

---

## ✅ Active Decisions

### Structure & Organization

| ID                                            | Title                   | What Was Decided                                                                                                                                   |
| --------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [D0001](./D0001-version-first-structure.md)   | Version-first structure | Use `vX.Y/` folders at top level (not `attempts/prd-vX.Y/`). Each version contains PRD, src, dist, attempts. Enables immutable versioned releases. |
| [D0003](./D0003-versioned-kickoff-pattern.md) | Versioned KICKOFF       | Each PRD version has its own `KICKOFF.md`. Lane root has minimal one-liner pointing to active version. KICKOFFs freeze with their version.         |
| [D0004](./D0004-readme-contract-pattern.md)   | README + CONTRACT       | Split lane docs: `README.md` for human overview, `CONTRACT.md` for formal structure/deviations. README links to CONTRACT for details.              |

### Deployment & Distribution

| ID                                        | Title                 | What Was Decided                                                                             |
| ----------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------- |
| [D0002](./D0002-lane-owned-deployment.md) | Lane-owned deployment | This lane owns its own Cloudflare Pages project. No website lane dependency. Full isolation. |

### Attempt Practices

| ID                                             | Title            | What Was Decided                                                                                                                            |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [D0005](./D0005-test-execution-containment.md) | Test containment | Tests during attempts CANNOT write outside attempt folder. Use mock structures (e.g., `mock-website-dist/`) to prove cross-lane mechanisms. |

### Governance

| ID                                           | Title                  | What Was Decided                                                                                                                                        |
| -------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [D0006](./D0006-lane-level-decision-logs.md) | Lane decisions folder  | Lanes maintain their own `decisions/` for patterns that don't rise to canon. Enables transparent deviation + elevation path.                            |
| [D0007](./D0007-upstream-canon-loading.md)   | Upstream canon loading | Load ODD pack from public URL (`/latest/prd-guide-pack.md`) FIRST in kickoffs, before lane instructions. Portable + ensures canon shapes all decisions. |
| [D0008](./D0008-roadmap-vision-only.md)      | ROADMAP vision only    | ROADMAP tracks future vision only, not version status. History is single source of truth for champion/failed status. Prevents drift.                     |
| [D0009](./D0009-history-folder-pattern.md)   | History folder pattern | Lane history in `history/` folder with index + individual entry files. Mirrors `decisions/` pattern. Replaces single LEDGER.md file.                     |

---

## 🔄 How Decisions Are Made

1. **During an attempt**: Note decision in `ATTEMPT.md` or `LEARNINGS.md`
2. **After learning stabilizes**: Document as decision file here
3. **If pattern proves valuable**: Propose elevation to canon

---

## 📖 RTFM Check

Before documenting a new pattern, verify it isn't already in canon:

- `docs/appendices/product-lanes.md` — Lane isolation, cross-lane rules
- `docs/appendices/attempt-lifecycle.md` — Attempt containment
- `docs/appendices/repo-topology.md` — PRD immutability
- `docs/decisions/` — Existing decisions

Some of our learnings (D0001, D0002) were applications of existing canon principles we failed to read carefully. Document this when it happens — it's valuable evidence that canon is correct but underutilized.

---

## 🔗 Relationship to Canon

These decisions:

- **May override** canon defaults (with documented rationale)
- **Must not violate** canon constraints (lane isolation, evidence requirements)
- **Should inform** future canon evolution

When a lane decision proves valuable across multiple lanes, it becomes a candidate for canon promotion.

---

## 📝 Decision File Template

```markdown
# D000X — [Title]

## Decision

[1-2 sentences stating what was decided]

## Status

**Active** | Proposed | Deprecated

## Context

[What problem prompted this decision]

## Why

- [Bullet point]
- [Bullet point]

## Consequences

- [What this enables]
- [What this prevents]
- [What this costs]

## 🔗 Relationship to Canon

- Overrides: [canon pattern, if any]
- Extends: [canon pattern, if any]
- Candidate for elevation: Yes/No

## Evidence

- Conversation: [date or reference]
- Attempt: [path, if applicable]
```

---

## 🚫 Deprecated Decisions

_None yet._



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0001-v1.1-champion.md
--------------------------------------------------------------------------------

# H0001 — PRD v1.1 Champion

- **Date**: 2026-01-20
- **Type**: Champion
- **PRD**: v1.1
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.1/attempts/attempt-001/`

## Summary

Delivered a compiled pack (`prd-guide-pack.md`) that enables AI agents to interactively guide humans through creating ODD-aligned PRDs.

## Deliverable

- **Pack**: `v1.1/dist/prd-guide-pack.md`
- **Size**: ~12K tokens (45KB, 1838 lines)
- **Sources**: 7 canon + guidance documents compiled

## What Worked

- Compiled pack approach produces portable, self-contained context artifact
- Interactive guidance instructions transform static docs into conversation flow
- 7-stage PRD creation process covers outcomes, criteria, constraints, evidence
- Token budget (~12K) is reasonable for context injection (~6-12% of typical windows)

## What Didn't

- Initial implementation scattered files across repo (infra/, public/_compiled/, docs/PRD/)
- Had to reorganize to consolidate everything under products/agent-skill/

## Learnings

- Lane isolation matters: all artifacts for a lane should live in `products/<lane>/`
- PRD-first, then implement: creating just the PRD before building prevents scope creep
- Attempt structure preserves implementation as evidence, not production artifacts

## Follow-up

- Test pack with Claude Code on a real PRD creation session to validate interactive flow



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0002-v1.2-failed.md
--------------------------------------------------------------------------------

# H0002 — PRD v1.2 Failed

- **Date**: 2026-01-20
- **Type**: Failed
- **PRD**: v1.2
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.2/attempts/attempt-001/`

## Summary

Attempted to add zero-friction public access to the compiled pack via website lane's Cloudflare Pages deployment. Failed because the PRD required cross-lane modification, violating lane isolation.

## Objective

Add zero-friction public access to the compiled pack via a stable URL using website lane's Cloudflare Pages deployment.

## What Happened

The PRD required modifying the website lane's build process (`infra/scripts/smart-build.js`) to copy the pack to website dist. This violates lane isolation — attempts cannot modify files outside their lane.

The mechanism was proven to work via mock testing within the attempt folder, but the PRD cannot be satisfied without cross-lane modification.

## What Worked

- Mirroring repo structure in attempt folder for clean promotion path
- Mock website dist for lane-contained testing
- PROMOTION.md document for clear promotion instructions

## What Didn't

- Initial plan to modify infra directly (lane violation)
- Running test that wrote outside lane (lane violation)
- The PRD itself (requires cross-lane modification by design)

## Learnings

- Lane isolation is absolute during attempts — not just for proposals, but for test execution too
- PRDs can have design flaws that violate constraints
- A lane cannot require modification of another lane's build process

## Follow-up

- Create v1.2.1 PRD with lane-owned deployment approach



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0003-lane-structure-migration.md
--------------------------------------------------------------------------------

# H0003 — Lane Structure Migration

- **Date**: 2026-01-20
- **Type**: Infrastructure
- **Epoch**: E0003 (evidence-first)

## Summary

Migrated lane from flat structure to version-first structure, enabling immutable versioned releases.

## What Changed

**Before:**

```
products/agent-skill/
├── PRD.md
├── src/
├── dist/
└── attempts/
    └── prd-vX.Y/
```

**After:**

```
products/agent-skill/
├── README.md        # Lane overview
├── CONTRACT.md      # Formal structure/deviations
├── ROADMAP.md       # Vision document
├── history/         # What happened (this folder)
├── decisions/       # Architecture decisions
├── prompts/
│   └── ATTEMPT_KICKOFF.md
├── v1.1/            # Version-first
│   ├── PRD.md       # Frozen
│   ├── src/
│   ├── dist/
│   └── attempts/
├── v1.2/            # Failed version
│   ├── PRD.md       # Frozen
│   └── attempts/
└── v1.2.1/          # Current
    └── PRD.md       # Active
```

## Why

- Versioned assets enable immutable releases
- Dependents can pin to specific versions
- Each version is fully self-contained
- Clear boundaries between version states

## Documented In

- `README.md` — Lane overview, file index, version table
- `CONTRACT.md` — Formal deviation from canon structure
- `decisions/D0001-version-first-structure.md` — Decision record



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0004-v1.2.1-champion.md
--------------------------------------------------------------------------------

# H0004 — PRD v1.2.1 Champion

- **Date**: 2026-01-21
- **Type**: Champion
- **PRD**: v1.2.1
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.2.1/attempts/attempt-001/`

## Summary

Patched v1.2's failed approach with lane-owned Cloudflare Pages deployment. Pack now available at public URL without website lane dependency.

## Deliverable

- **Cloudflare Pages project**: `klappy-dev-agent-skill`
- **Preview URL**: `https://main.klappy-dev-agent-skill.pages.dev/`
- **Pack URL**: `/v1.1/prd-guide-pack.md`
- **Latest URL**: `/latest/prd-guide-pack.md`

## What Worked

- Lane-owned Cloudflare Pages deployment (full isolation from website lane)
- Publishing from `public/agent-skill/` ensures only promoted content is accessible
- Consistent URL structure: `/latest/` and `/v1.1/` (no `dist/` in paths)
- Preview URL verification before production deployment

## What Didn't

- Initial gitignore blocked `dist/` folders (fixed with exception)
- Inconsistent URL structure initially (`/latest/` vs `/v1.1/dist/`) — normalized

## Learnings

- Root gitignore patterns can unexpectedly block public distribution. Use `!public/**/dist/` exception
- Deploy contents of dist, not the dist folder itself — keeps URLs clean
- Multi-lane CF deployments create serial build bottleneck — single `/public` deployment worth exploring

## Follow-up

- Fast-forward `prod` branch to enable production URL, then configure custom domain



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0005-v1.2.2-failed.md
--------------------------------------------------------------------------------

# H0005 — PRD v1.2.2 Failed

- **Date**: 2026-01-21
- **Type**: Failed
- **PRD**: v1.2.2
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.2.2/attempts/attempt-001/`

## Summary

Attempt to add README index pattern for tree-shakeable memory exposed fundamental ODD violations. INSTRUCTIONS.md was being persisted when it should be ephemeral. Compile plans were in central infra instead of lane. Multiple infrastructure changes made during attempt instead of clean restart.

## What Was Discovered

1. **INSTRUCTIONS.md is ephemeral** — Generated artifact, not persisted input
2. **Compile plans belong in lane** — Not central `infra/compile/plans/`
3. **ODD formula violated** — Agent should only need Pack + CONTRACT + PRD

## What Worked

- README index pattern created (canon 0.5.4)
- Discovered real architectural issues
- User feedback forced examination of fundamentals

## What Didn't

- Attempted to steer a miss instead of failing early
- Made infrastructure changes during attempt
- Modified PRD during attempt (should have created v1.2.3)
- Initially declared CHAMPION before understanding full scope

## Learnings

1. **Ephemeral artifacts are ephemeral** — Don't persist generated code
2. **ODD formula is strict** — Pack + CONTRACT + PRD = Attempt. Nothing else.
3. **Don't steer a miss** — When fundamentals are wrong, fail and restart clean
4. **Lane isolation applies to compile plans** — Everything lane-specific in lane folder

## Follow-up

- Create v1.2.3 PRD with proper ODD compliance
- Move compile plan to version folder
- Document ephemeral artifact generation in CONTRACT.md



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0006-v1.2.3-champion.md
--------------------------------------------------------------------------------

# H0006 — PRD v1.2.3 Champion

- **Date**: 2026-01-21
- **Type**: Champion
- **PRD**: v1.2.3
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.2.3/attempts/attempt-001/`

## Summary

Canon refresh to v0.5.4 with proper ODD compliance. INSTRUCTIONS.md treated as ephemeral (generated per-attempt), pack includes README index pattern for tree-shakeable memory.

## Deliverable

- **Pack**: `public/agent-skill/v1.2.3/prd-guide-pack.md`
- **Latest**: `public/agent-skill/latest/prd-guide-pack.md`
- **Production URL**: `https://agent-skill.klappy.dev/v1.2.3/prd-guide-pack.md`

## What Worked

- Clean restart after v1.2.2 failure (didn't steer a miss)
- INSTRUCTIONS.md generated fresh in attempt folder (ephemeral)
- Proper deployment verification before claiming CHAMPION
- Evidence produced for every claim

## What Didn't

- Initially declared CHAMPION before verifying deployment (corrected)
- Had to find preview URL pattern (deployment ID based)
- `public/agent-skill/latest/README.md` not updated during promotion (discovered post-deploy, still claimed v1.1)

## Learnings

1. **Verify before claiming**: Don't mark CHAMPION until HTTP 200 verified
2. **Cloudflare preview URLs**: Use deployment ID from PR checks (e.g., `20426ceb.klappy-dev-agent-skill.pages.dev`)
3. **ODD formula works**: Pack + CONTRACT + PRD = Attempt. Nothing else needed.
4. **Production vs preview**: `agent-skill.klappy.dev` is production; `main.klappy-dev-agent-skill.pages.dev` is main branch preview
5. **Update ALL latest references**: Promotion must update `latest/README.md` to reflect new champion version (pack file alone is not enough)

## Follow-up

- Consider automating preview URL discovery in attempt workflow
- Add `latest/README.md` update to promotion checklist or automate it



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0007-v1.2.4-champion.md
--------------------------------------------------------------------------------

# H0007 — PRD v1.2.4 Champion

- **Date**: 2026-01-21
- **Type**: Champion
- **PRD**: v1.2.4
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.2.4/attempts/attempt-001/`

## Summary

Canon refresh to v0.8.0 with ODD path fixes (elevated from `/canon/odd/` to `/odd/`) and new content (Cognitive Partitioning, Tool Specialization).

## Deliverable

- **Pack**: `public/agent-skill/v1.2.4/prd-guide-pack.md`
- **Latest**: `public/agent-skill/latest/prd-guide-pack.md`
- **Preview URL**: `https://main.klappy-dev-agent-skill.pages.dev/v1.2.4/prd-guide-pack.md`

## What Worked

- Clean path fixes without behavioral changes
- New content (Cognitive Partitioning, Tool Specialization) integrated seamlessly
- INSTRUCTIONS.md generated fresh per-attempt (ephemeral pattern)
- HTTP 200 verified before claiming CHAMPION
- Evidence produced for every claim

## What Didn't

- Manual compilation required (no automated path validation)
- Compile plan doesn't auto-generate INSTRUCTIONS.md

## Learnings

1. **Canon reorganizations require path audits**: ODD elevation from `/canon/odd/` to `/odd/` created stale references
2. **Compile plans need version tracking**: When canon version bumps, compile plan paths should be validated
3. **New content integration is straightforward**: Adding sources to compile plan is additive, non-breaking
4. **ODD formula still works**: Pack + CONTRACT + PRD = Attempt (no additional context needed)

## Follow-up

- Consider automating compile plan path validation against canon version
- Production deploy to `agent-skill.klappy.dev` for stable URL



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/H0008-v1.3-champion.md
--------------------------------------------------------------------------------

# H0008 — PRD v1.3 Champion

- **Date**: 2026-01-21
- **Type**: Champion
- **PRD**: v1.3
- **Epoch**: E0003 (evidence-first)
- **Attempt**: `v1.3/attempts/attempt-001/`

## Summary

PRD Elicitation Enhancement — transformed the prd-guide pack from teaching ODD to actively eliciting PRDs through structured questioning.

## Deliverable

- **Pack**: `public/agent-skill/v1.3/prd-guide-pack.md`
- **Latest**: `public/agent-skill/latest/prd-guide-pack.md`
- **Preview URL**: `https://dd379b0d.klappy-dev-agent-skill.pages.dev/v1.3/prd-guide-pack.md`
- **PR**: https://github.com/klappy/klappy.dev/pull/4

## What's New

### Agent Role Declaration
Clear framing: "You extract. You do not invent."

### PRD Stage Typing
6 types with evidence/ambiguity expectations (PoC, Feature, Fix, Product slice, Refactor, Other)

### Asset Intake Contract
4 asset types (Text, Media, Links, Oral testimony) with guidance for partial information

### 8-Phase Interview Loop
Resequenced from 7 stages:
- Phase 0: Stage Identification (NEW)
- Phase 1: Orient (NEW)
- Phase 2: Inventory (NEW)
- Phase 3: Constraint Surfacing (moved)
- Phase 4: Outcome Framing (moved)
- Phase 5: Evidence Definition (moved)
- Phase 6: Ambiguity Capture (NEW)
- Phase 7: Draft Assembly (consolidated)

Key change: Inventory BEFORE Outcome (can't define what you want until you know what you have)

## What Worked

- Clean separation of elicitation phases
- Stage typing table provides clear evidence expectations
- Asset intake prevents blocking on missing information
- Ambiguity capture aligns with ODD philosophy
- Example dialogue demonstrates full flow

## What Didn't

- Pack size increased (~16K tokens vs ~15K)
- Interview loop may feel long for simple PRDs

## Learnings

1. **Inventory before scope**: You can't define what you want until you know what you have
2. **Stage typing sets expectations**: Different PRD types need different rigor
3. **Ambiguity is expected**: ODD principle — acknowledged early is cheaper than discovered late
4. **Extract, don't invent**: The agent's role is elicitation, not authorship

## Follow-up

- Monitor feedback on interview loop length
- Consider v1.3.1 for streamlined flow if needed
- Production deploy to stable URL when PR merges



--------------------------------------------------------------------------------
📄 File: products/agent-skill/history/index.md
--------------------------------------------------------------------------------

# 📜 Agent-Skill Lane History

What actually happened — champions, failures, learnings, infrastructure changes.

For future vision, see [ROADMAP.md](../ROADMAP.md).

---

## 📋 Entries

| ID | Version/Event | What Happened | Date |
|----|---------------|---------------|------|
| [H0001](./H0001-v1.1-champion.md) | v1.1 | Champion — PRD Creation Guidance pack delivered (~12K tokens) | 2026-01-20 |
| [H0002](./H0002-v1.2-failed.md) | v1.2 | Failed — Cross-lane violation (website lane dependency) | 2026-01-20 |
| [H0003](./H0003-lane-structure-migration.md) | Infrastructure | Migrated to version-first folder structure | 2026-01-20 |
| [H0004](./H0004-v1.2.1-champion.md) | v1.2.1 | Champion — Lane-owned Cloudflare Pages deployment | 2026-01-21 |
| [H0005](./H0005-v1.2.2-failed.md) | v1.2.2 | Failed — Exposed ODD violations (ephemeral artifacts, compile plan location) | 2026-01-21 |
| [H0006](./H0006-v1.2.3-champion.md) | v1.2.3 | Champion — Canon refresh v0.5.4 + ODD compliance | 2026-01-21 |
| [H0007](./H0007-v1.2.4-champion.md) | v1.2.4 | Champion — Canon refresh v0.8.0 (path fixes + new content) | 2026-01-21 |
| [H0008](./H0008-v1.3-champion.md) | v1.3 | Champion — PRD Elicitation Enhancement (interview mechanics, stage typing) | 2026-01-21 |

---

## 🏷️ Entry Types

- **Champion**: PRD attempt succeeded, deliverable promoted
- **Failed**: PRD attempt failed, learnings captured
- **Infrastructure**: Non-PRD changes to lane structure/tooling

---

## ➕ How to Add an Entry

1. Create `H000X-<slug>.md` using template below
2. Add row to index table above
3. Keep entries append-only (don't edit old entries except to fix errors)

---

## 📝 Entry Template

```markdown
# H000X — [Title]

- **Date**: YYYY-MM-DD
- **Type**: Champion | Failed | Infrastructure
- **PRD**: vX.Y (if applicable)
- **Attempt**: `vX.Y/attempts/attempt-NNN/` (if applicable)

## Summary

[1-2 sentences: what happened]

## Deliverable (if Champion)

- [What was produced, where it lives]

## What Worked

- [Bullet points]

## What Didn't

- [Bullet points]

## Learnings

- [1-3 bullets that inform future work]

## Follow-up

- [One next action, if any]
```



--------------------------------------------------------------------------------
📄 File: products/agent-skill/prompts/ATTEMPT_KICKOFF.md
--------------------------------------------------------------------------------

# Agent Skill Lane — Attempt Kickoff

Use this prompt when starting a new attempt for the agent-skill lane.

---

## Instructions

Copy everything below this line and paste it into a new conversation with your AI agent.

---

## Kickoff Prompt

```markdown
# Agent-Skill Lane Attempt

## Context

I'm starting an attempt for the **agent-skill** lane in the klappy.dev repository.

This lane produces compiled packs for AI agent consumption. The primary deliverable is a portable context artifact that enables any LLM to guide humans through ODD-aligned PRD creation.

## Lane Structure

This lane uses a **version-first** folder structure:
```

products/agent-skill/
├── README.md # Lane overview, file index
├── CONTRACT.md # Formal structure/deviations from canon
├── history/ # Champion history, failures, learnings
├── ROADMAP.md # Vision document
├── prompts/
│ └── ATTEMPT_KICKOFF.md # This file
├── v1.1/ # Champion version
│ ├── PRD.md # Frozen PRD
│ ├── src/ # Source files
│ ├── dist/ # Compiled output
│ └── attempts/ # Attempt history
├── v1.2/ # Failed version
│ ├── PRD.md # Frozen PRD
│ └── attempts/ # Failed attempt evidence
└── v1.2.1/ # Current version
└── PRD.md # Active PRD

```

## Your Task

1. **Read the lane documentation**:
   - `products/agent-skill/README.md` — Lane overview
   - `products/agent-skill/CONTRACT.md` — Structure deviations from canon
   - `products/agent-skill/history/` — Champion history and learnings

2. **Identify the active PRD**:
   - Check which version has an active (non-frozen) PRD
   - Currently: `v1.2.1/PRD.md`

3. **Read the PRD thoroughly**:
   - Understand the objective
   - Note success criteria and definition of done
   - Review constraints

4. **Check related documents**:
   - Previous champion: `v1.1/attempts/attempt-001/ATTEMPT.md`
   - Previous failure: `v1.2/attempts/attempt-001/LEARNINGS.md`
   - Lane roadmap: `ROADMAP.md`

5. **Create attempt folder**:
   - Location: `v1.2.1/attempts/attempt-001/`
   - Required files:
     - `ATTEMPT.md` — Closure record (status, outcome, evidence)
     - `META.json` — Machine-readable metadata

6. **Execute the PRD**:
   - Follow definition of done
   - All work stays within the attempt folder until promotion
   - Test execution must not cross lane boundaries

7. **Produce evidence**:
   - Place in `evidence/` subfolder
   - Include screenshots, logs, test output as appropriate

8. **Complete self-audit**:
   - Review against Canon self-audit checklist
   - Document tradeoffs and risks

## Critical Rules

1. **Lane Isolation**: Do NOT modify files outside `products/agent-skill/`
2. **Version Isolation**: Work within the specific version folder
3. **Attempt Containment**: All changes go in the attempt folder until promotion
4. **Evidence Required**: No assertions without proof
5. **PRD Immutability**: If PRD has a problem, create a NEW version (don't modify frozen PRDs)

## When Complete

Update `ATTEMPT.md` with:
- Status (CHAMPION, CLOSED, or ABANDONED)
- Outcome summary
- Evidence produced
- Self-audit results
- Learnings

If championed, add entry to `history/` folder.
```

---

## Notes for Humans

Before starting an attempt:

1. Verify you're working on the correct PRD version
2. Check ROADMAP.md for context on what this version is trying to achieve
3. Review history/ folder for learnings from previous attempts
4. Ensure you understand the lane's CONTRACT.md (structure deviations)

If the PRD seems problematic:

- Don't try to "make it work" by bending rules
- Document the issue in your attempt's LEARNINGS.md
- Mark the attempt as FAILED with clear explanation
- Propose a new PRD version to address the issue



--------------------------------------------------------------------------------
📄 File: products/ai-navigation/README.md
--------------------------------------------------------------------------------

---
uri: klappy://products/ai-navigation
title: "AI Navigation Lane"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["products", "ai-navigation", "lane", "index", "planned"]
---

# AI Navigation Lane

> AI-assisted navigation and chat interface for the website.

## Description

The ai-navigation lane is planned but not yet active. It will provide an AI chat interface that helps visitors navigate ODD content conversationally. This is separate from the website lane (static content) and the agent-skill lane (agent tooling).

## Outline

- Lane Status
- Planned Scope
- Relationship to Other Lanes

---

## Lane Status

| Field | Value |
|-------|-------|
| **Status** | Planned (sparse) |
| **PRD** | Not yet created |
| **Epoch** | TBD |

---

## Current State

This lane contains only a placeholder:

| Path | Purpose |
|------|---------|
| `src/.gitkeep` | Placeholder to preserve directory |

---

## Planned Scope

When active, this lane will include:

- AI chat interface for ODD navigation
- Context-aware responses based on canon/content
- Integration with website lane for seamless UX

---

## Relationship to Other Lanes

| Lane | Relationship |
|------|--------------|
| `website` | ai-navigation enhances website with conversational UI |
| `agent-skill` | ai-navigation consumes agent capabilities, does not define them |

---

## Starting an Attempt

A PRD must be created before attempts can begin. When ready:

1. Create `/products/ai-navigation/PRD.md`
2. Follow standard attempt workflow from `/docs/ATTEMPTS.md`



--------------------------------------------------------------------------------
📄 File: products/website/LEDGER.md
--------------------------------------------------------------------------------

# Website Lane Ledger

Append-only product memory for the `website` lane.
Records outcomes (champions, merges, deployments) without turning them into canon.

---

## Entry — PRD v1.0 Champion (PROMOTED)

- Date: 2026-01-19
- PRD: v1.0
- Epoch: E0003 (evidence-first)
- Champion: PROMOTED
- Champion branch: `run/website/prd-v1.0/cursor/a/claude-opus-4/71c6fdc7`
- Head commit SHA: `1fb713dcbd4158325f48e6842806016a208a7ee7`
- Merge commit SHA: `97394e2480421345b82682f9365c8e5ed414ecb1`
- Cloudflare Pages project: `klappy-dev-website`
- App URL: https://website-attempt-test.klappy-dev-website.pages.dev
- Evidence URL: https://website-attempt-test.klappy-dev-website.pages.dev/_evidence/
- Promotion PR: https://github.com/klappy/klappy.dev/pull/1
- Promoted at: 2026-01-19

> **Note:** This Promotion PR existed prior to rule formalization. From this point forward, all champions require an explicit Promotion PR per `products/website/prompts/ATTEMPT_KICKOFF.md`.

### What worked
- Evidence-first requirement produced real, observable artifacts online.
- `/_evidence/` as a stable convention is discoverable.
- Website lane build path is viable and can produce a deployed app + evidence.

### What didn't
- Local build succeeded but branch not pushed → no CF preview → unverifiable attempt.
- Wrangler deploy used → ad-hoc URL breaks branch-based audit trail.
- Lane/build-output mismatch caused CF to look for wrong dist path.

### Learnings (1–3 bullets)
- "Public" is not enough — discoverable is required.
- The system needs one blessed deployment path: push branch → CF Pages preview → verify 200.
- Failed attempts should preserve evidence URLs + notes when they reveal patterns.

### Follow-up (one next action)
- Kickoff prompt now enforces origin push + HTTP 200 checks + bans wrangler deploy.



--------------------------------------------------------------------------------
📄 File: products/website/PRD.md
--------------------------------------------------------------------------------

# PRD: Public Website

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.2             |
| **Lane**        | website          |
| **Status**      | Active           |
| **Created**     | 2026-01-17       |
| **Updated**     | 2026-01-20       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- build-output >=3.0.0 <4.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Visual Interfaces

This product MUST remain compatible with:

- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
- spacing >=1.0.0 <2.0.0

This product does NOT define colors, fonts, or spacing directly.
It consumes visual interfaces.

See `/odd/appendices/visual-evolution.md` for the visual evolution model.

---

## Objective

Create a public website that allows humans to:

- Understand what ODD is
- Explore it progressively without overwhelm
- Verify credibility
- Navigate to deeper material intentionally

---

## Background

This is the human-facing orientation surface for ODD.

It is portfolio, explanation, credibility layer.

It does NOT teach agents how to think.
It does NOT execute ODD.
It explains ODD progressively to humans.

---

## In Scope

- Progressive disclosure UX
- Canon browsing
- Essays / articles (including Medium content)
- Clear entry points ("Start here", "Go deeper")
- Mobile usability
- Visual calm
- Deep links / shareable URLs

---

## Explicitly Out of Scope

- AI chat (belongs to ai-navigation lane)
- Agent execution (belongs to agent-skill lane)
- Process enforcement
- MCP servers
- "How to run ODD" instructions for agents

---

## Success Criteria

- [ ] First load shows no more than 7 navigational items
- [ ] Mobile usable without horizontal scrolling
- [ ] Canon discoverable without file paths exposed
- [ ] No agent instructions present in UI
- [ ] No CLI/process language exposed to visitors
- [ ] Deep links work (URL represents resource + section)
- [ ] Progressive disclosure tiers respected (Tier 0/1/2)

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] Build output produced (`npm run build -- --lane website`)
- [ ] Visual proof captured (desktop + mobile screenshots)
- [ ] First load shows ≤7 nav items (verified via screenshot)
- [ ] Mobile layout verified (no horizontal scroll)
- [ ] Deep link round-trip tested
- [ ] Self-audit completed with explicit tradeoffs
- [ ] **Cloudflare Preview URL provided** (branch must be pushed)
- [ ] **Evidence URL provided** (viewable online without local code)

---

## Online Evidence (Required)

A website lane attempt is **not complete** unless:

1. The attempt branch is pushed to `origin`.
2. Cloudflare Pages generates a Preview Deployment URL for that branch.
3. The attempt includes an Evidence URL viewable online without running code locally.

Local preview instructions are allowed during development, but they **do not satisfy attempt completion**.

If an agent cannot provide both URLs, the attempt is **INVALID**.

See `/docs/appendices/online-evidence.md` for the full requirement.

---

## Primary User

Human developers, peers, evaluators exploring ODD.

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- UX should carry the explanation (reduce text compensation)
- Maintainability over cleverness
- Progressive disclosure required

---

## Media (Learning Layer)

This lane supports optional media assets (images/video/audio/PDF) as a **learning layer**.

This lane follows: `/odd/appendices/media-as-learning-layer.md`

### Discovery Mechanism (Required)

Media assets MUST be discovered through canonical ownership:

1. The owning markdown resource declares assets in frontmatter using a single-line JSON object:
   - `assets: {"key":"/assets/...","key2":"/assets/..."}`
2. `npm run sync` compiles these into `public/content/manifest.json` as `resource.assets`.
3. The website renders media only from `resource.assets` (not by scanning folders).

### Behavior Rules

- Media is opt-in (progressive disclosure).
- No autoplay video or audio.
- The page remains complete and usable without opening media.
- Media must attach only to stable content.

### Initial Media Scope (Phase 0)

**Home (`/`)**
- `/assets/home/hero-odd-diagram.png`
- `/assets/home/orientation-map-diagram.png`
- `/assets/home/outcomes-driven_development.mp4`

**ODD (`/odd/README.md`)**
- `/assets/odd/odd-in-practice.mp4`
- `/assets/odd/odd-is-not-a-framework.png`
- `/assets/odd/why-evidence-beats-confidence.m4a`

### Requirements

- The default experience must not require media consumption to understand the page.
- Media must be user-initiated (explicit Watch/Listen/View affordances).
- No autoplay video or audio.
- Media must not add to the primary navigation item count.

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `/products/website/attempts/`

---

## Compiled Pack (Phase 0)

The website lane MUST support generating a wipeable "visitor pack" used for progressive disclosure and AI-friendly context.

### Command
- `npm run lane:compile -- --lane website --pack visitor`

### Output
- `public/_compiled/website/visitor-pack.md`
- `public/_compiled/website/_meta/COMPILE_META.json`

### Verification
- `npm run verify:compiled -- --lane website --pack visitor`

### Contract
- The compiled pack MUST include a provenance header as defined in:
  - `klappy://docs/appendices/compilation`

---

## Related Documents

- Lane architecture: `/docs/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/docs/appendices/compilation.md`
- Media philosophy: `/odd/appendices/media-as-learning-layer.md`



--------------------------------------------------------------------------------
📄 File: products/website/README.md
--------------------------------------------------------------------------------

---
uri: klappy://products/website
title: "Website Lane"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["products", "website", "lane", "index"]
---

# Website Lane

> Human-facing orientation surface for ODD.

## Description

The website lane produces klappy.dev—the public-facing website that explains ODD progressively to human visitors. This is portfolio, explanation, and credibility layer. It does NOT teach agents how to think or execute ODD; it explains ODD to humans through progressive disclosure UX.

## Outline

- Contents
- Lane Status
- Key Constraints
- Starting an Attempt

---

## Contents

| File | Purpose |
|------|---------|
| `PRD.md` | Active PRD (v1.2) |
| `LEDGER.md` | Append-only product memory |
| `attempts/` | Attempt artifacts |
| `src/` | Current implementation source |
| `prompts/` | Lane-specific kickoff prompts |

---

## Lane Status

| Field | Value |
|-------|-------|
| **PRD Version** | v1.2 |
| **Epoch** | E0003 (evidence-first) |
| **Status** | Active |
| **Last Champion** | PRD v1.0 (promoted 2026-01-19) |

---

## Key Constraints

- First load shows ≤7 navigational items
- Mobile usable without horizontal scrolling
- Progressive disclosure tiers respected (Tier 0/1/2)
- **Online evidence required** (Cloudflare Preview URL + Evidence URL)

---

## Starting an Attempt

1. Read `/infra/prompts/attempt-kickoff/BOOTSTRAP.md`
2. Run `attempt:register --lane website`
3. Run `attempt:nuke --lane website`
4. Follow `/infra/prompts/attempt-kickoff/website.md`

See `/docs/ATTEMPTS.md` for the full lifecycle.

---

## See Also

- [PRD](PRD.md) — Current requirements
- [Product Lanes](/docs/appendices/product-lanes.md) — Lane architecture
- [Online Evidence](/docs/appendices/online-evidence.md) — Evidence requirements



--------------------------------------------------------------------------------
📄 File: products/website/prompts/ATTEMPT_KICKOFF.md
--------------------------------------------------------------------------------

# Website Lane — Attempt Kickoff (Canonical)

## Attempt Artifacts Location

All attempt artifacts MUST be written under:

```
/products/website/attempts/
```

Never under repo-root `/attempts/` (legacy, read-only).

---

## Non-Negotiables (Evidence-First)

This attempt is NOT complete unless all items below are true.

### Required outcome
1) The attempt branch is pushed to `origin` (Cloudflare must be able to build it).
2) Cloudflare Pages serves BOTH endpoints with HTTP 200:
   - `/` (the app)
   - `/_evidence/` (the evidence index)
3) Proof assets are present in the deployed build under `/_evidence/`:
   - At least 3 screenshots OR 1 recording (video).

### Forbidden
- DO NOT use `wrangler pages deploy` (or any wrangler deploy command). Ever.
- DO NOT claim "pending" completion. If the Cloudflare preview is not reachable, the attempt is FAILED.

### Evidence check (required)
After pushing, verify HTTP 200:
- `curl -I https://<preview>/`
- `curl -I https://<preview>/_evidence/`

If either is not 200, the attempt is not complete.

---

## Attempt Workflow (Minimal)

1) Register the attempt (provenance) using the repo attempt CLI.
2) Nuke the website lane work area.
3) Implement the website PRD (in `products/website/src`).
4) Build using lane build:
   - `npm run build -- --lane website`
5) Ensure deployed evidence exists at:
   - `/_evidence/` (and contains index + proof assets)
6) Push branch to origin.
7) Confirm Cloudflare preview URLs return HTTP 200.
8) Write final notes to the run evidence folder.

---

## Champion Promotion (REQUIRED)

After a champion is selected and recorded in `products/website/LEDGER.md`:

1. A **Promotion PR** MUST be created.
2. The PR MUST:
   - Target `main`
   - Contain only:
     - The champion's `products/website/src/**`
     - Any required config changes for production
   - Reference:
     - Champion commit SHA
     - Evidence URL
     - Ledger entry
3. No other PR may be merged to promote a champion.
4. Merging this PR is the moment the product enters production.

**If no Promotion PR exists, production has not occurred, even if previews exist.**

---

## Lifecycle Summary

```
Attempt → Evidence → Champion Selection → Promotion PR → Production
                                              ↑
                                    (This is the gate)
```

- Attempts are experiments.
- Champion selection is evaluation.
- Promotion is the explicit, human-approved action that makes code production.

These phases are distinct. None may be skipped.



--------------------------------------------------------------------------------
📄 File: products/website/prompts/ONE_LINER.md
--------------------------------------------------------------------------------

Use /products/website/prompts/ATTEMPT_KICKOFF.md verbatim.

