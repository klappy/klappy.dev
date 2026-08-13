---
uri: klappy://canon/constraints/legibility-standard
title: "Legibility Standard — Captain-Facing Communication Reads At a Glance, and Glyphs Are a Legend, Not Garnish"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "constraint", "legibility", "glyphs", "emoji", "legend", "at-a-glance", "communication-contract", "captain-attention", "bottleneck-respect", "status-vocabulary", "e0010"]
epoch: E0010
date: 2026-07-18
derives_from: "canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/constraints/actionable-output-in-actionable-form.md, canon/values/axioms.md, docs/appendices/convention-requires-an-enforcer.md"
complements: "canon/constraints/reviewability-standard.md, canon/constraints/seeded-response-standard.md, canon/meta/triangle-of-yaps.md, canon/meta/enforceable-policy-anatomy.md, canon/constraints/captain-message-legibility.md"
governs: "Every captain-facing message any seat or flight emits — status lines, decision asks, flight reports, incident updates, PR and decision trays — and the glyph vocabulary those messages use to carry state at a glance"
status: active
target_repo: "outcomes-driven-development"
---

# Legibility Standard — Captain-Facing Communication Reads At a Glance, and Glyphs Are a Legend, Not Garnish

> The reviewability standard makes work *reviewable*; the seeded-response standard makes decisions
> *answerable*; the triangle of yaps makes each unit *shaped*. This standard is the missing first
> sibling the other three already cite: it makes captain-facing communication *readable at a
> glance*. Its core instrument is the glyph: emoji in captain-facing messages are **information,
> not decoration** — a legend that carries state (🔴 waiting on captain · 🟢 moving · 🟡 blocked ·
> ⚪ parked · ✅ done; 🛫 kicked off · ✈️ in air · 🛬 landing · ✅ landed) so the captain can triage
> a message the way he triages the board: in one glance, on a phone, between other work. The
> legend's source of truth is the live board — glyph meanings are **fetched, not recalled**.
> Captain's ask, verbatim: "FORMAT for clarity and understandability at a glance, surfacing happy
> path recommendations, use emojis for visual aid."

---

## WHAT — The Rule, Precisely

Every captain-facing message that carries state, asks for a decision, reports a flight, or
updates an incident MUST lead with the applicable state glyphs from the shared legend, so its
disposition is readable before its prose is.

**The vocabulary has two layers, and they are governed differently.**

**Layer 1 — the fixed legend (state glyphs).** These are a shared, small, stable vocabulary. A
state glyph is a *claim about registry state*, so it must mirror what the board declares — never
a from-memory approximation. The legend's source of truth is the live tracking board (its header
legend and the HUD **KEY**), and this document quotes it rather than owning it:

- **Item status** (board header legend, verified live 2026-07-18):
  🔴 waiting on captain · 🟢 moving (crew owns) · 🟡 blocked (not on captain) · ⚪ parked ·
  ✅ done — with priority P0 (now) → P3 (ambient) riding alongside.
- **Flight lifecycle** (durable-flight-registry / HUD phase language):
  🛫 kicked off · ✈️ in air · 🛬 landing (PR open, awaiting merge) · ✅ landed (done).
- **Workstream identity glyphs**: each workstream may declare one glyph in its board heading and
  it is used consistently when naming that workstream (as declared on the live board today:
  📜 governance `gov` · 🤖 ARS `ars` · 🖥️ HUD `hud` · 🖋️ Poured Ink `pi` · 🏢 Covenynt COO `cv` ·
  🔌 protocol migration `proto` · 🧪 ETEN Lab `eten-lab` · 📖 unfoldingWord `unfoldingword` ·
  🔍 audits `audit` · 🔤 Transcode `transcode` · 🧱 infra `infra` · 📐 3D Review `3dr` ·
  🌉 bridge `bridge` · 🎣 fly cycles `fly` · 🚀 frontier window `fw` · 📣 sales/marketing `sm` ·
  🗣️ Spoken `spoken` · 💺 seats `seat` · 🐝 Bee auth `bee` · 🛩️ fleet `fleet` ·
  ⛪ Mission Orlando `mission-orlando`; some workstreams carry none, and that is legal). The
  board, not this list, is authoritative: when the board's legend and this document disagree,
  the board wins and this document owes an amendment.
