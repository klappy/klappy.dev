---
uri: klappy://canon/principles/consistency-same-pattern-every-time
title: "Consistency — Same Pattern, Every Knowledge Base, Every Time"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "consistency", "portability", "MCP", "interface", "vodka-architecture", "design-smell"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/principles/vodka-architecture.md, canon/values/axioms.md"
complements: "docs/architecture/epistemic-os-layers.md, canon/principles/kiss-simplicity-is-the-ceiling.md"
governs: "All MCP server interfaces and knowledge base serving patterns in this program"
status: active
---

# Consistency — Same Pattern, Every Knowledge Base, Every Time

> The server behaves identically regardless of what knowledge base it serves. Same MCP interface. Same retrieval algorithm. Same encoding format. Same gate mechanism. oddkit proves this: it serves a 400+-document software architecture canon and a 26-document oral theology corpus through the identical interface without modification. Inconsistency — special cases, domain-specific endpoints, knowledge-base-specific behavior — is the earliest symptom of the Flavored Vodka anti-pattern.

---

## Summary — Consistency Makes the Pattern Portable

In vodka architecture (`canon/principles/vodka-architecture.md`), consistency is the property that makes the pattern portable. Any MCP-compatible tool that learns to work with one oddkit-served knowledge base works with all of them without adaptation. The tool doesn't need to know whether it's querying theology or software architecture — the interface is the same.

The moment a server introduces a special case for a specific knowledge base, it has acquired a flavor. It is no longer vodka. Domain-specific behavior belongs in the knowledge base documents themselves: governance articles, gate rules, preflight constraints. The server surfaces them generically.

---

## Smell Test — How to Detect a Consistency Violation

- **"But for THIS knowledge base we need..."** The most common consistency smell. Every special-case argument sounds reasonable in isolation. Collectively, they make the server opinionated.
- **Domain terms in server code.** If the server source contains words like "Bible," "pastoral," "legal," or any domain-specific vocabulary, it has acquired knowledge it shouldn't have.
- **Different behavior for different `canon_url` values.** If the server checks which repo it's serving and adjusts behavior accordingly, consistency is violated. The server should be blind to content.
- **Onboarding friction for new knowledge bases.** If adding a new KB requires server-side configuration, custom endpoints, or domain-specific setup beyond pointing at a repo URL, the interface isn't consistent.
- **Tools that work with one KB but break with another.** If an agent workflow built against the software canon fails when pointed at the theology KB, the interface promised consistency it didn't deliver.

---

## Failure Modes — What Breaks When Consistency Is Violated

**Portability collapse.** The entire value proposition of vodka architecture — serve any knowledge base through the same interface — disintegrates. Each KB becomes a custom integration. The server stops being infrastructure and becomes a collection of domain-specific adapters.

**Tool fragility.** Agents and integrations built against one KB's behavior fail when pointed at another. The interface contract is no longer trustworthy. Developers stop building against the interface and start building against specific KBs.

**Combinatorial maintenance.** Each special case multiplies the testing surface. N knowledge bases × M special cases = a maintenance burden that grows geometrically. The single maintainer (`canon/principles/maintainability-one-person-indefinitely.md`) cannot sustain it.

---

## What Does NOT Count as a Consistency Violation

- **Knowledge bases having different content, tags, and structure.** That's expected diversity — the whole point is that different domains produce different documents. The server serves them identically.
- **Different governance rules across KBs.** A theology KB might have strict citation requirements while a strategy KB doesn't. That's governance diversity expressed in the *documents*, not the *server*. The server surfaces both generically.
- **Performance differences based on KB size.** A 400-document KB will naturally be slower to search than a 26-document one. Performance scaling is not a consistency violation — it's physics.

---

## Required Response When Detected

1. **Identify the special case.** What domain-specific behavior exists in the server? Name it precisely.
2. **Move it to the knowledge base.** Express the special case as a governance document, gate rule, or preflight constraint within the KB that needs it. The server surfaces it generically — the KB owns the specificity.
3. **Verify portability.** Point the server at a different KB and confirm the same interface works without modification.
4. **Remove the server-side special case.** If the governance document approach works, delete the server code. Don't leave it commented out — remove it entirely.

---

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the parent design pattern (see: Flavored Vodka anti-pattern)
- [Epistemic OS Layers](klappy://docs/architecture/epistemic-os-layers) — the four-layer separation that consistency enables
- [KISS — Simplicity Is the Ceiling](klappy://canon/principles/kiss-simplicity-is-the-ceiling) — special cases are complexity in disguise
