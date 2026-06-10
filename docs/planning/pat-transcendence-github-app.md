---
uri: klappy://docs/planning/pat-transcendence-github-app
kind: docs
title: "Planning: PAT Transcendence — GitHub App + Worker-Minted Short-Lived Tokens"
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: draft
tags: ["planning", "auth", "github-app", "pat", "security", "substrate-as-wire", "E0010", "stewardship"]
epoch: E0010
date: 2026-06-09
derives_from: "docs/appendices/epoch-9.md (substrate becomes the wire), odd://canon/governance/stewardship-charter"
complements: "odd/handoffs/2026-05-16-mcp-bearer-token-middleware.md, docs/explorations/credential-relay-as-product.md"
governs: "The plan to retire manual PAT creation/rotation in favor of app-minted, hour-lived, charter-scoped tokens served by the oddkit worker"
---

# Planning: PAT Transcendence — GitHub App + Worker-Minted Short-Lived Tokens

> Manual PATs make the operator the credential wire: minted by hand, pasted into transcripts, rotated after every session — the operator-as-wire antipattern E0009 retired for data, surviving in auth. The fix: a GitHub App (`oddkit-steward`) installed on the three repos with Contents/PR/Workflows write and NO Administration permission; its private key lives in Cloudflare Worker secrets; the worker exposes a `github_token` tool that signs a 10-minute JWT and returns a 1-hour installation token on demand. Rotation does not cease — it moves: from a PAT that transits chat every session to a private key that never transits anything and rotates rarely; expiry replaces rotation for the tokens themselves. Transcript exposure collapses from a long-lived key to a sub-hour scoped token. The charter's reserved powers (settings, visibility, credentials) become unexceedable via the API surface; one indirect escalation path remains and is acknowledged below. Kill switches: uninstall the app, or delete the worker secret. Out of scope: creating new user-owned repos (stays with the owner) and worker deploy secrets (already reserved).

## Owner's One-Time Runbook (~10 minutes)

1. GitHub → Settings → Developer settings → GitHub Apps → New GitHub App. Name: `oddkit-steward`. Webhook: off.
2. Repository permissions: Contents **RW**, Pull requests **RW**, Workflows **RW**, Metadata **R**. Nothing else. Explicitly NOT Administration.
3. Create app → note **App ID** → Generate **private key** (downloads a .pem).
4. Convert the key before storing it — GitHub downloads PKCS#1, but Cloudflare's WebCrypto `importKey` only accepts PKCS#8: `openssl pkcs8 -topk8 -inform PEM -in oddkit-steward.pem -nocrypt -out oddkit-steward-pkcs8.pem`. The .pem never transits chat in either format — that exposure is the only irreversible move in this plan.
5. Install the app on: `klappy/klappy.dev`, `klappy/outcomes-driven-development`, `klappy/oddkit`. Note the **Installation ID** from the install URL.
6. Worker secrets (never in chat): `wrangler secret put GH_APP_ID`, `GH_APP_INSTALLATION_ID`, `GH_APP_PRIVATE_KEY` on the oddkit worker (or a sibling auth worker if isolation is preferred).
7. Do **NOT** retire the manual PAT here. PAT retirement is gated on `github_token` passing validation in a fresh-context session — a failed build with no PAT is lockout with no wire. Once validated, rotate-and-retire. It is the final one.

## Steward's Implementation (next session, oddkit repo, owner promotes)

