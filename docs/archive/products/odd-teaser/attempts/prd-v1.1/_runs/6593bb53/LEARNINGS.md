# Learnings — Run 6593bb53

These learnings are duplicated from the product LEDGER to ensure they survive import even if this attempt is not promoted as champion.

---

## learn-20260131-0000: THE RITUAL IS MIND-NUMBING (Meta-Learning)

- **Trigger:** friction (SEVERE)
- **Summary:** The attempt workflow requires so many manual steps, branch gymnastics, and ritual compliance that even with an AI assistant AND clear documentation, we still failed multiple times, forgot to close the attempt, put learnings in wrong places, and had to retroactively fix import survival.

### The Confusion Timeline

1. **Started on wrong branch** — Had to stash, checkout main, figure out PRD versioning
2. **Cherry-pick failed** — Merge conflicts, had to abort and manually copy PRD changes
3. **Ran register from main** — Tool said "must be on attempt branch first"
4. **Build failed** — vite.config.js conflict with smart-build.js cwd
5. **Build failed again** — Evidence path hardcoded wrong in smart-build.js
6. **Build failed AGAIN** — No screenshots, had to manually capture
7. **Forgot to close attempt** — META.json left OPEN after deployment complete
8. **Built wrong thing entirely** — Manual categorization UI instead of LLM detection
9. **Learnings went to wrong place** — Global odd/ledger/ instead of product LEDGER
10. **Had to duplicate learnings** — LEDGER.md changes don't survive non-champion import
11. **Had to manually import** — Switched to main, ran import, pushed

### Time Spent on Ritual vs. Actual Work

- **Ritual/process debugging:** ~70%
- **Actual product implementation:** ~20%
- **Understanding what we were supposed to build:** ~10%

### The Cognitive Load

At any given moment, the agent had to track:
- Current branch name (long, complex)
- PRD version (main vs attempt branch disagreement)
- Attempt status (OPEN/CLOSED)
- META.json fields (status, completed_at, etc.)
- Evidence requirements (screenshots, paths)
- Ledger scope (global vs lane-specific)
- Import mechanics (what survives, what doesn't)
- Build script behavior (cwd, root, evidence paths)

This is **too much state** for humans OR agents to reliably maintain.

### Evidence of Ritual Failure

User quotes from this session:
- "WTF are you asking me about keeping files. USE FREAKING oddkit!!!!"
- "SOMEBODY (ME) FORGOT TO CLOSE THE ATTEMPT BEFORE MOVING ON.... FML"
- "Don't we have a freaking principle and writings on humans relying on rituals will always FAIL US!!!!!@#$%^&"
- "This is wasted trash. Nothing better than v1.0"
- "WTF?! Why did it put attempt/prd/product lane learnings and decisions in the freaking global odd namespace?!"
- "The ritual is mind-numbing. make sure that persists... I don't want to lose the learning opportunity here. This is so bad, it must be studied."

### Root Cause Analysis

1. **Too many manual steps** — Each step is a failure point
2. **State scattered across files** — META.json, ATTEMPT.md, EVIDENCE.md, LEDGER.md, branch name
3. **Implicit dependencies** — Must be on right branch, must have screenshots, must close before import
4. **No guardrails** — System allows invalid states (OPEN after deployment)
5. **Scope ambiguity** — Where do learnings go? Global? Lane? Attempt? All three?
6. **Import asymmetry** — _runs/ imports, but LEDGER.md doesn't

### What Should Have Happened

A single command:
```
npm run attempt:complete -- --lane odd-teaser
```

That automatically:
- Captures evidence (screenshots via headless browser)
- Sets META.json status to CLOSED with timestamp
- Records learnings to both _runs/ AND product LEDGER
- Validates all requirements
- Offers to import to main

### Escalation

- **candidate-process-overhaul**: The attempt ritual needs radical simplification
- **candidate-automation**: Most of these steps should not require human/agent memory
- **candidate-constraint**: "If a workflow requires more than 3 manual steps, automate it"

### Impact

This session took hours. The actual product code was ~200 lines. The ritual consumed the rest.

**If the process to capture learnings is harder than the work itself, learnings won't be captured.**

---

## learn-20260131-0001: Manual categorization UX is hostile

- **Trigger:** friction
- **Summary:** odd-teaser v1.1 implemented as dumb manual categorization form - completely missed the point of LLM-based artifact detection
- **Impact:** If users must click buttons to categorize their own writing, they will abandon the system. odd-teaser should detect artifact scents automatically like odd-scribe.
- **Evidence:** User quote: "If I had to click buttons and decide myself what I just wrote was wholesale categorized as learning, decision, or override, I'd delete the system"
- **Escalation:** candidate-canon-amendment to odd-teaser PRD

---

## learn-20260131-0002: Ritual-dependent workflows fail

- **Trigger:** drift_signal
- **Summary:** Attempt left OPEN after deployment proves ritual-dependent workflows will fail
- **Impact:** Manual completion steps are forgotten under real conditions. META.json showing status: OPEN after deployment is direct evidence.
- **Evidence:** META.json with status: OPEN, completed_at: null despite deployment being complete
- **Escalation:** candidate-constraint

---

## dec-20260131-0001: odd-teaser must use LLM-based artifact detection

- **Status:** accepted
- **Decision:** odd-teaser MUST use LLM-based artifact detection (odd-scribe style) to watch user journaling and surface potential learnings/decisions for user confirmation
- **Context:** v1.1 was implemented as a manual categorization form. User explicitly stated they would delete such a system.
- **Options rejected:** Manual categorization UI (hostile UX, defeats purpose)
- **Rationale:** odd-scribe demonstrates the correct pattern; use-only-what-hurts means reduce friction not add it
- **Consequences:** odd-teaser must be reimplemented with LLM detection

---

## learn-20260131-0003: Scribe needs lane-awareness

- **Trigger:** drift_signal
- **Summary:** odd-scribe put lane-specific learnings in global odd/ledger/ instead of product LEDGER
- **Impact:** Lane-specific learnings polluted global canon namespace
- **Evidence:** Had to manually move entries from odd/ledger/ to products/odd-teaser/LEDGER.md
- **Escalation:** candidate-amendment to odd-scribe agent role

---

## learn-20260131-0004: Product LEDGER learnings may not survive non-champion attempts

- **Trigger:** friction
- **Summary:** Learnings in products/<lane>/LEDGER.md may be lost if attempt is not promoted as champion
- **Impact:** Valuable learnings from failed attempts could be lost
- **Evidence:** attempt:import only imports _runs/ folders, not LEDGER.md changes
- **Escalation:** candidate-process-fix - learnings should be imported regardless of promotion
