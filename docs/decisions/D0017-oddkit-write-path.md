---
uri: klappy://docs/decisions/D0017
title: "D0017: oddkit Write Path — One Action, Progressive Protection (E0005.2)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["odd", "decisions", "oddkit", "write-access", "epoch-5", "github-api", "kb-model", "progressive-disclosure"]
epoch: E0005
date: 2026-02-25
derives_from: "docs/decisions/D0016-structure-agnostic-odd.md, docs/planning/oddkit-write-access.md, canon/principles/ritual-is-a-smell.md, canon/constraints/humans-are-variable-inputs.md, odd/constraint/use-only-what-hurts.md"
supersedes: ""
complements: "docs/planning/oddkit-write-access.md, docs/planning/kb-data-model.md"
---

# D0017: oddkit Write Path — One Action, Progressive Protection (E0005.2)

> E0005 made oddkit the epistemic interface. E0005.1 removed prescribed directory conventions. E0005.2 completes the promise: one write action — `oddkit_write` — puts content from any conversation into any repo. Default behavior writes directly to the default branch. Zero friction. Branch protection, PRs, and CI gates layer in when the user's pain demands them — not before. oddkit observes the repo's context and recommends appropriate protection, but never prescribes it. The write path exists for surfaces that don't have git: Claude Chat, voice agents, team chat assistants. Developers in Claude Code already have git — they get oddkit's read tools and use their own write path. oddkit never reimplements what the user's tools already provide.

-----

## Summary — One Action, Progressive Protection, Non-Terminal Surfaces Only

The original planning doc (`docs/planning/oddkit-write-access.md`) proposed five write actions across four phases. Session 4 of E0005.2 challenged this against canon principles and simplified radically.

The challenge found that a two-step `propose` + `commit` interface creates a new ritual — the exact failure mode the system exists to eliminate. The PR was already designed as the review gate; adding a pre-PR staging area is a second gate that violates "Use Only What Hurts." Ledger-specific write tools are premature specialization — the ledger is files, and the general write path handles files. And forcing branch → PR → merge on a solo user with no CI is a ritual compensating for a risk that doesn't exist yet.

The result: one action (`oddkit_write`), progressive git protection (default branch → branches → PRs, layered by pain), scoped to non-terminal MCP clients (Claude Chat, voice, team chat — not Claude Code, which already has git).

This is not a new epoch because no new assumption about reality is introduced. E0005 already assumed oddkit is the interface. E0005.2 makes that assumption true for writes, applying progressive disclosure to git workflow itself.

-----

## The Write Action

### `oddkit_write`

One action. Accepts file path(s), content, commit message, and optional metadata. Validates content against governance constraints inline. Writes to the repo. Returns what it did and where.

**Default behavior:** Commits directly to the default branch. Zero friction. This is correct for a solo user with no CI, no deployment, no collaborators — which is the starting state for most repos.

**By request or recommendation:** Creates a branch. Optionally opens a PR. The user or oddkit can escalate protection when the context demands it.

**Validation is inline, not a separate step.** Every write validates against the KB's governance constraints (frontmatter completeness, writing canon compliance, tier requirements). Validation results are returned with the write response. Failures are conversational — the AI presents them and offers to fix — not blocking gates that require a separate tool call to resolve.

**Multi-file atomic commits.** `oddkit_write` accepts an array of file changes. One commit, one branch (if applicable), one PR (if applicable). A planning spec and its requirements can be committed atomically from one conversation.

-----

## Progressive Git Protection — Use Only What Hurts, Applied to Git

The write path doesn't prescribe a git workflow. It adapts to the user's context and recommends protection when the pain justifies it.

### Level 0 — Direct to Default Branch

Solo user. No CI. No deployment hooked to the repo. Content goes straight to main (or whatever the default branch is). The user's only concern is "did the content get there?" This is the zero-friction onramp.

oddkit writes. Done.

### Level 1 — Branches by Request

