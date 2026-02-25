---
uri: klappy://docs/oddkit/IMPL-oddkit-write
title: "Implementation: oddkit_write — One Action, Content to Repo"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "implementation", "write-path", "github-api", "mcp", "E0005"]
epoch: E0005
date: 2026-02-25
derives_from: "docs/decisions/D0017-oddkit-write-path.md, docs/planning/oddkit-write-access.md, canon/principles/ritual-is-a-smell.md, odd/constraint/use-only-what-hurts.md"
complements: "docs/oddkit/IMPL-content-addressed-caching.md, docs/oddkit/IMPL-oddkit-diff.md"
governs: "oddkit MCP server write action implementation"
---

# Implementation: oddkit_write — One Action, Content to Repo

> `oddkit_write` accepts file path(s) and content, validates against governance constraints, and writes to the repo via GitHub API. Default: commits to the default branch. Optional: creates a branch, opens a PR. Progressive protection — not prescribed, recommended when context warrants. Exists for MCP clients without git (Claude Chat, voice agents, team chat). Developers in Claude Code use their own git. One action eliminates the clipboard ritual that is the single largest source of friction in non-terminal AI-augmented workflows.

-----

## Summary — What It Does, How It Works, What It Needs

`oddkit_write` is a new action in the oddkit MCP server. It writes files to a GitHub repo. The minimum implementation handles the bottleneck — getting content from a conversation into a repo without clipboard operations, tool switching, or re-explanation. Everything beyond that (branches, PRs, validation enforcement) layers in progressively.

The implementation uses GitHub's REST API. Single-file writes use the Contents API. Multi-file atomic writes use the Git Data API (create tree → create commit → update ref). Branch creation and PR opening use the Repos and Pulls APIs respectively. Authentication is a GitHub personal access token stored as an environment variable.

-----

## Action Interface

### Input

```typescript
interface OddkitWriteInput {
  // Required
  files: Array<{
    path: string;      // Repo-relative file path (e.g., "docs/decisions/D0017.md")
    content: string;   // File content (UTF-8 text)
    encoding?: string; // Default: "utf-8". Future: "base64" for binary
  }>;
  message: string;     // Commit message

  // Optional — progressive protection
  branch?: string;     // Target branch. If omitted: writes to default branch.
                       // If provided and doesn't exist: creates it from default branch HEAD.
                       // If provided and exists: pushes to it.
  pr?: boolean | {     // If true or object: opens a PR from branch to default branch.
    title?: string;    // PR title. Default: commit message.
    body?: string;     // PR body. Default: auto-generated from file list.
    draft?: boolean;   // Open as draft PR. Default: false.
  };

  // Optional — metadata
  author?: {           // Git author. Default: authenticated user.
    name: string;
    email: string;
  };
  provenance?: {       // Traceability metadata, stored in commit message footer
    session_id?: string;
    surface?: string;  // "claude-chat", "voice-agent", "team-chat", etc.
  };
}
```

### Output

```typescript
interface OddkitWriteOutput {
  status: "committed" | "branch_created" | "pr_opened" | "pr_updated" | "validation_failed";

  // Always present on success
  commit_sha?: string;
  commit_url?: string;
  branch?: string;
  files_written: string[];  // Paths of files written

  // Present when PR is opened or updated
  pr_url?: string;
  pr_number?: number;
  pr_updated?: boolean;  // true if pushed to existing PR's branch

  // Always present
  validation: {
    passed: boolean;
    results: Array<{
      file: string;
      checks: Array<{
        name: string;       // e.g., "frontmatter_complete", "blockquote_present", "tier_valid"
        passed: boolean;
        message?: string;   // Guidance on what to fix
      }>;
    }>;
  };
}
```

-----

## Implementation — Three Tiers of GitHub API Usage

### Tier 1: Single File to Default Branch (Minimum Viable)

Uses the GitHub Contents API. This is the starting point — ship this first.

