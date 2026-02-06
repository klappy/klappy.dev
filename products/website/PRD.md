# PRD: Public Website

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.2             |
| **Lane**        | website          |
| **Status**      | Active           |
| **Created**     | 2026-01-17       |
| **Updated**     | 2026-01-20       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- build-output >=3.0.0 <4.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Visual Interfaces

This product MUST remain compatible with:

- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
- spacing >=1.0.0 <2.0.0

This product does NOT define colors, fonts, or spacing directly.
It consumes visual interfaces.

See `/odd/appendices/visual-evolution.md` for the visual evolution model.

---

## Objective

Create a public website that allows humans to:

- Understand what ODD is
- Explore it progressively without overwhelm
- Verify credibility
- Navigate to deeper material intentionally

---

## Background

This is the human-facing orientation surface for ODD.

It is portfolio, explanation, credibility layer.

It does NOT teach agents how to think.
It does NOT execute ODD.
It explains ODD progressively to humans.

---

## In Scope

- Progressive disclosure UX
- Canon browsing
- Essays / articles (including Medium content)
- Clear entry points ("Start here", "Go deeper")
- Mobile usability
- Visual calm
- Deep links / shareable URLs

---

## Explicitly Out of Scope

- AI chat (belongs to ai-navigation lane)
- Agent execution (belongs to agent-skill lane)
- Process enforcement
- MCP servers
- "How to run ODD" instructions for agents

---

## Success Criteria

- [ ] First load shows no more than 7 navigational items
- [ ] Mobile usable without horizontal scrolling
- [ ] Canon discoverable without file paths exposed
- [ ] No agent instructions present in UI
- [ ] No CLI/process language exposed to visitors
- [ ] Deep links work (URL represents resource + section)
- [ ] Progressive disclosure tiers respected (Tier 0/1/2)

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] Build output produced (`npm run build -- --lane website`)
- [ ] Visual proof captured (desktop + mobile screenshots)
- [ ] First load shows ≤7 nav items (verified via screenshot)
- [ ] Mobile layout verified (no horizontal scroll)
- [ ] Deep link round-trip tested
- [ ] Self-audit completed with explicit tradeoffs
- [ ] **Cloudflare Preview URL provided** (branch must be pushed)
- [ ] **Evidence URL provided** (viewable online without local code)

---

## Online Evidence (Required)

A website lane attempt is **not complete** unless:

1. The attempt branch is pushed to `origin`.
2. Cloudflare Pages generates a Preview Deployment URL for that branch.
3. The attempt includes an Evidence URL viewable online without running code locally.

Local preview instructions are allowed during development, but they **do not satisfy attempt completion**.

If an agent cannot provide both URLs, the attempt is **INVALID**.

See `/docs/appendices/online-evidence.md` for the full requirement.

---

## Primary User

Human developers, peers, evaluators exploring ODD.

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- UX should carry the explanation (reduce text compensation)
- Maintainability over cleverness
- Progressive disclosure required

---

## Media (Learning Layer)

This lane supports optional media assets (images/video/audio/PDF) as a **learning layer**.

This lane follows: `/odd/appendices/media-as-learning-layer.md`

### Discovery Mechanism (Required)

Media assets MUST be discovered through canonical ownership:

1. The owning markdown resource declares assets in frontmatter using a single-line JSON object:
   - `assets: {"key":"/assets/...","key2":"/assets/..."}`
2. `npm run sync` compiles these into `public/content/manifest.json` as `resource.assets`.
3. The website renders media only from `resource.assets` (not by scanning folders).

### Behavior Rules

- Media is opt-in (progressive disclosure).
- No autoplay video or audio.
- The page remains complete and usable without opening media.
- Media must attach only to stable content.

### Initial Media Scope (Phase 0)

**Home (`/`)**
- `/assets/home/hero-odd-diagram.png`
- `/assets/home/orientation-map-diagram.png`
- `/assets/home/outcomes-driven_development.mp4`

**ODD (`/odd/README.md`)**
- `/assets/odd/odd-in-practice.mp4`
- `/assets/odd/odd-is-not-a-framework.png`
- `/assets/odd/why-evidence-beats-confidence.m4a`

### Requirements

- The default experience must not require media consumption to understand the page.
- Media must be user-initiated (explicit Watch/Listen/View affordances).
- No autoplay video or audio.
- Media must not add to the primary navigation item count.

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `/products/website/attempts/`

---

## Compiled Pack (Phase 0)

The website lane MUST support generating a wipeable "visitor pack" used for progressive disclosure and AI-friendly context.

### Command
- `npm run lane:compile -- --lane website --pack visitor`

### Output
- `public/_compiled/website/visitor-pack.md`
- `public/_compiled/website/_meta/COMPILE_META.json`

### Verification
- `npm run verify:compiled -- --lane website --pack visitor`

### Contract
- The compiled pack MUST include a provenance header as defined in:
  - `klappy://docs/appendices/compilation`

---

## Related Documents

- Lane architecture: `/docs/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints/README.md`
- Definition of Done: `/canon/constraints/definition-of-done.md`
- Legacy PRD (v0.3): `/docs/PRD/website/PRD-legacy-v0.3.md`
- Compilation: `/docs/appendices/compilation.md`
- Media philosophy: `/odd/appendices/media-as-learning-layer.md`
