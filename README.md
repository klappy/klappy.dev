# klappy.dev

The knowledge base behind [oddkit](https://github.com/klappy/oddkit) — an open-source MCP server that gives your AI structured memory and epistemic discipline.

> **This repo is the fuel. [oddkit](https://github.com/klappy/oddkit) is the engine.** oddkit reads the markdown files in this repository and makes them available to your AI through structured tools. You can also point oddkit at your own repo to build your own knowledge base.

---

## Get Started

**Step 1:** Connect oddkit to your AI tool. See the [oddkit repo](https://github.com/klappy/oddkit) for setup instructions — it takes 30 seconds.

**Step 2:** Read [Getting Started with ODD and oddkit](https://klappy.dev/page/writings/getting-started-with-odd-and-oddkit) for the full walkthrough: connecting, trying it, bootstrapping your project, and building your own knowledge base.

---

## What's in This Repo

This is a living knowledge base with 400+ documents spanning governance, methodology, planning, and public essays. It's organized into four tiers:

| Directory | What It Contains |
|-----------|-----------------|
| `canon/` | **Governance** — axioms, constraints, values, diagnostics, methods. The foundational principles that oddkit enforces. |
| `odd/` | **Methodology** — ODD (Outcomes-Driven Development) philosophy, epochs, maturity model, getting-started guides. |
| `docs/` | **Implementation** — planning documents, decision records, incident reports, tool documentation, session journals. |
| `writings/` | **Public essays** — articles published on [klappy.dev](https://klappy.dev) about AI-augmented workflows, knowledge transfer, and building systems that build systems. |

### Start Here

If you want to understand the philosophy:
- [The Journey from AI Tasks to AI-Augmented Workflows](writings/the-journey-from-ai-tasks-to-ai-augmented-workflows.md)
- [From Passive to Proactive](writings/from-passive-to-proactive.md)
- [Learning in the Open](writings/learning-in-the-open.md)

If you want to understand the system:
- [Foundational Axioms](canon/values/axioms.md)
- [The Frame](canon/the-frame.md)
- [ODD README](odd/README.md)

If you want to build your own:
- [Getting Started with ODD and oddkit](writings/getting-started-with-odd-and-oddkit.md)
- [The Project Journal](writings/the-project-journal.md)
- [Developer Journey](docs/planning/developer-journey-ai-augmented-workflows.md)

---

## Build Your Own Knowledge Base

oddkit reads markdown files from any GitHub repo. You can point it at yours:

```
canon_url: "https://raw.githubusercontent.com/YOUR_ORG/YOUR_REPO/main"
```

Start with a few markdown files — decisions, constraints, learnings — and grow from there. oddkit reads what you write and makes it available to your AI. No schema required, no methodology to adopt. Start with what hurts.

For the full guide, see [Getting Started with ODD and oddkit](https://klappy.dev/page/writings/getting-started-with-odd-and-oddkit).

---

## About

Built by [Klappy](https://klappy.dev/page/about/bio) — a systems architect with ~15 years in Bible translation technology, building systems that build systems.

**oddkit repo:** [klappy/oddkit](https://github.com/klappy/oddkit)
**Website:** [klappy.dev](https://klappy.dev)

---

## License

MIT
