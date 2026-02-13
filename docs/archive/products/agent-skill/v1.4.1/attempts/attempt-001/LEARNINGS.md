# Learnings from attempt-001 (FAILED)

## The One Rule You Cannot Break

**NEVER WRITE OUTSIDE YOUR ATTEMPT FOLDER.**

Not to `infra/`. Not to `public/`. Not to lane-level files. Not anywhere.

Your sandbox is:
```
products/agent-skill/v1.4.1/attempts/attempt-NNN/
```

Everything else is off-limits until PROMOTION (which is a human action, not yours).

---

## Why This Matters

ODD treats the attempt folder as a **containment zone**:

| Inside Attempt | Outside Attempt |
|----------------|-----------------|
| Safe to modify | Requires human approval |
| Easy to revert | Hard to revert |
| No production impact | Production impact |
| Agent authority | Human authority |

When you write outside the attempt, you're claiming authority you don't have. Even if the code is perfect, the violation fails the attempt.

---

## What attempt-001 Did Wrong

1. **Wrote compiler directly to `infra/scripts/`** instead of `attempt-001/infra/scripts/`
2. **Wrote compile plans to `infra/compile/plans/`** instead of `attempt-001/src/`
3. **Deployed packs to `public/`** instead of `attempt-001/evidence/`
4. **Updated lane README** without human review

All of these are PROMOTION actions. The agent did them during ATTEMPT.

---

## What attempt-002 Must Do

### 1. Compiler Changes

```
WRONG:  infra/scripts/compile-pack.js
RIGHT:  products/agent-skill/v1.4.1/attempts/attempt-002/infra/scripts/compile-pack.js
```

The compiler in your attempt folder is a PROPOSAL. It gets copied to `infra/` during promotion.

### 2. Compile Plans

```
WRONG:  infra/compile/plans/agent-skill/prd-guide.json
RIGHT:  products/agent-skill/v1.4.1/attempts/attempt-002/src/prd-guide.json
```

Document what changes are needed. Don't make them.

### 3. Compiled Output

```
WRONG:  public/agent-skill/v1.4.1/prd-guide-pack.md
RIGHT:  products/agent-skill/v1.4.1/attempts/attempt-002/evidence/prd-guide-pack.md
```

Your compiled pack is EVIDENCE that the compiler works. It's not a deployment.

### 4. Testing

To test your local compiler:

```bash
# Option A: Run from attempt folder
node products/agent-skill/v1.4.1/attempts/attempt-002/infra/scripts/compile-pack.js \
  --output products/agent-skill/v1.4.1/attempts/attempt-002/evidence/

# Option B: Modify compiler to default output to evidence folder
```

Do NOT replace the real compiler to test. Test your local copy.

### 5. Lane Updates

```
WRONG:  Edit products/agent-skill/README.md directly
RIGHT:  Document proposed changes in ATTEMPT.md, human updates during promotion
```

---

## The Promotion Boundary

```
┌─────────────────────────────────────────────────────────────┐
│                     ATTEMPT BOUNDARY                        │
│                                                             │
│   products/agent-skill/v1.4.1/attempts/attempt-NNN/         │
│   ├── ATTEMPT.md                                            │
│   ├── META.json                                             │
│   ├── INSTRUCTIONS.md                                       │
│   ├── src/           ← proposed configs                     │
│   ├── infra/         ← proposed code                        │
│   └── evidence/      ← proof it works                       │
│                                                             │
│   ═══════════════════════════════════════════════════════   │
│   ↑ Agent writes here                                       │
│   ↓ Human copies during promotion                           │
│   ═══════════════════════════════════════════════════════   │
│                                                             │
│   infra/scripts/compile-pack.js      ← HUMAN ONLY           │
│   infra/compile/plans/               ← HUMAN ONLY           │
│   public/agent-skill/                ← HUMAN ONLY           │
│   products/agent-skill/README.md     ← HUMAN ONLY           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Salvageable Work

The code from attempt-001 is actually correct. It just needs to be:

1. Reverted from `infra/` (human action)
2. Copied to `attempt-002/infra/scripts/` (next attempt setup)
3. Modified to output to `attempt-002/evidence/` instead of `public/`

The implementation logic (FR-1 through FR-6) does not need to be rewritten.

---

## Summary

| Do | Don't |
|----|-------|
| Write to `attempt-NNN/` | Write to `infra/` |
| Write evidence to `attempt-NNN/evidence/` | Write to `public/` |
| Document proposed changes | Make changes outside sandbox |
| Test with local compiler copy | Replace production compiler |
| Mark attempt CLOSED when done | Claim Champion status |

---

**The attempt folder is your world. Everything else is someone else's.**