The user pushed something broken and wants a safety net. Or they're experimenting and want to keep main clean. They ask oddkit to use branches, or oddkit recommends it: "You have a Cloudflare deployment hooked to main — want me to use branches so changes don't go live immediately?"

oddkit creates a branch, commits there. The user merges manually through GitHub's UI. No PR overhead unless they want it.

### Level 2 — PRs with Validation

The user has collaborators, CI, or production protection needs. PRs provide the review gate. GitHub Actions validate on the PR. The human (or automation) merges.

oddkit creates a branch, commits, opens a PR. Returns the PR URL. The PR is the single gate to main.

### Level 3 — Full CI Enforcement

GitHub Actions run constraint validation, writing canon checks, audit bots on every PR. The PR cannot merge if validation fails. This is the "shared consciousness" enforcement layer described in the team roles article.

### How oddkit knows which level applies

Three signals, weighted toward detection and recommendation over configuration:

**Detection:** Does the repo have branch protection rules? Does it have CI workflows? Does it have multiple collaborators? Does it have a deployment hooked to the default branch?

**Recommendation:** oddkit observes the context and suggests. "You're writing directly to main and you have a live site — want me to start using branches?" The user decides.

**Explicit request:** The user says "use branches" or "open a PR for this." oddkit respects the request.

No configuration file. No setup ritual. The system adapts.

-----

## Scope — Non-Terminal Surfaces Only

`oddkit_write` exists for MCP clients that don't have git. This is the key scoping decision from session 4.

**Claude Chat** — The primary consumer. PMs, POs, architects, domain experts use Claude Chat. They have no terminal, no git, no way to move content from conversation to repo without the clipboard ritual. `oddkit_write` eliminates that ritual.

**Voice agents** — The fireside chat, the director's chair. Voice conversations produce insights that need to persist. The voice agent calls `oddkit_write` on behalf of the user without the user knowing the action exists.

**Team chat assistants** — The lurking assistant in Slack/Zulip. When it encodes a decision from a thread, it writes to the repo through `oddkit_write`. The user says "yes, capture that." The assistant handles the rest.

**Claude Code CLI** — Does NOT need `oddkit_write`. Claude Code already has git — it creates branches, commits, opens PRs natively. What Claude Code needs from oddkit is read: search, challenge, preflight, validate. The write path it already has.

**The principle:** oddkit never reimplements what the user's tools already provide. It fills gaps in surfaces that lack capabilities. Claude Chat lacks git. oddkit provides it. Claude Code has git. oddkit doesn't duplicate it.

-----

## The Orphan Prevention Constraint

If oddkit creates PRs that fail validation and nobody fixes them, the repo accumulates abandoned branches — a graveyard of good intentions. This is a design constraint, not a separate feature.

**`oddkit_write` must be able to update existing branches/PRs.** If a PR fails validation, the next write targeting the same scope pushes to the existing branch, not a new one. The conversation that created the problem can fix it without spawning a sibling.

**Scope matching:** When `oddkit_write` is called at Level 2+, it checks for open PRs from the current session or targeting the same files. If one exists, it updates rather than creates. The heuristic is: same session or same file paths → same branch.

**oddkit should surface open PRs.** When a session starts, oddkit can check for open PRs it created and surface them: "You have an open PR from last session that needs review — want to continue working on it?" This prevents orphans by making them visible, not by preventing their creation.

-----

## What About `encode` Becoming Persistent?

The `encode` tool currently produces structured decision records, observations, and learnings — then they vanish. D0017's predecessor identified "encode calls that vanish" as a primary pain point.

