---
uri: klappy://canon/constraints/sandbox-hygiene-per-flight-scratch
title: "Sandbox Hygiene — Per-Flight Owned Scratch, No Fixed Shared Temp Names"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraints", "sandbox", "hygiene", "temp-files", "scratch", "teardown", "flight", "self-governance"]
epoch: E0010
date: 2026-07-17
derives_from: "canon/values/axioms.md (Axiom 1 — Reality Is Sovereign; Axiom 3 — Integrity Is Non-Negotiable Efficiency), docs/appendices/convention-requires-an-enforcer.md, docs/decisions/D0004-repo-truth-cleanup-mandatory.md"
governs: "Any flight (agent session) that creates temporary or working files, clones repositories, or writes PR bodies in a shared or persistent sandbox"
complements: "canon/constraints/governance-change-discipline.md, canon/constraints/definition-of-done.md, docs/appendices/repo-truth.md"
target_repo: "outcomes-driven-development"
---

# Sandbox Hygiene — Per-Flight Owned Scratch, No Fixed Shared Temp Names

> A flight that writes to a fixed, shared temp path (`/tmp/pr_body.md` and its kin) inherits whatever the last flight left there. This session observed a stale `/tmp/pr_body.md` (6347 bytes, owned by `nobody:nogroup`, dated the prior evening) sitting in the sandbox at boot — the exact residue that produced wrong-content PRs across earlier flights. Shared fixed names are a correctness hazard, not a convenience. Every flight mints its own uniquely-named, self-owned scratch directory, works only inside it, and tears it down on exit.

---

## Summary — Shared Temp State Is Residue, and Residue Lies

Flights run one after another in a sandbox whose `/tmp` is neither per-flight nor reliably wiped between runs. When a flight writes to a fixed path — most damagingly `/tmp/pr_body.md` — three failure modes follow, all observed this session:

1. **Wrong-content PRs.** A prior flight's `pr_body.md` is still present. The next flight's overwrite is blocked (foreign ownership) or silently races, and a PR is opened carrying *another flight's text* before anyone catches it.
2. **Git-lock / write failures.** Clones or writes land in a path a prior flight left root- or `nobody`-owned, and the current flight cannot take the lock.
3. **Root-owned residue** left behind in the sandbox, poisoning the next flight the same way.

This is the sandbox-level expression of the same law that governs the repository: *if the workspace is dirty, conclusions drawn from it are invalid* (`docs/appendices/repo-truth.md`, `D0004`). State residue is indistinguishable from signal. The fix is not "remember to clean up" — humans and agents forget, and a system whose failure analysis reads "the flight forgot to…" has violated the humans-are-variable-inputs constraint. The fix is a mechanical preflight-and-teardown that makes unique, self-owned scratch the path of least resistance.

---

## WHAT — The Rule

- A flight **MUST** perform all temporary and working I/O inside a **uniquely-named, self-owned** scratch directory minted at flight start (e.g. `mktemp -d "${TMPDIR:-/tmp}/flight.XXXXXXXX"`, mode `0700`).
- A flight **MUST NOT** read or write **fixed shared names** for working state — explicitly including `/tmp/pr_body.md`, and any other constant `/tmp/<name>` used for PR bodies, clones, diffs, or scratch.
- PR bodies, repo clones, and generated diffs **MUST** live under the flight's scratch directory, never at a fixed path.
- A flight **MUST NOT** leave artifacts owned by a foreign user (root, `nobody`) behind; it **MUST** tear down its scratch directory on exit (success or failure).
- The launch environment **SHOULD** isolate per-flight scratch (a fresh or namespaced `TMPDIR` per flight) so isolation does not depend solely on flight discipline. *(This layer is a launch-config setting, not a repo change — see Scope.)*

## WHY — The Failure This Closes

