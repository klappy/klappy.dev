# 📋 Agent-Skill Lane Decision Log

Lane-specific Architecture Decision Records (ADRs) for the agent-skill product lane.

> **Scope:** These decisions apply only to this lane. They may override or extend canon patterns with documented rationale. Successful patterns may be proposed for elevation to canon.

---

## ✅ Active Decisions

### Structure & Organization

| ID                                            | Title                   | What Was Decided                                                                                                                                   |
| --------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [D0001](./D0001-version-first-structure.md)   | Version-first structure | Use `vX.Y/` folders at top level (not `attempts/prd-vX.Y/`). Each version contains PRD, src, dist, attempts. Enables immutable versioned releases. |
| [D0003](./D0003-versioned-kickoff-pattern.md) | Versioned KICKOFF       | Each PRD version has its own `KICKOFF.md`. Lane root has minimal one-liner pointing to active version. KICKOFFs freeze with their version.         |
| [D0004](./D0004-readme-contract-pattern.md)   | README + CONTRACT       | Split lane docs: `README.md` for human overview, `CONTRACT.md` for formal structure/deviations. README links to CONTRACT for details.              |

### Deployment & Distribution

| ID                                        | Title                 | What Was Decided                                                                             |
| ----------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------- |
| [D0002](./D0002-lane-owned-deployment.md) | Lane-owned deployment | This lane owns its own Cloudflare Pages project. No website lane dependency. Full isolation. |

### Attempt Practices

| ID                                             | Title            | What Was Decided                                                                                                                            |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [D0005](./D0005-test-execution-containment.md) | Test containment | Tests during attempts CANNOT write outside attempt folder. Use mock structures (e.g., `mock-website-dist/`) to prove cross-lane mechanisms. |

### Governance

| ID                                           | Title                  | What Was Decided                                                                                                                                        |
| -------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [D0006](./D0006-lane-level-decision-logs.md) | Lane decisions folder  | Lanes maintain their own `decisions/` for patterns that don't rise to canon. Enables transparent deviation + elevation path.                            |
| [D0007](./D0007-upstream-canon-loading.md)   | Upstream canon loading | Load ODD pack from public URL (`/latest/prd-guide-pack.md`) FIRST in kickoffs, before lane instructions. Portable + ensures canon shapes all decisions. |
| [D0008](./D0008-roadmap-vision-only.md)      | ROADMAP vision only    | ROADMAP tracks future vision only, not version status. History is single source of truth for champion/failed status. Prevents drift.                     |
| [D0009](./D0009-history-folder-pattern.md)   | History folder pattern | Lane history in `history/` folder with index + individual entry files. Mirrors `decisions/` pattern. Replaces single LEDGER.md file.                     |

---

## 🔄 How Decisions Are Made

1. **During an attempt**: Note decision in `ATTEMPT.md` or `LEARNINGS.md`
2. **After learning stabilizes**: Document as decision file here
3. **If pattern proves valuable**: Propose elevation to canon

---

## 📖 RTFM Check

Before documenting a new pattern, verify it isn't already in canon:

- `docs/appendices/product-lanes.md` — Lane isolation, cross-lane rules
- `docs/appendices/attempt-lifecycle.md` — Attempt containment
- `docs/appendices/repo-topology.md` — PRD immutability
- `docs/decisions/` — Existing decisions

Some of our learnings (D0001, D0002) were applications of existing canon principles we failed to read carefully. Document this when it happens — it's valuable evidence that canon is correct but underutilized.

---

## 🔗 Relationship to Canon

These decisions:

- **May override** canon defaults (with documented rationale)
- **Must not violate** canon constraints (lane isolation, evidence requirements)
- **Should inform** future canon evolution

When a lane decision proves valuable across multiple lanes, it becomes a candidate for canon promotion.

---

## 📝 Decision File Template

```markdown
# D000X — [Title]

## Decision

[1-2 sentences stating what was decided]

## Status

**Active** | Proposed | Deprecated

## Context

[What problem prompted this decision]

## Why

- [Bullet point]
- [Bullet point]

## Consequences

- [What this enables]
- [What this prevents]
- [What this costs]

## 🔗 Relationship to Canon

- Overrides: [canon pattern, if any]
- Extends: [canon pattern, if any]
- Candidate for elevation: Yes/No

## Evidence

- Conversation: [date or reference]
- Attempt: [path, if applicable]
```

---

## 🚫 Deprecated Decisions

_None yet._
