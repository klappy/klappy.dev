---
uri: klappy://interfaces/canon-frontmatter/contract
title: "Canon Frontmatter Contract"
audience: internal
exposure: public
tier: 2
voice: neutral
stability: stable
tags: ["interfaces", "canon", "frontmatter", "schema", "verification"]
target_repo: "oddkit"
---

# Canon Frontmatter Contract

This contract defines the required YAML frontmatter for canonical markdown files so that
verification tooling can reliably index, validate, and serve content without drift.

## Scope

Applies to markdown documents intended to be addressable content in the site corpus, including:

- `/canon/**`
- `/docs/**` (only when treated as addressable content)
- Any content registered into `/public/content/manifest.json`

This contract does **not** apply to:
- generated output under `/public/_compiled/**`
- attempt artifacts under `/attempts/**`

## Required Fields (E0002+)

All new canonical documents MUST include YAML frontmatter with at least:

- `uri` (string) — stable, unique identifier
- `title` (string)
- `tier` (number) — progressive disclosure tier (1 = most prominent)
- `tags` (array of strings)

### Optional but Recommended Fields

- `audience` (string) — e.g. `public | internal`
- `exposure` (string) — e.g. `public | internal`
- `voice` (string) — e.g. `neutral`
- `stability` (string) — e.g. `stable | draft`
- `category` (string)
- `status` (string)
- `version` (string)

## Canonical Example (Minimum)

```yaml
---
uri: klappy://odd/example
title: "Example Doc"
tier: 2
tags: ["odd", "example"]
---
```

## Uniqueness Rules

- `uri` MUST be globally unique across the repo's addressable corpus.
- If two files claim the same `uri`, verification MUST fail.

## Legacy

Older docs may exist that predate this contract and use alternate frontmatter shapes.
Legacy docs are permitted during epoch transitions, but:
- Any doc modified or created in the E0002+ era MUST conform to this contract.
- Tooling may warn on legacy shapes; warnings are acceptable until the migration is complete.

## Relationship to Manifest

`/public/content/manifest.json` is the published inventory.
Frontmatter is the file's self-declaration.
They must align (same identity, same title intent, no conflicting tags).

If they diverge, frontmatter is the source-of-truth for the file, and the manifest must be updated to match.
