# Website Lane Ledger

Append-only product memory for the `website` lane.
Records outcomes (champions, merges, deployments) without turning them into canon.

---

## Entry — PRD v1.0 Champion (PROMOTED)

- Date: 2026-01-19
- PRD: v1.0
- Epoch: E0003 (evidence-first)
- Champion: PROMOTED
- Champion branch: `run/website/prd-v1.0/cursor/a/claude-opus-4/71c6fdc7`
- Head commit SHA: `1fb713dcbd4158325f48e6842806016a208a7ee7`
- Merge commit SHA: `97394e2480421345b82682f9365c8e5ed414ecb1`
- Cloudflare Pages project: `klappy-dev-website`
- App URL: https://website-attempt-test.klappy-dev-website.pages.dev
- Evidence URL: https://website-attempt-test.klappy-dev-website.pages.dev/_evidence/
- Promotion PR: https://github.com/klappy/klappy.dev/pull/1
- Promoted at: 2026-01-19

> **Note:** This Promotion PR existed prior to rule formalization. From this point forward, all champions require an explicit Promotion PR per `products/website/prompts/ATTEMPT_KICKOFF.md`.

### What worked
- Evidence-first requirement produced real, observable artifacts online.
- `/_evidence/` as a stable convention is discoverable.
- Website lane build path is viable and can produce a deployed app + evidence.

### What didn't
- Local build succeeded but branch not pushed → no CF preview → unverifiable attempt.
- Wrangler deploy used → ad-hoc URL breaks branch-based audit trail.
- Lane/build-output mismatch caused CF to look for wrong dist path.

### Learnings (1–3 bullets)
- "Public" is not enough — discoverable is required.
- The system needs one blessed deployment path: push branch → CF Pages preview → verify 200.
- Failed attempts should preserve evidence URLs + notes when they reveal patterns.

### Follow-up (one next action)
- Kickoff prompt now enforces origin push + HTTP 200 checks + bans wrangler deploy.
