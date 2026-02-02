# Odd-Teaser — Version History

> Evolution record for the Odd-Teaser PRD.

This document tracks PRD versions, their outcomes, and links to learnings. The lane-root `PRD.md` is the **active, mutable** document. Frozen snapshots live in `attempts/prd-v{VERSION}/PRD.md` when created.

---

## PRD Versions

| Version | Status | Attempts | Key Learning |
|---------|--------|----------|--------------|
| **v1.1** | **ACTIVE** | [6593bb53](attempts/prd-v1.1/_runs/6593bb53/) (CLOSED) | Manual categorization UX is hostile; must use LLM-based artifact detection |
| v1.0 | SUPERSEDED | (graduated from Epoch 4 PoC) | Entry-state must be thinking-first, not artifact editor |

---

## Version Evolution

### v1.1 — Entry-State Posture Correction

**Status:** ACTIVE

**Changes from v1.0:**
- Conversational thinking precedes artifact commitment
- Artifact creation is emergent and consent-based
- Entry-state pressure explicitly removed

**Key Decision:** odd-teaser MUST use LLM-based artifact detection (odd-scribe style) to watch user journaling and surface potential learnings/decisions for user confirmation.

### v1.0 — Initial Lane Instantiation

**Status:** SUPERSEDED by v1.1

**Origin:** Graduated from Epoch 4 guiding artifact (`klappy://docs/guiding-artifacts/epoch-4/klappy-dev-poc-prd`)

**Core Philosophy Established:**
- Single-session epistemic experience
- Klappy.dev must always be easier to leave than to continue
- Product succeeds even if user never returns

---

## Learnings by Version

### v1.1 Learnings

- [Run 6593bb53 LEARNINGS.md](attempts/prd-v1.1/_runs/6593bb53/LEARNINGS.md)
- [Run 6593bb53 EVIDENCE.md](attempts/prd-v1.1/_runs/6593bb53/EVIDENCE.md)

**What we learned:**

1. **Manual categorization UX is hostile** — If users must click buttons to categorize their own writing, they abandon the system. odd-teaser should detect artifact scents automatically like odd-scribe.

2. **Ritual complexity is severe** — The attempt workflow requires so many manual steps that even with AI assistance and clear documentation, attempts fail due to process overhead, not implementation quality.

3. **Scribe needs lane-awareness** — Global odd/ledger/ namespace was polluted with lane-specific learnings.

4. **Entry-state must communicate safety** — "Nothing is committed until you say so" is the critical message.

---

## Key Decisions

| ID | Decision | Status |
|----|----------|--------|
| dec-20260131-0001 | odd-teaser MUST use LLM-based artifact detection | ACCEPTED |

---

## Version Transition Rules

1. **PRD mutations** happen in lane-root `PRD.md` only
2. **Frozen snapshots** are created in attempt folders at kickoff (when needed)
3. **Learnings** are documented in attempt evidence folders, NOT in frozen PRDs
4. **New versions** increment when requirements change significantly
5. **Closing a version** = marking status as SUPERSEDED in this file

---

## See Also

- [PRD.md](PRD.md) — Current active PRD
- [README.md](README.md) — Lane overview
- [KICKOFF.md](KICKOFF.md) — How to start an attempt
- [LEDGER.md](LEDGER.md) — Product-level decisions and locks
- [behavior.md](behavior.md) — LLM behavior enforcement
