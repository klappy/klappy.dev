# PRD: Fluent Mobile (PoC) — v0.3

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v0.3             |
| **Lane**        | fluent-mobile    |
| **Status**      | ACTIVE           |
| **Created**     | 2026-01-23       |
| **Author**      | Chris Klapp      |
| **Stage**       | Proof of Concept / Exploration |
| **Confidence**  | Intentionally low (learning-focused) |
| **Prior Version** | [v0.2](../v0.2/PRD.md) |

---

## What Changed from v0.2

Based on v0.2 Attempt 001 learnings and review meeting:

| Change | Reason |
|--------|--------|
| **Single Draft Section** | Dual draft/review broke mental model — "same audio in two places" |
| **Waveform Dual-Mode** | Live activity vs. timeline for seeking — common pattern (YouTube seek bar) |
| **Play/Pause Required** | Can't pause without losing position — critical for longer verses |
| **Lane-Level Infrastructure** | Stop rebuilding wrangler/playwright config each attempt |
| **Fresh Build Approach** | Not in love with v0.2 UI/UX yet — test new mental model cleanly |

See [v0.2 Attempt 001 Learnings](../v0.2/attempt-001/evidence/LEARNINGS.md) for full details.

---

## Alignment Lock

**What this PoC exists to resolve:**

Whether a mobile-first OBT companion app is a realistic, culturally viable, and performant solution to real field problems — not just a convincing idea in our heads.

This is not a feature test. This is a shared mental model test.

---

## Problem Statement

Field teams engaged in Oral Bible Translation (OBT) face real constraints that make laptop-based workflows impractical or unsafe (e.g., power availability, security risk, cultural visibility).

We are testing whether:

- A mobile app can realistically support OBT drafting workflows
- The performance and usability on real devices is acceptable long-term
- The consolidated single-section UI improves mental model clarity

---

## Objective

Test whether a consolidated single-section drafting UI with dual-mode waveform improves workflow usability and task clarity over the v0.2 dual-section approach.

---

## Hypotheses (What This PoC Tries to Prove)

| # | Hypothesis | Description | v0.3 Focus |
|---|------------|-------------|------------|
| 1 | Mobile Viability | Translators can realistically draft and review OBT audio using a mobile companion app | Umbrella |
| 2 | Performance | App performance on real, low-to-mid-tier Android devices is sufficient | Deferred (need hardware) |
| 3 | Workflow Usability | Audio-centric workflows feel natural with consolidated UI | **PRIMARY** |
| 4 | Task Clarity | Users can understand what to do next with play/pause and timeline | **PRIMARY** |
| 5 | Authentication & Trust | QR-based identity handoff is trustworthy | Deferred |
| 6 | Cultural Fit | Approach works across diverse regions | Deferred |

### v0.3 Focus: H3 and H4

- **H3 (Workflow Usability)**: Does single-section UI feel more natural than dual-section?
- **H4 (Task Clarity)**: Do play/pause and timeline mode clarify what to do next?

---

## v0.3 Requirements

### Must Address

1. **Single Draft Section**
   - Consolidate recording + playback into one section
   - One audio, one waveform, one source of truth
   - Eliminates "same audio in two places" confusion

2. **Waveform Dual-Mode**
   - **Live mode**: Animated during recording/playback (confirms "it's working")
   - **Timeline mode**: Static when stopped, shows duration/amplitude
   - Fixed-size regardless of duration
   - Like YouTube seek bar

3. **Play/Pause Functionality**
   - Add pause button that preserves position
   - Pause triggers timeline mode on waveform
   - Critical for longer verses

4. **Lane-Level Infrastructure**
   - `products/fluent-mobile/infra/` folder for reusable config
   - Attempt copies and extends if needed
   - Pattern: Don't rebuild CI/CD each attempt

### Should Address

1. **Reduce Scrolling**
   - Balance large touch targets with screen efficiency
   - "Most phones can squish more"
   - Full workflow visible without scrolling if possible

