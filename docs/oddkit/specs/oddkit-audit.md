---
uri: klappy://docs/oddkit/specs/oddkit-audit
title: "oddkit_audit — Action Specification (DRAFT v2.2 — KISS)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["spec", "oddkit", "audit", "dead-references", "ci-gate", "vodka", "kiss"]
epoch: E0008
date: 2026-04-27
derives_from:
  - "canon/methods/reference-integrity-audit.md"
  - "canon/principles/partial-data-with-transparency-and-background-warm.md"
  - "canon/principles/ritual-is-a-smell.md"
  - "docs/oddkit/specs/oddkit-resolve.md"
governs: "Mechanical detection of dead klappy:// references at PR time"
supersedes: "DRAFT v2.1 (2026-04-26, default-scope narrowed); DRAFT v1 (2026-04-26, four-check version)"
---

# oddkit_audit — Action Specification (DRAFT v2.2 — KISS)

> Walk every `klappy://` URI in canon. Call `oddkit_resolve` on each. Report the ones that don't resolve. That's the entire job.

## Conviction Shape

- **High conviction**: dead-reference detection is the load-bearing check; the audit reports, the workflow decides whether to fail; partial-data compliance is mandatory.
- **Working belief**: severity classification (error vs warning); allowlist via line-level directives only; legacy-link-pattern detection bundled in (different rule, same surface).
- **Tunable**: severity defaults; PR comment aggregation; how aggressively to flag `legacy-link-pattern` in unchanged files.

## What This Does

Input: a scope (paths + optional `since_commit`).
Output: structured findings for `klappy://` URIs that don't resolve, plus markdown link patterns we know are bad (`/page/...`, `./relative.md` in writings).

Nothing else. No terminological-drift check. No projection-staleness check. No epoch-gap check. No deprecated-terms registry. No epoch-completeness rules. No `audit_allow:` frontmatter field. Each of those was building for a problem we haven't been asked to solve. They live in the deferred-concerns ledger with explicit revisit conditions.

## Why This Is Enough

The reported pain is broken links. The mechanism that prevents broken links is calling the resolver on every URI before merge. That's one check. Bundling four checks into one action conflated four problems; cutting back to one check makes each future addition a separate decision triggered by its own pain.

When terminological drift, projection staleness, or epoch gaps cause concrete pain, each becomes its own thin action — not bolted into this one.

## The Action

### Input

```json
{
  "action": "audit",
  "input": {
    "scope": {
      "paths": ["writings/", "canon/", "odd/", "docs/"],
      "since_commit": "main~1"
    }
  }
}
```

- `scope.paths` — repo-relative path prefixes. **Default: `["writings/"]`** — the actual link-rot pain surface. Other paths (`canon/`, `odd/`, `docs/`) are explicit opt-in. v2.1 amendment: cold-cache fetching ~560 files exceeded a typical 120s CI curl budget; the smaller default ships in v0.26.0. Reversal is one-line if a real consumer demonstrates wider need.
- `scope.since_commit` — limit findings to files changed since this ref. Default: full audit. PR-mode CI sets this to merge-base.

No `checks` field. There's one check; it always runs. No `severity_floor`. Workflow decides what to fail on.

### Output

```json
{
  "action": "audit",
  "result": {
    "status": "OK" | "FINDINGS",
    "summary": {
      "total_findings": 12,
      "by_severity": { "error": 11, "warning": 1 }
    },
    "findings": [
      {
        "rule_id": "dead-reference",
        "severity": "error",
        "location": { "path": "writings/from-passive-to-proactive.md", "line": 47 },
        "occurrence": "klappy://writings/some-broken-slug",
        "message": "URI does not resolve"
      },
      {
        "rule_id": "legacy-link-pattern",
        "severity": "error",
        "location": { "path": "writings/from-passive-to-proactive.md", "line": 53 },
        "occurrence": "/page/writings/some-slug",
        "message": "Use a klappy:// URI instead of /page/ path"
      }
    ]
  },
  "server_time": "2026-04-27T02:55:26.000Z"
}
```

### Two rule_ids

`dead-reference` (severity: `error`) — a `klappy://` URI that returns `NOT_FOUND` from `oddkit_resolve`.

`legacy-link-pattern` (severity: `error`) — `[label](/page/...)` or `[label](./relative.md)` in `writings/`. These are the patterns that caused the original reader complaints; banning them at the lint level forces use of `klappy://` URIs which the resolver protects.

That's the entire rule set. Other concerns are deferred.

### Algorithm

For every markdown file in scope:

