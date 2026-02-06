---
uri: klappy://fluent-mobile/instructions
title: "Fluent Mobile PoC Instructions"
tier: 1
voice: neutral
stability: evolving
---

# Fluent Mobile PoC: Field Testing Instructions

**Purpose**: Guide agents and humans through PoC execution with a focus on hypothesis validation and field learning.

---

## PoC Mindset

### You Are Not Building an App

You are testing whether a mobile-first OBT companion app is:

- **Realistic** — Can it actually work on the devices and connectivity available?
- **Culturally viable** — Does it fit how teams actually work?
- **Performant** — Is it fast and reliable enough to sustain usage?

If you catch yourself polishing UI or handling edge cases, stop. That's not the job.

### The Goal Is Learning, Not Delivery

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   "Failure with fast learning is a win."                           │
│                                                                     │
│   A PoC that proves the idea doesn't work has succeeded.           │
│   A PoC that produces working code but no learnings has failed.    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## User Context

### Primary Users: OBT Translators

These are not typical software users. Understand who you're building for:

| Characteristic                | Implication                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Low literacy**              | Text-heavy UI will fail. Audio and icons must carry meaning. |
| **Low tech familiarity**      | Gestures that feel "obvious" to you may not be to them.      |
| **Audio-first workflows**     | Reading/writing is secondary. Listening/speaking is primary. |
| **Intermittent connectivity** | "Always online" assumptions will break in the field.         |
| **Shared devices**            | Personal phone assumptions may not hold.                     |
| **Group-based work**          | Individual task models may miss how teams actually work.     |
| **Security concerns**         | In some regions, visible tech creates risk.                  |

### Literacy Spectrum (From v0.2 Review Meeting)

OBT translator capabilities vary significantly:

| User Type                 | Example                                             | Design Implication                   |
| ------------------------- | --------------------------------------------------- | ------------------------------------ |
| **Can read LWC**          | India groups who can read source in LWC orthography | Text can be shown as option          |
| **Completely illiterate** | Some field groups                                   | Text must be hidden; audio-only flow |
| **Mixed teams**           | Literacy varies within team                         | Make text an optional accordion      |

**Key insight:** Audio is PRIMARY. Text is optional overlay for those who can read.

Three potential user flows:

1. Source as audio only (illiterate users)
2. Source as text (literate users)
3. Switchable between both (overlay or expand)

### What "Good UX" Means Here

| Don't                          | Do                                          |
| ------------------------------ | ------------------------------------------- |
| Assume users read instructions | Make the happy path obvious without reading |
| Use technical language         | Use simple, universal concepts              |
| Require multiple gestures      | One tap does one thing                      |
| Make audio secondary           | Audio is the primary interface              |
| Assume stable power            | Optimize for battery, handle interruption   |
| Assume personal devices        | Support device sharing scenarios            |

---

## Hypothesis Testing Guide

### Hypothesis 1: Mobile Viability

**Question**: Can translators realistically draft and review OBT audio using a mobile companion app?

**What to test**:

- Can users record audio of acceptable quality?
- Can users navigate between source and draft?
- Can users complete a drafting cycle end-to-end?

**Evidence needed**:

- Task completion rate (% who finish)
- Time to complete drafting cycle
- User-reported blockers

**Warning signs**:

- Users give up mid-task
- Users need constant facilitator help
- Audio quality is unacceptable for workflow

---

### Hypothesis 2: Performance

**Question**: Does app performance on real, low-to-mid-tier Android devices sustain usage without frustration?

**What to test**:

- App launch time on low-end devices
- Audio playback latency
- Recording start/stop responsiveness
- Behavior under memory pressure
- Behavior with full storage

**Evidence needed**:

- Performance metrics from real devices (not emulators)
- User frustration observations
- Crash/hang logs

**Warning signs**:

- Users complain about slowness
- App crashes on older devices
- Audio skips or stutters
- Users wait noticeably between actions

**Device tiers to test**:
| Tier | Example Devices | Priority |
|------|-----------------|----------|
| Low | $50-100 Android, 2-3GB RAM, older chipset | HIGH — this is the target |
| Mid | $150-250 Android, 4GB RAM, recent chipset | Medium |
| High | Flagship phones | Low — not representative |

