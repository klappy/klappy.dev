---
uri: klappy://odd/getting-started/agents-and-mcp
title: "Agents & MCP"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["agents", "mcp", "oddkit", "getting-started"]
---

# ODD Agents & MCP: Getting Started

> oddkit v0.13.0 — Epistemic tooling for ODD-governed work.

-----

## What this is

ODD is a thinking system, not a framework. It defines how to reason about completeness, evidence, and authority in software work.

oddkit is a CLI and MCP server that helps tools query the ODD canon. It supports judgment — it does not automate decisions. If your agent calls oddkit, it gets citations and constraints. What the agent does with them is still up to you.

-----

## Three ways to use oddkit

|Method          |Transport|Use Case                 |Setup                                     |
|----------------|---------|-------------------------|------------------------------------------|
|**CLI**         |Terminal |One-off queries          |`npx github:klappy/oddkit orient -i "..."`|
|**MCP (local)** |stdio    |Cursor, Claude Code      |`npx oddkit init --claude` or `--cursor`  |
|**MCP (remote)**|HTTP     |Claude.ai, iOS, iPad, web|Connect `https://oddkit.klappy.dev/mcp`   |

All three interfaces expose the same 11 tools with the same names and behavior. One core, two wrappers.

-----

## Option 1: Just read canon (zero install)

No tools needed. Start with the [Epistemic Guide](/canon/agents/odd-epistemic-guide).

ODD works without any CLI or MCP. Read the canon, apply judgment manually.

-----

## Option 2: CLI (no MCP required)

```bash
# Orient on a goal — where does this idea sit epistemically?
oddkit orient -i "Build a notification system"

# Search the canon
oddkit search -i "definition of done"

# Challenge an assumption
oddkit challenge -i "We should use a NoSQL database"

# Check if you're ready to transition phases
oddkit gate -i "Ready to start implementation"

# Pre-implementation check — constraints, pitfalls, relevant docs
oddkit preflight -i "Implement QR login flow"

# Validate a completion claim
oddkit validate -i "Done with the UI update. Screenshot: ui.png"

# Encode a decision as a durable record
oddkit encode -i "We chose PostgreSQL over MongoDB for ACID compliance"

# Fetch a specific canon document by URI
oddkit get -i "klappy://canon/definition-of-done"

# Browse available documentation
oddkit catalog

# Check version and canon target
oddkit version

# Force refresh cached baseline data
oddkit invalidate-cache
```

Run via npx without install: `npx github:klappy/oddkit orient -i "..."`

-----

## Option 3: MCP for Cursor / Claude Code (local, stdio)

### One-command setup

```bash
# Claude Code
npx oddkit init --claude

# Cursor
npx oddkit init --cursor

# Both at once
npx oddkit init --all
```

This writes MCP config to the appropriate location (`~/.claude.json` or `~/.cursor/mcp.json`). Restart your IDE after running.

### Manual config (if you prefer)

Add to your MCP config:

```json
{
  "mcpServers": {
    "oddkit": {
      "command": "npx",
      "args": ["--yes", "--package", "github:klappy/oddkit", "oddkit-mcp"],
      "env": {
        "ODDKIT_BASELINE": "https://github.com/klappy/klappy.dev.git"
      }
    }
  }
}
```

### Verify

After restart, your IDE should show oddkit tools. Test with:

```bash
oddkit search -i "What is epistemic challenge?"
```

-----

## Option 4: MCP for Claude.ai / iOS / iPad (remote, HTTP)

oddkit runs as a Cloudflare Worker at `https://oddkit.klappy.dev/mcp`. No local install needed.

### Claude.ai setup

1. Go to **Settings → Connected Apps / MCP Servers** (or the integrations menu)
1. Add a new MCP server
1. Enter the URL: `https://oddkit.klappy.dev/mcp`
1. Name it `oddkit`
1. Allow the tools when prompted

### What you get

Once connected, Claude.ai has access to all 11 oddkit tools natively. You can say things like:

- "Orient me on this idea"
- "Challenge the assumption that we need a database"
- "Am I ready to start building?"
- "Search the canon for definition of done"

Claude calls the appropriate oddkit tool automatically.

-----

## Available tools

oddkit exposes 11 tools. The CLI and MCP share one core implementation — same names, same behavior, same output shapes.

### Epistemic workflow tools

|Tool       |What it does                                                                         |
|-----------|-------------------------------------------------------------------------------------|
|`orient`   |Assess where a goal or idea sits epistemically. Entry point for guidance.            |
|`challenge`|Pressure-test a claim, assumption, or proposal against canon constraints.            |
|`gate`     |Check readiness to transition between epistemic phases. Blocks premature convergence.|
|`encode`   |Capture a decision, insight, or boundary as a durable record.                        |

### Knowledge tools