1. Extract every `[label](target)` markdown link.
2. For targets starting with `klappy://`: call `oddkit_resolve`. On `NOT_FOUND` → `dead-reference` finding. On `CIRCULAR_SUPERSESSION` → also `dead-reference` finding (the URI is functionally dead from the consumer's perspective).
3. For targets matching `/page/...` or `./*.md` in `writings/*.md`: emit `legacy-link-pattern` finding.

Other targets (external URLs, anchors, valid relative paths outside writings): ignore. Not this action's job.

### Allowlist

One mechanism, line-level only:

```markdown
<!-- audit-allow: dead-reference reason="placeholder for upcoming article" -->
[some link](klappy://writings/not-yet-published)
```

Scoped to the next markdown link. One rule_id per directive. Suppressed findings appear in the audit envelope under `suppressed_findings` (count only, not in `summary` totals) so reviewers can see what was suppressed and challenge the reason if needed.

No frontmatter `audit_allow:` field. Adding one is bloat for a problem we haven't observed.

## Partial-Data Compliance

Per the partial-data principle:

1. User-blocking path bounded by cache lookups.
2. Background warm via `ctx.waitUntil`.
3. Concrete disclosure via `index_state` — **DEFERRED in v2.2 (see Origin)**.

The `PARTIAL_INDEX` status and the `index_state.warming_count` mechanism are deferred. The shipped v0.26.0 implementation does not emit them: the worker's audit path hits the resolver synchronously per URI and treats unresolvable URIs as `dead-reference` regardless of warm-state. If a real consumer demonstrates the need to distinguish "URI is dead" from "URI couldn't be checked because the index wasn't warm yet," the deferred mechanism graduates from this section back into the Output schema. Until then the Use Only What Hurts principle keeps the envelope minimal.

## Disconfirmers — What Would Falsify This

1. **The resolver has bugs that produce false `NOT_FOUND` responses.** Audit findings would be false positives. Mitigation: release-validation-gate on the resolver catches this before audit ships. The `index_state.warming_count` mitigation referenced in v2.0 is deferred (see Partial-Data Compliance and Origin v2.2 amendment).
2. **Findings volume on first run is so high authors disable the gate.** Mitigation: workflow ships in soft-block mode; one observation cycle to assess before hard-block.
3. **The line-level allowlist proves insufficient (e.g., a template file legitimately has 30 placeholder URIs).** Triggers reconsideration of file-level allowlist (the deferred frontmatter field).

## What This Costs Us If We Don't Ship

The resolver alone fixes the consumer side. Without the audit, authoring discipline is the load-bearing layer for keeping URIs correct — and that's exactly what failed. The principle the resolver embodies stays unenforced at the source.

## Backward Compatibility

Net-new action. No existing callers.

## Migration

1. Land this spec as committed canon.
2. Implement `oddkit_audit` per the algorithm above. Promotion gated on independent Sonnet 4.6 validator pass per E0008.3 / `klappy://canon/constraints/release-validation-gate`. Validator verifies: real `NOT_FOUND` → error finding; real `FOUND` → no finding; legacy pattern in writings → error finding; line-level allowlist suppresses correctly; partial-index emits the right status.
3. Wire into `.github/workflows/canon-quality.yml` (separate artifact). Soft-block this cycle, escalate after observation.

## Open Questions (Tune During Build)

1. PR comment aggregation when findings volume is high. Recommendation: group by file with `<details>` collapse, cap at 50 findings rendered, link to full audit-response.json artifact.
2. Pre-commit hook performance — calling the live worker on every commit is too slow. Recommendation: defer pre-commit to a follow-up; CI-only enforcement is sufficient for v1.
3. Severity for `legacy-link-pattern` in unchanged files. Recommendation: only emit on files modified in the PR; ignore for unchanged files (avoid churning the past).

## See Also

- [oddkit_resolve](klappy://docs/oddkit/specs/oddkit-resolve) — the resolver this audit calls
- [Reference Integrity Audit](klappy://canon/methods/reference-integrity-audit) — the stopgap method this audit retires
- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — why this exists at all (correctness shouldn't depend on remembering)
- [Partial Data With Transparency And Background Warm](klappy://canon/principles/partial-data-with-transparency-and-background-warm) — partial-data compliance
- [Deferred Concerns Ledger](klappy://docs/planning/link-rot-deferred-concerns) — terminological drift, projection staleness, epoch gaps, and other deferred work

## Origin

Drafted on 2026-04-26 alongside `oddkit_resolve` (DRAFT v4). v1 of this spec proposed four checks (dead-reference + terminological-drift + projection-staleness + epoch-gaps) plus a deprecated-terms registry, epoch-completeness rules, and an `audit_allow:` frontmatter field. v2 (this revision) cut to one check and one allowlist mechanism per the operator's Vodka discipline. The other three checks and supporting registries moved to the deferred-concerns ledger with explicit revisit triggers.

**v2.1 amendment (2026-04-26, end of PR-2.3a)**: default scope narrowed from "full repo excluding `docs/archive/`" to `["writings/"]`. Surfaced when the v0.26.0 implementation's CF Preview test 14j (default-scope audit) timed out at 120s — cold-cache fetching ~560 files via the worker's zip-extract path exceeded the curl budget. Real reasons the smaller default is honest: PR-2.2's actual cleanup was writings-only; the April-9 audit classified non-writings broken refs as intentional templates/site-routes/historical-archive (Classes A–E); writings is where authors write `klappy://` URIs as body links most often. Wider scope is one explicit `scope.paths` arg away. If a real consumer demonstrates wider need, the default broadens (or parallelized fetching graduates from the deferred-concerns ledger). Reversal is one-line.

**v2.2 amendment (2026-04-27, post-promote of v0.26.0)**: `index_state` field and `PARTIAL_INDEX` status removed from the documented Output schema. Surfaced when the post-promote validator (klappy/oddkit#146 RV-gate) flagged F-3 (spec mandated `index_state: {warm_count, warming_count}`; shipped omits it) and F-5 (spec listed `PARTIAL_INDEX` in the status enum; shipped omits it). Both were intentional drifts in the v0.26.0 implementation: the worker's audit path is synchronous-per-URI against the resolver and does not currently distinguish warming from terminal states. Rather than carry permanent spec-vs-shipped drift, the spec graduates to v2.2 with both fields marked deferred and the Use Only What Hurts principle invoked. If a real consumer demonstrates need to distinguish "URI is dead" from "URI couldn't be checked because the index wasn't warm yet," the deferred mechanism graduates back into the schema. F-4 (`suppressed_findings` returns full objects vs spec's "count only") was dispositioned by the validator as `no action — additive, not harmful` and remains unchanged in v2.2; if alignment becomes useful, a separate small amendment can land.
