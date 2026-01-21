# 📜 Agent-Skill Lane History

What actually happened — champions, failures, learnings, infrastructure changes.

For future vision, see [ROADMAP.md](../ROADMAP.md).

---

## 📋 Entries

| ID | Version/Event | What Happened | Date |
|----|---------------|---------------|------|
| [H0001](./H0001-v1.1-champion.md) | v1.1 | Champion — PRD Creation Guidance pack delivered (~12K tokens) | 2026-01-20 |
| [H0002](./H0002-v1.2-failed.md) | v1.2 | Failed — Cross-lane violation (website lane dependency) | 2026-01-20 |
| [H0003](./H0003-lane-structure-migration.md) | Infrastructure | Migrated to version-first folder structure | 2026-01-20 |
| [H0004](./H0004-v1.2.1-champion.md) | v1.2.1 | Champion — Lane-owned Cloudflare Pages deployment | 2026-01-21 |
| [H0005](./H0005-v1.2.2-failed.md) | v1.2.2 | Failed — Exposed ODD violations (ephemeral artifacts, compile plan location) | 2026-01-21 |
| [H0006](./H0006-v1.2.3-champion.md) | v1.2.3 | Champion — Canon refresh v0.5.4 + ODD compliance | 2026-01-21 |
| [H0007](./H0007-v1.2.4-champion.md) | v1.2.4 | Champion — Canon refresh v0.8.0 (path fixes + new content) | 2026-01-21 |
| [H0008](./H0008-v1.3-champion.md) | v1.3 | Champion — PRD Elicitation Enhancement (interview mechanics, stage typing) | 2026-01-21 |

---

## 🏷️ Entry Types

- **Champion**: PRD attempt succeeded, deliverable promoted
- **Failed**: PRD attempt failed, learnings captured
- **Infrastructure**: Non-PRD changes to lane structure/tooling

---

## ➕ How to Add an Entry

1. Create `H000X-<slug>.md` using template below
2. Add row to index table above
3. Keep entries append-only (don't edit old entries except to fix errors)

---

## 📝 Entry Template

```markdown
# H000X — [Title]

- **Date**: YYYY-MM-DD
- **Type**: Champion | Failed | Infrastructure
- **PRD**: vX.Y (if applicable)
- **Attempt**: `vX.Y/attempts/attempt-NNN/` (if applicable)

## Summary

[1-2 sentences: what happened]

## Deliverable (if Champion)

- [What was produced, where it lives]

## What Worked

- [Bullet points]

## What Didn't

- [Bullet points]

## Learnings

- [1-3 bullets that inform future work]

## Follow-up

- [One next action, if any]
```