```
PUT /repos/{owner}/{repo}/contents/{path}
```

**Request body:**
- `message`: commit message
- `content`: base64-encoded file content
- `sha`: (required for updates) current file SHA — fetch first with GET

**Flow:**
1. Validate content against governance constraints
2. For each file: GET current SHA (if file exists, for update)
3. PUT to create/update the file
4. Return commit SHA and URL

**Limitation:** Cannot atomically commit multiple files. Each PUT is a separate commit. For the minimum viable write path, this is acceptable — most writes from Claude Chat are single files (an article, a decision record, a planning doc).

### Tier 2: Multi-File Atomic Commits

Uses the Git Data API when `files.length > 1`. Atomic — all files in one commit.

**Flow:**
1. Validate all files against governance constraints
2. GET the current default branch ref → commit SHA → tree SHA
3. Create blobs for each file (`POST /repos/{owner}/{repo}/git/blobs`)
4. Create a new tree with all blobs (`POST /repos/{owner}/{repo}/git/trees`)
5. Create a commit pointing to the new tree (`POST /repos/{owner}/{repo}/git/commits`)
6. Update the branch ref (`PATCH /repos/{owner}/{repo}/git/refs/heads/{branch}`)
7. Return commit SHA and URL

### Tier 3: Branches and PRs

Layers on top of Tier 1 or 2 when `branch` or `pr` parameters are provided.

**Branch creation flow:**
1. GET default branch HEAD SHA
2. POST create ref (`POST /repos/{owner}/{repo}/git/refs` with `refs/heads/{branch}`)
3. Write files to the new branch (using Tier 1 or 2 flow targeting the branch)

**PR creation flow:**
1. Write files to branch (above)
2. POST create PR (`POST /repos/{owner}/{repo}/pulls`)
3. Return PR URL and number

**PR update flow (orphan prevention):**
1. Check for existing open PRs from oddkit on the same branch or targeting the same files
2. If found: push to existing branch (the PR updates automatically)
3. If not found: create new branch and PR

-----

## Validation — Inline, Not Blocking

Every `oddkit_write` call validates content before writing. Validation is informational — it tells the AI and user what's wrong so they can fix it in conversation. It does not block the write by default.

**Validation checks (governance-derived):**

For files targeting `canon/`, `odd/`, or `docs/`:
- **Frontmatter present** — YAML frontmatter block exists
- **Required fields** — `title`, `uri`, `audience`, `tier`, `tags`, `epoch` present
- **Blockquote present** — `>` line exists after the title
- **Summary section** — `## Summary` heading exists
- **Header quality** — Headers are descriptive, not generic ("Background", "Details")

For all files:
- **UTF-8 valid** — Content is valid UTF-8
- **Path valid** — File path is reasonable (no absolute paths, no traversal)

**Validation does not block the write.** If validation fails, the response includes the failures with guidance. The AI presents them to the user: "The frontmatter is missing the `tier` field. Want me to fix it?" The user decides whether to fix or proceed. This keeps the human in control without creating a gate that must be passed before content can be saved.

**Future: blocking validation at Level 3.** When GitHub Actions enforce constraints on PRs, validation failures will block merge (not write). The write always succeeds; the merge requires passing checks. This is the correct enforcement point — the PR, not the write action.

-----

## Authentication

**GitHub Personal Access Token (PAT)** stored as an environment variable on the MCP server.

```
ODDKIT_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Required scopes:** `repo` (full repo access for reading, writing, creating branches, opening PRs).

**The token is never in the conversation, never in the KB, never in any committed file.** It lives on the MCP server's environment only.

**Future: GitHub App installation tokens** for multi-user scenarios. Deferred until multi-tenant pain arrives.

-----

## Repo Configuration

`oddkit_write` needs to know which repo to write to. This extends the existing `baseline_url` configuration.

**Current:** oddkit reads from `baseline_url` (e.g., `https://raw.githubusercontent.com/klappy/klappy.dev/main`).

