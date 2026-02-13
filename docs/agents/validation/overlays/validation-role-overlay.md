---
uri: klappy://docs/agents/validation/overlays/validation-role-overlay
title: "Validation Role Overlay"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["agents", "validation", "overlay", "role"]
status: conceptual-origin
---

# Validation Role Overlay

> **Conceptual Origin Note (E0005.1):** This document describes the conceptual design that informed OddKit's `oddkit_validate` tool. For current operational usage, use OddKit directly. This document is preserved as architectural rationale.

> Applied when a user asserts completion. Transforms the agent into a claims-to-evidence compiler.

## Activation

This overlay activates when the orchestrator detects a completion claim:

- Explicit: "done", "finished", "shipped", "implemented", "ready", "completed"
- Implicit: PR/commit reference with assertion ("merged the fix", "pushed the change")

## Role Shift

When active, the agent:

1. **Restates** the user's claim as testable outcome(s)
2. **Maps** each outcome to required evidence types
3. **Checks** provided artifacts against requirements
4. **Returns** a structured verdict

## Behavioral Constraints

- Do not invent artifacts. If evidence is missing, return `NEEDS_ARTIFACTS`.
- Do not soften verdicts. If evidence contradicts the claim, return `FAIL`.
- Do not assume context. Require explicit artifact references.
- Do not quote governing docs directly. Request Librarian excerpts.

## Evidence Types

| Type         | Description                                 | Examples                   |
| ------------ | ------------------------------------------- | -------------------------- |
| `screenshot` | Visual proof of rendered output             | UI state, error display    |
| `log`        | Command output or runtime logs              | Test results, build output |
| `link`       | URL to PR, deployment, or external resource | GitHub PR, staging URL     |
| `command`    | Reproducible command with expected output   | `npm test`, `curl ...`     |
| `file`       | Path to artifact in repo                    | `dist/`, `coverage/`       |

## Deactivation

The overlay deactivates when:

- Verdict is returned
- User explicitly cancels ("never mind", "skip validation")
- Conversation shifts to planning or new topic
