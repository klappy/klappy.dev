---
uri: klappy://canon/constraints/build-provenance-endpoint
title: "Build Provenance Endpoint — Every Deployed Worker Serves a Verifiable Git SHA"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "provenance", "build-stamp", "git-sha", "version-endpoint", "workers", "ci-gate", "deploy-verification", "code-claims-require-code-observation", "ship-safety"]
epoch: E0009
date: 2026-07-16
derives_from: "canon/principles/code-claims-require-code-observation.md, canon/principles/envelope-time-fields.md, canon/constraints/release-validation-gate.md, docs/appendices/convention-requires-an-enforcer.md, canon/values/axioms.md"
complements: "canon/constraints/release-validation-gate.md, canon/constraints/governance-change-discipline.md, canon/constraints/per-environment-worker-projects.md"
governs: "Every deployed Worker in this program that serves an HTTP surface. Binding on every Worker repo's build and deploy pipeline, and on every orchestrator or Managed Agent that ships a Worker. hud is the reference implementation."
status: active
target_repo: "klappy.dev"
---

# Build Provenance Endpoint — Every Deployed Worker Serves a Verifiable Git SHA

> A deployed Worker that cannot name the commit it was built from cannot be held to any claim about what it does. "The parser still hardcodes X," "the fix shipped," "prod matches main" — every one of these is a code-state claim, and per `klappy://canon/principles/code-claims-require-code-observation` a code-state claim requires observation of the code that is actually running. Observation requires an address: the exact git SHA the running bytes were built from. A `/version` endpoint that returns a branch name, a placeholder, or nothing is not provenance — it is the costume of provenance. This constraint makes the stamp mandatory, gives it one shape, and puts an enforcer behind it so a bad stamp cannot reach prod unnoticed.

---

## Summary — What Must Be True Of Every Deployed Worker

Three rules govern build provenance for every Worker in this program. They are non-negotiable and apply regardless of the Worker's size, age, or traffic. They exist because a cross-repo audit (recorded below) found that **zero of five** Worker repos carried a trustworthy deployed git-SHA stamp: endpoints disagreed on shape, one baked a branch name where a SHA belongs, and no CI gate caught any of it.

**First, every deployed Worker serves `/version` returning a fixed JSON shape whose `commit` is a real git SHA.** The response is `{ "commit", "branch", "builtAt", "dirty" }`. `commit` MUST match `^[0-9a-f]{7,40}$` — a 7-to-40-character lowercase hex string. A branch name (`"main"`), a template that was never substituted (`"$COMMIT"`, `"unknown"`, `""`), or a missing field is a **FAILED stamp**, not a soft warning. The endpoint is unauthenticated, cheap, and side-effect-free, so any deploy check and any operator can read it.

**Second, the stamp is produced at build time by a shared stamper, extracted from the reference implementation.** The value of `commit` is bound into the bundle when the bundle is built — from the CI-provided commit SHA, not resolved at runtime and not read from a branch ref. `hud` is the reference: it stamps from `WORKERS_CI_COMMIT_SHA` at build and binds the value into its `version_metadata`. The stamper is extracted from `hud` into one shared module that every Worker imports, so the five repos converge on one implementation instead of five drifting hand-rolls. This is the `convention-requires-an-enforcer` shape applied to build metadata: one stamper, imported, not five conventions re-described.

**Third, a post-deploy CI gate FAILS the pipeline on a missing, malformed, or mismatched stamp.** After each deploy, CI hits the deployed Worker's `/version`, and fails if `commit` is absent, fails the `^[0-9a-f]{7,40}$` regex, or does not equal the commit SHA that CI just deployed. A green deploy with an unverifiable stamp is a red pipeline. The gate is the enforcer; without it, Rules 1 and 2 are conventions, and conventions without enforcers drift — which is exactly how five repos reached zero coverage.

The enforcement is partly mechanical (the gate below) and partly orchestrator-bound (ship nothing whose provenance you have not read). When the mechanical enforcement is absent for a given repo, the orchestrator's obligation to read `/version` by hand before claiming a deploy is heavier, not lighter.

---

## Rule 1 — The `/version` Contract

