---
title: "Epoch E0005.2 — The Write Path: One Action, Progressive Protection"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["epoch", "E0005", "write-path", "oddkit", "ai-augmented-workflows", "directors-chair", "planning", "progressive-disclosure"]
epoch: E0005
date: 2026-02-25
derives_from:
  - canon/the-frame.md
  - canon/values/trust-kernel.md
  - odd/maturity.md
  - odd/constraint/use-only-what-hurts.md
  - docs/decisions/D0017-oddkit-write-path.md
complements: "docs/planning/kb-data-model.md, docs/planning/oddkit-write-access.md"
---

# Epoch E0005.2 — The Write Path: One Action, Progressive Protection

> E0005.1 gave oddkit the ability to read. E0005.2 gives it the ability to write — one action, `oddkit_write`, that puts content from any conversation into any repo. Default behavior writes directly to the default branch. Branch protection, PRs, and CI gates layer in when the user's pain demands them. The write path exists for surfaces that don't have git: Claude Chat, voice agents, team chat assistants. Developers in Claude Code already have git — they get oddkit's read tools and use their own write path. This single capability transforms oddkit from a sophisticated reader into a full participant in AI-augmented workflows. The system was designed by using the system. Architecture serves outcomes. Not the other way around.

---

## Summary — What E0005.2 Is and Why It Matters

E0005.2 makes oddkit read-write through a single action: `oddkit_write`. Today, oddkit reads from a Knowledge Base and provides epistemic discipline — search, challenge, validate, orient, gate, preflight, encode. But insights generated in conversation evaporate between sessions. The write path closes this gap: content goes from conversation to repo in one step.

The design was simplified across four planning sessions. Sessions 1-3 produced architecture (KB data model), team workflows (the loop), and user journeys (developer and director's chair). Session 4 challenged the proposed interface against canon principles and found that the original two-step `propose` + `commit` design violated "Ritual Is a Smell" and "Use Only What Hurts." The result: one action with progressive protection, scoped to non-terminal surfaces only.

The epoch was planned across four sessions, each answering a different question:

1. **What is the system?** — Architecture, data model, infrastructure decisions
2. **Who uses it and how?** — Team roles, tool mapping, workflow integration
3. **What does it feel like?** — User journeys, vocabulary, vision for both audiences
4. **Is the interface right?** — Challenge, simplification, theory of constraints triage

---

## The Outcomes — What It Should Feel Like When It Works

### For anyone connecting oddkit to a project

Day one: connect oddkit, use your AI tools normally, notice they get focused. The AI verifies before claiming, checks the repo before asserting, admits what it hasn't looked at. Not smarter — focused. When you're ready, bootstrap your project's kernel from conversation. Start encoding meetings, decisions, and learnings as they happen. Over time, the Knowledge Base grows from your natural workflow. When the team connects, every AI session reads the same shared context. AI-augmented workflows arrive without a migration event.

The journey is the same for a developer, a Bible translator, a PM, or a domain expert. Four steps: observe, bootstrap, capture, deepen. Each step is a complete experience. You never need to advance.

→ Full journey: **developer-journey-ai-augmented-workflows.md**

### For a domain expert with deep knowledge and something to create

The director's chair. Input is multimodal — voice, text, sketches, images. The AI drafts, the expert directs. Conversations persist because `oddkit_write` commits artifacts to the KB automatically. Each session compounds on the last. From "I have an idea" to "I have a thing."

→ Full journey: **directors-chair-ai-augmented-workflows.md**

### For a product/development team

Every role runs the same loop — converse, generate, validate, promote or pivot — through the same shared Knowledge Base. Tools don't change. Context loss disappears. The write path means every role can contribute to the KB from their preferred surface.

→ Full mapping: **the-loop-every-role-same-infrastructure.md**

---

## The Architecture — Everything Is a Project, One Write Action

**Everything is a project.** A Knowledge Base is the root project. Governance is a role on a project. If no governance project exists, ODD from klappy.dev is the default. Zero-config onboarding. Progressive disclosure applied to system architecture.

→ Full model: **kb-data-model-v2.md**

**One write action: `oddkit_write`.** Accepts file(s), content, commit message. Validates inline. Default: commits to default branch. Optional: branches and PRs. Progressive protection — adapted to the user's context, not prescribed.

→ Decision record: **D0017-oddkit-write-path.md**
→ Implementation spec: **IMPL-oddkit-write.md**

**Non-terminal surfaces only.** `oddkit_write` exists for Claude Chat, voice agents, and team chat assistants — surfaces that lack git. Claude Code already has git and doesn't need a duplicate write path.

---

## Vocabulary — The Terms That Govern

**AI-augmented workflows** — The standard term. Holistic participation in the full lifecycle: reading shared context, generating within constraints, validating against definitions of done, writing learnings back.

**Not smarter, focused** — oddkit doesn't make AI smarter. It makes AI focused. Kernel (trust posture), axioms (boundaries), tools (epistemic operations), guidance (participates, doesn't wait).

