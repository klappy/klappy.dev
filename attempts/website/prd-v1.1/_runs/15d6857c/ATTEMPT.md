# Attempt: Website PRD v1.1

**Run ID:** 15d6857c  
**Date:** 2026-01-20  
**Lane:** website  
**PRD Version:** v1.1

## Objective

Implement a public website for klappy.dev with progressive disclosure navigation, deep linking, mobile responsiveness, and evidence-first deployment.

## Implementation

### Core Features

1. **Progressive Disclosure Navigation**
   - Tier 0 items (3) shown by default
   - Tier 1 and Tier 2 items hidden behind expandable sections
   - Mobile-responsive sidebar with hamburger menu

2. **Deep Linking**
   - URL state management via `?r=<uri>` query parameter
   - Section anchors via hash (`#section-id`)
   - Browser back/forward support
   - Copy link buttons on headings

3. **Content Rendering**
   - Markdown content loaded from `/content/` paths
   - Rendered with `marked` library
   - Heading anchors generated automatically
   - Stable IDs for duplicate headings

4. **Mobile Responsiveness**
   - Hamburger menu for mobile
   - Sidebar slides in/out on mobile
   - Responsive typography and spacing
   - No horizontal scrolling

5. **Evidence System**
   - Evidence folder structure created
   - Screenshots captured (desktop + mobile)
   - Evidence deployed to `/_evidence/` path

## Stack

- React 18
- Vite
- Marked (markdown rendering)
- Vanilla CSS (no framework)

## Build Output

- `products/website/dist/index.html` ✓
- `products/website/dist/_evidence/` ✓
