---
uri: klappy://projects/adding-a-project
title: "Adding a Project"
audience: public
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["projects", "contributing", "guide"]
relevance: routing
execution_posture: routing
---

# How to Add a Project

This repository treats projects as **evidence**, not outputs.

Projects are added only when an idea has reached a point where it is useful to share—either because it demonstrates a constraint, validates a tradeoff, or falsifies an assumption.

This document explains _when_ to add a project and provides a lightweight template to keep projects consistent without ceremony.

---

## When to Add a Project

A project is ready to be added when:

- the intent can be stated clearly in a few sentences
- the constraints shaping the work are understood
- at least one meaningful outcome can be demonstrated
- the project teaches something that isn’t already obvious from the Canon alone

Projects do **not** need to be complete, polished, or production-ready.
They do need to be honest.

---

## What a Project Is (and Is Not)

A project **is**:

- a proof of concept
- an experiment with clear boundaries
- a reference implementation

A project **is not**:

- a roadmap
- a client deliverable
- a long-term supported product

---

## Project Structure

Each project lives in its own folder under `/projects/` and must include a `README.md`.

Optional supporting files (code, diagrams, screenshots) may be included as needed.

Example:

```text
/projects/example-project/
  README.md
  src/
  screenshots/
```

---

## Project README Template

Use the following template for each project’s `README.md`.
Sections may be omitted if they are not relevant, but the order should be preserved.

```md
# Project Name

## Intent

What this project is trying to prove, explore, or demonstrate.

## Context

Why this project exists and what prompted it.

## Constraints

Key constraints that shaped the design (technical, environmental, human, etc.).

## Approach

High-level description of how the problem was approached.
Avoid step-by-step instructions.

## Tradeoffs

Important decisions made and what was intentionally _not_ optimized.

## Evidence

What can be shown to demonstrate outcomes:

- screenshots
- recordings
- working demos
- observable behavior

## What This Proves

What can reasonably be concluded from this project.

## What This Does Not Prove

Explicit limits of what should _not_ be inferred.

## Status

Exploratory | Validated | Abandoned | Superseded
```

---

## Evidence Expectations

Evidence should be:

- observable
- reproducible in principle
- proportional to the project’s maturity

Explanations alone are insufficient.

---

## Naming & Scope Guidance

- Prefer descriptive names over clever ones
- Keep projects small and focused
- One core idea per project

If a project grows beyond its original intent, consider splitting it.

---

## Updating or Retiring Projects

Projects may be:

- updated as understanding improves
- explicitly marked as abandoned
- superseded by newer work

Retired projects are still valuable as evidence of learning.

---

## Final Note

Projects exist to ground ideas in reality.

If a project doesn’t change how you think, it probably doesn’t belong here.