**The director's chair** — The posture for domain experts. Taste, intent, domain expertise, final say. Multimodal input, structured output.

**The Knowledge Base is one. The surfaces are many.** — All surfaces connect to the same oddkit, same KB, same kernel/axioms/tools.

**Progressive protection** — Git workflow adapts to the user's context. Default branch → branches → PRs → CI enforcement. Layered by pain, not prescribed upfront.

**Durable journal entries** — The cross-cutting capability across every surface. Any team member encodes observations, learnings, decisions, and handoffs in a sentence during natural workflow. `encode` → `oddkit_write` persists them. The most frequent unit of knowledge capture and the primary way the KB grows. → Full description: **horizon-surfaces-where-the-loop-runs-next.md**

---

## Decisions Encoded Across All Sessions

### Session 1 — Architecture
1. Everything is a project. KB = root project.
2. Governance = role on a project, not a layer.
3. ODD is default governance — always present, never weakened, only extended.
4. Zero-config onramp: connect oddkit to any repo, get epistemic discipline.
5. Progressive disclosure applied to system architecture.
6. No intermediate storage. Write directly to GitHub.

### Session 2 — Team Workflows
7. One loop, every role: converse, generate, validate, promote or pivot.
8. PO's definition of done IS QA's validation criteria (same KB).
9. Architect's decisions are alive in KB — shared consciousness.
10. System slipstreams into existing tools.
11. User feedback (community checking) enters KB and drives PM's next cycle.

### Session 3 — User Journeys
12. "AI-augmented workflows" is the standard term.
13. oddkit is "not smarter, focused."
14. oddkit guides through conversation — user never writes structured docs manually.
15. Two distinct user journeys for two distinct audiences.
16. Director's chair is multimodal, not oral-only.
17. Team chat assistant is a lurking participant, not an invoked bot.
18. "The Knowledge Base is one. The surfaces are many."

### Session 4 — Interface Challenge and Simplification
19. **One action: `oddkit_write`.** Not propose + commit. One intent, one result.
20. **Progressive git protection.** Default: write to default branch. Branches and PRs by request or recommendation. Use Only What Hurts applied to git workflow.
21. **Non-terminal surfaces only.** `oddkit_write` is for Claude Chat, voice, team chat. Claude Code already has git.
22. **Orphan prevention is a design constraint.** `oddkit_write` must update existing branches/PRs, not spawn new ones when a prior write exists for the same scope.
23. **encode → write chaining.** `encode` stays a formatting tool. The AI chains it with `oddkit_write` automatically. User experience is one intent.
24. **Theory of constraints triage.** Can't write at all is the bottleneck. Ledger helpers and changelog follow — they don't block.
25. **oddkit never reimplements existing capabilities.** If the surface has git, oddkit provides read tools only.

---

## Surfaces — Current and Horizon

| Surface | Status | Write Path |
|---------|--------|------------|
| Claude Code CLI | Available now | Native git (oddkit provides read tools only) |
| Claude Chat | Available now (read) / E0005.2 (write) | `oddkit_write` — the primary consumer |
| klappy.dev website | Available now | Projection (read-only from repo) |
| Fireside chat voice agent | PoC complete | `oddkit_write` via MCP (user doesn't see it) |
| Team chat assistant (Slack/Zulip) | Horizon | `oddkit_write` via MCP (lurking participant) |
| Meeting listener | Horizon | `oddkit_write` via MCP (post-meeting artifacts) |
| Director's chair UI | Horizon | `oddkit_write` via MCP (multimodal → artifacts) |

---

## The Dogfooding Observation

E0005.2 was planned by using the process it describes. Session 4 went further: the challenge that simplified the interface was itself an application of ODD's epistemic discipline — `challenge` against canon principles, theory of constraints to triage, "Use Only What Hurts" to strip the interface to its minimum.

The planning sessions progressed: architecture → workflows → outcomes → interface challenge. Each session made the previous sessions' work sharper. The architecture from session 1 was over-specified; session 4's challenge derived a simpler design from the same axioms.

**Learning:** Challenge your own design before building. The axioms are the best design reviewers — they catch over-engineering that user stories miss.

---

## What Remains — The Build

The planning is complete. Four sessions produced: a data model, a decision record, an implementation spec, visual diagrams, team workflow mapping, two user journey articles, a vocabulary commitment, twenty-five encoded decisions, and this epoch definition.

The build:

1. **`oddkit_write` Layer 1** — single file to default branch via GitHub Contents API. Inline validation. This alone eliminates the clipboard ritual.
2. **`oddkit_write` Layer 2** — multi-file atomic commits via Git Data API.
3. **`oddkit_write` Layer 3** — branches and PRs with orphan prevention.
4. **`oddkit_write` Layer 4** — context detection and recommendations.

Everything else — ledger helpers, changelog/diff, team chat assistant, meeting listener, director's chair UI, automated projections — waits for pain.
