# Odd Teaser Lane — Attempt Kickoff

## Attempt Artifacts Location

All attempt artifacts MUST be written under:

```
/products/odd-teaser/attempts/
```

---

## Non-Negotiables (Evidence-First)

This attempt is NOT complete unless all items below are true.

### Required outcome
1) The attempt branch is pushed to `origin` (Cloudflare must be able to build it).
2) Cloudflare Pages serves the app with HTTP 200.
3) Proof assets are present:
   - At least 1 screenshot committed to `attempts/` evidence folder.

### Forbidden
- DO NOT use regex pattern matching for artifact detection. Use real Claude API.
- DO NOT claim completion without deployed preview URL.
- DO NOT leave JS inline in HTML (breaks build detection).

### Evidence check (required)
After pushing, verify the Cloudflare preview URL loads the app.

---

## Attempt Workflow

1) Register the attempt in `products/odd-teaser/attempts/v<VERSION>/attempt-NNN/`.
2) Write implementation to `products/odd-teaser/src/` — branch is the gate.
3) Create `products/odd-teaser/index.html` at lane root for Vite entry.
4) Extract JS to `.js` files (smart-build checks for code files).
5) Build using lane build:
   - `npm run build -- --lane odd-teaser`
6) Capture screenshots with Playwright, commit to evidence folder.
7) Push branch to origin.
8) Confirm Cloudflare preview URL returns HTTP 200.
9) Write ATTEMPT.md with learnings.

---

## What You're Building

A thinking companion with real Claude API integration:

- User types freely ("What's on your mind?")
- LLM detects artifact scents (learning/decision/override)
- Surfaces for consent: "That sounds like a learning. Capture it?"
- On consent, adds to artifact drawer
- Export to Markdown (local download, no backend)

Architecture:
- Frontend at `products/odd-teaser/src/`
- Cloudflare Worker proxies Claude API with rate limiting
- No auth, no persistence, stateless

---

## Lifecycle Summary

```
Attempt → Evidence → Champion Selection → Promotion PR → Production
                                              ↑
                                    (This is the gate)
```

- Attempts are experiments.
- Champion selection is evaluation.
- Promotion is the explicit, human-approved action that makes code production.
