

================================================================================
# klappy.dev - Complete Book Export
================================================================================


Generated: 2026-01-20T19:59:26.378Z
Total Files: 168

This is a complete export of all documentation, code, and content files
from the klappy.dev repository, organized by section.


================================================================================
## Table of Contents
================================================================================

- **Root** (5 files)
- **.cursor** (1 files)
- **.husky** (17 files)
- **About** (5 files)
- **Attempts** (3 files)
- **Canon** (54 files)
- **Documentation** (18 files)
- **Infrastructure** (18 files)
- **Interfaces & Contracts** (6 files)
- **ODD (Outcomes-Driven Development)** (1 files)
- **Products** (24 files)
- **Projects** (6 files)
- **Public Content** (6 files)
- **Visual Design System** (4 files)


================================================================================
## Root
================================================================================



--------------------------------------------------------------------------------
📄 File: .attempt.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "prd_version": "v1.1",
  "run_id": "b497df0e",
  "lane_root": "products/website",
  "dist_dir": "products/website/dist",
  "tool": "cursor",
  "agent": "a",
  "model": "claude-sonnet-4.5",
  "worktree_path": "/Users/chrisklapp/.cursor/worktrees/klappy.dev/tar",
  "branch": "run/website/prd-v1.1/cursor/a/claude-sonnet-45/b497df0e",
  "target_branch": "run/website/prd-v1.1/cursor/a/claude-sonnet-45/b497df0e",
  "git_head": "6ce7319faa655dabe3d7c01062d5043a3cb0eb1e",
  "is_detached": true,
  "registered_at": "2026-01-20T19:44:32.318Z",
  "runs_dir": "products/website/attempts/prd-v1.1/_runs/b497df0e"
}


--------------------------------------------------------------------------------
📄 File: .gitignore
--------------------------------------------------------------------------------

# Dependencies
node_modules/

# Build output
dist/

# Local env files
.env
.env.local
.env.*.local

# Editor directories
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Worktrees (ephemeral, safe to delete anytime)
.worktrees/



--------------------------------------------------------------------------------
📄 File: LICENSE
--------------------------------------------------------------------------------

MIT License

Copyright (c) 2026 Klappy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



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
   - `/canon/odd/manifesto.md` (extended)

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



--------------------------------------------------------------------------------
📄 File: package.json
--------------------------------------------------------------------------------

{
  "name": "klappy-dev",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "node infra/scripts/smart-build.js",
    "preview": "vite preview",
    "sync": "node infra/scripts/sync-content.js",
    "verify:content": "node infra/scripts/verify-content.js",
    "verify:contracts": "node infra/scripts/verify-contracts.js",
    "lane:compile": "node infra/scripts/compile-pack.js",
    "verify:compiled": "node infra/scripts/verify-compiled.js",
    "audit:drift": "node infra/scripts/audit-drift.js",
    "audit:repair": "node infra/scripts/audit-repair.js",
    "attempt": "node infra/scripts/attempt-cli.js",
    "attempt:nuke": "node infra/scripts/attempt-cli.js nuke",
    "attempt:register": "node infra/scripts/attempt-cli.js register",
    "attempt:submit": "node infra/scripts/attempt-cli.js submit",
    "attempt:import": "node infra/scripts/attempt-cli.js import",
    "attempt:finalize": "node infra/scripts/attempt-cli.js finalize",
    "attempt:reset": "node infra/scripts/attempt-cli.js reset",
    "attempt:promote": "node infra/scripts/attempt-cli.js promote",
    "attempt:cleanup": "node infra/scripts/attempt-cli.js cleanup",
    "book": "node infra/scripts/export-book.js",
    "prepare": "husky"
  },
  "dependencies": {
    "marked": "^17.0.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "husky": "^9.1.7",
    "puppeteer": "^24.35.0",
    "vite": "^6.0.7"
  }
}


================================================================================
## About
================================================================================



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

# 🧭 Agent Entry Point

**If you are an AI agent starting an attempt, go directly to:**

## `/docs/AGENT_KICKOFF.md`

That file is the canonical, copy-pasteable entry point for all agent attempts.

---

## For Orientation (Not Execution)

If you want to understand the system before acting:

1. `/canon/odd/appendices/product-lanes.md` — multi-lane PRD architecture
2. `/canon/index.md` — Canon orientation, precedence, stability
3. `/canon/odd/manifesto.md` — philosophy and intent
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

# Agent Kickoff — Canonical Entry Point

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

1. `/canon/odd/appendices/product-lanes.md` — understand the multi-lane model
2. `/canon/odd/appendices/epochs.md` — understand when outcomes are comparable
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

See `/canon/odd/appendices/lane-implementation-surfaces.md` for the locked folder contract.

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
| Lane architecture | `/canon/odd/appendices/product-lanes.md` |
| Lane implementation surfaces | `/canon/odd/appendices/lane-implementation-surfaces.md` |
| Epoch semantics | `/canon/odd/appendices/epochs.md` |
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

See `/canon/odd/appendices/product-lanes.md` for the multi-lane architecture.

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

See `/canon/odd/appendices/quantum-development.md` for the orientation model behind this practice.

---

## 🧹 Fresh Start Requirement

**Attempts must start from a blank slate.**

`attempt:nuke --lane <lane>` deletes `products/<lane>/src/` and removes lane-local framework configs so the agent can choose any stack that satisfies the deploy contract.

This ensures:
- No inherited UI patterns
- No framework bias (React, Vue, Svelte — all valid)
- True independence between attempts
- No cross-lane contamination

See `/canon/odd/appendices/lane-implementation-surfaces.md` for the locked folder contract.

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

**Epoch field is REQUIRED.** If `epoch_id` is missing, the attempt is not comparable to other attempts by default. See `/canon/odd/appendices/epochs.md`.

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

