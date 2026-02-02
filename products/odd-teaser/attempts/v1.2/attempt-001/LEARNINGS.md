# Learnings — ODD Teaser v1.2 Attempt 001

## Critical Failures

### 1. Oddkit integration is untestable on feature branches

**What happened:** Created `canon/agents/odd-teaser.md` to expose a prompt via oddkit MCP. The worker code fetches from `oddkit.klappy.dev/mcp`, but oddkit reads from the deployed main branch — not feature branches.

**Impact:** The odd-teaser prompt I created isn't available until this branch merges to main. Until then, the worker falls back to hardcoded prompt.

**Learning:** Oddkit integration cannot be tested end-to-end on feature branches. Either:
- Accept this and test the fallback path
- Deploy to a staging environment that oddkit can read from
- Add a config flag to bypass oddkit during development

### 2. Hardcoded consent matching was brittle and wrong

**What happened:** Tried to match "yes", "no", etc. with hardcoded string arrays. Users typing "Yes!" or "yes please" broke it.

**Impact:** When consent check failed, message went to LLM, which sometimes detected it as a new artifact — capturing "Yes" as the artifact content instead of the original learning.

**Learning:** Never hardcode behavioral logic when an LLM is available. The LLM can understand "yes" in all its forms. Added `consent` and `decline` as output types so the LLM handles this naturally.

### 3. System prompt didn't explain what ODD is

**What happened:** LLM responded "I'm not familiar with 'Oddkit'" when user asked about it.

**Impact:** Users confused — the tool doesn't even know what it is.

**Learning:** System prompt must include context about ODD and oddkit. The LLM has no external knowledge about this domain-specific methodology.

### 4. Kept applying bandaids instead of fixing root cause

**What happened:** Each bug → quick fix → new bug → quick fix. Never stepped back to understand the architecture.

**Root causes identified:**
- Oddkit reads from main branch (architectural limitation)
- Frontend was doing work the LLM should handle (consent detection)
- System prompt was incomplete (missing ODD context)

## Architecture Decisions

### D1: LLM handles all semantic interpretation

Frontend should NOT match strings. LLM returns typed responses:
- `response` — normal conversation
- `artifact_detected` — noticed something worth capturing
- `consent` — user agreed to capture
- `decline` — user declined

### D2: Oddkit prompt with hardcoded fallback

Worker attempts to fetch from `oddkit.klappy.dev/mcp`. Falls back to hardcoded prompt if:
- Oddkit unavailable
- No matching prompt found (current state on feature branches)

### D3: Context passed to LLM for pending state

When pending detection exists, user message includes context:
```
[CONTEXT: User was just asked if they want to capture a learning. Their response:] yes please
```

This lets the LLM understand the conversation state without the frontend parsing intent.

## What Should Have Happened

1. Read PRD and behavior.md thoroughly before coding
2. Create canon/agents/odd-teaser.md FIRST (the prompt source of truth)
3. Understand that oddkit reads from deployed main — plan for fallback testing
4. Never hardcode behavioral logic — let the LLM handle it
5. Test with actual user flows, not just happy paths
