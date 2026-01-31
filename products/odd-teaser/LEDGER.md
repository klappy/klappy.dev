# Odd Teaser — Product Ledger

This ledger is **append-only**.

It records product-level decisions, scope locks, and retirements.

---

## 2026-01-31 — Lane Created

- Lane instantiated to graduate Epoch 4 guiding artifact
- Supersedes website and ai-navigation lanes
- Core constraint locked: system must be easier to leave than to continue

---

## 2026-01-31 — PRD v1.1 Attempt Learnings

### learn-20260131-0001: Manual categorization UX is hostile

- **Trigger:** friction
- **Summary:** odd-teaser v1.1 implemented as dumb manual categorization form - completely missed the point of LLM-based artifact detection
- **Impact:** If users must click buttons to categorize their own writing, they will abandon the system. odd-teaser should detect artifact scents automatically like odd-scribe.
- **Evidence:** User quote: "If I had to click buttons and decide myself what I just wrote was wholesale categorized as learning, decision, or override, I'd delete the system"
- **Escalation:** candidate-canon-amendment to odd-teaser PRD

### learn-20260131-0002: Ritual-dependent workflows fail

- **Trigger:** drift_signal
- **Summary:** Attempt left OPEN after deployment proves ritual-dependent workflows will fail
- **Impact:** Manual completion steps are forgotten under real conditions. META.json showing status: OPEN after deployment is direct evidence.
- **Evidence:** META.json with status: OPEN, completed_at: null despite deployment being complete
- **Escalation:** candidate-constraint

---

## 2026-01-31 — Decision: LLM-based artifact detection required

### dec-20260131-0001: odd-teaser must use LLM-based artifact detection

- **Status:** accepted
- **Decision:** odd-teaser MUST use LLM-based artifact detection (odd-scribe style) to watch user journaling and surface potential learnings/decisions for user confirmation
- **Context:** v1.1 was implemented as a manual categorization form. User explicitly stated they would delete such a system.
- **Options rejected:** Manual categorization UI (hostile UX, defeats purpose)
- **Rationale:** odd-scribe demonstrates the correct pattern; use-only-what-hurts means reduce friction not add it
- **Consequences:** odd-teaser must be reimplemented with LLM detection
- **Links:** klappy://canon/agents/odd-scribe, klappy://canon/odd/constraint/use-only-what-hurts
