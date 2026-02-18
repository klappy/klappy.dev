---
uri: klappy://docs/oddkit/impl-guide-posture-gate
title: "Implementation: Surface Guide Posture for Public-Facing Deliverables"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "implementation", "guide-posture", "public", "voice", "positioning"]
epoch: E0005
date: 2026-02-17
derives_from: "canon/constraints/guide-posture.md"
complements: "docs/oddkit/IMPL-writing-canon-gate.md"
---

# Implementation: Surface Guide Posture for Public-Facing Deliverables

> When the deliverable is public-facing — website copy, voice agent prompts, documentation with `audience: public`, tool descriptions, onboarding flows, or marketing content — oddkit's preflight and validate actions must surface Guide Posture (`canon/constraints/guide-posture.md`) as a constraint and check for the three posture tests: the hero is the user, content opens with their pain, and the system is revealed as a plan. This parallels the Writing Canon gate for document structure but governs voice and positioning instead.

-----

## Summary — oddkit Must Enforce Posture, Not Just Structure

The Writing Canon gate (`docs/oddkit/IMPL-writing-canon-gate.md`) ensures documents meet progressive disclosure requirements. Guide Posture requires a parallel gate for a different dimension: not *how the document is structured* but *whose story it tells*. A document can pass every Writing Canon tier and still break guide posture by leading with the system instead of the user's pain. Both gates must fire for public-facing deliverables — Writing Canon for structure, Guide Posture for voice.

-----

## Detection — When Guide Posture Applies

Guide Posture should be surfaced as a constraint when any of the following are true:

The deliverable includes content with `audience: public` in frontmatter.

The deliverable targets a public-facing surface: klappy.dev, odd.klappy.dev, voice agent prompts, tool descriptions visible to end users, or onboarding copy.

The deliverable involves writing marketing copy, landing page content, product descriptions, or call-to-action text.

The deliverable involves guiding a user in building their own product, messaging, or positioning — the recursive application.

-----

## Required Change 1 — Preflight Must Detect Public-Facing Deliverables

When an agent describes work that involves creating or editing public-facing content, preflight should:

Include `canon/constraints/guide-posture.md` in the returned constraints.

Include the three posture tests as part of the definition of done: (1) hero is the user, (2) opens with their pain, (3) system revealed as plan.

If the deliverable is also a document in `canon/`, `odd/`, or `docs/`, both the Writing Canon gate and the Guide Posture gate should fire.

-----

## Required Change 2 — Validate Must Check Posture Tests

When an agent claims completion on a public-facing deliverable, validate should check:

**Hero test:** Does the content center the user's experience, or does it center the system? If the opening paragraph describes what oddkit/ODD *is* before describing what the user *struggles with*, the test fails.

**Pain-first test:** Does the first user-visible content name a problem the user recognizes? Landing pages, voice agent openings, doc introductions, and tool descriptions should all lead with the user's reality.

**Plan reveal test:** When the system is introduced, is it framed as a solution to a problem already established? Or is it presented as something the user needs to learn?

If any of these fail, validate should return `NEEDS_ARTIFACTS` with specific guidance on which posture test was violated and how to fix it.

-----

## Required Change 3 — Challenge Must Include Guide Posture for Public Content

When an agent uses `oddkit challenge` on public-facing copy, proposals, or positioning decisions, the challenge function should surface Guide Posture as a relevant constraint. This enables real-time posture checking during drafting, not just at validation.

-----

## Required Change 4 — Search Must Surface Guide Posture for Relevant Queries

Searches involving terms like "public," "website," "landing page," "voice agent," "onboarding," "marketing," "positioning," or "copy" should rank `canon/constraints/guide-posture.md` as a relevant result. The document's tags already support this (`public`, `positioning`, `voice`, `guide-hero`), but relevance scoring should treat it as a governing constraint, not just a related document.

-----

## Interaction with Writing Canon Gate

For public-facing documents that live in `canon/`, `odd/`, or `docs/`, both gates fire:

Writing Canon checks structure: blockquote, summary, descriptive headers, progressive disclosure.

Guide Posture checks voice: hero is the user, opens with pain, system revealed as plan.

A document can fail one gate and pass the other. Both must pass for the deliverable to be complete.

-----

## Recursive Application — Guiding Users' Products

When the work involves helping a user build their own product, messaging, or positioning, Guide Posture applies recursively. The three tests should be adapted:

Their customer is the hero, not their product.

Their product opens with their customer's pain.

Their solution is revealed as a plan their customer recognizes.

Preflight should surface this recursive dimension when the context involves product consulting, coaching, or content strategy for users.

-----

## Acceptance Criteria — How to Know This Is Done

- [ ] `oddkit preflight` for public-facing content returns Guide Posture as a constraint
- [ ] `oddkit preflight` for public documents returns both Writing Canon and Guide Posture
- [ ] `oddkit validate` for public-facing content checks the three posture tests
- [ ] `oddkit challenge` on public-facing copy surfaces Guide Posture as a relevant constraint
- [ ] A landing page draft that leads with system description fails validation with clear guidance
- [ ] A voice agent prompt that opens with "Let me tell you about ODD" fails validation
- [ ] Recursive application is surfaced when context involves user product development

-----

## Indexing and Visibility Checklist

The following changes make Guide Posture discoverable and enforceable across the system:

- [ ] Add `canon/constraints/guide-posture.md` to the repo at the correct path
- [ ] Add Guide Posture to the Constraints README outline (`canon/constraints/README.md`)
- [ ] Add Guide Posture to the Operating Constraints list in the README
- [ ] Add a `complements` reference from `docs/oddkit/positioning.md` back to Guide Posture
- [ ] Confirm oddkit search returns Guide Posture for queries like "public voice positioning website"
- [ ] Confirm oddkit preflight returns Guide Posture for public-facing implementation descriptions
- [ ] Update voice agent system prompts to reference Guide Posture as a governing constraint