Every deployed Worker MUST serve `GET /version` returning `application/json` with exactly this shape:

```json
{
  "commit": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
  "branch": "main",
  "builtAt": "2026-07-16T13:20:27Z",
  "dirty": false
}
```

**Field contract:**

- **`commit`** (string, required) — the full or abbreviated git SHA of the source the running bundle was built from. MUST match `^[0-9a-f]{7,40}$`. Anything else is a FAILED stamp. In particular, a branch name (`"main"`, `"prod"`), an unsubstituted placeholder (`"$COMMIT"`, `"__COMMIT__"`), the literal `"unknown"`, or an empty string all FAIL.
- **`branch`** (string, required) — the branch or ref name the build ran against. Informational; NOT a substitute for `commit`. A branch name is allowed here and forbidden in `commit`; that separation is the whole point.
- **`builtAt`** (string, required) — ISO 8601 UTC timestamp of the build. This is build provenance, not request time; it does not change between requests to the same deploy. (See `klappy://canon/principles/envelope-time-fields` for why content-provenance time and request time are distinct truths that must never share a field.)
- **`dirty`** (boolean, required) — `true` if the build ran against a working tree with uncommitted changes. A `dirty: true` prod deploy is a smell the gate surfaces but does not by itself fail; `dirty` on prod SHOULD be treated as a blocker by the deploy pipeline.

**What FAILS the stamp (Rule 1 violations):**

- `commit` absent, null, or empty.
- `commit` failing `^[0-9a-f]{7,40}$` — the `git-repo-auth-mcp` `commit: 'main'` case is the canonical failure: a branch name where a SHA belongs.
- `/version` returning non-JSON, a 404, or an authenticated-only response.
- Fields renamed or omitted. The shape is fixed so one gate and one operator eye can read every Worker without per-repo special-casing.

---

## Rule 2 — The Shared Build-Time Stamper

The value in `commit` MUST be bound into the bundle **at build time**, by a stamper shared across repos.

**Reference implementation — `hud`.** `hud` reads `WORKERS_CI_COMMIT_SHA` (the commit SHA CI is building) at build time and binds it into its `version_metadata`, which the `/version` handler serves verbatim. The SHA is a build input, frozen into the artifact; it is never resolved at runtime and never read from a branch ref such as `HEAD` or `refs/heads/main` (which resolve to whatever the ref points at *now*, not what was built).

**Extraction requirement.** The stamper is extracted from `hud` into a single shared module (build helper or tiny package) that every Worker imports. Five repos import one stamper; they do not each re-describe the convention. This is `convention-requires-an-enforcer` (`klappy://docs/appendices/convention-requires-an-enforcer`) applied to build metadata — a shared module is an enforcer; five prose conventions are not.

**Why build-time, not runtime:**

- A runtime `git rev-parse` requires a `.git` directory the deployed Worker does not have.
- A runtime read of a branch ref returns the branch's *current* tip, which drifts away from the built bytes on the next push — the `commit: 'main'` failure generalized.
- Only a value frozen at build time answers "what commit produced these exact running bytes," which is the only question provenance exists to answer.

---

## Rule 3 — The Post-Deploy Provenance Gate

Every Worker's deploy pipeline MUST run a post-deploy check that FAILS on a bad stamp.

**The gate, after each deploy:**

1. Resolve the commit SHA CI just deployed (`GITHUB_SHA` in GitHub Actions).
2. `GET {worker_url}/version`.
3. FAIL if the response is not JSON, or `/version` is unreachable.
4. FAIL if `commit` is absent or does not match `^[0-9a-f]{7,40}$` (**malformed / FAILED stamp**).
5. FAIL if `commit` does not equal (or, for abbreviated stamps, prefix-match) the deployed SHA (**mismatched stamp** — the deployed bytes are not the bytes CI thinks it shipped).
6. Pass only when the stamp is present, well-formed, and equal to the deployed commit.

A deploy that turns green while `/version` cannot prove its own provenance is a **red pipeline**. The reference workflow is `.github/workflows/provenance-gate.yml`, included with this constraint as the adoptable template every Worker repo copies.

