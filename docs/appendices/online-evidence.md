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

Local builds are allowed during development but do not satisfy the Definition of Done—every attempt must provide a Cloudflare Preview URL and an Evidence URL. The default mechanism is Cloudflare Pages branch preview deployments with attempt branches pushed to origin. Evidence must be exposed via a static hub path at `/_evidence/` or a dedicated Pages project.

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
- The attempt branch name MUST be traceable to the work being done.

## Required Evidence Artifact

Each attempt MUST produce an evidence markdown file:

An evidence markdown file (e.g., `EVIDENCE.md`) scoped to the attempt.

The repo MUST expose evidence online via one of:

- A static "evidence hub" path served at `/_evidence/`, OR
- A dedicated Cloudflare Pages project serving attempts as static content.

## Non-Goals

- This does not require production promotion.
- This does not require perfect UI polish.
- It requires that a human can click a link and see the output and evidence.

## Related Documents

- Definition of Done: `/canon/constraints/definition-of-done.md`
- Visual Proof Standards: `/canon/constraints/visual-proof.md`
- Attempt Lifecycle: `/docs/archive/attempt-lifecycle.md` (archived)
- Preview Guide: `/docs/archive/PREVIEW.md` (archived)
