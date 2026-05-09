---
uri: klappy://canon/architecture
title: "Architecture"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["architecture", "index"]
relevance: routing
execution_posture: routing
---

# Architecture

Structural maps and layered models for the program. Architecture documents define how the system's parts fit together — the layers, the interfaces, the orthogonality contracts. Principles say *why* things are designed a certain way; architecture documents say *where each thing lives* and *how the layers compose*.

The directory exists so questions of the form "where should X live?" become layer-lookups against an explicit map rather than opinion-fights at design time. Architecture is the canon's structural reference.

---

## Contents

| File | Title |
|------|-------|
| `substrate-stack.md` | The Klappy Substrate Stack — OSI-Equivalent Layered Architecture for the Program |

---

## When to Add an Architecture Document

Add to `canon/architecture/` when the artifact is:

- A layered model defining where concerns live across the system.
- A structural diagram or topology with normative authority.
- An orthogonality contract — a specification of what each layer must and must not own.
- A composition reference for how parts of the program fit together.

Use `canon/principles/` when the artifact is a reasoning orientation. Use `canon/decisions/` when the artifact records a specific choice made and committed. Use `canon/patterns/` when the artifact is a repeatable design template applied at one layer.

The substrate stack is `architecture` rather than `principles` because it functions as a structural lookup the principles cite, not as a reasoning orientation in its own right.