**What the gate does NOT do:** it does not read provenance from canon, does not trust the PR description, and does not accept a same-run assertion that the stamp "should be" correct. It reads the deployed endpoint over the wire. Per `klappy://canon/principles/code-claims-require-code-observation`, only observation of the running artifact grounds a claim about the running artifact.

---

## Migration Order — Fix the Branch-as-SHA First

The audit found five repos at zero coverage. Migration proceeds in a fixed order so the worst failure is closed first and the reference is proven before it is copied:

1. **`git-repo-auth-mcp` first.** It bakes `commit: 'main'` — a branch name passing as a SHA, which is worse than a missing stamp because it *looks* valid and silently fails the `^[0-9a-f]{7,40}$` contract. Fix this one first: adopt the shared stamper, serve the fixed `/version` shape, wire the gate.
2. **Extract the stamper from `hud`** into the shared module as part of, or immediately after, step 1 — so `git-repo-auth-mcp` imports the real shared stamper rather than a second hand-roll.
3. **Roll the remaining Workers** onto the shared stamper and the `/version` shape, adding `provenance-gate.yml` to each pipeline.
4. **Reconcile endpoint shape.** Any Worker currently serving a different `/version` shape migrates to the fixed contract; the gate is what proves the migration landed.

Each step ships under `klappy://canon/constraints/release-validation-gate` and carries the markers `klappy://canon/constraints/governance-change-discipline` requires.

---

## What Counts As A Deployed Worker

**In scope (Rule 1–3 binding):**

- Any Cloudflare Worker in this program that serves an HTTP surface — every MCP server Worker, `hud`, `git-repo-auth-mcp`, and the remaining audited repos.
- Each per-environment Worker project (dev/staging/prod) per `klappy://canon/constraints/per-environment-worker-projects` — each environment's deploy runs the gate against its own URL.

**Out of scope:**

- Local dev servers never deployed.
- Static assets with no Worker runtime and no `/version` surface (though a static build MAY still stamp provenance into a manifest).
- One-shot scripts and Managed-Agent runs that are not long-lived deployed services.

**Ambiguous cases default to in-scope.** If a thing is deployed and answers HTTP, it serves `/version`. The cost is a few lines of build glue; the cost of not knowing what commit is in prod is the entire class of failure this constraint exists to prevent.

---

## How This Constraint Got Written

A cross-repo provenance audit of the program's Worker repos found:

- **0 of 5** repos carried a trustworthy deployed git-SHA stamp.
- `git-repo-auth-mcp` baked `commit: 'main'` — a branch name, not a SHA — which passes a casual glance and fails every real provenance check.
- The repos that did serve a version endpoint disagreed on its shape, so no single check could read all of them.
- No CI gate anywhere caught a bad stamp, so the drift was invisible until the audit looked.
- `hud` was the exception worth copying: a build-time stamper reading `WORKERS_CI_COMMIT_SHA` and binding it into `version_metadata`.

The failure is the same one `klappy://canon/principles/code-claims-require-code-observation` names: claims about running code, propagated without an address for the code that is actually running. Provenance is that address. This constraint makes the address mandatory, fixes its shape, extracts the one good implementation into a shared enforcer, and puts a gate behind it — so "0 of 5" cannot recur silently.

---

## Related Canon

- **[Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation)** — the principle this constraint operationalizes; a code-state claim needs observation of the running code, and provenance is the address that makes observation possible.
- **[Envelope Time Fields](klappy://canon/principles/envelope-time-fields)** — why `builtAt` (content provenance) and request time are distinct truths that must never collapse into one field.
- **[Release Validation Gate](klappy://canon/constraints/release-validation-gate)** — the ship-safety gate this one sits beside; every migration step here ships under it.
- **[Governance Change Discipline](klappy://canon/constraints/governance-change-discipline)** — the markers each migration step must carry.
- **[Per-Environment Worker Projects](klappy://canon/constraints/per-environment-worker-projects)** — why each environment deploys and stamps independently, so the gate runs per-URL.
- **[Convention Requires an Enforcer](klappy://docs/appendices/convention-requires-an-enforcer)** — why the stamper is a shared imported module and the gate is CI, not five prose conventions.