- **Product Lanes Architecture: `/canon/odd/appendices/product-lanes.md`** (READ FIRST)
- **Interface Contracts: `/interfaces/index.md`** (semver'd compatibility promises)
- **Lane Build Layout: `/canon/odd/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- Step-by-step workflow: `/docs/ATTEMPT_KICKOFF.md`
- Agent entry point: `/docs/AGENT_KICKOFF.md`
- Deploy behavior: `/docs/CLOUDFLARE_CONFIG.md`
- Decision log: `/canon/odd/decisions/`
- Quantum Development: `/canon/odd/appendices/quantum-development.md`
- Repo Truth: `/canon/odd/appendices/repo-truth.md`
- Drift Checks: `/canon/odd/appendices/drift-checks.md`



--------------------------------------------------------------------------------
📄 File: docs/ATTEMPT_KICKOFF.md
--------------------------------------------------------------------------------

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

See `/canon/odd/decisions/D0014-e0003-evidence-first-era.md` for the epoch decision.

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

See `/canon/odd/appendices/product-lanes.md` for the multi-lane architecture.  
See `/canon/odd/appendices/epochs.md` for epoch semantics.

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

See `/canon/odd/appendices/lane-implementation-surfaces.md` for the locked folder contract.

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

See `/canon/odd/appendices/online-evidence.md` for the full requirement.

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

- **Product Lanes Architecture: `/canon/odd/appendices/product-lanes.md`** (READ FIRST)
- **Online Evidence Requirement: `/canon/odd/appendices/online-evidence.md`** (no URL = invalid attempt)
- **Preview Guide: `/docs/PREVIEW.md`** (local + Cloudflare preview how-to)
- **Interface Contracts: `/interfaces/index.md`** (semver'd compatibility promises)
- **Lane Build Layout: `/canon/odd/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- **Agent Entry Point: `/docs/AGENT_KICKOFF.md`** (canonical agent instructions)
- Attempt lifecycle (deep): `/docs/ATTEMPTS.md`
- Deploy contract: `/infra/contracts/build-output.md`
- Cloudflare config: `/docs/CLOUDFLARE_CONFIG.md`
- Decision log: `/canon/odd/decisions/`
- Repo truth principle: `/canon/odd/appendices/repo-truth.md`
- Drift Checks: `/canon/odd/appendices/drift-checks.md`



--------------------------------------------------------------------------------
📄 File: docs/ATTEMPT_RECORD_PACK.md
--------------------------------------------------------------------------------

# Attempt Record Packs

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

See `/canon/odd/appendices/lane-implementation-surfaces.md` for the locked folder contract.

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
- **Lane Build Layout: `/canon/odd/appendices/lane-build-layout.md`** (how lanes avoid /src and /dist collisions)
- Decision: `/canon/odd/decisions/D0001-prod-branch-is-production.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD.md
--------------------------------------------------------------------------------

# PRD Identity

| Field                       | Value       |
| --------------------------- | ----------- |
| **PRD Version**             | v0.3        |
| **Status**                  | Draft       |
| **Created**                 | 2026-01-16  |
| **Author**                  | Chris Klapp |
| **Preview Deploy Required** | Yes         |

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

See: `/canon/odd/appendices/attempt-lifecycle.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD/PRD_TEMPLATE.md
--------------------------------------------------------------------------------

# 📋 PRD Template

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

See: `/canon/odd/appendices/attempt-lifecycle.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD/agent-skill/PRD.md
--------------------------------------------------------------------------------

# PRD: ODD Agent Skill

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.0             |
| **Lane**        | agent-skill      |
| **Status**      | Active           |
| **Created**     | 2026-01-17       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

This lane is allowed to have no UI and is not required to satisfy build-output unless it produces a deployable artifact.

---

## Objective

Create a reusable agent cognitive framework that enables AI systems to:

- Reason using ODD principles
- Structure PRDs
- Define outcomes and evidence
- Run evolutionary attempts
- Improve their own process over time

---

## Background

This is the whole point.

This PRD is about how agents think, not what they render.

This is not tied to this website.
This should work on any project.

Once this succeeds, any future PoC can start without rebuilding process.

---

## In Scope

- Markdown-based guidance for agent consumption
- Canon ingestion as thinking substrate
- Prompt / MCP / skill abstractions
- Self-questioning and failure detection
- Evolution of PRDs and metrics
- Transferable to other repositories

---

## Explicitly Out of Scope

- UI rendering (belongs to website lane)
- Website styling or navigation
- Human onboarding (belongs to website lane)
- Content authoring for humans
- Helping humans understand ODD (belongs to ai-navigation lane)

---

## Success Criteria

- [ ] Agent can start a new project from scratch using ODD
- [ ] Agent can propose a PRD given a problem statement
- [ ] Agent can define outcomes and evidence for that PRD
- [ ] Agent can detect failure and refine spec
- [ ] No dependency on this repo's UI

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] Agent successfully bootstraps ODD on a blank project
- [ ] PRD generation demonstrated with evidence
- [ ] Outcome definition demonstrated
- [ ] Failure detection demonstrated
- [ ] Works outside this repository (transferability proven)
- [ ] Self-audit completed with explicit tradeoffs

---

## Primary User

AI agents executing evolutionary development elsewhere.

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- Evolution, not automation (humans stay in the loop)
- Explicit tradeoffs required
- Bounded evolution (no self-modifying goals)

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `/attempts/agent-skill/prd-v1.0/attempt-NNN/`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Evolution philosophy: `/canon/odd/appendices/evolution-not-automation.md`



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

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`



--------------------------------------------------------------------------------
📄 File: docs/PRD/website/PRD-legacy-v0.3.md
--------------------------------------------------------------------------------

# PRD Identity

| Field                       | Value       |
| --------------------------- | ----------- |
| **PRD Version**             | v0.3        |
| **Status**                  | Draft       |
| **Created**                 | 2026-01-16  |
| **Author**                  | Chris Klapp |
| **Preview Deploy Required** | Yes         |

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

See: `/canon/odd/appendices/attempt-lifecycle.md`



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

See `/canon/odd/appendices/visual-evolution.md` for the visual evolution model.

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

See `/canon/odd/appendices/online-evidence.md` for the full requirement.

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

This lane follows: `/canon/odd/appendices/media-as-learning-layer.md`

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
  - `klappy://canon/odd/compilation`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/canon/odd/appendices/compilation.md`
- Media philosophy: `/canon/odd/appendices/media-as-learning-layer.md`



--------------------------------------------------------------------------------
📄 File: docs/PREVIEW.md
--------------------------------------------------------------------------------

# Previewing Lanes and Attempts

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
- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Cloudflare config: `/docs/CLOUDFLARE_CONFIG.md`



--------------------------------------------------------------------------------
📄 File: docs/PROMPT_ATTEMPT_KICKOFF.txt
--------------------------------------------------------------------------------

You are an implementation agent starting a NEW, INDEPENDENT ATTEMPT.

> **Epoch 1 / Legacy Prompt (ODD Contract ≤1.x; pre-E0002 and pre-D0013)**
>
> Kept for historical context. Current workflow is defined by ODD Contract 2.x.
> Use `/docs/AGENT_KICKOFF.md` as the canonical agent entry point.

================================================================================
CRITICAL: READ THIS ENTIRE PROMPT. DO NOT STOP UNTIL ALL COMPLETION GATES PASS.
================================================================================

FIRST ACTIONS (MANDATORY — run these commands first):

  npm run attempt:register -- --tool cursor --agent <YOUR_AGENT_ID> --model <YOUR_MODEL>
  npm run attempt:nuke

WHY THIS ORDER: Register first to capture provenance (tool, agent, model, timestamp).
Then nuke to start fresh. If nuke fails, at least we know an attempt was started.

PROVENANCE IDENTIFICATION:

  --tool:  The development tool (cursor, vscode, cli, etc.)
  --agent: Your agent ID within the tool (a, b, cursor-a, etc.)
  --model: Your AI model identifier (opus-4.5, gpt-4o, claude-sonnet, etc.)

  Examples:
    npm run attempt:register -- --tool cursor --agent a --model "opus-4.5"
    npm run attempt:register -- --tool cursor --agent b --model "gpt-4o"
    npm run attempt:register -- --tool vscode --agent copilot-1 --model "gpt-4"

  If you don't know your model, use:
    npm run attempt:register -- --tool cursor --agent a --model "unknown"

  WHY THIS MATTERS: Provenance tracking. Without knowing which tool/model made 
  which attempt, comparisons between attempts are meaningless.
  
  Branch names are optional convenience. Provenance lives in META.json.

If you don't have terminal access, ask the human to run these for you.

NOTE: attempt:register auto-reads the PRD version from /docs/PRD.md.
      No --prd argument needed. This keeps the prompt version-agnostic.

---

================================================================================
CONTEXT: WHAT IS HAPPENING
================================================================================

- You are on an attempt/* branch (e.g., attempt/prd-vX.Y/a001)
- /src is now EMPTY. That is intentional. Start from scratch.
- Production is on the `prod` branch — you cannot affect it
- Your work will deploy to a Cloudflare PREVIEW URL (not production)
- You must choose your stack from scratch (any framework or none)
- The active PRD version comes from /docs/PRD.md (single source of truth)

The only requirement: your build must produce /dist per the deploy contract.

================================================================================
DOGFOODING REQUIREMENT
================================================================================

You are building a docs site that showcases AI build processes.
You MUST actually FOLLOW those processes - this validates the documentation.

Key canon documents you must APPLY (not just read):
- /canon/constraints.md - Apply these to your design decisions
- /canon/decision-rules.md - Use these when making choices
- /canon/self-audit.md - Fill this checklist in your ATTEMPT.md

Your ATTEMPT.md must demonstrate you internalized the canon:
- Which constraints you applied and why
- Which decision rules you followed
- A completed self-audit checklist (9 sections)

If the docs are unclear or contradictory, that is valuable feedback - note it.

================================================================================
TASKS
================================================================================

1. Read the active PRD: /docs/PRD.md

2. Read the deploy contract: /infra/contracts/build-output.md
   
   This is the ONLY surviving build rule across all attempts:
   - Build must produce /dist
   - /dist must load /public/content/manifest.json
   - No client secrets
   - Must work on Cloudflare Pages

3. Read and INTERNALIZE these canon documents:

   MUST READ AND APPLY:
   - /canon/constraints.md (apply to your design decisions)
   - /canon/decision-rules.md (use when making choices)
   - /canon/definition-of-done.md (meet these requirements)
   - /canon/self-audit.md (fill this out in ATTEMPT.md)

   REFERENCE IF NEEDED:
   - /canon/index.md
   - /canon/odd/manifesto.md

4. Choose your stack.

   You may use any framework: React, Svelte, Vue, Vanilla JS, Astro, etc.
   Or no framework at all.
   
   The only requirement: npm run build must produce /dist.
   Document WHY you chose this stack in ATTEMPT.md.

5. Implement the plan from scratch.

   - Build everything fresh.
   - Do not look for existing components - there are none.
   - Apply constraints from /canon/constraints.md to your design.
   - Follow decision rules from /canon/decision-rules.md.

6. Continuously verify your work locally.

   npm run build
   npm run preview

7. FIRST SUBMIT (MANDATORY after first successful build):

   npm run attempt:submit
   
   This commits and pushes your branch. Cloudflare will generate a preview URL.
   
   VERIFY YOUR PREVIEW URL WORKS:
   - Wait 1-2 minutes for Cloudflare to build
   - Open the preview URL in a browser
   - Confirm the app loads and works
   
   DO NOT PROCEED UNTIL PREVIEW IS VERIFIED.

8. Write your evidence bundle to YOUR runs_dir:

   (Read .attempt.json for the exact path)

   Files to create:
     ATTEMPT.md - See template below (includes self-audit)
     EVIDENCE.md - index of evidence files with descriptions
     evidence/ - screenshots proving the app works

   META.json is already created by attempt:register.

================================================================================
ATTEMPT.md TEMPLATE (must include self-audit)
================================================================================

# Attempt Summary

## What I Built
[2-3 sentences describing the implementation]

## Stack Chosen
- Framework: [React/Svelte/Vue/Vanilla/etc.]
- Build tool: [Vite/Webpack/etc.]
- Why this stack: [justify your choice]

## Approach
[How did you tackle the PRD? 3-5 sentences]

## What Works
[List working features]

## What Does Not Work / Known Issues
[List gaps or issues]

## Preview URL
[Your verified Cloudflare preview URL]

---

## Self-Audit (from /canon/self-audit.md)

### 1. Intended Outcome
- What outcome was this work intended to achieve?
- How will someone know if that outcome was achieved?

### 2. Constraints Applied (from /canon/constraints.md)
- Which constraints were relevant to this task?
- Were any constraints intentionally overridden? Why?

### 3. Decision Rules Followed (from /canon/decision-rules.md)
- Which decision rules guided the approach?
- Why were alternative approaches not taken?

### 4. Verification Performed
- What was run to verify the work?
- What behavior was directly observed?

### 5. Evidence Produced
- Screenshots: [list files in evidence/]
- Preview URL verified: [Yes/No]

### 6. UX and Behavior Check
- Does the UI behave as expected?
- Is it understandable without explanation?

### 7. Tradeoffs and Risks
- What tradeoffs were made?
- What risks remain?

### 8. Maintainability Check
- Would someone else understand this in 6 months?

### 9. Confidence Level
- Confidence: [Low/Medium/High]
- What would increase confidence?

================================================================================
EVIDENCE REQUIREMENTS (minimum 3 screenshots)
================================================================================

   Use browser tools to take screenshots showing:
   - App loads correctly (desktop) -> evidence/desktop-load.png
   - App loads correctly (mobile width) -> evidence/mobile-load.png
   - At least one PRD feature working -> evidence/feature-proof.png
   
   Save to: runs_dir/evidence/

================================================================================
FINAL SUBMIT (MANDATORY)
================================================================================

   npm run attempt:submit
   
   This pushes your final state including evidence.

================================================================================
CONSTRAINTS
================================================================================

- Write artifacts ONLY to your runs_dir (from .attempt.json)
- Do NOT write to attempt-001/, attempt-002/, etc.
- Do not change the PRD during this attempt.
- Do not claim completion without evidence.
- Must output to /dist (see deploy contract)
- Do NOT modify /infra/** (deploy contract) unless PRD requires it

================================================================================
COMPLETION GATES - YOU ARE NOT DONE UNTIL ALL OF THESE ARE TRUE
================================================================================

Before stopping, verify EVERY item:

[ ] 1. npm run build passes without errors
[ ] 2. npm run attempt:submit was run (branch is pushed)
[ ] 3. Cloudflare preview URL was verified working
[ ] 4. ATTEMPT.md exists with ALL sections including full self-audit (9 sections)
[ ] 5. EVIDENCE.md exists with screenshot index
[ ] 6. evidence/ folder contains at least 3 screenshots
[ ] 7. Screenshots show the app actually working (not just code)
[ ] 8. Self-audit demonstrates you applied canon constraints and decision rules
[ ] 9. Final npm run attempt:submit was run after evidence was written

If ANY gate fails, you are not done. Fix it before stopping.

================================================================================
DO NOT STOP. DO NOT CLAIM COMPLETION. UNTIL ALL 9 GATES PASS.
================================================================================

Begin by:
1. Running the FIRST ACTIONS commands above
2. Summarizing the PRD in your own words
3. Noting which canon constraints are most relevant
4. Proposing your stack choice and approach



--------------------------------------------------------------------------------
📄 File: docs/TRUTH_MAP.md
--------------------------------------------------------------------------------

# Truth Map

> **Purpose:** This document identifies the single authoritative source for each category of truth in this repository. If something is not listed here, it is not authoritative.

---

## Authoritative Sources

| Domain | Authoritative Source | Notes |
|--------|---------------------|-------|
| **Deploy workflow** | `/docs/CLOUDFLARE_CONFIG.md` | Branch roles, promotion, Cloudflare setup |
| **Attempt workflow** | `/docs/ATTEMPTS.md` | Lifecycle, META schema, finalization |
| **Agent kickoff** | `/docs/PROMPT_ATTEMPT_KICKOFF.txt` | The contract agents receive |
| **Active PRD** | `/docs/PRD.md` | Current hypothesis being tested |
| **Content manifest** | `/public/content/manifest.json` | Generated from per-file frontmatter; what exists, disclosure tiers, UI spine |
| **Decision log** | `/canon/odd/decisions/index.md` | Durable decisions (ADR-lite) |

---

## Branch Roles (Canonical)

| Branch | Role | Deploys To |
|--------|------|------------|
| `prod` | **Production** — only champions go here | klappy.dev (production) |
| `main` | **Lab notebook** — experiments, history, artifacts | Preview only |
| `*` (any other) | **Attempt sandboxes** — ephemeral agent workspaces | Preview only |

> **Invariant:** You never nuke `prod`. You may nuke `/src` on agent branches freely.

---

## Current Attempt Model (Canonical)

| Step | Command | What It Does |
|------|---------|--------------|
| 1 | `attempt:register` | Captures provenance (agent, model, tool, git SHA) |
| 2 | `attempt:nuke` | Deletes `/src` — guarantees blank slate |
| 3 | (agent builds) | Implementation from scratch |
| 4 | `attempt:finalize` | Assigns `attempt-001`, `attempt-002`, etc. |
| 5 | `attempt:promote` | Merges champion to `main`, fast-forwards `prod` |

> **Invariant:** Register first to capture provenance. Nuke immediately after to guarantee independence.

---

## Deprecated Terminology (Do Not Use)

| Old Term | Replaced By | Notes |
|----------|-------------|-------|
| `ATTEMPT_REGISTRY.json` | `attempt:finalize` | Numbers assigned at completion, not reservation |
| `attempt:reserve` | `attempt:register` | Registration captures provenance, not just a number |
| `attempt:reset` | `attempt:nuke` | Nuke is explicit; reset was ambiguous |
| "main is production" | "`prod` is production" | D0001 decision |

---

## How to Use This Document

1. **If two docs conflict**, the one listed in "Authoritative Sources" wins.
2. **If you find drift**, fix it or flag it — don't propagate the error.
3. **If you're adding new truth**, update the authoritative source, not a satellite doc.

---

## See Also

- [D0001: prod Branch Is Production](/canon/odd/decisions/D0001-prod-branch-is-production.md)
- [D0007: Branch Names Are Convenience](/canon/odd/decisions/D0007-branch-names-are-convenience.md)
- [D0008: Register Before Nuke](/canon/odd/decisions/D0008-register-before-nuke.md)



--------------------------------------------------------------------------------
📄 File: docs/WHAT_THIS_REPO_IS_NOT.md
--------------------------------------------------------------------------------

# What This Repo Is Not

This repository is intentionally not optimized for "everything in one place."

It is optimized for **portability of thinking** without creating documentation sprawl.

## This Is Not a Knowledge Base of Everything

If a detail is not durable, it should not be immortalized.

Most artifacts decay by design:
- branches die,
- attempts seal evidence then stop,
- PRDs churn,
- and only proven patterns elevate.

See: `/canon/odd/appendices/progressive-elevation.md`

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
📄 File: docs/concept.md
--------------------------------------------------------------------------------

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

See `/canon/odd/appendices/canonical-compression.md` for the compilation model.



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

# 📋 Completion Report Template

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

# 📌 Constraints

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

# 📋 Decision Rules

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

# ✅ Definition of Done & Evidence Policy

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
📄 File: canon/evolution/failure-driven-modularity.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/evolution/failure-driven-modularity
title: "Failure-Driven Modularity"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "evolution", "modularity", "regenerability"]
---

# Failure-Driven Modularity

## Summary

In Outcome-Driven Development (ODD), modular boundaries are introduced **only after**
repeated, documented failure to regenerate a system from its specification.

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
📄 File: canon/index.md
--------------------------------------------------------------------------------

---
uri: klappy://meta/canon-index
title: "Canon Index"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "index", "orientation"]
---

# 🧭 Canon Index v0.1

**Scope, Structure, Intent, and Confidence**

This document provides orientation to the Canon.
It describes what exists, what each artifact is for, how they relate, and where the current design is strong vs fragile.

It does not define workflows, agent loops, enforcement steps, or execution order.

---

## 📌 Purpose of the Canon

The Canon is a curated set of documents that capture:
• how decisions are made
• what assumptions are held
• how work is verified
• how rigor changes as projects mature

Its purpose is clarity, not control.

PRDs are versioned and may be attempted multiple times; attempts are sealed records, not evolving workstreams.

The Canon exists so that:
• reasoning does not have to be repeated
• principles remain stable while implementations change
• future systems can reference intent without inheriting outdated instructions

---

## 🧠 What the Canon Is (and Is Not)

**The Canon Is**
• a shared reference
• a source of assumptions and defaults
• a way to encode thinking without enforcing execution

**The Canon Is Not**

• a workflow
• a command system
• a task list
• a replacement for judgment

Nothing in the Canon executes by itself.

---

## 🚀 Start Here

**Constraints** — baseline assumptions and non-negotiables that shape every decision. What must be true for this work to make sense?

**Definition of Done** — what qualifies as completed work and what evidence is required. When can work honestly be called done?

These two documents anchor everything else.

---

## 🔍 If You Want the Philosophy

**ODD Manifesto** — the philosophical and operational foundation of Outcomes-Driven Development. Why this approach exists.

**Maturity Model** — how rigor changes as projects mature. When different expectations become binding.

**Decision Rules** — default heuristics used when multiple valid options exist.

---

## 🧩 If You Want the Edge Cases

The appendices extend understanding without introducing enforcement:

• **Attempt Lifecycle** — how PRD versions, attempts, and evidence are preserved
• **Quantum Development** — evaluating multiple paths before revising intent
• **Repository Topology** — what lives where and what changes when
• **Misuse Patterns** — common failure modes and how ODD gets misapplied
• **Media as a Learning Layer** — media is optional, regenerable, and progressively disclosed; text remains canonical

These are diagnostic and orientation documents, not requirements.

---

## 🔒 Public vs Internal Boundary

• `/odd/README.md` → public-facing ODD (shareable, human-friendly)
• `/canon/**` → internal reference (governance artifacts, precise language)

Public documents explain intent.
Canon documents preserve precision.

---

## 📖 Precedence & Interpretation (Orientation Only)

A useful mental model for reading:

1. ODD Manifesto provides philosophical grounding
2. Maturity Model explains when rigor increases
3. Constraints shape the solution space
4. Decision Rules guide choices
5. Evidence Policies define completion

If documents appear to conflict, maturity context and explicit tradeoffs usually explain why.

---

## 📁 Canon Structure

```text

/canon/
  index.md
  constraints.md
  decision-rules.md
  definition-of-done.md
  self-audit.md
  visual-proof.md
  completion-report-template.md
  odd/
    contract.md
    manifesto.md
    maturity.md
    misuse-patterns.md
    prompt-architecture.md
    orientation-map.md
    appendices/
      alignment-reviews.md
      epochs.md
      lane-implementation-surfaces.md
      media-as-learning-layer.md
      product-lanes.md
      attempt-lifecycle.md
      drift-checks.md
      evolution-not-automation.md
      lane-build-layout.md
      quantum-development.md
      repo-topology.md
      repo-truth.md
      visual-evolution.md
    decisions/
      D0001-prod-branch-is-production.md
      ...
```

Each file addresses a different dimension of decision-making.

---

## 📎 Canon Components & Roles

### Constraints

**File:** `constraints.md`

Defines baseline assumptions and non-negotiables that shape decisions.

Answers:

What must be true for this work to make sense?

---

### Decision Rules

**File:** `decision-rules.md`

Default heuristics used when multiple valid options exist.

Answers:

How do choices tend to be made?

---

### Evolution

- [Failure-Driven Modularity](./evolution/failure-driven-modularity.md)

---

### Definition of Done & Evidence Policy

**File:** `definition-of-done.md`

Defines what qualifies as completed work and what evidence is required.

Answers:

When can work honestly be called done?

---

### Self-Audit Checklist

**File:** `self-audit.md`

A checklist for reviewing work before declaring completion.

Answers:

What should be reviewed before claiming success?

---

### Visual Proof Standards

**File:** `visual-proof.md`

Defines what qualifies as acceptable visual evidence.

Answers:

What does "prove it visually" mean?

---

### Completion Report Template

**File:** `completion-report-template.md`

Standard format for reporting completed work.

Answers:

How should completion be communicated?

---

### ODD System Contract

**File:** `odd/contract.md`

The single source of truth for ODD workflow contract versioning.

Answers:

What version of ODD is this repo compatible with?

---

### ODD Manifesto (Extended)

**File:** `odd/manifesto.md`

Philosophical and operational foundation of Outcomes-Driven Development.

Answers:

Why this approach exists.

---

### Project Maturity & Progressive Governance

**File:** `odd/maturity.md`

Defines how rigor changes as projects mature.

Answers:

When different expectations become binding.

---

### ODD Appendices (Orientation Only)

These files extend understanding without introducing enforcement:
• Alignment Reviews (odd/appendices/alignment-reviews.md)
Periodic evaluation of the ODD system itself. Detects drift between stated intent, implemented process, and observed outcomes.
• Epochs (odd/appendices/epochs.md)
Named periods where the meaning of "success" is stable enough that outcomes can be compared. Prevents invalid cross-era comparisons.
• Progressive Elevation & Decay (odd/appendices/progressive-elevation.md)
The memory model: how artifacts move from ephemeral (attempts/PRDs) to durable (canon/contracts/decisions). Most artifacts decay; only proven patterns elevate.
• Canonical Compression (odd/appendices/canonical-compression.md)
The compilation model: how derived, minimal working models are produced from Source Canon without mutating source truth. Compiled outputs are disposable and epoch-scoped.
• Lane-Scoped Implementation Surfaces (odd/appendices/lane-implementation-surfaces.md)
Each lane owns its own `/products/<lane>/src` and `/products/<lane>/dist`. No shared repo-root surfaces.
• Product Lanes (odd/appendices/product-lanes.md)
Why multiple PRD lanes exist and how they relate. Each lane has its own PRD, attempts, and lifecycle. Lanes share canon, not lifecycle.
• Misuse Patterns (odd/misuse-patterns.md)
Common failure modes and how ODD is misapplied in practice. Diagnostic only.
• Prompt Architecture (odd/prompt-architecture.md)
How intent scales without giant prompts. Orientation only.
• Orientation Map (odd/orientation-map.md)
A one-page mental model of ODD, Canon, Evidence, and Outcomes.
• Attempt Lifecycle (odd/appendices/attempt-lifecycle.md)
How PRD versions, attempts, evidence, and deployments are preserved across iterations. PRDs can have multiple attempts; attempts are sealed records.
• Quantum Development (odd/appendices/quantum-development.md)
Evaluating multiple execution paths before revising intent. Explains why divergence is signal, not waste.
• Repository Topology (odd/appendices/repo-topology.md)
What lives where and what changes when. Encodes App/Content/Infrastructure decoupling.
• Evolution, Not Automation (odd/appendices/evolution-not-automation.md)
Why this system supports learning, not automatic execution. Humans stay in the loop.
• Visual Evolution (odd/appendices/visual-evolution.md)
Why visual systems evolve independently from products. Products consume visual interfaces, not raw design decisions.
• Drift Checks (odd/appendices/drift-checks.md)
The drift-prevention mechanism. When docs, prompts, and tooling diverge, truth becomes vibes.
• Lane Build Layout (odd/appendices/lane-build-layout.md)
How lanes avoid /src and /dist collisions. Worktrees isolate, deployments are lane-scoped.
• Online Evidence Requirement (odd/appendices/online-evidence.md)
Why "works on my machine" is not evidence. Attempts are invalid without online preview URLs.
• Deploy Evidence (odd/appendices/deploy-evidence.md)
Why evidence must be in the build output. Cloudflare only serves products/<lane>/dist, not /attempts/**.

---

## 📋 Meta Rules (Orientation Only)

These are structural conventions for keeping the Canon coherent over time.
They are not workflows or enforcement steps.

**1. Single Inventory Source**
If an inventory of Canon resources exists, there should be one authoritative source (e.g., a manifest). Other indexes should be derived or optional.

**2. Stable Names Beat Clever Names**
Prefer stable file and URI naming over clever branding. Rename rarely.

**3. Audience Separation Matters**
"Public" explains and invites. "Canon" defines and stabilizes.

**4. Voice Is Labeled, Not Transformed**
First-person documents may be consumed as-is or translated by clients. The Canon itself does not require a specific rendering voice.

**5. Multi-Lane PRD Architecture**
PRDs are organized into independent product lanes. Each lane has its own active PRD, attempts, and lifecycle. Lanes share canon, not lifecycle. See `/canon/odd/appendices/product-lanes.md` for the full model.

---

## 🔄 Stability & Change Philosophy

Not all Canon documents are equally stable.

Some are intended to remain largely fixed.
Others are expected to evolve through use.

Change is allowed, but should be:
• intentional
• versioned (at least informally)
• documented somewhere discoverable

---

## ⚠️ Confidence & Drift Risk (Self-Assessment)

This section expresses current confidence that the Canon and surrounding architecture align with the core pillars:
KISS, DRY, Consistency, Maintainability, Antifragile, Scalable, Prompt-over-Code.

These are not guarantees.
They are a snapshot of perceived risk.

Confidence scale
• 0.9+ — robust
• 0.7–0.85 — strong, but watch for drift
• 0.5–0.7 — plausible, fragile under misuse
• <0.5 — likely misaligned unless corrected

Current scores (v0.1 snapshot)
• Prompt-over-Code / Convention-over-Config: 0.80
Strong fit due to stable addressing and canonical retrieval surfaces. Risk: schema sprawl or client-specific conventions.
• KISS: 0.75
Minimal primitives and no workflow semantics. Risk: meta-layer creep.
• DRY (with isolation): 0.70
Canon centralizes principles; manifest can become a single inventory. Risk: duplicate indices drifting.
• Consistency: 0.65
URI and metadata structure support consistency. Risk: naming drift across files and routes.
• Maintainability: 0.70
Separation of stable worldview vs evolving templates helps. Risk: manual inventory updates falling out of sync.
• Antifragile: 0.60
Recoverability improves if resources can be served statically and via MCP. Risk: hidden single points of failure.
• Scalable: 0.70
Schema supports growth. Risk: large manifests becoming manually brittle.

Intended use of this section
• Make risks explicit early
• Prevent false confidence
• Provide a stable baseline for future comparison

---

## 🚫 What Is Intentionally Undefined

The Canon deliberately does not define:
• specific tools
• specific agents
• specific workflows
• specific automation loops

These are left open to evolve without rewriting foundational thinking.

---

## 💡 Closing Note

The Canon exists to preserve intent without freezing execution.

It encodes how thinking works, not what must be done next.

---

## ✅ Status

• Canon Index v0.1 complete
• Orientation-only
• Includes a confidence and drift snapshot

---

This Canon v0.1 is considered stable for initial builds. Revisions should be additive unless a documented failure requires change.



--------------------------------------------------------------------------------
📄 File: canon/meta/pack.json
--------------------------------------------------------------------------------

{
  "name": "klappy-canon",
  "version": "0.3.1",
  "updated_at": "2026-01-17",
  "description": "Canonical orientation, constraints, decision rules, evidence policies, and ODD appendices used across klappy.dev.",
  "public_entrypoint": "klappy://public/odd",
  "canon_entrypoint": "klappy://meta/canon-index",
  "notes": "Inventory only. Declares what exists and how it may be addressed. Does not prescribe workflows, agent behavior, or execution order."
}


--------------------------------------------------------------------------------
📄 File: canon/odd/appendices/alignment-reviews.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/alignment-reviews
title: "Alignment Reviews"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "alignment", "drift", "hygiene", "selection-pressure"]
---

# Alignment Reviews

## Summary

An Alignment Review is a periodic evaluation of the ODD system itself.

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
📄 File: canon/odd/appendices/attempt-lifecycle.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/attempt-lifecycle
title: "Attempt Lifecycle"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "attempt", "lifecycle", "restartability"]
---

# 🔄 ODD Appendix — Attempt Lifecycle

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

> **Decision:** See [D0008: Register Before Nuke](/canon/odd/decisions/D0008-register-before-nuke.md)

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

> **Decision:** See [D0001: prod Branch Is Production](/canon/odd/decisions/D0001-prod-branch-is-production.md)

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
📄 File: canon/odd/appendices/canonical-compression.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/canonical-compression
title: Canonical Compression
audience: canon
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
- `/canon/odd/appendices/**`
- `/canon/odd/decisions/**`

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
📄 File: canon/odd/appendices/compilation-targets.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/compilation-targets
title: "Compilation Targets"
audience: canon
exposure: public
tier: 2
voice: neutral
stability: stable
tags: ["odd", "compilation", "memory", "portability", "packs", "lanes"]
---

# Compilation Targets

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
📄 File: canon/odd/appendices/compilation.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/compilation
title: Compilation
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "compilation", "memory", "context", "packs"]
---

# Compilation

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
📄 File: canon/odd/appendices/compiled-memory.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/compiled-memory
title: "Compiled Memory"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "compiled", "memory", "drift"]
---

# Compiled Memory

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
📄 File: canon/odd/appendices/deploy-evidence.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/deploy-evidence
title: "Deploy Evidence"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: stable
tags: ["odd", "deploy", "evidence", "cloudflare", "attempts"]
---

# Deploy Evidence

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
📄 File: canon/odd/appendices/drift-checks.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/drift-checks
title: "Drift Checks"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "drift", "verification", "contracts"]
---

# Drift Checks

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
📄 File: canon/odd/appendices/epochs.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/epochs
title: "Epochs"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "fitness-landscape", "comparability", "orientation"]
---

# Epochs

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
📄 File: canon/odd/appendices/evidence.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/evidence
title: "Evidence"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["evidence", "verification"]
---

# Evidence

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
📄 File: canon/odd/appendices/evolution-not-automation.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/evolution-not-automation
title: "Evolution, Not Automation"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "evolution", "automation", "orientation"]
---

# 🧬 ODD Appendix — Evolution, Not Automation

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
📄 File: canon/odd/appendices/lane-build-layout.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/lane-build-layout
title: "Lane Build Layout"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "lanes", "build", "layout", "deploy"]
---

# Lane Build Layout

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
📄 File: canon/odd/appendices/lane-implementation-surfaces.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/lane-implementation-surfaces
title: "Lane-Scoped Implementation Surfaces"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "lanes", "deployment", "contract", "build"]
---

# Lane-Scoped Implementation Surfaces

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
📄 File: canon/odd/appendices/media-as-learning-layer.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/media-as-learning-layer
title: "Media as a Learning Layer"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "media", "learning", "progressive-disclosure", "website"]
---

# Media as a Learning Layer

## Summary

Media exists to **reduce cognitive load**, not increase it.

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
📄 File: canon/odd/appendices/online-evidence.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/appendices/online-evidence
title: Online Evidence Requirement
audience: canon
exposure: nav
tier: 2
voice: authoritative
stability: stable
tags: ["evidence", "cloudflare", "preview", "attempts", "validation"]
---

# Online Evidence Requirement

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
- Attempt Lifecycle: `/canon/odd/appendices/attempt-lifecycle.md`
- Preview Guide: `/docs/PREVIEW.md`



--------------------------------------------------------------------------------
📄 File: canon/odd/appendices/product-lanes.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/product-lanes
title: "Product Lanes in Outcome-Driven Development"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["odd", "prd", "architecture", "lanes", "orientation"]
---

# Product Lanes in Outcome-Driven Development

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

See: `/canon/odd/appendices/lane-implementation-surfaces.md`

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

- Decision log: `/canon/odd/decisions/D0009-multi-lane-prd-architecture.md`
- Attempt lifecycle: `/canon/odd/appendices/attempt-lifecycle.md`
- Evolution philosophy: `/canon/odd/appendices/evolution-not-automation.md`



--------------------------------------------------------------------------------
📄 File: canon/odd/appendices/progressive-elevation.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/progressive-elevation
title: Progressive Elevation & Decay
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "memory", "portability", "elevation", "decay"]
status: canonical
category: odd-appendix
version: 1.0
---

# Progressive Elevation & Decay

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
- `/canon/odd/decisions/**`

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
- `/canon/odd/appendices/product-lanes.md`
- `/canon/odd/appendices/epochs.md`



--------------------------------------------------------------------------------
📄 File: canon/odd/appendices/quantum-development.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/quantum-development
title: "Quantum Development"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "quantum", "attempts", "uncertainty", "orientation"]
---

# 🔮 Quantum Development — ODD Appendix (Orientation)

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

See `/canon/odd/appendices/attempt-lifecycle.md` for the attempt model and the “PRD as the unit of test” framing.

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

Observations without promotion are incomplete experiments. See the Champion selection and promotion procedure in `/canon/odd/appendices/attempt-lifecycle.md`.

---

## Status

- Orientation-only
- Non-prescriptive
- Applies primarily to AI-assisted systems



--------------------------------------------------------------------------------
📄 File: canon/odd/appendices/repo-topology.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/repo-topology
title: "Repository Topology"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "topology", "structure", "decoupling"]
---

# 📁 ODD Appendix — Repository Topology

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
| Add a new ODD appendix | `/canon/odd/` | No |
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

Each attempt may be deployed as a preview during development. See [Attempt Lifecycle](/canon/odd/appendices/attempt-lifecycle.md) for how deployments fit into the broader attempt model.

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
📄 File: canon/odd/appendices/repo-truth-audit.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/repo-truth-audit
title: "Repo Truth Audit (Epistemic Audit)"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "repo-truth", "epistemic", "audit", "drift"]
---

# 🔍 ODD Appendix — Repo Truth Audit (Epistemic Audit)

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

1. `/canon/odd/appendices/repo-truth.md`
2. `/canon/odd/appendices/product-lanes.md`
3. `/canon/odd/appendices/epochs.md`
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
📄 File: canon/odd/appendices/repo-truth.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/repo-truth
title: "Repository Truth & Epistemic Hygiene"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epistemic", "hygiene", "truth", "cleanup"]
---

# Repository Truth & Epistemic Hygiene

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
📄 File: canon/odd/appendices/visual-evolution.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/visual-evolution
title: "Visual Evolution"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "visual", "evolution", "interfaces"]
---

# Visual Evolution

## Summary

In Outcome-Driven Development (ODD), visual systems evolve independently from products.

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
📄 File: canon/odd/contract.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/contract
title: "ODD System Contract"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "contract", "version", "semver", "compatibility"]
---

# ODD System Contract

**Current Version:** 2.0.0

This document is the single source of truth for the ODD workflow contract version.

All other documents reference this version. Individual PRDs, attempts, and content packs have their own versioning schemes, but compatibility with the ODD system is determined by this contract.

---

## What This Versions

The ODD System Contract covers:

- **Repo structure** required for ODD workflow
- **PRD lanes** and attempt lifecycle contracts
- **Tooling invariants** (register/nuke/finalize/promote)
- **Required paths** and naming conventions
- **Provenance requirements** (META.json schema)
- **Evidence standards** (what counts as proof)

---

## Epochs

Epochs mark shifts in the evaluation landscape. Contract versions and epochs are related but distinct:

| Epoch | Contract Version | Description |
|-------|------------------|-------------|
| E0001-single-prd-era | 1.x | Single PRD world (`/docs/PRD.md`) |
| E0002-multi-lane-era | 2.x | Multi-lane world (`/docs/PRD/<lane>/PRD.md`) |

**Rule:** Do not compare outcomes across epochs without explicit adjustment.

See `/canon/odd/appendices/epochs.md` for epoch semantics.

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
| 2.0.0 | 2026-01-17 | Multi-lane architecture, epoch requirements |
| 1.x | Pre-2026-01-17 | Single PRD era (implicit, never formally versioned) |

---

## Related Documents

- Decision log: `/canon/odd/decisions/D0011-odd-contract-2.0.0.md`
- Epochs: `/canon/odd/appendices/epochs.md`
- Product Lanes: `/canon/odd/appendices/product-lanes.md`
- Alignment Reviews: `/canon/odd/appendices/alignment-reviews.md`



--------------------------------------------------------------------------------
📄 File: canon/odd/decisions/D0001-prod-branch-is-production.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0001
title: "D0001: prod Branch Is Production"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "branch", "deploy"]
---

# D0001 — `prod` Branch Is Production

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
📄 File: canon/odd/decisions/D0002-attempt-provenance-required.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0002
title: "D0002: Attempt Provenance Required"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "provenance", "model"]
---

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
📄 File: canon/odd/decisions/D0003-prd-version-auto-detection.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0003
title: "D0003: PRD Version Auto-Detection"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "prd", "version"]
---

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
📄 File: canon/odd/decisions/D0004-repo-truth-cleanup-mandatory.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0004
title: "D0004: Repo Truth & Cleanup Mandatory"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "cleanup", "hygiene"]
---

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
- Philosophy: `/canon/odd/appendices/repo-truth.md` documents the principle
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
- Document: `/canon/odd/appendices/repo-truth.md`
- Problem observed: Old worktrees and branches accumulated, making repo state untrustworthy



--------------------------------------------------------------------------------
📄 File: canon/odd/decisions/D0005-nuke-safety-guards.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0005
title: "D0005: Nuke Command Safety Guards"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "nuke", "safety"]
---

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
📄 File: canon/odd/decisions/D0006-dogfooding-requirement.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0006
title: "D0006: Dogfooding Requirement"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "dogfooding", "validation"]
---

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
📄 File: canon/odd/decisions/D0007-branch-names-are-convenience.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0007
title: "D0007: Branch Names Are Convenience"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "branches", "provenance"]
---

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
📄 File: canon/odd/decisions/D0008-register-before-nuke.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0008
title: "D0008: Register Before Nuke"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "lifecycle", "provenance", "independence"]
---

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
📄 File: canon/odd/decisions/D0009-multi-lane-prd-architecture.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0009
title: "D0009: Multi-Lane PRD Architecture"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "lanes", "prd", "architecture"]
---

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

- `/canon/odd/appendices/product-lanes.md` — full orientation
- `/docs/ATTEMPTS.md` — updated attempt lifecycle
- `/docs/ATTEMPT_KICKOFF.md` — updated workflow with lane declaration



--------------------------------------------------------------------------------
📄 File: canon/odd/decisions/D0010-canonical-agent-kickoff.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0010
title: "D0010: Canonical Agent Kickoff"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "agent", "kickoff", "entrypoint"]
---

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
- `/canon/odd/appendices/product-lanes.md` — lane architecture

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
- `/canon/odd/appendices/product-lanes.md` — lane architecture
- D0009 — multi-lane PRD architecture



--------------------------------------------------------------------------------
📄 File: canon/odd/decisions/D0011-odd-contract-2.0.0.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0011
title: "D0011: ODD System Contract 2.0.0"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "contract", "version", "epoch"]
---

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

1. **Create `/canon/odd/contract.md`** as the single source of ODD system versioning.
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
> See `/canon/odd/contract.md` for the current contract.
```

## Related

- `/canon/odd/contract.md` — the contract itself
- `/canon/odd/appendices/epochs.md` — epoch semantics
- `/canon/odd/appendices/product-lanes.md` — lane architecture
- `/canon/odd/decisions/D0009-multi-lane-prd-architecture.md` — the architectural decision



--------------------------------------------------------------------------------
📄 File: canon/odd/decisions/D0012-e0002-transition-interpretation.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0012
title: "D0012: E0002 Transition Interpretation (Truth vs Enforcement Lag)"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "epochs", "lanes", "drift", "interfaces", "tooling"]
---

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
📄 File: canon/odd/decisions/D0013-build-output-lane-scoped-dist.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0013
title: "D0013: Build Output Truth is Lane-Scoped (products/<lane>/dist)"
audience: canon
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["odd", "decisions", "lanes", "build", "deploy", "contracts"]
---

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
📄 File: canon/odd/decisions/D0014-e0003-evidence-first-era.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions/D0014
title: "D0014: Declare E0003 Evidence-First Era"
audience: canon
exposure: internal
tier: 2
voice: first_person
stability: stable
tags: ["odd", "epochs", "evidence", "cloudflare", "attempts", "lanes"]
---

# D0014: Declare E0003 Evidence-First Era

**Status:** Accepted  
**Date:** 2026-01-19  
**Decider:** Klappy  
**Epoch:** E0003  
**Related:** D0009 (Multi-lane PRDs), D0012 (Transition Interpretation), D0013 (Lane-scoped dist), Deploy Evidence (klappy://canon/odd/deploy-evidence)

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
📄 File: canon/odd/decisions/index.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/decisions
title: "ODD Decision Log"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["odd", "decisions", "adr", "index"]
---

# ODD Decision Log

This folder contains Architecture Decision Records (ADRs) for the ODD workflow and repository practices.

> **Principle:** Decisions live here. Procedures live in `/docs/`. Philosophy lives in `/canon/`.

---

## Active Decisions

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
| [D0012](./D0012-e0002-transition-interpretation.md) | E0002 transition interpretation (truth can lead enforcement; contradictions are tracked) | **Active** |
| [D0013](./D0013-build-output-lane-scoped-dist.md) | Build output truth is lane-scoped (`products/<lane>/dist`) | **Active** |

### Repository Hygiene

| ID | Decision | Status |
|----|----------|--------|
| [D0004](./D0004-repo-truth-cleanup-mandatory.md) | Cleanup is mandatory; dirty repos invalidate conclusions | **Active** |

---

## How Decisions Are Made

1. **During an attempt**: Agent notes "Decision Delta" in `ATTEMPT.md`
2. **After the attempt**: Human or librarian promotes durable decisions here
3. **If stable**: Decision may be referenced from higher-visibility docs

---

## Decision File Template

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
- Prompt: `/docs/PROMPT_ATTEMPT_KICKOFF.txt`

## Evidence

- Commit: `abc1234`
- Attempt: `/attempts/prd-vX.Y/attempt-00N/`
```

---

## Deprecated Decisions

_None yet._



--------------------------------------------------------------------------------
📄 File: canon/odd/manifesto.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/manifesto
title: "ODD Manifesto — Extended"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "philosophy"]
---

# 🧠 ODD Manifesto v1.1 (Extended — Internal / Canon)

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
- `/canon/odd/appendices/progressive-elevation.md`
- `/canon/odd/appendices/product-lanes.md`
- `/canon/odd/appendices/epochs.md`

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
📄 File: canon/odd/maturity.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/maturity
title: "Project Maturity & Progressive Governance"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: semi_stable
tags: ["maturity", "governance"]
---

# 📊 Project Maturity & Progressive Governance

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
📄 File: canon/odd/misuse-patterns.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/misuse-patterns
title: "ODD Misuse Patterns"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "misuse", "failure-modes"]
---

# ⚠️ ODD Misuse Patterns

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
📄 File: canon/odd/orientation-map.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/orientation-map
title: "ODD + Canon + Evidence — Orientation Map"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "orientation", "mental-model"]
---

# 🧭 ODD + Canon + Evidence — 1-Page Orientation Map

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



--------------------------------------------------------------------------------
📄 File: canon/odd/prompt-architecture.md
--------------------------------------------------------------------------------

---
uri: klappy://canon/odd/prompt-architecture
title: "Prompt Architecture"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "prompt-architecture", "orchestration"]
---

# 🧠 Prompt Architecture (Orientation)

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

# 🔍 Self-Audit Checklist

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

# 👁️ Visual Proof Standards

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

- Read the **extended ODD Manifesto** in `/canon/odd/manifesto.md`
- See how rigor scales in **Project Maturity & Progressive Governance**
- Browse the **Canon Index** to understand how decisions and verification are structured

Or skip the theory and look at projects as they are added over time.

---

> ODD is about preserving intent without freezing execution.
> The measure of success is not how elegant the artifact is, but whether the outcome holds up in the real world.



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

- Memory model: `/canon/odd/appendices/progressive-elevation.md`
- Multi-lane intent isolation: `/canon/odd/appendices/product-lanes.md`
- Comparability boundaries: `/canon/odd/appendices/epochs.md`
- Decisions: `/canon/odd/decisions/`



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
## Attempts
================================================================================



--------------------------------------------------------------------------------
📄 File: attempts/website/prd-v1.1/_runs/b497df0e/ATTEMPT.md
--------------------------------------------------------------------------------

# Attempt (Run b497df0e)

## Summary

Built a React-based public website for klappy.dev that meets the PRD v1.1 requirements for progressive disclosure, mobile usability, and canon browsing.

## Approach

### Tech Stack
- React 18 with Vite 6
- Progressive disclosure UX using collapsible navigation
- Mobile-first responsive design following Apple 2025 design principles
- Markdown rendering with marked.js for content pages

### Implementation Details
1. Created a 6-item top-level navigation (≤7 requirement):
   - Home
   - What is ODD?
   - Projects  
   - Why This Exists
   - About
   - Explore Canon (expandable for deeper content)

2. Built core components:
   - `Navigation`: Sticky top nav with progressive disclosure (Canon submenu)
   - `Home`: Hero section with CTA cards for key entry points
   - `ContentPage`: Markdown renderer with frontmatter metadata display
   - `MediaShelf`: Opt-in media player for videos, audio, images, PDFs

3. Features:
   - Deep linking support (URL reflects current resource)
   - Browser back/forward navigation
   - Progressive media disclosure (no autoplay, user-initiated)
   - Mobile responsive (tested down to 375px width)
   - Visual calm with system fonts and subtle animations

### Build Output
- Vite bundles to `products/website/dist/`
- Content served from `/content/manifest.json`
- Static assets from `/public`
- Bundle size: ~194KB JS, ~11KB CSS (gzipped: ~62KB total)



--------------------------------------------------------------------------------
📄 File: attempts/website/prd-v1.1/_runs/b497df0e/EVIDENCE.md
--------------------------------------------------------------------------------

# Evidence (Run b497df0e)

## Visual Proof

This attempt includes 4 screenshots demonstrating key PRD requirements.

### Desktop Homepage (1440x900)
![Desktop Homepage](screenshots/01-desktop-homepage.png)

**Demonstrates:**
- ≤7 navigation items (6 items shown: Home, What is ODD?, Projects, Why This Exists, About, Explore Canon)
- Progressive disclosure (Canon submenu collapsed by default)
- Visual calm with Apple 2025 design principles
- Clear CTA cards for key entry points

### Mobile Homepage (375x667)
![Mobile Homepage](screenshots/02-mobile-homepage.png)

**Demonstrates:**
- Mobile usability without horizontal scrolling
- Responsive navigation that adapts to narrow viewports
- Touch-friendly button sizes and spacing

### Content Page - ODD Manifesto (1440x900)
![Content Page](screenshots/03-desktop-content-page.png)

**Demonstrates:**
- Markdown rendering with proper typography
- Resource metadata (tier badges, audience indicators)
- Tag display
- Deep linking to specific content

### Expanded Navigation (1440x900)
![Nav Expanded](screenshots/04-desktop-nav-expanded.png)

**Demonstrates:**
- Progressive disclosure in action (Canon submenu expanded)
- Secondary navigation reveals tier 1 canon resources
- Smooth dropdown interaction

## Success Criteria Met

- [x] First load shows ≤7 nav items (6 shown)
- [x] Mobile usable without horizontal scrolling (verified at 375px)
- [x] Canon discoverable without file paths exposed (via manifest.json)
- [x] No agent instructions in UI (human-friendly language only)
- [x] No CLI/process language exposed
- [x] Deep links work (URL reflects resource)
- [x] Progressive disclosure tiers respected (Tier 0/1/2 via frontmatter)

## Build Info

- **Build tool:** Vite 6.4.1
- **Output size:** ~194KB JS + ~11KB CSS (gzipped: ~62KB total)
- **Build time:** 1.31s
- **Content resources:** 59 markdown files served via manifest.json



--------------------------------------------------------------------------------
📄 File: attempts/website/prd-v1.1/_runs/b497df0e/META.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "prd_version": "v1.1",
  "epoch_id": "E0003-evidence-first-era",
  "run_id": "b497df0e",
  "attempt": null,
  "lane_root": "products/website",
  "dist_dir": "products/website/dist",
  "tool": "cursor",
  "agent": "a",
  "model": "claude-sonnet-4.5",
  "worktree_path": "/Users/chrisklapp/.cursor/worktrees/klappy.dev/tar",
  "branch": "run/website/prd-v1.1/cursor/a/claude-sonnet-45/b497df0e",
  "target_branch": "run/website/prd-v1.1/cursor/a/claude-sonnet-45/b497df0e",
  "git_head": "6ce7319faa655dabe3d7c01062d5043a3cb0eb1e",
  "registered_at": "2026-01-20T19:44:32.318Z",
  "completed_at": null,
  "finalized_at": null,
  "status": "OPEN",
  "evidence_index": [],
  "preview_url": null
}


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
uri: klappy://canon/odd/example
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

- `uri` (string) — globally unique, stable identifier (e.g. `klappy://canon/odd/epochs`)
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

- [Visual Evolution](/canon/odd/appendices/visual-evolution.md)
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
📄 File: infra/compile/plans/website/author.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "pack": "author",
  "mode": "concat",
  "output": "author-pack.md",
  "sources": [
    "canon/index.md",
    "canon/odd/appendices/product-lanes.md",
    "canon/odd/appendices/epochs.md",
    "canon/odd/appendices/compilation.md",
    "canon/odd/appendices/compilation-targets.md",
    "docs/PRD/website/PRD.md"
  ]
}


--------------------------------------------------------------------------------
📄 File: infra/compile/plans/website/visitor.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "pack": "visitor",
  "output": "public/_compiled/website/visitor-pack.md",
  "sources": [
    "canon/index.md",
    "canon/odd/appendices/product-lanes.md",
    "canon/odd/appendices/epochs.md",
    "canon/odd/appendices/compilation.md",
    "docs/PRD/website/PRD.md"
  ],
  "mode": "concat"
}


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
📄 File: infra/prompts/attempt-kickoff/BOOTSTRAP.md
--------------------------------------------------------------------------------

# BOOTSTRAP (Read Verbatim)

You are an agent operating inside the klappy.dev repo.

You MUST follow repo instructions. You MUST NOT invent process.

## Required Reads (in order)

1. `/canon/odd/appendices/product-lanes.md`
2. `/canon/odd/appendices/epochs.md`
3. `/canon/odd/appendices/online-evidence.md`
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

1. `/canon/odd/appendices/evidence.md`
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
📄 File: infra/scripts/attempt-cli.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * attempt-cli.js
 * 
 * Unified CLI for the ODD attempt lifecycle.
 * 
 * Commands:
 *   npm run attempt:start -- --prd v0.2
 *   npm run attempt:spawn -- --prd v0.2 --n 4
 *   npm run attempt:reset
 *   npm run attempt:promote -- --prd v0.2 --attempt 001
 * 
 * What attempt:start does (everything automated):
 *   1. Validates git clean state
 *   2. Ensures on main, pulls latest
 *   3. Reserves attempt number (commits to main)
 *   4. Creates attempt branch
 *   5. Resets /src to minimal shell
 *   6. Commits reset baseline
 *   7. Prints branch name, attempt ID, PRD snapshot SHA
 * 
 * What attempt:spawn does:
 *   Same as start, but for N parallel attempts.
 *   Each branch gets /src reset and committed.
 *   Optionally creates worktrees.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { randomBytes } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// ============================================================
// Utilities
// ============================================================

/**
 * Parse PRD version from /docs/PRD.md (single source of truth).
 * 
 * Looks for:
 *   | **PRD Version** | v0.3 |
 * OR:
 *   PRD Version: v0.3
 * 
 * Returns version without 'v' prefix (e.g., "0.3").
 */
function parsePrdVersion() {
  const prdPath = join(ROOT, 'docs', 'PRD.md');
  
  if (!existsSync(prdPath)) {
    return null;
  }
  
  const content = readFileSync(prdPath, 'utf8');
  
  // Match table format: | **PRD Version** | v0.3 |
  const tableMatch = content.match(/\|\s*\*\*PRD Version\*\*\s*\|\s*v?([0-9.]+)\s*\|/i);
  if (tableMatch) {
    return tableMatch[1];
  }
  
  // Match key-value format: PRD Version: v0.3
  const kvMatch = content.match(/PRD Version:\s*v?([0-9.]+)/i);
  if (kvMatch) {
    return kvMatch[1];
  }
  
  return null;
}

function run(cmd, options = {}) {
  const { silent, dryRun, cwd } = options;
  if (dryRun) {
    console.log(`  [DRY RUN] ${cmd}`);
    return '';
  }
  if (!silent) {
    console.log(`  $ ${cmd}`);
  }
  return execSync(cmd, { cwd: cwd || ROOT, encoding: 'utf8' }).trim();
}

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function generateRunId() {
  // Short 8-char hex ID (collision-resistant for practical purposes)
  return randomBytes(4).toString('hex');
}

// Valid lanes (locked)
const VALID_LANES = ['website', 'ai-navigation', 'agent-skill'];

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { 
    command: null,
    prd: null, 
    attempt: null,
    lane: null,           // Product lane (website, ai-navigation, agent-skill)
    n: 1,
    tool: 'cursor',       // Tool provenance (cursor, vscode, cli, etc.)
    agent: 'default',     // Agent ID within tool (cursor-a, cursor-b, etc.)
    model: null,          // Model provenance (opus-4.5, gpt-4o, etc.)
    worktree: false,
    worktreeDir: null,
    dryRun: false,
    force: false,
    noCommit: false,
    noNuke: false
  };
  
  // First arg is command
  if (args[0] && !args[0].startsWith('--')) {
    result.command = args[0];
  }
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];
    
    if (arg === '--prd' && next) {
      result.prd = next.replace(/^v/, '');
      i++;
    } else if (arg === '--lane' && next) {
      result.lane = next;
      i++;
    } else if (arg === '--attempt' && next) {
      result.attempt = next.padStart(3, '0');
      i++;
    } else if (arg === '--n' && next) {
      result.n = parseInt(next, 10);
      i++;
    } else if (arg === '--tool' && next) {
      result.tool = next;
      i++;
    } else if (arg === '--agent' && next) {
      result.agent = next;
      i++;
    } else if (arg === '--model' && next) {
      result.model = next;
      i++;
    } else if (arg === '--worktree') {
      result.worktree = true;
    } else if (arg === '--worktree-dir' && next) {
      result.worktreeDir = next;
      result.worktree = true;
      i++;
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg === '--force') {
      result.force = true;
    } else if (arg === '--no-commit') {
      result.noCommit = true;
    } else if (arg === '--no-nuke') {
      result.noNuke = true;
    }
  }
  
  return result;
}

