---
uri: klappy://odd/decisions/D0002
title: "URI Prefixes Denote Governance Authority"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: draft
status: proposed
tags: ["odd", "architecture", "identity", "uri", "bifurcation", "persistent-identifier"]
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
governs: "Canon identity minting, URI interpretation, and the post-bifurcation retirement of target_repo"
---

# URI Prefixes Denote Governance Authority

> Identity = authority prefix + opaque slug, minted once, never parsed. The prefix says who may supersede a claim — not where it lives.

## Description

Canon identity adopts the persistent-identifier pattern (DOI/PURL): a URI is an authority prefix plus an opaque slug (e.g. `odd://scope-over-folders`), minted once and never interpreted afterward — not by consumers, not by the validator, not by the resolver beyond key lookup. Three authorities exist: `odd://` (claims governed by the ODD methodology), `oddkit://` (claims governed by the product), `klappy://` (claims governed by Klappy personally). A registry file binds each authority to its current home repo; oddkit resolves identity → location at request time. Repos can move, merge, or mirror by editing the registry — zero references change.

## Status

**Proposed** — challenge battery passed 2026-06-09 (planning mode, no canon tensions, `block_until_addressed: false`, prerequisites answered). Awaiting maintainer ratification. Encoded via oddkit (Decision artifact, quality 5/5 strong).

## Decision

1. **Prefix = governance authority.** The scheme declares who may supersede the claim. It is an epistemic fact like scope — not a storage fact.
2. **Slug = frozen opaque name.** No path semantics inside the URI. Taxonomy lives in metadata and the catalog; it may churn freely without touching identity.
3. **Registry = the single mutable binding.** One file maps authority → home repo + resolver endpoint. `anti-cache-lying` is satisfied because the location binding exists in exactly one place instead of being baked into every name.
4. **`target_repo` retires after the physical bifurcation.** Pre-move, the Pass 1 tags (PR #227) are the sort key. Post-move, the prefix carries authority and physical location carries membership; a per-file repo tag inside its own repo is tautological. `undecided` files are authority-undecided — the honest name for the forks.
5. **Grandfathering.** All 582 existing path-shaped `klappy://` URIs are frozen opaque strings effective immediately. Their path resemblance is historical accident; nothing may parse their internals. They resolve forever.
6. **Lazy migration.** New docs mint authority+slug. Old docs re-mint via the existing supersession machinery only when touched. No big-bang rename, ever.
7. **Reference discipline.** Within-authority references may use bare slugs (authority implied, like relative imports). Cross-authority references require the full URI and resolve through the protocol.

## Operating Constraints

- MUST NOT parse, interpret, or derive meaning from URI internals after minting — including by oddkit itself beyond key lookup
- MUST mint new identities as authority + slug; the mint-time validator gate rejects slug collisions within an authority
- MUST NOT delete a grandfathered URI; retirement happens only via supersession
- MUST route all cross-authority references through the resolver; hardcoded cross-repo paths are cache-lying at the reference layer
- MUST keep the authority → repo binding in the registry only; no second copy anywhere

## Defaults

- When authority is contested, mark the doc authority-undecided rather than forcing a prefix
- Prefer re-minting a doc when it is already being edited; never open edits solely to re-mint
- Treat `audience:` as readership only going forward; governance domain lives in the prefix

## Alternatives Considered

- **Prefix = repo (literal 1:1):** rejected — violates `identity-resolved-by-protocol`; fuses identity to location; cannot express `undecided`.
- **Keep `target_repo` permanently:** rejected — tautological once files physically live in their target repo; redundant state invites drift.
- **Drop prefixes entirely ("location is the truth"):** rejected — converts every cross-repo reference into a hardcoded path; the Feb 2026 Stale-Cache Incident is the recorded cost of location-as-truth.
- **Projection model (prefix projected from `target_repo`):** adopted as the transitional state, not rejected — it is the bridge to this end-state.
- **Single scheme with authority as first segment (`canon://odd/...`):** viable variant; weaker only because `oddkit://` already exists in the product surface (17 URIs).

## Retraction Conditions

This decision is retracted if any of the following is observed:

1. **Shared governance is common.** If many docs genuinely require dual authority (the vodka-architecture fork is the live stress case), authority-as-prefix forces false choices and the model fails.
2. **Migration stalls.** If the dual-scheme limbo persists past ~2 epochs, the cure is worse than path-shaped URIs were.
3. **Slug collisions are frequent** despite the mint-time gate, indicating flat-per-authority namespaces are too small.

## Evidence

- 582 path-shaped `klappy://` URIs whose internals mirror folders 1:1 — location wearing a scheme.
- `canon/apocrypha/` carries four sub-taxonomies of the same material (fragments, predocumentaries, reconstructions, artifacts) — live taxonomy churn that identity must survive.
- `audience:` is overloaded across 6+ values mixing readership with governance domain — the direct cause of the bifurcation classification gap (~21 files + 29 judgment calls).
- The OddKit Stale-Cache Incident (February 2026): the recorded cost of treating a cached location as current truth.
- Prior art: DOI (registrant-authority prefix + opaque suffix, protocol-resolved) has survived every publisher reorganization since 2000; DNS delegation and module registries share the shape. This is adoption, not coinage.

## Consequences

- Pass 1 (PR #227) is unaffected and remains necessary: its tags are the sort key for the physical move, then retire.
- The bifurcation's remaining judgment calls become adjudicable: "can ODD supersede this claim without oddkit's consent?" replaces "which folder feels right?"
- oddkit gains a registry read and a mint-time slug-collision gate; `audit` should additionally track supersession chain depth during lazy migration.
- A loud grandfathering constraint doc + validator check is required, or path-shaped minting continues by habit (hard gate unconditional, soft signal loud — per the PR #225 pattern).
