# 🧠 klappy.dev

This repository is a working surface for ideas, experiments, and reference documents about how software is designed and built in an AI-accelerated world.

It is intentionally **not** a framework, product, or SDK.  
It is a public record of thinking, constraints, and proofs of concept that evolve over time.

---

## Start Here

If you are new:

- oddkit is not an agent — it is a librarian and validator used _by_ agents
- It exists to prevent hallucination, misalignment, and "done without proof"

Read this first:
→ `docs/WHY.md`
→ `docs/CONTENT-MAP.md` — Comprehensive index of ALL content (including apocrypha)

---

## What This Repository Is

- A portfolio of projects and proofs of concept
- A canon of design principles, constraints, and verification standards
- A place to work in the open, with assumptions and tradeoffs made explicit
- A reference for how I think about AI-assisted development, architecture, and long-lived systems

Much of the content here exists to reduce repeated reasoning and to make decision-making easier to inspect and challenge.

---

## What This Repository Is Not

- Not a step-by-step tutorial
- Not a prescriptive workflow
- Not a prompt collection
- Not a promise of stability or completeness

Most documents are orientation, not instruction. They describe how decisions are reasoned about, not rules that must be followed.

---

## If You Want to Explore

Start with **ODD** (Outcomes-Driven Development) — the core philosophy that shapes everything here.

If that resonates, the **Canon** contains the principles, constraints, and verification standards that guide decisions.

If you want to see the philosophy applied, browse the **Projects**.

There is no required order. Follow your curiosity.

- `/docs/WHAT_THIS_REPO_IS_NOT.md` — what this repository is intentionally not
- `/projects/agentic-memory-portability.md` — the memory portability project

---

## About the Canon

The Canon is a curated set of documents that capture:

- assumptions and constraints
- decision heuristics
- definitions of completion
- evidence and verification standards

The Canon exists for clarity, not control.  
It does not execute anything by itself and is intentionally separated from tooling or automation.

---

## Versioning & Change

The Canon uses pack-level versioning with a single changelog:

- `/public/content/manifest.json` — generated inventory of what exists (compiled from per-file frontmatter)
- `/canon/CHANGELOG.md` — record of changes

Individual files are not versioned independently to avoid unnecessary ceremony.

---

## License

All content in this repository is released under the [MIT License](LICENSE).  
Reuse is encouraged.

---

## Detailed Exploration Paths

If you're new and want a concrete path, here's a reasonable order:

1. **About** — context and trust surface
   - `/about/bio.md`
   - `/about/credibility.md`
   - `/about/faq.md`

2. **ODD (Outcomes-Driven Development)** — the core philosophy
   - `/odd/README.md` (public-facing)
   - `/odd/manifesto.md` (extended)

3. **Canon** — how decisions and verification are shaped
   - `/canon/index.md` (orientation)
   - Supporting documents on constraints, decision rules, evidence, and verification

4. **Projects** — proofs of concept and experiments (added over time)

---

## Web App (Phase 1)

This repository includes a static SPA for browsing content via a chat-first interface.

```bash
npm install
npm run dev
```

The app lives in `/src` and serves content from `/public/content/`.

**Note:** `/public/content/` contains copies of source content (`/canon`, `/odd`, `/about`, `/projects`) for the SPA to serve. The source folders remain the canonical authoring location; `/public/content/` is the rendered content root for the web app.

---

## Status

This repository is active and evolving.  
Some documents are stable; others are intentionally exploratory.  
Where possible, documents label their stability and confidence level.

Feedback, questions, and challenges are welcome.

---

This repository is about preserving intent without freezing execution.  
The goal is better outcomes, not perfect artifacts.
