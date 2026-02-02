# Odd-Teaser — Attempt Kickoff

You are starting an attempt in the **odd-teaser** lane.

---

## STOP — READ THIS FIRST

**The #1 cause of failed attempts is writing outside the attempt folder.**

This is not a suggestion. This is not flexible. This is the rule that will fail your attempt regardless of how good your code is.

```
+-----------------------------------------------------------------------+
|                     YOUR SANDBOX (Agent Authority)                     |
|                                                                        |
|   products/odd-teaser/attempts/v<VERSION>/attempt-NNN/                 |
|                                                                        |
|   You can write ANYTHING here. Go wild.                                |
|   - ATTEMPT.md, META.json                                              |
|   - src/           <- proposed implementation code                     |
|   - evidence/      <- proof it works (screenshots, logs, exports)      |
|                                                                        |
+------------------------------------------------------------------------+
|                     FORBIDDEN ZONE (Human Authority)                   |
|                                                                        |
|   products/odd-teaser/src/           <- NEVER (human promotes)         |
|   products/odd-teaser/dist/          <- NEVER (build output)           |
|   products/odd-teaser/PRD.md         <- NEVER (propose changes only)   |
|   products/odd-teaser/behavior.md    <- NEVER (propose changes only)   |
|   public/                            <- NEVER (deployment is human)    |
|                                                                        |
|   These paths require HUMAN promotion. Not your job.                   |
|                                                                        |
+------------------------------------------------------------------------+
```

---

## AUTHORITY BOUNDARIES — What You CANNOT Do

| Action | Why It Fails Your Attempt |
|--------|---------------------------|
| Write to lane `src/` | Lane source is human-promoted, not agent-deployed |
| Write to `public/` | Production deployment requires human review |
| Claim CHAMPION status | Agent stops at CLOSED; human elevates to CHAMPION |
| Update lane PRD | Propose changes in ATTEMPT.md; human applies |
| Deploy to Cloudflare | Even preview deploys require human action |
| Modify behavior.md | Propose changes; human reviews |

**"AI is an accelerator, not an authority."**

---

## PRE-FLIGHT CHECKLIST

Before you write a single line of code, verify you understand:

- [ ] My attempt folder is: `products/odd-teaser/attempts/v<VERSION>/attempt-NNN/`
- [ ] ALL my file writes will be inside that folder
- [ ] If I need to propose UI code, I write to `attempt-NNN/src/`
- [ ] Screenshots and evidence go to `attempt-NNN/evidence/`
- [ ] I will NOT update lane `src/` — that's a human promotion
- [ ] I will NOT claim CHAMPION — I stop at CLOSED
- [ ] If the PRD seems impossible, I FAIL early and document why

---

## Step 1: Find Active Version

Check `HISTORY.md` — the Versions table shows which version is **Active**.

Note the active version (e.g., `v1.1`). This is your target.

---

## Step 2: Read Context

Read these files in order:

1. `README.md` — Lane overview
2. `PRD.md` — The authoritative PRD (currently v1.1)
3. `behavior.md` — LLM behavior contract
4. `HISTORY.md` — Prior attempts and learnings
5. `LEDGER.md` — Product-level decisions and locks

---

## Step 3: Review Prior Art

Read the learnings from previous attempts:

| Path | What To Learn |
|------|---------------|
| `attempts/prd-v1.1/_runs/*/LEARNINGS.md` | Entry-state posture lessons |

If you see patterns in past failures that relate to your task, **stop and plan around them**.

---

## Step 4: Create Attempt Folder

Create: `attempts/v<VERSION>/attempt-NNN/`

Where NNN is the next number (check existing folders).

### Required Structure

```
attempt-NNN/
+-- ATTEMPT.md              # Closure record (status, outcome, learnings)
+-- META.json               # Machine-readable metadata
+-- src/                    # Proposed implementation
|   +-- components/         # UI components
|   +-- styles/             # Styling
|   +-- index.html          # Entry point
+-- evidence/               # Proof of work
    +-- screenshots/        # Visual evidence
    +-- export-sample.md    # Example artifact export
    +-- *.md                # Verification evidence
```

---

## Step 5: Execute (Inside Your Sandbox)

Follow the PRD's Definition of Done exactly.

### Key Requirements from PRD

1. **Entry-state**: Thinking-first, not artifact editor
2. **Artifact types**: Learnings, Decisions, Overrides
3. **Export**: One-click, Markdown, local-only
4. **Non-goals**: No auth, no persistence, no teaching, no navigation

### Testing Your Implementation

```bash
# WRONG: This violates containment
cp -r attempt-NNN/src/* products/odd-teaser/src/

# RIGHT: Test locally from your sandbox
npx serve attempt-NNN/src/
```

---

## Step 6: Close (NOT Champion)

Update `ATTEMPT.md` with:

- **Status**: CLOSED (not CHAMPION — that's not your call)
- Outcome summary
- Evidence produced
- Self-audit results
- Learnings

**You do NOT:**
- Update `HISTORY.md` (human does this)
- Deploy to production (human does this)
- Mark status as CHAMPION (human does this)

---

## Product-Specific Constraints

### Core Philosophy

This is NOT a documentation site. This is NOT a teaching tool.

The product exists for **epistemic externalization and exit**.

**Klappy.dev must always be easier to leave than to continue.**

### Success Definition

A first-time visitor leaves after one session having:

1. Externalized at least one epistemic artifact
2. Noticed a missing habit in their own workflow
3. Taken something with them (export)

The product succeeds even if the user never returns.

### Forbidden Features

If a feature increases time-on-site without increasing artifact creation, it is invalid.

- No engagement optimization
- No retention features
- No navigation trees
- No menus beyond artifact visibility

---

## Common Violations (Don't Be This Agent)

### Violation 1: Building a documentation browser

```diff
- "Let me add a sidebar to browse ODD concepts"     <- VIOLATION
+ Single-page, artifact-focused experience          <- CORRECT
```

**Why it fails**: PRD explicitly forbids navigation and teaching.

### Violation 2: Adding engagement features

```diff
- "Let me add a progress indicator to encourage completion"  <- VIOLATION
+ Exit is the goal, not completion                          <- CORRECT
```

**Why it fails**: Engagement optimization is a non-goal.

### Violation 3: Persisting user state

```diff
- "Let me save artifacts to localStorage for return visits"  <- VIOLATION
+ Export is the exit ramp; no persistence                   <- CORRECT
```

**Why it fails**: PRD explicitly forbids identity persistence.

---

## If PRD Seems Problematic

**Don't bend rules to make it work. Don't steer a miss.**

1. STOP immediately
2. Document the issue in `ATTEMPT.md`
3. Mark attempt as FAILED with clear explanation
4. Propose what a new PRD version should address

A FAILED attempt with clear learnings is more valuable than a "success" that violates constraints.

---

## Final Reminder

```
+------------------------------------------------------------+
|                                                             |
|   Your world is:                                            |
|   products/odd-teaser/attempts/v<VERSION>/attempt-NNN/      |
|                                                             |
|   Everything else is someone else's.                        |
|                                                             |
|   "AI is an accelerator, not an authority."                 |
|                                                             |
+------------------------------------------------------------+
```
