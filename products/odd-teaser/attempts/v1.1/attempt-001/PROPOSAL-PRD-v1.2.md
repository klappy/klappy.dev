# PRD v1.2 Proposal — Odd Teaser as Reference Implementation

> **Status**: PROPOSAL (from attempt-001 learnings)
> **Author**: Agent (claude-opus-4-5)
> **Date**: 2026-02-02

---

## Problem with v1.1

PRD v1.1 specified "LLM-based artifact detection" but the implementation degenerates to regex pattern matching. This is not a reference implementation — it's a toy.

Klappy.dev should demonstrate **how ODD actually works** so others can see the methodology in action.

---

## Vision for v1.2

**Klappy.dev is the reference implementation of Observation-Driven Development.**

A visitor arrives, engages in genuine epistemic externalization powered by real LLM orchestration, and leaves with artifacts they can use. The system itself demonstrates ODD principles.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     klappy.dev/odd-teaser                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌─────────────────────────────────┐   │
│  │   Frontend   │───▶│      Cloudflare Worker          │   │
│  │  (Thinking   │    │   (oddkit-orchestrator proxy)   │   │
│  │   Space UI)  │◀───│                                 │   │
│  └──────────────┘    └─────────────────────────────────┘   │
│                                │                            │
│                                ▼                            │
│                      ┌─────────────────┐                   │
│                      │  Claude API     │                   │
│                      │  (via oddkit)   │                   │
│                      └─────────────────┘                   │
│                                │                            │
│                                ▼                            │
│                      ┌─────────────────┐                   │
│                      │   Subagents     │                   │
│                      │  - odd-scribe   │                   │
│                      │  - odd-critic   │                   │
│                      └─────────────────┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Frontend (Thinking Space UI)

Same thinking-first entry as v1.1, but connected to real backend:

- Conversational input: "What's on your mind?"
- Real-time streaming from Claude API
- Artifact suggestions surfaced by odd-scribe subagent
- Consent-based capture flow
- Export to Markdown (local download)

### 2. Cloudflare Worker (Orchestrator Proxy)

Lightweight edge function that:

- Receives user input from frontend
- Calls oddkit-orchestrator with appropriate context
- Streams responses back to frontend
- Handles rate limiting (no auth, but protect the API key)
- Zero PII storage (stateless)

### 3. Oddkit Orchestrator

The real ODD orchestration layer:

- Manages conversation context
- Dispatches to subagents based on detected intent
- Enforces ODD behavior contract (behavior.md)
- Returns structured responses with artifact suggestions

### 4. Subagents

**odd-scribe**: Watches conversation for artifact scents
- Detects learnings, decisions, overrides
- Surfaces suggestions with reasoning
- Respects user consent

**odd-critic**: (Optional) Reviews captured artifacts
- Checks for completeness
- Suggests refinements
- Never blocks export

---

## API Contract

### POST /api/think

Request:
```json
{
  "message": "I realized the caching was causing stale reads",
  "context": [/* previous messages */],
  "artifacts": [/* already captured */]
}
```

Response (streamed):
```json
{
  "type": "companion",
  "content": "That's an important insight about your system."
}
{
  "type": "artifact_suggestion",
  "artifact_type": "learning",
  "content": "Caching layer was causing stale reads in production",
  "reasoning": "You used 'realized' and identified a root cause"
}
```

---

## Build Script Integration

`infra/scripts/build-odd-teaser.js`:

1. Builds frontend (Vite)
2. Validates oddkit-orchestrator config
3. Deploys Cloudflare Worker with API key (from secrets)
4. Outputs to `products/odd-teaser/dist`

---

## Definition of Done (v1.2)

### Must Have
- [ ] Real Claude API integration (not regex)
- [ ] Oddkit orchestrator managing conversation
- [ ] Odd-scribe subagent detecting artifacts
- [ ] Streaming responses to frontend
- [ ] Cloudflare Worker deployment
- [ ] Rate limiting (100 requests/hour per IP)
- [ ] Export works without any backend dependency

### Should Have
- [ ] Odd-critic subagent for artifact review
- [ ] Telemetry dashboard (anonymous usage metrics)

### Must NOT Have
- [ ] User accounts or authentication
- [ ] Persistent storage of conversations
- [ ] Engagement optimization features
- [ ] Navigation beyond single-page experience

---

## Open Questions

1. **API Key Management**: How do we protect the Claude API key while allowing anonymous usage?
   - Option A: Cloudflare Worker with rate limiting
   - Option B: Turnstile captcha for abuse prevention

2. **Cost Control**: Anonymous LLM access = potential abuse
   - Daily budget cap?
   - Request size limits?
   - Degraded mode when budget exceeded?

3. **Oddkit Dependency**: Is oddkit ready for this?
   - Need to check oddkit-orchestrator status
   - May need to build missing pieces

---

## Proposed Next Steps

1. Human reviews this proposal
2. If approved, update `PRD.md` to v1.2
3. New attempt implements against v1.2 spec
4. Build script and Worker deployment added to infra

---

*"AI is an accelerator, not an authority."*

This proposal requires human review before becoming the authoritative PRD.
