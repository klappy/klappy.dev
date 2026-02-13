# PRD: Fluent Mobile (PoC) — v0.1

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v0.1             |
| **Lane**        | fluent-mobile    |
| **Status**      | CLOSED |
| **Created**     | 2026-01-23       |
| **Closed**      | 2026-01-23       |
| **Author**      | Chris Klapp      |
| **Stage**       | Proof of Concept / Exploration |
| **Confidence**  | Intentionally low (learning-focused) |
| **Superseded By** | [v0.2](../v0.2/PRD.md) |

---

## Attempts Against This PRD

| Attempt | Status | Outcome | Key Learning |
|---------|--------|---------|--------------|
| [001](attempt-001/) | CLOSED | SUCCESS | Python server wrong; need Cloudflare, waveform viz, multi-screen |

---

## Why This Version Closed

Attempt 001 revealed critical gaps that require PRD revision:

1. **Deployment**: Python localhost cannot test on mobile devices
2. **Agent Verification**: Cannot verify audio without visual feedback
3. **Scope**: Single page insufficient to test workflow hypotheses
4. **Hardware**: No specification of required test devices

See [Attempt 001 Learnings](attempt-001/evidence/LEARNINGS.md) for details.

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

| # | Hypothesis | Description |
|---|------------|-------------|
| 1 | Mobile Viability | Translators can realistically draft and review OBT audio using a mobile companion app |
| 2 | Performance | App performance on real, low-to-mid-tier Android devices is sufficient to sustain usage without frustration |
| 3 | Workflow Usability | Audio-centric workflows (listen → record → review → comment) feel natural and non-patronizing |
| 4 | Task Clarity | Users can understand what to do next with minimal or no training |
| 5 | Authentication & Trust | QR-based identity/assignment handoff is understandable and trustworthy in real contexts |
| 6 | Cultural Fit | The approach works across diverse regions and team dynamics, not just in a single cultural context |

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

## Core PoC Capabilities (Minimal but Sufficient)

These are enabling capabilities, not features to polish.

### 5.1 Project & Assignment Access

- Projects created on the web
- Mobile app acts as a companion
- Users receive assignments via QR code
- QR code establishes identity + assignment context

> ⚠️ Assumption: QR is adaptable even if it proves imperfect.

### 5.2 Audio-Centric Drafting

- Listen to source audio/text
- Record draft audio
- Playback recorded audio
- Make basic comments (audio/text)

No studio tooling. No advanced editing.

### 5.3 Resources (Minimal)

- View/listen to a limited set of resources
- Resource selection controlled upstream (web/org)

No deep AI integration required for PoC.

### 5.4 Offline Tolerance (Not Full Offline-First)

- App must tolerate temporary offline use
- Sync occurs when connectivity returns
- Conflicts handled minimally (logging > resolution)

> ⚠️ Trade-off: Speed of learning > architectural purity.

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

**Failure here invalidates the PoC regardless of feature completeness.**

---

## Success Criteria

### Minimum Success

- [ ] Clear understanding of why the PoC failed or struggled
- [ ] Field feedback that directly informs next iteration

### Aspirational Success

- [ ] Two teams complete at least one chapter draft on mobile
- [ ] Users express willingness to use it again

---

## Definition of Done (PoC)

The PoC is complete when:

- [ ] It has been tested with real users in field contexts
- [ ] Feedback is collected and documented
- [ ] Assumptions are validated or invalidated
- [ ] The team can confidently decide: Continue, Pivot, Pause, or Stop

---

## Exit Criteria

This PoC should be easy to abandon.

If learning slows, confidence drops, or it begins to resemble a production commitment → stop.

---

## Key Risks & Open Questions

| Risk/Question | Status |
|---------------|--------|
| Is mobile performance acceptable on real devices? | Unknown |
| Does QR-based identity scale socially and culturally? | Unknown |
| Where does "guided" become "patronizing"? | Unknown |
| How much offline support is "enough" for trust? | Unknown |
| Do users prefer fewer options or more flexibility? | Unknown |
| Are assumptions consistent across regions? | Unknown |

These are expected unknowns, not gaps.

---

## Non-Negotiable Guardrails

This PoC must:

- 🚫 Not imply production readiness
- 🚫 Not block or slow web app progress
- 🚫 Not encode org-specific workflows
- 🚫 Not imply Paratext replacement
- ✅ Be quick to test, easy to discard, fast to iterate

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- Learning over delivery
- Minimal viable scope
- Progressive disclosure of complexity

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED
- **Failure with fast learning is a win**

Attempts live at: `attempt-NNN/` (relative to this PRD)

---

## Meta

This PRD:

- ✔️ Is deliberately incomplete
- ✔️ Prioritizes learning over delivery
- ✔️ Protects against premature commitment
- ✔️ Is usable by an agent or a human
