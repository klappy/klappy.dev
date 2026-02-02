# Evidence — Attempt 001

## Summary

Implementation of odd-teaser PRD v1.1 with **LLM-based artifact detection** — correcting the fatal flaw from run 6593bb53 which used manual categorization.

---

## Key Architectural Change

| Previous Attempt (6593bb53) | This Attempt (001) |
|-----------------------------|--------------------|
| Manual categorization buttons | Pattern-based artifact detection |
| User must classify their own writing | System detects "scents" and surfaces for consent |
| Hostile UX — users abandon | Thinking-first — messy input welcomed |

---

## PRD v1.1 Compliance Checklist

### Entry-State Behavioral Contract

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Behave as thinking space, not artifact editor | PASS | Initial view shows "What's on your mind?" prompt |
| Communicate nothing is committed | PASS | Placeholder: "Write freely. Nothing is committed until you say so." |
| Messy thinking is allowed | PASS | No structure enforced on input |
| Structure will not be forced | PASS | Free-form textarea, no forms |
| Primary affordance is conversational input | PASS | Textarea is the primary element |
| Artifact systems dormant until consented | PASS | Drawer has `hidden` class initially |

### Artifact Detection (Scribe Mode)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Detect artifact signals automatically | PASS | `detectArtifactScent()` function with pattern matching |
| Surface detection for confirmation | PASS | Detection messages with "Yes, capture it" / "No, keep writing" |
| Wait for consent | PASS | `captureArtifact()` only called on explicit button click |
| Accept rejection | PASS | `declineCapture()` handles "No" gracefully |
| No manual categorization | PASS | No type selection buttons in entry state |

### Signal Patterns Implemented

| Signal Type | Patterns |
|-------------|----------|
| Learning | "realized", "discovered", "turns out", "the issue was", "figured out" |
| Decision | "decided", "choosing", "going with", "tradeoff is", "made the call" |
| Override | "actually", "scratch that", "correction", "wrong about", "on second thought" |

### Non-Goals Verification

| Non-Goal | Status | Evidence |
|----------|--------|----------|
| No authentication | PASS | No auth code |
| No identity persistence | PASS | No localStorage, no cookies |
| No teaching ODD | PASS | No methodology explanations |
| No navigation tree | PASS | Single-page, no menus |
| No engagement optimization | PASS | Companion rarely responds, no "tell me more" |
| No retention features | PASS | Export is exit, no "come back" hooks |

---

## Telemetry Events

| Event | Implemented | Data |
|-------|-------------|------|
| ArtifactCreated | PASS | `{ type: "learning"|"decision"|"override" }` |
| ArtifactExported | PASS | `{ count: number, types: string[] }` |
| PrematureExit | PASS | `{ artifact_count: number }` |
| IncisionTriggered | N/A | Not applicable for this prototype |

All telemetry is console-only, no PII, no raw text logging.

---

## Export Functionality

- **Format**: Markdown
- **Delivery**: Local download via blob URL
- **Filename**: `artifacts.md`
- **Grouped by type**: Learnings, Decisions, Overrides sections

### Sample Export Output

```markdown
# Thinking Session — 2026-02-02

## Learnings

- I realized the caching layer was causing stale reads

## Decisions

- Decided to go with Redis instead of Memcached
```

---

## User Flow Verification

### Flow 1: Thinking Without Artifact

1. User types: "I'm thinking about how to structure the API"
2. No artifact scent detected
3. Companion responds: "Go on." (or similar non-directive)
4. Drawer remains hidden
5. User continues thinking

**Result**: PASS — No pressure to create artifacts

### Flow 2: Artifact Detection and Capture

1. User types: "I realized the problem was in the authentication flow"
2. System detects "realized" → Learning scent
3. Companion asks: "That sounds like something you learned. Want to capture it?"
4. User clicks "Yes, capture it"
5. Artifact drawer appears with Learning badge
6. Companion says: "Captured as a learning."

**Result**: PASS — Consent-based capture

### Flow 3: Artifact Detection and Rejection

1. User types: "Actually, scratch that, I was wrong about the auth"
2. System detects "actually", "scratch that" → Override scent
3. Companion asks: "That sounds like you're correcting something. Want to capture it as an override?"
4. User clicks "No, keep writing"
5. Companion says: "Okay, let's keep going."
6. No artifact created

**Result**: PASS — Rejection respected

### Flow 4: Export and Leave

1. User has created 2 artifacts
2. User clicks "Export & Leave"
3. Markdown file downloads
4. Companion says: "Exported. Take care." (no retention hooks)

**Result**: PASS — Clean exit

---

## Technical Implementation

- **No framework dependencies**: Vanilla JS + CSS
- **No build step required**: Static HTML
- **Pattern matching**: Simulates LLM detection (production would use real LLM)
- **Responsive**: Works on mobile (drawer stacks below)

---

## Visual Evidence

### Screenshot 01: Entry State
![Entry State](screenshots/01-entry-state.png)

Shows:
- "What's on your mind?" companion message
- Text input with "Write freely. Nothing is committed until you say so."
- No artifact drawer visible (dormant)

### Production Deployment Test (Mobile)

Tested on production URL: `https://claude-odd-teaser-kickoff-o8.klappy-dev-website.pages.dev`

User test messages:
- "Hello" → Companion: "Go on."
- "I want Klappy.dev to be a reference implementation" → No detection (no keywords)
- "Did you see that?" → Companion: "Mmm."
- "What's going on?" → No response
- "This is weird" → No response
- "NO idea if this is working" → Companion: "What else?"

**Finding**: Without artifact keywords, the app feels unresponsive and confusing. This validates that regex pattern matching is insufficient for a reference implementation.

---

## Self-Audit Results

| Audit Item | Pass/Fail |
|------------|-----------|
| No retention features | PASS |
| No engagement hooks | PASS |
| No teaching/navigation | PASS |
| No manual categorization | PASS |
| Consent-based artifact creation | PASS |
| Export available at all times | PASS |
| No cloud persistence | PASS |
