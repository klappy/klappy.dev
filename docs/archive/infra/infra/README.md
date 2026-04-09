---
uri: klappy://infra
title: "Infrastructure"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["infra", "scripts", "tooling", "index"]
---

# Infrastructure

> Tooling, scripts, and configuration that power the repository.

## Description

The infra folder contains implementation tooling for the klappy.dev repository: build scripts, verification tools, compile plans, deployment configuration, and reusable prompts. These are execution artifacts, not philosophy—they implement the contracts defined in `/interfaces/` and the constraints defined in `/canon/`.

## Outline

- Contents
- Key Scripts
- Relationship to Other Folders

---

## Contents

| Folder | Purpose |
|--------|---------|
| `cloudflare/` | Cloudflare Pages deployment configuration |
| `compile/` | Pack compilation plans (JSON definitions) |
| `contracts/` | Build and deployment contracts |
| `prompts/` | Reusable prompt templates for agents |
| `scripts/` | Node.js tooling scripts |

---

## Key Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `export-book.js` | `node infra/scripts/export-book.js` | Export all docs to single markdown |
| `verify-content.js` | `npm run verify:content` | Check manifest vs disk alignment |
| `verify-contracts.js` | `npm run verify:contracts` | Verify build output contracts |
| `compile-pack.js` | `npm run compile` | Generate context packs |
| `sync-content.js` | `npm run sync` | Sync source docs to public/content |
| `attempt-cli.js` | `npm run attempt:*` | Attempt lifecycle commands |
| `audit-drift.js` | `npm run audit:drift` | Check for document drift |

---

## Relationship to Other Folders

| Folder | Relationship |
|--------|--------------|
| `/interfaces/` | Infra implements these contracts |
| `/canon/` | Infra enforces these constraints |
| `/docs/` | Infra is documented here |
| `/products/` | Infra builds and deploys these |

---

## See Also

- [Build Output Contract](contracts/build-output.md) — What builds must produce
- [Cloudflare Config](/docs/archive/CLOUDFLARE_CONFIG.md) — Authoritative deploy config
- [Compilation Targets](/docs/archive/compilation-targets.md) — Pack definitions