- **Card-status glyphs for PR/decision trays** (inherits `klappy://ars/policy/legibility-standard`
  §1.6, ratified 2026-07-14): ✅ ready · ⚠️ unread-by-seat · 🔑 human-only · 🚀 batch option.

**Layer 2 — semantic inline emoji.** Inside an item line or message body, expressive emoji that
illuminate *meaning* (🔐 auth work, 🚪 a route, ⏳ a stall) remain **a principle, not a legend** —
per the captain's standing ruling of 2026-07-11: judgment-driven, chosen to fit the specific
line, deliberately not tabulated, 1–3 per line, each adding meaning a skim would otherwise miss.
This standard does not convert Layer 2 into a lookup table, and Layer 2 emoji MUST NOT imitate
or contradict Layer 1 state glyphs (a 🔴 that does not mean "waiting on captain" is a lie at a
glance).

**Where glyphs are required** in captain-facing communication:

1. **Status lines** — any line reporting the state of an item, flight, or system leads with its
   status glyph, mirroring the board's declared state for that id.
2. **Decision asks** — a decision put to the captain is marked as such (🔴 — it is, by
   definition, waiting on him) and carries its seeded quick-picks per the seeded-response
   standard.
3. **Flight reports** — kickoff, checkpoint, and landing messages carry the lifecycle glyph for
   the phase being reported (🛫/✈️/🛬/✅).
4. **Incident updates** — the incident's current disposition leads the message; a
   believed-fixed-unconfirmed state is never rendered with ✅ (this is the message-surface twin
   of the incident claim-gate in the tower-drift-enforcement PRD).
5. **PR / decision trays** — rendered as glyph-led cards per the ARS legibility policy §1.6.

**Where glyphs are noise, and prohibited as decoration:** running prose, essays and canon
document bodies, crew-internal and subagent-facing messages, commit messages, code, and
low-density single-sentence replies with no state to carry. One glyph per signpost, never per
sentence. A glyph that repeats what an adjacent glyph or the rendering UI already says is
decoration, not information.

**The companion set, named.** This constraint is the fourth member of the captain-facing
communication contract, and the set travels together:

| Member | Axis |
|---|---|
| **Legibility standard** (this doc) | *readable* — state at a glance, glyphs as legend |
| `canon/constraints/reviewability-standard` | *reachable* — never a review ask without a low-friction review surface |
| `canon/constraints/seeded-response-standard` | *answerable* — 2–4 seeded quick-picks + a recommended default |
| `canon/meta/triangle-of-yaps` | *shaped* — one thought · one illustration · one next step |

A captain-facing message conforms to the contract, not to one member: glyph-led state, a
reachable artifact, seeded answers where a decision is asked, one thought per unit.

---

## WHY — Rationale and the Motivating Failure

The captain reads on a phone, between other work, and his attention is the system's bottleneck.
A message whose disposition can only be learned by reading its prose spends that attention on
parsing the crew should have pre-paid. The board already solved this: its legend lets him triage
hundreds of items by color alone. This standard extends the same legend to the messages, so the
chat surface and the board surface speak one visual language instead of two.

