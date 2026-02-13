# PRD: ODD Agent Skill — Distribution

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.2.1           |
| **Lane**        | agent-skill      |
| **Status**      | Active           |
| **Created**     | 2026-01-20       |
| **Updated**     | 2026-01-20       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- attempt-cli >=2.0.0 <3.0.0

This lane is allowed to have no UI and is not required to satisfy build-output unless it produces a deployable artifact.

---

## Objective

Deliver zero-friction public access to the compiled PRD guide pack via a lane-owned deployment with versioned, immutable asset URLs.

---

## Background

**v1.1 delivered**: A portable, compiled pack that any LLM can use to guide PRD creation using ODD principles. Friction: clone repo, run build, copy pack.

**v1.2 attempted**: Distribution via website lane's Cloudflare Pages deployment. **FAILED** due to PRD design conflict — the approach required modifying website lane's build process, violating lane isolation.

**v1.2.1 patches v1.2** with a lane-owned approach:

- Agent-skill lane owns its own Cloudflare Pages deployment
- No cross-lane dependencies
- Versioned asset URLs enable dependents to pin to specific versions
- README per version provides antifragile documentation

---

## In Scope (v1.2.1)

### From v1.1 (retained)

- Compiled pack for PRD creation guidance
- Distilled ODD philosophy (manifesto, constraints, decision rules)
- PRD template structure
- Interactive conversation flow instructions

### New in v1.2.1

- Lane-owned Cloudflare Pages deployment
- Versioned asset URLs (e.g., `/v1.1/prd-guide-pack.md`)
- README.md per version folder for consumer guidance
- No website lane dependency

---

## Explicitly Out of Scope (v1.2.1)

- Website lane modification
- Shared hosting infrastructure
- UI showcase page (future version)
- Try-it chat interface (future version)
- MCP server integration (future version)
- Cursor SKILL.md format (future version)

---

## Success Criteria

- [ ] Lane-owned Cloudflare Pages project configured
- [ ] Pack available at versioned URL (e.g., `https://agent-skill.klappy.dev/v1.1/prd-guide-pack.md`)
- [ ] URL returns HTTP 200 with correct pack content
- [ ] `v1.1/dist/README.md` accessible at public URL
- [ ] No clone or build required for consumers to access pack
- [ ] Versioned URLs persist indefinitely (immutable releases)

---

## Definition of Done

An attempt against this PRD is complete when:

### Deployment

- [ ] Cloudflare Pages project created for agent-skill lane
- [ ] Deployment configured to serve from `v*/dist/` folders
- [ ] Custom domain configured (optional, can use default CF domain initially)

### Verification

- [ ] Public URL verified with HTTP 200 after deployment
- [ ] Pack content at URL matches local build output
- [ ] README at public URL is readable and helpful

### Evidence Required

- [ ] Screenshot of pack URL returning 200
- [ ] Screenshot of README URL returning 200
- [ ] Diff showing pack content matches local build
- [ ] Self-audit completed with explicit tradeoffs

---

## Primary User

AI agents and developers who want to use the ODD PRD guide without cloning the repo.

---

## Target Use Case

A developer wants to create a PRD using ODD principles.

**v1.2.1 flow**:

1. Visit `https://agent-skill.klappy.dev/v1.1/dist/README.md` to understand what's available
2. Copy pack from `https://agent-skill.klappy.dev/v1.1/dist/prd-guide-pack.md`
3. Paste into AI context
4. Start PRD creation conversation

No clone, no build, no website dependency.

---

## Distribution Architecture

### Lane-Owned Deployment

```
Cloudflare Pages Project: agent-skill
├── v1.1/
│   └── dist/
│       ├── README.md
│       ├── prd-guide-pack.md
│       └── _meta/
├── v1.2/  (no dist — failed attempt)
├── v1.2.1/
│   └── dist/  (when championed)
└── index.html  (optional: redirect to latest or list versions)
```

### URL Pattern

- Base: `https://agent-skill.klappy.dev/` (or CF default domain)
- Version: `/v1.1/dist/prd-guide-pack.md`
- README: `/v1.1/dist/README.md`

### Immutable Versions

- Versions are immutable once published
- Bug fixes require new version (e.g., v1.1.1)
- Dependents can pin to specific versions
- Old versions persist indefinitely

---

## Constraints

This PRD is shaped by Canon constraints:

- **Lane isolation**: No modification of other lanes allowed
- **Evidence over assertion**: Public URL must be verified
- **Explicit tradeoffs**: New CF project adds operational overhead
- **Portability**: Pack remains a standalone file

### v1.2.1 Specific Constraints

- Must NOT modify website lane or shared infrastructure
- Must NOT require coordination with other lanes
- Lane owns its deployment end-to-end

---

## Implementation Notes

### Cloudflare Pages Setup

1. Create new CF Pages project linked to `klappy.dev` repo
2. Configure build: none (static files only)
3. Configure publish directory: `products/agent-skill/`
4. Optional: Add custom domain `agent-skill.klappy.dev`

### Build Process

No special build needed. The existing compile process already produces files in `v*/dist/`.

### Deployment Trigger

- Auto-deploy on push to main
- Only serves files from `products/agent-skill/v*/dist/`

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `v1.2.1/attempts/attempt-NNN/`

---

## Related Documents

- v1.1 Champion: `../v1.1/attempts/attempt-001/`
- v1.2 Failed: `../v1.2/attempts/attempt-001/LEARNINGS.md`
- Lane CONTRACT: `../CONTRACT.md`
- Lane README: `../README.md`

---

## Learnings Applied from v1.2

This PRD directly addresses learnings from the v1.2 failed attempt:

1. **Lane isolation is absolute** — Cannot require cross-lane modification
2. **Lane-owned deployment** — Each lane can own its infrastructure
3. **Versioned assets** — Dependents need stable, immutable URLs
4. **Antifragile documentation** — README per version, not JSON manifests