---

### Hypothesis 3: Workflow Usability

**Question**: Do audio-centric workflows (listen → record → review → comment) feel natural and non-patronizing?

**What to test**:

- Is the listen → record → review flow intuitive?
- Can users pause/resume without losing work?
- Is the UI guidance helpful or condescending?
- Do users feel in control?

**Evidence needed**:

- User journey observations
- Quotes about what felt easy/hard
- Points of confusion or frustration
- Time spent figuring out vs. doing

**Warning signs**:

- Users feel "talked down to"
- Users skip guidance but then get stuck
- Workflow feels like a checklist, not natural work
- Users ask "what do I do now?"

**UX Tone Check**:
| Patronizing ❌ | Confusing ❌ | Good ✅ |
|---------------|-------------|---------|
| "Great job! Now tap the blue button!" | "Invoke the audio buffer" | "Record" (with mic icon) |
| "You did it perfectly!" | "Error: null reference" | "Recording saved" |
| Tutorial that can't be skipped | No tutorial at all | Tutorial on first use, accessible later |

---

### Hypothesis 4: Task Clarity

**Question**: Can users understand what to do next with minimal or no training?

**What to test**:

- Can a new user start without verbal instructions?
- Is the current state always clear?
- Is the next action always obvious?
- Do users recover from mistakes easily?

**Evidence needed**:

- First-use success rate without training
- Questions users ask
- Missteps and recovery patterns

**Warning signs**:

- Users ask "what do I do?" repeatedly
- Users tap wrong things
- Users can't find how to continue
- Users need external help to proceed

**Test scenarios**:

1. Hand device to user, observe without helping
2. Note every question they ask
3. Note every wrong tap
4. Note moments of hesitation

---

### Hypothesis 5: Authentication & Trust

**Question**: Is QR-based identity/assignment handoff understandable and trustworthy in real contexts?

**What to test**:

- Do users understand what the QR code does?
- Do users trust the QR process?
- Does the QR → identity → assignment flow feel secure?
- Can users re-authenticate if needed?

**Evidence needed**:

- User explanations of what they think happened
- Trust statements/concerns
- Re-auth success rate
- Security concerns raised

**Warning signs**:

- Users don't trust QR ("what is this tracking?")
- Users can't explain what the QR did
- Identity confusion (wrong person, wrong project)
- Panic when re-auth is needed

**Cultural considerations**:

- Some cultures are suspicious of scanning things
- Some users may not have personal phones
- Device sharing changes identity assumptions

---

### Hypothesis 6: Cultural Fit

**Question**: Does the approach work across diverse regions and team dynamics?

**What to test**:

- How do different regions use the app differently?
- Does the group/individual workflow assumption hold?
- Are there cultural barriers to adoption?
- Does device sharing affect the design?

**Evidence needed**:

- Observations from multiple regions (at least 2)
- Workflow variations between groups
- Cultural friction points
- Successful adaptations

**Warning signs**:

- Works in one region, fails in another
- Individual workflow doesn't match group reality
- Cultural barriers to audio recording
- Facilitators become bottlenecks

**What to look for**:
| Assumption | Reality Check |
|------------|---------------|
| Users work individually | Some teams work in groups of 3-5 |
| One device per user | Devices may be shared |
| Audio recording is normal | Some cultures have privacy concerns |
| Written comments work | Some users prefer audio comments |
| English UI is fine | Language barriers may exist |

---

## Field Testing Protocol

### Before Testing

1. **Identify test users** — Actual OBT translators, not proxies
2. **Identify test locations** — Actual field conditions, not offices
3. **Prepare devices** — The devices users actually have
4. **Prepare scenarios** — Realistic tasks, not artificial demos
5. **Prepare evidence capture** — How you'll record learnings

### During Testing

**Do:**

