---
uri: klappy://odd/decisions/D0002
title: "The Canon Storage Model: Files Write, the Index Reads, the URI Keys"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: draft
status: proposed
tags: ["odd", "architecture", "identity", "uri", "cqrs", "bifurcation", "read-model", "write-model"]
relevance: decision
execution_posture: governing
epoch: E0009
date: 2026-06-09
derives_from:
  - "canon/principles/identity-resolved-by-protocol.md"
  - "canon/principles/scope-over-folders.md"
  - "odd/constraint/anti-cache-lying.md"
complements:
  - "docs/repo-bifurcation-and-target-repo-routing.md"
  - "canon/constraints/meaning-must-not-depend-on-path.md"
governs: "Canon storage architecture, identity minting, index policy, and the post-bifurcation retirement of target_repo"
supersedes_draft: "D0002 v1 (URI Prefixes Denote Governance Authority) — rewritten in place during the proposed window"
---

# The Canon Storage Model: Files Write, the Index Reads, the URI Keys

> The system is a database that was always here. Git is the write path, the
> content-addressed index is the read path, the URI is its primary key, and
> authority is a column. Everything else — filenames, folders, repos — is
> substrate.

## Description

The canon already runs a command-query split (CQRS). The **write model** is
git repositories holding markdown: authoring, PR review, CI gates, history,
and licensable provenance. The **read model** is the content-addressed index
oddkit builds on R2, keyed by commit SHA: URI-keyed rows, frontmatter as
columns, BM25 over bodies. Consumers — agents, the site, chat sessions —
query only the read model. Path-shaped URIs were a shortcut emulation of
this database on top of files: URI-as-primary-key, piggybacked on file
paths because they were free. The shortcut coupled the key to the storage;
reorganization and bifurcation exposed the coupling. This decision finishes
the decoupling.

## Status

**Proposed.** Challenge battery passed 2026-06-09 (planning mode, no canon
tensions, block_until_addressed false). Additionally pressure-tested across
four adversarial maintainer review rounds (registry objection, static-index
objection, discoverability objection, substrate thought experiment), each of
which amended the design. Encoded via oddkit, Decision quality 5/5.
Ratification = merging PR #228.

## Decision

1. **The system is CQRS.** Write model: git + markdown + PRs + CI. Read
   model: the content-addressed R2 index. Consumers query only the read
   model. There is no third place.
2. **The URI is the read model's primary key.** Form: authority prefix +
   opaque slug (`odd://…`, `oddkit://…`, `klappy://…`). Minted once, never
   parsed — not by consumers, not by the validator, not by oddkit beyond key
   lookup. Human-readable slugs are a courtesy (DOI practice), never a
   contract: the slug is a name that may happen to be descriptive, not an
   address.
3. **Authority is a column.** Each repo's root document self-declares its
   authority in frontmatter; pointers to peer authorities are ordinary canon
   declarations in the consuming knowledge base. The build index ingests
   both like any metadata. There is no registry, map file, or any second
   machine-readable copy.
4. **The filepath is write-path ergonomics.** Folders exist for humans
   authoring and reviewing. Paths carry zero semantic weight downstream:
   kind, authority, and audience derive from frontmatter only — never from
   path inference. (The odd/ kind-resolution bug of 2026-06-09 is the
   recorded cost of path inference: an entire tree invisible to
   default-filter catalog calls.)
