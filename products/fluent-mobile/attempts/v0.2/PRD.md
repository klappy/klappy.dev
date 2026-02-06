# PRD: Fluent Mobile (PoC)

> **This PRD version is CLOSED.** See [v0.3 requirements](../../PRD.md) for what comes next.
> 
> **Key learnings from v0.2:**
> - Consolidate draft/review into single section
> - Waveform needs dual modes (live vs. timeline)
> - Infrastructure should live at lane level

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v0.2             |
| **Lane**        | fluent-mobile    |
| **Status**      | CLOSED (superseded by v0.3) |
| **Created**     | 2026-01-23       |
| **Updated**     | 2026-01-23       |
| **Author**      | Chris Klapp      |
| **Stage**       | Proof of Concept / Exploration |
| **Confidence**  | Intentionally low (learning-focused) |
| **Prior Version** | [v0.1](../v0.1/PRD.md) |

---

## What Changed from v0.1

Based on Attempt 001 learnings:

| Change | Reason |
|--------|--------|
| **Cloudflare Pages deployment required** | Cannot test mobile without public URL |
| **Waveform visualization required** | Agent cannot verify audio without visual proxy |
| **Multi-screen navigation added** | Single page insufficient for workflow testing |
| **Hardware requirements specified** | Need low-end Android for H2 testing |
| **Browser autoplay policy documented** | Automated audio testing has limits |

See [Attempt 001 Learnings](../v0.1/attempt-001/evidence/LEARNINGS.md) for details.

---

## Alignment Lock

**What this PoC exists to resolve:**

Whether a mobile-first OBT companion app is a realistic, culturally viable, and performant solution to real field problems — not just a convincing idea in our heads.

This is not a feature test. This is a shared mental model test.

---

## Problem Statement

Field teams engaged in Oral Bible Translation (OBT) face real constraints that make laptop-based workflows impractical or unsafe (e.g., power availability, security risk, cultural visibility).

While a mobile-first approach appears promising, we do not yet know whether:

- A mobile app can realistically support OBT drafting workflows
- The performance and usability on real devices is acceptable long-term
- Our internal vision aligns with real-world field experience

Without a strong PoC tested in real contexts, the team risks building toward divergent mental models, leading to misalignment and costly rework.

---

## Objective

Test whether a mobile-first OBT companion app is viable, usable, and culturally appropriate through field-tested learning — not feature delivery.

---

## Hypotheses (What This PoC Tries to Prove)

| # | Hypothesis | Description | v0.2 Status |
|---|------------|-------------|-------------|
| 1 | Mobile Viability | Translators can realistically draft and review OBT audio using a mobile companion app | Active |
| 2 | Performance | App performance on real, low-to-mid-tier Android devices is sufficient to sustain usage without frustration | Active (requires hardware) |
| 3 | Workflow Usability | Audio-centric workflows (listen → record → review → comment) feel natural and non-patronizing | Active (requires multi-screen) |
| 4 | Task Clarity | Users can understand what to do next with minimal or no training | Active (requires real users) |
| 5 | Authentication & Trust | QR-based identity/assignment handoff is understandable and trustworthy in real contexts | Deferred |
| 6 | Cultural Fit | The approach works across diverse regions and team dynamics, not just in a single cultural context | Deferred |

### Hypothesis Testing Requirements (NEW in v0.2)

| Hypothesis | Required for Testing |
|------------|---------------------|
| H2 (Performance) | Low-end Android device ($50-100 range), public deployment |
| H3 (Workflow) | Multi-screen navigation, at least 2 screens |
| H4 (Clarity) | Real users OR comprehensive UI with waveform feedback |

---

## Primary Risks (Ordered)

1. **Performance as a foundational feature**
   If it feels slow, clunky, or fragile on real phones → it fails, regardless of features.

2. **Audio workflow usability**
   Recording, playback, review must feel natural, not "techy."

3. **UX tone**
   Avoids being patronizing without being confusing.

4. **Task clarity**
   Users know what to do next without training.

5. **Authentication & sync trust**
   QR → identity → offline → sync must feel reliable.

6. **Cultural fit across regions**
   Especially for group-based, oral-first workflows.

---

## Non-Goals (Explicitly Out of Scope)

This PoC will NOT attempt to:

