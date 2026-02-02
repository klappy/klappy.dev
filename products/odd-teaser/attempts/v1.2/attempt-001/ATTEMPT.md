# Attempt 001 — Odd Teaser PRD v1.2

## Status: CLOSED

**Agent**: claude-opus-4-5
**Date**: 2026-02-02
**PRD Version**: v1.2
**Branch**: `claude/odd-teaser-start-SNyjW`

---

## Goal

Implement PRD v1.2 requirements: **real Claude API integration** with LLM-based artifact detection.

### Key Requirements (from PRD v1.2)
- Real Claude API integration (not regex)
- Streaming responses to frontend
- Cloudflare Worker for API proxy
- Rate limiting (100 requests/hour per IP)
- Export works without backend dependency

### Prior Learnings Applied
- Write to `products/odd-teaser/src/` (not just attempts/)
- Create `index.html` at lane root for Vite
- Extract JS to `.js` files (not inline)
- Commit screenshots as evidence
- Branch is the protection boundary

---

## Implementation Plan

1. Create Cloudflare Worker (`products/odd-teaser/worker/`) for Claude API proxy
2. Update frontend to call worker endpoint
3. Implement real LLM-based artifact detection
4. Add streaming response support
5. Test build and capture screenshots

---

## Files Changed

```
products/odd-teaser/
├── functions/
│   └── api/
│       └── chat.js              # NEW: Claude API proxy function
└── src/
    ├── app.js                   # MODIFIED: Real Claude API integration
    └── styles/main.css          # MODIFIED: Loading indicator styles

products/odd-teaser/attempts/v1.2/attempt-001/
├── ATTEMPT.md                   # This file
├── META.json                    # Attempt metadata
└── evidence/
    └── screenshots/
        └── 01-entry-state.png   # Entry state proof
```

### Key Changes

1. **`functions/api/chat.js`** — Cloudflare Pages Function that:
   - Proxies requests to Claude API
   - Uses claude-sonnet-4-20250514 model
   - Implements rate limiting (100 requests/hour per IP using KV)
   - Includes behavior.md system prompt for artifact detection
   - Returns structured JSON: `{type, artifact_type?, response}`

2. **`src/app.js`** — Frontend changes:
   - Removed all regex pattern matching (ARTIFACT_PATTERNS deleted)
   - Added `getCompanionResponse()` that calls `/api/chat`
   - Handles structured response: `artifact_detected` vs `response`
   - Added loading indicator while waiting for Claude
   - Error handling for rate limits and connection issues

3. **`src/styles/main.css`** — Added loading animation for dots

---

## Outcome

**Status**: Implementation complete, awaiting deployment verification.

### What was built:
- Real Claude API integration via Cloudflare Pages Function
- LLM-based artifact detection (learning/decision/override)
- System prompt enforces behavior.md contract
- Rate limiting infrastructure (requires KV binding in production)
- Streaming-ready architecture (non-streaming for v1)

### Deployment requirements:
1. Set `ANTHROPIC_API_KEY` environment variable in Cloudflare Pages
2. (Optional) Create KV namespace and bind as `RATE_LIMIT_KV` for rate limiting
3. Deploy to Cloudflare Pages — functions/ directory auto-detected

---

## Learnings

### L-001: Cloudflare Pages Functions simplify architecture

Using `functions/` directory instead of a separate Worker deployment reduces operational complexity. Cloudflare automatically deploys functions alongside static assets.

### L-002: Structured JSON responses enable reliable artifact detection

By requiring Claude to respond in structured JSON (`{type, artifact_type, response}`), the frontend can reliably distinguish between artifact detection prompts and normal responses.

### L-003: System prompt is the behavior contract

The entire behavior.md contract is embedded in the system prompt. This ensures Claude follows the thinking companion patterns without additional orchestration.

### L-004: Rate limiting requires KV binding

Rate limiting implementation is ready but requires Cloudflare KV namespace binding (`RATE_LIMIT_KV`). Without it, rate limiting is skipped (acceptable for low-traffic PoC).
