# Agent Skill Lane

This lane produces compiled packs for AI agent consumption. The primary deliverable is a portable context artifact that enables any LLM to guide humans through ODD-aligned PRD creation.

## Current Champion

**v1.3** — PRD Elicitation Enhancement (interview mechanics, stage typing)

**Public URL**: `https://main.klappy-dev-agent-skill.pages.dev/latest/prd-guide-pack.md`

## Quick Start

**Option 1: Public URL (no clone required)**
```
https://main.klappy-dev-agent-skill.pages.dev/latest/prd-guide-pack.md
```

**Option 2: Local file**
Copy the pack from `public/agent-skill/latest/prd-guide-pack.md` and paste it into your AI context.

See the [usage README](https://main.klappy-dev-agent-skill.pages.dev/latest/README.md) for detailed instructions.

## Lane Files

| File | Purpose |
|------|---------|
| [ATTEMPT_KICKOFF.md](ATTEMPT_KICKOFF.md) | Copy/paste prompt to start an attempt |
| [KICKOFF.md](KICKOFF.md) | Full attempt instructions (version-agnostic) |
| [CONTRACT.md](CONTRACT.md) | Formal structure, deviations from canon |
| [ROADMAP.md](ROADMAP.md) | Vision and future versions |
| [history/](history/) | Champion history, failures, learnings |
| [decisions/](decisions/README.md) | Lane-specific architecture decisions |

## Versions

| Version | Status | Description |
|---------|--------|-------------|
| [v1.1/](v1.1/) | Champion | Core PRD guide pack |
| [v1.2/](v1.2/) | Failed | Distribution attempt (PRD conflict) |
| [v1.2.1/](v1.2.1/) | Champion | Lane-owned Cloudflare Pages deployment |
| [v1.2.2/](v1.2.2/) | Failed | Exposed ODD violations (ephemeral artifacts, compile plan location) |
| [v1.2.3/](v1.2.3/) | Champion | Canon refresh v0.5.4 + ODD compliance |
| [v1.2.4/](v1.2.4/) | Superseded | Canon refresh v0.8.0 (path fixes + new content) |
| [v1.3/](v1.3/) | **Champion** | PRD Elicitation Enhancement (interview mechanics, stage typing) |

## Structure

This lane uses a **version-first** folder structure (differs from canon default). See [CONTRACT.md](CONTRACT.md) for details.

```
products/agent-skill/
├── README.md              # You are here
├── ATTEMPT_KICKOFF.md     # Copy/paste prompt (loads canon, points to KICKOFF)
├── KICKOFF.md             # Full attempt instructions (version-agnostic)
├── CONTRACT.md            # Formal structure/deviations
├── ROADMAP.md             # Vision document
├── history/               # Champion log, failures, learnings
├── decisions/             # Lane-specific ADRs
├── v1.1/                  # Version 1.1 (champion)
│   ├── PRD.md             # Frozen PRD
│   ├── src/               # Source files
│   ├── dist/              # Compiled output
│   └── attempts/          # Attempt history
├── v1.2/                  # Version 1.2 (failed)
│   ├── PRD.md             # Frozen PRD
│   └── attempts/          # Failed attempt evidence
├── v1.2.1/                # Version 1.2.1 (champion)
│   └── PRD.md             # Frozen PRD
├── v1.2.2/                # Version 1.2.2 (failed)
│   └── PRD.md             # Canon refresh PRD (failed)
├── v1.2.3/                # Version 1.2.3 (champion)
│   └── PRD.md             # Canon refresh v0.5.4 + ODD compliance
├── v1.2.4/                # Version 1.2.4 (champion)
│   └── PRD.md             # Canon refresh v0.8.0 (path fixes)
└── v1.3/                  # Version 1.3 (active)
    └── PRD.md             # PRD Elicitation Enhancement
```

## Build

To compile a pack for a specific version:

```bash
# From repo root
npm run lane:compile -- --lane agent-skill --pack prd-guide
```

Note: Build configuration lives in each version's `src/compile-plan.json`.
