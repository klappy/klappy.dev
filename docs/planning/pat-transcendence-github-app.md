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
governs: "The plan to retire manual PAT creation/rotation in favor of app-minted, hour-lived, charter-scoped tokens served by the oddkit worker"
---

# Planning: PAT Transcendence — GitHub App + Worker-Minted Short-Lived Tokens

> Manual PATs make the operator the credential wire: minted by hand, pasted into transcripts, rotated after every session — the operator-as-wire antipattern E0009 retired for data, surviving in auth. The fix: a GitHub App (`oddkit-steward`) installed on the three repos with Contents/PR/Workflows write and NO Administration permission; its private key lives in Cloudflare Worker secrets; the worker exposes a `github_token` tool that signs a 10-minute JWT and returns a 1-hour installation token on demand. Rotation ceases to exist — expiry is the rotation. Transcript exposure collapses from a long-lived key to a sub-hour scoped token. The charter's reserved powers (settings, visibility, credentials) become mechanically unexceedable because they require the Administration permission the app is never granted. Kill switches: uninstall the app, or delete the worker secret. Out of scope: creating new user-owned repos (stays with the owner) and worker deploy secrets (already reserved).

## Owner's One-Time Runbook (~10 minutes)

1. GitHub → Settings → Developer settings → GitHub Apps → New GitHub App. Name: `oddkit-steward`. Webhook: off.
2. Repository permissions: Contents **RW**, Pull requests **RW**, Workflows **RW**, Metadata **R**. Nothing else. Explicitly NOT Administration.
3. Create app → note **App ID** → Generate **private key** (downloads a .pem).
4. Install the app on: `klappy/klappy.dev`, `klappy/outcomes-driven-development`, `klappy/oddkit`. Note the **Installation ID** from the install URL.
5. Worker secrets (never in chat): `wrangler secret put GH_APP_ID`, `GH_APP_INSTALLATION_ID`, `GH_APP_PRIVATE_KEY` on the oddkit worker (or a sibling auth worker if isolation is preferred).
6. Defer PAT retirement until **after** the Steward's Implementation below is shipped and the `github_token` tool is verified end-to-end (mint → push → PR) from a steward session. Only then rotate-and-retire the last manual PAT; it is the final one. Retiring earlier removes the only Git auth path before app-minted tokens can be requested.

## Steward's Implementation (next session, oddkit repo, owner promotes)

- `github_token` action: RS256-sign a JWT (iss=App ID, exp=10m) → `POST /app/installations/{id}/access_tokens` → return `{token, expires_at}`. Optional params: `repositories`, `permissions` for down-scoped minting. Cache ~50 minutes.
- Expose through the existing MCP server so the existing connector auth gates it — no new auth surface.
- Boarding pass addition (same-PR per update discipline): "Git auth: call `github_token` at need; never request or accept long-lived credentials in chat."
- Telemetry: mint events visible in oddkit_telemetry like any tool call.

## Why This Shape

Substrate-as-wire (E0009) extended to credentials; charter reservations enforced by permission physics rather than trust; bot-identity provenance (`oddkit-steward[bot]`) separates the seat's commits from the captain's in every audit log; reversal is two clicks. Closest alternative considered: connecting a stock GitHub MCP connector via OAuth — zero build cost, but loses raw Git Data API bulk-tree flows, down-scoped minting, and the bot identity. Could complement, does not replace.
