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

oddkit is the CLI and MCP server for ODD. It lets tools — terminals, IDEs, and Claude — query the ODD canon and get back citations, constraints, and epistemic guidance. It supports judgment; it does not automate decisions.

ODD itself is a thinking system, not a framework. You can use it without any tooling at all — start with the [Epistemic Guide](/docs/agents/odd-epistemic-guide.md) and apply it manually. oddkit exists for people who want machine-assisted access to that same canon.

All three interfaces expose the same 11 tools with the same names and behavior. One core, two wrappers:

|Method          |Transport|Use Case                 |Setup                                     |
|----------------|---------|-------------------------|------------------------------------------|
|**CLI**         |Terminal |One-off queries          |`npx github:klappy/oddkit orient -i "..."`|
|**MCP (local)** |stdio    |Cursor, Claude Code      |`npx oddkit init --claude` or `--cursor`  |
|**MCP (remote)**|HTTP     |Claude.ai, iOS, iPad, web|Connect `https://oddkit.klappy.dev/mcp`   |

-----

## CLI quickstart

The CLI requires no installation beyond npx. Every command follows the same pattern: a tool name, an `-i` flag for input, and an optional `-f` flag for output format (json, md, or tooljson). You start by orienting on your goal — oddkit tells you what epistemic phase you're in and what questions need answering before you proceed:

```bash
# Orient on a goal — where does this idea sit epistemically?
oddkit orient -i "Build a notification system"

# Search the canon for constraints and prior decisions
oddkit search -i "definition of done"

# Pressure-test a proposal against canon
oddkit challenge -i "We should use a NoSQL database"

# Check if you're ready to transition phases
oddkit gate -i "Ready to start implementation"

# Pre-implementation check — constraints, pitfalls, relevant docs
oddkit preflight -i "Implement QR login flow"

# Validate a completion claim against required evidence
oddkit validate -i "Done with the UI update. Screenshot: ui.png"

# Capture a decision as a durable record
oddkit encode -i "We chose PostgreSQL over MongoDB for ACID compliance"

# Fetch a specific canon document by URI
oddkit get -i "klappy://canon/definition-of-done"

# Browse all available documentation
oddkit catalog

# Check version and canon target
oddkit version

# Force refresh cached baseline data
oddkit invalidate-cache
```

Run any command via npx without a global install: `npx github:klappy/oddkit orient -i "..."`.

-----

## MCP for Cursor and Claude Code

Local MCP gives your IDE direct access to all 11 oddkit tools. Setup is one command — it writes the config and you restart:

```bash
npx oddkit init --claude    # for Claude Code → writes ~/.claude.json
npx oddkit init --cursor    # for Cursor → writes ~/.cursor/mcp.json
npx oddkit init --all       # both at once
```

If you prefer manual config, add this to your MCP configuration:

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

After restart, verify with `oddkit search -i "What is epistemic challenge?"` — you should see citations from canon.

-----

## MCP for Claude.ai, iOS, and iPad

The remote MCP server runs on Cloudflare at `https://oddkit.klappy.dev/mcp`. No local install required. In Claude.ai, go to Settings → Connected Apps / MCP Servers, add a new server with that URL, name it "oddkit", and allow the tools when prompted.

Once connected, you can talk to Claude naturally — say "orient me on this idea" and Claude calls orient, "challenge the assumption that we need a database" and Claude calls challenge, "am I ready to start building?" and Claude calls gate. The tools work identically to CLI and local MCP because they share the same core.

-----

## The 11 tools

oddkit exposes 11 tools across all interfaces. The CLI uses a space separator (`oddkit orient`), MCP uses an underscore (`oddkit_orient`). Everything else — arguments, behavior, output shape — is identical.

### Epistemic workflow

|Tool       |What it does                                                                         |
|-----------|-------------------------------------------------------------------------------------|
|`orient`   |Assess where a goal or idea sits epistemically. Entry point — call this first.       |
|`challenge`|Pressure-test a claim, assumption, or proposal against canon constraints.            |
|`gate`     |Check readiness to transition between epistemic phases. Blocks premature convergence.|
|`encode`   |Capture a decision, insight, or boundary as a durable record.                        |

### Knowledge

|Tool     |What it does                                                                |
|---------|----------------------------------------------------------------------------|
|`search` |Search canon and baseline docs by natural language query or tags.           |
|`get`    |Fetch a specific canonical document by `klappy://` URI.                     |
|`catalog`|List all available documentation with categories and start-here suggestions.|

### Validation and operations

|Tool              |What it does                                                                            |
|------------------|----------------------------------------------------------------------------------------|
|`validate`        |Check completion claims against required artifacts. Returns VERIFIED or NEEDS_ARTIFACTS.|
|`preflight`       |Pre-implementation check. Returns constraints, definition of done, and pitfalls.        |
|`version`         |Returns oddkit version and the authoritative canon target.                              |
|`invalidate-cache`|Force refresh of cached baseline/canon data.                                            |

In MCP, a unified `oddkit` tool also accepts an `action` parameter and routes to any action. This is the recommended MCP entrypoint — agents use a single tool for all epistemic operations:

```
oddkit({ action: "orient", input: "Build a notification system" })
oddkit({ action: "challenge", input: "We should use a NoSQL database" })
oddkit({ action: "gate", input: "Ready to start implementation" })
```

-----

## Typical workflow

A natural oddkit-assisted workflow follows this progression:

1. **Orient** — "What phase is this idea in?" → surfaces unresolved items and assumptions
1. **Search / Get** — Retrieve relevant canon constraints and prior decisions
1. **Challenge** — Pressure-test proposals before committing
1. **Gate** — Verify readiness before transitioning (e.g., planning → execution)
1. **Preflight** — Before implementation, get constraints, relevant files, and pitfalls
1. **Encode** — Capture key decisions as durable records
1. **Validate** — Verify completion claims have required artifacts

You don't need all steps every time. A quick canon lookup might be just a search. A complex feature might touch all of them.

-----

## Subagents

ODD provides two complementary prompt-based agent roles for IDEs, both optional and experimental. The **Epistemic Guide** acts as a cognitive governor — it gates premature action, surfaces uncertainty, and explains what evidence is needed. The **Scribe** captures learnings and decisions to ledgers and proposes promotion to canon when patterns stabilize.

Both are derived from canon. If canon and a subagent conflict, canon wins. Do not edit subagent files directly — override behavior through canon instead.

```bash
mkdir -p ~/.cursor/agents

curl -o ~/.cursor/agents/odd-epistemic-guide.md \
  https://raw.githubusercontent.com/klappy/klappy.dev/main/docs/agents/odd-epistemic-guide.md

curl -o ~/.cursor/agents/odd-scribe.md \
  https://raw.githubusercontent.com/klappy/klappy.dev/main/docs/agents/odd-scribe.md
```

-----

## Baseline and overrides

By default, oddkit uses the klappy.dev repository as the baseline canon (currently 238 documents). You can override this for your own organization:

```bash
# Use your own canon repo
export ODDKIT_BASELINE="https://github.com/yourorg/your-canon.git"

# Pass on the command line
oddkit search -i "What is done?" --baseline /path/to/local/canon

# Pin to a specific branch or tag
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

**See also:** [Epistemic Guide](/docs/agents/odd-epistemic-guide.md) · [Canon Index](/canon/README.md) · [oddkit repo](https://github.com/klappy/oddkit) · [MCP Reference](https://github.com/klappy/oddkit/blob/main/docs/MCP.md)
