# Attempt: Website PRD v1.1 Implementation

## Summary

Fresh implementation of the klappy.dev website following PRD v1.1 requirements:
- Progressive disclosure navigation (≤7 items on first load)
- Deep links via URL query parameters (`?r=uri#section`)
- Mobile-responsive design with collapsible sidebar
- Tier-based content organization (0/1/2)

## Approach

### Architecture

Built a React SPA with the following structure:

- `App.jsx` — Main routing, URL state management, mobile nav toggle
- `Navigation.jsx` — Progressive disclosure sidebar with tier grouping
- `ContentPage.jsx` — Markdown rendering with heading anchors
- `Home.jsx` — Landing page with curated entry points

### Key Decisions

1. **URL Contract**: Using query params `?r=<uri>#<section>` for deep links
   - Human-legible URIs
   - Supports browser back/forward
   - Section anchors work with hash

2. **Progressive Disclosure**: 
   - Tier 0 (3 items): Always visible
   - Tier 1 (7 items): Under "Core Canon" toggle
   - Tier 2 (50+ items): Under "Explore More" toggle, grouped by category
   - First load shows ~5 items (3 tier 0 + 2 toggle buttons)

3. **Mobile Design**:
   - Collapsible sidebar (hamburger menu)
   - Full-width content on mobile
   - Touch-friendly navigation

4. **Styling**:
   - CSS custom properties for theming
   - Dark mode support via `prefers-color-scheme`
   - Apple 2025-inspired typography and spacing

### Tech Stack

- React 18
- Vite 6
- marked (for markdown parsing)
- CSS-in-JS (inline styles for component isolation)

## What Worked

- Progressive disclosure UI successfully limits first-load nav items
- Deep links round-trip correctly
- Mobile layout is usable
- Dark mode works automatically

## Tradeoffs

1. **No SSR**: Single-page app means no server rendering. Acceptable per PRD non-goals.
2. **CSS-in-JS**: Inline styles for simplicity, but larger bundle. Could extract to CSS modules.
3. **No virtualization**: Nav renders all items. With 60+ resources, this is fine. Would need virtualization at 1000+.

## Remaining Gaps

- Copy-link affordance on headings could be more visible
- Could add "recently viewed" tracking (localStorage)
- LLM integration is out of scope (separate lane)

## Self-Audit

| Requirement | Status | Notes |
|------------|--------|-------|
| ≤7 nav items on first load | ✅ | 3 tier 0 + 2 toggles = 5 visible |
| Deep links work | ✅ | URL round-trips correctly |
| Mobile usable | ✅ | Collapsible nav, full-width content |
| No horizontal scroll | ✅ | Verified on 375px viewport |
| Progressive disclosure tiers | ✅ | Tier 0/1/2 respected |
| No agent instructions in UI | ✅ | No CLI/process language exposed |
| Canon discoverable | ✅ | Grouped by category, searchable by title |
