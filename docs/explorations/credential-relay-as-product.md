---
uri: klappy://docs/explorations/credential-relay-as-product
kind: docs
title: "Exploration: Credential Relay as Product — Reusable Yes, Billable Deferred to Strategy"
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: draft
tags: ["exploration", "product", "auth", "github-app", "relay", "mit", "licensing", "strategy", "6b"]
epoch: E0010
date: 2026-06-09
derives_from: "docs/planning/pat-transcendence-github-app.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/principles/maintainability-one-person.md"
governs: "Nothing yet — exploration captured for the owner's strategy and positioning meeting, alongside the deferred ODD license decision"
---

# Exploration: Credential Relay as Product — Reusable Yes, Billable Deferred to Strategy

> Raised at the close of the E0010 declaration day: should the GitHub App token relay be built reusable, MIT'd, and offered as a billable hosted service? Settled tonight: build it reusable regardless — genericizing costs ~nothing. Deferred to the strategy meeting (with the ODD license decision it is secretly part of): the commercial and licensing questions. Honest reads recorded now so the meeting starts ahead: the minting primitive is commodity (GitHub Actions ephemeral tokens, Octokit, an emerging managed-agent-auth field — 6B likely scores the plumbing Borrow, not Beget); the differentiated asset is charter-scoped agent identity — MCP-native minting, permission physics enforcing a human/AI working agreement, bot provenance, telemetry — i.e., the flight deck, not the keychain. A hosted relay custodies strangers' App private keys: breach-one-lose-all liability that collides with maintainability-one-person; self-host-first (their keys, their worker, deploy button) avoids custody entirely, with paid value living in the governance layer, support, or panel. MIT is compatible with license-never-assign (permissive licensing is not assignment), but whether permissive is *right* depends on where the moat sits — MIT the on-ramp, not the moat. Gate any build on a real 6B table.

## Questions for the Strategy Meeting

1. Where is the moat: relay (commodity) vs. governance layer (flight deck)? Pricing follows the answer.
2. Custody: is hosting other people's private keys ever acceptable for a one-person-maintainable system, at any price?
3. License split: MIT the relay template + something protective for the governance layer? Folds into the ODD license decision.
4. 6B borrow table against: GitHub Actions tokens, Octokit app patterns, Composio/Arcade/Nango-class managed agent auth, Vault-class brokers.
5. Smallest test (per challenge discipline): publish the self-host template, watch adoption, decide hosted later.
