# E0007 Handoff Bootstrap — From Passive to Proactive

## What happened
Session 2026-04-03 declared E0007. Theme: oddkit tools shift from passive (wait for invocation) to proactive (act as cognitive rhythm). The passive posture was intentional and correct for testing — the pain of success is the graduation signal.

## Key artifacts produced (all in outputs)
1. **encode-persistence-gap.md** — Cornerstone governance article. Ready for push to `docs/oddkit/encode-persistence-gap.md`
2. **e0007-implementation-plan.md** — Full plan: 5 phases, 16 files, 4 oddkit code changes, A/B testing via `canon_url` branch override
3. **oldc-h-2026-04-03-the-gauntlet-should-run-itself.md** — Session ledger with full OLDC+H

## Where we stopped
Plan is complete but no files have been pushed yet. Phase 0 (branch creation) is the next step.

## Forcing fault
"A system that requires its user to remember its features has delegated its cognition to the wrong party."

## Invariant
"The system acts, the operator reviews."

## Key decisions
- "Project journal" = user-facing term, "epistemic ledger" = canon term
- Continuous OLDC+H encoding at every turn, not session-end batch
- Proactive usage of ALL oddkit tools, not just encode
- Proactive Identity of Integrity resurfacing corrects hallucinations (observed)
- Handoff to new conversation = proactive CST detection + curated bootstrap
- Don't separate journal entries by type — erases narrative
- A/B test uses `canon_url` param pointing to feature branch

## Active constraints
- Governance articles BEFORE oddkit code changes (truth in canon first)
- BM25 requires many small, pointed files — single article won't surface
- Passive posture overwritten but not erased
- ODD is protocol layer, not storage layer

## Next actions
1. Phase 0: Create branch `e0007-proactive-posture` from main
2. Phase 1: Push epoch declaration files (epoch-7.md, epochs.md update, cornerstone article)
3. Phase 2: Write spin-off governance articles (see plan for full list of 13 files)
4. Phase 4: A/B test with `canon_url` branch override before oddkit code changes

## Branch Test Results (2026-04-03)

**Branch:** `e0007-proactive-posture` — pushed and live on GitHub
**oddkit canon_url test:** `https://raw.githubusercontent.com/klappy/klappy.dev/e0007-proactive-posture`

**Results:**
- `docs_considered: 429` (vs 411 on main) — branch files ARE indexed
- Cornerstone article does NOT surface in top-5 BM25 for any query tested — confirms spin-off articles are essential for relevance
- `oddkit_get` by URI (`klappy://docs/oddkit/encode-persistence-gap`) returned "document not found" — possible URI resolution issue with branch files, needs investigation
- A/B testing mechanism via `canon_url` works — branch content is loaded and searchable

**Implication:** Phase 2 (spin-off articles) is critical. A single cornerstone article will not surface through BM25 search. Small, pointed articles with specific titles and tags are required for the proactive posture to be discoverable.
