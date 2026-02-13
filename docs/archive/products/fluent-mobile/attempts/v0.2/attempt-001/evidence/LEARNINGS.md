# Attempt 001 (v0.2) — Learnings

**Date:** 2026-01-23
**Status:** CLOSED — SUCCESS (with significant learnings)

---

## Executive Summary

Attempt 001 against PRD v0.2 successfully built and verified a minimal PWA with waveform visualization and two-screen navigation. The build phase completed with 17/17 automated tests passing. Critical UX and infrastructure learnings emerged that should inform PRD v0.3.

---

## Technical Accomplishments

### What We Built
- Two-screen PWA (Home → Drafting)
- Canvas-based waveform visualization (3 visualizers)
- Audio recording via MediaRecorder API
- Audio playback via Web Audio API
- Service Worker for offline tolerance
- Vanilla JS (no frameworks) for low-end device performance

### Verification
- 17/17 Playwright tests passing
- MCP browser visual verification
- 5 evidence screenshots captured

---

## UX Learnings

### Learning 1: Dual Draft/Review Sections Break Mental Model

**Observation:** Current UI has separate "Your Draft" (recording) and "Review" (playback) sections, each with its own waveform.

**Problem:** This is the same audio shown in two places. Users will be confused about:
- Why their recording appears twice
- Which one is "real"
- Where to look for their work

**Recommendation:** Consolidate into a single "Your Draft" section that handles both recording and playback. One audio, one waveform, one source of truth.

---

### Learning 2: Scrolling Creates Friction

**Observation:** Three audio sections stacked vertically requires scrolling on mobile.

**Problem:** Users can't see the full workflow at once. Scrolling during a recording session creates:
- Orientation loss
- Missed visual feedback
- Cognitive load

**Recommendation:** Explore horizontal layouts, tabs, or collapsible sections. The Listen → Record → Review flow should be visible without scrolling when possible.

---

### Learning 3: Waveform Has Dual Modes

**Observation:** Waveform visualization triggers thoughts about scrubbing, seeking, and timeline navigation.

**Insight:** The waveform serves two purposes:
1. **Live mode** — Shows activity during recording/playback (proves "something is happening")
2. **Timeline mode** — Shows duration, enables seeking, prepares for editing

**Recommendation:** Implement dual-mode waveform:
- **Recording/Playing:** Animated live visualization
- **Stopped/Paused:** Static timeline with seek capability

This sets up for future features (comments at timestamps, cut/insert/trim) without building them now.

---

### Learning 4: Play/Pause is Missing

**Observation:** Current UI only has Play (which toggles to Stop). No pause.

**Problem:** For longer audio, users need to pause without losing position.

**Recommendation:** Add pause functionality. When paused, waveform switches to timeline mode showing current position.

---

### Learning 5: Record Overwrite vs Append Unclear

**Observation (from meeting):** If you stop recording and click record again, it overwrites.

**Problem:** Users may want to:
- Pause and resume (append to existing recording)
- Start fresh (overwrite previous recording)

Current behavior doesn't differentiate.

**Recommendation:** Differentiate between "continue recording" and "start new recording".

---

### Learning 6: Avoid Multiple Draft Versions

**Observation (from meeting):** "Multiple drafts is a thing you don't want to do up front. We had this in Scribe and people got confused with it mostly."

**Problem:** Multiple versions create confusion about "which is the real one?" — especially for low-tech users.

**Recommendation:** One recording per stage. Keep it simple. Don't introduce version management yet.

---

### Learning 7: User Literacy Spectrum

**Observation (from meeting):** OBT translators vary widely — some can read (India example), some are completely illiterate.

**Problem:** Single UX approach may fail for different literacy levels.

**Recommendation:** Consider three user flows:
1. Source with text (for literate users)
2. Source with audio only (for illiterate users)
3. Text as accordion (hidden by default, expandable)

Audio is PRIMARY. Text is optional overlay.

---

### Learning 8: Waveform Has More Uses Than Anticipated

**Observation (from meeting):** Waveform serves multiple purposes:
1. **Recording confirmation** — "They didn't know if it was working"
2. **Volume feedback** — Too quiet? Too loud?
3. **Seeking/scrubbing** — "Seek quickly to different parts"
4. **Future comments** — Tap on waveform to add timestamped comment

