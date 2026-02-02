# Attempt 002 — Odd Teaser PRD v1.1

## Status: IN_PROGRESS

**Agent**: claude-opus-4-5
**Date**: 2026-02-02
**PRD Version**: v1.1
**Branch**: `claude/odd-teaser-start-jcKjm`

---

## Objective

Replace regex pattern matching with **real Claude API integration** for artifact detection.

Attempt-001 failed because:
1. Regex patterns aren't real LLM detection
2. Hollow companion responses provided no signal
3. Users couldn't tell if the system understood them

This attempt implements:
- Cloudflare Pages Function at `/api/chat` proxying to Claude API
- Real LLM analysis of user input for artifact scents
- Genuine companion responses that reflect understanding

---

## Prior Learnings Applied

From attempt-001:
- [x] Write to `products/odd-teaser/src/` (not just attempts/)
- [x] Create `index.html` at lane root for Vite
- [x] Extract JS to `.js` files (not inline)
- [x] Use real Claude API (not regex)
- [ ] Capture screenshots with Playwright (no browser available locally)

---

## Architecture

```
products/odd-teaser/
├── index.html           # Vite entry (existing)
├── functions/
│   └── api/
│       └── chat.js      # Cloudflare Pages Function → Claude API
└── src/
    ├── app.js           # Updated to call /api/chat
    └── styles/main.css  # Existing (unchanged)
```

---

## Implementation

### Cloudflare Pages Function (`functions/api/chat.js`)

The function:
1. Receives POST with `{ message, history }`
2. Calls Claude API with system prompt defining:
   - Thinking companion behavior (not teacher/assistant)
   - Artifact detection rules (learning/decision/override)
   - JSON response format with optional artifact surfacing
3. Returns structured response to frontend

**System Prompt Key Points:**
- Brief responses (1-3 sentences)
- Stay in user's frame, don't teach
- Detect artifact signals and surface for consent
- Return JSON with `{ response, artifact }`

### Updated Frontend (`src/app.js`)

Changed from attempt-001:
- Removed regex `ARTIFACT_PATTERNS`
- Added `callClaudeAPI()` function
- Added loading state management
- Graceful degradation when API unavailable
- Proper error handling

---

## Build Verification

```
$ npm run build -- --lane odd-teaser

✅ Found app code in products/odd-teaser/src
✅ Vite build complete
✅ Build output in products/odd-teaser/dist

Output:
  dist/index.html                 1.33 kB
  dist/assets/index-BUKv6GpA.css  5.21 kB
  dist/assets/index-C9hU8p9d.js   5.14 kB
```

---

## Local Testing

```
$ curl -s http://localhost:3333 | head -20

<!DOCTYPE html>
<html lang="en">
...
<p>What's on your mind?</p>
...
```

Dev server confirmed serving correct content.

---

## Evidence

### Screenshots

**Issue:** No browser available on VM for Puppeteer/Playwright screenshots.

Screenshots will be captured from Cloudflare deployment after push.

### Expected Behavior

1. **Entry State**: "What's on your mind?" prompt with input area
2. **User Input**: User types freely
3. **LLM Response**: Claude analyzes and responds (not hollow "Go on.")
4. **Artifact Detection**: When artifact scent detected, surfaces: "That sounds like a [learning/decision/override]. Want to capture it?"
5. **Consent Flow**: Yes/No buttons for capture
6. **Export**: One-click Markdown download

---

## Deployment Notes

### API Key Configuration

The Cloudflare Worker requires `ANTHROPIC_API_KEY` as a secret:

```bash
# In Cloudflare Dashboard or via CLI:
wrangler secret put ANTHROPIC_API_KEY
```

Without the secret, the function returns a fallback response and logs a warning.

### Rate Limiting

Production should add rate limiting to protect the API key. Current implementation:
- No rate limiting (TODO for production hardening)
- Relies on Cloudflare's built-in request limits

---

## Files Changed

```
products/odd-teaser/
├── functions/
│   └── api/
│       └── chat.js              # NEW: Claude API proxy
└── src/
    └── app.js                   # MODIFIED: Calls API instead of regex

products/odd-teaser/attempts/v1.1/attempt-002/
├── ATTEMPT.md                   # This file
├── META.json                    # Machine-readable metadata
└── evidence/
    └── screenshots/             # (empty - will capture from deployment)
```

---

## Definition of Done

| Criterion | Status | Notes |
|-----------|--------|-------|
| Real Claude API integration | ✅ PASS | Cloudflare Function implemented |
| No regex pattern matching | ✅ PASS | Removed from app.js |
| Build completes | ✅ PASS | Vite build successful |
| Dev server works | ✅ PASS | Confirmed via curl |
| Screenshots committed | ⏳ PENDING | No browser available locally |
| Cloudflare deployment | ⏳ PENDING | After push |

---

## What Human Needs To Do

1. **Review this PR** - Verify implementation approach
2. **Add ANTHROPIC_API_KEY** - Configure in Cloudflare dashboard
3. **Test Cloudflare deployment** - Verify real LLM responses work
4. **Capture screenshots** - From production preview URL

---

## Open Questions

1. **Rate Limiting**: How aggressive should limits be? Suggested: 10 requests/minute per IP
2. **Cost Management**: Need budget alerts on Claude API usage
3. **Fallback UX**: Currently shows "I hear you." - should it explain API is unavailable?

---

*"AI is an accelerator, not an authority."*
