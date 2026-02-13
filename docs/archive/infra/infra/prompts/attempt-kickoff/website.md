---
id: attempt-kickoff-website
lane: website
status: canonical
epoch: E0003
audience: agents
---

# Attempt Kickoff — Website Lane

This is the ONLY instruction needed to start a website attempt.
Copy/paste into agent chat WITHOUT modification.

---

## Read First

1. `/docs/appendices/evidence.md`
2. `/docs/PRD/website/PRD.md`
3. `/canon/constraints/README.md`

---

## Lane (LOCKED)

- **Lane:** `website`
- **PRD:** `/docs/PRD/website/PRD.md`
- **Build output:** `products/website/dist/`
- **Evidence URL:** `/_evidence/`

---

## First Actions (EXACT ORDER)

1) Register:
```bash
npm run attempt:register -- --lane website --tool cursor --agent a --model "<your-model>"
```

2) Nuke:
```bash
npm run attempt:nuke -- --lane website
```

3) Create evidence folder:
```bash
mkdir -p attempts/website/prd-v1.0/_runs/<run_id>/screenshots
mkdir -p attempts/website/prd-v1.0/_runs/<run_id>/recordings
```

Use the run_id from step 1.

---

## Build

Implement in `products/website/src/`:

- Load `/content/manifest.json`
- Render home page with ≤7 nav items
- Render markdown content
- Mobile-usable

---

## Evidence (MANDATORY)

Write to `attempts/website/prd-v1.0/_runs/<run_id>/`:

- `ATTEMPT.md` — what you did
- `EVIDENCE.md` — proof links
- `META.json` — provenance (auto-created by register)
- `screenshots/` — at least 1 image
- `recordings/` — at least 1 video OR 3 screenshots total

---

## Completion (NON-NEGOTIABLE)

An attempt is **INVALID** unless ALL are true:

1. Branch pushed to origin
2. Cloudflare Pages builds successfully
3. App loads at preview URL
4. `/_evidence/` returns HTTP 200
5. Screenshots/video present in evidence

**Local preview is NOT acceptable as completion.**

If `/_evidence/` returns 404 → STOP. Attempt is INVALID.

---

## Scope Guard

You MUST NOT:

- Modify `canon/**`
- Modify other lanes
- Add infra, contracts, audits
- Invent workflows

Your ONLY job: **produce a working website with public evidence**.

---

## Before Coding

List exact files you will create/modify.
Then begin.
