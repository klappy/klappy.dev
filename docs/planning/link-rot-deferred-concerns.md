---
uri: klappy://docs/planning/link-rot-deferred-concerns
title: "Deferred Concerns — Link-Rot Campaign Cuts and Revisit Conditions"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["planning", "link-rot", "deferred", "use-only-what-hurts", "vodka", "epoch-8"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "docs/oddkit/specs/oddkit-resolve.md"
  - "docs/oddkit/specs/oddkit-audit.md"
  - "canon/principles/identity-resolved-by-protocol.md"
governs: "What was cut from the link-rot campaign and when each cut item should graduate back to active work"
---

# Deferred Concerns — Link-Rot Campaign Cuts and Revisit Conditions

> The link-rot campaign was redrafted to a Vodka-disciplined four-artifact shape. This doc captures what was cut, why each was real, and the explicit pain trigger that would justify graduating it back into active work. Per Use Only What Hurts: don't build infrastructure ahead of the pain that justifies it. Per memory-against-amnesia: don't lose the thinking either.

## Why This Ledger Exists

When campaign scope is cut, two failure modes are equally bad:

1. **Forgetting the cut work was ever considered.** Future incidents re-discover the same problems and re-design solutions from scratch.
2. **Treating cut items as latent work that distorts roadmap planning.** Items linger in queues, accrete priority, and pull attention away from observed pain.

This ledger threads the needle — every cut item has an explicit revisit condition. If the condition triggers, the item graduates. If the condition doesn't trigger for a year, the item probably wasn't real pain after all and can be archived.

## Cut Items

Each item below was drafted (or partly drafted) during the v1–v3 spec iterations. v4 cut them. They live here.

---

### 1. `oddkit_resolve_batch` action

**What it was**: a build-time companion action taking an array of URIs and returning resolved results in input order. Purpose: serve static-build consumers (Lovable today) that can't make request-time MCP calls.

**Why it was real**: Lovable is a real consumer that ships a static build. Without batch resolution, either (a) Lovable can't use the resolver at all, or (b) Lovable's build pipeline makes N independent MCP calls, which is slow and rate-limit-fragile.

**Why it got cut**: no consumer has demonstrated the pain yet. Lovable currently has zero `klappy://` URIs to resolve. Building a batch action before any consumer needs it is infrastructure-ahead-of-pain.

**Revisit condition**: a real consumer — Lovable, or another static-build renderer — has at least 20 `klappy://` URIs in its build artifacts AND demonstrates measurable pain (build slowness, rate-limit hits, or operator frustration with N round-trips).

**When triggered, the work**: re-draft `oddkit_resolve_batch` per the v3 spec section. The design is preserved in this ledger; implementation is the only fresh work.

---

### 2. `resolve_links` flag on `oddkit_get` and `oddkit_search`

**What it was**: an optional flag that returns resolved-link metadata alongside content for every `klappy://` URI in the document. Purpose: save consumers from making N follow-up `oddkit_resolve` calls per fetched document.

**Why it was real**: a renderer fetching a writings doc with 12 internal references has to make 12 resolver calls to render the page. That's 13 round-trips when 1 could suffice.

**Why it got cut**: same pattern as the batch action — building convenience before observed pain. Current consumers don't render writings via the MCP; they render via static build. The `resolve_links` flag's beneficiary doesn't exist yet.

**Revisit condition**: a request-time renderer (a future consumer, not Lovable today) is in production and its render latency is measurably impacted by per-URI resolver round-trips.

**When triggered, the work**: add the flag to `oddkit_get` and `oddkit_search` envelopes per v3 spec section. Backward-compatible (omitted flag returns unchanged response).

---

### 3. `aliases` frontmatter field

**What it was**: an optional array on a canon doc declaring alternate URIs that resolve to it. Purpose: support migrations where a URI changes meaningfully without breaking existing references.

**Why it was real**: when an article's slug is renamed, all existing references to the old slug break. Aliases let the rename happen without breaking the world.

**Why it got cut**: supersession already covers this case. When you rename `klappy://writings/old-slug` to `klappy://writings/new-slug`, you mark the old as `superseded_by: klappy://writings/new-slug`. The resolver walks the chain transparently. `aliases` is a convenience for a different mental model (one current name, many historical names) but doesn't solve a problem supersession doesn't already solve.

**Revisit condition**: a real case emerges where supersession-as-rename feels semantically wrong (e.g., a single article should be findable under multiple equally-current names without one being "the" canonical). Until then, the supersession path is sufficient.

**When triggered, the work**: add `aliases:` to frontmatter schema and handle in resolver lookup. v3 spec section preserves the design.

---

### 4. `supersession_response` frontmatter field

**What it was**: explicit declaration of which of the five supersession responses (`tolerate` / `observe` / `graduate` / `replace` / `regenerate`) applies to a particular `superseded_by` link. Purpose: let the resolver return the right answer for non-`replace` cases.

**Why it was real**: per `klappy://canon/methods/supersession`, drift has five valid responses, not just "the new one replaces the old." `graduate` (original retained as canonical for its scope) and `tolerate` / `observe` (both apply) are real cases where transparent redirect is wrong.

**Why it got cut**: every existing `superseded_by` in canon today is implicitly `replace`. There's no real case in the index where transparent redirect produces wrong consumer behavior. The field would ship as "always set to `replace` because that's the only case anyone uses." Bloat.

**Revisit condition**: a real article wants to declare `superseded_by` with non-replace semantics AND a consumer's behavior under transparent redirect is observably wrong.

**When triggered, the work**: add the field; update resolver to consult it. v3 spec section preserves the design (per-response rendering table, default to `replace`).

---

### 5. Identity-by-meaning queries (`klappy://meaning/<slug>` URIs and structured `meaning:` input)

**What it was**: the resolver accepts a structured query expressing intent (title hint, topic, tags, audience filter) instead of a URI. Returns the best-matching canonical article. Purpose: handle author URI typos, supersession-blind references, and "I want to point at the article about X without knowing its current URI."

**Why it was real**: the operator explicitly named this as the ideal primitive ("identity by meaning not URI is ideal as it handles supersession naturally"). The mental model — "I'm pointing at the idea, not the location of the idea" — is genuinely cleaner than URI-based references.

**Why it got cut**: no consumer needs it for v1. Authors writing `klappy://writings/<slug>` have a stable convention that already works as long as they don't typo. Meaning queries solve a problem (typo tolerance, automatic supersession traversal even without `superseded_by` set) that doesn't exist in observed practice yet.

**Revisit condition**: the dead-reference audit shows a sustained pattern of typo-rate that URI-only resolution can't handle gracefully — i.e., authors are writing wrong URIs frequently enough that meaning fallback would prevent meaningful churn. Or: a consumer use case emerges where the author legitimately doesn't know the URI and wants to point at "the article about cognitive saturation."

**When triggered, the work**: add meaning resolution to the resolver per v3 spec section. The principle (identity-by-meaning is ideal) is already canonized in `klappy://canon/principles/identity-resolved-by-protocol`; the implementation is the fresh work.

---

### 6. `oddkit_audit` terminological-drift check

**What it was**: detect deprecated vocabulary (e.g., "Lane Self-Containment", "OLDC+H") in non-archival content. Read against a `canon/terminology.md` registry of deprecated terms with replacements.

**Why it was real**: terminology drifts as canon evolves. The projection inventory (March 21, 2026) explicitly cited `canon/constraints/README.md`'s outline still saying "Lane Self-Containment" weeks after the rename. Human readers and agents both encounter stale terms and lose ground-truth confidence.

**Why it got cut**: solves a different problem from link rot. The reported pain was broken links, not stale vocabulary. Bundling them into one audit conflated concerns. Terminological drift deserves its own thin solution when its pain is acute.

**Revisit condition**: a deprecated-term incident causes confusion or lost time. Or: the terminology registry would have ≥10 entries (signal that drift volume is real). Or: an author or agent surfaces frustration about stale vocabulary.

**When triggered, the work**: thin separate action `oddkit_terminology_audit` (NOT bundled into `oddkit_audit`) with the registry pattern from v1 of the audit spec. Its own CI check, its own severity defaults.

---

### 7. `oddkit_audit` projection-staleness check

**What it was**: detect committed projection files that differ from regenerated form. Read against `klappy://docs/audits/projection-inventory-2026-03-21` to know which files are projections.

**Why it was real**: per anti-cache-lying, committed projections are cached lies. The projection inventory enumerates ~15 pure projections + 12 hybrids that are actively rotting. Multiple agents and humans have hit stale README index tables.

**Why it got cut**: requires regeneration tooling that doesn't exist for most projections. Without regenerators, the check could only flag presence (per inventory) — limited value. Real fix is generating projections JIT, not detecting their staleness in source. The bigger architectural answer (eliminate committed projections entirely) is its own campaign.

**Revisit condition**: regeneration tooling exists for at least one projection file (e.g., a script that builds `writings/README.md` from frontmatter). Or: a projection-staleness incident causes meaningful pain (agent navigation breaks, reader follows a stale index, audit comes back ugly).

**When triggered, the work**: separate thin action `oddkit_projection_audit` that consumes the inventory, calls per-projection regenerators, and diffs. Or — preferable per anti-cache-lying — eliminate the projections entirely and serve them JIT. The latter is its own campaign, not a thin action.

---

### 8. `oddkit_audit` epoch-gap check

**What it was**: detect missing OLDC+H / DOLCHE+O artifacts within an epoch's expected ledger. Read against an epoch-completeness rules document.

**Why it was real**: the epistemic ledger pattern expects certain artifact types per epoch. An epoch with handoffs but zero decisions, or a handoff referencing a constraint that doesn't exist, indicates documentation gaps.

**Why it got cut**: zero observed instances of epoch-gap pain in current operation. Inventing rules ("an epoch SHOULD have at least one decision") and then enforcing them is ritual-as-compensating-control before any ritual has been needed.

**Revisit condition**: an epoch transition reveals a real documentation gap that costs time or trust. Or: a session ends with a handoff that points at non-existent canon and the gap goes undetected for ≥1 day.

**When triggered, the work**: separate thin action `oddkit_epoch_audit` with completeness rules tuned to the actual gap that triggered the work. Don't pre-design the rule set; let real incidents inform it.

---

### 9. `audit_allow:` frontmatter field

**What it was**: file-level audit suppression (vs the line-level `<!-- audit-allow -->` directive that ships in v1).

**Why it was real**: a template file with 30 placeholder URIs would need 30 line-level directives. File-level suppression handles that case in one declaration.

**Why it got cut**: no template file with 30 placeholder URIs exists yet. Line-level directives handle every observed case.

**Revisit condition**: a real file emerges where line-level directives produce >10 entries AND the suppression is legitimate. Examples: a curated examples doc, an intentionally-incomplete planning doc.

**When triggered, the work**: add `audit_allow:` to frontmatter schema; update audit to honor it. Small, additive.

---

### 10. CI pre-commit hook

**What it was**: local pre-commit hook calling a fast subset of audit checks against staged `.md` files for sub-second author feedback.

**Why it was real**: CI round-trip latency is real. Authors who get feedback in seconds adjust faster than authors who get feedback after pushing.

**Why it got cut**: complicates the pattern. Calling the live worker on every commit is too slow; building a static local subset duplicates audit logic; mismatches between local and CI become a class of confusion. CI alone is sufficient as v1 enforcement.

**Revisit condition**: PR cycle time is measurably hurting author velocity AND audit findings are frequent enough that pushing-then-fixing is producing churn.

**When triggered, the work**: design a thin local check (probably static, no live worker call) that runs the dead-reference and legacy-link-pattern rules against staged files only. Accept that local-vs-CI mismatches will exist and document the precedence.

---

## What's NOT Deferred

For clarity — these were NOT cut and are still in the active campaign:

- `oddkit_resolve` action (v4 KISS shape)
- `oddkit_audit` action with single dead-reference check (v2 KISS shape)
- `canon-quality.yml` workflow with soft-block then hard-block escalation
- `klappy://canon/principles/identity-resolved-by-protocol` tier-1 doc
- Writings cleanup (convert legacy patterns to `klappy://` URIs)
- Re-audit the 49 from the April 9 audit using the new resolver

Six items in the active campaign. Ten items deferred. The cut roughly doubled the deferred-to-active ratio in the campaign's favor, which matches the Vodka discipline of "remove until it would break."

## Graduation Process

When a deferred item's revisit condition triggers:

1. Confirm the trigger is real (not a one-off; not premature). Use Only What Hurts means *acute* pain, not *theoretical* pain.
2. Open a single-item campaign for the deferred work. Don't bundle multiple deferred items together unless they share a real dependency.
3. Apply the same Vodka discipline. Just because we wrote a v3 design for it doesn't mean v3 is the right shape when it ships.
4. Update this ledger: mark the item as graduated, note the trigger, link to the campaign or PR.

## Archive Process

If a deferred item's revisit condition hasn't triggered after one calendar year, the item probably wasn't real pain. Archive it from this ledger to a lower-priority lookup; remove from active mental load. Future incidents can resurface the design from history if needed.

## Origin

Drafted on 2026-04-26 alongside the v4 KISS revision of the link-rot campaign. The operator surfaced that the v3 campaign violated Vodka principles by building infrastructure ahead of observed pain. Cutting to four artifacts left ten real concerns behind; this ledger captures them so they're not lost. The ledger itself is not load-bearing — it's a memory aid. The active artifacts (resolver, audit, workflow, principle) carry the load.