**Extended for writes:** Parse `baseline_url` to extract `owner` and `repo`. The GitHub API targets `https://api.github.com/repos/{owner}/{repo}/...`. The default branch is detected via the API (`GET /repos/{owner}/{repo}` → `default_branch` field).

No new configuration required. The write path derives its target from the same URL oddkit already uses for reads.

-----

## Provenance — Every Write Is Traceable

Every commit made by `oddkit_write` includes provenance metadata in the commit message footer:

```
Add planning spec for epoch E0005.3

---
oddkit-surface: claude-chat
oddkit-session: abc123
oddkit-timestamp: 2026-02-25T14:30:00Z
```

This enables:
- Tracing any commit back to the conversation that produced it
- Distinguishing oddkit-authored commits from human or Claude Code commits
- Filtering commit history by surface type

The provenance footer is appended automatically. The user never sees or manages it.

-----

## Error Handling

**Authentication failure:** Return clear message — "GitHub token is invalid or expired. Check ODDKIT_GITHUB_TOKEN." Don't retry.

**Permission denied:** Return clear message — "Token doesn't have write access to {owner}/{repo}. The token needs `repo` scope."

**Merge conflict (file was modified since last read):** Fetch latest, report the conflict: "The file was modified since you last read it. Here's the current version — want to merge your changes?" This is the orphan prevention pattern applied to direct writes.

**Rate limiting:** GitHub API rate limits (5,000/hour for authenticated requests). For normal usage this is more than sufficient. If hit, report and suggest waiting.

**Network failure:** Retry once. If still failing, report and save the content locally so it's not lost.

-----

## What This Implementation Does NOT Include

Deferred until pain demands:

**Ledger-specific write helpers** — Structured append operations, scoped queries, ledger-aware validation. Build when the general write path proves insufficient for ledger operation volume.

**`oddkit_diff`** — The "what moved" primitive. A read action, not a write action. Ships separately.

**Changelog generation** — Automated changelog from commit history. Depends on `oddkit_diff`.

**File deletion** — `oddkit_write` creates and updates files. Deletion is a separate, more dangerous operation. Defer.

**Binary file support** — Images, PDFs, etc. The `encoding: "base64"` parameter is reserved but not implemented. Text files first.

**Batch operations across repos** — Writing to multiple KBs in one action. Multi-tenant concern.

-----

## Build Plan — Ship in Layers

### Layer 1: Single file to default branch (ship first)

Minimum viable `oddkit_write`. One file, one commit, default branch. Uses Contents API. Includes inline validation (non-blocking). This alone eliminates the clipboard ritual for the most common case: writing an article, decision, or planning doc from Claude Chat.

**Test:** Produce an article in Claude Chat conversation. Call `oddkit_write`. Article appears in the repo with YAML frontmatter intact. No clipboard. No tool switch.

### Layer 2: Multi-file atomic commits

Add Git Data API support for `files.length > 1`. Enables committing a decision record alongside its referenced planning doc atomically.

### Layer 3: Branches and PRs

Add `branch` and `pr` parameters. Includes orphan prevention (detect existing open branches/PRs). Enables the progressive protection model.

### Layer 4: Context detection and recommendations

oddkit detects repo context (branch protection, CI, collaborators, deployments) and recommends appropriate protection level. "You have CI — want me to use PRs so your checks run?"

-----

## Derivation

- **D0017** (`docs/decisions/D0017-oddkit-write-path.md`) — the decision that defines this implementation
- **Planning doc** (`docs/planning/oddkit-write-access.md`) — the original architectural plan
- **Ritual Is a Smell** — the clipboard ritual this eliminates
- **Use Only What Hurts** — progressive layers, not upfront complexity
- **Content-Addressed Caching** (`docs/oddkit/IMPL-content-addressed-caching.md`) — the read-side architecture this complements
