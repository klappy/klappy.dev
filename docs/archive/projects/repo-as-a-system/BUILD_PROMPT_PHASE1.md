---
uri: klappy://projects/repo-as-a-system/build-prompt-phase1
title: "Build Prompt — Phase 1"
audience: internal
exposure: internal
tier: 3
voice: neutral
stability: frozen
tags: ["projects", "repo-as-a-system", "build-prompt", "internal"]
relevance: routing
execution_posture: routing
---

# Build Prompt (Phase 1)

This document captures the kickoff prompt used to initialize AI-assisted development for Phase 1 of this project.

It is provided for transparency, reproducibility, and historical context.

It is not a workflow, enforcement mechanism, or guarantee of outcomes.

---

You are an implementation agent building Phase 1 (Conversational UI) of klappy.dev.

Primary objective (Phase 1 only):
Build a static webapp/SPA that renders local Markdown documents and supports LLM-guided navigation via a small set of UI action primitives. The UI should feel like a familiar AI chat page, but the assistant must keep responses short and prefer navigation actions over long explanations.

Non-negotiable platform constraint:
Target deployment is Cloudflare Pages + (optional) Cloudflare Workers.
Phase 1 MUST be deployable as a static SPA to Cloudflare Pages.
Assume Workers runtime later (no Node-only server APIs). Avoid SSR for v0.

Repository inputs you must use:

- /public/content/manifest.json (generated inventory of content; compiled from per-file frontmatter)
- Markdown content under /canon, /odd, /about, /projects (do not invent content)
- The PRD at /docs/PRD.md (behavior contract + scope)
  Important: Canon documents are orientation, not executable workflow. Do not encode agent loops in the app.

Phase 1 deliverable:
A working SPA that:

1. Loads the manifest.json and uses it to list/locate documents
2. Renders selected Markdown in a main reading pane (with stable heading anchors)
3. Provides a chat panel (familiar layout) that accepts user questions
4. Supports UI action primitives by consuming structured “actions” (JSON) and executing them deterministically:
   - open(page_or_uri)
   - scroll_to(section_id)
   - highlight(section_id)
   - expand(section_id) / collapse(section_id) (can be minimal for now)
   - preview(item_id)
   - show_related(items[])
   - pin(item_id)
   - ask_followup(question)
   - suggest_questions(questions[])
5. Keeps assistant text responses short (1–3 sentences) and relies on UI actions to orient the user
6. Works without any backend (Phase 1: no real LLM calls required)

LLM integration requirement (Phase 1):

- Implement a “provider adapter” interface but ship with a MOCK provider by default.
- The mock provider can return:
  a) short responses
  b) a set of UI actions to demonstrate navigation
- Do NOT implement real model calls yet unless it can be done safely without secrets in the browser.
- If you include real LLM support, it must be optional and use a Worker proxy (Phase 1.5), not direct browser secrets.

UX constraints:

- Chat-first layout (left/right or split-pane) that feels familiar.
- Don’t over-explain what is already visible on screen.
- When taking an action, the assistant should optionally include 1 short sentence like:
  “Jumping you to the section that answers that.”

Tech guidance (for v0):

- Prefer Vite + React (static build). No SSR.
- Keep dependencies minimal (KISS).
- Use a simple Markdown renderer with heading IDs.
- Implement highlight via DOM scroll + CSS class toggling.
- Prefer deterministic, explicit state.

Definition of Done (Phase 1):

- Running locally: “npm install && npm run dev” starts the app
- The app shows:
  - a sidebar or list derived from manifest resources (at least entrypoints)
  - a reading pane that renders markdown from selected resource
  - a chat pane that can trigger UI actions (open/scroll/highlight)
- Provide evidence:
  1. Diff summary of what changed
  2. Commands run
  3. Visual proof: screenshots or a short screen recording showing:
     - opening a document
     - scrolling/highlighting a section via an action
     - assistant giving a short response while the UI does the work

What NOT to build yet:

- No MCP server
- No voice/hands-free
- No authentication
- No personalization
- No self-audit automation enforcement in-app
- No “autonomous loops” inside the product

Execution plan you should follow:

1. Propose a minimal folder structure and core components
2. Implement manifest loading + routing to resources
3. Implement markdown rendering + anchors
4. Implement chat UI + action interpreter
5. Implement mock provider that outputs actions + short text
6. Provide evidence artifacts (screenshots/recording) and a brief completion report

Now begin by:

- listing the minimal architecture (components + key data structures),
- then implementing the app incrementally with frequent local verification.

---

## Notes

This prompt reflects the state of the Canon and PRD at the time it was written.
Future phases may require different constraints or context.
