---
uri: "klappy://canon/constraints/oddkit-prompt-pattern"
title: "Prompt Pattern for oddkit-Powered Applications"
audience: "canon"
exposure: "nav"
tier: 1
voice: "neutral"
stability: "stable"
tags: ["canon", "constraint", "prompt-architecture", "oddkit", "orchestration", "governance"]
epoch: "E0006"
date: "2026-04-02"
derives_from: "odd/prompt-architecture.md, canon/values/axioms.md, canon/constraints/guide-posture.md, canon/constraints/author-identity-language.md, canon/constraints/relational-sensitivity.md"
governs: "All system prompts in applications that use the Anthropic API with oddkit MCP: Social Projector, voice agents, podcast generation, and any future tool"
complements: "odd/prompt-architecture.md, canon/meta/writing-canon.md"
relevance: "decision"
execution_posture: "governing"
---

# Prompt Pattern for oddkit-Powered Applications

> System prompts contain the creed, axioms, and a pointer to oddkit. Governance is fetched at runtime, never hardcoded. Hardcoding governance into prompts creates stale copies that drift from canon — this is the God Prompt anti-pattern applied to governance.

-----

## Summary — The Prompt Is Not the Constitution; oddkit Is

Any application that routes through the Anthropic API with oddkit MCP has access to the full canon at runtime. This changes what belongs in a system prompt and what does not.

The system prompt carries worldview: the Identity of Integrity (creed + four axioms), a declaration that oddkit tools are available, and a short task framing. Everything else — author identity language, relational sensitivity, voice guidance, guide posture, writing constraints — is fetched from canon via oddkit at runtime.

This is not an optimization. It is the direct application of two ODD principles: Orchestrated Intent (from Prompt Architecture) and DRY (the canon is the single source of truth). When governance is hardcoded into a system prompt, updating the canon does not update the application. The prompt becomes a stale fork of the truth — exactly the failure mode that oddkit exists to prevent.

-----

## The Pattern

Every system prompt for an oddkit-powered application follows this structure:

**Layer 1 — Creed (Identity of Integrity)**

```
Before I speak, I observe.
Before I claim, I verify.
Before I confirm, I prove.
What I have not seen, I do not know.
What I have not verified, I will not imply.
```

**Layer 2 — Axioms**

```
1. Reality Is Sovereign — observe before asserting.
2. A Claim Is a Debt — every assertion requires evidence.
3. Integrity Is Non-Negotiable Efficiency — false "done" costs more than honest "I haven't checked."
4. You Cannot Verify What You Did Not Observe — only direct observation counts.
```

**Layer 3 — Tool Declaration**

```
You have access to oddkit MCP tools. Before generating any public-facing content, use oddkit to fetch the governance that applies:
- Search for "author identity language" to understand how the author must be described.
- Search for "relational sensitivity" to understand constraints on referencing people and organizations.
- Search for "guide posture voice tone" to understand the author's public voice.
- Search for any other constraints relevant to the task.

Do not improvise governance. If oddkit has guidance, use it.
```

**Layer 4 — Task Framing (short, specific)**

```
TASK: [One paragraph describing the specific job. Platform rules, output format, voice mode.]
```

-----

## What Goes in the Prompt vs. What oddkit Delivers

| In the system prompt | Fetched from oddkit at runtime |
|---|---|
| Creed (5 lines) | Author identity language |
| Four axioms (4 lines) | Relational sensitivity |
| "You have oddkit tools" | Guide posture |
| Task framing (1 paragraph) | Voice and tone guidance |
| Output format (JSON schema) | Writing canon constraints |
| | Platform-specific rules (if encoded) |

The system prompt should be **under 500 words**. If it grows beyond that, governance is leaking in.

-----

## Why This Matters

Hardcoded governance fails in three ways:

**1. Drift.** The canon evolves. A hardcoded constraint reflects the canon at the time the prompt was written, not when the prompt runs. Author identity language was encoded in E0005. Relational sensitivity was encoded in E0006. A prompt written before E0006 would lack relational sensitivity entirely — and nobody would notice.

**2. Incompleteness.** A prompt author must know every constraint that applies and manually include each one. This is the opposite of oddkit's design, where constraints are discovered by search. A prompt author who forgets a constraint creates a governance gap. An oddkit search that finds the constraint closes it automatically.

**3. Fragility.** When governance is hardcoded in five different application prompts, updating one constraint requires updating five prompts. When governance is in canon and fetched at runtime, updating one constraint updates all applications simultaneously.

-----

## Scope

This constraint governs every application that uses the Anthropic API with oddkit MCP, including but not limited to:

- Social Projector (post.klappy.dev)
- Voice agent system prompts
- Podcast generation inputs
- Any future Claude-in-Claude application wired to oddkit

-----

## Provenance

This constraint was surfaced during the Social Projector build (April 2, 2026). The initial Lovable spec hardcoded author identity language, relational sensitivity, and voice rules directly into system prompts — duplicating governance that already existed in canon. The oddkit gauntlet (challenge → gate → preflight → validate) identified the duplication. The operator caught the anti-pattern and required the governance to be encoded as a permanent constraint.

The pattern aligns with the existing Prompt Architecture appendix (odd/prompt-architecture.md), which already names the God Prompt anti-pattern and prescribes Orchestrated Intent. This constraint makes the prescription concrete and enforceable for oddkit-powered applications.
