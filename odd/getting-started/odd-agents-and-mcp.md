---
uri: klappy://odd/getting-started/agents-and-mcp
title: "Agents & MCP (Experimental)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["agents", "mcp", "oddkit", "getting-started", "experimental"]
---

# ODD Agents & MCP: Orientation

> ⚠️ **Experimental** — This describes optional tooling around ODD. No stability guarantees. No "best practice" claims.

---

## What this is

ODD is a thinking system, not a framework. It defines how to reason about completeness, evidence, and authority in software work. It does not prescribe tools, languages, or workflows.

oddkit is a CLI and MCP server that helps tools query ODD canon. It supports judgment—it does not automate decisions. If your agent calls oddkit, it gets citations and constraints. What the agent does with them is still up to you.

Agents and MCP are optional accelerators. **If you don't use agents or MCP, ODD still works.** You can read the canon directly and apply it manually. The tooling exists for those who want machine-assisted enforcement, not as a requirement.

---

## The three pieces

### A. Canon (required conceptually)

- Lives at [klappy.dev/canon](https://klappy.dev/canon)
- Defines authority, epistemics, and constraints
- Tool-agnostic — works with any editor, any language, any workflow
- Start here: [Epistemic Guide](/docs/agents/odd-epistemic-guide)

### B. oddkit (optional, recommended)

- CLI + MCP server
- Lets tools query canon programmatically
- Returns citations, not answers
- Does not enforce behavior — it informs

### C. Subagents (optional, experimental)

- Cursor / Claude helpers that enforce sequencing and citation
- Derived from canon, never authoritative on their own
- If canon and subagent conflict, canon wins

---

## Minimal install paths

### Option 1: Just read canon (zero install)

No tools needed. Start with the [Epistemic Guide](/docs/agents/odd-epistemic-guide).

ODD works without any CLI or MCP. Read the canon, apply judgment manually.

### Option 2: oddkit CLI only

```bash
npx github:klappy/oddkit librarian -q "What phase are we in?"
```

Ask questions, get citations. No MCP required.

### Option 3: MCP server (advanced)

MCP lets Cursor/Claude call oddkit automatically at policy questions and completion claims. See the [oddkit repository](https://github.com/klappy/oddkit) for setup.

One-liner setup:

```bash
npx oddkit init
```

This writes MCP config to `~/.cursor/mcp.json`. Restart Cursor.

### Option 4: Cursor subagent (experimental)

Copy the subagent file, add citation rules to your project.

⚠️ **Subagents are derived from canon—do not edit them directly.** If you need different behavior, override via canon, not by modifying subagent instructions.

---

## What this doc does NOT cover

This orientation card intentionally omits:

- Full MCP setup guide
- Recommended workflows
- "ODD best practices"
- Golden path diagrams
- How to be productive fast

Those come later—after mechanical enforcement exists and patterns stabilize.

---

## Summary

| Piece     | Required? | What it does                         |
| --------- | --------- | ------------------------------------ |
| Canon     | Yes\*     | Defines authority and constraints    |
| oddkit    | No        | Lets tools query canon               |
| Subagents | No        | Enforce sequencing via Cursor/Claude |

\*Canon is required conceptually—you need to understand the rules. But you don't need any tool to read it.

---

## See also

- [ODD Epistemic Guide](/docs/agents/odd-epistemic-guide) — Start here
- [Canon Index](/canon/README.md) — Browse constraints
- [oddkit repository](https://github.com/klappy/oddkit) — Tool documentation
