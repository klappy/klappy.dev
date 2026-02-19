---
uri: klappy://docs/planning/oddkit-write-access
title: "Planning: oddkit Write Access — Conversation as CMS"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["planning", "oddkit", "write-access", "github-api", "epistemic-ledger", "derivative-assets", "architecture", "product"]
epoch: E0005
date: 2026-02-18
derives_from: "odd/ledger/epistemic-ledger.md, canon/constraints/humans-are-variable-inputs.md, canon/principles/ritual-is-a-smell.md, odd/constraint/anti-cache-lying.md"
complements: "docs/planning/automated-changelog.md, docs/oddkit/IMPL-content-addressed-caching.md, docs/oddkit/positioning.md"
governs: "oddkit MCP server write actions, klappy.dev GitHub Actions, derivative projection pipelines"
---

# Planning: oddkit Write Access — Conversation as CMS

> The single largest source of friction in the current workflow is the human carrying files between conversations and Claude Code. Every session produces insights that must be manually rescued into handoff documents, downloaded, re-uploaded, re-explained, and executed in a separate tool. The human is the bus. This is the exact failure mode the system exists to eliminate. oddkit with direct write access to GitHub repos collapses thinking and committing into one session. The conversation becomes the CMS. Every downstream surface — website, voice agent, video pipeline, changelog — regenerates from the repo. There is no platform. There is a repo, an epistemic discipline layer, and projections. oddkit never writes to main — all changes go to branches, all branches become PRs, GitHub Actions enforce constraints on every PR regardless of origin. The repo becomes the coordination bus for multi-tool workflows: any tool that can write to the repo and read through oddkit shares the same epistemic ledger, and the ODD repo can define specs that oddkit picks up to build itself.

-----

## Summary — The Three-Layer Product Architecture

The product is three layers. Users interact with Layer 2. Layer 1 is their data. Layer 3 is what the world sees.

**Layer 1: The Repo** — GitHub. The user's content, canon, decisions, ledger entries, everything. They own it. They control it. It's portable. If oddkit disappears, their repo is still a repo with all their content.

**Layer 2: oddkit** — The epistemic discipline layer. Read, write, search, challenge, encode, validate, diff. Operates on any repo. The ODD axioms are the behavioral defaults. Users extend them, never weaken them. This is the product.

**Layer 3: Projections** — Derivative assets generated from repo contents. Website, voice agent, video, PDF, changelog, slide decks, newsletters, podcasts. Each is a pipeline that reads from the repo and produces an output. Add a new projection without touching the other layers.

Users never touch Layer 3 directly. They work in Layer 2 (conversation with oddkit), which writes to Layer 1 (their repo), which feeds Layer 3 (everything regenerates automatically).

The competitive moat is not the write layer — anyone can build chat-to-GitHub. The moat is the epistemic discipline that makes the writes trustworthy: canon validation, constraint enforcement, challenge before commit, tier-aware progressive disclosure. oddkit never writes to main — all changes go to branches, all branches become PRs, and GitHub Actions enforce constraints on every PR. The human merges through the GitHub interface. The writing is commodity. The trust layer is the product.

-----

## The Current Bottleneck — Human as Bus

Today's workflow for any change:

1. Conversation with oddkit produces insight, decision, or content
2. Human asks for a handoff document (if they remember)
3. Handoff is generated as a downloadable file
4. Human downloads the file
5. Human switches to Claude Code
6. Human uploads or describes the handoff
7. Human re-explains the context that was already in the conversation
8. Claude Code executes the changes
9. Claude Code creates a PR
10. Human reviews and merges

Steps 2-7 are pure waste. The insight was already structured. The context was already present. The human is carrying information between two systems that could talk directly.

Worse: if the human skips step 2 (forgets to ask for the handoff), the insight evaporates entirely. Five encode calls in one session — all vanished. The epistemic ledger concept exists as a document but not as a capability.

-----

## The Target State — Conversation IS Committing

Target workflow:

1. Conversation with oddkit produces insight, decision, or content
2. oddkit proposes changes (new files, edits, ledger entries) — validates against canon constraints
3. Human reviews the proposal in-conversation ("here's what I'd commit — approve?")
4. oddkit writes to a branch and opens a PR via GitHub API
5. GitHub Actions run on the PR: constraint checks, writing canon validation, changelog draft, audit bots
6. Human reviews the PR (or bot auto-approves if all checks pass and tier allows it)
7. Merge to main triggers downstream projection regeneration

