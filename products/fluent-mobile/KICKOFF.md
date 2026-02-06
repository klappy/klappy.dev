# Fluent Mobile — Attempt Kickoff

You are starting an attempt in the **fluent-mobile** lane.

**This is a Proof of Concept lane.** The rules are different here.

---

## ⛔ MANDATORY: READ AGENT RULES FIRST

**Before proceeding, read and internalize: [AGENT_RULES.md](AGENT_RULES.md)**

These rules exist because v0.3 attempt-001 FAILED due to:
1. Agent claiming completion without verification
2. Agent fabricating evidence with fake data

**Violations result in attempt failure.**

---

## ⚠️ THIS IS NOT A PRODUCTION LANE

Before you do anything, internalize this:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     POC MINDSET (Non-Negotiable)                    │
│                                                                     │
│   You are here to LEARN, not to BUILD.                             │
│                                                                     │
│   ✅ Test hypotheses                                                │
│   ✅ Gather evidence about what works/doesn't                       │
│   ✅ Document learnings regardless of outcome                       │
│   ✅ Fail fast if something doesn't work                           │
│                                                                     │
│   ❌ Build polished features                                        │
│   ❌ Solve architectural problems completely                        │
│   ❌ Optimize for production readiness                              │
│   ❌ Get attached to code that "almost works"                       │
│                                                                     │
│   "Failure with fast learning is a win."                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⛔ STOP — READ THIS FIRST

**The #1 cause of failed PoC attempts is building features instead of testing hypotheses.**

This PoC exists to answer:

> Whether a mobile-first OBT companion app is a realistic, culturally viable, and performant solution to real field problems — not just a convincing idea in our heads.

This is NOT a feature test. This is a **shared mental model test**.

---

## 🎯 Hypotheses Being Tested

Every action you take should connect to one of these:

| # | Hypothesis | How You'll Know |
|---|------------|-----------------|
| 1 | **Mobile Viability** | Translators can draft and review OBT audio on mobile |
| 2 | **Performance** | App works smoothly on low-to-mid-tier Android devices |
| 3 | **Workflow Usability** | Audio workflows (listen → record → review) feel natural |
| 4 | **Task Clarity** | Users know what to do next without training |
| 5 | **Auth & Trust** | QR-based identity handoff is understandable and trusted |
| 6 | **Cultural Fit** | Approach works across diverse regions and team dynamics |

**If your work doesn't test at least one of these, ask yourself why you're doing it.**

---

## 🚫 Non-Negotiable Guardrails

This PoC must:

| Guardrail | Why It Matters |
|-----------|----------------|
| 🚫 Not imply production readiness | Users must not expect this to "just work" forever |
| 🚫 Not block or slow web app progress | This is parallel exploration, not a dependency |
| 🚫 Not encode org-specific workflows | Must remain adaptable to learnings |
| 🚫 Not imply Paratext replacement | Different purpose entirely |
| ✅ Be quick to test | Speed of learning > polish |
| ✅ Be easy to discard | No sunk cost fallacy |
| ✅ Be fast to iterate | Learnings inform next attempt |

---

## 📁 Your Sandbox

```
┌─────────────────────────────────────────────────────────────────────┐
│                     YOUR SANDBOX (Agent Authority)                   │
│                                                                     │
│   products/fluent-mobile/attempts/v{VERSION}/attempt-NNN/           │
│                                                                     │
│   You can write ANYTHING here.                                      │
│   ├── ATTEMPT.md          — Closure record, learnings               │
│   ├── META.json           — Machine-readable metadata               │
│   ├── HYPOTHESES.md       — Which hypotheses tested, results        │
│   ├── src/                — PoC implementation code                 │
│   └── evidence/           — Field feedback, screenshots, logs       │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                     FORBIDDEN ZONE (Human Authority)                 │
│                                                                     │
│   ❌ products/fluent-mobile/PRD.md   — Only human revises PRD       │
│   ❌ products/fluent-mobile/README.md — Only human updates README   │
│   ❌ docs/PRD/fluent-mobile/         — Canon location, human-owned  │
│   ❌ products/website/               — Wrong lane entirely          │
│   ❌ products/agent-skill/           — Wrong lane entirely          │
│   ❌ public/                         — Production deployment        │
│                                                                     │
│   "AI is an accelerator, not an authority."                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✅ PRE-FLIGHT CHECKLIST

Before you write a single line of code:

- [ ] I read `public/agent-skill/latest/prd-guide-pack.md` (ODD canon)
- [ ] I read `products/fluent-mobile/INSTRUCTIONS.md` (PoC context)
- [ ] I understand which hypotheses I'm testing
- [ ] I understand my work is exploratory, not production
- [ ] My attempt folder is: `products/fluent-mobile/attempts/v{VERSION}/attempt-NNN/`
- [ ] ALL my file writes will be inside that folder
- [ ] I will NOT claim "production ready" — this is a PoC
- [ ] I will document learnings regardless of success/failure

---

## 📋 Step 1: Create Attempt Folder

Create: `products/fluent-mobile/attempts/v{VERSION}/attempt-NNN/`

Where NNN is the next number (check existing folders, start with 001).

### Required Structure

```
attempt-NNN/
├── ATTEMPT.md              # Closure record (status, hypotheses tested, learnings)
├── META.json               # Machine-readable metadata
├── HYPOTHESES.md           # Which hypotheses were tested and results
├── src/                    # PoC implementation (disposable)
│   └── ...                 # Whatever the PoC needs
└── evidence/               # Proof of learning
    ├── field-feedback.md   # What real users said/did
    ├── performance-logs/   # Device performance data
    └── screenshots/        # Visual evidence
