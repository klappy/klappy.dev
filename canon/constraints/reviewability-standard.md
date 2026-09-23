---
uri: klappy://canon/constraints/reviewability-standard
title: "Reviewability Standard — Nothing Goes to the Captain for Review Without a Low-Friction Way to Review It"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraint", "reviewability", "legibility", "review", "preview-url", "staging", "bottleneck-respect", "delivery", "e0010"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/constraints/verification-and-evidence.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, docs/appendices/online-evidence.md, docs/appendices/deploy-evidence.md, docs/appendices/epoch-10.md"
complements: "canon/constraints/per-environment-worker-projects.md, canon/constraints/visual-proof.md"
governs: "Every hand-off of work to the captain (or any reviewer) that is presented for review"
status: active
target_repo: "outcomes-driven-development"
---

# Reviewability Standard — Nothing Goes to the Captain for Review Without a Low-Friction Way to Review It

> Companion to the legibility standard. The legibility standard makes work *readable*; the reviewability standard makes it *reviewable* — with as little friction as making it legible. Nothing may be handed to the captain "for review" without a concrete, low-friction way to actually review it: a live preview URL, a staging link, a rendered artifact. It is a failure to ask the captain to review something that requires him to put on a developer hat and spend thirty minutes standing up an environment just to see it. Crew supplies the reviewable surface as part of delivery. Captain, verbatim: "So freaking annoying to be asked to review something and there be absolutely no thought into how I would review it." Never again.

## Simple Rules

- **Use when:** Use when handing any work to a human reviewer as "ready for review": a running system, document, design, visual, or other artifact someone must see to approve.
- **Skip when:** Skip for purely conversational answers with no artifact, work the reviewer has explicitly said they will review from source, and internal intermediate steps not yet presented for review.
- **Stop when:** Stop once the hand-off includes a surface the reviewer can reach in roughly one tap with no local build, or states explicitly why no surface is possible.
- **Keep going when:** Keep going while the hand-off offers only a branch name, raw source, reproduce-it-yourself instructions, or a localhost proof, or defers the review link to a follow-up.
- **Where:** Every review hand-off; running systems → deployed staging URL (stateful workers: the staging project per `canon/constraints/per-environment-worker-projects.md`); documents, designs, visuals → a rendered, linkable version.
- **Who:** Whoever delivers the work produces the reviewable surface; the reviewer, whose attention is the bottleneck, is never asked to build, install, or configure anything to see it.
- **Why:** Review spends the scarcest attention, and a request without a surface shifts the whole setup cost onto the reviewer, so the delivery is not done (see Why This Is Necessary).
- **What:** A delivery constraint, companion to the legibility standard: anything handed over for review ships with a low-friction reviewable surface — a live preview URL, a staging link, or a rendered artifact.
- **How:** Apply the Operating Constraints and Defaults sections, then check the hand-off against Verification and Failure Modes; exclusions are in When This Does Not Apply.

---

## Description

Under Epoch 10, the captain's attention is the system's bottleneck, and review is where that attention is spent. A review request that ships without a way to review inverts the cost: it moves the entire setup burden — clone the repo, install dependencies, configure secrets, run a local server, reproduce state — onto the one person whose time is scarcest. The work may be done, but the *delivery* is not, because the reviewable surface is part of the deliverable, not an optional extra.

The legibility standard governs whether work can be *understood*: clear structure, honest summaries, progressive disclosure. The reviewability standard is its companion on the axis of *access*: whether the reviewer can reach the actual thing with a tap, not a build. Legible-but-unreachable still fails the captain; the two standards travel together. Where the artifact is a running system, "reviewable" means a live URL on a staging environment — which for stateful workers is exactly the staging project mandated by `canon/constraints/per-environment-worker-projects.md`. Where the artifact is a document, a design, or a visual, "reviewable" means a rendered, linkable version, per `canon/constraints/visual-proof.md` and the online-evidence family.

This is not a request for more polish. It is a requirement that delivery include the surface on which the work can be seen, so the cross-check the captain owes the crew — and the crew owes the captain — can actually run.

## Operating Constraints

- MUST supply a concrete, low-friction reviewable surface with anything handed over for review — a live preview URL, a staging link, or a rendered artifact
- MUST NOT ask the captain to build, configure, or stand up an environment merely to see the work
- MUST place a running-system review on a staging surface, not a local-only build (for stateful workers, the staging worker per the per-environment-worker-projects constraint)
- MUST make the reviewable surface part of the delivery, produced by crew, not deferred to the reviewer
- MUST state explicitly when no reviewable surface is possible, and why, rather than handing over an unreviewable artifact in silence

## Defaults

- Prefer a tappable link over instructions to reproduce
- Prefer a rendered artifact over raw source when the review is about the rendered result
- Assume the reviewer will not run code locally; make the online surface the default review path
- When in doubt about what "reviewable" means for a given artifact, produce the surface a non-developer could open in one tap

## Failure Modes

- **Review Without a Surface**: "Can you review this?" with nothing but a branch name or a pile of source
- **Developer-Hat Tax**: A review that silently requires cloning, installing, and configuring before anything can be seen
- **Local-Only Proof**: Offering a localhost screenshot or "it runs on my machine" where a staging URL was owed
- **Legible but Unreachable**: Work that reads clearly but has no place the reviewer can actually go to exercise it
- **Deferred Surface**: Treating the reviewable link as a follow-up instead of part of the same delivery

## Verification

- The hand-off includes a concrete way to review — a URL or rendered artifact — reachable without a local build
- The reviewer can reach the actual work in roughly one tap, not thirty minutes of setup
- For running systems: the surface is a deployed/staging URL, not a local build
- If no surface is possible, the limitation and its reason are stated explicitly in the hand-off

## When This Does Not Apply

- Purely conversational answers with no artifact to review
- Work the captain has explicitly said he will review from source
- Internal crew-to-crew intermediate steps not yet presented as "ready for review"

## Why This Is Necessary

The captain said it plainly: being asked to review something with no thought given to *how* he would review it is the friction that makes review feel like punishment for the reviewer. That friction lands squarely on the bottleneck. The respect the checklist encodes is not only in doing the work — it is in delivering it so the person reviewing it can see it immediately. A false or effortful "ready for review" costs more than an honest "here is the link, here is what to look at." The reviewable surface is the crew's job, every time.

## See Also

- [Per-Environment Worker Projects](/canon/constraints/per-environment-worker-projects.md) — where the staging URL comes from for stateful workers
- [Verification & Evidence](/canon/constraints/verification-and-evidence.md)
- [Visual Proof Standards](/canon/constraints/visual-proof.md)
- [Online Evidence Requirement](/docs/appendices/online-evidence.md)
- [Mode Discipline and Bottleneck Respect](/canon/constraints/mode-discipline-and-bottleneck-respect.md)
- [Epoch 10 — Flight Crew](/docs/appendices/epoch-10.md)
- [Constraints](/canon/constraints/README.md)