Steps 2-7 from the old flow are eliminated. The human still gates what reaches main — but through PR review, not by carrying files between tools. The enforcement that commit hooks failed to provide now lives in GitHub Actions on the PR, where it actually runs.

-----

## System Changes Required — oddkit MCP, GitHub Actions, and Projection Pipelines

This capability touches three systems. Each needs its own implementation plan and handoff.

### System 1: oddkit MCP Server

The oddkit MCP server (currently at the oddkit.klappy.dev endpoint) needs new actions for write operations. These supplement the existing read actions (search, get, catalog, challenge, encode, validate, preflight, gate, orient, version, cleanup_storage).

**New actions needed:**

`oddkit_propose` — Stage a file change proposal. Takes a file path, content, and commit message. Validates against canon constraints (tier requirements, frontmatter completeness, writing canon compliance). Returns a structured proposal with validation results. Does not commit — staging only.

`oddkit_commit` — Execute a staged proposal. Takes one or more proposals, creates a branch, commits the changes to the branch, and opens a PR via the GitHub Pull Request API. Returns the PR URL. oddkit NEVER commits directly to main — the PR is the only path to main, ensuring GitHub Actions run and humans gate the merge. Branch naming follows a convention: `oddkit/{session-id}/{description}` for traceability.

`oddkit_diff` — The universal "what moved" primitive (already planned in `docs/planning/automated-changelog.md`). Takes a reference point (SHA, datetime, or version string) and optional scope. Returns categorized changes with risk assessment.

`oddkit_ledger_write` — Write an epistemic ledger entry (observation, learning, decision, constraint, handoff) to the project's designated ledger storage. This is what encode SHOULD do but currently can't — persist the structured artifact to durable storage.

`oddkit_ledger_read` — Read ledger entries for the current project, with optional filtering by type, date range, or scope. This gives any new session access to what previous sessions decided.

**Implementation approach:**

The GitHub Contents API (`PUT /repos/{owner}/{repo}/contents/{path}`) handles single-file creates and updates. For multi-file changes, the GitHub Git Data API (create tree → create commit → update ref) handles atomic multi-file commits. For changes that need review, the Pull Request API creates a branch and PR.

Authentication: GitHub personal access token or GitHub App installation token, scoped to the target repo. The token is stored as an environment variable on the MCP server, not in the canon or conversation.

Validation before commit: Every proposal runs through the existing oddkit constraint pipeline — preflight checks writing canon compliance, challenge tests against canon constraints, and the tier system determines what level of validation is required. Tier 1 changes could require explicit human review (PR). Tier 2+ could auto-commit with logging.

**Handoff target:** oddkit MCP server repo (Node.js/TypeScript). The implementation adds new action handlers alongside the existing ones. The GitHub API client is new infrastructure.

### System 2: Canon Repo (klappy.dev) GitHub Infrastructure

The canon repo needs GitHub Actions that respond to commits and PRs produced by oddkit.

**New or updated Actions needed:**

`on-push-changelog` — When commits land on main, check if any canon/odd/docs/writings files changed since the last CHANGELOG entry. If so, auto-generate a changelog draft entry (using the same git diff + frontmatter methodology proven in 0.33.0) and either append it to a running "unreleased" section of CHANGELOG.md or create an issue/PR with the draft.

`on-push-projections` — When commits land on main, trigger derivative asset regeneration. This is the pipeline that rebuilds the website, updates the voice agent's knowledge base, regenerates any cached outputs. Currently the website reads from GitHub at request time, but other projections (video, PDF) may need explicit triggers.

`on-pr-validate` — When a PR is opened (whether by oddkit, Claude Code, or a human), run the same constraint validation that oddkit's preflight does. This is the enforcement layer that actually works — it runs in CI regardless of how the commit was made, which tool created it, or whether commit hooks were bypassed. This replaces the dead commit hooks. Required check: PR cannot merge if validation fails.

`on-pr-audit` — Run constraint-driven audits on the changed files. If a new constraint was added, check whether the constraints README was updated. If canon files changed, check whether a changelog entry exists. If public-facing files changed, check guide posture compliance. These are the "bug bots" — automated reviewers that catch drift before it lands on main.

`on-pr-ledger-check` — When a PR touches canon or ODD files, verify that appropriate ledger entries exist for the changes (decisions, observations). Soft enforcement — a comment, not a block — that reminds contributors to encode their reasoning.

**Handoff target:** klappy.dev repo, `.github/workflows/` directory. These are YAML workflow files that run in GitHub's CI environment.

### System 3: Derivative Asset Pipelines (Projections)

Each projection reads from the repo and produces an output. These mostly already exist or are planned. The write access capability makes them automatic rather than manually triggered.

