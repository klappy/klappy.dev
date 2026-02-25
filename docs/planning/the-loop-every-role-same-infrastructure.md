---
title: "The Loop — Every Role, Same Infrastructure"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["product-team", "roles", "workflow", "tools", "knowledge-base", "oddkit", "product-loop"]
epoch: E0005
date: 2026-02-25
derives_from:
  - canon/the-frame.md
  - docs/planning/kb-data-model.md
  - canon/methods/community-checking.md
complements: "docs/planning/oddkit-write-access.md, docs/decisions/D0017-oddkit-write-path.md, docs/oddkit/IMPL-oddkit-write.md"
---

# The Loop — Every Role, Same Infrastructure

> Every role on a product and development team runs the same loop: converse → generate → validate → promote or pivot. The Knowledge Base (KB) is the team's shared consciousness — not a documentation repository. oddkit is the connective tissue that gives every tool a shared memory. The roadmap, Google Docs, GitHub Issues, Claude Code, Claude Chat, Zulip, and email all stay. Nobody changes how they work. What changes is invisible: every AI-powered tool in the chain now reads from the same source of truth, and context stops getting lost at tool boundaries. Each surface writes through its native path — Claude Code uses git, Claude Chat uses `oddkit_write`, team chat uses `oddkit_write`. The Knowledge Base is one. The surfaces are many.

---

## Summary — The KB Eliminates Re-Translation Between Roles and Tools

Today, the PM writes a spec in Google Docs. The PO re-translates it into GitHub Issues. The engineer re-interprets the issue. QA writes a separate test plan from the issue. User feedback arrives via email and Zulip and stays there, disconnected from all of it. Each handoff drops context. Each tool has its own memory — which is to say, none of them do.

The Knowledge Base changes one thing: every role reads from and writes to the same source of truth. The PO's definition of done IS the QA manager's test specification — because they're in the same KB. The architect's decision record IS the engineer's constraint — because Claude Code reads it via oddkit. User feedback IS the PM's next planning input — because it enters the KB and drives the next cycle.

The tools don't change. The loop doesn't change. The context loss disappears.

---

## The Product Loop — One Loop, Every Role

The loop is: **converse → generate → validate → promote or pivot.** This is defined in The Frame (`canon/the-frame.md`). What follows is how each role runs that same loop through the KB, using the tools the team already has.

### Product Manager — Strategy, Priorities, and "Why"

The Product Manager shapes what gets built and why. Their primary tools are the **roadmap**, **Google Docs**, and **Claude Chat**.

**Converse.** The PM opens Claude Chat with oddkit connected. They explore strategy, market signals, and partner feedback. The AI already knows every prior decision, every constraint, every piece of user feedback in the KB — no re-explaining context, no "let me catch you up on what we decided last month."

**Generate.** The AI drafts planning specs, epoch definitions, and priority rationale — grounded in KB context. The PM refines in conversation. Prior decisions and architectural constraints are surfaced automatically, not after someone remembers to mention them.

**Validate.** The PM uses oddkit's challenge tool against existing governance constraints. "Does this new priority contradict a decision we already made?" They review against architect's constraints and user feedback for alignment.

**Promote or pivot.** Approved specs are committed to the KB via `oddkit_write` — content goes from conversation to repo directly. The roadmap updates to reflect the new priority. A summary goes to Zulip. Or: the PM pivots, and the rationale for pivoting is recorded — not lost in a Slack thread.

**Reads from KB:** User feedback and community checking reports. Prior decision records with rationale. Current epoch definition and planning queue. Architect's constraints and governance docs. QA gap reports. Engineer's "this was harder than expected" notes.

**Writes to KB:** Epoch definitions and roadmap rationale. Planning specs with acceptance criteria. Strategic decisions with reasoning trail. Priority shifts with evidence. Partner feedback summaries from email and Zulip.

**Write path:** `oddkit_write` from Claude Chat. Progressive protection — direct to default branch for solo work, branches/PRs when the team needs review gates.

**Primary oddkit tools:** orient, search, encode, challenge, write.

### Product Owner — Requirements, Definitions of Done, and "What Specifically"

The Product Owner translates "what and why" into "what specifically and how we'll know it's done." Their primary tools are **GitHub Issues**, **Claude Chat**, and **Zulip**.

**Converse.** The PO opens Claude Chat with oddkit. "Read the planning spec for epoch 6 and help me break it into requirements." The AI reads the PM's spec directly from KB — no forwarded links, no stale copies.

**Generate.** The AI drafts requirements with definitions of done, acceptance criteria, and traceability to the originating planning spec. Architect's constraints apply automatically as guardrails.

