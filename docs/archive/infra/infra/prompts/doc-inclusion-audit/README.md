# 🔍 Document Inclusion Audit

Prompt and checklist for evaluating which documents should be included in:
- **Book export** (`klappy-dev-book-export.md`)
- **Context packs** (lane-scoped compilations)

## Files

| File | Purpose |
|------|---------|
| `PROMPT.md` | Complete audit prompt with context, criteria, and output format |
| `CHECKLIST.md` | Quick reference decision trees and tracking templates |

## When to Use

Run this audit when:
- Major documentation restructuring (like the three-tier hierarchy change)
- Adding new lanes or packs
- Suspecting content drift or staleness
- Reviewing book export size or quality

## How to Use

1. **Read the prompt** (`PROMPT.md`) to understand criteria
2. **Use the checklist** (`CHECKLIST.md`) for quick decisions
3. **Track findings** using the templates provided
4. **Produce recommendations** grouped by action type

## Quick Start

```bash
# List all markdown files to audit
find . -name "*.md" -type f | grep -v node_modules | grep -v .git | sort | wc -l

# Check current book export size
wc -l klappy-dev-book-export.md

# Review compile plans
cat infra/compile/plans/website/visitor.json
cat infra/compile/plans/website/author.json
```

## Related Documents

- [Compilation Targets](/docs/archive/compilation-targets.md) — Pack definitions
- [Canonical Compression](/docs/appendices/canonical-compression.md) — Compression philosophy
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md) — Tier definitions
- [Truth Map](/docs/archive/TRUTH_MAP.md) — Authoritative sources
