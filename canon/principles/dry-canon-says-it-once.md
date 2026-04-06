---
uri: klappy://canon/principles/dry-canon-says-it-once
title: "DRY — The Canon Says It Once, the Server Never Repeats It"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "DRY", "dont-repeat-yourself", "governance", "drift", "vodka-architecture", "design-smell"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/principles/vodka-architecture.md, canon/constraints/oddkit-prompt-pattern.md"
complements: "canon/principles/prompt-over-code.md, canon/values/axioms.md"
governs: "All governance rule placement decisions in this program"
status: active
---

# DRY — The Canon Says It Once, the Server Never Repeats It

> If a governance rule exists in the knowledge base, the server must not re-encode that rule in its own logic. Every duplicated rule is a drift surface — the canon version and the server version will eventually disagree, and the server version will win silently because it executes first. oddkit proves this: when the Writing Canon checklist was added to the knowledge base, preflight and validate surfaced it automatically — zero server code changed. Governance is fetched at runtime, never baked in.

---

## Summary — Duplication Creates Silent Drift

Don't Repeat Yourself in vodka architecture (`canon/principles/vodka-architecture.md`) means one thing precisely: governance lives in the knowledge base, and the server retrieves it. The server never contains governance.

The danger of duplication is not redundancy — it is divergence. When the same rule exists in two places, updates hit one and miss the other. The server version executes before the canon version is even consulted. The canon says one thing; the system does another. Nobody notices until the gap causes a failure, and by then the drift has compounded across every interaction since the divergence began.

---

## Smell Test — How to Detect a DRY Violation

- **Governance strings in server code.** If the server source contains phrases like "always check," "must include," or any natural-language rule that also exists in a canon document, the rule is duplicated.
- **Server behavior that doesn't change when the canon changes.** If you update a governance article and the system's behavior stays the same, something in the server is overriding or duplicating the canon's version.
- **System prompt fragments hardcoded in deployment.** If the creed, axioms, or any governance text is baked into the server's system prompt template rather than fetched from the canon at runtime, it's DRY-violating duplication. This is the specific anti-pattern `canon/constraints/oddkit-prompt-pattern.md` was written to prevent.
- **Two documents saying the same thing in different words.** Duplication within the canon itself is also a DRY smell — it creates the same drift risk, just between documents instead of between document and code.

---

## Failure Modes — What Breaks When DRY Is Violated

**Silent policy drift.** The server enforces rule version 1 while the canon has evolved to version 3. Users experience governance that contradicts the published canon. Trust erodes because the system says one thing and does another — a direct violation of Axiom 1 (Reality Is Sovereign).

**Update blindness.** Operators update the canon expecting the system to change. It doesn't. They update it again, more aggressively. Still nothing. Eventually they stop trusting the canon as the source of truth and start editing server code directly — which compounds the drift.

**Forensic confusion.** When something goes wrong, the investigation asks "what are the rules?" The canon says X. The server does Y. Which is authoritative? In DRY-violating systems, the answer is "whichever executes first" — which is always the server, making the canon decorative.

---

## What Does NOT Count as a DRY Violation

- **The server knowing about markdown structure.** Parsing frontmatter, extracting sections, indexing by tags — this is structural knowledge about the *format*, not the *content*. The server must understand how documents are organized. It must not understand what they say.
- **Retrieval algorithm parameters in server config.** BM25 weighting, result limits, cache TTLs — these are infrastructure settings, not governance rules. They shape how the canon is accessed, not what the canon says.
- **The server's own operational logic.** Rate limiting, error handling, authentication — these are server concerns, not governance duplication.

---

## Required Response When Detected

1. **Identify the authoritative version.** It's always the canon. If the canon version is outdated, update the canon — not the server.
2. **Remove the server-side duplicate.** Replace hardcoded governance with a runtime fetch from the canon.
3. **Verify with a change test.** Update the canon document and confirm the system's behavior changes without any server deployment. If it doesn't, the duplication isn't fully removed.
4. **Add a regression marker.** If the duplication crept in once, it will try again. Note the pattern in the relevant governance doc so future reviews catch it.

---

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the parent design pattern
- [Prompt Pattern for oddkit-Powered Applications](klappy://canon/constraints/oddkit-prompt-pattern) — governance fetched at runtime, never hardcoded
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — the sibling principle: governance in documents, not code