**Website (odd.klappy.dev, klappy.dev)** — Already reads from GitHub at request time. No changes needed for basic operation. May want cache invalidation webhook when commits land.

**Voice Agent (ElevenLabs Fireside Chat)** — Currently has a static prompt. With write access, the prompt could be dynamically generated from the canon on each deploy. The knowledge base section could auto-update when canon changes.

**Changelog** — Generated by `oddkit_diff` or the `on-push-changelog` Action. No longer manually maintained.

**Video Pipeline** — Planned. Reads from Aquifer resources + canon. Triggered by repo changes.

**PDF/Document Generation** — Planned. Read repo contents, generate formatted output.

**Handoff target:** Varies per projection. Website changes are in the klappy.dev repo. Voice agent changes are in ElevenLabs configuration. Video and PDF are new pipelines to be architected.

-----

## Phased Implementation

### Phase 1: oddkit_diff + on-push-changelog (Low risk, high evidence)

Ship the diff primitive and the GitHub Action that auto-generates changelog entries. This proves the git-as-ledger concept without any write access. It's read-only infrastructure that eliminates the changelog ritual. Evidence: 0.33.0 was already generated this way manually.

Deliverables:
- oddkit_diff action in MCP server
- on-push-changelog GitHub Action in klappy.dev
- Updated CHANGELOG.md format with "unreleased" section

### Phase 2: oddkit_ledger_write + oddkit_ledger_read (Medium risk, highest value)

Ship persistent ledger storage. Encode calls persist to durable storage tied to the project repo. Future sessions read from the ledger. This eliminates the "insights evaporate between sessions" failure.

Storage options:
- A `ledger/` directory in the repo itself (entries are committed as markdown files)
- A separate ledger branch (keeps the main branch clean)
- An external store (database, key-value) with repo-scoped keys

The repo-native option (ledger/ directory or branch) is preferred because it keeps all data in Layer 1 — the user owns it, it's portable, it's version-controlled.

Deliverables:
- oddkit_ledger_write and oddkit_ledger_read actions in MCP server
- Ledger storage convention documented in canon
- GitHub API integration for writing ledger entries

### Phase 3: oddkit_propose + oddkit_commit (Higher risk, full capability)

Ship file-level write access. Conversations can propose and commit changes to any file in the repo. This eliminates the human-as-bus bottleneck entirely.

Safety model:
- oddkit NEVER writes to main. All changes go to a branch. Always.
- Every branch triggers a PR when the proposal is ready for review
- GitHub Actions run on the PR: constraint validation, writing canon checks, changelog generation, audit bots
- The human reviews and merges the PR through the GitHub interface. No API-managed merges for now.
- Every commit includes provenance metadata (which session, which conversation, which user)
- Rollback is always available via git revert or PR revert
- Future: oddkit can manage PR review, approval, and merge via GitHub API on behalf of the user. But that's a later phase — for now, the GitHub UI is the merge interface.

Deliverables:
- oddkit_propose and oddkit_commit actions in MCP server
- on-pr-validate GitHub Action in klappy.dev
- Provenance metadata standard documented in canon

### Phase 4: Projection Automation (Low risk, quality of life)

Wire up automatic regeneration of derivative assets when the repo changes. Website cache invalidation, voice agent prompt refresh, video pipeline triggers.

Deliverables:
- on-push-projections GitHub Action
- Webhook integrations per projection
- Documentation of projection pipeline architecture

-----

## Constraints — Never Main, User Owns Data, Writes Gated by Discipline

**oddkit never writes to main.** All changes go to branches. All branches become PRs. PRs are the only path to main. This is non-negotiable. It ensures GitHub Actions always run, humans always have a gate, and every change is reviewable. The PR is the epistemic gate — the same concept as ODD's mode transition gates, applied to the commit lifecycle.

**User owns their data.** The repo belongs to the user. oddkit operates on it with their permission. If oddkit disappears, the repo is still a complete, portable repository of their content. No lock-in.

**Writes are gated by epistemic discipline.** This is not a "dump anything to the repo" capability. Every write validates against the project's constraints. The same challenge, preflight, and validate actions that govern read-mode behavior govern write-mode behavior. The trust layer is what makes this different from any other chat-to-GitHub tool.

**Human approves irreversible changes.** Per the No Irreversible Action constraint, anything that ships to production (merge to main, deploy, publish) requires human approval. oddkit proposes; the human decides. The role shifts from carrying to deciding, not from deciding to abdicating.