- Observe without helping (unless they're completely stuck)
- Note every question, hesitation, and misstep
- Record user quotes verbatim
- Capture device/context details
- Let users fail if they're going to fail

**Don't:**

- Guide users to success
- Explain how things work
- Fix problems users encounter
- Test on your own device
- Assume you know what users think

### After Testing

1. **Document immediately** — Memory degrades fast
2. **Capture quotes exactly** — Paraphrase loses nuance
3. **Note context** — Device, location, connectivity, group size
4. **Identify patterns** — What repeated across users?
5. **Validate/invalidate hypotheses** — With evidence, not opinion

---

## Evidence Template

For each testing session:

```markdown
## Field Testing Session: [Date/Location]

### Context

- **Location**: [Where]
- **Participants**: [N users, roles]
- **Devices**: [What phones/tablets]
- **Connectivity**: [WiFi/cellular/intermittent/offline]
- **Duration**: [How long]

### Hypotheses Tested

- [x] H2: Performance
- [x] H3: Workflow Usability
- [ ] H5: Auth & Trust (not tested this session)

### Observations

#### What Worked

- [Observation 1]
- [Observation 2]

#### What Didn't Work

- [Observation 1] — _User quote: "..."_
- [Observation 2]

#### Surprises

- [Something unexpected]

### User Quotes

> "Quote 1" — [User role/context]
> "Quote 2" — [User role/context]

### Hypothesis Conclusions

| Hypothesis             | Result       | Evidence                         | Confidence |
| ---------------------- | ------------ | -------------------------------- | ---------- |
| H2: Performance        | VALIDATED    | 4/5 completed on low-end devices | High       |
| H3: Workflow Usability | INCONCLUSIVE | Mixed results, need more data    | Medium     |

### Next Steps

- [What to do differently next time]
- [What to test next]
```

---

## Core Capabilities Reference

These are the minimum capabilities for PoC testing. Don't over-build.

### 5.1 Project & Assignment Access

| Must Have                 | Nice to Have        | Don't Build            |
| ------------------------- | ------------------- | ---------------------- |
| QR code scans             | Offline QR caching  | User management system |
| Identity established      | Error recovery      | Multi-org support      |
| Assignment context loaded | Progress indicators | Admin dashboard        |

### 5.2 Audio-Centric Drafting

| Must Have               | Nice to Have           | Don't Build           |
| ----------------------- | ---------------------- | --------------------- |
| Play source audio       | Playback speed control | Audio editing         |
| Record draft audio      | Pause/resume recording | Noise reduction       |
| Playback recorded audio | Waveform visualization | Multi-track recording |
| Basic comments          | Audio comments         | Comment threads       |

### 5.3 Resources (Minimal)

| Must Have              | Nice to Have             | Don't Build           |
| ---------------------- | ------------------------ | --------------------- |
| View limited resources | Offline resource caching | Full resource library |
|                        | Search                   | AI integration        |

### 5.4 Offline Tolerance

| Must Have          | Nice to Have          | Don't Build                     |
| ------------------ | --------------------- | ------------------------------- |
| Works when offline | Sync status indicator | Full offline-first architecture |
| Syncs when online  | Conflict logging      | Conflict resolution UI          |
| No data loss       | Background sync       | Real-time sync                  |

---

## What Success Looks Like

### Minimum Success

You have achieved minimum success when:

- [ ] At least one hypothesis is clearly validated OR invalidated
- [ ] Evidence is field-based (real users, real devices, real conditions)
- [ ] Learnings are documented regardless of outcome
- [ ] The team knows what to do next (continue, pivot, pause, or stop)

### Aspirational Success

You have achieved aspirational success when:

- [ ] Two teams complete at least one chapter draft on mobile
- [ ] Users express willingness to use it again
- [ ] Multiple hypotheses validated with high confidence
- [ ] Clear path to pilot phase defined

---

## When to Stop

**Stop this PoC if:**

- Learning has slowed significantly
- The same blockers keep appearing without solutions
- It's starting to feel like a production project
- The team is optimizing instead of learning
- Core assumptions have been invalidated

**Stopping is success** if you learned why it won't work.
**Continuing is failure** if you're just building without learning.

---

## Related Documents

- [PRD](PRD.md) — Full PoC requirements
- [KICKOFF](/products/fluent-mobile/KICKOFF.md) — Attempt structure and sandbox rules
- [Canon Constraints](/canon/constraints/README.md) — Baseline assumptions
- [Definition of Done](/canon/constraints/definition-of-done.md) — Evidence requirements