With `oddkit_write` available, the AI chains `encode` → `write` automatically. The user says "encode this decision." The AI formats the artifact using encode, then offers: "Want me to commit this to the KB?" If yes, `oddkit_write` handles it. The user experience is one intent ("capture this"), two internal steps (format, write), one result (it's in the repo).

`encode` stays a formatting/structuring tool. `oddkit_write` handles persistence. Each tool does one thing. The AI chains them naturally.

-----

## Evidence That Drove This Simplification

**1. Ritual Is a Smell applied to the interface itself (Session 4 challenge)**

The proposed `propose` + `commit` two-step interface was challenged against "Ritual Is a Smell." Finding: the two-step flow requires the user or AI to manage state between calls. If someone calls `propose` and forgets to `commit`, the staged proposal evaporates — the exact failure mode being eliminated. The PR is already the review gate; a pre-PR staging area is a second gate that no pain had justified.

**2. User stories don't want two steps**

Walking each role through the interface: the PM says "commit this planning spec" (one intent). The director says "capture that" (one intent). The team chat assistant says "want me to encode that decision?" (one intent). None of them think in propose/commit pairs.

**3. Developers already have git**

The engineer in Claude Code already creates branches and PRs. Building `oddkit_write` for developers duplicates their existing capability. The write path is for surfaces that lack git — Claude Chat, voice, team chat.

**4. Progressive git matches progressive disclosure everywhere else**

The developer journey describes Level 0 (zero-config) through Level 4 (team-wide workflows). The director's chair describes Level 0 (just talk) through Level 4 (multi-surface). Forcing branch → PR → merge at Level 0 violates the same progressive disclosure principle that governs every other part of the system.

-----

## Constraints — Inherited and Sharpened

**User owns their data.** The repo belongs to the user. oddkit operates with their permission. No lock-in.

**Writes are gated by epistemic discipline.** Every write validates against governance constraints. The trust layer differentiates this from any other chat-to-GitHub tool.

**Human approves irreversible changes.** At Level 0, "irreversible" means "it's in the repo" (but git makes everything reversible). At Level 2+, the PR is the explicit approval gate. The human's role shifts from carrying to deciding.

**Authentication is explicit.** GitHub PAT stored as env var on MCP server, scoped to the target repo.

**oddkit never reimplements existing capabilities.** If the surface already has git, oddkit provides read tools only.

-----

## What E0005.2 Does NOT Include

Deliberately deferred — wait for pain:

**Ledger-specific helpers** — High-frequency use case for reading/writing structured ledger entries. The general write path handles files; specialized ledger ergonomics ship when the general path proves insufficient for the volume and patterns of ledger operations.

**Changelog / oddkit_diff** — The "what moved" primitive. Important for preventing duplicate work and helping models understand repo state post-merge. Ships as a companion to the write path but is a read action, not a write action.

**GitHub Actions validation** — CI enforcement on PRs. Level 3 concern. Build when users reach Level 2 and feel the need.

**Projection automation** — Auto-regeneration of derivative assets on merge. Quality of life, not bottleneck.

**Multi-user auth model** — How shared KBs grant write access to multiple users. Multi-tenant concern.

-----

## Derivation

- **D0016 / E0005.1** — removed structural prescriptions; E0005.2 removes the last structural ritual (manual write handoff)
- **Planning doc** (`docs/planning/oddkit-write-access.md`) — the original architectural plan; this decision declares the simplified interface
- **Ritual Is a Smell** (`canon/principles/ritual-is-a-smell.md`) — the copy-paste handoff is a ritual; the two-step propose/commit interface would have been a new one
- **Humans Are Variable Inputs** (`canon/constraints/humans-are-variable-inputs.md`) — the handoff depends on human memory; the interface must be one step, not two
- **Use Only What Hurts** (`odd/constraint/use-only-what-hurts.md`) — progressive git protection; branch/PR flows arrive when pain demands them
- **Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — a system that claims epistemic memory but can't persist its own output is lying about its capabilities

-----

## Next Steps

1. Build `oddkit_write` — minimum implementation: accept file(s), content, commit message; write to default branch via GitHub API; return result
2. Test with a real article from this conversation → content appears in repo with YAML intact
3. Add branch/PR support as optional parameters — available immediately, recommended by oddkit when context warrants
4. Add orphan prevention — detect existing open branches/PRs before creating new ones
5. Wire encode → write chaining in the AI's conversational flow
6. Build ledger helpers and changelog/diff when the write path reveals the specific patterns that hurt

## Status

- [x] Decision record created
- [ ] Reviewed and approved
