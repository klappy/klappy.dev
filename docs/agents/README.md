# Agent Behavior & Contracts

How agents think and behave in this system.

## Core Doctrine: Citation-First Agents

Agents in this repo must not answer from "what the model knows" when a trusted source exists.

**Rules:**

- Prefer trusted sources (repo docs, compiled packs, MCP allowlist, session artifacts)
- Cite everything that materially contributes to the answer
- Quote load-bearing text; paraphrase only to improve readability
- Admit unknowns; propose the next retrieval step rather than inventing

See: `docs/agents/librarian/contract.md`

## Agent Types

| Agent            | Role                                        | Key Constraint                        |
| ---------------- | ------------------------------------------- | ------------------------------------- |
| **Orchestrator** | Coordinates subagents, routes requests      | Delegates retrieval to Librarian      |
| **Discovery**    | Runs maturity-aware discovery sessions      | Asset-first, no invented requirements |
| **Librarian**    | Retrieves and explains from trusted sources | Citation-first, no bluffing           |

## Structure

```
docs/agents/
├── discovery/          # Discovery-phase behavior
│   ├── overlays/       # Role definitions (WHO the agent is)
│   ├── protocols/      # Task procedures (HOW to do it)
│   └── recipes/        # Composition manifests (WHAT to load)
├── librarian/          # Retrieval-first subagent
│   ├── contract.md     # Core behavioral constraints
│   └── trusted-sources.md  # Allowed source policy
└── (future: skills/, common/)
```

## Key Concepts

| Concept      | Purpose                                    | Example                           |
| ------------ | ------------------------------------------ | --------------------------------- |
| **Overlay**  | Defines agent role and behavioral contract | `discovery-role-overlay.md`       |
| **Protocol** | Defines task-specific procedure            | `discovery-interview-protocol.md` |
| **Recipe**   | Composes overlays + packs + modules        | `prd-discovery.s.recipe.json`     |
| **Contract** | Defines strict operating constraints       | `librarian/contract.md`           |
| **Policy**   | Defines allowed inputs/sources             | `librarian/trusted-sources.md`    |

## Overlays vs Protocols vs Recipes

| Aspect  | Overlay            | Protocol         | Recipe         |
| ------- | ------------------ | ---------------- | -------------- |
| Defines | WHO the agent is   | HOW to do a task | WHAT to load   |
| Scope   | Role-wide behavior | Task-specific    | Session config |
| Changes | Rarely             | Per task type    | Per use case   |

## Where Things Live

| Content               | Location                  | Notes           |
| --------------------- | ------------------------- | --------------- |
| Authored contracts    | `docs/agents/**`          | Source of truth |
| OddKit tooling        | oddkit.klappy.dev         | Derivative work |

**Rule:** Author here. Generate elsewhere.

## MCP Allowlists

When using MCP servers as trusted sources:

1. **Explicit allowlist required** — The orchestrator must provide an allowlist of MCP server IDs
2. **No allowlist = no MCP** — If no allowlist is provided, MCP access is disabled
3. **Still cite** — MCP responses must be cited with server ID, tool name, and relevant excerpt

**Adding a new MCP server:**

1. Evaluate the server's trustworthiness and data provenance
2. Add to the orchestrator's allowlist configuration
3. Document what the server provides in `librarian/trusted-sources.md`
4. Test that citations work correctly

## Routing: When to Call the Librarian

Call the Librarian when the user asks:

- "Where is that defined?"
- "What does ODD/Canon say about X?"
- "Show me the rule / constraint / decision"
- "Why do we do this?"
- "Which doc should I read next?"

The Librarian returns:

- **SUPPORTED** (quotes + citations), or
- **INSUFFICIENT_EVIDENCE** (explicit unknowns + next retrieval step)

## See Also

- `/public/_compiled/packs/` — Context packs (S/M/L slices)
- `/infra/scripts/compile-*.js` — Pack compilers
- `librarian/contract.md` — Full Librarian behavioral contract
- `librarian/trusted-sources.md` — Allowed sources policy