|Tool     |What it does                                                                         |
|---------|-------------------------------------------------------------------------------------|
|`search` |Search canon and baseline docs by natural language query or tags.                    |
|`get`    |Fetch a specific canonical document by `klappy://` URI.                              |
|`catalog`|List all available documentation with categories, counts, and start-here suggestions.|

### Validation & operations

|Tool              |What it does                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------|
|`validate`        |Validate completion claims against required artifacts. Returns VERIFIED or NEEDS_ARTIFACTS.    |
|`preflight`       |Pre-implementation check. Returns relevant docs, constraints, definition of done, and pitfalls.|
|`version`         |Returns oddkit version and the authoritative canon target.                                     |
|`invalidate-cache`|Force refresh of cached baseline/canon data.                                                   |

### Interface naming

|CLI              |MCP              |Cloudflare Worker|
|-----------------|-----------------|-----------------|
|`oddkit orient`  |`oddkit_orient`  |`oddkit_orient`  |
|`oddkit search`  |`oddkit_search`  |`oddkit_search`  |
|`oddkit validate`|`oddkit_validate`|`oddkit_validate`|
|…                |…                |…                |

The only difference is the separator: CLI uses a space, MCP uses an underscore. Everything else — arguments, behavior, output shape — is identical because all three call the same `handleUnifiedAction` core.

### The unified `oddkit` MCP tool

In MCP, a single `oddkit` tool accepts an `action` parameter and routes to any action. This is the recommended MCP entrypoint:

```
oddkit({ action: "orient", input: "Build a notification system" })
oddkit({ action: "challenge", input: "We should use a NoSQL database" })
oddkit({ action: "gate", input: "Ready to start implementation" })
oddkit({ action: "search", input: "definition of done" })
```

-----

## Typical workflow

A natural oddkit-assisted workflow follows this pattern:

1. **Orient** — "What phase is this idea in?" → surfaces unresolved items and assumptions
1. **Search / Get** — Retrieve relevant canon constraints and prior decisions
1. **Challenge** — Pressure-test proposals before committing
1. **Gate** — Verify readiness before transitioning (e.g., from planning to execution)
1. **Preflight** — Before implementation, get constraints, relevant files, and pitfalls
1. **Encode** — Capture key decisions as durable records
1. **Validate** — Verify completion claims have required artifacts

You don't need all steps every time. Use what the situation calls for.

-----

## Subagents (optional, experimental)

ODD provides two complementary agent roles for IDEs:

|Agent              |Purpose           |What it does                                                                  |
|-------------------|------------------|------------------------------------------------------------------------------|
|**Epistemic Guide**|Cognitive governor|Gates premature action, surfaces uncertainty, explains what evidence is needed|
|**Scribe**         |Recorder          |Captures learnings and decisions to ledgers, proposes promotion to canon      |

These are prompt-based subagents that complement oddkit's MCP tooling. They are derived from canon — if canon and subagent conflict, canon wins.

Setup for Cursor:

```bash
mkdir -p ~/.cursor/agents

curl -o ~/.cursor/agents/odd-epistemic-guide.md \
  https://raw.githubusercontent.com/klappy/klappy.dev/main/canon/agents/odd-epistemic-guide.md

curl -o ~/.cursor/agents/odd-scribe.md \
  https://raw.githubusercontent.com/klappy/klappy.dev/main/canon/agents/odd-scribe.md
```

-----

## Baseline knowledge

By default, oddkit uses [klappy.dev](https://github.com/klappy/klappy.dev) as the baseline canon (currently 238 documents). You can override this:

```bash
# Via environment variable
export ODDKIT_BASELINE="https://github.com/yourorg/your-canon.git"

# Via CLI flag
oddkit search -i "What is done?" --baseline /path/to/local/canon

# Pin to a specific branch/tag
export ODDKIT_BASELINE_REF="v1.0.0"
```

Local docs can override baseline docs using `supersedes` in frontmatter:

```yaml
---
supersedes: klappy://canon/definition-of-done
---
```

-----

## Summary

|Piece              |Required?|What it does                               |
|-------------------|---------|-------------------------------------------|
|Canon              |Yes*     |Defines authority and constraints          |
|oddkit CLI         |No       |Query canon from terminal (11 commands)    |
|oddkit MCP (local) |No       |Cursor / Claude Code integration (11 tools)|
|oddkit MCP (remote)|No       |Claude.ai / iOS / iPad / web integration   |
|Subagents          |No       |Enforce sequencing via IDE prompts         |

*Canon is required conceptually — you need to understand the rules. But you don't need any tool to read it.

-----

## See also

- [ODD Epistemic Guide](/canon/agents/odd-epistemic-guide) — Start here
- [Canon Index](/canon/README.md) — Browse constraints
- [oddkit repository](https://github.com/klappy/oddkit) — Source and CLI docs
- [MCP Reference](https://github.com/klappy/oddkit/blob/main/docs/MCP.md) — Full MCP integration details