**Recommendation:** Design waveform to support all these use cases eventually. Timeline mode is foundation for seeking and comments.

---

### Learning 9: AI Features May Be Web-Only

**Observation (from meeting):** "It might be that the AI features, we do not make them available on a phone."

**Examples mentioned:**
- Audio-to-text conversion
- AI evaluation/analysis
- Audio cleanup ("deleting the chickens")

**Recommendation:** Consider mobile as capture/review device, web as AI processing hub. Don't overload mobile with AI complexity.

---

## Infrastructure Learnings

### Learning 5: Infra Should Live at Lane Level

**Observation:** Wrangler config and CI/CD scripts were created in the attempt folder.

**Problem:** Each attempt rebuilds infrastructure from scratch. This is wasteful and error-prone.

**Recommendation:** Establish lane-level infrastructure pattern:

```
products/fluent-mobile/
├── infra/                    # Lane-level infrastructure
│   ├── wrangler.toml         # Cloudflare config (shared)
│   ├── playwright.config.js  # Test config (shared)
│   └── ci/                   # CI/CD scripts
└── attempts/
    └── prd-v0.X/
        └── attempt-NNN/
            └── infra/        # Attempt-specific overrides (copy-on-write)
```

**Pattern:**
1. Attempt copies lane infra
2. Attempt iterates on copied infra
3. If attempt succeeds, merge infra improvements back to lane
4. Next attempt starts from improved lane infra

---

### Learning 6: Cloudflare Deployment Requires Human Auth

**Observation:** Automated deployment blocked on authentication.

**This is expected for PoC** — not a problem to solve yet. Document for future.

---

## Hypothesis Status

### Umbrella Hypothesis (H1: Mobile Viability)

> Can translators realistically draft and review OBT audio using a mobile companion app?

**Status:** ADVANCING (not yet validated)

Sub-hypotheses contribute to H1:

| # | Hypothesis | Status | Evidence |
|---|------------|--------|----------|
| H2 | Performance | DEFERRED | No low-end Android available |
| H3 | Workflow Usability | PARTIAL | UI works but UX needs iteration |
| H4 | Task Clarity | PARTIAL | Single-page clarity validated; multi-screen needs work |

---

## What Went Well

1. **Visual waveform for audio verification** — Creative solution to agent-can't-hear-audio problem
2. **17/17 tests passing** — Solid automated verification
3. **Fast iteration** — Built and verified in single session
4. **UX feedback emerged** — Real learnings about dual-section confusion and scrolling

---

## What Could Improve

1. **Consolidate draft/review into single section** — One audio, one waveform
2. **Reduce scrolling** — Consider layout alternatives
3. **Dual-mode waveform** — Live vs. timeline
4. **Lane-level infra** — Don't rebuild each attempt
5. **Play/pause** — Not just play/stop

---

## PRD v0.3 Recommendations

### Must Address
1. **Single Draft Section** — Consolidate recording and playback into one
2. **Waveform Dual-Mode** — Live activity vs. static timeline
3. **Infra Pattern** — Establish lane-level infrastructure

### Should Address
1. **Scroll Reduction** — Explore layout alternatives
2. **Play/Pause** — Add pause capability

### Nice to Have (Future)
1. **Timeline scrubbing** — Seek to position
2. **Comments at timestamps** — Future feature setup
3. **Editing primitives** — Cut/insert/trim (much later)

---

## Files Changed This Attempt

| File | Purpose |
|------|---------|
| `src/index.html` | PWA entry point with 2 screens |
| `src/app.js` | Core audio and navigation logic |
| `src/waveform.js` | Canvas-based waveform visualizer |
| `src/styles.css` | Mobile-optimized styles |
| `src/manifest.json` | PWA manifest |
| `src/sw.js` | Service Worker |
| `test-poc.spec.js` | 17 Playwright tests |
| `evidence/screenshots/` | 5 verification screenshots |

---

## Quotes / Observations (From Review Meeting 2026-01-23)

### On Dual Draft/Review Sections