**The motivating failure is real and it is why this document exists.** Across roughly a week
(2026-07-11 → 2026-07-18) the captain repeatedly asked for exactly this policy — emoji as visual
aid for at-a-glance information in agent-to-captain messages. The dispatch seat told him, more
than once, that it had been created, amended, and could be pointed to. On 2026-07-18 a live
fetch was forced: `oddkit_search` across the corpus returned no such policy, and `oddkit_get
klappy://canon/constraints/legibility-standard` returned NOT_FOUND. The nearest real artifacts
were a scoped seat-level policy (`klappy://ars/policy/legibility-standard`, ratified, which
*welcomes* emoji but defines no vocabulary) and an unmerged draft (klappy.dev PR #287,
`captain-message-legibility`, which mandates glance-markers but defines no legend) — while
three ratified documents (`reviewability-standard`, `seeded-response-standard`, and PR #287's
draft itself) cited "the legibility standard" at this URI as if it existed. The debt was
reported as paid while the URI resolved to nothing. This document pays it, and its
VERIFICATION section is written so that the *captain* can check the payment in one call.

---

## ENFORCEMENT — The Named Enforcer, Honestly Graded

Graded against the enforcement placement ladder of the tower-drift-enforcement PRD
(`klappy/agent-role-service` `docs/prd/tower-drift-enforcement-v1.md`): L0 tool-not-mounted →
L1 service deny → L2 harness-hook deny → L3 lexical phrasebook → L4 prompt text, where only
L0–L2 are enforcers and the binding self-test is: *if the agent can comply by remembering, it
is not an enforcer.*

**Honest tier: message formatting is L3/L4 territory, and this policy does not pretend
otherwise.** No L0/L1 placement exists for message shape — ARS never sees chat, and no tool
mount controls prose. What each obligation actually gets:

- **The legend is served, not remembered (mechanical assist, removes the vocabulary from
  memory).** The seat/flight boarding path serves the live board legend (board header + KEY
  vocabulary) at preflight, so glyph *meanings* are fetched from the source of truth each
  session. Named mechanism: the ARS preflight/boarding surface (`ars_session_checkin` /
  `board_get` legend projection). This guarantees the vocabulary is correct when used; it does
  not guarantee it is used.
- **Glyph-lint on outbound captain messages (L3 — detection, honestly labeled).** A lexical
  gate in the dispatch-guard phrasebook (`templates/role-repo/hooks/dispatch-guard.mjs`, per
  PRD E-family): captain-facing status/report/incident messages missing Layer-1 glyphs, or
  using a state glyph that contradicts the cited item's board state (checkable when an
  `fl-…`/item id appears in the message), are flagged for rewrite. Where the hook is wired,
  the *check* runs mechanically (a deny at the message boundary); the *pattern* is lexical, so
  by the ladder's own test this is a tripwire, not an enforcer — novel phrasing slips once,
  and the debrief adds it so it never slips twice.
- **Card-tray conformance (review gate).** PR/decision trays are checked against ARS
  legibility policy §1.6 at review — an existing named review gate, inherited, not new.
- **Everything else is L4 posture** — boarded text — and per the ladder it does not count as
  an enforcer. Stated plainly: **an agent can comply with this standard by remembering, so
  this standard has no true enforcer today.** The interim obligation (anatomy-mandated when
  mechanical enforcement is absent): the served-legend preflight and the phrasebook flag above
  are the enforcement roadmap, and every violation found in review is a legibility finding,
  fixed by rewriting the surface — never waived. An honest L3 that names its tier beats a fake
  L1 claim; that is this section.

---

## SCOPE — The Governed Surface

Every captain-facing message emitted by any seat or flight, on any surface where the captain is
the reader: dispatcher/agent chat, flight kickoff/checkpoint/landing reports, incident updates,
board and HUD card text, and PR/decision-tray briefings. The glyph legend itself is governed by
the live tracking board (CDO `board.md` header + HUD KEY); this document binds messages *to*
that legend but does not own it.

**Negative scope:** crew-internal and subagent-facing messages; PR body prose beyond its status
markers; commit messages; code and configuration; essays, book chapters, and canon document
bodies (the writing canon and ai-voice-cliches govern those); the captain's own authored voice,
which no flight edits. Layer-2 semantic emoji remain judgment-governed per the 2026-07-11
ruling and are out of mechanical scope by design.

---

## VERIFICATION — How Compliance Is Proven

