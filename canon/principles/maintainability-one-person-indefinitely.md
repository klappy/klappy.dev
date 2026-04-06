---
uri: klappy://canon/principles/maintainability-one-person-indefinitely
title: "Maintainability — One Person, Indefinitely"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "maintainability", "sustainability", "single-maintainer", "cloudflare-worker", "vodka-architecture", "design-smell"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/principles/vodka-architecture.md, canon/values/axioms.md"
complements: "canon/principles/ritual-is-a-smell.md, canon/principles/kiss-simplicity-is-the-ceiling.md"
governs: "All infrastructure sizing and complexity decisions in this program"
status: active
---

# Maintainability — One Person, Indefinitely

> A vodka layer must be maintainable by a single person without heroics. If the server requires a team to operate, it has grown beyond its function. oddkit proves this: it is a single Cloudflare Worker, one deployment, one maintainer. The canon has passed through seven epochs of growth — from dozens of documents to over 400 — without the server requiring a rewrite for any of them. The knowledge base grows. The server stays the same size.

---

## Summary — The Server Cannot Outgrow Its Maintainer

In vodka architecture (`canon/principles/vodka-architecture.md`), maintainability is the constraint that keeps everything else honest. A server that is simple, DRY, consistent, and antifragile but requires three engineers to keep running has failed the most basic test: can one person sustain this indefinitely?

This constraint cascades into every decision. Prefer standard protocols over custom ones — because custom protocols require custom knowledge to debug. Prefer configuration over code — because configuration changes don't need a developer. The knowledge base can grow by an order of magnitude without the server growing at all — because the server doesn't know about the documents.

---

## Smell Test — How to Detect a Maintainability Violation

- **Deployment anxiety.** If deploying the server feels risky, requires a checklist, or prompts "let me make sure everything's ready" — the deployment is too complex for one person to do confidently.
- **"Don't touch that."** If any part of the codebase is understood by only one person and feared by everyone else, the system has accumulated implicit knowledge that isn't sustainable.
- **Debugging takes hours, not minutes.** If diagnosing a server issue requires tracing through multiple abstraction layers, checking caches, or reconstructing state — the server has grown beyond what one person can reason about quickly.
- **Feature freeze from fear.** If the maintainer avoids changes because they're afraid of breaking something, the system has become fragile in the wrong layer. The canon should be where changes happen freely. The server should be stable enough that changes are rare and small.
- **"We need another person for this."** The most direct smell. If the server requires specialized knowledge, on-call rotation, or team coordination to maintain, it has outgrown vodka architecture.

---

## Failure Modes — What Breaks When Maintainability Is Violated

**Bus factor collapse.** If the single maintainer is unavailable and nobody else can operate the server, the system is down. But the fix is not "add more maintainers" — it's "simplify until anyone can maintain it." A codebase simple enough for one person is simple enough for a replacement.

**Maintenance debt accumulation.** Complex servers accumulate TODO items, deferred refactors, and known issues that the maintainer carries in their head. Each one is invisible state — a ritual smell (`canon/principles/ritual-is-a-smell.md`). The server should be simple enough that its state is fully visible in the code.

**Growth coupling.** When the server's complexity grows proportionally to the knowledge base, every new document makes the server harder to maintain. This is the opposite of vodka architecture — the server should be *indifferent* to KB growth.

---

## What Does NOT Count as a Maintainability Violation

- **The knowledge base requiring domain expertise to maintain.** That's the KB's job, not the server's. A theology KB needs a theologian. A legal KB needs a lawyer. The server needs a single developer who understands markdown and MCP — regardless of domain.
- **Occasional complexity in the canon's governance rules.** Complex gate rules, multi-step preflight checklists, nuanced sensitivity constraints — all of this lives in the knowledge base. The server surfaces it generically. Governance complexity is not server complexity.
- **Standard infrastructure operations.** DNS updates, TLS certificate rotation, Cloudflare dashboard configuration — these are platform operations, not server maintenance. They don't count against the server's complexity budget.

---

## Required Response When Detected

1. **Simplify, don't staff.** The response to "this is too complex for one person" is never "add another person." It's "remove complexity until one person can handle it."
2. **Audit for implicit state.** List everything the maintainer carries in their head that isn't in the code or documentation. Each item is either a documentation gap or unnecessary complexity.
3. **Apply the fresh-eyes test.** Could a developer who has never seen this codebase deploy and maintain it within a day? If not, what's blocking them? Remove those blockers.
4. **Move complexity to the canon.** If the server has grown complex because it handles governance logic, move that logic to governance documents. If it handles domain logic, move that to the KB.

---

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the parent design pattern
- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — heroic maintenance is a ritual compensating for missing design
- [KISS — Simplicity Is the Ceiling](klappy://canon/principles/kiss-simplicity-is-the-ceiling) — maintainability's structural prerequisite
