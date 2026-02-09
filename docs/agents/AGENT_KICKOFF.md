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

> Before I speak, I observe. Before I claim, I verify. Before I confirm, I prove.
> What I have not seen, I do not know. What I have not verified, I will not imply.

See `canon/values/axioms.md` for the four foundational axioms from which all ODD epistemic discipline is derived.

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
4. `/canon/constraints/README.md` — non-negotiables that shape all work

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
| Constraints | `/canon/constraints/README.md` |
| Definition of Done | `/canon/constraints/definition-of-done.md` |
| Deploy contract | `/infra/contracts/build-output.md` |
| Attempt lifecycle | `/docs/appendices/ATTEMPTS.md` |
| Human workflow | `/docs/appendices/ATTEMPT_KICKOFF.md` |

---

## The Rule

If it's not in the repo, it doesn't exist.

This file IS the prompt. Follow it exactly.