**Ledger entries are scoped.** Per the epistemic ledger spec, entries apply within their intended scope. A decision made for one project doesn't leak into another. Multi-tenant separation is enforced by repo boundaries — each repo is its own ledger.

**Authentication is explicit.** The GitHub token is a deliberate grant of access, not an ambient capability. Users choose which repos oddkit can write to. Revocation is instant.

-----

## Open Questions — Ledger Format, Multi-Repo, Session Mapping

1. **Ledger storage format.** Markdown files in a `ledger/` directory? A single `LEDGER.md` with appended entries? A JSON file? The choice affects searchability, diffability, and merge conflict potential. Markdown files in a directory (one file per entry) is most git-friendly but creates many small files.

2. **PR merge management.** For now, humans merge PRs through the GitHub UI. Future phases may add tier-gated auto-approval (Tier 2-3 changes auto-merge if all checks pass) and oddkit managing the merge via GitHub API on behalf of the user. But the initial implementation keeps merge authority in the GitHub interface where it already lives.

3. **Multi-repo scope.** When oddkit_diff or oddkit_ledger_read runs, which repo does it target? Currently oddkit's baseline URL points to one repo. Multi-repo support would need a way to specify which repo per action call.

4. **Session-to-ledger mapping.** How does a conversation session know which ledger entries it produced? The encode action currently returns structured output but no session ID. Adding a session identifier would enable "show me everything this session decided."

5. **Conflict resolution.** If two sessions both edit the same file and both try to commit, who wins? GitHub's API rejects the second commit (requires a fresh SHA). The resolution path needs to be designed — probably "fetch latest, re-validate, re-propose."

-----

## Multi-Tool Coordination — The Repo as Message Bus

oddkit write access is not just a productivity improvement for one user. It is the coordination mechanism for multi-tool workflows.

Any tool that can write to the repo and read through oddkit shares the same epistemic ledger. Handoffs become repo commits, not files humans carry between tools. Claude chat writes planning docs, Claude Code executes them, the voice agent explores against them, the website renders from them — all through the same repo. The human directs which tool acts next. The repo coordinates.

This extends to any MCP-compatible tool. The repo is open. The protocol is open. The epistemic discipline travels with the data, not the tool. Any tool that connects through oddkit joins the coordination without custom integration.

## Self-Referential Spec Watching — The Protocol Defines Its Own Tools

The ODD canon repo can define build specs that oddkit picks up for itself. Oddkit watches the planning queue of the canon it serves to maintain consistency with the latest ODD version. The loop: ODD defines the discipline → oddkit implements it → the planning queue defines oddkit's next capabilities → oddkit reads the queue → when a spec hurts enough, it becomes the implementation handoff for oddkit itself.

This generalizes: GitHub Actions watch for workflow specs, the website watches for projection specs, each tool's build instructions live in the same canon they serve. The protocol defines itself in a repo. The tools that implement it read from that repo.

-----

## Derivation

- **Epistemic Ledger** (`odd/ledger/epistemic-ledger.md`) — the ledger concept demands persistent storage. Oddkit can't claim to support the ledger while its encode action produces output that vanishes.
- **Humans Are Variable Inputs** (`canon/constraints/humans-are-variable-inputs.md`) — the handoff ritual depends on the human remembering, downloading, switching tools, re-explaining context. Every step is a failure point.
- **Ritual Is a Smell** (`canon/principles/ritual-is-a-smell.md`) — the handoff-to-Claude-Code workflow is a ritual that compensates for missing write access.
- **Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — a ledger that doesn't persist is a lie about the system's memory capability.
- **No Irreversible Action** (`canon/constraints/no-irreversible-action-without-epistemic-justification.md`) — write access must be gated; the human approves irreversible changes.
- **Evolution, Not Automation** (`odd/appendices/evolution-not-automation.md`) — this is not automating commits. It's eliminating the friction between learning (conversation) and persisting (commit) so the system can evolve faster.
- **oddkit Positioning** (`docs/oddkit/positioning.md`) — oddkit is a protocol, not a platform. Write access reinforces this: the repo is the user's, oddkit is the interface.

-----

## Next Steps

1. Commit this planning document and `docs/planning/automated-changelog.md` as part of 0.33.0
2. Implement Phase 1 (oddkit_diff + on-push-changelog) as the first write-adjacent capability
3. Design the ledger storage format (Phase 2 prerequisite) — propose and challenge before committing
4. Implement Phase 2 (ledger read/write) — this is the capability that makes sessions compound
5. Implement Phase 3 (propose/commit) — this eliminates the human-as-bus bottleneck
6. Wire up Phase 4 (projection automation) as projections are built
