---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://docs/appendices/lane-implementation-surfaces
title: "Lane-Scoped Implementation Surfaces"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "lanes", "deployment", "contract", "build"]
---

# Lane-Scoped Implementation Surfaces

> Each lane owns its own source, build output, and deploy root for epistemic independence.

## Description

In the multi-lane PRD model, each lane MUST have its own implementation surface under `/products/<lane>/` with src, dist, and no shared repo-root directories. Nuking is lane-scoped and MUST NOT affect other lanes, Canon, docs, or attempts. Lane-scoped surfaces restore epistemic independence—if a lane succeeds, you can know it succeeded because the intent was correct, not because of residue from another lane.

## Outline

- Summary
- Locked Folder Contract
- Build Output Contract (Pages-style)
- Attempt Independence
- Deployment Isolation (Cloudflare)
- Promotion Model
- Why This Exists

---

## Content

## Summary

In the multi-lane PRD model, each lane is an independent product.

Therefore each lane MUST have its own implementation surface:
- its own source directory
- its own build output directory
- its own deploy root

No lane may rely on a shared, repo-root `/src` or `/dist`.

This prevents cross-lane contamination and restores independence of attempts.

---

## Locked Folder Contract

Each lane owns its implementation under:

```
/products/<lane>/
  src/          # lane implementation source (disposable)
  dist/         # lane build output (never committed)
```

`<lane>` is one of:
- `website`
- `ai-navigation`
- `agent-skill`

The repo-root directories `/src` and `/dist` are NOT product surfaces.

---

## Build Output Contract (Pages-style)

For any lane deployed via Cloudflare Pages:

- Build output MUST be `products/<lane>/dist/`
- `products/<lane>/dist/index.html` MUST exist after build

The lane may use any stack as long as it satisfies the lane's deploy contract.

---

## Attempt Independence

Attempts MUST be able to start from a blank slate without affecting other lanes.

Therefore nuking is lane-scoped:

- `attempt:nuke --lane <lane>` deletes ONLY:
  - `products/<lane>/src/`
  - lane-local config files inside `products/<lane>/` (if any)

Nuking MUST NOT delete:
- `/canon/**`
- `/docs/**`
- `/attempts/**`
- other lanes under `/products/**`

---

## Deployment Isolation (Cloudflare)

Each lane SHOULD be deployed as a separate Cloudflare Pages project.

For each Pages project:
- Root directory: `products/<lane>`
- Build command: `npm run build -- --lane <lane>` (or lane-local build)
- Build output: `dist`
- Production branch: `prod`
- Preview deployments: enabled for all non-production branches

This allows all lanes to share one git repository and one production branch while remaining operationally independent.

---

## Promotion Model

Promotion is lane-scoped.

Promoting a champion for lane `<lane>` updates ONLY:
- `products/<lane>/**` (implementation)
- the attempt artifacts for that lane

Promotion MUST NOT modify other lanes.

---

## Why This Exists

A shared `/src` makes outcomes non-attributable.

If a lane succeeds, you cannot know whether it succeeded because:
- the intent was correct, or
- residue from another lane made it work.

Lane-scoped implementation surfaces restore epistemic independence.
