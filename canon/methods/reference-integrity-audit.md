---
uri: klappy://canon/methods/reference-integrity-audit
title: "Reference Integrity Audit"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "methods", "audit", "references", "drift", "managed-agents", "anti-cache-lying"]
epoch: E0007
date: 2026-04-09
derives_from: "odd/constraint/anti-cache-lying.md, canon/methods/governance-validation-via-agents.md, canon/values/axioms.md"
complements: "canon/meta/frontmatter-schema.md, canon/methods/supersession.md, canon/methods/self-audit.md"
governs: "All klappy:// URIs, frontmatter cross-references, and README index tables across the canon"
---

# Reference Integrity Audit

> Every cross-reference is a claim. A `klappy://` URI says "this document exists at this address." A `complements` field says "this sibling is real." A README table says "these are the files in this directory." When the target moves or disappears and the reference doesn't update, the reference lies. This method finds every lie.

---

## Summary — References Are Claims, Broken References Are Debts

A knowledge canon with 400+ documents and 800+ internal references accumulates referential debt the same way code accumulates technical debt — silently, then suddenly. A renamed file breaks every document that pointed at it. A new constraint added to `canon/constraints/` sits invisible because the README's index table was last updated three months ago.

Anti-cache-lying (Axiom 1) prohibits storing derived content as source when the source changes and the cache doesn't. README index tables are exactly this: a cached projection of directory contents stored as authored markdown. Frontmatter `complements` fields are exactly this: a cached claim that a sibling exists at a specific path.

This method defines what to check, what broken means, and how to classify findings. It does not define how to scan — the auditing agent discovers its own methodology using bash and oddkit. Governance fetched, not hardcoded.

---

## What Counts as a Reference

### klappy:// URIs

Any occurrence of `klappy://` followed by a path, anywhere in a file's content or frontmatter. Each URI is a claim that a document with that URI exists in the canon's `uri:` frontmatter index.

### Frontmatter Cross-Reference Fields

The following frontmatter fields contain file paths or comma-separated lists of file paths: `derives_from`, `complements`, `related`, `supersedes`, `superseded_by`, `governs`. Each path is a claim that the target file exists at that location in the repository.

### README Index Tables

README files that contain markdown tables or lists linking to sibling files in their directory. Each link is a claim that the target file exists. The inverse is also auditable: a file that exists in the directory but is absent from the README's listing is a stale index.

### Markdown Links

Standard markdown links `[label](path.md)` that reference other documents in the repo.

---

## What Broken Means

A reference is broken when its target does not exist at the location claimed. This includes:

- A `klappy://` URI that matches no document's `uri:` frontmatter field
- A file path in `complements` or `derives_from` that points to a nonexistent file
- A README table entry linking to a file that has been moved or deleted
- A file present in a directory whose README does not mention it (stale index)

---

## Classification

Each finding is classified to determine the appropriate fix:

| Classification | Meaning | Fix |
|---------------|---------|-----|
| **DEAD** | Target doesn't exist. oddkit search returns nothing similar. | Remove the reference or create the missing document |
| **MOVED** | Target exists under a different path or URI. oddkit search finds it. | Update the reference to the new location |
| **STALE_INDEX** | A file exists in a directory but its README doesn't list it. | Regenerate the README's listing section, or accept that oddkit IS the index |
| **TEMPLATE** | Reference is a placeholder in a template or example file. | Ignore — not a real claim |

The MOVED vs DEAD distinction matters. An agent should search oddkit by title or key terms from the dead URI before classifying as DEAD. A document that moved is a cheap fix (update the path). A document that was deleted may require removing the reference or creating a successor.

---

## When to Run

- **Before any version bump** — the CHANGELOG should not ship with known broken references
- **After any batch file operation** — renames, directory restructures, epoch declarations that add many files
- **Periodically** — referential debt accrues between operations. Monthly or after any session that touches 5+ files
- **Before publication** — any `public: true` writing with broken internal links damages reader trust

---

## Agent Workflow

Same infrastructure as governance validation (see `canon/methods/governance-validation-via-agents.md`):

- **Tools:** bash (clone, scan, git), text editor (read and edit files)
- **MCP:** oddkit at `https://oddkit.klappy.dev/mcp` — used to search for moved documents and verify URI resolution

The agent receives a task: "Run a reference integrity audit on klappy/klappy.dev." It fetches this method doc via oddkit to learn what to check and how to classify. No methodology hardcoded in the launcher.

### The workflow is: audit, fix, PR.

1. **Clone** the repo, create a branch (`fix/reference-integrity-YYYY-MM-DD`)
2. **Scan** for broken references using the taxonomy above
3. **Classify** each finding (DEAD, MOVED, STALE_INDEX) — search oddkit before calling anything DEAD
4. **Fix** what can be fixed mechanically:
   - MOVED → update the reference to the new path/URI
   - STALE_INDEX → add the missing file to the README listing
   - DEAD → remove the broken reference, or add a `<!-- TODO: target missing -->` comment if removal would damage the document's meaning
5. **Commit** with a descriptive message listing findings and fixes
6. **Push and open a PR** with the full audit summary in the PR body

An audit that only reports is a document that lies about the state of things tomorrow. The PR is the artifact. The JSON report, if produced, lives in the PR description — not as a standalone file.

---

## Known Patterns

These patterns recur in audits and are worth watching for:

**URI resolution mismatch.** A file exists and has a `uri:` field, but other documents reference it with a slightly different URI (missing `.md`, different path prefix, `README` vs `README.md`). One fix resolves many findings.

**Deleted directory, surviving references.** An entire directory is removed (e.g., `canon/agents/`) but documents in other directories still point into it. Usually indicates a structural decision that wasn't propagated.

**README table rot.** READMEs that were last updated during an early epoch. Every file added since then is invisible in the index. This is the anti-cache-lying violation — a projection stored as source.

**Frontmatter cascade.** A renamed file breaks `complements` fields in every document that referenced it. The fix is mechanical but must touch every referencing file.

---

## Relationship to Anti-Cache-Lying

README index tables are the documentation equivalent of a TTL cache: a snapshot of a past observation served as current truth. When the source changes and the index doesn't, the index lies. This audit detects the lie. The durable fix is JIT generation — oddkit IS the index, READMEs describe folders, consumers query dynamically. Until JIT generation ships, this audit is the stopgap that keeps the lies visible.

---

## See Also

- [Governance Validation via Managed Agents](klappy://canon/methods/governance-validation-via-agents) — the sibling validation method
- [Anti-Cache Lying](klappy://odd/constraint/anti-cache-lying) — the constraint this audit enforces
- [Supersession](klappy://canon/methods/supersession) — how documents are properly retired
- [Frontmatter Schema](klappy://canon/meta/frontmatter-schema) — authoritative field reference for cross-reference fields
- [Self-Audit](klappy://canon/methods/self-audit) — manual audit checklist that this method partially automates
