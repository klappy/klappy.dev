# Attempt 002 — v1.4.0 Tiered Context Construction

- **Date Started**: 2026-01-22
- **PRD**: v1.4.0
- **Status**: FAILED

---

## Objective

Execute PRD v1.4.0 with corrected INSTRUCTIONS.md that includes Tier 0 → excluded rule.

---

## Corrections from Attempt 001

- Added Tier 0 → excluded (scope exclusion; never included in default context)
- Locked terminology: high|medium|low
- Added: "Navigation documents remain Tier 3 unless YAML tier says otherwise"
- Agent stops at CLOSED; does NOT update latest/ or claim Champion

---

## Checklist

- [x] INSTRUCTIONS.md includes Tier 0 exclusion
- [x] compile-plan.json updated to point to attempt-002
- [x] Compile succeeds
- [x] Evidence collected
- [x] Do NOT update latest/ (human decision)

---

## Evidence

| File | Description |
|------|-------------|
| `evidence/compile-output.txt` | Compile log showing success |
| `evidence/prd-guide-pack.md` | Copy of compiled pack |
| `evidence/tier-verification.md` | Verification of Tier 0 exclusion |

---

## Self-Audit

### Intended Outcome
Add Tier 0 → excluded to INSTRUCTIONS.md, compile pack, deploy to preview.

### Constraints Applied
- Lane isolation: all changes within agent-skill lane
- Ephemeral artifacts: INSTRUCTIONS.md generated per-attempt
- Evidence over assertion: HTTP 200 verified, diffs provided
- Agent does NOT update latest/ or claim Champion

### Decision Rules Followed
- KISS: Fixed tier-to-detail mapping, no smart exceptions
- Explicit tradeoffs: Non-goals clearly documented
- Prefer one-shot builds: Clean attempt-002, not steering attempt-001

### Verification Performed
- Compiled pack with `npm run lane:compile`
- Verified Tier 0 → excluded present in compiled output
- Verified HTTP 200 on preview URL
- Verified latest/ points to v1.3.1 (not v1.4)

### Evidence Produced
- evidence/compile-output.txt
- evidence/prd-guide-pack.md
- evidence/tier-verification.md
- evidence/http-verification.md

### Confidence Level
High (0.85) — Work is complete and verified. Human review required for promotion.

---

## Failure Analysis

**Discovery during audit**: The PRD v1.4.0 objective is "Tiered Context Construction" — teaching agents to apply tier-weighted projection. However:

1. **Compiler violation**: `compile-pack.js` is a hardcoded concatenator with no tier logic
2. **Tier 0 included**: `odd/README.md` (Tier 0) is in the pack — should be excluded
3. **No projection**: All files concatenated at full detail regardless of tier
4. **Doctrine vs reality gap**: INSTRUCTIONS.md documents behavior that doesn't exist in code

The attempt documented tier rules but the infrastructure doesn't enforce them. This is not a documentation success — it's an incomplete implementation.

**Root cause**: PRD scope mismatch. "Tiered Context Construction" requires compiler changes, not just INSTRUCTIONS.md changes.

---

## Seal

This attempt is FAILED.

The INSTRUCTIONS.md content is sound but the compiler doesn't implement it.
No artifacts from this attempt should be promoted.
Next attempt must address compiler infrastructure, not documentation.
