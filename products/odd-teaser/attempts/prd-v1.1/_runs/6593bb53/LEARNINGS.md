# Learnings — Run 6593bb53

These learnings are duplicated from the product LEDGER to ensure they survive import even if this attempt is not promoted as champion.

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