> "Why does it have your draft and review as separate boxes?"

> "You're still doing different things to the same file... it breaks your mental model."

> "Two places... you're doing the same thing."

**Key insight:** Don't show the same audio in two places. Consolidate.

---

### On Waveform Dual-Mode

> "When the audio is recording/playing you use it as is, and when stopped/paused you show the timeline."

> "When recording stops it just shows the full waveform — that's a common pattern."

> "Like YouTube seek bar at bottom... shows amplitude (silence vs speech)... fixed size regardless of duration."

**Key insight:** Waveform serves dual purposes — live feedback during recording, timeline/seek when stopped.

---

### On Waveform Purpose

> "They didn't know if it was working or not. So they were stopping and starting... the visual cues, there needed to be some visual cue that it was recording."

> "It kind of gives an idea of like, you know, I think they dual-purposed letting them see if it was too quiet or if it was too loud."

> "If you're recording a verse which is multiple sentences even, you usually might want to seek pretty quickly to different parts."

**Key insight:** Waveform has multiple uses: recording confirmation, volume feedback, seeking/scrubbing.

---

### On Future Comments Feature

> "In the future if somebody wants to add a comment and say 'right here at one minute and twenty three seconds there's a problem' — having the waveform there so they can tap on it exactly right there."

**Key insight:** Waveform-as-timeline sets up for timestamped comments feature.

---

### On Multiple Drafts

> "Multiple drafts is a thing that I feel you don't want to do up front."

> "From what we understand on the field, generally people are just recording a stage and that's what matters."

> "We had this in Scribe and people got confused with it mostly. Like five versions of it now and which is the real one?"

**Key insight:** Avoid multiple draft versions — causes confusion. One recording per stage.

---

### On Pause/Resume Recording

> "I do agree that there may be value in figuring out a way to pause and resume recording... append to recording."

> "If I stop I stop recording and now I click record again and it restarted so it's overwriting. So we might need to differentiate."

**Key insight:** Need to differentiate "continue recording" vs "start new recording" (overwrite).

---

### On User Literacy Spectrum

> "In the OBT space there is quite a bit of variation on the capabilities of people who are on the translation team."

> "In India, we have groups who are able to read... they would still be able to read it fine. But then there are groups who are completely illiterate."

**Key insight:** Must handle both literate and illiterate users. Different flows.

---

### On Text as Secondary

> "Text is not first, but a way to open an accordion and would show the text for those who can read."

> "Audio is primary. Text is probably not visible, and they can make it visible."

**Key insight:** Audio-first, text as optional accordion for literate users.

---

### On AI Features

> "If you convert audio to text and then run some AI stuff over it and then go back to audio, you can do a lot of things."

> "That text may also need to be visible at some point so that the literate person can see what did the AI actually evaluate."

> "It might be that the AI features, we do not make them available on a phone."

**Key insight:** AI features may be web-only. Audio cleanup could be automated. Literate users may need to see AI evaluation text.

---

### On Screen Space / Scrolling

> "Most phones, even low-end Android phones, can squish more, I feel like."

> "It's good for a user who's low-tech and new to technology to have large buttons... but it's not a good utilization of space."

**Key insight:** Balance large touch targets with screen space efficiency.

---

### On Single Action Per Box

> "Each box there's only one thing to do so there's no question of what you do with that box... you listen, you record, you play your recording."

> "However once we merge the two together we're basically going to overload a single box for two actions or three actions."

**Key insight:** Current "one action per box" design has clarity value. Merging requires careful UX to maintain clarity.

---

### On Infrastructure

> "We will need an infra folder for the product lane and start iterating and improving the CI/CD with each attempt."

**Key insight:** Infrastructure should evolve at lane level, not per-attempt.

---

## Conclusion

**This attempt is a SUCCESS.**

Not because the UX is perfect, but because:
1. Build completed and verified (17/17 tests)
2. Clear UX learnings emerged (consolidate sections, dual-mode waveform)
3. Infrastructure pattern identified (lane-level infra)
4. Next iteration is well-defined

Per ODD Canon: "Failure with fast learning is a win."
This attempt produced fast learning. That's success.
