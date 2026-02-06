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
