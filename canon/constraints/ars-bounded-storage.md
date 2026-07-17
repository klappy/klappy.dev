---
uri: klappy://canon/constraints/ars-bounded-storage
title: "ARS Bounded Storage — Per-Entity Rows, Always-R2 Offload, Rotation, and a Durable Mirror"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: draft
tags: ["canon", "constraint", "ars", "storage", "durable-object", "sqlite", "r2", "bounded-row", "retention", "mirror", "write-freeze", "policy-first", "prompt-over-code"]
epoch: E0010
date: 2026-07-17
derives_from: "agent-role-service/docs/adr/ADR-0001-ars-per-entity-do-sqlite.md, agent-role-service/docs/policy/ars-data-model-philosophy.md, agent-role-service/docs/policy/ars-nouns-and-verbs.md, agent-role-service/docs/policy/ars-v1-operating-policy.md, canon/constraints/ratified-model-requires-reconciliation-and-enforcer.md, canon/principles/policy-first-self-building-self-documenting.md, canon/meta/enforceable-policy-anatomy.md, outputs/debrief-ars-monolith-2026-07-16.md"
complements: "canon/constraints/release-validation-gate.md, canon/meta/constraint-driven-audits.md, canon/principles/vodka-architecture.md"
governs: "Every storage read/write path in klappy/agent-role-service — AccountDO (src/do.js) and the core modules (src/core/{registry,leases,board,runs,seed,members,driver}.js), the alarm handler, and the protocol/tool handlers. Binding on every seat that ships ARS storage code and on the CI + runtime enforcers named per policy."
status: draft
target_repo: "agent-role-service"
---

# ARS Bounded Storage — Per-Entity Rows, Always-R2 Offload, Rotation, and a Durable Mirror

> **Posture:** DRAFT — authored for ratification. Filed 2026-07-17 as the enforceable canon for the ARS
> storage redesign the operator approved in `agent-role-service/docs/adr/ADR-0001-ars-per-entity-do-sqlite.md`
> (all seven design questions RULED, 2026-07-16). Authored for ratification.
> **DO NOT MERGE until reviewed and ratified.** Nothing here is built, deployed, or
> migrated by this document; it is the buildable spec the build flight implements and cites.