5. **The built index is the only index.** No static enumerations of repo
   content in markdown — no README catalog tables, no index/orientation
   documents that list what exists. READMEs keep doctrine ("what this
   collection is for") plus a one-line prose pointer to the catalog query.
   Static tables also double-index titles into BM25, degrading the read
   model they duplicate.
6. **The bifurcation is a write-path re-shard.** The merged target_repo
   tags (PR #227) are the sort key. References cannot break, because no
   reference points at a file — all resolve through the read model, which
   federates N repos into one logical table via the authority declarations.
   Post-move, target_repo retires: authority column + physical membership
   replace it. Undecided files are authority-undecided.
7. **Grandfathering and lazy migration.** All 582 existing path-shaped URIs
   are frozen opaque strings effective immediately; their path resemblance
   is historical accident. New documents mint authority+slug once this
   decision is ratified. Old documents re-mint via supersession only when
   already being edited. Grandfathered URIs are never deleted, only
   superseded. No big-bang rename, ever.
8. **Substrate change is deferred, deliberately.** SQL/Redis/KV as the
   primary store was considered and is not rejected — it is premature. Git
   currently provides review, gates, history, forkability, and a
   self-contained licensable artifact (license-never-assign has legal teeth
   when the licensed thing is a clonable repo) for free. Because consumers
   know only URI + protocol, a future substrate migration is invisible to
   them. Migrate when the write path demands it, not before.

## Operating Constraints

- MUST NOT parse, interpret, or derive meaning from URI internals after
  minting — including oddkit itself, beyond key lookup
- MUST derive kind, authority, and audience from frontmatter only; path
  inference is prohibited
- MUST NOT create static enumerations of repo content in markdown; doctrine
  prose and catalog pointers only
- MUST NOT create a registry, map file, or second machine-readable copy of
  authority bindings; bindings are canon declarations ingested by the build
- MUST NOT delete a grandfathered URI; retirement happens only via
  supersession
- MUST route all cross-authority references through the resolver; hardcoded
  cross-repo paths are cache-lying at the reference layer
- Mint-time validation MUST reject slug collisions within an authority

## Defaults

- When authority is contested, mark the document authority-undecided rather
  than forcing a prefix
- Re-mint a document only when it is already being edited; never open edits
  solely to re-mint
- Treat `audience:` as readership only; governance domain lives in authority
- Within-authority references may use bare slugs (authority implied);
  cross-authority references use the full URI

## Alternatives Considered

- **Prefix = repo (literal 1:1):** rejected — fuses identity to location;
  violates identity-resolved-by-protocol; cannot express undecided.
- **Keep target_repo permanently:** rejected — tautological once files live
  in their target repo; redundant state invites drift.
- **Drop prefixes entirely ("location is the truth"):** rejected — turns
  every cross-repo reference into a hardcoded path; the Feb 2026
  Stale-Cache Incident is the recorded cost of location-as-truth.
- **Standalone registry file:** rejected — a hand-maintained parallel index
  is the exact pattern identity-resolved-by-protocol prohibits; superseded
  by canon-declared bindings + the existing build index.
- **Descriptive slugs as a requirement:** rejected — duplicates the path's
  taxonomy into the key, creating two competing human-readable hierarchies
  for one document; demoted to optional courtesy.
- **SQL/Redis as primary store now:** deferred, not rejected — see Decision
  item 8.
- **Single scheme with authority as first segment (`canon://odd/…`):**
  viable variant; weaker only because `oddkit://` already exists in the
  product surface (17 URIs).

## Retraction Conditions

1. **Shared governance is common.** If many documents genuinely require
   dual authority (the vodka-architecture fork is the live stress case),
   authority-as-column forces false choices and the model fails.
2. **Migration stalls.** If the dual-scheme limbo persists past ~2 epochs,
   the cure is worse than path-shaped URIs were.
3. **Slug collisions are frequent** despite the mint gate, indicating
   flat-per-authority namespaces are too small.
4. **Path semantics prove irreplaceable.** If sustained dependence on
   path_prefix filtering shows the read model's columns (tags, authority,
   kind, tier) cannot express discovery needs that only paths served, the
   demotion of paths is retracted.

## Evidence

- 582 path-shaped klappy:// URIs whose internals mirror folders 1:1 —
  location wearing a scheme.
- canon/apocrypha/ carries four sub-taxonomies of the same material — live
  taxonomy churn identity must survive.
- `audience:` overloaded across 6+ values mixing readership with governance
  domain — the direct cause of the bifurcation classification gap
  (~21 files + 29 judgment calls).
- The OddKit Stale-Cache Incident (February 2026): the recorded cost of
  treating a cached location as current truth.
- The odd/ kind-resolution bug (2026-06-09): catalog with default filters
  returns zero results for odd/decisions/ because kind is path-inferred —
  the recorded cost of path inference.
- README tables double-index titles into BM25, so the duplicate competes
  with the document itself in search — static indexes degrade the real one.
- Prior art: CQRS (command-query responsibility segregation) for the
  architecture; DOI/PURL persistent identifiers for the key discipline.
  This is adoption, not coinage.

## Consequences

- The bifurcation becomes a low-stakes substrate operation: re-shard the
  write path; the read model federates the shards; no reference can break.
- The remaining classification judgment calls become adjudicable: "can ODD
  supersede this claim without oddkit's consent?" replaces "which folder
  feels right?"
- oddkit work items: frontmatter-only kind resolution; mint-time
  slug-collision gate; audit gains supersession chain-depth tracking and an
  index-smell detector (tables of sibling links, outline headings).
- path_prefix filtering is demoted to a transitional convenience of the
  read model; it stops being load-bearing as frontmatter columns take over.
- canon/meta/scope-map.json self-liquidates with target_repo after the move.
