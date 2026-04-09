# DOLCHE — One Hour with Claude Managed Agents

**Date:** 2026-04-09
**Session:** ~3 hours, Claude Chat (oddkit project)
**Trigger:** Jesse shared Anthropic's Managed Agents announcement (2026-04-08 evening). Klappy saw it morning of April 9.

---

## Decisions

- **D1:** Spike Managed Agents immediately rather than theorize — read docs, then build
- **D2:** Use Sonnet 4.6 for all spike agents — prove the pattern cheaply before spending Opus tokens
- **D3:** Test proactive posture by asking about topics that only exist in oddkit canon (ODD axioms, Vodka Architecture)
- **D4:** Three-model pipeline for production: Opus writes, Sonnet validates, Opus fixes
- **D5:** Governance validation by agents — all canon constraints, not just frontmatter
- **D6:** Keys in project instructions (one line), governance in canon — same pattern as GitHub PAT
- **D7:** Co-authored writing framing: AI is ghost writer taking brain dumps and transcripts, not AI-generated content. Ghost writer must stay invisible.

## Observations

- **O1:** Proactive oddkit posture survives Managed Agents harness — 8 MCP calls before first response, no prompting needed beyond system prompt
- **O2:** Agent honestly reported Vodka Architecture not found — refused to guess. Birch: "It admitted what it didn't find and it refused to guess. Very cool."
- **O3:** Vodka Architecture search miss caused by two bugs: stale KV index (411 vs 455 docs, eventual consistency) and BM25 keyword dilution ("pattern" drowning "vodka")
- **O4:** Coding agent followed AGENTS.md pre-work checklist, called orient/preflight/validate autonomously. Filed PR #72.
- **O5:** Broken frontmatter shipped 4x in one session — inline fixing failed every time. Agent validation caught every issue in one pass.
- **O6:** Inline validation is fast but limited. Agentic validation has overhead (2-4 min, can timeout/crash) but is thorough. Complementary, not competing.
- **O7:** Sonnet-authored code generates more review findings than Opus-authored code. Model selection per agent role matters.
- **O8:** "Not X, it's Y" flagged by Birch as AI voice cliché — validated against Wikipedia's Signs of AI writing catalog
- **O9:** MCP servers declared at agent creation, available to all sessions — right granularity for epistemic governance
- **O10:** Memory Stores require research preview access (404) — future integration point for OLDCH persistence

## Learnings

- **L1:** `mcp_servers` in agent config require matching `mcp_toolset` in tools array — clear error message guides you
- **L2:** `public: false` + `exposure: public` crashes the renderer — contradictory flags with no graceful fallback
- **L3:** Unquoted tag strings in inline YAML arrays crash the renderer — must be `["quoted", "strings"]`
- **L4:** Stream SSE endpoint uses different beta header (`agent-api-2026-03-01`) than REST endpoints (`managed-agents-2026-04-01`)
- **L5:** Temporal claims ("weeks ago") must be verified against actual dates — wrote "weeks" when frontmatter said 5 days (2026-04-04)
- **L6:** Agent validation sessions can timeout or die mid-execution — retry logic needed
- **L7:** Anthropic's engineering blog explicitly says harnesses encode assumptions that go stale as models improve — validates TruthKit thesis that epistemic layer is distinct from infrastructure layer

## Constraints

- **C1:** Multi-agent, Memory, Outcomes features are research preview — need access request at https://claude.com/form/claude-managed-agents
- **C2:** One level of delegation only in multi-agent (callable agents cannot call agents)
- **C3:** Memory documents capped at 100KB (~25K tokens)
- **C4:** No API keys in committed files — project instructions only
- **C5:** All public writing must pass: relational sensitivity, author identity, AI voice clichés, frontmatter validation, temporal claims

## Handoffs

- **H1:** Merge PR #79 (article) — frontmatter agent-validated, public: true
- **H2:** Merge PR #81 (governance validation method doc) — agent-validated clean
- **H3:** Review PR #72 (BM25 phrase boost + index freshness on oddkit) — Sonnet-authored, expect bugbot findings
- **H4:** Close PRs #56, #57 on oddkit (stale oddkit_write stubs)
- **H5:** Request research preview access for Memory + Outcomes + Multi-agent
- **H6:** Write `canon/constraints/temporal-claims-require-dates.md`
- **H7:** Add `ANTHROPIC_API_KEY` + governance validation mandate to project instructions
- **H8:** Run AI voice cliché check on the article before publishing
- **H9:** Update TruthKit project handoff with today's full findings

## Encodes

- **E1:** This DOLCHE entry — persisted to `docs/ledger/2026-04-09-managed-agents-session.md`
- **E2:** Handoff doc created at session start: `handoff-managed-agents-spike.md` (in outputs)
- **E3:** Agent validation pattern proven and documented in `canon/methods/governance-validation-via-agents.md`

---

## Artifacts Produced

| Artifact | Location | Status |
|----------|----------|--------|
| Article: One Hour with Managed Agents | PR #79 klappy.dev | Open, ready to merge |
| BM25 phrase boost + index freshness | PR #72 oddkit | Open, needs review |
| AI voice clichés constraint | PR #80 klappy.dev | Merged |
| Frontmatter validation gate | PR #80 klappy.dev | Merged |
| Writing canon item 8 (ghost writer test) | PR #80 klappy.dev | Merged |
| Governance validation method doc | PR #81 klappy.dev | Open, ready to merge |
| Handoff doc for TruthKit | outputs/ | Delivered |
| Spike script | outputs/ | Delivered |
| Session event logs | outputs/ | Delivered |

## Managed Agent Resources

| Resource | ID |
|----------|-----|
| Coding Agent | `agent_011CZtF49QEEqF6xUR4tHWHZ` |
| Environment | `env_016RffZyqSdHeb5s3Z6UABw8` |
| Spike Agent | `agent_011CZtD1cDDpA93SmSAYq33T` |
| Ledger Agent | `agent_011CZtE2U9vRVFBynGqdBxCB` |
