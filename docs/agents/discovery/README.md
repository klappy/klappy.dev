---
uri: klappy://docs/agents/discovery/README
title: "Readme"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["docs", "agents", "discovery", "index"]
---

# Discovery Agent Behavior

Contracts and protocols for maturity-aware discovery sessions.

## Contents

| Type | File | Purpose |
|------|------|---------|
| Overlay | `overlays/discovery-role-overlay.md` | Behavioral contract for discovery agents |
| Protocol | `protocols/discovery-interview-protocol.md` | Adaptive interview decision tree |
| Recipe | `recipes/prd-discovery.s.recipe.json` | Composition manifest for PRD discovery |

## Quick Start

1. Load the overlay (defines WHO the agent is)
2. Follow the protocol (defines HOW to run discovery)
3. Use the recipe to compose with context packs

## Key Behaviors

The discovery overlay enforces:

- **Asset-first posture** — Ask for artifacts before opinions
- **Maturity gating** — Don't proceed without clarity on maturity target
- **Single pressure mode** — One pressure (ambiguity, contradiction, evidence, etc.) at a time
- **Refusal conditions** — Pause when asked to assume without evidence

## Testing

See the interview protocol for expected phase behaviors:
- Phase 0: Frame confirmation
- Phase 1: Asset inventory
- Phase 2: Pressure selection
- Phase 3: Iterative questioning
- Phase 4: Emit artifact (only when appropriate)

## Stability

All content marked `stability: experimental` (v0).

Run 2-3 real sessions before iterating.
