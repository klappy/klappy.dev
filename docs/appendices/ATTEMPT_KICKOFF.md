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