**Validate.** The PO uses oddkit's gate tool: "Are these requirements ready for engineering?" This checks completeness, testability, and constraint alignment. Ambiguous criteria get challenged before they reach the engineer.

**Promote or pivot.** Requirements are committed to KB via `oddkit_write`. The PO creates GitHub Issues that reference KB URIs for the definition of done. The engineer's Claude Code reads the full spec from KB — not just the issue title.

**Write path:** `oddkit_write` from Claude Chat.

**Primary oddkit tools:** search, encode, gate, validate, write.

The critical shift: the PO's definitions of done become the QA manager's validation criteria automatically — because they're in the same KB. No separate test plan document. The definition of done IS the test specification.

### Architect — Constraints, Decisions, and Boundaries

The Architect defines the boundaries that make the system possible — not just permissible. Their primary tools are **Claude Chat**, **Zulip**, and **Claude Code**.

**Converse.** The architect opens Claude Chat with oddkit. They explore design trade-offs: "If we choose X, what constrains Y? What are we giving up?" The AI surfaces prior decisions and constraints from the KB that are relevant — decisions the architect may not remember making six months ago.

**Generate.** The AI drafts decision records, architectural constraints, governance docs, and technology evaluations. Each traces to the axioms and prior decisions that ground it.

**Validate.** The architect uses oddkit's challenge tool against existing decisions. "Does this new constraint contradict D0012?" Self-consistency checking before committing. They also review engineer feedback on existing constraints — "D0007 was too restrictive because..." — which is now visible in the KB instead of buried in a Zulip thread.

**Promote or pivot.** Decision records are committed to the KB. When working in Claude Chat: `oddkit_write`. When working in Claude Code: native git. Every engineer's Claude Code session, every PO's Claude Chat session — they all read these constraints automatically. Architecture enforces itself through the KB.

**Write path:** `oddkit_write` from Claude Chat, native git from Claude Code. The architect moves between surfaces; the KB is the same regardless.

**Primary oddkit tools:** challenge, encode, gate, search, preflight, write.

The architect's decisions are alive, not buried in a wiki nobody reads. The architect doesn't attend every standup to enforce decisions — the KB does it.

### Engineer — Building, Learning, and Feeding Back

The Engineer builds in projection repos and writes learnings back. Their primary tools are **Claude Code CLI**, **GitHub Issues**, **Zulip**, and **Claude Chat**.

**Converse.** The engineer opens Claude Code CLI with oddkit connected. "Search the KB for the spec on feature X." The agent reads the PO's requirements, the architect's constraints, and prior implementation learnings — without being told where to look.

**Generate.** The engineer builds code in the projection repo. Claude Code knows the definition of done, the architectural boundaries, and prior implementation decisions from the KB. They run oddkit's preflight before starting — which surfaces relevant constraints, the definition of done, and known pitfalls.

**Validate.** The engineer uses oddkit's validate tool against the definition of done from the KB. "Does this implementation satisfy the acceptance criteria?" Evidence-based, not gut-based. The GitHub PR references the KB spec URI.

**Promote or pivot.** Code merges via PR in the projection repo — using Claude Code's native git flow. Implementation learnings, gotchas, and constraint feedback write back to KB. In Claude Code, this is native git. If the engineer switches to Claude Chat to draft a longer learning doc or decision record, `oddkit_write` handles it.

**Write path:** Native git from Claude Code. `oddkit_write` from Claude Chat when drafting docs. The engineer uses git for code and `oddkit_write` for knowledge — each surface uses its native capability.

**Primary oddkit tools:** search, get, preflight, validate.

The engineer never asks "where's the spec?" — they search the KB. Their Claude Code reads the same source of truth the PO wrote to. When the engineer discovers a constraint doesn't work in practice, that feedback writes back to the KB where the architect sees it.

### QA Manager — Validation, Evidence, and Gap Analysis

The QA Manager turns "done" claims into evidence-backed verdicts. Their primary tools are **Claude Chat**, **GitHub Issues**, and **Claude Code**.

**Converse.** The QA manager opens Claude Chat with oddkit. "Show me all completion claims for this sprint and their definitions of done." The AI reads definitions of done, acceptance criteria, and the engineer's evidence from KB. No separate test plan to write — the definitions of done already exist in the KB.

**Generate.** The AI generates validation reports: "Claim X — VERIFIED, evidence at [URI]" or "Claim Y — NEEDS_ARTIFACTS, missing evidence for criterion Z from spec W." Every verdict is traceable.

**Validate.** The QA manager reviews the AI's validation. They apply human judgment to edge cases: "The evidence exists but does it satisfy the spirit of the requirement?" They check against user feedback for outcome validity — not just output correctness.