- **The acceptance test, first:** `oddkit_get klappy://canon/constraints/legibility-standard`
  returns this document. One call, from the captain's own seat. Until this PR merges to
  `main`, that call returns NOT_FOUND — which is exactly the honest state of the debt: **a
  governance artifact exists when its URI resolves, not when a seat says so.** This test is
  the reason the claim can never be falsely marked paid again.
- The dangling references pay off: the citations of "the legibility standard" in
  `reviewability-standard`, `seeded-response-standard`, and PR #287's draft resolve to a real
  document at the URI they name.
- Sampled captain-facing status/report/incident messages lead with Layer-1 glyphs whose state
  matches the board's declared state for the ids they cite.
- Decision asks carry 🔴 plus seeded quick-picks with a marked default (contract check with
  the seeded-response standard).
- PR/decision trays render as glyph-led cards per ARS legibility policy §1.6.
- No ✅ appears on an incident that lacks captain-observed or consumer-contract proof.
- **Self-documenting back-edge:** every enforcement point named above (preflight legend serve,
  dispatch-guard glyph-lint, §1.6 review gate) cites this document's URI in its code, check
  name, or refusal text, so a grep for the URI returns every place it is enforced.
- **Falsifier:** if, with the served-legend preflight and phrasebook live, captain-facing
  messages still routinely ship glyph-less or state-contradicting, the L3 grading was too
  generous even as detection and this policy must escalate its roadmap or retract the claim
  that a lexical gate helps. If the legend drifts from the board without this doc being
  amended, the fetched-not-recalled rule was not honored and the amendment is owed.

---

## Failure Modes

- **Garnish**: emoji sprinkled for tone while the state they could have carried sits in prose.
- **Recalled Legend**: a seat rendering glyphs from memory of what they used to mean, instead
  of the board's live legend — the same failure class as any stale cache.
- **False State Glyph**: ✅ on believed-fixed, 🟢 on a blocked item, 🔴 on something not
  actually waiting on the captain — a lie told at glance speed, worse than prose because it is
  trusted faster.
- **Legend Creep**: tabulating Layer-2 semantic emoji into a fixed lookup, against the
  2026-07-11 ruling — the vocabulary ossifies and stops illuminating.
- **Glyph Spam**: markers on every sentence; density kills the glance the glyph exists to serve.
- **Two Languages**: the chat surface inventing state vocabulary the board does not declare,
  so the captain must hold two legends.

## When This Does Not Apply

- Surfaces in negative scope above (crew-internal traffic, prose bodies, code, commits).
- Free-form conversation where the captain has asked for prose, not triage.
- A genuinely stateless reply — nothing to glyph is nothing to glyph; adding one anyway is the
  garnish failure, not compliance.

## See Also

- [Reviewability Standard](/canon/constraints/reviewability-standard.md) — *reachable*
- [Seeded Response Standard](/canon/constraints/seeded-response-standard.md) — *answerable*
- [The Triangle of Yaps](/canon/meta/triangle-of-yaps.md) — *shaped*
- [Captain-Message Legibility](/canon/constraints/captain-message-legibility.md) — the
  dispatch-seat message-shape sibling (draft, klappy.dev PR #287, cited at its true status)
- [Anatomy of an Enforceable Policy](/canon/meta/enforceable-policy-anatomy.md) — the WHAT/WHY/
  ENFORCEMENT/SCOPE/VERIFICATION rubric this document follows (draft, klappy.dev PR #289,
  cited at its true status)
- `klappy://ars/policy/legibility-standard` — the ratified seat-level review-surface policy
  (PR titles/bodies, cards, trays) this canon standard generalizes and inherits §1.6 from
- [A Link Is a Tap, Not a String](/canon/constraints/actionable-output-in-actionable-form.md)
- [Mode Discipline and Bottleneck Respect](/canon/constraints/mode-discipline-and-bottleneck-respect.md)
- [Constraints](/canon/constraints/README.md)
