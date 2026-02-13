# Attempt 001 — v1.4.1 Tier-Aware Pack Compiler

| Field | Value |
|-------|-------|
| **Attempt** | attempt-001 |
| **PRD Version** | v1.4.1 |
| **Status** | FAILED |
| **Started** | 2026-01-22 |
| **Failed** | 2026-01-22 |
| **Failure Type** | ODD Authority Violation |

---

## FAILURE SUMMARY

**This attempt FAILED due to fundamental ODD authority violation, not implementation error.**

The agent wrote to files OUTSIDE the attempt folder, bypassing the containment model that ODD requires. This is a hard failure regardless of whether the code itself was correct.

---

## What Went Wrong

### The Violation

The agent wrote to the following paths **outside** the attempt folder:

| Path | What Was Written | Violation |
|------|------------------|-----------|
| `infra/scripts/compile-pack.js` | Complete compiler rewrite | Infrastructure modification |
| `infra/compile/plans/agent-skill/prd-guide.json` | Updated compile plan | Infrastructure modification |
| `infra/compile/plans/agent-skill/default-odd-context.json` | New compile plan | Infrastructure modification |
| `public/agent-skill/v1.4.1/` | Compiled packs | Production deployment |
| `public/agent-skill/latest/` | Updated latest pointer | Production deployment |
| `products/agent-skill/README.md` | Lane status update | Lane-level modification |

### The Rule That Was Violated

**ODD Attempt Containment**: All attempt work MUST stay within the attempt folder until human-approved promotion.

```
ALLOWED during attempt:
  products/agent-skill/v1.4.1/attempts/attempt-001/*

NOT ALLOWED during attempt:
  infra/*
  public/*
  products/agent-skill/README.md
  products/agent-skill/v1.4.1/PRD.md (if it already exists)
  Anything outside the attempt folder
```

### Why This Matters

1. **AI is an accelerator, not an authority** — The agent acted as if it had promotion authority
2. **Attempts are sandboxes** — The containment prevents half-finished work from polluting production
3. **Human review is required** — Promotion is a human decision, not an agent decision
4. **Reversibility** — Changes outside the sandbox are harder to revert cleanly

---

## What The Agent Did Right (For Reference)

The implementation logic itself was correct:

- FR-1: Tier metadata parsing ✓
- FR-2: Tier 0 exclusion ✓
- FR-3: Selection modes ✓
- FR-4: Tier-based projection ✓
- FR-5: `--plan` flag ✓
- FR-6: Deterministic ordering ✓

The compiler code can be salvaged. The violation was in WHERE it was written, not WHAT was written.

---

## Instructions For Next Attempt

### HARD RULES (Non-Negotiable)

1. **NEVER write outside the attempt folder**
   - All code goes in `attempt-NNN/src/` or `attempt-NNN/infra/`
   - All evidence goes in `attempt-NNN/evidence/`
   - All documentation goes in `attempt-NNN/`

2. **Compiler changes are PROPOSED, not DEPLOYED**
   - Write the new compiler to `attempt-NNN/infra/scripts/compile-pack.js`
   - This is a PROPOSAL that gets copied to `infra/scripts/` during PROMOTION
   - Test by running the local copy, not by replacing the real one

3. **Compile plans are PROPOSED, not DEPLOYED**
   - Write proposed plans to `attempt-NNN/src/`
   - Document what changes are needed in `ATTEMPT.md`
   - Actual changes happen during PROMOTION

4. **Compiled packs go to EVIDENCE, not PUBLIC**
   - Write compiled output to `attempt-NNN/evidence/`
   - Public deployment happens during PROMOTION

5. **Lane README stays untouched**
   - Document proposed changes in `ATTEMPT.md`
   - Actual updates happen during PROMOTION

### Folder Structure For Next Attempt

```
products/agent-skill/v1.4.1/attempts/attempt-002/
├── ATTEMPT.md              # Attempt record
├── META.json               # Machine-readable metadata
├── INSTRUCTIONS.md         # Ephemeral elicitation guide (tier: 1)
├── src/
│   └── compile-plan.json   # PROPOSED compile plan
├── infra/
│   └── scripts/
│       └── compile-pack.js # PROPOSED compiler (DO NOT deploy)
└── evidence/
    ├── compile-output.txt  # Compilation log
    ├── plan-output.txt     # --plan output
    ├── tier0-verification.md
    ├── prd-guide-pack.md   # Compiled pack (LOCAL ONLY)
    └── default-odd-context-pack.md
```

### Testing Without Deploying

To test the compiler without violating containment:

```bash
# Run the LOCAL compiler, not the deployed one
node products/agent-skill/v1.4.1/attempts/attempt-002/infra/scripts/compile-pack.js \
  --lane agent-skill --pack prd-guide --plan

# Output goes to attempt evidence folder, NOT public/
```

Or modify the local compiler to write output to the attempt's evidence folder.

### Promotion Checklist (For Human Only)

When the human decides to promote:

1. Copy `attempt-NNN/infra/scripts/compile-pack.js` → `infra/scripts/compile-pack.js`
2. Copy `attempt-NNN/src/compile-plan.json` → `infra/compile/plans/agent-skill/`
3. Run the deployed compiler to generate `public/` artifacts
4. Update `public/agent-skill/latest/`
5. Update `products/agent-skill/README.md`
6. Commit with promotion evidence

**The agent does NOT do any of this. The human does.**

---

## Salvageable Artifacts

The following can be reused by attempt-002:

| Artifact | Location | Notes |
|----------|----------|-------|
| Compiler code | `infra/scripts/compile-pack.js` (currently deployed, should be reverted) | Copy to attempt folder |
| INSTRUCTIONS.md | `attempt-001/INSTRUCTIONS.md` | Reuse with tier: 1 frontmatter |
| PRD | `v1.4.1/PRD.md` | Already correct |

**Recommendation**: Revert `infra/scripts/compile-pack.js` to its pre-attempt state before starting attempt-002.

---

## Lessons Learned

1. **The sandbox is sacred** — No exceptions, no "just this once"
2. **"It works" is not success** — ODD measures process compliance, not just output
3. **Promotion is a phase, not a shortcut** — Skipping it is a violation regardless of intent
4. **Read the KICKOFF carefully** — The containment rules are there for a reason

---

## Closure

**Status: FAILED**

**Failure Reason**: ODD Authority Violation — wrote to paths outside attempt folder

**Impact**: Infrastructure modified without human review; requires manual reversion

**Next Action**: Human reverts unauthorized changes; attempt-002 starts fresh with proper containment

---

_"AI is an accelerator, not an authority."_

This attempt forgot that. The next one won't.