**Promote or pivot.** Validation reports are committed to KB via `oddkit_write`. Gaps become specific GitHub Issues with KB references: "claim X lacks evidence for criterion Y from spec Z." Not vague bug tickets — traceable gaps tied to specific criteria.

**Write path:** `oddkit_write` from Claude Chat.

**Primary oddkit tools:** validate, search, challenge, get, encode, write.

### User Feedback — Community Checking

User feedback is the loop's reality check. It arrives through **Zulip** (community channels), **email** (partner feedback), support conversations, and field observations from translation consultants.

**Converse.** Users interact with the product. Their behavior, questions, confusion, and delight are all signals. These arrive scattered across channels — Zulip threads, email inboxes, field reports from consultants.

**Generate.** A team member opens Claude Chat with oddkit and synthesizes feedback patterns from the raw signals: "Users consistently struggle with X." "Feature Y was adopted faster in context Z." The AI structures scattered observations into actionable patterns.

**Validate.** The PM and team review synthesized feedback against original intent. "We built this to solve problem A — did it actually solve problem A for the people who have problem A?"

**Promote or pivot.** Validated feedback enters the KB as community checking reports via `oddkit_write`. These reports drive the PM's next planning cycle. The loop feeds itself.

This is where the Bible translation origin story completes the circle. Community checking isn't a metaphor borrowed from translation — it's the same practice. The translator doesn't decide if the translation works. The community does. The product team doesn't decide if the feature works. The users do.

---

## The Tool Map — What Stays, What Connects, What Changes

The principle from The Frame: "The system is not a tool — it is a protocol that slipstreams into existing tools. It never requires users to leave their current workflow."

**Claude Code CLI** — oddkit MCP gives Claude Code direct KB read access. Writes use native git. Available now.

**Claude Chat** — oddkit MCP gives Claude Chat full KB context. Writes use `oddkit_write`. Available with E0005.2.

**GitHub Issues** — Issues reference KB specs by URI. The definition of done lives in the KB; the issue links to it. Available with E0005.2 write path.

**Roadmap** — Roadmap items trace to planning specs in KB. Available with E0005.2 write path.

**Zulip** — Discussions stay in Zulip. Key decisions get encoded to KB as durable records via team chat assistant or manual `oddkit_write`. Available with E0005.2 write path.

**Email** — Relevant partner feedback and commitments get encoded to the KB. Available with E0005.2 write path.

**Google Docs** — Collaborative editing continues in Google Docs. Finalized docs can migrate to the KB. On the horizon: Google Drive folders mountable as read or read-write projects.

### Horizon Surfaces and the Daily Journal

The loop extends into team chat (a lurking assistant in Slack/Zulip that captures decisions from natural conversation) and meetings (a contextual listener that turns verbal decisions into structured records). These are described in full in the horizon surfaces doc (`horizon-surfaces-where-the-loop-runs-next.md`).

Across every surface — current and horizon — any team member can encode durable journal entries: observations, learnings, decisions, and handoffs captured in a sentence during natural workflow. The journal is the most frequent unit of knowledge capture and the primary way the Knowledge Base grows. It requires no ceremony. Just a sentence in conversation, and oddkit's `encode` → `oddkit_write` chain persists it.

---

## What Changes for the Team — Practically

People keep using their preferred tools. What changes is invisible: every AI-powered tool in the chain now reads from the same KB. Context stops getting lost at tool boundaries.

**Before:** PM writes spec in Google Doc → shares link in Zulip → PO reads Doc, creates GitHub Issues manually → engineer reads issue, opens Claude Code, re-explains context → QA reads issue, writes separate test plan → user feedback arrives via email, stays in email → architect's decisions live in someone's head.

**After:** PM writes spec via Claude Chat → `oddkit_write` commits to KB → PO's Claude Chat reads PM's spec, generates Issues with KB references → engineer's Claude Code reads spec and constraints from KB directly → QA's AI reads definition of done from KB (that IS the test criteria) → user feedback encoded to KB, drives PM's next cycle → architect's decisions in KB, every AI session reads them.

The human workflow barely changes. The system gains a shared memory without anyone changing how they work.

---

## Constraints — What This Requires to Work

The write path (E0005.2) must be operational. Without writes, the system remains read-only — useful for Claude Code and Claude Chat sessions that read constraints, but unable to close the feedback loop.

Each surface uses its native write capability. Claude Code uses git. Claude Chat uses `oddkit_write`. The system never requires anyone to leave their current tool. If it does, the slipstream principle has been violated.

Google Drive as a project backend is not required for the core loop. It extends the system to non-repo content but is not a prerequisite.