Authored from residue observed directly at boot this session: a stale `/tmp/pr_body.md` owned by `nobody:nogroup` from the prior flight, the same class of artifact that caused wrong-content PRs and git-lock failures across multiple flights. The tiny root disk (~9.6 GB, `/tmp` on root) makes leaked clones and bodies a space hazard as well as a correctness one. Cloud runtime hardening (PR #80) addresses the per-run cloud sandbox; this constraint addresses the **local flight sandbox**, whose `/tmp` persists across flights. A convention without an enforcer is a ritual with a deadline (`docs/appendices/convention-requires-an-enforcer.md`); this constraint pairs the rule with a mechanical enforcer so it does not decay to advice.

## ENFORCEMENT — Mechanically, Not by Memory

- **Preflight (before work):** a scratch-setup step that (a) mints the unique owned scratch dir, (b) runs a `df` free-space check and warns/fails below threshold, and (c) scans for and reports stale fixed-name temp files (starting with `/tmp/pr_body.md`) so the residue is *observed*, not silently inherited.
- **Teardown (on exit):** an `EXIT` trap that removes the flight's scratch dir, and only dirs it owns under the tmp root — never a blind `rm -rf` of a shared path.
- **Shared helper:** the preflight + scratch-mint + teardown are provided as a single sourced helper (`agent-role-service/scripts/flight-scratch.sh`) so every flight gets the behavior by sourcing one file, not by re-implementing it. A `flight_prbody` accessor returns a unique path *inside* scratch, structurally preventing the fixed-name write.
- **Practice check:** a lint/test that fails when flight tooling references a fixed `/tmp/pr_body.md` (or equivalent constant working path) instead of the helper.
- **Launch isolation (operator-side):** per-flight `TMPDIR` isolation in the Cowork launch configuration is the belt to this suspenders; named in Scope as out-of-repo.

## SCOPE — Where This Binds

- **Binds:** every flight (agent session) that writes temp/working files, clones repos, or composes PR bodies in the local/shared flight sandbox; and the shared flight tooling that flights source.
- **Repo-enforceable pieces:** the sourced helper, its tests, and the practice/lint check — implemented in `agent-role-service` (the flights' shared tooling home).
- **Out of repo (operator-side):** per-flight scratch *isolation* at launch (a fresh/namespaced `TMPDIR` per flight) is a **Cowork launch-configuration setting**, not a repository change. It cannot be delivered by PR; it is flagged for the operator to apply.
- **Not in scope:** the per-run **cloud** sandbox in `agent-role-service/src/runtime/task.js`, which already provisions a fresh isolated sandbox per run (`/workspace/repo`) and is hardened separately under PR #80.

## VERIFICATION — How We Know It Holds

- **Helper unit test:** proves `mktemp`-minted scratch is unique across two calls, mode `0700`, owned by the current uid; that `flight_prbody` returns a path under scratch (never `/tmp/pr_body.md`); that teardown removes only the owned dir; and that preflight detects a planted stale fixed-name file.
- **Residue check:** post-flight, `ls` of the tmp root shows no scratch dir owned by the flight remaining.
- **Practice/lint check:** a grep-based test fails if flight tooling reintroduces a fixed `/tmp/pr_body.md` working path.
- **Definition of Done:** this constraint's own delivery carries change description, verification performed, observed behavior, and evidence per `canon/constraints/definition-of-done.md`.

---

## Reconciliation with Policy-Precedes-Build

Per the policy-precedes-build ordering (draft the governing constraint before implementing the fix, and cite the constraint from the code), this document is authored and opened as a DRAFT canon PR **before** the mechanical fix, and the `agent-role-service` helper cites this constraint by URI in its header. The build implements what the policy declares; it does not get ahead of it.

> Honesty note (Axiom 1): as of this writing, no committed canon file named `policy-precedes-build` or `enforceable-policy-anatomy` was found via `oddkit_search` or in the `klappy.dev` working tree. This constraint therefore realizes the *named* ordering and the WHAT/WHY/ENFORCEMENT/SCOPE/VERIFICATION anatomy as the operator specified them, and reconciles with the governance that **is** committed (`governance-change-discipline`, `definition-of-done`, `convention-requires-an-enforcer`, `repo-truth`/`D0004`). If a canonical `policy-precedes-build` / `enforceable-policy-anatomy` exists elsewhere, the `derives_from` line should be updated to point at it before merge.