- **Build gate:** the 6B borrow evaluation (`klappy://canon/constraints/borrow-evaluation-before-implementation`) lands in this doc before any code. `@octokit/auth-app` and `universal-github-app-jwt` (Workers-compatible) are the obvious Borrow candidates for the entire JWT-mint-exchange-cache loop. Comparison rows for the table: `gh-scoped-creds` and `github-app-user-auth` (JupyterHub ecosystem) already do GitHub App + temporary scoped tokens for the same no-long-lived-credentials reason — different deployment shape (CLI/device-flow, not worker-minted MCP), but honest prior art for the mechanism. Six handrolls across six MCP servers; do not be the seventh.
- `github_token` action: RS256-sign a JWT (iss=App ID, exp=10m) → `POST /app/installations/{id}/access_tokens` → return `{token, expires_at}`. Optional params: `repositories`, `permissions` for down-scoped minting.
- **Cache spec:** expiry-aware, not flat-TTL — key on the requested `(repositories, permissions)` tuple and refresh when less than ~10 minutes remain on `expires_at`. A flat TTL serves near-dead tokens; a scope-blind cache key returns broad tokens to narrow requests, which is quiet privilege creep.
- Expose through the existing MCP server so the existing connector auth gates it — no new auth surface. **Load-bearing dependency:** the bearer-token middleware (`odd/handoffs/2026-05-16-mcp-bearer-token-middleware.md`) becomes the entire security boundary once this tool exists — anyone who can call the MCP server holds write tokens for three repos. Its strength is the system's strength.
- Boarding pass addition (same-PR per update discipline): "Git auth: call `github_token` at need; never request or accept long-lived credentials in chat."
- Telemetry: mint events visible in oddkit_telemetry like any tool call.

## Accepted Escalation Path — Stated, Not Hidden

Contents RW + Workflows RW is not a small power. Write access to `.github/workflows/` means the app can modify CI, and CI runs with the repo's own `GITHUB_TOKEN`. Administration being absent blocks settings, visibility, and credential changes via the API directly — but workflow-write is an indirect escalation path. It is accepted, not eliminated: CI changes land in PRs and audit logs under the `oddkit-steward[bot]` identity, where they are visible and attributable. "No Administration" must never be documented as "cannot escalate."

## If the Template Goes Public

**Naming (decided 2026-06-09):** the public template is **Git Repo Auth MCP** (`git-repo-auth-mcp`) — descriptive and registry-searchable, per the commodity-as-advertisement strategy; deliberately forge-agnostic ("Git Repo," not "GitHub") to clear GitHub's trademark restrictions everywhere and leave room for other forges. v1 is GitHub-App-only; the README carries a one-line "currently GitHub; forge-agnostic by design" so the name does not outrun the implementation. The GitHub App instance keeps its name — `oddkit-steward` — because the bot identity in audit logs is the seat's provenance, not the keychain's. Any brand name for the governance layer above the plumbing is deferred to the strategy meeting with the rest of #248.

Per `docs/explorations/credential-relay-as-product.md` (#248): if the relay ships as a self-host template, the escalation acknowledgment above becomes a **README disclosure requirement**, not just internal honesty. Strangers deploying a template that grants Contents+Workflows RW will read "no Administration" as "can't escalate" unless told otherwise. Self-host-first keeps the project out of the key-custody business; it does not exempt it from the honest-documentation business. Their keys, their worker — and their informed consent.

## Why This Shape

Substrate-as-wire (E0009) extended to credentials; charter reservations enforced by permission physics rather than trust (with the one acknowledged exception above); bot-identity provenance (`oddkit-steward[bot]`) separates the seat's commits from the captain's in every audit log; reversal is two clicks. Closest alternative considered: connecting a stock GitHub MCP connector via OAuth — zero build cost, but **as of June 2026** it lacks raw Git Data API bulk-tree flows, down-scoped minting, and the bot identity. Could complement, does not replace. **Retraction condition:** if the stock connector gains down-scoped app-token minting and bot identity, retire the custom tool and borrow — this is also the tripwire for the 6B evaluation's `waiting` verdicts.

---

*Amended 2026-06-09 post-challenge (oddkit_challenge, planning mode): rotation reframe, escalation-path acknowledgment, middleware dependency citation, cache spec, PKCS#8 runbook step, PAT-retirement sequencing gate, public-template disclosure requirement. Per E0010: findings go to the doc, not the debrief alone.*
