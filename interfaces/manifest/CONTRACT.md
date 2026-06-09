---
contract: manifest
version: 2.0.0
status: active
target_repo: "oddkit"
---

# Manifest Contract (manifest@2.0.0)

This contract defines the required schema and semantics for:

- `/public/content/manifest.json`

The manifest is the authoritative inventory of addressable content and is consumed by:
- the website lane UI
- ai-navigation systems
- agent-skill systems
- future MCP proxies

---

## Compatibility Promise

Any consumer that supports `manifest@2.x` must be able to load and interpret any `manifest@2.x` file without modification.

A producer that claims `manifest@2.x` must emit a file that conforms to this contract.

---

## Required Top-Level Fields

The manifest JSON MUST be an object containing:

- `pack_version` (string) — version of the manifest pack (not semver for the repo; informational)
- `resources` (array) — list of resource objects

Example:

```json
{
  "pack_version": "0.2.0",
  "resources": []
}
```

---

## Resource Object Schema

Each entry in `resources` MUST contain:

- `uri` (string) — globally unique, stable identifier (e.g. `klappy://odd/epochs`)
- `title` (string) — display title
- `path` (string) — repo-relative path beginning with `/`
- `tier` (integer) — 0, 1, or 2 (progressive disclosure tier)

Each entry MAY contain:

- `tags` (array of strings)
- `summary` (string)
- `status` (string)

---

## Semantics

### `uri`

- MUST be stable across time.
- MUST NOT be reused for different content.
- MAY point to updated content at the same path over time.

### `path`

- MUST resolve to an actual file in the repo.
- MUST begin with `/`.

### `tier`

Progressive disclosure tiers:

- **0** — immediate orientation / public entrypoints
- **1** — core canon / curated entrypoints
- **2** — full machinery / appendices / deep structure

---

## Breaking Change Definition (MAJOR)

Any of the following requires a MAJOR version bump:

- removing or renaming required fields
- changing the meaning of `tier`
- changing `resources` from an array to another structure
- changing required URI conventions such that existing URIs become invalid

---

## Backwards-Compatible Changes (MINOR)

Allowed without a MAJOR bump:

- adding new optional fields to resources
- adding new resource entries
- adding new tags, summaries, statuses

---

## Verification Rules (for tooling)

A verifier for `manifest@2.0.0` MUST check:

- manifest is valid JSON
- top-level contains `resources` array
- every resource contains `uri`, `title`, `path`, `tier`
- `tier` is one of `0|1|2`
- every `path` exists in the repository

---

## Change Log

- **2.0.0** — Introduces required `tier` field on all resources and formalizes schema.