```

---

## 📋 Step 2: Pick Your Hypotheses

You don't have to test all 6 hypotheses in one attempt. Pick 1-3 that you can meaningfully test.

Update `HYPOTHESES.md` with:

```markdown
# Hypotheses Under Test

## Attempt-NNN Scope

| # | Hypothesis | Testing Approach | Expected Evidence |
|---|------------|------------------|-------------------|
| 2 | Performance | Build minimal audio player, test on 3 device tiers | FPS logs, load times, user feedback |
| 3 | Workflow Usability | Simple record → playback flow | Task completion time, error rate, user quotes |

## Not Testing This Attempt

| # | Hypothesis | Why Deferred |
|---|------------|--------------|
| 1 | Mobile Viability | Too broad for first attempt |
| 5 | Auth & Trust | Requires backend we don't have yet |
| 6 | Cultural Fit | Requires multi-region field access |
```

---

## 📋 Step 3: Build the Minimum to Test

Build ONLY what you need to test your hypotheses.

**Good PoC code:**
- Gets to testable state fast
- Is obviously disposable
- Prioritizes real-device testing over local simulation
- Collects evidence of what worked/didn't

**Bad PoC code:**
- Has elaborate architecture
- Handles edge cases that don't matter yet
- Optimizes for maintainability (this code will be thrown away)
- Looks production-ready

---

## 📋 Step 4: Gather Evidence

Evidence in a PoC is about learning, not proving success.

### What Counts as Evidence

| Type | Examples | Why It Matters |
|------|----------|----------------|
| **Field Feedback** | User quotes, observed behaviors, confusion points | Tests hypotheses 3, 4, 5, 6 |
| **Performance Data** | Load times, FPS, memory usage on real devices | Tests hypothesis 2 |
| **Task Completion** | Did users complete the workflow? How long? | Tests hypothesis 4 |
| **Cultural Observations** | Group dynamics, language barriers, device sharing | Tests hypothesis 6 |
| **Failure Documentation** | What broke, why, what it taught us | ALL hypotheses |

### Evidence Format

For each hypothesis tested, document:

```markdown
## Hypothesis N: [Name]

**Approach:** [How we tested it]

**Observations:**
- [What happened]
- [What users said/did]
- [What surprised us]

**Conclusion:** VALIDATED | INVALIDATED | INCONCLUSIVE

**Learnings:**
- [What we now know]
- [What this implies for next iteration]

**Evidence:**
- [Links to screenshots, logs, recordings]
```

---

## 📋 Step 5: Close the Attempt

Update `ATTEMPT.md` with:

```markdown
# Attempt NNN — Closure

## Status: CLOSED

## Hypotheses Tested

| # | Hypothesis | Result | Confidence |
|---|------------|--------|------------|
| 2 | Performance | VALIDATED | High — tested on 5 devices |
| 3 | Workflow Usability | INCONCLUSIVE | Medium — need more users |

## Key Learnings

1. [Learning 1]
2. [Learning 2]
3. [Learning 3]

## Recommendation

[ ] Continue — learnings support viability
[ ] Pivot — learnings suggest different approach
[ ] Pause — need more information before deciding
[ ] Stop — fundamental assumptions invalidated

## Next Steps

If continuing:
- [Specific recommendation 1]
- [Specific recommendation 2]

## Self-Audit

- [ ] Tested hypotheses, not features
- [ ] Evidence is field-based, not simulated
- [ ] Learnings are documented regardless of outcome
- [ ] Recommendations connect to evidence
```

---

## ⚠️ Common PoC Violations

### Violation 1: Building Features Instead of Testing Hypotheses

```diff
- "I'll add dark mode and accessibility features"
+ "I'll test if users can complete the record → playback flow"
```

**Why it fails**: Features don't prove viability. Evidence does.

### Violation 2: Polishing Disposable Code

```diff
- Refactoring the audio recorder for maintainability
+ Testing if the audio recorder works on low-end phones
```

**Why it fails**: PoC code will be thrown away. Polish is waste.

### Violation 3: Simulating Instead of Field Testing

```diff
- "I tested on the iOS simulator and it works great"
+ "I tested on a $50 Android phone in low-connectivity and..."
```

**Why it fails**: Simulators don't test real constraints.

### Violation 4: Claiming Success Without Evidence

```diff
- "The PoC is successful because the code works"
+ "Hypothesis 2 (Performance) validated: 3/5 users completed workflow on low-end devices"
```

**Why it fails**: Working code is not the outcome. Learning is.

---

## 🎯 Success Criteria for This Lane

### Minimum Success

- [ ] Clear understanding of why the PoC succeeded or struggled
- [ ] Field feedback that directly informs next iteration
- [ ] At least one hypothesis validated or invalidated with evidence

### Aspirational Success

- [ ] Two teams complete at least one chapter draft on mobile
- [ ] Users express willingness to use it again
- [ ] Multiple hypotheses validated with high confidence

---

## 🚪 Exit Criteria

This PoC should be **easy to abandon**.

Stop if:
- Learning slows
- Confidence drops
- It begins to resemble a production commitment
- Fundamental assumptions are invalidated

**Stopping is not failure. Continuing past useful learning is.**

---

## 📚 Related Documents

- [PRD](PRD.md) — Active requirements (authoritative)
- [HISTORY](HISTORY.md) — Version evolution and learnings
- [AGENT_RULES](AGENT_RULES.md) — Non-negotiable verification rules
- [INSTRUCTIONS](INSTRUCTIONS.md) — Field testing guidance
- [Product Lanes](/docs/appendices/product-lanes.md) — Lane architecture
- [Definition of Done](/canon/constraints/definition-of-done.md) — Evidence requirements
- [Verification & Evidence](/canon/constraints/verification-and-evidence.md) — Epistemic foundation
- [ODD Canon](/public/agent-skill/latest/prd-guide-pack.md) — Foundational thinking