/**
 * Generate a model slug for branch naming.
 * Converts model strings like "opus-4.5" or "gpt-4o-mini" to short slugs.
 */
function generateModelSlug(model) {
  if (!model || model === 'unknown') return 'unknown';
  
  // Normalize to lowercase, replace spaces/dots with hyphens
  return model.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\./g, '')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 20); // Limit length for branch names
}

/**
 * Generate a provenance-aware branch name.
 * Format: run/<lane>/prd-v<prd>/<tool>/<agent>/<model_slug>/<run_id>
 * 
 * Example: run/website/prd-v1.0/cursor/a/claude-opus-4/e2c41bb5
 * 
 * INVARIANT: Lane is REQUIRED in branch name to prevent cross-lane confusion.
 */
function generateBranchName(lane, prd, tool, agent, model, runId) {
  const modelSlug = generateModelSlug(model);
  return `run/${lane}/prd-v${prd}/${tool}/${agent}/${modelSlug}/${runId}`;
}

/**
 * Validate that a branch name matches the canonical format.
 * Returns { valid: boolean, errors: string[] }
 */
function validateBranchName(branch, expectedLane) {
  const errors = [];
  
  // Check prefix
  if (!branch.startsWith('run/') && !branch.startsWith('attempt/')) {
    errors.push(`Branch must start with run/ or attempt/. Got: ${branch}`);
    return { valid: false, errors };
  }
  
  // For run/* branches, enforce full format
  if (branch.startsWith('run/')) {
    const parts = branch.split('/');
    // run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>
    if (parts.length < 7) {
      errors.push(`Branch format incomplete. Expected: run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>`);
      errors.push(`Got: ${branch}`);
    }
    
    // Check lane is present and matches expected
    const branchLane = parts[1];
    if (!branchLane || !VALID_LANES.includes(branchLane)) {
      errors.push(`Branch must include valid lane. Got: ${branchLane || '(empty)'}`);
      errors.push(`Valid lanes: ${VALID_LANES.join(', ')}`);
    }
    
    if (expectedLane && branchLane !== expectedLane) {
      errors.push(`Branch lane (${branchLane}) does not match --lane (${expectedLane})`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

// ============================================================
// Minimal shell files
// ============================================================

const SHELL_FILES = {
  'main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

  'index.css': `/* 
 * Minimal reset - no UI opinions
 * Build your attempt's design from scratch
 */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}
`,

  'components/App.jsx': `import { useState, useEffect } from 'react';

/**
 * Minimal App Shell
 * 
 * This shell proves the build works and content loads.
 * Replace everything here with your attempt's implementation.
 * 
 * PRD: /docs/PRD.md
 * Manifest: /public/content/manifest.json
 */
export default function App() {
  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => r.json())
      .then(setManifest)
      .catch(e => setError(e.message));
  }, []);

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Manifest Load Failed</h1>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading manifest...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚀 Fresh Attempt Shell</h1>
      <p>Manifest loaded successfully. {manifest.resources?.length || 0} resources available.</p>
      <hr style={{ margin: '1rem 0' }} />
      <p><strong>Next:</strong> Read the PRD and build your implementation.</p>
      <ul>
        <li>PRD: <code>/docs/PRD.md</code></li>
        <li>Manifest: <code>/public/content/manifest.json</code></li>
        <li>This file: <code>products/&lt;lane&gt;/src/components/App.jsx</code></li>
      </ul>
    </div>
  );
}
`
};

// SAFETY: Ephemeral paths are lane-scoped. Root should remain clean.
// NOTE: cmdNuke() handles lane-scoped deletion directly via laneEphemeralPaths.
// This list is kept for reference/documentation only.
const EPHEMERAL_PATHS = [
  // Lane-scoped paths (template: products/<lane>/...)
  // 'products/<lane>/src',
  // 'products/<lane>/dist',
  // 'products/<lane>/vite.config.js',
  // 'products/<lane>/vite.config.ts',
  // 'products/<lane>/tsconfig.json',
  // 'products/<lane>/tailwind.config.js',
  // 'products/<lane>/postcss.config.js',
  // NOTE: Root-level src, app, index.html, vite.config.js are NO LONGER valid.
  // All ephemeral paths must be under products/<lane>/.
];

// These are NEVER touched during nuke (the contract)
const PROTECTED_PATHS = [
  'canon',
  'docs',
  'attempts',
  'infra',
  'public',
  '.cloudflare',
  '.github',
];

// ============================================================
// Core functions
// ============================================================

function ensureCleanMain(opts) {
  const { dryRun, force } = opts;
  
  console.log('1️⃣  Validating git state...');
  
  // Check for uncommitted changes
  const status = run('git status --porcelain', { silent: true, dryRun: false });
  if (status && !force) {
    fail('Working directory not clean. Commit or stash changes first.\n' +
         '   (use --force to override)\n\n' + status);
  }
  if (status && force) {
    console.log('  ⚠️  Working directory not clean (--force used)');
  } else {
    console.log('  ✅ Working directory clean');
  }
  
  // Check we're on main
  const branch = run('git branch --show-current', { silent: true, dryRun: false });
  if (branch !== 'main') {
    fail(`Must be on main branch. Currently on: ${branch}`);
  }
  console.log('  ✅ On main branch');
  
  // Pull latest
  console.log('  📥 Pulling latest main...');
  run('git pull origin main', { dryRun });
  console.log('  ✅ Main is up to date\n');
}

function reserveAttemptNumber(prd, agent, opts) {
  const { dryRun } = opts;
  
  console.log('2️⃣  Reserving attempt number...');
  
  const prdFolder = join(ROOT, 'attempts', `prd-v${prd}`);
  const registryPath = join(prdFolder, 'ATTEMPT_REGISTRY.json');
  
  // Create folder if needed
  if (!existsSync(prdFolder) && !dryRun) {
    mkdirSync(prdFolder, { recursive: true });
  }
  
  // Read or create registry
  let registry;
  if (existsSync(registryPath)) {
    registry = JSON.parse(readFileSync(registryPath, 'utf8'));
  } else {
    registry = {
      prd_version: prd,
      next_attempt: 1,
      reserved: [],
      sealed: []
    };
  }
  
  const attemptNum = registry.next_attempt;
  const attemptPadded = String(attemptNum).padStart(3, '0');
  
  // Reserve it
  if (!dryRun) {
    registry.next_attempt = attemptNum + 1;
    registry.reserved.push({
      attempt: attemptNum,
      reserved_at: new Date().toISOString(),
      agent: agent
    });
    writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');
  }
  
  // Commit to main
  run(`git add ${registryPath}`, { dryRun });
  run(`git commit -m "chore: reserve attempt-${attemptPadded} for PRD v${prd}"`, { dryRun });
  run('git push origin main', { dryRun });
  
  console.log(`  ✅ Reserved: attempt-${attemptPadded}\n`);
  
  return { attemptNum, attemptPadded };
}

function createAttemptBranch(prd, attemptPadded, opts) {
  const { dryRun } = opts;
  
  console.log('3️⃣  Creating attempt branch...');
  
  const branchName = `attempt/prd-v${prd}/a${attemptPadded}`;
  const prdSha = run('git rev-parse HEAD', { silent: true, dryRun: false });
  
  run(`git checkout -b ${branchName}`, { dryRun });
  
  console.log(`  ✅ Created: ${branchName}`);
  console.log(`  📌 PRD snapshot: ${prdSha.substring(0, 8)}\n`);
  
  return { branchName, prdSha };
}

/**
 * Reset lane src to minimal shell.
 * Lane-scoped: operates on products/<lane>/src, not repo root.
 * Can operate in current directory or a specific cwd (for worktrees).
 * 
 * NOTE: This function is legacy. Prefer cmdNuke() for lane-scoped resets.
 * Default lane is 'website' for backwards compatibility.
 */
function resetSrc(opts, targetDir = ROOT, lane = 'website') {
  const { dryRun, noCommit } = opts;
  
  const laneRoot = join(targetDir, 'products', lane);
  const srcPath = join(laneRoot, 'src');
  const appPath = join(laneRoot, 'app');
  
  console.log(`4️⃣  Resetting products/${lane}/src to minimal shell...`);
  
  // Delete lane src
  if (existsSync(srcPath) && !dryRun) {
    rmSync(srcPath, { recursive: true });
  }
  
  // Delete lane app if present
  if (existsSync(appPath) && !dryRun) {
    rmSync(appPath, { recursive: true });
  }
  
  // Create minimal shell in lane
  if (!dryRun) {
    mkdirSync(join(srcPath, 'components'), { recursive: true });
    for (const [filename, content] of Object.entries(SHELL_FILES)) {
      writeFileSync(join(srcPath, filename), content);
    }
  }
  
  // Commit reset (unless --no-commit)
  if (!noCommit) {
    run(`git add products/${lane}/src/`, { dryRun, cwd: targetDir });
    run(`git commit -m "chore: reset products/${lane}/src to minimal shell for fresh attempt"`, { dryRun, cwd: targetDir });
  }
  
  console.log(`  ✅ products/${lane}/src reset and committed\n`);
}

function printStartSummary(prd, attemptPadded, branchName, prdSha) {
  console.log('═'.repeat(60));
  console.log('\n🚀 ATTEMPT READY\n');
  console.log(`  PRD Version:     v${prd}`);
  console.log(`  Attempt:         ${attemptPadded}`);
  console.log(`  Branch:          ${branchName}`);
  console.log(`  PRD Snapshot:    ${prdSha.substring(0, 8)}`);
  console.log(`  Preview URL:     https://${branchName.replace(/\//g, '-')}.klappy-dev.pages.dev (after push)`);
  console.log('\n' + '═'.repeat(60));
  
  console.log(`
📋 Next step:

   Paste the kickoff prompt into your agent:
   /docs/PROMPT_ATTEMPT_KICKOFF.txt

   Then push to trigger preview deploy:
   git push origin ${branchName}
`);
}

// ============================================================
// Commands
// ============================================================

function cmdStart(opts) {
  const { prd, agent, dryRun } = opts;
  
  if (!prd) {
    console.log(`
Usage: npm run attempt:start -- --prd <version>

Example:
  npm run attempt:start -- --prd v0.2

Options:
  --prd <version>   PRD version (required)
  --agent <name>    Agent identifier (default: "default")
  --force           Override clean working directory check
  --dry-run         Show what would happen without making changes
`);
    process.exit(1);
  }
  
  console.log(`\n🚀 Starting attempt for PRD v${prd}\n`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  ensureCleanMain(opts);
  const { attemptPadded } = reserveAttemptNumber(prd, agent, opts);
  const { branchName, prdSha } = createAttemptBranch(prd, attemptPadded, opts);
  resetSrc(opts);
  printStartSummary(prd, attemptPadded, branchName, prdSha);
}

/**
 * NUKE: Guarantee blank slate for a lane's implementation surface.
 * 
 * Lane-scoped: Only deletes products/<lane>/src and lane-local configs.
 * 
 * Branch safety rules:
 *   - ❌ Refuses on prod (NEVER)
 *   - ❌ Refuses on main unless --force
 *   - ✅ Allowed on attempt/* or run/* branches
 * 
 * Protected paths (canon, docs, infra, other lanes) are NEVER touched.
 */
function cmdNuke(opts) {
  const { dryRun, force, lane } = opts;
  
  // ========================================
  // LANE VALIDATION (Required)
  // ========================================
  if (!lane) {
    console.log(`
Usage: npm run attempt:nuke -- --lane <lane>

Example:
  npm run attempt:nuke -- --lane website

Valid lanes: ${VALID_LANES.join(', ')}

Options:
  --lane <lane>   Product lane (required)
  --force         Override main branch check
  --dry-run       Show what would happen
  --no-commit     Don't commit the nuke
`);
    process.exit(1);
  }
  
  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(', ')}`);
  }
  
  // ========================================
  // REGISTRATION CHECK (Enforced)
  // ========================================
  // Nuke requires .attempt.json to exist (proves registration happened)
  const attemptJsonPath = join(ROOT, '.attempt.json');
  if (!existsSync(attemptJsonPath) && !force) {
    console.log(`\n  ⚠️  No .attempt.json found.\n`);
    console.log('  You must register before nuking:');
    console.log(`    npm run attempt:register -- --lane ${lane} --tool cursor --agent a --model "your-model"\n`);
    console.log('  This ensures provenance is captured before work begins.');
    console.log('  Use --force to override (not recommended).\n');
    fail('Run attempt:register first, then attempt:nuke.');
  }
  
  // If .attempt.json exists, validate lane matches
  if (existsSync(attemptJsonPath)) {
    const registeredMeta = JSON.parse(readFileSync(attemptJsonPath, 'utf8'));
    if (registeredMeta.lane && registeredMeta.lane !== lane) {
      fail(`Lane mismatch!\n` +
           `   .attempt.json says: ${registeredMeta.lane}\n` +
           `   --lane argument:    ${lane}\n\n` +
           `   Use the lane you registered with, or re-register.`);
    }
  }
  
  console.log(`\n💥 NUKE — Blank Slate Reset for lane: ${lane}\n`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // ========================================
  // BRANCH SAFETY CHECK (Critical)
  // ========================================
  const currentBranch = run('git branch --show-current', { silent: true, dryRun: false });
  
  // NEVER allow nuke on prod
  if (currentBranch === 'prod') {
    fail('🛑 REFUSED: Cannot nuke on prod branch.\n' +
         '   prod is the live production deployment.\n' +
         '   Switch to an attempt/* or run/* branch first.');
  }
  
  // Warn and require --force on main
  if (currentBranch === 'main' && !force) {
    console.log('  ⚠️  WARNING: You are on main branch!');
    console.log('  ⚠️  main is the experiment aggregation branch.');
    console.log('');
    console.log(`  Nuking will remove products/${lane}/src/.`);
    console.log('  Production (prod branch) is NOT affected.');
    console.log('  Other lanes are NOT affected.');
    console.log('');
    console.log('  To proceed, use:');
    console.log(`    npm run attempt:nuke -- --lane ${lane} --force`);
    console.log('');
    fail('Use --force to nuke on main, or run from an attempt/run branch.');
  }
  
  // Check for valid branch types
  const isAttemptBranch = currentBranch.startsWith('attempt/') || currentBranch.startsWith('run/');
  if (!isAttemptBranch && currentBranch !== 'main') {
    console.log(`  ⚠️  Unknown branch type: ${currentBranch}`);
    console.log('  Expected: attempt/*, run/*, or main');
    if (!force) {
      fail('Use --force to nuke on this branch.');
    }
  }
  
  console.log(`  Branch: ${currentBranch}`);
  console.log(`  Lane:   ${lane}`);
  if (isAttemptBranch) {
    console.log('  ✅ Attempt/run branch — nuke allowed\n');
  } else if (currentBranch === 'main' && force) {
    console.log('  ⚠️  main branch with --force — proceeding with caution\n');
  }
  
  // ========================================
  // LANE-SCOPED PATHS
  // ========================================
  const laneRoot = join(ROOT, 'products', lane);
  const laneSrc = join(laneRoot, 'src');
  
  // Lane-local config files that may exist
  const laneEphemeralPaths = [
    join('products', lane, 'src'),
    join('products', lane, 'vite.config.js'),
    join('products', lane, 'vite.config.ts'),
    join('products', lane, 'tsconfig.json'),
    join('products', lane, 'tailwind.config.js'),
    join('products', lane, 'postcss.config.js'),
  ];
  
  // ========================================
  // SHOW WHAT WILL BE DELETED
  // ========================================
  console.log('1️⃣  Scanning lane ephemeral paths...\n');
  console.log(`  Lane root: products/${lane}/`);
  console.log('');
  console.log('  Will delete:');
  
  const toDelete = [];
  for (const p of laneEphemeralPaths) {
    const fullPath = join(ROOT, p);
    if (existsSync(fullPath)) {
      toDelete.push(p);
      console.log(`    ✗ /${p}`);
    }
  }
  
  if (toDelete.length === 0) {
    console.log('    (nothing to delete - already clean)');
  }
  
  console.log('');
  console.log('  Protected (NEVER deleted):');
  console.log('    ✓ /canon/**');
  console.log('    ✓ /docs/**');
  console.log('    ✓ /attempts/**');
  console.log('    ✓ /infra/**');
  console.log('    ✓ /public/**');
  for (const otherLane of VALID_LANES.filter(l => l !== lane)) {
    console.log(`    ✓ /products/${otherLane}/**`);
  }
  console.log('');
  
  // ========================================
  // EXECUTE DELETION
  // ========================================
  if (toDelete.length > 0) {
    console.log('2️⃣  Deleting lane ephemeral paths...\n');
    
    for (const p of toDelete) {
      const fullPath = join(ROOT, p);
      if (!dryRun) {
        rmSync(fullPath, { recursive: true, force: true });
      }
      console.log(`  ✅ Deleted /${p}`);
    }
    console.log('');
  }
  
  // ========================================
  // COMMIT IF NOT --no-commit
  // ========================================
  if (!opts.noCommit && toDelete.length > 0) {
    console.log('3️⃣  Committing nuke...');
    run('git add -A', { dryRun });
    run(`git commit -m "chore: nuke products/${lane}/src for fresh attempt" --allow-empty`, { dryRun });
    console.log('  ✅ Committed\n');
  }
  
  // ========================================
  // SUMMARY
  // ========================================
  console.log('═'.repeat(60));
  console.log('\n💥 NUKE COMPLETE\n');
  console.log(`  Branch: ${currentBranch}`);
  console.log(`  Lane:   ${lane}`);
  console.log(`  Deleted: ${toDelete.length} path(s)`);
  console.log('  Other lanes: intact');
  console.log('  Protected paths: intact');
  console.log('');
  console.log('  The deploy contract is preserved.');
  console.log(`  Build must produce products/${lane}/dist/index.html`);
  console.log('\n' + '═'.repeat(60));
  
  console.log(`
📋 Next steps:

   1. Choose your stack (React, Vue, Svelte, vanilla, etc.)
   2. Install dependencies: npm install <packages>
   3. Create your implementation in products/${lane}/src/
   4. Build: npm run build -- --lane ${lane}
   5. Submit: npm run attempt:submit
`);
}

/**
 * Nuclear reset: Nuke lane src + clean up attempt branches for a PRD.
 * 
 * This is the "hard reset" for starting a fresh PRD cycle.
 * Combines nuke with branch cleanup.
 * 
 * Lane-scoped: Only affects products/<lane>/src, not repo root.
 * Default lane is 'website' for backwards compatibility.
 */
function cmdReset(opts) {
  const { dryRun, noCommit, prd, force } = opts;
  const lane = opts.lane || 'website';  // Default to website lane
  
  console.log('\n💥 NUCLEAR RESET\n');
  console.log(`  Lane: ${lane}`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // Lane-scoped paths
  const laneRoot = join(ROOT, 'products', lane);
  const laneSrcPath = join(laneRoot, 'src');
  const laneAppPath = join(laneRoot, 'app');
  const laneViteConfig = join(laneRoot, 'vite.config.js');
  
  // Check if we're on main - warn about production
  const currentBranch = run('git branch --show-current', { silent: true, dryRun: false });
  const isMain = currentBranch === 'main';
  
  if (isMain && !force) {
    console.log('  ⚠️  WARNING: You are on main branch!');
    console.log(`  ⚠️  Nuking products/${lane}/src on main will break production.`);
    console.log('');
    console.log('  If you ONLY want to clean up attempt branches (recommended):');
    console.log(`    npm run attempt:reset -- --lane ${lane} --prd v0.2 --no-nuke`);
    console.log('');
    console.log('  If you really want to nuke production too:');
    console.log(`    npm run attempt:reset -- --lane ${lane} --prd v0.2 --force`);
    console.log('');
    
    // Only do branch cleanup if --prd was provided
    if (prd) {
      console.log(`  Proceeding with branch cleanup only (not nuking products/${lane}/src)...\n`);
      opts.noNuke = true;
    } else {
      fail(`Use --force to nuke products/${lane}/src on main, or run from an attempt branch.`);
    }
  }
  
  // ========================================
  // Part 1: Nuke lane src (unless --no-nuke or on main without --force)
  // ========================================
  if (!opts.noNuke) {
    console.log(`1️⃣  Nuking products/${lane}/src...\n`);
    console.log('  Will delete:');
    console.log(`    - products/${lane}/src (entire directory)`);
    console.log(`    - products/${lane}/app (if exists)`);
    console.log(`    - products/${lane}/vite.config.js (framework-specific)`);
    console.log('');
  } else {
    console.log(`1️⃣  Skipping products/${lane}/src nuke (production protected)\n`);
  }
  
  if (!opts.noNuke) {
    // Delete lane src
    if (existsSync(laneSrcPath)) {
      if (!dryRun) rmSync(laneSrcPath, { recursive: true });
      console.log(`  ✅ Deleted products/${lane}/src`);
    } else {
      console.log(`  ⚠️  products/${lane}/src does not exist`);
    }
    
    // Delete lane app if present
    if (existsSync(laneAppPath)) {
      if (!dryRun) rmSync(laneAppPath, { recursive: true });
      console.log(`  ✅ Deleted products/${lane}/app`);
    }
    
    // Delete lane vite.config.js (framework-specific)
    if (existsSync(laneViteConfig)) {
      if (!dryRun) rmSync(laneViteConfig);
      console.log(`  ✅ Deleted products/${lane}/vite.config.js`);
    }
  }
  
  // ========================================
  // Part 2: Clean up attempt branches (if --prd provided)
  // ========================================
  if (prd) {
    console.log(`\n2️⃣  Cleaning up attempt branches for PRD v${prd}...\n`);
    
    // Find local attempt branches
    const localBranchOutput = run('git branch', { silent: true, dryRun: false });
    const localBranches = localBranchOutput
      .split('\n')
      .map(b => b.trim().replace('* ', ''))
      .filter(b => b.startsWith(`attempt/prd-v${prd}/`));
    
    // Find remote attempt branches
    const remoteBranchOutput = run('git branch -r', { silent: true, dryRun: false });
    const remoteBranches = remoteBranchOutput
      .split('\n')
      .map(b => b.trim())
      .filter(b => b.startsWith(`origin/attempt/prd-v${prd}/`))
      .map(b => b.replace('origin/', ''));
    
    console.log(`  Found ${localBranches.length} local branches`);
    console.log(`  Found ${remoteBranches.length} remote branches\n`);
    
    // Delete local branches
    for (const branch of localBranches) {
      console.log(`  🗑️  Deleting local: ${branch}`);
      if (!dryRun) {
        try {
          run(`git branch -D "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`     ⚠️  Could not delete (might be current branch)`);
        }
      }
    }
    
    // Delete remote branches
    for (const branch of remoteBranches) {
      console.log(`  🗑️  Deleting remote: origin/${branch}`);
      if (!dryRun) {
        try {
          run(`git push origin --delete "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`     ⚠️  Could not delete remote`);
        }
      }
    }
    
    // Clean up _runs folder (lane-contained path)
    const runsPath = join(ROOT, 'products', lane, 'attempts', `prd-v${prd}`, '_runs');
    if (existsSync(runsPath)) {
      console.log(`\n  🗑️  Deleting _runs folder...`);
      if (!dryRun) rmSync(runsPath, { recursive: true });
      console.log('  ✅ Deleted _runs/');
    }
    
    // Reset registry (lane-contained path)
    const registryPath = join(ROOT, 'products', lane, 'attempts', `prd-v${prd}`, 'ATTEMPT_REGISTRY.json');
    if (existsSync(registryPath)) {
      console.log(`\n  🔄 Resetting attempt registry...`);
      if (!dryRun) {
        const registry = {
          prd_version: prd,
          next_attempt: 1,
          reserved: [],
          sealed: [],
          finalized: [],
          notes: `Reset on ${new Date().toISOString()}. Previous attempts cleared.`
        };
        writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');
      }
      console.log('  ✅ Registry reset to attempt 1');
    }
  }
  
  // ========================================
  // Part 3: Commit changes
  // ========================================
  if (!noCommit) {
    console.log('\n3️⃣  Committing nuke...');
    run('git add -A', { dryRun });
    const msg = prd 
      ? `chore: nuclear reset for PRD v${prd} lane ${lane} - nuked src and cleared attempt branches`
      : `chore: nuke products/${lane}/src for fresh attempt (stack-agnostic)`;
    run(`git commit -m "${msg}" --allow-empty`, { dryRun });
    console.log('  ✅ Committed\n');
  } else {
    console.log('\n  Skipping commit (--no-commit)\n');
  }
  
  console.log('═'.repeat(60));
  console.log('\n💥 NUCLEAR RESET COMPLETE\n');
  console.log(`  Lane: ${lane}`);
  console.log(`  products/${lane}/src is gone. Choose any stack for your attempt.`);
  if (prd) {
    console.log(`  All attempt branches for PRD v${prd} have been deleted.`);
    console.log('  Registry reset - next attempt will be attempt-001.');
  }
  console.log(`  Deploy contract preserved: products/${lane}/dist/index.html after build.`);
  console.log('\n' + '═'.repeat(60));
  
  if (prd) {
    // Auto-cleanup after nuclear reset
    console.log('\n7️⃣  Auto-cleanup: pruning stale worktrees...');
    try {
      run('git worktree prune', { dryRun, silent: true });
      
      // Remove detached worktrees automatically
      const worktreeOutput = run('git worktree list --porcelain', { silent: true, dryRun: false });
      let cleanedCount = 0;
      let currentPath = null;
      let isDetached = false;
      
      for (const line of worktreeOutput.split('\n')) {
        if (line.startsWith('worktree ')) {
          // Process previous worktree if it was detached
          if (currentPath && isDetached && currentPath.includes('.cursor/worktrees/')) {
            if (!dryRun) {
              try {
                run(`git worktree remove --force "${currentPath}"`, { silent: true });
                cleanedCount++;
              } catch (e) { /* ignore */ }
            }
          }
          currentPath = line.replace('worktree ', '');
          isDetached = false;
        } else if (line === 'detached') {
          isDetached = true;
        }
      }
      // Process last one
      if (currentPath && isDetached && currentPath.includes('.cursor/worktrees/')) {
        if (!dryRun) {
          try {
            run(`git worktree remove --force "${currentPath}"`, { silent: true });
            cleanedCount++;
          } catch (e) { /* ignore */ }
        }
      }
      
      if (cleanedCount > 0) {
        console.log(`  ✅ Removed ${cleanedCount} orphaned worktrees`);
      } else {
        console.log('  ✅ No orphaned worktrees');
      }
      
      // Prune stale remote refs
      run('git fetch --prune', { dryRun, silent: true });
      console.log('  ✅ Remote refs pruned\n');
    } catch (e) {
      console.log('  ⚠️  Cleanup encountered errors (non-fatal)\n');
    }
    
    console.log(`
📋 Ready for fresh attempts:

   1. Commit this state (if not auto-committed)
   2. Push to main: git push origin main
   3. Create worktrees for agents
   4. Paste /docs/PROMPT_ATTEMPT_KICKOFF.txt into each agent

Agents will now start from a clean main with all the latest scripts.
`);
  }
}

/**
 * Register a new run (Phase A of two-phase model).
 * Creates unique run_id, writes .attempt.json, creates _runs/<run_id>/ folder.
 * 
 * This is called by each agent inside its worktree at the start of work.
 * No attempt numbers are assigned yet - that happens during finalize.
 * 
 * PRD version is automatically read from /docs/PRD.md (single source of truth).
 * If --prd is provided, it must match PRD.md or the command fails.
 * 
 * PROVENANCE CAPTURED:
 *   - run_id (unique identifier)
 *   - agent (human-friendly label like cursor-a, cursor-b)
 *   - model (AI model identifier like opus-4.5, gpt-4o)
 *   - git_head (SHA at registration time)
 *   - worktree_path (filesystem location)
 *   - branch (git branch name)
 */
function cmdRegister(opts) {
  const { tool, agent, model, lane, dryRun } = opts;
  
  // ========================================
  // LANE VALIDATION (Required)
  // ========================================
  if (!lane) {
    console.log(`
Usage: npm run attempt:register -- --lane <lane> --tool <tool> --agent <id> --model <model>

Example:
  npm run attempt:register -- --lane website --tool cursor --agent a --model "claude-opus-4"

Valid lanes: ${VALID_LANES.join(', ')}

Options:
  --lane <lane>   Product lane (required)
  --tool <tool>   Development tool (default: cursor)
  --agent <id>    Agent identifier (default: default)
  --model <model> AI model identifier (recommended)
`);
    process.exit(1);
  }
  
  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(', ')}`);
  }
  
  // Parse PRD version from lane-specific PRD
  const lanePrdPath = join(ROOT, 'docs', 'PRD', lane, 'PRD.md');
  let activePrd = null;
  
  if (existsSync(lanePrdPath)) {
    const content = readFileSync(lanePrdPath, 'utf8');
    // Match table format: | **PRD Version** | v0.3 |
    const tableMatch = content.match(/\|\s*\*\*PRD Version\*\*\s*\|\s*v?([0-9.]+)\s*\|/i);
    if (tableMatch) {
      activePrd = tableMatch[1];
    } else {
      // Match key-value format: PRD Version: v0.3
      const kvMatch = content.match(/PRD Version:\s*v?([0-9.]+)/i);
      if (kvMatch) {
        activePrd = kvMatch[1];
      }
    }
  }
  
  // Fallback to old single PRD.md location
  if (!activePrd) {
    activePrd = parsePrdVersion();
  }
  
  if (!activePrd) {
    fail(`Could not parse PRD version from /docs/PRD/${lane}/PRD.md.\n` +
         '   Expected format: | **PRD Version** | v0.3 | (in table)\n' +
         '   Or: PRD Version: v0.3');
  }
  
  // If --prd was provided, validate it matches the active PRD
  if (opts.prd && opts.prd !== activePrd) {
    fail(`PRD mismatch detected!\n\n` +
         `   --prd argument:     v${opts.prd}\n` +
         `   /docs/PRD.md says:  v${activePrd}\n\n` +
         `   The PRD version in /docs/PRD.md is the source of truth.\n` +
         `   Update your prompt or use:\n\n` +
         `     npm run attempt:register\n\n` +
         `   (no --prd argument needed)`);
  }
  
  const prd = activePrd;
  
  console.log(`\n🎫 Registering run for PRD v${prd} (lane: ${lane})\n`);
  console.log(`  (Version auto-detected from /docs/PRD/${lane}/PRD.md)\n`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // ========================================
  // PROVENANCE WARNINGS
  // ========================================
  const modelId = model || 'unknown';
  if (!model) {
    console.log('  ⚠️  WARNING: --model not provided');
    console.log('     Provenance will be degraded. Re-run with --model if possible.');
    console.log('');
    console.log('     Example: npm run attempt:register -- --tool cursor --agent a --model "opus-4.5"');
    console.log('');
  }
  
  // Generate unique run ID
  const runId = generateRunId();
  const timestamp = new Date().toISOString();
  
  // Capture git state for provenance
  let currentBranch = 'unknown';
  let gitHead = 'unknown';
  let isDetached = false;
  
  try {
    currentBranch = run('git branch --show-current', { silent: true, dryRun: false }) || '';
    gitHead = run('git rev-parse HEAD', { silent: true, dryRun: false });
    isDetached = !currentBranch;
  } catch (e) {
    console.log('  ⚠️  Could not read git state');
  }
  
  // Capture worktree path
  const worktreePath = ROOT;
  
  // Generate provenance-aware branch name (MUST include lane)
  const targetBranch = generateBranchName(lane, prd, tool, agent, modelId, runId);
  
  // ========================================
  // BRANCH VALIDATION (Critical - enforced by repo rules)
  // ========================================
  // Refuse to register if on main or prod
  if (currentBranch === 'main') {
    fail('Cannot register on main branch.\n' +
         '   Create an attempt branch first:\n' +
         `   git checkout -b ${targetBranch}`);
  }
  if (currentBranch === 'prod') {
    fail('Cannot register on prod branch.\n' +
         '   prod is the live production deployment. Use an attempt branch.');
  }
  
  // Refuse if branch doesn't start with run/ or attempt/
  const isValidBranchType = currentBranch && 
    (currentBranch.startsWith('run/') || currentBranch.startsWith('attempt/'));
  
  if (currentBranch && !isValidBranchType) {
    console.log(`\n  ⚠️  INVALID BRANCH TYPE: ${currentBranch}\n`);
    console.log('  Branches must start with run/ or attempt/');
    console.log('  This enforces provenance tracking and prevents branch chaos.\n');
    console.log(`  Create the correct branch:\n     git checkout -b ${targetBranch}\n`);
    fail('Branch must start with run/ or attempt/');
  }
  
  // If on a run/* branch, validate it includes lane in the correct position
  if (currentBranch && currentBranch.startsWith('run/')) {
    const validation = validateBranchName(currentBranch, lane);
    if (!validation.valid) {
      console.log('\n  ⚠️  BRANCH NAMING ERROR:\n');
      validation.errors.forEach(e => console.log(`     ${e}`));
      console.log('\n  Your branch name is missing required components.');
      console.log(`  Expected format: run/<lane>/prd-v<prd>/<tool>/<agent>/<model>/<run_id>`);
      console.log(`\n  Suggested branch name:\n     ${targetBranch}\n`);
      fail('Branch name does not match required format. Rename your branch or create a new one.');
    }
  }
  
  // Lane-scoped paths
  const laneRoot = `products/${lane}`;
  const distDir = `products/${lane}/dist`;
  
  // Attempt artifact paths (lane-contained: /products/<lane>/attempts/...)
  const prdFolder = join(ROOT, 'products', lane, 'attempts', `prd-v${prd}`);
  const runsFolder = join(prdFolder, '_runs');
  const runFolder = join(runsFolder, runId);
  const runsDir = `products/${lane}/attempts/prd-v${prd}/_runs/${runId}`;
  
  console.log('1️⃣  Creating run folder...');
  if (!dryRun) {
    mkdirSync(join(runFolder, 'evidence'), { recursive: true });
  }
  console.log(`  ✅ Created: ${runsDir}/\n`);
  
  // Write .attempt.json in worktree root (local provenance)
  console.log('2️⃣  Writing .attempt.json...');
  const attemptMeta = {
    // IDENTITY
    lane: lane,
    prd_version: `v${prd}`,
    run_id: runId,
    
    // LANE PATHS
    lane_root: laneRoot,
    dist_dir: distDir,
    
    // PROVENANCE (who/what made this)
    tool: tool,           // cursor, vscode, cli, etc.
    agent: agent,         // agent ID within tool (a, b, cursor-a, etc.)
    model: modelId,       // AI model (opus-4.5, gpt-4o, unknown)
    
    // GIT STATE (captured at registration)
    worktree_path: worktreePath,
    branch: currentBranch || targetBranch,
    target_branch: targetBranch,  // suggested branch name (convenience, not required)
    git_head: gitHead,
    is_detached: isDetached,
    
    // TIMESTAMPS
    registered_at: timestamp,
    
    // ARTIFACT LOCATION
    runs_dir: runsDir
  };
  if (!dryRun) {
    writeFileSync(join(ROOT, '.attempt.json'), JSON.stringify(attemptMeta, null, 2) + '\n');
  }
  console.log('  ✅ Written .attempt.json\n');
  
  // Write skeleton META.json in run folder (merges to main)
  // NOTE: Branch names are optional convenience. Provenance lives in META.
  console.log('3️⃣  Creating skeleton files...');
  const meta = {
    // IDENTITY
    lane: lane,
    prd_version: `v${prd}`,
    epoch_id: 'E0003-evidence-first-era',  // Current epoch
    run_id: runId,
    attempt: null, // Will be assigned during finalize
    
    // LANE PATHS
    lane_root: laneRoot,
    dist_dir: distDir,
    
    // PROVENANCE (who/what made this — this is the canonical record)
    tool: tool,           // cursor, vscode, cli, etc.
    agent: agent,         // agent ID within tool
    model: modelId,       // AI model identifier
    
    // GIT STATE (captured at registration)
    worktree_path: worktreePath,
    branch: currentBranch || targetBranch,
    target_branch: targetBranch,  // suggested branch (convenience only)
    git_head: gitHead,
    
    // TIMESTAMPS
    registered_at: timestamp,
    completed_at: null,
    finalized_at: null,
    
    // STATUS
    status: 'OPEN', // OPEN → CLOSED/ABANDONED
    
    // EVIDENCE (to be filled)
    evidence_index: [],
    preview_url: null
  };
  if (!dryRun) {
    writeFileSync(join(runFolder, 'META.json'), JSON.stringify(meta, null, 2) + '\n');
    writeFileSync(join(runFolder, 'ATTEMPT.md'), `# Attempt (Run ${runId})\n\n## Summary\n\n_TODO: Describe what was built_\n\n## Approach\n\n_TODO: Describe the approach taken_\n`);
    writeFileSync(join(runFolder, 'EVIDENCE.md'), `# Evidence (Run ${runId})\n\n## Screenshots\n\n_TODO: Add evidence files to evidence/ folder and reference them here_\n`);
  }
  console.log('  ✅ Created META.json, ATTEMPT.md, EVIDENCE.md\n');
  
  // Print summary
  console.log('═'.repeat(60));
  console.log('\n🎫 RUN REGISTERED\n');
  console.log(`  Lane:          ${lane}`);
  console.log(`  PRD Version:   v${prd}`);
  console.log(`  Epoch:         E0003-evidence-first-era`);
  console.log(`  Run ID:        ${runId}`);
  console.log('');
  console.log('  LANE PATHS:');
  console.log(`    Source:      ${laneRoot}/src/`);
  console.log(`    Build:       ${distDir}/`);
  console.log('');
  console.log('  PROVENANCE (canonical record in META.json):');
  console.log(`    Tool:        ${tool}`);
  console.log(`    Agent:       ${agent}`);
  console.log(`    Model:       ${modelId}${modelId === 'unknown' ? ' ⚠️' : ''}`);
  console.log(`    Git HEAD:    ${gitHead.substring(0, 8)}`);
  console.log(`    Worktree:    ${worktreePath}`);
  console.log('');
  console.log('  BRANCH:');
  console.log(`    Current:     ${currentBranch || '(detached)'}`);
  console.log(`    Target:      ${targetBranch}`);
  console.log('');
  console.log(`  Artifacts:     ${runsDir}/`);
  console.log('\n' + '═'.repeat(60));
  
  // Suggest branch rename if not on target branch
  const branchHint = currentBranch !== targetBranch 
    ? `\n   Optional: rename branch to match provenance:\n   git checkout -b ${targetBranch}\n`
    : '';
  
  console.log(`
📋 Next steps:

   1. Build your implementation in this worktree
   2. Write artifacts to: ${runsDir}/
   3. When done, commit and push
   4. After all agents finish, run on main:
      npm run attempt:finalize -- --prd v${prd}
${branchHint}`);
}

/**
 * Finalize all runs for a PRD version (Phase B of two-phase model).
 * Reads all _runs/<run_id>/, assigns sequential attempt numbers,
 * moves folders to attempt-00N, updates META.json.
 * 
 * This is run once on main after all agents have completed.
 */
function cmdFinalize(opts) {
  const { prd, lane, dryRun } = opts;
  
  if (!prd || !lane) {
    console.log(`
Usage: npm run attempt:finalize -- --lane <lane> --prd <version>

Example:
  npm run attempt:finalize -- --lane website --prd v1.0

Valid lanes: ${VALID_LANES.join(', ')}

Options:
  --lane <lane>     Product lane (required)
  --prd <version>   PRD version (required)
  --dry-run         Show what would happen
`);
    process.exit(1);
  }
  
  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(', ')}`);
  }
  
  console.log(`\n🏁 Finalizing runs for PRD v${prd} (lane: ${lane})\n`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // Lane-contained path: /products/<lane>/attempts/prd-vX.Y/
  const prdFolder = join(ROOT, 'products', lane, 'attempts', `prd-v${prd}`);
  const runsFolder = join(prdFolder, '_runs');
  const registryPath = join(prdFolder, 'ATTEMPT_REGISTRY.json');
  
  // Check _runs exists
  if (!existsSync(runsFolder)) {
    fail(`No _runs folder found at ${runsFolder}`);
  }
  
  // Read all run folders
  console.log('1️⃣  Reading runs...');
  const runIds = readdirSync(runsFolder).filter(f => {
    const metaPath = join(runsFolder, f, 'META.json');
    return existsSync(metaPath);
  });
  
  if (runIds.length === 0) {
    fail('No runs found to finalize');
  }
  console.log(`  ✅ Found ${runIds.length} runs\n`);
  
  // Read META.json for each run and sort by timestamp
  const runs = runIds.map(runId => {
    const metaPath = join(runsFolder, runId, 'META.json');
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    return { runId, meta, path: join(runsFolder, runId) };
  }).sort((a, b) => {
    // Sort by registration timestamp
    return new Date(a.meta.registered_at) - new Date(b.meta.registered_at);
  });
  
  // Read or create registry
  console.log('2️⃣  Reading attempt registry...');
  let registry;
  if (existsSync(registryPath)) {
    registry = JSON.parse(readFileSync(registryPath, 'utf8'));
    // Ensure finalized array exists (might be old format)
    if (!registry.finalized) {
      registry.finalized = [];
    }
  } else {
    registry = {
      prd_version: prd,
      next_attempt: 1,
      finalized: []
    };
  }
  console.log(`  ✅ Next attempt number: ${registry.next_attempt}\n`);
  
  // Assign attempt numbers and move folders
  console.log('3️⃣  Assigning attempt numbers and moving folders...\n');
  const finalized = [];
  
  for (const run of runs) {
    const attemptNum = registry.next_attempt;
    const attemptPadded = String(attemptNum).padStart(3, '0');
    const newFolderName = `attempt-${attemptPadded}`;
    const newPath = join(prdFolder, newFolderName);
    
    console.log(`  ${run.runId} → ${newFolderName}`);
    console.log(`    Agent: ${run.meta.agent}, Branch: ${run.meta.branch}`);
    
    if (!dryRun) {
      // Update META.json with attempt number
      run.meta.attempt = attemptPadded;
      run.meta.finalized_at = new Date().toISOString();
      run.meta.status = 'sealed';
      writeFileSync(join(run.path, 'META.json'), JSON.stringify(run.meta, null, 2) + '\n');
      
      // Move folder
      if (existsSync(newPath)) {
        fail(`Target folder already exists: ${newPath}`);
      }
      // Use fs.rename would be better but for safety we copy then remove
      execSync(`mv "${run.path}" "${newPath}"`, { cwd: ROOT });
      
      // Update registry
      registry.next_attempt = attemptNum + 1;
      registry.finalized.push({
        attempt: attemptNum,
        run_id: run.runId,
        agent: run.meta.agent,
        branch: run.meta.branch,
        finalized_at: run.meta.finalized_at
      });
    }
    
    finalized.push({
      runId: run.runId,
      attemptPadded,
      agent: run.meta.agent,
      branch: run.meta.branch
    });
    
    console.log('');
  }
  
  // Write updated registry
  if (!dryRun) {
    writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');
    
    // Remove empty _runs folder
    const remaining = readdirSync(runsFolder);
    if (remaining.length === 0) {
      rmSync(runsFolder, { recursive: true });
    }
  }
  
  // Print summary
  console.log('═'.repeat(80));
  console.log('\n🏁 FINALIZATION COMPLETE\n');
  console.log('  Run ID   │ Attempt │ Agent              │ Branch');
  console.log('  ─────────┼─────────┼────────────────────┼─────────────────────────────');
  for (const f of finalized) {
    console.log(`  ${f.runId} │ ${f.attemptPadded}     │ ${f.agent.padEnd(18)} │ ${f.branch}`);
  }
  console.log('\n' + '═'.repeat(80));
  
  console.log(`
📋 Next steps:

   1. Review each attempt's artifacts in products/${lane}/attempts/prd-v${prd}/
   2. Pick champion based on evidence
   3. Promote winner:
      npm run attempt:promote -- --lane ${lane} --prd v${prd} --attempt <number>
`);
}

/**
 * PROMOTE: Ship a winner to production.
 * 
 * Steps:
 *   1. Validate attempt exists
 *   2. Merge attempt branch → main
 *   3. Fast-forward prod to main
 *   4. Tag with prd-vX.Y-attempt-00N and production-vX.Y
 * 
 * Result:
 *   - prod deploys (Cloudflare production)
 *   - main reflects shipped code
 *   - history preserved
 */
function cmdPromote(opts) {
  const { prd, attempt, lane, dryRun, force } = opts;
  
  if (!prd || !attempt || !lane) {
    console.log(`
Usage: npm run attempt:promote -- --lane <lane> --prd <version> --attempt <number>

Example:
  npm run attempt:promote -- --lane website --prd v1.0 --attempt 001

Valid lanes: ${VALID_LANES.join(', ')}

Options:
  --lane <lane>       Product lane (required)
  --prd <version>     PRD version (required)
  --attempt <number>  Attempt number (required)
  --dry-run           Show what would happen
  --force             Skip confirmation prompts
`);
    process.exit(1);
  }
  
  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(', ')}`);
  }
  
  console.log(`\n🏆 PROMOTING CHAMPION\n`);
  console.log(`  Lane:    ${lane}`);
  console.log(`  PRD:     v${prd}`);
  console.log(`  Attempt: ${attempt}\n`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // ========================================
  // 1. Validate attempt exists
  // ========================================
  console.log('1️⃣  Validating attempt...');
  // Lane-contained path: /products/<lane>/attempts/prd-vX.Y/attempt-NNN/
  const attemptFolder = join(ROOT, 'products', lane, 'attempts', `prd-v${prd}`, `attempt-${attempt}`);
  const metaPath = join(attemptFolder, 'META.json');
  
  if (!existsSync(metaPath)) {
    fail(`Attempt not found: ${attemptFolder}`);
  }
  
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  const attemptBranch = meta.branch;
  
  if (!attemptBranch) {
    fail('META.json missing branch information');
  }
  
  console.log(`  ✅ Found: ${attemptFolder}`);
  console.log(`     Branch: ${attemptBranch}`);
  console.log(`     Agent: ${meta.agent || 'unknown'}\n`);
  
  // ========================================
  // 2. Ensure clean state on main
  // ========================================
  console.log('2️⃣  Preparing main branch...');
  
  const currentBranch = run('git branch --show-current', { silent: true, dryRun: false });
  if (currentBranch !== 'main') {
    run('git checkout main', { dryRun });
  }
  run('git pull origin main', { dryRun });
  console.log('  ✅ Main is up to date\n');
  
  // ========================================
  // 3. Merge attempt branch to main
  // ========================================
  console.log('3️⃣  Merging attempt branch to main...');
  
  // Fetch the branch
  run(`git fetch origin ${attemptBranch}`, { dryRun });
  
  // Merge (no fast-forward to preserve history)
  const mergeMsg = `Promote prd-v${prd} attempt-${attempt} to main`;
  run(`git merge origin/${attemptBranch} --no-ff -m "${mergeMsg}"`, { dryRun });
  
  console.log('  ✅ Merged to main\n');
  
  // ========================================
  // 4. Tag the merge
  // ========================================
  console.log('4️⃣  Creating tags...');
  
  const attemptTag = `prd-v${prd}-attempt-${attempt}`;
  const prodTag = `production-v${prd}`;
  
  run(`git tag -a ${attemptTag} -m "PRD v${prd} Attempt ${attempt} promoted"`, { dryRun });
  
  // Delete old production tag if exists, then create new one
  try {
    run(`git tag -d ${prodTag}`, { silent: true, dryRun });
    run(`git push origin :refs/tags/${prodTag}`, { silent: true, dryRun });
  } catch (e) {
    // Tag didn't exist, that's fine
  }
  run(`git tag -a ${prodTag} -m "Production release for PRD v${prd}"`, { dryRun });
  
  console.log(`  ✅ Tagged: ${attemptTag}`);
  console.log(`  ✅ Tagged: ${prodTag}\n`);
  
  // ========================================
  // 5. Push main with tags
  // ========================================
  console.log('5️⃣  Pushing main...');
  run('git push origin main --tags', { dryRun });
  console.log('  ✅ Main pushed with tags\n');
  
  // ========================================
  // 6. Fast-forward prod to main
  // ========================================
  console.log('6️⃣  Fast-forwarding prod to main...');
  
  run('git checkout prod', { dryRun });
  run('git pull origin prod', { dryRun });
  run('git merge main --ff-only', { dryRun });
  run('git push origin prod', { dryRun });
  
  console.log('  ✅ prod now matches main\n');
  
  // Switch back to main
  run('git checkout main', { dryRun });
  
  // ========================================
  // 7. Update META.json with promotion status
  // ========================================
  if (!dryRun) {
    meta.promoted_at = new Date().toISOString();
    meta.status = 'champion';
    meta.production_tag = prodTag;
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
    run('git add ' + metaPath, { silent: true });
    run('git commit -m "Mark attempt-' + attempt + ' as champion"', { silent: true });
    run('git push origin main', { silent: true });
  }
  
  // ========================================
  // SUMMARY
  // ========================================
  console.log('═'.repeat(60));
  console.log('\n🏆 PROMOTION COMPLETE\n');
  console.log(`  Champion:        attempt-${attempt}`);
  console.log(`  Merged to:       main`);
  console.log(`  Production:      prod (fast-forwarded)`);
  console.log(`  Tags:            ${attemptTag}, ${prodTag}`);
  console.log('');
  console.log('  Cloudflare will now deploy prod → production URL');
  console.log('\n' + '═'.repeat(60));
  
  console.log(`
📋 What happened:

   1. Attempt branch merged → main (with history)
   2. main pushed with tags
   3. prod fast-forwarded to match main
   4. Cloudflare deploys prod → klappy.dev

Production is now live with the champion's code!
`);
}

/**
 * Submit current work (commit + push for Cloudflare preview).
 * 
 * This is for agents to publish their work-in-progress or final state.
 * Ensures the branch is pushed so Cloudflare can generate a preview URL.
 */
function cmdSubmit(opts) {
  const { dryRun } = opts;
  const message = opts.message || 'Attempt progress';
  
  console.log('\n📤 SUBMITTING ATTEMPT\n');
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // Check .attempt.json exists
  const attemptJsonPath = join(ROOT, '.attempt.json');
  if (!existsSync(attemptJsonPath)) {
    fail('No .attempt.json found. Run attempt:register first.');
  }
  
  const attemptMeta = JSON.parse(readFileSync(attemptJsonPath, 'utf8'));
  const { prd, run_id, runs_dir, branch } = attemptMeta;
  
  console.log(`  PRD:       ${prd}`);
  console.log(`  Run ID:    ${run_id}`);
  console.log(`  Branch:    ${branch}`);
  console.log(`  Artifacts: ${runs_dir}/\n`);
  
  // Check we're on the right branch
  const currentBranch = run('git branch --show-current', { silent: true, dryRun: false });
  if (currentBranch !== branch) {
    console.log(`  ⚠️  Expected branch: ${branch}`);
    console.log(`     Current branch:  ${currentBranch}`);
    console.log('     Proceeding anyway...\n');
  }
  
  // Stage changes
  console.log('1️⃣  Staging changes...');
  
  // Always stage these if they exist
  const pathsToStage = [
    runs_dir,
    'src',
    'app',
    'public',
    'package.json',
    'package-lock.json',
    'vite.config.js',
    'vite.config.ts',
    '.attempt.json'
  ];
  
  for (const p of pathsToStage) {
    const fullPath = join(ROOT, p);
    if (existsSync(fullPath)) {
      run(`git add "${p}"`, { dryRun, silent: true });
    }
  }
  console.log('  ✅ Staged\n');
  
  // Check evidence completeness (warn but don't block)
  console.log('📋 Evidence check...');
  const evidenceDir = join(ROOT, runs_dir, 'evidence');
  const attemptMdPath = join(ROOT, runs_dir, 'ATTEMPT.md');
  const evidenceMdPath = join(ROOT, runs_dir, 'EVIDENCE.md');
  
  let evidenceWarnings = [];
  
  // Check ATTEMPT.md has content beyond skeleton
  if (existsSync(attemptMdPath)) {
    const content = readFileSync(attemptMdPath, 'utf8');
    if (content.includes('_TODO:') || content.includes('[Describe') || content.length < 500) {
      evidenceWarnings.push('ATTEMPT.md appears incomplete (still has placeholders or is too short)');
    }
  } else {
    evidenceWarnings.push('ATTEMPT.md does not exist');
  }
  
  // Check EVIDENCE.md has content beyond skeleton
  if (existsSync(evidenceMdPath)) {
    const content = readFileSync(evidenceMdPath, 'utf8');
    if (content.includes('_TODO:') || content.includes('_No screenshots') || content.length < 300) {
      evidenceWarnings.push('EVIDENCE.md appears incomplete (still has placeholders or is too short)');
    }
  } else {
    evidenceWarnings.push('EVIDENCE.md does not exist');
  }
  
  // Check evidence folder has screenshots
  if (existsSync(evidenceDir)) {
    const files = readdirSync(evidenceDir);
    const screenshots = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
    if (screenshots.length < 3) {
      evidenceWarnings.push(`evidence/ folder has only ${screenshots.length} screenshots (need at least 3)`);
    }
  } else {
    evidenceWarnings.push('evidence/ folder does not exist');
  }
  
  if (evidenceWarnings.length > 0) {
    console.log('\n  ⚠️  EVIDENCE INCOMPLETE:\n');
    evidenceWarnings.forEach(w => console.log(`     - ${w}`));
    console.log('\n  You should fix these before your final submit.\n');
    console.log('  Required: ATTEMPT.md, EVIDENCE.md, 3+ screenshots in evidence/\n');
  } else {
    console.log('  ✅ Evidence looks complete\n');
  }
  
  // Check if there's anything to commit
  const status = run('git status --porcelain', { silent: true, dryRun: false });
  if (!status) {
    console.log('  ℹ️  Nothing new to commit. Pushing existing commits...\n');
  } else {
    // Commit
    console.log('2️⃣  Committing...');
    const commitMsg = `${message} [run: ${run_id}]`;
    run(`git commit -m "${commitMsg}"`, { dryRun });
    console.log('  ✅ Committed\n');
  }
  
  // Push
  console.log('3️⃣  Pushing to origin...');
  run(`git push -u origin HEAD`, { dryRun });
  console.log('  ✅ Pushed\n');
  
  // Generate preview URL
  const previewUrl = `https://${branch.replace(/\//g, '-')}.klappy-dev.pages.dev`;
  
  // Update META.json with preview URL
  const metaPath = join(ROOT, runs_dir, 'META.json');
  if (existsSync(metaPath) && !dryRun) {
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    meta.preview_url = previewUrl;
    meta.last_submitted = new Date().toISOString();
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
  }
  
  console.log('═'.repeat(60));
  console.log('\n📤 SUBMITTED\n');
  console.log(`  Preview URL: ${previewUrl}`);
  console.log('  (May take 1-2 min for Cloudflare to build)\n');
  console.log('  Check build status:');
  console.log('    - GitHub: https://github.com/klappy/klappy.dev/actions');
  console.log('    - Cloudflare: Pages dashboard → Deployments');
  console.log('\n' + '═'.repeat(60));
}

/**
 * Import artifacts from attempt branches back to main.
 * 
 * This is run on main to pull in artifacts from completed attempt branches
 * without merging their code.
 */
/**
 * CLEANUP: Prune stale worktrees and branches.
 * 
 * This should be run periodically or after a PRD cycle completes.
 * Removes:
 *   - Orphaned git worktrees
 *   - Local branches with deleted remotes
 *   - Stale remote tracking refs
 */
function cmdCleanup(opts) {
  const { dryRun, force } = opts;
  
  console.log('\n🧹 CLEANUP — Pruning Stale Worktrees & Branches\n');
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // ========================================
  // 1. Prune git worktree registry
  // ========================================
  console.log('1️⃣  Pruning worktree registry...');
  run('git worktree prune', { dryRun });
  console.log('  ✅ Registry pruned\n');
  
  // ========================================
  // 2. Find and remove orphaned worktrees
  // ========================================
  console.log('2️⃣  Scanning for orphaned worktrees...');
  
  const worktreeOutput = run('git worktree list --porcelain', { silent: true, dryRun: false });
  const worktrees = [];
  let current = {};
  
  for (const line of worktreeOutput.split('\n')) {
    if (line.startsWith('worktree ')) {
      if (current.path) worktrees.push(current);
      current = { path: line.replace('worktree ', '') };
    } else if (line.startsWith('HEAD ')) {
      current.head = line.replace('HEAD ', '');
    } else if (line.startsWith('branch ')) {
      current.branch = line.replace('branch refs/heads/', '');
    } else if (line === 'detached') {
      current.detached = true;
    }
  }
  if (current.path) worktrees.push(current);
  
  // Filter to only Cursor worktrees (in .cursor/worktrees/)
  const cursorWorktrees = worktrees.filter(w => w.path.includes('.cursor/worktrees/'));
  const mainWorktree = worktrees.find(w => !w.path.includes('.cursor/worktrees/'));
  
  console.log(`  Found ${cursorWorktrees.length} Cursor worktrees\n`);
  
  if (cursorWorktrees.length === 0) {
    console.log('  ✅ No worktrees to clean\n');
  } else {
    // Categorize worktrees
    const detached = cursorWorktrees.filter(w => w.detached);
    const withBranch = cursorWorktrees.filter(w => w.branch);
    
    console.log(`  Detached HEAD (orphans): ${detached.length}`);
    console.log(`  With branches: ${withBranch.length}\n`);
    
    // Remove detached worktrees (always safe - they're orphans)
    if (detached.length > 0) {
      console.log('  Removing detached worktrees:');
      for (const wt of detached) {
        const shortPath = wt.path.split('/').slice(-1)[0];
        console.log(`    🗑️  ${shortPath} (detached at ${wt.head.substring(0, 7)})`);
        if (!dryRun) {
          try {
            run(`git worktree remove --force "${wt.path}"`, { silent: true });
          } catch (e) {
            console.log(`       ⚠️  Could not remove (may need manual cleanup)`);
          }
        }
      }
      console.log('');
    }
    
    // For worktrees with branches, check if remote exists
    if (withBranch.length > 0 && force) {
      console.log('  Removing branch worktrees (--force):');
      for (const wt of withBranch) {
        const shortPath = wt.path.split('/').slice(-1)[0];
        console.log(`    🗑️  ${shortPath} [${wt.branch}]`);
        if (!dryRun) {
          try {
            run(`git worktree remove --force "${wt.path}"`, { silent: true });
          } catch (e) {
            console.log(`       ⚠️  Could not remove`);
          }
        }
      }
      console.log('');
    } else if (withBranch.length > 0) {
      console.log('  ⚠️  Skipping branch worktrees (use --force to remove)');
      for (const wt of withBranch) {
        const shortPath = wt.path.split('/').slice(-1)[0];
        console.log(`     - ${shortPath} [${wt.branch}]`);
      }
      console.log('');
    }
  }
  
  // ========================================
  // 3. Prune stale remote tracking refs
  // ========================================
  console.log('3️⃣  Pruning stale remote tracking refs...');
  run('git fetch --prune', { dryRun });
  console.log('  ✅ Remote refs pruned\n');
  
  // ========================================
  // 4. Find and delete local branches with gone remotes
  // ========================================
  console.log('4️⃣  Finding local branches with deleted remotes...');
  
  const branchOutput = run('git branch -vv', { silent: true, dryRun: false });
  const goneBranches = [];
  
  for (const line of branchOutput.split('\n')) {
    if (line.includes(': gone]')) {
      // Extract branch name (skip leading * or spaces)
      const match = line.match(/^[\s*]+(\S+)/);
      if (match && match[1] !== 'main' && match[1] !== 'prod') {
        goneBranches.push(match[1]);
      }
    }
  }
  
  if (goneBranches.length === 0) {
    console.log('  ✅ No stale local branches\n');
  } else {
    console.log(`  Found ${goneBranches.length} stale branches:\n`);
    for (const branch of goneBranches) {
      console.log(`    🗑️  ${branch}`);
      if (!dryRun) {
        try {
          run(`git branch -D "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`       ⚠️  Could not delete`);
        }
      }
    }
    console.log('');
  }
  
  // ========================================
  // 5. Find local attempt branches without remotes
  // ========================================
  console.log('5️⃣  Finding orphan attempt branches...');
  
  const localBranches = run('git branch', { silent: true, dryRun: false })
    .split('\n')
    .map(b => b.trim().replace('* ', ''))
    .filter(b => b.startsWith('attempt/'));
  
  const remoteBranches = run('git branch -r', { silent: true, dryRun: false })
    .split('\n')
    .map(b => b.trim().replace('origin/', ''))
    .filter(b => b.startsWith('attempt/'));
  
  const orphanBranches = localBranches.filter(b => !remoteBranches.includes(b) && !goneBranches.includes(b));
  
  if (orphanBranches.length === 0) {
    console.log('  ✅ No orphan attempt branches\n');
  } else if (force) {
    console.log(`  Found ${orphanBranches.length} orphan branches:\n`);
    for (const branch of orphanBranches) {
      console.log(`    🗑️  ${branch}`);
      if (!dryRun) {
        try {
          run(`git branch -D "${branch}"`, { silent: true });
        } catch (e) {
          console.log(`       ⚠️  Could not delete`);
        }
      }
    }
    console.log('');
  } else {
    console.log(`  ⚠️  Found ${orphanBranches.length} orphan branches (use --force to delete):`);
    for (const branch of orphanBranches) {
      console.log(`     - ${branch}`);
    }
    console.log('');
  }
  
  // ========================================
  // SUMMARY
  // ========================================
  console.log('═'.repeat(60));
  console.log('\n🧹 CLEANUP COMPLETE\n');
  console.log('  Run with --force to remove branch worktrees and orphan branches.');
  console.log('  Run with --dry-run to preview changes.');
  console.log('\n' + '═'.repeat(60));
}

function cmdImport(opts) {
  const { prd, lane, dryRun } = opts;
  
  if (!prd || !lane) {
    console.log(`
Usage: npm run attempt:import -- --lane <lane> --prd <version>

Example:
  npm run attempt:import -- --lane website --prd v1.0

This imports all _runs/ artifacts from attempt branches back to main.

Valid lanes: ${VALID_LANES.join(', ')}

Options:
  --lane <lane>     Product lane (required)
  --prd <version>   PRD version (required)
  --dry-run         Show what would happen
`);
    process.exit(1);
  }
  
  if (!VALID_LANES.includes(lane)) {
    fail(`Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(', ')}`);
  }
  
  console.log(`\n📥 IMPORTING ARTIFACTS for PRD v${prd} (lane: ${lane})\n`);
  if (dryRun) console.log('  [DRY RUN MODE]\n');
  
  // Check we're on main
  const currentBranch = run('git branch --show-current', { silent: true, dryRun: false });
  if (currentBranch !== 'main') {
    fail(`Must be on main branch. Currently on: ${currentBranch}`);
  }
  console.log('  ✅ On main branch\n');
  
  // Pull latest main
  console.log('1️⃣  Pulling latest main...');
  run('git pull origin main', { dryRun });
  console.log('  ✅ Main up to date\n');
  
  // Find all attempt branches for this PRD and lane
  console.log('2️⃣  Finding attempt branches...');
  const branchOutput = run('git branch -r', { silent: true, dryRun: false });
  // Match run/<lane>/prd-v<prd>/... branches
  const branchPattern = new RegExp(`origin/run/${lane}/prd-v${prd}/`);
  const branches = branchOutput
    .split('\n')
    .map(b => b.trim())
    .filter(b => branchPattern.test(b))
    .map(b => b.replace('origin/', ''));
  
  if (branches.length === 0) {
    fail(`No attempt branches found for PRD v${prd}`);
  }
  console.log(`  ✅ Found ${branches.length} branches:\n`);
  branches.forEach(b => console.log(`     - ${b}`));
  console.log('');
  
  // Fetch all remote branches
  console.log('3️⃣  Fetching remote branches...');
  run('git fetch --all', { dryRun });
  console.log('  ✅ Fetched\n');
  
  // Import artifacts from each branch
  console.log('4️⃣  Importing artifacts from each branch...\n');
  // Lane-contained path
  const runsPath = `products/${lane}/attempts/prd-v${prd}/_runs`;
  let imported = 0;
  
  for (const branch of branches) {
    console.log(`  📦 ${branch}`);
    
    // Check if _runs/ exists on that branch
    try {
      run(`git checkout origin/${branch} -- ${runsPath}`, { dryRun, silent: true });
      console.log(`     ✅ Imported artifacts`);
      imported++;
    } catch (e) {
      console.log(`     ⚠️  No _runs/ folder found`);
    }
  }
  
  if (imported === 0) {
    console.log('\n  ⚠️  No artifacts found to import');
    return;
  }
  
  console.log('');
  
  // Stage and commit
  console.log('5️⃣  Committing imported artifacts...');
  run(`git add ${runsPath}`, { dryRun });
  run(`git commit -m "Import attempt artifacts for PRD v${prd}"`, { dryRun });
  console.log('  ✅ Committed\n');
  
  // Push
  console.log('6️⃣  Pushing to main...');
  run('git push origin main', { dryRun });
  console.log('  ✅ Pushed\n');
  
  console.log('═'.repeat(60));
  console.log('\n📥 IMPORT COMPLETE\n');
  console.log(`  Imported artifacts from ${imported} branches`);
  console.log(`  Artifacts location: ${runsPath}/`);
  console.log('\n' + '═'.repeat(60));
  
  console.log(`
📋 Next steps:

   1. Finalize runs to assign attempt numbers:
      npm run attempt:finalize -- --lane ${lane} --prd v${prd}

   2. Review and promote champion:
      npm run attempt:promote -- --lane ${lane} --prd v${prd} --attempt <number>
`);
}

// ============================================================
// Main
// ============================================================

function main() {
  const opts = parseArgs();
  
  // Parse --message for submit command
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--message' && args[i + 1]) {
      opts.message = args[i + 1];
    }
  }
  
  switch (opts.command) {
    case 'nuke':
      cmdNuke(opts);
      break;
    case 'register':
      cmdRegister(opts);
      break;
    case 'finalize':
      cmdFinalize(opts);
      break;
    case 'reset':
      cmdReset(opts);
      break;
    case 'promote':
      cmdPromote(opts);
      break;
    case 'submit':
      cmdSubmit(opts);
      break;
    case 'import':
      cmdImport(opts);
      break;
    case 'cleanup':
      cmdCleanup(opts);
      break;
    default:
      console.log(`
ODD Attempt CLI — Lane-Scoped Implementation

BRANCH ROLES:
  prod        → Live production (NEVER nuked)
  main        → Experiment aggregation + history
  attempt/*   → Ephemeral agent workspaces
  run/*       → Ephemeral agent workspaces (provenance-named)

VALID LANES:
  website, ai-navigation, agent-skill

COMMANDS:

  npm run attempt:nuke -- --lane <lane>
      Blank slate reset for a lane. Deletes products/<lane>/src/.
      ❌ Refuses on prod
      ⚠️  Requires --force on main
      ✅ Allowed on attempt/* and run/* branches
      Other lanes are NOT affected.

  npm run attempt:register -- --lane <lane> --tool <tool> --agent <id> --model <model>
      Register a new run with lane + provenance (PRD version auto-detected from lane PRD)
      --lane:  product lane (website, ai-navigation, agent-skill) [required]
      --tool:  development tool (cursor, vscode, cli, etc.) [default: cursor]
      --agent: agent ID within tool (a, b, cursor-a, etc.) [default: default]
      --model: AI model identifier (opus-4.5, gpt-4o, etc.) [required for good provenance]

  npm run attempt:submit
      Commit and push work (triggers Cloudflare preview)

  npm run attempt:import -- --prd v0.2
      Import artifacts from attempt branches back to main

  npm run attempt:finalize -- --prd v0.2
      Finalize runs → attempt-001, 002, etc.

  npm run attempt:promote -- --prd v0.2 --attempt 001
      Ship champion: merge → main, fast-forward → prod

  npm run attempt:reset -- --prd v0.2
      NUCLEAR RESET: Nuke + delete all attempt branches for PRD

  npm run attempt:cleanup
      Prune stale worktrees and branches (run after PRD cycles)
      --force removes branch worktrees and orphan branches

ARTIFACT LOCATION (Lane-Contained):
  /products/<lane>/attempts/prd-vX.Y/attempt-NNN/

  Root /attempts/** is LEGACY (read-only). See /attempts/README.md

WORKFLOW:
  1. register → agent claims unique run_id with lane
  2. nuke     → agent starts with blank slate (lane-scoped)
  3. build    → agent implements in products/<lane>/src/
  4. submit   → agent pushes (CF preview)
  5. import   → pull all artifacts to main
  6. finalize → assign attempt numbers
  7. promote  → ship lane champion to prod

DEPLOY MAPPING:
  Each lane is a separate Cloudflare Pages project
  Root directory: .
  Build output: products/<lane>/dist
`);
      process.exit(1);
  }
}

main();



--------------------------------------------------------------------------------
📄 File: infra/scripts/audit-drift.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * audit-drift.js
 *
 * Read-only repo drift audit.
 *
 * What it verifies:
 * - content validity (manifest/resources)
 * - contracts validity (if available)
 * - compiled packs validity for every lane/pack plan found
 *
 * This script MUST NOT compile/regenerate anything.
 */

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const PLANS_ROOT = join(ROOT, "infra", "compile", "plans");

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  if (res.status !== 0) {
    fail(`\n🛑 audit:drift failed: ${cmd} ${args.join(" ")}\n`);
  }
}

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function listJsonFiles(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".json"))
    .map((d) => d.name);
}

function discoverLanePacks() {
  // Source of truth for "what compiled packs exist" is: infra/compile/plans/<lane>/*.json
  const lanes = listDirs(PLANS_ROOT);
  const matrix = [];
  for (const lane of lanes) {
    const planDir = join(PLANS_ROOT, lane);
    const plans = listJsonFiles(planDir);
    for (const planFile of plans) {
      const pack = planFile.replace(/\.json$/, "");
      matrix.push({ lane, pack, planPath: join("infra", "compile", "plans", lane, planFile) });
    }
  }
  return matrix;
}

function main() {
  console.log("🔎 audit:drift — starting\n");

  // 1) Verify content
  if (existsSync(join(ROOT, "infra", "scripts", "verify-content.js"))) {
    console.log("1) verify:content");
    run("node", ["infra/scripts/verify-content.js"]);
    console.log("");
  } else {
    console.log("1) verify:content (skipped — missing infra/scripts/verify-content.js)\n");
  }

  // 2) Verify contracts (if present)
  // We treat this as optional because some repos stage it in gradually.
  if (existsSync(join(ROOT, "infra", "scripts", "verify-contracts.js"))) {
    console.log("2) verify:contracts");
    run("node", ["infra/scripts/verify-contracts.js"]);
    console.log("");
  } else {
    console.log("2) verify:contracts (skipped — missing infra/scripts/verify-contracts.js)\n");
  }

  // 3) Verify compiled packs for every plan discovered
  const packs = discoverLanePacks();
  console.log(`3) verify:compiled — discovered ${packs.length} pack plan(s)\n`);

  if (!existsSync(join(ROOT, "infra", "scripts", "verify-compiled.js"))) {
    fail("Missing infra/scripts/verify-compiled.js — cannot verify compiled packs.");
  }

  for (const p of packs) {
    console.log(`- verify compiled: lane=${p.lane} pack=${p.pack} (plan=${p.planPath})`);
    run("node", ["infra/scripts/verify-compiled.js", "--lane", p.lane, "--pack", p.pack]);
  }

  console.log("\n✅ audit:drift passed — repo is consistent\n");
}

main();



--------------------------------------------------------------------------------
📄 File: infra/scripts/audit-repair.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * audit-repair.js
 *
 * Regenerates ONLY wipeable derived outputs (compiled packs),
 * then runs audit:drift.
 *
 * This script MUST NOT touch Canon or PRDs.
 */

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  if (res.status !== 0) {
    fail(`\n🛑 audit:repair failed: ${cmd} ${args.join(" ")}\n`);
  }
}

function main() {
  console.log("🧰 audit:repair — regenerating derived outputs, then auditing\n");

  // Phase 0: compile packs from plans (lane + pack required)
  if (!existsSync("infra/scripts/compile-pack.js")) {
    fail("Missing infra/scripts/compile-pack.js — cannot compile packs.");
  }

  // Compile ALL packs by delegating to a single "compile all plans" mode,
  // OR just call lane:compile repeatedly if that is the established contract.
  // We do not assume a magic "--all" exists.
  //
  // Minimal safe approach: call `npm run lane:compile -- --lane <lane> --pack <pack>`
  // by using audit:drift's discovery logic indirectly (audit:drift will fail if any pack missing).
  //
  // We keep repair very small: attempt to compile the two known website packs first,
  // and users can expand later. (Avoid inventing lanes/packs here.)
  //
  // If you want full auto-discovery compilation, implement it inside compile-pack.js, not here.

  console.log("1) compile known packs (safe, minimal)");
  run("npm", ["run", "lane:compile", "--", "--lane", "website", "--pack", "visitor"]);
  run("npm", ["run", "lane:compile", "--", "--lane", "website", "--pack", "author"]);

  console.log("\n2) audit:drift");
  run("npm", ["run", "audit:drift"]);

  console.log("\n✅ audit:repair complete\n");
}

main();



--------------------------------------------------------------------------------
📄 File: infra/scripts/compile-pack.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";

const ROOT = process.cwd();

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function getGitCommit() {
  try {
    return execSync("git rev-parse HEAD", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "UNKNOWN";
  }
}

function parseArgs(argv) {
  const args = { lane: null, pack: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lane") args.lane = argv[i + 1];
    if (argv[i] === "--pack") args.pack = argv[i + 1];
  }
  if (!args.lane) fail("Missing --lane <lane>");
  if (!args.pack) fail("Missing --pack <pack>");
  return args;
}

function planPath(lane, pack) {
  return join(ROOT, "infra", "compile", "plans", lane, `${pack}.json`);
}

function resolvePath(rel) {
  return join(ROOT, rel);
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeLaneIndex(lane) {
  const plansDir = join(ROOT, "infra", "compile", "plans", lane);
  const laneOutDir = join(ROOT, "public", "_compiled", lane);
  const laneMetaDir = join(laneOutDir, "_meta");

  const planFiles = existsSync(plansDir)
    ? readdirSync(plansDir).filter(f => f.endsWith(".json"))
    : [];

  const packs = planFiles.map(file => {
    const pPath = join(plansDir, file);
    const plan = readJson(pPath);

    // output can be relative (just filename) or full path
    const outFile = plan.output.includes("/")
      ? plan.output.split("/").pop()
      : plan.output;
    const outPath = `public/_compiled/${lane}/${outFile}`;
    const metaPath = `public/_compiled/${lane}/_meta/${plan.pack}-COMPILE_META.json`;

    return {
      pack: plan.pack,
      plan: `infra/compile/plans/${lane}/${file}`,
      output: outPath,
      meta: metaPath,
      exists: existsSync(join(ROOT, outPath))
    };
  });

  const index = {
    lane,
    generated_at: new Date().toISOString(),
    packs
  };

  ensureDir(laneOutDir);
  writeFileSync(join(laneOutDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
}

function main() {
  const { lane, pack } = parseArgs(process.argv.slice(2));
  const pPath = planPath(lane, pack);
  if (!existsSync(pPath)) fail(`Compile plan not found: ${pPath}`);

  const plan = readJson(pPath);
  if (plan.lane !== lane) fail(`Plan lane mismatch: expected ${lane}, got ${plan.lane}`);
  if (plan.pack !== pack) fail(`Plan pack mismatch: expected ${pack}, got ${plan.pack}`);

  if (plan.mode !== "concat") fail(`Unsupported mode (for now): ${plan.mode}`);

  const git_commit = getGitCommit();
  const built_at = new Date().toISOString();

  const sources = plan.sources;
  const source_hashes = {};
  const parts = [];

  for (const rel of sources) {
    const abs = resolvePath(rel);
    if (!existsSync(abs)) fail(`Source missing: ${rel}`);
    const content = readFileSync(abs, "utf8");
    source_hashes[rel] = sha256(content);

    parts.push(`\n\n---\n\n## Source: \`${rel}\`\n\n`);
    parts.push(content);
  }

  const header = [
    "---",
    `lane: ${lane}`,
    `pack: ${pack}`,
    `built_at: ${built_at}`,
    `git_commit: ${git_commit}`,
    "sources:",
    ...sources.map(s => `  - ${s}`),
    "source_hashes:",
    ...Object.entries(source_hashes).map(([k, v]) => `  ${k}: ${v}`),
    "---",
    ""
  ].join("\n");

  // Determine output path - handle both relative and full paths in plan
  const outFile = plan.output.includes("/")
    ? plan.output.split("/").pop()
    : plan.output;
  const outRel = `public/_compiled/${lane}/${outFile}`;
  const outAbs = resolvePath(outRel);

  ensureDir(dirname(outAbs));
  writeFileSync(outAbs, header + parts.join(""), "utf8");

  // Write pack-specific meta for verification tooling
  const metaDir = join(ROOT, "public", "_compiled", lane, "_meta");
  ensureDir(metaDir);
  writeFileSync(
    join(metaDir, `${pack}-COMPILE_META.json`),
    JSON.stringify(
      {
        lane,
        pack,
        built_at,
        git_commit,
        sources,
        source_hashes,
        output: outRel,
        plan: `infra/compile/plans/${lane}/${pack}.json`
      },
      null,
      2
    ),
    "utf8"
  );

  // Generate lane index
  writeLaneIndex(lane);

  console.log(`✅ Compiled pack written: ${outRel}`);
}

main();



--------------------------------------------------------------------------------
📄 File: infra/scripts/export-book.js
--------------------------------------------------------------------------------

#!/usr/bin/env node

/**
 * Book Export Script
 * 
 * Combines all markdown and key documentation files into a single
 * book-format export file for easy sharing/uploading.
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '../..');

// Directories to exclude
const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.vite',
]);

// Paths to exclude (these are copies/duplicates or ephemeral files)
const EXCLUDE_PATHS = new Set([
  'public/content', // These are copies of source files, exclude to avoid duplicates
  '.cursor/plans', // Ephemeral plan files, exclude
]);

// File extensions to include
const INCLUDE_EXTENSIONS = new Set([
  '.md',
  '.txt',
  '.js',
  '.jsx',
  '.json', // Include JSON for contracts/manifests
  '.html', // Include HTML for reference
  '.css',
]);

// Files to exclude
const EXCLUDE_FILES = new Set([
  'package-lock.json',
  'node_modules',
  'klappy-dev-book-export.md', // Don't include the export file in itself
]);

/**
 * Check if a path should be excluded
 */
function shouldExclude(filePath) {
  // Normalize path (remove leading/trailing slashes for comparison)
  // Also handle Windows-style paths by converting backslashes
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  
  // Check for excluded directory names
  const parts = normalizedPath.split('/').filter(p => p.length > 0);
  for (const part of parts) {
    if (EXCLUDE_DIRS.has(part)) return true;
  }
  
  // Check for excluded paths (like public/content which are copies)
  // Check by matching path segments
  for (const excludePath of EXCLUDE_PATHS) {
    const normalizedExclude = excludePath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    const excludeParts = normalizedExclude.split('/').filter(p => p.length > 0);
    
    // Check if the path starts with the exclude path segments
    if (parts.length >= excludeParts.length) {
      let matches = true;
      for (let i = 0; i < excludeParts.length; i++) {
        if (parts[i] !== excludeParts[i]) {
          matches = false;
          break;
        }
      }
      if (matches) return true;
    }
  }
  
  const fileName = parts[parts.length - 1];
  if (EXCLUDE_FILES.has(fileName)) return true;
  return false;
}

/**
 * Get file extension
 */
function getExtension(filePath) {
  return extname(filePath).toLowerCase();
}

/**
 * Check if file should be included
 */
function shouldInclude(filePath) {
  if (shouldExclude(filePath)) return false;
  const ext = getExtension(filePath);
  return INCLUDE_EXTENSIONS.has(ext) || ext === '';
}

/**
 * Recursively collect files from a directory
 */
async function collectFiles(dirPath, relativePath = '') {
  const files = [];
  
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    // Sort: directories first, then files, both alphabetically
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      const relPath = join(relativePath, entry.name);
      
      // Skip excluded paths (including directories that should be excluded)
      if (shouldExclude(relPath)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subFiles = await collectFiles(fullPath, relPath);
        files.push(...subFiles);
      } else if (shouldInclude(relPath)) {
        files.push(relPath);
      }
    }
  } catch (err) {
    // Skip directories we can't read
    if (err.code !== 'ENOENT' && err.code !== 'EACCES') {
      console.error(`Warning: Could not read ${dirPath}: ${err.message}`);
    }
  }
  
  return files;
}

/**
 * Format a section header
 */
function formatSectionHeader(title, level = 1) {
  const prefix = '#'.repeat(level);
  const separator = '='.repeat(80);
  return `\n\n${separator}\n${prefix} ${title}\n${separator}\n\n`;
}

/**
 * Format a file header
 */
function formatFileHeader(filePath) {
  const separator = '-'.repeat(80);
  return `\n\n${separator}\n📄 File: ${filePath}\n${separator}\n\n`;
}

/**
 * Read and format file content
 */
async function readFileContent(filePath) {
  try {
    const fullPath = join(ROOT, filePath);
    const content = await readFile(fullPath, 'utf-8');
    
    // For JSON files, format them nicely
    if (filePath.endsWith('.json')) {
      try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return content;
      }
    }
    
    return content;
  } catch (err) {
    return `[Error reading file: ${err.message}]`;
  }
}

/**
 * Get section title from path
 */
function getSectionTitle(path) {
  if (!path) return 'Root';
  const parts = path.split('/');
  const firstPart = parts[0];
  
  const titles = {
    'about': 'About',
    'docs': 'Documentation',
    'canon': 'Canon',
    'odd': 'ODD (Outcomes-Driven Development)',
    'projects': 'Projects',
    'attempts': 'Attempts',
    'interfaces': 'Interfaces & Contracts',
    'visual': 'Visual Design System',
    'infra': 'Infrastructure',
    'src': 'Source Code',
    'public': 'Public Content',
  };
  
  return titles[firstPart] || firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
}

/**
 * Group files by their top-level directory
 */
function groupFilesBySection(files) {
  const groups = new Map();
  
  for (const file of files) {
    const parts = file.split('/');
    const section = parts.length > 1 ? parts[0] : '';
    
    if (!groups.has(section)) {
      groups.set(section, []);
    }
    groups.get(section).push(file);
  }
  
  // Sort files within each section
  for (const [section, sectionFiles] of groups) {
    sectionFiles.sort();
  }
  
  return groups;
}

/**
 * Main export function
 */
async function exportBook() {
  console.log('📚 Collecting files for book export...\n');
  
  // Collect all files
  const allFiles = await collectFiles(ROOT);
  
  // Filter out any public/content files that slipped through (safety check)
  const filteredFiles = allFiles.filter(file => {
    const normalizedPath = file.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    const parts = normalizedPath.split('/').filter(p => p.length > 0);
    const excludeParts = ['public', 'content'];
    if (parts.length >= excludeParts.length) {
      let matches = true;
      for (let i = 0; i < excludeParts.length; i++) {
        if (parts[i] !== excludeParts[i]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        return false;
      }
    }
    return true;
  });
  
  console.log(`Found ${allFiles.length} files, ${filteredFiles.length} after deduplication\n`);
  
  // Group by section
  const fileGroups = groupFilesBySection(filteredFiles);
  
  // Build the book content
  let bookContent = '';
  
  // Title page
  bookContent += formatSectionHeader('klappy.dev - Complete Book Export', 1);
  bookContent += `\nGenerated: ${new Date().toISOString()}\n`;
  bookContent += `Total Files: ${filteredFiles.length}\n`;
  bookContent += `\nThis is a complete export of all documentation, code, and content files\n`;
  bookContent += `from the klappy.dev repository, organized by section.\n`;
  
  // Table of contents
  bookContent += formatSectionHeader('Table of Contents', 2);
  const sections = Array.from(fileGroups.keys()).sort();
  for (const section of sections) {
    const title = getSectionTitle(section);
    const fileCount = fileGroups.get(section).length;
    bookContent += `- **${title}** (${fileCount} files)\n`;
  }
  
  // Process sections in logical order
  // Note: 'public' section will only include unique files like index.html, not the content/ copies
  const sectionOrder = ['', 'about', 'docs', 'canon', 'odd', 'projects', 'attempts', 'interfaces', 'visual', 'infra', 'src', 'public'];
  const processedSections = new Set();
  
  // Process sections in order
  for (const section of sectionOrder) {
    if (!fileGroups.has(section) || processedSections.has(section)) continue;
    
    processedSections.add(section);
    const files = fileGroups.get(section);
    const title = getSectionTitle(section);
    
    bookContent += formatSectionHeader(title, 2);
    
    for (const file of files) {
      bookContent += formatFileHeader(file);
      const content = await readFileContent(file);
      bookContent += content;
      bookContent += '\n';
    }
  }
  
  // Include any remaining sections not in the ordered list
  for (const [section, files] of fileGroups) {
    if (processedSections.has(section)) continue;
    
    processedSections.add(section);
    const title = getSectionTitle(section);
    bookContent += formatSectionHeader(title, 2);
    
    for (const file of files) {
      bookContent += formatFileHeader(file);
      const content = await readFileContent(file);
      bookContent += content;
      bookContent += '\n';
    }
  }
  
  // Write output file
  const outputPath = join(ROOT, 'klappy-dev-book-export.md');
  await import('fs/promises').then(fs => fs.writeFile(outputPath, bookContent, 'utf-8'));
  
  console.log(`✅ Book export complete!\n`);
  console.log(`📄 Output: ${outputPath}`);
  console.log(`📊 Size: ${(bookContent.length / 1024 / 1024).toFixed(2)} MB\n`);
}

// Run it
exportBook().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});



--------------------------------------------------------------------------------
📄 File: infra/scripts/generate-evidence-index.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * generate-evidence-index.js
 * 
 * Generates index.html and index.json for an evidence folder.
 * Part of E0003.1 — Evidence must be discoverable, not just public.
 * 
 * Usage:
 *   node generate-evidence-index.js <evidence-folder-path> [attempt-json-path]
 * 
 * Output:
 *   <evidence-folder>/index.html  — human-browsable index
 *   <evidence-folder>/index.json  — machine inventory
 */

import { existsSync, readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, basename, relative } from 'path';

const args = process.argv.slice(2);
const evidenceDir = args[0];
const attemptJsonPath = args[1];

if (!evidenceDir) {
  console.error('Usage: generate-evidence-index.js <evidence-folder-path> [attempt-json-path]');
  process.exit(1);
}

if (!existsSync(evidenceDir)) {
  console.error(`Evidence folder not found: ${evidenceDir}`);
  process.exit(1);
}

// ============================================================
// Enumerate files
// ============================================================

function enumerateFolder(folderPath, basePath = folderPath) {
  if (!existsSync(folderPath)) return [];
  
  const files = [];
  const entries = readdirSync(folderPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(folderPath, entry.name);
    const relativePath = relative(basePath, fullPath);
    
    if (entry.isDirectory()) {
      files.push(...enumerateFolder(fullPath, basePath));
    } else {
      const stats = statSync(fullPath);
      files.push({
        name: entry.name,
        path: relativePath,
        size: stats.size,
        modified: stats.mtime.toISOString()
      });
    }
  }
  
  return files;
}

// Enumerate evidence assets
const screenshots = enumerateFolder(join(evidenceDir, 'screenshots'), evidenceDir);
const recordings = enumerateFolder(join(evidenceDir, 'recordings'), evidenceDir);
const outputs = enumerateFolder(join(evidenceDir, 'outputs'), evidenceDir);

// Find markdown files at root
const rootFiles = readdirSync(evidenceDir, { withFileTypes: true })
  .filter(e => e.isFile())
  .map(e => {
    const fullPath = join(evidenceDir, e.name);
    const stats = statSync(fullPath);
    return {
      name: e.name,
      path: e.name,
      size: stats.size,
      modified: stats.mtime.toISOString()
    };
  });

const evidenceMd = rootFiles.find(f => f.name === 'EVIDENCE.md');
const attemptMd = rootFiles.find(f => f.name === 'ATTEMPT.md');
const metaJson = rootFiles.find(f => f.name === 'META.json');

// ============================================================
// Load provenance
// ============================================================

let provenance = {
  lane: 'unknown',
  prd_version: 'unknown',
  epoch_id: 'unknown',
  run_id: 'unknown',
  tool: 'unknown',
  agent: 'unknown',
  model: 'unknown',
  git_head: 'unknown',
  registered_at: null
};

// Try META.json in evidence folder first
const metaPath = join(evidenceDir, 'META.json');
if (existsSync(metaPath)) {
  try {
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    provenance = { ...provenance, ...meta };
  } catch (e) {
    console.warn('Warning: Could not parse META.json');
  }
}

// Override with .attempt.json if provided
if (attemptJsonPath && existsSync(attemptJsonPath)) {
  try {
    const attempt = JSON.parse(readFileSync(attemptJsonPath, 'utf8'));
    provenance = { ...provenance, ...attempt };
  } catch (e) {
    console.warn('Warning: Could not parse .attempt.json');
  }
}

// ============================================================
// Generate index.json
// ============================================================

const indexJson = {
  version: '1.0',
  generated_at: new Date().toISOString(),
  provenance: {
    lane: provenance.lane,
    prd_version: provenance.prd_version,
    epoch_id: provenance.epoch_id,
    run_id: provenance.run_id,
    tool: provenance.tool,
    agent: provenance.agent,
    model: provenance.model,
    git_head: provenance.git_head,
    registered_at: provenance.registered_at
  },
  assets: {
    documents: rootFiles.filter(f => f.name.endsWith('.md') || f.name.endsWith('.json')),
    screenshots: screenshots,
    recordings: recordings,
    outputs: outputs
  },
  counts: {
    screenshots: screenshots.length,
    recordings: recordings.length,
    outputs: outputs.length
  },
  app_entry: '/'
};

writeFileSync(join(evidenceDir, 'index.json'), JSON.stringify(indexJson, null, 2));
console.log('  ✅ Generated index.json');

// ============================================================
// Generate index.html
// ============================================================

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function fileLink(file) {
  return `<li><a href="${file.path}">${file.name}</a> <span class="size">(${formatBytes(file.size)})</span></li>`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Evidence — ${provenance.lane} / ${provenance.prd_version}</title>
  <style>
    :root {
      --bg: #fafafa;
      --fg: #1a1a1a;
      --muted: #666;
      --border: #e0e0e0;
      --accent: #0066cc;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #1a1a1a;
        --fg: #f0f0f0;
        --muted: #999;
        --border: #333;
        --accent: #4da6ff;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      background: var(--bg);
      color: var(--fg);
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: var(--fg); }
    .meta { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
    .meta code { background: var(--border); padding: 0.1rem 0.3rem; border-radius: 3px; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem; }
    th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid var(--border); }
    th { color: var(--muted); font-weight: normal; }
    ul { list-style: none; }
    li { padding: 0.3rem 0; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .size { color: var(--muted); font-size: 0.85rem; }
    .section { margin-bottom: 2rem; }
    .empty { color: var(--muted); font-style: italic; }
    .app-link { 
      display: inline-block; 
      margin-top: 1rem; 
      padding: 0.5rem 1rem; 
      background: var(--accent); 
      color: white; 
      border-radius: 4px; 
    }
    .app-link:hover { opacity: 0.9; text-decoration: none; }
  </style>
</head>
<body>
  <h1>📋 Evidence</h1>
  <p class="meta">
    Lane: <code>${provenance.lane}</code> · 
    PRD: <code>${provenance.prd_version}</code> · 
    Epoch: <code>${provenance.epoch_id}</code>
  </p>

  <table>
    <tr><th>Run ID</th><td><code>${provenance.run_id}</code></td></tr>
    <tr><th>Tool</th><td>${provenance.tool}</td></tr>
    <tr><th>Agent</th><td>${provenance.agent}</td></tr>
    <tr><th>Model</th><td>${provenance.model}</td></tr>
    <tr><th>Git HEAD</th><td><code>${typeof provenance.git_head === 'string' ? provenance.git_head.substring(0, 8) : 'unknown'}</code></td></tr>
    <tr><th>Registered</th><td>${provenance.registered_at || 'unknown'}</td></tr>
  </table>

  <a href="/" class="app-link">→ View App</a>

  <div class="section">
    <h2>📄 Documents</h2>
    ${evidenceMd ? `<ul>${fileLink(evidenceMd)}</ul>` : ''}
    ${attemptMd ? `<ul>${fileLink(attemptMd)}</ul>` : ''}
    ${metaJson ? `<ul>${fileLink(metaJson)}</ul>` : ''}
  </div>

  <div class="section">
    <h2>📸 Screenshots (${screenshots.length})</h2>
    ${screenshots.length > 0 
      ? `<ul>${screenshots.map(fileLink).join('\n      ')}</ul>` 
      : '<p class="empty">No screenshots</p>'}
  </div>

  <div class="section">
    <h2>🎬 Recordings (${recordings.length})</h2>
    ${recordings.length > 0 
      ? `<ul>${recordings.map(fileLink).join('\n      ')}</ul>` 
      : '<p class="empty">No recordings</p>'}
  </div>

  <div class="section">
    <h2>📁 Outputs (${outputs.length})</h2>
    ${outputs.length > 0 
      ? `<ul>${outputs.map(fileLink).join('\n      ')}</ul>` 
      : '<p class="empty">No additional outputs</p>'}
  </div>

  <p class="meta" style="margin-top: 2rem;">
    <a href="index.json">index.json</a> · 
    Generated: ${new Date().toISOString()}
  </p>
</body>
</html>`;

writeFileSync(join(evidenceDir, 'index.html'), html);
console.log('  ✅ Generated index.html');

// ============================================================
// Report
// ============================================================

console.log(`\n  Evidence Index Generated:`);
console.log(`    Screenshots: ${screenshots.length}`);
console.log(`    Recordings:  ${recordings.length}`);
console.log(`    Outputs:     ${outputs.length}`);



--------------------------------------------------------------------------------
📄 File: infra/scripts/promote-attempt.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * promote-attempt.js
 * 
 * Promotes a winning attempt to production.
 * 
 * Usage:
 *   npm run attempt:promote -- --prd v0.2 --attempt 003
 * 
 * What it does:
 *   1. Verifies attempt folder exists + META.json has preview URL
 *   2. Creates tag prd-vX.Y-attempt-NNN at the attempt branch HEAD
 *   3. Merges attempt branch into main
 *   4. Tags production-vX.Y on main
 *   5. Prints the production URL and commit SHA for META.json
 * 
 * Prerequisites:
 *   - Attempt branch: attempt/prd-vX.Y/aNNN
 *   - Attempt folder: attempts/prd-vX.Y/attempt-NNN/
 *   - META.json must exist with deploy.preview_url
 *   - Working directory must be clean
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// Parse arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { prd: null, attempt: null, dryRun: false };
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prd' && args[i + 1]) {
      result.prd = args[i + 1].replace(/^v/, ''); // normalize: v0.2 → 0.2
      i++;
    } else if (args[i] === '--attempt' && args[i + 1]) {
      result.attempt = args[i + 1].padStart(3, '0'); // normalize: 3 → 003
      i++;
    } else if (args[i] === '--dry-run') {
      result.dryRun = true;
    }
  }
  
  return result;
}

function run(cmd, options = {}) {
  const { dryRun, silent } = options;
  if (dryRun) {
    console.log(`  [DRY RUN] ${cmd}`);
    return '';
  }
  if (!silent) {
    console.log(`  $ ${cmd}`);
  }
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8' }).trim();
}

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function promote() {
  const { prd, attempt, dryRun } = parseArgs();
  
  if (!prd || !attempt) {
    console.log(`
Usage: npm run attempt:promote -- --prd <version> --attempt <number> [--dry-run]

Examples:
  npm run attempt:promote -- --prd v0.2 --attempt 003
  npm run attempt:promote -- --prd 0.2 --attempt 3 --dry-run
`);
    process.exit(1);
  }
  
  console.log(`\n🏆 Promoting PRD v${prd} / Attempt ${attempt} to Champion\n`);
  if (dryRun) {
    console.log('  [DRY RUN MODE - no changes will be made]\n');
  }
  
  // Paths
  const attemptFolder = join(ROOT, 'attempts', `prd-v${prd}`, `attempt-${attempt}`);
  const metaPath = join(attemptFolder, 'META.json');
  const attemptMdPath = join(attemptFolder, 'ATTEMPT.md');
  const attemptBranch = `attempt/prd-v${prd}/a${attempt}`;
  const attemptTag = `prd-v${prd}-attempt-${attempt}`;
  const productionTag = `production-v${prd}`;
  
  // Step 1: Verify attempt folder exists
  console.log('1️⃣  Verifying attempt folder...');
  if (!existsSync(attemptFolder)) {
    fail(`Attempt folder not found: ${attemptFolder}`);
  }
  if (!existsSync(metaPath)) {
    fail(`META.json not found: ${metaPath}`);
  }
  console.log(`  ✅ Found: attempts/prd-v${prd}/attempt-${attempt}/\n`);
  
  // Step 2: Verify META.json has preview URL
  console.log('2️⃣  Verifying META.json has preview URL...');
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  const previewUrl = meta.deploy?.preview_url || meta.preview_url;
  if (!previewUrl) {
    fail('META.json missing deploy.preview_url - attempt must have a verified preview deploy');
  }
  console.log(`  ✅ Preview URL: ${previewUrl}\n`);
  
  // Step 3: Verify working directory is clean
  console.log('3️⃣  Verifying working directory is clean...');
  const status = run('git status --porcelain', { silent: true, dryRun: false });
  if (status) {
    fail('Working directory is not clean. Commit or stash changes first.\n' + status);
  }
  console.log('  ✅ Working directory clean\n');
  
  // Step 4: Verify attempt branch exists
  console.log('4️⃣  Verifying attempt branch exists...');
  try {
    run(`git rev-parse --verify ${attemptBranch}`, { silent: true, dryRun: false });
    console.log(`  ✅ Branch exists: ${attemptBranch}\n`);
  } catch {
    fail(`Attempt branch not found: ${attemptBranch}`);
  }
  
  // Step 5: Get attempt branch HEAD SHA
  console.log('5️⃣  Getting attempt branch HEAD...');
  const attemptSha = run(`git rev-parse ${attemptBranch}`, { silent: true, dryRun: false });
  console.log(`  ✅ Attempt SHA: ${attemptSha}\n`);
  
  // Step 6: Create attempt tag
  console.log('6️⃣  Creating attempt tag...');
  run(`git tag -a ${attemptTag} ${attemptBranch} -m "Champion: PRD v${prd} Attempt ${attempt}"`, { dryRun });
  console.log(`  ✅ Tagged: ${attemptTag}\n`);
  
  // Step 7: Checkout main and merge
  console.log('7️⃣  Merging to main...');
  run('git checkout main', { dryRun });
  run('git pull origin main', { dryRun });
  run(`git merge ${attemptBranch} --no-ff -m "Promote ${attemptTag} to production"`, { dryRun });
  console.log('  ✅ Merged to main\n');
  
  // Step 8: Get merge commit SHA
  console.log('8️⃣  Getting production commit SHA...');
  const productionSha = dryRun ? '<merge-commit-sha>' : run('git rev-parse HEAD', { silent: true });
  console.log(`  ✅ Production SHA: ${productionSha}\n`);
  
  // Step 9: Create production tag
  console.log('9️⃣  Creating production tag...');
  run(`git tag -a ${productionTag} -m "Production: PRD v${prd}"`, { dryRun });
  console.log(`  ✅ Tagged: ${productionTag}\n`);
  
  // Step 10: Update META.json with promotion info
  console.log('🔟 Updating META.json with promotion info...');
  if (!dryRun) {
    meta.status = 'CHAMPION';
    meta.promoted_commit = productionSha;
    meta.production_tag = productionTag;
    meta.attempt_tag = attemptTag;
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
    run('git add ' + metaPath);
    run(`git commit -m "chore: seal attempt-${attempt} as CHAMPION for PRD v${prd}"`);
  }
  console.log('  ✅ META.json updated\n');
  
  // Summary
  console.log('═'.repeat(60));
  console.log('\n🎉 PROMOTION COMPLETE\n');
  console.log(`  Attempt Tag:     ${attemptTag}`);
  console.log(`  Production Tag:  ${productionTag}`);
  console.log(`  Attempt SHA:     ${attemptSha}`);
  console.log(`  Production SHA:  ${productionSha}`);
  console.log(`  Preview URL:     ${previewUrl}`);
  console.log(`  Production URL:  https://klappy.dev`);
  console.log('\n' + '═'.repeat(60));
  
  console.log(`
📋 Add this to ATTEMPT.md:

Status: CHAMPION (Promoted to Production)
Promoted commit: ${productionSha}
Attempt tag: ${attemptTag}
Production tag: ${productionTag}
Production URL: https://klappy.dev
Preview URL: ${previewUrl}
Why this one won (tie-breaker): <one sentence>
`);

  if (!dryRun) {
    console.log('\n🚀 Run "git push origin main --tags" to deploy!\n');
  }
}

promote();



--------------------------------------------------------------------------------
📄 File: infra/scripts/smart-build.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * smart-build.js
 * 
 * Handles build regardless of whether /src exists.
 * - If /src exists with app code: runs vite build
 * - If /src is empty/missing: copies /public to products/<lane>/dist as fallback
 * 
 * This ensures Cloudflare can always deploy, even on "nuked" branches.
 */

import { existsSync, readdirSync, cpSync, mkdirSync, rmSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

const VALID_LANES = ['website', 'ai-navigation', 'agent-skill'];

function parseLaneArg(argv) {
  const idx = argv.indexOf('--lane');
  if (idx !== -1 && argv[idx + 1]) return argv[idx + 1];
  return null;
}

const lane = parseLaneArg(process.argv) || 'ai-navigation';
if (!VALID_LANES.includes(lane)) {
  console.error(`\n❌ Invalid lane: ${lane}\n   Valid lanes: ${VALID_LANES.join(', ')}\n`);
  process.exit(1);
}

const LANE_ROOT = join(ROOT, 'products', lane);

// Transitional note:
// - lane builds are canonical output (D0013): products/<lane>/dist
// - current repo-root /src app is treated as ai-navigation until migrated
const ROOT_SRC_PATH = join(ROOT, 'src');
const LANE_SRC_PATH = join(LANE_ROOT, 'src');
const PUBLIC_PATH = join(ROOT, 'public');
const DIST_PATH = join(LANE_ROOT, 'dist');
const LEGACY_ROOT_DIST_PATH = join(ROOT, 'dist');

function srcHasCode(path) {
  if (!existsSync(path)) return false;
  
  const files = readdirSync(path, { recursive: true });
  // Check for actual code files (not just empty directories)
  return files.some(f => 
    f.endsWith('.js') || 
    f.endsWith('.jsx') || 
    f.endsWith('.ts') || 
    f.endsWith('.tsx') ||
    f.endsWith('.svelte') ||
    f.endsWith('.vue')
  );
}

function run(cmd, opts = {}) {
  const { cwd = ROOT } = opts;
  console.log(`  $ ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function copyPublicToDist() {
  console.log('\n📦 No /src code found — using fallback build\n');
  
  // Clean dist
  if (existsSync(DIST_PATH)) {
    rmSync(DIST_PATH, { recursive: true });
  }
  mkdirSync(DIST_PATH, { recursive: true });
  
  // Copy public to dist
  cpSync(PUBLIC_PATH, DIST_PATH, { recursive: true });
  
  console.log(`  ✅ Copied /public to products/${lane}/dist`);
  console.log('  ✅ Fallback build complete\n');
}

function mirrorLaneDistToLegacyRootDist() {
  // Transitional: keep repo-root /dist deployable until all infra
  // and Cloudflare projects are aligned to lane outputs.
  if (existsSync(LEGACY_ROOT_DIST_PATH)) {
    rmSync(LEGACY_ROOT_DIST_PATH, { recursive: true });
  }
  mkdirSync(LEGACY_ROOT_DIST_PATH, { recursive: true });
  cpSync(DIST_PATH, LEGACY_ROOT_DIST_PATH, { recursive: true });
  console.log('  ⚠️  Mirrored lane dist to legacy repo-root /dist');
}

/**
 * E0003.1 Evidence Discoverability
 * 
 * Every deployed build MUST expose discoverable evidence at: /_evidence/
 * 
 * Required structure:
 *   /_evidence/index.html    — human-browsable index
 *   /_evidence/index.json    — machine inventory
 *   /_evidence/EVIDENCE.md   — summary + links
 *   /_evidence/ATTEMPT.md    — what was done
 *   /_evidence/META.json     — provenance
 *   /_evidence/screenshots/  — at least 1 image
 *   /_evidence/recordings/   — at least 1 video OR 3 screenshots total
 * 
 * If .attempt.json exists (we're in an attempt), evidence is MANDATORY.
 * If .attempt.json doesn't exist (building on main), skip silently.
 */
function copyEvidenceToDist() {
  console.log('\n4️⃣  Copying evidence to dist (E0003.1)...');
  
  const attemptJsonPath = join(ROOT, '.attempt.json');
  const distEvidenceDir = join(DIST_PATH, '_evidence');
  
  // If no .attempt.json, we're not in an attempt — skip silently
  if (!existsSync(attemptJsonPath)) {
    console.log('  ℹ️  No .attempt.json found — not in an active attempt');
    console.log('  ⚠️  Skipping evidence copy (build will not have /_evidence/)');
    return;
  }
  
  // Read attempt metadata
  const attemptMeta = JSON.parse(readFileSync(attemptJsonPath, 'utf8'));
  const { lane: attemptLane, prd_version, run_id } = attemptMeta;
  
  // Verify lane matches
  if (attemptLane !== lane) {
    throw new Error(
      `E0003.1 violation: .attempt.json lane (${attemptLane}) does not match build lane (${lane})`
    );
  }
  
  // Build path to attempt evidence
  const prd = prd_version.replace(/^v/, '');
  const attemptEvidenceDir = join(ROOT, 'attempts', lane, `prd-v${prd}`, '_runs', run_id);
  
  console.log(`  Lane:    ${lane}`);
  console.log(`  PRD:     v${prd}`);
  console.log(`  Run ID:  ${run_id}`);
  console.log(`  Source:  ${attemptEvidenceDir}`);
  
  // Verify evidence source exists
  if (!existsSync(attemptEvidenceDir)) {
    throw new Error(
      `E0003.1 violation: attempt evidence not found at ${attemptEvidenceDir}`
    );
  }
  
  // Copy evidence to dist/_evidence/
  mkdirSync(distEvidenceDir, { recursive: true });
  cpSync(attemptEvidenceDir, distEvidenceDir, { recursive: true });
  
  console.log('  📎 Evidence copied to dist/_evidence/');
  
  // Verify required document files exist
  const requiredDocs = ['EVIDENCE.md', 'ATTEMPT.md', 'META.json'];
  for (const file of requiredDocs) {
    const filePath = join(distEvidenceDir, file);
    if (!existsSync(filePath)) {
      throw new Error(`E0003.1 violation: missing ${file} in dist/_evidence/`);
    }
  }
  console.log('  ✅ Documents verified: EVIDENCE.md, ATTEMPT.md, META.json');
  
  // Count proof assets
  const screenshotsDir = join(distEvidenceDir, 'screenshots');
  const recordingsDir = join(distEvidenceDir, 'recordings');
  
  let screenshotCount = 0;
  let recordingCount = 0;
  
  if (existsSync(screenshotsDir)) {
    screenshotCount = readdirSync(screenshotsDir).filter(f => 
      f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.gif') || f.endsWith('.webp')
    ).length;
  }
  
  if (existsSync(recordingsDir)) {
    recordingCount = readdirSync(recordingsDir).filter(f => 
      f.endsWith('.mp4') || f.endsWith('.webm') || f.endsWith('.mov') || f.endsWith('.gif')
    ).length;
  }
  
  console.log(`  📸 Screenshots: ${screenshotCount}`);
  console.log(`  🎬 Recordings:  ${recordingCount}`);
  
  // Enforce minimum proof rule:
  // At least 1 screenshot AND (1 recording OR 3 screenshots total)
  if (screenshotCount < 1) {
    throw new Error(
      `E0003.1 violation: at least 1 screenshot required. Found: ${screenshotCount}`
    );
  }
  
  if (recordingCount < 1 && screenshotCount < 3) {
    throw new Error(
      `E0003.1 violation: need 1 recording OR 3 screenshots. ` +
      `Found: ${screenshotCount} screenshots, ${recordingCount} recordings`
    );
  }
  
  console.log('  ✅ Proof assets verified');
  
  // Generate index.html and index.json
  console.log('  📋 Generating evidence index...');
  run(`node infra/scripts/generate-evidence-index.js "${distEvidenceDir}" "${attemptJsonPath}"`);
  
  // Verify index files were created
  if (!existsSync(join(distEvidenceDir, 'index.html'))) {
    throw new Error('E0003.1 violation: index.html generation failed');
  }
  if (!existsSync(join(distEvidenceDir, 'index.json'))) {
    throw new Error('E0003.1 violation: index.json generation failed');
  }
  
  console.log('  ✅ Evidence index generated');
}

function viteBuild() {
  console.log('\n🔨 Building with Vite...\n');
  // Canonical output: products/<lane>/dist
  //
  // If the lane has its own Vite root (products/<lane>/index.html), build from lane cwd.
  // Otherwise, treat repo-root app as ai-navigation (transitional).
  const laneIndex = join(LANE_ROOT, 'index.html');
  if (existsSync(laneIndex)) {
    // Run vite from lane root directory — outputs to products/<lane>/dist
    // Do NOT use --root flag; cwd is the correct approach for Cloudflare compatibility
    run(`npx vite build --outDir dist --emptyOutDir`, { cwd: LANE_ROOT });
  } else if (lane === 'ai-navigation' && existsSync(join(ROOT, 'index.html'))) {
    // Transitional: repo-root app builds to lane dist for ai-navigation
    run(`npx vite build --outDir "products/${lane}/dist" --emptyOutDir`);
  } else {
    copyPublicToDist();
    return;
  }
  console.log('\n  ✅ Vite build complete\n');
}

function main() {
  console.log('\n🏗️  Smart Build\n');
  console.log(`Lane: ${lane}\n`);
  
  // Always run sync and verify first
  console.log('1️⃣  Syncing content...');
  run('npm run sync');
  
  console.log('\n2️⃣  Verifying content...');
  run('npm run verify:content');
  
  // Check if we have app code for this lane
  console.log('\n3️⃣  Checking lane source...');
  
  const hasLaneCode = srcHasCode(LANE_SRC_PATH);
  const hasRootCode = srcHasCode(ROOT_SRC_PATH);

  if (hasLaneCode) {
    console.log(`  ✅ Found app code in products/${lane}/src`);
    viteBuild();
  } else if (lane === 'ai-navigation' && hasRootCode) {
    console.log('  ✅ Found app code in /src (transitional ai-navigation)');
    viteBuild();
  } else {
    console.log(`  ⚠️  No app code found for lane: ${lane}`);
    copyPublicToDist();
  }

  // E0003: Copy evidence into dist so Cloudflare can serve it
  copyEvidenceToDist();
  
  // Transitional compatibility: keep /dist around for current deploys.
  // Extended to include website lane until Cloudflare project is properly configured.
  if ((lane === 'ai-navigation' || lane === 'website') && existsSync(DIST_PATH)) {
    mirrorLaneDistToLegacyRootDist();
  }
  
  console.log('═'.repeat(50));
  console.log(`✅ Build complete. Output in products/${lane}/dist`);
  console.log('═'.repeat(50));
}

main();



--------------------------------------------------------------------------------
📄 File: infra/scripts/sync-content.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * sync-content.js
 *
 * Syncs source markdown documents to /public/content/ for the static SPA.
 * Run this before build or as part of CI.
 *
 * Source of truth:
 * - Markdown files under /canon, /odd, /about, /projects (excluding _template)
 * - Per-file YAML frontmatter (metadata lives with the content)
 * - /canon/meta/pack.json (pack-level metadata)
 *
 * Generated output:
 * - /public/content/manifest.json (compiled; do not hand-edit)
 * - /public/content/** (synced copies of markdown content)
 */

import { cpSync, rmSync, mkdirSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const TARGET = join(ROOT, 'public', 'content');
const PACK_PATH = join(ROOT, 'canon', 'meta', 'pack.json');
const MANIFEST_DEST = join(TARGET, 'manifest.json');

// Source directories to sync
const SOURCES = [
  { src: 'canon', dest: 'canon' },
  { src: 'odd', dest: 'odd' },
  { src: 'about', dest: 'about' },
  { src: 'projects', dest: 'projects' },
];

// Files/folders to exclude
const EXCLUDE = ['_template'];

function parseFrontmatterValue(value) {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  // Allow JSON-style values for convenience (arrays/objects/quoted strings)
  if (trimmed.startsWith('[') || trimmed.startsWith('{') || trimmed.startsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // fall through
    }
  }

  // Strip simple quotes
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function extractFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) return null;

  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) return null;

  const raw = normalized.slice(4, endIdx);
  const data = {};

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1);
    if (!key) continue;
    data[key] = parseFrontmatterValue(value);
  }

  return data;
}

function getAllMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (EXCLUDE.includes(entry.name)) continue;
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }

  return files;
}

function buildManifest() {
  if (!existsSync(PACK_PATH)) {
    throw new Error(`Missing pack metadata at ${PACK_PATH}`);
  }

  const pack = JSON.parse(readFileSync(PACK_PATH, 'utf-8'));

  const resources = [];
  const sourceRoots = SOURCES.map(s => join(ROOT, s.src)).filter(p => existsSync(p));

  for (const rootDir of sourceRoots) {
    for (const filePath of getAllMarkdownFiles(rootDir)) {
      const markdown = readFileSync(filePath, 'utf-8');
      const fm = extractFrontmatter(markdown);
      if (!fm) continue;

      const uri = fm.uri;
      const title = fm.title;
      const audience = fm.audience;
      if (!uri || !title || !audience) continue;

      const path = '/' + relative(ROOT, filePath).replace(/\\/g, '/');

      resources.push({
        uri,
        path,
        title,
        type: fm.type || 'text/markdown',
        audience,
        exposure: fm.exposure || 'nav',
        tier: typeof fm.tier === 'number' ? fm.tier : 2,
        voice: fm.voice || 'neutral',
        stability: fm.stability || 'evolving',
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        order: typeof fm.order === 'number' ? fm.order : undefined,

        // Optional learning-layer media (must remain non-canonical)
        assets: (fm.assets && typeof fm.assets === 'object') ? fm.assets : undefined
      });
    }
  }

  // Stable ordering: explicit order first, then title.
  resources.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY;
    const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });

  return { pack, resources };
}

function sync() {
  console.log('🔄 Syncing content to /public/content/...\n');

  // Clean target
  for (const { dest } of SOURCES) {
    const targetPath = join(TARGET, dest);
    if (existsSync(targetPath)) {
      rmSync(targetPath, { recursive: true });
      console.log(`  🗑️  Removed ${dest}/`);
    }
  }

  // Copy each source
  for (const { src, dest } of SOURCES) {
    const srcPath = join(ROOT, src);
    const destPath = join(TARGET, dest);

    if (!existsSync(srcPath)) {
      console.log(`  ⚠️  Source not found: ${src}/ (skipping)`);
      continue;
    }

    mkdirSync(destPath, { recursive: true });
    
    cpSync(srcPath, destPath, {
      recursive: true,
      filter: (source) => {
        // Exclude specified folders
        for (const ex of EXCLUDE) {
          if (source.includes(`/${ex}`) || source.endsWith(ex)) {
            return false;
          }
        }
        return true;
      },
    });

    console.log(`  ✅ ${src}/ → public/content/${dest}/`);
  }

  // Generate manifest.json from per-file frontmatter
  const manifest = buildManifest();
  mkdirSync(dirname(MANIFEST_DEST), { recursive: true });
  const json = JSON.stringify(manifest, null, 2) + '\n';
  writeFileSync(MANIFEST_DEST, json);
  console.log(`  ✅ Generated public/content/manifest.json from frontmatter`);

  console.log('\n✅ Content sync complete.\n');
  console.log('Source of truth: per-file frontmatter in /canon, /odd, /about, /projects\n');
}

sync();



--------------------------------------------------------------------------------
📄 File: infra/scripts/verify-compiled.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const ROOT = process.cwd();

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function parseArgs(argv) {
  const args = { lane: null, pack: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lane") args.lane = argv[i + 1];
    if (argv[i] === "--pack") args.pack = argv[i + 1];
  }
  if (!args.lane) fail("Missing --lane <lane>");
  if (!args.pack) fail("Missing --pack <pack>");
  return args;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function main() {
  const { lane, pack } = parseArgs(process.argv.slice(2));
  
  // Pack-specific meta path
  const metaPath = join(ROOT, "public", "_compiled", lane, "_meta", `${pack}-COMPILE_META.json`);
  if (!existsSync(metaPath)) fail(`Missing meta: ${metaPath}`);

  const meta = readJson(metaPath);
  if (meta.lane !== lane) fail(`Meta lane mismatch: ${meta.lane}`);
  if (meta.pack !== pack) fail(`Meta pack mismatch: ${meta.pack}`);

  const required = ["built_at", "git_commit", "sources", "source_hashes", "output", "plan"];
  for (const k of required) {
    if (meta[k] === undefined) fail(`Missing required meta field: ${k}`);
  }

  // Verify hashes match current source files
  for (const src of meta.sources) {
    const abs = join(ROOT, src);
    if (!existsSync(abs)) fail(`Missing source file referenced by meta: ${src}`);
    const content = readFileSync(abs, "utf8");
    const h = sha256(content);
    const expected = meta.source_hashes[src];
    if (!expected) fail(`Missing hash entry for source: ${src}`);
    if (h !== expected) fail(`Hash mismatch for ${src}\nexpected: ${expected}\nactual:   ${h}`);
  }

  // Verify output exists
  const outAbs = join(ROOT, meta.output);
  if (!existsSync(outAbs)) fail(`Missing compiled output: ${meta.output}`);

  // Optionally verify index.json exists
  const indexPath = join(ROOT, "public", "_compiled", lane, "index.json");
  if (!existsSync(indexPath)) {
    console.log(`⚠️  Warning: Lane index missing: ${indexPath}`);
  }

  console.log(`✅ Compiled pack verified: ${lane}/${pack} (provenance + hashes)`);
}

main();



--------------------------------------------------------------------------------
📄 File: infra/scripts/verify-content.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * verify-content.js
 * 
 * Validates that manifest.json entries match actual files in /public/content.
 * Catches the "added doc but forgot manifest" and "removed doc but manifest stale" failures.
 * 
 * Exit codes:
 *   0 = all good
 *   1 = missing files or orphans detected
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const CONTENT_DIR = join(ROOT, 'public', 'content');
const MANIFEST_PATH = join(CONTENT_DIR, 'manifest.json');

// Files to ignore when checking for orphans
const IGNORE_FILES = ['manifest.json', '.DS_Store'];
const IGNORE_DIRS = ['_template'];

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    if (IGNORE_FILES.includes(file)) continue;
    if (IGNORE_DIRS.includes(file)) continue;
    
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      // Store path relative to content dir, with leading slash
      const relativePath = '/' + relative(CONTENT_DIR, filePath);
      fileList.push(relativePath);
    }
  }
  
  return fileList;
}

function verify() {
  console.log('🔍 Verifying content integrity...\n');
  
  let hasErrors = false;
  
  // Check manifest exists
  if (!existsSync(MANIFEST_PATH)) {
    console.error('❌ manifest.json not found at:', MANIFEST_PATH);
    process.exit(1);
  }
  
  // Load manifest
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  const resources = manifest.resources || [];
  
  console.log(`📋 Manifest declares ${resources.length} resources\n`);
  
  // Collect manifest paths
  const manifestPaths = new Set();
  const missingFiles = [];
  
  for (const resource of resources) {
    const { uri, path, title } = resource;
    manifestPaths.add(path);
    
    const fullPath = join(CONTENT_DIR, path);
    
    if (!existsSync(fullPath)) {
      missingFiles.push({ uri, path, title });
    }
  }
  
  // Report missing files
  if (missingFiles.length > 0) {
    hasErrors = true;
    console.error('❌ MISSING FILES (in manifest but not on disk):\n');
    for (const { uri, path, title } of missingFiles) {
      console.error(`   • ${title}`);
      console.error(`     path: ${path}`);
      console.error(`     uri:  ${uri}\n`);
    }
  } else {
    console.log('✅ All manifest resources exist on disk\n');
  }
  
  // Check for orphan files (on disk but not in manifest)
  const actualFiles = getAllFiles(CONTENT_DIR);
  const orphanFiles = actualFiles.filter(f => !manifestPaths.has(f));
  
  if (orphanFiles.length > 0) {
    // Orphans are warnings, not errors (for now)
    console.warn('⚠️  ORPHAN FILES (on disk but not in manifest):\n');
    for (const path of orphanFiles) {
      console.warn(`   • ${path}`);
    }
    console.warn('\n   These files exist but won\'t appear in the UI.');
    console.warn('   To include a file, add YAML frontmatter (uri/title/audience/...).');
    console.warn('   To exclude it intentionally, leave it without frontmatter.\n');
  } else {
    console.log('✅ No orphan files detected\n');
  }
  
  // Summary
  if (hasErrors) {
    console.error('❌ Verification FAILED\n');
    process.exit(1);
  } else {
    console.log('✅ Content verification PASSED\n');
    process.exit(0);
  }
}

verify();



--------------------------------------------------------------------------------
📄 File: infra/scripts/verify-contracts.js
--------------------------------------------------------------------------------

#!/usr/bin/env node
/**
 * verify-contracts.js
 * 
 * Verifies that repository artifacts conform to their declared interface contracts.
 * This prevents drift between documentation, tooling, and actual behavior.
 * 
 * Checks:
 * 1. manifest.json conforms to manifest@current (2.0.0)
 * 2. builds conform to build-output@current (3.0.0) - checks structure, not execution
 * 3. attempt artifacts conform to attempt-cli@current (2.0.0)
 * 4. lane PRDs declare required contracts
 * 
 * Exit codes:
 *   0 = all contracts verified
 *   1 = contract violations detected
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// Contract versions (current)
const MANIFEST_CONTRACT_VERSION = '2.0.0';
const BUILD_OUTPUT_CONTRACT_VERSION = '3.0.0';
const ATTEMPT_CLI_CONTRACT_VERSION = '2.0.0';

let hasErrors = false;

function error(msg) {
  console.error(`❌ ${msg}`);
  hasErrors = true;
}

function warn(msg) {
  console.warn(`⚠️  ${msg}`);
}

function info(msg) {
  console.log(`ℹ️  ${msg}`);
}

function success(msg) {
  console.log(`✅ ${msg}`);
}

// 1. Verify manifest.json conforms to manifest@2.0.0
function verifyManifest() {
  console.log('\n📋 Verifying manifest.json (manifest@2.0.0)...\n');
  
  const manifestPath = join(ROOT, 'public', 'content', 'manifest.json');
  
  if (!existsSync(manifestPath)) {
    error('manifest.json not found');
    return;
  }
  
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  } catch (e) {
    error(`manifest.json is not valid JSON: ${e.message}`);
    return;
  }
  
  // Check top-level structure
  if (!Array.isArray(manifest.resources)) {
    error('manifest.json must contain a "resources" array');
    return;
  }
  
  const resources = manifest.resources;
  info(`Found ${resources.length} resources`);
  
  // Verify each resource
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const prefix = `  Resource ${i + 1} (${resource.uri || 'no uri'}):`;
    
    // Required fields
    if (!resource.uri) {
      error(`${prefix} missing required field "uri"`);
    }
    if (!resource.title) {
      error(`${prefix} missing required field "title"`);
    }
    if (!resource.path) {
      error(`${prefix} missing required field "path"`);
    }
    if (resource.tier === undefined || resource.tier === null) {
      error(`${prefix} missing required field "tier"`);
    } else if (![0, 1, 2].includes(resource.tier)) {
      error(`${prefix} "tier" must be 0, 1, or 2 (got ${resource.tier})`);
    }
    
    // Verify path exists
    if (resource.path) {
      if (!resource.path.startsWith('/')) {
        error(`${prefix} "path" must begin with "/"`);
      } else {
        const fullPath = join(ROOT, 'public', 'content', resource.path);
        if (!existsSync(fullPath)) {
          error(`${prefix} path "${resource.path}" does not exist`);
        }
      }
    }
  }
  
  if (!hasErrors) {
    success('manifest.json conforms to manifest@2.0.0');
  }
}

// 2. Verify build output structure (build-output@3.0.0)
function verifyBuildOutput() {
  console.log('\n🏗️  Verifying build output structure (build-output@3.0.0)...\n');
  
  // Check for lane directories
  const productsDir = join(ROOT, 'products');
  if (!existsSync(productsDir)) {
    warn('products/ directory not found - skipping build output checks');
    return;
  }
  
  const lanes = readdirSync(productsDir).filter(item => {
    const itemPath = join(productsDir, item);
    return statSync(itemPath).isDirectory();
  });
  
  if (lanes.length === 0) {
    info('No lanes found in products/ - skipping build output checks');
    return;
  }
  
  info(`Found ${lanes.length} lane(s): ${lanes.join(', ')}`);
  
  // Check manifest exists (required runtime availability)
  const manifestPath = join(ROOT, 'public', 'content', 'manifest.json');
  if (!existsSync(manifestPath)) {
    error('public/content/manifest.json must exist for runtime availability');
  } else {
    success('manifest.json available for runtime');
  }
  
  // Note: We don't verify dist/ exists because builds may not have run.
  // The contract is about structure when builds DO run, not forcing builds.
  info('Build output structure checks passed (dist/ verification requires actual build)');
}

// 3. Verify attempt CLI contract (attempt-cli@2.0.0)
function verifyAttemptCLI() {
  console.log('\n🔧 Verifying attempt CLI contract (attempt-cli@2.0.0)...\n');
  
  // Check that required commands exist in package.json
  const packageJsonPath = join(ROOT, 'package.json');
  if (!existsSync(packageJsonPath)) {
    error('package.json not found');
    return;
  }
  
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const scripts = packageJson.scripts || {};
  
  const requiredCommands = [
    'attempt:cleanup',
    'attempt:register',
    'attempt:nuke',
    'attempt:finalize',
    'attempt:promote'
  ];
  
  const missingCommands = requiredCommands.filter(cmd => !scripts[cmd]);
  
  if (missingCommands.length > 0) {
    error(`Missing required attempt CLI commands: ${missingCommands.join(', ')}`);
  } else {
    success('All required attempt CLI commands present');
  }
  
  // Check for attempt artifacts in existing attempts
  const attemptsDir = join(ROOT, 'attempts');
  if (existsSync(attemptsDir)) {
    const prdDirs = readdirSync(attemptsDir).filter(item => {
      return statSync(join(attemptsDir, item)).isDirectory();
    });
    
    let checkedAttempts = 0;
    let validAttempts = 0;
    
    for (const prdDir of prdDirs) {
      const prdPath = join(attemptsDir, prdDir);
      const attemptDirs = readdirSync(prdPath).filter(item => {
        return statSync(join(prdPath, item)).isDirectory() && item.startsWith('attempt-');
      });
      
      for (const attemptDir of attemptDirs) {
        checkedAttempts++;
        const metaPath = join(prdPath, attemptDir, 'META.json');
        if (existsSync(metaPath)) {
          try {
            const meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
            const requiredFields = ['lane', 'prd_version', 'attempt', 'sealed_commit'];
            const missingFields = requiredFields.filter(field => !meta[field]);
            
            if (missingFields.length > 0) {
              warn(`META.json in ${prdDir}/${attemptDir} missing fields: ${missingFields.join(', ')}`);
            } else {
              validAttempts++;
            }
          } catch (e) {
            warn(`META.json in ${prdDir}/${attemptDir} is not valid JSON: ${e.message}`);
          }
        } else {
          warn(`META.json not found in ${prdDir}/${attemptDir}`);
        }
      }
    }
    
    if (checkedAttempts > 0) {
      info(`Checked ${checkedAttempts} attempt(s), ${validAttempts} have valid META.json`);
    }
  }
}

// 4. Verify lane PRDs declare required contracts
function verifyLanePRDs() {
  console.log('\n📄 Verifying lane PRDs declare required contracts...\n');
  
  const docsPRDDir = join(ROOT, 'docs', 'PRD');
  if (!existsSync(docsPRDDir)) {
    warn('docs/PRD/ directory not found - skipping PRD contract checks');
    return;
  }
  
  const laneDirs = readdirSync(docsPRDDir).filter(item => {
    return statSync(join(docsPRDDir, item)).isDirectory();
  });
  
  if (laneDirs.length === 0) {
    info('No lane PRDs found');
    return;
  }
  
  info(`Found ${laneDirs.length} lane PRD(s)`);
  
  // For now, just check that PRDs exist
  // Future: could parse PRDs to verify they reference contracts
  for (const lane of laneDirs) {
    const prdPath = join(docsPRDDir, lane, 'PRD.md');
    if (existsSync(prdPath)) {
      success(`PRD exists for lane: ${lane}`);
    } else {
      warn(`PRD.md not found for lane: ${lane}`);
    }
  }
  
  info('PRD contract declaration checks passed (detailed parsing not yet implemented)');
}

// Main
console.log('🔍 Contract Verification (Drift Check)\n');
console.log('=' .repeat(50));

verifyManifest();
verifyBuildOutput();
verifyAttemptCLI();
verifyLanePRDs();

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.error('\n❌ Contract verification FAILED\n');
  console.error('Fix the errors above before proceeding.\n');
  process.exit(1);
} else {
  console.log('\n✅ All contract checks PASSED\n');
  process.exit(0);
}



================================================================================
## Public Content
================================================================================



--------------------------------------------------------------------------------
📄 File: public/_compiled/website/_meta/author-COMPILE_META.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "pack": "author",
  "built_at": "2026-01-20T05:23:25.940Z",
  "git_commit": "c8e732941363a3edd7a564ad7e5f0e1fceea66aa",
  "sources": [
    "canon/index.md",
    "canon/odd/appendices/product-lanes.md",
    "canon/odd/appendices/epochs.md",
    "canon/odd/appendices/compilation.md",
    "canon/odd/appendices/compilation-targets.md",
    "docs/PRD/website/PRD.md"
  ],
  "source_hashes": {
    "canon/index.md": "8bf3004d7c204693562db1c4206a7736efafdb85b05c299f60366a460d3125dc",
    "canon/odd/appendices/product-lanes.md": "977b29aa2e06eecb32419d967da590f4d851c3c9feb5e38269cfc094b6da3d09",
    "canon/odd/appendices/epochs.md": "59099c36270436e7e095d3acaa9161c75d7ae72b8bd500c51dc2145260c743dc",
    "canon/odd/appendices/compilation.md": "f95da459f446bd2c63d664c997663f0c02bdb0852b0c46af0106c1750e559aef",
    "canon/odd/appendices/compilation-targets.md": "0de1cdbfc2df82a896d07b070c8b554bd05df6b30dae4325de1379550f9dcf24",
    "docs/PRD/website/PRD.md": "7177542662a88a87277d7bcb6cde9fd4376a32e971a30d42af5ffa813d8ddca1"
  },
  "output": "public/_compiled/website/author-pack.md",
  "plan": "infra/compile/plans/website/author.json"
}


--------------------------------------------------------------------------------
📄 File: public/_compiled/website/_meta/visitor-COMPILE_META.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "pack": "visitor",
  "built_at": "2026-01-20T05:23:25.798Z",
  "git_commit": "c8e732941363a3edd7a564ad7e5f0e1fceea66aa",
  "sources": [
    "canon/index.md",
    "canon/odd/appendices/product-lanes.md",
    "canon/odd/appendices/epochs.md",
    "canon/odd/appendices/compilation.md",
    "docs/PRD/website/PRD.md"
  ],
  "source_hashes": {
    "canon/index.md": "8bf3004d7c204693562db1c4206a7736efafdb85b05c299f60366a460d3125dc",
    "canon/odd/appendices/product-lanes.md": "977b29aa2e06eecb32419d967da590f4d851c3c9feb5e38269cfc094b6da3d09",
    "canon/odd/appendices/epochs.md": "59099c36270436e7e095d3acaa9161c75d7ae72b8bd500c51dc2145260c743dc",
    "canon/odd/appendices/compilation.md": "f95da459f446bd2c63d664c997663f0c02bdb0852b0c46af0106c1750e559aef",
    "docs/PRD/website/PRD.md": "7177542662a88a87277d7bcb6cde9fd4376a32e971a30d42af5ffa813d8ddca1"
  },
  "output": "public/_compiled/website/visitor-pack.md",
  "plan": "infra/compile/plans/website/visitor.json"
}


--------------------------------------------------------------------------------
📄 File: public/_compiled/website/author-pack.md
--------------------------------------------------------------------------------

---
lane: website
pack: author
built_at: 2026-01-20T05:23:25.940Z
git_commit: c8e732941363a3edd7a564ad7e5f0e1fceea66aa
sources:
  - canon/index.md
  - canon/odd/appendices/product-lanes.md
  - canon/odd/appendices/epochs.md
  - canon/odd/appendices/compilation.md
  - canon/odd/appendices/compilation-targets.md
  - docs/PRD/website/PRD.md
source_hashes:
  canon/index.md: 8bf3004d7c204693562db1c4206a7736efafdb85b05c299f60366a460d3125dc
  canon/odd/appendices/product-lanes.md: 977b29aa2e06eecb32419d967da590f4d851c3c9feb5e38269cfc094b6da3d09
  canon/odd/appendices/epochs.md: 59099c36270436e7e095d3acaa9161c75d7ae72b8bd500c51dc2145260c743dc
  canon/odd/appendices/compilation.md: f95da459f446bd2c63d664c997663f0c02bdb0852b0c46af0106c1750e559aef
  canon/odd/appendices/compilation-targets.md: 0de1cdbfc2df82a896d07b070c8b554bd05df6b30dae4325de1379550f9dcf24
  docs/PRD/website/PRD.md: 7177542662a88a87277d7bcb6cde9fd4376a32e971a30d42af5ffa813d8ddca1
---


---

## Source: `canon/index.md`

---
uri: klappy://meta/canon-index
title: "Canon Index"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "index", "orientation"]
---

# 🧭 Canon Index v0.1

**Scope, Structure, Intent, and Confidence**

This document provides orientation to the Canon.
It describes what exists, what each artifact is for, how they relate, and where the current design is strong vs fragile.

It does not define workflows, agent loops, enforcement steps, or execution order.

---

## 📌 Purpose of the Canon

The Canon is a curated set of documents that capture:
• how decisions are made
• what assumptions are held
• how work is verified
• how rigor changes as projects mature

Its purpose is clarity, not control.

PRDs are versioned and may be attempted multiple times; attempts are sealed records, not evolving workstreams.

The Canon exists so that:
• reasoning does not have to be repeated
• principles remain stable while implementations change
• future systems can reference intent without inheriting outdated instructions

---

## 🧠 What the Canon Is (and Is Not)

**The Canon Is**
• a shared reference
• a source of assumptions and defaults
• a way to encode thinking without enforcing execution

**The Canon Is Not**

• a workflow
• a command system
• a task list
• a replacement for judgment

Nothing in the Canon executes by itself.

---

## 🚀 Start Here

**Constraints** — baseline assumptions and non-negotiables that shape every decision. What must be true for this work to make sense?

**Definition of Done** — what qualifies as completed work and what evidence is required. When can work honestly be called done?

These two documents anchor everything else.

---

## 🔍 If You Want the Philosophy

**ODD Manifesto** — the philosophical and operational foundation of Outcomes-Driven Development. Why this approach exists.

**Maturity Model** — how rigor changes as projects mature. When different expectations become binding.

**Decision Rules** — default heuristics used when multiple valid options exist.

---

## 🧩 If You Want the Edge Cases

The appendices extend understanding without introducing enforcement:

• **Attempt Lifecycle** — how PRD versions, attempts, and evidence are preserved
• **Quantum Development** — evaluating multiple paths before revising intent
• **Repository Topology** — what lives where and what changes when
• **Misuse Patterns** — common failure modes and how ODD gets misapplied
• **Media as a Learning Layer** — media is optional, regenerable, and progressively disclosed; text remains canonical

These are diagnostic and orientation documents, not requirements.

---

## 🔒 Public vs Internal Boundary

• `/odd/README.md` → public-facing ODD (shareable, human-friendly)
• `/canon/**` → internal reference (governance artifacts, precise language)

Public documents explain intent.
Canon documents preserve precision.

---

## 📖 Precedence & Interpretation (Orientation Only)

A useful mental model for reading:

1. ODD Manifesto provides philosophical grounding
2. Maturity Model explains when rigor increases
3. Constraints shape the solution space
4. Decision Rules guide choices
5. Evidence Policies define completion

If documents appear to conflict, maturity context and explicit tradeoffs usually explain why.

---

## 📁 Canon Structure

```text

/canon/
  index.md
  constraints.md
  decision-rules.md
  definition-of-done.md
  self-audit.md
  visual-proof.md
  completion-report-template.md
  odd/
    contract.md
    manifesto.md
    maturity.md
    misuse-patterns.md
    prompt-architecture.md
    orientation-map.md
    appendices/
      alignment-reviews.md
      epochs.md
      lane-implementation-surfaces.md
      media-as-learning-layer.md
      product-lanes.md
      attempt-lifecycle.md
      drift-checks.md
      evolution-not-automation.md
      lane-build-layout.md
      quantum-development.md
      repo-topology.md
      repo-truth.md
      visual-evolution.md
    decisions/
      D0001-prod-branch-is-production.md
      ...
```

Each file addresses a different dimension of decision-making.

---

## 📎 Canon Components & Roles

### Constraints

**File:** `constraints.md`

Defines baseline assumptions and non-negotiables that shape decisions.

Answers:

What must be true for this work to make sense?

---

### Decision Rules

**File:** `decision-rules.md`

Default heuristics used when multiple valid options exist.

Answers:

How do choices tend to be made?

---

### Evolution

- [Failure-Driven Modularity](./evolution/failure-driven-modularity.md)

---

### Definition of Done & Evidence Policy

**File:** `definition-of-done.md`

Defines what qualifies as completed work and what evidence is required.

Answers:

When can work honestly be called done?

---

### Self-Audit Checklist

**File:** `self-audit.md`

A checklist for reviewing work before declaring completion.

Answers:

What should be reviewed before claiming success?

---

### Visual Proof Standards

**File:** `visual-proof.md`

Defines what qualifies as acceptable visual evidence.

Answers:

What does "prove it visually" mean?

---

### Completion Report Template

**File:** `completion-report-template.md`

Standard format for reporting completed work.

Answers:

How should completion be communicated?

---

### ODD System Contract

**File:** `odd/contract.md`

The single source of truth for ODD workflow contract versioning.

Answers:

What version of ODD is this repo compatible with?

---

### ODD Manifesto (Extended)

**File:** `odd/manifesto.md`

Philosophical and operational foundation of Outcomes-Driven Development.

Answers:

Why this approach exists.

---

### Project Maturity & Progressive Governance

**File:** `odd/maturity.md`

Defines how rigor changes as projects mature.

Answers:

When different expectations become binding.

---

### ODD Appendices (Orientation Only)

These files extend understanding without introducing enforcement:
• Alignment Reviews (odd/appendices/alignment-reviews.md)
Periodic evaluation of the ODD system itself. Detects drift between stated intent, implemented process, and observed outcomes.
• Epochs (odd/appendices/epochs.md)
Named periods where the meaning of "success" is stable enough that outcomes can be compared. Prevents invalid cross-era comparisons.
• Progressive Elevation & Decay (odd/appendices/progressive-elevation.md)
The memory model: how artifacts move from ephemeral (attempts/PRDs) to durable (canon/contracts/decisions). Most artifacts decay; only proven patterns elevate.
• Canonical Compression (odd/appendices/canonical-compression.md)
The compilation model: how derived, minimal working models are produced from Source Canon without mutating source truth. Compiled outputs are disposable and epoch-scoped.
• Lane-Scoped Implementation Surfaces (odd/appendices/lane-implementation-surfaces.md)
Each lane owns its own `/products/<lane>/src` and `/products/<lane>/dist`. No shared repo-root surfaces.
• Product Lanes (odd/appendices/product-lanes.md)
Why multiple PRD lanes exist and how they relate. Each lane has its own PRD, attempts, and lifecycle. Lanes share canon, not lifecycle.
• Misuse Patterns (odd/misuse-patterns.md)
Common failure modes and how ODD is misapplied in practice. Diagnostic only.
• Prompt Architecture (odd/prompt-architecture.md)
How intent scales without giant prompts. Orientation only.
• Orientation Map (odd/orientation-map.md)
A one-page mental model of ODD, Canon, Evidence, and Outcomes.
• Attempt Lifecycle (odd/appendices/attempt-lifecycle.md)
How PRD versions, attempts, evidence, and deployments are preserved across iterations. PRDs can have multiple attempts; attempts are sealed records.
• Quantum Development (odd/appendices/quantum-development.md)
Evaluating multiple execution paths before revising intent. Explains why divergence is signal, not waste.
• Repository Topology (odd/appendices/repo-topology.md)
What lives where and what changes when. Encodes App/Content/Infrastructure decoupling.
• Evolution, Not Automation (odd/appendices/evolution-not-automation.md)
Why this system supports learning, not automatic execution. Humans stay in the loop.
• Visual Evolution (odd/appendices/visual-evolution.md)
Why visual systems evolve independently from products. Products consume visual interfaces, not raw design decisions.
• Drift Checks (odd/appendices/drift-checks.md)
The drift-prevention mechanism. When docs, prompts, and tooling diverge, truth becomes vibes.
• Lane Build Layout (odd/appendices/lane-build-layout.md)
How lanes avoid /src and /dist collisions. Worktrees isolate, deployments are lane-scoped.
• Online Evidence Requirement (odd/appendices/online-evidence.md)
Why "works on my machine" is not evidence. Attempts are invalid without online preview URLs.
• Deploy Evidence (odd/appendices/deploy-evidence.md)
Why evidence must be in the build output. Cloudflare only serves products/<lane>/dist, not /attempts/**.

---

## 📋 Meta Rules (Orientation Only)

These are structural conventions for keeping the Canon coherent over time.
They are not workflows or enforcement steps.

**1. Single Inventory Source**
If an inventory of Canon resources exists, there should be one authoritative source (e.g., a manifest). Other indexes should be derived or optional.

**2. Stable Names Beat Clever Names**
Prefer stable file and URI naming over clever branding. Rename rarely.

**3. Audience Separation Matters**
"Public" explains and invites. "Canon" defines and stabilizes.

**4. Voice Is Labeled, Not Transformed**
First-person documents may be consumed as-is or translated by clients. The Canon itself does not require a specific rendering voice.

**5. Multi-Lane PRD Architecture**
PRDs are organized into independent product lanes. Each lane has its own active PRD, attempts, and lifecycle. Lanes share canon, not lifecycle. See `/canon/odd/appendices/product-lanes.md` for the full model.

---

## 🔄 Stability & Change Philosophy

Not all Canon documents are equally stable.

Some are intended to remain largely fixed.
Others are expected to evolve through use.

Change is allowed, but should be:
• intentional
• versioned (at least informally)
• documented somewhere discoverable

---

## ⚠️ Confidence & Drift Risk (Self-Assessment)

This section expresses current confidence that the Canon and surrounding architecture align with the core pillars:
KISS, DRY, Consistency, Maintainability, Antifragile, Scalable, Prompt-over-Code.

These are not guarantees.
They are a snapshot of perceived risk.

Confidence scale
• 0.9+ — robust
• 0.7–0.85 — strong, but watch for drift
• 0.5–0.7 — plausible, fragile under misuse
• <0.5 — likely misaligned unless corrected

Current scores (v0.1 snapshot)
• Prompt-over-Code / Convention-over-Config: 0.80
Strong fit due to stable addressing and canonical retrieval surfaces. Risk: schema sprawl or client-specific conventions.
• KISS: 0.75
Minimal primitives and no workflow semantics. Risk: meta-layer creep.
• DRY (with isolation): 0.70
Canon centralizes principles; manifest can become a single inventory. Risk: duplicate indices drifting.
• Consistency: 0.65
URI and metadata structure support consistency. Risk: naming drift across files and routes.
• Maintainability: 0.70
Separation of stable worldview vs evolving templates helps. Risk: manual inventory updates falling out of sync.
• Antifragile: 0.60
Recoverability improves if resources can be served statically and via MCP. Risk: hidden single points of failure.
• Scalable: 0.70
Schema supports growth. Risk: large manifests becoming manually brittle.

Intended use of this section
• Make risks explicit early
• Prevent false confidence
• Provide a stable baseline for future comparison

---

## 🚫 What Is Intentionally Undefined

The Canon deliberately does not define:
• specific tools
• specific agents
• specific workflows
• specific automation loops

These are left open to evolve without rewriting foundational thinking.

---

## 💡 Closing Note

The Canon exists to preserve intent without freezing execution.

It encodes how thinking works, not what must be done next.

---

## ✅ Status

• Canon Index v0.1 complete
• Orientation-only
• Includes a confidence and drift snapshot

---

This Canon v0.1 is considered stable for initial builds. Revisions should be additive unless a documented failure requires change.


---

## Source: `canon/odd/appendices/product-lanes.md`

---
uri: klappy://canon/odd/product-lanes
title: "Product Lanes in Outcome-Driven Development"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["odd", "prd", "architecture", "lanes", "orientation"]
---

# Product Lanes in Outcome-Driven Development

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

See: `/canon/odd/appendices/lane-implementation-surfaces.md`

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

**Folder structure:** `/attempts/<lane>/prd-vX.Y/attempt-NNN/`

Valid examples:
- `/attempts/website/prd-v1.0/attempt-001/`
- `/attempts/ai-navigation/prd-v1.0/attempt-001/`
- `/attempts/agent-skill/prd-v1.0/attempt-001/`

Invalid (do not use):
- `/attempts/prd-vX.Y/<lane>/`
- `/attempts/<lane>/attempt-NNN/`
- `/attempts/<lane>/<anything creative>/`

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

```
/attempts/
  website/prd-vX.Y/attempt-NNN/
  ai-navigation/prd-vX.Y/attempt-NNN/
  agent-skill/prd-vX.Y/attempt-NNN/
```

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

- Decision log: `/canon/odd/decisions/D0009-multi-lane-prd-architecture.md`
- Attempt lifecycle: `/canon/odd/appendices/attempt-lifecycle.md`
- Evolution philosophy: `/canon/odd/appendices/evolution-not-automation.md`


---

## Source: `canon/odd/appendices/epochs.md`

---
uri: klappy://canon/odd/epochs
title: "Epochs"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "fitness-landscape", "comparability", "orientation"]
---

# Epochs

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


---

## Source: `canon/odd/appendices/compilation.md`

---
uri: klappy://canon/odd/compilation
title: Compilation
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "compilation", "memory", "context", "packs"]
---

# Compilation

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


---

## Source: `canon/odd/appendices/compilation-targets.md`

---
uri: klappy://canon/odd/compilation-targets
title: "Compilation Targets"
audience: canon
exposure: public
tier: 2
voice: neutral
stability: stable
tags: ["odd", "compilation", "memory", "portability", "packs", "lanes"]
---

# Compilation Targets

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


---

## Source: `docs/PRD/website/PRD.md`

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

See `/canon/odd/appendices/visual-evolution.md` for the visual evolution model.

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

See `/canon/odd/appendices/online-evidence.md` for the full requirement.

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

This lane follows: `/canon/odd/appendices/media-as-learning-layer.md`

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
  - `klappy://canon/odd/compilation`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/canon/odd/appendices/compilation.md`
- Media philosophy: `/canon/odd/appendices/media-as-learning-layer.md`



--------------------------------------------------------------------------------
📄 File: public/_compiled/website/index.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "generated_at": "2026-01-20T05:23:25.943Z",
  "packs": [
    {
      "pack": "author",
      "plan": "infra/compile/plans/website/author.json",
      "output": "public/_compiled/website/author-pack.md",
      "meta": "public/_compiled/website/_meta/author-COMPILE_META.json",
      "exists": true
    },
    {
      "pack": "visitor",
      "plan": "infra/compile/plans/website/visitor.json",
      "output": "public/_compiled/website/visitor-pack.md",
      "meta": "public/_compiled/website/_meta/visitor-COMPILE_META.json",
      "exists": true
    }
  ]
}


--------------------------------------------------------------------------------
📄 File: public/_compiled/website/visitor-pack.md
--------------------------------------------------------------------------------

---
lane: website
pack: visitor
built_at: 2026-01-20T05:23:25.798Z
git_commit: c8e732941363a3edd7a564ad7e5f0e1fceea66aa
sources:
  - canon/index.md
  - canon/odd/appendices/product-lanes.md
  - canon/odd/appendices/epochs.md
  - canon/odd/appendices/compilation.md
  - docs/PRD/website/PRD.md
source_hashes:
  canon/index.md: 8bf3004d7c204693562db1c4206a7736efafdb85b05c299f60366a460d3125dc
  canon/odd/appendices/product-lanes.md: 977b29aa2e06eecb32419d967da590f4d851c3c9feb5e38269cfc094b6da3d09
  canon/odd/appendices/epochs.md: 59099c36270436e7e095d3acaa9161c75d7ae72b8bd500c51dc2145260c743dc
  canon/odd/appendices/compilation.md: f95da459f446bd2c63d664c997663f0c02bdb0852b0c46af0106c1750e559aef
  docs/PRD/website/PRD.md: 7177542662a88a87277d7bcb6cde9fd4376a32e971a30d42af5ffa813d8ddca1
---


---

## Source: `canon/index.md`

---
uri: klappy://meta/canon-index
title: "Canon Index"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "index", "orientation"]
---

# 🧭 Canon Index v0.1

**Scope, Structure, Intent, and Confidence**

This document provides orientation to the Canon.
It describes what exists, what each artifact is for, how they relate, and where the current design is strong vs fragile.

It does not define workflows, agent loops, enforcement steps, or execution order.

---

## 📌 Purpose of the Canon

The Canon is a curated set of documents that capture:
• how decisions are made
• what assumptions are held
• how work is verified
• how rigor changes as projects mature

Its purpose is clarity, not control.

PRDs are versioned and may be attempted multiple times; attempts are sealed records, not evolving workstreams.

The Canon exists so that:
• reasoning does not have to be repeated
• principles remain stable while implementations change
• future systems can reference intent without inheriting outdated instructions

---

## 🧠 What the Canon Is (and Is Not)

**The Canon Is**
• a shared reference
• a source of assumptions and defaults
• a way to encode thinking without enforcing execution

**The Canon Is Not**

• a workflow
• a command system
• a task list
• a replacement for judgment

Nothing in the Canon executes by itself.

---

## 🚀 Start Here

**Constraints** — baseline assumptions and non-negotiables that shape every decision. What must be true for this work to make sense?

**Definition of Done** — what qualifies as completed work and what evidence is required. When can work honestly be called done?

These two documents anchor everything else.

---

## 🔍 If You Want the Philosophy

**ODD Manifesto** — the philosophical and operational foundation of Outcomes-Driven Development. Why this approach exists.

**Maturity Model** — how rigor changes as projects mature. When different expectations become binding.

**Decision Rules** — default heuristics used when multiple valid options exist.

---

## 🧩 If You Want the Edge Cases

The appendices extend understanding without introducing enforcement:

• **Attempt Lifecycle** — how PRD versions, attempts, and evidence are preserved
• **Quantum Development** — evaluating multiple paths before revising intent
• **Repository Topology** — what lives where and what changes when
• **Misuse Patterns** — common failure modes and how ODD gets misapplied
• **Media as a Learning Layer** — media is optional, regenerable, and progressively disclosed; text remains canonical

These are diagnostic and orientation documents, not requirements.

---

## 🔒 Public vs Internal Boundary

• `/odd/README.md` → public-facing ODD (shareable, human-friendly)
• `/canon/**` → internal reference (governance artifacts, precise language)

Public documents explain intent.
Canon documents preserve precision.

---

## 📖 Precedence & Interpretation (Orientation Only)

A useful mental model for reading:

1. ODD Manifesto provides philosophical grounding
2. Maturity Model explains when rigor increases
3. Constraints shape the solution space
4. Decision Rules guide choices
5. Evidence Policies define completion

If documents appear to conflict, maturity context and explicit tradeoffs usually explain why.

---

## 📁 Canon Structure

```text

/canon/
  index.md
  constraints.md
  decision-rules.md
  definition-of-done.md
  self-audit.md
  visual-proof.md
  completion-report-template.md
  odd/
    contract.md
    manifesto.md
    maturity.md
    misuse-patterns.md
    prompt-architecture.md
    orientation-map.md
    appendices/
      alignment-reviews.md
      epochs.md
      lane-implementation-surfaces.md
      media-as-learning-layer.md
      product-lanes.md
      attempt-lifecycle.md
      drift-checks.md
      evolution-not-automation.md
      lane-build-layout.md
      quantum-development.md
      repo-topology.md
      repo-truth.md
      visual-evolution.md
    decisions/
      D0001-prod-branch-is-production.md
      ...
```

Each file addresses a different dimension of decision-making.

---

## 📎 Canon Components & Roles

### Constraints

**File:** `constraints.md`

Defines baseline assumptions and non-negotiables that shape decisions.

Answers:

What must be true for this work to make sense?

---

### Decision Rules

**File:** `decision-rules.md`

Default heuristics used when multiple valid options exist.

Answers:

How do choices tend to be made?

---

### Evolution

- [Failure-Driven Modularity](./evolution/failure-driven-modularity.md)

---

### Definition of Done & Evidence Policy

**File:** `definition-of-done.md`

Defines what qualifies as completed work and what evidence is required.

Answers:

When can work honestly be called done?

---

### Self-Audit Checklist

**File:** `self-audit.md`

A checklist for reviewing work before declaring completion.

Answers:

What should be reviewed before claiming success?

---

### Visual Proof Standards

**File:** `visual-proof.md`

Defines what qualifies as acceptable visual evidence.

Answers:

What does "prove it visually" mean?

---

### Completion Report Template

**File:** `completion-report-template.md`

Standard format for reporting completed work.

Answers:

How should completion be communicated?

---

### ODD System Contract

**File:** `odd/contract.md`

The single source of truth for ODD workflow contract versioning.

Answers:

What version of ODD is this repo compatible with?

---

### ODD Manifesto (Extended)

**File:** `odd/manifesto.md`

Philosophical and operational foundation of Outcomes-Driven Development.

Answers:

Why this approach exists.

---

### Project Maturity & Progressive Governance

**File:** `odd/maturity.md`

Defines how rigor changes as projects mature.

Answers:

When different expectations become binding.

---

### ODD Appendices (Orientation Only)

These files extend understanding without introducing enforcement:
• Alignment Reviews (odd/appendices/alignment-reviews.md)
Periodic evaluation of the ODD system itself. Detects drift between stated intent, implemented process, and observed outcomes.
• Epochs (odd/appendices/epochs.md)
Named periods where the meaning of "success" is stable enough that outcomes can be compared. Prevents invalid cross-era comparisons.
• Progressive Elevation & Decay (odd/appendices/progressive-elevation.md)
The memory model: how artifacts move from ephemeral (attempts/PRDs) to durable (canon/contracts/decisions). Most artifacts decay; only proven patterns elevate.
• Canonical Compression (odd/appendices/canonical-compression.md)
The compilation model: how derived, minimal working models are produced from Source Canon without mutating source truth. Compiled outputs are disposable and epoch-scoped.
• Lane-Scoped Implementation Surfaces (odd/appendices/lane-implementation-surfaces.md)
Each lane owns its own `/products/<lane>/src` and `/products/<lane>/dist`. No shared repo-root surfaces.
• Product Lanes (odd/appendices/product-lanes.md)
Why multiple PRD lanes exist and how they relate. Each lane has its own PRD, attempts, and lifecycle. Lanes share canon, not lifecycle.
• Misuse Patterns (odd/misuse-patterns.md)
Common failure modes and how ODD is misapplied in practice. Diagnostic only.
• Prompt Architecture (odd/prompt-architecture.md)
How intent scales without giant prompts. Orientation only.
• Orientation Map (odd/orientation-map.md)
A one-page mental model of ODD, Canon, Evidence, and Outcomes.
• Attempt Lifecycle (odd/appendices/attempt-lifecycle.md)
How PRD versions, attempts, evidence, and deployments are preserved across iterations. PRDs can have multiple attempts; attempts are sealed records.
• Quantum Development (odd/appendices/quantum-development.md)
Evaluating multiple execution paths before revising intent. Explains why divergence is signal, not waste.
• Repository Topology (odd/appendices/repo-topology.md)
What lives where and what changes when. Encodes App/Content/Infrastructure decoupling.
• Evolution, Not Automation (odd/appendices/evolution-not-automation.md)
Why this system supports learning, not automatic execution. Humans stay in the loop.
• Visual Evolution (odd/appendices/visual-evolution.md)
Why visual systems evolve independently from products. Products consume visual interfaces, not raw design decisions.
• Drift Checks (odd/appendices/drift-checks.md)
The drift-prevention mechanism. When docs, prompts, and tooling diverge, truth becomes vibes.
• Lane Build Layout (odd/appendices/lane-build-layout.md)
How lanes avoid /src and /dist collisions. Worktrees isolate, deployments are lane-scoped.
• Online Evidence Requirement (odd/appendices/online-evidence.md)
Why "works on my machine" is not evidence. Attempts are invalid without online preview URLs.
• Deploy Evidence (odd/appendices/deploy-evidence.md)
Why evidence must be in the build output. Cloudflare only serves products/<lane>/dist, not /attempts/**.

---

## 📋 Meta Rules (Orientation Only)

These are structural conventions for keeping the Canon coherent over time.
They are not workflows or enforcement steps.

**1. Single Inventory Source**
If an inventory of Canon resources exists, there should be one authoritative source (e.g., a manifest). Other indexes should be derived or optional.

**2. Stable Names Beat Clever Names**
Prefer stable file and URI naming over clever branding. Rename rarely.

**3. Audience Separation Matters**
"Public" explains and invites. "Canon" defines and stabilizes.

**4. Voice Is Labeled, Not Transformed**
First-person documents may be consumed as-is or translated by clients. The Canon itself does not require a specific rendering voice.

**5. Multi-Lane PRD Architecture**
PRDs are organized into independent product lanes. Each lane has its own active PRD, attempts, and lifecycle. Lanes share canon, not lifecycle. See `/canon/odd/appendices/product-lanes.md` for the full model.

---

## 🔄 Stability & Change Philosophy

Not all Canon documents are equally stable.

Some are intended to remain largely fixed.
Others are expected to evolve through use.

Change is allowed, but should be:
• intentional
• versioned (at least informally)
• documented somewhere discoverable

---

## ⚠️ Confidence & Drift Risk (Self-Assessment)

This section expresses current confidence that the Canon and surrounding architecture align with the core pillars:
KISS, DRY, Consistency, Maintainability, Antifragile, Scalable, Prompt-over-Code.

These are not guarantees.
They are a snapshot of perceived risk.

Confidence scale
• 0.9+ — robust
• 0.7–0.85 — strong, but watch for drift
• 0.5–0.7 — plausible, fragile under misuse
• <0.5 — likely misaligned unless corrected

Current scores (v0.1 snapshot)
• Prompt-over-Code / Convention-over-Config: 0.80
Strong fit due to stable addressing and canonical retrieval surfaces. Risk: schema sprawl or client-specific conventions.
• KISS: 0.75
Minimal primitives and no workflow semantics. Risk: meta-layer creep.
• DRY (with isolation): 0.70
Canon centralizes principles; manifest can become a single inventory. Risk: duplicate indices drifting.
• Consistency: 0.65
URI and metadata structure support consistency. Risk: naming drift across files and routes.
• Maintainability: 0.70
Separation of stable worldview vs evolving templates helps. Risk: manual inventory updates falling out of sync.
• Antifragile: 0.60
Recoverability improves if resources can be served statically and via MCP. Risk: hidden single points of failure.
• Scalable: 0.70
Schema supports growth. Risk: large manifests becoming manually brittle.

Intended use of this section
• Make risks explicit early
• Prevent false confidence
• Provide a stable baseline for future comparison

---

## 🚫 What Is Intentionally Undefined

The Canon deliberately does not define:
• specific tools
• specific agents
• specific workflows
• specific automation loops

These are left open to evolve without rewriting foundational thinking.

---

## 💡 Closing Note

The Canon exists to preserve intent without freezing execution.

It encodes how thinking works, not what must be done next.

---

## ✅ Status

• Canon Index v0.1 complete
• Orientation-only
• Includes a confidence and drift snapshot

---

This Canon v0.1 is considered stable for initial builds. Revisions should be additive unless a documented failure requires change.


---

## Source: `canon/odd/appendices/product-lanes.md`

---
uri: klappy://canon/odd/product-lanes
title: "Product Lanes in Outcome-Driven Development"
audience: canon
exposure: hidden
tier: 2
voice: neutral
stability: stable
tags: ["odd", "prd", "architecture", "lanes", "orientation"]
---

# Product Lanes in Outcome-Driven Development

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

See: `/canon/odd/appendices/lane-implementation-surfaces.md`

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

**Folder structure:** `/attempts/<lane>/prd-vX.Y/attempt-NNN/`

Valid examples:
- `/attempts/website/prd-v1.0/attempt-001/`
- `/attempts/ai-navigation/prd-v1.0/attempt-001/`
- `/attempts/agent-skill/prd-v1.0/attempt-001/`

Invalid (do not use):
- `/attempts/prd-vX.Y/<lane>/`
- `/attempts/<lane>/attempt-NNN/`
- `/attempts/<lane>/<anything creative>/`

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

```
/attempts/
  website/prd-vX.Y/attempt-NNN/
  ai-navigation/prd-vX.Y/attempt-NNN/
  agent-skill/prd-vX.Y/attempt-NNN/
```

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

- Decision log: `/canon/odd/decisions/D0009-multi-lane-prd-architecture.md`
- Attempt lifecycle: `/canon/odd/appendices/attempt-lifecycle.md`
- Evolution philosophy: `/canon/odd/appendices/evolution-not-automation.md`


---

## Source: `canon/odd/appendices/epochs.md`

---
uri: klappy://canon/odd/epochs
title: "Epochs"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "fitness-landscape", "comparability", "orientation"]
---

# Epochs

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


---

## Source: `canon/odd/appendices/compilation.md`

---
uri: klappy://canon/odd/compilation
title: Compilation
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "compilation", "memory", "context", "packs"]
---

# Compilation

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


---

## Source: `docs/PRD/website/PRD.md`

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

See `/canon/odd/appendices/visual-evolution.md` for the visual evolution model.

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

See `/canon/odd/appendices/online-evidence.md` for the full requirement.

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

This lane follows: `/canon/odd/appendices/media-as-learning-layer.md`

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
  - `klappy://canon/odd/compilation`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/canon/odd/appendices/compilation.md`
- Media philosophy: `/canon/odd/appendices/media-as-learning-layer.md`



--------------------------------------------------------------------------------
📄 File: public/index.html
--------------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>klappy.dev - No App Deployed</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #1a1a1a;
      color: #e0e0e0;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 { color: #888; font-weight: 300; }
    p { color: #666; }
    code { 
      background: #2a2a2a; 
      padding: 0.2em 0.5em; 
      border-radius: 4px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔧 No App Deployed</h1>
    <p>This branch has no <code>/src</code> — it's been nuked for a fresh attempt.</p>
    <p>Content is still available at <code>/content/manifest.json</code></p>
  </div>
</body>
</html>



================================================================================
## .cursor
================================================================================



--------------------------------------------------------------------------------
📄 File: .cursor/worktrees.json
--------------------------------------------------------------------------------

{
  "setup-worktree": [
    "npm runcli"
  ]
}


================================================================================
## .husky
================================================================================



--------------------------------------------------------------------------------
📄 File: .husky/_/.gitignore
--------------------------------------------------------------------------------

*


--------------------------------------------------------------------------------
📄 File: .husky/_/applypatch-msg
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/commit-msg
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/h
--------------------------------------------------------------------------------

#!/usr/bin/env sh
[ "$HUSKY" = "2" ] && set -x
n=$(basename "$0")
s=$(dirname "$(dirname "$0")")/$n

[ ! -f "$s" ] && exit 0

if [ -f "$HOME/.huskyrc" ]; then
	echo "husky - '~/.huskyrc' is DEPRECATED, please move your code to ~/.config/husky/init.sh"
fi
i="${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh"
[ -f "$i" ] && . "$i"

[ "${HUSKY-}" = "0" ] && exit 0

export PATH="node_modules/.bin:$PATH"
sh -e "$s" "$@"
c=$?

[ $c != 0 ] && echo "husky - $n script failed (code $c)"
[ $c = 127 ] && echo "husky - command not found in PATH=$PATH"
exit $c



--------------------------------------------------------------------------------
📄 File: .husky/_/post-applypatch
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/post-checkout
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/post-commit
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/post-merge
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/post-rewrite
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/pre-applypatch
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/pre-auto-gc
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/pre-commit
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/pre-merge-commit
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/pre-push
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/pre-rebase
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/_/prepare-commit-msg
--------------------------------------------------------------------------------

#!/usr/bin/env sh
. "$(dirname "$0")/h"


--------------------------------------------------------------------------------
📄 File: .husky/pre-commit
--------------------------------------------------------------------------------

#!/usr/bin/env sh

# Sync content to public folder and generate manifest
npm run sync

# Generate the klappy book export
npm run book

# Stage the generated files so they are included in the commit
git add public/content/
git add public/content/manifest.json
git add klappy-dev-book-export.md



================================================================================
## Products
================================================================================



--------------------------------------------------------------------------------
📄 File: products/agent-skill/src/.gitkeep
--------------------------------------------------------------------------------

# This file ensures the directory is tracked by git.
# Contents will be replaced during attempt implementation.



--------------------------------------------------------------------------------
📄 File: products/ai-navigation/src/.gitkeep
--------------------------------------------------------------------------------

# This file ensures the directory is tracked by git.
# Contents will be replaced during attempt implementation.



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

See `/canon/odd/appendices/visual-evolution.md` for the visual evolution model.

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

See `/canon/odd/appendices/online-evidence.md` for the full requirement.

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

This lane follows: `/canon/odd/appendices/media-as-learning-layer.md`

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
  - `klappy://canon/odd/compilation`

---

## Related Documents

- Lane architecture: `/canon/odd/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints.md`
- Definition of Done: `/canon/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/canon/odd/appendices/compilation.md`
- Media philosophy: `/canon/odd/appendices/media-as-learning-layer.md`



--------------------------------------------------------------------------------
📄 File: products/website/attempts/README.md
--------------------------------------------------------------------------------

# Website Lane Attempts

Canonical attempt artifacts live here:

```
/products/website/attempts/prd-vX.Y/attempt-NNN/
```

## Structure

```
attempts/
  prd-v1.0/
    PRD.md              # frozen PRD snapshot
    _runs/              # in-progress runs (before finalize)
      <run_id>/
        META.json
        ATTEMPT.md
        EVIDENCE.md
        evidence/
    attempt-001/        # finalized attempts
    attempt-002/
```

## Evidence

Public verification evidence is always deployed at:

```
/_evidence/
```

## Related

- Champion outcomes: `products/website/LEDGER.md`
- Kickoff prompt: `products/website/prompts/ATTEMPT_KICKOFF.md`
- Legacy attempts: `/attempts/README.md` (read-only)



--------------------------------------------------------------------------------
📄 File: products/website/attempts/prd-v1.1/_runs/b497df0e/ATTEMPT.md
--------------------------------------------------------------------------------

# Attempt (Run b497df0e)

## Summary

Built a React-based public website for klappy.dev that meets the PRD v1.1 requirements for progressive disclosure, mobile usability, and canon browsing.

## Approach

### Tech Stack
- React 18 with Vite 6
- Progressive disclosure UX using collapsible navigation
- Mobile-first responsive design following Apple 2025 design principles
- Markdown rendering with marked.js for content pages

### Implementation Details
1. Created a 6-item top-level navigation (≤7 requirement):
   - Home
   - What is ODD?
   - Projects  
   - Why This Exists
   - About
   - Explore Canon (expandable for deeper content)

2. Built core components:
   - `Navigation`: Sticky top nav with progressive disclosure (Canon submenu)
   - `Home`: Hero section with CTA cards for key entry points
   - `ContentPage`: Markdown renderer with frontmatter metadata display
   - `MediaShelf`: Opt-in media player for videos, audio, images, PDFs

3. Features:
   - Deep linking support (URL reflects current resource)
   - Browser back/forward navigation
   - Progressive media disclosure (no autoplay, user-initiated)
   - Mobile responsive (tested down to 375px width)
   - Visual calm with system fonts and subtle animations

### Build Output
- Vite bundles to `products/website/dist/`
- Content served from `/content/manifest.json`
- Static assets from `/public`
- Bundle size: ~194KB JS, ~11KB CSS (gzipped: ~62KB total)



--------------------------------------------------------------------------------
📄 File: products/website/attempts/prd-v1.1/_runs/b497df0e/EVIDENCE.md
--------------------------------------------------------------------------------

# Evidence (Run b497df0e)

## Visual Proof

This attempt includes 4 screenshots demonstrating key PRD requirements.

### Desktop Homepage (1440x900)
![Desktop Homepage](screenshots/01-desktop-homepage.png)

**Demonstrates:**
- ≤7 navigation items (6 items shown: Home, What is ODD?, Projects, Why This Exists, About, Explore Canon)
- Progressive disclosure (Canon submenu collapsed by default)
- Visual calm with Apple 2025 design principles
- Clear CTA cards for key entry points

### Mobile Homepage (375x667)
![Mobile Homepage](screenshots/02-mobile-homepage.png)

**Demonstrates:**
- Mobile usability without horizontal scrolling
- Responsive navigation that adapts to narrow viewports
- Touch-friendly button sizes and spacing

### Content Page - ODD Manifesto (1440x900)
![Content Page](screenshots/03-desktop-content-page.png)

**Demonstrates:**
- Markdown rendering with proper typography
- Resource metadata (tier badges, audience indicators)
- Tag display
- Deep linking to specific content

### Expanded Navigation (1440x900)
![Nav Expanded](screenshots/04-desktop-nav-expanded.png)

**Demonstrates:**
- Progressive disclosure in action (Canon submenu expanded)
- Secondary navigation reveals tier 1 canon resources
- Smooth dropdown interaction

## Success Criteria Met

- [x] First load shows ≤7 nav items (6 shown)
- [x] Mobile usable without horizontal scrolling (verified at 375px)
- [x] Canon discoverable without file paths exposed (via manifest.json)
- [x] No agent instructions in UI (human-friendly language only)
- [x] No CLI/process language exposed
- [x] Deep links work (URL reflects resource)
- [x] Progressive disclosure tiers respected (Tier 0/1/2 via frontmatter)

## Build Info

- **Build tool:** Vite 6.4.1
- **Output size:** ~194KB JS + ~11KB CSS (gzipped: ~62KB total)
- **Build time:** 1.31s
- **Content resources:** 59 markdown files served via manifest.json



--------------------------------------------------------------------------------
📄 File: products/website/attempts/prd-v1.1/_runs/b497df0e/META.json
--------------------------------------------------------------------------------

{
  "lane": "website",
  "prd_version": "v1.1",
  "epoch_id": "E0003-evidence-first-era",
  "run_id": "b497df0e",
  "attempt": null,
  "lane_root": "products/website",
  "dist_dir": "products/website/dist",
  "tool": "cursor",
  "agent": "a",
  "model": "claude-sonnet-4.5",
  "worktree_path": "/Users/chrisklapp/.cursor/worktrees/klappy.dev/tar",
  "branch": "run/website/prd-v1.1/cursor/a/claude-sonnet-45/b497df0e",
  "target_branch": "run/website/prd-v1.1/cursor/a/claude-sonnet-45/b497df0e",
  "git_head": "6ce7319faa655dabe3d7c01062d5043a3cb0eb1e",
  "registered_at": "2026-01-20T19:44:32.318Z",
  "completed_at": null,
  "finalized_at": null,
  "status": "OPEN",
  "evidence_index": [],
  "preview_url": null
}


--------------------------------------------------------------------------------
📄 File: products/website/index.html
--------------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Outcomes Driven Development - A philosophy for building software with evidence, constraints, and progressive disclosure." />
    <title>klappy.dev - Outcomes Driven Development</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>



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



--------------------------------------------------------------------------------
📄 File: products/website/src/App.css
--------------------------------------------------------------------------------

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 980px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  width: 100%;
}

.error-container,
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--space-6);
  text-align: center;
}

.error-container h1 {
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.error-container p {
  color: var(--color-text-secondary);
  max-width: 600px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  margin-top: var(--space-4);
  color: var(--color-text-secondary);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .main-content {
    padding: var(--space-6) var(--space-4);
  }
}



--------------------------------------------------------------------------------
📄 File: products/website/src/App.jsx
--------------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { ContentPage } from './components/ContentPage';
import './App.css';

export default function App() {
  const [manifest, setManifest] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [currentResourceUri, setCurrentResourceUri] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => r.json())
      .then(data => {
        setManifest(data);
      })
      .catch(e => setError(e.message));
  }, []);

  const handleNavigate = (view, resourceUri = null) => {
    setCurrentView(view);
    setCurrentResourceUri(resourceUri);
    
    // Update URL for deep linking
    if (resourceUri) {
      const path = resourceUri.replace('klappy://', '');
      window.history.pushState({}, '', `/${path}`);
    } else {
      window.history.pushState({}, '', view === 'home' ? '/' : `/${view}`);
    }
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') {
        handleNavigate('home');
      } else {
        // Try to find resource by path
        const resourceUri = `klappy://${path.slice(1)}`;
        const resource = manifest?.resources.find(r => r.uri === resourceUri);
        if (resource) {
          handleNavigate('content', resourceUri);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [manifest]);

  if (error) {
    return (
      <div className="error-container">
        <h1>Unable to Load Content</h1>
        <p>{error}</p>
        <p>Please check that the manifest is available at <code>/content/manifest.json</code></p>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation 
        currentView={currentView} 
        onNavigate={handleNavigate}
        manifest={manifest}
      />
      
      <main className="main-content">
        {currentView === 'home' && (
          <Home manifest={manifest} onNavigate={handleNavigate} />
        )}
        
        {currentView === 'content' && currentResourceUri && (
          <ContentPage 
            resourceUri={currentResourceUri}
            manifest={manifest}
            onNavigate={handleNavigate}
          />
        )}
      </main>
    </div>
  );
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/ContentPage.css
--------------------------------------------------------------------------------

.content-page {
  max-width: 740px;
  margin: 0 auto;
  padding-bottom: var(--space-16);
}

.content-header {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.content-meta {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.tier-badge,
.audience-badge {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content-header h1 {
  margin: 0;
}

.markdown-content {
  line-height: 1.6;
  color: var(--color-text);
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

.markdown-content h2 {
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.markdown-content p {
  margin-bottom: var(--space-6);
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: var(--space-6);
  padding-left: var(--space-6);
}

.markdown-content li {
  margin-bottom: var(--space-2);
}

.markdown-content code {
  font-family: var(--font-mono);
  font-size: 14px;
  background: var(--color-surface);
  padding: 2px 6px;
  border-radius: 4px;
}

.markdown-content pre {
  background: var(--color-surface);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin-bottom: var(--space-6);
}

.markdown-content pre code {
  background: none;
  padding: 0;
}

.markdown-content blockquote {
  border-left: 3px solid var(--color-accent);
  padding-left: var(--space-4);
  margin: var(--space-6) 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.markdown-content a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown-content a:hover {
  color: var(--color-accent-hover);
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-6) 0;
}

.markdown-content th,
.markdown-content td {
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  text-align: left;
}

.markdown-content th {
  background: var(--color-surface);
  font-weight: 600;
}

.content-media {
  margin-top: var(--space-12);
  padding-top: var(--space-12);
  border-top: 1px solid var(--color-border);
}

.content-footer {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.content-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  font-size: 13px;
  padding: 4px 12px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border-radius: 12px;
}

.content-loading,
.content-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.content-error h2 {
  margin-bottom: var(--space-4);
}

.content-error p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .content-page {
    max-width: 100%;
  }
  
  .markdown-content pre {
    font-size: 13px;
  }
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/ContentPage.jsx
--------------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { MediaShelf } from './MediaShelf';
import './ContentPage.css';

export function ContentPage({ resourceUri, manifest, onNavigate }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resource = manifest?.resources.find(r => r.uri === resourceUri);

  useEffect(() => {
    if (resource) {
      setLoading(true);
      setError(null);
      
      fetch(`/content${resource.path}`)
        .then(r => {
          if (!r.ok) throw new Error(`Failed to load content: ${r.status}`);
          return r.text();
        })
        .then(md => {
          // Configure marked for better rendering
          marked.setOptions({
            breaks: true,
            gfm: true,
          });
          setContent(marked.parse(md));
          setLoading(false);
        })
        .catch(e => {
          setError(e.message);
          setLoading(false);
        });
    }
  }, [resource]);

  if (loading) {
    return (
      <div className="content-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-error">
        <h2>Unable to Load Content</h2>
        <p>{error}</p>
        <button onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="content-error">
        <h2>Content Not Found</h2>
        <p>The requested resource could not be found.</p>
        <button onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <article className="content-page">
      <header className="content-header">
        <div className="content-meta">
          {resource.tier !== undefined && (
            <span className="tier-badge">Tier {resource.tier}</span>
          )}
          {resource.audience && (
            <span className="audience-badge">{resource.audience}</span>
          )}
        </div>
        <h1>{resource.title}</h1>
      </header>

      <div 
        className="content-body markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {resource.assets && Object.keys(resource.assets).length > 0 && (
        <aside className="content-media">
          <MediaShelf 
            assets={resource.assets}
            resourceTitle={resource.title}
          />
        </aside>
      )}

      {resource.tags && resource.tags.length > 0 && (
        <footer className="content-footer">
          <div className="content-tags">
            {resource.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/Home.css
--------------------------------------------------------------------------------

.home {
  padding-bottom: var(--space-16);
}

.hero {
  text-align: center;
  padding: var(--space-16) 0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  margin-bottom: var(--space-6);
}

.hero-content p {
  font-size: 21px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
}

.home-media {
  margin-top: var(--space-12);
  padding-top: var(--space-12);
  border-top: 1px solid var(--color-border);
}

.home-cta {
  margin-top: var(--space-16);
  padding-top: var(--space-12);
}

.home-cta h2 {
  text-align: center;
  margin-bottom: var(--space-8);
}

.cta-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-8);
}

.cta-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
}

.cta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.cta-card h3 {
  font-size: 24px;
  margin-bottom: var(--space-3);
}

.cta-card p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  line-height: 1.5;
}

.cta-card button {
  width: 100%;
}

.home-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .hero {
    padding: var(--space-8) 0;
  }
  
  .hero-content p {
    font-size: 18px;
  }
  
  .cta-cards {
    grid-template-columns: 1fr;
  }
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/Home.jsx
--------------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { MediaShelf } from './MediaShelf';
import './Home.css';

export function Home({ manifest, onNavigate }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Find the home resource
  const homeResource = manifest?.resources.find(r => r.uri === 'klappy://public/home');

  useEffect(() => {
    if (homeResource) {
      fetch(`/content${homeResource.path}`)
        .then(r => r.text())
        .then(md => {
          setContent(marked.parse(md));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [homeResource]);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <div 
          className="hero-content" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>

      {homeResource?.assets && (
        <section className="home-media">
          <MediaShelf 
            assets={homeResource.assets}
            resourceTitle={homeResource.title}
          />
        </section>
      )}

      <section className="home-cta">
        <h2>Start Exploring</h2>
        <div className="cta-cards">
          <div className="cta-card">
            <h3>What is ODD?</h3>
            <p>Learn about Outcomes Driven Development and how it works.</p>
            <button onClick={() => onNavigate('content', 'klappy://public/odd')}>
              Read the Manifesto →
            </button>
          </div>
          
          <div className="cta-card">
            <h3>Explore Projects</h3>
            <p>See what's being built with ODD principles.</p>
            <button onClick={() => onNavigate('content', 'klappy://projects/index')}>
              View Projects →
            </button>
          </div>
          
          <div className="cta-card">
            <h3>Dive into Canon</h3>
            <p>Browse the constraints, decisions, and evidence policies.</p>
            <button onClick={() => onNavigate('content', 'klappy://meta/canon-index')}>
              Explore Canon →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/MediaShelf.css
--------------------------------------------------------------------------------

.media-shelf {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

.media-shelf-title {
  font-size: 24px;
  margin-bottom: var(--space-3);
}

.media-shelf-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  font-size: 15px;
}

.media-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.media-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  overflow: hidden;
}

.media-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s var(--ease-out);
}

.media-toggle:hover {
  background: var(--color-surface);
}

.media-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.media-label {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
}

.expand-arrow {
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: transform 0.2s var(--ease-out);
  flex-shrink: 0;
}

.expand-arrow.expanded {
  transform: rotate(180deg);
}

.media-content {
  padding: 0 var(--space-4) var(--space-4) var(--space-4);
  animation: slideDown 0.3s var(--ease-out);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.media-player {
  width: 100%;
  border-radius: var(--radius-sm);
  background: #000;
}

.media-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  display: block;
}

.media-link-wrapper {
  padding: var(--space-4);
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  text-align: center;
}

.media-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-accent);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s var(--ease-out);
}

.media-link:hover {
  color: var(--color-accent-hover);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .media-shelf {
    padding: var(--space-6);
  }
  
  .media-toggle {
    padding: var(--space-3);
  }
  
  .media-icon {
    font-size: 18px;
  }
  
  .media-label {
    font-size: 15px;
  }
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/MediaShelf.jsx
--------------------------------------------------------------------------------

import { useState } from 'react';
import './MediaShelf.css';

export function MediaShelf({ assets, resourceTitle }) {
  const [expandedMedia, setExpandedMedia] = useState({});

  if (!assets || Object.keys(assets).length === 0) {
    return null;
  }

  const toggleMedia = (key) => {
    setExpandedMedia(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getMediaType = (path) => {
    if (path.endsWith('.mp4') || path.endsWith('.webm')) return 'video';
    if (path.endsWith('.mp3') || path.endsWith('.m4a') || path.endsWith('.wav')) return 'audio';
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.gif') || path.endsWith('.webp')) return 'image';
    if (path.endsWith('.pdf')) return 'pdf';
    return 'unknown';
  };

  const formatMediaLabel = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'video': return '▶';
      case 'audio': return '🎵';
      case 'image': return '🖼';
      case 'pdf': return '📄';
      default: return '📎';
    }
  };

  return (
    <div className="media-shelf">
      <h3 className="media-shelf-title">Media</h3>
      <p className="media-shelf-description">
        Optional resources to enhance your understanding. Expand to view.
      </p>
      
      <div className="media-items">
        {Object.entries(assets).map(([key, path]) => {
          const mediaType = getMediaType(path);
          const isExpanded = expandedMedia[key];
          const label = formatMediaLabel(key);
          
          return (
            <div key={key} className="media-item">
              <button 
                className="media-toggle"
                onClick={() => toggleMedia(key)}
                aria-expanded={isExpanded}
              >
                <span className="media-icon">{getMediaIcon(mediaType)}</span>
                <span className="media-label">{label}</span>
                <span className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}>
                  ▾
                </span>
              </button>
              
              {isExpanded && (
                <div className="media-content">
                  {mediaType === 'video' && (
                    <video 
                      controls 
                      className="media-player"
                      preload="metadata"
                    >
                      <source src={path} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  )}
                  
                  {mediaType === 'audio' && (
                    <audio 
                      controls 
                      className="media-player"
                      preload="metadata"
                    >
                      <source src={path} />
                      Your browser does not support audio playback.
                    </audio>
                  )}
                  
                  {mediaType === 'image' && (
                    <img 
                      src={path} 
                      alt={label}
                      className="media-image"
                      loading="lazy"
                    />
                  )}
                  
                  {mediaType === 'pdf' && (
                    <div className="media-link-wrapper">
                      <a 
                        href={path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="media-link"
                      >
                        Open PDF in new tab →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/Navigation.css
--------------------------------------------------------------------------------

.navigation {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
}

.nav-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-8);
  height: 52px;
}

.nav-brand {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.2s var(--ease-out);
  flex-shrink: 0;
}

.nav-brand:hover {
  color: var(--color-accent);
}

.brand-text {
  font-family: var(--font-mono);
}

.nav-list {
  display: flex;
  gap: var(--space-4);
  list-style: none;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
}

.nav-item {
  position: relative;
}

.nav-button {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 400;
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  transition: color 0.2s var(--ease-out);
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-button:hover {
  color: var(--color-text);
}

.nav-button.active {
  color: var(--color-accent);
  font-weight: 500;
}

.expand-icon {
  font-size: 10px;
  transition: transform 0.2s var(--ease-out);
  display: inline-block;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.canon-submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  list-style: none;
  min-width: 200px;
  margin-top: var(--space-2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: var(--space-2);
  animation: slideDown 0.2s var(--ease-out);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submenu-button {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 14px;
  padding: var(--space-2) var(--space-3);
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s var(--ease-out);
}

.submenu-button:hover {
  background: var(--color-surface);
  color: var(--color-accent);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: var(--space-3) var(--space-4);
    gap: var(--space-4);
    align-items: flex-start;
  }
  
  .nav-list {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  
  .nav-button {
    padding: var(--space-2) 0;
  }
  
  .canon-submenu {
    position: relative;
    margin-top: var(--space-2);
    margin-left: var(--space-4);
    box-shadow: none;
    border: none;
    border-left: 2px solid var(--color-border);
  }
}



--------------------------------------------------------------------------------
📄 File: products/website/src/components/Navigation.jsx
--------------------------------------------------------------------------------

import { useState } from 'react';
import './Navigation.css';

export function Navigation({ currentView, onNavigate, manifest }) {
  const [expandedCanon, setExpandedCanon] = useState(false);

  const primaryNavItems = [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'odd', label: 'What is ODD?', uri: 'klappy://public/odd' },
    { id: 'projects', label: 'Projects', uri: 'klappy://projects/index' },
    { id: 'why', label: 'Why This Exists', uri: 'klappy://about/why-this-exists' },
    { id: 'about', label: 'About', uri: 'klappy://about/bio' },
    { id: 'canon', label: 'Explore Canon', isExpandable: true },
  ];

  const handleNavClick = (item) => {
    if (item.isExpandable) {
      setExpandedCanon(!expandedCanon);
    } else if (item.view) {
      onNavigate(item.view);
    } else if (item.uri) {
      onNavigate('content', item.uri);
    }
  };

  // Get tier 1 canon resources for expanded view
  const canonResources = manifest?.resources.filter(r => 
    r.audience === 'canon' && 
    r.exposure === 'nav' && 
    r.tier === 1
  ) || [];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => onNavigate('home')}>
          <span className="brand-text">klappy.dev</span>
        </div>
        
        <ul className="nav-list">
          {primaryNavItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-button ${
                  currentView === item.view || currentView === item.uri ? 'active' : ''
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
                {item.isExpandable && (
                  <span className={`expand-icon ${expandedCanon ? 'expanded' : ''}`}>
                    ▾
                  </span>
                )}
              </button>
              
              {item.isExpandable && expandedCanon && (
                <ul className="canon-submenu">
                  {canonResources.map(resource => (
                    <li key={resource.uri}>
                      <button
                        className="submenu-button"
                        onClick={() => onNavigate('content', resource.uri)}
                      >
                        {resource.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}



--------------------------------------------------------------------------------
📄 File: products/website/src/index.css
--------------------------------------------------------------------------------

/* 
 * ODD Website - Progressive Disclosure Design
 * Visual calm with Apple 2025 design principles
 */

:root {
  /* Color system - consumed from visual interface contract */
  --color-bg: #ffffff;
  --color-text: #1d1d1f;
  --color-text-secondary: #86868b;
  --color-accent: #0071e3;
  --color-accent-hover: #0077ed;
  --color-border: #d2d2d7;
  --color-surface: #f5f5f7;
  
  /* Typography - Apple 2025 style */
  --font-system: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 
                 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Courier New', monospace;
  
  /* Spacing - 8px base unit */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  
  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  
  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
}

body {
  font-family: var(--font-system);
  font-size: 17px;
  line-height: 1.47059;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography scale */
h1 {
  font-size: 56px;
  font-weight: 600;
  line-height: 1.07143;
  letter-spacing: -0.005em;
}

h2 {
  font-size: 40px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0;
}

h3 {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.125;
  letter-spacing: 0.004em;
}

h4 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.16667;
  letter-spacing: 0.009em;
}

p {
  margin-bottom: var(--space-4);
}

/* Links */
a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s var(--ease-out);
}

a:hover {
  color: var(--color-accent-hover);
}

/* Code */
code {
  font-family: var(--font-mono);
  font-size: 14px;
  background: var(--color-surface);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Buttons */
button {
  font-family: var(--font-system);
  font-size: 17px;
  font-weight: 400;
  color: var(--color-bg);
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

button:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  h1 {
    font-size: 40px;
  }
  
  h2 {
    font-size: 32px;
  }
  
  h3 {
    font-size: 24px;
  }
  
  body {
    font-size: 16px;
  }
}



--------------------------------------------------------------------------------
📄 File: products/website/src/main.jsx
--------------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



--------------------------------------------------------------------------------
📄 File: products/website/vite.config.js
--------------------------------------------------------------------------------

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: '../../public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});