2. **Record Continue vs. Overwrite**
   - Differentiate "continue recording" from "start new"
   - Current v0.2 overwrites without warning

### Not Addressing (Future)

- Timestamped comments (waveform-as-timeline enables this later)
- User literacy spectrum flows (text accordion)
- AI features (may be web-only)
- Editing primitives (cut/insert/trim)

---

## Core PoC Capabilities (v0.3)

### Audio-Centric Drafting

| Capability | Required | v0.3 Change |
|------------|----------|-------------|
| Listen to source audio | Yes | Unchanged |
| Record draft audio | Yes | Single section |
| Playback recorded audio | Yes | Single section with pause |
| Waveform visualization | Yes | Dual-mode (live/timeline) |

### Multi-Screen Navigation

| Capability | Required | Purpose |
|------------|----------|---------|
| Home screen | Yes | Shows assignment context |
| Drafting screen | Yes | Single-section Listen → Record → Play flow |
| Back navigation | Yes | Error recovery |

### Offline Tolerance

- App must tolerate temporary offline use
- Service Worker for asset caching
- Sync deferred (not in v0.3 scope)

---

## Technical Stack (v0.3)

| Layer | Technology | Reason |
|-------|------------|--------|
| Runtime | Browser (PWA) | Cross-platform, no app store |
| Framework | **Vanilla JS** | Fresh build, no framework overhead |
| Audio | Web Audio API + MediaRecorder | Native browser support |
| Visualization | Canvas-based waveform | Agent-verifiable, dual-mode |
| Storage | IndexedDB | Offline tolerance |
| Offline | Service Worker | Cache-first for assets |
| Deployment | Cloudflare Pages | Preview URLs, global CDN |
| Testing | Playwright | Automated visual verification |

---

## Success Criteria

### Minimum Success (v0.3)

- [ ] Single-section drafting UI implemented
- [ ] Waveform dual-mode working (live vs. timeline)
- [ ] Play/pause preserves position
- [ ] Agent can verify via screenshots and Playwright
- [ ] Learnings documented

### Aspirational Success

- [ ] Reduced scrolling achieved
- [ ] Continue/overwrite differentiated
- [ ] Clear improvement over v0.2 mental model
- [ ] Ready for field feedback

---

## Definition of Done (v0.3 PoC Attempt)

An attempt is complete when:

- [ ] Single-section UI verified in screenshots
- [ ] Waveform shows both modes (live and timeline)
- [ ] Play/pause functionality works
- [ ] Playwright tests pass
- [ ] Learnings documented regardless of outcome

### Evidence Required

| Type | Format | Purpose |
|------|--------|---------|
| Screenshots | PNG showing single-section UI | Proves consolidated layout |
| Screenshots | PNG showing waveform modes | Proves dual-mode |
| Test results | JSON/Markdown | Proves automated verification |
| Learnings | Markdown | Documents what worked/didn't |

---

## Non-Negotiable Guardrails

This PoC must:

- 🚫 Not imply production readiness
- 🚫 Not block or slow web app progress
- 🚫 Not encode org-specific workflows
- 🚫 Not carry forward v0.2 assumptions blindly
- ✅ Be quick to test, easy to discard, fast to iterate
- ✅ Build fresh to test new mental model cleanly
- ✅ Include waveform dual-mode visualization

---

## Exit Criteria

This PoC should be easy to abandon.

If learning slows, confidence drops, or it begins to resemble a production commitment → stop.

**Stopping is not failure. Continuing past useful learning is.**

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED
- **Failure with fast learning is a win**

Attempts live at: `attempt-NNN/` (relative to this PRD)

---

## Related Documents

- [v0.2 PRD](../v0.2/PRD.md)
- [v0.2 Learnings](../v0.2/attempt-001/evidence/LEARNINGS.md)
- Lane KICKOFF: `../../KICKOFF.md`
- Lane INSTRUCTIONS: `../../INSTRUCTIONS.md`
- Canon constraints: `/canon/constraints/README.md`
- Definition of Done: `/canon/constraints/definition-of-done.md`
