---
uri: klappy://docs/appendices/online-evidence
title: Online Evidence Requirement
audience: docs
exposure: nav
tier: 2
voice: authoritative
stability: stable
tags: ["evidence", "cloudflare", "preview", "attempts", "validation"]
---

# Online Evidence Requirement

> Attempts are invalid unless output and evidence are viewable online without running code locally.

## Description

Local builds are allowed during development but do not satisfy the Definition of Done—every attempt must provide a Cloudflare Preview URL and an Evidence URL. The default mechanism is Cloudflare Pages branch preview deployments with attempt branches pushed to origin. Evidence must be exposed via a static hub path at `/_evidence/` or a dedicated Pages project, documented in the lane PRD.

## Outline

- Summary
- Required Online Proof
- Required Mechanism (Default)
- Required Evidence Artifact
- Non-Goals
- Related Documents

---

## Content

## Summary

An attempt is not considered valid unless its output and evidence are viewable online without the author running code locally.

Local builds are allowed during development, but they do not satisfy the Definition of Done for an attempt.

## Required Online Proof

Every attempt MUST provide:

1. **Cloudflare Preview URL** for the attempt branch.
2. **Evidence URL** (an online URL that displays the attempt's evidence artifact).

If either URL is missing, the attempt is **INVALID**.

## Required Mechanism (Default)

The default mechanism is Cloudflare Pages branch preview deployments:

- Each attempt MUST push its branch to `origin`.
- Cloudflare Pages MUST be configured to deploy preview builds for all branches.
- The attempt branch name MUST include the lane so preview URLs are traceable.

## Required Evidence Artifact

Each attempt MUST produce an evidence markdown file:

`/products/<lane>/attempts/prd-vX.Y/attempt-NNN/EVIDENCE.md` (or run-scoped equivalent during `_runs/`)

The repo MUST expose evidence online via one of:

- A static "evidence hub" path served by the lane site at `/_evidence/`, OR
- A dedicated Cloudflare Pages project serving the lane's attempts as static content.

The chosen mechanism must be documented in the lane PRD and enforced in kickoff.

Note: Attempts are lane-contained. Root `/attempts/**` is legacy (read-only).

## Non-Goals

- This does not require production promotion.
- This does not require perfect UI polish.
- It requires that a human can click a link and see the output and evidence.

## Related Documents

- Definition of Done: `/canon/constraints/definition-of-done.md`
- Visual Proof Standards: `/canon/constraints/visual-proof.md`
- Attempt Lifecycle: `/docs/appendices/attempt-lifecycle.md`
- Preview Guide: `/docs/infra/PREVIEW.md`
