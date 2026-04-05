---
uri: klappy://canon/principles/prompt-over-code
title: "Prompt Over Code — Fully Programmable Governance Without Changing the Server"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "prompt-over-code", "convention-over-configuration", "governance", "programmable", "vodka-architecture", "design-smell"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/principles/vodka-architecture.md, docs/appendices/convention-requires-an-enforcer.md, canon/constraints/oddkit-prompt-pattern.md"
complements: "odd/prompt-architecture.md, canon/principles/ritual-is-a-smell.md, canon/principles/dry-canon-says-it-once.md"
governs: "All governance rule implementation decisions in this program"
status: active
---

# Prompt Over Code — Fully Programmable Governance Without Changing the Server

> oddkit's entire governance model is prompt over code in production. The Writing Canon gate, the Identity of Integrity creed, the relational sensitivity constraint, the guide posture rules — all are markdown documents in the knowledge base, not code paths in the server. When a new governance constraint is needed, the response is to write an article, not deploy code. The server's generic enforcement mechanisms (gate, preflight, validate) surface *whatever the canon says* at the right moment. Governance is fully programmable by writing documents — no deployment, no code review, no server restart.

---

## Summary — Write a Document, Change the Behavior

Prompt over code is vodka architecture's (`canon/principles/vodka-architecture.md`) most distinctive property, and oddkit is its proof of concept. The principle: governance belongs in prompts and documents, not in application code. The server is the enforcer. The canon is the law. Changing the law means writing a document, not changing the enforcer.

This is the principle that `docs/appendices/convention-requires-an-enforcer.md` sharpens: convention alone is insufficient because conventions are optional. A governance document that says "always check the Writing Canon checklist" is a convention. oddkit's preflight action that surfaces that document at the right moment is the enforcer. But the enforcer is generic — it enforces whatever the canon says, not specific rules hardcoded into the server.

The practical implication is radical: the system's governance is fully programmable by anyone who can write a markdown file. No TypeScript. No deployment pipeline. No server restart. Commit a governance article and oddkit surfaces it automatically at the correct epistemic moment.

---

## Smell Test — How to Detect a Prompt Over Code Violation

- **Opening the server codebase to add a governance rule.** The most direct violation. If the response to "we need a new constraint" is "let me add a check in the server code," the architecture has failed. The response should be "let me write a governance article."
- **PRs that add behavioral logic for specific policies.** If a pull request to the server repo contains `if` branches that enforce domain-specific rules, governance has leaked into code.
- **Governance that requires deployment to change.** If updating a rule requires a server deployment rather than a canon commit, the rule is in the wrong layer.
- **Non-developers unable to modify governance.** If only people who can write TypeScript can change the system's rules, governance is code-locked. Prompt over code means governance is document-locked — anyone who can write markdown can change the rules.
- **"We'll need to update the server when we add that rule."** This sentence is the smell. The server should never need to know about specific rules.

---

## Failure Modes — What Breaks When Prompt Over Code Is Violated

**Governance becomes invisible.** Rules buried in code are discoverable only by reading code. They don't appear in search results, aren't surfaced by orient, and can't be challenged or validated. The governance exists but is operationally invisible to the agents and humans who need to follow it.

**Deployment coupling.** Every governance change becomes a deployment event. Deployments have risk, require testing, and create downtime windows. Governance changes should be instant (commit to canon) not ceremonial (PR → review → merge → deploy → verify).

**Knowledge concentration.** When governance lives in code, only developers understand the rules. Domain experts — the people who should own governance — are locked out. The system becomes developer-governed by default, not domain-expert-governed by design.

**DRY violation cascade.** Code-based governance inevitably duplicates canon-based governance, triggering silent drift (`canon/principles/dry-canon-says-it-once.md`). The canon says the rule one way. The code enforces it another way. Users experience the code version. The canon becomes decorative.

---

## What Does NOT Count as a Prompt Over Code Violation

- **Server code for epistemic primitives.** The search algorithm, encoding format, gate mechanism, retrieval logic — these are infrastructure that *implements* the enforcement, not governance that *defines* the rules. BM25 scoring belongs in code. What gets scored belongs in the canon.
- **Server configuration for operational parameters.** Cache TTLs, rate limits, API keys, deployment settings — these are operational infrastructure, not governance rules.
- **Bug fixes in the server.** If search returns wrong results due to a parsing bug, the fix is code. If search returns wrong results because the governance docs are ambiguous, the fix is a document.

---

## Required Response When Detected

1. **Write the governance article.** Express the rule as a document in the knowledge base with the same structure as existing governance: clear assertion, smell test, failure modes, required response.
2. **Verify generic surfacing.** Confirm that oddkit's existing actions (gate, preflight, validate, orient) surface the new article at the right moment without server changes.
3. **If surfacing fails, fix the server generically.** If the existing actions can't surface the new rule, the fix is improving the generic surfacing mechanism — not adding a domain-specific code path. The improvement should benefit all governance articles, not just this one.
4. **Remove the code-based governance.** If governance existed in code before, remove it. Don't leave it as a "backup" — that creates the DRY violation it was meant to prevent.

---

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the parent design pattern
- [Convention Requires an Enforcer](klappy://docs/appendices/convention-requires-an-enforcer) — why convention alone is insufficient
- [Prompt Pattern for oddkit-Powered Applications](klappy://canon/constraints/oddkit-prompt-pattern) — governance fetched at runtime, never hardcoded
- [DRY — The Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once) — the sibling principle prompt over code protects
- [Prompt Architecture](klappy://odd/prompt-architecture) — how intent scales without monolithic prompts