| Non-Goal | Rationale |
|----------|-----------|
| Deliver a production-ready mobile app | This is exploration, not delivery |
| Fully solve offline-first architecture | Speed of learning > architectural purity |
| Implement full org-specific workflows | Must remain adaptable |
| Provide studio-quality audio tooling | Basic is sufficient for PoC |
| Replace or compete with Paratext | Different purpose entirely |
| Solve all checking stages end-to-end | Out of scope for PoC |
| Guarantee long-term data durability | Learning phase only |

**Anything suggesting permanence is a failure of scope discipline.**

---

## Target Users

### Primary

- OBT translators
- Low literacy
- Low tech familiarity
- Audio-first workflows
- Intermittent connectivity

### Secondary

- Project managers (web-based)
- Facilitators assisting mobile users

---

## Core PoC Capabilities (v0.2)

These are enabling capabilities, not features to polish.

### 5.1 Audio-Centric Drafting (UPDATED)

| Capability | Required | Evidence Method |
|------------|----------|-----------------|
| Listen to source audio | Yes | Waveform visualization |
| Record draft audio | Yes | Waveform visualization |
| Playback recorded audio | Yes | Waveform visualization |
| Visual audio feedback | **NEW** | Screenshots show waveform activity |

**Why waveform visualization:**
- Agents can verify audio functionality via screenshots
- Users get visual confirmation "something is happening"
- Addresses browser autoplay policy limitation for automated testing

### 5.2 Multi-Screen Navigation (NEW)

| Capability | Required | Purpose |
|------------|----------|---------|
| At least 2 screens | Yes | Test H3 (workflow) properly |
| Clear navigation between screens | Yes | Test H4 (task clarity) |
| Back navigation | Yes | Test error recovery |

**Minimum screens for v0.2:**
1. **Home/Assignment** — Shows current task context
2. **Drafting** — Listen → Record → Review flow

### 5.3 Offline Tolerance (Not Full Offline-First)

- App must tolerate temporary offline use
- Sync occurs when connectivity returns
- Conflicts handled minimally (logging > resolution)

> ⚠️ Trade-off: Speed of learning > architectural purity.

### 5.4 Project & Assignment Access (DEFERRED)

- QR-based identity deferred to later hypothesis testing
- For v0.2, use mock/hardcoded assignment context

---

## Deployment Requirements (NEW in v0.2)

### Required: Cloudflare Pages

| Requirement | Reason |
|-------------|--------|
| Static site hosting | PWA is static assets |
| Preview URLs per commit | Test iterations on real mobile |
| Global CDN | Performance for low-connectivity regions |
| CI/CD integration | Automated deployment |

### NOT Allowed

| Anti-pattern | Why |
|--------------|-----|
| Python dev server | Cannot test on mobile devices |
| Localhost-only testing | Not representative of real use |
| Manual deployment | Slows iteration cycle |

### Deployment Evidence Required

- [ ] Cloudflare Pages project created
- [ ] Preview URL accessible on mobile device
- [ ] Service Worker caching verified

---

## Agent Verification Requirements (NEW in v0.2)

### What Agents CAN Verify

| Verification | Method |
|--------------|--------|
| UI renders correctly | Playwright screenshots |
| Buttons exist and are clickable | Accessibility snapshots |
| State changes occur | DOM inspection |
| Waveform shows activity | Screenshot comparison |
| No JavaScript errors | Console log inspection |
| Service Worker registers | Console log inspection |

### What Agents CANNOT Verify

| Verification | Limitation | Mitigation |
|--------------|------------|------------|
| Audio actually plays | Browser autoplay policy | Waveform visualization |
| Recording captures audio | Requires microphone | Waveform visualization |
| Audio quality | Requires human ears | Defer to field testing |
| User comprehension | Requires human users | Defer to field testing |

### Browser Autoplay Policy

Modern browsers block `AudioContext` until user gesture. This means:
- Automated tests cannot fully verify audio playback
- Waveform visualization provides visual proxy
- Real user testing still required for full verification

---

## Hardware Requirements (NEW in v0.2)

### For H2 (Performance) Testing

| Device Tier | Specs | Priority | Example |
|-------------|-------|----------|---------|
| Low | $50-100, 2-3GB RAM, older chipset | **HIGH** | Entry-level Android |
| Mid | $150-250, 4GB RAM, recent chipset | Medium | Mid-range Samsung |
| High | Flagship | Low | Not target users |

### Minimum Testing Matrix

- [ ] At least 1 low-tier Android device
- [ ] Test on actual mobile browser (not desktop emulation)
- [ ] Test with real network conditions (not always WiFi)

---

## UX Principles (Non-Functional Requirements)

These are pass/fail criteria:

