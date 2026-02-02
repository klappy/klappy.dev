# Odd-Teaser — Attempt Kickoff

You are starting an attempt in the **odd-teaser** lane.

**This is a reference implementation lane.** It must demonstrate real ODD with real LLM.

---

## ⛔ MANDATORY: READ PRIOR LEARNINGS FIRST

**Before proceeding, read: `products/odd-teaser/attempts/v1.1/attempt-001/ATTEMPT.md`**

Attempt-001 FAILED due to:
1. Writing only to `attempts/` folder instead of lane `src/`
2. Using regex pattern matching instead of real Claude API
3. Leaving JS inline in HTML (broke build detection)
4. Missing `index.html` at lane root (broke Vite)

**These mistakes wasted hours. Don't repeat them.**

---

## ⚠️ CORRECTED: Branch Is The Gate

**The #1 cause of failed attempts was wrong guidance about file boundaries.**

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CORRECTED SANDBOX                                │
│                                                                     │
│   Write implementation to: products/odd-teaser/src/                 │
│   Create Vite entry at:    products/odd-teaser/index.html           │
│   Record attempt at:       products/odd-teaser/attempts/            │
│                                                                     │
│   The BRANCH is the protection boundary.                            │
│   Human review happens at PR merge, not file location.              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                     STILL FORBIDDEN                                  │
│                                                                     │
│   ❌ products/odd-teaser/PRD.md   — Only human revises              │
│   ❌ public/                      — Production deployment           │
│   ❌ Regex pattern matching       — Use real Claude API             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✅ PRE-FLIGHT CHECKLIST

Before you write a single line of code:

- [ ] I read `attempts/v1.1/attempt-001/ATTEMPT.md` (prior learnings)
- [ ] I read `PRD.md` (requirements)
- [ ] I will write to `products/odd-teaser/src/` (not just attempts/)
- [ ] I will create `products/odd-teaser/index.html` for Vite
- [ ] I will extract JS to `.js` files (not inline)
- [ ] I will capture screenshots with Playwright and commit them
- [ ] I will use real Claude API (not regex)

---

## 📋 Step 1: Register Attempt

Create: `products/odd-teaser/attempts/v<VERSION>/attempt-NNN/`

### Required Structure

```
attempt-NNN/
├── ATTEMPT.md              # Closure record
├── META.json               # Machine-readable metadata
└── evidence/
    └── screenshots/        # Visual proof (REQUIRED)
```

---

## 📋 Step 2: Build Implementation

Write to lane source: `products/odd-teaser/src/`

### Required Files

```
products/odd-teaser/
├── index.html              # Vite entry point (REQUIRED at lane root)
└── src/
    ├── app.js              # Application logic (REQUIRED .js file)
    └── styles/main.css     # Styling
```

### Build Detection Requirements

- Smart-build checks for `.js`/`.ts` files in `src/`
- Smart-build looks for `index.html` at lane root for Vite
- Inline JS in HTML will NOT be detected

---

## 📋 Step 3: Test Build

```bash
npm run build -- --lane odd-teaser
```

If build shows "No app code found" — you're missing `.js` files or lane root `index.html`.

---

## 📋 Step 4: Capture Evidence

**Your VM is invisible to humans.** Screenshots must be committed.

```bash
npx playwright screenshot http://localhost:3333 evidence/screenshots/01-entry-state.png
```

Commit screenshots to `attempts/v<VERSION>/attempt-NNN/evidence/screenshots/`.

---

## 📋 Step 5: Push and Verify

```bash
git push -u origin <branch>
```

After Cloudflare builds, verify preview URL loads the app (not placeholder).

---

## 📋 Step 6: Close Attempt

Update `ATTEMPT.md` with:
- Status: CLOSED
- What worked / what didn't
- Learnings for next attempt

---

## What You're Building

A thinking companion with **real Claude API** integration:

- User types freely ("What's on your mind?")
- Claude API detects artifact scents (learning/decision/override)
- Surfaces for consent: "That sounds like a learning. Capture it?"
- On consent, adds to artifact drawer
- Export to Markdown (local download, no backend)

### Architecture

- Frontend at `products/odd-teaser/src/`
- Cloudflare Worker proxies Claude API with rate limiting
- No auth, no persistence, stateless

---

## Common Violations

### Violation 1: Writing only to attempts/

```diff
- Writing to attempts/v1.2/attempt-001/src/
+ Writing to products/odd-teaser/src/
```

**Why it fails**: Build can't find code. Deploys placeholder.

### Violation 2: Inline JS

```diff
- <script>const app = {...}</script>
+ <script src="app.js"></script>
```

**Why it fails**: Smart-build checks for .js files. Inline JS not detected.

### Violation 3: Regex pattern matching

```diff
- if (/realized|discovered/.test(text))
+ const response = await claude.messages.create(...)
```

**Why it fails**: This is a reference implementation. Regex is not LLM.

### Violation 4: "I tested locally"

```diff
- "The server is running and it works"
+ Screenshot committed to evidence/screenshots/
```

**Why it fails**: Your VM is invisible. Humans need proof in repo.

---

## Success Criteria

- [ ] Cloudflare preview URL loads app (not placeholder)
- [ ] Real LLM responses (not keyword matching)
- [ ] Artifact detection understands context
- [ ] Export downloads Markdown
- [ ] Screenshots committed to repo
- [ ] ATTEMPT.md documents learnings
