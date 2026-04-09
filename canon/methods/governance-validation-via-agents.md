---
uri: klappy://canon/methods/governance-validation-via-agents
title: "Governance Validation via Managed Agents"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "methods", "validation", "managed-agents", "governance", "automation", "quality-gate"]
epoch: E0007
date: 2026-04-09
derives_from: "canon/constraints/frontmatter-validation-before-merge.md, canon/constraints/ai-voice-cliches.md, canon/meta/writing-canon.md"
complements: "docs/agents/validation/README.md, canon/constraints/definition-of-done.md"
governs: "All PRs that add or modify canon, writings, or documentation"
---

# Governance Validation via Managed Agents

> Canon defines what to check. Agents do the checking. Every governance constraint in canon is executable by a Managed Agent before merge. The authoring session should validate in-session first; when uncertain, spin up an agent for a second pass. This document defines how.

---

## Summary — Agents Execute Governance, Canon Defines It

Canon constraints describe rules: frontmatter must match the schema, writings must pass the ghost writer test, temporal claims must be grounded in dates, author identity language must be respected. These rules are useless if they only fire when someone remembers to check.

Managed Agents are the execution layer. An agent can clone a repo, fetch governance docs via oddkit, compare artifacts against constraints, fix violations, and push — autonomously. The authoring agent validates in-session as a first pass. A Managed Agent validates as a second pass when confidence is low or the authoring agent has a track record of shipping broken artifacts.

---

## When to Use Agent Validation

**Always validate in-session first.** Before pushing any file, the authoring agent must:
1. Fetch relevant constraints via oddkit (frontmatter schema, writing canon checklist, AI voice clichés, etc.)
2. Compare the artifact against the constraints and working peers
3. Fix deviations before pushing

**Spin up a Managed Agent when:**
- The authoring agent has already shipped broken artifacts in this session
- The artifact is a public-facing writing (essays, articles) where renderer crashes are the only error signal
- Multiple governance constraints apply and the authoring agent cannot confidently verify all of them
- The PR is ready for merge and needs a final validation pass

---

## Agent Configuration

The validation agent requires:
- **Model:** `claude-sonnet-4-6` (Sonnet catches more issues than Opus in review roles)
- **Tools:** `agent_toolset_20260401` (bash, file ops, web)
- **MCP:** oddkit at `https://oddkit.klappy.dev/mcp` with `always_allow` permission
- **Environment:** cloud container with unrestricted networking

The Anthropic API key is stored in project instructions alongside the GitHub PAT.

---

## Task Templates

### Frontmatter Validation

> Validate the frontmatter of `[FILE]` on branch `[BRANCH]` in `klappy/klappy.dev`.
> 1. Clone the repo using the GitHub PAT
> 2. Checkout the branch
> 3. Fetch `canon/meta/frontmatter-schema.md` via oddkit — authoritative schema
> 4. Read 3-4 working files of the same audience type for structural comparison
> 5. Diff the file's frontmatter field-by-field against schema AND working peers
> 6. Fix EVERY deviation. Do not guess — diff structurally.
> 7. Commit and push

### Full Governance Pass

> Validate all changed files on branch `[BRANCH]` in `klappy/klappy.dev` against all applicable canon constraints.
> 1. Clone the repo, checkout the branch
> 2. Run `git diff --name-only origin/main` to identify changed files
> 3. For each changed file, fetch applicable constraints via oddkit:
>    - Frontmatter schema (`canon/meta/frontmatter-schema.md`)
>    - Writing canon checklist (`canon/meta/writing-canon.md`)
>    - AI voice clichés (`canon/constraints/ai-voice-cliches.md`)
>    - Author identity language (`canon/constraints/author-identity-language.md`)
>    - Temporal claims (`canon/constraints/temporal-claims-require-dates.md` — when written)
> 4. Validate each file against every applicable constraint
> 5. Fix violations, commit, and push
> 6. Report findings: what was wrong, what was fixed, what passed

### Writing Publication Check

> Validate `writings/[SLUG].md` on branch `[BRANCH]` is ready for publication.
> 1. Run the full governance pass (above)
> 2. Additionally verify: `public: true`, no contradictory flags, all social metadata present
> 3. Run the ghost writer test (writing canon item 8) — check for AI voice pattern clustering
> 4. Verify all temporal claims reference actual dates
> 5. The file should render correctly when merged

---

## The Three-Model Pipeline

For writings that need the highest quality:

1. **Opus writes** — produces the draft from brain dumps, transcripts, source material. Fewer issues in first draft.
2. **Sonnet validates** — reviews the draft against all governance constraints. Catches more issues than Opus in review mode. Literal, flag-happy, unlikely to rationalize edge cases away.
3. **Opus fixes** — addresses Sonnet's findings with better judgment on nuanced fixes.

This maps directly to Managed Agents' architecture: three agent definitions with different models, each receiving a task in sequence.

---

## What Gets Validated

Every canon constraint is a potential validation check. The current set:

| Constraint | What it checks | Applies to |
|-----------|---------------|-----------|
| Frontmatter schema | Field types, required fields, contradictory flags | All files |
| Writing canon checklist | Title, blockquote, summary, headers, ghost writer test | All documents and writings |
| AI voice clichés | Negation parallelism, formulaic transitions, pacing | All public-facing content |
| Author identity language | Prohibited identity descriptions | Public content with author references |
| Relational sensitivity | No villains, structural not personal | All public content |
| Temporal claims | Relative time references grounded in dates | All content (when constraint is written) |

New constraints added to canon automatically become available for agent validation — the agent fetches them via oddkit at runtime. No agent code changes needed. This is Vodka Architecture applied to validation: governance fetched, never hardcoded.

---

## See Also

- [Frontmatter Validation Before Merge](klappy://canon/constraints/frontmatter-validation-before-merge) — the gate that triggered this workflow
- [AI Voice Clichés](klappy://canon/constraints/ai-voice-cliches) — ghost writer trust patterns
- [Writing Canon](klappy://canon/meta/writing-canon) — the 8-point checklist
- [Validation Agent](klappy://docs/agents/validation) — the general validation agent architecture
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — governance fetched at runtime, never hardcoded