- Performance is treated as a foundational feature
- "Happy path" is the easiest path
- UI avoids being:
  - Patronizing
  - Over-scripted
  - Toy-like
- Users are treated as capable adults
- Guidance exists without rigid enforcement
- **NEW:** Waveform provides non-verbal feedback

**Failure here invalidates the PoC regardless of feature completeness.**

---

## Success Criteria

### Minimum Success (v0.2)

- [ ] Deployed to Cloudflare Pages with working preview URL
- [ ] Waveform visualization shows audio activity
- [ ] Multi-screen navigation works
- [ ] Agent can verify UI functionality via screenshots
- [ ] At least one hypothesis advanced (not necessarily fully validated)

### Aspirational Success

- [ ] H2 (Performance) tested on low-end Android
- [ ] H3 (Workflow) validated across 2+ screens
- [ ] H4 (Clarity) validated with real user feedback
- [ ] Path to field testing is clear

---

## Definition of Done (v0.2 PoC Attempt)

An attempt is complete when:

- [ ] Deployed to Cloudflare Pages
- [ ] Preview URL tested on real mobile device
- [ ] Waveform visualization captured in screenshots
- [ ] Multi-screen navigation works
- [ ] Agent verification tests pass (Playwright)
- [ ] Learnings documented regardless of outcome

### Evidence Required

| Type | Format | Purpose |
|------|--------|---------|
| Deployment | Cloudflare preview URL | Proves mobile-testable |
| Screenshots | PNG with waveform visible | Proves audio feedback |
| Test results | JSON/Markdown | Proves automated verification |
| User feedback | Markdown notes | Proves real-world validity |

---

## Exit Criteria

This PoC should be easy to abandon.

If learning slows, confidence drops, or it begins to resemble a production commitment → stop.

---

## Key Risks & Open Questions

| Risk/Question | Status | v0.1 Learning |
|---------------|--------|---------------|
| Is mobile performance acceptable on real devices? | Unknown | Need real hardware to test |
| Does QR-based identity scale socially and culturally? | Unknown | Deferred |
| Where does "guided" become "patronizing"? | Unknown | Need user feedback |
| How much offline support is "enough" for trust? | Unknown | — |
| Do users prefer fewer options or more flexibility? | Unknown | — |
| Are assumptions consistent across regions? | Unknown | Deferred |
| Can agents verify audio without hearing it? | **ANSWERED** | Waveform visualization |
| Can we test mobile without deployment? | **ANSWERED** | No, need Cloudflare |

---

## Non-Negotiable Guardrails

This PoC must:

- 🚫 Not imply production readiness
- 🚫 Not block or slow web app progress
- 🚫 Not encode org-specific workflows
- 🚫 Not imply Paratext replacement
- ✅ Be quick to test, easy to discard, fast to iterate
- ✅ **NEW:** Deploy to Cloudflare (not localhost)
- ✅ **NEW:** Include waveform visualization

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- Learning over delivery
- Minimal viable scope
- Progressive disclosure of complexity
- **NEW:** Agent-verifiable where possible

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED
- **Failure with fast learning is a win**

Attempts live at: `attempt-NNN/` (relative to this PRD)

---

## Technical Stack (v0.2)

| Layer | Technology | Reason |
|-------|------------|--------|
| Runtime | Browser (PWA) | Cross-platform, no app store |
| Framework | Vanilla JS or minimal (Preact) | Performance on low-end devices |
| Audio | Web Audio API | Native browser support |
| Visualization | Canvas-based waveform | Agent-verifiable audio |
| Storage | IndexedDB | Offline tolerance |
| Offline | Service Worker | Cache-first for assets |
| Deployment | Cloudflare Pages | Preview URLs, global CDN |
| Testing | Playwright | Automated visual verification |

---

## Meta

This PRD:

- ✔️ Is deliberately incomplete
- ✔️ Prioritizes learning over delivery
- ✔️ Protects against premature commitment
- ✔️ Is usable by an agent or a human
- ✔️ **NEW:** Incorporates learnings from v0.1 attempt

---

## Related Documents

- Lane README: `../../README.md`
- Lane KICKOFF: `../../KICKOFF.md`
- Lane INSTRUCTIONS: `../../INSTRUCTIONS.md`
- Prior PRD: `../v0.1/PRD.md`
- Attempt 001 Learnings: `../v0.1/attempt-001/evidence/LEARNINGS.md`
- Lane architecture: `/docs/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints/README.md`
- Definition of Done: `/canon/constraints/definition-of-done.md`