> The ARS store keeps one row per record, offloads what is huge, rotates what is old, and mirrors
> everything to R2 off the request path — so that the write-freeze *class* is removed at the
> storage layer: no bounded, per-row write can reproduce the whole-object failure that froze the
> service on 2026-07-16 (the claim's scope and limits are stated below, not assumed). Six policies
> bind the storage layer: **bounded rows** (no monolithic blob), **always-R2
> offload** for known-huge fields, **shared retention and rotation** for the log and finished
> runs, **the mirror off the critical path**, **R2 as the durable source from which the whole
> store restores**, and **the deprecation of the board.md dual-run**. Each is precise enough to
> build from, and each names the enforcer that makes it binding. This is the concrete discharge,
> for ARS storage, of the reconciliation-and-enforcer obligation that
> `ratified-model-requires-reconciliation-and-enforcer` makes general.

---

## Summary — Policy-First, Because the Last Store Was Neither Built From Nor Cited to Its Policy

On 2026-07-16 the ARS write path froze. The `AccountDO` had stored its entire dataset —
sessions, leases, board, runs, seeds, members, driver, and a 2000-row log — as one plain-JSON
value under a single storage key, rewritten on every mutation. When the serialized blob crossed
the Durable Object's 2 MB row cap, every `storage.put` failed with `SQLITE_TOOBIG`, and since
every mutation funnels through that one write, every write froze.

The store had been ruled otherwise. `ars-data-model-philosophy` (Operator-RULED 2026-07-10)
required *flat records + provenance, the board a projection of a flat store*. The code was the
opposite shape, nothing reconciled it, and no enforcer flagged the drift. That is exactly the
failure `ratified-model-requires-reconciliation-and-enforcer` names in the general — this
constraint is its specific, enforceable answer for storage.

Per `policy-first-self-building-self-documenting`, these six policies are written first and
written to build from: the schema, thresholds, write paths, and invariants are readable out of
the text, and the build flight is briefed to **implement the policies and cite them in code** —
every gate, assertion, and invariant references its governing policy URI (`klappy://canon/constraints/ars-bounded-storage#PN`),
so the code documents itself and the drift becomes impossible to ship silently.

Each policy below follows the `enforceable-policy-anatomy` template: **WHAT · WHY · ENFORCEMENT ·
SCOPE · VERIFICATION.** The seven operator rulings (ADR §5, Q1–Q7) are the authority behind them.

---

## P1 — Bounded Rows; No Monolithic Blob

**WHAT.** All ARS entity state persists as **one row per record** in per-entity SQLite tables via
`ctx.storage.sql`, one table per noun (sessions, leases, board_items, workstreams, log_entries,
runs, seeds, members, driver_flights, driver_kv, plus the R2 index/pointer tables). No aggregate,
multi-entity value may be written under a single storage key: **the monolithic `ars_state_v1`
whole-object `put` is prohibited and deleted.** Every write touches only the rows it changes
(O(rows changed), never O(dataset)). No single row may approach the 2 MB DO row cap — enforced
structurally by P2.

**WHY.** The 2026-07-16 `SQLITE_TOOBIG` freeze was produced by exactly one thing: the whole
dataset in one value, rewritten every write. Once the blob crossed 2 MB every `storage.put`
failed. Beyond the freeze, whole-object rewrite is O(dataset) write amplification and serializes
throughput behind full-object (de)serialization. The ratified flat-records model
(`ars-data-model-philosophy` §3; `ars-nouns-and-verbs`: each noun first-class) demanded a
per-record store; the code drifted to a monolith. This policy restores the ruled model at the
storage layer.

**ENFORCEMENT.**
- *CI gate — `ci/no-monolith-store`:* fails the `agent-role-service` build if `src/` contains a
  whole-state `storage.put(STATE_KEY, …)` pattern, any `STATE_KEY` constant, or a `storage.put`
  whose value is an aggregate state object rather than a bounded per-row payload.
- *Runtime invariant — `assertBoundedRow`:* the DO write layer rejects any row whose serialized
  size exceeds the P2 backstop before it reaches SQLite (shared enforcer with P2).
- *Review gate — noun-conformance (`ars-nouns-and-verbs` §5):* a new entity in DO state without a
  §1 noun, or a tool with no mapped verb, fails review — the same failure as an unmapped tool.

**SCOPE.** `klappy/agent-role-service`: `src/do.js` and `src/core/*` write paths; the DDL in
ADR §2.1. Negative scope: the static policy-corpus tools (`ars_policy_*`) read a bundled markdown
corpus, not DO state, and are out of scope.

**VERIFICATION.**
- *Positive proof:* the ADR §4 Phase-5 no-op write proof — an idempotent heartbeat or benign
  `board_upsert` **succeeds** where the identical operation fails today; grep finds zero
  `storage.put(STATE_KEY, …)` and zero aggregate-object writes in `src/`.
- *Code cites policy:* `assertBoundedRow` and `ci/no-monolith-store` reference
  `klappy://canon/constraints/ars-bounded-storage#P1` in comment/check-name.
- *Buildable:* the per-entity schema in code matches ADR §2.1 DDL with no design gap the code
  filled on its own authority.

---

## P2 — Always-R2 for Known-Huge Fields; a Backstop Row Cap for Everything Else

**WHAT.** Fields **known huge by type** are stored in R2 **unconditionally, never inline,
regardless of measured size** — the SQLite row holds only a pointer (R2 key) + `bytes` + `sha256`
+ a small human-readable digest:
- `runs.result` — the full task-run result body (`report.result`, `diff`, CLI `logs`). Row keeps
  `result_summary` (draft summary + `usage` + `exitCode`) + `result_ref` + `result_bytes` +
  `result_sha256`.
- `seeds.prompt` — the flight's seed/first prompt. Row keeps `prompt_preview` (≤200 chars) +
  `prompt_ref` + metadata.
- `log_entries.data` for known-large-by-type events (e.g. `flight-seeded`) — the row references
  the shared R2 body via `data_ref` rather than re-inlining it.

Any value **not** on the always-R2 list that would exceed a conservative **64 KB backstop cap**
(~1/32 of the 2 MB limit) is transparently offloaded by the same `{*_ref, *_bytes, *_sha256}`
mechanism. Because the known-huge fields are *always* pointers and the backstop catches
everything else, **no row can approach 2 MB by construction.**

**WHY.** Oversize `task_result` rows were the secondary freeze contributor. The current
`trimForStorage` caps only `logs` (8 KB) and `diff` (80 KB) and **never caps `report.result`** —
the model's full answer was inlined unbounded inside the 2 MB-limited value. Type-aware always-R2
closes that gap at the root (ADR Q1 ruling): the body is not trimmed, it is simply never inline.

**ENFORCEMENT.**
- *Runtime invariant — `offloadOrReject`:* the storage write layer **refuses to inline** any
  always-R2 field (assigning `runs.result` / `seeds.prompt` to an inline column is a typed error),
  and auto-offloads any payload > 64 KB before insert. This is the same `assertBoundedRow` guard
  that backs P1.
- *CI gate — `ci/always-r2-fields`:* fails the build if any code path assigns a run result body or
  seed prompt to an inline column, or if the `runs`/`seeds` write paths do not call the R2-offload
  helper.
- *Review gate — `blob_refs` completeness:* every offload must record a `blob_refs` row (GC + audit
  index); a review checks that offload sites write the index row.

**SCOPE.** `runs`, `seeds`, and `log_entries` write paths; the shared offload helper; the
`ARS_BLOBS` R2 binding.

**VERIFICATION.**
- *Positive proof:* a unit test inserts a run with a large `report.result` and asserts the row holds
  only the pointer while the body lives in R2, sha verified on read; a synthetic >64 KB non-listed
  field offloads; grep confirms no inline assignment of result/prompt bodies.
- *Code cites policy:* `offloadOrReject` and `ci/always-r2-fields` cite
  `klappy://canon/constraints/ars-bounded-storage#P2`.
- *Buildable:* the offload rule in code matches ADR §2.1 (always-R2 list + 64 KB backstop) exactly.

---

## P3 — Shared Retention and Rotation, With Transparent Paging

**WHAT.** `log_entries` and finished-run metadata rows rotate out of the DO to R2 under **one
coherent triple bound — whichever hits first: oldest resident row > 30 days, OR table > 50 MB, OR
> 100,000 rows.** Rotation writes an R2 JSONL segment (`log/{account}/segments/{from}-{to}.jsonl`),
records `archived_log_segments` + `blob_refs`, then `DELETE`s the rotated rows — **nothing is
silently dropped.** `ars_log_read` and `ars_task_result` page the SQLite→R2 boundary
**transparently**: a `seq` cursor (or a rotated run) older than the resident window resolves the
R2 segment/snapshot, the caller sees one continuous log with the same cursor semantics and no
"cold" flag, and integrity is checked against the stored sha. **Always resident, never evicted:**
open sessions, active leases, running runs, and the live board. The arbitrary `RUNS_CAP = 32`
count cap and the silent `LOG_CAP = 2000` splice are **dropped.**

**WHY.** The log was the dominant freeze contributor (~1,868 rows ≈ 1 MB), and its overflow was
**silently dropped** — the code comment claimed "git carries the durable record" but ARS never
wrote the trimmed rows anywhere, and modules re-stamped facts defensively because the log entry
might already be gone. Finished runs accumulated by an arbitrary count, not by bytes. One
retention policy across log + finished runs (ADR Q2 + Q7) bounds the DO footprint to a fixed
window regardless of lifetime and makes the overflow durable instead of lost.

**ENFORCEMENT.**
- *Runtime invariant — alarm-enforced triple bound (`enforceRetentionBound`):* the DO alarm
  applies the triple bound each pass; after an alarm pass the log and runs tables are asserted to
  be within the resident window. Rotation is mechanical, not best-effort.
- *CI gate — `ci/no-silent-drop`:* fails the build if `LOG_CAP` silent-splice or `RUNS_CAP = 32`
  remain, or if any code path deletes/evicts rows without a preceding R2 segment write +
  `archived_log_segments` pointer.
- *Review gate — resident-set justification:* any new always-resident table must be justified
  against the "always resident" list in review.

**SCOPE.** `log_entries` and `runs` retention; the DO `alarm()` path; `ars_log_read`,
`ars_task_result`.

**VERIFICATION.**
- *Positive proof:* a test seeds rows past each bound (>30 d, >50 MB, >100 K) and asserts rotation
  to R2 with matching `archived_log_segments`/`blob_refs`, that a transparent read across the
  boundary returns the rotated rows with matching sha, and that `rotated_count == archived_count`
  (no silent drop).
- *Code cites policy:* `enforceRetentionBound` and `ci/no-silent-drop` cite
  `klappy://canon/constraints/ars-bounded-storage#P3`.
- *Buildable:* thresholds in code equal ADR §2.3 (30 d / 50 MB / 100 K) exactly.

---

## P4 — The Mirror Runs Off the Critical Path; Zero Added Response Latency

**WHAT.** The continuous R2 mirror runs **only on the DO alarm — never on the request/tool path**
— and adds **zero latency to any user operation.** It advances a **durable mirror watermark**
(last-mirrored `seq`/`updated_at`, persisted in `schema_meta` in-transaction) and, each alarm
pass, streams everything changed since the watermark to R2 (append new log rows to the current
segment; write changed entity rows into the newest incremental snapshot), then advances the
watermark. Large payload bodies are already R2 pointers (P2), so the tail-follower references them
rather than re-copying. **No mirror or R2 write ever sits on a request/tool handler.**

**WHY.** Durability must not tax responsiveness. If the mirror rode the request path, every user
operation would wait on R2 — a new latency and a new failure mode on the hot path. The operator
ruled a continuous, alarm-driven tail-follower off the request path (Q6): backups become
automatic, off-path, and continuous — never a manual flight and never a tax on the caller.

**ENFORCEMENT.**
- *Runtime invariant — alarm-only mirror boundary (`assertMirrorOffPath`):* the mirror client is
  reachable only from the alarm handler; an attempt to perform a mirror/`ARS_BLOBS` mirror-write
  inside a request/tool handler throws.
- *CI gate — `ci/mirror-alarm-only`:* a static check that mirror-write call sites appear only in
  the alarm module, never in `src/protocol/*` tool/request handlers.
- *Review gate — request-path latency budget:* a smoke assertion that tool p50/p99 latency is
  unchanged with the mirror active vs inactive; any new R2 write declares `path=alarm`.

**SCOPE.** The DO `alarm()` handler and mirror module (positive); all `src/protocol/*` tool/request
handlers (negative — mirror writes forbidden here).

**VERIFICATION.**
- *Positive proof:* a request-path latency benchmark with the mirror on vs off shows no added
  latency on the request path; grep confirms mirror writes only in the alarm module; the watermark
  advances monotonically and is persisted in the same transaction as the change it covers.
- *Code cites policy:* `assertMirrorOffPath` and `ci/mirror-alarm-only` cite
  `klappy://canon/constraints/ars-bounded-storage#P4`.
- *Buildable:* the watermark mechanism in code matches ADR §2.4 (schema_meta watermark, alarm tail
  pass).

---

## P5 — R2 Is the Durable Source; Full DR Restore From R2 Alone, Daily Reconcile

**WHAT.** **R2 is the source of durability** — a full disaster-recovery restore of the entire ARS
store is possible **from R2 alone.** Once daily, the mirror runs a **full reconcile**: a complete
point-in-time snapshot — one JSONL per table + `manifest.json` (schema version, `seq_high`,
per-table counts + shas, kind) — indexed in `mirror_snapshots` (kind=`full`), with incremental
tail between snapshots. Restore = load the latest `manifest.json`, load each table's JSONL, then
replay `log/segments/*` and incrementals with `seq > seq_high`. Because the mirror holds
everything durably, **eviction from SQLite (P3) is safe and reversible** — a cache-management
decision, not a data-loss risk. Run-result and seed bodies restore lazily from their R2 keys.

**WHY.** The vodka "kill the DO and nothing is lost" test must hold **at the storage layer**, not
merely via git. Backups, log rotation, and archival collapse into **one mirror mechanism** (ADR
§2.4): R2 is the continuous mirror, SQLite is the tunable hot set. The daily full reconcile bounds
recovery to a single-file restore and self-heals any tail gap.

**ENFORCEMENT.**
- *Runtime invariant — daily-reconcile integrity (`assertSnapshotManifest`):* the daily
  full-reconcile alarm must produce a snapshot whose `manifest.json` sha + per-table counts verify;
  a snapshot that fails manifest verification is not recorded as `full`.
- *CI gate — `ci/restore-from-r2`:* an integration test reconstructs the store **from R2 alone**
  and diffs against the live DO — row-count + per-table sha parity must hold; the test fails the
  build if restore is incomplete.
- *Review gate — manifest schema required:* every snapshot writes a conformant `manifest.json`;
  review rejects a snapshot path without it.

**SCOPE.** `mirror_snapshots`, the daily full-reconcile pass, the R2 key layout (ADR §2.4), and the
DR restore procedure.

**VERIFICATION.**
- *Positive proof:* a restore-from-R2-alone harness (in CI and periodically in prod) rebuilds the
  store and asserts row-count + sha parity against the live DO; a deliberately-nuked-DO test
  restores clean; daily snapshot presence + manifest integrity are monitored.
- *Code cites policy:* `assertSnapshotManifest` and `ci/restore-from-r2` cite
  `klappy://canon/constraints/ars-bounded-storage#P5`.
- *Buildable:* the snapshot manifest fields + restore order in code match ADR §2.4 exactly.

---

## P6 — Deprecate board.md, board_import, parity_check, and the Dual-Run Parity Model

**WHAT.** `board.md` as an **authoritative substrate**, the `board_import` full-replace path,
`parity_check`, and the **dual-run board parity model** are **deprecated and not carried forward.**
The board is **native per-item rows** (`board_items`) in the DO — the authoritative flat store.
`board_export` is retained **only as a read-only convenience render** (`SELECT` → markdown on
demand), and durability/DR is the R2 mirror (P5), not `board.md`. There is no `board.md` path in or
out of the new schema; the board is populated by the monolith→tables backfill from
`state.board.items`/`state.board.workstreams`, never from `board.md`.

**WHY.** The dual-run `board.md` projection was abandoned as unsustainable; the board's
authoritative home is the per-org Durable Object (`ars-v1-operating-policy` §1; `ars-nouns-and-verbs`
v1.2.0 — the DO *is* the pen, single-writer construction removes the loop-guard). Keeping
`board_import`/`parity_check` preserves a second source of truth that can drift — `parity_check`'s
only job was diffing a live external `board.md` against ARS state, and with dual-run abandoned there
is no external board to drift against (ADR Q3 ruling).

**ENFORCEMENT.**
- *CI gate — `ci/no-board-md-authority`:* fails the build if `board_import` or `parity_check` tools
  appear in the tool registry / new schema, or if any code path writes `board.md` as a source of
  truth (`board_export` writing back to storage is a violation).
- *Review gate — board-native conformance:* any reintroduced `board.md`-authoritative path or
  import/parity tool fails review; `board_export` must remain read-only (no `storage.put`, no
  write-back).

**SCOPE.** The board tools (`board_*`), `board_export`, and the migration (board.md explicitly not
migrated).

**VERIFICATION.**
- *Positive proof:* the tool registry contains no `board_import`/`parity_check`; `board_export`
  performs no storage write (grep confirms no `put`/`sql` write in its path); the migration backfills
  `board_items` from `state.board.*` only; a test asserts `board.md` is never written as authority.
- *Code cites policy:* `ci/no-board-md-authority` cites
  `klappy://canon/constraints/ars-bounded-storage#P6`.
- *Buildable:* the retained/dropped tool set in code matches ADR §2.2 exactly.

---

## Audit Surface — Governance Scope and Structural Tests

Per `constraint-driven-audits`, this constraint declares a machine-workable scope and tests so it
can be run against its governed code, not just read.

- **Governance scope:** `repo = klappy/agent-role-service; path IN [src/do.js, src/core/*, src/protocol/*]`.
- **Structural tests (automatable, CI-gradable):** absence of `STATE_KEY` / whole-state `put` (P1);
  no inline assignment of run-result/seed-prompt bodies and presence of the offload helper on
  runs/seeds writes (P2); absence of `RUNS_CAP = 32` and `LOG_CAP` silent-splice, and no row
  deletion without a preceding R2 segment write (P3); mirror-write call sites only in the alarm
  module (P4); presence of a restore-from-R2 integration test (P5); absence of `board_import` /
  `parity_check` and read-only `board_export` (P6); every named enforcer cites its
  `#PN` policy anchor (policy-first back-edge).
- **Semantic tests (judgment):** the no-op write proof genuinely demonstrates the freeze is lifted;
  the restore-from-R2 harness genuinely reconstructs the whole store; the latency benchmark
  genuinely isolates the request path.
- **Remediation vocabulary:** `reconcile` (bring code to policy), `log-exception` (record a dated,
  owned divergence per `ratified-model-requires-reconciliation-and-enforcer`), `add-enforcer`
  (the gate/invariant is missing), `cite-policy` (enforcement exists but does not reference its
  governing URI).

---

## Scope of the Claim, Confidence, Alternatives, and Residual Risk

Adversarial validation (`oddkit_challenge`, mode `canon-tier-1`, 2026-07-17) surfaced no canon
tensions but flagged that a tier-1 constraint must bound its own claim. It does so here.

**Scope of the claim.** These policies eliminate the write-freeze *class* **at the storage
layer** — the specific failure of "whole dataset in one value, rewritten every write." They do
**not** claim to prevent every possible outage: an R2 outage on a rehydrate read, a bug in the
alarm handler, or the 10 GB per-DO ceiling are separate failure surfaces addressed by their own
mitigations (inline-small digests, sha integrity, `SQLITE_FULL` reads-and-deletes-still-work,
rotation reclaiming space). The claim is bounded and falsifiable: **if a bounded, per-row write
can still freeze the service after these enforcers are green, the claim is wrong** and the policy
is reopened.

**Confidence — observed vs proposed.** The WHY of every policy is *observed fact*: the 2026-07-16
freeze happened, its causes were traced to code (ADR §1, line-cited against a fresh clone). The
ENFORCEMENT mechanisms are *proposed design*, unbuilt as of this draft — named so the build flight
implements and cites them, not asserted as already existing. A policy whose enforcer is not yet
built is a legitimate state only when it says so; this one does.

**Alternatives considered (ruled by the operator, ADR §5).** P2 considered a *dynamic size
threshold* instead of type-aware always-R2; the operator ruled always-R2 by field type because a
measured threshold is a size gamble and misses `report.result` (Q1). Migration considered running
the stopgap unfreeze PR first; the operator ruled skip-the-stopgap, one clean cutover (Q5). Driver
state considered a single JSON blob row; the operator ruled split tables for consistency with the
no-blob redesign (Q4). These are recorded so the policies are not read as the only options that
existed — they are the ruled options.

**Costs and residual risks (named, from ADR §5, not hidden).**
- **New R2 dependency on the read path** for offloaded results and rotated log/run rows — an extra
  fetch and an extra failure mode, mitigated by inline-small digests and sha integrity checks.
- **Transaction discipline** — multi-row ops (checkin, checkout, task_run completion) must wrap in
  a DO SQL transaction to preserve the former single-`put` atomicity.
- **R2 GC semantics** — a row evicted from SQLite must remain in the mirror, so GC applies to
  *superseded snapshots*, not live-referenced bodies; `blob_refs` is the GC index.
- **Mirror job cost** — the alarm tail-follower adds alarm work and R2 writes; watermark-gated
  change-capture keeps each pass cheap, with a daily full reconcile.
- **Backfill lease-invariant** — historical duplicate active leases must be deterministically
  resolved (keep newest, expire the rest, log it) or `ux_leases_active_item` rejects them.

**Named dependencies (what else falls if these are false).** The bounded-row guarantee depends on
the P2 enforcers being built and green; the safety of eviction (P3) depends on the mirror (P5)
actually holding everything; the zero-latency claim (P4) depends on the alarm firing reliably and
the mirror never being called on the request path. Each dependency is itself one of the named
enforcers, so the audit surface makes the dependency checkable rather than assumed.

**Reversibility.** As canon, this set is reversible by reverting the PR. The storage migration it
governs is reversible by design (ADR §4): backfill is additive, the legacy blob is preserved, and
rollback is a code revert with a Phase-0 R2 blob backup as the paranoid fallback — no data-loss
path.

---

## How This Constraint Got Written

The ARS store froze on 2026-07-16 (`SQLITE_TOOBIG`), six days after the operator ruled a flat-records
model the code never adopted. The operator approved the redesign in ADR-0001 (all seven design
questions ruled, 2026-07-16) and directed: *"Nothing is built without clear policies that explain
what, why, and any other template that makes a good enforceable policy."* This document is that
policy set — authored policy-first so the build flight can derive the store from it and cite it
back — and the concrete, storage-specific discharge of the general obligation in
`ratified-model-requires-reconciliation-and-enforcer`. The full black box is
`outputs/debrief-ars-monolith-2026-07-16.md`.

---

## Reconciliation With Existing Canon — Extends, Does Not Duplicate

- **`klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer` (PR #288, draft).**
  That constraint makes the obligation *general* — a ruled model must be reconciled and must have an
  enforcer. This constraint is its *specific* discharge for ARS storage: six named enforcers that
  make the ruled flat-records model bind the code. It **extends** #288; it does not restate it.
- **`ars-data-model-philosophy` (Operator-RULED 2026-07-10).** The flat-records + pinned-provenance
  model. P1 restores it at the storage layer; `provenance NOT NULL` on every record-bearing table
  (ADR §2.1) preserves the one pinned invariant.
- **`ars-nouns-and-verbs` (RATIFIED, v1.2.0).** One table per noun; the tool↔verb review gate (§5)
  is P1's review enforcer; the board-on-DO rulings (§2a/§1.2.0) are P6's authority.
- **`ars-v1-operating-policy` §1.** Board authoritative on the DO — the basis for P6's deprecation
  of the `board.md` dual-run.
- **`canon/principles/policy-first-self-building-self-documenting` and
  `canon/meta/enforceable-policy-anatomy`.** This set is the first instance authored to that
  principle and that template.
- **`canon/constraints/release-validation-gate`.** The tier-1 sibling of the same "convention plus
  an enforcer is binding" shape; its frontmatter and mechanical-rule structure are mirrored here.

---

## Related Canon

- **[Ratified Model Requires Reconciliation and an Enforcer](klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer)** — the general obligation this constraint discharges for storage.
- **[Policy-First — Self-Building and Self-Documenting](klappy://canon/principles/policy-first-self-building-self-documenting)** — why these policies are authored first and cited back.
- **[Anatomy of an Enforceable Policy](klappy://canon/meta/enforceable-policy-anatomy)** — the WHAT/WHY/ENFORCEMENT/SCOPE/VERIFICATION template each policy follows.
- **[Constraint-Driven Audits](klappy://canon/meta/constraint-driven-audits)** — the audit architecture the Audit Surface feeds.
- **[Release Validation Gate](klappy://canon/constraints/release-validation-gate)** — the tier-1 sibling shape.
- **[Vodka Architecture](klappy://canon/principles/vodka-architecture)** — "kill the DO and nothing is lost"; P5 makes it hold at the storage layer.
