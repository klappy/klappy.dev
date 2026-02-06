# Fluent Mobile — Version History

> Evolution record for the Fluent Mobile PRD.

This document tracks PRD versions, their outcomes, and links to learnings. The lane-root `PRD.md` is the **active, mutable** document. Frozen snapshots live in `attempts/v{VERSION}/PRD.md`.

---

## PRD Versions

| Version | Status | Frozen Snapshot | Attempts | Key Learning |
|---------|--------|-----------------|----------|--------------|
| **v0.3** | **ACTIVE** | [PRD](attempts/v0.3/PRD.md) | [001](attempts/v0.3/attempt-001/) (FAILED) | Verification requires real evidence, not simulated data |
| v0.2 | CLOSED | [PRD](attempts/v0.2/PRD.md) | [001](attempts/v0.2/attempt-001/) (SUCCESS) | Dual-section UI confused mental model |
| v0.1 | CLOSED | [PRD](attempts/v0.1/PRD.md) | [001](attempts/v0.1/attempt-001/) (SUCCESS) | Core audio capture viable on mobile |

---

## Learnings by Version

### v0.3 Learnings

- [Attempt 001 Evidence](attempts/v0.3/attempt-001/evidence/) — FAILED: Agent presented fake waveform data as evidence

**What we learned:**
- Agents default to epistemic deception under completion pressure
- Random number generators producing "waveforms" is not audio playback
- Verification requires observed behavior, not simulated screenshots
- This failure led to the [Verification & Evidence](/canon/constraints/verification-and-evidence.md) canon principle

### v0.2 Learnings

- [Attempt 001 Learnings](attempts/v0.2/attempt-001/evidence/LEARNINGS.md)
- [Review Meeting Notes](attempts/v0.2/attempt-001/evidence/meeting-notes-2026-01-23.md)

**What we learned:**
- Dual draft/review sections broke mental model ("same audio in two places")
- Play without pause loses position on longer verses
- Waveform should show live activity AND timeline for seeking
- Lane-level infrastructure prevents rebuilding config each attempt

### v0.1 Learnings

- [Attempt 001 Learnings](attempts/v0.1/attempt-001/evidence/LEARNINGS.md)
- [Field Feedback](attempts/v0.1/attempt-001/evidence/field-feedback.md)

**What we learned:**
- Mobile audio capture is viable
- PWA approach works for offline tolerance
- Need to validate on real low-tier Android devices
- UI/UX needs iteration (led to v0.2)

---

## Version Transition Rules

1. **PRD mutations** happen in lane-root `PRD.md` only
2. **Frozen snapshots** are copied to `attempts/v{VERSION}/PRD.md` at attempt kickoff
3. **Learnings** are documented in attempt evidence folders, NOT in frozen PRDs
4. **New versions** increment when requirements change significantly
5. **Closing a version** = marking status as CLOSED in this file

---

## See Also

- [PRD.md](PRD.md) — Current active PRD
- [README.md](README.md) — Lane overview
- [KICKOFF.md](KICKOFF.md) — How to start an attempt
